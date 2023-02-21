import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import { createEditor, Element, Transforms } from 'slate';
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

// its just for init
Prism;

type Props = {
    initialValue: Element[];
};

export const CodeHighlighting = ({ initialValue }: Props) => {
    const [editor] = useState(() => withHistory(withReact(createEditor())));

    const decorate = useDecorate(editor);
    const onKeyDown = useOnKeydown(editor);
    const currentCodeBlock = useStore($currentCodeBlock);
    const isShowNextButton = currentCodeBlock >= initialValue.length - 1;

    const [value] = initialValue;
    useEffect(() => {
        if (currentCodeBlock !== 0 && currentCodeBlock < initialValue.length) {
            Transforms.insertNodes(editor, initialValue[currentCodeBlock], {
                at: [editor.children.length],
            });
        }
    }, [currentCodeBlock]);

    return (
        <>
            <Slate editor={editor} value={[value]}>
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
            {isShowNextButton && <NextButton />}
        </>
    );
};
