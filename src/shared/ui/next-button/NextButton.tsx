import { useStore } from 'effector-react';
import {
    $currentLesson,
    $errors,
    currentCodeBlockApi,
    currentModeApi,
    quitLesson,
    successLessonsApi,
} from '../../lib/store';
import { pushConfetti } from '../confetti/Confetti';
import { lessons } from '../editor/lessons';
import style from './index.module.css';

// TODO: get it from array of lessons
const lastAvailableLesson = lessons.length - 1;

type Props = {
    onClearEditor: () => void;
};

export const NextButton = ({ onClearEditor }: Props) => {
    const currentLesson = useStore($currentLesson);
    const errors = useStore($errors);

    const onCorrectMistakes = () => {
        onClearEditor();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentCodeBlockApi.set(errors[0]);
        currentModeApi.set('errorCorrection');
    };
    const onNext = () => {
        pushConfetti({
            particleCount: 250,
            startVelocity: 70,
            origin: { y: 1 },
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (currentLesson !== null) {
            successLessonsApi.add(currentLesson);
        }
        setTimeout(() => quitLesson(), 300);
    };

    return (
        <div>
            {!errors.length && (
                <div className={style.text}>Превосходно! Все чисто и без единой помарки</div>
            )}
            <div className={style.text}>Спасибо за урок, теперь можем идти дальше!</div>

            <button onClick={onNext}>
                {currentLesson === lastAvailableLesson ? 'Дальше пока ничего нет' : 'Поехали!'}
            </button>
            {Boolean(errors.length) && (
                <>
                    <div className={style.errors}>
                        Ты собрал {errors.length} ошибок. Проведем работу над ошибками?
                    </div>
                    <button onClick={onCorrectMistakes}>Исправить сейчас</button>
                </>
            )}
        </div>
    );
};
