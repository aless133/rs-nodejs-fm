import { debuglog } from "util";
export const dl = debuglog("dev");

import { dirname, basename } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const state = {
    username: "Unknown",
    setUsername(username) {
        state.username = username;
    },
};

export const throwInvalid = (err) => {
    if (err) dl(err);
    throw Error("Invalid input");
};
export const throwFailed = (err) => {
    if (err) dl(err);
    throw Error("Operation failed");
};

export const checkArgvLength = (args, len) => {
    if (args.length !== len) throwInvalid('Wrong arguments count');
};

export const isBasename = (filename) => (filename===basename(filename));
export const isFilename = (filename) => (!!basename(filename));