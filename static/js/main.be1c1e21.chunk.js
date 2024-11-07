(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(15)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(3),c=a.n(s),o=(a(12),a(1));a(13),a(14);var r=function(e){let{isOpen:t,onClose:a,message:n,link:s}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};var i=function(e){let{isOpen:t,onClose:a,canvasRef:s,handleCanvasMouseDown:c,handleCanvasMouseMove:o,handleCanvasMouseUp:r,saveDrawing:i,reimagineDrawing:u,savedDrawing:m}=e;const[d,p]=Object(n.useState)("#000000");return Object(n.useEffect)(()=>{const e=s.current;if(e&&m){const t=e.getContext("2d"),a=new Image;a.src=m,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,m]),l.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},l.a.createElement("div",{className:"drawing-modal-content"},l.a.createElement("h2",null,"Draw Your Mood"),l.a.createElement("canvas",{ref:s,className:"drawing-canvas",width:"400",height:"400",onMouseDown:c,onMouseMove:o,onMouseUp:r,style:{border:"1px solid #000"}}),l.a.createElement("div",{className:"color-palette"},l.a.createElement("h3",null,"Select Color:"),["#000000","#FF0000","#00FF00","#0000FF","#FFFF00","#FFA500","#800080","#00FFFF","#FFC0CB","#8B4513"].map((e,t)=>l.a.createElement("button",{key:t,style:{backgroundColor:e,width:"30px",height:"30px",margin:"2px",border:d===e?"2px solid #000":"1px solid #ccc",cursor:"pointer"},onClick:()=>(e=>{p(e);const t=s.current;if(t){t.getContext("2d").strokeStyle=e}})(e)}))),l.a.createElement("div",{className:"drawing-buttons"},l.a.createElement("button",{onClick:i},"Save"),l.a.createElement("button",{onClick:u},"Re-imagine"),l.a.createElement("button",{onClick:a},"Close"))))};var u=function(e){let{isOpen:t,onClose:a,happyDays:n,onSelectDate:s}=e;return t&&0!==n.length?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",null,"Cheer up\ud83d\ude4c"),l.a.createElement("ul",null,n.map(e=>l.a.createElement("li",{key:e},l.a.createElement("button",{onClick:()=>s(e)},e)))),l.a.createElement("button",{onClick:a},"Close"))):null};const m=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],d=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],p={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},g={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function h(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function w(){return m.reduce((e,t)=>(e[t]=0,e),{})}var v=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[s,c]=Object(n.useState)(e[0]),[v,b]=Object(n.useState)(t[e[0]].description),[E,f]=Object(n.useState)(t[e[0]].speechResult),[y,C]=Object(n.useState)(25),[S,N]=Object(n.useState)(t[e[0]].imageUrl),[O,j]=Object(n.useState)("typing"),[k,F]=Object(n.useState)(!1),[M,R]=Object(n.useState)(!1),[D,x]=Object(n.useState)(null),[U,T]=Object(n.useState)(!1),[A,B]=Object(n.useState)(w()),[I,L]=Object(n.useState)(null),[P,H]=Object(n.useState)(!1),[_,q]=Object(n.useState)(t[s].drawing||null),Y=Object(n.useRef)(null),G=Object(n.useRef)(null),J=Object(n.useRef)(!1),[Q,X]=Object(n.useState)(!1),[$,V]=Object(n.useState)("en-US"),[W,Z]=Object(n.useState)(!1),[z,K]=Object(n.useState)([]),[ee,te]=Object(n.useState)(!1),[ae,ne]=Object(n.useState)(!1),[le,se]=Object(n.useState)([]),ce=(Object(n.useCallback)(()=>{const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});se(a)},[e,t]),e=>{V(e),Z(!1),ie(e)});Object(n.useEffect)(()=>{(y>=34&&y<=50||y>=51&&y<=67)&&me()},[y]);const oe=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=w();let l=0,s=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/m.length)),t=m[e];t&&(n[t]+=1,"Sadness"===t?l+=1:"Fear"===t&&(s+=1))}}),B(n);const c=new Date,o=I?Math.floor((c-I)/864e5):8;(l>7||s>7)&&o>=7&&(T(!0),L(new Date))},[e,t,I]);Object(n.useEffect)(()=>{oe()},[t,oe]),Object(n.useEffect)(()=>{const e=[{moodRange:[0,16],title:"Angry Music",playlistUrl:"https://www.youtube.com/watch?v=r8OipmKFDeM"},{moodRange:[17,33],title:"Neutral Music",playlistUrl:"https://www.youtube.com/watch?v=CFGLoQIhmow&t=2486s"},{moodRange:[34,50],title:"Fear Music",playlistUrl:"https://www.youtube.com/watch?v=P_tsPLT0irs"},{moodRange:[51,67],title:"Sad Music",playlistUrl:"https://www.youtube.com/watch?v=A_MjCqQoLLA"},{moodRange:[68,84],title:"Surprise Music",playlistUrl:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s"},{moodRange:[85,100],title:"Happy Music",playlistUrl:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}].find(e=>y>=e.moodRange[0]&&y<=e.moodRange[1]);x(e)},[y]);const re=e=>{j(e),Q&&ue(),j(e),"speech"===e&&Z(!0),j(e),"speech"===e?ie():ue(),H("draw"===e)},ie=e=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const t=new window.webkitSpeechRecognition;t.lang=e,t.interimResults=!1,t.continuous=!0,Y.current=t;let a="";t.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;a++){const n=e.results[a];n.isFinal&&(t+=n[0].transcript.trim())}t&&t!==a&&(f(e=>e+" "+t),a=t)},t.onerror=e=>{console.error("Speech recognition error:",e.error)},t.start(),X(!0)},ue=()=>{Y.current&&(Y.current.stop(),X(!1))},me=()=>{const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});a.length>0&&(K(a),te(!0))};return Object(n.useEffect)(()=>{y<51&&me()},[y]),l.a.createElement("div",{className:"app-layout"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===s?"active":""),onClick:()=>(e=>{var n,l,o,r,i;a(e=>({...e,[s]:{...e[s],description:v,mood:y,imageUrl:S,drawing:_,speechResult:E}})),c(e),b((null===(n=t[e])||void 0===n?void 0:n.description)||""),C((null===(l=t[e])||void 0===l?void 0:l.mood)||25),N((null===(o=t[e])||void 0===o?void 0:o.imageUrl)||null),q((null===(r=t[e])||void 0===r?void 0:r.drawing)||null),f((null===(i=t[e])||void 0===i?void 0:i.speechResult)||"")})(e)},0===n?"Today":e)))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},s,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(o.a,{className:"input-icon "+("typing"===O?"active":""),title:"Type",onClick:()=>re("typing")}),l.a.createElement(o.b,{className:"input-icon "+("speech"===O?"active":""),title:"Voice to Text",onClick:()=>re("speech")}),l.a.createElement(o.c,{className:"input-icon "+("draw"===O?"active":""),title:"Draw",onClick:()=>{re("draw"),H(!0)}})),W&&l.a.createElement("div",{className:"language-modal"},l.a.createElement("h3",null,"Choose Language for Speech-to-Text"),l.a.createElement("button",{onClick:()=>ce("en-US")},"English"),l.a.createElement("button",{onClick:()=>ce("zh-TW")},"Taiwanese")),"typing"===O&&l.a.createElement("textarea",{className:"description-input",value:v,onChange:e=>b(e.target.value),placeholder:"Write your description here..."}),"speech"===O&&l.a.createElement("div",{className:"speech-result"},l.a.createElement("h3",null,"Speech-to-Text Result"),l.a.createElement("p",null,E)),l.a.createElement("div",{className:"button-container"},l.a.createElement("button",{className:"button enter-button",onClick:()=>{if("speech"===O)Q?(ue(),a(e=>({...e,[s]:{...e[s],speechResult:E}})),alert("Recording stopped and entry saved successfully!")):(ie(),alert("Recording started..."));else{const e=function(e){let t=Math.floor(e/100*m.length);t=100===e?m.length-1:Math.min(t,m.length-1);const a=m[t],n=g[a]||1;return`/Moodify-Journal/${p[a]}/image${Math.floor(Math.random()*n)+1}.jpg`}(y);N(e),a(t=>({...t,[s]:{description:v,mood:y,imageUrl:e,speechResult:E}})),alert("Entry saved successfully!")}}},"Enter"),l.a.createElement("button",{className:"button clear-button",onClick:()=>{"typing"===O?b(""):"speech"===O&&f("")}},"Clear")),l.a.createElement("div",{className:"image-display"},S?l.a.createElement("img",{src:S,alt:"Mood",className:"generated-image"}):l.a.createElement("div",{className:"placeholder"},"Your image will appear here")),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-emojis"},d.map((e,t)=>l.a.createElement("span",{key:t,className:"mood-emoji"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:y,className:"mood-slider",onChange:a=>(a=>{if(C(a),a>=34&&a<=50||a>=51&&a<=67){const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});a.length>0?(se(a),ne(!0)):ne(!1)}else ne(!1)})(Number(a.target.value))})),D&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("h3",null,"Suggested Playlist:"),l.a.createElement("a",{href:D.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${h(D.playlistUrl)}/hqdefault.jpg`,alt:D.title+" playlist",className:"music-thumbnail"}))),l.a.createElement("div",{className:"mood-analysis"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(A).map((e,t)=>l.a.createElement("li",{key:e},m[t]," ",d[t],": ",A[e])))),l.a.createElement(r,{isOpen:U,onClose:()=>T(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),l.a.createElement(i,{isOpen:P,onClose:()=>H(!1),canvasRef:G,handleCanvasMouseDown:e=>{const t=G.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),J.current=!0}},handleCanvasMouseMove:e=>{if(!J.current)return;const t=G.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,s=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*s),a.stroke()}},handleCanvasMouseUp:()=>{J.current=!1},saveDrawing:()=>{const e=G.current;if(e){const t=e.toDataURL();q(t),a(e=>({...e,[s]:{...e[s],drawing:t}})),alert("Drawing saved successfully!")}},reimagineDrawing:()=>{const e=G.current;if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}q(null),a(e=>({...e,[s]:{...e[s],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:_}),ae&&l.a.createElement(u,{isOpen:ae,onClose:()=>ne(!1),happyDays:le,onSelectDate:e=>{c(e),ne(!1)}}))};var b=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,16)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:s,getTTFB:c}=t;a(e),n(e),l(e),s(e),c(e)})};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(v,null)),document.getElementById("root")),b()}],[[4,1,2]]]);
//# sourceMappingURL=main.be1c1e21.chunk.js.map