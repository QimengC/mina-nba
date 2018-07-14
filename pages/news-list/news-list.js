import MD5 from '../../utils/md5.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page: 0,
    isShow:false,
    isComplete:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews(0);
  },

  getNews:function(page) {
    wx.showNavigationBarLoading();
    var timestamp = Date.parse(new Date());
    wx.request({
      url: 'https://wapapi.it919.cn/?service=Nba.new_list',
      data: {
        timestamp: timestamp,
        page:page,
        sign: MD5('6fc18957ce391f84a7ce34ce13cd99c4' + page + timestamp)
      },
      success: res => {
        wx.hideNavigationBarLoading();
        console.log(res.data);
        this.setData({  
          isShow: true,
          list: this.data.list.concat(res.data.data),
          page: this.data.page + 1,
        })
      },
      fail: res => {
        wx.hideNavigationBarLoading();
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
    if(!this.data.isComplete) {
      this.getNews(this.data.page)
    }
  },

  itemClick:function(e) {
    var docid = e.currentTarget.dataset.docid;
    wx.navigateTo({
      url: '../news-info/news-info?docid='+ docid,
    })
  }




})