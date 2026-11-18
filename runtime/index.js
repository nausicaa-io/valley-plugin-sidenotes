var ii=Object.defineProperty;var si=(e,t,n)=>t in e?ii(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var V=(e,t,n)=>si(e,typeof t!="symbol"?t+"":t,n);var Tt="valley";var na=`.${Tt}`,oa=`app.${Tt}`;function ai(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var di=/^[a-zA-Z]:/;function Yn(e){if(typeof e!="string")return"";let t=ai(e);return!t||t==="."||di.test(t)||t.split("/").some(n=>n==="..")?"":t}var J=`.${Tt}`,ci="plugins",st=`${J}/${ci}`,_t=`${st}/packages`,sa=`${_t}/core`,aa=`${_t}/github`,da=`${_t}/local`,ca=`${_t}/community`,la=`${st}/community.json`,ua=`${st}/data`;var fa=`${st}/enabled.json`,pa=`${st}/sources.json`,ma=`${J}/state`,Q=`${J}/settings`,Jn=`${J}/data`,fn=`${J}/recovery`;var pn=`${J}/accounts`,Ke=`${J}/ai`,ga=`${Ke}/connections.json`,ha=`${Ke}/defaults.json`,ba=`${Ke}/budgets.json`,ya=`${Ke}/usage.sqlite`,wa=`${Ke}/security/guards.json`,va=`${Ke}/security/activity.sqlite`,Sa=`${pn}/providers`,Na=`${pn}/providers.lock.json`,li=`${J}/trash`,xa=`${li}/items`,mn=`${J}/cache`,Aa=`${mn}/accounts`,ui=`${mn}/search`,ka=`${mn}/providers`;var Ea=`${ui}/index.jsonl`,Ia=`${fn}/drafts`,Ta=`${fn}/transactions`,_a=`${fn}/retired`;var Re="design",fi="themes",Qn=`${J}/${Re}/${fi}`,Oa=`${Qn}/local`,Pa=`${Qn}/community`;var Ca={app:`${Q}/app.json`,appearance:`${J}/${Re}/appearance.json`,"icon-rail":`${J}/${Re}/icon-rail.json`,"footer-rail":`${J}/${Re}/footer-rail.json`,"plugin-startup":`${J}/${Re}/right-sidebar-startup.json`,"new-tab":`${J}/${Re}/new-tab.json`,pallette:`${J}/${Re}/palette.json`,group:`${Jn}/groups.json`,units:`${Jn}/units.json`,metadata:`${Q}/file-viewers.json`,notification:`${Q}/notification-types.json`,"notification-settings":`${Q}/notification.json`,preferences:`${Q}/preferences.json`,"link-actions":`${Q}/link-actions.json`,markdown:`${Q}/markdown.json`,editor:`${Q}/editor.json`,"editor-vim":`${Q}/editor-vim.json`,"markdown-todo":`${Q}/markdown-todo.json`,"markdown-codeblocks":`${Q}/markdown-codeblocks.json`,"markdown-template":`${Q}/markdown-template.json`,"markdown-embeed":`${Q}/markdown-embeed.json`,files:`${Q}/file.json`,"file-sorter":`${Q}/file-sorter.json`,search:`${Q}/search.json`,"search-tag":`${Q}/search-tag.json`,"search-content":`${Q}/search-content.json`,design:`${J}/${Re}/appearance.json`,accounts:`${pn}/connections.json`};var pi=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),eo=16384;var to=new Set(["__proto__","prototype","constructor"]);function no(e){let t=0;for(let n of e){let o=n.codePointAt(0);t+=o<=127?1:o<=2047?2:o<=65535?3:4}return t}function Ot(e){let t=new WeakSet,n=0,o=(i,a)=>{if(++n>8192||a>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(no(i)>eo)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let c=Array.isArray(i),l=Object.getPrototypeOf(i);if(!(!c&&l!==null&&(Object.getPrototypeOf(l)!==null||typeof Object.getOwnPropertyDescriptor(l,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(l,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let d=Reflect.ownKeys(i);if(d.length+n>8192||d.some(h=>typeof h=="string"&&to.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(c){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(S,T)=>{let A=u[String(T)];return A&&"value"in A?o(A.value,a+1)??null:null})}let f={};for(let h of Object.keys(u).sort()){if(to.has(h))throw new Error("Invalid bookmark state key");let S=u[h];if(!S.enumerable||!("value"in S)){n++;continue}let T=o(S.value,a+1);T!==void 0&&(f[h]=T)}return f}finally{t.delete(i)}}},s=o(e,0);if(!s||typeof s!="object"||Array.isArray(s))throw new Error("Invalid bookmark state");if(no(JSON.stringify(s))>eo)throw new Error("Bookmark state is too large");return s}function io(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Yn(e);if(!t)throw new Error("Invalid bookmark path");return t}function gn(e,t,n){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${n}`);return e.trim().normalize("NFC")}function oo(e){let n=(e.target?["path","filePath","file"].flatMap(s=>typeof e.target.state[s]=="string"?[e.target.state[s]]:[]):[e.folderPath]).join(" "),o=/\.[^./]+$/.exec(n)?.[0]??"";return[e.title,e.description,n,o,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function hn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!pi.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let n=Ot(t.state);return n.path!==void 0&&(n.path=io(n.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:n,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var mi=/^[A-Za-z0-9_-]{1,64}$/;function ro(e,t){if(typeof e!="string"||!mi.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function so(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,n=gn(t.title,512,"title"),o={...t.description===void 0?{}:{description:gn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:gn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},s=t.group===void 0?{}:{group:ro(t.group,"group")};if(t.groupId!==void 0){let c=ro(t.groupId,"group id");if(!n||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:n,groupId:c,...o}}if(t.target!==void 0){let c={folderPath:"",title:n,target:hn(t.target),...o,...s};return{...c,searchText:oo(c)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let a={folderPath:io(t.folderPath),title:n,...o,...s};return{...a,searchText:oo(a)}}function $e(e){let t=0,n=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),o=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),s=(i,a)=>{if(++t>2048||a>32||!n(i)||typeof i.type!="string")return!1;let c=(...l)=>Object.keys(i).every(d=>d==="type"||l.includes(d));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&s(i.items,a+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(l=>s(l,a+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(l=>s(l,a+1)):i.type==="object"?c("properties","required","additionalProperties")&&n(i.properties)&&Object.entries(i.properties).every(([l,d])=>o(l)&&s(d,a+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(l=>typeof l=="string"&&Object.hasOwn(i.properties,l)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return s(e,0)}function Pt(e,t,n=1e5){let o=Math.max(1,Math.min(1e6,Math.floor(n))),s=new WeakSet,i=(a,c,l)=>{if(--o<0||l>64)return!1;if(a.type==="unknown")return!0;if(a.type==="null")return c===null;if(a.type==="literal")return c===a.value;if(a.type==="union")return a.anyOf.some(d=>i(d,c,l+1));if(a.type==="number")return typeof c=="number"&&Number.isFinite(c);if(a.type==="string"||a.type==="boolean"||a.type==="function")return typeof c===a.type;if(!c||typeof c!="object"||s.has(c))return!1;s.add(c);try{return a.type==="array"?Array.isArray(c)&&c.length<=(a.maxItems??1e5)&&c.every(d=>i(a.items,d,l+1)):a.type==="tuple"?Array.isArray(c)&&c.length>=(a.minItems??a.items.length)&&c.length<=a.items.length&&c.every((d,u)=>i(a.items[u],d,l+1)):a.type==="object"?Array.isArray(c)||a.required?.some(d=>!Object.hasOwn(c,d))?!1:Object.entries(c).every(([d,u])=>Object.hasOwn(a.properties,d)?i(a.properties[d],u,l+1):a.additionalProperties===!0):!1}finally{s.delete(c)}};return i(e,t,0)}var gi=new Map;function F(e,t,n,o,s,i,a,c,l="owner"){let d=Object.freeze({id:e,kind:t,version:n,cardinality:o,validate:s,identities:i,identityScope:l,serviceCalls:a,serviceMetadata:c});return gi.set(`${t}:${e}@${n}`,d),d}var yn=256;var k=e=>!!e&&typeof e=="object"&&!Array.isArray(e),U=(e,t)=>typeof e[t]=="function",Ve=e=>e===void 0,Ge=e=>typeof e=="boolean",E=e=>typeof e=="string",ce=e=>e===void 0||E(e),hi=e=>e===void 0||typeof e=="number",bi=e=>e===void 0||typeof e=="boolean",j=(e,t)=>e.length===t.length&&t.every((n,o)=>n(e[o])),ee=e=>k(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),ao=e=>k(e),lo=e=>k(e)&&E(e.id)&&E(e.title)&&E(e.date)&&(e.documentRef===void 0||k(e.documentRef)&&E(e.documentRef.pluginId)&&E(e.documentRef.sourceId)&&E(e.documentRef.itemId)),yi=e=>k(e)&&E(e.date)&&ce(e.startTime)&&ce(e.endTime)&&ce(e.sourceId)&&ce(e.itemId),wi=e=>k(e)&&E(e.url)&&ce(e.title)&&bi(e.newTab),vi=e=>k(e)&&E(e.query),uo=e=>k(e)&&E(e.name)&&ce(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Si=e=>Array.isArray(e)&&e.every(uo),Ni=e=>e===null||uo(e),xi=e=>e===void 0||k(e)&&ce(e.approvalToken)&&(e.cancellation===void 0||k(e.cancellation)),Ai=e=>typeof e=="string"||k(e)&&typeof e.text=="string",ki=e=>k(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&k(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&ce(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),fo=e=>k(e)&&E(e.id)&&E(e.label)&&ce(e.labelKey)&&ce(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(fo)),po={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(lo)},create:{args:e=>j(e,[E,ao]),result:Ge},update:{args:e=>j(e,[E,ao]),result:Ge},remove:{args:e=>j(e,[E]),result:Ge},open:{args:e=>j(e,[E]),result:Ve},configure:{args:e=>e.length===0,result:Ve},actions:{args:e=>j(e,[E]),result:e=>Array.isArray(e)&&e.every(fo)},runAction:{args:e=>j(e,[E,E]),result:Ge}},mo=e=>k(e)&&E(e.name)&&E(e.version)&&ce(e.description)&&ce(e.author)&&(e.localized===void 0||k(e.localized)&&Object.values(e.localized).every(t=>k(t)&&E(t.name)&&ce(t.description))),Ei=F("calendar.itemSource","service","1.3.0","many",e=>k(e)&&U(e,"list")&&(e.integration===void 0||mo(e.integration)),void 0,po,e=>e.integration),Ct=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,bn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Ii=e=>k(e)&&Ct(e.startDate)&&Ct(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=yn&&(e.cursor===void 0||bn(e.cursor)),Ti=e=>k(e)&&bn(e.revision)&&(e.cursor===void 0||bn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=yn&&e.items.every(t=>lo(t)&&Ct(t.date)&&(t.endDate===void 0||Ct(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,_i=F("calendar.itemSource","service","2.0.0","many",e=>k(e)&&U(e,"list")&&(e.integration===void 0||mo(e.integration)),void 0,{...po,list:{args:e=>j(e,[Ii]),result:Ti}},e=>e.integration),Oi=F("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Pi=F("calendar.navigator","service","1.0.0","one",e=>k(e)&&U(e,"openDate"),void 0,{openDate:{args:e=>j(e,[yi]),result:Ve}}),Ci=F("calendar.panelSelection","state","1.0.0","one",e=>k(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),at=F("web.activeContext","state","1.0.0","one",e=>k(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function co(e){return k(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>k(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Ri=F("contacts.directory","service","1.0.0","one",e=>k(e)&&["search","resolveEmails","open"].every(t=>U(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(co)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>k(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(co))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||k(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Ve}}),Di=F("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Mi=F("web.navigator","service","1.0.0","one",e=>k(e)&&U(e,"open"),void 0,{open:{args:e=>j(e,[wi]),result:Ve}}),wn=F("selection.textAction","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&U(e,"run"),e=>[e.id]),Li=F("geo.navigator","service","1.0.0","one",e=>k(e)&&U(e,"open"),void 0,{open:{args:e=>j(e,[vi]),result:Ve}}),ji=F("geo.search","service","1.0.0","one",e=>k(e)&&U(e,"search")&&U(e,"reverse"),void 0,{search:{args:e=>j(e,[E]),result:Si},reverse:{args:e=>j(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Ni}}),Fi=F("agent.toolProvider","service","1.0.0","many",e=>k(e)&&Array.isArray(e.tools)&&e.tools.every(ki)&&U(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>j(e,[E,k,xi]),result:Ai}},e=>({tools:e.tools}),"global"),zi=F("guard.runtime","service","1.0.0","one",e=>k(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>U(e,t)),void 0,{resolve:{args:e=>j(e,[k]),result:k},requestApproval:{args:e=>j(e,[k]),result:Ge},consumeToken:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&ce(e[1]),result:Ge},audit:{args:e=>j(e,[k]),result:Ve}}),$i=F("browser.automation","service","1.0.0","one",e=>k(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>U(e,t)),void 0,{list:{args:e=>e.length===0,result:ee},open:{args:e=>j(e,[E]),result:ee},switch:{args:e=>j(e,[E]),result:ee},close:{args:e=>j(e,[E]),result:ee},snapshot:{args:e=>j(e,[E]),result:ee},readText:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&hi(e[1]),result:ee},readHtml:{args:e=>j(e,[E]),result:ee},screenshot:{args:e=>j(e,[E]),result:ee},click:{args:e=>j(e,[E,t=>typeof t=="number"]),result:ee},type:{args:e=>e.length>=3&&e.length<=4&&E(e[0])&&typeof e[1]=="number"&&E(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:ee},select:{args:e=>j(e,[E,t=>typeof t=="number",E]),result:ee},scroll:{args:e=>j(e,[E,t=>typeof t=="number",t=>typeof t=="number"]),result:ee},pressKey:{args:e=>j(e,[E,E]),result:ee},navigate:{args:e=>j(e,[E,E]),result:ee},back:{args:e=>j(e,[E]),result:ee},forward:{args:e=>j(e,[E]),result:ee},reload:{args:e=>j(e,[E]),result:ee}}),Vi=F("fileTree.contextItem","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&typeof e.label=="string"&&ce(e.labelKey)&&U(e,"run"),e=>[e.id]),Ui=F("newTab.entry","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&U(e,"run"),e=>[e.id]),vn=F("search.resultAction","extension","1.0.0","many",e=>k(e)&&typeof e.cardKind=="string"&&U(e,"open"),e=>[e.cardKind]),Bi=F("search.resultCard","extension","1.0.0","many",e=>k(e)&&typeof e.cardKind=="string"&&U(e,"render")&&U(e,"open"),e=>[e.cardKind]),Wi=F("metadataPanel.segment","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&U(e,"render"),e=>[e.id]),Sn=F("workspace.surface","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&U(e,"getSnapshot")&&U(e,"subscribe")&&U(e,"restore"),e=>[e.id]),Ki=F("metadata.plugin","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&U(e,"facts"),e=>[e.id]),Gi=F("workspace.viewState","extension","1.0.0","many",e=>k(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&U(e,"capture")&&U(e,"restore")&&U(e,"subscribe"),e=>[e.id]);var Rt=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let n=Object.create(null),o=Reflect.ownKeys(e);if(o.length>32)throw new Error("Invalid bookmark descriptor");for(let s of o){if(typeof s!="string")continue;if(["__proto__","prototype","constructor"].includes(s))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,s);i?.enumerable&&"value"in i&&(n[s]=i.value)}return n},Nn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),go=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),ho=e=>Nn(e)&&typeof e.surface=="string"&&go.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function dt(e){let t=Rt(e);if(!ho(t))throw new Error("Invalid bookmark descriptor");let n=hn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),o=so({folderPath:"",title:t.title,description:t.description,target:n});if(!o.title||typeof o.description!="string")throw new Error("Bookmark presentation is required");return{surface:n.surface,title:o.title,description:o.description,state:n.state,...n.instanceId===void 0?{}:{instanceId:n.instanceId},...n.itemId===void 0?{}:{itemId:n.itemId}}}function xn(e){try{let t=dt(e),n=Rt(e);return JSON.stringify(t.state)===JSON.stringify(Ot(n.state))}catch{return!1}}function Hi(e){try{let t=Rt(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:dt(t.bookmark)}}catch{}return{status:"invalid"}}var qi=e=>{try{let t=Rt(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&xn(t.bookmark)}catch{return!1}},Zi=e=>Nn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),bo=F("workspace.bookmark","service","1.0.0","many",e=>Nn(e)&&typeof e.id=="string"&&go.has(String(e.surface))&&$e(e.stateSchema)&&(e.itemStateSchema===void 0||$e(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&ho(e[0]),result:qi,sanitizeResult:Hi},restore:{args:e=>e.length===1&&xn(e[0]),result:Zi}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function An(e,t,n){if(!$e(n.stateSchema)||n.itemStateSchema!==void 0&&!$e(n.itemStateSchema))throw new Error("Invalid bookmark state schema");let o=!0,s=(d,u,f=!1)=>Pt(f&&n.itemStateSchema?n.itemStateSchema:n.stateSchema,d,8192)&&(!n.validate||n.validate(d,u)),i=(d,u,f)=>{let h=f?void 0:n.primary?n.primary(d):d.item,S=Ot(h?.state??d.view);if(!s(S,u,!!h))throw new Error("Invalid bookmark state");return dt({...u,title:h?.title??d.title,description:n.description(d,!!h),state:S,...h?{itemId:h.id}:{}})},a={id:t.id,surface:t.surface,stateSchema:n.stateSchema,...n.itemStateSchema?{itemStateSchema:n.itemStateSchema}:{},capture(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(d.instanceId),d,!1)}}catch{return{status:"invalid"}}},async restore(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=dt(d),!s(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:o?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(bo,a),l;try{l=e.interop.extensions.provide(Sn,{...t,getSnapshot(d){let u=t.getSnapshot(d),f={surface:t.surface,...d===void 0?{}:{instanceId:d}},h,S;try{h=i(u,f,!1)}catch{}try{S=i(u,f,!0)}catch{}return{...u,bookmark:h,bookmarkView:S}}})}catch(d){throw o=!1,c(),d}return()=>{o=!1,l(),c()}}var ct=e=>!!e&&typeof e=="object"&&!Array.isArray(e),yo=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function wo(e){if(!ct(e)||!yo(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(n=>typeof n=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(n))))return!1;let t=new Set;for(let n of e.items){if(!ct(n)||!yo(n.id)||t.has(n.id)||typeof n.label!="string"||!n.label.trim()||n.label.length>256||n.labelKey!==void 0&&typeof n.labelKey!="string"||n.available!==void 0&&typeof n.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(n.kind)))return!1;t.add(n.id)}if(e.automation!==void 0){if(!ct(e.automation)||Object.keys(e.automation).some(n=>n!=="actions")||!ct(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[n,o]of Object.entries(e.automation.actions))if(!t.has(n)||!ct(o)||!["button","number","string","boolean"].includes(String(o.type))||Object.keys(o).some(s=>!["type","integer","maxLength"].includes(s))||o.integer!==void 0&&(o.type!=="number"||typeof o.integer!="boolean")||o.maxLength!==void 0&&(o.type!=="string"||!Number.isSafeInteger(o.maxLength)||Number(o.maxLength)<1||Number(o.maxLength)>65536))return!1}return e.defaultItems.every(n=>typeof n=="string"&&t.has(n))&&new Set(e.defaultItems).size===e.defaultItems.length}var Xi=F("workspace.details","extension","1.0.0","many",wo,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var dd=[J,`${J}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var kd=1024*1024;var Td=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var _d=globalThis.Buffer;var Yi=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var Qi=[".ttf",".otf",".woff",".woff2"],es=[".csv"],ts=[".base"],ns=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],os=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],rs=[...ns,...os,".ico",".flavicon"];var is=[".pdf"],ss=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus",".m4b",".mka",".weba",".3ga"],as=[".mp4",".mov",".m4v",".mkv",".webm",".ogv",".3gp",".3g2",".f4v"],ds=[".srt",".vtt",".ass"],cs=[".stl",".obj",".glb",".gltf"],ls=[".bin",".mtl"];function lt(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var us={type:"core",id:"valley"},N=(e,t,n,o,s={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:o,owner:us,...s});function fs(e){let t={};for(let[n,o]of e)for(let s of n)t[s]=o;return t}var ps=fs([[[".mermaid",".mmd"],N("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],N("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],N("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],N("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],N("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Qi,N("font","font","font","media")],[[".epub",".mobi",".azw3"],N("ebook","ebook","ebook","documents")],[[".djvu"],N("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],N("comic","comic","comic","documents")],[[".md",".markdown"],N("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],N("text","text","text","notes")],[[".json"],N("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],N("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[es,N("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[ts,N("base","base","fallback","data")],[rs,N("image","image","image","media",{information:["identity","dimensions","exif"]})],[is,N("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[ss,N("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[as,N("video","video","video","media",{information:["identity","media","video-codec"]})],[ds,N("text","subtitle","text","media")],[cs,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[ls,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],N("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],N("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],N("docx","word","opendocument","documents")],[[".ods"],N("csv","excel","opendocument","data")],[[".odp"],N("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],N("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],N("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],N("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],N("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],N("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],N("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],N("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],N("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],N("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],N("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],N("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],N("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],N("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],N("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],N("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],N("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],N("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],N("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],N("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],N("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],N("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],N("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],N("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],N("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],N("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],N("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],N("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),ms=N("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function gs(e){return ps[lt(e)]??ms}function De(e){return gs(e).kind}var r,y,Ie=0;function vo(e){Ie++,y=e,r=e.React}function Dt(){return y.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ie(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let o=n.toString();return n.search?o:o.replace(/\/$/,"")}catch{return t}}function Mt(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var He="sideNotes.notes",kn="sideNotes.note_tags",En="sideNotes.path_history",Lt=100,hs=32,So=4096,bs=4*1024*1024;function ys(e){return e?e.kind==="none"?"none":e.kind==="ids"?JSON.stringify(["ids",[...new Set(e.ids)].sort()]):JSON.stringify(e.kind==="file"?["file",e.path,e.includeWeb===!0]:["web",ie(e.url)]):"all"}async function No(e){let t=await Promise.allSettled(e),n=t.find(o=>o.status==="rejected");if(n?.status==="rejected")throw n.reason;return t.map(o=>o.value)}var jt=class{constructor(t,n,o){V(this,"api",t);V(this,"isCurrent",n);V(this,"normalize",o);V(this,"revision",0);V(this,"catalogRevision",0);V(this,"catalog",null);V(this,"catalogKeys",new Set);V(this,"dirtyKeys",new Set);V(this,"sourceRevision",null);V(this,"realmGeneration",null);V(this,"catalogPending",null);V(this,"pending",new Map);V(this,"disposed",!1);V(this,"disposers");V(this,"listeners",new Set);this.disposers=[He,kn,En].map(s=>t.data.dataset(s).subscribe(i=>{if(!this.isActive())return;this.revision++;let a=this.realmGeneration!==null&&this.realmGeneration!==i.realmGeneration;if(this.realmGeneration=i.realmGeneration,a&&(this.catalogRevision++,this.sourceRevision=null,this.resetCatalog()),s===He&&(this.catalogRevision++,this.changeSubjects(i)),this.isActive())for(let c of this.listeners)c()})),this.disposers.push(t.subscribe(()=>{this.isCurrent()||this.dispose()}))}isActive(){return!this.disposed&&this.isCurrent()}subscribe(t){return this.isActive()?(this.listeners.add(t),()=>{this.listeners.delete(t)}):()=>{}}dispose(){if(!this.disposed){this.disposed=!0,this.resetCatalog(),this.listeners.clear();for(let t of this.disposers)t();this.disposers=[]}}assertActive(){if(!this.isActive())throw new Error("SideNotes reader is no longer active")}resetCatalog(){this.catalog=null,this.catalogKeys.clear(),this.dirtyKeys.clear()}changeSubjects(t){let n=this.sourceRevision;if(this.sourceRevision=Number.isSafeInteger(t.revision)&&t.revision>=0?t.revision:null,!this.catalog||n===null||this.sourceRevision!==n+1||!t.keys?.length||t.keys.length>So){this.resetCatalog();return}for(let o of t.keys){if(!o||typeof o!="object"||Array.isArray(o)||Object.keys(o).length!==1||typeof o.id!="string"||!this.catalogKeys.has(o.id)){this.resetCatalog();return}this.dirtyKeys.add(o.id)}}retainSubjects(t){if(this.resetCatalog(),t.length>So)return;let n=0;for(let o of t){if(typeof o.id!="string"||this.catalogKeys.has(o.id)){this.resetCatalog();return}this.catalogKeys.add(o.id);for(let s of["id","path","url"])typeof o[s]=="string"&&(n+=o[s].length*2);if(n>bs){this.resetCatalog();return}}this.catalog=t}async rows(t,n={},o){let s=[],i;do{this.assertActive();let a=await this.api.data.dataset(t).query({...n,limit:1e3,cursor:i});this.assertActive(),o?.(a.revision),s.push(...a.rows),i=a.cursor}while(i);return s}subjects(){if(this.catalogPending)return this.catalogPending;if(this.catalog&&!this.dirtyKeys.size)return Promise.resolve(this.catalog);let t=(async()=>{for(;;){let o=this.catalogRevision,s=this.catalog,i=[...this.dirtyKeys],a=this.sourceRevision,c,l=d=>{if(!Number.isSafeInteger(d)||d<0||c!==void 0&&d!==c)throw new Error("SideNotes catalog changed during read");c=d};try{let d;if(s){let u=new Map;for(let h=0;h<i.length;h+=Lt){let S=i.slice(h,h+Lt),T=await this.rows(He,{select:["id","path","url"],where:{id:{in:S}}},l);for(let A of T){if(typeof A.id!="string"||!S.includes(A.id))throw new Error("Invalid SideNotes catalog key");u.set(A.id,A)}if(o!==this.catalogRevision)break}if(o!==this.catalogRevision)continue;if(c!==a){this.resetCatalog();continue}let f=new Set(i);d=s.flatMap(h=>{if(!f.has(String(h.id)))return[h];let S=u.get(String(h.id));return S?[S]:[]})}else d=await this.rows(He,{select:["id","path","url"]},l);if(this.assertActive(),o!==this.catalogRevision)continue;if(c===void 0||a!==null&&c<a)throw new Error("SideNotes catalog revision is unavailable");return this.sourceRevision=c,this.retainSubjects(d),d}catch(d){if(this.assertActive(),o!==this.catalogRevision)continue;throw this.resetCatalog(),d}}})();this.catalogPending=t;let n=()=>{this.catalogPending===t&&(this.catalogPending=null)};return t.then(n,n),t}async read(t){let n=[],o=[],s=[];if(!t)[n,o,s]=await No([this.rows(He),this.rows(kn),this.rows(En)]);else{let c=t.kind==="web"?ie(t.url):t.kind==="file"?t.path:"",l=t.kind==="ids"?new Set(t.ids):null;if(!c&&!l?.size)return[];let d=(await this.subjects()).filter(u=>{if(l)return typeof u.id=="string"&&l.has(u.id.trim());if(t.kind==="file"&&(typeof u.path!="string"||u.path.trim()!==c))return!1;let f=ie(typeof u.url=="string"?u.url:"");return t.kind==="web"?f===c:t.kind==="file"&&t.includeWeb===!0||!f}).map(u=>u.id).filter(u=>typeof u=="string"&&!!u.trim());for(let u=0;u<d.length;u+=Lt){let f=d.slice(u,u+Lt),[h,S,T]=await No([this.rows(He,{where:{id:{in:f}}}),this.rows(kn,{where:{noteId:{in:f}}}),this.rows(En,{where:{noteId:{in:f}}})]);n.push(...h),o.push(...S),s.push(...T)}}let i=new Map;for(let c of o){if(typeof c.noteId!="string")continue;let l=i.get(c.noteId);l?l.push(c.tag):i.set(c.noteId,[c.tag])}let a=new Map;for(let c of s){if(typeof c.noteId!="string")continue;let l=a.get(c.noteId);l?l.push(c):a.set(c.noteId,[c])}for(let c of a.values())c.sort((l,d)=>Number(l.position)-Number(d.position));return n.map(c=>this.normalize({...c,tags:i.get(String(c.id))??[],pathHistory:(a.get(String(c.id))??[]).map(l=>l.path)})).filter(c=>c!==null)}load(t){if(!this.isActive())return Promise.reject(new Error("SideNotes reader is no longer active"));let n=ys(t),o=this.pending.get(n);if(o)return o;if(this.pending.size>=hs)return Promise.reject(new Error("Too many SideNotes reads"));let s=t?.kind==="ids"?{kind:t.kind,ids:[...t.ids]}:t?{...t}:void 0,i=(async()=>{for(;;){this.assertActive();let c=this.revision;try{let l=await this.read(s);if(this.assertActive(),c===this.revision)return l}catch(l){if(this.assertActive(),c===this.revision)throw l}}})();this.pending.set(n,i);let a=()=>{this.pending.get(n)===i&&this.pending.delete(n)};return i.then(a,a),i}};var zt="sideNotes.notes",ut="sideNotes.note_tags",In="sideNotes.path_history";function Ao(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function ft(){return new Date().toISOString()}function ue(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function he(e){return typeof e=="string"?e:""}function ws(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=he(t.type);if(n==="pdf-page"){let o=he(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),...o?{snippet:o}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.2),height:ue(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,ue(t.seconds,0))};if(n==="markdown-line"){let o=he(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(ue(t.line,1))),...o?{snippet:o}:{}}}if(n==="markdown-heading"){let o=he(t.heading).trim();return o?{type:n,heading:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let o=he(t.snippet).trim();return o?{type:n,snippet:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.25),height:ue(t.height,.25)};if(n==="web-selection"){let o=he(t.snippet).trim();return o?{type:n,snippet:o}:{type:"none"}}return{type:"none"}}function vs(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function Ss(e){let t=he(e.id).trim(),n=he(e.path).trim(),o=ie(he(e.url)),s=he(e.note).trim();if(!t||!s||!n&&!o)return null;let i=he(e.createdAt)||ft(),a=Array.isArray(e.pathHistory)?e.pathHistory.filter(c=>typeof c=="string"&&c!==n):[];return{id:t,path:n,note:s,...o?{url:o}:{},pathHistory:[...new Set(a)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(c=>typeof c=="string"&&!!c.trim()).map(c=>c.trim()):[],anchor:ws(e.anchor),fileKey:vs(e.fileKey),createdAt:i,updatedAt:he(e.updatedAt)||i}}function te(e=y,t){let n=Ie,o=()=>{if(t?.(),e!==y||n!==Ie)throw new Error("SideNotes mutation session is no longer active")};o();let s=Te();return{api:e,reader:s,isActive:()=>{try{return o(),s.isActive()}catch{return!1}},assertActive:()=>{if(o(),!s.isActive())throw new Error("SideNotes mutation session is no longer active")}}}function se(e){return{...e,tags:[...e.tags],pathHistory:[...e.pathHistory],anchor:{...e.anchor},...e.fileKey?{fileKey:{...e.fileKey}}:{}}}async function $t(e,t){if(t.assertActive(),!e.path)return e;let n=await t.api.realm.stat(e.path);return t.assertActive(),n?{...e,fileKey:{dev:n.dev,ino:n.ino}}:e}function ko(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function xo(e,t,n){let o=[],s;do{e.assertActive();let i=await e.api.data.dataset(t).query({where:n,limit:1e3,cursor:s});e.assertActive(),o.push(...i.rows),s=i.cursor}while(s);return o}function Eo(e){return[...e.tags.map(t=>({dataset:ut,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:In,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function Ns(e,t){let n=await Promise.allSettled([xo(e,ut,{noteId:t}),xo(e,In,{noteId:t})]),o=n.find(a=>a.status==="rejected");if(o?.status==="rejected")throw o.reason;e.assertActive();let[s,i]=n.map(a=>a.value);return[...s.map(a=>({dataset:ut,operation:"delete",key:{noteId:t,tag:String(a.tag)}})),...i.map(a=>({dataset:In,operation:"delete",key:{noteId:t,position:Number(a.position)}}))]}function Te(){let e=y,t=Ie,n=e.getState().realm?.path??null,o=e.runtime.getOrCreate("sideNotes.noteRepository",()=>({current:null}));return o.current?.isActive()||(o.current?.dispose(),o.current=new jt(e,()=>{if(e!==y||t!==Ie)return!1;try{return(e.getState().realm?.path??null)===n}catch{return!1}},s=>Ss(s))),o.current}function Vt(e,t,n,o=[]){let s=ft();return{id:Ao(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:s,updatedAt:s}}function Ut(e,t,n,o=[]){let s=ft();return{id:Ao(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:s,updatedAt:s}}var xs={conflict:"REVISION_CONFLICT","document-not-found":"TARGET_NOT_FOUND"};function Bt(e){return e instanceof Error?e:new Error(String(e))}function Tn(e,t,n){let o=Bt(e),s=t==="not-applied"&&o.retryable===!0;return Object.assign(o,{code:typeof o.code=="string"?xs[o.code]??o.code:n,outcome:t,retryable:s})}function Io(e){let t=Bt(e);return t.outcome==="unknown"||t.outcomeUnknown===!0}function As(e,t="TARGET_UNAVAILABLE"){return Io(e)?Bt(e):Tn(e,"not-applied",t)}function ks(e){if(Io(e))return Tn(e,"unknown","OUTCOME_UNKNOWN");let t=Bt(e);return typeof t.code=="string"?Tn(t,"not-applied",t.code):t}function Ft(e,t){return Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}async function ye(e){try{return await e()}catch(t){throw As(t)}}async function _n(e){try{return await e()}catch(t){throw ks(t)}}async function To(e,t){await ye(async()=>t.assertActive()),await _n(()=>t.api.data.transaction([{dataset:zt,operation:"insert",values:ko(e)},...Eo(e)]))}async function _o(e,t=te()){let n=await $t(se(e),t);try{return await To(n,t),!0}catch{return!1}}async function Wt(e,t=te()){let n=await ye(()=>$t(se(e),t));await To(n,t)}async function Oo(e,t,n,o,s){let i={pluginId:s.api.pluginId,sourceId:"notes",itemId:e},{baseline:a,deletes:c}=await ye(async()=>{s.assertActive();let d=await s.api.documents.read(i);if(s.assertActive(),!d)throw Ft("TARGET_NOT_FOUND","The SideNote no longer exists.");if(n!==void 0){let f=await s.api.data.dataset(zt).get({id:e});if(s.assertActive(),!f)throw Ft("TARGET_NOT_FOUND","The SideNote no longer exists.");if(f.updatedAt!==n)throw Ft("REVISION_CONFLICT","This SideNote changed elsewhere. Newer work was preserved.")}let u=await Ns(s,e);return s.assertActive(),{baseline:d,deletes:u}}),l=ko(t);delete l.id,delete l.note,await _n(()=>s.api.documents.update(i,{expectedRevision:o?.expectedRevision??a.revision,realmGeneration:o?.realmGeneration??a.realmGeneration,body:t.note,explicitTags:t.tags,operations:[{dataset:zt,operation:"update",key:{id:e},values:l},...c.filter(d=>d.dataset!==ut),...Eo(t).filter(d=>d.dataset!==ut)]}))}async function qe(e,t,n,o,s=te()){let i=o?{...o}:void 0,a=await $t({...se(t),id:e},s);try{return await Oo(e,a,n,i,s),!0}catch{return!1}}async function On(e,t,n,o,s=te()){let i=o?{...o}:void 0,a=await ye(()=>$t({...se(t),id:e},s));await Oo(e,a,n,i,s)}async function Po(e,t){await ye(async()=>t.assertActive());let{affected:n}=await _n(()=>t.api.data.dataset(zt).delete({id:e}));if(n<=0)throw Ft("TARGET_NOT_FOUND","The SideNote no longer exists.")}async function Kt(e,t=te()){try{return await Po(e,t),!0}catch{return!1}}async function Gt(e,t=te()){await Po(e,t)}async function Co(e,t,n=te()){try{if(!e||!t||e===t)return;n.assertActive();let o=await n.reader.load();n.assertActive();let s=`${e}/`;for(let i of o){if(i.path!==e&&!i.path.startsWith(s))continue;let a=i.path===e?t:`${t}/${i.path.slice(s.length)}`,c={...i,path:a,pathHistory:[i.path,...i.pathHistory.filter(l=>l!==i.path)],updatedAt:ft()};n.assertActive(),await qe(i.id,c,void 0,void 0,n),n.assertActive()}}catch(o){if(n.isActive())throw o}}async function Ro(e,t,n,o=te()){try{if(!Number.isFinite(n)||n===0||!e)return;let s=Math.max(1,Math.floor(t));o.assertActive();let i=await o.reader.load();o.assertActive();for(let a of i){if(a.path!==e||a.anchor.type!=="markdown-line"||a.anchor.line<s)continue;let c={...a,anchor:{...a.anchor,line:Math.max(1,a.anchor.line+n)},updatedAt:ft()};o.assertActive(),await qe(a.id,c,void 0,void 0,o),o.assertActive()}}catch(s){if(o.isActive())throw s}}var Do={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var Is=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Ts=/^-\s+(.*)$/,_s=/^[A-Za-z][\w+.-]*:\/\//;function Mo(e){let t={bare:null,values:{},lists:{}},n=null;for(let o of e.split(`
`)){let s=o.trim();if(!s||s.startsWith("#"))continue;let i=s.match(Ts);if(i){n?t.lists[n].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let a=_s.test(s)?null:s.match(Is);if(a){let c=a[1].trim().toLowerCase(),l=a[2].trim();l===""?(n=c,t.lists[c]=t.lists[c]??[]):(n=null,t.values[c]=l);continue}n=null,t.bare===null&&(t.bare=s)}return t}function Lo(e,t,n=500){let o=e.values[t];if(o===void 0)return null;let s=Number.parseInt(o,10);return!Number.isFinite(s)||s<1?null:Math.min(s,n)}var jo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-realm browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"Preferred file extensions appear first, in this order. Extensions from saved SideNotes are added automatically, even when this list is empty.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"No extension","sideNotes.filter.web":"Web","sideNotes.error.load":"Could not load SideNotes. Try again.","sideNotes.action.retry":"Retry","bookmark.view":"Notes and filters","bookmark.item":"Selected item","menu.newFromSelection":"New SideNote from Selection"};var Fo={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem realm-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Bevorzugte Dateierweiterungen erscheinen zuerst, in dieser Reihenfolge. Erweiterungen gespeicherter SideNotes werden automatisch erg\xE4nzt, auch wenn diese Liste leer ist.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"Ohne Erweiterung","sideNotes.filter.web":"Internet","sideNotes.error.load":"SideNotes konnten nicht geladen werden. Versuche es erneut.","sideNotes.action.retry":"Erneut versuchen","bookmark.view":"Notizen und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","menu.newFromSelection":"Neue SideNote aus Auswahl"};var zo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda el realm.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Las extensiones preferidas aparecen primero, en este orden. Las extensiones de las SideNotes guardadas se a\xF1aden autom\xE1ticamente, aunque esta lista est\xE9 vac\xEDa.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.noExtension":"Sin extensi\xF3n","sideNotes.filter.web":"Sitio web","sideNotes.error.load":"No se pudieron cargar las SideNotes. Int\xE9ntalo de nuevo.","sideNotes.action.retry":"Reintentar","bookmark.view":"Notas y filtros","bookmark.item":"Elemento seleccionado","menu.newFromSelection":"Nueva SideNote desde la selecci\xF3n"};var $o={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le realm.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Les extensions pr\xE9f\xE9r\xE9es apparaissent en premier, dans cet ordre. Les extensions des SideNotes enregistr\xE9es sont ajout\xE9es automatiquement, m\xEAme si cette liste est vide.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.noExtension":"Sans extension","sideNotes.filter.web":"Site web","sideNotes.error.load":"Impossible de charger les SideNotes. R\xE9essayez.","sideNotes.action.retry":"R\xE9essayer","bookmark.view":"Notes et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","menu.newFromSelection":"Nouvelle SideNote depuis la s\xE9lection"};var Vo={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8 Realm \u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"\u9996\u9009\u6587\u4EF6\u6269\u5C55\u540D\u6309\u6B64\u987A\u5E8F\u4F18\u5148\u663E\u793A\u3002\u5DF2\u4FDD\u5B58\u7684 SideNotes \u4E2D\u7684\u6269\u5C55\u540D\u4F1A\u81EA\u52A8\u6DFB\u52A0\uFF0C\u5373\u4F7F\u6B64\u5217\u8868\u4E3A\u7A7A\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.noExtension":"\u65E0\u6269\u5C55\u540D","sideNotes.filter.web":"\u7F51\u9875","sideNotes.error.load":"\u65E0\u6CD5\u52A0\u8F7D SideNotes\u3002\u8BF7\u91CD\u8BD5\u3002","sideNotes.action.retry":"\u91CD\u8BD5","bookmark.view":"\u7B14\u8BB0\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","menu.newFromSelection":"\u4ECE\u6240\u9009\u5185\u5BB9\u65B0\u5EFA SideNote"};var Uo={en:jo,de:Fo,es:zo,fr:$o,"zh-CN":Vo};function Bo(e,t){return(Uo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(o,s)=>String(t?.[s]??""))}var Wo=Bo;function Ko(e){e.ui.registerCatalogs(Uo),Wo=(t,n)=>{let o=e.ui.t(t,n);return o===t?Bo(t,n):o}}function p(e,t){return Wo(e,t)}function Go(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.getState().activePath;return{getSnapshot:()=>(n.isActive()&&(o=t.getState().activePath),o),subscribe:s=>{if(!n.isActive())return()=>{};let i=!0,a=t.subscribe(()=>{i&&n.isActive()&&s()});return()=>{i=!1,a()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ho(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.interop.state.get(at),s=o?{...o}:null;return{getSnapshot:()=>{if(n.isActive()){let i=t.interop.state.get(at);i?(!s||i.instanceId!==s.instanceId||i.url!==s.url||i.title!==s.title)&&(s={...i}):s=null}return s},subscribe:i=>{if(!n.isActive())return()=>{};let a=!0,c=t.interop.state.subscribe(at,()=>{a&&n.isActive()&&i()});return()=>{a=!1,c()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ze(e){let[t]=r.useState(Te),[n,o]=r.useState([]),[s,i]=r.useState(!0),[a,c]=r.useState(null),l=r.useRef(!1),d=r.useRef(0),u=e?.kind??"all",f=e?.kind==="file"?e.path:e?.kind==="web"?ie(e.url):"",h=e?.kind==="file"&&e.includeWeb===!0,S=r.useCallback(()=>{if(!l.current||!t.isActive())return;let T=++d.current,A=u==="all"?void 0:u==="file"?{kind:u,path:f,includeWeb:h}:u==="web"?{kind:u,url:f}:{kind:u};t.load(A).then(L=>{!l.current||!t.isActive()||T!==d.current||(o(L),c(null),i(!1))}).catch(()=>{!l.current||!t.isActive()||T!==d.current||(c(p("sideNotes.error.load")),i(!1))})},[u,f,h,t]);return r.useEffect(()=>{l.current=!0,o([]),i(!0),c(null);let T=t.subscribe(S);return S(),()=>{l.current=!1,d.current++,T()}},[S,t]),{notes:n,setNotes:o,loading:s,error:a,reload:S}}function qo(){let[e,t]=r.useState(new Set),n=r.useCallback(s=>e.has(s),[e]),o=r.useCallback((s,i)=>{t(a=>{let c=new Set(a);return i?c.add(s):c.delete(s),c})},[]);return{isPending:n,setPending:o,pending:e}}var Pn="notes-sidenotes-fence-styles";function Ms(){if(document.getElementById(Pn))return;let e=document.createElement("style");e.id=Pn,e.textContent=`
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
`,document.head.appendChild(e)}var Zo=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?p("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},Ls=({code:e,path:t})=>{let n=Mo(e),o=n.values.file??n.bare??t,s=n.values.url?ie(n.values.url):null,i=(n.values.flagged??"").toLowerCase()==="true",a=n.values.tag?n.values.tag.replace(/^#/,"").toLowerCase():null,c=Lo(n,"limit",100)??20,{notes:l,loading:d,error:u,reload:f}=Ze(s?{kind:"web",url:s}:o?{kind:"file",path:o,includeWeb:!0}:i?void 0:{kind:"none"});if(u)return r.createElement("div",{className:"sidenotes-fence-empty",role:"alert"},u," ",r.createElement("button",{type:"button",onClick:f},p("sideNotes.action.retry")));if(d)return r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.33ce417454bf"));let h=l.filter(A=>s?A.url===s:o?!(A.path!==o||i&&A.flagged!==!0||a&&!A.tags.some(L=>L.replace(/^#/,"").toLowerCase()===a)):i?A.flagged===!0:!1).slice(0,c),S=()=>{y.workspace.revealOwnPanel("right_sidebar")},T=s??(o?o.split("/").pop():i?"flagged":null);return r.createElement(r.Fragment,null,r.createElement("div",{className:"sidenotes-fence-head",onClick:S,title:p("auto.954a9a37711e")},r.createElement("span",{className:"t"},p("auto.746eb1a86a79")," ",T?` \xB7 ${T}`:""),r.createElement("span",{className:"c"},h.length)),h.length===0&&r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.f545c86bbd6e")),h.map(A=>r.createElement("div",{key:A.id,className:"sidenotes-fence-note",onClick:S},r.createElement(y.ui.MarkdownView,{className:"body",value:A.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:A.id},sourcePath:A.path||void 0}}),r.createElement("div",{className:"meta"},A.flagged&&r.createElement("span",{className:"flag"},"\u2691"),Zo(A)&&r.createElement("span",null,Zo(A)),A.tags.slice(0,3).map(L=>r.createElement("span",{key:L},"#",L.replace(/^#/,"")))))))};function Xo(){let e=y.markdown.registerCodeBlockRenderer("sidenotes",(t,n,o)=>(Ms(),n.classList.add("sidenotes-fence"),y.ui.renderReact(n,r.createElement(Ls,{code:t,path:o.path}))),{examples:Do.sidenotes});return()=>{e(),document.getElementById(Pn)?.remove()}}var Ht=e=>typeof e=="string"?e:"";function Jo(e){let t=Ht(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Yo(e){let t={cardKind:"sidenote",open:async(n,o)=>{if(Ht(n.id)&&!o.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:Ht(n.id)}),!0;let s=Ht(n.url);if(s)return o.newTab?e.links.open(s,{newTab:!0}):e.links.open(s),!0;let i=Jo(n.path)||Jo(o.path);if(i){let a=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(i,a?.type==="web-selection"?void 0:a,{newTab:o.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(vn,t)}function js(e){return e.replace(/\s+/g," ").trim()}var Qo=200;function Fs(e,t){let n=js(e),o=n.slice(0,Qo);if(!t)return o;let s=n.replace(/ /g,"").slice(0,Qo).toLowerCase();if(!s)return o;let i=[],a="";for(let l=0;l<t.length;l++)/\s/.test(t[l])||(i.push(l),a+=t[l].toLowerCase());let c=a.indexOf(s);return c<0?o:t.slice(i[c],i[c+s.length-1]+1).trim()}function er(e,t){let n=e.text.trim(),o=Math.floor(e.page);return!n||!e.path||!Number.isFinite(o)||o<1?null:{kind:"file",path:e.path,page:o,snippet:Fs(n,t)}}function tr(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let n=t.text.trim();if(!n)return null;let o=Number(t.page);return!Number.isFinite(o)||o<1?null:{path:e,page:o,text:n}}function nr(e,t,n,o){let s=e.defaultView??window,i,a=!0,c=()=>{e.hidden||!a?(i!==void 0&&s.clearInterval(i),i=void 0):i===void 0&&(t(),i=s.setInterval(t,n))},l=s.IntersectionObserver,d=o&&l?new l(u=>{let f=u[u.length-1];f&&(a=f.isIntersecting,c())}):void 0;return d?.observe(o),e.addEventListener("visibilitychange",c),c(),()=>{d?.disconnect(),e.removeEventListener("visibilitychange",c),i!==void 0&&s.clearInterval(i),i=void 0}}function zs(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function $s(e,t,n=320){let o=t.top-n,s=t.top+t.height+n,i=0,a=e.length;for(;i<a;){let l=i+a>>>1;e[l].start+e[l].height<o?i=l+1:a=l}let c=i;for(a=e.length;i<a;){let l=i+a>>>1;e[l].start<=s?i=l+1:a=l}return[c,i]}function qt(e,t){let{ids:n,estimate:o,pinned:s=[],layoutKey:i}=t,a=t.enabled??n.length>80,c=e.useRef(null),l=e.useRef(new Map),[d,u]=e.useReducer(x=>x+1,0),[f,h]=e.useState({top:0,height:600}),[S,T]=e.useState(null),[A,L]=e.useState(null),z=e.useRef(null),Z=e.useRef(null),I=e.useMemo(()=>{let x=0;return n.map(_=>{let W=l.current.get(_)??o,$={id:_,height:W,start:x};return x+=W,$})},[n,o,d]),B=I.length?I[I.length-1].start+I[I.length-1].height:0,w=e.useRef({rows:I,viewport:f});w.current={rows:I,viewport:f};let R=e.useCallback(()=>{let x=c.current,_=z.current;if(!x||!_)return;let W=x.getBoundingClientRect(),$=_.getBoundingClientRect(),M=_.clientHeight||$.height||600,Y=_===x?_.scrollTop:$.top-W.top;h(de=>de.top===Y&&de.height===M?de:{top:Y,height:M})},[]),H=e.useCallback(()=>{Z.current===null&&(Z.current=requestAnimationFrame(()=>{Z.current=null,R()}))},[R]);e.useLayoutEffect(()=>{let x=c.current;if(!x||!a)return;let _=zs(x);z.current=_;let W=x.style.overflowAnchor;x.style.overflowAnchor="none";let $=!0,M=()=>{if(!$)return;let me=x.ownerDocument.activeElement,ne=me instanceof Element?me.closest("[data-visible-key]"):null;T(ne&&x.contains(ne)?ne.dataset.visibleKey??null:null)},Y=()=>{queueMicrotask(M)};_.addEventListener("scroll",H,{passive:!0}),window.addEventListener("resize",H),x.addEventListener("focusin",M),x.addEventListener("focusout",Y);let de=x.clientWidth,Ne=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{x.clientWidth!==de&&(de=x.clientWidth,l.current.clear(),u()),H()});return Ne?.observe(_),_!==x&&Ne?.observe(x),R(),()=>{$=!1,x.style.overflowAnchor==="none"&&(x.style.overflowAnchor=W),_.removeEventListener("scroll",H),window.removeEventListener("resize",H),x.removeEventListener("focusin",M),x.removeEventListener("focusout",Y),Ne?.disconnect(),Z.current!==null&&cancelAnimationFrame(Z.current),Z.current=null,z.current=null}},[a,R,H]),e.useLayoutEffect(()=>{let x=new Set(n);for(let _ of l.current.keys())x.has(_)||l.current.delete(_);R()},[n,R]),e.useLayoutEffect(()=>{l.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let x=c.current;if(!x||!a)return;let _=M=>{let Y=0,de=!1,{rows:Ne,viewport:me}=w.current,ne=new Map(Ne.map(oe=>[oe.id,oe]));for(let oe of M){let ge=oe.dataset.visibleKey,Ee=ge?ne.get(ge):void 0,be=oe.getBoundingClientRect().height;!ge||!Ee||be<=0||Math.abs(be-Ee.height)<.5||(l.current.set(ge,be),Ee.start+Ee.height<=me.top&&(Y+=be-Ee.height),de=!0)}de&&(Y&&z.current&&(z.current.scrollTop+=Y),u(),H())},W=Array.from(x.children).filter(M=>M.hasAttribute("data-visible-key")),$=typeof ResizeObserver>"u"?void 0:new ResizeObserver(M=>_(M.map(Y=>Y.target)));return W.forEach(M=>$?.observe(M)),_(W),()=>$?.disconnect()}),e.useLayoutEffect(()=>{if(!A)return;let x=Array.from(c.current?.children??[]).find(_=>_.dataset.visibleKey===A.id);x&&(x.scrollIntoView?.({block:"nearest"}),A.selector&&(x.matches(A.selector)?x:x.querySelector(A.selector))?.focus(),R(),L(null))},[A,I,R]);let ve=e.useCallback((x,_)=>{L({id:x,selector:_})},[]),[le,Le]=a?$s(I,f):[0,I.length],je=new Set;for(let x=le;x<Le;x++)je.add(x);let Se=new Set([...s,S,A?.id].filter(Boolean));return Se.size&&I.forEach((x,_)=>{Se.has(x.id)&&je.add(_)}),{ref:c,show:ve,render(x){let _=[],W=0;for(let $ of[...je].sort((M,Y)=>M-Y)){let M=I[$];M.start>W&&_.push(e.createElement("div",{key:`space:${M.id}`,"aria-hidden":!0,style:{height:M.start-W,flex:"0 0 auto",pointerEvents:"none"}})),_.push(e.createElement(e.Fragment,{key:M.id},x($))),W=M.start+M.height}return B>W&&_.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:B-W,flex:"0 0 auto",pointerEvents:"none"}})),_}}}var ir=4,Vs=32,Us=32,or=8*1024*1024,rr=new WeakMap;function sr(e){for(;e.active<ir&&e.tasks.length;){let t=e.tasks.shift();e.active++,t.read().then(t.resolve,t.reject).finally(()=>{e.active--,sr(e)})}}var xe=class extends Error{constructor(){super("SideNotes anchor reader is no longer active")}},we=class{constructor(t=y){V(this,"owner",t);V(this,"generation");V(this,"root");V(this,"disposed",!1);V(this,"unsubscribe",()=>{});V(this,"queue");V(this,"bytes",0);V(this,"cache",new Map);V(this,"pending",new Map);this.generation=Ie,this.root=t.getState().realm?.path??null,this.queue=rr.get(t)??{active:0,tasks:[]},rr.set(t,this.queue),this.unsubscribe=t.subscribe(()=>{this.isActive()||this.dispose()})}isActive(){if(this.disposed||this.owner!==y||this.generation!==Ie)return!1;try{return(this.owner.getState().realm?.path??null)===this.root}catch{return!1}}assertActive(){if(!this.isActive())throw new xe}dispose(){this.disposed||(this.disposed=!0,this.unsubscribe(),this.cache.clear(),this.bytes=0,this.queue.tasks=this.queue.tasks.filter(t=>t.owner!==this?!0:(t.reject(new xe),!1)),this.pending.clear())}file(t){return this.request(JSON.stringify(["file",t]),()=>this.owner.realm.readFile(t))}page(t,n){return this.request(JSON.stringify(["page",t,n]),()=>this.owner.workspace.getPdfPageText(t,n))}pageCount(t){this.assertActive();let n=this.owner.workspace.getPdfPageCount(t);return this.assertActive(),n}mediaDuration(){this.assertActive();let t=this.owner.workspace.getMediaDuration();return this.assertActive(),t}request(t,n){if(!this.isActive())return Promise.reject(new xe);let o=this.cache.get(t);if(o)return this.cache.delete(t),this.cache.set(t,o),Promise.resolve(o.value);let s=this.pending.get(t);if(s)return s;if(this.queue.active>=ir&&this.queue.tasks.length>=Vs)return Promise.reject(new Error("Too many SideNotes anchor reads"));let i,a=async()=>{this.assertActive();let d=await n();this.assertActive();let u=2*(t.length+(d?.length??0));if(u<=or){for(;this.cache.size>=Us||this.bytes+u>or;){let[f,h]=this.cache.entries().next().value;this.cache.delete(f),this.bytes-=h.bytes}this.cache.set(t,{value:d,bytes:u}),this.bytes+=u}return d},c=new Promise((d,u)=>{i={owner:this,read:a,resolve:d,reject:u}});this.pending.set(t,c);let l=()=>{this.pending.get(t)===c&&this.pending.delete(t)};return c.then(l,l),this.queue.tasks.push(i),sr(this.queue),c}};var mt={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function ht(){return["none","web-selection"]}function Rn(e){let t=De(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function dr(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let o=e.line??0;return!!t.lineRange&&o>=1&&o>=t.lineRange.from&&o<=t.lineRange.to}return!1}function cr(e,t){let n=De(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function bt(e){let t=De(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function gt(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var Zt=1e7,pt=1e6,Bs=Zt-1,ar=Zt-2;function Me(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function Cn(e,t){if(e.type==="pdf-page"){let n=e.page*Zt,o=e.snippet?Me(e.snippet):"";if(!o||t==null)return n;let s=Me(t).indexOf(o);return n+(s>=0?Math.min(s,ar):Bs)}if(e.type==="pdf-region")return e.page*Zt+Math.max(0,Math.min(e.y,ar));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?Me(e.snippet):"";if(n&&t!=null){let o=t.replace(/\r\n?/g,`
`).split(`
`);for(let s=0;s<o.length;s++){let i=Me(o[s]).indexOf(n);if(i>=0)return(s+1)*pt+Math.min(i,pt-1)}}return(e.line??0)*pt}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,o=n*pt,s=e.type==="markdown-heading"?"":e.snippet?Me(e.snippet):"";if(!s||t==null||n<1)return o;let i=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(i==null)return o;let a=Me(i).indexOf(s);return o+(a>=0?Math.min(a,pt-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}function lr(e,t,n){let o=n.get(e.id)??gt(e.anchor),s=n.get(t.id)??gt(t.anchor);return o!==s?o-s:t.createdAt.localeCompare(e.createdAt)}function Xe(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),o=Math.floor(t%3600/60),s=t%60;return n>0?`${n}:${String(o).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${o}:${String(s).padStart(2,"0")}`}function Je(e){return e.type==="pdf-page"?p("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?p("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?Xe(e.seconds):e.type==="markdown-line"?p("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?p(mt["image-region"]):e.type==="web-selection"?e.snippet||p(mt["web-selection"]):p(mt.none)}function ur(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function Dn(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let o=t.split(":").map(i=>Number(i));if(o.some(i=>!Number.isFinite(i)||i<0))return null;let s=o.reduce((i,a)=>i*60+a,0);return Number.isFinite(s)?s:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function Xt(e,t,n){if(n?.assertActive(),t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let o=n?await n.file(e):await y.realm.readFile(e);if(n?.assertActive(),!o)return t;let s=o.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let c=s[t.line-1]?.trim().slice(0,160);return c?{...t,snippet:c}:t}if(t.type==="markdown-heading"){let c=t.heading.trim().toLowerCase(),l=s.findIndex(d=>d.replace(/^#+\s*/,"").trim().toLowerCase()===c);return l>=0?{...t,line:l+1}:t}let i=t.snippet.trim(),a=i?s.findIndex(c=>c.includes(i)):-1;return a>=0?{...t,line:a+1}:t}async function fr(e,t,n){if(n?.assertActive(),!["pdf-page","media-time","markdown-line","markdown-heading","markdown-snippet"].includes(t.type))return"ok";let o=n??new we;try{if(o.assertActive(),t.type==="pdf-page"){let i=o.pageCount(e);if(typeof i=="number"&&t.page>i)return"missing";let a=t.snippet?await o.page(e,t.page):null;return o.assertActive(),pr(t,i,a)}if(t.type==="media-time"){let i=o.mediaDuration();return typeof i=="number"&&t.seconds>i?"missing":"ok"}let s=await o.file(e);return o.assertActive(),mr(t,s)}finally{n||o.dispose()}}function pr(e,t,n){return typeof t=="number"&&e.page>t||e.snippet&&n!==null&&!Me(n).includes(Me(e.snippet))?"missing":"ok"}function mr(e,t,n=t?.replace(/\r\n?/g,`
`).split(`
`)??[]){if(!t)return"ok";if(e.type==="markdown-line")return e.line<=n.length?"ok":"missing";if(e.type==="markdown-heading"){let i=e.heading.trim().toLowerCase();return n.some(a=>a.replace(/^#+\s*/,"").trim().toLowerCase()===i)?"ok":"missing"}if(e.type!=="markdown-snippet")return"ok";let o=e.snippet.trim();if(!o)return"ok";let s=n.filter(i=>i.includes(o)).length;return s===0?"missing":s>1?"ambiguous":"ok"}async function Jt(e,t,n={}){let o=new Map,s=new Map,i=new Map;for(let a of e){t.assertActive();let c=n.path??a.url??a.path,l=a.anchor;if(l.type==="pdf-page"||l.type==="markdown-line"||l.type==="markdown-heading"||l.type==="markdown-snippet"){let d=l.type==="pdf-page"?l.page:void 0,u=JSON.stringify([c,d??"file"]),f=o.get(u)??{path:c,page:d,notes:[]};f.notes.push(a),o.set(u,f)}else{let d=l.type==="media-time"?t.mediaDuration():null;s.set(a,l.type==="media-time"&&typeof d=="number"&&l.seconds>d?"missing":"ok"),n.positions&&i.set(a,Cn(l,null))}}for(let a of o.values())if(t.assertActive(),a.page!==void 0){let c=t.pageCount(a.path),d=a.notes.some(u=>u.anchor.type==="pdf-page"&&!!u.anchor.snippet)&&(n.positions||typeof c!="number"||a.page<=c)?await t.page(a.path,a.page):null;t.assertActive();for(let u of a.notes)s.set(u,pr(u.anchor,c,d)),n.positions&&i.set(u,Cn(u.anchor,d))}else{let c=await t.file(a.path);t.assertActive();let l=c?.replace(/\r\n?/g,`
`).split(`
`)??[];for(let d of a.notes)s.set(d,mr(d.anchor,c,l)),n.positions&&i.set(d,Cn(d.anchor,c))}return t.assertActive(),{statuses:new Map(e.filter(a=>s.get(a)!=="ok").map(a=>[a.id,s.get(a)])),keys:n.positions?new Map(e.map(a=>[a.id,i.get(a)])):new Map}}function yt(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function gr(e){let t=await y.realm.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var ae=e=>r.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?r.createElement("title",null,e.title):null,e.children),hr=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),r.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),br=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M12 5v14M5 12h14"})),Yt=e=>r.createElement(ae,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),r.createElement("path",{d:"M2 12h20"})),Qt=e=>r.createElement(ae,{...e},r.createElement("circle",{cx:"11",cy:"11",r:"8"}),r.createElement("path",{d:"m21 21-4.3-4.3"})),yr=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),en=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),wt=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),r.createElement("path",{d:"M4 22v-7"})),wr=e=>r.createElement(ae,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"1"}),r.createElement("circle",{cx:"19",cy:"12",r:"1"}),r.createElement("circle",{cx:"5",cy:"12",r:"1"})),vr=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M12 20h9"}),r.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Sr=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M3 6h18"}),r.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),r.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),Mn=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M20 6 9 17l-5-5"})),Nr=e=>r.createElement(ae,{...e},r.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),xr=e=>r.createElement(ae,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"8"}),r.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),r.createElement("circle",{cx:"12",cy:"12",r:"2"})),Ye=e=>r.createElement(ae,{...e},r.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),r.createElement("path",{d:"M12 9v4M12 17h.01"})),Qe=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),r.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),et=e=>r.createElement(ae,{...e},r.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),r.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var q={type:"string",maxLength:1048576},tn={type:"array",items:q,maxItems:1e4},_e=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ue=(e,t={},n=[])=>_e({type:{const:e},...t},["type",...n]),Ln={oneOf:[Ue("none"),Ue("pdf-page",{page:{type:"integer",minimum:1},snippet:q},["page"]),Ue("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),Ue("markdown-line",{line:{type:"integer",minimum:1},snippet:q},["line"]),Ue("markdown-heading",{heading:q,line:{type:"integer",minimum:1}},["heading"]),Ue("markdown-snippet",{snippet:q,line:{type:"integer",minimum:1}},["snippet"]),Ue("web-selection",{snippet:q},["snippet"])]},Ar=_e({id:q,path:q,url:q,pathHistory:tn,note:q,flagged:{type:"boolean"},tags:tn,anchor:Ln,fileKey:_e({dev:{type:"number"},ino:{type:"number"}},["dev","ino"]),createdAt:q,updatedAt:q},["id","path","pathHistory","note","tags","anchor","createdAt","updatedAt"]),Ws=_e({note:{type:"string",minLength:1},tags:tn,flagged:{type:"boolean"},anchor:Ln});function ke(e,t){throw Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}function pe(e){return Object.assign(new Error(e),{code:"INVALID_INPUT",outcome:"not-applied",retryable:!1})}async function vt(e,t){try{return await Ae(e,t)}catch(n){throw Object.assign(n instanceof Error?n:new Error(String(n)),{outcome:"unknown",retryable:!1})}}function Be(e){if(!e||typeof e!="object"||Array.isArray(e))throw pe("Expected an object.");return e}function Oe(e,t){if(typeof e!="string"||!e.trim())throw pe(`Expected ${t}.`);return e.trim()}function Ks(e){let t=Be(e),n=s=>{let i=t[s];if(typeof i!="number"||!Number.isInteger(i)||i<1)throw pe(`Invalid anchor ${s}.`);return i},o=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...o};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw pe("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...o};case"markdown-heading":return{type:"markdown-heading",heading:Oe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:Oe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:Oe(t.snippet,"snippet")};default:throw pe("Unsupported editable anchor.")}}function kr(e){let t=Be(e);if(Object.keys(t).some(o=>!["note","tags","flagged","anchor"].includes(o)))throw pe("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=Oe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(o=>typeof o=="string"))throw pe("Expected a list of tags.");n.tags=[...new Set(t.tags.map(o=>o.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw pe("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=Ks(t.anchor)),n}function Tr(e){return{...e,...e.tags?{tags:[...e.tags]}:{},...e.anchor?{anchor:{...e.anchor}}:{}}}async function _r(e,t,n){n.assertActive();let o=new we(n.api);try{let s=await Xt(e,t,o);return n.assertActive(),s}finally{o.dispose()}}async function Ae(e,t=te()){t.assertActive();let n=await t.reader.load({kind:"ids",ids:[e]});t.assertActive();let o=n.find(s=>s.id===e);return o||ke("TARGET_NOT_FOUND","The SideNote no longer exists."),o}async function Er(e,t){try{await e()}catch(n){throw n?.outcome!=="not-applied"&&t(),n}t()}async function Ir(e,t,n){await ye(async()=>{n.assertActive(),t||ke("REVISION_CONFLICT","The SideNote state after this operation is unknown. Newer work was preserved.");let o=await Ae(e,n);JSON.stringify(o)!==JSON.stringify(t)&&ke("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved.")})}async function jn(e,t,n,o,s=te()){let i=Tr(t),a=o?{...o}:void 0,{previous:c,next:l}=await ye(async()=>{s.assertActive();let h=se(await Ae(e,s));s.assertActive(),n!==void 0&&h.updatedAt!==n&&ke("REVISION_CONFLICT","This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let S=i.anchor??h.anchor;return i.anchor&&((h.url?ht():bt(h.path)).includes(S.type)||ke("INVALID_INPUT","This anchor does not apply to the SideNote subject."),S=await _r(h.path,S,s),s.assertActive()),{previous:h,next:se({...h,...i,anchor:S,updatedAt:new Date().toISOString()})}});await On(e,l,c.updatedAt,a,s);let d=se(await vt(e,s)),u=d,f=async h=>{let S=await ye(async()=>{s.assertActive();let T=await Ae(e,s);return JSON.stringify(T)!==JSON.stringify(u)&&ke("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved."),T});await On(e,h,S.updatedAt,void 0,s),u=se(await vt(e,s))};return{value:se(d),revert:{label:"Edit SideNote",run:()=>f(c),reapply:()=>f(l)}}}async function nn(e,t,n,o=!1){let s=te(e,n);s.assertActive();let i={path:t.path,url:t.url,anchor:{...t.anchor}};if(i.url){let a=await(o?e.links.open(i.url,{newTab:!0}):e.links.open(i.url));s.assertActive(),(a.status==="failed"||a.status==="unavailable")&&ke("TARGET_UNAVAILABLE",a.message??"Destination unavailable")}else{let a=await e.realm.fileInfo(i.path);s.assertActive(),a||ke("TARGET_NOT_FOUND","The annotation file no longer exists.");let c=i.anchor.type==="web-selection"?void 0:i.anchor;o?e.workspace.openFile(i.path,c,{newTab:!0}):e.workspace.openFile(i.path,c)}}function Or(e){let t=!1,n=te(e,()=>{if(t)throw new Error("SideNotes commands are no longer active")}),o=async l=>{n.assertActive();let d={...l};if(d.id)return Ae(d.id,n);let u=d.path?await e.realm.fileInfo(d.path):{url:d.url};return n.assertActive(),u},s={schema:_e({id:q},["id"]),parse:l=>({id:Oe(Be(l).id,"SideNote id")}),fromCli:l=>({id:l[0]})},i={schema:_e({id:q,newTab:{type:"boolean"}},["id"]),parse:l=>{let d=Be(l),u=Oe(d.id,"SideNote id");if(d.newTab!==void 0&&typeof d.newTab!="boolean")throw pe("Expected newTab to be a boolean.");return d.newTab===!0?{id:u,newTab:!0}:{id:u}},fromCli:s.fromCli},a=l=>{let d={...l,outputSchema:l.id==="list"?{type:"array",items:Ar,maxItems:1e4}:Ar};return e.commands.register(d)},c=[a({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:_e({path:q,url:q,query:q,flagged:{type:"boolean"}}),parse:l=>{let d=l==null?{}:Be(l);for(let u of["path","url","query"])if(d[u]!==void 0&&typeof d[u]!="string")throw pe(`Expected ${u} text.`);if(d.flagged!==void 0&&typeof d.flagged!="boolean")throw pe("Expected a boolean flag.");return{path:d.path,url:d.url,query:d.query,flagged:d.flagged}}},run:async l=>{n.assertActive();let d={...l},u=await n.reader.load();return n.assertActive(),u.filter(f=>(!d.path||f.path===d.path)&&(!d.url||f.url===ie(d.url))&&(d.flagged===void 0||!!f.flagged===d.flagged)&&(!d.query||`${f.note} ${f.tags.join(" ")}`.toLowerCase().includes(d.query.toLowerCase())))}}),a({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:s,run:({id:l})=>Ae(l,n)}),a({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"execute",input:i,run:async({id:l,newTab:d})=>{let u=await Ae(l,n);return await nn(e,u,n.assertActive,d),n.assertActive(),await e.workspace.revealOwnPanel("right_sidebar"),n.assertActive(),u}}),a({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:_e({path:q,url:q,note:{type:"string",minLength:1},tags:tn,anchor:Ln},["note"]),parse:l=>{let d=Be(l),u=typeof d.path=="string"?d.path.trim():"",f=typeof d.url=="string"?d.url.trim():"";if(!!u==!!f)throw pe("Provide exactly one file path or URL.");if(f&&!/^https?:\/\//i.test(f))throw pe("Expected an HTTP or HTTPS URL.");return{path:u,url:f,...kr({note:Oe(d.note,"note text"),tags:d.tags,anchor:d.anchor})}}},run:async l=>{let d=Tr(l),u=await ye(async()=>{if(n.assertActive(),d.path){let T=await e.realm.fileInfo(d.path);n.assertActive(),T||ke("TARGET_NOT_FOUND","The annotation file does not exist.")}let h=d.anchor??{type:"none"};(d.url?ht():bt(d.path)).includes(h.type)||ke("INVALID_INPUT","This anchor does not apply to the annotation subject.");let S=d.url?Ut(ie(d.url),d.note,h,d.tags):Vt(d.path,d.note,await _r(d.path,h,n),d.tags);return n.assertActive(),S});await Wt(u,n);let f=se(await vt(u.id,n));return{value:se(u),revert:{label:"Create SideNote",run:async()=>{await Ir(u.id,f,n),await Er(()=>Gt(u.id,n),()=>{f=void 0})},reapply:async()=>{n.assertActive(),await Wt(u,n),f=se(await vt(u.id,n))}}}},revision:l=>o(l),preview:l=>(n.assertActive(),{changes:l})}),a({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:_e({id:q,values:Ws,expectedUpdatedAt:q},["id","values"]),parse:l=>{let d=Be(l);return{id:Oe(d.id,"SideNote id"),values:kr(d.values),expectedUpdatedAt:d.expectedUpdatedAt===void 0?void 0:Oe(d.expectedUpdatedAt,"revision")}}},run:({id:l,values:d,expectedUpdatedAt:u})=>jn(l,d,u,void 0,n),revision:l=>o(l),preview:l=>(n.assertActive(),{changes:l})}),a({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:s,run:async({id:l})=>{let d=await ye(async()=>{let f=se(await Ae(l,n));return n.assertActive(),f});await Gt(l,n);let u;return{value:se(d),revert:{label:"Delete SideNote",run:async()=>{n.assertActive(),await Wt(d,n),u=se(await vt(l,n))},reapply:async()=>{await Ir(l,u,n),await Er(()=>Gt(l,n),()=>{u=void 0})}}}},revision:l=>o(l),preview:l=>(n.assertActive(),{changes:l})})];return()=>{t=!0,c.forEach(l=>l())}}var on=({field:e,direction:t,options:n,onFieldChange:o,onDirectionChange:s,directionForField:i})=>{let[a,c]=r.useState(e),[l,d]=r.useState(t);return r.createElement("div",{className:"sidenote-sort-popover-body"},r.createElement("div",{className:"sidenote-sort-heading"},r.createElement("span",null,p("auto.90fd0e9a6276")),r.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(u=>r.createElement("button",{key:u,type:"button",className:`sidenote-sort-direction${l===u?" active":""}`,"aria-label":p(u==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":l===u,onClick:()=>{d(u),s(u)}},u==="asc"?r.createElement(Qe,null):r.createElement(et,null))))),r.createElement("div",{className:"sidenote-sort-options"},n.map(u=>r.createElement("button",{key:u.value,type:"button",className:`sidenote-popover-option${a===u.value?" active":""}`,"aria-pressed":a===u.value,onClick:()=>{let f=a!==u.value;c(u.value),o(u.value);let h=f?i?.(u.value):void 0;h&&(d(h),s(h))}},r.createElement("span",null,u.label),r.createElement(Mn,{className:"sidenote-popover-check"})))))},Cr=({value:e,options:t,onChange:n})=>{let[o,s]=r.useState(e);return r.createElement("div",{className:"sidenote-sort-options sidenote-filter-options"},t.map(i=>r.createElement("button",{key:i.value,type:"button",className:`sidenote-popover-option${o===i.value?" active":""}`,"aria-pressed":o===i.value,onClick:()=>{s(i.value),n(i.value)}},r.createElement("span",null,i.label),r.createElement(Mn,{className:"sidenote-popover-check"}))))},Pr=({value:e,min:t,ariaLabel:n,onCommit:o})=>{let[s,i]=r.useState(String(e)),a=r.useRef(!1);r.useEffect(()=>{a.current||i(String(e))},[e]);let c=l=>{let d=Number(l),u=l.trim()===""||!Number.isFinite(d)?t:Math.max(t,d);i(String(u)),o(u)};return r.createElement("input",{type:"number",min:t,value:s,"aria-label":n,onFocus:()=>{a.current=!0},onChange:l=>{i(l.target.value);let d=Number(l.target.value);l.target.value.trim()!==""&&Number.isFinite(d)&&o(Math.max(t,d))},onBlur:l=>{a.current=!1,c(l.target.value)}})},Gs=({seconds:e,onCommit:t})=>{let[n,o]=r.useState(Xe(e)),s=r.useRef(!1);r.useEffect(()=>{s.current||o(Xe(e))},[e]);let i=()=>{let a=y.workspace.getMediaTime();a!==null&&(t(Math.max(0,a)),o(Xe(a)))};return r.createElement("div",{className:"sidenote-time-field"},r.createElement("input",{value:n,placeholder:"0:00","aria-label":p("auto.19eabc961735"),onFocus:()=>{s.current=!0},onChange:a=>{o(a.target.value);let c=Dn(a.target.value);c!==null&&t(c)},onBlur:a=>{s.current=!1;let c=Dn(a.target.value),l=c===null?0:Math.max(0,c);t(l),o(Xe(l))}}),r.createElement("button",{type:"button",className:"sidenote-time-capture",title:p("auto.528bfa4632ef"),onClick:i},p("auto.e3b82040565b")))},Fn=({path:e,web:t=!1,anchor:n,onChange:o,validationMsg:s,invalid:i})=>{let a=t?ht():bt(e),{SelectField:c}=y.ui.settings,l=y.ui.ComboField,[d,u]=r.useState([]);return r.useEffect(()=>{if(n.type!=="markdown-heading"){u([]);return}gr(e).then(u)},[e,n.type]),a.length===1&&n.type==="none"?r.createElement(r.Fragment,null):r.createElement("div",{className:`sidenote-anchor-editor${i?" invalid":""}`},r.createElement("div",{className:"sidenote-select-wrap"},r.createElement(c,{value:n.type,onChange:f=>o(ur(f,n)),ariaLabel:p("auto.9c36384c83fb"),options:a.map(f=>({value:f,label:t&&f==="none"?p("auto.eeb742ed8cac"):p(mt[f])}))})),n.type==="web-selection"&&r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.98c236df91df"),"aria-label":p("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&r.createElement(r.Fragment,null,r.createElement(Pr,{value:n.page,min:1,ariaLabel:p("auto.300721defdc9"),onCommit:f=>o({...n,page:f})}),r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:f=>o({...n,snippet:f.target.value||void 0}),placeholder:p("auto.2599b7d91cc5"),"aria-label":p("auto.1e149756b7c6")})),n.type==="media-time"&&r.createElement(Gs,{seconds:n.seconds,onCommit:f=>o({...n,seconds:f})}),n.type==="markdown-line"&&r.createElement(Pr,{value:n.line,min:1,ariaLabel:p("auto.7555728cb6e5"),onCommit:f=>o({...n,line:f})}),n.type==="markdown-heading"&&r.createElement(l,{value:n.heading,onChange:f=>o({...n,heading:f}),options:d.map(f=>({value:f,label:f})),placeholder:p("auto.a3089b7fae27"),ariaLabel:p("auto.353e665a44c8")}),n.type==="markdown-snippet"&&r.createElement("input",{value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.2e5ce5a06a35"),"aria-label":p("auto.ef6127596cae")}),s&&r.createElement("p",{className:"sidenote-anchor-warning"},s))},zn=({value:e,onChange:t,onSave:n,onCancel:o,autoFocus:s,disabled:i})=>r.createElement("textarea",{className:"sidenote-note-input",value:e,rows:4,autoFocus:s,disabled:i,"aria-label":p("sideNotes.field.note"),placeholder:p("sideNotes.field.note"),onChange:a=>t(a.target.value),onKeyDown:a=>{a.key==="Enter"&&y.ui.hasModKey(a)?(a.preventDefault(),n()):a.key==="Escape"&&o&&(a.preventDefault(),a.stopPropagation(),o())}}),rn=({note:e,onSaved:t,onClose:n})=>{let[o,s]=r.useState(e.note),[i,a]=r.useState(e.tags),[c,l]=r.useState(e.anchor),[d,u]=r.useState(!!e.flagged),[f,h]=r.useState(!1),[S,T]=r.useState(""),[A,L]=r.useState(),z={pluginId:"sideNotes",sourceId:"notes",itemId:e.id};r.useEffect(()=>{let w=!0;return y.documents.read({pluginId:"sideNotes",sourceId:"notes",itemId:e.id}).then(R=>{w&&R&&L({expectedRevision:R.revision,realmGeneration:R.realmGeneration})}).catch(R=>{w&&T(R instanceof Error?R.message:String(R))}),()=>{w=!1}},[e.id]);let Z=async()=>{if(!f)try{await y.documents.drafts.clear(z),n()}catch(w){T(w instanceof Error?w.message:String(w))}},I=async()=>{if(!(f||!o.trim())){h(!0),T("");try{if(!A)throw new Error(p("sideNotes.error.save"));let w=await jn(e.id,{note:o,tags:i,anchor:c,flagged:d},e.updatedAt,A);y.undo.push({label:p("sideNotes.command.update"),undo:async()=>{try{return await w.revert.run(),{ok:!0}}catch(R){return{ok:!1,message:String(R)}}},redo:async()=>{try{return await w.revert.reapply(),{ok:!0}}catch(R){return{ok:!1,message:String(R)}}}}),t(w.value),await y.documents.drafts.clear(z),n()}catch(w){T(w instanceof Error?w.message:String(w))}finally{h(!1)}}},B=r.createElement("div",{className:"sidenote-edit-actions"},r.createElement("button",{className:"sidenote-cancel-btn",disabled:f,onClick:()=>{Z()}},p("auto.77dfd2135f4d")),r.createElement("button",{className:"sidenote-save-btn",disabled:f||!o.trim()||!A,onClick:()=>{I()}},p("auto.efc007a393f6")));return r.createElement(y.ui.Modal,{title:p("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{Z()},footer:B},r.createElement(zn,{value:o,onChange:s,onSave:()=>{I()},disabled:f,autoFocus:!0}),r.createElement(y.ui.TagInput,{value:i,onChange:a}),r.createElement(Fn,{path:e.path,web:!!e.url,anchor:c,onChange:l}),r.createElement("label",null,r.createElement("input",{type:"checkbox",checked:d,disabled:f,onChange:w=>u(w.target.checked)}),p("sideNotes.field.flagged")),S&&r.createElement("p",{role:"alert"},p("sideNotes.error.save")," ",S))},sn=({noteId:e,setOpenId:t,onEdit:n,onDelete:o,disabled:s=!1})=>r.createElement("div",{className:"sidenote-menu-wrap"},r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.5430d0e5fb8c"),title:p("auto.6bf5da9c080b"),disabled:s,onClick:i=>{i.stopPropagation(),t(e),y.ui.openMenu([{label:p("auto.5301648dcf6b"),icon:r.createElement(vr,null),enabled:!s,onSelect:n},{label:p("auto.f6fdbe48dc54"),icon:r.createElement(Sr,null),enabled:!s,danger:!0,onSelect:o}],{anchor:i.currentTarget,align:"end"}).finally(()=>t(null))}},r.createElement(wr,null)));function Hs(e){let t=[],n=e.replace(/#(\S+)/g,(o,s)=>(t.push(s.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function an(e,t,...n){let o=Hs(e);if(!o.tags.length&&!o.text)return!0;let s=t.map(i=>i.toLowerCase());for(let i of o.tags)if(!s.some(a=>a.startsWith(i)))return!1;return!(o.text&&!n.map(a=>a.toLowerCase()).some(a=>a.includes(o.text)))}var $n={type:"object",properties:{v:{type:"literal",value:1},search:{type:"string"},filterWarning:{type:"boolean"},showAll:{type:"boolean"},compact:{type:"boolean"},sourceType:{type:"string"},sortField:{type:"string"},sortDir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]},aware:{type:"boolean"},path:{type:"string"},url:{type:"string"},noteId:{type:"string"}},required:["v","search","filterWarning","sortField","sortDir"],additionalProperties:!1};function Pe(){return y.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function St(e=Pe()){for(let t of e.listeners)t()}function Rr(e,t=Pe()){let n=t.listeners;return n.add(e),()=>{n.delete(e)}}function Nt(e,t=Pe()){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...t.views.get(e)}}function fe(e,t,n){let o=()=>Nt(e)[t]??n;return[r.useSyncExternalStore(Rr,o,o),i=>{Pe().views.set(e,{...Nt(e),[t]:typeof i=="function"?i(o()):i}),St()}]}function tt(e,t){e?Pe().selected.set(t,e):Pe().selected.delete(t),St()}function Dr(e,t){r.useEffect(()=>{let n=Pe(),o=Nt("right_sidebar",n);if(o.path===e&&o.url===t)return;let s=n.views.get("right_sidebar"),i={...o,path:e,url:t};n.views.set("right_sidebar",i);let a=n.selected.get("right_sidebar"),c=a&&(a.path!==e||(a.url??"")!==t)?a:void 0;return c&&n.selected.delete("right_sidebar"),St(n),()=>{let l=n.views.get("right_sidebar");if(!l||l.path!==e||l.url!==t)return;if(l===i&&!s)n.views.delete("right_sidebar");else if(l===i)n.views.set("right_sidebar",s);else{let f={...l};delete f.path,delete f.url,s&&"path"in s&&(f.path=s.path),s&&"url"in s&&(f.url=s.url),n.views.set("right_sidebar",f)}let d=Nt("right_sidebar",n),u=n.selected.get("right_sidebar");(!u||u.path!==d.path||(u.url??"")!==d.url)&&(c?n.selected.set("right_sidebar",c):n.selected.delete("right_sidebar")),St(n)}},[e,t])}function qs(e,t=Pe()){let n=t.selected.get(e),o={...Nt(e,t)};return o.path||delete o.path,{title:p("manifest.name"),view:o,...n?{item:{id:n.id,title:n.note.split(`
`)[0].slice(0,100),state:{...o,noteId:n.id}}}:{}}}function Mr(e){let t=Pe(),n=Te(),o=!1,s=()=>{if(o||!n.isActive())throw new Error("SideNotes surface is no longer active")},i=te(e,s),a=new Map,l=["left_sidebar","right_sidebar"].map(u=>An(e,{id:`sideNotes.${u}`,surface:u,getSnapshot:()=>qs(u,t),subscribe:f=>Rr(f,t),restore:async(f,h,S)=>{s(),f={...f};let T=S?.background===!0,A=(a.get(u)??0)+1;a.set(u,A);let L=()=>{if(s(),a.get(u)!==A)throw new Error("SideNotes surface restore was replaced")};if(f.v!==1)throw new Error("Unsupported SideNotes bookmark.");let z=typeof f.noteId=="string"?await Ae(f.noteId,i):null;L();let Z=async B=>{let w=await e.realm.fileInfo(B);return L(),!!w};if(u==="right_sidebar"&&!z&&typeof f.path=="string"&&f.path&&!await Z(f.path))throw new Error("The bookmarked file no longer exists.");if(z&&!z.url&&!await Z(z.path))throw new Error("The bookmarked file no longer exists.");!T&&z?await nn(e,z,L):!T&&u==="right_sidebar"&&(typeof f.path=="string"&&f.path||typeof f.url=="string"&&f.url)&&await nn(e,{path:typeof f.path=="string"?f.path:"",url:typeof f.url=="string"?f.url:void 0,anchor:{type:"none"}},L),L();let I={v:1};for(let B of["search","path","url","sourceType"])typeof f[B]=="string"&&(I[B]=f[B]);for(let B of["showAll","compact","filterWarning","aware"])I[B]=f[B]===!0;I.sortField=["position","updated","created","title"].includes(String(f.sortField))?f.sortField:u==="left_sidebar"?"updated":"position",I.sortDir=f.sortDir==="desc"?"desc":"asc",t.views.set(u,I),z?t.selected.set(u,z):t.selected.delete(u),St(t)}},{stateSchema:$n,itemStateSchema:{...$n,required:[...$n.required,"noteId"]},description:(f,h)=>typeof f.view.path=="string"&&f.view.path?f.view.path:p(h?"bookmark.item":"bookmark.view")})),d=0;return l.push(n.subscribe(()=>{if(o||!n.isActive())return;let u=++d,f=[...t.selected];f.length&&n.load({kind:"ids",ids:f.map(([,h])=>h.id)}).then(h=>{if(!(o||!n.isActive()||u!==d)){for(let[S,T]of f){if(t.selected.get(S)!==T)continue;let A=h.find(L=>L.id===T.id);A?t.selected.set(S,A):t.selected.delete(S)}for(let S of t.listeners)S()}}).catch(()=>{if(!o&&n.isActive()&&u===d)for(let h of t.listeners)h()})})),()=>{o=!0,l.forEach(u=>u())}}function dn(e,t,n=!1){if(e.url){n?y.links.open(e.url,{newTab:!0}):e.url!==t&&y.links.open(e.url);return}let o=e.anchor.type==="web-selection"?void 0:e.anchor;n?y.workspace.openFile(e.path,o,{newTab:!0}):y.workspace.openFile(e.path,o)}function Lr(e){return e.button!==1?!1:(e.preventDefault(),!0)}var jr={position:"Position",created:"Created",updated:"Updated"},Zs={position:"asc",created:"desc",updated:"desc"},Fr=()=>{let e=r.useRef(null),t=Go()??"",n=Ho(),o=!t&&!!n?.url,s=o&&n?ie(n.url):"",i=o?"":t,a=r.useMemo(()=>De(i),[i]),c=a==="pdf"||a==="video"||a==="audio"||a==="text",l=!!i||o,d=o?`web:${s}`:i;Dr(i,s);let{notes:u,setNotes:f,loading:h,error:S,reload:T}=Ze(o?{kind:"web",url:s}:i?{kind:"file",path:i}:{kind:"none"}),{isPending:A,setPending:L,pending:z}=qo(),[Z,I]=r.useState(""),[B,w]=r.useState([]),[R,H]=r.useState(()=>Rn(i)),[ve,le]=r.useState(!1),[Le,je]=r.useState(null),[Se,x]=r.useState(null),[_,W]=fe("right_sidebar","search",""),[$,M]=fe("right_sidebar","filterWarning",!1),[Y,de]=fe("right_sidebar","sortField",c?"position":"updated"),[Ne,me]=fe("right_sidebar","sortDir",c?"asc":"desc"),ne=!c&&Y==="position"?"updated":Y,oe=!c&&Y==="position"?"desc":Ne,[ge,Ee]=r.useState(new Map),[be,Fe]=r.useState({}),[ot,cn]=r.useState("ok"),[b,v]=r.useState(!1),D=r.useRef(!1),[K,O]=r.useState(0),[re,ze]=r.useState(new Map),[Ce,Hr]=fe("right_sidebar","aware",!1),[ln,Wn]=r.useState({}),[qr,Zr]=r.useState(0),[Xr,Jr]=r.useState(0),rt=Dt();r.useEffect(()=>y.files.onAnchorInfoChanged(()=>O(m=>m+1)),[]),r.useEffect(()=>rt.subscribe(()=>Jr(m=>m+1)),[rt]);let Kn=r.useMemo(()=>{let m=Number(y.settings.get().mediaRangeSeconds);return Number.isFinite(m)&&m>=0?m:10},[qr]);r.useEffect(()=>y.settings.subscribe(()=>Zr(m=>m+1)),[]);let un=r.useCallback(()=>({pdfPages:i?y.workspace.getPdfVisiblePages(i):null,mediaSeconds:y.workspace.getMediaTime(),lineRange:i?y.workspace.getVisibleLineRange(i):null}),[i]);r.useEffect(()=>{if(!Ce||!i||!c){Wn({});return}let m=()=>Wn(un());m();let g=y.files.onActivePositionChanged(m),C=a==="video"||a==="audio"?nr(e.current?.ownerDocument??document,m,1e3,e.current):void 0;return()=>{g(),C?.()}},[Ce,i,a,c,un]);let it=r.useMemo(()=>o?u.filter(m=>m.url===s):i?u.filter(m=>m.path===i&&!m.url):[],[u,i,s,o]),At=r.useMemo(()=>{if(ne==="position"){let g=[...it].sort((P,C)=>lr(P,C,re));return oe==="desc"?g.reverse():g}let m=ne==="created"?"createdAt":"updatedAt";return[...it].sort((g,P)=>{let C=g[m].localeCompare(P[m])||gt(g.anchor)-gt(P.anchor);return oe==="asc"?C:-C})},[it,ne,oe,re]),kt=r.useMemo(()=>{let m=_.trim()?At.filter(g=>an(_,g.tags??[],g.note)):At;return Ce&&c&&(m=m.filter(g=>dr(g.anchor,ln,Kn))),$&&(m=m.filter(g=>ge.has(g.id))),m},[At,_,$,ge,Ce,c,ln,Kn]),Et=r.useRef([]),[Yr,Gn]=r.useState(0);r.useEffect(()=>{Et.current=kt.map(m=>m.id),Gn(m=>m+1)},[i,ne,oe,_,$,Ce,ln]);let It=r.useMemo(()=>{let m=new Map(kt.map(C=>[C.id,C])),g=[];for(let C of Et.current){let X=m.get(C);X&&g.push(X)}let P=new Set(Et.current);for(let C of kt)P.has(C.id)||g.push(C);return Et.current=g.map(C=>C.id),g},[kt,Yr]),Qr=r.useMemo(()=>It.map(m=>m.id),[It]),Hn=qt(r,{ids:Qr,estimate:140,pinned:[Se?.id,Le]});r.useEffect(()=>{H(o?{type:"none"}:Rn(i)),I(""),w([]),le(!1),de(c?"position":"updated"),me(c?"asc":"desc")},[d]),r.useEffect(()=>{let m=new we,g=ne==="position";return Jt(it,m,{path:i,positions:g}).then(({statuses:P,keys:C})=>{m.isActive()&&(Ee(P),Fe(X=>({...X,projection:void 0})),g&&(ze(C),Gn(X=>X+1)))}).catch(P=>{P instanceof xe||!m.isActive()||Fe(C=>({...C,projection:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[it,i,ne,K]),r.useEffect(()=>{if(!ve||!i){Fe(g=>({...g,draft:void 0}));return}let m=new we;return fr(i,R,m).then(g=>{m.isActive()&&(cn(g),Fe(P=>({...P,draft:void 0})))}).catch(g=>{g instanceof xe||!m.isActive()||Fe(P=>({...P,draft:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[R,ve,i,K]);let qn=async()=>{if(D.current)return;let m=Z.trim();if(!(!m||!l)){D.current=!0,v(!0);try{let g=o?Ut(s,m,R,B):Vt(i,m,await Xt(i,R),B);f(C=>[...C,g]),I(""),w([]),le(!1),await _o(g)||(f(C=>C.filter(X=>X.id!==g.id)),I(m),le(!0))}finally{D.current=!1,v(!1)}}},Zn=async(m,g)=>{if(A(m))return!1;let P=u.find(X=>X.id===m);if(!P)return!1;let C={...P,...g,updatedAt:new Date().toISOString()};L(m,!0),f(X=>X.map(G=>G.id===m?C:G));try{let X=await qe(m,C,P.updatedAt);return X||f(G=>G.map(Xn=>Xn.id===m?P:Xn)),X}finally{L(m,!1)}},ei=async m=>{if(A(m))return;let g=u.find(P=>P.id===m);if(g){L(m,!0),f(P=>P.filter(C=>C.id!==m));try{await Kt(m)||f(C=>C.some(X=>X.id===m)?C:[...C,g])}finally{L(m,!1)}}},ti=async m=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await ei(m)},ni=m=>x(m);r.useEffect(()=>{let m=rt.get();if(!m)return;let g=P=>{rt.consume(m),I(""),w([]),H(P),le(!0)};if(m.kind==="web"){o&&ie(m.url??"")===s&&g({type:"web-selection",snippet:m.snippet});return}m.kind==="file"&&m.path===i&&!o&&g({type:"pdf-page",page:m.page??1,snippet:m.snippet})},[i,s,o,Xr,rt]);let oi=(c?["position","created","updated"]:["updated","created"]).map(m=>({value:m,label:jr[m]})),ri=m=>{y.ui.openPopover(()=>r.createElement(on,{field:ne,direction:oe,options:oi,onFieldChange:g=>{de(g)},onDirectionChange:me,directionForField:g=>Zs[g]}),{anchor:m,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})};return r.createElement("div",{className:"sidenotes-panel",ref:e},r.createElement("header",{className:"panel-header sidenotes-header"},r.createElement("div",{className:"panel-header-label sidenotes-title"},o?r.createElement(Yt,null):r.createElement(hr,null),r.createElement("span",{className:"panel-title",title:o?s:void 0},o?Mt(s):p("auto.7d660ae8b46e"))),r.createElement("div",{className:"sidenotes-header-actions"},c&&r.createElement("button",{className:`sidenote-icon-btn${Ce?" active":""}`,"aria-label":p("auto.580535153931"),title:Ce?p("auto.df4a8bd943cc"):p("auto.7b9b8574c69b"),onClick:()=>Hr(m=>!m)},r.createElement(xr,null)),ge.size>0&&r.createElement("button",{className:`sidenote-icon-btn${$?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>M(m=>!m)},r.createElement(Ye,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${oe==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${jr[ne]}`,"aria-haspopup":"dialog",onClick:m=>ri(m.currentTarget)},oe==="asc"?r.createElement(Qe,null):r.createElement(et,null)),r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.7a7e81b96c3a"),title:p("auto.d48a73614c7f"),onClick:()=>{let m=!ve;le(m),m?H(o?{type:"none"}:cr(i,un())):I("")},disabled:!l},r.createElement(br,null)))),l?r.createElement(r.Fragment,null,r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Qt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:_,onChange:m=>W(m.target.value),placeholder:p("auto.49cd864445a9"),"aria-label":p("auto.f1b5671b118f")}),_&&r.createElement("button",{className:"search-field-action",onClick:()=>W(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(en,null)))),ve&&r.createElement("div",{className:"sidenote-create"},r.createElement(zn,{value:Z,onChange:I,onSave:()=>{qn()},onCancel:()=>{le(!1),I(""),w([])},autoFocus:!0}),r.createElement(y.ui.TagInput,{value:B,onChange:w}),r.createElement(Fn,{path:i,web:o,anchor:R,onChange:H,invalid:!o&&ot!=="ok",validationMsg:!o&&ot!=="ok"?yt(R,ot):void 0}),r.createElement("div",{className:"sidenote-create-actions"},r.createElement("button",{className:"sidenote-save-btn",onClick:()=>{qn()},disabled:!Z.trim()||b},p("auto.757092db3c4b")),At.length>0&&r.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{le(!1),I(""),w([])}},p("auto.77dfd2135f4d")))),r.createElement("div",{className:"sidenote-list",ref:Hn.ref},(S||be.projection||be.draft)&&r.createElement("div",{role:"alert"},S||be.projection||be.draft," ",r.createElement("button",{type:"button",onClick:()=>{T(),O(m=>m+1)}},p("sideNotes.action.retry"))),h?r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.33ce417454bf"))):It.length?Hn.render(m=>{let g=It[m],P=ge.get(g.id),C=P!==void 0,X=z.has(g.id);return r.createElement("article",{key:g.id,"data-visible-key":g.id,"data-visible-index":m,className:`sidenote-card${g.flagged?" flagged":""}${C?" invalid":""}`,onClick:G=>{tt(g,"right_sidebar"),dn(g,s,y.ui.hasModKey(G))},onAuxClick:G=>{Lr(G)&&dn(g,s,!0)}},r.createElement("div",{className:"sidenote-card-meta",onClick:G=>G.stopPropagation(),onAuxClick:G=>G.stopPropagation()},g.anchor.type!=="none"&&r.createElement("button",{className:"sidenote-anchor-badge",onClick:G=>dn(g,s,y.ui.hasModKey(G)),onAuxClick:G=>{Lr(G)&&dn(g,s,!0)},title:g.url?p("auto.9ee309dcedc9"):`${g.path} \xB7 ${Je(g.anchor)}`},!g.url&&g.anchor.type==="markdown-heading"?g.path.split("/").pop():Je(g.anchor)),r.createElement("div",{className:"sidenote-card-btns"},C&&P&&r.createElement(Ye,{className:"sidenote-warning-icon",title:yt(g.anchor,P)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${g.flagged?" active":""}`,"aria-label":g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),disabled:X,onClick:()=>{Zn(g.id,{flagged:!g.flagged})}},r.createElement(wt,null)),r.createElement(sn,{noteId:g.id,openId:Le,setOpenId:je,onEdit:()=>ni(g),onDelete:()=>{ti(g.id)},disabled:X}))),r.createElement(r.Fragment,null,r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown",value:g.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:g.id},sourcePath:g.path||void 0},onChange:G=>{Zn(g.id,{note:G})}}),g.tags&&g.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:G=>G.stopPropagation()},g.tags.map(G=>r.createElement("span",{key:G,className:"sidenote-tag-view-pill"},"#",G)))))}):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,_?p("auto.b690846c83ff"):Ce&&c?p("auto.8f4043581269"):o?p("auto.8c8077ac2313"):p("auto.31b291dd535e"))))):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.34f6835f5ddf"))),Se&&r.createElement(rn,{key:Se.id,note:Se,onSaved:m=>{f(g=>g.map(P=>P.id===m.id?m:P)),tt(m,"right_sidebar")},onClose:()=>x(null)}))};var Xs=[".md",".mp3",".mp4",".pdf"];function zr(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function $r(e){return/^\.[^./\\\s]+$/.test(e)}function xt(e){let n=(Array.isArray(e)?e:Xs).flatMap(o=>{if(typeof o!="string")return[];let s=zr(o);return $r(s)?[lt(`file${s}`)]:[]});return[...new Set(n)]}var Vr=()=>{let[e,t]=r.useState(()=>y.settings.get());r.useEffect(()=>y.settings.subscribe(()=>t(y.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,o=xt(e.filterTypes),{ChipsField:s,NumberField:i,Row:a,Section:c}=y.ui.settings,l=(d,u)=>{t(f=>({...f,[d]:u})),y.settings.set(d,u)};return r.createElement(c,null,r.createElement(a,{title:p("plugin.sideNotes.field.awareRange"),description:p("auto.204e47f6d7a2")},r.createElement(i,{value:n,step:1,ariaLabel:p("plugin.sideNotes.field.awareRange"),onChange:d=>{d!=null&&t(u=>({...u,mediaRangeSeconds:d}))},onCommit:d=>{d!=null&&l("mediaRangeSeconds",d)}})),r.createElement(a,{className:"sidenotes-filter-types-row",title:p("plugin.sideNotes.field.filterTypes"),description:p("plugin.sideNotes.field.filterTypesDesc")},r.createElement(s,{className:"sidenotes-filter-types-editor",items:o,onChange:d=>l("filterTypes",xt(d)),normalize:zr,validate:d=>$r(d),placeholder:".png",ariaLabel:p("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var Ur={updated:"Updated",created:"Created",name:"Name"},We="all",Vn="web",Un="no-extension";function nt(e){return e.url?Mt(e.url):e.path.split("/").pop()??e.path}function Br(e){return e.url?Vn:lt(e.path)||Un}function Wr(e,t=!1){if(e.url){t?y.links.open(e.url,{newTab:!0}):y.links.open(e.url);return}let n=e.anchor.type==="web-selection"?void 0:e.anchor;t?y.workspace.openFile(e.path,n,{newTab:!0}):y.workspace.openFile(e.path,n)}function Js(e,t,n){if(n==="name"){let i=nt(e).localeCompare(nt(t),void 0,{sensitivity:"base"});return i!==0?i:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let o=n==="created"?"createdAt":"updatedAt",s=e[o].localeCompare(t[o]);return s!==0?s:nt(e).localeCompare(nt(t),void 0,{sensitivity:"base"})}var Kr=()=>{let{notes:e,setNotes:t,loading:n,error:o,reload:s}=Ze(),[i,a]=fe("left_sidebar","search",""),[c,l]=fe("left_sidebar","showAll",!1),[d,u]=fe("left_sidebar","sortField","updated"),[f,h]=fe("left_sidebar","sortDir","desc"),[S,T]=r.useState(new Map),[A,L]=r.useState(null),[z,Z]=fe("left_sidebar","filterWarning",!1),[I,B]=fe("left_sidebar","sourceType",We),[w,R]=fe("left_sidebar","compact",!1),[H,ve]=r.useState(null),[le,Le]=r.useState(null),[je,Se]=r.useState(0),[x,_]=r.useState(()=>{let b=y.settings.get();return xt(b.filterTypes)});r.useEffect(()=>y.files.onAnchorInfoChanged(()=>Se(b=>b+1)),[]),r.useEffect(()=>y.settings.subscribe(()=>{let b=y.settings.get();_(xt(b.filterTypes))}),[]);let W=r.useMemo(()=>{let b=new Set(e.map(Br)),v=[...b].filter(D=>D.startsWith(".")&&!x.includes(D)).sort();return[{value:We,label:p("auto.6a72085653e4")},...x.map(D=>({value:D,label:D})),...v.map(D=>({value:D,label:D})),...b.has(Un)?[{value:Un,label:p("sideNotes.filter.noExtension")}]:[],...b.has(Vn)?[{value:Vn,label:p("sideNotes.filter.web")}]:[]]},[e,x]);r.useEffect(()=>{n||o||W.some(b=>b.value===I)||B(We)},[I,W,B,n,o]);let $=r.useMemo(()=>{let b=c?e:e.filter(K=>K.flagged),v=I===We?b:b.filter(K=>Br(K)===I);return[...i.trim()?v.filter(K=>an(i,K.tags??[],K.note,K.url??K.path)):v].sort((K,O)=>{let re=Js(K,O,d);return f==="asc"?re:-re})},[e,i,c,I,d,f]),M=r.useRef([]),[Y,de]=r.useState(0);r.useEffect(()=>{M.current=$.map(b=>b.id),de(b=>b+1)},[c,d,f,i,I]);let Ne=r.useRef(!1);r.useEffect(()=>{n||Ne.current||(Ne.current=!0,M.current=$.map(b=>b.id),de(b=>b+1))},[n]);let me=r.useMemo(()=>{let b=z?$.filter(O=>S.has(O.id)):$,v=new Map(b.map(O=>[O.id,O])),D=[];for(let O of M.current){let re=v.get(O);re&&D.push(re)}let K=new Set(M.current);for(let O of b)K.has(O.id)||D.push(O);return M.current=D.map(O=>O.id),D},[$,Y,z,S]),ne=r.useMemo(()=>me.map(b=>b.id),[me]),oe=qt(r,{ids:ne,estimate:w?64:140,pinned:[le?.id,H],layoutKey:w});r.useEffect(()=>{let b=new we;return Jt($,b).then(({statuses:v})=>{b.isActive()&&(T(v),L(null))}).catch(v=>{v instanceof xe||!b.isActive()||L(p("sideNotes.error.load"))}).finally(()=>b.dispose()),()=>b.dispose()},[$,je]);let ge=async(b,v)=>{let D=e.find(re=>re.id===b);if(!D)return;let K={...D,...v,updatedAt:new Date().toISOString()};t(re=>re.map(ze=>ze.id===b?K:ze)),await qe(b,K,D.updatedAt)||t(re=>re.map(ze=>ze.id===b?D:ze))},Ee=async b=>{let v=e;t(K=>K.filter(O=>O.id!==b)),await Kt(b)||t(v)},be=async b=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Ee(b)},Fe=b=>Le(b),ot=b=>{y.ui.openPopover(()=>r.createElement(on,{field:d,direction:f,options:Object.entries(Ur).map(([v,D])=>({value:v,label:D})),onFieldChange:v=>u(v),onDirectionChange:h}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})},cn=b=>{y.ui.openPopover(()=>r.createElement(Cr,{value:I,options:W,onChange:B}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.0aafb761a83c")})};return r.createElement("div",{className:"panel"},r.createElement("div",{className:"panel-header"},r.createElement("span",{className:"panel-title"},p("auto.7d660ae8b46e")),r.createElement("div",{className:"sidenotes-header-actions"},r.createElement("button",{className:`sidenote-icon-btn${c?"":" active"}`,"aria-label":c?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),title:c?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),"aria-pressed":!c,onClick:()=>l(b=>!b)},r.createElement(wt,null)),S.size>0&&r.createElement("button",{className:`sidenote-icon-btn${z?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>Z(b=>!b)},r.createElement(Ye,null)),r.createElement("button",{className:`sidenote-icon-btn${w?" active":""}`,"aria-label":p("auto.77f9b062ce1b"),title:w?p("auto.d2f76731e1e1"):p("auto.e3719eae891e"),onClick:()=>R(b=>!b)},r.createElement(Nr,null)),r.createElement("button",{className:`sidenote-icon-btn${I!==We?" active":""}`,"aria-label":p("auto.0aafb761a83c"),title:`${p("auto.0aafb761a83c")} \xB7 ${W.find(b=>b.value===I)?.label??p("auto.6a72085653e4")}`,"aria-haspopup":"dialog","aria-pressed":I!==We,onClick:b=>cn(b.currentTarget)},r.createElement(yr,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${f==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${Ur[d]}`,"aria-haspopup":"dialog",onClick:b=>ot(b.currentTarget)},f==="asc"?r.createElement(Qe,null):r.createElement(et,null)))),r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Qt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:i,onChange:b=>a(b.target.value),placeholder:c?p("auto.49cd864445a9"):p("auto.7c0451dde956"),"aria-label":p("auto.ff4f3043a289")}),i&&r.createElement("button",{className:"search-field-action",onClick:()=>a(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(en,null)))),r.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},(o||A)&&r.createElement("div",{role:"alert"},o||A," ",r.createElement("button",{type:"button",onClick:()=>{s(),Se(b=>b+1)}},p("sideNotes.action.retry"))),n?r.createElement("div",{className:"tree-empty"},p("auto.33ce417454bf")):me.length===0?r.createElement("div",{className:"tree-empty"},i||I!==We?p("auto.b690846c83ff"):c?p("auto.d2a1e72bc320"):p("auto.f5ca64c680ee")):r.createElement("div",{className:"flagged-notes-list",ref:oe.ref},oe.render(b=>{let v=me[b],D=S.get(v.id),K=D!==void 0;return r.createElement("div",{key:v.id,"data-visible-key":v.id,"data-visible-index":b,className:`flagged-note-card${v.flagged?" flagged":""}${K?" invalid":""}${w?" compact":""}`,onClick:O=>{tt(v,"left_sidebar"),Wr(v,y.ui.hasModKey(O))},onAuxClick:O=>{O.button===1&&(O.preventDefault(),Wr(v,!0))},title:v.url??v.path},r.createElement("div",{className:"flagged-note-header"},r.createElement("div",{className:"flagged-note-meta-row"},r.createElement("div",{className:"flagged-note-meta-left"},v.url?v.anchor.type!=="none"&&r.createElement("span",{className:"flagged-note-anchor"},Je(v.anchor)):r.createElement("span",{className:"flagged-note-anchor",title:`${v.path}${v.anchor.type!=="none"?` \xB7 ${Je(v.anchor)}`:""}`},nt(v))),r.createElement("div",{className:"flagged-note-meta-right"},K&&D&&r.createElement(Ye,{className:"sidenote-warning-icon",title:yt(v.anchor,D)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${v.flagged?" active":""}`,"aria-label":v.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:v.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),onClick:O=>{O.stopPropagation(),ge(v.id,{flagged:!v.flagged})},onAuxClick:O=>O.stopPropagation()},r.createElement(wt,null)),r.createElement(sn,{noteId:v.id,openId:H,setOpenId:ve,onEdit:()=>Fe(v),onDelete:()=>{be(v.id)}}))),v.url&&r.createElement("span",{className:"flagged-note-file"},r.createElement(Yt,{className:"flagged-note-web-icon"}),nt(v))),w&&(()=>{let O=v.note.split(`
`).find(re=>re.trim())?.replace(/^#+\s*/,"").trim();return O?r.createElement("p",{className:"flagged-note-preview"},O):null})(),r.createElement(r.Fragment,null,!w&&r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:v.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:v.id},sourcePath:v.path||void 0},onChange:O=>{ge(v.id,{note:O})}}),!w&&v.tags&&v.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:O=>O.stopPropagation(),onAuxClick:O=>O.stopPropagation()},v.tags.map(O=>r.createElement("span",{key:O,className:"sidenote-tag-view-pill"},"#",O)))))}))),le&&r.createElement(rn,{key:le.id,note:le,onSaved:b=>{t(v=>v.map(D=>D.id===b.id?b:D)),tt(b,"left_sidebar")},onClose:()=>Le(null)}))};var Bn="notes-sidenotes-styles",Ys=`
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

.sidenote-card[data-visible-index]:not([data-visible-index="0"])::before,
.flagged-note-card[data-visible-index]:not([data-visible-index="0"])::before {
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

.sidenote-filter-options {
  max-height: 360px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.sidenote-filter-options .sidenote-popover-option {
  flex-shrink: 0;
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

`;function Gr(){let e=document.getElementById(Bn);return e||(e=document.createElement("style"),e.id=Bn,document.head.appendChild(e)),e.textContent=Ys,()=>{document.getElementById(Bn)===e&&e.remove()}}function Qs(e){Ko(e),vo(e);let t=Te(),n=!1,o=te(e,()=>{if(n)throw new Error("SideNotes registration is no longer active")}),s=Gr(),i=Or(e),a=Mr(e),c=e.files.onRenamed(({oldPath:w,newPath:R})=>{o.isActive()&&Co(w,R,o).catch(H=>console.error("SideNotes could not retarget notes",H))}),l=e.files.onLineShift(({path:w,fromLine:R,delta:H})=>{o.isActive()&&Ro(w,R,H,o).catch(ve=>console.error("SideNotes could not shift anchors",ve))}),d=Dt(),u=async w=>{if(!(!w||!o.isActive())){if(w={...w},w.surface==="web"){if(!w.url||!w.text.trim())return;d.publish({kind:"web",url:w.url,snippet:w.text.trim().slice(0,200)})}else{if(!w.path||!w.page)return;let R=await e.workspace.getPdfPageText(w.path,w.page).catch(()=>null);if(!o.isActive())return;let H=er({path:w.path,page:w.page,text:w.text},R);if(!H)return;d.publish(H)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(wn,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:u}),h=()=>{let w=e.getState().activePath;return w&&De(w)==="pdf"?tr(w,e.workspace.getTextSelection()):null},S={group:"create",order:10,label:"New SideNote from Selection",labelKey:"menu.newFromSelection"},T={id:"highlight-selection",menu:S,label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"execute",outputSchema:{type:"null"},input:{schema:{type:"object",properties:{},additionalProperties:!1},parse:()=>{}},run:async()=>{if(!o.isActive())return null;let w=h();return w&&await u({surface:"pdf",...w}),null}},A=()=>{},L=null,z=()=>{let w=h()!==null;w!==L&&(L=w,A(),A=e.commands.register({...T,menu:{...S,enabled:w}}))};z();let Z=e.workspace.onTextSelectionChanged(z);e.registerView("sideNotes.panel",Fr),e.registerView("sideNotes.flagged",Kr),e.registerView("sideNotes.settings",Vr);let I=Xo(),B=Yo(e);return()=>{n=!0,t.dispose(),c(),i(),a(),l(),f(),Z(),A(),I(),B(),s()}}var ea={register:Qs},Ru=ea;export{Ru as default,Qs as register};
