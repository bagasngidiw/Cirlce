import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Likes } from "../entities/Likes";

class LikesService{
    private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes)

    async create(reqBody: any, loginSession: any): Promise<any>{
        try{
            const isLike = await this.likeRepository.count({
                where: {
                    user: {
                        id: loginSession.user.id
                    },
                    thread: {
                        id: reqBody.threadById
                    }
                }
            })
            if(isLike >= 1){
                throw new Error("You've Liked This Thread")
            }

            const like = this.likeRepository.create({
                thread: {
                    id: reqBody.threadById
                },
                user: {
                    id: loginSession.user.id
                }
            })

            await this.likeRepository.save(like)

            return{
                message: "Liked",
                like: like
            }

        }catch(err){
            throw new Error (err.message)
        }
    }
    async deleteLike(threadById: number, loginSession: any): Promise<any>{
        try{
            const like = await this.likeRepository.findOne({
                where: {
                    thread:{
                        id: threadById,
                    },
                    user:{
                        id: loginSession.user.id
                    }
                }
            })

            if(!like){
                throw new Error("Kan lu belom ngelike, ngpain di delet?")
            }

            await this.likeRepository.delete({
                id: like.id
            })

            return{
                message: "Unliked",
                like: like
            }
        }catch(error){
            throw new Error("error di delet bangg")
        }
    }
}

export default new LikesService