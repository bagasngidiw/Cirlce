
import { useState, useEffect, useRef } from 'react';
import { API } from '../lib/api';
import { GET_THREAD } from '../stores/rootReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/types/rootState';



export function useHooks(){
   
    const threads = useSelector((state: RootState )=> state.thread.threads)
    const [dataContent, setContent] = useState("")
    
    const [dataImage, setImage] = useState<File | null | Blob | string>(null)

    const [previewImage, setPreviewImage] = useState<string | null >()
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch()

    const fetchData = async () => {
        try{
            const response = await API.get(`/threads`)
            dispatch(GET_THREAD(response.data))
            
            
            // console.log(response.data)
        }catch(error){
            console.error("error fetching data", error)
        }
    }
    
    useEffect(() => {
    fetchData()
    }, []);

   
    const handleContentChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = event.target
        setContent(value)
    }


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const selectedImage = event.target.files && event.target.files[0]
        setImage(selectedImage)

        const selectedPreviewImage = event.target.files && event.target.files[0]

        if(selectedPreviewImage){
            if(selectedPreviewImage instanceof File){

                setPreviewImage(URL.createObjectURL(selectedPreviewImage))
            }
        }else{
            setPreviewImage(null)
        }

    }

    const handleClearFile = () => {
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input value
        }
      };
    const handleClosePreview = () =>{
        setPreviewImage(null)
        setContent(''); 
        handleClearFile()
    }
    
    

    const fetchCreatePost = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('content', dataContent)

        if(dataImage){
            formData.append('image', dataImage)
        }
        try{
            const response = await API.post('/threads', formData, {
                headers : {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            fetchData()
            handleClosePreview()
            console.log('Berhasil Post Threads', response.data)
        }catch (error){ 
            console.error('Error creating thread:', error);

        }
    }

    
    return {threads, dataContent, dataImage, fileInputRef, previewImage, fetchCreatePost, fetchData, handleContentChange, handleImageChange, handleClosePreview}
}