(function(t){function e(e){for(var s,o,i=e[0],c=e[1],l=e[2],d=0,_=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&_.push(a[o][0]),a[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(_.length)_.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],s=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(s=!1)}s&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var s={},a={app:0},r=[];function o(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=s,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1855:function(t,e,n){"use strict";var s=n("b146"),a=n.n(s);a.a},"1a29":function(t,e,n){"use strict";var s=n("a08a"),a=n.n(s);a.a},"31ee":function(t,e,n){},"4e42":function(t,e,n){"use strict";var s=n("31ee"),a=n.n(s);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"App"}},[n("div",{attrs:{id:"navbar_top"}},[t.$store.state.back_button_flag?n("i",{staticClass:"fa fa-arrow-left 3",attrs:{"aria-hidden":"true"}}):t._e(),n("div",{attrs:{id:"navbar_top_content"}},[t.$store.state.is_logged_in?n("button",{attrs:{id:"menu_button"},on:{click:t.toggleDD}},[n("i",{staticClass:"fa fa-bars 3",attrs:{"aria-hidden":"true"}})]):t._e(),t.dd_flag?n("div",{attrs:{id:"dropdown"}},[n("button",[t._v("Login")]),n("br"),n("button",[t._v("Account")]),n("br"),n("button",[t._v("MyOrders")]),n("br"),n("button",[t._v("Settings")]),n("br")]):t._e()])]),n("router-view"),n("br"),t.$store.state.is_logged_in?n("div",{attrs:{id:"navbar_bottom"}},[n("button",{on:{click:t.gotoGame}},[t._v(" Juego")]),n("button",{on:{click:t.gotoOrders}},[t._v("MyOrders")])]):t._e(),t.$store.state.toast_flag?n("div",{key:t.$store.state.toast_key,attrs:{id:t.getToastClass}},[t._v(t._s(t.$store.state.toast_msg))]):t._e()],1)},r=[],o=n("2f62"),i=n("bc3a"),c=n.n(i);s["a"].use(o["a"],c.a),c.a.defaults.headers.post["Content-Type"]="application/json;charset=utf-8",c.a.defaults.headers.post["Access-Control-Allow-Origin"]="*",c.a.defaults.headers.get["Content-Type"]="application/json;charset=utf-8",c.a.defaults.headers.get["Access-Control-Allow-Origin"]="*";var l=c.a.create({baseURL:"http://13.126.118.19"}),u={is_logged_in:!1,current_item_id:"wait",timer:"wait",password:"",ph_no:"",nickname:"admin",history:[],userbalance:0,my_orders:null,auth_token:"",toast_flag:!1,toast_msg:"Logged in",toast_key:0,back_button_flag:!1,toast_class:"toast_red",last_timestamp:""};function d(){u.toast_flag=!1}function _(t,e){console.log("Toast called"),u.toast_class=!0===e?"toast_green":"toast_red",u.toast_flag=!0,u.toast_key=Date.now(),u.toast_msg=t,setTimeout((function(){return d}),2e3)}var p={getAppData:function(t){return t}},m={tryLogin:function(t){var e=t.commit;return l.post("/api/login",{ph_no:u.ph_no,password:u.password}).then((function(t){e("SET_LOGIN",t.data),_("Hello, "+t.data.nickname,!0),mt.push("/game")})).catch((function(t){console.log(t),t.response?_(t.response.data.msg,!1):_("Connection Error",!1)}))},tryRegister:function(t,e){var n=t.commit;return console.log(n),l.post("/api/register",{ph_no:e.ph_no,password:e.password,nick_name:e.nick_name}).then((function(t){console.log(t),_("Registration Successful, Please Login",!0)})).catch((function(t){console.log(t),t.response?_(t.response.data.msg,!1):_("Connection Error",!1)}))},refreshApp:function(t){var e=t.commit,n={headers:{"JWT-Auth":u.auth_token}};return l.get("/api/appdata",n).then((function(t){console.log(t),e("SET_APP_DATA",t.data)})).catch((function(t){return console.log(t)}))},refreshTimer:function(t){var e=t.commit,n={headers:{"JWT-Auth":u.auth_token}};return l.get("/api/timer",n).then((function(t){e("SET_TIMER",t.data)})).catch((function(t){console.log(t)}))},placeOrder:function(t,e){var n=t.commit,s=e.amt,a=e.sno;console.log(n);var r={item_id:u.current_item_id,amount:s,selected_no:a},o={headers:{"JWT-Auth":u.auth_token}};return l.post("/api/order",r,o).then((function(){console.log("order sucessfully placed"),_("Order Placed",!0)})).catch((function(t){console.log(t),t.response.data?_(t.response.data.msg,!1):_("Connection Error",!1)}))}},f={SET_LOGIN:function(t,e){t.ph_no=e.ph_no,t.nickname=e.nickname,t.auth_token=e.access_token,t.is_logged_in=!0},SET_TIMER:function(t,e){t.timer=e.timer,t.last_timestamp=e.timestamp},SET_APP_DATA:function(t,e){t.userbalance=e.balance,t.my_orders=e.my_orders,t.current_item_id=e.current_item,t.timer=e.timer,t.history=e.history,t.last_timestamp=e.timestamp}},g=new o["a"].Store({state:u,getters:p,actions:m,mutations:f}),v={name:"App",components:{},data:function(){return{dd_flag:!1}},computed:{getToastClass:function(){return g.state.toast_class}},methods:{gotoLogin:function(){this.$router.push("/login")},gotoGame:function(){this.$router.push("/game")},gotoOrders:function(){this.$router.push("/myorders"),g.dispatch("refreshApp")},toggleDD:function(){this.dd_flag=!this.dd_flag}},beforeCreate:function(){this.$router.push("/login")}},h=v,b=(n("c287"),n("2877")),w=Object(b["a"])(h,a,r,!1,null,"1de4628e",null),y=w.exports,k=n("8c4f"),O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.$store.state.is_logged_in?n("div",{attrs:{id:"Game"}},[n("UserPanel"),n("GameStatus"),n("HistoryPanel")],1):n("h2",[t._v(" You need to login to view this page. ")])])},$=[],P=n("5530"),A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.is_logged_in?n("div",[n("div",{staticClass:"UserPanel"},[n("h2",[t._v(t._s(t.$store.state.nickname))]),n("h2",[t._v("₹"+t._s(t.$store.state.userbalance))])])]):t._e()},C=[],T={name:"UserPanel",data:function(){return{username:"admin",balance:1023}}},j=T,E=(n("c1d7"),Object(b["a"])(j,A,C,!1,null,"620fc3f1",null)),N=E.exports,S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.is_logged_in?n("div",[n("div",{attrs:{id:"GameStatus"}},[n("h2",[t._v("🕘 "+t._s(t.local_timer))]),n("h2",[t._v("# "+t._s(t.$store.state.current_item_id))]),n("button",{attrs:{id:"order_button"},on:{click:t.openPanel}},[t._v("ORDER NOW")])]),t.getPanelFlag?n("div",{attrs:{id:"background_blocker"}},[n("div",{attrs:{id:"order_panel"}},[n("button",{attrs:{id:"close_button"},on:{click:t.closePanel}},[t._v("Close")]),n("br"),n("div",{staticClass:"btn_row"},[n("button",{staticClass:"odd",attrs:{value:"1"},on:{click:t.selectNum}},[t._v("1")]),n("button",{staticClass:"odd",attrs:{value:"3"},on:{click:t.selectNum}},[t._v("3")]),n("button",{staticClass:"odd",attrs:{value:"5"},on:{click:t.selectNum}},[t._v("5")])]),n("div",{staticClass:"btn_row"},[n("button",{staticClass:"even",attrs:{value:"0"},on:{click:t.selectNum}},[t._v("0")]),n("button",{staticClass:"even",attrs:{value:"2"},on:{click:t.selectNum}},[t._v("2")]),n("button",{staticClass:"even",attrs:{value:"4"},on:{click:t.selectNum}},[t._v("4")])]),n("div",{staticClass:"btn_row"},[n("button",{staticClass:"amt_btn",attrs:{value:"10"},on:{click:t.selectAmt}},[t._v("10")]),n("button",{staticClass:"amt_btn",attrs:{value:"100"},on:{click:t.selectAmt}},[t._v("100")]),n("button",{staticClass:"amt_btn",attrs:{value:"1000"},on:{click:t.selectAmt}},[t._v("1000")])]),n("h1",[t._v("₹"+t._s(t.amount))]),n("button",{on:{click:t.placeOrder}},[t._v("CONFIRM")])])]):t._e()]):t._e()},x=[],D={name:"GameStatus",data:function(){return{panel_flag:!1,amount:0,no_selected:-1,local_timer:"wait"}},computed:{getPanelFlag:function(){return this.panel_flag}},methods:{openPanel:function(t){t.preventDefault(),document.body.style.overflowY="hidden",this.panel_flag=!0},closePanel:function(t){t.preventDefault(),document.body.style.overflowY="auto",this.panel_flag=!1,this.amount=0,this.no_selected=-1},selectNum:function(t){t.preventDefault();var e=document.getElementsByClassName("even_selected"),n=e.length;while(n--)e[n].className="even";e=document.getElementsByClassName("odd_selected"),n=e.length;while(n--)e[n].className="odd";this.no_selected=parseInt(t.srcElement.value),t.srcElement.className="even"===t.srcElement.className?"even_selected":"odd_selected"},selectAmt:function(t){t.preventDefault(),this.amount+=parseInt(t.srcElement.value)},placeOrder:function(t){t.preventDefault();var e=this.amount,n=this.no_selected;g.dispatch("placeOrder",{amt:e,sno:n}),this.amount=0,this.no_selected=-1,this.closePanel(event)}},mounted:function(){var t=this,e=function(){t.local_timer=g.state.timer-(parseInt(Date.now()/1e3)-parseInt(g.state.last_timestamp)),t.local_timer<=0&&(t.local_timer="wait",g.state.timer="wait")};function n(){!0===g.state.is_logged_in&&"wait"==g.state.timer?g.dispatch("refreshApp"):e(),setTimeout(n,1e3)}n()}},L=D,R=(n("4e42"),Object(b["a"])(L,S,x,!1,null,"01a25034",null)),I=R.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.is_logged_in?n("div",{attrs:{id:"HistoryPanel"}},[t._m(0),t._l(t.$store.state.history,(function(e){return n("div",{key:e.item_id,class:[e.result%2==0?"hrow1":"hrow2"]},[n("span",[t._v(t._s(e.created_time))]),n("span",[t._v(t._s(e.item_id))]),n("span",[t._v(t._s(e.result))])])}))],2):t._e()},M=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{},attrs:{id:"row_header"}},[n("span",[t._v("period")]),n("span",[t._v("id")]),n("span",[t._v("result")])])}],U={name:"HistoryPanel"},J=U,H=(n("1855"),Object(b["a"])(J,G,M,!1,null,"625b36be",null)),W=H.exports,F={name:"Game",components:{UserPanel:N,GameStatus:I,HistoryPanel:W},data:function(){return{}},methods:Object(P["a"])(Object(P["a"])({},Object(o["b"])(["tryLogin","refreshApp"])),{},{onSubmit:function(t){t.preventDefault(),g.dispatch("tryLogin").then((function(){return g.dispatch("refreshApp")}))}})},Y=F,B=(n("9ef2"),Object(b["a"])(Y,O,$,!1,null,"4113321c",null)),q=B.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"LoginPage"}},[n("Title"),n("div",[t.$store.state.is_logged_in||t.is_registering?t._e():n("div",{attrs:{id:"loginPanel"}},[n("form",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.ph_no,expression:"$store.state.ph_no"}],attrs:{type:"text",placeholder:"mobile no"},domProps:{value:t.$store.state.ph_no},on:{input:function(e){e.target.composing||t.$set(t.$store.state,"ph_no",e.target.value)}}}),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.password,expression:"$store.state.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.$store.state.password},on:{input:function(e){e.target.composing||t.$set(t.$store.state,"password",e.target.value)}}}),n("br"),n("input",{attrs:{type:"submit",value:"Login"},on:{click:t.onSubmit}})])]),t.$store.state.is_logged_in?n("h2",[t._v(" Logged in as "+t._s(t.$store.state.nickname)+" ")]):t._e()]),t.is_registering?n("div",{attrs:{id:"registrationPanel"}},[n("form",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.r_ph_no,expression:"r_ph_no"}],attrs:{type:"text",placeholder:"mobile number"},domProps:{value:t.r_ph_no},on:{input:function(e){e.target.composing||(t.r_ph_no=e.target.value)}}}),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.r_password,expression:"r_password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.r_password},on:{input:function(e){e.target.composing||(t.r_password=e.target.value)}}}),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.r_c_password,expression:"r_c_password"}],attrs:{type:"password",placeholder:"confirm password"},domProps:{value:t.r_c_password},on:{input:function(e){e.target.composing||(t.r_c_password=e.target.value)}}}),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.r_nickname,expression:"r_nickname"}],attrs:{type:"text",placeholder:"name"},domProps:{value:t.r_nickname},on:{input:function(e){e.target.composing||(t.r_nickname=e.target.value)}}}),n("br"),n("input",{attrs:{type:"submit",value:"Register"},on:{click:t.onRegister}})])]):t._e(),t.$store.state.is_logged_in?t._e():n("button",{on:{click:t.toggleRegistration}},[t._v(t._s(t.button_msg))])],1)},K=[],Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"Title"}},[t.$store.state.is_logged_in?t._e():n("div",[n("h1",{attrs:{align:"center"}},[t._v("Juego.io")])])])},V=[],X={name:"Title"},Z=X,tt=(n("b2c5"),Object(b["a"])(Z,Q,V,!1,null,"b3bae1b6",null)),et=tt.exports,nt={name:"LoginPanel",components:{Title:et},data:function(){return{is_registering:!1,r_ph_no:null,r_password:null,r_c_password:null,r_nickname:null}},computed:{button_msg:function(){return!0===this.is_registering?"close":"New User? Register Here"}},methods:Object(P["a"])(Object(P["a"])({},Object(o["b"])(["tryLogin","refreshApp"])),{},{onSubmit:function(t){t.preventDefault(),g.dispatch("tryLogin").then((function(){return g.dispatch("refreshApp")}))},toggleRegistration:function(){this.is_registering=!this.is_registering},onRegister:function(t){var e=this;t.preventDefault(),this.r_password&&this.r_c_password==this.r_password?g.dispatch("tryRegister",{ph_no:this.r_ph_no,password:this.r_password,nick_name:this.r_nickname}).then((function(){e.is_registering=!1})).catch((function(){e.is_registering=!0})):_("Password Mismatch",!1)}})},st=nt,at=(n("1a29"),Object(b["a"])(st,z,K,!1,null,"b71514e2",null)),rt=at.exports,ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"UserOrders"}},[t.$store.state.is_logged_in?n("div",t._l(t.$store.state.my_orders,(function(e){return n("div",{key:e.order_id,staticClass:"order"},[n("span",{attrs:{align:"left"}},[t._v("Amount : "+t._s(e.amount))]),n("span",{attrs:{align:"right"}},[t._v("Item ID : "+t._s(e.item_id))]),n("span",{attrs:{align:"left"}},[t._v("Result : "+t._s(e.result))]),n("span",{attrs:{align:"right"}},[t._v("utc : "+t._s(e.created_time))]),n("span",{attrs:{align:"left"}},[t._v("Selected : "+t._s(e.selected_no))]),n("span",{attrs:{align:"right"}},[t._v("Status : "+t._s(e.status))])])})),0):n("h2",[t._v("Please login first")])])},it=[],ct={name:"UserOrders",components:{},methods:Object(P["a"])({},Object(o["b"])(["refreshApp"])),created:function(){}},lt=ct,ut=(n("77f9"),Object(b["a"])(lt,ot,it,!1,null,"1b26db24",null)),dt=ut.exports;s["a"].use(k["a"]);var _t=[{path:"/game",component:q},{path:"/login",component:rt},{path:"/myorders",component:dt}],pt=new k["a"]({routes:_t});s["a"].config.productionTip=!1,new s["a"]({store:g,router:pt,render:function(t){return t(y)}}).$mount("#app");var mt=e["default"]=pt},"5c59":function(t,e,n){},"77f9":function(t,e,n){"use strict";var s=n("a58f"),a=n.n(s);a.a},"7d6b":function(t,e,n){},"9ef2":function(t,e,n){"use strict";var s=n("7d6b"),a=n.n(s);a.a},a08a:function(t,e,n){},a58f:function(t,e,n){},b146:function(t,e,n){},b2c5:function(t,e,n){"use strict";var s=n("dcfa"),a=n.n(s);a.a},c1d7:function(t,e,n){"use strict";var s=n("5c59"),a=n.n(s);a.a},c287:function(t,e,n){"use strict";var s=n("e9ae"),a=n.n(s);a.a},dcfa:function(t,e,n){},e9ae:function(t,e,n){}});
//# sourceMappingURL=app.91387494.js.map