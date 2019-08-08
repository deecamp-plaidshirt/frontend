import React from 'react'
import styled from 'styled-components'
import EXIF from 'exif-js';
import { Stage, Layer, Circle, Image, Group, Rect } from 'react-konva';


class Canvas extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      lastDist: 0,
      activate: true,
      opacity: 1,
      img: "",
      imgw: 0,
      imgh: 0,
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
  checkRotation = ()=> {
    console.log("check rotation")
    EXIF.getData(this.imgEle, () => { 
      console.log(EXIF.getTag(this.imgEle, 'Orientation'))
    })
  }

  handleLoad = () => {
    this.setState({
      img: this.image,
      imgw: this.image.width,
      imgh: this.image.height
    });
    console.log(this.image.width, this.image.height)
    this.checkRotation()
    this.fitStage()
  };

  fitStage = ()=> {
    console.log(this.group.width(), this.group.height())
    let grpw = this.group.width(), grph = this.group.height()
    let scale = 1
    let distance = 0
    if(this.state.imgw > this.state.imgh){
      scale =  grpw / this.state.imgw
      distance = this.state.imgh * scale
    }
    else{
      scale = grph / this.state.imgh
      distance = this.state.img_w * scale
    }
    this.group.scaleX(scale)
    this.group.scaleY(scale)
    this.group.rotate(90)
    this.group.move({
      x:distance,
      y:0,
    })

  }

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
    this.props.toggle(`${e.target.attrs.x}-${e.target.attrs.y}-${e.target.attrs.radius}`)
    console.log("show card")

  }

  touchscale = (e) =>{
    if(!this.state.activate){
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
  }

  render(){
    return(
      <Stage 
        width={window.innerWidth*0.9} 
        height={window.innerHeight*0.7}
        className={this.props.className}
      >
        <Layer 
          width={window.innerWidth*0.95} 
          height={window.innerHeight*0.75}
          ref={node => this.layer = node }
        >
          <Group
            width={window.innerWidth*0.95} 
            height={window.innerHeight*0.75}
            ref={node => this.group = node}
            onTouchMove={this.touchscale}
            onTouchEnd={this.touchend}
            //onDblTap={this.canMove}
            opacity={this.state.opacity}
            draggable={this.state.activate}
          >
            <Image
              image={this.state.img}
              opacity={this.state.opacity}
              ref={node => this.imgEle = node }
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
                    onTap={this.showCard}
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
          <Rect
            x={10}
            y={10}
            width={50}
            height={50}
            onTap={this.canMove}
            onClick={this.canMove}
            fill='red'
          />
        </Layer>
      </Stage>
    )
  }
}

const SCanvas = styled(Canvas)`
  border: solid thin black;
  width: 90%;
`;


export default SCanvas