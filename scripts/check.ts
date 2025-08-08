import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { ProductSchema } from '../src/utils/productsSchema'

async function validateProducts() {
	const productsDir = join(process.cwd(), 'data', 'products')
	
	try {
		const files = await readdir(productsDir)
		const jsonFiles = files.filter(file => file.endsWith('.json'))
		
		console.log(`Found ${jsonFiles.length} product files to validate...`)
		
		let validCount = 0
		let invalidCount = 0
		const errors: Array<{ file: string; error: string }> = []
		
		for (const file of jsonFiles) {
			try {
				const filePath = join(productsDir, file)
				const content = await readFile(filePath, 'utf-8')
				const productData = JSON.parse(content)
				
				ProductSchema.parse(productData)
				validCount++
			} catch (error) {
				invalidCount++
				const errorMessage = error instanceof Error ? error.message : 'Unknown error'
				errors.push({ file, error: errorMessage })
				console.log(`${file}`)
			}
		}
		
		console.log(`Total files: ${jsonFiles.length}`)
		console.log(`Valid: ${validCount}`)
		console.log(`Invalid: ${invalidCount}`)

		if (invalidCount > 0) {
			process.exit(1)
		} else {
			console.log('\nAll products are valid!')
		}
		
	} catch (error) {
		console.error('Error reading products directory:', error)
		process.exit(1)
	}
}

validateProducts().catch(error => {
	console.error('Validation failed:', error)
	process.exit(1)
})
