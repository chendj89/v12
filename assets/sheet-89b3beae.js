import{v as Qe,i as xt,b as Y,r as re,e as Mt,f as At,d as Ae,g as Ot,p as ne,h as oe,j as mt,u as Tt,k as pe,o as Ct,l as It,t as $e,m as kt,n as Pe,V as Bt,q as Lt,s as Dt,w as Ge,x as $t,c as Pt,y as K,z as V,A as Gt,_ as Ut,a as Ht,B as he,C as jt,D as Ft}from"./index-c8dc8232.js";function zt(e){if(typeof e=="number")return{"":e.toString()};const t={};return e.split(/ +/).forEach(n=>{if(n==="")return;const[i,u]=n.split(":");u===void 0?t[""]=i:t[i]=u}),t}function ee(e,t){var n;if(e==null)return;const i=zt(e);if(t===void 0)return i[""];if(typeof t=="string")return(n=i[t])!==null&&n!==void 0?n:i[""];if(Array.isArray(t)){for(let u=t.length-1;u>=0;--u){const d=t[u];if(d in i)return i[d]}return i[""]}else{let u,d=-1;return Object.keys(i).forEach(r=>{const s=Number(r);!Number.isNaN(s)&&t>=s&&s>=d&&(d=s,u=i[r])}),u}}function Zt(e){var t;const n=(t=e.dirs)===null||t===void 0?void 0:t.find(({dir:i})=>i===Qe);return!!(n&&n.value===!1)}const Wt={xs:0,s:640,m:1024,l:1280,xl:1536,"2xl":1920};function Xt(e){return`(min-width: ${e}px)`}const ie={};function Kt(e=Wt){if(!xt)return Y(()=>[]);if(typeof window.matchMedia!="function")return Y(()=>[]);const t=re({}),n=Object.keys(e),i=(u,d)=>{u.matches?t.value[d]=!0:t.value[d]=!1};return n.forEach(u=>{const d=e[u];let r,s;ie[d]===void 0?(r=window.matchMedia(Xt(d)),r.addEventListener?r.addEventListener("change",c=>{s.forEach(h=>{h(c,u)})}):r.addListener&&r.addListener(c=>{s.forEach(h=>{h(c,u)})}),s=new Set,ie[d]={mql:r,cbs:s}):(r=ie[d].mql,s=ie[d].cbs),s.add(i),r.matches&&s.forEach(c=>{c(r,u)})}),Mt(()=>{n.forEach(u=>{const{cbs:d}=ie[e[u]];d.has(i)&&d.delete(i)})}),Y(()=>{const{value:u}=t;return n.filter(d=>u[d])})}function Vt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}const Ue=1,et=At("n-grid"),tt=1,Yt={span:{type:[Number,String],default:tt},offset:{type:[Number,String],default:0},suffix:Boolean,privateOffset:Number,privateSpan:Number,privateColStart:Number,privateShow:{type:Boolean,default:!0}},Jt=Ae({__GRID_ITEM__:!0,name:"GridItem",alias:["Gi"],props:Yt,setup(){const{isSsrRef:e,xGapRef:t,itemStyleRef:n,overflowRef:i,layoutShiftDisabledRef:u}=Ot(et),d=mt();return{overflow:i,itemStyle:n,layoutShiftDisabled:u,mergedXGap:Y(()=>ne(t.value||0)),deriveStyle:()=>{e.value;const{privateSpan:r=tt,privateShow:s=!0,privateColStart:c=void 0,privateOffset:h=0}=d.vnode.props,{value:S}=t,O=ne(S||0);return{display:s?"":"none",gridColumn:`${c??`span ${r}`} / span ${r}`,marginLeft:h?`calc((100% - (${r} - 1) * ${O}) / ${r} * ${h} + ${O} * ${h})`:""}}}},render(){var e,t;if(this.layoutShiftDisabled){const{span:n,offset:i,mergedXGap:u}=this;return oe("div",{style:{gridColumn:`span ${n} / span ${n}`,marginLeft:i?`calc((100% - (${n} - 1) * ${u}) / ${n} * ${i} + ${u} * ${i})`:""}},this.$slots)}return oe("div",{style:[this.itemStyle,this.deriveStyle()]},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e,{overflow:this.overflow}))}}),qt={xs:0,s:640,m:1024,l:1280,xl:1536,xxl:1920},nt=24,xe="__ssr__",Qt={layoutShiftDisabled:Boolean,responsive:{type:[String,Boolean],default:"self"},cols:{type:[Number,String],default:nt},itemResponsive:Boolean,collapsed:Boolean,collapsedRows:{type:Number,default:1},itemStyle:[Object,String],xGap:{type:[Number,String],default:0},yGap:{type:[Number,String],default:0}},en=Ae({name:"Grid",inheritAttrs:!1,props:Qt,setup(e){const{mergedClsPrefixRef:t,mergedBreakpointsRef:n}=Tt(e),i=/^\d+$/,u=re(void 0),d=Kt((n==null?void 0:n.value)||qt),r=pe(()=>!!(e.itemResponsive||!i.test(e.cols.toString())||!i.test(e.xGap.toString())||!i.test(e.yGap.toString()))),s=Y(()=>{if(r.value)return e.responsive==="self"?u.value:d.value}),c=pe(()=>{var x;return(x=Number(ee(e.cols.toString(),s.value)))!==null&&x!==void 0?x:nt}),h=pe(()=>ee(e.xGap.toString(),s.value)),S=pe(()=>ee(e.yGap.toString(),s.value)),O=x=>{u.value=x.contentRect.width},w=x=>{$t(O,x)},k=re(!1),$=Y(()=>{if(e.responsive==="self")return w}),N=re(!1),D=re();return Ct(()=>{const{value:x}=D;x&&x.hasAttribute(xe)&&(x.removeAttribute(xe),N.value=!0)}),It(et,{layoutShiftDisabledRef:$e(e,"layoutShiftDisabled"),isSsrRef:N,itemStyleRef:$e(e,"itemStyle"),xGapRef:h,overflowRef:k}),{isSsr:!kt,contentEl:D,mergedClsPrefix:t,style:Y(()=>e.layoutShiftDisabled?{width:"100%",display:"grid",gridTemplateColumns:`repeat(${e.cols}, minmax(0, 1fr))`,columnGap:ne(e.xGap),rowGap:ne(e.yGap)}:{width:"100%",display:"grid",gridTemplateColumns:`repeat(${c.value}, minmax(0, 1fr))`,columnGap:ne(h.value),rowGap:ne(S.value)}),isResponsive:r,responsiveQuery:s,responsiveCols:c,handleResize:$,overflow:k}},render(){if(this.layoutShiftDisabled)return oe("div",Pe({ref:"contentEl",class:`${this.mergedClsPrefix}-grid`,style:this.style},this.$attrs),this.$slots);const e=()=>{var t,n,i,u,d,r,s;this.overflow=!1;const c=Lt(Dt(this)),h=[],{collapsed:S,collapsedRows:O,responsiveCols:w,responsiveQuery:k}=this;c.forEach(E=>{var P,m,T,I,Z;if(((P=E==null?void 0:E.type)===null||P===void 0?void 0:P.__GRID_ITEM__)!==!0)return;if(Zt(E)){const G=Ge(E);G.props?G.props.privateShow=!1:G.props={privateShow:!1},h.push({child:G,rawChildSpan:0});return}E.dirs=((m=E.dirs)===null||m===void 0?void 0:m.filter(({dir:G})=>G!==Qe))||null,((T=E.dirs)===null||T===void 0?void 0:T.length)===0&&(E.dirs=null);const W=Ge(E),B=Number((Z=ee((I=W.props)===null||I===void 0?void 0:I.span,k))!==null&&Z!==void 0?Z:Ue);B!==0&&h.push({child:W,rawChildSpan:B})});let $=0;const N=(t=h[h.length-1])===null||t===void 0?void 0:t.child;if(N!=null&&N.props){const E=(n=N.props)===null||n===void 0?void 0:n.suffix;E!==void 0&&E!==!1&&($=Number((u=ee((i=N.props)===null||i===void 0?void 0:i.span,k))!==null&&u!==void 0?u:Ue),N.props.privateSpan=$,N.props.privateColStart=w+1-$,N.props.privateShow=(d=N.props.privateShow)!==null&&d!==void 0?d:!0)}let D=0,x=!1;for(const{child:E,rawChildSpan:P}of h){if(x&&(this.overflow=!0),!x){const m=Number((s=ee((r=E.props)===null||r===void 0?void 0:r.offset,k))!==null&&s!==void 0?s:0),T=Math.min(P+m,w);if(E.props?(E.props.privateSpan=T,E.props.privateOffset=m):E.props={privateSpan:T,privateOffset:m},S){const I=D%w;T+I>w&&(D+=w-I),T+D+$>O*w?x=!0:D+=T}}x&&(E.props?E.props.privateShow!==!0&&(E.props.privateShow=!1):E.props={privateShow:!1})}return oe("div",Pe({ref:"contentEl",class:`${this.mergedClsPrefix}-grid`,style:this.style,[xe]:this.isSsr||void 0},this.$attrs),h.map(({child:E})=>E))};return this.isResponsive&&this.responsive==="self"?oe(Bt,{onResize:this.handleResize},{default:e}):e()}});function st(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],i=typeof n;(i==="object"||i==="function")&&!Object.isFrozen(n)&&st(n)}),e}class He{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function it(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function z(e,...t){const n=Object.create(null);for(const i in e)n[i]=e[i];return t.forEach(function(i){for(const u in i)n[u]=i[u]}),n}const tn="</span>",je=e=>!!e.scope,nn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((i,u)=>`${i}${"_".repeat(u+1)}`)].join(" ")}return`${t}${e}`};class sn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=it(t)}openNode(t){if(!je(t))return;const n=nn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){je(t)&&(this.buffer+=tn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Fe=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Oe{constructor(){this.rootNode=Fe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Fe({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(i=>this._walk(t,i)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Oe._collapse(n)}))}}class rn extends Oe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const i=t.root;n&&(i.scope=`language:${n}`),this.add(i)}toHTML(){return new sn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ae(e){return e?typeof e=="string"?e:e.source:null}function rt(e){return q("(?=",e,")")}function on(e){return q("(?:",e,")*")}function an(e){return q("(?:",e,")?")}function q(...e){return e.map(n=>ae(n)).join("")}function cn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function me(...e){return"("+(cn(e).capture?"":"?:")+e.map(i=>ae(i)).join("|")+")"}function ot(e){return new RegExp(e.toString()+"|").exec("").length-1}function ln(e,t){const n=e&&e.exec(t);return n&&n.index===0}const un=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Te(e,{joinWith:t}){let n=0;return e.map(i=>{n+=1;const u=n;let d=ae(i),r="";for(;d.length>0;){const s=un.exec(d);if(!s){r+=d;break}r+=d.substring(0,s.index),d=d.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+u):(r+=s[0],s[0]==="("&&n++)}return r}).map(i=>`(${i})`).join(t)}const fn=/\b\B/,at="[a-zA-Z]\\w*",Ce="[a-zA-Z_]\\w*",ct="\\b\\d+(\\.\\d+)?",lt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",ut="\\b(0b[01]+)",dn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",gn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=q(t,/.*\b/,e.binary,/\b.*/)),z({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,i)=>{n.index!==0&&i.ignoreMatch()}},e)},ce={begin:"\\\\[\\s\\S]",relevance:0},pn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ce]},hn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ce]},bn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ee=function(e,t,n={}){const i=z({scope:"comment",begin:e,end:t,contains:[]},n);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const u=me("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:q(/[ ]+/,"(",u,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},_n=Ee("//","$"),En=Ee("/\\*","\\*/"),Sn=Ee("#","$"),yn={scope:"number",begin:ct,relevance:0},vn={scope:"number",begin:lt,relevance:0},Rn={scope:"number",begin:ut,relevance:0},wn={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ce,{begin:/\[/,end:/\]/,relevance:0,contains:[ce]}]},Nn={scope:"title",begin:at,relevance:0},xn={scope:"title",begin:Ce,relevance:0},Mn={begin:"\\.\\s*"+Ce,relevance:0},An=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var be=Object.freeze({__proto__:null,APOS_STRING_MODE:pn,BACKSLASH_ESCAPE:ce,BINARY_NUMBER_MODE:Rn,BINARY_NUMBER_RE:ut,COMMENT:Ee,C_BLOCK_COMMENT_MODE:En,C_LINE_COMMENT_MODE:_n,C_NUMBER_MODE:vn,C_NUMBER_RE:lt,END_SAME_AS_BEGIN:An,HASH_COMMENT_MODE:Sn,IDENT_RE:at,MATCH_NOTHING_RE:fn,METHOD_GUARD:Mn,NUMBER_MODE:yn,NUMBER_RE:ct,PHRASAL_WORDS_MODE:bn,QUOTE_STRING_MODE:hn,REGEXP_MODE:wn,RE_STARTERS_RE:dn,SHEBANG:gn,TITLE_MODE:Nn,UNDERSCORE_IDENT_RE:Ce,UNDERSCORE_TITLE_MODE:xn});function On(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function mn(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Tn(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=On,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Cn(e,t){Array.isArray(e.illegal)&&(e.illegal=me(...e.illegal))}function In(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function kn(e,t){e.relevance===void 0&&(e.relevance=1)}const Bn=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(i=>{delete e[i]}),e.keywords=n.keywords,e.begin=q(n.beforeMatch,rt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ln=["of","and","for","in","not","or","if","then","parent","list","value"],Dn="keyword";function ft(e,t,n=Dn){const i=Object.create(null);return typeof e=="string"?u(n,e.split(" ")):Array.isArray(e)?u(n,e):Object.keys(e).forEach(function(d){Object.assign(i,ft(e[d],t,d))}),i;function u(d,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");i[c[0]]=[d,$n(c[0],c[1])]})}}function $n(e,t){return t?Number(t):Pn(e)?0:1}function Pn(e){return Ln.includes(e.toLowerCase())}const ze={},J=e=>{console.error(e)},Ze=(e,...t)=>{console.log(`WARN: ${e}`,...t)},te=(e,t)=>{ze[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ze[`${e}/${t}`]=!0)},_e=new Error;function dt(e,t,{key:n}){let i=0;const u=e[n],d={},r={};for(let s=1;s<=t.length;s++)r[s+i]=u[s],d[s+i]=!0,i+=ot(t[s-1]);e[n]=r,e[n]._emit=d,e[n]._multi=!0}function Gn(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw J("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),_e;if(typeof e.beginScope!="object"||e.beginScope===null)throw J("beginScope must be object"),_e;dt(e,e.begin,{key:"beginScope"}),e.begin=Te(e.begin,{joinWith:""})}}function Un(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw J("skip, excludeEnd, returnEnd not compatible with endScope: {}"),_e;if(typeof e.endScope!="object"||e.endScope===null)throw J("endScope must be object"),_e;dt(e,e.end,{key:"endScope"}),e.end=Te(e.end,{joinWith:""})}}function Hn(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function jn(e){Hn(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Gn(e),Un(e)}function Fn(e){function t(r,s){return new RegExp(ae(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=ot(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(Te(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const h=c.findIndex((O,w)=>w>0&&O!==void 0),S=this.matchIndexes[h];return c.splice(0,h),Object.assign(c,S)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([h,S])=>c.addRule(h,S)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let h=c.exec(s);if(this.resumingScanAtSamePosition()&&!(h&&h.index===this.lastIndex)){const S=this.getMatcher(0);S.lastIndex=this.lastIndex+1,h=S.exec(s)}return h&&(this.regexIndex+=h.position+1,this.regexIndex===this.count&&this.considerAll()),h}}function u(r){const s=new i;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function d(r,s){const c=r;if(r.isCompiled)return c;[mn,In,jn,Bn].forEach(S=>S(r,s)),e.compilerExtensions.forEach(S=>S(r,s)),r.__beforeBegin=null,[Tn,Cn,kn].forEach(S=>S(r,s)),r.isCompiled=!0;let h=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),h=r.keywords.$pattern,delete r.keywords.$pattern),h=h||/\w+/,r.keywords&&(r.keywords=ft(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(h,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ae(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(S){return zn(S==="self"?r:S)})),r.contains.forEach(function(S){d(S,c)}),r.starts&&d(r.starts,s),c.matcher=u(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=z(e.classNameAliases||{}),d(e)}function gt(e){return e?e.endsWithParent||gt(e.starts):!1}function zn(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return z(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:gt(e)?z(e,{starts:e.starts?z(e.starts):null}):Object.isFrozen(e)?z(e):e}var Zn="11.9.0";class Wn extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Me=it,We=z,Xe=Symbol("nomatch"),Xn=7,pt=function(e){const t=Object.create(null),n=Object.create(null),i=[];let u=!0;const d="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:rn};function c(o){return s.noHighlightRe.test(o)}function h(o){let l=o.className+" ";l+=o.parentNode?o.parentNode.className:"";const p=s.languageDetectRe.exec(l);if(p){const _=B(p[1]);return _||(Ze(d.replace("{}",p[1])),Ze("Falling back to no-highlight mode for this block.",o)),_?p[1]:"no-highlight"}return l.split(/\s+/).find(_=>c(_)||B(_))}function S(o,l,p){let _="",R="";typeof l=="object"?(_=o,p=l.ignoreIllegals,R=l.language):(te("10.7.0","highlight(lang, code, ...args) has been deprecated."),te("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),R=o,_=l),p===void 0&&(p=!0);const C={code:_,language:R};Q("before:highlight",C);const U=C.result?C.result:O(C.language,C.code,p);return U.code=C.code,Q("after:highlight",U),U}function O(o,l,p,_){const R=Object.create(null);function C(a,f){return a.keywords[f]}function U(){if(!g.keywords){M.addText(v);return}let a=0;g.keywordPatternRe.lastIndex=0;let f=g.keywordPatternRe.exec(v),b="";for(;f;){b+=v.substring(a,f.index);const y=j.case_insensitive?f[0].toLowerCase():f[0],A=C(g,y);if(A){const[F,wt]=A;if(M.addText(b),b="",R[y]=(R[y]||0)+1,R[y]<=Xn&&(ge+=wt),F.startsWith("_"))b+=f[0];else{const Nt=j.classNameAliases[F]||F;H(f[0],Nt)}}else b+=f[0];a=g.keywordPatternRe.lastIndex,f=g.keywordPatternRe.exec(v)}b+=v.substring(a),M.addText(b)}function fe(){if(v==="")return;let a=null;if(typeof g.subLanguage=="string"){if(!t[g.subLanguage]){M.addText(v);return}a=O(g.subLanguage,v,!0,De[g.subLanguage]),De[g.subLanguage]=a._top}else a=k(v,g.subLanguage.length?g.subLanguage:null);g.relevance>0&&(ge+=a.relevance),M.__addSublanguage(a._emitter,a.language)}function L(){g.subLanguage!=null?fe():U(),v=""}function H(a,f){a!==""&&(M.startScope(f),M.addText(a),M.endScope())}function Ie(a,f){let b=1;const y=f.length-1;for(;b<=y;){if(!a._emit[b]){b++;continue}const A=j.classNameAliases[a[b]]||a[b],F=f[b];A?H(F,A):(v=F,U(),v=""),b++}}function ke(a,f){return a.scope&&typeof a.scope=="string"&&M.openNode(j.classNameAliases[a.scope]||a.scope),a.beginScope&&(a.beginScope._wrap?(H(v,j.classNameAliases[a.beginScope._wrap]||a.beginScope._wrap),v=""):a.beginScope._multi&&(Ie(a.beginScope,f),v="")),g=Object.create(a,{parent:{value:g}}),g}function Be(a,f,b){let y=ln(a.endRe,b);if(y){if(a["on:end"]){const A=new He(a);a["on:end"](f,A),A.isMatchIgnored&&(y=!1)}if(y){for(;a.endsParent&&a.parent;)a=a.parent;return a}}if(a.endsWithParent)return Be(a.parent,f,b)}function Et(a){return g.matcher.regexIndex===0?(v+=a[0],1):(Ne=!0,0)}function St(a){const f=a[0],b=a.rule,y=new He(b),A=[b.__beforeBegin,b["on:begin"]];for(const F of A)if(F&&(F(a,y),y.isMatchIgnored))return Et(f);return b.skip?v+=f:(b.excludeBegin&&(v+=f),L(),!b.returnBegin&&!b.excludeBegin&&(v=f)),ke(b,a),b.returnBegin?0:f.length}function yt(a){const f=a[0],b=l.substring(a.index),y=Be(g,a,b);if(!y)return Xe;const A=g;g.endScope&&g.endScope._wrap?(L(),H(f,g.endScope._wrap)):g.endScope&&g.endScope._multi?(L(),Ie(g.endScope,a)):A.skip?v+=f:(A.returnEnd||A.excludeEnd||(v+=f),L(),A.excludeEnd&&(v=f));do g.scope&&M.closeNode(),!g.skip&&!g.subLanguage&&(ge+=g.relevance),g=g.parent;while(g!==y.parent);return y.starts&&ke(y.starts,a),A.returnEnd?0:f.length}function vt(){const a=[];for(let f=g;f!==j;f=f.parent)f.scope&&a.unshift(f.scope);a.forEach(f=>M.openNode(f))}let de={};function Le(a,f){const b=f&&f[0];if(v+=a,b==null)return L(),0;if(de.type==="begin"&&f.type==="end"&&de.index===f.index&&b===""){if(v+=l.slice(f.index,f.index+1),!u){const y=new Error(`0 width match regex (${o})`);throw y.languageName=o,y.badRule=de.rule,y}return 1}if(de=f,f.type==="begin")return St(f);if(f.type==="illegal"&&!p){const y=new Error('Illegal lexeme "'+b+'" for mode "'+(g.scope||"<unnamed>")+'"');throw y.mode=g,y}else if(f.type==="end"){const y=yt(f);if(y!==Xe)return y}if(f.type==="illegal"&&b==="")return 1;if(we>1e5&&we>f.index*3)throw new Error("potential infinite loop, way more iterations than matches");return v+=b,b.length}const j=B(o);if(!j)throw J(d.replace("{}",o)),new Error('Unknown language: "'+o+'"');const Rt=Fn(j);let Re="",g=_||Rt;const De={},M=new s.__emitter(s);vt();let v="",ge=0,X=0,we=0,Ne=!1;try{if(j.__emitTokens)j.__emitTokens(l,M);else{for(g.matcher.considerAll();;){we++,Ne?Ne=!1:g.matcher.considerAll(),g.matcher.lastIndex=X;const a=g.matcher.exec(l);if(!a)break;const f=l.substring(X,a.index),b=Le(f,a);X=a.index+b}Le(l.substring(X))}return M.finalize(),Re=M.toHTML(),{language:o,value:Re,relevance:ge,illegal:!1,_emitter:M,_top:g}}catch(a){if(a.message&&a.message.includes("Illegal"))return{language:o,value:Me(l),illegal:!0,relevance:0,_illegalBy:{message:a.message,index:X,context:l.slice(X-100,X+100),mode:a.mode,resultSoFar:Re},_emitter:M};if(u)return{language:o,value:Me(l),illegal:!1,relevance:0,errorRaised:a,_emitter:M,_top:g};throw a}}function w(o){const l={value:Me(o),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return l._emitter.addText(o),l}function k(o,l){l=l||s.languages||Object.keys(t);const p=w(o),_=l.filter(B).filter(le).map(L=>O(L,o,!1));_.unshift(p);const R=_.sort((L,H)=>{if(L.relevance!==H.relevance)return H.relevance-L.relevance;if(L.language&&H.language){if(B(L.language).supersetOf===H.language)return 1;if(B(H.language).supersetOf===L.language)return-1}return 0}),[C,U]=R,fe=C;return fe.secondBest=U,fe}function $(o,l,p){const _=l&&n[l]||p;o.classList.add("hljs"),o.classList.add(`language-${_}`)}function N(o){let l=null;const p=h(o);if(c(p))return;if(Q("before:highlightElement",{el:o,language:p}),o.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",o);return}if(o.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(o)),s.throwUnescapedHTML))throw new Wn("One of your code blocks includes unescaped HTML.",o.innerHTML);l=o;const _=l.textContent,R=p?S(_,{language:p,ignoreIllegals:!0}):k(_);o.innerHTML=R.value,o.dataset.highlighted="yes",$(o,p,R.language),o.result={language:R.language,re:R.relevance,relevance:R.relevance},R.secondBest&&(o.secondBest={language:R.secondBest.language,relevance:R.secondBest.relevance}),Q("after:highlightElement",{el:o,result:R,text:_})}function D(o){s=We(s,o)}const x=()=>{m(),te("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){m(),te("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let P=!1;function m(){if(document.readyState==="loading"){P=!0;return}document.querySelectorAll(s.cssSelector).forEach(N)}function T(){P&&m()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function I(o,l){let p=null;try{p=l(e)}catch(_){if(J("Language definition for '{}' could not be registered.".replace("{}",o)),u)J(_);else throw _;p=r}p.name||(p.name=o),t[o]=p,p.rawDefinition=l.bind(null,e),p.aliases&&G(p.aliases,{languageName:o})}function Z(o){delete t[o];for(const l of Object.keys(n))n[l]===o&&delete n[l]}function W(){return Object.keys(t)}function B(o){return o=(o||"").toLowerCase(),t[o]||t[n[o]]}function G(o,{languageName:l}){typeof o=="string"&&(o=[o]),o.forEach(p=>{n[p.toLowerCase()]=l})}function le(o){const l=B(o);return l&&!l.disableAutodetect}function Se(o){o["before:highlightBlock"]&&!o["before:highlightElement"]&&(o["before:highlightElement"]=l=>{o["before:highlightBlock"](Object.assign({block:l.el},l))}),o["after:highlightBlock"]&&!o["after:highlightElement"]&&(o["after:highlightElement"]=l=>{o["after:highlightBlock"](Object.assign({block:l.el},l))})}function ye(o){Se(o),i.push(o)}function ve(o){const l=i.indexOf(o);l!==-1&&i.splice(l,1)}function Q(o,l){const p=o;i.forEach(function(_){_[p]&&_[p](l)})}function ue(o){return te("10.7.0","highlightBlock will be removed entirely in v12.0"),te("10.7.0","Please use highlightElement now."),N(o)}Object.assign(e,{highlight:S,highlightAuto:k,highlightAll:m,highlightElement:N,highlightBlock:ue,configure:D,initHighlighting:x,initHighlightingOnLoad:E,registerLanguage:I,unregisterLanguage:Z,listLanguages:W,getLanguage:B,registerAliases:G,autoDetection:le,inherit:We,addPlugin:ye,removePlugin:ve}),e.debugMode=function(){u=!1},e.safeMode=function(){u=!0},e.versionString=Zn,e.regex={concat:q,lookahead:rt,either:me,optional:an,anyNumberOfTimes:on};for(const o in be)typeof be[o]=="object"&&st(be[o]);return Object.assign(e,be),e},se=pt({});se.newInstance=()=>pt({});var Kn=se;se.HighlightJS=se;se.default=se;const Ke=Vt(Kn),Ve="[A-Za-z$_][0-9A-Za-z$_]*",Vn=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Yn=["true","false","null","undefined","NaN","Infinity"],ht=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],bt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],_t=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Jn=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],qn=[].concat(_t,ht,bt);function Qn(e){const t=e.regex,n=(l,{after:p})=>{const _="</"+l[0].slice(1);return l.input.indexOf(_,p)!==-1},i=Ve,u={begin:"<>",end:"</>"},d=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(l,p)=>{const _=l[0].length+l.index,R=l.input[_];if(R==="<"||R===","){p.ignoreMatch();return}R===">"&&(n(l,{after:_})||p.ignoreMatch());let C;const U=l.input.substring(_);if(C=U.match(/^\s*=/)){p.ignoreMatch();return}if((C=U.match(/^\s+extends\s+/))&&C.index===0){p.ignoreMatch();return}}},s={$pattern:Ve,keyword:Vn,literal:Yn,built_in:qn,"variable.language":Jn},c="[0-9](_?[0-9])*",h=`\\.(${c})`,S="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",O={className:"number",variants:[{begin:`(\\b(${S})((${h})|\\.)?|(${h}))[eE][+-]?(${c})\\b`},{begin:`\\b(${S})\\b((${h})\\b|\\.)?|(${h})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},w={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},k={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,w],subLanguage:"xml"}},$={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,w],subLanguage:"css"}},N={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,w],subLanguage:"graphql"}},D={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,w]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},P=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,k,$,N,D,{match:/\$\d+/},O];w.contains=P.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(P)});const m=[].concat(E,w.contains),T=m.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(m)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T},Z={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,t.concat(i,"(",t.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},W={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...ht,...bt]}},B={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},le={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Se(l){return t.concat("(?!",l.join("|"),")")}const ye={match:t.concat(/\b/,Se([..._t,"super","import"]),i,t.lookahead(/\(/)),className:"title.function",relevance:0},ve={begin:t.concat(/\./,t.lookahead(t.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Q={match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},ue="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",o={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(ue)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:W},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),B,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,k,$,N,D,E,{match:/\$\d+/},O,W,{className:"attr",begin:i+t.lookahead(":"),relevance:0},o,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:ue,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:d},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},ve,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},ye,le,Z,Q,{match:/\$[(.]/}]}}const es={style:{padding:"50px",height:"100%",background:"#f1f3f5"}},Ye="padding:8px 10px;",Je=`
padding:0 8px;
background:#f8f9fa;
border-radius:3px;
height:28px;
line-height:28px;
color: #345;
`,qe=`
height:28px;
line-height:28px;
color: #345;
`,ns=Ae({__name:"sheet",setup(e){return Ke.registerLanguage("javascript",Qn),(t,n)=>{const i=jt,u=Ft,d=Jt,r=en,s=Ut;return Ht(),Pt("div",es,[K(s,{hljs:Gt(Ke)},{default:V(()=>[K(r,{"x-gap":"12",cols:4},{default:V(()=>[K(d,null,{default:V(()=>[K(u,{"content-style":Ye},{default:V(()=>[K(i,{justify:"space-between"},{default:V(()=>[he("div",{style:Je},"ctrl+k, ctrl+0"),he("div",{style:qe},"折叠所有代码")]),_:1})]),_:1}),K(u,{"content-style":Ye,style:{"margin-top":"-1px"}},{default:V(()=>[K(i,{justify:"space-between"},{default:V(()=>[he("div",{style:Je},"ctrl+k, ctrl+j"),he("div",{style:qe},"展开所有代码")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["hljs"])])}}});export{ns as default};
