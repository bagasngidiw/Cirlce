import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import {Request, Response} from 'express'
import { User } from "../entities/User";
import { userRegister, userLogin } from "../utils/joiValidator";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt = require("bcrypt") 
import jwt = require("jsonwebtoken") 


class UserServices{

    private readonly userRepository : Repository<User> = AppDataSource.getRepository(User)
    
    async create (req:Request, res: Response): Promise<Response> {
        try{
            const{username, password, full_name, email} = req.body

            const{error, value} = userRegister.validate(req.body)
            
            if(error){
                return res.status(500).json(
                    
                    {
                        message: ("Error When Validate User Register")
                    }
                    )
                }
                
                const CheckEmail = await this.userRepository.count({
                where: {
                    email : value.email,
                    username : value.username
                }
                
            })
            
            if(CheckEmail>0){
                return res.status(400).json("Email/Username Already Exist")
            }

            const encryptPass = await bcrypt.hash(password, 10)
            
            const user = this.userRepository.create(
                {
                    username,
                    full_name,
                    email,
                    password : encryptPass
                
                }
            );

            const NewUser = await this.userRepository.save(user)
                console.log("ini newuser", NewUser);
                
                
            return res.status(200).json(
                
                NewUser
            )
                
    
        } 
        catch (err) {
            return res.status(400).json(
                {
                    error: err
                    
                }
            )
        }
        
    }    

    async Profile(req: Request, res: Response): Promise<Response>{
        const userId = parseInt(req.params.id)
        try{
            const user = await this.userRepository.findOne(

                {

                    where: {id:userId}

                }


            )
            
          return res.status(200).json(user);
        }catch(err){
            return res.status(500).json({error: err})
        }
    }

    async update(req: Request, res:Response): Promise<Response>{

        const filename = req.file ? req.file.path : ""
        const id = parseInt(req.params.id)
        const {full_name, username, description} = req.body
        
        try{
            const users = await this.userRepository.findOne(
                {
                    where: {id:id},
                }
            )
            // cloudinary.config({
            //     cloud_name: 'dfzk4snhm',
            //     api_key: '428117137954792',
            //     api_secret: 'YpfhF5dUJjHAQBNXj73_CcSY9fM'
            // });
          
            // const cloudinaryResponse = await cloudinary.uploader.upload(
            // "./uploads/" + filename
            // );

            users.full_name = full_name
            users.username = username
            users.description = description
            users.picture = filename
            
            const updateUser = await this.userRepository.save(users)
            console.log("ini updated", updateUser);
            
            
            return res.status(200).json(updateUser);
        }catch(err){
            return res.status(500).json({error: err})
        }
    }

    async GetAll(req: Request, res: Response): Promise<Response>{
        try {
            const users = await this.userRepository.find()

            return res.status(200).json(users.sort((a, b) => (b.id - a.id)))
            
        } catch (error) {
            res.status(500).json("Error Di Get All User")
        }
    }

    async Login(req: Request, res: Response): Promise<Response>{
            
        const JWT_SECRET_KEY = "bagasngidiw"

        try{
            const{email, password} = req.body
                
            const{error, value} = userLogin.validate(req.body)
            if(error){
                return res.status(500).json(
                    {
                        message : ("Error When Validate User Login")
                    }
                )
            }
            const user = await this.userRepository.findOne(
                {
                    where: {email}
                }
            )
            const encryptPass = await bcrypt.hash(password, 10)
            if(!user){
                return res.status(401).json({message: "Cannot Find User"})
            }
            const isPwValid = await bcrypt.compare(password, encryptPass);

            if(!isPwValid){
                return res.status(401).json({message: "Cannot Find User"})
            }
            
            console.log('Data User :', user)

            const token = jwt.sign({user}, "bagasngidiw", {expiresIn: '4h'})

            return res.status(200).json({
                message: 'Login Success',
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                picture: user.picture,
                description: user.description,
                token: token
            })

        }catch(err){
            return res.status(500).json({error: err})
        }
    }

 async check(loginSession: any): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        relations: ["followers", "followings"],
      });

      return {
        message: "Token is valid!",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          picture: user.picture,
          description: user.description,
          followers_count: user.followers.length,
          followings_count: user.followers.length,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
export default new UserServices