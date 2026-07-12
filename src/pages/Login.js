import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please enter the details');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Invalid Login');
        return;
      }

      alert('Login Successful');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        const role = data.user?.role?.toLowerCase().trim();
        if (role === 'admin') navigate('/admin-dashboard');
        else if (role === 'staff') navigate('/staff-dashboard');
        else navigate('/user-dashboard');
      }, 1000);

    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/login-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '350px'
      }}>
        <img
          src="/images/login-bg.jpg"
          alt="Login"
          style={{ width: '150px', borderRadius: '10px', marginBottom: '20px' }}
        />

        <h2>Login</h2>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            style={{
              display: 'block',
              margin: '10px auto',
              padding: '10px',
              width: '90%',
              border: errors.email ? '2px solid red' : '1px solid #ccc'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={{
              display: 'block',
              margin: '10px auto',
              padding: '10px',
              width: '90%',
              border: errors.password ? '2px solid red' : '1px solid #ccc'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '10px 30px',
              background: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;




