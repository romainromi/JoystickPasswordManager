import fs from "fs";
import path from "path";
import moment from "moment";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function Logger(req, res, next) {
	let content = fs.readFileSync(path.join(__dirname, "../logger.txt"));
	content += `Date: ${moment().format("LLLL")}      ${req.method}      ${req.originalUrl}      ${req.ip}\n`;

	fs.writeFileSync(path.join(__dirname, "../logger.txt"), content);
	next();
}

export default Logger;
