import React, {useState} from 'react'
import {animated, useSpring} from 'react-spring'
import {useDrag} from 'react-use-gesture'
import styled from 'styled-components'


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
  return(
    <div className={props.className}>
      <p onClick={props.toggle}>X</p>
      <h2>Drawer</h2>
    </div>
  )
}

const SHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  p{
    position: absolute;
    font-size: 20px;
    color: black;
    left: 10px;
    top: 2px;
    :active{
      box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.2),inset 0 0 0em 0.05em rgba(255,255,255,0.1);
    }
  }

`;

function DrawerItem(props){

  const clicked = (e)=>{
    e.stopPropagation()
    //console.log("item clicked")
    props.clicked()
  }

  return(
    <div onClick={clicked} className={props.className}>
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
    title: "我的错题",
    contnet: "记录所有的错误题目"
  },
  {
    title: "学习记录",
    contnet: "记录所有的题目"
  },
  {
    title: "我的设置",
    contnet: "进行应用设置"
  }
]


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
      <SHeader toggle={props.toggle}/>
      {
        DrawerItems.map((item, index)=>{
          return(
            <SDrawerItem clicked={toggle} title={item.title} content={item.contnet} key={item.title}></SDrawerItem>
          )
        })
      }
    </div>
  )
}

const SDrawer = styled(Drawer)`
  position: absolute;
  background-color: rgb(250,250,250);
  left: 0;
  width: 300px;
  height: 100%;
  transition: 0.5s;
  z-index: 500;
  transform: translateX(${props => props.opened ? 0 : '-300px'})
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
  z-index: 1000;
  pointer-events: ${props => props.opened ? 'auto':'none' };
`;



export default SContainer