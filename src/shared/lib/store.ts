import { createApi, createStore } from "effector";

export const $currentCodeBlock = createStore(0);
export const currentCodeBlockApi = createApi($currentCodeBlock, {
    next: (value) => value + 1,
    reset: () => 0,
});

export const $currentLesson = createStore(0);
export const currentLessonApi = createApi($currentLesson, {
    next: (value) => value + 1,
    reset: () => 0,
});
