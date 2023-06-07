import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import User from '../assets/images/user.svg';
import Error from '../assets/images/bug.svg';
import './Styles/Form.css';

export default function Profile() {

  const authUser = useAuthUser();
  const [error, setError] = useState(false);

  const user_format = /^[a-zA-Z0-9]{3,15}$/;
  const pwd_format = /^[a-zA-Z0-9]{8,20}$/;

  const [newUsername, setNewUsername] = useState();
  const [newPwd, setNewPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();

  const [focusUsername, setFocusUsername] = useState();
  const [focusPwd, setFocusPwd] = useState();
  const [matchPwd, setMatchPwd] = useState();
  
  const [updateStatus, setUpdateStatus] = useState('_');
  const [verifyPwd, setVerifyPwd] = useState();
  const [verified, setVerified] = useState(true);
  const email = authUser().email;

  useEffect(() => {
    Axios.post('https://bookquest.herokuapp.com/userInfo', {
      email: email,
      verifyPwd: undefined,
    }).then((response) => {
      if(response.data.message){
        document.getElementById("form-error").style.color = "red";
        document.getElementById("form-error").innerHTML = response.data.message;
      } else { 
        document.getElementById("email").value = response.data[0].email;
        document.getElementById("username").value = response.data[0].username;
        document.getElementById("password").value = response.data[0].password;
      }
    })
    .catch(err=> {
      console.log(err);
      setError(true);
    }); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!error){
      if ((!focusUsername || focusUsername) && newUsername !== "" && newUsername !== null && !user_format.test(newUsername)){
        document.getElementById('username-error').style.color = "red";
      } else {
        document.getElementById('username-error').style.color = "transparent";
      }

      if ((!focusPwd || focusPwd) && newPwd !== "" && newPwd !== null && !pwd_format.test(newPwd)){
        document.getElementById('pass-error').style.color = "red";
      } else {
        document.getElementById('pass-error').style.color = "transparent";
      } 

      if(verified){
        if (pwd_format.test(newPwd) && ((matchPwd || !matchPwd) && matchPwd !== "" && matchPwd !== null && confirmPwd !== newPwd)){
          document.getElementById('mpass-error').style.color = "red";
        } else{
          document.getElementById('mpass-error').style.color = "transparent";
        }
      }
    }
  });

  const updateUser = () => {
    if(user_format.test(newUsername) && pwd_format.test(newPwd) && confirmPwd === newPwd){
      try {
        Axios.put('https://bookquest.herokuapp.com/updateUserInfo', {
          email: email,
          newUsername: newUsername,
          newPwd: newPwd,
        }).then((response) => {
          if(response.data.message){
            document.getElementById('form-error').style.color = "red";
            setUpdateStatus(response.data.message);
          } else {
            document.getElementById('form-error').innerHTML = "Successfully updated!";
            cancelUpdate();
          }
        })
        .catch(err=> {
          console.log(err);
          setError(true);
        });
      } catch (error) {
        console.log(error);
        setError(true);
      } 
    } else {
      document.getElementById('form-error').style.color = "red";
      setUpdateStatus('Please fill in the form to update profile!');
    }
  }

  const pwdCheck = () => {
    document.getElementById('v-overlay').style.display = "block";
  }
  
  const verifyUser = () => {
    Axios.post('https://bookquest.herokuapp.com/userInfo', {
      email: email,
      verifyPwd: verifyPwd,
    }).then((response) => {
      if(response.data.message1){
        cancelVerify();
        setVerified(true);
        enableInputs();
      } else {
        document.getElementById('verify-error').style.color = "red";
        document.getElementById('verify-error').innerHTML = response.data.message2;
      }
    })
    .catch(err=> {
      console.log(err);
      setError(true);
    });
  }

  const cancelVerify = () => {
    document.getElementById('verify-error').style.color = "transparent";
    document.getElementById('v-overlay').style.display = "none";
    document.getElementById('v-password').value = "";
  }

  const enableInputs = () => {
    document.getElementById('username').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('username').style.backgroundColor = "#F1EEE3";
    document.getElementById('password').style.backgroundColor = "#F1EEE3";
  }

  const cancelUpdate = () => {
    document.getElementById('form-error').style.color = "#FDFCF7";
    document.getElementById('form-error').innerHTML = "_";
    document.getElementById('username').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('username').style.backgroundColor = "#ecebeb";
    document.getElementById('password').style.backgroundColor = "#ecebeb";
    document.getElementById('password-match').value = "";
    setVerified(false);
  }

  return (
    <div className='form-page'>
      { !error ?
          <>
            <div id="v-overlay">
              <div className="v-overlay-inner">
                <i className="fa-solid fa-xmark" onClick={()=> {cancelVerify()}}></i>
                <h4 id='verify-error'>Incorrect password</h4>
                <h4>Enter User Password to Proceed!</h4>
                <input id='v-password' type="password" name="password" onChange={(e => setVerifyPwd(e.target.value))}/><br/><br/>
                <button type='button' onClick={verifyUser}>Verify</button>
              </div>
            </div>

            <form className='profile-form'>
              <img className='profile-icon' src={User} alt='profile-icon' /><br/>
              <h1>Profile Information</h1>
              <hr/>
              <h4 id='form-error'>{updateStatus}</h4>
              <input id='email' type="text" name="email"  disabled/><br/>
              <label id='username-error'>3-15 characters!</label>
              <input id='username' type="text" name="username" defaultValue={"empty"} onFocus={() => {setFocusUsername(true)}} onBlur={() => {setFocusUsername(false)}} onChange={(e => setNewUsername(e.target.value))} disabled/><br/>
              <label id='pass-error'>8-20 characters!</label>
              <input id='password' type="password" name="password" defaultValue={"empty"} onFocus={() => {setFocusPwd(true)}} onBlur={() => {setFocusPwd(false)}} onChange={(e => setNewPwd(e.target.value))} disabled/><br/>
              
              {!verified ? 
                <button className='update-btn' type='button' onClick={pwdCheck}>Update</button>
              :<>
                <label id='mpass-error'>Must match password above!</label>
                <input id='password-match' type="password" name="password-match" onFocus={() => {setMatchPwd(true)}} onBlur={() => {setMatchPwd(false)}} onChange={(e => setConfirmPwd(e.target.value))} /><br/>
                <div className='update-buttons'>
                  <button type='button' onClick={updateUser}>Submit</button>
                  <button type='button' onClick={cancelUpdate}>Cancel</button>
                </div>
                </>
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