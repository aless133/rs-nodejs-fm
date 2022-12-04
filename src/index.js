import * as readline from "node:readline/promises";
// import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
  	case '.exit':
  		rl.close();
  		break;
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Thank you for using File Manager, Username, goodbye!');
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
