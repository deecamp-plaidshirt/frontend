import React, {useState, useRef} from 'react';
import './App.css';
import clamp from 'lodash-es/clamp'
import Clock from './components/clock'
import Animation from './components/animation'
import { useSprings, animated } from 'react-spring'
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
  const toggle = ()=>{
    props.openDrawer()
  }

  return (
    <div className="App">
      <SDrawer opened={props.opened?"open":undefined} toggle={toggle}/>
      <h1 className="title">{props.text}</h1>
      <StyledButton onClick={toggle}>Open Drawer</StyledButton>
  <TakePhoto/>
      {/*<Clock />
      <Animation />*/}
    </div>
  );
}

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

function Viewpager(prop) {
  const index = useRef(0)
  const [open, setopen] = useState(false)

  const openDrawer = ()=>{
    //console.log("open Drawer")
    setopen(!open)
  }
  const changtext = ()=>{
    settext("fdads")
  }
  const [text, settext] = useState("hello")
  const bind = useDrag(({ down, direction: [xDir], distance, cancel }) => {
    console.log(distance)
    console.log(xDir)
    if(down && distance >= window.innerWidth/6 && xDir > 0){
      openDrawer()
      console.log('distance')
    }
  })
  return(
    <animated.div className={prop.className} {...bind()} >
      <App openDrawer={openDrawer} opened={open}/>
    </animated.div>
  )
}

const SView = styled(Viewpager)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0vh;
  will-change: transform;
  z-index: 1000;
  

`;

export default SView;
