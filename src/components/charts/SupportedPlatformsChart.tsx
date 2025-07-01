import { BarList } from "./BarList"
import supportedPlatforms from "../../../data/charts/productsBySupportedPlatforms.json"
import products from "../../../data/products.json"

const totalValue = products.length

const data = Object.entries(supportedPlatforms).map(([key, value]) => {
    const percentage = ((value / totalValue) * 100).toFixed(2);

    return {
        name: `${key} (${percentage}%)`,
        value: value,
    };
});

export const SupportedPlatformsChart = () => {
  return <BarList data={data} />
}