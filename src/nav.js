import fsPromises from "node:fs/promises";
import { resolve } from "path";
import * as node_os from "node:os";
import { state, checkArgvLength, found } from "./common.js";

const directoryFound = async (path) => {
	let ret = false;
	if (await found(path)) {
		try {
			const stat = await fsPromises.stat(path);
			if (stat.isDirectory()) {
				ret = true;
			}
		} catch (e) {}
	}
	return ret;
};

const cmdCd = async (arg1) => {
	const newPath = resolve(state.cwd, arg1);
	if (await directoryFound(newPath)) {
		state.setCWD(newPath);
	}
};

const run = async (args) => {
	switch (args[0]) {
		case "ls":
			checkArgvLength(args, 1);
			const files = await fsPromises.readdir(state.cwd, {
				withFileTypes: true,
			});
			const fileExt = files.map((file) => ({
				Name: file.name,
				Type: file.isDirectory() ? "directory" : "file",
			}));
			fileExt.sort((f1, f2) => {
				if (f1.Type === f2.Type) {
					return f1.Name > f2.Name ? 1 : -1;
				} else if (f1.Type === "directory") {
					return -1;
				} else {
					return 1;
				}
			});
			console.table(fileExt);
			break;

		case "up":
			checkArgvLength(args, 1);
			await cmdCd("..");
			break;

		case "cd":
			checkArgvLength(args, 2);
			await cmdCd(args[1]);
			break;

		default:
			throw Error("Invalid input");
			break;
	}
};

export default { run };
