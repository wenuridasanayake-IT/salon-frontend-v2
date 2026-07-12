import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    webkitBackdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '15px',
    width: '280px',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    transition: '0.3s'
  };

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      backgroundImage: 'url(/images/admindashboard.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 'bold', marginBottom: '40px' }}>
          Admin Dashboard
        </h1>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          {/* Bookings Card */}
          <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onClick={() => navigate('/admin/bookings')}>
            <h2>📅 Bookings</h2>
            <p>Approval & Reject</p>
          </div>

           {/* Wedding Planning Card */}
         <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onClick={() => navigate('/admin/weddings')}>
             <h2>💍 Wedding Planning</h2>
             <p>Manage Weddings & Packages</p>
         </div>

          {/* Staff Management Card */}
          <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onClick={() => navigate('/admin/staff')}>
            <h2>👨‍💼 Staff Management</h2>
            <p>Salary & Leave</p>
          </div>

        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;