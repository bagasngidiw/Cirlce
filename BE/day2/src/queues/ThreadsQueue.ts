import { Request, Response } from "express-serve-static-core";
import * as amqp from 'amqplib'
import { sendMessageQueue } from "../libs/rabbitMq";


class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = "Threads-queue";
      const filename = res.locals.filename;

      const data = {
        content: req.body.content,
        image: filename,
      };

        //   const { error } = createThreadSchema.validate(data);

        //   if (error) {
        //     return res.status(400).json({
        //       error: error,
        //     });
        //   }

      const loginSession = res.locals.loginSession;

      const payload = {
        content: data.content,
        image: data.image,
        user_id: loginSession.user.id,
      };

      const errQueue = await sendMessageQueue(queueName, payload)

      res.status(200).json({
        message: "Thread Telah Dibuat Kang"
      })

    } catch (err) {
      console.log("Error!! Something Happen When Queueing!", err);
      res.status(500).json({
        error: "Something wrong in server!",
      });
    }
  }
}

export default new ThreadQueue();