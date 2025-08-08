import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync } from 'fs'
import { products } from '../src/utils/products'
import type { Product } from '../src/utils/productsSchema'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getProductsFoundedByYear(products: Product[]): Record<number, number> {
	const counts = products.reduce((acc, product) => {
		const year = product.year_founded
		if (year) {
			acc[year] = (acc[year] || 0) + 1
		}
		return acc
	}, {} as Record<number, number>)

	const years = Object.keys(counts).map(Number)
	const minYear = Math.min(...years)
	const maxYear = new Date().getFullYear()

	const result: Record<number, number> = {}
	for (let year = minYear; year <= maxYear; year++) {
		result[year] = counts[year] || 0
	}

	return result
}

const productsFoundedByYear = getProductsFoundedByYear(products)

const productsFoundedByYearOutputFilePath = join(__dirname, '../data/charts/productsFoundedByYear.json')

writeFileSync(productsFoundedByYearOutputFilePath, JSON.stringify(productsFoundedByYear, null, 2), 'utf-8')

function getProductsByHeadquarters(products: Product[]): Record<string, number> {
	const counts = products.reduce((acc, product) => {
		const headquarters = product.headquarters
		if (headquarters) {
			if (Array.isArray(headquarters)) {
				headquarters.forEach(hq => {
					if (hq !== 'Unknown') {
						acc[hq] = (acc[hq] || 0) + 1
					}
				})
			} else if (headquarters !== 'Unknown') {
				acc[headquarters] = (acc[headquarters] || 0) + 1
			}
		}
		return acc
	}, {} as Record<string, number>)

	const sortedHeadquarters = Object.entries(counts)
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.reduce((acc, [headquarters, count]) => {
			acc[headquarters] = count
			return acc
		}, {} as Record<string, number>)

	return sortedHeadquarters
}

const productsByHeadquarters = getProductsByHeadquarters(products)

const productsByHeadquartersOutputFilePath = join(__dirname, '../data/charts/productsByHeadquarters.json')

writeFileSync(productsByHeadquartersOutputFilePath, JSON.stringify(productsByHeadquarters, null, 2), 'utf-8')

function getProductsBySupportedPlatforms(products: Product[]): Record<string, number> {
	const platformCounts = products.reduce((acc, product) => {
		const platforms = product.cms_properties?.supported_platforms || []
		platforms.forEach(platform => {
			acc[platform] = (acc[platform] || 0) + 1
		})
		return acc
	}, {} as Record<string, number>)

	const sortedPlatforms = Object.entries(platformCounts)
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.reduce((acc, [platform, count]) => {
			acc[platform] = count
			return acc
		}, {} as Record<string, number>)

	return sortedPlatforms
}

const productsBySupportedPlatforms = getProductsBySupportedPlatforms(products)

const productsBySupportedPlatformsOutputFilePath = join(__dirname, '../data/charts/productsBySupportedPlatforms.json')

writeFileSync(productsBySupportedPlatformsOutputFilePath, JSON.stringify(productsBySupportedPlatforms, null, 2), 'utf-8')