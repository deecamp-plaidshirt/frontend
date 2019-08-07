import {Button } from '../styled/styled'
import styled from 'styled-components'
import React, {useState} from 'react'
import {Upload} from 'antd'
import {get, post} from '../utils/api'
import DDrawer from './carddrawer'
import logo_img from '../resources/logo.png'
import read_img from '../resources/reading.png'
import env_img from '../resources/env.png'
import line_img from '../resources/line.png'

const Header = styled(function Head(props){
  return(
    <div className={props.className}> 
      <img src={logo_img} alt="logo"></img>
      <div>
        <h3>ALINE 轻松学英语</h3>
      </div>
    </div>
    
  )
})`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 30vh;


  img{
    width: 8rem;
    height: 8rem;
    object-fit: contain;
  }

  div{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div > h3{
    color:white;
    font-weight: 400;
  }

  div > h3::after{
    content:'';
    background-image:url(${read_img});
    background-size: 6rem 5rem;
    position: absolute;
    width:6rem;
    height:5rem;
    transform: translate(-1.3rem, -1.5rem);
  }
`;

const envs = [
  {
    content: "hello",
    off_x: 5.5,
    w: 6,
    h: 4.5,
    rotate:30
  },
  {
    content: "wsf",
    off_x: -5.5,
    w: 5.5,
    h: 4,
    rotate:-30
  },
  {
    content: "helsflo",
    off_x: 4.5,
    w: 5,
    h: 3.5,
    rotate:30
  },
  {
    content: "sdfd",
    off_x: -3.5,
    w: 4.5,
    h: 3.2,
    rotate:-30
  },
  {
    content: "qew",
    off_x: 3,
    w: 4,
    h: 2.8,
    rotate:30
  }
]

const Envs = styled((props)=>{

  return(
    <div className={props.className}>
      {
        props.envs && props.envs.map((item, index)=>{
          return(
            <div key={item.off_x}>
              <img style={{
                transform: `translateX(${item.off_x}rem) rotate(${item.rotate}deg)`,
                width: `${item.w}rem`,
                height: `${item.h}rem`,
                }} src={env_img} alt={item.content}>
              </img>
            </div>
          )
        })
      }
    <img alt="line" src={line_img}></img>
    </div>
  )
})`
  width: 100vw;
  height: 50vh;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    width: 6rem;
    height: 4rem;
  }

  img{
    object-fit: contain;
    width: 100vw;
    height: 15vh;
    transform: translateY(-3rem);
  }
`;

const StyledUpload = styled.div`
  font-size: 20px;
  width: 200px;
  background-color: white;
  display:inline-block;
  padding:0.3em 1.2em;
  margin:1vh 0.1em 0.1em 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:0.5em;
  box-shadow: 0.4em 0.4em 0.4em rgba(209, 159, 21, 0.87);
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:500;
  color:#f4ba1b;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  :hover{
    border-color: rgba(209, 159, 21, 0.87);
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

const SDDrawer = styled(DDrawer)`
  width: 90%;
  height: 100%;
`

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
  const [open, setopen] = useState(false)
  const [content, setcontent] = useState("hello drawer")
  const [fopen, setfopen] = useState(false)

  const toggle = (content)=>{
    openDrawer(content)
  }

  const openDrawer = (content)=> {
    setopen(!open)
    setcontent(content)
    setfopen(false)
  }

  const fullopen = ()=>{
    console.log("fullopen")
    setfopen(!fopen)
  }

//"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg"
  return(
    <div className={props.className}>
      <Header/>
      <Envs envs={envs}/>
      <Upload 
        onChange={handleChange}
        showUploadList={false}
        customRequest={uploadFile}
      >
        <StyledUpload primary>拍照</StyledUpload>
      </Upload>
    </div>
  )
}

const STakePhoto = styled(TakePhoto)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 90%;
`;

export default STakePhoto;