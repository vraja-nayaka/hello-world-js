import { useStore } from 'effector-react';
import {
    $currentLesson,
    currentCodeBlockApi,
    currentLessonApi,
    successLessonsApi,
} from '../../lib/store';
import { pushConfetti } from '../confetti/Confetti';
import { lessons } from '../editor/lessons';

// TODO: get it from array of lessons
const lastAvailableLesson = lessons.length - 1;

export const NextButton = () => {
    const currentLesson = useStore($currentLesson);

    return (
        <>
            <div>Спасибо за урок, теперь можем перейти к следующему уроку</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => {
                        pushConfetti({
                            particleCount: 250,
                            startVelocity: 70,
                            origin: { y: 1 },
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (currentLesson !== null) {
                            successLessonsApi.add(currentLesson);
                        }
                        currentCodeBlockApi.reset();
                        setTimeout(() => currentLessonApi.reset(), 300);
                    }}
                >
                    {currentLesson === lastAvailableLesson ? 'Дальше пока ничего нет' : 'Поехали!'}
                </button>
            </div>
        </>
    );
};
