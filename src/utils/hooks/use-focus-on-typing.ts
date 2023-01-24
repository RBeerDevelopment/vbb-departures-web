import type { RefObject } from "react";
import { useEffect } from "react";

export function useFocusOnTyping(ref: RefObject<HTMLInputElement>) {

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.altKey || event.metaKey || event.altKey) {
                return;
            }

            ref.current?.focus();
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [ref]);

}