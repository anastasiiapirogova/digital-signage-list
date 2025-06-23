import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const productsDir = join(__dirname, '..', 'data', 'products');
const logosDir = join(__dirname, '..', 'data', 'logos', 'generated');

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

            const checkAndSetHasLogo = (product) => {
                const logoFilePath = join(logosDir, `${file.replace('.json', '.webp')}`);
                product.has_logo = fs.existsSync(logoFilePath);
                modified = true;
            };

            checkAndSetHasLogo(json);

            fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        } catch (parseError) {
            console.error(`Error parsing ${file}:`, parseError.message);
        }
    });
});
