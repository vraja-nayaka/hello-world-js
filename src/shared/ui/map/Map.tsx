import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
import islandImage from '../../../assets/images/island.jpeg';
import { $successLessons, currentLessonApi } from '../../lib/store';

import style from './map.module.css';

// x and y are percents
const marks = [
    { x: 60, y: 75, lessonId: 0 },
    { x: 52, y: 74, lessonId: 1 },
    { x: 51, y: 69, lessonId: 2 },
    { x: 50, y: 62, lessonId: 3 },
    { x: 54, y: 58, lessonId: 4 },
    { x: 50, y: 54, lessonId: 5 },
    { x: 55, y: 50, lessonId: 6 },
    { x: 58, y: 45, lessonId: 7 },
    { x: 66, y: 47, lessonId: 8 },
    { x: 63, y: 42, lessonId: 9 },
    // поле практики
    { x: 75, y: 43, lessonId: 10 },
    // Побережье
    { x: 79, y: 38, lessonId: 11 },
    { x: 84, y: 43, lessonId: 12 },
    // Лес
    { x: 82, y: 47, lessonId: 13 },
];
type Sizes = {
    x: number;
    y: number;
};

export const Map = () => {
    const image = useRef<HTMLImageElement | null>(null);
    const [sizes, setSizes] = useState<Sizes>();
    const successLessons = useStore($successLessons);

    useEffect(() => {
        const updateSizes = () => {
            if (image.current) {
                setSizes({ x: image.current.width, y: image.current.height });
                (image.current?.parentNode as HTMLDivElement).scrollTo({
                    behavior: 'auto',
                    left: (((image.current?.width || 0) - 400) * marks[0].x) / 100,
                });
                setTimeout(() => {
                    window.scrollTo({ behavior: 'auto', top: image.current?.height });
                }, 100);
            }
        };
        updateSizes();

        image.current?.addEventListener('load', updateSizes);
        return () => {
            image.current?.removeEventListener('load', updateSizes);
        };
    }, [image.current]);

    const getMarks = () => {
        if (!sizes) {
            return null;
        }

        return marks.map((mark) => {
            const isHideMark = mark.lessonId > Math.max(...successLessons, 0) + 1;

            const onMarkClick = () => {
                currentLessonApi.set(mark.lessonId);
                window.scrollTo({ behavior: 'auto', top: 0 });
            };

            return (
                <div
                    key={mark.lessonId}
                    className={clsx(style.markWrapper, {
                        [style.markWrapperSuccess]: successLessons.includes(mark.lessonId),
                        [style.markWrapperHidden]: isHideMark,
                    })}
                    onClick={isHideMark ? undefined : onMarkClick}
                    style={{ top: (sizes.y * mark.y) / 100, left: (sizes.x * mark.x) / 100 }}
                >
                    <div className={style.mark}>{mark.lessonId}</div>
                </div>
            );
        });
    };

    return (
        <div className={style.mapWrapper}>
            <img ref={image} src={islandImage} className={clsx(style.map)} />
            {getMarks()}
        </div>
    );
};
