import { useReducer, useEffect, useState } from 'react';

const initialState = {
  issues: [],
  filter: 'all',
  nextId: 1
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [...state.issues, { id: state.nextId, title: action.payload.title, done: false }],
        nextId: state.nextId + 1
      };
    case 'TOGGLE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue => 
          issue.id === action.payload.id ? { ...issue, done: !issue.done } : issue
        )
      };
    case 'DELETE_ISSUE':
      return {
        ...state,
        issues: state.issues.filter(issue => issue.id !== action.payload.id)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter
      };
    case 'CLEAR_DONE':
      return {
        ...state,
        issues: state.issues.filter(issue => !issue.done)
      };
    default:
      return state;
  }
}

function usePersistentReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export default function IssueTracker() {
  const [state, dispatch] = usePersistentReducer(reducer, initialState, 'tracker-state');
  const [title, setTitle] = useState('');

  const visibleIssues = state.issues.filter(issue => {
    if (state.filter === 'open') return !issue.done;
    if (state.filter === 'done') return issue.done;
    return true;
  });

  const handleAdd = () => {
    if (title) {
      dispatch({ type: 'ADD_ISSUE', payload: { title } });
      setTitle('');
    }
  };

  return (
    <div className="card generic-layout">
      <div className="button-group">
        <input 
          className="generic-input" 
          placeholder="New issue title..." 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn-primary" onClick={handleAdd}>Add</button>
      </div>

      <div className="button-group" style={{ margin: '16px 0' }}>
        <button className={state.filter === 'all' ? 'btn-primary' : 'btn-outline'} onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'all' } })}>All</button>
        <button className={state.filter === 'open' ? 'btn-primary' : 'btn-outline'} onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'open' } })}>Open</button>
        <button className={state.filter === 'done' ? 'btn-primary' : 'btn-outline'} onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'done' } })}>Done</button>
        <button className="btn-text" onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear Done</button>
      </div>

      <ul className="generic-list">
        {visibleIssues.map(issue => (
          <li key={issue.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={issue.done} 
                onChange={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })} 
              />
              <span style={{ textDecoration: issue.done ? 'line-through' : 'none', color: issue.done ? '#aaa' : '#333' }}>
                {issue.title}
              </span>
            </label>
            <button className="btn-text" style={{ color: '#fa5252' }} onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}