import exp = require("constants")
import { AppDataSource } from "./data-source"
// import { Thread } from "./entity/User"
import express = require("express")

import { Request, Response } from "express";
import routes from "./routes";
import processQueue from "./worker/threadWorker";


var cors = require('cors')
var app = express()


app.use(cors())

AppDataSource.initialize().then(async () => {
    
    const port = 2000;
    


    app.use(express.json());
    app.use("/api/v1", routes);

    app.get("/", (req: Request, res: Response) =>{
        res.send("Hello World");
    })

    
    // require('./app/routes')(app, {});
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })

}).catch(error => console.log(error))
