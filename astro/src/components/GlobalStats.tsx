import products from '../../../data/products.json';

export const GlobalStats = () => {
    const productCount = products.length;

    return (
        <div>
            <div className="flex gap-5 font-mono h-12 items-center">
                <div>
                    Total Products
                </div>
                <div>
                    {productCount}
                </div>
            </div>
        </div>
    )
}
