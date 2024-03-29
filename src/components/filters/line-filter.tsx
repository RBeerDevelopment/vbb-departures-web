import { sortAlphabetically } from "@utils/sort";
import React from "react";

interface Props {
  lines: string[];
  setSelectedLine: (lineName: string) => void;
}

export function LineFilter(props: Props): React.ReactElement {
  const { lines, setSelectedLine } = props;

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedLine(event.target.value);
  }

  return (
    <select
      onChange={onChange}
      className="select-bordered select max-w-xs bg-white text-black"
    >
      <option selected value="All">
        Filter by line
      </option>
      {lines.sort(sortAlphabetically).map((l) => (
        <option key={l}>{l}</option>
      ))}
    </select>
  );
}
