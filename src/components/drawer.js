import React, {useState} from 'react'
import {animated, useSpring} from 'react-spring'
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
  return(
    <div className={props.className}>
      <p>X</p>
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
  }

`;

function DrawerItem(props){
  return(
    <div className={props.className}>
      <Title>{props.title}</Title>
      <Content>{props.content}</Content>
    </div>
  )
}

const SDrawerItem = styled(DrawerItem)`
  margin-bottom: 5px;
`;



function Drawer(props){
  // drawer function component

  return(
    <div className={props.className}>
      <SHeader />
      <SDrawerItem title="test drawer" content="???"> </SDrawerItem>
      {
        ['hello', 'this', 'is', 'drawer'].map((item, index)=>{
          return(
            <SDrawerItem title={item} content={item+index.toString()} key={item}></SDrawerItem>
          )
        })
      }
    </div>
  )
}

const SDrawer = styled(Drawer)`
  position: absolute;
  background-color: #eee;
  left: 0;
  width: 300px;
  height: 100%;
  transition: 1s;
  transform: translateX(${props => props.opened ? 0 : '-300px'})
`;

function Container(props){
  return (
    <div className={props.className}>
      <SDrawer opened={props.opened}/>
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