import {Button } from '../styled/styled'
import styled from 'styled-components'
import React, {useState} from 'react'
import {Upload} from 'antd'


const StyledUpload = styled.div`
  font-size: 20px;
  width: 200px;
  background-color: ${props => props.warning ? 'red' : '#4e9af1'}
  background-color: ${props => props.primary ? 'green' : '#4e9af1'}
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.1em 0.1em 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:0.5em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:500;
  color:#FFFFFF;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  :hover{
    border-color: rgba(0,0,0,1);
  }
  :active{
    box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.5),inset 0 0 0em 0.05em rgba(255,255,255,0.3);
  }
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

function TakePhoto(props){

  const [url, setUrl] = useState("")
  const handleChange = ()=>{
    console.log("photo")
  }

  const uploadFile = ({file})=>{
    let tmp = URL.createObjectURL(file)
    setUrl(tmp)
    console.log(tmp)
    //URL.revokeObjectURL(tmp)
  }

  return(
    <div className={props.className}>
      <Upload 
        onChange={handleChange}
        showUploadList={false}
        customRequest={uploadFile}
      >
        <StyledUpload primary>Upload</StyledUpload>
      </Upload>
      <Img src={url} alt="" id="show-picture"></Img>
    </div>
  )
}

const STakePhoto = styled(TakePhoto)`
  display: flex;
  flex-direction: column;
`;

export default STakePhoto;