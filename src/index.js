import readline from "node:readline/promises";
import { homedir } from "node:os";
import { state, throwInvalid, dl } from "./common.js";
import { normalize } from "path";

import os from "./os.js";
import nav from "./nav.js";
import hash from "./hash.js";
import files from "./files.js";

for (let i = 0; i < process.argv.length; i++) {
	if (process.argv[i].startsWith("--username")) {
		const argvUser = process.argv[i].split("=");
		state.setUsername(argvUser[1]);
		break;
	}
}

process.chdir(homedir());

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const prompt = () => {
	rl.setPrompt(`You are currently in ${process.cwd()}> `);
	rl.prompt();
};

console.log(`Welcome to the File Manager, ${state.username}!`);
prompt();

rl.on("line", async (line) => {
	//process.stdout.write(line);
	try {
		const args = lineParse(line.trim());
		// console.log(args);
		switch (args[0]) {
			case ".exit":
				rl.close();
				break;

			case "ls":
			case "up":
			case "cd":
				await nav.run(args);
				break;

			case "cat":
			case "add":
			case "rn":
			case "cp":
			case "mv":
			case "rm":
				dl("files run", args);
				await files.run(args);
				break;

			case "os":
				await os.run(args);
				break;

			case "hash":
				await hash.run(args);
				break;

			default:
				throwInvalid();
				break;
		}
	} catch (err) {
		dl(err);
		console.error(err.message);
	}
	prompt();
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
	const argv0 = str.split(" ");
	const argv = [];
	for (let i = 0; i < argv0.length; i++) {
		let arg = "";
		if (argv0[i].substring(0, 1) === '"') {
			arg = argv0[i].substring(1);
			while (i < argv0.length && argv0[i].slice(-1) !== '"') {
				i++;
				arg += " " + argv0[i];
			}
			if (arg.slice(-1) === '"') arg = arg.slice(0, -1);
			else throwInvalid();
		} else {
			arg = argv0[i];
		}
		argv.push(arg);
	}
	return argv;
}
