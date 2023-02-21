import clsx from 'clsx';
import { Editor, NodeEntry, Transforms } from 'slate';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';
import { currentCodeBlockApi } from '../../../../lib/store';

import { pushConfetti } from '../../../confetti/Confetti';
import { CustomText } from '../../custom-types';
import { getElementCenter } from '../utils';
import { correctSymbol, splitSymbol } from './helpers';
import style from './input.module.css';

// Добавить ответы regexp
export const Input = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    const editor = useSlateStatic();

    const clickableText: string = children.props.leaf.text.slice(2, -2);
    const correctAnswerStart = clickableText.indexOf(correctSymbol) + 1;
    const foundEnd = clickableText.indexOf(splitSymbol, correctAnswerStart);
    const correctAnswerEnd = foundEnd === -1 ? undefined : foundEnd;
    const correctAnswer = clickableText.slice(correctAnswerStart, correctAnswerEnd);

    const width = 10 * correctAnswer.length + 27;

    const { text, ...rest } = leaf;

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.code === 'Enter') {
            onSubmit(event.currentTarget);
        }
    };

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const input = event.currentTarget.previousElementSibling as HTMLInputElement;
        onSubmit(input);
    };

    const onSubmit = (input: HTMLInputElement) => {
        const selectedText = input.value;

        const interactiveText = text;
        const path = [...ReactEditor.findPath(editor, children.props.parent), 0];
        const node = Editor.node(editor, path) as NodeEntry<CustomText>;
        const allStringText = node[0].text;
        const startOffset = allStringText.indexOf(interactiveText);
        const endOffset = startOffset + interactiveText.length;

        const origin = getElementCenter(input);

        if (selectedText === correctAnswer) {
            const anchor = { path, offset: startOffset };
            const focus = { path, offset: endOffset };
            Transforms.delete(editor, { at: { anchor, focus } });
            Transforms.insertText(editor, selectedText, { at: anchor });

            pushConfetti({ origin, type: 'success' });
            window.scrollTo({ top: window.scrollY + 100, behavior: 'smooth' });
            currentCodeBlockApi.next();
        } else {
            pushConfetti({ origin, type: 'fail' });
            input.focus();
        }
    };

    return (
        <span className={style.container} {...attributes}>
            <input
                className={clsx(Object.keys(rest), style.input)}
                style={{ width }}
                onKeyDown={onKeyDown}
            ></input>
            <button className={style.button} onClick={onClick}>
                ✅
            </button>
        </span>
    );
};
