import MD5 from '../../utils/md5.js'
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchInfo:[],
    content:[],
    tabs: ["实时", "视频", "统计"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    statistics:[],
    item:["得分","篮板","助攻","抢断","盖帽","犯规","失误"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMatchDetail(options.schid)
    this.getMatchInfo(options.schid,options.liveid)
    this.getStatistics(options.schid)
    this.setData({
      liveid : options.liveid,
      schid : options.schid
    })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
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
  
  // 文字直播数据 list 
  getMatchDetail:function(schid) {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.live_content',
      data:{
        schid:schid,
        timestamp: timestamp,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4'+ schid + timestamp)
      },
      success: res => {
        this.setData({
          content:res.data.data
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },

  // 比赛的信息 对阵双方的名字 比分 支持率等
  getMatchInfo:function(schid,liveid) {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.Live_detail',
      data: {
        schid: schid,
        liveid:liveid,
        timestamp: timestamp,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + liveid + schid + timestamp)
      },
      success: res => {
        console.log(res.data);
        this.setData({
          matchInfo: res.data.data
        })
      },
      fail: res => {
        console.log(res.data)
      }
     })
  },

  // 统计数据
  getStatistics :function(schid) {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.Technical_statistics',
      data: {
        schid: schid,
        timestamp: timestamp,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + schid + timestamp)
      },
      success: res => {
        console.log(res.data)
        this.setData({
          statistics: res.data.data
        })
      },
      fail: res => {
        console.log(res.data)
      }
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }

})