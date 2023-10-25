import * as amqp from 'amqplib'
import { v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from '../data-source';
import threadWorker from './threadWorker';

class WorkerHub {
    constructor() {
        AppDataSource.initialize().then(async () => {
            cloudinary.config({
                cloud_name: 'dfzk4snhm',
                api_key: '428117137954792',
                api_secret: 'YpfhF5dUJjHAQBNXj73_CcSY9fM'
            });
            const queueName = "Threads-queue"
            const connection = await amqp.connect("amqp://localhost")

            threadWorker.create(queueName, connection)


        }).catch((error) => {
            console.log("Error di Index worker", error);
            
        })
    }
}

export default new WorkerHub()