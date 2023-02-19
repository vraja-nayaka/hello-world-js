import { useCallback } from "react";
import { Editor } from "slate";
import isHotkey from "is-hotkey";

export const useOnKeydown = (editor: Editor) => {
    const onKeyDown: React.KeyboardEventHandler = useCallback((e) => {
      if (isHotkey("tab", e)) {
        // handle tab key, insert spaces
        e.preventDefault();
  
        Editor.insertText(editor, "  ");
      }
    }, []);
  
    return onKeyDown;
  };
  