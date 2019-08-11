import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const notFound = styled((props)=>{
  return(
    <div className={props.className}>
      <h1>Sorry</h1>
      <p>
        This app is just a demo
      </p>
      <p>
        It still needs more time
      </p>
      <p id="lastword">
        Try other features
      </p>
    </div>
  )
})`
  width: 100%;
  height: 100%;
  h1{
    margin-top: 15vh;
    color: white;
    font-weight: bold;
  }
  p{
    color: white;
    font-size: 2rem;
    font-weight: 600;
  }
  #lastword{
    ::after{
      content: ":)";
      color: red;
      font-size: 3rem; 
    }
  }
`;

export default notFound