import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import User from '../assets/images/user.svg';
// import './Styles/Form.css';
import Error from '../components/ErrorMessage';

export default function Profile() {

    const [error, setError] = useState(false);

    const user_format = /^[a-zA-Z0-9]{3,15}$/;
    const pwd_format = /^[a-zA-Z0-9]{8,20}$/;

    const [updateStatus, setUpdateStatus] = useState('');
    const [formEdit, setFormEdit] = useState(false);
    const email = authUser().email;
    const username = authUser().username;

    useEffect(() => {
        document.getElementById("email").value = email;
        document.getElementById("username").value = username;

        document.getElementById('form-error').style.display = "none";
        document.getElementById('username-error').style.display = "none";
        document.getElementById('pass-error').style.display = "none";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verifyInputs = (e) => {
        e.preventDefault();

        var usernameError = document.getElementById('username-error');
        var currentPwdError = document.getElementById('pass-error');
        var newPwdError = document.getElementById('npass-error');
        var modifyUsername = document.getElementById('username');
        var currentPassword = document.getElementById('password');
        var newPassword = document.getElementById('new-password');

        var count = 0;

        if (modifyUsername.value !== "" && modifyUsername.value !== null && !user_format.test(modifyUsername.value)) {
            usernameError.style.display = "inline-block";
        } else {
            usernameError.style.display = "none";
            count++;
        }

        if (currentPassword.value !== "" && currentPassword.value !== null && !pwd_format.test(currentPassword.value)) {
            currentPwdError.style.display = "inline-block";
        } else {
            currentPwdError.style.display = "none";
            count++;
        }

        if (newPassword.value !== "" && newPassword.value !== null && !pwd_format.test(newPassword.value)) {
            newPwdError.style.display = "inline-block";
        } else {
            newPwdError.style.display = "none";
            count++;
        }

        if (count === 3) {
            console.log(modifyUsername.value, currentPassword.value, newPassword.value);
            updateUser(modifyUsername.value, currentPassword.value, newPassword.value);
        }
    }

    const updateUser = (modifyUsername, currentPwd, newPwd) => {
        Axios.put('https://bookquest.herokuapp.com/updateUserInfo', {
            email: email,
            username: username,
            modifyUsername: modifyUsername,
            currentPwd: currentPwd,
            newPwd: newPwd,
        }).then((response) => {
            if (response.data.message) {
                document.getElementById('form-error').style.display = "block";
                document.getElementById('form-error').style.color = "black";

                setUpdateStatus(response.data.message);

            } else if (response.data.message1) {
                document.getElementById('form-error').style.display = "block";

                setUpdateStatus(response.data.message1);
            }
        })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    }

    const enableInputs = (e) => {
        e.preventDefault();

        var modifyUsername = document.getElementById('username');
        var currentPassword = document.getElementById('password');
        var usernameLabel = document.getElementById('username-label');
        var passwordLabel = document.getElementById('password-label');

        usernameLabel.innerHTML = "New ";
        passwordLabel.innerHTML = "Current ";
        currentPassword.value = "0";

        modifyUsername.disabled = false;
        currentPassword.disabled = false;

        modifyUsername.style.backgroundColor = "#F1EEE3";
        currentPassword.style.backgroundColor = "#F1EEE3";
    }

    const cancelUpdate = (e) => {
        e.preventDefault();

        var formError = document.getElementById('form-error');
        var usernameError = document.getElementById('username-error');
        var currentPwdError = document.getElementById('pass-error');
        var newPwdError = document.getElementById('npass-error');

        var modifyUsername = document.getElementById('username');
        var currentPassword = document.getElementById('password');
        var newPassword = document.getElementById('new-password');
        var usernameLabel = document.getElementById('username-label');
        var passwordLabel = document.getElementById('password-label');

        usernameLabel.innerHTML = "";
        passwordLabel.innerHTML = "";

        formError.style.color = "red";
        formError.style.display = "none";
        usernameError.style.display = "none";
        currentPwdError.style.display = "none";
        newPwdError.style.display = "none";

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
            {!error ?
                <>
                    <form className='profile-form'>
                        <img className='profile-icon' src={User} alt='profile-icon' /><br />
                        <h1>Profile Information</h1>
                        <hr />

                        <h4 id='form-error'>{updateStatus}</h4>

                        <label>Email</label>
                        <input id='email' type="text" name="email" disabled /><br />

                        <label><span id='username-label'></span>Username <i id='username-error'>[3-15 characters]</i></label>
                        <input id='username' type="text" name="username" defaultValue={username} disabled /><br />

                        <label><span id='password-label'></span>Password <i id='pass-error'>[8-20 characters]</i></label>
                        <input id='password' type="password" name="password" defaultValue={"password"} disabled /><br />

                        {formEdit ?
                            <>
                                <label>New Password <i id='npass-error'>[8-20 characters]</i></label>
                                <input id='new-password' type="password" name="new-password" defaultValue={"0"} /><br />

                                <div className='update-buttons'>
                                    <button type='button' onClick={(e) => { verifyInputs(e) }}>Submit</button>
                                    <button type='button' onClick={(e) => { setFormEdit(false); cancelUpdate(e); }}>Cancel</button>
                                </div>
                            </>
                            :
                            <button className='update-btn' type='button' onClick={(e) => { setFormEdit(true); enableInputs(e); }}>Update</button>
                        }
                    </form>
                </>
                :
                <Error />
            }
        </div>
    )
}