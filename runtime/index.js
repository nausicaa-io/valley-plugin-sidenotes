var pt="valley";var Gr=`.${pt}`,qr=`app.${pt}`;var W=`.${pt}`,In="plugins",gt=`${W}/${In}`,Pn="external",Yr=`${gt}/${Pn}`,Jr=`${gt}/data`;var Qr=`${gt}/plugin.json`,ei=`${gt}/config.json`,Jt=`${W}/state`,ke=`${W}/settings`,mt=`${W}/app`,ht=`${W}/accounts`,ti=`${ht}/providers`,oi=`${ht}/providers.lock.json`,ni=`${W}/trash`,Ot=`${W}/cache`,ri=`${Ot}/accounts`,_n=`${Ot}/search`,ii=`${Ot}/providers`;var ai=`${mt}/logs`,si=`${mt}/whats-new`,di=`${mt}/setup.json`,ci=`${_n}/index.jsonl`,li=`${Jt}/journal`,ui=`${Jt}/txjournal`;var ft="design";var pi={app:`${mt}/app.json`,appearance:`${W}/${ft}/appearance.json`,pallette:`${W}/${ft}/pallette.json`,group:`${W}/${ft}/group.json`,metadata:`${ke}/metadata.json`,notification:`${ke}/notification.json`,preferences:`${ke}/preferences.json`,markdown:`${ke}/markdown.json`,files:`${ke}/files.json`,search:`${ke}/search.json`,design:`${W}/${ft}/appearance.json`,accounts:`${ht}/accounts.json`},fi=`${ht}/secrets.json`;var hi=[W,`${W}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Mn=new Map;function M(e,t,n,i,r,a,s,l,f="owner"){let h=Object.freeze({id:e,kind:t,version:n,cardinality:i,validate:r,identities:a,identityScope:f,serviceCalls:s,serviceMetadata:l});return Mn.set(`${t}:${e}@${n}`,h),h}var v=e=>!!e&&typeof e=="object"&&!Array.isArray(e),_=(e,t)=>typeof e[t]=="function",ye=e=>e===void 0,Ae=e=>typeof e=="boolean",y=e=>typeof e=="string",j=e=>e===void 0||y(e),Fn=e=>e===void 0||typeof e=="number",On=e=>e===void 0||typeof e=="boolean",E=(e,t)=>e.length===t.length&&t.every((n,i)=>n(e[i])),R=e=>v(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Qt=e=>v(e),Ln=e=>v(e)&&y(e.id)&&y(e.title)&&y(e.date)&&(e.documentRef===void 0||v(e.documentRef)&&y(e.documentRef.pluginId)&&y(e.documentRef.sourceId)&&y(e.documentRef.itemId)),Rn=e=>v(e)&&y(e.date)&&j(e.startTime)&&j(e.endTime)&&j(e.sourceId)&&j(e.itemId),$n=e=>v(e)&&y(e.url)&&j(e.title)&&On(e.newTab),zn=e=>v(e)&&y(e.query),to=e=>v(e)&&y(e.name)&&j(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),jn=e=>Array.isArray(e)&&e.every(to),Vn=e=>e===null||to(e),Un=e=>e===void 0||v(e)&&j(e.approvalToken)&&(e.cancellation===void 0||v(e.cancellation)),Wn=e=>typeof e=="string"||v(e)&&typeof e.text=="string",Hn=e=>v(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&v(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&j(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),oo=e=>v(e)&&y(e.id)&&y(e.label)&&j(e.labelKey)&&j(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(oo)),Kn={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ln)},create:{args:e=>E(e,[y,Qt]),result:Ae},update:{args:e=>E(e,[y,Qt]),result:Ae},remove:{args:e=>E(e,[y]),result:Ae},open:{args:e=>E(e,[y]),result:ye},configure:{args:e=>e.length===0,result:ye},actions:{args:e=>E(e,[y]),result:e=>Array.isArray(e)&&e.every(oo)},runAction:{args:e=>E(e,[y,y]),result:Ae}},Bn=e=>v(e)&&y(e.name)&&y(e.version)&&j(e.description)&&j(e.author)&&(e.localized===void 0||v(e.localized)&&Object.values(e.localized).every(t=>v(t)&&y(t.name)&&j(t.description))),_i=M("calendar.itemSource","service","1.3.0","many",e=>v(e)&&_(e,"list")&&(e.integration===void 0||Bn(e.integration)),void 0,Kn,e=>e.integration),Di=M("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Mi=M("calendar.navigator","service","1.0.0","one",e=>v(e)&&_(e,"openDate"),void 0,{openDate:{args:e=>E(e,[Rn]),result:ye}}),Fi=M("calendar.panelSelection","state","1.0.0","one",e=>v(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Lt=M("web.activeContext","state","1.0.0","one",e=>v(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function eo(e){return v(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>v(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Oi=M("contacts.directory","service","1.0.0","one",e=>v(e)&&["search","resolveEmails","open"].every(t=>_(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(eo)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>v(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(eo))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||v(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:ye}}),Li=M("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),se=M("web.navigator","service","1.0.0","one",e=>v(e)&&_(e,"open"),void 0,{open:{args:e=>E(e,[$n]),result:ye}}),no=M("selection.textAction","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&_(e,"run"),e=>[e.id]),Ri=M("geo.navigator","service","1.0.0","one",e=>v(e)&&_(e,"open"),void 0,{open:{args:e=>E(e,[zn]),result:ye}}),$i=M("geo.search","service","1.0.0","one",e=>v(e)&&_(e,"search")&&_(e,"reverse"),void 0,{search:{args:e=>E(e,[y]),result:jn},reverse:{args:e=>E(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Vn}}),zi=M("agent.toolProvider","service","1.0.0","many",e=>v(e)&&Array.isArray(e.tools)&&e.tools.every(Hn)&&_(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>E(e,[y,v,Un]),result:Wn}},e=>({tools:e.tools}),"global"),ji=M("guard.runtime","service","1.0.0","one",e=>v(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>_(e,t)),void 0,{resolve:{args:e=>E(e,[v]),result:v},requestApproval:{args:e=>E(e,[v]),result:Ae},consumeToken:{args:e=>e.length>=1&&e.length<=2&&y(e[0])&&j(e[1]),result:Ae},audit:{args:e=>E(e,[v]),result:ye}}),Vi=M("browser.automation","service","1.0.0","one",e=>v(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>_(e,t)),void 0,{list:{args:e=>e.length===0,result:R},open:{args:e=>E(e,[y]),result:R},switch:{args:e=>E(e,[y]),result:R},close:{args:e=>E(e,[y]),result:R},snapshot:{args:e=>E(e,[y]),result:R},readText:{args:e=>e.length>=1&&e.length<=2&&y(e[0])&&Fn(e[1]),result:R},readHtml:{args:e=>E(e,[y]),result:R},screenshot:{args:e=>E(e,[y]),result:R},click:{args:e=>E(e,[y,t=>typeof t=="number"]),result:R},type:{args:e=>e.length>=3&&e.length<=4&&y(e[0])&&typeof e[1]=="number"&&y(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:R},select:{args:e=>E(e,[y,t=>typeof t=="number",y]),result:R},scroll:{args:e=>E(e,[y,t=>typeof t=="number",t=>typeof t=="number"]),result:R},pressKey:{args:e=>E(e,[y,y]),result:R},navigate:{args:e=>E(e,[y,y]),result:R},back:{args:e=>E(e,[y]),result:R},forward:{args:e=>E(e,[y]),result:R},reload:{args:e=>E(e,[y]),result:R}}),Ui=M("fileTree.contextItem","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.label=="string"&&j(e.labelKey)&&_(e,"run"),e=>[e.id]),Wi=M("newTab.entry","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"run"),e=>[e.id]),ro=M("search.resultCard","extension","1.0.0","many",e=>v(e)&&typeof e.cardKind=="string"&&_(e,"render")&&_(e,"open"),e=>[e.cardKind]),Hi=M("metadataPanel.segment","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"render"),e=>[e.id]),io=M("workspace.surface","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&_(e,"getSnapshot")&&_(e,"subscribe")&&_(e,"restore"),e=>[e.id]),Ki=M("metadata.plugin","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"facts"),e=>[e.id]),Bi=M("workspace.viewState","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&_(e,"capture")&&_(e,"restore")&&_(e,"subscribe"),e=>[e.id]);var Gn=[".csv"],qn=[".base"],Zn=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Xn=[".pdf"],Yn=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Jn=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Qn=[".stl",".obj",".glb",".gltf"];function er(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var tr={type:"core",id:"valley"},x=(e,t,n,i,r={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],transcription:!1,editable:e==="text"||e==="code",sortGroup:i,owner:tr,...r});function or(e){let t={};for(let[n,i]of e)for(let r of n)t[r]=i;return t}var nr=or([[[".md",".markdown"],x("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],x("text","text","text","notes")],[[".json"],x("json","json","json","data",{editable:!0})],[[".jsonl"],x("json","json","jsonl","data",{editable:!0})],[Gn,x("csv","csv","csv","data",{editable:!0})],[qn,x("base","base","fallback","data")],[Zn,x("image","image","image","media",{information:["identity","dimensions","exif"]})],[Xn,x("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Yn,x("audio","audio","audio","media",{information:["identity","media","audio-tags"],transcription:!0})],[Jn,x("video","video","video","media",{information:["identity","media","video-codec"],transcription:!0})],[Qn,x("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],x("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],x("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],x("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],x("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],x("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],x("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],x("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],x("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],x("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],x("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],x("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],x("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],x("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],x("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],x("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],x("code","code","code","code",{codeLanguage:"Go"})],[[".java"],x("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],x("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],x("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],x("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],x("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],x("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],x("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],x("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],x("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),rr=x("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function ir(e){return nr[er(e)]??rr}function de(e){return ir(e).kind}var o,p;function ao(e){p=e,o=e.React}function bt(){return p.runtime.getOrCreate("sideNotes.editRequest",()=>{let e=null,t=new Set;return{get:()=>e,publish:n=>{e=n;for(let i of t)i()},subscribe:n=>(t.add(n),()=>{t.delete(n)})}})}function yt(){return p.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ce(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let i=n.toString();return n.search?i:i.replace(/\/$/,"")}catch{return t}}function Ee(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var Te="sideNotes.notes",ve="sideNotes.note_tags",Ke="sideNotes.path_history";function Ce(e){let t=[Te,ve,Ke].map(n=>p.data.dataset(n).subscribe(e));return()=>t.forEach(n=>n())}function so(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Be(){return new Date().toISOString()}function H(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function $(e){return typeof e=="string"?e:""}function ar(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=$(t.type);if(n==="pdf-page"){let i=$(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(H(t.page,1))),...i?{snippet:i}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(H(t.page,1))),x:H(t.x,0),y:H(t.y,0),width:H(t.width,.2),height:H(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,H(t.seconds,0))};if(n==="markdown-line"){let i=$(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(H(t.line,1))),...i?{snippet:i}:{}}}if(n==="markdown-heading"){let i=$(t.heading).trim();return i?{type:n,heading:i,line:t.line===void 0?void 0:Math.max(1,Math.floor(H(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let i=$(t.snippet).trim();return i?{type:n,snippet:i,line:t.line===void 0?void 0:Math.max(1,Math.floor(H(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:H(t.x,0),y:H(t.y,0),width:H(t.width,.25),height:H(t.height,.25)};if(n==="web-selection"){let i=$(t.snippet).trim();return i?{type:n,snippet:i}:{type:"none"}}return{type:"none"}}function sr(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function dr(e){let t=$(e.id).trim(),n=$(e.path).trim(),i=ce($(e.url)),r=$(e.note).trim();if(!t||!r||!n&&!i)return null;let a=$(e.createdAt)||Be(),s=Array.isArray(e.pathHistory)?e.pathHistory.filter(l=>typeof l=="string"&&l!==n):[];return{id:t,path:n,note:r,...i?{url:i}:{},pathHistory:[...new Set(s)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],anchor:ar(e.anchor),fileKey:sr(e.fileKey),createdAt:a,updatedAt:$(e.updatedAt)||a}}async function co(e){if(!e.path)return e;let t=await p.vault.stat(e.path);return t?{...e,fileKey:t}:e}function lo(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function He(e,t){let n=[],i;do{let r=await p.data.dataset(e).query({where:t,limit:1e3,cursor:i});n.push(...r.rows),i=r.cursor}while(i);return n}function uo(e){return[...e.tags.map(t=>({dataset:ve,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:Ke,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function cr(e){let[t,n]=await Promise.all([He(ve,{noteId:e}),He(Ke,{noteId:e})]);return[...t.map(i=>({dataset:ve,operation:"delete",key:{noteId:e,tag:String(i.tag)}})),...n.map(i=>({dataset:Ke,operation:"delete",key:{noteId:e,position:Number(i.position)}}))]}function lr(){return p.runtime.getOrCreate("sideNotes.noteLoad",()=>({pending:null}))}async function ur(){let[e,t,n]=await Promise.all([He(Te),He(ve),He(Ke)]),i=new Map;for(let a of t){let s=$(a.noteId);if(!s)continue;let l=i.get(s);l?l.push(a.tag):i.set(s,[a.tag])}let r=new Map;for(let a of n){let s=$(a.noteId);if(!s)continue;let l=r.get(s);l?l.push(a):r.set(s,[a])}for(let a of r.values())a.sort((s,l)=>Number(s.position)-Number(l.position));return e.map(a=>dr({...a,tags:i.get($(a.id))??[],pathHistory:(r.get($(a.id))??[]).map(s=>s.path)})).filter(a=>a!==null)}function X(){let e=lr();if(e.pending)return e.pending;let t=ur(),n=()=>{e.pending===t&&(e.pending=null)};return e.pending=t,t.then(n,n),t}function vt(e,t,n,i=[]){let r=Be();return{id:so(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:i,anchor:n,createdAt:r,updatedAt:r}}function wt(e,t,n,i=[]){let r=Be();return{id:so(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:i,anchor:n,createdAt:r,updatedAt:r}}async function Ie(e){let t=await co(e);try{return await p.data.transaction([{dataset:Te,operation:"insert",values:lo(t)},...uo(t)]),!0}catch{return!1}}async function te(e,t,n,i){let r=await co({...t,id:e});try{let a={pluginId:p.pluginId,sourceId:"notes",itemId:e},s=await p.documents.read(a);if(!s||n!==void 0&&(await p.data.dataset(Te).get({id:e}))?.updatedAt!==n)return!1;let l=lo(r);return delete l.id,delete l.note,await p.documents.update(a,{expectedRevision:i?.expectedRevision??s.revision,vaultGeneration:i?.vaultGeneration??s.vaultGeneration,body:r.note,explicitTags:r.tags,operations:[{dataset:Te,operation:"update",key:{id:e},values:l},...(await cr(e)).filter(f=>f.dataset!==ve),...uo(r).filter(f=>f.dataset!==ve)]}),!0}catch{return!1}}async function le(e){try{return(await p.data.dataset(Te).delete({id:e})).affected>0}catch{return!1}}async function po(e,t){if(!e||!t||e===t)return;let n=await X(),i=`${e}/`;for(let r of n){if(r.path!==e&&!r.path.startsWith(i))continue;let a=r.path===e?t:`${t}/${r.path.slice(i.length)}`,s={...r,path:a,pathHistory:[r.path,...r.pathHistory.filter(l=>l!==r.path)],updatedAt:Be()};await te(r.id,s)}}async function fo(e,t,n){if(!Number.isFinite(n)||n===0||!e)return;let i=Math.max(1,Math.floor(t)),r=await X();for(let a of r){if(a.path!==e||a.anchor.type!=="markdown-line"||a.anchor.line<i)continue;let s={...a,anchor:{...a.anchor,line:Math.max(1,a.anchor.line+n)},updatedAt:Be()};await te(a.id,s)}}var go={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var fr=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,gr=/^-\s+(.*)$/,mr=/^[A-Za-z][\w+.-]*:\/\//;function mo(e){let t={bare:null,values:{},lists:{}},n=null;for(let i of e.split(`
`)){let r=i.trim();if(!r||r.startsWith("#"))continue;let a=r.match(gr);if(a){n?t.lists[n].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let s=mr.test(r)?null:r.match(fr);if(s){let l=s[1].trim().toLowerCase(),f=s[2].trim();f===""?(n=l,t.lists[l]=t.lists[l]??[]):(n=null,t.values[l]=f);continue}n=null,t.bare===null&&(t.bare=r)}return t}function ho(e,t,n=500){let i=e.values[t];if(i===void 0)return null;let r=Number.parseInt(i,10);return!Number.isFinite(r)||r<1?null:Math.min(r,n)}var bo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-vault browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"File extensions available in the SideNotes filter. Add, remove or reorder them.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Web"};var yo={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem vault-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Im SideNotes-Filter verf\xFCgbare Dateierweiterungen. Du kannst sie hinzuf\xFCgen, entfernen oder neu anordnen.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Internet"};var vo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda la b\xF3veda.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Extensiones de archivo disponibles en el filtro de SideNotes. Puedes a\xF1adirlas, eliminarlas o reordenarlas.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.web":"Sitio web"};var wo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le coffre.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Extensions de fichier disponibles dans le filtre SideNotes. Vous pouvez les ajouter, les supprimer ou les r\xE9organiser.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.web":"Site web"};var No={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8\u4ED3\u5E93\u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"SideNotes \u7B5B\u9009\u5668\u4E2D\u53EF\u7528\u7684\u6587\u4EF6\u6269\u5C55\u540D\u3002\u53EF\u4EE5\u6DFB\u52A0\u3001\u5220\u9664\u6216\u91CD\u65B0\u6392\u5E8F\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.web":"\u7F51\u9875"};var So={en:bo,de:yo,es:vo,fr:wo,"zh-CN":No};function xo(e,t){return(So.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(i,r)=>String(t?.[r]??""))}var ko=xo;function Ao(e){e.ui.registerCatalogs(So),ko=(t,n)=>{let i=e.ui.t(t,n);return i===t?xo(t,n):i}}function c(e,t){return ko(e,t)}var Rt="notes-sidenotes-fence-styles";function Nr(){if(document.getElementById(Rt))return;let e=document.createElement("style");e.id=Rt,e.textContent=`
.sidenotes-fence { margin: 0.75em 0; border: 1px solid var(--border-light); border-radius: var(--radius); background: var(--container-color); overflow: hidden; }
.sidenotes-fence-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.sidenotes-fence-head .t { font-weight: 600; color: var(--title-color); }
.sidenotes-fence-head .c { font-size: var(--small-font-size); color: var(--text-secondary); }
.sidenotes-fence-note { padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.sidenotes-fence-note:last-child { border-bottom: none; }
.sidenotes-fence-note:hover { background: var(--hover-bg); }
.sidenotes-fence-note .body { color: var(--text-color); font-size: var(--small-font-size); }
.sidenotes-fence-note .body p { margin: 0 0 0.35em; }
.sidenotes-fence-note .meta { margin-top: 2px; font-size:0.6875rem; color: var(--text-secondary); display: flex; gap: 8px; }
.sidenotes-fence-note .meta .flag { color: var(--accent-color); }
.sidenotes-fence-empty { padding: 10px 12px; color: var(--text-secondary); font-size: var(--small-font-size); }
`,document.head.appendChild(e)}var Eo=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?c("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},Sr=({code:e,path:t})=>{let[n,i]=o.useState(null);o.useEffect(()=>{let S=!0,T=()=>{X().then(V=>{S&&i(V)})};T();let P=Ce(T);return()=>{S=!1,P()}},[]);let r=mo(e),a=r.values.file??r.bare??t,s=r.values.url??null,l=(r.values.flagged??"").toLowerCase()==="true",f=r.values.tag?r.values.tag.replace(/^#/,"").toLowerCase():null,h=ho(r,"limit",100)??20;if(!n)return o.createElement("div",{className:"sidenotes-fence-empty"},c("auto.33ce417454bf"));let b=n.filter(S=>s?S.url===s:a?!(S.path!==a||l&&S.flagged!==!0||f&&!S.tags.some(T=>T.replace(/^#/,"").toLowerCase()===f)):l?S.flagged===!0:!1).slice(0,h),g=()=>{p.workspace.revealOwnPanel("right_sidebar")},k=s??(a?a.split("/").pop():l?"flagged":null);return o.createElement(o.Fragment,null,o.createElement("div",{className:"sidenotes-fence-head",onClick:g,title:c("auto.954a9a37711e")},o.createElement("span",{className:"t"},c("auto.746eb1a86a79")," ",k?` \xB7 ${k}`:""),o.createElement("span",{className:"c"},b.length)),b.length===0&&o.createElement("div",{className:"sidenotes-fence-empty"},c("auto.f545c86bbd6e")),b.map(S=>o.createElement("div",{key:S.id,className:"sidenotes-fence-note",onClick:g},o.createElement(p.ui.MarkdownView,{className:"body",value:S.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:S.id},sourcePath:S.path||void 0}}),o.createElement("div",{className:"meta"},S.flagged&&o.createElement("span",{className:"flag"},"\u2691"),Eo(S)&&o.createElement("span",null,Eo(S)),S.tags.slice(0,3).map(T=>o.createElement("span",{key:T},"#",T.replace(/^#/,"")))))))};function To(){let e=p.markdown.registerCodeBlockRenderer("sidenotes",(t,n,i)=>(Nr(),n.classList.add("sidenotes-fence"),p.ui.renderReact(n,o.createElement(Sr,{code:t,path:i.path}))),{examples:go.sidenotes});return()=>{e(),document.getElementById(Rt)?.remove()}}var z=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Co=e=>o.createElement(z,{...e},o.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),o.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),Io=e=>o.createElement(z,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),Pe=e=>o.createElement(z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),o.createElement("path",{d:"M2 12h20"})),Nt=e=>o.createElement(z,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Po=e=>o.createElement(z,{...e},o.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),St=e=>o.createElement(z,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),we=e=>o.createElement(z,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),o.createElement("path",{d:"M4 22v-7"})),_o=e=>o.createElement(z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Do=e=>o.createElement(z,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Mo=e=>o.createElement(z,{...e},o.createElement("path",{d:"M3 6h18"}),o.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),o.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),$t=e=>o.createElement(z,{...e},o.createElement("path",{d:"M20 6 9 17l-5-5"})),Fo=e=>o.createElement(z,{...e},o.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),o.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),o.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),Oo=e=>o.createElement(z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"8"}),o.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),o.createElement("circle",{cx:"12",cy:"12",r:"2"})),_e=e=>o.createElement(z,{...e},o.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),o.createElement("path",{d:"M12 9v4M12 17h.01"})),De=e=>o.createElement(z,{...e},o.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),o.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),Me=e=>o.createElement(z,{...e},o.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),o.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var qe={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function Xe(){return["none","web-selection"]}function jt(e){let t=de(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function Ro(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let i=e.line??0;return!!t.lineRange&&i>=1&&i>=t.lineRange.from&&i<=t.lineRange.to}return!1}function $o(e,t){let n=de(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function Ye(e){let t=de(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function Ze(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var xt=1e7,Ge=1e6,xr=xt-1,Lo=xt-2;function ue(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function zt(e,t){if(e.type==="pdf-page"){let n=e.page*xt,i=e.snippet?ue(e.snippet):"";if(!i||t==null)return n;let r=ue(t).indexOf(i);return n+(r>=0?Math.min(r,Lo):xr)}if(e.type==="pdf-region")return e.page*xt+Math.max(0,Math.min(e.y,Lo));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?ue(e.snippet):"";if(n&&t!=null){let i=t.replace(/\r\n?/g,`
`).split(`
`);for(let r=0;r<i.length;r++){let a=ue(i[r]).indexOf(n);if(a>=0)return(r+1)*Ge+Math.min(a,Ge-1)}}return(e.line??0)*Ge}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,i=n*Ge,r=e.type==="markdown-heading"?"":e.snippet?ue(e.snippet):"";if(!r||t==null||n<1)return i;let a=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(a==null)return i;let s=ue(a).indexOf(r);return i+(s>=0?Math.min(s,Ge-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}async function zo(e,t){let n=new Map,r=t.some(s=>(s.anchor.type==="markdown-snippet"||s.anchor.type==="markdown-line")&&!!s.anchor.snippet)&&e?await p.vault.readFile(e)??"":null,a=new Map;for(let s of t){let l=s.anchor;if(l.type==="pdf-page"&&l.snippet){let f=a.get(l.page);f===void 0&&(f=e?await p.workspace.getPdfPageText(e,l.page):null,a.set(l.page,f)),n.set(s.id,zt(l,f))}else(l.type==="markdown-snippet"||l.type==="markdown-line")&&l.snippet?n.set(s.id,zt(l,r)):n.set(s.id,zt(l,null))}return n}function jo(e,t,n){let i=n.get(e.id)??Ze(e.anchor),r=n.get(t.id)??Ze(t.anchor);return i!==r?i-r:t.createdAt.localeCompare(e.createdAt)}function Fe(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return n>0?`${n}:${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${i}:${String(r).padStart(2,"0")}`}function pe(e){return e.type==="pdf-page"?c("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?c("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?Fe(e.seconds):e.type==="markdown-line"?c("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?c(qe["image-region"]):e.type==="web-selection"?e.snippet||c(qe["web-selection"]):c(qe.none)}function Vo(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function Vt(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let i=t.split(":").map(a=>Number(a));if(i.some(a=>!Number.isFinite(a)||a<0))return null;let r=i.reduce((a,s)=>a*60+s,0);return Number.isFinite(r)?r:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function Je(e,t){if(t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let n=await p.vault.readFile(e);if(!n)return t;let i=n.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let s=i[t.line-1]?.trim().slice(0,160);return s?{...t,snippet:s}:t}if(t.type==="markdown-heading"){let s=t.heading.trim().toLowerCase(),l=i.findIndex(f=>f.replace(/^#+\s*/,"").trim().toLowerCase()===s);return l>=0?{...t,line:l+1}:t}let r=t.snippet.trim(),a=r?i.findIndex(s=>s.includes(r)):-1;return a>=0?{...t,line:a+1}:t}async function Qe(e,t){if(t.type==="pdf-page"){let s=p.workspace.getPdfPageCount(e);if(typeof s=="number"&&t.page>s)return"missing";if(t.snippet){let l=await p.workspace.getPdfPageText(e,t.page);if(l!==null&&!ue(l).includes(ue(t.snippet)))return"missing"}return"ok"}if(t.type==="media-time"){let s=p.workspace.getMediaDuration();return typeof s=="number"&&t.seconds>s?"missing":"ok"}if(t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return"ok";let n=await p.vault.readFile(e);if(!n)return"ok";let i=n.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line")return t.line<=i.length?"ok":"missing";if(t.type==="markdown-heading"){let s=t.heading.trim().toLowerCase();return i.some(l=>l.replace(/^#+\s*/,"").trim().toLowerCase()===s)?"ok":"missing"}let r=t.snippet.trim();if(!r)return"ok";let a=i.filter(s=>s.includes(r)).length;return a===0?"missing":a>1?"ambiguous":"ok"}function et(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function Uo(e){let t=await p.vault.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var ie=e=>typeof e=="string"?e:"",kr=e=>e===!0,Ar=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[];function Wo(e){let t=ie(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Er(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(0,n):t}function Tr({record:e,ctx:t}){let{compact:n}=t,i=ie(e.note),r=[...new Set([...Ar(e.tags),...t.tags])],a=kr(e.flagged),s=ie(e.url),l=ie(e.path)||t.path||"",f=e.anchor&&typeof e.anchor=="object"?e.anchor:{type:"none"},h=s?ie(e.anchor?.snippet):f.type!=="none"?pe(f):"",b=i.split(`
`).find(g=>g.trim())?.replace(/^#+\s*/,"").trim();return o.createElement("div",{className:`flagged-note-card search-card${a?" flagged":""}${n?" compact":""}`,onClick:g=>t.onOpen({newTab:p.ui.hasModKey(g)}),title:s||l},o.createElement("div",{className:"flagged-note-header"},o.createElement("div",{className:"flagged-note-meta-row"},o.createElement("div",{className:"flagged-note-meta-left"},h&&o.createElement("span",{className:"flagged-note-anchor"},h)),o.createElement("div",{className:"flagged-note-meta-right"},a&&o.createElement(we,{className:"sidenote-flag-btn active","aria-hidden":!0}))),o.createElement("span",{className:"flagged-note-file"},s&&o.createElement(Pe,{className:"flagged-note-web-icon","aria-hidden":!0}),s?Ee(s):Er(l))),n?b&&o.createElement("p",{className:"flagged-note-preview"},b):o.createElement(o.Fragment,null,i.trim()&&o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:i,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:ie(e.id)},sourcePath:l||void 0}}),r.length>0&&o.createElement("div",{className:"sidenote-tags-view"},r.map(g=>o.createElement("span",{key:g,className:"sidenote-tag-view-pill"},"#",g)))))}function Ho(e){let t={cardKind:"sidenote",render:(n,i)=>o.createElement(Tr,{record:n,ctx:i}),open:async(n,i)=>{if(ie(n.id)&&!i.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:ie(n.id)}),!0;let r=ie(n.url);if(r)return e.interop.services.providers(se)[0]?.invoke("open",[{url:r,newTab:i.newTab}]),!0;let a=Wo(n.path)||Wo(i.path);if(a){let s=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(a,s?.type==="web-selection"?void 0:s,{newTab:i.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(ro,t)}function Cr(e){return e.replace(/\s+/g," ").trim()}var Ko=200;function Ir(e,t){let n=Cr(e),i=n.slice(0,Ko);if(!t)return i;let r=n.replace(/ /g,"").slice(0,Ko).toLowerCase();if(!r)return i;let a=[],s="";for(let f=0;f<t.length;f++)/\s/.test(t[f])||(a.push(f),s+=t[f].toLowerCase());let l=s.indexOf(r);return l<0?i:t.slice(a[l],a[l+r.length-1]+1).trim()}function Bo(e,t){let n=e.text.trim(),i=Math.floor(e.page);return!n||!e.path||!Number.isFinite(i)||i<1?null:{kind:"file",path:e.path,page:i,snippet:Ir(n,t)}}function Go(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let n=t.text.trim();if(!n)return null;let i=Number(t.page);return!Number.isFinite(i)||i<1?null:{path:e,page:i,text:n}}var K={type:"string"},Zo={type:"array",items:K},Oe=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ne=(e,t={},n=[])=>Oe({type:{const:e},...t},["type",...n]),Xo={oneOf:[Ne("none"),Ne("pdf-page",{page:{type:"integer",minimum:1},snippet:K},["page"]),Ne("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),Ne("markdown-line",{line:{type:"integer",minimum:1},snippet:K},["line"]),Ne("markdown-heading",{heading:K,line:{type:"integer",minimum:1}},["heading"]),Ne("markdown-snippet",{snippet:K,line:{type:"integer",minimum:1}},["snippet"]),Ne("web-selection",{snippet:K},["snippet"])]},Pr=Oe({note:{type:"string",minLength:1},tags:Zo,flagged:{type:"boolean"},anchor:Xo});function Le(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected an object.");return e}function fe(e,t){if(typeof e!="string"||!e.trim())throw new Error(`Expected ${t}.`);return e.trim()}function _r(e){let t=Le(e),n=r=>{let a=t[r];if(typeof a!="number"||!Number.isInteger(a)||a<1)throw new Error(`Invalid anchor ${r}.`);return a},i=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...i};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw new Error("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...i};case"markdown-heading":return{type:"markdown-heading",heading:fe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:fe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:fe(t.snippet,"snippet")};default:throw new Error("Unsupported editable anchor.")}}function qo(e){let t=Le(e);if(Object.keys(t).some(i=>!["note","tags","flagged","anchor"].includes(i)))throw new Error("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=fe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(i=>typeof i=="string"))throw new Error("Expected a list of tags.");n.tags=[...new Set(t.tags.map(i=>i.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw new Error("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=_r(t.anchor)),n}async function Se(e){let t=(await X()).find(n=>n.id===e);if(!t)throw new Error("The SideNote no longer exists.");return t}async function Ut(e,t,n,i){let r=await Se(e);if(n!==void 0&&r.updatedAt!==n)throw new Error("This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let a=t.anchor??r.anchor;if(t.anchor){if(!(r.url?Xe():Ye(r.path)).includes(a.type))throw new Error("This anchor does not apply to the SideNote subject.");a=await Je(r.path,a)}let s={...r,...t,anchor:a,updatedAt:new Date().toISOString()};if(!await te(e,s,r.updatedAt,i))throw new Error("Could not save the SideNote.");return{value:s,revert:{label:"Edit SideNote",run:async()=>{if(!await te(e,r))throw new Error("Could not restore the SideNote.")},reapply:async()=>{if(!await te(e,s))throw new Error("Could not reapply the SideNote edit.")}}}}async function kt(e,t){if(t.url){let n=e.interop.services.providers(se)[0];if(!n)throw new Error("A browser provider is unavailable.");let i=await n.invoke("open",[{url:t.url}]);if(!i.ok)throw new Error(i.error.message)}else{if(!await e.vault.fileInfo(t.path))throw new Error("The annotation file no longer exists.");e.workspace.openFile(t.path,t.anchor.type==="web-selection"?void 0:t.anchor)}}function Yo(e){let t=async r=>{let a=r;return a.id?Se(a.id):a.path?e.vault.fileInfo(a.path):{url:a.url}},n={schema:Oe({id:K},["id"]),parse:r=>({id:fe(Le(r).id,"SideNote id")}),fromCli:r=>({id:r[0]})},i=[e.commands.register({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:Oe({path:K,url:K,query:K,flagged:{type:"boolean"}}),parse:r=>{let a=r==null?{}:Le(r);for(let s of["path","url","query"])if(a[s]!==void 0&&typeof a[s]!="string")throw new Error(`Expected ${s} text.`);if(a.flagged!==void 0&&typeof a.flagged!="boolean")throw new Error("Expected a boolean flag.");return{path:a.path,url:a.url,query:a.query,flagged:a.flagged}}},run:async r=>(await X()).filter(a=>(!r.path||a.path===r.path)&&(!r.url||a.url===ce(r.url))&&(r.flagged===void 0||!!a.flagged===r.flagged)&&(!r.query||`${a.note} ${a.tags.join(" ")}`.toLowerCase().includes(r.query.toLowerCase())))}),e.commands.register({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:n,run:({id:r})=>Se(r)}),e.commands.register({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"read",input:n,run:async({id:r})=>{let a=await Se(r);return await kt(e,a),await e.workspace.revealOwnPanel("right_sidebar"),bt().publish(a),a}}),e.commands.register({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({path:K,url:K,note:{type:"string",minLength:1},tags:Zo,anchor:Xo},["note"]),parse:r=>{let a=Le(r),s=typeof a.path=="string"?a.path.trim():"",l=typeof a.url=="string"?a.url.trim():"";if(!!s==!!l)throw new Error("Provide exactly one file path or URL.");if(l&&!/^https?:\/\//i.test(l))throw new Error("Expected an HTTP or HTTPS URL.");return{path:s,url:l,...qo({note:fe(a.note,"note text"),tags:a.tags,anchor:a.anchor})}}},run:async r=>{if(r.path&&!await e.vault.fileInfo(r.path))throw new Error("The annotation file does not exist.");let a=r.anchor??{type:"none"};if(!(r.url?Xe():Ye(r.path)).includes(a.type))throw new Error("This anchor does not apply to the annotation subject.");let s=r.url?wt(ce(r.url),r.note,a,r.tags):vt(r.path,r.note,await Je(r.path,a),r.tags);if(!await Ie(s))throw new Error("Could not create the SideNote.");return{value:s,revert:{label:"Create SideNote",run:async()=>{await le(s.id)},reapply:async()=>{await Ie(s)}}}},revision:r=>t(r),preview:r=>({changes:r})}),e.commands.register({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({id:K,values:Pr,expectedUpdatedAt:K},["id","values"]),parse:r=>{let a=Le(r);return{id:fe(a.id,"SideNote id"),values:qo(a.values),expectedUpdatedAt:a.expectedUpdatedAt===void 0?void 0:fe(a.expectedUpdatedAt,"revision")}}},run:({id:r,values:a,expectedUpdatedAt:s})=>Ut(r,a,s),revision:r=>t(r),preview:r=>({changes:r})}),e.commands.register({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:n,run:async({id:r})=>{let a=await Se(r);if(!await le(r))throw new Error("Could not delete the SideNote.");return{value:a,revert:{label:"Delete SideNote",run:async()=>{await Ie(a)},reapply:async()=>{await le(r)}}}},revision:r=>t(r),preview:r=>({changes:r})})];return()=>i.forEach(r=>r())}var At=({field:e,direction:t,options:n,onFieldChange:i,onDirectionChange:r,directionForField:a})=>{let[s,l]=o.useState(e),[f,h]=o.useState(t);return o.createElement("div",{className:"sidenote-sort-popover-body"},o.createElement("div",{className:"sidenote-sort-heading"},o.createElement("span",null,c("auto.90fd0e9a6276")),o.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(b=>o.createElement("button",{key:b,type:"button",className:`sidenote-sort-direction${f===b?" active":""}`,"aria-label":c(b==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":f===b,onClick:()=>{h(b),r(b)}},b==="asc"?o.createElement(De,null):o.createElement(Me,null))))),o.createElement("div",{className:"sidenote-sort-options"},n.map(b=>o.createElement("button",{key:b.value,type:"button",className:`sidenote-popover-option${s===b.value?" active":""}`,"aria-pressed":s===b.value,onClick:()=>{let g=s!==b.value;l(b.value),i(b.value);let k=g?a?.(b.value):void 0;k&&(h(k),r(k))}},o.createElement("span",null,b.label),o.createElement($t,{className:"sidenote-popover-check"})))))},Qo=({value:e,options:t,onChange:n})=>{let[i,r]=o.useState(e);return o.createElement("div",{className:"sidenote-sort-options"},t.map(a=>o.createElement("button",{key:a.value,type:"button",className:`sidenote-popover-option${i===a.value?" active":""}`,"aria-pressed":i===a.value,onClick:()=>{r(a.value),n(a.value)}},o.createElement("span",null,a.label),o.createElement($t,{className:"sidenote-popover-check"}))))},Jo=({value:e,min:t,ariaLabel:n,onCommit:i})=>{let[r,a]=o.useState(String(e)),s=o.useRef(!1);o.useEffect(()=>{s.current||a(String(e))},[e]);let l=f=>{let h=Number(f),b=f.trim()===""||!Number.isFinite(h)?t:Math.max(t,h);a(String(b)),i(b)};return o.createElement("input",{type:"number",min:t,value:r,"aria-label":n,onFocus:()=>{s.current=!0},onChange:f=>{a(f.target.value);let h=Number(f.target.value);f.target.value.trim()!==""&&Number.isFinite(h)&&i(Math.max(t,h))},onBlur:f=>{s.current=!1,l(f.target.value)}})},Dr=({seconds:e,onCommit:t})=>{let[n,i]=o.useState(Fe(e)),r=o.useRef(!1);o.useEffect(()=>{r.current||i(Fe(e))},[e]);let a=()=>{let s=p.workspace.getMediaTime();s!==null&&(t(Math.max(0,s)),i(Fe(s)))};return o.createElement("div",{className:"sidenote-time-field"},o.createElement("input",{value:n,placeholder:"0:00","aria-label":c("auto.19eabc961735"),onFocus:()=>{r.current=!0},onChange:s=>{i(s.target.value);let l=Vt(s.target.value);l!==null&&t(l)},onBlur:s=>{r.current=!1;let l=Vt(s.target.value),f=l===null?0:Math.max(0,l);t(f),i(Fe(f))}}),o.createElement("button",{type:"button",className:"sidenote-time-capture",title:c("auto.528bfa4632ef"),onClick:a},c("auto.e3b82040565b")))},Wt=({path:e,web:t=!1,anchor:n,onChange:i,validationMsg:r,invalid:a})=>{let s=t?Xe():Ye(e),{SelectField:l}=p.ui.settings,f=p.ui.ComboField,[h,b]=o.useState([]);return o.useEffect(()=>{if(n.type!=="markdown-heading"){b([]);return}Uo(e).then(b)},[e,n.type]),o.createElement("div",{className:`sidenote-anchor-editor${a?" invalid":""}`},o.createElement("div",{className:"sidenote-select-wrap"},o.createElement(l,{value:n.type,onChange:g=>i(Vo(g,n)),ariaLabel:c("auto.9c36384c83fb"),options:s.map(g=>({value:g,label:t&&g==="none"?c("auto.eeb742ed8cac"):c(qe[g])}))})),n.type==="web-selection"&&o.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:g=>i({...n,snippet:g.target.value}),placeholder:c("auto.98c236df91df"),"aria-label":c("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&o.createElement(o.Fragment,null,o.createElement(Jo,{value:n.page,min:1,ariaLabel:c("auto.300721defdc9"),onCommit:g=>i({...n,page:g})}),o.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:g=>i({...n,snippet:g.target.value||void 0}),placeholder:c("auto.2599b7d91cc5"),"aria-label":c("auto.1e149756b7c6")})),n.type==="media-time"&&o.createElement(Dr,{seconds:n.seconds,onCommit:g=>i({...n,seconds:g})}),n.type==="markdown-line"&&o.createElement(Jo,{value:n.line,min:1,ariaLabel:c("auto.7555728cb6e5"),onCommit:g=>i({...n,line:g})}),n.type==="markdown-heading"&&o.createElement(f,{value:n.heading,onChange:g=>i({...n,heading:g}),options:h.map(g=>({value:g,label:g})),placeholder:c("auto.a3089b7fae27"),ariaLabel:c("auto.353e665a44c8")}),n.type==="markdown-snippet"&&o.createElement("input",{value:n.snippet,onChange:g=>i({...n,snippet:g.target.value}),placeholder:c("auto.2e5ce5a06a35"),"aria-label":c("auto.ef6127596cae")}),r&&o.createElement("p",{className:"sidenote-anchor-warning"},r))},Et=({note:e,onSaved:t,onClose:n})=>{let[i,r]=o.useState(e.note),[a,s]=o.useState(e.tags),[l,f]=o.useState(e.anchor),[h,b]=o.useState(!!e.flagged),[g,k]=o.useState(!1),[S,T]=o.useState(""),[P,V]=o.useState(),L={pluginId:"sideNotes",sourceId:"notes",itemId:e.id},Y=async()=>{if(!g)try{await p.documents.drafts.clear(L),n()}catch(D){T(D instanceof Error?D.message:String(D))}},oe=async()=>{if(!(g||!i.trim())){k(!0),T("");try{if(!P)throw new Error(c("sideNotes.error.save"));let D=await Ut(e.id,{note:i,tags:a,anchor:l,flagged:h},e.updatedAt,P);p.undo.push({label:c("sideNotes.command.update"),undo:async()=>{try{return await D.revert.run(),{ok:!0}}catch(q){return{ok:!1,message:String(q)}}},redo:async()=>{try{return await D.revert.reapply(),{ok:!0}}catch(q){return{ok:!1,message:String(q)}}}}),t(D.value),await p.documents.drafts.clear(L),n()}catch(D){T(D instanceof Error?D.message:String(D))}finally{k(!1)}}},Z=o.createElement("div",{className:"sidenote-edit-actions"},o.createElement("button",{className:"sidenote-cancel-btn",disabled:g,onClick:()=>{Y()}},c("auto.77dfd2135f4d")),o.createElement("button",{className:"sidenote-save-btn",disabled:g||!i.trim()||!P,onClick:()=>{oe()}},c("auto.efc007a393f6")));return o.createElement(p.ui.Modal,{title:c("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{Y()},footer:Z},o.createElement(p.ui.NoteInput,{value:i,context:{ref:L,sourcePath:e.path||void 0},tags:a,onTagsChange:s,onRevisionChange:D=>V(q=>!q||D.expectedRevision<q.expectedRevision?D:q),onChange:r,onSave:()=>{oe()},onCancel:()=>{Y()}}),o.createElement(p.ui.TagInput,{value:a,onChange:s}),o.createElement(Wt,{path:e.path,web:!!e.url,anchor:l,onChange:f}),o.createElement("label",null,o.createElement("input",{type:"checkbox",checked:h,disabled:g,onChange:D=>b(D.target.checked)}),c("sideNotes.field.flagged")),S&&o.createElement("p",{role:"alert"},c("sideNotes.error.save")," ",S))},Tt=({noteId:e,setOpenId:t,onEdit:n,onDelete:i,disabled:r=!1})=>o.createElement("div",{className:"sidenote-menu-wrap"},o.createElement("button",{className:"sidenote-icon-btn","aria-label":c("auto.5430d0e5fb8c"),title:c("auto.6bf5da9c080b"),disabled:r,onClick:a=>{a.stopPropagation(),t(e),p.ui.openMenu([{label:c("auto.5301648dcf6b"),icon:o.createElement(Do,null),enabled:!r,onSelect:n},{label:c("auto.f6fdbe48dc54"),icon:o.createElement(Mo,null),enabled:!r,danger:!0,onSelect:i}],{anchor:a.currentTarget,align:"end"}).finally(()=>t(null))}},o.createElement(_o,null)));function en(){let[e,t]=o.useState(()=>p.getState().activePath);return o.useEffect(()=>p.subscribe(()=>t(p.getState().activePath)),[]),e}function tn(){let e=o.useCallback(n=>p.interop.state.subscribe(Lt,n),[]),t=o.useCallback(()=>p.interop.state.get(Lt),[]);return o.useSyncExternalStore(e,t,t)}function Ct(){let[e,t]=o.useState([]),[n,i]=o.useState(!0),r=o.useCallback(()=>{X().then(a=>{t(a),i(!1)})},[]);return o.useEffect(()=>(r(),Ce(r)),[r]),{notes:e,setNotes:t,loading:n,reload:r}}function on(){let[e,t]=o.useState(new Set),n=o.useCallback(r=>e.has(r),[e]),i=o.useCallback((r,a)=>{t(s=>{let l=new Set(s);return a?l.add(r):l.delete(r),l})},[]);return{isPending:n,setPending:i,pending:e}}function Mr(e){let t=[],n=e.replace(/#(\S+)/g,(i,r)=>(t.push(r.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function It(e,t,...n){let i=Mr(e);if(!i.tags.length&&!i.text)return!0;let r=t.map(a=>a.toLowerCase());for(let a of i.tags)if(!r.some(s=>s.startsWith(a)))return!1;return!(i.text&&!n.map(s=>s.toLowerCase()).some(s=>s.includes(i.text)))}function B(){return p.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function tt(){for(let e of B().listeners)e()}function nn(e){let t=B().listeners;return t.add(e),()=>{t.delete(e)}}function Pt(e){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...B().views.get(e)}}function G(e,t,n){let i=()=>Pt(e)[t]??n;return[o.useSyncExternalStore(nn,i,i),a=>{B().views.set(e,{...Pt(e),[t]:typeof a=="function"?a(i()):a}),tt()}]}function xe(e,t){e?B().selected.set(t,e):B().selected.delete(t),tt()}function rn(e,t){o.useEffect(()=>{let n=Pt("right_sidebar");if(n.path===e&&n.url===t)return;B().views.set("right_sidebar",{...n,path:e,url:t});let i=B().selected.get("right_sidebar");i&&(i.path!==e||(i.url??"")!==t)&&B().selected.delete("right_sidebar"),tt()},[e,t])}function Fr(e){let t=B().selected.get(e),n=Pt(e);return{title:c("manifest.name"),view:n,...t?{item:{id:t.id,title:t.note.split(`
`)[0].slice(0,100),state:{...n,noteId:t.id}}}:{}}}function an(e){let n=["left_sidebar","right_sidebar"].map(r=>e.interop.extensions.provide(io,{id:`sideNotes.${r}`,surface:r,getSnapshot:()=>Fr(r),subscribe:nn,restore:async(a,s,l)=>{if(a.v!==1)throw new Error("Unsupported SideNotes bookmark.");let f=typeof a.noteId=="string"?await Se(a.noteId):null;if(r==="right_sidebar"&&!f&&typeof a.path=="string"&&a.path&&!await e.vault.fileInfo(a.path))throw new Error("The bookmarked file no longer exists.");if(f&&!f.url&&!await e.vault.fileInfo(f.path))throw new Error("The bookmarked file no longer exists.");!l?.background&&f?await kt(e,f):!l?.background&&r==="right_sidebar"&&(typeof a.path=="string"&&a.path||typeof a.url=="string"&&a.url)&&await kt(e,{path:typeof a.path=="string"?a.path:"",url:typeof a.url=="string"?a.url:void 0,anchor:{type:"none"}});let h={v:1};for(let b of["search","path","url","sourceType"])typeof a[b]=="string"&&(h[b]=a[b]);for(let b of["showAll","compact","filterWarning","aware"])h[b]=a[b]===!0;h.sortField=["position","updated","created","title"].includes(String(a.sortField))?a.sortField:r==="left_sidebar"?"updated":"position",h.sortDir=a.sortDir==="desc"?"desc":"asc",B().views.set(r,h),xe(f,r)}})),i=!1;return n.push(Ce(()=>{X().then(r=>{if(!i){for(let[a,s]of B().selected){let l=r.find(f=>f.id===s.id);l?B().selected.set(a,l):B().selected.delete(a)}tt()}}).catch(()=>{i||tt()})})),()=>{i=!0,n.forEach(r=>r())}}function sn(e,t){if(e.url){e.url!==t&&p.interop.services.providers(se)[0]?.invoke("open",[{url:e.url}]);return}p.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}var dn={position:"Position",created:"Created",updated:"Updated"},Or={position:"asc",created:"desc",updated:"desc"},cn=()=>{let e=en()??"",t=tn(),n=!e&&!!t?.url,i=n&&t?ce(t.url):"",r=n?"":e,a=!!r||n,s=n?`web:${i}`:r;rn(r,i);let{notes:l,setNotes:f,loading:h}=Ct(),{isPending:b,setPending:g,pending:k}=on(),[S,T]=o.useState(""),[P,V]=o.useState([]),[L,Y]=o.useState(()=>jt(r)),[oe,Z]=o.useState(!1),[D,q]=o.useState(null),[$e,ze]=o.useState(null),[J,nt]=G("right_sidebar","search",""),[ae,ne]=G("right_sidebar","filterWarning",!1),[U,rt]=G("right_sidebar","sortField","position"),[Q,je]=G("right_sidebar","sortDir","asc"),[me,it]=o.useState(new Map),[Ve,Dt]=o.useState("ok"),[Mt,at]=o.useState(!1),Ue=o.useRef(!1),[u,C]=o.useState(0),[I,w]=o.useState(new Map),[O,ee]=G("right_sidebar","aware",!1),[re,Kt]=o.useState({}),[bn,yn]=o.useState(0),[vn,wn]=o.useState(0),We=yt();o.useEffect(()=>p.files.onAnchorInfoChanged(()=>C(d=>d+1)),[]),o.useEffect(()=>We.subscribe(()=>wn(d=>d+1)),[We]);let he=o.useMemo(()=>de(r),[r]),st=he==="pdf"||he==="video"||he==="audio"||he==="text",Bt=o.useMemo(()=>{let d=Number(p.settings.get().mediaRangeSeconds);return Number.isFinite(d)&&d>=0?d:10},[bn]);o.useEffect(()=>p.settings.subscribe(()=>yn(d=>d+1)),[]);let Ft=o.useCallback(()=>({pdfPages:r?p.workspace.getPdfVisiblePages(r):null,mediaSeconds:p.workspace.getMediaTime(),lineRange:r?p.workspace.getVisibleLineRange(r):null}),[r]);o.useEffect(()=>{if(!O||!r){Kt({});return}let d=()=>Kt(Ft());d();let m=p.files.onActivePositionChanged(d),A=he==="video"||he==="audio"?window.setInterval(d,1e3):void 0;return()=>{m(),A&&window.clearInterval(A)}},[O,r,he,Ft]);let be=o.useMemo(()=>n?l.filter(d=>d.url===i):r?l.filter(d=>d.path===r&&!d.url):[],[l,r,i,n]),dt=o.useMemo(()=>{if(U==="position"){let m=[...be].sort((N,A)=>jo(N,A,I));return Q==="desc"?m.reverse():m}let d=U==="created"?"createdAt":"updatedAt";return[...be].sort((m,N)=>{let A=m[d].localeCompare(N[d])||Ze(m.anchor)-Ze(N.anchor);return Q==="asc"?A:-A})},[be,U,Q,I]),ct=o.useMemo(()=>{let d=J.trim()?dt.filter(m=>It(J,m.tags??[],m.note)):dt;return O&&st&&(d=d.filter(m=>Ro(m.anchor,re,Bt))),ae&&(d=d.filter(m=>me.has(m.id))),d},[dt,J,ae,me,O,st,re,Bt]),lt=o.useRef([]),[Nn,Gt]=o.useState(0);o.useEffect(()=>{lt.current=ct.map(d=>d.id),Gt(d=>d+1)},[r,U,Q,J,ae,O,re]);let qt=o.useMemo(()=>{let d=new Map(ct.map(N=>[N.id,N])),m=[];for(let N of lt.current){let A=d.get(N);A&&m.push(A)}for(let N of ct)lt.current.includes(N.id)||m.push(N);return lt.current=m.map(N=>N.id),m},[ct,Nn]);o.useEffect(()=>{Y(n?{type:"none"}:jt(r)),T(""),V([]),Z(!1),rt(n?"updated":"position"),je(n?"desc":"asc")},[s]),o.useEffect(()=>{let d=!1;return(async()=>{let m=new Map;for(let N of be){let A=await Qe(N.path,N.anchor);if(d)return;A!=="ok"&&m.set(N.id,A)}d||it(m)})(),()=>{d=!0}},[be,u]),o.useEffect(()=>{if(U!=="position")return;let d=!1;return(async()=>{let m=await zo(r,be);d||(w(m),Gt(N=>N+1))})(),()=>{d=!0}},[be,r,U,u]),o.useEffect(()=>{if(!oe||!r)return;let d=!1;return Qe(r,L).then(m=>{d||Dt(m)}),()=>{d=!0}},[L,oe,r,u]);let Zt=async()=>{if(Ue.current)return;let d=S.trim();if(!(!d||!a)){Ue.current=!0,at(!0);try{let m=n?wt(i,d,L,P):vt(r,d,await Je(r,L),P);f(A=>[...A,m]),T(""),V([]),Z(!1),await Ie(m)||(f(A=>A.filter(F=>F.id!==m.id)),T(d),Z(!0))}finally{Ue.current=!1,at(!1)}}},Xt=async(d,m)=>{if(b(d))return!1;let N=l.find(F=>F.id===d);if(!N)return!1;let A={...N,...m,updatedAt:new Date().toISOString()};g(d,!0),f(F=>F.map(ut=>ut.id===d?A:ut));try{let F=await te(d,A,N.updatedAt);return F||f(ut=>ut.map(Yt=>Yt.id===d?N:Yt)),F}finally{g(d,!1)}},Sn=async d=>{if(b(d))return;let m=l.find(N=>N.id===d);if(m){g(d,!0),f(N=>N.filter(A=>A.id!==d));try{await le(d)||f(A=>A.some(F=>F.id===d)?A:[...A,m])}finally{g(d,!1)}}},xn=async d=>{await p.ui.confirm({title:c("auto.042dc9b751ed"),message:c("sideNotes.delete.message"),actions:[{label:c("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:c("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Sn(d)},kn=d=>ze(d);o.useEffect(()=>{let d=bt(),m=()=>{let N=d.get();N&&(ze(N),d.publish(null))};return m(),d.subscribe(m)},[]),o.useEffect(()=>{let d=We.get();if(!d)return;let m=N=>{We.consume(d),T(""),V([]),Y(N),Z(!0)};if(d.kind==="web"){n&&ce(d.url??"")===i&&m({type:"web-selection",snippet:d.snippet});return}d.kind==="file"&&d.path===r&&!n&&m({type:"pdf-page",page:d.page??1,snippet:d.snippet})},[r,i,n,vn,We]);let An=(n?["updated","created"]:["position","created","updated"]).map(d=>({value:d,label:dn[d]})),En=d=>{p.ui.openPopover(()=>o.createElement(At,{field:U,direction:Q,options:An,onFieldChange:m=>{rt(m)},onDirectionChange:je,directionForField:m=>Or[m]}),{anchor:d,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.90fd0e9a6276")})};return o.createElement("div",{className:"sidenotes-panel"},o.createElement("header",{className:"panel-header sidenotes-header"},o.createElement("div",{className:"panel-header-label sidenotes-title"},n?o.createElement(Pe,null):o.createElement(Co,null),o.createElement("span",{className:"panel-title",title:n?i:void 0},n?Ee(i):c("auto.7d660ae8b46e"))),o.createElement("div",{className:"sidenotes-header-actions"},st&&o.createElement("button",{className:`sidenote-icon-btn${O?" active":""}`,"aria-label":c("auto.580535153931"),title:O?c("auto.df4a8bd943cc"):c("auto.7b9b8574c69b"),onClick:()=>ee(d=>!d)},o.createElement(Oo,null)),me.size>0&&o.createElement("button",{className:`sidenote-icon-btn${ae?" active":""}`,"aria-label":c("auto.f61b9fcd0854"),title:c("auto.74a3a904b38b"),onClick:()=>ne(d=>!d)},o.createElement(_e,null)),o.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":c("auto.90fd0e9a6276"),title:`${Q==="asc"?c("auto.4fee0a06b6e4"):c("auto.01e635f27ec2")} \xB7 ${dn[U]}`,"aria-haspopup":"dialog",onClick:d=>En(d.currentTarget)},Q==="asc"?o.createElement(De,null):o.createElement(Me,null)),o.createElement("button",{className:"sidenote-icon-btn","aria-label":c("auto.7a7e81b96c3a"),title:c("auto.d48a73614c7f"),onClick:()=>{let d=!oe;Z(d),d?Y(n?{type:"none"}:$o(r,Ft())):T("")},disabled:!a},o.createElement(Io,null)))),a?o.createElement(o.Fragment,null,o.createElement("div",{className:"sidenote-search-bar search-field"},o.createElement(Nt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:J,onChange:d=>nt(d.target.value),placeholder:c("auto.49cd864445a9"),"aria-label":c("auto.f1b5671b118f")}),J&&o.createElement("button",{className:"search-field-action",onClick:()=>nt(""),"aria-label":c("auto.b667d6f9f635")},o.createElement(St,null))),oe&&o.createElement("div",{className:"sidenote-create"},o.createElement(p.ui.NoteInput,{value:S,onChange:T,context:{sourcePath:r||void 0},onSave:()=>{Zt()},onCancel:()=>{Z(!1),T(""),V([])},autoFocus:!0}),o.createElement(p.ui.TagInput,{value:P,onChange:V}),o.createElement(Wt,{path:r,web:n,anchor:L,onChange:Y,invalid:!n&&Ve!=="ok",validationMsg:!n&&Ve!=="ok"?et(L,Ve):void 0}),o.createElement("div",{className:"sidenote-create-actions"},o.createElement("button",{className:"sidenote-save-btn",onClick:()=>{Zt()},disabled:!S.trim()||Mt},c("auto.757092db3c4b")),dt.length>0&&o.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{Z(!1),T(""),V([])}},c("auto.77dfd2135f4d")))),o.createElement("div",{className:"sidenote-list"},h?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,c("auto.33ce417454bf"))):qt.length?qt.map(d=>{let m=me.get(d.id),N=m!==void 0,A=k.has(d.id);return o.createElement("article",{key:d.id,className:`sidenote-card${d.flagged?" flagged":""}${N?" invalid":""}`,onClick:()=>{xe(d,"right_sidebar"),sn(d,i)}},o.createElement("div",{className:"sidenote-card-meta",onClick:F=>F.stopPropagation()},d.anchor.type!=="none"&&o.createElement("button",{className:"sidenote-anchor-badge",onClick:()=>sn(d,i),title:d.url?c("auto.9ee309dcedc9"):`${d.path} \xB7 ${pe(d.anchor)}`},!d.url&&d.anchor.type==="markdown-heading"?d.path.split("/").pop():pe(d.anchor)),o.createElement("div",{className:"sidenote-card-btns"},N&&m&&o.createElement(_e,{className:"sidenote-warning-icon",title:et(d.anchor,m)}),o.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${d.flagged?" active":""}`,"aria-label":d.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),title:d.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),disabled:A,onClick:()=>{Xt(d.id,{flagged:!d.flagged})}},o.createElement(we,null)),o.createElement(Tt,{noteId:d.id,openId:D,setOpenId:q,onEdit:()=>kn(d),onDelete:()=>{xn(d.id)},disabled:A}))),o.createElement(o.Fragment,null,o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown",value:d.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:d.id},sourcePath:d.path||void 0},onChange:F=>{Xt(d.id,{note:F})}}),d.tags&&d.tags.length>0&&o.createElement("div",{className:"sidenote-tags-view",onClick:F=>F.stopPropagation()},d.tags.map(F=>o.createElement("span",{key:F,className:"sidenote-tag-view-pill"},"#",F)))))}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,J?c("auto.b690846c83ff"):O&&st?c("auto.8f4043581269"):n?c("auto.8c8077ac2313"):c("auto.31b291dd535e"))))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,c("auto.34f6835f5ddf"))),$e&&o.createElement(Et,{key:$e.id,note:$e,onSaved:d=>{f(m=>m.map(N=>N.id===d.id?d:N)),xe(d,"right_sidebar")},onClose:()=>ze(null)}))};var Lr=[".md",".mp3",".mp4",".pdf"];function ln(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function un(e){return/^\.[^./\\\s]+$/.test(e)}function ot(e){let n=(Array.isArray(e)?e:Lr).flatMap(i=>{if(typeof i!="string")return[];let r=ln(i);return un(r)?[r]:[]});return[...new Set(n)]}var pn=()=>{let[e,t]=o.useState(()=>p.settings.get());o.useEffect(()=>p.settings.subscribe(()=>t(p.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,i=ot(e.filterTypes),{ChipsField:r,NumberField:a,Row:s,Section:l}=p.ui.settings,f=(h,b)=>{t(g=>({...g,[h]:b})),p.settings.set(h,b)};return o.createElement(l,null,o.createElement(s,{title:c("plugin.sideNotes.field.awareRange"),description:c("auto.204e47f6d7a2")},o.createElement(a,{value:n,step:1,ariaLabel:c("plugin.sideNotes.field.awareRange"),onChange:h=>{h!=null&&t(b=>({...b,mediaRangeSeconds:h}))},onCommit:h=>{h!=null&&f("mediaRangeSeconds",h)}})),o.createElement(s,{className:"sidenotes-filter-types-row",title:c("plugin.sideNotes.field.filterTypes"),description:c("plugin.sideNotes.field.filterTypesDesc")},o.createElement(r,{className:"sidenotes-filter-types-editor",items:i,onChange:h=>f("filterTypes",ot(h)),normalize:ln,validate:h=>un(h),placeholder:".png",ariaLabel:c("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var fn={updated:"Updated",created:"Created",name:"Name"},ge="all",_t="web";function Re(e){return e.url?Ee(e.url):e.path.split("/").pop()??e.path}function gn(e){return e.url?_t:e.path.match(/\.[^./]+$/)?.[0].toLowerCase()??""}function Rr(e){e.url?p.interop.services.providers(se)[0]?.invoke("open",[{url:e.url}]):p.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}function $r(e,t,n){if(n==="name"){let a=Re(e).localeCompare(Re(t),void 0,{sensitivity:"base"});return a!==0?a:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let i=n==="created"?"createdAt":"updatedAt",r=e[i].localeCompare(t[i]);return r!==0?r:Re(e).localeCompare(Re(t),void 0,{sensitivity:"base"})}var mn=()=>{let{notes:e,setNotes:t,loading:n}=Ct(),[i,r]=G("left_sidebar","search",""),[a,s]=G("left_sidebar","showAll",!1),[l,f]=G("left_sidebar","sortField","updated"),[h,b]=G("left_sidebar","sortDir","desc"),[g,k]=o.useState(new Map),[S,T]=G("left_sidebar","filterWarning",!1),[P,V]=G("left_sidebar","sourceType",ge),[L,Y]=G("left_sidebar","compact",!1),[oe,Z]=o.useState(null),[D,q]=o.useState(null),[$e,ze]=o.useState(0),[J,nt]=o.useState(()=>{let u=p.settings.get();return ot(u.filterTypes)});o.useEffect(()=>p.files.onAnchorInfoChanged(()=>ze(u=>u+1)),[]),o.useEffect(()=>p.settings.subscribe(()=>{let u=p.settings.get();nt(ot(u.filterTypes))}),[]);let ae=o.useMemo(()=>{let u=[...new Set(e.map(gn).filter(Boolean))];return[{value:ge,label:c("auto.6a72085653e4")},...J.map(C=>({value:C,label:C})),...u.includes(_t)?[{value:_t,label:c("sideNotes.filter.web")}]:[]]},[e,J]);o.useEffect(()=>{ae.some(u=>u.value===P)||V(ge)},[P,ae,V]);let ne=o.useMemo(()=>{let u=a?e:e.filter(w=>w.flagged),C=P===ge?u:u.filter(w=>gn(w)===P);return[...i.trim()?C.filter(w=>It(i,w.tags??[],w.note,w.url??w.path)):C].sort((w,O)=>{let ee=$r(w,O,l);return h==="asc"?ee:-ee})},[e,i,a,P,l,h]),U=o.useRef([]),[rt,Q]=o.useState(0);o.useEffect(()=>{U.current=ne.map(u=>u.id),Q(u=>u+1)},[a,l,h,i,P]);let je=o.useRef(!1);o.useEffect(()=>{n||je.current||(je.current=!0,U.current=ne.map(u=>u.id),Q(u=>u+1))},[n]);let me=o.useMemo(()=>{let u=S?ne.filter(w=>g.has(w.id)):ne,C=new Map(u.map(w=>[w.id,w])),I=[];for(let w of U.current){let O=C.get(w);O&&I.push(O)}for(let w of u)U.current.includes(w.id)||I.push(w);return U.current=I.map(w=>w.id),I},[ne,rt,S,g]);o.useEffect(()=>{let u=!1;return(async()=>{let C=new Map;for(let I of ne){let w=await Qe(I.url??I.path,I.anchor);if(u)return;w!=="ok"&&C.set(I.id,w)}u||k(C)})(),()=>{u=!0}},[ne,$e]);let it=async(u,C)=>{let I=e.find(ee=>ee.id===u);if(!I)return;let w={...I,...C,updatedAt:new Date().toISOString()};t(ee=>ee.map(re=>re.id===u?w:re)),await te(u,w,I.updatedAt)||t(ee=>ee.map(re=>re.id===u?I:re))},Ve=async u=>{let C=e;t(w=>w.filter(O=>O.id!==u)),await le(u)||t(C)},Dt=async u=>{await p.ui.confirm({title:c("auto.042dc9b751ed"),message:c("sideNotes.delete.message"),actions:[{label:c("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:c("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Ve(u)},Mt=u=>q(u),at=u=>{p.ui.openPopover(()=>o.createElement(At,{field:l,direction:h,options:Object.entries(fn).map(([C,I])=>({value:C,label:I})),onFieldChange:C=>f(C),onDirectionChange:b}),{anchor:u,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.90fd0e9a6276")})},Ue=u=>{p.ui.openPopover(()=>o.createElement(Qo,{value:P,options:ae,onChange:V}),{anchor:u,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.0aafb761a83c")})};return o.createElement("div",{className:"panel"},o.createElement("div",{className:"panel-header"},o.createElement("span",{className:"panel-title"},c("auto.7d660ae8b46e")),o.createElement("div",{className:"sidenotes-header-actions"},o.createElement("button",{className:`sidenote-icon-btn${a?"":" active"}`,"aria-label":a?c("auto.6a72085653e4"):c("auto.f8db8a172be6"),title:a?c("auto.6a72085653e4"):c("auto.f8db8a172be6"),"aria-pressed":!a,onClick:()=>s(u=>!u)},o.createElement(we,null)),g.size>0&&o.createElement("button",{className:`sidenote-icon-btn${S?" active":""}`,"aria-label":c("auto.f61b9fcd0854"),title:c("auto.74a3a904b38b"),onClick:()=>T(u=>!u)},o.createElement(_e,null)),o.createElement("button",{className:`sidenote-icon-btn${L?" active":""}`,"aria-label":c("auto.77f9b062ce1b"),title:L?c("auto.d2f76731e1e1"):c("auto.e3719eae891e"),onClick:()=>Y(u=>!u)},o.createElement(Fo,null)),o.createElement("button",{className:`sidenote-icon-btn${P!==ge?" active":""}`,"aria-label":c("auto.0aafb761a83c"),title:`${c("auto.0aafb761a83c")} \xB7 ${P===ge?c("auto.6a72085653e4"):P===_t?c("sideNotes.filter.web"):P}`,"aria-haspopup":"dialog","aria-pressed":P!==ge,onClick:u=>Ue(u.currentTarget)},o.createElement(Po,null)),o.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":c("auto.90fd0e9a6276"),title:`${h==="asc"?c("auto.4fee0a06b6e4"):c("auto.01e635f27ec2")} \xB7 ${fn[l]}`,"aria-haspopup":"dialog",onClick:u=>at(u.currentTarget)},h==="asc"?o.createElement(De,null):o.createElement(Me,null)))),o.createElement("div",{className:"sidenote-search-bar search-field"},o.createElement(Nt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:i,onChange:u=>r(u.target.value),placeholder:a?c("auto.49cd864445a9"):c("auto.7c0451dde956"),"aria-label":c("auto.ff4f3043a289")}),i&&o.createElement("button",{className:"search-field-action",onClick:()=>r(""),"aria-label":c("auto.b667d6f9f635")},o.createElement(St,null))),o.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},n?o.createElement("div",{className:"tree-empty"},c("auto.33ce417454bf")):me.length===0?o.createElement("div",{className:"tree-empty"},i||P!==ge?c("auto.b690846c83ff"):a?c("auto.d2a1e72bc320"):c("auto.f5ca64c680ee")):o.createElement("div",{className:"flagged-notes-list"},me.map(u=>{let C=g.get(u.id),I=C!==void 0;return o.createElement("div",{key:u.id,className:`flagged-note-card${u.flagged?" flagged":""}${I?" invalid":""}${L?" compact":""}`,onClick:()=>{xe(u,"left_sidebar"),Rr(u)},title:u.url??u.path},o.createElement("div",{className:"flagged-note-header"},o.createElement("div",{className:"flagged-note-meta-row"},o.createElement("div",{className:"flagged-note-meta-left"},u.url?u.anchor.type!=="none"&&o.createElement("span",{className:"flagged-note-anchor"},pe(u.anchor)):o.createElement("span",{className:"flagged-note-anchor",title:`${u.path}${u.anchor.type!=="none"?` \xB7 ${pe(u.anchor)}`:""}`},Re(u))),o.createElement("div",{className:"flagged-note-meta-right"},I&&C&&o.createElement(_e,{className:"sidenote-warning-icon",title:et(u.anchor,C)}),o.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${u.flagged?" active":""}`,"aria-label":u.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),title:u.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),onClick:w=>{w.stopPropagation(),it(u.id,{flagged:!u.flagged})}},o.createElement(we,null)),o.createElement(Tt,{noteId:u.id,openId:oe,setOpenId:Z,onEdit:()=>Mt(u),onDelete:()=>{Dt(u.id)}}))),u.url&&o.createElement("span",{className:"flagged-note-file"},o.createElement(Pe,{className:"flagged-note-web-icon"}),Re(u))),L&&(()=>{let w=u.note.split(`
`).find(O=>O.trim())?.replace(/^#+\s*/,"").trim();return w?o.createElement("p",{className:"flagged-note-preview"},w):null})(),o.createElement(o.Fragment,null,!L&&o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:u.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:u.id},sourcePath:u.path||void 0},onChange:w=>{it(u.id,{note:w})}}),!L&&u.tags&&u.tags.length>0&&o.createElement("div",{className:"sidenote-tags-view",onClick:w=>w.stopPropagation()},u.tags.map(w=>o.createElement("span",{key:w,className:"sidenote-tag-view-pill"},"#",w)))))}))),D&&o.createElement(Et,{key:D.id,note:D,onSaved:u=>{t(C=>C.map(I=>I.id===u.id?u:I)),xe(u,"left_sidebar")},onClose:()=>q(null)}))};var Ht="notes-sidenotes-styles",zr=`
/* \u2500\u2500 SideNotes panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.sidenotes-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  color: var(--text-color);
}

.sidenotes-header {
  width: 100%;
  gap: var(--space-2);
}

.sidenotes-header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  -webkit-app-region: no-drag;
}

.sidenotes-header-actions .sidenote-icon-btn {
  width: 28px;
  height: 28px;
}

.sidenotes-header-actions .sidenote-icon-btn svg {
  width: 16px;
  height: 16px;
}

.sidenotes-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  flex: 1;
}
/* A web subject shows the page host \u2014 keep a long hostname from pushing the
   header actions off-screen. */
.sidenotes-title .panel-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidenotes-title svg {
  flex-shrink: 0;
}

/* Search bar (right panel + left panel variants) */
.sidenote-search-bar {
  width: calc(100% - 2 * var(--space-2));
  margin: var(--space-2);
}

/* Create form */
.sidenote-create {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
}

.sidenote-create textarea,
.sidenote-edit-form textarea,
.sidenote-anchor-editor input,
.sidenote-anchor-editor select {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
  transition: border-color 0.1s;
}

.sidenote-create textarea:focus,
.sidenote-edit-form textarea:focus {
  border-color: var(--accent-color);
}

.sidenote-create textarea,
.sidenote-edit-form textarea {
  min-height: 72px;
  padding: var(--space-2);
  resize: vertical;
  color: var(--text-color);
  line-height: 1.5;
}

.sidenote-anchor-editor {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidenote-anchor-editor input,
.sidenote-anchor-editor select {
  height: 30px;
  padding: 0 var(--space-2);
}

/* Invalid anchor: red border to match the warning icon */
.sidenote-anchor-editor.invalid input,
.sidenote-anchor-editor.invalid select {
  border-color: var(--negative-color);
}

/* Pretty dropdown */
.sidenote-select-wrap {
  position: relative;
  width: 100%;
}

.sidenote-select-wrap select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding-right: 28px;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
}

.sidenote-select-wrap::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  width: 9px;
  height: 9px;
  transform: translateY(-65%) rotate(45deg);
  border-right: 1.5px solid var(--text-tertiary);
  border-bottom: 1.5px solid var(--text-tertiary);
  pointer-events: none;
  transition: border-color 0.1s;
}

