(function(t){function e(e){for(var a,o,i=e[0],l=e[1],c=e[2],d=0,f=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,i=1;i<n.length;i++){var l=n[i];0!==s[l]&&(a=!1)}a&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},s={app:0},r=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-full space-y-4",attrs:{id:"app"}},t._l(t.datasets,(function(t){return n("DatasetAccordion",{key:t.name,staticClass:"card",attrs:{id:t.id,"amount-of-categories":t.label_amount,"amount-of-pictures":t.image_amount,title:t.name,"creation-date":t.created_at,"unlabeled-count":t.status.is_completely_labeled,"status-text":t.status.text,categories:t.label}})})),1)},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Accordion",{scopedSlots:t._u([{key:"accordion-preview",fn:function(){return[n("div",{staticClass:"flex w-full justify-between"},[n("div",{staticClass:"flex items-center w-5/6 text-primary font-bold"},[n("div",[n("h3",[t._v(t._s(t.title))])])]),n("div",{staticClass:"w-48 flex justify-end h-10 pr-8 text-white"},[n("div",{staticClass:"w-full p-2 pl-6 pr-6 rounded-2xl text-center",class:t.statusColor},[n("p",[t._v(t._s(t.statusText))])])])])]},proxy:!0},{key:"accordion-content",fn:function(){return[n("table",{staticClass:"w-1/2"},[n("tbody",[n("tr",[n("td",{staticClass:"font-bold"},[t._v("Erstellt am")]),n("td",[t._v(t._s(t.creationDate))])]),n("tr",[n("td",{staticClass:"font-bold"},[t._v("Anzahl Bilder")]),n("td",[t._v(t._s(t.amountOfPictures))])]),n("tr",[n("td",{staticClass:"font-bold"},[t._v("Anzahl Kategorien")]),n("td",[t._v(t._s(t.amountOfCategories))])]),n("tr",[n("td",{staticClass:"font-bold"},[t._v("Unklassifizierte Bilder")]),n("td",[t._v(t._s(t.unlabeledCount))])])])]),n("a",{staticClass:"button-inverted mt-4 mb-8",attrs:{href:"/datasets/"+t.id}},[t._v("Details anzeigen")]),n("div",{staticClass:"w-full"},t._l(t.categories,(function(e){return n("div",{key:e.name,staticClass:"w-full mb-8"},[n("p",{staticClass:"font-bold mb-1"},[t._v(t._s(e.name))]),n("div",{staticClass:"flex space-x-2"},t._l(e.image_ids,(function(e){return n("img",{key:e,attrs:{loading:"lazy",src:t.baseImagePath+e,width:"80",height:"80"}})})),0)])})),0)]},proxy:!0}])})],1)},i=[],l=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"overflow-hidden"},[n("div",{staticClass:"w-full"},[n("div",{staticClass:"flex justify-between"},[n("div",{staticClass:"text-icon-gray cursor-pointer",on:{click:t.onCollapse}},[n("svg",{class:!0===t.isCollapsed?"transform rotate-90":"",attrs:{id:"arrow",width:"40px",height:"40px",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M9 5l7 7-7 7"}})])]),n("div",{staticClass:"flex w-full items-center pl-2 cursor-pointer",on:{click:t.onCollapse}},[t._t("accordion-preview")],2)]),n("div",{staticClass:"ml-12 mt-5",class:t.collapsed},[n("div",{staticClass:"pt-5"},[t._t("accordion-content")],2)])])])}),c=[],u={name:"Accordion",data:function(){return{isCollapsed:!1}},methods:{onCollapse:function(){this.isCollapsed=!this.isCollapsed}},computed:{collapsed:function(){return!1===this.isCollapsed?"hidden":"visible"}}},d=u,f=n("2877"),p=Object(f["a"])(d,l,c,!1,null,null,null),v=p.exports,m={name:"DatasetAccordion",components:{Accordion:v},props:{title:String,amountOfPictures:String,amountOfCategories:String,unlabeledCount:Number,statusText:String,creationDate:String,id:Number,categories:Array},data:function(){return{baseImagePath:"/images/"}},computed:{statusColor:function(){var t="";return t=0===this.unlabeledCount?"bg-green":"bg-yellow",t}}},b=m,_=Object(f["a"])(b,o,i,!1,null,"7aaa141a",null),h=_.exports,g={name:"App",components:{DatasetAccordion:h},created:function(){this.datasets=JSON.parse(document.getElementById("django_dataset_list").value)},data:function(){return{datasets:[]}}},C=g,w=Object(f["a"])(C,s,r,!1,null,null,null),y=w.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(y)}}).$mount("#app")}});
//# sourceMappingURL=datasets.app.js.map