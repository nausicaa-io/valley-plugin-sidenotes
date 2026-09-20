var Yn=Object.defineProperty;var Jn=(e,t,o)=>t in e?Yn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var R=(e,t,o)=>Jn(e,typeof t!="symbol"?t+"":t,o);var gt="valley";var xi=`.${gt}`,Ai=`app.${gt}`;var H=`.${gt}`,tr="plugins",ht=`${H}/${tr}`,or="external",Ti=`${ht}/${or}`,Ci=`${ht}/data`;var Pi=`${ht}/plugin.json`,Ii=`${ht}/config.json`,po=`${H}/state`,_e=`${H}/settings`,bt=`${H}/app`,yt=`${H}/accounts`,_i=`${yt}/providers`,Di=`${yt}/providers.lock.json`,Mi=`${H}/trash`,Bt=`${H}/cache`,Ri=`${Bt}/accounts`,nr=`${Bt}/search`,Oi=`${Bt}/providers`;var Fi=`${bt}/logs`,Li=`${bt}/whats-new`,zi=`${bt}/setup.json`,$i=`${nr}/index.jsonl`,ji=`${po}/journal`,Vi=`${po}/txjournal`;var mt="design";var Ui={app:`${bt}/app.json`,appearance:`${H}/${mt}/appearance.json`,pallette:`${H}/${mt}/pallette.json`,group:`${H}/${mt}/group.json`,metadata:`${_e}/metadata.json`,notification:`${_e}/notification.json`,preferences:`${_e}/preferences.json`,markdown:`${_e}/markdown.json`,files:`${_e}/files.json`,search:`${_e}/search.json`,design:`${H}/${mt}/appearance.json`,accounts:`${yt}/accounts.json`},Ki=`${yt}/secrets.json`;var Bi=[H,`${H}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var ir=new Map;function z(e,t,o,r,i,a,c,s,d="owner"){let f=Object.freeze({id:e,kind:t,version:o,cardinality:r,validate:i,identities:a,identityScope:d,serviceCalls:c,serviceMetadata:s});return ir.set(`${t}:${e}@${o}`,f),f}var N=e=>!!e&&typeof e=="object"&&!Array.isArray(e),F=(e,t)=>typeof e[t]=="function",Ee=e=>e===void 0,De=e=>typeof e=="boolean",w=e=>typeof e=="string",B=e=>e===void 0||w(e),ar=e=>e===void 0||typeof e=="number",sr=e=>e===void 0||typeof e=="boolean",_=(e,t)=>e.length===t.length&&t.every((o,r)=>o(e[r])),K=e=>N(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),fo=e=>N(e),dr=e=>N(e)&&w(e.id)&&w(e.title)&&w(e.date)&&(e.documentRef===void 0||N(e.documentRef)&&w(e.documentRef.pluginId)&&w(e.documentRef.sourceId)&&w(e.documentRef.itemId)),cr=e=>N(e)&&w(e.date)&&B(e.startTime)&&B(e.endTime)&&B(e.sourceId)&&B(e.itemId),lr=e=>N(e)&&w(e.url)&&B(e.title)&&sr(e.newTab),ur=e=>N(e)&&w(e.query),mo=e=>N(e)&&w(e.name)&&B(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),pr=e=>Array.isArray(e)&&e.every(mo),fr=e=>e===null||mo(e),gr=e=>e===void 0||N(e)&&B(e.approvalToken)&&(e.cancellation===void 0||N(e.cancellation)),mr=e=>typeof e=="string"||N(e)&&typeof e.text=="string",hr=e=>N(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&N(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&B(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),ho=e=>N(e)&&w(e.id)&&w(e.label)&&B(e.labelKey)&&B(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(ho)),br={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(dr)},create:{args:e=>_(e,[w,fo]),result:De},update:{args:e=>_(e,[w,fo]),result:De},remove:{args:e=>_(e,[w]),result:De},open:{args:e=>_(e,[w]),result:Ee},configure:{args:e=>e.length===0,result:Ee},actions:{args:e=>_(e,[w]),result:e=>Array.isArray(e)&&e.every(ho)},runAction:{args:e=>_(e,[w,w]),result:De}},yr=e=>N(e)&&w(e.name)&&w(e.version)&&B(e.description)&&B(e.author)&&(e.localized===void 0||N(e.localized)&&Object.values(e.localized).every(t=>N(t)&&w(t.name)&&B(t.description))),sa=z("calendar.itemSource","service","1.3.0","many",e=>N(e)&&F(e,"list")&&(e.integration===void 0||yr(e.integration)),void 0,br,e=>e.integration),da=z("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),ca=z("calendar.navigator","service","1.0.0","one",e=>N(e)&&F(e,"openDate"),void 0,{openDate:{args:e=>_(e,[cr]),result:Ee}}),la=z("calendar.panelSelection","state","1.0.0","one",e=>N(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),vt=z("web.activeContext","state","1.0.0","one",e=>N(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function go(e){return N(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>N(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var ua=z("contacts.directory","service","1.0.0","one",e=>N(e)&&["search","resolveEmails","open"].every(t=>F(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(go)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>N(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(go))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||N(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Ee}}),pa=z("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),ge=z("web.navigator","service","1.0.0","one",e=>N(e)&&F(e,"open"),void 0,{open:{args:e=>_(e,[lr]),result:Ee}}),bo=z("selection.textAction","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&F(e,"run"),e=>[e.id]),fa=z("geo.navigator","service","1.0.0","one",e=>N(e)&&F(e,"open"),void 0,{open:{args:e=>_(e,[ur]),result:Ee}}),ga=z("geo.search","service","1.0.0","one",e=>N(e)&&F(e,"search")&&F(e,"reverse"),void 0,{search:{args:e=>_(e,[w]),result:pr},reverse:{args:e=>_(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:fr}}),ma=z("agent.toolProvider","service","1.0.0","many",e=>N(e)&&Array.isArray(e.tools)&&e.tools.every(hr)&&F(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>_(e,[w,N,gr]),result:mr}},e=>({tools:e.tools}),"global"),ha=z("guard.runtime","service","1.0.0","one",e=>N(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>F(e,t)),void 0,{resolve:{args:e=>_(e,[N]),result:N},requestApproval:{args:e=>_(e,[N]),result:De},consumeToken:{args:e=>e.length>=1&&e.length<=2&&w(e[0])&&B(e[1]),result:De},audit:{args:e=>_(e,[N]),result:Ee}}),ba=z("browser.automation","service","1.0.0","one",e=>N(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>F(e,t)),void 0,{list:{args:e=>e.length===0,result:K},open:{args:e=>_(e,[w]),result:K},switch:{args:e=>_(e,[w]),result:K},close:{args:e=>_(e,[w]),result:K},snapshot:{args:e=>_(e,[w]),result:K},readText:{args:e=>e.length>=1&&e.length<=2&&w(e[0])&&ar(e[1]),result:K},readHtml:{args:e=>_(e,[w]),result:K},screenshot:{args:e=>_(e,[w]),result:K},click:{args:e=>_(e,[w,t=>typeof t=="number"]),result:K},type:{args:e=>e.length>=3&&e.length<=4&&w(e[0])&&typeof e[1]=="number"&&w(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:K},select:{args:e=>_(e,[w,t=>typeof t=="number",w]),result:K},scroll:{args:e=>_(e,[w,t=>typeof t=="number",t=>typeof t=="number"]),result:K},pressKey:{args:e=>_(e,[w,w]),result:K},navigate:{args:e=>_(e,[w,w]),result:K},back:{args:e=>_(e,[w]),result:K},forward:{args:e=>_(e,[w]),result:K},reload:{args:e=>_(e,[w]),result:K}}),ya=z("fileTree.contextItem","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&typeof e.label=="string"&&B(e.labelKey)&&F(e,"run"),e=>[e.id]),va=z("newTab.entry","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&F(e,"run"),e=>[e.id]),yo=z("search.resultCard","extension","1.0.0","many",e=>N(e)&&typeof e.cardKind=="string"&&F(e,"render")&&F(e,"open"),e=>[e.cardKind]),wa=z("metadataPanel.segment","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&F(e,"render"),e=>[e.id]),vo=z("workspace.surface","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&F(e,"getSnapshot")&&F(e,"subscribe")&&F(e,"restore"),e=>[e.id]),Na=z("metadata.plugin","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&F(e,"facts"),e=>[e.id]),Sa=z("workspace.viewState","extension","1.0.0","many",e=>N(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&F(e,"capture")&&F(e,"restore")&&F(e,"subscribe"),e=>[e.id]);var vr=[".csv"],wr=[".base"],Nr=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Sr=[".pdf"],xr=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Ar=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],kr=[".stl",".obj",".glb",".gltf"];function Er(e){let t=e.split("/").pop()??e,o=t.lastIndexOf(".");return o>0?t.slice(o).toLowerCase():""}var Tr={type:"core",id:"valley"},E=(e,t,o,r,i={})=>({kind:e,icon:t,viewer:o,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:r,owner:Tr,...i});function Cr(e){let t={};for(let[o,r]of e)for(let i of o)t[i]=r;return t}var Pr=Cr([[[".md",".markdown"],E("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],E("text","text","text","notes")],[[".json"],E("json","json","json","data",{editable:!0})],[[".jsonl"],E("json","json","jsonl","data",{editable:!0})],[vr,E("csv","csv","csv","data",{editable:!0})],[wr,E("base","base","fallback","data")],[Nr,E("image","image","image","media",{information:["identity","dimensions","exif"]})],[Sr,E("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[xr,E("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Ar,E("video","video","video","media",{information:["identity","media","video-codec"]})],[kr,E("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],E("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],E("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],E("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],E("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],E("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],E("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],E("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],E("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],E("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],E("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],E("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],E("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],E("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],E("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],E("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],E("code","code","code","code",{codeLanguage:"Go"})],[[".java"],E("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],E("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],E("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],E("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],E("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],E("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],E("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],E("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],E("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Ir=E("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function _r(e){return Pr[Er(e)]??Ir}function me(e){return _r(e).kind}var n,h,ce=0;function wo(e){ce++,h=e,n=e.React}function wt(){return h.runtime.getOrCreate("sideNotes.editRequest",()=>{let e=null,t=new Set;return{get:()=>e,publish:o=>{e=o;for(let r of t)r()},subscribe:o=>(t.add(o),()=>{t.delete(o)})}})}function Nt(){return h.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let o of[...e.listeners])o()},consume:t=>{if(e.value===t){e.value=null;for(let o of[...e.listeners])o()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function W(e){let t=(e??"").trim();if(!t)return"";try{let o=new URL(t);o.hash="",o.protocol=o.protocol.toLowerCase(),o.hostname=o.hostname.toLowerCase(),o.pathname==="/"&&(o.pathname="");let r=o.toString();return o.search?r:r.replace(/\/$/,"")}catch{return t}}function Me(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var Re="sideNotes.notes",Ht="sideNotes.note_tags",qt="sideNotes.path_history",St=100,Dr=32,No=4096,Mr=4*1024*1024;function Rr(e){return e?e.kind==="none"?"none":e.kind==="ids"?JSON.stringify(["ids",[...new Set(e.ids)].sort()]):JSON.stringify(e.kind==="file"?["file",e.path,e.includeWeb===!0]:["web",W(e.url)]):"all"}async function So(e){let t=await Promise.allSettled(e),o=t.find(r=>r.status==="rejected");if(o?.status==="rejected")throw o.reason;return t.map(r=>r.value)}var xt=class{constructor(t,o,r){R(this,"api",t);R(this,"isCurrent",o);R(this,"normalize",r);R(this,"revision",0);R(this,"catalogRevision",0);R(this,"catalog",null);R(this,"catalogKeys",new Set);R(this,"dirtyKeys",new Set);R(this,"sourceRevision",null);R(this,"vaultGeneration",null);R(this,"catalogPending",null);R(this,"pending",new Map);R(this,"disposed",!1);R(this,"disposers");R(this,"listeners",new Set);this.disposers=[Re,Ht,qt].map(i=>t.data.dataset(i).subscribe(a=>{if(!this.isActive())return;this.revision++;let c=this.vaultGeneration!==null&&this.vaultGeneration!==a.vaultGeneration;if(this.vaultGeneration=a.vaultGeneration,c&&(this.catalogRevision++,this.sourceRevision=null,this.resetCatalog()),i===Re&&(this.catalogRevision++,this.changeSubjects(a)),this.isActive())for(let s of this.listeners)s()})),this.disposers.push(t.subscribe(()=>{this.isCurrent()||this.dispose()}))}isActive(){return!this.disposed&&this.isCurrent()}subscribe(t){return this.isActive()?(this.listeners.add(t),()=>{this.listeners.delete(t)}):()=>{}}dispose(){if(!this.disposed){this.disposed=!0,this.resetCatalog(),this.listeners.clear();for(let t of this.disposers)t();this.disposers=[]}}assertActive(){if(!this.isActive())throw new Error("SideNotes reader is no longer active")}resetCatalog(){this.catalog=null,this.catalogKeys.clear(),this.dirtyKeys.clear()}changeSubjects(t){let o=this.sourceRevision;if(this.sourceRevision=Number.isSafeInteger(t.revision)&&t.revision>=0?t.revision:null,!this.catalog||o===null||this.sourceRevision!==o+1||!t.keys?.length||t.keys.length>No){this.resetCatalog();return}for(let r of t.keys){if(!r||typeof r!="object"||Array.isArray(r)||Object.keys(r).length!==1||typeof r.id!="string"||!this.catalogKeys.has(r.id)){this.resetCatalog();return}this.dirtyKeys.add(r.id)}}retainSubjects(t){if(this.resetCatalog(),t.length>No)return;let o=0;for(let r of t){if(typeof r.id!="string"||this.catalogKeys.has(r.id)){this.resetCatalog();return}this.catalogKeys.add(r.id);for(let i of["id","path","url"])typeof r[i]=="string"&&(o+=r[i].length*2);if(o>Mr){this.resetCatalog();return}}this.catalog=t}async rows(t,o={},r){let i=[],a;do{this.assertActive();let c=await this.api.data.dataset(t).query({...o,limit:1e3,cursor:a});this.assertActive(),r?.(c.revision),i.push(...c.rows),a=c.cursor}while(a);return i}subjects(){if(this.catalogPending)return this.catalogPending;if(this.catalog&&!this.dirtyKeys.size)return Promise.resolve(this.catalog);let t=(async()=>{for(;;){let r=this.catalogRevision,i=this.catalog,a=[...this.dirtyKeys],c=this.sourceRevision,s,d=f=>{if(!Number.isSafeInteger(f)||f<0||s!==void 0&&f!==s)throw new Error("SideNotes catalog changed during read");s=f};try{let f;if(i){let p=new Map;for(let x=0;x<a.length;x+=St){let A=a.slice(x,x+St),D=await this.rows(Re,{select:["id","path","url"],where:{id:{in:A}}},d);for(let b of D){if(typeof b.id!="string"||!A.includes(b.id))throw new Error("Invalid SideNotes catalog key");p.set(b.id,b)}if(r!==this.catalogRevision)break}if(r!==this.catalogRevision)continue;if(s!==c){this.resetCatalog();continue}let g=new Set(a);f=i.flatMap(x=>{if(!g.has(String(x.id)))return[x];let A=p.get(String(x.id));return A?[A]:[]})}else f=await this.rows(Re,{select:["id","path","url"]},d);if(this.assertActive(),r!==this.catalogRevision)continue;if(s===void 0||c!==null&&s<c)throw new Error("SideNotes catalog revision is unavailable");return this.sourceRevision=s,this.retainSubjects(f),f}catch(f){if(this.assertActive(),r!==this.catalogRevision)continue;throw this.resetCatalog(),f}}})();this.catalogPending=t;let o=()=>{this.catalogPending===t&&(this.catalogPending=null)};return t.then(o,o),t}async read(t){let o=[],r=[],i=[];if(!t)[o,r,i]=await So([this.rows(Re),this.rows(Ht),this.rows(qt)]);else{let s=t.kind==="web"?W(t.url):t.kind==="file"?t.path:"",d=t.kind==="ids"?new Set(t.ids):null;if(!s&&!d?.size)return[];let f=(await this.subjects()).filter(p=>{if(d)return typeof p.id=="string"&&d.has(p.id.trim());if(t.kind==="file"&&(typeof p.path!="string"||p.path.trim()!==s))return!1;let g=W(typeof p.url=="string"?p.url:"");return t.kind==="web"?g===s:t.kind==="file"&&t.includeWeb===!0||!g}).map(p=>p.id).filter(p=>typeof p=="string"&&!!p.trim());for(let p=0;p<f.length;p+=St){let g=f.slice(p,p+St),[x,A,D]=await So([this.rows(Re,{where:{id:{in:g}}}),this.rows(Ht,{where:{noteId:{in:g}}}),this.rows(qt,{where:{noteId:{in:g}}})]);o.push(...x),r.push(...A),i.push(...D)}}let a=new Map;for(let s of r){if(typeof s.noteId!="string")continue;let d=a.get(s.noteId);d?d.push(s.tag):a.set(s.noteId,[s.tag])}let c=new Map;for(let s of i){if(typeof s.noteId!="string")continue;let d=c.get(s.noteId);d?d.push(s):c.set(s.noteId,[s])}for(let s of c.values())s.sort((d,f)=>Number(d.position)-Number(f.position));return o.map(s=>this.normalize({...s,tags:a.get(String(s.id))??[],pathHistory:(c.get(String(s.id))??[]).map(d=>d.path)})).filter(s=>s!==null)}load(t){if(!this.isActive())return Promise.reject(new Error("SideNotes reader is no longer active"));let o=Rr(t),r=this.pending.get(o);if(r)return r;if(this.pending.size>=Dr)return Promise.reject(new Error("Too many SideNotes reads"));let i=t?.kind==="ids"?{kind:t.kind,ids:[...t.ids]}:t?{...t}:void 0,a=(async()=>{for(;;){this.assertActive();let s=this.revision;try{let d=await this.read(i);if(this.assertActive(),s===this.revision)return d}catch(d){if(this.assertActive(),s===this.revision)throw d}}})();this.pending.set(o,a);let c=()=>{this.pending.get(o)===a&&this.pending.delete(o)};return a.then(c,c),a}};var At="sideNotes.notes",Ye="sideNotes.note_tags",Zt="sideNotes.path_history";function Ao(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Je(){return new Date().toISOString()}function q(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function ee(e){return typeof e=="string"?e:""}function Or(e){if(!e||typeof e!="object")return{type:"none"};let t=e,o=ee(t.type);if(o==="pdf-page"){let r=ee(t.snippet).trim();return{type:o,page:Math.max(1,Math.floor(q(t.page,1))),...r?{snippet:r}:{}}}if(o==="pdf-region")return{type:o,page:Math.max(1,Math.floor(q(t.page,1))),x:q(t.x,0),y:q(t.y,0),width:q(t.width,.2),height:q(t.height,.2)};if(o==="media-time")return{type:o,seconds:Math.max(0,q(t.seconds,0))};if(o==="markdown-line"){let r=ee(t.snippet).trim();return{type:o,line:Math.max(1,Math.floor(q(t.line,1))),...r?{snippet:r}:{}}}if(o==="markdown-heading"){let r=ee(t.heading).trim();return r?{type:o,heading:r,line:t.line===void 0?void 0:Math.max(1,Math.floor(q(t.line,1)))}:{type:"none"}}if(o==="markdown-snippet"){let r=ee(t.snippet).trim();return r?{type:o,snippet:r,line:t.line===void 0?void 0:Math.max(1,Math.floor(q(t.line,1)))}:{type:"none"}}if(o==="image-region")return{type:o,x:q(t.x,0),y:q(t.y,0),width:q(t.width,.25),height:q(t.height,.25)};if(o==="web-selection"){let r=ee(t.snippet).trim();return r?{type:o,snippet:r}:{type:"none"}}return{type:"none"}}function Fr(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function Lr(e){let t=ee(e.id).trim(),o=ee(e.path).trim(),r=W(ee(e.url)),i=ee(e.note).trim();if(!t||!i||!o&&!r)return null;let a=ee(e.createdAt)||Je(),c=Array.isArray(e.pathHistory)?e.pathHistory.filter(s=>typeof s=="string"&&s!==o):[];return{id:t,path:o,note:i,...r?{url:r}:{},pathHistory:[...new Set(c)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()):[],anchor:Or(e.anchor),fileKey:Fr(e.fileKey),createdAt:a,updatedAt:ee(e.updatedAt)||a}}function Z(e=h,t){let o=ce,r=()=>{if(t?.(),e!==h||o!==ce)throw new Error("SideNotes mutation session is no longer active")};r();let i=ue();return{api:e,reader:i,isActive:()=>{try{return r(),i.isActive()}catch{return!1}},assertActive:()=>{if(r(),!i.isActive())throw new Error("SideNotes mutation session is no longer active")}}}function le(e){return{...e,tags:[...e.tags],pathHistory:[...e.pathHistory],anchor:{...e.anchor},...e.fileKey?{fileKey:{...e.fileKey}}:{}}}async function ko(e,t){if(t.assertActive(),!e.path)return e;let o=await t.api.vault.stat(e.path);return t.assertActive(),o?{...e,fileKey:{dev:o.dev,ino:o.ino}}:e}function Eo(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function xo(e,t,o){let r=[],i;do{e.assertActive();let a=await e.api.data.dataset(t).query({where:o,limit:1e3,cursor:i});e.assertActive(),r.push(...a.rows),i=a.cursor}while(i);return r}function To(e){return[...e.tags.map(t=>({dataset:Ye,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,o)=>({dataset:Zt,operation:"insert",values:{noteId:e.id,position:o,path:t}}))]}async function zr(e,t){let o=await Promise.allSettled([xo(e,Ye,{noteId:t}),xo(e,Zt,{noteId:t})]),r=o.find(c=>c.status==="rejected");if(r?.status==="rejected")throw r.reason;e.assertActive();let[i,a]=o.map(c=>c.value);return[...i.map(c=>({dataset:Ye,operation:"delete",key:{noteId:t,tag:String(c.tag)}})),...a.map(c=>({dataset:Zt,operation:"delete",key:{noteId:t,position:Number(c.position)}}))]}function ue(){let e=h,t=ce,o=e.getState().vault?.path??null,r=e.runtime.getOrCreate("sideNotes.noteRepository",()=>({current:null}));return r.current?.isActive()||(r.current?.dispose(),r.current=new xt(e,()=>{if(e!==h||t!==ce)return!1;try{return(e.getState().vault?.path??null)===o}catch{return!1}},i=>Lr(i))),r.current}function kt(e,t,o,r=[]){let i=Je();return{id:Ao(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:r,anchor:o,createdAt:i,updatedAt:i}}function Et(e,t,o,r=[]){let i=Je();return{id:Ao(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:r,anchor:o,createdAt:i,updatedAt:i}}async function Oe(e,t=Z()){let o=await ko(le(e),t);try{return t.assertActive(),await t.api.data.transaction([{dataset:At,operation:"insert",values:Eo(o)},...To(o)]),!0}catch{return!1}}async function ie(e,t,o,r,i=Z()){let a=r?{...r}:void 0,c=await ko({...le(t),id:e},i);try{i.assertActive();let s={pluginId:i.api.pluginId,sourceId:"notes",itemId:e},d=await i.api.documents.read(s);if(i.assertActive(),!d)return!1;if(o!==void 0){let g=await i.api.data.dataset(At).get({id:e});if(i.assertActive(),g?.updatedAt!==o)return!1}let f=Eo(c);delete f.id,delete f.note;let p=await zr(i,e);return i.assertActive(),await i.api.documents.update(s,{expectedRevision:a?.expectedRevision??d.revision,vaultGeneration:a?.vaultGeneration??d.vaultGeneration,body:c.note,explicitTags:c.tags,operations:[{dataset:At,operation:"update",key:{id:e},values:f},...p.filter(g=>g.dataset!==Ye),...To(c).filter(g=>g.dataset!==Ye)]}),!0}catch{return!1}}async function he(e,t=Z()){try{return t.assertActive(),(await t.api.data.dataset(At).delete({id:e})).affected>0}catch{return!1}}async function Co(e,t,o=Z()){try{if(!e||!t||e===t)return;o.assertActive();let r=await o.reader.load();o.assertActive();let i=`${e}/`;for(let a of r){if(a.path!==e&&!a.path.startsWith(i))continue;let c=a.path===e?t:`${t}/${a.path.slice(i.length)}`,s={...a,path:c,pathHistory:[a.path,...a.pathHistory.filter(d=>d!==a.path)],updatedAt:Je()};o.assertActive(),await ie(a.id,s,void 0,void 0,o),o.assertActive()}}catch(r){if(o.isActive())throw r}}async function Po(e,t,o,r=Z()){try{if(!Number.isFinite(o)||o===0||!e)return;let i=Math.max(1,Math.floor(t));r.assertActive();let a=await r.reader.load();r.assertActive();for(let c of a){if(c.path!==e||c.anchor.type!=="markdown-line"||c.anchor.line<i)continue;let s={...c,anchor:{...c.anchor,line:Math.max(1,c.anchor.line+o)},updatedAt:Je()};r.assertActive(),await ie(c.id,s,void 0,void 0,r),r.assertActive()}}catch(i){if(r.isActive())throw i}}var Io={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var jr=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Vr=/^-\s+(.*)$/,Ur=/^[A-Za-z][\w+.-]*:\/\//;function _o(e){let t={bare:null,values:{},lists:{}},o=null;for(let r of e.split(`
`)){let i=r.trim();if(!i||i.startsWith("#"))continue;let a=i.match(Vr);if(a){o?t.lists[o].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let c=Ur.test(i)?null:i.match(jr);if(c){let s=c[1].trim().toLowerCase(),d=c[2].trim();d===""?(o=s,t.lists[s]=t.lists[s]??[]):(o=null,t.values[s]=d);continue}o=null,t.bare===null&&(t.bare=i)}return t}function Do(e,t,o=500){let r=e.values[t];if(r===void 0)return null;let i=Number.parseInt(r,10);return!Number.isFinite(i)||i<1?null:Math.min(i,o)}var Mo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-vault browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"File extensions available in the SideNotes filter. Add, remove or reorder them.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Web","sideNotes.error.load":"Could not load SideNotes. Try again.","sideNotes.action.retry":"Retry"};var Ro={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem vault-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Im SideNotes-Filter verf\xFCgbare Dateierweiterungen. Du kannst sie hinzuf\xFCgen, entfernen oder neu anordnen.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.web":"Internet","sideNotes.error.load":"SideNotes konnten nicht geladen werden. Versuche es erneut.","sideNotes.action.retry":"Erneut versuchen"};var Oo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda la b\xF3veda.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Extensiones de archivo disponibles en el filtro de SideNotes. Puedes a\xF1adirlas, eliminarlas o reordenarlas.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.web":"Sitio web","sideNotes.error.load":"No se pudieron cargar las SideNotes. Int\xE9ntalo de nuevo.","sideNotes.action.retry":"Reintentar"};var Fo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le coffre.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Extensions de fichier disponibles dans le filtre SideNotes. Vous pouvez les ajouter, les supprimer ou les r\xE9organiser.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.web":"Site web","sideNotes.error.load":"Impossible de charger les SideNotes. R\xE9essayez.","sideNotes.action.retry":"R\xE9essayer"};var Lo={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8\u4ED3\u5E93\u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"SideNotes \u7B5B\u9009\u5668\u4E2D\u53EF\u7528\u7684\u6587\u4EF6\u6269\u5C55\u540D\u3002\u53EF\u4EE5\u6DFB\u52A0\u3001\u5220\u9664\u6216\u91CD\u65B0\u6392\u5E8F\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.web":"\u7F51\u9875","sideNotes.error.load":"\u65E0\u6CD5\u52A0\u8F7D SideNotes\u3002\u8BF7\u91CD\u8BD5\u3002","sideNotes.action.retry":"\u91CD\u8BD5"};var zo={en:Mo,de:Ro,es:Oo,fr:Fo,"zh-CN":Lo};function $o(e,t){return(zo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(r,i)=>String(t?.[i]??""))}var jo=$o;function Vo(e){e.ui.registerCatalogs(zo),jo=(t,o)=>{let r=e.ui.t(t,o);return r===t?$o(t,o):r}}function u(e,t){return jo(e,t)}function Uo(){let[e]=n.useState(()=>{let t=h,o=ue(),r=t.getState().activePath;return{getSnapshot:()=>(o.isActive()&&(r=t.getState().activePath),r),subscribe:i=>{if(!o.isActive())return()=>{};let a=!0,c=t.subscribe(()=>{a&&o.isActive()&&i()});return()=>{a=!1,c()}}}});return n.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ko(){let[e]=n.useState(()=>{let t=h,o=ue(),r=t.interop.state.get(vt),i=r?{...r}:null;return{getSnapshot:()=>{if(o.isActive()){let a=t.interop.state.get(vt);a?(!i||a.instanceId!==i.instanceId||a.url!==i.url||a.title!==i.title)&&(i={...a}):i=null}return i},subscribe:a=>{if(!o.isActive())return()=>{};let c=!0,s=t.interop.state.subscribe(vt,()=>{c&&o.isActive()&&a()});return()=>{c=!1,s()}}}});return n.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Fe(e){let[t]=n.useState(ue),[o,r]=n.useState([]),[i,a]=n.useState(!0),[c,s]=n.useState(null),d=n.useRef(!1),f=n.useRef(0),p=e?.kind??"all",g=e?.kind==="file"?e.path:e?.kind==="web"?W(e.url):"",x=e?.kind==="file"&&e.includeWeb===!0,A=n.useCallback(()=>{if(!d.current||!t.isActive())return;let D=++f.current,b=p==="all"?void 0:p==="file"?{kind:p,path:g,includeWeb:x}:p==="web"?{kind:p,url:g}:{kind:p};t.load(b).then(k=>{!d.current||!t.isActive()||D!==f.current||(r(k),s(null),a(!1))}).catch(()=>{!d.current||!t.isActive()||D!==f.current||(s(u("sideNotes.error.load")),a(!1))})},[p,g,x,t]);return n.useEffect(()=>{d.current=!0,r([]),a(!0),s(null);let D=t.subscribe(A);return A(),()=>{d.current=!1,f.current++,D()}},[A,t]),{notes:o,setNotes:r,loading:i,error:c,reload:A}}function Wo(){let[e,t]=n.useState(new Set),o=n.useCallback(i=>e.has(i),[e]),r=n.useCallback((i,a)=>{t(c=>{let s=new Set(c);return a?s.add(i):s.delete(i),s})},[]);return{isPending:o,setPending:r,pending:e}}var Xt="notes-sidenotes-fence-styles";function qr(){if(document.getElementById(Xt))return;let e=document.createElement("style");e.id=Xt,e.textContent=`
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
`,document.head.appendChild(e)}var Go=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?u("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},Zr=({code:e,path:t})=>{let o=_o(e),r=o.values.file??o.bare??t,i=o.values.url?W(o.values.url):null,a=(o.values.flagged??"").toLowerCase()==="true",c=o.values.tag?o.values.tag.replace(/^#/,"").toLowerCase():null,s=Do(o,"limit",100)??20,{notes:d,loading:f,error:p,reload:g}=Fe(i?{kind:"web",url:i}:r?{kind:"file",path:r,includeWeb:!0}:a?void 0:{kind:"none"});if(p)return n.createElement("div",{className:"sidenotes-fence-empty",role:"alert"},p," ",n.createElement("button",{type:"button",onClick:g},u("sideNotes.action.retry")));if(f)return n.createElement("div",{className:"sidenotes-fence-empty"},u("auto.33ce417454bf"));let x=d.filter(b=>i?b.url===i:r?!(b.path!==r||a&&b.flagged!==!0||c&&!b.tags.some(k=>k.replace(/^#/,"").toLowerCase()===c)):a?b.flagged===!0:!1).slice(0,s),A=()=>{h.workspace.revealOwnPanel("right_sidebar")},D=i??(r?r.split("/").pop():a?"flagged":null);return n.createElement(n.Fragment,null,n.createElement("div",{className:"sidenotes-fence-head",onClick:A,title:u("auto.954a9a37711e")},n.createElement("span",{className:"t"},u("auto.746eb1a86a79")," ",D?` \xB7 ${D}`:""),n.createElement("span",{className:"c"},x.length)),x.length===0&&n.createElement("div",{className:"sidenotes-fence-empty"},u("auto.f545c86bbd6e")),x.map(b=>n.createElement("div",{key:b.id,className:"sidenotes-fence-note",onClick:A},n.createElement(h.ui.MarkdownView,{className:"body",value:b.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:b.id},sourcePath:b.path||void 0}}),n.createElement("div",{className:"meta"},b.flagged&&n.createElement("span",{className:"flag"},"\u2691"),Go(b)&&n.createElement("span",null,Go(b)),b.tags.slice(0,3).map(k=>n.createElement("span",{key:k},"#",k.replace(/^#/,"")))))))};function Bo(){let e=h.markdown.registerCodeBlockRenderer("sidenotes",(t,o,r)=>(qr(),o.classList.add("sidenotes-fence"),h.ui.renderReact(o,n.createElement(Zr,{code:t,path:r.path}))),{examples:Io.sidenotes});return()=>{e(),document.getElementById(Xt)?.remove()}}var G=e=>n.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?n.createElement("title",null,e.title):null,e.children),Ho=e=>n.createElement(G,{...e},n.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),n.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),qo=e=>n.createElement(G,{...e},n.createElement("path",{d:"M12 5v14M5 12h14"})),Le=e=>n.createElement(G,{...e},n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),n.createElement("path",{d:"M2 12h20"})),Tt=e=>n.createElement(G,{...e},n.createElement("circle",{cx:"11",cy:"11",r:"8"}),n.createElement("path",{d:"m21 21-4.3-4.3"})),Zo=e=>n.createElement(G,{...e},n.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),Ct=e=>n.createElement(G,{...e},n.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Te=e=>n.createElement(G,{...e},n.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),n.createElement("path",{d:"M4 22v-7"})),Xo=e=>n.createElement(G,{...e},n.createElement("circle",{cx:"12",cy:"12",r:"1"}),n.createElement("circle",{cx:"19",cy:"12",r:"1"}),n.createElement("circle",{cx:"5",cy:"12",r:"1"})),Yo=e=>n.createElement(G,{...e},n.createElement("path",{d:"M12 20h9"}),n.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Jo=e=>n.createElement(G,{...e},n.createElement("path",{d:"M3 6h18"}),n.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),n.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),Yt=e=>n.createElement(G,{...e},n.createElement("path",{d:"M20 6 9 17l-5-5"})),Qo=e=>n.createElement(G,{...e},n.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),n.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),n.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),en=e=>n.createElement(G,{...e},n.createElement("circle",{cx:"12",cy:"12",r:"8"}),n.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),n.createElement("circle",{cx:"12",cy:"12",r:"2"})),ze=e=>n.createElement(G,{...e},n.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),n.createElement("path",{d:"M12 9v4M12 17h.01"})),$e=e=>n.createElement(G,{...e},n.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),n.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),je=e=>n.createElement(G,{...e},n.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),n.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var nn=4,Xr=32,Yr=32,tn=8*1024*1024,on=new WeakMap;function rn(e){for(;e.active<nn&&e.tasks.length;){let t=e.tasks.shift();e.active++,t.read().then(t.resolve,t.reject).finally(()=>{e.active--,rn(e)})}}var ae=class extends Error{constructor(){super("SideNotes anchor reader is no longer active")}},te=class{constructor(t=h){R(this,"owner",t);R(this,"generation");R(this,"root");R(this,"disposed",!1);R(this,"unsubscribe",()=>{});R(this,"queue");R(this,"bytes",0);R(this,"cache",new Map);R(this,"pending",new Map);this.generation=ce,this.root=t.getState().vault?.path??null,this.queue=on.get(t)??{active:0,tasks:[]},on.set(t,this.queue),this.unsubscribe=t.subscribe(()=>{this.isActive()||this.dispose()})}isActive(){if(this.disposed||this.owner!==h||this.generation!==ce)return!1;try{return(this.owner.getState().vault?.path??null)===this.root}catch{return!1}}assertActive(){if(!this.isActive())throw new ae}dispose(){this.disposed||(this.disposed=!0,this.unsubscribe(),this.cache.clear(),this.bytes=0,this.queue.tasks=this.queue.tasks.filter(t=>t.owner!==this?!0:(t.reject(new ae),!1)),this.pending.clear())}file(t){return this.request(JSON.stringify(["file",t]),()=>this.owner.vault.readFile(t))}page(t,o){return this.request(JSON.stringify(["page",t,o]),()=>this.owner.workspace.getPdfPageText(t,o))}pageCount(t){this.assertActive();let o=this.owner.workspace.getPdfPageCount(t);return this.assertActive(),o}mediaDuration(){this.assertActive();let t=this.owner.workspace.getMediaDuration();return this.assertActive(),t}request(t,o){if(!this.isActive())return Promise.reject(new ae);let r=this.cache.get(t);if(r)return this.cache.delete(t),this.cache.set(t,r),Promise.resolve(r.value);let i=this.pending.get(t);if(i)return i;if(this.queue.active>=nn&&this.queue.tasks.length>=Xr)return Promise.reject(new Error("Too many SideNotes anchor reads"));let a,c=async()=>{this.assertActive();let f=await o();this.assertActive();let p=2*(t.length+(f?.length??0));if(p<=tn){for(;this.cache.size>=Yr||this.bytes+p>tn;){let[g,x]=this.cache.entries().next().value;this.cache.delete(g),this.bytes-=x.bytes}this.cache.set(t,{value:f,bytes:p}),this.bytes+=p}return f},s=new Promise((f,p)=>{a={owner:this,read:c,resolve:f,reject:p}});this.pending.set(t,s);let d=()=>{this.pending.get(t)===s&&this.pending.delete(t)};return s.then(d,d),this.queue.tasks.push(a),rn(this.queue),s}};var et={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function ot(){return["none","web-selection"]}function Qt(e){let t=me(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function sn(e,t,o){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=o;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let r=e.line??0;return!!t.lineRange&&r>=1&&r>=t.lineRange.from&&r<=t.lineRange.to}return!1}function dn(e,t){let o=me(e);return o==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:o==="video"||o==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:o==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function nt(e){let t=me(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function tt(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var Pt=1e7,Qe=1e6,Jr=Pt-1,an=Pt-2;function be(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function Jt(e,t){if(e.type==="pdf-page"){let o=e.page*Pt,r=e.snippet?be(e.snippet):"";if(!r||t==null)return o;let i=be(t).indexOf(r);return o+(i>=0?Math.min(i,an):Jr)}if(e.type==="pdf-region")return e.page*Pt+Math.max(0,Math.min(e.y,an));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let o=e.snippet?be(e.snippet):"";if(o&&t!=null){let r=t.replace(/\r\n?/g,`
`).split(`
`);for(let i=0;i<r.length;i++){let a=be(r[i]).indexOf(o);if(a>=0)return(i+1)*Qe+Math.min(a,Qe-1)}}return(e.line??0)*Qe}if(e.type==="markdown-line"||e.type==="markdown-heading"){let o=e.line??0,r=o*Qe,i=e.type==="markdown-heading"?"":e.snippet?be(e.snippet):"";if(!i||t==null||o<1)return r;let a=t.replace(/\r\n?/g,`
`).split(`
`)[o-1];if(a==null)return r;let c=be(a).indexOf(i);return r+(c>=0?Math.min(c,Qe-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}function cn(e,t,o){let r=o.get(e.id)??tt(e.anchor),i=o.get(t.id)??tt(t.anchor);return r!==i?r-i:t.createdAt.localeCompare(e.createdAt)}function Ve(e){let t=Math.max(0,Math.floor(e)),o=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return o>0?`${o}:${String(r).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${r}:${String(i).padStart(2,"0")}`}function ye(e){return e.type==="pdf-page"?u("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?u("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?Ve(e.seconds):e.type==="markdown-line"?u("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?u(et["image-region"]):e.type==="web-selection"?e.snippet||u(et["web-selection"]):u(et.none)}function ln(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function eo(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let r=t.split(":").map(a=>Number(a));if(r.some(a=>!Number.isFinite(a)||a<0))return null;let i=r.reduce((a,c)=>a*60+c,0);return Number.isFinite(i)?i:null}let o=Number(t);return Number.isFinite(o)&&o>=0?o:null}async function It(e,t,o){if(o?.assertActive(),t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let r=o?await o.file(e):await h.vault.readFile(e);if(o?.assertActive(),!r)return t;let i=r.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let s=i[t.line-1]?.trim().slice(0,160);return s?{...t,snippet:s}:t}if(t.type==="markdown-heading"){let s=t.heading.trim().toLowerCase(),d=i.findIndex(f=>f.replace(/^#+\s*/,"").trim().toLowerCase()===s);return d>=0?{...t,line:d+1}:t}let a=t.snippet.trim(),c=a?i.findIndex(s=>s.includes(a)):-1;return c>=0?{...t,line:c+1}:t}async function un(e,t,o){if(o?.assertActive(),!["pdf-page","media-time","markdown-line","markdown-heading","markdown-snippet"].includes(t.type))return"ok";let r=o??new te;try{if(r.assertActive(),t.type==="pdf-page"){let a=r.pageCount(e);if(typeof a=="number"&&t.page>a)return"missing";let c=t.snippet?await r.page(e,t.page):null;return r.assertActive(),pn(t,a,c)}if(t.type==="media-time"){let a=r.mediaDuration();return typeof a=="number"&&t.seconds>a?"missing":"ok"}let i=await r.file(e);return r.assertActive(),fn(t,i)}finally{o||r.dispose()}}function pn(e,t,o){return typeof t=="number"&&e.page>t||e.snippet&&o!==null&&!be(o).includes(be(e.snippet))?"missing":"ok"}function fn(e,t,o=t?.replace(/\r\n?/g,`
`).split(`
`)??[]){if(!t)return"ok";if(e.type==="markdown-line")return e.line<=o.length?"ok":"missing";if(e.type==="markdown-heading"){let a=e.heading.trim().toLowerCase();return o.some(c=>c.replace(/^#+\s*/,"").trim().toLowerCase()===a)?"ok":"missing"}if(e.type!=="markdown-snippet")return"ok";let r=e.snippet.trim();if(!r)return"ok";let i=o.filter(a=>a.includes(r)).length;return i===0?"missing":i>1?"ambiguous":"ok"}async function _t(e,t,o={}){let r=new Map,i=new Map,a=new Map;for(let c of e){t.assertActive();let s=o.path??c.url??c.path,d=c.anchor;if(d.type==="pdf-page"||d.type==="markdown-line"||d.type==="markdown-heading"||d.type==="markdown-snippet"){let f=d.type==="pdf-page"?d.page:void 0,p=JSON.stringify([s,f??"file"]),g=r.get(p)??{path:s,page:f,notes:[]};g.notes.push(c),r.set(p,g)}else{let f=d.type==="media-time"?t.mediaDuration():null;i.set(c,d.type==="media-time"&&typeof f=="number"&&d.seconds>f?"missing":"ok"),o.positions&&a.set(c,Jt(d,null))}}for(let c of r.values())if(t.assertActive(),c.page!==void 0){let s=t.pageCount(c.path),f=c.notes.some(p=>p.anchor.type==="pdf-page"&&!!p.anchor.snippet)&&(o.positions||typeof s!="number"||c.page<=s)?await t.page(c.path,c.page):null;t.assertActive();for(let p of c.notes)i.set(p,pn(p.anchor,s,f)),o.positions&&a.set(p,Jt(p.anchor,f))}else{let s=await t.file(c.path);t.assertActive();let d=s?.replace(/\r\n?/g,`
`).split(`
`)??[];for(let f of c.notes)i.set(f,fn(f.anchor,s,d)),o.positions&&a.set(f,Jt(f.anchor,s))}return t.assertActive(),{statuses:new Map(e.filter(c=>i.get(c)!=="ok").map(c=>[c.id,i.get(c)])),keys:o.positions?new Map(e.map(c=>[c.id,a.get(c)])):new Map}}function rt(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function gn(e){let t=await h.vault.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(o=>/^#+\s/.test(o)).map(o=>o.replace(/^#+\s*/,"").trim()):[]}var pe=e=>typeof e=="string"?e:"",Qr=e=>e===!0,ei=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[];function mn(e){let t=pe(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function ti(e){let t=e.split("/").pop()??e,o=t.lastIndexOf(".");return o>0?t.slice(0,o):t}function oi({record:e,ctx:t}){let{compact:o}=t,r=pe(e.note),i=[...new Set([...ei(e.tags),...t.tags])],a=Qr(e.flagged),c=pe(e.url),s=pe(e.path)||t.path||"",d=e.anchor&&typeof e.anchor=="object"?e.anchor:{type:"none"},f=c?pe(e.anchor?.snippet):d.type!=="none"?ye(d):"",p=r.split(`
`).find(g=>g.trim())?.replace(/^#+\s*/,"").trim();return n.createElement("div",{className:`flagged-note-card search-card${a?" flagged":""}${o?" compact":""}`,onClick:g=>t.onOpen({newTab:h.ui.hasModKey(g)}),title:c||s},n.createElement("div",{className:"flagged-note-header"},n.createElement("div",{className:"flagged-note-meta-row"},n.createElement("div",{className:"flagged-note-meta-left"},f&&n.createElement("span",{className:"flagged-note-anchor"},f)),n.createElement("div",{className:"flagged-note-meta-right"},a&&n.createElement(Te,{className:"sidenote-flag-btn active","aria-hidden":!0}))),n.createElement("span",{className:"flagged-note-file"},c&&n.createElement(Le,{className:"flagged-note-web-icon","aria-hidden":!0}),c?Me(c):ti(s))),o?p&&n.createElement("p",{className:"flagged-note-preview"},p):n.createElement(n.Fragment,null,r.trim()&&n.createElement(h.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:r,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:pe(e.id)},sourcePath:s||void 0}}),i.length>0&&n.createElement("div",{className:"sidenote-tags-view"},i.map(g=>n.createElement("span",{key:g,className:"sidenote-tag-view-pill"},"#",g)))))}function hn(e){let t={cardKind:"sidenote",render:(o,r)=>n.createElement(oi,{record:o,ctx:r}),open:async(o,r)=>{if(pe(o.id)&&!r.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:pe(o.id)}),!0;let i=pe(o.url);if(i)return e.interop.services.providers(ge)[0]?.invoke("open",[{url:i,newTab:r.newTab}]),!0;let a=mn(o.path)||mn(r.path);if(a){let c=o.anchor&&typeof o.anchor=="object"?o.anchor:void 0;return e.workspace.openFile(a,c?.type==="web-selection"?void 0:c,{newTab:r.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(yo,t)}function ni(e){return e.replace(/\s+/g," ").trim()}var bn=200;function ri(e,t){let o=ni(e),r=o.slice(0,bn);if(!t)return r;let i=o.replace(/ /g,"").slice(0,bn).toLowerCase();if(!i)return r;let a=[],c="";for(let d=0;d<t.length;d++)/\s/.test(t[d])||(a.push(d),c+=t[d].toLowerCase());let s=c.indexOf(i);return s<0?r:t.slice(a[s],a[s+i.length-1]+1).trim()}function yn(e,t){let o=e.text.trim(),r=Math.floor(e.page);return!o||!e.path||!Number.isFinite(r)||r<1?null:{kind:"file",path:e.path,page:r,snippet:ri(o,t)}}function vn(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let o=t.text.trim();if(!o)return null;let r=Number(t.page);return!Number.isFinite(r)||r<1?null:{path:e,page:r,text:o}}var X={type:"string"},Nn={type:"array",items:X},Ue=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ce=(e,t={},o=[])=>Ue({type:{const:e},...t},["type",...o]),Sn={oneOf:[Ce("none"),Ce("pdf-page",{page:{type:"integer",minimum:1},snippet:X},["page"]),Ce("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),Ce("markdown-line",{line:{type:"integer",minimum:1},snippet:X},["line"]),Ce("markdown-heading",{heading:X,line:{type:"integer",minimum:1}},["heading"]),Ce("markdown-snippet",{snippet:X,line:{type:"integer",minimum:1}},["snippet"]),Ce("web-selection",{snippet:X},["snippet"])]},ii=Ue({note:{type:"string",minLength:1},tags:Nn,flagged:{type:"boolean"},anchor:Sn});function Ke(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected an object.");return e}function ve(e,t){if(typeof e!="string"||!e.trim())throw new Error(`Expected ${t}.`);return e.trim()}function ai(e){let t=Ke(e),o=i=>{let a=t[i];if(typeof a!="number"||!Number.isInteger(a)||a<1)throw new Error(`Invalid anchor ${i}.`);return a},r=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:o("page"),...r};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw new Error("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:o("line"),...r};case"markdown-heading":return{type:"markdown-heading",heading:ve(t.heading,"heading"),...t.line===void 0?{}:{line:o("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:ve(t.snippet,"snippet"),...t.line===void 0?{}:{line:o("line")}};case"web-selection":return{type:"web-selection",snippet:ve(t.snippet,"snippet")};default:throw new Error("Unsupported editable anchor.")}}function wn(e){let t=Ke(e);if(Object.keys(t).some(r=>!["note","tags","flagged","anchor"].includes(r)))throw new Error("Unsupported SideNote property.");let o={};if(t.note!==void 0&&(o.note=ve(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(r=>typeof r=="string"))throw new Error("Expected a list of tags.");o.tags=[...new Set(t.tags.map(r=>r.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw new Error("Expected a boolean flag.");o.flagged=t.flagged}return t.anchor!==void 0&&(o.anchor=ai(t.anchor)),o}function xn(e){return{...e,...e.tags?{tags:[...e.tags]}:{},...e.anchor?{anchor:{...e.anchor}}:{}}}async function An(e,t,o){o.assertActive();let r=new te(o.api);try{let i=await It(e,t,r);return o.assertActive(),i}finally{r.dispose()}}async function Pe(e,t=Z()){t.assertActive();let o=await t.reader.load({kind:"ids",ids:[e]});t.assertActive();let r=o.find(i=>i.id===e);if(!r)throw new Error("The SideNote no longer exists.");return r}async function to(e,t,o,r,i=Z()){i.assertActive();let a=xn(t),c=r?{...r}:void 0,s=le(await Pe(e,i));if(i.assertActive(),o!==void 0&&s.updatedAt!==o)throw new Error("This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let d=a.anchor??s.anchor;if(a.anchor){if(!(s.url?ot():nt(s.path)).includes(d.type))throw new Error("This anchor does not apply to the SideNote subject.");d=await An(s.path,d,i),i.assertActive()}let f=le({...s,...a,anchor:d,updatedAt:new Date().toISOString()});if(!await ie(e,f,s.updatedAt,c,i))throw new Error("Could not save the SideNote.");return{value:le(f),revert:{label:"Edit SideNote",run:async()=>{if(i.assertActive(),!await ie(e,s,void 0,void 0,i))throw new Error("Could not restore the SideNote.")},reapply:async()=>{if(i.assertActive(),!await ie(e,f,void 0,void 0,i))throw new Error("Could not reapply the SideNote edit.")}}}}async function Dt(e,t,o){let r=Z(e,o);r.assertActive();let i={path:t.path,url:t.url,anchor:{...t.anchor}};if(i.url){let a=e.interop.services.providers(ge)[0];if(!a)throw new Error("A browser provider is unavailable.");let c=await a.invoke("open",[{url:i.url}]);if(r.assertActive(),!c.ok)throw new Error(c.error.message)}else{let a=await e.vault.fileInfo(i.path);if(r.assertActive(),!a)throw new Error("The annotation file no longer exists.");e.workspace.openFile(i.path,i.anchor.type==="web-selection"?void 0:i.anchor)}}function kn(e){let t=!1,o=Z(e,()=>{if(t)throw new Error("SideNotes commands are no longer active")}),r=wt(),i=async s=>{o.assertActive();let d={...s};if(d.id)return Pe(d.id,o);let f=d.path?await e.vault.fileInfo(d.path):{url:d.url};return o.assertActive(),f},a={schema:Ue({id:X},["id"]),parse:s=>({id:ve(Ke(s).id,"SideNote id")}),fromCli:s=>({id:s[0]})},c=[e.commands.register({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:Ue({path:X,url:X,query:X,flagged:{type:"boolean"}}),parse:s=>{let d=s==null?{}:Ke(s);for(let f of["path","url","query"])if(d[f]!==void 0&&typeof d[f]!="string")throw new Error(`Expected ${f} text.`);if(d.flagged!==void 0&&typeof d.flagged!="boolean")throw new Error("Expected a boolean flag.");return{path:d.path,url:d.url,query:d.query,flagged:d.flagged}}},run:async s=>{o.assertActive();let d={...s},f=await o.reader.load();return o.assertActive(),f.filter(p=>(!d.path||p.path===d.path)&&(!d.url||p.url===W(d.url))&&(d.flagged===void 0||!!p.flagged===d.flagged)&&(!d.query||`${p.note} ${p.tags.join(" ")}`.toLowerCase().includes(d.query.toLowerCase())))}}),e.commands.register({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:a,run:({id:s})=>Pe(s,o)}),e.commands.register({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"read",input:a,run:async({id:s})=>{let d=await Pe(s,o);return await Dt(e,d,o.assertActive),o.assertActive(),await e.workspace.revealOwnPanel("right_sidebar"),o.assertActive(),r.publish(d),d}}),e.commands.register({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:Ue({path:X,url:X,note:{type:"string",minLength:1},tags:Nn,anchor:Sn},["note"]),parse:s=>{let d=Ke(s),f=typeof d.path=="string"?d.path.trim():"",p=typeof d.url=="string"?d.url.trim():"";if(!!f==!!p)throw new Error("Provide exactly one file path or URL.");if(p&&!/^https?:\/\//i.test(p))throw new Error("Expected an HTTP or HTTPS URL.");return{path:f,url:p,...wn({note:ve(d.note,"note text"),tags:d.tags,anchor:d.anchor})}}},run:async s=>{o.assertActive();let d=xn(s);if(d.path){let g=await e.vault.fileInfo(d.path);if(o.assertActive(),!g)throw new Error("The annotation file does not exist.")}let f=d.anchor??{type:"none"};if(!(d.url?ot():nt(d.path)).includes(f.type))throw new Error("This anchor does not apply to the annotation subject.");let p=d.url?Et(W(d.url),d.note,f,d.tags):kt(d.path,d.note,await An(d.path,f,o),d.tags);if(o.assertActive(),!await Oe(p,o))throw new Error("Could not create the SideNote.");return{value:le(p),revert:{label:"Create SideNote",run:async()=>{o.assertActive(),await he(p.id,o)},reapply:async()=>{o.assertActive(),await Oe(p,o)}}}},revision:s=>i(s),preview:s=>(o.assertActive(),{changes:s})}),e.commands.register({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:Ue({id:X,values:ii,expectedUpdatedAt:X},["id","values"]),parse:s=>{let d=Ke(s);return{id:ve(d.id,"SideNote id"),values:wn(d.values),expectedUpdatedAt:d.expectedUpdatedAt===void 0?void 0:ve(d.expectedUpdatedAt,"revision")}}},run:({id:s,values:d,expectedUpdatedAt:f})=>to(s,d,f,void 0,o),revision:s=>i(s),preview:s=>(o.assertActive(),{changes:s})}),e.commands.register({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:a,run:async({id:s})=>{let d=le(await Pe(s,o));if(o.assertActive(),!await he(s,o))throw new Error("Could not delete the SideNote.");return{value:le(d),revert:{label:"Delete SideNote",run:async()=>{o.assertActive(),await Oe(d,o)},reapply:async()=>{o.assertActive(),await he(s,o)}}}},revision:s=>i(s),preview:s=>(o.assertActive(),{changes:s})})];return()=>{t=!0,c.forEach(s=>s())}}var Mt=({field:e,direction:t,options:o,onFieldChange:r,onDirectionChange:i,directionForField:a})=>{let[c,s]=n.useState(e),[d,f]=n.useState(t);return n.createElement("div",{className:"sidenote-sort-popover-body"},n.createElement("div",{className:"sidenote-sort-heading"},n.createElement("span",null,u("auto.90fd0e9a6276")),n.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(p=>n.createElement("button",{key:p,type:"button",className:`sidenote-sort-direction${d===p?" active":""}`,"aria-label":u(p==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":d===p,onClick:()=>{f(p),i(p)}},p==="asc"?n.createElement($e,null):n.createElement(je,null))))),n.createElement("div",{className:"sidenote-sort-options"},o.map(p=>n.createElement("button",{key:p.value,type:"button",className:`sidenote-popover-option${c===p.value?" active":""}`,"aria-pressed":c===p.value,onClick:()=>{let g=c!==p.value;s(p.value),r(p.value);let x=g?a?.(p.value):void 0;x&&(f(x),i(x))}},n.createElement("span",null,p.label),n.createElement(Yt,{className:"sidenote-popover-check"})))))},Tn=({value:e,options:t,onChange:o})=>{let[r,i]=n.useState(e);return n.createElement("div",{className:"sidenote-sort-options"},t.map(a=>n.createElement("button",{key:a.value,type:"button",className:`sidenote-popover-option${r===a.value?" active":""}`,"aria-pressed":r===a.value,onClick:()=>{i(a.value),o(a.value)}},n.createElement("span",null,a.label),n.createElement(Yt,{className:"sidenote-popover-check"}))))},En=({value:e,min:t,ariaLabel:o,onCommit:r})=>{let[i,a]=n.useState(String(e)),c=n.useRef(!1);n.useEffect(()=>{c.current||a(String(e))},[e]);let s=d=>{let f=Number(d),p=d.trim()===""||!Number.isFinite(f)?t:Math.max(t,f);a(String(p)),r(p)};return n.createElement("input",{type:"number",min:t,value:i,"aria-label":o,onFocus:()=>{c.current=!0},onChange:d=>{a(d.target.value);let f=Number(d.target.value);d.target.value.trim()!==""&&Number.isFinite(f)&&r(Math.max(t,f))},onBlur:d=>{c.current=!1,s(d.target.value)}})},si=({seconds:e,onCommit:t})=>{let[o,r]=n.useState(Ve(e)),i=n.useRef(!1);n.useEffect(()=>{i.current||r(Ve(e))},[e]);let a=()=>{let c=h.workspace.getMediaTime();c!==null&&(t(Math.max(0,c)),r(Ve(c)))};return n.createElement("div",{className:"sidenote-time-field"},n.createElement("input",{value:o,placeholder:"0:00","aria-label":u("auto.19eabc961735"),onFocus:()=>{i.current=!0},onChange:c=>{r(c.target.value);let s=eo(c.target.value);s!==null&&t(s)},onBlur:c=>{i.current=!1;let s=eo(c.target.value),d=s===null?0:Math.max(0,s);t(d),r(Ve(d))}}),n.createElement("button",{type:"button",className:"sidenote-time-capture",title:u("auto.528bfa4632ef"),onClick:a},u("auto.e3b82040565b")))},oo=({path:e,web:t=!1,anchor:o,onChange:r,validationMsg:i,invalid:a})=>{let c=t?ot():nt(e),{SelectField:s}=h.ui.settings,d=h.ui.ComboField,[f,p]=n.useState([]);return n.useEffect(()=>{if(o.type!=="markdown-heading"){p([]);return}gn(e).then(p)},[e,o.type]),n.createElement("div",{className:`sidenote-anchor-editor${a?" invalid":""}`},n.createElement("div",{className:"sidenote-select-wrap"},n.createElement(s,{value:o.type,onChange:g=>r(ln(g,o)),ariaLabel:u("auto.9c36384c83fb"),options:c.map(g=>({value:g,label:t&&g==="none"?u("auto.eeb742ed8cac"):u(et[g])}))})),o.type==="web-selection"&&n.createElement("input",{className:"sidenote-anchor-snippet",value:o.snippet,onChange:g=>r({...o,snippet:g.target.value}),placeholder:u("auto.98c236df91df"),"aria-label":u("auto.4b5ddf04bbe5")}),o.type==="pdf-page"&&n.createElement(n.Fragment,null,n.createElement(En,{value:o.page,min:1,ariaLabel:u("auto.300721defdc9"),onCommit:g=>r({...o,page:g})}),n.createElement("input",{className:"sidenote-anchor-snippet",value:o.snippet??"",onChange:g=>r({...o,snippet:g.target.value||void 0}),placeholder:u("auto.2599b7d91cc5"),"aria-label":u("auto.1e149756b7c6")})),o.type==="media-time"&&n.createElement(si,{seconds:o.seconds,onCommit:g=>r({...o,seconds:g})}),o.type==="markdown-line"&&n.createElement(En,{value:o.line,min:1,ariaLabel:u("auto.7555728cb6e5"),onCommit:g=>r({...o,line:g})}),o.type==="markdown-heading"&&n.createElement(d,{value:o.heading,onChange:g=>r({...o,heading:g}),options:f.map(g=>({value:g,label:g})),placeholder:u("auto.a3089b7fae27"),ariaLabel:u("auto.353e665a44c8")}),o.type==="markdown-snippet"&&n.createElement("input",{value:o.snippet,onChange:g=>r({...o,snippet:g.target.value}),placeholder:u("auto.2e5ce5a06a35"),"aria-label":u("auto.ef6127596cae")}),i&&n.createElement("p",{className:"sidenote-anchor-warning"},i))},Rt=({note:e,onSaved:t,onClose:o})=>{let[r,i]=n.useState(e.note),[a,c]=n.useState(e.tags),[s,d]=n.useState(e.anchor),[f,p]=n.useState(!!e.flagged),[g,x]=n.useState(!1),[A,D]=n.useState(""),[b,k]=n.useState(),M={pluginId:"sideNotes",sourceId:"notes",itemId:e.id},V=async()=>{if(!g)try{await h.documents.drafts.clear(M),o()}catch(T){D(T instanceof Error?T.message:String(T))}},P=async()=>{if(!(g||!r.trim())){x(!0),D("");try{if(!b)throw new Error(u("sideNotes.error.save"));let T=await to(e.id,{note:r,tags:a,anchor:s,flagged:f},e.updatedAt,b);h.undo.push({label:u("sideNotes.command.update"),undo:async()=>{try{return await T.revert.run(),{ok:!0}}catch(U){return{ok:!1,message:String(U)}}},redo:async()=>{try{return await T.revert.reapply(),{ok:!0}}catch(U){return{ok:!1,message:String(U)}}}}),t(T.value),await h.documents.drafts.clear(M),o()}catch(T){D(T instanceof Error?T.message:String(T))}finally{x(!1)}}},$=n.createElement("div",{className:"sidenote-edit-actions"},n.createElement("button",{className:"sidenote-cancel-btn",disabled:g,onClick:()=>{V()}},u("auto.77dfd2135f4d")),n.createElement("button",{className:"sidenote-save-btn",disabled:g||!r.trim()||!b,onClick:()=>{P()}},u("auto.efc007a393f6")));return n.createElement(h.ui.Modal,{title:u("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{V()},footer:$},n.createElement(h.ui.NoteInput,{value:r,context:{ref:M,sourcePath:e.path||void 0},tags:a,onTagsChange:c,onRevisionChange:T=>k(U=>!U||T.expectedRevision<U.expectedRevision?T:U),onChange:i,onSave:()=>{P()},onCancel:()=>{V()}}),n.createElement(h.ui.TagInput,{value:a,onChange:c}),n.createElement(oo,{path:e.path,web:!!e.url,anchor:s,onChange:d}),n.createElement("label",null,n.createElement("input",{type:"checkbox",checked:f,disabled:g,onChange:T=>p(T.target.checked)}),u("sideNotes.field.flagged")),A&&n.createElement("p",{role:"alert"},u("sideNotes.error.save")," ",A))},Ot=({noteId:e,setOpenId:t,onEdit:o,onDelete:r,disabled:i=!1})=>n.createElement("div",{className:"sidenote-menu-wrap"},n.createElement("button",{className:"sidenote-icon-btn","aria-label":u("auto.5430d0e5fb8c"),title:u("auto.6bf5da9c080b"),disabled:i,onClick:a=>{a.stopPropagation(),t(e),h.ui.openMenu([{label:u("auto.5301648dcf6b"),icon:n.createElement(Yo,null),enabled:!i,onSelect:o},{label:u("auto.f6fdbe48dc54"),icon:n.createElement(Jo,null),enabled:!i,danger:!0,onSelect:r}],{anchor:a.currentTarget,align:"end"}).finally(()=>t(null))}},n.createElement(Xo,null)));function di(e){let t=[],o=e.replace(/#(\S+)/g,(r,i)=>(t.push(i.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:o}}function Ft(e,t,...o){let r=di(e);if(!r.tags.length&&!r.text)return!0;let i=t.map(a=>a.toLowerCase());for(let a of r.tags)if(!i.some(c=>c.startsWith(a)))return!1;return!(r.text&&!o.map(c=>c.toLowerCase()).some(c=>c.includes(r.text)))}function oe(){return h.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function zt(e=oe()){for(let t of e.listeners)t()}function Cn(e,t=oe()){let o=t.listeners;return o.add(e),()=>{o.delete(e)}}function Lt(e,t=oe()){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...t.views.get(e)}}function Y(e,t,o){let r=()=>Lt(e)[t]??o;return[n.useSyncExternalStore(Cn,r,r),a=>{oe().views.set(e,{...Lt(e),[t]:typeof a=="function"?a(r()):a}),zt()}]}function We(e,t){e?oe().selected.set(t,e):oe().selected.delete(t),zt()}function Pn(e,t){n.useEffect(()=>{let o=Lt("right_sidebar");if(o.path===e&&o.url===t)return;oe().views.set("right_sidebar",{...o,path:e,url:t});let r=oe().selected.get("right_sidebar");r&&(r.path!==e||(r.url??"")!==t)&&oe().selected.delete("right_sidebar"),zt()},[e,t])}function ci(e,t=oe()){let o=t.selected.get(e),r=Lt(e,t);return{title:u("manifest.name"),view:r,...o?{item:{id:o.id,title:o.note.split(`
`)[0].slice(0,100),state:{...r,noteId:o.id}}}:{}}}function In(e){let t=oe(),o=ue(),r=!1,i=()=>{if(r||!o.isActive())throw new Error("SideNotes surface is no longer active")},a=Z(e,i),c=new Map,d=["left_sidebar","right_sidebar"].map(p=>e.interop.extensions.provide(vo,{id:`sideNotes.${p}`,surface:p,getSnapshot:()=>ci(p,t),subscribe:g=>Cn(g,t),restore:async(g,x,A)=>{i(),g={...g};let D=A?.background===!0,b=(c.get(p)??0)+1;c.set(p,b);let k=()=>{if(i(),c.get(p)!==b)throw new Error("SideNotes surface restore was replaced")};if(g.v!==1)throw new Error("Unsupported SideNotes bookmark.");let M=typeof g.noteId=="string"?await Pe(g.noteId,a):null;k();let V=async $=>{let T=await e.vault.fileInfo($);return k(),!!T};if(p==="right_sidebar"&&!M&&typeof g.path=="string"&&g.path&&!await V(g.path))throw new Error("The bookmarked file no longer exists.");if(M&&!M.url&&!await V(M.path))throw new Error("The bookmarked file no longer exists.");!D&&M?await Dt(e,M,k):!D&&p==="right_sidebar"&&(typeof g.path=="string"&&g.path||typeof g.url=="string"&&g.url)&&await Dt(e,{path:typeof g.path=="string"?g.path:"",url:typeof g.url=="string"?g.url:void 0,anchor:{type:"none"}},k),k();let P={v:1};for(let $ of["search","path","url","sourceType"])typeof g[$]=="string"&&(P[$]=g[$]);for(let $ of["showAll","compact","filterWarning","aware"])P[$]=g[$]===!0;P.sortField=["position","updated","created","title"].includes(String(g.sortField))?g.sortField:p==="left_sidebar"?"updated":"position",P.sortDir=g.sortDir==="desc"?"desc":"asc",t.views.set(p,P),M?t.selected.set(p,M):t.selected.delete(p),zt(t)}})),f=0;return d.push(o.subscribe(()=>{if(r||!o.isActive())return;let p=++f,g=[...t.selected];g.length&&o.load({kind:"ids",ids:g.map(([,x])=>x.id)}).then(x=>{if(!(r||!o.isActive()||p!==f)){for(let[A,D]of g){if(t.selected.get(A)!==D)continue;let b=x.find(k=>k.id===D.id);b?t.selected.set(A,b):t.selected.delete(A)}for(let A of t.listeners)A()}}).catch(()=>{if(!r&&o.isActive()&&p===f)for(let x of t.listeners)x()})})),()=>{r=!0,d.forEach(p=>p())}}function _n(e,t){if(e.url){e.url!==t&&h.interop.services.providers(ge)[0]?.invoke("open",[{url:e.url}]);return}h.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}var Dn={position:"Position",created:"Created",updated:"Updated"},li={position:"asc",created:"desc",updated:"desc"},Mn=()=>{let e=Uo()??"",t=Ko(),o=!e&&!!t?.url,r=o&&t?W(t.url):"",i=o?"":e,a=!!i||o,c=o?`web:${r}`:i;Pn(i,r);let{notes:s,setNotes:d,loading:f,error:p,reload:g}=Fe(o?{kind:"web",url:r}:i?{kind:"file",path:i}:{kind:"none"}),{isPending:x,setPending:A,pending:D}=Wo(),[b,k]=n.useState(""),[M,V]=n.useState([]),[P,$]=n.useState(()=>Qt(i)),[T,U]=n.useState(!1),[jt,Vt]=n.useState(null),[Ne,Ie]=n.useState(null),[se,Be]=Y("right_sidebar","search",""),[Se,Ut]=Y("right_sidebar","filterWarning",!1),[Q,ne]=Y("right_sidebar","sortField","position"),[J,at]=Y("right_sidebar","sortDir","asc"),[xe,st]=n.useState(new Map),[Ae,fe]=n.useState({}),[He,Kt]=n.useState("ok"),[Wt,dt]=n.useState(!1),qe=n.useRef(!1),[m,I]=n.useState(0),[L,S]=n.useState(new Map),[j,re]=Y("right_sidebar","aware",!1),[de,ro]=n.useState({}),[Vn,Un]=n.useState(0),[Kn,Wn]=n.useState(0),Ze=Nt();n.useEffect(()=>h.files.onAnchorInfoChanged(()=>I(l=>l+1)),[]),n.useEffect(()=>Ze.subscribe(()=>Wn(l=>l+1)),[Ze]);let ke=n.useMemo(()=>me(i),[i]),ct=ke==="pdf"||ke==="video"||ke==="audio"||ke==="text",io=n.useMemo(()=>{let l=Number(h.settings.get().mediaRangeSeconds);return Number.isFinite(l)&&l>=0?l:10},[Vn]);n.useEffect(()=>h.settings.subscribe(()=>Un(l=>l+1)),[]);let Gt=n.useCallback(()=>({pdfPages:i?h.workspace.getPdfVisiblePages(i):null,mediaSeconds:h.workspace.getMediaTime(),lineRange:i?h.workspace.getVisibleLineRange(i):null}),[i]);n.useEffect(()=>{if(!j||!i){ro({});return}let l=()=>ro(Gt());l();let y=h.files.onActivePositionChanged(l),C=ke==="video"||ke==="audio"?window.setInterval(l,1e3):void 0;return()=>{y(),C&&window.clearInterval(C)}},[j,i,ke,Gt]);let Xe=n.useMemo(()=>o?s.filter(l=>l.url===r):i?s.filter(l=>l.path===i&&!l.url):[],[s,i,r,o]),lt=n.useMemo(()=>{if(Q==="position"){let y=[...Xe].sort((v,C)=>cn(v,C,L));return J==="desc"?y.reverse():y}let l=Q==="created"?"createdAt":"updatedAt";return[...Xe].sort((y,v)=>{let C=y[l].localeCompare(v[l])||tt(y.anchor)-tt(v.anchor);return J==="asc"?C:-C})},[Xe,Q,J,L]),ut=n.useMemo(()=>{let l=se.trim()?lt.filter(y=>Ft(se,y.tags??[],y.note)):lt;return j&&ct&&(l=l.filter(y=>sn(y.anchor,de,io))),Se&&(l=l.filter(y=>xe.has(y.id))),l},[lt,se,Se,xe,j,ct,de,io]),pt=n.useRef([]),[Gn,ao]=n.useState(0);n.useEffect(()=>{pt.current=ut.map(l=>l.id),ao(l=>l+1)},[i,Q,J,se,Se,j,de]);let so=n.useMemo(()=>{let l=new Map(ut.map(v=>[v.id,v])),y=[];for(let v of pt.current){let C=l.get(v);C&&y.push(C)}for(let v of ut)pt.current.includes(v.id)||y.push(v);return pt.current=y.map(v=>v.id),y},[ut,Gn]);n.useEffect(()=>{$(o?{type:"none"}:Qt(i)),k(""),V([]),U(!1),ne(o?"updated":"position"),at(o?"desc":"asc")},[c]),n.useEffect(()=>{let l=new te,y=Q==="position";return _t(Xe,l,{path:i,positions:y}).then(({statuses:v,keys:C})=>{l.isActive()&&(st(v),fe(O=>({...O,projection:void 0})),y&&(S(C),ao(O=>O+1)))}).catch(v=>{v instanceof ae||!l.isActive()||fe(C=>({...C,projection:u("sideNotes.error.load")}))}).finally(()=>l.dispose()),()=>l.dispose()},[Xe,i,Q,m]),n.useEffect(()=>{if(!T||!i){fe(y=>({...y,draft:void 0}));return}let l=new te;return un(i,P,l).then(y=>{l.isActive()&&(Kt(y),fe(v=>({...v,draft:void 0})))}).catch(y=>{y instanceof ae||!l.isActive()||fe(v=>({...v,draft:u("sideNotes.error.load")}))}).finally(()=>l.dispose()),()=>l.dispose()},[P,T,i,m]);let co=async()=>{if(qe.current)return;let l=b.trim();if(!(!l||!a)){qe.current=!0,dt(!0);try{let y=o?Et(r,l,P,M):kt(i,l,await It(i,P),M);d(C=>[...C,y]),k(""),V([]),U(!1),await Oe(y)||(d(C=>C.filter(O=>O.id!==y.id)),k(l),U(!0))}finally{qe.current=!1,dt(!1)}}},lo=async(l,y)=>{if(x(l))return!1;let v=s.find(O=>O.id===l);if(!v)return!1;let C={...v,...y,updatedAt:new Date().toISOString()};A(l,!0),d(O=>O.map(ft=>ft.id===l?C:ft));try{let O=await ie(l,C,v.updatedAt);return O||d(ft=>ft.map(uo=>uo.id===l?v:uo)),O}finally{A(l,!1)}},Bn=async l=>{if(x(l))return;let y=s.find(v=>v.id===l);if(y){A(l,!0),d(v=>v.filter(C=>C.id!==l));try{await he(l)||d(C=>C.some(O=>O.id===l)?C:[...C,y])}finally{A(l,!1)}}},Hn=async l=>{await h.ui.confirm({title:u("auto.042dc9b751ed"),message:u("sideNotes.delete.message"),actions:[{label:u("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:u("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Bn(l)},qn=l=>Ie(l);n.useEffect(()=>{let l=wt(),y=()=>{let v=l.get();v&&(Ie(v),l.publish(null))};return y(),l.subscribe(y)},[]),n.useEffect(()=>{let l=Ze.get();if(!l)return;let y=v=>{Ze.consume(l),k(""),V([]),$(v),U(!0)};if(l.kind==="web"){o&&W(l.url??"")===r&&y({type:"web-selection",snippet:l.snippet});return}l.kind==="file"&&l.path===i&&!o&&y({type:"pdf-page",page:l.page??1,snippet:l.snippet})},[i,r,o,Kn,Ze]);let Zn=(o?["updated","created"]:["position","created","updated"]).map(l=>({value:l,label:Dn[l]})),Xn=l=>{h.ui.openPopover(()=>n.createElement(Mt,{field:Q,direction:J,options:Zn,onFieldChange:y=>{ne(y)},onDirectionChange:at,directionForField:y=>li[y]}),{anchor:l,align:"end"},{className:"sidenote-sort-popover",ariaLabel:u("auto.90fd0e9a6276")})};return n.createElement("div",{className:"sidenotes-panel"},n.createElement("header",{className:"panel-header sidenotes-header"},n.createElement("div",{className:"panel-header-label sidenotes-title"},o?n.createElement(Le,null):n.createElement(Ho,null),n.createElement("span",{className:"panel-title",title:o?r:void 0},o?Me(r):u("auto.7d660ae8b46e"))),n.createElement("div",{className:"sidenotes-header-actions"},ct&&n.createElement("button",{className:`sidenote-icon-btn${j?" active":""}`,"aria-label":u("auto.580535153931"),title:j?u("auto.df4a8bd943cc"):u("auto.7b9b8574c69b"),onClick:()=>re(l=>!l)},n.createElement(en,null)),xe.size>0&&n.createElement("button",{className:`sidenote-icon-btn${Se?" active":""}`,"aria-label":u("auto.f61b9fcd0854"),title:u("auto.74a3a904b38b"),onClick:()=>Ut(l=>!l)},n.createElement(ze,null)),n.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":u("auto.90fd0e9a6276"),title:`${J==="asc"?u("auto.4fee0a06b6e4"):u("auto.01e635f27ec2")} \xB7 ${Dn[Q]}`,"aria-haspopup":"dialog",onClick:l=>Xn(l.currentTarget)},J==="asc"?n.createElement($e,null):n.createElement(je,null)),n.createElement("button",{className:"sidenote-icon-btn","aria-label":u("auto.7a7e81b96c3a"),title:u("auto.d48a73614c7f"),onClick:()=>{let l=!T;U(l),l?$(o?{type:"none"}:dn(i,Gt())):k("")},disabled:!a},n.createElement(qo,null)))),a?n.createElement(n.Fragment,null,n.createElement("div",{className:"sidenote-search-bar search-field"},n.createElement(Tt,{className:"search-field-icon"}),n.createElement("input",{className:"search-field-input",value:se,onChange:l=>Be(l.target.value),placeholder:u("auto.49cd864445a9"),"aria-label":u("auto.f1b5671b118f")}),se&&n.createElement("button",{className:"search-field-action",onClick:()=>Be(""),"aria-label":u("auto.b667d6f9f635")},n.createElement(Ct,null))),T&&n.createElement("div",{className:"sidenote-create"},n.createElement(h.ui.NoteInput,{value:b,onChange:k,context:{sourcePath:i||void 0},onSave:()=>{co()},onCancel:()=>{U(!1),k(""),V([])},autoFocus:!0}),n.createElement(h.ui.TagInput,{value:M,onChange:V}),n.createElement(oo,{path:i,web:o,anchor:P,onChange:$,invalid:!o&&He!=="ok",validationMsg:!o&&He!=="ok"?rt(P,He):void 0}),n.createElement("div",{className:"sidenote-create-actions"},n.createElement("button",{className:"sidenote-save-btn",onClick:()=>{co()},disabled:!b.trim()||Wt},u("auto.757092db3c4b")),lt.length>0&&n.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{U(!1),k(""),V([])}},u("auto.77dfd2135f4d")))),n.createElement("div",{className:"sidenote-list"},(p||Ae.projection||Ae.draft)&&n.createElement("div",{role:"alert"},p||Ae.projection||Ae.draft," ",n.createElement("button",{type:"button",onClick:()=>{g(),I(l=>l+1)}},u("sideNotes.action.retry"))),f?n.createElement("div",{className:"right-sidebar-empty"},n.createElement("p",null,u("auto.33ce417454bf"))):so.length?so.map(l=>{let y=xe.get(l.id),v=y!==void 0,C=D.has(l.id);return n.createElement("article",{key:l.id,className:`sidenote-card${l.flagged?" flagged":""}${v?" invalid":""}`,onClick:()=>{We(l,"right_sidebar"),_n(l,r)}},n.createElement("div",{className:"sidenote-card-meta",onClick:O=>O.stopPropagation()},l.anchor.type!=="none"&&n.createElement("button",{className:"sidenote-anchor-badge",onClick:()=>_n(l,r),title:l.url?u("auto.9ee309dcedc9"):`${l.path} \xB7 ${ye(l.anchor)}`},!l.url&&l.anchor.type==="markdown-heading"?l.path.split("/").pop():ye(l.anchor)),n.createElement("div",{className:"sidenote-card-btns"},v&&y&&n.createElement(ze,{className:"sidenote-warning-icon",title:rt(l.anchor,y)}),n.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${l.flagged?" active":""}`,"aria-label":l.flagged?u("auto.b855c604e861"):u("auto.a774409a00c2"),title:l.flagged?u("auto.b855c604e861"):u("auto.a774409a00c2"),disabled:C,onClick:()=>{lo(l.id,{flagged:!l.flagged})}},n.createElement(Te,null)),n.createElement(Ot,{noteId:l.id,openId:jt,setOpenId:Vt,onEdit:()=>qn(l),onDelete:()=>{Hn(l.id)},disabled:C}))),n.createElement(n.Fragment,null,n.createElement(h.ui.MarkdownView,{className:"sidenote-markdown",value:l.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:l.id},sourcePath:l.path||void 0},onChange:O=>{lo(l.id,{note:O})}}),l.tags&&l.tags.length>0&&n.createElement("div",{className:"sidenote-tags-view",onClick:O=>O.stopPropagation()},l.tags.map(O=>n.createElement("span",{key:O,className:"sidenote-tag-view-pill"},"#",O)))))}):n.createElement("div",{className:"right-sidebar-empty"},n.createElement("p",null,se?u("auto.b690846c83ff"):j&&ct?u("auto.8f4043581269"):o?u("auto.8c8077ac2313"):u("auto.31b291dd535e"))))):n.createElement("div",{className:"right-sidebar-empty"},n.createElement("p",null,u("auto.34f6835f5ddf"))),Ne&&n.createElement(Rt,{key:Ne.id,note:Ne,onSaved:l=>{d(y=>y.map(v=>v.id===l.id?l:v)),We(l,"right_sidebar")},onClose:()=>Ie(null)}))};var ui=[".md",".mp3",".mp4",".pdf"];function Rn(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function On(e){return/^\.[^./\\\s]+$/.test(e)}function it(e){let o=(Array.isArray(e)?e:ui).flatMap(r=>{if(typeof r!="string")return[];let i=Rn(r);return On(i)?[i]:[]});return[...new Set(o)]}var Fn=()=>{let[e,t]=n.useState(()=>h.settings.get());n.useEffect(()=>h.settings.subscribe(()=>t(h.settings.get())),[]);let o=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,r=it(e.filterTypes),{ChipsField:i,NumberField:a,Row:c,Section:s}=h.ui.settings,d=(f,p)=>{t(g=>({...g,[f]:p})),h.settings.set(f,p)};return n.createElement(s,null,n.createElement(c,{title:u("plugin.sideNotes.field.awareRange"),description:u("auto.204e47f6d7a2")},n.createElement(a,{value:o,step:1,ariaLabel:u("plugin.sideNotes.field.awareRange"),onChange:f=>{f!=null&&t(p=>({...p,mediaRangeSeconds:f}))},onCommit:f=>{f!=null&&d("mediaRangeSeconds",f)}})),n.createElement(c,{className:"sidenotes-filter-types-row",title:u("plugin.sideNotes.field.filterTypes"),description:u("plugin.sideNotes.field.filterTypesDesc")},n.createElement(i,{className:"sidenotes-filter-types-editor",items:r,onChange:f=>d("filterTypes",it(f)),normalize:Rn,validate:f=>On(f),placeholder:".png",ariaLabel:u("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var Ln={updated:"Updated",created:"Created",name:"Name"},we="all",$t="web";function Ge(e){return e.url?Me(e.url):e.path.split("/").pop()??e.path}function zn(e){return e.url?$t:e.path.match(/\.[^./]+$/)?.[0].toLowerCase()??""}function pi(e){e.url?h.interop.services.providers(ge)[0]?.invoke("open",[{url:e.url}]):h.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}function fi(e,t,o){if(o==="name"){let a=Ge(e).localeCompare(Ge(t),void 0,{sensitivity:"base"});return a!==0?a:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let r=o==="created"?"createdAt":"updatedAt",i=e[r].localeCompare(t[r]);return i!==0?i:Ge(e).localeCompare(Ge(t),void 0,{sensitivity:"base"})}var $n=()=>{let{notes:e,setNotes:t,loading:o,error:r,reload:i}=Fe(),[a,c]=Y("left_sidebar","search",""),[s,d]=Y("left_sidebar","showAll",!1),[f,p]=Y("left_sidebar","sortField","updated"),[g,x]=Y("left_sidebar","sortDir","desc"),[A,D]=n.useState(new Map),[b,k]=n.useState(null),[M,V]=Y("left_sidebar","filterWarning",!1),[P,$]=Y("left_sidebar","sourceType",we),[T,U]=Y("left_sidebar","compact",!1),[jt,Vt]=n.useState(null),[Ne,Ie]=n.useState(null),[se,Be]=n.useState(0),[Se,Ut]=n.useState(()=>{let m=h.settings.get();return it(m.filterTypes)});n.useEffect(()=>h.files.onAnchorInfoChanged(()=>Be(m=>m+1)),[]),n.useEffect(()=>h.settings.subscribe(()=>{let m=h.settings.get();Ut(it(m.filterTypes))}),[]);let Q=n.useMemo(()=>{let m=[...new Set(e.map(zn).filter(Boolean))];return[{value:we,label:u("auto.6a72085653e4")},...Se.map(I=>({value:I,label:I})),...m.includes($t)?[{value:$t,label:u("sideNotes.filter.web")}]:[]]},[e,Se]);n.useEffect(()=>{Q.some(m=>m.value===P)||$(we)},[P,Q,$]);let ne=n.useMemo(()=>{let m=s?e:e.filter(S=>S.flagged),I=P===we?m:m.filter(S=>zn(S)===P);return[...a.trim()?I.filter(S=>Ft(a,S.tags??[],S.note,S.url??S.path)):I].sort((S,j)=>{let re=fi(S,j,f);return g==="asc"?re:-re})},[e,a,s,P,f,g]),J=n.useRef([]),[at,xe]=n.useState(0);n.useEffect(()=>{J.current=ne.map(m=>m.id),xe(m=>m+1)},[s,f,g,a,P]);let st=n.useRef(!1);n.useEffect(()=>{o||st.current||(st.current=!0,J.current=ne.map(m=>m.id),xe(m=>m+1))},[o]);let Ae=n.useMemo(()=>{let m=M?ne.filter(S=>A.has(S.id)):ne,I=new Map(m.map(S=>[S.id,S])),L=[];for(let S of J.current){let j=I.get(S);j&&L.push(j)}for(let S of m)J.current.includes(S.id)||L.push(S);return J.current=L.map(S=>S.id),L},[ne,at,M,A]);n.useEffect(()=>{let m=new te;return _t(ne,m).then(({statuses:I})=>{m.isActive()&&(D(I),k(null))}).catch(I=>{I instanceof ae||!m.isActive()||k(u("sideNotes.error.load"))}).finally(()=>m.dispose()),()=>m.dispose()},[ne,se]);let fe=async(m,I)=>{let L=e.find(re=>re.id===m);if(!L)return;let S={...L,...I,updatedAt:new Date().toISOString()};t(re=>re.map(de=>de.id===m?S:de)),await ie(m,S,L.updatedAt)||t(re=>re.map(de=>de.id===m?L:de))},He=async m=>{let I=e;t(S=>S.filter(j=>j.id!==m)),await he(m)||t(I)},Kt=async m=>{await h.ui.confirm({title:u("auto.042dc9b751ed"),message:u("sideNotes.delete.message"),actions:[{label:u("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:u("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await He(m)},Wt=m=>Ie(m),dt=m=>{h.ui.openPopover(()=>n.createElement(Mt,{field:f,direction:g,options:Object.entries(Ln).map(([I,L])=>({value:I,label:L})),onFieldChange:I=>p(I),onDirectionChange:x}),{anchor:m,align:"end"},{className:"sidenote-sort-popover",ariaLabel:u("auto.90fd0e9a6276")})},qe=m=>{h.ui.openPopover(()=>n.createElement(Tn,{value:P,options:Q,onChange:$}),{anchor:m,align:"end"},{className:"sidenote-sort-popover",ariaLabel:u("auto.0aafb761a83c")})};return n.createElement("div",{className:"panel"},n.createElement("div",{className:"panel-header"},n.createElement("span",{className:"panel-title"},u("auto.7d660ae8b46e")),n.createElement("div",{className:"sidenotes-header-actions"},n.createElement("button",{className:`sidenote-icon-btn${s?"":" active"}`,"aria-label":s?u("auto.6a72085653e4"):u("auto.f8db8a172be6"),title:s?u("auto.6a72085653e4"):u("auto.f8db8a172be6"),"aria-pressed":!s,onClick:()=>d(m=>!m)},n.createElement(Te,null)),A.size>0&&n.createElement("button",{className:`sidenote-icon-btn${M?" active":""}`,"aria-label":u("auto.f61b9fcd0854"),title:u("auto.74a3a904b38b"),onClick:()=>V(m=>!m)},n.createElement(ze,null)),n.createElement("button",{className:`sidenote-icon-btn${T?" active":""}`,"aria-label":u("auto.77f9b062ce1b"),title:T?u("auto.d2f76731e1e1"):u("auto.e3719eae891e"),onClick:()=>U(m=>!m)},n.createElement(Qo,null)),n.createElement("button",{className:`sidenote-icon-btn${P!==we?" active":""}`,"aria-label":u("auto.0aafb761a83c"),title:`${u("auto.0aafb761a83c")} \xB7 ${P===we?u("auto.6a72085653e4"):P===$t?u("sideNotes.filter.web"):P}`,"aria-haspopup":"dialog","aria-pressed":P!==we,onClick:m=>qe(m.currentTarget)},n.createElement(Zo,null)),n.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":u("auto.90fd0e9a6276"),title:`${g==="asc"?u("auto.4fee0a06b6e4"):u("auto.01e635f27ec2")} \xB7 ${Ln[f]}`,"aria-haspopup":"dialog",onClick:m=>dt(m.currentTarget)},g==="asc"?n.createElement($e,null):n.createElement(je,null)))),n.createElement("div",{className:"sidenote-search-bar search-field"},n.createElement(Tt,{className:"search-field-icon"}),n.createElement("input",{className:"search-field-input",value:a,onChange:m=>c(m.target.value),placeholder:s?u("auto.49cd864445a9"):u("auto.7c0451dde956"),"aria-label":u("auto.ff4f3043a289")}),a&&n.createElement("button",{className:"search-field-action",onClick:()=>c(""),"aria-label":u("auto.b667d6f9f635")},n.createElement(Ct,null))),n.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},(r||b)&&n.createElement("div",{role:"alert"},r||b," ",n.createElement("button",{type:"button",onClick:()=>{i(),Be(m=>m+1)}},u("sideNotes.action.retry"))),o?n.createElement("div",{className:"tree-empty"},u("auto.33ce417454bf")):Ae.length===0?n.createElement("div",{className:"tree-empty"},a||P!==we?u("auto.b690846c83ff"):s?u("auto.d2a1e72bc320"):u("auto.f5ca64c680ee")):n.createElement("div",{className:"flagged-notes-list"},Ae.map(m=>{let I=A.get(m.id),L=I!==void 0;return n.createElement("div",{key:m.id,className:`flagged-note-card${m.flagged?" flagged":""}${L?" invalid":""}${T?" compact":""}`,onClick:()=>{We(m,"left_sidebar"),pi(m)},title:m.url??m.path},n.createElement("div",{className:"flagged-note-header"},n.createElement("div",{className:"flagged-note-meta-row"},n.createElement("div",{className:"flagged-note-meta-left"},m.url?m.anchor.type!=="none"&&n.createElement("span",{className:"flagged-note-anchor"},ye(m.anchor)):n.createElement("span",{className:"flagged-note-anchor",title:`${m.path}${m.anchor.type!=="none"?` \xB7 ${ye(m.anchor)}`:""}`},Ge(m))),n.createElement("div",{className:"flagged-note-meta-right"},L&&I&&n.createElement(ze,{className:"sidenote-warning-icon",title:rt(m.anchor,I)}),n.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${m.flagged?" active":""}`,"aria-label":m.flagged?u("auto.b855c604e861"):u("auto.a774409a00c2"),title:m.flagged?u("auto.b855c604e861"):u("auto.a774409a00c2"),onClick:S=>{S.stopPropagation(),fe(m.id,{flagged:!m.flagged})}},n.createElement(Te,null)),n.createElement(Ot,{noteId:m.id,openId:jt,setOpenId:Vt,onEdit:()=>Wt(m),onDelete:()=>{Kt(m.id)}}))),m.url&&n.createElement("span",{className:"flagged-note-file"},n.createElement(Le,{className:"flagged-note-web-icon"}),Ge(m))),T&&(()=>{let S=m.note.split(`
`).find(j=>j.trim())?.replace(/^#+\s*/,"").trim();return S?n.createElement("p",{className:"flagged-note-preview"},S):null})(),n.createElement(n.Fragment,null,!T&&n.createElement(h.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:m.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:m.id},sourcePath:m.path||void 0},onChange:S=>{fe(m.id,{note:S})}}),!T&&m.tags&&m.tags.length>0&&n.createElement("div",{className:"sidenote-tags-view",onClick:S=>S.stopPropagation()},m.tags.map(S=>n.createElement("span",{key:S,className:"sidenote-tag-view-pill"},"#",S)))))}))),Ne&&n.createElement(Rt,{key:Ne.id,note:Ne,onSaved:m=>{t(I=>I.map(L=>L.id===m.id?m:L)),We(m,"left_sidebar")},onClose:()=>Ie(null)}))};var no="notes-sidenotes-styles",gi=`
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

`;function jn(){let e=document.getElementById(no);return e||(e=document.createElement("style"),e.id=no,document.head.appendChild(e)),e.textContent=gi,()=>{document.getElementById(no)===e&&e.remove()}}function mi(e){Vo(e),wo(e);let t=ue(),o=!1,r=Z(e,()=>{if(o)throw new Error("SideNotes registration is no longer active")}),i=jn(),a=kn(e),c=In(e),s=e.files.onRenamed(({oldPath:b,newPath:k})=>{r.isActive()&&Co(b,k,r).catch(M=>console.error("SideNotes could not retarget notes",M))}),d=e.files.onLineShift(({path:b,fromLine:k,delta:M})=>{r.isActive()&&Po(b,k,M,r).catch(V=>console.error("SideNotes could not shift anchors",V))}),f=Nt(),p=async b=>{if(!(!b||!r.isActive())){if(b={...b},b.surface==="web"){if(!b.url||!b.text.trim())return;f.publish({kind:"web",url:b.url,snippet:b.text.trim().slice(0,200)})}else{if(!b.path||!b.page)return;let k=await e.workspace.getPdfPageText(b.path,b.page).catch(()=>null);if(!r.isActive())return;let M=yn({path:b.path,page:b.page,text:b.text},k);if(!M)return;f.publish(M)}await e.workspace.revealOwnPanel("right_sidebar")}},g=e.interop.extensions.provide(bo,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:p}),x=e.commands.register({id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"read",run:()=>{if(!r.isActive())return;let b=e.getState().activePath,k=b&&me(b)==="pdf"?vn(b,e.workspace.getTextSelection()):null;k&&p({surface:"pdf",...k})}});e.registerView("sideNotes.panel",Mn),e.registerView("sideNotes.flagged",$n),e.registerView("sideNotes.settings",Fn);let A=Bo(),D=hn(e);return()=>{o=!0,t.dispose(),s(),a(),c(),d(),g(),x(),A(),D(),i()}}var hi={register:mi},Gd=hi;export{Gd as default,mi as register};
