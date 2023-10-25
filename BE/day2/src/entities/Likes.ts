import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { User } from "./User";


@Entity({name: "likes"})

export class Likes{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, (user) => user.like, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user: User

    @ManyToOne(()=> Thread, (threads)=> threads.like, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    thread: Thread

}