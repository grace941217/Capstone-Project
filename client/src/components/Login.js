import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setCurrentUser}) {
  const navigate = useNavigate()
  const currentUser = sessionStorage.getItem("user_id")
  const [formData, setFormData] = useState({
    username:'',
    password:''
  })

  useEffect(() => {
    if (currentUser) {
     navigate("/")
    } 
  },[currentUser, navigate])

  function onSubmitLogin(e){
    e.preventDefault();
    const login = {
      ...formData 
    }

    fetch(`/login`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(login)
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('user_id', data.id);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('last_name', data.last_name);
      sessionStorage.setItem('photo', data.photo);
      setCurrentUser(data);
    })
    navigate(`/`)
  }

  function onSubmitSignIn() {
        navigate("/signup")
  }
  
  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
  }

  return (
    <> 
    <form className="loginForm" onSubmit={onSubmitLogin}>
      <div id="login-page" className="content" > 
        <div className="login-input-div">Username : <input className='login-input' placeholder="Username" type='text' name='username' value={formData.username} onChange={handleChange} />
        </div>

        <div className="login-input-div">Password : <input className='login-input' placeholder="Password" type='password' name='password' value={formData.password} onChange={handleChange} />
        </div>

        <input id="loginForm" className="submitButton" type='submit' value='Log In' />
        <input id="signup-form" className="submitButton" type='submit' value="Sign Up" onClick={onSubmitSignIn} />
      </div>
    </form>
    </>
    )
}

export default Login

