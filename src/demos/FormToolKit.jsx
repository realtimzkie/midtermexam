import { useState, useRef } from 'react';

export default function FormToolkit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const prevEmailRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.includes('@')) newErrors.email = "Valid email is required.";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);

    if (newErrors.name) {
      nameRef.current.focus();
    } else if (newErrors.email) {
      emailRef.current.focus();
    } else if (newErrors.password) {
      passwordRef.current.focus();
    } else {
      prevEmailRef.current = email;
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="card generic-layout">
      <div className="card-header">
        <div className="card-title">Registration Form</div>
        <div className="status-badge">Last Email: {prevEmailRef.current || 'None'}</div>
      </div>

      <form onSubmit={handleSubmit} className="generic-layout">
        <div>
          <label>Name</label><br/>
          <input className="generic-input" ref={nameRef} value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div>
          <label>Email</label><br/>
          <input className="generic-input" ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div>
          <label>Password</label><br/>
          <input className="generic-input" type="password" ref={passwordRef} value={password} onChange={e => setPassword(e.target.value)} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <div>
          <button className="btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}