.sidenote-select-wrap:hover select {
  border-color: var(--border-medium);
}

.sidenote-select-wrap:hover::after {
  border-color: var(--text-secondary);
}

/* Timestamp field with capture button */
.sidenote-time-field {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.sidenote-time-field input {
  flex: 1;
  min-width: 0;
}

.sidenote-time-capture {
  flex-shrink: 0;
  height: 30px;
  padding: 0 var(--space-3);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
  transition: background 0.1s, color 0.1s, border-color 0.1s;
}

.sidenote-time-capture:hover {
  background: var(--hover-bg);
  color: var(--title-color);
  border-color: var(--border-medium);
}

.sidenote-create-actions,
.sidenote-edit-actions {
  display: flex;
  gap: var(--space-2);
}

.sidenote-save-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px var(--space-3);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--accent-color);
  color: #fff;
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
  transition: opacity 0.15s;
}

.sidenote-save-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.sidenote-save-btn:not(:disabled):hover {
  opacity: 0.85;
}

.sidenote-cancel-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px var(--space-3);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.sidenote-cancel-btn:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* Note list */
.sidenote-list {
  display: flex;
  flex-direction: column;
  padding: 0 0 var(--space-3);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

/* Flat rows */
.sidenote-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  position: relative;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transition: background 0.12s;
}

