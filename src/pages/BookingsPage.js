import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/appointments/admin/all') // URL wenas
   .then(res => setBookings(res.data))
   .catch(err => console.log(err));
  }

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/appointments/admin/${id}/status`, {status}) // URL wenas
  .then(() => {
      alert(`Booking ${status}!`);
      fetchBookings(); // aye data ganna
    });
  };

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate('/admin-dashboard')} style={{padding:'8px 15px', background:'purple', color:'#fff', border:'none', borderRadius:'5px', marginBottom:'20px'}}>← Back to Admin Dashboard</button>
      <h1>Bookings Management</h1>

      {bookings.length === 0? <p>No Bookings Found</p> : bookings.map(b => (
        <div key={b.id} style={{ border: '1px solid #ddd', padding: '15px', marginTop: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <h4>{b.customer_name}</h4>
            <p>Service: {b.service_name} | Date: {new Date(b.appointment_datetime).toLocaleString()}</p>
            <p>Status: <b style={{color: b.status === 'approved'? 'green' : b.status === 'rejected'? 'red' : 'orange'}}>{b.status}</b></p>
          </div>
          {b.status === "pending" && (
            <div>
              <button onClick={() => updateStatus(b.id, "Approved")} style={{marginRight:'10px', padding:'8px 15px', background:'green', color:'#fff', border:'none'}}>Approve</button>
              <button onClick={() => updateStatus(b.id, "Rejected")} style={{padding:'8px 15px', background:'red', color:'#fff', border:'none'}}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default BookingsPage;