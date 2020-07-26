import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    chooseImg:[],
    // 文本框输入值
    textVal:''
  },
// 上传图片外网地址
imgList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleTabsItemChange(e){
    // console.log(e)
    // 1.获取标题索引
    const {index} = e.detail
    // 2.修改源数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3.赋值到data中
    this.setData({tabs})
  },
// 上传图片
handleChooseImg(){
  wx.chooseImage({
  count: 9,
  // 照片原图还是压缩
  sizeType: ['original', 'compressed'],
  // 图像来源：照相机or相册
  sourceType: ['album', 'camera'],
  success:(res) =>{
    // tempFilePath可以作为img标签的src属性显示图片
    this.setData({
      chooseImg:[...this.data.chooseImg,...res.tempFilePaths]
    })
    // console.log(res)
  }
})
},
// 删除预览图片
handleDelImg(e){
  let {index} = e.currentTarget.dataset
  // console.log(index)
  let {chooseImg} = this.data
  chooseImg.splice(index,1)
  this.setData({
    chooseImg
  })
},
// 上传文本框内容
handleTextInput(e){
  let textVal=e.detail.value
  this.setData({
    textVal
  })
},
// 按钮点击事件
handleFormSubmit(){
  let {textVal} = this.data
  if(!textVal.trim()){
    wx.showToast({
      title: '提交失败',
      mask:true,
      icon:"none"
    })
    return
  }
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  let {chooseImg} = this.data
  if(chooseImg.length!==0){
    
    chooseImg.forEach((v,i)=>{
      // console.log(filePath)
      wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        filePath: v,
        name: 'file',
        success: res => {
          // console.log(JSON.parse(res.data).data.url)
          // console.log(res)
          // let url = JSON.parse(res.data).url
          let url = res.data.url
          // console.log(url)
          this.imgList.push(url)
        } 
      })
      if(i===chooseImg.length-1){
        wx.hideLoading()

        this.setData({
          textVal:'',
          chooseImg:[]
        })
        wx.navigateBack({
          delta:1
        })
      }
    })
  }else{
    wx.hideLoading()
    console.log("只是提交了文本")
    wx.navigateBack({
      delta:1
    })
  }
    
  }
})