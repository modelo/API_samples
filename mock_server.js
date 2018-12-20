var fs = require("fs");
var os = require("os");
var path = require("path");
var argv = require("yargs").argv;
var url = require("url");
var mime = require("mime");

MockServer = function(db) {
    this.storageDirectory = __dirname;
    this.modelPath = null;
    if (argv.model) {
        this.modelPath = path.join("local-models",argv.model);
    }
};

// -------------------------------------------------------------- 
// Model manipulation
// -------------------------------------------------------------- 
MockServer.prototype.downloadFile = function(httpRequest, httpResponse) {
    var modelPath = this.modelPath || httpRequest.params.id;
    var modelFilePath = path.join(path.join(this.storageDirectory, modelPath), httpRequest.params.file);
    console.log(modelFilePath);
    this._downloadFile(httpRequest, httpResponse, modelFilePath, httpRequest.params.file, true);
};

MockServer.prototype.downloadPanorama = function(httpRequest, httpResponse) {
    var modelPath = this.modelPath || httpRequest.params.id;
    var modelFilePath = path.join(path.join(this.storageDirectory, modelPath), "panorama.json");
    this._downloadFile(httpRequest, httpResponse, modelFilePath, "panorama.json");
};

MockServer.prototype.downloadReviews = function (httpRequest, httpResponse) {
    var modelPath = this.modelPath ||  httpRequest.params.id;
    var modelFilePath = path.join(path.join(this.storageDirectory, modelPath), "reviews.json");
    this._downloadFile(httpRequest, httpResponse, modelFilePath, "reviews.json");
};// end of MockServer.prototype.downloadReviews

MockServer.prototype.downloadModelInfo = function (httpRequest, httpResponse) {
    var modelPath = this.modelPath ||  httpRequest.params.id;
    var modelFilePath = path.join(path.join(this.storageDirectory, modelPath), "model.json");
    this._downloadFile(httpRequest, httpResponse, modelFilePath, "model.json");
};// end of MockServer.prototype.downloadModelInfo

MockServer.prototype.downloadAssetFile = function (httpRequest, httpResponse) {
    var modelPath = this.modelPath;
    var fileName = httpRequest.params.fileName;

    var modelFilePath = path.join(path.join(this.storageDirectory, modelPath), "asset-files/" + fileName);
    this._downloadFile(httpRequest, httpResponse, modelFilePath, fileName);
};// end of MockServer.prototype.downloadAssetFile



MockServer.prototype._downloadFile = function(httpRequest, httpResponse, filePath, fileName, checkGZip) {

    var isGzipped = checkGZip && fs.existsSync(filePath + ".gz");
    if (isGzipped) {
        filePath = filePath + ".gz";
    }

    fs.stat(filePath, function (error, stat) {
        if (error) {
            if (error.errno == 34) {
                console.log(filePath + " does not exist.");
            }
            httpResponse.writeHead(500, { "Content-Type":"text/plain"});
            httpResponse.end();
        } else {

            var headers =  {
                "Content-Length": stat.size,
                "Content-Type": mime.lookup(fileName),
                "Access-Control-Allow-Origin": "*"
            };

            if (isGzipped) {
                headers["Content-Encoding"]  = "gzip";
            }

            httpResponse.writeHead(200, headers);

            var filestream = fs.createReadStream(filePath);
            filestream.on("end", function(fileStreamErr) {
                if (error) {
                    console.log(`Failed to read ${fileName}  (${fileStreamErr})`);
                }
                httpResponse.end();
            });
            filestream.pipe(httpResponse);
        }
    });
};

module.exports = MockServer;