.sidenote-card:hover {
  background: var(--hover-bg);
}

.sidenote-card + .sidenote-card::before,
.flagged-note-card + .flagged-note-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-light);
}

.sidenote-list > .sidenote-card:last-child,
.flagged-notes-list > .flagged-note-card:last-child {
  box-shadow: inset 0 -1px 0 var(--border-light);
}

.sidenote-card.flagged {
}

.sidenote-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.sidenote-anchor-badge {
  flex: 1;
  min-width: 0;
  max-width: fit-content;
  height: 20px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: 10px;
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font: inherit;
  font-size: var(--smaller-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.sidenote-anchor-badge:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.sidenote-card-btns {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  flex-shrink: 0;
}

/* Small icon buttons used in sidenote cards */
.sidenote-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  -webkit-app-region: no-drag;
}

.sidenote-icon-btn:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.sidenote-flag-btn.active,
.sidenote-icon-btn.active {
  color: var(--accent-color);
}

.sidenote-flag-btn.active svg {
  fill: currentColor;
}

/* "..." menu anchor */
.sidenote-menu-wrap {
  position: relative;
}

/* CodeMirror editor embedded in sidenote create/edit forms */
.sidenote-editor {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  overflow: hidden;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  background: var(--surface-color-alt);
}

.sidenote-editor:focus-within {
  border-color: var(--border-medium);
}

/* Warning icon for invalid anchors */
.sidenote-warning-icon {
  color: var(--negative-color);
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Validation message inside AnchorEditor */
.sidenote-anchor-warning {
  margin: 0;
  font-size: var(--smaller-font-size);
  color: var(--negative-color);
}

/* Markdown rendered inside cards */
.sidenote-markdown {
  font-size: var(--small-font-size);
  line-height: 1.5;
  color: var(--text-color);
  overflow-wrap: anywhere;
  min-width: 0;
}

.sidenote-markdown p {
  margin: 0 0 var(--space-1);
}

.sidenote-markdown p:last-child {
  margin-bottom: 0;
}

.sidenote-markdown h1,
.sidenote-markdown h2,
.sidenote-markdown h3 {
  margin: var(--space-2) 0 var(--space-1);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
}

.sidenote-markdown code {
  padding: 1px 4px;
  border-radius: 3px;
  background: var(--surface-color-alt);
  font-size: 0.9em;
}

.sidenote-markdown.markdown-body {
  font-size: var(--small-font-size);
  line-height: 1.5;
}

/* Lists (bullets, indent, nesting, tree-guides) inherit the shared
   '.markdown-body' list styling from MarkdownTab.css, so SideNotes render
   identically to the Todo note editor. Only the task checkbox is restyled
   below. */

.sidenote-markdown.markdown-body li.task-list-item input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  display: inline-grid;
  place-content: center;
  width: 1em;
  height: 1em;
  margin: 0 0.45em 0 0;
  border: 1.5px solid color-mix(in srgb, var(--text-secondary) 65%, transparent);
  border-radius: 0.24em;
  background: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.7em 0.7em;
  vertical-align: middle;
  transform: translateY(-0.04em);
  cursor: pointer;
}

.sidenote-markdown.markdown-body li.task-list-item input[type='checkbox']::after {
  content: '';
  width: 0.48em;
  height: 0.28em;
  border: 2px solid var(--background-color);
  border-top: 0;
  border-right: 0;
  transform: rotate(-45deg) scale(0);
  transition: transform 110ms ease;
}

.sidenote-markdown.markdown-body li.task-list-item input[type='checkbox']:hover {
  border-color: color-mix(in srgb, var(--text-color) 60%, transparent);
}

.sidenote-markdown.markdown-body li.task-list-item input[type='checkbox']:checked {
  background: var(--accent-color);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.3 6.5 11 12.5 5' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.7em 0.7em;
  border-color: var(--accent-color);
}

.sidenote-markdown.markdown-body li.task-list-item input[type='checkbox']:checked::after {
  content: none;
}

.sidenote-markdown.markdown-body li.task-list-item[data-task='x'],
.sidenote-markdown.markdown-body li.task-list-item[data-task='X'] {
  color: var(--text-secondary);
}

.sidenote-markdown--compact {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Edit form inside card */
.sidenote-edit-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* \u2500\u2500 SideNotes: tag input & pills \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.sidenote-tag-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  min-height: 24px;
  padding: 2px 0;
}

.sidenote-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 20px;
  padding: 0 6px 0 7px;
  border-radius: 10px;
  background: var(--surface-color-alt);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
}

