(this.webpackJsonpstripmaker=this.webpackJsonpstripmaker||[]).push([[0],{39:function(e,a,t){e.exports=t(52)},43:function(e,a,t){},52:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),r=t(17),l=t.n(r),i=t(7),s=(t(43),t(36)),c=t(9),p=t(0),m=t(63),d=t(29),u=[{value:8,label:"Roof"},{value:4,label:"First Floor"},{value:1,label:"Ground Floor"}],g=[new p.Plane(new p.Vector3(0,-1,0),8)],h=function(){var e=Object(n.useState)(8),a=Object(i.a)(e,2),t=a[0],r=a[1];return o.a.createElement("div",{id:"clipping-slider"},o.a.createElement(m.a,{orientation:"vertical",value:t,"aria-labelledby":"vertical-slider",marks:u,max:8,min:1,step:1,onChange:function(e,a){if(a!==t){var n=300*Math.abs(t-a);Object(d.a)({duration:n,constant:a,targets:g[0],easing:"easeOutElastic(1,0.9)"}),r(a)}}}))},w=t(31),_=new p.MeshLambertMaterial({color:"white",clippingPlanes:g,clipIntersection:!0,clipShadows:!0}),f=new p.TextureLoader,y=function(e){e.wrapS=e.wrapT=p.RepeatWrapping,e.repeat.set(.025,.025)},v=new p.MeshStandardMaterial({color:15658734,map:f.load("materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DIFFUSE.jpg",y),displacementMap:f.load("materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DISPL.jpg",y),normalMap:f.load("materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_NORM.jpg",y),aoMap:f.load("materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr-AO.jpg",y),aoMapIntensity:3,envMapIntensity:1.5,displacementScale:0,roughness:.8,metalness:0,polygonOffset:!0,polygonOffsetFactor:1,clippingPlanes:g,clipIntersection:!0,side:p.FrontSide}),b=new p.TextureLoader,E=function(e){e.wrapS=e.wrapT=p.RepeatWrapping,e.repeat.set(.025,.025),e.rotation=Math.PI/2},M=new p.MeshStandardMaterial({color:15658734,map:b.load("materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_DIFF.jpg",E),displacementMap:b.load("materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_DISPL.jpg",E),normalMap:b.load("materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_NORM.jpg",E),aoMap:b.load("materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated-AO.jpg",E),displacementScale:0,roughness:.8,metalness:.4,polygonOffset:!0,polygonOffsetFactor:1,clippingPlanes:g,clipIntersection:!0,side:p.FrontSide,clipShadows:!0}),S=["A2","B2","C2","D1","E1","A1","B1","C1"],x=["04","03","02","01","05","06","07"],j=function(e){var a=e.pos,t=e.type,r=e.variation,l=Object(n.useState)(),s=Object(i.a)(l,2),c=s[0],p=s[1],m=a.split(",").map(Number),d=Object(i.a)(m,2),u=d[0],g=d[1],h="models/Toolbox_Stripmaker_WHAlm_v1.5_kaal-SU18.obj";if(Object(n.useMemo)((function(){console.log("loading model"),(new w.a).load(h,p)}),[h]),c){var f=c.children.filter((function(e){return e.name.includes("Module_".concat(t,"_").concat(r))&&"Mesh"===e.type}));return o.a.createElement("group",{position:[1.2*u,0,1.2*g],onClick:function(e){e.stopPropagation(),console.log(e.object)}},o.a.createElement("group",{position:[-10*S.findIndex((function(e){return e===t}))-3,0,10.8*x.findIndex((function(e){return e===r}))+.6]},f.map((function(e,a){var n=e.material.name.includes("Wood"),r=!n&&("C2"!==t?a<2:a>2);return o.a.createElement(o.a.Fragment,{key:e.name},o.a.createElement("mesh",{geometry:e.geometry,material:n?v:r?M:_,receiveShadow:!n,castShadow:!n}))}))))}return null},O=function(){Object(c.e)().gl.localClippingEnabled=!0;return o.a.createElement(o.a.Fragment,null,Object.entries({"0,-5":{type:"E1",variation:"01"},"0,-4":{type:"E1",variation:"01"},"0,-3":{type:"C2",variation:"02"},"0,-2":{type:"C2",variation:"03"},"0,-1":{type:"C2",variation:"03"},"0,0":{type:"A1",variation:"01"}}).map((function(e){var a=Object(i.a)(e,2),t=a[0],n=a[1];return o.a.createElement(j,Object.assign({key:t,pos:t},n))})))};var F=function(){return o.a.createElement("div",{id:"three"},o.a.createElement(h,null),o.a.createElement(c.a,{camera:{fov:45,position:[8,12,14]},shadowMap:{enabled:!0,type:p.PCFSoftShadowMap},gl:{antialias:!0},pixelRatio:window.devicePixelRatio},o.a.createElement("ambientLight",{intensity:.85}),o.a.createElement("directionalLight",{position:[40,55,35],castShadow:!0,intensity:.1}),o.a.createElement(O,null),o.a.createElement("mesh",{name:"ground",rotation:[-Math.PI/2,0,0],receiveShadow:!0},o.a.createElement("planeBufferGeometry",{attach:"geometry",args:[50,50,1,1]}),o.a.createElement("shadowMaterial",{attach:"material",color:0,opacity:.2,side:p.DoubleSide})),o.a.createElement(s.a,{target:[0,3,0],rotateSpeed:.7,maxPolarAngle:1.49,enabled:!0,minDistance:5,maxDistance:30})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.13606838.chunk.js.map