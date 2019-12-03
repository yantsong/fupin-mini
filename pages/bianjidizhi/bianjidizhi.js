// pages/bianjidizhi/bianjidizhi.js
var that = '' , util = require('../..//utils/util.js');
var url = util.url , openId = '' , schoolid = '' ,dianhua='', floorId = '' , name = '' , telephone = '' , remarks = '' , ifmr = '' , addressId = '' , cityid = '',floorNum='',louarr=[],louhao='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhua:'',
    remarks:'',
    floorNum:'',
    activeLou:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    console.log(options);
    openId = options.openId;
    schoolid = options.orgId;
    floorId = options.floorId;
    addressId = options.addressId;
    name = options.name;
    dianhua = telephone = options.telephone;
    remarks = options.remarks;
    floorNum = options.floorNum
    console.log(remarks);
    ifmr = options.ifMr;
    this.setData({remarks,name,dianhua})
    wx.getStorage({
      key: 'cityid',
      success: function(res) {
        cityid = res.data;
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
            console.log(res);
            let data = res.data;
            if (data.errorCode == -1) {
              data.body.universityList.forEach((v) => {
                if(schoolid == v.orgroleId){
                  that.setData({
                    xuexiao: v.orgName,
                    
                  })
                }
              })
            }
            else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
              })
            }
            
          }
        })
      },
    })
    wx.request({
      url: url + 'getFloorList.action',
      data: {
        orgroleId: schoolid,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r);
        let datas = r.data;
        if (datas.errorCode == -1) {
          louarr = datas.body.floorList;
          louarr.unshift({floor:'请选择'})
          that.setData({
            lous: louarr,
            floorNum,
          })
        }
        else {
          wx.showToast({
            title: datas.msg,
            icon: 'none',
          })
        }
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
  changeName(e){
    console.log(e.detail);
    name = e.detail.value
  },
  changePhone(e){
    telephone = e.detail.value
  },
  changeSchool(e){
    name = e.detail.value
  },
  changeRemark(e){
    remarks = e.detail.value
  },
  louchange:function(e){
    console.log(e);
    this.setData({
      activeLou:true
    })
    louarr.forEach((v,ind)=>{
      if((e.detail.value[0]) == ind){
        louhao = v.floorId;
        console.log(v);
      }
    })
  },
  moren:function(e){
    if(e.detail.value){
      ifmr = 1;
    }
    else{
      ifmr = 0;
    }
  },
  baocun:function(){
    if(ifmr ==1){
      wx.setStorage({
        key: 'floorid',
        data: floorId,
      })
    }
    if(telephone.trim().length != 11){
      wx.showToast({
        title:'请输入正确手机号',
        icon:'none'
      })
      return
    }
    if(!this.data.activeLou) {
      wx.showToast({
        title:'请选择小区',
        icon:'none'
      })
      return
    }
    wx.request({
      url: url + 'updateAddress.action',
      data: {
        addressId: addressId,
        openId: openId,
        orgId: schoolid,
        name: name,
        telephone,
        floorId: louhao,
        remarks: remarks,
        ifMr: ifmr,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errorCode == -1) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            success: function () {
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
        else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
          })
        }
      }
    })
  },
  deletedizhi:function(){
    wx.request({
      url: url + 'deleteAddress.action',
      data:{
        addressId:addressId,
        openId:openId,
      },
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        let data = res.data;
        if(data.errorCode == -1){
          wx.setStorage({
            key: 'yonghu',
            data: '',
          })
          wx.setStorage({
            key: 'phones',
            data:'',
          })
          wx.setStorage({
            key: 'floornum',
            data: '',
          })
          wx.setStorage({
            key: 'addressId',
            data: '',
          })
          wx.setStorage({
            key: 'remarks',
            data: '',
          })
          wx.setStorage({
            key: 'orgName',
            data: '',
          })
          wx.showToast({
            title: data.msg,
            icon:'none',
            success:function(){
              wx.navigateBack({
                delta:1,
              })
            }
          })
        }
        else{
          wx.showToast({
            title: data.msg,
            icon:'none',
          })
        }
      }
    })
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