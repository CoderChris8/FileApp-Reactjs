'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // added 37.57


var _tls = require('tls');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _file = require('./models/file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// added 53.45

var AppRouter = function () {
    function AppRouter(app) {
        _classCallCheck(this, AppRouter);

        // This is coming from the index.js file.
        this.app = app;
        this.setupRouters();
    }

    _createClass(AppRouter, [{
        key: 'setupRouters',
        value: function setupRouters() {

            var app = this.app;
            var uploadDir = app.get('storageDir'); //<-- Modified and moved (Reference error if commented out)
            var upload = app.get('upload'); //<-- Modified and moved

            // root routing
            app.get('/', function (req, res, next) {

                return res.status(200).json({
                    version: _package.version
                });
            });

            // Upload routing
            app.post('/api/upload', upload.array('files'), function (req, res, next) {
                var files = req.files; // console.log('Received file uploaded', req.files); <-- Commented out

                var fileModels = [];

                _lodash2.default.each(files, function (fileObject) {
                    // added 52.46
                    var newFile = new _file2.default(app).initWithObject(fileObject).toJson();
                    fileModels.push(newFile);
                });

                return res.json({
                    files: fileModels
                });
            });

            // Download routing <-- added 35.37

            app.get('/api/download/:name', function (req, res, next) {
                // <-- added 35.37 (the token -> name)

                var fileName = req.params.name; // <-- added 36.48 
                var filePath = _path2.default.join(uploadDir, fileName); // added 38.24

                return res.download(filePath, fileName, function (err) {
                    // added. 39.21

                    if (err) {

                        return res.status(404).json({

                            error: {
                                message: "File not found"
                            }
                        });
                    } else {

                        console.log("File is downloaded.");
                    }
                });
            });
        }
    }]);

    return AppRouter;
}();

exports.default = AppRouter;
//# sourceMappingURL=router.js.map