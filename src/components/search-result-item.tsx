import Link from "next/link";
import React from "react";
import type { LocationModel } from "@server/trpc/models/location";
import { ProductRow } from "./product-row";

interface Props {
  location: LocationModel;
  rounded?: boolean;
}

export function SearchResultItem(props: Props): React.ReactElement {
  const { location, rounded = false } = props;

  const { name, products, id } = location;
  return (
    <Link href={`/departures/${id}`}>
      <div
        className={`flex w-full cursor-pointer flex-col gap-2 bg-white p-4 text-black ${
          rounded && "rounded-md"
        }`}
      >
        {name}
        <div className="flex flex-row gap-4">
          <ProductRow products={products} />
          {location.distance && (
            <p className="text-gray-400">{location.distance}m</p>
          )}
        </div>
      </div>
    </Link>
  );
}
