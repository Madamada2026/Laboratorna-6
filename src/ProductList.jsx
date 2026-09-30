import React, { useState } from 'react';

function ProductList() {
  // Початковий список товарів у стані
  const [products, setProducts] = useState([
    { id: 1, name: 'Ноутбук Lenovo IdeaPad', price: 25000, inStock: true },
    { id: 2, name: 'Бездротова миша Logitech', price: 800, inStock: true },
    { id: 3, name: 'Механічна клавіатура Keychron', price: 3500, inStock: false },
    { id: 4, name: 'Монітор Dell 27"', price: 12000, inStock: true },
    { id: 5, name: 'Навушники Sony WH-1000XM4', price: 11000, inStock: false }
  ]);

  // Стан для форми додавання нового товару
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState('');

  // Стан для режиму редагування (inline editing)
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editInStock, setEditInStock] = useState(true);

  // Обробник додавання нового товару
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Будь ласка, введіть назву товару.');
      return;
    }

    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Будь ласка, введіть коректну ціну (додатне число).');
      return;
    }

    const newProduct = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      price: parsedPrice,
      inStock
    };

    setProducts((prev) => [...prev, newProduct]);
    setName('');
    setPrice('');
    setInStock(true);
    setError('');
  };

  // Обробник видалення товару
  const handleDeleteProduct = (id, productName) => {
    const isConfirmed = window.confirm(`Ви дійсно бажаєте видалити товар "${productName}"?`);
    if (isConfirmed) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  // Перехід у режим редагування товару
  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditInStock(product.inStock);
  };

  // Скасування редагування
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPrice('');
    setEditInStock(true);
  };

  // Збереження відредагованого товару
  const handleSaveEdit = (id) => {
    if (!editName.trim()) {
      alert('Назва товару не може бути порожньою.');
      return;
    }

    const parsedPrice = Number(editPrice);
    if (!editPrice || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Ціна повинна бути додатним числом.');
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              name: editName.trim(),
              price: parsedPrice,
              inStock: editInStock
            }
          : product
      )
    );

    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Список товарів (Завдання 4)</h2>

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

      {/* Список товарів */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => {
          const isEditing = editingId === product.id;

          return (
            <li
              key={product.id}
              style={{
                padding: '12px 16px',
                margin: '8px 0',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: isEditing ? '#eef6ff' : product.inStock ? '#ffffff' : '#f5f5f5'
              }}
            >
              {isEditing ? (
                /* Режим редагування (Inline Edit) */
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ flex: 2, padding: '6px' }}
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={{ flex: 1, padding: '6px', width: '80px' }}
                  />
                  <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="checkbox"
                      checked={editInStock}
                      onChange={(e) => setEditInStock(e.target.checked)}
                    />
                    В наявності
                  </label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleSaveEdit(product.id)}
                      style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                    >
                      Зберегти
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
              ) : (
                /* Звичайний режим перегляду */
                <>
                  <div style={{ fontWeight: product.inStock ? 'bold' : 'normal', color: product.inStock ? '#000000' : '#a0a0a0' }}>
                    {product.name} — {product.price} грн 
                    <span>
                      {product.inStock ? ' (В наявності)' : ' (Немає на складі)'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleStartEdit(product)}
                      style={{
                        backgroundColor: '#ffc107',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;
