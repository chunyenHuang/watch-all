(this["webpackJsonpwatch-all"]=this["webpackJsonpwatch-all"]||[]).push([[0],{60:function(e,t,a){e.exports=a(98)},65:function(e,t,a){},67:function(e,t,a){},75:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n,c=a(1),l=a.n(c),u=a(19),o=a.n(u),r=(a(65),a(15)),s=a(116),i=a(104),m=a(105),h=a(100),w=a(101),v=a(106),d=a(54),p=a(107),b=a(108),E=a(109),f=a(110),y=a(111),g=a(112),O=a(113),k=a(117),C=a(118),j=a(119),S=a(114),x=a(115),M=a(13),I=(a(66),a(67),a(22)),N=a(23),U=a(57),B=a(52),F=a(58),H=a(53),T=a.n(H),Y=a(99),A=a(102),J=a(103),D=(a(75),function(e){function t(){var e,a;Object(I.a)(this,t);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(a=Object(U.a)(this,(e=Object(B.a)(t)).call.apply(e,[this].concat(c)))).state={selectedChannelId:null,channels:[]},a}return Object(F.a)(t,e),Object(N.a)(t,[{key:"componentDidMount",value:function(){}},{key:"setChannelsSound",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this.props.channels;n=e.id,t.forEach((function(e){e.id===n?e.unMute():e.mute()})),this.setState({selectedChannelId:n})}},{key:"updateParentChannels",value:function(){this.props.onChannelsUpdate&&this.props.onChannelsUpdate(this.props.channels.map((function(e){return e.url})))}},{key:"render",value:function(){var e,t,a=this,c=this.props,u=c.mode,o=c.isEditing,r=c.channels,s=c.mute;switch(u){case"3x3":t=3,e="multi3x3";break;case"2x2":default:t=2,e="multi2x2"}return l.a.createElement(A.a,{className:"channels-main"},l.a.createElement(J.a,{className:e,stylee:{}},r.map((function(e,c){return l.a.createElement(Y.a,{sm:12/t,key:c,onMouseEnter:function(){e.isHovered=!0,n?setTimeout((function(){e.isHovered&&a.setChannelsSound(e)}),1e3):a.setChannelsSound(e)},onMouseLeave:function(){e.isHovered=!1}},o&&l.a.createElement("div",{className:"edit-container"},l.a.createElement(h.a,null,l.a.createElement(w.a,{placeholder:"YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion",value:e.url,onChange:function(t){e.update(t.target.value),a.setState({}),a.updateParentChannels()}}))),l.a.createElement("div",{className:"video-wrapper"},l.a.createElement(T.a,{className:"react-player",url:e.url,volume:1,muted:s||e.isMuted,playing:!0,width:"100%",height:"100%",controls:!0,loop:!0})))}))))}}]),t}(l.a.Component)),Q=function(){function e(t,a){Object(I.a)(this,e),this.id=a,this.url=t,this.isMuted=!0,this.isHovered=!1}return Object(N.a)(e,[{key:"update",value:function(e){this.url=e}},{key:"mute",value:function(){this.isMuted=!0}},{key:"unMute",value:function(){this.isMuted=!1}}]),e}(),q=localStorage.getItem("mode")||"3x3",P=localStorage.getItem("list"),R=P?JSON.parse(P):[{title:"\u65b0\u805e News",channels:["https://www.youtube.com/watch?v=R2iMq5LKXco","https://www.youtube.com/watch?v=EB4g7wecgTI","https://www.youtube.com/watch?v=_QbRXRnHMVY","https://www.youtube.com/watch?v=9Auq9mYxFEE","https://www.youtube.com/watch?v=2mCSYvcfhtc","https://www.youtube.com/watch?v=TCnaIE_SAtM","https://www.youtube.com/watch?v=ylYJSBUgaMA","https://www.youtube.com/watch?v=as1ZQ0t3Kdg","https://www.youtube.com/watch?v=B7Zp3d6xXWw"]},{title:"\u8c93\u79d1 Felidae",channels:["https://www.youtube.com/watch?v=abuAUjFv88s","https://www.youtube.com/watch?v=DCiUhrxnOjI","https://www.youtube.com/watch?v=W86cTIoMv2U","https://www.youtube.com/watch?v=BZC2nWJblhk","https://www.youtube.com/watch?v=rsRj5Eymjxw","https://www.youtube.com/watch?v=qeUM1WDoOGY","https://www.youtube.com/watch?v=K83BKNxgg7w","https://www.youtube.com/watch?v=Yhj5gjcY77I","https://www.youtube.com/watch?v=vl-PcTA9HHg"]},{title:"\u80cc\u666f\u97f3\u6a02 Background Music",channels:["https://www.youtube.com/watch?v=qycqF1CWcXg","https://www.youtube.com/watch?v=PeQSCzrByo4","https://www.youtube.com/watch?v=GFPrPhyQ6y8","https://www.youtube.com/watch?v=LLmm23EZ5qI","https://www.youtube.com/watch?v=QdRQwlgJC-Y","https://www.youtube.com/watch?v=3EgpMgxRvxA","https://www.youtube.com/watch?v=4UvrnbDDec4","https://www.youtube.com/watch?v=Qc2pBTfZODM","https://www.youtube.com/watch?v=KJfdIOnUHXI"]}],W=localStorage.getItem("listIndex")||0,K=R[W].channels.map((function(e,t){return new Q(e,t)})),L=function(){var e=Object(c.useState)(!1),t=Object(r.a)(e,2),a=t[0],n=t[1],u=Object(c.useState)(!1),o=Object(r.a)(u,2),I=o[0],N=o[1],U=Object(c.useState)(q),B=Object(r.a)(U,2),F=B[0],H=B[1],T=Object(c.useState)(R),Y=Object(r.a)(T,2),A=Y[0],J=Y[1],P=Object(c.useState)(W),L=Object(r.a)(P,2),X=L[0],Z=L[1],G=Object(c.useState)(!1),_=Object(r.a)(G,2),V=_[0],z=_[1],$=Object(c.useState)(R[W].title),ee=Object(r.a)($,2),te=ee[0],ae=ee[1],ne=Object(c.useState)(!1),ce=Object(r.a)(ne,2),le=ce[0],ue=ce[1],oe=function(e){H(e),localStorage.setItem("mode",e)},re=function(e){Z(e),ae(A[e].title),localStorage.setItem("listIndex",e),K=A[e].channels.map((function(e,t){return new Q(e,t)}))},se=function(){z(!V)},ie=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(se(),e){var t={title:te,channels:K.map((function(e){return e.url}))};ae(""),A.push(t)}else A[X].title=te,A[X].channels=K.map((function(e){return e.url}));J(A),localStorage.setItem("list",JSON.stringify(A)),e&&re(A.length-1)};return Object(c.useEffect)((function(){document.addEventListener("keydown",(function(e){77===e.keyCode&&ue(!le)}),!1)})),l.a.createElement("div",{className:"main-container"},l.a.createElement(s.a,{isOpen:V,autoFocus:!0},l.a.createElement(i.a,{toggle:se},"\u5132\u5b58 Save & Update"),l.a.createElement(m.a,null,l.a.createElement(h.a,null,l.a.createElement(w.a,{placeholder:"Title...",autoFocus:!0,value:te,onChange:function(e){return ae(e.target.value)}}))),l.a.createElement(v.a,null,l.a.createElement(d.a,{color:"secondary",onClick:se},"Cancel"),l.a.createElement(d.a,{color:"primary",disabled:te.length<1,onClick:function(){return ie(!0)}},"Save As New"),l.a.createElement(d.a,{color:"primary",disabled:te.length<1,onClick:function(){return ie(!1)}},"Update"))),l.a.createElement(p.a,{color:"black",dark:!0,expand:"md"},l.a.createElement(b.a,{href:"#"},"\u90fd\u770b\u770b"),l.a.createElement(E.a,{onClick:function(){return n(!a)}}),l.a.createElement(f.a,{isOpen:a,navbar:!0},l.a.createElement(y.a,{className:"mr-auto",navbar:!0},l.a.createElement(g.a,null,l.a.createElement(O.a,{href:"#",active:"2x2"===F,onClick:function(){return oe("2x2")}},l.a.createElement(M.g,null),"2x2")),l.a.createElement(g.a,null,l.a.createElement(O.a,{href:"#",active:"3x3"===F,onClick:function(){return oe("3x3")}},l.a.createElement(M.f,null),"3x3")),l.a.createElement(g.a,null,l.a.createElement(O.a,{href:"#",active:I,onClick:function(){I&&se(),N(!I)}},I?l.a.createElement("div",{className:"blink"},l.a.createElement(M.e,null),"\u5132\u5b58 Save"):l.a.createElement(l.a.Fragment,null,l.a.createElement(M.a,null),"\u7de8\u8f2f Edit"))),l.a.createElement(k.a,{nav:!0,inNavbar:!0},l.a.createElement(C.a,{nav:!0,caret:!0},l.a.createElement(M.d,null),A[X].title),l.a.createElement(j.a,{right:!0},A.map((function(e,t){return l.a.createElement(S.a,{key:t,onClick:function(){return re(t)}},e.title)}))))),l.a.createElement(y.a,{navbar:!0},l.a.createElement(g.a,null,l.a.createElement(O.a,{href:"#",active:le,onClick:function(){return ue(!le)}},le?l.a.createElement(M.h,{className:"blink"}):l.a.createElement(M.i,null))),l.a.createElement(x.a,null,l.a.createElement(M.b,null),"\u79fb\u52d5\u6ed1\u9f20\u64ad\u653e\u8072\u97f3 Move your mouse over video to play the sound"),l.a.createElement(g.a,null,l.a.createElement(O.a,{href:"https://github.com/chunyenHuang/watch-all",target:"_blank"},l.a.createElement(M.c,null),"Github"))))),l.a.createElement("div",{className:"channels-container"},l.a.createElement("div",{className:"channels-container-box"},l.a.createElement(D,{mode:F,isEditing:I,channels:K,mute:le}))))};o.a.render(l.a.createElement(L,null),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.e9d9f491.chunk.js.map