import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import GameField from "./components/gameField/GameField";

function App() {
  return (
    <div className="App">
      <Header/>
      <GameField/>
    </div>
  );
}

export default App;
