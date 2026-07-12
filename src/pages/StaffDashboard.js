import { useState, useEffect } from 'react';
import axios from 'axios';

function StaffDashboard() {
  const staff = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Staff ge okkoma appointment tika
      const res = await axios.get(`http://localhost:5000/api/appointments/staff/${staff.id}`);
      setAppointments(res.data);

      // Aje appointment tika
      const today = new Date().toISOString().split('T')[0];
      const todayData = res.data.filter(a => a.appointment_datetime.split('T')[0] === today);
      setTodayAppointments(todayData);

    } catch(err) {
      console.log(err)
    }
  }

  const handleLeave = async () => {
    if(!leaveDate ||!reason) return setMsg('❌ Fill all fields');
    try {
      const res = await axios.post('http://localhost:5000/api/staff/leave', {
        staff_id: staff.id,
        leave_date: leaveDate,
        reason
      });
      setMsg(res.data.message);
      setLeaveDate(''); setReason('');
    } catch(err) {
      setMsg('❌ Leave Apply Failed');
    }
  }

  const boxStyle = {background:'rgba(255,255,255,0.9)', padding:'20px', borderRadius:'15px', marginBottom:'20px', border:'1px solid #ddd'};

  return (
    <div style={{
      backgroundImage: 'url(/images/staffdashboard.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '30px'
    }}>
      <h1 style={{textAlign:'center', color:'white', textShadow:'2px 2px 4px black'}}>Staff Dashboard - Hi {staff?.name}</h1>

      {/* 1. Today's Routine */}
      <div style={boxStyle}>
        <h3>📅 Today's Routine</h3>
        {todayAppointments.length === 0? <p>No appointments today</p> : 
          todayAppointments.map(a => (
            <p key={a.id}>{a.appointment_datetime} - {a.customer_name} - {a.service_name}</p>
          ))
        }
      </div>

      {/* 2. All My Appointments */}
      <div style={boxStyle}>
        <h3>📋 All My Appointments</h3>
        <table style={{width:'100%'}}>
          <thead>
            <tr style={{background:'#eee'}}>
              <th>Date</th><th>Time</th><th>Customer</th><th>Service</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0? 
              <tr><td colSpan="5" style={{textAlign:'center'}}>No appointments</td></tr> :
              appointments.map(a => (
                <tr key={a.id}>
                  <td>{a.appointment_datetime.split('T')[0]}</td>
                  <td>{a.appointment_datetime.split('T')[1]}</td>
                  <td>{a.customer_name}</td>
                  <td>{a.service_name}</td>
                  <td>{a.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* 3. Apply for Leave */}
      <div style={boxStyle}>
        <h3>✈️ Apply for Leave</h3>
        <input type="date" value={leaveDate} onChange={e=>setLeaveDate(e.target.value)} />
        <input placeholder="Reason" value={reason} onChange={e=>setReason(e.target.value)} />
        <button onClick={handleLeave} style={{background:'purple', color:'white', padding:'8px 15px', border:'none', borderRadius:'5px'}}>Apply</button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
export default StaffDashboard;