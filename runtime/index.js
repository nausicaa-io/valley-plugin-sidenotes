var jr=Object.defineProperty;var Fr=(e,t,n)=>t in e?jr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var $=(e,t,n)=>Fr(e,typeof t!="symbol"?t+"":t,n);var St="valley";var Cs=`.${St}`,Os=`app.${St}`;function zr(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var $r=/^[a-zA-Z]:/;function Mn(e){if(typeof e!="string")return"";let t=zr(e);return!t||t==="."||$r.test(t)||t.split("/").some(n=>n==="..")?"":t}var X=`.${St}`,Vr="plugins",ot=`${X}/${Vr}`,Nt=`${ot}/packages`,Ms=`${Nt}/core`,Ls=`${Nt}/github`,js=`${Nt}/local`,Fs=`${Nt}/community`,zs=`${ot}/community.json`,$s=`${ot}/data`;var Vs=`${ot}/enabled.json`,Bs=`${ot}/sources.json`,Us=`${X}/state`,q=`${X}/settings`,Rn=`${X}/data`,Ln=`${X}/recovery`;var en=`${X}/accounts`,$e=`${X}/ai`,Ks=`${$e}/connections.json`,Gs=`${$e}/defaults.json`,Ws=`${$e}/budgets.json`,Hs=`${$e}/usage.sqlite`,qs=`${$e}/security/guards.json`,Xs=`${$e}/security/activity.sqlite`,Zs=`${en}/providers`,Ys=`${en}/providers.lock.json`,Br=`${X}/trash`,Js=`${Br}/items`,tn=`${X}/cache`,Qs=`${tn}/accounts`,Ur=`${tn}/search`,ea=`${tn}/providers`;var ta=`${Ur}/index.jsonl`,na=`${Ln}/drafts`,oa=`${Ln}/transactions`;var De="design",Kr="themes",jn=`${X}/${De}/${Kr}`,ra=`${jn}/local`,ia=`${jn}/community`,sa={app:`${q}/app.json`,appearance:`${X}/${De}/appearance.json`,"icon-rail":`${X}/${De}/icon-rail.json`,"footer-rail":`${X}/${De}/footer-rail.json`,"new-tab":`${X}/${De}/new-tab.json`,pallette:`${X}/${De}/palette.json`,group:`${Rn}/groups.json`,units:`${Rn}/units.json`,metadata:`${q}/file-viewers.json`,notification:`${q}/notification.json`,"notification-settings":`${q}/notification-settings.json`,preferences:`${q}/preferences.json`,"link-actions":`${q}/link-actions.json`,markdown:`${q}/markdown.json`,editor:`${q}/editor.json`,"editor-vim":`${q}/editor-vim.json`,"markdown-todo":`${q}/markdown-todo.json`,"markdown-codeblocks":`${q}/markdown-codeblocks.json`,"markdown-template":`${q}/markdown-template.json`,"markdown-embeed":`${q}/markdown-embeed.json`,files:`${q}/file.json`,"file-sorter":`${q}/file-sorter.json`,"file-sym-link":`${q}/file-sym-link.json`,search:`${q}/search.json`,"search-tag":`${q}/search-tag.json`,"search-content":`${q}/search-content.json`,design:`${X}/${De}/appearance.json`,accounts:`${en}/connections.json`};var Gr=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Fn=16384;var zn=new Set(["__proto__","prototype","constructor"]);function $n(e){let t=0;for(let n of e){let o=n.codePointAt(0);t+=o<=127?1:o<=2047?2:o<=65535?3:4}return t}function xt(e){let t=new WeakSet,n=0,o=(i,d)=>{if(++n>8192||d>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if($n(i)>Fn)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let a=Array.isArray(i),c=Object.getPrototypeOf(i);if(!(!a&&c!==null&&(Object.getPrototypeOf(c)!==null||typeof Object.getOwnPropertyDescriptor(c,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(c,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let l=Reflect.ownKeys(i);if(l.length+n>8192||l.some(v=>typeof v=="string"&&zn.has(v)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(a){let v=u.length?.value;if(!Number.isSafeInteger(v)||v>8192)throw new Error("Bookmark state is too complex");return Array.from({length:v},(A,C)=>{let h=u[String(C)];return h&&"value"in h?o(h.value,d+1)??null:null})}let f={};for(let v of Object.keys(u).sort()){if(zn.has(v))throw new Error("Invalid bookmark state key");let A=u[v];if(!A.enumerable||!("value"in A)){n++;continue}let C=o(A.value,d+1);C!==void 0&&(f[v]=C)}return f}finally{t.delete(i)}}},s=o(e,0);if(!s||typeof s!="object"||Array.isArray(s))throw new Error("Invalid bookmark state");if($n(JSON.stringify(s))>Fn)throw new Error("Bookmark state is too large");return s}function Un(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Mn(e);if(!t)throw new Error("Invalid bookmark path");return t}function nn(e,t,n){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${n}`);return e.trim().normalize("NFC")}function Vn(e){let n=(e.target?["path","filePath","file"].flatMap(s=>typeof e.target.state[s]=="string"?[e.target.state[s]]:[]):[e.folderPath]).join(" "),o=/\.[^./]+$/.exec(n)?.[0]??"";return[e.title,e.description,n,o,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function on(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Gr.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let n=xt(t.state);return n.path!==void 0&&(n.path=Un(n.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:n,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Wr=/^[A-Za-z0-9_-]{1,64}$/;function Bn(e,t){if(typeof e!="string"||!Wr.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Kn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,n=nn(t.title,512,"title"),o={...t.description===void 0?{}:{description:nn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:nn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},s=t.group===void 0?{}:{group:Bn(t.group,"group")};if(t.groupId!==void 0){let a=Bn(t.groupId,"group id");if(!n||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:n,groupId:a,...o,...s}}if(t.target!==void 0){let a={folderPath:"",title:n,target:on(t.target),...o,...s};return{...a,searchText:Vn(a)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let d={folderPath:Un(t.folderPath),title:n,...o,...s};return{...d,searchText:Vn(d)}}function Re(e){let t=0,n=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),o=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),s=(i,d)=>{if(++t>2048||d>32||!n(i)||typeof i.type!="string")return!1;let a=(...c)=>Object.keys(i).every(l=>l==="type"||c.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?a():i.type==="literal"?a("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?a("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&s(i.items,d+1):i.type==="tuple"?a("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(c=>s(c,d+1)):i.type==="union"?a("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(c=>s(c,d+1)):i.type==="object"?a("properties","required","additionalProperties")&&n(i.properties)&&Object.entries(i.properties).every(([c,l])=>o(c)&&s(l,d+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(c=>typeof c=="string"&&Object.hasOwn(i.properties,c)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return s(e,0)}function At(e,t,n=1e5){let o=Math.max(1,Math.min(1e6,Math.floor(n))),s=new WeakSet,i=(d,a,c)=>{if(--o<0||c>64)return!1;if(d.type==="unknown")return!0;if(d.type==="null")return a===null;if(d.type==="literal")return a===d.value;if(d.type==="union")return d.anyOf.some(l=>i(l,a,c+1));if(d.type==="number")return typeof a=="number"&&Number.isFinite(a);if(d.type==="string"||d.type==="boolean"||d.type==="function")return typeof a===d.type;if(!a||typeof a!="object"||s.has(a))return!1;s.add(a);try{return d.type==="array"?Array.isArray(a)&&a.length<=(d.maxItems??1e5)&&a.every(l=>i(d.items,l,c+1)):d.type==="tuple"?Array.isArray(a)&&a.length>=(d.minItems??d.items.length)&&a.length<=d.items.length&&a.every((l,u)=>i(d.items[u],l,c+1)):d.type==="object"?Array.isArray(a)||d.required?.some(l=>!Object.hasOwn(a,l))?!1:Object.entries(a).every(([l,u])=>Object.hasOwn(d.properties,l)?i(d.properties[l],u,c+1):d.additionalProperties===!0):!1}finally{s.delete(a)}};return i(e,t,0)}var Hr=new Map;function F(e,t,n,o,s,i,d,a,c="owner"){let l=Object.freeze({id:e,kind:t,version:n,cardinality:o,validate:s,identities:i,identityScope:c,serviceCalls:d,serviceMetadata:a});return Hr.set(`${t}:${e}@${n}`,l),l}var sn=256;var x=e=>!!e&&typeof e=="object"&&!Array.isArray(e),B=(e,t)=>typeof e[t]=="function",Me=e=>e===void 0,Ve=e=>typeof e=="boolean",k=e=>typeof e=="string",re=e=>e===void 0||k(e),qr=e=>e===void 0||typeof e=="number",Xr=e=>e===void 0||typeof e=="boolean",j=(e,t)=>e.length===t.length&&t.every((n,o)=>n(e[o])),J=e=>x(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Gn=e=>x(e),Hn=e=>x(e)&&k(e.id)&&k(e.title)&&k(e.date)&&(e.documentRef===void 0||x(e.documentRef)&&k(e.documentRef.pluginId)&&k(e.documentRef.sourceId)&&k(e.documentRef.itemId)),Zr=e=>x(e)&&k(e.date)&&re(e.startTime)&&re(e.endTime)&&re(e.sourceId)&&re(e.itemId),Yr=e=>x(e)&&k(e.url)&&re(e.title)&&Xr(e.newTab),Jr=e=>x(e)&&k(e.query),qn=e=>x(e)&&k(e.name)&&re(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Qr=e=>Array.isArray(e)&&e.every(qn),ei=e=>e===null||qn(e),ti=e=>e===void 0||x(e)&&re(e.approvalToken)&&(e.cancellation===void 0||x(e.cancellation)),ni=e=>typeof e=="string"||x(e)&&typeof e.text=="string",oi=e=>x(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&x(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&re(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Xn=e=>x(e)&&k(e.id)&&k(e.label)&&re(e.labelKey)&&re(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Xn)),Zn={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Hn)},create:{args:e=>j(e,[k,Gn]),result:Ve},update:{args:e=>j(e,[k,Gn]),result:Ve},remove:{args:e=>j(e,[k]),result:Ve},open:{args:e=>j(e,[k]),result:Me},configure:{args:e=>e.length===0,result:Me},actions:{args:e=>j(e,[k]),result:e=>Array.isArray(e)&&e.every(Xn)},runAction:{args:e=>j(e,[k,k]),result:Ve}},Yn=e=>x(e)&&k(e.name)&&k(e.version)&&re(e.description)&&re(e.author)&&(e.localized===void 0||x(e.localized)&&Object.values(e.localized).every(t=>x(t)&&k(t.name)&&re(t.description))),ri=F("calendar.itemSource","service","1.3.0","many",e=>x(e)&&B(e,"list")&&(e.integration===void 0||Yn(e.integration)),void 0,Zn,e=>e.integration),kt=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,rn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,ii=e=>x(e)&&kt(e.startDate)&&kt(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=sn&&(e.cursor===void 0||rn(e.cursor)),si=e=>x(e)&&rn(e.revision)&&(e.cursor===void 0||rn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=sn&&e.items.every(t=>Hn(t)&&kt(t.date)&&(t.endDate===void 0||kt(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,ai=F("calendar.itemSource","service","2.0.0","many",e=>x(e)&&B(e,"list")&&(e.integration===void 0||Yn(e.integration)),void 0,{...Zn,list:{args:e=>j(e,[ii]),result:si}},e=>e.integration),di=F("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),ci=F("calendar.navigator","service","1.0.0","one",e=>x(e)&&B(e,"openDate"),void 0,{openDate:{args:e=>j(e,[Zr]),result:Me}}),li=F("calendar.panelSelection","state","1.0.0","one",e=>x(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),rt=F("web.activeContext","state","1.0.0","one",e=>x(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Wn(e){return x(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>x(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var ui=F("contacts.directory","service","1.0.0","one",e=>x(e)&&["search","resolveEmails","open"].every(t=>B(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Wn)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>x(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Wn))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||x(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Me}}),pi=F("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),fi=F("web.navigator","service","1.0.0","one",e=>x(e)&&B(e,"open"),void 0,{open:{args:e=>j(e,[Yr]),result:Me}}),an=F("selection.textAction","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&B(e,"run"),e=>[e.id]),gi=F("geo.navigator","service","1.0.0","one",e=>x(e)&&B(e,"open"),void 0,{open:{args:e=>j(e,[Jr]),result:Me}}),mi=F("geo.search","service","1.0.0","one",e=>x(e)&&B(e,"search")&&B(e,"reverse"),void 0,{search:{args:e=>j(e,[k]),result:Qr},reverse:{args:e=>j(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:ei}}),hi=F("agent.toolProvider","service","1.0.0","many",e=>x(e)&&Array.isArray(e.tools)&&e.tools.every(oi)&&B(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>j(e,[k,x,ti]),result:ni}},e=>({tools:e.tools}),"global"),bi=F("guard.runtime","service","1.0.0","one",e=>x(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>B(e,t)),void 0,{resolve:{args:e=>j(e,[x]),result:x},requestApproval:{args:e=>j(e,[x]),result:Ve},consumeToken:{args:e=>e.length>=1&&e.length<=2&&k(e[0])&&re(e[1]),result:Ve},audit:{args:e=>j(e,[x]),result:Me}}),yi=F("browser.automation","service","1.0.0","one",e=>x(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>B(e,t)),void 0,{list:{args:e=>e.length===0,result:J},open:{args:e=>j(e,[k]),result:J},switch:{args:e=>j(e,[k]),result:J},close:{args:e=>j(e,[k]),result:J},snapshot:{args:e=>j(e,[k]),result:J},readText:{args:e=>e.length>=1&&e.length<=2&&k(e[0])&&qr(e[1]),result:J},readHtml:{args:e=>j(e,[k]),result:J},screenshot:{args:e=>j(e,[k]),result:J},click:{args:e=>j(e,[k,t=>typeof t=="number"]),result:J},type:{args:e=>e.length>=3&&e.length<=4&&k(e[0])&&typeof e[1]=="number"&&k(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:J},select:{args:e=>j(e,[k,t=>typeof t=="number",k]),result:J},scroll:{args:e=>j(e,[k,t=>typeof t=="number",t=>typeof t=="number"]),result:J},pressKey:{args:e=>j(e,[k,k]),result:J},navigate:{args:e=>j(e,[k,k]),result:J},back:{args:e=>j(e,[k]),result:J},forward:{args:e=>j(e,[k]),result:J},reload:{args:e=>j(e,[k]),result:J}}),vi=F("fileTree.contextItem","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&typeof e.label=="string"&&re(e.labelKey)&&B(e,"run"),e=>[e.id]),wi=F("newTab.entry","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"run"),e=>[e.id]),dn=F("search.resultAction","extension","1.0.0","many",e=>x(e)&&typeof e.cardKind=="string"&&B(e,"open"),e=>[e.cardKind]),Si=F("search.resultCard","extension","1.0.0","many",e=>x(e)&&typeof e.cardKind=="string"&&B(e,"render")&&B(e,"open"),e=>[e.cardKind]),Ni=F("metadataPanel.segment","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"render"),e=>[e.id]),cn=F("workspace.surface","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&B(e,"getSnapshot")&&B(e,"subscribe")&&B(e,"restore"),e=>[e.id]),xi=F("metadata.plugin","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&B(e,"facts"),e=>[e.id]),Ai=F("workspace.viewState","extension","1.0.0","many",e=>x(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&B(e,"capture")&&B(e,"restore")&&B(e,"subscribe"),e=>[e.id]);var Et=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let n=Object.create(null),o=Reflect.ownKeys(e);if(o.length>32)throw new Error("Invalid bookmark descriptor");for(let s of o){if(typeof s!="string")continue;if(["__proto__","prototype","constructor"].includes(s))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,s);i?.enumerable&&"value"in i&&(n[s]=i.value)}return n},ln=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Jn=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Qn=e=>ln(e)&&typeof e.surface=="string"&&Jn.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function it(e){let t=Et(e);if(!Qn(t))throw new Error("Invalid bookmark descriptor");let n=on({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),o=Kn({folderPath:"",title:t.title,description:t.description,target:n});if(!o.title||typeof o.description!="string")throw new Error("Bookmark presentation is required");return{surface:n.surface,title:o.title,description:o.description,state:n.state,...n.instanceId===void 0?{}:{instanceId:n.instanceId},...n.itemId===void 0?{}:{itemId:n.itemId}}}function un(e){try{let t=it(e),n=Et(e);return JSON.stringify(t.state)===JSON.stringify(xt(n.state))}catch{return!1}}function ki(e){try{let t=Et(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:it(t.bookmark)}}catch{}return{status:"invalid"}}var Ei=e=>{try{let t=Et(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&un(t.bookmark)}catch{return!1}},Ii=e=>ln(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),eo=F("workspace.bookmark","service","1.0.0","many",e=>ln(e)&&typeof e.id=="string"&&Jn.has(String(e.surface))&&Re(e.stateSchema)&&(e.itemStateSchema===void 0||Re(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Qn(e[0]),result:Ei,sanitizeResult:ki},restore:{args:e=>e.length===1&&un(e[0]),result:Ii}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function pn(e,t,n){if(!Re(n.stateSchema)||n.itemStateSchema!==void 0&&!Re(n.itemStateSchema))throw new Error("Invalid bookmark state schema");let o=!0,s=(l,u,f=!1)=>At(f&&n.itemStateSchema?n.itemStateSchema:n.stateSchema,l,8192)&&(!n.validate||n.validate(l,u)),i=(l,u,f)=>{let v=f?void 0:n.primary?n.primary(l):l.item,A=xt(v?.state??l.view);if(!s(A,u,!!v))throw new Error("Invalid bookmark state");return it({...u,title:v?.title??l.title,description:n.description(l,!!v),state:A,...v?{itemId:v.id}:{}})},d={id:t.id,surface:t.surface,stateSchema:n.stateSchema,...n.itemStateSchema?{itemStateSchema:n.itemStateSchema}:{},capture(l){if(!o||l.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!o||l.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=it(l),!s(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:o?"restored":"unavailable"}}catch{return{status:"missing"}}}},a=e.interop.services.provide(eo,d),c;try{c=e.interop.extensions.provide(cn,{...t,getSnapshot(l){let u=t.getSnapshot(l),f={surface:t.surface,...l===void 0?{}:{instanceId:l}},v,A;try{v=i(u,f,!1)}catch{}try{A=i(u,f,!0)}catch{}return{...u,bookmark:v,bookmarkView:A}}})}catch(l){throw o=!1,a(),l}return()=>{o=!1,c(),a()}}var to=e=>!!e&&typeof e=="object"&&!Array.isArray(e),no=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function oo(e){if(!to(e)||!no(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(n=>typeof n=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(n))))return!1;let t=new Set;for(let n of e.items){if(!to(n)||!no(n.id)||t.has(n.id)||typeof n.label!="string"||!n.label.trim()||n.label.length>256||n.labelKey!==void 0&&typeof n.labelKey!="string"||n.available!==void 0&&typeof n.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(n.kind)))return!1;t.add(n.id)}return e.defaultItems.every(n=>typeof n=="string"&&t.has(n))&&new Set(e.defaultItems).size===e.defaultItems.length}var Ti=F("workspace.details","extension","1.0.0","many",oo,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var La=[X,`${X}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Ha=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var Pi=[".ttf",".otf",".woff",".woff2"],Ci=[".csv"],Oi=[".base"],Di=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Ri=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],Mi=[...Di,...Ri,".ico",".flavicon"];var Li=[".pdf"],ji=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Fi=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],zi=[".srt",".vtt",".ass"],$i=[".stl",".obj",".glb",".gltf"],Vi=[".bin",".mtl"];function st(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var Bi={type:"core",id:"valley"},N=(e,t,n,o,s={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:o,owner:Bi,...s});function Ui(e){let t={};for(let[n,o]of e)for(let s of n)t[s]=o;return t}var Ki=Ui([[[".mermaid",".mmd"],N("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],N("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],N("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],N("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],N("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Pi,N("font","font","font","media")],[[".epub",".mobi",".azw3"],N("ebook","ebook","ebook","documents")],[[".djvu"],N("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],N("comic","comic","comic","documents")],[[".md",".markdown"],N("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],N("text","text","text","notes")],[[".json"],N("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],N("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Ci,N("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Oi,N("base","base","fallback","data")],[Mi,N("image","image","image","media",{information:["identity","dimensions","exif"]})],[Li,N("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[ji,N("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Fi,N("video","video","video","media",{information:["identity","media","video-codec"]})],[zi,N("text","subtitle","text","media")],[$i,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[Vi,N("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],N("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],N("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],N("docx","word","opendocument","documents")],[[".ods"],N("csv","excel","opendocument","data")],[[".odp"],N("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],N("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],N("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],N("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],N("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],N("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],N("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],N("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],N("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],N("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],N("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],N("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],N("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],N("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],N("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],N("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],N("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],N("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],N("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],N("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],N("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],N("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],N("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],N("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],N("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],N("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],N("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],N("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Gi=N("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Wi(e){return Ki[st(e)]??Gi}function _e(e){return Wi(e).kind}var r,y,Ee=0;function ro(e){Ee++,y=e,r=e.React}function It(){return y.runtime.getOrCreate("sideNotes.editRequest",()=>{let e=null,t=new Set;return{get:()=>e,publish:n=>{e=n;for(let o of t)o()},subscribe:n=>(t.add(n),()=>{t.delete(n)})}})}function Tt(){return y.runtime.getOrCreate("sideNotes.selectionDraft",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},consume:t=>{if(e.value===t){e.value=null;for(let n of[...e.listeners])n()}},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function Q(e){let t=(e??"").trim();if(!t)return"";try{let n=new URL(t);n.hash="",n.protocol=n.protocol.toLowerCase(),n.hostname=n.hostname.toLowerCase(),n.pathname==="/"&&(n.pathname="");let o=n.toString();return n.search?o:o.replace(/\/$/,"")}catch{return t}}function _t(e){try{return new URL(e).hostname.replace(/^www\./,"")||e}catch{return e}}var Be="sideNotes.notes",fn="sideNotes.note_tags",gn="sideNotes.path_history",Pt=100,Hi=32,io=4096,qi=4*1024*1024;function Xi(e){return e?e.kind==="none"?"none":e.kind==="ids"?JSON.stringify(["ids",[...new Set(e.ids)].sort()]):JSON.stringify(e.kind==="file"?["file",e.path,e.includeWeb===!0]:["web",Q(e.url)]):"all"}async function so(e){let t=await Promise.allSettled(e),n=t.find(o=>o.status==="rejected");if(n?.status==="rejected")throw n.reason;return t.map(o=>o.value)}var Ct=class{constructor(t,n,o){$(this,"api",t);$(this,"isCurrent",n);$(this,"normalize",o);$(this,"revision",0);$(this,"catalogRevision",0);$(this,"catalog",null);$(this,"catalogKeys",new Set);$(this,"dirtyKeys",new Set);$(this,"sourceRevision",null);$(this,"vaultGeneration",null);$(this,"catalogPending",null);$(this,"pending",new Map);$(this,"disposed",!1);$(this,"disposers");$(this,"listeners",new Set);this.disposers=[Be,fn,gn].map(s=>t.data.dataset(s).subscribe(i=>{if(!this.isActive())return;this.revision++;let d=this.vaultGeneration!==null&&this.vaultGeneration!==i.vaultGeneration;if(this.vaultGeneration=i.vaultGeneration,d&&(this.catalogRevision++,this.sourceRevision=null,this.resetCatalog()),s===Be&&(this.catalogRevision++,this.changeSubjects(i)),this.isActive())for(let a of this.listeners)a()})),this.disposers.push(t.subscribe(()=>{this.isCurrent()||this.dispose()}))}isActive(){return!this.disposed&&this.isCurrent()}subscribe(t){return this.isActive()?(this.listeners.add(t),()=>{this.listeners.delete(t)}):()=>{}}dispose(){if(!this.disposed){this.disposed=!0,this.resetCatalog(),this.listeners.clear();for(let t of this.disposers)t();this.disposers=[]}}assertActive(){if(!this.isActive())throw new Error("SideNotes reader is no longer active")}resetCatalog(){this.catalog=null,this.catalogKeys.clear(),this.dirtyKeys.clear()}changeSubjects(t){let n=this.sourceRevision;if(this.sourceRevision=Number.isSafeInteger(t.revision)&&t.revision>=0?t.revision:null,!this.catalog||n===null||this.sourceRevision!==n+1||!t.keys?.length||t.keys.length>io){this.resetCatalog();return}for(let o of t.keys){if(!o||typeof o!="object"||Array.isArray(o)||Object.keys(o).length!==1||typeof o.id!="string"||!this.catalogKeys.has(o.id)){this.resetCatalog();return}this.dirtyKeys.add(o.id)}}retainSubjects(t){if(this.resetCatalog(),t.length>io)return;let n=0;for(let o of t){if(typeof o.id!="string"||this.catalogKeys.has(o.id)){this.resetCatalog();return}this.catalogKeys.add(o.id);for(let s of["id","path","url"])typeof o[s]=="string"&&(n+=o[s].length*2);if(n>qi){this.resetCatalog();return}}this.catalog=t}async rows(t,n={},o){let s=[],i;do{this.assertActive();let d=await this.api.data.dataset(t).query({...n,limit:1e3,cursor:i});this.assertActive(),o?.(d.revision),s.push(...d.rows),i=d.cursor}while(i);return s}subjects(){if(this.catalogPending)return this.catalogPending;if(this.catalog&&!this.dirtyKeys.size)return Promise.resolve(this.catalog);let t=(async()=>{for(;;){let o=this.catalogRevision,s=this.catalog,i=[...this.dirtyKeys],d=this.sourceRevision,a,c=l=>{if(!Number.isSafeInteger(l)||l<0||a!==void 0&&l!==a)throw new Error("SideNotes catalog changed during read");a=l};try{let l;if(s){let u=new Map;for(let v=0;v<i.length;v+=Pt){let A=i.slice(v,v+Pt),C=await this.rows(Be,{select:["id","path","url"],where:{id:{in:A}}},c);for(let h of C){if(typeof h.id!="string"||!A.includes(h.id))throw new Error("Invalid SideNotes catalog key");u.set(h.id,h)}if(o!==this.catalogRevision)break}if(o!==this.catalogRevision)continue;if(a!==d){this.resetCatalog();continue}let f=new Set(i);l=s.flatMap(v=>{if(!f.has(String(v.id)))return[v];let A=u.get(String(v.id));return A?[A]:[]})}else l=await this.rows(Be,{select:["id","path","url"]},c);if(this.assertActive(),o!==this.catalogRevision)continue;if(a===void 0||d!==null&&a<d)throw new Error("SideNotes catalog revision is unavailable");return this.sourceRevision=a,this.retainSubjects(l),l}catch(l){if(this.assertActive(),o!==this.catalogRevision)continue;throw this.resetCatalog(),l}}})();this.catalogPending=t;let n=()=>{this.catalogPending===t&&(this.catalogPending=null)};return t.then(n,n),t}async read(t){let n=[],o=[],s=[];if(!t)[n,o,s]=await so([this.rows(Be),this.rows(fn),this.rows(gn)]);else{let a=t.kind==="web"?Q(t.url):t.kind==="file"?t.path:"",c=t.kind==="ids"?new Set(t.ids):null;if(!a&&!c?.size)return[];let l=(await this.subjects()).filter(u=>{if(c)return typeof u.id=="string"&&c.has(u.id.trim());if(t.kind==="file"&&(typeof u.path!="string"||u.path.trim()!==a))return!1;let f=Q(typeof u.url=="string"?u.url:"");return t.kind==="web"?f===a:t.kind==="file"&&t.includeWeb===!0||!f}).map(u=>u.id).filter(u=>typeof u=="string"&&!!u.trim());for(let u=0;u<l.length;u+=Pt){let f=l.slice(u,u+Pt),[v,A,C]=await so([this.rows(Be,{where:{id:{in:f}}}),this.rows(fn,{where:{noteId:{in:f}}}),this.rows(gn,{where:{noteId:{in:f}}})]);n.push(...v),o.push(...A),s.push(...C)}}let i=new Map;for(let a of o){if(typeof a.noteId!="string")continue;let c=i.get(a.noteId);c?c.push(a.tag):i.set(a.noteId,[a.tag])}let d=new Map;for(let a of s){if(typeof a.noteId!="string")continue;let c=d.get(a.noteId);c?c.push(a):d.set(a.noteId,[a])}for(let a of d.values())a.sort((c,l)=>Number(c.position)-Number(l.position));return n.map(a=>this.normalize({...a,tags:i.get(String(a.id))??[],pathHistory:(d.get(String(a.id))??[]).map(c=>c.path)})).filter(a=>a!==null)}load(t){if(!this.isActive())return Promise.reject(new Error("SideNotes reader is no longer active"));let n=Xi(t),o=this.pending.get(n);if(o)return o;if(this.pending.size>=Hi)return Promise.reject(new Error("Too many SideNotes reads"));let s=t?.kind==="ids"?{kind:t.kind,ids:[...t.ids]}:t?{...t}:void 0,i=(async()=>{for(;;){this.assertActive();let a=this.revision;try{let c=await this.read(s);if(this.assertActive(),a===this.revision)return c}catch(c){if(this.assertActive(),a===this.revision)throw c}}})();this.pending.set(n,i);let d=()=>{this.pending.get(n)===i&&this.pending.delete(n)};return i.then(d,d),i}};var Ot="sideNotes.notes",at="sideNotes.note_tags",mn="sideNotes.path_history";function co(){return`sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function dt(){return new Date().toISOString()}function ae(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function me(e){return typeof e=="string"?e:""}function Zi(e){if(!e||typeof e!="object")return{type:"none"};let t=e,n=me(t.type);if(n==="pdf-page"){let o=me(t.snippet).trim();return{type:n,page:Math.max(1,Math.floor(ae(t.page,1))),...o?{snippet:o}:{}}}if(n==="pdf-region")return{type:n,page:Math.max(1,Math.floor(ae(t.page,1))),x:ae(t.x,0),y:ae(t.y,0),width:ae(t.width,.2),height:ae(t.height,.2)};if(n==="media-time")return{type:n,seconds:Math.max(0,ae(t.seconds,0))};if(n==="markdown-line"){let o=me(t.snippet).trim();return{type:n,line:Math.max(1,Math.floor(ae(t.line,1))),...o?{snippet:o}:{}}}if(n==="markdown-heading"){let o=me(t.heading).trim();return o?{type:n,heading:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ae(t.line,1)))}:{type:"none"}}if(n==="markdown-snippet"){let o=me(t.snippet).trim();return o?{type:n,snippet:o,line:t.line===void 0?void 0:Math.max(1,Math.floor(ae(t.line,1)))}:{type:"none"}}if(n==="image-region")return{type:n,x:ae(t.x,0),y:ae(t.y,0),width:ae(t.width,.25),height:ae(t.height,.25)};if(n==="web-selection"){let o=me(t.snippet).trim();return o?{type:n,snippet:o}:{type:"none"}}return{type:"none"}}function Yi(e){if(!e||typeof e!="object")return;let t=e;if(!(typeof t.dev!="number"||typeof t.ino!="number"))return{dev:t.dev,ino:t.ino}}function Ji(e){let t=me(e.id).trim(),n=me(e.path).trim(),o=Q(me(e.url)),s=me(e.note).trim();if(!t||!s||!n&&!o)return null;let i=me(e.createdAt)||dt(),d=Array.isArray(e.pathHistory)?e.pathHistory.filter(a=>typeof a=="string"&&a!==n):[];return{id:t,path:n,note:s,...o?{url:o}:{},pathHistory:[...new Set(d)],flagged:e.flagged===!0,tags:Array.isArray(e.tags)?e.tags.filter(a=>typeof a=="string"&&!!a.trim()).map(a=>a.trim()):[],anchor:Zi(e.anchor),fileKey:Yi(e.fileKey),createdAt:i,updatedAt:me(e.updatedAt)||i}}function de(e=y,t){let n=Ee,o=()=>{if(t?.(),e!==y||n!==Ee)throw new Error("SideNotes mutation session is no longer active")};o();let s=Te();return{api:e,reader:s,isActive:()=>{try{return o(),s.isActive()}catch{return!1}},assertActive:()=>{if(o(),!s.isActive())throw new Error("SideNotes mutation session is no longer active")}}}function Ie(e){return{...e,tags:[...e.tags],pathHistory:[...e.pathHistory],anchor:{...e.anchor},...e.fileKey?{fileKey:{...e.fileKey}}:{}}}async function lo(e,t){if(t.assertActive(),!e.path)return e;let n=await t.api.vault.stat(e.path);return t.assertActive(),n?{...e,fileKey:{dev:n.dev,ino:n.ino}}:e}function uo(e){return{id:e.id,path:e.path,url:e.url??null,note:e.note,flagged:e.flagged===!0,anchor:e.anchor,fileKey:e.fileKey?{dev:e.fileKey.dev,ino:e.fileKey.ino}:null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function ao(e,t,n){let o=[],s;do{e.assertActive();let i=await e.api.data.dataset(t).query({where:n,limit:1e3,cursor:s});e.assertActive(),o.push(...i.rows),s=i.cursor}while(s);return o}function po(e){return[...e.tags.map(t=>({dataset:at,operation:"insert",values:{noteId:e.id,tag:t}})),...e.pathHistory.map((t,n)=>({dataset:mn,operation:"insert",values:{noteId:e.id,position:n,path:t}}))]}async function Qi(e,t){let n=await Promise.allSettled([ao(e,at,{noteId:t}),ao(e,mn,{noteId:t})]),o=n.find(d=>d.status==="rejected");if(o?.status==="rejected")throw o.reason;e.assertActive();let[s,i]=n.map(d=>d.value);return[...s.map(d=>({dataset:at,operation:"delete",key:{noteId:t,tag:String(d.tag)}})),...i.map(d=>({dataset:mn,operation:"delete",key:{noteId:t,position:Number(d.position)}}))]}function Te(){let e=y,t=Ee,n=e.getState().vault?.path??null,o=e.runtime.getOrCreate("sideNotes.noteRepository",()=>({current:null}));return o.current?.isActive()||(o.current?.dispose(),o.current=new Ct(e,()=>{if(e!==y||t!==Ee)return!1;try{return(e.getState().vault?.path??null)===n}catch{return!1}},s=>Ji(s))),o.current}function Dt(e,t,n,o=[]){let s=dt();return{id:co(),path:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:s,updatedAt:s}}function Rt(e,t,n,o=[]){let s=dt();return{id:co(),path:"",url:e,pathHistory:[],note:t.trim(),flagged:!1,tags:o,anchor:n,createdAt:s,updatedAt:s}}async function Ue(e,t=de()){let n=await lo(Ie(e),t);try{return t.assertActive(),await t.api.data.transaction([{dataset:Ot,operation:"insert",values:uo(n)},...po(n)]),!0}catch{return!1}}async function Se(e,t,n,o,s=de()){let i=o?{...o}:void 0,d=await lo({...Ie(t),id:e},s);try{s.assertActive();let a={pluginId:s.api.pluginId,sourceId:"notes",itemId:e},c=await s.api.documents.read(a);if(s.assertActive(),!c)return!1;if(n!==void 0){let f=await s.api.data.dataset(Ot).get({id:e});if(s.assertActive(),f?.updatedAt!==n)return!1}let l=uo(d);delete l.id,delete l.note;let u=await Qi(s,e);return s.assertActive(),await s.api.documents.update(a,{expectedRevision:i?.expectedRevision??c.revision,vaultGeneration:i?.vaultGeneration??c.vaultGeneration,body:d.note,explicitTags:d.tags,operations:[{dataset:Ot,operation:"update",key:{id:e},values:l},...u.filter(f=>f.dataset!==at),...po(d).filter(f=>f.dataset!==at)]}),!0}catch{return!1}}async function Pe(e,t=de()){try{return t.assertActive(),(await t.api.data.dataset(Ot).delete({id:e})).affected>0}catch{return!1}}async function fo(e,t,n=de()){try{if(!e||!t||e===t)return;n.assertActive();let o=await n.reader.load();n.assertActive();let s=`${e}/`;for(let i of o){if(i.path!==e&&!i.path.startsWith(s))continue;let d=i.path===e?t:`${t}/${i.path.slice(s.length)}`,a={...i,path:d,pathHistory:[i.path,...i.pathHistory.filter(c=>c!==i.path)],updatedAt:dt()};n.assertActive(),await Se(i.id,a,void 0,void 0,n),n.assertActive()}}catch(o){if(n.isActive())throw o}}async function go(e,t,n,o=de()){try{if(!Number.isFinite(n)||n===0||!e)return;let s=Math.max(1,Math.floor(t));o.assertActive();let i=await o.reader.load();o.assertActive();for(let d of i){if(d.path!==e||d.anchor.type!=="markdown-line"||d.anchor.line<s)continue;let a={...d,anchor:{...d.anchor,line:Math.max(1,d.anchor.line+n)},updatedAt:dt()};o.assertActive(),await Se(d.id,a,void 0,void 0,o),o.assertActive()}}catch(s){if(o.isActive())throw s}}var mo={sidenotes:[{id:"currentNote",label:"Current note",labelKey:"markdown.examples.currentNote",code:"limit: 10"},{id:"otherFile",label:"Another file",labelKey:"markdown.examples.otherFile",code:`file: Apple/The Macintosh.md
limit: 10`},{id:"flagged",label:"Flagged notes",labelKey:"markdown.examples.flagged",code:`file: Apple/The Macintosh.md
flagged: true
limit: 10`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`file: Apple/The Macintosh.md
tag: #focus
limit: 10`}]};var ts=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,ns=/^-\s+(.*)$/,os=/^[A-Za-z][\w+.-]*:\/\//;function ho(e){let t={bare:null,values:{},lists:{}},n=null;for(let o of e.split(`
`)){let s=o.trim();if(!s||s.startsWith("#"))continue;let i=s.match(ns);if(i){n?t.lists[n].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let d=os.test(s)?null:s.match(ts);if(d){let a=d[1].trim().toLowerCase(),c=d[2].trim();c===""?(n=a,t.lists[a]=t.lists[a]??[]):(n=null,t.values[a]=c);continue}n=null,t.bare===null&&(t.bare=s)}return t}function bo(e,t,n=500){let o=e.values[t];if(o===void 0)return null;let s=Number.parseInt(o,10);return!Number.isFinite(s)||s<1?null:Math.min(s,n)}var yo={"auto.01e635f27ec2":"Desc","auto.042dc9b751ed":"Delete?","auto.08145698fd03":"Jump to anchor","auto.0aafb761a83c":"SideNotes filter","auto.19eabc961735":"Timestamp","auto.1e149756b7c6":"Text to highlight on this page","auto.204e47f6d7a2":"In Aware mode, audio/video notes within \xB1 this many seconds of the current playback time are shown.","auto.2599b7d91cc5":"Highlight text (optional)","auto.2e5ce5a06a35":"Text snippet","auto.300721defdc9":"PDF page","auto.31b291dd535e":"No SideNotes","auto.33ce417454bf":"Loading\u2026","auto.34f6835f5ddf":"Open a file, folder, or website","auto.353e665a44c8":"Markdown heading","auto.49cd864445a9":"Filter notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Highlighted text on this page","auto.4fee0a06b6e4":"Asc","auto.528bfa4632ef":"Use current playback time","auto.5301648dcf6b":"Edit","auto.5397e0583f14":"Yes","auto.5430d0e5fb8c":"Note options","auto.580535153931":"Aware mode","auto.6a72085653e4":"All","auto.6bf5da9c080b":"Options","auto.6d821dbb4d9c":"line {{p0}}","auto.70440046a3dc":"Notes","auto.73d64a823b7d":"Add tag\u2026","auto.746eb1a86a79":"Side notes","auto.74a3a904b38b":"Show only notes with anchor issues","auto.7555728cb6e5":"Markdown line","auto.757092db3c4b":"Add note","auto.77dfd2135f4d":"Cancel","auto.77f9b062ce1b":"Toggle compact view","auto.7a7e81b96c3a":"Create sidenote","auto.7b9b8574c69b":"Aware: show only notes for your current position","auto.7c0451dde956":"Filter flagged notes\u2026 (#tag)","auto.7d660ae8b46e":"SideNotes","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Note tags","auto.8c8077ac2313":"No notes for this page","auto.8f4043581269":"No notes here","auto.90fd0e9a6276":"Sort notes by","auto.94fd67ed6c0c":"Create SideNote from selection","auto.954a9a37711e":"Open SideNotes","auto.97dcfe139228":"Searches your side note text and tags.","auto.98c236df91df":"Selected text (optional)","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c36384c83fb":"SideNote anchor type","auto.9ee309dcedc9":"Open page","auto.a3089b7fae27":"Heading","auto.a774409a00c2":"Flag","auto.b32f39140566":"Path history","auto.b667d6f9f635":"Clear filter","auto.b690846c83ff":"No matching notes","auto.b855c604e861":"Unflag","auto.d2a1e72bc320":"No notes yet","auto.d2f76731e1e1":"Comfortable view","auto.d48a73614c7f":"New sidenote","auto.df4a8bd943cc":"Aware: showing notes for your current position","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e3b82040565b":"Now","auto.eeb742ed8cac":"Whole page","auto.ef6127596cae":"Markdown snippet","auto.efc007a393f6":"Save","auto.f1b5671b118f":"Filter sidenotes","auto.f545c86bbd6e":"No side notes here yet.","auto.f5ca64c680ee":"No flagged notes","auto.f61b9fcd0854":"Filter notes with anchor issues","auto.f6fdbe48dc54":"Delete","auto.f8db8a172be6":"Flagged","auto.ff4f3043a289":"Filter flagged notes","manifest.description":"Margin notes anchored to a file, a heading, a line, a PDF selection or a web page \u2014 with flags, tags and a cross-vault browser.","manifest.name":"SideNotes","markdown.examples.currentNote":"Current note","markdown.examples.filtered":"Filtered results","markdown.examples.flagged":"Flagged notes","markdown.examples.otherFile":"Another file","plugin.sideNotes.field.awareRange":"Aware time range (seconds)","plugin.sideNotes.field.filterTypes":"Filter types","plugin.sideNotes.field.filterTypesDesc":"Preferred file extensions appear first, in this order. Extensions from saved SideNotes are added automatically, even when this list is empty.","sidenotes.anchor.heading":"Heading","sidenotes.anchor.imageRegion":"Image region","sidenotes.anchor.jsonlRecord":"JSONL record","sidenotes.anchor.line":"Line {{line}}","sidenotes.anchor.lineName":"Line","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} region","sidenotes.anchor.path":"Path","sidenotes.anchor.pdfPage":"PDF page","sidenotes.anchor.pdfRegion":"PDF region","sidenotes.anchor.selection":"Selection","sidenotes.anchor.snippet":"Snippet","sidenotes.anchor.timestamp":"Timestamp","sideNotes.command.create":"SideNotes: Create annotation","sideNotes.command.delete":"SideNotes: Delete annotation","sideNotes.command.get":"SideNotes: Get annotation","sideNotes.command.list":"SideNotes: List annotations","sideNotes.command.open":"SideNotes: Open annotation","sideNotes.command.update":"SideNotes: Edit annotation","sideNotes.delete.message":"Delete this SideNote? This cannot be undone.","sideNotes.error.save":"Could not save the annotation. Your changes are preserved.","sideNotes.field.anchor":"Anchor","sideNotes.field.flagged":"Flagged","sideNotes.field.note":"Annotation","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"No extension","sideNotes.filter.web":"Web","sideNotes.error.load":"Could not load SideNotes. Try again.","sideNotes.action.retry":"Retry","bookmark.view":"Notes and filters","bookmark.item":"Selected item"};var vo={"auto.01e635f27ec2":"Abst.","auto.042dc9b751ed":"L\xF6schen?","auto.08145698fd03":"Zum Anker springen","auto.0aafb761a83c":"SideNotes-Filter","auto.19eabc961735":"Zeitstempel","auto.1e149756b7c6":"Text, der auf dieser Seite hervorgehoben werden soll","auto.204e47f6d7a2":"Im Aware-Modus werden Audio-/Videonotizen innerhalb von \xB1 so vielen Sekunden der aktuellen Wiedergabezeit angezeigt.","auto.2599b7d91cc5":"Text hervorheben (optional)","auto.2e5ce5a06a35":"Textausschnitt","auto.300721defdc9":"PDF-Seite","auto.31b291dd535e":"Keine SideNotes","auto.33ce417454bf":"Laden\u2026","auto.34f6835f5ddf":"\xD6ffnen Sie eine Datei, einen Ordner oder eine Website","auto.353e665a44c8":"Markdown-\xDCberschrift","auto.49cd864445a9":"Notizen filtern\u2026 (#tag)","auto.4b5ddf04bbe5":"Hervorgehobener Text auf dieser Seite","auto.4fee0a06b6e4":"Aufst.","auto.528bfa4632ef":"Aktuelle Wiedergabezeit verwenden","auto.5301648dcf6b":"Bearbeiten","auto.5397e0583f14":"Ja","auto.5430d0e5fb8c":"Notizoptionen","auto.580535153931":"Aware-Modus","auto.6a72085653e4":"Alle","auto.6bf5da9c080b":"Optionen","auto.6d821dbb4d9c":"Zeile {{p0}}","auto.70440046a3dc":"Notizen","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.746eb1a86a79":"Randnotizen","auto.74a3a904b38b":"Nur Notizen mit Ankerproblemen anzeigen","auto.7555728cb6e5":"Markdown-Linie","auto.757092db3c4b":"Notiz hinzuf\xFCgen","auto.77dfd2135f4d":"Abbrechen","auto.77f9b062ce1b":"Kompaktansicht umschalten","auto.7a7e81b96c3a":"Randnotiz erstellen","auto.7b9b8574c69b":"Bewusst: Zeigt nur Notizen f\xFCr Ihre aktuelle Position an","auto.7c0451dde956":"Markierte Notizen filtern\u2026 (#tag)","auto.7d660ae8b46e":"Randnotizen","auto.816c52fd2bdd":"Nein","auto.89180e1a25ef":"Notiz-Tags","auto.8c8077ac2313":"Keine Notizen f\xFCr diese Seite","auto.8f4043581269":"Keine Notizen hier","auto.90fd0e9a6276":"Notizen sortieren nach","auto.94fd67ed6c0c":"SideNote aus Auswahl erstellen","auto.954a9a37711e":"SideNotes \xF6ffnen","auto.97dcfe139228":"Durchsucht den Text und die Tags deiner Randnotizen.","auto.98c236df91df":"Ausgew\xE4hlter Text (optional)","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c36384c83fb":"SideNote-Ankertyp","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.a3089b7fae27":"\xDCberschrift","auto.a774409a00c2":"Fahne","auto.b32f39140566":"Weggeschichte","auto.b667d6f9f635":"Filter l\xF6schen","auto.b690846c83ff":"Keine passenden Notizen","auto.b855c604e861":"Markierung entfernen","auto.d2a1e72bc320":"Noch keine Notizen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.d48a73614c7f":"Neue Randbemerkung","auto.df4a8bd943cc":"Bewusst: Zeigt Notizen zu Ihrer aktuellen Position an","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e3b82040565b":"Jetzt","auto.eeb742ed8cac":"Ganze Seite","auto.ef6127596cae":"Markdown-Snippet","auto.efc007a393f6":"Speichern","auto.f1b5671b118f":"Nebenbemerkungen filtern","auto.f545c86bbd6e":"Hier gibt es noch keine Randnotizen.","auto.f5ca64c680ee":"Keine markierten Notizen","auto.f61b9fcd0854":"Notizen mit Ankerproblemen filtern","auto.f6fdbe48dc54":"L\xF6schen","auto.f8db8a172be6":"markiert","auto.ff4f3043a289":"Markierte Notizen filtern","manifest.description":"Randnotizen, verankert an einer Datei, \xDCberschrift, Zeile, PDF-Auswahl oder Webseite \u2014 mit Markierungen, Tags und einem vault-weiten Browser.","manifest.name":"Randnotizen","markdown.examples.currentNote":"Aktuelle Notiz","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.flagged":"Markierte Notizen","markdown.examples.otherFile":"Andere Datei","plugin.sideNotes.field.awareRange":"Aware-Zeitbereich (Sekunden)","plugin.sideNotes.field.filterTypes":"Filtertypen","plugin.sideNotes.field.filterTypesDesc":"Bevorzugte Dateierweiterungen erscheinen zuerst, in dieser Reihenfolge. Erweiterungen gespeicherter SideNotes werden automatisch erg\xE4nzt, auch wenn diese Liste leer ist.","sidenotes.anchor.heading":"\xDCberschrift","sidenotes.anchor.imageRegion":"Bildbereich","sidenotes.anchor.jsonlRecord":"JSONL-Datensatz","sidenotes.anchor.line":"Zeile {{line}}","sidenotes.anchor.lineName":"Zeile","sidenotes.anchor.page":"Seite {{page}}","sidenotes.anchor.pageRegion":"Seite {{page}} Region","sidenotes.anchor.path":"Pfad","sidenotes.anchor.pdfPage":"PDF-Seite","sidenotes.anchor.pdfRegion":"PDF-Bereich","sidenotes.anchor.selection":"Auswahl","sidenotes.anchor.snippet":"Textausschnitt","sidenotes.anchor.timestamp":"Zeitstempel","sideNotes.command.create":"SideNotes: Anmerkung erstellen","sideNotes.command.delete":"SideNotes: Anmerkung l\xF6schen","sideNotes.command.get":"SideNotes: Anmerkung abrufen","sideNotes.command.list":"SideNotes: Anmerkungen auflisten","sideNotes.command.open":"SideNotes: Anmerkung \xF6ffnen","sideNotes.command.update":"SideNotes: Anmerkung bearbeiten","sideNotes.delete.message":"Diese SideNote l\xF6schen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.","sideNotes.error.save":"Die Anmerkung konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","sideNotes.field.anchor":"Verankerung","sideNotes.field.flagged":"Markiert","sideNotes.field.note":"Anmerkung","sideNotes.field.tags":"Tags","sideNotes.filter.noExtension":"Ohne Erweiterung","sideNotes.filter.web":"Internet","sideNotes.error.load":"SideNotes konnten nicht geladen werden. Versuche es erneut.","sideNotes.action.retry":"Erneut versuchen","bookmark.view":"Notizen und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag"};var wo={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"\xBFEliminar?","auto.08145698fd03":"Saltar al ancla","auto.0aafb761a83c":"SideNotes filtro","auto.19eabc961735":"Marca de tiempo","auto.1e149756b7c6":"Texto a resaltar en esta p\xE1gina","auto.204e47f6d7a2":"En el modo Aware, se muestran las notas de audio/v\xEDdeo dentro de \xB1 estos segundos del tiempo de reproducci\xF3n actual.","auto.2599b7d91cc5":"Resaltar texto (opcional)","auto.2e5ce5a06a35":"Fragmento de texto","auto.300721defdc9":"p\xE1gina PDF","auto.31b291dd535e":"Sin SideNotes","auto.33ce417454bf":"Cargando\u2026","auto.34f6835f5ddf":"Abrir un archivo, carpeta o sitio web","auto.353e665a44c8":"Markdown t\xEDtulo","auto.49cd864445a9":"Filtrar notas\u2026 (#tag)","auto.4b5ddf04bbe5":"Texto resaltado en esta p\xE1gina","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Usar el tiempo de reproducci\xF3n actual","auto.5301648dcf6b":"Editar","auto.5397e0583f14":"S\xED","auto.5430d0e5fb8c":"Opciones de nota","auto.580535153931":"Modo consciente","auto.6a72085653e4":"Todos","auto.6bf5da9c080b":"Opciones","auto.6d821dbb4d9c":"l\xEDnea {{p0}}","auto.70440046a3dc":"Notas","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.746eb1a86a79":"Notas al margen","auto.74a3a904b38b":"Mostrar solo notas con problemas de anclaje","auto.7555728cb6e5":"Markdown l\xEDnea","auto.757092db3c4b":"Agregar nota","auto.77dfd2135f4d":"Cancelar","auto.77f9b062ce1b":"Alternar vista compacta","auto.7a7e81b96c3a":"Crear nota al margen","auto.7b9b8574c69b":"Aware: muestra solo notas para tu puesto actual","auto.7c0451dde956":"Filtrar notas marcadas\u2026 (#etiqueta)","auto.7d660ae8b46e":"Notas laterales","auto.816c52fd2bdd":"No","auto.89180e1a25ef":"Etiquetas de notas","auto.8c8077ac2313":"No hay notas para esta p\xE1gina","auto.8f4043581269":"No hay notas aqu\xED","auto.90fd0e9a6276":"Ordenar notas por","auto.94fd67ed6c0c":"Crear nota al margen a partir de la selecci\xF3n","auto.954a9a37711e":"Abierto SideNotes","auto.97dcfe139228":"Busca en el texto y las etiquetas de tus notas al margen.","auto.98c236df91df":"Texto seleccionado (opcional)","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c36384c83fb":"Tipo de anclaje SideNote","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.a3089b7fae27":"Rumbo","auto.a774409a00c2":"Bandera","auto.b32f39140566":"Historia del camino","auto.b667d6f9f635":"Limpiar filtro","auto.b690846c83ff":"No hay notas coincidentes","auto.b855c604e861":"Desmarcar","auto.d2a1e72bc320":"A\xFAn no hay notas","auto.d2f76731e1e1":"Vista c\xF3moda","auto.d48a73614c7f":"Nueva nota al margen","auto.df4a8bd943cc":"Aware: muestra notas para su puesto actual","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e3b82040565b":"Ahora","auto.eeb742ed8cac":"P\xE1gina completa","auto.ef6127596cae":"Markdown fragmento","auto.efc007a393f6":"Guardar","auto.f1b5671b118f":"Filtrar notas al margen","auto.f545c86bbd6e":"A\xFAn no hay notas al margen.","auto.f5ca64c680ee":"No hay notas marcadas","auto.f61b9fcd0854":"Filtrar notas con problemas de anclaje","auto.f6fdbe48dc54":"Eliminar","auto.f8db8a172be6":"Marcado","auto.ff4f3043a289":"Filtrar notas marcadas","manifest.description":"Notas al margen ancladas a un archivo, un encabezado, una l\xEDnea, una selecci\xF3n de PDF o una p\xE1gina web, con marcadores, etiquetas y un navegador para toda la b\xF3veda.","manifest.name":"Notas laterales","markdown.examples.currentNote":"Nota actual","markdown.examples.filtered":"Resultados filtrados","markdown.examples.flagged":"Notas marcadas","markdown.examples.otherFile":"Otro archivo","plugin.sideNotes.field.awareRange":"Rango de tiempo consciente (segundos)","plugin.sideNotes.field.filterTypes":"Tipos de filtro","plugin.sideNotes.field.filterTypesDesc":"Las extensiones preferidas aparecen primero, en este orden. Las extensiones de las SideNotes guardadas se a\xF1aden autom\xE1ticamente, aunque esta lista est\xE9 vac\xEDa.","sidenotes.anchor.heading":"Encabezado","sidenotes.anchor.imageRegion":"Regi\xF3n de imagen","sidenotes.anchor.jsonlRecord":"Registro JSONL","sidenotes.anchor.line":"L\xEDnea {{line}}","sidenotes.anchor.lineName":"L\xEDnea","sidenotes.anchor.page":"P\xE1gina {{page}}","sidenotes.anchor.pageRegion":"P\xE1gina {{page}} regi\xF3n","sidenotes.anchor.path":"Ruta","sidenotes.anchor.pdfPage":"P\xE1gina PDF","sidenotes.anchor.pdfRegion":"Regi\xF3n PDF","sidenotes.anchor.selection":"Selecci\xF3n","sidenotes.anchor.snippet":"Fragmento","sidenotes.anchor.timestamp":"Marca de tiempo","sideNotes.command.create":"SideNotes: Crear anotaci\xF3n","sideNotes.command.delete":"SideNotes: Eliminar anotaci\xF3n","sideNotes.command.get":"SideNotes: Obtener anotaci\xF3n","sideNotes.command.list":"SideNotes: Listar anotaciones","sideNotes.command.open":"SideNotes: Abrir anotaci\xF3n","sideNotes.command.update":"SideNotes: Editar anotaci\xF3n","sideNotes.delete.message":"\xBFEliminar esta SideNote? Esta acci\xF3n no se puede deshacer.","sideNotes.error.save":"No se pudo guardar la anotaci\xF3n. Tus cambios se conservan.","sideNotes.field.anchor":"Anclaje","sideNotes.field.flagged":"Marcada","sideNotes.field.note":"Anotaci\xF3n","sideNotes.field.tags":"Etiquetas","sideNotes.filter.noExtension":"Sin extensi\xF3n","sideNotes.filter.web":"Sitio web","sideNotes.error.load":"No se pudieron cargar las SideNotes. Int\xE9ntalo de nuevo.","sideNotes.action.retry":"Reintentar","bookmark.view":"Notas y filtros","bookmark.item":"Elemento seleccionado"};var So={"auto.01e635f27ec2":"Desc.","auto.042dc9b751ed":"Supprimer ?","auto.08145698fd03":"Sauter \xE0 l'ancre","auto.0aafb761a83c":"Filtre SideNotes","auto.19eabc961735":"Horodatage","auto.1e149756b7c6":"Texte \xE0 surligner sur cette page","auto.204e47f6d7a2":"En mode Aware, les notes audio/vid\xE9o \xE0 \xB1 ce nombre de secondes de la dur\xE9e de lecture actuelle sont affich\xE9es.","auto.2599b7d91cc5":"Surligner le texte (facultatif)","auto.2e5ce5a06a35":"Extrait de texte","auto.300721defdc9":"Page PDF","auto.31b291dd535e":"Aucune SideNote","auto.33ce417454bf":"Chargement\u2026","auto.34f6835f5ddf":"Ouvrir un fichier, un dossier ou un site Web","auto.353e665a44c8":"Titre Markdown","auto.49cd864445a9":"Filtrer les notes\u2026 (#tag)","auto.4b5ddf04bbe5":"Texte surlign\xE9 sur cette page","auto.4fee0a06b6e4":"Asc.","auto.528bfa4632ef":"Utiliser la dur\xE9e de lecture actuelle","auto.5301648dcf6b":"Modifier","auto.5397e0583f14":"Oui","auto.5430d0e5fb8c":"Options de notes","auto.580535153931":"Mode conscient","auto.6a72085653e4":"Tous","auto.6bf5da9c080b":"Possibilit\xE9s","auto.6d821dbb4d9c":"ligne {{p0}}","auto.70440046a3dc":"Remarques","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.746eb1a86a79":"Notes compl\xE9mentaires","auto.74a3a904b38b":"Afficher uniquement les notes avec des probl\xE8mes d'ancrage","auto.7555728cb6e5":"Ligne Markdown","auto.757092db3c4b":"Ajouter une note","auto.77dfd2135f4d":"Annuler","auto.77f9b062ce1b":"Basculer vers la vue compacte","auto.7a7e81b96c3a":"Cr\xE9er une note lat\xE9rale","auto.7b9b8574c69b":"Conscient : afficher uniquement les notes relatives \xE0 votre position actuelle","auto.7c0451dde956":"Filtrer les notes marqu\xE9es\u2026 (#tag)","auto.7d660ae8b46e":"Notes lat\xE9rales","auto.816c52fd2bdd":"Non","auto.89180e1a25ef":"Balises de note","auto.8c8077ac2313":"Aucune note pour cette page","auto.8f4043581269":"Aucune note ici","auto.90fd0e9a6276":"Trier les notes par","auto.94fd67ed6c0c":"Cr\xE9er une SideNote \xE0 partir de la s\xE9lection","auto.954a9a37711e":"Ouvrir SideNotes","auto.97dcfe139228":"Recherche dans le texte et les \xE9tiquettes de vos notes lat\xE9rales.","auto.98c236df91df":"Texte s\xE9lectionn\xE9 (facultatif)","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c36384c83fb":"Type d'ancre SideNote","auto.9ee309dcedc9":"Ouvrir la page","auto.a3089b7fae27":"Titre","auto.a774409a00c2":"Drapeau","auto.b32f39140566":"Historique du chemin","auto.b667d6f9f635":"Effacer le filtre","auto.b690846c83ff":"Aucune note correspondante","auto.b855c604e861":"Retirer le marquage","auto.d2a1e72bc320":"Aucune note pour l'instant","auto.d2f76731e1e1":"Vue confortable","auto.d48a73614c7f":"Nouvelle note lat\xE9rale","auto.df4a8bd943cc":"Conscient : affichage des notes pour votre position actuelle","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e3b82040565b":"Maintenant","auto.eeb742ed8cac":"Page enti\xE8re","auto.ef6127596cae":"Markdown extrait","auto.efc007a393f6":"Enregistrer","auto.f1b5671b118f":"Filtrer les notes lat\xE9rales","auto.f545c86bbd6e":"Aucune note compl\xE9mentaire ici pour l'instant.","auto.f5ca64c680ee":"Aucune note signal\xE9e","auto.f61b9fcd0854":"Filtrer les notes avec des probl\xE8mes d'ancrage","auto.f6fdbe48dc54":"Supprimer","auto.f8db8a172be6":"Marqu\xE9","auto.ff4f3043a289":"Filtrer les notes signal\xE9es","manifest.description":"Notes en marge ancr\xE9es \xE0 un fichier, un titre, une ligne, une s\xE9lection PDF ou une page web \u2014 avec drapeaux, \xE9tiquettes et un navigateur sur tout le coffre.","manifest.name":"Notes lat\xE9rales","markdown.examples.currentNote":"Note actuelle","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.flagged":"Notes marqu\xE9es","markdown.examples.otherFile":"Autre fichier","plugin.sideNotes.field.awareRange":"Plage de temps consciente (secondes)","plugin.sideNotes.field.filterTypes":"Types de filtre","plugin.sideNotes.field.filterTypesDesc":"Les extensions pr\xE9f\xE9r\xE9es apparaissent en premier, dans cet ordre. Les extensions des SideNotes enregistr\xE9es sont ajout\xE9es automatiquement, m\xEAme si cette liste est vide.","sidenotes.anchor.heading":"Titre","sidenotes.anchor.imageRegion":"Zone d\u2019image","sidenotes.anchor.jsonlRecord":"Enregistrement JSONL","sidenotes.anchor.line":"Ligne {{line}}","sidenotes.anchor.lineName":"Ligne","sidenotes.anchor.page":"Page {{page}}","sidenotes.anchor.pageRegion":"Page {{page}} r\xE9gion","sidenotes.anchor.path":"Chemin","sidenotes.anchor.pdfPage":"Page PDF","sidenotes.anchor.pdfRegion":"R\xE9gion PDF","sidenotes.anchor.selection":"S\xE9lection","sidenotes.anchor.snippet":"Extrait","sidenotes.anchor.timestamp":"Horodatage","sideNotes.command.create":"SideNotes : cr\xE9er une annotation","sideNotes.command.delete":"SideNotes : supprimer une annotation","sideNotes.command.get":"SideNotes : obtenir une annotation","sideNotes.command.list":"SideNotes : lister les annotations","sideNotes.command.open":"SideNotes : ouvrir une annotation","sideNotes.command.update":"SideNotes : modifier une annotation","sideNotes.delete.message":"Supprimer cette SideNote ? Cette action est irr\xE9versible.","sideNotes.error.save":"Impossible d\u2019enregistrer l\u2019annotation. Vos modifications sont conserv\xE9es.","sideNotes.field.anchor":"Ancrage","sideNotes.field.flagged":"Marqu\xE9e","sideNotes.field.note":"Annotation lat\xE9rale","sideNotes.field.tags":"\xC9tiquettes","sideNotes.filter.noExtension":"Sans extension","sideNotes.filter.web":"Site web","sideNotes.error.load":"Impossible de charger les SideNotes. R\xE9essayez.","sideNotes.action.retry":"R\xE9essayer","bookmark.view":"Notes et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9"};var No={"auto.01e635f27ec2":"\u964D\u5E8F","auto.042dc9b751ed":"\u5220\u9664\uFF1F","auto.08145698fd03":"\u8DF3\u5230\u951A\u70B9","auto.0aafb761a83c":"SideNotes\u8FC7\u6EE4\u5668","auto.19eabc961735":"\u65F6\u95F4\u6233","auto.1e149756b7c6":"\u5728\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.204e47f6d7a2":"\u5728 Aware \u6A21\u5F0F\u4E0B\uFF0C\u4F1A\u663E\u793A\u5F53\u524D\u64AD\u653E\u65F6\u95F4\xB1\u8FD9\u4E48\u591A\u79D2\u5185\u7684\u97F3\u9891/\u89C6\u9891\u6CE8\u91CA\u3002","auto.2599b7d91cc5":"\u7A81\u51FA\u663E\u793A\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.2e5ce5a06a35":"\u6587\u672C\u7247\u6BB5","auto.300721defdc9":"PDF\u9875\u9762","auto.31b291dd535e":"\u6CA1\u6709 SideNotes","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34f6835f5ddf":"\u6253\u5F00\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u6216\u7F51\u7AD9","auto.353e665a44c8":"Markdown \u6807\u9898","auto.49cd864445a9":"\u8FC7\u6EE4\u7B14\u8BB0\u2026 (#tag)","auto.4b5ddf04bbe5":"\u6B64\u9875\u9762\u4E0A\u7A81\u51FA\u663E\u793A\u7684\u6587\u672C","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.528bfa4632ef":"\u4F7F\u7528\u5F53\u524D\u64AD\u653E\u65F6\u95F4","auto.5301648dcf6b":"\u7F16\u8F91","auto.5397e0583f14":"\u662F\u7684","auto.5430d0e5fb8c":"\u6CE8\u91CA\u9009\u9879","auto.580535153931":"\u611F\u77E5\u6A21\u5F0F","auto.6a72085653e4":"\u5168\u90E8","auto.6bf5da9c080b":"\u9009\u9879","auto.6d821dbb4d9c":"\u884C{{p0}}","auto.70440046a3dc":"\u5907\u6CE8","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.746eb1a86a79":"\u65C1\u6CE8","auto.74a3a904b38b":"\u4EC5\u663E\u793A\u6709\u951A\u70B9\u95EE\u9898\u7684\u6CE8\u91CA","auto.7555728cb6e5":"Markdown\u7EBF","auto.757092db3c4b":"\u6DFB\u52A0\u6CE8\u91CA","auto.77dfd2135f4d":"\u53D6\u6D88","auto.77f9b062ce1b":"\u5207\u6362\u7D27\u51D1\u89C6\u56FE","auto.7a7e81b96c3a":"\u521B\u5EFA\u65C1\u6CE8","auto.7b9b8574c69b":"Aware\uFF1A\u4EC5\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.7c0451dde956":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0\u2026 (#tag)","auto.7d660ae8b46e":"\u65C1\u6CE8","auto.816c52fd2bdd":"\u4E0D","auto.89180e1a25ef":"\u6CE8\u610F\u6807\u7B7E","auto.8c8077ac2313":"\u6B64\u9875\u6CA1\u6709\u6CE8\u91CA","auto.8f4043581269":"\u8FD9\u91CC\u6CA1\u6709\u6CE8\u91CA","auto.90fd0e9a6276":"\u5BF9\u7B14\u8BB0\u8FDB\u884C\u6392\u5E8F","auto.94fd67ed6c0c":"\u4ECE\u9009\u62E9\u4E2D\u521B\u5EFA\u4FBF\u7B3A","auto.954a9a37711e":"\u6253\u5F00SideNotes","auto.97dcfe139228":"\u641C\u7D22\u4F60\u7684\u4FA7\u8FB9\u7B14\u8BB0\u6587\u672C\u548C\u6807\u7B7E\u3002","auto.98c236df91df":"\u9009\u5B9A\u7684\u6587\u672C\uFF08\u53EF\u9009\uFF09","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c36384c83fb":"SideNote \u951A\u70B9\u7C7B\u578B","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.a3089b7fae27":"\u6807\u9898","auto.a774409a00c2":"\u65D7\u5E1C","auto.b32f39140566":"\u8DEF\u5F84\u5386\u53F2","auto.b667d6f9f635":"\u6E05\u9664\u8FC7\u6EE4\u5668","auto.b690846c83ff":"\u6CA1\u6709\u5339\u914D\u7684\u6CE8\u91CA","auto.b855c604e861":"\u53D6\u6D88\u6807\u8BB0","auto.d2a1e72bc320":"\u8FD8\u6CA1\u6709\u7B14\u8BB0","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.d48a73614c7f":"\u65B0\u65C1\u6CE8","auto.df4a8bd943cc":"\u610F\u8BC6\u5230\uFF1A\u663E\u793A\u60A8\u5F53\u524D\u4F4D\u7F6E\u7684\u6CE8\u91CA","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e3b82040565b":"\u73B0\u5728","auto.eeb742ed8cac":"\u6574\u9875","auto.ef6127596cae":"Markdown \u7247\u6BB5","auto.efc007a393f6":"\u4FDD\u5B58","auto.f1b5671b118f":"\u8FC7\u6EE4\u65C1\u6CE8","auto.f545c86bbd6e":"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u9644\u6CE8\u3002","auto.f5ca64c680ee":"\u6CA1\u6709\u6807\u8BB0\u7684\u6CE8\u91CA","auto.f61b9fcd0854":"\u8FC7\u6EE4\u6709\u951A\u70B9\u95EE\u9898\u7684\u7B14\u8BB0","auto.f6fdbe48dc54":"\u5220\u9664","auto.f8db8a172be6":"\u6807\u8BB0","auto.ff4f3043a289":"\u8FC7\u6EE4\u6807\u8BB0\u7684\u7B14\u8BB0","manifest.description":"\u951A\u5B9A\u5230\u6587\u4EF6\u3001\u6807\u9898\u3001\u884C\u3001PDF \u9009\u533A\u6216\u7F51\u9875\u7684\u65C1\u6CE8\u2014\u2014\u5E26\u6807\u8BB0\u3001\u6807\u7B7E\u548C\u8DE8\u4ED3\u5E93\u6D4F\u89C8\u5668\u3002","manifest.name":"\u65C1\u6CE8","markdown.examples.currentNote":"\u5F53\u524D\u7B14\u8BB0","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.flagged":"\u5DF2\u6807\u8BB0\u7B14\u8BB0","markdown.examples.otherFile":"\u5176\u4ED6\u6587\u4EF6","plugin.sideNotes.field.awareRange":"\u611F\u77E5\u65F6\u95F4\u8303\u56F4\uFF08\u79D2\uFF09","plugin.sideNotes.field.filterTypes":"\u7B5B\u9009\u7C7B\u578B","plugin.sideNotes.field.filterTypesDesc":"\u9996\u9009\u6587\u4EF6\u6269\u5C55\u540D\u6309\u6B64\u987A\u5E8F\u4F18\u5148\u663E\u793A\u3002\u5DF2\u4FDD\u5B58\u7684 SideNotes \u4E2D\u7684\u6269\u5C55\u540D\u4F1A\u81EA\u52A8\u6DFB\u52A0\uFF0C\u5373\u4F7F\u6B64\u5217\u8868\u4E3A\u7A7A\u3002","sidenotes.anchor.heading":"\u6807\u9898","sidenotes.anchor.imageRegion":"\u56FE\u50CF\u533A\u57DF","sidenotes.anchor.jsonlRecord":"JSONL \u8BB0\u5F55","sidenotes.anchor.line":"\u7B2C {{line}} \u884C","sidenotes.anchor.lineName":"\u884C","sidenotes.anchor.page":"\u9875 {{page}}","sidenotes.anchor.pageRegion":"\u9875\u9762{{page}}\u533A\u57DF","sidenotes.anchor.path":"\u8DEF\u5F84","sidenotes.anchor.pdfPage":"PDF \u9875\u9762","sidenotes.anchor.pdfRegion":"PDF \u533A\u57DF","sidenotes.anchor.selection":"\u9009\u533A","sidenotes.anchor.snippet":"\u7247\u6BB5","sidenotes.anchor.timestamp":"\u65F6\u95F4\u6233","sideNotes.command.create":"SideNotes\uFF1A\u521B\u5EFA\u6CE8\u91CA","sideNotes.command.delete":"SideNotes\uFF1A\u5220\u9664\u6CE8\u91CA","sideNotes.command.get":"SideNotes\uFF1A\u83B7\u53D6\u6CE8\u91CA","sideNotes.command.list":"SideNotes\uFF1A\u5217\u51FA\u6CE8\u91CA","sideNotes.command.open":"SideNotes\uFF1A\u6253\u5F00\u6CE8\u91CA","sideNotes.command.update":"SideNotes\uFF1A\u7F16\u8F91\u6CE8\u91CA","sideNotes.delete.message":"\u5220\u9664\u6B64 SideNote\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002","sideNotes.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u6CE8\u91CA\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","sideNotes.field.anchor":"\u951A\u70B9","sideNotes.field.flagged":"\u5DF2\u6807\u8BB0","sideNotes.field.note":"\u6CE8\u91CA","sideNotes.field.tags":"\u6807\u7B7E","sideNotes.filter.noExtension":"\u65E0\u6269\u5C55\u540D","sideNotes.filter.web":"\u7F51\u9875","sideNotes.error.load":"\u65E0\u6CD5\u52A0\u8F7D SideNotes\u3002\u8BF7\u91CD\u8BD5\u3002","sideNotes.action.retry":"\u91CD\u8BD5","bookmark.view":"\u7B14\u8BB0\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE"};var xo={en:yo,de:vo,es:wo,fr:So,"zh-CN":No};function Ao(e,t){return(xo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(o,s)=>String(t?.[s]??""))}var ko=Ao;function Eo(e){e.ui.registerCatalogs(xo),ko=(t,n)=>{let o=e.ui.t(t,n);return o===t?Ao(t,n):o}}function p(e,t){return ko(e,t)}function Io(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.getState().activePath;return{getSnapshot:()=>(n.isActive()&&(o=t.getState().activePath),o),subscribe:s=>{if(!n.isActive())return()=>{};let i=!0,d=t.subscribe(()=>{i&&n.isActive()&&s()});return()=>{i=!1,d()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function To(){let[e]=r.useState(()=>{let t=y,n=Te(),o=t.interop.state.get(rt),s=o?{...o}:null;return{getSnapshot:()=>{if(n.isActive()){let i=t.interop.state.get(rt);i?(!s||i.instanceId!==s.instanceId||i.url!==s.url||i.title!==s.title)&&(s={...i}):s=null}return s},subscribe:i=>{if(!n.isActive())return()=>{};let d=!0,a=t.interop.state.subscribe(rt,()=>{d&&n.isActive()&&i()});return()=>{d=!1,a()}}}});return r.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}function Ke(e){let[t]=r.useState(Te),[n,o]=r.useState([]),[s,i]=r.useState(!0),[d,a]=r.useState(null),c=r.useRef(!1),l=r.useRef(0),u=e?.kind??"all",f=e?.kind==="file"?e.path:e?.kind==="web"?Q(e.url):"",v=e?.kind==="file"&&e.includeWeb===!0,A=r.useCallback(()=>{if(!c.current||!t.isActive())return;let C=++l.current,h=u==="all"?void 0:u==="file"?{kind:u,path:f,includeWeb:v}:u==="web"?{kind:u,url:f}:{kind:u};t.load(h).then(O=>{!c.current||!t.isActive()||C!==l.current||(o(O),a(null),i(!1))}).catch(()=>{!c.current||!t.isActive()||C!==l.current||(a(p("sideNotes.error.load")),i(!1))})},[u,f,v,t]);return r.useEffect(()=>{c.current=!0,o([]),i(!0),a(null);let C=t.subscribe(A);return A(),()=>{c.current=!1,l.current++,C()}},[A,t]),{notes:n,setNotes:o,loading:s,error:d,reload:A}}function _o(){let[e,t]=r.useState(new Set),n=r.useCallback(s=>e.has(s),[e]),o=r.useCallback((s,i)=>{t(d=>{let a=new Set(d);return i?a.add(s):a.delete(s),a})},[]);return{isPending:n,setPending:o,pending:e}}var hn="notes-sidenotes-fence-styles";function cs(){if(document.getElementById(hn))return;let e=document.createElement("style");e.id=hn,e.textContent=`
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
`,document.head.appendChild(e)}var Po=e=>{let t=e.anchor;return t?.type?t.type==="line"&&t.line!=null?p("auto.6d821dbb4d9c",{p0:t.line}):typeof t.page=="number"?`p. ${t.page}`:t.type:""},ls=({code:e,path:t})=>{let n=ho(e),o=n.values.file??n.bare??t,s=n.values.url?Q(n.values.url):null,i=(n.values.flagged??"").toLowerCase()==="true",d=n.values.tag?n.values.tag.replace(/^#/,"").toLowerCase():null,a=bo(n,"limit",100)??20,{notes:c,loading:l,error:u,reload:f}=Ke(s?{kind:"web",url:s}:o?{kind:"file",path:o,includeWeb:!0}:i?void 0:{kind:"none"});if(u)return r.createElement("div",{className:"sidenotes-fence-empty",role:"alert"},u," ",r.createElement("button",{type:"button",onClick:f},p("sideNotes.action.retry")));if(l)return r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.33ce417454bf"));let v=c.filter(h=>s?h.url===s:o?!(h.path!==o||i&&h.flagged!==!0||d&&!h.tags.some(O=>O.replace(/^#/,"").toLowerCase()===d)):i?h.flagged===!0:!1).slice(0,a),A=()=>{y.workspace.revealOwnPanel("right_sidebar")},C=s??(o?o.split("/").pop():i?"flagged":null);return r.createElement(r.Fragment,null,r.createElement("div",{className:"sidenotes-fence-head",onClick:A,title:p("auto.954a9a37711e")},r.createElement("span",{className:"t"},p("auto.746eb1a86a79")," ",C?` \xB7 ${C}`:""),r.createElement("span",{className:"c"},v.length)),v.length===0&&r.createElement("div",{className:"sidenotes-fence-empty"},p("auto.f545c86bbd6e")),v.map(h=>r.createElement("div",{key:h.id,className:"sidenotes-fence-note",onClick:A},r.createElement(y.ui.MarkdownView,{className:"body",value:h.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:h.id},sourcePath:h.path||void 0}}),r.createElement("div",{className:"meta"},h.flagged&&r.createElement("span",{className:"flag"},"\u2691"),Po(h)&&r.createElement("span",null,Po(h)),h.tags.slice(0,3).map(O=>r.createElement("span",{key:O},"#",O.replace(/^#/,"")))))))};function Co(){let e=y.markdown.registerCodeBlockRenderer("sidenotes",(t,n,o)=>(cs(),n.classList.add("sidenotes-fence"),y.ui.renderReact(n,r.createElement(ls,{code:t,path:o.path}))),{examples:mo.sidenotes});return()=>{e(),document.getElementById(hn)?.remove()}}var Mt=e=>typeof e=="string"?e:"";function Oo(e){let t=Mt(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Do(e){let t={cardKind:"sidenote",open:async(n,o)=>{if(Mt(n.id)&&!o.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"notes",itemId:Mt(n.id)}),!0;let s=Mt(n.url);if(s)return e.links.open(s),!0;let i=Oo(n.path)||Oo(o.path);if(i){let d=n.anchor&&typeof n.anchor=="object"?n.anchor:void 0;return e.workspace.openFile(i,d?.type==="web-selection"?void 0:d,{newTab:o.newTab}),e.workspace.revealOwnPanel("right_sidebar"),!0}return!1}};return e.interop.extensions.provide(dn,t)}function us(e){return e.replace(/\s+/g," ").trim()}var Ro=200;function ps(e,t){let n=us(e),o=n.slice(0,Ro);if(!t)return o;let s=n.replace(/ /g,"").slice(0,Ro).toLowerCase();if(!s)return o;let i=[],d="";for(let c=0;c<t.length;c++)/\s/.test(t[c])||(i.push(c),d+=t[c].toLowerCase());let a=d.indexOf(s);return a<0?o:t.slice(i[a],i[a+s.length-1]+1).trim()}function Mo(e,t){let n=e.text.trim(),o=Math.floor(e.page);return!n||!e.path||!Number.isFinite(o)||o<1?null:{kind:"file",path:e.path,page:o,snippet:ps(n,t)}}function Lo(e,t){if(t?.surface!=="pdf"||t.path!==e)return null;let n=t.text.trim();if(!n)return null;let o=Number(t.page);return!Number.isFinite(o)||o<1?null:{path:e,page:o,text:n}}function fs(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function gs(e,t,n=320){let o=t.top-n,s=t.top+t.height+n,i=0,d=e.length;for(;i<d;){let c=i+d>>>1;e[c].start+e[c].height<o?i=c+1:d=c}let a=i;for(d=e.length;i<d;){let c=i+d>>>1;e[c].start<=s?i=c+1:d=c}return[a,i]}function Lt(e,t){let{ids:n,estimate:o,pinned:s=[],layoutKey:i}=t,d=t.enabled??n.length>80,a=e.useRef(null),c=e.useRef(new Map),[l,u]=e.useReducer(S=>S+1,0),[f,v]=e.useState({top:0,height:600}),[A,C]=e.useState(null),[h,O]=e.useState(null),D=e.useRef(null),z=e.useRef(null),I=e.useMemo(()=>{let S=0;return n.map(P=>{let V=c.current.get(P)??o,G={id:P,height:V,start:S};return S+=V,G})},[n,o,l]),U=I.length?I[I.length-1].start+I[I.length-1].height:0,T=e.useRef({rows:I,viewport:f});T.current={rows:I,viewport:f};let K=e.useCallback(()=>{let S=a.current,P=D.current;if(!S||!P)return;let V=S.getBoundingClientRect(),G=P.getBoundingClientRect(),R=P.clientHeight||G.height||600,Z=P===S?P.scrollTop:G.top-V.top;v(ie=>ie.top===Z&&ie.height===R?ie:{top:Z,height:R})},[]),te=e.useCallback(()=>{z.current===null&&(z.current=requestAnimationFrame(()=>{z.current=null,K()}))},[K]);e.useLayoutEffect(()=>{let S=a.current;if(!S||!d)return;let P=fs(S);D.current=P;let V=S.style.overflowAnchor;S.style.overflowAnchor="none";let G=!0,R=()=>{if(!G)return;let Y=S.ownerDocument.activeElement,ne=Y instanceof Element?Y.closest("[data-visible-key]"):null;C(ne&&S.contains(ne)?ne.dataset.visibleKey??null:null)},Z=()=>{queueMicrotask(R)};P.addEventListener("scroll",te,{passive:!0}),window.addEventListener("resize",te),S.addEventListener("focusin",R),S.addEventListener("focusout",Z);let ie=S.clientWidth,be=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{S.clientWidth!==ie&&(ie=S.clientWidth,c.current.clear(),u()),te()});return be?.observe(P),P!==S&&be?.observe(S),K(),()=>{G=!1,S.style.overflowAnchor==="none"&&(S.style.overflowAnchor=V),P.removeEventListener("scroll",te),window.removeEventListener("resize",te),S.removeEventListener("focusin",R),S.removeEventListener("focusout",Z),be?.disconnect(),z.current!==null&&cancelAnimationFrame(z.current),z.current=null,D.current=null}},[d,K,te]),e.useLayoutEffect(()=>{let S=new Set(n);for(let P of c.current.keys())S.has(P)||c.current.delete(P);K()},[n,K]),e.useLayoutEffect(()=>{c.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let S=a.current;if(!S||!d)return;let P=R=>{let Z=0,ie=!1,{rows:be,viewport:Y}=T.current,ne=new Map(be.map(ue=>[ue.id,ue]));for(let ue of R){let ke=ue.dataset.visibleKey,fe=ke?ne.get(ke):void 0,ge=ue.getBoundingClientRect().height;!ke||!fe||ge<=0||Math.abs(ge-fe.height)<.5||(c.current.set(ke,ge),fe.start+fe.height<=Y.top&&(Z+=ge-fe.height),ie=!0)}ie&&(Z&&D.current&&(D.current.scrollTop+=Z),u(),te())},V=Array.from(S.children).filter(R=>R.hasAttribute("data-visible-key")),G=typeof ResizeObserver>"u"?void 0:new ResizeObserver(R=>P(R.map(Z=>Z.target)));return V.forEach(R=>G?.observe(R)),P(V),()=>G?.disconnect()}),e.useLayoutEffect(()=>{if(!h)return;let S=Array.from(a.current?.children??[]).find(P=>P.dataset.visibleKey===h.id);S&&(S.scrollIntoView?.({block:"nearest"}),h.selector&&(S.matches(h.selector)?S:S.querySelector(h.selector))?.focus(),K(),O(null))},[h,I,K]);let he=e.useCallback((S,P)=>{O({id:S,selector:P})},[]),[xe,ze]=d?gs(I,f):[0,I.length],we=new Set;for(let S=xe;S<ze;S++)we.add(S);let Ae=new Set([...s,A,h?.id].filter(Boolean));return Ae.size&&I.forEach((S,P)=>{Ae.has(S.id)&&we.add(P)}),{ref:a,show:he,render(S){let P=[],V=0;for(let G of[...we].sort((R,Z)=>R-Z)){let R=I[G];R.start>V&&P.push(e.createElement("div",{key:`space:${R.id}`,"aria-hidden":!0,style:{height:R.start-V,flex:"0 0 auto",pointerEvents:"none"}})),P.push(e.createElement(e.Fragment,{key:R.id},S(G))),V=R.start+R.height}return U>V&&P.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:U-V,flex:"0 0 auto",pointerEvents:"none"}})),P}}}var zo=4,ms=32,hs=32,jo=8*1024*1024,Fo=new WeakMap;function $o(e){for(;e.active<zo&&e.tasks.length;){let t=e.tasks.shift();e.active++,t.read().then(t.resolve,t.reject).finally(()=>{e.active--,$o(e)})}}var Ne=class extends Error{constructor(){super("SideNotes anchor reader is no longer active")}},ye=class{constructor(t=y){$(this,"owner",t);$(this,"generation");$(this,"root");$(this,"disposed",!1);$(this,"unsubscribe",()=>{});$(this,"queue");$(this,"bytes",0);$(this,"cache",new Map);$(this,"pending",new Map);this.generation=Ee,this.root=t.getState().vault?.path??null,this.queue=Fo.get(t)??{active:0,tasks:[]},Fo.set(t,this.queue),this.unsubscribe=t.subscribe(()=>{this.isActive()||this.dispose()})}isActive(){if(this.disposed||this.owner!==y||this.generation!==Ee)return!1;try{return(this.owner.getState().vault?.path??null)===this.root}catch{return!1}}assertActive(){if(!this.isActive())throw new Ne}dispose(){this.disposed||(this.disposed=!0,this.unsubscribe(),this.cache.clear(),this.bytes=0,this.queue.tasks=this.queue.tasks.filter(t=>t.owner!==this?!0:(t.reject(new Ne),!1)),this.pending.clear())}file(t){return this.request(JSON.stringify(["file",t]),()=>this.owner.vault.readFile(t))}page(t,n){return this.request(JSON.stringify(["page",t,n]),()=>this.owner.workspace.getPdfPageText(t,n))}pageCount(t){this.assertActive();let n=this.owner.workspace.getPdfPageCount(t);return this.assertActive(),n}mediaDuration(){this.assertActive();let t=this.owner.workspace.getMediaDuration();return this.assertActive(),t}request(t,n){if(!this.isActive())return Promise.reject(new Ne);let o=this.cache.get(t);if(o)return this.cache.delete(t),this.cache.set(t,o),Promise.resolve(o.value);let s=this.pending.get(t);if(s)return s;if(this.queue.active>=zo&&this.queue.tasks.length>=ms)return Promise.reject(new Error("Too many SideNotes anchor reads"));let i,d=async()=>{this.assertActive();let l=await n();this.assertActive();let u=2*(t.length+(l?.length??0));if(u<=jo){for(;this.cache.size>=hs||this.bytes+u>jo;){let[f,v]=this.cache.entries().next().value;this.cache.delete(f),this.bytes-=v.bytes}this.cache.set(t,{value:l,bytes:u}),this.bytes+=u}return l},a=new Promise((l,u)=>{i={owner:this,read:d,resolve:l,reject:u}});this.pending.set(t,a);let c=()=>{this.pending.get(t)===a&&this.pending.delete(t)};return a.then(c,c),this.queue.tasks.push(i),$o(this.queue),a}};var lt={none:"sidenotes.anchor.path","pdf-page":"sidenotes.anchor.pdfPage","pdf-region":"sidenotes.anchor.pdfRegion","media-time":"sidenotes.anchor.timestamp","markdown-line":"sidenotes.anchor.lineName","markdown-heading":"sidenotes.anchor.heading","markdown-snippet":"sidenotes.anchor.snippet","jsonl-record":"sidenotes.anchor.jsonlRecord","image-region":"sidenotes.anchor.imageRegion","web-selection":"sidenotes.anchor.selection"};function pt(){return["none","web-selection"]}function yn(e){let t=_e(e);return t==="pdf"?{type:"pdf-page",page:1}:t==="video"||t==="audio"?{type:"media-time",seconds:0}:t==="text"?{type:"markdown-line",line:1}:{type:"none"}}function Bo(e,t,n){if(e.type==="pdf-page"||e.type==="pdf-region")return!!t.pdfPages?.includes(e.page);if(e.type==="media-time")return t.mediaSeconds!=null&&Math.abs(e.seconds-t.mediaSeconds)<=n;if(e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"){let o=e.line??0;return!!t.lineRange&&o>=1&&o>=t.lineRange.from&&o<=t.lineRange.to}return!1}function Uo(e,t){let n=_e(e);return n==="pdf"?{type:"pdf-page",page:t.pdfPages?.[0]??1}:n==="video"||n==="audio"?{type:"media-time",seconds:t.mediaSeconds!=null?Math.max(0,Math.round(t.mediaSeconds)):0}:n==="text"?{type:"markdown-line",line:t.lineRange?.from??1}:{type:"none"}}function ft(e){let t=_e(e);return t==="pdf"?["none","pdf-page"]:t==="video"||t==="audio"?["none","media-time"]:t==="text"?["none","markdown-line","markdown-heading","markdown-snippet"]:["none"]}function ut(e){return e.type==="pdf-page"||e.type==="pdf-region"?e.page:e.type==="media-time"?e.seconds:e.type==="markdown-line"||e.type==="markdown-heading"||e.type==="markdown-snippet"?e.line??0:e.type==="image-region"?e.y*1e3+e.x:0}var jt=1e7,ct=1e6,bs=jt-1,Vo=jt-2;function Ce(e){return e.replace(/\s+/g," ").trim().toLowerCase()}function bn(e,t){if(e.type==="pdf-page"){let n=e.page*jt,o=e.snippet?Ce(e.snippet):"";if(!o||t==null)return n;let s=Ce(t).indexOf(o);return n+(s>=0?Math.min(s,Vo):bs)}if(e.type==="pdf-region")return e.page*jt+Math.max(0,Math.min(e.y,Vo));if(e.type==="media-time")return e.seconds;if(e.type==="markdown-snippet"){let n=e.snippet?Ce(e.snippet):"";if(n&&t!=null){let o=t.replace(/\r\n?/g,`
`).split(`
`);for(let s=0;s<o.length;s++){let i=Ce(o[s]).indexOf(n);if(i>=0)return(s+1)*ct+Math.min(i,ct-1)}}return(e.line??0)*ct}if(e.type==="markdown-line"||e.type==="markdown-heading"){let n=e.line??0,o=n*ct,s=e.type==="markdown-heading"?"":e.snippet?Ce(e.snippet):"";if(!s||t==null||n<1)return o;let i=t.replace(/\r\n?/g,`
`).split(`
`)[n-1];if(i==null)return o;let d=Ce(i).indexOf(s);return o+(d>=0?Math.min(d,ct-1):0)}return e.type==="image-region"?e.y*1e3+e.x:Number.POSITIVE_INFINITY}function Ko(e,t,n){let o=n.get(e.id)??ut(e.anchor),s=n.get(t.id)??ut(t.anchor);return o!==s?o-s:t.createdAt.localeCompare(e.createdAt)}function Ge(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),o=Math.floor(t%3600/60),s=t%60;return n>0?`${n}:${String(o).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${o}:${String(s).padStart(2,"0")}`}function We(e){return e.type==="pdf-page"?p("sidenotes.anchor.page",{page:e.page}):e.type==="pdf-region"?p("sidenotes.anchor.pageRegion",{page:e.page}):e.type==="media-time"?Ge(e.seconds):e.type==="markdown-line"?p("sidenotes.anchor.line",{line:e.line}):e.type==="markdown-heading"?e.heading:e.type==="markdown-snippet"?e.snippet:e.type==="jsonl-record"?e.recordId:e.type==="image-region"?p(lt["image-region"]):e.type==="web-selection"?e.snippet||p(lt["web-selection"]):p(lt.none)}function Go(e,t){return e===t.type?t:e==="pdf-page"?{type:e,page:1}:e==="media-time"?{type:e,seconds:0}:e==="markdown-line"?{type:e,line:1}:e==="markdown-heading"?{type:e,heading:""}:e==="markdown-snippet"?{type:e,snippet:""}:e==="jsonl-record"?{type:e,recordId:""}:e==="web-selection"?{type:e,snippet:""}:{type:"none"}}function vn(e){let t=e.trim();if(!t)return null;if(t.includes(":")){let o=t.split(":").map(i=>Number(i));if(o.some(i=>!Number.isFinite(i)||i<0))return null;let s=o.reduce((i,d)=>i*60+d,0);return Number.isFinite(s)?s:null}let n=Number(t);return Number.isFinite(n)&&n>=0?n:null}async function Ft(e,t,n){if(n?.assertActive(),t.type!=="markdown-line"&&t.type!=="markdown-heading"&&t.type!=="markdown-snippet")return t;let o=n?await n.file(e):await y.vault.readFile(e);if(n?.assertActive(),!o)return t;let s=o.replace(/\r\n?/g,`
`).split(`
`);if(t.type==="markdown-line"){let a=s[t.line-1]?.trim().slice(0,160);return a?{...t,snippet:a}:t}if(t.type==="markdown-heading"){let a=t.heading.trim().toLowerCase(),c=s.findIndex(l=>l.replace(/^#+\s*/,"").trim().toLowerCase()===a);return c>=0?{...t,line:c+1}:t}let i=t.snippet.trim(),d=i?s.findIndex(a=>a.includes(i)):-1;return d>=0?{...t,line:d+1}:t}async function Wo(e,t,n){if(n?.assertActive(),!["pdf-page","media-time","markdown-line","markdown-heading","markdown-snippet"].includes(t.type))return"ok";let o=n??new ye;try{if(o.assertActive(),t.type==="pdf-page"){let i=o.pageCount(e);if(typeof i=="number"&&t.page>i)return"missing";let d=t.snippet?await o.page(e,t.page):null;return o.assertActive(),Ho(t,i,d)}if(t.type==="media-time"){let i=o.mediaDuration();return typeof i=="number"&&t.seconds>i?"missing":"ok"}let s=await o.file(e);return o.assertActive(),qo(t,s)}finally{n||o.dispose()}}function Ho(e,t,n){return typeof t=="number"&&e.page>t||e.snippet&&n!==null&&!Ce(n).includes(Ce(e.snippet))?"missing":"ok"}function qo(e,t,n=t?.replace(/\r\n?/g,`
`).split(`
`)??[]){if(!t)return"ok";if(e.type==="markdown-line")return e.line<=n.length?"ok":"missing";if(e.type==="markdown-heading"){let i=e.heading.trim().toLowerCase();return n.some(d=>d.replace(/^#+\s*/,"").trim().toLowerCase()===i)?"ok":"missing"}if(e.type!=="markdown-snippet")return"ok";let o=e.snippet.trim();if(!o)return"ok";let s=n.filter(i=>i.includes(o)).length;return s===0?"missing":s>1?"ambiguous":"ok"}async function zt(e,t,n={}){let o=new Map,s=new Map,i=new Map;for(let d of e){t.assertActive();let a=n.path??d.url??d.path,c=d.anchor;if(c.type==="pdf-page"||c.type==="markdown-line"||c.type==="markdown-heading"||c.type==="markdown-snippet"){let l=c.type==="pdf-page"?c.page:void 0,u=JSON.stringify([a,l??"file"]),f=o.get(u)??{path:a,page:l,notes:[]};f.notes.push(d),o.set(u,f)}else{let l=c.type==="media-time"?t.mediaDuration():null;s.set(d,c.type==="media-time"&&typeof l=="number"&&c.seconds>l?"missing":"ok"),n.positions&&i.set(d,bn(c,null))}}for(let d of o.values())if(t.assertActive(),d.page!==void 0){let a=t.pageCount(d.path),l=d.notes.some(u=>u.anchor.type==="pdf-page"&&!!u.anchor.snippet)&&(n.positions||typeof a!="number"||d.page<=a)?await t.page(d.path,d.page):null;t.assertActive();for(let u of d.notes)s.set(u,Ho(u.anchor,a,l)),n.positions&&i.set(u,bn(u.anchor,l))}else{let a=await t.file(d.path);t.assertActive();let c=a?.replace(/\r\n?/g,`
`).split(`
`)??[];for(let l of d.notes)s.set(l,qo(l.anchor,a,c)),n.positions&&i.set(l,bn(l.anchor,a))}return t.assertActive(),{statuses:new Map(e.filter(d=>s.get(d)!=="ok").map(d=>[d.id,s.get(d)])),keys:n.positions?new Map(e.map(d=>[d.id,i.get(d)])):new Map}}function gt(e,t){return t==="ambiguous"?"Multiple matches found":e.type==="pdf-page"?e.snippet?"Text not found on this page":"Page out of range":e.type==="media-time"?"Timestamp out of range":e.type==="markdown-line"?"Line does not exist":e.type==="markdown-heading"?"Heading not found":e.type==="markdown-snippet"?"Snippet not found":"Invalid anchor"}async function Xo(e){let t=await y.vault.readFile(e);return t?t.replace(/\r\n?/g,`
`).split(`
`).filter(n=>/^#+\s/.test(n)).map(n=>n.replace(/^#+\s*/,"").trim()):[]}var ee=e=>r.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?r.createElement("title",null,e.title):null,e.children),Zo=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z"}),r.createElement("path",{d:"M15 21v-5a2 2 0 0 1 2-2h5"})),Yo=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M12 5v14M5 12h14"})),$t=e=>r.createElement(ee,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.createElement("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),r.createElement("path",{d:"M2 12h20"})),Vt=e=>r.createElement(ee,{...e},r.createElement("circle",{cx:"11",cy:"11",r:"8"}),r.createElement("path",{d:"m21 21-4.3-4.3"})),Jo=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M3 4h18l-7 8v6l-4 2v-8Z"})),Bt=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),mt=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z"}),r.createElement("path",{d:"M4 22v-7"})),Qo=e=>r.createElement(ee,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"1"}),r.createElement("circle",{cx:"19",cy:"12",r:"1"}),r.createElement("circle",{cx:"5",cy:"12",r:"1"})),er=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M12 20h9"}),r.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),tr=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M3 6h18"}),r.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),r.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),wn=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M20 6 9 17l-5-5"})),nr=e=>r.createElement(ee,{...e},r.createElement("rect",{width:"18",height:"4",x:"3",y:"2",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"10",rx:"1"}),r.createElement("rect",{width:"18",height:"4",x:"3",y:"18",rx:"1"})),or=e=>r.createElement(ee,{...e},r.createElement("circle",{cx:"12",cy:"12",r:"8"}),r.createElement("path",{d:"M12 2v4M12 18v4M2 12h4M18 12h4"}),r.createElement("circle",{cx:"12",cy:"12",r:"2"})),He=e=>r.createElement(ee,{...e},r.createElement("path",{d:"m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"}),r.createElement("path",{d:"M12 9v4M12 17h.01"})),qe=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M3 6h11M3 12h8M3 18h5"}),r.createElement("path",{d:"m17 15 3 3 3-3M20 6v12"})),Xe=e=>r.createElement(ee,{...e},r.createElement("path",{d:"M3 6h5M3 12h8M3 18h11"}),r.createElement("path",{d:"m17 9 3-3 3 3M20 6v12"}));var ce={type:"string"},ir={type:"array",items:ce},Ze=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Le=(e,t={},n=[])=>Ze({type:{const:e},...t},["type",...n]),sr={oneOf:[Le("none"),Le("pdf-page",{page:{type:"integer",minimum:1},snippet:ce},["page"]),Le("media-time",{seconds:{type:"number",minimum:0}},["seconds"]),Le("markdown-line",{line:{type:"integer",minimum:1},snippet:ce},["line"]),Le("markdown-heading",{heading:ce,line:{type:"integer",minimum:1}},["heading"]),Le("markdown-snippet",{snippet:ce,line:{type:"integer",minimum:1}},["snippet"]),Le("web-selection",{snippet:ce},["snippet"])]},ys=Ze({note:{type:"string",minLength:1},tags:ir,flagged:{type:"boolean"},anchor:sr});function Ye(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected an object.");return e}function Oe(e,t){if(typeof e!="string"||!e.trim())throw new Error(`Expected ${t}.`);return e.trim()}function vs(e){let t=Ye(e),n=s=>{let i=t[s];if(typeof i!="number"||!Number.isInteger(i)||i<1)throw new Error(`Invalid anchor ${s}.`);return i},o=typeof t.snippet=="string"?{snippet:t.snippet}:{};switch(t.type){case"none":return{type:"none"};case"pdf-page":return{type:"pdf-page",page:n("page"),...o};case"media-time":{if(typeof t.seconds!="number"||!Number.isFinite(t.seconds)||t.seconds<0)throw new Error("Invalid anchor time.");return{type:"media-time",seconds:t.seconds}}case"markdown-line":return{type:"markdown-line",line:n("line"),...o};case"markdown-heading":return{type:"markdown-heading",heading:Oe(t.heading,"heading"),...t.line===void 0?{}:{line:n("line")}};case"markdown-snippet":return{type:"markdown-snippet",snippet:Oe(t.snippet,"snippet"),...t.line===void 0?{}:{line:n("line")}};case"web-selection":return{type:"web-selection",snippet:Oe(t.snippet,"snippet")};default:throw new Error("Unsupported editable anchor.")}}function rr(e){let t=Ye(e);if(Object.keys(t).some(o=>!["note","tags","flagged","anchor"].includes(o)))throw new Error("Unsupported SideNote property.");let n={};if(t.note!==void 0&&(n.note=Oe(t.note,"note text")),t.tags!==void 0){if(!Array.isArray(t.tags)||!t.tags.every(o=>typeof o=="string"))throw new Error("Expected a list of tags.");n.tags=[...new Set(t.tags.map(o=>o.trim().replace(/^#+/,"")).filter(Boolean))]}if(t.flagged!==void 0){if(typeof t.flagged!="boolean")throw new Error("Expected a boolean flag.");n.flagged=t.flagged}return t.anchor!==void 0&&(n.anchor=vs(t.anchor)),n}function ar(e){return{...e,...e.tags?{tags:[...e.tags]}:{},...e.anchor?{anchor:{...e.anchor}}:{}}}async function dr(e,t,n){n.assertActive();let o=new ye(n.api);try{let s=await Ft(e,t,o);return n.assertActive(),s}finally{o.dispose()}}async function je(e,t=de()){t.assertActive();let n=await t.reader.load({kind:"ids",ids:[e]});t.assertActive();let o=n.find(s=>s.id===e);if(!o)throw new Error("The SideNote no longer exists.");return o}async function Sn(e,t,n,o,s=de()){s.assertActive();let i=ar(t),d=o?{...o}:void 0,a=Ie(await je(e,s));if(s.assertActive(),n!==void 0&&a.updatedAt!==n)throw new Error("This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.");let c=i.anchor??a.anchor;if(i.anchor){if(!(a.url?pt():ft(a.path)).includes(c.type))throw new Error("This anchor does not apply to the SideNote subject.");c=await dr(a.path,c,s),s.assertActive()}let l=Ie({...a,...i,anchor:c,updatedAt:new Date().toISOString()});if(!await Se(e,l,a.updatedAt,d,s))throw new Error("Could not save the SideNote.");return{value:Ie(l),revert:{label:"Edit SideNote",run:async()=>{if(s.assertActive(),!await Se(e,a,void 0,void 0,s))throw new Error("Could not restore the SideNote.")},reapply:async()=>{if(s.assertActive(),!await Se(e,l,void 0,void 0,s))throw new Error("Could not reapply the SideNote edit.")}}}}async function Ut(e,t,n){let o=de(e,n);o.assertActive();let s={path:t.path,url:t.url,anchor:{...t.anchor}};if(s.url){let i=await e.links.open(s.url);if(o.assertActive(),i.status==="failed"||i.status==="unavailable")throw new Error(i.message??"Destination unavailable")}else{let i=await e.vault.fileInfo(s.path);if(o.assertActive(),!i)throw new Error("The annotation file no longer exists.");e.workspace.openFile(s.path,s.anchor.type==="web-selection"?void 0:s.anchor)}}function cr(e){let t=!1,n=de(e,()=>{if(t)throw new Error("SideNotes commands are no longer active")}),o=It(),s=async a=>{n.assertActive();let c={...a};if(c.id)return je(c.id,n);let l=c.path?await e.vault.fileInfo(c.path):{url:c.url};return n.assertActive(),l},i={schema:Ze({id:ce},["id"]),parse:a=>({id:Oe(Ye(a).id,"SideNote id")}),fromCli:a=>({id:a[0]})},d=[e.commands.register({id:"list",label:"SideNotes: List annotations",labelKey:"sideNotes.command.list",paletteSafe:!1,sideEffect:"read",input:{schema:Ze({path:ce,url:ce,query:ce,flagged:{type:"boolean"}}),parse:a=>{let c=a==null?{}:Ye(a);for(let l of["path","url","query"])if(c[l]!==void 0&&typeof c[l]!="string")throw new Error(`Expected ${l} text.`);if(c.flagged!==void 0&&typeof c.flagged!="boolean")throw new Error("Expected a boolean flag.");return{path:c.path,url:c.url,query:c.query,flagged:c.flagged}}},run:async a=>{n.assertActive();let c={...a},l=await n.reader.load();return n.assertActive(),l.filter(u=>(!c.path||u.path===c.path)&&(!c.url||u.url===Q(c.url))&&(c.flagged===void 0||!!u.flagged===c.flagged)&&(!c.query||`${u.note} ${u.tags.join(" ")}`.toLowerCase().includes(c.query.toLowerCase())))}}),e.commands.register({id:"get",label:"SideNotes: Get annotation",labelKey:"sideNotes.command.get",paletteSafe:!1,sideEffect:"read",input:i,run:({id:a})=>je(a,n)}),e.commands.register({id:"open",label:"SideNotes: Open annotation",labelKey:"sideNotes.command.open",paletteSafe:!1,sideEffect:"read",input:i,run:async({id:a})=>{let c=await je(a,n);return await Ut(e,c,n.assertActive),n.assertActive(),await e.workspace.revealOwnPanel("right_sidebar"),n.assertActive(),o.publish(c),c}}),e.commands.register({id:"create",label:"SideNotes: Create annotation",labelKey:"sideNotes.command.create",paletteSafe:!1,sideEffect:"write",input:{schema:Ze({path:ce,url:ce,note:{type:"string",minLength:1},tags:ir,anchor:sr},["note"]),parse:a=>{let c=Ye(a),l=typeof c.path=="string"?c.path.trim():"",u=typeof c.url=="string"?c.url.trim():"";if(!!l==!!u)throw new Error("Provide exactly one file path or URL.");if(u&&!/^https?:\/\//i.test(u))throw new Error("Expected an HTTP or HTTPS URL.");return{path:l,url:u,...rr({note:Oe(c.note,"note text"),tags:c.tags,anchor:c.anchor})}}},run:async a=>{n.assertActive();let c=ar(a);if(c.path){let f=await e.vault.fileInfo(c.path);if(n.assertActive(),!f)throw new Error("The annotation file does not exist.")}let l=c.anchor??{type:"none"};if(!(c.url?pt():ft(c.path)).includes(l.type))throw new Error("This anchor does not apply to the annotation subject.");let u=c.url?Rt(Q(c.url),c.note,l,c.tags):Dt(c.path,c.note,await dr(c.path,l,n),c.tags);if(n.assertActive(),!await Ue(u,n))throw new Error("Could not create the SideNote.");return{value:Ie(u),revert:{label:"Create SideNote",run:async()=>{n.assertActive(),await Pe(u.id,n)},reapply:async()=>{n.assertActive(),await Ue(u,n)}}}},revision:a=>s(a),preview:a=>(n.assertActive(),{changes:a})}),e.commands.register({id:"update",label:"SideNotes: Edit annotation",labelKey:"sideNotes.command.update",paletteSafe:!1,sideEffect:"write",input:{schema:Ze({id:ce,values:ys,expectedUpdatedAt:ce},["id","values"]),parse:a=>{let c=Ye(a);return{id:Oe(c.id,"SideNote id"),values:rr(c.values),expectedUpdatedAt:c.expectedUpdatedAt===void 0?void 0:Oe(c.expectedUpdatedAt,"revision")}}},run:({id:a,values:c,expectedUpdatedAt:l})=>Sn(a,c,l,void 0,n),revision:a=>s(a),preview:a=>(n.assertActive(),{changes:a})}),e.commands.register({id:"delete",label:"SideNotes: Delete annotation",labelKey:"sideNotes.command.delete",paletteSafe:!1,sideEffect:"write",input:i,run:async({id:a})=>{let c=Ie(await je(a,n));if(n.assertActive(),!await Pe(a,n))throw new Error("Could not delete the SideNote.");return{value:Ie(c),revert:{label:"Delete SideNote",run:async()=>{n.assertActive(),await Ue(c,n)},reapply:async()=>{n.assertActive(),await Pe(a,n)}}}},revision:a=>s(a),preview:a=>(n.assertActive(),{changes:a})})];return()=>{t=!0,d.forEach(a=>a())}}var Kt=({field:e,direction:t,options:n,onFieldChange:o,onDirectionChange:s,directionForField:i})=>{let[d,a]=r.useState(e),[c,l]=r.useState(t);return r.createElement("div",{className:"sidenote-sort-popover-body"},r.createElement("div",{className:"sidenote-sort-heading"},r.createElement("span",null,p("auto.90fd0e9a6276")),r.createElement("div",{className:"sidenote-sort-directions"},["desc","asc"].map(u=>r.createElement("button",{key:u,type:"button",className:`sidenote-sort-direction${c===u?" active":""}`,"aria-label":p(u==="asc"?"auto.4fee0a06b6e4":"auto.01e635f27ec2"),"aria-pressed":c===u,onClick:()=>{l(u),s(u)}},u==="asc"?r.createElement(qe,null):r.createElement(Xe,null))))),r.createElement("div",{className:"sidenote-sort-options"},n.map(u=>r.createElement("button",{key:u.value,type:"button",className:`sidenote-popover-option${d===u.value?" active":""}`,"aria-pressed":d===u.value,onClick:()=>{let f=d!==u.value;a(u.value),o(u.value);let v=f?i?.(u.value):void 0;v&&(l(v),s(v))}},r.createElement("span",null,u.label),r.createElement(wn,{className:"sidenote-popover-check"})))))},ur=({value:e,options:t,onChange:n})=>{let[o,s]=r.useState(e);return r.createElement("div",{className:"sidenote-sort-options sidenote-filter-options"},t.map(i=>r.createElement("button",{key:i.value,type:"button",className:`sidenote-popover-option${o===i.value?" active":""}`,"aria-pressed":o===i.value,onClick:()=>{s(i.value),n(i.value)}},r.createElement("span",null,i.label),r.createElement(wn,{className:"sidenote-popover-check"}))))},lr=({value:e,min:t,ariaLabel:n,onCommit:o})=>{let[s,i]=r.useState(String(e)),d=r.useRef(!1);r.useEffect(()=>{d.current||i(String(e))},[e]);let a=c=>{let l=Number(c),u=c.trim()===""||!Number.isFinite(l)?t:Math.max(t,l);i(String(u)),o(u)};return r.createElement("input",{type:"number",min:t,value:s,"aria-label":n,onFocus:()=>{d.current=!0},onChange:c=>{i(c.target.value);let l=Number(c.target.value);c.target.value.trim()!==""&&Number.isFinite(l)&&o(Math.max(t,l))},onBlur:c=>{d.current=!1,a(c.target.value)}})},ws=({seconds:e,onCommit:t})=>{let[n,o]=r.useState(Ge(e)),s=r.useRef(!1);r.useEffect(()=>{s.current||o(Ge(e))},[e]);let i=()=>{let d=y.workspace.getMediaTime();d!==null&&(t(Math.max(0,d)),o(Ge(d)))};return r.createElement("div",{className:"sidenote-time-field"},r.createElement("input",{value:n,placeholder:"0:00","aria-label":p("auto.19eabc961735"),onFocus:()=>{s.current=!0},onChange:d=>{o(d.target.value);let a=vn(d.target.value);a!==null&&t(a)},onBlur:d=>{s.current=!1;let a=vn(d.target.value),c=a===null?0:Math.max(0,a);t(c),o(Ge(c))}}),r.createElement("button",{type:"button",className:"sidenote-time-capture",title:p("auto.528bfa4632ef"),onClick:i},p("auto.e3b82040565b")))},Nn=({path:e,web:t=!1,anchor:n,onChange:o,validationMsg:s,invalid:i})=>{let d=t?pt():ft(e),{SelectField:a}=y.ui.settings,c=y.ui.ComboField,[l,u]=r.useState([]);return r.useEffect(()=>{if(n.type!=="markdown-heading"){u([]);return}Xo(e).then(u)},[e,n.type]),d.length===1&&n.type==="none"?r.createElement(r.Fragment,null):r.createElement("div",{className:`sidenote-anchor-editor${i?" invalid":""}`},r.createElement("div",{className:"sidenote-select-wrap"},r.createElement(a,{value:n.type,onChange:f=>o(Go(f,n)),ariaLabel:p("auto.9c36384c83fb"),options:d.map(f=>({value:f,label:t&&f==="none"?p("auto.eeb742ed8cac"):p(lt[f])}))})),n.type==="web-selection"&&r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.98c236df91df"),"aria-label":p("auto.4b5ddf04bbe5")}),n.type==="pdf-page"&&r.createElement(r.Fragment,null,r.createElement(lr,{value:n.page,min:1,ariaLabel:p("auto.300721defdc9"),onCommit:f=>o({...n,page:f})}),r.createElement("input",{className:"sidenote-anchor-snippet",value:n.snippet??"",onChange:f=>o({...n,snippet:f.target.value||void 0}),placeholder:p("auto.2599b7d91cc5"),"aria-label":p("auto.1e149756b7c6")})),n.type==="media-time"&&r.createElement(ws,{seconds:n.seconds,onCommit:f=>o({...n,seconds:f})}),n.type==="markdown-line"&&r.createElement(lr,{value:n.line,min:1,ariaLabel:p("auto.7555728cb6e5"),onCommit:f=>o({...n,line:f})}),n.type==="markdown-heading"&&r.createElement(c,{value:n.heading,onChange:f=>o({...n,heading:f}),options:l.map(f=>({value:f,label:f})),placeholder:p("auto.a3089b7fae27"),ariaLabel:p("auto.353e665a44c8")}),n.type==="markdown-snippet"&&r.createElement("input",{value:n.snippet,onChange:f=>o({...n,snippet:f.target.value}),placeholder:p("auto.2e5ce5a06a35"),"aria-label":p("auto.ef6127596cae")}),s&&r.createElement("p",{className:"sidenote-anchor-warning"},s))},Gt=({note:e,onSaved:t,onClose:n})=>{let[o,s]=r.useState(e.note),[i,d]=r.useState(e.tags),[a,c]=r.useState(e.anchor),[l,u]=r.useState(!!e.flagged),[f,v]=r.useState(!1),[A,C]=r.useState(""),[h,O]=r.useState(),D={pluginId:"sideNotes",sourceId:"notes",itemId:e.id},z=async()=>{if(!f)try{await y.documents.drafts.clear(D),n()}catch(T){C(T instanceof Error?T.message:String(T))}},I=async()=>{if(!(f||!o.trim())){v(!0),C("");try{if(!h)throw new Error(p("sideNotes.error.save"));let T=await Sn(e.id,{note:o,tags:i,anchor:a,flagged:l},e.updatedAt,h);y.undo.push({label:p("sideNotes.command.update"),undo:async()=>{try{return await T.revert.run(),{ok:!0}}catch(K){return{ok:!1,message:String(K)}}},redo:async()=>{try{return await T.revert.reapply(),{ok:!0}}catch(K){return{ok:!1,message:String(K)}}}}),t(T.value),await y.documents.drafts.clear(D),n()}catch(T){C(T instanceof Error?T.message:String(T))}finally{v(!1)}}},U=r.createElement("div",{className:"sidenote-edit-actions"},r.createElement("button",{className:"sidenote-cancel-btn",disabled:f,onClick:()=>{z()}},p("auto.77dfd2135f4d")),r.createElement("button",{className:"sidenote-save-btn",disabled:f||!o.trim()||!h,onClick:()=>{I()}},p("auto.efc007a393f6")));return r.createElement(y.ui.Modal,{title:p("sideNotes.command.update"),size:"medium",bodyClassName:"sidenote-edit-form",onClose:()=>{z()},footer:U},r.createElement(y.ui.NoteInput,{value:o,context:{ref:D,sourcePath:e.path||void 0},tags:i,onTagsChange:d,onRevisionChange:T=>O(K=>!K||T.expectedRevision<K.expectedRevision?T:K),onChange:s,onSave:()=>{I()},onCancel:()=>{z()}}),r.createElement(y.ui.TagInput,{value:i,onChange:d}),r.createElement(Nn,{path:e.path,web:!!e.url,anchor:a,onChange:c}),r.createElement("label",null,r.createElement("input",{type:"checkbox",checked:l,disabled:f,onChange:T=>u(T.target.checked)}),p("sideNotes.field.flagged")),A&&r.createElement("p",{role:"alert"},p("sideNotes.error.save")," ",A))},Wt=({noteId:e,setOpenId:t,onEdit:n,onDelete:o,disabled:s=!1})=>r.createElement("div",{className:"sidenote-menu-wrap"},r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.5430d0e5fb8c"),title:p("auto.6bf5da9c080b"),disabled:s,onClick:i=>{i.stopPropagation(),t(e),y.ui.openMenu([{label:p("auto.5301648dcf6b"),icon:r.createElement(er,null),enabled:!s,onSelect:n},{label:p("auto.f6fdbe48dc54"),icon:r.createElement(tr,null),enabled:!s,danger:!0,onSelect:o}],{anchor:i.currentTarget,align:"end"}).finally(()=>t(null))}},r.createElement(Qo,null)));function Ss(e){let t=[],n=e.replace(/#(\S+)/g,(o,s)=>(t.push(s.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:n}}function Ht(e,t,...n){let o=Ss(e);if(!o.tags.length&&!o.text)return!0;let s=t.map(i=>i.toLowerCase());for(let i of o.tags)if(!s.some(d=>d.startsWith(i)))return!1;return!(o.text&&!n.map(d=>d.toLowerCase()).some(d=>d.includes(o.text)))}var xn={type:"object",properties:{v:{type:"literal",value:1},search:{type:"string"},filterWarning:{type:"boolean"},showAll:{type:"boolean"},compact:{type:"boolean"},sourceType:{type:"string"},sortField:{type:"string"},sortDir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]},aware:{type:"boolean"},path:{type:"string"},url:{type:"string"},noteId:{type:"string"}},required:["v","search","filterWarning","sortField","sortDir"],additionalProperties:!1};function ve(){return y.runtime.getOrCreate("sideNotes.surfaces",()=>({views:new Map,selected:new Map,listeners:new Set}))}function Xt(e=ve()){for(let t of e.listeners)t()}function pr(e,t=ve()){let n=t.listeners;return n.add(e),()=>{n.delete(e)}}function qt(e,t=ve()){return{v:1,search:"",filterWarning:!1,...e==="left_sidebar"?{showAll:!1,compact:!1,sourceType:"all",sortField:"updated",sortDir:"desc"}:{sortField:"position",sortDir:"asc",aware:!1,path:"",url:""},...t.views.get(e)}}function le(e,t,n){let o=()=>qt(e)[t]??n;return[r.useSyncExternalStore(pr,o,o),i=>{ve().views.set(e,{...qt(e),[t]:typeof i=="function"?i(o()):i}),Xt()}]}function Je(e,t){e?ve().selected.set(t,e):ve().selected.delete(t),Xt()}function fr(e,t){r.useEffect(()=>{let n=qt("right_sidebar");if(n.path===e&&n.url===t)return;ve().views.set("right_sidebar",{...n,path:e,url:t});let o=ve().selected.get("right_sidebar");o&&(o.path!==e||(o.url??"")!==t)&&ve().selected.delete("right_sidebar"),Xt()},[e,t])}function Ns(e,t=ve()){let n=t.selected.get(e),o={...qt(e,t)};return o.path||delete o.path,{title:p("manifest.name"),view:o,...n?{item:{id:n.id,title:n.note.split(`
`)[0].slice(0,100),state:{...o,noteId:n.id}}}:{}}}function gr(e){let t=ve(),n=Te(),o=!1,s=()=>{if(o||!n.isActive())throw new Error("SideNotes surface is no longer active")},i=de(e,s),d=new Map,c=["left_sidebar","right_sidebar"].map(u=>pn(e,{id:`sideNotes.${u}`,surface:u,getSnapshot:()=>Ns(u,t),subscribe:f=>pr(f,t),restore:async(f,v,A)=>{s(),f={...f};let C=A?.background===!0,h=(d.get(u)??0)+1;d.set(u,h);let O=()=>{if(s(),d.get(u)!==h)throw new Error("SideNotes surface restore was replaced")};if(f.v!==1)throw new Error("Unsupported SideNotes bookmark.");let D=typeof f.noteId=="string"?await je(f.noteId,i):null;O();let z=async U=>{let T=await e.vault.fileInfo(U);return O(),!!T};if(u==="right_sidebar"&&!D&&typeof f.path=="string"&&f.path&&!await z(f.path))throw new Error("The bookmarked file no longer exists.");if(D&&!D.url&&!await z(D.path))throw new Error("The bookmarked file no longer exists.");!C&&D?await Ut(e,D,O):!C&&u==="right_sidebar"&&(typeof f.path=="string"&&f.path||typeof f.url=="string"&&f.url)&&await Ut(e,{path:typeof f.path=="string"?f.path:"",url:typeof f.url=="string"?f.url:void 0,anchor:{type:"none"}},O),O();let I={v:1};for(let U of["search","path","url","sourceType"])typeof f[U]=="string"&&(I[U]=f[U]);for(let U of["showAll","compact","filterWarning","aware"])I[U]=f[U]===!0;I.sortField=["position","updated","created","title"].includes(String(f.sortField))?f.sortField:u==="left_sidebar"?"updated":"position",I.sortDir=f.sortDir==="desc"?"desc":"asc",t.views.set(u,I),D?t.selected.set(u,D):t.selected.delete(u),Xt(t)}},{stateSchema:xn,itemStateSchema:{...xn,required:[...xn.required,"noteId"]},description:(f,v)=>typeof f.view.path=="string"&&f.view.path?f.view.path:p(v?"bookmark.item":"bookmark.view")})),l=0;return c.push(n.subscribe(()=>{if(o||!n.isActive())return;let u=++l,f=[...t.selected];f.length&&n.load({kind:"ids",ids:f.map(([,v])=>v.id)}).then(v=>{if(!(o||!n.isActive()||u!==l)){for(let[A,C]of f){if(t.selected.get(A)!==C)continue;let h=v.find(O=>O.id===C.id);h?t.selected.set(A,h):t.selected.delete(A)}for(let A of t.listeners)A()}}).catch(()=>{if(!o&&n.isActive()&&u===l)for(let v of t.listeners)v()})})),()=>{o=!0,c.forEach(u=>u())}}function mr(e,t){if(e.url){e.url!==t&&y.links.open(e.url);return}y.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}var hr={position:"Position",created:"Created",updated:"Updated"},xs={position:"asc",created:"desc",updated:"desc"},br=()=>{let e=Io()??"",t=To(),n=!e&&!!t?.url,o=n&&t?Q(t.url):"",s=n?"":e,i=r.useMemo(()=>_e(s),[s]),d=i==="pdf"||i==="video"||i==="audio"||i==="text",a=!!s||n,c=n?`web:${o}`:s;fr(s,o);let{notes:l,setNotes:u,loading:f,error:v,reload:A}=Ke(n?{kind:"web",url:o}:s?{kind:"file",path:s}:{kind:"none"}),{isPending:C,setPending:h,pending:O}=_o(),[D,z]=r.useState(""),[I,U]=r.useState([]),[T,K]=r.useState(()=>yn(s)),[te,he]=r.useState(!1),[xe,ze]=r.useState(null),[we,Ae]=r.useState(null),[S,P]=le("right_sidebar","search",""),[V,G]=le("right_sidebar","filterWarning",!1),[R,Z]=le("right_sidebar","sortField",d?"position":"updated"),[ie,be]=le("right_sidebar","sortDir",d?"asc":"desc"),Y=!d&&R==="position"?"updated":R,ne=!d&&R==="position"?"desc":ie,[ue,ke]=r.useState(new Map),[fe,ge]=r.useState({}),[et,Zt]=r.useState("ok"),[Yt,b]=r.useState(!1),w=r.useRef(!1),[M,W]=r.useState(0),[L,oe]=r.useState(new Map),[se,kr]=le("right_sidebar","aware",!1),[Jt,In]=r.useState({}),[Er,Ir]=r.useState(0),[Tr,_r]=r.useState(0),tt=Tt();r.useEffect(()=>y.files.onAnchorInfoChanged(()=>W(g=>g+1)),[]),r.useEffect(()=>tt.subscribe(()=>_r(g=>g+1)),[tt]);let Tn=r.useMemo(()=>{let g=Number(y.settings.get().mediaRangeSeconds);return Number.isFinite(g)&&g>=0?g:10},[Er]);r.useEffect(()=>y.settings.subscribe(()=>Ir(g=>g+1)),[]);let Qt=r.useCallback(()=>({pdfPages:s?y.workspace.getPdfVisiblePages(s):null,mediaSeconds:y.workspace.getMediaTime(),lineRange:s?y.workspace.getVisibleLineRange(s):null}),[s]);r.useEffect(()=>{if(!se||!s||!d){In({});return}let g=()=>In(Qt());g();let m=y.files.onActivePositionChanged(g),_=i==="video"||i==="audio"?window.setInterval(g,1e3):void 0;return()=>{m(),_&&window.clearInterval(_)}},[se,s,i,d,Qt]);let nt=r.useMemo(()=>n?l.filter(g=>g.url===o):s?l.filter(g=>g.path===s&&!g.url):[],[l,s,o,n]),bt=r.useMemo(()=>{if(Y==="position"){let m=[...nt].sort((E,_)=>Ko(E,_,L));return ne==="desc"?m.reverse():m}let g=Y==="created"?"createdAt":"updatedAt";return[...nt].sort((m,E)=>{let _=m[g].localeCompare(E[g])||ut(m.anchor)-ut(E.anchor);return ne==="asc"?_:-_})},[nt,Y,ne,L]),yt=r.useMemo(()=>{let g=S.trim()?bt.filter(m=>Ht(S,m.tags??[],m.note)):bt;return se&&d&&(g=g.filter(m=>Bo(m.anchor,Jt,Tn))),V&&(g=g.filter(m=>ue.has(m.id))),g},[bt,S,V,ue,se,d,Jt,Tn]),vt=r.useRef([]),[Pr,_n]=r.useState(0);r.useEffect(()=>{vt.current=yt.map(g=>g.id),_n(g=>g+1)},[s,Y,ne,S,V,se,Jt]);let wt=r.useMemo(()=>{let g=new Map(yt.map(_=>[_.id,_])),m=[];for(let _ of vt.current){let H=g.get(_);H&&m.push(H)}let E=new Set(vt.current);for(let _ of yt)E.has(_.id)||m.push(_);return vt.current=m.map(_=>_.id),m},[yt,Pr]),Cr=r.useMemo(()=>wt.map(g=>g.id),[wt]),Pn=Lt(r,{ids:Cr,estimate:140,pinned:[we?.id,xe]});r.useEffect(()=>{K(n?{type:"none"}:yn(s)),z(""),U([]),he(!1),Z(d?"position":"updated"),be(d?"asc":"desc")},[c]),r.useEffect(()=>{let g=new ye,m=Y==="position";return zt(nt,g,{path:s,positions:m}).then(({statuses:E,keys:_})=>{g.isActive()&&(ke(E),ge(H=>({...H,projection:void 0})),m&&(oe(_),_n(H=>H+1)))}).catch(E=>{E instanceof Ne||!g.isActive()||ge(_=>({..._,projection:p("sideNotes.error.load")}))}).finally(()=>g.dispose()),()=>g.dispose()},[nt,s,Y,M]),r.useEffect(()=>{if(!te||!s){ge(m=>({...m,draft:void 0}));return}let g=new ye;return Wo(s,T,g).then(m=>{g.isActive()&&(Zt(m),ge(E=>({...E,draft:void 0})))}).catch(m=>{m instanceof Ne||!g.isActive()||ge(E=>({...E,draft:p("sideNotes.error.load")}))}).finally(()=>g.dispose()),()=>g.dispose()},[T,te,s,M]);let Cn=async()=>{if(w.current)return;let g=D.trim();if(!(!g||!a)){w.current=!0,b(!0);try{let m=n?Rt(o,g,T,I):Dt(s,g,await Ft(s,T),I);u(_=>[..._,m]),z(""),U([]),he(!1),await Ue(m)||(u(_=>_.filter(H=>H.id!==m.id)),z(g),he(!0))}finally{w.current=!1,b(!1)}}},On=async(g,m)=>{if(C(g))return!1;let E=l.find(H=>H.id===g);if(!E)return!1;let _={...E,...m,updatedAt:new Date().toISOString()};h(g,!0),u(H=>H.map(pe=>pe.id===g?_:pe));try{let H=await Se(g,_,E.updatedAt);return H||u(pe=>pe.map(Dn=>Dn.id===g?E:Dn)),H}finally{h(g,!1)}},Or=async g=>{if(C(g))return;let m=l.find(E=>E.id===g);if(m){h(g,!0),u(E=>E.filter(_=>_.id!==g));try{await Pe(g)||u(_=>_.some(H=>H.id===g)?_:[..._,m])}finally{h(g,!1)}}},Dr=async g=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await Or(g)},Rr=g=>Ae(g);r.useEffect(()=>{let g=It(),m=()=>{let E=g.get();E&&(Ae(E),g.publish(null))};return m(),g.subscribe(m)},[]),r.useEffect(()=>{let g=tt.get();if(!g)return;let m=E=>{tt.consume(g),z(""),U([]),K(E),he(!0)};if(g.kind==="web"){n&&Q(g.url??"")===o&&m({type:"web-selection",snippet:g.snippet});return}g.kind==="file"&&g.path===s&&!n&&m({type:"pdf-page",page:g.page??1,snippet:g.snippet})},[s,o,n,Tr,tt]);let Mr=(d?["position","created","updated"]:["updated","created"]).map(g=>({value:g,label:hr[g]})),Lr=g=>{y.ui.openPopover(()=>r.createElement(Kt,{field:Y,direction:ne,options:Mr,onFieldChange:m=>{Z(m)},onDirectionChange:be,directionForField:m=>xs[m]}),{anchor:g,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})};return r.createElement("div",{className:"sidenotes-panel"},r.createElement("header",{className:"panel-header sidenotes-header"},r.createElement("div",{className:"panel-header-label sidenotes-title"},n?r.createElement($t,null):r.createElement(Zo,null),r.createElement("span",{className:"panel-title",title:n?o:void 0},n?_t(o):p("auto.7d660ae8b46e"))),r.createElement("div",{className:"sidenotes-header-actions"},d&&r.createElement("button",{className:`sidenote-icon-btn${se?" active":""}`,"aria-label":p("auto.580535153931"),title:se?p("auto.df4a8bd943cc"):p("auto.7b9b8574c69b"),onClick:()=>kr(g=>!g)},r.createElement(or,null)),ue.size>0&&r.createElement("button",{className:`sidenote-icon-btn${V?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>G(g=>!g)},r.createElement(He,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${ne==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${hr[Y]}`,"aria-haspopup":"dialog",onClick:g=>Lr(g.currentTarget)},ne==="asc"?r.createElement(qe,null):r.createElement(Xe,null)),r.createElement("button",{className:"sidenote-icon-btn","aria-label":p("auto.7a7e81b96c3a"),title:p("auto.d48a73614c7f"),onClick:()=>{let g=!te;he(g),g?K(n?{type:"none"}:Uo(s,Qt())):z("")},disabled:!a},r.createElement(Yo,null)))),a?r.createElement(r.Fragment,null,r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Vt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:S,onChange:g=>P(g.target.value),placeholder:p("auto.49cd864445a9"),"aria-label":p("auto.f1b5671b118f")}),S&&r.createElement("button",{className:"search-field-action",onClick:()=>P(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Bt,null)))),te&&r.createElement("div",{className:"sidenote-create"},r.createElement(y.ui.NoteInput,{value:D,onChange:z,context:{sourcePath:s||void 0},onSave:()=>{Cn()},onCancel:()=>{he(!1),z(""),U([])},autoFocus:!0}),r.createElement(y.ui.TagInput,{value:I,onChange:U}),r.createElement(Nn,{path:s,web:n,anchor:T,onChange:K,invalid:!n&&et!=="ok",validationMsg:!n&&et!=="ok"?gt(T,et):void 0}),r.createElement("div",{className:"sidenote-create-actions"},r.createElement("button",{className:"sidenote-save-btn",onClick:()=>{Cn()},disabled:!D.trim()||Yt},p("auto.757092db3c4b")),bt.length>0&&r.createElement("button",{className:"sidenote-cancel-btn",onClick:()=>{he(!1),z(""),U([])}},p("auto.77dfd2135f4d")))),r.createElement("div",{className:"sidenote-list",ref:Pn.ref},(v||fe.projection||fe.draft)&&r.createElement("div",{role:"alert"},v||fe.projection||fe.draft," ",r.createElement("button",{type:"button",onClick:()=>{A(),W(g=>g+1)}},p("sideNotes.action.retry"))),f?r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.33ce417454bf"))):wt.length?Pn.render(g=>{let m=wt[g],E=ue.get(m.id),_=E!==void 0,H=O.has(m.id);return r.createElement("article",{key:m.id,"data-visible-key":m.id,"data-visible-index":g,className:`sidenote-card${m.flagged?" flagged":""}${_?" invalid":""}`,onClick:()=>{Je(m,"right_sidebar"),mr(m,o)}},r.createElement("div",{className:"sidenote-card-meta",onClick:pe=>pe.stopPropagation()},m.anchor.type!=="none"&&r.createElement("button",{className:"sidenote-anchor-badge",onClick:()=>mr(m,o),title:m.url?p("auto.9ee309dcedc9"):`${m.path} \xB7 ${We(m.anchor)}`},!m.url&&m.anchor.type==="markdown-heading"?m.path.split("/").pop():We(m.anchor)),r.createElement("div",{className:"sidenote-card-btns"},_&&E&&r.createElement(He,{className:"sidenote-warning-icon",title:gt(m.anchor,E)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${m.flagged?" active":""}`,"aria-label":m.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:m.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),disabled:H,onClick:()=>{On(m.id,{flagged:!m.flagged})}},r.createElement(mt,null)),r.createElement(Wt,{noteId:m.id,openId:xe,setOpenId:ze,onEdit:()=>Rr(m),onDelete:()=>{Dr(m.id)},disabled:H}))),r.createElement(r.Fragment,null,r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown",value:m.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:m.id},sourcePath:m.path||void 0},onChange:pe=>{On(m.id,{note:pe})}}),m.tags&&m.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:pe=>pe.stopPropagation()},m.tags.map(pe=>r.createElement("span",{key:pe,className:"sidenote-tag-view-pill"},"#",pe)))))}):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,S?p("auto.b690846c83ff"):se&&d?p("auto.8f4043581269"):n?p("auto.8c8077ac2313"):p("auto.31b291dd535e"))))):r.createElement("div",{className:"right-sidebar-empty"},r.createElement("p",null,p("auto.34f6835f5ddf"))),we&&r.createElement(Gt,{key:we.id,note:we,onSaved:g=>{u(m=>m.map(E=>E.id===g.id?g:E)),Je(g,"right_sidebar")},onClose:()=>Ae(null)}))};var As=[".md",".mp3",".mp4",".pdf"];function yr(e){let t=e.trim().toLowerCase();return t?t.startsWith(".")?t:`.${t}`:""}function vr(e){return/^\.[^./\\\s]+$/.test(e)}function ht(e){let n=(Array.isArray(e)?e:As).flatMap(o=>{if(typeof o!="string")return[];let s=yr(o);return vr(s)?[st(`file${s}`)]:[]});return[...new Set(n)]}var wr=()=>{let[e,t]=r.useState(()=>y.settings.get());r.useEffect(()=>y.settings.subscribe(()=>t(y.settings.get())),[]);let n=typeof e.mediaRangeSeconds=="number"?e.mediaRangeSeconds:10,o=ht(e.filterTypes),{ChipsField:s,NumberField:i,Row:d,Section:a}=y.ui.settings,c=(l,u)=>{t(f=>({...f,[l]:u})),y.settings.set(l,u)};return r.createElement(a,null,r.createElement(d,{title:p("plugin.sideNotes.field.awareRange"),description:p("auto.204e47f6d7a2")},r.createElement(i,{value:n,step:1,ariaLabel:p("plugin.sideNotes.field.awareRange"),onChange:l=>{l!=null&&t(u=>({...u,mediaRangeSeconds:l}))},onCommit:l=>{l!=null&&c("mediaRangeSeconds",l)}})),r.createElement(d,{className:"sidenotes-filter-types-row",title:p("plugin.sideNotes.field.filterTypes"),description:p("plugin.sideNotes.field.filterTypesDesc")},r.createElement(s,{className:"sidenotes-filter-types-editor",items:o,onChange:l=>c("filterTypes",ht(l)),normalize:yr,validate:l=>vr(l),placeholder:".png",ariaLabel:p("plugin.sideNotes.field.filterTypes"),commitOn:["enter","comma","space","blur"],reorderable:!0})))};var Sr={updated:"Updated",created:"Created",name:"Name"},Fe="all",An="web",kn="no-extension";function Qe(e){return e.url?_t(e.url):e.path.split("/").pop()??e.path}function Nr(e){return e.url?An:st(e.path)||kn}function ks(e){e.url?y.links.open(e.url):y.workspace.openFile(e.path,e.anchor.type==="web-selection"?void 0:e.anchor)}function Es(e,t,n){if(n==="name"){let i=Qe(e).localeCompare(Qe(t),void 0,{sensitivity:"base"});return i!==0?i:e.note.localeCompare(t.note,void 0,{sensitivity:"base"})}let o=n==="created"?"createdAt":"updatedAt",s=e[o].localeCompare(t[o]);return s!==0?s:Qe(e).localeCompare(Qe(t),void 0,{sensitivity:"base"})}var xr=()=>{let{notes:e,setNotes:t,loading:n,error:o,reload:s}=Ke(),[i,d]=le("left_sidebar","search",""),[a,c]=le("left_sidebar","showAll",!1),[l,u]=le("left_sidebar","sortField","updated"),[f,v]=le("left_sidebar","sortDir","desc"),[A,C]=r.useState(new Map),[h,O]=r.useState(null),[D,z]=le("left_sidebar","filterWarning",!1),[I,U]=le("left_sidebar","sourceType",Fe),[T,K]=le("left_sidebar","compact",!1),[te,he]=r.useState(null),[xe,ze]=r.useState(null),[we,Ae]=r.useState(0),[S,P]=r.useState(()=>{let b=y.settings.get();return ht(b.filterTypes)});r.useEffect(()=>y.files.onAnchorInfoChanged(()=>Ae(b=>b+1)),[]),r.useEffect(()=>y.settings.subscribe(()=>{let b=y.settings.get();P(ht(b.filterTypes))}),[]);let V=r.useMemo(()=>{let b=new Set(e.map(Nr)),w=[...b].filter(M=>M.startsWith(".")&&!S.includes(M)).sort();return[{value:Fe,label:p("auto.6a72085653e4")},...S.map(M=>({value:M,label:M})),...w.map(M=>({value:M,label:M})),...b.has(kn)?[{value:kn,label:p("sideNotes.filter.noExtension")}]:[],...b.has(An)?[{value:An,label:p("sideNotes.filter.web")}]:[]]},[e,S]);r.useEffect(()=>{n||o||V.some(b=>b.value===I)||U(Fe)},[I,V,U,n,o]);let G=r.useMemo(()=>{let b=a?e:e.filter(W=>W.flagged),w=I===Fe?b:b.filter(W=>Nr(W)===I);return[...i.trim()?w.filter(W=>Ht(i,W.tags??[],W.note,W.url??W.path)):w].sort((W,L)=>{let oe=Es(W,L,l);return f==="asc"?oe:-oe})},[e,i,a,I,l,f]),R=r.useRef([]),[Z,ie]=r.useState(0);r.useEffect(()=>{R.current=G.map(b=>b.id),ie(b=>b+1)},[a,l,f,i,I]);let be=r.useRef(!1);r.useEffect(()=>{n||be.current||(be.current=!0,R.current=G.map(b=>b.id),ie(b=>b+1))},[n]);let Y=r.useMemo(()=>{let b=D?G.filter(L=>A.has(L.id)):G,w=new Map(b.map(L=>[L.id,L])),M=[];for(let L of R.current){let oe=w.get(L);oe&&M.push(oe)}let W=new Set(R.current);for(let L of b)W.has(L.id)||M.push(L);return R.current=M.map(L=>L.id),M},[G,Z,D,A]),ne=r.useMemo(()=>Y.map(b=>b.id),[Y]),ue=Lt(r,{ids:ne,estimate:T?64:140,pinned:[xe?.id,te],layoutKey:T});r.useEffect(()=>{let b=new ye;return zt(G,b).then(({statuses:w})=>{b.isActive()&&(C(w),O(null))}).catch(w=>{w instanceof Ne||!b.isActive()||O(p("sideNotes.error.load"))}).finally(()=>b.dispose()),()=>b.dispose()},[G,we]);let ke=async(b,w)=>{let M=e.find(oe=>oe.id===b);if(!M)return;let W={...M,...w,updatedAt:new Date().toISOString()};t(oe=>oe.map(se=>se.id===b?W:se)),await Se(b,W,M.updatedAt)||t(oe=>oe.map(se=>se.id===b?M:se))},fe=async b=>{let w=e;t(W=>W.filter(L=>L.id!==b)),await Pe(b)||t(w)},ge=async b=>{await y.ui.confirm({title:p("auto.042dc9b751ed"),message:p("sideNotes.delete.message"),actions:[{label:p("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:p("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await fe(b)},et=b=>ze(b),Zt=b=>{y.ui.openPopover(()=>r.createElement(Kt,{field:l,direction:f,options:Object.entries(Sr).map(([w,M])=>({value:w,label:M})),onFieldChange:w=>u(w),onDirectionChange:v}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.90fd0e9a6276")})},Yt=b=>{y.ui.openPopover(()=>r.createElement(ur,{value:I,options:V,onChange:U}),{anchor:b,align:"end"},{className:"sidenote-sort-popover",ariaLabel:p("auto.0aafb761a83c")})};return r.createElement("div",{className:"panel"},r.createElement("div",{className:"panel-header"},r.createElement("span",{className:"panel-title"},p("auto.7d660ae8b46e")),r.createElement("div",{className:"sidenotes-header-actions"},r.createElement("button",{className:`sidenote-icon-btn${a?"":" active"}`,"aria-label":a?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),title:a?p("auto.6a72085653e4"):p("auto.f8db8a172be6"),"aria-pressed":!a,onClick:()=>c(b=>!b)},r.createElement(mt,null)),A.size>0&&r.createElement("button",{className:`sidenote-icon-btn${D?" active":""}`,"aria-label":p("auto.f61b9fcd0854"),title:p("auto.74a3a904b38b"),onClick:()=>z(b=>!b)},r.createElement(He,null)),r.createElement("button",{className:`sidenote-icon-btn${T?" active":""}`,"aria-label":p("auto.77f9b062ce1b"),title:T?p("auto.d2f76731e1e1"):p("auto.e3719eae891e"),onClick:()=>K(b=>!b)},r.createElement(nr,null)),r.createElement("button",{className:`sidenote-icon-btn${I!==Fe?" active":""}`,"aria-label":p("auto.0aafb761a83c"),title:`${p("auto.0aafb761a83c")} \xB7 ${V.find(b=>b.value===I)?.label??p("auto.6a72085653e4")}`,"aria-haspopup":"dialog","aria-pressed":I!==Fe,onClick:b=>Yt(b.currentTarget)},r.createElement(Jo,null)),r.createElement("button",{className:"sidenote-icon-btn sidenote-sort-menu-btn","aria-label":p("auto.90fd0e9a6276"),title:`${f==="asc"?p("auto.4fee0a06b6e4"):p("auto.01e635f27ec2")} \xB7 ${Sr[l]}`,"aria-haspopup":"dialog",onClick:b=>Zt(b.currentTarget)},f==="asc"?r.createElement(qe,null):r.createElement(Xe,null)))),r.createElement("div",{className:"search-field-row"},r.createElement("div",{className:"sidenote-search-bar search-field"},r.createElement(Vt,{className:"search-field-icon"}),r.createElement("input",{className:"search-field-input",value:i,onChange:b=>d(b.target.value),placeholder:a?p("auto.49cd864445a9"):p("auto.7c0451dde956"),"aria-label":p("auto.ff4f3043a289")}),i&&r.createElement("button",{className:"search-field-action",onClick:()=>d(""),"aria-label":p("auto.b667d6f9f635")},r.createElement(Bt,null)))),r.createElement("div",{className:"panel-body flagged-notes-panel-body hidescrollbar"},(o||h)&&r.createElement("div",{role:"alert"},o||h," ",r.createElement("button",{type:"button",onClick:()=>{s(),Ae(b=>b+1)}},p("sideNotes.action.retry"))),n?r.createElement("div",{className:"tree-empty"},p("auto.33ce417454bf")):Y.length===0?r.createElement("div",{className:"tree-empty"},i||I!==Fe?p("auto.b690846c83ff"):a?p("auto.d2a1e72bc320"):p("auto.f5ca64c680ee")):r.createElement("div",{className:"flagged-notes-list",ref:ue.ref},ue.render(b=>{let w=Y[b],M=A.get(w.id),W=M!==void 0;return r.createElement("div",{key:w.id,"data-visible-key":w.id,"data-visible-index":b,className:`flagged-note-card${w.flagged?" flagged":""}${W?" invalid":""}${T?" compact":""}`,onClick:()=>{Je(w,"left_sidebar"),ks(w)},title:w.url??w.path},r.createElement("div",{className:"flagged-note-header"},r.createElement("div",{className:"flagged-note-meta-row"},r.createElement("div",{className:"flagged-note-meta-left"},w.url?w.anchor.type!=="none"&&r.createElement("span",{className:"flagged-note-anchor"},We(w.anchor)):r.createElement("span",{className:"flagged-note-anchor",title:`${w.path}${w.anchor.type!=="none"?` \xB7 ${We(w.anchor)}`:""}`},Qe(w))),r.createElement("div",{className:"flagged-note-meta-right"},W&&M&&r.createElement(He,{className:"sidenote-warning-icon",title:gt(w.anchor,M)}),r.createElement("button",{className:`sidenote-icon-btn sidenote-flag-btn${w.flagged?" active":""}`,"aria-label":w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),title:w.flagged?p("auto.b855c604e861"):p("auto.a774409a00c2"),onClick:L=>{L.stopPropagation(),ke(w.id,{flagged:!w.flagged})}},r.createElement(mt,null)),r.createElement(Wt,{noteId:w.id,openId:te,setOpenId:he,onEdit:()=>et(w),onDelete:()=>{ge(w.id)}}))),w.url&&r.createElement("span",{className:"flagged-note-file"},r.createElement($t,{className:"flagged-note-web-icon"}),Qe(w))),T&&(()=>{let L=w.note.split(`
`).find(oe=>oe.trim())?.replace(/^#+\s*/,"").trim();return L?r.createElement("p",{className:"flagged-note-preview"},L):null})(),r.createElement(r.Fragment,null,!T&&r.createElement(y.ui.MarkdownView,{className:"sidenote-markdown sidenote-markdown--compact",value:w.note,context:{ref:{pluginId:"sideNotes",sourceId:"notes",itemId:w.id},sourcePath:w.path||void 0},onChange:L=>{ke(w.id,{note:L})}}),!T&&w.tags&&w.tags.length>0&&r.createElement("div",{className:"sidenote-tags-view",onClick:L=>L.stopPropagation()},w.tags.map(L=>r.createElement("span",{key:L,className:"sidenote-tag-view-pill"},"#",L)))))}))),xe&&r.createElement(Gt,{key:xe.id,note:xe,onSaved:b=>{t(w=>w.map(M=>M.id===b.id?b:M)),Je(b,"left_sidebar")},onClose:()=>ze(null)}))};var En="notes-sidenotes-styles",Is=`
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

`;function Ar(){let e=document.getElementById(En);return e||(e=document.createElement("style"),e.id=En,document.head.appendChild(e)),e.textContent=Is,()=>{document.getElementById(En)===e&&e.remove()}}function Ts(e){Eo(e),ro(e);let t=Te(),n=!1,o=de(e,()=>{if(n)throw new Error("SideNotes registration is no longer active")}),s=Ar(),i=cr(e),d=gr(e),a=e.files.onRenamed(({oldPath:h,newPath:O})=>{o.isActive()&&fo(h,O,o).catch(D=>console.error("SideNotes could not retarget notes",D))}),c=e.files.onLineShift(({path:h,fromLine:O,delta:D})=>{o.isActive()&&go(h,O,D,o).catch(z=>console.error("SideNotes could not shift anchors",z))}),l=Tt(),u=async h=>{if(!(!h||!o.isActive())){if(h={...h},h.surface==="web"){if(!h.url||!h.text.trim())return;l.publish({kind:"web",url:h.url,snippet:h.text.trim().slice(0,200)})}else{if(!h.path||!h.page)return;let O=await e.workspace.getPdfPageText(h.path,h.page).catch(()=>null);if(!o.isActive())return;let D=Mo({path:h.path,page:h.page,text:h.text},O);if(!D)return;l.publish(D)}await e.workspace.revealOwnPanel("right_sidebar")}},f=e.interop.extensions.provide(an,{id:"sideNotes.create",labelKey:"auto.94fd67ed6c0c",label:"Create SideNote from selection",surfaces:["pdf","web"],run:u}),v=e.commands.register({id:"highlight-selection",label:"Create SideNote from selection",labelKey:"auto.94fd67ed6c0c",hotkey:"Mod-Shift-h",sideEffect:"read",run:()=>{if(!o.isActive())return;let h=e.getState().activePath,O=h&&_e(h)==="pdf"?Lo(h,e.workspace.getTextSelection()):null;O&&u({surface:"pdf",...O})}});e.registerView("sideNotes.panel",br),e.registerView("sideNotes.flagged",xr),e.registerView("sideNotes.settings",wr);let A=Co(),C=Do(e);return()=>{n=!0,t.dispose(),a(),i(),d(),c(),f(),v(),A(),C(),s()}}var _s={register:Ts},Vl=_s;export{Vl as default,Ts as register};
