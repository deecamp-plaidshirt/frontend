import React, {useState} from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import '../style/animation.css'


function JumpTitle(){
  const [props, set, stop] = useSpring(() => ({
    config: {
      duration: 2000,
    },
    from:{
      opacity: 0,
      color: 'black'
    }, 
    delay:1000,
  }))
  const startAnimation = ()=>{
    set({
      opacity: 1,
      color: 'red',
    })
  }
  return (
    <animated.h2 onClick={startAnimation} style={props}>Hello Click me</animated.h2>
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



  render(){
    return(
      <div>
        <p className="title">{this.state.text}</p>
        A clock: {this.state.time.toLocaleTimeString()}
          <div onClick={this.onTap}>
            Hello this is a test for gesture.
          </div>
          <JumpTitle/>
      </div>
    )
  }
}
