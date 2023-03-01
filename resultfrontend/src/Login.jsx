import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import ShowResult from './ShowResult';

function Login() {
    const [userid,setUserId]=useState()
    const [password,setPassword]=useState()

    const handleLogin=(event)=>{
      // event.preventDefault();
        const formData=new FormData()
        formData.append("userId",userid)
        formData.append("password",password)
        fetch("http://localhost:5000/login",{
            method:"POST",
            body:formData,
        }).then(res=>res.json())
        .then(data=>{
          localStorage.setItem("token",data.token)
        })
    }
  return (
    <div>
        <label htmlFor="userid">userId</label>
        <input type="text" name="" id="userid" placeholder='userId' value={userid} onChange={(e)=>setUserId(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="text" name="" id="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Link to="/Register">
        <button onClick={handleLogin}>Login</button>
        </Link>
        <Outlet />
        <ShowResult/>
    </div>
  )
}
export default Login