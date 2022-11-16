import React from "react";
import type { Products } from "../server/trpc/models/location";

interface Props {
    products: Products
}

interface Icon {
    letter: string
    color: string
}

export function ProductRow(props: Props): React.ReactElement {

    const { products } = props;

    const icons: Icon[] = []
    Object.entries(products).forEach(([type, isPresent]) => {
        if (!isPresent) {
            return;
        }

        if (type === "suburban") {
            icons.push({ letter: "S", color: "bg-green-600" })
        }
        else if (type === "subway") {
            icons.push({ letter: "U", color: "bg-blue-600" })
        }
        else if (type === "tram") {
            icons.push({ letter: "M", color: "bg-red-600" })
        }
    })
    return (
        <div className="flex flex-row gap-0.5">
            {icons.map(i => (
                <span key={i.letter} className={`${i.color} text-white w-6 h-6 text-lg rounded-md text-center`}>{i.letter}</span>
            ))}
        </ div>
    );
}