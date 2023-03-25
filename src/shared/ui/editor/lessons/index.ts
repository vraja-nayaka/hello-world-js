import lesson0 from './lesson0';
import lesson0_1 from './lesson0_1';
import lesson0_2 from './lesson0_2';
import lesson1 from './lesson1';
import lesson1_1 from './lesson1_1';
import lesson1_2 from './lesson1_2';
import lesson2 from './lesson2';
import lesson3 from './lesson3';
import lessonHard1 from './lesson-hard-1';

export const lessons: Record<number, string[]> = {
    0: lesson0,
    1: lesson0_1,
    2: lesson0_2,
    3: lesson1,
    4: lesson1_1,
    5: lesson1_2,
    6: lesson2,
    7: lesson3,

    [-1]: lessonHard1,
};
