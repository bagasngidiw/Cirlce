import {useState, useEffect, FormEvent, ChangeEvent} from 'react'
import { useParams } from 'react-router-dom'
import { IReplyPost, IThreadCard } from '../interface/interface'
import { API } from '../lib/api'

export function useReply(){
    const [replies, setReplies] = useState<IThreadCard[]>()
    const [thread, setThread] = useState<IThreadCard>()

    const {id} = useParams()

    const [form, setForm] = useState<IReplyPost>({
        content: "",
        threadById: +(id as string)
    })


    async function getThreadById(){
        try{    
            
            const response = await API.get(`/threads/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setThread(response.data)
            
            console.log("ini respon thread", response)
        }catch(error){
            console.error("error Detail Thread", error)
        }
    }
  

    async function getReplies() {
        try {
            const response = await API.get(`reply?threadById=${id}`)
            setReplies(response.data)
            console.log("Berhasil Get All Reply", response)
        } catch (error) {
            console.log("cannot Get All Reply", error)
        }
    }

    async function handlePostReply(event:FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()

            const response = await API.post('/reply', form)
            console.log('Reply Succesfull', response.data)
            setForm({ content: "" });

            getReplies()
        } catch (error) {
            console.log("Failed To Reply", error)
        }
    }

    function handleChangeReply(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    useEffect(()=>{
        getThreadById()
        getReplies()
        window.scrollTo(0, 0);

    }, [id])

    return{replies, form, handleChangeReply, handlePostReply, thread}
}