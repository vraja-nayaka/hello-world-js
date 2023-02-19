import { RenderLeafProps } from "slate-react";
import { isSelectButton, SelectButton } from "./features/select-buttons";

export const renderLeaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;

  if (isSelectButton(props)) {
    return <SelectButton {...props} />;
  }

  const { text, ...rest } = leaf;

  return (
    <span
      {...attributes}
      className={Object.keys(rest).join(" ")}
      key={children}
    >
      {children}
    </span>
  );
};
