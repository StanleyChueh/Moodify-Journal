(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(15)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(3),r=a.n(s),i=(a(12),a(1));a(13),a(14);var o=function(e){let{isOpen:t,onClose:a,message:n,link:s}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};const c=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],m={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},u={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function p(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}var d=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[s,r]=Object(n.useState)(e[0]),[d,g]=Object(n.useState)(t[e[0]].description),[h,w]=Object(n.useState)(""),[v,E]=Object(n.useState)(25),[b,y]=Object(n.useState)(t[e[0]].imageUrl),[N,S]=Object(n.useState)("typing"),[f,k]=Object(n.useState)(!1),[C,M]=Object(n.useState)(!1),[O,j]=Object(n.useState)(null),[R,U]=Object(n.useState)(!1),[D,F]=Object(n.useState)(null),T=Object(n.useRef)(null),A=Object(n.useRef)(null),x=Object(n.useRef)(!1);Object(n.useEffect)(()=>{const e=[{moodRange:[0,16],title:"Angry Music",playlistUrl:"https://www.youtube.com/watch?v=r8OipmKFDeM"},{moodRange:[17,33],title:"Neutral Music",playlistUrl:"https://www.youtube.com/watch?v=CFGLoQIhmow&t=2486s"},{moodRange:[34,50],title:"Fear Music",playlistUrl:"https://www.youtube.com/watch?v=P_tsPLT0irs"},{moodRange:[51,67],title:"Sad Music",playlistUrl:"https://www.youtube.com/watch?v=A_MjCqQoLLA"},{moodRange:[68,84],title:"Surprise Music",playlistUrl:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s"},{moodRange:[85,100],title:"Happy Music",playlistUrl:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}].find(e=>v>=e.moodRange[0]&&v<=e.moodRange[1]);j(e)},[v]);const B=e=>{N!==e&&H(),S(e),"speech"===e?M(!0):"draw"===e&&k(!0)},H=()=>{g(""),w(""),F(null)};return l.a.createElement("div",{className:"app-layout"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===s?"active":""),onClick:()=>(e=>{var n,l,i;a(e=>({...e,[s]:{description:d,mood:v,imageUrl:b}})),r(e),g((null===(n=t[e])||void 0===n?void 0:n.description)||""),E((null===(l=t[e])||void 0===l?void 0:l.mood)||25),y((null===(i=t[e])||void 0===i?void 0:i.imageUrl)||null)})(e)},0===n?"Today":e)))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},s,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(i.a,{className:"input-icon "+("typing"===N?"active":""),title:"Type",onClick:()=>B("typing")}),l.a.createElement(i.b,{className:"input-icon "+("speech"===N?"active":""),title:"Voice to Text",onClick:()=>B("speech")}),l.a.createElement(i.c,{className:"input-icon "+("draw"===N?"active":""),title:"Draw",onClick:()=>B("draw")})),"typing"===N&&l.a.createElement("textarea",{className:"description-input",value:d,onChange:e=>g(e.target.value),placeholder:"Write your description here..."}),"speech"===N&&l.a.createElement("div",{className:"speech-result"},l.a.createElement("h3",null,"Speech-to-Text Result"),l.a.createElement("p",null,h)),"draw"===N&&D&&l.a.createElement("div",{className:"drawing-result"},l.a.createElement("h3",null,"Drawing Result"),l.a.createElement("img",{src:D,alt:"Drawing",className:"drawing-preview"})),l.a.createElement("button",{className:"generate-button",onClick:()=>{const e=function(e){let t=Math.floor(e/100*c.length);t=100===e?c.length-1:Math.min(t,c.length-1);const a=c[t],n=u[a]||1;return`/Moodify-Journal/${m[a]}/image${Math.floor(Math.random()*n)+1}.jpg`}(v);y(e),a(t=>({...t,[s]:{description:d,mood:v,imageUrl:e,drawing:D,speech:h}})),alert("Entry saved successfully!")}},"Enter"),l.a.createElement("div",{className:"image-display"},b?l.a.createElement("img",{src:b,alt:"Mood",className:"generated-image"}):l.a.createElement("div",{className:"placeholder"},"Your image will appear here")),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-labels"},c.map(e=>l.a.createElement("span",{key:e,className:"mood-label"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:v,className:"mood-slider",onChange:e=>E(Number(e.target.value))}),l.a.createElement("div",{className:"mood-value"},"Mood: ",v)),O&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("h3",null,"Suggested Playlist: ",O.title),l.a.createElement("a",{href:O.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${p(O.playlistUrl)}/hqdefault.jpg`,alt:O.title+" playlist",className:"music-thumbnail"}))),l.a.createElement(o,{isOpen:R,onClose:()=>U(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"}),C&&l.a.createElement("div",{className:"popup-overlay"},l.a.createElement("div",{className:"popup-content"},l.a.createElement("h2",null,"Speak now..."),l.a.createElement("button",{onClick:()=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const e=new window.webkitSpeechRecognition;e.lang="en-US",e.interimResults=!0,e.continuous=!0,T.current=e,e.onresult=e=>{const t=e.results[e.results.length-1][0].transcript;w(e=>e+" "+t)},e.onerror=e=>{console.error("Speech recognition error:",e.error)},e.start()}},"Start"),l.a.createElement("button",{onClick:()=>{T.current&&T.current.stop(),M(!1)}},"Done"))),f&&l.a.createElement("div",{className:"popup-overlay"},l.a.createElement("div",{className:"popup-content"},l.a.createElement("canvas",{ref:A,className:"drawing-canvas",width:550,height:300,onMouseDown:e=>{const t=A.current,a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),x.current=!0},onMouseMove:e=>{if(!x.current)return;const t=A.current,a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),a.stroke()},onMouseUp:()=>{x.current=!1}}),l.a.createElement("button",{onClick:()=>{const e=A.current.toDataURL();F(e),k(!1)}},"Done"))),l.a.createElement("div",{className:"mood-count-display"},"Mood: ",v)))};var g=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,16)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:s,getTTFB:r}=t;a(e),n(e),l(e),s(e),r(e)})};r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null)),document.getElementById("root")),g()}],[[4,1,2]]]);
//# sourceMappingURL=main.2488cd06.chunk.js.map