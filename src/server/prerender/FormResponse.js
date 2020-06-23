/**
 * Form the document response from the mark up created by rendering
 * components
 */
import * as React from "react";
import { StaticRouter } from "react-router-dom";
import * as fs from "fs";
import path from "path";
import { Helmet } from "react-helmet";
import { renderToString } from "react-dom/server";
import * as httpStatus from "http-status-codes";
import to from "await-to-js";
import { ChunkExtractor } from "@loadable/server";
import PageContainer from "../../universal/components/PageContainer";
import logger from "../../universal/utils/log/Logger";


// extract seo tags from react helmet and attach it to the server response
const injectHelmetAttributes = (document, helmet) => {
    let replaceHtml;
    // add html attributes
    if (helmet.htmlAttributes) {
        replaceHtml = `<html ${helmet.htmlAttributes.toString()}>`;
        document = document.replace(/<html>/, replaceHtml);
    }
    // add helmet meta tags in head
    replaceHtml =
        (helmet.title) ? helmet.title.toString() + `\n` : "" +
            (helmet.meta) ? helmet.meta.toString() + `\n` : "" +
                (helmet.link) ? helmet.link.toString() + `\n` : "";

    if (replaceHtml) {
        replaceHtml += `</head>`;
        document = document.replace(/<\/head>/, replaceHtml);
    }

    // add helmet meta tags in body
    if (helmet.bodyAttributes) {
        replaceHtml = `<body> ${helmet.bodyAttributes.toString()}`;
        document = document.replace(/<body>/, replaceHtml);
    }
    // add no script in body
    if (helmet.noscript) {
        replaceHtml = `<body> ${helmet.noscript.toString()}`;
        document = document.replace(/<body>/, replaceHtml);
    }
    // add script in head
    if (helmet.script) {
        replaceHtml = `${helmet.script.toString()}</head>`;
        document = document.replace(/<\/head>/, replaceHtml);
    }
    // add style in head
    if (helmet.style) {
        replaceHtml = `${helmet.style.toString()}</head>`;
        document = document.replace(/<\/head>/, replaceHtml);
    }
    return document;
};

export const formResponse = async (request) => {
    const statsFile = path.resolve("./dist/loadable-stats.json");
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ["bundle"] });
    const serverContext = {
        error: null,
        statusCode: httpStatus.OK,
    };

    const renderError = (serverError) => {
        console.log("serverError", serverError)
        serverError.status = serverError.status || httpStatus.INTERNAL_SERVER_ERROR;
        serverContext.error = serverError;
        serverContext.statusCode = serverError.status;
        const errorRoute = (
            <StaticRouter location={request.url === "/index.html" ? "/" : request.url} context={serverContext}>
                <PageContainer />
            </StaticRouter>
        );
        return {
            document: formHtml(renderToString(errorRoute)),
            statusCode: serverError ? httpStatus.INTERNAL_SERVER_ERROR : serverError.status,
        };
    };

    const serverApp = (
        <StaticRouter location={request.url === "/index.html" ? "/" : request.url} context={serverContext}>
            <PageContainer />
        </StaticRouter>
    );
    /* For server side we are using a different template file which is generated based on the
         webpack configuration - Refer webpack.config.js*/
    const template = fs.readFileSync("./dist/template.html", "utf8");
    const formHtml = (markup) => {
        // extract the data from client cache so that it can be included in the server response
        let document = "";
        // insert the rendered React HTML into our main div
        const replaceHtml =
            `<div id="app">${markup}</div>`;

        const styles = '<style type="text/css">' + "</style>";
        const cssBundle = template.replace('<link rel="stylesheet" href="/server.css"/>', styles);
        document = cssBundle.replace("</body>", `${extractor.getScriptTags()}</body>`);
        document = document.replace(/<div id="app"><\/div>/, replaceHtml);
        const helmet = Helmet.renderStatic();
        document = injectHelmetAttributes(document, helmet);
        return document;
    };
    let error;
    // wait for api calls to resolve
    let renderedData;
    [error, renderedData] = await to(Promise.resolve(extractor.collectChunks(serverApp)));
    if (error) {
        // report the unhandled error as is
        logger.error(error, {
            type: "SYSTEM ERROR",
            module: "FormResponse",
            method: "formHtml",
            url: request.url,
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });

        return renderError(error);
    }
    return {
        document: formHtml(renderedData),
        statusCode: serverContext.statusCode,
    };
};