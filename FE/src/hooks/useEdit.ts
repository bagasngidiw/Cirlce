import { useState, useRef } from 'react';

import { API } from "../lib/api";
// import { IThreadCard } from "../interfaces/interface"; 
import { useNavigate, useParams } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import { AUTH_CHECK } from '../stores/rootReducer';

// import { useSelector } from "react-redux"; 
// import { AUTH_CHECK } from "../redux/authSlice"; 
// import { useHook } from "./useHook"; 
// import { useDispatch } from "react-redux"; 
// import { AUTH_CHECK } from "../redux/authSlice"; 
 
export function useEditProfile() { 
 
   
    const navigate = useNavigate(); 
 
    const { id } = useParams(); 
 
    const [dataUsername, setUsername] = useState(""); 
 
    const [dataName, setName] = useState(""); 
 
    const [dataDescription, setDescription] = useState(""); 
 
    const [image, setImage] = useState<File | null | Blob | string>(null); 

    const [previewImage, setPreviewImage] = useState<string | null >()

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useDispatch()


 
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const { value } = event.target; 
        setUsername(value); 
    }; 
 
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const { value } = event.target; 
        setDescription(value); 
    }; 
 
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const { value } = event.target; 
        setName(value); 
    }; 
 
    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
 
        const selectedProfilePicture = event.target.files && event.target.files[0]; 
        setImage(selectedProfilePicture); 

        const selectedPreviewImage = event.target.files && event.target.files[0]

        if(selectedPreviewImage){
            if(selectedPreviewImage instanceof File){

                setPreviewImage(URL.createObjectURL(selectedPreviewImage))
            }
        }else{
            setPreviewImage(null)
        }

    }; 

    const handleClearFile = () => {
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input value
        }
      };
    const handleClosePreview = () =>{
        setPreviewImage(null)
        handleClearFile()
    }
 
 
    const fetchUpdateUser = async (event: React.FormEvent) => { 
        event.preventDefault() 
 
        const formData = new FormData(); 
        formData.append('username', dataUsername); 
 
        formData.append('full_name', dataName); 
 
        formData.append('description', dataDescription); 
 
        if (image) { 
            formData.append('picture', image); 
        } 
 
        console.log("ini dataname", dataName); 
        console.log("ini username", dataUsername); 
        console.log("ini description", dataDescription); 
 
        try { 
 
            const response = await API.patch(`/user/${id}`, formData) 
 
 
            console.log("ini update user", response.data); 
 
            navigate('/'); 
            dispatch(AUTH_CHECK(response.data))
 
 
        } catch (error) { 
            console.log("Error Edit Profile", error); 
 
        } 
 
    } 
    return { previewImage, fileInputRef, fetchUpdateUser, handleUsernameChange, handleNameChange, handleDescriptionChange, handleProfilePictureChange, handleClosePreview } 
  
}