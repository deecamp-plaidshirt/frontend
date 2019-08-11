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
import {withRouter} from 'react-router-dom'
import EXIF from 'exif-js';
import Canvas from './newcanvas'
import back_img from '../resources/back.png'

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
    content: {
      title: "评分记录",
      text: "7-29 得分：90分"
    },
    off_x: 5.5,
    w: 6,
    h: 4.5,
    rotate:30
  },
  {
    content: {
      title: "评分记录",
      text: "7-30 得分：85分"
    },
    off_x: -5.5,
    w: 5.5,
    h: 4,
    rotate:-30
  },
  {
    content: {
      title: "评分记录",
      text: "8-1 得分：90分"
    },
    off_x: 4.5,
    w: 5,
    h: 3.5,
    rotate:30
  },
  {
    content: {
      title: "评分记录",
      text: "8-5 得分：90分"
    },
    off_x: -3.5,
    w: 4.5,
    h: 3.2,
    rotate:-30
  },
  {
    content: {
      title: "评分记录",
      text: "8-8 得分：95分"
    },
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

const WaitingMask =  styled((props)=>{

  const [isUploading, setuploading] = useState(false)
  const [rects, setrects] = useState(undefined)

  const sendImg = async ()=>{
    setuploading(true)

    //const base_url = 'https://jupyter-uaitrain-bj2.ucloud.cn:443/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/'
    const base_url = 'http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/'
    let tmp = props.img
    let tmpimg = new window.Image();
    tmpimg.src = tmp;
    //let file = e.target.files[0];           
    let param = new FormData(); //创建form对象
    param.append('file',props.imgFile);//通过append向form对象添加数据
    param.append('chunk','0');//添加form表单中其他数据
    //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

    const res = await post(base_url+'img', param, {
      headers:{'Content-Type':'multipart/form-data'}
    })
    //console.log(res.data.data)
    setrects(res.data.data)

    props.cancel()
    //console.log("before forward", rects)
    props.forward(props.img, res.data.data)

    /*
    setTimeout(() => {
      setuploading(false)
      props.cancel()
      props.forward(props.img)
      //props.history.push(`/photo`)
    }, 3000);
    */
  }


  return(
    <div className={props.className}>
      {isUploading && <div id="upmask"><img src={up_mask} alt="uplaodmask"></img></div>}
      <Canvas width={window.innerWidth * 0.95} height={window.innerHeight*0.75} static={props.static} 
              id="load-img" rotate={props.rotate} img_url={props.img}
              //rects={rects}
              />
      <div>
        <StyledButton onClick={()=>sendImg()}>翻译</StyledButton>
        <StyledButton primary onClick={()=>sendImg()}>批改</StyledButton>
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
    height: 100%;
    width: 100%;
    background-color: rgba(50, 50, 50, 0.5);
    z-index: 105;
    position: fixed;
    img{
      width: 14rem;
      height: 10rem;
      position: fixed;
      z-index: 105;
      object-fit: contain;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0.2rem 0.2rem 0.3rem 0.3rem rgba(80, 80, 80, 0.2);
      border-radius: 2rem;
    }
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

const WaitingMaskWithRouter = withRouter(WaitingMask)

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
    height: 10vh;
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

const Navigator = styled((props)=>{

  const toggle  =(content)=>{
    props.toggle(content)
  }

  const goback = ()=>{
    props.goback()
  }
  return(
    <div className={props.className} >
      <div id="goback">
        <img src={back_img} alt="back" onClick={goback}/>
        <h3>Photo page Navigator</h3>       
      </div>
      <div id="navcanvas">
        <Canvas  toggle={toggle} rects={props.rects} width={window.innerWidth} height={window.innerHeight*0.9} rotate={props.rotate} img_url={props.img}/>
      </div>
    </div>
  )
})`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 100vw;
  background-color: white;
  transform: translateX(${props=>props.navigate?'-100vw':0});
  transition: 1s;
  z-index: 1000;
  
  #goback{
    display: flex;
    width: 100%;
    height: 10%;
    flex-direction: row;
    background-color: rgba(244,186,27,1);
    font-size: 1rem;
    justify-content: center;
    left: 1rem;
    border-bottom: solid thin black;
    img{
      position: fixed;
      margin: 0;
      left: 0;
      top: 0.5rem;
      width: 3rem;
      height: 3rem;
    }
  }
  #navcanvas{
    position: fixed;
    width: 100%;
    height: 90%;
    object-fit: contain;
    background-color: rgba(244,186,27,1);
  }
`;

function MainPage(props){
  //const base_url = 'http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/'
  const base_url = 'http://106.14.5.161:8081/ocr/'

  const [url, setUrl] = useState("")
  const [rotate, setrotate] = useState(0)
  let [image, setImage] = useState("")
  const [imgfile, setFile] = useState(undefined)
  const handleChange = ()=>{
    
    //console.log("photo")
  }

  const uploadFile = async ({file})=>{
    //cancel()
    //console.log(file)
    let tmp = URL.createObjectURL(file)
    setUrl(tmp)
    //console.log(tmp)

    cancel(true)
    
    //const res = await get('http://106.75.34.228:82/infer-a4b9c6a7-30b2-4159-8cbb-1a8897768e28/')
    //console.log(res)
    //URL.revokeObjectURL(tmp)

    EXIF.getData(file, function(){
      var _dataTxt = EXIF.pretty(this);
      var _dataJson = JSON.stringify(EXIF.getAllTags(this));
      let _rotate = 0;
      let _orientation = EXIF.getTag(this, 'Orientation');

      if (_orientation === 3) {
          _rotate = 180;
        } else if (_orientation === 6) {
          _rotate = 90;
        } else if (_orientation === 8) {
          _rotate = 270;
      };
      setrotate(_rotate)

      //console.log(_rotate)
      //console.log(_dataJson)
      //console.log(_dataTxt)
      //alert(_orientation)
    })

    setFile(file)
    /*
    let tmpimg = new window.Image();
    tmpimg.src = tmp;
    setImage(tmpimg)
    //let file = e.target.files[0];           
    let param = new FormData(); //创建form对象
    param.append('file',file);//通过append向form对象添加数据
    param.append('chunk','0');//添加form表单中其他数据
    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    */
    /*
    const res = await post(base_url+'img', param, {
      headers:{'Content-Type':'multipart/form-data'}
    })
    console.log(res.data.data)
    let str = res.data.data.map(item=>{
      return item
    }).reduce((accumulator, currentValue)=>{
      return accumulator+=currentValue
    })
    console.log(str)
    let words = JSON.parse(str)
    console.log(words.data.block)
    let lines = words.data.block
    let results = lines.map(item=>{
      item.line.word.map(l=>{
        return l.content
      }).reduce((acc, curr)=>{
        return acc + curr
      })
    })
    console.log(results)
    */
    

  }
  const [open, setopen] = useState(false)
  const [content, setcontent] = useState("hello drawer")
  const [fopen, setfopen] = useState(false)
  const [uploading, setuploading] = useState(false)
  const [needmask, setneedmask] = useState(true)
  const [navigate, setnavigate] = useState(false)
  const [navigateImg, setNavigateImg] = useState('')
  const [rects, setRects] = useState(undefined)

  const toggle = (content)=>{
    openDrawer(content)
  }

  const openDrawer = (content)=> {
    setopen(!open)
    if(!content){
      content={title: "", text: ""}
    }
    setcontent(content)
    setfopen(false)
  }

  const fullopen = ()=>{
    //console.log("fullopen")
    setfopen(!fopen)
  }

  const cancel = (bool)=>{
    setuploading(bool)
  }
  const goback = ()=>{
    setnavigate(false)
  }
  const forward = (img, rects)=>{
    setnavigate(true)
    setNavigateImg(img)
    setRects(rects)
    //console.log('forward',rects)
  }

  const checkRotation = ()=> {
    //console.log("check rotation")
    EXIF.getData(this.imgEle, () => { 
      EXIF.getTag(this.imgEle, 'Orientation')
    })
  }

//"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg"
  return(
    <div className={props.className}>
      <SDDrawer fullopen={fullopen} content={content} fopened={fopen?"fopen":undefined} opened={open?"open":undefined} toggle={toggle}/>
      <WaitingMaskWithRouter imgFile={imgfile} static={true} rotate={rotate} img={url} uploading={uploading} cancel={cancel} forward={forward}/>
      <Navigator toggle={toggle} rects={rects} imgFile={imgfile} rotate={rotate} static={false} navigate={navigate} goback={goback} img={navigateImg}/>
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