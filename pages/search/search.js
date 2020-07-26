import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  
  data: {
    goods:[],
    isFoucs:false,
    inputValue:''
  },
  handleSearch(e){
    timeId : -1;
    // 获取输入框的值
    const {value} = e.detail
    // console.log(value)
    // 检测输入合法性
    if(!value.trim()){
      this.setData({
        inputValue:'',
        goods:[]
      })
      return
    }
    this.setData({
      isFoucs:true
    })
    // 防抖，控制输入时访问数据库的速度
    clearTimeout(this.timeId)
    this.timeId=setTimeout(()=>{
      // 准备发送请求获取数据
      this.qsearch(value)
    },1000)
    
  },
  async qsearch(query){
    let res = await request({url:"/goods/qsearch",data:{query}})
    // console.log(res)
    this.setData({
      goods : res
    })
  },
  handledel(){
    this.setData({
      inputValue:'',
      goods:[],
      isFoucs:false
    })
  }
})