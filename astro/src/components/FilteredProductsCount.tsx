import { useStore } from "@nanostores/react";
import { productFiltersStore } from "../utils/productFiltersStore";
import { useEffect, useState } from "react";
import { filterProducts } from "../utils/filterProducts";
import { products } from "../utils/products";

export const FilteredProductsCount = () => {
  const $filters = useStore(productFiltersStore);

  const [filteredProducts, setFilteredProducts] = useState(() =>
    filterProducts(products, $filters)
  );

  useEffect(() => {
    const newFilteredProducts = filterProducts(products, $filters);
    setFilteredProducts(newFilteredProducts);
  }, [$filters]);

  return (
    <div>
      { `${filteredProducts.length} of ${products.length} products` }
    </div>
  )
}
