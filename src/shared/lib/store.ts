import { createApi, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const $currentCodeBlock = createStore(0);
export const currentCodeBlockApi = createApi($currentCodeBlock, {
    next: (value) => value + 1,
    reset: () => 0,
});

export const $errors = createStore(0);
export const errorsApi = createApi($errors, {
    next: (value) => value + 1,
    reset: () => 0,
});

export const $currentLesson = createStore<number | null>(null);
export const currentLessonApi = createApi($currentLesson, {
    set: (_state, value: number) => value,
    reset: () => null,
});

export const $successLessons = createStore<number[]>([]);
persist({ store: $successLessons, key: 'successLessons' });
export const successLessonsApi = createApi($successLessons, {
    add: (state, value: number) => state.includes(value) ? state : [...state, value],
    reset: () => [],
});
