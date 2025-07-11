import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdir, readFileSync, writeFileSync } from 'fs'
import { ProductSchema, type Product } from '../src/utils/productsSchema'

const __dirname = dirname(fileURLToPath(import.meta.url))

const productsDir = join(__dirname, '..', 'data', 'products')
const outputFile = join(__dirname, '..', 'data', 'products.json')

const allProducts: Product[] = []

readdir(productsDir, (err, files) => {
	if (err) {
		console.error('Error reading directory:', err)
		process.exit(1)
	}

	const jsonFiles = files.filter(file => file.endsWith('.json'))

	jsonFiles.forEach(file => {
		const filePath = join(productsDir, file)
		try {
			const data = readFileSync(filePath, 'utf-8')
			const json = JSON.parse(data)

			const result = ProductSchema.safeParse(json)
			if (!result.success) {
				console.error(`Validation error in file ${file}:`, result.error.errors)
				process.exit(1)
			}
			allProducts.push(result.data)
		} catch (parseError) {
			console.error(`Error parsing ${file}:`, parseError)
			process.exit(1)
		}
	})

	writeFileSync(outputFile, JSON.stringify(allProducts, null, 2))
	console.log(`Merged ${allProducts.length} valid product(s) from ${jsonFiles.length} file(s) into products.json`)
})
