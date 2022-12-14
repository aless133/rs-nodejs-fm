import { debuglog } from "util";
export const dl = debuglog("dev");

import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

// import fsPromises from "node:fs/promises";
// export const found = async (path) => {
//     let ret;
//     try {
//         await fsPromises.access(path);
//         ret = true;
//     } catch (e) {
//         ret = false;
//     }
//     return ret;
// };

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
