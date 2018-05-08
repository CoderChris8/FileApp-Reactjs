import {MongoClient} from 'mongodb'

// derived from the https://www.npmjs.com/package/mongodb
const url = 'mongodb://localhost:27017/fileapp';

// connects to the mongodatabase // cb = Callback
export const connect = (callback) => {

    MongoClient.connect(url, (err, db) => {
    return callback(err, db); 
    });
};