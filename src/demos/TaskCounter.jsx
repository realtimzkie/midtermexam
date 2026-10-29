import { useState } from 'react';

export default function TaskCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  const increment = () => {
    if (count < target) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const addTwo = () => {
    if (count < target - 1) {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    } else if (count < target) {
      setCount(prev => prev + 1);
    }
  };

  const reset = () => setCount(0);

  let status = "Not started";
  if (count >= target) {
    status = "Target reached";
  } else if (count > 0) {
    status = "In progress";
  }

  return (
    <div className="content-grid">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-subtitle">STUDY SESSION</div>
            <div className="card-title">Task progress</div>
          </div>
          <div className="status-badge">{status}</div>
        </div>

        <div className="progress-large">
          <h1>{count}</h1>
          <span>of {target} tasks</span>
        </div>

        <div className="input-row">
          <label>Task target</label>
          <input 
            type="number" 
            value={target} 
            onChange={(e) => setTarget(Number(e.target.value))} 
            min="1"
          />
        </div>

        <div className="divider"></div>

        <p className="hint-text">Complete a small step at a time. Your target is {target}.</p>

        <div className="button-group">
          <button className="btn-outline" onClick={decrement}>- Decrement</button>
          <button className="btn-primary" onClick={increment} disabled={count >= target}>+ Increment</button>
          <button className="btn-outline" onClick={addTwo} disabled={count >= target}>+2 Add two</button>
          <button className="btn-text" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="card info-card">
        <div className="info-icon">i</div>
        <h3>Why two functional updates?</h3>
        <p>React may batch updates in one event. Each updater receives the latest queued value, so two <code>setCount(current =&gt; current + 1)</code> calls add exactly two.</p>
        <div className="divider" style={{ margin: '24px 0', height: '1px' }}></div>
        <p>The status is derived from <code>count</code>; it is not stored as duplicate state.</p>
      </div>
    </div>
  );
}