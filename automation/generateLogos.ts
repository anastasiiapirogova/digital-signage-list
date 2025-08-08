import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, parse, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputDir = join(__dirname, '..', 'data', 'logos', 'originals')
const outputDir = join(__dirname, '..', 'data', 'logos', 'generated')
const productsDir = join(__dirname, '..', 'data', 'products')

interface FolderBgColors {
	[key: string]: string
}

interface Product {
	has_logo?: boolean
	[key: string]: unknown
}

const FOLDER_BG_COLORS: FolderBgColors = {
	light: '#000000',
	dark: '#ffffff'
}

const SUPPORTED_EXTENSIONS = ['.png', '.svg', '.avif', '.webp', '.jpg', '.jpeg']

async function processImage(file: string, folder: string): Promise<void> {
	const inputPath = join(inputDir, folder, file)
	const baseName = parse(file).name
	const webpOutputPath = join(outputDir, baseName + '.webp')

	try {
		if (!existsSync(inputPath)) {
			console.error(`Input file not found: ${inputPath}`)
			return
		}

		const bgColor = FOLDER_BG_COLORS[folder.toLowerCase()] || '#ffffff'

		let original: sharp.Sharp
		try {
			original = sharp(inputPath)
		} catch (sharpError) {
			console.error(`Failed to initialize sharp for ${folder}/${file}:`, sharpError instanceof Error ? sharpError.message : String(sharpError))
			return
		}

		let metadata: sharp.Metadata
		try {
			metadata = await original.metadata()
		} catch (metadataError) {
			console.error(`Failed to get metadata for ${folder}/${file}:`, metadataError instanceof Error ? metadataError.message : String(metadataError))
			return
		}

		const size = 500
		const fitSize = Math.floor(0.8 * size)

		const resizeOptions =
			metadata.width && metadata.height && metadata.width >= metadata.height
				? { width: fitSize }
				: { height: fitSize }

		let logoBuffer: Buffer
		try {
			logoBuffer = await original.resize(resizeOptions).toBuffer()
		} catch (resizeError) {
			console.error(`Failed to resize ${folder}/${file}:`, resizeError instanceof Error ? resizeError.message : String(resizeError))
			return
		}

		let resizedMeta: sharp.Metadata
		try {
			resizedMeta = await sharp(logoBuffer).metadata()
		} catch (resizedMetaError) {
			console.error(`Failed to get resized metadata for ${folder}/${file}:`, resizedMetaError instanceof Error ? resizedMetaError.message : String(resizedMetaError))
			return
		}

		const left = Math.floor((size - (resizedMeta.width || 0)) / 2)
		const top = Math.floor((size - (resizedMeta.height || 0)) / 2)

		try {
			await sharp({
				create: {
					width: size,
					height: size,
					channels: 4,
					background: bgColor
				}
			})
				.composite([{ input: logoBuffer, left, top }])
				.webp({ quality: 80 })
				.toFile(webpOutputPath)
		} catch (compositeError) {
			console.error(`Failed to create composite for ${folder}/${file}:`, compositeError instanceof Error ? compositeError.message : String(compositeError))
			return
		}
	} catch (err) {
		console.error(`Unexpected error processing ${folder}/${file}:`, err instanceof Error ? err.message : String(err))
	}
}

function updateLogoInformation(): void {
	try {
		const files = readdirSync(productsDir)
		const jsonFiles = files.filter(file => file.endsWith('.json'))

		jsonFiles.forEach(file => {
			const filePath = join(productsDir, file)
			try {
				const data = readFileSync(filePath, 'utf-8')
				const json: Product = JSON.parse(data)

				const checkAndSetHasLogo = (product: Product): void => {
					const logoFilePath = join(outputDir, `${file.replace('.json', '.webp')}`)
					product.has_logo = existsSync(logoFilePath)
				}

				checkAndSetHasLogo(json)

				writeFileSync(filePath, JSON.stringify(json, null, 2))
			} catch (parseError) {
				console.error(`Error parsing ${file}:`, parseError instanceof Error ? parseError.message : String(parseError))
			}
		})
	} catch (err) {
		console.error('Error reading products directory:', err instanceof Error ? err.message : String(err))
	}
}

async function run(): Promise<void> {
	try {
		if (!existsSync(inputDir)) {
			console.error(`Input directory not found: ${inputDir}`)
			console.log('Please ensure the logos/originals directory exists with dark and light subfolders.')
			return
		}

		const folders = readdirSync(inputDir, { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name)

		if (folders.length === 0) {
			console.log('No folders found in input directory. Expected "dark" and "light" folders.')
			return
		}

		try {
			if (!existsSync(outputDir)) {
				mkdirSync(outputDir, { recursive: true })
			}
		} catch (mkdirError) {
			console.error('Failed to create output directory:', mkdirError instanceof Error ? mkdirError.message : String(mkdirError))
			return
		}

		let processedCount = 0
		let errorCount = 0

		for (const folder of folders) {
			const folderPath = join(inputDir, folder)
			
			try {
				const files = readdirSync(folderPath).filter(f =>
					SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase())
				)

				if (files.length === 0) {
					console.log(`No supported image files (${SUPPORTED_EXTENSIONS.join(', ')}) found in ${folder} folder.`)
					continue
				}

				for (const file of files) {
					try {
						await processImage(file, folder)
						processedCount++
					} catch (processError) {
						console.error(`Error processing ${folder}/${file}:`, processError instanceof Error ? processError.message : String(processError))
						errorCount++
					}
				}
			} catch (folderError) {
				console.error(`Error reading folder ${folder}:`, folderError instanceof Error ? folderError.message : String(folderError))
				errorCount++
			}
		}

		console.log(`Logo generation completed. Processed: ${processedCount}, Errors: ${errorCount}`)

		if (processedCount > 0) {
			console.log('Updating logo information in product files...')
			updateLogoInformation()
			console.log('Logo information updated successfully!')
		}
	} catch (err) {
		console.error('Unexpected error in run function:', err instanceof Error ? err.message : String(err))
		throw err
	}
}

run().catch(err => {
	console.error('Error running logo generation:', err instanceof Error ? err.message : String(err))
	process.exit(1)
})