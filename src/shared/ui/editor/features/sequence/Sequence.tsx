import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useRef } from 'react';
import { Editor, NodeEntry, Transforms } from 'slate';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';
import { useOnClickOutside } from '../../../../lib/hooks/useOutsideClick';

import { CustomText } from '../../custom-types';
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
    const variants = clickableText.split(splitSymbol).map((value) => value.replace(wrongSymbol, ''));

    const ref = useRef(null);

    const handleClickOutside = () => {
        sequenceToolbarWordsApi.hide();
        sequenceCorrectAnswersApi.remove();
    };

    const onFocus = () => {
        const correctAnswer = clickableText
            .split(wrongSymbol)[0]
            .split(splitSymbol)
            .join(answerJoinSymbol)
            .trim();

        const onSuccess = () => {
            const interactiveText = text;
            const path = [...ReactEditor.findPath(editor, children.props.parent), 0];
            const node = Editor.node(editor, path) as NodeEntry<CustomText>;
            const allStringText = node[0].text;
            const startOffset = allStringText.indexOf(interactiveText);
            const endOffset = startOffset + interactiveText.length;
            const anchor = { path, offset: startOffset };
            const focus = { path, offset: endOffset };
            Transforms.delete(editor, { at: { anchor, focus } });
            Transforms.insertText(editor, correctAnswer, { at: anchor });
        };

        sequenceOnSuccessHandlerApi.set(onSuccess);
        sequenceToolbarWordsApi.show(variants);
        sequenceCorrectAnswersApi.set([correctAnswer]);
    };

    useOnClickOutside(ref, handleClickOutside, { ignoredElementId: toolbarId });

    return (
        <div
            ref={ref}
            {...attributes}
            className={clsx(style.focusable, {
                [style.focused]: sequenceToolbarWords.length,
            })}
            onClick={onFocus}
        >
            {sequenceSelectedWords.map((selectedWord, index) => {
                return (
                    <button
                        {...attributes}
                        className={clsx(Object.keys(rest), style.deletable)}
                        onClick={() => sequenceSelectedWordsApi.remove(index)}
                        key={selectedWord}
                    >
                        {selectedWord}
                    </button>
                );
            })}
        </div>
    );
};
