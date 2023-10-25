import { NextFunction } from "express";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'


const authenticate = (req: Request, res: Response,next : NextFunction):Response =>{
    const authorizationHeader = req.headers.authorization;


    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
        return res.status(401).json({
            Error: "Must Login First"
        })
    }

    const token = authorizationHeader.split(" ")[1];

    try{
        const loginSession = jwt.verify(token, "bagasngidiw")

        // console.log("This is session", loginSession);
        res.locals.loginSession = loginSession
        next()
    }catch(error){
        return res.status(401).json({
            error: "Wrong Token!"
        })
    }
}

export default authenticate