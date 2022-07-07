import React, {useEffect} from "react";

export const useClickOutside = (ref, callback) => {
    // TODO 1: this hook should get a reference to an element and a callback, and will call it whenever you click outside of the element
    useEffect(() => {
        const handleClick = (e) => {
            if (isClickOutside(ref.current, e)) {
                callback();
            }
        };

        // if we'll put a listener for "click", it will be triggered right when the user releasing the mouse, causing the modal to be closed right when it mounts
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, callback]);
};

const isClickOutside = (element, clickEvent) => {
    return element && !element.contains(clickEvent.target);
};
