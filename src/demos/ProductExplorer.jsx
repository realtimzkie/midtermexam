import React, { useState, useMemo, useCallback, useEffect } from 'react';

const generateProducts = () => {
  const items = [];
  for (let i = 1; i <= 500; i++) {
    items.push({
      id: i,
      name: `Product ${i}`,
      category: i % 2 === 0 ? 'Electronics' : 'Clothing',
      price: Math.random() * 100
    });
  }
  return items;
}

const products = generateProducts();

const ProductList = React.memo(({ items, onSelect }) => {
  return (
    <ul className="generic-list" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '6px' }}>
      {items.map(p => (
        <li key={p.id} onClick={() => onSelect(p.id)} style={{ cursor: 'pointer' }}>
          {p.name} - ${p.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
});

export default function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selected, setSelected] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('/api/analytics', { method: 'POST' }).catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .filter(p => category === 'All' || p.category === category)
      .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  }, [query, category, sortOrder]);

  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <div className="card generic-layout">
      <div className="button-group">
        <button className="btn-outline" onClick={() => setCounter(c => c + 1)}>Unrelated Counter: {counter}</button>
        <span className="status-badge">Selected ID: {selected || 'None'}</span>
      </div>
      
      <div className="button-group" style={{ flexWrap: 'wrap' }}>
        <input className="generic-input" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        <select className="generic-input" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <select className="generic-input" style={{ width: 'auto' }} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <ProductList items={filteredProducts} onSelect={handleSelect} />
    </div>
  );
}