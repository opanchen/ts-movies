"use strict";(self.webpackChunkts_movies=self.webpackChunkts_movies||[]).push([[178],{4178:function(e,n,s){s.r(n),s.d(n,{default:function(){return f}});var t=s(4165),r=s(5861),i=s(9439),a=s(2791),u=s(1087),c=s(5676),l=s(5493),o="Movies_section__bjPDA",h="Movies_form-wrapper__YIIZB",v=s(184),f=function(){var e=(0,a.useState)([]),n=(0,i.Z)(e,2),s=n[0],f=n[1],d=(0,a.useState)(!1),p=(0,i.Z)(d,2),x=p[0],g=p[1],m=(0,a.useState)(null),y=(0,i.Z)(m,2),j=y[0],w=y[1],Z=(0,u.lr)(),_=(0,i.Z)(Z,2),b=_[0],k=_[1],S=b.get("query");return(0,a.useEffect)((function(){var e;if(S){!function(){(e=e||(0,r.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.prev=1,e.next=4,l.G.getMoviesByQuery(S);case 4:if(n=e.sent,console.log(n),n&&0!==n.results.length){e.next=9;break}return w("Movies with this query weren't found. Please enter valid query and try again!"),e.abrupt("return");case 9:f(n.results),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0),w("Something went wrong. Please try again later!");case 16:return e.prev=16,g(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[1,12,16,19]])})))).apply(this,arguments)}()}}),[S]),(0,v.jsx)("section",{className:o,children:(0,v.jsxs)(c.W2,{children:[(0,v.jsx)("h1",{className:"visually-hidden",children:"Search movies"}),(0,v.jsx)("div",{className:h,children:(0,v.jsx)(c.UI,{onSubmit:function(e){w(null),k({query:e})}})}),x&&(0,v.jsx)("div",{children:"Loading..."}),j&&(0,v.jsx)("div",{children:j}),0!==s.length&&(0,v.jsx)(c.eW,{movies:s})]})})}}}]);
//# sourceMappingURL=178.eeb6127c.chunk.js.map