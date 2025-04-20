import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const productsDir = join(__dirname, '..', 'data', 'products');
const outputFile = join(__dirname, '..', 'data', 'products.json');

let allProducts = [];

fs.readdir(productsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const jsonFiles = files.filter(file => file.endsWith('.json'));

    jsonFiles.forEach(file => {
        const filePath = join(productsDir, file);
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const json = JSON.parse(data);

            if (Array.isArray(json)) {
                allProducts = allProducts.concat(json);
            } else {
                allProducts.push(json);
            }
        } catch (parseError) {
            console.error(`Error parsing ${file}:`, parseError.message);
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(allProducts, null, 2));
    console.log(`Merged ${jsonFiles.length} files into products.json`);
});