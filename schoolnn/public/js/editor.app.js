(function(e){function t(t){for(var n,s,o=t[0],l=t[1],c=t[2],d=0,y=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&y.push(a[s][0]),a[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(y.length)y.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},i=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-primary font-sans",attrs:{id:"app"}},[r("div",{staticClass:"w-full card"},[1==e.invalidState?r("div",{staticClass:"w-full p-4 rounded text-white bg-red"},[r("p",[e._v(e._s(e.errorMessage))])]):e._e(),r("div",{staticClass:"p-4 flex items-start flex-wrap"},[r("div",{staticClass:"w-1/4 self-stretch pt-6 border-text-gray border-dotted border-r-2"},[r("h3",{staticClass:"mb-4"},[e._v("Verfügbare Schichten")]),r("draggable",{staticClass:"space-y-4",attrs:{group:{name:"layer",pull:"clone",put:!1},move:e.onMove,clone:e.onClone},on:{start:function(t){e.drag=!0},end:function(t){e.drag=!0}},model:{value:e.providedLayerList,callback:function(t){e.providedLayerList=t},expression:"providedLayerList"}},e._l(e.providedLayerList,(function(e){return r("div",{key:e.type,staticClass:"flex"},[r("layer-preview",{attrs:{title:e.default_name}})],1)})),0)],1),r("div",{staticClass:"w-2/4 py-6 pl-16"},[r("h3",{staticClass:"mb-4"},[e._v("Ausgewählte Schichten")]),r("draggable",{staticClass:"space-y-4",attrs:{group:"layer",move:e.onMove},on:{start:function(t){e.drag=!1},end:function(t){e.drag=!0},sort:e.onArchitectureChange},model:{value:e.selectedLayerList,callback:function(t){e.selectedLayerList=t},expression:"selectedLayerList"}},e._l(e.selectedLayerList,(function(t){return r("div",{key:t.id,staticClass:"flex"},[r("layer-node",{attrs:{"selected-layer-id":e.selectedLayer.id,layer:t},on:{"on-layer-select":e.onLayerSelect,"on-duplicate-layer":e.onDuplicateLayer,"on-delete-layer":e.onDeleteLayer}})],1)})),0)],1),r("div",{staticClass:"w-1/4 mb-6 pt-16"},[r("layer-configuration",{attrs:{"invalid-state":e.invalidState,layer:e.selectedLayer},on:{"set-invalid-state":e.onInvalidStateToggle,"on-save":e.onSave}})],1)])])])},i=[],s=(r("7db0"),r("c975"),r("d81d"),r("13d5"),r("a434"),r("b0c0"),r("b64b"),r("c7cd"),r("b85c")),o=r("b76a"),l=r.n(o),c=r("2ef0"),u=r.n(c),d={name:"App",components:{draggable:l.a},data:function(){return{selectedLayer:{},errorMessage:"",invalidState:!1,idCursor:2,providedLayerList:[],selectedLayerList:[]}},created:function(){var e=this;this.providedLayerList=JSON.parse(document.getElementsByName("django_provided_layer_list")[0].value);var t=JSON.parse(document.getElementsByName("architecture_json")[0].value),r=t.length;t.push({type:"Dense",name:"Output Layer (automatisch generiert)",activation:"softmax",units:document.getElementsByName("output_dimension")[0].value}),this.selectedLayerList=t.map((function(t,n){var a={id:n,first:0===n,last:n===r-1,fixed:0===n||n===r-1,note:"",name:t.name,layer_information:e.getLayerInformationByType(t.type),layer:{type:t.type,properties:[]}};return Object.keys(t).reduce((function(e,r){return e.layer.properties.push({name:r,value:t[r]}),e}),a)})),this.selectedLayer=this.selectedLayerList.find((function(e){return 1===e.id}))},methods:{onMove:function(e){var t=e.draggedContext,r=e.relatedContext;return("undefined"==typeof t.element.fixed||!0!==t.element.fixed)&&(r.element.first?1:r.element.last?-1:void 0)},onClone:function(e){this.idCursor+=1;var t,r=this.idCursor,n=[],a=Object(s["a"])(e.properties);try{for(a.s();!(t=a.n()).done;){var i=t.value,o={name:i.name,value:i.value.default_value};n.push(o)}}catch(d){a.e(d)}finally{a.f()}var l={type:e.type,properties:n},c=this.getLayerInformationByType(e.type),u={id:r,name:e.default_name,layer_information:c,note:"",layer:l};return this.invalidState||this.setSelectedLayer(u),u},onArchitectureChange:function(){var e=this.isArchitectureValid();e?(this.invalidState=!1,this.setErrorMessage("")):this.invalidState=!0},onInvalidStateToggle:function(e){this.invalidState=e},onLayerSelect:function(e){!0!==this.invalidState&&(console.log(e),this.invalidState=!1,this.setSelectedLayer(e))},onSave:function(){var e=[];this.selectedLayerList.pop();var t,r=Object(s["a"])(this.selectedLayerList);try{for(r.s();!(t=r.n()).done;){var n,a=t.value,i={type:a.layer.type,name:a.name},o=Object(s["a"])(a.layer.properties);try{for(o.s();!(n=o.n()).done;){var l=n.value;i[l.name]=l.value}}catch(c){o.e(c)}finally{o.f()}e.push(i)}}catch(c){r.e(c)}finally{r.f()}console.log(e,this.selectedLayerList),document.getElementsByName("architecture_json")[0].value=JSON.stringify(e,null,2),document.querySelector("#architecture_form").submit()},onDeleteLayer:function(e){if(!e.fixed){this.selectedLayer=this.selectedLayerList[0];var t=this.selectedLayerList.indexOf(this.selectedLayerList.find((function(t){return t.id===e.id})));this.$delete(this.selectedLayerList,t),this.invalidState=!1,this.onArchitectureChange()}},onDuplicateLayer:function(e){if(!e.fixed){var t=u.a.clone(e);this.idCursor+=1;var r=this.idCursor;t.id=r;var n=this.selectedLayerList.indexOf(e);this.selectedLayerList.splice(n,0,t),this.onArchitectureChange()}},setSelectedLayer:function(e){this.selectedLayer=e},setErrorMessage:function(e){this.errorMessage=e},getLayerInformationByType:function(e){return this.providedLayerList.find((function(t){return t.type===e}))},getNextLayer:function(e){var t=this.selectedLayerList.indexOf(e);return t>=0&&t<this.selectedLayerList.length-1&&this.selectedLayerList[t+1]},isLastLayer:function(e){var t=this.selectedLayerList.indexOf(e);return t===this.selectedLayerList.length-1},isArchitectureValid:function(){var e=this.selectedLayerList[0],t=this.getNextLayer(e);return this.validateAdjacentLayerDimension(e,null,t)},validateAdjacentLayerDimension:function(e,t,r){if(this.isLastLayer(e))return!0;var n=this.getLayerInformationByType(e.layer.type),a=this.getLayerInformationByType(r.layer.type),i=this.getNextLayer(r);return"undefined"===typeof a.input_dimension&&"undefined"!==typeof n.output_dimension?this.validateAdjacentLayerDimension(r,n.output_dimension,i):"undefined"===typeof a.input_dimension&&"undefined"===typeof n.output_dimension?this.validateAdjacentLayerDimension(r,t,i):"undefined"===typeof n.output_dimension?t!==a.input_dimension?(this.setErrorMessage("Dimension von "+r.name+" und der vorherigen Schicht stimmen nicht überein."),!1):this.validateAdjacentLayerDimension(r,t,i):n.output_dimension===a.input_dimension?this.validateAdjacentLayerDimension(r,n.output_dimension,i):(this.setErrorMessage("Dimension von "+r.name+" und der vorherigen Schicht stimmen nicht überein."),!1)}}},y=d,p=r("2877"),f=Object(p["a"])(y,a,i,!1,null,null,null),v=f.exports,m=(r("b972"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return"undefined"!==typeof e.layer?r("div",{staticClass:"flex text-center w-5/6 card border-light-gray cursor-move hover:border-icon-gray border-2 p-4",class:e.selectedLayerId===e.layer.id?"border-icon-gray":"border-light-gray"},[r("span",{on:{click:function(t){return e.$emit("on-layer-select",e.layer)}}},[r("svg",{staticClass:"fill-current text-icon-gray",attrs:{width:"27",height:"27",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[r("path",{attrs:{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"}})])]),r("div",{staticClass:"text-left select-none w-full ml-3"},[r("div",{on:{click:function(t){return e.$emit("on-layer-select",e.layer)}}},[r("h4",{staticClass:"mb-4"},[e._v(e._s(e.layer.name))]),r("div",{staticClass:"mb-1 mt-0 block"},[e._v("Typ: "+e._s(e.layer.layer_information.type))]),e._l(e.layer.layer_information.properties,(function(t){return r("div",{key:t.name,staticClass:"mb-1 mt-0 block"},[e._v(" "+e._s(t.description)+": "+e._s(Array.isArray(e.getProperty(t.name).value)?e.getProperty(t.name).value.join("x"):e.getProperty(t.name).value)+" ")])}))],2),r("div",{staticClass:"inline-flex space-x-2 text-text-gray mt-4"},[r("a",{staticClass:"flex-1 cursor-pointer text-red",on:{click:function(t){return e.$emit("on-delete-layer",e.layer)}}},[e._v("Löschen")]),r("svg",{staticClass:"inline self-center text-text-gray fill-current",attrs:{width:"5",height:"5",viewBox:"0 0 120 120",version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[r("circle",{attrs:{cx:"60",cy:"60",r:"50"}})]),r("div",{staticClass:"flex-1 cursor-pointer",on:{click:function(t){return e.$emit("on-duplicate-layer",e.layer)}}},[e._v("Duplizieren")])])])]):e._e()}),h=[],g=(r("a9e3"),{name:"LayerNode",props:{layer:Object,selectedLayerId:Number},methods:{getProperty:function(e){return this.layer.layer.properties.find((function(t){return t.name===e}))}}}),L=g,b=Object(p["a"])(L,m,h,!1,null,null,null),x=b.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"\n  flex\n  items-center\n  text-center\n  card\n  w-5/6\n  hover:border-icon-gray\n  border-2\n  border-light-gray\n  pl-2\n  cursor-move\n  "},[r("span",[r("svg",{staticClass:"fill-current text-icon-gray",attrs:{width:"27",height:"27",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[r("path",{attrs:{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"}})])]),r("h4",{staticClass:"select-none ml-3"},[e._v(" "+e._s(e.title)+" ")])])},C=[],w={name:"LayerPreview",props:["title"]},S=w,j=Object(p["a"])(S,_,C,!1,null,"f631c986",null),O=j.exports,P=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card border-2 border-light-gray"},[r("h4",{staticClass:"mb-4"},[e._v("Schicht-Konfiguration")]),r("p",{staticClass:"text-text-gray font-light mb-2"},[e._v("Titel")]),r("input",{staticClass:"w-2/3",attrs:{type:"text",name:e.layer.name},domProps:{value:e.layer.name},on:{change:e.onChangeName}}),r("p",{staticClass:"text-text-gray font-light mb-2"},[e._v("Typ")]),r("input",{staticClass:"bg-light-gray w-2/3",attrs:{type:"text",disabled:""},domProps:{value:e.layer.layer_information.type}}),r("hr",{staticClass:"my-8 text-icon-gray"}),e._l(e.layer.layer_information.properties.filter((function(e){return!0===e.activated})),(function(t){return r("div",{key:t.name},[r("p",{staticClass:"text-text-gray font-light mb-2"},[e._v(e._s(t.description)),r("br")]),"scalar"===t.value.type?r("div",["undefined"!==typeof t.value.step?r("input",{staticClass:"w-2/3",attrs:{type:"number",name:t.name,min:t.value.min,max:t.value.max,step:t.value.step},domProps:{value:e.getPropertyValue(t.name)},on:{change:function(r){return e.onChangeProperty(t.name,r)}}}):r("input",{staticClass:"w-2/3",attrs:{type:"number",name:t.name,min:t.value.min,max:t.value.max},domProps:{value:e.getPropertyValue(t.name)},on:{change:function(r){return e.onChangeProperty(t.name,r)}}})]):e._e(),"list"===t.value.type?r("div",[r("select",{staticClass:"w-2/3",attrs:{name:t.name},on:{change:function(r){return e.onChangeProperty(t.name,r)}}},e._l(t.value.possible_values,(function(t){return r("option",{key:t},[e._v(" "+e._s(t)+" ")])})),0),r("br")]):e._e(),"vector"===t.value.type?r("div",[r("input",{staticClass:"w-2/3",attrs:{type:"text",min:t.value.min,max:t.value.max,name:t.name},domProps:{value:e.getPropertyValueVector(t.name)},on:{change:function(r){return e.onChangePropertyVector(t.name,r)}}})]):e._e(),r("br")])})),r("button",{staticClass:"button-standard disabled:opacity-0",attrs:{disabled:!0===e.invalidState},on:{click:function(t){return e.$emit("on-save")}}},[e._v("Speichern")])],2)},E=[],M=(r("a15b"),r("ac1f"),r("1276"),{name:"LayerConfiguration",props:{layer:Object,invalidState:Boolean},data:function(){return{borderClass:"border-2",borderRedClass:"border-red-500",currentSelectedElement:{}}},watch:{invalidState:function(e,t){!0===t&&!1===e&&this.removeColorBorderError(this.currentSelectedElement),!1===t&&!0===e&&this.addColorBorderError(this.currentSelectedElement)}},methods:{isInRange:function(e,t,r){return e>t&&e<r},addColorBorderError:function(e){e.classList.add(this.borderClass),e.classList.add(this.borderRedClass)},removeColorBorderError:function(e){e.classList.contains(this.borderClass)&&e.classList.contains(this.borderRedClass)&&(e.classList.remove(this.borderClass),e.classList.remove(this.borderRedClass))},validateInput:function(e,t,r,n){var a=!0;return this.isInRange(n,t,r)||(a=!1),this.$emit("set-invalid-state",!a),a},getPropertyValue:function(e){return this.layer.layer.properties.find((function(t){return t.name===e})).value},getPropertyValueVector:function(e){return this.layer.layer.properties.find((function(t){return t.name===e})).value.join("x")},onChangeProperty:function(e,t){var r=t.target.value,n=t.target.min,a=t.target.max;this.currentSelectedElement=t.target,"undefined"!==typeof n&&"undefined"!==typeof a&&this.validateInput(t.target,n,a,r),this.layer.layer.properties.find((function(t){return t.name===e})).value=t.target.value},onChangePropertyVector:function(e,t){var r="x",n=t.target.value.split(r).map((function(e){return parseInt(e)})),a=t.target.min,i=t.target.max;this.currentSelectedElement=t.target;var o,l=!0,c=Object(s["a"])(n);try{for(c.s();!(o=c.n()).done;){var u=o.value;this.isInRange(u,a,i)||(l=!1)}}catch(d){c.e(d)}finally{c.f()}this.$emit("set-invalid-state",!l),this.layer.layer.properties.find((function(t){return t.name===e})).value=n},onChangeName:function(e){this.layer.name=e.target.value}}}),k=M,B=Object(p["a"])(k,P,E,!1,null,null,null),A=B.exports;n["a"].component("layer-node",x),n["a"].component("layer-preview",O),n["a"].component("layer-configuration",A),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(v)}}).$mount("#app")}});
//# sourceMappingURL=editor.app.js.map