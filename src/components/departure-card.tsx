import React from "react";
import type { Departure } from "../server/trpc/models/departure";
import { formatDateTime } from "../utils/format-dt";

interface Props {
    departure: Departure
}

export function DepartureCard(props: Props): React.ReactElement {

    const { departure } = props;
    return (
        <div>
            {formatDateTime(departure.when)}
        </ div>
    );
}