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

  const [props, set] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useDrag(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    //console.log(distance)
    if(distance >= window.innerWidth/2 && xDir === 1){
      openDrawer()
    }
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
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
