import Link from "next/link";
import React from "react";
import type { LocationModel } from "../server/trpc/models/location"
import { ProductRow } from "./product-row";

interface Props {
    location: LocationModel
}

export function SearchResultItem(props: Props): React.ReactElement {

    const { location } = props;

    const { name, products, id } = location
    return (
        <Link href={`/departures/${id}`}>
            <div className="bg-white text-black w-full flex flex-col gap-2 p-3 cursor-pointer">
                {name}
                <div className="flex flex-row gap-4">
                    <ProductRow products={products} />
                    {location.distance && <p className="text-gray-400">{location.distance}m</p>}
                </div>
            </div>
        </Link>
    );
}