import { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  return (
    <PreferencesContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}

function PreferencesPanel() {
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();
  return (
    <div className="button-group" style={{ marginBottom: '24px' }}>
      <button className="btn-outline" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme ({theme})
      </button>
      <select className="generic-input" style={{ width: 'auto' }} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
        <option value={14}>14px</option>
        <option value={16}>16px</option>
        <option value={18}>18px</option>
      </select>
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  
  const bg = theme === 'light' ? '#f8f9fa' : '#343a40';
  const color = theme === 'light' ? '#212529' : '#f8f9fa';

  return (
    <div style={{ background: bg, color: color, fontSize: `${fontSize}px`, padding: '24px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <p>This is the article content preview. Notice how the theme and font size update without passing props down multiple levels.</p>
    </div>
  );
}

function Toolbar() {
  return <PreferencesPanel />;
}

function Dashboard() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Dashboard Settings</div>
      </div>
      <Toolbar />
      <ArticlePreview />
    </div>
  );
}

export default function AppPreferences() {
  return (
    <PreferencesProvider>
      <Dashboard />
    </PreferencesProvider>
  );
}