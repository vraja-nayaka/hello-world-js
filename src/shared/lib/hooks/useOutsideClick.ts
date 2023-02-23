import { RefObject } from 'react';

import { useEventListener } from './useEventListener';

type Handler = (event: MouseEvent) => void;
type Options = {
    mouseEvent?: 'mousedown' | 'mouseup';
    ignoredElementId?: string;
};

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    options?: Options
): void {
    const { mouseEvent = 'mousedown', ignoredElementId } = options || {};

    useEventListener(mouseEvent, (event) => {
        const el = ref?.current;
        const ignoredElement = ignoredElementId ? document.querySelector(`#${ignoredElementId}`) : null;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return;
        }
        if (ignoredElement?.contains(event.target as Node)) {
            return;
        }

        handler(event);
    });
}

export { useOnClickOutside };
