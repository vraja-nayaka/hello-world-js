import { RenderLeafProps } from 'slate-react';

export const openCloseSymbol = '§>';
export const wrongSymbol = '§';
export const splitSymbol = '±';
export const answerJoinSymbol = ' ';

export const toolbarId = 'sequence-toolbar';

export const isSequence = (props: RenderLeafProps) => {
    return props.children?.props?.leaf?.text?.startsWith(openCloseSymbol);
};
