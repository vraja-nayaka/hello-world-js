import clsx from 'clsx';
import { useStore } from 'effector-react';
import { $errors, currentLessonApi } from '../../lib/store';

import style from './top-toolbar.module.css';

const bigErrorRatio = 5;

export const TopToolbar = () => {
    const errors = useStore($errors);

    const handleQuit = () => {
        currentLessonApi.reset();
    };

    const bigErrors = Math.floor(errors / bigErrorRatio);
    const smallErrors = errors % bigErrorRatio;
    const bigErrorsArray = Array.from(Array(bigErrors).keys()).reverse();
    const smallErrorsArray = Array.from(Array(smallErrors).keys()).reverse();

    return (
        <div className={style.toolbar}>
            <button onClick={handleQuit}>Выйти</button>
            <div className={style.errorWrapper}>
                {smallErrorsArray.map((value) => (
                    <div key={value} className={style.error}>
                        🐞
                    </div>
                ))}
                {bigErrorsArray.map((value) => (
                    <div key={value} className={clsx(style.error, style.errorBigContainer)}>
                        <div className={clsx(style.error, style.errorBig)}>🐞</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
