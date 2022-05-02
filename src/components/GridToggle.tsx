import { ViewGridIcon } from "@heroicons/react/solid";
import { useGridSizeState } from "../lib/hooks";
import { LargeGridIcon } from "./Icons";

export const GridSizeToggle = () => {
  const [gridSize, setGridSize] = useGridSizeState();

  return (
    <button
      type="button"
      className="hidden lg:p-2 lg:m-2 lg:text-gray-400 lg:hover:text-gray-500 lg:flex"
      onClick={() => setGridSize(!gridSize)}
    >
      {gridSize ? (
        <LargeGridIcon aria-hidden="true" />
      ) : (
        <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};
