require("source-map-support").install();

import { PORT } from "./config";
import { createLogger } from "./logger";
import { app } from "./server";

const logger = createLogger("APP");

function main() {
    app.listen(PORT, () => logger.info(`[${new Date().toLocaleString()}] server started on ${PORT}`));
}

main();
