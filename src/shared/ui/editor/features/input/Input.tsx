import clsx from 'clsx';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';
import { replaceFeatureToText, useAnswer } from '../utils';
import { correctSymbol, splitSymbol } from './helpers';
import style from './input.module.css';

// Добавить ответы regexp
export const Input = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    const editor = useSlateStatic();
    const [onCorrect, onWrong] = useAnswer();

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
        const path = [...ReactEditor.findPath(editor, children.props.parent), 0];

        if (selectedText === correctAnswer) {
            replaceFeatureToText(editor, path, text, selectedText);
            onCorrect(input);
        } else {
            onWrong(input);
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
