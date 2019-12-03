// pages/dianpuneiye/dianpuneiye.js
var that = '', shopnum = 0, gouwustr = '', specifiValue = '' , specifiName = '' , fenleiid = '', shop_ids= '', shop_id = '',guigename='',guigeval=''; 
var util = require('../../utils/util.js');
var url = util.url , schoolid = '' , floorid = '' , imgUrl = util.imgUrl , diannum = 0 , shopnum1 = 0, imgurl = util.imgurl
var shopid = '' , fenleitype = 1 , classifyId = '' , goodid = '' , openId = '' , price = '' , num = 1 , allprice = 0 , fenleishop = [] , dianpuId = '' , gouwuche_all = [] , dianpu_all = [] , goodid_all = [] , jiesuanid = '';
function huoqu(fenleitype,classifyId,schoolid,shopid){
  wx.request({
    url: url + 'getGoodsByClassifyId.action',  
    data: { 
      type: fenleitype,
      classifyId: classifyId,
      orgroleId: schoolid,
      shopId: shopid,
    },
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (s) {
      console.log(s);              
      let data = s.data;
      fenleishop = data.body.goodsList;
      fenleishop.forEach((v) => {
        if(v.children.length > 1){
          v.guige = true;
        }
        else{
          v.guige = false;
        }
        if(jiesuanid == ''){
          jiesuanid = jiesuanid + v.shoppingCartId;
        }
        else{
          jiesuanid = jiesuanid + '-' + v.shoppingCartId;
        }
        dianpu_all.forEach((vv)=>{
          if(v.goodsId == vv.goodsId){
            v.shoppingCartId = vv.shoppingCartId;
          }
        })
        v.children.forEach(
          i => {
            dianpu_all.forEach((vv)=>{
              if(i.goodsId == vv.goodsId){
                v.shoppingCartId = vv.shoppingCartId;
              }
            })
          }
        )
      })
      console.log(fenleishop,dianpu_all);
      if (data.errorCode == -1) {
        // console.log(gouwuche_all);

        goodid_all.forEach((v)=>{
          gouwuche_all.forEach((vv)=>{
            vv.children.forEach((vvv)=>{
              // console.log(vvv.goodsId,v.goodid);
              if(v.goodid == vvv.goodsId){
                v.flag = true;
              }
            })
          })
        })
        setTimeout(function(){
          console.log(1);
          console.log(goodid_all);
          goodid_all.forEach((v)=>{
            console.log(34);
            fenleishop.forEach((vv)=>{
              if(v.goodid == vv.goodsId){
                console.log(1,vv);
                vv.price = v.price;
                if (v.flag) {
                  vv.flagnum = false;
                  vv.jiajiannum = true;
                  vv.guige = false;
                  console.log(2);
                }
                else{
                  console.log(3);
                  vv.jiajiannum = false;
                  vv.flagnum = true;
                  console.log(vv.flagnum);
                  vv.guige = false;
                }
                if (v.num) {
                  diannum = diannum + v.num;
                  console.log(diannum);
                }
                vv.num = v.num;
                allprice = allprice + v.num * v.price;
              }
              else{
                if(vv.children.length > 1 ){
                  vv.flagnum = false;
                  vv.guige = true;
                  vv.jiajiannum = false;
                }
                else{
                  vv.flagnum = true;
                  vv.guige = false;
                  vv.jiajiannum = false;
                }
              }
            })
          })
          setTimeout(function(){
            console.log(fenleishop);  
            that.setData({ 
              // fenleishop, 
              allprice: allprice,
              diannum: diannum,
            })
          },300)
        },500)
        
      }
      else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
        })
      }
      that._initKindShop(fenleishop)
    }
  })
}
function gouwunum(gouwuid,openId,shopnum,id){
  let dianpu_shop = that.data.dianpu_shop
  wx.request({
    url: url + 'updateShoppingCart.action',
    data: {
      shoppingCartId: gouwuid,
      openId: openId,
      num: shopnum,
    },
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res)
      if (res.data.errorCode != -1) {
        wx.showToast({
          title: res.data.msg || '加入失败请重试',
          icon: 'none',
        })
      }else{
        dianpu_shop.forEach(
          i => {
           if (i.goodsId == id){
             i.num = shopnum 
           }
          }
        )
        that.setData({dianpu_shop})
      }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    zhezhao:'none-display',
    zhezhao1:'none-display',
    addshopnum:'none-display',
    jiajianqu:'none-display',
    kouwei:'none-display',
    gouwu:'none-display',
    shopnum:1,
    imgUrl:imgUrl,
    imgurl,
    allprice:allprice,
    index: 0,
    none1:'none-display',
    item:{},
    count:100,
    width:100,
    marginleft:0,
    zhezhao:'none-display',
    shopimg:'',
    name:'',
    goodsId:'',
    scrollFixed:false,
    scrollTop:200
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    shopid = options.shopid;
    allprice = 0;
    diannum = 0;
    console.log(shopid);
    if(options.fenleiid){
      shopid = options.shopid ;
      fenleiid = options.fenleiid;
    }
    console.log(shopid,fenleiid,'=fenleiid');
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
      },
    })
    wx.getStorage({
      key: 'floor',
      success: function (res) { 
        floorid = res.data;
      },
    })
    wx.getStorage({
      key: 'schoolid',
      success: function(t) {
        schoolid = t.data;
        //获取店铺详情
        wx.request({  
          url: url +'getDetailByshopId.action?shopId='+shopid,
          success:function(res){
            console.log(res);
            if(res.data.errorCode == -1){
              let data = res.data.body;
              let dataarr = [] ;
              dataarr.push(data);
              fenleitype = data.type;
              dianpuId = data.shopId;
              if(data.goods.length == 0){
                that.setData({
                  none:'none-display',
                })
              }
              if(!data.startAm){
                that.setData({
                  none1:'营业时间：不限时间'
                })
              }
              else{
                that.setData({
                  none1:'~',
                  none2:'~',
                })
              }
              if(data.shopRemark == ''){
                that.setData({
                  none3:'none-display',
                })
              }
              that.setData({
                lsshop:dataarr,
                goods:data.goods,
              })
              wx.nextTick(()=>{
                that.getScrollBarTop()
              });
            }
            //获取商铺购物车
            wx.request({
              url: url + 'toShoppingCartList.action',
              data:{
                type:fenleitype,
                openId:openId,
                shopId:dianpuId,
                orgId:schoolid,
              },
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(res){
                console.log(res);
                if(res.data.errorCode == -1){
                  dianpu_all = res.data.body.shopCarList;
                  dianpu_all.forEach((v)=>{
                    let obj = {};   
                    obj.goodid = v.goodsId;
                    obj.flag = false;
                    obj.num = v.num;
                    obj.price = v.price;
                    console.log(obj);
                    goodid_all.push(obj);
                  })
                  that.setData({dianpu_shop:dianpu_all})
                  console.log(goodid_all);
                }
              }
            })
            //获取购物车列表
            wx.request({
              url: url + 'getShoppingCartAllList.action',
              data:{
                floorId:floorid,
                openId:openId,
                orgId:schoolid,
              },
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(res){
                console.log(res);
                if(res.data.errorCode == -1){
                  gouwuche_all = res.data.body.shopCarList;
                }
              }
            })
            //获取分类
            wx.request({
              url: url + 'getGoodsListByshopId.action',
              data: {
                type:res.data.body.type,
                shopId: res.data.body.shopId,
                orgroleId :schoolid,
              },
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(r){
                console.log(r);
                let precent = 100
                if(r.data.errorCode == -1){
                  let fenlei1 = r.data.body.classifyList;
                  let width = '100%'
                  if(fenlei1.length > 7){
                    precent = parseInt((fenlei1.length + 1)/2) * 25 
                    width = (100 / precent * 100).toFixed(2) + '%'
                  }
                  that.setData({
                    count:precent+'%',
                    fenlei1,
                    width
                  })
                  
                  classifyId = fenlei1.length ? fenlei1[0].classifyId : 0          

                  if(fenleiid){
                    classifyId = fenleiid
                    that.setData({
                      indexs:fenleiid,
                    })
                  }
                  //获取分类下的商品
                  
                  console.log(classifyId);
                  setTimeout(function(){
                    huoqu(fenleitype, classifyId, schoolid, shopid);
                  },300)
                }
              }
            })
          }
        })
        
        
      },
    })
    
    
  },
  onPageScroll: function (ev) {
    console.log(ev.scrollTop,this.data.scrollTop);
    if(ev.scrollTop >= this.data.scrollTop){
      this.setData({
        scrollFixed:true
      }) }else {
        this.setData({
          scrollFixed:false
        })
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    shopnum = that.data.shopnum;
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
  getScrollBarTop(){
    console.log('inininini');
    const query = wx.createSelectorQuery().in(this)
    query.select('#scroll-main').boundingClientRect(function(res){
      that.setData({
        'scrollTop':res.top
      })
    }).exec()
  },
  huadong:function(e){
    console.log(e);
    let scrollLeft = Math.ceil(e.detail.scrollLeft);
    let scrollWidth = Math.ceil(e.detail.scrollWidth);
    let marginleft = scrollLeft/scrollWidth * 100 + '%';
    that.setData({
      marginleft,
    })
  },
  _joinOneToCar:function(e){
    let dataset = e.currentTarget.dataset;
    let {goodsId,specifiName,specifiValue,price,orgId} = this.data.item.children[0]
    let {dianpu_shop} = that.data
    console.log(this.data.item);
    wx.request({
      url: url + 'addShoppingCart.action',
      data:{
        goodsId,
        openId:openId,
        specifiName,
        price,
        specifiValue,
        num:1,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          let id = res.data.body.shoppingCartId
          let flag = true
          dianpu_shop.forEach(
            i => {
             if (i.goodsId == goodsId){
               i.num++
               flag = false
             }
            }
          )
              if (flag){
                let obj = {
                  orgId,
                  goodsId,
                  num	:	1,
                  price	:	price,
                  shoppingCartId:	id,
                  type	:	fenleitype,
                  specifiName	:	specifiName
                }
                dianpu_shop.push(obj)
              }
          that.setData({
            goodid,
            jiajian:0,
            zhezhao: 'none-display',
            zhezhao1: 'none-display',
            kouwei: 'none-display',
            dianpu_shop
          })
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      }
    })
    
  },
  opengouwu:function(e){
    let dataset = e.currentTarget.dataset; 
    let item = dataset.item  
    console.log(dataset,'dataset');
    let goodsId = dataset.children[0].goodsId
    let isMulti = dataset.children.length > 1 ? true : false
    shop_ids = dataset.shops;                        
    shop_id = dataset.shop;
    guigename = dataset.specifiname;
    guigeval = dataset.specifivalue;
    this.setData({
      zhezhao1: 'display',
      children: dataset.children,
      name: dataset.name,
      shopimg: dataset.img,
      childprice: dataset.children[0].price,
      isMulti,
      goodsId,
      index:0,
      item
    })
  },
  zhezhao:function(){
    that.setData({
      zhezhao:'none-display',
    })
  },
  zhezhao1:function(){
    that.setData({
      zhezhao1:'none-display',
    })
  },
  click1:function(){
    console.log('this.zhaozhao');
    that.setData({
      zhezhao1:'none-display',
    })
  },
  _addToCar(data,index,goodsId){

    wx.request({
      url: url + 'addShoppingCart.action',
      data,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        let {fenleishop,dianpu_shop} = that.data
        if(res.data.errorCode == -1){
          fenleishop.forEach((v)=>{
            if(v.goodsId == goodid){
              v.guige = false;
              v.flagnum = true;
              v.jiajiannum = false;
            }
          })
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
          let id = res.data.body.shoppingCartId
          let flag = true
          fenleishop[index].shoppingCartId = id
          dianpu_shop.forEach(
            i => {
             if (i.goodsId == goodsId){
               i.num++ ;
               flag = false
             }
            }
          )
          if (flag){
            let obj = {
              orgId	:	fenleishop[index].children[0].orgId,
              goodsId	:	fenleishop[index].children[0].goodsId,
              num	:	1,
              picUrl	:fenleishop[index].pigUrl,
              price	:	fenleishop[index].children[0].price,
              shoppingCartId:	id,
              type	:	fenleitype,
              goodsName	:	fenleishop[index].name,
              specifiName	:	fenleishop[index].children[0].specifiName
            }
            dianpu_shop.push(obj)
          }
          that.setData({
            fenleishop,dianpu_shop
          })
        }
      }
    })
  },
  _testIfAndriod(){
    let result
    wx.getSystemInfo({
      success(res){
        console.log(res);
        result = res.platform != "ios"
      }
    })
    return result
  },
  _initShopCarId(fn){
    wx.request({
      url: url + 'toShoppingCartList.action',
      data:{
        type:fenleitype,
        openId:openId,
        shopId:dianpuId,
        orgId:schoolid,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.errorCode == -1){
          dianpu_all = res.data.body.shopCarList;
          fn()
        }
      }
    })
  },
  _initKindShop(fenleishop){
    // let fenleishop = that.data.fenleishop
    fenleishop.forEach(
      i => {
        i.children.forEach(
          item => {
            dianpu_all.forEach(
              d => {
                if (d.goodsId == item.goodsId){
                  i.num = d.num
                }
              }
            )
          }
        )
      }
    )
    that.setData({fenleishop})
  },
  makephone:function(e){
    let phoneNumber = e.currentTarget.dataset.phone
    if (this._testIfAndriod()){
      wx.showModal({
        title: '提示',
        content: '确定拨打电话吗',
        success(r){
          if (r.confirm) {
            console.log('用户点击确定')
            wx.makePhoneCall({
              phoneNumber,
            })
          } else if (r.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.makePhoneCall({
        phoneNumber,
      })
    }
  },
  clickfenlei:function(e){
    console.log(e);
    jiesuanid = '' ;
    diannum = 0 ;
    allprice = 0 ;
    that.setData({
      indexs:e.currentTarget.dataset.index,
    })
    classifyId = e.currentTarget.dataset.index;
    huoqu(fenleitype,classifyId,schoolid,shopid);
  },
  xuanguige:function(e){
    console.log(e,'xuanguige');
    let dataset = e.currentTarget.dataset;
    goodid = dataset.goodid;
    let {item} = dataset
    // specifiName = dataset.specifiName; 
    let kongwei = 0;
    if(dataset.children.length<3){
      kongwei = 3 - dataset.children.length;
    }
    else if(dataset.children.length<6){
      kongwei = 6 - dataset.children.length;
    }
    else{
      kongwei = 9 - dataset.children.length;
    }
    that.setData({
      zhezhao:'display',
      kouwei:'display',
      gouwu:'none-display',
      children:dataset.children,
      name: dataset.name,
      kongwei: kongwei,
      childprice:dataset.children[0].price,
      item
    })
  },
  dianguige:function(e){
    console.log(e,'dianguige');
    let dataset = e.currentTarget.dataset;
    let {item} = dataset
    goodid = dataset.goodid;
    that.setData({
      index: dataset.ind,
      childprice: dataset.price,
      item
    })
  },
  close_kouwei:function(){
    that.setData({
      zhezhao:'none-display',
      xuanguige:'display',
      kouwei:'none-display',
    })
  },
  joingouwu:function(e){
    let dataset = e.currentTarget.dataset;
    let {goodsId,specifiName,specifiValue,price,orgId} = this.data.item
    let {dianpu_shop} = that.data
    console.log(this.data.item);
    wx.request({
      url: url + 'addShoppingCart.action',
      data:{
        goodsId,
        openId:openId,
        specifiName,
        price,
        specifiValue,
        num:1,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          let id = res.data.body.shoppingCartId
          let flag = true
          dianpu_shop.forEach(
            i => {
             if (i.goodsId == goodsId){
               i.num++
               flag = false
             }
            }
          )
              if (flag){
                let obj = {
                  orgId,
                  goodsId,
                  num	:	1,
                  price	:	price,
                  shoppingCartId:	id,
                  type	:	fenleitype,
                  specifiName	:	specifiName
                }
                dianpu_shop.push(obj)
              }
          that.setData({
            goodid,
            jiajian:0,
            zhezhao: 'none-display',
            zhezhao1: 'none-display',
            kouwei: 'none-display',
            dianpu_shop
          })
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      }
    })
    
  },
  addshopnum:function(e){
    let dataset = e.currentTarget.dataset;
    let {goodsId,specifiName,specifiValue} =  dataset.item;
    let data = {goodsId,specifiName,specifiValue,openId,num:1,price: dataset.price}
    this._addToCar(data,dataset.index,goodsId)
    // allprice = allprice + dataset.price*1;
    // shopnum=1;
    // fenleishop.forEach((v)=>{
    //   console.log(v.children[0].goodsId,dataset.goodid,'aa');
    //   if(v.children[0].goodsId == dataset.goodid){
    //     v.flagnum = false;
    //     v.jiajiannum = true;
    //     v.guige = false;
    //     v.num = 1
    //   }
    // })
    // that.setData({
    //   allprice:allprice,
    //   fenleishop:fenleishop,
    // })
   
  },
  jian_num:function(e){
    let num = e.target.dataset.num - 1
    if (num == -1)  return
    let gouwuid = e.currentTarget.dataset.gouwuid;
    gouwunum(gouwuid, openId, num,e.currentTarget.dataset.goodid);
  },
  jia_num:function(e){
    shopnum++;
    diannum++;
    let num = e.target.dataset.num + 1
    let gouwuid = e.currentTarget.dataset.gouwuid;
    gouwunum(gouwuid, openId, num,e.currentTarget.dataset.goodid);
  },
  shurunum:function(e){
    shopnum = e.detail.value;
    that.setData({
      shopnum: shopnum,
    })
  },
  clicklogo: function () {
    wx.request({
      url: url + 'toShoppingCartList.action',
      data:{
        type:fenleitype,
        openId:openId,
        shopId:dianpuId,
        orgId:schoolid,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          dianpu_all = res.data.body.shopCarList;
          console.log(goodid_all);
        }
      that.setData({dianpu_shop:dianpu_all})
      }
    })
    that.setData({
      zhezhao:'display',
      gouwu:'display',
      kouwei:'none-display',
    })
  },
  zhezhao:function(){
    that.setData({
      zhezhao:'none-display',
    })
  },
  del_dianpu:function(){
    dianpu_all.forEach((v)=>{
      gouwustr = gouwustr + v.shoppingCartId + ',';
    })
    wx.showModal({
      title: '提示',
      content: '确定都删除吗',
      success:function(r){
        console.log(r);
        if(r.confirm){
          wx.request({
            url: url + 'deleteShopCartList.action',
            data: {
              shoppingCartId: gouwustr.slice(0, -1),
              openId: openId,
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              that.setData({
                dianpu_all:'',
                dianpu_shop:[]
              })
            }
          })
        }
      }
    })
    
  },
  gojiesuan:function(e){
    let list = that.data.dianpu_shop.filter(
      i => i.num
    )
  if(!list.length){
    wx.showToast({
      title:'请先添加商品',
      icon:'none'
    })
    }else{
      let allgouwuid = ''
      // let {shoppingCartId} = list[0]
      // let data = {shoppingCartId,openId,orgId:schoolid}
      list.forEach(
        i => {
          allgouwuid += `${i.shoppingCartId},`
        }
      )
      wx.navigateTo({
        url: '../confirmorder/confirm?gouwu='+allgouwuid,
      })

    }
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