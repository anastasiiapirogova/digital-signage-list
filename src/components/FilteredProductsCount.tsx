import { useStore } from "@nanostores/react";
import { productsStore } from "../utils/productsStore";
import { products } from "../utils/products";

export const FilteredProductsCount = () => {
  const $products = useStore(productsStore)
  
  return (
    <div className="text-3xl font-bold">
      { `${$products.length} of ${products.length} products` }
    </div>
  )
}
