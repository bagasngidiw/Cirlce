import { Request, Response } from "express";
import LikeService from "../services/LikeService";

class LikesController{
    async create(req: Request, res: Response){
        try{
            const loginSession = res.locals.loginSession;
            const response = await LikeService.create(req.body, loginSession)

            return res.status(200).json(response)
        }catch(err){
            return res.status(500).json({
                error: err.message
            })
        }
    }

    async delete(req: Request, res: Response){
        try{
            const loginSession = res.locals.loginSession
            const threadId = parseInt(req.params.threadById)

            const response = await LikeService.deleteLike(threadId, loginSession)
            return res.status(200).json(response)

        }catch(error){
            return res.status(500).json({
                error: error.message
            })
        }
    }
    
}

export default new LikesController