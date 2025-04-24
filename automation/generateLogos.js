import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, parse, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputDir = join(__dirname, '..', 'data', 'logos', 'originals');
const outputDir = join(__dirname, '..', 'data', 'logos', 'generated');

const FOLDER_BG_COLORS = {
    light: '#000000',
    dark: '#ffffff'
};

const SUPPORTED_EXTENSIONS = ['.png', '.svg', '.webp'];

async function processImage(file, folder) {
    const inputPath = join(inputDir, folder, file);
    const outputFileName = parse(file).name + '.png';
    const outputPath = join(outputDir, outputFileName);

    if (existsSync(outputPath)) {
        console.log(`⚠️ Skipping (already converted): ${file}`);
        return;
    }

    try {
        const bgColor = FOLDER_BG_COLORS[folder.toLowerCase()] || '#ffffff';

        const original = sharp(inputPath);
        const metadata = await original.metadata();
        const size = 500;
        const fitSize = Math.floor(0.8 * size);

        const resizeOptions =
            metadata.width >= metadata.height
                ? { width: fitSize }
                : { height: fitSize };

        const logoBuffer = await original
            .resize(resizeOptions)
            .toBuffer();

        const resizedMeta = await sharp(logoBuffer).metadata();
        const left = Math.floor((size - resizedMeta.width) / 2);
        const top = Math.floor((size - resizedMeta.height) / 2);

        const tempOutputPath = join(outputDir, outputFileName);

        await sharp({
            create: {
                width: size,
                height: size,
                channels: 4,
                background: bgColor
            }
        })
            .composite([{ input: logoBuffer, left, top }])
            .png()
            .toFile(tempOutputPath);

        await imagemin([tempOutputPath], {
            destination: outputDir,
            plugins: [
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });

        console.log(`✅ Converted and optimized: ${folder}/${file}`);
    } catch (err) {
        console.error(`❌ Failed: ${folder}/${file}`, err.message);
    }
}

async function run() {
    const folders = readdirSync(inputDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    if (folders.length === 0) {
        console.log('No folders found in input directory. Expected "dark" and "light" folders.');
        return;
    }

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    for (const folder of folders) {
        const folderPath = join(inputDir, folder);
        const files = readdirSync(folderPath).filter(f =>
            SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase())
        );

        if (files.length === 0) {
            console.log(`No supported image files (${SUPPORTED_EXTENSIONS.join(', ')}) found in ${folder} folder.`);
            continue;
        }

        for (const file of files) {
            await processImage(file, folder);
        }
    }

    console.log('🎉 Done!');
}

run();