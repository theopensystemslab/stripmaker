(this.webpackJsonpstripmaker=this.webpackJsonpstripmaker||[]).push([[0],{33:function(e,t,a){e.exports=a(42)},37:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(19),i=a.n(r),l=a(8),s=a(32),c=a(9),p=(a(37),a(0)),m=a(27),u=new p.TextureLoader,d=function(e){e.wrapS=e.wrapT=p.RepeatWrapping,e.offset.set(0,0),e.repeat.set(2,2)},h=new p.MeshStandardMaterial({color:15658734,map:u.load("46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DIFFUSE.jpg",d),displacementMap:u.load("46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DISPL.jpg",d),normalMap:u.load("46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_NORM.jpg",d),aoMap:u.load("46_plywood texture-seamless_hr/46_plywood texture-seamless_hr-AO.jpg",d),aoMapIntensity:3,envMapIntensity:1.5,displacementScale:0,roughness:.8,metalness:0,side:p.DoubleSide,polygonOffset:!0,polygonOffsetFactor:1}),y=["A2","B2","C2","D1","E1","A1","B1","C1"],f=["04","03","02","01","05","06","07"],g=new p.MeshLambertMaterial({color:"white"}),_=function(e){var t=e.pos,a=e.type,r=e.variation,i=Object(n.useState)(),s=Object(l.a)(i,2),c=s[0],p=s[1],u=t.split(",").map(Number),d=Object(l.a)(u,2),_=d[0],w=d[1],v="models/Toolbox_Stripmaker_WHAlm_v1.5_kaal-SU18.obj";if(Object(n.useMemo)((function(){console.log("loading model"),(new m.a).load(v,p)}),[v]),c){var b=c.children.filter((function(e){return e.name.includes("Module_".concat(a,"_").concat(r))&&"Mesh"===e.type}));return console.log(b.map((function(e){return e.material}))),o.a.createElement("group",{position:[1.2*_,0,1.2*w],onClick:function(e){e.stopPropagation(),console.log(e.object)}},o.a.createElement("group",{position:[-10*y.findIndex((function(e){return e===a}))-3,0,10.8*f.findIndex((function(e){return e===r}))+.6]},b.map((function(e){return o.a.createElement("mesh",{key:e.name,geometry:e.geometry,material:"Wood_3_Ver"===e.material.name?h:g,receiveShadow:!0,castShadow:!0})}))))}return null},w=function(){return o.a.createElement(o.a.Fragment,null,Object.entries({"0,-4":{type:"D1",variation:"03"},"0,-3":{type:"C2",variation:"03"},"0,-2":{type:"C2",variation:"03"},"0,-1":{type:"C2",variation:"01"},"0,0":{type:"C2",variation:"01"},"0,1":{type:"C2",variation:"02"},"0,2":{type:"D1",variation:"02"}}).map((function(e){var t=Object(l.a)(e,2),a=t[0],n=t[1];return o.a.createElement(_,Object.assign({key:a,pos:a},n))})))};var v=function(){return o.a.createElement(c.a,{camera:{fov:45,position:[-2,10,10]},shadowMap:{enabled:!0}},o.a.createElement("ambientLight",{intensity:.75}),o.a.createElement("pointLight",{position:[10,15,10],intensity:.2}),o.a.createElement(w,null),o.a.createElement(s.a,{target:[0,2,0]}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.22eec31d.chunk.js.map