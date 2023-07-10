// import React from 'react'

// const SignIn = () => {

//   const handleSignin = () => {

//   }

//   return (
//     <div>
//       <form method='get' action=''>
//         <input className='hno' type='text' placeholder='Username'></input>
//         <input className='locality' type='password' placeholder='Password'></input>
//         <button type='submit'>Sign In</button>
//       </form>
//     </div>
//   )
// }

// export default SignIn


import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { SignInContext } from '../../context/SignInContext';
import { TokenContext } from '../../context/TokenContext';


const SignIn = () => {
  const { user, setUser } = useContext(SignInContext);
  const { token, setToken } = useContext(TokenContext);

  console.log("🚀 ~ file: SignIn.js:34 ~ SignIn ~ token:", token);



  console.log("🚀 ~ file: SignIn.js:32 ~ SignIn ~ user:", user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    // Post the data to the server using Axios
    axios.post('/api/user/signin', { email, password })
      .then((response) => {

        // console.log("🚀 ~ file: SignIn.js:43 ~ .then ~ response:", response.data);
        setUser(response.data.user);
        setToken(response.data.token);

        // Handle successful sign-in
        console.log('Sign-in successful');
        // Cookie.set('AuthToken', response.data.token, { expires: 365 }) 
        // TODO autologin feature

      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Error signing in:', error);
      });
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
