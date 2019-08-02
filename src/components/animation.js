import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const style={
  title:{
    color: "red",
    fontSize: "30px"
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }

}

const Button = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  opacity: 0.6;
  :hover{
    opacity: 1;
  }
`;


function Simple(props) {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  // 1. we define the drag gesture logic using the useDrag hook
  const bind = useDrag(({ down, delta }) => {
    set({ xy: down ? delta : [0, 0] })
  })


  return (
    <animated.div
      // 2. we bind the result of the hook to our component
      {...bind()}
      style={{transform: xy.interpolate((x, y) => `translate3D(${x}px, ${y}px, 0)`),
      }}
    >
      <Button>Drag me!</Button>
    </animated.div>
  )
}

function JumpTitle(props){
  const [ani_props, set, stop] = useSpring(() => ({
    config: {
      duration: 1000,
    },
    from:{
      opacity: 1,
      color: 'black'
    }, 
    delay:1000,
  }))
  const startAnimation = ()=>{
    set({
      opacity: 0,
      color: 'red',
    })
    props.changeTitle()
  }
  return (
    <animated.h2 onClick={startAnimation} style={ani_props}>Hello Click me</animated.h2>
  )
}


export default class Animation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      time: new Date(),
      text: "hello"
    }
  }

  componentDidMount(){
    this.timerID = setInterval(() => {
     this.tick()
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({
      time: new Date()
    })
  }

  onTap = (text) => {
    console.log(text+"tapped")
  }

  changeTitle = (text)=>{
    this.setState({
      text: text+" changed title"
    })
  }
  
  start = ()=>{
    console.log("drag block mounted")
  }



  render(){
    return(
      <div style={style.container}>
        <Button>Click me!</Button>
        <p style={style.title} className="title">{this.state.text}</p>
        A clock: {this.state.time.toLocaleTimeString()}
          <div onClick={this.onTap}>
            Hello this is a test for gesture.
          </div>
          <JumpTitle changeTitle={(e) => this.changeTitle('test', e)}/>
          <Simple />
      </div>
    )
  }
}
