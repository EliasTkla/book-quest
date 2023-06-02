import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Reading from '../assets/images/reading.svg';
import './Styles/Form.css';

export default function Signup() {

  const email_format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const user_format = /^[a-zA-Z0-9._-]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9._%+-]{8,20}$/;

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [usern, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();
  const [signupStatus, setSignupStatus] = useState("Begin your log!");

  const signUser = (e) => {
    e.preventDefault();

    if(email_format.test(email) && user_format.test(usern) && pwd_format.test(pwd) && confirmPwd === pwd){
      Axios.post('https://bookquest.herokuapp.com/register', {
        email: email,
        usern: usern,
        pwd: pwd,
      }).then((response) => {
        if(response.data.message){
          document.getElementById("form-error").style.color = "red";
          setSignupStatus(response.data.message);
        } else {
          console.log(response.data.message);
          navigate("/login");;
        }
      })
      .catch(err=>console.log(err));;
    } else {
      document.getElementById("form-error").style.color = "red";
      setSignupStatus('Please fill in the form to register!');
    }
  }

  useEffect(() => {
    if (email !== undefined && email !== "" && !email_format.test(email)){
      document.getElementById("email-error").style.display = "inline";
    } else {
      document.getElementById("email-error").style.display = "none";
    }

    if (usern !== undefined && usern !== "" && !user_format.test(usern)){
      document.getElementById("username-error").style.display = "inline";
    } else {
      document.getElementById("username-error").style.display = "none";
    } 

    if (pwd !== undefined && pwd !== "" && !pwd_format.test(pwd)){
      document.getElementById("pass-error").style.display = "inline";
    } else {
      document.getElementById("pass-error").style.display = "none";
    } 

    if (confirmPwd !== undefined && confirmPwd !== "" && pwd_format.test(pwd) && confirmPwd !== pwd){
      document.getElementById("mpass-error").style.display = "inline";
    } else {
      document.getElementById("mpass-error").style.display = "none";
    } 
  });

  return (
    <div className='form-page'>
      <img src={Reading} alt=""/>
      <form>
        <h1>Welcome to BookQuest</h1>
        <hr/>
        <h4 id='form-error'>{signupStatus}</h4>
        <label>Email <span id='email-error'>[Invalid]</span></label>
        <input type="text" name="email" placeholder='Enter your email' onChange={(e => setEmail(e.target.value))} /><br/>
        <label>Username <span id='username-error'>[3-15 characters]</span></label>
        <input type="text" name="username" placeholder='Enter a username' onChange={(e => setUsername(e.target.value))} /><br/>
        <label>Password <span id='pass-error'>[8-20 characters]</span></label>
        <input type="password" name="password" placeholder='Enter a password' onChange={(e => setPwd(e.target.value))} /><br/>
        <label>Confirm Password <span id='mpass-error'>[Must match]</span></label>
        <input type="password" name="password" placeholder='Confirm your password' onChange={(e => setConfirmPwd(e.target.value))} /><br/>
        <h5>Already have an account? <Link to='/login'>Login Here</Link></h5>
        <button type='button' onClick={(e) => {signUser(e);}}>Register</button>
      </form>
    </div>
  )
}
