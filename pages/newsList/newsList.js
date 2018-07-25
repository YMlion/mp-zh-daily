// pages/newsList/newsList.js
var newsUrl = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stories: []
  },
  //事件处理函数

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    newsUrl = options.theme ? 'https://news-at.zhihu.com/api/4/theme/' + options.id : 'https://news-at.zhihu.com/api/3/section/' + options.id
    this.request(this)
  },

  request: function (that, pullDown = false) {
    wx.request({
      url: newsUrl,
      success: function (res) {
        if (pullDown) {
          wx.stopPullDownRefresh()
        }
        console.log(res)
        if (res.statusCode != 200) {
          console.log('load error.')
          return
        }
        
        that.setData({
          stories: res.data.stories
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onPullDownRefresh: function () {
    this.request(this, true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})