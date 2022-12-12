import React from 'react'
import { AuthContext } from '../Context/AuthContext'
import {useContext,useEffect,useState} from 'react'
import UploadFile from './UploadFile'
import Posts from './Posts'
import { database } from '../firebase'
import { display } from '@mui/system'
import Navbar from './Navbar'

function Feed() {
    const {user,logout} = useContext(AuthContext)
    const [userData,setUserData] = useState('')

    useEffect(()=>{
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
          setUserData(snapshot.data())
      })
      return ()=> {unsub()}
  },[user])

  return (

        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          
            <Navbar userData={userData}/>
            <div style={{marginTop:'3rem', display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <UploadFile user={userData}/>
            <Posts userData={userData}/>
            </div>
           
        </div>
        </>
  )
}

export default Feed