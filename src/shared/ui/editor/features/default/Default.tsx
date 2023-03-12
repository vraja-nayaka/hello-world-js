import { RenderLeafProps } from 'slate-react';

export const Default = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;

    const { text, ...rest } = leaf;

    return (
        <span {...attributes} className={Object.keys(rest).join(' ')} key={children}>
            {children}
        </span>
    );
};
