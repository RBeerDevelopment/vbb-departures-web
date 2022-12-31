import React from "react";

interface Props {
    children: React.ReactNode
}

export function DetailCard(props: Props): React.ReactElement {

    const { children } = props;

    return (
        <div className="flex flex-col items-start bg-white w-11/12 lg:w-1/2 min-h-min rounded-md my-2 md:my-4 p-4">
            {children}
        </div>
    );
}