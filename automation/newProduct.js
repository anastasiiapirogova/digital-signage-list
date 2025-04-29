import fs from 'fs';
import readline from 'readline';
import path from 'path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const createTemplate = async () => {
    const productId = await askQuestion('Enter Product ID: ');

    const template = {
        id: productId,
        name: "",
        description: "",
        website: "",
        headquarters: "",
        year_founded: 0,
        notes: [],
        open_source: false,
        self_signup: null,
        discontinued: false,
        supported_platforms: [],
        pricing: {
            free_trial: null,
            pricing_available: null,
            plans: []
        },
        stats: {
            screens: {
                total: null,
                source: "",
                date: ""
            }
        },
        has_logo: null
    };

    const directory = path.join(process.cwd(), 'data', 'products');
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    const fileName = path.join(directory, `${productId}.json`);
    fs.writeFileSync(fileName, JSON.stringify(template, null, 2));
    console.log(`Template created and saved as ${fileName}`);

    rl.close();
};

createTemplate();