(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"06c6":function(n,t,e){"use strict";var o=e("799e"),i=e.n(o);i.a},"14d6":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return e.e("node-modules/@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot").then(e.bind(null,"54fd"))},i=function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"6958"))},u=function(){return e.e("node-modules/@dcloudio/uni-ui/lib/uni-icon/uni-icon").then(e.bind(null,"6fba"))},c={components:{uniSwiperDot:o,uniPopup:i,uniIcon:u},data:function(){return{img_info:[{content:"../../static/logo/head-portrait.png"},{content:"../../static/logo/u10410.png"},{content:"../../static/login_other/qq.png"}],current:0,mode:"default",height:0,width:0,itemList:[],type:!1,loading:55,reconnect:!0,load:!1,coupon:!1}},onLoad:function(){this.height=n.getSystemInfoSync().windowHeight,this.width=.85*n.getSystemInfoSync().screenWidth,this.getShopData()},onShow:function(){this.coupon&&this.showCoupon()},methods:{changeIndicatorDots:function(n){this.current=n.detail.current},showCoupon:function(){var t=n.getStorageSync("currentTime"),e=new Date,o=e.getFullYear(),i=e.getMonth()+1,u=e.getDate(),c=o+"-"+i+"-"+u;t!=c?(n.setStorageSync("currentTime",c),this.type=!0):this.type=!1},getShopData:function(){var t=this;n.request({url:this.apiServer+"thingServer/openThingServer/getClothesType",method:"POST",header:{"content-Type":"application/x-www-form-urlencoded"},success:function(e){if(200===e.data.status){for(var o=e.data.data,i=0;i<o.length;i++)o[i].imagePath||(o[i].imagePath="../../static/zhanwei.jpg");t.itemList=o,t.reconnect=!0,t.coupon=!0,t.showCoupon()}else t.coupon=!1,n.showToast({title:e.data.msg,duration:2e3,icon:"none"}),setTimeout(function(){t.reconnect=!1},2e3)},fail:function(){t.reconnect=!1,t.coupon=!1},complete:function(){t.load=!1}})},goShopOrder:function(t,e){n.reLaunch({url:"../laundry/laundry?typeNo="+t.typeNo+"&index="+e})},closeCoupon:function(){this.type=!1},reConnection:function(){this.load=!0,this.getShopData()},goRouter:function(){n.navigateTo({url:"../getcoupon/getcoupon"})}}};t.default=c}).call(this,e("6e42")["default"])},"498d":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},7462:function(n,t,e){"use strict";e.r(t);var o=e("14d6"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},"799e":function(n,t,e){},f43c:function(n,t,e){"use strict";e.r(t);var o=e("498d"),i=e("7462");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);e("06c6");var c=e("2877"),r=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,"bce21e4e",null);t["default"]=r.exports}},[["b53d","common/runtime","common/vendor"]]]);