import { RenderLeafProps } from 'slate-react';
import { Default } from '../default';
import { questionSymbol, dangerSymbol, todoSymbol } from './helpers';

import style from './index.module.css';

export const BetterComment = (props: RenderLeafProps) => {
    const { attributes, children } = props;

    const commentText: string = children.props.leaf.text;

    let classes = '';
    if (commentText.startsWith(questionSymbol)) {
        classes = style.commentQuestion;
    }
    if (commentText.startsWith(dangerSymbol)) {
        classes = style.commentDanger;
    }
    if (commentText.startsWith(todoSymbol)) {
        classes = style.commentTodo;
    }

    if (classes) {
        return (
            <span className={classes} {...attributes}>
                {children}
            </span>
        );
    }

    return <Default {...props} />;
};
