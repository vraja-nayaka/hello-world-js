import { useStore } from 'effector-react';
import { $currentLesson, currentCodeBlockApi, currentLessonApi } from '../../lib/store';
import { pushConfetti } from '../confetti/Confetti';

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
                        currentCodeBlockApi.reset();
                        setTimeout(() => currentLessonApi.next(), 300);
                    }}
                >
                    {currentLesson === 1 ? 'Дальше пока ничего нет' : 'Поехали!'}
                </button>
            </div>
        </>
    );
};
