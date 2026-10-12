// GENERATED from components/**/*.{js,jsx} by npm --prefix templates run build. Edit the sources, not this file.
// Bundled from react-aria-components (MIT): only the names components import.
try {
(function(){var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));function l(...e){return(...t)=>{for(let n of e)typeof n==`function`&&n(...t)}}var u=o(((e,t)=>{t.exports=window.React})),d=c(u(),1);let f=typeof document<`u`?d.default.useLayoutEffect:()=>{},p={prefix:String(Math.round(Math.random()*1e10)),current:0},m=d.default.createContext(p),h=d.default.createContext(!1);typeof window<`u`&&window.document&&window.document.createElement;let g=new WeakMap;function _(e=!1){let t=(0,d.useContext)(m),n=(0,d.useRef)(null);if(n.current===null&&!e){let e=d.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;if(e){let n=g.get(e);n==null?g.set(e,{id:t.current,state:e.memoizedState}):e.memoizedState!==n.state&&(t.current=n.id,g.delete(e))}n.current=++t.current}return n.current}function v(e){let t=(0,d.useContext)(m),n=_(!!e),r=`react-aria${t.prefix}`;return e||`${r}-${n}`}function y(e){let t=d.default.useId(),[n]=(0,d.useState)(w()),r=n?`react-aria`:`react-aria${p.prefix}`;return e||`${r}-${t}`}let b=typeof d.default.useId==`function`?y:v;function x(){return!1}function S(){return!0}function C(e){return()=>{}}function w(){return typeof d.default.useSyncExternalStore==`function`?d.default.useSyncExternalStore(C,x,S):(0,d.useContext)(h)}function T(e){let[t,n]=(0,d.useState)(e),r=(0,d.useRef)(t),i=(0,d.useRef)(null),a=(0,d.useRef)(()=>{if(!i.current)return;let e=i.current.next();if(e.done){i.current=null;return}r.current===e.value?a.current():n(e.value)});return f(()=>{r.current=t,i.current&&a.current()}),[t,(0,d.useCallback)(e=>{i.current=e(r.current),a.current()},[a])]}let E=!!(typeof window<`u`&&window.document&&window.document.createElement),D=new Map,O;typeof FinalizationRegistry<`u`&&(O=new FinalizationRegistry(e=>{D.delete(e)}));let k=new WeakMap;function A(e){let[t,n]=(0,d.useState)(e),r=(0,d.useRef)(null),i=b(t),a=(0,d.useRef)(null),o=k.get(a);if(O&&o!==i&&(o!=null&&O.unregister(a),O.register(a,i,a),k.set(a,i)),E){let e=D.get(i);e&&!e.includes(r)?e.push(r):D.set(i,[r])}return f(()=>{let e=i;return()=>{O&&(O.unregister(a),k.delete(a)),D.delete(e)}},[i]),(0,d.useEffect)(()=>{let e=r.current;return e&&n(e),()=>{e&&(r.current=null)}}),i}function j(e,t){if(e===t)return e;let n=D.get(e);if(n)return n.forEach(e=>e.current=t),t;let r=D.get(t);return r?(r.forEach(t=>t.current=e),e):t}function M(e=[]){let t=A(),[n,r]=T(t),i=(0,d.useCallback)(()=>{r(function*(){yield t,yield document.getElementById(t)?t:void 0})},[t,r]);return f(i,[t,i,...e]),n}function N(...e){return e.length===1&&e[0]?e[0]:t=>{let n=!1,r=e.map(e=>{let r=ee(e,t);return n||=typeof r==`function`,r});if(n)return()=>{r.forEach((t,n)=>{typeof t==`function`?t():ee(e[n],null)})}}}function ee(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function P(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=P(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function te(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=P(e))&&(r&&(r+=` `),r+=t);return r}function F(...e){let t={...e[0]};for(let n=1;n<e.length;n++){let r=e[n];for(let e in r){let n=t[e],i=r[e];typeof n==`function`&&typeof i==`function`&&e[0]===`o`&&e[1]===`n`&&e.charCodeAt(2)>=65&&e.charCodeAt(2)<=90?t[e]=l(n,i):(e===`className`||e===`UNSAFE_className`)&&typeof n==`string`&&typeof i==`string`?t[e]=te(n,i):e===`id`&&n&&i?t.id=j(n,i):e===`ref`&&n&&i?t.ref=N(n,i):t[e]=i===void 0?n:i}}return t}function I(e){let t=(0,d.useRef)(null),n=(0,d.useRef)(void 0),r=(0,d.useCallback)(t=>{if(typeof e==`function`){let n=e,r=n(t);return()=>{typeof r==`function`?r():n(null)}}if(e)return e.current=t,()=>{e.current=null}},[e]);return(0,d.useMemo)(()=>({get current(){return t.current},set current(e){t.current=e,n.current&&=(n.current(),void 0),e!=null&&(n.current=r(e))}}),[r])}let L=Symbol(`default`);function R({values:e,children:t}){for(let[n,r]of e)t=d.default.createElement(n.Provider,{value:r},t);return t}function z(e){let{className:t,style:n,children:r,defaultClassName:i,defaultChildren:a,defaultStyle:o,values:s,render:c}=e;return(0,d.useMemo)(()=>{let e,l,u;return e=typeof t==`function`?t({...s,defaultClassName:i}):t,l=typeof n==`function`?n({...s,defaultStyle:o||{}}):n,u=typeof r==`function`?r({...s,defaultChildren:a}):r??a,{className:e??i,style:l||o?{...o,...l}:void 0,children:u??a,"data-rac":``,render:c?e=>c(e,s):void 0}},[t,n,r,i,a,o,s,c])}function B(e,t){let n=(0,d.useContext)(e);if(t===null)return null;if(n&&typeof n==`object`&&`slots`in n&&n.slots){let e=t||L;if(!n.slots[e]){let e=new Intl.ListFormat().format(Object.keys(n.slots).map(e=>`"${e}"`)),r=t?`Invalid slot "${t}".`:`A slot prop is required.`;throw Error(`${r} Valid slot names are ${e}.`)}return n.slots[e]}return n}function V(e,t,n){let{ref:r,...i}=B(n,e.slot)||{},a=I((0,d.useMemo)(()=>N(t,r),[t,r])),o=F(i,e);return`style`in i&&i.style&&`style`in e&&e.style&&(o.style=typeof i.style==`function`||typeof e.style==`function`?t=>{let n=typeof i.style==`function`?i.style(t):i.style,r={...t.defaultStyle,...n},a=typeof e.style==`function`?e.style({...t,defaultStyle:r}):e.style;return{...r,...a}}:{...i.style,...e.style}),[o,a]}function ne(e=!0){let[t,n]=(0,d.useState)(e),r=(0,d.useRef)(!1),i=(0,d.useCallback)(e=>{r.current=!0,n(!!e)},[]);return f(()=>{r.current||n(!1)},[]),[i,t]}function re(e){let t=/^(data-.*)$/,n={};for(let r in e)t.test(r)||(n[r]=e[r]);return n}function ie(e,t,n){let{render:r,...i}=t,a=(0,d.useRef)(null),o=(0,d.useMemo)(()=>N(n,a),[n,a]);f(()=>{},[e,r]);let s={...i,ref:o};return r?r(s,void 0):d.default.createElement(e,s)}let ae={},H=new Proxy({},{get(e,t){if(typeof t!=`string`)return;let n=ae[t];return n||(n=(0,d.forwardRef)(ie.bind(null,t)),ae[t]=n),n}}),U=e=>se(e)?e.document:ce(e)?e:e?.ownerDocument??(typeof document<`u`?document:void 0),W=e=>U(e)?.defaultView??(typeof window<`u`?window:void 0);function oe(e){return typeof e==`object`&&!!e&&`nodeType`in e&&typeof e.nodeType==`number`}function se(e){return typeof e==`object`&&!!e&&`window`in e&&e.window===e}function ce(e){return oe(e)&&e.nodeType===9}function le(e){return oe(e)&&e.nodeType===11&&`host`in e}function ue(e,t,n,r){if(n==null||e==null)return()=>{};let i=Array.isArray(e)?e:[e];for(let e of i)e.addEventListener(t,n,r);return()=>{for(let e of i)e.removeEventListener(t,n,r)}}function de(e,t,n,r){if(e==null)return()=>{};let i=[],a=Array.isArray(e)?e:[e];for(let e of a){let a=e.style.getPropertyValue(t),o=e.style.getPropertyPriority(t);e.style.setProperty(t,n,r),i.unshift(()=>{a?e.style.setProperty(t,a,o):e.style.removeProperty(t)})}return()=>{for(let e of i)e()}}function fe(){return!1}function G(e,t){if(!fe())return t&&e?e.contains(t):!1;if(!e||!t)return!1;let n=t;for(;n!==null;){if(n===e)return!0;n=typeof n.assignedElements!=`function`&&n.assignedSlot?.parentNode?n.assignedSlot.parentNode:le(n)?n.host:n.parentNode}return!1}let K=(e=document)=>{if(!fe())return e.activeElement;let t=e.activeElement;for(;t&&`shadowRoot`in t&&t.shadowRoot?.activeElement;)t=t.shadowRoot.activeElement;return t};function q(e){if(fe()&&e.target instanceof Element&&e.target.shadowRoot){if(`composedPath`in e)return e.composedPath()[0]??null;if(`composedPath`in e.nativeEvent)return e.nativeEvent.composedPath()[0]??null}return e.target}function pe(e){if(!e)return!1;let t=e.getRootNode(),n=W(e);if(!(t instanceof n.Document||t instanceof n.ShadowRoot))return!1;let r=t.activeElement;return r!=null&&e.contains(r)}function me(e){let t=_e(U(e));t!==e&&(t&&he(t,e),e&&ge(e,t))}function he(e,t){e.dispatchEvent(new FocusEvent(`blur`,{relatedTarget:t})),e.dispatchEvent(new FocusEvent(`focusout`,{bubbles:!0,relatedTarget:t}))}function ge(e,t){e.dispatchEvent(new FocusEvent(`focus`,{relatedTarget:t})),e.dispatchEvent(new FocusEvent(`focusin`,{bubbles:!0,relatedTarget:t}))}function _e(e){let t=K(e),n=t?.getAttribute(`aria-activedescendant`);return n&&e.getElementById(n)||t}function ve(e){if(be())e.focus({preventScroll:!0});else{let t=xe(e);e.focus(),Se(t)}}let ye=null;function be(){if(ye==null){ye=!1;try{document.createElement(`div`).focus({get preventScroll(){return ye=!0,!0}})}catch{}}return ye}function xe(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Se(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}let Ce=typeof Element<`u`&&`checkVisibility`in Element.prototype;function we(e){let t=W(e);if(!(e instanceof t.HTMLElement)&&!(e instanceof t.SVGElement))return!1;let{display:n,visibility:r}=e.style,i=n!==`none`&&r!==`hidden`&&r!==`collapse`;if(i){let{getComputedStyle:t}=W(e),{display:n,visibility:r}=t(e);i=n!==`none`&&r!==`hidden`&&r!==`collapse`}return i}function Te(e,t){return!e.hasAttribute(`hidden`)&&!e.hasAttribute(`data-react-aria-prevent-focus`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function Ee(e,t){return Ce?e.checkVisibility({visibilityProperty:!0})&&!e.closest(`[data-react-aria-prevent-focus]`):e.nodeName!==`#comment`&&we(e)&&Te(e,t)&&(!e.parentElement||Ee(e.parentElement,e))}let De=[`input:not([disabled]):not([type=hidden])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`summary`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable^="false"])`,`permission`],Oe=De.join(`:not([hidden]),`)+`,[tabindex]:not([disabled]):not([hidden])`;De.push(`[tabindex]:not([tabindex="-1"]):not([disabled])`);let ke=De.join(`:not([hidden]):not([tabindex="-1"]),`);function Ae(e,t){return e.matches(Oe)&&!Me(e)&&(t?.skipVisibilityCheck||Ee(e))}function je(e){return e.matches(ke)&&Ee(e)&&!Me(e)}function Me(e){let t=e;for(;t!=null;){if(t instanceof W(t).HTMLElement&&t.inert)return!0;t=t.parentElement}return!1}function Ne(e){let t=e;return t.nativeEvent=e,t.isDefaultPrevented=()=>t.defaultPrevented,t.isPropagationStopped=()=>t.cancelBubble,t.persist=()=>{},t}function Pe(e,t){Object.defineProperty(e,"target",{value:t}),Object.defineProperty(e,"currentTarget",{value:t})}function Fe(e){let t=(0,d.useRef)({isFocused:!1,observer:null});return f(()=>{let e=t.current;return()=>{e.observer&&=(e.observer.disconnect(),null)}},[]),(0,d.useCallback)(n=>{let r=q(n);if(r instanceof HTMLButtonElement||r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement){t.current.isFocused=!0;let n=r;n.addEventListener(`focusout`,r=>{if(t.current.isFocused=!1,n.disabled){let t=Ne(r);e?.(t)}t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)},{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&n.disabled){t.current.observer?.disconnect();let e=n===K()?null:K();n.dispatchEvent(new FocusEvent(`blur`,{relatedTarget:e})),n.dispatchEvent(new FocusEvent(`focusout`,{bubbles:!0,relatedTarget:e}))}}),t.current.observer.observe(n,{attributes:!0,attributeFilter:[`disabled`]})}},[e])}let Ie=!1;function Le(e){for(;e&&!Ae(e,{skipVisibilityCheck:!0});)e=e.parentElement;let t=W(e),n=K(t.document);if(!n||n===e)return;let r=e?.getRootNode(),i=r!=null&&le(r)?r:W(e),a=t=>t===e||t!=null&&G(e,t),o=e=>e===n||n!=null&&e!=null&&G(n,e);Ie=!0;let s=!1,c=e=>{(o(q(e))||s)&&e.stopImmediatePropagation()},l=t=>{(o(q(t))||s)&&(t.stopImmediatePropagation(),!e&&!s&&(s=!0,ve(n),f()))},u=e=>{(a(q(e))||s)&&e.stopImmediatePropagation()},d=e=>{(a(q(e))||s)&&(e.stopImmediatePropagation(),s||(s=!0,ve(n),f()))};i.addEventListener(`blur`,c,!0),i.addEventListener(`focusout`,l,!0),i.addEventListener(`focusin`,d,!0),i.addEventListener(`focus`,u,!0);let f=()=>{cancelAnimationFrame(p),i.removeEventListener(`blur`,c,!0),i.removeEventListener(`focusout`,l,!0),i.removeEventListener(`focusin`,d,!0),i.removeEventListener(`focus`,u,!0),Ie=!1,s=!1},p=requestAnimationFrame(f);return f}function Re(e){if(typeof window>`u`||window.navigator==null)return!1;let t=window.navigator.userAgentData?.brands;return Array.isArray(t)&&t.some(t=>e.test(t.brand))||e.test(window.navigator.userAgent)}function ze(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Be(e){let t=null;return()=>(t??=e(),t)}let Ve=Be(function(){return ze(/^Mac/i)}),He=Be(function(){return ze(/^iPhone/i)}),Ue=Be(function(){return ze(/^iPad/i)||Ve()&&navigator.maxTouchPoints>1}),We=Be(function(){return He()||Ue()}),Ge=Be(function(){return Ve()||We()}),Ke=Be(function(){return Re(/AppleWebKit/i)&&(We()||!qe())}),qe=Be(function(){return Re(/Chrome|CriOS|CrMo/i)}),Je=Be(function(){return Re(/Android/i)}),Ye=Be(function(){return Re(/(Firefox|FxiOS)/i)});function Xe(e){return e.pointerType===``&&e.isTrusted?!0:Je()&&e.pointerType?e.type===`click`&&e.buttons===1:e.detail===0&&!e.pointerType}function Ze(e){return!Je()&&e.width===0&&e.height===0||Je()&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType===`mouse`}let Qe=(0,d.createContext)({isNative:!0,open:nt,useHref:e=>e});function $e(){return(0,d.useContext)(Qe)}function et(e,t,n=!0){let{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}=t;!Ke()&&Ye()&&window.event?.type?.startsWith(`key`)&&e.target===`_blank`&&(Ve()?r=!0:i=!0);let s=Ke()&&Ve()&&!Ue()?new KeyboardEvent(`keydown`,{keyIdentifier:`Enter`,metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}):new MouseEvent(`click`,{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o,detail:1,bubbles:!0,cancelable:!0});et.isOpening=n,ve(e),e.dispatchEvent(s),et.isOpening=!1}et.isOpening=!1;function tt(e,t){if(e instanceof HTMLAnchorElement)t(e);else if(e.hasAttribute(`data-href`)){let n=document.createElement(`a`);n.href=e.getAttribute(`data-href`),e.hasAttribute(`data-target`)&&(n.target=e.getAttribute(`data-target`)),e.hasAttribute(`data-rel`)&&(n.rel=e.getAttribute(`data-rel`)),e.hasAttribute(`data-download`)&&(n.download=e.getAttribute(`data-download`)),e.hasAttribute(`data-ping`)&&(n.ping=e.getAttribute(`data-ping`)),e.hasAttribute(`data-referrer-policy`)&&(n.referrerPolicy=e.getAttribute(`data-referrer-policy`)),e.appendChild(n),t(n),e.removeChild(n)}}function nt(e,t){tt(e,e=>et(e,t))}function rt(e){let t=$e().useHref(e?.href??``),n={};if(e)for(let r of[`href`,`target`,`rel`,`download`,`ping`,`referrerPolicy`])r in e&&e[r]!==void 0&&(n[r]=r===`href`?t:e[r]);return n}let it=null,at=new Set,ot=new Map,st=!1,ct=!1,lt={Tab:!0,Escape:!0};function ut(e,t){for(let n of at)n(e,t)}function dt(e){return!(e.metaKey||!Ve()&&e.altKey||e.ctrlKey||e.key===`Control`||e.key===`Shift`||e.key===`Meta`)}function ft(e){st=!0,!et.isOpening&&dt(e)&&(it=`keyboard`,ut(`keyboard`,e))}function pt(e){it=`pointer`,`pointerType`in e&&e.pointerType,(e.type===`mousedown`||e.type===`pointerdown`)&&(st=!0,ut(`pointer`,e))}function mt(e){!et.isOpening&&Xe(e)&&(st=!0,it=`virtual`)}function ht(e){if(Ie)return;let t=q(e),n=W(t),r=U(t);if(t===n){ct=!0;return}t!==r&&e.isTrusted&&(!st&&!ct&&(it=`virtual`,ut(`virtual`,e)),st=!1,ct=!1)}function gt(){Ie||(st=!1,ct=!0)}function _t(e){if(typeof window>`u`||typeof document>`u`)return;let t=W(e),n=U(e);if(ot.get(t))return;let r=t.HTMLElement.prototype.focus;Reflect.defineProperty(t.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(){st=!0,r.apply(this,arguments)}}),n.addEventListener(`keydown`,ft,!0),n.addEventListener(`keyup`,ft,!0),n.addEventListener(`click`,mt,!0),t.addEventListener(`focus`,ht,!0),t.addEventListener(`blur`,gt,!1),typeof PointerEvent<`u`&&(n.addEventListener(`pointerdown`,pt,!0),n.addEventListener(`pointermove`,pt,!0),n.addEventListener(`pointerup`,pt,!0)),t.addEventListener(`beforeunload`,()=>{vt(e)},{once:!0}),ot.set(t,{focus:r})}let vt=(e,t)=>{let n=W(e),r=U(e);t&&r.removeEventListener(`DOMContentLoaded`,t),ot.has(n)&&(Reflect.defineProperty(n.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:ot.get(n).focus}),r.removeEventListener(`keydown`,ft,!0),r.removeEventListener(`keyup`,ft,!0),r.removeEventListener(`click`,mt,!0),n.removeEventListener(`focus`,ht,!0),n.removeEventListener(`blur`,gt,!1),typeof PointerEvent<`u`&&(r.removeEventListener(`pointerdown`,pt,!0),r.removeEventListener(`pointermove`,pt,!0),r.removeEventListener(`pointerup`,pt,!0)),ot.delete(n))};function yt(e){let t=U(e),n;return t.readyState===`loading`?(n=()=>{_t(e)},t.addEventListener(`DOMContentLoaded`,n)):_t(e),()=>vt(e,n)}typeof document<`u`&&yt();function bt(){return it!==`pointer`}function xt(){return it}function St(e){it=e,ut(e,null)}let Ct=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function wt(e,t,n){let r=n?q(n):void 0,i=U(r),a=W(r),o=a===void 0?HTMLInputElement:a.HTMLInputElement,s=a===void 0?HTMLTextAreaElement:a.HTMLTextAreaElement,c=a===void 0?HTMLElement:a.HTMLElement,l=a===void 0?KeyboardEvent:a.KeyboardEvent,u=K(i);return e=e||u instanceof o&&!Ct.has(u.type)||u instanceof s||u instanceof c&&u.isContentEditable,!(e&&t===`keyboard`&&n instanceof l&&!lt[n.key])}function Tt(e,t,n){_t(),(0,d.useEffect)(()=>{if(n?.enabled===!1)return;let t=(t,r)=>{wt(!!n?.isTextInput,t,r)&&e(bt())};return at.add(t),()=>{at.delete(t)}},t)}function Et(e){return Ve()?e.metaKey:e.ctrlKey}let Dt=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function Ot(e){return e instanceof HTMLInputElement&&!Dt.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}let kt=d.default.useInsertionEffect??f;function J(e){let t=(0,d.useRef)(null);return kt(()=>{t.current=e},[e]),(0,d.useCallback)((...e)=>{let n=t.current;return n?.(...e)},[])}function At(e,t,n,r){let i=J(n),a=n==null;(0,d.useEffect)(()=>{if(!(a||e.current==null))return ue(e.current,t,i,r)},[e,t,r,a])}function jt(e,t){let{id:n,"aria-label":r,"aria-labelledby":i}=e;return n=A(n),i&&r?i=[...new Set([n,...i.trim().split(/\s+/)])].join(` `):i&&=i.trim().split(/\s+/).join(` `),!r&&!i&&t&&(r=t),{id:n,"aria-label":r,"aria-labelledby":i}}let Mt=new Set([`Arab`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Nt=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Pt(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize(),n=typeof t.getTextInfo==`function`?t.getTextInfo():t.textInfo;if(n)return n.direction===`rtl`;if(t.script)return Mt.has(t.script)}let t=e.split(`-`)[0];return Nt.has(t)}let Ft=Symbol.for(`react-aria.i18n.locale`);function It(){let e=typeof window<`u`&&window[Ft]||typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e=`en-US`}return{locale:e,direction:Pt(e)?`rtl`:`ltr`}}let Lt=It(),Rt=new Set;function zt(){Lt=It();for(let e of Rt)e(Lt)}function Bt(){let e=w(),[t,n]=(0,d.useState)(Lt);return(0,d.useEffect)(()=>(Rt.size===0&&window.addEventListener(`languagechange`,zt),Rt.add(n),()=>{Rt.delete(n),Rt.size===0&&window.removeEventListener(`languagechange`,zt)}),[]),e?{locale:typeof window<`u`&&window[Ft]||`en-US`,direction:`ltr`}:t}let Vt=d.default.createContext(null);function Ht(e){let{locale:t,children:n}=e,r=d.default.useMemo(()=>({locale:t,direction:Pt(t)?`rtl`:`ltr`}),[t]);return d.default.createElement(Vt.Provider,{value:r},n)}function Ut(e){let{children:t}=e,n=Bt();return d.default.createElement(Vt.Provider,{value:n},t)}function Wt(e){let{locale:t,children:n}=e;return t?d.default.createElement(Ht,{locale:t,children:n}):d.default.createElement(Ut,{children:n})}function Gt(){let e=Bt();return(0,d.useContext)(Vt)||e}let Kt=Symbol.for(`react-aria.i18n.locale`),qt=Symbol.for(`react-aria.i18n.strings`),Jt;var Yt=class e{constructor(e,t=`en-US`){this.strings=Object.fromEntries(Object.entries(e).filter(([,e])=>e)),this.defaultLocale=t}getStringForLocale(e,t){let n=this.getStringsForLocale(t)[e];if(!n)throw Error(`Could not find intl message ${e} in ${t} locale`);return n}getStringsForLocale(e){let t=this.strings[e];return t||(t=Xt(e,this.strings,this.defaultLocale),this.strings[e]=t),t}static getGlobalDictionaryForPackage(t){if(typeof window>`u`)return null;let n=window[Kt];if(Jt===void 0){let t=window[qt];if(!t)return null;Jt={};for(let r in t)Jt[r]=new e({[n]:t[r]},n)}let r=Jt?.[t];if(!r)throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);return r}};function Xt(e,t,n=`en-US`){if(t[e])return t[e];let r=Zt(e),i=Qt(e);if(i&&t[`${r}-${i}`])return t[`${r}-${i}`];if(t[r])return t[r];for(let e in t)if(e.startsWith(r+`-`))return t[e];return t[n]}function Zt(e){return Intl.Locale?new Intl.Locale(e).language:e.split(`-`)[0]}function Qt(e){if(Intl.Locale)return new Intl.Locale(e).script}let $t=new Map,en=new Map;var tn=class{constructor(e,t){this.locale=e,this.strings=t}format(e,t){let n=this.strings.getStringForLocale(e,this.locale);return typeof n==`function`?n(t,this):n}plural(e,t,n=`cardinal`){let r=t[`=`+e];if(r)return typeof r==`function`?r():r;let i=this.locale+`:`+n,a=$t.get(i);return a||(a=new Intl.PluralRules(this.locale,{type:n}),$t.set(i,a)),r=t[a.select(e)]||t.other,typeof r==`function`?r():r}number(e){let t=en.get(this.locale);return t||(t=new Intl.NumberFormat(this.locale),en.set(this.locale,t)),t.format(e)}select(e,t){let n=e[t]||e.other;return typeof n==`function`?n():n}};let nn=new WeakMap;function rn(e){let t=nn.get(e);return t||(t=new Yt(e),nn.set(e,t)),t}function an(e,t){return t&&Yt.getGlobalDictionaryForPackage(t)||rn(e)}function on(e,t){let{locale:n}=Gt(),r=an(e,t);return(0,d.useMemo)(()=>new tn(n,r),[n,r])}let sn=typeof document<`u`?d.default.useInsertionEffect??d.default.useLayoutEffect:()=>{};function cn(e,t,n){let[r,i]=(0,d.useState)(e||t),a=(0,d.useRef)(r),o=(0,d.useRef)(e!==void 0),s=e!==void 0;(0,d.useEffect)(()=>{o.current,o.current=s},[s]);let c=s?e:r;sn(()=>{a.current=c});let[,l]=(0,d.useReducer)(()=>({}),{});return[c,(0,d.useCallback)((e,...t)=>{let r=typeof e==`function`?e(a.current):e;Object.is(a.current,r)||(a.current=r,i(r),l(),n?.(r,...t))},[n])]}let ln=(0,d.createContext)(null);var un=class{constructor(e){this.value=null,this.level=0,this.hasChildNodes=!1,this.rendered=null,this.textValue=``,this[`aria-label`]=void 0,this.index=0,this.parentKey=null,this.prevKey=null,this.nextKey=null,this.firstChildKey=null,this.lastChildKey=null,this.props={},this.colSpan=null,this.colIndex=null,this.type=this.constructor.type,this.key=e}get childNodes(){throw Error(`childNodes is not supported`)}clone(){let e=new this.constructor(this.key);return e.value=this.value,e.level=this.level,e.hasChildNodes=this.hasChildNodes,e.rendered=this.rendered,e.textValue=this.textValue,e[`aria-label`]=this[`aria-label`],e.index=this.index,e.parentKey=this.parentKey,e.prevKey=this.prevKey,e.nextKey=this.nextKey,e.firstChildKey=this.firstChildKey,e.lastChildKey=this.lastChildKey,e.props=this.props,e.render=this.render,e.colSpan=this.colSpan,e.colIndex=this.colIndex,e}filter(e,t,n){let r=this.clone();return t.addDescendants(r,e),r}},dn=class extends un{filter(e,t,n){let[r,i]=pn(e,t,this.firstChildKey,n),a=this.clone();return a.firstChildKey=r,a.lastChildKey=i,a}};(class extends un{static{this.type=`header`}}),class extends un{static{this.type=`loader`}},class extends dn{static{this.type=`item`}filter(e,t,n){if(n(this.textValue,this)){let n=this.clone();return t.addDescendants(n,e),n}return null}},class extends dn{static{this.type=`section`}filter(e,t,n){let r=super.filter(e,t,n);if(r&&r.lastChildKey!==null){let t=e.getItem(r.lastChildKey);if(t&&t.type!==`header`)return r}return null}};var fn=class{get size(){return this.itemCount}getKeys(){return this.keyMap.keys()}*[Symbol.iterator](){let e=this.firstKey==null?void 0:this.keyMap.get(this.firstKey);for(;e;)yield e,e=e.nextKey==null?void 0:this.keyMap.get(e.nextKey)}getChildren(e){let t=this.keyMap;return{*[Symbol.iterator](){let n=t.get(e),r=n?.firstChildKey==null?null:t.get(n.firstChildKey);for(;r;)yield r,r=r.nextKey==null?void 0:t.get(r.nextKey)}}}getKeyBefore(e){let t=this.keyMap.get(e);if(!t)return null;if(t.prevKey!=null){for(t=this.keyMap.get(t.prevKey);t&&t.type!==`item`&&t.lastChildKey!=null;)t=this.keyMap.get(t.lastChildKey);return t?.key??null}return t.parentKey}getKeyAfter(e){let t=this.keyMap.get(e);if(!t)return null;if(t.type!==`item`&&t.firstChildKey!=null)return t.firstChildKey;for(;t;){if(t.nextKey!=null)return t.nextKey;if(t.parentKey!=null)t=this.keyMap.get(t.parentKey);else return null}return null}getFirstKey(){return this.firstKey}getLastKey(){let e=this.lastKey==null?null:this.keyMap.get(this.lastKey);for(;e?.lastChildKey!=null;)e=this.keyMap.get(e.lastChildKey);return e?.key??null}getItem(e){return this.keyMap.get(e)??null}at(){throw Error(`Not implemented`)}clone(){let e=this.constructor,t=new e;return t.keyMap=new Map(this.keyMap),t.firstKey=this.firstKey,t.lastKey=this.lastKey,t.itemCount=this.itemCount,t}addNode(e){if(this.frozen)throw Error(`Cannot add a node to a frozen collection`);e.type===`item`&&this.keyMap.get(e.key)==null&&this.itemCount++,this.keyMap.set(e.key,e)}addDescendants(e,t){this.addNode(e);let n=t.getChildren(e.key);for(let e of n)this.addDescendants(e,t)}removeNode(e){if(this.frozen)throw Error(`Cannot remove a node to a frozen collection`);let t=this.keyMap.get(e);t!=null&&t.type===`item`&&this.itemCount--,this.keyMap.delete(e)}commit(e,t,n=!1){if(this.frozen)throw Error(`Cannot commit a frozen collection`);this.firstKey=e,this.lastKey=t,this.frozen=!n}filter(e){let t=new this.constructor,[n,r]=pn(this,t,this.firstKey,e);return t?.commit(n,r),t}constructor(){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.frozen=!1,this.itemCount=0}};function pn(e,t,n,r){if(n==null)return[null,null];let i=null,a=null,o=e.getItem(n);for(;o!=null;){let n=o.filter(e,t,r);n!=null&&(n.nextKey=null,a&&(n.prevKey=a.key,a.nextKey=n.key),i??=n,t.addNode(n),a=n),o=o.nextKey==null?null:e.getItem(o.nextKey)}if(a&&a.type===`separator`){let e=a.prevKey;t.removeNode(a.key),e==null?a=null:(a=t.getItem(e),a.nextKey=null)}return[i?.key??null,a?.key??null]}var mn=class{constructor(e){this._firstChild=null,this._lastChild=null,this._previousSibling=null,this._nextSibling=null,this._parentNode=null,this._minInvalidChildIndex=null,this.ownerDocument=e}*[Symbol.iterator](){let e=this.firstChild;for(;e;)yield e,e=e.nextSibling}get firstChild(){return this._firstChild}set firstChild(e){this._firstChild=e,this.ownerDocument.markDirty(this)}get lastChild(){return this._lastChild}set lastChild(e){this._lastChild=e,this.ownerDocument.markDirty(this)}get previousSibling(){return this._previousSibling}set previousSibling(e){this._previousSibling=e,this.ownerDocument.markDirty(this)}get nextSibling(){return this._nextSibling}set nextSibling(e){this._nextSibling=e,this.ownerDocument.markDirty(this)}get parentNode(){return this._parentNode}set parentNode(e){this._parentNode=e,this.ownerDocument.markDirty(this)}get isConnected(){return this.parentNode?.isConnected||!1}invalidateChildIndices(e){(this._minInvalidChildIndex==null||!this._minInvalidChildIndex.isConnected||e.index<this._minInvalidChildIndex.index)&&(this._minInvalidChildIndex=e,this.ownerDocument.markDirty(this))}updateChildIndices(){let e=this._minInvalidChildIndex;for(;e;)e.index=e.previousSibling?e.previousSibling.index+1:0,e=e.nextSibling;this._minInvalidChildIndex=null}appendChild(e){e.parentNode&&e.parentNode.removeChild(e),this.firstChild??=e,this.lastChild?(this.lastChild.nextSibling=e,e.index=this.lastChild.index+1,e.previousSibling=this.lastChild):(e.previousSibling=null,e.index=0),e.parentNode=this,e.nextSibling=null,this.lastChild=e,this.ownerDocument.markDirty(this),this.isConnected&&this.ownerDocument.queueUpdate()}insertBefore(e,t){if(t==null)return this.appendChild(e);e.parentNode&&e.parentNode.removeChild(e),e.nextSibling=t,e.previousSibling=t.previousSibling,e.index=t.index-1,this.firstChild===t?this.firstChild=e:t.previousSibling&&(t.previousSibling.nextSibling=e),t.previousSibling=e,e.parentNode=t.parentNode,this.invalidateChildIndices(e),this.isConnected&&this.ownerDocument.queueUpdate()}removeChild(e){e.parentNode===this&&(this._minInvalidChildIndex===e&&(this._minInvalidChildIndex=null),e.nextSibling&&(this.invalidateChildIndices(e.nextSibling),e.nextSibling.previousSibling=e.previousSibling),e.previousSibling&&(e.previousSibling.nextSibling=e.nextSibling),this.firstChild===e&&(this.firstChild=e.nextSibling),this.lastChild===e&&(this.lastChild=e.previousSibling),e.parentNode=null,e.nextSibling=null,e.previousSibling=null,e.index=0,this.ownerDocument.markDirty(e),this.isConnected&&this.ownerDocument.queueUpdate())}addEventListener(){}removeEventListener(){}get previousVisibleSibling(){let e=this.previousSibling;for(;e&&e.isHidden;)e=e.previousSibling;return e}get nextVisibleSibling(){let e=this.nextSibling;for(;e&&e.isHidden;)e=e.nextSibling;return e}get firstVisibleChild(){let e=this.firstChild;for(;e&&e.isHidden;)e=e.nextSibling;return e}get lastVisibleChild(){let e=this.lastChild;for(;e&&e.isHidden;)e=e.previousSibling;return e}},hn=class e extends mn{constructor(e,t){super(t),this.nodeType=8,this.isMutated=!0,this._index=0,this.isHidden=!1,this.node=null}get index(){return this._index}set index(e){this._index=e,this.ownerDocument.markDirty(this)}get level(){return this.parentNode instanceof e?this.parentNode.level+ +(this.parentNode.node?.type===`item`):0}getMutableNode(){return this.node==null?null:(this.isMutated||=(this.node=this.node.clone(),!0),this.ownerDocument.markDirty(this),this.node)}updateNode(){let t=this.nextVisibleSibling,n=this.getMutableNode();if(n!=null&&(n.index=this.index,n.level=this.level,n.parentKey=this.parentNode instanceof e?this.parentNode.node?.key??null:null,n.prevKey=this.previousVisibleSibling?.node?.key??null,n.nextKey=t?.node?.key??null,n.hasChildNodes=!!this.firstChild,n.firstChildKey=this.firstVisibleChild?.node?.key??null,n.lastChildKey=this.lastVisibleChild?.node?.key??null,(n.colSpan!=null||n.colIndex!=null)&&t)){let e=(n.colIndex??n.index)+(n.colSpan??1);if(t.node!=null&&e!==t.node.colIndex){let n=t.getMutableNode();n.colIndex=e}}}setProps(e,t,n,r,i){let a,{value:o,textValue:s,id:c,...l}=e;if(this.node==null?(a=new n(c??`react-aria-${++this.ownerDocument.nodeId}`),this.node=a):a=this.getMutableNode(),l.ref=t,a.props=l,a.rendered=r,a.render=i,a.value=o,e[`aria-label`]&&(a[`aria-label`]=e[`aria-label`]),a.textValue=s||(typeof l.children==`string`?l.children:``)||e[`aria-label`]||``,c!=null&&c!==a.key)throw Error(`Cannot change the id of an item`);l.colSpan!=null&&(a.colSpan=l.colSpan),this.isConnected&&this.ownerDocument.queueUpdate()}get style(){let e=this;return{get display(){return e.isHidden?`none`:``},set display(t){let n=t===`none`;if(e.isHidden!==n){(e.parentNode?.firstVisibleChild===e||e.parentNode?.lastVisibleChild===e)&&e.ownerDocument.markDirty(e.parentNode);let t=e.previousVisibleSibling,r=e.nextVisibleSibling;t&&e.ownerDocument.markDirty(t),r&&e.ownerDocument.markDirty(r),e.isHidden=n,e.ownerDocument.markDirty(e)}}}}hasAttribute(){}setAttribute(){}setAttributeNS(){}removeAttribute(){}},gn=class extends mn{constructor(e){super(null),this.nodeType=11,this.ownerDocument=this,this.dirtyNodes=new Set,this.isSSR=!1,this.nodeId=0,this.nodesByProps=new WeakMap,this.nextCollection=null,this.subscriptions=new Set,this.queuedRender=!1,this.inSubscription=!1,this.collection=e,this.nextCollection=e}get isConnected(){return!0}createElement(e){return new hn(e,this)}getMutableCollection(){return this.nextCollection||=this.collection.clone(),this.nextCollection}markDirty(e){this.dirtyNodes.add(e)}addNode(e){if(e.isHidden||e.node==null)return;let t=this.getMutableCollection();if(!t.getItem(e.node.key))for(let t of e)this.addNode(t);t.addNode(e.node)}removeNode(e){for(let t of e)this.removeNode(t);e.node&&this.getMutableCollection().removeNode(e.node.key)}getCollection(){return this.inSubscription?this.collection:(this.queuedRender=!1,this.updateCollection(),this.collection)}updateCollection(){for(let e of this.dirtyNodes)e instanceof hn&&(!e.isConnected||e.isHidden)?this.removeNode(e):e.updateChildIndices();for(let e of this.dirtyNodes)e instanceof hn?(e.isConnected&&!e.isHidden&&(e.updateNode(),this.addNode(e)),e.node&&this.dirtyNodes.delete(e),e.isMutated=!1):this.dirtyNodes.delete(e);this.nextCollection&&(this.nextCollection.commit(this.firstVisibleChild?.node?.key??null,this.lastVisibleChild?.node?.key??null,this.isSSR),this.isSSR||(this.collection=this.nextCollection,this.nextCollection=null))}queueUpdate(){if(!(this.dirtyNodes.size===0||this.queuedRender)){this.queuedRender=!0,this.inSubscription=!0,this.isSSR||(this.collection=this.collection.clone());for(let e of this.subscriptions)e();this.inSubscription=!1}}subscribe(e){return this.subscriptions.add(e),this.queuedRender&&e(),()=>this.subscriptions.delete(e)}resetAfterSSR(){this.isSSR&&(this.isSSR=!1,this.firstChild=null,this.lastChild=null,this.nodeId=0)}};function _n(e){let{children:t,items:n,idScope:r,addIdAndValue:i,dependencies:a=[]}=e,o=(0,d.useMemo)(()=>void 0,[t]),s=(0,d.useMemo)(()=>new WeakMap,[...a,o]);return(0,d.useMemo)(()=>{if(n&&typeof t==`function`){let e=[];for(let a of n){let n=vn(a)?a:null,o=n?s.get(n):null;if(!o){o=t(a);let c=o.props.id??a?.key??a?.id;r!=null&&o.props.id==null&&c!=null&&(c=r+`:`+c);let l=c??e.length;o=(0,d.cloneElement)(o,i?{key:l,id:c,value:a}:{key:l}),n&&s.set(n,o)}e.push(o)}return e}if(typeof t!=`function`)return t},[t,n,s,r,i])}function vn(e){switch(typeof e){case`object`:return e!=null;case`function`:case`symbol`:return!0;default:return!1}}let yn=new Map,bn=new Set;function xn(){if(typeof window>`u`)return;function e(e){return`propertyName`in e}let t=t=>{let r=q(t);if(!e(t)||!r)return;let i=yn.get(r);i||(i=new Set,yn.set(r,i),r.addEventListener(`transitioncancel`,n,{once:!0})),i.add(t.propertyName)},n=t=>{let r=q(t);if(!e(t)||!r)return;let i=yn.get(r);if(i&&(i.delete(t.propertyName),i.size===0&&(r.removeEventListener(`transitioncancel`,n),yn.delete(r)),yn.size===0)){for(let e of bn)e();bn.clear()}};document.body.addEventListener(`transitionrun`,t),document.body.addEventListener(`transitionend`,n)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,xn):xn());function Sn(){for(let[e]of yn)`isConnected`in e&&!e.isConnected&&yn.delete(e)}function Cn(e){requestAnimationFrame(()=>{Sn(),yn.size===0?e():bn.add(e)})}function wn(e){if(!e.isConnected)return;let t=U(e);if(xt()===`virtual`){let n=K(t);Cn(()=>{let r=K(t);(r===n||r===t.body)&&e.isConnected&&ve(e)})}else ve(e)}function Tn(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:i}=e,a=(0,d.useCallback)(e=>{if(q(e)===e.currentTarget)return r&&r(e),i&&i(!1),!0},[r,i]),o=Fe(a),s=(0,d.useCallback)(e=>{let t=q(e),r=U(t),a=r?K(r):K();t===e.currentTarget&&t===a&&(n&&n(e),i&&i(!0),o(e))},[i,n,o]);return{focusProps:{onFocus:!t&&(n||i||r)?s:void 0,onBlur:!t&&(r||i)?a:void 0}}}function En(e){if(e)return t=>{let n=!0;e({...t,preventDefault(){t.preventDefault()},isDefaultPrevented(){return t.isDefaultPrevented()},stopPropagation(){n=!0},continuePropagation(){n=!1,typeof t.continuePropagation==`function`&&t.continuePropagation()},isPropagationStopped(){return n}}),n&&!(typeof t.isPropagationStopped==`function`&&t.isPropagationStopped())&&t.stopPropagation()}}let Dn=new Set([`shift`,`alt`,`control`,`meta`,`mod`]),On=[`Alt`,`Control`,`Meta`,`Shift`];function kn(e){let t=new Set;return e.alt&&t.add(`Alt`),e.shift&&t.add(`Shift`),e.ctrl&&t.add(`Control`),e.meta&&t.add(`Meta`),e.mod&&t.add(Ve()?`Meta`:`Control`),t}function An(e){let t=new Set;return e.altKey&&t.add(`Alt`),e.ctrlKey&&t.add(`Control`),e.metaKey&&t.add(`Meta`),e.shiftKey&&t.add(`Shift`),t}function jn(e){return On.filter(t=>e.has(t))}function Mn(e){let t=e.split(`+`).reduce((e,t)=>{let n=t.toLowerCase();return Dn.has(n)?n===`shift`?e.shift=!0:n===`alt`?e.alt=!0:n===`control`?e.ctrl=!0:n===`meta`?e.meta=!0:n===`mod`&&(e.mod=!0):e.key=t,e},{shift:!1,alt:!1,ctrl:!1,meta:!1,mod:!1,key:``});if(t.key===``)throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);return t}function Nn(e){return e.toLowerCase()}let Pn={space:` `,esc:`escape`,del:`delete`,ins:`insert`,left:`arrowleft`,right:`arrowright`,up:`arrowup`,down:`arrowdown`,pageup:`pageup`,pagedown:`pagedown`};function Fn(e){let t=Nn(e);return Pn[t]??t}function In(e){let t=jn(kn(e)),n=Fn(e.key);return t.length>0?`${t.join(`+`)}+${n}`:n}function Ln(e){let t=jn(An(e)),n=Nn(e.key);return(t.length>0?`${t.join(`+`)}+`:``)+n}function Rn(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=Mn(n);t.set(In(e),r)}return e=>{let n=Ln(e),r=t.get(n),i=r?.(e);i===void 0&&r!==void 0?i={shouldContinuePropagation:!1,shouldPreventDefault:!0}:typeof i==`boolean`&&(i={shouldContinuePropagation:!i,shouldPreventDefault:i}),i?.shouldPreventDefault&&e.preventDefault(),(!r||i?.shouldContinuePropagation)&&e.continuePropagation()}}function zn(e){let{shortcuts:t,allowRepeats:n=!1,allowComposing:r=!1}=e,i,a;if(t){let o=Rn(t),s=En(e=>{if(!G(e.currentTarget,q(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}o(e)}),c=En(e=>{if(!G(e.currentTarget,q(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}e.continuePropagation()});i=e.onKeyDown?l(e.onKeyDown,s):s,a=e.onKeyUp?l(e.onKeyUp,c):c}else i=En(e.onKeyDown),a=En(e.onKeyUp);return{keyboardProps:e.isDisabled?{}:{onKeyDown:i,onKeyUp:a}}}function Bn(e,t){f(()=>{if(e&&e.ref&&t)return e.ref.current=t.current,()=>{e.ref&&(e.ref.current=null)}})}let Vn=d.default.createContext(null);function Hn(e){let t=(0,d.useContext)(Vn)||{};Bn(t,e);let{ref:n,...r}=t;return r}function Un(e,t){let{focusProps:n}=Tn(e),{keyboardProps:r}=zn(e),i=F(n,r),a=Hn(t),o=e.isDisabled?{}:a,s=(0,d.useRef)(e.autoFocus);(0,d.useEffect)(()=>{s.current&&t.current&&wn(t.current),s.current=!1},[t]);let c=e.excludeFromTabOrder?-1:0;return e.isDisabled&&(c=void 0),{focusableProps:F({...i,tabIndex:c},o)}}typeof HTMLTemplateElement<`u`&&(Object.defineProperty(HTMLTemplateElement.prototype,"firstChild",{configurable:!0,enumerable:!0,get:function(){return this.content.firstChild}}),Object.defineProperty(HTMLTemplateElement.prototype,"appendChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.appendChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"removeChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.removeChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"insertBefore",{configurable:!0,enumerable:!0,value:function(e,t){return this.content.insertBefore(e,t)}}));let Wn=(0,d.createContext)(!1);function Gn(e){if((0,d.useContext)(Wn))return d.default.createElement(d.default.Fragment,null,e.children);let t=d.default.createElement(Wn.Provider,{value:!0},e.children);return d.default.createElement(`template`,null,t)}function Kn(e){let t=(t,n)=>(0,d.useContext)(Wn)?null:e(t,n);return t.displayName=e.displayName||e.name,(0,d.forwardRef)(t)}var qn=o(((e,t)=>{t.exports=window.ReactDOM})),Jn=o((e=>{var t=u();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useState,a=t.useEffect,o=t.useLayoutEffect,s=t.useDebugValue;function c(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),c=r[0].inst,u=r[1];return o(function(){c.value=n,c.getSnapshot=t,l(c)&&u({inst:c})},[e,n,t]),a(function(){return l(c)&&u({inst:c}),e(function(){l(c)&&u({inst:c})})},[e]),s(n),n}function l(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch{return!0}}function d(e,t){return t()}var f=typeof window>`u`||window.document===void 0||window.document.createElement===void 0?d:c;e.useSyncExternalStore=t.useSyncExternalStore===void 0?f:t.useSyncExternalStore})),Yn=o(((e,t)=>{t.exports=Jn()})),Xn=c(qn(),1),Zn=Yn();let Qn=(0,d.createContext)(!1),$n=(0,d.createContext)(null);function er(e){if((0,d.useContext)($n))return e.content;let{collection:t,document:n}=ir(e.createCollection);return d.default.createElement(d.default.Fragment,null,d.default.createElement(Gn,null,d.default.createElement($n.Provider,{value:n},e.content)),d.default.createElement(tr,{render:e.children,collection:t}))}function tr({collection:e,render:t}){return t(e)}function nr(e,t,n){let r=w(),i=(0,d.useRef)(r);i.current=r;let a=(0,d.useCallback)(()=>i.current?n():t(),[t,n]);return(0,Zn.useSyncExternalStore)(e,a)}let rr=typeof d.default.useSyncExternalStore==`function`?d.default.useSyncExternalStore:nr;function ir(e){let[t]=(0,d.useState)(()=>new gn(e?.()||new fn)),n=(0,d.useCallback)(e=>t.subscribe(e),[t]),r=(0,d.useCallback)(()=>{let e=t.getCollection();return t.isSSR&&t.resetAfterSSR(),e},[t]),i=(0,d.useCallback)(()=>(t.isSSR=!0,t.getCollection()),[t]);return{collection:rr(n,r,i),document:t}}let ar=(0,d.createContext)(null);function or(e){return class extends un{static{this.type=e}}}function sr(e,t,n,r,i,a){typeof e==`string`&&(e=or(e));let o=(0,d.useCallback)(i=>{i?.setProps(t,n,e,r,a)},[t,n,r,a,e]),s=(0,d.useContext)(ar);if(s){let o=s.ownerDocument.nodesByProps.get(t);return o||(o=s.ownerDocument.createElement(e.type),o.setProps(t,n,e,r,a),s.appendChild(o),s.ownerDocument.updateCollection(),s.ownerDocument.nodesByProps.set(t,o)),i?d.default.createElement(ar.Provider,{value:o},i):null}return d.default.createElement(e.type,{ref:o},i)}function cr(e,t){let n=({node:e})=>t(e.props,e.props.ref,e),r=(0,d.forwardRef)((r,i)=>{let a=(0,d.useContext)(Vn);if(!(0,d.useContext)(Qn)){if(t.length>=3)throw Error(t.name+` cannot be rendered outside a collection.`);return t(r,i)}return sr(e,r,i,`children`in r?r.children:null,null,e=>d.default.createElement(Vn.Provider,{value:a},d.default.createElement(n,{node:e})))});return r.displayName=t.name,r}function lr(e){return _n({...e,addIdAndValue:!0})}let ur=(0,d.createContext)(null);function dr(e){let t=(0,d.useContext)(ur),n=(t?.dependencies||[]).concat(e.dependencies),r=e.idScope??t?.idScope,i=lr({...e,idScope:r,dependencies:n});return(0,d.useContext)($n)&&(i=d.default.createElement(fr,null,i)),t=(0,d.useMemo)(()=>({dependencies:n,idScope:r}),[r,...n]),d.default.createElement(ur.Provider,{value:t},i)}function fr({children:e}){let t=(0,d.useContext)($n),n=(0,d.useMemo)(()=>d.default.createElement($n.Provider,{value:null},d.default.createElement(Qn.Provider,{value:!0},e)),[e]);return w()?d.default.createElement(ar.Provider,{value:t},n):(0,Xn.createPortal)(n,t)}let pr={CollectionRoot({collection:e,renderDropIndicator:t}){return mr(e,null,t)},CollectionBranch({collection:e,parent:t,renderDropIndicator:n}){return mr(e,t,n)}};function mr(e,t,n){return _n({items:t?e.getChildren(t.key):e,dependencies:[n],children(t){if(t.type===`content`)return d.default.createElement(d.default.Fragment,null);let r=t.render(t);return!n||t.type!==`item`?r:d.default.createElement(d.default.Fragment,null,n({type:`item`,key:t.key,dropPosition:`before`}),r,hr(e,t,n))}})}function hr(e,t,n){let r=t.key,i=e.getKeyAfter(r),a=i==null?null:e.getItem(i);for(;a!=null&&a.type!==`item`;)i=e.getKeyAfter(a.key),a=i==null?null:e.getItem(i);let o=t.nextKey==null?null:e.getItem(t.nextKey);for(;o!=null&&o.type!==`item`;)o=o.nextKey==null?null:e.getItem(o.nextKey);let s=[];if(o==null){let r=t;for(;r?.type===`item`&&(!a||r.parentKey!==a.parentKey&&a.level<r.level);){let t=n({type:`item`,key:r.key,dropPosition:`after`});(0,d.isValidElement)(t)&&s.push((0,d.cloneElement)(t,{key:`${r.key}-after`})),r=r.parentKey==null?null:e.getItem(r.parentKey)}}return s}let gr=(0,d.createContext)(pr);function _r(e){return(0,d.useMemo)(()=>e==null?null:new Set([e]),[e])}let vr=new Set([`id`]),yr=new Set([`aria-label`,`aria-labelledby`,`aria-describedby`,`aria-details`]),br=new Set([`href`,`hrefLang`,`target`,`rel`,`download`,`ping`,`referrerPolicy`]),xr=new Set([`dir`,`lang`,`hidden`,`inert`,`translate`]),Sr=new Set(`onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart`.split(`.`)),Cr=/^(data-.*)$/;function Y(e,t={}){let{labelable:n,isLink:r,global:i,events:a=i,propNames:o}=t,s={};for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&(vr.has(t)||n&&yr.has(t)||r&&br.has(t)||i&&xr.has(t)||a&&(Sr.has(t)||t.endsWith(`Capture`)&&Sr.has(t.slice(0,-7)))||o?.has(t)||Cr.test(t))&&(s[t]=e[t]);return s}let wr=`default`,Tr=``,Er=new WeakMap;function Dr(e){if(We()&&Ke()){if(wr==="default"){let t=U(e);Tr=t.documentElement.style.webkitUserSelect,t.documentElement.style.webkitUserSelect=`none`}wr=`disabled`}else if(e instanceof HTMLElement||e instanceof SVGElement){let t=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;Er.set(e,e.style[t]),e.style[t]=`none`}}function Or(e){if(We()&&Ke()){if(wr!==`disabled`)return;wr=`restoring`,setTimeout(()=>{Cn(()=>{if(wr===`restoring`){let t=U(e);t.documentElement.style.webkitUserSelect===`none`&&(t.documentElement.style.webkitUserSelect=Tr||``),Tr=``,wr=`default`}})},300)}else if((e instanceof HTMLElement||e instanceof SVGElement)&&e&&Er.has(e)){let t=Er.get(e),n=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;e.style[n]===`none`&&(e.style[n]=t),e.getAttribute(`style`)===``&&e.removeAttribute(`style`),Er.delete(e)}}function kr(e,t){let n=W(t),r=U(t);if(r==null||n==null)return;let i,a=`meta[name="${CSS.escape(e)}"], meta[property="${CSS.escape(e)}"]`,o=r.querySelector(a);return o&&o instanceof n.HTMLMetaElement&&(e===`csp-nonce`&&o.nonce&&(i??=o.nonce||void 0),o.content&&(i??=o.content||void 0)),e===`csp-nonce`&&(i??=n.__webpack_nonce__||globalThis.__webpack_nonce__||void 0),i}let Ar=new WeakMap;function jr(e){let t=U(e),n=Ar.get(t);return n??=kr(`csp-nonce`,t),n!==void 0&&Ar.set(t,n),n}let Mr=d.default.createContext({register:()=>{}});Mr.displayName=`PressResponderContext`;function Nr(){let e=(0,d.useRef)(new Map),t=(0,d.useCallback)((t,n,r,i)=>{let a=i?.once?(...t)=>{e.current.delete(r),r(...t)}:r;e.current.set(r,{type:n,eventTarget:t,fn:a,options:i}),t.addEventListener(n,a,i)},[]),n=(0,d.useCallback)((t,n,r,i)=>{let a=e.current.get(r)?.fn||r;t.removeEventListener(n,a,i),e.current.delete(r)},[]),r=(0,d.useCallback)(()=>{e.current.forEach((e,t)=>{n(e.eventTarget,e.type,t,e.options)})},[n]);return(0,d.useEffect)(()=>r,[r]),{addGlobalListener:t,removeGlobalListener:n,removeAllGlobalListeners:r}}function Pr(e){let t=(0,d.useContext)(Mr);if(t){let{register:n,ref:r,...i}=t;e=F(i,e),n()}return Bn(t,e.ref),e}var Fr=class{#e;constructor(e,t,n,r){this.#e=!0;let i=(r?.target??n.currentTarget)?.getBoundingClientRect(),a,o=0,s,c=null;n.clientX!=null&&n.clientY!=null&&(s=n.clientX,c=n.clientY),i&&(s!=null&&c!=null?(a=s-i.left,o=c-i.top):(a=i.width/2,o=i.height/2)),this.type=e,this.pointerType=t,this.target=n.currentTarget,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.x=a,this.y=o,this.key=n.key}continuePropagation(){this.#e=!1}get shouldStopPropagation(){return this.#e}};let Ir=Symbol(`linkClicked`),Lr=`react-aria-pressable-style`,Rr=`data-react-aria-pressable`;function zr(e){let{onPress:t,onPressChange:n,onPressStart:r,onPressEnd:i,onPressUp:a,onClick:o,isDisabled:s,isPressed:c,preventFocusOnPress:u,shouldCancelOnPointerExit:f,allowTextSelectionOnPress:p,ref:m,...h}=Pr(e),[g,_]=(0,d.useState)(!1),v=(0,d.useRef)({isPressed:!1,ignoreEmulatedMouseEvents:!1,didFirePressStart:!1,isTriggeringEvent:!1,activePointerId:null,target:null,isOverTarget:!1,pointerType:null,disposables:[]}),{addGlobalListener:y,removeAllGlobalListeners:b}=Nr(),x=(0,d.useCallback)((e,t)=>{let i=v.current;if(s||i.didFirePressStart)return!1;let a=!0;if(i.isTriggeringEvent=!0,r){let n=new Fr(`pressstart`,t,e);r(n),a=n.shouldStopPropagation}return n&&n(!0),i.isTriggeringEvent=!1,i.didFirePressStart=!0,_(!0),a},[s,r,n]),S=(0,d.useCallback)((e,r,a=!0)=>{let o=v.current;if(!o.didFirePressStart)return!1;o.didFirePressStart=!1,o.isTriggeringEvent=!0;let c=!0;if(i){let t=new Fr(`pressend`,r,e);i(t),c=t.shouldStopPropagation}if(n&&n(!1),_(!1),t&&a&&!s){let n=new Fr(`press`,r,e);t(n),c&&=n.shouldStopPropagation}return o.isTriggeringEvent=!1,c},[s,i,n,t]),C=J(S),w=J((0,d.useCallback)((e,t)=>{let n=v.current;if(s)return!1;if(a){n.isTriggeringEvent=!0;let r=new Fr(`pressup`,t,e);return a(r),n.isTriggeringEvent=!1,r.shouldStopPropagation}return!0},[s,a])),T=(0,d.useCallback)(e=>{let t=v.current;if(t.isPressed&&t.target){t.didFirePressStart&&t.pointerType!=null&&S(Hr(t.target,e),t.pointerType,!1),t.isPressed=!1,t.isOverTarget=!1,t.activePointerId=null,t.pointerType=null,b(),p||Or(t.target);for(let e of t.disposables)e();t.disposables=[]}},[p,b,S]),E=J(T);(0,d.useEffect)(()=>{s&&v.current.isPressed&&E({currentTarget:v.current.target,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1})},[s]);let D=(0,d.useCallback)(e=>{f&&T(e)},[f,T]),O=(0,d.useCallback)(e=>{s||o?.(e)},[s,o]),k=(0,d.useCallback)((e,t)=>{if(!s&&o){let n=new MouseEvent(`click`,e);Pe(n,t),o(Ne(n))}},[s,o]),A=(0,d.useMemo)(()=>{let e=v.current,t={onKeyDown(t){if(Vr(t.nativeEvent,t.currentTarget)&&G(t.currentTarget,q(t))){Wr(q(t),t.key)&&t.preventDefault();let r=!0;!e.isPressed&&!t.repeat&&(e.target=t.currentTarget,e.isPressed=!0,e.pointerType=`keyboard`,r=x(t,`keyboard`));let i=t.currentTarget;y(U(t.currentTarget),`keyup`,l(t=>{Vr(t,i)&&!t.repeat&&G(i,q(t))&&e.target&&w(Hr(e.target,t),`keyboard`)},n),!0),r&&t.stopPropagation(),t.metaKey&&Ve()&&e.metaKeyEvents?.set(t.key,t.nativeEvent)}else t.key===`Meta`&&(e.metaKeyEvents=new Map)},onClick(t){if((!t||G(t.currentTarget,q(t)))&&t&&t.button===0&&!e.isTriggeringEvent&&!et.isOpening){let n=!0;if(s&&t.preventDefault(),!e.ignoreEmulatedMouseEvents&&!e.isPressed&&(e.pointerType===`virtual`||Xe(t.nativeEvent))){let e=x(t,`virtual`),r=w(t,`virtual`),i=C(t,`virtual`);O(t),n=e&&r&&i}else if(e.isPressed&&e.pointerType!==`keyboard`){let r=e.pointerType||t.nativeEvent.pointerType||`virtual`,i=w(Hr(t.currentTarget,t),r),a=C(Hr(t.currentTarget,t),r,!0);n=i&&a,e.isOverTarget=!1,O(t),E(t)}e.ignoreEmulatedMouseEvents=!1,n&&t.stopPropagation()}}},n=t=>{if(e.isPressed&&e.target&&Vr(t,e.target)){Wr(q(t),t.key)&&t.preventDefault();let n=q(t),r=G(e.target,n);C(Hr(e.target,t),`keyboard`,r),r&&k(t,e.target),b(),t.key!==`Enter`&&Br(e.target)&&G(e.target,n)&&!t[Ir]&&(t[Ir]=!0,et(e.target,t,!1)),e.isPressed=!1,e.metaKeyEvents?.delete(t.key)}else if(t.key===`Meta`&&e.metaKeyEvents?.size){let t=e.metaKeyEvents;e.metaKeyEvents=void 0;for(let n of t.values())e.target?.dispatchEvent(new KeyboardEvent(`keyup`,n))}};if(typeof PointerEvent<`u`){t.onPointerDown=t=>{if(t.button!==0||!G(t.currentTarget,q(t)))return;if(Ze(t.nativeEvent)){e.pointerType=`virtual`;return}e.pointerType=t.pointerType;let i=!0;if(!e.isPressed){e.isPressed=!0,e.isOverTarget=!0,e.activePointerId=t.pointerId,e.target=t.currentTarget,p||Dr(e.target),i=x(t,e.pointerType);let a=q(t);`releasePointerCapture`in a&&(`hasPointerCapture`in a?a.hasPointerCapture(t.pointerId)&&a.releasePointerCapture(t.pointerId):a.releasePointerCapture(t.pointerId)),y(U(t.currentTarget),`pointerup`,n,!1),y(U(t.currentTarget),`pointercancel`,r,!1)}i&&t.stopPropagation()},t.onMouseDown=t=>{if(G(t.currentTarget,q(t))&&t.button===0){if(u){let n=Le(t.target);n&&e.disposables.push(n)}t.stopPropagation()}},t.onPointerUp=t=>{G(t.currentTarget,q(t))&&e.pointerType!==`virtual`&&t.button===0&&!e.isPressed&&w(t,e.pointerType||t.pointerType)},t.onPointerEnter=t=>{t.pointerId===e.activePointerId&&e.target&&!e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!0,x(Hr(e.target,t),e.pointerType))},t.onPointerLeave=t=>{t.pointerId===e.activePointerId&&e.target&&e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!1,C(Hr(e.target,t),e.pointerType,!1),D(t))};let n=t=>{if(t.pointerId===e.activePointerId&&e.isPressed&&t.button===0&&e.target){if(G(e.target,q(t))&&e.pointerType!=null){let n=!1,r=setTimeout(()=>{e.isPressed&&e.target instanceof HTMLElement&&(n?E(t):(ve(e.target),e.target.click()))},80);y(t.currentTarget,`click`,()=>n=!0,!0),e.disposables.push(()=>clearTimeout(r))}else E(t);e.isOverTarget=!1}},r=e=>{E(e)};t.onDragStart=e=>{G(e.currentTarget,q(e))&&E(e)}}return t},[y,s,u,b,p,D,x,O,k]);return(0,d.useEffect)(()=>{if(!m)return;let e=U(m.current);if(!e||!e.head||e.getElementById(Lr))return;let t=e.createElement(`style`);t.id=Lr;let n=jr(e);n&&(t.nonce=n),t.textContent=`
@layer {
  [${Rr}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(),e.head.prepend(t)},[m]),(0,d.useEffect)(()=>{let e=v.current;return()=>{p||Or(e.target??void 0);for(let t of e.disposables)t();e.disposables=[]}},[p]),{isPressed:c||g,pressProps:F(h,A,{[Rr]:!0})}}function Br(e){return e.tagName===`A`&&e.hasAttribute(`href`)}function Vr(e,t){let{key:n,code:r}=e,i=t,a=i.getAttribute(`role`);return(n===`Enter`||n===` `||n===`Spacebar`||r===`Space`)&&!(i instanceof W(i).HTMLInputElement&&!Kr(i,n)||i instanceof W(i).HTMLTextAreaElement||i.isContentEditable)&&!((a===`link`||!a&&Br(i))&&n!==`Enter`)}function Hr(e,t){let n=t.clientX,r=t.clientY;return{currentTarget:e,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,altKey:t.altKey,clientX:n,clientY:r,key:t.key}}function Ur(e){return e instanceof HTMLInputElement?!1:e instanceof HTMLButtonElement?e.type!==`submit`&&e.type!==`reset`:!Br(e)}function Wr(e,t){return Ve()&&t===`Enter`?!1:e instanceof HTMLInputElement?t===`Enter`&&(e.type===`checkbox`||e.type===`radio`)?!1:!Kr(e,t):Ur(e)}let Gr=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function Kr(e,t){return e.type===`checkbox`||e.type===`radio`?t===` `:Gr.has(e.type)}function qr(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:i}=e,a=(0,d.useRef)({isFocusWithin:!1}),{addGlobalListener:o,removeAllGlobalListeners:s}=Nr(),c=(0,d.useCallback)(e=>{G(e.currentTarget,q(e))&&a.current.isFocusWithin&&!G(e.currentTarget,e.relatedTarget)&&(a.current.isFocusWithin=!1,s(),n&&n(e),i&&i(!1))},[n,i,a,s]),l=Fe(c),u=(0,d.useCallback)(e=>{if(!G(e.currentTarget,q(e)))return;let t=q(e),n=U(t),s=K(n);if(!a.current.isFocusWithin&&s===t){r&&r(e),i&&i(!0),a.current.isFocusWithin=!0,l(e);let t=e.currentTarget;o(n,`focus`,e=>{let r=q(e);if(a.current.isFocusWithin&&!G(t,r)){let e=new n.defaultView.FocusEvent(`blur`,{relatedTarget:r});Pe(e,t);let i=Ne(e);c(i)}},{capture:!0})}},[r,i,l,o,c]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:u,onBlur:c}}}function Jr(e={}){let{autoFocus:t=!1,isTextInput:n,within:r}=e,i=(0,d.useRef)({isFocused:!1,isFocusVisible:t||bt()}),[a,o]=(0,d.useState)(!1),[s,c]=(0,d.useState)(()=>i.current.isFocused&&i.current.isFocusVisible),l=(0,d.useCallback)(()=>c(i.current.isFocused&&i.current.isFocusVisible),[]),u=(0,d.useCallback)(e=>{i.current.isFocused=e,i.current.isFocusVisible=bt(),o(e),l()},[l]);Tt(e=>{i.current.isFocusVisible=e,l()},[n,a],{enabled:a,isTextInput:n});let{focusProps:f}=Tn({isDisabled:r,onFocusChange:u}),{focusWithinProps:p}=qr({isDisabled:!r,onFocusWithinChange:u});return{isFocused:a,isFocusVisible:s,focusProps:r?p:f}}let Yr=!1,Xr=0;function Zr(){Yr=!0,setTimeout(()=>{Yr=!1},500)}function Qr(e){e.pointerType===`touch`&&Zr()}function $r(){let e=U(null);if(e!==void 0)return Xr===0&&typeof PointerEvent<`u`&&e.addEventListener(`pointerup`,Qr),Xr++,()=>{Xr--,!(Xr>0)&&typeof PointerEvent<`u`&&e.removeEventListener(`pointerup`,Qr)}}function ei(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,isDisabled:i}=e,[a,o]=(0,d.useState)(!1),s=(0,d.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:``,target:null}).current;(0,d.useEffect)($r,[]);let{addGlobalListener:c,removeAllGlobalListeners:l}=Nr(),{hoverProps:u,triggerHoverEnd:f}=(0,d.useMemo)(()=>{let e=(e,r)=>{if(s.pointerType=r,i||r===`touch`||s.isHovered||!G(e.currentTarget,q(e)))return;s.isHovered=!0;let l=e.currentTarget;s.target=l,c(U(q(e)),`pointerover`,e=>{s.isHovered&&s.target&&!G(s.target,q(e))&&a(e,e.pointerType)},{capture:!0}),t&&t({type:`hoverstart`,target:l,pointerType:r}),n&&n(!0),o(!0)},a=(e,t)=>{let i=s.target;s.pointerType=``,s.target=null,t!==`touch`&&s.isHovered&&i&&(s.isHovered=!1,l(),r&&r({type:`hoverend`,target:i,pointerType:t}),n&&n(!1),o(!1))},u={};return typeof PointerEvent<`u`&&(u.onPointerEnter=t=>{Yr&&t.pointerType===`mouse`||e(t,t.pointerType)},u.onPointerLeave=e=>{!i&&G(e.currentTarget,q(e))&&a(e,e.pointerType)}),{hoverProps:u,triggerHoverEnd:a}},[t,n,r,i,s,c,l]);return(0,d.useEffect)(()=>{i&&f({currentTarget:s.target},s.pointerType)},[i]),{hoverProps:u,isHovered:a}}let ti=(0,d.createContext)({}),ni=Kn(function(e,t){[e,t]=V(e,t,ti);let{elementType:n=`label`,...r}=e,i=H[n];return d.default.createElement(i,{className:`react-aria-Label`,...r,ref:t})});function ri(e){let{id:t,label:n,"aria-labelledby":r,"aria-label":i,labelElementType:a=`label`}=e;t=A(t);let o=A(),s={};n&&(r=r?`${o} ${r}`:o,s={id:o,htmlFor:a===`label`?t:void 0});let c=jt({id:t,"aria-label":i,"aria-labelledby":r});return{labelProps:s,fieldProps:c}}let ii=new Map,ai=!1;try{ai=new Intl.NumberFormat(`de-DE`,{signDisplay:`exceptZero`}).resolvedOptions().signDisplay===`exceptZero`}catch{}var oi=class{constructor(e,t={}){this.numberFormatter=si(e,t),this.options=t}format(e){let t=``;return t=!ai&&this.options.signDisplay!=null?ci(this.numberFormatter,this.options.signDisplay,e):this.numberFormatter.format(e),t}formatToParts(e){return this.numberFormatter.formatToParts(e)}formatRange(e,t){if(typeof this.numberFormatter.formatRange==`function`)return this.numberFormatter.formatRange(e,t);if(t<e)throw RangeError(`End date must be >= start date`);return`${this.format(e)} \u{2013} ${this.format(t)}`}formatRangeToParts(e,t){if(typeof this.numberFormatter.formatRangeToParts==`function`)return this.numberFormatter.formatRangeToParts(e,t);if(t<e)throw RangeError(`End date must be >= start date`);let n=this.numberFormatter.formatToParts(e),r=this.numberFormatter.formatToParts(t);return[...n.map(e=>({...e,source:`startRange`})),{type:`literal`,value:` – `,source:`shared`},...r.map(e=>({...e,source:`endRange`}))]}resolvedOptions(){let e=this.numberFormatter.resolvedOptions();return!ai&&this.options.signDisplay!=null&&(e={...e,signDisplay:this.options.signDisplay}),e}};function si(e,t={}){let{numberingSystem:n}=t;n&&e.includes(`-nu-`)&&(e.includes(`-u-`)||(e+=`-u-`),e+=`-nu-${n}`);let r=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``);if(ii.has(r))return ii.get(r);let i=new Intl.NumberFormat(e,t);return ii.set(r,i),i}function ci(e,t,n){if(t===`auto`)return e.format(n);if(t===`never`)return e.format(Math.abs(n));{let r=!1;if(t===`always`?r=n>0||Object.is(n,0):t===`exceptZero`&&(Object.is(n,-0)||Object.is(n,0)?n=Math.abs(n):r=n>0),r){let t=e.format(-n),r=e.format(n),i=t.replace(r,``).replace(/\u200e|\u061C/,``);return[...i].length!==1&&console.warn(`@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case`),t.replace(r,`!!!`).replace(i,`+`).replace(`!!!`,r)}return e.format(n)}}let li=RegExp(`^.*\\(.*\\).*$`),ui=[`latn`,`arab`,`hanidec`,`deva`,`beng`,`fullwide`];var di=class{constructor(e,t={}){this.locale=e,this.options=t}parse(e){return pi(this.locale,this.options,e).parse(e)}isValidPartialNumber(e,t,n){return pi(this.locale,this.options,e).isValidPartialNumber(e,t,n)}getNumberingSystem(e){return pi(this.locale,this.options,e).options.numberingSystem}};let fi=new Map;function pi(e,t,n){let r=mi(e,t);if(!e.includes(`-nu-`)&&!r.isValidPartialNumber(n)){for(let i of ui)if(i!==r.options.numberingSystem){let r=mi(e+(e.includes(`-u-`)?`-nu-`:`-u-nu-`)+i,t);if(r.isValidPartialNumber(n))return r}}return r}function mi(e,t){let n=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``),r=fi.get(n);return r||(r=new hi(e,t),fi.set(n,r)),r}var hi=class{constructor(e,t={}){this.locale=e,t.roundingIncrement!==1&&t.roundingIncrement!=null&&(t.maximumFractionDigits==null&&t.minimumFractionDigits==null?(t.maximumFractionDigits=0,t.minimumFractionDigits=0):t.maximumFractionDigits==null?t.maximumFractionDigits=t.minimumFractionDigits:t.minimumFractionDigits??=t.maximumFractionDigits),this.formatter=new Intl.NumberFormat(e,t),this.options=this.formatter.resolvedOptions(),this.symbols=vi(e,this.formatter,this.options,t),this.options.style===`percent`&&((this.options.minimumFractionDigits??0)>18||(this.options.maximumFractionDigits??0)>18)&&console.warn(`NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.`)}parse(e){let t=this.formatter.resolvedOptions().useGrouping,n=this.sanitize(e);if(!t&&this.symbols.group&&n.includes(this.symbols.group))return NaN;if(this.symbols.group&&(n=n.replaceAll(this.symbols.group,``)),this.symbols.decimal&&(n=n.replace(this.symbols.decimal,`.`)),this.symbols.minusSign&&(n=n.replace(this.symbols.minusSign,`-`)),n=n.replace(this.symbols.numeral,this.symbols.index),this.options.style===`percent`){let e=n.indexOf(`-`);n=n.replace(`-`,``),n=n.replace(`+`,``);let t=n.indexOf(`.`);t===-1&&(t=n.length),n=n.replace(`.`,``),n=t-2==0?`0.${n}`:t-2==-1?`0.0${n}`:t-2==-2?`0.00`:`${n.slice(0,t-2)}.${n.slice(t-2)}`,e>-1&&(n=`-${n}`)}let r=n?+n:NaN;if(isNaN(r))return NaN;if(this.options.style===`percent`){let e={...this.options,style:`decimal`,minimumFractionDigits:Math.min((this.options.minimumFractionDigits??0)+2,20),maximumFractionDigits:Math.min((this.options.maximumFractionDigits??0)+2,20)};return new di(this.locale,e).parse(new oi(this.locale,e).format(r))}return this.options.currencySign===`accounting`&&li.test(e)&&(r=-1*r),r}sanitize(e){let t=this.formatter.resolvedOptions().useGrouping;return this.symbols.noNumeralUnits.length>0&&this.symbols.noNumeralUnits.find(t=>t.unit===e)?this.symbols.noNumeralUnits.find(t=>t.unit===e).value.toString():(e=e.replace(this.symbols.literals,``),this.symbols.minusSign&&(e=e.replace(`-`,this.symbols.minusSign)),this.options.numberingSystem===`arab`&&(this.symbols.decimal&&(e=yi(e,`,`,this.symbols.decimal),e=yi(e,`،`,this.symbols.decimal)),this.symbols.group&&t&&(e=yi(e,`.`,this.symbols.group))),this.symbols.group===`’`&&e.includes(`'`)&&t&&(e=yi(e,`'`,this.symbols.group)),this.symbols.group===`'`&&e.includes(`’`)&&t&&(e=yi(e,`’`,this.symbols.group)),this.options.locale===`fr-FR`&&this.symbols.group&&t&&(e=yi(e,` `,this.symbols.group),e=yi(e,/\u00A0/g,this.symbols.group)),e)}isValidPartialNumber(e,t=-1/0,n=1/0){let r=this.formatter.resolvedOptions().useGrouping;return e=this.sanitize(e),this.symbols.minusSign&&e.startsWith(this.symbols.minusSign)&&t<0?e=e.slice(this.symbols.minusSign.length):this.symbols.plusSign&&e.startsWith(this.symbols.plusSign)&&n>0&&(e=e.slice(this.symbols.plusSign.length)),this.symbols.decimal&&e.indexOf(this.symbols.decimal)>-1&&this.options.maximumFractionDigits===0?!1:(this.symbols.group&&r&&(e=yi(e,this.symbols.group,``)),e=e.replace(this.symbols.numeral,``),this.symbols.decimal&&(e=e.replace(this.symbols.decimal,``)),e.length===0)}};let gi=new Set([`decimal`,`fraction`,`integer`,`minusSign`,`plusSign`,`group`]),_i=[0,4,2,1,11,20,3,7,100,21,.1,1.1];function vi(e,t,n,r){let i=new Intl.NumberFormat(e,{...n,minimumSignificantDigits:1,maximumSignificantDigits:21,roundingIncrement:1,roundingPriority:`auto`,roundingMode:`halfExpand`,useGrouping:!0}),a=i.formatToParts(-10000.111),o=i.formatToParts(10000.111),s=_i.map(e=>i.formatToParts(e)),c=s.map((e,t)=>{let n=e.find(e=>e.type===`unit`);return n&&!e.some(e=>e.type===`integer`||e.type===`fraction`)?{unit:n.value,value:_i[t]}:null}).filter(e=>!!e),l=a.find(e=>e.type===`minusSign`)?.value??`-`,u=o.find(e=>e.type===`plusSign`)?.value;!u&&(r?.signDisplay===`exceptZero`||r?.signDisplay===`always`)&&(u=`+`);let d=new Intl.NumberFormat(e,{...n,minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(.001).find(e=>e.type===`decimal`)?.value,f=a.find(e=>e.type===`group`)?.value,p=a.filter(e=>!gi.has(e.type)).map(e=>bi(e.value)),m=s.flatMap(e=>e.filter(e=>!gi.has(e.type)).map(e=>bi(e.value))),h=[...new Set([...p,...m])].sort((e,t)=>t.length-e.length),g=h.length===0?RegExp(`\\p{White_Space}|\\p{Cf}`,`gu`):RegExp(`${h.join(`|`)}|\\p{White_Space}|\\p{Cf}`,`gu`),_=[...new Intl.NumberFormat(n.locale,{useGrouping:!1}).format(9876543210)].reverse(),v=new Map(_.map((e,t)=>[e,t])),y=RegExp(`[${_.join(``)}]`,`g`);return{minusSign:l,plusSign:u,decimal:d,group:f,literals:g,numeral:y,numerals:_,index:e=>String(v.get(e)),noNumeralUnits:c}}function yi(e,t,n){return e.replaceAll?e.replaceAll(t,n):e.split(t).join(n)}function bi(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function xi(e={}){let{locale:t}=Gt();return(0,d.useMemo)(()=>new oi(t,e),[t,e])}function Si(e,t=-1/0,n=1/0){return Math.min(Math.max(e,t),n)}function Ci(e,t){let n=e,r=0,i=t.toString(),a=i.toLowerCase().indexOf(`e-`);if(a>0)r=Math.abs(Math.floor(Math.log10(Math.abs(t))))+a;else{let e=i.indexOf(`.`);e>=0&&(r=i.length-e)}if(r>0){let e=10**r;n=Math.round(n*e)/e}return n}function wi(e,t,n,r){t=Number(t),n=Number(n);let i=(e-(isNaN(t)?0:t))%r,a=Ci(Math.abs(i)*2>=r?e+Math.sign(i)*(r-Math.abs(i)):e-i,r);return isNaN(t)?!isNaN(n)&&a>n&&(a=Math.floor(Ci(n/r,r))*r):a<t?a=t:!isNaN(n)&&a>n&&(a=t+Math.floor(Ci((n-t)/r,r))*r),a=Ci(a,r),a}let Ti=(0,d.createContext)(null),Ei=7e3,Di=null;function Oi(e,t=`assertive`,n=Ei){Di?Di.announce(e,t,n):(Di=new Ai,(typeof IS_REACT_ACT_ENVIRONMENT==`boolean`?IS_REACT_ACT_ENVIRONMENT:typeof jest<`u`)?Di.announce(e,t,n):setTimeout(()=>{Di?.isAttached()&&Di?.announce(e,t,n)},100))}function ki(e){Di&&Di.clear(e)}var Ai=class{constructor(){this.node=null,this.assertiveLog=null,this.politeLog=null,typeof document<`u`&&(this.node=document.createElement(`div`),this.node.dataset.liveAnnouncer=`true`,Object.assign(this.node.style,{border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`}),this.assertiveLog=this.createLog(`assertive`),this.node.appendChild(this.assertiveLog),this.politeLog=this.createLog(`polite`),this.node.appendChild(this.politeLog),document.body.prepend(this.node))}isAttached(){return this.node?.isConnected}createLog(e){let t=document.createElement(`div`);return t.setAttribute(`role`,`log`),t.setAttribute(`aria-live`,e),t.setAttribute(`aria-relevant`,`additions`),t}destroy(){this.node&&=(document.body.removeChild(this.node),null)}announce(e,t=`assertive`,n=Ei){if(!this.node)return;let r=document.createElement(`div`);typeof e==`object`?(r.setAttribute(`role`,`img`),r.setAttribute(`aria-labelledby`,e[`aria-labelledby`])):r.textContent=e,t===`assertive`?this.assertiveLog?.appendChild(r):this.politeLog?.appendChild(r),e!==``&&setTimeout(()=>{r.remove()},n)}clear(e){this.node&&((!e||e===`assertive`)&&this.assertiveLog&&(this.assertiveLog.innerHTML=``),(!e||e===`polite`)&&this.politeLog&&(this.politeLog.innerHTML=``))}};function ji(e,t){let{elementType:n=`button`,isDisabled:r,onPress:i,onPressStart:a,onPressEnd:o,onPressUp:s,onPressChange:c,preventFocusOnPress:l,allowFocusWhenDisabled:u,onClick:d,href:f,target:p,rel:m,type:h=`button`}=e,g;g=n===`button`?{type:h,disabled:r,form:e.form,formAction:e.formAction,formEncType:e.formEncType,formMethod:e.formMethod,formNoValidate:e.formNoValidate,formTarget:e.formTarget,name:e.name,value:e.value}:{role:`button`,href:n===`a`&&!r?f:void 0,target:n===`a`?p:void 0,type:n===`input`?h:void 0,disabled:n===`input`?r:void 0,"aria-disabled":!r||n===`input`?void 0:r,rel:n===`a`?m:void 0};let{pressProps:_,isPressed:v}=zr({onPressStart:a,onPressEnd:o,onPressChange:c,onPress:i,onPressUp:s,onClick:d,isDisabled:r,preventFocusOnPress:l,ref:t}),{focusableProps:y}=Un(e,t);u&&(y.tabIndex=r?-1:y.tabIndex);let b=F(y,_,Y(e,{labelable:!0}));return{isPressed:v,buttonProps:F(g,b,{"aria-haspopup":e[`aria-haspopup`],"aria-expanded":e[`aria-expanded`],"aria-controls":e[`aria-controls`],"aria-pressed":e[`aria-pressed`],"aria-current":e[`aria-current`],"aria-disabled":e[`aria-disabled`]})}}let Mi=(0,d.createContext)({}),Ni=Kn(function(e,t){[e,t]=V(e,t,Mi);let n=e,{isPending:r}=n,{buttonProps:i,isPressed:a}=ji(e,t);i=Fi(i,r);let{focusProps:o,isFocused:s,isFocusVisible:c}=Jr(e),{hoverProps:l,isHovered:u}=ei({...e,isDisabled:e.isDisabled||r}),f={isHovered:u,isPressed:(n.isPressed||a)&&!r,isFocused:s,isFocusVisible:c,isDisabled:e.isDisabled||!1,isPending:r??!1},p=z({...e,values:f,defaultClassName:`react-aria-Button`}),m=A(i.id),h=A(),g=i[`aria-labelledby`];r&&(g?g=`${g} ${h}`:i[`aria-label`]&&(g=`${m} ${h}`));let _=(0,d.useRef)(r);(0,d.useEffect)(()=>{let e={"aria-labelledby":g||m};(!_.current&&s&&r||_.current&&s&&!r)&&Oi(e,`assertive`),_.current=r},[r,s,g,m]);let v=Y(e,{global:!0});return delete v.onClick,d.default.createElement(H.button,{...F(v,p,i,o,l),type:i.type===`submit`&&r?`button`:i.type,id:m,ref:t,"aria-labelledby":g,slot:e.slot||void 0,"aria-disabled":r?`true`:i[`aria-disabled`],"data-disabled":e.isDisabled||void 0,"data-pressed":f.isPressed||void 0,"data-hovered":u||void 0,"data-focused":s||void 0,"data-pending":r||void 0,"data-focus-visible":c||void 0},d.default.createElement(Ti.Provider,{value:{id:h}},p.children))}),Pi=/Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;function Fi(e,t){if(t){for(let t in e)t.startsWith(`on`)&&!Pi.test(t)&&(e[t]=void 0);e.href=void 0,e.target=void 0}return e}let Ii=(0,d.createContext)({}),Li=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,Ii);let{children:n,level:r=3,className:i,...a}=e,o=H[`h${r}`];return d.default.createElement(o,{...a,ref:t,className:i??`react-aria-Heading`},n)}),Ri=(0,d.createContext)({});function zi(e,t){if(!e)return!1;let n=window.getComputedStyle(e),r=document.scrollingElement||document.documentElement,i=/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY);return e===r&&n.overflow!==`hidden`&&(i=!0),i&&t&&(i=e.scrollHeight!==e.clientHeight||e.scrollWidth!==e.clientWidth),i}function Bi(e,t){let n=e;for(zi(n,t)&&(n=n.parentElement);n&&!zi(n,t);)n=n.parentElement;return n||document.scrollingElement||document.documentElement}function Vi(e,t){let n=[],r=document.scrollingElement||document.documentElement;for(;e&&(zi(e,t)&&n.push(e),e!==r);)e=e.parentElement;return n}function Hi(e,t,n={}){e!==t&&Ui(e,t,t.getBoundingClientRect(),n)}function Ui(e,t,n,r={}){let{block:i=`nearest`,inline:a=`nearest`}=r,o=e.scrollTop,s=e.scrollLeft,c=e.getBoundingClientRect(),l=window.getComputedStyle(t),u=window.getComputedStyle(e),d=document.scrollingElement||document.documentElement,f=e===d,p=e===d?0:c.top,m=e===d?e.clientHeight:c.bottom,h=e===d?0:c.left,g=e===d?e.clientWidth:c.right,_=parseFloat(l.scrollMarginTop)||0,v=parseFloat(l.scrollMarginBottom)||0,y=parseFloat(l.scrollMarginLeft)||0,b=parseFloat(l.scrollMarginRight)||0,x=parseFloat(u.scrollPaddingTop)||0,S=parseFloat(u.scrollPaddingBottom)||0,C=parseFloat(u.scrollPaddingLeft)||0,w=parseFloat(u.scrollPaddingRight)||0,T=parseFloat(u.borderTopWidth)||0,E=parseFloat(u.borderBottomWidth)||0,D=parseFloat(u.borderLeftWidth)||0,O=parseFloat(u.borderRightWidth)||0,k=n.top-_,A=n.bottom+v,j=n.left-y,M=n.right+b,N=e===d?0:D+O,ee=e===d?0:T+E,P=e===d?0:e.offsetWidth-e.clientWidth-N,te=e===d?0:e.offsetHeight-e.clientHeight-ee,F=p+(f?0:T)+x,I=m-(f?0:E)-S-te,L=h+(f?0:D)+C,R=g-(f?0:O)-w;We()&&Ke()||u.direction===`ltr`?R-=P:u.direction===`rtl`&&(L+=P);let z=k<F||A>I,B=j<L||M>R;if(z&&i===`start`)o+=k-F;else if(z&&i===`center`)o+=(k+A)/2-(F+I)/2;else if(z&&i===`end`)o+=A-I;else if(z&&i===`nearest`){let e=k-F,t=A-I;o+=Math.abs(e)<=Math.abs(t)?e:t}if(B&&a===`start`)s+=j-L;else if(B&&a===`center`)s+=(j+M)/2-(L+R)/2;else if(B&&a===`end`)s+=M-R;else if(B&&a===`nearest`){let e=j-L,t=M-R;s+=Math.abs(e)<=Math.abs(t)?e:t}e.scrollTo({left:s,top:o})}function Wi(e,t={}){let{containingElement:n}=t;if(e&&e.isConnected){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:r}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:i,top:a}=e.getBoundingClientRect();(Math.abs(t-i)>1||Math.abs(r-a)>1)&&(n?.scrollIntoView?.({block:`center`,inline:`center`}),e.scrollIntoView?.({block:`nearest`}))}else{let{left:t,top:r}=e.getBoundingClientRect(),i=Vi(e,!0);for(let t of i)Hi(t,e);let{left:a,top:o}=e.getBoundingClientRect();if(Math.abs(t-a)>1||Math.abs(r-o)>1){i=n?Vi(n,!0):[];for(let e of i)Hi(e,n,{block:`center`,inline:`center`});for(let t of Vi(e,!0))Hi(t,e)}}}}let Gi=0,Ki=new Map;function qi(e){let[t,n]=(0,d.useState)();return f(()=>{if(!e)return;let t=Ki.get(e);if(t)n(t.element.id);else{let r=`react-aria-description-${Gi++}`;n(r);let i=document.createElement(`div`);i.id=r,i.style.display=`none`,i.textContent=e,document.body.appendChild(i),t={refCount:0,element:i},Ki.set(e,t)}return t.refCount++,()=>{t&&--t.refCount===0&&(t.element.remove(),Ki.delete(e))}},[e]),{"aria-describedby":e?t:void 0}}let Ji={border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`};function Yi(e={}){let{style:t,isFocusable:n}=e,[r,i]=(0,d.useState)(!1),{focusWithinProps:a}=qr({isDisabled:!n,onFocusWithinChange:e=>i(e)}),o=(0,d.useMemo)(()=>r?t:t?{...Ji,...t}:Ji,[r]);return{visuallyHiddenProps:{...a,style:o}}}function Xi(e){let{children:t,elementType:n=`div`,isFocusable:r,style:i,...a}=e,{visuallyHiddenProps:o}=Yi(e);return d.default.createElement(n,F(a,o),t)}let Zi=(0,d.createContext)(null),Qi={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},$i={...Qi,customError:!0,valid:!1},ea={isInvalid:!1,validationDetails:Qi,validationErrors:[]},ta=(0,d.createContext)({}),na=`__reactAriaFormValidationState`;function ra(e){if(e.__reactAriaFormValidationState){let{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}=e[na];return{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}}return ia(e)}function ia(e){let{isInvalid:t,validationState:n,name:r,value:i,builtinValidation:a,validate:o,validationBehavior:s=`aria`}=e;n&&(t||=n===`invalid`);let c=t===void 0?null:{isInvalid:t,validationErrors:[],validationDetails:$i},l=(0,d.useMemo)(()=>!o||i==null?null:sa(oa(o,i)),[o,i]);a?.validationDetails.valid&&(a=void 0);let u=(0,d.useContext)(ta),f=(0,d.useMemo)(()=>r?Array.isArray(r)?r.flatMap(e=>aa(u[e])):aa(u[r]):[],[u,r]),[p,m]=(0,d.useState)(u),[h,g]=(0,d.useState)(!1);u!==p&&(m(u),g(!1));let _=(0,d.useMemo)(()=>sa(h?[]:f),[h,f]),v=(0,d.useRef)(ea),[y,b]=(0,d.useState)(ea),x=(0,d.useRef)(ea),S=()=>{if(!C)return;w(!1);let e=l||a||v.current;ca(e,x.current)||(x.current=e,b(e))},[C,w]=(0,d.useState)(!1);return(0,d.useEffect)(S),{realtimeValidation:c||_||l||a||ea,displayValidation:s===`native`?c||_||y:c||_||l||a||y,updateValidation(e){s===`aria`&&!ca(y,e)?b(e):v.current=e},resetValidation(){let e=ea;ca(e,x.current)||(x.current=e,b(e)),s===`native`&&w(!1),g(!0)},commitValidation(){s===`native`&&w(!0),g(!0)}}}function aa(e){return e?Array.isArray(e)?e:[e]:[]}function oa(e,t){if(typeof e==`function`){let n=e(t);if(n&&typeof n!=`boolean`)return aa(n)}return[]}function sa(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:$i}:null}function ca(e,t){return e===t||!!e&&!!t&&e.isInvalid===t.isInvalid&&e.validationErrors.length===t.validationErrors.length&&e.validationErrors.every((e,n)=>e===t.validationErrors[n])&&Object.entries(e.validationDetails).every(([e,n])=>t.validationDetails[e]===n)}let la=(0,d.createContext)(null),ua=new WeakMap;function da(e){let{description:t,errorMessage:n,isInvalid:r,validationState:i}=e,{labelProps:a,fieldProps:o}=ri(e),s=M([!!t,!!n,r,i]),c=M([!!t,!!n,r,i]);return o=F(o,{"aria-describedby":[s,c,e[`aria-describedby`]].filter(Boolean).join(` `)||void 0}),{labelProps:a,fieldProps:o,descriptionProps:{id:s},errorMessageProps:{id:c}}}function fa(e,t,n){let r=J(e=>{n&&!e.defaultPrevented&&n(t)});(0,d.useEffect)(()=>{let t=e?.current?.form;return t?.addEventListener(`reset`,r),()=>{t?.removeEventListener(`reset`,r)}},[e])}function pa(e,t,n){let{validationBehavior:r,focus:i}=e;f(()=>{if(r===`native`&&n?.current&&`setCustomValidity`in n.current&&!n.current.disabled){let e=t.realtimeValidation.isInvalid?t.realtimeValidation.validationErrors.join(` `)||`Invalid value.`:``;n.current.setCustomValidity(e),n.current.hasAttribute(`title`)||(n.current.title=``),t.realtimeValidation.isInvalid||t.updateValidation(ha(n.current))}});let a=(0,d.useRef)(!1),o=J(()=>{a.current||t.resetValidation()}),s=J(e=>{t.displayValidation.isInvalid||t.commitValidation();let r=n?.current?.form;!e.defaultPrevented&&n&&r&&ga(r)===n.current&&(i?i():n.current?.focus(),St(`keyboard`)),e.preventDefault()}),c=J(()=>{t.commitValidation()});(0,d.useEffect)(()=>{let e=n?.current;if(!e)return;let t=e.form,r=t?.reset;return t&&(t.reset=()=>{a.current=!window.event||window.event.type===`message`&&q(window.event)instanceof MessagePort,r?.call(t),a.current=!1}),e.addEventListener(`invalid`,s),e.addEventListener(`change`,c),t?.addEventListener(`reset`,o),()=>{e.removeEventListener(`invalid`,s),e.removeEventListener(`change`,c),t?.removeEventListener(`reset`,o),t&&(t.reset=r)}},[n,r])}function ma(e){let t=e.validity;return{badInput:t.badInput,customError:t.customError,patternMismatch:t.patternMismatch,rangeOverflow:t.rangeOverflow,rangeUnderflow:t.rangeUnderflow,stepMismatch:t.stepMismatch,tooLong:t.tooLong,tooShort:t.tooShort,typeMismatch:t.typeMismatch,valueMissing:t.valueMissing,valid:t.valid}}function ha(e){return{isInvalid:!e.validity.valid,validationDetails:ma(e),validationErrors:e.validationMessage?[e.validationMessage]:[]}}function ga(e){for(let t=0;t<e.elements.length;t++){let n=e.elements[t];if(n.validity?.valid===!1)return n}return null}function _a(e=!0){let[t,n]=(0,d.useState)(e),r=(0,d.useRef)(!1),i=(0,d.useCallback)(e=>{r.current=!0,n(!!e)},[]);return f(()=>{r.current||n(!1)},[]),[i,t]}function va(e=!0){let t=A(),[n,r]=_a(e);return{id:r?t:void 0,ref:n}}function ya(e,t,n){let{isDisabled:r=!1,isReadOnly:i=!1,value:a,name:o,form:s,children:c,isRequired:l,validationBehavior:u=`aria`,"aria-label":f,"aria-labelledby":p,"aria-describedby":m,onPressStart:h,onPressEnd:g,onPressChange:_,onPress:v,onPressUp:y,onClick:b}=e,x=ra({...e,value:t.isSelected}),{isInvalid:S,validationErrors:C,validationDetails:w}=x.displayValidation;pa(e,x,n);let T=e=>{e.stopPropagation(),t.setSelected(q(e).checked)},{pressProps:E,isPressed:D}=zr({onPressStart:h,onPressEnd:g,onPressChange:_,onPress:v,onPressUp:y,onClick:b,isDisabled:r}),[O,k]=(0,d.useState)(!1),{pressProps:A}=zr({onPressStart(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}h?.(e),_?.(!0),k(!0)},onPressEnd(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}g?.(e),_?.(!1),k(!1)},onPressUp(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}y?.(e)},onClick:b,onPress(r){if(r.pointerType===`keyboard`||r.pointerType===`virtual`){r.continuePropagation();return}v?.(r),t.toggle(),n.current?.focus();let{[na]:i}=e,{commitValidation:a}=i||x;a()},isDisabled:r||i}),{focusableProps:j}=Un(e,n),M=F(E,j),N=Y(e,{labelable:!0});fa(n,t.defaultSelected,t.setSelected);let ee=va(),P=va();return{labelProps:F(A,{onClick:e=>e.preventDefault()}),inputProps:F(N,{checked:t.isSelected,"aria-required":l&&u===`aria`||void 0,required:l&&u===`native`,"aria-invalid":S||e.validationState===`invalid`||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-controls":e[`aria-controls`],"aria-readonly":i||void 0,"aria-describedby":[ee.id,P.id,m].filter(Boolean).join(` `)||void 0,onChange:T,disabled:r,...a==null?{}:{value:a},name:o,form:s,type:`checkbox`,...M}),descriptionProps:ee,errorMessageProps:P,isSelected:t.isSelected,isPressed:D||O,isDisabled:r,isReadOnly:i,isInvalid:S||e.validationState===`invalid`,validationErrors:C,validationDetails:w}}function ba(e,t,n){let{labelProps:r,inputProps:i,descriptionProps:a,errorMessageProps:o,isSelected:s,isPressed:c,isDisabled:l,isReadOnly:u,isInvalid:f,validationErrors:p,validationDetails:m}=ya(e,t,n),{isIndeterminate:h}=e;return(0,d.useEffect)(()=>{n.current&&(n.current.indeterminate=!!h)}),{labelProps:F(r,(0,d.useMemo)(()=>({onMouseDown:e=>e.preventDefault()}),[])),inputProps:i,descriptionProps:a,errorMessageProps:o,isSelected:s,isPressed:c,isDisabled:l,isReadOnly:u,isInvalid:f,validationErrors:p,validationDetails:m}}function xa(e={}){let{isReadOnly:t}=e,[n,r]=cn(e.isSelected,e.defaultSelected||!1,e.onChange),[i]=(0,d.useState)(n);function a(e){t||r(e)}function o(){t||r(!n)}return{isSelected:n,defaultSelected:e.defaultSelected??i,setSelected:a,toggle:o}}function Sa(e,t,n){let r=xa({isReadOnly:e.isReadOnly||t.isReadOnly,isSelected:t.isSelected(e.value),defaultSelected:t.defaultValue.includes(e.value),onChange(n){n?t.addValue(e.value):t.removeValue(e.value),e.onChange&&e.onChange(n)}}),{name:i,form:a,descriptionId:o,errorMessageId:s,validationBehavior:c}=ua.get(t);c=e.validationBehavior??c;let{realtimeValidation:l}=ra({...e,value:r.isSelected,name:void 0,validationBehavior:`aria`}),u=(0,d.useRef)(ea),f=()=>{t.setInvalid(e.value,l.isInvalid?l:u.current)};(0,d.useEffect)(f);let p=t.realtimeValidation.isInvalid?t.realtimeValidation:l,m=c===`native`?t.displayValidation:p,h=ba({...e,isReadOnly:e.isReadOnly||t.isReadOnly,isDisabled:e.isDisabled||t.isDisabled,name:e.name||i,form:e.form||a,isRequired:e.isRequired??t.isRequired,validationBehavior:c,[na]:{realtimeValidation:p,displayValidation:m,resetValidation:t.resetValidation,commitValidation:t.commitValidation,updateValidation(e){u.current=e,f()}}},r,n);return{...h,inputProps:{...h.inputProps,"aria-describedby":[h.inputProps[`aria-describedby`],t.isInvalid?s:null,o].filter(Boolean).join(` `)||void 0}}}let Ca=(0,d.createContext)(null),wa=(0,d.createContext)(null),Ta=(0,d.createContext)(null);function Ea(e,t){let{validationBehavior:n}=B(la)||{},r=e.validationBehavior??n??`native`,i=(0,d.useContext)(wa),a=I((0,d.useMemo)(()=>N(t,e.inputRef===void 0?null:e.inputRef),[t,e.inputRef])),o={...re(e),children:typeof e.children==`function`||e.children,value:e.value,validationBehavior:r};return[i?Sa(o,i,a):ba(o,xa(e),a),a]}let Da=(0,d.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=V(r,t,Ca);let[i,a]=Ea(e,n);return d.default.createElement(Ta.Provider,{value:{...i,inputRef:a,defaultClassName:`react-aria-Checkbox`,isIndeterminate:e.isIndeterminate,isRequired:e.isRequired}},d.default.createElement(Oa,{...e,ref:t}))}),Oa=(0,d.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isReadOnly:o,isPressed:s,isInvalid:c,inputRef:l,defaultClassName:u,isIndeterminate:f,isRequired:p}=(0,d.useContext)(Ta),{isFocused:m,isFocusVisible:h,focusProps:g}=Jr(),_=a||o,{hoverProps:v,isHovered:y}=ei({...e,isDisabled:_}),b=z({...e,defaultClassName:u,values:{isSelected:i,isIndeterminate:f||!1,isPressed:s,isHovered:y,isFocused:m,isFocusVisible:h,isDisabled:a,isReadOnly:o,isInvalid:c,isRequired:p||!1}}),x=Y(e,{global:!0});return delete x.id,delete x.onClick,d.default.createElement(H.label,{...F(x,n,v,b),ref:t,slot:e.slot||void 0,"data-selected":i||void 0,"data-indeterminate":f||void 0,"data-pressed":s||void 0,"data-hovered":y||void 0,"data-focused":m||void 0,"data-focus-visible":h||void 0,"data-disabled":a||void 0,"data-readonly":o||void 0,"data-invalid":c||void 0,"data-required":p||void 0},d.default.createElement(Xi,{elementType:`span`},d.default.createElement(`input`,{...F(r,g),ref:l})),b.children)});function ka(e){let{onMoveStart:t,onMove:n,onMoveEnd:r}=e,i=(0,d.useRef)({didMove:!1,lastPosition:null,id:null}),{addGlobalListener:a,removeGlobalListener:o}=Nr(),s=J((0,d.useCallback)((e,r,a,o)=>{(a!==0||o!==0)&&(i.current.didMove||(i.current.didMove=!0,t?.({type:`movestart`,pointerType:r,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey})),n?.({type:`move`,pointerType:r,deltaX:a,deltaY:o,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey}))},[t,n,i])),c=J((0,d.useCallback)((e,t)=>{Or(),i.current.didMove&&r?.({type:`moveend`,pointerType:t,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey})},[r,i]));return{moveProps:(0,d.useMemo)(()=>{let e={},t=()=>{Dr(),i.current.didMove=!1};{let n=e=>{if(e.pointerId===i.current.id){let t=e.pointerType||`mouse`;s(e,t,e.pageX-(i.current.lastPosition?.pageX??0),e.pageY-(i.current.lastPosition?.pageY??0)),i.current.lastPosition={pageX:e.pageX,pageY:e.pageY}}},r=e=>{if(e.pointerId===i.current.id){let t=e.pointerType||`mouse`;c(e,t),i.current.id=null;let a=W(q(e));o(a,`pointermove`,n,!1),o(a,`pointerup`,r,!1),o(a,`pointercancel`,r,!1)}};e.onPointerDown=e=>{if(e.button===0&&i.current.id==null){t(),e.stopPropagation(),e.preventDefault(),i.current.lastPosition={pageX:e.pageX,pageY:e.pageY},i.current.id=e.pointerId;let o=W(q(e));a(o,`pointermove`,n,!1),a(o,`pointerup`,r,!1),a(o,`pointercancel`,r,!1)}}}let n=(e,n,r)=>{t(),s(e,`keyboard`,n,r),c(e,`keyboard`)};return e.onKeyDown=e=>{switch(e.key){case`Left`:case`ArrowLeft`:e.preventDefault(),e.stopPropagation(),n(e,-1,0);break;case`Right`:case`ArrowRight`:e.preventDefault(),e.stopPropagation(),n(e,1,0);break;case`Up`:case`ArrowUp`:e.preventDefault(),e.stopPropagation(),n(e,0,-1);break;case`Down`:case`ArrowDown`:e.preventDefault(),e.stopPropagation(),n(e,0,1)}},e},[a,o,i])}}let Aa=(0,d.createContext)({}),ja=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,Aa);let{isDisabled:n,isInvalid:r,isReadOnly:i,onHoverStart:a,onHoverChange:o,onHoverEnd:s,...c}=e;n??=!!e[`aria-disabled`]&&e[`aria-disabled`]!==`false`,r??=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`;let{hoverProps:l,isHovered:u}=ei({onHoverStart:a,onHoverChange:o,onHoverEnd:s,isDisabled:n}),{isFocused:f,isFocusVisible:p,focusProps:m}=Jr({within:!0}),h=z({...e,values:{isHovered:u,isFocusWithin:f,isFocusVisible:p,isDisabled:n,isInvalid:r},defaultClassName:`react-aria-Group`});return d.default.createElement(H.div,{...F(c,m,l),...h,ref:t,role:e.role??`group`,slot:e.slot??void 0,"data-focus-within":f||void 0,"data-hovered":u||void 0,"data-focus-visible":p||void 0,"data-disabled":n||void 0,"data-invalid":r||void 0,"data-readonly":i||void 0},h.children)}),Ma=(0,d.createContext)({}),Na=e=>{let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,...i}=e;return i},Pa=Kn(function(e,t){[e,t]=V(e,t,Ma);let{hoverProps:n,isHovered:r}=ei({...e,isDisabled:e.disabled}),{isFocused:i,isFocusVisible:a,focusProps:o}=Jr({isTextInput:!0,autoFocus:e.autoFocus}),s=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`,c=z({...e,values:{isHovered:r,isFocused:i,isFocusVisible:a,isDisabled:e.disabled||!1,isInvalid:s},defaultClassName:`react-aria-Input`});return d.default.createElement(H.input,{...F(Na(e),o,n),...c,ref:t,"data-focused":i||void 0,"data-disabled":e.disabled||void 0,"data-hovered":r||void 0,"data-focus-visible":a||void 0,"data-invalid":s||void 0})});function Fa(e,t){let{inputElementType:n=`input`,isDisabled:r=!1,isRequired:i=!1,isReadOnly:a=!1,type:o=`text`,validationBehavior:s=`aria`}=e,[c,l]=cn(e.value,e.defaultValue||``,e.onChange),{focusableProps:u}=Un(e,t),f=ra({...e,value:c}),{isInvalid:p,validationErrors:m,validationDetails:h}=f.displayValidation,{labelProps:g,fieldProps:_,descriptionProps:v,errorMessageProps:y}=da({...e,isInvalid:p,errorMessage:e.errorMessage||m}),b=Y(e,{labelable:!0}),x={type:o,pattern:e.pattern},[S]=(0,d.useState)(c);return fa(t,e.defaultValue??S,l),pa(e,f,t),{labelProps:g,inputProps:F(b,n===`input`?x:void 0,{disabled:r,readOnly:a,required:i&&s===`native`,"aria-required":i&&s===`aria`||void 0,"aria-invalid":p||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-activedescendant":e[`aria-activedescendant`],"aria-autocomplete":e[`aria-autocomplete`],"aria-haspopup":e[`aria-haspopup`],"aria-controls":e[`aria-controls`],value:c,onChange:e=>l(q(e).value),autoComplete:e.autoComplete,autoCapitalize:e.autoCapitalize,maxLength:e.maxLength,minLength:e.minLength,name:e.name,form:e.form,placeholder:e.placeholder,inputMode:e.inputMode,autoCorrect:e.autoCorrect,spellCheck:e.spellCheck,[parseInt(d.default.version,10)>=17?`enterKeyHint`:`enterkeyhint`]:e.enterKeyHint,onCopy:e.onCopy,onCut:e.onCut,onPaste:e.onPaste,onCompositionEnd:e.onCompositionEnd,onCompositionStart:e.onCompositionStart,onCompositionUpdate:e.onCompositionUpdate,onSelect:e.onSelect,onBeforeInput:e.onBeforeInput,onInput:e.onInput,...u,..._}),descriptionProps:v,errorMessageProps:y,isInvalid:p,validationErrors:m,validationDetails:h}}function Ia(){return typeof window<`u`&&window.InputEvent&&typeof InputEvent.prototype.getTargetRanges==`function`}function La(e,t,n){let r=J(e=>{let r=n.current;if(!r)return;let i=null;switch(e.inputType){case`historyUndo`:case`historyRedo`:return;case`insertLineBreak`:return;case`deleteContent`:case`deleteByCut`:case`deleteByDrag`:i=r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteContentForward`:i=r.selectionEnd===r.selectionStart?r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd+1):r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteContentBackward`:i=r.selectionEnd===r.selectionStart?r.value.slice(0,r.selectionStart-1)+r.value.slice(r.selectionStart):r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteSoftLineBackward`:case`deleteHardLineBackward`:i=r.value.slice(r.selectionStart);break;default:e.data!=null&&(i=r.value.slice(0,r.selectionStart)+e.data+r.value.slice(r.selectionEnd))}(i==null||!t.validate(i))&&e.preventDefault()});(0,d.useEffect)(()=>{if(!Ia()||!n.current)return;let e=n.current;return e.addEventListener(`beforeinput`,r,!1),()=>{e.removeEventListener(`beforeinput`,r,!1)}},[n]);let i=Ia()?null:e=>{let n=q(e).value.slice(0,q(e).selectionStart)+e.data+q(e).value.slice(q(e).selectionEnd);t.validate(n)||e.preventDefault()},{labelProps:a,inputProps:o,descriptionProps:s,errorMessageProps:c,...l}=Fa(e,n),u=(0,d.useRef)(null);return{inputProps:F(o,{onBeforeInput:i,onCompositionStart(){let{value:e,selectionStart:t,selectionEnd:r}=n.current;u.current={value:e,selectionStart:t,selectionEnd:r}},onCompositionEnd(){if(n.current&&!t.validate(n.current.value)){let{value:e,selectionStart:r,selectionEnd:i}=u.current;n.current.value=e,n.current.setSelectionRange(r,i),t.setInputValue(e)}}}),labelProps:a,descriptionProps:s,errorMessageProps:c,...l}}function Ra(e,t){let{onScroll:n,isDisabled:r}=e,i=(0,d.useCallback)(e=>{e.ctrlKey||(e.preventDefault(),e.stopPropagation(),n&&n({deltaX:e.deltaX,deltaY:e.deltaY}))},[n]);At(t,`wheel`,r?void 0:i)}var za={};za={Empty:`فارغ`};var Ba={};Ba={Empty:`Изпразни`};var Va={};Va={Empty:`Prázdné`};var Ha={};Ha={Empty:`Tom`};var Ua={};Ua={Empty:`Leer`};var Wa={};Wa={Empty:`Άδειο`};var Ga={};Ga={Empty:`Empty`};var Ka={};Ka={Empty:`Vacío`};var qa={};qa={Empty:`Tühjenda`};var Ja={};Ja={Empty:`Tyhjä`};var Ya={};Ya={Empty:`Vide`};var Xa={};Xa={Empty:`ריק`};var Za={};Za={Empty:`Prazno`};var Qa={};Qa={Empty:`Üres`};var $a={};$a={Empty:`Vuoto`};var eo={};eo={Empty:`空`};var to={};to={Empty:`비어 있음`};var no={};no={Empty:`Tuščias`};var ro={};ro={Empty:`Tukšs`};var io={};io={Empty:`Tom`};var ao={};ao={Empty:`Leeg`};var oo={};oo={Empty:`Pusty`};var so={};so={Empty:`Vazio`};var co={};co={Empty:`Vazio`};var lo={};lo={Empty:`Gol`};var uo={};uo={Empty:`Не заполнено`};var fo={};fo={Empty:`Prázdne`};var po={};po={Empty:`Prazen`};var mo={};mo={Empty:`Prazno`};var ho={};ho={Empty:`Tomt`};var go={};go={Empty:`Boş`};var _o={};_o={Empty:`Пусто`};var vo={};vo={Empty:`空`};var yo={};yo={Empty:`空白`};var bo={};bo={"ar-AE":za,"bg-BG":Ba,"cs-CZ":Va,"da-DK":Ha,"de-DE":Ua,"el-GR":Wa,"en-US":Ga,"es-ES":Ka,"et-EE":qa,"fi-FI":Ja,"fr-FR":Ya,"he-IL":Xa,"hr-HR":Za,"hu-HU":Qa,"it-IT":$a,"ja-JP":eo,"ko-KR":to,"lt-LT":no,"lv-LV":ro,"nb-NO":io,"nl-NL":ao,"pl-PL":oo,"pt-BR":so,"pt-PT":co,"ro-RO":lo,"ru-RU":uo,"sk-SK":fo,"sl-SI":po,"sr-SP":mo,"sv-SE":ho,"tr-TR":go,"uk-UA":_o,"zh-CN":vo,"zh-TW":yo};function xo(e){return e&&e.__esModule?e.default:e}let So=()=>{};function Co(e){let t=(0,d.useRef)(void 0),{value:n,textValue:r,minValue:i,maxValue:a,isDisabled:o,isReadOnly:s,isRequired:c,onIncrement:l,onIncrementPage:u,onDecrement:f,onDecrementPage:p,onDecrementToMin:m,onIncrementToMax:h}=e,g=on(xo(bo),`@react-aria/spinbutton`),_=(0,d.useRef)(!1),v=(0,d.useCallback)(()=>{clearTimeout(t.current),_.current=!1},[]),y=J(()=>{v()});(0,d.useEffect)(()=>()=>y(),[]);let{keyboardProps:b}=zn({isDisabled:o||s,shortcuts:{PageUp:()=>{if(u){u();return}if(l){l();return}return!1},ArrowUp:()=>{if(l){l();return}return!1},PageDown:()=>{if(p){p();return}if(f){f();return}return!1},ArrowDown:()=>{if(f){f();return}return!1},Home:()=>{if(m){m();return}return!1},End:()=>{if(h){h();return}return!1}},allowRepeats:!0}),x=(0,d.useRef)(!1),S=()=>{x.current=!0},C=()=>{x.current=!1},w=r===``?g.format(`Empty`):(r||`${n}`).replace(`-`,`−`);(0,d.useEffect)(()=>{x.current&&(ki(`assertive`),Oi(w,`assertive`))},[w]);let T=(0,d.useCallback)(()=>{v()},[v]),E=J(l??So),D=J(f??So),O=J(()=>{(a===void 0||isNaN(a)||n===void 0||isNaN(n)||n<a)&&(E(),k(60))}),k=J(e=>{y(),_.current=!0,t.current=window.setTimeout(O,e)}),A=J(()=>{(i===void 0||isNaN(i)||n===void 0||isNaN(n)||n>i)&&(D(),j(60))}),j=J(e=>{y(),_.current=!0,t.current=window.setTimeout(A,e)}),M=e=>{e.preventDefault()},{addGlobalListener:N,removeAllGlobalListeners:ee}=Nr(),P=(0,d.useRef)(!1),[te,F]=(0,d.useState)(null);(0,d.useEffect)(()=>{te===`touch`?k(600):te?k(400):te||y()},[te]);let[I,L]=(0,d.useState)(null);return(0,d.useEffect)(()=>{I===`touch`?j(600):I?j(400):I||y()},[I]),{spinButtonProps:{role:`spinbutton`,"aria-valuenow":n!==void 0&&!isNaN(n)?n:void 0,"aria-valuetext":w,"aria-valuemin":i,"aria-valuemax":a,"aria-disabled":o||void 0,"aria-readonly":s||void 0,"aria-required":c||void 0,...b,onFocus:S,onBlur:C},incrementButtonProps:{onPressStart:e=>{v(),e.pointerType===`touch`?(N(window,`pointercancel`,T,{capture:!0}),P.current=!1,F(`touch`)):(l?.(),F(`mouse`)),N(window,`contextmenu`,M)},onPressUp:e=>{v(),e.pointerType===`touch`&&(P.current=!0),ee(),F(null)},onPressEnd:e=>{v(),e.pointerType===`touch`&&!_.current&&P.current&&l?.(),P.current=!1,F(null)},onFocus:S,onBlur:C},decrementButtonProps:{onPressStart:e=>{v(),e.pointerType===`touch`?(N(window,`pointercancel`,T,{capture:!0}),P.current=!1,L(`touch`)):(f?.(),L(`mouse`))},onPressUp:e=>{v(),e.pointerType===`touch`&&(P.current=!0),ee(),L(null)},onPressEnd:e=>{v(),e.pointerType===`touch`&&!_.current&&P.current&&f?.(),P.current=!1,L(null)},onFocus:S,onBlur:C}}}var wo={};wo={decrease:e=>`\u{62E}\u{641}\u{636} ${e.fieldLabel}`,increase:e=>`\u{632}\u{64A}\u{627}\u{62F}\u{629} ${e.fieldLabel}`,numberField:`حقل رقمي`};var To={};To={decrease:e=>`\u{41D}\u{430}\u{43C}\u{430}\u{43B}\u{44F}\u{432}\u{430}\u{43D}\u{435} ${e.fieldLabel}`,increase:e=>`\u{423}\u{441}\u{438}\u{43B}\u{432}\u{430}\u{43D}\u{435} ${e.fieldLabel}`,numberField:`Номер на полето`};var Eo={};Eo={decrease:e=>`Sn\xed\u{17E}it ${e.fieldLabel}`,increase:e=>`Zv\xfd\u{161}it ${e.fieldLabel}`,numberField:`Číselné pole`};var Do={};Do={decrease:e=>`Reducer ${e.fieldLabel}`,increase:e=>`\xd8g ${e.fieldLabel}`,numberField:`Talfelt`};var Oo={};Oo={decrease:e=>`${e.fieldLabel} verringern`,increase:e=>`${e.fieldLabel} erh\xf6hen`,numberField:`Nummernfeld`};var ko={};ko={decrease:e=>`\u{39C}\u{3B5}\u{3AF}\u{3C9}\u{3C3}\u{3B7} ${e.fieldLabel}`,increase:e=>`\u{391}\u{3CD}\u{3BE}\u{3B7}\u{3C3}\u{3B7} ${e.fieldLabel}`,numberField:`Πεδίο αριθμού`};var Ao={};Ao={decrease:e=>`Decrease ${e.fieldLabel}`,increase:e=>`Increase ${e.fieldLabel}`,numberField:`Number field`};var jo={};jo={decrease:e=>`Reducir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo de número`};var Mo={};Mo={decrease:e=>`V\xe4henda ${e.fieldLabel}`,increase:e=>`Suurenda ${e.fieldLabel}`,numberField:`Numbri väli`};var No={};No={decrease:e=>`V\xe4henn\xe4 ${e.fieldLabel}`,increase:e=>`Lis\xe4\xe4 ${e.fieldLabel}`,numberField:`Numerokenttä`};var Po={};Po={decrease:e=>`Diminuer ${e.fieldLabel}`,increase:e=>`Augmenter ${e.fieldLabel}`,numberField:`Champ de nombre`};var Fo={};Fo={decrease:e=>`\u{5D4}\u{5E7}\u{5D8}\u{5DF} ${e.fieldLabel}`,increase:e=>`\u{5D4}\u{5D2}\u{5D3}\u{5DC} ${e.fieldLabel}`,numberField:`שדה מספר`};var Io={};Io={decrease:e=>`Smanji ${e.fieldLabel}`,increase:e=>`Pove\u{107}aj ${e.fieldLabel}`,numberField:`Polje broja`};var Lo={};Lo={decrease:e=>`${e.fieldLabel} cs\xf6kkent\xe9se`,increase:e=>`${e.fieldLabel} n\xf6vel\xe9se`,numberField:`Számmező`};var Ro={};Ro={decrease:e=>`Riduci ${e.fieldLabel}`,increase:e=>`Aumenta ${e.fieldLabel}`,numberField:`Campo numero`};var zo={};zo={decrease:e=>`${e.fieldLabel}\u{3092}\u{7E2E}\u{5C0F}`,increase:e=>`${e.fieldLabel}\u{3092}\u{62E1}\u{5927}`,numberField:`数値フィールド`};var Bo={};Bo={decrease:e=>`${e.fieldLabel} \u{AC10}\u{C18C}`,increase:e=>`${e.fieldLabel} \u{C99D}\u{AC00}`,numberField:`번호 필드`};var Vo={};Vo={decrease:e=>`Suma\u{17E}inti ${e.fieldLabel}`,increase:e=>`Padidinti ${e.fieldLabel}`,numberField:`Numerio laukas`};var Ho={};Ho={decrease:e=>`Samazin\u{101}\u{161}ana ${e.fieldLabel}`,increase:e=>`Palielin\u{101}\u{161}ana ${e.fieldLabel}`,numberField:`Skaitļu lauks`};var Uo={};Uo={decrease:e=>`Reduser ${e.fieldLabel}`,increase:e=>`\xd8k ${e.fieldLabel}`,numberField:`Tallfelt`};var Wo={};Wo={decrease:e=>`${e.fieldLabel} verlagen`,increase:e=>`${e.fieldLabel} verhogen`,numberField:`Getalveld`};var Go={};Go={decrease:e=>`Zmniejsz ${e.fieldLabel}`,increase:e=>`Zwi\u{119}ksz ${e.fieldLabel}`,numberField:`Pole numeru`};var Ko={};Ko={decrease:e=>`Diminuir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo de número`};var qo={};qo={decrease:e=>`Diminuir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo numérico`};var Jo={};Jo={decrease:e=>`Sc\u{103}dere ${e.fieldLabel}`,increase:e=>`Cre\u{219}tere ${e.fieldLabel}`,numberField:`Câmp numeric`};var Yo={};Yo={decrease:e=>`\u{423}\u{43C}\u{435}\u{43D}\u{44C}\u{448}\u{435}\u{43D}\u{438}\u{435} ${e.fieldLabel}`,increase:e=>`\u{423}\u{432}\u{435}\u{43B}\u{438}\u{447}\u{435}\u{43D}\u{438}\u{435} ${e.fieldLabel}`,numberField:`Числовое поле`};var Xo={};Xo={decrease:e=>`Zn\xed\u{17E}i\u{165} ${e.fieldLabel}`,increase:e=>`Zv\xfd\u{161}i\u{165} ${e.fieldLabel}`,numberField:`Číselné pole`};var Zo={};Zo={decrease:e=>`Upadati ${e.fieldLabel}`,increase:e=>`Pove\u{10D}ajte ${e.fieldLabel}`,numberField:`Številčno polje`};var Qo={};Qo={decrease:e=>`Smanji ${e.fieldLabel}`,increase:e=>`Pove\u{107}aj ${e.fieldLabel}`,numberField:`Polje broja`};var $o={};$o={decrease:e=>`Minska ${e.fieldLabel}`,increase:e=>`\xd6ka ${e.fieldLabel}`,numberField:`Nummerfält`};var es={};es={decrease:e=>`${e.fieldLabel} azalt`,increase:e=>`${e.fieldLabel} artt\u{131}r`,numberField:`Sayı alanı`};var ts={};ts={decrease:e=>`\u{417}\u{43C}\u{435}\u{43D}\u{448}\u{438}\u{442}\u{438} ${e.fieldLabel}`,increase:e=>`\u{417}\u{431}\u{456}\u{43B}\u{44C}\u{448}\u{438}\u{442}\u{438} ${e.fieldLabel}`,numberField:`Поле номера`};var ns={};ns={decrease:e=>`\u{964D}\u{4F4E} ${e.fieldLabel}`,increase:e=>`\u{63D0}\u{9AD8} ${e.fieldLabel}`,numberField:`数字字段`};var rs={};rs={decrease:e=>`\u{7E2E}\u{5C0F} ${e.fieldLabel}`,increase:e=>`\u{653E}\u{5927} ${e.fieldLabel}`,numberField:`數字欄位`};var is={};is={"ar-AE":wo,"bg-BG":To,"cs-CZ":Eo,"da-DK":Do,"de-DE":Oo,"el-GR":ko,"en-US":Ao,"es-ES":jo,"et-EE":Mo,"fi-FI":No,"fr-FR":Po,"he-IL":Fo,"hr-HR":Io,"hu-HU":Lo,"it-IT":Ro,"ja-JP":zo,"ko-KR":Bo,"lt-LT":Vo,"lv-LV":Ho,"nb-NO":Uo,"nl-NL":Wo,"pl-PL":Go,"pt-BR":Ko,"pt-PT":qo,"ro-RO":Jo,"ru-RU":Yo,"sk-SK":Xo,"sl-SI":Zo,"sr-SP":Qo,"sv-SE":$o,"tr-TR":es,"uk-UA":ts,"zh-CN":ns,"zh-TW":rs};function as(e){return e&&e.__esModule?e.default:e}function os(e,t,n){let{id:r,decrementAriaLabel:i,incrementAriaLabel:a,isDisabled:o,isReadOnly:s,isRequired:c,minValue:l,maxValue:u,autoFocus:f,label:p,formatOptions:m,onBlur:h=()=>{},onFocus:g,onFocusChange:_,onKeyDown:v,onKeyUp:y,description:b,errorMessage:x,isWheelDisabled:S,...C}=e,{increment:w,incrementToMax:T,decrement:E,decrementToMin:D,numberValue:O,inputValue:k,commit:j,commitValidation:M}=t,N=on(as(is),`@react-aria/numberfield`),ee=(0,d.useCallback)(()=>{let e=n.current?.value??``;(0,Xn.flushSync)(()=>{j()}),n.current?.value!==e&&Oi(n.current?.value??``,`assertive`)},[j,n]),P=A(r),{focusProps:te}=Tn({onBlur(){ee()}}),I=xi(m),L=(0,d.useMemo)(()=>I.resolvedOptions(),[I]),R=xi({...m,currencySign:void 0}),{spinButtonProps:z,incrementButtonProps:B,decrementButtonProps:V}=Co({isDisabled:o,isReadOnly:s,isRequired:c,maxValue:u,minValue:l,onIncrement:w,onIncrementToMax:T,onDecrement:E,onDecrementToMin:D,value:O,textValue:(0,d.useMemo)(()=>isNaN(O)?``:R.format(O),[R,O])}),[ne,re]=(0,d.useState)(!1),{focusWithinProps:ie}=qr({isDisabled:o,onFocusWithinChange:re});Ra({onScroll:(0,d.useCallback)(e=>{Math.abs(e.deltaY)<=Math.abs(e.deltaX)||(e.deltaY>0?w():e.deltaY<0&&E())},[E,w]),isDisabled:S||o||s||!ne},n);let ae=(L.maximumFractionDigits??0)>0,H=t.minValue===void 0||isNaN(t.minValue)||t.minValue<0,U=`numeric`;He()?H?U=`text`:ae&&(U=`decimal`):Je()&&(H?U=`numeric`:ae&&(U=`decimal`));let W=e=>{t.validate(e)&&t.setInputValue(e)},oe=t=>{e.onPaste?.(t);let n=q(t);n&&(n.selectionEnd??-1)-(n.selectionStart??0)===n.value.length&&(t.preventDefault(),j(t.clipboardData?.getData?.(`text/plain`)?.trim()??``))},se=Y(e),{keyboardProps:ce}=zn({isDisabled:o||s,shortcuts:{Enter:()=>((0,Xn.flushSync)(()=>{j()}),M(),{shouldPreventDefault:!1})},onKeyDown:v,onKeyUp:y}),{isInvalid:le,validationErrors:ue,validationDetails:de}=t.displayValidation,{labelProps:fe,inputProps:G,descriptionProps:pe,errorMessageProps:me}=La({...C,...se,name:void 0,form:void 0,label:p,autoFocus:f,isDisabled:o,isReadOnly:s,isRequired:c,validate:void 0,[na]:t,value:k,defaultValue:`!`,autoComplete:`off`,"aria-label":e[`aria-label`]||void 0,"aria-labelledby":e[`aria-labelledby`]||void 0,id:P,type:`text`,inputMode:U,onChange:W,onBlur:h,onFocus:g,onFocusChange:_,onPaste:oe,description:b,errorMessage:x},t,n),he=F(ce,G);fa(n,t.defaultNumberValue,t.setNumberValue),ss(t,e.validationBehavior,e.commitBehavior,n,t.minValue,t.maxValue,e.step,t.numberValue);let ge=F(z,te,he,{role:null,"aria-roledescription":We()?null:N.format(`numberField`),"aria-valuemax":null,"aria-valuemin":null,"aria-valuenow":null,"aria-valuetext":null,autoCorrect:`off`,spellCheck:`false`});e.validationBehavior===`native`&&(ge[`aria-required`]=void 0);let _e=e=>{K()!==n.current&&(e.pointerType===`mouse`?n.current?.focus():e.target.focus())},ve=e[`aria-label`]||(typeof e.label==`string`?e.label:``),ye;ve||(ye=e.label==null?e[`aria-labelledby`]:fe.id);let be=A(),xe=A(),Se=F(B,{"aria-label":a||N.format(`increase`,{fieldLabel:ve}).trim(),id:ye&&!a?be:null,"aria-labelledby":ye&&!a?`${be} ${ye}`:null,"aria-controls":P,excludeFromTabOrder:!0,preventFocusOnPress:!0,allowFocusWhenDisabled:!0,isDisabled:!t.canIncrement,onPressStart:_e}),Ce=F(V,{"aria-label":i||N.format(`decrease`,{fieldLabel:ve}).trim(),id:ye&&!i?xe:null,"aria-labelledby":ye&&!i?`${xe} ${ye}`:null,"aria-controls":P,excludeFromTabOrder:!0,preventFocusOnPress:!0,allowFocusWhenDisabled:!0,isDisabled:!t.canDecrement,onPressStart:_e});return{groupProps:{...ie,role:`group`,"aria-disabled":o,"aria-invalid":le?`true`:void 0},labelProps:fe,inputProps:ge,incrementButtonProps:Se,decrementButtonProps:Ce,errorMessageProps:me,descriptionProps:pe,isInvalid:le,validationErrors:ue,validationDetails:de}}let X=null;function ss(e,t,n,r,i,a,o,s){f(()=>{let c=r.current;if(n!==`validate`||e.realtimeValidation.isInvalid||!c||c.disabled||(!X&&typeof document<`u`&&(X=document.createElement(`input`),X.type=`number`),!X))return;X.min=i!=null&&!isNaN(i)?String(i):``,X.max=a!=null&&!isNaN(a)?String(a):``,X.step=o!=null&&!isNaN(o)?String(o):``,X.value=s!=null&&!isNaN(s)?String(s):``;let l=c.validity.valid&&X.validity.valid,u=c.validationMessage||X.validationMessage,d={isInvalid:!l,validationErrors:u?[u]:[],validationDetails:{badInput:c.validity.badInput,customError:c.validity.customError,patternMismatch:c.validity.patternMismatch,rangeOverflow:X.validity.rangeOverflow,rangeUnderflow:X.validity.rangeUnderflow,stepMismatch:X.validity.stepMismatch,tooLong:c.validity.tooLong,tooShort:c.validity.tooShort,typeMismatch:c.validity.typeMismatch,valueMissing:c.validity.valueMissing,valid:l}};e.updateValidation(d),t===`native`&&!X.validity.valid&&c.setCustomValidity(X.validationMessage)})}function cs(e){let{minValue:t,maxValue:n,step:r,formatOptions:i,value:a,defaultValue:o=NaN,onChange:s,locale:c,isDisabled:l,isReadOnly:u,commitBehavior:f=`snap`}=e;a===null&&(a=NaN);let p=(0,d.useCallback)(e=>r===void 0||isNaN(r)?Si(e,t,n):wi(e,t,n,r),[r,t,n]);a!==void 0&&!isNaN(a)&&f===`snap`&&(a=p(a)),!isNaN(o)&&f===`snap`&&(o=p(o));let[m,h]=cn(a,isNaN(o)?NaN:o,s),[g]=(0,d.useState)(m),[_,v]=(0,d.useState)(()=>isNaN(m)?``:new oi(c,i).format(m)),y=(0,d.useMemo)(()=>new di(c,i),[c,i]),b=(0,d.useMemo)(()=>y.getNumberingSystem(_),[y,_]),x=(0,d.useMemo)(()=>new oi(c,{...i,numberingSystem:b}),[c,i,b]),S=(0,d.useMemo)(()=>x.resolvedOptions(),[x]),C=(0,d.useCallback)(e=>isNaN(e)||e===null?``:x.format(e),[x]),w=ra({...e,value:m}),T=r!==void 0&&!isNaN(r)?r:1;S.style===`percent`&&(r===void 0||isNaN(r))&&(T=.01);let[E,D]=(0,d.useState)(m),[O,k]=(0,d.useState)(c),[A,j]=(0,d.useState)(i);(!Object.is(m,E)||c!==O||!ls(i,A))&&(v(C(m)),D(m),k(c),j(i));let M=(0,d.useMemo)(()=>y.parse(_),[y,_]),N=e=>{let t=e===void 0?_:e,n=M;if(e!==void 0&&(n=y.parse(t)),!t.length){h(NaN),v(a===void 0?``:C(m));return}if(isNaN(n)){v(C(m));return}let r=f===`snap`?p(n):n;r=y.parse(C(r));let i=r!==m;h(r),v(C(a===void 0?r:m)),i&&w.commitValidation()},ee=(e,r=0)=>{let i=M;if(isNaN(i))return wi(isNaN(r)?0:r,t,n,T);{let r=wi(i,t,n,T);return e===`+`&&r>i||e===`-`&&r<i?r:wi(us(e,i,T),t,n,T)}},P=()=>{let e=ee(`+`,t);e===m&&v(C(e)),h(e),w.commitValidation()},te=()=>{let e=ee(`-`,n);e===m&&v(C(e)),h(e),w.commitValidation()},F=()=>{n!=null&&(h(wi(n,t,n,T)),w.commitValidation())},I=()=>{t!=null&&(h(t),w.commitValidation())},L=(0,d.useMemo)(()=>!l&&!u&&(isNaN(M)||n===void 0||isNaN(n)||wi(M,t,n,T)>M||us(`+`,M,T)<=n),[l,u,t,n,T,M]),R=(0,d.useMemo)(()=>!l&&!u&&(isNaN(M)||t===void 0||isNaN(t)||wi(M,t,n,T)<M||us(`-`,M,T)>=t),[l,u,t,n,T,M]),z=e=>y.isValidPartialNumber(e,t,n);return{...w,validate:z,increment:P,incrementToMax:F,decrement:te,decrementToMin:I,canIncrement:L,canDecrement:R,minValue:t,maxValue:n,numberValue:M,defaultNumberValue:isNaN(o)?g:o,setNumberValue:h,setInputValue:v,inputValue:_,commit:N}}function ls(e,t){if(e===t)return!0;if(!e||!t)return!1;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(t[r]!==e[r])return!1;return!0}function us(e,t,n){let r=e===`+`?t+n:t-n;if(t%1!=0||n%1!=0){let i=t.toString().split(`.`),a=n.toString().split(`.`),o=i[1]&&i[1].length||0,s=a[1]&&a[1].length||0,c=10**Math.max(o,s);t=Math.round(t*c),n=Math.round(n*c),r=e===`+`?t+n:t-n,r/=c}return r}let ds=new WeakMap;function fs(e,t){let n=ds.get(e);if(!n)throw Error(`Unknown slider state`);return`${n.id}-${t}`}function ps(e,t,n){let{labelProps:r,fieldProps:i}=ri(e),a=e.orientation===`vertical`;ds.set(t,{id:r.id??i.id,"aria-describedby":e[`aria-describedby`],"aria-details":e[`aria-details`]});let{direction:o}=Gt(),{addGlobalListener:s,removeGlobalListener:c}=Nr(),l=(0,d.useRef)(null),u=o===`rtl`,f=(0,d.useRef)(null),{moveProps:p}=ka({onMoveStart(){f.current=null},onMove({deltaX:e,deltaY:r}){if(!n.current)return;let{height:i,width:o}=n.current.getBoundingClientRect(),s=a?i:o;f.current==null&&l.current!=null&&(f.current=t.getThumbPercent(l.current)*s);let c=a?r:e;if((a||u)&&(c=-c),f.current+=c,l.current!=null&&n.current){let e=Si(f.current/s,0,1);t.setThumbPercent(l.current,e)}},onMoveEnd(){l.current!=null&&(t.setThumbDragging(l.current,!1),l.current=null)}}),m=(0,d.useRef)(void 0),h=(r,i,c,u)=>{if(n.current&&!e.isDisabled&&t.values.every((e,n)=>!t.isThumbDragging(n))){let{height:e,width:d,top:f,left:p}=n.current.getBoundingClientRect(),h=a?e:d,_=((a?u:c)-(a?f:p))/h;(o===`rtl`||a)&&(_=1-_);let v=t.getPercentValue(_),y,b=t.values.findIndex(e=>v-e<0);if(b===0)y=b;else if(b===-1)y=t.values.length-1;else{let e=t.values[b-1],n=t.values[b];y=Math.abs(e-v)<Math.abs(n-v)?b-1:b}y>=0&&t.isThumbEditable(y)?(r.preventDefault(),l.current=y,t.setFocusedThumb(y),m.current=i,t.setThumbDragging(l.current,!0),t.setThumbValue(y,v),s(window,`mouseup`,g,!1),s(window,`touchend`,g,!1),s(window,`pointerup`,g,!1)):l.current=null}},g=e=>{(e.pointerId??e.changedTouches?.[0].identifier)===m.current&&(l.current!=null&&(t.setThumbDragging(l.current,!1),l.current=null),c(window,`mouseup`,g,!1),c(window,`touchend`,g,!1),c(window,`pointerup`,g,!1))};return`htmlFor`in r&&r.htmlFor&&(delete r.htmlFor,r.onClick=()=>{document.getElementById(fs(t,0))?.focus(),St(`keyboard`)}),{labelProps:r,groupProps:{role:`group`,...i},trackProps:F({onMouseDown(e){e.button!==0||e.altKey||e.ctrlKey||e.metaKey||h(e,void 0,e.clientX,e.clientY)},onPointerDown(e){e.pointerType===`mouse`&&(e.button!==0||e.altKey||e.ctrlKey||e.metaKey)||h(e,e.pointerId,e.clientX,e.clientY)},onTouchStart(e){h(e,e.changedTouches[0].identifier,e.changedTouches[0].clientX,e.changedTouches[0].clientY)},style:{position:`relative`,touchAction:`none`}},p),outputProps:{htmlFor:t.values.map((e,n)=>fs(t,n)).join(` `),"aria-live":`off`}}}function ms(e,t){let{index:n=0,isRequired:r,validationState:i,isInvalid:a,trackRef:o,inputRef:s,orientation:c=t.orientation,name:l,form:u}=e,f=e.isDisabled||t.isDisabled,p=c===`vertical`,{direction:m}=Gt(),{addGlobalListener:h,removeGlobalListener:g}=Nr(),_=ds.get(t),{labelProps:v,fieldProps:y}=ri({...e,id:fs(t,n),"aria-labelledby":`${_.id} ${e[`aria-labelledby`]??``}`.trim()}),b=t.values[n],x=(0,d.useCallback)(()=>{s.current&&ve(s.current)},[s]),S=t.focusedThumb===n;(0,d.useEffect)(()=>{S&&x()},[S,x]);let C=m===`rtl`,w=(0,d.useRef)(null),T=e=>{t.setThumbDragging(n,!0),e(),t.setThumbDragging(n,!1)},{keyboardProps:E}=zn({shortcuts:{PageUp:()=>T(()=>{t.incrementThumb(n,t.pageSize)}),PageDown:()=>T(()=>{t.decrementThumb(n,t.pageSize)}),Home:()=>T(()=>{t.setThumbValue(n,t.getThumbMinValue(n))}),End:()=>T(()=>{t.setThumbValue(n,t.getThumbMaxValue(n))})},allowRepeats:!0}),{moveProps:D}=ka({onMoveStart(){w.current=null,t.setThumbDragging(n,!0)},onMove({deltaX:e,deltaY:r,pointerType:i,shiftKey:a}){let{getThumbPercent:s,setThumbPercent:c,decrementThumb:l,incrementThumb:u,step:d,pageSize:f}=t;if(!o.current)return;let{width:m,height:h}=o.current.getBoundingClientRect(),g=p?h:m;if(w.current??=s(n)*g,i===`keyboard`)e>0&&C||e<0&&!C||r>0?l(n,a?f:d):u(n,a?f:d);else{let t=p?r:e;(p||C)&&(t=-t),w.current+=t,c(n,Si(w.current/g,0,1))}},onMoveEnd(){t.setThumbDragging(n,!1)}});t.setThumbEditable(n,!f);let{focusableProps:O}=Un(F(e,{onFocus:()=>t.setFocusedThumb(n),onBlur:()=>t.setFocusedThumb(void 0)}),s),k=(0,d.useRef)(void 0),A=e=>{x(),k.current=e,t.setThumbDragging(n,!0),h(window,`mouseup`,j,!1),h(window,`touchend`,j,!1),h(window,`pointerup`,j,!1)},j=e=>{(e.pointerId??e.changedTouches?.[0].identifier)===k.current&&(x(),t.setThumbDragging(n,!1),g(window,`mouseup`,j,!1),g(window,`touchend`,j,!1),g(window,`pointerup`,j,!1))},M=t.getThumbPercent(n);(p||m===`rtl`)&&(M=1-M);let N=f?{}:F(E,D,{onMouseDown:e=>{e.button!==0||e.altKey||e.ctrlKey||e.metaKey||A()},onPointerDown:e=>{e.button!==0||e.altKey||e.ctrlKey||e.metaKey||A(e.pointerId)},onTouchStart:e=>{A(e.changedTouches[0].identifier)}});return fa(s,t.defaultValues[n],e=>{t.setThumbValue(n,e)}),{inputProps:F(O,y,{type:`range`,tabIndex:f?void 0:0,min:t.getThumbMinValue(n),max:t.getThumbMaxValue(n),step:t.step,value:b,name:l,form:u,disabled:f,"aria-orientation":c,"aria-valuetext":t.getThumbValueLabel(n),"aria-required":r||void 0,"aria-invalid":a||i===`invalid`||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-describedby":[_[`aria-describedby`],e[`aria-describedby`]].filter(Boolean).join(` `),"aria-details":[_[`aria-details`],e[`aria-details`]].filter(Boolean).join(` `),onChange:e=>{t.setThumbValue(n,parseFloat(q(e).value))}}),thumbProps:{...N,style:{position:`absolute`,[p?`top`:`left`]:`${M*100}%`,transform:`translate(-50%, -50%)`,touchAction:`none`}},labelProps:v,isDragging:t.isThumbDragging(n),isDisabled:f,isFocused:S}}function hs(e){let{isDisabled:t=!1,minValue:n=0,maxValue:r=100,numberFormatter:i,step:a=1,orientation:o=`horizontal`}=e,s=(0,d.useMemo)(()=>{let e=(r-n)/10;return e=wi(e,0,e+a,a),Math.max(e,a)},[a,r,n]),c=(0,d.useCallback)(e=>e?.map((t,i)=>wi(t,i===0?n:e[i-1],i===e.length-1?r:e[i+1],a)),[n,r,a]),l=(0,d.useMemo)(()=>c(_s(e.value)),[e.value,c]),u=(0,d.useMemo)(()=>c(_s(e.defaultValue)??[n]),[e.defaultValue,n,c]),f=vs(e.value,e.defaultValue,e.onChange),p=vs(e.value,e.defaultValue,e.onChangeEnd),[m,h]=cn(l,u,f),[g]=(0,d.useState)(m),[_,v]=(0,d.useState)(Array(m.length).fill(!1)),y=(0,d.useRef)(Array(m.length).fill(!0)),[b,x]=(0,d.useState)(void 0),S=(0,d.useRef)(m),C=(0,d.useRef)(_),w=e=>{S.current=e,h(e)},T=e=>{C.current=e,v(e)};function E(e){return(e-n)/(r-n)}function D(e){return e===0?n:m[e-1]}function O(e){return e===m.length-1?r:m[e+1]}function k(e){return y.current[e]}function A(e,t){y.current[e]=t}function j(e,n){if(t||!k(e))return;let r=D(e),i=O(e);n=wi(n,r,i,a);let o=gs(S.current,e,n);w(o)}function M(e,n){if(t||!k(e))return;n&&(S.current=m);let r=C.current[e];C.current=gs(C.current,e,n),T(C.current),p&&r&&!C.current.some(Boolean)&&p(S.current)}let N=(0,d.useRef)(null);function ee(e=m){switch(typeof e==`number`&&(e=[e]),e.length){case 0:return``;case 1:return i.format(e[0]);case 2:return i.formatRange(e[0],e[1]);default:{let t=e.map(e=>i.format(e)),n=N.current;return(!n||n.resolvedOptions().locale!==i.resolvedOptions().locale)&&(n=N.current=new Intl.ListFormat(i.resolvedOptions().locale,{type:`unit`})),n.format(t)}}}function P(e,t){j(e,F(t))}function te(e){return Math.round((e-n)/a)*a+n}function F(e){return Si(te(e*(r-n)+n),n,r)}function I(e,t=1){let i=Math.max(t,a);j(e,wi(m[e]+i,n,r,a))}function L(e,t=1){let i=Math.max(t,a);j(e,wi(m[e]-i,n,r,a))}return{values:m,defaultValues:e.defaultValue===void 0?g:u,getThumbValue:e=>m[e],setThumbValue:j,setThumbPercent:P,isThumbDragging:e=>_[e],setThumbDragging:M,focusedThumb:b,setFocusedThumb:x,getThumbPercent:e=>E(m[e]),getValuePercent:E,getThumbValueLabel:e=>ee(m[e]),getFormattedValue:ee,getThumbMinValue:D,getThumbMaxValue:O,getPercentValue:F,isThumbEditable:k,setThumbEditable:A,incrementThumb:I,decrementThumb:L,step:a,pageSize:s,orientation:o,isDisabled:t}}function gs(e,t,n){return e[t]===n?e:[...e.slice(0,t),n,...e.slice(t+1)]}function _s(e){if(e!=null)return Array.isArray(e)?e:[e]}function vs(e,t,n){return r=>{typeof e==`number`||typeof t==`number`?n?.(r[0]):n?.(r)}}let ys=(0,d.createContext)(null),bs=(0,d.createContext)(null),xs=(0,d.createContext)(null),Ss=(0,d.createContext)(null),Cs=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,ys);let n=(0,d.useRef)(null),r=xi(e.formatOptions),i=hs({...e,numberFormatter:r}),[a,o]=ne(!e[`aria-label`]&&!e[`aria-labelledby`]),{groupProps:s,trackProps:c,labelProps:l,outputProps:u}=ps({...e,label:o},i,n),f=z({...e,values:{orientation:i.orientation,isDisabled:i.isDisabled,state:i},defaultClassName:`react-aria-Slider`}),p=Y(e,{global:!0});return delete p.id,d.default.createElement(R,{values:[[bs,i],[xs,{...c,ref:n}],[Ss,u],[ti,{...l,ref:a}]]},d.default.createElement(H.div,{...F(p,f,s),ref:t,slot:e.slot||void 0,"data-orientation":i.orientation,"data-disabled":i.isDisabled||void 0}))}),ws=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,xs);let n=(0,d.useContext)(bs),{onHoverStart:r,onHoverEnd:i,onHoverChange:a,...o}=e,{hoverProps:s,isHovered:c}=ei({onHoverStart:r,onHoverEnd:i,onHoverChange:a}),l=z({...e,defaultClassName:`react-aria-SliderTrack`,values:{orientation:n.orientation,isDisabled:n.isDisabled,isHovered:c,state:n}});return d.default.createElement(H.div,{...F(o,s),...l,ref:t,"data-hovered":c||void 0,"data-orientation":n.orientation||void 0,"data-disabled":n.isDisabled||void 0})}),Ts=(0,d.forwardRef)(function(e,t){let{inputRef:n=null}=e,r=(0,d.useContext)(bs),{ref:i}=B(xs),{index:a=0}=e,o=(0,d.useRef)(null),s=n||o,[c,l]=ne(!e[`aria-label`]&&!e[`aria-labelledby`]),{thumbProps:u,inputProps:f,labelProps:p,isDragging:m,isFocused:h,isDisabled:g}=ms({...e,index:a,trackRef:i,inputRef:s,label:l},r),{focusProps:_,isFocusVisible:v}=Jr(),{hoverProps:y,isHovered:b}=ei(e),x=z({...e,defaultClassName:`react-aria-SliderThumb`,values:{state:r,isHovered:b,isDragging:m,isFocused:h,isFocusVisible:v,isDisabled:g}}),S=Y(e,{global:!0});return delete S.id,d.default.createElement(H.div,{...F(S,u,y),...x,ref:t,style:{...u.style,...x.style},"data-hovered":b||void 0,"data-dragging":m||void 0,"data-focused":h||void 0,"data-focus-visible":v||void 0,"data-disabled":g||void 0},d.default.createElement(Xi,null,d.default.createElement(`input`,{ref:s,...F(f,_)})),d.default.createElement(R,{values:[[ti,{...p,ref:c}]]},x.children))}),Es=(0,d.createContext)(null);function Ds(e){let t=(0,d.useRef)({});return d.default.createElement(Es.Provider,{value:t},e.children)}let Os=(0,d.createContext)({isSelected:!1});var ks=class{constructor(e,t,n,r){this._walkerStack=[],this._currentSetFor=new Set,this._acceptNode=e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e.shadowRoot;if(t){let e=this._doc.createTreeWalker(t,this.whatToShow,{acceptNode:this._acceptNode});return this._walkerStack.unshift(e),NodeFilter.FILTER_ACCEPT}if(typeof this.filter==`function`)return this.filter(e);if(this.filter?.acceptNode)return this.filter.acceptNode(e);if(this.filter===null)return NodeFilter.FILTER_ACCEPT}return NodeFilter.FILTER_SKIP},this._doc=e,this.root=t,this.filter=r??null,this.whatToShow=n??NodeFilter.SHOW_ALL,this._currentNode=t,this._walkerStack.unshift(e.createTreeWalker(t,n,this._acceptNode));let i=t.shadowRoot;if(i){let e=this._doc.createTreeWalker(i,this.whatToShow,{acceptNode:this._acceptNode});this._walkerStack.unshift(e)}}get currentNode(){return this._currentNode}set currentNode(e){if(!G(this.root,e))throw Error(`Cannot set currentNode to a node that is not contained by the root node.`);let t=[],n=e,r=e;for(this._currentNode=e;n&&n!==this.root;)if(n.nodeType===Node.DOCUMENT_FRAGMENT_NODE){let e=n,i=this._doc.createTreeWalker(e,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),n=r=e.host}else n=n.parentNode;let i=this._doc.createTreeWalker(this.root,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),this._walkerStack=t}get doc(){return this._doc}firstChild(){let e=this.currentNode,t=this.nextNode();return G(e,t)?(t&&(this.currentNode=t),t):(this.currentNode=e,null)}lastChild(){let e=this._walkerStack[0].lastChild();return e&&(this.currentNode=e),e}nextNode(){let e=this._walkerStack[0].nextNode();if(e){if(e.shadowRoot){let t;if(typeof this.filter==`function`?t=this.filter(e):this.filter?.acceptNode&&(t=this.filter.acceptNode(e)),t===NodeFilter.FILTER_ACCEPT)return this.currentNode=e,e;let n=this.nextNode();return n&&(this.currentNode=n),n}return e&&(this.currentNode=e),e}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.nextNode();return e&&(this.currentNode=e),e}return null}previousNode(){let e=this._walkerStack[0];if(e.currentNode===e.root){if(this._currentSetFor.has(e)){if(this._currentSetFor.delete(e),this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}return null}let t=e.previousNode();if(t){if(t.shadowRoot){let e;if(typeof this.filter==`function`?e=this.filter(t):this.filter?.acceptNode&&(e=this.filter.acceptNode(t)),e===NodeFilter.FILTER_ACCEPT)return t&&(this.currentNode=t),t;let n=this.lastChild();return n&&(this.currentNode=n),n}return t&&(this.currentNode=t),t}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}nextSibling(){return null}previousSibling(){return null}parentNode(){return null}};function As(e,t,n,r){return fe()?new ks(e,t,n,r):e.createTreeWalker(t,n,r)}let js=d.default.createContext(null),Ms=`react-aria-focus-scope-restore`,Z=null;function Ns(e){let{children:t,contain:n,restoreFocus:r,autoFocus:i}=e,a=(0,d.useRef)(null),o=(0,d.useRef)(null),s=(0,d.useRef)([]),{parentNode:c}=(0,d.useContext)(js)||{},l=(0,d.useMemo)(()=>new tc({scopeRef:s}),[s]);f(()=>{let e=c||Q.root;if(Q.getTreeNode(e.scopeRef)&&Z&&!Ws(Z,e.scopeRef)){let t=Q.getTreeNode(Z);t&&(e=t)}e.addChild(l),Q.addNode(l)},[l,c]),f(()=>{let e=Q.getTreeNode(s);e&&(e.contain=!!n)},[n]),f(()=>{let e=a.current?.nextSibling,t=[],n=e=>e.stopPropagation();for(;e&&e!==o.current;)t.push(e),e.addEventListener(Ms,n),e=e.nextSibling;return s.current=t,()=>{for(let e of t)e.removeEventListener(Ms,n)}},[t]),Ys(s,r,n),zs(s,n),Zs(s,r,n),Js(s,i),(0,d.useEffect)(()=>{let e=K(U(s.current?s.current[0]:void 0)),t=null;if(Vs(e,s.current)){for(let n of Q.traverse())n.scopeRef&&Vs(e,n.scopeRef.current)&&(t=n);t===Q.getTreeNode(s)&&(Z=t.scopeRef)}},[s]),f(()=>()=>{let e=Q.getTreeNode(s)?.parent?.scopeRef??null;(s===Z||Ws(s,Z))&&(!e||Q.getTreeNode(e))&&(Z=e),Q.removeTreeNode(s)},[s]);let u=(0,d.useMemo)(()=>Ps(s),[]),p=(0,d.useMemo)(()=>({focusManager:u,parentNode:l}),[l,u]);return d.default.createElement(js.Provider,{value:p},d.default.createElement(`span`,{"data-focus-scope-start":!0,hidden:!0,ref:a}),t,d.default.createElement(`span`,{"data-focus-scope-end":!0,hidden:!0,ref:o}))}function Ps(e){return{focusNext(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||K(U(n[0]??void 0)),c=n[0].previousElementSibling,l=$s(Fs(n),{tabbable:i,accept:o},n);l.currentNode=Vs(s,n)?s:c;let u=l.nextNode();return!u&&a&&(l.currentNode=c,u=l.nextNode()),u&&Gs(u,!0),u},focusPrevious(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||K(U(n[0]??void 0)),c=n[n.length-1].nextElementSibling,l=$s(Fs(n),{tabbable:i,accept:o},n);l.currentNode=Vs(s,n)?s:c;let u=l.previousNode();return!u&&a&&(l.currentNode=c,u=l.previousNode()),u&&Gs(u,!0),u},focusFirst(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=$s(Fs(n),{tabbable:r,accept:i},n);a.currentNode=n[0].previousElementSibling;let o=a.nextNode();return o&&Gs(o,!0),o},focusLast(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=$s(Fs(n),{tabbable:r,accept:i},n);a.currentNode=n[n.length-1].nextElementSibling;let o=a.previousNode();return o&&Gs(o,!0),o}}}function Fs(e){return e[0].parentElement}function Is(e){let t=Q.getTreeNode(Z);for(;t&&t.scopeRef!==e;){if(t.contain)return!1;t=t.parent}return!0}function Ls(e){if(!e.form)return Array.from(U(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter(e=>!e.form);let t=e.form.elements.namedItem(e.name),n=W(e);return t instanceof n.RadioNodeList?Array.from(t).filter(e=>e instanceof n.HTMLInputElement):t instanceof n.HTMLInputElement?[t]:[]}function Rs(e){if(e.checked)return!0;let t=Ls(e);return t.length>0&&!t.some(e=>e.checked)}function zs(e,t){let n=(0,d.useRef)(void 0),r=(0,d.useRef)(void 0);f(()=>{let i=e.current;if(!t){r.current&&=(cancelAnimationFrame(r.current),void 0);return}let a=U(i?i[0]:void 0),o=t=>{if(t.key!==`Tab`||t.altKey||t.ctrlKey||t.metaKey||!Is(e)||t.isComposing)return;let n=K(a),r=e.current;if(!r||!Vs(n,r))return;let i=$s(Fs(r),{tabbable:!0},r);if(!n)return;i.currentNode=n;let o=t.shiftKey?i.previousNode():i.nextNode();o||=(i.currentNode=t.shiftKey?r[r.length-1].nextElementSibling:r[0].previousElementSibling,t.shiftKey?i.previousNode():i.nextNode()),t.preventDefault(),o&&(Gs(o,!0),o instanceof W(o).HTMLInputElement&&o.select())},s=t=>{(!Z||Ws(Z,e))&&Vs(q(t),e.current)?(Z=e,n.current=q(t)):Is(e)&&!Hs(q(t),e)?n.current?Gs(n.current):Z&&Z.current&&qs(Z.current):Is(e)&&(n.current=q(t))},c=t=>{r.current&&cancelAnimationFrame(r.current),r.current=requestAnimationFrame(()=>{let r=xt(),i=(r===`virtual`||r===null)&&Je()&&qe(),o=K(a);if(!i&&o&&Is(e)&&!Hs(o,e)){Z=e;let r=q(t);r&&r.isConnected?(n.current=r,Gs(n.current)):Z.current&&qs(Z.current)}})};return a.addEventListener(`keydown`,o,!1),a.addEventListener(`focusin`,s,!1),i?.forEach(e=>e.addEventListener(`focusin`,s,!1)),i?.forEach(e=>e.addEventListener(`focusout`,c,!1)),()=>{a.removeEventListener(`keydown`,o,!1),a.removeEventListener(`focusin`,s,!1),i?.forEach(e=>e.removeEventListener(`focusin`,s,!1)),i?.forEach(e=>e.removeEventListener(`focusout`,c,!1))}},[e,t]),f(()=>()=>{r.current&&cancelAnimationFrame(r.current)},[r])}function Bs(e){return Hs(e)}function Vs(e,t){return!e||!t?!1:t.some(t=>G(t,e))}function Hs(e,t=null){if(e instanceof Element&&e.closest(`[data-react-aria-top-layer]`))return!0;for(let{scopeRef:n}of Q.traverse(Q.getTreeNode(t)))if(n&&Vs(e,n.current))return!0;return!1}function Us(e){return Hs(e,Z)}function Ws(e,t){let n=Q.getTreeNode(t)?.parent;for(;n;){if(n.scopeRef===e)return!0;n=n.parent}return!1}function Gs(e,t=!1){if(e!=null&&!t)try{wn(e)}catch{}else if(e!=null)try{e.focus()}catch{}}function Ks(e,t=!0){let n=e[0].previousElementSibling,r=Fs(e),i=$s(r,{tabbable:t},e);i.currentNode=n;let a=i.nextNode();return t&&!a&&(r=Fs(e),i=$s(r,{tabbable:!1},e),i.currentNode=n,a=i.nextNode()),a}function qs(e,t=!0){Gs(Ks(e,t))}function Js(e,t){let n=d.default.useRef(t);(0,d.useEffect)(()=>{if(n.current){Z=e;let t=U(e.current?e.current[0]:void 0);!Vs(K(t),Z.current)&&e.current&&qs(e.current)}n.current=!1},[e])}function Ys(e,t,n){f(()=>{if(t||n)return;let r=e.current,i=U(r?r[0]:void 0),a=t=>{let n=q(t);Vs(n,e.current)?Z=e:Bs(n)||(Z=null)};return i.addEventListener(`focusin`,a,!1),r?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),r?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[e,t,n])}function Xs(e){let t=Q.getTreeNode(Z);for(;t&&t.scopeRef!==e;){if(t.nodeToRestore)return!1;t=t.parent}return t?.scopeRef===e}function Zs(e,t,n){let r=(0,d.useRef)(typeof document<`u`?K(U(e.current?e.current[0]:void 0)):null);f(()=>{let r=e.current,i=U(r?r[0]:void 0);if(!t||n)return;let a=()=>{(!Z||Ws(Z,e))&&Vs(K(i),e.current)&&(Z=e)};return i.addEventListener(`focusin`,a,!1),r?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),r?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[e,n]),f(()=>{let r=U(e.current?e.current[0]:void 0);if(!t)return;let i=t=>{if(t.key!==`Tab`||t.altKey||t.ctrlKey||t.metaKey||!Is(e)||t.isComposing)return;let n=r.activeElement;if(!Hs(n,e)||!Xs(e))return;let i=Q.getTreeNode(e);if(!i)return;let a=i.nodeToRestore,o=$s(r.body,{tabbable:!0});o.currentNode=n;let s=t.shiftKey?o.previousNode():o.nextNode();if((!a||!a.isConnected||a===r.body)&&(a=void 0,i.nodeToRestore=void 0),(!s||!Hs(s,e))&&a){o.currentNode=a;do s=t.shiftKey?o.previousNode():o.nextNode();while(Hs(s,e));t.preventDefault(),t.stopPropagation(),s?Gs(s,!0):Bs(a)?Gs(a,!0):n.blur()}};return n||r.addEventListener(`keydown`,i,!0),()=>{n||r.removeEventListener(`keydown`,i,!0)}},[e,t,n]),f(()=>{let n=U(e.current?e.current[0]:void 0);if(!t)return;let i=Q.getTreeNode(e);if(i)return i.nodeToRestore=r.current??void 0,()=>{let r=Q.getTreeNode(e);if(!r)return;let i=r.nodeToRestore,a=K(n);if(t&&i&&(a&&Hs(a,e)||a===n.body&&Xs(e))){let t=Q.clone();requestAnimationFrame(()=>{if(n.activeElement===n.body){let n=t.getTreeNode(e);for(;n;){if(n.nodeToRestore&&n.nodeToRestore.isConnected){Qs(n.nodeToRestore);return}n=n.parent}for(n=t.getTreeNode(e);n;){if(n.scopeRef&&n.scopeRef.current&&Q.getTreeNode(n.scopeRef)){let e=Ks(n.scopeRef.current,!0);if(e){Qs(e);return}}n=n.parent}}})}}},[e,t])}function Qs(e){e.dispatchEvent(new CustomEvent(Ms,{bubbles:!0,cancelable:!0}))&&Gs(e)}function $s(e,t,n){let r=t?.tabbable?je:Ae,i=e?.nodeType===Node.ELEMENT_NODE?e:null,a=U(i),o=As(a,e||a,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return G(t?.from,e)||t?.tabbable&&e.tagName===`INPUT`&&e.getAttribute(`type`)===`radio`&&(!Rs(e)||o.currentNode.tagName===`INPUT`&&o.currentNode.type===`radio`&&o.currentNode.name===e.name)?NodeFilter.FILTER_REJECT:r(e)&&(!n||Vs(e,n))&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(o.currentNode=t.from),o}var ec=class e{constructor(){this.fastMap=new Map,this.root=new tc({scopeRef:null}),this.fastMap.set(null,this.root)}get size(){return this.fastMap.size}getTreeNode(e){return this.fastMap.get(e)}addTreeNode(e,t,n){let r=this.fastMap.get(t??null);if(!r)return;let i=new tc({scopeRef:e});r.addChild(i),i.parent=r,this.fastMap.set(e,i),n&&(i.nodeToRestore=n)}addNode(e){this.fastMap.set(e.scopeRef,e)}removeTreeNode(e){if(e===null)return;let t=this.fastMap.get(e);if(!t)return;let n=t.parent;for(let e of this.traverse())e!==t&&t.nodeToRestore&&e.nodeToRestore&&t.scopeRef&&t.scopeRef.current&&Vs(e.nodeToRestore,t.scopeRef.current)&&(e.nodeToRestore=t.nodeToRestore);let r=t.children;n&&(n.removeChild(t),r.size>0&&r.forEach(e=>n&&n.addChild(e))),this.fastMap.delete(t.scopeRef)}*traverse(e=this.root){if(e.scopeRef!=null&&(yield e),e.children.size>0)for(let t of e.children)yield*this.traverse(t)}clone(){let t=new e;for(let e of this.traverse())t.addTreeNode(e.scopeRef,e.parent?.scopeRef??null,e.nodeToRestore);return t}},tc=class{constructor(e){this.children=new Set,this.contain=!1,this.scopeRef=e.scopeRef}addChild(e){this.children.add(e),e.parent=this}removeChild(e){this.children.delete(e),e.parent=void 0}};let Q=new ec;function nc(e){return Ge()?e.altKey:e.ctrlKey}function rc(e,t){let n=`[data-key="${CSS.escape(String(t))}"]`,r=e.current?.dataset.collection;return r&&(n=`[data-collection="${CSS.escape(r)}"]${n}`),e.current?.querySelector(n)}let ic=new WeakMap;function ac(e){let t=A();return ic.set(e,t),t}function oc(e){return ic.get(e)}let sc=1e3;function cc(e){let{keyboardDelegate:t,selectionManager:n,onTypeSelect:r}=e,i=(0,d.useRef)({search:``,timeout:void 0});return(0,d.useEffect)(()=>{let e=i.current.timeout;return()=>{clearTimeout(e)}},[i]),{typeSelectProps:{onKeyDownCapture:t.getKeyForSearch?e=>{if(i.current.search.length>0&&e.key===` `){if(e.preventDefault(),(!(`continuePropagation`in e)||`continuePropagation`in e&&!e.isPropagationStopped())&&e.stopPropagation(),i.current.search+=` `,t.getKeyForSearch!=null){let e=t.getKeyForSearch(i.current.search,n.focusedKey);e??=t.getKeyForSearch(i.current.search),e!=null&&(n.setFocusedKey(e),r&&r(e))}clearTimeout(i.current.timeout),i.current.timeout=setTimeout(()=>{i.current.search=``},sc)}}:void 0,onKeyDown:t.getKeyForSearch?e=>{let a=lc(e.key);if(!(!a||e.ctrlKey||e.metaKey||e.altKey||!G(e.currentTarget,q(e))||i.current.search.length===0&&a===` `)){if(i.current.search+=a,t.getKeyForSearch!=null){let a=t.getKeyForSearch(i.current.search,n.focusedKey);if(a??=t.getKeyForSearch(i.current.search),a!=null)n.setFocusedKey(a),r&&r(a),e.preventDefault(),`continuePropagation`in e||e.stopPropagation();else{i.current.search=``,clearTimeout(i.current.timeout),i.current.timeout=void 0;return}}clearTimeout(i.current.timeout),i.current.timeout=setTimeout(()=>{i.current.search=``},sc)}}:void 0}}}function lc(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function uc(e,t){let n=(0,d.useRef)(!0),r=(0,d.useRef)(null);f(()=>(n.current=!0,()=>{n.current=!1}),[]),f(()=>{n.current?n.current=!1:(!r.current||t.some((e,t)=>!Object.is(e,r[t])))&&e(),r.current=t},t)}function dc(e){let{selectionManager:t,keyboardDelegate:n,ref:r,autoFocus:i=!1,shouldFocusWrap:a=!1,disallowEmptySelection:o=!1,disallowSelectAll:s=!1,escapeKeyBehavior:c=`clearSelection`,selectOnFocus:l=t.selectionBehavior===`replace`,disallowTypeAhead:u=!1,shouldUseVirtualFocus:f,allowsTabNavigation:p=!1,scrollRef:m=r,linkBehavior:h=`action`,UNSTABLE_focusOnEntry:g}=e,{direction:_}=Gt(),v=$e(),y=(e,n,i)=>{if(n!=null){if(t.isLink(n)&&h===`selection`&&l&&!nc(e)){(0,Xn.flushSync)(()=>{t.setFocusedKey(n,i)});let a=rc(r,n),o=t.getItemProps(n);if(a){v.open(a,e,o.href,o.routerOptions);return}return!1}if(t.setFocusedKey(n,i),t.isLink(n)&&h===`override`)return!1;if(e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(n);return}if(l&&!nc(e)){t.replaceSelection(n);return}}return!1},b=e=>{if(n.getKeyBelow){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyBelow?.(t.focusedKey);if(r==null&&a&&(r=n.getFirstKey?.(t.focusedKey)),r!=null){y(e,r);return}}return!1},x=e=>{if(n.getKeyAbove){let r=t.focusedKey==null?n.getLastKey?.():n.getKeyAbove?.(t.focusedKey);if(r==null&&a&&(r=n.getLastKey?.(t.focusedKey)),r!=null){y(e,r);return}}return!1},S=e=>{if(n.getFirstKey){if(t.focusedKey===null&&e.shiftKey)return!1;let r=n.getFirstKey(t.focusedKey,Et(e));if(t.setFocusedKey(r),r!=null){if(Et(e)&&e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(r);return}if(l){t.replaceSelection(r);return}}}return!1},C=e=>{if(n.getKeyLeftOf){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyLeftOf?.(t.focusedKey);if(r==null&&a&&(r=_===`rtl`?n.getFirstKey?.(t.focusedKey):n.getLastKey?.(t.focusedKey)),r!=null){y(e,r,_===`rtl`?`first`:`last`);return}}return!1},w=e=>{if(n.getKeyRightOf){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyRightOf?.(t.focusedKey);if(r==null&&a&&(r=_===`rtl`?n.getLastKey?.(t.focusedKey):n.getFirstKey?.(t.focusedKey)),r!=null){y(e,r,_===`rtl`?`last`:`first`);return}}return!1},T=e=>{if(n.getLastKey){if(t.focusedKey===null&&e.shiftKey)return!1;let r=n.getLastKey(t.focusedKey,Et(e));if(t.setFocusedKey(r),r!=null){if(Et(e)&&e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(r);return}if(l){t.replaceSelection(r);return}}}return!1},E=e=>{if(n.getKeyPageBelow&&t.focusedKey!=null){let r=n.getKeyPageBelow(t.focusedKey);if(r!=null)return y(e,r)}return!1},D=e=>{if(n.getKeyPageAbove&&t.focusedKey!=null){let r=n.getKeyPageAbove(t.focusedKey);if(r!=null)return y(e,r)}return!1},O=()=>{if(t.selectionMode===`multiple`&&s!==!0){t.selectAll();return}return!1},k=()=>{if(c===`clearSelection`&&!o&&t.selectedKeys.size!==0){t.clearSelection();return}return!1},A=()=>{if(!p&&r.current){let e=$s(r.current,{tabbable:!0}),t,n;do n=e.lastChild(),n&&(t=n);while(n);let i=K();t&&(!pe(t)||i&&!je(i))&&ve(t)}return{shouldContinuePropagation:!0,shouldPreventDefault:!1}},j=()=>(!p&&r.current&&r.current.focus(),{shouldContinuePropagation:!0,shouldPreventDefault:!1}),M=(e,t)=>({[Ve()?e+`+Shift+Alt`:e+`+Shift+Control`]:t,[e+`+Shift`]:t,[Ve()?e+`+Alt`:e+`+Control`]:t,[e]:t}),{keyboardProps:N}=zn({shortcuts:{...M(`ArrowDown`,b),...M(`ArrowUp`,x),...M(`ArrowLeft`,C),...M(`ArrowRight`,w),...M(`PageDown`,E),...M(`PageUp`,D)},allowRepeats:!0}),{keyboardProps:ee}=zn({shortcuts:{...M(`Home`,S),...M(`End`,T),"Mod+A":O,Escape:k,Tab:A,"Tab+Shift":j}}),P=(0,d.useRef)({top:0,left:0});At(m,`scroll`,()=>{P.current={top:m.current?.scrollTop??0,left:m.current?.scrollLeft??0}});let te=e=>{if(t.isFocused){G(e.currentTarget,q(e))||t.setFocused(!1);return}if(!G(e.currentTarget,q(e)))return;let i=xt();t.setFocused(!0);let a=e=>{e!=null&&(t.setFocusedKey(e),l&&!t.isSelected(e)&&t.replaceSelection(e))};if(g&&(i===`keyboard`||i===`virtual`))a(g===`first`?n.getFirstKey?.():n.getLastKey?.());else if(t.focusedKey==null){let r=e.relatedTarget;r&&e.currentTarget.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING?a(t.lastSelectedKey??n.getLastKey?.()):a(t.firstSelectedKey??n.getFirstKey?.())}else m.current&&(m.current.scrollTop=P.current.top,m.current.scrollLeft=P.current.left);if(t.focusedKey!=null&&m.current){let e=rc(r,t.focusedKey);e instanceof HTMLElement&&(!pe(e)&&!f&&ve(e),(i===`keyboard`||g&&i===`virtual`)&&Wi(e,{containingElement:r.current}))}},I=e=>{G(e.currentTarget,e.relatedTarget)||t.setFocused(!1)},L=(0,d.useRef)(!1);At(r,`react-aria-focus`,f?e=>{let{detail:n}=e;e.stopPropagation(),t.setFocused(!0),n?.focusStrategy===`first`&&(L.current=!0)}:void 0);let R=n.getFirstKey?.()??null;uc(()=>{if(L.current){if(R==null){let e=K();me(r.current),ge(e,null),t.collection.size>0&&(L.current=!1)}else t.setFocusedKey(R),L.current=!1}},[R,t.collection.size]),uc(()=>{t.collection.size>0&&(L.current=!1)},[t.focusedKey]),At(r,`react-aria-clear-focus`,f?e=>{e.stopPropagation(),t.setFocused(!1),e.detail?.clearFocusKey&&t.setFocusedKey(null)}:void 0);let z=(0,d.useRef)(i),B=(0,d.useRef)(!1);(0,d.useEffect)(()=>{if(z.current){let e=null;i===`first`&&(e=n.getFirstKey?.()??null),i===`last`&&(e=n.getLastKey?.()??null);let a=t.selectedKeys;if(a.size){for(let n of a)if(t.canSelectItem(n)){e=n;break}}t.setFocused(!0),t.setFocusedKey(e),e!=null&&l&&!a.size&&t.canSelectItem(e)&&t.replaceSelection(e),e==null&&!f&&r.current&&wn(r.current),t.collection.size>0&&(z.current=!1,B.current=!0)}});let V=(0,d.useRef)(t.focusedKey),ne=(0,d.useRef)(null);(0,d.useEffect)(()=>{if(t.isFocused&&t.focusedKey!=null&&(t.focusedKey!==V.current||B.current)&&m.current&&r.current){let e=xt(),n=rc(r,t.focusedKey);if(!(n instanceof HTMLElement))return;(e===`keyboard`||B.current)&&(ne.current&&cancelAnimationFrame(ne.current),ne.current=requestAnimationFrame(()=>{m.current&&(Hi(m.current,n),e!==`virtual`&&Wi(n,{containingElement:r.current}))}))}!f&&t.isFocused&&t.focusedKey==null&&V.current!=null&&r.current&&wn(r.current),V.current=t.focusedKey,B.current=!1}),(0,d.useEffect)(()=>()=>{ne.current&&cancelAnimationFrame(ne.current)},[]),At(r,`react-aria-focus-scope-restore`,e=>{e.preventDefault(),t.setFocused(!0)});let re={...F(ee,N),onFocus:te,onBlur:I,onMouseDown(e){m.current===q(e)&&e.preventDefault()}},{typeSelectProps:ie}=cc({keyboardDelegate:n,selectionManager:t});u||(re=F(ie,re));let ae;f||(ae=t.focusedKey==null?0:-1);let H=ac(t.collection);return{collectionProps:F(re,{tabIndex:ae,"data-collection":H})}}function fc(e){let{isDisabled:t,pointerType:n,onLongPressStart:r,onLongPressEnd:i,onLongPress:a,threshold:o=500,accessibilityDescription:s}=e,c=(0,d.useRef)(void 0),{addGlobalListener:l,removeAllGlobalListeners:u}=Nr(),f=e=>n?e.pointerType===n:e.pointerType===`mouse`||e.pointerType===`touch`,{pressProps:p}=zr({isDisabled:t,onPressStart(e){if(e.continuePropagation(),f(e)){r&&r({...e,type:`longpressstart`}),c.current=setTimeout(()=>{e.target.dispatchEvent(new PointerEvent(`pointercancel`,{bubbles:!0})),l(e.target,`click`,e=>e.preventDefault(),{once:!0}),U(e.target).activeElement!==e.target&&ve(e.target),a&&a({...e,type:`longpress`}),c.current=void 0},o),e.pointerType===`touch`&&l(e.target,`contextmenu`,e=>e.preventDefault(),{once:!0});let t=W(e.target);l(t,`pointerup`,()=>{setTimeout(()=>{u()},100)},{once:!0})}},onPressEnd(e){c.current&&clearTimeout(c.current),i&&f(e)&&i({...e,type:`longpressend`})}});return{longPressProps:F(p,qi(a&&!t?s:void 0))}}function pc(e){let{id:t,selectionManager:n,key:r,ref:i,shouldSelectOnPressUp:a,shouldUseVirtualFocus:o,focus:s,isDisabled:c,onAction:u,allowsDifferentPressOrigin:f,linkBehavior:p=`action`}=e,m=$e();t=A(t);let h=e=>{if(e.pointerType===`keyboard`&&nc(e))n.toggleSelection(r);else{if(n.selectionMode===`none`)return;if(n.isLink(r)){if(p===`selection`&&i.current){let t=n.getItemProps(r);m.open(i.current,e,t.href,t.routerOptions),n.setSelectedKeys(n.selectedKeys);return}if(p===`override`||p===`none`)return}n.selectionMode===`single`?n.isSelected(r)&&!n.disallowEmptySelection?n.toggleSelection(r):n.replaceSelection(r):e&&e.shiftKey?n.extendSelection(r):n.selectionBehavior===`toggle`||e&&(Et(e)||e.pointerType===`touch`||e.pointerType===`virtual`)?n.toggleSelection(r):n.replaceSelection(r)}};(0,d.useEffect)(()=>{r===n.focusedKey&&n.isFocused&&(o?me(i.current):s?s():K()!==i.current&&i.current&&wn(i.current))},[i,r,n.focusedKey,n.childFocusStrategy,n.isFocused,o]),c||=n.isDisabled(r);let g={};!o&&!c?g={tabIndex:r===n.focusedKey?0:-1,onFocus(e){q(e)===i.current&&n.setFocusedKey(r)}}:c&&(g.onMouseDown=e=>{e.preventDefault()}),(0,d.useEffect)(()=>{c&&n.focusedKey===r&&n.setFocusedKey(null)},[n,c,r]);let _=n.isLink(r)&&p===`override`,v=u&&e.UNSTABLE_itemBehavior===`action`,y=n.isLink(r)&&p!==`selection`&&p!==`none`,b=!c&&n.canSelectItem(r)&&!_&&!v,x=(u||y)&&!c,S=x&&(n.selectionBehavior===`replace`?!b:!b||n.isEmpty),C=x&&b&&n.selectionBehavior===`replace`,w=S||C,T=(0,d.useRef)(null),E=w&&b,D=(0,d.useRef)(!1),O=(0,d.useRef)(!1),k=n.getItemProps(r),j=e=>{u&&(u(),i.current?.dispatchEvent(new CustomEvent(`react-aria-item-action`,{bubbles:!0}))),y&&i.current&&m.open(i.current,e,k.href,k.routerOptions)},M={ref:i};a?(M.onPressStart=e=>{T.current=e.pointerType,D.current=E,e.pointerType===`keyboard`&&(!w||hc(e.key))&&h(e)},f?(M.onPressUp=S?void 0:e=>{e.pointerType===`mouse`&&b&&h(e)},M.onPress=S?j:e=>{e.pointerType!==`keyboard`&&e.pointerType!==`mouse`&&b&&h(e)}):M.onPress=e=>{if(S||C&&e.pointerType!==`mouse`){if(e.pointerType===`keyboard`&&!mc(e.key))return;j(e)}else e.pointerType!==`keyboard`&&b&&h(e)}):(M.onPressStart=e=>{T.current=e.pointerType,D.current=E,O.current=S,b&&(e.pointerType===`mouse`&&!S||e.pointerType===`keyboard`&&(!x||hc(e.key)))&&h(e)},M.onPress=e=>{(e.pointerType===`touch`||e.pointerType===`pen`||e.pointerType===`virtual`||e.pointerType===`keyboard`&&w&&mc(e.key)||e.pointerType===`mouse`&&O.current)&&(w?j(e):b&&h(e))});let N=oc(n.collection);if(g[`data-collection`]=N,g[`data-key`]=r,M.preventFocusOnPress=o,o&&(M=F(M,{onPressStart(e){e.pointerType!==`touch`&&(n.setFocused(!0),n.setFocusedKey(r))},onPress(e){e.pointerType===`touch`&&(n.setFocused(!0),n.setFocusedKey(r))}})),k)for(let e of[`onPressStart`,`onPressEnd`,`onPressChange`,`onPress`,`onPressUp`,`onClick`])k[e]&&(M[e]=l(M[e],k[e]));let{pressProps:ee,isPressed:P}=zr(M),te=C?e=>{T.current===`mouse`&&(e.stopPropagation(),e.preventDefault(),j(e))}:void 0,{longPressProps:I}=fc({isDisabled:!E,onLongPress(e){e.pointerType===`touch`&&(h(e),n.setSelectionBehavior(`toggle`))}}),L=e=>{T.current===`touch`&&D.current&&e.preventDefault()},R=p!==`none`&&n.isLink(r)?e=>{et.isOpening||e.preventDefault()}:void 0,z=F(g,b||S||o&&!c?ee:{},E?I:{},{onDoubleClick:te,onDragStartCapture:L,onClick:R,id:t},o?{onMouseDown:e=>e.preventDefault()}:void 0),B=e=>{let t=e;for(;t&&t!==i.current;){let e=t.getAttribute(`data-collection`);if(e!=null)return e!==N;t=t.parentElement}return je(e)},V=z.onPointerDown;z.onPointerDown=e=>{let t=q(e);if(t&&t!==i.current&&B(t)){e.stopPropagation();return}V?.(e)};let ne=z.onMouseDown;return z.onMouseDown=e=>{let t=q(e);if(t&&t!==i.current&&B(t)){e.stopPropagation();return}ne?.(e)},{itemProps:z,isPressed:P,isSelected:n.isSelected(r),isFocused:n.isFocused&&n.focusedKey===r,isDisabled:c,allowsSelection:b,hasAction:w}}function mc(e){return e===`Enter`}function hc(e){return e===` `}function gc(e,t){return typeof t.getChildren==`function`?t.getChildren(e.key):e.childNodes}function _c(e){return vc(e,0)}function vc(e,t){if(t<0)return;let n=0;for(let r of e){if(n===t)return r;n++}}function yc(e,t,n){if(t.parentKey===n.parentKey)return t.index-n.index;let r=[...bc(e,t),t],i=[...bc(e,n),n],a=r.slice(0,i.length).findIndex((e,t)=>e!==i[t]);return a===-1?r.findIndex(e=>e===n)>=0?1:(i.findIndex(e=>e===t),-1):(t=r[a],n=i[a],t.index-n.index)}function bc(e,t){let n=[],r=t;for(;r?.parentKey!=null;)r=e.getItem(r.parentKey),r&&n.unshift(r);return n}function xc(e){let t=d.version.split(`.`);return parseInt(t[0],10)>=19?e:e?`true`:void 0}var Sc=class{constructor(e){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=e;let t=e=>{if(this.keyMap.set(e.key,e),e.childNodes&&e.type===`section`)for(let n of e.childNodes)t(n)};for(let n of e)t(n);let n=null,r=0,i=0;for(let[e,t]of this.keyMap)n?(n.nextKey=e,t.prevKey=n.key):(this.firstKey=e,t.prevKey=void 0),t.type===`item`&&(t.index=r++),(t.type===`section`||t.type===`item`)&&i++,n=t,n.nextKey=void 0;this._size=i,this.lastKey=n?.key??null}*[Symbol.iterator](){yield*this.iterable}get size(){return this._size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey??null:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey??null:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)??null}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){return this.keyMap.get(e)?.childNodes||[]}},Cc=class e extends Set{constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n??t.anchorKey,this.currentKey=r??t.currentKey):(this.anchorKey=n??null,this.currentKey=r??null)}};function wc(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function Tc(e){let{selectionMode:t=`none`,disallowEmptySelection:n=!1,allowDuplicateSelectionEvents:r,selectionBehavior:i=`toggle`,disabledBehavior:a=`all`}=e,o=(0,d.useRef)(!1),[,s]=(0,d.useState)(!1),c=(0,d.useRef)(null),l=(0,d.useRef)(null),[,u]=(0,d.useState)(null),[f,p]=cn((0,d.useMemo)(()=>Ec(e.selectedKeys),[e.selectedKeys]),(0,d.useMemo)(()=>Ec(e.defaultSelectedKeys,new Cc),[e.defaultSelectedKeys]),e.onSelectionChange),m=(0,d.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),[h,g]=(0,d.useState)(i);i===`replace`&&h===`toggle`&&typeof f==`object`&&f.size===0&&g(`replace`);let _=(0,d.useRef)(i);return(0,d.useEffect)(()=>{i!==_.current&&(g(i),_.current=i)},[i]),{selectionMode:t,disallowEmptySelection:n,selectionBehavior:h,setSelectionBehavior:g,get isFocused(){return o.current},setFocused(e){o.current=e,s(e)},get focusedKey(){return c.current},get childFocusStrategy(){return l.current},setFocusedKey(e,t=`first`){c.current=e,l.current=t,u(e)},selectedKeys:f,setSelectedKeys(e){(r||!wc(e,f))&&p(e)},disabledKeys:m,disabledBehavior:a}}function Ec(e,t){return e?e===`all`?`all`:new Cc(e):t}var Dc=class e{constructor(e,t,n){this.collection=e,this.state=t,this.allowsCellSelection=n?.allowsCellSelection??!1,this._isSelectAll=null,this.layoutDelegate=n?.layoutDelegate||null,this.fullCollection=n?.fullCollection||null}get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(e==null||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return this.state.selectedKeys===`all`?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){if(this.state.selectionMode===`none`)return!1;let t=this.getKey(e);return t==null?!1:this.state.selectedKeys===`all`?this.canSelectItem(t):this.state.selectedKeys.has(t)}get isEmpty(){return this.state.selectedKeys!==`all`&&this.state.selectedKeys.size===0}get isSelectAll(){if(this.isEmpty)return!1;if(this.state.selectedKeys===`all`)return!0;if(this._isSelectAll!=null)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(e=>t.has(e)),this._isSelectAll}get firstSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let n=this.collection.getItem(t);(!e||n&&yc(this.collection,n,e)<0)&&(e=n)}return e?.key??null}get lastSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let n=this.collection.getItem(t);(!e||n&&yc(this.collection,n,e)>0)&&(e=n)}return e?.key??null}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){if(this.selectionMode===`none`)return;if(this.selectionMode===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n;if(this.state.selectedKeys===`all`)n=new Cc([t],t,t);else{let e=this.state.selectedKeys,r=e.anchorKey??t;n=new Cc(e,r,t);for(let i of this.getKeyRange(r,e.currentKey??t))n.delete(i);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&n.add(e)}this.state.setSelectedKeys(n)}getKeyRange(e,t){let n=this.collection.getItem(e),r=this.collection.getItem(t);return n&&r?yc(this.collection,n,r)<=0?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){if(this.layoutDelegate?.getKeyRange)return this.layoutDelegate.getKeyRange(e,t);let n=[],r=e;for(;r!=null;){let e=this.collection.getItem(r);if(e&&(e.type===`item`||e.type===`cell`&&this.allowsCellSelection)&&n.push(r),r===t)return n;r=this.collection.getKeyAfter(r)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||t.type===`cell`&&this.allowsCellSelection)return e;for(;t&&t.type!==`item`&&t.parentKey!=null;)t=this.collection.getItem(t.parentKey);return!t||t.type!==`item`?null:t.key}toggleSelection(e){if(this.selectionMode===`none`)return;if(this.selectionMode===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Cc(this.state.selectedKeys===`all`?this.getSelectAllKeys():this.state.selectedKeys);n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Cc([t],t,t):new Cc;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode===`none`)return;let t=new Cc;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode===`single`))break}this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=this.fullCollection??this.collection,t=[],n=r=>{for(;r!=null;){if(this.canSelectItemIn(r,e)){let i=e.getItem(r);i?.type===`item`&&t.push(r),i?.hasChildNodes&&(this.allowsCellSelection||i.type!==`item`)&&n(_c(gc(i,e))?.key??null)}r=e.getKeyAfter(r)}};return n(e.getFirstKey()),t}selectAll(){!this.isSelectAll&&this.selectionMode===`multiple`&&this.state.setSelectedKeys(`all`)}clearSelection(){!this.disallowEmptySelection&&(this.state.selectedKeys===`all`||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new Cc)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode!==`none`&&(this.selectionMode===`single`?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior===`toggle`||t&&(t.pointerType===`touch`||t.pointerType===`virtual`)?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){return this.canSelectItemIn(e,this.collection)}canSelectItemIn(e,t){if(this.state.selectionMode===`none`||this.state.disabledKeys.has(e))return!1;let n=t.getItem(e);return!(!n||n?.props?.isDisabled||n.type===`cell`&&!this.allowsCellSelection)}isDisabled(e){let t=this.collection.getItem(e);return this.state.disabledBehavior===`all`&&(this.state.disabledKeys.has(e)||!!t?.props?.isDisabled)&&t?.props?.disabledBehavior!==`selection`}isLink(e){return!!this.collection.getItem(e)?.props?.href}getItemProps(e){return this.collection.getItem(e)?.props}withCollection(t){return new e(t,this.state,{allowsCellSelection:this.allowsCellSelection,layoutDelegate:this.layoutDelegate||void 0,fullCollection:this.fullCollection??this.collection})}},Oc=class{build(e,t){return this.context=t,kc(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:n}=e;if(d.default.isValidElement(t)&&t.type===d.default.Fragment)yield*this.iterateCollection({children:t.props.children,items:n});else if(typeof t==`function`){if(!n)throw Error(`props.children was a function but props.items is missing`);let e=0;for(let r of n)yield*this.getFullNode({value:r,index:e},{renderer:t}),e++}else{let e=[];d.default.Children.forEach(t,t=>{t&&e.push(t)});let n=0;for(let t of e){let e=this.getFullNode({element:t,index:n},{});for(let t of e)n++,yield t}}}getKey(e,t,n,r){if(e.key!=null)return e.key;if(t.type===`cell`&&t.key!=null)return`${r}${t.key}`;let i=t.value;if(i!=null){let e=i.key??i.id;if(e==null)throw Error(`No key found for item`);return e}return r?`${r}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,n,r){if(d.default.isValidElement(e.element)&&e.element.type===d.default.Fragment){let i=[];d.default.Children.forEach(e.element.props.children,e=>{i.push(e)});let a=e.index??0;for(let e of i)yield*this.getFullNode({element:e,index:a++},t,n,r);return}let i=e.element;if(!i&&e.value&&t&&t.renderer){let n=this.cache.get(e.value);if(n&&(!n.shouldInvalidate||!n.shouldInvalidate(this.context))){n.index=e.index,n.parentKey=r?r.key:null,yield n;return}i=t.renderer(e.value)}if(d.default.isValidElement(i)){let a=i.type;if(typeof a!=`function`&&typeof a.getCollectionNode!=`function`){let e=i.type;throw Error(`Unknown element <${e}> in collection.`)}let o=a.getCollectionNode(i.props,this.context),s=e.index??0,c=o.next();for(;!c.done&&c.value;){let a=c.value;e.index=s;let l=a.key??null;l??=a.element?null:this.getKey(i,e,t,n);let u=[...this.getFullNode({...a,key:l,index:s,wrapper:Ac(e.wrapper,a.wrapper)},this.getChildState(t,a),n?`${n}${i.key}`:i.key,r)];for(let t of u){if(t.value=a.value??e.value??null,t.value&&this.cache.set(t.value,t),e.type&&t.type!==e.type)throw Error(`Unsupported type <${jc(t.type)}> in <${jc(r?.type??`unknown parent type`)}>. Only <${jc(e.type)}> is supported.`);s++,yield t}c=o.next(u)}return}if(e.key==null||e.type==null)return;let a=this,o={type:e.type,props:e.props,key:e.key,parentKey:r?r.key:null,value:e.value??null,level:(r?.level??0)+ +(r?.type===`item`),index:e.index,rendered:e.rendered,textValue:e.textValue??``,"aria-label":e[`aria-label`],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes||!1,childNodes:kc(function*(){if(!e.hasChildNodes||!e.childNodes)return;let n=0;for(let r of e.childNodes()){r.key!=null&&(r.key=`${o.key}${r.key}`);let e=a.getFullNode({...r,index:n},a.getChildState(t,r),o.key,o);for(let t of e)n++,yield t}})};yield o}constructor(){this.cache=new WeakMap}};function kc(e){let t=[],n=null;return{*[Symbol.iterator](){for(let e of t)yield e;n||=e();for(let e of n)t.push(e),yield e}}}function Ac(e,t){if(e&&t)return n=>e(t(n));if(e)return e;if(t)return t}function jc(e){return e[0].toUpperCase()+e.slice(1)}function Mc(e,t,n){let r=(0,d.useMemo)(()=>new Oc,[]),{children:i,items:a,collection:o}=e;return(0,d.useMemo)(()=>o||t(r.build({children:i,items:a},n)),[r,i,a,o,n,t])}function Nc(e){let{filter:t,layoutDelegate:n}=e,r=Tc(e),i=(0,d.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),a=Mc(e,(0,d.useCallback)(e=>t?new Sc(t(e)):new Sc(e),[t]),(0,d.useMemo)(()=>({suppressTextValueWarning:e.suppressTextValueWarning}),[e.suppressTextValueWarning])),o=(0,d.useMemo)(()=>new Dc(a,r,{layoutDelegate:n}),[a,r,n]);return Pc(a,o),{collection:a,disabledKeys:i,selectionManager:o}}function Pc(e,t){let n=(0,d.useRef)(null);(0,d.useEffect)(()=>{if(t.focusedKey!=null&&!e.getItem(t.focusedKey)&&n.current){let r=n.current.getKeyAfter(t.focusedKey),i=null;for(;r!=null;){let a=e.getItem(r);if(a&&a.type===`item`&&!t.isDisabled(r)){i=r;break}r=n.current.getKeyAfter(r)}if(i==null)for(r=n.current.getKeyBefore(t.focusedKey);r!=null;){let a=e.getItem(r);if(a&&a.type===`item`&&!t.isDisabled(r)){i=r;break}r=n.current.getKeyBefore(r)}t.setFocusedKey(i)}n.current=e},[e,t])}let Fc=typeof HTMLElement<`u`&&`inert`in HTMLElement.prototype;function Ic(e){return e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer!==void 0}let Lc=new WeakMap,Rc=[];function zc(e,t){let n=W(e?.[0]),r=t instanceof n.Element?{root:t}:t,i=r?.root??document.body,a=r?.shouldUseInert&&Fc,o=new Set(e),s=new Set,c=e=>a&&e instanceof n.HTMLElement?e.inert:e.getAttribute(`aria-hidden`)===`true`,l=(e,t)=>{a&&e instanceof n.HTMLElement?e.inert=t:t?e.setAttribute(`aria-hidden`,`true`):(e.removeAttribute(`aria-hidden`),e instanceof n.HTMLElement&&(e.inert=!1))},u=new Set;if(fe()){let t=i.getRootNode();for(let n of e){let e=n.getRootNode();for(;le(e)&&e!==t;)u.add(e),e=e.host.getRootNode()}}let d=e=>{for(let t of e.querySelectorAll(`[data-live-announcer], [data-react-aria-top-layer]`))o.add(t);let t=e=>{if(s.has(e)||o.has(e)||e.parentElement&&s.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of o)if(G(e,t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},n=As(U(e),e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),r=t(e);if(r===NodeFilter.FILTER_ACCEPT&&f(e),r!==NodeFilter.FILTER_REJECT){let e=n.nextNode();for(;e!=null;)f(e),e=n.nextNode()}},f=e=>{let t=Lc.get(e)??0;c(e)&&t===0||(t===0&&l(e,!0),s.add(e),Lc.set(e,t+1))};Rc.length&&Rc[Rc.length-1].disconnect(),d(i);let p=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>G(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Ic(e)?o.add(e):e instanceof Element&&d(e);if(fe()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});p.observe(i,{childList:!0,subtree:!0});let m=new Set;if(fe())for(let e of u){let t=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>G(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Ic(e)?o.add(e):e instanceof Element&&d(e);if(fe()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});t.observe(e,{childList:!0,subtree:!0}),m.add(t)}let h={visibleNodes:o,hiddenNodes:s,observe(){p.observe(i,{childList:!0,subtree:!0})},disconnect(){p.disconnect()}};return Rc.push(h),()=>{if(p.disconnect(),fe())for(let e of m)e.disconnect();for(let e of s){let t=Lc.get(e);t!=null&&(t===1?(l(e,!1),Lc.delete(e)):Lc.set(e,t-1))}h===Rc[Rc.length-1]?(Rc.pop(),Rc.length&&Rc[Rc.length-1].observe()):Rc.splice(Rc.indexOf(h),1)}}function Bc(e){let{ref:t,onInteractOutside:n,isDisabled:r,onInteractOutsideStart:i}=e,a=(0,d.useRef)({isPointerDown:!1,ignoreEmulatedMouseEvents:!1}),o=J(e=>{n&&Vc(e,t)&&(i&&i(e),a.current.isPointerDown=!0)}),s=J(e=>{n&&n(e)});(0,d.useEffect)(()=>{let e=a.current;if(r)return;let n=t.current,i=U(n);if(typeof PointerEvent<`u`){let n=n=>{e.isPointerDown&&Vc(n,t)&&s(n),e.isPointerDown=!1};return i.addEventListener(`pointerdown`,o,!0),i.addEventListener(`click`,n,!0),()=>{i.removeEventListener(`pointerdown`,o,!0),i.removeEventListener(`click`,n,!0)}}},[t,r])}function Vc(e,t){if(e.button>0)return!1;let n=q(e);if(n){let e=n.ownerDocument;if(!e||!G(e.documentElement,n)||n.closest(`[data-react-aria-top-layer]`))return!1}return t.current?!e.composedPath().includes(t.current):!1}let Hc=[];function Uc(e,t){let{onClose:n,shouldCloseOnBlur:r,isOpen:i,isDismissable:a=!1,isKeyboardDismissDisabled:o=!1,shouldCloseOnInteractOutside:s}=e,c=(0,d.useRef)(void 0);(0,d.useEffect)(()=>{if(i&&!Hc.includes(t))return Hc.push(t),()=>{let e=Hc.indexOf(t);e>=0&&Hc.splice(e,1)}},[i,t]);let l=()=>{Hc[Hc.length-1]===t&&n&&n()},u=e=>{let n=Hc[Hc.length-1];c.current=n,(!s||s(q(e)))&&n===t&&e.stopPropagation()},f=e=>{(!s||s(q(e)))&&(Hc[Hc.length-1]===t&&e.stopPropagation(),c.current===t&&l()),c.current=void 0},{keyboardProps:p}=zn({shortcuts:{Escape:()=>{if(!o){l();return}return!1}}});Bc({ref:t,onInteractOutside:a&&i?f:void 0,onInteractOutsideStart:u});let{focusWithinProps:m}=qr({isDisabled:!r,onBlurWithin:e=>{e.relatedTarget&&!Us(e.relatedTarget)&&(!s||s(e.relatedTarget))&&n?.()}});return{overlayProps:{...p,...m},underlayProps:{}}}let Wc=typeof document<`u`&&window.visualViewport,Gc=0,Kc;function qc(e={}){let{isDisabled:t}=e;f(()=>{if(!t)return Gc++,Gc===1&&(Kc=We()&&Ke()?Yc():Jc()),()=>{Gc--,Gc===0&&Kc()}},[t])}function Jc(){let e=window.innerWidth-document.documentElement.clientWidth;return l(e>0&&(`scrollbarGutter`in document.documentElement.style?de(document.documentElement,`scrollbar-gutter`,`stable`):de(document.documentElement,`padding-right`,`${e}px`)),de(document.documentElement,`overflow`,`hidden`))}function Yc(){let e=de(document.documentElement,`overflow`,`hidden`),t,n=!1,r=e=>{let r=q(e);t=zi(r)?r:Bi(r,!0),n=!1;let i=r.ownerDocument.defaultView.getSelection();i&&!i.isCollapsed&&i.containsNode(r,!0)&&(n=!0),e.composedPath().some(e=>e instanceof HTMLInputElement&&e.type===`range`)&&(n=!0),`selectionStart`in r&&`selectionEnd`in r&&r.selectionStart<r.selectionEnd&&r.ownerDocument.activeElement===r&&(n=!0)},i=document.createElement(`style`),a=jr();a&&(i.nonce=a),i.textContent=`@layer {
  * {
    overscroll-behavior: contain;
  }
}`,document.head.prepend(i);let o=e=>{if(!(e.touches.length===2||n)){if(!t||t===document.documentElement||t===document.body){e.preventDefault();return}t.scrollHeight===t.clientHeight&&t.scrollWidth===t.clientWidth&&e.preventDefault()}},s=e=>{let t=q(e),n=e.relatedTarget;n&&Ot(n)?(n.focus({preventScroll:!0}),Xc(n,Ot(t))):n||(t.parentElement?.closest(`[tabindex]`))?.focus({preventScroll:!0})},c=HTMLElement.prototype.focus;Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(e){let t=K(),n=t!=null&&Ot(t);c.call(this,{...e,preventScroll:!0}),(!e||!e.preventScroll)&&Xc(this,n)}});let u=l(ue(document,`touchstart`,r,{passive:!1,capture:!0}),ue(document,`touchmove`,o,{passive:!1,capture:!0}),ue(document,`blur`,s,!0));return()=>{e(),u(),i.remove(),Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:c})}}function Xc(e,t){t||!Wc?Zc(e):Wc.addEventListener(`resize`,()=>Zc(e),{once:!0})}function Zc(e){let t=document.scrollingElement||document.documentElement,n=e;for(;n&&n!==t;){let e=Bi(n);if(e!==document.documentElement&&e!==document.body&&e!==n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();if(r.top<t.top||r.bottom>t.top+n.clientHeight){let n=t.bottom;Wc&&(n=Math.min(n,Wc.offsetTop+Wc.height));let i=r.top-t.top-((n-t.top)/2-r.height/2);e.scrollTo({top:Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+i)),behavior:`smooth`})}}n=e.parentElement}}var Qc={};Qc={dismiss:`تجاهل`};var $c={};$c={dismiss:`Отхвърляне`};var el={};el={dismiss:`Odstranit`};var tl={};tl={dismiss:`Luk`};var nl={};nl={dismiss:`Schließen`};var rl={};rl={dismiss:`Απόρριψη`};var il={};il={dismiss:`Dismiss`};var al={};al={dismiss:`Descartar`};var ol={};ol={dismiss:`Lõpeta`};var sl={};sl={dismiss:`Hylkää`};var cl={};cl={dismiss:`Rejeter`};var ll={};ll={dismiss:`התעלם`};var ul={};ul={dismiss:`Odbaci`};var dl={};dl={dismiss:`Elutasítás`};var fl={};fl={dismiss:`Ignora`};var pl={};pl={dismiss:`閉じる`};var ml={};ml={dismiss:`무시`};var hl={};hl={dismiss:`Atmesti`};var gl={};gl={dismiss:`Nerādīt`};var _l={};_l={dismiss:`Lukk`};var vl={};vl={dismiss:`Negeren`};var yl={};yl={dismiss:`Zignoruj`};var bl={};bl={dismiss:`Descartar`};var xl={};xl={dismiss:`Dispensar`};var Sl={};Sl={dismiss:`Revocare`};var Cl={};Cl={dismiss:`Пропустить`};var wl={};wl={dismiss:`Zrušiť`};var Tl={};Tl={dismiss:`Opusti`};var El={};El={dismiss:`Odbaci`};var Dl={};Dl={dismiss:`Avvisa`};var Ol={};Ol={dismiss:`Kapat`};var kl={};kl={dismiss:`Скасувати`};var Al={};Al={dismiss:`取消`};var jl={};jl={dismiss:`關閉`};var Ml={};Ml={"ar-AE":Qc,"bg-BG":$c,"cs-CZ":el,"da-DK":tl,"de-DE":nl,"el-GR":rl,"en-US":il,"es-ES":al,"et-EE":ol,"fi-FI":sl,"fr-FR":cl,"he-IL":ll,"hr-HR":ul,"hu-HU":dl,"it-IT":fl,"ja-JP":pl,"ko-KR":ml,"lt-LT":hl,"lv-LV":gl,"nb-NO":_l,"nl-NL":vl,"pl-PL":yl,"pt-BR":bl,"pt-PT":xl,"ro-RO":Sl,"ru-RU":Cl,"sk-SK":wl,"sl-SI":Tl,"sr-SP":El,"sv-SE":Dl,"tr-TR":Ol,"uk-UA":kl,"zh-CN":Al,"zh-TW":jl};function Nl(e){return e&&e.__esModule?e.default:e}function Pl(e){let{onDismiss:t,...n}=e,r=jt(n,on(Nl(Ml),`@react-aria/overlays`).format(`dismiss`)),i=()=>{t&&t()};return d.default.createElement(Xi,null,d.default.createElement(`button`,{...r,tabIndex:-1,onClick:i,style:{width:1,height:1}}))}function Fl({children:e}){let t=(0,d.useMemo)(()=>({register:()=>{}}),[]);return d.default.createElement(Mr.Provider,{value:t},e)}let Il=(0,d.createContext)({});function Ll(){return(0,d.useContext)(Il)??{}}let Rl=d.default.createContext(null);function zl(e){let t=w(),{portalContainer:n=t?null:document.body,isExiting:r}=e,[i,a]=(0,d.useState)(!1),o=(0,d.useMemo)(()=>({contain:i,setContain:a}),[i,a]),{getContainer:s}=Ll();if(!e.portalContainer&&s&&(n=s()),!n)return null;let c=e.children;return e.disableFocusManagement||(c=d.default.createElement(Ns,{restoreFocus:!0,contain:(e.shouldContainFocus||i)&&!r},c)),c=d.default.createElement(Rl.Provider,{value:o},d.default.createElement(Fl,null,d.default.createElement(Vn.Provider,{value:null},c))),Xn.default.createPortal(c,n)}function Bl(){let e=(0,d.useContext)(Rl)?.setContain;f(()=>{e?.(!0)},[e])}function Vl(e){let[t,n]=cn(e.isOpen,e.defaultOpen||!1,e.onOpenChange),[r,i]=(0,d.useState)(null);return{isOpen:t,setOpen:n,open:(0,d.useCallback)(()=>{n(!0)},[n]),close:(0,d.useCallback)(()=>{n(!1)},[n]),toggle:(0,d.useCallback)(()=>{n(!t)},[n,t]),point:r,setPoint:i}}function Hl(e,t=!0){let[n,r]=(0,d.useState)(!0),i=n&&t;return f(()=>{if(i&&e.current&&`getAnimations`in e.current)for(let t of e.current.getAnimations())t instanceof CSSTransition&&t.cancel()},[e,i]),Wl(e,i,(0,d.useCallback)(()=>r(!1),[])),i}function Ul(e,t){let[n,r]=(0,d.useState)(t?`open`:`closed`);switch(n){case`open`:t||r(`exiting`);break;case`closed`:case`exiting`:t&&r(`open`)}let i=n===`exiting`;return Wl(e,i,(0,d.useCallback)(()=>{r(e=>e===`exiting`?`closed`:e)},[])),i}function Wl(e,t,n){f(()=>{if(t&&e.current){if(!(`getAnimations`in e.current)){n();return}let t=e.current.getAnimations();if(t.length===0){n();return}let r=!1;return Promise.allSettled(t.map(e=>e.finished)).then(()=>{r||(0,Xn.flushSync)(()=>{n()})}),()=>{r=!0}}},[e,t,n])}function Gl(e,t){let{role:n=`dialog`}=e,r=M();r=e[`aria-label`]?void 0:r;let i=M();i=n===`alertdialog`&&!e[`aria-describedby`]?i:void 0;let a=(0,d.useRef)(!1);(0,d.useEffect)(()=>{if(t.current&&!pe(t.current)){wn(t.current);let e=setTimeout(()=>{(K()===t.current||K()===document.body)&&(a.current=!0,t.current&&(t.current.blur(),wn(t.current)),a.current=!1)},500);return()=>{clearTimeout(e)}}},[t]),Bl(),(0,d.useRef)(!1),(0,d.useEffect)(()=>{});let o=e[`aria-describedby`]??i;return{dialogProps:{...Y(e,{labelable:!0}),role:n,tabIndex:-1,"aria-labelledby":e[`aria-labelledby`]??r,"aria-describedby":o,onBlur:e=>{a.current&&e.stopPropagation()}},titleProps:{id:r},contentProps:{id:i}}}let Kl=(0,d.createContext)(null),ql=(0,d.createContext)(null),Jl=(0,d.forwardRef)(function(e,t){let n=e[`aria-labelledby`];[e,t]=V(e,t,Kl);let{dialogProps:r,titleProps:i,contentProps:a}=Gl({...e,"aria-labelledby":n},t),o=(0,d.useContext)(ql);!r[`aria-label`]&&!r[`aria-labelledby`]&&e[`aria-labelledby`]&&(r[`aria-labelledby`]=e[`aria-labelledby`]);let s=z({defaultClassName:`react-aria-Dialog`,className:e.className,style:e.style,children:e.children,values:{close:o?.close||(()=>{})}}),c=Y(e,{global:!0});return d.default.createElement(H.section,{...F(c,s,r),render:e.render,ref:t,slot:e.slot||void 0},d.default.createElement(R,{values:[[Ii,{slots:{[L]:{},title:{...i,level:2}}}],[Ri,{slots:{[L]:{},description:a}}],[Mi,{slots:{[L]:{},close:{onPress:()=>o?.close()}}}]]},s.children))});function Yl(e,t,n){let{isDisabled:r}=e,i=A(),a=A(),o=w(),s=(0,d.useRef)(null);At(n,`beforematch`,(0,d.useCallback)(()=>{s.current=requestAnimationFrame(()=>{n.current&&n.current.setAttribute(`hidden`,`until-found`)}),(0,Xn.flushSync)(()=>{t.toggle()})},[n,t]));let c=(0,d.useRef)(null);return f(()=>{if(s.current&&cancelAnimationFrame(s.current),n.current&&!o){let e=n.current;c.current==null||typeof e.getAnimations!=`function`?t.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)):(e.setAttribute(`hidden`,`until-found`),e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`)):t.isExpanded!==c.current&&(t.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>{e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)}).catch(()=>{})):(e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),window.getComputedStyle(e).height,e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>e.setAttribute(`hidden`,`until-found`)).catch(()=>{}))),c.current=t.isExpanded}},[r,n,t.isExpanded,o]),(0,d.useEffect)(()=>()=>{s.current&&cancelAnimationFrame(s.current)},[]),{buttonProps:{id:i,"aria-expanded":t.isExpanded,"aria-controls":a,onPress:e=>{!r&&e.pointerType!==`keyboard`&&t.toggle()},isDisabled:r,onPressStart(e){e.pointerType===`keyboard`&&!r&&t.toggle()}},panelProps:{id:a,role:`group`,"aria-labelledby":i,"aria-hidden":!t.isExpanded,hidden:o?!t.isExpanded:void 0}}}function Xl(e){let{allowsMultipleExpanded:t=!1,isDisabled:n=!1}=e,[r,i]=cn((0,d.useMemo)(()=>e.expandedKeys?new Set(e.expandedKeys):void 0,[e.expandedKeys]),(0,d.useMemo)(()=>e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,[e.defaultExpandedKeys]),e.onExpandedChange);return(0,d.useEffect)(()=>{if(!t&&r.size>1){let e=r.values().next().value;e!=null&&i(new Set([e]))}}),{allowsMultipleExpanded:t,isDisabled:n,expandedKeys:r,setExpandedKeys:i,toggleKey(e){let n;t?(n=new Set(r),n.has(e)?n.delete(e):n.add(e)):n=new Set(r.has(e)?[]:[e]),i(n)}}}function Zl(e){let[t,n]=cn(e.isExpanded,e.defaultExpanded||!1,e.onExpandedChange);return{isExpanded:t,setExpanded:n,expand:(0,d.useCallback)(()=>{n(!0)},[n]),collapse:(0,d.useCallback)(()=>{n(!1)},[n]),toggle:(0,d.useCallback)(()=>{n(!t)},[n,t])}}let Ql=(0,d.createContext)(null),$l=(0,d.forwardRef)(function(e,t){let n=Xl(e),r=z({...e,defaultClassName:`react-aria-DisclosureGroup`,values:{isDisabled:n.isDisabled,state:n}}),i=Y(e,{global:!0});return d.default.createElement(H.div,{...i,...r,ref:t,"data-disabled":e.isDisabled||void 0},d.default.createElement(Ql.Provider,{value:n},r.children))}),eu=(0,d.createContext)(null),tu=(0,d.createContext)(null),nu=(0,d.createContext)(null),ru=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,eu);let n=(0,d.useContext)(Ql),{id:r,...i}=e,a=A();r||=a;let o=n?n.expandedKeys.has(r):e.isExpanded,s=Zl({...e,isExpanded:o,onExpandedChange(t){n&&n.toggleKey(r),e.onExpandedChange?.(t)}}),c=d.default.useRef(null),l=e.isDisabled||n?.isDisabled||!1,{buttonProps:u,panelProps:f}=Yl({...e,isExpanded:o,isDisabled:l},s,c),{isFocusVisible:p,focusProps:m}=Jr({within:!0}),h=z({...e,id:void 0,defaultClassName:`react-aria-Disclosure`,values:{isExpanded:s.isExpanded,isDisabled:l,isFocusVisibleWithin:p,state:s}}),g=Y(i,{global:!0});return d.default.createElement(R,{values:[[Mi,{slots:{[L]:{},trigger:u}}],[nu,{panelProps:f,panelRef:c}],[tu,s]]},d.default.createElement(H.div,{...F(g,h,m),ref:t,"data-expanded":s.isExpanded||void 0,"data-disabled":l||void 0,"data-focus-visible-within":p||void 0},h.children))}),iu=(0,d.forwardRef)(function(e,t){let{role:n=`group`}=e,{panelProps:r,panelRef:i}=(0,d.useContext)(nu),{isFocusVisible:a,focusProps:o}=Jr({within:!0}),s=z({...e,defaultClassName:`react-aria-DisclosurePanel`,values:{isFocusVisibleWithin:a}}),c=Y(e,{global:!0,labelable:!0});return d.default.createElement(H.div,{...F(c,s,r,o),ref:N(t,i),role:n,"data-focus-visible-within":a||void 0},d.default.createElement(R,{values:[[Mi,null]]},e.children))});function au(e,t){let n=t?.isDisabled,[r,i]=(0,d.useState)(!1);return f(()=>{if(e?.current&&!n){let t=()=>{if(e.current){let t=$s(e.current,{tabbable:!0});i(!!t.nextNode())}};t();let n=new MutationObserver(t);return n.observe(e.current,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`tabIndex`,`disabled`]}),()=>{n.disconnect()}}}),!n&&r}function ou(e,t,n){let{overlayProps:r,underlayProps:i}=Uc({...e,isOpen:t.isOpen,onClose:t.close},n);return qc({isDisabled:!t.isOpen}),Bl(),(0,d.useEffect)(()=>{if(t.isOpen&&n.current)return zc([n.current],{shouldUseInert:!0})},[t.isOpen,n]),{modalProps:F(r),underlayProps:i}}let $=typeof document<`u`&&window.visualViewport;function su(){let e=w(),[t,n]=(0,d.useState)(()=>e?{width:0,height:0}:cu());return(0,d.useEffect)(()=>{let e=e=>{n(t=>e.width===t.width&&e.height===t.height?t:e)},t=()=>{$&&$.scale>1||e(cu())},r,i=t=>{$&&$.scale>1||Ot(q(t))&&(r=requestAnimationFrame(()=>{let t=K();(!t||!Ot(t))&&e({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight})}))};return e(cu()),We()&&Ke()&&window.addEventListener(`blur`,i,!0),$?$.addEventListener(`resize`,t):window.addEventListener(`resize`,t),()=>{cancelAnimationFrame(r),We()&&Ke()&&window.removeEventListener(`blur`,i,!0),$?$.removeEventListener(`resize`,t):window.removeEventListener(`resize`,t)}},[]),t}function cu(){return{width:$?Math.min($.width*$.scale,document.documentElement.clientWidth):document.documentElement.clientWidth,height:$?$.height*$.scale:document.documentElement.clientHeight}}let lu=(0,d.createContext)(null),uu=(0,d.createContext)(null),du=(0,d.forwardRef)(function(e,t){if((0,d.useContext)(uu))return d.default.createElement(hu,{...e,modalRef:t},e.children);let{isDismissable:n,isKeyboardDismissDisabled:r,isOpen:i,defaultOpen:a,onOpenChange:o,children:s,isEntering:c,isExiting:l,UNSTABLE_portalContainer:u,shouldCloseOnInteractOutside:f,...p}=e;return d.default.createElement(pu,{isDismissable:n,isKeyboardDismissDisabled:r,isOpen:i,defaultOpen:a,onOpenChange:o,isEntering:c,isExiting:l,UNSTABLE_portalContainer:u,shouldCloseOnInteractOutside:f},d.default.createElement(hu,{...p,modalRef:t},s))});function fu(e,t){[e,t]=V(e,t,lu);let n=(0,d.useContext)(ql),r=Vl(e),i=e.isOpen!=null||e.defaultOpen!=null||!n?r:n,a=I(t),o=(0,d.useRef)(null),s=Ul(a,i.isOpen),c=Ul(o,i.isOpen),l=s||c||e.isExiting||!1,u=w();return!i.isOpen&&!l||u?null:d.default.createElement(mu,{...e,state:i,isExiting:l,overlayRef:a,modalRef:o})}let pu=(0,d.forwardRef)(fu);function mu({UNSTABLE_portalContainer:e,...t}){let n=t.modalRef,{state:r}=t,{modalProps:i,underlayProps:a}=ou(t,r,n),o=Hl(t.overlayRef)||t.isEntering||!1,s=z({...t,defaultClassName:`react-aria-ModalOverlay`,values:{isEntering:o,isExiting:t.isExiting,state:r}}),c=su(),l,u;if(typeof document<`u`){let e=zi(document.body)?document.body:document.scrollingElement||document.documentElement,t=e.getBoundingClientRect().width%1,n=e.getBoundingClientRect().height%1;l=e.scrollWidth-t,u=e.scrollHeight-n}let f={...s.style,"--visual-viewport-width":c.width+`px`,"--visual-viewport-height":c.height+`px`,"--page-width":l===void 0?void 0:l+`px`,"--page-height":u===void 0?void 0:u+`px`};return d.default.createElement(zl,{isExiting:t.isExiting,portalContainer:e},d.default.createElement(H.div,{...F(Y(t,{global:!0}),a),...s,style:f,ref:t.overlayRef,"data-entering":o||void 0,"data-exiting":t.isExiting||void 0},d.default.createElement(R,{values:[[uu,{modalProps:i,modalRef:n,isExiting:t.isExiting,isDismissable:t.isDismissable}],[ql,r]]},s.children)))}function hu(e){let{modalProps:t,modalRef:n,isExiting:r,isDismissable:i}=(0,d.useContext)(uu),a=(0,d.useContext)(ql),o=I((0,d.useMemo)(()=>N(e.modalRef,n),[e.modalRef,n])),s=Hl(o),c=z({...e,defaultClassName:`react-aria-Modal`,values:{isEntering:s,isExiting:r,state:a}});return d.default.createElement(H.div,{...F(Y(e,{global:!0}),t),...c,ref:o,"data-entering":s||void 0,"data-exiting":r||void 0},i&&d.default.createElement(Pl,{onDismiss:a.close}),c.children)}let gu=(0,d.createContext)(null),_u=(0,d.createContext)(null),vu=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,gu);let{validationBehavior:n}=B(la)||{},r=e.validationBehavior??n??`native`,{locale:i}=Gt(),a=cs({...e,locale:i,validationBehavior:r}),o=(0,d.useRef)(null),[s,c]=ne(!e[`aria-label`]&&!e[`aria-labelledby`]),{labelProps:l,groupProps:u,inputProps:f,incrementButtonProps:p,decrementButtonProps:m,descriptionProps:h,errorMessageProps:g,..._}=os({...re(e),label:c,validationBehavior:r},a,o),v=z({...e,values:{state:a,isDisabled:e.isDisabled||!1,isInvalid:_.isInvalid||!1,isRequired:e.isRequired||!1,isReadOnly:e.isReadOnly||!1},defaultClassName:`react-aria-NumberField`}),y=Y(e,{global:!0});return delete y.id,d.default.createElement(R,{values:[[_u,a],[Aa,u],[Ma,{...f,ref:o}],[ti,{...l,ref:s}],[Mi,{slots:{increment:p,decrement:m}}],[Ri,{slots:{description:h,errorMessage:g}}],[Zi,_]]},d.default.createElement(H.div,{...y,...v,ref:t,slot:e.slot||void 0,"data-disabled":e.isDisabled||void 0,"data-readonly":e.isReadOnly||void 0,"data-required":e.isRequired||void 0,"data-invalid":_.isInvalid||void 0}),e.name&&d.default.createElement(`input`,{type:`hidden`,name:e.name,form:e.form,value:isNaN(a.numberValue)?``:a.numberValue,disabled:e.isDisabled||void 0}))}),yu=new WeakMap;function bu(e,t,n){let{value:r,children:i,"aria-label":a,"aria-labelledby":o,onPressStart:s,onPressEnd:c,onPressChange:l,onPress:u,onPressUp:f,onClick:p}=e,m=e.isDisabled||t.isDisabled,h=t.selectedValue===r,g=e=>{e.stopPropagation(),t.setSelectedValue(r)},{pressProps:_,isPressed:v}=zr({onPressStart:s,onPressEnd:c,onPressChange:l,onPress:u,onPressUp:f,onClick:p,isDisabled:m}),{pressProps:y,isPressed:b}=zr({onPressStart:s,onPressEnd:c,onPressChange:l,onPressUp:f,onClick:p,isDisabled:m,onPress(e){u?.(e),t.setSelectedValue(r),n.current?.focus()}}),{focusableProps:x}=Un(F(e,{onFocus:()=>t.setLastFocusedValue(r)}),n),S=F(_,x),C=Y(e,{labelable:!0}),w=-1;t.selectedValue==null?(t.lastFocusedValue===r||t.lastFocusedValue==null)&&(w=0):t.selectedValue===r&&(w=0),m&&(w=void 0);let{name:T,form:E,descriptionId:D,errorMessageId:O,validationBehavior:k}=yu.get(t);fa(n,t.defaultSelectedValue,t.setSelectedValue),pa({validationBehavior:k},t,n);let A=va();return{labelProps:F(y,(0,d.useMemo)(()=>({onClick:e=>e.preventDefault(),onMouseDown:e=>e.preventDefault()}),[])),inputProps:F(C,{...S,type:`radio`,name:T,form:E,tabIndex:w,disabled:m,required:t.isRequired&&k===`native`,checked:h,value:r,onChange:g,"aria-describedby":[e[`aria-describedby`],A.id,t.isInvalid?O:null,D].filter(Boolean).join(` `)||void 0}),descriptionProps:A,isDisabled:m,isSelected:h,isPressed:v||b}}function xu(e,t){let{name:n,form:r,isReadOnly:i,isRequired:a,isDisabled:o,orientation:s=`vertical`,validationBehavior:c=`aria`}=e,{direction:l}=Gt(),{isInvalid:u,validationErrors:d,validationDetails:f}=t.displayValidation,{labelProps:p,fieldProps:m,descriptionProps:h,errorMessageProps:g}=da({...e,labelElementType:`span`,isInvalid:t.isInvalid,errorMessage:e.errorMessage||d}),_=Y(e,{labelable:!0}),{focusWithinProps:v}=qr({onBlurWithin(n){e.onBlur?.(n),t.selectedValue||t.setLastFocusedValue(null)},onFocusWithin:e.onFocus,onFocusWithinChange:e.onFocusChange});function y(e,n){let r=$s(n.currentTarget,{from:q(n),accept:e=>e instanceof W(e).HTMLInputElement&&e.type===`radio`}),i;return e===`next`?(i=r.nextNode(),i||=(r.currentNode=n.currentTarget,r.firstChild())):(i=r.previousNode(),i||=(r.currentNode=n.currentTarget,r.lastChild())),i?(i.focus(),t.setSelectedValue(i.value),!0):!1}let{keyboardProps:b}=zn({shortcuts:{ArrowRight:e=>y(l===`rtl`&&s!==`vertical`?`prev`:`next`,e),ArrowLeft:e=>y(l===`rtl`&&s!==`vertical`?`next`:`prev`,e),ArrowDown:e=>y(`next`,e),ArrowUp:e=>y(`prev`,e)},allowRepeats:!0}),x=A(n);return yu.set(t,{name:x,form:r,descriptionId:h.id,errorMessageId:g.id,validationBehavior:c}),{radioGroupProps:F(_,{role:`radiogroup`,...b,"aria-invalid":t.isInvalid||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-readonly":i||void 0,"aria-required":a||void 0,"aria-disabled":o||void 0,"aria-orientation":s,...m,...v}),labelProps:p,descriptionProps:h,errorMessageProps:g,isInvalid:u,validationErrors:d,validationDetails:f}}let Su=Math.round(Math.random()*1e10),Cu=0;function wu(e){let t=(0,d.useMemo)(()=>e.name||`radio-group-${Su}-${++Cu}`,[e.name]),[n,r]=cn(e.value,e.defaultValue??null,e.onChange),[i]=(0,d.useState)(n),[a,o]=(0,d.useState)(null),s=ra({...e,value:n}),c=t=>{!e.isReadOnly&&!e.isDisabled&&(r(t),s.commitValidation())},l=s.displayValidation.isInvalid;return{...s,name:t,selectedValue:n,defaultSelectedValue:e.value===void 0?e.defaultValue??null:i,setSelectedValue:c,lastFocusedValue:a,setLastFocusedValue:o,isDisabled:e.isDisabled||!1,isReadOnly:e.isReadOnly||!1,isRequired:e.isRequired||!1,validationState:e.validationState||(l?`invalid`:null),isInvalid:l}}let Tu=(0,d.createContext)(null),Eu=(0,d.createContext)(null),Du=(0,d.createContext)(null),Ou=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,Tu);let{validationBehavior:n}=B(la)||{},r=e.validationBehavior??n??`native`,i=wu({...e,validationBehavior:r}),[a,o]=ne(!e[`aria-label`]&&!e[`aria-labelledby`]),{radioGroupProps:s,labelProps:c,descriptionProps:l,errorMessageProps:u,...f}=xu({...e,label:o,validationBehavior:r},i),p=z({...e,values:{orientation:e.orientation||`vertical`,isDisabled:i.isDisabled,isReadOnly:i.isReadOnly,isRequired:i.isRequired,isInvalid:i.isInvalid,state:i},defaultClassName:`react-aria-RadioGroup`}),m=Y(e,{global:!0});return d.default.createElement(H.div,{...F(m,p,s),ref:t,slot:e.slot||void 0,"data-orientation":e.orientation||`vertical`,"data-invalid":i.isInvalid||void 0,"data-disabled":i.isDisabled||void 0,"data-readonly":i.isReadOnly||void 0,"data-required":i.isRequired||void 0},d.default.createElement(R,{values:[[Du,i],[ti,{...c,ref:a,elementType:`span`}],[Ri,{slots:{description:l,errorMessage:u}}],[Zi,f]]},d.default.createElement(Ds,null,p.children)))}),ku=(0,d.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=V(r,t,Eu);let i=d.default.useContext(Du),a=I((0,d.useMemo)(()=>N(n,e.inputRef===void 0?null:e.inputRef),[n,e.inputRef])),o=bu({...re(e),children:typeof e.children==`function`||e.children},i,a);return d.default.createElement(Au.Provider,{value:{...o,inputRef:a,defaultClassName:`react-aria-Radio`}},d.default.createElement(ju,{...e,ref:t}))}),Au=(0,d.createContext)(null),ju=(0,d.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isPressed:o,defaultClassName:s,inputRef:c}=(0,d.useContext)(Au),l=d.default.useContext(Du),{isFocused:u,isFocusVisible:f,focusProps:p}=Jr(),m=a||l.isReadOnly,{hoverProps:h,isHovered:g}=ei({...e,isDisabled:m}),_=z({...e,defaultClassName:s,values:{isSelected:i,isPressed:o,isHovered:g,isFocused:u,isFocusVisible:f,isDisabled:a,isReadOnly:l.isReadOnly,isInvalid:l.isInvalid,isRequired:l.isRequired}}),v=Y(e,{global:!0});return delete v.id,delete v.onClick,d.default.createElement(H.label,{...F(v,n,h,_),ref:t,"data-selected":i||void 0,"data-pressed":o||void 0,"data-hovered":g||void 0,"data-focused":u||void 0,"data-focus-visible":f||void 0,"data-disabled":a||void 0,"data-readonly":l.isReadOnly||void 0,"data-invalid":l.isInvalid||void 0,"data-required":l.isRequired||void 0},d.default.createElement(Xi,{elementType:`span`},d.default.createElement(`input`,{...F(r,p),ref:c})),_.children)});function Mu(e,t,n){let{labelProps:r,inputProps:i,isSelected:a,...o}=ya(e,t,n);return{labelProps:r,inputProps:{...i,role:`switch`,checked:a},isSelected:a,...o}}let Nu=(0,d.createContext)(null),Pu=(0,d.createContext)(null),Fu=(0,d.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=V(r,t,Nu);let i=I((0,d.useMemo)(()=>N(n,e.inputRef===void 0?null:e.inputRef),[n,e.inputRef])),a=xa(e),o=Mu({...re(e),children:typeof e.children==`function`||e.children},a,i);return d.default.createElement(R,{values:[[Pu,a],[Iu,{...o,inputRef:i,defaultClassName:`react-aria-Switch`}]]},d.default.createElement(Lu,{...e,ref:t}))}),Iu=(0,d.createContext)(null),Lu=(0,d.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isReadOnly:o,isPressed:s,isInvalid:c,inputRef:l,defaultClassName:u,isRequired:f}=(0,d.useContext)(Iu),{isFocused:p,isFocusVisible:m,focusProps:h}=Jr(),g=a||o,_=(0,d.useContext)(Pu),{hoverProps:v,isHovered:y}=ei({...e,isDisabled:g}),b=z({...e,defaultClassName:u,values:{isSelected:i,isPressed:s,isHovered:y,isFocused:p,isFocusVisible:m,isDisabled:a,isReadOnly:o,isInvalid:c,isRequired:f||!1,state:_}}),x=Y(e,{global:!0});return delete x.id,delete x.onClick,d.default.createElement(H.label,{...F(x,n,v,b),ref:t,slot:e.slot||void 0,"data-selected":i||void 0,"data-pressed":s||void 0,"data-hovered":y||void 0,"data-focused":p||void 0,"data-focus-visible":m||void 0,"data-disabled":a||void 0,"data-readonly":o||void 0,"data-invalid":c||void 0,"data-required":f||void 0},d.default.createElement(Xi,{elementType:`span`},d.default.createElement(`input`,{...F(r,h),ref:l})),b.children)}),Ru=new WeakMap;function zu(e,t,n){return e?(typeof t==`string`&&(t=t.replace(/\s+/g,``)),`${Ru.get(e)}-${n}-${t}`):``}function Bu(e,t,n){let{key:r,isDisabled:i,shouldSelectOnPressUp:a}=e,{selectionManager:o,selectedKey:s}=t,c=r===s,l=i||t.isDisabled||t.selectionManager.isDisabled(r),u=t.collection.getItem(r),{itemProps:d,isPressed:f}=pc({selectionManager:o,key:r,ref:n,isDisabled:l,shouldSelectOnPressUp:a??u?.props.href!=null,linkBehavior:`selection`}),p=zu(t,r,`tab`),m=zu(t,r,`tabpanel`),{tabIndex:h}=d,g=Y(u?.props,{labelable:!0});delete g.id;let _=rt(u?.props),{focusableProps:v}=Un({...u?.props,isDisabled:l},n);return{tabProps:F(g,v,_,d,{id:p,"aria-selected":c,"aria-disabled":l||void 0,"aria-controls":c?m:void 0,tabIndex:l?void 0:h,role:`tab`}),isSelected:c,isDisabled:l,isPressed:f}}function Vu(e,t,n){let r=au(n)?void 0:0,i=zu(t,e.id??t?.selectedKey,`tabpanel`);return{tabPanelProps:F(jt({...e,id:i,"aria-labelledby":zu(t,t?.selectedKey,`tab`)}),{tabIndex:r,role:`tabpanel`,"aria-describedby":e[`aria-describedby`],"aria-details":e[`aria-details`]})}}var Hu=class{constructor(e,t,n,r=new Set){this.collection=e,this.flipDirection=t===`rtl`,this.disabledKeys=r,this.tabDirection=n===`horizontal`}getKeyLeftOf(e){return this.flipDirection?this.getNextKey(e):this.getPreviousKey(e)}getKeyRightOf(e){return this.flipDirection?this.getPreviousKey(e):this.getNextKey(e)}isDisabled(e){return this.disabledKeys.has(e)||!!this.collection.getItem(e)?.props?.isDisabled}getFirstKey(){let e=this.collection.getFirstKey();return e!=null&&this.isDisabled(e)&&(e=this.getNextKey(e)),e}getLastKey(){let e=this.collection.getLastKey();return e!=null&&this.isDisabled(e)&&(e=this.getPreviousKey(e)),e}getKeyAbove(e){return this.tabDirection?null:this.getPreviousKey(e)}getKeyBelow(e){return this.tabDirection?null:this.getNextKey(e)}getNextKey(e){let t=e;do t=this.collection.getKeyAfter(t),t??=this.collection.getFirstKey();while(t!=null&&this.isDisabled(t)&&t!==e);return t}getPreviousKey(e){let t=e;do t=this.collection.getKeyBefore(t),t??=this.collection.getLastKey();while(t!=null&&this.isDisabled(t)&&t!==e);return t}};function Uu(e,t,n){let{orientation:r=`horizontal`,keyboardActivation:i=`automatic`}=e,{collection:a,selectionManager:o,disabledKeys:s}=t,{direction:c}=Gt(),{collectionProps:l}=dc({ref:n,selectionManager:o,keyboardDelegate:(0,d.useMemo)(()=>new Hu(a,c,r,s),[a,s,r,c]),selectOnFocus:i===`automatic`,disallowEmptySelection:!0,scrollRef:n,linkBehavior:`selection`}),u=A();return Ru.set(t,u),{tabListProps:{...F(l,jt({...e,id:u})),role:`tablist`,"aria-orientation":r,tabIndex:void 0}}}function Wu(e){let[t,n]=cn(e.selectedKey,e.defaultSelectedKey??null,e.onSelectionChange),r=(0,d.useMemo)(()=>t==null?[]:[t],[t]),{collection:i,disabledKeys:a,selectionManager:o}=Nc({...e,selectionMode:`single`,disallowEmptySelection:!0,allowDuplicateSelectionEvents:!0,selectedKeys:r,onSelectionChange:r=>{if(r===`all`)return;let i=r.values().next().value??null;i===t&&e.onSelectionChange&&e.onSelectionChange(i),n(i)}});return{collection:i,disabledKeys:a,selectionManager:o,selectedKey:t,setSelectedKey:n,selectedItem:t==null?null:i.getItem(t)}}function Gu(e){let t=Wu({...e,onSelectionChange:e.onSelectionChange?t=>{t!=null&&e.onSelectionChange?.(t)}:void 0,suppressTextValueWarning:!0,defaultSelectedKey:e.defaultSelectedKey??Ku(e.collection,e.disabledKeys?new Set(e.disabledKeys):new Set)??void 0}),{selectionManager:n,collection:r,selectedKey:i}=t,a=(0,d.useRef)(i);return(0,d.useEffect)(()=>{let o=i;e.selectedKey==null&&(n.isEmpty||o==null||!r.getItem(o))&&(o=Ku(r,t.disabledKeys),o!=null&&n.setSelectedKeys([o])),(o!=null&&n.focusedKey==null||!n.isFocused&&o!==a.current)&&n.setFocusedKey(o),a.current=o}),{...t,isDisabled:e.isDisabled||!1}}function Ku(e,t){let n=null;if(e){for(n=e.getFirstKey();n!=null&&(t.has(n)||e.getItem(n)?.props?.isDisabled)&&n!==e.getLastKey();)n=e.getKeyAfter(n);n!=null&&(t.has(n)||e.getItem(n)?.props?.isDisabled)&&n===e.getLastKey()&&(n=e.getFirstKey())}return n}let qu=(0,d.createContext)(null),Ju=(0,d.createContext)(null),Yu=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,qu);let{children:n,orientation:r=`horizontal`}=e;return n=(0,d.useMemo)(()=>typeof n==`function`?n({orientation:r,defaultChildren:null}):n,[n,r]),d.default.createElement(er,{content:n},n=>d.default.createElement(Xu,{props:e,collection:n,tabsRef:t}))});function Xu({props:e,tabsRef:t,collection:n}){let{orientation:r=`horizontal`}=e,i=Gu({...e,collection:n,children:void 0}),{focusProps:a,isFocused:o,isFocusVisible:s}=Jr({within:!0}),c=(0,d.useMemo)(()=>({orientation:r,isFocusWithin:o,isFocusVisible:s}),[r,o,s]),l=z({...e,defaultClassName:`react-aria-Tabs`,values:c}),u=Y(e,{global:!0});return d.default.createElement(H.div,{...F(u,l,a),ref:t,slot:e.slot||void 0,"data-focused":o||void 0,"data-orientation":r,"data-focus-visible":s||void 0,"data-disabled":i.isDisabled||void 0},d.default.createElement(R,{values:[[qu,e],[Ju,i]]},l.children))}let Zu=(0,d.forwardRef)(function(e,t){return(0,d.useContext)(Ju)?d.default.createElement(Qu,{props:e,forwardedRef:t}):d.default.createElement(dr,e)});function Qu({props:e,forwardedRef:t}){let n=(0,d.useContext)(Ju),{CollectionRoot:r}=(0,d.useContext)(gr),{orientation:i=`horizontal`,keyboardActivation:a=`automatic`}=B(qu),o=I(t),{tabListProps:s}=Uu({...e,orientation:i,keyboardActivation:a},n,o),c=z({...e,children:null,defaultClassName:`react-aria-TabList`,values:{orientation:i,state:n}}),l=Y(e,{global:!0});return delete l.id,d.default.createElement(H.div,{...F(l,c,s),ref:o,"data-orientation":i||void 0},d.default.createElement(Ds,null,d.default.createElement(r,{collection:n.collection,persistedKeys:_r(n.selectionManager.focusedKey)})))}let $u=cr(class extends un{static{this.type=`item`}},(e,t,n)=>{let r=(0,d.useContext)(Ju),i=I(t),{tabProps:a,isSelected:o,isDisabled:s,isPressed:c}=Bu({key:n.key,...e},r,i),{focusProps:l,isFocused:u,isFocusVisible:f}=Jr(),{hoverProps:p,isHovered:m}=ei({isDisabled:s,onHoverStart:e.onHoverStart,onHoverEnd:e.onHoverEnd,onHoverChange:e.onHoverChange}),h=z({...e,id:void 0,children:n.rendered,defaultClassName:`react-aria-Tab`,values:{isSelected:o,isDisabled:s,isFocused:u,isFocusVisible:f,isPressed:c,isHovered:m}}),g=n.props.href?H.a:H.div,_=Y(e,{global:!0});return delete _.id,delete _.onClick,d.default.createElement(g,{...F(_,h,a,l,p),ref:i,"data-selected":o||void 0,"data-disabled":s||void 0,"data-focused":u||void 0,"data-focus-visible":f||void 0,"data-pressed":c||void 0,"data-hovered":m||void 0},d.default.createElement(Os.Provider,{value:{isSelected:o}},h.children))}),ed=Kn(function(e,t){let n=(0,d.useContext)(Ju),r=I(t),i=n.selectedKey===e.id,[a,o]=(0,d.useState)(n.selectedKey==null?null:i);a==null&&n.selectedKey!=null?o(i):!i&&a&&o(!1);let s=Ul(r,i);return!i&&!e.shouldForceMount&&!s?null:d.default.createElement(td,{...e,tabPanelRef:r,isInitiallySelected:a||!1,isExiting:s})});function td(e){let t=(0,d.useContext)(Ju),{id:n,tabPanelRef:r,isInitiallySelected:i,isExiting:a,...o}=e,{tabPanelProps:s}=Vu(e,t,r),{focusProps:c,isFocused:l,isFocusVisible:u}=Jr(),f=t.selectedKey===e.id,p=Hl(r)&&!i,m=z({...e,defaultClassName:`react-aria-TabPanel`,values:{isFocused:l,isFocusVisible:u,isInert:xc(!f),isEntering:p,isExiting:a,state:t}}),h=Y(o,{global:!0});delete h.id;let g=f?F(h,s,c,m):F(h,m);return d.default.createElement(H.div,{...g,ref:r,"data-focused":l||void 0,"data-focus-visible":u||void 0,inert:xc(!f||e.inert),"data-inert":f?void 0:`true`,"data-entering":p||void 0,"data-exiting":a||void 0},d.default.createElement(R,{values:[[qu,null],[Ju,null]]},d.default.createElement(gr.Provider,{value:pr},m.children)))}let nd=(0,d.createContext)({}),rd=e=>{let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,...i}=e;return i},id=(0,d.forwardRef)(function(e,t){[e,t]=V(e,t,nd);let{hoverProps:n,isHovered:r}=ei(e),{isFocused:i,isFocusVisible:a,focusProps:o}=Jr({isTextInput:!0,autoFocus:e.autoFocus}),s=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`,c=z({...e,values:{isHovered:r,isFocused:i,isFocusVisible:a,isDisabled:e.disabled||!1,isInvalid:s},defaultClassName:`react-aria-TextArea`});return d.default.createElement(H.textarea,{...F(rd(e),o,n),...c,ref:t,"data-focused":i||void 0,"data-disabled":e.disabled||void 0,"data-hovered":r||void 0,"data-focus-visible":a||void 0,"data-invalid":s||void 0})}),ad=(0,d.createContext)(null),od=Kn(function(e,t){[e,t]=V(e,t,ad);let{validationBehavior:n}=B(la)||{},r=e.validationBehavior??n??`native`,i=(0,d.useRef)(null);[e,i]=V(e,i,ln);let[a,o]=ne(!e[`aria-label`]&&!e[`aria-labelledby`]),[s,c]=(0,d.useState)(`input`),{labelProps:l,inputProps:u,descriptionProps:f,errorMessageProps:p,...m}=Fa({...re(e),inputElementType:s,label:o,validationBehavior:r},i),h=(0,d.useCallback)(e=>{i.current=e,e&&c(e instanceof HTMLTextAreaElement?`textarea`:`input`)},[i]),g=z({...e,values:{isDisabled:e.isDisabled||!1,isInvalid:m.isInvalid,isReadOnly:e.isReadOnly||!1,isRequired:e.isRequired||!1},defaultClassName:`react-aria-TextField`}),_=Y(e,{global:!0});return delete _.id,d.default.createElement(H.div,{..._,...g,ref:t,slot:e.slot||void 0,"data-disabled":e.isDisabled||void 0,"data-invalid":m.isInvalid||void 0,"data-readonly":e.isReadOnly||void 0,"data-required":e.isRequired||void 0},d.default.createElement(R,{values:[[ti,{...l,ref:a}],[Ma,{...u,ref:h}],[nd,{...u,ref:h}],[Aa,{role:`presentation`,isInvalid:m.isInvalid,isDisabled:e.isDisabled||!1}],[Ri,{slots:{description:f,errorMessage:p}}],[Zi,m]]},g.children))}),sd=window.VendraDesignSystem=window.VendraDesignSystem||{};sd.__vendor={"react-aria-components":{Button:Ni,Checkbox:Da,Dialog:Jl,Disclosure:ru,DisclosureGroup:$l,DisclosurePanel:iu,Group:ja,Heading:Li,I18nProvider:Wt,Input:Pa,Label:ni,Modal:du,ModalOverlay:pu,NumberField:vu,Radio:ku,RadioGroup:Ou,Slider:Cs,SliderThumb:Ts,SliderTrack:ws,Switch:Fu,Tab:$u,TabList:Zu,TabPanel:ed,Tabs:Yu,TextArea:id,TextField:od,useLocale:Gt}}})();} catch (e) { (window.VendraDesignSystem = window.VendraDesignSystem || {}).__vendorError = String((e && e.message) || e); }
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
		"aria-errormessage": controlProps["aria-errormessage"],
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

