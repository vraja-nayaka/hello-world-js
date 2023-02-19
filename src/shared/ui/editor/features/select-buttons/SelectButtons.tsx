import clsx from "clsx";
import { Editor, NodeEntry, Transforms } from "slate";
import { ReactEditor, RenderLeafProps, useSlateStatic } from "slate-react";

import { pushConfetti } from "../../../confetti/Confetti";
import { CustomText } from "../../custom-types";
import { correctSymbol, splitSymbol } from "./helpers";
import style from "./select-buttons.module.css";

export const SelectButton = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;
  const editor = useSlateStatic();

  let customButtonTitles: string[] | undefined;
  let correctAnswer: string | undefined;

  const clickableText: string = children.props.leaf.text.slice(2, -2);
  const correctAnswerStart = clickableText.indexOf(correctSymbol) + 1;
  const foundEnd = clickableText.indexOf(splitSymbol, correctAnswerStart);
  const correctAnswerEnd = foundEnd === -1 ? undefined : foundEnd;
  correctAnswer = clickableText.slice(correctAnswerStart, correctAnswerEnd);
  const clickableTextWithoutCorrectSign =
    clickableText.slice(0, correctAnswerStart - 1) +
    clickableText.slice(correctAnswerStart);
  customButtonTitles = clickableTextWithoutCorrectSign.split(splitSymbol);

  const { text, ...rest } = leaf;
  // @ts-ignore
  const onClick = leaf.clickable
    ? (event: any) => {
        const selectedText = event.currentTarget.innerText;
        const interactiveText = text;
        const range = ReactEditor.findEventRange(editor, event);
        const node = Editor.node(editor, range) as NodeEntry<CustomText>;
        const allStringText = node[0].text;
        const startOffset = allStringText.indexOf(interactiveText);
        const endOffset = startOffset + interactiveText.length;

        const origin = {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        };

        if (selectedText === correctAnswer) {
          const anchor = { path: range.anchor.path, offset: startOffset };
          const focus = { path: range.anchor.path, offset: endOffset };
          Transforms.delete(editor, { at: { anchor, focus } });
          Transforms.insertText(editor, selectedText, { at: anchor });

          pushConfetti({ origin, type: "success" });
        } else {
          pushConfetti({ origin, type: "fail" });
        }
      }
    : undefined;

  const Tag = onClick ? "button" : "span";

  const drawTag = (children: any) => (
    <Tag
      {...attributes}
      className={clsx(Object.keys(rest), style.clickable)}
      onClick={onClick}
      key={children}
    >
      {children}
    </Tag>
  );

  return <>{customButtonTitles.map((title) => drawTag(title))}</>;
};
