import React from 'react'
import AlloyFinger from './gesture'
import {Button} from '../styled/styled'
import styled from 'styled-components'

const style = {
  title: {
    fontSize: "30px",
    color: "blue"
  }
}
// style={{backgroundColor: '#4e9af1', fontSize: '20px'}}
const StyledButton = styled(Button)`
  font-size: 20px;
  background-color: ${props => props.warning ? 'red' : '#4e9af1'}

`;

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
        <p style={style.title} className="title">{this.state.text}</p>
        A clock: {this.state.time.toLocaleTimeString()}
        <AlloyFinger onDoubleTap={this.changeTitle}>
          <div>
            Hello this is a test for gesture.
          </div>
        </AlloyFinger>
        <StyledButton >Styled Button</StyledButton>
        <StyledButton warning>Warning Button</StyledButton>

      </div>
    )
  }
}

export default Clock;