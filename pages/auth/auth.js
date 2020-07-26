import {login} from "../../utils/asyncWX.js"
import regeneratorRunTime from "../../lib/runtime/runtime"
import {request} from "../../request/index.js"
Page({
  async handleGetUserInfo(e){
    // 获取用户信息
    const {encryptedData,rawData,iv,signature}=e.detail
    // 获取小程序登录成功后的code
    const {code} = await login()
    // console.log(code)
    let tokendata = {encryptedData,rawData,iv,signature,code}
    // 没有企业账号无法进行下一步获取token
    // let {token}= await request({url:"/users/wxlogin",data:tokendata，methods:"post"})
    let token = "自定义的假token"
    // console.log(token)
    wx.setStorageSync('token', token)
    // 跳转回上一个页面
    wx.navigateBack({
      delta:1
    })
  }
})