import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import Loading from '../components/Loading';
import './Styles/authForm.css';

export default function Signup() {

    // Regular expressions for email and password formats
    const email_format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const password_format = /^[a-zA-Z0-9._%+-]{8,20}$/;

    const navigate = useNavigate();
    const { signUp } = useUserAuth();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const registerUser = async () => {
        setLoading(true);
        try {
            await signUp(email, password);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage("The email is already in use!");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let checks = 0;

        // Validating email format
        if (!email_format.test(email)) {
            document.getElementById("email-error").style.display = "inline";
        } else {
            document.getElementById("email-error").style.display = "none";
            checks++;
        }

        // Validating password format
        if (!password_format.test(password)) {
            document.getElementById("pass-error").style.display = "inline";
        } else {
            document.getElementById("pass-error").style.display = "none";
            checks++;
        }

        // Validating password confirmation and match
        if (!password_format.test(passwordConfirmation) || passwordConfirmation !== password) {
            document.getElementById("confirm-error").style.display = "inline";
        } else {
            document.getElementById("confirm-error").style.display = "none";
            checks++;
        }

        // Checking if all validation checks passed, then calling registerUser function
        if (checks === 3) {
            registerUser();
        } else {
            // Displaying error message for incomplete or invalid form
            setErrorMessage('Please properly fill in the form to register!');
        }
    };

    const redirect = () => {
        navigate("/");
    }

    return (
        <div className='form-container'>
            <button className='close-button' onClick={redirect}></button>

            <div className='signup-image-wrapper'></div>

            <div className='form-wrapper'>
                {loading ?
                    <Loading />
                    :
                    <>
                        <h1>Sign Up</h1>

                        <form onSubmit={handleSubmit}>
                            {errorMessage !== "" ? <h4 id='form-error'>{errorMessage}</h4> : ""}

                            <label htmlFor='email'>Email <span id='email-error'>| Invalid</span></label>
                            <input type="text" id="email" name="email" placeholder='Enter email' onChange={(e => setEmail(e.target.value))} autoComplete='on' />

                            <label htmlFor='password'>Password <span id='pass-error'>| 8-20 characters</span></label>
                            <input type="password" id="password" name="password" placeholder='Enter password' onChange={(e => setPassword(e.target.value))} />

                            <label htmlFor="password-confirmation">Confirm Password <span id='confirm-error'>| Must match</span></label>
                            <input type="password" id="password-confirmation" name="password-confirmation" placeholder='Confirm password' onChange={(e => setPasswordConfirmation(e.target.value))} />

                            <button type='submit'>Register</button>

                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}
