import React, { useState } from 'react';

function ProductList() {
  // Початковий список товарів у стані (useState)
  const [products, setProducts] = useState([
    { id: 1, name: 'Ноутбук Lenovo IdeaPad', price: 25000, inStock: true },
    { id: 2, name: 'Бездротова миша Logitech', price: 800, inStock: true },
    { id: 3, name: 'Механічна клавіатура Keychron', price: 3500, inStock: false },
    { id: 4, name: 'Монітор Dell 27"', price: 12000, inStock: true },
    { id: 5, name: 'Навушники Sony WH-1000XM4', price: 11000, inStock: false }
  ]);

  // Стан для полів форми
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);

  // Стан для відображення помилки валідації
  const [error, setError] = useState('');

  // Обробник відправки форми
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Валідація: назва не порожня
    if (!name.trim()) {
      setError('Будь ласка, введіть назву товару.');
      return;
    }

    // Валідація: ціна є додатним числом
    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Будь ласка, введіть коректну ціну (додатне число).');
      return;
    }

    // Генерація унікального ID (Date.now() + Math.random())
    const newId = `${Date.now()}-${Math.random()}`;

    // Новий об'єкт товару
    const newProduct = {
      id: newId,
      name: name.trim(),
      price: parsedPrice,
      inStock: inStock
    };

    // Додавання до кінця списку незмінним способом через оператор розширення (...)
    setProducts([...products, newProduct]);

    // Очищення форми та помилок
    setName('');
    setPrice('');
    setInStock(true);
    setError('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Список товарів (Завдання 2)</h2>

      {/* Форма додавання нового товару */}
      <form 
        onSubmit={handleAddProduct} 
        style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px', 
          border: '1px solid #ddd',
          marginBottom: '20px'
        }}
      >
        <h3 style={{ marginTop: 0, textAlign: 'center' }}>Додати новий товар</h3>

        {error && (
          <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>
        )}

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Назва товару:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наприклад: Веб-камера"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Ціна (грн):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Наприклад: 1500"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="inStock"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label htmlFor="inStock">В наявності на складі</label>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Додати товар
        </button>
      </form>

      {/* Відображення списку товарів */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              padding: '12px 16px',
              margin: '8px 0',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              textAlign: 'center',
              fontWeight: product.inStock ? 'bold' : 'normal',
              color: product.inStock ? '#000000' : '#a0a0a0',
              backgroundColor: product.inStock ? '#ffffff' : '#f5f5f5'
            }}
          >
            {product.name} — {product.price} грн 
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
