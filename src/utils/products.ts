import productsData from '../../data/products.json'
import { ProductsSchema } from './productsSchema'

export const products = ProductsSchema.parse(productsData).sort((a, b) => a.name.localeCompare(b.name))