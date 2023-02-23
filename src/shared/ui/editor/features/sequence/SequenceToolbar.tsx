import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { currentCodeBlockApi } from '../../../../lib/store';
import { pushConfetti } from '../../../confetti/Confetti';
import { getElementCenter } from '../utils';
import { answerJoinSymbol, toolbarId } from './helpers';
import {
    sequenceSelectedWordsApi,
    $sequenceSelectedWords,
    $sequenceToolbarWords,
    $sequenceCorrectAnswers,
    sequenceToolbarWordsApi,
    $sequenceOnSuccessHandler,
    sequenceOnSuccessHandlerApi,
} from './lib';
import style from './sequence.module.css';

export const SequenceToolbar = () => {
    const sequenceToolbarWords = useStore($sequenceToolbarWords);
    const sequenceCorrectAnswers = useStore($sequenceCorrectAnswers);
    const sequenceSelectedWords = useStore($sequenceSelectedWords);
    const sequenceOnSuccessHandler = useStore($sequenceOnSuccessHandler);
    const [isLoaded, setIsLoaded] = useState(false);

    const onCheck: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const answer = sequenceSelectedWords.join(answerJoinSymbol);
        const isCorrect = sequenceCorrectAnswers.includes(answer);

        const origin = getElementCenter(event.currentTarget);
        if (isCorrect) {

            pushConfetti({ origin, type: 'success' });
            currentCodeBlockApi.next();
            sequenceOnSuccessHandler();
            sequenceOnSuccessHandlerApi.remove();
            window.scrollTo({ top: window.scrollY + 100, behavior: 'smooth' });
            sequenceToolbarWordsApi.hide();
        } else {
            pushConfetti({ origin, type: 'fail' });
        }
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 500);
    }, []);

    return (
        <div
            className={clsx(style.toolbar, {
                [style.toolbarHidden]: !sequenceToolbarWords.length,
                [style.toolbarNone]: !isLoaded,
            })}
            id={toolbarId}
        >
            <div className={style.toolbarContainer}>
                {sequenceToolbarWords.map((word) => {
                    return (
                        <button
                            className={clsx(style.selectable)}
                            onClick={() => sequenceSelectedWordsApi.push(word)}
                            key={word}
                        >
                            {word}
                        </button>
                    );
                })}
            </div>
            <div className={clsx(style.toolbarContainer, style.submitContainer)}>
                <button className={clsx(style.submit)} onClick={onCheck}>
                    Проверить ✅
                </button>
            </div>
        </div>
    );
};
