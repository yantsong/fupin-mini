//index.js 
const app = getApp();
var util = require('../../utils/util.js'); 
// import { getNotice } from '../../api/api';
const IMGURL = util.imgurl
var url = util.url , cityid = 0 , schoolid = 0 ,floorid = 0 , dingwei = 0 , louid = 0 ;
var imgUrl = util.imgUrl , xihuan = [] , names = '' , kongwei = '' , shop_ids = '' ; 
var that = '' , openId = '' , shop_id = '' , guigename = '' , guigeval = '' , gouwunum = '' , gouwuprice = '' ;
function fenlei(classify,num){
  let fenleiup = [], fenleidown = [];  
  classify.forEach((v, ind) => {
    if (ind < num) { 
      fenleiup.push(v);
    }
    else {
      fenleidown.push(v);
    }
  })
  console.log(fenleiup,fenleidown,'aaaaaa');
  that.setData({
    fenlei: fenleiup,
    fenlei1: fenleidown,
  })
}
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    searchResult:[],
    caini:9,
    imgUrl:imgUrl,
    recommendUrl:IMGURL,
    url:url,
    zhezhao:'none-display',
    marginleft: 0,
    index: 0,
    schoolid:null,
    floorid:null,
    inputText:'',
    schoolname:'未选择',
    recommendList:'',
    isMulti: false,
    goodsId: '',
    fenlei:[],
    fenlei1:[],
    showNotice:false,
    noticeNoFrist:false,
    classify:[],
    count:'100%',
    notice:{}
  },

  onLoad: function() { 
    that = this;
    
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log(res,'useIndo')
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    
    
  },
  
  onShow:function(){
    let that = this
    let schoolid, floorid, openId, cityid
    wx.setStorageSync('cityid','ff808081690dcccf01690e66da6e0090')
    //获取各种id
    try {

            schoolid = wx.getStorageSync('schoolid')
            floorid = wx.getStorageSync('floorid')
            openId = wx.getStorageSync('openId')
            cityid = wx.getStorageSync('cityid')
          console.log(schoolid,'=schoolid',floorid, '=flid', openId, '=pid', cityid, '=cityid');

              if (!openId){
                console.log('no open id')
              }else{
                dingwei = 1;
                louid = 1;
                that.setData({openId,schoolid,floorid,cityid})
                this._getbanner(schoolid)

                this._getRecommend(schoolid)

                this._getbanner(schoolid)
            
                this._getKinds(schoolid,floorid)
            
                this._getBounced(schoolid,openId)
            
                // this._getSignUp(schoolid)
            
                this._getForYou(schoolid,floorid)
                
                this._setSchoolName()
              }

          } catch (error) {
          console.log(error);
      }
      // ceshi
      // setTimeout( () => { wx.navigateTo({
      //   url: '../frdPay/frdPay',
      // })},300)
   
  },
  hidenotice: function () {
    wx.setStorageSync('noticeNoFrist', true)
    this.setData({
      showNotice: false
    })
  },
