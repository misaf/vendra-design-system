// GENERATED from components/**/*.{js,jsx} by npm --prefix templates run build. Edit the sources, not this file.
// Bundled from react-aria-components (MIT): only the names components import.
try {
(function(e,t){var n=Object.create,r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,o=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,c=(e,t,n,o)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=a(t),l=0,u=c.length,d;l<u;l++)d=c[l],!s.call(e,d)&&d!==n&&r(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(o=i(t,d))||o.enumerable});return e},l=(e,t,i)=>(i=e==null?{}:n(o(e)),c(t||!e||!e.__esModule||!s.call(e,`default`)?r(i,`default`,{value:e,enumerable:!0}):i,e));e=l(e,1),t=l(t,1);function u(...e){return(...t)=>{for(let n of e)typeof n==`function`&&n(...t)}}let d=typeof document<`u`?e.default.useLayoutEffect:()=>{},f={prefix:String(Math.round(Math.random()*1e10)),current:0},p=e.default.createContext(f),m=e.default.createContext(!1);typeof window<`u`&&window.document&&window.document.createElement;let h=new WeakMap;function g(t=!1){let n=(0,e.useContext)(p),r=(0,e.useRef)(null);if(r.current===null&&!t){let t=e.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;if(t){let e=h.get(t);e==null?h.set(t,{id:n.current,state:t.memoizedState}):t.memoizedState!==e.state&&(n.current=e.id,h.delete(t))}r.current=++n.current}return r.current}function _(t){let n=(0,e.useContext)(p),r=g(!!t),i=`react-aria${n.prefix}`;return t||`${i}-${r}`}function v(t){let n=e.default.useId(),[r]=(0,e.useState)(C()),i=r?`react-aria`:`react-aria${f.prefix}`;return t||`${i}-${n}`}let y=typeof e.default.useId==`function`?v:_;function b(){return!1}function x(){return!0}function S(e){return()=>{}}function C(){return typeof e.default.useSyncExternalStore==`function`?e.default.useSyncExternalStore(S,b,x):(0,e.useContext)(m)}function w(t){let[n,r]=(0,e.useState)(t),i=(0,e.useRef)(n),a=(0,e.useRef)(null),o=(0,e.useRef)(()=>{if(!a.current)return;let e=a.current.next();if(e.done){a.current=null;return}i.current===e.value?o.current():r(e.value)});return d(()=>{i.current=n,a.current&&o.current()}),[n,(0,e.useCallback)(e=>{a.current=e(i.current),o.current()},[o])]}let ee=!!(typeof window<`u`&&window.document&&window.document.createElement),T=new Map,E;typeof FinalizationRegistry<`u`&&(E=new FinalizationRegistry(e=>{T.delete(e)}));let D=new WeakMap;function O(t){let[n,r]=(0,e.useState)(t),i=(0,e.useRef)(null),a=y(n),o=(0,e.useRef)(null),s=D.get(o);if(E&&s!==a&&(s!=null&&E.unregister(o),E.register(o,a,o),D.set(o,a)),ee){let e=T.get(a);e&&!e.includes(i)?e.push(i):T.set(a,[i])}return d(()=>{let e=a;return()=>{E&&(E.unregister(o),D.delete(o)),T.delete(e)}},[a]),(0,e.useEffect)(()=>{let e=i.current;return e&&r(e),()=>{e&&(i.current=null)}}),a}function te(e,t){if(e===t)return e;let n=T.get(e);if(n)return n.forEach(e=>e.current=t),t;let r=T.get(t);return r?(r.forEach(t=>t.current=e),e):t}function ne(t=[]){let n=O(),[r,i]=w(n),a=(0,e.useCallback)(()=>{i(function*(){yield n,yield document.getElementById(n)?n:void 0})},[n,i]);return d(a,[n,a,...t]),r}function k(...e){return e.length===1&&e[0]?e[0]:t=>{let n=!1,r=e.map(e=>{let r=re(e,t);return n||=typeof r==`function`,r});if(n)return()=>{r.forEach((t,n)=>{typeof t==`function`?t():re(e[n],null)})}}}function re(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function ie(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=ie(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function ae(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=ie(e))&&(r&&(r+=` `),r+=t);return r}function A(...e){let t={...e[0]};for(let n=1;n<e.length;n++){let r=e[n];for(let e in r){let n=t[e],i=r[e];typeof n==`function`&&typeof i==`function`&&e[0]===`o`&&e[1]===`n`&&e.charCodeAt(2)>=65&&e.charCodeAt(2)<=90?t[e]=u(n,i):(e===`className`||e===`UNSAFE_className`)&&typeof n==`string`&&typeof i==`string`?t[e]=ae(n,i):e===`id`&&n&&i?t.id=te(n,i):e===`ref`&&n&&i?t.ref=k(n,i):t[e]=i===void 0?n:i}}return t}function oe(t){let n=(0,e.useRef)(null),r=(0,e.useRef)(void 0),i=(0,e.useCallback)(e=>{if(typeof t==`function`){let n=t,r=n(e);return()=>{typeof r==`function`?r():n(null)}}if(t)return t.current=e,()=>{t.current=null}},[t]);return(0,e.useMemo)(()=>({get current(){return n.current},set current(e){n.current=e,r.current&&=(r.current(),void 0),e!=null&&(r.current=i(e))}}),[i])}let se=Symbol(`default`);function ce({values:t,children:n}){for(let[r,i]of t)n=e.default.createElement(r.Provider,{value:i},n);return n}function j(t){let{className:n,style:r,children:i,defaultClassName:a,defaultChildren:o,defaultStyle:s,values:c,render:l}=t;return(0,e.useMemo)(()=>{let e,t,u;return e=typeof n==`function`?n({...c,defaultClassName:a}):n,t=typeof r==`function`?r({...c,defaultStyle:s||{}}):r,u=typeof i==`function`?i({...c,defaultChildren:o}):i??o,{className:e??a,style:t||s?{...s,...t}:void 0,children:u??o,"data-rac":``,render:l?e=>l(e,c):void 0}},[n,r,i,a,o,s,c,l])}function le(t,n){let r=(0,e.useContext)(t);if(n===null)return null;if(r&&typeof r==`object`&&`slots`in r&&r.slots){let e=n||se;if(!r.slots[e]){let e=new Intl.ListFormat().format(Object.keys(r.slots).map(e=>`"${e}"`)),t=n?`Invalid slot "${n}".`:`A slot prop is required.`;throw Error(`${t} Valid slot names are ${e}.`)}return r.slots[e]}return r}function M(t,n,r){let{ref:i,...a}=le(r,t.slot)||{},o=oe((0,e.useMemo)(()=>k(n,i),[n,i])),s=A(a,t);return`style`in a&&a.style&&`style`in t&&t.style&&(s.style=typeof a.style==`function`||typeof t.style==`function`?e=>{let n=typeof a.style==`function`?a.style(e):a.style,r={...e.defaultStyle,...n},i=typeof t.style==`function`?t.style({...e,defaultStyle:r}):t.style;return{...r,...i}}:{...a.style,...t.style}),[s,o]}function ue(t=!0){let[n,r]=(0,e.useState)(t),i=(0,e.useRef)(!1),a=(0,e.useCallback)(e=>{i.current=!0,r(!!e)},[]);return d(()=>{i.current||r(!1)},[]),[a,n]}function de(e){let t=/^(data-.*)$/,n={};for(let r in e)t.test(r)||(n[r]=e[r]);return n}function fe(t,n,r){let{render:i,...a}=n,o=(0,e.useRef)(null),s=(0,e.useMemo)(()=>k(r,o),[r,o]);d(()=>{},[t,i]);let c={...a,ref:s};return i?i(c,void 0):e.default.createElement(t,c)}let pe={},N=new Proxy({},{get(t,n){if(typeof n!=`string`)return;let r=pe[n];return r||(r=(0,e.forwardRef)(fe.bind(null,n)),pe[n]=r),r}}),P=e=>he(e)?e.document:ge(e)?e:e?.ownerDocument??(typeof document<`u`?document:void 0),F=e=>P(e)?.defaultView??(typeof window<`u`?window:void 0);function me(e){return typeof e==`object`&&!!e&&`nodeType`in e&&typeof e.nodeType==`number`}function he(e){return typeof e==`object`&&!!e&&`window`in e&&e.window===e}function ge(e){return me(e)&&e.nodeType===9}function _e(e){return me(e)&&e.nodeType===11&&`host`in e}function ve(e,t,n,r){if(n==null||e==null)return()=>{};let i=Array.isArray(e)?e:[e];for(let e of i)e.addEventListener(t,n,r);return()=>{for(let e of i)e.removeEventListener(t,n,r)}}function ye(e,t,n,r){if(e==null)return()=>{};let i=[],a=Array.isArray(e)?e:[e];for(let e of a){let a=e.style.getPropertyValue(t),o=e.style.getPropertyPriority(t);e.style.setProperty(t,n,r),i.unshift(()=>{a?e.style.setProperty(t,a,o):e.style.removeProperty(t)})}return()=>{for(let e of i)e()}}function I(){return!1}function L(e,t){if(!I())return t&&e?e.contains(t):!1;if(!e||!t)return!1;let n=t;for(;n!==null;){if(n===e)return!0;n=typeof n.assignedElements!=`function`&&n.assignedSlot?.parentNode?n.assignedSlot.parentNode:_e(n)?n.host:n.parentNode}return!1}let R=(e=document)=>{if(!I())return e.activeElement;let t=e.activeElement;for(;t&&`shadowRoot`in t&&t.shadowRoot?.activeElement;)t=t.shadowRoot.activeElement;return t};function z(e){if(I()&&e.target instanceof Element&&e.target.shadowRoot){if(`composedPath`in e)return e.composedPath()[0]??null;if(`composedPath`in e.nativeEvent)return e.nativeEvent.composedPath()[0]??null}return e.target}function be(e){if(!e)return!1;let t=e.getRootNode(),n=F(e);if(!(t instanceof n.Document||t instanceof n.ShadowRoot))return!1;let r=t.activeElement;return r!=null&&e.contains(r)}function xe(e){if(Ce())e.focus({preventScroll:!0});else{let t=we(e);e.focus(),Te(t)}}let Se=null;function Ce(){if(Se==null){Se=!1;try{document.createElement(`div`).focus({get preventScroll(){return Se=!0,!0}})}catch{}}return Se}function we(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Te(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}let Ee=typeof Element<`u`&&`checkVisibility`in Element.prototype;function De(e){let t=F(e);if(!(e instanceof t.HTMLElement)&&!(e instanceof t.SVGElement))return!1;let{display:n,visibility:r}=e.style,i=n!==`none`&&r!==`hidden`&&r!==`collapse`;if(i){let{getComputedStyle:t}=F(e),{display:n,visibility:r}=t(e);i=n!==`none`&&r!==`hidden`&&r!==`collapse`}return i}function Oe(e,t){return!e.hasAttribute(`hidden`)&&!e.hasAttribute(`data-react-aria-prevent-focus`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function ke(e,t){return Ee?e.checkVisibility({visibilityProperty:!0})&&!e.closest(`[data-react-aria-prevent-focus]`):e.nodeName!==`#comment`&&De(e)&&Oe(e,t)&&(!e.parentElement||ke(e.parentElement,e))}let Ae=[`input:not([disabled]):not([type=hidden])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`summary`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable^="false"])`,`permission`],je=Ae.join(`:not([hidden]),`)+`,[tabindex]:not([disabled]):not([hidden])`;Ae.push(`[tabindex]:not([tabindex="-1"]):not([disabled])`);let Me=Ae.join(`:not([hidden]):not([tabindex="-1"]),`);function Ne(e,t){return e.matches(je)&&!Fe(e)&&(t?.skipVisibilityCheck||ke(e))}function Pe(e){return e.matches(Me)&&ke(e)&&!Fe(e)}function Fe(e){let t=e;for(;t!=null;){if(t instanceof F(t).HTMLElement&&t.inert)return!0;t=t.parentElement}return!1}function Ie(e){let t=e;return t.nativeEvent=e,t.isDefaultPrevented=()=>t.defaultPrevented,t.isPropagationStopped=()=>t.cancelBubble,t.persist=()=>{},t}function Le(e,t){Object.defineProperty(e,"target",{value:t}),Object.defineProperty(e,"currentTarget",{value:t})}function Re(t){let n=(0,e.useRef)({isFocused:!1,observer:null});return d(()=>{let e=n.current;return()=>{e.observer&&=(e.observer.disconnect(),null)}},[]),(0,e.useCallback)(e=>{let r=z(e);if(r instanceof HTMLButtonElement||r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement){n.current.isFocused=!0;let e=r;e.addEventListener(`focusout`,r=>{if(n.current.isFocused=!1,e.disabled){let e=Ie(r);t?.(e)}n.current.observer&&(n.current.observer.disconnect(),n.current.observer=null)},{once:!0}),n.current.observer=new MutationObserver(()=>{if(n.current.isFocused&&e.disabled){n.current.observer?.disconnect();let t=e===R()?null:R();e.dispatchEvent(new FocusEvent(`blur`,{relatedTarget:t})),e.dispatchEvent(new FocusEvent(`focusout`,{bubbles:!0,relatedTarget:t}))}}),n.current.observer.observe(e,{attributes:!0,attributeFilter:[`disabled`]})}},[t])}let ze=!1;function Be(e){for(;e&&!Ne(e,{skipVisibilityCheck:!0});)e=e.parentElement;let t=F(e),n=R(t.document);if(!n||n===e)return;let r=e?.getRootNode(),i=r!=null&&_e(r)?r:F(e),a=t=>t===e||t!=null&&L(e,t),o=e=>e===n||n!=null&&e!=null&&L(n,e);ze=!0;let s=!1,c=e=>{(o(z(e))||s)&&e.stopImmediatePropagation()},l=t=>{(o(z(t))||s)&&(t.stopImmediatePropagation(),!e&&!s&&(s=!0,xe(n),f()))},u=e=>{(a(z(e))||s)&&e.stopImmediatePropagation()},d=e=>{(a(z(e))||s)&&(e.stopImmediatePropagation(),s||(s=!0,xe(n),f()))};i.addEventListener(`blur`,c,!0),i.addEventListener(`focusout`,l,!0),i.addEventListener(`focusin`,d,!0),i.addEventListener(`focus`,u,!0);let f=()=>{cancelAnimationFrame(p),i.removeEventListener(`blur`,c,!0),i.removeEventListener(`focusout`,l,!0),i.removeEventListener(`focusin`,d,!0),i.removeEventListener(`focus`,u,!0),ze=!1,s=!1},p=requestAnimationFrame(f);return f}function Ve(e){if(typeof window>`u`||window.navigator==null)return!1;let t=window.navigator.userAgentData?.brands;return Array.isArray(t)&&t.some(t=>e.test(t.brand))||e.test(window.navigator.userAgent)}function He(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function B(e){let t=null;return()=>(t??=e(),t)}let Ue=B(function(){return He(/^Mac/i)}),We=B(function(){return He(/^iPhone/i)}),Ge=B(function(){return He(/^iPad/i)||Ue()&&navigator.maxTouchPoints>1}),Ke=B(function(){return We()||Ge()}),qe=B(function(){return Ve(/AppleWebKit/i)&&(Ke()||!Je())}),Je=B(function(){return Ve(/Chrome|CriOS|CrMo/i)}),Ye=B(function(){return Ve(/Android/i)}),Xe=B(function(){return Ve(/(Firefox|FxiOS)/i)});function Ze(e){return e.pointerType===``&&e.isTrusted?!0:Ye()&&e.pointerType?e.type===`click`&&e.buttons===1:e.detail===0&&!e.pointerType}function Qe(e){return!Ye()&&e.width===0&&e.height===0||Ye()&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType===`mouse`}function V(e,t,n=!0){let{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}=t;!qe()&&Xe()&&window.event?.type?.startsWith(`key`)&&e.target===`_blank`&&(Ue()?r=!0:i=!0);let s=qe()&&Ue()&&!Ge()?new KeyboardEvent(`keydown`,{keyIdentifier:`Enter`,metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}):new MouseEvent(`click`,{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o,detail:1,bubbles:!0,cancelable:!0});V.isOpening=n,xe(e),e.dispatchEvent(s),V.isOpening=!1}V.isOpening=!1;let $e=null,et=new Set,tt=new Map,nt=!1,rt=!1,it={Tab:!0,Escape:!0};function at(e,t){for(let n of et)n(e,t)}function ot(e){return!(e.metaKey||!Ue()&&e.altKey||e.ctrlKey||e.key===`Control`||e.key===`Shift`||e.key===`Meta`)}function st(e){nt=!0,!V.isOpening&&ot(e)&&($e=`keyboard`,at(`keyboard`,e))}function ct(e){$e=`pointer`,`pointerType`in e&&e.pointerType,(e.type===`mousedown`||e.type===`pointerdown`)&&(nt=!0,at(`pointer`,e))}function lt(e){!V.isOpening&&Ze(e)&&(nt=!0,$e=`virtual`)}function ut(e){if(ze)return;let t=z(e),n=F(t),r=P(t);if(t===n){rt=!0;return}t!==r&&e.isTrusted&&(!nt&&!rt&&($e=`virtual`,at(`virtual`,e)),nt=!1,rt=!1)}function dt(){ze||(nt=!1,rt=!0)}function ft(e){if(typeof window>`u`||typeof document>`u`)return;let t=F(e),n=P(e);if(tt.get(t))return;let r=t.HTMLElement.prototype.focus;Reflect.defineProperty(t.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(){nt=!0,r.apply(this,arguments)}}),n.addEventListener(`keydown`,st,!0),n.addEventListener(`keyup`,st,!0),n.addEventListener(`click`,lt,!0),t.addEventListener(`focus`,ut,!0),t.addEventListener(`blur`,dt,!1),typeof PointerEvent<`u`&&(n.addEventListener(`pointerdown`,ct,!0),n.addEventListener(`pointermove`,ct,!0),n.addEventListener(`pointerup`,ct,!0)),t.addEventListener(`beforeunload`,()=>{pt(e)},{once:!0}),tt.set(t,{focus:r})}let pt=(e,t)=>{let n=F(e),r=P(e);t&&r.removeEventListener(`DOMContentLoaded`,t),tt.has(n)&&(Reflect.defineProperty(n.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:tt.get(n).focus}),r.removeEventListener(`keydown`,st,!0),r.removeEventListener(`keyup`,st,!0),r.removeEventListener(`click`,lt,!0),n.removeEventListener(`focus`,ut,!0),n.removeEventListener(`blur`,dt,!1),typeof PointerEvent<`u`&&(r.removeEventListener(`pointerdown`,ct,!0),r.removeEventListener(`pointermove`,ct,!0),r.removeEventListener(`pointerup`,ct,!0)),tt.delete(n))};function mt(e){let t=P(e),n;return t.readyState===`loading`?(n=()=>{ft(e)},t.addEventListener(`DOMContentLoaded`,n)):ft(e),()=>pt(e,n)}typeof document<`u`&&mt();function ht(){return $e!==`pointer`}function gt(){return $e}function _t(e){$e=e,at(e,null)}let vt=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function yt(e,t,n){let r=n?z(n):void 0,i=P(r),a=F(r),o=a===void 0?HTMLInputElement:a.HTMLInputElement,s=a===void 0?HTMLTextAreaElement:a.HTMLTextAreaElement,c=a===void 0?HTMLElement:a.HTMLElement,l=a===void 0?KeyboardEvent:a.KeyboardEvent,u=R(i);return e=e||u instanceof o&&!vt.has(u.type)||u instanceof s||u instanceof c&&u.isContentEditable,!(e&&t===`keyboard`&&n instanceof l&&!it[n.key])}function bt(t,n,r){ft(),(0,e.useEffect)(()=>{if(r?.enabled===!1)return;let e=(e,n)=>{yt(!!r?.isTextInput,e,n)&&t(ht())};return et.add(e),()=>{et.delete(e)}},n)}let xt=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function St(e){return e instanceof HTMLInputElement&&!xt.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}let Ct=e.default.useInsertionEffect??d;function H(t){let n=(0,e.useRef)(null);return Ct(()=>{n.current=t},[t]),(0,e.useCallback)((...e)=>{let t=n.current;return t?.(...e)},[])}function wt(t,n,r,i){let a=H(r),o=r==null;(0,e.useEffect)(()=>{if(!(o||t.current==null))return ve(t.current,n,a,i)},[t,n,i,o])}function Tt(e,t){let{id:n,"aria-label":r,"aria-labelledby":i}=e;return n=O(n),i&&r?i=[...new Set([n,...i.trim().split(/\s+/)])].join(` `):i&&=i.trim().split(/\s+/).join(` `),!r&&!i&&t&&(r=t),{id:n,"aria-label":r,"aria-labelledby":i}}let Et=new Set([`Arab`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Dt=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Ot(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize(),n=typeof t.getTextInfo==`function`?t.getTextInfo():t.textInfo;if(n)return n.direction===`rtl`;if(t.script)return Et.has(t.script)}let t=e.split(`-`)[0];return Dt.has(t)}let kt=Symbol.for(`react-aria.i18n.locale`);function At(){let e=typeof window<`u`&&window[kt]||typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e=`en-US`}return{locale:e,direction:Ot(e)?`rtl`:`ltr`}}let jt=At(),Mt=new Set;function Nt(){jt=At();for(let e of Mt)e(jt)}function Pt(){let t=C(),[n,r]=(0,e.useState)(jt);return(0,e.useEffect)(()=>(Mt.size===0&&window.addEventListener(`languagechange`,Nt),Mt.add(r),()=>{Mt.delete(r),Mt.size===0&&window.removeEventListener(`languagechange`,Nt)}),[]),t?{locale:typeof window<`u`&&window[kt]||`en-US`,direction:`ltr`}:n}let Ft=e.default.createContext(null);function It(t){let{locale:n,children:r}=t,i=e.default.useMemo(()=>({locale:n,direction:Ot(n)?`rtl`:`ltr`}),[n]);return e.default.createElement(Ft.Provider,{value:i},r)}function Lt(t){let{children:n}=t,r=Pt();return e.default.createElement(Ft.Provider,{value:r},n)}function Rt(t){let{locale:n,children:r}=t;return n?e.default.createElement(It,{locale:n,children:r}):e.default.createElement(Lt,{children:r})}function zt(){let t=Pt();return(0,e.useContext)(Ft)||t}let Bt=Symbol.for(`react-aria.i18n.locale`),Vt=Symbol.for(`react-aria.i18n.strings`),Ht;var Ut=class e{constructor(e,t=`en-US`){this.strings=Object.fromEntries(Object.entries(e).filter(([,e])=>e)),this.defaultLocale=t}getStringForLocale(e,t){let n=this.getStringsForLocale(t)[e];if(!n)throw Error(`Could not find intl message ${e} in ${t} locale`);return n}getStringsForLocale(e){let t=this.strings[e];return t||(t=Wt(e,this.strings,this.defaultLocale),this.strings[e]=t),t}static getGlobalDictionaryForPackage(t){if(typeof window>`u`)return null;let n=window[Bt];if(Ht===void 0){let t=window[Vt];if(!t)return null;Ht={};for(let r in t)Ht[r]=new e({[n]:t[r]},n)}let r=Ht?.[t];if(!r)throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);return r}};function Wt(e,t,n=`en-US`){if(t[e])return t[e];let r=Gt(e),i=Kt(e);if(i&&t[`${r}-${i}`])return t[`${r}-${i}`];if(t[r])return t[r];for(let e in t)if(e.startsWith(r+`-`))return t[e];return t[n]}function Gt(e){return Intl.Locale?new Intl.Locale(e).language:e.split(`-`)[0]}function Kt(e){if(Intl.Locale)return new Intl.Locale(e).script}let qt=new Map,Jt=new Map;var Yt=class{constructor(e,t){this.locale=e,this.strings=t}format(e,t){let n=this.strings.getStringForLocale(e,this.locale);return typeof n==`function`?n(t,this):n}plural(e,t,n=`cardinal`){let r=t[`=`+e];if(r)return typeof r==`function`?r():r;let i=this.locale+`:`+n,a=qt.get(i);return a||(a=new Intl.PluralRules(this.locale,{type:n}),qt.set(i,a)),r=t[a.select(e)]||t.other,typeof r==`function`?r():r}number(e){let t=Jt.get(this.locale);return t||(t=new Intl.NumberFormat(this.locale),Jt.set(this.locale,t)),t.format(e)}select(e,t){let n=e[t]||e.other;return typeof n==`function`?n():n}};let Xt=new WeakMap;function Zt(e){let t=Xt.get(e);return t||(t=new Ut(e),Xt.set(e,t)),t}function Qt(e,t){return t&&Ut.getGlobalDictionaryForPackage(t)||Zt(e)}function $t(t,n){let{locale:r}=zt(),i=Qt(t,n);return(0,e.useMemo)(()=>new Yt(r,i),[r,i])}let en=typeof document<`u`?e.default.useInsertionEffect??e.default.useLayoutEffect:()=>{};function tn(t,n,r){let[i,a]=(0,e.useState)(t||n),o=(0,e.useRef)(i),s=(0,e.useRef)(t!==void 0),c=t!==void 0;(0,e.useEffect)(()=>{s.current,s.current=c},[c]);let l=c?t:i;en(()=>{o.current=l});let[,u]=(0,e.useReducer)(()=>({}),{});return[l,(0,e.useCallback)((e,...t)=>{let n=typeof e==`function`?e(o.current):e;Object.is(o.current,n)||(o.current=n,a(n),u(),r?.(n,...t))},[r])]}let U=new Map,nn=new Set;function rn(){if(typeof window>`u`)return;function e(e){return`propertyName`in e}let t=t=>{let r=z(t);if(!e(t)||!r)return;let i=U.get(r);i||(i=new Set,U.set(r,i),r.addEventListener(`transitioncancel`,n,{once:!0})),i.add(t.propertyName)},n=t=>{let r=z(t);if(!e(t)||!r)return;let i=U.get(r);if(i&&(i.delete(t.propertyName),i.size===0&&(r.removeEventListener(`transitioncancel`,n),U.delete(r)),U.size===0)){for(let e of nn)e();nn.clear()}};document.body.addEventListener(`transitionrun`,t),document.body.addEventListener(`transitionend`,n)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,rn):rn());function an(){for(let[e]of U)`isConnected`in e&&!e.isConnected&&U.delete(e)}function on(e){requestAnimationFrame(()=>{an(),U.size===0?e():nn.add(e)})}function sn(e){if(!e.isConnected)return;let t=P(e);if(gt()===`virtual`){let n=R(t);on(()=>{let r=R(t);(r===n||r===t.body)&&e.isConnected&&xe(e)})}else xe(e)}function cn(t){let{isDisabled:n,onFocus:r,onBlur:i,onFocusChange:a}=t,o=(0,e.useCallback)(e=>{if(z(e)===e.currentTarget)return i&&i(e),a&&a(!1),!0},[i,a]),s=Re(o),c=(0,e.useCallback)(e=>{let t=z(e),n=P(t),i=n?R(n):R();t===e.currentTarget&&t===i&&(r&&r(e),a&&a(!0),s(e))},[a,r,s]);return{focusProps:{onFocus:!n&&(r||a||i)?c:void 0,onBlur:!n&&(i||a)?o:void 0}}}function ln(e){if(e)return t=>{let n=!0;e({...t,preventDefault(){t.preventDefault()},isDefaultPrevented(){return t.isDefaultPrevented()},stopPropagation(){n=!0},continuePropagation(){n=!1,typeof t.continuePropagation==`function`&&t.continuePropagation()},isPropagationStopped(){return n}}),n&&!(typeof t.isPropagationStopped==`function`&&t.isPropagationStopped())&&t.stopPropagation()}}let un=new Set([`shift`,`alt`,`control`,`meta`,`mod`]),dn=[`Alt`,`Control`,`Meta`,`Shift`];function fn(e){let t=new Set;return e.alt&&t.add(`Alt`),e.shift&&t.add(`Shift`),e.ctrl&&t.add(`Control`),e.meta&&t.add(`Meta`),e.mod&&t.add(Ue()?`Meta`:`Control`),t}function pn(e){let t=new Set;return e.altKey&&t.add(`Alt`),e.ctrlKey&&t.add(`Control`),e.metaKey&&t.add(`Meta`),e.shiftKey&&t.add(`Shift`),t}function mn(e){return dn.filter(t=>e.has(t))}function hn(e){let t=e.split(`+`).reduce((e,t)=>{let n=t.toLowerCase();return un.has(n)?n===`shift`?e.shift=!0:n===`alt`?e.alt=!0:n===`control`?e.ctrl=!0:n===`meta`?e.meta=!0:n===`mod`&&(e.mod=!0):e.key=t,e},{shift:!1,alt:!1,ctrl:!1,meta:!1,mod:!1,key:``});if(t.key===``)throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);return t}function gn(e){return e.toLowerCase()}let _n={space:` `,esc:`escape`,del:`delete`,ins:`insert`,left:`arrowleft`,right:`arrowright`,up:`arrowup`,down:`arrowdown`,pageup:`pageup`,pagedown:`pagedown`};function vn(e){let t=gn(e);return _n[t]??t}function yn(e){let t=mn(fn(e)),n=vn(e.key);return t.length>0?`${t.join(`+`)}+${n}`:n}function bn(e){let t=mn(pn(e)),n=gn(e.key);return(t.length>0?`${t.join(`+`)}+`:``)+n}function xn(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=hn(n);t.set(yn(e),r)}return e=>{let n=bn(e),r=t.get(n),i=r?.(e);i===void 0&&r!==void 0?i={shouldContinuePropagation:!1,shouldPreventDefault:!0}:typeof i==`boolean`&&(i={shouldContinuePropagation:!i,shouldPreventDefault:i}),i?.shouldPreventDefault&&e.preventDefault(),(!r||i?.shouldContinuePropagation)&&e.continuePropagation()}}function Sn(e){let{shortcuts:t,allowRepeats:n=!1,allowComposing:r=!1}=e,i,a;if(t){let o=xn(t),s=ln(e=>{if(!L(e.currentTarget,z(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}o(e)}),c=ln(e=>{if(!L(e.currentTarget,z(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}e.continuePropagation()});i=e.onKeyDown?u(e.onKeyDown,s):s,a=e.onKeyUp?u(e.onKeyUp,c):c}else i=ln(e.onKeyDown),a=ln(e.onKeyUp);return{keyboardProps:e.isDisabled?{}:{onKeyDown:i,onKeyUp:a}}}function Cn(e,t){d(()=>{if(e&&e.ref&&t)return e.ref.current=t.current,()=>{e.ref&&(e.ref.current=null)}})}let wn=e.default.createContext(null);function Tn(t){let n=(0,e.useContext)(wn)||{};Cn(n,t);let{ref:r,...i}=n;return i}function En(t,n){let{focusProps:r}=cn(t),{keyboardProps:i}=Sn(t),a=A(r,i),o=Tn(n),s=t.isDisabled?{}:o,c=(0,e.useRef)(t.autoFocus);(0,e.useEffect)(()=>{c.current&&n.current&&sn(n.current),c.current=!1},[n]);let l=t.excludeFromTabOrder?-1:0;return t.isDisabled&&(l=void 0),{focusableProps:A({...a,tabIndex:l},s)}}typeof HTMLTemplateElement<`u`&&(Object.defineProperty(HTMLTemplateElement.prototype,"firstChild",{configurable:!0,enumerable:!0,get:function(){return this.content.firstChild}}),Object.defineProperty(HTMLTemplateElement.prototype,"appendChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.appendChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"removeChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.removeChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"insertBefore",{configurable:!0,enumerable:!0,value:function(e,t){return this.content.insertBefore(e,t)}}));let Dn=(0,e.createContext)(!1);function On(t){let n=(n,r)=>(0,e.useContext)(Dn)?null:t(n,r);return n.displayName=t.displayName||t.name,(0,e.forwardRef)(n)}let kn=new Set([`id`]),An=new Set([`aria-label`,`aria-labelledby`,`aria-describedby`,`aria-details`]),jn=new Set([`href`,`hrefLang`,`target`,`rel`,`download`,`ping`,`referrerPolicy`]),Mn=new Set([`dir`,`lang`,`hidden`,`inert`,`translate`]),Nn=new Set(`onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart`.split(`.`)),Pn=/^(data-.*)$/;function W(e,t={}){let{labelable:n,isLink:r,global:i,events:a=i,propNames:o}=t,s={};for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&(kn.has(t)||n&&An.has(t)||r&&jn.has(t)||i&&Mn.has(t)||a&&(Nn.has(t)||t.endsWith(`Capture`)&&Nn.has(t.slice(0,-7)))||o?.has(t)||Pn.test(t))&&(s[t]=e[t]);return s}let Fn=`default`,In=``,Ln=new WeakMap;function Rn(e){if(Ke()&&qe()){if(Fn==="default"){let t=P(e);In=t.documentElement.style.webkitUserSelect,t.documentElement.style.webkitUserSelect=`none`}Fn=`disabled`}else if(e instanceof HTMLElement||e instanceof SVGElement){let t=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;Ln.set(e,e.style[t]),e.style[t]=`none`}}function zn(e){if(Ke()&&qe()){if(Fn!==`disabled`)return;Fn=`restoring`,setTimeout(()=>{on(()=>{if(Fn===`restoring`){let t=P(e);t.documentElement.style.webkitUserSelect===`none`&&(t.documentElement.style.webkitUserSelect=In||``),In=``,Fn=`default`}})},300)}else if((e instanceof HTMLElement||e instanceof SVGElement)&&e&&Ln.has(e)){let t=Ln.get(e),n=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;e.style[n]===`none`&&(e.style[n]=t),e.getAttribute(`style`)===``&&e.removeAttribute(`style`),Ln.delete(e)}}function Bn(e,t){let n=F(t),r=P(t);if(r==null||n==null)return;let i,a=`meta[name="${CSS.escape(e)}"], meta[property="${CSS.escape(e)}"]`,o=r.querySelector(a);return o&&o instanceof n.HTMLMetaElement&&(e===`csp-nonce`&&o.nonce&&(i??=o.nonce||void 0),o.content&&(i??=o.content||void 0)),e===`csp-nonce`&&(i??=n.__webpack_nonce__||globalThis.__webpack_nonce__||void 0),i}let Vn=new WeakMap;function Hn(e){let t=P(e),n=Vn.get(t);return n??=Bn(`csp-nonce`,t),n!==void 0&&Vn.set(t,n),n}let Un=e.default.createContext({register:()=>{}});Un.displayName=`PressResponderContext`;function Wn(){let t=(0,e.useRef)(new Map),n=(0,e.useCallback)((e,n,r,i)=>{let a=i?.once?(...e)=>{t.current.delete(r),r(...e)}:r;t.current.set(r,{type:n,eventTarget:e,fn:a,options:i}),e.addEventListener(n,a,i)},[]),r=(0,e.useCallback)((e,n,r,i)=>{let a=t.current.get(r)?.fn||r;e.removeEventListener(n,a,i),t.current.delete(r)},[]),i=(0,e.useCallback)(()=>{t.current.forEach((e,t)=>{r(e.eventTarget,e.type,t,e.options)})},[r]);return(0,e.useEffect)(()=>i,[i]),{addGlobalListener:n,removeGlobalListener:r,removeAllGlobalListeners:i}}function Gn(t){let n=(0,e.useContext)(Un);if(n){let{register:e,ref:r,...i}=n;t=A(i,t),e()}return Cn(n,t.ref),t}var Kn=class{#e;constructor(e,t,n,r){this.#e=!0;let i=(r?.target??n.currentTarget)?.getBoundingClientRect(),a,o=0,s,c=null;n.clientX!=null&&n.clientY!=null&&(s=n.clientX,c=n.clientY),i&&(s!=null&&c!=null?(a=s-i.left,o=c-i.top):(a=i.width/2,o=i.height/2)),this.type=e,this.pointerType=t,this.target=n.currentTarget,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.x=a,this.y=o,this.key=n.key}continuePropagation(){this.#e=!1}get shouldStopPropagation(){return this.#e}};let qn=Symbol(`linkClicked`),Jn=`react-aria-pressable-style`,Yn=`data-react-aria-pressable`;function Xn(t){let{onPress:n,onPressChange:r,onPressStart:i,onPressEnd:a,onPressUp:o,onClick:s,isDisabled:c,isPressed:l,preventFocusOnPress:d,shouldCancelOnPointerExit:f,allowTextSelectionOnPress:p,ref:m,...h}=Gn(t),[g,_]=(0,e.useState)(!1),v=(0,e.useRef)({isPressed:!1,ignoreEmulatedMouseEvents:!1,didFirePressStart:!1,isTriggeringEvent:!1,activePointerId:null,target:null,isOverTarget:!1,pointerType:null,disposables:[]}),{addGlobalListener:y,removeAllGlobalListeners:b}=Wn(),x=(0,e.useCallback)((e,t)=>{let n=v.current;if(c||n.didFirePressStart)return!1;let a=!0;if(n.isTriggeringEvent=!0,i){let n=new Kn(`pressstart`,t,e);i(n),a=n.shouldStopPropagation}return r&&r(!0),n.isTriggeringEvent=!1,n.didFirePressStart=!0,_(!0),a},[c,i,r]),S=(0,e.useCallback)((e,t,i=!0)=>{let o=v.current;if(!o.didFirePressStart)return!1;o.didFirePressStart=!1,o.isTriggeringEvent=!0;let s=!0;if(a){let n=new Kn(`pressend`,t,e);a(n),s=n.shouldStopPropagation}if(r&&r(!1),_(!1),n&&i&&!c){let r=new Kn(`press`,t,e);n(r),s&&=r.shouldStopPropagation}return o.isTriggeringEvent=!1,s},[c,a,r,n]),C=H(S),w=H((0,e.useCallback)((e,t)=>{let n=v.current;if(c)return!1;if(o){n.isTriggeringEvent=!0;let r=new Kn(`pressup`,t,e);return o(r),n.isTriggeringEvent=!1,r.shouldStopPropagation}return!0},[c,o])),ee=(0,e.useCallback)(e=>{let t=v.current;if(t.isPressed&&t.target){t.didFirePressStart&&t.pointerType!=null&&S($n(t.target,e),t.pointerType,!1),t.isPressed=!1,t.isOverTarget=!1,t.activePointerId=null,t.pointerType=null,b(),p||zn(t.target);for(let e of t.disposables)e();t.disposables=[]}},[p,b,S]),T=H(ee);(0,e.useEffect)(()=>{c&&v.current.isPressed&&T({currentTarget:v.current.target,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1})},[c]);let E=(0,e.useCallback)(e=>{f&&ee(e)},[f,ee]),D=(0,e.useCallback)(e=>{c||s?.(e)},[c,s]),O=(0,e.useCallback)((e,t)=>{if(!c&&s){let n=new MouseEvent(`click`,e);Le(n,t),s(Ie(n))}},[c,s]),te=(0,e.useMemo)(()=>{let e=v.current,t={onKeyDown(t){if(Qn(t.nativeEvent,t.currentTarget)&&L(t.currentTarget,z(t))){tr(z(t),t.key)&&t.preventDefault();let r=!0;!e.isPressed&&!t.repeat&&(e.target=t.currentTarget,e.isPressed=!0,e.pointerType=`keyboard`,r=x(t,`keyboard`));let i=t.currentTarget;y(P(t.currentTarget),`keyup`,u(t=>{Qn(t,i)&&!t.repeat&&L(i,z(t))&&e.target&&w($n(e.target,t),`keyboard`)},n),!0),r&&t.stopPropagation(),t.metaKey&&Ue()&&e.metaKeyEvents?.set(t.key,t.nativeEvent)}else t.key===`Meta`&&(e.metaKeyEvents=new Map)},onClick(t){if((!t||L(t.currentTarget,z(t)))&&t&&t.button===0&&!e.isTriggeringEvent&&!V.isOpening){let n=!0;if(c&&t.preventDefault(),!e.ignoreEmulatedMouseEvents&&!e.isPressed&&(e.pointerType===`virtual`||Ze(t.nativeEvent))){let e=x(t,`virtual`),r=w(t,`virtual`),i=C(t,`virtual`);D(t),n=e&&r&&i}else if(e.isPressed&&e.pointerType!==`keyboard`){let r=e.pointerType||t.nativeEvent.pointerType||`virtual`,i=w($n(t.currentTarget,t),r),a=C($n(t.currentTarget,t),r,!0);n=i&&a,e.isOverTarget=!1,D(t),T(t)}e.ignoreEmulatedMouseEvents=!1,n&&t.stopPropagation()}}},n=t=>{if(e.isPressed&&e.target&&Qn(t,e.target)){tr(z(t),t.key)&&t.preventDefault();let n=z(t),r=L(e.target,n);C($n(e.target,t),`keyboard`,r),r&&O(t,e.target),b(),t.key!==`Enter`&&Zn(e.target)&&L(e.target,n)&&!t[qn]&&(t[qn]=!0,V(e.target,t,!1)),e.isPressed=!1,e.metaKeyEvents?.delete(t.key)}else if(t.key===`Meta`&&e.metaKeyEvents?.size){let t=e.metaKeyEvents;e.metaKeyEvents=void 0;for(let n of t.values())e.target?.dispatchEvent(new KeyboardEvent(`keyup`,n))}};if(typeof PointerEvent<`u`){t.onPointerDown=t=>{if(t.button!==0||!L(t.currentTarget,z(t)))return;if(Qe(t.nativeEvent)){e.pointerType=`virtual`;return}e.pointerType=t.pointerType;let i=!0;if(!e.isPressed){e.isPressed=!0,e.isOverTarget=!0,e.activePointerId=t.pointerId,e.target=t.currentTarget,p||Rn(e.target),i=x(t,e.pointerType);let a=z(t);`releasePointerCapture`in a&&(`hasPointerCapture`in a?a.hasPointerCapture(t.pointerId)&&a.releasePointerCapture(t.pointerId):a.releasePointerCapture(t.pointerId)),y(P(t.currentTarget),`pointerup`,n,!1),y(P(t.currentTarget),`pointercancel`,r,!1)}i&&t.stopPropagation()},t.onMouseDown=t=>{if(L(t.currentTarget,z(t))&&t.button===0){if(d){let n=Be(t.target);n&&e.disposables.push(n)}t.stopPropagation()}},t.onPointerUp=t=>{L(t.currentTarget,z(t))&&e.pointerType!==`virtual`&&t.button===0&&!e.isPressed&&w(t,e.pointerType||t.pointerType)},t.onPointerEnter=t=>{t.pointerId===e.activePointerId&&e.target&&!e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!0,x($n(e.target,t),e.pointerType))},t.onPointerLeave=t=>{t.pointerId===e.activePointerId&&e.target&&e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!1,C($n(e.target,t),e.pointerType,!1),E(t))};let n=t=>{if(t.pointerId===e.activePointerId&&e.isPressed&&t.button===0&&e.target){if(L(e.target,z(t))&&e.pointerType!=null){let n=!1,r=setTimeout(()=>{e.isPressed&&e.target instanceof HTMLElement&&(n?T(t):(xe(e.target),e.target.click()))},80);y(t.currentTarget,`click`,()=>n=!0,!0),e.disposables.push(()=>clearTimeout(r))}else T(t);e.isOverTarget=!1}},r=e=>{T(e)};t.onDragStart=e=>{L(e.currentTarget,z(e))&&T(e)}}return t},[y,c,d,b,p,E,x,D,O]);return(0,e.useEffect)(()=>{if(!m)return;let e=P(m.current);if(!e||!e.head||e.getElementById(Jn))return;let t=e.createElement(`style`);t.id=Jn;let n=Hn(e);n&&(t.nonce=n),t.textContent=`
@layer {
  [${Yn}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(),e.head.prepend(t)},[m]),(0,e.useEffect)(()=>{let e=v.current;return()=>{p||zn(e.target??void 0);for(let t of e.disposables)t();e.disposables=[]}},[p]),{isPressed:l||g,pressProps:A(h,te,{[Yn]:!0})}}function Zn(e){return e.tagName===`A`&&e.hasAttribute(`href`)}function Qn(e,t){let{key:n,code:r}=e,i=t,a=i.getAttribute(`role`);return(n===`Enter`||n===` `||n===`Spacebar`||r===`Space`)&&!(i instanceof F(i).HTMLInputElement&&!rr(i,n)||i instanceof F(i).HTMLTextAreaElement||i.isContentEditable)&&!((a===`link`||!a&&Zn(i))&&n!==`Enter`)}function $n(e,t){let n=t.clientX,r=t.clientY;return{currentTarget:e,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,altKey:t.altKey,clientX:n,clientY:r,key:t.key}}function er(e){return e instanceof HTMLInputElement?!1:e instanceof HTMLButtonElement?e.type!==`submit`&&e.type!==`reset`:!Zn(e)}function tr(e,t){return Ue()&&t===`Enter`?!1:e instanceof HTMLInputElement?t===`Enter`&&(e.type===`checkbox`||e.type===`radio`)?!1:!rr(e,t):er(e)}let nr=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function rr(e,t){return e.type===`checkbox`||e.type===`radio`?t===` `:nr.has(e.type)}function ir(t){let{isDisabled:n,onBlurWithin:r,onFocusWithin:i,onFocusWithinChange:a}=t,o=(0,e.useRef)({isFocusWithin:!1}),{addGlobalListener:s,removeAllGlobalListeners:c}=Wn(),l=(0,e.useCallback)(e=>{L(e.currentTarget,z(e))&&o.current.isFocusWithin&&!L(e.currentTarget,e.relatedTarget)&&(o.current.isFocusWithin=!1,c(),r&&r(e),a&&a(!1))},[r,a,o,c]),u=Re(l),d=(0,e.useCallback)(e=>{if(!L(e.currentTarget,z(e)))return;let t=z(e),n=P(t),r=R(n);if(!o.current.isFocusWithin&&r===t){i&&i(e),a&&a(!0),o.current.isFocusWithin=!0,u(e);let t=e.currentTarget;s(n,`focus`,e=>{let r=z(e);if(o.current.isFocusWithin&&!L(t,r)){let e=new n.defaultView.FocusEvent(`blur`,{relatedTarget:r});Le(e,t);let i=Ie(e);l(i)}},{capture:!0})}},[i,a,u,s,l]);return n?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:d,onBlur:l}}}function ar(t={}){let{autoFocus:n=!1,isTextInput:r,within:i}=t,a=(0,e.useRef)({isFocused:!1,isFocusVisible:n||ht()}),[o,s]=(0,e.useState)(!1),[c,l]=(0,e.useState)(()=>a.current.isFocused&&a.current.isFocusVisible),u=(0,e.useCallback)(()=>l(a.current.isFocused&&a.current.isFocusVisible),[]),d=(0,e.useCallback)(e=>{a.current.isFocused=e,a.current.isFocusVisible=ht(),s(e),u()},[u]);bt(e=>{a.current.isFocusVisible=e,u()},[r,o],{enabled:o,isTextInput:r});let{focusProps:f}=cn({isDisabled:i,onFocusChange:d}),{focusWithinProps:p}=ir({isDisabled:!i,onFocusWithinChange:d});return{isFocused:o,isFocusVisible:c,focusProps:i?p:f}}let or=!1,sr=0;function cr(){or=!0,setTimeout(()=>{or=!1},500)}function lr(e){e.pointerType===`touch`&&cr()}function ur(){let e=P(null);if(e!==void 0)return sr===0&&typeof PointerEvent<`u`&&e.addEventListener(`pointerup`,lr),sr++,()=>{sr--,!(sr>0)&&typeof PointerEvent<`u`&&e.removeEventListener(`pointerup`,lr)}}function dr(t){let{onHoverStart:n,onHoverChange:r,onHoverEnd:i,isDisabled:a}=t,[o,s]=(0,e.useState)(!1),c=(0,e.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:``,target:null}).current;(0,e.useEffect)(ur,[]);let{addGlobalListener:l,removeAllGlobalListeners:u}=Wn(),{hoverProps:d,triggerHoverEnd:f}=(0,e.useMemo)(()=>{let e=(e,i)=>{if(c.pointerType=i,a||i===`touch`||c.isHovered||!L(e.currentTarget,z(e)))return;c.isHovered=!0;let o=e.currentTarget;c.target=o,l(P(z(e)),`pointerover`,e=>{c.isHovered&&c.target&&!L(c.target,z(e))&&t(e,e.pointerType)},{capture:!0}),n&&n({type:`hoverstart`,target:o,pointerType:i}),r&&r(!0),s(!0)},t=(e,t)=>{let n=c.target;c.pointerType=``,c.target=null,t!==`touch`&&c.isHovered&&n&&(c.isHovered=!1,u(),i&&i({type:`hoverend`,target:n,pointerType:t}),r&&r(!1),s(!1))},o={};return typeof PointerEvent<`u`&&(o.onPointerEnter=t=>{or&&t.pointerType===`mouse`||e(t,t.pointerType)},o.onPointerLeave=e=>{!a&&L(e.currentTarget,z(e))&&t(e,e.pointerType)}),{hoverProps:o,triggerHoverEnd:t}},[n,r,i,a,c,l,u]);return(0,e.useEffect)(()=>{a&&f({currentTarget:c.target},c.pointerType)},[a]),{hoverProps:d,isHovered:o}}let fr=(0,e.createContext)({});function pr(e){let{id:t,label:n,"aria-labelledby":r,"aria-label":i,labelElementType:a=`label`}=e;t=O(t);let o=O(),s={};n&&(r=r?`${o} ${r}`:o,s={id:o,htmlFor:a===`label`?t:void 0});let c=Tt({id:t,"aria-label":i,"aria-labelledby":r});return{labelProps:s,fieldProps:c}}let mr=(0,e.createContext)(null),hr=7e3,gr=null;function _r(e,t=`assertive`,n=hr){gr?gr.announce(e,t,n):(gr=new vr,(typeof IS_REACT_ACT_ENVIRONMENT==`boolean`?IS_REACT_ACT_ENVIRONMENT:typeof jest<`u`)?gr.announce(e,t,n):setTimeout(()=>{gr?.isAttached()&&gr?.announce(e,t,n)},100))}var vr=class{constructor(){this.node=null,this.assertiveLog=null,this.politeLog=null,typeof document<`u`&&(this.node=document.createElement(`div`),this.node.dataset.liveAnnouncer=`true`,Object.assign(this.node.style,{border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`}),this.assertiveLog=this.createLog(`assertive`),this.node.appendChild(this.assertiveLog),this.politeLog=this.createLog(`polite`),this.node.appendChild(this.politeLog),document.body.prepend(this.node))}isAttached(){return this.node?.isConnected}createLog(e){let t=document.createElement(`div`);return t.setAttribute(`role`,`log`),t.setAttribute(`aria-live`,e),t.setAttribute(`aria-relevant`,`additions`),t}destroy(){this.node&&=(document.body.removeChild(this.node),null)}announce(e,t=`assertive`,n=hr){if(!this.node)return;let r=document.createElement(`div`);typeof e==`object`?(r.setAttribute(`role`,`img`),r.setAttribute(`aria-labelledby`,e[`aria-labelledby`])):r.textContent=e,t===`assertive`?this.assertiveLog?.appendChild(r):this.politeLog?.appendChild(r),e!==``&&setTimeout(()=>{r.remove()},n)}clear(e){this.node&&((!e||e===`assertive`)&&this.assertiveLog&&(this.assertiveLog.innerHTML=``),(!e||e===`polite`)&&this.politeLog&&(this.politeLog.innerHTML=``))}};function yr(e,t){let{elementType:n=`button`,isDisabled:r,onPress:i,onPressStart:a,onPressEnd:o,onPressUp:s,onPressChange:c,preventFocusOnPress:l,allowFocusWhenDisabled:u,onClick:d,href:f,target:p,rel:m,type:h=`button`}=e,g;g=n===`button`?{type:h,disabled:r,form:e.form,formAction:e.formAction,formEncType:e.formEncType,formMethod:e.formMethod,formNoValidate:e.formNoValidate,formTarget:e.formTarget,name:e.name,value:e.value}:{role:`button`,href:n===`a`&&!r?f:void 0,target:n===`a`?p:void 0,type:n===`input`?h:void 0,disabled:n===`input`?r:void 0,"aria-disabled":!r||n===`input`?void 0:r,rel:n===`a`?m:void 0};let{pressProps:_,isPressed:v}=Xn({onPressStart:a,onPressEnd:o,onPressChange:c,onPress:i,onPressUp:s,onClick:d,isDisabled:r,preventFocusOnPress:l,ref:t}),{focusableProps:y}=En(e,t);u&&(y.tabIndex=r?-1:y.tabIndex);let b=A(y,_,W(e,{labelable:!0}));return{isPressed:v,buttonProps:A(g,b,{"aria-haspopup":e[`aria-haspopup`],"aria-expanded":e[`aria-expanded`],"aria-controls":e[`aria-controls`],"aria-pressed":e[`aria-pressed`],"aria-current":e[`aria-current`],"aria-disabled":e[`aria-disabled`]})}}let br=(0,e.createContext)({}),xr=On(function(t,n){[t,n]=M(t,n,br);let r=t,{isPending:i}=r,{buttonProps:a,isPressed:o}=yr(t,n);a=Cr(a,i);let{focusProps:s,isFocused:c,isFocusVisible:l}=ar(t),{hoverProps:u,isHovered:d}=dr({...t,isDisabled:t.isDisabled||i}),f={isHovered:d,isPressed:(r.isPressed||o)&&!i,isFocused:c,isFocusVisible:l,isDisabled:t.isDisabled||!1,isPending:i??!1},p=j({...t,values:f,defaultClassName:`react-aria-Button`}),m=O(a.id),h=O(),g=a[`aria-labelledby`];i&&(g?g=`${g} ${h}`:a[`aria-label`]&&(g=`${m} ${h}`));let _=(0,e.useRef)(i);(0,e.useEffect)(()=>{let e={"aria-labelledby":g||m};(!_.current&&c&&i||_.current&&c&&!i)&&_r(e,`assertive`),_.current=i},[i,c,g,m]);let v=W(t,{global:!0});return delete v.onClick,e.default.createElement(N.button,{...A(v,p,a,s,u),type:a.type===`submit`&&i?`button`:a.type,id:m,ref:n,"aria-labelledby":g,slot:t.slot||void 0,"aria-disabled":i?`true`:a[`aria-disabled`],"data-disabled":t.isDisabled||void 0,"data-pressed":f.isPressed||void 0,"data-hovered":d||void 0,"data-focused":c||void 0,"data-pending":i||void 0,"data-focus-visible":l||void 0},e.default.createElement(mr.Provider,{value:{id:h}},p.children))}),Sr=/Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;function Cr(e,t){if(t){for(let t in e)t.startsWith(`on`)&&!Sr.test(t)&&(e[t]=void 0);e.href=void 0,e.target=void 0}return e}let wr=(0,e.createContext)({}),Tr=(0,e.forwardRef)(function(t,n){[t,n]=M(t,n,wr);let{children:r,level:i=3,className:a,...o}=t,s=N[`h${i}`];return e.default.createElement(s,{...o,ref:n,className:a??`react-aria-Heading`},r)}),Er=(0,e.createContext)({});function Dr(e,t){if(!e)return!1;let n=window.getComputedStyle(e),r=document.scrollingElement||document.documentElement,i=/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY);return e===r&&n.overflow!==`hidden`&&(i=!0),i&&t&&(i=e.scrollHeight!==e.clientHeight||e.scrollWidth!==e.clientWidth),i}function Or(e,t){let n=e;for(Dr(n,t)&&(n=n.parentElement);n&&!Dr(n,t);)n=n.parentElement;return n||document.scrollingElement||document.documentElement}let kr={border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`};function Ar(t={}){let{style:n,isFocusable:r}=t,[i,a]=(0,e.useState)(!1),{focusWithinProps:o}=ir({isDisabled:!r,onFocusWithinChange:e=>a(e)}),s=(0,e.useMemo)(()=>i?n:n?{...kr,...n}:kr,[i]);return{visuallyHiddenProps:{...o,style:s}}}function jr(t){let{children:n,elementType:r=`div`,isFocusable:i,style:a,...o}=t,{visuallyHiddenProps:s}=Ar(t);return e.default.createElement(r,A(o,s),n)}let Mr=(0,e.createContext)(null),Nr={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},Pr={...Nr,customError:!0,valid:!1},Fr={isInvalid:!1,validationDetails:Nr,validationErrors:[]},Ir=(0,e.createContext)({}),Lr=`__reactAriaFormValidationState`;function Rr(e){if(e.__reactAriaFormValidationState){let{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}=e[Lr];return{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}}return zr(e)}function zr(t){let{isInvalid:n,validationState:r,name:i,value:a,builtinValidation:o,validate:s,validationBehavior:c=`aria`}=t;r&&(n||=r===`invalid`);let l=n===void 0?null:{isInvalid:n,validationErrors:[],validationDetails:Pr},u=(0,e.useMemo)(()=>!s||a==null?null:Hr(Vr(s,a)),[s,a]);o?.validationDetails.valid&&(o=void 0);let d=(0,e.useContext)(Ir),f=(0,e.useMemo)(()=>i?Array.isArray(i)?i.flatMap(e=>Br(d[e])):Br(d[i]):[],[d,i]),[p,m]=(0,e.useState)(d),[h,g]=(0,e.useState)(!1);d!==p&&(m(d),g(!1));let _=(0,e.useMemo)(()=>Hr(h?[]:f),[h,f]),v=(0,e.useRef)(Fr),[y,b]=(0,e.useState)(Fr),x=(0,e.useRef)(Fr),S=()=>{if(!C)return;w(!1);let e=u||o||v.current;Ur(e,x.current)||(x.current=e,b(e))},[C,w]=(0,e.useState)(!1);return(0,e.useEffect)(S),{realtimeValidation:l||_||u||o||Fr,displayValidation:c===`native`?l||_||y:l||_||u||o||y,updateValidation(e){c===`aria`&&!Ur(y,e)?b(e):v.current=e},resetValidation(){let e=Fr;Ur(e,x.current)||(x.current=e,b(e)),c===`native`&&w(!1),g(!0)},commitValidation(){c===`native`&&w(!0),g(!0)}}}function Br(e){return e?Array.isArray(e)?e:[e]:[]}function Vr(e,t){if(typeof e==`function`){let n=e(t);if(n&&typeof n!=`boolean`)return Br(n)}return[]}function Hr(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:Pr}:null}function Ur(e,t){return e===t||!!e&&!!t&&e.isInvalid===t.isInvalid&&e.validationErrors.length===t.validationErrors.length&&e.validationErrors.every((e,n)=>e===t.validationErrors[n])&&Object.entries(e.validationDetails).every(([e,n])=>t.validationDetails[e]===n)}let Wr=(0,e.createContext)(null),Gr=new WeakMap;function Kr(e){let{description:t,errorMessage:n,isInvalid:r,validationState:i}=e,{labelProps:a,fieldProps:o}=pr(e),s=ne([!!t,!!n,r,i]),c=ne([!!t,!!n,r,i]);return o=A(o,{"aria-describedby":[s,c,e[`aria-describedby`]].filter(Boolean).join(` `)||void 0}),{labelProps:a,fieldProps:o,descriptionProps:{id:s},errorMessageProps:{id:c}}}function qr(t,n,r){let i=H(e=>{r&&!e.defaultPrevented&&r(n)});(0,e.useEffect)(()=>{let e=t?.current?.form;return e?.addEventListener(`reset`,i),()=>{e?.removeEventListener(`reset`,i)}},[t])}function Jr(t,n,r){let{validationBehavior:i,focus:a}=t;d(()=>{if(i===`native`&&r?.current&&`setCustomValidity`in r.current&&!r.current.disabled){let e=n.realtimeValidation.isInvalid?n.realtimeValidation.validationErrors.join(` `)||`Invalid value.`:``;r.current.setCustomValidity(e),r.current.hasAttribute(`title`)||(r.current.title=``),n.realtimeValidation.isInvalid||n.updateValidation(Xr(r.current))}});let o=(0,e.useRef)(!1),s=H(()=>{o.current||n.resetValidation()}),c=H(e=>{n.displayValidation.isInvalid||n.commitValidation();let t=r?.current?.form;!e.defaultPrevented&&r&&t&&Zr(t)===r.current&&(a?a():r.current?.focus(),_t(`keyboard`)),e.preventDefault()}),l=H(()=>{n.commitValidation()});(0,e.useEffect)(()=>{let e=r?.current;if(!e)return;let t=e.form,n=t?.reset;return t&&(t.reset=()=>{o.current=!window.event||window.event.type===`message`&&z(window.event)instanceof MessagePort,n?.call(t),o.current=!1}),e.addEventListener(`invalid`,c),e.addEventListener(`change`,l),t?.addEventListener(`reset`,s),()=>{e.removeEventListener(`invalid`,c),e.removeEventListener(`change`,l),t?.removeEventListener(`reset`,s),t&&(t.reset=n)}},[r,i])}function Yr(e){let t=e.validity;return{badInput:t.badInput,customError:t.customError,patternMismatch:t.patternMismatch,rangeOverflow:t.rangeOverflow,rangeUnderflow:t.rangeUnderflow,stepMismatch:t.stepMismatch,tooLong:t.tooLong,tooShort:t.tooShort,typeMismatch:t.typeMismatch,valueMissing:t.valueMissing,valid:t.valid}}function Xr(e){return{isInvalid:!e.validity.valid,validationDetails:Yr(e),validationErrors:e.validationMessage?[e.validationMessage]:[]}}function Zr(e){for(let t=0;t<e.elements.length;t++){let n=e.elements[t];if(n.validity?.valid===!1)return n}return null}function Qr(t=!0){let[n,r]=(0,e.useState)(t),i=(0,e.useRef)(!1),a=(0,e.useCallback)(e=>{i.current=!0,r(!!e)},[]);return d(()=>{i.current||r(!1)},[]),[a,n]}function $r(e=!0){let t=O(),[n,r]=Qr(e);return{id:r?t:void 0,ref:n}}function ei(t,n,r){let{isDisabled:i=!1,isReadOnly:a=!1,value:o,name:s,form:c,children:l,isRequired:u,validationBehavior:d=`aria`,"aria-label":f,"aria-labelledby":p,"aria-describedby":m,onPressStart:h,onPressEnd:g,onPressChange:_,onPress:v,onPressUp:y,onClick:b}=t,x=Rr({...t,value:n.isSelected}),{isInvalid:S,validationErrors:C,validationDetails:w}=x.displayValidation;Jr(t,x,r);let ee=e=>{e.stopPropagation(),n.setSelected(z(e).checked)},{pressProps:T,isPressed:E}=Xn({onPressStart:h,onPressEnd:g,onPressChange:_,onPress:v,onPressUp:y,onClick:b,isDisabled:i}),[D,O]=(0,e.useState)(!1),{pressProps:te}=Xn({onPressStart(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}h?.(e),_?.(!0),O(!0)},onPressEnd(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}g?.(e),_?.(!1),O(!1)},onPressUp(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}y?.(e)},onClick:b,onPress(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}v?.(e),n.toggle(),r.current?.focus();let{[Lr]:i}=t,{commitValidation:a}=i||x;a()},isDisabled:i||a}),{focusableProps:ne}=En(t,r),k=A(T,ne),re=W(t,{labelable:!0});qr(r,n.defaultSelected,n.setSelected);let ie=$r(),ae=$r();return{labelProps:A(te,{onClick:e=>e.preventDefault()}),inputProps:A(re,{checked:n.isSelected,"aria-required":u&&d===`aria`||void 0,required:u&&d===`native`,"aria-invalid":S||t.validationState===`invalid`||void 0,"aria-errormessage":t[`aria-errormessage`],"aria-controls":t[`aria-controls`],"aria-readonly":a||void 0,"aria-describedby":[ie.id,ae.id,m].filter(Boolean).join(` `)||void 0,onChange:ee,disabled:i,...o==null?{}:{value:o},name:s,form:c,type:`checkbox`,...k}),descriptionProps:ie,errorMessageProps:ae,isSelected:n.isSelected,isPressed:E||D,isDisabled:i,isReadOnly:a,isInvalid:S||t.validationState===`invalid`,validationErrors:C,validationDetails:w}}function ti(t,n,r){let{labelProps:i,inputProps:a,descriptionProps:o,errorMessageProps:s,isSelected:c,isPressed:l,isDisabled:u,isReadOnly:d,isInvalid:f,validationErrors:p,validationDetails:m}=ei(t,n,r),{isIndeterminate:h}=t;return(0,e.useEffect)(()=>{r.current&&(r.current.indeterminate=!!h)}),{labelProps:A(i,(0,e.useMemo)(()=>({onMouseDown:e=>e.preventDefault()}),[])),inputProps:a,descriptionProps:o,errorMessageProps:s,isSelected:c,isPressed:l,isDisabled:u,isReadOnly:d,isInvalid:f,validationErrors:p,validationDetails:m}}function ni(t={}){let{isReadOnly:n}=t,[r,i]=tn(t.isSelected,t.defaultSelected||!1,t.onChange),[a]=(0,e.useState)(r);function o(e){n||i(e)}function s(){n||i(!r)}return{isSelected:r,defaultSelected:t.defaultSelected??a,setSelected:o,toggle:s}}function ri(t,n,r){let i=ni({isReadOnly:t.isReadOnly||n.isReadOnly,isSelected:n.isSelected(t.value),defaultSelected:n.defaultValue.includes(t.value),onChange(e){e?n.addValue(t.value):n.removeValue(t.value),t.onChange&&t.onChange(e)}}),{name:a,form:o,descriptionId:s,errorMessageId:c,validationBehavior:l}=Gr.get(n);l=t.validationBehavior??l;let{realtimeValidation:u}=Rr({...t,value:i.isSelected,name:void 0,validationBehavior:`aria`}),d=(0,e.useRef)(Fr),f=()=>{n.setInvalid(t.value,u.isInvalid?u:d.current)};(0,e.useEffect)(f);let p=n.realtimeValidation.isInvalid?n.realtimeValidation:u,m=l===`native`?n.displayValidation:p,h=ti({...t,isReadOnly:t.isReadOnly||n.isReadOnly,isDisabled:t.isDisabled||n.isDisabled,name:t.name||a,form:t.form||o,isRequired:t.isRequired??n.isRequired,validationBehavior:l,[Lr]:{realtimeValidation:p,displayValidation:m,resetValidation:n.resetValidation,commitValidation:n.commitValidation,updateValidation(e){d.current=e,f()}}},i,r);return{...h,inputProps:{...h.inputProps,"aria-describedby":[h.inputProps[`aria-describedby`],n.isInvalid?c:null,s].filter(Boolean).join(` `)||void 0}}}let ii=(0,e.createContext)(null),ai=(0,e.createContext)(null),oi=(0,e.createContext)(null);function si(t,n){let{validationBehavior:r}=le(Wr)||{},i=t.validationBehavior??r??`native`,a=(0,e.useContext)(ai),o=oe((0,e.useMemo)(()=>k(n,t.inputRef===void 0?null:t.inputRef),[n,t.inputRef])),s={...de(t),children:typeof t.children==`function`||t.children,value:t.value,validationBehavior:i};return[a?ri(s,a,o):ti(s,ni(t),o),o]}let ci=(0,e.forwardRef)(function(t,n){let{inputRef:r=null,...i}=t;[t,n]=M(i,n,ii);let[a,o]=si(t,r);return e.default.createElement(oi.Provider,{value:{...a,inputRef:o,defaultClassName:`react-aria-Checkbox`,isIndeterminate:t.isIndeterminate,isRequired:t.isRequired}},e.default.createElement(li,{...t,ref:n}))}),li=(0,e.forwardRef)(function(t,n){let{labelProps:r,inputProps:i,isSelected:a,isDisabled:o,isReadOnly:s,isPressed:c,isInvalid:l,inputRef:u,defaultClassName:d,isIndeterminate:f,isRequired:p}=(0,e.useContext)(oi),{isFocused:m,isFocusVisible:h,focusProps:g}=ar(),_=o||s,{hoverProps:v,isHovered:y}=dr({...t,isDisabled:_}),b=j({...t,defaultClassName:d,values:{isSelected:a,isIndeterminate:f||!1,isPressed:c,isHovered:y,isFocused:m,isFocusVisible:h,isDisabled:o,isReadOnly:s,isInvalid:l,isRequired:p||!1}}),x=W(t,{global:!0});return delete x.id,delete x.onClick,e.default.createElement(N.label,{...A(x,r,v,b),ref:n,slot:t.slot||void 0,"data-selected":a||void 0,"data-indeterminate":f||void 0,"data-pressed":c||void 0,"data-hovered":y||void 0,"data-focused":m||void 0,"data-focus-visible":h||void 0,"data-disabled":o||void 0,"data-readonly":s||void 0,"data-invalid":l||void 0,"data-required":p||void 0},e.default.createElement(jr,{elementType:`span`},e.default.createElement(`input`,{...A(i,g),ref:u})),b.children)}),ui=(0,e.createContext)(null);function di(t){let n=(0,e.useRef)({});return e.default.createElement(ui.Provider,{value:n},t.children)}var fi=class{constructor(e,t,n,r){this._walkerStack=[],this._currentSetFor=new Set,this._acceptNode=e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e.shadowRoot;if(t){let e=this._doc.createTreeWalker(t,this.whatToShow,{acceptNode:this._acceptNode});return this._walkerStack.unshift(e),NodeFilter.FILTER_ACCEPT}if(typeof this.filter==`function`)return this.filter(e);if(this.filter?.acceptNode)return this.filter.acceptNode(e);if(this.filter===null)return NodeFilter.FILTER_ACCEPT}return NodeFilter.FILTER_SKIP},this._doc=e,this.root=t,this.filter=r??null,this.whatToShow=n??NodeFilter.SHOW_ALL,this._currentNode=t,this._walkerStack.unshift(e.createTreeWalker(t,n,this._acceptNode));let i=t.shadowRoot;if(i){let e=this._doc.createTreeWalker(i,this.whatToShow,{acceptNode:this._acceptNode});this._walkerStack.unshift(e)}}get currentNode(){return this._currentNode}set currentNode(e){if(!L(this.root,e))throw Error(`Cannot set currentNode to a node that is not contained by the root node.`);let t=[],n=e,r=e;for(this._currentNode=e;n&&n!==this.root;)if(n.nodeType===Node.DOCUMENT_FRAGMENT_NODE){let e=n,i=this._doc.createTreeWalker(e,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),n=r=e.host}else n=n.parentNode;let i=this._doc.createTreeWalker(this.root,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),this._walkerStack=t}get doc(){return this._doc}firstChild(){let e=this.currentNode,t=this.nextNode();return L(e,t)?(t&&(this.currentNode=t),t):(this.currentNode=e,null)}lastChild(){let e=this._walkerStack[0].lastChild();return e&&(this.currentNode=e),e}nextNode(){let e=this._walkerStack[0].nextNode();if(e){if(e.shadowRoot){let t;if(typeof this.filter==`function`?t=this.filter(e):this.filter?.acceptNode&&(t=this.filter.acceptNode(e)),t===NodeFilter.FILTER_ACCEPT)return this.currentNode=e,e;let n=this.nextNode();return n&&(this.currentNode=n),n}return e&&(this.currentNode=e),e}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.nextNode();return e&&(this.currentNode=e),e}return null}previousNode(){let e=this._walkerStack[0];if(e.currentNode===e.root){if(this._currentSetFor.has(e)){if(this._currentSetFor.delete(e),this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}return null}let t=e.previousNode();if(t){if(t.shadowRoot){let e;if(typeof this.filter==`function`?e=this.filter(t):this.filter?.acceptNode&&(e=this.filter.acceptNode(t)),e===NodeFilter.FILTER_ACCEPT)return t&&(this.currentNode=t),t;let n=this.lastChild();return n&&(this.currentNode=n),n}return t&&(this.currentNode=t),t}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}nextSibling(){return null}previousSibling(){return null}parentNode(){return null}};function pi(e,t,n,r){return I()?new fi(e,t,n,r):e.createTreeWalker(t,n,r)}let mi=e.default.createContext(null),hi=`react-aria-focus-scope-restore`,G=null;function gi(t){let{children:n,contain:r,restoreFocus:i,autoFocus:a}=t,o=(0,e.useRef)(null),s=(0,e.useRef)(null),c=(0,e.useRef)([]),{parentNode:l}=(0,e.useContext)(mi)||{},u=(0,e.useMemo)(()=>new Pi({scopeRef:c}),[c]);d(()=>{let e=l||X.root;if(X.getTreeNode(e.scopeRef)&&G&&!Ti(G,e.scopeRef)){let t=X.getTreeNode(G);t&&(e=t)}e.addChild(u),X.addNode(u)},[u,l]),d(()=>{let e=X.getTreeNode(c);e&&(e.contain=!!r)},[r]),d(()=>{let e=o.current?.nextSibling,t=[],n=e=>e.stopPropagation();for(;e&&e!==s.current;)t.push(e),e.addEventListener(hi,n),e=e.nextSibling;return c.current=t,()=>{for(let e of t)e.removeEventListener(hi,n)}},[n]),ki(c,i,r),Si(c,r),ji(c,i,r),Oi(c,a),(0,e.useEffect)(()=>{let e=R(P(c.current?c.current[0]:void 0)),t=null;if(K(e,c.current)){for(let n of X.traverse())n.scopeRef&&K(e,n.scopeRef.current)&&(t=n);t===X.getTreeNode(c)&&(G=t.scopeRef)}},[c]),d(()=>()=>{let e=X.getTreeNode(c)?.parent?.scopeRef??null;(c===G||Ti(c,G))&&(!e||X.getTreeNode(e))&&(G=e),X.removeTreeNode(c)},[c]);let f=(0,e.useMemo)(()=>_i(c),[]),p=(0,e.useMemo)(()=>({focusManager:f,parentNode:u}),[u,f]);return e.default.createElement(mi.Provider,{value:p},e.default.createElement(`span`,{"data-focus-scope-start":!0,hidden:!0,ref:o}),n,e.default.createElement(`span`,{"data-focus-scope-end":!0,hidden:!0,ref:s}))}function _i(e){return{focusNext(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||R(P(n[0]??void 0)),c=n[0].previousElementSibling,l=Y(vi(n),{tabbable:i,accept:o},n);l.currentNode=K(s,n)?s:c;let u=l.nextNode();return!u&&a&&(l.currentNode=c,u=l.nextNode()),u&&J(u,!0),u},focusPrevious(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||R(P(n[0]??void 0)),c=n[n.length-1].nextElementSibling,l=Y(vi(n),{tabbable:i,accept:o},n);l.currentNode=K(s,n)?s:c;let u=l.previousNode();return!u&&a&&(l.currentNode=c,u=l.previousNode()),u&&J(u,!0),u},focusFirst(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=Y(vi(n),{tabbable:r,accept:i},n);a.currentNode=n[0].previousElementSibling;let o=a.nextNode();return o&&J(o,!0),o},focusLast(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=Y(vi(n),{tabbable:r,accept:i},n);a.currentNode=n[n.length-1].nextElementSibling;let o=a.previousNode();return o&&J(o,!0),o}}}function vi(e){return e[0].parentElement}function yi(e){let t=X.getTreeNode(G);for(;t&&t.scopeRef!==e;){if(t.contain)return!1;t=t.parent}return!0}function bi(e){if(!e.form)return Array.from(P(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter(e=>!e.form);let t=e.form.elements.namedItem(e.name),n=F(e);return t instanceof n.RadioNodeList?Array.from(t).filter(e=>e instanceof n.HTMLInputElement):t instanceof n.HTMLInputElement?[t]:[]}function xi(e){if(e.checked)return!0;let t=bi(e);return t.length>0&&!t.some(e=>e.checked)}function Si(t,n){let r=(0,e.useRef)(void 0),i=(0,e.useRef)(void 0);d(()=>{let e=t.current;if(!n){i.current&&=(cancelAnimationFrame(i.current),void 0);return}let a=P(e?e[0]:void 0),o=e=>{if(e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!yi(t)||e.isComposing)return;let n=R(a),r=t.current;if(!r||!K(n,r))return;let i=Y(vi(r),{tabbable:!0},r);if(!n)return;i.currentNode=n;let o=e.shiftKey?i.previousNode():i.nextNode();o||=(i.currentNode=e.shiftKey?r[r.length-1].nextElementSibling:r[0].previousElementSibling,e.shiftKey?i.previousNode():i.nextNode()),e.preventDefault(),o&&(J(o,!0),o instanceof F(o).HTMLInputElement&&o.select())},s=e=>{(!G||Ti(G,t))&&K(z(e),t.current)?(G=t,r.current=z(e)):yi(t)&&!q(z(e),t)?r.current?J(r.current):G&&G.current&&Di(G.current):yi(t)&&(r.current=z(e))},c=e=>{i.current&&cancelAnimationFrame(i.current),i.current=requestAnimationFrame(()=>{let n=gt(),i=(n===`virtual`||n===null)&&Ye()&&Je(),o=R(a);if(!i&&o&&yi(t)&&!q(o,t)){G=t;let n=z(e);n&&n.isConnected?(r.current=n,J(r.current)):G.current&&Di(G.current)}})};return a.addEventListener(`keydown`,o,!1),a.addEventListener(`focusin`,s,!1),e?.forEach(e=>e.addEventListener(`focusin`,s,!1)),e?.forEach(e=>e.addEventListener(`focusout`,c,!1)),()=>{a.removeEventListener(`keydown`,o,!1),a.removeEventListener(`focusin`,s,!1),e?.forEach(e=>e.removeEventListener(`focusin`,s,!1)),e?.forEach(e=>e.removeEventListener(`focusout`,c,!1))}},[t,n]),d(()=>()=>{i.current&&cancelAnimationFrame(i.current)},[i])}function Ci(e){return q(e)}function K(e,t){return!e||!t?!1:t.some(t=>L(t,e))}function q(e,t=null){if(e instanceof Element&&e.closest(`[data-react-aria-top-layer]`))return!0;for(let{scopeRef:n}of X.traverse(X.getTreeNode(t)))if(n&&K(e,n.current))return!0;return!1}function wi(e){return q(e,G)}function Ti(e,t){let n=X.getTreeNode(t)?.parent;for(;n;){if(n.scopeRef===e)return!0;n=n.parent}return!1}function J(e,t=!1){if(e!=null&&!t)try{sn(e)}catch{}else if(e!=null)try{e.focus()}catch{}}function Ei(e,t=!0){let n=e[0].previousElementSibling,r=vi(e),i=Y(r,{tabbable:t},e);i.currentNode=n;let a=i.nextNode();return t&&!a&&(r=vi(e),i=Y(r,{tabbable:!1},e),i.currentNode=n,a=i.nextNode()),a}function Di(e,t=!0){J(Ei(e,t))}function Oi(t,n){let r=e.default.useRef(n);(0,e.useEffect)(()=>{if(r.current){G=t;let e=P(t.current?t.current[0]:void 0);!K(R(e),G.current)&&t.current&&Di(t.current)}r.current=!1},[t])}function ki(e,t,n){d(()=>{if(t||n)return;let r=e.current,i=P(r?r[0]:void 0),a=t=>{let n=z(t);K(n,e.current)?G=e:Ci(n)||(G=null)};return i.addEventListener(`focusin`,a,!1),r?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),r?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[e,t,n])}function Ai(e){let t=X.getTreeNode(G);for(;t&&t.scopeRef!==e;){if(t.nodeToRestore)return!1;t=t.parent}return t?.scopeRef===e}function ji(t,n,r){let i=(0,e.useRef)(typeof document<`u`?R(P(t.current?t.current[0]:void 0)):null);d(()=>{let e=t.current,i=P(e?e[0]:void 0);if(!n||r)return;let a=()=>{(!G||Ti(G,t))&&K(R(i),t.current)&&(G=t)};return i.addEventListener(`focusin`,a,!1),e?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),e?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[t,r]),d(()=>{let e=P(t.current?t.current[0]:void 0);if(!n)return;let i=n=>{if(n.key!==`Tab`||n.altKey||n.ctrlKey||n.metaKey||!yi(t)||n.isComposing)return;let r=e.activeElement;if(!q(r,t)||!Ai(t))return;let i=X.getTreeNode(t);if(!i)return;let a=i.nodeToRestore,o=Y(e.body,{tabbable:!0});o.currentNode=r;let s=n.shiftKey?o.previousNode():o.nextNode();if((!a||!a.isConnected||a===e.body)&&(a=void 0,i.nodeToRestore=void 0),(!s||!q(s,t))&&a){o.currentNode=a;do s=n.shiftKey?o.previousNode():o.nextNode();while(q(s,t));n.preventDefault(),n.stopPropagation(),s?J(s,!0):Ci(a)?J(a,!0):r.blur()}};return r||e.addEventListener(`keydown`,i,!0),()=>{r||e.removeEventListener(`keydown`,i,!0)}},[t,n,r]),d(()=>{let e=P(t.current?t.current[0]:void 0);if(!n)return;let r=X.getTreeNode(t);if(r)return r.nodeToRestore=i.current??void 0,()=>{let r=X.getTreeNode(t);if(!r)return;let i=r.nodeToRestore,a=R(e);if(n&&i&&(a&&q(a,t)||a===e.body&&Ai(t))){let n=X.clone();requestAnimationFrame(()=>{if(e.activeElement===e.body){let e=n.getTreeNode(t);for(;e;){if(e.nodeToRestore&&e.nodeToRestore.isConnected){Mi(e.nodeToRestore);return}e=e.parent}for(e=n.getTreeNode(t);e;){if(e.scopeRef&&e.scopeRef.current&&X.getTreeNode(e.scopeRef)){let t=Ei(e.scopeRef.current,!0);if(t){Mi(t);return}}e=e.parent}}})}}},[t,n])}function Mi(e){e.dispatchEvent(new CustomEvent(hi,{bubbles:!0,cancelable:!0}))&&J(e)}function Y(e,t,n){let r=t?.tabbable?Pe:Ne,i=e?.nodeType===Node.ELEMENT_NODE?e:null,a=P(i),o=pi(a,e||a,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return L(t?.from,e)||t?.tabbable&&e.tagName===`INPUT`&&e.getAttribute(`type`)===`radio`&&(!xi(e)||o.currentNode.tagName===`INPUT`&&o.currentNode.type===`radio`&&o.currentNode.name===e.name)?NodeFilter.FILTER_REJECT:r(e)&&(!n||K(e,n))&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(o.currentNode=t.from),o}var Ni=class e{constructor(){this.fastMap=new Map,this.root=new Pi({scopeRef:null}),this.fastMap.set(null,this.root)}get size(){return this.fastMap.size}getTreeNode(e){return this.fastMap.get(e)}addTreeNode(e,t,n){let r=this.fastMap.get(t??null);if(!r)return;let i=new Pi({scopeRef:e});r.addChild(i),i.parent=r,this.fastMap.set(e,i),n&&(i.nodeToRestore=n)}addNode(e){this.fastMap.set(e.scopeRef,e)}removeTreeNode(e){if(e===null)return;let t=this.fastMap.get(e);if(!t)return;let n=t.parent;for(let e of this.traverse())e!==t&&t.nodeToRestore&&e.nodeToRestore&&t.scopeRef&&t.scopeRef.current&&K(e.nodeToRestore,t.scopeRef.current)&&(e.nodeToRestore=t.nodeToRestore);let r=t.children;n&&(n.removeChild(t),r.size>0&&r.forEach(e=>n&&n.addChild(e))),this.fastMap.delete(t.scopeRef)}*traverse(e=this.root){if(e.scopeRef!=null&&(yield e),e.children.size>0)for(let t of e.children)yield*this.traverse(t)}clone(){let t=new e;for(let e of this.traverse())t.addTreeNode(e.scopeRef,e.parent?.scopeRef??null,e.nodeToRestore);return t}},Pi=class{constructor(e){this.children=new Set,this.contain=!1,this.scopeRef=e.scopeRef}addChild(e){this.children.add(e),e.parent=this}removeChild(e){this.children.delete(e),e.parent=void 0}};let X=new Ni,Fi=typeof HTMLElement<`u`&&`inert`in HTMLElement.prototype;function Ii(e){return e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer!==void 0}let Li=new WeakMap,Z=[];function Ri(e,t){let n=F(e?.[0]),r=t instanceof n.Element?{root:t}:t,i=r?.root??document.body,a=r?.shouldUseInert&&Fi,o=new Set(e),s=new Set,c=e=>a&&e instanceof n.HTMLElement?e.inert:e.getAttribute(`aria-hidden`)===`true`,l=(e,t)=>{a&&e instanceof n.HTMLElement?e.inert=t:t?e.setAttribute(`aria-hidden`,`true`):(e.removeAttribute(`aria-hidden`),e instanceof n.HTMLElement&&(e.inert=!1))},u=new Set;if(I()){let t=i.getRootNode();for(let n of e){let e=n.getRootNode();for(;_e(e)&&e!==t;)u.add(e),e=e.host.getRootNode()}}let d=e=>{for(let t of e.querySelectorAll(`[data-live-announcer], [data-react-aria-top-layer]`))o.add(t);let t=e=>{if(s.has(e)||o.has(e)||e.parentElement&&s.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of o)if(L(e,t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},n=pi(P(e),e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),r=t(e);if(r===NodeFilter.FILTER_ACCEPT&&f(e),r!==NodeFilter.FILTER_REJECT){let e=n.nextNode();for(;e!=null;)f(e),e=n.nextNode()}},f=e=>{let t=Li.get(e)??0;c(e)&&t===0||(t===0&&l(e,!0),s.add(e),Li.set(e,t+1))};Z.length&&Z[Z.length-1].disconnect(),d(i);let p=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>L(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Ii(e)?o.add(e):e instanceof Element&&d(e);if(I()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});p.observe(i,{childList:!0,subtree:!0});let m=new Set;if(I())for(let e of u){let t=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>L(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Ii(e)?o.add(e):e instanceof Element&&d(e);if(I()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});t.observe(e,{childList:!0,subtree:!0}),m.add(t)}let h={visibleNodes:o,hiddenNodes:s,observe(){p.observe(i,{childList:!0,subtree:!0})},disconnect(){p.disconnect()}};return Z.push(h),()=>{if(p.disconnect(),I())for(let e of m)e.disconnect();for(let e of s){let t=Li.get(e);t!=null&&(t===1?(l(e,!1),Li.delete(e)):Li.set(e,t-1))}h===Z[Z.length-1]?(Z.pop(),Z.length&&Z[Z.length-1].observe()):Z.splice(Z.indexOf(h),1)}}function zi(t){let{ref:n,onInteractOutside:r,isDisabled:i,onInteractOutsideStart:a}=t,o=(0,e.useRef)({isPointerDown:!1,ignoreEmulatedMouseEvents:!1}),s=H(e=>{r&&Bi(e,n)&&(a&&a(e),o.current.isPointerDown=!0)}),c=H(e=>{r&&r(e)});(0,e.useEffect)(()=>{let e=o.current;if(i)return;let t=n.current,r=P(t);if(typeof PointerEvent<`u`){let t=t=>{e.isPointerDown&&Bi(t,n)&&c(t),e.isPointerDown=!1};return r.addEventListener(`pointerdown`,s,!0),r.addEventListener(`click`,t,!0),()=>{r.removeEventListener(`pointerdown`,s,!0),r.removeEventListener(`click`,t,!0)}}},[n,i])}function Bi(e,t){if(e.button>0)return!1;let n=z(e);if(n){let e=n.ownerDocument;if(!e||!L(e.documentElement,n)||n.closest(`[data-react-aria-top-layer]`))return!1}return t.current?!e.composedPath().includes(t.current):!1}let Q=[];function Vi(t,n){let{onClose:r,shouldCloseOnBlur:i,isOpen:a,isDismissable:o=!1,isKeyboardDismissDisabled:s=!1,shouldCloseOnInteractOutside:c}=t,l=(0,e.useRef)(void 0);(0,e.useEffect)(()=>{if(a&&!Q.includes(n))return Q.push(n),()=>{let e=Q.indexOf(n);e>=0&&Q.splice(e,1)}},[a,n]);let u=()=>{Q[Q.length-1]===n&&r&&r()},d=e=>{let t=Q[Q.length-1];l.current=t,(!c||c(z(e)))&&t===n&&e.stopPropagation()},f=e=>{(!c||c(z(e)))&&(Q[Q.length-1]===n&&e.stopPropagation(),l.current===n&&u()),l.current=void 0},{keyboardProps:p}=Sn({shortcuts:{Escape:()=>{if(!s){u();return}return!1}}});zi({ref:n,onInteractOutside:o&&a?f:void 0,onInteractOutsideStart:d});let{focusWithinProps:m}=ir({isDisabled:!i,onBlurWithin:e=>{e.relatedTarget&&!wi(e.relatedTarget)&&(!c||c(e.relatedTarget))&&r?.()}});return{overlayProps:{...p,...m},underlayProps:{}}}let Hi=typeof document<`u`&&window.visualViewport,Ui=0,Wi;function Gi(e={}){let{isDisabled:t}=e;d(()=>{if(!t)return Ui++,Ui===1&&(Wi=Ke()&&qe()?qi():Ki()),()=>{Ui--,Ui===0&&Wi()}},[t])}function Ki(){let e=window.innerWidth-document.documentElement.clientWidth;return u(e>0&&(`scrollbarGutter`in document.documentElement.style?ye(document.documentElement,`scrollbar-gutter`,`stable`):ye(document.documentElement,`padding-right`,`${e}px`)),ye(document.documentElement,`overflow`,`hidden`))}function qi(){let e=ye(document.documentElement,`overflow`,`hidden`),t,n=!1,r=e=>{let r=z(e);t=Dr(r)?r:Or(r,!0),n=!1;let i=r.ownerDocument.defaultView.getSelection();i&&!i.isCollapsed&&i.containsNode(r,!0)&&(n=!0),e.composedPath().some(e=>e instanceof HTMLInputElement&&e.type===`range`)&&(n=!0),`selectionStart`in r&&`selectionEnd`in r&&r.selectionStart<r.selectionEnd&&r.ownerDocument.activeElement===r&&(n=!0)},i=document.createElement(`style`),a=Hn();a&&(i.nonce=a),i.textContent=`@layer {
  * {
    overscroll-behavior: contain;
  }
}`,document.head.prepend(i);let o=e=>{if(!(e.touches.length===2||n)){if(!t||t===document.documentElement||t===document.body){e.preventDefault();return}t.scrollHeight===t.clientHeight&&t.scrollWidth===t.clientWidth&&e.preventDefault()}},s=e=>{let t=z(e),n=e.relatedTarget;n&&St(n)?(n.focus({preventScroll:!0}),Ji(n,St(t))):n||(t.parentElement?.closest(`[tabindex]`))?.focus({preventScroll:!0})},c=HTMLElement.prototype.focus;Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(e){let t=R(),n=t!=null&&St(t);c.call(this,{...e,preventScroll:!0}),(!e||!e.preventScroll)&&Ji(this,n)}});let l=u(ve(document,`touchstart`,r,{passive:!1,capture:!0}),ve(document,`touchmove`,o,{passive:!1,capture:!0}),ve(document,`blur`,s,!0));return()=>{e(),l(),i.remove(),Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:c})}}function Ji(e,t){t||!Hi?Yi(e):Hi.addEventListener(`resize`,()=>Yi(e),{once:!0})}function Yi(e){let t=document.scrollingElement||document.documentElement,n=e;for(;n&&n!==t;){let e=Or(n);if(e!==document.documentElement&&e!==document.body&&e!==n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();if(r.top<t.top||r.bottom>t.top+n.clientHeight){let n=t.bottom;Hi&&(n=Math.min(n,Hi.offsetTop+Hi.height));let i=r.top-t.top-((n-t.top)/2-r.height/2);e.scrollTo({top:Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+i)),behavior:`smooth`})}}n=e.parentElement}}var Xi={};Xi={dismiss:`تجاهل`};var Zi={};Zi={dismiss:`Отхвърляне`};var Qi={};Qi={dismiss:`Odstranit`};var $i={};$i={dismiss:`Luk`};var ea={};ea={dismiss:`Schließen`};var ta={};ta={dismiss:`Απόρριψη`};var na={};na={dismiss:`Dismiss`};var ra={};ra={dismiss:`Descartar`};var ia={};ia={dismiss:`Lõpeta`};var aa={};aa={dismiss:`Hylkää`};var oa={};oa={dismiss:`Rejeter`};var sa={};sa={dismiss:`התעלם`};var ca={};ca={dismiss:`Odbaci`};var la={};la={dismiss:`Elutasítás`};var ua={};ua={dismiss:`Ignora`};var da={};da={dismiss:`閉じる`};var fa={};fa={dismiss:`무시`};var pa={};pa={dismiss:`Atmesti`};var ma={};ma={dismiss:`Nerādīt`};var ha={};ha={dismiss:`Lukk`};var ga={};ga={dismiss:`Negeren`};var _a={};_a={dismiss:`Zignoruj`};var va={};va={dismiss:`Descartar`};var ya={};ya={dismiss:`Dispensar`};var ba={};ba={dismiss:`Revocare`};var xa={};xa={dismiss:`Пропустить`};var Sa={};Sa={dismiss:`Zrušiť`};var Ca={};Ca={dismiss:`Opusti`};var wa={};wa={dismiss:`Odbaci`};var Ta={};Ta={dismiss:`Avvisa`};var Ea={};Ea={dismiss:`Kapat`};var Da={};Da={dismiss:`Скасувати`};var Oa={};Oa={dismiss:`取消`};var ka={};ka={dismiss:`關閉`};var Aa={};Aa={"ar-AE":Xi,"bg-BG":Zi,"cs-CZ":Qi,"da-DK":$i,"de-DE":ea,"el-GR":ta,"en-US":na,"es-ES":ra,"et-EE":ia,"fi-FI":aa,"fr-FR":oa,"he-IL":sa,"hr-HR":ca,"hu-HU":la,"it-IT":ua,"ja-JP":da,"ko-KR":fa,"lt-LT":pa,"lv-LV":ma,"nb-NO":ha,"nl-NL":ga,"pl-PL":_a,"pt-BR":va,"pt-PT":ya,"ro-RO":ba,"ru-RU":xa,"sk-SK":Sa,"sl-SI":Ca,"sr-SP":wa,"sv-SE":Ta,"tr-TR":Ea,"uk-UA":Da,"zh-CN":Oa,"zh-TW":ka};function ja(e){return e&&e.__esModule?e.default:e}function Ma(t){let{onDismiss:n,...r}=t,i=Tt(r,$t(ja(Aa),`@react-aria/overlays`).format(`dismiss`)),a=()=>{n&&n()};return e.default.createElement(jr,null,e.default.createElement(`button`,{...i,tabIndex:-1,onClick:a,style:{width:1,height:1}}))}function Na({children:t}){let n=(0,e.useMemo)(()=>({register:()=>{}}),[]);return e.default.createElement(Un.Provider,{value:n},t)}let Pa=(0,e.createContext)({});function Fa(){return(0,e.useContext)(Pa)??{}}let Ia=e.default.createContext(null);function La(n){let r=C(),{portalContainer:i=r?null:document.body,isExiting:a}=n,[o,s]=(0,e.useState)(!1),c=(0,e.useMemo)(()=>({contain:o,setContain:s}),[o,s]),{getContainer:l}=Fa();if(!n.portalContainer&&l&&(i=l()),!i)return null;let u=n.children;return n.disableFocusManagement||(u=e.default.createElement(gi,{restoreFocus:!0,contain:(n.shouldContainFocus||o)&&!a},u)),u=e.default.createElement(Ia.Provider,{value:c},e.default.createElement(Na,null,e.default.createElement(wn.Provider,{value:null},u))),t.default.createPortal(u,i)}function Ra(){let t=(0,e.useContext)(Ia)?.setContain;d(()=>{t?.(!0)},[t])}function za(t){let[n,r]=tn(t.isOpen,t.defaultOpen||!1,t.onOpenChange),[i,a]=(0,e.useState)(null);return{isOpen:n,setOpen:r,open:(0,e.useCallback)(()=>{r(!0)},[r]),close:(0,e.useCallback)(()=>{r(!1)},[r]),toggle:(0,e.useCallback)(()=>{r(!n)},[r,n]),point:i,setPoint:a}}function Ba(t,n=!0){let[r,i]=(0,e.useState)(!0),a=r&&n;return d(()=>{if(a&&t.current&&`getAnimations`in t.current)for(let e of t.current.getAnimations())e instanceof CSSTransition&&e.cancel()},[t,a]),Ha(t,a,(0,e.useCallback)(()=>i(!1),[])),a}function Va(t,n){let[r,i]=(0,e.useState)(n?`open`:`closed`);switch(r){case`open`:n||i(`exiting`);break;case`closed`:case`exiting`:n&&i(`open`)}let a=r===`exiting`;return Ha(t,a,(0,e.useCallback)(()=>{i(e=>e===`exiting`?`closed`:e)},[])),a}function Ha(e,n,r){d(()=>{if(n&&e.current){if(!(`getAnimations`in e.current)){r();return}let n=e.current.getAnimations();if(n.length===0){r();return}let i=!1;return Promise.allSettled(n.map(e=>e.finished)).then(()=>{i||(0,t.flushSync)(()=>{r()})}),()=>{i=!0}}},[e,n,r])}function Ua(t,n){let{role:r=`dialog`}=t,i=ne();i=t[`aria-label`]?void 0:i;let a=ne();a=r===`alertdialog`&&!t[`aria-describedby`]?a:void 0;let o=(0,e.useRef)(!1);(0,e.useEffect)(()=>{if(n.current&&!be(n.current)){sn(n.current);let e=setTimeout(()=>{(R()===n.current||R()===document.body)&&(o.current=!0,n.current&&(n.current.blur(),sn(n.current)),o.current=!1)},500);return()=>{clearTimeout(e)}}},[n]),Ra(),(0,e.useRef)(!1),(0,e.useEffect)(()=>{});let s=t[`aria-describedby`]??a;return{dialogProps:{...W(t,{labelable:!0}),role:r,tabIndex:-1,"aria-labelledby":t[`aria-labelledby`]??i,"aria-describedby":s,onBlur:e=>{o.current&&e.stopPropagation()}},titleProps:{id:i},contentProps:{id:a}}}let Wa=(0,e.createContext)(null),Ga=(0,e.createContext)(null),Ka=(0,e.forwardRef)(function(t,n){let r=t[`aria-labelledby`];[t,n]=M(t,n,Wa);let{dialogProps:i,titleProps:a,contentProps:o}=Ua({...t,"aria-labelledby":r},n),s=(0,e.useContext)(Ga);!i[`aria-label`]&&!i[`aria-labelledby`]&&t[`aria-labelledby`]&&(i[`aria-labelledby`]=t[`aria-labelledby`]);let c=j({defaultClassName:`react-aria-Dialog`,className:t.className,style:t.style,children:t.children,values:{close:s?.close||(()=>{})}}),l=W(t,{global:!0});return e.default.createElement(N.section,{...A(l,c,i),render:t.render,ref:n,slot:t.slot||void 0},e.default.createElement(ce,{values:[[wr,{slots:{[se]:{},title:{...a,level:2}}}],[Er,{slots:{[se]:{},description:o}}],[br,{slots:{[se]:{},close:{onPress:()=>s?.close()}}}]]},c.children))});function qa(n,r,i){let{isDisabled:a}=n,o=O(),s=O(),c=C(),l=(0,e.useRef)(null);wt(i,`beforematch`,(0,e.useCallback)(()=>{l.current=requestAnimationFrame(()=>{i.current&&i.current.setAttribute(`hidden`,`until-found`)}),(0,t.flushSync)(()=>{r.toggle()})},[i,r]));let u=(0,e.useRef)(null);return d(()=>{if(l.current&&cancelAnimationFrame(l.current),i.current&&!c){let e=i.current;u.current==null||typeof e.getAnimations!=`function`?r.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)):(e.setAttribute(`hidden`,`until-found`),e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`)):r.isExpanded!==u.current&&(r.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>{e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)}).catch(()=>{})):(e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),window.getComputedStyle(e).height,e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>e.setAttribute(`hidden`,`until-found`)).catch(()=>{}))),u.current=r.isExpanded}},[a,i,r.isExpanded,c]),(0,e.useEffect)(()=>()=>{l.current&&cancelAnimationFrame(l.current)},[]),{buttonProps:{id:o,"aria-expanded":r.isExpanded,"aria-controls":s,onPress:e=>{!a&&e.pointerType!==`keyboard`&&r.toggle()},isDisabled:a,onPressStart(e){e.pointerType===`keyboard`&&!a&&r.toggle()}},panelProps:{id:s,role:`group`,"aria-labelledby":o,"aria-hidden":!r.isExpanded,hidden:c?!r.isExpanded:void 0}}}function Ja(t){let{allowsMultipleExpanded:n=!1,isDisabled:r=!1}=t,[i,a]=tn((0,e.useMemo)(()=>t.expandedKeys?new Set(t.expandedKeys):void 0,[t.expandedKeys]),(0,e.useMemo)(()=>t.defaultExpandedKeys?new Set(t.defaultExpandedKeys):new Set,[t.defaultExpandedKeys]),t.onExpandedChange);return(0,e.useEffect)(()=>{if(!n&&i.size>1){let e=i.values().next().value;e!=null&&a(new Set([e]))}}),{allowsMultipleExpanded:n,isDisabled:r,expandedKeys:i,setExpandedKeys:a,toggleKey(e){let t;n?(t=new Set(i),t.has(e)?t.delete(e):t.add(e)):t=new Set(i.has(e)?[]:[e]),a(t)}}}function Ya(t){let[n,r]=tn(t.isExpanded,t.defaultExpanded||!1,t.onExpandedChange);return{isExpanded:n,setExpanded:r,expand:(0,e.useCallback)(()=>{r(!0)},[r]),collapse:(0,e.useCallback)(()=>{r(!1)},[r]),toggle:(0,e.useCallback)(()=>{r(!n)},[r,n])}}let Xa=(0,e.createContext)(null),Za=(0,e.forwardRef)(function(t,n){let r=Ja(t),i=j({...t,defaultClassName:`react-aria-DisclosureGroup`,values:{isDisabled:r.isDisabled,state:r}}),a=W(t,{global:!0});return e.default.createElement(N.div,{...a,...i,ref:n,"data-disabled":t.isDisabled||void 0},e.default.createElement(Xa.Provider,{value:r},i.children))}),Qa=(0,e.createContext)(null),$a=(0,e.createContext)(null),eo=(0,e.createContext)(null),to=(0,e.forwardRef)(function(t,n){[t,n]=M(t,n,Qa);let r=(0,e.useContext)(Xa),{id:i,...a}=t,o=O();i||=o;let s=r?r.expandedKeys.has(i):t.isExpanded,c=Ya({...t,isExpanded:s,onExpandedChange(e){r&&r.toggleKey(i),t.onExpandedChange?.(e)}}),l=e.default.useRef(null),u=t.isDisabled||r?.isDisabled||!1,{buttonProps:d,panelProps:f}=qa({...t,isExpanded:s,isDisabled:u},c,l),{isFocusVisible:p,focusProps:m}=ar({within:!0}),h=j({...t,id:void 0,defaultClassName:`react-aria-Disclosure`,values:{isExpanded:c.isExpanded,isDisabled:u,isFocusVisibleWithin:p,state:c}}),g=W(a,{global:!0});return e.default.createElement(ce,{values:[[br,{slots:{[se]:{},trigger:d}}],[eo,{panelProps:f,panelRef:l}],[$a,c]]},e.default.createElement(N.div,{...A(g,h,m),ref:n,"data-expanded":c.isExpanded||void 0,"data-disabled":u||void 0,"data-focus-visible-within":p||void 0},h.children))}),no=(0,e.forwardRef)(function(t,n){let{role:r=`group`}=t,{panelProps:i,panelRef:a}=(0,e.useContext)(eo),{isFocusVisible:o,focusProps:s}=ar({within:!0}),c=j({...t,defaultClassName:`react-aria-DisclosurePanel`,values:{isFocusVisibleWithin:o}}),l=W(t,{global:!0,labelable:!0});return e.default.createElement(N.div,{...A(l,c,i,s),ref:k(n,a),role:r,"data-focus-visible-within":o||void 0},e.default.createElement(ce,{values:[[br,null]]},t.children))});function ro(t,n,r){let{overlayProps:i,underlayProps:a}=Vi({...t,isOpen:n.isOpen,onClose:n.close},r);return Gi({isDisabled:!n.isOpen}),Ra(),(0,e.useEffect)(()=>{if(n.isOpen&&r.current)return Ri([r.current],{shouldUseInert:!0})},[n.isOpen,r]),{modalProps:A(i),underlayProps:a}}let $=typeof document<`u`&&window.visualViewport;function io(){let t=C(),[n,r]=(0,e.useState)(()=>t?{width:0,height:0}:ao());return(0,e.useEffect)(()=>{let e=e=>{r(t=>e.width===t.width&&e.height===t.height?t:e)},t=()=>{$&&$.scale>1||e(ao())},n,i=t=>{$&&$.scale>1||St(z(t))&&(n=requestAnimationFrame(()=>{let t=R();(!t||!St(t))&&e({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight})}))};return e(ao()),Ke()&&qe()&&window.addEventListener(`blur`,i,!0),$?$.addEventListener(`resize`,t):window.addEventListener(`resize`,t),()=>{cancelAnimationFrame(n),Ke()&&qe()&&window.removeEventListener(`blur`,i,!0),$?$.removeEventListener(`resize`,t):window.removeEventListener(`resize`,t)}},[]),n}function ao(){return{width:$?Math.min($.width*$.scale,document.documentElement.clientWidth):document.documentElement.clientWidth,height:$?$.height*$.scale:document.documentElement.clientHeight}}let oo=(0,e.createContext)(null),so=(0,e.createContext)(null),co=(0,e.forwardRef)(function(t,n){if((0,e.useContext)(so))return e.default.createElement(po,{...t,modalRef:n},t.children);let{isDismissable:r,isKeyboardDismissDisabled:i,isOpen:a,defaultOpen:o,onOpenChange:s,children:c,isEntering:l,isExiting:u,UNSTABLE_portalContainer:d,shouldCloseOnInteractOutside:f,...p}=t;return e.default.createElement(uo,{isDismissable:r,isKeyboardDismissDisabled:i,isOpen:a,defaultOpen:o,onOpenChange:s,isEntering:l,isExiting:u,UNSTABLE_portalContainer:d,shouldCloseOnInteractOutside:f},e.default.createElement(po,{...p,modalRef:n},c))});function lo(t,n){[t,n]=M(t,n,oo);let r=(0,e.useContext)(Ga),i=za(t),a=t.isOpen!=null||t.defaultOpen!=null||!r?i:r,o=oe(n),s=(0,e.useRef)(null),c=Va(o,a.isOpen),l=Va(s,a.isOpen),u=c||l||t.isExiting||!1,d=C();return!a.isOpen&&!u||d?null:e.default.createElement(fo,{...t,state:a,isExiting:u,overlayRef:o,modalRef:s})}let uo=(0,e.forwardRef)(lo);function fo({UNSTABLE_portalContainer:t,...n}){let r=n.modalRef,{state:i}=n,{modalProps:a,underlayProps:o}=ro(n,i,r),s=Ba(n.overlayRef)||n.isEntering||!1,c=j({...n,defaultClassName:`react-aria-ModalOverlay`,values:{isEntering:s,isExiting:n.isExiting,state:i}}),l=io(),u,d;if(typeof document<`u`){let e=Dr(document.body)?document.body:document.scrollingElement||document.documentElement,t=e.getBoundingClientRect().width%1,n=e.getBoundingClientRect().height%1;u=e.scrollWidth-t,d=e.scrollHeight-n}let f={...c.style,"--visual-viewport-width":l.width+`px`,"--visual-viewport-height":l.height+`px`,"--page-width":u===void 0?void 0:u+`px`,"--page-height":d===void 0?void 0:d+`px`};return e.default.createElement(La,{isExiting:n.isExiting,portalContainer:t},e.default.createElement(N.div,{...A(W(n,{global:!0}),o),...c,style:f,ref:n.overlayRef,"data-entering":s||void 0,"data-exiting":n.isExiting||void 0},e.default.createElement(ce,{values:[[so,{modalProps:a,modalRef:r,isExiting:n.isExiting,isDismissable:n.isDismissable}],[Ga,i]]},c.children)))}function po(t){let{modalProps:n,modalRef:r,isExiting:i,isDismissable:a}=(0,e.useContext)(so),o=(0,e.useContext)(Ga),s=oe((0,e.useMemo)(()=>k(t.modalRef,r),[t.modalRef,r])),c=Ba(s),l=j({...t,defaultClassName:`react-aria-Modal`,values:{isEntering:c,isExiting:i,state:o}});return e.default.createElement(N.div,{...A(W(t,{global:!0}),n),...l,ref:s,"data-entering":c||void 0,"data-exiting":i||void 0},a&&e.default.createElement(Ma,{onDismiss:o.close}),l.children)}let mo=new WeakMap;function ho(t,n,r){let{value:i,children:a,"aria-label":o,"aria-labelledby":s,onPressStart:c,onPressEnd:l,onPressChange:u,onPress:d,onPressUp:f,onClick:p}=t,m=t.isDisabled||n.isDisabled,h=n.selectedValue===i,g=e=>{e.stopPropagation(),n.setSelectedValue(i)},{pressProps:_,isPressed:v}=Xn({onPressStart:c,onPressEnd:l,onPressChange:u,onPress:d,onPressUp:f,onClick:p,isDisabled:m}),{pressProps:y,isPressed:b}=Xn({onPressStart:c,onPressEnd:l,onPressChange:u,onPressUp:f,onClick:p,isDisabled:m,onPress(e){d?.(e),n.setSelectedValue(i),r.current?.focus()}}),{focusableProps:x}=En(A(t,{onFocus:()=>n.setLastFocusedValue(i)}),r),S=A(_,x),C=W(t,{labelable:!0}),w=-1;n.selectedValue==null?(n.lastFocusedValue===i||n.lastFocusedValue==null)&&(w=0):n.selectedValue===i&&(w=0),m&&(w=void 0);let{name:ee,form:T,descriptionId:E,errorMessageId:D,validationBehavior:O}=mo.get(n);qr(r,n.defaultSelectedValue,n.setSelectedValue),Jr({validationBehavior:O},n,r);let te=$r();return{labelProps:A(y,(0,e.useMemo)(()=>({onClick:e=>e.preventDefault(),onMouseDown:e=>e.preventDefault()}),[])),inputProps:A(C,{...S,type:`radio`,name:ee,form:T,tabIndex:w,disabled:m,required:n.isRequired&&O===`native`,checked:h,value:i,onChange:g,"aria-describedby":[t[`aria-describedby`],te.id,n.isInvalid?D:null,E].filter(Boolean).join(` `)||void 0}),descriptionProps:te,isDisabled:m,isSelected:h,isPressed:v||b}}function go(e,t){let{name:n,form:r,isReadOnly:i,isRequired:a,isDisabled:o,orientation:s=`vertical`,validationBehavior:c=`aria`}=e,{direction:l}=zt(),{isInvalid:u,validationErrors:d,validationDetails:f}=t.displayValidation,{labelProps:p,fieldProps:m,descriptionProps:h,errorMessageProps:g}=Kr({...e,labelElementType:`span`,isInvalid:t.isInvalid,errorMessage:e.errorMessage||d}),_=W(e,{labelable:!0}),{focusWithinProps:v}=ir({onBlurWithin(n){e.onBlur?.(n),t.selectedValue||t.setLastFocusedValue(null)},onFocusWithin:e.onFocus,onFocusWithinChange:e.onFocusChange});function y(e,n){let r=Y(n.currentTarget,{from:z(n),accept:e=>e instanceof F(e).HTMLInputElement&&e.type===`radio`}),i;return e===`next`?(i=r.nextNode(),i||=(r.currentNode=n.currentTarget,r.firstChild())):(i=r.previousNode(),i||=(r.currentNode=n.currentTarget,r.lastChild())),i?(i.focus(),t.setSelectedValue(i.value),!0):!1}let{keyboardProps:b}=Sn({shortcuts:{ArrowRight:e=>y(l===`rtl`&&s!==`vertical`?`prev`:`next`,e),ArrowLeft:e=>y(l===`rtl`&&s!==`vertical`?`next`:`prev`,e),ArrowDown:e=>y(`next`,e),ArrowUp:e=>y(`prev`,e)},allowRepeats:!0}),x=O(n);return mo.set(t,{name:x,form:r,descriptionId:h.id,errorMessageId:g.id,validationBehavior:c}),{radioGroupProps:A(_,{role:`radiogroup`,...b,"aria-invalid":t.isInvalid||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-readonly":i||void 0,"aria-required":a||void 0,"aria-disabled":o||void 0,"aria-orientation":s,...m,...v}),labelProps:p,descriptionProps:h,errorMessageProps:g,isInvalid:u,validationErrors:d,validationDetails:f}}let _o=Math.round(Math.random()*1e10),vo=0;function yo(t){let n=(0,e.useMemo)(()=>t.name||`radio-group-${_o}-${++vo}`,[t.name]),[r,i]=tn(t.value,t.defaultValue??null,t.onChange),[a]=(0,e.useState)(r),[o,s]=(0,e.useState)(null),c=Rr({...t,value:r}),l=e=>{!t.isReadOnly&&!t.isDisabled&&(i(e),c.commitValidation())},u=c.displayValidation.isInvalid;return{...c,name:n,selectedValue:r,defaultSelectedValue:t.value===void 0?t.defaultValue??null:a,setSelectedValue:l,lastFocusedValue:o,setLastFocusedValue:s,isDisabled:t.isDisabled||!1,isReadOnly:t.isReadOnly||!1,isRequired:t.isRequired||!1,validationState:t.validationState||(u?`invalid`:null),isInvalid:u}}let bo=(0,e.createContext)(null),xo=(0,e.createContext)(null),So=(0,e.createContext)(null),Co=(0,e.forwardRef)(function(t,n){[t,n]=M(t,n,bo);let{validationBehavior:r}=le(Wr)||{},i=t.validationBehavior??r??`native`,a=yo({...t,validationBehavior:i}),[o,s]=ue(!t[`aria-label`]&&!t[`aria-labelledby`]),{radioGroupProps:c,labelProps:l,descriptionProps:u,errorMessageProps:d,...f}=go({...t,label:s,validationBehavior:i},a),p=j({...t,values:{orientation:t.orientation||`vertical`,isDisabled:a.isDisabled,isReadOnly:a.isReadOnly,isRequired:a.isRequired,isInvalid:a.isInvalid,state:a},defaultClassName:`react-aria-RadioGroup`}),m=W(t,{global:!0});return e.default.createElement(N.div,{...A(m,p,c),ref:n,slot:t.slot||void 0,"data-orientation":t.orientation||`vertical`,"data-invalid":a.isInvalid||void 0,"data-disabled":a.isDisabled||void 0,"data-readonly":a.isReadOnly||void 0,"data-required":a.isRequired||void 0},e.default.createElement(ce,{values:[[So,a],[fr,{...l,ref:o,elementType:`span`}],[Er,{slots:{description:u,errorMessage:d}}],[Mr,f]]},e.default.createElement(di,null,p.children)))}),wo=(0,e.forwardRef)(function(t,n){let{inputRef:r=null,...i}=t;[t,n]=M(i,n,xo);let a=e.default.useContext(So),o=oe((0,e.useMemo)(()=>k(r,t.inputRef===void 0?null:t.inputRef),[r,t.inputRef])),s=ho({...de(t),children:typeof t.children==`function`||t.children},a,o);return e.default.createElement(To.Provider,{value:{...s,inputRef:o,defaultClassName:`react-aria-Radio`}},e.default.createElement(Eo,{...t,ref:n}))}),To=(0,e.createContext)(null),Eo=(0,e.forwardRef)(function(t,n){let{labelProps:r,inputProps:i,isSelected:a,isDisabled:o,isPressed:s,defaultClassName:c,inputRef:l}=(0,e.useContext)(To),u=e.default.useContext(So),{isFocused:d,isFocusVisible:f,focusProps:p}=ar(),m=o||u.isReadOnly,{hoverProps:h,isHovered:g}=dr({...t,isDisabled:m}),_=j({...t,defaultClassName:c,values:{isSelected:a,isPressed:s,isHovered:g,isFocused:d,isFocusVisible:f,isDisabled:o,isReadOnly:u.isReadOnly,isInvalid:u.isInvalid,isRequired:u.isRequired}}),v=W(t,{global:!0});return delete v.id,delete v.onClick,e.default.createElement(N.label,{...A(v,r,h,_),ref:n,"data-selected":a||void 0,"data-pressed":s||void 0,"data-hovered":g||void 0,"data-focused":d||void 0,"data-focus-visible":f||void 0,"data-disabled":o||void 0,"data-readonly":u.isReadOnly||void 0,"data-invalid":u.isInvalid||void 0,"data-required":u.isRequired||void 0},e.default.createElement(jr,{elementType:`span`},e.default.createElement(`input`,{...A(i,p),ref:l})),_.children)});function Do(e,t,n){let{labelProps:r,inputProps:i,isSelected:a,...o}=ei(e,t,n);return{labelProps:r,inputProps:{...i,role:`switch`,checked:a},isSelected:a,...o}}let Oo=(0,e.createContext)(null),ko=(0,e.createContext)(null),Ao=(0,e.forwardRef)(function(t,n){let{inputRef:r=null,...i}=t;[t,n]=M(i,n,Oo);let a=oe((0,e.useMemo)(()=>k(r,t.inputRef===void 0?null:t.inputRef),[r,t.inputRef])),o=ni(t),s=Do({...de(t),children:typeof t.children==`function`||t.children},o,a);return e.default.createElement(ce,{values:[[ko,o],[jo,{...s,inputRef:a,defaultClassName:`react-aria-Switch`}]]},e.default.createElement(Mo,{...t,ref:n}))}),jo=(0,e.createContext)(null),Mo=(0,e.forwardRef)(function(t,n){let{labelProps:r,inputProps:i,isSelected:a,isDisabled:o,isReadOnly:s,isPressed:c,isInvalid:l,inputRef:u,defaultClassName:d,isRequired:f}=(0,e.useContext)(jo),{isFocused:p,isFocusVisible:m,focusProps:h}=ar(),g=o||s,_=(0,e.useContext)(ko),{hoverProps:v,isHovered:y}=dr({...t,isDisabled:g}),b=j({...t,defaultClassName:d,values:{isSelected:a,isPressed:c,isHovered:y,isFocused:p,isFocusVisible:m,isDisabled:o,isReadOnly:s,isInvalid:l,isRequired:f||!1,state:_}}),x=W(t,{global:!0});return delete x.id,delete x.onClick,e.default.createElement(N.label,{...A(x,r,v,b),ref:n,slot:t.slot||void 0,"data-selected":a||void 0,"data-pressed":c||void 0,"data-hovered":y||void 0,"data-focused":p||void 0,"data-focus-visible":m||void 0,"data-disabled":o||void 0,"data-readonly":s||void 0,"data-invalid":l||void 0,"data-required":f||void 0},e.default.createElement(jr,{elementType:`span`},e.default.createElement(`input`,{...A(i,h),ref:u})),b.children)}),No=window.VendraDesignSystem=window.VendraDesignSystem||{};No.__vendor={"react-aria-components":{Button:xr,Checkbox:ci,Dialog:Ka,Disclosure:to,DisclosureGroup:Za,DisclosurePanel:no,Heading:Tr,I18nProvider:Rt,Modal:co,ModalOverlay:uo,Radio:wo,RadioGroup:Co,Switch:Ao,useLocale:zt}}})(window.React,window.ReactDOM);} catch (e) { (window.VendraDesignSystem = window.VendraDesignSystem || {}).__vendorError = String((e && e.message) || e); }
(() => {
const __ds_ns = (window.VendraDesignSystem = window.VendraDesignSystem || {});
const __ds_scope = {};
__ds_ns.__errors = __ds_ns.__errors || [];

// components/Icon/icon-svgs.js
try { (() => {
// Lucide 0.460.0 (ISC licence) — the icons this design system uses, bundled so no CDN is needed.
// To add one: paste its SVG from lucide.dev into this map. Names not listed render empty (with a console warning).
const ICON_SVGS = {
	"arrow-down": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5v14\" /><path d=\"m19 12-7 7-7-7\" /></svg>",
	"arrow-left": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m12 19-7-7 7-7\" /><path d=\"M19 12H5\" /></svg>",
	"arrow-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" /></svg>",
	"arrow-up": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m5 12 7-7 7 7\" /><path d=\"M12 19V5\" /></svg>",
	badge: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\" /></svg>",
	banknote: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" /><circle cx=\"12\" cy=\"12\" r=\"2\" /><path d=\"M6 12h.01M18 12h.01\" /></svg>",
	baseline: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4 20h16\" /><path d=\"m6 16 6-12 6 12\" /><path d=\"M8 12h8\" /></svg>",
	bell: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" /></svg>",
	"book-x": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m14.5 7-5 5\" /><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" /><path d=\"m9.5 7 5 5\" /></svg>",
	boxes: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\" /><path d=\"m7 16.5-4.74-2.85\" /><path d=\"m7 16.5 5-3\" /><path d=\"M7 16.5v5.17\" /><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\" /><path d=\"m17 16.5-5-3\" /><path d=\"m17 16.5 4.74-2.85\" /><path d=\"M17 16.5v5.17\" /><path d=\"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z\" /><path d=\"M12 8 7.26 5.15\" /><path d=\"m12 8 4.74-2.85\" /><path d=\"M12 13.5V8\" /></svg>",
	cake: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8\" /><path d=\"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1\" /><path d=\"M2 21h20\" /><path d=\"M7 8v3\" /><path d=\"M12 8v3\" /><path d=\"M17 8v3\" /><path d=\"M7 4h.01\" /><path d=\"M12 4h.01\" /><path d=\"M17 4h.01\" /></svg>",
	calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /><path d=\"M3 10h18\" /></svg>",
	"calendar-days": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /><path d=\"M3 10h18\" /><path d=\"M8 14h.01\" /><path d=\"M12 14h.01\" /><path d=\"M16 14h.01\" /><path d=\"M8 18h.01\" /><path d=\"M12 18h.01\" /><path d=\"M16 18h.01\" /></svg>",
	"calendar-heart": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7\" /><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><path d=\"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z\" /></svg>",
	camera: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\" /><circle cx=\"12\" cy=\"13\" r=\"3\" /></svg>",
	car: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\" /><circle cx=\"7\" cy=\"17\" r=\"2\" /><path d=\"M9 17h6\" /><circle cx=\"17\" cy=\"17\" r=\"2\" /></svg>",
	cat: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z\" /><path d=\"M8 14v.5\" /><path d=\"M16 14v.5\" /><path d=\"M11.25 16.25h1.5L12 17l-.75-.75Z\" /></svg>",
	check: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 6 9 17l-5-5\" /></svg>",
	"chevron-down": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m6 9 6 6 6-6\" /></svg>",
	"chevron-left": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15 18-6-6 6-6\" /></svg>",
	"chevron-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m9 18 6-6-6-6\" /></svg>",
	"chevron-up": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m18 15-6-6-6 6\" /></svg>",
	circle: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /></svg>",
	"circle-alert": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" /></svg>",
	"circle-check": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m9 12 2 2 4-4\" /></svg>",
	"circle-help": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\" /><path d=\"M12 17h.01\" /></svg>",
	"circle-x": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m15 9-6 6\" /><path d=\"m9 9 6 6\" /></svg>",
	clock: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><polyline points=\"12 6 12 12 16 14\" /></svg>",
	code: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polyline points=\"16 18 22 12 16 6\" /><polyline points=\"8 6 2 12 8 18\" /></svg>",
	contact: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M16 2v2\" /><path d=\"M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2\" /><path d=\"M8 2v2\" /><circle cx=\"12\" cy=\"11\" r=\"3\" /><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" /></svg>",
	copy: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" /></svg>",
	currency: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"8\" /><line x1=\"3\" x2=\"6\" y1=\"3\" y2=\"6\" /><line x1=\"21\" x2=\"18\" y1=\"3\" y2=\"6\" /><line x1=\"3\" x2=\"6\" y1=\"21\" y2=\"18\" /><line x1=\"21\" x2=\"18\" y1=\"21\" y2=\"18\" /></svg>",
	download: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /><polyline points=\"7 10 12 15 17 10\" /><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" /></svg>",
	ellipsis: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"1\" /><circle cx=\"19\" cy=\"12\" r=\"1\" /><circle cx=\"5\" cy=\"12\" r=\"1\" /></svg>",
	"external-link": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 3h6v6\" /><path d=\"M10 14 21 3\" /><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" /></svg>",
	eye: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>",
	"eye-off": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\" /><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\" /><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\" /><path d=\"m2 2 20 20\" /></svg>",
	filter: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\" /></svg>",
	"flower-2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1\" /><circle cx=\"12\" cy=\"8\" r=\"2\" /><path d=\"M12 10v12\" /><path d=\"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z\" /><path d=\"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z\" /></svg>",
	frame: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"22\" x2=\"2\" y1=\"6\" y2=\"6\" /><line x1=\"22\" x2=\"2\" y1=\"18\" y2=\"18\" /><line x1=\"6\" x2=\"6\" y1=\"2\" y2=\"22\" /><line x1=\"18\" x2=\"18\" y1=\"2\" y2=\"22\" /></svg>",
	gem: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 3h12l4 6-10 13L2 9Z\" /><path d=\"M11 3 8 9l4 13 4-13-3-6\" /><path d=\"M2 9h20\" /></svg>",
	ghost: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 10h.01\" /><path d=\"M15 10h.01\" /><path d=\"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z\" /></svg>",
	gift: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\" /><path d=\"M12 8v13\" /><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\" /><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\" /></svg>",
	globe: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" /></svg>",
	group: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 7V5c0-1.1.9-2 2-2h2\" /><path d=\"M17 3h2c1.1 0 2 .9 2 2v2\" /><path d=\"M21 17v2c0 1.1-.9 2-2 2h-2\" /><path d=\"M7 21H5c-1.1 0-2-.9-2-2v-2\" /><rect width=\"7\" height=\"5\" x=\"7\" y=\"7\" rx=\"1\" /><rect width=\"7\" height=\"5\" x=\"10\" y=\"12\" rx=\"1\" /></svg>",
	heart: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" /></svg>",
	house: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" /></svg>",
	image: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /><circle cx=\"9\" cy=\"9\" r=\"2\" /><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" /></svg>",
	info: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 16v-4\" /><path d=\"M12 8h.01\" /></svg>",
	instagram: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\" /><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\" /><line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\" /></svg>",
	italic: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"19\" x2=\"10\" y1=\"4\" y2=\"4\" /><line x1=\"14\" x2=\"5\" y1=\"20\" y2=\"20\" /><line x1=\"15\" x2=\"9\" y1=\"4\" y2=\"20\" /></svg>",
	key: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4\" /><path d=\"m21 2-9.6 9.6\" /><circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\" /></svg>",
	"layout-grid": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\" /></svg>",
	leaf: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\" /><path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\" /></svg>",
	link: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" /></svg>",
	"loader-circle": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 12a9 9 0 1 1-6.219-8.56\" /></svg>",
	lock: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" /></svg>",
	"log-out": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /><polyline points=\"16 17 21 12 16 7\" /><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" /></svg>",
	mail: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" /></svg>",
	map: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\" /><path d=\"M15 5.764v15\" /><path d=\"M9 3.236v15\" /></svg>",
	"map-pin": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /><circle cx=\"12\" cy=\"10\" r=\"3\" /></svg>",
	menu: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" /></svg>",
	"message-circle": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\" /></svg>",
	"message-square": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\" /></svg>",
	minus: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /></svg>",
	moon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\" /></svg>",
	"move-left": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 8L2 12L6 16\" /><path d=\"M2 12H22\" /></svg>",
	"move-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M18 8L22 12L18 16\" /><path d=\"M2 12H22\" /></svg>",
	"notebook-pen": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /><path d=\"M2 6h4\" /><path d=\"M2 10h4\" /><path d=\"M2 14h4\" /><path d=\"M2 18h4\" /><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" /></svg>",
	"package-search": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14\" /><path d=\"m7.5 4.27 9 5.15\" /><polyline points=\"3.29 7 12 12 20.71 7\" /><line x1=\"12\" x2=\"12\" y1=\"22\" y2=\"12\" /><circle cx=\"18.5\" cy=\"15.5\" r=\"2.5\" /><path d=\"M20.27 17.27 22 19\" /></svg>",
	palette: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\" /></svg>",
	pencil: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /><path d=\"m15 5 4 4\" /></svg>",
	phone: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\" /></svg>",
	pill: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\" /><path d=\"m8.5 8.5 7 7\" /></svg>",
	plus: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"M12 5v14\" /></svg>",
	pointer: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M22 14a8 8 0 0 1-8 8\" /><path d=\"M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2\" /><path d=\"M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1\" /><path d=\"M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10\" /><path d=\"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\" /></svg>",
	quote: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /><path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /></svg>",
	radio: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4.9 19.1C1 15.2 1 8.8 4.9 4.9\" /><path d=\"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5\" /><circle cx=\"12\" cy=\"12\" r=\"2\" /><path d=\"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5\" /><path d=\"M19.1 4.9C23 8.8 23 15.1 19.1 19\" /></svg>",
	receipt: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z\" /><path d=\"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8\" /><path d=\"M12 17.5v-11\" /></svg>",
	"redo-2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15 14 5-5-5-5\" /><path d=\"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13\" /></svg>",
	"refresh-cw": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /><path d=\"M21 3v5h-5\" /><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /><path d=\"M8 16H3v5\" /></svg>",
	"rotate-ccw": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" /><path d=\"M3 3v5h5\" /></svg>",
	search: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" /></svg>",
	"search-x": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m13.5 8.5-5 5\" /><path d=\"m8.5 8.5 5 5\" /><circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" /></svg>",
	send: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /><path d=\"m21.854 2.147-10.94 10.939\" /></svg>",
	settings: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>",
	"share-2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"18\" cy=\"5\" r=\"3\" /><circle cx=\"6\" cy=\"12\" r=\"3\" /><circle cx=\"18\" cy=\"19\" r=\"3\" /><line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /><line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" /></svg>",
	"shield-check": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m9 12 2 2 4-4\" /></svg>",
	"shopping-bag": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" /><path d=\"M3 6h18\" /><path d=\"M16 10a4 4 0 0 1-8 0\" /></svg>",
	"sliders-horizontal": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" /></svg>",
	smartphone: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /><path d=\"M12 18h.01\" /></svg>",
	sprout: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M7 20h10\" /><path d=\"M10 20c5.5-2.5.8-6.4 3-10\" /><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\" /><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\" /></svg>",
	star: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" /></svg>",
	store: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\" /><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\" /><path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\" /><path d=\"M2 7h20\" /><path d=\"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7\" /></svg>",
	sun: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M12 2v2\" /><path d=\"M12 20v2\" /><path d=\"m4.93 4.93 1.41 1.41\" /><path d=\"m17.66 17.66 1.41 1.41\" /><path d=\"M2 12h2\" /><path d=\"M20 12h2\" /><path d=\"m6.34 17.66-1.41 1.41\" /><path d=\"m19.07 4.93-1.41 1.41\" /></svg>",
	tag: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\" /><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /></svg>",
	text: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M17 6.1H3\" /><path d=\"M21 12.1H3\" /><path d=\"M15.1 18H3\" /></svg>",
	"trash-2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 6h18\" /><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\" /><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\" /><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\" /><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\" /></svg>",
	"triangle-alert": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /><path d=\"M12 9v4\" /><path d=\"M12 17h.01\" /></svg>",
	truck: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /><path d=\"M15 18H9\" /><path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /><circle cx=\"17\" cy=\"18\" r=\"2\" /><circle cx=\"7\" cy=\"18\" r=\"2\" /></svg>",
	type: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polyline points=\"4 7 4 4 20 4 20 7\" /><line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"12\" y1=\"4\" y2=\"20\" /></svg>",
	underline: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 4v6a6 6 0 0 0 12 0V4\" /><line x1=\"4\" x2=\"20\" y1=\"20\" y2=\"20\" /></svg>",
	"undo-2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 14 4 9l5-5\" /><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11\" /></svg>",
	user: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /><circle cx=\"12\" cy=\"7\" r=\"4\" /></svg>",
	view: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2\" /><path d=\"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2\" /><circle cx=\"12\" cy=\"12\" r=\"1\" /><path d=\"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0\" /></svg>",
	x: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" /></svg>"
};
Object.assign(__ds_scope, { ICON_SVGS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/icon-svgs.js", error: String((e && e.message) || e) }); }

// components/utils/cx.js
try { (() => {
// Joins class names, skipping empty values: cx('ag-btn', primary && 'ag-btn--primary', className).
function cx(...names) {
	return names.filter(Boolean).join(" ");
}
Object.assign(__ds_scope, { cx });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/cx.js", error: String((e && e.message) || e) }); }

// components/Icon/Icon.jsx
try { (() => {
const { ICON_SVGS } = __ds_scope;
const { cx } = __ds_scope;
// Icons come only from the bundled Lucide set (icon-svgs.js) — no network. Unknown names render empty and warn once.
const DIRECTIONAL = [
	"arrow-right",
	"arrow-left",
	"chevron-right",
	"chevron-left",
	"move-right",
	"move-left",
	"undo-2",
	"redo-2"
];
// name → CSS mask url (or null), built once per icon.
const maskCache = {};
const maskUrl = (name) => {
	if (name in maskCache) return maskCache[name];
	const svg = ICON_SVGS[name];
	if (!svg) console.warn("Icon: \"" + name + "\" is not in icon-svgs.js — add its SVG from lucide.dev");
	return maskCache[name] = svg ? "url(\"data:image/svg+xml," + encodeURIComponent(svg).replace(/'/g, "%27") + "\")" : null;
};
// A Lucide icon drawn with a CSS mask, so it takes `color` (currentColor by default). Decorative
// unless `label` is set; arrows and chevrons mirror in RTL unless `flipRtl={false}`.
function Icon({ name, size = 20, color = "currentColor", label, flipRtl, className = "", style, ...rest }) {
	const mask = maskUrl(name);
	const flip = flipRtl ?? DIRECTIONAL.includes(name);
	return /* @__PURE__ */ React.createElement("span", {
		role: label ? "img" : undefined,
		"aria-label": label,
		"aria-hidden": label ? undefined : true,
		className: cx(flip && "ag-flip-rtl", className),
		style: {
			display: "inline-block",
			flex: "none",
			width: size,
			height: size,
			background: mask ? color : "transparent",
			WebkitMask: mask ? mask + " center/contain no-repeat" : undefined,
			mask: mask ? mask + " center/contain no-repeat" : undefined,
			...style
		},
		...rest
	});
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/Accordion/Accordion.jsx
try { (() => {
const { Button, Disclosure, DisclosureGroup, DisclosurePanel, Heading } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
const toList = (value) => value == null ? [] : Array.isArray(value) ? value : [value];
// Disclosure panels under real headings, on React Aria's DisclosureGroup. Controlled with `openId`
// (one id or a list), uncontrolled with `defaultOpenId`; `allowMultiple` keeps other panels open.
// Each button has aria-expanded and controls its panel, a region named by the button.
function Accordion({ items = [], openId, defaultOpenId, onToggle, allowMultiple, headingLevel = 3, className = "" }) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(toList(defaultOpenId));
	const openIds = openId !== undefined ? toList(openId) : uncontrolledOpen;
	const change = (keys) => {
		const next = [...keys].map(String);
		const toggled = next.find((id) => !openIds.includes(id)) || openIds.find((id) => !next.includes(id));
		if (openId === undefined) setUncontrolledOpen(next);
		if (toggled !== undefined && onToggle) onToggle(toggled, next.includes(toggled), next);
	};
	return /* @__PURE__ */ React.createElement(DisclosureGroup, {
		expandedKeys: openIds,
		onExpandedChange: change,
		allowsMultipleExpanded: !!allowMultiple,
		className: cx("ag-acc", className)
	}, items.map((item) => /* @__PURE__ */ React.createElement(Disclosure, {
		key: item.id,
		id: item.id,
		className: ({ isExpanded }) => cx("ag-acc__item", isExpanded && "ag-acc__item--open")
	}, /* @__PURE__ */ React.createElement(Heading, {
		level: headingLevel,
		className: "ag-acc__h"
	}, /* @__PURE__ */ React.createElement(Button, {
		slot: "trigger",
		className: "ag-acc__btn"
	}, /* @__PURE__ */ React.createElement("span", null, item.title), /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-down",
		size: 18,
		className: "ag-acc__chev"
	}))), /* @__PURE__ */ React.createElement(DisclosurePanel, {
		role: "region",
		className: "ag-acc__panel"
	}, /* @__PURE__ */ React.createElement("div", { className: "ag-acc__clip" }, /* @__PURE__ */ React.createElement("div", { className: "ag-acc__content" }, item.content))))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Accordion/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/Badge/Badge.jsx
try { (() => {
const { cx } = __ds_scope;
// A short status label. Tones are shared with Alert and Toast; uppercase in English, never in Persian.
function Badge({ tone = "neutral", className = "", children, ...rest }) {
	return /* @__PURE__ */ React.createElement("span", {
		className: cx("ag-badge", "ag-badge--" + tone, className),
		...rest
	}, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/IconButton/IconButton.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// An icon-only button, or link with `href`. `label` is its accessible name and tooltip; `active`
// sets aria-pressed and `count` shows a badge.
function IconButton({ icon, label, variant = "ghost", size = "md", active, count, className = "", type = "button", href, target, rel, ...rest }) {
	const iconSize = size === "sm" ? 16 : size === "lg" ? 22 : 20;
	const classes = cx("ag-iconbtn", "ag-iconbtn--" + variant, "ag-iconbtn--" + size, active && "ag-iconbtn--active", className);
	// count may be a pre-localized string (Persian digits), so test for a value rather than count>0.
	const content = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon, {
		name: icon,
		size: iconSize
	}), count ? /* @__PURE__ */ React.createElement("span", { className: "ag-iconbtn__count" }, count) : null);
	if (href) return /* @__PURE__ */ React.createElement("a", {
		href,
		target,
		rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
		"aria-label": label,
		title: label,
		className: classes,
		...rest
	}, content);
	return /* @__PURE__ */ React.createElement("button", {
		type,
		"aria-label": label,
		title: label,
		"aria-pressed": active,
		className: classes,
		...rest
	}, content);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/IconButton/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// href → <a> (navigation); no href → <button> (action). A disabled link drops its href and gets aria-disabled.
// loading: spinner replaces iconStart, label stays (width doesn't jump), button is disabled + aria-busy; loadingLabel is announced to screen readers.
function Button({ variant = "primary", size = "md", iconStart, iconEnd, block, className = "", children, type = "button", href, target, rel, disabled, loading, loadingLabel, ...rest }) {
	if (loading) disabled = true;
	const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;
	const classes = cx("ag-btn", "ag-btn--" + variant, "ag-btn--" + size, block && "ag-btn--block", loading && "ag-btn--loading", className);
	const content = /* @__PURE__ */ React.createElement(React.Fragment, null, loading ? /* @__PURE__ */ React.createElement("span", {
		className: "ag-spin",
		style: {
			width: iconSize,
			height: iconSize
		},
		"aria-hidden": "true"
	}) : iconStart && /* @__PURE__ */ React.createElement(Icon, {
		name: iconStart,
		size: iconSize
	}), children, !loading && iconEnd && /* @__PURE__ */ React.createElement(Icon, {
		name: iconEnd,
		size: iconSize
	}), loading && loadingLabel && /* @__PURE__ */ React.createElement("span", {
		className: "ag-sr-only",
		role: "status"
	}, loadingLabel));
	if (href != null) return /* @__PURE__ */ React.createElement("a", {
		href: disabled ? undefined : href,
		target,
		rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
		"aria-disabled": disabled || undefined,
		className: classes + (disabled ? " ag-btn--disabled" : ""),
		...rest
	}, content);
	return /* @__PURE__ */ React.createElement("button", {
		type,
		disabled,
		"aria-busy": loading || undefined,
		className: classes,
		...rest
	}, content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/AddressCard/AddressCard.jsx
try { (() => {
const { Badge } = __ds_scope;
const { IconButton } = __ds_scope;
const { Button } = __ds_scope;
const { cx } = __ds_scope;
const DEFAULT_LABELS = {
	edit: "Edit {name}",
	delete: "Delete {name}",
	default: "Default",
	makeDefault: "Set as default"
};
// Saved delivery address. Edit / delete IconButtons get specific names ("Edit Home", "Delete Home").
function AddressCard({ label, line, recipient, phone, zone, isDefault, onEdit, onDelete, onMakeDefault, labels, className = "", style }) {
	const text = {
		...DEFAULT_LABELS,
		...labels
	};
	const named = (template) => template.replace("{name}", label || "");
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-card", "ag-addr", className),
		style
	}, /* @__PURE__ */ React.createElement("div", { className: "ag-addr__head" }, /* @__PURE__ */ React.createElement("span", { className: "ag-addr__label" }, label), /* @__PURE__ */ React.createElement("div", { className: "ag-addr__tools" }, isDefault && /* @__PURE__ */ React.createElement(Badge, { tone: "accent" }, text.default), onEdit && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "pencil",
		size: "sm",
		label: named(text.edit),
		onClick: onEdit
	}), onDelete && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "trash-2",
		size: "sm",
		label: named(text.delete),
		onClick: onDelete
	}))), /* @__PURE__ */ React.createElement("div", { className: "ag-addr__line" }, line), /* @__PURE__ */ React.createElement("div", { className: "ag-addr__meta" }, [
		recipient,
		phone && /* @__PURE__ */ React.createElement("span", {
			key: "p",
			dir: "ltr"
		}, phone),
		zone
	].filter(Boolean).map((part, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, i > 0 && /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, " · "), part))), !isDefault && onMakeDefault && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button, {
		variant: "ghost",
		size: "sm",
		onClick: onMakeDefault,
		className: "ag-addr__default"
	}, text.makeDefault)));
}
Object.assign(__ds_scope, { AddressCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/AddressCard/AddressCard.jsx", error: String((e && e.message) || e) }); }

// components/Alert/Alert.jsx
try { (() => {
const { Icon } = __ds_scope;
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
const ALERT_ICONS = {
	neutral: "info",
	warning: "triangle-alert",
	danger: "circle-alert",
	success: "circle-check"
};
// An inline message. danger and warning interrupt screen readers (role="alert"); the others are
// announced politely (role="status"). `icon={false}` hides the icon.
function Alert({ tone = "neutral", icon, title, children, action, onClose, closeLabel = "Dismiss", className = "", style }) {
	const role = tone === "danger" || tone === "warning" ? "alert" : "status";
	return /* @__PURE__ */ React.createElement("div", {
		role,
		className: cx("ag-alert", "ag-alert--" + tone, className),
		style
	}, icon !== false && /* @__PURE__ */ React.createElement(Icon, {
		name: icon || ALERT_ICONS[tone] || ALERT_ICONS.neutral,
		size: 20,
		className: "ag-alert__icon"
	}), /* @__PURE__ */ React.createElement("div", { className: "ag-alert__body" }, /* @__PURE__ */ React.createElement("div", { className: "ag-alert__msg" }, title && /* @__PURE__ */ React.createElement("div", { className: "ag-alert__title" }, title), children && /* @__PURE__ */ React.createElement("div", { className: "ag-alert__text" }, children)), action && /* @__PURE__ */ React.createElement("div", { className: "ag-alert__action" }, action)), onClose && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "x",
		label: closeLabel,
		className: "ag-alert__close",
		onClick: onClose
	}));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Alert/Alert.jsx", error: String((e && e.message) || e) }); }

// components/AnnouncementBar/AnnouncementBar.jsx
try { (() => {
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
// A dismissible strip above the header (role="region", named by `label`) for store-wide news.
function AnnouncementBar({ children, onClose, closeLabel = "Dismiss", label, className = "" }) {
	return /* @__PURE__ */ React.createElement("div", {
		role: "region",
		"aria-label": label,
		className: cx("ag-announce", className)
	}, /* @__PURE__ */ React.createElement("div", { className: "ag-announce__text" }, children), onClose && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "x",
		label: closeLabel,
		className: "ag-announce__close",
		onClick: onClose
	}));
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/AnnouncementBar/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/ArchFrame/ArchFrame.jsx
try { (() => {
const { cx } = __ds_scope;
const ARCH_RATIOS = {
	"4/5": "4 / 5",
	"3/4": "3 / 4",
	"4/3": "4 / 3",
	"1/1": "1 / 1"
};
// The brand's image window: an arch (or circle, soft or square) on --radius-arch, with a
// striped placeholder until `src` is set. `ratio="fill"` stretches to the parent's height.
function ArchFrame({ src, srcSet, sizes, alt = "", ratio = "4/5", shape = "arch", placeholder = true, placeholderLabel, ring, minHeight, tone = "petal", size, zoomOnHover, objectPosition, children, className = "", style, ...rest }) {
	const fill = ratio === "fill" && shape !== "circle";
	const aspectRatio = shape === "circle" ? "1 / 1" : fill ? undefined : ARCH_RATIOS[ratio] || ratio.replace("/", " / ");
	const thumb = size === "thumb";
	const classes = cx("ag-arch", "ag-arch--" + shape, ring && "ag-arch--ring", fill && "ag-arch--fill", tone === "product" && "ag-arch--product", thumb && "ag-arch--thumb", zoomOnHover && "ag-arch--zoom", className);
	return /* @__PURE__ */ React.createElement("div", {
		className: classes,
		style: {
			aspectRatio,
			minHeight: fill ? minHeight : undefined,
			...style
		},
		...rest
	}, src ? /* @__PURE__ */ React.createElement("img", {
		src,
		srcSet,
		sizes: srcSet ? sizes : undefined,
		alt,
		loading: "lazy",
		decoding: "async",
		style: objectPosition ? { objectPosition } : undefined
	}) : placeholder ? /* @__PURE__ */ React.createElement("span", {
		className: "ag-arch__ph",
		role: alt ? "img" : undefined,
		"aria-label": alt || undefined
	}, thumb ? null : placeholderLabel) : null, children);
}
Object.assign(__ds_scope, { ArchFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ArchFrame/ArchFrame.jsx", error: String((e && e.message) || e) }); }

// components/BlogCard/BlogCard.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A journal post: image, date, title link and excerpt. `layout="wide"` puts the image beside
// the text; the title is the only link (or a button without `href`).
function BlogCard({ image, srcSet, sizes, date, meta, title, excerpt, cta, onClick, href, frame = "arch", aspect, layout = "stack", headingLevel = 3, priority, className = "" }) {
	const Heading = "h" + headingLevel;
	const Link = href ? "a" : "button";
	const wide = layout === "wide";
	const imageSizes = sizes || (wide ? "(max-width: 767px) 100vw, 55vw" : "(max-width: 767px) 100vw, 400px");
	return /* @__PURE__ */ React.createElement("article", { className: cx("ag-blog", wide && "ag-blog--wide", className) }, /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-blog__media", "ag-product__media--" + frame),
		style: aspect ? { aspectRatio: aspect } : undefined
	}, image ? /* @__PURE__ */ React.createElement("img", {
		src: image,
		srcSet,
		sizes: srcSet ? imageSizes : undefined,
		alt: "",
		loading: priority ? undefined : "lazy",
		fetchpriority: priority ? "high" : undefined,
		decoding: "async"
	}) : /* @__PURE__ */ React.createElement("span", { className: "ag-product__ph" })), /* @__PURE__ */ React.createElement("div", { className: "ag-blog__body" }, date && /* @__PURE__ */ React.createElement("span", { className: "ag-eyebrow ag-blog__date" }, date), meta && /* @__PURE__ */ React.createElement("div", { className: "ag-blog__meta" }, meta), /* @__PURE__ */ React.createElement(Heading, { className: "ag-blog__title" }, /* @__PURE__ */ React.createElement(Link, {
		href,
		type: href ? undefined : "button",
		className: "ag-blog__link",
		onClick
	}, title)), excerpt && /* @__PURE__ */ React.createElement("p", { className: "ag-blog__excerpt" }, excerpt), cta && /* @__PURE__ */ React.createElement("span", {
		className: "ag-blog__cta",
		"aria-hidden": "true"
	}, cta, /* @__PURE__ */ React.createElement(Icon, {
		name: "arrow-right",
		size: 16
	}))));
}
Object.assign(__ds_scope, { BlogCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/BlogCard/BlogCard.jsx", error: String((e && e.message) || e) }); }

// components/BottomTabBar/BottomTabBar.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// The phone tab bar. Items with `href` are links (aria-current="page" when current); the rest
// are buttons. `count` shows a badge on the icon.
function BottomTabBar({ items = [], label, className = "" }) {
	return /* @__PURE__ */ React.createElement("nav", {
		"aria-label": label,
		className: cx("ag-tabbar", className)
	}, /* @__PURE__ */ React.createElement("ul", { className: "ag-tabbar__list" }, items.map((item) => {
		const classes = cx("ag-tabbar__item", item.current && "ag-tabbar__item--current");
		const current = item.current ? "page" : undefined;
		const content = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "ag-tabbar__icon" }, /* @__PURE__ */ React.createElement(Icon, {
			name: item.icon,
			size: 22
		}), item.count ? /* @__PURE__ */ React.createElement("span", { className: "ag-tabbar__count" }, item.count) : null), /* @__PURE__ */ React.createElement("span", { className: "ag-tabbar__label" }, item.label));
		return /* @__PURE__ */ React.createElement("li", { key: item.id }, item.href ? /* @__PURE__ */ React.createElement("a", {
			href: item.href,
			target: item.target,
			rel: item.rel ?? (item.target === "_blank" ? "noopener noreferrer" : undefined),
			className: classes,
			"aria-current": current,
			onClick: item.onClick
		}, content) : /* @__PURE__ */ React.createElement("button", {
			type: "button",
			className: classes,
			"aria-current": current,
			onClick: item.onClick
		}, content));
	})));
}
Object.assign(__ds_scope, { BottomTabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/BottomTabBar/BottomTabBar.jsx", error: String((e && e.message) || e) }); }

// components/Card/Card.jsx
try { (() => {
const { cx } = __ds_scope;
// A plain surface: default (white with a hairline), `sunken` or `raised`. `padding` takes px (number) or any CSS length.
function Card({ variant = "default", padding = 24, className = "", style, children, ...rest }) {
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-card", variant !== "default" && "ag-card--" + variant, className),
		style: {
			padding,
			...style
		},
		...rest
	}, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card/Card.jsx", error: String((e && e.message) || e) }); }

// components/Carousel/Carousel.jsx
try { (() => {
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
// Flatten fragments, nested arrays and [data-snap-group] wrappers so each repeated item gets its own snap slot.
function flattenSnap(children) {
	const slots = [];
	const walk = (nodes, keyPrefix) => {
		React.Children.toArray(nodes).forEach((child) => {
			const isGroup = React.isValidElement(child) && (child.type === React.Fragment || child.props && child.props["data-snap-group"] != null);
			if (isGroup) {
				walk(child.props.children, keyPrefix + String(child.key) + "/");
			} else {
				const ownKey = React.isValidElement(child) && child.key != null ? child.key : slots.length;
				slots.push({
					node: child,
					key: keyPrefix + ownKey
				});
			}
		});
	};
	walk(children, "");
	return slots;
}
// A horizontal scroll-snap row. Pass children, or `items` + `renderItem`. With `arrows` it shows
// its own prev/next buttons; otherwise drive it through `ref` (scrollPrev / scrollNext) and
// `onScrollStateChange`, e.g. from SectionHeader.
const Carousel = React.forwardRef(function Carousel({ children, items, renderItem, itemAs = "wrap", itemMin = "200px", perView = 5, perViewMobile = 2.3, gap = "16px", label, arrows, prevLabel = "Previous", nextLabel = "Next", onScrollStateChange, bleed = true, className = "", style }, ref) {
	const trackRef = React.useRef(null);
	const [scrollState, setScrollState] = React.useState({
		canPrev: false,
		canNext: false
	});
	const lastState = React.useRef(null);
	const onChangeRef = React.useRef(onScrollStateChange);
	onChangeRef.current = onScrollStateChange;
	const measure = React.useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		const maxScroll = track.scrollWidth - track.clientWidth;
		const position = Math.abs(track.scrollLeft);
		const next = {
			canPrev: position > 1,
			canNext: position < maxScroll - 1
		};
		const previous = lastState.current;
		if (previous && previous.canPrev === next.canPrev && previous.canNext === next.canNext) return;
		lastState.current = next;
		setScrollState(next);
		onChangeRef.current && onChangeRef.current(next);
	}, []);
	// Scrolls most of a view back (-1) or forward (1), in reading direction.
	const scrollPage = React.useCallback((direction) => {
		const track = trackRef.current;
		if (!track) return;
		const rtl = getComputedStyle(track).direction === "rtl";
		const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		track.scrollBy({
			left: direction * (rtl ? -1 : 1) * track.clientWidth * .85,
			behavior: reduceMotion ? "auto" : "smooth"
		});
	}, []);
	React.useImperativeHandle(ref, () => ({
		scrollPrev: () => scrollPage(-1),
		scrollNext: () => scrollPage(1),
		get element() {
			return trackRef.current;
		},
		get state() {
			return scrollState;
		}
	}), [scrollPage, scrollState]);
	React.useEffect(() => {
		measure();
		const track = trackRef.current;
		if (!track || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(measure);
		observer.observe(track);
		return () => observer.disconnect();
	}, [
		measure,
		children,
		items
	]);
	const layout = {
		"--carousel-item-min": itemMin,
		"--carousel-per-view": perView,
		"--carousel-per-view-mobile": perViewMobile,
		"--carousel-gap": gap,
		...style
	};
	const itemKey = (item, i) => item && item.id != null ? item.id : i;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-carousel", bleed && "ag-carousel--bleed", itemAs === "contents" && "ag-carousel--contents", className),
		style: layout
	}, arrows && /* @__PURE__ */ React.createElement("div", { className: "ag-carousel__nav" }, /* @__PURE__ */ React.createElement(IconButton, {
		icon: "chevron-left",
		label: prevLabel,
		variant: "outline",
		size: "sm",
		onClick: () => scrollPage(-1),
		disabled: !scrollState.canPrev
	}), /* @__PURE__ */ React.createElement(IconButton, {
		icon: "chevron-right",
		label: nextLabel,
		variant: "outline",
		size: "sm",
		onClick: () => scrollPage(1),
		disabled: !scrollState.canNext
	})), /* @__PURE__ */ React.createElement("div", {
		ref: trackRef,
		className: "ag-carousel__track",
		role: "region",
		"aria-label": label,
		tabIndex: 0,
		onScroll: measure
	}, itemAs === "contents" ? items && renderItem ? items.map((item, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: itemKey(item, i) }, renderItem(item, i))) : children : [...items && renderItem ? items.map((item, i) => ({
		node: renderItem(item, i),
		key: "i" + itemKey(item, i)
	})) : [], ...flattenSnap(children)].map(({ node, key }) => /* @__PURE__ */ React.createElement("div", {
		className: "ag-carousel__item",
		key
	}, node))));
});
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Carousel/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/CategoryCard/CategoryCard.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A category tile (photo, name, count) that is a link with `href` or a button with `onClick`.
function CategoryCard({ label, count, image, srcSet, sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", frame = "arch", onClick, href, className = "" }) {
	const inner = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: cx("ag-cat__media", "ag-product__media--" + frame) }, image ? /* @__PURE__ */ React.createElement("img", {
		src: image,
		srcSet,
		sizes: srcSet ? sizes : undefined,
		alt: "",
		loading: "lazy",
		decoding: "async"
	}) : /* @__PURE__ */ React.createElement("span", { className: "ag-product__ph" })), /* @__PURE__ */ React.createElement("span", { className: "ag-cat__row" }, /* @__PURE__ */ React.createElement("span", { className: "ag-cat__label" }, label), /* @__PURE__ */ React.createElement(Icon, {
		name: "arrow-right",
		size: 16,
		className: "ag-cat__arrow"
	})), count && /* @__PURE__ */ React.createElement("span", { className: "ag-cat__count" }, count));
	if (href) return /* @__PURE__ */ React.createElement("a", {
		href,
		className: cx("ag-cat", className),
		onClick
	}, inner);
	return /* @__PURE__ */ React.createElement("button", {
		type: "button",
		className: cx("ag-cat", className),
		onClick
	}, inner);
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/CategoryCard/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/Field/Field.jsx
try { (() => {
const { cx } = __ds_scope;
// The ids and ARIA wiring every form control shares. The hint (or the error, which replaces it)
// sits outside the label and is linked with aria-describedby; an error also sets aria-invalid
// and aria-errormessage. Spread `controlProps` onto the control after any other props.
function useField({ id, hint, error, describedBy }) {
	const generatedId = React.useId();
	const fieldId = id || generatedId;
	const messageId = fieldId + "-hint";
	const message = error || hint;
	return {
		fieldId,
		messageId,
		message,
		controlProps: {
			"aria-invalid": error ? true : undefined,
			"aria-describedby": cx(message && messageId, describedBy) || undefined,
			"aria-errormessage": error ? messageId : undefined
		}
	};
}
// The hint or error under a control. Renders nothing without a message.
function FieldMessage({ id, error, children }) {
	if (!children) return null;
	return /* @__PURE__ */ React.createElement("span", {
		id,
		className: cx("ag-field__hint", error && "ag-field__hint--error")
	}, children);
}
Object.assign(__ds_scope, { useField, FieldMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Field/Field.jsx", error: String((e && e.message) || e) }); }

// components/Checkbox/Checkbox.jsx
try { (() => {
const { Checkbox: AriaCheckbox } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
// A checkbox on React Aria: the label is the whole target, and the state shows as data-selected,
// data-focus-visible and data-disabled on it. It takes the usual input props (checked,
// defaultChecked, disabled, required, name, value, onChange(event)); onChange gets an event whose
// target is the real checkbox, already set to its new state. With a hint or error, the pair is
// wrapped in .ag-field and the message is linked to the checkbox (see Field).
function Checkbox({ label, hint, error, disabled, required, checked, defaultChecked, onChange, name, value, id, className, style, "aria-describedby": describedBy, ...rest }) {
	const { messageId, message, controlProps } = useField({
		id,
		hint,
		error,
		describedBy
	});
	const inputRef = React.useRef(null);
	const box = /* @__PURE__ */ React.createElement(AriaCheckbox, {
		...rest,
		id,
		inputRef,
		name,
		value,
		isSelected: checked,
		defaultSelected: defaultChecked,
		isDisabled: disabled,
		isRequired: required,
		isInvalid: !!error,
		"aria-describedby": controlProps["aria-describedby"],
		onChange: () => onChange && onChange({
			target: inputRef.current,
			currentTarget: inputRef.current,
			type: "change"
		}),
		className: cx("ag-check ag-check--checkbox", error && "ag-check--error", disabled && "ag-check--disabled", !message && className),
		style: message ? undefined : style
	}, /* @__PURE__ */ React.createElement("span", { className: "ag-check__box" }, /* @__PURE__ */ React.createElement(Icon, {
		name: "check",
		size: 14
	})), label && /* @__PURE__ */ React.createElement("span", null, label));
	if (!message) return box;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-field ag-field--check", className),
		style
	}, box, /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Checkbox/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/Chip/Chip.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A filter chip: a toggle button (aria-pressed) that fills with ink when `selected`, with an
// optional remove icon (`onRemove`).
function Chip({ selected, onRemove, className = "", children, ...rest }) {
	return /* @__PURE__ */ React.createElement("button", {
		type: "button",
		"aria-pressed": !!selected,
		className: cx("ag-chip", selected && "ag-chip--selected", className),
		...rest
	}, children, onRemove && /* @__PURE__ */ React.createElement("span", {
		className: "ag-chip__x",
		onClick: (e) => {
			e.stopPropagation();
			onRemove();
		}
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "x",
		size: 14
	})));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Chip/Chip.jsx", error: String((e && e.message) || e) }); }

// components/utils/locale.js
try { (() => {
const { useLocale } = __ds_ns.__vendor["react-aria-components"];
// React Aria takes keyboard direction, number formatting and calendars from its locale, not from
// the page's dir. usePageLocale follows the page instead: attach `ref` to the component's outer
// element and wrap its React Aria parts in <I18nProvider locale={locale}>. The locale is the nearest
// `lang` (cards show English and Persian side by side), read once the element is in the page;
// before that, and without any `lang`, it is the app's own React Aria locale (an I18nProvider
// higher up, or the browser's language).
function usePageLocale() {
	const inherited = useLocale().locale;
	const [lang, setLang] = React.useState(() => typeof document !== "undefined" && document.documentElement.lang ? document.documentElement.lang : "");
	const ref = React.useRef(null);
	const useClientEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
	useClientEffect(() => {
		const owner = ref.current && ref.current.closest("[lang]");
		const found = owner && owner.getAttribute("lang") || "";
		if (found !== lang) setLang(found);
	});
	return {
		locale: lang || inherited,
		ref
	};
}
Object.assign(__ds_scope, { usePageLocale });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/locale.js", error: String((e && e.message) || e) }); }

// components/ChoiceGroup/ChoiceGroup.jsx
try { (() => {
const { I18nProvider, RadioGroup } = __ds_ns.__vendor["react-aria-components"];
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
const { usePageLocale } = __ds_scope;
// The tiles report themselves here: React Aria's RadioGroup holds one value, while each ChoiceTile
// says whether it is selected and what selecting it does.
const choiceGroupContext = React.createContext(null);
// A radiogroup of ChoiceTiles on React Aria: arrow keys move and select (mirrored in RTL, following
// the page's language), with one Tab stop. `legend` renders <fieldset><legend>; the hint or error
// sits under the tiles (see Field).
function ChoiceGroup({ label, labelledBy, legend, hint, error, id, columns, minTileWidth = 140, children, className, style }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error
	});
	const legendId = fieldId + "-legend";
	const { locale, ref } = usePageLocale();
	const tiles = React.useRef(new Map());
	const [selected, setSelected] = React.useState(null);
	const registry = React.useMemo(() => ({ report(value, tile) {
		if (tile) tiles.current.set(value, tile);
		else tiles.current.delete(value);
		const chosen = [...tiles.current].find(([, item]) => item.selected);
		setSelected(chosen ? chosen[0] : null);
	} }), []);
	const wrapped = !!(legend || message);
	const group = /* @__PURE__ */ React.createElement(choiceGroupContext.Provider, { value: registry }, /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(RadioGroup, {
		ref: wrapped ? undefined : ref,
		id: fieldId,
		value: selected,
		onChange: (value) => {
			const tile = tiles.current.get(value);
			tile && tile.onSelect && tile.onSelect();
		},
		"aria-label": legend ? undefined : label,
		"aria-labelledby": legend ? legendId : labelledBy,
		"aria-describedby": controlProps["aria-describedby"],
		"aria-errormessage": controlProps["aria-errormessage"],
		isInvalid: !!error,
		className: cx("ag-choices", error && "ag-choices--error", !wrapped && className),
		style: {
			gridTemplateColumns: columns ? "repeat(" + columns + ",minmax(0,1fr))" : "repeat(auto-fill,minmax(" + minTileWidth + "px,1fr))",
			...wrapped ? null : style
		}
	}, children)));
	if (!wrapped) return group;
	const hintElement = /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message);
	if (legend) return /* @__PURE__ */ React.createElement("fieldset", {
		ref,
		className: cx("ag-field ag-fieldset", className),
		style
	}, /* @__PURE__ */ React.createElement("legend", {
		id: legendId,
		className: "ag-field__label"
	}, legend), group, hintElement);
	return /* @__PURE__ */ React.createElement("div", {
		ref,
		className: cx("ag-field", className),
		style
	}, group, hintElement);
}
Object.assign(__ds_scope, { choiceGroupContext, ChoiceGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ChoiceGroup/ChoiceGroup.jsx", error: String((e && e.message) || e) }); }

// components/ChoiceGroup/ChoiceTile.jsx
try { (() => {
const { Radio, RadioGroup } = __ds_ns.__vendor["react-aria-components"];
const { choiceGroupContext } = __ds_scope;
const { cx } = __ds_scope;
// One selectable tile (a React Aria radio) inside a ChoiceGroup. The label alone names the tile; the
// description is read after it, so it never becomes part of the name.
function ChoiceTile({ label, description, selected, disabled, onSelect, size = "md", className = "", ...rest }) {
	const value = React.useId();
	const labelId = value + "-label";
	const descriptionId = value + "-desc";
	const group = React.useContext(choiceGroupContext);
	// Tell the group whether this tile is the selected one and what selecting it does.
	const latest = React.useRef(onSelect);
	latest.current = onSelect;
	React.useLayoutEffect(() => {
		if (!group) return;
		group.report(value, {
			selected: !!selected,
			onSelect: () => latest.current && latest.current()
		});
	}, [group, selected]);
	React.useLayoutEffect(() => () => group && group.report(value, null), [group]);
	const namedByLabel = description && label && !rest["aria-label"] && !rest["aria-labelledby"];
	const tile = /* @__PURE__ */ React.createElement(Radio, {
		...rest,
		value,
		isDisabled: disabled,
		"aria-labelledby": namedByLabel ? labelId : rest["aria-labelledby"],
		"aria-describedby": cx(description && descriptionId, rest["aria-describedby"]) || undefined,
		className: cx("ag-choice", "ag-choice--" + size, selected && "ag-choice--selected", className)
	}, /* @__PURE__ */ React.createElement("span", {
		id: labelId,
		className: "ag-choice__label"
	}, label), description && /* @__PURE__ */ React.createElement("span", {
		id: descriptionId,
		className: "ag-choice__desc"
	}, description));
	// A React Aria radio needs its group: a tile outside ChoiceGroup gets one of its own.
	if (group) return tile;
	return /* @__PURE__ */ React.createElement(RadioGroup, {
		"aria-labelledby": labelId,
		value: selected ? value : null,
		onChange: () => onSelect && onSelect()
	}, tile);
}
Object.assign(__ds_scope, { ChoiceTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ChoiceGroup/ChoiceTile.jsx", error: String((e && e.message) || e) }); }

// components/Input/Input.jsx
try { (() => {
const { Icon } = __ds_scope;
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
// A labelled text field (or textarea with `multiline`). The label text stays inside <label>;
// the hint or error sits under the control and is linked to it (see Field).
function Input({ label, hint, error, iconStart, multiline, disabled, id, className, style, "aria-describedby": describedBy, ...rest }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error,
		describedBy
	});
	const Control = multiline ? "textarea" : "input";
	// Clicking the padding around the control (or its icon) focuses the control.
	const focusControl = (event) => {
		if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
	};
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-field", className),
		style
	}, label && /* @__PURE__ */ React.createElement("label", {
		className: "ag-field__label",
		htmlFor: fieldId
	}, label), /* @__PURE__ */ React.createElement("span", {
		className: cx("ag-input", error && "ag-input--error", disabled && "ag-input--disabled"),
		onClick: focusControl
	}, iconStart && /* @__PURE__ */ React.createElement(Icon, {
		name: iconStart,
		size: 18
	}), /* @__PURE__ */ React.createElement(Control, {
		id: fieldId,
		disabled,
		...rest,
		...controlProps
	})), /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Input/Input.jsx", error: String((e && e.message) || e) }); }

// components/utils/commerce.js
try { (() => {
// Storefront commerce rules: import { commerce } (the runtime bundle also exposes window.AG_COMMERCE).
// Pure functions: every tenant value (zones, promo codes, balance rules, delivery schedule, API records)
// comes in as an argument, so a tenant storefront runs them on its own data from the Vendra API.
// Amounts are in Toman. No imports: storefront pages load this before the component bundle.
// Persian and Arabic digits → Latin.
const latin = (value) => String(value ?? "").replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
const persianDigits = (value) => String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
// A product code typed any way: case, spaces, dashes and digit scripts don't matter.
const normalizeCode = (text) => latin(text || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
// A promo code as entered: case, spaces and digit scripts don't matter.
const promoCode = (value) => latin(value || "").replace(/\s/g, "").toUpperCase();
const phone = (value) => latin(value || "").replace(/[\s()-]/g, "");
// An Iranian mobile number in its one stored form, 09xxxxxxxxx, however it was typed: 0912…, 912…,
// +98 912…, 98912… or 0098 912…, with Persian or Arabic digits, spaces, dashes, dots or brackets.
// '' when it isn't a mobile number (letters or other characters never pass).
const mobile = (value) => {
	const text = latin(value || "").trim();
	if (!text || /[^\d\s+().-]/.test(text)) return "";
	let digits = text.replace(/\D/g, "");
	if (digits.startsWith("0098")) digits = digits.slice(4);
	else if (digits.startsWith("98") && digits.length === 12) digits = digits.slice(2);
	if (/^9\d{9}$/.test(digits)) digits = "0" + digits;
	return /^09\d{9}$/.test(digits) ? digits : "";
};
const isMobile = (value) => mobile(value) !== "";
const validLocation = (location) => !!location && Number.isFinite(location.lat) && Number.isFinite(location.lng) && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180;
// A map point rounded to six decimals (about 10 cm): enough for a front door, and tidy in stored orders.
const pinLocation = (point) => {
	const round = (value) => Math.round(value * 1e6) / 1e6;
	return {
		lat: round(point.lat),
		lng: round(point.lng)
	};
};
const distanceKm = (a, b) => {
	const rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
	return 12742 * Math.asin(Math.sqrt(h));
};
// The smallest zone that reaches a pin, measured from the zone's center or `origin` (the studio);
// null when the pin is outside every zone. Zones are {id, km, center?}.
const zoneAt = (location, zones, origin) => {
	if (!validLocation(location)) return null;
	const reach = zones.filter((zone) => distanceKm(zone.center || origin, location) <= zone.km);
	return reach.length ? reach.reduce((a, b) => b.km < a.km ? b : a).id : null;
};
const isoDate = (date) => date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
// A cut-off time ("18:00") for a sentence; Persian digits, isolated so it stays left to right.
const cutoffText = (cutoff, persian) => persian ? "⁨" + persianDigits(cutoff) + "⁩" : cutoff;
// The next `days` days for a zone's cut-off, each marked sold out or past today's cut-off.
const deliveryDays = (cutoff, { days, soldOutDates = [] }, now = new Date()) => {
	const [hour, minute] = cutoff.split(":").map(Number);
	const pastCutoff = now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute;
	return Array.from({ length: days }, (_, offset) => {
		const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, 12);
		const iso = isoDate(date);
		return {
			iso,
			date,
			offset,
			soldOut: soldOutDates.includes(iso),
			pastCutoff: offset === 0 && pastCutoff
		};
	});
};
// The chosen day when it is still open, otherwise the first open day (undefined when none is).
const openDay = (days, chosen) => {
	const open = days.filter((day) => !day.soldOut && !day.pastCutoff);
	return (open.find((day) => day.iso === chosen) || open[0] || {}).iso;
};
// Every slot ({start, end} hours) on a day, each marked closed when it is today and fewer than
// `leadMinutes` remain before it ends.
const deliverySlots = (iso, slots, leadMinutes, now = new Date()) => {
	const today = iso === isoDate(now), minutes = now.getHours() * 60 + now.getMinutes();
	return slots.map(({ start, end }) => ({
		start,
		end,
		closed: today && minutes > Number(end) * 60 - leadMinutes
	}));
};
// The chosen slot's start when it is open, otherwise the first open slot's.
const openSlot = (slots, chosen) => {
	const open = slots.filter((slot) => !slot.closed);
	return (open.find((slot) => slot.start === chosen) || open[0] || { start: chosen }).start;
};
// Free delivery: the subtotal reaches `threshold` in one of `zones`.
const freeDelivery = (zoneId, subtotal, rules) => !!rules && subtotal >= rules.threshold && rules.zones.includes(zoneId);
// Promo codes are {code, percent, min}. {promo} when the code applies, otherwise {error, min?}.
const promoCheck = (value, subtotal, promos) => {
	const promo = promos.find((item) => item.code === promoCode(value));
	if (!promo) return { error: "unknown" };
	if (subtotal < promo.min) return {
		error: "min",
		min: promo.min
	};
	return { promo };
};
// The discount a code gives; 0 when it doesn't apply.
const discount = (code, subtotal, promos) => {
	const { promo } = code ? promoCheck(code, subtotal, promos) : {};
	return promo ? Math.round(subtotal * promo.percent / 100) : 0;
};
// Balance rules are {discountFrom, discountPercent}: paying from a balance of at least discountFrom
// takes discountPercent off the products.
const balanceDiscountOn = (balance, rules) => !!rules && balance != null && balance >= rules.discountFrom;
const balanceDiscount = (balance, products, rules) => balanceDiscountOn(balance, rules) ? Math.round(products * rules.discountPercent / 100) : 0;
// An order's totals. Lines are {unit, qty}; `zone` is {id, fee}; `promo` is the applied code and
// `balance` the balance paid from (null otherwise). Rules: {freeDelivery, promos, wallet}.
const totals = (lines, { zone, promo, balance = null }, rules) => {
	const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
	const fee = freeDelivery(zone.id, sub, rules.freeDelivery) ? 0 : zone.fee;
	const promoDiscount = discount(promo, sub, rules.promos || []);
	const fromBalance = balanceDiscount(balance, sub - promoDiscount, rules.wallet);
	return {
		sub,
		fee,
		discount: promoDiscount,
		...fromBalance ? {
			balanceDiscount: fromBalance,
			balancePercent: rules.wallet.discountPercent
		} : {},
		total: sub - promoDiscount - fromBalance + fee
	};
};
// Order summary rows; discounts sit under the subtotal. labels.balanceDiscount reads like
// 'Balance discount · {percent}%'.
const summaryRows = (result, code, labels, money, num = String) => [
	{
		label: labels.sub,
		value: money(result.sub)
	},
	...result.discount ? [{
		label: labels.discount + " · " + promoCode(code),
		value: "−⁨" + money(result.discount) + "⁩"
	}] : [],
	...result.balanceDiscount ? [{
		label: (labels.balanceDiscount || "Balance discount · {percent}%").replace("{percent}", num(result.balancePercent)),
		value: "−⁨" + money(result.balanceDiscount) + "⁩"
	}] : [],
	{
		label: labels.fee,
		value: result.fee ? money(result.fee) : labels.free
	},
	{
		label: labels.total,
		value: money(result.total),
		strong: true
	}
];
// "Show more" paging: the first `page` pages of `size` items (page 1 = the first page). `total`
// defaults to the list's length; pass the API's total when the list holds only the pages loaded so far.
const page = (list, current, size, total = list.length) => {
	const pages = Math.max(1, Math.floor(Number(current)) || 1);
	const shown = Math.min(total, pages * size);
	return {
		items: list.slice(0, shown),
		page: pages,
		shown,
		total,
		hasMore: shown < total
	};
};
// Fills placeholders in text from the API: {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}.
// `values` gives each one's text: {fee(zoneId), cutoff(zoneId), freeDeliveryFrom()}.
const fillText = (text, values) => String(text || "").replace(/\{fee:([\w-]+)\}/g, (_, id) => values.fee(id)).replace(/\{cutoff:([\w-]+)\}/g, (_, id) => values.cutoff(id)).replace(/\{freeDeliveryFrom\}/g, () => values.freeDeliveryFrom());
// An API record by its IRI (e.g. /api/catalog/product-prices/201) from a list of records.
const apiRecord = (list, iri) => {
	const id = Number(String(iri || "").split("/").pop());
	return list.find((record) => record.id === id) || null;
};
// A storefront product from an API Product, resolved against its prices, photos and categories.
// `extras` holds storefront fields the API doesn't have yet, keyed by Product.token.
const productFromApi = (product, { prices, media, categories, extras = {}, placeholder }) => {
	const extra = extras[product.token] || {};
	const price = apiRecord(prices, product.latestProductPrice);
	const category = categories.find((item) => item.id === product.productCategory.id);
	const images = product.multimedia.map((iri) => apiRecord(media, iri)).map((record) => record && record.url).filter(Boolean);
	const { badge, ...flags } = extra;
	const words = (lang) => ({
		sub: product.name[lang] || "",
		...badge && badge[lang] ? { badge: badge[lang] } : {}
	});
	return {
		id: product.token,
		apiId: product.id,
		...flags,
		occasions: extra.occasions || [],
		cat: category ? category.slug.en : "",
		...product.inStock ? {} : { inStock: false },
		price: price ? price.amount : null,
		image: images[0] || placeholder,
		images: images.length ? images : [placeholder],
		en: words("en"),
		fa: words("fa")
	};
};
// A storefront zone from an API DeliveryZone; `extras` by zone id: {key, cutoff, center}.
const zoneFromApi = (zone, extras = {}) => {
	const extra = extras[zone.id] || {};
	return {
		id: extra.key || String(zone.id),
		apiId: zone.id,
		fee: zone.feeAmount,
		cutoff: extra.cutoff || "00:00",
		km: zone.maxDistanceKm,
		...extra.center ? { center: extra.center } : {},
		en: zone.name.en,
		fa: zone.name.fa
	};
};
// A bag line from an API OrderLine. Its metadata carries `token`, `size`, comma-separated `addons`
// and `cardMessage`, matched against `sizes` and `addons` ({id, …}); `describe(product, size, addons,
// lang)` writes the line's detail text.
const lineFromApi = (line, { products, sizes, addons, placeholder, describe }) => {
	const product = products.find((item) => item.apiId === line.sellableId);
	const meta = line.metadata || {};
	const token = meta.token || (product ? product.id : line.name);
	const size = meta.size || null;
	const chosen = (meta.addons || "").split(",").filter(Boolean);
	const sizeChoice = sizes.find((item) => item.id === size) || null;
	const addonChoices = addons.filter((item) => chosen.includes(item.id));
	const productId = product ? product.id : token;
	return {
		id: productId + (size ? "-" + size : "") + (chosen.length ? "-" + chosen.join("+") : ""),
		productId,
		token,
		size,
		addons: chosen,
		unit: line.unitAmount,
		qty: line.quantity,
		image: product ? product.image : placeholder,
		...meta.cardMessage ? { card: meta.cardMessage } : {},
		en: [token, product ? describe(product, sizeChoice, addonChoices, "en") : ""],
		fa: [token, product ? describe(product, sizeChoice, addonChoices, "fa") : ""]
	};
};
// API order statuses under the storefront's step names.
const ORDER_STATUS = {
	placed: "received",
	arranging: "preparing",
	ready: "preparing",
	out_for_delivery: "onTheWay"
};
// A storefront order from an API Order. `line` turns each OrderLine into a bag line; `delivery`,
// `method` and `preferredLocale` are what Order doesn't carry yet.
const orderFromApi = (order, { line, delivery, method, preferredLocale }) => ({
	id: order.number,
	status: ORDER_STATUS[order.status] || order.status,
	lines: order.lines.map(line),
	delivery,
	totals: {
		sub: order.itemsAmount,
		fee: order.deliveryAmount,
		discount: order.itemsAmount + order.deliveryAmount - order.totalAmount,
		total: order.totalAmount
	},
	method,
	last4: order.paymentReference,
	preferredLocale
});
// The Checkout request (POST /api/sales/checkout) for bag lines and delivery details. `slots` are the
// schedule's DeliverySlots; `lineToken(line)` names a line in a combined card message.
const checkoutRequest = (lines, delivery, { slots, currencyCode = "IRT", deliveryDate = delivery.date, lineToken = (line) => line.token, method = "card", last4 = "", ref = "", cartToken = "" }) => {
	const cards = lines.filter((line) => String(line.card || "").trim());
	const slot = slots.find((item) => item.startsAt.slice(0, 2) === String(delivery.slot).padStart(2, "0"));
	const location = validLocation(delivery.location) ? delivery.location : null;
	return {
		cartToken,
		currencyCode,
		gateway: method,
		paymentReference: method === "card" ? [last4, ref].filter(Boolean).join(" ") || null : null,
		cardMessage: cards.length === 1 ? cards[0].card : cards.map((line) => lineToken(line) + ": " + line.card).join("\n") || null,
		recipientName: delivery.name || null,
		addressId: null,
		latitude: location ? location.lat : null,
		longitude: location ? location.lng : null,
		deliveryDate: deliveryDate || null,
		deliverySlotId: slot ? slot.id : null
	};
};
const commerce = {
	latin,
	normalizeCode,
	promoCode,
	phone,
	mobile,
	isMobile,
	validLocation,
	pinLocation,
	distanceKm,
	zoneAt,
	isoDate,
	cutoffText,
	deliveryDays,
	openDay,
	deliverySlots,
	openSlot,
	freeDelivery,
	promoCheck,
	discount,
	balanceDiscountOn,
	balanceDiscount,
	totals,
	summaryRows,
	page,
	fillText,
	apiRecord,
	productFromApi,
	zoneFromApi,
	lineFromApi,
	ORDER_STATUS,
	orderFromApi,
	checkoutRequest
};
Object.assign(__ds_scope, { commerce });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/commerce.js", error: String((e && e.message) || e) }); }

// components/CodeInput/CodeInput.jsx
try { (() => {
const { Input } = __ds_scope;
const { commerce } = __ds_scope;
const { cx } = __ds_scope;
// A one-time code field, such as the sign-in code sent by SMS: one input (screen readers and SMS
// autofill handle it better than a box per digit), digits only, Persian digits accepted.
// `onValueChange` gets the cleaned code; `onComplete` runs once it has `length` digits (the form
// decides whether to submit, so nothing changes on input unless it asks for it).
function CodeInput({ length = 5, value, onChange, onValueChange, onComplete, className, ...rest }) {
	const change = (event) => {
		onChange && onChange(event);
		const code = commerce.latin(event.target.value).replace(/\D/g, "").slice(0, length);
		onValueChange && onValueChange(code);
		if (onComplete && code.length === length && code !== value) onComplete(code);
	};
	return /* @__PURE__ */ React.createElement(Input, {
		className: cx("ag-code-input", className),
		inputMode: "numeric",
		autoComplete: "one-time-code",
		dir: "ltr",
		maxLength: length,
		value,
		onChange: change,
		...rest
	});
}
Object.assign(__ds_scope, { CodeInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/CodeInput/CodeInput.jsx", error: String((e && e.message) || e) }); }

// components/utils/dates.js
try { (() => {
// Jalali (Shamsi) / Gregorian date helpers: import { dates } (the runtime bundle also exposes window.AG_DATES).
// Always pass explicit locales: 'fa-IR-u-ca-persian', 'fa-IR-u-ca-gregory', 'en-GB', 'en-GB-u-ca-persian' (see locale()).
const div = (a, b) => Math.floor(a / b);
const noon = (d) => {
	const x = new Date(d);
	x.setHours(12, 0, 0, 0);
	return x;
};
// Jalali → Gregorian — jdf 33-year-cycle algorithm. Returns a local Date at 12:00 (DST-safe).
const j2g = (jy, jm, jd) => {
	jy += 1595;
	let days = -355668 + 365 * jy + div(jy, 33) * 8 + div(jy % 33 + 3, 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
	let gy = 400 * div(days, 146097);
	days %= 146097;
	if (days > 36524) {
		gy += 100 * div(--days, 36524);
		days %= 36524;
		if (days >= 365) days++;
	}
	gy += 4 * div(days, 1461);
	days %= 1461;
	if (days > 365) {
		gy += div(days - 1, 365);
		days = (days - 1) % 365;
	}
	let gd = days + 1;
	const sal = [
		0,
		31,
		gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0 ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	let gm;
	for (gm = 0; gm < 13 && gd > sal[gm]; gm++) gd -= sal[gm];
	return new Date(gy, gm - 1, gd, 12);
};
const JF = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
	year: "numeric",
	month: "numeric",
	day: "numeric"
});
// Gregorian Date → [jy, jm, jd]
const g2j = (date) => {
	const p = JF.formatToParts(date);
	const g = (t) => parseInt((p.find((x) => x.type === t) || {}).value, 10);
	return [
		g("year"),
		g("month"),
		g("day")
	];
};
const jYear = (date) => g2j(date)[0];
const same = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const isJLeap = (y) => !same(j2g(y, 12, 30), j2g(y + 1, 1, 1));
const daysInMonth = (cal, y, m) => cal === "j" ? m <= 6 ? 31 : m <= 11 ? 30 : isJLeap(y) ? 30 : 29 : new Date(y, m, 0).getDate();
// cal 'j' | 'g' → Date / [y,m,d]
const toDate = (cal, y, m, d) => cal === "j" ? j2g(y, m, d) : new Date(y, m - 1, d, 12);
const parts = (cal, date) => cal === "j" ? g2j(date) : [
	date.getFullYear(),
	date.getMonth() + 1,
	date.getDate()
];
const yearOf = (cal, date) => parts(cal, date)[0];
const iso = (date) => date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
const fromIso = (s) => {
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
	return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null;
};
const daysBetween = (a, b) => Math.round((noon(b) - noon(a)) / 864e5);
// Next occurrence of a yearly date ({cal:'j'|'g', m, d}), today included. Day clamps (Esfand 30 → 29, 29 Feb → 28).
const nextYearly = ({ cal = "j", m, d }, today = new Date()) => {
	const t = noon(today);
	let y = yearOf(cal, t);
	for (let i = 0; i < 2; i++) {
		const date = toDate(cal, y, m, Math.min(d, daysInMonth(cal, y, m)));
		if (date >= t) return {
			date,
			days: daysBetween(t, date)
		};
		y++;
	}
	const date = toDate(cal, y, m, Math.min(d, daysInMonth(cal, y, m)));
	return {
		date,
		days: daysBetween(t, date)
	};
};
// Next Hijri (lunar) month/day — Umm al-Qura arithmetic. Iran's official date can differ by a day: let the store pass the real one (the templates' VF_STORE.occasionDates).
const HF = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura-nu-latn", {
	month: "numeric",
	day: "numeric"
});
const nextHijri = (hm, hd, today = new Date()) => {
	const t = noon(today);
	for (let i = 0; i < 400; i++) {
		const x = new Date(t);
		x.setDate(t.getDate() + i);
		const p = HF.formatToParts(x);
		const g = (k) => +(p.find((q) => q.type === k) || {}).value;
		if (g("month") === hm && g("day") === hd) return {
			date: x,
			days: i
		};
	}
	return null;
};
const locale = (lang, cal) => lang === "fa" ? cal === "g" ? "fa-IR-u-ca-gregory" : "fa-IR-u-ca-persian" : cal === "j" ? "en-GB-u-ca-persian" : "en-GB";
const calOf = (loc) => /ca-persian/.test(loc) || /^fa/.test(loc) && !/ca-gregory/.test(loc) ? "j" : "g";
const clean = (s) => s.replace(/\s*AP$/, "").replace(/\s+/g, " ").trim();
const JM = {
	en: [
		"Farvardin",
		"Ordibehesht",
		"Khordad",
		"Tir",
		"Mordad",
		"Shahrivar",
		"Mehr",
		"Aban",
		"Azar",
		"Dey",
		"Bahman",
		"Esfand"
	],
	fa: [
		"فروردین",
		"اردیبهشت",
		"خرداد",
		"تیر",
		"مرداد",
		"شهریور",
		"مهر",
		"آبان",
		"آذر",
		"دی",
		"بهمن",
		"اسفند"
	]
};
const monthNames = (cal, lang) => cal === "j" ? JM[lang === "fa" ? "fa" : "en"].slice() : Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale(lang, "g"), { month: "long" }).format(new Date(2026, i, 15, 12)));
const FA_D = "۰۱۲۳۴۵۶۷۸۹";
const digits = (n, lang) => lang === "fa" ? String(n).replace(/[0-9]/g, (d) => FA_D[d]) : String(n);
// "7 Mehr" / "۷ مهر" — built from our own month names so en-GB-u-ca-persian never drifts.
const dayMonth = (date, loc) => {
	const fa = /^fa/.test(loc);
	const cal = calOf(loc);
	if (cal === "j") {
		const [, m, d] = g2j(date);
		return digits(d, fa ? "fa" : "en") + " " + JM[fa ? "fa" : "en"][m - 1];
	}
	return clean(new Intl.DateTimeFormat(loc, {
		day: "numeric",
		month: "long"
	}).format(date));
};
// Full date. fa never asks Intl for weekday + year together (Chrome returns "۱۴۰۵ مهر ۷, سه‌شنبه"):
// it is built as weekday + '، ' + "day month year" → «سه‌شنبه، ۷ مهر ۱۴۰۵».
const fullDate = (date, loc = "en-GB", withWeekday = false) => {
	if (!date) return "";
	const fa = /^fa/.test(loc);
	const cal = calOf(loc);
	let dmy;
	if (cal === "j") {
		const [y, m, d] = g2j(date);
		const L = fa ? "fa" : "en";
		dmy = digits(d, L) + " " + JM[L][m - 1] + " " + digits(y, L);
	} else dmy = clean(new Intl.DateTimeFormat(loc, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date));
	if (!withWeekday) return dmy;
	const wd = new Intl.DateTimeFormat(fa ? "fa-IR" : "en-GB", { weekday: "long" }).format(date);
	return wd + (fa ? "، " : ", ") + dmy;
};
const dates = {
	j2g,
	g2j,
	jYear,
	isJLeap,
	daysInMonth,
	toDate,
	parts,
	yearOf,
	iso,
	fromIso,
	daysBetween,
	nextYearly,
	nextHijri,
	locale,
	fullDate,
	dayMonth,
	monthNames,
	digits
};
Object.assign(__ds_scope, { dates });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/dates.js", error: String((e && e.message) || e) }); }

// components/Select/Select.jsx
try { (() => {
const { Icon } = __ds_scope;
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
// A labelled native <select>. Options are strings or {value, label, disabled}.
// A group picker (DatePicker) can own the message: it passes aria-invalid, aria-errormessage
// and aria-describedby itself, with no hint or error here.
function Select({ label, hint, error, options = [], placeholder, disabled, id, className, style, "aria-describedby": describedBy, ...rest }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error,
		describedBy
	});
	const invalid = !!error || rest["aria-invalid"] === true || rest["aria-invalid"] === "true";
	const focusControl = (event) => {
		if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
	};
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-field", className),
		style
	}, label && /* @__PURE__ */ React.createElement("label", {
		className: "ag-field__label",
		htmlFor: fieldId
	}, label), /* @__PURE__ */ React.createElement("span", {
		className: cx("ag-input", invalid && "ag-input--error", disabled && "ag-input--disabled"),
		onClick: focusControl
	}, /* @__PURE__ */ React.createElement("select", {
		id: fieldId,
		disabled,
		...rest,
		...controlProps,
		"aria-invalid": invalid || undefined,
		"aria-errormessage": error ? messageId : rest["aria-errormessage"]
	}, placeholder && /* @__PURE__ */ React.createElement("option", { value: "" }, placeholder), options.map((option) => typeof option === "string" ? /* @__PURE__ */ React.createElement("option", {
		key: option,
		value: option
	}, option) : /* @__PURE__ */ React.createElement("option", {
		key: option.value,
		value: option.value,
		disabled: option.disabled
	}, option.label))), /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-down",
		size: 16,
		className: "ag-input__chev"
	})), /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Select/Select.jsx", error: String((e && e.message) || e) }); }

// components/Tabs/Tabs.jsx
try { (() => {
const { cx } = __ds_scope;
// role="tablist" with a roving tabindex: only the selected tab is in the Tab order; ←/→ (mirrored in RTL), Home and End move and select.
// With idPrefix, tabs get ids `${idPrefix}-tab-${id}` and the selected tab points at its panel `${idPrefix}-panel-${id}` (render that panel with role="tabpanel").
function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", label, idPrefix, className = "" }) {
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? items[0]?.id);
	const selectedId = value ?? uncontrolledValue;
	const tabRefs = React.useRef([]);
	const select = (id) => {
		if (value === undefined) setUncontrolledValue(id);
		onChange && onChange(id);
	};
	const onKeyDown = (event, index) => {
		const count = items.length;
		if (!count) return;
		const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
		let target = null;
		if (event.key === "ArrowRight") target = rtl ? index - 1 : index + 1;
		else if (event.key === "ArrowLeft") target = rtl ? index + 1 : index - 1;
		else if (event.key === "Home") target = 0;
		else if (event.key === "End") target = count - 1;
		if (target === null) return;
		event.preventDefault();
		target = (target + count) % count;
		tabRefs.current[target] && tabRefs.current[target].focus();
		select(items[target].id);
	};
	// The Tab stop: the selected tab, or the first when the value matches none.
	const focusableId = items.some((item) => item.id === selectedId) ? selectedId : items[0]?.id;
	return /* @__PURE__ */ React.createElement("div", {
		role: "tablist",
		"aria-label": label,
		className: cx("ag-tabs", variant === "pill" && "ag-tabs--pill", className)
	}, items.map((item, i) => /* @__PURE__ */ React.createElement("button", {
		key: item.id,
		ref: (element) => tabRefs.current[i] = element,
		role: "tab",
		type: "button",
		id: idPrefix ? idPrefix + "-tab-" + item.id : undefined,
		"aria-controls": idPrefix && focusableId === item.id ? idPrefix + "-panel-" + item.id : undefined,
		"aria-selected": selectedId === item.id,
		tabIndex: focusableId === item.id ? 0 : -1,
		className: cx("ag-tab", selectedId === item.id && "ag-tab--active"),
		onClick: () => select(item.id),
		onKeyDown: (event) => onKeyDown(event, i)
	}, item.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/DatePicker/DatePicker.jsx
try { (() => {
const { dates } = __ds_scope;
const { Select } = __ds_scope;
const { Tabs } = __ds_scope;
const { FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
const DEFAULT_LABELS = {
	en: {
		jalali: "Shamsi",
		gregorian: "Gregorian",
		year: "Year",
		month: "Month",
		day: "Day",
		equivalent: "That’s {date}"
	},
	fa: {
		jalali: "شمسی",
		gregorian: "میلادی",
		year: "سال",
		month: "ماه",
		day: "روز",
		equivalent: "برابر با {date}"
	}
};
// Longest Gregorian months, for a yearly date that has no year to check against.
const GREGORIAN_MAX_DAYS = [
	31,
	29,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];
// Year / month / day selects in Jalali (Shamsi, 'j') or Gregorian ('g'), with a calendar toggle.
// `value` is an ISO date ("2026-10-08"), or with `yearly` a recurring {cal, m, d} with no year.
// Under the selects it shows the same date in the other calendar.
function DatePicker({ label, value, onChange, calendar, onCalendarChange, calendars = ["j", "g"], yearly = false, years = 3, minDate, hint, error, lang = "en", labels, showEquivalent = true, disabled, id, className = "", style }) {
	const text = {
		...DEFAULT_LABELS[lang === "fa" ? "fa" : "en"],
		...labels
	};
	const generatedId = React.useId();
	const fieldId = id || "dp" + generatedId.replace(/:/g, "");
	const messageId = fieldId + "-hint";
	const message = error || hint;
	const preferredCalendar = lang === "fa" ? "j" : "g";
	const [uncontrolledCalendar, setUncontrolledCalendar] = React.useState(() => yearly && value && value.cal || (calendars.includes(preferredCalendar) ? preferredCalendar : calendars[0]));
	React.useEffect(() => {
		if (yearly && !calendar && value && value.cal && value.cal !== uncontrolledCalendar) setUncontrolledCalendar(value.cal);
	}, [yearly && value && value.cal]);
	const activeCalendar = calendar || uncontrolledCalendar;
	const today = new Date();
	// The current value as {year, month, day} in calendar `cal` (no year when yearly).
	const partsFromValue = (cal) => {
		if (!value) return null;
		if (yearly) {
			if (!value.m || !value.d) return null;
			const valueCalendar = value.cal || "j";
			if (valueCalendar === cal) return {
				month: value.m,
				day: value.d
			};
			const thisYear = dates.yearOf(valueCalendar, today);
			const lastDay = dates.daysInMonth(valueCalendar, thisYear, value.m);
			const date = dates.toDate(valueCalendar, thisYear, value.m, Math.min(value.d, lastDay));
			const [, month, day] = dates.parts(cal, date);
			return {
				month,
				day
			};
		}
		const date = dates.fromIso(value);
		if (!date) return null;
		const [year, month, day] = dates.parts(cal, date);
		return {
			year,
			month,
			day
		};
	};
	const valueKey = yearly ? value ? (value.cal || "j") + value.m + "-" + value.d : "" : value || "";
	const [draft, setDraft] = React.useState(() => partsFromValue(activeCalendar) || {});
	React.useEffect(() => {
		setDraft(partsFromValue(activeCalendar) || {});
	}, [valueKey, activeCalendar]);
	const daysIn = ({ year, month }) => {
		if (!month) return 31;
		if (!yearly && year) return dates.daysInMonth(activeCalendar, year, month);
		if (activeCalendar === "j") return month <= 6 ? 31 : 30;
		return GREGORIAN_MAX_DAYS[month - 1];
	};
	const emit = (next) => {
		if (!onChange) return;
		if (yearly) {
			if (next.month && next.day) onChange({
				cal: activeCalendar,
				m: next.month,
				d: next.day
			});
		} else if (next.year && next.month && next.day) {
			onChange(dates.iso(dates.toDate(activeCalendar, next.year, next.month, next.day)));
		}
	};
	// Changing year or month clamps the day (Mehr 30 → Esfand 1404 = 29). Never rolls over into the next month.
	const onPartChange = (part) => (event) => {
		const selected = event.target.value;
		const next = {
			...draft,
			[part]: selected ? +selected : undefined
		};
		if (next.day && next.month) next.day = Math.min(next.day, daysIn(next));
		setDraft(next);
		emit(next);
	};
	const switchCalendar = (cal) => {
		if (cal === activeCalendar) return;
		if (!calendar) setUncontrolledCalendar(cal);
		onCalendarChange && onCalendarChange(cal);
		if (yearly && draft.month && draft.day && onChange) {
			const thisYear = dates.yearOf(activeCalendar, today);
			const lastDay = dates.daysInMonth(activeCalendar, thisYear, draft.month);
			const date = dates.toDate(activeCalendar, thisYear, draft.month, Math.min(draft.day, lastDay));
			const [, month, day] = dates.parts(cal, date);
			onChange({
				cal,
				m: month,
				d: day
			});
		}
	};
	const earliest = minDate ? dates.fromIso(minDate) : null;
	const firstYear = dates.yearOf(activeCalendar, earliest && earliest > today ? earliest : today);
	let yearOptions = Array.from({ length: years }, (_, i) => firstYear + i);
	if (draft.year && !yearOptions.includes(draft.year)) yearOptions = [...yearOptions, draft.year].sort((a, b) => a - b);
	const monthNames = dates.monthNames(activeCalendar, lang);
	const localDigits = (n) => dates.digits(n, lang);
	const monthBeforeMin = (month) => !!(earliest && draft.year && dates.toDate(activeCalendar, draft.year, month, dates.daysInMonth(activeCalendar, draft.year, month)) < earliest);
	const dayBeforeMin = (day) => !!(earliest && draft.year && draft.month && dates.toDate(activeCalendar, draft.year, draft.month, day) < earliest);
	const complete = yearly ? draft.month && draft.day : draft.year && draft.month && draft.day;
	const otherCalendar = calendars.find((cal) => cal !== activeCalendar);
	let equivalent = "";
	if (showEquivalent && otherCalendar && complete) {
		const date = yearly ? dates.nextYearly({
			cal: activeCalendar,
			m: draft.month,
			d: draft.day
		}).date : dates.toDate(activeCalendar, draft.year, draft.month, draft.day);
		equivalent = text.equivalent.replace("{date}", dates.fullDate(date, dates.locale(lang, otherCalendar), false));
	}
	const describedBy = message ? messageId : undefined;
	return /* @__PURE__ */ React.createElement("fieldset", {
		className: cx("ag-fieldset", "ag-date", className),
		style,
		disabled
	}, /* @__PURE__ */ React.createElement("legend", { className: "ag-date__legend" }, label && /* @__PURE__ */ React.createElement("span", { className: "ag-field__label" }, label), calendars.length > 1 && /* @__PURE__ */ React.createElement(Tabs, {
		variant: "pill",
		className: "ag-date__cal",
		items: calendars.map((cal) => ({
			id: cal,
			label: cal === "j" ? text.jalali : text.gregorian
		})),
		value: activeCalendar,
		onChange: switchCalendar
	})), /* @__PURE__ */ React.createElement("div", { className: cx("ag-date__grid", yearly && "ag-date__grid--yearly") }, !yearly && /* @__PURE__ */ React.createElement(Select, {
		id: fieldId + "-y",
		label: text.year,
		value: draft.year ? String(draft.year) : "",
		placeholder: draft.year ? undefined : "—",
		onChange: onPartChange("year"),
		"aria-describedby": describedBy,
		options: yearOptions.map((year) => ({
			value: String(year),
			label: localDigits(year)
		}))
	}), /* @__PURE__ */ React.createElement(Select, {
		id: fieldId + "-m",
		label: text.month,
		value: draft.month ? String(draft.month) : "",
		placeholder: draft.month ? undefined : "—",
		onChange: onPartChange("month"),
		"aria-describedby": describedBy,
		options: monthNames.map((name, i) => ({
			value: String(i + 1),
			label: name,
			disabled: monthBeforeMin(i + 1)
		}))
	}), /* @__PURE__ */ React.createElement(Select, {
		id: fieldId + "-d",
		label: text.day,
		value: draft.day ? String(draft.day) : "",
		placeholder: draft.day ? undefined : "—",
		onChange: onPartChange("day"),
		"aria-describedby": describedBy,
		"aria-invalid": error ? true : undefined,
		"aria-errormessage": error ? messageId : undefined,
		options: Array.from({ length: daysIn(draft) }, (_, i) => ({
			value: String(i + 1),
			label: localDigits(i + 1),
			disabled: dayBeforeMin(i + 1)
		}))
	})), /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message), showEquivalent && otherCalendar && /* @__PURE__ */ React.createElement("p", {
		className: "ag-date__eq",
		"aria-live": "polite"
	}, equivalent));
}
Object.assign(__ds_scope, { DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/DatePicker/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/DetailList/DetailList.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// Label / value pairs as a <dl>. Icons are decorative (aria-hidden) in --text-accent; values wrap anywhere (long addresses, references).
function DetailList({ rows = [], className = "", style }) {
	return /* @__PURE__ */ React.createElement("dl", {
		className: cx("ag-dl", className),
		style
	}, rows.filter(Boolean).map((row, i) => /* @__PURE__ */ React.createElement("div", {
		key: i,
		className: cx("ag-dl__row", row.icon && "ag-dl__row--icon")
	}, /* @__PURE__ */ React.createElement("dt", { className: "ag-dl__label" }, row.icon && /* @__PURE__ */ React.createElement(Icon, {
		name: row.icon,
		size: 18,
		className: "ag-dl__icon"
	}), row.label), /* @__PURE__ */ React.createElement("dd", { className: "ag-dl__value" }, row.value))));
}
Object.assign(__ds_scope, { DetailList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/DetailList/DetailList.jsx", error: String((e && e.message) || e) }); }

// components/Dialog/Dialog.jsx
try { (() => {
const { Dialog: AriaDialog, Heading, Modal, ModalOverlay } = __ds_ns.__vendor["react-aria-components"];
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
const FOCUSABLE = "a[href],area[href],button:not([disabled]),input:not([disabled]):not([type=\"hidden\"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex=\"-1\"]),[contenteditable=\"true\"]";
// The head (title + close) and body shared by the modal and inline forms.
function Content({ title, titleId, onClose, closeLabel, footer, children, heading }) {
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "ag-dialog__head" }, heading ? heading : /* @__PURE__ */ React.createElement("h2", {
		id: titleId,
		className: "ag-dialog__title"
	}, title), onClose && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "x",
		label: closeLabel,
		size: "sm",
		onClick: onClose
	})), /* @__PURE__ */ React.createElement("div", { className: "ag-dialog__body" }, children), footer && /* @__PURE__ */ React.createElement("div", { className: "ag-dialog__foot" }, footer));
}
// A modal dialog on React Aria: role="dialog" + aria-modal, labelled by its title. While open, the
// page behind is hidden from screen readers and can't scroll, focus stays inside, Esc and a click
// outside close it (when there is onClose), and focus returns to the opener. `inline` previews sit
// inside their parent instead, without moving focus or locking the page (several can share a card).
function Dialog({ open, onClose, title, children, footer, inline, closeLabel = "Close", maxWidth, initialFocus, placement = "center" }) {
	const titleId = React.useId();
	const dialogRef = React.useRef(null);
	const sheet = placement === "start";
	const overlayClass = cx("ag-dialog__overlay", inline && "ag-dialog__overlay--inline", sheet && "ag-dialog__overlay--sheet");
	const dialogClass = cx("ag-dialog", sheet && "ag-dialog--sheet");
	const style = maxWidth ? { maxWidth } : undefined;
	// First focus: the initialFocus selector, else the first control outside the head, else the close button.
	React.useEffect(() => {
		if (!open || inline) return;
		const dialog = dialogRef.current;
		if (!dialog) return;
		const candidates = [...dialog.querySelectorAll(FOCUSABLE)].filter((element) => element.getClientRects().length);
		const first = initialFocus && dialog.querySelector(initialFocus) || candidates.find((element) => !element.closest(".ag-dialog__head")) || candidates[0];
		if (first) first.focus({ preventScroll: true });
	}, [open, inline]);
	if (inline) {
		if (!open) return null;
		return /* @__PURE__ */ React.createElement("div", { className: overlayClass }, /* @__PURE__ */ React.createElement("div", {
			role: "dialog",
			"aria-labelledby": title ? titleId : undefined,
			className: dialogClass,
			style
		}, /* @__PURE__ */ React.createElement(Content, {
			title,
			titleId,
			onClose,
			closeLabel,
			footer
		}, children)));
	}
	return /* @__PURE__ */ React.createElement(ModalOverlay, {
		isOpen: !!open,
		onOpenChange: (isOpen) => !isOpen && onClose && onClose(),
		isDismissable: !!onClose,
		isKeyboardDismissDisabled: !onClose,
		className: overlayClass
	}, /* @__PURE__ */ React.createElement(Modal, {
		className: dialogClass,
		style
	}, /* @__PURE__ */ React.createElement(AriaDialog, {
		ref: dialogRef,
		className: "ag-dialog__frame"
	}, /* @__PURE__ */ React.createElement(Content, {
		onClose,
		closeLabel,
		footer,
		heading: title ? /* @__PURE__ */ React.createElement(Heading, {
			slot: "title",
			level: 2,
			className: "ag-dialog__title"
		}, title) : /* @__PURE__ */ React.createElement("span", null)
	}, children))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Dialog/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/EmptyState/EmptyState.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// An empty or finished state: icon disc, eyebrow, title (with an italic `titleAccent` line), body
// and actions. `icon` is a Lucide name or any node.
function EmptyState({ icon, tone = "neutral", eyebrow, title, titleAccent, body, actions, headingLevel = 2, className = "", style }) {
	const Heading = "h" + headingLevel;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-empty", className),
		style
	}, icon && /* @__PURE__ */ React.createElement("span", { className: cx("ag-empty__icon", "ag-empty__icon--" + tone) }, typeof icon === "string" ? /* @__PURE__ */ React.createElement(Icon, {
		name: icon,
		size: 28
	}) : icon), eyebrow && /* @__PURE__ */ React.createElement("div", { className: "ag-eyebrow ag-empty__eyebrow" }, eyebrow), /* @__PURE__ */ React.createElement(Heading, { className: "ag-empty__title" }, title, titleAccent && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, titleAccent))), body && /* @__PURE__ */ React.createElement("div", { className: "ag-empty__body" }, body), actions && /* @__PURE__ */ React.createElement("div", { className: "ag-empty__actions" }, actions));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/EmptyState/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/Gallery/Gallery.jsx
try { (() => {
const { cx } = __ds_scope;
// Product photos in a swipeable scroll-snap track with dot buttons; RTL scrolls the other way.
// The track is focusable so keyboard users can scroll it with the arrow keys (axe: scrollable-region-focusable).
function Gallery({ images = [], sizes = "(max-width: 767px) 100vw, 540px", frame = "arch", aspect = "3/4", label, slideLabel = (i, n) => i + " / " + n, className = "" }) {
	const trackRef = React.useRef(null);
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const count = images.length;
	const onScroll = () => {
		const track = trackRef.current;
		if (!track) return;
		const slide = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
		if (slide !== currentSlide) setCurrentSlide(slide);
	};
	const goTo = (slide) => {
		const track = trackRef.current;
		const rtl = getComputedStyle(track).direction === "rtl";
		track.scrollTo({ left: (rtl ? -1 : 1) * slide * track.clientWidth });
	};
	return /* @__PURE__ */ React.createElement("div", {
		role: "region",
		"aria-roledescription": "carousel",
		"aria-label": label,
		className: cx("ag-gallery", className)
	}, /* @__PURE__ */ React.createElement("div", {
		ref: trackRef,
		onScroll,
		tabIndex: 0,
		className: cx("ag-gallery__track", "ag-product__media--" + frame),
		style: { aspectRatio: aspect }
	}, images.map((image, i) => /* @__PURE__ */ React.createElement("div", {
		key: i,
		className: "ag-gallery__slide",
		role: "group",
		"aria-roledescription": "slide",
		"aria-label": slideLabel(i + 1, count)
	}, /* @__PURE__ */ React.createElement("img", {
		src: image.src,
		srcSet: image.srcSet,
		sizes: image.srcSet ? sizes : undefined,
		alt: image.alt || "",
		loading: i ? "lazy" : undefined,
		decoding: "async"
	})))), count > 1 && /* @__PURE__ */ React.createElement("div", { className: "ag-gallery__dots" }, images.map((_, i) => /* @__PURE__ */ React.createElement("button", {
		key: i,
		type: "button",
		className: "ag-gallery__dot",
		"aria-label": slideLabel(i + 1, count),
		"aria-current": i === currentSlide ? "true" : undefined,
		onClick: () => goTo(i)
	}, /* @__PURE__ */ React.createElement("span", null)))));
}
Object.assign(__ds_scope, { Gallery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Gallery/Gallery.jsx", error: String((e && e.message) || e) }); }

// components/LanguageSwitch/LanguageSwitch.jsx
try { (() => {
// The EN / فا toggle: one pressed button per language, each marked with its own `lang`.
function LanguageSwitch({ value = "en", onChange, label = "Language", options = [{
	id: "en",
	label: "EN"
}, {
	id: "fa",
	label: "فا"
}] }) {
	return /* @__PURE__ */ React.createElement("div", {
		className: "ag-lang",
		role: "group",
		"aria-label": label
	}, options.map((o) => /* @__PURE__ */ React.createElement("button", {
		key: o.id,
		type: "button",
		lang: o.id,
		"aria-pressed": value === o.id,
		onClick: () => onChange && onChange(o.id)
	}, o.label)));
}
Object.assign(__ds_scope, { LanguageSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LanguageSwitch/LanguageSwitch.jsx", error: String((e && e.message) || e) }); }

// components/QuantityInput/QuantityInput.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A −/+ quantity control, controlled (`value`) or not (`defaultValue`), clamped to min..max.
// `format` localizes the number (Persian digits); the count is announced politely.
function QuantityInput({ value, defaultValue = 1, min = 1, max = 99, onChange, disabled, size = "md", format = (n) => String(n), labels = {
	dec: "Decrease",
	inc: "Increase"
} }) {
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
	const quantity = value ?? uncontrolledValue;
	const change = (next) => {
		const clamped = Math.max(min, Math.min(max, next));
		if (value === undefined) setUncontrolledValue(clamped);
		onChange && onChange(clamped);
	};
	return /* @__PURE__ */ React.createElement("div", { className: cx("ag-qty", size === "sm" && "ag-qty--sm", disabled && "ag-qty--disabled") }, /* @__PURE__ */ React.createElement("button", {
		type: "button",
		"aria-label": labels.dec,
		disabled: disabled || quantity <= min,
		onClick: () => change(quantity - 1)
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "minus",
		size: 16
	})), /* @__PURE__ */ React.createElement("span", {
		className: "ag-qty__val",
		"aria-live": "polite"
	}, format(quantity)), /* @__PURE__ */ React.createElement("button", {
		type: "button",
		"aria-label": labels.inc,
		disabled: disabled || quantity >= max,
		onClick: () => change(quantity + 1)
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "plus",
		size: 16
	})));
}
Object.assign(__ds_scope, { QuantityInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/QuantityInput/QuantityInput.jsx", error: String((e && e.message) || e) }); }

// components/LineItem/LineItem.jsx
try { (() => {
const { QuantityInput } = __ds_scope;
const { cx } = __ds_scope;
// A bag or order row. `size="lg"` (bag) adds the quantity control and Remove; `sm` (summaries)
// shows ×quantity. `unavailable` greys it out and hides the price; `busy` marks it aria-busy.
function LineItem({ image, srcSet, name, meta, note, price, quantity, onQuantityChange, onRemove, removeLabel = "Remove", quantityLabels, formatQuantity = (n) => String(n), size = "lg", unavailable, unavailableLabel = "No longer available", busy, className = "" }) {
	const large = size !== "sm";
	const thumbWidth = large ? 88 : 44;
	return /* @__PURE__ */ React.createElement("div", { className: "ag-linewrap" }, /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-line", "ag-line--" + (large ? "lg" : "sm"), unavailable && "ag-line--unavailable", className),
		"aria-busy": busy || undefined
	}, /* @__PURE__ */ React.createElement("span", {
		className: "ag-line__thumb",
		style: { width: thumbWidth }
	}, image ? /* @__PURE__ */ React.createElement("img", {
		src: image,
		srcSet,
		sizes: srcSet ? thumbWidth + "px" : undefined,
		alt: "",
		loading: "lazy",
		decoding: "async"
	}) : /* @__PURE__ */ React.createElement("span", { className: "ag-product__ph" })), /* @__PURE__ */ React.createElement("div", { className: "ag-line__main" }, /* @__PURE__ */ React.createElement("div", { className: "ag-line__name" }, name), meta && /* @__PURE__ */ React.createElement("div", { className: "ag-line__meta" }, meta), note && /* @__PURE__ */ React.createElement("div", { className: "ag-line__note" }, note), unavailable && /* @__PURE__ */ React.createElement("div", { className: "ag-line__flag" }, unavailableLabel), large && (onQuantityChange || onRemove) && /* @__PURE__ */ React.createElement("div", { className: "ag-line__actions" }, onQuantityChange && !unavailable && /* @__PURE__ */ React.createElement(QuantityInput, {
		value: quantity,
		disabled: busy,
		onChange: onQuantityChange,
		format: formatQuantity,
		labels: quantityLabels
	}), onRemove && /* @__PURE__ */ React.createElement("button", {
		type: "button",
		className: "ag-line__remove",
		onClick: onRemove
	}, removeLabel))), /* @__PURE__ */ React.createElement("div", { className: "ag-line__end" }, !large && quantity != null && /* @__PURE__ */ React.createElement("span", { className: "ag-line__qty" }, "×", formatQuantity(quantity)), !unavailable && /* @__PURE__ */ React.createElement("span", { className: "ag-line__price" }, price))));
}
Object.assign(__ds_scope, { LineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LineItem/LineItem.jsx", error: String((e && e.message) || e) }); }

// components/LiveRegion/LiveRegion.jsx
try { (() => {
const { cx } = __ds_scope;
// Mount once, keep mounted, change children to announce. polite → role="status"; assertive → role="alert" (errors only).
function LiveRegion({ children, politeness = "polite", atomic = true, id, className = "" }) {
	return /* @__PURE__ */ React.createElement("div", {
		id,
		role: politeness === "assertive" ? "alert" : "status",
		"aria-live": politeness,
		"aria-atomic": atomic,
		className: cx("ag-sr-only", className)
	}, children);
}
Object.assign(__ds_scope, { LiveRegion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LiveRegion/LiveRegion.jsx", error: String((e && e.message) || e) }); }

// components/LoadMore/LoadMore.jsx
try { (() => {
const { Button } = __ds_scope;
const { cx } = __ds_scope;
// "Show more" for a long list: how many of the total are showing, a progress bar, and a button that
// loads the next page. `href` makes the button a real link to the next page (it works without
// JavaScript and for crawlers); `onClick` loads in place. When everything is showing, only the
// status stays.
function LoadMore({ shown, total, status, label, href, onClick, busy = false, className = "", style }) {
	const percent = total > 0 ? Math.min(100, Math.round(shown / total * 100)) : 100;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-loadmore", className),
		style
	}, /* @__PURE__ */ React.createElement("p", {
		className: "ag-loadmore__status",
		role: "status"
	}, status), /* @__PURE__ */ React.createElement("div", {
		className: "ag-loadmore__bar",
		"aria-hidden": "true"
	}, /* @__PURE__ */ React.createElement("span", {
		className: "ag-loadmore__fill",
		style: { inlineSize: percent + "%" }
	})), shown < total && /* @__PURE__ */ React.createElement(Button, {
		variant: "secondary",
		href,
		onClick,
		loading: busy
	}, label));
}
Object.assign(__ds_scope, { LoadMore });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LoadMore/LoadMore.jsx", error: String((e && e.message) || e) }); }

// components/utils/maps.js
try { (() => {
// Leaflet set-up shared by LocationPicker and PlacesMap: import { maps }. Apps rarely need it directly.
// A Leaflet map on `element` with the store's tiles. The wheel doesn't zoom it (the page scrolls past),
// and it keeps its centre when its box changes size: Leaflet sizes itself once, so a map inside an
// opening dialog or a resized column needs telling. `map.resizing` is true during that adjustment,
// so moveend listeners can tell it from the customer moving the map. Call stop() before map.remove().
const create = (Leaflet, element, { center, zoom, tiles }) => {
	const map = Leaflet.map(element, {
		center,
		zoom,
		scrollWheelZoom: false
	});
	Leaflet.tileLayer(tiles.url, {
		maxZoom: tiles.maxZoom || 19,
		attribution: tiles.attribution
	}).addTo(map);
	let watcher = null;
	if (typeof ResizeObserver !== "undefined") {
		watcher = new ResizeObserver(() => {
			const middle = map.getCenter(), level = map.getZoom();
			map.resizing = true;
			try {
				map.invalidateSize({ pan: false });
				map.setView(middle, level, { animate: false });
			} finally {
				map.resizing = false;
			}
		});
		watcher.observe(element);
	}
	return {
		map,
		stop: () => watcher && watcher.disconnect()
	};
};
const maps = { create };
Object.assign(__ds_scope, { maps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/maps.js", error: String((e && e.message) || e) }); }

// components/LocationPicker/LocationPicker.jsx
try { (() => {
const { Button } = __ds_scope;
const { Icon } = __ds_scope;
const { commerce } = __ds_scope;
const { cx } = __ds_scope;
const { maps } = __ds_scope;
// A delivery pin: the pin stays at the map's centre, and wherever the map stops is the chosen point.
// Customers drag or tap the map, or press the arrow keys once it has focus, or use their own location.
// Leaflet comes from `loadLeaflet()` (the app decides how to load it) and is only created in the
// browser, so the component renders on the server. When it can't load, `onFail` lets the page offer
// a typed address instead.
function LocationPicker({ id, label, status, error, value, onChange, loadLeaflet, tiles, center, zoom = 13, pinZoom = 17, locateLabel, onLocateError, onReady, onFail, compact = false, className, style }) {
	const box = React.useRef(null);
	const map = React.useRef(null);
	const [locating, setLocating] = React.useState(false);
	// The latest callbacks and value, for listeners Leaflet keeps from the first render.
	const latest = React.useRef({});
	latest.current = {
		value,
		onChange,
		onReady,
		onFail
	};
	React.useEffect(() => {
		let alive = true, stopWatching = null;
		Promise.resolve().then(() => loadLeaflet()).then((Leaflet) => {
			if (!alive || !box.current) return;
			const at = latest.current.value;
			const pinned = commerce.validLocation(at);
			const { map: created, stop } = maps.create(Leaflet, box.current, {
				center: pinned ? [at.lat, at.lng] : center,
				zoom: pinned ? pinZoom : zoom,
				tiles
			});
			created.on("moveend", () => {
				if (!created.resizing) latest.current.onChange(commerce.pinLocation(created.getCenter()));
			});
			created.on("click", (event) => created.panTo(event.latlng));
			stopWatching = stop;
			map.current = created;
			latest.current.onReady && latest.current.onReady();
		}).catch(() => {
			if (alive && latest.current.onFail) latest.current.onFail();
		});
		return () => {
			alive = false;
			if (stopWatching) stopWatching();
			if (map.current) map.current.remove();
			map.current = null;
		};
	}, []);
	// A point chosen elsewhere (a saved address, the customer's location) moves the map to it.
	React.useEffect(() => {
		const current = map.current;
		if (!current || !commerce.validLocation(value)) return;
		const here = commerce.pinLocation(current.getCenter());
		if (here.lat !== value.lat || here.lng !== value.lng) current.setView([value.lat, value.lng], pinZoom);
	}, [value && value.lat, value && value.lng]);
	const locate = () => {
		if (!navigator.geolocation) return onLocateError && onLocateError();
		setLocating(true);
		navigator.geolocation.getCurrentPosition((position) => {
			setLocating(false);
			const here = commerce.pinLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
			if (map.current) map.current.setView([here.lat, here.lng], pinZoom);
			else onChange(here);
		}, () => {
			setLocating(false);
			onLocateError && onLocateError();
		}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	};
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-location", compact && "ag-location--compact", className),
		style
	}, /* @__PURE__ */ React.createElement("span", {
		id: id + "-label",
		className: "ag-field__label"
	}, label), /* @__PURE__ */ React.createElement("div", { className: "ag-map ag-location__map" }, /* @__PURE__ */ React.createElement("div", {
		id,
		ref: box,
		dir: "ltr",
		role: "region",
		"aria-labelledby": id + "-label",
		"aria-describedby": cx(id + "-status", error && id + "-error"),
		className: "ag-map__canvas"
	}), /* @__PURE__ */ React.createElement("span", {
		className: "ag-location__pin",
		"aria-hidden": "true"
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "map-pin",
		size: compact ? 32 : 36
	}))), /* @__PURE__ */ React.createElement("div", { className: "ag-location__row" }, /* @__PURE__ */ React.createElement("span", {
		id: id + "-status",
		className: "ag-field__hint"
	}, status), locateLabel && /* @__PURE__ */ React.createElement(Button, {
		variant: "secondary",
		size: "sm",
		onClick: locate,
		loading: locating
	}, locateLabel)), error && /* @__PURE__ */ React.createElement("span", {
		id: id + "-error",
		className: "ag-field__hint ag-field__hint--error"
	}, error));
}
Object.assign(__ds_scope, { LocationPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LocationPicker/LocationPicker.jsx", error: String((e && e.message) || e) }); }

// components/MenuList/MenuList.jsx
try { (() => {
const { cx } = __ds_scope;
// A titled navigation list; each child (usually a NavLink) becomes a list item.
function MenuList({ title, label, children, className = "" }) {
	return /* @__PURE__ */ React.createElement("nav", {
		"aria-label": label || (typeof title === "string" ? title : undefined),
		className: cx("ag-menu", className)
	}, title && /* @__PURE__ */ React.createElement("div", { className: "ag-eyebrow ag-menu__title" }, title), /* @__PURE__ */ React.createElement("ul", { className: "ag-menu__list" }, React.Children.map(children, (c) => c ? /* @__PURE__ */ React.createElement("li", null, c) : null)));
}
Object.assign(__ds_scope, { MenuList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/MenuList/MenuList.jsx", error: String((e && e.message) || e) }); }

// components/NavLink/NavLink.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A navigation link (or a button without `href`) in header, footer or menu style;
// `current` marks it aria-current="page". The menu style adds a chevron.
function NavLink({ href, current, variant = "header", onClick, children, className = "", ...rest }) {
	const Element = href ? "a" : "button";
	return /* @__PURE__ */ React.createElement(Element, {
		href,
		type: href ? undefined : "button",
		onClick,
		"aria-current": current ? "page" : undefined,
		className: cx("ag-nav", "ag-nav--" + variant, current && "ag-nav--current", className),
		...rest
	}, /* @__PURE__ */ React.createElement("span", null, children), variant === "menu" && /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-right",
		size: 18,
		className: "ag-nav__chev"
	}));
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/NavLink/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/OrderSummary/OrderSummary.jsx
try { (() => {
const { ArchFrame } = __ds_scope;
const { cx } = __ds_scope;
// Lines + totals for order pages and confirmations. Card note: italic in EN, upright in FA (CSS).
function OrderSummary({ lines = [], sums = [], title, titleAs = "h2", className = "", style }) {
	const Title = titleAs;
	return /* @__PURE__ */ React.createElement("section", {
		className: cx("ag-osum", className),
		style
	}, title && /* @__PURE__ */ React.createElement(Title, { className: "ag-osum__title" }, title), /* @__PURE__ */ React.createElement("ul", { className: "ag-osum__lines" }, lines.map((line, i) => /* @__PURE__ */ React.createElement("li", {
		key: i,
		className: "ag-osum__line"
	}, /* @__PURE__ */ React.createElement(ArchFrame, {
		size: "thumb",
		tone: "product",
		src: line.image,
		alt: ""
	}), /* @__PURE__ */ React.createElement("div", { className: "ag-osum__main" }, /* @__PURE__ */ React.createElement("div", { className: "ag-osum__name" }, line.href ? /* @__PURE__ */ React.createElement("a", {
		href: line.href,
		onClick: line.onClick
	}, line.name) : line.name), line.meta && /* @__PURE__ */ React.createElement("div", { className: "ag-osum__meta" }, line.meta), line.note && /* @__PURE__ */ React.createElement("div", { className: "ag-osum__note" }, line.note)), /* @__PURE__ */ React.createElement("div", { className: "ag-osum__total" }, line.total)))), sums.length > 0 && /* @__PURE__ */ React.createElement("dl", { className: "ag-osum__sums" }, sums.map((sum, i) => /* @__PURE__ */ React.createElement("div", {
		key: i,
		className: cx("ag-osum__sum", sum.strong && "ag-osum__sum--strong")
	}, /* @__PURE__ */ React.createElement("dt", null, sum.label), /* @__PURE__ */ React.createElement("dd", null, sum.value)))));
}
Object.assign(__ds_scope, { OrderSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/OrderSummary/OrderSummary.jsx", error: String((e && e.message) || e) }); }

// components/OrderTimeline/OrderTimeline.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// Vertical order progress. Cancelled renders nothing — the screen shows an Alert instead.
function OrderTimeline({ steps = [], current = 0, status = "active", label, doneLabel = "done", className = "", style }) {
	if (status === "cancelled") return null;
	return /* @__PURE__ */ React.createElement("ol", {
		className: cx("ag-otl", className),
		style,
		"aria-label": label
	}, steps.map((step, i) => {
		const done = status === "done" || i < current;
		const isCurrent = status !== "done" && i === current;
		const state = done ? "done" : isCurrent ? "current" : "upcoming";
		return /* @__PURE__ */ React.createElement("li", {
			key: i,
			className: cx("ag-otl__step", "ag-otl__step--" + state),
			"aria-current": isCurrent ? "step" : undefined
		}, /* @__PURE__ */ React.createElement("span", {
			className: "ag-otl__rail",
			"aria-hidden": "true"
		}, /* @__PURE__ */ React.createElement("span", { className: "ag-otl__dot" }, done && /* @__PURE__ */ React.createElement(Icon, {
			name: "check",
			size: 14
		})), i < steps.length - 1 && /* @__PURE__ */ React.createElement("span", { className: cx("ag-otl__line", done && "ag-otl__line--done") })), /* @__PURE__ */ React.createElement("span", { className: "ag-otl__label" }, step.label, done && /* @__PURE__ */ React.createElement("span", { className: "ag-sr-only" }, " — ", doneLabel)), step.time && /* @__PURE__ */ React.createElement("span", { className: "ag-otl__time" }, step.time));
	}));
}
Object.assign(__ds_scope, { OrderTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/OrderTimeline/OrderTimeline.jsx", error: String((e && e.message) || e) }); }

// components/PaymentCard/PaymentCard.jsx
try { (() => {
const { Button } = __ds_scope;
const { cx } = __ds_scope;
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
// Card-to-card transfer details: the card number in groups of four (always LTR) with a copy
// button, then holder, bank and amount. Persian digits in `cardNumber` are accepted.
function PaymentCard({ cardNumber = "", holder, bank, amount, labels = {}, onCopy, className = "" }) {
	const text = {
		card: "Card number",
		holder: "Card holder",
		bank: "Bank",
		amount: "Amount",
		copy: "Copy",
		copied: "Copied",
		...labels
	};
	const digits = String(cardNumber).replace(/[۰-۹]/g, (digit) => FA_DIGITS.indexOf(digit)).replace(/\D/g, "");
	const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
	const [copied, setCopied] = React.useState(false);
	const resetTimer = React.useRef();
	React.useEffect(() => () => clearTimeout(resetTimer.current), []);
	const copy = () => {
		const done = () => {
			setCopied(true);
			clearTimeout(resetTimer.current);
			resetTimer.current = setTimeout(() => setCopied(false), 2e3);
			onCopy && onCopy(digits);
		};
		const fallback = () => {
			const scratch = document.createElement("textarea");
			scratch.value = digits;
			scratch.style.position = "fixed";
			scratch.style.opacity = "0";
			document.body.appendChild(scratch);
			scratch.select();
			let copiedText = false;
			try {
				copiedText = document.execCommand("copy");
			} catch {}
			scratch.remove();
			// Only confirm when the copy actually happened; otherwise the digits stay visible to copy by hand.
			if (copiedText) done();
		};
		if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(digits).then(done, fallback);
		else fallback();
	};
	// [label, value, modifier class]
	const rows = [
		[text.holder, holder],
		[text.bank, bank],
		[
			text.amount,
			amount,
			"amount"
		]
	].filter(([, value]) => value);
	return /* @__PURE__ */ React.createElement("div", { className: cx("ag-pay", className) }, /* @__PURE__ */ React.createElement("div", { className: "ag-pay__row" }, /* @__PURE__ */ React.createElement("div", { className: "ag-pay__cardcol" }, /* @__PURE__ */ React.createElement("div", { className: "ag-pay__k" }, text.card), /* @__PURE__ */ React.createElement("div", {
		className: "ag-pay__num",
		dir: "ltr"
	}, grouped)), /* @__PURE__ */ React.createElement(Button, {
		variant: "secondary",
		iconStart: copied ? "check" : "copy",
		onClick: copy
	}, copied ? text.copied : text.copy)), rows.length > 0 && /* @__PURE__ */ React.createElement("dl", { className: "ag-pay__meta" }, rows.map(([label, value, modifier]) => /* @__PURE__ */ React.createElement("div", {
		key: label,
		className: modifier ? "ag-pay__" + modifier : undefined
	}, /* @__PURE__ */ React.createElement("dt", { className: "ag-pay__k" }, label), /* @__PURE__ */ React.createElement("dd", null, value)))), /* @__PURE__ */ React.createElement("span", {
		role: "status",
		className: "ag-sr-only"
	}, copied ? text.copied : ""));
}
Object.assign(__ds_scope, { PaymentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/PaymentCard/PaymentCard.jsx", error: String((e && e.message) || e) }); }

// components/PhoneInput/PhoneInput.jsx
try { (() => {
const { Input } = __ds_scope;
const { commerce } = __ds_scope;
// A phone number field: the phone keypad on touch screens, autofill, and digits kept left to right
// inside Persian text. It shows what the customer types; `onValueChange` also gets the number, as
// 09xxxxxxxxx when it is an Iranian mobile (commerce.mobile), otherwise in Latin digits without
// spaces or dashes, and whether it is a mobile.
function PhoneInput({ autoComplete = "tel", onChange, onValueChange, ...rest }) {
	const change = (event) => {
		onChange && onChange(event);
		if (onValueChange) {
			const typed = event.target.value, mobile = commerce.mobile(typed);
			onValueChange(mobile || commerce.phone(typed), mobile !== "");
		}
	};
	return /* @__PURE__ */ React.createElement(Input, {
		type: "tel",
		inputMode: "tel",
		dir: "ltr",
		autoComplete,
		onChange: change,
		...rest
	});
}
Object.assign(__ds_scope, { PhoneInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/PhoneInput/PhoneInput.jsx", error: String((e && e.message) || e) }); }

// components/PlacesMap/PlacesMap.jsx
try { (() => {
const { commerce } = __ds_scope;
const { cx } = __ds_scope;
const { maps } = __ds_scope;
// A map of places to look at, not to choose: the studio on the contact page, saved addresses in the
// account. Each place has a labelled marker that opens it (onSelect) with a pointer or with Enter and
// Space; the view fits every place. Leaflet comes from `loadLeaflet()` and is only created in the
// browser, so the component renders on the server.
function PlacesMap({ id, label, places = [], loadLeaflet, tiles, center, zoom = 13, height = 280, onFail, className, style }) {
	const box = React.useRef(null);
	const view = React.useRef(null);
	// The latest places, for marker listeners Leaflet keeps from an earlier render.
	const latest = React.useRef(places);
	latest.current = places;
	const pinned = places.filter((place) => commerce.validLocation(place.location));
	const key = JSON.stringify(pinned.map((place) => [
		place.id,
		place.label,
		place.title,
		place.location
	]));
	const draw = () => {
		const current = view.current;
		if (!current) return;
		const { Leaflet, map, layer } = current;
		layer.clearLayers();
		const shown = latest.current.filter((place) => commerce.validLocation(place.location));
		shown.forEach((place) => {
			const select = () => {
				const now = latest.current.find((item) => item.id === place.id);
				now && now.onSelect && now.onSelect();
			};
			const icon = Leaflet.divIcon({
				className: "ag-place-marker",
				html: "<span class=\"ag-place-marker__dot\"></span>",
				iconSize: [24, 24],
				iconAnchor: [12, 12]
			});
			Leaflet.marker([place.location.lat, place.location.lng], {
				icon,
				title: place.title,
				keyboard: true
			}).bindTooltip(place.label, {
				permanent: true,
				direction: "top",
				offset: [0, -12],
				className: "ag-place-label"
			}).on("click", select).on("keydown", (event) => {
				if (event.originalEvent.key !== "Enter" && event.originalEvent.key !== " ") return;
				event.originalEvent.preventDefault();
				select();
			}).addTo(layer);
		});
		if (shown.length > 1) map.fitBounds(shown.map((place) => [place.location.lat, place.location.lng]), {
			padding: [48, 48],
			maxZoom: 15
		});
		else if (shown.length) map.setView([shown[0].location.lat, shown[0].location.lng], 15);
	};
	React.useEffect(() => {
		let alive = true;
		Promise.resolve().then(() => loadLeaflet()).then((Leaflet) => {
			if (!alive || !box.current) return;
			const { map, stop } = maps.create(Leaflet, box.current, {
				center,
				zoom,
				tiles
			});
			view.current = {
				Leaflet,
				map,
				stop,
				layer: Leaflet.layerGroup().addTo(map)
			};
			draw();
		}).catch(() => {
			if (alive && onFail) onFail();
		});
		return () => {
			alive = false;
			if (view.current) {
				view.current.stop();
				view.current.map.remove();
			}
			view.current = null;
		};
	}, []);
	// New, moved or renamed places redraw the markers.
	React.useEffect(draw, [key]);
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-map", className),
		style: {
			blockSize: typeof height === "number" ? height + "px" : height,
			...style
		}
	}, /* @__PURE__ */ React.createElement("div", {
		id,
		ref: box,
		dir: "ltr",
		role: "region",
		"aria-label": label,
		className: "ag-map__canvas"
	}));
}
Object.assign(__ds_scope, { PlacesMap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/PlacesMap/PlacesMap.jsx", error: String((e && e.message) || e) }); }

// components/ProductCard/ProductCard.jsx
try { (() => {
const { Badge } = __ds_scope;
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
// The product name is the one interactive target: <a href> (or <button> without href) with a stretched ::after covering the card.
function ProductCard({ name, subtitle, price, compareAt, image, srcSet, images, sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", badge, badgeTone = "neutral", frame = "arch", tone, favorite, onFavorite, onClick, href, linkLabel, placeholder = "Bouquet photo", favLabel = "Save" }) {
	const photos = (images && images.length ? images : image ? [{
		src: image,
		srcSet
	}] : []).map((photo) => typeof photo === "string" ? { src: photo } : photo);
	// The second photo crossfades in on hover; it is decorative, so its alt is empty.
	const [mainPhoto, hoverPhoto] = photos;
	const renderPhoto = (photo, className) => /* @__PURE__ */ React.createElement("img", {
		className,
		src: photo.src,
		srcSet: photo.srcSet,
		sizes: photo.srcSet ? sizes : undefined,
		alt: className ? "" : photo.alt || name,
		loading: "lazy",
		decoding: "async",
		style: photo.crop ? {
			objectPosition: photo.crop,
			transform: "scale(1.6)",
			transformOrigin: photo.crop
		} : undefined
	});
	const accessibleName = linkLabel ?? (typeof name === "string" && typeof price === "string" ? name + " — " + price : undefined);
	const linked = !!(href || onClick);
	const title = href ? /* @__PURE__ */ React.createElement("a", {
		href,
		className: "ag-product__link",
		"aria-label": accessibleName,
		onClick
	}, name) : onClick ? /* @__PURE__ */ React.createElement("button", {
		type: "button",
		className: "ag-product__link",
		"aria-label": accessibleName,
		onClick
	}, name) : name;
	return /* @__PURE__ */ React.createElement("div", { className: cx("ag-product", linked && "ag-product--link") }, /* @__PURE__ */ React.createElement("div", { className: cx("ag-product__media", "ag-product__media--" + frame, tone === "product" && "ag-arch--product") }, mainPhoto ? renderPhoto(mainPhoto) : /* @__PURE__ */ React.createElement("div", { className: "ag-product__ph" }, placeholder), hoverPhoto && renderPhoto(hoverPhoto, "ag-product__alt"), badge && /* @__PURE__ */ React.createElement(Badge, {
		tone: badgeTone,
		className: "ag-product__badge"
	}, badge), onFavorite && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "heart",
		label: favLabel,
		variant: "solid",
		size: "sm",
		active: favorite,
		className: "ag-product__fav",
		onClick: (event) => {
			event.stopPropagation();
			onFavorite();
		}
	})), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "ag-product__name" }, title), /* @__PURE__ */ React.createElement("div", { className: "ag-product__meta" }, /* @__PURE__ */ React.createElement("span", { className: "ag-product__sub" }, subtitle), /* @__PURE__ */ React.createElement("span", { className: "ag-product__price" }, compareAt && /* @__PURE__ */ React.createElement("s", null, compareAt), price))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ProductCard/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/Radio/Radio.jsx
try { (() => {
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
// A native radio inside its <label>. The label alone names the radio; the description is read
// after it (aria-describedby), so it never becomes part of the name.
function Radio({ label, description, hint, error, disabled, id, className, style, "aria-describedby": describedBy, ...rest }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error
	});
	const labelId = fieldId + "-label";
	const descriptionId = fieldId + "-desc";
	const namedByLabel = description && label && !rest["aria-label"] && !rest["aria-labelledby"];
	const box = /* @__PURE__ */ React.createElement("label", {
		className: cx("ag-check ag-check--radio", error && "ag-check--error", disabled && "ag-check--disabled", !message && className),
		style: message ? undefined : style
	}, /* @__PURE__ */ React.createElement("input", {
		type: "radio",
		id,
		disabled,
		...rest,
		...controlProps,
		"aria-labelledby": namedByLabel ? labelId : rest["aria-labelledby"],
		"aria-describedby": cx(description && descriptionId, message && messageId, describedBy) || undefined
	}), /* @__PURE__ */ React.createElement("span", { className: "ag-check__box" }), /* @__PURE__ */ React.createElement("span", { className: "ag-check__text" }, /* @__PURE__ */ React.createElement("span", { id: labelId }, label), description && /* @__PURE__ */ React.createElement("span", {
		id: descriptionId,
		className: "ag-check__desc"
	}, description)));
	if (!message) return box;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-field ag-field--check", className),
		style
	}, box, /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Radio/Radio.jsx", error: String((e && e.message) || e) }); }

// components/RangeSlider/RangeSlider.jsx
try { (() => {
const { cx } = __ds_scope;
// Two native range inputs over one track (or one with `range={false}`), so keyboard and screen
// readers work as usual. The handles can't cross; RTL mirrors the fill.
function RangeSlider({ range = true, min = 0, max = 100, step = 1, value, defaultValue, onChange, formatValue = (number) => String(number), label = "Value", labels = {
	min: "Minimum",
	max: "Maximum"
}, showValues = true, className = "" }) {
	const initial = defaultValue ?? (range ? [min, max] : min);
	const [uncontrolledValue, setUncontrolledValue] = React.useState(initial);
	const current = value ?? uncontrolledValue;
	const commit = (next) => {
		if (value === undefined) setUncontrolledValue(next);
		onChange && onChange(next);
	};
	const percent = (number) => (number - min) / (max - min || 1) * 100;
	const inputProps = {
		type: "range",
		min,
		max,
		step,
		className: "ag-range__input"
	};
	if (!range) {
		const single = Number(current);
		return /* @__PURE__ */ React.createElement("div", { className: cx("ag-range", "ag-range--single", className) }, /* @__PURE__ */ React.createElement("div", { className: "ag-range__track" }, /* @__PURE__ */ React.createElement("span", {
			className: "ag-range__fill",
			style: {
				insetInlineStart: 0,
				width: percent(single) + "%"
			}
		}), /* @__PURE__ */ React.createElement("input", {
			...inputProps,
			value: single,
			"aria-label": label,
			"aria-valuetext": formatValue(single),
			onChange: (event) => commit(Number(event.target.value))
		})), showValues && /* @__PURE__ */ React.createElement("div", { className: "ag-range__vals" }, /* @__PURE__ */ React.createElement("span", null, formatValue(min)), /* @__PURE__ */ React.createElement("span", null, formatValue(max))));
	}
	const [low, high] = current;
	// Moves one handle (0 = low, 1 = high), keeping at least one step between them.
	const moveHandle = (handle, raw) => {
		const number = Number(raw);
		const next = handle ? [low, Math.min(max, Math.max(number, low + step))] : [Math.max(min, Math.min(number, high - step)), high];
		if (next[0] !== low || next[1] !== high) commit(next);
	};
	return /* @__PURE__ */ React.createElement("div", { className: cx("ag-range", className) }, /* @__PURE__ */ React.createElement("div", { className: "ag-range__track" }, /* @__PURE__ */ React.createElement("span", {
		className: "ag-range__fill",
		style: {
			insetInlineStart: percent(low) + "%",
			width: percent(high) - percent(low) + "%"
		}
	}), /* @__PURE__ */ React.createElement("input", {
		...inputProps,
		value: low,
		"aria-label": labels.min,
		"aria-valuetext": formatValue(low),
		onChange: (event) => moveHandle(0, event.target.value),
		style: { zIndex: percent(low) > 90 ? 3 : 2 }
	}), /* @__PURE__ */ React.createElement("input", {
		...inputProps,
		value: high,
		"aria-label": labels.max,
		"aria-valuetext": formatValue(high),
		onChange: (event) => moveHandle(1, event.target.value)
	})), showValues && /* @__PURE__ */ React.createElement("div", { className: "ag-range__vals" }, /* @__PURE__ */ React.createElement("span", null, formatValue(low)), /* @__PURE__ */ React.createElement("span", null, formatValue(high))));
}
Object.assign(__ds_scope, { RangeSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/RangeSlider/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// components/Switch/Switch.jsx
try { (() => {
const { Switch: AriaSwitch } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
// An on/off toggle on React Aria (role="switch"): the label is the whole target, and the state shows
// as data-selected, data-focus-visible and data-disabled on it. It takes the usual input props
// (checked, defaultChecked, disabled, name, value, onChange(event)); onChange gets an event whose
// target is the real switch input, already set to its new state.
function Switch({ label, checked, defaultChecked, disabled, onChange, name, value, className = "", style, ...rest }) {
	const inputRef = React.useRef(null);
	return /* @__PURE__ */ React.createElement(AriaSwitch, {
		...rest,
		inputRef,
		name,
		value,
		isSelected: checked,
		defaultSelected: defaultChecked,
		isDisabled: disabled,
		onChange: () => onChange && onChange({
			target: inputRef.current,
			currentTarget: inputRef.current,
			type: "change"
		}),
		className: cx("ag-switch", className),
		style
	}, /* @__PURE__ */ React.createElement("span", { className: "ag-switch__track" }, /* @__PURE__ */ React.createElement("span", { className: "ag-switch__thumb" })), label && /* @__PURE__ */ React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Switch/Switch.jsx", error: String((e && e.message) || e) }); }

// components/ReminderRow/ReminderRow.jsx
try { (() => {
const { Icon } = __ds_scope;
const { Badge } = __ds_scope;
const { IconButton } = __ds_scope;
const { Button } = __ds_scope;
const { Switch } = __ds_scope;
const { cx } = __ds_scope;
const DEFAULT_LABELS = {
	paused: "Paused",
	sendFlowers: "Send flowers",
	reminderFor: "Reminder for {name}",
	edit: "Edit reminder for {name}",
	delete: "Delete reminder for {name}"
};
// One occasion reminder: arched date tile · name + meta · controls (drop below on narrow widths via container query).
function ReminderRow({ name, day, month, occasion, occasionIcon = "calendar-heart", before, channel = "sms", altDate, when, soon, on = true, onToggle, onEdit, onDelete, sendHref, sendOnClick, labels, className = "", style }) {
	const text = {
		...DEFAULT_LABELS,
		...labels
	};
	const named = (template) => template.replace("{name}", typeof name === "string" ? name : "");
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-remwrap", className),
		style
	}, /* @__PURE__ */ React.createElement("div", { className: cx("ag-rem", soon && on && "ag-rem--soon") }, /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-rem__tile", !on && "ag-rem__tile--paused"),
		"aria-hidden": "true"
	}, /* @__PURE__ */ React.createElement("span", { className: "ag-rem__day" }, day), /* @__PURE__ */ React.createElement("span", { className: "ag-rem__month" }, month)), /* @__PURE__ */ React.createElement("div", { className: "ag-rem__body" }, /* @__PURE__ */ React.createElement("div", { className: "ag-rem__head" }, /* @__PURE__ */ React.createElement("span", { className: "ag-rem__name" }, name), on ? when && /* @__PURE__ */ React.createElement(Badge, { tone: soon ? "accent" : "neutral" }, when) : /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, text.paused)), /* @__PURE__ */ React.createElement("div", { className: "ag-rem__meta" }, /* @__PURE__ */ React.createElement("span", { className: "ag-rem__bit" }, /* @__PURE__ */ React.createElement(Icon, {
		name: occasionIcon,
		size: 14
	}), occasion), /* @__PURE__ */ React.createElement("span", { className: "ag-rem__bit" }, day, " ", month, altDate && /* @__PURE__ */ React.createElement("span", null, " (", altDate, ")")), before && /* @__PURE__ */ React.createElement("span", { className: "ag-rem__bit" }, /* @__PURE__ */ React.createElement(Icon, {
		name: channel === "wa" ? "message-circle" : "message-square",
		size: 14
	}), before))), /* @__PURE__ */ React.createElement("div", { className: "ag-rem__controls" }, soon && on && (sendHref || sendOnClick) && /* @__PURE__ */ React.createElement(Button, {
		size: "sm",
		variant: "secondary",
		href: sendHref,
		onClick: sendOnClick
	}, text.sendFlowers), /* @__PURE__ */ React.createElement(Switch, {
		checked: on,
		onChange: (event) => onToggle && onToggle(event.target.checked),
		"aria-label": named(text.reminderFor)
	}), onEdit && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "pencil",
		size: "sm",
		label: named(text.edit),
		onClick: onEdit
	}), onDelete && /* @__PURE__ */ React.createElement(IconButton, {
		icon: "trash-2",
		size: "sm",
		label: named(text.delete),
		onClick: onDelete
	}))));
}
Object.assign(__ds_scope, { ReminderRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ReminderRow/ReminderRow.jsx", error: String((e && e.message) || e) }); }

// components/SectionHeader/SectionHeader.jsx
try { (() => {
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
// A section title with an optional italic `accent`, eyebrow and action, plus prev/next arrows
// when `onPrev`/`onNext` are given (pair them with a Carousel's ref).
function SectionHeader({ title, accent, eyebrow, level = "h2", action, onPrev, onNext, canPrev = true, canNext = true, prevLabel = "Previous", nextLabel = "Next", id, className = "", style }) {
	const Heading = [
		"h1",
		"h2",
		"h3"
	].includes(level) ? level : "h2";
	const hasArrows = onPrev || onNext;
	return /* @__PURE__ */ React.createElement("div", {
		className: cx("ag-sechead", "ag-sechead--" + Heading, className),
		style
	}, /* @__PURE__ */ React.createElement("div", { className: "ag-sechead__text" }, eyebrow && /* @__PURE__ */ React.createElement("div", { className: "ag-eyebrow ag-sechead__eyebrow" }, eyebrow), /* @__PURE__ */ React.createElement(Heading, {
		id,
		className: "ag-sechead__title"
	}, title, accent && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", /* @__PURE__ */ React.createElement("em", null, accent)))), (action || hasArrows) && /* @__PURE__ */ React.createElement("div", { className: "ag-sechead__actions" }, action, hasArrows && /* @__PURE__ */ React.createElement("div", { className: "ag-sechead__arrows" }, /* @__PURE__ */ React.createElement(IconButton, {
		icon: "chevron-left",
		label: prevLabel,
		variant: "outline",
		onClick: onPrev,
		disabled: !onPrev || !canPrev
	}), /* @__PURE__ */ React.createElement(IconButton, {
		icon: "chevron-right",
		label: nextLabel,
		variant: "outline",
		onClick: onNext,
		disabled: !onNext || !canNext
	}))));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SectionHeader/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/Skeleton/Skeleton.jsx
try { (() => {
const { cx } = __ds_scope;
// Loading placeholders: text lines, a shape (`block`, `circle`, `arch`) or a whole product `card`.
// Hidden from screen readers; the shimmer stops with reduced motion.
function Skeleton({ shape = "text", width, height, lines = 1, radius, className = "", style }) {
	if (shape === "card") return /* @__PURE__ */ React.createElement("div", {
		"aria-hidden": "true",
		className: cx("ag-skel-card", className),
		style: {
			width,
			...style
		}
	}, /* @__PURE__ */ React.createElement("span", { className: "ag-skel ag-skel--arch" }), /* @__PURE__ */ React.createElement("span", {
		className: "ag-skel ag-skel--text",
		style: {
			width: "70%",
			height: 20
		}
	}), /* @__PURE__ */ React.createElement("span", {
		className: "ag-skel ag-skel--text",
		style: { width: "45%" }
	}), /* @__PURE__ */ React.createElement("span", {
		className: "ag-skel ag-skel--text",
		style: { width: "30%" }
	}));
	if (shape === "text") return /* @__PURE__ */ React.createElement("div", {
		"aria-hidden": "true",
		className: cx("ag-skel-lines", className),
		style: {
			width,
			...style
		}
	}, Array.from({ length: Math.max(1, lines) }, (_, i) => /* @__PURE__ */ React.createElement("span", {
		key: i,
		className: "ag-skel ag-skel--text",
		style: {
			height,
			borderRadius: radius,
			width: lines > 1 && i === lines - 1 ? "60%" : undefined
		}
	})));
	return /* @__PURE__ */ React.createElement("span", {
		"aria-hidden": "true",
		className: cx("ag-skel", "ag-skel--" + shape, className),
		style: {
			width,
			height: height ?? (shape === "circle" ? width : undefined),
			borderRadius: radius,
			...style
		}
	});
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Skeleton/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/SkipLink/SkipLink.jsx
try { (() => {
const { cx } = __ds_scope;
// First element in <body>. Hidden until focused; moves focus to the target (adds tabindex="-1" if needed) without touching the URL.
function SkipLink({ href = "#main", children, className = "", onClick, ...rest }) {
	const focusTarget = (event) => {
		onClick && onClick(event);
		if (event.defaultPrevented || !href.startsWith("#")) return;
		const target = document.getElementById(href.slice(1));
		if (!target) return;
		event.preventDefault();
		if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
		target.focus();
	};
	return /* @__PURE__ */ React.createElement("a", {
		href,
		className: cx("ag-skip", className),
		onClick: focusTarget,
		...rest
	}, children);
}
Object.assign(__ds_scope, { SkipLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SkipLink/SkipLink.jsx", error: String((e && e.message) || e) }); }

// components/Stepper/Stepper.jsx
try { (() => {
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
const defaultCaption = (number, total, label) => "Step " + number + " of " + total + " · " + label;
// Checkout progress as an ordered list; done steps can be revisited with `onStepClick`.
// `compact` (phones) shows only the dots plus a "Step 2 of 3 · Label" caption.
function Stepper({ steps = [], current = 0, onStepClick, formatNumber = (number) => String(number), doneLabel, label, compact = false, captionFormat = defaultCaption, className = "" }) {
	const list = /* @__PURE__ */ React.createElement("ol", {
		"aria-label": label,
		className: cx("ag-steps", compact && "ag-steps--compact", !compact && className)
	}, steps.map((step, i) => {
		const state = i < current ? "done" : i === current ? "current" : "upcoming";
		const content = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
			className: "ag-steps__dot",
			"aria-hidden": compact || undefined
		}, state === "done" ? /* @__PURE__ */ React.createElement(Icon, {
			name: "check",
			size: 14
		}) : step.number ?? formatNumber(i + 1)), /* @__PURE__ */ React.createElement("span", { className: compact ? "ag-sr-only" : "ag-steps__label" }, step.label, state === "done" && doneLabel && /* @__PURE__ */ React.createElement("span", { className: "ag-sr-only" }, " ", doneLabel)));
		return /* @__PURE__ */ React.createElement("li", {
			key: i,
			className: cx("ag-steps__item", "ag-steps__item--" + state),
			"aria-current": state === "current" ? "step" : undefined
		}, state === "done" && onStepClick ? /* @__PURE__ */ React.createElement("button", {
			type: "button",
			className: "ag-steps__btn",
			onClick: () => onStepClick(i)
		}, content) : /* @__PURE__ */ React.createElement("span", { className: "ag-steps__btn" }, content));
	}));
	if (!compact) return list;
	const currentIndex = Math.min(Math.max(current, 0), steps.length - 1);
	const currentStep = steps[currentIndex];
	return /* @__PURE__ */ React.createElement("div", { className: cx("ag-steps-wrap", className) }, list, currentStep && /* @__PURE__ */ React.createElement("p", {
		className: "ag-steps__caption",
		"aria-hidden": "true"
	}, captionFormat(currentStep.number ?? formatNumber(currentIndex + 1), formatNumber(steps.length), currentStep.label)));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Stepper/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/Toast/Toast.jsx
try { (() => {
const { Icon } = __ds_scope;
const { Button } = __ds_scope;
const ICONS = {
	success: "circle-check",
	info: "flower-2",
	warning: "triangle-alert",
	danger: "circle-alert"
};
// The toast itself is never a click target — put the follow-up in `action` (a real button or link).
function Toast({ tone = "success", title, message, action, onClose, closeLabel = "Dismiss", style }) {
	return /* @__PURE__ */ React.createElement("div", {
		role: "status",
		className: "ag-toast",
		style
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: ICONS[tone],
		size: 20,
		className: "ag-toast__icon--" + tone
	}), /* @__PURE__ */ React.createElement("div", { className: "ag-toast__body" }, /* @__PURE__ */ React.createElement("div", { className: "ag-toast__title" }, title), message && /* @__PURE__ */ React.createElement("div", { className: "ag-toast__msg" }, message), action && /* @__PURE__ */ React.createElement(Button, {
		variant: "ghost",
		size: "sm",
		className: "ag-toast__action",
		href: action.href,
		onClick: action.onClick
	}, action.label)), onClose && /* @__PURE__ */ React.createElement("button", {
		type: "button",
		className: "ag-toast__close",
		"aria-label": closeLabel,
		onClick: onClose
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "x",
		size: 16
	})));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Toast/Toast.jsx", error: String((e && e.message) || e) }); }

// components/Tooltip/Tooltip.jsx
try { (() => {
const { cx } = __ds_scope;
// WCAG 1.4.13: the bubble describes its trigger (aria-describedby), stays open while the pointer is over it, and Esc dismisses it until the pointer or focus leaves.
function Tooltip({ content, placement = "top", open, children }) {
	const bubbleId = React.useId();
	const [hover, setHover] = React.useState(false);
	const [focus, setFocus] = React.useState(false);
	const [dismissed, setDismissed] = React.useState(false);
	const active = hover || focus;
	React.useEffect(() => {
		if (!active) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") setDismissed(true);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [active]);
	React.useEffect(() => {
		if (!active) setDismissed(false);
	}, [active]);
	// Template runtimes pass even a single child as an array, so unwrap a lone element before linking it.
	const childList = React.Children.toArray(children);
	const onlyChild = childList.length === 1 && React.isValidElement(childList[0]) ? childList[0] : null;
	const trigger = onlyChild ? React.cloneElement(onlyChild, { "aria-describedby": cx(onlyChild.props["aria-describedby"], bubbleId) }) : children;
	return /* @__PURE__ */ React.createElement("span", {
		className: cx("ag-tip", open && "ag-tip--open", dismissed && "ag-tip--dismissed"),
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		onFocus: () => setFocus(true),
		onBlur: (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) setFocus(false);
		}
	}, trigger, /* @__PURE__ */ React.createElement("span", {
		id: bubbleId,
		role: "tooltip",
		className: cx("ag-tip__bubble", placement === "bottom" && "ag-tip__bubble--bottom")
	}, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tooltip/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/utils/format.js
try { (() => {
// Shared formatting helpers: import { format } (the runtime bundle also exposes window.AG_FORMAT).
// Prices are stored in Toman; rate = units per 1 Toman. CURRENCIES holds DEMO rates: a tenant passes its own
// table as money(n, {currencies}).
const CURRENCIES = {
	IRT: {
		rate: 1,
		dec: 0,
		sym: "",
		en: "Toman",
		fa: "تومان"
	},
	IRR: {
		rate: 10,
		dec: 0,
		sym: "",
		en: "Rial",
		fa: "ریال"
	},
	USD: {
		rate: 1 / 1e5,
		dec: 2,
		sym: "$",
		en: "USD",
		fa: "دلار"
	},
	EUR: {
		rate: 1 / 11e4,
		dec: 2,
		sym: "€",
		en: "EUR",
		fa: "یورو"
	},
	AED: {
		rate: 1 / 27e3,
		dec: 0,
		sym: "",
		en: "AED",
		fa: "درهم"
	}
};
const loc = (l) => l === "fa" ? "fa-IR" : "en-US";
// Normalize separators explicitly so Persian output is stable across browser locale data.
const formatNumber = (n, lang, options = {}) => {
	const formatter = new Intl.NumberFormat(loc(lang), {
		...options,
		...lang === "fa" ? { numberingSystem: "arabext" } : {}
	});
	return formatter.formatToParts(Number(n)).map((p) => lang === "fa" ? p.type === "group" ? "٬" : p.type === "decimal" ? "٫" : p.value : p.value).join("");
};
const num = (n, lang = "en") => formatNumber(n, lang);
// fa: number then label (۴٬۲۰۰٬۰۰۰ تومان) · en: symbol first ($42.00), words after (4,200,000 Toman)
const money = (n, { currency = "IRT", lang = "en", currencies = CURRENCIES } = {}) => {
	const c = currencies[currency] || currencies.IRT || CURRENCIES.IRT;
	const s = formatNumber(Number(n) * c.rate, lang, {
		minimumFractionDigits: c.dec,
		maximumFractionDigits: c.dec
	});
	if (lang === "fa") return s + " " + c.fa;
	return c.sym ? c.sym + s : s + " " + c.en;
};
const format = {
	CURRENCIES,
	money,
	num
};
Object.assign(__ds_scope, { format });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/format.js", error: String((e && e.message) || e) }); }

__ds_ns.ICON_SVGS = __ds_scope.ICON_SVGS;
__ds_ns.cx = __ds_scope.cx;
__ds_ns.Icon = __ds_scope.Icon;
__ds_ns.Accordion = __ds_scope.Accordion;
__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.IconButton = __ds_scope.IconButton;
__ds_ns.Button = __ds_scope.Button;
__ds_ns.AddressCard = __ds_scope.AddressCard;
__ds_ns.Alert = __ds_scope.Alert;
__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;
__ds_ns.ArchFrame = __ds_scope.ArchFrame;
__ds_ns.BlogCard = __ds_scope.BlogCard;
__ds_ns.BottomTabBar = __ds_scope.BottomTabBar;
__ds_ns.Card = __ds_scope.Card;
__ds_ns.Carousel = __ds_scope.Carousel;
__ds_ns.CategoryCard = __ds_scope.CategoryCard;
__ds_ns.useField = __ds_scope.useField;
__ds_ns.FieldMessage = __ds_scope.FieldMessage;
__ds_ns.Checkbox = __ds_scope.Checkbox;
__ds_ns.Chip = __ds_scope.Chip;
__ds_ns.usePageLocale = __ds_scope.usePageLocale;
__ds_ns.choiceGroupContext = __ds_scope.choiceGroupContext;
__ds_ns.ChoiceGroup = __ds_scope.ChoiceGroup;
__ds_ns.ChoiceTile = __ds_scope.ChoiceTile;
__ds_ns.Input = __ds_scope.Input;
__ds_ns.CodeInput = __ds_scope.CodeInput;
__ds_ns.Select = __ds_scope.Select;
__ds_ns.Tabs = __ds_scope.Tabs;
__ds_ns.DatePicker = __ds_scope.DatePicker;
__ds_ns.DetailList = __ds_scope.DetailList;
__ds_ns.Dialog = __ds_scope.Dialog;
__ds_ns.EmptyState = __ds_scope.EmptyState;
__ds_ns.Gallery = __ds_scope.Gallery;
__ds_ns.LanguageSwitch = __ds_scope.LanguageSwitch;
__ds_ns.QuantityInput = __ds_scope.QuantityInput;
__ds_ns.LineItem = __ds_scope.LineItem;
__ds_ns.LiveRegion = __ds_scope.LiveRegion;
__ds_ns.LoadMore = __ds_scope.LoadMore;
__ds_ns.maps = __ds_scope.maps;
__ds_ns.LocationPicker = __ds_scope.LocationPicker;
__ds_ns.MenuList = __ds_scope.MenuList;
__ds_ns.NavLink = __ds_scope.NavLink;
__ds_ns.OrderSummary = __ds_scope.OrderSummary;
__ds_ns.OrderTimeline = __ds_scope.OrderTimeline;
__ds_ns.PaymentCard = __ds_scope.PaymentCard;
__ds_ns.PhoneInput = __ds_scope.PhoneInput;
__ds_ns.PlacesMap = __ds_scope.PlacesMap;
__ds_ns.ProductCard = __ds_scope.ProductCard;
__ds_ns.Radio = __ds_scope.Radio;
__ds_ns.RangeSlider = __ds_scope.RangeSlider;
__ds_ns.Switch = __ds_scope.Switch;
__ds_ns.ReminderRow = __ds_scope.ReminderRow;
__ds_ns.SectionHeader = __ds_scope.SectionHeader;
__ds_ns.Skeleton = __ds_scope.Skeleton;
__ds_ns.SkipLink = __ds_scope.SkipLink;
__ds_ns.Stepper = __ds_scope.Stepper;
__ds_ns.Toast = __ds_scope.Toast;
__ds_ns.Tooltip = __ds_scope.Tooltip;
__ds_ns.commerce = window.AG_COMMERCE = __ds_scope.commerce;
__ds_ns.dates = window.AG_DATES = __ds_scope.dates;
__ds_ns.format = window.AG_FORMAT = __ds_scope.format;
})();
