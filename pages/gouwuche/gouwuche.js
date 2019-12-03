// pages/gouwuche/gouwuche.js
var that = '' , util = require('../..//utils/util.js');
var url  = util.url , imgUrl = util.imgUrl , floorid = '' , schoolid = '' , openId = '' , list = '' , allprice = 0 , gouwuid = '' , delflag = false , allgouwuid = '' , jiajianflag = 'true' ;  
function huoqu(){ 
  wx.request({
    url: url + 'getShoppingCartAllList.action',               
    data: { 
      floorId: floorid,
      openId: openId,
      orgId: schoolid,
      allprice:allprice,
    },
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res);
      let data = res.data;
      if (data.errorCode == -1) {
        list = data.body.shopCarList;
        list.forEach((v)=>{
          v.flag = false;
          v.children.forEach((vv)=>{
            vv.flag = false;
          })
        })
        that.setData({
          list: data.body.shopCarList, 
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
}
function jiajianshop(num,gouwuid,goods,price,flag,nojian){
  wx.request({
    url: url + 'updateShoppingCart.action',
    data: {
      shoppingCartId: gouwuid,
      openId: openId,
      num: num,
    },
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      // console.log(res);
      if (res.data.errorCode == -1) {
        list.forEach((v) => {
          v.children.forEach((vv) => {
            if (vv.goodsId == goods) {
              vv.num = num;
              if (vv.flag == false) { } 
              else {
                if(flag == 'jia'){
                  allprice = allprice + price;
                }
                else{
                  if(nojian != 1){
                    allprice = allprice - price;
                  }
                }
              }
            }
          })
        })
        that.setData({
          list: list,
          allprice : allprice,
        })
        // jiajianflag = 'true';
      }
      else {
        // jiajianflag = true;
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    }
  })
}
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    guanliqu:'display',
    guanli_btnqu:'none-display',
    imgUrl:imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log(allgouwuid);
    
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
    allprice = 0 ;
    allgouwuid = '' ;
    that.setData({
      allprice:allprice,
      quanxuan:'display',
      quanbuxuan:'none-display'
    })
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        openId = res.data;
      },
    })
    wx.getStorage({
      key: 'floorid',
      success: function (res) {
        floorid = res.data;
      },
    })
    wx.getStorage({
      key: 'schoolid',
      success: function (res) {
        schoolid = res.data;
        huoqu();
      },
    })
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
  guanli1:function(){
    delflag = true;
    list.forEach((v)=>{
      v.flag = false;
      v.children.forEach((vv)=>{
        vv.flag = false;
      })
    })
    this.quanbuxuan()
    that.setData({
      guanliqu:'none-display',
      guanli_btnqu:'display',
      list:list,
      allprice:0,
    })
  },
  guanli_quxiao:function(){
    delflag = false;
    list.forEach((v) => {
      v.flag = false;
      v.children.forEach((vv) => {
        vv.flag = false;
      })
    })
    this.quanbuxuan()
    that.setData({
      guanliqu:'display',
      guanli_btnqu: 'none-display',
      list:list,
    })
  },
  dianpu:function(e){
    let shops_id = e.currentTarget.dataset.shop;
    list.forEach((v)=>{
      if(v.shopId == shops_id){
        v.flag = true;
        v.children.forEach((vv)=>{
          if(vv.flag){}
          else{
            vv.flag = true;
            if (delflag == false) {
              allprice = allprice + vv.price * vv.num;
            }
          }
          
        })
      }
    })
    // console.log(list);
    that.setData({
      list:list,
      allprice:allprice,
    })
  },
  dianpu1:function(e){
    let shops_id = e.currentTarget.dataset.shop;
    list.forEach((v) => {
      if (v.shopId == shops_id) {
        v.flag = false;
        v.children.forEach((vv) => {
          vv.flag = false;
          if(delflag == false){
            allprice = allprice - vv.price * vv.num;
          }
          
        })
      }
    })
    // console.log(list);
    that.setData({
      list: list,
      allprice: allprice,
    })
  },
  shopin:function(e){
    let shop_children = e.currentTarget.dataset.chilid;
    console.log(shop_children);
    list.forEach((v)=>{
      v.children.forEach((vv)=>{
        if(vv.goodsId == shop_children){
          vv.flag = true;
          if(delflag == false){
            allprice = allprice + vv.price * vv.num;
          }
          
        }
      })
    })
    that.setData({
      list:list,
      allprice:allprice,
    })
    // console.log(list);
  },
  shopin1:function(e){
    let shop_children = e.currentTarget.dataset.chilid;
    console.log(e);
    list.forEach((v) => {
      v.children.forEach((vv) => {
        if (vv.goodsId == shop_children) {
          vv.flag = false;
          if(delflag == false){
            allprice = allprice - vv.price * vv.num;
          }
         
        }
      })
    })
    that.setData({
      list: list,
      allprice:allprice,
    })
  },
  jiashop:function(e){
    if(jiajianflag == 'true'){
      jiajianflag = 'false';
      let dataset = e.currentTarget.dataset;
      let goods = dataset.goods;
      let price = dataset.price;
      let num = dataset.num;
      let gouwuid = dataset.gouwu;
      num++;
      if (delflag == false) {
        // console.log(jiajianflag);
        jiajianshop(num, gouwuid, goods, price, 'jia');
        // console.log(jiajianflag);
        setTimeout(function(){
          jiajianflag = 'true';
        },300)
      }
    }
    
    
  },
  jianshop:function(e){
    if(jiajianflag == 'true'){
      jiajianflag = 'false';
      let dataset = e.currentTarget.dataset;
      let goods = dataset.goods;
      let price = dataset.price;
      let num = dataset.num;
      let gouwuid = dataset.gouwu;
      var nojian = 0;
      num--;
      if (num < 1) {
        num = 1;
        nojian = 1;
      }
      if (delflag == false) {
        jiajianshop(num, gouwuid, goods, price, '', nojian);
        setTimeout(function () {
          jiajianflag = 'true';
        }, 300)
      }
    }
    
    
  },
  quanxuan:function(){
    list.forEach((v)=>{
      v.flag = true;
      v.children.forEach((vv)=>{
        if(vv.flag == false){
          if(delflag == false){
            allprice = allprice + vv.num * vv.price;
          }
          vv.flag = true;
        }
      })
    })
    that.setData({
      list:list,
      allprice:allprice,
      quanxuan:'none-display',
      quanbuxuan:'display',
    })
  },
  quanbuxuan:function(){
    list.forEach((v)=>{
      v.flag = false;
      v.children.forEach((vv)=>{
        vv.flag = false;
      })
    })
    allprice = 0;
    that.setData({
      list:list,
      allprice: allprice,
      quanxuan: 'display',
      quanbuxuan: 'none-display',
    })
  },
  deleteshop:function(){
    let shopid_all = [];
   let newList =  JSON.parse(JSON.stringify(list))
    list.forEach((v,ind)=>{
      if(v.flag){
        v.children.forEach((vv)=>{
          shopid_all.push(vv.shoppingCartId);
        })
        v.children=[];
        newList.splice(ind,1,'');
      }
      else{
        v.children.forEach((vv,indx)=>{
          if(vv.flag){
            shopid_all.push(vv.shoppingCartId);
            console.log(v);
            newList[ind].children.splice(indx,1,'');
          }
        })
      }
    })
    console.log(list,newList);
    let shopid_all1 = shopid_all.join();
    console.log(shopid_all1,'all1',newList);
    newList = newList.filter(
      i => {
        if(i.children){
            i.children = i.children.filter(
              v => v
            )
        }
        return i.children && i.children.length
      }
    )
    list = newList
    wx.request({
      url: url + 'deleteShopCartList.action?openId=' + openId + '&shoppingCartId=' + shopid_all1,
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            success:function(){
              that.setData({
                list:list,
              })
            }
          })
        }
        else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      }
    })
  },
  goorder:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../confirmorder/confirm?gouwu='+e.currentTarget.dataset.gouwu,
    })
  },
  gojiesuan:function(){
    console.log(list);
    // if (!list.length)
    let emt = list.some(
      v => v.flag || v.children.some(
        i => i.flag
      )
    )
    if (!emt) {
      wx.showToast({
        title:'请先勾选商品',
        icon:'none'
      })
      return
    }
    list.forEach((v) => {
      let str = '';
      if(v.flag){
        v.children.forEach((vv)=>{
          if(str == ''){
            str = str + vv.shoppingCartId;
          }
          else{
            str = str + ',' + vv.shoppingCartId;
          }
        })
        console.log(str);
        if(allgouwuid == ''){
          allgouwuid = allgouwuid + str;
        }
        else{
          allgouwuid = allgouwuid + '-' + str;
        }
        console.log(allgouwuid);
      }
      else{
        v.children.forEach((vv)=>{
          if(vv.flag){
            console.log(2222);
            if(str == ''){ 
              str = str + vv.shoppingCartId;
            }
            else{
              str = str + ',' + vv.shoppingCartId;
            }
            
          }
        })  
        // allgouwuid.push(str);  
        if (allgouwuid == '' && str) {
          allgouwuid = allgouwuid + str;   
        }
        else if(str){
          allgouwuid = allgouwuid + '-' + str;   
        }
      }
    })
    console.log(allgouwuid);
    setTimeout(function(){
      wx.navigateTo({
        url: '../confirmorder/confirm?gouwu='+allgouwuid,
      })
    },300)
    
  },
  toIndex(){
    wx.switchTab({
      url: '../index/index',
    })
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