// pages/movies/moives.js
//豆瓣top250域名
const MOVIE_URL='https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesArr:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: MOVIE_URL,
      success:(datas)=>{
        let moviesArr=[]
        //将数据放入moviesArr中
        datas.data.forEach(item=>{
         moviesArr.push(item.data[0])
       })
       //将datas.data中的year放入每一个对象中
      moviesArr.map((item,index)=>{
        item.year=datas.data[index].year
        item.doubanRating=datas.data[index].doubanRating
        item.imdbVotes=datas.data[index].imdbVotes
        item.alias=datas.data[index].alias
        item.dateReleased=datas.data[index].dateReleased
        item.originalName=datas.data[index].originalName
       return item
      }
   )
        this.setData({
          moviesArr
        })
      }
    })
  },
  //跳转电影详情
  handleMovieDetail(event){
    console.log(event);
    let index=event.currentTarget.dataset.index
    let movieDetail=event.currentTarget.dataset.item
    console.log(movieDetail);
    wx.navigateTo({
      url: '/pages/movieDetali/movieDetail?index='+index,
      events:{
        sendmovieDetail:function(data){
          console.log(data);
        }
      },
    success:function(res){
      res.eventChannel.emit('sendmovieDetail', { data:movieDetail })
    }
    })
  },
})