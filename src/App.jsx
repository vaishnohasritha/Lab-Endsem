import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Fresh Apples", category: "Fruits", price: 120, stock: true, emoji: "🍎" },
  { id: 2, name: "Bananas", category: "Fruits", price: 50, stock: true, emoji: "🍌" },
  { id: 3, name: "Fresh Oranges", category: "Fruits", price: 80, stock: false, emoji: "🍊" },
  { id: 4, name: "Broccoli", category: "Vegetables", price: 60, stock: true, emoji: "🥦" },
  { id: 5, name: "Carrots", category: "Vegetables", price: 40, stock: true, emoji: "🥕" },
  { id: 6, name: "Tomatoes", category: "Vegetables", price: 35, stock: false, emoji: "🍅" },
  { id: 7, name: "Fresh Milk", category: "Dairy", price: 30, stock: true, emoji: "🥛" },
  { id: 8, name: "Cheese", category: "Dairy", price: 150, stock: true, emoji: "🧀" },
  { id: 9, name: "Butter", category: "Dairy", price: 55, stock: false, emoji: "🧈" },
  { id: 10, name: "Bread", category: "Bakery", price: 40, stock: true, emoji: "🍞" },
  { id: 11, name: "Croissant", category: "Bakery", price: 70, stock: true, emoji: "🥐" },
  { id: 12, name: "Potato Chips", category: "Snacks", price: 20, stock: true, emoji: "🍟" },
  { id: 13, name: "Chocolate", category: "Snacks", price: 45, stock: false, emoji: "🍫" },
  { id: 14, name: "Eggs", category: "Dairy", price: 75, stock: true, emoji: "🥚" },
  { id: 15, name: "Watermelon", category: "Fruits", price: 90, stock: true, emoji: "🍉" },
  { id: 16, name: "Onions", category: "Vegetables", price: 30, stock: true, emoji: "🧅" },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Snacks",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesFilter =
      filter === "All" ||
      (filter === "Available" && product.stock) ||
      (filter === "Unavailable" && !product.stock);

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const addToCart = (product) => {
    if (!product.stock) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          🥬 Fresh<span>Mart</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
        </div>

        <div className="cart">
          🛒 Cart <span>{totalItems}</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">FRESH • HEALTHY • NATURAL</p>

          <h1>
            Fresh Groceries,
            <br />
            <span>Delivered to You!</span>
          </h1>

          <p className="hero-description">
            Discover fresh fruits, vegetables and daily essentials
            at the best prices. Everything you need, all in one place.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now →
          </a>
        </div>

        <div className="hero-image">
          🛒
          <div className="floating-fruit">🍎 🥑 🍊</div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="stats">
        <div>
          <h2>{products.length}+</h2>
          <p>Total Products</p>
        </div>

        <div>
          <h2>{products.filter(p => p.stock).length}</h2>
          <p>Available Products</p>
        </div>

        <div>
          <h2>{products.filter(p => !p.stock).length}</h2>
          <p>Out of Stock</p>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section" id="categories">
        <h2>Shop by Category</h2>

        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "category active" : "category"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section" id="products">

        <div className="section-heading">
          <div>
            <p className="tagline">OUR COLLECTION</p>
            <h2>Explore Our Products</h2>
            <p>Find everything fresh for your everyday needs.</p>
          </div>

          <div className="product-count">
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="controls">

          <input
            type="text"
            placeholder="🔍 Search for groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Products</option>
            <option value="Available">Available Only</option>
            <option value="Unavailable">Out of Stock</option>
          </select>

        </div>

        {/* PRODUCT CARDS */}
        <div className="product-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <div className="product-card" key={product.id}>

                <div className="product-image">
                  <span>{product.emoji}</span>

                  <div
                    className={
                      product.stock
                        ? "stock-badge available"
                        : "stock-badge unavailable"
                    }
                  >
                    {product.stock ? "● In Stock" : "● Out of Stock"}
                  </div>
                </div>

                <div className="product-details">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">

                    <h3 className="price">
                      ₹{product.price}
                    </h3>

                    <button
                      className="add-btn"
                      disabled={!product.stock}
                      onClick={() => addToCart(product)}
                    >
                      {product.stock ? "Add +" : "Unavailable"}
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="no-products">
              <h2>😕 No Products Found</h2>
              <p>Try searching for another product.</p>
            </div>

          )}

        </div>
      </section>

      {/* CART SUMMARY */}
      <section className="cart-section">
        <h2>🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty. Start shopping!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.emoji} {item.name}</span>
                <span>
                  {item.quantity} × ₹{item.price}
                </span>
              </div>
            ))}

            <h3>Total Amount: ₹{totalPrice}</h3>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <h2>🥬 FreshMart</h2>
        <p>Freshness and quality in every purchase.</p>
        <p>© 2026 FreshMart. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;