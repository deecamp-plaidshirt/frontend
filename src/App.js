import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Animation from './components/animation'
import { animated } from 'react-spring'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDrag } from 'react-use-gesture'
import SDrawer from './components/drawer'
import styled from 'styled-components'
import TakePhoto from './components/takephoto'
import MainPage from './components/mainpage'
import my_img from './resources/my.png'
import NotFound from './components/pagenotfound'
import secret from './secret.js'
import {get, post} from './utils/api'
import md5 from 'js-md5'


const StyledButton = styled.img`
  font-size: 20px;
  width: 1.8rem;
  height: 2rem;
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
    width: 1.8rem;
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
          <Route className="route" path="/notfound" component={NotFound} />
        </Router>
      </div>

  );
}


function Viewpager(prop) {
  const index = useRef(0)
  const [open, setopen] = useState(false)


  const translate = async ()=>{
    console.log(secret)
    let appKey = secret.appid;
    let key = secret.apikey;
    let salt = (new Date).getTime();
    let query = 'text';
    var from = 'en';
    var to = 'zh';
    var str1 = appKey + query + salt +key;
    var sign = md5(str1);
    const res = await post('http://openapi.youdao.com/api', {
      q: query,
      appKey: appKey,
      salt: salt,
      from: from,
      to: to,
      sign: sign
  }, {
      headers:{'Content-Type':'application/json'}
    })

    console.log(res)

  }
  useEffect(()=>{
    //translate()
  })

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
