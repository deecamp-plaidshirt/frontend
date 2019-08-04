import React, {useState} from 'react'
import styled from 'styled-components'
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

function Canvas(props){
  const [color, setcolor] = useState("green")

  const handleClick = () => {
    setcolor(Konva.Util.getRandomColor())
  }

  return(
    <Stage width={100} height={100}>
    <Layer>
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={color}
        draggable
        shadowBlur={5}
        onClick={handleClick}
        className={props.className}
      />
    </Layer>
  </Stage>

  )
}

const SCanvas = styled(Canvas)`
  width: 100px;
  height: 100px;
`;

export default SCanvas