import { CLIENT_RENEG_LIMIT } from "tls";

import path from 'path' // added 37.57
import {version} from '../package.json'
import _ from 'lodash'
import File from './models/file' // added 53.45

class AppRouter {

    constructor(app){ // This is coming from the index.js file.
        this.app = app;
        this.setupRouters();
    }

    setupRouters(){

        const app = this.app;
        const uploadDir = app.get('storageDir'); //<-- Modified and moved (Reference error if commented out)
        const upload = app.get('upload'); //<-- Modified and moved

        // root routing
        app.get('/', (req, res, next) => {
            
            return res.status(200).json({
                version: version
            });
        
        });

        
        // Upload routing
        app.post('/api/upload', upload.array('files'),(req, res, next) => {
            const files = req.files; // console.log('Received file uploaded', req.files); <-- Commented out

            let fileModels = [];
            
            _.each(files, (fileObject) => { // added 52.46
                const newFile = new File(app).initWithObject(fileObject).toJson();
                fileModels.push(newFile);
            });

            return res.json({
                files: fileModels,
            })
        });
    
        // Download routing <-- added 35.37

        app.get('/api/download/:name', (req, res, next) => { // <-- added 35.37 (the token -> name)

            const fileName = req.params.name; // <-- added 36.48 
            const filePath = path.join(uploadDir, fileName); // added 38.24

            return res.download(filePath, fileName, (err) => { // added. 39.21

                if(err){

                    return res.status(404).json({

                        error: {
                            message: "File not found"
                        }
                    }); 
                }else{

                    console.log("File is downloaded.");
                }

            });
        
                

        }); 


    }

}

export default AppRouter;