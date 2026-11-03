var ni=Object.defineProperty;var oi=(e,t,n)=>t in e?ni(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var V=(e,t,n)=>oi(e,typeof t!="symbol"?t+"":t,n);var kt="valley";var Qs=`.${kt}`,ea=`app.${kt}`;function ri(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var ii=/^[a-zA-Z]:/;function Xn(e){if(typeof e!="string")return"";let t=ri(e);return!t||t==="."||ii.test(t)||t.split("/").some(n=>n==="..")?"":t}var X=`.${kt}`,si="plugins",ot=`${X}/${si}`,Et=`${ot}/packages`,oa=`${Et}/core`,ra=`${Et}/github`,ia=`${Et}/local`,sa=`${Et}/community`,aa=`${ot}/community.json`,da=`${ot}/data`;var ca=`${ot}/enabled.json`,la=`${ot}/sources.json`,ua=`${X}/state`,Y=`${X}/settings`,Zn=`${X}/data`,ln=`${X}/recovery`;var un=`${X}/accounts`,Ue=`${X}/ai`,fa=`${Ue}/connections.json`,pa=`${Ue}/defaults.json`,ma=`${Ue}/budgets.json`,ga=`${Ue}/usage.sqlite`,ha=`${Ue}/security/guards.json`,ba=`${Ue}/security/activity.sqlite`,ya=`${un}/providers`,wa=`${un}/providers.lock.json`,ai=`${X}/trash`,va=`${ai}/items`,fn=`${X}/cache`,Sa=`${fn}/accounts`,di=`${fn}/search`,Na=`${fn}/providers`;var xa=`${di}/index.jsonl`,Aa=`${ln}/drafts`,ka=`${ln}/transactions`,Ea=`${ln}/retired`;var Re="design",ci="themes",Yn=`${X}/${Re}/${ci}`,Ia=`${Yn}/local`,Ta=`${Yn}/community`,_a={app:`${Y}/app.json`,appearance:`${X}/${Re}/appearance.json`,"icon-rail":`${X}/${Re}/icon-rail.json`,"footer-rail":`${X}/${Re}/footer-rail.json`,"plugin-startup":`${X}/${Re}/right-sidebar-startup.json`,"new-tab":`${X}/${Re}/new-tab.json`,pallette:`${X}/${Re}/palette.json`,group:`${Zn}/groups.json`,units:`${Zn}/units.json`,metadata:`${Y}/file-viewers.json`,notification:`${Y}/notification.json`,"notification-settings":`${Y}/notification-settings.json`,preferences:`${Y}/preferences.json`,"link-actions":`${Y}/link-actions.json`,markdown:`${Y}/markdown.json`,editor:`${Y}/editor.json`,"editor-vim":`${Y}/editor-vim.json`,"markdown-todo":`${Y}/markdown-todo.json`,"markdown-codeblocks":`${Y}/markdown-codeblocks.json`,"markdown-template":`${Y}/markdown-template.json`,"markdown-embeed":`${Y}/markdown-embeed.json`,files:`${Y}/file.json`,"file-sorter":`${Y}/file-sorter.json`,"file-sym-link":`${Y}/file-sym-link.json`,search:`${Y}/search.json`,"search-tag":`${Y}/search-tag.json`,"search-content":`${Y}/search-content.json`,design:`${X}/${Re}/appearance.json`,accounts:`${un}/connections.json`};var li=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Jn=16384;var Qn=new Set(["__proto__","prototype","constructor"]);function eo(e){let t=0;for(let n of e){let o=n.codePointAt(0);t+=o<=127?1:o<=2047?2:o<=65535?3:4}return t}function It(e){let t=new WeakSet,n=0,o=(s,a)=>{if(++n>8192||a>32)throw new Error("Bookmark state is too complex");if(s===null||typeof s=="boolean")return s;if(typeof s=="string"){if(eo(s)>Jn)throw new Error("Bookmark state is too large");return s}if(typeof s=="number")return Number.isFinite(s)?Object.is(s,-0)?0:s:void 0;if(!s||typeof s!="object"||t.has(s))return;let l=Array.isArray(s),c=Object.getPrototypeOf(s);if(!(!l&&c!==null&&(Object.getPrototypeOf(c)!==null||typeof Object.getOwnPropertyDescriptor(c,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(c,"constructor").value)!=="function Object() { [native code] }"))){t.add(s);try{let d=Reflect.ownKeys(s);if(d.length+n>8192||d.some(h=>typeof h=="string"&&Qn.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(s);if(l){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(S,I)=>{let x=u[String(I)];return x&&"value"in x?o(x.value,a+1)??null:null})}let f={};for(let h of Object.keys(u).sort()){if(Qn.has(h))throw new Error("Invalid bookmark state key");let S=u[h];if(!S.enumerable||!("value"in S)){n++;continue}let I=o(S.value,a+1);I!==void 0&&(f[h]=I)}return f}finally{t.delete(s)}}},i=o(e,0);if(!i||typeof i!="object"||Array.isArray(i))throw new Error("Invalid bookmark state");if(eo(JSON.stringify(i))>Jn)throw new Error("Bookmark state is too large");return i}function oo(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Xn(e);if(!t)throw new Error("Invalid bookmark path");return t}function pn(e,t,n){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${n}`);return e.trim().normalize("NFC")}function to(e){let n=(e.target?["path","filePath","file"].flatMap(i=>typeof e.target.state[i]=="string"?[e.target.state[i]]:[]):[e.folderPath]).join(" "),o=/\.[^./]+$/.exec(n)?.[0]??"";return[e.title,e.description,n,o,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function mn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!li.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let n=It(t.state);return n.path!==void 0&&(n.path=oo(n.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:n,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var ui=/^[A-Za-z0-9_-]{1,64}$/;function no(e,t){if(typeof e!="string"||!ui.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function ro(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,n=pn(t.title,512,"title"),o={...t.description===void 0?{}:{description:pn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:pn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},i=t.group===void 0?{}:{group:no(t.group,"group")};if(t.groupId!==void 0){let l=no(t.groupId,"group id");if(!n||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:n,groupId:l,...o}}if(t.target!==void 0){let l={folderPath:"",title:n,target:mn(t.target),...o,...i};return{...l,searchText:to(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let a={folderPath:oo(t.folderPath),title:n,...o,...i};return{...a,searchText:to(a)}}function Le(e){let t=0,n=s=>!!(s&&typeof s=="object"&&!Array.isArray(s)),o=s=>s.length>0&&s.length<=256&&!["__proto__","prototype","constructor"].includes(s),i=(s,a)=>{if(++t>2048||a>32||!n(s)||typeof s.type!="string")return!1;let l=(...c)=>Object.keys(s).every(d=>d==="type"||c.includes(d));return["unknown","null","boolean","number","string","function"].includes(s.type)?l():s.type==="literal"?l("value")&&(s.value===null||["string","boolean"].includes(typeof s.value)||typeof s.value=="number"&&Number.isFinite(s.value)):s.type==="array"?l("items","maxItems")&&(s.maxItems===void 0||Number.isSafeInteger(s.maxItems)&&s.maxItems>=0&&s.maxItems<=1e5)&&i(s.items,a+1):s.type==="tuple"?l("items","minItems")&&Array.isArray(s.items)&&s.items.length<=64&&(s.minItems===void 0||Number.isSafeInteger(s.minItems)&&s.minItems>=0&&s.minItems<=s.items.length)&&s.items.every(c=>i(c,a+1)):s.type==="union"?l("anyOf")&&Array.isArray(s.anyOf)&&s.anyOf.length>0&&s.anyOf.length<=32&&s.anyOf.every(c=>i(c,a+1)):s.type==="object"?l("properties","required","additionalProperties")&&n(s.properties)&&Object.entries(s.properties).every(([c,d])=>o(c)&&i(d,a+1))&&(s.required===void 0||Array.isArray(s.required)&&s.required.every(c=>typeof c=="string"&&Object.hasOwn(s.properties,c)))&&(s.additionalProperties===void 0||typeof s.additionalProperties=="boolean"):!1};return i(e,0)}function Tt(e,t,n=1e5){let o=Math.max(1,Math.min(1e6,Math.floor(n))),i=new WeakSet,s=(a,l,c)=>{if(--o<0||c>64)return!1;if(a.type==="unknown")return!0;if(a.type==="null")return l===null;if(a.type==="literal")return l===a.value;if(a.type==="union")return a.anyOf.some(d=>s(d,l,c+1));if(a.type==="number")return typeof l=="number"&&Number.isFinite(l);if(a.type==="string"||a.type==="boolean"||a.type==="function")return typeof l===a.type;if(!l||typeof l!="object"||i.has(l))return!1;i.add(l);try{return a.type==="array"?Array.isArray(l)&&l.length<=(a.maxItems??1e5)&&l.every(d=>s(a.items,d,c+1)):a.type==="tuple"?Array.isArray(l)&&l.length>=(a.minItems??a.items.length)&&l.length<=a.items.length&&l.every((d,u)=>s(a.items[u],d,c+1)):a.type==="object"?Array.isArray(l)||a.required?.some(d=>!Object.hasOwn(l,d))?!1:Object.entries(l).every(([d,u])=>Object.hasOwn(a.properties,d)?s(a.properties[d],u,c+1):a.additionalProperties===!0):!1}finally{i.delete(l)}};return s(e,t,0)}var fi=new Map;function z(e,t,n,o,i,s,a,l,c="owner"){let d=Object.freeze({id:e,kind:t,version:n,cardinality:o,validate:i,identities:s,identityScope:c,serviceCalls:a,serviceMetadata:l});return fi.set(`${t}:${e}@${n}`,d),d}var hn=256;var A=e=>!!e&&typeof e=="object"&&!Array.isArray(e),B=(e,t)=>typeof e[t]=="function",je=e=>e===void 0,Be=e=>typeof e=="boolean",E=e=>typeof e=="string",de=e=>e===void 0||E(e),pi=e=>e===void 0||typeof e=="number",mi=e=>e===void 0||typeof e=="boolean",F=(e,t)=>e.length===t.length&&t.every((n,o)=>n(e[o])),ee=e=>A(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),io=e=>A(e),ao=e=>A(e)&&E(e.id)&&E(e.title)&&E(e.date)&&(e.documentRef===void 0||A(e.documentRef)&&E(e.documentRef.pluginId)&&E(e.documentRef.sourceId)&&E(e.documentRef.itemId)),gi=e=>A(e)&&E(e.date)&&de(e.startTime)&&de(e.endTime)&&de(e.sourceId)&&de(e.itemId),hi=e=>A(e)&&E(e.url)&&de(e.title)&&mi(e.newTab),bi=e=>A(e)&&E(e.query),co=e=>A(e)&&E(e.name)&&de(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),yi=e=>Array.isArray(e)&&e.every(co),wi=e=>e===null||co(e),vi=e=>e===void 0||A(e)&&de(e.approvalToken)&&(e.cancellation===void 0||A(e.cancellation)),Si=e=>typeof e=="string"||A(e)&&typeof e.text=="string",Ni=e=>A(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&A(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&de(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),lo=e=>A(e)&&E(e.id)&&E(e.label)&&de(e.labelKey)&&de(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(lo)),uo={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(ao)},create:{args:e=>F(e,[E,io]),result:Be},update:{args:e=>F(e,[E,io]),result:Be},remove:{args:e=>F(e,[E]),result:Be},open:{args:e=>F(e,[E]),result:je},configure:{args:e=>e.length===0,result:je},actions:{args:e=>F(e,[E]),result:e=>Array.isArray(e)&&e.every(lo)},runAction:{args:e=>F(e,[E,E]),result:Be}},fo=e=>A(e)&&E(e.name)&&E(e.version)&&de(e.description)&&de(e.author)&&(e.localized===void 0||A(e.localized)&&Object.values(e.localized).every(t=>A(t)&&E(t.name)&&de(t.description))),xi=z("calendar.itemSource","service","1.3.0","many",e=>A(e)&&B(e,"list")&&(e.integration===void 0||fo(e.integration)),void 0,uo,e=>e.integration),_t=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,gn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Ai=e=>A(e)&&_t(e.startDate)&&_t(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=hn&&(e.cursor===void 0||gn(e.cursor)),ki=e=>A(e)&&gn(e.revision)&&(e.cursor===void 0||gn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=hn&&e.items.every(t=>ao(t)&&_t(t.date)&&(t.endDate===void 0||_t(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,Ei=z("calendar.itemSource","service","2.0.0","many",e=>A(e)&&B(e,"list")&&(e.integration===void 0||fo(e.integration)),void 0,{...uo,list:{args:e=>F(e,[Ai]),result:ki}},e=>e.integration),Ii=z("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Ti=z("calendar.navigator","service","1.0.0","one",e=>A(e)&&B(e,"openDate"),void 0,{openDate:{args:e=>F(e,[gi]),result:je}}),_i=z("calendar.panelSelection","state","1.0.0","one",e=>A(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),rt=z("web.activeContext","state","1.0.0","one",e=>A(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function so(e){return A(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>A(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Oi=z("contacts.directory","service","1.0.0","one",e=>A(e)&&["search","resolveEmails","open"].every(t=>B(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(so)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>A(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(so))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||A(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:je}}),Pi=z("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Ci=z("web.navigator","service","1.0.0","one",e=>A(e)&&B(e,"open"),void 0,{open:{args:e=>F(e,[hi]),result:je}}),bn=z("selection.textAction","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&B(e,"run"),e=>[e.id]),Ri=z("geo.navigator","service","1.0.0","one",e=>A(e)&&B(e,"open"),void 0,{open:{args:e=>F(e,[bi]),result:je}}),Di=z("geo.search","service","1.0.0","one",e=>A(e)&&B(e,"search")&&B(e,"reverse"),void 0,{search:{args:e=>F(e,[E]),result:yi},reverse:{args:e=>F(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:wi}}),Mi=z("agent.toolProvider","service","1.0.0","many",e=>A(e)&&Array.isArray(e.tools)&&e.tools.every(Ni)&&B(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>F(e,[E,A,vi]),result:Si}},e=>({tools:e.tools}),"global"),Li=z("guard.runtime","service","1.0.0","one",e=>A(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>B(e,t)),void 0,{resolve:{args:e=>F(e,[A]),result:A},requestApproval:{args:e=>F(e,[A]),result:Be},consumeToken:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&de(e[1]),result:Be},audit:{args:e=>F(e,[A]),result:je}}),ji=z("browser.automation","service","1.0.0","one",e=>A(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>B(e,t)),void 0,{list:{args:e=>e.length===0,result:ee},open:{args:e=>F(e,[E]),result:ee},switch:{args:e=>F(e,[E]),result:ee},close:{args:e=>F(e,[E]),result:ee},snapshot:{args:e=>F(e,[E]),result:ee},readText:{args:e=>e.length>=1&&e.length<=2&&E(e[0])&&pi(e[1]),result:ee},readHtml:{args:e=>F(e,[E]),result:ee},screenshot:{args:e=>F(e,[E]),result:ee},click:{args:e=>F(e,[E,t=>typeof t=="number"]),result:ee},type:{args:e=>e.length>=3&&e.length<=4&&E(e[0])&&typeof e[1]=="number"&&E(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:ee},select:{args:e=>F(e,[E,t=>typeof t=="number",E]),result:ee},scroll:{args:e=>F(e,[E,t=>typeof t=="number",t=>typeof t=="number"]),result:ee},pressKey:{args:e=>F(e,[E,E]),result:ee},navigate:{args:e=>F(e,[E,E]),result:ee},back:{args:e=>F(e,[E]),result:ee},forward:{args:e=>F(e,[E]),result:ee},reload:{args:e=>F(e,[E]),result:ee}}),Fi=z("fileTree.contextItem","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.label=="string"&&de(e.labelKey)&&B(e,"run"),e=>[e.id]),zi=z("newTab.entry","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"run"),e=>[e.id]),yn=z("search.resultAction","extension","1.0.0","many",e=>A(e)&&typeof e.cardKind=="string"&&B(e,"open"),e=>[e.cardKind]),$i=z("search.resultCard","extension","1.0.0","many",e=>A(e)&&typeof e.cardKind=="string"&&B(e,"render")&&B(e,"open"),e=>[e.cardKind]),Vi=z("metadataPanel.segment","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"render"),e=>[e.id]),wn=z("workspace.surface","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&B(e,"getSnapshot")&&B(e,"subscribe")&&B(e,"restore"),e=>[e.id]),Ui=z("metadata.plugin","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"facts"),e=>[e.id]),Bi=z("workspace.viewState","extension","1.0.0","many",e=>A(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&B(e,"capture")&&B(e,"restore")&&B(e,"subscribe"),e=>[e.id]);var Ot=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let n=Object.create(null),o=Reflect.ownKeys(e);if(o.length>32)throw new Error("Invalid bookmark descriptor");for(let i of o){if(typeof i!="string")continue;if(["__proto__","prototype","constructor"].includes(i))throw new Error("Invalid bookmark key");let s=Object.getOwnPropertyDescriptor(e,i);s?.enumerable&&"value"in s&&(n[i]=s.value)}return n},vn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),po=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),mo=e=>vn(e)&&typeof e.surface=="string"&&po.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function it(e){let t=Ot(e);if(!mo(t))throw new Error("Invalid bookmark descriptor");let n=mn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),o=ro({folderPath:"",title:t.title,description:t.description,target:n});if(!o.title||typeof o.description!="string")throw new Error("Bookmark presentation is required");return{surface:n.surface,title:o.title,description:o.description,state:n.state,...n.instanceId===void 0?{}:{instanceId:n.instanceId},...n.itemId===void 0?{}:{itemId:n.itemId}}}function Sn(e){try{let t=it(e),n=Ot(e);return JSON.stringify(t.state)===JSON.stringify(It(n.state))}catch{return!1}}function Wi(e){try{let t=Ot(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:it(t.bookmark)}}catch{}return{status:"invalid"}}var Ki=e=>{try{let t=Ot(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&Sn(t.bookmark)}catch{return!1}},Gi=e=>vn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),go=z("workspace.bookmark","service","1.0.0","many",e=>vn(e)&&typeof e.id=="string"&&po.has(String(e.surface))&&Le(e.stateSchema)&&(e.itemStateSchema===void 0||Le(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&mo(e[0]),result:Ki,sanitizeResult:Wi},restore:{args:e=>e.length===1&&Sn(e[0]),result:Gi}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function Nn(e,t,n){if(!Le(n.stateSchema)||n.itemStateSchema!==void 0&&!Le(n.itemStateSchema))throw new Error("Invalid bookmark state schema");let o=!0,i=(d,u,f=!1)=>Tt(f&&n.itemStateSchema?n.itemStateSchema:n.stateSchema,d,8192)&&(!n.validate||n.validate(d,u)),s=(d,u,f)=>{let h=f?void 0:n.primary?n.primary(d):d.item,S=It(h?.state??d.view);if(!i(S,u,!!h))throw new Error("Invalid bookmark state");return it({...u,title:h?.title??d.title,description:n.description(d,!!h),state:S,...h?{itemId:h.id}:{}})},a={id:t.id,surface:t.surface,stateSchema:n.stateSchema,...n.itemStateSchema?{itemStateSchema:n.itemStateSchema}:{},capture(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:s(t.getSnapshot(d.instanceId),d,!1)}}catch{return{status:"invalid"}}},async restore(d){if(!o||d.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=it(d),!i(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:o?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(go,a),c;try{c=e.interop.extensions.provide(wn,{...t,getSnapshot(d){let u=t.getSnapshot(d),f={surface:t.surface,...d===void 0?{}:{instanceId:d}},h,S;try{h=s(u,f,!1)}catch{}try{S=s(u,f,!0)}catch{}return{...u,bookmark:h,bookmarkView:S}}})}catch(d){throw o=!1,l(),d}return()=>{o=!1,c(),l()}}var st=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ho=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function bo(e){if(!st(e)||!ho(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(n=>typeof n=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(n))))return!1;let t=new Set;for(let n of e.items){if(!st(n)||!ho(n.id)||t.has(n.id)||typeof n.label!="string"||!n.label.trim()||n.label.length>256||n.labelKey!==void 0&&typeof n.labelKey!="string"||n.available!==void 0&&typeof n.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(n.kind)))return!1;t.add(n.id)}if(e.automation!==void 0){if(!st(e.automation)||Object.keys(e.automation).some(n=>n!=="actions")||!st(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[n,o]of Object.entries(e.automation.actions))if(!t.has(n)||!st(o)||!["button","number","string","boolean"].includes(String(o.type))||Object.keys(o).some(i=>!["type","integer","maxLength"].includes(i))||o.integer!==void 0&&(o.type!=="number"||typeof o.integer!="boolean")||o.maxLength!==void 0&&(o.type!=="string"||!Number.isSafeInteger(o.maxLength)||Number(o.maxLength)<1||Number(o.maxLength)>65536))return!1}return e.defaultItems.every(n=>typeof n=="string"&&t.has(n))&&new Set(e.defaultItems).size===e.defaultItems.length}var Hi=z("workspace.details","extension","1.0.0","many",bo,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var id=[X,`${X}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var wd=1024*1024;var Nd=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var xd=globalThis.Buffer;var Zi=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var Xi=[".ttf",".otf",".woff",".woff2"],Yi=[".csv"],Ji=[".base"],Qi=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],es=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],ts=[...Qi,...es,".ico",".flavicon"];var ns=[".pdf"],os=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],rs=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],is=[".srt",".vtt",".ass"],ss=[".stl",".obj",".glb",".gltf"],as=[".bin",".mtl"];function at(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var ds={type:"core",id:"valley"},N=(e,t,n,o,i={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:o,owner:ds,...i});function cs(e){let t={};for(let[n,o]of e)for(let i of n)t[i]=o;return t}var ls=cs([[[".mermaid",".mmd"],N("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],N("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],N("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],N("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],N("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Xi,N("font","font","font","media")],[[".epub",".mobi",".azw3"],N("ebook","ebook","ebook","documents")],[[".djvu"],N("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],N("comic","comic","comic","documents")],[[".md",".markdown"],N("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],N("text","text","text","notes")],[[".json"],N("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],N("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Yi,N("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Ji,N("base","base","fallback","data")],[ts,N("image","image","image","media",{information:["identity","dimensions","exif"]})],[ns,N("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[os,N("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[rs,N("video","video","video","media",{information:["identity","media","video-codec"]})],[is,N("text","subtitle","text","media")],[ss,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[as,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],N("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],N("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],N("docx","word","opendocument","documents")],[[".ods"],N("csv","excel","opendocument","data")],[[".odp"],N("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],N("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],N("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],N("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],N("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],N("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],N("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],N("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],N("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],N("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],N("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],N("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],N("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],N("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],N("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],N("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],N("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],N("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],N("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],N("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],N("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],N("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],N("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],N("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],N("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],N("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],N("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],N("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),us=N("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function fs(e){return ls[at(e)]??us}function De(e){return fs(e).kind}var r,y,Ie=0;function yo(e){Ie++,y=e,r=e.React}function Pt(){return y.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ne(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let o=n.toString();return n.search?o:o.replace(/\/$/,"")}catch{return t}}function Ct(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var We="sideNotes.notes",xn="sideNotes.note_tags",An="sideNotes.path_history",Rt=100,ps=32,wo=4096,ms=4*1024*1024;function gs(e){return e?e.kind==="none"?"none":e.kind==="ids"?JSON.stringify(["ids",[...new Set(e.ids)].sort()]):JSON.stringify(e.kind==="file"?["file",e.path,e.includeWeb===!0]:["web",ne(e.url)]):"all"}async function vo(e){let t=await Promise.allSettled(e),n=t.find(o=>o.status==="rejected");if(n?.status==="rejected")throw n.reason;return t.map(o=>o.value)}var Dt=class{constructor(t,n,o){V(this,"api",t);V(this,"isCurrent",n);V(this,"normalize",o);V(this,"revision",0);V(this,"catalogRevision",0);V(this,"catalog",null);V(this,"catalogKeys",new Set);V(this,"dirtyKeys",new Set);V(this,"sourceRevision",null);V(this,"vaultGeneration",null);V(this,"catalogPending",null);V(this,"pending",new Map);V(this,"disposed",!1);V(this,"disposers");V(this,"listeners",new Set);this.disposers=[We,xn,An].map(i=>t.data.dataset(i).subscribe(s=>{if(!this.isActive())return;this.revision++;let a=this.vaultGeneration!==null&&this.vaultGeneration!==s.vaultGeneration;if(this.vaultGeneration=s.vaultGeneration,a&&(this.catalogRevision++,this.sourceRevision=null,this.resetCatalog()),i===We&&(this.catalogRevision++,this.changeSubjects(s)),this.isActive())for(let l of this.listeners)l()})),this.disposers.push(t.subscribe(()=>{this.isCurrent()||this.dispose()}))}isActive(){return!this.disposed&&this.isCurrent()}subscribe(t){return this.isActive()?(this.listeners.add(t),()=>{this.listeners.delete(t)}):()=>{}}dispose(){if(!this.disposed){this.disposed=!0,this.resetCatalog(),this.listeners.clear();for(let t of this.disposers)t();this.disposers=[]}}assertActive(){if(!this.isActive())throw new Error("SideNotes reader is no longer active")}resetCatalog(){this.catalog=null,this.catalogKeys.clear(),this.dirtyKeys.clear()}changeSubjects(t){let n=this.sourceRevision;if(this.sourceRevision=Number.isSafeInteger(t.revision)&&t.revision>=0?t.revision:null,!this.catalog||n===null||this.sourceRevision!==n+1||!t.keys?.length||t.keys.length>wo){this.resetCatalog();return}for(let o of t.keys){if(!o||typeof o!="object"||Array.isArray(o)||Object.keys(o).length!==1||typeof o.id!="string"||!this.catalogKeys.has(o.id)){this.resetCatalog();return}this.dirtyKeys.add(o.id)}}retainSubjects(t){if(this.resetCatalog(),t.length>wo)return;let n=0;for(let o of t){if(typeof o.id!="string"||this.catalogKeys.has(o.id)){this.resetCatalog();return}this.catalogKeys.add(o.id);for(let i of["id","path","url"])typeof o[i]=="string"&&(n+=o[i].length*2);if(n>ms){this.resetCatalog();return}}this.catalog=t}async rows(t,n={},o){let i=[],s;do{this.assertActive();let a=await this.api.data.dataset(t).query({...n,limit:1e3,cursor:s});this.assertActive(),o?.(a.revision),i.push(...a.rows),s=a.cursor}while(s);return i}subjects(){if(this.catalogPending)return this.catalogPending;if(this.catalog&&!this.dirtyKeys.size)return Promise.resolve(this.catalog);let t=(async()=>{for(;;){let o=this.catalogRevision,i=this.catalog,s=[...this.dirtyKeys],a=this.sourceRevision,l,c=d=>{if(!Number.isSafeInteger(d)||d<0||l!==void 0&&d!==l)throw new Error("SideNotes catalog changed during read");l=d};try{let d;if(i){let u=new Map;for(let h=0;h<s.length;h+=Rt){let S=s.slice(h,h+Rt),I=await this.rows(We,{select:["id","path","url"],where:{id:{in:S}}},c);for(let x of I){if(typeof x.id!="string"||!S.includes(x.id))throw new Error("Invalid SideNotes catalog key");u.set(x.id,x)}if(o!==this.catalogRevision)break}if(o!==this.catalogRevision)continue;if(l!==a){this.resetCatalog();continue}let f=new Set(s);d=i.flatMap(h=>{if(!f.has(String(h.id)))return[h];let S=u.get(String(h.id));return S?[S]:[]})}else d=await this.rows(We,{select:["id","path","url"]},c);if(this.assertActive(),o!==this.catalogRevision)continue;if(l===void 0||a!==null&&l<a)throw new Error("SideNotes catalog revision is unavailable");return this.sourceRevision=l,this.retainSubjects(d),d}catch(d){if(this.assertActive(),o!==this.catalogRevision)continue;throw this.resetCatalog(),d}}})();this.catalogPending=t;let n=()=>{this.catalogPending===t&&(this.catalogPending=null)};return t.then(n,n),t}async read(t){let n=[],o=[],i=[];if(!t)[n,o,i]=await vo([this.rows(We),this.rows(xn),this.rows(An)]);else{let l=t.kind==="web"?ne(t.url):t.kind==="file"?t.path:"",c=t.kind==="ids"?new Set(t.ids):null;if(!l&&!c?.size)return[];let d=(await this.subjects()).filter(u=>{if(c)return typeof u.id=="string"&&c.has(u.id.trim());if(t.kind==="file"&&(typeof u.path!="string"||u.path.trim()!==l))return!1;let f=ne(typeof u.url=="string"?u.url:"");return t.kind==="web"?f===l:t.kind==="file"&&t.includeWeb===!0||!f}).map(u=>u.id).filter(u=>typeof u=="string"&&!!u.trim());for(let u=0;u<d.length;u+=Rt){let f=d.slice(u,u+Rt),[h,S,I]=await vo([this.rows(We,{where:{id:{in:f}}}),this.rows(xn,{where:{noteId:{in:f}}}),this.rows(An,{where:{noteId:{in:f}}})]);n.push(...h),o.push(...S),i.push(...I)}}let s=new Map;for(let l of o){if(typeof l.noteId!="string")continue;let c=s.get(l.noteId);c?c.push(l.tag):s.set(l.noteId,[l.tag])}let a=new Map;for(let l of i){if(typeof l.noteId!="string")continue;let c=a.get(l.noteId);c?c.push(l):a.set(l.noteId,[l])}for(let l of a.values())l.sort((c,d)=>Number(c.position)-Number(d.position));return n.map(l=>this.normalize({...l,tags:s.get(String(l.id))??[],pathHistory:(a.get(String(l.id))??[]).map(c=>c.path)})).filter(l=>l!==null)}load(t){if(!this.isActive())return Promise.reject(new Error("SideNotes reader is no longer active"));let n=gs(t),o=this.pending.get(n);if(o)return o;if(this.pending.size>=ps)return Promise.reject(new Error("Too many SideNotes reads"));let i=t?.kind==="ids"?{kind:t.kind,ids:[...t.ids]}:t?{...t}:void 0,s=(async()=>{for(;;){this.assertActive();let l=this.revision;try{let c=await this.read(i);if(this.assertActive(),l===this.revision)return c}catch(c){if(this.assertActive(),l===this.revision)throw c}}})();this.pending.set(n,s);let a=()=>{this.pending.get(n)===s&&this.pending.delete(n)};return s.then(a,a),s}};var Lt="sideNotes.notes",dt="sideNotes.note_tags",kn="sideNotes.path_history";function No(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function ct(){return new Date().toISOString()}function ue(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function he(e){return typeof e=="string"?e:""}function hs(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=he(t.type);if(n==="pdf-page"){let o=he(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),...o?{snippet:o}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(ue(t.page,1))),x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.2),height:ue(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,ue(t.seconds,0))};if(n==="markdown-line"){let o=he(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(ue(t.line,1))),...o?{snippet:o}:{}}}if(n==="markdown-heading"){let o=he(t.heading).trim();return o?{type:n,heading:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let o=he(t.snippet).trim();return o?{type:n,snippet:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ue(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:ue(t.x,0),y:ue(t.y,0),width:ue(t.width,.25),height:ue(t.height,.25)};if(n==="web-selection"){let o=he(t.snippet).trim();return o?{type:n,snippet:o}:{type:"none"}}return{type:"none"}}function bs(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function ys(e){let t=he(e.id).trim(),n=he(e.path).trim(),o=ne(he(e.url)),i=he(e.note).trim();if(!t||!i||!n&&!o)return null;let s=he(e.createdAt)||ct(),a=Array.isArray(e.pathHistory)?e.pathHistory.filter(l=>typeof l=="string"&&l!==n):[];return{id:t,path:n,note:i,...o?{url:o}:{},pathHistory:[...new Set(a)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],anchor:hs(e.anchor),fileKey:bs(e.fileKey),createdAt:s,updatedAt:he(e.updatedAt)||s}}function te(e=y,t){let n=Ie,o=()=>{if(t?.(),e!==y||n!==Ie)throw new Error("SideNotes mutation session is no longer active")};o();let i=Te();return{api:e,reader:i,isActive:()=>{try{return o(),i.isActive()}catch{return!1}},assertActive:()=>{if(o(),!i.isActive())throw new Error("SideNotes mutation session is no longer active")}}}function oe(e){return{...e,tags:[...e.tags],pathHistory:[...e.pathHistory],anchor:{...e.anchor},...e.fileKey?{fileKey:{...e.fileKey}}:{}}}async function jt(e,t){if(t.assertActive(),!e.path)return e;let n=await t.api.vault.stat(e.path);return t.assertActive(),n?{...e,fileKey:{dev:n.dev,ino:n.ino}}:e}function xo(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function So(e,t,n){let o=[],i;do{e.assertActive();let s=await e.api.data.dataset(t).query({where:n,limit:1e3,cursor:i});e.assertActive(),o.push(...s.rows),i=s.cursor}while(i);return o}function Ao(e){return[...e.tags.map(t=>({dataset:dt,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:kn,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function ws(e,t){let n=await Promise.allSettled([So(e,dt,{noteId:t}),So(e,kn,{noteId:t})]),o=n.find(a=>a.status==="rejected");if(o?.status==="rejected")throw o.reason;e.assertActive();let[i,s]=n.map(a=>a.value);return[...i.map(a=>({dataset:dt,operation:"delete",key:{noteId:t,tag:String(a.tag)}})),...s.map(a=>({dataset:kn,operation:"delete",key:{noteId:t,position:Number(a.position)}}))]}function Te(){let e=y,t=Ie,n=e.getState().vault?.path??null,o=e.runtime.getOrCreate("sideNotes.noteRepository",()=>({current:null}));return o.current?.isActive()||(o.current?.dispose(),o.current=new Dt(e,()=>{if(e!==y||t!==Ie)return!1;try{return(e.getState().vault?.path??null)===n}catch{return!1}},i=>ys(i))),o.current}function Ft(e,t,n,o=[]){let i=ct();return{id:No(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:i,updatedAt:i}}function zt(e,t,n,o=[]){let i=ct();return{id:No(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:i,updatedAt:i}}var vs={conflict:"REVISION_CONFLICT","document-not-found":"TARGET_NOT_FOUND"};function $t(e){return e instanceof Error?e:new Error(String(e))}function En(e,t,n){let o=$t(e),i=t==="not-applied"&&o.retryable===!0;return Object.assign(o,{code:typeof o.code=="string"?vs[o.code]??o.code:n,outcome:t,retryable:i})}function ko(e){let t=$t(e);return t.outcome==="unknown"||t.outcomeUnknown===!0}function Ss(e,t="TARGET_UNAVAILABLE"){return ko(e)?$t(e):En(e,"not-applied",t)}function Ns(e){if(ko(e))return En(e,"unknown","OUTCOME_UNKNOWN");let t=$t(e);return typeof t.code=="string"?En(t,"not-applied",t.code):t}function Mt(e,t){return Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}async function we(e){try{return await e()}catch(t){throw Ss(t)}}async function In(e){try{return await e()}catch(t){throw Ns(t)}}async function Eo(e,t){await we(async()=>t.assertActive()),await In(()=>t.api.data.transaction([{dataset:Lt,operation:"insert",values:xo(e)},...Ao(e)]))}async function Io(e,t=te()){let n=await jt(oe(e),t);try{return await Eo(n,t),!0}catch{return!1}}async function Vt(e,t=te()){let n=await we(()=>jt(oe(e),t));await Eo(n,t)}async function To(e,t,n,o,i){let s={pluginId:i.api.pluginId,sourceId:"notes",itemId:e},{baseline:a,deletes:l}=await we(async()=>{i.assertActive();let d=await i.api.documents.read(s);if(i.assertActive(),!d)throw Mt("TARGET_NOT_FOUND","The SideNote no longer exists.");if(n!==void 0){let f=await i.api.data.dataset(Lt).get({id:e});if(i.assertActive(),!f)throw Mt("TARGET_NOT_FOUND","The SideNote no longer exists.");if(f.updatedAt!==n)throw Mt("REVISION_CONFLICT","This SideNote changed elsewhere. Newer work was preserved.")}let u=await ws(i,e);return i.assertActive(),{baseline:d,deletes:u}}),c=xo(t);delete c.id,delete c.note,await In(()=>i.api.documents.update(s,{expectedRevision:o?.expectedRevision??a.revision,vaultGeneration:o?.vaultGeneration??a.vaultGeneration,body:t.note,explicitTags:t.tags,operations:[{dataset:Lt,operation:"update",key:{id:e},values:c},...l.filter(d=>d.dataset!==dt),...Ao(t).filter(d=>d.dataset!==dt)]}))}async function Ke(e,t,n,o,i=te()){let s=o?{...o}:void 0,a=await jt({...oe(t),id:e},i);try{return await To(e,a,n,s,i),!0}catch{return!1}}async function Tn(e,t,n,o,i=te()){let s=o?{...o}:void 0,a=await we(()=>jt({...oe(t),id:e},i));await To(e,a,n,s,i)}async function _o(e,t){await we(async()=>t.assertActive());let{affected:n}=await In(()=>t.api.data.dataset(Lt).delete({id:e}));if(n<=0)throw Mt("TARGET_NOT_FOUND","The SideNote no longer exists.")}async function Ut(e,t=te()){try{return await _o(e,t),!0}catch{return!1}}async function Bt(e,t=te()){await _o(e,t)}async function Oo(e,t,n=te()){try{if(!e||!t||e===t)return;n.assertActive();let o=await n.reader.load();n.assertActive();let i=`${e}/`;for(let s of o){if(s.path!==e&&!s.path.startsWith(i))continue;let a=s.path===e?t:`${t}/${s.path.slice(i.length)}`,l={...s,path:a,pathHistory:[s.path,...s.pathHistory.filter(c=>c!==s.path)],updatedAt:ct()};n.assertActive(),await Ke(s.id,l,void 0,void 0,n),n.assertActive()}}catch(o){if(n.isActive())throw o}}async function Po(e,t,n,o=te()){try{if(!Number.isFinite(n)||n===0||!e)return;let i=Math.max(1,Math.floor(t));o.assertActive();let s=await o.reader.load();o.assertActive();for(let a of s){if(a.path!==e||a.anchor.type!=="markdown-line"||a.anchor.line<i)continue;let l={...a,anchor:{...a.anchor,line:Math.max(1,a.anchor.line+n)},updatedAt:ct()};o.assertActive(),await Ke(a.id,l,void 0,void 0,o),o.assertActive()}}catch(i){if(o.isActive())throw i}}var Co={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var As=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,ks=/^-\s+(.*)$/,Es=/^[A-Za-z][\w+.-]*:\/\//;function Ro(e){let t={bare:null,values:{},lists:{}},n=null;for(let o of e.split(`
`)){let i=o.trim();if(!i||i.startsWith("#"))continue;let s=i.match(ks);if(s){n?t.lists[n].push(s[1].trim()):t.bare===null&&(t.bare=s[1].trim());continue}let a=Es.test(i)?null:i.match(As);if(a){let l=a[1].trim().toLowerCase(),c=a[2].trim();c===""?(n=l,t.lists[l]=t.lists[l]??[]):(n=null,t.values[l]=c);continue}n=null,t.bare===null&&(t.bare=i)}return t}function Do(e,t,n=500){let o=e.values[t];if(o===void 0)return null;let i=Number.parseInt(o,10);return!Number.isFinite(i)||i<1?null:Math.min(i,n)}var Mo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-vault browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"Preferred file extensions appear first, in this order. Extensions from saved SideNotes are added automatically, even when this list is empty.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"No extension","sideNotes.filter.web":"Web","sideNotes.error.load":"Could not load SideNotes. Try again.","sideNotes.action.retry":"Retry","bookmark.view":"Notes and filters","bookmark.item":"Selected item"};var Lo={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem vault-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Bevorzugte Dateierweiterungen erscheinen zuerst, in dieser Reihenfolge. Erweiterungen gespeicherter SideNotes werden automatisch erg\xE4nzt, auch wenn diese Liste leer ist.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"Ohne Erweiterung","sideNotes.filter.web":"Internet","sideNotes.error.load":"SideNotes konnten nicht geladen werden. Versuche es erneut.","sideNotes.action.retry":"Erneut versuchen","bookmark.view":"Notizen und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag"};var jo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda la b\xF3veda.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Las extensiones preferidas aparecen primero, en este orden. Las extensiones de las SideNotes guardadas se a\xF1aden autom\xE1ticamente, aunque esta lista est\xE9 vac\xEDa.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.noExtension":"Sin extensi\xF3n","sideNotes.filter.web":"Sitio web","sideNotes.error.load":"No se pudieron cargar las SideNotes. Int\xE9ntalo de nuevo.","sideNotes.action.retry":"Reintentar","bookmark.view":"Notas y filtros","bookmark.item":"Elemento seleccionado"};var Fo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le coffre.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Les extensions pr\xE9f\xE9r\xE9es apparaissent en premier, dans cet ordre. Les extensions des SideNotes enregistr\xE9es sont ajout\xE9es automatiquement, m\xEAme si cette liste est vide.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.noExtension":"Sans extension","sideNotes.filter.web":"Site web","sideNotes.error.load":"Impossible de charger les SideNotes. R\xE9essayez.","sideNotes.action.retry":"R\xE9essayer","bookmark.view":"Notes et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9"};var zo={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8\u4ED3\u5E93\u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"\u9996\u9009\u6587\u4EF6\u6269\u5C55\u540D\u6309\u6B64\u987A\u5E8F\u4F18\u5148\u663E\u793A\u3002\u5DF2\u4FDD\u5B58\u7684 SideNotes \u4E2D\u7684\u6269\u5C55\u540D\u4F1A\u81EA\u52A8\u6DFB\u52A0\uFF0C\u5373\u4F7F\u6B64\u5217\u8868\u4E3A\u7A7A\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.noExtension":"\u65E0\u6269\u5C55\u540D","sideNotes.filter.web":"\u7F51\u9875","sideNotes.error.load":"\u65E0\u6CD5\u52A0\u8F7D SideNotes\u3002\u8BF7\u91CD\u8BD5\u3002","sideNotes.action.retry":"\u91CD\u8BD5","bookmark.view":"\u7B14\u8BB0\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE"};var $o={en:Mo,de:Lo,es:jo,fr:Fo,"zh-CN":zo};function Vo(e,t){return($o.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(o,i)=>String(t?.[i]??""))}var Uo=Vo;function Bo(e){e.ui.registerCatalogs($o),Uo=(t,n)=>{let o=e.ui.t(t,n);return o===t?Vo(t,n):o}}function p(e,t){return Uo(e,t)}function Wo(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.getState().activePath;return{getSnapshot:()=>(n.isActive()&&(o=t.getState().activePath),o),subscribe:i=>{if(!n.isActive())return()=>{};let s=!0,a=t.subscribe(()=>{s&&n.isActive()&&i()});return()=>{s=!1,a()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ko(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.interop.state.get(rt),i=o?{...o}:null;return{getSnapshot:()=>{if(n.isActive()){let s=t.interop.state.get(rt);s?(!i||s.instanceId!==i.instanceId||s.url!==i.url||s.title!==i.title)&&(i={...s}):i=null}return i},subscribe:s=>{if(!n.isActive())return()=>{};let a=!0,l=t.interop.state.subscribe(rt,()=>{a&&n.isActive()&&s()});return()=>{a=!1,l()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ge(e){let[t]=r.useState(Te),[n,o]=r.useState([]),[i,s]=r.useState(!0),[a,l]=r.useState(null),c=r.useRef(!1),d=r.useRef(0),u=e?.kind??"all",f=e?.kind==="file"?e.path:e?.kind==="web"?ne(e.url):"",h=e?.kind==="file"&&e.includeWeb===!0,S=r.useCallback(()=>{if(!c.current||!t.isActive())return;let I=++d.current,x=u==="all"?void 0:u==="file"?{kind:u,path:f,includeWeb:h}:u==="web"?{kind:u,url:f}:{kind:u};t.load(x).then(k=>{!c.current||!t.isActive()||I!==d.current||(o(k),l(null),s(!1))}).catch(()=>{!c.current||!t.isActive()||I!==d.current||(l(p("sideNotes.error.load")),s(!1))})},[u,f,h,t]);return r.useEffect(()=>{c.current=!0,o([]),s(!0),l(null);let I=t.subscribe(S);return S(),()=>{c.current=!1,d.current++,I()}},[S,t]),{notes:n,setNotes:o,loading:i,error:a,reload:S}}function Go(){let[e,t]=r.useState(new Set),n=r.useCallback(i=>e.has(i),[e]),o=r.useCallback((i,s)=>{t(a=>{let l=new Set(a);return s?l.add(i):l.delete(i),l})},[]);return{isPending:n,setPending:o,pending:e}}var _n="notes-sidenotes-fence-styles";function Cs(){if(document.getElementById(_n))return;let e=document.createElement("style");e.id=_n,e.textContent=`
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
`,document.head.appendChild(e)}var Ho=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?p("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},Rs=({code:e,path:t})=>{let n=Ro(e),o=n.values.file??n.bare??t,i=n.values.url?ne(n.values.url):null,s=(n.values.flagged??"").toLowerCase()==="true",a=n.values.tag?n.values.tag.replace(/^#/,"").toLowerCase():null,l=Do(n,"limit",100)??20,{notes:c,loading:d,error:u,reload:f}=Ge(i?{kind:"web",url:i}:o?{kind:"file",path:o,includeWeb:!0}:s?void 0:{kind:"none"});if(u)return r.createElement("div",{className:"sidenotes-fence-empty",role:"alert"},u," ",r.createElement("button",{type:"button",onClick:f},p("sideNotes.action.retry")));if(d)return r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.33ce417454bf"));let h=c.filter(x=>i?x.url===i:o?!(x.path!==o||s&&x.flagged!==!0||a&&!x.tags.some(k=>k.replace(/^#/,"").toLowerCase()===a)):s?x.flagged===!0:!1).slice(0,l),S=()=>{y.workspace.revealOwnPanel("right_sidebar")},I=i??(o?o.split("/").pop():s?"flagged":null);return r.createElement(r.Fragment,null,r.createElement("div",{className:"sidenotes-fence-head",onClick:S,title:p("auto.954a9a37711e")},r.createElement("span",{className:"t"},p("auto.746eb1a86a79")," ",I?` \xB7 ${I}`:""),r.createElement("span",{className:"c"},h.length)),h.length===0&&r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.f545c86bbd6e")),h.map(x=>r.createElement("div",{key:x.id,className:"sidenotes-fence-note",onClick:S},r.createElement(y.ui.MarkdownView,{className:"body",value:x.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:x.id},sourcePath:x.path||void 0}}),r.createElement("div",{className:"meta"},x.flagged&&r.createElement("span",{className:"flag"},"\u2691"),Ho(x)&&r.createElement("span",null,Ho(x)),x.tags.slice(0,3).map(k=>r.createElement("span",{key:k},"#",k.replace(/^#/,"")))))))};function qo(){let e=y.markdown.registerCodeBlockRenderer("sidenotes",(t,n,o)=>(Cs(),n.classList.add("sidenotes-fence"),y.ui.renderReact(n,r.createElement(Rs,{code:t,path:o.path}))),{examples:Co.sidenotes});return()=>{e(),document.getElementById(_n)?.remove()}}var Wt=e=>typeof e=="string"?e:"";function Zo(e){let t=Wt(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Xo(e){let t={cardKind:"sidenote",open:async(n,o)=>{if(Wt(n.id)&&!o.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:Wt(n.id)}),!0;let i=Wt(n.url);if(i)return o.newTab?e.links.open(i,{newTab:!0}):e.links.open(i),!0;let s=Zo(n.path)||Zo(o.path);if(s){let a=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(s,a?.type==="web-selection"?void 0:a,{newTab:o.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(yn,t)}function Ds(e){return e.replace(/\s+/g," ").trim()}var Yo=200;function Ms(e,t){let n=Ds(e),o=n.slice(0,Yo);if(!t)return o;let i=n.replace(/ /g,"").slice(0,Yo).toLowerCase();if(!i)return o;let s=[],a="";for(let c=0;c<t.length;c++)/\s/.test(t[c])||(s.push(c),a+=t[c].toLowerCase());let l=a.indexOf(i);return l<0?o:t.slice(s[l],s[l+i.length-1]+1).trim()}function Jo(e,t){let n=e.text.trim(),o=Math.floor(e.page);return!n||!e.path||!Number.isFinite(o)||o<1?null:{kind:"file",path:e.path,page:o,snippet:Ms(n,t)}}function Qo(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let n=t.text.trim();if(!n)return null;let o=Number(t.page);return!Number.isFinite(o)||o<1?null:{path:e,page:o,text:n}}function Ls(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function js(e,t,n=320){let o=t.top-n,i=t.top+t.height+n,s=0,a=e.length;for(;s<a;){let c=s+a>>>1;e[c].start+e[c].height<o?s=c+1:a=c}let l=s;for(a=e.length;s<a;){let c=s+a>>>1;e[c].start<=i?s=c+1:a=c}return[l,s]}function Kt(e,t){let{ids:n,estimate:o,pinned:i=[],layoutKey:s}=t,a=t.enabled??n.length>80,l=e.useRef(null),c=e.useRef(new Map),[d,u]=e.useReducer(v=>v+1,0),[f,h]=e.useState({top:0,height:600}),[S,I]=e.useState(null),[x,k]=e.useState(null),D=e.useRef(null),j=e.useRef(null),_=e.useMemo(()=>{let v=0;return n.map(C=>{let U=c.current.get(C)??o,K={id:C,height:U,start:v};return v+=U,K})},[n,o,d]),W=_.length?_[_.length-1].start+_[_.length-1].height:0,O=e.useRef({rows:_,viewport:f});O.current={rows:_,viewport:f};let $=e.useCallback(()=>{let v=l.current,C=D.current;if(!v||!C)return;let U=v.getBoundingClientRect(),K=C.getBoundingClientRect(),M=C.clientHeight||K.height||600,J=C===v?C.scrollTop:K.top-U.top;h(ce=>ce.top===J&&ce.height===M?ce:{top:J,height:M})},[]),ie=e.useCallback(()=>{j.current===null&&(j.current=requestAnimationFrame(()=>{j.current=null,$()}))},[$]);e.useLayoutEffect(()=>{let v=l.current;if(!v||!a)return;let C=Ls(v);D.current=C;let U=v.style.overflowAnchor;v.style.overflowAnchor="none";let K=!0,M=()=>{if(!K)return;let Q=v.ownerDocument.activeElement,se=Q instanceof Element?Q.closest("[data-visible-key]"):null;I(se&&v.contains(se)?se.dataset.visibleKey??null:null)},J=()=>{queueMicrotask(M)};C.addEventListener("scroll",ie,{passive:!0}),window.addEventListener("resize",ie),v.addEventListener("focusin",M),v.addEventListener("focusout",J);let ce=v.clientWidth,ye=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{v.clientWidth!==ce&&(ce=v.clientWidth,c.current.clear(),u()),ie()});return ye?.observe(C),C!==v&&ye?.observe(v),$(),()=>{K=!1,v.style.overflowAnchor==="none"&&(v.style.overflowAnchor=U),C.removeEventListener("scroll",ie),window.removeEventListener("resize",ie),v.removeEventListener("focusin",M),v.removeEventListener("focusout",J),ye?.disconnect(),j.current!==null&&cancelAnimationFrame(j.current),j.current=null,D.current=null}},[a,$,ie]),e.useLayoutEffect(()=>{let v=new Set(n);for(let C of c.current.keys())v.has(C)||c.current.delete(C);$()},[n,$]),e.useLayoutEffect(()=>{c.current.clear(),u()},[s]),e.useLayoutEffect(()=>{let v=l.current;if(!v||!a)return;let C=M=>{let J=0,ce=!1,{rows:ye,viewport:Q}=O.current,se=new Map(ye.map(pe=>[pe.id,pe]));for(let pe of M){let Ee=pe.dataset.visibleKey,me=Ee?se.get(Ee):void 0,ge=pe.getBoundingClientRect().height;!Ee||!me||ge<=0||Math.abs(ge-me.height)<.5||(c.current.set(Ee,ge),me.start+me.height<=Q.top&&(J+=ge-me.height),ce=!0)}ce&&(J&&D.current&&(D.current.scrollTop+=J),u(),ie())},U=Array.from(v.children).filter(M=>M.hasAttribute("data-visible-key")),K=typeof ResizeObserver>"u"?void 0:new ResizeObserver(M=>C(M.map(J=>J.target)));return U.forEach(M=>K?.observe(M)),C(U),()=>K?.disconnect()}),e.useLayoutEffect(()=>{if(!x)return;let v=Array.from(l.current?.children??[]).find(C=>C.dataset.visibleKey===x.id);v&&(v.scrollIntoView?.({block:"nearest"}),x.selector&&(v.matches(x.selector)?v:v.querySelector(x.selector))?.focus(),$(),k(null))},[x,_,$]);let be=e.useCallback((v,C)=>{k({id:v,selector:C})},[]),[ke,Ve]=a?js(_,f):[0,_.length],Se=new Set;for(let v=ke;v<Ve;v++)Se.add(v);let Ce=new Set([...i,S,x?.id].filter(Boolean));return Ce.size&&_.forEach((v,C)=>{Ce.has(v.id)&&Se.add(C)}),{ref:l,show:be,render(v){let C=[],U=0;for(let K of[...Se].sort((M,J)=>M-J)){let M=_[K];M.start>U&&C.push(e.createElement("div",{key:`space:${M.id}`,"aria-hidden":!0,style:{height:M.start-U,flex:"0 0 auto",pointerEvents:"none"}})),C.push(e.createElement(e.Fragment,{key:M.id},v(K))),U=M.start+M.height}return W>U&&C.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:W-U,flex:"0 0 auto",pointerEvents:"none"}})),C}}}var nr=4,Fs=32,zs=32,er=8*1024*1024,tr=new WeakMap;function or(e){for(;e.active<nr&&e.tasks.length;){let t=e.tasks.shift();e.active++,t.read().then(t.resolve,t.reject).finally(()=>{e.active--,or(e)})}}var Ne=class extends Error{constructor(){super("SideNotes anchor reader is no longer active")}},ve=class{constructor(t=y){V(this,"owner",t);V(this,"generation");V(this,"root");V(this,"disposed",!1);V(this,"unsubscribe",()=>{});V(this,"queue");V(this,"bytes",0);V(this,"cache",new Map);V(this,"pending",new Map);this.generation=Ie,this.root=t.getState().vault?.path??null,this.queue=tr.get(t)??{active:0,tasks:[]},tr.set(t,this.queue),this.unsubscribe=t.subscribe(()=>{this.isActive()||this.dispose()})}isActive(){if(this.disposed||this.owner!==y||this.generation!==Ie)return!1;try{return(this.owner.getState().vault?.path??null)===this.root}catch{return!1}}assertActive(){if(!this.isActive())throw new Ne}dispose(){this.disposed||(this.disposed=!0,this.unsubscribe(),this.cache.clear(),this.bytes=0,this.queue.tasks=this.queue.tasks.filter(t=>t.owner!==this?!0:(t.reject(new Ne),!1)),this.pending.clear())}file(t){return this.request(JSON.stringify(["file",t]),()=>this.owner.vault.readFile(t))}page(t,n){return this.request(JSON.stringify(["page",t,n]),()=>this.owner.workspace.getPdfPageText(t,n))}pageCount(t){this.assertActive();let n=this.owner.workspace.getPdfPageCount(t);return this.assertActive(),n}mediaDuration(){this.assertActive();let t=this.owner.workspace.getMediaDuration();return this.assertActive(),t}request(t,n){if(!this.isActive())return Promise.reject(new Ne);let o=this.cache.get(t);if(o)return this.cache.delete(t),this.cache.set(t,o),Promise.resolve(o.value);let i=this.pending.get(t);if(i)return i;if(this.queue.active>=nr&&this.queue.tasks.length>=Fs)return Promise.reject(new Error("Too many SideNotes anchor reads"));let s,a=async()=>{this.assertActive();let d=await n();this.assertActive();let u=2*(t.length+(d?.length??0));if(u<=er){for(;this.cache.size>=zs||this.bytes+u>er;){let[f,h]=this.cache.entries().next().value;this.cache.delete(f),this.bytes-=h.bytes}this.cache.set(t,{value:d,bytes:u}),this.bytes+=u}return d},l=new Promise((d,u)=>{s={owner:this,read:a,resolve:d,reject:u}});this.pending.set(t,l);let c=()=>{this.pending.get(t)===l&&this.pending.delete(t)};return l.then(c,c),this.queue.tasks.push(s),or(this.queue),l}};var ut={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function pt(){return["none","web-selection"]}function Pn(e){let t=De(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function ir(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let o=e.line??0;return!!t.lineRange&&o>=1&&o>=t.lineRange.from&&o<=t.lineRange.to}return!1}function sr(e,t){let n=De(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function mt(e){let t=De(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function ft(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var Gt=1e7,lt=1e6,$s=Gt-1,rr=Gt-2;function Me(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function On(e,t){if(e.type==="pdf-page"){let n=e.page*Gt,o=e.snippet?Me(e.snippet):"";if(!o||t==null)return n;let i=Me(t).indexOf(o);return n+(i>=0?Math.min(i,rr):$s)}if(e.type==="pdf-region")return e.page*Gt+Math.max(0,Math.min(e.y,rr));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?Me(e.snippet):"";if(n&&t!=null){let o=t.replace(/\r\n?/g,`
`).split(`
`);for(let i=0;i<o.length;i++){let s=Me(o[i]).indexOf(n);if(s>=0)return(i+1)*lt+Math.min(s,lt-1)}}return(e.line??0)*lt}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,o=n*lt,i=e.type==="markdown-heading"?"":e.snippet?Me(e.snippet):"";if(!i||t==null||n<1)return o;let s=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(s==null)return o;let a=Me(s).indexOf(i);return o+(a>=0?Math.min(a,lt-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}function ar(e,t,n){let o=n.get(e.id)??ft(e.anchor),i=n.get(t.id)??ft(t.anchor);return o!==i?o-i:t.createdAt.localeCompare(e.createdAt)}function He(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),o=Math.floor(t%3600/60),i=t%60;return n>0?`${n}:${String(o).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${o}:${String(i).padStart(2,"0")}`}function qe(e){return e.type==="pdf-page"?p("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?p("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?He(e.seconds):e.type==="markdown-line"?p("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?p(ut["image-region"]):e.type==="web-selection"?e.snippet||p(ut["web-selection"]):p(ut.none)}function dr(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function Cn(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let o=t.split(":").map(s=>Number(s));if(o.some(s=>!Number.isFinite(s)||s<0))return null;let i=o.reduce((s,a)=>s*60+a,0);return Number.isFinite(i)?i:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function Ht(e,t,n){if(n?.assertActive(),t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let o=n?await n.file(e):await y.vault.readFile(e);if(n?.assertActive(),!o)return t;let i=o.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let l=i[t.line-1]?.trim().slice(0,160);return l?{...t,snippet:l}:t}if(t.type==="markdown-heading"){let l=t.heading.trim().toLowerCase(),c=i.findIndex(d=>d.replace(/^#+\s*/,"").trim().toLowerCase()===l);return c>=0?{...t,line:c+1}:t}let s=t.snippet.trim(),a=s?i.findIndex(l=>l.includes(s)):-1;return a>=0?{...t,line:a+1}:t}async function cr(e,t,n){if(n?.assertActive(),!["pdf-page","media-time","markdown-line","markdown-heading","markdown-snippet"].includes(t.type))return"ok";let o=n??new ve;try{if(o.assertActive(),t.type==="pdf-page"){let s=o.pageCount(e);if(typeof s=="number"&&t.page>s)return"missing";let a=t.snippet?await o.page(e,t.page):null;return o.assertActive(),lr(t,s,a)}if(t.type==="media-time"){let s=o.mediaDuration();return typeof s=="number"&&t.seconds>s?"missing":"ok"}let i=await o.file(e);return o.assertActive(),ur(t,i)}finally{n||o.dispose()}}function lr(e,t,n){return typeof t=="number"&&e.page>t||e.snippet&&n!==null&&!Me(n).includes(Me(e.snippet))?"missing":"ok"}function ur(e,t,n=t?.replace(/\r\n?/g,`
`).split(`
`)??[]){if(!t)return"ok";if(e.type==="markdown-line")return e.line<=n.length?"ok":"missing";if(e.type==="markdown-heading"){let s=e.heading.trim().toLowerCase();return n.some(a=>a.replace(/^#+\s*/,"").trim().toLowerCase()===s)?"ok":"missing"}if(e.type!=="markdown-snippet")return"ok";let o=e.snippet.trim();if(!o)return"ok";let i=n.filter(s=>s.includes(o)).length;return i===0?"missing":i>1?"ambiguous":"ok"}async function qt(e,t,n={}){let o=new Map,i=new Map,s=new Map;for(let a of e){t.assertActive();let l=n.path??a.url??a.path,c=a.anchor;if(c.type==="pdf-page"||c.type==="markdown-line"||c.type==="markdown-heading"||c.type==="markdown-snippet"){let d=c.type==="pdf-page"?c.page:void 0,u=JSON.stringify([l,d??"file"]),f=o.get(u)??{path:l,page:d,notes:[]};f.notes.push(a),o.set(u,f)}else{let d=c.type==="media-time"?t.mediaDuration():null;i.set(a,c.type==="media-time"&&typeof d=="number"&&c.seconds>d?"missing":"ok"),n.positions&&s.set(a,On(c,null))}}for(let a of o.values())if(t.assertActive(),a.page!==void 0){let l=t.pageCount(a.path),d=a.notes.some(u=>u.anchor.type==="pdf-page"&&!!u.anchor.snippet)&&(n.positions||typeof l!="number"||a.page<=l)?await t.page(a.path,a.page):null;t.assertActive();for(let u of a.notes)i.set(u,lr(u.anchor,l,d)),n.positions&&s.set(u,On(u.anchor,d))}else{let l=await t.file(a.path);t.assertActive();let c=l?.replace(/\r\n?/g,`
`).split(`
`)??[];for(let d of a.notes)i.set(d,ur(d.anchor,l,c)),n.positions&&s.set(d,On(d.anchor,l))}return t.assertActive(),{statuses:new Map(e.filter(a=>i.get(a)!=="ok").map(a=>[a.id,i.get(a)])),keys:n.positions?new Map(e.map(a=>[a.id,s.get(a)])):new Map}}function gt(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function fr(e){let t=await y.vault.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var re=e=>r.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?r.createElement("title",null,e.title):null,e.children),pr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),r.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),mr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M12 5v14M5 12h14"})),Zt=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),r.createElement("path",{d:"M2 12h20"})),Xt=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"11",cy:"11",r:"8"}),r.createElement("path",{d:"m21 21-4.3-4.3"})),gr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),Yt=e=>r.createElement(re,{...e},r.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),ht=e=>r.createElement(re,{...e},r.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),r.createElement("path",{d:"M4 22v-7"})),hr=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"1"}),r.createElement("circle",{cx:"19",cy:"12",r:"1"}),r.createElement("circle",{cx:"5",cy:"12",r:"1"})),br=e=>r.createElement(re,{...e},r.createElement("path",{d:"M12 20h9"}),r.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),yr=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h18"}),r.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),r.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),Rn=e=>r.createElement(re,{...e},r.createElement("path",{d:"M20 6 9 17l-5-5"})),wr=e=>r.createElement(re,{...e},r.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),vr=e=>r.createElement(re,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"8"}),r.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),r.createElement("circle",{cx:"12",cy:"12",r:"2"})),Ze=e=>r.createElement(re,{...e},r.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),r.createElement("path",{d:"M12 9v4M12 17h.01"})),Xe=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),r.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),Ye=e=>r.createElement(re,{...e},r.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),r.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var q={type:"string",maxLength:1048576},Jt={type:"array",items:q,maxItems:1e4},_e=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Fe=(e,t={},n=[])=>_e({type:{const:e},...t},["type",...n]),Dn={oneOf:[Fe("none"),Fe("pdf-page",{page:{type:"integer",minimum:1},snippet:q},["page"]),Fe("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),Fe("markdown-line",{line:{type:"integer",minimum:1},snippet:q},["line"]),Fe("markdown-heading",{heading:q,line:{type:"integer",minimum:1}},["heading"]),Fe("markdown-snippet",{snippet:q,line:{type:"integer",minimum:1}},["snippet"]),Fe("web-selection",{snippet:q},["snippet"])]},Sr=_e({id:q,path:q,url:q,pathHistory:Jt,note:q,flagged:{type:"boolean"},tags:Jt,anchor:Dn,fileKey:_e({dev:{type:"number"},ino:{type:"number"}},["dev","ino"]),createdAt:q,updatedAt:q},["id","path","pathHistory","note","tags","anchor","createdAt","updatedAt"]),Vs=_e({note:{type:"string",minLength:1},tags:Jt,flagged:{type:"boolean"},anchor:Dn});function Ae(e,t){throw Object.assign(new Error(t),{code:e,outcome:"not-applied",retryable:!1})}async function bt(e,t){try{return await xe(e,t)}catch(n){throw Object.assign(n instanceof Error?n:new Error(String(n)),{outcome:"unknown",retryable:!1})}}function ze(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected an object.");return e}function Oe(e,t){if(typeof e!="string"||!e.trim())throw new Error(`Expected ${t}.`);return e.trim()}function Us(e){let t=ze(e),n=i=>{let s=t[i];if(typeof s!="number"||!Number.isInteger(s)||s<1)throw new Error(`Invalid anchor ${i}.`);return s},o=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...o};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw new Error("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...o};case"markdown-heading":return{type:"markdown-heading",heading:Oe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:Oe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:Oe(t.snippet,"snippet")};default:throw new Error("Unsupported editable anchor.")}}function Nr(e){let t=ze(e);if(Object.keys(t).some(o=>!["note","tags","flagged","anchor"].includes(o)))throw new Error("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=Oe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(o=>typeof o=="string"))throw new Error("Expected a list of tags.");n.tags=[...new Set(t.tags.map(o=>o.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw new Error("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=Us(t.anchor)),n}function kr(e){return{...e,...e.tags?{tags:[...e.tags]}:{},...e.anchor?{anchor:{...e.anchor}}:{}}}async function Er(e,t,n){n.assertActive();let o=new ve(n.api);try{let i=await Ht(e,t,o);return n.assertActive(),i}finally{o.dispose()}}async function xe(e,t=te()){t.assertActive();let n=await t.reader.load({kind:"ids",ids:[e]});t.assertActive();let o=n.find(i=>i.id===e);return o||Ae("TARGET_NOT_FOUND","The SideNote no longer exists."),o}async function xr(e,t){try{await e()}catch(n){throw n?.outcome!=="not-applied"&&t(),n}t()}async function Ar(e,t,n){await we(async()=>{n.assertActive(),t||Ae("REVISION_CONFLICT","The SideNote state after this operation is unknown. Newer work was preserved.");let o=await xe(e,n);JSON.stringify(o)!==JSON.stringify(t)&&Ae("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved.")})}async function Mn(e,t,n,o,i=te()){let s=kr(t),a=o?{...o}:void 0,{previous:l,next:c}=await we(async()=>{i.assertActive();let h=oe(await xe(e,i));i.assertActive(),n!==void 0&&h.updatedAt!==n&&Ae("REVISION_CONFLICT","This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let S=s.anchor??h.anchor;return s.anchor&&((h.url?pt():mt(h.path)).includes(S.type)||Ae("INVALID_INPUT","This anchor does not apply to the SideNote subject."),S=await Er(h.path,S,i),i.assertActive()),{previous:h,next:oe({...h,...s,anchor:S,updatedAt:new Date().toISOString()})}});await Tn(e,c,l.updatedAt,a,i);let d=oe(await bt(e,i)),u=d,f=async h=>{let S=await we(async()=>{i.assertActive();let I=await xe(e,i);return JSON.stringify(I)!==JSON.stringify(u)&&Ae("REVISION_CONFLICT","The SideNote changed after this operation. Newer work was preserved."),I});await Tn(e,h,S.updatedAt,void 0,i),u=oe(await bt(e,i))};return{value:oe(d),revert:{label:"Edit SideNote",run:()=>f(l),reapply:()=>f(c)}}}async function Qt(e,t,n,o=!1){let i=te(e,n);i.assertActive();let s={path:t.path,url:t.url,anchor:{...t.anchor}};if(s.url){let a=await(o?e.links.open(s.url,{newTab:!0}):e.links.open(s.url));i.assertActive(),(a.status==="failed"||a.status==="unavailable")&&Ae("TARGET_UNAVAILABLE",a.message??"Destination unavailable")}else{let a=await e.vault.fileInfo(s.path);i.assertActive(),a||Ae("TARGET_NOT_FOUND","The annotation file no longer exists.");let l=s.anchor.type==="web-selection"?void 0:s.anchor;o?e.workspace.openFile(s.path,l,{newTab:!0}):e.workspace.openFile(s.path,l)}}function Ir(e){let t=!1,n=te(e,()=>{if(t)throw new Error("SideNotes commands are no longer active")}),o=async c=>{n.assertActive();let d={...c};if(d.id)return xe(d.id,n);let u=d.path?await e.vault.fileInfo(d.path):{url:d.url};return n.assertActive(),u},i={schema:_e({id:q},["id"]),parse:c=>({id:Oe(ze(c).id,"SideNote id")}),fromCli:c=>({id:c[0]})},s={schema:_e({id:q,newTab:{type:"boolean"}},["id"]),parse:c=>{let d=ze(c),u=Oe(d.id,"SideNote id");if(d.newTab!==void 0&&typeof d.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return d.newTab===!0?{id:u,newTab:!0}:{id:u}},fromCli:i.fromCli},a=c=>{let d={...c,outputSchema:c.id==="list"?{type:"array",items:Sr,maxItems:1e4}:Sr};return e.commands.register(d)},l=[a({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:_e({path:q,url:q,query:q,flagged:{type:"boolean"}}),parse:c=>{let d=c==null?{}:ze(c);for(let u of["path","url","query"])if(d[u]!==void 0&&typeof d[u]!="string")throw new Error(`Expected ${u} text.`);if(d.flagged!==void 0&&typeof d.flagged!="boolean")throw new Error("Expected a boolean flag.");return{path:d.path,url:d.url,query:d.query,flagged:d.flagged}}},run:async c=>{n.assertActive();let d={...c},u=await n.reader.load();return n.assertActive(),u.filter(f=>(!d.path||f.path===d.path)&&(!d.url||f.url===ne(d.url))&&(d.flagged===void 0||!!f.flagged===d.flagged)&&(!d.query||`${f.note} ${f.tags.join(" ")}`.toLowerCase().includes(d.query.toLowerCase())))}}),a({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:i,run:({id:c})=>xe(c,n)}),a({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"execute",input:s,run:async({id:c,newTab:d})=>{let u=await xe(c,n);return await Qt(e,u,n.assertActive,d),n.assertActive(),await e.workspace.revealOwnPanel("right_sidebar"),n.assertActive(),u}}),a({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:_e({path:q,url:q,note:{type:"string",minLength:1},tags:Jt,anchor:Dn},["note"]),parse:c=>{let d=ze(c),u=typeof d.path=="string"?d.path.trim():"",f=typeof d.url=="string"?d.url.trim():"";if(!!u==!!f)throw new Error("Provide exactly one file path or URL.");if(f&&!/^https?:\/\//i.test(f))throw new Error("Expected an HTTP or HTTPS URL.");return{path:u,url:f,...Nr({note:Oe(d.note,"note text"),tags:d.tags,anchor:d.anchor})}}},run:async c=>{let d=kr(c),u=await we(async()=>{if(n.assertActive(),d.path){let I=await e.vault.fileInfo(d.path);n.assertActive(),I||Ae("TARGET_NOT_FOUND","The annotation file does not exist.")}let h=d.anchor??{type:"none"};(d.url?pt():mt(d.path)).includes(h.type)||Ae("INVALID_INPUT","This anchor does not apply to the annotation subject.");let S=d.url?zt(ne(d.url),d.note,h,d.tags):Ft(d.path,d.note,await Er(d.path,h,n),d.tags);return n.assertActive(),S});await Vt(u,n);let f=oe(await bt(u.id,n));return{value:oe(u),revert:{label:"Create SideNote",run:async()=>{await Ar(u.id,f,n),await xr(()=>Bt(u.id,n),()=>{f=void 0})},reapply:async()=>{n.assertActive(),await Vt(u,n),f=oe(await bt(u.id,n))}}}},revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})}),a({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:_e({id:q,values:Vs,expectedUpdatedAt:q},["id","values"]),parse:c=>{let d=ze(c);return{id:Oe(d.id,"SideNote id"),values:Nr(d.values),expectedUpdatedAt:d.expectedUpdatedAt===void 0?void 0:Oe(d.expectedUpdatedAt,"revision")}}},run:({id:c,values:d,expectedUpdatedAt:u})=>Mn(c,d,u,void 0,n),revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})}),a({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:i,run:async({id:c})=>{let d=await we(async()=>{let f=oe(await xe(c,n));return n.assertActive(),f});await Bt(c,n);let u;return{value:oe(d),revert:{label:"Delete SideNote",run:async()=>{n.assertActive(),await Vt(d,n),u=oe(await bt(c,n))},reapply:async()=>{await Ar(c,u,n),await xr(()=>Bt(c,n),()=>{u=void 0})}}}},revision:c=>o(c),preview:c=>(n.assertActive(),{changes:c})})];return()=>{t=!0,l.forEach(c=>c())}}var en=({field:e,direction:t,options:n,onFieldChange:o,onDirectionChange:i,directionForField:s})=>{let[a,l]=r.useState(e),[c,d]=r.useState(t);return r.createElement("div",{className:"sidenote-sort-popover-body"},r.createElement("div",{className:"sidenote-sort-heading"},r.createElement("span",null,p("auto.90fd0e9a6276")),r.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(u=>r.createElement("button",{key:u,type:"button",className:`sidenote-sort-direction${c===u?" active":""}`,"aria-label":p(u==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":c===u,onClick:()=>{d(u),i(u)}},u==="asc"?r.createElement(Xe,null):r.createElement(Ye,null))))),r.createElement("div",{className:"sidenote-sort-options"},n.map(u=>r.createElement("button",{key:u.value,type:"button",className:`sidenote-popover-option${a===u.value?" active":""}`,"aria-pressed":a===u.value,onClick:()=>{let f=a!==u.value;l(u.value),o(u.value);let h=f?s?.(u.value):void 0;h&&(d(h),i(h))}},r.createElement("span",null,u.label),r.createElement(Rn,{className:"sidenote-popover-check"})))))},_r=({value:e,options:t,onChange:n})=>{let[o,i]=r.useState(e);return r.createElement("div",{className:"sidenote-sort-options sidenote-filter-options"},t.map(s=>r.createElement("button",{key:s.value,type:"button",className:`sidenote-popover-option${o===s.value?" active":""}`,"aria-pressed":o===s.value,onClick:()=>{i(s.value),n(s.value)}},r.createElement("span",null,s.label),r.createElement(Rn,{className:"sidenote-popover-check"}))))},Tr=({value:e,min:t,ariaLabel:n,onCommit:o})=>{let[i,s]=r.useState(String(e)),a=r.useRef(!1);r.useEffect(()=>{a.current||s(String(e))},[e]);let l=c=>{let d=Number(c),u=c.trim()===""||!Number.isFinite(d)?t:Math.max(t,d);s(String(u)),o(u)};return r.createElement("input",{type:"number",min:t,value:i,"aria-label":n,onFocus:()=>{a.current=!0},onChange:c=>{s(c.target.value);let d=Number(c.target.value);c.target.value.trim()!==""&&Number.isFinite(d)&&o(Math.max(t,d))},onBlur:c=>{a.current=!1,l(c.target.value)}})},Bs=({seconds:e,onCommit:t})=>{let[n,o]=r.useState(He(e)),i=r.useRef(!1);r.useEffect(()=>{i.current||o(He(e))},[e]);let s=()=>{let a=y.workspace.getMediaTime();a!==null&&(t(Math.max(0,a)),o(He(a)))};return r.createElement("div",{className:"sidenote-time-field"},r.createElement("input",{value:n,placeholder:"0:00","aria-label":p("auto.19eabc961735"),onFocus:()=>{i.current=!0},onChange:a=>{o(a.target.value);let l=Cn(a.target.value);l!==null&&t(l)},onBlur:a=>{i.current=!1;let l=Cn(a.target.value),c=l===null?0:Math.max(0,l);t(c),o(He(c))}}),r.createElement("button",{type:"button",className:"sidenote-time-capture",title:p("auto.528bfa4632ef"),onClick:s},p("auto.e3b82040565b")))},Ln=({path:e,web:t=!1,anchor:n,onChange:o,validationMsg:i,invalid:s})=>{let a=t?pt():mt(e),{SelectField:l}=y.ui.settings,c=y.ui.ComboField,[d,u]=r.useState([]);return r.useEffect(()=>{if(n.type!=="markdown-heading"){u([]);return}fr(e).then(u)},[e,n.type]),a.length===1&&n.type==="none"?r.createElement(r.Fragment,null):r.createElement("div",{className:`sidenote-anchor-editor${s?" invalid":""}`},r.createElement("div",{className:"sidenote-select-wrap"},r.createElement(l,{value:n.type,onChange:f=>o(dr(f,n)),ariaLabel:p("auto.9c36384c83fb"),options:a.map(f=>({value:f,label:t&&f==="none"?p("auto.eeb742ed8cac"):p(ut[f])}))})),n.type==="web-selection"&&r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.98c236df91df"),"aria-label":p("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&r.createElement(r.Fragment,null,r.createElement(Tr,{value:n.page,min:1,ariaLabel:p("auto.300721defdc9"),onCommit:f=>o({...n,page:f})}),r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:f=>o({...n,snippet:f.target.value||void 0}),placeholder:p("auto.2599b7d91cc5"),"aria-label":p("auto.1e149756b7c6")})),n.type==="media-time"&&r.createElement(Bs,{seconds:n.seconds,onCommit:f=>o({...n,seconds:f})}),n.type==="markdown-line"&&r.createElement(Tr,{value:n.line,min:1,ariaLabel:p("auto.7555728cb6e5"),onCommit:f=>o({...n,line:f})}),n.type==="markdown-heading"&&r.createElement(c,{value:n.heading,onChange:f=>o({...n,heading:f}),options:d.map(f=>({value:f,label:f})),placeholder:p("auto.a3089b7fae27"),ariaLabel:p("auto.353e665a44c8")}),n.type==="markdown-snippet"&&r.createElement("input",{value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.2e5ce5a06a35"),"aria-label":p("auto.ef6127596cae")}),i&&r.createElement("p",{className:"sidenote-anchor-warning"},i))},jn=({value:e,onChange:t,onSave:n,onCancel:o,autoFocus:i,disabled:s})=>r.createElement("textarea",{className:"sidenote-note-input",value:e,rows:4,autoFocus:i,disabled:s,"aria-label":p("sideNotes.field.note"),placeholder:p("sideNotes.field.note"),onChange:a=>t(a.target.value),onKeyDown:a=>{a.key==="Enter"&&y.ui.hasModKey(a)?(a.preventDefault(),n()):a.key==="Escape"&&o&&(a.preventDefault(),a.stopPropagation(),o())}}),tn=({note:e,onSaved:t,onClose:n})=>{let[o,i]=r.useState(e.note),[s,a]=r.useState(e.tags),[l,c]=r.useState(e.anchor),[d,u]=r.useState(!!e.flagged),[f,h]=r.useState(!1),[S,I]=r.useState(""),[x,k]=r.useState(),D={pluginId:"sideNotes",sourceId:"notes",itemId:e.id};r.useEffect(()=>{let O=!0;return y.documents.read({pluginId:"sideNotes",sourceId:"notes",itemId:e.id}).then($=>{O&&$&&k({expectedRevision:$.revision,vaultGeneration:$.vaultGeneration})}).catch($=>{O&&I($ instanceof Error?$.message:String($))}),()=>{O=!1}},[e.id]);let j=async()=>{if(!f)try{await y.documents.drafts.clear(D),n()}catch(O){I(O instanceof Error?O.message:String(O))}},_=async()=>{if(!(f||!o.trim())){h(!0),I("");try{if(!x)throw new Error(p("sideNotes.error.save"));let O=await Mn(e.id,{note:o,tags:s,anchor:l,flagged:d},e.updatedAt,x);y.undo.push({label:p("sideNotes.command.update"),undo:async()=>{try{return await O.revert.run(),{ok:!0}}catch($){return{ok:!1,message:String($)}}},redo:async()=>{try{return await O.revert.reapply(),{ok:!0}}catch($){return{ok:!1,message:String($)}}}}),t(O.value),await y.documents.drafts.clear(D),n()}catch(O){I(O instanceof Error?O.message:String(O))}finally{h(!1)}}},W=r.createElement("div",{className:"sidenote-edit-actions"},r.createElement("button",{className:"sidenote-cancel-btn",disabled:f,onClick:()=>{j()}},p("auto.77dfd2135f4d")),r.createElement("button",{className:"sidenote-save-btn",disabled:f||!o.trim()||!x,onClick:()=>{_()}},p("auto.efc007a393f6")));return r.createElement(y.ui.Modal,{title:p("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{j()},footer:W},r.createElement(jn,{value:o,onChange:i,onSave:()=>{_()},disabled:f,autoFocus:!0}),r.createElement(y.ui.TagInput,{value:s,onChange:a}),r.createElement(Ln,{path:e.path,web:!!e.url,anchor:l,onChange:c}),r.createElement("label",null,r.createElement("input",{type:"checkbox",checked:d,disabled:f,onChange:O=>u(O.target.checked)}),p("sideNotes.field.flagged")),S&&r.createElement("p",{role:"alert"},p("sideNotes.error.save")," ",S))},nn=({noteId:e,setOpenId:t,onEdit:n,onDelete:o,disabled:i=!1})=>r.createElement("div",{className:"sidenote-menu-wrap"},r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.5430d0e5fb8c"),title:p("auto.6bf5da9c080b"),disabled:i,onClick:s=>{s.stopPropagation(),t(e),y.ui.openMenu([{label:p("auto.5301648dcf6b"),icon:r.createElement(br,null),enabled:!i,onSelect:n},{label:p("auto.f6fdbe48dc54"),icon:r.createElement(yr,null),enabled:!i,danger:!0,onSelect:o}],{anchor:s.currentTarget,align:"end"}).finally(()=>t(null))}},r.createElement(hr,null)));function Ws(e){let t=[],n=e.replace(/#(\S+)/g,(o,i)=>(t.push(i.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function on(e,t,...n){let o=Ws(e);if(!o.tags.length&&!o.text)return!0;let i=t.map(s=>s.toLowerCase());for(let s of o.tags)if(!i.some(a=>a.startsWith(s)))return!1;return!(o.text&&!n.map(a=>a.toLowerCase()).some(a=>a.includes(o.text)))}var Fn={type:"object",properties:{v:{type:"literal",value:1},search:{type:"string"},filterWarning:{type:"boolean"},showAll:{type:"boolean"},compact:{type:"boolean"},sourceType:{type:"string"},sortField:{type:"string"},sortDir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]},aware:{type:"boolean"},path:{type:"string"},url:{type:"string"},noteId:{type:"string"}},required:["v","search","filterWarning","sortField","sortDir"],additionalProperties:!1};function Pe(){return y.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function yt(e=Pe()){for(let t of e.listeners)t()}function Or(e,t=Pe()){let n=t.listeners;return n.add(e),()=>{n.delete(e)}}function wt(e,t=Pe()){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...t.views.get(e)}}function fe(e,t,n){let o=()=>wt(e)[t]??n;return[r.useSyncExternalStore(Or,o,o),s=>{Pe().views.set(e,{...wt(e),[t]:typeof s=="function"?s(o()):s}),yt()}]}function Je(e,t){e?Pe().selected.set(t,e):Pe().selected.delete(t),yt()}function Pr(e,t){r.useEffect(()=>{let n=Pe(),o=wt("right_sidebar",n);if(o.path===e&&o.url===t)return;let i=n.views.get("right_sidebar"),s={...o,path:e,url:t};n.views.set("right_sidebar",s);let a=n.selected.get("right_sidebar"),l=a&&(a.path!==e||(a.url??"")!==t)?a:void 0;return l&&n.selected.delete("right_sidebar"),yt(n),()=>{let c=n.views.get("right_sidebar");if(!c||c.path!==e||c.url!==t)return;if(c===s&&!i)n.views.delete("right_sidebar");else if(c===s)n.views.set("right_sidebar",i);else{let f={...c};delete f.path,delete f.url,i&&"path"in i&&(f.path=i.path),i&&"url"in i&&(f.url=i.url),n.views.set("right_sidebar",f)}let d=wt("right_sidebar",n),u=n.selected.get("right_sidebar");(!u||u.path!==d.path||(u.url??"")!==d.url)&&(l?n.selected.set("right_sidebar",l):n.selected.delete("right_sidebar")),yt(n)}},[e,t])}function Ks(e,t=Pe()){let n=t.selected.get(e),o={...wt(e,t)};return o.path||delete o.path,{title:p("manifest.name"),view:o,...n?{item:{id:n.id,title:n.note.split(`
`)[0].slice(0,100),state:{...o,noteId:n.id}}}:{}}}function Cr(e){let t=Pe(),n=Te(),o=!1,i=()=>{if(o||!n.isActive())throw new Error("SideNotes surface is no longer active")},s=te(e,i),a=new Map,c=["left_sidebar","right_sidebar"].map(u=>Nn(e,{id:`sideNotes.${u}`,surface:u,getSnapshot:()=>Ks(u,t),subscribe:f=>Or(f,t),restore:async(f,h,S)=>{i(),f={...f};let I=S?.background===!0,x=(a.get(u)??0)+1;a.set(u,x);let k=()=>{if(i(),a.get(u)!==x)throw new Error("SideNotes surface restore was replaced")};if(f.v!==1)throw new Error("Unsupported SideNotes bookmark.");let D=typeof f.noteId=="string"?await xe(f.noteId,s):null;k();let j=async W=>{let O=await e.vault.fileInfo(W);return k(),!!O};if(u==="right_sidebar"&&!D&&typeof f.path=="string"&&f.path&&!await j(f.path))throw new Error("The bookmarked file no longer exists.");if(D&&!D.url&&!await j(D.path))throw new Error("The bookmarked file no longer exists.");!I&&D?await Qt(e,D,k):!I&&u==="right_sidebar"&&(typeof f.path=="string"&&f.path||typeof f.url=="string"&&f.url)&&await Qt(e,{path:typeof f.path=="string"?f.path:"",url:typeof f.url=="string"?f.url:void 0,anchor:{type:"none"}},k),k();let _={v:1};for(let W of["search","path","url","sourceType"])typeof f[W]=="string"&&(_[W]=f[W]);for(let W of["showAll","compact","filterWarning","aware"])_[W]=f[W]===!0;_.sortField=["position","updated","created","title"].includes(String(f.sortField))?f.sortField:u==="left_sidebar"?"updated":"position",_.sortDir=f.sortDir==="desc"?"desc":"asc",t.views.set(u,_),D?t.selected.set(u,D):t.selected.delete(u),yt(t)}},{stateSchema:Fn,itemStateSchema:{...Fn,required:[...Fn.required,"noteId"]},description:(f,h)=>typeof f.view.path=="string"&&f.view.path?f.view.path:p(h?"bookmark.item":"bookmark.view")})),d=0;return c.push(n.subscribe(()=>{if(o||!n.isActive())return;let u=++d,f=[...t.selected];f.length&&n.load({kind:"ids",ids:f.map(([,h])=>h.id)}).then(h=>{if(!(o||!n.isActive()||u!==d)){for(let[S,I]of f){if(t.selected.get(S)!==I)continue;let x=h.find(k=>k.id===I.id);x?t.selected.set(S,x):t.selected.delete(S)}for(let S of t.listeners)S()}}).catch(()=>{if(!o&&n.isActive()&&u===d)for(let h of t.listeners)h()})})),()=>{o=!0,c.forEach(u=>u())}}function rn(e,t,n=!1){if(e.url){n?y.links.open(e.url,{newTab:!0}):e.url!==t&&y.links.open(e.url);return}let o=e.anchor.type==="web-selection"?void 0:e.anchor;n?y.workspace.openFile(e.path,o,{newTab:!0}):y.workspace.openFile(e.path,o)}function Rr(e){return e.button!==1?!1:(e.preventDefault(),!0)}var Dr={position:"Position",created:"Created",updated:"Updated"},Gs={position:"asc",created:"desc",updated:"desc"},Mr=()=>{let e=Wo()??"",t=Ko(),n=!e&&!!t?.url,o=n&&t?ne(t.url):"",i=n?"":e,s=r.useMemo(()=>De(i),[i]),a=s==="pdf"||s==="video"||s==="audio"||s==="text",l=!!i||n,c=n?`web:${o}`:i;Pr(i,o);let{notes:d,setNotes:u,loading:f,error:h,reload:S}=Ge(n?{kind:"web",url:o}:i?{kind:"file",path:i}:{kind:"none"}),{isPending:I,setPending:x,pending:k}=Go(),[D,j]=r.useState(""),[_,W]=r.useState([]),[O,$]=r.useState(()=>Pn(i)),[ie,be]=r.useState(!1),[ke,Ve]=r.useState(null),[Se,Ce]=r.useState(null),[v,C]=fe("right_sidebar","search",""),[U,K]=fe("right_sidebar","filterWarning",!1),[M,J]=fe("right_sidebar","sortField",a?"position":"updated"),[ce,ye]=fe("right_sidebar","sortDir",a?"asc":"desc"),Q=!a&&M==="position"?"updated":M,se=!a&&M==="position"?"desc":ce,[pe,Ee]=r.useState(new Map),[me,ge]=r.useState({}),[et,sn]=r.useState("ok"),[an,b]=r.useState(!1),w=r.useRef(!1),[L,G]=r.useState(0),[T,ae]=r.useState(new Map),[le,Wr]=fe("right_sidebar","aware",!1),[dn,Un]=r.useState({}),[Kr,Gr]=r.useState(0),[Hr,qr]=r.useState(0),tt=Pt();r.useEffect(()=>y.files.onAnchorInfoChanged(()=>G(m=>m+1)),[]),r.useEffect(()=>tt.subscribe(()=>qr(m=>m+1)),[tt]);let Bn=r.useMemo(()=>{let m=Number(y.settings.get().mediaRangeSeconds);return Number.isFinite(m)&&m>=0?m:10},[Kr]);r.useEffect(()=>y.settings.subscribe(()=>Gr(m=>m+1)),[]);let cn=r.useCallback(()=>({pdfPages:i?y.workspace.getPdfVisiblePages(i):null,mediaSeconds:y.workspace.getMediaTime(),lineRange:i?y.workspace.getVisibleLineRange(i):null}),[i]);r.useEffect(()=>{if(!le||!i||!a){Un({});return}let m=()=>Un(cn());m();let g=y.files.onActivePositionChanged(m),P=s==="video"||s==="audio"?window.setInterval(m,1e3):void 0;return()=>{g(),P&&window.clearInterval(P)}},[le,i,s,a,cn]);let nt=r.useMemo(()=>n?d.filter(m=>m.url===o):i?d.filter(m=>m.path===i&&!m.url):[],[d,i,o,n]),St=r.useMemo(()=>{if(Q==="position"){let g=[...nt].sort((R,P)=>ar(R,P,T));return se==="desc"?g.reverse():g}let m=Q==="created"?"createdAt":"updatedAt";return[...nt].sort((g,R)=>{let P=g[m].localeCompare(R[m])||ft(g.anchor)-ft(R.anchor);return se==="asc"?P:-P})},[nt,Q,se,T]),Nt=r.useMemo(()=>{let m=v.trim()?St.filter(g=>on(v,g.tags??[],g.note)):St;return le&&a&&(m=m.filter(g=>ir(g.anchor,dn,Bn))),U&&(m=m.filter(g=>pe.has(g.id))),m},[St,v,U,pe,le,a,dn,Bn]),xt=r.useRef([]),[Zr,Wn]=r.useState(0);r.useEffect(()=>{xt.current=Nt.map(m=>m.id),Wn(m=>m+1)},[i,Q,se,v,U,le,dn]);let At=r.useMemo(()=>{let m=new Map(Nt.map(P=>[P.id,P])),g=[];for(let P of xt.current){let Z=m.get(P);Z&&g.push(Z)}let R=new Set(xt.current);for(let P of Nt)R.has(P.id)||g.push(P);return xt.current=g.map(P=>P.id),g},[Nt,Zr]),Xr=r.useMemo(()=>At.map(m=>m.id),[At]),Kn=Kt(r,{ids:Xr,estimate:140,pinned:[Se?.id,ke]});r.useEffect(()=>{$(n?{type:"none"}:Pn(i)),j(""),W([]),be(!1),J(a?"position":"updated"),ye(a?"asc":"desc")},[c]),r.useEffect(()=>{let m=new ve,g=Q==="position";return qt(nt,m,{path:i,positions:g}).then(({statuses:R,keys:P})=>{m.isActive()&&(Ee(R),ge(Z=>({...Z,projection:void 0})),g&&(ae(P),Wn(Z=>Z+1)))}).catch(R=>{R instanceof Ne||!m.isActive()||ge(P=>({...P,projection:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[nt,i,Q,L]),r.useEffect(()=>{if(!ie||!i){ge(g=>({...g,draft:void 0}));return}let m=new ve;return cr(i,O,m).then(g=>{m.isActive()&&(sn(g),ge(R=>({...R,draft:void 0})))}).catch(g=>{g instanceof Ne||!m.isActive()||ge(R=>({...R,draft:p("sideNotes.error.load")}))}).finally(()=>m.dispose()),()=>m.dispose()},[O,ie,i,L]);let Gn=async()=>{if(w.current)return;let m=D.trim();if(!(!m||!l)){w.current=!0,b(!0);try{let g=n?zt(o,m,O,_):Ft(i,m,await Ht(i,O),_);u(P=>[...P,g]),j(""),W([]),be(!1),await Io(g)||(u(P=>P.filter(Z=>Z.id!==g.id)),j(m),be(!0))}finally{w.current=!1,b(!1)}}},Hn=async(m,g)=>{if(I(m))return!1;let R=d.find(Z=>Z.id===m);if(!R)return!1;let P={...R,...g,updatedAt:new Date().toISOString()};x(m,!0),u(Z=>Z.map(H=>H.id===m?P:H));try{let Z=await Ke(m,P,R.updatedAt);return Z||u(H=>H.map(qn=>qn.id===m?R:qn)),Z}finally{x(m,!1)}},Yr=async m=>{if(I(m))return;let g=d.find(R=>R.id===m);if(g){x(m,!0),u(R=>R.filter(P=>P.id!==m));try{await Ut(m)||u(P=>P.some(Z=>Z.id===m)?P:[...P,g])}finally{x(m,!1)}}},Jr=async m=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Yr(m)},Qr=m=>Ce(m);r.useEffect(()=>{let m=tt.get();if(!m)return;let g=R=>{tt.consume(m),j(""),W([]),$(R),be(!0)};if(m.kind==="web"){n&&ne(m.url??"")===o&&g({type:"web-selection",snippet:m.snippet});return}m.kind==="file"&&m.path===i&&!n&&g({type:"pdf-page",page:m.page??1,snippet:m.snippet})},[i,o,n,Hr,tt]);let ei=(a?["position","created","updated"]:["updated","created"]).map(m=>({value:m,label:Dr[m]})),ti=m=>{y.ui.openPopover(()=>r.createElement(en,{field:Q,direction:se,options:ei,onFieldChange:g=>{J(g)},onDirectionChange:ye,directionForField:g=>Gs[g]}),{anchor:m,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})};return r.createElement("div",{className:"sidenotes-panel"},r.createElement("header",{className:"panel-header sidenotes-header"},r.createElement("div",{className:"panel-header-label sidenotes-title"},n?r.createElement(Zt,null):r.createElement(pr,null),r.createElement("span",{className:"panel-title",title:n?o:void 0},n?Ct(o):p("auto.7d660ae8b46e"))),r.createElement("div",{className:"sidenotes-header-actions"},a&&r.createElement("button",{className:`sidenote-icon-btn${le?" active":""}`,"aria-label":p("auto.580535153931"),title:le?p("auto.df4a8bd943cc"):p("auto.7b9b8574c69b"),onClick:()=>Wr(m=>!m)},r.createElement(vr,null)),pe.size>0&&r.createElement("button",{className:`sidenote-icon-btn${U?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>K(m=>!m)},r.createElement(Ze,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${se==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${Dr[Q]}`,"aria-haspopup":"dialog",onClick:m=>ti(m.currentTarget)},se==="asc"?r.createElement(Xe,null):r.createElement(Ye,null)),r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.7a7e81b96c3a"),title:p("auto.d48a73614c7f"),onClick:()=>{let m=!ie;be(m),m?$(n?{type:"none"}:sr(i,cn())):j("")},disabled:!l},r.createElement(mr,null)))),l?r.createElement(r.Fragment,null,r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Xt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:v,onChange:m=>C(m.target.value),placeholder:p("auto.49cd864445a9"),"aria-label":p("auto.f1b5671b118f")}),v&&r.createElement("button",{className:"search-field-action",onClick:()=>C(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Yt,null)))),ie&&r.createElement("div",{className:"sidenote-create"},r.createElement(jn,{value:D,onChange:j,onSave:()=>{Gn()},onCancel:()=>{be(!1),j(""),W([])},autoFocus:!0}),r.createElement(y.ui.TagInput,{value:_,onChange:W}),r.createElement(Ln,{path:i,web:n,anchor:O,onChange:$,invalid:!n&&et!=="ok",validationMsg:!n&&et!=="ok"?gt(O,et):void 0}),r.createElement("div",{className:"sidenote-create-actions"},r.createElement("button",{className:"sidenote-save-btn",onClick:()=>{Gn()},disabled:!D.trim()||an},p("auto.757092db3c4b")),St.length>0&&r.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{be(!1),j(""),W([])}},p("auto.77dfd2135f4d")))),r.createElement("div",{className:"sidenote-list",ref:Kn.ref},(h||me.projection||me.draft)&&r.createElement("div",{role:"alert"},h||me.projection||me.draft," ",r.createElement("button",{type:"button",onClick:()=>{S(),G(m=>m+1)}},p("sideNotes.action.retry"))),f?r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.33ce417454bf"))):At.length?Kn.render(m=>{let g=At[m],R=pe.get(g.id),P=R!==void 0,Z=k.has(g.id);return r.createElement("article",{key:g.id,"data-visible-key":g.id,"data-visible-index":m,className:`sidenote-card${g.flagged?" flagged":""}${P?" invalid":""}`,onClick:H=>{Je(g,"right_sidebar"),rn(g,o,y.ui.hasModKey(H))},onAuxClick:H=>{Rr(H)&&rn(g,o,!0)}},r.createElement("div",{className:"sidenote-card-meta",onClick:H=>H.stopPropagation(),onAuxClick:H=>H.stopPropagation()},g.anchor.type!=="none"&&r.createElement("button",{className:"sidenote-anchor-badge",onClick:H=>rn(g,o,y.ui.hasModKey(H)),onAuxClick:H=>{Rr(H)&&rn(g,o,!0)},title:g.url?p("auto.9ee309dcedc9"):`${g.path} \xB7 ${qe(g.anchor)}`},!g.url&&g.anchor.type==="markdown-heading"?g.path.split("/").pop():qe(g.anchor)),r.createElement("div",{className:"sidenote-card-btns"},P&&R&&r.createElement(Ze,{className:"sidenote-warning-icon",title:gt(g.anchor,R)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${g.flagged?" active":""}`,"aria-label":g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:g.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),disabled:Z,onClick:()=>{Hn(g.id,{flagged:!g.flagged})}},r.createElement(ht,null)),r.createElement(nn,{noteId:g.id,openId:ke,setOpenId:Ve,onEdit:()=>Qr(g),onDelete:()=>{Jr(g.id)},disabled:Z}))),r.createElement(r.Fragment,null,r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown",value:g.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:g.id},sourcePath:g.path||void 0},onChange:H=>{Hn(g.id,{note:H})}}),g.tags&&g.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:H=>H.stopPropagation()},g.tags.map(H=>r.createElement("span",{key:H,className:"sidenote-tag-view-pill"},"#",H)))))}):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,v?p("auto.b690846c83ff"):le&&a?p("auto.8f4043581269"):n?p("auto.8c8077ac2313"):p("auto.31b291dd535e"))))):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.34f6835f5ddf"))),Se&&r.createElement(tn,{key:Se.id,note:Se,onSaved:m=>{u(g=>g.map(R=>R.id===m.id?m:R)),Je(m,"right_sidebar")},onClose:()=>Ce(null)}))};var Hs=[".md",".mp3",".mp4",".pdf"];function Lr(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function jr(e){return/^\.[^./\\\s]+$/.test(e)}function vt(e){let n=(Array.isArray(e)?e:Hs).flatMap(o=>{if(typeof o!="string")return[];let i=Lr(o);return jr(i)?[at(`file${i}`)]:[]});return[...new Set(n)]}var Fr=()=>{let[e,t]=r.useState(()=>y.settings.get());r.useEffect(()=>y.settings.subscribe(()=>t(y.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,o=vt(e.filterTypes),{ChipsField:i,NumberField:s,Row:a,Section:l}=y.ui.settings,c=(d,u)=>{t(f=>({...f,[d]:u})),y.settings.set(d,u)};return r.createElement(l,null,r.createElement(a,{title:p("plugin.sideNotes.field.awareRange"),description:p("auto.204e47f6d7a2")},r.createElement(s,{value:n,step:1,ariaLabel:p("plugin.sideNotes.field.awareRange"),onChange:d=>{d!=null&&t(u=>({...u,mediaRangeSeconds:d}))},onCommit:d=>{d!=null&&c("mediaRangeSeconds",d)}})),r.createElement(a,{className:"sidenotes-filter-types-row",title:p("plugin.sideNotes.field.filterTypes"),description:p("plugin.sideNotes.field.filterTypesDesc")},r.createElement(i,{className:"sidenotes-filter-types-editor",items:o,onChange:d=>c("filterTypes",vt(d)),normalize:Lr,validate:d=>jr(d),placeholder:".png",ariaLabel:p("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var zr={updated:"Updated",created:"Created",name:"Name"},$e="all",zn="web",$n="no-extension";function Qe(e){return e.url?Ct(e.url):e.path.split("/").pop()??e.path}function $r(e){return e.url?zn:at(e.path)||$n}function Vr(e,t=!1){if(e.url){t?y.links.open(e.url,{newTab:!0}):y.links.open(e.url);return}let n=e.anchor.type==="web-selection"?void 0:e.anchor;t?y.workspace.openFile(e.path,n,{newTab:!0}):y.workspace.openFile(e.path,n)}function qs(e,t,n){if(n==="name"){let s=Qe(e).localeCompare(Qe(t),void 0,{sensitivity:"base"});return s!==0?s:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let o=n==="created"?"createdAt":"updatedAt",i=e[o].localeCompare(t[o]);return i!==0?i:Qe(e).localeCompare(Qe(t),void 0,{sensitivity:"base"})}var Ur=()=>{let{notes:e,setNotes:t,loading:n,error:o,reload:i}=Ge(),[s,a]=fe("left_sidebar","search",""),[l,c]=fe("left_sidebar","showAll",!1),[d,u]=fe("left_sidebar","sortField","updated"),[f,h]=fe("left_sidebar","sortDir","desc"),[S,I]=r.useState(new Map),[x,k]=r.useState(null),[D,j]=fe("left_sidebar","filterWarning",!1),[_,W]=fe("left_sidebar","sourceType",$e),[O,$]=fe("left_sidebar","compact",!1),[ie,be]=r.useState(null),[ke,Ve]=r.useState(null),[Se,Ce]=r.useState(0),[v,C]=r.useState(()=>{let b=y.settings.get();return vt(b.filterTypes)});r.useEffect(()=>y.files.onAnchorInfoChanged(()=>Ce(b=>b+1)),[]),r.useEffect(()=>y.settings.subscribe(()=>{let b=y.settings.get();C(vt(b.filterTypes))}),[]);let U=r.useMemo(()=>{let b=new Set(e.map($r)),w=[...b].filter(L=>L.startsWith(".")&&!v.includes(L)).sort();return[{value:$e,label:p("auto.6a72085653e4")},...v.map(L=>({value:L,label:L})),...w.map(L=>({value:L,label:L})),...b.has($n)?[{value:$n,label:p("sideNotes.filter.noExtension")}]:[],...b.has(zn)?[{value:zn,label:p("sideNotes.filter.web")}]:[]]},[e,v]);r.useEffect(()=>{n||o||U.some(b=>b.value===_)||W($e)},[_,U,W,n,o]);let K=r.useMemo(()=>{let b=l?e:e.filter(G=>G.flagged),w=_===$e?b:b.filter(G=>$r(G)===_);return[...s.trim()?w.filter(G=>on(s,G.tags??[],G.note,G.url??G.path)):w].sort((G,T)=>{let ae=qs(G,T,d);return f==="asc"?ae:-ae})},[e,s,l,_,d,f]),M=r.useRef([]),[J,ce]=r.useState(0);r.useEffect(()=>{M.current=K.map(b=>b.id),ce(b=>b+1)},[l,d,f,s,_]);let ye=r.useRef(!1);r.useEffect(()=>{n||ye.current||(ye.current=!0,M.current=K.map(b=>b.id),ce(b=>b+1))},[n]);let Q=r.useMemo(()=>{let b=D?K.filter(T=>S.has(T.id)):K,w=new Map(b.map(T=>[T.id,T])),L=[];for(let T of M.current){let ae=w.get(T);ae&&L.push(ae)}let G=new Set(M.current);for(let T of b)G.has(T.id)||L.push(T);return M.current=L.map(T=>T.id),L},[K,J,D,S]),se=r.useMemo(()=>Q.map(b=>b.id),[Q]),pe=Kt(r,{ids:se,estimate:O?64:140,pinned:[ke?.id,ie],layoutKey:O});r.useEffect(()=>{let b=new ve;return qt(K,b).then(({statuses:w})=>{b.isActive()&&(I(w),k(null))}).catch(w=>{w instanceof Ne||!b.isActive()||k(p("sideNotes.error.load"))}).finally(()=>b.dispose()),()=>b.dispose()},[K,Se]);let Ee=async(b,w)=>{let L=e.find(ae=>ae.id===b);if(!L)return;let G={...L,...w,updatedAt:new Date().toISOString()};t(ae=>ae.map(le=>le.id===b?G:le)),await Ke(b,G,L.updatedAt)||t(ae=>ae.map(le=>le.id===b?L:le))},me=async b=>{let w=e;t(G=>G.filter(T=>T.id!==b)),await Ut(b)||t(w)},ge=async b=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await me(b)},et=b=>Ve(b),sn=b=>{y.ui.openPopover(()=>r.createElement(en,{field:d,direction:f,options:Object.entries(zr).map(([w,L])=>({value:w,label:L})),onFieldChange:w=>u(w),onDirectionChange:h}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})},an=b=>{y.ui.openPopover(()=>r.createElement(_r,{value:_,options:U,onChange:W}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.0aafb761a83c")})};return r.createElement("div",{className:"panel"},r.createElement("div",{className:"panel-header"},r.createElement("span",{className:"panel-title"},p("auto.7d660ae8b46e")),r.createElement("div",{className:"sidenotes-header-actions"},r.createElement("button",{className:`sidenote-icon-btn${l?"":" active"}`,"aria-label":l?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),title:l?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),"aria-pressed":!l,onClick:()=>c(b=>!b)},r.createElement(ht,null)),S.size>0&&r.createElement("button",{className:`sidenote-icon-btn${D?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>j(b=>!b)},r.createElement(Ze,null)),r.createElement("button",{className:`sidenote-icon-btn${O?" active":""}`,"aria-label":p("auto.77f9b062ce1b"),title:O?p("auto.d2f76731e1e1"):p("auto.e3719eae891e"),onClick:()=>$(b=>!b)},r.createElement(wr,null)),r.createElement("button",{className:`sidenote-icon-btn${_!==$e?" active":""}`,"aria-label":p("auto.0aafb761a83c"),title:`${p("auto.0aafb761a83c")} \xB7 ${U.find(b=>b.value===_)?.label??p("auto.6a72085653e4")}`,"aria-haspopup":"dialog","aria-pressed":_!==$e,onClick:b=>an(b.currentTarget)},r.createElement(gr,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${f==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${zr[d]}`,"aria-haspopup":"dialog",onClick:b=>sn(b.currentTarget)},f==="asc"?r.createElement(Xe,null):r.createElement(Ye,null)))),r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Xt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:s,onChange:b=>a(b.target.value),placeholder:l?p("auto.49cd864445a9"):p("auto.7c0451dde956"),"aria-label":p("auto.ff4f3043a289")}),s&&r.createElement("button",{className:"search-field-action",onClick:()=>a(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Yt,null)))),r.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},(o||x)&&r.createElement("div",{role:"alert"},o||x," ",r.createElement("button",{type:"button",onClick:()=>{i(),Ce(b=>b+1)}},p("sideNotes.action.retry"))),n?r.createElement("div",{className:"tree-empty"},p("auto.33ce417454bf")):Q.length===0?r.createElement("div",{className:"tree-empty"},s||_!==$e?p("auto.b690846c83ff"):l?p("auto.d2a1e72bc320"):p("auto.f5ca64c680ee")):r.createElement("div",{className:"flagged-notes-list",ref:pe.ref},pe.render(b=>{let w=Q[b],L=S.get(w.id),G=L!==void 0;return r.createElement("div",{key:w.id,"data-visible-key":w.id,"data-visible-index":b,className:`flagged-note-card${w.flagged?" flagged":""}${G?" invalid":""}${O?" compact":""}`,onClick:T=>{Je(w,"left_sidebar"),Vr(w,y.ui.hasModKey(T))},onAuxClick:T=>{T.button===1&&(T.preventDefault(),Vr(w,!0))},title:w.url??w.path},r.createElement("div",{className:"flagged-note-header"},r.createElement("div",{className:"flagged-note-meta-row"},r.createElement("div",{className:"flagged-note-meta-left"},w.url?w.anchor.type!=="none"&&r.createElement("span",{className:"flagged-note-anchor"},qe(w.anchor)):r.createElement("span",{className:"flagged-note-anchor",title:`${w.path}${w.anchor.type!=="none"?` \xB7 ${qe(w.anchor)}`:""}`},Qe(w))),r.createElement("div",{className:"flagged-note-meta-right"},G&&L&&r.createElement(Ze,{className:"sidenote-warning-icon",title:gt(w.anchor,L)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${w.flagged?" active":""}`,"aria-label":w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),onClick:T=>{T.stopPropagation(),Ee(w.id,{flagged:!w.flagged})},onAuxClick:T=>T.stopPropagation()},r.createElement(ht,null)),r.createElement(nn,{noteId:w.id,openId:ie,setOpenId:be,onEdit:()=>et(w),onDelete:()=>{ge(w.id)}}))),w.url&&r.createElement("span",{className:"flagged-note-file"},r.createElement(Zt,{className:"flagged-note-web-icon"}),Qe(w))),O&&(()=>{let T=w.note.split(`
`).find(ae=>ae.trim())?.replace(/^#+\s*/,"").trim();return T?r.createElement("p",{className:"flagged-note-preview"},T):null})(),r.createElement(r.Fragment,null,!O&&r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:w.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:w.id},sourcePath:w.path||void 0},onChange:T=>{Ee(w.id,{note:T})}}),!O&&w.tags&&w.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:T=>T.stopPropagation(),onAuxClick:T=>T.stopPropagation()},w.tags.map(T=>r.createElement("span",{key:T,className:"sidenote-tag-view-pill"},"#",T)))))}))),ke&&r.createElement(tn,{key:ke.id,note:ke,onSaved:b=>{t(w=>w.map(L=>L.id===b.id?b:L)),Je(b,"left_sidebar")},onClose:()=>Ve(null)}))};var Vn="notes-sidenotes-styles",Zs=`
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

`;function Br(){let e=document.getElementById(Vn);return e||(e=document.createElement("style"),e.id=Vn,document.head.appendChild(e)),e.textContent=Zs,()=>{document.getElementById(Vn)===e&&e.remove()}}function Xs(e){Bo(e),yo(e);let t=Te(),n=!1,o=te(e,()=>{if(n)throw new Error("SideNotes registration is no longer active")}),i=Br(),s=Ir(e),a=Cr(e),l=e.files.onRenamed(({oldPath:k,newPath:D})=>{o.isActive()&&Oo(k,D,o).catch(j=>console.error("SideNotes could not retarget notes",j))}),c=e.files.onLineShift(({path:k,fromLine:D,delta:j})=>{o.isActive()&&Po(k,D,j,o).catch(_=>console.error("SideNotes could not shift anchors",_))}),d=Pt(),u=async k=>{if(!(!k||!o.isActive())){if(k={...k},k.surface==="web"){if(!k.url||!k.text.trim())return;d.publish({kind:"web",url:k.url,snippet:k.text.trim().slice(0,200)})}else{if(!k.path||!k.page)return;let D=await e.workspace.getPdfPageText(k.path,k.page).catch(()=>null);if(!o.isActive())return;let j=Jo({path:k.path,page:k.page,text:k.text},D);if(!j)return;d.publish(j)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(bn,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:u}),h={id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"execute",outputSchema:{type:"null"},input:{schema:{type:"object",properties:{},additionalProperties:!1},parse:()=>{}},run:async()=>{if(!o.isActive())return null;let k=e.getState().activePath,D=k&&De(k)==="pdf"?Qo(k,e.workspace.getTextSelection()):null;return D&&await u({surface:"pdf",...D}),null}},S=e.commands.register(h);e.registerView("sideNotes.panel",Mr),e.registerView("sideNotes.flagged",Ur),e.registerView("sideNotes.settings",Fr);let I=qo(),x=Xo(e);return()=>{n=!0,t.dispose(),l(),s(),a(),c(),f(),S(),I(),x(),i()}}var Ys={register:Xs},vu=Ys;export{vu as default,Xs as register};
