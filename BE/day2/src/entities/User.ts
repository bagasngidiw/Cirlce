import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Follow } from "./Follow";
import { Thread } from "./Thread";
import { Reply } from "./Reply";
import { Likes } from "./Likes";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    description: string

    @OneToMany(() => Thread, (thread) => thread.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    threads: Thread[];

    @OneToMany(() => Likes, (like) => like.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    like: Likes[];

    @OneToMany(() => Reply, (reply) => reply.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    reply: Reply[];

    @OneToMany(() => Follow, (follow) => follow.followed, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followings: Follow[];

    @OneToMany(() => Follow, (follow) => follow.follower, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followers: Follow[];
}