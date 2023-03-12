import clsx from 'clsx';
import { useStore } from 'effector-react';
import { $errors, quitLesson } from '../../lib/store';

import style from './top-toolbar.module.css';

const bigErrorRatio = 5;

export const TopToolbar = () => {
    const errors = useStore($errors);

    const bigErrors = Math.floor(errors.length / bigErrorRatio);
    const smallErrors = errors.length % bigErrorRatio;
    const bigErrorsArray = Array.from(Array(bigErrors).keys()).reverse();
    const smallErrorsArray = Array.from(Array(smallErrors).keys()).reverse();

    return (
        <div className={style.toolbar}>
            <button onClick={quitLesson}>Выйти</button>
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
