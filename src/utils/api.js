import axios from 'axios'

const get = async (url)=>{
  return await axios.get(url)
}

const post = async (url, data, config) =>{
  return await axios.post(url, data, config)
}


/*

          let file = e.target.files[0];           
          let param = new FormData(); //创建form对象
          param.append('file',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头
          this.axios.post('http://upload.qiniu.com/',param,config)
          .then(response=>{
            console.log(response.data);
          })      
*/

export {
  get,
  post
}