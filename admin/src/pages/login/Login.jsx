import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { login } from "../../redux/apiCalls"


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
    window.location = '/';   

  }
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      flexDirection: "column"
    }}>
      <input 
      style={{padding: 6,marginBottom:20}}
      type="text" 
      placeholder="username"
        onChange={e => setUsername(e.target.value)} />
      <input 
      style={{padding: 6,marginBottom:20}}
      type="password" 
      placeholder="password"
        onChange={e => setPassword(e.target.value)} />
      <button style={{padding:6, width:100}}
      onClick={handleClick}> 
      Login 
      </button>

    </div>
  )
}

export default Login