import { Request, Response } from "express";
import SearchService from "../services/SearchService";

class SearchController{
    findAll(req: Request, res: Response){
        SearchService.findAll(res, req)
    }
}
export default new SearchController