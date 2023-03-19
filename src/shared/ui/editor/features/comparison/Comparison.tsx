import clsx from 'clsx';
import { MouseEvent, useMemo, useRef, useState } from 'react';
import { ReactEditor, RenderLeafProps, useSlateStatic } from 'slate-react';

import { shufflePairs, useAnswer } from '../utils';
import { splitSymbol, conformitySymbol } from './helpers';

import style from './index.module.css';

type Item = { column: number; index: number };

export const Comparison = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;

    const { text, ...rest } = leaf;

    const editor = useSlateStatic();
    const [onCorrect, onWrong] = useAnswer();

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [completedItems, setCompletedItems] = useState<Item[]>([]);

    const innerText: string = children.props.leaf.text.slice(2, -2);
    const correctPairs = useMemo(
        () => innerText.split(splitSymbol).map((pair) => pair.split(conformitySymbol)),
        [innerText]
    );

    const shuffledPairs = useMemo(() => shufflePairs(correctPairs), [correctPairs]);

    const isPassed = completedItems.length === correctPairs.length * 2;

    const displayedPairs = isPassed ? correctPairs : shuffledPairs;

    const ref = useRef(null);

    const onItemClick = (column: number, index: number, event: MouseEvent<HTMLButtonElement>) => {
        if (selectedItem && selectedItem.column !== column) {
            const selectedValues = {
                [column]: shuffledPairs[index][column],
                [selectedItem.column]: shuffledPairs[selectedItem.index][selectedItem.column],
            };

            const isSomeCorrect = correctPairs.some((correctPair) => {
                const isCorrect =
                    correctPair[0] === selectedValues[0] && correctPair[1] === selectedValues[1];
                return isCorrect;
            });

            if (isSomeCorrect) {
                const isFinalPair = completedItems.length + 2 === correctPairs.length * 2;
                setCompletedItems([
                    ...completedItems,
                    { column, index },
                    { column: selectedItem.column, index: selectedItem.index },
                ]);
                onCorrect(event.currentTarget, { incomplete: !isFinalPair });
            } else {
                onWrong(event.currentTarget);
            }

            setSelectedItem(null);
        } else {
            setSelectedItem({ column, index });
        }
    };

    const isItemSelected = (column: number, index: number) => {
        return selectedItem?.column === column && selectedItem?.index === index;
    };

    const isItemComplete = (column: number, index: number) => {
        return completedItems?.some((item) => item.column === column && item.index === index);
    };

    return (
        <div
            ref={ref}
            {...attributes}
            role='button'
            tabIndex={0}
            className={clsx(style.wrapper, {})}
        >
            {displayedPairs.map((row, index) => {
                const getButtonClassNames = (column: number) => {
                    return clsx(Object.keys(rest), style.item, {
                        [style.itemSelected]: isItemSelected(column, index),
                        [style.itemComplete]: isItemComplete(column, index),
                    });
                };

                return (
                    <div key={row[0] + row[1]} className={style.row}>
                        <button
                            {...attributes}
                            className={getButtonClassNames(0)}
                            onClick={(e) => onItemClick(0, index, e)}
                        >
                            {row[0]}
                        </button>
                        <button
                            {...attributes}
                            className={getButtonClassNames(1)}
                            onClick={(e) => onItemClick(1, index, e)}
                        >
                            {row[1]}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
