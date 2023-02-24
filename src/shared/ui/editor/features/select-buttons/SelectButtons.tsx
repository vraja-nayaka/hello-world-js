import clsx from 'clsx';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';

import { replaceFeatureToText, useAnswer } from '../utils';
import { correctSymbol, splitSymbol } from './helpers';
import style from './select-buttons.module.css';

export const SelectButton = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    const editor = useSlateStatic();
    const [onCorrect, onWrong] = useAnswer();

    const clickableText: string = children.props.leaf.text.slice(2, -2);
    const correctAnswerStart = clickableText.indexOf(correctSymbol) + 1;
    const foundEnd = clickableText.indexOf(splitSymbol, correctAnswerStart);
    const correctAnswerEnd = foundEnd === -1 ? undefined : foundEnd;
    const correctAnswer = clickableText.slice(correctAnswerStart, correctAnswerEnd);
    const clickableTextWithoutCorrectSign =
        clickableText.slice(0, correctAnswerStart - 1) + clickableText.slice(correctAnswerStart);
    const customButtonTitles = clickableTextWithoutCorrectSign.split(splitSymbol);

    const { text, ...rest } = leaf;

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const selectedText = event.currentTarget.innerText;
        const range = ReactEditor.findEventRange(editor, event);

        if (selectedText === correctAnswer) {
            replaceFeatureToText(editor, range.anchor.path, text, selectedText);
            onCorrect(event.currentTarget);
        } else {
            onWrong(event.currentTarget);
        }
    };

    return (
        <>
            {customButtonTitles.map((title) => (
                <button
                    {...attributes}
                    className={clsx(Object.keys(rest), style.clickable)}
                    onClick={onClick}
                    key={title}
                >
                    {title}
                </button>
            ))}
        </>
    );
};
