import {Button } from '../styled/styled'
import styled from 'styled-components'
import React, {useState} from 'react'
import {Upload} from 'antd'
import {get, post} from '../utils/api'
import Canvas from './newcanvas'



const StyledUpload = styled.div`
  font-size: 20px;
  width: 200px;
  background-color: ${props => props.warning ? 'red' : '#4e9af1'}
  background-color: ${props => props.primary ? 'green' : '#4e9af1'}
  display:inline-block;
  padding:0.3em 1.2em;
  margin:1vh 0.1em 0.1em 0;
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
  width: 90vw;
  height: 75vh;
  object-fit: contain;
  margin-bottom: 30px;
`;

function TakePhoto(props){
  const base_url = 'http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/'

  const [url, setUrl] = useState("")
  let [image, setImage] = useState("")
  const handleChange = ()=>{
    console.log("photo")
  }

  const uploadFile = async ({file})=>{
    //console.log(file)
    let tmp = URL.createObjectURL(file)
    setUrl(tmp)
    console.log(tmp)
    
    //const res = await get('http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/')
    //console.log(res)
    //URL.revokeObjectURL(tmp)

    let tmpimg = new window.Image();
    tmpimg.src = tmp;
    setImage(tmpimg)
    //let file = e.target.files[0];           
    let param = new FormData(); //创建form对象
    param.append('file',file);//通过append向form对象添加数据
    param.append('chunk','0');//添加form表单中其他数据
    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    /*
    const res = await post(base_url+'img', param, {
      headers:{'Content-Type':'multipart/form-data'}
    })
    console.log(res)
    */

  }
//"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg"
  return(
    <div className={props.className}>
      <Canvas img_url={url}/>
      <Upload 
        onChange={handleChange}
        showUploadList={false}
        customRequest={uploadFile}
      >
        <StyledUpload primary>Upload</StyledUpload>
      </Upload>
    </div>
  )
}

const STakePhoto = styled(TakePhoto)`
  display: flex;
  flex-direction: column;
`;

export default STakePhoto;