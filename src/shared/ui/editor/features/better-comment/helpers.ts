import { RenderLeafProps } from "slate-react";

export const openSymbol = "//";
export const questionSymbol = "// ?";
export const dangerSymbol = "// !";
export const todoSymbol = "// TODO";

export const isBetterComment = (props: RenderLeafProps) => {
  return props.children?.props?.leaf?.text?.startsWith(openSymbol);
};
