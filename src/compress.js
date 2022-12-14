import fsPromises from "node:fs/promises";
import { checkArgvLength, throwInvalid, throwFailed, dl, isBasename, isFilename } from "./common.js";
import { createReadStream, createWriteStream } from "fs";
import { join, dirname, basename } from "path";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

const run = async (args) => {
	switch (args[0]) {
		case "compress":
		case "decompress":
			checkArgvLength(args, 3);
			if (!isFilename(args[1])) throwInvalid("Not a filename");
			try {
				let transform, newName;
				if (args[0] == "compress") {
					transform = zlib.createBrotliCompress();
					newName = basename(args[1]) + ".br";
				} else {
					transform = zlib.createBrotliDecompress();
					newName = basename(args[1], ".br");
				}
				dl(newName);
				const s1 = createReadStream(args[1]);
				const s2 = createWriteStream(join(args[2], newName));
				await pipeline(s1, transform, s2);
			} catch (err) {
				throwFailed(err);
			}
			break;

		default:
			throwInvalid();
			break;
	}
};

export default { run };
