import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import { createEditor, Transforms } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { withHistory } from 'slate-history';
import { prismThemeCss } from './prism/prismTheme';
import { useOnKeydown } from './useOnKeydown';

import { SetNodeToDecorations } from './prism';
import { useDecorate } from './useDecorate';
import { renderLeaf } from './renderLeaf';
import { renderElement } from './renderElement';
import { useStore } from 'effector-react';
import { $currentCodeBlock } from '../../lib/store';
import { NextButton } from '../next-button/NextButton';
import { getJsxCodeBlock } from './features/utils';

import style from './editor.module.css';

// its just for init
Prism;

type Props = {
    lesson: string[];
};

export const CodeHighlighting = ({ lesson }: Props) => {
    const [editor] = useState(() => withHistory(withReact(createEditor())));
    const initialValue = lesson.map((value) => getJsxCodeBlock(value));

    const onClearEditor = () => {
        const point = { path: [0, 0], offset: 0 };
        editor.selection = { anchor: point, focus: point };
        editor.history = { redos: [], undos: [] };
        editor.children = [{ type: 'paragraph', children: [{ text: '' }] }];
    };

    const decorate = useDecorate(editor);
    const onKeyDown = useOnKeydown(editor);
    const currentCodeBlock = useStore($currentCodeBlock);
    const isShowNextButton = currentCodeBlock >= initialValue.length - 1;

    useEffect(() => {
        if (currentCodeBlock < initialValue.length) {
            Transforms.insertNodes(editor, initialValue[currentCodeBlock], {
                at: [editor.children.length],
            });
        }
    }, [currentCodeBlock]);

    return (
        <div className={style.editorWrapper}>
            <Slate editor={editor} value={[]}>
                <SetNodeToDecorations />
                <Editable
                    decorate={decorate}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    readOnly
                    className='line-numbers codeBlock'
                />
                <style>{prismThemeCss}</style>
            </Slate>
            {isShowNextButton && <NextButton onClearEditor={onClearEditor} />}
        </div>
    );
};
