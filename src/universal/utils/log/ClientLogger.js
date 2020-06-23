export default class ClientLogger {
    log(message, logLevel, meta) {
        // tslint:disable-next-line
        console.log(message, meta);
    }
}