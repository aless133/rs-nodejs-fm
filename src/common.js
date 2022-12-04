import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'node:fs/promises';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const found = async (path) => {
    let ret;
    try {
        await fsPromises.access(path);
        ret = true;
    } catch (e) {
        ret = false;
    }
    return ret;
}