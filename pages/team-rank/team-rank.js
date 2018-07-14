import MD5 from '../../utils/md5.js'
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['西部排名','东部排名'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res =>  {
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        });
      }
    });
    
    this.getTeamRank();
  },

  getTeamRank:function() {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.team_rank',
      data: {
        timestamp: timestamp,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + timestamp)
      },
      success: res => {
        wx.hideNavigationBarLoading();
        console.log(res.data);
        this.setData({
          list:res.data.data
        })
      },
      fail: res => {

      }
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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