
export interface IUser {
    id: number,
    picture: string,
    full_name: string,
    username: string,
    email: string,
    description: string,
    followers_count?: number;
    followings_count?: number;
}

export interface IThreadCard {
    id: number,
    content?: string,
    posted_at?: Date,
    likes_count: number,
    replies_count: number,
    is_liked: boolean,
    image?: string,
    user?: IUser

}

export interface IThreadPost {
    content: string,
    image: Blob | MediaSource | string
}


export interface IUserRegister {
    full_name: string,
    username: string,
    email: string,
    password: string
}
export interface IUserLogin {
    email: string,
    password: string
}

export interface IReply {
    id?: number,
    content?: string,
    user?: IUser
}

export interface IReplyPost {
    content?: string,
    threadById?: number
}

export interface IFollow {
    id: number;
    user?: IUser;
    user_id: number;
    username: string;
    full_name: string;
    email: string;
    picture: string;
    is_followed: boolean;
}
