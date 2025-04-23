import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const productsFilePath = join(__dirname, '../data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProductsFoundedByYear(products) {
    const counts = products.reduce((acc, product) => {
        const year = product.year_founded;
        if (year) {
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {});

    const years = Object.keys(counts).map(Number);
    const minYear = Math.min(...years);
    const maxYear = new Date().getFullYear();

    const result = {};
    for (let year = minYear; year <= maxYear; year++) {
        result[year] = counts[year] || 0;
    }

    return result;
}

const productsFoundedByYear = getProductsFoundedByYear(productsData);

const productsFoundedByYearOutputFilePath = join(__dirname, '../data/charts/productsFoundedByYear.json');

fs.writeFileSync(productsFoundedByYearOutputFilePath, JSON.stringify(productsFoundedByYear, null, 2), 'utf-8');

console.log('Products founded by year has been generated');

function getProductsByHeadquarters(products) {
    const counts = products.reduce((acc, product) => {
        const headquarters = product.headquarters;
        if (headquarters && headquarters !== "Unknown") {
            acc[headquarters] = (acc[headquarters] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedHeadquarters = Object.entries(counts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .reduce((acc, [headquarters, count]) => {
            acc[headquarters] = count;
            return acc;
        }, {});

    return sortedHeadquarters;
}

const productsByHeadquarters = getProductsByHeadquarters(productsData);

const productsByHeadquartersOutputFilePath = join(__dirname, '../data/charts/productsByHeadquarters.json');

fs.writeFileSync(productsByHeadquartersOutputFilePath, JSON.stringify(productsByHeadquarters, null, 2), 'utf-8');

console.log('Products by headquarters has been generated');

function getProductsBySupportedPlatforms(products) {
    const platformCounts = products.reduce((acc, product) => {
        const platforms = product.supported_platforms || [];
        platforms.forEach(platform => {
            acc[platform] = (acc[platform] || 0) + 1;
        });
        return acc;
    }, {});

    const sortedPlatforms = Object.entries(platformCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .reduce((acc, [platform, count]) => {
            acc[platform] = count;
            return acc;
        }, {});

    return sortedPlatforms;
}

const productsBySupportedPlatforms = getProductsBySupportedPlatforms(productsData);

const productsBySupportedPlatformsOutputFilePath = join(__dirname, '../data/charts/productsBySupportedPlatforms.json');

fs.writeFileSync(productsBySupportedPlatformsOutputFilePath, JSON.stringify(productsBySupportedPlatforms, null, 2), 'utf-8');

console.log('Products by supported platforms has been generated');
