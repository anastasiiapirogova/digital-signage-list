import { readFile } from 'fs/promises';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';

function getProductPricing(products) {
  return products.map(product => {
    if (!product.pricing || !product.pricing.plans || product.pricing.plans.length === 0) {
      return null;
    }

    const plan = product.pricing.plans.find(p => p.yearly && p.yearly !== 0) ||
      product.pricing.plans.find(p => p.monthly);

    if (!plan) {
      return null;
    }

    const monthlyPrice = plan.yearly !== null ? plan.yearly / 12 : plan.monthly;

    return {
      id: product.id,
      name: product.name,
      monthlyPrice: monthlyPrice.toFixed(2)
    };
  }).filter(Boolean);
}

async function processProducts() {
  try {
    const dataFolder = path.resolve('data', 'products');
    const fileNames = await readdir(dataFolder);

    const products = [];

    for (const fileName of fileNames) {
      const filePath = path.join(dataFolder, fileName);
      const data = await readFile(filePath, 'utf-8');
      products.push(JSON.parse(data));
    }

    const productList = Array.isArray(products) ? products : [products];

    const result = getProductPricing(productList);

    const prices = result.map(product => parseFloat(product.monthlyPrice)).sort((a, b) => a - b);

    const lowerPercentileIndex = Math.floor(prices.length * 0.05);
    const upperPercentileIndex = Math.ceil(prices.length * 0.95) - 1;

    const filteredPrices = prices.slice(lowerPercentileIndex, upperPercentileIndex + 1);

    const minPrice = filteredPrices[0] || 0;
    const maxPrice = filteredPrices[filteredPrices.length - 1] || 0;
    const priceRange = maxPrice - minPrice;

    const cheapThreshold = minPrice + priceRange * 0.33;
    const mediumThreshold = minPrice + priceRange * 0.66;

    for (const fileName of fileNames) {
      const productId = path.basename(fileName, '.json');
      const product = result.find(p => p.id === productId);

      if (product) {
        let tier = '';
        const price = parseFloat(product.monthlyPrice);

        if (price <= cheapThreshold) {
          tier = 'affordable';
        } else if (price > cheapThreshold && price <= mediumThreshold) {
          tier = 'midRange';
        } else {
          tier = 'premium';
        }

        const filePath = path.join(dataFolder, fileName);
        const data = await readFile(filePath, 'utf-8');
        const productData = JSON.parse(data);
        productData.pricing = productData.pricing || {};
        productData.pricing.tier = tier;

        await writeFile(filePath, JSON.stringify(productData, null, 2), 'utf-8');
      }
    }
  } catch (error) {
    console.error(error);
  }
}

processProducts();
