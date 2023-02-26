import { Element } from 'slate';
import { CodeBlockType, CodeLineType } from '../consts';

const toChildren = (content: string) => [{ text: content }];

const toCodeLines = (content: string): Element[] =>
    content.split('\n').map((line) => ({ type: CodeLineType, children: toChildren(line) }));

export const getJsxCodeBlock = (codeString: string) => {
    return {
        type: CodeBlockType,
        language: 'jsx',
        children: toCodeLines(codeString),
    };
};