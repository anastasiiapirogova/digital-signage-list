import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const productsDir = join(__dirname, '..', 'data', 'products');

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

            let modified = false;

            if (Array.isArray(json)) {
                json.forEach(product => {
                    if (
                        product.supported_platforms &&
                        Array.isArray(product.supported_platforms)
                    ) {
                        if (
                            product.supported_platforms.includes('Android') &&
                            !product.supported_platforms.includes('Fire OS')
                        ) {
                            product.supported_platforms.push('Fire OS');
                            modified = true;
                        }
                        product.supported_platforms.sort();
                    }
                });
            } else if (
                json.supported_platforms &&
                Array.isArray(json.supported_platforms)
            ) {
                if (
                    json.supported_platforms.includes('Android') &&
                    !json.supported_platforms.includes('Fire OS')
                ) {
                    json.supported_platforms.push('Fire OS');
                    modified = true;
                }
                json.supported_platforms.sort();
            }

            fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        } catch (parseError) {
            console.error(`Error parsing ${file}:`, parseError.message);
        }
    });
});