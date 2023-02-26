import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { useAnswer } from '../utils';
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
    const [onCorrect, onWrong] = useAnswer();

    const onCheck: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const answer = sequenceSelectedWords.join(answerJoinSymbol);
        const isCorrect = sequenceCorrectAnswers.includes(answer);

        if (isCorrect) {
            sequenceOnSuccessHandler();
            sequenceOnSuccessHandlerApi.remove();
            sequenceToolbarWordsApi.hide();
            onCorrect(event.currentTarget);
            sequenceSelectedWordsApi.clear();
        } else {
            onWrong(event.currentTarget);
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
