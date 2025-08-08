import { exec } from 'child_process'

interface CommandStage {
	command: string
	description: string
}

const commands: CommandStage[] = [
	{
		command: 'npx tsx automation/updatePlatforms.ts',
		description: 'Updating platform information'
	},
	{
		command: 'npx tsx automation/generateLogos.ts',
		description: 'Generating WebP logos'
	},
	{
		command: 'npx tsx automation/mergeProducts.ts',
		description: 'Merging product data'
	},
	{
		command: 'npx tsx automation/generateReadmeProductList.ts',
		description: 'Generating README product list'
	},
	{
		command: 'npx tsx automation/generateChartsData.ts',
		description: 'Generating charts data'
	}
]

function formatTime(ms: number): string {
	const seconds = Math.floor(ms / 1000)
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	
	if (minutes > 0) {
		return `${minutes}m ${remainingSeconds}s`
	}
	return `${seconds}s`
}

function runCommands(commands: CommandStage[], currentStage: number = 1, startTime: number = Date.now()): void {
	if (currentStage > commands.length) {
		const totalTime = Date.now() - startTime
		console.log('\nAll automation stages completed successfully!')
		console.log(`Total execution time: ${formatTime(totalTime)}`)
		return
	}

	const stage: CommandStage = commands[currentStage - 1]
	const totalStages = commands.length

	console.log(`\n[${currentStage}/${totalStages}] ${stage.description}...`)
	console.log(`Executing: ${stage.command}`)
	console.log('─'.repeat(50))

	exec(stage.command, (error, stdout, stderr) => {
		if (error) {
			const totalTime = Date.now() - startTime
			console.error(`Error executing ${stage.command}:`, error.message)
			console.log(`\nAutomation failed at stage: ${stage.description}`)
			console.log(`Total execution time: ${formatTime(totalTime)}`)
			return
		}
		if (stderr) {
			console.error(`Stderr from ${stage.command}:`, stderr)
		}
		console.log(`${stdout}`)
		console.log(`[${currentStage}/${totalStages}] ${stage.description} completed`)
		console.log('─'.repeat(50))
		runCommands(commands, currentStage + 1, startTime)
	})
}

const startTime = Date.now()
console.log('Starting automation pipeline...')
console.log(`Total stages: ${commands.length}`)
console.log('─'.repeat(50))

runCommands(commands.slice(), 1, startTime)