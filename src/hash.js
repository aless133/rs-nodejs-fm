import crypto from "crypto";
import fs from "fs/promises";
import { resolve } from "path";
import { state, checkArgvLength } from "./common.js";

const run = async (args) => {
	checkArgvLength(args, 2);
	try {
		const data = await fs.readFile(resolve(state.cwd, args[1]));
		const hex = crypto.createHash("sha256").update(data).digest("hex");
		console.log(hex);
	} catch (e) {
		throw Error("Operation failed");
	}
};

export default { run };
