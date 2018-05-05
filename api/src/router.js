import { CLIENT_RENEG_LIMIT } from "tls";

import path from 'path';
import {version} from '../package.json'

class AppRouter {

    constructor(app){ // This is coming from the index.js file.

        this.app = app;
        this.setupRouters();
    }

    setupRouters(){

        const app = this.app;
        const uploadDir = app.get('storageDir');
        const upload = app.get('upload');

        // root routing
        app.get('/', (req, res, next) => {
            
            return res.status(200).json({
                version: version
            });
        
        });
        
        // Upload routing
        app.post('/api/upload', upload.array('files'),(req, res, next) => {
            const files = req.files;
            return res.json({
                files: files,   
            })
        });

        // Dowmload routing

        app.get('/api/download/:name', (req, res, next) => {

            const fileName = req.params.name;
            const filePath = path.join(uploadDir, fileName);

            return res.download(filePath, fileName, (err) => {

                if(err) {

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