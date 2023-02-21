import { useStore } from 'effector-react';
import { $currentLesson, currentLessonApi } from '../../lib/store';
import { pushConfetti } from '../confetti/Confetti';

export const NextButton = () => {
    const currentLesson = useStore($currentLesson);

    return (
        <>
            Спасибо за урок, теперь можем двигаться дальше
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => {
                        pushConfetti({
                            particleCount: 250,
                            startVelocity: 70,
                            origin: { y: 1 },
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => currentLessonApi.next(), 300);
                    }}
                >
                    {currentLesson === 1 ? 'Дальше пока ничего нет' : 'Поехали!'}
                </button>
            </div>
        </>
    );
};
