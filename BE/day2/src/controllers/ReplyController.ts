import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";

class ReplyController{
    async find(req: Request, res: Response){
        try {
            const response = await ReplyServices.findReply(req.query)
            return res.status(200).json(response.sort((a, b) => (b.id - a.id)))
        } catch (err) {
            return res.status(500).json({ error: err.message });

        }
    }
    async create(req: Request, res: Response) {
        try {
          const loginSession = res.locals.loginSession;

          console.log( "ini logses di reply creat controller",loginSession)
          console.log( req.body)
    
          const response = await ReplyServices.createReply(req.body, loginSession);
          return res.status(200).json(response);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
    }
    
    export default new ReplyController();
