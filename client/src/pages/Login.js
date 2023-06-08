import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import Reading from '../assets/images/reading-2.svg';
import './Styles/Form.css';

export default function Login() {

  const user_format = /^[a-zA-Z0-9._-]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9._%+-]{8,20}$/;

  const [usern, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');
  
  const login = (e) => {
    e.preventDefault();

    if(user_format.test(usern) && pwd_format.test(pwd)){
      Axios.post('https://bookquest.herokuapp.com/login', {
        usern: usern,
        pwd: pwd,
      }).then((response) => {
        if(!response.data.message){
          signIn({
            token: response.data.token,
            expiresIn: 300,
            tokenType: "Bearer",
            authState: { email: response.data.email, username: response.data.username},
          });
          
          document.getElementById("form-error").style.display = "none";

          navigate("/mylog");
        } else {
          setLoginStatus(response.data.message);
          document.getElementById("form-error").style.display = "block";
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus('Please try again in a while');
        document.getElementById("form-error").style.display = "block";
      });
    } else {
      setLoginStatus("Please enter your info to login!");
      document.getElementById("form-error").style.display = "block";
    }
  }

  return (
    <div className='form-page'>
      <img className='page-img' src={Reading} alt='women reading book outside'/>

      <form className='user-form'>
        <h1>Welcome Back!</h1>
        <hr/>
        <h4 id='form-error'>{loginStatus}</h4>      
        <label>Username</label>
        <input type="text" name="username" onChange={(e => setUsername(e.target.value))} placeholder="Enter username" required /><br/><br/>
        <label>Password</label>
        <input type="password" name="password" onChange={(e => setPwd(e.target.value))} placeholder="Enter password" required /><br/>
        <h5>Don't have an account? <Link to='/signup'>Sign Up</Link></h5>
        <button type="button" onClick={(e) => {login(e);}}>Login</button>
      </form>
    </div>
  )
}
