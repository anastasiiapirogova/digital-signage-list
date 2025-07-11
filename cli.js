#!/usr/bin/env node
import { spawn } from 'child_process'

const commands = {
	'build': 'automation/run.js',
	'add': 'automation/newProduct.js',
}

function printHelp() {
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

const child = spawn('node', [commands[cmd], ...args], { stdio: 'inherit' })
child.on('exit', code => process.exit(code)) 