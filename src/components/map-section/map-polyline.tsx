import React from 'react'

import { MapContext } from 'react-mapkit'
import type { PolylinePoints } from './polyline-points'



type PolylineProps = {
    polylinePoints: PolylinePoints,
    style?: mapkit.Style
}

export const createMapPolyline = (
    polylinePoints: PolylinePoints,
    style?: mapkit.Style
) => {
    const coords = polylinePoints.map(p => {
        return new mapkit.Coordinate(p[0], p[1]);
    });

    const defaultStyleProps = {
        lineWidth: 3,
        lineJoin: "round",
        strokeColor: "#F0F"
    }

    const mapkitStyle = new mapkit.Style({
        ...defaultStyleProps,
        ...style
    });
    return new mapkit.PolylineOverlay(coords, { style: mapkitStyle })
}


export const MapPolyline: React.FC<PolylineProps> = ({
    polylinePoints,
    style
}) => {

    const { mapkit, map } = React.useContext(MapContext)
    const polyline = React.useRef<mapkit.PolylineOverlay>()

    React.useEffect(() => {
        if (mapkit && map) {
            polyline.current = createMapPolyline(polylinePoints, style)

            map.addOverlay(polyline.current)

        }
        return () => { polyline.current && map && map.removeOverlay(polyline.current) }
    }, [mapkit, map, style, polylinePoints])

    return null
}
