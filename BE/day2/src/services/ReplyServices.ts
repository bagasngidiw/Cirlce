import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Reply } from "../entities/Reply";


class ReplyService{
 private readonly replyRepository: Repository<Reply > = AppDataSource.getRepository(Reply)

    async findReply(reqQuery: any): Promise<any>{
        try{
        const threadId = parseInt(reqQuery.threadById ?? 0)
            const reply = this.replyRepository.find({
                relations: ["user"],
                where: {
                    thread: {
                        id: threadId
                    }
                }
            })

            return reply;
        }catch(error){
            throw new Error(error.message)
        }
    }


    async createReply(reqBody: any, loginSession: any): Promise<any>{
        try{
            const reply = this.replyRepository.create({
                content: reqBody.content,
                user: {
                    id: loginSession.user.id
                },
                thread: {
                    id: reqBody.threadById
                }
            })

            await this.replyRepository.save(reply)
            return {
                message: "Reply Success"
            } ;
        }catch(error){
            throw new Error(error.message)
        }
    }
}

export default new ReplyService