import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const productList = [
  {
    id: 1,
    name: "Herbal Hair Oil",
    price: 2500,
    image: "/images/hair-oil.jpg",
    category: "Natural Products",
    advantages: ["Stops hair fall", "Makes hair shiny", "100% Natural"]
  },
  {
    id: 2,
    name: "Face Glow Cream",
    price: 1950,
    image: "/images/face-cream.jpg",
    category: "Cosmetics",
    advantages: ["Removes dark spots", "Makes skin glow", "Suitable for all skin types"]
  },
  {
    id: 3,
    name: "Aromatherapy Oil",
    price: 2200,
    image: "/images/aroma-oil.jpg",
    category: "Natural Products",
    advantages: ["Relieves stress", "Better sleep", "Natural fragrance"]
  },
  {
    id: 4,
    name: "Hair Scissors Pro",
    price: 3500,
    image: "/images/hairscissorpro.jpg",
    category: "Tools and Equipments",
    advantages: ["Professional grade", "Stainless steel", "Sharp cutting"]
  },
  {
    id: 5,
    name: "Facial Steamer",
    price: 8900,
    image: "/images/facialsteamer.jpg", // steamer.jpg නැත්තම් tools.jpg use කරන්න
    category: "Tools and Equipments",
    advantages: ["Deep cleansing", "Easy to use", "Adjustable steam"]
  },
  {
    id: 6,
    name: "Matte Lipstick",
    price: 1200,
    image: "/images/lipstick.jpg",
    category: "Cosmetics",
    advantages: ["Long lasting 12 hours", "Smooth matte finish", "Available in 5 colours"]
  }
];

const Products = ({ cart = [] , setCart }) => {
  const navigate = useNavigate();

  // Category cards + image ටික මෙතන define කරනවා
  const categories = [
    { name: "Natural Products", image: "/images/naturalproducts.jpg" },
    { name: "Cosmetics", image: "/images/cosmetics.jpg" },
    { name: "Tools and Equipments", image: "/images/toolsandequipment.jpg" } // <-- මේක වැදගත්
  ];

  const handleViewAll = (category) => {
    navigate(`/products/${encodeURIComponent(category)}`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Load to the Payment Page.");
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('/images/products.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '40px 20px'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '40px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        marginBottom: '30px'
      }}>
        Shop by Category
      </h2>

      {/* Categories grid */}
      <div style={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              width: '320px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}
          >
            {/* Category Image */}
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
            
            <h3 style={{ margin: '15px 0 5px 0' }}>{cat.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
              {productList.filter(p => p.category === cat.name).length} Products Available
            </p>
            
            <button
              onClick={() => handleViewAll(cat.name)}
              style={{
                marginTop: '10px',
                padding: '12px 25px',
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              View All
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;


