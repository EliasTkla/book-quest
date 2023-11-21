import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import './Styles/authForm.css';
import Loading from '../components/Loading';

export default function Login() {

    // Regular expressions for email and password formats
    const email_format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const password_format = /^[a-zA-Z0-9._%+-]{8,20}$/;

    const navigate = useNavigate();
    const { logIn } = useUserAuth();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = async (e) => {
        e.preventDefault();

        // Checking if all input is valid
        if (email_format.test(email) && password_format.test(password)) {
            setLoading(true);
            try {
                await logIn(email, password);
                navigate("/mylog");
            } catch (error) {
                // console.log(error);
                setLoading(false);
                setErrorMessage("Invalid email or password!");
            }
        } else {
            // Displaying error message for incomplete or invalid form
            setErrorMessage("Please properly fill in the form to login!");
        }
    }

    const redirect = () => {
        navigate("/");
    }

    return (
        <div className='form-container'>
            <button className='close-button' onClick={redirect}></button>

            <div className='login-image-wrapper'></div>

            <div className='form-wrapper'>
                {loading ?
                    <Loading />
                    :
                    <>
                        <h1>Login</h1>

                        <form onSubmit={login}>
                            {errorMessage !== "" ? <h4 id='form-error'>{errorMessage}</h4> : ""}

                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" onChange={(e => setEmail(e.target.value))} placeholder="Enter email" autoComplete='on' />

                            <label htmlFor={"password"}>Password</label>
                            <input type="password" id="password" name="password" onChange={(e => setPassword(e.target.value))} placeholder="Enter password" />

                            <button type="submit" label="submit">LOGIN</button>

                            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}
