// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}

  },
  enterHome(){
    wx.switchTab({
      url:'/pages/list/list'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   wx.getUserInfo({
 success:(data)=>{
   this.setData({
     userInfo:data.userInfo
   })
 }
   })
  },
})