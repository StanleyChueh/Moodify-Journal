(this["webpackJsonpdiary-image-app"]=this["webpackJsonpdiary-image-app"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a.p+"static/media/cat.8909de12.gif"},function(e,t,a){e.exports=a.p+"static/media/spongebob-patrick-star.9eee1025.gif"},function(e,t,a){e.exports=a(19)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(3),s=a.n(o),c=(a(14),a(1));a(15),a(16);var r=function(e){let{isOpen:t,onClose:a,message:n,link:o}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Time to Get Some Help!"),l.a.createElement("p",{className:"modal-message"},n),l.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"modal-link"},"Visit a Psychiatrist"),l.a.createElement("button",{className:"modal-close-button",onClick:a},"Close"))):null};a(17);var i=function(e){let{isOpen:t,onClose:a,canvasRef:o,handleCanvasMouseDown:s,handleCanvasMouseMove:c,handleCanvasMouseUp:r,saveDrawing:i,reimagineDrawing:m,savedDrawing:u}=e;const[d,g]=Object(n.useState)("#000000");return Object(n.useEffect)(()=>{const e=o.current;if(e&&u){const t=e.getContext("2d"),a=new Image;a.src=u,a.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(a,0,0,e.width,e.height)}}else if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},[t,u]),l.a.createElement("div",{className:"drawing-overlay "+(t?"active":"")},l.a.createElement("div",{className:"drawing-modal-content"},l.a.createElement("div",{className:"modal-decoration"})," ",l.a.createElement("h2",null,"Draw Your Mood"),l.a.createElement("canvas",{ref:o,className:"drawing-canvas",width:"700",height:"700",onMouseDown:s,onMouseMove:c,onMouseUp:r}),l.a.createElement("div",{className:"color-palette"},l.a.createElement("h3",null,"Select Color:"),["#000000","#FF0000","#00FF00","#0000FF","#FFFF00","#FFA500","#800080","#00FFFF","#FFC0CB","#8B4513"].map((e,t)=>l.a.createElement("button",{key:t,style:{backgroundColor:e,width:"30px",height:"30px",margin:"2px",border:d===e?"2px solid #000":"1px solid #ccc",cursor:"pointer",borderRadius:"50%"},onClick:()=>(e=>{g(e);const t=o.current;if(t){t.getContext("2d").strokeStyle=e}})(e)}))),l.a.createElement("div",{className:"drawing-buttons"},l.a.createElement("button",{onClick:i},"Save"),l.a.createElement("button",{onClick:m},"Re-imagine"),l.a.createElement("button",{onClick:a},"Close"))))};a(18);var m=function(e){let{isOpen:t,onClose:a,happyDays:n,onSelectDate:o}=e;return t&&0!==n.length?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h2",{className:"modal-title"},"Cheer up ",l.a.createElement("span",{role:"img","aria-label":"hands"},"\ud83d\ude4c")),l.a.createElement("p",{className:"modal-message"},'"We all have tough days. Here\'s a happy memory to brighten your day!"'),l.a.createElement("div",{className:"memory-list"},n.map(e=>l.a.createElement("button",{key:e,className:"memory-button",onClick:()=>o(e)},e))),l.a.createElement("button",{className:"close-button",onClick:a},"Close"))):null},u=a(4),d=a.n(u),g=a(5),p=a.n(g);const h=["Anger","Neutral","Fear","Sadness","Surprise","Happiness"],b=["\ud83d\ude20","\ud83d\ude10","\ud83d\ude28","\ud83d\ude22","\ud83d\ude32","\ud83d\ude0a"],E={Anger:"images/Anger",Neutral:"images/Neutral",Fear:"images/Fear",Sadness:"images/Sadness",Surprise:"images/Surprise",Happiness:"images/Happiness"},v={Anger:10,Neutral:3,Fear:8,Sadness:20,Surprise:8,Happiness:11};function y(e){let{isOpen:t,onClose:a,onSave:n,onRemoveImage:o,onResetToDefault:s,selectedMoodForImage:c,setSelectedMoodForImage:r,uploadedImage:i,setUploadedImage:m,selectedMoodForPlaylist:u,setSelectedMoodForPlaylist:d}=e;return t?l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"image-upload-modal yellow-theme"},l.a.createElement("h3",null,"Upload Image for Mood"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:c,onChange:e=>r(e.target.value)},h.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("input",{type:"file",accept:"image/*",onChange:e=>{const t=e.target.files[0];if(t){const e=new FileReader;e.onload=()=>{m(e.result)},e.readAsDataURL(t)}}}),i&&l.a.createElement("div",{className:"uploaded-preview"},l.a.createElement("img",{src:i,alt:"Uploaded preview"})),l.a.createElement("div",{className:"modal-buttons"},l.a.createElement("button",{className:"button save-button",onClick:()=>n(c,i)},"Save"),l.a.createElement("button",{className:"button remove-button",onClick:()=>o(c)},"Remove"),l.a.createElement("button",{className:"button reset-button",onClick:s},"Default"),l.a.createElement("button",{className:"button cancel-button",onClick:a},"Cancel")))):null}function f(e){const t=e.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:null}function S(){return h.reduce((e,t)=>(e[t]=0,e),{})}function w(e){let{isOpen:t,onClose:a,onSave:n,selectedMoodForPlaylist:o,setSelectedMoodForPlaylist:s,youtubeLink:c,setYoutubeLink:r}=e;return t?l.a.createElement("div",{className:"playlist-modal"},l.a.createElement("h3",null,"Customize Playlist"),l.a.createElement("label",null,"Select Option:",l.a.createElement("select",{value:o,onChange:e=>s(e.target.value)},l.a.createElement("option",{value:"Background Music"},"Background Music")," ",h.map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("label",null,"YouTube Link:",l.a.createElement("input",{type:"url",placeholder:"Paste YouTube link here",value:c,onChange:e=>r(e.target.value)})),l.a.createElement("button",{onClick:()=>n(o,c)},"Save"),l.a.createElement("button",{onClick:a},"Cancel")):null}var N=function(){const e=function(){const e=new Date,t=[];for(let a=0;a<=30;a++){const n=new Date(e);n.setDate(e.getDate()-a);const l=n.toISOString().split("T")[0];t.push(l)}return t}(),[t,a]=Object(n.useState)(function(e){return e.reduce((e,t)=>(e[t]={description:"",mood:25,imageUrl:null},e),{})}(e)),[o,s]=Object(n.useState)(e[0]),[u,g]=Object(n.useState)(t[e[0]].description),[N,C]=Object(n.useState)(t[e[0]].speechResult),[O,k]=Object(n.useState)(25),[j,M]=Object(n.useState)(t[e[0]].imageUrl),[F,I]=Object(n.useState)("typing"),[R,D]=Object(n.useState)(null),[P,A]=Object(n.useState)(!1),[T,x]=Object(n.useState)(S()),[H,U]=Object(n.useState)(null),[J,B]=Object(n.useState)(!1),[L,Y]=Object(n.useState)(t[o].drawing||null),Q=Object(n.useRef)(null),q=Object(n.useRef)(null),V=Object(n.useRef)(!1),[_,z]=Object(n.useState)(!1),[G,W]=Object(n.useState)(!1),[$,K]=Object(n.useState)([]),[X,Z]=Object(n.useState)(!1),[ee,te]=Object(n.useState)(!1),[ae,ne]=Object(n.useState)([]),[le,oe]=Object(n.useState)(!1),[se,ce]=Object(n.useState)("Anger"),[re,ie]=Object(n.useState)(""),[me,ue]=Object(n.useState)(!1),[de,ge]=Object(n.useState)("Anger"),[pe,he]=Object(n.useState)(!1),[be,Ee]=Object(n.useState)(!1),[ve,ye]=Object(n.useState)("Anger"),[fe,Se]=Object(n.useState)(null),[we,Ne]=Object(n.useState)("https://youtu.be/CFGLoQIhmow?si=SQ5DQVCCAmKdOt3K"),[Ce,Oe]=Object(n.useState)(!1),[ke,je]=Object(n.useState)(!1),[Me,Fe]=Object(n.useState)(!1),[Ie,Re]=Object(n.useState)(null),[De,Pe]=Object(n.useState)(!1),[Ae,Te]=Object(n.useState)(0),[xe,He]=Object(n.useState)(!1),[Ue,Je]=Object(n.useState)(new Set),[Be,Le]=Object(n.useState)(null),[Ye,Qe]=Object(n.useState)(!1),[qe,Ve]=Object(n.useState)(!1),[_e,ze]=Object(n.useState)({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),[Ge,We]=Object(n.useState)(!1),[$e,Ke]=Object(n.useState)(!1),[Xe,Ze]=Object(n.useState)({Anger:"",Neutral:"",Fear:"",Sadness:"",Surprise:"",Happiness:""}),et=(Object(n.useCallback)(()=>{const a=e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85});ne(a)},[e,t]),e=>{W(!1),nt(e)});Object(n.useEffect)(()=>{(O>=34&&O<=50||O>=51&&O<=67)&&ot()},[O]);const tt=Object(n.useCallback)(()=>{const a=e.slice(0,14),n=S();let l=0,o=0;a.forEach(e=>{const a=t[e];if(a&&null!==a.mood){const e=Math.floor(a.mood/(100/h.length)),t=h[e];t&&(n[t]+=1,"Sadness"===t?l+=1:"Fear"===t&&(o+=1))}}),x(n);const s=new Date,c=H?Math.floor((s-H)/864e5):8;(l>7||o>7)&&c>=7&&(A(!0),U(new Date))},[e,t,H]);Object(n.useEffect)(()=>{const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=()=>{new window.YT.Player("background-music-player",{height:"0",width:"0",videoId:f(we),events:{onReady:e=>Le(e.target)}})},Be&&we&&Be.loadVideoById(f(we))},[we,Be]),Object(n.useEffect)(()=>{const e=localStorage.getItem("backgroundMusic");e&&Ne(e)},[]),Object(n.useEffect)(()=>{tt()},[t,tt]),Object(n.useEffect)(()=>{const e=Math.min(Math.floor(O/100*h.length),h.length-1),t=h[e]||"Neutral",a=Xe[t]||{Anger:"https://youtu.be/FLTchCiC0T0?si=_LEx70RIBrG3HC_Z",Neutral:"https://youtu.be/pTweN7F2PFA?si=5v6Ney7A9MTtJ086",Fear:"https://www.youtube.com/watch?v=0qanF-91aJo",Sadness:"https://youtu.be/FFlPgTPvRJc?si=9SzqK2Vf7KaeAsFk",Surprise:"https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s",Happiness:"https://www.youtube.com/watch?v=ZbZSe6N_BXs"}[t];D({title:t+" Playlist",playlistUrl:a})},[O,Xe]),Object(n.useEffect)(()=>{const e=localStorage.getItem("customMoodImages");e&&ze(JSON.parse(e))},[]),Object(n.useEffect)(()=>{me||Se(null)},[me]),Object(n.useEffect)(()=>{localStorage.setItem("diaryEntries",JSON.stringify(t))},[t]),Object(n.useEffect)(()=>{localStorage.setItem("moodAnalysis",JSON.stringify(T))},[T]),Object(n.useEffect)(()=>{localStorage.setItem("customPlaylists",JSON.stringify(Xe))},[Xe]),Object(n.useEffect)(()=>{const e=localStorage.getItem("diaryEntries");e&&a(JSON.parse(e));const t=localStorage.getItem("moodAnalysis");t&&x(JSON.parse(t));const n=localStorage.getItem("customPlaylists");n&&Ze(JSON.parse(n))},[]),Object(n.useEffect)(()=>{const e=document.querySelector(".cat"),t=()=>{e.style.animationDuration=3*Math.random()+3+"s"};return e.addEventListener("animationiteration",t),()=>{e.removeEventListener("animationiteration",t)}},[]),Object(n.useEffect)(()=>{localStorage.setItem("selectedDate",o)},[o]),Object(n.useEffect)(()=>{const e=localStorage.getItem("selectedDate");e&&s(e)},[]);const at=e=>{I(e),_&&lt(),I(e),"speech"===e&&W(!0),I(e),"speech"===e?W(!0):lt(),B("draw"===e)},nt=e=>{if(!("webkitSpeechRecognition"in window))return void alert("Speech recognition is not supported in this browser.");const t=new window.webkitSpeechRecognition;t.lang=e,t.interimResults=!1,t.continuous=!0,Q.current=t;let a="";t.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;a++){const n=e.results[a];n.isFinal&&(t+=n[0].transcript.trim())}t&&t!==a&&(C(e=>e+" "+t),a=t)},t.onerror=e=>{console.error("Speech recognition error:",e.error)},t.start(),z(!0)},lt=()=>{Q.current&&(Q.current.stop(),z(!1))},ot=()=>{e.slice(0,14).filter(e=>{const a=t[e];return a&&a.mood>=85}).length>0&&Z(!0)};Object(n.useEffect)(()=>{O<51&&ot()},[O]);const st=(()=>{const[e,t]=Object(n.useState)({width:window.innerWidth,height:window.innerHeight});return Object(n.useEffect)(()=>{const e=()=>{t({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),e})();return l.a.createElement("div",{className:"app-layout"},l.a.createElement("button",{className:"toggle-menu",onClick:()=>{We(!Ge)}},l.a.createElement(c.a,null)),l.a.createElement("div",{className:"sidebar "+(Ge?"open":"")},l.a.createElement("h2",{className:"sidebar-title"},"Diary AI"),l.a.createElement("div",{className:"diary-list-container"},l.a.createElement("ul",{className:"diary-list"},e.map((e,n)=>l.a.createElement("li",{key:e,className:"diary-item "+(e===o?"active":""),onClick:()=>{(e=>{var n,l,c,r,i;a(e=>({...e,[o]:{...e[o],description:u,mood:O,imageUrl:j,drawing:L,speechResult:N}})),s(e),g((null===(n=t[e])||void 0===n?void 0:n.description)||""),k((null===(l=t[e])||void 0===l?void 0:l.mood)||25),M((null===(c=t[e])||void 0===c?void 0:c.imageUrl)||null),Y((null===(r=t[e])||void 0===r?void 0:r.drawing)||null),C((null===(i=t[e])||void 0===i?void 0:i.speechResult)||"")})(e),We(!1)}},0===n?"Today":e))))),l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",{className:"main-title"},o,"'s Mood"),l.a.createElement("div",{className:"input-icons"},l.a.createElement(c.b,{className:"input-icon "+("typing"===F?"active":""),title:"Type",onClick:()=>at("typing")}),l.a.createElement(c.c,{className:"input-icon "+("speech"===F?"active":""),title:"Voice to Text",onClick:()=>at("speech")}),l.a.createElement(c.d,{className:"input-icon "+("draw"===F?"active":""),title:"Draw",onClick:()=>{at("draw"),B(!0)}})),G&&l.a.createElement("div",{className:"language-modal"},l.a.createElement("h3",null,"Choose Language for Speech-to-Text"),l.a.createElement("button",{onClick:()=>et("en-US")},"English"),l.a.createElement("button",{onClick:()=>et("zh-TW")},"Taiwanese")),"typing"===F&&l.a.createElement("textarea",{className:"description-input",value:u,onChange:e=>g(e.target.value),placeholder:"How's your day?"}),"speech"===F&&l.a.createElement("textarea",{className:"description-input",value:N,readOnly:!0,placeholder:"Speech-to-text result..."}),l.a.createElement("div",{className:"button-container"},l.a.createElement("button",{className:"button enter-button",onClick:()=>{Ue.has(o)?alert("You have already checked your point for this day!"):(Te(e=>{const t=e+1;return t%6===0?(setTimeout(()=>{Pe(!0)}),0):t}),Je(e=>new Set(e).add(o)),He(!0));const e=function(e,t){const a=Math.min(Math.floor(e/100*h.length),h.length-1),n=h[a];console.log("Mood label:",n);const l=[...t[n]||[],...Array.from({length:v[n]||0},(e,t)=>`/Moodify-Journal/${E[n]}/image${t+1}.jpg`)];if(console.log("Available images:",l),0===l.length)return null;const o=l[Math.floor(Math.random()*l.length)];return console.log("Selected image:",o),o}(O,_e);M(e),Re(e),Fe(!0),"speech"===F?_?(lt(),a(e=>({...e,[o]:{...e[o],speechResult:N}})),alert("Recording stopped and entry saved successfully!")):(nt(),alert("Recording started...")):a(t=>({...t,[o]:{description:u,mood:O,imageUrl:e,speechResult:N}}))}},"Enter"),l.a.createElement("button",{className:"button clear-button",onClick:()=>{"typing"===F?g(""):"speech"===F&&C("")}},"Clear"),l.a.createElement("button",{className:"button customize-playlist-button",onClick:()=>oe(!0)},"Music"),l.a.createElement("button",{className:"button customize-image-button",onClick:()=>ue(!0)},"Image")),st.width<=768&&l.a.createElement("div",{className:"mobile-controls"},l.a.createElement("div",{className:"button-row"},l.a.createElement("button",{className:"button mood-analysis-button",onClick:()=>Qe(!0)},"Past Mood Analysis"),l.a.createElement("button",{className:"button play-music-button",onClick:()=>{Be&&($e?Be.pauseVideo():Be.playVideo(),Ke(!$e))}},$e?"Pause Music":"Background Music")),Ye&&l.a.createElement("div",{className:"mood-analysis-modal"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(T).map((e,t)=>l.a.createElement("li",{key:e},h[t]," ",b[t],": ",T[e]))),l.a.createElement("button",{className:"close-modal",onClick:()=>Qe(!1)},"Close")))),l.a.createElement(w,{isOpen:le,onClose:()=>oe(!1),onSave:(e,t)=>{"Background Music"===e?(Ne(t),localStorage.setItem("backgroundMusic",t)):(Ze(a=>({...a,[e]:t})),localStorage.setItem("customPlaylists",JSON.stringify({...Xe,[e]:t}))),oe(!1),ie("")},selectedMoodForPlaylist:se,setSelectedMoodForPlaylist:ce,youtubeLink:re,setYoutubeLink:ie}),l.a.createElement("div",{className:"mood-slider-container"},l.a.createElement("div",{className:"mood-emojis"},b.map((e,t)=>l.a.createElement("span",{key:t,className:"mood-emoji"},e))),l.a.createElement("input",{type:"range",min:"0",max:"100",value:O,className:"mood-slider",onChange:n=>(n=>{if(k(e=>100===n&&100===e?99.9:n),a(e=>({...e,[o]:{...e[o],mood:n}})),n>=34&&n<=50||n>=51&&n<=67){const a=e.slice(0,14).sort((e,t)=>new Date(t)-new Date(e)).filter(e=>{const a=t[e];return a&&a.mood>=85});a.length>0?(ne(a),te(!0)):te(!1)}else te(!1)})(Number(n.target.value))})),R&&l.a.createElement("div",{className:"music-suggestion"},l.a.createElement("a",{href:R.playlistUrl,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("img",{src:`https://img.youtube.com/vi/${f(R.playlistUrl)}/hqdefault.jpg`,alt:R.title+" playlist",className:"music-thumbnail"}))),st.width>768&&l.a.createElement("div",{className:"desktop-mood-analysis"},l.a.createElement("div",{className:"mood-analysis"},l.a.createElement("h3",null,"Past 14 Days Mood Analysis"),l.a.createElement("ul",null,Object.keys(T).map((e,t)=>l.a.createElement("li",{key:e},h[t]," ",b[t],": ",T[e]))))),l.a.createElement(r,{isOpen:P,onClose:()=>A(!1),message:"It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist.",link:"https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"})),l.a.createElement(i,{isOpen:J,onClose:()=>B(!1),canvasRef:q,handleCanvasMouseDown:e=>{const t=q.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.beginPath(),a.moveTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),V.current=!0}},handleCanvasMouseMove:e=>{if(!V.current)return;const t=q.current;if(t){const a=t.getContext("2d"),n=t.getBoundingClientRect(),l=t.width/n.width,o=t.height/n.height;a.lineTo((e.clientX-n.left)*l,(e.clientY-n.top)*o),a.stroke()}},handleCanvasMouseUp:()=>{V.current=!1},saveDrawing:()=>{const e=q.current;if(e){const t=e.toDataURL();Y(t),a(e=>({...e,[o]:{...e[o],drawing:t}})),alert("Drawing saved successfully!")}},reimagineDrawing:()=>{const e=q.current;if(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}Y(null),a(e=>({...e,[o]:{...e[o],drawing:null}})),alert("The drawing has been cleared for re-imagining!")},savedDrawing:L}),ee&&l.a.createElement(m,{isOpen:ee,onClose:()=>te(!1),happyDays:ae,onSelectDate:e=>{a(e=>({...e,[o]:{...e[o],description:u,mood:O,imageUrl:j,drawing:L,speechResult:N}})),s(e);const n=t[e];g((null===n||void 0===n?void 0:n.description)||""),k((null===n||void 0===n?void 0:n.mood)||25),M((null===n||void 0===n?void 0:n.imageUrl)||null),Y((null===n||void 0===n?void 0:n.drawing)||null),C((null===n||void 0===n?void 0:n.speechResult)||""),te(!1)}}),l.a.createElement(y,{isOpen:me,onClose:()=>{Se(null),ue(!1)},onSave:(e,t)=>{if(t){ze(a=>({...a,[e]:[...a[e]||[],t]}));try{const a={..._e,[e]:[..._e[e]||[],t]};localStorage.setItem("customMoodImages",JSON.stringify(a))}catch(a){return console.error("Error saving image to localStorage:",a),void alert("An error occurred while saving the image. Please try again.")}Se(null),ue(!1),alert(`Image for mood "${e}" saved successfully!`)}else alert("No image selected. Please upload an image before saving.")},onRemoveImage:e=>{ye(e),Ee(!0),localStorage.setItem("customMoodImages",JSON.stringify({..._e,[e]:null}))},onResetToDefault:()=>{window.confirm("Are you sure you want to reset all custom images?")&&(ze({Anger:[],Neutral:[],Fear:[],Sadness:[],Surprise:[],Happiness:[]}),localStorage.removeItem("customMoodImages"))},selectedMoodForImage:de,setSelectedMoodForImage:ge,uploadedImage:fe,setUploadedImage:Se,selectedMoodForPlaylist:se,setSelectedMoodForPlaylist:ce}),be&&l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("h3",null,"Select Image to Remove for ",ve),l.a.createElement("div",{className:"image-grid"},[..._e[ve]||[],...Array.from({length:v[ve]||0},(e,t)=>`/Moodify-Journal/${E[ve]}/image${t+1}.jpg`)].map((e,t)=>l.a.createElement("div",{key:t,className:"image-item"},l.a.createElement("img",{src:e,alt:"Image "+(t+1)}),l.a.createElement("button",{className:"remove-btn",onClick:()=>((e,t)=>{const a=_e[e]||[];if(t<a.length){const n=a.filter((e,a)=>a!==t);ze(t=>({...t,[e]:n})),localStorage.setItem("customMoodImages",JSON.stringify({..._e,[e]:n}))}else alert("Hardcoded images cannot be removed dynamically!")})(ve,t)},"Remove")))),l.a.createElement("button",{className:"button cancel-button",onClick:()=>Ee(!1)},"Cancel"))),l.a.createElement("div",{className:"top-right-controls"},st.width>768&&l.a.createElement("button",{onClick:()=>{Be&&(Ce?Be.pauseVideo():Be.playVideo(),Oe(!Ce))},className:"music-toggle-button"},Ce?l.a.createElement("span",null," Pause Music"):l.a.createElement("span",null,"\ud83c\udfb6 Play Music"))),l.a.createElement("div",{id:"background-music-player"}),l.a.createElement("div",{className:"cat-animation",onClick:()=>{je(!0)}},l.a.createElement("img",{src:d.a,alt:"Running Cat",className:"cat"})),ke&&l.a.createElement("div",{className:"modal-overlay"},l.a.createElement("div",{className:"faq-modal"},l.a.createElement("h3",null,"Frequently Asked Questions"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("span",null,"Q1: What is this app about?"),l.a.createElement("p",null,"This app allows users to document their daily moods, add visual elements like drawings or images, and listen to mood-specific playlists.")),l.a.createElement("li",null,l.a.createElement("span",null,"Q2: How do I record my mood?"),l.a.createElement("p",null,"You can type in your diary entry, use voice-to-text functionality, or upload a drawing to reflect your mood.")),l.a.createElement("li",null,l.a.createElement("span",null,"Q3: How do I customize playlists?"),l.a.createElement("p",null,'Use the "Music" button to add a YouTube link for a mood-specific playlist or background music.')),l.a.createElement("li",null,l.a.createElement("span",null,"Q4: How do I save images for moods?"),l.a.createElement("p",null,'Use the "Image" button to upload and save custom images for each mood.')),l.a.createElement("li",null,l.a.createElement("span",null,"Q5: How do I switch between input modes?"),l.a.createElement("p",null,"Click the icons at the top (keyboard, microphone, or pen) to type, speak, or draw your mood.")),l.a.createElement("li",null,l.a.createElement("span",null,"Q6: What happens when I click the cat GIF?"),l.a.createElement("p",null,"Clicking the cat opens this FAQ to help you better understand how to use the app."))),l.a.createElement("hr",{className:"faq-divider"}),l.a.createElement("div",{className:"author-info"},l.a.createElement("h4",null,"About the Author"),l.a.createElement("p",null,"Created by: ",l.a.createElement("strong",null,"Stanley Chueh")),l.a.createElement("p",null,"Email: ",l.a.createElement("a",{href:"mailto:stanleychueh28@gmail.com"},"stanleychueh28@gmail.com")),l.a.createElement("p",null,"For more information, visit my"," ",l.a.createElement("a",{href:"https://github.com/StanleyChueh/Moodify-Journal",target:"_blank",rel:"noopener noreferrer"},"GitHub Repository"),".")),l.a.createElement("div",{className:"report-issue"},l.a.createElement("h4",null,"Report an Issue"),l.a.createElement("p",null,"Found a problem? Please let me know by submitting an issue on my"," ",l.a.createElement("a",{href:"https://github.com/StanleyChueh/Moodify-Journal/issues",target:"_blank",rel:"noopener noreferrer"},"GitHub Issues Page"),".")),l.a.createElement("button",{className:"cancel-button",onClick:()=>{je(!1)}},"Close"))),Me&&l.a.createElement("div",{className:"popup"},l.a.createElement("div",{className:"popup-content"},Ie?l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{src:Ie,alt:"Mood Representation",className:"generated-image"})):l.a.createElement("p",null,"No image available for this mood"),l.a.createElement("div",{className:"point-card"},l.a.createElement("h4",null,"Points Earned"),l.a.createElement("p",null,"You have earned ",l.a.createElement("strong",null,"1 point")," for today's entry!"),l.a.createElement("p",null,"Total Points: ",l.a.createElement("strong",null,Ae)),5===Ae&&l.a.createElement("div",{className:"reward-message"},l.a.createElement("h4",null,"\ud83c\udf89 Congratulations! \ud83c\udf89"),l.a.createElement("p",null,"You\u2019ve reached 5 points!"),l.a.createElement("img",{src:p.a,alt:"Reward",className:"reward-gif"}))),l.a.createElement("button",{className:"button cancel-button",onClick:()=>Fe(!1)},"Close"))))};var C=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,20)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:o,getTTFB:s}=t;a(e),n(e),l(e),o(e),s(e)})};s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(N,null)),document.getElementById("root")),C()}],[[6,1,2]]]);
//# sourceMappingURL=main.4d9f3543.chunk.js.map