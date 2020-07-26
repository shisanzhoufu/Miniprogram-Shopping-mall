import {request} from "../../request/index.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */

onShow: function (options) {
    // 获取页面栈
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let option = currentPage.options
    let {goods_id} = option
    // console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },
  // 获取商品信息
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}})

    // 获取商品收藏状态是否选中
    let res = wx.getStorageSync('collect')||[]
    let isCollect = res.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 修改webp图片格式
        goods_introduce:goodsObj. goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },

  handlePrevewImage(e){
    let urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    // console.log(e)
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      current, 
      urls
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    // 查看本地存储
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      // 第一次添加购物车
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      // 非第一次添加，商品数量加1
      cart[index].num++
    }
    wx.setStorageSync("cart",cart)
    // 加入成功提示
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mask: true,
      complete: (res) => {},
      fail: (res) => {},
      success: (res) => {},
    })
  },
  // 点击收藏
  handleCollect(){
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect')||[]
    // 判断商品是否收藏过
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    // 当index=-1表示未收藏
    if(!index==-1){
      // 在收藏数组中删除该商品
      collect.splice(index,1)
      isCollect = false
    }else{
      collect.push(this.GoodsInfo)
      isCollect = true
    }
    // 数组存入缓存
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  
})