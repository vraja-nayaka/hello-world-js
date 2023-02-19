import { RenderLeafProps } from "slate-react";
import { Input, isInput } from "./features/input";
import { isSelectButton, SelectButton } from "./features/select-buttons";

export const renderLeaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;

  if (isSelectButton(props)) {
    return <SelectButton {...props} />;
  }

  if (isInput(props)) {
    return <Input {...props} />;
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
