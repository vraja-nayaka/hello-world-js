import { useCallback } from "react";
import { Editor, Element, Node, NodeEntry } from "slate";
import { CodeLineType } from "./consts";

export const useDecorate = (editor: Editor) => {
  return useCallback(([node, path]: NodeEntry<Node>) => {
    if (Element.isElement(node) && node.type === CodeLineType) {
      const ranges = editor.nodeToDecorations?.get(node) || [];

      return ranges;
    }

    return [];
  }, []);
};
