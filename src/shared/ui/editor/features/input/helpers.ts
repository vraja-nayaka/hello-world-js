import { RenderLeafProps } from "slate-react";

export const openCloseSymbol = "§_";
export const correctSymbol = "§";
export const splitSymbol = "±";

export const isInput = (props: RenderLeafProps) => {
  return props.children?.props?.leaf?.text?.startsWith(openCloseSymbol);
};
