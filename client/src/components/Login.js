import React, {useState} from 'react'
// import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API from '../api/api'
import Loading from './Loading'
import HashLoader from "react-spinners/HashLoader";

export default function Login({setIsLogin}) {
    const [user, setUser] = useState({name: '',email: '',password: '' })
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false);

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await API.post('/users/register',{
                username: user.name,
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        setLoading(true);
        try {
            const res = await API.post('/users/login',{
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
        setLoading(false);
    }

    const [onLogin, setOnLogin] = useState(false)
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }

    return (
       <section className="login-page">
           <div className="login create-note" >  
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <div className="row">
                        <TextField label="Email" variant="filled" value={user.email} id="login-email"
                        name="email" required onChange={onChangeInput} fullWidth/>
                    </div>
                    <div className="row">
                        <TextField type="password" label="Password" variant="filled" value={user.password} id="login-password"
                        name="password" required onChange={onChangeInput} autoComplete="true" fullWidth/>
                    </div>
                    
                    <div className="login-button">
                        <Button variant="outlined" type="submit" size="large" sx={{ borderColor: 'black', color: 'black' }}>
                            {loading ? <HashLoader
                                        color="#33b69c"
                                        speedMultiplier={1}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />  : "Login"}
                        </Button>
                    </div>
                    <p className="login-button row">You don't have an account? &nbsp;
                        <span onClick={() => setOnLogin(true)}> Register Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
           </div>
           <div className="register create-note" style={style}>
           <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <div className="row">
                        <TextField label="Name" variant="filled" value={user.name} id="register-name"
                        name="name" required onChange={onChangeInput} fullWidth/>
                    </div>
                    <div className="row">
                        <TextField label="Email" variant="filled" value={user.email} id="register-email"
                        name="email" required onChange={onChangeInput} fullWidth/>
                    </div>
                    <div className="row">
                        <TextField type="password" label="Password" variant="filled" value={user.password} id="register-password"
                        name="password" required onChange={onChangeInput} autoComplete="true" fullWidth/>
                    </div>
                    <div className="login-button">
                        <Button variant="outlined" type="submit" size="large" sx={{ borderColor: 'black', color: 'black' }}>Register</Button>
                    </div>
                    <p className="login-button row">You have an account? &nbsp;
                        <span onClick={() => setOnLogin(false)}> Login Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
           </div>
       </section>
    )
}