import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useMemo, useRef } from 'react';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';
import { useOnClickOutside } from '../../../../lib/hooks/useOutsideClick';

import { replaceFeatureToText, shuffle } from '../utils';
import { answerJoinSymbol, splitSymbol, toolbarId, wrongSymbol } from './helpers';
import {
    $sequenceSelectedWords,
    sequenceSelectedWordsApi,
    sequenceToolbarWordsApi,
    $sequenceToolbarWords,
    sequenceCorrectAnswersApi,
    sequenceOnSuccessHandlerApi,
} from './lib';
import style from './sequence.module.css';

export const Sequence = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    const sequenceSelectedWords = useStore($sequenceSelectedWords);
    const sequenceToolbarWords = useStore($sequenceToolbarWords);

    const { text, ...rest } = leaf;

    const editor = useSlateStatic();

    const clickableText: string = children.props.leaf.text.slice(2, -2);

    const ref = useRef(null);

    const handleClickOutside = () => {
        sequenceToolbarWordsApi.hide();
        sequenceCorrectAnswersApi.remove();
    };

    const shuffledVariants = useMemo(() => {
        const variants = clickableText
            .split(splitSymbol)
            .map((value) => value.replace(wrongSymbol, ''));

        return shuffle(variants);
    }, [clickableText]);

    const onFocus = () => {
        const correctAnswer = clickableText
            .split(wrongSymbol)[0]
            .split(splitSymbol)
            .join(answerJoinSymbol)
            .trim();

        const onSuccess = () => {
            const path = [...ReactEditor.findPath(editor, children.props.parent), 0];
            replaceFeatureToText(editor, path, text, correctAnswer);
        };
        sequenceOnSuccessHandlerApi.set(onSuccess);
        if (!sequenceToolbarWords.length) {
            sequenceToolbarWordsApi.show(shuffledVariants);
        }
        sequenceCorrectAnswersApi.set([correctAnswer]);
    };

    useOnClickOutside(ref, handleClickOutside, { ignoredElementId: toolbarId });

    return (
        <div
            ref={ref}
            {...attributes}
            role='button'
            tabIndex={0}
            className={clsx(style.focusable, {
                [style.focused]: sequenceToolbarWords.length,
            })}
            onClick={onFocus}
            onKeyUp={onFocus}
        >
            {sequenceSelectedWords.map((selectedWord, index) => {
                return (
                    <button
                        {...attributes}
                        className={clsx(Object.keys(rest), style.deletable)}
                        onClick={() => sequenceSelectedWordsApi.remove(index)}
                        key={selectedWord.index}
                    >
                        {selectedWord.value}
                    </button>
                );
            })}
        </div>
    );
};
