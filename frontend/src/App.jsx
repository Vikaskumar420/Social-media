import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import getAllPost from './hooks/getAllPost'
import Loops from './pages/Loops'
import getAllLoops from './hooks/getAllLoops'
import Story from './pages/Story'
import getAllStories from './hooks/getAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import {io} from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import getFollowingList from './hooks/getFollowingList'
import getPrevChatUsers from './hooks/getPrevChatUsers'
import Search from './pages/Search'
import getAllNotifications from './hooks/getAllNotifications'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/userSlice'
export const serverUrl="http://localhost:3000"
function App() {
   getCurrentUser()
   getSuggestedUsers()
   getAllPost()
   getAllLoops()
   getAllStories()
   getFollowingList()
   getPrevChatUsers()
   getAllNotifications()
  const {userData,notificationData}=useSelector(state=>state.user)
   
    const {socket}=useSelector(state=>state.socket)
    const dispatch=useDispatch()
 useEffect(()=>{
  if(userData){
    const socketIo=io(`${serverUrl}`,{
      query:{
        userId:userData._id
      }
    })
dispatch(setSocket(socketIo))


socketIo.on('getOnlineUsers',(users)=>{
  dispatch(setOnlineUsers(users))
  console.log(users)
})


return ()=>socketIo.close()
  }else{
    if(socket){
      socket.close()
      dispatch(setSocket(null))
    }
  }
 },[userData])


socket?.on("newNotification",(noti)=>{
  dispatch(setNotificationData([...notificationData,noti]))
})

  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
       <Route path='/login' element={!userData?<Login/>:<Navigate to={"/"}/>}/>
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
       <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
      <Route path='/profile/:username' element={userData?<Profile/>:<Navigate to={"/login"}/>}/>
      <Route path='/story/:username' element={userData?<Story/>:<Navigate to={"/login"}/>}/>
       <Route path='/upload' element={userData?<Upload/>:<Navigate to={"/login"}/>}/>
        <Route path='/search' element={userData?<Search/>:<Navigate to={"/login"}/>}/>
          <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/login"}/>}/>
            <Route path='/messages' element={userData?<Messages/>:<Navigate to={"/login"}/>}/>
            <Route path='/messageArea' element={userData?<MessageArea/>:<Navigate to={"/login"}/>}/>
             <Route path='/notifications' element={userData?<Notifications/>:<Navigate to={"/login"}/>}/>
          <Route path='/loops' element={userData?<Loops/>:<Navigate to={"/login"}/>}/>
    </Routes>
  )
}

export default App
