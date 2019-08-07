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
import MainPage from './components/mainpage'
import my_img from './resources/my.png'
import read_img from './resources/reading.png'




const StyledButton = styled.img`
  font-size: 20px;
  width: 50px;
  height: 50px;
  background-color: #f4ba1b;
  position: fixed;
  left: ${props=>props.left? '4vw': null};
  right: ${props=>props.left? null : '4vw'};
  top: 2rem;
  left: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 1.5rem;
    height: 2rem;
    object-fit: contain;
  }
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
          <StyledButton left onClick={toggle} src={my_img}></StyledButton>
          {/*<Canvas/>*/}
          <Route className="route" exact path="/" component={MainPage} />
          <Route className="route" path="/upload" component={TakePhoto} />
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
