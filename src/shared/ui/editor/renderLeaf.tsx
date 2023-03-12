import { RenderLeafProps } from 'slate-react';
import { BetterComment, isBetterComment } from './features/better-comment';
import { Default } from './features/default';
import { Input, isInput } from './features/input';
import { isSelectButton, SelectButton } from './features/select-buttons';
import { isSequence, Sequence } from './features/sequence';

export const renderLeaf = (props: RenderLeafProps) => {
    if (isBetterComment(props)) {
        return <BetterComment {...props} />;
    }

    if (isSelectButton(props)) {
        return <SelectButton {...props} />;
    }

    if (isInput(props)) {
        return <Input {...props} />;
    }

    if (isSequence(props)) {
        return <Sequence {...props} />;
    }

    return <Default {...props} />;
};
