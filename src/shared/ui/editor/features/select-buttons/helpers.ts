import { RenderLeafProps } from "slate-react";

export const openCloseSymbol = "§§";
export const correctSymbol = "§";
export const splitSymbol = "±";

export const isSelectButton = (props: RenderLeafProps) => {
  return props.children?.props?.leaf?.text?.startsWith(openCloseSymbol);
};