import React, { useEffect, useRef, useState } from "react";

interface Props {
    value: string
    onChange: (newVal: string) => void
    placeholder?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {

    const { value, onChange, placeholder = "" } = props;

    const [localVal, setLocalVal] = useState(value);

    const firstRender = useRef(true);

    useEffect(() => {
        if (value === "") setLocalVal("");
    }, [value]);


    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            onChange(localVal);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [localVal, onChange]);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalVal(event.target.value);
    }
    return (
        <input type="text" ref={ref} placeholder={placeholder} value={localVal} className="bg-white placeholder:italic placeholder:text-slate-400 placeholder:text-center lg:w-1/4 w-3/4 text-black shadow-lg mt-8 text-md rounded-md focus:border-red-700 p-2.5" onChange={handleOnChange} />
    );
});

// necessary to have a display name for the component (eslint: react/display-name)
Input.displayName = "DeboundcedInput";
export const DebouncedInput = Input;