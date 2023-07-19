import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
import { signup, signin } from '../../actions/auth.js';

const Auth = () => {

    const [ isSignUp, setIsSignUP ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignUP((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // default behaviour of browser to refresh on submit in form; to avoid this use this 
        if (isSignUp) {
            dispatch(signup(formData, navigate));

        } else {
            dispatch(signin(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const createOrGetUser = async (response) => {
        const token = response.credential; 
        const result = jwtDecode(token);

        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }
    

    return (

        <div className='flex justify-center items-center'>
            <div className='bg-white flex flex-col items-center w-96 py-6 px-6 gap-2'>
                <FontAwesomeIcon className='border p-3 rounded-full bg-red-600' icon={faLock} style={{color: "white"}}/>

                <h3 className='font-semibold text-lg'>
                    { isSignUp ? "Sign Up" : "Sign In"}
                </h3>

                <form className='flex flex-col items-center gap-4 mt-6' onSubmit={handleSubmit}>

                    { isSignUp && (
                        <div className='flex gap-2'>
                            <Input name='firstName' value={formData.firstName} type='text' border={true} autofocus required handleChange={handleChange}/>
                            <Input name='lastName' value={formData.lastName} type='text' border={true} handleChange={handleChange}/>
                        </div>
                    )}

                    <Input name='email' value={formData.email} type='email' border={true} autofocus={!isSignUp} required handleChange={handleChange}/>
                    
                    <div className='w-full flex border'>
                        <Input name='password' value={formData.password} type={showPassword? 'text': 'password'} border={false} required handleChange={handleChange}/> 
                        <button className='pr-4' type='button' onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                            <FontAwesomeIcon className='' icon={showPassword? faEyeSlash: faEye} style={{color: "black"}}/>
                        </button>
                    </div>

                    { isSignUp && 
                    <div className='w-full flex border'>
                        <Input name='confirmPassword' value={formData.confirmPaChange} type='password' border={false} required handleChange={handleChange}/>
                        <button className='pr-4' type='button' onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                            <FontAwesomeIcon className='' icon={showPassword? faEyeSlash: faEye} style={{color: "black"}}/>
                        </button>
                    </div>
                    }

                    <button className='bg-blue-700 w-full rounded-sm px-1 py-2 text-white' type='submit'>{isSignUp ? "SIGN UP" : "SIGN IN"}</button>
                    <GoogleLogin 
                        onSuccess={(response) => createOrGetUser(response)}
                        onError={() => console.log('Google ')}
                        width='320px'
                    />
                    <button className='px-6' type='button' onClick={handleSwitch}>
                        {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "  DON'T HAVE AN ACCOUNT? SIGN UP  "}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default  Auth;
