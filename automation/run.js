import { exec } from 'child_process'

const commands = [
	'node automation/updatePlatforms.js',
	'node automation/generateLogos.js',
	'node automation/updateLogoInformation.js',
	'npx tsx automation/mergeProducts.ts',
	'npx tsx automation/generateReadmeProductList.ts',
	'npx tsx automation/generateChartsData.ts',
]

function runCommands(commands) {
	if (commands.length === 0) return

	const command = commands.shift()
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing ${command}:`, error.message)
			return
		}
		if (stderr) {
			console.error(`Stderr from ${command}:`, stderr)
		}
		console.log(`${stdout}`)
		runCommands(commands)
	})
}

runCommands(commands.slice())