import { products } from "../utils/products";

export const GlobalStats = () => {
    const productCount = products.length;

    const screenCount = products.reduce((sum, product) => {
        return sum + (product.stats.screens?.total || 0);
    }, 0);

    return (
        <div className="flex gap-10 items-center">
            <div className="flex gap-5 font-mono h-12 items-center">
                <div>
                    Total Products
                </div>
                <div>
                    {productCount}
                </div>
            </div>
            <div className="flex gap-5 font-mono h-12 items-center">
                <div>
                    Total Screens
                </div>
                <div>
                    {screenCount.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
