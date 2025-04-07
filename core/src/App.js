import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import logo from './the-excuse-logo.png';

function App() {
  const [generateExcuse, setGenerateExcuse] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [typedExcuse, setTypedExcuse] = useState("");

  const fetchExcuse = (excuse) => {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`).then((res) => {
      const fullText = res.data[0].excuse;
      setGenerateExcuse(fullText);
      setTypedExcuse(""); // reset before typing
      let index = 0;
      const interval = setInterval(() => {
        setTypedExcuse((prev) => prev + fullText.charAt(index));
        index++;
        if (index >= fullText.length) clearInterval(interval);
      }, 30); // سرعت تایپ
    });
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <img src={logo} alt="The Excuse Logo" className="logo" />
        <h1 className="title">The Excuse</h1>
        <p className="subtitle">Need a reason to bail? We've got you covered 😉</p>

        <div className="toggle-container">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"></span>
          </label>
          <span className="mode-label">{darkMode ? "Dark" : "Light"} Mode</span>
        </div>
      </header>

      <main className="main">
        <h2 className="section-title">Generate an excuse</h2>
        <div className="buttons">
          <button onClick={() => fetchExcuse("party")}>🎉 Party</button>
          <button onClick={() => fetchExcuse("family")}>👪 Family</button>
          <button onClick={() => fetchExcuse("office")}>🏢 Office</button>
        </div>
        <p className="excuse">{typedExcuse}</p>
      </main>
    </div>
  );
}

export default App;