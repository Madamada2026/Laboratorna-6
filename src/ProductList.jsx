import React from 'react';

function ProductList() {
  const products = [
    { id: 101, name: 'Ноутбук Lenovo IdeaPad', price: 25000, inStock: true },
    { id: 102, name: 'Бездротова миша Logitech', price: 800, inStock: true },
    { id: 103, name: 'Механічна клавіатура Keychron', price: 3500, inStock: false },
    { id: 104, name: 'Монітор Dell 27"', price: 12000, inStock: true },
    { id: 105, name: 'Навушники Sony WH-1000XM4', price: 11000, inStock: false }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Список товарів (Завдання 1)</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              color: product.inStock ? '#000000' : '#888888',
              backgroundColor: product.inStock ? '#ffffff' : '#f9f9f9'
            }}
          >
            <strong>{product.name}</strong> — {product.price} грн 
            <span>
              {product.inStock ? ' (В наявності)' : ' (Немає на складі)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
