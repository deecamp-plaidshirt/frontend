import React from 'react'
import styled from 'styled-components'
import { Stage, Layer, Circle, Image, Group } from 'react-konva';


class Canvas extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      lastDist: 0,
      activate: true,
      opacity: 1,
      img: ""
    }
  }

  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.img_url !== this.props.img_url) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.img_url;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      img: this.image
    });
  };

  touchend = ()=>{
    this.setState({lastDist: 0})
  }

  getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  canMove = ()=>{
    this.setState({
      activate: !this.state.activate,
      opacity: this.state.activate?0.5:1
    })
    //setactivate(!activate)
    //setopacity(activate?0.5:1)
  }

  showCard = (e) => {
    const target = e.target
    target.to({
      radius: Math.random()*10 + 20,
      duration: 0.2
    });
    console.log("show card")

  }

  touchscale = (e) =>{
    const evt = e.evt
    let touch1 = evt.touches[0];
    let touch2 = evt.touches[1];

    if (touch1 && touch2) {
      var dist = this.getDistance(
        {
          x: touch1.clientX,
          y: touch1.clientY
        },
        {
          x: touch2.clientX,
          y: touch2.clientY
        }
      );

      if (!this.state.lastDist) {
        this.setState({lastDist: dist})
      }

      var scale = (this.group.scaleX() * dist) / this.state.lastDist;
      this.group.scaleX(scale)
      this.group.scaleY(scale)
      this.setState({lastDist: dist})
      this.layer.draw()
    }
  }

  render(){
    return(
      <Stage 
        width={window.innerWidth*0.95} 
        height={window.innerHeight*0.75}
        className={this.props.className}
      >
        <Layer 
          ref={node => this.layer = node }
        >
          <Group
            ref={node => this.group = node}
            onTouchMove={this.touchscale}
            onTouchEnd={this.touchend}
            onDblTap={this.canMove}
            opacity={this.state.opacity}
            draggable={this.state.activate}
          >
            <Image
              image={this.state.img}
              opacity={this.state.opacity}
            />
            {
              [100, 200, 300, 400].map((val, index) =>{
                return(
                  <Circle
                    x={val}
                    y={val}
                    radius={30}
                    fill="green"
                    key={val}
                    onClick={this.showCard}
                  />
                )
              })
            }
            <Circle
              radius={30}
              fill="green"
              //draggable
            />
          </Group>
        </Layer>
      </Stage>
    )
  }
}

const SCanvas = styled(Canvas)`
  border: solid thin black;
`;


export default SCanvas