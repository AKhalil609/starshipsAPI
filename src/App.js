import React from 'react';
import './App.css';
import List from './components/List'

function App() {
  return (
    <div id="starwars" className="App">
      <div id="starwars-overlay">
      <List/>

      </div>
    </div>
  );
}

export default App;
