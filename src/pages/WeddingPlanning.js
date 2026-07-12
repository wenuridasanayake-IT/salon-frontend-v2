import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WeddingPlanning() {
  const navigate = useNavigate();

  // 1. State eka empty array ekakin patan ganna
  const [weddings, setWeddings] = useState([]);

  // 2. Page load wenakota localStorage eken data ganna
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('weddings'));
    
    // localStorage eke mokuth nathnam dummy data danna
    if (!saved || saved.length === 0) {
      const defaultData = [
        { id: 1, couple: "Keshan & Nadushi", date: "2026-12-15", package: "Premium", status: "Pending" },
        { id: 2, couple: "Pramod & Ahasna", date: "2027-01-20", package: "Basic", status: "Approved" },
      ];
      setWeddings(defaultData);
    } else {
      setWeddings(saved);
    }
  }, []);

  // 3. Weddings wenas unama localStorage eke save karanna
  useEffect(() => {
    localStorage.setItem('weddings', JSON.stringify(weddings));
  }, [weddings]);

  const updateStatus = (id, status) => {
    setWeddings(weddings.map(w => w.id === id? {...w, status } : w));
  };

  return (
    <div style={{ padding: '40px' }}>
      <button 
        onClick={() => navigate('/admin-dashboard')}
        style={{ padding: '8px 15px', background: 'purple', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
        ← Back to Admin Dashboard
      </button>

      <h1>💍 Wedding Planning</h1>

      {weddings.map(w => (
        <div key={w.id} style={{ border: '1px solid #ddd', padding: '15px', marginTop: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4>{w.couple}</h4>
            <p>Date: {w.date} | Package: {w.package} | Status: <b style={{color: w.status==='Approved'?'green': w.status==='Rejected'?'red':'orange'}}>{w.status}</b></p>
          </div>
          {w.status === "Pending" && (
            <div>
              <button onClick={() => updateStatus(w.id, "Approved")}
                style={{ marginRight: '10px', padding: '8px 15px', background: 'green', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Approve
              </button>
              <button onClick={() => updateStatus(w.id, "Rejected")}
                style={{ padding: '8px 15px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default WeddingPlanning;