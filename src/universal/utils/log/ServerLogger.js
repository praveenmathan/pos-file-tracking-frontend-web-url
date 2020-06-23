export default class ServerLogger {
    lambdaLog;
    constructor(debugEnabled) {
        this.lambdaLog =
            (import(/* webpackChunkName: "bundle.logger" */"lambda-log").then((ssrLogger) => {
                const log = ssrLogger.default;
                log.options.dynamicMeta = (message) => {
                    return {
                        timestamp: new Date().toISOString(),
                    };
                };
                if (debugEnabled) {
                    log.options.debug = true;
                } else {
                    log.options.debug = false;
                }
                return log;
            }));

    }
    log(message, logLevel, meta) {
        this.lambdaLog.then((ssrLogger) => {
            ssrLogger.log(logLevel.levelValue, message, meta);
        });
    }
}