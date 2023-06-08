import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit';
// import { useNavigate } from 'react-router-dom';
import User from '../assets/images/user.svg';
import Error from '../assets/images/bug.svg';
import './Styles/Form.css';

export default function Profile() {

  const authUser = useAuthUser();
  const signOut = useSignOut();
  // const navigate = useNavigate();
  const [error, setError] = useState(false);

  const user_format = /^[a-zA-Z0-9]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9]{8,20}$/;

  const [modifyUsername, setModifyUsername] = useState();
  const [currentPwd, setCurrentPwd] = useState();
  const [newPwd, setNewPwd] = useState();

  const [focusUsername, setFocusUsername] = useState();
  const [focusPwd, setFocusPwd] = useState();
  const [focusNewPwd, setFocusNewPwd] = useState();
  
  const [updateStatus, setUpdateStatus] = useState('');
  const [formEdit, setFormEdit] = useState(false);
  const email = authUser().email;
  const username = authUser().username;

  useEffect(() => {
    document.getElementById('form-error').style.display = "none";
    document.getElementById("email").value = email;
    document.getElementById("username").value = username;
  }, [email, username]);

  useEffect(() => {
    if(!error){
      if ((!focusUsername || focusUsername) && modifyUsername !== "" && modifyUsername !== null && !user_format.test(modifyUsername)){
        document.getElementById('username-error').style.display = "inline-block";
      } else {
        document.getElementById('username-error').style.display = "none";
      }

      if ((!focusPwd || focusPwd) && currentPwd !== "" && currentPwd !== null && !pwd_format.test(currentPwd)){
        document.getElementById('pass-error').style.display = "inline-block";
      } else {
        document.getElementById('pass-error').style.display = "none";
      } 

      if(formEdit){
        if (pwd_format.test(currentPwd) && ((focusNewPwd || !focusNewPwd) && newPwd !== "" && newPwd !== null && !pwd_format.test(newPwd))){
          document.getElementById('npass-error').style.display = "inline-block";
        } else{
          document.getElementById('npass-error').style.display = "none";
        }
      }
    }
  });

  const updateUser = () => {
    if(user_format.test(modifyUsername) && pwd_format.test(currentPwd) && pwd_format.test(newPwd)){
      Axios.put('https://bookquest.herokuapp.com/updateUserInfo', {
        email: email,
        username: username, 
        modifyUsername: modifyUsername,
        newPwd: newPwd,
      }).then((response) => {
        if(response.data.message){
          document.getElementById('form-error').style.display = "block";

          setUpdateStatus(response.data.message);
        } else if(response.data.message1){
          document.getElementById('form-error').style.display = "block";
          document.getElementById('form-error').style.color = "black";

          setUpdateStatus(response.data.message1);

          setTimeout(signOut(), 3000);
          // navigate("/login");
        } else if(response.data.message2){
          document.getElementById('form-error').style.display = "block";
          document.getElementById('form-error').style.color = "black";

          setUpdateStatus(response.data.message2);

          setTimeout(signOut(), 3000);
          // navigate("/login");
        }
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });
    } else {
      setUpdateStatus('Please fill in the form to update profile!');
      document.getElementById('form-error').style.display = "block";
    }
  }

  const enableInputs = () => {
    var modifyUsername = document.getElementById('username');
    var currentPassword = document.getElementById('password');
    var usernameLabel = document.getElementById('username-label');
    var passwordLabel = document.getElementById('password-label');

    usernameLabel.innerHTML = "New ";
    passwordLabel.innerHTML = "Current ";

    modifyUsername.disabled = false;
    currentPassword.disabled = false;

    modifyUsername.style.backgroundColor = "#F1EEE3";
    currentPassword.style.backgroundColor = "#F1EEE3";    
  }

  const cancelUpdate = () => {
    var formError = document.getElementById('form-error');
    var modifyUsername = document.getElementById('username');
    var currentPassword = document.getElementById('password');
    var newPassword = document.getElementById('new-password');
    var usernameLabel = document.getElementById('username-label');
    var passwordLabel = document.getElementById('password-label');

    usernameLabel.innerHTML = "";
    passwordLabel.innerHTML = "";

    formError.style.color = "#FDFCF7";
    formError.style.display = "none";

    modifyUsername.disabled = true;
    currentPassword.disabled = true;

    modifyUsername.style.backgroundColor = "#ecebeb";
    currentPassword.style.backgroundColor = "#ecebeb";

    modifyUsername.value = username;
    currentPassword.value = "password";
    newPassword.value = "";
  }

  return (
    <div className='form-page'>
      { !error ?
          <>
            <form className='profile-form'>
              <img className='profile-icon' src={User} alt='profile-icon' /><br/>
              <h1>Profile Information</h1>
              <hr/>

              <h4 id='form-error'>{updateStatus}</h4>

              <label>Email</label>
              <input id='email' type="text" name="email"  disabled/><br/>

              <label><span id='username-label'></span>Username <i id='username-error'>[3-15 characters]</i></label>
              <input id='username' type="text" name="username" defaultValue={"empty"} onFocus={() => {setFocusUsername(true)}} onBlur={() => {setFocusUsername(false)}} onChange={(e => setModifyUsername(e.target.value))} disabled/><br/>
              
              <label><span id='password-label'></span>Password <i id='pass-error'>[8-20 characters]</i></label>
              <input id='password' type="password" name="password" defaultValue={"password"} onFocus={() => {setFocusPwd(true)}} onBlur={() => {setFocusPwd(false)}} onChange={(e => setCurrentPwd(e.target.value))} disabled/><br/>
              
              {formEdit ?
                  <>
                    <label>New Password <i id='npass-error'>[8-20 characters]</i></label>
                    <input id='new-password' type="password" name="new-password" onFocus={() => {setFocusNewPwd(true)}} onBlur={() => {setFocusNewPwd(false)}} onChange={(e => setNewPwd(e.target.value))} /><br/>
                    
                    <div className='update-buttons'>
                      <button type='button' onClick={() => {updateUser()}}>Submit</button>
                      <button type='button' onClick={() => {setFormEdit(false); cancelUpdate();}}>Cancel</button>
                    </div>
                  </>
                :
                  <button className='update-btn' type='button' onClick={() => {setFormEdit(true); enableInputs();}}>Update</button>
              }
            </form>
          </>
          :
          <span className='error-container'>
            <h2>Something went wrong, please refresh the page</h2>
            <img src={Error} alt='error'/>
          </span>
      }
    </div>
  )
}