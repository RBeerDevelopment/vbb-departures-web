import React from "react";
import type { ProductsBoolean } from "@server/trpc/models/utils";

interface Props {
  products: ProductsBoolean;
}

interface Icon {
  letter: string;
  color: string;
}

export function ProductRow(props: Props): React.ReactElement {
  const { products } = props;

  const icons: Icon[] = [];
  Object.entries(products).forEach(([type, isPresent]) => {
    if (!isPresent) {
      return;
    }

    if (type === "suburban") {
      icons.push({ letter: "S", color: "bg-green-600" });
    } else if (type === "subway") {
      icons.push({ letter: "U", color: "bg-blue-600" });
    } else if (type === "tram") {
      icons.push({ letter: "M", color: "bg-red-600" });
    }
  });
  return (
    <div className="flex flex-row gap-1.5 ">
      {icons.sort(sortIconInverse).map((i) => (
        <span
          key={i.letter}
          className={`${i.color} inline-flex h-6 w-6 items-center justify-center rounded-md text-lg text-white`}
        >
          {i.letter}
        </span>
      ))}
    </div>
  );
}

function sortIconInverse(a: Icon, b: Icon) {
  return b.letter.localeCompare(a.letter);
}
