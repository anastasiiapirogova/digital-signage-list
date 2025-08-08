import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const productsDir = join(__dirname, '..', 'data', 'products')

interface CmsProperties {
	supported_platforms: string[]
}

interface Product {
	cms_properties?: CmsProperties
}

const updatePlatforms = (product: Product): void => {
	if (
		product.cms_properties &&
		product.cms_properties.supported_platforms &&
		Array.isArray(product.cms_properties.supported_platforms)
	) {
		if (
			product.cms_properties.supported_platforms.includes('Android') &&
			!product.cms_properties.supported_platforms.includes('Fire OS')
		) {
			product.cms_properties.supported_platforms.push('Fire OS')
		}
		product.cms_properties.supported_platforms.sort()
	}
}

fs.readdir(productsDir, (err: NodeJS.ErrnoException | null, files: string[]) => {
	if (err) {
		console.error('Error reading directory:', err)
		return
	}

	const jsonFiles = files.filter((file: string) => file.endsWith('.json'))

	jsonFiles.forEach((file: string) => {
		const filePath = join(productsDir, file)
		try {
			const data = fs.readFileSync(filePath, 'utf-8')
			const json: Product = JSON.parse(data)

			updatePlatforms(json)

			fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
		} catch (parseError) {
			console.error(`Error parsing ${file}:`, parseError instanceof Error ? parseError.message : String(parseError))
		}
	})
}) 