import { useState } from 'react';
import TaskCounter from './demos/TaskCounter';
import LiveSearchTimer from './demos/LiveSearchTimer';
import FormToolkit from './demos/FormToolKit';
import AppPreferences from './demos/Preferences';
import ProductExplorer from './demos/ProductExplorer';
import IssueTracker from './demos/IssueTracker';

const EXAMS = [
  { id: 1, title: 'Smart Task Counter', hooks: 'useState', component: TaskCounter, desc: 'Build the required behavior with focused, idiomatic React Hooks.' },
  { id: 2, title: 'Live Search and Timer', hooks: 'useEffect · useState', component: LiveSearchTimer, desc: 'Build a searchable user list with a session timer.' },
  { id: 3, title: 'Accessible Form Toolkit', hooks: 'useRef · useState', component: FormToolkit, desc: 'Build a registration form that guides the user to invalid fields.' },
  { id: 4, title: 'Application Preferences', hooks: 'useContext · useState', component: AppPreferences, desc: 'Share theme and font size preferences without prop drilling.' },
  { id: 5, title: 'Product Explorer', hooks: 'useMemo · useCallback', component: ProductExplorer, desc: 'Repair a product explorer that performs an expensive filter.' },
  { id: 6, title: 'Issue Tracker', hooks: 'useReducer · custom Hook', component: IssueTracker, desc: 'Build an issue tracker whose state transitions are handled by a pure reducer.' }
];

export default function App() {
  const [activeId, setActiveId] = useState(1);

  const activeExam = EXAMS.find(e => e.id === activeId);
  const ActiveComponent = activeExam.component;

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">H</div>
          <div className="sidebar-title">
            <h2>Hooks Lab</h2>
            <p>Practical exam</p>
          </div>
        </div>
        
        <div className="sidebar-menu-title">EXERCISES</div>
        
        <div className="sidebar-nav">
          {EXAMS.map(exam => (
            <button 
              key={exam.id}
              className={`nav-item ${activeId === exam.id ? 'active' : ''}`}
              onClick={() => setActiveId(exam.id)}
            >
              <div className="nav-number">0{exam.id}</div>
              <div className="nav-text">
                <h4>{exam.title}</h4>
                <p>{exam.hooks}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="breadcrumb">REACT HOOKS / EXERCISES</div>
        
        <div className="page-header">
          <p>PRACTICAL EXAM 0{activeExam.id}</p>
          <div className="title-row">
            <h1>{activeExam.title}</h1>
            <span className="hook-badge">{activeExam.hooks}</span>
          </div>
          <p className="page-description">{activeExam.desc}</p>
        </div>

        <ActiveComponent />
      </div>
    </div>
  );
}