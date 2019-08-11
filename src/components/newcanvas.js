import React from 'react'
import styled from 'styled-components'
import EXIF from 'exif-js';
import { Stage, Layer, Circle, Image, Group, Rect } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva'
import resieze_img from '../resources/resize.png'


const ResizeImg = (props) => {
  const [image] = useImage(resieze_img);
  return <Image image={image} 
  x={10}
  y={10}
  width={30}
  height={30}
  onTap={props.canMove}
  onClick={props.canMove}
  fill="#f4ba1b"
  />;
};

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
      rects: undefined,
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
    this.rects = this.props.rects
    //console.log('get rexts:', this.rects)
    this.image.addEventListener('load', this.handleLoad);
  }
  checkRotation = ()=> {
    //console.log("check rotation")
    EXIF.getData(this.imgEle, () => { 
      //console.log(EXIF.getTag(this.imgEle, 'Orientation'))
    })
  }

  handleLoad = () => {
    this.setState({
      img: this.image,
      imgw: this.image.width,
      imgh: this.image.height,
      rects: this.props.rects
    });
    //console.log(this.image.width, this.image.height)
    //console.log(this.state.rects)
    //console.log(this.props.rects)
    this.checkRotation()
    this.fitStage()
  };

  rotatePoint = ({ x, y }, rad) => {
    const rcos = Math.cos(rad);
    const rsin = Math.sin(rad);
    return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
  };
  
  // will work for shapes with top-left origin, like rectangle
  rotateAroundCenter = (node, rotation)=> {
    //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
    const topLeft = { x: -node.width() / 2, y: -node.height() / 2 };
    const current = this.rotatePoint(topLeft, Konva.getAngle(node.rotation()));
    const rotated = this.rotatePoint(topLeft, Konva.getAngle(rotation));
    const dx = rotated.x - current.x,
      dy = rotated.y - current.y;
  
    node.rotation(rotation);
    node.x(node.x() + dx);
    node.y(node.y() + dy);
  }
  
  // then use it
  //rotateAroundCenter(rect, 180);

  fitStage = ()=> {
    this.rotateAroundCenter(this.imgEle, this.props.rotate)
    if(this.props.static){
      let grpw = this.group.width(), grph = this.group.height()
      let scaleX =  grpw / this.state.imgw
      let scaleY = grph / this.state.imgh
      this.group.scaleX(scaleX)
      this.group.scaleY(scaleY)
    }
    else{
      let grpw = this.group.width(), grph = this.group.height()
      let scale = 1
      if(this.state.imgw > this.state.imgh){
        scale =  grpw / this.state.imgw
        if(this.props.rotate === 90){
          this.imgEle.x(this.state.imgh)
          this.imgEle.y(0)
        }
      }
      else{
        scale = grph / this.state.imgh
      }
      this.group.scaleX(scale)
      this.group.scaleY(scale)
    }
    
    /*this.group.rotate(this.props.rotate)
    this.group.move({
      x:distance,
      y:0,
    })*/

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
      opacity: this.state.activate?0.8:1
    })
    //setactivate(!activate)
    //setopacity(activate?0.5:1)
  }

  showCard = (e) => {
    const target = e.target
    this.props.toggle(`${target.attrs.x}-${target.attrs.y}-${target.attrs.width}-${target.attrs.height}`)
    //console.log("show card")

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
        width={this.props.width} 
        height={this.props.height}
        className={this.props.className}
      >
        <Layer 
        width={this.props.width} 
        height={this.props.height}
          ref={node => this.layer = node }
        >
          <Group
        width={this.props.width} 
        height={this.props.height}
            ref={node => this.group = node}
            onTouchMove={this.touchscale}
            onTouchEnd={this.touchend}
            //onDblTap={this.canMove}
            opacity={this.state.opacity}
            draggable={!this.props.static && this.state.activate}
          >
            <Image
              image={this.state.img}
              opacity={this.state.opacity}
              ref={node => this.imgEle = node }
            />
            {
            this.props.rects && this.props.rects.map((item, index)=>{
              return(
                <Rect
                  x={item[0]}
                  y={item[1]}
                  width={(item[2]-item[0])}
                  height={(item[7]-item[1])}
                  fill="#f4ba1b"
                  key={item}
                  onClick={this.showCard}
                  onTap={this.showCard}
                  opacity={0.5}
                />
              )
            })
            }
          </Group>
          { !this.props.static && <ResizeImg  canMove={this.canMove} />}
        </Layer>
      </Stage>
    )
  }
}

const SCanvas = styled(Canvas)`
  border: solid thin black;
  width: 100%;
  height: 100%;
`;


export default SCanvas