import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import AlloyFinger from './gesture'

class Clock extends React.Component{
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

  tick = ()=>{
    this.setState({
      time: new Date()
    })
  }

  onTap = ()=>{
    console.log("tapped")
  }

  changeTitle = ()=>{
    this.setState({
      text: "test double tap"
    })
  }

  render(){
    return(
      <div>
        <p>{this.state.text}</p>
        A clock: {this.state.time.toLocaleTimeString()}
        <AlloyFinger onDoubleTap={this.changeTitle}>
          <div>
            Hello this is a test for gesture.
          </div>
        </AlloyFinger>

      </div>
    )
  }
}

export default Clock;