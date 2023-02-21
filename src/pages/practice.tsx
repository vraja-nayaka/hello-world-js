import { useStore } from 'effector-react';
import { $currentLesson } from '../shared/lib/store';
import { CodeHighlighting } from '../shared/ui/editor/Editor';
import { initialValue1, initialValue2 } from '../shared/ui/editor/initialValue';

export const PracticePage = () => {
    const currentLesson = useStore($currentLesson);

    return (
        <>
            {currentLesson === 0 && <CodeHighlighting initialValue={initialValue1} />}
            {currentLesson === 1 && <CodeHighlighting initialValue={initialValue2} />}
        </>
    );
};
