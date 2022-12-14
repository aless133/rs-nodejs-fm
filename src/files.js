import fsPromises from "node:fs/promises";
import { checkArgvLength, throwInvalid, throwFailed, dl, isBasename, isFilename } from "./common.js";
import { createReadStream, createWriteStream } from "fs";
import { join, dirname, basename } from "path";
import { pipeline } from "node:stream/promises";

const run = async (args) => {
	switch (args[0]) {
		case "cat":
			checkArgvLength(args, 2);
			if (!isFilename(args[1])) throwInvalid("Not a filename");
			try {
				await Promise((resolve, reject) => {
					createReadStream(args[1])
						.on("data", (data) => {
							process.stdout.write(data);
						})
						.on("end", () => {
							resolve();
						})
						.on("error", (err) => {
							reject(err);
						});
				});
			} catch (err) {
				throwFailed(err);
			}
			dl("finish");
			break;

		case "add":
			checkArgvLength(args, 2);
			if (!isBasename(args[1])) throwInvalid("Not a basename");
			try {
				await fsPromises.writeFile(args[1], "", { flag: "wx" });
			} catch (err) {
				throwFailed(err);
			}
			break;

		case "rn":
			checkArgvLength(args, 3);
			if (!isFilename(args[1]) || !isBasename(args[2])) throwInvalid("Not a filename + basename");
			try {
				await fsPromises.rename(args[1], join(dirname(args[1]), args[2]));
			} catch (err) {
				throwFailed(err);
			}
			break;

		case "cp":
		case "mv":
			checkArgvLength(args, 3);
			if (!isFilename(args[1])) throwInvalid("Not a filename");
			try {
				const s1 = createReadStream(args[1]);
				const s2 = createWriteStream(join(args[2], basename(args[1])));
				await pipeline(s1, s2);
				if (args[0] === "mv") {
					await fsPromises.unlink(args[1]);
				}
			} catch (err) {
				throwFailed(err);
			}
			break;

		case "rm":
			checkArgvLength(args, 2);
			if (!isFilename(args[1])) throwInvalid("Not a filename");
			try {
				await fsPromises.unlink(args[1]);
			} catch (err) {
				throwFailed(err);
			}
			break;

		default:
			dl("files default", args);
			throwInvalid();
			break;
	}
};

export default { run };
