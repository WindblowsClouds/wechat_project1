// pages/movieDetali/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail:{}

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendmovieDetail', data=>{
      this.setData({
        movieDetail:data.data
      })
    })
    console.log(this.data.movieDetail);
  },
})