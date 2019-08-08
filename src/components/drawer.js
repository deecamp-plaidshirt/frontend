import React, {useState} from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import my_y from '../resources/my_y.png'
import key_img from '../resources/key.png'
import one from '../resources/one.png'
import two from '../resources/two.png'
import three from '../resources/three.png'
import four from '../resources/four.png'
import five from '../resources/home.png'

const Title = styled.h3`
  color: #666;
  margin: 0.5rem;
  transform: translateX(1.5rem);
  font-weight:400;
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
      <h1>我的</h1>
    </div>
  )
}

const SHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h1{
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    margin-top:1.5rem;
    color: #f4ba1b;
  }

  h1::before{
    content:'';
    background-image:url(${my_y});
    background-size: 2rem 2.2rem;
    position: absolute;
    width:2rem;
    height:2.2rem;
    transform: translate(-3.8rem, -0.1rem);
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
    </div>
  )
}

const SDrawerItem = styled(DrawerItem)`
  margin: 1rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
  border-bottom: 0.1rem solid #f4ba1b;
  background-color:  rgb(250,250,250);
  display: flex;
  items-align: center;
  :hover{
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  :active{
    box-shadow: 0 0.6em 2em -0.3em rgba(0,0,0,0.5), 0 0 0em 0.05em rgba(255,255,255,0.1);
  }
  transition: 0.5s;
  ::before{
    content:'';
    opacity: 0.7;
    background-image:url(${props=>props.img});
    background-size: 2rem 2rem;
    width:2rem;
    height:2rem;
    transform: translate(0, 0);
  }
`;

const DrawerItems = [
  {
    title: "主页",
    pic: five,
    link: "/"
  },
  {
    title: "错题集",
    pic: one,
    link: "/photo"
  },
  {
    title: "评分记录",
    pic: two,
    link: "/clock"
  },
  {
    title: "单词集",
    pic: three,
    link: "/animation"
  },
  {
    title: "设置",
    pic: four,
    link: "/canvas"
  },

]
const Key = styled.img`
  object-fit: cover;
  width: 180px;
  height: 160px;
  bottom: 0;
`;
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
      <SHeader toggle={props.toggle}/>
      {
        props.DrawerItems.map((item, index)=>{
          return(
            <RSDrawerItem img={item.pic} clicked={toggle} link={item.link} title={item.title} content={item.contnet} key={item.title}></RSDrawerItem>
          )
        })
      }
      <Key src={key_img} alt="key"></Key>
    </div>
  )
}

const SDrawer = styled(Drawer)`
  position: absolute;
  background-color: rgb(250,250,250);
  left: 0;
  width: 200px;
  height: 70%;
  top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.5s;
  border-radius: 0 1.3rem 1.3rem 0;
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
      <SDrawer DrawerItems={DrawerItems} opened={opened} {...prop}/>
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