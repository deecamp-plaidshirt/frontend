import {StyledButton } from '../styled/styled'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Upload} from 'antd'
import {get, post} from '../utils/api'
import DDrawer from './carddrawer'
import logo_img from '../resources/logo.png'
import read_img from '../resources/reading.png'
import env_img from '../resources/env.png'
import line_img from '../resources/line.png'
import up_mask from '../resources/upmask.png'

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

const envMask = styled((props)=>{
  return(
    <div className={props.className}>
      {props.children}
    </div>
  )
})`


`;

const WaitingMask = styled((props)=>{

  useEffect(()=>{
    setTimeout(() => {
      setuploading(false)
    }, 5000);
  })

  const cancel = ()=>{
    props.cancel()
  }

  const [isUploading, setuploading] = useState(true)


  return(
    <div className={props.className}>
      {isUploading && <img id="upmask" src={up_mask} alt="uplaodmask"></img>}
      <img id="load-img" src={props.img} alt="uploaded"></img>
      <div>
        <StyledButton onClick={cancel}>翻译</StyledButton>
        <StyledButton primary onClick={cancel}>批改</StyledButton>
      </div>
    </div>
  )
})`
  position: fixed;
  width: 100%;
  height:100%;
  z-index:100;
  background-color:rgba(100, 100, 100, ${props=>props.uploading?0.6:0});
  display:${props=>props.uploading?'flex':'none'};
  flex-direction: column;
  align-items:center;
  justify-content: center;
  opacity: 1

  #upmask{
    width: 80%;
    height: auto;
    position: fixed;
    z-index: 105;
    object-fit: contain;
  }

  #load-img{
    width: 80%;
    height: 70%;
    background-color: white;
    opacity: 1
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 2.5rem 1rem rgba(80, 80, 80, 0.6)
    object-fit: contain;
  }
  div{
    width: 100%;
    height: auto;
    display:flex;
    margin-top: 1rem;
    flex-direction: row;
    align-items:center;
    justify-content: space-around;
    opacity: 1
  }
  div > div{
    width: 40%;
  }
`;

const Envs = styled((props)=>{

  const openCard = (content)=>{
    props.toggle(content)
  }

  return(
    <div className={props.className}>
      {
        props.envs && props.envs.map((item, index)=>{
          return(
            <div key={item.off_x}>
              <img onClick={()=>openCard(item.content)} style={{
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
  height: 48vh;
  opacity: 1;
  display: flex;
  margin-top: 2vh;
  flex-direction: column;
  align-items: center;
  div{
    width: 6rem;
    height: 4rem;
  }

  img{
    object-fit: contain;
    width: 100vw;
    height: auto;
    transform: translateY(-3rem);
  }
`;

const StyledUpload = styled.div`
  font-size: 20px;
  width: 200px;
  background-color: white;
  display:inline-block;
  padding:0.3em 1.2em;
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
  width: 100%;
  height: 100%;
`

function MainPage(props){
  const base_url = 'http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/'

  const [url, setUrl] = useState("")
  let [image, setImage] = useState("")
  const handleChange = ()=>{
    
    console.log("photo")
  }

  const uploadFile = async ({file})=>{
    //cancel()
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

    cancel()

  }
  const [open, setopen] = useState(false)
  const [content, setcontent] = useState("hello drawer")
  const [fopen, setfopen] = useState(false)
  const [uploading, setuploading] = useState(false)

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

  const cancel = ()=>{
    setuploading(!uploading)
  }

//"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg"
  return(
    <div className={props.className}>
      <SDDrawer fullopen={fullopen} content={content} fopened={fopen?"fopen":undefined} opened={open?"open":undefined} toggle={toggle}/>
      <WaitingMask img={url} uploading={uploading} cancel={cancel}/>
      <Header/>
      <Envs toggle={toggle} envs={envs}/>
      <div id="upload">
        <Upload 
          
          onChange={handleChange}
          showUploadList={false}
          customRequest={uploadFile}
        >
          <StyledUpload primary>拍照</StyledUpload>
        </Upload>
      </div>

    </div>
  )
}

const SMainPage = styled(MainPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  #upload{
    width: 100vw;
    height: 20vh;
  }
`;

export default SMainPage;