import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

// links database from src/database.js
import {connect} from "./database";
// links router.js 
import AppRouter from './router';

// File storage config

const storageDir = path.join(__dirname, '..', 'storage');
const storageConfig = multer.diskStorage({
	destination:  (req, file, cb) => {
	  cb(null, storageDir)
	},
	filename:  (req, file, cb) => {
	  cb(null, Date.now() + path.extname(file.originalname))
	}
  });

  const upload = multer({ storage: storageConfig })

const PORT = 3002;
const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: "*"
}));

app.use(bodyParser.json({
	limit : '50mb'
}));

app.set('root', __dirname);
app.set('storageDir', storageDir);
app.set('upload', upload);

// Connect to the database.

connect((err, db) => {

	if(err) {
		console.log('An error connecting to the database', err);
		throw (err)
	}

	app.set('db', db);

	// initiates the router.

	new AppRouter(app) // passes app to router.js

	app.server.listen(process.env.PORT || PORT, () => {
		console.log(`App is running on port ${app.server.address().port}`);
	});

});

export default app;

// connect to db
// initializeDb( db => {

// 	// internal middleware
// 	app.use(middleware({ config, db }));

// 	// api router
// 	app.use('/api', api({ config, db }));

// 	app.server.listen(process.env.PORT || config.port, () => {
// 		console.log(`Started on port ${app.server.address().port}`);
// 	});
// });

// export default app;