
import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ThemeContext from './context/ThemeContext';

function App() {
  const [darkMode,setDarkMode] = useState(false)

  return (
    <ThemeContext value={{darkMode,setDarkMode}}>
      <Dashboard/>
    </ThemeContext>
    
  );
}

export default App;
