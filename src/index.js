import readline from "node:readline/promises";
import * as node_os from "node:os";
import { state } from "./common.js";
// import { stdin as input, stdout as output } from 'node:process';

import os from "./os.js";

state.setCWD(node_os.homedir());

for (let i = 0; i <= process.argv.length; i++) {
	if (process.argv[i] == "--username") {
		state.setUsername(process.argv[i + 1]);
		break;
	}
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: state.cwd + "> ",
});

console.log(`Welcome to the File Manager, ${state.username}!`);

rl.prompt();

rl.on("line", (line) => {
	const args = lineParse(line.trim());
	try {
		switch (args[0]) {
			case ".exit":
				rl.close();
				break;
			case "os":
				os.run(args);
				break;
			default:
				throw Error("Invalid input");
				break;
		}
	} catch (err) {
		console.error(err.message);
	}
	rl.setPrompt(state.cwd + "> ");
	rl.prompt();
}).on("close", () => {
	console.log(`Thank you for using File Manager, ${state.username}, goodbye!`);
	process.exit(0);
});

// rl.on("close", () => {
// 	console.log("\nThank you for using File Manager, Username, goodbye!");
// });

// console.log("I'm nodejs FM");
// while (1) {
// 	const answer = await rl.question("What do you think of Node.js? ");
// 	if (answer === ".exit") rl.close();
// 	else console.log(`Thank you for your valuable feedback: ${answer}`);
// }

// rl.close();
// const cmdRE=new RegExp('(\S+)','g');
function lineParse(str) {
	return str.split(" ");
}
