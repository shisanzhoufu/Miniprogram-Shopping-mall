// pages/login/login.js
Page({

  handleGetUserInfo(e){
    // console.log(e)
    let userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo)
    
    wx.navigateBack({
      delta:1
    })
    
  }
})