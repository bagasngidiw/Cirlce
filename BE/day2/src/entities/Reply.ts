import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Thread } from "./Thread";
import { User } from "./User";


@Entity({name: "replies"})
export class Reply{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(()=> User, (user)=> user.reply, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user: User

    @ManyToOne(()=> Thread, (thread) => thread.reply, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    thread: Thread


}