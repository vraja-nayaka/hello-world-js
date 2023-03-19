import { RenderLeafProps } from 'slate-react';

export const openCloseSymbol = '§~';
export const splitSymbol = '§';
export const conformitySymbol = '±';

export const isComparison = (props: RenderLeafProps) => {
    return props.children?.props?.leaf?.text?.startsWith(openCloseSymbol);
};
