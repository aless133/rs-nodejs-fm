import fsPromises from "node:fs/promises";
import { checkArgvLength, throwInvalid, throwFailed, dl } from "./common.js";
import { createReadStream } from "fs";
import { pipeline } from "node:stream/promises";

const run = async (args) => {
	switch (args[0]) {
		case "cat":
			dl("files cat", args);
			checkArgvLength(args, 2);
			try {
				await (() => {
					return new Promise((resolve, reject) => {
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
				})();
			} catch (err) {
				throwFailed(err);
			}
			dl("finish");
			break;

		default:
			dl("files default", args);
			throwInvalid();
			break;
	}
};

export default { run };
