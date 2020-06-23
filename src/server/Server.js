import * as express from "express";
import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import * as compression from "compression";
import * as httpStatus from "http-status-codes";
import logger from "../universal/utils/log/Logger";
import { formResponse } from "./prerender/FormResponse";
const app = express();
app.use(compression({ threshold: 1 }));
app.use(express.static("dist", { maxAge: "1d" }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.get("*", (req, res, next) => {
    logger.info("New page request for", { url: req.url });
    // Initialize store at server side.
    // Send response back to the browser once the components are pre-rendered.
    Promise.resolve(formResponse(req))
        .then(({ document, statusCode }) => {
            res.set("Cache-Control", "public, max-age=86400");
            res.status(statusCode).send(document);
        })
        .catch((pageRenderException) => {
            logger.error(pageRenderException,
                {
                    type: "SYSTEM ERROR",
                    module: "Server",
                    method: "app.get",
                    url: req.url,
                    stackTrace: pageRenderException,
                });
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            res.send("Error while rendering");
        });
});
app.listen(3100, () => {
    /* tslint:disable */
    console.log(`Server is listening on port: ` + 3100);
});
export default app;

