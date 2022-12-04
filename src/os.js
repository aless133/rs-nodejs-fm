import * as node_os from "node:os";
import { checkArgvLength } from "./common.js";

const run = (args) => {
	switch (args[1]) {
		case "--EOL":
			checkArgvLength(args, 2);
			console.log(Buffer.from(node_os.EOL).toString("hex"));
			break;
		default:
			throw Error("Invalid input");
			break;
	}
};

export default { run };
