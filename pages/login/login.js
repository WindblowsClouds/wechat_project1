// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    noLogin:true
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //进来页面获取用户登录信息并判断是否登录
    wx.getStorage({
      key: 'userInfo',
      success :res=> {
        this.setData({
          userInfo:res.data
        })
      },
      fail:()=>{
        let title = "获取信息失败，请登录!!!"
        wx.showToast({
          title,
          icon:'error',
          duration: 500
        })
      }
    })
    //判断用户是否处于登录状态
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        noLogin:false
      }) 
    }
  },
  //监听登录
  handleLogin(e){
  if(this.data.noLogin){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorage({
          key:'userInfo',
          data:res.userInfo
        }),
        this.setData({
          userInfo:res.userInfo,
          noLogin:false

        }),
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }else{
    wx.removeStorage({
      key: 'userInfo',
      success :(res)=> {
        wx.showToast({
          title: '退出登录成功',
          icon: 'success',
          duration: 2000
        })
      this.setData({
        noLogin:true
      })
      }
    })
  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})