_setSchoolName(){
  let schoolname = wx.getStorageSync('schoolname')
  this.setData({schoolname})
},
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  clickbanner:function(e){
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let shopId = dataset.shopid
    let {goodsid} = dataset
    let testid = 'ff8080816edbaac4016eeae94fa50005'
    if(testid) {
      wx.navigateTo({
        url: `/pages/detail/detail?goodsId=${testid}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
    // wx.request({
    //   url: url + 'getShopIfBusiness.action',
    //   method: 'post',
    //   data: {
    //     shopId,
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     if (!res.data.body.open) {
    //       wx.showToast({
    //         title: '请到推荐页面查看具体营业时间',
    //         icon: 'none',
    //       })
    //       return
    //     }else{
    //           if (dataset.type == 0) {}
    //           else if (dataset.type == 1 || dataset.type == 2 || dataset.type == 11 || dataset.type == 22) {
    //           if (dataset.type == 1 || dataset.type == 2){
    //             wx.navigateTo({
    //               url: '../dianpuneiye/dianpuneiye?shopid=' + dataset.url,
    //             })
    //           }else{
    //             console.log(dataset.url,dataset.shopid);
    //             wx.navigateTo({
    //               url: '../dianpuneiye/dianpuneiye?fenleiid=' + dataset.url + '&shopid=' + dataset.shopid,
    //             })
    //           }
    //         }else if(dataset.type == 5){
    //           wx.switchTab({
    //             url: '../tuijian/tuijian',
    //           })
    //         }
    //         else {
    //           wx.navigateTo({
    //             url: '../baoming/baoming?id=' + dataset.url,
    //           })
    //         }
    //       }
    //   }
    // })
   
  },
  clickCard(e){
    console.log(e);
    const goodsId = e.currentTarget.dataset.shop
    wx.navigateTo({
      url: `/pages/detail/detail?goodsId=${goodsId}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  clicktab:function(e){
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let shopId = dataset.shopid
    let {classifyid} = dataset
    wx.navigateTo({
      url: `/pages/catgroy/catgroy?classifyid=${classifyid}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    // if (dataset.type == 0) {

    // }
    // else if (dataset.type == 1 || dataset.type == 2 || dataset.type == 11 || dataset.type == 22) {
    //   if(dataset.type == 1 || dataset.type == 2){
    //     wx.navigateTo({
    //       url: '../dianpuneiye/dianpuneiye?shopid=' + dataset.url,
    //     })
    //   }
    //   else{
    //     console.log(dataset.url,dataset.shopid);
    //     wx.navigateTo({
    //       url: '../dianpuneiye/dianpuneiye?fenleiid=' + dataset.url + '&shopid=' + dataset.shopid,
    //     })
    //   }
    // }
    // else if(dataset.type == 5){
    //   wx.switchTab({
    //     url: '../tuijian/tuijian',
    //   })
    // }
    // else {
    //   wx.navigateTo({
    //     url: '../baoming/baoming?id=' + dataset.url,
    //   })
    // }
  },
  _getForYou(orgroleId,floorId){
    wx.request({
      url: url + 'getMainGoodsList.action',
      data: {
        orgroleId,
        floorId:  floorId || '',
        type: 1,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errorCode == -1) {
          let length = data.body.goodsList.length;
          let kongnum = 0;
          if (length % 3 != 0) {
            kongnum = 3 - length % 3;
          }
          xihuan = data.body.goodsList;
          that.setData({
            xihuan: data.body.goodsList,
            kongnum: kongnum,
          })
        }
        else {
          wx.showToast({
            title: data.msg || '网络错误',
            icon: 'none',
          })
        }
      }
    })
  },
  _getbanner(orgroleId){
    wx.request({
      url: url + 'getBannerList.action',
      method: 'post',
      data: {
        orgroleId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          banner: res.data.body.bannerList
        })
      }
    })
  },
  _getSignUp(orgId){
    wx.request({
      url: url + 'getSignUpList.action',
      data:{
        orgId,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        let data = res.data;
        if(data.errorCode == -1){
          if(data.body.list){
            that.setData({
              youhuili:data.body.list,
            })
          }
          else{
            that.setData({
              none:'height:0',
              youhuilist: 'none-display',
            })
          }
        }
        else{
          wx.showToast({
            title: data.msg || '网络错误',
            icon:'none',
          })
        }
      }
    })
  },
  _getBounced(orgroleId,openId){
      //获取推荐
      wx.request({
        url: url + 'getBounced.action',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: {
          orgroleId,
          openId
        },
        success: function (res) {
          console.log(res);
          let data = res.data;
          if (data.errorCode == -1) {
            let notice = data.body
            let showNotice = !!notice.noticeContent
            // let noticeNoFrist = !!wx.getStorageSync('noticeNoFrist')
            that.setData({
              notice,
              showNotice,
              // noticeNoFrist
            })
          }
          else {
            wx.showToast({
              title: data.msg || '网络错误',
              icon: 'none',
            })
          }
        }
      })
  },
  //获取分类
  _getKinds(orgroleId,floorId){
    var canshu = {};
        if (louid == 1) {
          canshu = {
            orgroleId,
            floorId
          }
        }
        else {
          canshu = {
            orgroleId,
          }
        }
        wx.request({
          url: url + 'getClassifyList.action',
          data: canshu,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success: function (res) {
            console.log(res);
            let data = res.data;
            let wunum = '';
            let classify = data.body.classifyList;
            if(classify.length>4){
              that.setData({
                fenleixz: 'display',
                progress: 'display',
              })
              let length = classify.length;
              console.log(length);
              if (length >= 8) {
                let num = length / 2;
                that.setData({
                  fenleiul: 'display',
                  fenleili: 'display',
                })
                if(length==8){
                  fenlei(classify,num);
                  that.setData({
                    progress:'none-display',
                  })
                }
                else if(length > 8){
                  if(length%2 == 0){
                    fenlei(classify,num);
                  }
                  else{
                    num = Math.ceil(length/2);
                    fenlei(classify,num);
                  }
                  let width = 4 / num;
                  that.setData({
                    width: width * 100 + '%',
                  })
                }
              }
              else{
                fenlei(classify,4)
                // that.setData({
                //   fenleili:'none-display',
                // })
              }
            }
            else if(classify>=1&&classify<=4){
              that.setData({
                fenleili:'none-display',
                fenliul:'display',
                progress:'none-display',
                fenleixz:'display',
              })
            }
            else{
              that.setData({
                fenleiul:'none-display',
                progress:'none-display',
                fenleixz:'none-display',
              })
            }
            if (data.errorCode == -1) {
              
            }
            else {
              wx.showToast({
                title: data.msg || '网络错误',
                icon: 'none',
              })
            }
            console.log('classify', classify);
            let precent = 100
            if(classify.length > 8){
              precent = Math.ceil((classify.length)/2) * 25 
            }else{
              precent = 100
            }
            that.setData({classify,count:precent+'%'})
          }
        })
  },
  _getRecommend(orgId){
    wx.request({
      url: url + 'getPushGoodS.action',
      data: {
        orgId,
        floorId:  floorid || '',
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errorCode == -1) {
          that.setData({
            recommendList: data.body.goodsPushList
          })
        }
        else {
          wx.showToast({
            title: data.msg || '网络错误',
            icon: 'none',
          })
        }
      }
    })
  },
  //猜你喜欢
  _getYourLove(e,schoolid,floorid){
    let orgroleId = schoolid || this.data.schoolid
    let floorId = floorid || this.data.floorid
    console.log(orgroleId,'schoid');
    wx.request({
      url: url + 'getMainGoodsList.action',
      data: {
        orgroleId,
        floorId:  floorId || '',
        type: 1,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errorCode == -1) {
          xihuan = data.body.goodsList;
          that.setData({
            xihuan: data.body.goodsList
          })
        }
        else {
          wx.showToast({
            title: data.msg || '网络错误',
            icon: 'none',
          })
        }
      }
    })
  },
  //重置搜索结果
  resetSearch(){
    this.setData({
      inputText:'',
      searchResult:[]
    })
  },
  // 搜索
  searchFoods(e){
    let str = e.detail.value
    if (!str) {
      this.resetSearch()
      return
    }
    this.setData({
      inputText: str
    })
    wx.request({
      // url: url + 'addFeedBack',
      url: url + 'getMainGoodsList.action',
      data: {
        orgroleId: this.data.schoolid,
        floorId: this.data.floorid ? this.data.floorid : undefined,
        type: 1,
        goodsName:str
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let data = res.data;
        if (data.errorCode == -1) {
          let searchResult = data.body.goodsList;
          that.setData({
            searchResult
          })
        }
        else {
          wx.showToast({
            title: data.msg || '网络错误',
            icon: 'none',
          })
        }
      }
    })
  },
  goschool:function(){
    wx.navigateTo({
      url: '../dingweischool/dingweischool?cityid='+cityid,
    })
  },
  gobaoming:function(e){
    wx.navigateTo({
      url: '../baoming/baoming?id='+e.currentTarget.dataset.id,
    })
  },
  godianpu:function(e){
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../dianpuneiye/dianpuneiye?shopid='+dataset.shop,
    })
  },
  huadong:function(e){
    console.log(e);
    let scrollLeft = Math.ceil(e.detail.scrollLeft);
    let marginleft = scrollLeft/670 * 100 + 3 + '%';
    that.setData({
      marginleft:marginleft,
    })
  },
  joingouwu:function(e){
    let dataset = e.currentTarget.dataset;   
    console.log(dataset,'dataset');
    let goodsId = dataset.children[0].goodsId
    let isMulti = dataset.children.length > 1 ? true : false
    shop_ids = dataset.shops;                        
    shop_id = dataset.shop;
    guigename = dataset.specifiname;
    guigeval = dataset.specifivalue;
    this.setData({
      zhezhao: 'display',
      children: dataset.children,
      name: dataset.name,
      kongwei: kongwei,
      shopimg: dataset.img,
      childprice: dataset.children[0].price,
      isMulti,
      goodsId,
      index:0
    })
  },
  dianguige: function (e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    console.log(dataset,'dddd');
    let goodsId = dataset.goodsid
    this.setData({
      index: dataset.ind,
      childprice: dataset.price,
      goodsId
    })
    guigename = dataset.name;
    guigeval = dataset.specifivalue;
    gouwuprice = dataset.price;
  },
  zhezhao:function(){
    that.setData({
      zhezhao:'none-display',
    })
  },
  joingouwu1:function(e){
    console.log(e);
    let dataset = e.currentTarget.dataset;
    console.log(dataset,'adta');
    let goodsId = this.data.goodsId
    gouwunum = '1';
    gouwuprice = dataset.price; 
    openId = this.data.openId
    wx.request({
      url: url + 'addShoppingCart.action?goodsId=' + goodsId +'&shopId='+ shop_ids + '&openId=' + openId + '&price=' + gouwuprice + '&num=' + gouwunum + '&specifiValue=' + guigeval + '&specifiName=' + guigename, 
      success:function(res){                                            
        if(res.data.errorCode == -1){
          wx.showToast({
            title: res.data.msg || '网络错误',
            icon:'none',
          })
        }
        else{
          wx.showToast({
            title: res.data.msg || '网络错误',
            icon: 'none',
          })
        }
      }
    })
  },
  close_kouwei: function () {
    that.setData({
      zhezhao: 'none-display',
    })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
