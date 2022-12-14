import fsPromises from "node:fs/promises";
import { checkArgvLength, throwInvalid, throwFailed, dl } from "./common.js";
import { createReadStream } from "fs";
import { pipeline } from "node:stream/promises";

const run = async (args) => {
	switch (args[0]) {
		case "cat":
			checkArgvLength(args, 2);
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
			try {
				await fsPromises.writeFile(args[1], "", { flag: "wx" });
			} catch (err) {
				throwFailed(err);
			}
			break;

		case "rn":
			checkArgvLength(args, 3);
			try {
				await fsPromises.rename(args[1], args[2]);
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
