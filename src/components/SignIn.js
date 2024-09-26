import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import '../style/SignIn.css'; 
import Layout from './Layout';


const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = btoa(`${formData.email}:${formData.password}`);
    const headers = {
      Authorization: `Basic ${credentials}`,
    };
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the backend responds with a token field
        login(token); // Save token and update authentication status
        localStorage.setItem('userProfile', JSON.stringify(data.user)); // Optional: Store user profile if needed
        setError('');
        navigate('/user-profile');
      } else {
        console.log(response);
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <Layout showClassBody={true}>
      <div className="sign-in">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
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
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </Layout>
  );
};

export default SignIn;