.sidenote-tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 0;
  font-size:0.5625rem;
}

.sidenote-tag-remove:hover {
  color: var(--title-color);
}

.sidenote-tag-input {
  flex: 1;
  min-width: 60px;
  height: 20px;
  border: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--smaller-font-size);
  outline: none;
  padding: 0 2px;
}

.sidenote-tag-input::placeholder {
  color: var(--text-tertiary);
}

/* \u2500\u2500 SideNotes: tag view pills (read mode) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.sidenote-tags-view {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.sidenote-tag-view-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background: var(--surface-color-alt);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
}

/* \u2500\u2500 Flagged notes left panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.flagged-notes-sort {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
}

.flagged-notes-sort-dir {
  height: 28px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--smaller-font-size);
  flex: 0 0 auto;
  padding: 0 var(--space-2);
  cursor: pointer;
}

/* The sort picker is the shared SelectField, which owns its frame and caret \u2014
   only its footprint in the row belongs here. */
.flagged-notes-sort-select.select-field {
  flex: 1;
  min-width: 0;
  min-height: 28px;
  font-size: var(--smaller-font-size);
}

.flagged-notes-sort-dir:hover {
  border-color: var(--border-medium);
  color: var(--title-color);
}

.flagged-notes-list {
  display: flex;
  flex-direction: column;
  padding: 0 0 var(--space-3);
}

