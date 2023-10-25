// import { response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";
import {Request, Response} from 'express'

class ThreadService{
    
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);
    
    async find(reqQuery?: any, loginSession?:any): Promise<any>{
        try{

            const limit = parseInt(reqQuery.limit?? 0)

            const threads = await this.threadRepository.find({
                relations: ["user", "like.user", "reply"],
                take: limit
            })
          
            return threads.map((element) =>({

                id: element.id,
                content: element.content,
                image: element.image,
                user: element.user,
                replies_count: element.reply.length,
                likes_count: element.like.length,
                posted_at: element.posted_at,
                is_liked: element.like.some(
                    (like: any)=> like.user.id === loginSession.user.id
                )
            }))

        }catch(error){
            throw new Error(error.message)
        }
    }
    async findOne(id: number, loginSession?: any): Promise<any>{
        try{
            const thread = await this.threadRepository.findOne(
                {
                    where: {
                        id: id
                    },
                    relations: ["user", "like.user", "reply"]
                }
            )
            

          return {
            id: thread.id,
            content: thread.content,
            image: thread.image,
            user: thread.user,
            replies_count: thread.reply.length,
            likes_count: thread.like.length,
            posted_at: thread.posted_at,
            is_liked: thread.like.some(
                (like: any)=> like.user.id === loginSession.user.id
            )
          }
        }catch(err){
            throw new Error(err.message)
        }
    }
    async create(req: Request, res:Response): Promise<Response>{

        const {content} = req.body
        const loginSession = res.locals.loginSession.user
        
        // console.log('ini login session ku', loginSession)

        try{
            const threads = this.threadRepository.create(

                {
                    content,
                    image: res.locals.filename,
                    user: loginSession
                }
            )
            
            const saveThread = await this.threadRepository.save(threads)

          return res.status(200).json(saveThread);
        }catch(err){
            return res.status(500).json({error : "ini error di create threads"})
        }
    }
    async delete(req: Request, res:Response): Promise<Response>{

        const id = parseInt(req.params.id)
        const loginSession = res.locals.loginSession.user
        try{
            const threads = await this.threadRepository.findOne(

                {
                    where: {id:id},
                    relations: ["user"]

                }
            )

            if(!threads){
                return res.status(400).json("Thread Not Found")
            }
            
            if(threads.user && threads.user.id !== loginSession.id){
                return res.status(403).json("you are not allowed to delete this thread")
            }

            await this.threadRepository.remove(threads)

          return res.status(200).json(threads);
        }catch (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ error: "Error While Deleting Threads" });
        }
        
    }
    async update(req: Request, res:Response): Promise<Response>{

        const id = parseInt(req.params.id)
        const {content, image} = req.body
        
        try{
            const threads = await this.threadRepository.findOne(

                {
                    where: {id:id},
                    relations: ["user", "like", "reply"]

                }
            )

            threads.content = content
            threads.image = image

            const updateThread = await this.threadRepository.save(threads)
            
            return res.status(200).json(updateThread);
        }catch(err){
            return res.status(500).json({error: "Error While Getting Threads"})
        }
    }
}

export default new ThreadService;


