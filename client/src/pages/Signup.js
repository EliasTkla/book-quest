import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Styles/Form.css';

function Signup() {

  const email_format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const user_format = /^[a-zA-Z0-9]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9]{8,20}$/;

  const [email, setEmail] = useState();
  const [usern, setUsername] = useState();
  const [pwd, setPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();

  const [focusEmail, setFocusEmail] = useState();
  const [focusUsern, setFocusUsern] = useState();
  const [focusPwd, setFocusPwd] = useState();
  const [matchPwd, setMatchPwd] = useState();
  const [signupStatus, setSignupStatus] = useState("Begin your log!");

  const signUser = () => {
    if((email != "" && email != null && email_format.test(email)) && (usern != "" && usern != null && user_format.test(usern)) && (pwd != "" && pwd != null && pwd_format.test(pwd) && confirmPwd === pwd)){
      Axios.post('http://localhost:3001/register', {
        email: email,
        usern: usern,
        pwd: pwd,
      }).then((response) => {
        if(response.data.message){
          document.getElementById("form-error").style.color = "red";
          setSignupStatus(response.data.message);
        } else {
          console.log(response.data.message);
          window.location.href = "/login";
        }
      })
      .catch(err=>console.log(err));;
    } else {
      document.getElementById("form-error").style.color = "red";
      setSignupStatus('Please fill in the form to register!');
    }
  }

  useEffect(() => {
    if ((!focusEmail || focusEmail) && email != "" && email != null && !email_format.test(email)){
      document.getElementById("email-error").style.color = "red";
    } else {
      document.getElementById("email-error").style.color = "#1a1a23";
    }

    if ((!focusUsern || focusUsern) && usern !== "" && usern !== null && !user_format.test(usern)){
      document.getElementById("username-error").style.color = "red";
    } else {
      document.getElementById("username-error").style.color = "#1a1a23";
    } 

    if ((!focusPwd || focusPwd) && pwd !== "" && pwd !== null && !pwd_format.test(pwd)){
      document.getElementById("pass-error").style.color = "red";
    } else {
      document.getElementById("pass-error").style.color = "#1a1a23";
    } 

    if ((!matchPwd || matchPwd) && confirmPwd !== pwd){
      document.getElementById("mpass-error").style.color = "red";
    } else {
      document.getElementById("mpass-error").style.color = "#1a1a23";
    } 
  });

  return (
    <div className='form-page'>
      <form>
        <h1>Welcome to BookQuest</h1>
        <h4 id='form-error'>{signupStatus}</h4>
        <label id='email-error'>Invalid email</label>
        <input type="text" name="email" placeholder='Enter your email' onFocus={() => {setFocusEmail(true)}} onBlur={() => {setFocusEmail(false)}} onChange={(e => setEmail(e.target.value))} /><br/>
        <label id='username-error'>3-15 characters!</label>
        <input type="text" name="username" placeholder='Enter a username' onFocus={() => {setFocusUsern(true)}} onBlur={() => {setFocusUsern(false)}} onChange={(e => setUsername(e.target.value))} /><br/>
        <label id='pass-error'>8-20 characters!</label>
        <input type="password" name="password" placeholder='Enter a password' onFocus={() => {setFocusPwd(true)}} onBlur={() => {setFocusPwd(false)}} onChange={(e => setPwd(e.target.value))} /><br/>
        <label id='mpass-error'>Must match inputted password!</label>
        <input type="password" name="password" placeholder='Confirm your password' onFocus={() => {setMatchPwd(true)}} onBlur={() => {setMatchPwd(false)}} onChange={(e => setConfirmPwd(e.target.value))} /><br/>
        <h5>Already have an account? <Link to='/login'>Login Here</Link></h5>
        <button type='button' onClick={signUser}>Register</button>
      </form>
    </div>
  )
}

export default Signup
