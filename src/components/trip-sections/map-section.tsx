import React from "react";
import { Map } from 'react-mapkit'
import type { PolylinePoints } from "../../utils/polyline-points";

interface Props {
    polylinePoints: PolylinePoints
}

export function MapSection(props: Props): React.ReactElement {

    const { polylinePoints } = props;

    return (
        <div className="h-96 w-96">
            <Map tokenOrCallback="eyJhbGciOiJFUzI1NiIsImtpZCI6IjlNNjZER1hCOEsiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiI0UlQ4NE05OU40IiwiaWF0IjoxNjY4NzE1MTM0Ljg4Njk3LCJleHAiOjE2NzIzMTUxMzQuODg2OTd9.qwbb-HxaG0VSLGs8ASi8Gd4g7Ol9qD_L4sCWxS955tpcmKY_du3XgKgSXGiLMj83DqF77lXFitgV9wPpLrYnCQ" >
            </Map>
        </div >
    );
}