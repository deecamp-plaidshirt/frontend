import React from 'react';
import './App.css';
import Clock from './components/clock'
import Animation from './components/animation'

function App() {
  return (
    <div className="App">
      <h1 className="title">Hello react!</h1>
      <Clock />
      <Animation />
    </div>
  );
}

export default App;
