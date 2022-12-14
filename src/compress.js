import fsPromises from "node:fs/promises";
import { checkArgvLength, throwInvalid, throwFailed, dl, isFilename } from "./common.js";
import { createReadStream, createWriteStream } from "fs";
import { join, dirname, basename } from "path";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

const run = async (args) => {
	switch (args[0]) {
		case "compress":
		case "decompress":
			checkArgvLength(args, 3);
			if (!isFilename(args[1]) || !isFilename(args[2])) throwInvalid("Not a filename");
			try {
				let transform;
				if (args[0] == "compress") {
					transform = zlib.createBrotliCompress();
				} else {
					transform = zlib.createBrotliDecompress();
				}
				const s1 = createReadStream(args[1], { flags: "r+" });
				const s2 = createWriteStream(args[2], { flags: "wx" });
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
