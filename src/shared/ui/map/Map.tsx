import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useEffect, useRef, useState } from 'react';

import islandImage from '../../../assets/images/island.jpeg';
import { $successLessons } from '../../lib/store';

import style from './map.module.css';
import { Mark, Sizes } from './Mark';

// x and y are percents
const marks = [
    { x: 60, y: 75, lessonId: 0, title: 'Строки и числа (strings and numbers)' },
    { x: 52, y: 74, lessonId: 1, title: 'Сложение и конкатинация' },
    { x: 51, y: 69, lessonId: 2, title: 'Пробелы и приоритетность' },
    { x: 50, y: 62, lessonId: 3, title: 'Переменные (variables)'  },
    { x: 54, y: 58, lessonId: 4, title: 'ФУНКЦИИ (functions)'  },
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

        return marks.map((mark) => <Mark key={mark.lessonId} sizes={sizes} {...mark} />);
    };

    return (
        <div className={style.mapWrapper}>
            <img ref={image} src={islandImage} className={clsx(style.map)} />
            {getMarks()}
        </div>
    );
};
