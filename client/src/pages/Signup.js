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
  const [signupStatus, setSignupStatus] = useState('');

  const registerUser = (e) => {
    e.preventDefault();

    if(email_format.test(email) && user_format.test(usern) && pwd_format.test(pwd) && confirmPwd === pwd){
      Axios.post('https://bookquest.herokuapp.com/register', {
        email: email,
        usern: usern,
        pwd: pwd,
      }).then((response) => {
        if(response.data.message){
          setSignupStatus(response.data.message);
          document.getElementById("form-error").style.display = "block";
        } else {
          document.getElementById("form-error").style.display = "none";
          navigate("/login");;
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupStatus('Please try again in a while');
        document.getElementById("form-error").style.display = "block";
      });
    } else {
      setSignupStatus('Please fill in the form to register!');
      document.getElementById("form-error").style.display = "block";
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
      <img className='page-img' src={Reading} alt=""/>

      <form className='user-form'>
        <h1>Welcome to BookQuest</h1>
        <hr/>
        <h4 id='form-error'>{signupStatus}</h4>
        <label>Email <i id='email-error'>[Invalid]</i></label>
        <input type="text" name="email" placeholder='Enter your email' onChange={(e => setEmail(e.target.value))} /><br/>
        <label>Username <i id='username-error'>[3-15 characters]</i></label>
        <input type="text" name="username" placeholder='Enter a username' onChange={(e => setUsername(e.target.value))} /><br/>
        <label>Password <i id='pass-error'>[8-20 characters]</i></label>
        <input type="password" name="password" placeholder='Enter a password' onChange={(e => setPwd(e.target.value))} /><br/>
        <label>Confirm Password <i id='mpass-error'>[Must match]</i></label>
        <input type="password" name="password" placeholder='Confirm your password' onChange={(e => setConfirmPwd(e.target.value))} /><br/>
        <h5>Already have an account? <Link to='/login'>Login Here</Link></h5>
        <button type='button' onClick={(e) => {registerUser(e);}}>Register</button>
      </form>
    </div>
  )
}
