import "reflect-metadata"
import { DataSource, Like } from "typeorm"
import { Thread } from "./entities/Thread"
import { User } from "./entities/User"
import { Likes } from "./entities/Likes"
import { Follow } from "./entities/Follow"
import { Reply } from "./entities/Reply"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "viaduct.proxy.rlwy.net",
    port: 21776,
    username: "postgres",
    password: "-GD66abaeabbc4-1*-4gfad6adD*EeA3",
    database: "railway",
    synchronize: true,
    logging: false,
    entities: [User, Thread, Likes, Follow, Reply],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
