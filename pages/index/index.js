import MD5 from '../../utils/md5.js'
const app = getApp()

Page({
  data: {
    list:[],
    isShow:false,
    date:'00'
  },

  onLoad: function () {
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.Schedule',
      data: {
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + timestamp),
        timestamp:timestamp,
      },
      success: res => {
        console.log(res.data)
        this.setData({
          list:res.data.data.data,
          isShow: true,
          date:res.data.data.data.cur_date
        })
      },
      fail:res => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }    
    })
  },

  // 比赛文字直播消息列表 data.data 20条数据
  getMatchData:function(str) {
    // var date = e.target.dataset.date;
    // console.log(date);
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.Schedule',
      data: {
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + str + timestamp),
        timestamp: timestamp,
        date: str
      },
      success: res => {
        console.log(res.data)
        this.setData({
          list: res.data.data.data,
          isShow: true,
          date: res.data.data.data.cur_date
        })
      },
      fail: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  
  selectData:function(e){
    this.getMatchData(e.target.dataset.date);
  },

  dateChange:function(e) {
    this.getMatchData(e.detail.value);
  },

  matchClick:function(e) {
    var liveid = e.currentTarget.dataset.liveid;
    var schid = e.currentTarget.dataset.chid;
    wx.navigateTo({
      url: '../live-detail/live-detail?liveid='+liveid+'&schid='+schid,
    })
  }

})
