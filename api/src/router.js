import { CLIENT_RENEG_LIMIT } from "tls";

import {version} from '../package.json'

class AppRouter {

    constructor(app){ // This is coming from the index.js file.

        this.app = app;
        this.setupRouters();
    }

    setupRouters(){

        const app = this.app;

        // root routing
        app.get('/', (req, res, next) => {
            
            return res.status(200).json({
                version: version
            });
        
        });

        app.post('/api/upload', (req, res, next) => {

            return res.json({

                upload:' Works',
            })

        });
    }

}

export default AppRouter;