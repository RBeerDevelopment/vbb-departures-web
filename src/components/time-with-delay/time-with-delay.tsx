import { DelayText } from "@components/delay-text";
import { formatTimeHHMM } from "@utils/format-time";
import React from "react";

interface Props {
    time?: Date
    delay?: number
}

export function TimeWithDelay(props: Props): React.ReactElement {

    const { time, delay } = props;

    if(!time) return <p>-</p>;

    return (
        <p>{formatTimeHHMM(time)} {delay ? <DelayText delay={delay} /> : ""}</p>
    );
}