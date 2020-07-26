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
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        value:"浏览足迹",
        isActive:false
      }
    ],
    collect:[]
  },

  onShow(){
    let collect = wx.getStorageSync("collect")
    this.setData({
      collect
    })
  },
  onLoad: function (options) {

  },
  // 切换tab标题
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
})