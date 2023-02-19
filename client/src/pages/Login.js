import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import './Styles/Form.css';

function Login() {

  const [usern, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const signIn = useSignIn();
  const navigate = useNavigate();
  
  const login = () => {
    if((usern != "" && usern != null) && (pwd != "" && pwd != null)){
      Axios.post('http://localhost:3001/login', {
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
          navigate("/mylog");
        } else {
          document.getElementById("form-error").style.color = "red";
          document.getElementById("form-error").innerHTML = response.data.message;
        }
      })
      .catch(err=>console.log(err));;
    } else {
      document.getElementById("form-error").style.color = "red";
      document.getElementById("form-error").innerHTML = 'Please enter your info to login!';
    }
  }

  return (
    <div className='form-page'>
      <form>
        <h1>Welcome Back!</h1>
        <h4 id='form-error'>Enter Info</h4>      
        <input type="text" name="username" onChange={(e => setUsername(e.target.value))} placeholder="Username" required /><br/><br/>
        <input type="password" name="password" onChange={(e => setPwd(e.target.value))} placeholder="Password" required /><br/>
        <h5>Don't have an account? <Link to='/signup'>Sign Up</Link></h5>
        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
  )
}

export default Login