// components/utils/effects.js
try { (() => {
// useLayoutEffect in the browser and useEffect on the server, where layout effects never run and
// React warns about them. Use it for work that must land before the first paint.
const useClientLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
Object.assign(__ds_scope, { useClientLayoutEffect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/effects.js", error: String((e && e.message) || e) }); }

// components/utils/locale.js
try { (() => {
const { useLocale } = __ds_ns.__vendor["react-aria-components"];
const { useClientLayoutEffect } = __ds_scope;
// React Aria takes keyboard direction, number formatting and calendars from its locale, not from
// the page's dir. usePageLocale follows the page instead: attach `ref` to the component's outer
// element and wrap its React Aria parts in <I18nProvider locale={locale}>. The locale is the nearest
// `lang` (cards show English and Persian side by side), read before the first paint once the
// element is in the page; until then (and on the server, so hydration matches), and without any
// `lang`, it is the app's own React Aria locale (an I18nProvider higher up, or the browser's).
function usePageLocale() {
	const inherited = useLocale().locale;
	const [lang, setLang] = React.useState("");
	const ref = React.useRef(null);
	useClientLayoutEffect(() => {
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
// the page's language), with one Tab stop. `name` is the form field the selected tile's value posts
// under. `legend` renders <fieldset><legend>; the hint or error
// sits under the tiles (see Field).
function ChoiceGroup({ label, labelledBy, legend, hint, error, id, name, columns, minTileWidth = 140, children, className, style }) {
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
		name,
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
const { useClientLayoutEffect } = __ds_scope;
// One selectable tile (a React Aria radio) inside a ChoiceGroup. The label alone names the tile; the
// description is read after it, so it never becomes part of the name. `value` is what a form posts
// under the group's `name`; without it the tile has a generated one.
function ChoiceTile({ label, description, selected, disabled, onSelect, value: formValue, size = "md", className = "", ...rest }) {
	const tileId = React.useId();
	const value = formValue != null ? String(formValue) : tileId;
	const labelId = tileId + "-label";
	const descriptionId = tileId + "-desc";
	const group = React.useContext(choiceGroupContext);
	// Tell the group whether this tile is the selected one and what selecting it does.
	const latest = React.useRef(onSelect);
	latest.current = onSelect;
	useClientLayoutEffect(() => {
		if (!group) return;
		group.report(value, {
			selected: !!selected,
			onSelect: () => latest.current && latest.current()
		});
		return () => group.report(value, null);
	}, [
		group,
		value,
		selected
	]);
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
const { Input: AriaInput, Label, TextArea, TextField } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
// A labelled text field (or textarea with `multiline`) on React Aria's TextField. The label text
// stays inside <label>; the hint or error sits under the control and is linked to it (see Field).
// It takes the usual input props: value or defaultValue, onChange(event) and the native attributes
// (type, required, autoComplete, dir…) go to the real input.
function Input({ label, hint, error, iconStart, multiline, disabled, id, value, defaultValue, className, style, "aria-label": ariaLabel, "aria-labelledby": labelledBy, "aria-describedby": describedBy, ...rest }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error,
		describedBy
	});
	const Control = multiline ? TextArea : AriaInput;
	// Clicking the padding around the control (or its icon) focuses the control.
	const focusControl = (event) => {
		if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
	};
	return /* @__PURE__ */ React.createElement(TextField, {
		id: fieldId,
		value,
		defaultValue,
		isDisabled: disabled,
		isInvalid: !!error,
		validationBehavior: "aria",
		"aria-label": ariaLabel,
		"aria-labelledby": labelledBy,
		"aria-describedby": controlProps["aria-describedby"],
		"aria-errormessage": controlProps["aria-errormessage"],
		className: cx("ag-field", className),
		style
	}, label && /* @__PURE__ */ React.createElement(Label, { className: "ag-field__label" }, label), /* @__PURE__ */ React.createElement("span", {
		className: cx("ag-input", error && "ag-input--error", disabled && "ag-input--disabled"),
		onClick: focusControl
	}, iconStart && /* @__PURE__ */ React.createElement(Icon, {
		name: iconStart,
		size: 18
	}), /* @__PURE__ */ React.createElement(Control, rest)), /* @__PURE__ */ React.createElement(FieldMessage, {
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
const { I18nProvider, Tab, TabList, TabPanel, Tabs: AriaTabs } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
const { usePageLocale } = __ds_scope;
// Tabs on React Aria: one Tab stop on the selected tab; arrow keys (mirrored in RTL, following the
// page's language), Home and End move and select. `children` is the selected tab's content: it
// renders in a tabpanel linked to its tab. Without children the component is just the tab list.
function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", label, className = "", listClassName, panelClassName, children }) {
	const { locale, ref } = usePageLocale();
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? items[0]?.id);
	const selected = value ?? uncontrolledValue;
	// A value that matches no tab selects the first, so there is always one Tab stop.
	const selectedKey = items.some((item) => item.id === selected) ? selected : items[0]?.id;
	const list = /* @__PURE__ */ React.createElement(TabList, {
		"aria-label": label,
		className: cx("ag-tabs", variant === "pill" && "ag-tabs--pill", className)
	}, items.map((item) => /* @__PURE__ */ React.createElement(Tab, {
		key: item.id,
		id: item.id,
		className: ({ isSelected }) => cx("ag-tab", isSelected && "ag-tab--active")
	}, item.label)));
	return /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(AriaTabs, {
		ref,
		selectedKey: selectedKey ?? null,
		onSelectionChange: (key) => {
			const id = String(key);
			if (value === undefined) setUncontrolledValue(id);
			onChange && onChange(id);
		},
		className: "ag-tabs-root"
	}, listClassName ? /* @__PURE__ */ React.createElement("div", { className: listClassName }, list) : list, selectedKey != null && /* @__PURE__ */ React.createElement(TabPanel, {
		key: selectedKey,
		id: selectedKey,
		className: panelClassName,
		style: children == null ? { display: "none" } : undefined
	}, children)));
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
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "ag-dialog__head" }, heading || (title ? /* @__PURE__ */ React.createElement("h2", {
		id: titleId,
		className: "ag-dialog__title"
	}, title) : /* @__PURE__ */ React.createElement("span", null)), onClose && /* @__PURE__ */ React.createElement(IconButton, {
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
		}, title) : null
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
const { Button, Group, I18nProvider, Input, NumberField } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
const { usePageLocale } = __ds_scope;
// A −/+ quantity control on React Aria's NumberField, controlled (`value`) or not (`defaultValue`),
// clamped to min..max. The count is a text field (React Aria drops the spinbutton role, which
// VoiceOver can't focus): type a number, or use ↑/↓, Home/End or the buttons (which, as in React Aria, are left out of the Tab order). Digits follow the page's
// language; `format` is kept for older callers and no longer used.
function QuantityInput({ value, defaultValue = 1, min = 1, max = 99, onChange, disabled, size = "md", labels = {} }) {
	const { locale, ref } = usePageLocale();
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
	const quantity = value ?? uncontrolledValue;
	return /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(NumberField, {
		key: locale,
		ref,
		value: quantity,
		minValue: min,
		maxValue: max,
		step: 1,
		isDisabled: disabled,
		"aria-label": labels.value || "Quantity",
		onChange: (next) => {
			if (Number.isNaN(next)) return;
			if (value === undefined) setUncontrolledValue(next);
			onChange && onChange(next);
		},
		className: "ag-qty-root"
	}, /* @__PURE__ */ React.createElement(Group, { className: cx("ag-qty", size === "sm" && "ag-qty--sm", disabled && "ag-qty--disabled") }, /* @__PURE__ */ React.createElement(Button, {
		slot: "decrement",
		"aria-label": labels.dec || "Decrease"
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "minus",
		size: 16
	})), /* @__PURE__ */ React.createElement(Input, { className: "ag-qty__val" }), /* @__PURE__ */ React.createElement(Button, {
		slot: "increment",
		"aria-label": labels.inc || "Increase"
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "plus",
		size: 16
	})))));
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
const { I18nProvider, Slider, SliderThumb, SliderTrack } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
const { useClientLayoutEffect } = __ds_scope;
const { usePageLocale } = __ds_scope;
// A slider on React Aria: two handles over one track (or one with `range={false}`). Each handle is
// a real range input for keyboards and screen readers (read as formatValue); dragging a handle or
// pressing the track moves the nearest one. The handles stay a step apart; RTL mirrors it, following
// the page's language.
function RangeSlider({ range = true, min = 0, max = 100, step = 1, value, defaultValue, onChange, formatValue = (number) => String(number), label = "Value", labelledBy, labels = {
	min: "Minimum",
	max: "Maximum"
}, showValues = true, className = "" }) {
	const { locale, ref } = usePageLocale();
	const initial = defaultValue ?? (range ? [min, max] : min);
	const [uncontrolledValue, setUncontrolledValue] = React.useState(initial);
	const current = value ?? uncontrolledValue;
	const values = range ? current : [Number(current)];
	const commit = (next) => {
		if (value === undefined) setUncontrolledValue(next);
		onChange && onChange(next);
	};
	// React Aria reads values with its number formatter; screen readers get formatValue instead.
	const inputs = [React.useRef(null), React.useRef(null)];
	useClientLayoutEffect(() => {
		values.forEach((number, index) => {
			const input = inputs[index].current;
			if (input) input.setAttribute("aria-valuetext", formatValue(number));
		});
	});
	const change = (next) => {
		if (!range) return commit(next);
		const [low, high] = values;
		// Only one handle moves at a time; keep it at least one step from the other.
		const moved = next[0] !== low ? [Math.max(min, Math.min(next[0], high - step)), high] : [low, Math.min(max, Math.max(next[1], low + step))];
		if (moved[0] !== low || moved[1] !== high) commit(moved);
	};
	const percent = (number) => (number - min) / (max - min || 1) * 100;
	const fill = range ? {
		insetInlineStart: percent(values[0]) + "%",
		width: percent(values[1]) - percent(values[0]) + "%"
	} : {
		insetInlineStart: 0,
		width: percent(values[0]) + "%"
	};
	// React Aria names each handle by its own label followed by the slider's (label or labelledBy).
	const thumbLabels = range ? [labels.min, labels.max] : [undefined];
	return /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(Slider, {
		ref,
		value: range ? values : values[0],
		minValue: min,
		maxValue: max,
		step,
		onChange: change,
		"aria-label": labelledBy ? undefined : label,
		"aria-labelledby": labelledBy,
		className: cx("ag-range", !range && "ag-range--single", className)
	}, /* @__PURE__ */ React.createElement("div", { className: "ag-range__track" }, /* @__PURE__ */ React.createElement("span", {
		className: "ag-range__fill",
		style: fill
	}), /* @__PURE__ */ React.createElement(SliderTrack, { className: "ag-range__rail" }, values.map((number, index) => /* @__PURE__ */ React.createElement(SliderThumb, {
		key: index,
		index,
		inputRef: inputs[index],
		"aria-label": thumbLabels[index],
		className: "ag-range__thumb"
	})))), showValues && /* @__PURE__ */ React.createElement("div", { className: "ag-range__vals" }, /* @__PURE__ */ React.createElement("span", null, formatValue(range ? values[0] : min)), /* @__PURE__ */ React.createElement("span", null, formatValue(range ? values[1] : max)))));
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
__ds_ns.useClientLayoutEffect = __ds_scope.useClientLayoutEffect;
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
