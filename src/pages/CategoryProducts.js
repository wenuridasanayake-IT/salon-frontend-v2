import { productList } from './Products';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryProducts = ({ cart = [], setCart }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // URL එකේ %20 වගේ දේවල් හරියට ගන්න + lowercase කරනවා
  const decodedCategory = decodeURIComponent(categoryName).replace(/-/g, ' ').trim().toLowerCase();
  
  const filteredProducts = productList.filter(p => 
    p.category.toLowerCase().trim() === decodedCategory
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem){
      setCart(cart.map(item =>
        item.id === product.id ? {...item, qty: item.qty + 1} : item
      ));
      alert('${product.name} qty updated in cart!');
    }else{
      setCart([...cart, {...product, qty:1}]);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.length === 0) return alert("Cart is empty!");
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/payment');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      
      {/* Back button */}
      <button 
        onClick={() => navigate('/products')}
        style={{ marginBottom: '20px', padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
      >
        ← Back to Categories
      </button>

      {/* Category title */}
      <h2 style={{ textTransform: 'capitalize', fontSize: '32px', marginBottom: '20px' }}>{decodedCategory} Products</h2>

      {/* Cart button - Category page එකේ විතරක් */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={handleCheckout}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'purple',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🛒 Cart ({cart ? cart.length : 0})
        </button>
      </div>

      {/* Products grid */}
      {filteredProducts.length === 0 ? (
        <p style={{ marginTop: '30px', fontSize: '18px', textAlign: 'center' }}>
          No products found in "{decodedCategory}"
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              
              {/* Image wrapper - outline fix */}
              <div style={{ 
                width: '100%', 
                height: '200px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                marginBottom: '10px'
              }}>
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              
              {/* Product details */}
              <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50', margin: '10px 0' }}>Rs. {product.price}</p>
              
              <ul style={{ textAlign: 'left', fontSize: '14px', paddingLeft: '20px', minHeight: '80px' }}>
                {product.advantages.map((adv, i) => <li key={i} style={{ marginBottom: '5px' }}>{adv}</li>)}
              </ul>
              
              {/* Add to Cart button */}
              <button 
                onClick={() => addToCart(product)}
                style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '10px', fontWeight: 'bold' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;