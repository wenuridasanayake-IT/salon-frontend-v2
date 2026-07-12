import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/home-bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      <h1 style={{fontSize: '48px', marginBottom: '10px'}}>Welcome to Salon Appointment Booking System</h1>
      <p style={{fontSize: '18px', marginBottom: '30px'}}>Book your appointment easily</p>

      {/* Buttons */}
      <div style={{display: 'flex', gap: '20px'}}>
        
        <button 
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>

        <button 
          onClick={() => navigate('/register')}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Home;




