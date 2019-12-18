// pages/toplist/toplist.js
const tabs = [{
  title: '榜单',
  type: 1
}, {
  title: '爱心榜',
  type: 2
}]
var app = getApp()
import {
  getRankList,
  postlikeAction
} from '../../api/api'
import {
  picUrl
} from '../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs,
    tabsActive: 0,
    toplist: [1, 2, 3, 4, 5, 6],
    lovelist: [1, 2, 3, 3, 3, 3],
    showPswdInputFlag: false,
    isMine: false,
    picUrl,
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getRankList()
  },
  _getRankList() {
    let openId = wx.getStorageSync('openId')
    let {
      type
    } = this.data.tabs[this.data.tabsActive]
    getRankList(openId, type).then(
      res => {
        const {
          returnMap
        } = res.body
        const field = type == 1 ? 'toplist' : 'lovelist'
        this.setData({
          [field]: returnMap
        })
      }
    )
  },
  _likeHandle(e) {
    const {
      id
    } = e.currentTarget.dataset
    postlikeAction(id).then(
      res => {
        if (res.errorCode == -1) {
          this._getRankList()
        } else {
          wx.showToast({
            title: '点赞失败',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
          });
        }
      }
    ).catch(
      err => {
        wx.showToast({
          title: '点赞失败'
        })
      }
    )
  },
  _FromCenterHandler() {
    app.listmine = false
    this.setData({
      tabsActive: 1
    })
  },
  _toDetail(e) {
    try {
      const {
        pwd,content
      } = e.currentTarget.dataset
      if (pwd) {
        this.setData({
          showPswdInputFlag: true,
          pwd,
          content
        })
      } else {
        wx.navigateTo({
          url: `/pages/toplist-detail/toplist-detail?content=${this.data.content}`,
        });
      }
    } catch (error) {

    }
  },
  _tabsHandler(e) {
    const tabsActive = e.currentTarget.dataset.index
    this.setData({
      tabsActive
    })
    this._getRankList()
  },
  _handlerInputClose() {
    this.setData({
      showPswdInputFlag: false
    })
  },
  _handlerInputSubmit(e) {
    console.log(e.detail);
    // if 正确
    if (e.detail == this.data.pwd) {
      wx.navigateTo({
        url: `/pages/toplist-detail/toplist-detail?content=${this.data.content}`,
      });
    } else {
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
    }

    this._handlerInputClose()
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
    try {
      const {
        listmine
      } = app
      console.log(app, 'app');
      if (listmine) {
        this._FromCenterHandler()
      }

    } catch (error) {

    }
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