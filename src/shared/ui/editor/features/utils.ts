import { useStore } from 'effector-react';
import { Editor, Element, NodeEntry, Transforms } from 'slate';
import useSound from 'use-sound';
import {
    $currentCodeBlock,
    $currentMode,
    $errors,
    currentCodeBlockApi,
    errorsApi,
} from '../../../lib/store';
import correctSfx from '../../../sound/correct.mp3';
import wrongSfx from '../../../sound/wrong.mp3';
import { pushConfetti } from '../../confetti/Confetti';
import { CustomEditor, CustomText } from '../custom-types';
import { CodeBlockType, CodeLineType } from '../consts';

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

export const shufflePairs = (correctPairs: string[][]) => {
    const columns = correctPairs.reduce(
        (acc, pair) => {
            acc[0].push(pair[0]);
            acc[1].push(pair[1]);
            return acc;
        },
        [[], []] as string[][]
    );

    const shuffledColumns = columns.map((column) => shuffle(column));

    const shuffledPairs = shuffledColumns[0].map((_, index) => {
        return [shuffledColumns[0][index], shuffledColumns[1][index]];
    });

    return shuffledPairs;
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

type UseAnswerHandlerOptions = { incomplete?: boolean };

export const useAnswer = () => {
    const [playCorrect] = useSound(correctSfx);
    const [playWrong] = useSound(wrongSfx);
    const currentMode = useStore($currentMode);
    const currentCodeBlock = useStore($currentCodeBlock);
    const errors = useStore($errors);

    const onCorrect = (element: HTMLElement, options?: UseAnswerHandlerOptions) => {
        const { incomplete } = options || {};
        const origin = getElementCenter(element);
        playCorrect();
        pushConfetti({ origin, type: 'success' });

        if (incomplete) {
            return;
        }

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
