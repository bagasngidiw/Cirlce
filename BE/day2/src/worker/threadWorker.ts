import * as amqp from 'amqplib'
import { v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from '../data-source';
import { Thread } from '../entities/Thread';


class ThreadWorker {

    async create(queueName:string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
    
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                if(message !== null){
                    try {
                        const payload = JSON.parse(message.content.toString())
                        console.log("Received Message", payload);
                        
                        const cloudinaryResponse = await cloudinary.uploader.upload('./uploads/' + payload.image)

                        console.log("ini payload kang ", payload);
                        
    
                        const thread = AppDataSource.getRepository(Thread).create({
                            content: payload.content,
                            image: cloudinaryResponse.secure_url,
                            user:{
                                id: payload.user_id
                            }
                        })
                        console.log("ini data thread rabbit", thread);
                        await AppDataSource.getRepository(Thread).save(thread)
    
                        console.log("Thread is Created");
                        channel.ack(message)
                    } catch (error) {
                        console.log("Queue failed", error);
                        
                    }
                }
            })
    
        } catch (error) {
            console.log("Error Processing Queue", error);
        }
    }
}

export default new ThreadWorker()

