import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [msg, setMsg] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handlePay = () => {
    if(!cardNumber) return setMsg('❌ Enter Card Number');
    if(!cardName) return setMsg('❌ Enter Card Holder Name');
    
    setMsg('✅ Payment Successful! Order Placed.');

    setCart([]);
    localStorage.setItem('cart', JSON.stringify([])); // cart clear
    
    // 2s passe product category page ekata yawanna
    setTimeout(() => navigate('/products'), 2000); 
  }

  const boxStyle = {background:'white', padding:'30px', borderRadius:'10px', maxWidth:'500px', margin:'50px auto', boxShadow:'0 4px 8px rgba(0,0,0,0.1)'};
  const inputStyle = {width:'100%', padding:'10px', margin:'10px 0', border:'1px solid #ccc', borderRadius:'5px'};

  return (
    <div style={{background:'#f5f5f5', minHeight:'100vh', padding:'20px'}}>
      <div style={boxStyle}>
        <h2>💳 Payment Page</h2>
        
        <h4>Order Summary</h4>
        {cart.length === 0 ? <p>Cart is empty</p> : 
          cart.map((item, i) => (
            <p key={i}>{item.name} x {item.qty} = Rs.{item.price * item.qty}</p>
          ))
        }
        
        <h3>Total: Rs.{total}</h3>
        <hr/>
        
        <h4>Card Details</h4>
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} style={inputStyle}/>
        <input type="text" placeholder="Card Holder Name" value={cardName} onChange={e=>setCardName(e.target.value)} style={inputStyle}/>
        
        <button onClick={handlePay} style={{background:'purple', color:'white', padding:'10px 20px', border:'none', borderRadius:'5px', width:'100%', cursor:'pointer'}}>Pay Now</button>
        {msg && <p style={{marginTop:'10px', color: msg.includes('✅') ? 'green' : 'red'}}>{msg}</p>}
      </div>
    </div>
  );
}
export default PaymentPage;