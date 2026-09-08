var ft="valley";var Dr=`.${ft}`,Lr=`app.${ft}`;var R=`.${ft}`,xn="plugins",Ot=`${R}/${xn}`,kn="external",Or=`${Ot}/${kn}`,Rr=`${Ot}/data`;var $r=`${Ot}/plugin.json`,Qt=`${R}/state`,Ae=`${R}/settings`,mt=`${R}/app`,ht=`${R}/accounts`,zr=`${ht}/providers`,Vr=`${ht}/providers.lock.json`,jr=`${R}/blueprints`,Ur=`${R}/trash`,ye=`${R}/assistant`,Wr=`${ye}/providers`,Hr=`${ye}/providers.lock.json`,Br=`${ye}/harness`,Gr=`${ye}/harness-settings.json`,Kr=`${ye}/harness-runs`,bt=`${R}/cache`,qr=`${bt}/accounts`,An=`${bt}/assistant`,Zr=`${An}/harness`,En=`${bt}/search`,Xr=`${bt}/providers`;var Yr=`${mt}/logs`,Jr=`${mt}/whats-new`,Qr=`${mt}/setup.json`,ei=`${En}/index.jsonl`,ti=`${Qt}/journal`,oi=`${Qt}/txjournal`;var gt="design";var ni={app:`${mt}/app.json`,appearance:`${R}/${gt}/appearance.json`,pallette:`${R}/${gt}/pallette.json`,group:`${R}/${gt}/group.json`,metadata:`${Ae}/metadata.json`,notification:`${Ae}/notification.json`,preferences:`${Ae}/preferences.json`,markdown:`${Ae}/markdown.json`,files:`${Ae}/files.json`,search:`${Ae}/search.json`,design:`${R}/${gt}/appearance.json`,accounts:`${ht}/accounts.json`,provider:`${ye}/assistant.json`},ri=`${ht}/secrets.json`,ii=`${ye}/provider-secrets.json`;var di=[`${R}/assistant`,`${R}/assistant/secrets.json`,`${R}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];function L(e,t,n,i,r,a,s,l,f="owner"){return Object.freeze({id:e,kind:t,version:n,cardinality:i,validate:r,identities:a,identityScope:f,serviceCalls:s,serviceMetadata:l})}var v=e=>!!e&&typeof e=="object"&&!Array.isArray(e),_=(e,t)=>typeof e[t]=="function",ve=e=>e===void 0,Ee=e=>typeof e=="boolean",y=e=>typeof e=="string",j=e=>e===void 0||y(e),Cn=e=>e===void 0||typeof e=="number",In=e=>e===void 0||typeof e=="boolean",E=(e,t)=>e.length===t.length&&t.every((n,i)=>n(e[i])),$=e=>v(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),eo=e=>v(e),Pn=e=>v(e)&&y(e.id)&&y(e.title)&&y(e.date)&&(e.documentRef===void 0||v(e.documentRef)&&y(e.documentRef.pluginId)&&y(e.documentRef.sourceId)&&y(e.documentRef.itemId)),_n=e=>v(e)&&y(e.date)&&j(e.startTime)&&j(e.endTime)&&j(e.sourceId)&&j(e.itemId),Dn=e=>v(e)&&y(e.url)&&j(e.title)&&In(e.newTab),Ln=e=>v(e)&&y(e.query),oo=e=>v(e)&&y(e.name)&&j(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Mn=e=>Array.isArray(e)&&e.every(oo),Fn=e=>e===null||oo(e),On=e=>e===void 0||v(e)&&j(e.approvalToken)&&(e.cancellation===void 0||v(e.cancellation)),Rn=e=>typeof e=="string"||v(e)&&typeof e.text=="string",$n=e=>v(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&v(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&j(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),no=e=>v(e)&&y(e.id)&&y(e.label)&&j(e.labelKey)&&j(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(no)),zn={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Pn)},create:{args:e=>E(e,[y,eo]),result:Ee},update:{args:e=>E(e,[y,eo]),result:Ee},remove:{args:e=>E(e,[y]),result:Ee},open:{args:e=>E(e,[y]),result:ve},configure:{args:e=>e.length===0,result:ve},actions:{args:e=>E(e,[y]),result:e=>Array.isArray(e)&&e.every(no)},runAction:{args:e=>E(e,[y,y]),result:Ee}},Vn=e=>v(e)&&y(e.name)&&y(e.version)&&j(e.description)&&j(e.author)&&(e.localized===void 0||v(e.localized)&&Object.values(e.localized).every(t=>v(t)&&y(t.name)&&j(t.description))),wi=L("calendar.itemSource","service","1.3.0","many",e=>v(e)&&_(e,"list")&&(e.integration===void 0||Vn(e.integration)),void 0,zn,e=>e.integration),xi=L("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),ki=L("calendar.navigator","service","1.0.0","one",e=>v(e)&&_(e,"openDate"),void 0,{openDate:{args:e=>E(e,[_n]),result:ve}}),Ai=L("calendar.panelSelection","state","1.0.0","one",e=>v(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Rt=L("web.activeContext","state","1.0.0","one",e=>v(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function to(e){return v(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>v(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Ei=L("contacts.directory","service","1.0.0","one",e=>v(e)&&["search","resolveEmails","open"].every(t=>_(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(to)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>v(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(to))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||v(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:ve}}),Ti=L("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),se=L("web.navigator","service","1.0.0","one",e=>v(e)&&_(e,"open"),void 0,{open:{args:e=>E(e,[Dn]),result:ve}}),ro=L("selection.textAction","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&_(e,"run"),e=>[e.id]),Ci=L("geo.navigator","service","1.0.0","one",e=>v(e)&&_(e,"open"),void 0,{open:{args:e=>E(e,[Ln]),result:ve}}),Ii=L("geo.search","service","1.0.0","one",e=>v(e)&&_(e,"search")&&_(e,"reverse"),void 0,{search:{args:e=>E(e,[y]),result:Mn},reverse:{args:e=>E(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Fn}}),Pi=L("agent.toolProvider","service","1.0.0","many",e=>v(e)&&Array.isArray(e.tools)&&e.tools.every($n)&&_(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>E(e,[y,v,On]),result:Rn}},e=>({tools:e.tools}),"global"),_i=L("guard.runtime","service","1.0.0","one",e=>v(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>_(e,t)),void 0,{resolve:{args:e=>E(e,[v]),result:v},requestApproval:{args:e=>E(e,[v]),result:Ee},consumeToken:{args:e=>e.length>=1&&e.length<=2&&y(e[0])&&j(e[1]),result:Ee},audit:{args:e=>E(e,[v]),result:ve}}),Di=L("browser.automation","service","1.0.0","one",e=>v(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>_(e,t)),void 0,{list:{args:e=>e.length===0,result:$},open:{args:e=>E(e,[y]),result:$},switch:{args:e=>E(e,[y]),result:$},close:{args:e=>E(e,[y]),result:$},snapshot:{args:e=>E(e,[y]),result:$},readText:{args:e=>e.length>=1&&e.length<=2&&y(e[0])&&Cn(e[1]),result:$},readHtml:{args:e=>E(e,[y]),result:$},screenshot:{args:e=>E(e,[y]),result:$},click:{args:e=>E(e,[y,t=>typeof t=="number"]),result:$},type:{args:e=>e.length>=3&&e.length<=4&&y(e[0])&&typeof e[1]=="number"&&y(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:$},select:{args:e=>E(e,[y,t=>typeof t=="number",y]),result:$},scroll:{args:e=>E(e,[y,t=>typeof t=="number",t=>typeof t=="number"]),result:$},pressKey:{args:e=>E(e,[y,y]),result:$},navigate:{args:e=>E(e,[y,y]),result:$},back:{args:e=>E(e,[y]),result:$},forward:{args:e=>E(e,[y]),result:$},reload:{args:e=>E(e,[y]),result:$}}),Li=L("fileTree.contextItem","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.label=="string"&&j(e.labelKey)&&_(e,"run"),e=>[e.id]),Mi=L("newTab.entry","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"run"),e=>[e.id]),io=L("search.resultCard","extension","1.0.0","many",e=>v(e)&&typeof e.cardKind=="string"&&_(e,"render")&&_(e,"open"),e=>[e.cardKind]),Fi=L("metadataPanel.segment","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"render"),e=>[e.id]),ao=L("workspace.surface","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&_(e,"getSnapshot")&&_(e,"subscribe")&&_(e,"restore"),e=>[e.id]),Oi=L("metadata.plugin","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&_(e,"facts"),e=>[e.id]),Ri=L("workspace.viewState","extension","1.0.0","many",e=>v(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&_(e,"capture")&&_(e,"restore")&&_(e,"subscribe"),e=>[e.id]);var jn=[".csv"],Un=[".base"],Wn=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Hn=[".pdf"],Bn=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Gn=[".mp4",".mov",".m4v",".webm",".ogv"],Kn=[".stl",".obj",".glb",".gltf"];function qn(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var Zn={type:"core",id:"valley"},w=(e,t,n,i,r={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],transcription:!1,editable:e==="text"||e==="code",sortGroup:i,owner:Zn,...r});function Xn(e){let t={};for(let[n,i]of e)for(let r of n)t[r]=i;return t}var Yn=Xn([[[".md",".markdown"],w("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],w("text","text","text","notes")],[[".json"],w("json","json","json","data",{editable:!0})],[[".jsonl"],w("json","json","jsonl","data",{editable:!0})],[jn,w("csv","csv","csv","data")],[Un,w("base","base","base","data")],[Wn,w("image","image","image","media",{information:["identity","dimensions","exif"]})],[Hn,w("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Bn,w("audio","audio","audio","media",{information:["identity","media","audio-tags"],transcription:!0})],[Gn,w("video","video","video","media",{information:["identity","media","video-codec"],transcription:!0})],[Kn,w("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],w("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],w("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],w("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],w("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],w("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],w("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],w("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],w("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],w("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],w("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".epo"],w("code","code","code","data",{codeLanguage:"YAML"})],[[".yaml",".yml"],w("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],w("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],w("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],w("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],w("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],w("code","code","code","code",{codeLanguage:"Go"})],[[".java"],w("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],w("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],w("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],w("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],w("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],w("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],w("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],w("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],w("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Jn=w("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Qn(e){return Yn[qn(e)]??Jn}function de(e){return Qn(e).kind}var o,p;function so(e){p=e,o=e.React}function yt(){return p.runtime.getOrCreate("sideNotes.editRequest",()=>{let e=null,t=new Set;return{get:()=>e,publish:n=>{e=n;for(let i of t)i()},subscribe:n=>(t.add(n),()=>{t.delete(n)})}})}function vt(){return p.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ce(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let i=n.toString();return n.search?i:i.replace(/\/$/,"")}catch{return t}}function Te(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var Ce="sideNotes.notes",Ne="sideNotes.note_tags",Ge="sideNotes.path_history";function Ie(e){let t=[Ce,Ne,Ge].map(n=>p.data.dataset(n).subscribe(e));return()=>t.forEach(n=>n())}function co(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Ke(){return new Date().toISOString()}function H(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function z(e){return typeof e=="string"?e:""}function er(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=z(t.type);if(n==="pdf-page"){let i=z(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(H(t.page,1))),...i?{snippet:i}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(H(t.page,1))),x:H(t.x,0),y:H(t.y,0),width:H(t.width,.2),height:H(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,H(t.seconds,0))};if(n==="markdown-line"){let i=z(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(H(t.line,1))),...i?{snippet:i}:{}}}if(n==="markdown-heading"){let i=z(t.heading).trim();return i?{type:n,heading:i,line:t.line===void 0?void 0:Math.max(1,Math.floor(H(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let i=z(t.snippet).trim();return i?{type:n,snippet:i,line:t.line===void 0?void 0:Math.max(1,Math.floor(H(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:H(t.x,0),y:H(t.y,0),width:H(t.width,.25),height:H(t.height,.25)};if(n==="web-selection"){let i=z(t.snippet).trim();return i?{type:n,snippet:i}:{type:"none"}}return{type:"none"}}function tr(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function or(e){let t=z(e.id).trim(),n=z(e.path).trim(),i=ce(z(e.url)),r=z(e.note).trim();if(!t||!r||!n&&!i)return null;let a=z(e.createdAt)||Ke(),s=Array.isArray(e.pathHistory)?e.pathHistory.filter(l=>typeof l=="string"&&l!==n):[];return{id:t,path:n,note:r,...i?{url:i}:{},pathHistory:[...new Set(s)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],anchor:er(e.anchor),fileKey:tr(e.fileKey),createdAt:a,updatedAt:z(e.updatedAt)||a}}async function lo(e){if(!e.path)return e;let t=await p.vault.stat(e.path);return t?{...e,fileKey:t}:e}function uo(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function Be(e,t){let n=[],i;do{let r=await p.data.dataset(e).query({where:t,limit:1e3,cursor:i});n.push(...r.rows),i=r.cursor}while(i);return n}function po(e){return[...e.tags.map(t=>({dataset:Ne,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:Ge,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function nr(e){let[t,n]=await Promise.all([Be(Ne,{noteId:e}),Be(Ge,{noteId:e})]);return[...t.map(i=>({dataset:Ne,operation:"delete",key:{noteId:e,tag:String(i.tag)}})),...n.map(i=>({dataset:Ge,operation:"delete",key:{noteId:e,position:Number(i.position)}}))]}function rr(){return p.runtime.getOrCreate("sideNotes.noteLoad",()=>({pending:null}))}async function ir(){let[e,t,n]=await Promise.all([Be(Ce),Be(Ne),Be(Ge)]),i=new Map;for(let a of t){let s=z(a.noteId);if(!s)continue;let l=i.get(s);l?l.push(a.tag):i.set(s,[a.tag])}let r=new Map;for(let a of n){let s=z(a.noteId);if(!s)continue;let l=r.get(s);l?l.push(a):r.set(s,[a])}for(let a of r.values())a.sort((s,l)=>Number(s.position)-Number(l.position));return e.map(a=>or({...a,tags:i.get(z(a.id))??[],pathHistory:(r.get(z(a.id))??[]).map(s=>s.path)})).filter(a=>a!==null)}function X(){let e=rr();if(e.pending)return e.pending;let t=ir(),n=()=>{e.pending===t&&(e.pending=null)};return e.pending=t,t.then(n,n),t}function Nt(e,t,n,i=[]){let r=Ke();return{id:co(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:i,anchor:n,createdAt:r,updatedAt:r}}function St(e,t,n,i=[]){let r=Ke();return{id:co(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:i,anchor:n,createdAt:r,updatedAt:r}}async function Pe(e){let t=await lo(e);try{return await p.data.transaction([{dataset:Ce,operation:"insert",values:uo(t)},...po(t)]),!0}catch{return!1}}async function te(e,t,n,i){let r=await lo({...t,id:e});try{let a={pluginId:p.pluginId,sourceId:"notes",itemId:e},s=await p.documents.read(a);if(!s||n!==void 0&&(await p.data.dataset(Ce).get({id:e}))?.updatedAt!==n)return!1;let l=uo(r);return delete l.id,delete l.note,await p.documents.update(a,{expectedRevision:i?.expectedRevision??s.revision,vaultGeneration:i?.vaultGeneration??s.vaultGeneration,body:r.note,explicitTags:r.tags,operations:[{dataset:Ce,operation:"update",key:{id:e},values:l},...(await nr(e)).filter(f=>f.dataset!==Ne),...po(r).filter(f=>f.dataset!==Ne)]}),!0}catch{return!1}}async function le(e){try{return(await p.data.dataset(Ce).delete({id:e})).affected>0}catch{return!1}}async function fo(e,t){if(!e||!t||e===t)return;let n=await X(),i=`${e}/`;for(let r of n){if(r.path!==e&&!r.path.startsWith(i))continue;let a=r.path===e?t:`${t}/${r.path.slice(i.length)}`,s={...r,path:a,pathHistory:[r.path,...r.pathHistory.filter(l=>l!==r.path)],updatedAt:Ke()};await te(r.id,s)}}async function go(e,t,n){if(!Number.isFinite(n)||n===0||!e)return;let i=Math.max(1,Math.floor(t)),r=await X();for(let a of r){if(a.path!==e||a.anchor.type!=="markdown-line"||a.anchor.line<i)continue;let s={...a,anchor:{...a.anchor,line:Math.max(1,a.anchor.line+n)},updatedAt:Ke()};await te(a.id,s)}}var ar=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,sr=/^-\s+(.*)$/,dr=/^[A-Za-z][\w+.-]*:\/\//;function mo(e){let t={bare:null,values:{},lists:{}},n=null;for(let i of e.split(`
`)){let r=i.trim();if(!r||r.startsWith("#"))continue;let a=r.match(sr);if(a){n?t.lists[n].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let s=dr.test(r)?null:r.match(ar);if(s){let l=s[1].trim().toLowerCase(),f=s[2].trim();f===""?(n=l,t.lists[l]=t.lists[l]??[]):(n=null,t.values[l]=f);continue}n=null,t.bare===null&&(t.bare=r)}return t}function ho(e,t,n=500){let i=e.values[t];if(i===void 0)return null;let r=Number.parseInt(i,10);return!Number.isFinite(r)||r<1?null:Math.min(r,n)}var bo={en:{"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","plugin.sideNotes.desc":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-vault browser.","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"File extensions available in the SideNotes filter. Add, remove or reorder them.","plugin.sideNotes.name":"SideNotes","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Web","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp"},de:{"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","plugin.sideNotes.desc":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem vault-weiten Browser.","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Im SideNotes-Filter verf\xFCgbare Dateierweiterungen. Du kannst sie hinzuf\xFCgen, entfernen oder neu anordnen.","plugin.sideNotes.name":"Randnotizen","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Internet","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel"},es:{"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","plugin.sideNotes.desc":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda la b\xF3veda.","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Extensiones de archivo disponibles en el filtro de SideNotes. Puedes a\xF1adirlas, eliminarlas o reordenarlas.","plugin.sideNotes.name":"Notas laterales","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.web":"Sitio web","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo"},fr:{"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","plugin.sideNotes.desc":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le coffre.","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Extensions de fichier disponibles dans le filtre SideNotes. Vous pouvez les ajouter, les supprimer ou les r\xE9organiser.","plugin.sideNotes.name":"Notes lat\xE9rales","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.web":"Site web","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage"},"zh-CN":{"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","plugin.sideNotes.desc":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8\u4ED3\u5E93\u6D4F\u89C8\u5668\u3002","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"SideNotes \u7B5B\u9009\u5668\u4E2D\u53EF\u7528\u7684\u6587\u4EF6\u6269\u5C55\u540D\u3002\u53EF\u4EE5\u6DFB\u52A0\u3001\u5220\u9664\u6216\u91CD\u65B0\u6392\u5E8F\u3002","plugin.sideNotes.name":"\u65C1\u6CE8","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.web":"\u7F51\u9875","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233"}};var yo=bo;function vo(e,t){return(yo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(i,r)=>String(t?.[r]??""))}var No=vo;function So(e){No=(t,n)=>{let i=e.ui.t(t,n);return i===t?vo(t,n):i},e.ui.registerCatalogs(yo)}function c(e,t){return No(e,t)}var $t="notes-sidenotes-fence-styles";function cr(){if(document.getElementById($t))return;let e=document.createElement("style");e.id=$t,e.textContent=`
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
`,document.head.appendChild(e)}var wo=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?c("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},lr=({code:e,path:t})=>{let[n,i]=o.useState(null);o.useEffect(()=>{let x=!0,T=()=>{X().then(U=>{x&&i(U)})};T();let P=Ie(T);return()=>{x=!1,P()}},[]);let r=mo(e),a=r.values.file??r.bare??t,s=r.values.url??null,l=(r.values.flagged??"").toLowerCase()==="true",f=r.values.tag?r.values.tag.replace(/^#/,"").toLowerCase():null,b=ho(r,"limit",100)??20;if(!n)return o.createElement("div",{className:"sidenotes-fence-empty"},c("auto.33ce417454bf"));let h=n.filter(x=>s?x.url===s:a?!(x.path!==a||l&&x.flagged!==!0||f&&!x.tags.some(T=>T.replace(/^#/,"").toLowerCase()===f)):l?x.flagged===!0:!1).slice(0,b),g=()=>{p.workspace.revealOwnPanel("right_sidebar")},k=s??(a?a.split("/").pop():l?"flagged":null);return o.createElement(o.Fragment,null,o.createElement("div",{className:"sidenotes-fence-head",onClick:g,title:c("auto.954a9a37711e")},o.createElement("span",{className:"t"},c("auto.746eb1a86a79")," ",k?` \xB7 ${k}`:""),o.createElement("span",{className:"c"},h.length)),h.length===0&&o.createElement("div",{className:"sidenotes-fence-empty"},c("auto.f545c86bbd6e")),h.map(x=>o.createElement("div",{key:x.id,className:"sidenotes-fence-note",onClick:g},o.createElement(p.ui.MarkdownView,{className:"body",value:x.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:x.id},sourcePath:x.path||void 0}}),o.createElement("div",{className:"meta"},x.flagged&&o.createElement("span",{className:"flag"},"\u2691"),wo(x)&&o.createElement("span",null,wo(x)),x.tags.slice(0,3).map(T=>o.createElement("span",{key:T},"#",T.replace(/^#/,"")))))))};function xo(){let e=p.markdown.registerCodeBlockRenderer("sidenotes",(t,n,i)=>(cr(),n.classList.add("sidenotes-fence"),p.ui.renderReact(n,o.createElement(lr,{code:t,path:i.path}))));return()=>{e(),document.getElementById($t)?.remove()}}var V=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),ko=e=>o.createElement(V,{...e},o.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),o.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),Ao=e=>o.createElement(V,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),_e=e=>o.createElement(V,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),o.createElement("path",{d:"M2 12h20"})),wt=e=>o.createElement(V,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Eo=e=>o.createElement(V,{...e},o.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),xt=e=>o.createElement(V,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Se=e=>o.createElement(V,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),o.createElement("path",{d:"M4 22v-7"})),To=e=>o.createElement(V,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Co=e=>o.createElement(V,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Io=e=>o.createElement(V,{...e},o.createElement("path",{d:"M3 6h18"}),o.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),o.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),zt=e=>o.createElement(V,{...e},o.createElement("path",{d:"M20 6 9 17l-5-5"})),Po=e=>o.createElement(V,{...e},o.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),o.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),o.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),_o=e=>o.createElement(V,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"8"}),o.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),o.createElement("circle",{cx:"12",cy:"12",r:"2"})),De=e=>o.createElement(V,{...e},o.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),o.createElement("path",{d:"M12 9v4M12 17h.01"})),Le=e=>o.createElement(V,{...e},o.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),o.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),Me=e=>o.createElement(V,{...e},o.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),o.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var Ze={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function Ye(){return["none","web-selection"]}function jt(e){let t=de(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function Lo(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let i=e.line??0;return!!t.lineRange&&i>=1&&i>=t.lineRange.from&&i<=t.lineRange.to}return!1}function Mo(e,t){let n=de(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function Je(e){let t=de(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function Xe(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var kt=1e7,qe=1e6,ur=kt-1,Do=kt-2;function ue(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function Vt(e,t){if(e.type==="pdf-page"){let n=e.page*kt,i=e.snippet?ue(e.snippet):"";if(!i||t==null)return n;let r=ue(t).indexOf(i);return n+(r>=0?Math.min(r,Do):ur)}if(e.type==="pdf-region")return e.page*kt+Math.max(0,Math.min(e.y,Do));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?ue(e.snippet):"";if(n&&t!=null){let i=t.replace(/\r\n?/g,`
`).split(`
`);for(let r=0;r<i.length;r++){let a=ue(i[r]).indexOf(n);if(a>=0)return(r+1)*qe+Math.min(a,qe-1)}}return(e.line??0)*qe}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,i=n*qe,r=e.type==="markdown-heading"?"":e.snippet?ue(e.snippet):"";if(!r||t==null||n<1)return i;let a=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(a==null)return i;let s=ue(a).indexOf(r);return i+(s>=0?Math.min(s,qe-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}async function Fo(e,t){let n=new Map,r=t.some(s=>(s.anchor.type==="markdown-snippet"||s.anchor.type==="markdown-line")&&!!s.anchor.snippet)&&e?await p.vault.readFile(e)??"":null,a=new Map;for(let s of t){let l=s.anchor;if(l.type==="pdf-page"&&l.snippet){let f=a.get(l.page);f===void 0&&(f=e?await p.workspace.getPdfPageText(e,l.page):null,a.set(l.page,f)),n.set(s.id,Vt(l,f))}else(l.type==="markdown-snippet"||l.type==="markdown-line")&&l.snippet?n.set(s.id,Vt(l,r)):n.set(s.id,Vt(l,null))}return n}function Oo(e,t,n){let i=n.get(e.id)??Xe(e.anchor),r=n.get(t.id)??Xe(t.anchor);return i!==r?i-r:t.createdAt.localeCompare(e.createdAt)}function Fe(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return n>0?`${n}:${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${i}:${String(r).padStart(2,"0")}`}function pe(e){return e.type==="pdf-page"?c("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?c("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?Fe(e.seconds):e.type==="markdown-line"?c("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?c(Ze["image-region"]):e.type==="web-selection"?e.snippet||c(Ze["web-selection"]):c(Ze.none)}function Ro(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function Ut(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let i=t.split(":").map(a=>Number(a));if(i.some(a=>!Number.isFinite(a)||a<0))return null;let r=i.reduce((a,s)=>a*60+s,0);return Number.isFinite(r)?r:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function Qe(e,t){if(t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let n=await p.vault.readFile(e);if(!n)return t;let i=n.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let s=i[t.line-1]?.trim().slice(0,160);return s?{...t,snippet:s}:t}if(t.type==="markdown-heading"){let s=t.heading.trim().toLowerCase(),l=i.findIndex(f=>f.replace(/^#+\s*/,"").trim().toLowerCase()===s);return l>=0?{...t,line:l+1}:t}let r=t.snippet.trim(),a=r?i.findIndex(s=>s.includes(r)):-1;return a>=0?{...t,line:a+1}:t}async function et(e,t){if(t.type==="pdf-page"){let s=p.workspace.getPdfPageCount(e);if(typeof s=="number"&&t.page>s)return"missing";if(t.snippet){let l=await p.workspace.getPdfPageText(e,t.page);if(l!==null&&!ue(l).includes(ue(t.snippet)))return"missing"}return"ok"}if(t.type==="media-time"){let s=p.workspace.getMediaDuration();return typeof s=="number"&&t.seconds>s?"missing":"ok"}if(t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return"ok";let n=await p.vault.readFile(e);if(!n)return"ok";let i=n.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line")return t.line<=i.length?"ok":"missing";if(t.type==="markdown-heading"){let s=t.heading.trim().toLowerCase();return i.some(l=>l.replace(/^#+\s*/,"").trim().toLowerCase()===s)?"ok":"missing"}let r=t.snippet.trim();if(!r)return"ok";let a=i.filter(s=>s.includes(r)).length;return a===0?"missing":a>1?"ambiguous":"ok"}function tt(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function $o(e){let t=await p.vault.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var ie=e=>typeof e=="string"?e:"",pr=e=>e===!0,fr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[];function zo(e){let t=ie(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function gr(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(0,n):t}function mr({record:e,ctx:t}){let{compact:n}=t,i=ie(e.note),r=[...new Set([...fr(e.tags),...t.tags])],a=pr(e.flagged),s=ie(e.url),l=ie(e.path)||t.path||"",f=e.anchor&&typeof e.anchor=="object"?e.anchor:{type:"none"},b=s?ie(e.anchor?.snippet):f.type!=="none"?pe(f):"",h=i.split(`
`).find(g=>g.trim())?.replace(/^#+\s*/,"").trim();return o.createElement("div",{className:`flagged-note-card search-card${a?" flagged":""}${n?" compact":""}`,onClick:g=>t.onOpen({newTab:p.ui.hasModKey(g)}),title:s||l},o.createElement("div",{className:"flagged-note-header"},o.createElement("div",{className:"flagged-note-meta-row"},o.createElement("div",{className:"flagged-note-meta-left"},b&&o.createElement("span",{className:"flagged-note-anchor"},b)),o.createElement("div",{className:"flagged-note-meta-right"},a&&o.createElement(Se,{className:"sidenote-flag-btn active","aria-hidden":!0}))),o.createElement("span",{className:"flagged-note-file"},s&&o.createElement(_e,{className:"flagged-note-web-icon","aria-hidden":!0}),s?Te(s):gr(l))),n?h&&o.createElement("p",{className:"flagged-note-preview"},h):o.createElement(o.Fragment,null,i.trim()&&o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:i,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:ie(e.id)},sourcePath:l||void 0}}),r.length>0&&o.createElement("div",{className:"sidenote-tags-view"},r.map(g=>o.createElement("span",{key:g,className:"sidenote-tag-view-pill"},"#",g)))))}function Vo(e){let t={cardKind:"sidenote",render:(n,i)=>o.createElement(mr,{record:n,ctx:i}),open:async(n,i)=>{if(ie(n.id)&&!i.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:ie(n.id)}),!0;let r=ie(n.url);if(r)return e.interop.services.providers(se)[0]?.invoke("open",[{url:r,newTab:i.newTab}]),!0;let a=zo(n.path)||zo(i.path);if(a){let s=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(a,s?.type==="web-selection"?void 0:s,{newTab:i.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(io,t)}function hr(e){return e.replace(/\s+/g," ").trim()}var jo=200;function br(e,t){let n=hr(e),i=n.slice(0,jo);if(!t)return i;let r=n.replace(/ /g,"").slice(0,jo).toLowerCase();if(!r)return i;let a=[],s="";for(let f=0;f<t.length;f++)/\s/.test(t[f])||(a.push(f),s+=t[f].toLowerCase());let l=s.indexOf(r);return l<0?i:t.slice(a[l],a[l+r.length-1]+1).trim()}function Uo(e,t){let n=e.text.trim(),i=Math.floor(e.page);return!n||!e.path||!Number.isFinite(i)||i<1?null:{kind:"file",path:e.path,page:i,snippet:br(n,t)}}function Wo(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return null;let n=t.toString().trim();if(!n)return null;let i=t.getRangeAt(0).startContainer,a=(i instanceof Element?i:i.parentElement)?.closest(".textLayer");if(!a)return null;let s=Number(a.closest(".pdf-page")?.dataset.page);return!Number.isFinite(s)||s<1?null:{path:e,page:s,text:n}}var B={type:"string"},Bo={type:"array",items:B},Oe=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),we=(e,t={},n=[])=>Oe({type:{const:e},...t},["type",...n]),Go={oneOf:[we("none"),we("pdf-page",{page:{type:"integer",minimum:1},snippet:B},["page"]),we("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),we("markdown-line",{line:{type:"integer",minimum:1},snippet:B},["line"]),we("markdown-heading",{heading:B,line:{type:"integer",minimum:1}},["heading"]),we("markdown-snippet",{snippet:B,line:{type:"integer",minimum:1}},["snippet"]),we("web-selection",{snippet:B},["snippet"])]},yr=Oe({note:{type:"string",minLength:1},tags:Bo,flagged:{type:"boolean"},anchor:Go});function Re(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected an object.");return e}function fe(e,t){if(typeof e!="string"||!e.trim())throw new Error(`Expected ${t}.`);return e.trim()}function vr(e){let t=Re(e),n=r=>{let a=t[r];if(typeof a!="number"||!Number.isInteger(a)||a<1)throw new Error(`Invalid anchor ${r}.`);return a},i=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...i};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw new Error("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...i};case"markdown-heading":return{type:"markdown-heading",heading:fe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:fe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:fe(t.snippet,"snippet")};default:throw new Error("Unsupported editable anchor.")}}function Ho(e){let t=Re(e);if(Object.keys(t).some(i=>!["note","tags","flagged","anchor"].includes(i)))throw new Error("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=fe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(i=>typeof i=="string"))throw new Error("Expected a list of tags.");n.tags=[...new Set(t.tags.map(i=>i.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw new Error("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=vr(t.anchor)),n}async function xe(e){let t=(await X()).find(n=>n.id===e);if(!t)throw new Error("The SideNote no longer exists.");return t}async function Wt(e,t,n,i){let r=await xe(e);if(n!==void 0&&r.updatedAt!==n)throw new Error("This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let a=t.anchor??r.anchor;if(t.anchor){if(!(r.url?Ye():Je(r.path)).includes(a.type))throw new Error("This anchor does not apply to the SideNote subject.");a=await Qe(r.path,a)}let s={...r,...t,anchor:a,updatedAt:new Date().toISOString()};if(!await te(e,s,r.updatedAt,i))throw new Error("Could not save the SideNote.");return{value:s,revert:{label:"Edit SideNote",run:async()=>{if(!await te(e,r))throw new Error("Could not restore the SideNote.")},reapply:async()=>{if(!await te(e,s))throw new Error("Could not reapply the SideNote edit.")}}}}async function At(e,t){if(t.url){let n=e.interop.services.providers(se)[0];if(!n)throw new Error("A browser provider is unavailable.");let i=await n.invoke("open",[{url:t.url}]);if(!i.ok)throw new Error(i.error.message)}else{if(!await e.vault.fileInfo(t.path))throw new Error("The annotation file no longer exists.");e.workspace.openFile(t.path,t.anchor.type==="web-selection"?void 0:t.anchor)}}function Ko(e){let t=async r=>{let a=r;return a.id?xe(a.id):a.path?e.vault.fileInfo(a.path):{url:a.url}},n={schema:Oe({id:B},["id"]),parse:r=>({id:fe(Re(r).id,"SideNote id")}),fromCli:r=>({id:r[0]})},i=[e.commands.register({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:Oe({path:B,url:B,query:B,flagged:{type:"boolean"}}),parse:r=>{let a=r==null?{}:Re(r);for(let s of["path","url","query"])if(a[s]!==void 0&&typeof a[s]!="string")throw new Error(`Expected ${s} text.`);if(a.flagged!==void 0&&typeof a.flagged!="boolean")throw new Error("Expected a boolean flag.");return{path:a.path,url:a.url,query:a.query,flagged:a.flagged}}},run:async r=>(await X()).filter(a=>(!r.path||a.path===r.path)&&(!r.url||a.url===ce(r.url))&&(r.flagged===void 0||!!a.flagged===r.flagged)&&(!r.query||`${a.note} ${a.tags.join(" ")}`.toLowerCase().includes(r.query.toLowerCase())))}),e.commands.register({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:n,run:({id:r})=>xe(r)}),e.commands.register({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"read",input:n,run:async({id:r})=>{let a=await xe(r);return await At(e,a),await e.workspace.revealOwnPanel("right_sidebar"),yt().publish(a),a}}),e.commands.register({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({path:B,url:B,note:{type:"string",minLength:1},tags:Bo,anchor:Go},["note"]),parse:r=>{let a=Re(r),s=typeof a.path=="string"?a.path.trim():"",l=typeof a.url=="string"?a.url.trim():"";if(!!s==!!l)throw new Error("Provide exactly one file path or URL.");if(l&&!/^https?:\/\//i.test(l))throw new Error("Expected an HTTP or HTTPS URL.");return{path:s,url:l,...Ho({note:fe(a.note,"note text"),tags:a.tags,anchor:a.anchor})}}},run:async r=>{if(r.path&&!await e.vault.fileInfo(r.path))throw new Error("The annotation file does not exist.");let a=r.anchor??{type:"none"};if(!(r.url?Ye():Je(r.path)).includes(a.type))throw new Error("This anchor does not apply to the annotation subject.");let s=r.url?St(ce(r.url),r.note,a,r.tags):Nt(r.path,r.note,await Qe(r.path,a),r.tags);if(!await Pe(s))throw new Error("Could not create the SideNote.");return{value:s,revert:{label:"Create SideNote",run:async()=>{await le(s.id)},reapply:async()=>{await Pe(s)}}}},revision:r=>t(r),preview:r=>({changes:r})}),e.commands.register({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({id:B,values:yr,expectedUpdatedAt:B},["id","values"]),parse:r=>{let a=Re(r);return{id:fe(a.id,"SideNote id"),values:Ho(a.values),expectedUpdatedAt:a.expectedUpdatedAt===void 0?void 0:fe(a.expectedUpdatedAt,"revision")}}},run:({id:r,values:a,expectedUpdatedAt:s})=>Wt(r,a,s),revision:r=>t(r),preview:r=>({changes:r})}),e.commands.register({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:n,run:async({id:r})=>{let a=await xe(r);if(!await le(r))throw new Error("Could not delete the SideNote.");return{value:a,revert:{label:"Delete SideNote",run:async()=>{await Pe(a)},reapply:async()=>{await le(r)}}}},revision:r=>t(r),preview:r=>({changes:r})})];return()=>i.forEach(r=>r())}var Et=({field:e,direction:t,options:n,onFieldChange:i,onDirectionChange:r,directionForField:a})=>{let[s,l]=o.useState(e),[f,b]=o.useState(t);return o.createElement("div",{className:"sidenote-sort-popover-body"},o.createElement("div",{className:"sidenote-sort-heading"},o.createElement("span",null,c("auto.90fd0e9a6276")),o.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(h=>o.createElement("button",{key:h,type:"button",className:`sidenote-sort-direction${f===h?" active":""}`,"aria-label":c(h==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":f===h,onClick:()=>{b(h),r(h)}},h==="asc"?o.createElement(Le,null):o.createElement(Me,null))))),o.createElement("div",{className:"sidenote-sort-options"},n.map(h=>o.createElement("button",{key:h.value,type:"button",className:`sidenote-popover-option${s===h.value?" active":""}`,"aria-pressed":s===h.value,onClick:()=>{let g=s!==h.value;l(h.value),i(h.value);let k=g?a?.(h.value):void 0;k&&(b(k),r(k))}},o.createElement("span",null,h.label),o.createElement(zt,{className:"sidenote-popover-check"})))))},Zo=({value:e,options:t,onChange:n})=>{let[i,r]=o.useState(e);return o.createElement("div",{className:"sidenote-sort-options"},t.map(a=>o.createElement("button",{key:a.value,type:"button",className:`sidenote-popover-option${i===a.value?" active":""}`,"aria-pressed":i===a.value,onClick:()=>{r(a.value),n(a.value)}},o.createElement("span",null,a.label),o.createElement(zt,{className:"sidenote-popover-check"}))))},qo=({value:e,min:t,ariaLabel:n,onCommit:i})=>{let[r,a]=o.useState(String(e)),s=o.useRef(!1);o.useEffect(()=>{s.current||a(String(e))},[e]);let l=f=>{let b=Number(f),h=f.trim()===""||!Number.isFinite(b)?t:Math.max(t,b);a(String(h)),i(h)};return o.createElement("input",{type:"number",min:t,value:r,"aria-label":n,onFocus:()=>{s.current=!0},onChange:f=>{a(f.target.value);let b=Number(f.target.value);f.target.value.trim()!==""&&Number.isFinite(b)&&i(Math.max(t,b))},onBlur:f=>{s.current=!1,l(f.target.value)}})},Nr=({seconds:e,onCommit:t})=>{let[n,i]=o.useState(Fe(e)),r=o.useRef(!1);o.useEffect(()=>{r.current||i(Fe(e))},[e]);let a=()=>{let s=p.workspace.getMediaTime();s!==null&&(t(Math.max(0,s)),i(Fe(s)))};return o.createElement("div",{className:"sidenote-time-field"},o.createElement("input",{value:n,placeholder:"0:00","aria-label":c("auto.19eabc961735"),onFocus:()=>{r.current=!0},onChange:s=>{i(s.target.value);let l=Ut(s.target.value);l!==null&&t(l)},onBlur:s=>{r.current=!1;let l=Ut(s.target.value),f=l===null?0:Math.max(0,l);t(f),i(Fe(f))}}),o.createElement("button",{type:"button",className:"sidenote-time-capture",title:c("auto.528bfa4632ef"),onClick:a},c("auto.e3b82040565b")))},Ht=({path:e,web:t=!1,anchor:n,onChange:i,validationMsg:r,invalid:a})=>{let s=t?Ye():Je(e),{SelectField:l}=p.ui.settings,f=p.ui.ComboField,[b,h]=o.useState([]);return o.useEffect(()=>{if(n.type!=="markdown-heading"){h([]);return}$o(e).then(h)},[e,n.type]),o.createElement("div",{className:`sidenote-anchor-editor${a?" invalid":""}`},o.createElement("div",{className:"sidenote-select-wrap"},o.createElement(l,{value:n.type,onChange:g=>i(Ro(g,n)),ariaLabel:c("auto.9c36384c83fb"),options:s.map(g=>({value:g,label:t&&g==="none"?c("auto.eeb742ed8cac"):c(Ze[g])}))})),n.type==="web-selection"&&o.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:g=>i({...n,snippet:g.target.value}),placeholder:c("auto.98c236df91df"),"aria-label":c("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&o.createElement(o.Fragment,null,o.createElement(qo,{value:n.page,min:1,ariaLabel:c("auto.300721defdc9"),onCommit:g=>i({...n,page:g})}),o.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:g=>i({...n,snippet:g.target.value||void 0}),placeholder:c("auto.2599b7d91cc5"),"aria-label":c("auto.1e149756b7c6")})),n.type==="media-time"&&o.createElement(Nr,{seconds:n.seconds,onCommit:g=>i({...n,seconds:g})}),n.type==="markdown-line"&&o.createElement(qo,{value:n.line,min:1,ariaLabel:c("auto.7555728cb6e5"),onCommit:g=>i({...n,line:g})}),n.type==="markdown-heading"&&o.createElement(f,{value:n.heading,onChange:g=>i({...n,heading:g}),options:b.map(g=>({value:g,label:g})),placeholder:c("auto.a3089b7fae27"),ariaLabel:c("auto.353e665a44c8")}),n.type==="markdown-snippet"&&o.createElement("input",{value:n.snippet,onChange:g=>i({...n,snippet:g.target.value}),placeholder:c("auto.2e5ce5a06a35"),"aria-label":c("auto.ef6127596cae")}),r&&o.createElement("p",{className:"sidenote-anchor-warning"},r))},Tt=({note:e,onSaved:t,onClose:n})=>{let[i,r]=o.useState(e.note),[a,s]=o.useState(e.tags),[l,f]=o.useState(e.anchor),[b,h]=o.useState(!!e.flagged),[g,k]=o.useState(!1),[x,T]=o.useState(""),[P,U]=o.useState(),O={pluginId:"sideNotes",sourceId:"notes",itemId:e.id},Y=async()=>{if(!g)try{await p.documents.drafts.clear(O),n()}catch(D){T(D instanceof Error?D.message:String(D))}},oe=async()=>{if(!(g||!i.trim())){k(!0),T("");try{if(!P)throw new Error(c("sideNotes.error.save"));let D=await Wt(e.id,{note:i,tags:a,anchor:l,flagged:b},e.updatedAt,P);p.undo.push({label:c("sideNotes.command.update"),undo:async()=>{try{return await D.revert.run(),{ok:!0}}catch(q){return{ok:!1,message:String(q)}}},redo:async()=>{try{return await D.revert.reapply(),{ok:!0}}catch(q){return{ok:!1,message:String(q)}}}}),t(D.value),await p.documents.drafts.clear(O),n()}catch(D){T(D instanceof Error?D.message:String(D))}finally{k(!1)}}},Z=o.createElement("div",{className:"sidenote-edit-actions"},o.createElement("button",{className:"sidenote-cancel-btn",disabled:g,onClick:()=>{Y()}},c("auto.77dfd2135f4d")),o.createElement("button",{className:"sidenote-save-btn",disabled:g||!i.trim()||!P,onClick:()=>{oe()}},c("auto.efc007a393f6")));return o.createElement(p.ui.Modal,{title:c("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{Y()},footer:Z},o.createElement(p.ui.NoteInput,{value:i,context:{ref:O,sourcePath:e.path||void 0},tags:a,onTagsChange:s,onRevisionChange:D=>U(q=>!q||D.expectedRevision<q.expectedRevision?D:q),onChange:r,onSave:()=>{oe()},onCancel:()=>{Y()}}),o.createElement(p.ui.TagInput,{value:a,onChange:s}),o.createElement(Ht,{path:e.path,web:!!e.url,anchor:l,onChange:f}),o.createElement("label",null,o.createElement("input",{type:"checkbox",checked:b,disabled:g,onChange:D=>h(D.target.checked)}),c("sideNotes.field.flagged")),x&&o.createElement("p",{role:"alert"},c("sideNotes.error.save")," ",x))},Ct=({noteId:e,setOpenId:t,onEdit:n,onDelete:i,disabled:r=!1})=>o.createElement("div",{className:"sidenote-menu-wrap"},o.createElement("button",{className:"sidenote-icon-btn","aria-label":c("auto.5430d0e5fb8c"),title:c("auto.6bf5da9c080b"),disabled:r,onClick:a=>{a.stopPropagation(),t(e),p.ui.openMenu([{label:c("auto.5301648dcf6b"),icon:o.createElement(Co,null),enabled:!r,onSelect:n},{label:c("auto.f6fdbe48dc54"),icon:o.createElement(Io,null),enabled:!r,danger:!0,onSelect:i}],{anchor:a.currentTarget,align:"end"}).finally(()=>t(null))}},o.createElement(To,null)));function Xo(){let[e,t]=o.useState(()=>p.getState().activePath);return o.useEffect(()=>p.subscribe(()=>t(p.getState().activePath)),[]),e}function Yo(){let e=o.useCallback(n=>p.interop.state.subscribe(Rt,n),[]),t=o.useCallback(()=>p.interop.state.get(Rt),[]);return o.useSyncExternalStore(e,t,t)}function It(){let[e,t]=o.useState([]),[n,i]=o.useState(!0),r=o.useCallback(()=>{X().then(a=>{t(a),i(!1)})},[]);return o.useEffect(()=>(r(),Ie(r)),[r]),{notes:e,setNotes:t,loading:n,reload:r}}function Jo(){let[e,t]=o.useState(new Set),n=o.useCallback(r=>e.has(r),[e]),i=o.useCallback((r,a)=>{t(s=>{let l=new Set(s);return a?l.add(r):l.delete(r),l})},[]);return{isPending:n,setPending:i,pending:e}}function Sr(e){let t=[],n=e.replace(/#(\S+)/g,(i,r)=>(t.push(r.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function Pt(e,t,...n){let i=Sr(e);if(!i.tags.length&&!i.text)return!0;let r=t.map(a=>a.toLowerCase());for(let a of i.tags)if(!r.some(s=>s.startsWith(a)))return!1;return!(i.text&&!n.map(s=>s.toLowerCase()).some(s=>s.includes(i.text)))}function G(){return p.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function ot(){for(let e of G().listeners)e()}function Qo(e){let t=G().listeners;return t.add(e),()=>{t.delete(e)}}function _t(e){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...G().views.get(e)}}function K(e,t,n){let i=()=>_t(e)[t]??n;return[o.useSyncExternalStore(Qo,i,i),a=>{G().views.set(e,{..._t(e),[t]:typeof a=="function"?a(i()):a}),ot()}]}function ke(e,t){e?G().selected.set(t,e):G().selected.delete(t),ot()}function en(e,t){o.useEffect(()=>{let n=_t("right_sidebar");if(n.path===e&&n.url===t)return;G().views.set("right_sidebar",{...n,path:e,url:t});let i=G().selected.get("right_sidebar");i&&(i.path!==e||(i.url??"")!==t)&&G().selected.delete("right_sidebar"),ot()},[e,t])}function wr(e){let t=G().selected.get(e),n=_t(e);return{title:c("plugin.sideNotes.name"),view:n,...t?{item:{id:t.id,title:t.note.split(`
`)[0].slice(0,100),state:{...n,noteId:t.id}}}:{}}}function tn(e){let n=["left_sidebar","right_sidebar"].map(r=>e.interop.extensions.provide(ao,{id:`sideNotes.${r}`,surface:r,getSnapshot:()=>wr(r),subscribe:Qo,restore:async(a,s,l)=>{if(a.v!==1)throw new Error("Unsupported SideNotes bookmark.");let f=typeof a.noteId=="string"?await xe(a.noteId):null;if(r==="right_sidebar"&&!f&&typeof a.path=="string"&&a.path&&!await e.vault.fileInfo(a.path))throw new Error("The bookmarked file no longer exists.");if(f&&!f.url&&!await e.vault.fileInfo(f.path))throw new Error("The bookmarked file no longer exists.");!l?.background&&f?await At(e,f):!l?.background&&r==="right_sidebar"&&(typeof a.path=="string"&&a.path||typeof a.url=="string"&&a.url)&&await At(e,{path:typeof a.path=="string"?a.path:"",url:typeof a.url=="string"?a.url:void 0,anchor:{type:"none"}});let b={v:1};for(let h of["search","path","url","sourceType"])typeof a[h]=="string"&&(b[h]=a[h]);for(let h of["showAll","compact","filterWarning","aware"])b[h]=a[h]===!0;b.sortField=["position","updated","created","title"].includes(String(a.sortField))?a.sortField:r==="left_sidebar"?"updated":"position",b.sortDir=a.sortDir==="desc"?"desc":"asc",G().views.set(r,b),ke(f,r)}})),i=!1;return n.push(Ie(()=>{X().then(r=>{if(!i){for(let[a,s]of G().selected){let l=r.find(f=>f.id===s.id);l?G().selected.set(a,l):G().selected.delete(a)}ot()}}).catch(()=>{i||ot()})})),()=>{i=!0,n.forEach(r=>r())}}function on(e,t){if(e.url){e.url!==t&&p.interop.services.providers(se)[0]?.invoke("open",[{url:e.url}]);return}p.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}var nn={position:"Position",created:"Created",updated:"Updated"},xr={position:"asc",created:"desc",updated:"desc"},rn=()=>{let e=Xo()??"",t=Yo(),n=!e&&!!t?.url,i=n&&t?ce(t.url):"",r=n?"":e,a=!!r||n,s=n?`web:${i}`:r;en(r,i);let{notes:l,setNotes:f,loading:b}=It(),{isPending:h,setPending:g,pending:k}=Jo(),[x,T]=o.useState(""),[P,U]=o.useState([]),[O,Y]=o.useState(()=>jt(r)),[oe,Z]=o.useState(!1),[D,q]=o.useState(null),[ze,Ve]=o.useState(null),[J,rt]=K("right_sidebar","search",""),[ae,ne]=K("right_sidebar","filterWarning",!1),[W,it]=K("right_sidebar","sortField","position"),[Q,je]=K("right_sidebar","sortDir","asc"),[me,at]=o.useState(new Map),[Ue,Lt]=o.useState("ok"),[Mt,st]=o.useState(!1),We=o.useRef(!1),[u,C]=o.useState(0),[I,N]=o.useState(new Map),[F,ee]=K("right_sidebar","aware",!1),[re,Gt]=o.useState({}),[fn,gn]=o.useState(0),[mn,hn]=o.useState(0),He=vt();o.useEffect(()=>p.files.onAnchorInfoChanged(()=>C(d=>d+1)),[]),o.useEffect(()=>He.subscribe(()=>hn(d=>d+1)),[He]);let he=o.useMemo(()=>de(r),[r]),dt=he==="pdf"||he==="video"||he==="audio"||he==="text",Kt=o.useMemo(()=>{let d=Number(p.settings.get().mediaRangeSeconds);return Number.isFinite(d)&&d>=0?d:10},[fn]);o.useEffect(()=>p.settings.subscribe(()=>gn(d=>d+1)),[]);let Ft=o.useCallback(()=>({pdfPages:r?p.workspace.getPdfVisiblePages(r):null,mediaSeconds:p.workspace.getMediaTime(),lineRange:r?p.workspace.getVisibleLineRange(r):null}),[r]);o.useEffect(()=>{if(!F||!r){Gt({});return}let d=()=>Gt(Ft());d();let m=p.files.onActivePositionChanged(d),A=he==="video"||he==="audio"?window.setInterval(d,1e3):void 0;return()=>{m(),A&&window.clearInterval(A)}},[F,r,he,Ft]);let be=o.useMemo(()=>n?l.filter(d=>d.url===i):r?l.filter(d=>d.path===r&&!d.url):[],[l,r,i,n]),ct=o.useMemo(()=>{if(W==="position"){let m=[...be].sort((S,A)=>Oo(S,A,I));return Q==="desc"?m.reverse():m}let d=W==="created"?"createdAt":"updatedAt";return[...be].sort((m,S)=>{let A=m[d].localeCompare(S[d])||Xe(m.anchor)-Xe(S.anchor);return Q==="asc"?A:-A})},[be,W,Q,I]),lt=o.useMemo(()=>{let d=J.trim()?ct.filter(m=>Pt(J,m.tags??[],m.note)):ct;return F&&dt&&(d=d.filter(m=>Lo(m.anchor,re,Kt))),ae&&(d=d.filter(m=>me.has(m.id))),d},[ct,J,ae,me,F,dt,re,Kt]),ut=o.useRef([]),[bn,qt]=o.useState(0);o.useEffect(()=>{ut.current=lt.map(d=>d.id),qt(d=>d+1)},[r,W,Q,J,ae,F,re]);let Zt=o.useMemo(()=>{let d=new Map(lt.map(S=>[S.id,S])),m=[];for(let S of ut.current){let A=d.get(S);A&&m.push(A)}for(let S of lt)ut.current.includes(S.id)||m.push(S);return ut.current=m.map(S=>S.id),m},[lt,bn]);o.useEffect(()=>{Y(n?{type:"none"}:jt(r)),T(""),U([]),Z(!1),it(n?"updated":"position"),je(n?"desc":"asc")},[s]),o.useEffect(()=>{let d=!1;return(async()=>{let m=new Map;for(let S of be){let A=await et(S.path,S.anchor);if(d)return;A!=="ok"&&m.set(S.id,A)}d||at(m)})(),()=>{d=!0}},[be,u]),o.useEffect(()=>{if(W!=="position")return;let d=!1;return(async()=>{let m=await Fo(r,be);d||(N(m),qt(S=>S+1))})(),()=>{d=!0}},[be,r,W,u]),o.useEffect(()=>{if(!oe||!r)return;let d=!1;return et(r,O).then(m=>{d||Lt(m)}),()=>{d=!0}},[O,oe,r,u]);let Xt=async()=>{if(We.current)return;let d=x.trim();if(!(!d||!a)){We.current=!0,st(!0);try{let m=n?St(i,d,O,P):Nt(r,d,await Qe(r,O),P);f(A=>[...A,m]),T(""),U([]),Z(!1),await Pe(m)||(f(A=>A.filter(M=>M.id!==m.id)),T(d),Z(!0))}finally{We.current=!1,st(!1)}}},Yt=async(d,m)=>{if(h(d))return!1;let S=l.find(M=>M.id===d);if(!S)return!1;let A={...S,...m,updatedAt:new Date().toISOString()};g(d,!0),f(M=>M.map(pt=>pt.id===d?A:pt));try{let M=await te(d,A,S.updatedAt);return M||f(pt=>pt.map(Jt=>Jt.id===d?S:Jt)),M}finally{g(d,!1)}},yn=async d=>{if(h(d))return;let m=l.find(S=>S.id===d);if(m){g(d,!0),f(S=>S.filter(A=>A.id!==d));try{await le(d)||f(A=>A.some(M=>M.id===d)?A:[...A,m])}finally{g(d,!1)}}},vn=async d=>{await p.ui.confirm({title:c("auto.042dc9b751ed"),message:c("sideNotes.delete.message"),actions:[{label:c("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:c("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await yn(d)},Nn=d=>Ve(d);o.useEffect(()=>{let d=yt(),m=()=>{let S=d.get();S&&(Ve(S),d.publish(null))};return m(),d.subscribe(m)},[]),o.useEffect(()=>{let d=He.get();if(!d)return;let m=S=>{He.consume(d),T(""),U([]),Y(S),Z(!0)};if(d.kind==="web"){n&&ce(d.url??"")===i&&m({type:"web-selection",snippet:d.snippet});return}d.kind==="file"&&d.path===r&&!n&&m({type:"pdf-page",page:d.page??1,snippet:d.snippet})},[r,i,n,mn,He]);let Sn=(n?["updated","created"]:["position","created","updated"]).map(d=>({value:d,label:nn[d]})),wn=d=>{p.ui.openPopover(()=>o.createElement(Et,{field:W,direction:Q,options:Sn,onFieldChange:m=>{it(m)},onDirectionChange:je,directionForField:m=>xr[m]}),{anchor:d,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.90fd0e9a6276")})};return o.createElement("div",{className:"sidenotes-panel"},o.createElement("header",{className:"panel-header sidenotes-header"},o.createElement("div",{className:"panel-header-label sidenotes-title"},n?o.createElement(_e,null):o.createElement(ko,null),o.createElement("span",{className:"panel-title",title:n?i:void 0},n?Te(i):c("auto.7d660ae8b46e"))),o.createElement("div",{className:"sidenotes-header-actions"},dt&&o.createElement("button",{className:`sidenote-icon-btn${F?" active":""}`,"aria-label":c("auto.580535153931"),title:F?c("auto.df4a8bd943cc"):c("auto.7b9b8574c69b"),onClick:()=>ee(d=>!d)},o.createElement(_o,null)),me.size>0&&o.createElement("button",{className:`sidenote-icon-btn${ae?" active":""}`,"aria-label":c("auto.f61b9fcd0854"),title:c("auto.74a3a904b38b"),onClick:()=>ne(d=>!d)},o.createElement(De,null)),o.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":c("auto.90fd0e9a6276"),title:`${Q==="asc"?c("auto.4fee0a06b6e4"):c("auto.01e635f27ec2")} \xB7 ${nn[W]}`,"aria-haspopup":"dialog",onClick:d=>wn(d.currentTarget)},Q==="asc"?o.createElement(Le,null):o.createElement(Me,null)),o.createElement("button",{className:"sidenote-icon-btn","aria-label":c("auto.7a7e81b96c3a"),title:c("auto.d48a73614c7f"),onClick:()=>{let d=!oe;Z(d),d?Y(n?{type:"none"}:Mo(r,Ft())):T("")},disabled:!a},o.createElement(Ao,null)))),a?o.createElement(o.Fragment,null,o.createElement("div",{className:"sidenote-search-bar"},o.createElement(wt,{className:"sidenote-search-icon"}),o.createElement("input",{className:"sidenote-search-input",value:J,onChange:d=>rt(d.target.value),placeholder:c("auto.49cd864445a9"),"aria-label":c("auto.f1b5671b118f")}),J&&o.createElement("button",{className:"sidenote-icon-btn sidenote-search-clear",onClick:()=>rt(""),"aria-label":c("auto.b667d6f9f635")},o.createElement(xt,null))),oe&&o.createElement("div",{className:"sidenote-create"},o.createElement(p.ui.NoteInput,{value:x,onChange:T,context:{sourcePath:r||void 0},onSave:()=>{Xt()},onCancel:()=>{Z(!1),T(""),U([])},autoFocus:!0}),o.createElement(p.ui.TagInput,{value:P,onChange:U}),o.createElement(Ht,{path:r,web:n,anchor:O,onChange:Y,invalid:!n&&Ue!=="ok",validationMsg:!n&&Ue!=="ok"?tt(O,Ue):void 0}),o.createElement("div",{className:"sidenote-create-actions"},o.createElement("button",{className:"sidenote-save-btn",onClick:()=>{Xt()},disabled:!x.trim()||Mt},c("auto.757092db3c4b")),ct.length>0&&o.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{Z(!1),T(""),U([])}},c("auto.77dfd2135f4d")))),o.createElement("div",{className:"sidenote-list"},b?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,c("auto.33ce417454bf"))):Zt.length?Zt.map(d=>{let m=me.get(d.id),S=m!==void 0,A=k.has(d.id);return o.createElement("article",{key:d.id,className:`sidenote-card${d.flagged?" flagged":""}${S?" invalid":""}`,onClick:()=>{ke(d,"right_sidebar"),on(d,i)}},o.createElement("div",{className:"sidenote-card-meta",onClick:M=>M.stopPropagation()},d.anchor.type!=="none"&&o.createElement("button",{className:"sidenote-anchor-badge",onClick:()=>on(d,i),title:d.url?c("auto.9ee309dcedc9"):`${d.path} \xB7 ${pe(d.anchor)}`},!d.url&&d.anchor.type==="markdown-heading"?d.path.split("/").pop():pe(d.anchor)),o.createElement("div",{className:"sidenote-card-btns"},S&&m&&o.createElement(De,{className:"sidenote-warning-icon",title:tt(d.anchor,m)}),o.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${d.flagged?" active":""}`,"aria-label":d.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),title:d.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),disabled:A,onClick:()=>{Yt(d.id,{flagged:!d.flagged})}},o.createElement(Se,null)),o.createElement(Ct,{noteId:d.id,openId:D,setOpenId:q,onEdit:()=>Nn(d),onDelete:()=>{vn(d.id)},disabled:A}))),o.createElement(o.Fragment,null,o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown",value:d.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:d.id},sourcePath:d.path||void 0},onChange:M=>{Yt(d.id,{note:M})}}),d.tags&&d.tags.length>0&&o.createElement("div",{className:"sidenote-tags-view",onClick:M=>M.stopPropagation()},d.tags.map(M=>o.createElement("span",{key:M,className:"sidenote-tag-view-pill"},"#",M)))))}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,J?c("auto.b690846c83ff"):F&&dt?c("auto.8f4043581269"):n?c("auto.8c8077ac2313"):c("auto.31b291dd535e"))))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,c("auto.34f6835f5ddf"))),ze&&o.createElement(Tt,{key:ze.id,note:ze,onSaved:d=>{f(m=>m.map(S=>S.id===d.id?d:S)),ke(d,"right_sidebar")},onClose:()=>Ve(null)}))};var kr=[".md",".mp3",".mp4",".pdf"];function an(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function sn(e){return/^\.[^./\\\s]+$/.test(e)}function nt(e){let n=(Array.isArray(e)?e:kr).flatMap(i=>{if(typeof i!="string")return[];let r=an(i);return sn(r)?[r]:[]});return[...new Set(n)]}var dn=()=>{let[e,t]=o.useState(()=>p.settings.get());o.useEffect(()=>p.settings.subscribe(()=>t(p.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,i=nt(e.filterTypes),{ChipsField:r,NumberField:a,Row:s,Section:l}=p.ui.settings,f=(b,h)=>{t(g=>({...g,[b]:h})),p.settings.set(b,h)};return o.createElement(l,null,o.createElement(s,{title:c("plugin.sideNotes.field.awareRange"),description:c("auto.204e47f6d7a2")},o.createElement(a,{value:n,step:1,ariaLabel:c("plugin.sideNotes.field.awareRange"),onChange:b=>{b!=null&&t(h=>({...h,mediaRangeSeconds:b}))},onCommit:b=>{b!=null&&f("mediaRangeSeconds",b)}})),o.createElement(s,{className:"sidenotes-filter-types-row",title:c("plugin.sideNotes.field.filterTypes"),description:c("plugin.sideNotes.field.filterTypesDesc")},o.createElement(r,{className:"sidenotes-filter-types-editor",items:i,onChange:b=>f("filterTypes",nt(b)),normalize:an,validate:b=>sn(b),placeholder:".png",ariaLabel:c("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var cn={updated:"Updated",created:"Created",name:"Name"},ge="all",Dt="web";function $e(e){return e.url?Te(e.url):e.path.split("/").pop()??e.path}function ln(e){return e.url?Dt:e.path.match(/\.[^./]+$/)?.[0].toLowerCase()??""}function Ar(e){e.url?p.interop.services.providers(se)[0]?.invoke("open",[{url:e.url}]):p.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}function Er(e,t,n){if(n==="name"){let a=$e(e).localeCompare($e(t),void 0,{sensitivity:"base"});return a!==0?a:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let i=n==="created"?"createdAt":"updatedAt",r=e[i].localeCompare(t[i]);return r!==0?r:$e(e).localeCompare($e(t),void 0,{sensitivity:"base"})}var un=()=>{let{notes:e,setNotes:t,loading:n}=It(),[i,r]=K("left_sidebar","search",""),[a,s]=K("left_sidebar","showAll",!1),[l,f]=K("left_sidebar","sortField","updated"),[b,h]=K("left_sidebar","sortDir","desc"),[g,k]=o.useState(new Map),[x,T]=K("left_sidebar","filterWarning",!1),[P,U]=K("left_sidebar","sourceType",ge),[O,Y]=K("left_sidebar","compact",!1),[oe,Z]=o.useState(null),[D,q]=o.useState(null),[ze,Ve]=o.useState(0),[J,rt]=o.useState(()=>{let u=p.settings.get();return nt(u.filterTypes)});o.useEffect(()=>p.files.onAnchorInfoChanged(()=>Ve(u=>u+1)),[]),o.useEffect(()=>p.settings.subscribe(()=>{let u=p.settings.get();rt(nt(u.filterTypes))}),[]);let ae=o.useMemo(()=>{let u=[...new Set(e.map(ln).filter(Boolean))];return[{value:ge,label:c("auto.6a72085653e4")},...J.map(C=>({value:C,label:C})),...u.includes(Dt)?[{value:Dt,label:c("sideNotes.filter.web")}]:[]]},[e,J]);o.useEffect(()=>{ae.some(u=>u.value===P)||U(ge)},[P,ae,U]);let ne=o.useMemo(()=>{let u=a?e:e.filter(N=>N.flagged),C=P===ge?u:u.filter(N=>ln(N)===P);return[...i.trim()?C.filter(N=>Pt(i,N.tags??[],N.note,N.url??N.path)):C].sort((N,F)=>{let ee=Er(N,F,l);return b==="asc"?ee:-ee})},[e,i,a,P,l,b]),W=o.useRef([]),[it,Q]=o.useState(0);o.useEffect(()=>{W.current=ne.map(u=>u.id),Q(u=>u+1)},[a,l,b,i,P]);let je=o.useRef(!1);o.useEffect(()=>{n||je.current||(je.current=!0,W.current=ne.map(u=>u.id),Q(u=>u+1))},[n]);let me=o.useMemo(()=>{let u=x?ne.filter(N=>g.has(N.id)):ne,C=new Map(u.map(N=>[N.id,N])),I=[];for(let N of W.current){let F=C.get(N);F&&I.push(F)}for(let N of u)W.current.includes(N.id)||I.push(N);return W.current=I.map(N=>N.id),I},[ne,it,x,g]);o.useEffect(()=>{let u=!1;return(async()=>{let C=new Map;for(let I of ne){let N=await et(I.url??I.path,I.anchor);if(u)return;N!=="ok"&&C.set(I.id,N)}u||k(C)})(),()=>{u=!0}},[ne,ze]);let at=async(u,C)=>{let I=e.find(ee=>ee.id===u);if(!I)return;let N={...I,...C,updatedAt:new Date().toISOString()};t(ee=>ee.map(re=>re.id===u?N:re)),await te(u,N,I.updatedAt)||t(ee=>ee.map(re=>re.id===u?I:re))},Ue=async u=>{let C=e;t(N=>N.filter(F=>F.id!==u)),await le(u)||t(C)},Lt=async u=>{await p.ui.confirm({title:c("auto.042dc9b751ed"),message:c("sideNotes.delete.message"),actions:[{label:c("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:c("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Ue(u)},Mt=u=>q(u),st=u=>{p.ui.openPopover(()=>o.createElement(Et,{field:l,direction:b,options:Object.entries(cn).map(([C,I])=>({value:C,label:I})),onFieldChange:C=>f(C),onDirectionChange:h}),{anchor:u,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.90fd0e9a6276")})},We=u=>{p.ui.openPopover(()=>o.createElement(Zo,{value:P,options:ae,onChange:U}),{anchor:u,align:"end"},{className:"sidenote-sort-popover",ariaLabel:c("auto.0aafb761a83c")})};return o.createElement("div",{className:"panel"},o.createElement("div",{className:"panel-header"},o.createElement("span",{className:"panel-title"},c("auto.7d660ae8b46e")),o.createElement("div",{className:"sidenotes-header-actions"},o.createElement("button",{className:`sidenote-icon-btn${a?"":" active"}`,"aria-label":a?c("auto.6a72085653e4"):c("auto.f8db8a172be6"),title:a?c("auto.6a72085653e4"):c("auto.f8db8a172be6"),"aria-pressed":!a,onClick:()=>s(u=>!u)},o.createElement(Se,null)),g.size>0&&o.createElement("button",{className:`sidenote-icon-btn${x?" active":""}`,"aria-label":c("auto.f61b9fcd0854"),title:c("auto.74a3a904b38b"),onClick:()=>T(u=>!u)},o.createElement(De,null)),o.createElement("button",{className:`sidenote-icon-btn${O?" active":""}`,"aria-label":c("auto.77f9b062ce1b"),title:O?c("auto.d2f76731e1e1"):c("auto.e3719eae891e"),onClick:()=>Y(u=>!u)},o.createElement(Po,null)),o.createElement("button",{className:`sidenote-icon-btn${P!==ge?" active":""}`,"aria-label":c("auto.0aafb761a83c"),title:`${c("auto.0aafb761a83c")} \xB7 ${P===ge?c("auto.6a72085653e4"):P===Dt?c("sideNotes.filter.web"):P}`,"aria-haspopup":"dialog","aria-pressed":P!==ge,onClick:u=>We(u.currentTarget)},o.createElement(Eo,null)),o.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":c("auto.90fd0e9a6276"),title:`${b==="asc"?c("auto.4fee0a06b6e4"):c("auto.01e635f27ec2")} \xB7 ${cn[l]}`,"aria-haspopup":"dialog",onClick:u=>st(u.currentTarget)},b==="asc"?o.createElement(Le,null):o.createElement(Me,null)))),o.createElement("div",{className:"sidenote-search-bar sidenote-search-bar--left"},o.createElement(wt,{className:"sidenote-search-icon"}),o.createElement("input",{className:"sidenote-search-input",value:i,onChange:u=>r(u.target.value),placeholder:a?c("auto.49cd864445a9"):c("auto.7c0451dde956"),"aria-label":c("auto.ff4f3043a289")}),i&&o.createElement("button",{className:"sidenote-icon-btn sidenote-search-clear",onClick:()=>r(""),"aria-label":c("auto.b667d6f9f635")},o.createElement(xt,null))),o.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},n?o.createElement("div",{className:"tree-empty"},c("auto.33ce417454bf")):me.length===0?o.createElement("div",{className:"tree-empty"},i||P!==ge?c("auto.b690846c83ff"):a?c("auto.d2a1e72bc320"):c("auto.f5ca64c680ee")):o.createElement("div",{className:"flagged-notes-list"},me.map(u=>{let C=g.get(u.id),I=C!==void 0;return o.createElement("div",{key:u.id,className:`flagged-note-card${u.flagged?" flagged":""}${I?" invalid":""}${O?" compact":""}`,onClick:()=>{ke(u,"left_sidebar"),Ar(u)},title:u.url??u.path},o.createElement("div",{className:"flagged-note-header"},o.createElement("div",{className:"flagged-note-meta-row"},o.createElement("div",{className:"flagged-note-meta-left"},u.url?u.anchor.type!=="none"&&o.createElement("span",{className:"flagged-note-anchor"},pe(u.anchor)):o.createElement("span",{className:"flagged-note-anchor",title:`${u.path}${u.anchor.type!=="none"?` \xB7 ${pe(u.anchor)}`:""}`},$e(u))),o.createElement("div",{className:"flagged-note-meta-right"},I&&C&&o.createElement(De,{className:"sidenote-warning-icon",title:tt(u.anchor,C)}),o.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${u.flagged?" active":""}`,"aria-label":u.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),title:u.flagged?c("auto.b855c604e861"):c("auto.a774409a00c2"),onClick:N=>{N.stopPropagation(),at(u.id,{flagged:!u.flagged})}},o.createElement(Se,null)),o.createElement(Ct,{noteId:u.id,openId:oe,setOpenId:Z,onEdit:()=>Mt(u),onDelete:()=>{Lt(u.id)}}))),u.url&&o.createElement("span",{className:"flagged-note-file"},o.createElement(_e,{className:"flagged-note-web-icon"}),$e(u))),O&&(()=>{let N=u.note.split(`
`).find(F=>F.trim())?.replace(/^#+\s*/,"").trim();return N?o.createElement("p",{className:"flagged-note-preview"},N):null})(),o.createElement(o.Fragment,null,!O&&o.createElement(p.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:u.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:u.id},sourcePath:u.path||void 0},onChange:N=>{at(u.id,{note:N})}}),!O&&u.tags&&u.tags.length>0&&o.createElement("div",{className:"sidenote-tags-view",onClick:N=>N.stopPropagation()},u.tags.map(N=>o.createElement("span",{key:N,className:"sidenote-tag-view-pill"},"#",N)))))}))),D&&o.createElement(Tt,{key:D.id,note:D,onSaved:u=>{t(C=>C.map(I=>I.id===u.id?u:I)),ke(u,"left_sidebar")},onClose:()=>q(null)}))};var Bt="notes-sidenotes-styles",Tr=`
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
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
}

