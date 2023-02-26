import { useEffect, useRef, useState } from 'react';
import islandImage from '../../../assets/images/island.jpeg';
import { currentLessonApi } from '../../lib/store';

import style from './map.module.css';

// x and y are percents
const marks = [
    { x: 60, y: 75, lessonId: 0 },
    { x: 52, y: 74, lessonId: 1 },
    { x: 51, y: 69, lessonId: 2 },
];
type Sizes = {
    x: number;
    y: number;
};

export const Map = () => {
    const image = useRef<HTMLImageElement | null>(null);
    const [sizes, setSizes] = useState<Sizes>();

    useEffect(() => {
        image.current?.addEventListener('load', () => {
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
        });
    }, [image.current]);

    const getMarks = () => {
        if (!sizes) {
            return null;
        }

        return marks.map((mark) => {
            const onMarkClick = () => {
                currentLessonApi.set(mark.lessonId);
            };

            return (
                <div
                    key={mark.lessonId}
                    className={style.markWrapper}
                    onClick={onMarkClick}
                    style={{ top: (sizes.y * mark.y) / 100, left: (sizes.x * mark.x) / 100 }}
                >
                    <div className={style.mark} />
                </div>
            );
        });
    };

    return (
        <div className={style.mapWrapper}>
            <img ref={image} src={islandImage} className={style.map} />
            {getMarks()}
        </div>
    );
};
