import ClientLogger from "./ClientLogger";
import ServerLogger from "./ServerLogger";

// log level definitions
const LOG_LEVEL = {
    DEBUG: { level: 1, levelValue: "debug" },
    INFO: { level: 2, levelValue: "info" },
    WARN: { level: 3, levelValue: "warn" },
    ERROR: { level: 4, levelValue: "error" },
};
// set default logging level to error, if nothing specified
const APP_LOG_LEVEL = LOG_LEVEL[process.env.LOG_LEVEL] || LOG_LEVEL.ERROR;

class Logger {
    logger;
    constructor() {
        this.logger = null;
        if (true) {
            this.logger = new ClientLogger();
        } else {
            this.logger = new ServerLogger(APP_LOG_LEVEL.level === LOG_LEVEL.DEBUG.level);
        }
    }
    info(message, meta) {
        this.logger.log(message, LOG_LEVEL.INFO, meta);
    }
    error(message, meta) {
        this.logger.log(message, LOG_LEVEL.ERROR, meta);
    }
    debug(message, meta) {
        this.logger.log(message, LOG_LEVEL.DEBUG, meta);
    }
    warn(message, meta) {
        this.logger.log(message, LOG_LEVEL.WARN, meta);
    }
}
const logger = new Logger();

export default logger;