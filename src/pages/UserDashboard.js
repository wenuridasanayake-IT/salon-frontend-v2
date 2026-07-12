import { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const user = JSON.parse(localStorage.getItem('user'));
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('card'); // Card or Cash

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchServices();
  }, []);

  const handleBooking = async () => {
    if(!serviceId ||!date ||!time) return setMsg('❌ Fill all fields');
    try {
      const res = await axios.post('http://localhost:5000/api/appointments', {
        user_id: user.id,
        service_id: serviceId,
        appointment_datetime: `${date} ${time}:00`
      });
      setMsg('✅' + res.data.message);
      setMsgType('success');
      setServiceId(''); setDate(''); setTime('');
    } catch(err) {
      setMsg(err.response?.data?.message || '❌ Booking Failed');
    }
  }

  const handlePayment = async () => {
    if(!appointmentId ||!amount) return setMsg('❌ Fill Appointment ID and Amount');
    try {
      const res = await axios.post('http://localhost:5000/api/payments', {
        appointment_id: appointmentId,
        user_id: user.id,
        amount,
        payment_type: paymentType,
        payment_method: paymentMethod
      });
      setMsg('✅' + res.data.message);
      setMsgType('success');
      setShowPayment(false); setAppointmentId(''); setAmount('');
    } catch(err) {
      setMsg(err.response?.data?.message || '❌ Payment Failed');
    }
  }

  const handleFeedback = async () => {
    if(!feedback) return setMsg('❌ Please write feedback'); // !feedback karanna
    try {
      const res = await axios.post('http://localhost:5000/api/feedback', { // route eka feedback/add
        user_id: user.id,
        appointment_id: appointmentId || null,
        rating,
        comment: feedback
      });
      
      setMsg('✅' + res.data.message);
      setMsgType('success');
      setFeedback(''); setRating(5);
    } catch(err) {
      setMsg(err.response?.data?.message || '❌ Feedback Failed');
    }
  }

  const boxStyle = {
    backgroundColor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    padding: '25px',
    borderRadius: '15px',
    border: '2px solid black',
    color: 'black',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    width: '320px',
    flex: '1',
    minWidth: '300px'
  }

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'black',
    textAlign: 'center',
    borderBottom: '2px solid black',
    paddingBottom: '8px'
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '2px solid black'
  }

  const btnStyle = {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  return (
    <div style={{
      backgroundImage: 'url(/images/userdashboard.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '30px 20px 100px 20px',
    }}>
      <h1 style={{textAlign:'center', color: 'black', fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textShadow: '2px 2px 4px white'}}>
        User Dashboard - Hi {user?.name}
      </h1>

      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1100px', margin: '0 auto'}}>
        
        {/* 1. BOOK APPOINTMENT */}
        <div style={boxStyle}>
          <h3 style={titleStyle}>✨ Book Your Appointment ✨</h3>
          <select value={serviceId} onChange={e => setServiceId(e.target.value)} style={inputStyle}>
            <option value="">Select Service</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.name} - Rs.{s.price}</option>)}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle}/>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={inputStyle}/>
          <button onClick={handleBooking} style={btnStyle}>Book Now</button>
        </div>

        {/* 2. MAKE PAYMENT */}
        <div style={boxStyle}>
          <h3 style={titleStyle}>💳 Make Payment</h3>
          <p>Pay for your appointments here</p>
          {showPayment ? (
            <>
              <input placeholder="Appointment ID" value={appointmentId} onChange={e=>setAppointmentId(e.target.value)} style={inputStyle}/>
              <input placeholder="Amount Rs." type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={inputStyle}/>
              
              <select value={paymentType} onChange={e=>setPaymentType(e.target.value)} style={inputStyle}>
                <option value="advance">Advance 30%</option>
                <option value="full">Full Payment</option>
              </select>

              {/* Card or Cash select */}
              <select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)} style={inputStyle}>
                <option value="card">💳 Card Payment - Pay Now</option>
                <option value="cash">💵 Cash Payment - Pay at Salon</option>
              </select>

              {paymentMethod === 'card' && (
                <div style={{background:'#f0f0f0', padding:'10px', borderRadius:'8px', marginBottom:'10px'}}>
                  <p style={{fontSize:'12px'}}>Card Details Form Here - Stripe/PayHere</p>
                </div>
              )}
              
              {paymentMethod === 'cash' && (
                <p style={{fontSize:'12px', color:'green'}}>You can pay at the salon after service</p>
              )}

              <button onClick={handlePayment} style={btnStyle}>Confirm Payment</button>
              <button onClick={()=>setShowPayment(false)} style={{...btnStyle, background:'gray', marginTop:'10px'}}>Cancel</button>
            </>
          ) : (
            <button onClick={()=>setShowPayment(true)} style={btnStyle}>Pay Now</button>
          )}
        </div>

        {/* 3. CUSTOMER FEEDBACK */}
        <div style={boxStyle}>
          <h3 style={titleStyle}>⭐ Customer Feedback</h3>
          <select value={rating} onChange={e => setRating(e.target.value)} style={inputStyle}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Bad</option>
          </select>
          <textarea placeholder="Write your feedback..." value={feedback} onChange={e => setFeedback(e.target.value)} style={{...inputStyle, height:'80px', resize:'none'}} />
          <button onClick={handleFeedback} style={btnStyle}>Submit Feedback</button>
        </div>

      </div>
      {msg && <p style={{textAlign:'center', fontWeight:'bold', backgroundColor:'rgba(255,255,255,0.9)', padding:'10px', borderRadius:'8px', marginTop:'20px', color: msgType === 'success' ? 'green' : 'red'}}>{msg}</p>}
    </div>
  );
} // FUNCTION CLOSE
export default UserDashboard;