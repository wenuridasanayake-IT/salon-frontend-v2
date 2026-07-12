import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('customer');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;
    if (!phoneNumber.trim()) newErrors.phoneNumber = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please enter all details');
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone: phoneNumber })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration Successful! Please Login.');
        setTimeout(() => navigate("/login", { state: { email, password } }), 1500);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Server Error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/login-bg.jpg')",
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
          alt="Register"
          style={{ width: '150px', borderRadius: '10px', marginBottom: '20px' }}
        />
        
        <h2>Registration</h2>

        <form onSubmit={handleRegister} autoComplete="off">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%', border: errors.name ? '2px solid red' : '1px solid #ccc' }}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%', border: errors.email ? '2px solid red' : '1px solid #ccc' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%', border: errors.password ? '2px solid red' : '1px solid #ccc' }}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="off"
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%', border: errors.phoneNumber ? '2px solid red' : '1px solid #ccc' }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '96%', borderRadius: '5px' }}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{ padding: '10px 30px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;




