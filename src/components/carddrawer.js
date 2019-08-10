import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import EXIF from 'exif-js';

const Title = styled.h3`
  color: #666;
  margin-bottom: 6px;
`;

const Content = styled.p`
  color: #666;
  margin: 0;
`;

function Header(props){
  const toggle = ()=>{
    console.log("close")
    props.toggle()
  }

  const fullopen = ()=> {
    props.fullopen()
  }
  return(
    <div className={props.className}>
      <p onClick={toggle}>X</p>
      <h2>Drawer</h2>
      <p onClick={fullopen}>O</p>
    </div>
  )
}

const SHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
 p{    
    color: black;
    top: 2px;
    margin: 10px;
    font-size: 20px;
    :active{
      box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.2),inset 0 0 0em 0.05em rgba(255,255,255,0.1);
    }
  }

`;



function DrawerItem(props){

  const clicked = (link, e)=>{
    //console.log(link)
    e.stopPropagation()
    //console.log("item clicked")
    props.clicked()
    //console.log(props)
    props.history.push(link)
  }

  return(
    <div onClick={(e)=>clicked(props.link, e)} className={props.className}>
      <Title>{props.title}</Title>
      <Content>{props.content}</Content>
    </div>
  )
}

const SDrawerItem = styled(DrawerItem)`
  margin: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  :hover{
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  :active{
    box-shadow: 0 0.6em 2em -0.3em rgba(0,0,0,0.5), 0 0 0em 0.05em rgba(255,255,255,0.1);
  }
  transition: 0.5s;
`;

const DrawerItems = [
  {
    title: "Main Page",
    contnet: "go back to main page",
    link: "/"
  },
  {
    title: "我的错题",
    contnet: "记录所有的错误题目",
    link: "/clock"
  },
  {
    title: "学习记录",
    contnet: "记录所有的题目",
    link: "/animation"
  },
  {
    title: "我的设置",
    contnet: "进行应用设置",
    link: "/canvas"
  }
]

const RSDrawerItem = withRouter(SDrawerItem)

function Drawer(props){
  // drawer function component

  const stop = (e) => {
    //props.toggle()
    // catch the bubble
    e.stopPropagation()
    //console.log("drawer clicked")
  }

  const toggle = () => {
    props.toggle()
    //e.stopPropagation()
    //console.log("drawer clicked")
  }

  return(
    <div onClick={stop} className={props.className}>
      <SHeader fullopen={props.fullopen} toggle={toggle}/>
      <Content clicked={toggle} >{props.content}</Content>
    </div>
  )
}



const SDrawer = styled(Drawer)`
  position: absolute;
  background-color: rgb(250,250,250);
  top: 100vh;
  width: 100%;
  height: 100vh;
  transition: 0.5s;
  z-index: 500;
  transform: translateY(${props => props.opened ?props.fopened?'-90vh' :'-50vh' : '0'})
`;

function Container(props){
  const {opened, className, ...prop} = props

  const toggle = () => {
    props.toggle()
    //console.log("container clicked")
  }
  return (
    <div  onClick={toggle} className={className}>
      <SDrawer opened={opened} {...prop}/>
    </div>    
  )
}

const SContainer = styled(Container)`
  position: fixed;
  width: 100%;
  height: 100%;
  margin:0;
  z-index: 2000;
  pointer-events: ${props => props.opened ? 'auto':'none' };
`;


export default SContainer