import { useState } from "react";
import { IUserLogin, IUserRegister } from "../interface/interface";
import { API } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../stores/rootReducer";
import { useDispatch } from "react-redux";

export function useRegister(){

    const Navigate = useNavigate()

    const [formData, setFormData] = useState<IUserRegister>({
        email: "" ,
        username: "",
        full_name: "" ,
        password: "" 
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        console.log(name);
        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }))
    }

    async function handleRegister(){
        try{
            const response = await API.post('/auth/register', formData)
            console.log("Register Success", response)
            Navigate('/login')
        }catch(err){
            console.log(err)
        }
    }

    return{handleChange, formData, setFormData, handleRegister}
}




export function useLogin(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<IUserLogin>({
        email: "" ,
        password: "" 
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        console.log(name);
        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }))
    }

    async function handleLogin(){
        try{
            const response = await API.post('/auth/login', formData)
            
            console.log("Login Success", response)
            dispatch(AUTH_LOGIN(response.data))
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    function handleLogout(){
        dispatch(AUTH_LOGOUT())
        navigate('/login')
    }

    return{handleChange, formData, setFormData, handleLogin, handleLogout}
}

