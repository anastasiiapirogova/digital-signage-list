import { BarList } from "./BarList"
import headquarters from "../../../data/charts/productsByHeadquarters.json"
import products from "../../../data/products.json"

const totalValue = products.length

const data = Object.entries(headquarters).map(([key, value]) => {
    const percentage = ((value / totalValue) * 100).toFixed(2);

    return {
        name: `${key} (${percentage}%)`,
        value: value,
    };
});

export const HeadquartersChart = () => {
  return <BarList data={data} />
} 