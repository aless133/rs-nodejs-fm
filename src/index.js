import readline from "node:readline/promises";
import os from "node:os";
import { state } from "./common.js";
// import { stdin as input, stdout as output } from 'node:process';

state.setCWD(os.homedir());
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: state.cwd + "> ",
});

rl.prompt();

rl.on("line", (line) => {
	const args = lineParse(line.trim());
	switch (args[0]) {
		case ".exit":
			rl.close();
			break;
		case "os":
			console.log("os");
			break;
		default:
			console.error("Invalid input");
			break;
	}
	rl.setPrompt(state.cwd + "> ");
	rl.prompt();
}).on("close", () => {
	console.log("Thank you for using File Manager, Username, goodbye!");
	process.exit(0);
});

rl.prompt();

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
