import {  Routes, Route, Navigate } from "react-router-dom";
// import { Detail } from "./features/thread/ThreadCardDetail";
// import ThreadCardDetail from "./pages/home/ThreadCardDetail";
// import { Detail } from "./features/thread/ThreadCardDetail";
import ThreadCardDetail from "./pages/home/ThreadCardDetail";
import Profile from "./pages/home/Profile";
import { RegisterPage } from "./pages/Auth/register";
import { LoginPage } from "./pages/Auth/login";
import { useState, useEffect, CSSProperties } from 'react';
import { PropagateLoader } from "react-spinners";
import Home from "./pages/home/Home";
import { API, setAuthToken } from "./lib/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import ClickAbleProfile from "./pages/home/ClickAbleProfile";
import EditProfile from "./pages/Auth/editProfile";
import Follows from "./pages/home/Follows";
import { Search } from "./pages/home/Search";
// import { useSelector } from "react-redux";
// import { RootState } from "./stores/types/rootState";
// import { CSSProperties } from "@emotion/serialize";

const override: CSSProperties = {
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
};


function App(){
  
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const auth = useSelector((state: RootState)=> state.auth)

  async function authCheck(){
    try{
      
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      
      dispatch(AUTH_CHECK(response.data.user))
      
      setIsLoading(false)

    }catch(err){
      dispatch(AUTH_ERROR())
      
      setIsLoading(false)
      
      
      navigate('/login')
    }

  }

  useEffect(()=>{
    if(localStorage.token){
      authCheck()
    }else{
      setIsLoading(false)
    }
  },[])

//  function isLogin(){
//   if(!auth.email){
//     return <Navigate to={'/login'} />
//   }else{
//     return <Home/>
//   }
//  }

//  function isNotLogin(){
//   if(auth.email){
//     return <Navigate to={'/home'}/>
//   }else{
//     return <LoginPage/>
//   }
//  }


  return(
    <>
      {isLoading ? <PropagateLoader color="#36d7b7" cssOverride={override}/>: (
        // <Router>
              <Routes>
                  <Route path="/" element={localStorage.token ?  <Home/> : <Navigate to='/login'/> } />
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/threadcarddetail/:id" element ={localStorage.token ? <ThreadCardDetail/> : <Navigate to={'/login'}/>}></Route>
                  <Route path="/profile" element ={<Profile/>}></Route>
                  <Route path="/editProfile/:id" element ={<EditProfile/>}></Route>
                  <Route path="/user/:id" element={<ClickAbleProfile/>}></Route>
                  <Route path="/follow" element={<Follows/>}></Route>
                  <Route path="/search" element={<Search/>}></Route>
              </Routes>
      )}
        {/* </Router> */}
    </>
  )
}

export default App