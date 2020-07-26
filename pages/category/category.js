import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  data: {
    // 菜单栏数据
    leftManuList:[],
    // 商品数据
    rightContent:[],
    // 被点击的菜单栏选项
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],

  onLoad: function (options) {

    /*
    1 获取本地存储
    2 判断
        1 不存在 
             -发送请求
             -获取数据存入本地
        2 存在 
             -定义过期时间
                 - 超过重发请求
                 -直接使用
    */
     
    const Cates = wx.getStorageSync("cates")

    if(!Cates){
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*300){
        this.getCates()
      }else{
        this.Cates = Cates.data
        let leftManuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftManuList,
          rightContent
              })
      }
    }
  },


  // 获取分类列表
  async getCates(){
    // request({
    //   url: '/categories',
    // }).then(res=>{

    //   this.Cates = res.data.message

    //   // 把获取到底数据存入缓存中
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

    //   let leftManuList = this.Cates.map(v=>v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftManuList,
    //     rightContent
    //         })
    // })

    const res = await request({url:"/categories"})
    this.Cates = res

    // 把获取到底数据存入缓存中
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

    let leftManuList = this.Cates.map(v=>v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftManuList,
      rightContent
          })
  }, 
  // 点击切换左侧菜单栏 
  currentItem(e){
    // console.log(e)
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})