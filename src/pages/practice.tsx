import { useStore } from 'effector-react';
import { $currentLesson } from '../shared/lib/store';
import { CodeHighlighting } from '../shared/ui/editor/Editor';
import { SequenceToolbar } from '../shared/ui/editor/features/sequence/SequenceToolbar';
import { lesson0 } from '../shared/ui/editor/lessons/lesson0';
import { lesson1 } from '../shared/ui/editor/lessons/lesson1';

export const PracticePage = () => {
    const currentLesson = useStore($currentLesson);

    return (
        <>
            {currentLesson === 0 && <CodeHighlighting lesson={lesson0} />}
            {currentLesson === 1 && <CodeHighlighting lesson={lesson1} />}
            <SequenceToolbar />
        </>
    );
};
