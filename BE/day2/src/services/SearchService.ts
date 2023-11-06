import { Request, Response } from "express";
import { Repository,Like } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

class SearchService{
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

    async findAll(res: Response, req: Request){
       try {
        const query = req.query
        // console.log("ini query nya: ", query)
        const users = await this.userRepository.find({
            where: [
                {
                    full_name: Like(`%${query.q}%`)
                },
                {
                    username: Like(`%${query.q}%`)
                },
            ]
        })
        return res.status(200).json(users)
       } catch (error) {
        console.log(error)
       }
    }
}
export default new SearchService