.sidenote-search-bar--left {
  margin: 0;
}

.sidenote-search-icon {
  color: var(--text-tertiary);
  flex-shrink: 0;
  font-size:0.8125rem;
}

.sidenote-search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
}

.sidenote-search-input::placeholder {
  color: var(--text-tertiary);
}

.sidenote-search-clear {
  opacity: 0.6;
}

.sidenote-search-clear:hover {
  opacity: 1;
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

`;function pn(){let e=document.getElementById(Bt);return e||(e=document.createElement("style"),e.id=Bt,document.head.appendChild(e)),e.textContent=Tr,()=>{document.getElementById(Bt)===e&&e.remove()}}function Cr(e){So(e),so(e);let t=pn(),n=Ko(e),i=tn(e),r=e.files.onRenamed(({oldPath:k,newPath:x})=>{fo(k,x)}),a=e.files.onLineShift(({path:k,fromLine:x,delta:T})=>{go(k,x,T)}),s=vt(),l=async k=>{if(k){if(k.surface==="web"){if(!k.url||!k.text.trim())return;s.publish({kind:"web",url:k.url,snippet:k.text.trim().slice(0,200)})}else{if(!k.path||!k.page)return;let x=await e.workspace.getPdfPageText(k.path,k.page).catch(()=>null),T=Uo({path:k.path,page:k.page,text:k.text},x);if(!T)return;s.publish(T)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(ro,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:l}),b=e.commands.register({id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"read",run:()=>{let k=e.getState().activePath,x=k&&de(k)==="pdf"?Wo(k):null;x&&l({surface:"pdf",...x})}});e.registerView("sideNotes.panel",rn),e.registerView("sideNotes.flagged",un),e.registerView("sideNotes.settings",dn);let h=xo(),g=Vo(e);return()=>{r(),n(),i(),a(),f(),b(),h(),g(),t()}}var Ir={register:Cr},_s=Ir;export{_s as default,Cr as register};
