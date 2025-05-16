
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/i18n'; // Import i18n configuration

// Apply theme based on saved preference or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? "dark" : "light";
};

document.documentElement.classList.add(getInitialTheme());

createRoot(document.getElementById("root")!).render(<App />);
