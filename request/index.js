let ajxsTimes = 0
export const request = (pramas) =>{
  ajxsTimes++

  // 加载提示
  wx.showLoading({
    title: '加载中',
  })

  // 定义一个公用url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise ((resolve,reject) =>{
    wx.request({
      ...pramas,
      url : baseUrl+pramas.url,
      success:res=>{
        resolve(res.data.message)
      },
      fail:err=>{
        reject(err)
      },
      complete:()=>{
        ajxsTimes--
        if(ajxsTimes===0){
          //关闭加载框
        wx.hideLoading()

        }
      }
    })
  })
}
