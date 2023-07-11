import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
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
    } catch (error) {
      // Handle error response here, e.g., show error message
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullname" value={fullname} onChange={handleChange} />
      </label>
      <br />

      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <br />

      <label>
        Re-enter Password:
        <input type="password" name="rePassword" value={rePassword} onChange={handleChange} />
      </label>
      <br />

      <label>
        Email:
        <input type="email" name="email" value={email} onChange={handleChange} />
      </label>
      <br />

      <label>
        Date of Birth:
        <input type="date" name="dob" value={dob} onChange={handleChange} />
      </label>
      <br />

      <label>
        Phone:
        <input type="tel" name="phone" value={phone} onChange={handleChange} />
      </label>
      <br />

      <label>
        Image:
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
