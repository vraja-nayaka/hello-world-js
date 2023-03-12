import { createApi, createStore } from 'effector';
import { persist } from 'effector-storage/local';

type Modes = 'quiz' | 'errorCorrection' | null;
export const $currentMode = createStore<Modes>(null);
export const currentModeApi = createApi($currentMode, {
    set: (_store, value: Modes) => value,
    reset: () => null,
});

export const $currentCodeBlock = createStore(0);
export const currentCodeBlockApi = createApi($currentCodeBlock, {
    next: (store) => store + 1,
    set: (_store, value: number) => value,
    reset: () => 0,
});

export const $errors = createStore<number[]>([]);
export const errorsApi = createApi($errors, {
    add: (state) => [...state, $currentCodeBlock.getState() || 0],
    set: (_store, value: number[]) => value,
    reset: () => [],
});

export const $currentLesson = createStore<number | null>(null);
export const currentLessonApi = createApi($currentLesson, {
    set: (_state, value: number) => value,
    reset: () => null,
});

export const $successLessons = createStore<number[]>([]);
persist({ store: $successLessons, key: 'successLessons' });
export const successLessonsApi = createApi($successLessons, {
    add: (state, value: number) => (state.includes(value) ? state : [...state, value]),
    reset: () => [],
});

export const quitLesson = () => {
    errorsApi.reset();
    currentCodeBlockApi.reset();
    currentModeApi.set(null);
    currentLessonApi.reset();
};
