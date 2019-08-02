import React, {useState} from 'react';
import './App.css';
import Clock from './components/clock'
import Animation from './components/animation'
import SDrawer from './components/drawer'
import {Button } from './styled/styled'

function App() {

  const [open, setOpen] = useState(false)

  const toggle = ()=>{
    setOpen(!open)
  }

  return (
    <div className="App">
      <h1 className="title">Hello react!</h1>
      <Button onClick={toggle}>Open Drawer</Button>
      <SDrawer opened={open?"open":undefined}/>
      <Clock />
      <Animation />
    </div>
  );
}

export default App;
