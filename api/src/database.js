import {MongoClient} from 'mongodb'

// derived from the https://www.npmjs.com/package/mongodb
const url = 'mongodb://localhost:27017/fileapp';

// cb = Callback
// connects to the mongodatabase 
export const connect = (callback) => {

    MongoClient.connect(url, (err, db) => {
    return callback(err, db); 
    });
};