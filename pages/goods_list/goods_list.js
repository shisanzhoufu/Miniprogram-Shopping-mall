import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodList:[]
  },

  queryPramas:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类页传过来的cid
    console.log(options)
    this.queryPramas.cid = options.cid||""
    // this.queryPramas.cid = 55

    this.queryPramas.query = options.query||""
    this.getGoodsList()
   
  },

  // 获取商品列表
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.queryPramas})
    // console.log(res)
    const total = res.total
    this.totalPages = Math.ceil(total/this.queryPramas.pagesize)
    // console.log(this.totalPages)
    this.setData({
      goodList:[...this.data.goodList,...res.goods]
    })

    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh()
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
  onReachBottom(){
    if(this.queryPramas.pagenum>=this.totalPages){
      // console.log("没有数据了")
      wx-wx.showToast({
        title: '到底了～～',
      })
    }else{
      this.queryPramas.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh: function () {
    // 1. 清除数据
    this.setData({
      goodList:[]
    })
    // 2.页码为1
    this.queryPramas.pagenum=1
    // 3.重新访问
    this.getGoodsList()
  }

})