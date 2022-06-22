// pages/detial/detail.js
let datas = require('../../datas/list-data.js')
let appDatas=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(appDatas);
    //获取参数索引,由list.js:url传递
    let index = options.index
    //更新data中detailObj状态
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    //根据本地缓存数据判断用户是否收藏
    let detailCollectionStorage=wx.getStorageSync('isCollected')
    console.log(detailCollectionStorage);
    //缓存中初始化key:isCollected,避免出现错误
    if(!detailCollectionStorage){
      wx.setStorageSync('isCollected', {})
    }
    //进入页面判断用户之前是否收藏
    if(detailCollectionStorage[index]){
      this.setData({
        isCollected:true
      })
    }
    //判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex==index){
      this.setData({
        isMusicPlay:true
      })
    }


  },
  //收藏功能实现
  handleCollection() {
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    });
    let title = isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success',
      duration: 500
    })
    //缓存数据到本地
    let {index} = this.data
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        
        console.log(datas);
        let status = datas.data
        status[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: status,
          success: () => {
            console.log('缓存成功');
          }
        })


      }

    });
  
  },
  //处理音乐播放
  handleMusicPlay(){
    //处理音乐播放
    let isMusicPlay=!this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    })
       //获取BackgroundAudioManager实例
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if(isMusicPlay){
      let {dataUrl,title}=this.data.detailObj.music
      backgroundAudioManager.title = title
      //音乐播放地址
      backgroundAudioManager.src=dataUrl
    }else{
      //音乐暂停事件
      backgroundAudioManager.pause()
    }
    //监听音乐暂停状态
    backgroundAudioManager.onPause(()=>{
      this.setData({
        isMusicPlay:false
      })
      appDatas.data.isPlay=false
    })
    //监听音乐播放状态
    backgroundAudioManager.onPlay(()=>{
      this.setData({
        isMusicPlay:true
      })
      appDatas.data.isPlay=true
      appDatas.data.pageIndex=this.data.index
    })

  },
  //处理点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList:[
        '分享到朋友圈','分享到qq空间','分享到微博'
      ]
    })

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