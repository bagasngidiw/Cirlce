import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Reply } from "./Reply"
import { User } from "./User"
import {Likes} from "./Likes"

@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable:true})
    image: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date

    @ManyToOne(()=> User, (user)=> user.threads, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user: User;

    @OneToMany(()=> Likes, (like)=> like.thread, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    like: Likes[]

    @OneToMany(() => Reply, (reply) => reply.thread, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    reply: Reply[]
}
