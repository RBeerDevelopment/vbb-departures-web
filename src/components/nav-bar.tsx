import { useRouter } from "next/router";
import React from "react";
import { RefreshButton } from "./refresh-button";

interface Props {
  isMain?: boolean;
  favoriteFn?: () => void;
  isFavorite?: boolean;
}

export function NavBar(props: Props): React.ReactElement {
  const router = useRouter();
  const { isMain = false, favoriteFn, isFavorite } = props;

  if (isMain) return <></>;

  return (
    <div className="fixed top-0 z-50 flex h-16 w-screen flex-row items-center justify-center gap-4 bg-red-600 p-4 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-6 h-8 w-8 cursor-pointer text-white"
        onClick={router.back}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      <p className="text-2xl font-light text-white">VBB Departures</p>
      {Boolean(favoriteFn) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={favoriteFn}
          fill={isFavorite ? "#FFFF00" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      )}

      <div className="absolute right-6">
        <RefreshButton />
      </div>
    </div>
  );
}
