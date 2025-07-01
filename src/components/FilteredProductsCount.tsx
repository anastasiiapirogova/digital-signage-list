import { useStore } from "@nanostores/react";
import { productsStore } from "../utils/productsStore";
import { products } from "../utils/products";

export const FilteredProductsCount = () => {
  const $products = useStore(productsStore)
  
  return (
    <div>
      { `${$products.length} of ${products.length} products` }
    </div>
  )
}
