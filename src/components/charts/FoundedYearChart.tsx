import { BarChart } from "./BarChart"
import chartData from "../../../data/charts/productsFoundedByYear.json"

const data = Object.entries(chartData)
    .filter(([key]) => parseInt(key, 10) >= 1990)
    .map(([key, value]) => {
        return {
            date: key,
            "New products": value,
        }
    })

export const FoundedYearChart = () => (
    <BarChart
        className="h-80"
        data={data}
        index="date"
        categories={["New products"]}
        valueFormatter={(number: number) =>
            `${Intl.NumberFormat("us").format(number).toString()}`
        }
        onValueChange={(v) => console.log(v)}
    />
)