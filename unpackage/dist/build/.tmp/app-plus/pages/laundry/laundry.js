(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/laundry/laundry"],{"753d":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return o.e("node-modules/@dcloudio/uni-ui/lib/uni-icon/uni-icon").then(o.bind(null,"6fba"))},i=function(){return o.e("components/popup-layer/popup-layer").then(o.bind(null,"2854"))},s={components:{uniIcon:n,popupLayer:i},watch:{count:function(t){0===t&&this.$refs.popupRef.close()},immediate:!0,deep:!0},data:function(){return{categoryList:[],subCategoryList:[],shopList:[],count:0,delType:!1,footerType:!1,height:0,categoryActive:"0001",scrollTop:0,scrollHeight:0}},onLoad:function(e){this.height=t.getSystemInfoSync().windowHeight-45,this.$showLoading(),this.getShopList(e.typeNo),this.categoryClickMain(e,e.index)},onNavigationBarButtonTap:function(){this.backPage()},methods:{getShopList:function(e){var o=this,n=t.getStorageSync("shopKey");n?t.request({url:this.apiServer+"thingServer/openThingServer/getTeyClothes",method:"POST",data:{teyKey:n},header:{"content-Type":"application/x-www-form-urlencoded"},success:function(n){if(200===n.data.status){var i=n.data.data;if(i){o.shopList=i;for(var s=0,a=0;a<i.length;a++)s+=parseInt(i[a].number);o.count=s}else o.shopList=[];o.getAllData(e)}else t.showToast({title:n.data.msg,duration:2e3,icon:"none"})},fail:function(){o.reconnect("../laundry/laundry",1)},complete:function(){o.footerType=!0,o.$hideLoading()}}):(this.getAllData(),this.footerType=!0,this.$hideLoading())},scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t,e){var o="0001";t.typeNo&&(o=t.typeNo),this.categoryActive=o,this.getAllShop(o),this.scrollTop=-this.scrollHeight*e},getAllData:function(e){var o=this;t.request({url:this.apiServer+"thingServer/openThingServer/getClothesType",method:"POST",header:{"content-Type":"application/x-www-form-urlencoded"},success:function(e){200===e.data.status?o.categoryList=e.data.data:t.showToast({title:e.data.msg,duration:2e3,icon:"none"})}})},getAllShop:function(e){var o=this;t.request({url:this.apiServer+"thingServer/openThingServer/getClothes",method:"POST",data:{typeNo:e},header:{"content-Type":"application/x-www-form-urlencoded"},success:function(e){if(200===e.data.status){for(var n=e.data.data,i=0;i<n.length;i++)n[i].ImageUrl||(n[i].ImageUrl="../../static/logo/u10410.png"),n[i].num=0;var s=o.shopList;if(0!=s.length)for(var a=0;a<s.length;a++)for(var r=0;r<n.length;r++)s[a].clothesNo==n[r].clotheNo&&(n[r].num=s[a].number);else for(var h=0;h<n.length;h++)n[h].num=0;o.subCategoryList=n}else t.showToast({title:e.data.msg,duration:2e3,icon:"none"})}})},plusShop:function(t,e){t.num=parseInt(t.num)+1,this.count=parseInt(this.count)+1;var o,n=this.shopList,i=!0;if(0!=n){for(var s=0;s<n.length;s++)if(n[s].clothesNo==t.clotheNo){i=!1,o=s;break}i?this.shopList.push({clothesNo:t.clotheNo,clothesName:t.clotheName,number:t.num}):this.shopList[o].number=t.num}else this.shopList.push({clothesNo:t.clotheNo,clothesName:t.clotheName,number:t.num})},lessShop:function(t,e){t.num=parseInt(t.num)-1,this.count=parseInt(this.count)-1;for(var o=0;o<this.shopList.length;o++)if(this.shopList[o].clothesNo==t.clotheNo){if(1==this.shopList[o].number){this.shopList.splice(o,1);break}this.shopList[o].number=t.num;break}},showShop:function(){0!=this.count&&this.$refs.popupRef.show()},backPage:function(){var e=t.getStorageSync("shopKey");e||(e=""),t.request({url:this.apiServer+"thingServer/openThingServer/temporaryClothes",method:"POST",data:{teyKey:e,data:JSON.stringify(this.shopList)},header:{"content-Type":"application/x-www-form-urlencoded"},success:function(e){200===e.data.status?(t.setStorageSync("shopKey",e.data.data),t.switchTab({url:"../index/index"})):t.showToast({title:e.data.msg,duration:2e3,icon:"none"})}})},lessPopup:function(t,e){1!=t.number?(t.number=parseInt(t.number)-1,this.getAllShop(this.categoryActive)):(this.shopList.splice(e,1),this.getAllShop(this.categoryActive)),this.count=parseInt(this.count)-1},delPopup:function(){this.delType=!0},delAllShop:function(t){1==t?(this.shopList=[],this.count=0,this.getAllShop(this.categoryActive),this.delType=!1):this.delType=!1},plusPopup:function(t,e){t.number=parseInt(t.number)+1,this.count=parseInt(this.count)+1,this.getAllShop(this.categoryActive)},submitData:function(){var e=t.getStorageSync("shopKey");e||(e=""),0!=this.count?t.request({url:this.apiServer+"thingServer/openThingServer/temporaryClothes",method:"POST",data:{teyKey:e,data:JSON.stringify(this.shopList)},header:{"content-Type":"application/x-www-form-urlencoded"},success:function(e){200===e.data.status?(t.setStorageSync("shopKey",e.data.data),t.reLaunch({url:"../reserveorder/reserveorder"})):t.showToast({title:e.data.msg,duration:2e3,icon:"none"})}}):t.showToast({title:"请去选择物件",duration:2e3,icon:"none"})}}};e.default=s}).call(this,o("6e42")["default"])},"91fe":function(t,e,o){},b193:function(t,e,o){"use strict";var n=o("91fe"),i=o.n(n);i.a},c800:function(t,e,o){"use strict";o.r(e);var n=o("e128"),i=o("f070");for(var s in i)"default"!==s&&function(t){o.d(e,t,function(){return i[t]})}(s);o("b193");var a=o("2877"),r=Object(a["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},e128:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},f070:function(t,e,o){"use strict";o.r(e);var n=o("753d"),i=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);e["default"]=i.a}},[["0fc2","common/runtime","common/vendor"]]]);