import clsx from 'clsx';
import { useStore } from 'effector-react';
import Tooltip from '@tippyjs/react';

import { $successLessons, currentLessonApi } from '../../lib/store';

import style from './map.module.css';

export type Sizes = {
    x: number;
    y: number;
};

type MarkProps = {
    lessonId: number;
    x: number;
    y: number;
    title?: string;
    sizes: Sizes;
};

export const Mark = (props: MarkProps) => {
    const { lessonId, x, y, sizes, title } = props;
    const successLessons = useStore($successLessons);
    const isHideMark = lessonId > Math.max(...successLessons, 0) + 1;

    const onMarkClick = () => {
        currentLessonApi.set(lessonId);
        window.scrollTo({ behavior: 'auto', top: 0 });
    };

    const content = (
        <div>
            <div>{title}</div>
            <button className={style.contentButton} onClick={isHideMark ? undefined : onMarkClick}>
                Начать урок
            </button>
        </div>
    );

    return (
        <Tooltip
            key={lessonId}
            content={content}
            arrow
            trigger='click'
            interactive={true}
            animation='scale'
            duration={[500, 500]}
        >
            <div
                className={clsx(style.markWrapper, {
                    [style.markWrapperSuccess]: successLessons.includes(lessonId),
                    [style.markWrapperHidden]: isHideMark,
                })}
                style={{ top: (sizes.y * y) / 100, left: (sizes.x * x) / 100 }}
            >
                <div className={style.mark}>{lessonId}</div>
            </div>
        </Tooltip>
    );
};
