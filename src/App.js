import React, {useState} from 'react';
import './App.css';
import Clock from './components/clock'
import Animation from './components/animation'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import SDrawer from './components/drawer'
import {Button } from './styled/styled'
import styled from 'styled-components'
import TakePhoto from './components/takephoto'
import AlloyFinger from './components/gesture'

const StyledButton = styled(Button)`
  font-size: 20px;
  width: 200px;
  background-color: ${props => props.warning ? 'red' : '#4e9af1'}
  background-color: ${props => props.primary ? 'green' : '#4e9af1'}

`;


function App(props) {

  const [open, setOpen] = useState(false)

  const toggle = ()=>{
    setOpen(!open)
  }

  return (
    <div className="App">
      <SDrawer opened={open?"open":undefined} toggle={toggle}/>
      <h1 className="title">{props.text}</h1>
      <StyledButton onClick={toggle}>Open Drawer</StyledButton>
      <TakePhoto/>      
      {/*<Clock />
      <Animation />*/}
    </div>
  );
}

function Gesture(props){

  const [text, set] = useState("hello")

  const log = ()=>{
    console.log("swipe triggered")
    set("kkkkk")
  }

  return(
    <AlloyFinger style={{zIndex: 1000}} onDoubleTap={log} onSwipe={log} onSingleTap={log}>
      <App text={text}/>
    </AlloyFinger>
  )
}

export default Gesture;
