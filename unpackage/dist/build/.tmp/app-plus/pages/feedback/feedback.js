(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/feedback/feedback"],{3439:function(e,t,n){"use strict";n.r(t);var i=n("cfe3"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a},"46b1":function(e,t,n){},"6e0f":function(e,t,n){"use strict";var i=n("46b1"),a=n.n(i);a.a},a507:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})},cfe3:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return Promise.all([n.e("common/vendor"),n.e("components/w-picker/w-picker")]).then(n.bind(null,"9894"))},a=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-icon/uni-icon").then(n.bind(null,"6fba"))},o={components:{uniIcon:a,wPicker:i},data:function(){return{type:"选择反馈类型",selectList:[{label:"商品相关",value:"0"},{label:"物流状况",value:"1"},{label:"客户服务",value:"2"},{label:"优惠活动",value:"3"},{label:"产品体验",value:"4"},{label:"产品功能",value:"5"},{label:"其他问题",value:"6"}],textNum:0,feedText:"",imgList:[]}},onLoad:function(){this.checkLogin("../feedback/feedback",1)},onNavigationBarButtonTap:function(){e.switchTab({url:"../my/my"})},watch:{feedText:function(e){this.textNum=this.feedText.length},immediate:!0,deep:!0},methods:{toggleTab:function(){this.$refs.selector.show()},onConfirm:function(e){console.log(e," at pages\\feedback\\feedback.vue:110"),this.type=e.result},chooseImage:function(){var t=this;e.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},viewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},delImg:function(e){this.imgList.splice(e.currentTarget.dataset.index,1)},upData:function(){"选择反馈类型"!=this.type?console.log(this.imgList," at pages\\feedback\\feedback.vue:139"):e.showToast({title:"请选择反馈类型",duration:2e3,icon:"none"})}}};t.default=o}).call(this,n("6e42")["default"])},fdb7:function(e,t,n){"use strict";n.r(t);var i=n("a507"),a=n("3439");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("6e0f");var u=n("2877"),c=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,"8f5e383a",null);t["default"]=c.exports}},[["0359","common/runtime","common/vendor"]]]);