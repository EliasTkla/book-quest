import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import './Styles/Login.css';

function Login() {

  const [usern, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const signIn = useSignIn();
  const navigate = useNavigate();
  
  const login = () => {
    if((usern != "" && usern != null) && (pwd != "" && pwd != null)){
      Axios.post('http://localhost:4000/login', {
        usern: usern,
        pwd: pwd,
      }).then((response) => {
        if(!response.data.message){
          console.log("Error in server");
          signIn({
            token: response.data.token,
            expiresIn: 300,
            tokenType: "Bearer",
            authState: { email: response.data.email, username: response.data.username},
          });
          navigate("/mylog");
        } else {
          document.getElementById("login-error").style.color = "red";
          document.getElementById("login-error").innerHTML = response.data.message;
        }
      })
      .catch(err=>console.log(err));;
    } else {
      document.getElementById("login-error").style.color = "red";
      document.getElementById("login-error").innerHTML = 'Please enter your info to login!';
    }
  }

  return (
    <div className='login-page'>
    <div className='login-form'>
      <h1>Welcome Back!</h1>
      <h4 id='login-error'></h4><br/>
      <form>
        <label>Username</label><br/>
        <input type="text" name="username" onChange={(e => setUsername(e.target.value))} required /><br/>
        <label>Password</label><br/>
        <input type="password" name="password" onChange={(e => setPwd(e.target.value))} required /><br/>
        <h5>Don't have an account? <Link to='/signup'>Sign Up Here</Link></h5>
        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login