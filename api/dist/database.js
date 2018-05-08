'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _mongodb = require('mongodb');

// derived from the https://www.npmjs.com/package/mongodb
var url = 'mongodb://localhost:27017/fileapp';

// connects to the mongodatabase // cb = Callback
var connect = exports.connect = function connect(callback) {

    _mongodb.MongoClient.connect(url, function (err, db) {
        return callback(err, db);
    });
};
//# sourceMappingURL=database.js.map