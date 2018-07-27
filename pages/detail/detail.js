//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
  },
  //事件处理函数

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      success: function (res) {
        console.log(res)
        if (res.statusCode != 200) {
          console.log('load error.')
          return
        }
        wx.setNavigationBarTitle({ title: res.data.title })
        WxParse.wxParse('detail', 'html', res.data.body, that, 50);
      }
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story-extra/' + options.id,
      success: function(res) {
        console.log(res)
        if (res.statusCode != 200) {
          console.log('load error.')
          return
        }
        that.setData({
          popularity: res.data.popularity,
          comments: res.data.comments
        })
      }
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})