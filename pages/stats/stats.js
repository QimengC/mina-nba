import MD5 from '../../utils/md5.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    current: 'pt',
    name:'得分',
    stats:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.Player_top',
      data: {
        timestamp: timestamp,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + timestamp)
      },
      success: res => {
        wx.hideNavigationBarLoading();
        console.log(res.data.data)
        this.setData({
          list: res.data.data,
          stats: res.data.data.pt
        })
      },
      fail: res => {

      }
    })
  },

  tabNav:function(e) {
    var name = e.currentTarget.dataset.name;
    var t = e.currentTarget.dataset.t;
    this.setData({
      name : name, 
      stats : this.data.list[t],
      current:t,
    })
  },


  itemClick :function(e) {
    var playerid = e.currentTarget.dataset.playerid;
    wx.navigateTo({
      url: '../player/player?playerid='+playerid,
    })
  }

})