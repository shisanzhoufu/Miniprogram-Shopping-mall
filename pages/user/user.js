// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')  
    let collectNum = wx.getStorageSync('collect')||[]
    this.setData({
      userInfo,
      collectNum:collectNum.length
    })
  },
  onShow(){
    let userInfo = wx.getStorageSync('userInfo')  
    let collectNum = wx.getStorageSync('collect')||[]
    this.setData({
      userInfo,
      collectNum:collectNum.length
    })
  }
 
    
})