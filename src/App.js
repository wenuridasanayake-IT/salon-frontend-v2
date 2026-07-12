import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import BookingsPage from './pages/BookingsPage';
import WeddingPlanning from './pages/WeddingPlanning';
import StaffManagement from './pages/StaffManagement';
import StaffDashboard from './pages/StaffDashboard';
import UserDashboard from './pages/UserDashboard';
import CategoryProducts from './pages/CategoryProducts';
import PaymentPage from './pages/PaymentPage';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryName" element={<CategoryProducts cart={cart} setCart={setCart} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<BookingsPage />} />
        <Route path="/admin/weddings" element={<WeddingPlanning />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

