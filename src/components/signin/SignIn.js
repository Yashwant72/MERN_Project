import React from 'react'

const SignIn = () => {
  return (
    <div>
      <form method='get' action=''>
        <input className='hno' type='text' placeholder='Username'></input>
        <input className='locality' type='password' placeholder='Password'></input>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
