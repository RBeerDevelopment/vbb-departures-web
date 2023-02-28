import React from "react";

interface Props {
  isExpanded: boolean;
}

const chevronUpPath =
  "M11.47 7.72 a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5 -7.5z";
const chevronDownPath =
  "M12.53 16.28 a.75.75 0 01 -1.06 0l -7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z";

export function ExpandIcon(props: Props): React.ReactElement {
  const { isExpanded } = props;

  const path = isExpanded ? chevronUpPath : chevronDownPath;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8"
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );
}
