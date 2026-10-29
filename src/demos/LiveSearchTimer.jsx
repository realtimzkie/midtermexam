import { useState, useEffect } from 'react';

const USERS = [
  { id: 1, name: 'Ernie', role: 'Developer' },
  { id: 2, name: 'Timothy', role: 'Designer' },
  { id: 3, name: 'Pulvera', role: 'Tester' },
  { id: 4, name: 'Minoza', role: 'Developer' }
];

export default function LiveSearchTimer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = USERS.filter(u => 
        u.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    document.title = `${results.length} visible results`;
  }, [results.length]);

  return (
    <div className="card generic-layout">
      <div className="card-header">
        <div className="card-title">User Directory</div>
        <div className="status-badge">Session Time: {seconds}s</div>
      </div>
      
      <input 
        type="text" 
        className="generic-input"
        placeholder="Search users..."
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      
      <ul className="generic-list">
        {results.map(u => (
          <li key={u.id}>
            <strong>{u.name}</strong> - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}