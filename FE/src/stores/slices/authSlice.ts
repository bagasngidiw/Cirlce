import {createSlice} from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
import { IUser } from "../../interface/interface"
import { setAuthToken } from "../../lib/api"

const initialAuthState: IUser ={
    id: 0,
    email: "",
    full_name: "",
    username: "",
    description: "",
    picture: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            console.log("Ini Datanya redux login", payload)
            setAuthToken(payload.token)
            localStorage.setItem("token", payload.token)

            const user: IUser = {
                id: payload.id,
                email: payload.email,
                full_name: payload.full_name,
                username: payload.username,
                description: payload.description,
                picture: payload.picture
            }

            // console.log(user)
            return  user

            
        },
        AUTH_CHECK: (_, action) =>{
            const payload = action.payload
            console.log("Ini Datanya redux auth check", payload)
            return payload
        },
        AUTH_ERROR: ()=>{
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: (_)=>{
            localStorage.removeItem("token")
            setAuthToken(null)
        }
    }
})

