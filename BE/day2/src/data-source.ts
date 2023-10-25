import "reflect-metadata"
import { DataSource, Like } from "typeorm"
import { Thread } from "./entities/Thread"
import { User } from "./entities/User"
import { Likes } from "./entities/Likes"
import { Follow } from "./entities/Follow"
import { Reply } from "./entities/Reply"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password123",
    database: "threads_db",
    synchronize: true,
    logging: false,
    entities: [User, Thread, Likes, Follow, Reply],
    migrations: [],
    subscribers: [],
})
