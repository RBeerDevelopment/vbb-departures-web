import React from "react";

interface Props {
  delay: number;
}

export function DelayText(props: Props): React.ReactElement {
  const delay = props.delay / 60;

  let color = "text-black";
  let delayStr = String(delay);

  if (delay === 0) return <></>;

  if (delay > 0) {
    color = "text-red-800 dark:text-red-600";
    delayStr = `+${delay}`;
  } else if (delay < 0) color = "text-green-800 dark:text-green-600";

  return (
    <span className={`${color} text-md font-bold`}>
      {delayStr.length > 0 && `${delayStr} min`}
    </span>
  );
}
