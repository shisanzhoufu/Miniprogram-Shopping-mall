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
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
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
  onShow(options){
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
    // 获取当前小程序的页面栈-数组，最大长度为10
    let pages = getCurrentPages()
    // 数组中，索引最大的页面就是当前页面
    let currentPage = pages[pages.length-1]
    console.log(currentPage.options)
    const {type} = currentPage.options
    this.getOrders(type)
  },
  async getOrders(type){
    let Authorization = wx.getStorageSync('token') 
    let res = await request({url:"/my/orders/all",data:{type},header:{Authorization}})
    // console.log(res)
  }
})