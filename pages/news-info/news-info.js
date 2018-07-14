// pages/news-info/news-info.js
import MD5 from '../../utils/md5.js'
var WxParse = require('../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var docid = options.docid;
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.News_info',
      data: {
        timestamp: timestamp,
        docid: docid || 'D230QPOC0005877U',
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + docid + timestamp)
      },
      success: res => {
        console.log(res.data);
        // body里面的图片是没有链接的 将Img里面的图片加入Body里面
        this.setData({
          item: res.data.data,
        })
        this.getComments(docid);
        if(res.data.data && res.data.data.img.length !== 0) {
          var replaceStr = '<img src=' + res.data.data.img[0]['src'] + '>'
          res.data.data.body = res.data.data.body.replace('<!--IMG#0-->', replaceStr)
        }
        WxParse.wxParse('article', 'html', res.data.data.body, this, 18)
      },
      fail: res => {
        console.log(res.data);
      }
    })
  },

  getComments: function (docid) {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.News_comments',
      data: {
        timestamp: timestamp,
        docid: docid || 'D230QPOC0005877U',
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + docid + timestamp)
      },
      success: res => {
        console.log(res.data);
        this.setData({
          comments:res.data.data,
        })
      },
      fail: res => {
        console.log(res.data);
      }
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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