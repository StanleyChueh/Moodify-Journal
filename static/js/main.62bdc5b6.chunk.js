(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(17)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(3),s=a.n(o),c=(a(12),a(1));a(13),a(14);var r=function(e){let{isOpen:t,onClose:a,message:n,link:o}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};a(15);var i=function(e){let{isOpen:t,onClose:a,canvasRef:o,handleCanvasMouseDown:s,handleCanvasMouseMove:c,handleCanvasMouseUp:r,saveDrawing:i,reimagineDrawing:u,savedDrawing:m}=e;const[d,g]=Object(n.useState)("#000000");return Object(n.useEffect)(()=>{const e=o.current;if(e&&m){const t=e.getContext("2d"),a=new Image;a.src=m,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,m]),l.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},l.a.createElement("div",{className:"drawing-modal-content"},l.a.createElement("div",{className:"modal-decoration"})," ",l.a.createElement("h2",null,"Draw Your Mood"),l.a.createElement("canvas",{ref:o,className:"drawing-canvas",width:"700",height:"700",onMouseDown:s,onMouseMove:c,onMouseUp:r}),l.a.createElement("div",{className:"color-palette"},l.a.createElement("h3",null,"Select Color:"),["#000000","#FF0000","#00FF00","#0000FF","#FFFF00","#FFA500","#800080","#00FFFF","#FFC0CB","#8B4513"].map((e,t)=>l.a.createElement("button",{key:t,style:{backgroundColor:e,width:"30px",height:"30px",margin:"2px",border:d===e?"2px solid #000":"1px solid #ccc",cursor:"pointer",borderRadius:"50%"},onClick:()=>(e=>{g(e);const t=o.current;if(t){t.getContext("2d").strokeStyle=e}})(e)}))),l.a.createElement("div",{className:"drawing-buttons"},l.a.createElement("button",{onClick:i},"Save"),l.a.createElement("button",{onClick:u},"Re-imagine"),l.a.createElement("button",{onClick:a},"Close"))))};a(16);var u=function(e){let{isOpen:t,onClose:a,happyDays:n,onSelectDate:o}=e;return t&&0!==n.length?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Cheer up ",l.a.createElement("span",{role:"img","aria-label":"hands"},"\ud83d\ude4c")),l.a.createElement("p",{className:"modal-message"},'"We all have tough days. Here\'s a happy memory to brighten your day!"'),l.a.createElement("div",{className:"memory-list"},n.map(e=>l.a.createElement("button",{key:e,className:"memory-button",onClick:()=>o(e)},e))),l.a.createElement("button",{className:"close-button",onClick:a},"Close"))):null};const m=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],d=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],g={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},p={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function h(e){let{isOpen:t,onClose:a,onSave:n,onRemoveImage:o,onResetToDefault:s,selectedMoodForImage:c,setSelectedMoodForImage:r,uploadedImage:i,setUploadedImage:u,selectedMoodForPlaylist:d,setSelectedMoodForPlaylist:g}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"image-upload-modal yellow-theme"},l.a.createElement("h3",null,"Upload Image for Mood"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:d,onChange:e=>g(e.target.value)},l.a.createElement("option",{value:"Background Music"},"Background Music"),m.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("input",{type:"file",accept:"image/*",onChange:e=>{const t=e.target.files[0];if(t){const e=new FileReader;e.onload=()=>{u(e.result)},e.readAsDataURL(t)}}}),i&&l.a.createElement("div",{className:"uploaded-preview"},l.a.createElement("img",{src:i,alt:"Uploaded preview"})),l.a.createElement("div",{className:"modal-buttons"},l.a.createElement("button",{className:"button save-button",onClick:()=>n(c,i)},"Save"),l.a.createElement("button",{className:"button remove-button",onClick:()=>o(c)},"Remove"),l.a.createElement("button",{className:"button reset-button",onClick:s},"Default"),l.a.createElement("button",{className:"button cancel-button",onClick:a},"Cancel")))):null}function b(e,t){const a=Math.min(Math.floor(e/100*m.length),m.length-1),n=m[a],l=[...t[n]||[],...Array.from({length:p[n]||0},(e,t)=>`/Moodify-Journal/${g[n]}/image${t+1}.jpg`)];return l[Math.floor(Math.random()*l.length)]}function E(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function v(){return m.reduce((e,t)=>(e[t]=0,e),{})}function f(e){let{isOpen:t,onClose:a,onSave:n,selectedMoodForPlaylist:o,setSelectedMoodForPlaylist:s,youtubeLink:c,setYoutubeLink:r}=e;return t?l.a.createElement("div",{className:"playlist-modal"},l.a.createElement("h3",null,"Customize Playlist"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:o,onChange:e=>s(e.target.value)},l.a.createElement("option",{value:"Background Music"},"Background Music")," ",m.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("label",null,"YouTube Link:",l.a.createElement("input",{type:"url",placeholder:"Paste YouTube link here",value:c,onChange:e=>r(e.target.value)})),l.a.createElement("button",{onClick:()=>n(o,c)},"Save"),l.a.createElement("button",{onClick:a},"Cancel")):null}var y=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[o,s]=Object(n.useState)(e[0]),[y,S]=Object(n.useState)(t[e[0]].description),[w,N]=Object(n.useState)(t[e[0]].speechResult),[C,O]=Object(n.useState)(25),[k,j]=Object(n.useState)(t[e[0]].imageUrl),[M,F]=Object(n.useState)("typing"),[I,R]=Object(n.useState)(null),[D,P]=Object(n.useState)(!1),[A,T]=Object(n.useState)(v()),[x,B]=Object(n.useState)(null),[J,U]=Object(n.useState)(!1),[H,L]=Object(n.useState)(t[o].drawing||null),Y=Object(n.useRef)(null),V=Object(n.useRef)(null),_=Object(n.useRef)(!1),[$,q]=Object(n.useState)(!1),[z,G]=Object(n.useState)(!1),[K,Q]=Object(n.useState)([]),[W,X]=Object(n.useState)(!1),[Z,ee]=Object(n.useState)(!1),[te,ae]=Object(n.useState)([]),[ne,le]=Object(n.useState)(!1),[oe,se]=Object(n.useState)("Anger"),[ce,re]=Object(n.useState)(""),[ie,ue]=Object(n.useState)(!1),[me,de]=Object(n.useState)("Anger"),[ge,pe]=Object(n.useState)(!1),[he,be]=Object(n.useState)(!1),[Ee,ve]=Object(n.useState)("Anger"),[fe,ye]=Object(n.useState)(null),[Se,we]=Object(n.useState)("https://youtu.be/CFGLoQIhmow?si=SQ5DQVCCAmKdOt3K"),[Ne,Ce]=Object(n.useState)(!1),[Oe,ke]=Object(n.useState)(null),[je,Me]=Object(n.useState)({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),[Fe,Ie]=Object(n.useState)({Anger:"",Neutral:"",Fear:"",Sadness:"",Surprise:"",Happiness:""}),Re=(Object(n.useCallback)(()=>{const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});ae(a)},[e,t]),e=>{G(!1),Ae(e)});Object(n.useEffect)(()=>{(C>=34&&C<=50||C>=51&&C<=67)&&xe()},[C]);const De=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=v();let l=0,o=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/m.length)),t=m[e];t&&(n[t]+=1,"Sadness"===t?l+=1:"Fear"===t&&(o+=1))}}),T(n);const s=new Date,c=x?Math.floor((s-x)/864e5):8;(l>7||o>7)&&c>=7&&(P(!0),B(new Date))},[e,t,x]);Object(n.useEffect)(()=>{const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=()=>{new window.YT.Player("background-music-player",{height:"0",width:"0",videoId:E(Se),events:{onReady:e=>ke(e.target)}})},Oe&&Se&&Oe.loadVideoById(E(Se))},[Se,Oe]),Object(n.useEffect)(()=>{const e=localStorage.getItem("backgroundMusic");e&&we(e)},[]),Object(n.useEffect)(()=>{De()},[t,De]),Object(n.useEffect)(()=>{const e=Math.min(Math.floor(C/100*m.length),m.length-1),t=m[e]||"Neutral",a=Fe[t]||{Anger:"https://youtu.be/FLTchCiC0T0?si=_LEx70RIBrG3HC_Z",Neutral:"https://youtu.be/pTweN7F2PFA?si=5v6Ney7A9MTtJ086",Fear:"https://www.youtube.com/watch?v=0qanF-91aJo",Sadness:"https://youtu.be/FFlPgTPvRJc?si=9SzqK2Vf7KaeAsFk",Surprise:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s",Happiness:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}[t];R({title:t+" Playlist",playlistUrl:a})},[C,Fe]),Object(n.useEffect)(()=>{const e=localStorage.getItem("customMoodImages");e&&Me(JSON.parse(e))},[]),Object(n.useEffect)(()=>{ie||ye(null)},[ie]),Object(n.useEffect)(()=>{localStorage.setItem("diaryEntries",JSON.stringify(t))},[t]),Object(n.useEffect)(()=>{localStorage.setItem("moodAnalysis",JSON.stringify(A))},[A]),Object(n.useEffect)(()=>{localStorage.setItem("customPlaylists",JSON.stringify(Fe))},[Fe]),Object(n.useEffect)(()=>{const e=localStorage.getItem("diaryEntries");e&&a(JSON.parse(e));const t=localStorage.getItem("moodAnalysis");t&&T(JSON.parse(t));const n=localStorage.getItem("customPlaylists");n&&Ie(JSON.parse(n))},[]),Object(n.useEffect)(()=>{localStorage.setItem("selectedDate",o)},[o]),Object(n.useEffect)(()=>{const e=localStorage.getItem("selectedDate");e&&s(e)},[]);const Pe=e=>{F(e),$&&Te(),F(e),"speech"===e&&G(!0),F(e),"speech"===e?Ae():Te(),U("draw"===e)},Ae=e=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const t=new window.webkitSpeechRecognition;t.lang=e,t.interimResults=!1,t.continuous=!0,Y.current=t;let a="";t.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;a++){const n=e.results[a];n.isFinal&&(t+=n[0].transcript.trim())}t&&t!==a&&(N(e=>e+" "+t),a=t)},t.onerror=e=>{console.error("Speech recognition error:",e.error)},t.start(),q(!0)},Te=()=>{Y.current&&(Y.current.stop(),q(!1))},xe=()=>{e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85}).length>0&&X(!0)};return Object(n.useEffect)(()=>{C<51&&xe()},[C]),l.a.createElement("div",{className:"app-layout"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===o?"active":""),onClick:()=>(e=>{var n,l,c,r,i;a(e=>({...e,[o]:{...e[o],description:y,mood:C,imageUrl:k,drawing:H,speechResult:w}})),s(e),S((null===(n=t[e])||void 0===n?void 0:n.description)||""),O((null===(l=t[e])||void 0===l?void 0:l.mood)||25),j((null===(c=t[e])||void 0===c?void 0:c.imageUrl)||null),L((null===(r=t[e])||void 0===r?void 0:r.drawing)||null),N((null===(i=t[e])||void 0===i?void 0:i.speechResult)||"")})(e)},0===n?"Today":e)))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},o,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(c.a,{className:"input-icon "+("typing"===M?"active":""),title:"Type",onClick:()=>Pe("typing")}),l.a.createElement(c.b,{className:"input-icon "+("speech"===M?"active":""),title:"Voice to Text",onClick:()=>Pe("speech")}),l.a.createElement(c.c,{className:"input-icon "+("draw"===M?"active":""),title:"Draw",onClick:()=>{Pe("draw"),U(!0)}})),z&&l.a.createElement("div",{className:"language-modal"},l.a.createElement("h3",null,"Choose Language for Speech-to-Text"),l.a.createElement("button",{onClick:()=>Re("en-US")},"English"),l.a.createElement("button",{onClick:()=>Re("zh-TW")},"Taiwanese")),"typing"===M&&l.a.createElement("textarea",{className:"description-input",value:y,onChange:e=>S(e.target.value),placeholder:"Write your description here..."}),"speech"===M&&l.a.createElement("div",{className:"speech-result"},l.a.createElement("h3",null,"Speech-to-Text Result"),l.a.createElement("p",null,w)),l.a.createElement("div",{className:"button-container"},l.a.createElement("button",{className:"button enter-button",onClick:()=>{const e=b(C,je);if(j(e),"speech"===M)$?(Te(),a(e=>({...e,[o]:{...e[o],speechResult:w}})),alert("Recording stopped and entry saved successfully!")):(Ae(),alert("Recording started..."));else{const e=b(C,je);j(e),a(t=>({...t,[o]:{description:y,mood:C,imageUrl:e,speechResult:w}})),alert("Entry saved successfully!")}}},"Enter"),l.a.createElement("button",{className:"button clear-button",onClick:()=>{"typing"===M?S(""):"speech"===M&&N("")}},"Clear"),l.a.createElement("button",{className:"button customize-playlist-button",onClick:()=>le(!0)},"Music"),l.a.createElement("button",{className:"button customize-image-button",onClick:()=>ue(!0)},"Image")),l.a.createElement(f,{isOpen:ne,onClose:()=>le(!1),onSave:(e,t)=>{"Background Music"===e?(we(t),localStorage.setItem("backgroundMusic",t)):(Ie(a=>({...a,[e]:t})),localStorage.setItem("customPlaylists",JSON.stringify({...Fe,[e]:t}))),le(!1),re("")},selectedMoodForPlaylist:oe,setSelectedMoodForPlaylist:se,youtubeLink:ce,setYoutubeLink:re}),l.a.createElement("div",{className:"image-display"},k?l.a.createElement("img",{src:k,alt:"Mood",className:"generated-image"}):l.a.createElement("div",{className:"placeholder"},"Your image will appear here")),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-emojis"},d.map((e,t)=>l.a.createElement("span",{key:t,className:"mood-emoji"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:C,className:"mood-slider",onChange:a=>(a=>{if(O(a),a>=34&&a<=50||a>=51&&a<=67){const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});a.length>0?(ae(a),ee(!0)):ee(!1)}else ee(!1)})(Number(a.target.value))})),I&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("h3",null,"Suggested Playlist:"),l.a.createElement("a",{href:I.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${E(I.playlistUrl)}/hqdefault.jpg`,alt:I.title+" playlist",className:"music-thumbnail"}))),l.a.createElement("div",{className:"mood-analysis"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(A).map((e,t)=>l.a.createElement("li",{key:e},m[t]," ",d[t],": ",A[e])))),l.a.createElement(r,{isOpen:D,onClose:()=>P(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),l.a.createElement(i,{isOpen:J,onClose:()=>U(!1),canvasRef:V,handleCanvasMouseDown:e=>{const t=V.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),_.current=!0}},handleCanvasMouseMove:e=>{if(!_.current)return;const t=V.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),a.stroke()}},handleCanvasMouseUp:()=>{_.current=!1},saveDrawing:()=>{const e=V.current;if(e){const t=e.toDataURL();L(t),a(e=>({...e,[o]:{...e[o],drawing:t}})),alert("Drawing saved successfully!")}},reimagineDrawing:()=>{const e=V.current;if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}L(null),a(e=>({...e,[o]:{...e[o],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:H}),Z&&l.a.createElement(u,{isOpen:Z,onClose:()=>ee(!1),happyDays:te,onSelectDate:e=>{s(e),ee(!1)}}),l.a.createElement(h,{isOpen:ie,onClose:()=>{ye(null),ue(!1)},onSave:(e,t)=>{if(t){Me(a=>({...a,[e]:[...a[e]||[],t]}));try{const a={...je,[e]:[...je[e]||[],t]};localStorage.setItem("customMoodImages",JSON.stringify(a))}catch(a){return console.error("Error saving image to localStorage:",a),void alert("An error occurred while saving the image. Please try again.")}ye(null),ue(!1),alert(`Image for mood "${e}" saved successfully!`)}else alert("No image selected. Please upload an image before saving.")},onRemoveImage:e=>{ve(e),be(!0),localStorage.setItem("customMoodImages",JSON.stringify({...je,[e]:null}))},onResetToDefault:()=>{window.confirm("Are you sure you want to reset all custom images?")&&(Me({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),localStorage.removeItem("customMoodImages"))},selectedMoodForImage:me,setSelectedMoodForImage:de,uploadedImage:fe,setUploadedImage:ye,selectedMoodForPlaylist:oe,setSelectedMoodForPlaylist:se}),he&&l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h3",null,"Select Image to Remove for ",Ee),l.a.createElement("div",{className:"image-grid"},[...je[Ee]||[],...Array.from({length:p[Ee]||0},(e,t)=>`/Moodify-Journal/${g[Ee]}/image${t+1}.jpg`)].map((e,t)=>l.a.createElement("div",{key:t,className:"image-item"},l.a.createElement("img",{src:e,alt:"Image "+(t+1)}),l.a.createElement("button",{className:"remove-btn",onClick:()=>((e,t)=>{const a=je[e]||[];if(t<a.length){const n=a.filter((e,a)=>a!==t);Me(t=>({...t,[e]:n})),localStorage.setItem("customMoodImages",JSON.stringify({...je,[e]:n}))}else alert("Hardcoded images cannot be removed dynamically!")})(Ee,t)},"Remove")))),l.a.createElement("button",{className:"button cancel-button",onClick:()=>be(!1)},"Cancel"))),l.a.createElement("div",{className:"top-right-controls"},l.a.createElement("button",{onClick:()=>{Oe&&(Ne?Oe.pauseVideo():Oe.playVideo(),Ce(!Ne))},className:"music-toggle-button"},Ne?l.a.createElement("span",null,"\ud83c\udfb5 Pause Music"):l.a.createElement("span",null,"\ud83c\udfb6 Play Music"))),l.a.createElement("div",{id:"background-music-player"}))};var S=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,18)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:o,getTTFB:s}=t;a(e),n(e),l(e),o(e),s(e)})};s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(y,null)),document.getElementById("root")),S()}],[[4,1,2]]]);
//# sourceMappingURL=main.62bdc5b6.chunk.js.map