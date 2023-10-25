import { NextFunction, Request, Response } from "express";
import * as multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: 'dfzk4snhm',
//     api_key: '428117137954792',
//     api_secret: 'YpfhF5dUJjHAQBNXj73_CcSY9fM'
// });


export const upload =(fieldName: string) =>{
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, './uploads/');
        },
        filename: function(req,file,cb){
            const uniqueSuffix = Date.now();
            cb(null,file.fieldname + "-" + uniqueSuffix + ".png");
        }
    });
    const uploadFile = multer({storage: storage})

    return (req:Request, res:Response, next: NextFunction)=>{
        uploadFile.single(fieldName)(req, res, function(err){

            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            // try{
            //     cloudinary.uploader.upload(file.path, (error, result)=>{
            //         if(error){
            //             return res.status(500).json({error : "failed to upload to cloudinary"})
            //         }

            //         console.log("Cloudinary Result", result)

            //         res.locals.filename = result.secure_url
            //         next()

            //     })

            // }catch(err){
            //     return res.status(400).json({error: err});
            // }
            res.locals.filename = req.file.filename
            next()

        })
    }
}