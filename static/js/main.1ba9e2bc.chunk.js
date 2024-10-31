(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(15)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(3),i=a.n(l),r=(a(12),a(1));a(13),a(14);var o=function(e){let{isOpen:t,onClose:a,message:n,link:l}=e;return t?s.a.createElement("div",{className:"modal-overlay"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),s.a.createElement("p",{className:"modal-message"},n),s.a.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),s.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};var c=function(e){let{isOpen:t,onClose:a,canvasRef:l,handleCanvasMouseDown:i,handleCanvasMouseMove:r,handleCanvasMouseUp:o,saveDrawing:c,reimagineDrawing:u,savedDrawing:m}=e;return Object(n.useEffect)(()=>{const e=l.current;if(e&&m){const t=e.getContext("2d"),a=new Image;a.src=m,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,m]),s.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},s.a.createElement("div",{className:"drawing-modal-content"},s.a.createElement("h2",null,"Draw Your Mood"),s.a.createElement("canvas",{ref:l,className:"drawing-canvas",width:"400",height:"400",onMouseDown:i,onMouseMove:r,onMouseUp:o}),s.a.createElement("div",{className:"drawing-buttons"},s.a.createElement("button",{onClick:c},"Save"),s.a.createElement("button",{onClick:u},"Re-imagine"),s.a.createElement("button",{onClick:a},"Close"))))};const u=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],m=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],d={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},g={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function p(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function h(){return u.reduce((e,t)=>(e[t]=0,e),{})}var w=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const s=n.toISOString().split("T")[0];t.push(s)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[l,i]=Object(n.useState)(e[0]),[w,v]=Object(n.useState)(t[e[0]].description),[E,b]=Object(n.useState)(t[e[0]].speechResult),[f,y]=Object(n.useState)(25),[N,S]=Object(n.useState)(t[e[0]].imageUrl),[C,M]=Object(n.useState)("typing"),[O,R]=Object(n.useState)(!1),[j,k]=Object(n.useState)(!1),[D,U]=Object(n.useState)(null),[F,T]=Object(n.useState)(!1),[A,x]=Object(n.useState)(h()),[I,P]=Object(n.useState)(null),[B,H]=Object(n.useState)(!1),[L,_]=Object(n.useState)(t[l].drawing||null),q=Object(n.useRef)(null),Y=Object(n.useRef)(null),G=Object(n.useRef)(!1),[J,Q]=Object(n.useState)(!1),X=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=h();let s=0,l=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/u.length)),t=u[e];t&&(n[t]+=1,"Sadness"===t?s+=1:"Fear"===t&&(l+=1))}}),x(n);const i=new Date,r=I?Math.floor((i-I)/864e5):8;(s>7||l>7)&&r>=7&&(T(!0),P(new Date))},[e,t,I]);Object(n.useEffect)(()=>{X()},[t,X]),Object(n.useEffect)(()=>{const e=[{moodRange:[0,16],title:"Angry Music",playlistUrl:"https://www.youtube.com/watch?v=r8OipmKFDeM"},{moodRange:[17,33],title:"Neutral Music",playlistUrl:"https://www.youtube.com/watch?v=CFGLoQIhmow&t=2486s"},{moodRange:[34,50],title:"Fear Music",playlistUrl:"https://www.youtube.com/watch?v=P_tsPLT0irs"},{moodRange:[51,67],title:"Sad Music",playlistUrl:"https://www.youtube.com/watch?v=A_MjCqQoLLA"},{moodRange:[68,84],title:"Surprise Music",playlistUrl:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s"},{moodRange:[85,100],title:"Happy Music",playlistUrl:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}].find(e=>f>=e.moodRange[0]&&f<=e.moodRange[1]);U(e)},[f]);const $=e=>{M(e),J&&Z(),M(e),"speech"===e?(k(!0),V()):(Z(),k(!1)),H("draw"===e)},V=()=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const e=new window.webkitSpeechRecognition;e.lang="en-US",e.interimResults=!0,e.continuous=!0,q.current=e,e.onresult=e=>{const t=e.results[e.results.length-1][0].transcript;b(e=>e+" "+t)},e.onerror=e=>{console.error("Speech recognition error:",e.error)},e.start(),Q(!0)},Z=()=>{q.current&&(q.current.stop(),Q(!1))};return s.a.createElement("div",{className:"app-layout"},s.a.createElement("div",{className:"sidebar"},s.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),s.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>s.a.createElement("li",{key:e,className:"diary-item "+(e===l?"active":""),onClick:()=>(e=>{var n,s,r,o,c;a(e=>({...e,[l]:{...e[l],description:w,mood:f,imageUrl:N,drawing:L,speechResult:E}})),i(e),v((null===(n=t[e])||void 0===n?void 0:n.description)||""),y((null===(s=t[e])||void 0===s?void 0:s.mood)||25),S((null===(r=t[e])||void 0===r?void 0:r.imageUrl)||null),_((null===(o=t[e])||void 0===o?void 0:o.drawing)||null),b((null===(c=t[e])||void 0===c?void 0:c.speechResult)||"")})(e)},0===n?"Today":e)))),s.a.createElement("div",{className:"main-content"},s.a.createElement("h1",{className:"main-title"},l,"'s Mood"),s.a.createElement("div",{className:"input-icons"},s.a.createElement(r.a,{className:"input-icon "+("typing"===C?"active":""),title:"Type",onClick:()=>$("typing")}),s.a.createElement(r.b,{className:"input-icon "+("speech"===C?"active":""),title:"Voice to Text",onClick:()=>$("speech")}),s.a.createElement(r.c,{className:"input-icon "+("draw"===C?"active":""),title:"Draw",onClick:()=>{$("draw"),H(!0)}})),"typing"===C&&s.a.createElement("textarea",{className:"description-input",value:w,onChange:e=>v(e.target.value),placeholder:"Write your description here..."}),"speech"===C&&s.a.createElement("div",{className:"speech-result"},s.a.createElement("h3",null,"Speech-to-Text Result"),s.a.createElement("p",null,E)),s.a.createElement("button",{className:"generate-button",onClick:()=>{if("speech"===C)J?(Z(),a(e=>({...e,[l]:{...e[l],speechResult:E}})),alert("Recording stopped and entry saved successfully!")):(V(),alert("Recording started..."));else{const e=function(e){let t=Math.floor(e/100*u.length);t=100===e?u.length-1:Math.min(t,u.length-1);const a=u[t],n=g[a]||1;return`/Moodify-Journal/${d[a]}/image${Math.floor(Math.random()*n)+1}.jpg`}(f);S(e),a(t=>({...t,[l]:{description:w,mood:f,imageUrl:e,speechResult:E}})),alert("Entry saved successfully!")}}},"Enter"),s.a.createElement("div",{className:"image-display"},N?s.a.createElement("img",{src:N,alt:"Mood",className:"generated-image"}):s.a.createElement("div",{className:"placeholder"},"Your image will appear here")),s.a.createElement("div",{className:"mood-slider-container"},s.a.createElement("div",{className:"mood-emojis"},m.map((e,t)=>s.a.createElement("span",{key:t,className:"mood-emoji"},e))),s.a.createElement("input",{type:"range",min:"0",max:"100",value:f,className:"mood-slider",onChange:e=>y(Number(e.target.value))})),D&&s.a.createElement("div",{className:"music-suggestion"},s.a.createElement("h3",null,"Suggested Playlist:"),s.a.createElement("a",{href:D.playlistUrl,target:"_blank",rel:"noopener noreferrer"},s.a.createElement("img",{src:`https://img.youtube.com/vi/${p(D.playlistUrl)}/hqdefault.jpg`,alt:D.title+" playlist",className:"music-thumbnail"}))),s.a.createElement("div",{className:"mood-analysis"},s.a.createElement("h3",null,"Past 14 Days Mood Analysis"),s.a.createElement("ul",null,Object.keys(A).map((e,t)=>s.a.createElement("li",{key:e},u[t]," ",m[t],": ",A[e])))),s.a.createElement(o,{isOpen:F,onClose:()=>T(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),s.a.createElement(c,{isOpen:B,onClose:()=>H(!1),canvasRef:Y,handleCanvasMouseDown:e=>{const t=Y.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),s=t.width/n.width,l=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*s,(e.clientY-n.top)*l),G.current=!0}},handleCanvasMouseMove:e=>{if(!G.current)return;const t=Y.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),s=t.width/n.width,l=t.height/n.height;a.lineTo((e.clientX-n.left)*s,(e.clientY-n.top)*l),a.stroke()}},handleCanvasMouseUp:()=>{G.current=!1},saveDrawing:()=>{const e=Y.current;if(e){const t=e.toDataURL();_(t),a(e=>({...e,[l]:{...e[l],drawing:t}})),alert("Drawing saved successfully!")}R(!1)},reimagineDrawing:()=>{_(null),a(e=>({...e,[l]:{...e[l],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:L}))};var v=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,16)).then(t=>{let{getCLS:a,getFID:n,getFCP:s,getLCP:l,getTTFB:i}=t;a(e),n(e),s(e),l(e),i(e)})};i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(w,null)),document.getElementById("root")),v()}],[[4,1,2]]]);
//# sourceMappingURL=main.1ba9e2bc.chunk.js.map