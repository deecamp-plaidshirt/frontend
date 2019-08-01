import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'


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
        <p>{this.state.text}</p>
        A clock: {this.state.time.toLocaleTimeString()}
          <div onClick={this.onTap()}>
            Hello this is a test for gesture.
          </div>
      </div>
    )
  }
}
