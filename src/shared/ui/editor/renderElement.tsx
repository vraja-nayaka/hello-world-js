import { RenderElementProps, useSlateStatic } from "slate-react";
import { CodeBlockType, CodeLineType } from "./consts";

import style from "./editor.module.css";

export const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();

  if (element.type === CodeBlockType) {
    return (
      <div
        {...attributes}
        className={style.codeBlock}
        style={{ position: "relative" }}
        spellCheck={false}
      >
        {children}
      </div>
    );
  }

  if (element.type === CodeLineType) {
    return (
      <div {...attributes} style={{ position: "relative" }}>
        {children}
      </div>
    );
  }

  const Tag = editor.isInline(element) ? "span" : "div";
  return (
    <Tag {...attributes} style={{ position: "relative" }}>
      {children}
    </Tag>
  );
};
