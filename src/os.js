import * as node_os from "node:os";
import { checkArgvLength } from "./common.js";

const run = async (args) => {
	switch (args[1]) {
		case "--EOL":
			checkArgvLength(args, 2);
			console.log(Buffer.from(node_os.EOL).toString("hex"));
			break;

		case "--cpus":
			checkArgvLength(args, 2);
			console.table(
				node_os.cpus().map((cpu) => ({
					Cpu: cpu.model,
					"Clock Rate": (cpu.speed / 1000).toFixed(1) + " GHz",
				}))
			);
			break;

		case "--homedir":
			checkArgvLength(args, 2);
			console.log(node_os.homedir());
			break;

		case "--username":
			checkArgvLength(args, 2);
			console.log(node_os.userInfo().username);
			break;

		case "--architecture":
			checkArgvLength(args, 2);
			console.log(process.platform, process.arch); //,node_os.machine(),node_os.arch()
			break;

		default:
			throw Error("Invalid input");
			break;
	}
};

export default { run };
