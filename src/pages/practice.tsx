import { CodeHighlighting } from '../shared/ui/editor/Editor';
import { SequenceToolbar } from '../shared/ui/editor/features/sequence/SequenceToolbar';
import { TopToolbar } from '../shared/ui/top-toolbar/TopToolbar';
import { lessons } from '../shared/ui/editor/lessons';

type Props = {
    currentLesson: number;
};

export const PracticePage = (props: Props) => {
    const { currentLesson } = props;

    return (
        <>
            <CodeHighlighting lesson={lessons[currentLesson]} />
            <SequenceToolbar />
            <TopToolbar />
        </>
    );
};
