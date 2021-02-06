(this["webpackJsonpweather-app-react"]=this["webpackJsonpweather-app-react"]||[]).push([[1],{108:function(e,t,c){},116:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c(0),r=c.n(a),s=c(11),i=c.n(s),j=c(50),l=function(e){e&&e instanceof Function&&c.e(10).then(c.bind(null,232)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),a(e),r(e),s(e)}))};i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(j.c,{})}),document.getElementById("root")),l()},132:function(e,t){e.exports=mapboxgl},50:function(e,t,c){"use strict";c.d(t,"a",(function(){return M})),c.d(t,"b",(function(){return G}));var n=c(2),a=c(8),r=c(25),s=c(0),i=(c(108),c(109),c(35)),j=c(12),l=c(152),o=c(153),b=c(161),u=c(22),d=c(48),O=c(63),h=c.n(O),x=c(86),p=c.n(x),m=c(87);var f=function(){return Object(n.jsx)(l.a,{position:"static",style:{width:"100vw"},children:Object(n.jsxs)(o.a,{children:[Object(n.jsxs)("div",{style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(n.jsx)(m.a,{}),Object(n.jsx)(b.a,{mdUp:!0,children:Object(n.jsx)(i.b,{style:{textDecoration:"none"},to:"/",children:Object(n.jsx)(u.a,{size:"small",variant:"contained",children:"New Search"})})}),Object(n.jsx)(b.a,{smDown:!0,children:Object(n.jsx)(i.b,{style:{textDecoration:"none"},to:"/",children:Object(n.jsx)(u.a,{endIcon:Object(n.jsx)(p.a,{}),variant:"contained",children:"New Search"})})})]}),Object(n.jsx)(b.a,{xsDown:!0,children:Object(n.jsxs)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",display:"flex",alignItems:"center"},children:[Object(n.jsx)(d.a,{variant:"h5",component:"h2",children:"Weather Forecast"}),Object(n.jsx)(h.a,{style:{marginLeft:8}})]})})]})})},y=c(97),g=c(162),k=c(156),v=c(157),C=c(158),w=c(119),S=c(96),B=c.n(S),N=c(95),I=c.n(N),P=c(72),D=c(17),F=c(154),A=c(159),J=c(155);var T=function(e){var t=e.tabSelected,c=e.match,a=Object(D.a)(),i=Object(F.a)(a.breakpoints.down("xs")),o=Object(s.useState)(null),b=Object(r.a)(o,2),u=b[0],d=b[1];return Object(n.jsxs)(n.Fragment,{children:[u,Object(n.jsx)(l.a,{position:"static",color:"default",children:Object(n.jsxs)(A.a,{indicatorColor:"primary",variant:i?"fullWidth":"standard",centered:!0,value:t,children:[Object(n.jsx)(J.a,{label:"Today",onClick:function(){d(Object(n.jsx)(j.a,{push:!0,to:"/".concat(c.params.id)}))}}),Object(n.jsx)(J.a,{label:"Hourly",onClick:function(){d(Object(n.jsx)(j.a,{push:!0,to:"/".concat(c.params.id,"/hourly")}))}}),Object(n.jsx)(J.a,{label:"Daily",onClick:function(){d(Object(n.jsx)(j.a,{push:!0,to:"/".concat(c.params.id,"/daily")}))}})]})})]})},z=Object(s.lazy)((function(){return Promise.all([c.e(0),c.e(5),c.e(9)]).then(c.bind(null,239))})),E=Object(s.lazy)((function(){return Promise.all([c.e(0),c.e(4),c.e(8)]).then(c.bind(null,238))}));function W(e,t){var c=Object(y.a)({palette:{primary:{main:"#00acc1"},error:{main:"#e53935"},type:"dark"}}),n=Object(y.a)({palette:{background:{default:"#DCDCDC",paper:"#F5F5F5"},primary:{main:"#00bfa5"},type:"light"}});if(c=Object(g.a)(c),n=Object(g.a)(n),!e)switch(localStorage.getItem("theme")){case"dark":return c;case"light":return n}switch(t){case"dark":return localStorage.setItem("theme","dark"),c;case"light":return localStorage.setItem("theme","light"),n;default:return}}var M=Object(s.createContext)(),G=Object(s.createContext)();t.c=function(){var e=Object(s.useState)(null),t=Object(r.a)(e,2),c=t[0],l=t[1],o=Object(s.useState)({temperature:"c",distance:"m",speed:"kph",pressure:"hpa"}),b=Object(r.a)(o,2),u=b[0],d=b[1];Object(s.useEffect)((function(){l({API_KEY_OPENWEATHERMAP:P.b,API_KEY_MAPBOX:P.a})}),[]);var O=Object(s.useReducer)(W,W(null,"dark")),h=Object(r.a)(O,2),x=h[0],p=h[1],m=Object(s.useState)(null),y=Object(r.a)(m,2),g=y[0],S=y[1];return Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)(k.a,{theme:x,children:[Object(n.jsx)(v.a,{}),Object(n.jsx)(i.a,{children:Object(n.jsx)("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:Object(n.jsxs)(G.Provider,{value:[u,d],children:[Object(n.jsx)(f,{}),Object(n.jsx)(j.b,{path:"/:id",render:function(e){return Object(n.jsx)(T,Object(a.a)(Object(a.a)({},e),{},{tabSelected:g}))}}),Object(n.jsx)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",flexGrow:"1"},children:c&&Object(n.jsx)(s.Suspense,{fallback:Object(n.jsx)(C.a,{}),children:Object(n.jsx)(M.Provider,{value:c,children:Object(n.jsxs)(j.d,{children:[Object(n.jsx)(j.b,{exact:!0,path:"/",component:z}),Object(n.jsx)(j.b,{path:"/:id",render:function(e){return Object(n.jsx)(E,Object(a.a)(Object(a.a)({},e),{},{setTabSelected:S}))}})]})})})}),Object(n.jsx)("div",{style:{width:"100vw",textAlign:"right"},children:Object(n.jsx)(w.a,{style:{margin:"0 10px 10px 0"},onClick:function(){p("dark"===x.palette.type?"light":"dark")},children:"dark"===x.palette.type?Object(n.jsx)(I.a,{}):Object(n.jsx)(B.a,{})})})]})})})]})})}},72:function(e){e.exports=JSON.parse('{"b":"ada9364e8f37b15e33e734b8a0bf7668","a":"pk.eyJ1IjoieGR4ZHhkeGQiLCJhIjoiY2tra3ZtcWl0MWM0OTJ1cGdrYzNrZ3ZkdSJ9.KCBW0E1JKVcGJ_giY5ISoA"}')},87:function(e,t,c){"use strict";(function(e){var n=c(2),a=c(8),r=c(25),s=c(0),i=c(117),j=c(119),l=c(125),o=c(99),b=c(46),u=c(47),d=c(48),O=c(122),h=c(123),x=c(64),p=c(65),m=c(22),f=c(88),y=c(63),g=c.n(y),k=c(50),v=Object(i.a)({menuIcon:{color:"rgba(0, 0, 0, 0.87)"},settingButtons:{textTransform:"none"}});t.a=function(){var t=Object(s.useContext)(k.b),c=Object(r.a)(t,2),i=c[0],y=c[1],C=v(),w=Object(s.useState)(!1),S=Object(r.a)(w,2),B=S[0],N=S[1],I=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent);return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(j.a,{onClick:function(){return N(!0)},children:Object(n.jsx)(f.a,{width:24,className:C.menuIcon})}),Object(n.jsx)(l.a,{disableBackdropTransition:!I,disableDiscovery:I,ModalProps:{onBackdropClick:function(){return N(!1)}},anchor:"left",open:B,onOpen:function(){return N(!0)},onClose:function(){return N(!1)},children:Object(n.jsxs)(o.a,{style:{width:250},children:[Object(n.jsx)(b.a,{children:Object(n.jsx)(u.a,{primary:Object(n.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(n.jsx)(d.a,{variant:"h6",component:"p",children:"Weather Forecast"}),Object(n.jsx)(g.a,{style:{marginLeft:8}})]})})}),Object(n.jsx)(O.a,{}),Object(n.jsxs)(o.a,{subheader:Object(n.jsx)(h.a,{children:"Settings"}),children:[Object(n.jsxs)(b.a,{children:[Object(n.jsx)(u.a,{primary:"Temperature"}),Object(n.jsx)(x.a,{children:Object(n.jsxs)(p.a,{size:"small",variant:"text",children:[Object(n.jsx)(m.a,{className:C.settingButtons,color:"c"===i.temperature&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{temperature:"c"})}))},children:"\xb0C"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"f"===i.temperature&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{temperature:"f"})}))},children:"\xb0F"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"k"===i.temperature&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{temperature:"k"})}))},children:"K"})]})})]}),Object(n.jsxs)(b.a,{children:[Object(n.jsx)(u.a,{primary:"Distance"}),Object(n.jsx)(x.a,{children:Object(n.jsxs)(p.a,{size:"small",variant:"text",children:[Object(n.jsx)(m.a,{className:C.settingButtons,color:"m"===i.distance&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{distance:"m"})}))},children:"m"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"km"===i.distance&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{distance:"km"})}))},children:"km"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"mi"===i.distance&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{distance:"mi"})}))},children:"mi"})]})})]}),Object(n.jsxs)(b.a,{children:[Object(n.jsx)(u.a,{primary:"Speed"}),Object(n.jsx)(x.a,{children:Object(n.jsxs)(p.a,{size:"small",variant:"text",children:[Object(n.jsx)(m.a,{className:C.settingButtons,color:"kph"===i.speed&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{speed:"kph"})}))},children:"kph"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"mph"===i.speed&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{speed:"mph"})}))},children:"mph"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"ms"===i.speed&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{speed:"ms"})}))},children:"m/s"})]})})]}),Object(n.jsxs)(b.a,{children:[Object(n.jsx)(u.a,{primary:"Pressure"}),Object(n.jsx)(x.a,{children:Object(n.jsxs)(p.a,{size:"small",variant:"text",children:[Object(n.jsx)(m.a,{className:C.settingButtons,color:"hpa"===i.pressure&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{pressure:"hpa"})}))},children:"hPa"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"atm"===i.pressure&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{pressure:"atm"})}))},children:"atm"}),Object(n.jsx)(m.a,{className:C.settingButtons,color:"inhg"===i.pressure&&"primary",onClick:function(){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{pressure:"inhg"})}))},children:"inHg"})]})})]})]})]})})]})}}).call(this,c(80))}},[[116,2,3]]]);
//# sourceMappingURL=main.1295e447.chunk.js.map