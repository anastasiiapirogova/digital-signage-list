import { LineChart } from "./LineChart";
import chartData from "../../../../data/charts/productsFoundedByYear.json";

const data = Object.entries(chartData)
    .filter(([key]) => parseInt(key, 10) >= 1990)
    .reduce((acc, [key, value]) => {
        const previousTotal = acc.length > 0 ? acc[acc.length - 1]["Total products"] : 0;
        acc.push({
            date: key,
            "Total products": previousTotal + value,
        });
        return acc;
    }, [] as { date: string; "Total products": number }[]);

export const TotalProductsChart = () => (
    <LineChart
        className="h-80"
        data={data}
        index="date"
        categories={["Total products"]}
        valueFormatter={(number: number) =>
            `${Intl.NumberFormat("us").format(number).toString()}`
        }
        onValueChange={(v) => console.log(v)}
    />
);