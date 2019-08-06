import React, {useState, useRef} from 'react';
import './App.css';
import clamp from 'lodash-es/clamp'
import Clock from './components/clock'
import Animation from './components/animation'
import { useSprings, animated } from 'react-spring'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { useDrag } from 'react-use-gesture'
import SDrawer from './components/drawer'
import DDrawer from './components/carddrawer'
import {Button } from './styled/styled'
import styled from 'styled-components'
import TakePhoto from './components/takephoto'
import Canvas from './components/canvas'
import {withRouter} from 'react-router-dom'


const StyledButton = styled(Button)`
  font-size: 20px;
  width: 50px;
  height: 50px;
  background-color: ${props => props.warning ? 'red' : '#4e9af1'}
  background-color: ${props => props.primary ? 'green' : '#4e9af1'}
  position: fixed;
  left: ${props=>props.left? '2vw': null};
  right: ${props=>props.left? null : '2vw'};
  top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//const SDrawerWithRouter = withRouter(SDrawer)

function App(props) {
  const toggle = ()=>{
    props.openDrawer()
  }
//          <SDrawer opened={props.opened?"open":undefined} toggle={toggle}/>

  return (
      <div className="App">
        <Router>
          <SDrawer opened={props.opened?"open":undefined} toggle={toggle}/>
          <h1 className="title">ALINE</h1>
          <StyledButton left onClick={toggle}><span>O</span></StyledButton>
          {/*<Canvas/>*/}
          <Route className="route" exact path="/" component={TakePhoto} />
          <Route className="route" path="/clock" component={Clock} />
          <Route className="route" path="/animation" component={Animation} />
          <Route className="route" path="/canvas" component={Canvas} />
        </Router>
      </div>

  );
}


function Viewpager(prop) {
  const index = useRef(0)
  const [open, setopen] = useState(false)

  const openDrawer = ()=>{
    //console.log("open Drawer")
    setopen(!open)
  }
  const bind = useDrag(({ down, direction: [xDir], distance, cancel }) => {
    //console.log(distance)
    //console.log(xDir)
    if(down && distance >= window.innerWidth/6 && xDir > 0){
      //openDrawer()
      //console.log('distance')
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
