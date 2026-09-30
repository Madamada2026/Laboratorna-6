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

  // Стан для inline-редагування
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editInStock, setEditInStock] = useState(true);

  // Стан для фільтрації та сортування (Завдання 5)
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'inStock', 'outOfStock'
  const [sortOption, setSortOption] = useState('default'); // 'default', 'name-asc', 'name-desc', 'price-asc', 'price-desc'

  // Додавання нового товару
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

  // Видалення товару
  const handleDeleteProduct = (id, productName) => {
    const isConfirmed = window.confirm(`Ви дійсно бажаєте видалити товар "${productName}"?`);
    if (isConfirmed) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  // Редагування товару
  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditInStock(product.inStock);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id) => {
    if (!editName.trim() || Number(editPrice) <= 0) {
      alert('Будь ласка, введіть коректні дані.');
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              name: editName.trim(),
              price: Number(editPrice),
              inStock: editInStock
            }
          : product
      )
    );

    setEditingId(null);
  };

  // 1. Фільтрація списку товарів (створення проміжного масиву)
  const filteredProducts = products.filter((product) => {
    if (filterStatus === 'inStock') return product.inStock;
    if (filterStatus === 'outOfStock') return !product.inStock;
    return true; // 'all'
  });

  // 2. Сортування на копії масиву (spread operator для запобігання мутації стану)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0; // 'default'
  });

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Список товарів (Завдання 5)</h2>

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

      {/* Елементи управління для Фільтрації та Сортування */}
      <div 
        style={{ 
          backgroundColor: '#e9ecef', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label htmlFor="filterStatus" style={{ fontWeight: 'bold' }}>Фільтр за наявністю:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="all">Всі товари</option>
            <option value="inStock">Тільки в наявності</option>
            <option value="outOfStock">Тільки відсутні</option>
          </select>
        </div>

        <div>
          <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Сортування:</span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSortOption('name-asc')}
              style={{ padding: '6px 10px', backgroundColor: sortOption === 'name-asc' ? '#007bff' : '#fff', color: sortOption === 'name-asc' ? '#fff' : '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Назва А-Я
            </button>
            <button
              onClick={() => setSortOption('name-desc')}
              style={{ padding: '6px 10px', backgroundColor: sortOption === 'name-desc' ? '#007bff' : '#fff', color: sortOption === 'name-desc' ? '#fff' : '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Назва Я-А
            </button>
            <button
              onClick={() => setSortOption('price-asc')}
              style={{ padding: '6px 10px', backgroundColor: sortOption === 'price-asc' ? '#007bff' : '#fff', color: sortOption === 'price-asc' ? '#fff' : '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Ціна: від дешевих
            </button>
            <button
              onClick={() => setSortOption('price-desc')}
              style={{ padding: '6px 10px', backgroundColor: sortOption === 'price-desc' ? '#007bff' : '#fff', color: sortOption === 'price-desc' ? '#fff' : '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Ціна: від дорогих
            </button>
            <button
              onClick={() => setSortOption('default')}
              style={{ padding: '6px 10px', backgroundColor: sortOption === 'default' ? '#6c757d' : '#fff', color: sortOption === 'default' ? '#fff' : '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Скинути
            </button>
          </div>
        </div>
      </div>

      {/* Список відфільтрованих та відсортованих товарів */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sortedProducts.map((product) => {
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
