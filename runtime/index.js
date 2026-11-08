var oi=Object.defineProperty;var ri=(e,t,n)=>t in e?oi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var V=(e,t,n)=>ri(e,typeof t!="symbol"?t+"":t,n);var Et="valley";var ea=`.${Et}`,ta=`app.${Et}`;function ii(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var si=/^[a-zA-Z]:/;function Jn(e){if(typeof e!="string")return"";let t=ii(e);return!t||t==="."||si.test(t)||t.split("/").some(n=>n==="..")?"":t}var X=`.${Et}`,ai="plugins",rt=`${X}/${ai}`,It=`${rt}/packages`,ra=`${It}/core`,ia=`${It}/github`,sa=`${It}/local`,aa=`${It}/community`,da=`${rt}/community.json`,ca=`${rt}/data`;var la=`${rt}/enabled.json`,ua=`${rt}/sources.json`,fa=`${X}/state`,J=`${X}/settings`,Xn=`${X}/data`,un=`${X}/recovery`;var fn=`${X}/accounts`,Be=`${X}/ai`,pa=`${Be}/connections.json`,ma=`${Be}/defaults.json`,ga=`${Be}/budgets.json`,ha=`${Be}/usage.sqlite`,ba=`${Be}/security/guards.json`,ya=`${Be}/security/activity.sqlite`,wa=`${fn}/providers`,va=`${fn}/providers.lock.json`,di=`${X}/trash`,Sa=`${di}/items`,pn=`${X}/cache`,Na=`${pn}/accounts`,ci=`${pn}/search`,xa=`${pn}/providers`;var Aa=`${ci}/index.jsonl`,ka=`${un}/drafts`,Ea=`${un}/transactions`,Ia=`${un}/retired`;var De="design",li="themes",Yn=`${X}/${De}/${li}`,Ta=`${Yn}/local`,_a=`${Yn}/community`,Oa={app:`${J}/app.json`,appearance:`${X}/${De}/appearance.json`,"icon-rail":`${X}/${De}/icon-rail.json`,"footer-rail":`${X}/${De}/footer-rail.json`,"plugin-startup":`${X}/${De}/right-sidebar-startup.json`,"new-tab":`${X}/${De}/new-tab.json`,pallette:`${X}/${De}/palette.json`,group:`${Xn}/groups.json`,units:`${Xn}/units.json`,metadata:`${J}/file-viewers.json`,notification:`${J}/notification.json`,"notification-settings":`${J}/notification-settings.json`,preferences:`${J}/preferences.json`,"link-actions":`${J}/link-actions.json`,markdown:`${J}/markdown.json`,editor:`${J}/editor.json`,"editor-vim":`${J}/editor-vim.json`,"markdown-todo":`${J}/markdown-todo.json`,"markdown-codeblocks":`${J}/markdown-codeblocks.json`,"markdown-template":`${J}/markdown-template.json`,"markdown-embeed":`${J}/markdown-embeed.json`,files:`${J}/file.json`,"file-sorter":`${J}/file-sorter.json`,"file-sym-link":`${J}/file-sym-link.json`,search:`${J}/search.json`,"search-tag":`${J}/search-tag.json`,"search-content":`${J}/search-content.json`,design:`${X}/${De}/appearance.json`,accounts:`${fn}/connections.json`};var ui=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Qn=16384;var eo=new Set(["__proto__","prototype","constructor"]);function to(e){let t=0;for(let n of e){let o=n.codePointAt(0);t+=o<=127?1:o<=2047?2:o<=65535?3:4}return t}function Tt(e){let t=new WeakSet,n=0,o=(s,a)=>{if(++n>8192||a>32)throw new Error("Bookmark state is too complex");if(s===null||typeof s=="boolean")return s;if(typeof s=="string"){if(to(s)>Qn)throw new Error("Bookmark state is too large");return s}if(typeof s=="number")return Number.isFinite(s)?Object.is(s,-0)?0:s:void 0;if(!s||typeof s!="object"||t.has(s))return;let l=Array.isArray(s),c=Object.getPrototypeOf(s);if(!(!l&&c!==null&&(Object.getPrototypeOf(c)!==null||typeof Object.getOwnPropertyDescriptor(c,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(c,"constructor").value)!=="function Object() { [native code] }"))){t.add(s);try{let d=Reflect.ownKeys(s);if(d.length+n>8192||d.some(h=>typeof h=="string"&&eo.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(s);if(l){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(S,I)=>{let x=u[String(I)];return x&&"value"in x?o(x.value,a+1)??null:null})}let f={};for(let h of Object.keys(u).sort()){if(eo.has(h))throw new Error("Invalid bookmark state key");let S=u[h];if(!S.enumerable||!("value"in S)){n++;continue}let I=o(S.value,a+1);I!==void 0&&(f[h]=I)}return f}finally{t.delete(s)}}},i=o(e,0);if(!i||typeof i!="object"||Array.isArray(i))throw new Error("Invalid bookmark state");if(to(JSON.stringify(i))>Qn)throw new Error("Bookmark state is too large");return i}function ro(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Jn(e);if(!t)throw new Error("Invalid bookmark path");return t}function mn(e,t,n){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${n}`);return e.trim().normalize("NFC")}function no(e){let n=(e.target?["path","filePath","file"].flatMap(i=>typeof e.target.state[i]=="string"?[e.target.state[i]]:[]):[e.folderPath]).join(" "),o=/\.[^./]+$/.exec(n)?.[0]??"";return[e.title,e.description,n,o,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function gn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!ui.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let n=Tt(t.state);return n.path!==void 0&&(n.path=ro(n.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:n,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var fi=/^[A-Za-z0-9_-]{1,64}$/;function oo(e,t){if(typeof e!="string"||!fi.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function io(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,n=mn(t.title,512,"title"),o={...t.description===void 0?{}:{description:mn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:mn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},i=t.group===void 0?{}:{group:oo(t.group,"group")};if(t.groupId!==void 0){let l=oo(t.groupId,"group id");if(!n||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:n,groupId:l,...o}}if(t.target!==void 0){let l={folderPath:"",title:n,target:gn(t.target),...o,...i};return{...l,searchText:no(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let a={folderPath:ro(t.folderPath),title:n,...o,...i};return{...a,searchText:no(a)}}function je(e){let t=0,n=s=>!!(s&&typeof s=="object"&&!Array.isArray(s)),o=s=>s.length>0&&s.length<=256&&!["__proto__","prototype","constructor"].includes(s),i=(s,a)=>{if(++t>2048||a>32||!n(s)||typeof s.type!="string")return!1;let l=(...c)=>Object.keys(s).every(d=>d==="type"||c.includes(d));return["unknown","null","boolean","number","string","function"].includes(s.type)?l():s.type==="literal"?l("value")&&(s.value===null||["string","boolean"].includes(typeof s.value)||typeof s.value=="number"&&Number.isFinite(s.value)):s.type==="array"?l("items","maxItems")&&(s.maxItems===void 0||Number.isSafeInteger(s.maxItems)&&s.maxItems>=0&&s.maxItems<=1e5)&&i(s.items,a+1):s.type==="tuple"?l("items","minItems")&&Array.isArray(s.items)&&s.items.length<=64&&(s.minItems===void 0||Number.isSafeInteger(s.minItems)&&s.minItems>=0&&s.minItems<=s.items.length)&&s.items.every(c=>i(c,a+1)):s.type==="union"?l("anyOf")&&Array.isArray(s.anyOf)&&s.anyOf.length>0&&s.anyOf.length<=32&&s.anyOf.every(c=>i(c,a+1)):s.type==="object"?l("properties","required","additionalProperties")&&n(s.properties)&&Object.entries(s.properties).every(([c,d])=>o(c)&&i(d,a+1))&&(s.required===void 0||Array.isArray(s.required)&&s.required.every(c=>typeof c=="string"&&Object.hasOwn(s.properties,c)))&&(s.additionalProperties===void 0||typeof s.additionalProperties=="boolean"):!1};return i(e,0)}function _t(e,t,n=1e5){let o=Math.max(1,Math.min(1e6,Math.floor(n))),i=new WeakSet,s=(a,l,c)=>{if(--o<0||c>64)return!1;if(a.type==="unknown")return!0;if(a.type==="null")return l===null;if(a.type==="literal")return l===a.value;if(a.type==="union")return a.anyOf.some(d=>s(d,l,c+1));if(a.type==="number")return typeof l=="number"&&Number.isFinite(l);if(a.type==="string"||a.type==="boolean"||a.type==="function")return typeof l===a.type;if(!l||typeof l!="object"||i.has(l))return!1;i.add(l);try{return a.type==="array"?Array.isArray(l)&&l.length<=(a.maxItems??1e5)&&l.every(d=>s(a.items,d,c+1)):a.type==="tuple"?Array.isArray(l)&&l.length>=(a.minItems??a.items.length)&&l.length<=a.items.length&&l.every((d,u)=>s(a.items[u],d,c+1)):a.type==="object"?Array.isArray(l)||a.required?.some(d=>!Object.hasOwn(l,d))?!1:Object.entries(l).every(([d,u])=>Object.hasOwn(a.properties,d)?s(a.properties[d],u,c+1):a.additionalProperties===!0):!1}finally{i.delete(l)}};return s(e,t,0)}var pi=new Map;function z(e,t,n,o,i,s,a,l,c="owner"){let d=Object.freeze({id:e,kind:t,version:n,cardinality:o,validate:i,identities:s,identityScope:c,serviceCalls:a,serviceMetadata:l});return pi.set(`${t}:${e}@${n}`,d),d}var bn=256;var A=e=>!!e&&typeof e=="object"&&!Array.isArray(e),B=(e,t)=>typeof e[t]=="function",Fe=e=>e===void 0,We=e=>typeof e=="boolean",E=e=>typeof e=="string",de=e=>e===void 0||E(e),mi=e=>e===void 0||typeof e=="number",gi=e=>e===void 0||typeof e=="boolean",F=(e,t)=>e.length===t.length&&t.every((n,o)=>n(e[o])),ee=e=>A(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),so=e=>A(e),co=e=>A(e)&&E(e.id)&&E(e.title)&&E(e.date)&&(e.documentRef===void 0||A(e.documentRef)&&E(e.documentRef.pluginId)&&E(e.documentRef.sourceId)&&E(e.documentRef.itemId)),hi=e=>A(e)&&E(e.date)&&de(e.startTime)&&de(e.endTime)&&de(e.sourceId)&&de(e.itemId),bi=e=>A(e)&&E(e.url)&&de(e.title)&&gi(e.newTab),yi=e=>A(e)&&E(e.query),lo=e=>A(e)&&E(e.name)&&de(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),wi=e=>Array.isArray(e)&&e.every(lo),vi=e=>e===null||lo(e),Si=e=>e===void 0||A(e)&&de(e.approvalToken)&&(e.cancellation===void 0||A(e.cancellation)),Ni=e=>typeof e=="string"||A(e)&&typeof e.text=="string",xi=e=>A(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&A(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&de(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),uo=e=>A(e)&&E(e.id)&&E(e.label)&&de(e.labelKey)&&de(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(uo)),fo={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(co)},create:{args:e=>F(e,[E,so]),result:We},update:{args:e=>F(e,[E,so]),result:We},remove:{args:e=>F(e,[E]),result:We},open:{args:e=>F(e,[E]),result:Fe},configure:{args:e=>e.length===0,result:Fe},actions:{args:e=>F(e,[E]),result:e=>Array.isArray(e)&&e.every(uo)},runAction:{args:e=>F(e,[E,E]),result:We}},po=e=>A(e)&&E(e.name)&&E(e.version)&&de(e.description)&&de(e.author)&&(e.localized===void 0||A(e.localized)&&Object.values(e.localized).every(t=>A(t)&&E(t.name)&&de(t.description))),Ai=z("calendar.itemSource","service","1.3.0","many",e=>A(e)&&B(e,"list")&&(e.integration===void 0||po(e.integration)),void 0,fo,e=>e.integration),Ot=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,hn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,ki=e=>A(e)&&Ot(e.startDate)&&Ot(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=bn&&(e.cursor===void 0||hn(e.cursor)),Ei=e=>A(e)&&hn(e.revision)&&(e.cursor===void 0||hn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=bn&&e.items.every(t=>co(t)&&Ot(t.date)&&(t.endDate===void 0||Ot(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,Ii=z("calendar.itemSource","service","2.0.0","many",e=>A(e)&&B(e,"list")&&(e.integration===void 0||po(e.integration)),void 0,{...fo,list:{args:e=>F(e,[ki]),result:Ei}},e=>e.integration),Ti=z("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),_i=z("calendar.navigator","service","1.0.0","one",e=>A(e)&&B(e,"openDate"),void 0,{openDate:{args:e=>F(e,[hi]),result:Fe}}),Oi=z("calendar.panelSelection","state","1.0.0","one",e=>A(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),it=z("web.activeContext","state","1.0.0","one",e=>A(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function ao(e){return A(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>A(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Pi=z("contacts.directory","service","1.0.0","one",e=>A(e)&&["search","resolveEmails","open"].every(t=>B(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(ao)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>A(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(ao))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||A(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Fe}}),Ci=z("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Ri=z("web.navigator","service","1.0.0","one",e=>A(e)&&B(e,"open"),void 0,{open:{args:e=>F(e,[bi]),result:Fe}}),yn=z("selection.textAction","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&B(e,"run"),e=>[e.id]),Di=z("geo.navigator","service","1.0.0","one",e=>A(e)&&B(e,"open"),void 0,{open:{args:e=>F(e,[yi]),result:Fe}}),Mi=z("geo.search","service","1.0.0","one",e=>A(e)&&B(e,"search")&&B(e,"reverse"),void 0,{search:{args:e=>F(e,[E]),result:wi},reverse:{args:e=>F(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:vi}}),Li=z("agent.toolProvider","service","1.0.0","many",e=>A(e)&&Array.isArray(e.tools)&&e.tools.every(xi)&&B(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>F(e,[E,A,Si]),result:Ni}},e=>({tools:e.tools}),"global"),ji=z("guard.runtime","service","1.0.0","one",e=>A(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>B(e,t)),void 0,{resolve:{args:e=>F(e,[A]),result:A},requestApproval:{args:e=>F(e,[A]),result:We},consumeToken:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&de(e[1]),result:We},audit:{args:e=>F(e,[A]),result:Fe}}),Fi=z("browser.automation","service","1.0.0","one",e=>A(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>B(e,t)),void 0,{list:{args:e=>e.length===0,result:ee},open:{args:e=>F(e,[E]),result:ee},switch:{args:e=>F(e,[E]),result:ee},close:{args:e=>F(e,[E]),result:ee},snapshot:{args:e=>F(e,[E]),result:ee},readText:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&mi(e[1]),result:ee},readHtml:{args:e=>F(e,[E]),result:ee},screenshot:{args:e=>F(e,[E]),result:ee},click:{args:e=>F(e,[E,t=>typeof t=="number"]),result:ee},type:{args:e=>e.length>=3&&e.length<=4&&E(e[0])&&typeof e[1]=="number"&&E(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:ee},select:{args:e=>F(e,[E,t=>typeof t=="number",E]),result:ee},scroll:{args:e=>F(e,[E,t=>typeof t=="number",t=>typeof t=="number"]),result:ee},pressKey:{args:e=>F(e,[E,E]),result:ee},navigate:{args:e=>F(e,[E,E]),result:ee},back:{args:e=>F(e,[E]),result:ee},forward:{args:e=>F(e,[E]),result:ee},reload:{args:e=>F(e,[E]),result:ee}}),zi=z("fileTree.contextItem","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.label=="string"&&de(e.labelKey)&&B(e,"run"),e=>[e.id]),$i=z("newTab.entry","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"run"),e=>[e.id]),wn=z("search.resultAction","extension","1.0.0","many",e=>A(e)&&typeof e.cardKind=="string"&&B(e,"open"),e=>[e.cardKind]),Vi=z("search.resultCard","extension","1.0.0","many",e=>A(e)&&typeof e.cardKind=="string"&&B(e,"render")&&B(e,"open"),e=>[e.cardKind]),Ui=z("metadataPanel.segment","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"render"),e=>[e.id]),vn=z("workspace.surface","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&B(e,"getSnapshot")&&B(e,"subscribe")&&B(e,"restore"),e=>[e.id]),Bi=z("metadata.plugin","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"facts"),e=>[e.id]),Wi=z("workspace.viewState","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&B(e,"capture")&&B(e,"restore")&&B(e,"subscribe"),e=>[e.id]);var Pt=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let n=Object.create(null),o=Reflect.ownKeys(e);if(o.length>32)throw new Error("Invalid bookmark descriptor");for(let i of o){if(typeof i!="string")continue;if(["__proto__","prototype","constructor"].includes(i))throw new Error("Invalid bookmark key");let s=Object.getOwnPropertyDescriptor(e,i);s?.enumerable&&"value"in s&&(n[i]=s.value)}return n},Sn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),mo=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),go=e=>Sn(e)&&typeof e.surface=="string"&&mo.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function st(e){let t=Pt(e);if(!go(t))throw new Error("Invalid bookmark descriptor");let n=gn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),o=io({folderPath:"",title:t.title,description:t.description,target:n});if(!o.title||typeof o.description!="string")throw new Error("Bookmark presentation is required");return{surface:n.surface,title:o.title,description:o.description,state:n.state,...n.instanceId===void 0?{}:{instanceId:n.instanceId},...n.itemId===void 0?{}:{itemId:n.itemId}}}function Nn(e){try{let t=st(e),n=Pt(e);return JSON.stringify(t.state)===JSON.stringify(Tt(n.state))}catch{return!1}}function Ki(e){try{let t=Pt(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:st(t.bookmark)}}catch{}return{status:"invalid"}}var Gi=e=>{try{let t=Pt(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&Nn(t.bookmark)}catch{return!1}},Hi=e=>Sn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),ho=z("workspace.bookmark","service","1.0.0","many",e=>Sn(e)&&typeof e.id=="string"&&mo.has(String(e.surface))&&je(e.stateSchema)&&(e.itemStateSchema===void 0||je(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&go(e[0]),result:Gi,sanitizeResult:Ki},restore:{args:e=>e.length===1&&Nn(e[0]),result:Hi}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function xn(e,t,n){if(!je(n.stateSchema)||n.itemStateSchema!==void 0&&!je(n.itemStateSchema))throw new Error("Invalid bookmark state schema");let o=!0,i=(d,u,f=!1)=>_t(f&&n.itemStateSchema?n.itemStateSchema:n.stateSchema,d,8192)&&(!n.validate||n.validate(d,u)),s=(d,u,f)=>{let h=f?void 0:n.primary?n.primary(d):d.item,S=Tt(h?.state??d.view);if(!i(S,u,!!h))throw new Error("Invalid bookmark state");return st({...u,title:h?.title??d.title,description:n.description(d,!!h),state:S,...h?{itemId:h.id}:{}})},a={id:t.id,surface:t.surface,stateSchema:n.stateSchema,...n.itemStateSchema?{itemStateSchema:n.itemStateSchema}:{},capture(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:s(t.getSnapshot(d.instanceId),d,!1)}}catch{return{status:"invalid"}}},async restore(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=st(d),!i(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:o?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(ho,a),c;try{c=e.interop.extensions.provide(vn,{...t,getSnapshot(d){let u=t.getSnapshot(d),f={surface:t.surface,...d===void 0?{}:{instanceId:d}},h,S;try{h=s(u,f,!1)}catch{}try{S=s(u,f,!0)}catch{}return{...u,bookmark:h,bookmarkView:S}}})}catch(d){throw o=!1,l(),d}return()=>{o=!1,c(),l()}}var at=e=>!!e&&typeof e=="object"&&!Array.isArray(e),bo=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function yo(e){if(!at(e)||!bo(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(n=>typeof n=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(n))))return!1;let t=new Set;for(let n of e.items){if(!at(n)||!bo(n.id)||t.has(n.id)||typeof n.label!="string"||!n.label.trim()||n.label.length>256||n.labelKey!==void 0&&typeof n.labelKey!="string"||n.available!==void 0&&typeof n.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(n.kind)))return!1;t.add(n.id)}if(e.automation!==void 0){if(!at(e.automation)||Object.keys(e.automation).some(n=>n!=="actions")||!at(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[n,o]of Object.entries(e.automation.actions))if(!t.has(n)||!at(o)||!["button","number","string","boolean"].includes(String(o.type))||Object.keys(o).some(i=>!["type","integer","maxLength"].includes(i))||o.integer!==void 0&&(o.type!=="number"||typeof o.integer!="boolean")||o.maxLength!==void 0&&(o.type!=="string"||!Number.isSafeInteger(o.maxLength)||Number(o.maxLength)<1||Number(o.maxLength)>65536))return!1}return e.defaultItems.every(n=>typeof n=="string"&&t.has(n))&&new Set(e.defaultItems).size===e.defaultItems.length}var qi=z("workspace.details","extension","1.0.0","many",yo,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var sd=[X,`${X}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var vd=1024*1024;var xd=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var Ad=globalThis.Buffer;var Xi=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var Ji=[".ttf",".otf",".woff",".woff2"],Yi=[".csv"],Qi=[".base"],es=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],ts=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],ns=[...es,...ts,".ico",".flavicon"];var os=[".pdf"],rs=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],is=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],ss=[".srt",".vtt",".ass"],as=[".stl",".obj",".glb",".gltf"],ds=[".bin",".mtl"];function dt(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var cs={type:"core",id:"valley"},N=(e,t,n,o,i={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:o,owner:cs,...i});function ls(e){let t={};for(let[n,o]of e)for(let i of n)t[i]=o;return t}var us=ls([[[".mermaid",".mmd"],N("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],N("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],N("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],N("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],N("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Ji,N("font","font","font","media")],[[".epub",".mobi",".azw3"],N("ebook","ebook","ebook","documents")],[[".djvu"],N("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],N("comic","comic","comic","documents")],[[".md",".markdown"],N("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],N("text","text","text","notes")],[[".json"],N("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],N("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Yi,N("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Qi,N("base","base","fallback","data")],[ns,N("image","image","image","media",{information:["identity","dimensions","exif"]})],[os,N("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[rs,N("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[is,N("video","video","video","media",{information:["identity","media","video-codec"]})],[ss,N("text","subtitle","text","media")],[as,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[ds,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],N("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],N("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],N("docx","word","opendocument","documents")],[[".ods"],N("csv","excel","opendocument","data")],[[".odp"],N("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],N("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],N("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],N("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],N("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],N("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],N("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],N("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],N("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],N("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],N("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],N("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],N("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],N("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],N("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],N("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],N("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],N("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],N("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],N("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],N("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],N("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],N("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],N("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],N("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],N("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],N("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],N("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),fs=N("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function ps(e){return us[dt(e)]??fs}function Me(e){return ps(e).kind}var r,y,Te=0;function wo(e){Te++,y=e,r=e.React}function Ct(){return y.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ne(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let o=n.toString();return n.search?o:o.replace(/\/$/,"")}catch{return t}}function Rt(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var Ke="sideNotes.notes",An="sideNotes.note_tags",kn="sideNotes.path_history",Dt=100,ms=32,vo=4096,gs=4*1024*1024;function hs(e){return e?e.kind==="none"?"none":e.kind==="ids"?JSON.stringify(["ids",[...new Set(e.ids)].sort()]):JSON.stringify(e.kind==="file"?["file",e.path,e.includeWeb===!0]:["web",ne(e.url)]):"all"}async function So(e){let t=await Promise.allSettled(e),n=t.find(o=>o.status==="rejected");if(n?.status==="rejected")throw n.reason;return t.map(o=>o.value)}var Mt=class{constructor(t,n,o){V(this,"api",t);V(this,"isCurrent",n);V(this,"normalize",o);V(this,"revision",0);V(this,"catalogRevision",0);V(this,"catalog",null);V(this,"catalogKeys",new Set);V(this,"dirtyKeys",new Set);V(this,"sourceRevision",null);V(this,"realmGeneration",null);V(this,"catalogPending",null);V(this,"pending",new Map);V(this,"disposed",!1);V(this,"disposers");V(this,"listeners",new Set);this.disposers=[Ke,An,kn].map(i=>t.data.dataset(i).subscribe(s=>{if(!this.isActive())return;this.revision++;let a=this.realmGeneration!==null&&this.realmGeneration!==s.realmGeneration;if(this.realmGeneration=s.realmGeneration,a&&(this.catalogRevision++,this.sourceRevision=null,this.resetCatalog()),i===Ke&&(this.catalogRevision++,this.changeSubjects(s)),this.isActive())for(let l of this.listeners)l()})),this.disposers.push(t.subscribe(()=>{this.isCurrent()||this.dispose()}))}isActive(){return!this.disposed&&this.isCurrent()}subscribe(t){return this.isActive()?(this.listeners.add(t),()=>{this.listeners.delete(t)}):()=>{}}dispose(){if(!this.disposed){this.disposed=!0,this.resetCatalog(),this.listeners.clear();for(let t of this.disposers)t();this.disposers=[]}}assertActive(){if(!this.isActive())throw new Error("SideNotes reader is no longer active")}resetCatalog(){this.catalog=null,this.catalogKeys.clear(),this.dirtyKeys.clear()}changeSubjects(t){let n=this.sourceRevision;if(this.sourceRevision=Number.isSafeInteger(t.revision)&&t.revision>=0?t.revision:null,!this.catalog||n===null||this.sourceRevision!==n+1||!t.keys?.length||t.keys.length>vo){this.resetCatalog();return}for(let o of t.keys){if(!o||typeof o!="object"||Array.isArray(o)||Object.keys(o).length!==1||typeof o.id!="string"||!this.catalogKeys.has(o.id)){this.resetCatalog();return}this.dirtyKeys.add(o.id)}}retainSubjects(t){if(this.resetCatalog(),t.length>vo)return;let n=0;for(let o of t){if(typeof o.id!="string"||this.catalogKeys.has(o.id)){this.resetCatalog();return}this.catalogKeys.add(o.id);for(let i of["id","path","url"])typeof o[i]=="string"&&(n+=o[i].length*2);if(n>gs){this.resetCatalog();return}}this.catalog=t}async rows(t,n={},o){let i=[],s;do{this.assertActive();let a=await this.api.data.dataset(t).query({...n,limit:1e3,cursor:s});this.assertActive(),o?.(a.revision),i.push(...a.rows),s=a.cursor}while(s);return i}subjects(){if(this.catalogPending)return this.catalogPending;if(this.catalog&&!this.dirtyKeys.size)return Promise.resolve(this.catalog);let t=(async()=>{for(;;){let o=this.catalogRevision,i=this.catalog,s=[...this.dirtyKeys],a=this.sourceRevision,l,c=d=>{if(!Number.isSafeInteger(d)||d<0||l!==void 0&&d!==l)throw new Error("SideNotes catalog changed during read");l=d};try{let d;if(i){let u=new Map;for(let h=0;h<s.length;h+=Dt){let S=s.slice(h,h+Dt),I=await this.rows(Ke,{select:["id","path","url"],where:{id:{in:S}}},c);for(let x of I){if(typeof x.id!="string"||!S.includes(x.id))throw new Error("Invalid SideNotes catalog key");u.set(x.id,x)}if(o!==this.catalogRevision)break}if(o!==this.catalogRevision)continue;if(l!==a){this.resetCatalog();continue}let f=new Set(s);d=i.flatMap(h=>{if(!f.has(String(h.id)))return[h];let S=u.get(String(h.id));return S?[S]:[]})}else d=await this.rows(Ke,{select:["id","path","url"]},c);if(this.assertActive(),o!==this.catalogRevision)continue;if(l===void 0||a!==null&&l<a)throw new Error("SideNotes catalog revision is unavailable");return this.sourceRevision=l,this.retainSubjects(d),d}catch(d){if(this.assertActive(),o!==this.catalogRevision)continue;throw this.resetCatalog(),d}}})();this.catalogPending=t;let n=()=>{this.catalogPending===t&&(this.catalogPending=null)};return t.then(n,n),t}async read(t){let n=[],o=[],i=[];if(!t)[n,o,i]=await So([this.rows(Ke),this.rows(An),this.rows(kn)]);else{let l=t.kind==="web"?ne(t.url):t.kind==="file"?t.path:"",c=t.kind==="ids"?new Set(t.ids):null;if(!l&&!c?.size)return[];let d=(await this.subjects()).filter(u=>{if(c)return typeof u.id=="string"&&c.has(u.id.trim());if(t.kind==="file"&&(typeof u.path!="string"||u.path.trim()!==l))return!1;let f=ne(typeof u.url=="string"?u.url:"");return t.kind==="web"?f===l:t.kind==="file"&&t.includeWeb===!0||!f}).map(u=>u.id).filter(u=>typeof u=="string"&&!!u.trim());for(let u=0;u<d.length;u+=Dt){let f=d.slice(u,u+Dt),[h,S,I]=await So([this.rows(Ke,{where:{id:{in:f}}}),this.rows(An,{where:{noteId:{in:f}}}),this.rows(kn,{where:{noteId:{in:f}}})]);n.push(...h),o.push(...S),i.push(...I)}}let s=new Map;for(let l of o){if(typeof l.noteId!="string")continue;let c=s.get(l.noteId);c?c.push(l.tag):s.set(l.noteId,[l.tag])}let a=new Map;for(let l of i){if(typeof l.noteId!="string")continue;let c=a.get(l.noteId);c?c.push(l):a.set(l.noteId,[l])}for(let l of a.values())l.sort((c,d)=>Number(c.position)-Number(d.position));return n.map(l=>this.normalize({...l,tags:s.get(String(l.id))??[],pathHistory:(a.get(String(l.id))??[]).map(c=>c.path)})).filter(l=>l!==null)}load(t){if(!this.isActive())return Promise.reject(new Error("SideNotes reader is no longer active"));let n=hs(t),o=this.pending.get(n);if(o)return o;if(this.pending.size>=ms)return Promise.reject(new Error("Too many SideNotes reads"));let i=t?.kind==="ids"?{kind:t.kind,ids:[...t.ids]}:t?{...t}:void 0,s=(async()=>{for(;;){this.assertActive();let l=this.revision;try{let c=await this.read(i);if(this.assertActive(),l===this.revision)return c}catch(c){if(this.assertActive(),l===this.revision)throw c}}})();this.pending.set(n,s);let a=()=>{this.pending.get(n)===s&&this.pending.delete(n)};return s.then(a,a),s}};var jt="sideNotes.notes",ct="sideNotes.note_tags",En="sideNotes.path_history";function xo(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function lt(){return new Date().toISOString()}function ue(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function be(e){return typeof e=="string"?e:""}function bs(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=be(t.type);if(n==="pdf-page"){let o=be(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),...o?{snippet:o}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.2),height:ue(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,ue(t.seconds,0))};if(n==="markdown-line"){let o=be(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(ue(t.line,1))),...o?{snippet:o}:{}}}if(n==="markdown-heading"){let o=be(t.heading).trim();return o?{type:n,heading:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let o=be(t.snippet).trim();return o?{type:n,snippet:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.25),height:ue(t.height,.25)};if(n==="web-selection"){let o=be(t.snippet).trim();return o?{type:n,snippet:o}:{type:"none"}}return{type:"none"}}function ys(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function ws(e){let t=be(e.id).trim(),n=be(e.path).trim(),o=ne(be(e.url)),i=be(e.note).trim();if(!t||!i||!n&&!o)return null;let s=be(e.createdAt)||lt(),a=Array.isArray(e.pathHistory)?e.pathHistory.filter(l=>typeof l=="string"&&l!==n):[];return{id:t,path:n,note:i,...o?{url:o}:{},pathHistory:[...new Set(a)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],anchor:bs(e.anchor),fileKey:ys(e.fileKey),createdAt:s,updatedAt:be(e.updatedAt)||s}}function te(e=y,t){let n=Te,o=()=>{if(t?.(),e!==y||n!==Te)throw new Error("SideNotes mutation session is no longer active")};o();let i=_e();return{api:e,reader:i,isActive:()=>{try{return o(),i.isActive()}catch{return!1}},assertActive:()=>{if(o(),!i.isActive())throw new Error("SideNotes mutation session is no longer active")}}}function oe(e){return{...e,tags:[...e.tags],pathHistory:[...e.pathHistory],anchor:{...e.anchor},...e.fileKey?{fileKey:{...e.fileKey}}:{}}}async function Ft(e,t){if(t.assertActive(),!e.path)return e;let n=await t.api.realm.stat(e.path);return t.assertActive(),n?{...e,fileKey:{dev:n.dev,ino:n.ino}}:e}function Ao(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function No(e,t,n){let o=[],i;do{e.assertActive();let s=await e.api.data.dataset(t).query({where:n,limit:1e3,cursor:i});e.assertActive(),o.push(...s.rows),i=s.cursor}while(i);return o}function ko(e){return[...e.tags.map(t=>({dataset:ct,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:En,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function vs(e,t){let n=await Promise.allSettled([No(e,ct,{noteId:t}),No(e,En,{noteId:t})]),o=n.find(a=>a.status==="rejected");if(o?.status==="rejected")throw o.reason;e.assertActive();let[i,s]=n.map(a=>a.value);return[...i.map(a=>({dataset:ct,operation:"delete",key:{noteId:t,tag:String(a.tag)}})),...s.map(a=>({dataset:En,operation:"delete",key:{noteId:t,position:Number(a.position)}}))]}function _e(){let e=y,t=Te,n=e.getState().realm?.path??null,o=e.runtime.getOrCreate("sideNotes.noteRepository",()=>({current:null}));return o.current?.isActive()||(o.current?.dispose(),o.current=new Mt(e,()=>{if(e!==y||t!==Te)return!1;try{return(e.getState().realm?.path??null)===n}catch{return!1}},i=>ws(i))),o.current}function zt(e,t,n,o=[]){let i=lt();return{id:xo(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:i,updatedAt:i}}function $t(e,t,n,o=[]){let i=lt();return{id:xo(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:i,updatedAt:i}}var Ss={conflict:"REVISION_CONFLICT","document-not-found":"TARGET_NOT_FOUND"};function Vt(e){return e instanceof Error?e:new Error(String(e))}function In(e,t,n){let o=Vt(e),i=t==="not-applied"&&o.retryable===!0;return Object.assign(o,{code:typeof o.code=="string"?Ss[o.code]??o.code:n,outcome:t,retryable:i})}function Eo(e){let t=Vt(e);return t.outcome==="unknown"||t.outcomeUnknown===!0}function Ns(e,t="TARGET_UNAVAILABLE"){return Eo(e)?Vt(e):In(e,"not-applied",t)}function xs(e){if(Eo(e))return In(e,"unknown","OUTCOME_UNKNOWN");let t=Vt(e);return typeof t.code=="string"?In(t,"not-applied",t.code):t}function Lt(e,t){return Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}async function ve(e){try{return await e()}catch(t){throw Ns(t)}}async function Tn(e){try{return await e()}catch(t){throw xs(t)}}async function Io(e,t){await ve(async()=>t.assertActive()),await Tn(()=>t.api.data.transaction([{dataset:jt,operation:"insert",values:Ao(e)},...ko(e)]))}async function To(e,t=te()){let n=await Ft(oe(e),t);try{return await Io(n,t),!0}catch{return!1}}async function Ut(e,t=te()){let n=await ve(()=>Ft(oe(e),t));await Io(n,t)}async function _o(e,t,n,o,i){let s={pluginId:i.api.pluginId,sourceId:"notes",itemId:e},{baseline:a,deletes:l}=await ve(async()=>{i.assertActive();let d=await i.api.documents.read(s);if(i.assertActive(),!d)throw Lt("TARGET_NOT_FOUND","The SideNote no longer exists.");if(n!==void 0){let f=await i.api.data.dataset(jt).get({id:e});if(i.assertActive(),!f)throw Lt("TARGET_NOT_FOUND","The SideNote no longer exists.");if(f.updatedAt!==n)throw Lt("REVISION_CONFLICT","This SideNote changed elsewhere. Newer work was preserved.")}let u=await vs(i,e);return i.assertActive(),{baseline:d,deletes:u}}),c=Ao(t);delete c.id,delete c.note,await Tn(()=>i.api.documents.update(s,{expectedRevision:o?.expectedRevision??a.revision,realmGeneration:o?.realmGeneration??a.realmGeneration,body:t.note,explicitTags:t.tags,operations:[{dataset:jt,operation:"update",key:{id:e},values:c},...l.filter(d=>d.dataset!==ct),...ko(t).filter(d=>d.dataset!==ct)]}))}async function Ge(e,t,n,o,i=te()){let s=o?{...o}:void 0,a=await Ft({...oe(t),id:e},i);try{return await _o(e,a,n,s,i),!0}catch{return!1}}async function _n(e,t,n,o,i=te()){let s=o?{...o}:void 0,a=await ve(()=>Ft({...oe(t),id:e},i));await _o(e,a,n,s,i)}async function Oo(e,t){await ve(async()=>t.assertActive());let{affected:n}=await Tn(()=>t.api.data.dataset(jt).delete({id:e}));if(n<=0)throw Lt("TARGET_NOT_FOUND","The SideNote no longer exists.")}async function Bt(e,t=te()){try{return await Oo(e,t),!0}catch{return!1}}async function Wt(e,t=te()){await Oo(e,t)}async function Po(e,t,n=te()){try{if(!e||!t||e===t)return;n.assertActive();let o=await n.reader.load();n.assertActive();let i=`${e}/`;for(let s of o){if(s.path!==e&&!s.path.startsWith(i))continue;let a=s.path===e?t:`${t}/${s.path.slice(i.length)}`,l={...s,path:a,pathHistory:[s.path,...s.pathHistory.filter(c=>c!==s.path)],updatedAt:lt()};n.assertActive(),await Ge(s.id,l,void 0,void 0,n),n.assertActive()}}catch(o){if(n.isActive())throw o}}async function Co(e,t,n,o=te()){try{if(!Number.isFinite(n)||n===0||!e)return;let i=Math.max(1,Math.floor(t));o.assertActive();let s=await o.reader.load();o.assertActive();for(let a of s){if(a.path!==e||a.anchor.type!=="markdown-line"||a.anchor.line<i)continue;let l={...a,anchor:{...a.anchor,line:Math.max(1,a.anchor.line+n)},updatedAt:lt()};o.assertActive(),await Ge(a.id,l,void 0,void 0,o),o.assertActive()}}catch(i){if(o.isActive())throw i}}var Ro={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var ks=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Es=/^-\s+(.*)$/,Is=/^[A-Za-z][\w+.-]*:\/\//;function Do(e){let t={bare:null,values:{},lists:{}},n=null;for(let o of e.split(`
`)){let i=o.trim();if(!i||i.startsWith("#"))continue;let s=i.match(Es);if(s){n?t.lists[n].push(s[1].trim()):t.bare===null&&(t.bare=s[1].trim());continue}let a=Is.test(i)?null:i.match(ks);if(a){let l=a[1].trim().toLowerCase(),c=a[2].trim();c===""?(n=l,t.lists[l]=t.lists[l]??[]):(n=null,t.values[l]=c);continue}n=null,t.bare===null&&(t.bare=i)}return t}function Mo(e,t,n=500){let o=e.values[t];if(o===void 0)return null;let i=Number.parseInt(o,10);return!Number.isFinite(i)||i<1?null:Math.min(i,n)}var Lo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-realm browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"Preferred file extensions appear first, in this order. Extensions from saved SideNotes are added automatically, even when this list is empty.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"No extension","sideNotes.filter.web":"Web","sideNotes.error.load":"Could not load SideNotes. Try again.","sideNotes.action.retry":"Retry","bookmark.view":"Notes and filters","bookmark.item":"Selected item"};var jo={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem realm-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Bevorzugte Dateierweiterungen erscheinen zuerst, in dieser Reihenfolge. Erweiterungen gespeicherter SideNotes werden automatisch erg\xE4nzt, auch wenn diese Liste leer ist.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"Ohne Erweiterung","sideNotes.filter.web":"Internet","sideNotes.error.load":"SideNotes konnten nicht geladen werden. Versuche es erneut.","sideNotes.action.retry":"Erneut versuchen","bookmark.view":"Notizen und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag"};var Fo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda el realm.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Las extensiones preferidas aparecen primero, en este orden. Las extensiones de las SideNotes guardadas se a\xF1aden autom\xE1ticamente, aunque esta lista est\xE9 vac\xEDa.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.noExtension":"Sin extensi\xF3n","sideNotes.filter.web":"Sitio web","sideNotes.error.load":"No se pudieron cargar las SideNotes. Int\xE9ntalo de nuevo.","sideNotes.action.retry":"Reintentar","bookmark.view":"Notas y filtros","bookmark.item":"Elemento seleccionado"};var zo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le realm.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Les extensions pr\xE9f\xE9r\xE9es apparaissent en premier, dans cet ordre. Les extensions des SideNotes enregistr\xE9es sont ajout\xE9es automatiquement, m\xEAme si cette liste est vide.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.noExtension":"Sans extension","sideNotes.filter.web":"Site web","sideNotes.error.load":"Impossible de charger les SideNotes. R\xE9essayez.","sideNotes.action.retry":"R\xE9essayer","bookmark.view":"Notes et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9"};var $o={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8 Realm \u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"\u9996\u9009\u6587\u4EF6\u6269\u5C55\u540D\u6309\u6B64\u987A\u5E8F\u4F18\u5148\u663E\u793A\u3002\u5DF2\u4FDD\u5B58\u7684 SideNotes \u4E2D\u7684\u6269\u5C55\u540D\u4F1A\u81EA\u52A8\u6DFB\u52A0\uFF0C\u5373\u4F7F\u6B64\u5217\u8868\u4E3A\u7A7A\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.noExtension":"\u65E0\u6269\u5C55\u540D","sideNotes.filter.web":"\u7F51\u9875","sideNotes.error.load":"\u65E0\u6CD5\u52A0\u8F7D SideNotes\u3002\u8BF7\u91CD\u8BD5\u3002","sideNotes.action.retry":"\u91CD\u8BD5","bookmark.view":"\u7B14\u8BB0\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE"};var Vo={en:Lo,de:jo,es:Fo,fr:zo,"zh-CN":$o};function Uo(e,t){return(Vo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(o,i)=>String(t?.[i]??""))}var Bo=Uo;function Wo(e){e.ui.registerCatalogs(Vo),Bo=(t,n)=>{let o=e.ui.t(t,n);return o===t?Uo(t,n):o}}function p(e,t){return Bo(e,t)}function Ko(){let[e]=r.useState(()=>{let t=y,n=_e(),o=t.getState().activePath;return{getSnapshot:()=>(n.isActive()&&(o=t.getState().activePath),o),subscribe:i=>{if(!n.isActive())return()=>{};let s=!0,a=t.subscribe(()=>{s&&n.isActive()&&i()});return()=>{s=!1,a()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Go(){let[e]=r.useState(()=>{let t=y,n=_e(),o=t.interop.state.get(it),i=o?{...o}:null;return{getSnapshot:()=>{if(n.isActive()){let s=t.interop.state.get(it);s?(!i||s.instanceId!==i.instanceId||s.url!==i.url||s.title!==i.title)&&(i={...s}):i=null}return i},subscribe:s=>{if(!n.isActive())return()=>{};let a=!0,l=t.interop.state.subscribe(it,()=>{a&&n.isActive()&&s()});return()=>{a=!1,l()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function He(e){let[t]=r.useState(_e),[n,o]=r.useState([]),[i,s]=r.useState(!0),[a,l]=r.useState(null),c=r.useRef(!1),d=r.useRef(0),u=e?.kind??"all",f=e?.kind==="file"?e.path:e?.kind==="web"?ne(e.url):"",h=e?.kind==="file"&&e.includeWeb===!0,S=r.useCallback(()=>{if(!c.current||!t.isActive())return;let I=++d.current,x=u==="all"?void 0:u==="file"?{kind:u,path:f,includeWeb:h}:u==="web"?{kind:u,url:f}:{kind:u};t.load(x).then(k=>{!c.current||!t.isActive()||I!==d.current||(o(k),l(null),s(!1))}).catch(()=>{!c.current||!t.isActive()||I!==d.current||(l(p("sideNotes.error.load")),s(!1))})},[u,f,h,t]);return r.useEffect(()=>{c.current=!0,o([]),s(!0),l(null);let I=t.subscribe(S);return S(),()=>{c.current=!1,d.current++,I()}},[S,t]),{notes:n,setNotes:o,loading:i,error:a,reload:S}}function Ho(){let[e,t]=r.useState(new Set),n=r.useCallback(i=>e.has(i),[e]),o=r.useCallback((i,s)=>{t(a=>{let l=new Set(a);return s?l.add(i):l.delete(i),l})},[]);return{isPending:n,setPending:o,pending:e}}var On="notes-sidenotes-fence-styles";function Rs(){if(document.getElementById(On))return;let e=document.createElement("style");e.id=On,e.textContent=`
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
`,document.head.appendChild(e)}var qo=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?p("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},Ds=({code:e,path:t})=>{let n=Do(e),o=n.values.file??n.bare??t,i=n.values.url?ne(n.values.url):null,s=(n.values.flagged??"").toLowerCase()==="true",a=n.values.tag?n.values.tag.replace(/^#/,"").toLowerCase():null,l=Mo(n,"limit",100)??20,{notes:c,loading:d,error:u,reload:f}=He(i?{kind:"web",url:i}:o?{kind:"file",path:o,includeWeb:!0}:s?void 0:{kind:"none"});if(u)return r.createElement("div",{className:"sidenotes-fence-empty",role:"alert"},u," ",r.createElement("button",{type:"button",onClick:f},p("sideNotes.action.retry")));if(d)return r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.33ce417454bf"));let h=c.filter(x=>i?x.url===i:o?!(x.path!==o||s&&x.flagged!==!0||a&&!x.tags.some(k=>k.replace(/^#/,"").toLowerCase()===a)):s?x.flagged===!0:!1).slice(0,l),S=()=>{y.workspace.revealOwnPanel("right_sidebar")},I=i??(o?o.split("/").pop():s?"flagged":null);return r.createElement(r.Fragment,null,r.createElement("div",{className:"sidenotes-fence-head",onClick:S,title:p("auto.954a9a37711e")},r.createElement("span",{className:"t"},p("auto.746eb1a86a79")," ",I?` \xB7 ${I}`:""),r.createElement("span",{className:"c"},h.length)),h.length===0&&r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.f545c86bbd6e")),h.map(x=>r.createElement("div",{key:x.id,className:"sidenotes-fence-note",onClick:S},r.createElement(y.ui.MarkdownView,{className:"body",value:x.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:x.id},sourcePath:x.path||void 0}}),r.createElement("div",{className:"meta"},x.flagged&&r.createElement("span",{className:"flag"},"\u2691"),qo(x)&&r.createElement("span",null,qo(x)),x.tags.slice(0,3).map(k=>r.createElement("span",{key:k},"#",k.replace(/^#/,"")))))))};function Zo(){let e=y.markdown.registerCodeBlockRenderer("sidenotes",(t,n,o)=>(Rs(),n.classList.add("sidenotes-fence"),y.ui.renderReact(n,r.createElement(Ds,{code:t,path:o.path}))),{examples:Ro.sidenotes});return()=>{e(),document.getElementById(On)?.remove()}}var Kt=e=>typeof e=="string"?e:"";function Xo(e){let t=Kt(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Jo(e){let t={cardKind:"sidenote",open:async(n,o)=>{if(Kt(n.id)&&!o.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:Kt(n.id)}),!0;let i=Kt(n.url);if(i)return o.newTab?e.links.open(i,{newTab:!0}):e.links.open(i),!0;let s=Xo(n.path)||Xo(o.path);if(s){let a=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(s,a?.type==="web-selection"?void 0:a,{newTab:o.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(wn,t)}function Ms(e){return e.replace(/\s+/g," ").trim()}var Yo=200;function Ls(e,t){let n=Ms(e),o=n.slice(0,Yo);if(!t)return o;let i=n.replace(/ /g,"").slice(0,Yo).toLowerCase();if(!i)return o;let s=[],a="";for(let c=0;c<t.length;c++)/\s/.test(t[c])||(s.push(c),a+=t[c].toLowerCase());let l=a.indexOf(i);return l<0?o:t.slice(s[l],s[l+i.length-1]+1).trim()}function Qo(e,t){let n=e.text.trim(),o=Math.floor(e.page);return!n||!e.path||!Number.isFinite(o)||o<1?null:{kind:"file",path:e.path,page:o,snippet:Ls(n,t)}}function er(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let n=t.text.trim();if(!n)return null;let o=Number(t.page);return!Number.isFinite(o)||o<1?null:{path:e,page:o,text:n}}function js(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Fs(e,t,n=320){let o=t.top-n,i=t.top+t.height+n,s=0,a=e.length;for(;s<a;){let c=s+a>>>1;e[c].start+e[c].height<o?s=c+1:a=c}let l=s;for(a=e.length;s<a;){let c=s+a>>>1;e[c].start<=i?s=c+1:a=c}return[l,s]}function Gt(e,t){let{ids:n,estimate:o,pinned:i=[],layoutKey:s}=t,a=t.enabled??n.length>80,l=e.useRef(null),c=e.useRef(new Map),[d,u]=e.useReducer(v=>v+1,0),[f,h]=e.useState({top:0,height:600}),[S,I]=e.useState(null),[x,k]=e.useState(null),D=e.useRef(null),j=e.useRef(null),_=e.useMemo(()=>{let v=0;return n.map(C=>{let U=c.current.get(C)??o,K={id:C,height:U,start:v};return v+=U,K})},[n,o,d]),W=_.length?_[_.length-1].start+_[_.length-1].height:0,O=e.useRef({rows:_,viewport:f});O.current={rows:_,viewport:f};let $=e.useCallback(()=>{let v=l.current,C=D.current;if(!v||!C)return;let U=v.getBoundingClientRect(),K=C.getBoundingClientRect(),M=C.clientHeight||K.height||600,Y=C===v?C.scrollTop:K.top-U.top;h(ce=>ce.top===Y&&ce.height===M?ce:{top:Y,height:M})},[]),ie=e.useCallback(()=>{j.current===null&&(j.current=requestAnimationFrame(()=>{j.current=null,$()}))},[$]);e.useLayoutEffect(()=>{let v=l.current;if(!v||!a)return;let C=js(v);D.current=C;let U=v.style.overflowAnchor;v.style.overflowAnchor="none";let K=!0,M=()=>{if(!K)return;let Q=v.ownerDocument.activeElement,se=Q instanceof Element?Q.closest("[data-visible-key]"):null;I(se&&v.contains(se)?se.dataset.visibleKey??null:null)},Y=()=>{queueMicrotask(M)};C.addEventListener("scroll",ie,{passive:!0}),window.addEventListener("resize",ie),v.addEventListener("focusin",M),v.addEventListener("focusout",Y);let ce=v.clientWidth,we=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{v.clientWidth!==ce&&(ce=v.clientWidth,c.current.clear(),u()),ie()});return we?.observe(C),C!==v&&we?.observe(v),$(),()=>{K=!1,v.style.overflowAnchor==="none"&&(v.style.overflowAnchor=U),C.removeEventListener("scroll",ie),window.removeEventListener("resize",ie),v.removeEventListener("focusin",M),v.removeEventListener("focusout",Y),we?.disconnect(),j.current!==null&&cancelAnimationFrame(j.current),j.current=null,D.current=null}},[a,$,ie]),e.useLayoutEffect(()=>{let v=new Set(n);for(let C of c.current.keys())v.has(C)||c.current.delete(C);$()},[n,$]),e.useLayoutEffect(()=>{c.current.clear(),u()},[s]),e.useLayoutEffect(()=>{let v=l.current;if(!v||!a)return;let C=M=>{let Y=0,ce=!1,{rows:we,viewport:Q}=O.current,se=new Map(we.map(pe=>[pe.id,pe]));for(let pe of M){let Ie=pe.dataset.visibleKey,ge=Ie?se.get(Ie):void 0,he=pe.getBoundingClientRect().height;!Ie||!ge||he<=0||Math.abs(he-ge.height)<.5||(c.current.set(Ie,he),ge.start+ge.height<=Q.top&&(Y+=he-ge.height),ce=!0)}ce&&(Y&&D.current&&(D.current.scrollTop+=Y),u(),ie())},U=Array.from(v.children).filter(M=>M.hasAttribute("data-visible-key")),K=typeof ResizeObserver>"u"?void 0:new ResizeObserver(M=>C(M.map(Y=>Y.target)));return U.forEach(M=>K?.observe(M)),C(U),()=>K?.disconnect()}),e.useLayoutEffect(()=>{if(!x)return;let v=Array.from(l.current?.children??[]).find(C=>C.dataset.visibleKey===x.id);v&&(v.scrollIntoView?.({block:"nearest"}),x.selector&&(v.matches(x.selector)?v:v.querySelector(x.selector))?.focus(),$(),k(null))},[x,_,$]);let ye=e.useCallback((v,C)=>{k({id:v,selector:C})},[]),[Ee,Ue]=a?Fs(_,f):[0,_.length],Ne=new Set;for(let v=Ee;v<Ue;v++)Ne.add(v);let Re=new Set([...i,S,x?.id].filter(Boolean));return Re.size&&_.forEach((v,C)=>{Re.has(v.id)&&Ne.add(C)}),{ref:l,show:ye,render(v){let C=[],U=0;for(let K of[...Ne].sort((M,Y)=>M-Y)){let M=_[K];M.start>U&&C.push(e.createElement("div",{key:`space:${M.id}`,"aria-hidden":!0,style:{height:M.start-U,flex:"0 0 auto",pointerEvents:"none"}})),C.push(e.createElement(e.Fragment,{key:M.id},v(K))),U=M.start+M.height}return W>U&&C.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:W-U,flex:"0 0 auto",pointerEvents:"none"}})),C}}}var or=4,zs=32,$s=32,tr=8*1024*1024,nr=new WeakMap;function rr(e){for(;e.active<or&&e.tasks.length;){let t=e.tasks.shift();e.active++,t.read().then(t.resolve,t.reject).finally(()=>{e.active--,rr(e)})}}var xe=class extends Error{constructor(){super("SideNotes anchor reader is no longer active")}},Se=class{constructor(t=y){V(this,"owner",t);V(this,"generation");V(this,"root");V(this,"disposed",!1);V(this,"unsubscribe",()=>{});V(this,"queue");V(this,"bytes",0);V(this,"cache",new Map);V(this,"pending",new Map);this.generation=Te,this.root=t.getState().realm?.path??null,this.queue=nr.get(t)??{active:0,tasks:[]},nr.set(t,this.queue),this.unsubscribe=t.subscribe(()=>{this.isActive()||this.dispose()})}isActive(){if(this.disposed||this.owner!==y||this.generation!==Te)return!1;try{return(this.owner.getState().realm?.path??null)===this.root}catch{return!1}}assertActive(){if(!this.isActive())throw new xe}dispose(){this.disposed||(this.disposed=!0,this.unsubscribe(),this.cache.clear(),this.bytes=0,this.queue.tasks=this.queue.tasks.filter(t=>t.owner!==this?!0:(t.reject(new xe),!1)),this.pending.clear())}file(t){return this.request(JSON.stringify(["file",t]),()=>this.owner.realm.readFile(t))}page(t,n){return this.request(JSON.stringify(["page",t,n]),()=>this.owner.workspace.getPdfPageText(t,n))}pageCount(t){this.assertActive();let n=this.owner.workspace.getPdfPageCount(t);return this.assertActive(),n}mediaDuration(){this.assertActive();let t=this.owner.workspace.getMediaDuration();return this.assertActive(),t}request(t,n){if(!this.isActive())return Promise.reject(new xe);let o=this.cache.get(t);if(o)return this.cache.delete(t),this.cache.set(t,o),Promise.resolve(o.value);let i=this.pending.get(t);if(i)return i;if(this.queue.active>=or&&this.queue.tasks.length>=zs)return Promise.reject(new Error("Too many SideNotes anchor reads"));let s,a=async()=>{this.assertActive();let d=await n();this.assertActive();let u=2*(t.length+(d?.length??0));if(u<=tr){for(;this.cache.size>=$s||this.bytes+u>tr;){let[f,h]=this.cache.entries().next().value;this.cache.delete(f),this.bytes-=h.bytes}this.cache.set(t,{value:d,bytes:u}),this.bytes+=u}return d},l=new Promise((d,u)=>{s={owner:this,read:a,resolve:d,reject:u}});this.pending.set(t,l);let c=()=>{this.pending.get(t)===l&&this.pending.delete(t)};return l.then(c,c),this.queue.tasks.push(s),rr(this.queue),l}};var ft={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function mt(){return["none","web-selection"]}function Cn(e){let t=Me(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function sr(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let o=e.line??0;return!!t.lineRange&&o>=1&&o>=t.lineRange.from&&o<=t.lineRange.to}return!1}function ar(e,t){let n=Me(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function gt(e){let t=Me(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function pt(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var Ht=1e7,ut=1e6,Vs=Ht-1,ir=Ht-2;function Le(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function Pn(e,t){if(e.type==="pdf-page"){let n=e.page*Ht,o=e.snippet?Le(e.snippet):"";if(!o||t==null)return n;let i=Le(t).indexOf(o);return n+(i>=0?Math.min(i,ir):Vs)}if(e.type==="pdf-region")return e.page*Ht+Math.max(0,Math.min(e.y,ir));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?Le(e.snippet):"";if(n&&t!=null){let o=t.replace(/\r\n?/g,`
`).split(`
`);for(let i=0;i<o.length;i++){let s=Le(o[i]).indexOf(n);if(s>=0)return(i+1)*ut+Math.min(s,ut-1)}}return(e.line??0)*ut}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,o=n*ut,i=e.type==="markdown-heading"?"":e.snippet?Le(e.snippet):"";if(!i||t==null||n<1)return o;let s=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(s==null)return o;let a=Le(s).indexOf(i);return o+(a>=0?Math.min(a,ut-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}function dr(e,t,n){let o=n.get(e.id)??pt(e.anchor),i=n.get(t.id)??pt(t.anchor);return o!==i?o-i:t.createdAt.localeCompare(e.createdAt)}function qe(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),o=Math.floor(t%3600/60),i=t%60;return n>0?`${n}:${String(o).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${o}:${String(i).padStart(2,"0")}`}function Ze(e){return e.type==="pdf-page"?p("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?p("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?qe(e.seconds):e.type==="markdown-line"?p("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?p(ft["image-region"]):e.type==="web-selection"?e.snippet||p(ft["web-selection"]):p(ft.none)}function cr(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function Rn(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let o=t.split(":").map(s=>Number(s));if(o.some(s=>!Number.isFinite(s)||s<0))return null;let i=o.reduce((s,a)=>s*60+a,0);return Number.isFinite(i)?i:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function qt(e,t,n){if(n?.assertActive(),t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let o=n?await n.file(e):await y.realm.readFile(e);if(n?.assertActive(),!o)return t;let i=o.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let l=i[t.line-1]?.trim().slice(0,160);return l?{...t,snippet:l}:t}if(t.type==="markdown-heading"){let l=t.heading.trim().toLowerCase(),c=i.findIndex(d=>d.replace(/^#+\s*/,"").trim().toLowerCase()===l);return c>=0?{...t,line:c+1}:t}let s=t.snippet.trim(),a=s?i.findIndex(l=>l.includes(s)):-1;return a>=0?{...t,line:a+1}:t}async function lr(e,t,n){if(n?.assertActive(),!["pdf-page","media-time","markdown-line","markdown-heading","markdown-snippet"].includes(t.type))return"ok";let o=n??new Se;try{if(o.assertActive(),t.type==="pdf-page"){let s=o.pageCount(e);if(typeof s=="number"&&t.page>s)return"missing";let a=t.snippet?await o.page(e,t.page):null;return o.assertActive(),ur(t,s,a)}if(t.type==="media-time"){let s=o.mediaDuration();return typeof s=="number"&&t.seconds>s?"missing":"ok"}let i=await o.file(e);return o.assertActive(),fr(t,i)}finally{n||o.dispose()}}function ur(e,t,n){return typeof t=="number"&&e.page>t||e.snippet&&n!==null&&!Le(n).includes(Le(e.snippet))?"missing":"ok"}function fr(e,t,n=t?.replace(/\r\n?/g,`
`).split(`
`)??[]){if(!t)return"ok";if(e.type==="markdown-line")return e.line<=n.length?"ok":"missing";if(e.type==="markdown-heading"){let s=e.heading.trim().toLowerCase();return n.some(a=>a.replace(/^#+\s*/,"").trim().toLowerCase()===s)?"ok":"missing"}if(e.type!=="markdown-snippet")return"ok";let o=e.snippet.trim();if(!o)return"ok";let i=n.filter(s=>s.includes(o)).length;return i===0?"missing":i>1?"ambiguous":"ok"}async function Zt(e,t,n={}){let o=new Map,i=new Map,s=new Map;for(let a of e){t.assertActive();let l=n.path??a.url??a.path,c=a.anchor;if(c.type==="pdf-page"||c.type==="markdown-line"||c.type==="markdown-heading"||c.type==="markdown-snippet"){let d=c.type==="pdf-page"?c.page:void 0,u=JSON.stringify([l,d??"file"]),f=o.get(u)??{path:l,page:d,notes:[]};f.notes.push(a),o.set(u,f)}else{let d=c.type==="media-time"?t.mediaDuration():null;i.set(a,c.type==="media-time"&&typeof d=="number"&&c.seconds>d?"missing":"ok"),n.positions&&s.set(a,Pn(c,null))}}for(let a of o.values())if(t.assertActive(),a.page!==void 0){let l=t.pageCount(a.path),d=a.notes.some(u=>u.anchor.type==="pdf-page"&&!!u.anchor.snippet)&&(n.positions||typeof l!="number"||a.page<=l)?await t.page(a.path,a.page):null;t.assertActive();for(let u of a.notes)i.set(u,ur(u.anchor,l,d)),n.positions&&s.set(u,Pn(u.anchor,d))}else{let l=await t.file(a.path);t.assertActive();let c=l?.replace(/\r\n?/g,`
`).split(`
`)??[];for(let d of a.notes)i.set(d,fr(d.anchor,l,c)),n.positions&&s.set(d,Pn(d.anchor,l))}return t.assertActive(),{statuses:new Map(e.filter(a=>i.get(a)!=="ok").map(a=>[a.id,i.get(a)])),keys:n.positions?new Map(e.map(a=>[a.id,s.get(a)])):new Map}}function ht(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function pr(e){let t=await y.realm.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var re=e=>r.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?r.createElement("title",null,e.title):null,e.children),mr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),r.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),gr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M12 5v14M5 12h14"})),Xt=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),r.createElement("path",{d:"M2 12h20"})),Jt=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"11",cy:"11",r:"8"}),r.createElement("path",{d:"m21 21-4.3-4.3"})),hr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),Yt=e=>r.createElement(re,{...e},r.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),bt=e=>r.createElement(re,{...e},r.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),r.createElement("path",{d:"M4 22v-7"})),br=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"1"}),r.createElement("circle",{cx:"19",cy:"12",r:"1"}),r.createElement("circle",{cx:"5",cy:"12",r:"1"})),yr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M12 20h9"}),r.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),wr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h18"}),r.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),r.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),Dn=e=>r.createElement(re,{...e},r.createElement("path",{d:"M20 6 9 17l-5-5"})),vr=e=>r.createElement(re,{...e},r.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),Sr=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"8"}),r.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),r.createElement("circle",{cx:"12",cy:"12",r:"2"})),Xe=e=>r.createElement(re,{...e},r.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),r.createElement("path",{d:"M12 9v4M12 17h.01"})),Je=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),r.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),Ye=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),r.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var q={type:"string",maxLength:1048576},Qt={type:"array",items:q,maxItems:1e4},Oe=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),ze=(e,t={},n=[])=>Oe({type:{const:e},...t},["type",...n]),Mn={oneOf:[ze("none"),ze("pdf-page",{page:{type:"integer",minimum:1},snippet:q},["page"]),ze("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),ze("markdown-line",{line:{type:"integer",minimum:1},snippet:q},["line"]),ze("markdown-heading",{heading:q,line:{type:"integer",minimum:1}},["heading"]),ze("markdown-snippet",{snippet:q,line:{type:"integer",minimum:1}},["snippet"]),ze("web-selection",{snippet:q},["snippet"])]},Nr=Oe({id:q,path:q,url:q,pathHistory:Qt,note:q,flagged:{type:"boolean"},tags:Qt,anchor:Mn,fileKey:Oe({dev:{type:"number"},ino:{type:"number"}},["dev","ino"]),createdAt:q,updatedAt:q},["id","path","pathHistory","note","tags","anchor","createdAt","updatedAt"]),Us=Oe({note:{type:"string",minLength:1},tags:Qt,flagged:{type:"boolean"},anchor:Mn});function ke(e,t){throw Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}function me(e){return Object.assign(new Error(e),{code:"INVALID_INPUT",outcome:"not-applied",retryable:!1})}async function yt(e,t){try{return await Ae(e,t)}catch(n){throw Object.assign(n instanceof Error?n:new Error(String(n)),{outcome:"unknown",retryable:!1})}}function $e(e){if(!e||typeof e!="object"||Array.isArray(e))throw me("Expected an object.");return e}function Pe(e,t){if(typeof e!="string"||!e.trim())throw me(`Expected ${t}.`);return e.trim()}function Bs(e){let t=$e(e),n=i=>{let s=t[i];if(typeof s!="number"||!Number.isInteger(s)||s<1)throw me(`Invalid anchor ${i}.`);return s},o=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...o};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw me("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...o};case"markdown-heading":return{type:"markdown-heading",heading:Pe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:Pe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:Pe(t.snippet,"snippet")};default:throw me("Unsupported editable anchor.")}}function xr(e){let t=$e(e);if(Object.keys(t).some(o=>!["note","tags","flagged","anchor"].includes(o)))throw me("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=Pe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(o=>typeof o=="string"))throw me("Expected a list of tags.");n.tags=[...new Set(t.tags.map(o=>o.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw me("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=Bs(t.anchor)),n}function Er(e){return{...e,...e.tags?{tags:[...e.tags]}:{},...e.anchor?{anchor:{...e.anchor}}:{}}}async function Ir(e,t,n){n.assertActive();let o=new Se(n.api);try{let i=await qt(e,t,o);return n.assertActive(),i}finally{o.dispose()}}async function Ae(e,t=te()){t.assertActive();let n=await t.reader.load({kind:"ids",ids:[e]});t.assertActive();let o=n.find(i=>i.id===e);return o||ke("TARGET_NOT_FOUND","The SideNote no longer exists."),o}async function Ar(e,t){try{await e()}catch(n){throw n?.outcome!=="not-applied"&&t(),n}t()}async function kr(e,t,n){await ve(async()=>{n.assertActive(),t||ke("REVISION_CONFLICT","The SideNote state after this operation is unknown. Newer work was preserved.");let o=await Ae(e,n);JSON.stringify(o)!==JSON.stringify(t)&&ke("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved.")})}async function Ln(e,t,n,o,i=te()){let s=Er(t),a=o?{...o}:void 0,{previous:l,next:c}=await ve(async()=>{i.assertActive();let h=oe(await Ae(e,i));i.assertActive(),n!==void 0&&h.updatedAt!==n&&ke("REVISION_CONFLICT","This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let S=s.anchor??h.anchor;return s.anchor&&((h.url?mt():gt(h.path)).includes(S.type)||ke("INVALID_INPUT","This anchor does not apply to the SideNote subject."),S=await Ir(h.path,S,i),i.assertActive()),{previous:h,next:oe({...h,...s,anchor:S,updatedAt:new Date().toISOString()})}});await _n(e,c,l.updatedAt,a,i);let d=oe(await yt(e,i)),u=d,f=async h=>{let S=await ve(async()=>{i.assertActive();let I=await Ae(e,i);return JSON.stringify(I)!==JSON.stringify(u)&&ke("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved."),I});await _n(e,h,S.updatedAt,void 0,i),u=oe(await yt(e,i))};return{value:oe(d),revert:{label:"Edit SideNote",run:()=>f(l),reapply:()=>f(c)}}}async function en(e,t,n,o=!1){let i=te(e,n);i.assertActive();let s={path:t.path,url:t.url,anchor:{...t.anchor}};if(s.url){let a=await(o?e.links.open(s.url,{newTab:!0}):e.links.open(s.url));i.assertActive(),(a.status==="failed"||a.status==="unavailable")&&ke("TARGET_UNAVAILABLE",a.message??"Destination unavailable")}else{let a=await e.realm.fileInfo(s.path);i.assertActive(),a||ke("TARGET_NOT_FOUND","The annotation file no longer exists.");let l=s.anchor.type==="web-selection"?void 0:s.anchor;o?e.workspace.openFile(s.path,l,{newTab:!0}):e.workspace.openFile(s.path,l)}}function Tr(e){let t=!1,n=te(e,()=>{if(t)throw new Error("SideNotes commands are no longer active")}),o=async c=>{n.assertActive();let d={...c};if(d.id)return Ae(d.id,n);let u=d.path?await e.realm.fileInfo(d.path):{url:d.url};return n.assertActive(),u},i={schema:Oe({id:q},["id"]),parse:c=>({id:Pe($e(c).id,"SideNote id")}),fromCli:c=>({id:c[0]})},s={schema:Oe({id:q,newTab:{type:"boolean"}},["id"]),parse:c=>{let d=$e(c),u=Pe(d.id,"SideNote id");if(d.newTab!==void 0&&typeof d.newTab!="boolean")throw me("Expected newTab to be a boolean.");return d.newTab===!0?{id:u,newTab:!0}:{id:u}},fromCli:i.fromCli},a=c=>{let d={...c,outputSchema:c.id==="list"?{type:"array",items:Nr,maxItems:1e4}:Nr};return e.commands.register(d)},l=[a({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:Oe({path:q,url:q,query:q,flagged:{type:"boolean"}}),parse:c=>{let d=c==null?{}:$e(c);for(let u of["path","url","query"])if(d[u]!==void 0&&typeof d[u]!="string")throw me(`Expected ${u} text.`);if(d.flagged!==void 0&&typeof d.flagged!="boolean")throw me("Expected a boolean flag.");return{path:d.path,url:d.url,query:d.query,flagged:d.flagged}}},run:async c=>{n.assertActive();let d={...c},u=await n.reader.load();return n.assertActive(),u.filter(f=>(!d.path||f.path===d.path)&&(!d.url||f.url===ne(d.url))&&(d.flagged===void 0||!!f.flagged===d.flagged)&&(!d.query||`${f.note} ${f.tags.join(" ")}`.toLowerCase().includes(d.query.toLowerCase())))}}),a({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:i,run:({id:c})=>Ae(c,n)}),a({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"execute",input:s,run:async({id:c,newTab:d})=>{let u=await Ae(c,n);return await en(e,u,n.assertActive,d),n.assertActive(),await e.workspace.revealOwnPanel("right_sidebar"),n.assertActive(),u}}),a({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({path:q,url:q,note:{type:"string",minLength:1},tags:Qt,anchor:Mn},["note"]),parse:c=>{let d=$e(c),u=typeof d.path=="string"?d.path.trim():"",f=typeof d.url=="string"?d.url.trim():"";if(!!u==!!f)throw me("Provide exactly one file path or URL.");if(f&&!/^https?:\/\//i.test(f))throw me("Expected an HTTP or HTTPS URL.");return{path:u,url:f,...xr({note:Pe(d.note,"note text"),tags:d.tags,anchor:d.anchor})}}},run:async c=>{let d=Er(c),u=await ve(async()=>{if(n.assertActive(),d.path){let I=await e.realm.fileInfo(d.path);n.assertActive(),I||ke("TARGET_NOT_FOUND","The annotation file does not exist.")}let h=d.anchor??{type:"none"};(d.url?mt():gt(d.path)).includes(h.type)||ke("INVALID_INPUT","This anchor does not apply to the annotation subject.");let S=d.url?$t(ne(d.url),d.note,h,d.tags):zt(d.path,d.note,await Ir(d.path,h,n),d.tags);return n.assertActive(),S});await Ut(u,n);let f=oe(await yt(u.id,n));return{value:oe(u),revert:{label:"Create SideNote",run:async()=>{await kr(u.id,f,n),await Ar(()=>Wt(u.id,n),()=>{f=void 0})},reapply:async()=>{n.assertActive(),await Ut(u,n),f=oe(await yt(u.id,n))}}}},revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})}),a({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:Oe({id:q,values:Us,expectedUpdatedAt:q},["id","values"]),parse:c=>{let d=$e(c);return{id:Pe(d.id,"SideNote id"),values:xr(d.values),expectedUpdatedAt:d.expectedUpdatedAt===void 0?void 0:Pe(d.expectedUpdatedAt,"revision")}}},run:({id:c,values:d,expectedUpdatedAt:u})=>Ln(c,d,u,void 0,n),revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})}),a({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:i,run:async({id:c})=>{let d=await ve(async()=>{let f=oe(await Ae(c,n));return n.assertActive(),f});await Wt(c,n);let u;return{value:oe(d),revert:{label:"Delete SideNote",run:async()=>{n.assertActive(),await Ut(d,n),u=oe(await yt(c,n))},reapply:async()=>{await kr(c,u,n),await Ar(()=>Wt(c,n),()=>{u=void 0})}}}},revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})})];return()=>{t=!0,l.forEach(c=>c())}}var tn=({field:e,direction:t,options:n,onFieldChange:o,onDirectionChange:i,directionForField:s})=>{let[a,l]=r.useState(e),[c,d]=r.useState(t);return r.createElement("div",{className:"sidenote-sort-popover-body"},r.createElement("div",{className:"sidenote-sort-heading"},r.createElement("span",null,p("auto.90fd0e9a6276")),r.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(u=>r.createElement("button",{key:u,type:"button",className:`sidenote-sort-direction${c===u?" active":""}`,"aria-label":p(u==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":c===u,onClick:()=>{d(u),i(u)}},u==="asc"?r.createElement(Je,null):r.createElement(Ye,null))))),r.createElement("div",{className:"sidenote-sort-options"},n.map(u=>r.createElement("button",{key:u.value,type:"button",className:`sidenote-popover-option${a===u.value?" active":""}`,"aria-pressed":a===u.value,onClick:()=>{let f=a!==u.value;l(u.value),o(u.value);let h=f?s?.(u.value):void 0;h&&(d(h),i(h))}},r.createElement("span",null,u.label),r.createElement(Dn,{className:"sidenote-popover-check"})))))},Or=({value:e,options:t,onChange:n})=>{let[o,i]=r.useState(e);return r.createElement("div",{className:"sidenote-sort-options sidenote-filter-options"},t.map(s=>r.createElement("button",{key:s.value,type:"button",className:`sidenote-popover-option${o===s.value?" active":""}`,"aria-pressed":o===s.value,onClick:()=>{i(s.value),n(s.value)}},r.createElement("span",null,s.label),r.createElement(Dn,{className:"sidenote-popover-check"}))))},_r=({value:e,min:t,ariaLabel:n,onCommit:o})=>{let[i,s]=r.useState(String(e)),a=r.useRef(!1);r.useEffect(()=>{a.current||s(String(e))},[e]);let l=c=>{let d=Number(c),u=c.trim()===""||!Number.isFinite(d)?t:Math.max(t,d);s(String(u)),o(u)};return r.createElement("input",{type:"number",min:t,value:i,"aria-label":n,onFocus:()=>{a.current=!0},onChange:c=>{s(c.target.value);let d=Number(c.target.value);c.target.value.trim()!==""&&Number.isFinite(d)&&o(Math.max(t,d))},onBlur:c=>{a.current=!1,l(c.target.value)}})},Ws=({seconds:e,onCommit:t})=>{let[n,o]=r.useState(qe(e)),i=r.useRef(!1);r.useEffect(()=>{i.current||o(qe(e))},[e]);let s=()=>{let a=y.workspace.getMediaTime();a!==null&&(t(Math.max(0,a)),o(qe(a)))};return r.createElement("div",{className:"sidenote-time-field"},r.createElement("input",{value:n,placeholder:"0:00","aria-label":p("auto.19eabc961735"),onFocus:()=>{i.current=!0},onChange:a=>{o(a.target.value);let l=Rn(a.target.value);l!==null&&t(l)},onBlur:a=>{i.current=!1;let l=Rn(a.target.value),c=l===null?0:Math.max(0,l);t(c),o(qe(c))}}),r.createElement("button",{type:"button",className:"sidenote-time-capture",title:p("auto.528bfa4632ef"),onClick:s},p("auto.e3b82040565b")))},jn=({path:e,web:t=!1,anchor:n,onChange:o,validationMsg:i,invalid:s})=>{let a=t?mt():gt(e),{SelectField:l}=y.ui.settings,c=y.ui.ComboField,[d,u]=r.useState([]);return r.useEffect(()=>{if(n.type!=="markdown-heading"){u([]);return}pr(e).then(u)},[e,n.type]),a.length===1&&n.type==="none"?r.createElement(r.Fragment,null):r.createElement("div",{className:`sidenote-anchor-editor${s?" invalid":""}`},r.createElement("div",{className:"sidenote-select-wrap"},r.createElement(l,{value:n.type,onChange:f=>o(cr(f,n)),ariaLabel:p("auto.9c36384c83fb"),options:a.map(f=>({value:f,label:t&&f==="none"?p("auto.eeb742ed8cac"):p(ft[f])}))})),n.type==="web-selection"&&r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.98c236df91df"),"aria-label":p("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&r.createElement(r.Fragment,null,r.createElement(_r,{value:n.page,min:1,ariaLabel:p("auto.300721defdc9"),onCommit:f=>o({...n,page:f})}),r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:f=>o({...n,snippet:f.target.value||void 0}),placeholder:p("auto.2599b7d91cc5"),"aria-label":p("auto.1e149756b7c6")})),n.type==="media-time"&&r.createElement(Ws,{seconds:n.seconds,onCommit:f=>o({...n,seconds:f})}),n.type==="markdown-line"&&r.createElement(_r,{value:n.line,min:1,ariaLabel:p("auto.7555728cb6e5"),onCommit:f=>o({...n,line:f})}),n.type==="markdown-heading"&&r.createElement(c,{value:n.heading,onChange:f=>o({...n,heading:f}),options:d.map(f=>({value:f,label:f})),placeholder:p("auto.a3089b7fae27"),ariaLabel:p("auto.353e665a44c8")}),n.type==="markdown-snippet"&&r.createElement("input",{value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.2e5ce5a06a35"),"aria-label":p("auto.ef6127596cae")}),i&&r.createElement("p",{className:"sidenote-anchor-warning"},i))},Fn=({value:e,onChange:t,onSave:n,onCancel:o,autoFocus:i,disabled:s})=>r.createElement("textarea",{className:"sidenote-note-input",value:e,rows:4,autoFocus:i,disabled:s,"aria-label":p("sideNotes.field.note"),placeholder:p("sideNotes.field.note"),onChange:a=>t(a.target.value),onKeyDown:a=>{a.key==="Enter"&&y.ui.hasModKey(a)?(a.preventDefault(),n()):a.key==="Escape"&&o&&(a.preventDefault(),a.stopPropagation(),o())}}),nn=({note:e,onSaved:t,onClose:n})=>{let[o,i]=r.useState(e.note),[s,a]=r.useState(e.tags),[l,c]=r.useState(e.anchor),[d,u]=r.useState(!!e.flagged),[f,h]=r.useState(!1),[S,I]=r.useState(""),[x,k]=r.useState(),D={pluginId:"sideNotes",sourceId:"notes",itemId:e.id};r.useEffect(()=>{let O=!0;return y.documents.read({pluginId:"sideNotes",sourceId:"notes",itemId:e.id}).then($=>{O&&$&&k({expectedRevision:$.revision,realmGeneration:$.realmGeneration})}).catch($=>{O&&I($ instanceof Error?$.message:String($))}),()=>{O=!1}},[e.id]);let j=async()=>{if(!f)try{await y.documents.drafts.clear(D),n()}catch(O){I(O instanceof Error?O.message:String(O))}},_=async()=>{if(!(f||!o.trim())){h(!0),I("");try{if(!x)throw new Error(p("sideNotes.error.save"));let O=await Ln(e.id,{note:o,tags:s,anchor:l,flagged:d},e.updatedAt,x);y.undo.push({label:p("sideNotes.command.update"),undo:async()=>{try{return await O.revert.run(),{ok:!0}}catch($){return{ok:!1,message:String($)}}},redo:async()=>{try{return await O.revert.reapply(),{ok:!0}}catch($){return{ok:!1,message:String($)}}}}),t(O.value),await y.documents.drafts.clear(D),n()}catch(O){I(O instanceof Error?O.message:String(O))}finally{h(!1)}}},W=r.createElement("div",{className:"sidenote-edit-actions"},r.createElement("button",{className:"sidenote-cancel-btn",disabled:f,onClick:()=>{j()}},p("auto.77dfd2135f4d")),r.createElement("button",{className:"sidenote-save-btn",disabled:f||!o.trim()||!x,onClick:()=>{_()}},p("auto.efc007a393f6")));return r.createElement(y.ui.Modal,{title:p("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{j()},footer:W},r.createElement(Fn,{value:o,onChange:i,onSave:()=>{_()},disabled:f,autoFocus:!0}),r.createElement(y.ui.TagInput,{value:s,onChange:a}),r.createElement(jn,{path:e.path,web:!!e.url,anchor:l,onChange:c}),r.createElement("label",null,r.createElement("input",{type:"checkbox",checked:d,disabled:f,onChange:O=>u(O.target.checked)}),p("sideNotes.field.flagged")),S&&r.createElement("p",{role:"alert"},p("sideNotes.error.save")," ",S))},on=({noteId:e,setOpenId:t,onEdit:n,onDelete:o,disabled:i=!1})=>r.createElement("div",{className:"sidenote-menu-wrap"},r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.5430d0e5fb8c"),title:p("auto.6bf5da9c080b"),disabled:i,onClick:s=>{s.stopPropagation(),t(e),y.ui.openMenu([{label:p("auto.5301648dcf6b"),icon:r.createElement(yr,null),enabled:!i,onSelect:n},{label:p("auto.f6fdbe48dc54"),icon:r.createElement(wr,null),enabled:!i,danger:!0,onSelect:o}],{anchor:s.currentTarget,align:"end"}).finally(()=>t(null))}},r.createElement(br,null)));function Ks(e){let t=[],n=e.replace(/#(\S+)/g,(o,i)=>(t.push(i.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function rn(e,t,...n){let o=Ks(e);if(!o.tags.length&&!o.text)return!0;let i=t.map(s=>s.toLowerCase());for(let s of o.tags)if(!i.some(a=>a.startsWith(s)))return!1;return!(o.text&&!n.map(a=>a.toLowerCase()).some(a=>a.includes(o.text)))}var zn={type:"object",properties:{v:{type:"literal",value:1},search:{type:"string"},filterWarning:{type:"boolean"},showAll:{type:"boolean"},compact:{type:"boolean"},sourceType:{type:"string"},sortField:{type:"string"},sortDir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]},aware:{type:"boolean"},path:{type:"string"},url:{type:"string"},noteId:{type:"string"}},required:["v","search","filterWarning","sortField","sortDir"],additionalProperties:!1};function Ce(){return y.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function wt(e=Ce()){for(let t of e.listeners)t()}function Pr(e,t=Ce()){let n=t.listeners;return n.add(e),()=>{n.delete(e)}}function vt(e,t=Ce()){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...t.views.get(e)}}function fe(e,t,n){let o=()=>vt(e)[t]??n;return[r.useSyncExternalStore(Pr,o,o),s=>{Ce().views.set(e,{...vt(e),[t]:typeof s=="function"?s(o()):s}),wt()}]}function Qe(e,t){e?Ce().selected.set(t,e):Ce().selected.delete(t),wt()}function Cr(e,t){r.useEffect(()=>{let n=Ce(),o=vt("right_sidebar",n);if(o.path===e&&o.url===t)return;let i=n.views.get("right_sidebar"),s={...o,path:e,url:t};n.views.set("right_sidebar",s);let a=n.selected.get("right_sidebar"),l=a&&(a.path!==e||(a.url??"")!==t)?a:void 0;return l&&n.selected.delete("right_sidebar"),wt(n),()=>{let c=n.views.get("right_sidebar");if(!c||c.path!==e||c.url!==t)return;if(c===s&&!i)n.views.delete("right_sidebar");else if(c===s)n.views.set("right_sidebar",i);else{let f={...c};delete f.path,delete f.url,i&&"path"in i&&(f.path=i.path),i&&"url"in i&&(f.url=i.url),n.views.set("right_sidebar",f)}let d=vt("right_sidebar",n),u=n.selected.get("right_sidebar");(!u||u.path!==d.path||(u.url??"")!==d.url)&&(l?n.selected.set("right_sidebar",l):n.selected.delete("right_sidebar")),wt(n)}},[e,t])}function Gs(e,t=Ce()){let n=t.selected.get(e),o={...vt(e,t)};return o.path||delete o.path,{title:p("manifest.name"),view:o,...n?{item:{id:n.id,title:n.note.split(`
`)[0].slice(0,100),state:{...o,noteId:n.id}}}:{}}}function Rr(e){let t=Ce(),n=_e(),o=!1,i=()=>{if(o||!n.isActive())throw new Error("SideNotes surface is no longer active")},s=te(e,i),a=new Map,c=["left_sidebar","right_sidebar"].map(u=>xn(e,{id:`sideNotes.${u}`,surface:u,getSnapshot:()=>Gs(u,t),subscribe:f=>Pr(f,t),restore:async(f,h,S)=>{i(),f={...f};let I=S?.background===!0,x=(a.get(u)??0)+1;a.set(u,x);let k=()=>{if(i(),a.get(u)!==x)throw new Error("SideNotes surface restore was replaced")};if(f.v!==1)throw new Error("Unsupported SideNotes bookmark.");let D=typeof f.noteId=="string"?await Ae(f.noteId,s):null;k();let j=async W=>{let O=await e.realm.fileInfo(W);return k(),!!O};if(u==="right_sidebar"&&!D&&typeof f.path=="string"&&f.path&&!await j(f.path))throw new Error("The bookmarked file no longer exists.");if(D&&!D.url&&!await j(D.path))throw new Error("The bookmarked file no longer exists.");!I&&D?await en(e,D,k):!I&&u==="right_sidebar"&&(typeof f.path=="string"&&f.path||typeof f.url=="string"&&f.url)&&await en(e,{path:typeof f.path=="string"?f.path:"",url:typeof f.url=="string"?f.url:void 0,anchor:{type:"none"}},k),k();let _={v:1};for(let W of["search","path","url","sourceType"])typeof f[W]=="string"&&(_[W]=f[W]);for(let W of["showAll","compact","filterWarning","aware"])_[W]=f[W]===!0;_.sortField=["position","updated","created","title"].includes(String(f.sortField))?f.sortField:u==="left_sidebar"?"updated":"position",_.sortDir=f.sortDir==="desc"?"desc":"asc",t.views.set(u,_),D?t.selected.set(u,D):t.selected.delete(u),wt(t)}},{stateSchema:zn,itemStateSchema:{...zn,required:[...zn.required,"noteId"]},description:(f,h)=>typeof f.view.path=="string"&&f.view.path?f.view.path:p(h?"bookmark.item":"bookmark.view")})),d=0;return c.push(n.subscribe(()=>{if(o||!n.isActive())return;let u=++d,f=[...t.selected];f.length&&n.load({kind:"ids",ids:f.map(([,h])=>h.id)}).then(h=>{if(!(o||!n.isActive()||u!==d)){for(let[S,I]of f){if(t.selected.get(S)!==I)continue;let x=h.find(k=>k.id===I.id);x?t.selected.set(S,x):t.selected.delete(S)}for(let S of t.listeners)S()}}).catch(()=>{if(!o&&n.isActive()&&u===d)for(let h of t.listeners)h()})})),()=>{o=!0,c.forEach(u=>u())}}function sn(e,t,n=!1){if(e.url){n?y.links.open(e.url,{newTab:!0}):e.url!==t&&y.links.open(e.url);return}let o=e.anchor.type==="web-selection"?void 0:e.anchor;n?y.workspace.openFile(e.path,o,{newTab:!0}):y.workspace.openFile(e.path,o)}function Dr(e){return e.button!==1?!1:(e.preventDefault(),!0)}var Mr={position:"Position",created:"Created",updated:"Updated"},Hs={position:"asc",created:"desc",updated:"desc"},Lr=()=>{let e=Ko()??"",t=Go(),n=!e&&!!t?.url,o=n&&t?ne(t.url):"",i=n?"":e,s=r.useMemo(()=>Me(i),[i]),a=s==="pdf"||s==="video"||s==="audio"||s==="text",l=!!i||n,c=n?`web:${o}`:i;Cr(i,o);let{notes:d,setNotes:u,loading:f,error:h,reload:S}=He(n?{kind:"web",url:o}:i?{kind:"file",path:i}:{kind:"none"}),{isPending:I,setPending:x,pending:k}=Ho(),[D,j]=r.useState(""),[_,W]=r.useState([]),[O,$]=r.useState(()=>Cn(i)),[ie,ye]=r.useState(!1),[Ee,Ue]=r.useState(null),[Ne,Re]=r.useState(null),[v,C]=fe("right_sidebar","search",""),[U,K]=fe("right_sidebar","filterWarning",!1),[M,Y]=fe("right_sidebar","sortField",a?"position":"updated"),[ce,we]=fe("right_sidebar","sortDir",a?"asc":"desc"),Q=!a&&M==="position"?"updated":M,se=!a&&M==="position"?"desc":ce,[pe,Ie]=r.useState(new Map),[ge,he]=r.useState({}),[tt,an]=r.useState("ok"),[dn,b]=r.useState(!1),w=r.useRef(!1),[L,G]=r.useState(0),[T,ae]=r.useState(new Map),[le,Kr]=fe("right_sidebar","aware",!1),[cn,Bn]=r.useState({}),[Gr,Hr]=r.useState(0),[qr,Zr]=r.useState(0),nt=Ct();r.useEffect(()=>y.files.onAnchorInfoChanged(()=>G(m=>m+1)),[]),r.useEffect(()=>nt.subscribe(()=>Zr(m=>m+1)),[nt]);let Wn=r.useMemo(()=>{let m=Number(y.settings.get().mediaRangeSeconds);return Number.isFinite(m)&&m>=0?m:10},[Gr]);r.useEffect(()=>y.settings.subscribe(()=>Hr(m=>m+1)),[]);let ln=r.useCallback(()=>({pdfPages:i?y.workspace.getPdfVisiblePages(i):null,mediaSeconds:y.workspace.getMediaTime(),lineRange:i?y.workspace.getVisibleLineRange(i):null}),[i]);r.useEffect(()=>{if(!le||!i||!a){Bn({});return}let m=()=>Bn(ln());m();let g=y.files.onActivePositionChanged(m),P=s==="video"||s==="audio"?window.setInterval(m,1e3):void 0;return()=>{g(),P&&window.clearInterval(P)}},[le,i,s,a,ln]);let ot=r.useMemo(()=>n?d.filter(m=>m.url===o):i?d.filter(m=>m.path===i&&!m.url):[],[d,i,o,n]),Nt=r.useMemo(()=>{if(Q==="position"){let g=[...ot].sort((R,P)=>dr(R,P,T));return se==="desc"?g.reverse():g}let m=Q==="created"?"createdAt":"updatedAt";return[...ot].sort((g,R)=>{let P=g[m].localeCompare(R[m])||pt(g.anchor)-pt(R.anchor);return se==="asc"?P:-P})},[ot,Q,se,T]),xt=r.useMemo(()=>{let m=v.trim()?Nt.filter(g=>rn(v,g.tags??[],g.note)):Nt;return le&&a&&(m=m.filter(g=>sr(g.anchor,cn,Wn))),U&&(m=m.filter(g=>pe.has(g.id))),m},[Nt,v,U,pe,le,a,cn,Wn]),At=r.useRef([]),[Xr,Kn]=r.useState(0);r.useEffect(()=>{At.current=xt.map(m=>m.id),Kn(m=>m+1)},[i,Q,se,v,U,le,cn]);let kt=r.useMemo(()=>{let m=new Map(xt.map(P=>[P.id,P])),g=[];for(let P of At.current){let Z=m.get(P);Z&&g.push(Z)}let R=new Set(At.current);for(let P of xt)R.has(P.id)||g.push(P);return At.current=g.map(P=>P.id),g},[xt,Xr]),Jr=r.useMemo(()=>kt.map(m=>m.id),[kt]),Gn=Gt(r,{ids:Jr,estimate:140,pinned:[Ne?.id,Ee]});r.useEffect(()=>{$(n?{type:"none"}:Cn(i)),j(""),W([]),ye(!1),Y(a?"position":"updated"),we(a?"asc":"desc")},[c]),r.useEffect(()=>{let m=new Se,g=Q==="position";return Zt(ot,m,{path:i,positions:g}).then(({statuses:R,keys:P})=>{m.isActive()&&(Ie(R),he(Z=>({...Z,projection:void 0})),g&&(ae(P),Kn(Z=>Z+1)))}).catch(R=>{R instanceof xe||!m.isActive()||he(P=>({...P,projection:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[ot,i,Q,L]),r.useEffect(()=>{if(!ie||!i){he(g=>({...g,draft:void 0}));return}let m=new Se;return lr(i,O,m).then(g=>{m.isActive()&&(an(g),he(R=>({...R,draft:void 0})))}).catch(g=>{g instanceof xe||!m.isActive()||he(R=>({...R,draft:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[O,ie,i,L]);let Hn=async()=>{if(w.current)return;let m=D.trim();if(!(!m||!l)){w.current=!0,b(!0);try{let g=n?$t(o,m,O,_):zt(i,m,await qt(i,O),_);u(P=>[...P,g]),j(""),W([]),ye(!1),await To(g)||(u(P=>P.filter(Z=>Z.id!==g.id)),j(m),ye(!0))}finally{w.current=!1,b(!1)}}},qn=async(m,g)=>{if(I(m))return!1;let R=d.find(Z=>Z.id===m);if(!R)return!1;let P={...R,...g,updatedAt:new Date().toISOString()};x(m,!0),u(Z=>Z.map(H=>H.id===m?P:H));try{let Z=await Ge(m,P,R.updatedAt);return Z||u(H=>H.map(Zn=>Zn.id===m?R:Zn)),Z}finally{x(m,!1)}},Yr=async m=>{if(I(m))return;let g=d.find(R=>R.id===m);if(g){x(m,!0),u(R=>R.filter(P=>P.id!==m));try{await Bt(m)||u(P=>P.some(Z=>Z.id===m)?P:[...P,g])}finally{x(m,!1)}}},Qr=async m=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Yr(m)},ei=m=>Re(m);r.useEffect(()=>{let m=nt.get();if(!m)return;let g=R=>{nt.consume(m),j(""),W([]),$(R),ye(!0)};if(m.kind==="web"){n&&ne(m.url??"")===o&&g({type:"web-selection",snippet:m.snippet});return}m.kind==="file"&&m.path===i&&!n&&g({type:"pdf-page",page:m.page??1,snippet:m.snippet})},[i,o,n,qr,nt]);let ti=(a?["position","created","updated"]:["updated","created"]).map(m=>({value:m,label:Mr[m]})),ni=m=>{y.ui.openPopover(()=>r.createElement(tn,{field:Q,direction:se,options:ti,onFieldChange:g=>{Y(g)},onDirectionChange:we,directionForField:g=>Hs[g]}),{anchor:m,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})};return r.createElement("div",{className:"sidenotes-panel"},r.createElement("header",{className:"panel-header sidenotes-header"},r.createElement("div",{className:"panel-header-label sidenotes-title"},n?r.createElement(Xt,null):r.createElement(mr,null),r.createElement("span",{className:"panel-title",title:n?o:void 0},n?Rt(o):p("auto.7d660ae8b46e"))),r.createElement("div",{className:"sidenotes-header-actions"},a&&r.createElement("button",{className:`sidenote-icon-btn${le?" active":""}`,"aria-label":p("auto.580535153931"),title:le?p("auto.df4a8bd943cc"):p("auto.7b9b8574c69b"),onClick:()=>Kr(m=>!m)},r.createElement(Sr,null)),pe.size>0&&r.createElement("button",{className:`sidenote-icon-btn${U?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>K(m=>!m)},r.createElement(Xe,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${se==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${Mr[Q]}`,"aria-haspopup":"dialog",onClick:m=>ni(m.currentTarget)},se==="asc"?r.createElement(Je,null):r.createElement(Ye,null)),r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.7a7e81b96c3a"),title:p("auto.d48a73614c7f"),onClick:()=>{let m=!ie;ye(m),m?$(n?{type:"none"}:ar(i,ln())):j("")},disabled:!l},r.createElement(gr,null)))),l?r.createElement(r.Fragment,null,r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Jt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:v,onChange:m=>C(m.target.value),placeholder:p("auto.49cd864445a9"),"aria-label":p("auto.f1b5671b118f")}),v&&r.createElement("button",{className:"search-field-action",onClick:()=>C(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Yt,null)))),ie&&r.createElement("div",{className:"sidenote-create"},r.createElement(Fn,{value:D,onChange:j,onSave:()=>{Hn()},onCancel:()=>{ye(!1),j(""),W([])},autoFocus:!0}),r.createElement(y.ui.TagInput,{value:_,onChange:W}),r.createElement(jn,{path:i,web:n,anchor:O,onChange:$,invalid:!n&&tt!=="ok",validationMsg:!n&&tt!=="ok"?ht(O,tt):void 0}),r.createElement("div",{className:"sidenote-create-actions"},r.createElement("button",{className:"sidenote-save-btn",onClick:()=>{Hn()},disabled:!D.trim()||dn},p("auto.757092db3c4b")),Nt.length>0&&r.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{ye(!1),j(""),W([])}},p("auto.77dfd2135f4d")))),r.createElement("div",{className:"sidenote-list",ref:Gn.ref},(h||ge.projection||ge.draft)&&r.createElement("div",{role:"alert"},h||ge.projection||ge.draft," ",r.createElement("button",{type:"button",onClick:()=>{S(),G(m=>m+1)}},p("sideNotes.action.retry"))),f?r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.33ce417454bf"))):kt.length?Gn.render(m=>{let g=kt[m],R=pe.get(g.id),P=R!==void 0,Z=k.has(g.id);return r.createElement("article",{key:g.id,"data-visible-key":g.id,"data-visible-index":m,className:`sidenote-card${g.flagged?" flagged":""}${P?" invalid":""}`,onClick:H=>{Qe(g,"right_sidebar"),sn(g,o,y.ui.hasModKey(H))},onAuxClick:H=>{Dr(H)&&sn(g,o,!0)}},r.createElement("div",{className:"sidenote-card-meta",onClick:H=>H.stopPropagation(),onAuxClick:H=>H.stopPropagation()},g.anchor.type!=="none"&&r.createElement("button",{className:"sidenote-anchor-badge",onClick:H=>sn(g,o,y.ui.hasModKey(H)),onAuxClick:H=>{Dr(H)&&sn(g,o,!0)},title:g.url?p("auto.9ee309dcedc9"):`${g.path} \xB7 ${Ze(g.anchor)}`},!g.url&&g.anchor.type==="markdown-heading"?g.path.split("/").pop():Ze(g.anchor)),r.createElement("div",{className:"sidenote-card-btns"},P&&R&&r.createElement(Xe,{className:"sidenote-warning-icon",title:ht(g.anchor,R)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${g.flagged?" active":""}`,"aria-label":g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),disabled:Z,onClick:()=>{qn(g.id,{flagged:!g.flagged})}},r.createElement(bt,null)),r.createElement(on,{noteId:g.id,openId:Ee,setOpenId:Ue,onEdit:()=>ei(g),onDelete:()=>{Qr(g.id)},disabled:Z}))),r.createElement(r.Fragment,null,r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown",value:g.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:g.id},sourcePath:g.path||void 0},onChange:H=>{qn(g.id,{note:H})}}),g.tags&&g.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:H=>H.stopPropagation()},g.tags.map(H=>r.createElement("span",{key:H,className:"sidenote-tag-view-pill"},"#",H)))))}):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,v?p("auto.b690846c83ff"):le&&a?p("auto.8f4043581269"):n?p("auto.8c8077ac2313"):p("auto.31b291dd535e"))))):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.34f6835f5ddf"))),Ne&&r.createElement(nn,{key:Ne.id,note:Ne,onSaved:m=>{u(g=>g.map(R=>R.id===m.id?m:R)),Qe(m,"right_sidebar")},onClose:()=>Re(null)}))};var qs=[".md",".mp3",".mp4",".pdf"];function jr(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function Fr(e){return/^\.[^./\\\s]+$/.test(e)}function St(e){let n=(Array.isArray(e)?e:qs).flatMap(o=>{if(typeof o!="string")return[];let i=jr(o);return Fr(i)?[dt(`file${i}`)]:[]});return[...new Set(n)]}var zr=()=>{let[e,t]=r.useState(()=>y.settings.get());r.useEffect(()=>y.settings.subscribe(()=>t(y.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,o=St(e.filterTypes),{ChipsField:i,NumberField:s,Row:a,Section:l}=y.ui.settings,c=(d,u)=>{t(f=>({...f,[d]:u})),y.settings.set(d,u)};return r.createElement(l,null,r.createElement(a,{title:p("plugin.sideNotes.field.awareRange"),description:p("auto.204e47f6d7a2")},r.createElement(s,{value:n,step:1,ariaLabel:p("plugin.sideNotes.field.awareRange"),onChange:d=>{d!=null&&t(u=>({...u,mediaRangeSeconds:d}))},onCommit:d=>{d!=null&&c("mediaRangeSeconds",d)}})),r.createElement(a,{className:"sidenotes-filter-types-row",title:p("plugin.sideNotes.field.filterTypes"),description:p("plugin.sideNotes.field.filterTypesDesc")},r.createElement(i,{className:"sidenotes-filter-types-editor",items:o,onChange:d=>c("filterTypes",St(d)),normalize:jr,validate:d=>Fr(d),placeholder:".png",ariaLabel:p("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var $r={updated:"Updated",created:"Created",name:"Name"},Ve="all",$n="web",Vn="no-extension";function et(e){return e.url?Rt(e.url):e.path.split("/").pop()??e.path}function Vr(e){return e.url?$n:dt(e.path)||Vn}function Ur(e,t=!1){if(e.url){t?y.links.open(e.url,{newTab:!0}):y.links.open(e.url);return}let n=e.anchor.type==="web-selection"?void 0:e.anchor;t?y.workspace.openFile(e.path,n,{newTab:!0}):y.workspace.openFile(e.path,n)}function Zs(e,t,n){if(n==="name"){let s=et(e).localeCompare(et(t),void 0,{sensitivity:"base"});return s!==0?s:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let o=n==="created"?"createdAt":"updatedAt",i=e[o].localeCompare(t[o]);return i!==0?i:et(e).localeCompare(et(t),void 0,{sensitivity:"base"})}var Br=()=>{let{notes:e,setNotes:t,loading:n,error:o,reload:i}=He(),[s,a]=fe("left_sidebar","search",""),[l,c]=fe("left_sidebar","showAll",!1),[d,u]=fe("left_sidebar","sortField","updated"),[f,h]=fe("left_sidebar","sortDir","desc"),[S,I]=r.useState(new Map),[x,k]=r.useState(null),[D,j]=fe("left_sidebar","filterWarning",!1),[_,W]=fe("left_sidebar","sourceType",Ve),[O,$]=fe("left_sidebar","compact",!1),[ie,ye]=r.useState(null),[Ee,Ue]=r.useState(null),[Ne,Re]=r.useState(0),[v,C]=r.useState(()=>{let b=y.settings.get();return St(b.filterTypes)});r.useEffect(()=>y.files.onAnchorInfoChanged(()=>Re(b=>b+1)),[]),r.useEffect(()=>y.settings.subscribe(()=>{let b=y.settings.get();C(St(b.filterTypes))}),[]);let U=r.useMemo(()=>{let b=new Set(e.map(Vr)),w=[...b].filter(L=>L.startsWith(".")&&!v.includes(L)).sort();return[{value:Ve,label:p("auto.6a72085653e4")},...v.map(L=>({value:L,label:L})),...w.map(L=>({value:L,label:L})),...b.has(Vn)?[{value:Vn,label:p("sideNotes.filter.noExtension")}]:[],...b.has($n)?[{value:$n,label:p("sideNotes.filter.web")}]:[]]},[e,v]);r.useEffect(()=>{n||o||U.some(b=>b.value===_)||W(Ve)},[_,U,W,n,o]);let K=r.useMemo(()=>{let b=l?e:e.filter(G=>G.flagged),w=_===Ve?b:b.filter(G=>Vr(G)===_);return[...s.trim()?w.filter(G=>rn(s,G.tags??[],G.note,G.url??G.path)):w].sort((G,T)=>{let ae=Zs(G,T,d);return f==="asc"?ae:-ae})},[e,s,l,_,d,f]),M=r.useRef([]),[Y,ce]=r.useState(0);r.useEffect(()=>{M.current=K.map(b=>b.id),ce(b=>b+1)},[l,d,f,s,_]);let we=r.useRef(!1);r.useEffect(()=>{n||we.current||(we.current=!0,M.current=K.map(b=>b.id),ce(b=>b+1))},[n]);let Q=r.useMemo(()=>{let b=D?K.filter(T=>S.has(T.id)):K,w=new Map(b.map(T=>[T.id,T])),L=[];for(let T of M.current){let ae=w.get(T);ae&&L.push(ae)}let G=new Set(M.current);for(let T of b)G.has(T.id)||L.push(T);return M.current=L.map(T=>T.id),L},[K,Y,D,S]),se=r.useMemo(()=>Q.map(b=>b.id),[Q]),pe=Gt(r,{ids:se,estimate:O?64:140,pinned:[Ee?.id,ie],layoutKey:O});r.useEffect(()=>{let b=new Se;return Zt(K,b).then(({statuses:w})=>{b.isActive()&&(I(w),k(null))}).catch(w=>{w instanceof xe||!b.isActive()||k(p("sideNotes.error.load"))}).finally(()=>b.dispose()),()=>b.dispose()},[K,Ne]);let Ie=async(b,w)=>{let L=e.find(ae=>ae.id===b);if(!L)return;let G={...L,...w,updatedAt:new Date().toISOString()};t(ae=>ae.map(le=>le.id===b?G:le)),await Ge(b,G,L.updatedAt)||t(ae=>ae.map(le=>le.id===b?L:le))},ge=async b=>{let w=e;t(G=>G.filter(T=>T.id!==b)),await Bt(b)||t(w)},he=async b=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await ge(b)},tt=b=>Ue(b),an=b=>{y.ui.openPopover(()=>r.createElement(tn,{field:d,direction:f,options:Object.entries($r).map(([w,L])=>({value:w,label:L})),onFieldChange:w=>u(w),onDirectionChange:h}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})},dn=b=>{y.ui.openPopover(()=>r.createElement(Or,{value:_,options:U,onChange:W}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.0aafb761a83c")})};return r.createElement("div",{className:"panel"},r.createElement("div",{className:"panel-header"},r.createElement("span",{className:"panel-title"},p("auto.7d660ae8b46e")),r.createElement("div",{className:"sidenotes-header-actions"},r.createElement("button",{className:`sidenote-icon-btn${l?"":" active"}`,"aria-label":l?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),title:l?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),"aria-pressed":!l,onClick:()=>c(b=>!b)},r.createElement(bt,null)),S.size>0&&r.createElement("button",{className:`sidenote-icon-btn${D?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>j(b=>!b)},r.createElement(Xe,null)),r.createElement("button",{className:`sidenote-icon-btn${O?" active":""}`,"aria-label":p("auto.77f9b062ce1b"),title:O?p("auto.d2f76731e1e1"):p("auto.e3719eae891e"),onClick:()=>$(b=>!b)},r.createElement(vr,null)),r.createElement("button",{className:`sidenote-icon-btn${_!==Ve?" active":""}`,"aria-label":p("auto.0aafb761a83c"),title:`${p("auto.0aafb761a83c")} \xB7 ${U.find(b=>b.value===_)?.label??p("auto.6a72085653e4")}`,"aria-haspopup":"dialog","aria-pressed":_!==Ve,onClick:b=>dn(b.currentTarget)},r.createElement(hr,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${f==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${$r[d]}`,"aria-haspopup":"dialog",onClick:b=>an(b.currentTarget)},f==="asc"?r.createElement(Je,null):r.createElement(Ye,null)))),r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Jt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:s,onChange:b=>a(b.target.value),placeholder:l?p("auto.49cd864445a9"):p("auto.7c0451dde956"),"aria-label":p("auto.ff4f3043a289")}),s&&r.createElement("button",{className:"search-field-action",onClick:()=>a(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Yt,null)))),r.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},(o||x)&&r.createElement("div",{role:"alert"},o||x," ",r.createElement("button",{type:"button",onClick:()=>{i(),Re(b=>b+1)}},p("sideNotes.action.retry"))),n?r.createElement("div",{className:"tree-empty"},p("auto.33ce417454bf")):Q.length===0?r.createElement("div",{className:"tree-empty"},s||_!==Ve?p("auto.b690846c83ff"):l?p("auto.d2a1e72bc320"):p("auto.f5ca64c680ee")):r.createElement("div",{className:"flagged-notes-list",ref:pe.ref},pe.render(b=>{let w=Q[b],L=S.get(w.id),G=L!==void 0;return r.createElement("div",{key:w.id,"data-visible-key":w.id,"data-visible-index":b,className:`flagged-note-card${w.flagged?" flagged":""}${G?" invalid":""}${O?" compact":""}`,onClick:T=>{Qe(w,"left_sidebar"),Ur(w,y.ui.hasModKey(T))},onAuxClick:T=>{T.button===1&&(T.preventDefault(),Ur(w,!0))},title:w.url??w.path},r.createElement("div",{className:"flagged-note-header"},r.createElement("div",{className:"flagged-note-meta-row"},r.createElement("div",{className:"flagged-note-meta-left"},w.url?w.anchor.type!=="none"&&r.createElement("span",{className:"flagged-note-anchor"},Ze(w.anchor)):r.createElement("span",{className:"flagged-note-anchor",title:`${w.path}${w.anchor.type!=="none"?` \xB7 ${Ze(w.anchor)}`:""}`},et(w))),r.createElement("div",{className:"flagged-note-meta-right"},G&&L&&r.createElement(Xe,{className:"sidenote-warning-icon",title:ht(w.anchor,L)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${w.flagged?" active":""}`,"aria-label":w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),onClick:T=>{T.stopPropagation(),Ie(w.id,{flagged:!w.flagged})},onAuxClick:T=>T.stopPropagation()},r.createElement(bt,null)),r.createElement(on,{noteId:w.id,openId:ie,setOpenId:ye,onEdit:()=>tt(w),onDelete:()=>{he(w.id)}}))),w.url&&r.createElement("span",{className:"flagged-note-file"},r.createElement(Xt,{className:"flagged-note-web-icon"}),et(w))),O&&(()=>{let T=w.note.split(`
`).find(ae=>ae.trim())?.replace(/^#+\s*/,"").trim();return T?r.createElement("p",{className:"flagged-note-preview"},T):null})(),r.createElement(r.Fragment,null,!O&&r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:w.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:w.id},sourcePath:w.path||void 0},onChange:T=>{Ie(w.id,{note:T})}}),!O&&w.tags&&w.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:T=>T.stopPropagation(),onAuxClick:T=>T.stopPropagation()},w.tags.map(T=>r.createElement("span",{key:T,className:"sidenote-tag-view-pill"},"#",T)))))}))),Ee&&r.createElement(nn,{key:Ee.id,note:Ee,onSaved:b=>{t(w=>w.map(L=>L.id===b.id?b:L)),Qe(b,"left_sidebar")},onClose:()=>Ue(null)}))};var Un="notes-sidenotes-styles",Xs=`
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

`;function Wr(){let e=document.getElementById(Un);return e||(e=document.createElement("style"),e.id=Un,document.head.appendChild(e)),e.textContent=Xs,()=>{document.getElementById(Un)===e&&e.remove()}}function Js(e){Wo(e),wo(e);let t=_e(),n=!1,o=te(e,()=>{if(n)throw new Error("SideNotes registration is no longer active")}),i=Wr(),s=Tr(e),a=Rr(e),l=e.files.onRenamed(({oldPath:k,newPath:D})=>{o.isActive()&&Po(k,D,o).catch(j=>console.error("SideNotes could not retarget notes",j))}),c=e.files.onLineShift(({path:k,fromLine:D,delta:j})=>{o.isActive()&&Co(k,D,j,o).catch(_=>console.error("SideNotes could not shift anchors",_))}),d=Ct(),u=async k=>{if(!(!k||!o.isActive())){if(k={...k},k.surface==="web"){if(!k.url||!k.text.trim())return;d.publish({kind:"web",url:k.url,snippet:k.text.trim().slice(0,200)})}else{if(!k.path||!k.page)return;let D=await e.workspace.getPdfPageText(k.path,k.page).catch(()=>null);if(!o.isActive())return;let j=Qo({path:k.path,page:k.page,text:k.text},D);if(!j)return;d.publish(j)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(yn,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:u}),h={id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"execute",outputSchema:{type:"null"},input:{schema:{type:"object",properties:{},additionalProperties:!1},parse:()=>{}},run:async()=>{if(!o.isActive())return null;let k=e.getState().activePath,D=k&&Me(k)==="pdf"?er(k,e.workspace.getTextSelection()):null;return D&&await u({surface:"pdf",...D}),null}},S=e.commands.register(h);e.registerView("sideNotes.panel",Lr),e.registerView("sideNotes.flagged",Br),e.registerView("sideNotes.settings",zr);let I=Zo(),x=Jo(e);return()=>{n=!0,t.dispose(),l(),s(),a(),c(),f(),S(),I(),x(),i()}}var Ys={register:Js},ku=Ys;export{ku as default,Js as register};
