import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWX.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    // 获取缓存的地址信息
    const address = wx.getStorageSync("address")
    // 获取购物车数据
    let cart = wx.getStorageSync("cart")||[]
    // 过滤获取购物车选中商品
    cart = cart.filter(v=>v.checked)

  // 计算选中商品数量和价格
  let totalPrice = 0
  let totlalNum = 0
  cart.forEach(v=>{
    totalPrice += v.goods_price*v.num
    totlalNum += v.num
  })

  this.setData({
    cart,
    totalPrice,
    totlalNum,
    address
  })
},
handleOderPay(){
  // 获取token
  const token = wx.getStorageSync("token")
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/auth',
    })
    return
  }else{
    wx.showToast({
      title: '支付成功',
    })
    let cart = wx.getStorageSync('cart')
    cart = cart.filter(v=>!v.checked)
    wx.setStorageSync('cart', cart)
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
  
},
// 获取用户地址
async handleChooseAddress(){
  try {
    //  查看调用地址权限
  let res = await getSetting()
  // console.log(res)
  const scopeAddress = res.authSetting["scope.address"]

  // 当权限关闭时
  if(scopeAddress===false){
    // 引导用户打开地址权限
    await openSetting()
  }
  
  // 否则调用地址
  let address = await chooseAddress()
  // 地址拼接
  address.all= address.provinceName+address.cityName+address.countyName+address.detailInfo
  // console.log(address)
    // console.log(res1)
    wx.setStorageSync("address",address)

  } catch (error) {
    console.log(error) 
  }
}

})