import React, { useState } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as  Link, useHistory} from 'react-router-dom';

import { message } from 'antd';
import { loginAPI } from './API';




const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //console.log(email, password)

    const submitHandler = async(e) =>{
        e.preventDefault();

        const data = {
            "username": email,
            "password": password,
            
        }
            console.log(data)
        try{

            const res = await loginAPI(data)
            console.log(res.data)
            history.push('./postable')
            message.success("Successfully logged in.")
            sessionStorage.setItem("token", JSON.stringify(res.data.access))
        }
        catch(err){
            console.warn(err.message)
        }

        

    }
 
  return (
        <>
        <div className='container11 fluid'>
        <div className='login-head rounded '>
        <div className="sub">
        <div className="title">
        <h1 className='mt-5 text-center'>Login</h1>
        </div>
        <div className="login-form">
        <Form autoComplete='off'>
        <Form.Group className="mb-3" >
        <Form.Label className='input-field'>Email address</Form.Label>
        <Form.Control autoComplete='nope' className='input-field'  type="username" placeholder="Username" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label className='input-field' >Password</Form.Label>
        <Form.Control autoComplete='nope' className='input-field' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>                        
        <Button variant="primary" className='button-login' type="submit" onClick={submitHandler}>
        Login
        </Button>
        </Form>                   
        </div>
        </div> 
        </div>
        <div className="icon mt-5 d-flex justify-content-evenly">            
        </div>
        </div>
        </>
  )
}

export default Login