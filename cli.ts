#!/usr/bin/env node
import { spawn } from 'child_process'

const commands: Record<string, string> = {
	'build': 'scripts/build.ts',
	'add': 'scripts/newProduct.ts',
	'check': 'scripts/check.ts',
}

function printHelp(): void {
	console.log('Usage: npx signagelist <command>\n\nAvailable commands:')
	for (const cmd of Object.keys(commands)) {
		console.log(`  ${cmd}`)
	}
}

const [,, cmd, ...args] = process.argv

if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
	printHelp()
	process.exit(0)
}

if (!commands[cmd]) {
	console.error(`Unknown command: ${cmd}\n`)
	printHelp()
	process.exit(1)
}

const child = spawn('npx', ['tsx', commands[cmd], ...args], { stdio: 'inherit' })
child.on('exit', (code: number | null) => process.exit(code ?? 0)) 