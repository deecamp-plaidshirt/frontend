import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Stage, Layer, Rect, Text, Circle, Image, Group } from 'react-konva';
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
  let group//, setGroup] = useState(undefined);
  let [lastDist, setLastDis] = useState(0);
  let [layer, setLayer] = useState(undefined);
  let imageNode;
  let [img, setimg] = useState("")
  let distance = [0, 0];

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
  const [last_pos, setlast_pos] = useState([0, 0])
  let [strokeWidth, setstrokeWidth] = useState(10)

  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  const canMove = ()=>{
    setactivate(!activate)
    setstroke(activate?"blue":"black")
    setopacity(activate?0.5:1)
  }

  const touchscale = (e) =>{
    const evt = e.evt
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
        setLastDis(dist);
      }

      var scale = (group.scaleX() * dist) / lastDist;
      //imageNode.scaleX(scale);
      //imageNode.scaleY(scale);
      //circle.scaleX(scale);
      //circle.scaleY(scale);
      group.scaleX(scale)
      group.scaleY(scale)
      setLastDis(dist);
    }
  }

  const dragmove = (e)=>{
    //console.log(e)
    let x = imageNode.attrs.x, y = imageNode.attrs.y;
    let mx = x - last_pos[0], my = y - last_pos[1];
    circle.setX(circle.attrs.x + mx)
    circle.setY(circle.attrs.y + my)
    setlast_pos([x, y])
  }

  const dragend = (e)=>{
    console.log("drag end")
  }

  //onTouchMove={touchscale}
  //onTouchEnd={touchend}
  return(
    <Stage 
      width={window.innerWidth*0.95} 
      height={window.innerHeight*0.75}
      className={props.className}
    >
      <Layer 
        ref={node => setLayer(node) }
      >

        <Group
          ref={node => group = node }
          onTouchMove={touchscale}
          onTouchEnd={touchend}
          opacity={opacity}
          draggable={activate}
          onDblTap={canMove}
        >
          <Image
            image={img}
            ref={node => {
              imageNode = node;
            }}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
            //draggable={activate}
            //onDblTap={canMove}
            //onDragMove={dragmove}
            //onDragEnd={dragend}
          />
          <Circle
            ref={ node =>
              circle = node
            }
            radius={30}
            fill="green"
            //draggable
            stroke='black'
          />
        </Group>
      </Layer>
    </Stage>
  )
}

const SCanvas = styled(Canvas)`
  border: solid thin black;
`;

export default SCanvas