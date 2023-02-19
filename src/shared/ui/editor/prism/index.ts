import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import Prism, { Grammar, GrammarValue } from "prismjs";
import { Editor, Element, Node, NodeEntry, Range } from "slate";
import { CodeBlockElement } from "../custom-types";
import { mergeMaps, normalizeTokens } from "./utils";

// ! its still doesn't work
import "./codeLinesPlugin";
import { useMemo } from "react";
import { useSlate } from "slate-react";
import { CodeBlockType } from "../consts";

const withButtonToken = (grammar: Grammar) => {
  (grammar as Record<string, GrammarValue>).customButton = {
    pattern: /§§.+§§/,
    greedy: true,
  };
  return grammar;
};

const getChildNodeToDecorations = ([
  block,
  blockPath,
]: NodeEntry<CodeBlockElement>) => {
  const nodeToDecorations = new Map<Element, Range[]>();

  const text = block.children.map((line) => Node.string(line)).join("\n");
  const language = block.language;
  const tokens = Prism.tokenize(
    text,
    withButtonToken(Prism.languages[language])
  );
  const normalizedTokens = normalizeTokens(tokens); // make tokens flat and grouped by line
  const blockChildren = block.children as Element[];

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index];
    const element = blockChildren[index];

    if (!nodeToDecorations.has(element)) {
      nodeToDecorations.set(element, []);
    }

    let start = 0;
    for (const token of tokens) {
      const length = token.content.length;
      if (!length) {
        continue;
      }

      const end = start + length;

      const path = [...blockPath, index, 0];
      const range = {
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => [type, true])),
      };

      nodeToDecorations.get(element)!.push(range);

      start = end;
    }
  }

  return nodeToDecorations;
};

// precalculate editor.nodeToDecorations map to use it inside decorate function then
export const SetNodeToDecorations = () => {
  const editor = useSlate();

  useMemo(() => {
    const blockEntries = Array.from(
      Editor.nodes(editor, {
        at: [],
        mode: "highest",
        match: (n) => Element.isElement(n) && n.type === CodeBlockType,
      })
    );

    const nodeToDecorations = mergeMaps(
      // @ts-ignore
      ...blockEntries.map(getChildNodeToDecorations)
    );

    editor.nodeToDecorations = nodeToDecorations;
  }, [editor.children]);

  return null;
};
