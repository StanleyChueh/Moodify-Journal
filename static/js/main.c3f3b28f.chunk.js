(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a.p+"static/media/cat.8909de12.gif"},function(e,t,a){e.exports=a(18)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(3),s=a.n(o),c=(a(13),a(1));a(14),a(15);var r=function(e){let{isOpen:t,onClose:a,message:n,link:o}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};a(16);var i=function(e){let{isOpen:t,onClose:a,canvasRef:o,handleCanvasMouseDown:s,handleCanvasMouseMove:c,handleCanvasMouseUp:r,saveDrawing:i,reimagineDrawing:m,savedDrawing:u}=e;const[d,g]=Object(n.useState)("#000000");return Object(n.useEffect)(()=>{const e=o.current;if(e&&u){const t=e.getContext("2d"),a=new Image;a.src=u,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,u]),l.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},l.a.createElement("div",{className:"drawing-modal-content"},l.a.createElement("div",{className:"modal-decoration"})," ",l.a.createElement("h2",null,"Draw Your Mood"),l.a.createElement("canvas",{ref:o,className:"drawing-canvas",width:"700",height:"700",onMouseDown:s,onMouseMove:c,onMouseUp:r}),l.a.createElement("div",{className:"color-palette"},l.a.createElement("h3",null,"Select Color:"),["#000000","#FF0000","#00FF00","#0000FF","#FFFF00","#FFA500","#800080","#00FFFF","#FFC0CB","#8B4513"].map((e,t)=>l.a.createElement("button",{key:t,style:{backgroundColor:e,width:"30px",height:"30px",margin:"2px",border:d===e?"2px solid #000":"1px solid #ccc",cursor:"pointer",borderRadius:"50%"},onClick:()=>(e=>{g(e);const t=o.current;if(t){t.getContext("2d").strokeStyle=e}})(e)}))),l.a.createElement("div",{className:"drawing-buttons"},l.a.createElement("button",{onClick:i},"Save"),l.a.createElement("button",{onClick:m},"Re-imagine"),l.a.createElement("button",{onClick:a},"Close"))))};a(17);var m=function(e){let{isOpen:t,onClose:a,happyDays:n,onSelectDate:o}=e;return t&&0!==n.length?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Cheer up ",l.a.createElement("span",{role:"img","aria-label":"hands"},"\ud83d\ude4c")),l.a.createElement("p",{className:"modal-message"},'"We all have tough days. Here\'s a happy memory to brighten your day!"'),l.a.createElement("div",{className:"memory-list"},n.map(e=>l.a.createElement("button",{key:e,className:"memory-button",onClick:()=>o(e)},e))),l.a.createElement("button",{className:"close-button",onClick:a},"Close"))):null},u=a(4),d=a.n(u);const g=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],p=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],h={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},b={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function E(e){let{isOpen:t,onClose:a,onSave:n,onRemoveImage:o,onResetToDefault:s,selectedMoodForImage:c,setSelectedMoodForImage:r,uploadedImage:i,setUploadedImage:m,selectedMoodForPlaylist:u,setSelectedMoodForPlaylist:d}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"image-upload-modal yellow-theme"},l.a.createElement("h3",null,"Upload Image for Mood"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:u,onChange:e=>d(e.target.value)},l.a.createElement("option",{value:"Background Music"},"Background Music"),g.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("input",{type:"file",accept:"image/*",onChange:e=>{const t=e.target.files[0];if(t){const e=new FileReader;e.onload=()=>{m(e.result)},e.readAsDataURL(t)}}}),i&&l.a.createElement("div",{className:"uploaded-preview"},l.a.createElement("img",{src:i,alt:"Uploaded preview"})),l.a.createElement("div",{className:"modal-buttons"},l.a.createElement("button",{className:"button save-button",onClick:()=>n(c,i)},"Save"),l.a.createElement("button",{className:"button remove-button",onClick:()=>o(c)},"Remove"),l.a.createElement("button",{className:"button reset-button",onClick:s},"Default"),l.a.createElement("button",{className:"button cancel-button",onClick:a},"Cancel")))):null}function v(e,t){const a=Math.min(Math.floor(e/100*g.length),g.length-1),n=g[a],l=[...t[n]||[],...Array.from({length:b[n]||0},(e,t)=>`/Moodify-Journal/${h[n]}/image${t+1}.jpg`)];return l[Math.floor(Math.random()*l.length)]}function f(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function y(){return g.reduce((e,t)=>(e[t]=0,e),{})}function S(e){let{isOpen:t,onClose:a,onSave:n,selectedMoodForPlaylist:o,setSelectedMoodForPlaylist:s,youtubeLink:c,setYoutubeLink:r}=e;return t?l.a.createElement("div",{className:"playlist-modal"},l.a.createElement("h3",null,"Customize Playlist"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:o,onChange:e=>s(e.target.value)},l.a.createElement("option",{value:"Background Music"},"Background Music")," ",g.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("label",null,"YouTube Link:",l.a.createElement("input",{type:"url",placeholder:"Paste YouTube link here",value:c,onChange:e=>r(e.target.value)})),l.a.createElement("button",{onClick:()=>n(o,c)},"Save"),l.a.createElement("button",{onClick:a},"Cancel")):null}var N=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[o,s]=Object(n.useState)(e[0]),[u,N]=Object(n.useState)(t[e[0]].description),[w,C]=Object(n.useState)(t[e[0]].speechResult),[O,k]=Object(n.useState)(25),[j,M]=Object(n.useState)(t[e[0]].imageUrl),[F,I]=Object(n.useState)("typing"),[R,D]=Object(n.useState)(null),[P,A]=Object(n.useState)(!1),[T,x]=Object(n.useState)(y()),[B,J]=Object(n.useState)(null),[U,L]=Object(n.useState)(!1),[H,Y]=Object(n.useState)(t[o].drawing||null),V=Object(n.useRef)(null),_=Object(n.useRef)(null),q=Object(n.useRef)(!1),[$,z]=Object(n.useState)(!1),[G,K]=Object(n.useState)(!1),[Q,X]=Object(n.useState)([]),[Z,W]=Object(n.useState)(!1),[ee,te]=Object(n.useState)(!1),[ae,ne]=Object(n.useState)([]),[le,oe]=Object(n.useState)(!1),[se,ce]=Object(n.useState)("Anger"),[re,ie]=Object(n.useState)(""),[me,ue]=Object(n.useState)(!1),[de,ge]=Object(n.useState)("Anger"),[pe,he]=Object(n.useState)(!1),[be,Ee]=Object(n.useState)(!1),[ve,fe]=Object(n.useState)("Anger"),[ye,Se]=Object(n.useState)(null),[Ne,we]=Object(n.useState)("https://youtu.be/CFGLoQIhmow?si=SQ5DQVCCAmKdOt3K"),[Ce,Oe]=Object(n.useState)(!1),[ke,je]=Object(n.useState)(null),[Me,Fe]=Object(n.useState)({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),[Ie,Re]=Object(n.useState)({Anger:"",Neutral:"",Fear:"",Sadness:"",Surprise:"",Happiness:""}),De=(Object(n.useCallback)(()=>{const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});ne(a)},[e,t]),e=>{K(!1),Te(e)});Object(n.useEffect)(()=>{(O>=34&&O<=50||O>=51&&O<=67)&&Be()},[O]);const Pe=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=y();let l=0,o=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/g.length)),t=g[e];t&&(n[t]+=1,"Sadness"===t?l+=1:"Fear"===t&&(o+=1))}}),x(n);const s=new Date,c=B?Math.floor((s-B)/864e5):8;(l>7||o>7)&&c>=7&&(A(!0),J(new Date))},[e,t,B]);Object(n.useEffect)(()=>{const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=()=>{new window.YT.Player("background-music-player",{height:"0",width:"0",videoId:f(Ne),events:{onReady:e=>je(e.target)}})},ke&&Ne&&ke.loadVideoById(f(Ne))},[Ne,ke]),Object(n.useEffect)(()=>{const e=localStorage.getItem("backgroundMusic");e&&we(e)},[]),Object(n.useEffect)(()=>{Pe()},[t,Pe]),Object(n.useEffect)(()=>{const e=Math.min(Math.floor(O/100*g.length),g.length-1),t=g[e]||"Neutral",a=Ie[t]||{Anger:"https://youtu.be/FLTchCiC0T0?si=_LEx70RIBrG3HC_Z",Neutral:"https://youtu.be/pTweN7F2PFA?si=5v6Ney7A9MTtJ086",Fear:"https://www.youtube.com/watch?v=0qanF-91aJo",Sadness:"https://youtu.be/FFlPgTPvRJc?si=9SzqK2Vf7KaeAsFk",Surprise:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s",Happiness:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}[t];D({title:t+" Playlist",playlistUrl:a})},[O,Ie]),Object(n.useEffect)(()=>{const e=localStorage.getItem("customMoodImages");e&&Fe(JSON.parse(e))},[]),Object(n.useEffect)(()=>{me||Se(null)},[me]),Object(n.useEffect)(()=>{localStorage.setItem("diaryEntries",JSON.stringify(t))},[t]),Object(n.useEffect)(()=>{localStorage.setItem("moodAnalysis",JSON.stringify(T))},[T]),Object(n.useEffect)(()=>{localStorage.setItem("customPlaylists",JSON.stringify(Ie))},[Ie]),Object(n.useEffect)(()=>{const e=localStorage.getItem("diaryEntries");e&&a(JSON.parse(e));const t=localStorage.getItem("moodAnalysis");t&&x(JSON.parse(t));const n=localStorage.getItem("customPlaylists");n&&Re(JSON.parse(n))},[]),Object(n.useEffect)(()=>{const e=document.querySelector(".cat"),t=()=>{e.style.animationDuration=3*Math.random()+3+"s"};return e.addEventListener("animationiteration",t),()=>{e.removeEventListener("animationiteration",t)}},[]),Object(n.useEffect)(()=>{localStorage.setItem("selectedDate",o)},[o]),Object(n.useEffect)(()=>{const e=localStorage.getItem("selectedDate");e&&s(e)},[]);const Ae=e=>{I(e),$&&xe(),I(e),"speech"===e&&K(!0),I(e),"speech"===e?Te():xe(),L("draw"===e)},Te=e=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const t=new window.webkitSpeechRecognition;t.lang=e,t.interimResults=!1,t.continuous=!0,V.current=t;let a="";t.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;a++){const n=e.results[a];n.isFinal&&(t+=n[0].transcript.trim())}t&&t!==a&&(C(e=>e+" "+t),a=t)},t.onerror=e=>{console.error("Speech recognition error:",e.error)},t.start(),z(!0)},xe=()=>{V.current&&(V.current.stop(),z(!1))},Be=()=>{e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85}).length>0&&W(!0)};return Object(n.useEffect)(()=>{O<51&&Be()},[O]),l.a.createElement("div",{className:"app-layout"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===o?"active":""),onClick:()=>(e=>{var n,l,c,r,i;a(e=>({...e,[o]:{...e[o],description:u,mood:O,imageUrl:j,drawing:H,speechResult:w}})),s(e),N((null===(n=t[e])||void 0===n?void 0:n.description)||""),k((null===(l=t[e])||void 0===l?void 0:l.mood)||25),M((null===(c=t[e])||void 0===c?void 0:c.imageUrl)||null),Y((null===(r=t[e])||void 0===r?void 0:r.drawing)||null),C((null===(i=t[e])||void 0===i?void 0:i.speechResult)||"")})(e)},0===n?"Today":e)))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},o,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(c.a,{className:"input-icon "+("typing"===F?"active":""),title:"Type",onClick:()=>Ae("typing")}),l.a.createElement(c.b,{className:"input-icon "+("speech"===F?"active":""),title:"Voice to Text",onClick:()=>Ae("speech")}),l.a.createElement(c.c,{className:"input-icon "+("draw"===F?"active":""),title:"Draw",onClick:()=>{Ae("draw"),L(!0)}})),G&&l.a.createElement("div",{className:"language-modal"},l.a.createElement("h3",null,"Choose Language for Speech-to-Text"),l.a.createElement("button",{onClick:()=>De("en-US")},"English"),l.a.createElement("button",{onClick:()=>De("zh-TW")},"Taiwanese")),"typing"===F&&l.a.createElement("textarea",{className:"description-input",value:u,onChange:e=>N(e.target.value),placeholder:"How's your day?"}),"speech"===F&&l.a.createElement("textarea",{className:"description-input",value:w,readOnly:!0,placeholder:"Speech-to-text result..."}),l.a.createElement("div",{className:"button-container"},l.a.createElement("button",{className:"button enter-button",onClick:()=>{const e=v(O,Me);if(M(e),"speech"===F)$?(xe(),a(e=>({...e,[o]:{...e[o],speechResult:w}})),alert("Recording stopped and entry saved successfully!")):(Te(),alert("Recording started..."));else{const e=v(O,Me);M(e),a(t=>({...t,[o]:{description:u,mood:O,imageUrl:e,speechResult:w}})),alert("Entry saved successfully!")}}},"Enter"),l.a.createElement("button",{className:"button clear-button",onClick:()=>{"typing"===F?N(""):"speech"===F&&C("")}},"Clear"),l.a.createElement("button",{className:"button customize-playlist-button",onClick:()=>oe(!0)},"Music"),l.a.createElement("button",{className:"button customize-image-button",onClick:()=>ue(!0)},"Image")),l.a.createElement(S,{isOpen:le,onClose:()=>oe(!1),onSave:(e,t)=>{"Background Music"===e?(we(t),localStorage.setItem("backgroundMusic",t)):(Re(a=>({...a,[e]:t})),localStorage.setItem("customPlaylists",JSON.stringify({...Ie,[e]:t}))),oe(!1),ie("")},selectedMoodForPlaylist:se,setSelectedMoodForPlaylist:ce,youtubeLink:re,setYoutubeLink:ie}),l.a.createElement("div",{className:"image-display"},j?l.a.createElement("img",{src:j,alt:"Mood",className:"generated-image"}):l.a.createElement("div",{className:"placeholder"},"images for your mood")),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-emojis"},p.map((e,t)=>l.a.createElement("span",{key:t,className:"mood-emoji"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:O,className:"mood-slider",onChange:a=>(a=>{if(k(a),a>=34&&a<=50||a>=51&&a<=67){const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});a.length>0?(ne(a),te(!0)):te(!1)}else te(!1)})(Number(a.target.value))})),R&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("a",{href:R.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${f(R.playlistUrl)}/hqdefault.jpg`,alt:R.title+" playlist",className:"music-thumbnail"}))),l.a.createElement("div",{className:"mood-analysis"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(T).map((e,t)=>l.a.createElement("li",{key:e},g[t]," ",p[t],": ",T[e])))),l.a.createElement(r,{isOpen:P,onClose:()=>A(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),l.a.createElement(i,{isOpen:U,onClose:()=>L(!1),canvasRef:_,handleCanvasMouseDown:e=>{const t=_.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),q.current=!0}},handleCanvasMouseMove:e=>{if(!q.current)return;const t=_.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),a.stroke()}},handleCanvasMouseUp:()=>{q.current=!1},saveDrawing:()=>{const e=_.current;if(e){const t=e.toDataURL();Y(t),a(e=>({...e,[o]:{...e[o],drawing:t}})),alert("Drawing saved successfully!")}},reimagineDrawing:()=>{const e=_.current;if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}Y(null),a(e=>({...e,[o]:{...e[o],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:H}),ee&&l.a.createElement(m,{isOpen:ee,onClose:()=>te(!1),happyDays:ae,onSelectDate:e=>{s(e),te(!1)}}),l.a.createElement(E,{isOpen:me,onClose:()=>{Se(null),ue(!1)},onSave:(e,t)=>{if(t){Fe(a=>({...a,[e]:[...a[e]||[],t]}));try{const a={...Me,[e]:[...Me[e]||[],t]};localStorage.setItem("customMoodImages",JSON.stringify(a))}catch(a){return console.error("Error saving image to localStorage:",a),void alert("An error occurred while saving the image. Please try again.")}Se(null),ue(!1),alert(`Image for mood "${e}" saved successfully!`)}else alert("No image selected. Please upload an image before saving.")},onRemoveImage:e=>{fe(e),Ee(!0),localStorage.setItem("customMoodImages",JSON.stringify({...Me,[e]:null}))},onResetToDefault:()=>{window.confirm("Are you sure you want to reset all custom images?")&&(Fe({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),localStorage.removeItem("customMoodImages"))},selectedMoodForImage:de,setSelectedMoodForImage:ge,uploadedImage:ye,setUploadedImage:Se,selectedMoodForPlaylist:se,setSelectedMoodForPlaylist:ce}),be&&l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h3",null,"Select Image to Remove for ",ve),l.a.createElement("div",{className:"image-grid"},[...Me[ve]||[],...Array.from({length:b[ve]||0},(e,t)=>`/Moodify-Journal/${h[ve]}/image${t+1}.jpg`)].map((e,t)=>l.a.createElement("div",{key:t,className:"image-item"},l.a.createElement("img",{src:e,alt:"Image "+(t+1)}),l.a.createElement("button",{className:"remove-btn",onClick:()=>((e,t)=>{const a=Me[e]||[];if(t<a.length){const n=a.filter((e,a)=>a!==t);Fe(t=>({...t,[e]:n})),localStorage.setItem("customMoodImages",JSON.stringify({...Me,[e]:n}))}else alert("Hardcoded images cannot be removed dynamically!")})(ve,t)},"Remove")))),l.a.createElement("button",{className:"button cancel-button",onClick:()=>Ee(!1)},"Cancel"))),l.a.createElement("div",{className:"top-right-controls"},l.a.createElement("button",{onClick:()=>{ke&&(Ce?ke.pauseVideo():ke.playVideo(),Oe(!Ce))},className:"music-toggle-button"},Ce?l.a.createElement("span",null,"\ud83c\udfb5 Pause Music"):l.a.createElement("span",null,"\ud83c\udfb6 Play Music"))),l.a.createElement("div",{id:"background-music-player"}),l.a.createElement("div",{className:"cat-animation"},l.a.createElement("img",{src:d.a,alt:"Running Cat",className:"cat"})))};var w=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,19)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:o,getTTFB:s}=t;a(e),n(e),l(e),o(e),s(e)})};s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(N,null)),document.getElementById("root")),w()}],[[5,1,2]]]);
//# sourceMappingURL=main.c3f3b28f.chunk.js.map