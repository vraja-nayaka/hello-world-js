import { useStore } from 'effector-react';
import { Editor, NodeEntry, Transforms } from 'slate';
import useSound from 'use-sound';
import {
    $currentCodeBlock,
    $currentMode,
    $errors,
    currentCodeBlockApi,
    currentModeApi,
    errorsApi,
} from '../../../lib/store';
import correctSfx from '../../../sound/correct.mp3';
import wrongSfx from '../../../sound/wrong.mp3';
import { pushConfetti } from '../../confetti/Confetti';
import { CustomEditor, CustomText } from '../custom-types';

export const getElementCenter = (element: HTMLElement) => {
    const { x, y, width } = element.getBoundingClientRect();

    return {
        x: (x + width / 2) / window.innerWidth,
        y: y / window.innerHeight,
    };
};

export const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const replaceFeatureToText = (
    editor: CustomEditor,
    path: number[],
    interactiveText: string,
    correctAnswer: string
) => {
    const node = Editor.node(editor, path) as NodeEntry<CustomText>;
    const allStringText = node[0].text;
    const startOffset = allStringText.indexOf(interactiveText);
    const endOffset = startOffset + interactiveText.length;

    const anchor = { path, offset: startOffset };
    const focus = { path, offset: endOffset };

    Transforms.delete(editor, { at: { anchor, focus } });
    Transforms.insertText(editor, correctAnswer, { at: anchor });
};

export const useAnswer = () => {
    const [playCorrect] = useSound(correctSfx);
    const [playWrong] = useSound(wrongSfx);
    const currentMode = useStore($currentMode);
    const currentCodeBlock = useStore($currentCodeBlock);
    const errors = useStore($errors);

    const onCorrect = (element: HTMLElement) => {
        const origin = getElementCenter(element);
        playCorrect();
        pushConfetti({ origin, type: 'success' });

        if (currentMode === 'quiz') {
            currentCodeBlockApi.next();
        }
        if (currentMode === 'errorCorrection') {
            const nextErrors = errors.filter((value) => value !== currentCodeBlock);
            errorsApi.set(nextErrors);
            const nextError = nextErrors[0];
            if (nextError) {
                currentCodeBlockApi.set(nextError);
            } else {
                // TODO: set last element
                currentCodeBlockApi.set(9999);
            }
        }

        window.scrollTo({ top: window.scrollY + 200, behavior: 'smooth' });
    };

    const onWrong = (element: HTMLElement) => {
        // TODO: при currentMode === 'errorCorrection' что-то делать
        const origin = getElementCenter(element);
        playWrong();
        errorsApi.add();
        pushConfetti({ origin, type: 'fail' });
    };

    return [onCorrect, onWrong];
};
