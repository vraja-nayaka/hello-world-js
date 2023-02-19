import Prism from "prismjs";
import { useState } from "react";
import { createEditor, Element } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { withHistory } from "slate-history";
import { prismThemeCss } from "./prism/prismTheme";
import { useOnKeydown } from "./useOnKeydown";

import { SetNodeToDecorations } from "./prism";
import { useDecorate } from "./useDecorate";
import { renderLeaf } from "./renderLeaf";
import { renderElement } from "./renderElement";

// its just for init
Prism;

type Props = {
  initialValue: Element[];
};

export const CodeHighlighting = ({ initialValue }: Props) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const decorate = useDecorate(editor);
  const onKeyDown = useOnKeydown(editor);

  return (
    <Slate editor={editor} value={initialValue}>
      <SetNodeToDecorations />
      <Editable
        decorate={decorate}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        readOnly
        className="line-numbers"
      />
      <style>{prismThemeCss}</style>
    </Slate>
  );
};
