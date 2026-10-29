# React Hooks Practical Exam

## Completed Requirements
* **Practical Exam 1:** Smart Task Counter (`useState`)[cite: 1, 2].
* **Practical Exam 2:** Live Search and Timer (`useEffect`, `useState`)[cite: 1, 3].
* **Practical Exam 3:** Accessible Form Toolkit (`useRef`, `useState`)[cite: 1, 4].
* **Practical Exam 4:** Application Preferences (`useContext`, `useState`)[cite: 1, 5].
* **Practical Exam 5:** Product Explorer Performance Repair (`useMemo`, `useCallback`)[cite: 1, 6].
* **Practical Exam 6:** Issue Tracker State Engine (`useReducer`, custom hooks)[cite: 1, 7].

---

## Test Steps
1. Open the project folder in VS Code[cite: 1].
2. Run `npm install` in the terminal[cite: 1].
3. Run `npm run dev` to start the app[cite: 1].
4. Click the local server link (`http://localhost:5173`) to view it in your browser[cite: 1].

---

## Known Limitations
* All exercises are integrated into a single dashboard component for easier demonstration.

---

## Required Explanations & Debugging Answers

### 1. Task Counter
* **Why two functional updates?** Calling `setCount(count + 1)` twice uses the same captured value from the render, only adding 1. Using callback syntax (`prev => prev + 1`) queues the updates properly to add 2[cite: 2].

### 2. Live Search & Timer
* **Cleanup functions:** `clearTimeout` prevents outdated search results from flashing when typing fast, and `clearInterval` stops duplicate timers from running in the background[cite: 3].

### 3. Form Toolkit
* **Ref vs State:** Mutating a ref does not trigger a re-render. State must be used for visible data changes on the screen[cite: 4].

### 4. Application Preferences
* **Context:** Moving state into context eliminates "prop drilling" by letting deeply nested components access values directly[cite: 5].

### 5. Product Explorer
* **Memoization:** Missing dependencies cause stale data. Side effects like analytics belong in `useEffect`, not `useMemo`[cite: 6].

### 6. Issue Tracker
* **Reducer Purity:** State must never be mutated directly. Use the spread operator (`...state`) to return new object copies, and ensure the default branch returns the existing state[cite: 7].