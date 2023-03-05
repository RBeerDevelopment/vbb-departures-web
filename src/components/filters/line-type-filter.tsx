import { LineType, LineTypeLabels } from "@server/trpc/models/utils";
import { sortAlphabetically } from "@utils/sort";
import React from "react";

export type LineTypeWithAll = "All" | LineType;

interface Props {
  lineTypes: LineType[];
  setSelectedLineType: (lineType: LineTypeWithAll) => void;
}

export function LineTypeFilter(props: Props): React.ReactElement {
  const { lineTypes, setSelectedLineType } = props;

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    if (!isLineTypeWithAll(value)) return;
    setSelectedLineType(value);
  }

  return (
    <select
      onChange={onChange}
      className="select-bordered select max-w-xs bg-white text-black"
    >
      <option selected value="All">
        Filter by type
      </option>
      {lineTypes.sort(sortAlphabetically).map((l) => (
        <option key={l} value={l}>
          {LineTypeLabels[l]}
        </option>
      ))}
    </select>
  );
}

function isLineTypeWithAll(value: unknown): value is LineTypeWithAll {
  return (
    value === "All" ||
    (typeof value === "string" && LineType.includes(value as LineType))
  );
}
