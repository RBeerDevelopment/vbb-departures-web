import React from "react";

interface Props {
  children: React.ReactNode;
}

export function DetailCard(props: Props): React.ReactElement {
  const { children } = props;

  return (
    <div className="my-2 flex min-h-min w-11/12 flex-col items-start rounded-md bg-white p-4 dark:bg-gray-800 dark:text-white md:my-4 lg:w-1/2">
      {children}
    </div>
  );
}
