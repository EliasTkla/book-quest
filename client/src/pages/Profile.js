import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import './Styles/Profile.css';

function Profile() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();  

  const user_format = /^[a-zA-Z0-9]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9]{8,20}$/;

  const [newUsername, setNewUsername] = useState();
  const [newPwd, setNewPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();

  const [focusUsername, setFocusUsername] = useState();
  const [focusPwd, setFocusPwd] = useState();
  const [matchPwd, setMatchPwd] = useState();
  
  const [updateStatus, setUpdateStatus] = useState(false);
  const [verifyPwd, setVerifyPwd] = useState();
  const email = authUser().email;

  useEffect(() => {
    if(isAuthenticated()){
      try {
        Axios.post('http://localhost:4000/userInfo', {
          email: email,
        }).then((response) => {
          if(response.data.message){
            document.getElementById("update-error").style.color = "red";
            document.getElementById("update-error").innerHTML = response.data.message;
          } else { 
            document.getElementById("email").value = response.data[0].email;
            document.getElementById("username").value = response.data[0].username;
            document.getElementById("password").value = response.data[0].password;
          }
        })
        .catch(err=>console.log(err));;
      } catch (error) {
        console.log(error);
      }   
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if ((!focusUsername || focusUsername) && newUsername!= "" && newUsername!= null && !user_format.test(newUsername)){
      document.getElementById("username-error").style.display = "inline";
    } else {
      document.getElementById("username-error").style.display = "none";
    }

    if ((!focusPwd || focusPwd) && newPwd !== "" && newPwd !== null && !pwd_format.test(newPwd)){
      document.getElementById("pass-error").style.display = "inline";
    } else {
      document.getElementById("pass-error").style.display = "none";
    } 

    if ((!matchPwd || matchPwd) && confirmPwd !== newPwd){
      document.getElementById("mpass-error").style.display = "inline";
    } else {
      document.getElementById("mpass-error").style.display = "none";
    } 
  });

  const updateUser = () => {
    if((newUsername != "" && newUsername != null && user_format.test(newUsername)) &&  (newPwd !== "" && newPwd !== null && pwd_format.test(newPwd) && confirmPwd === newPwd)){
      try {
        Axios.put('http://localhost:4000/updateUserInfo', {
          email: email,
          newUsername: newUsername,
          newPwd: newPwd,
        }).then((response) => {
          if(response.data.message){
            document.getElementById("update-error").style.color = "red";
            setUpdateStatus(response.data.message);
          } else {
            console.log(response.data.message1);
            cancelUpdate();
          }
        })
        .catch(err=>console.log(err));;
      } catch (error) {
        console.log(error);
      } 
    } else {
      document.getElementById("update-error").style.color = "red";
      setUpdateStatus('Please fill in the form to update profile!');
    }
  }

  const pwdCheck = () => {
    document.getElementById("v-overlay").style.display = "block";
  }
  
  const verifyUser = () => {
    Axios.post('http://localhost:4000/userInfo', {
      email: email,
    }).then((response) => {
      if(response.data.message){
        document.getElementById("verify-error").style.color = "red";
        document.getElementById("verify-error").innerHTML = response.data.message;
      } else { 
        if(response.data[0].password === verifyPwd){
          document.getElementById("verify-error").style.color = "#1A1A23";
          document.getElementById("v-overlay").style.display = "none";
          document.getElementById("v-password").value = "";
          enableInputs();
        } else {
          document.getElementById("verify-error").style.color = "red";
          document.getElementById("verify-error").innerHTML = "Incorrect password";
        }
      }
    })
    .catch(err=>console.log(err));;
  }

  const enableInputs = () => {
    document.getElementById("username").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("password-match").disabled = false;
    document.getElementById("confirm").style.display = "inline";
    document.getElementById("password-match").style.display = "inline";

    document.getElementById("submit").style.display = "inline";
    document.getElementById("cancel").style.display = "inline";
    document.getElementById("update").style.display = "none";
  }

  const cancelUpdate = () => {
    document.getElementById("update-error").style.color = "#1A1A23";
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("password-match").disabled = true;
    document.getElementById("confirm").style.display = "none";
    document.getElementById("password-match").style.display = "none";
    document.getElementById("password-match").value = "";

    document.getElementById("submit").style.display = "none";
    document.getElementById("cancel").style.display = "none";
    document.getElementById("update").style.display = "inline";
  }

  return (
    <div className='profile-form'>
      <img className='profile-icon' src={require('../assets/images/user-icon.png')} alt='profile-icon' /><br/>
      <h1>Profile Information</h1>
      <h4 id='update-error'>{updateStatus}</h4><br/>
      <div id="v-overlay">
        <div className="v-overlay-inner">
          <h4 id='verify-error'>Check</h4><br/>
          <h3>Enter password to verify user!</h3>
          <input id='v-password' type="password" name="password" onChange={(e => setVerifyPwd(e.target.value))}/><br/><br/>
          <button id='vsubmit' type='button' onClick={verifyUser}>verify</button>
        </div>
      </div>
      <form>
        <label>Email <span id='email-error'>[invalid email]</span></label><br/>
        <input id='email' type="text" name="email"  disabled/><br/>
        <label>Username <span id='username-error'>[3-15 characters]</span></label><br/>
        <input id='username' type="text" name="username" onFocus={() => {setFocusUsername(true)}} onBlur={() => {setFocusUsername(false)}} onChange={(e => setNewUsername(e.target.value))} disabled/><br/>
        <label>Password <span id='pass-error'>[8-20 characters]</span></label><br/>
        <input id='password' type="password" name="password" onFocus={() => {setFocusPwd(true)}} onBlur={() => {setFocusPwd(false)}} onChange={(e => setNewPwd(e.target.value))} disabled/><br/>
        <label id='confirm'>Confirm Password <span id='mpass-error'>[Must match]</span></label><br/>
        <input id='password-match' type="password" name="password-match" onFocus={() => {setMatchPwd(true)}} onBlur={() => {setMatchPwd(false)}} onChange={(e => setConfirmPwd(e.target.value))} disabled/><br/>
        <button id='update' type='button' onClick={pwdCheck}>Update</button>
        <button id='submit' type='button' onClick={updateUser}>Submit</button>&ensp;
        <button id='cancel' type='button' onClick={cancelUpdate}>Cancel</button>
      </form>
    </div>
  )
}

export default Profile