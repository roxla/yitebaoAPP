(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pushaddress/pushaddress"],{"35ef":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return s}),n.d(t,"b",function(){return o})},3705:function(e,t,n){},"6bd9":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-icon/uni-icon").then(n.bind(null,"6fba"))},o={components:{uniIcon:s},data:function(){return{height:0,userName:"",tel:"",locationAddress:"",fullAddress:"",longitude:"",latitude:""}},onLoad:function(t){this.height=e.getSystemInfoSync().windowHeight},onNavigationBarButtonTap:function(){e.request({url:this.apiServer+"userServer/cunUserServer/addUserAddress",method:"POST",data:{OpenId:e.getStorageSync("openid"),userTel:this.tel,userName:this.userName,address:this.locationAddress,addressDetails:this.fullAddress,lng:this.latitude,lat:this.longitude},header:{"content-Type":"application/x-www-form-urlencoded"},success:function(t){console.log(t," at pages\\pushaddress\\pushaddress.vue:73"),200===t.data.status?(e.showToast({title:"地址添加成功",duration:2e3,icon:"none"}),setTimeout(function(){e.reLaunch({url:"../address/address"})},2e3)):e.showToast({title:t.data.msg,duration:2e3,icon:"none"})},fail:function(){e.showToast({title:"网络请求失败",duration:2e3,icon:"none"})}})},methods:{getAddress:function(){var t=this;e.chooseLocation({success:function(e){t.locationAddress=e.address,t.latitude=e.latitude,t.longitude=e.longitude}})}}};t.default=o}).call(this,n("6e42")["default"])},b5ae:function(e,t,n){"use strict";n.r(t);var s=n("35ef"),o=n("ddd2");for(var d in o)"default"!==d&&function(e){n.d(t,e,function(){return o[e]})}(d);n("edea");var u=n("2877"),i=Object(u["a"])(o["default"],s["a"],s["b"],!1,null,"ee13fe68",null);t["default"]=i.exports},ddd2:function(e,t,n){"use strict";n.r(t);var s=n("6bd9"),o=n.n(s);for(var d in s)"default"!==d&&function(e){n.d(t,e,function(){return s[e]})}(d);t["default"]=o.a},edea:function(e,t,n){"use strict";var s=n("3705"),o=n.n(s);o.a}},[["431d","common/runtime","common/vendor"]]]);