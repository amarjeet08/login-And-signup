import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    })

    const handlechange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
        axios.post('http://localhost:9002/login', user)
            .then(res => alert(res.data.message))
    }

    return (
        <>
            <h1>Login</h1>
            <input type="text" name='email' value={user.email} placeholder="Enter your Email" onChange={handlechange} /> <br />
            <input type="password" name='password' value={user.password} placeholder="Enter your Password" onChange={handlechange} /> <br />
            <button type='button' onClick={login}>Login</button>
            <div>OR</div>
            <button type='button' onClick={() => { navigate('/register') }}>Register</button>
        </>
    )
}

export default Login