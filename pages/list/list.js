// pages/list/list.js
let datas=require('../../datas/list-data.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    listArr:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      listArr:datas.list_data
    })
  },
  //点击跳转详情页
  toDetail(event){
    console.log(event);
    let index=event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detial/detail?index='+index,
 
    })
  },
  //点击轮播图跳转
  carosuelToDetail(event){
    let index=event.target.dataset.index
    wx.navigateTo({
      url: '/pages/detial/detail?index='+index
    })
  },
})