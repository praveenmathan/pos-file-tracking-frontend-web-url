/**
 * ======================================
 * Client Side Rendering
 * ======================================
 */
import * as React from "react";
import { hydrate } from "react-dom";
import registerServiceWorker from "./RegisterServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import PageContainer from "../universal/components/PageContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

(() => {
    loadableReady(() => {
        hydrate(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <PageContainer />
            </BrowserRouter>,
            document.getElementById("app"),
        );
    });
    registerServiceWorker();
})();