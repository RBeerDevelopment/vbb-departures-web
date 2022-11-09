import React, { useEffect, useRef, useState } from "react";

interface Props {
    value: string
    onChange: (newVal: string) => void
}

export function DebouncedInput(props: Props): React.ReactElement {

    const { value, onChange } = props;


    const [localVal, setLocalVal] = useState(value);

    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            onChange(localVal);
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [localVal, onChange])

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalVal(event.target.value)
    }
    return (
        <input type="text" className="bg-white w-1/3 text-black shadow-lg mt-8 text-md rounded-md focus:border-red-700 p-2.5" onChange={handleOnChange} />
    );
}