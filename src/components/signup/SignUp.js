import React from 'react'

const SignUp = () => {
  return (
    <div>
      <form method='get' action="">
              <input className='name' type='text' placeholder='name'></input>
              <input className='uname' type='text' placeholder='Username'></input>
              <input className='pass' type='password' placeholder='Password'></input>
              <input className='age' type='number' placeholder='Age'></input>
              <input className='phnumber' type='number' placeholder='Ph Number'></input>
              <input className='email' type='email' placeholder='Email'></input>

              <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;
