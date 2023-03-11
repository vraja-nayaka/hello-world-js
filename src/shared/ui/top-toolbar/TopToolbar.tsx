import { useStore } from 'effector-react';
import { $errors, currentLessonApi } from '../../lib/store';

import style from './top-toolbar.module.css';

export const TopToolbar = () => {
    const errors = useStore($errors);

    const handleQuit = () => {
        currentLessonApi.reset();
    };

    return (
        <div className={style.toolbar}>
            {/* <div className={style.wrapper}> */}
            <button onClick={handleQuit}>Выйти</button>
            {Boolean(errors) && <div className={style.errors}>{errors} 🐞</div>}
            {/* </div> */}
        </div>
    );
};
