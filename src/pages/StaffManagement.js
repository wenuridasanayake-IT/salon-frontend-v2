import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

function StaffManagement() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const componentRef = useRef();

  // DB EKEN DATA GANAWA
  useEffect(() => {
    fetch('http://localhost:5000/api/users?role=staff')
      .then(res => res.json())
      .then(data => setStaff(data));

    fetch('http://localhost:5000/api/leaves')
      .then(res => res.json())
      .then(data => setLeaves(data));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // DB UPDATE WENAWAA - IMPORTANT
  const updateLeave = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/leaves/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if(res.ok){
      // Frontend ekeuth update karanna
      setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
      alert(`Leave ${status}`);
    }
  };

  const salaryData = staff.map(s => ({
    ...s,
    basic: 25000, // Oya DB eke nathi nisa dummy
    ot: 2000,
    netSalary: 25000 + 2000 - (25000 * 0.08) - (25000 * 0.03),
    epf: 25000 * 0.08,
    etf: 25000 * 0.03,
  }));

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate('/admin-dashboard')} style={{padding: '8px 15px', background: 'purple', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold'}}>
        Back to Admin Dashboard
      </button>

      <h1>Staff Management</h1>

      {/* Salary Section */}
      <div style={{ marginBottom: '50px' }}>
        <h2>Salary Generate</h2>
        <button onClick={handlePrint} style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}>
          Print Salary PDF
        </button>

        <div ref={componentRef}>
          <h3>Salary Report</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th>Name</th><th>Role</th><th>Basic</th><th>OT</th><th>EPF</th><th>ETF</th><th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map(s => (
                <tr key={s.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>Rs. {s.basic}</td>
                  <td>Rs. {s.ot}</td>
                  <td>Rs. {s.epf.toFixed(2)}</td>
                  <td>Rs. {s.etf.toFixed(2)}</td>
                  <td><b>Rs. {s.netSalary.toFixed(2)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Section */}
      <div>
        <h2>Leave Approval</h2>
        {leaves.map(l => (
          <div key={l.id} style={{ border: '1px solid #ddd', padding: '15px', marginTop: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4>{l.user_name || l.staff}</h4>
              <p>Date: {l.leave_date || l.date} | Reason: {l.reason} | Status: <b>{l.status}</b></p>
            </div>
            {l.status === "pending" && (
              <div>
                <button onClick={() => updateLeave(l.id, "approved")} style={{ marginRight: '10px', padding: '8px 15px', background: 'green', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Approve
                </button>
                <button onClick={() => updateLeave(l.id, "rejected")} style={{ padding: '8px 15px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default StaffManagement;