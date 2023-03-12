import { createApi, createStore } from 'effector';

type SelectedWords = {
    value: string;
    index: number;
}

export const $sequenceSelectedWords = createStore<SelectedWords[]>([]);
export const sequenceSelectedWordsApi = createApi($sequenceSelectedWords, {
    push: (state, newWord: SelectedWords) => [...state, newWord],
    remove: (state, index: number) => {
        const newState = [...state];
        newState.splice(index, 1);
        return newState;
    },
    clear: () => [],
});

export const $sequenceToolbarWords = createStore<string[]>([]);
export const sequenceToolbarWordsApi = createApi($sequenceToolbarWords, {
    show: (_state, words: string[]) => words,
    hide: () => [],
});

export const $sequenceCorrectAnswers = createStore<string[]>([]);
export const sequenceCorrectAnswersApi = createApi($sequenceCorrectAnswers, {
    set: (_state, words: string[]) => words,
    remove: () => [],
});

export const $sequenceOnSuccessHandler = createStore(() => {});
export const sequenceOnSuccessHandlerApi = createApi($sequenceOnSuccessHandler, {
    set: (_state, callback: () => void) => callback,
    remove: () => () => {},
});
