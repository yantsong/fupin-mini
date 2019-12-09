// pages/adddizhi/adddizhi.js 
var util = require('../../utils/util.js');
var that = '',
  url = util.url,
  name = '',
  phone = '',
  school = '',
  louhao = '',
  remarks = '',
  moren = 0,
  openId = '',
  cityid = '',
  louarr = [],
  louname = '',
  city = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeRemark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        openId = res.data;
      },
    })
    wx.getStorage({
      key: 'cityid',
      success: function (res) {
        cityid = res.data;
      },
    })
    wx.getStorage({
      key: 'schoolid',
      success: function (res) {
        school = res.data;
        wx.request({
          url: url + 'getUniversityList.action',
          data: {
            orgroleId: cityid,
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            let data = res.data;
            if (data.errorCode == -1) {
              data.body.universityList.forEach((v) => {
                if (v.orgroleId == school) {
                  that.setData({
                    school: v.orgName,
                  })
                  // if(v.model == 2){
                  wx.request({
                    url: url + 'getFloorList.action',
                    data: {
                      orgroleId: school,
                    },
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (r) {
                      let datas = r.data;
                      if (datas.errorCode == -1) {
                        louarr = datas.body.floorList;
                        louarr.unshift({
                          floor: '请选择楼号'
                        })
                        that.setData({
                          lous: louarr,
                        })
                      } else {
                        wx.showToast({
                          title: datas.msg,
                          icon: 'none',
                        })
                      }
                    }
                  })
                  // }

                }
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
              })
            }

          }
        })
      },
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
    name = ''
    phone = ''
    louhao = ''
    remarks = ''
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  name: function (e) {
    name = e.detail.value;
  },
  phone: function (e) {
    phone = e.detail.value;
  },
  city(e) {
    city = e.detail.value
  },
  inputRemarks: function (e) {
    remarks = e.detail.value;
    that.setData({
      activeRemark: e.detail.value
    })
  },
  louchange: function (e) {
    louarr.forEach((v, ind) => {
      if (e.detail.value == ind) {
        louhao = v.floorId;
        louname = v.floor
      }
    })
  },
  moren: function (e) {
    if (e.detail.value) {
      moren = 1;
    } else {
      moren = 0;
    }
  },
  baocun: function (e) {
    console.log(e, 'ip6log1');
    if (!name.trim()) {
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return
    }
    console.log('ip6log2', phone)
    let reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57])[0-9]{8}$/)
    if (!reg.test(phone)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
      return
    }
    if (!this.data.activeRemark) {
      wx.showToast({
        title: '请填写详情'
      })
      return
    }
    wx.request({
      url: url + 'addAddress.action',
      data: {
        openId,
        name,
        city,
        tel: phone,
        remarks,
        ifMr: moren,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let data = res.data;
        if (data.errorCode == -1) {
          try {
            wx.setStorage({
              key: 'yonghu',
              data: name,
            })
            wx.setStorage({
              key: 'phones',
              data: phone,
            })
            wx.setStorage({
              key: 'addressId',
              data: data.body.addressId,
            })
            wx.setStorage({
              key: 'remarks',
              data: remarks,
            })
            wx.setStorage({
              key: 'city',
              data: city,
            })
            wx.showToast({
              title: data.msg,
              icon: 'none',
              success: function () {
                wx.navigateTo({
                  url: '/pages/shouhuodizhi/shouhuodizhi',
                  success: (result) => {

                  },
                  fail: () => {},
                  complete: () => {}
                });
              }
            })
          } catch (error) {
            console.log(error)
          }
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
          })
        }
      },
      fail(res) {}
    })
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