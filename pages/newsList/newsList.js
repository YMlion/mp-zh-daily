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
          descBg: res.data.image | false,
          partDesc: res.data.description | null,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    wx.request({
      url: newsUrl + '/before/' + that.data.stories[that.data.stories.length - 1].id,
      success: function (res) {
        console.log(res)
        if (res.statusCode != 200) {
          console.log('load error.')
          return
        }

        var list = [...that.data.stories]
        list.push(...res.data.stories)
        that.setData({
          stories: list
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})