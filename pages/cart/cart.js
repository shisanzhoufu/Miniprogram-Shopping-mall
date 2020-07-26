import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWX.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false
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
    const cart = wx.getStorageSync("cart")||[]

    this.setCart(cart)

    this.setData({
      address
    })
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

  //  wx.getSetting({
  //   success:res=>{
  //    const scopeAddress = res.authSetting["scope.address"] 
  //     // 权限打开或者还未调用过 
  //    if(scopeAddress===true||scopeAddress===undefined){
  //      // 调用地址
  //       wx.chooseAddress({
  //       success:res1=>{
  //         console.log(res1)
  //         }
  //       }) 
  //    }else{
  //     // 引导用户打开地址权限
  //      wx.openSetting({
  //       success:res2=>{
  //         // 调用地址
  //          wx.chooseAddress({
  //          success:res3=>{
  //            console.log(res3)
  //             }
  //           })
  //         }
  //       })
  //     } 
  //   }
  // }) 
 },
 handleItemChange(e){
  //  console.log(e)
   let goods_id = e.currentTarget.dataset.id
  //  console.log(goods_id)
   let {cart} = this.data
   let index = cart.findIndex(v=>v.goods_id===goods_id)
  //  console.log(index)
   cart[index].checked=!cart[index].checked
  
   this.setCart(cart)
 },

//  修改购物车总价数量，是否选中
 setCart(cart){
  let allChecked = true
  // 计算选中商品数量和价格
  let totalPrice = 0
  let totlalNum = 0
  cart.forEach(v=>{
    if(v.checked){
    totalPrice += v.goods_price*v.num
    totlalNum += v.num
    }else{
      allChecked = false
    }
  })
  // 判断数组是否为空
  allChecked = cart.length!=0?allChecked:false
  this.setData({
    cart,
    totalPrice,
    totlalNum,
    allChecked
  })
  wx.setStorageSync("cart",cart)
 },

//  全选和反选
 handleItemAllCheck(){
  //  获取data中的值
   let {cart,allChecked} = this.data
  //  checked取反
   allChecked = !allChecked
  //  循环修改数组中的checked属性
   cart.forEach(v=>v.checked = allChecked)
  //  把新cart存入缓存中
   this.setCart(cart)
 },

//  修改商品数量
 async handleChangeNum(e){
   let {id,opration} = e.currentTarget.dataset
   let {cart} = this.data
   let index = cart.findIndex(v=>v.goods_id===id)

  //  判断商品数量是否减到0了要删除
  if(cart[index].num===1&&opration==-1){
    let content = "是否将该商品移出购物车？"
    let res = await showModal({content})
    if(res.confirm==true){
      cart.splice(index,1)
      this.setCart(cart)
    }
  }else{
    cart[index].num += opration
    this.setCart(cart)
  }
 },

//  支付按钮
 async handlePay(){
   let {totlalNum,address} = this.data
   let userInfo = wx.getStorageSync('userInfo')
   if(!address){
     await showToast({title:"请填写地址哦"})
   }else if(totlalNum===0){
    await showToast({title:"请选择商品哦"})
   }else if(!userInfo){
     wx.navigateTo({
       url: '/pages/login/login',
     })
   }else{
     wx.navigateTo({
       url: '/pages/pay/pay',
     })
   }
 }
})