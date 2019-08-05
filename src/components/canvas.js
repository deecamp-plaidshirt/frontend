import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Stage, Layer, Rect, Text, Circle, Image } from 'react-konva';
import Konva from 'konva';


function FRect(props){
  let rect;

  const changeSize = () => {
    // to() is a method of `Konva.Node` instances
    rect.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2
    });
  };

  return(
    <Rect
      ref={node => {
        rect = node;
      }}
      width={50}
      height={50}
      fill="red"
      draggable
      onDragEnd={changeSize}
      onDragStart={changeSize}
    />
  )
}


function Canvas(props){

  let circle;
  let lastDist = 0;
  let layer;
  let imageNode;
  let [img, setimg] = useState("")
  let last_pos = [0, 0];

  const touchend = ()=>{
    lastDist = 0
  }

  useEffect(() => {
    const image = new window.Image();
    image.src = props.img_url;
    image.onload = () => {
      setimg(image)
    };
  })
  const [color, setcolor] = useState("green")
  const [activate, setactivate] = useState(true)
  const [stroke, setstroke] = useState("black")
  const [opacity, setopacity] = useState(1)
  let [strokeWidth, setstrokeWidth] = useState(10)

  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  const handleClick = () => {
    setcolor(Konva.Util.getRandomColor())
  }

  const canMove = ()=>{
    setactivate(!activate)
    setstroke(activate?"blue":"black")
    setopacity(activate?0.5:1)
  }

  const touchscale = (e) =>{
    //console.log(e)
    
    const evt = e.evt
    //console.log("tapped")
    
      let touch1 = evt.touches[0];
      let touch2 = evt.touches[1];
  
      if (touch1 && touch2) {
        var dist = getDistance(
          {
            x: touch1.clientX,
            y: touch1.clientY
          },
          {
            x: touch2.clientX,
            y: touch2.clientY
          }
        );
  
        if (!lastDist) {
          lastDist = dist;
        }
  
        var scale = (imageNode.scaleX() * dist) / lastDist;
        console.log(scale)
        imageNode.scaleX(scale);
        imageNode.scaleY(scale);
        circle.scaleX(scale);
        circle.scaleY(scale);
        layer.draw();
        lastDist = dist;
      }
  }

  const dragmove = (e)=>{
    console.log(e)
    let x = imageNode.attrs.x, y = imageNode.attrs.y;
    let mx = x-last_pos[0], my = y - last_pos[1];
    console.log(circle)
    circle.setAttrs({
      x: x + mx,
      y: y + my
    })
    console.log(mx, my);
  }

  const dragend = (e)=>{
    last_pos = [e.evt.clientX, e.evt.clientY];
  }

  return(
    <Stage 
      width={window.innerWidth*0.95} 
      height={window.innerHeight*0.75}
      className={props.className}
      onTouchMove={touchscale}
      onTouchEnd={touchend}
    >
    <Layer 
      ref={node => layer=node }
    >
      
      <Image
        x={0}
        y={0}
        image={img}
        ref={node => {
          imageNode = node;
        }}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
        draggable={activate}
        onDblTap={canMove}
        onTouchMove={touchscale}
        onTouchEnd={touchend}
        onDragMove={dragmove}
        onDragEnd={dragend}
      />  
      <Circle
        ref={ node =>
          circle = node
        }
        radius={30}
        fill="green"
        draggable
        stroke='black'
        x={0}
        y={0}
        zIndex={10}
      />
    </Layer>
  </Stage>

  )
}

const SCanvas = styled(Canvas)`
  border: solid thin black;
`;

export default SCanvas