import fs from 'fs'
import readline from 'readline'
import path from 'path'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const askQuestion = (query) => {
	return new Promise((resolve) => rl.question(query, resolve))
}

const createTemplate = async () => {
	const productId = await askQuestion('Enter Product ID: ')

	const template = {
		id: productId,
		name: '',
		description: '',
		website: '',
		categories: [],
		headquarters: '',
		year_founded: 0,
		notes: [],
		open_source: false,
		self_signup: null,
		discontinued: false,
		cms_properties: {
			// supported_platforms will go here if category CMS is added later
			supported_platforms: []
		},
		models: [
			{
				delivery: 'cloud',   // default value
				free_trial: null,
				pricing_available: null,
				has_freemium: null,
				pricing: [
					{
						name: '',
						payment_model: 'subscription',
						billing_basis: 'per_screen',
						monthly: null,
						yearly: null
					}
				]
			}
		],
		stats: {
			screens: {
				total: null,
				source: '',
				date: ''
			}
		},
		has_logo: null,
		analytics_features: null,
		content_provider_details: null
	}

	const directory = path.join(process.cwd(), 'data', 'products')
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true })
	}

	const fileName = path.join(directory, `${productId}.json`)
	fs.writeFileSync(fileName, JSON.stringify(template, null, 2))
	console.log(`Template created and saved as ${fileName}`)

	rl.close()
}

createTemplate()
