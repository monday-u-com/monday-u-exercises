import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const DB_PATH_DIRECTORY = path.resolve(__dirname, "..", "data" );
export const DB_PATH_FILENAME = DB_PATH_DIRECTORY + "\\tasks.json";
