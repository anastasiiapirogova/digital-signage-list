import { products } from "../utils/products";

export const GlobalStats = () => {
    const productCount = products.length;

    const screenCount = products.reduce((sum, product) => {
        return sum + (product.stats.screens?.total || 0);
    }, 0);

    const medianScreensPerProduct = (() => {
        const screens = products
            .map(product => product.stats.screens?.total)
            .filter(total => total !== undefined)
            .filter(total => total !== null)
            .sort((a, b) => a - b);

        const mid = Math.floor(screens.length / 2);
        
        return screens.length % 2 === 0
            ? (screens[mid - 1] + screens[mid]) / 2
            : screens[mid];
    })();

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
            <div className="flex gap-5 font-mono h-12 items-center">
                <div>
                    Median Screens per Product
                </div>
                <div>
                    {medianScreensPerProduct.toLocaleString()}
                </div>
            </div>
        </div>
    )
}
