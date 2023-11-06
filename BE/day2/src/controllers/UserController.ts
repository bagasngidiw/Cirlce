import {Request, Response} from 'express';
// import { User } from '../entity/user';
import UserServices from '../services/UserServices';


 class UserController {


    create(req: Request, res:Response){
        UserServices.create(req,res)
    }

    Login(req: Request, res:Response){
        UserServices.Login(req,res)
    }

    async check(req: Request, res: Response) {
        try {
          const loginSession = res.locals.loginSession;
          const response = await UserServices.check(loginSession);
    
          return res.status(200).json(response);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
    

    Profile(req: Request, res:Response){
        UserServices.Profile(req,res)
    }

    Update(req: Request, res:Response){
        UserServices.update(req,res)
    }

    GetAll(req: Request, res:Response){
        UserServices.GetAll(req,res)
    }
}

export default new UserController