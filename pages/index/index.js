import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"

Page({
  data: {
    // 轮播图数组
    swiperList:[],
    gridList:[],
    floorList:[]
  },

  // 获取轮播图数据
  async getSwiperRequst(){
    const res = await request({url:"/home/swiperdata"})
      this.setData({
              swiperList:res
            })
  },
  // 获取导航数据
  async getGridRequst(){
    const res = await request({url:"/home/catitems"})
    
      this.setData({
              gridList:res
            })
  },
  // 获取楼层数据
  async getFloorRequst(){
    const res = await request({url:"/home/floordata"})
      this.setData({
        floorList:res
            })
    
  },
   

  onLoad: function (options) {
   
    this.getSwiperRequst()
    this.getGridRequst()
    this.getFloorRequst()
  }

})