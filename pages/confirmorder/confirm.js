// pages/confirmorder/confirm.js
import { appid } from '../../utils/config';
var util = require('../../utils/util.js'); 
var that = '' , url = util.url , imgUrl = util.imgUrl , gouwu_id = '' , openId = '' , schoolid = '' ;
var ordertype = 3 , gouwuids = [] , dizhi_id = '' , remark = '' ,remarks = '', formId = '' , allPrice = '' , ifKd = 0 , kdPrice = '' , ifNew = 0 , newPrice = '' , dianpu_id = '' , types = '' , orderNumber = '' , ifKd = '' , ifNew = '' , jiesuanprice = '' , yonghu = '' , phones = '' , floornum = '' , orgName = '' , orderPrice = '' ;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    url:url,
    imgUrl:imgUrl,
    goadddizhi:'none-display',
    diangao:580,
    dian1gao:480,
    yincang:'none-display',
    remarkList:[],
    activeUser:{},
    yonghu:'',
    phones:'',
    floornum:'',
    remarks
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    allPrice = 0 ; 
    gouwu_id = '' ;
    remark = '' ;
    orderPrice = '';
    gouwuids = '';
    kdPrice = '';
    newPrice = '';
    gouwu_id = options.gouwu;
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
      },
    })
    wx.getStorage({
      key: 'schoolid',
      success: function(res) {
        schoolid = res.data;
        wx.request({
          url: url + 'getGoodsToOrder.action',
          data: {
            shoppingCartId: gouwu_id,
            openId: openId,
            orgId: schoolid,
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'  
          },
          success:function(res){
            let data = res.data;
            console.log(res);
            if(data.errorCode == -1){
              if(data.body.addressList.length && data.body.addressList[0].addressId==''){
                that.setData({
                  goadddizhi:'display',
                })
              }
              let gouwuid = [] ; 
              data.body.shopList.forEach((v) => {
                let dianprice = 0 , shopcart = '';
                gouwuid.push(v.shoppingCartId);
                // allPrice = allPrice*1 + v.price*1*v.num;
                v.children.forEach((vv)=>{
                  dianprice = dianprice + vv.price * vv.num;
                  if(shopcart){
                    shopcart = shopcart + ',' + vv.shoppingCartId;
                  }
                  else{
                    shopcart = vv.shoppingCartId;
                  }
                })
                v.dianprice = dianprice;
                if(gouwuids){
                  gouwuids = gouwuids + '==' + shopcart;
                }
                else{
                  gouwuids = shopcart;
                }
                if(orderPrice!=''){
                  orderPrice = orderPrice + '==' + dianprice;
                }
                else{
                  orderPrice = dianprice;
                }
                if(kdPrice!=''){
                  kdPrice = kdPrice + '==' + v.ifKd;
                }
                else{
                  kdPrice = ''+ v.ifKd;
                }
                if(newPrice!=''){
                  newPrice = newPrice + '==' + v.ifNew;
                }
                else{
                  newPrice = '' + v.ifNew;
                }
                allPrice = allPrice + dianprice + Number(v.ifKd) - Number(v.ifNew)
                // allprice = Number(allprice).toFixed(2)
              })
              console.log(gouwuids,orderPrice,kdPrice,newPrice);
              that.setData({
                shopin: data.body.shopList,
                user: data.body.addressList,
                allprice:Number(allPrice).toFixed(2),
                yincangnum: data.body.shopList.length-3
              })
               
              // 清空 

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
              // if(data.body.shopList.length <=3){
              //   if (data.body.shopList.length == 1){
              //     that.setData({
              //       diangao:'260rpx',
              //       dian1gao:'160rpx',
              //     })
              //   }
              //   else if (data.body.shopList.length == 2){
              //     that.setData({
              //       diangao: '450rpx',
              //       dian1gao: '350rpx',
              //     })
              //   }
              //   that.setData({
              //     dianmore:'none-display',
              //   })
              // }
              // jiesuanprice = allPrice ;
              // if(data.body.ifKd){
              //   ifKd = data.body.ifKd ;
              //   jiesuanprice = allPrice + ifKd ;
              //   that.setData({
              //     ifKd: data.body.ifKd
              //   })
              // }
              // else{
              //   that.setData({
              //     ifKd:0
              //   })
              // }
              // if(data.body.ifNew){
              //   ifNew = data.body.ifNew;
              //   jiesuanprice = jiesuanprice - ifNew ;
              //   that.setData({
              //     ifNew:data.body.ifNew,
              //   })
              // }
              // else{
              //   that.setData({
              //     ifNew:0,
              //   })
              // }
              // gouwuids = gouwuid.join();
              // dizhi_id = data.body.addressList[0].addressId;
              dianpu_id = data.body.shopList[0].shopId;
              // that.setData({
              //   jiesuan:jiesuanprice,
              // })
              that._getAddId()
            }
            else{
              wx.showToast({
                title: data.msg,
                icon:'none',
              })
              setTimeout(
                () =>  wx.navigateBack({
                  delta: 1
                }),1500
              )
            }
          }
        })
      },
    })
    
  },
  _getAddId(){
    if(!schoolid || !openId)  return
    wx.request({
      url: url + 'toAddressList.action?' + '&openId=' + openId + '&orgId='+schoolid,
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errorCode == -1 ) {
          dizhi_id = data.body.addressList.length? data.body.addressList[0].addressId : null
          that.setData({
            yonghu:data.body.addressList.length?data.body.addressList[0].name:'',
            phones:data.body.addressList.length?data.body.addressList[0].telephone:'',
            floornum:data.body.addressList.length?data.body.addressList[0].floorNum:''
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
  beizhu2:function(e){
    let {index} = e.target.dataset
    let remarkList = this.data.remarkList
        remarkList[index] = e.detail.value || ''
        this.setData({remarkList})
  },
  fukuan:function(e, type = 1 , fn = () => {}){

    wx.showLoading()
    console.log(e);
    if (!dizhi_id) {
      wx.showToast({
        title: '请选择正确地址',
        icon:'none'
      })
      return
    }
    let remark = this.data.remarkList.join('|')
    formId = e.detail.formId;
    setTimeout(function(){
      wx.request({
        url: url + 'toAddOrderRecord.action?' + '&openId=' + openId+'&shoppingCartId='+gouwuids+'&addressId='+dizhi_id+'&orgId='+schoolid+'&payType='+type+'&remark='+remark+'&orderPrice='+orderPrice+'&kdPrice='+kdPrice+'&newPrice='+newPrice+'&formId='+formId,
        
        success: function (res) {
          wx.hideLoading()
          console.log(res.data.body);
          if (!res.data.success){
            wx.showToast({
              title:res.data.msg,
              icon:'none'
            })
            return
          }
          let data = res.data;
          if (data.body.orderMap.payType == 2) {
            fn(data.body.orderMap.orderNumber,data.body.orderMap.orderId,data.body.orderMap.orgId)
            return 
          }
          console.log(data);
          types = data.body.orderMap.type;
         let  {money} = data.body.orderMap
          orderNumber = data.body.orderMap.orderNumber;
          if (data.errorCode == -1) {
            wx.request({
              url: url + 'toPayOrder.action?openId=' + openId +
                '&orderNumber=' + orderNumber + '&orgId=' + schoolid + '&money=' +
                money + '&type=' + types +'&appid=' + appid,
              success: function (re) {
                wx.requestPayment({
                  timeStamp: re.data[0].timeStamp,
                  nonceStr: re.data[0].nonceStr,
                  package: re.data[0].package,
                  signType: 'MD5',
                  paySign: re.data[0].sign,
                  success: function (rs) {
                    wx.showToast({
                      title: '请到订单页面查看取货码',
                      icon: 'none',
                    })
                    wx.switchTab({
                      url: '../index/index',
                    })
                  },
                  fail: function () {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                    })
                  }
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
    },100)
    
  },
  bindsubmit:function(e){
    console.log(e);
  },
  goorder:function(){
    wx.navigateTo({
      url: '../adddizhi/adddizhi',
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
    wx.getStorage({
      key: 'yonghu',
      success: function(res) {
        yonghu = res.data;
        that.setData({
          user:'1',
          yonghu:yonghu,
        })
      },
    })
    wx.getStorage({
      key: 'phones',
      success: function(res) {
        phones = res.data;
        that.setData({
          phones:phones,
        })
      },
    })
    wx.getStorage({
      key: 'addressId',
      success: function(res) {
        dizhi_id = res.data;
        that.setData({
          dizhi_id,
        })
      },
    })
    wx.getStorage({
      key: 'remarks',
      success: function(res) {
       let remarks = res.data;
        that.setData({
          remarks,
        })
      },
    })
    wx.getStorage({
      key: 'floornum',
      success: function(res) {
        floornum = res.data;
        that.setData({
          floornum:floornum,
        })
      },
    })
    wx.getStorage({
      key: 'orgName',
      success: function(res) {
        orgName = res.data;
      },
    })
    // this._getAddId()
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
  xianshi:function(){
    that.setData({
      diangao:'auto',
      dian1gao:'auto',
      shopnum:'none-display',
      xianshi:'none-display',
      yincang:'display',
    })
  },
  yincang:function(){
    that.setData({
      diangao:'580rpx',
      dian1gao:'480rpx',
      shopnum:'display',
      xianshi:'display',
      yincang:'none-display',
    })
  },
  zhezhao:function(){
    that.setData({
      goadddizhi:'none-display',
    })
  },
  godizhi:function(){
    wx.navigateTo({
      url: '../shouhuodizhi/shouhuodizhi',
    })
  },
  goFrdPay:function(e){
    // wx.navigateTo({
    //   url: '../frdPay/frdPay',
    // })
    const fn = (orderNumber,orderId,orgId) => {
      wx.navigateTo({
        url: `../share/share?orderNumber=${orderNumber}&orderId=${orderId}&orgId=${orgId}`,
      })
    }
    this.fukuan(e, 2 ,fn)
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