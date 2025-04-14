"use strict";
// @ts-nocheck
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "cert", "local.slatecast.dev-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "cert", "local.slatecast.dev.pem")),
};
app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(443, "local.slatecast.dev", (err) => {
        if (err)
            throw err;
        console.log("> Ready on https://local.slatecast.dev:443");
    });
});
