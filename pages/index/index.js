//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
var index = -1

Page({
  data: {
    // indicatorDots: true,
    // vertical: false,
    // autoplay: false,
    // circular: false,
    // interval: 2000,
    // duration: 500,
    // previousMargin: 0,
    // nextMargin: 0,
    stories: []
  },
  //事件处理函数

  onLoad: function () {
    this.request(this)
  },

  request: function (that, pullDown = false) {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (res) {
        if (pullDown) {
          index = -1
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

  onReachBottom: function () {
    index++
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + util.getLastDay(index),
      success: res => {
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
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})
