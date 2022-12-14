import { readdir }  from "node:fs/promises";
import { resolve } from "path";
import { checkArgvLength, throwInvalid, throwFailed } from "./common.js";

const changeDirectory = async (arg1) => {
	const newPath = resolve(process.cwd(), arg1);
	try {
		process.chdir(newPath);
	} catch(err) {
		throwFailed(err);
	}
};

const run = async (args) => {
	switch (args[0]) {
		case "ls":
			checkArgvLength(args, 1);
			try {
				const files = await readdir(process.cwd(), {
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
			} catch(err) {
				throwFailed(err);				
			}
			break;

		case "up":
			checkArgvLength(args, 1);
			await changeDirectory("..");
			break;

		case "cd":
			checkArgvLength(args, 2);
			await changeDirectory(args[1]);
			break;

		default:
			throwInvalid();
			break;
	}
};

export default { run };
