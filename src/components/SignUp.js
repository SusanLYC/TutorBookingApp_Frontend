import React, { useState } from 'react';
import '../style/SignUp.css'; 
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '',
                                             password: '', role: 'STUDENT' });
  const negavite = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refreshing the page
    // Handle form submission logic
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert('Sign up successfully!');
    negavite('/signin');
  } else {
    alert('Sign up failed!');
  }
} catch (error) {
  console.error('Sign up failed:', error);
}
};

  return (
    <Layout showClassBody={true}>
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="STUDENT">Student</option>
            <option value="TUTOR">Tutor</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </Layout>
  );
};

export default SignUp;
