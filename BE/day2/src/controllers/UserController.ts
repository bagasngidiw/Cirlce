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

    Checking(req: Request, res: Response){
        UserServices.checking(req,res)
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