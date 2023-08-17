import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    })

    const handlechange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            // [e.target.name]: e.target.value
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    if (res.data.message === "User already exists") {
                        alert("User already exists");
                    } else if (res.data.message === "User created") {
                        alert("User created");
                    }
                })
        } else {
            alert("Invalid Credentials")
        }
    }

    return (
        <>
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder=" Your Name" onChange={handlechange} /> <br />
            <input type='email' name="email" value={user.email} placeholder=" Your Email" onChange={handlechange} /> <br />
            <input type="password" name="password" value={user.password} placeholder=" Your Password" onChange={handlechange} /> <br />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder=" Re-enter Password" onChange={handlechange} /> <br />
            <button type='button' onClick={register}>Register</button>
            <div>OR</div>
            <button type='button' onClick={() => { navigate('/login') }}>Login</button>
        </>
    )
}

export default Register