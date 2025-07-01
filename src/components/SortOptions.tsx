import { useStore } from "@nanostores/react";
import { productsSortOptionStore, setProductsSortOption, type ProductsSortOption } from "../utils/productsSortOptionStore";

export const SortOptions = () => {
  const $sort = useStore(productsSortOptionStore);

  const nameAsc: ProductsSortOption = {
    sortBy: "name",
    sortOrder: "asc",
  };

  const shuffle: ProductsSortOption = {
    sortBy: "shuffle",
    sortOrder: null,
  };

  const screensDesc: ProductsSortOption = {
    sortBy: "screens",
    sortOrder: "desc",
  };

  const handleSortChange = (option: ProductsSortOption) => {
    setProductsSortOption(option);
  };

  return (
    <div className="inline-flex bg-neutral-100 p-1.5 rounded-xl">
      <button
        onClick={() => handleSortChange(nameAsc)}
        className={[
          "px-4 py-1.5 rounded-lg",
          $sort.sortBy === "name" && $sort.sortOrder === "asc"
            ? "bg-white text-black"
            : "text-neutral-800",
        ].join(" ")}
      >
        Name
      </button>
      <button
        onClick={() => handleSortChange(screensDesc)}
        className={[
          "px-4 py-1.5 rounded-lg",
          $sort.sortBy === "screens"
            ? "bg-white text-black"
            : "text-neutral-800"
        ].join(" ")}
      >
        Screens
      </button>
      <button
        onClick={() => handleSortChange(shuffle)}
        className={[
          "px-4 py-1.5 rounded-lg",
          $sort.sortBy === "shuffle"
            ? "bg-white text-black"
            : "text-neutral-800"
        ].join(" ")}
      >
        Shuffle
      </button>
     
    </div>
  )
}
