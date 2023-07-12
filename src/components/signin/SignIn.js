import React, { useContext, useState } from 'react';
import './signIn.css'
import axios from 'axios';
import Cookie from 'js-cookie';
import { SignInContext } from '../../context/SignInContext';
import { TokenContext } from '../../context/TokenContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Alert, Button, Slide, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(SignInContext);
  const { token, setToken } = useContext(TokenContext);

  console.log("🚀 ~ file: SignIn.js:34 ~ SignIn ~ token:", token);
  console.log("🚀 ~ file: SignIn.js:32 ~ SignIn ~ user:", user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setEmailError(!validateEmail(emailValue));
  };


  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setPasswordError(!validatePassword(passwordValue));
  };

  const validateEmail = (email) => {
    // Use a regular expression or any other validation logic
    return email.includes('@');
  };

  const validatePassword = (password) => {
    // Use any password validation logic here
    return password.length >= 6;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleSignIn = () => {
    axios.post('/api/user/signin', { email, password })
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);

        console.log('Sign-in successful');
        // Cookie.set('AuthToken', response.data.token, { expires: 365 }) 
        // TODO autologin feature

        setSnackbarSeverity('success');
        setSnackbarMessage('Sign-in successful');
        setOpenSnackbar(true);
        setTimeout(() => {
          props.onClick();
        }, 2000);
        navigate("/home");

      })
      .catch((error) => {

        console.error('Error signing in:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error signing in');
        setOpenSnackbar(true);

      });
  };



  return (


    <div className='signin-container'>
      <div className='signin'>
        <div className='signin-left'>
          <div className='signin-left-title'>

            Sign in

          </div>
          <div className='signin-left-inputs'>
            <div className='signin-left-label'>
              Enter details
            </div>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder='Email Address'
              className={emailError ? 'invalid' : ''}
            />



            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Password'
              className={passwordError ? 'invalid' : ''}

            />

          </div>
          <div className='signin-left-button'>
            <button onClick={props.onClick}>
              Cancel

            </button>
            <button onClick={handleSignIn}>
              Sign In
              <ArrowForwardIosIcon />
            </button>

          </div>
        </div>
        <div className='signin-right'>
          <div className='signin-right-image'>
            <img src="https://source.unsplash.com/featured/?house-Interior&sig=1" alt='' />
            {/* dfgdf */}
          </div>
        </div>

      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </div >
  );
};

export default SignIn;
