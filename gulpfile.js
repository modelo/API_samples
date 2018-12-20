/**
 * Just mock local server for local dev helper pages and local-model
 */

"use strict";

const gulp = require("gulp");
const express = require("express");
const app = express();
const MockServer = require("./mock_server");
const bodyParser = require("body-parser");
const compression = require("compression");
const mockserver = new MockServer(null);
const config = require("./gulp.config");
const path = require("path");


gulp.task("default", () => {

    app.use(function (req, res, next) {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        next()
    });

    app.use(compression({
        filter: function (req, res) {
            return /binary/.test(res.getHeader("Content-Type"));
        }
    }));

    app.use(require("connect-livereload")({ port: config.liveReloadPort }));

    app.use(bodyParser.json({
        limit: "50mb"
    }));

    app.use(bodyParser.urlencoded({
        limit: "50mb",
        extended: true
    }));

    app.use(express.static(__dirname + "/"));

    app.listen(config.expressPort);
    
    app.get("/local/:id/:index/:file", function (request, response) {
        console.log("download " + request.params.file + " at " + request.params.index);
        request.params.file = path.join(request.params.index + "", request.params.file);
        // Download the mockserver json file.
        mockserver.downloadFile(request, response);
    });


    app.get("/local/:id/:file", function (request, response) {
        console.log("download " + request.params.file);
        // Download the mockserver json file.
        mockserver.downloadFile(request, response);
    });


    app.get("/downloadpanorama/:id", function (request, response) {
        console.log("download panorama");
        // Download the mockserver json file.
        mockserver.downloadPanorama(request, response);
    });

    app.get("/reviews/:id", function (request, response) {
        // When user download the texture data
        mockserver.downloadReviews(request, response);
    });

    app.get("/downloadasset/:fileName", function (request, response) {
        // When user download the texture data
        mockserver.downloadAssetFile(request, response);
    });

    app.get("/modelinfo/:id", function (request, response) {
        // When user download the texture data
        mockserver.downloadModelInfo(request, response);
    });

    app.get("/view-svgs.html", function(req, res) {
        res.sendFile(__dirname + "/tools/view-svgs.html");
    });


    app.get("/prerender/*", function(req, res) {
        res.sendFile(__dirname + "/prerender/index.html");
    });

    // This route deals enables HTML5Mode by all urls to index
    // It must always come after every route
    app.get("/*", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });
});