.panel-body.flagged-notes-panel-body {
  padding-left: 0;
  padding-right: 0;
}

.flagged-note-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  position: relative;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transition: background 0.12s;
}

.flagged-note-card:hover {
  background: var(--hover-bg);
}

.flagged-note-card.compact {
  gap: var(--space-1);
}

.flagged-note-preview {
  margin: 0;
  font-size: var(--smaller-font-size);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flagged-note-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
  width: 100%;
}

.flagged-note-file {
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  word-break: break-word;
}
/* Globe cue marking a web note in the flagged/all browser. */
.flagged-note-web-icon {
  display: inline-block;
  vertical-align: -1px;
  margin-right: 5px;
  width: 0.9em;
  height: 0.9em;
  color: var(--text-secondary);
}

.flagged-note-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
  min-width: 0;
}

.flagged-note-meta-left {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.flagged-note-meta-right {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex-shrink: 0;
}

/* Shrinks and ellipsizes like .sidenote-anchor-badge \u2014 a nowrap pill in a
   shrunk flex item spills over the buttons beside it without the clip. */
.flagged-note-anchor {
  min-width: 0;
  max-width: fit-content;
  padding: 1px var(--space-2);
  border-radius: 10px;
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* \u2500\u2500 Compact header popovers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.sidenote-sort-popover {
  width: 220px;
  padding: var(--space-2);
}

.sidenote-sort-popover-body,
.sidenote-sort-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidenote-popover-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  min-height: 30px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}

.sidenote-popover-option:hover,
.sidenote-popover-option.active {
  background: var(--hover-bg);
  color: var(--title-color);
}

.sidenote-popover-option > svg:first-child {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.sidenote-popover-option > span {
  flex: 1;
  min-width: 0;
}

.sidenote-popover-check {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  color: var(--accent-color);
  opacity: 0;
}

.sidenote-popover-option.active .sidenote-popover-check {
  opacity: 1;
}

.sidenote-sort-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 30px;
  color: var(--text-color);
  font-size: var(--small-font-size);
}

.sidenote-sort-directions {
  display: flex;
  gap: var(--space-1);
}

.sidenote-sort-direction {
  display: grid;
  place-items: center;
  width: 28px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  cursor: pointer;
}

.sidenote-sort-direction:hover,
.sidenote-sort-direction.active {
  border-color: var(--border-medium);
  background: var(--hover-bg);
  color: var(--title-color);
}

.sidenote-sort-direction svg {
  width: 14px;
  height: 14px;
}

.sidenotes-filter-types-row {
  flex-direction: column;
  gap: var(--space-2);
}

.sidenotes-filter-types-row .settings-toggle-text,
.sidenotes-filter-types-editor {
  width: 100%;
}

.sidenotes-filter-types-editor {
  min-width: 0;
}

`;function hn(){let e=document.getElementById(Ht);return e||(e=document.createElement("style"),e.id=Ht,document.head.appendChild(e)),e.textContent=zr,()=>{document.getElementById(Ht)===e&&e.remove()}}function jr(e){Ao(e),ao(e);let t=hn(),n=Yo(e),i=an(e),r=e.files.onRenamed(({oldPath:k,newPath:S})=>{po(k,S)}),a=e.files.onLineShift(({path:k,fromLine:S,delta:T})=>{fo(k,S,T)}),s=yt(),l=async k=>{if(k){if(k.surface==="web"){if(!k.url||!k.text.trim())return;s.publish({kind:"web",url:k.url,snippet:k.text.trim().slice(0,200)})}else{if(!k.path||!k.page)return;let S=await e.workspace.getPdfPageText(k.path,k.page).catch(()=>null),T=Bo({path:k.path,page:k.page,text:k.text},S);if(!T)return;s.publish(T)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(no,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:l}),h=e.commands.register({id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"read",run:()=>{let k=e.getState().activePath,S=k&&de(k)==="pdf"?Go(k,e.workspace.getTextSelection()):null;S&&l({surface:"pdf",...S})}});e.registerView("sideNotes.panel",cn),e.registerView("sideNotes.flagged",mn),e.registerView("sideNotes.settings",pn);let b=To(),g=Ho(e);return()=>{r(),n(),i(),a(),f(),h(),b(),g(),t()}}var Vr={register:jr},td=Vr;export{td as default,jr as register};
