import React, { useState } from 'react';
import './signup.css'
import axios from 'axios';
import { Alert, Slide, Snackbar } from '@mui/material';

const SignUp = (props) => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setImage(e.target.files[0]);
    }
    else if (name === 'fullname') {
      setFullname(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'rePassword') {
      setRePassword(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'dob') {
      setDob(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      console.log("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post('/api/user/signup', {
        // image,
        fullName: fullname,
        email,
        password,
        phone,
        birthDate: dob
      });

      // Handle successful signup response here, e.g., show success message
      console.log(response.data);
      setSnackbarSeverity('success');
      setSnackbarMessage('Sign-Up successful');
      setOpenSnackbar(true);
      setTimeout(() => {
        props.onClick();
      }, 2000);

    } catch (error) {
      // Handle error response here, e.g., show error message
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error signing upin');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className='signup-container'>
      <div className='signup'>
        <div className='signup-left'>
          <form onSubmit={handleSubmit}>
            <div className='signup-left-title'>

              Sign Up

            </div>


            <div className='signup-left-inputs'>
              <div className='signup-left-label'>
                Enter details
              </div>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleChange}
                placeholder='Full Name'
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder='Password'


              />

              <input
                type="password"
                name="rePassword"
                value={rePassword}
                onChange={handleChange}
                placeholder='Re-Password'

              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder='Email'

              />

              <input
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                placeholder='Date of Birth'

              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder='Phone'

              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                placeholder='Image'
              />

            </div>
            <div className='signup-left-button'>
              <button onClick={props.onClick}>
                Cancel
              </button>
              <button type="submit">Sign Up</button>

            </div>
          </form>
        </div>
        <div className='signup-right'>
          <div className='signup-right-image'>
            <img src="https://source.unsplash.com/featured/?house-Interior&sig=1" alt='' />

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

    </div>

    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Full Name:
    //     <input type="text" name="fullname" value={fullname} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Password:
    //     <input type="password" name="password" value={password} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Re-enter Password:
    //     <input type="password" name="rePassword" value={rePassword} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Email:
    //     <input type="email" name="email" value={email} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Date of Birth:
    //     <input type="date" name="dob" value={dob} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Phone:
    //     <input type="tel" name="phone" value={phone} onChange={handleChange} />
    //   </label>
    //   <br />

    //   <label>
    //     Image:
    //     <input type="file" name="image" accept="image/*" onChange={handleChange} />
    //   </label>
    //   <br />

    //   <button onClick={props.onClick}>
    //     Cancel
    //   </button>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
};

export default SignUp;
