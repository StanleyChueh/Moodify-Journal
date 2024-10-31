(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(15)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(3),c=a.n(s),i=(a(12),a(1));a(13),a(14);var o=function(e){let{isOpen:t,onClose:a,message:n,link:s}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};var r=function(e){let{isOpen:t,onClose:a,canvasRef:s,handleCanvasMouseDown:c,handleCanvasMouseMove:i,handleCanvasMouseUp:o,saveDrawing:r,reimagineDrawing:u,savedDrawing:m}=e;return Object(n.useEffect)(()=>{const e=s.current;if(e&&m){const t=e.getContext("2d"),a=new Image;a.src=m,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,m]),l.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},l.a.createElement("div",{className:"drawing-modal-content"},l.a.createElement("h2",null,"Draw Your Mood"),l.a.createElement("canvas",{ref:s,className:"drawing-canvas",width:"400",height:"400",onMouseDown:c,onMouseMove:i,onMouseUp:o}),l.a.createElement("div",{className:"drawing-buttons"},l.a.createElement("button",{onClick:r},"Save"),l.a.createElement("button",{onClick:u},"Re-imagine"),l.a.createElement("button",{onClick:a},"Close"))))};const u=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],m=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],d={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},g={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function h(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function p(){return u.reduce((e,t)=>(e[t]=0,e),{})}var w=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[s,c]=Object(n.useState)(e[0]),[w,v]=Object(n.useState)(t[e[0]].description),[b,E]=Object(n.useState)(t[e[0]].speechResult),[f,y]=Object(n.useState)(25),[S,N]=Object(n.useState)(t[e[0]].imageUrl),[C,M]=Object(n.useState)("typing"),[O,j]=Object(n.useState)(!1),[R,k]=Object(n.useState)(!1),[D,U]=Object(n.useState)(null),[F,T]=Object(n.useState)(!1),[x,A]=Object(n.useState)(p()),[I,L]=Object(n.useState)(null),[P,B]=Object(n.useState)(!1),[H,_]=Object(n.useState)(t[s].drawing||null),q=Object(n.useRef)(null),Y=Object(n.useRef)(null),G=Object(n.useRef)(!1),[J,Q]=Object(n.useState)(!1),[X,$]=Object(n.useState)("en-US"),[V,W]=Object(n.useState)(!1),Z=e=>{$(e),W(!1),ee(e)},z=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=p();let l=0,s=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/u.length)),t=u[e];t&&(n[t]+=1,"Sadness"===t?l+=1:"Fear"===t&&(s+=1))}}),A(n);const c=new Date,i=I?Math.floor((c-I)/864e5):8;(l>7||s>7)&&i>=7&&(T(!0),L(new Date))},[e,t,I]);Object(n.useEffect)(()=>{z()},[t,z]),Object(n.useEffect)(()=>{const e=[{moodRange:[0,16],title:"Angry Music",playlistUrl:"https://www.youtube.com/watch?v=r8OipmKFDeM"},{moodRange:[17,33],title:"Neutral Music",playlistUrl:"https://www.youtube.com/watch?v=CFGLoQIhmow&t=2486s"},{moodRange:[34,50],title:"Fear Music",playlistUrl:"https://www.youtube.com/watch?v=P_tsPLT0irs"},{moodRange:[51,67],title:"Sad Music",playlistUrl:"https://www.youtube.com/watch?v=A_MjCqQoLLA"},{moodRange:[68,84],title:"Surprise Music",playlistUrl:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s"},{moodRange:[85,100],title:"Happy Music",playlistUrl:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}].find(e=>f>=e.moodRange[0]&&f<=e.moodRange[1]);U(e)},[f]);const K=e=>{M(e),J&&te(),M(e),"speech"===e&&W(!0),M(e),"speech"===e?(k(!0),ee()):(te(),k(!1)),B("draw"===e)},ee=e=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const t=new window.webkitSpeechRecognition;t.lang=e,t.interimResults=!1,t.continuous=!0,q.current=t;let a="";t.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;a++){const n=e.results[a];n.isFinal&&(t+=n[0].transcript.trim())}t&&t!==a&&(E(e=>e+" "+t),a=t)},t.onerror=e=>{console.error("Speech recognition error:",e.error)},t.start(),Q(!0)},te=()=>{q.current&&(q.current.stop(),Q(!1))};return l.a.createElement("div",{className:"app-layout"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===s?"active":""),onClick:()=>(e=>{var n,l,i,o,r;a(e=>({...e,[s]:{...e[s],description:w,mood:f,imageUrl:S,drawing:H,speechResult:b}})),c(e),v((null===(n=t[e])||void 0===n?void 0:n.description)||""),y((null===(l=t[e])||void 0===l?void 0:l.mood)||25),N((null===(i=t[e])||void 0===i?void 0:i.imageUrl)||null),_((null===(o=t[e])||void 0===o?void 0:o.drawing)||null),E((null===(r=t[e])||void 0===r?void 0:r.speechResult)||"")})(e)},0===n?"Today":e)))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},s,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(i.a,{className:"input-icon "+("typing"===C?"active":""),title:"Type",onClick:()=>K("typing")}),l.a.createElement(i.b,{className:"input-icon "+("speech"===C?"active":""),title:"Voice to Text",onClick:()=>K("speech")}),l.a.createElement(i.c,{className:"input-icon "+("draw"===C?"active":""),title:"Draw",onClick:()=>{K("draw"),B(!0)}})),V&&l.a.createElement("div",{className:"language-modal"},l.a.createElement("h3",null,"Choose Language for Speech-to-Text"),l.a.createElement("button",{onClick:()=>Z("en-US")},"English"),l.a.createElement("button",{onClick:()=>Z("zh-TW")},"Taiwanese")),"typing"===C&&l.a.createElement("textarea",{className:"description-input",value:w,onChange:e=>v(e.target.value),placeholder:"Write your description here..."}),"speech"===C&&l.a.createElement("div",{className:"speech-result"},l.a.createElement("h3",null,"Speech-to-Text Result"),l.a.createElement("p",null,b)),l.a.createElement("div",{className:"button-container"},l.a.createElement("button",{className:"button enter-button",onClick:()=>{if("speech"===C)J?(te(),a(e=>({...e,[s]:{...e[s],speechResult:b}})),alert("Recording stopped and entry saved successfully!")):(ee(),alert("Recording started..."));else{const e=function(e){let t=Math.floor(e/100*u.length);t=100===e?u.length-1:Math.min(t,u.length-1);const a=u[t],n=g[a]||1;return`/Moodify-Journal/${d[a]}/image${Math.floor(Math.random()*n)+1}.jpg`}(f);N(e),a(t=>({...t,[s]:{description:w,mood:f,imageUrl:e,speechResult:b}})),alert("Entry saved successfully!")}}},"Enter"),l.a.createElement("button",{className:"button clear-button",onClick:()=>{"typing"===C?v(""):"speech"===C&&E("")}},"Clear")),l.a.createElement("div",{className:"image-display"},S?l.a.createElement("img",{src:S,alt:"Mood",className:"generated-image"}):l.a.createElement("div",{className:"placeholder"},"Your image will appear here")),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-emojis"},m.map((e,t)=>l.a.createElement("span",{key:t,className:"mood-emoji"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:f,className:"mood-slider",onChange:e=>y(Number(e.target.value))})),D&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("h3",null,"Suggested Playlist:"),l.a.createElement("a",{href:D.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${h(D.playlistUrl)}/hqdefault.jpg`,alt:D.title+" playlist",className:"music-thumbnail"}))),l.a.createElement("div",{className:"mood-analysis"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(x).map((e,t)=>l.a.createElement("li",{key:e},u[t]," ",m[t],": ",x[e])))),l.a.createElement(o,{isOpen:F,onClose:()=>T(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),l.a.createElement(r,{isOpen:P,onClose:()=>B(!1),canvasRef:Y,handleCanvasMouseDown:e=>{const t=Y.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),G.current=!0}},handleCanvasMouseMove:e=>{if(!G.current)return;const t=Y.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),a.stroke()}},handleCanvasMouseUp:()=>{G.current=!1},saveDrawing:()=>{const e=Y.current;if(e){const t=e.toDataURL();_(t),a(e=>({...e,[s]:{...e[s],drawing:t}})),alert("Drawing saved successfully!")}j(!1)},reimagineDrawing:()=>{const e=Y.current;if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}_(null),a(e=>({...e,[s]:{...e[s],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:H}))};var v=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,16)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:s,getTTFB:c}=t;a(e),n(e),l(e),s(e),c(e)})};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(w,null)),document.getElementById("root")),v()}],[[4,1,2]]]);
//# sourceMappingURL=main.a059eb92.chunk.js.map