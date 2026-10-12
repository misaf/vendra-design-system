// GENERATED from components/**/*.{js,jsx} by npm --prefix templates run build. Edit the sources, not this file.
// Bundled from @internationalized/date, react-aria-components (MIT): only the names components import.
try {
(function(){var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));function l(e,t){return e-t*Math.floor(e/t)}function u(e,t,n,r){t=f(e,t);let i=t-1,a=-2;return n<=2?a=0:d(t)&&(a=-1),1721425+365*i+Math.floor(i/4)-Math.floor(i/100)+Math.floor(i/400)+Math.floor((367*n-362)/12+a+r)}function d(e){return e%4==0&&(e%100!=0||e%400==0)}function f(e,t){return e===`BC`?1-t:t}function p(e){let t=`AD`;return e<=0&&(t=`BC`,e=1-e),[t,e]}let m={standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]};var h=class{fromJulianDay(e){let t=e,n=t-1721426,r=Math.floor(n/146097),i=l(n,146097),a=Math.floor(i/36524),o=l(i,36524),s=Math.floor(o/1461),c=l(o,1461),f=Math.floor(c/365),[m,h]=p(r*400+a*100+s*4+f+ +(a!==4&&f!==4)),g=t-u(m,h,1,1),_=2;t<u(m,h,3,1)?_=0:d(h)&&(_=1);let v=Math.floor(((g+_)*12+373)/367);return new ot(m,h,v,t-u(m,h,v,1)+1)}toJulianDay(e){return u(e.era,e.year,e.month,e.day)}getDaysInMonth(e){return m[d(e.year)?`leapyear`:`standard`][e.month-1]}getMonthsInYear(e){return 12}getDaysInYear(e){return d(e.year)?366:365}getMaximumMonthsInYear(){return 12}getMaximumDaysInMonth(){return 31}getYearsInEra(e){return 9999}getEras(){return[`BC`,`AD`]}isInverseEra(e){return e.era===`BC`}balanceDate(e){e.year<=0&&(e.era=e.era===`BC`?`AD`:`BC`,e.year=1-e.year)}constructor(){this.identifier=`gregory`}};let g={"001":1,AD:1,AE:6,AF:6,AI:1,AL:1,AM:1,AN:1,AR:1,AT:1,AU:1,AX:1,AZ:1,BA:1,BE:1,BG:1,BH:6,BM:1,BN:1,BY:1,CH:1,CL:1,CM:1,CN:1,CR:1,CY:1,CZ:1,DE:1,DJ:6,DK:1,DZ:6,EC:1,EE:1,EG:6,ES:1,FI:1,FJ:1,FO:1,FR:1,GB:1,GE:1,GF:1,GP:1,GR:1,HR:1,HU:1,IE:1,IQ:6,IR:6,IS:1,IT:1,JO:6,KG:1,KW:6,KZ:1,LB:1,LI:1,LK:1,LT:1,LU:1,LV:1,LY:6,MC:1,MD:1,ME:1,MK:1,MN:1,MQ:1,MV:5,MY:1,NL:1,NO:1,NZ:1,OM:6,PL:1,QA:6,RE:1,RO:1,RS:1,RU:1,SD:6,SE:1,SI:1,SK:1,SM:1,SY:6,TJ:1,TM:1,TR:1,UA:1,UY:1,UZ:1,VA:1,VN:1,XK:1};function _(e,t){return t=L(t,e.calendar),e.era===t.era&&e.year===t.year&&e.month===t.month&&e.day===t.day}function v(e,t){return t=L(t,e.calendar),e=M(e),t=M(t),e.era===t.era&&e.year===t.year&&e.month===t.month}function y(e,t){return b(e.calendar,t.calendar)&&_(e,t)}function b(e,t){return e.isEqual?.(t)??t.isEqual?.(e)??e.identifier===t.identifier}function x(e,t){return _(e,T(t))}let S={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};function C(e,t,n){let r=e.calendar.toJulianDay(e),i=n?S[n]:I(t),a=Math.ceil(r+1-i)%7;return a<0&&(a+=7),a}function w(e){return _e(Date.now(),e)}function T(e){return ve(w(e))}function E(e,t){return e.calendar.toJulianDay(e)-t.calendar.toJulianDay(t)}function D(e,t){return O(e)-O(t)}function O(e){return e.hour*36e5+e.minute*6e4+e.second*1e3+e.millisecond}let k=null;function A(){return k??=new Intl.DateTimeFormat().resolvedOptions().timeZone,k}function j(){return!1}function M(e){return e.subtract({days:e.day-1})}function ee(e){return e.add({days:e.calendar.getDaysInMonth(e)-e.day})}function N(e){return M(e.subtract({months:e.month-1}))}function te(e,t,n){let r=C(e,t,n);return e.subtract({days:r})}function ne(e,t,n){return te(e,t,n).add({days:6})}let P=new Map,F=new Map;function re(e){if(Intl.Locale){let t=P.get(e);return t||(t=new Intl.Locale(e).maximize().region,t&&P.set(e,t)),t}let t=e.split(`-`)[1];return t===`u`?void 0:t}function I(e){let t=F.get(e);if(!t){if(Intl.Locale){let n=new Intl.Locale(e);if(`getWeekInfo`in n&&(t=n.getWeekInfo(),t))return F.set(e,t),t.firstDay}let n=re(e);if(e.includes(`-fw-`)){let n=e.split(`-fw-`)[1].split(`-`)[0];t=n===`mon`?{firstDay:1}:n===`tue`?{firstDay:2}:n===`wed`?{firstDay:3}:n===`thu`?{firstDay:4}:n===`fri`?{firstDay:5}:n===`sat`?{firstDay:6}:{firstDay:0}}else t=e.includes(`-ca-iso8601`)?{firstDay:1}:{firstDay:n&&g[n]||0};F.set(e,t)}return t.firstDay}function ie(e,t,n){let r=e.calendar.getDaysInMonth(e);return Math.ceil((C(M(e),t,n)+r)/7)}function ae(e,t){return e&&t?e.compare(t)<=0?e:t:e||t}function oe(e,t){return e&&t?e.compare(t)>=0?e:t:e||t}function se(e){return e=L(e,new h),ce(f(e.era,e.year),e.month,e.day,e.hour,e.minute,e.second,e.millisecond)}function ce(e,t,n,r,i,a,o){let s=new Date;return s.setUTCHours(r,i,a,o),s.setUTCFullYear(e,t-1,n),s.getTime()}function le(e,t){if(t===`UTC`)return 0;if(e>0&&t===A()&&!j())return new Date(e).getTimezoneOffset()*-6e4;let{year:n,month:r,day:i,hour:a,minute:o,second:s}=de(e,t);return ce(n,r,i,a,o,s,0)-Math.floor(e/1e3)*1e3}let ue=new Map;function de(e,t){let n=ue.get(t);n||(n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,hour12:!1,era:`short`,year:`numeric`,month:`numeric`,day:`numeric`,hour:`numeric`,minute:`numeric`,second:`numeric`}),ue.set(t,n));let r=n.formatToParts(new Date(e)),i={};for(let e of r)e.type!==`literal`&&(i[e.type]=e.value);return{year:i.era===`BC`||i.era===`B`?-i.year+1:+i.year,month:+i.month,day:+i.day,hour:i.hour===`24`?0:+i.hour,minute:+i.minute,second:+i.second}}let fe=864e5;function pe(e,t,n,r){return(n===r?[n]:[n,r]).filter(n=>me(e,t,n))}function me(e,t,n){let r=de(n,t);return e.year===r.year&&e.month===r.month&&e.day===r.day&&e.hour===r.hour&&e.minute===r.minute&&e.second===r.second}function he(e,t,n=`compatible`){let r=ye(e);if(t===`UTC`)return se(r);if(t===A()&&n===`compatible`&&!j()){r=L(r,new h);let e=new Date,t=f(r.era,r.year);return e.setFullYear(t,r.month-1,r.day),e.setHours(r.hour,r.minute,r.second,r.millisecond),e.getTime()}let i=se(r),a=le(i-fe,t),o=le(i+fe,t),s=pe(r,t,i-a,i-o);if(s.length===1)return s[0];if(s.length>1)switch(n){case`compatible`:case`earlier`:return s[0];case`later`:return s[s.length-1];case`reject`:throw RangeError(`Multiple possible absolute times found`)}switch(n){case`earlier`:return Math.min(i-a,i-o);case`compatible`:case`later`:return Math.max(i-a,i-o);case`reject`:throw RangeError(`No such absolute time found`)}}function ge(e,t,n=`compatible`){return new Date(he(e,t,n))}function _e(e,t){let n=le(e,t),r=new Date(e+n),i=r.getUTCFullYear(),a=r.getUTCMonth()+1,o=r.getUTCDate(),s=r.getUTCHours(),c=r.getUTCMinutes(),l=r.getUTCSeconds(),u=r.getUTCMilliseconds();return new lt(i<1?`BC`:`AD`,i<1?-i+1:i,a,o,t,n,s,c,l,u)}function ve(e){return new ot(e.calendar,e.era,e.year,e.month,e.day)}function ye(e,t){let n=0,r=0,i=0,a=0;if(`timeZone`in e)({hour:n,minute:r,second:i,millisecond:a}=e);else if(`hour`in e&&!t)return e;return t&&({hour:n,minute:r,second:i,millisecond:a}=t),new ct(e.calendar,e.era,e.year,e.month,e.day,n,r,i,a)}function L(e,t){if(b(e.calendar,t))return e;let n=t.fromJulianDay(e.calendar.toJulianDay(e)),r=e.copy();return r.calendar=t,r.era=n.era,r.year=n.year,r.month=n.month,r.day=n.day,Ae(r),r}function be(e,t,n){return e instanceof lt?e.timeZone===t?e:Se(e,t):_e(he(e,t,n),t)}function xe(e){let t=se(e)-e.offset;return new Date(t)}function Se(e,t){return L(_e(se(e)-e.offset,t),e.calendar)}function Ce(e){return Se(e,A())}let we=36e5;function Te(e,t){let n=e.copy(),r=`hour`in n?Re(n,t):0;Ee(n,t.years||0),n.calendar.balanceYearMonth&&n.calendar.balanceYearMonth(n,e),n.month+=t.months||0,De(n),ke(n),n.day+=(t.weeks||0)*7,n.day+=t.days||0,n.day+=r,Oe(n),n.calendar.balanceDate&&n.calendar.balanceDate(n),n.year<1&&(n.year=1,n.month=1,n.day=1);let i=n.calendar.getYearsInEra(n);if(n.year>i){let e=n.calendar.isInverseEra?.(n);n.year=i,n.month=e?1:n.calendar.getMonthsInYear(n),n.day=e?1:n.calendar.getDaysInMonth(n)}n.month<1&&(n.month=1,n.day=1);let a=n.calendar.getMonthsInYear(n);return n.month>a&&(n.month=a,n.day=n.calendar.getDaysInMonth(n)),n.day=Math.max(1,Math.min(n.calendar.getDaysInMonth(n),n.day)),n}function Ee(e,t){e.calendar.isInverseEra?.(e)&&(t=-t),e.year+=t}function De(e){for(;e.month<1;)Ee(e,-1),e.month+=e.calendar.getMonthsInYear(e);let t=0;for(;e.month>(t=e.calendar.getMonthsInYear(e));)e.month-=t,Ee(e,1)}function Oe(e){for(;e.day<1;)e.month--,De(e),e.day+=e.calendar.getDaysInMonth(e);for(;e.day>e.calendar.getDaysInMonth(e);)e.day-=e.calendar.getDaysInMonth(e),e.month++,De(e)}function ke(e){e.month=Math.max(1,Math.min(e.calendar.getMonthsInYear(e),e.month)),e.day=Math.max(1,Math.min(e.calendar.getDaysInMonth(e),e.day))}function Ae(e){e.calendar.constrainDate&&e.calendar.constrainDate(e),e.year=Math.max(1,Math.min(e.calendar.getYearsInEra(e),e.year)),ke(e)}function je(e){let t={};for(let n in e)typeof e[n]==`number`&&(t[n]=-e[n]);return t}function Me(e,t){return Te(e,je(t))}function Ne(e,t){let n=e.copy();return t.era!=null&&(n.era=t.era),t.year!=null&&(n.year=t.year),t.month!=null&&(n.month=t.month),t.day!=null&&(n.day=t.day),Ae(n),n}function Pe(e,t){let n=e.copy();return t.hour!=null&&(n.hour=t.hour),t.minute!=null&&(n.minute=t.minute),t.second!=null&&(n.second=t.second),t.millisecond!=null&&(n.millisecond=t.millisecond),Ie(n),n}function Fe(e){e.second+=Math.floor(e.millisecond/1e3),e.millisecond=Le(e.millisecond,1e3),e.minute+=Math.floor(e.second/60),e.second=Le(e.second,60),e.hour+=Math.floor(e.minute/60),e.minute=Le(e.minute,60);let t=Math.floor(e.hour/24);return e.hour=Le(e.hour,24),t}function Ie(e){e.millisecond=Math.max(0,Math.min(e.millisecond,999)),e.second=Math.max(0,Math.min(e.second,59)),e.minute=Math.max(0,Math.min(e.minute,59)),e.hour=Math.max(0,Math.min(e.hour,23))}function Le(e,t){let n=e%t;return n<0&&(n+=t),n}function Re(e,t){return e.hour+=t.hours||0,e.minute+=t.minutes||0,e.second+=t.seconds||0,e.millisecond+=t.milliseconds||0,Fe(e)}function ze(e,t){let n=e.copy();return Re(n,t),n}function Be(e,t){return ze(e,je(t))}function Ve(e,t,n,r){let i=e.copy();switch(t){case`era`:{let t=e.calendar.getEras(),a=t.indexOf(e.era);if(a<0)throw Error(`Invalid era: `+e.era);a=Ue(a,n,0,t.length-1,r?.round),i.era=t[a],Ae(i);break}case`year`:i.calendar.isInverseEra?.(i)&&(n=-n),i.year=Ue(e.year,n,-1/0,9999,r?.round),i.year===-1/0&&(i.year=1),i.calendar.balanceYearMonth&&i.calendar.balanceYearMonth(i,e);break;case`month`:i.month=Ue(e.month,n,1,e.calendar.getMonthsInYear(e),r?.round);break;case`day`:i.day=Ue(e.day,n,1,e.calendar.getDaysInMonth(e),r?.round);break;default:throw Error(`Unsupported field `+t)}return e.calendar.balanceDate&&e.calendar.balanceDate(i),Ae(i),i}function He(e,t,n,r){let i=e.copy();switch(t){case`hour`:{let t=e.hour,a=0,o=23;if(r?.hourCycle===12){let e=t>=12;a=e?12:0,o=e?23:11}i.hour=Ue(t,n,a,o,r?.round);break}case`minute`:i.minute=Ue(e.minute,n,0,59,r?.round);break;case`second`:i.second=Ue(e.second,n,0,59,r?.round);break;case`millisecond`:i.millisecond=Ue(e.millisecond,n,0,999,r?.round);break;default:throw Error(`Unsupported field `+t)}return i}function Ue(e,t,n,r,i=!1){if(i){e+=Math.sign(t),e<n&&(e=r);let i=Math.abs(t);e=t>0?Math.ceil(e/i)*i:Math.floor(e/i)*i,e>r&&(e=n)}else e+=t,e<n?e=r-(n-e-1):e>r&&(e=n+(e-r-1));return e}function We(e,t){let n;return n=t.years!=null&&t.years!==0||t.months!=null&&t.months!==0||t.weeks!=null&&t.weeks!==0||t.days!=null&&t.days!==0?he(Te(ye(e),{years:t.years,months:t.months,weeks:t.weeks,days:t.days}),e.timeZone):se(e)-e.offset,n+=t.milliseconds||0,n+=(t.seconds||0)*1e3,n+=(t.minutes||0)*6e4,n+=(t.hours||0)*36e5,L(_e(n,e.timeZone),e.calendar)}function Ge(e,t){return We(e,je(t))}function Ke(e,t,n,r){switch(t){case`hour`:{let t=0,i=23;if(r?.hourCycle===12){let n=e.hour>=12;t=n?12:0,i=n?23:11}let a=ye(e),o=L(Pe(a,{hour:t}),new h),s=[he(o,e.timeZone,`earlier`),he(o,e.timeZone,`later`)].filter(t=>_e(t,e.timeZone).day===o.day)[0],c=L(Pe(a,{hour:i}),new h),l=[he(c,e.timeZone,`earlier`),he(c,e.timeZone,`later`)].filter(t=>_e(t,e.timeZone).day===c.day).pop(),u=se(e)-e.offset,d=Math.floor(u/we),f=u%we;return u=Ue(d,n,Math.floor(s/we),Math.floor(l/we),r?.round)*we+f,L(_e(u,e.timeZone),e.calendar)}case`minute`:case`second`:case`millisecond`:return He(e,t,n,r);case`era`:case`year`:case`month`:case`day`:return L(_e(he(Ve(ye(e),t,n,r),e.timeZone),e.timeZone),e.calendar);default:throw Error(`Unsupported field `+t)}}function qe(e,t,n){let r=ye(e),i=Pe(Ne(r,t),t);return i.compare(r)===0?e:L(_e(he(i,e.timeZone,n),e.timeZone),e.calendar)}let Je=/^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})$/,Ye=/^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?$/,Xe=/^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;function Ze(e){let t=e.match(Je);if(!t)throw Xe.test(e)?Error(`Invalid ISO 8601 date string: ${e}. Use parseAbsolute() instead.`):Error(`Invalid ISO 8601 date string: `+e);let n=new ot($e(t[1],0,9999),$e(t[2],1,12),1);return n.day=$e(t[3],1,n.calendar.getDaysInMonth(n)),n}function Qe(e){let t=e.match(Ye);if(!t)throw Xe.test(e)?Error(`Invalid ISO 8601 date time string: ${e}. Use parseAbsolute() instead.`):Error(`Invalid ISO 8601 date time string: `+e);let n=$e(t[1],-9999,9999),r=new ct(n<1?`BC`:`AD`,n<1?-n+1:n,$e(t[2],1,12),1,t[4]?$e(t[4],0,23):0,t[5]?$e(t[5],0,59):0,t[6]?$e(t[6],0,59):0,t[7]?$e(t[7],0,1/0)*1e3:0);return r.day=$e(t[3],0,r.calendar.getDaysInMonth(r)),r}function $e(e,t,n){let r=Number(e);if(r<t||r>n)throw RangeError(`Value out of range: ${t} <= ${r} <= ${n}`);return r}function et(e){return`${String(e.hour).padStart(2,`0`)}:${String(e.minute).padStart(2,`0`)}:${String(e.second).padStart(2,`0`)}${e.millisecond?String(e.millisecond/1e3).slice(1):``}`}function tt(e){let t=L(e,new h),n;return n=t.era===`BC`?t.year===1?`0000`:`-`+String(Math.abs(1-t.year)).padStart(6,`00`):String(t.year).padStart(4,`0`),`${n}-${String(t.month).padStart(2,`0`)}-${String(t.day).padStart(2,`0`)}`}function nt(e){return`${tt(e)}T${et(e)}`}function rt(e){let t=Math.sign(e)<0?`-`:`+`;e=Math.abs(e);let n=Math.floor(e/36e5),r=Math.floor(e%36e5/6e4),i=Math.floor(e%36e5%6e4/1e3),a=`${t}${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`;return i!==0&&(a+=`:${String(i).padStart(2,`0`)}`),a}function it(e){return`${nt(e)}${rt(e.offset)}[${e.timeZone}]`}function at(e){let t=typeof e[0]==`object`?e.shift():new h,n;if(typeof e[0]==`string`)n=e.shift();else{let e=t.getEras();n=e[e.length-1]}let r=e.shift(),i=e.shift(),a=e.shift();return[t,n,r,i,a]}var ot=class e{constructor(...e){let[t,n,r,i,a]=at(e);this.calendar=t,this.era=n,this.year=r,this.month=i,this.day=a,Ae(this)}copy(){return this.era?new e(this.calendar,this.era,this.year,this.month,this.day):new e(this.calendar,this.year,this.month,this.day)}add(e){return Te(this,e)}subtract(e){return Me(this,e)}set(e){return Ne(this,e)}cycle(e,t,n){return Ve(this,e,t,n)}toDate(e){return ge(this,e)}toString(){return tt(this)}compare(e){return E(this,e)}},st=class e{constructor(e=0,t=0,n=0,r=0){this.hour=e,this.minute=t,this.second=n,this.millisecond=r,Ie(this)}copy(){return new e(this.hour,this.minute,this.second,this.millisecond)}add(e){return ze(this,e)}subtract(e){return Be(this,e)}set(e){return Pe(this,e)}cycle(e,t,n){return He(this,e,t,n)}toString(){return et(this)}compare(e){return D(this,e)}},ct=class e{constructor(...e){let[t,n,r,i,a]=at(e);this.calendar=t,this.era=n,this.year=r,this.month=i,this.day=a,this.hour=e.shift()||0,this.minute=e.shift()||0,this.second=e.shift()||0,this.millisecond=e.shift()||0,Ae(this)}copy(){return this.era?new e(this.calendar,this.era,this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond):new e(this.calendar,this.year,this.month,this.day,this.hour,this.minute,this.second,this.millisecond)}add(e){return Te(this,e)}subtract(e){return Me(this,e)}set(e){return Ne(Pe(this,e),e)}cycle(e,t,n){switch(e){case`era`:case`year`:case`month`:case`day`:return Ve(this,e,t,n);default:return He(this,e,t,n)}}toDate(e,t){return ge(this,e,t)}toString(){return nt(this)}compare(e){let t=E(this,e);return t===0?D(this,ye(e)):t}},lt=class e{constructor(...e){let[t,n,r,i,a]=at(e),o=e.shift(),s=e.shift();this.calendar=t,this.era=n,this.year=r,this.month=i,this.day=a,this.timeZone=o,this.offset=s,this.hour=e.shift()||0,this.minute=e.shift()||0,this.second=e.shift()||0,this.millisecond=e.shift()||0,Ae(this)}copy(){return this.era?new e(this.calendar,this.era,this.year,this.month,this.day,this.timeZone,this.offset,this.hour,this.minute,this.second,this.millisecond):new e(this.calendar,this.year,this.month,this.day,this.timeZone,this.offset,this.hour,this.minute,this.second,this.millisecond)}add(e){return We(this,e)}subtract(e){return Ge(this,e)}set(e,t){return qe(this,e,t)}cycle(e,t,n){return Ke(this,e,t,n)}toDate(){return xe(this)}toString(){return it(this)}toAbsoluteString(){return this.toDate().toISOString()}compare(e){return this.toDate().getTime()-be(e,this.timeZone).toDate().getTime()}};let ut=[[1868,9,8],[1912,7,30],[1926,12,25],[1989,1,8],[2019,5,1]],dt=[[1912,7,29],[1926,12,24],[1989,1,7],[2019,4,30]],ft=[1867,1911,1925,1988,2018],pt=[`meiji`,`taisho`,`showa`,`heisei`,`reiwa`];function mt(e){let t=ut.findIndex(([t,n,r])=>e.year<t||e.year===t&&e.month<n||e.year===t&&e.month===n&&e.day<r);return t===-1?ut.length-1:t===0?0:t-1}function ht(e){let t=ft[pt.indexOf(e.era)];if(!t)throw Error(`Unknown era: `+e.era);return new ot(e.year+t,e.month,e.day)}var gt=class extends h{fromJulianDay(e){let t=super.fromJulianDay(e),n=mt(t);return new ot(this,pt[n],t.year-ft[n],t.month,t.day)}toJulianDay(e){return super.toJulianDay(ht(e))}balanceDate(e){let t=ht(e),n=mt(t);pt[n]!==e.era&&(e.era=pt[n],e.year=t.year-ft[n]),this.constrainDate(e)}constrainDate(e){let t=pt.indexOf(e.era),n=dt[t];if(n!=null){let[r,i,a]=n,o=r-ft[t];e.year=Math.max(1,Math.min(o,e.year)),e.year===o&&(e.month=Math.min(i,e.month),e.month===i&&(e.day=Math.min(a,e.day)))}if(e.year===1&&t>=0){let[,n,r]=ut[t];e.month=Math.max(n,e.month),e.month===n&&(e.day=Math.max(r,e.day))}}getEras(){return pt}getYearsInEra(e){let t=pt.indexOf(e.era),n=ut[t],r=ut[t+1];if(r==null)return 9999-n[0]+1;let i=r[0]-n[0];return(e.month<r[1]||e.month===r[1]&&e.day<r[2])&&i++,i}getDaysInMonth(e){return super.getDaysInMonth(ht(e))}getMinimumMonthInYear(e){let t=_t(e);return t?t[1]:1}getMinimumDayInMonth(e){let t=_t(e);return t&&e.month===t[1]?t[2]:1}constructor(...e){super(...e),this.identifier=`japanese`}};function _t(e){if(e.year===1){let t=pt.indexOf(e.era);return ut[t]}}let vt=-543;var yt=class extends h{fromJulianDay(e){let t=super.fromJulianDay(e),n=f(t.era,t.year);return new ot(this,n-vt,t.month,t.day)}toJulianDay(e){return super.toJulianDay(bt(e))}getEras(){return[`BE`]}getDaysInMonth(e){return super.getDaysInMonth(bt(e))}balanceDate(){}constructor(...e){super(...e),this.identifier=`buddhist`}};function bt(e){let[t,n]=p(e.year+vt);return new ot(t,n,e.month,e.day)}let xt=1911;function St(e){return e.era===`minguo`?e.year+xt:1-e.year+xt}function Ct(e){let t=e-xt;return t>0?[`minguo`,t]:[`before_minguo`,1-t]}var wt=class extends h{fromJulianDay(e){let t=super.fromJulianDay(e),[n,r]=Ct(f(t.era,t.year));return new ot(this,n,r,t.month,t.day)}toJulianDay(e){return super.toJulianDay(Tt(e))}getEras(){return[`before_minguo`,`minguo`]}balanceDate(e){let[t,n]=Ct(St(e));e.era=t,e.year=n}isInverseEra(e){return e.era===`before_minguo`}getDaysInMonth(e){return super.getDaysInMonth(Tt(e))}getYearsInEra(e){return e.era===`before_minguo`?9999:8088}constructor(...e){super(...e),this.identifier=`roc`}};function Tt(e){let[t,n]=p(St(e));return new ot(t,n,e.month,e.day)}let Et=[0,31,62,93,124,155,186,216,246,276,306,336];var Dt=class{fromJulianDay(e){let t=e-1948320,n=1+Math.floor((33*t+3)/12053),r=t-(365*(n-1)+Math.floor((8*n+21)/33)),i=Math.floor(r<216?r/31:(r-6)/30),a=r-Et[i]+1;return new ot(this,n,i+1,a)}toJulianDay(e){let t=1948319+365*(e.year-1)+Math.floor((8*e.year+21)/33);return t+=Et[e.month-1],t+=e.day,t}getMonthsInYear(){return 12}getDaysInMonth(e){return e.month<=6?31:e.month<=11||l(25*e.year+11,33)<8?30:29}getMaximumMonthsInYear(){return 12}getMaximumDaysInMonth(){return 31}getEras(){return[`AP`]}getYearsInEra(){return 9377}constructor(){this.identifier=`persian`}},Ot=class extends h{fromJulianDay(e){let t=super.fromJulianDay(e),n=t.year-78,r=e-u(t.era,t.year,1,1),i;r<80?(n--,i=d(t.year-1)?31:30,r+=i+155+90+10):(i=d(t.year)?31:30,r-=80);let a,o;if(r<i)a=1,o=r+1;else{let e=r-i;e<155?(a=Math.floor(e/31)+2,o=e%31+1):(e-=155,a=Math.floor(e/30)+7,o=e%30+1)}return new ot(this,n,a,o)}toJulianDay(e){let[t,n]=p(e.year+78),r,i;return d(n)?(r=31,i=u(t,n,3,21)):(r=30,i=u(t,n,3,22)),e.month===1?i+e.day-1:(i+=r+Math.min(e.month-2,5)*31,e.month>=8&&(i+=(e.month-7)*30),i+=e.day-1,i)}getDaysInMonth(e){return e.month===1&&d(e.year+78)||e.month>=2&&e.month<=6?31:30}getYearsInEra(){return 9919}getEras(){return[`saka`]}balanceDate(){}constructor(...e){super(...e),this.identifier=`indian`}};let kt=1948440,At=1948439,jt=1300,Mt=1600;function Nt(e,t,n,r){return r+Math.ceil(29.5*(n-1))+(t-1)*354+Math.floor((3+11*t)/30)+e-1}function Pt(e,t,n){let r=Math.floor((30*(n-t)+10646)/10631),i=Math.min(12,Math.ceil((n-(29+Nt(t,r,1,1)))/29.5)+1);return new ot(e,r,i,n-Nt(t,r,i,1)+1)}function Ft(e){return(14+11*e)%30<11}var It=class{fromJulianDay(e){return Pt(this,kt,e)}toJulianDay(e){return Nt(kt,e.year,e.month,e.day)}getDaysInMonth(e){let t=29+e.month%2;return e.month===12&&Ft(e.year)&&t++,t}getMonthsInYear(){return 12}getDaysInYear(e){return Ft(e.year)?355:354}getMaximumMonthsInYear(){return 12}getMaximumDaysInMonth(){return 30}getYearsInEra(){return 9665}getEras(){return[`AH`]}constructor(){this.identifier=`islamic-civil`}},Lt=class extends It{fromJulianDay(e){return Pt(this,At,e)}toJulianDay(e){return Nt(At,e.year,e.month,e.day)}constructor(...e){super(...e),this.identifier=`islamic-tbla`}};let Rt,zt;function Bt(e){return 460322+zt[e-jt]}function Vt(e,t){let n=e-jt,r=1<<11-(t-1);return(Rt[n]&r)===0?29:30}function Ht(e,t){let n=Bt(e);for(let r=1;r<t;r++)n+=Vt(e,r);return n}function Ut(e){return zt[e+1-jt]-zt[e-jt]}var Wt=class extends It{constructor(){if(super(),this.identifier=`islamic-umalqura`,Rt||=new Uint16Array(Uint8Array.from(atob(`qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=`),e=>e.charCodeAt(0)).buffer),!zt){zt=new Uint32Array(301);let e=0;for(let t=jt;t<=Mt;t++){zt[t-jt]=e;for(let n=1;n<=12;n++)e+=Vt(t,n)}}}fromJulianDay(e){let t=e-kt,n=Bt(jt),r=Bt(Mt);if(t<n||t>r)return super.fromJulianDay(e);{let e=1299,n=1,r=1;for(;r>0;){e++,r=t-Bt(e)+1;let i=Ut(e);if(r===i){n=12;break}if(r<i){let t=Vt(e,n);for(n=1;r>t;)r-=t,n++,t=Vt(e,n);break}}return new ot(this,e,n,t-Ht(e,n)+1)}}toJulianDay(e){return e.year<jt||e.year>Mt?super.toJulianDay(e):kt+Ht(e.year,e.month)+(e.day-1)}getDaysInMonth(e){return e.year<jt||e.year>Mt?super.getDaysInMonth(e):Vt(e.year,e.month)}getDaysInYear(e){return e.year<jt||e.year>Mt?super.getDaysInYear(e):Ut(e.year)}};let Gt=347997;function Kt(e){return l(e*7+1,19)<7}function qt(e){let t=Math.floor((235*e-234)/19),n=12084+13753*t,r=t*29+Math.floor(n/25920);return l(3*(r+1),7)<3&&(r+=1),r}function Jt(e){let t=qt(e-1),n=qt(e);return qt(e+1)-n===356?2:+(n-t===382)}function Yt(e){return qt(e)+Jt(e)}function Xt(e){return Yt(e+1)-Yt(e)}function Zt(e){let t=Xt(e);switch(t>380&&(t-=30),t){case 353:return 0;case 354:return 1;case 355:return 2}}function Qt(e,t){if(t>=6&&!Kt(e)&&t++,t===4||t===7||t===9||t===11||t===13)return 29;let n=Zt(e);return t===2?n===2?30:29:t===3?n===0?29:30:t===6?Kt(e)?30:0:30}var $t=class{fromJulianDay(e){let t=e-Gt,n=t*25920/765433,r=Math.floor((19*n+234)/235)+1,i=Yt(r),a=Math.floor(t-i);for(;a<1;)r--,i=Yt(r),a=Math.floor(t-i);let o=1,s=0;for(;s<a;)s+=Qt(r,o),o++;o--,s-=Qt(r,o);let c=a-s;return new ot(this,r,o,c)}toJulianDay(e){let t=Yt(e.year);for(let n=1;n<e.month;n++)t+=Qt(e.year,n);return t+e.day+Gt}getDaysInMonth(e){return Qt(e.year,e.month)}getMonthsInYear(e){return Kt(e.year)?13:12}getDaysInYear(e){return Xt(e.year)}getMaximumMonthsInYear(){return 13}getMaximumDaysInMonth(){return 30}getYearsInEra(){return 9999}getEras(){return[`AM`]}balanceYearMonth(e,t){t.year!==e.year&&(Kt(t.year)&&!Kt(e.year)&&t.month>6?e.month--:!Kt(t.year)&&Kt(e.year)&&t.month>6&&e.month++)}constructor(){this.identifier=`hebrew`}};let en=1723856,tn=1824665,nn=5500;function rn(e,t,n,r){return e+365*t+Math.floor(t/4)+30*(n-1)+r-1}function an(e,t){let n=Math.floor(4*(t-e)/1461);t>=rn(e,n+1,1,1)&&n++;let r=1+Math.floor((t-rn(e,n,1,1))/30),i=t+1-rn(e,n,r,1);return[n,r,i]}function on(e){return Math.floor(e%4/3)}function sn(e,t){return t%13==0?on(e)+5:30}var cn=class{fromJulianDay(e){let[t,n,r]=an(en,e),i=`AM`;return t<=0&&(i=`AA`,t+=nn),new ot(this,i,t,n,r)}toJulianDay(e){let t=e.year;return e.era===`AA`&&(t-=nn),rn(en,t,e.month,e.day)}getDaysInMonth(e){return sn(e.year,e.month)}getMonthsInYear(){return 13}getDaysInYear(e){return 365+on(e.year)}getMaximumMonthsInYear(){return 13}getMaximumDaysInMonth(){return 30}getYearsInEra(e){return e.era===`AA`?9999:9991}getEras(){return[`AA`,`AM`]}constructor(){this.identifier=`ethiopic`}},ln=class extends cn{fromJulianDay(e){let[t,n,r]=an(en,e);return t+=nn,new ot(this,`AA`,t,n,r)}getEras(){return[`AA`]}getYearsInEra(){return 9999}constructor(...e){super(...e),this.identifier=`ethioaa`}},un=class extends cn{fromJulianDay(e){let[t,n,r]=an(tn,e),i=`CE`;return t<=0&&(i=`BCE`,t=1-t),new ot(this,i,t,n,r)}toJulianDay(e){let t=e.year;return e.era===`BCE`&&(t=1-t),rn(tn,t,e.month,e.day)}getDaysInMonth(e){let t=e.year;return e.era===`BCE`&&(t=1-t),sn(t,e.month)}isInverseEra(e){return e.era===`BCE`}balanceDate(e){e.year<=0&&(e.era=e.era===`BCE`?`CE`:`BCE`,e.year=1-e.year)}getEras(){return[`BCE`,`CE`]}getYearsInEra(e){return e.era===`BCE`?9999:9715}constructor(...e){super(...e),this.identifier=`coptic`}};function dn(e){switch(e){case`buddhist`:return new yt;case`ethiopic`:return new cn;case`ethioaa`:return new ln;case`coptic`:return new un;case`hebrew`:return new $t;case`indian`:return new Ot;case`islamic-civil`:return new It;case`islamic-tbla`:return new Lt;case`islamic-umalqura`:return new Wt;case`japanese`:return new gt;case`persian`:return new Dt;case`roc`:return new wt;default:return new h}}let fn=new Map;var pn=class{constructor(e,t={}){this.formatter=hn(e,t),this.options=t}format(e){return this.formatter.format(e)}formatToParts(e){return this.formatter.formatToParts(e)}formatRange(e,t){if(typeof this.formatter.formatRange==`function`)return this.formatter.formatRange(e,t);if(t<e)throw RangeError(`End date must be >= start date`);return`${this.formatter.format(e)} \u{2013} ${this.formatter.format(t)}`}formatRangeToParts(e,t){if(typeof this.formatter.formatRangeToParts==`function`)return this.formatter.formatRangeToParts(e,t);if(t<e)throw RangeError(`End date must be >= start date`);let n=this.formatter.formatToParts(e),r=this.formatter.formatToParts(t);return[...n.map(e=>({...e,source:`startRange`})),{type:`literal`,value:` – `,source:`shared`},...r.map(e=>({...e,source:`endRange`}))]}resolvedOptions(){let e=this.formatter.resolvedOptions();return yn()&&(this.resolvedHourCycle||=bn(e.locale,this.options),e.hourCycle=this.resolvedHourCycle,e.hour12=this.resolvedHourCycle===`h11`||this.resolvedHourCycle===`h12`),e.calendar===`ethiopic-amete-alem`&&(e.calendar=`ethioaa`),e}};let mn={true:{ja:`h11`},false:{}};function hn(e,t={}){if(typeof t.hour12==`boolean`&&_n()){t={...t};let n=mn[String(t.hour12)][e.split(`-`)[0]],r=t.hour12?`h12`:`h23`;t.hourCycle=n??r,delete t.hour12}let n=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``);if(fn.has(n))return fn.get(n);let r=new Intl.DateTimeFormat(e,t);return fn.set(n,r),r}let gn=null;function _n(){return gn??=new Intl.DateTimeFormat(`en-US`,{hour:`numeric`,hour12:!1}).format(new Date(2020,2,3,0))===`24`,gn}let vn=null;function yn(){return vn??=new Intl.DateTimeFormat(`fr`,{hour:`numeric`,hour12:!1}).resolvedOptions().hourCycle===`h12`,vn}function bn(e,t){if(!t.timeStyle&&!t.hour)return;e=e.replace(/(-u-)?-nu-[a-zA-Z0-9]+/,``),e+=(e.includes(`-u-`)?``:`-u`)+`-nu-latn`;let n=hn(e,{...t,timeZone:void 0}),r=parseInt(n.formatToParts(new Date(2020,2,3,0)).find(e=>e.type===`hour`).value,10),i=parseInt(n.formatToParts(new Date(2020,2,3,23)).find(e=>e.type===`hour`).value,10);if(r===0&&i===23)return`h23`;if(r===24&&i===23)return`h24`;if(r===0&&i===11)return`h11`;if(r===12&&i===11)return`h12`;throw Error(`Unexpected hour cycle result`)}function xn(...e){return(...t)=>{for(let n of e)typeof n==`function`&&n(...t)}}var Sn=o(((e,t)=>{t.exports=window.React})),R=c(Sn(),1);let z=typeof document<`u`?R.default.useLayoutEffect:()=>{},Cn={prefix:String(Math.round(Math.random()*1e10)),current:0},wn=R.default.createContext(Cn),Tn=R.default.createContext(!1);typeof window<`u`&&window.document&&window.document.createElement;let En=new WeakMap;function Dn(e=!1){let t=(0,R.useContext)(wn),n=(0,R.useRef)(null);if(n.current===null&&!e){let e=R.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;if(e){let n=En.get(e);n==null?En.set(e,{id:t.current,state:e.memoizedState}):e.memoizedState!==n.state&&(t.current=n.id,En.delete(e))}n.current=++t.current}return n.current}function On(e){let t=(0,R.useContext)(wn),n=Dn(!!e),r=`react-aria${t.prefix}`;return e||`${r}-${n}`}function kn(e){let t=R.default.useId(),[n]=(0,R.useState)(Pn()),r=n?`react-aria`:`react-aria${Cn.prefix}`;return e||`${r}-${t}`}let An=typeof R.default.useId==`function`?kn:On;function jn(){return!1}function Mn(){return!0}function Nn(e){return()=>{}}function Pn(){return typeof R.default.useSyncExternalStore==`function`?R.default.useSyncExternalStore(Nn,jn,Mn):(0,R.useContext)(Tn)}function Fn(e){let[t,n]=(0,R.useState)(e),r=(0,R.useRef)(t),i=(0,R.useRef)(null),a=(0,R.useRef)(()=>{if(!i.current)return;let e=i.current.next();if(e.done){i.current=null;return}r.current===e.value?a.current():n(e.value)});return z(()=>{r.current=t,i.current&&a.current()}),[t,(0,R.useCallback)(e=>{i.current=e(r.current),a.current()},[a])]}let In=!!(typeof window<`u`&&window.document&&window.document.createElement),Ln=new Map,Rn;typeof FinalizationRegistry<`u`&&(Rn=new FinalizationRegistry(e=>{Ln.delete(e)}));let zn=new WeakMap;function B(e){let[t,n]=(0,R.useState)(e),r=(0,R.useRef)(null),i=An(t),a=(0,R.useRef)(null),o=zn.get(a);if(Rn&&o!==i&&(o!=null&&Rn.unregister(a),Rn.register(a,i,a),zn.set(a,i)),In){let e=Ln.get(i);e&&!e.includes(r)?e.push(r):Ln.set(i,[r])}return z(()=>{let e=i;return()=>{Rn&&(Rn.unregister(a),zn.delete(a)),Ln.delete(e)}},[i]),(0,R.useEffect)(()=>{let e=r.current;return e&&n(e),()=>{e&&(r.current=null)}}),i}function Bn(e,t){if(e===t)return e;let n=Ln.get(e);if(n)return n.forEach(e=>e.current=t),t;let r=Ln.get(t);return r?(r.forEach(t=>t.current=e),e):t}function Vn(e=[]){let t=B(),[n,r]=Fn(t),i=(0,R.useCallback)(()=>{r(function*(){yield t,yield document.getElementById(t)?t:void 0})},[t,r]);return z(i,[t,i,...e]),n}function Hn(...e){return e.length===1&&e[0]?e[0]:t=>{let n=!1,r=e.map(e=>{let r=Un(e,t);return n||=typeof r==`function`,r});if(n)return()=>{r.forEach((t,n)=>{typeof t==`function`?t():Un(e[n],null)})}}}function Un(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function Wn(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Wn(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function Gn(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Wn(e))&&(r&&(r+=` `),r+=t);return r}function V(...e){let t={...e[0]};for(let n=1;n<e.length;n++){let r=e[n];for(let e in r){let n=t[e],i=r[e];typeof n==`function`&&typeof i==`function`&&e[0]===`o`&&e[1]===`n`&&e.charCodeAt(2)>=65&&e.charCodeAt(2)<=90?t[e]=xn(n,i):(e===`className`||e===`UNSAFE_className`)&&typeof n==`string`&&typeof i==`string`?t[e]=Gn(n,i):e===`id`&&n&&i?t.id=Bn(n,i):e===`ref`&&n&&i?t.ref=Hn(n,i):t[e]=i===void 0?n:i}}return t}function Kn(e){let t=(0,R.useRef)(null),n=(0,R.useRef)(void 0),r=(0,R.useCallback)(t=>{if(typeof e==`function`){let n=e,r=n(t);return()=>{typeof r==`function`?r():n(null)}}if(e)return e.current=t,()=>{e.current=null}},[e]);return(0,R.useMemo)(()=>({get current(){return t.current},set current(e){t.current=e,n.current&&=(n.current(),void 0),e!=null&&(n.current=r(e))}}),[r])}let qn=Symbol(`default`);function Jn({values:e,children:t}){for(let[n,r]of e)t=R.default.createElement(n.Provider,{value:r},t);return t}function H(e){let{className:t,style:n,children:r,defaultClassName:i,defaultChildren:a,defaultStyle:o,values:s,render:c}=e;return(0,R.useMemo)(()=>{let e,l,u;return e=typeof t==`function`?t({...s,defaultClassName:i}):t,l=typeof n==`function`?n({...s,defaultStyle:o||{}}):n,u=typeof r==`function`?r({...s,defaultChildren:a}):r??a,{className:e??i,style:l||o?{...o,...l}:void 0,children:u??a,"data-rac":``,render:c?e=>c(e,s):void 0}},[t,n,r,i,a,o,s,c])}function Yn(e,t){let n=(0,R.useContext)(e);if(t===null)return null;if(n&&typeof n==`object`&&`slots`in n&&n.slots){let e=t||qn;if(!n.slots[e]){let e=new Intl.ListFormat().format(Object.keys(n.slots).map(e=>`"${e}"`)),r=t?`Invalid slot "${t}".`:`A slot prop is required.`;throw Error(`${r} Valid slot names are ${e}.`)}return n.slots[e]}return n}function U(e,t,n){let{ref:r,...i}=Yn(n,e.slot)||{},a=Kn((0,R.useMemo)(()=>Hn(t,r),[t,r])),o=V(i,e);return`style`in i&&i.style&&`style`in e&&e.style&&(o.style=typeof i.style==`function`||typeof e.style==`function`?t=>{let n=typeof i.style==`function`?i.style(t):i.style,r={...t.defaultStyle,...n},a=typeof e.style==`function`?e.style({...t,defaultStyle:r}):e.style;return{...r,...a}}:{...i.style,...e.style}),[o,a]}function Xn(e=!0){let[t,n]=(0,R.useState)(e),r=(0,R.useRef)(!1),i=(0,R.useCallback)(e=>{r.current=!0,n(!!e)},[]);return z(()=>{r.current||n(!1)},[]),[i,t]}function Zn(e){let t=/^(data-.*)$/,n={};for(let r in e)t.test(r)||(n[r]=e[r]);return n}function Qn(e,t,n){let{render:r,...i}=t,a=(0,R.useRef)(null),o=(0,R.useMemo)(()=>Hn(n,a),[n,a]);z(()=>{},[e,r]);let s={...i,ref:o};return r?r(s,void 0):R.default.createElement(e,s)}let $n={},W=new Proxy({},{get(e,t){if(typeof t!=`string`)return;let n=$n[t];return n||(n=(0,R.forwardRef)(Qn.bind(null,t)),$n[t]=n),n}}),G=e=>tr(e)?e.document:nr(e)?e:e?.ownerDocument??(typeof document<`u`?document:void 0),K=e=>G(e)?.defaultView??(typeof window<`u`?window:void 0);function er(e){return typeof e==`object`&&!!e&&`nodeType`in e&&typeof e.nodeType==`number`}function tr(e){return typeof e==`object`&&!!e&&`window`in e&&e.window===e}function nr(e){return er(e)&&e.nodeType===9}function rr(e){return er(e)&&e.nodeType===11&&`host`in e}function ir(e,t,n,r){if(n==null||e==null)return()=>{};let i=Array.isArray(e)?e:[e];for(let e of i)e.addEventListener(t,n,r);return()=>{for(let e of i)e.removeEventListener(t,n,r)}}function ar(e,t,n,r){if(e==null)return()=>{};let i=[],a=Array.isArray(e)?e:[e];for(let e of a){let a=e.style.getPropertyValue(t),o=e.style.getPropertyPriority(t);e.style.setProperty(t,n,r),i.unshift(()=>{a?e.style.setProperty(t,a,o):e.style.removeProperty(t)})}return()=>{for(let e of i)e()}}function or(){return!1}function q(e,t){if(!or())return t&&e?e.contains(t):!1;if(!e||!t)return!1;let n=t;for(;n!==null;){if(n===e)return!0;n=typeof n.assignedElements!=`function`&&n.assignedSlot?.parentNode?n.assignedSlot.parentNode:rr(n)?n.host:n.parentNode}return!1}let J=(e=document)=>{if(!or())return e.activeElement;let t=e.activeElement;for(;t&&`shadowRoot`in t&&t.shadowRoot?.activeElement;)t=t.shadowRoot.activeElement;return t};function Y(e){if(or()&&e.target instanceof Element&&e.target.shadowRoot){if(`composedPath`in e)return e.composedPath()[0]??null;if(`composedPath`in e.nativeEvent)return e.nativeEvent.composedPath()[0]??null}return e.target}function sr(e,t){if(t===null)return[];t??=K(e);let n=[t];if(!or()||!e||e===t)return n;let r=`getRootNode`in t?t.getRootNode():null,i=e.getRootNode()??null;for(;rr(i)&&i!==r;)n.push(i),i=i.host.getRootNode();return n}function cr(e){if(!e)return!1;let t=e.getRootNode(),n=K(e);if(!(t instanceof n.Document||t instanceof n.ShadowRoot))return!1;let r=t.activeElement;return r!=null&&e.contains(r)}function lr(e){let t=fr(G(e));t!==e&&(t&&ur(t,e),e&&dr(e,t))}function ur(e,t){e.dispatchEvent(new FocusEvent(`blur`,{relatedTarget:t})),e.dispatchEvent(new FocusEvent(`focusout`,{bubbles:!0,relatedTarget:t}))}function dr(e,t){e.dispatchEvent(new FocusEvent(`focus`,{relatedTarget:t})),e.dispatchEvent(new FocusEvent(`focusin`,{bubbles:!0,relatedTarget:t}))}function fr(e){let t=J(e),n=t?.getAttribute(`aria-activedescendant`);return n&&e.getElementById(n)||t}function pr(e){if(hr())e.focus({preventScroll:!0});else{let t=gr(e);e.focus(),_r(t)}}let mr=null;function hr(){if(mr==null){mr=!1;try{document.createElement(`div`).focus({get preventScroll(){return mr=!0,!0}})}catch{}}return mr}function gr(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function _r(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}let vr=typeof Element<`u`&&`checkVisibility`in Element.prototype;function yr(e){let t=K(e);if(!(e instanceof t.HTMLElement)&&!(e instanceof t.SVGElement))return!1;let{display:n,visibility:r}=e.style,i=n!==`none`&&r!==`hidden`&&r!==`collapse`;if(i){let{getComputedStyle:t}=K(e),{display:n,visibility:r}=t(e);i=n!==`none`&&r!==`hidden`&&r!==`collapse`}return i}function br(e,t){return!e.hasAttribute(`hidden`)&&!e.hasAttribute(`data-react-aria-prevent-focus`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function xr(e,t){return vr?e.checkVisibility({visibilityProperty:!0})&&!e.closest(`[data-react-aria-prevent-focus]`):e.nodeName!==`#comment`&&yr(e)&&br(e,t)&&(!e.parentElement||xr(e.parentElement,e))}let Sr=[`input:not([disabled]):not([type=hidden])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`summary`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable^="false"])`,`permission`],Cr=Sr.join(`:not([hidden]),`)+`,[tabindex]:not([disabled]):not([hidden])`;Sr.push(`[tabindex]:not([tabindex="-1"]):not([disabled])`);let wr=Sr.join(`:not([hidden]):not([tabindex="-1"]),`);function Tr(e,t){return e.matches(Cr)&&!Dr(e)&&(t?.skipVisibilityCheck||xr(e))}function Er(e){return e.matches(wr)&&xr(e)&&!Dr(e)}function Dr(e){let t=e;for(;t!=null;){if(t instanceof K(t).HTMLElement&&t.inert)return!0;t=t.parentElement}return!1}function Or(e){let t=e;return t.nativeEvent=e,t.isDefaultPrevented=()=>t.defaultPrevented,t.isPropagationStopped=()=>t.cancelBubble,t.persist=()=>{},t}function kr(e,t){Object.defineProperty(e,"target",{value:t}),Object.defineProperty(e,"currentTarget",{value:t})}function Ar(e){let t=(0,R.useRef)({isFocused:!1,observer:null});return z(()=>{let e=t.current;return()=>{e.observer&&=(e.observer.disconnect(),null)}},[]),(0,R.useCallback)(n=>{let r=Y(n);if(r instanceof HTMLButtonElement||r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement){t.current.isFocused=!0;let n=r;n.addEventListener(`focusout`,r=>{if(t.current.isFocused=!1,n.disabled){let t=Or(r);e?.(t)}t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)},{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&n.disabled){t.current.observer?.disconnect();let e=n===J()?null:J();n.dispatchEvent(new FocusEvent(`blur`,{relatedTarget:e})),n.dispatchEvent(new FocusEvent(`focusout`,{bubbles:!0,relatedTarget:e}))}}),t.current.observer.observe(n,{attributes:!0,attributeFilter:[`disabled`]})}},[e])}let jr=!1;function Mr(e){for(;e&&!Tr(e,{skipVisibilityCheck:!0});)e=e.parentElement;let t=K(e),n=J(t.document);if(!n||n===e)return;let r=e?.getRootNode(),i=r!=null&&rr(r)?r:K(e),a=t=>t===e||t!=null&&q(e,t),o=e=>e===n||n!=null&&e!=null&&q(n,e);jr=!0;let s=!1,c=e=>{(o(Y(e))||s)&&e.stopImmediatePropagation()},l=t=>{(o(Y(t))||s)&&(t.stopImmediatePropagation(),!e&&!s&&(s=!0,pr(n),f()))},u=e=>{(a(Y(e))||s)&&e.stopImmediatePropagation()},d=e=>{(a(Y(e))||s)&&(e.stopImmediatePropagation(),s||(s=!0,pr(n),f()))};i.addEventListener(`blur`,c,!0),i.addEventListener(`focusout`,l,!0),i.addEventListener(`focusin`,d,!0),i.addEventListener(`focus`,u,!0);let f=()=>{cancelAnimationFrame(p),i.removeEventListener(`blur`,c,!0),i.removeEventListener(`focusout`,l,!0),i.removeEventListener(`focusin`,d,!0),i.removeEventListener(`focus`,u,!0),jr=!1,s=!1},p=requestAnimationFrame(f);return f}function Nr(e){if(typeof window>`u`||window.navigator==null)return!1;let t=window.navigator.userAgentData?.brands;return Array.isArray(t)&&t.some(t=>e.test(t.brand))||e.test(window.navigator.userAgent)}function Pr(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Fr(e){let t=null;return()=>(t??=e(),t)}let Ir=Fr(function(){return Pr(/^Mac/i)}),Lr=Fr(function(){return Pr(/^iPhone/i)}),Rr=Fr(function(){return Pr(/^iPad/i)||Ir()&&navigator.maxTouchPoints>1}),zr=Fr(function(){return Lr()||Rr()}),Br=Fr(function(){return Ir()||zr()}),Vr=Fr(function(){return Nr(/AppleWebKit/i)&&(zr()||!Hr())}),Hr=Fr(function(){return Nr(/Chrome|CriOS|CrMo/i)}),Ur=Fr(function(){return Nr(/Android/i)}),Wr=Fr(function(){return Nr(/(Firefox|FxiOS)/i)});function Gr(e){return e.pointerType===``&&e.isTrusted?!0:Ur()&&e.pointerType?e.type===`click`&&e.buttons===1:e.detail===0&&!e.pointerType}function Kr(e){return!Ur()&&e.width===0&&e.height===0||Ur()&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType===`mouse`}let qr=(0,R.createContext)({isNative:!0,open:Zr,useHref:e=>e});function Jr(){return(0,R.useContext)(qr)}function Yr(e,t,n=!0){let{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}=t;!Vr()&&Wr()&&window.event?.type?.startsWith(`key`)&&e.target===`_blank`&&(Ir()?r=!0:i=!0);let s=Vr()&&Ir()&&!Rr()?new KeyboardEvent(`keydown`,{keyIdentifier:`Enter`,metaKey:r,ctrlKey:i,altKey:a,shiftKey:o}):new MouseEvent(`click`,{metaKey:r,ctrlKey:i,altKey:a,shiftKey:o,detail:1,bubbles:!0,cancelable:!0});Yr.isOpening=n,pr(e),e.dispatchEvent(s),Yr.isOpening=!1}Yr.isOpening=!1;function Xr(e,t){if(e instanceof HTMLAnchorElement)t(e);else if(e.hasAttribute(`data-href`)){let n=document.createElement(`a`);n.href=e.getAttribute(`data-href`),e.hasAttribute(`data-target`)&&(n.target=e.getAttribute(`data-target`)),e.hasAttribute(`data-rel`)&&(n.rel=e.getAttribute(`data-rel`)),e.hasAttribute(`data-download`)&&(n.download=e.getAttribute(`data-download`)),e.hasAttribute(`data-ping`)&&(n.ping=e.getAttribute(`data-ping`)),e.hasAttribute(`data-referrer-policy`)&&(n.referrerPolicy=e.getAttribute(`data-referrer-policy`)),e.appendChild(n),t(n),e.removeChild(n)}}function Zr(e,t){Xr(e,e=>Yr(e,t))}function Qr(e){let t=Jr().useHref(e?.href??``),n={};if(e)for(let r of[`href`,`target`,`rel`,`download`,`ping`,`referrerPolicy`])r in e&&e[r]!==void 0&&(n[r]=r===`href`?t:e[r]);return n}let $r=null,ei=new Set,ti=new Map,ni=!1,ri=!1,ii={Tab:!0,Escape:!0};function ai(e,t){for(let n of ei)n(e,t)}function oi(e){return!(e.metaKey||!Ir()&&e.altKey||e.ctrlKey||e.key===`Control`||e.key===`Shift`||e.key===`Meta`)}function si(e){ni=!0,!Yr.isOpening&&oi(e)&&($r=`keyboard`,ai(`keyboard`,e))}function ci(e){$r=`pointer`,`pointerType`in e&&e.pointerType,(e.type===`mousedown`||e.type===`pointerdown`)&&(ni=!0,ai(`pointer`,e))}function li(e){!Yr.isOpening&&Gr(e)&&(ni=!0,$r=`virtual`)}function ui(e){if(jr)return;let t=Y(e),n=K(t),r=G(t);if(t===n){ri=!0;return}t!==r&&e.isTrusted&&(!ni&&!ri&&($r=`virtual`,ai(`virtual`,e)),ni=!1,ri=!1)}function di(){jr||(ni=!1,ri=!0)}function fi(e){if(typeof window>`u`||typeof document>`u`)return;let t=K(e),n=G(e);if(ti.get(t))return;let r=t.HTMLElement.prototype.focus;Reflect.defineProperty(t.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(){ni=!0,r.apply(this,arguments)}}),n.addEventListener(`keydown`,si,!0),n.addEventListener(`keyup`,si,!0),n.addEventListener(`click`,li,!0),t.addEventListener(`focus`,ui,!0),t.addEventListener(`blur`,di,!1),typeof PointerEvent<`u`&&(n.addEventListener(`pointerdown`,ci,!0),n.addEventListener(`pointermove`,ci,!0),n.addEventListener(`pointerup`,ci,!0)),t.addEventListener(`beforeunload`,()=>{pi(e)},{once:!0}),ti.set(t,{focus:r})}let pi=(e,t)=>{let n=K(e),r=G(e);t&&r.removeEventListener(`DOMContentLoaded`,t),ti.has(n)&&(Reflect.defineProperty(n.HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:ti.get(n).focus}),r.removeEventListener(`keydown`,si,!0),r.removeEventListener(`keyup`,si,!0),r.removeEventListener(`click`,li,!0),n.removeEventListener(`focus`,ui,!0),n.removeEventListener(`blur`,di,!1),typeof PointerEvent<`u`&&(r.removeEventListener(`pointerdown`,ci,!0),r.removeEventListener(`pointermove`,ci,!0),r.removeEventListener(`pointerup`,ci,!0)),ti.delete(n))};function mi(e){let t=G(e),n;return t.readyState===`loading`?(n=()=>{fi(e)},t.addEventListener(`DOMContentLoaded`,n)):fi(e),()=>pi(e,n)}typeof document<`u`&&mi();function hi(){return $r!==`pointer`}function gi(){return $r}function _i(e){$r=e,ai(e,null)}let vi=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function yi(e,t,n){let r=n?Y(n):void 0,i=G(r),a=K(r),o=a===void 0?HTMLInputElement:a.HTMLInputElement,s=a===void 0?HTMLTextAreaElement:a.HTMLTextAreaElement,c=a===void 0?HTMLElement:a.HTMLElement,l=a===void 0?KeyboardEvent:a.KeyboardEvent,u=J(i);return e=e||u instanceof o&&!vi.has(u.type)||u instanceof s||u instanceof c&&u.isContentEditable,!(e&&t===`keyboard`&&n instanceof l&&!ii[n.key])}function bi(e,t,n){fi(),(0,R.useEffect)(()=>{if(n?.enabled===!1)return;let t=(t,r)=>{yi(!!n?.isTextInput,t,r)&&e(hi())};return ei.add(t),()=>{ei.delete(t)}},t)}function xi(e){return Ir()?e.metaKey:e.ctrlKey}let Si=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function Ci(e){return e instanceof HTMLInputElement&&!Si.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}let wi=R.default.useInsertionEffect??z;function X(e){let t=(0,R.useRef)(null);return wi(()=>{t.current=e},[e]),(0,R.useCallback)((...e)=>{let n=t.current;return n?.(...e)},[])}function Ti(e,t,n,r){let i=X(n),a=n==null;(0,R.useEffect)(()=>{if(!(a||e.current==null))return ir(e.current,t,i,r)},[e,t,r,a])}function Ei(e,t){let{id:n,"aria-label":r,"aria-labelledby":i}=e;return n=B(n),i&&r?i=[...new Set([n,...i.trim().split(/\s+/)])].join(` `):i&&=i.trim().split(/\s+/).join(` `),!r&&!i&&t&&(r=t),{id:n,"aria-label":r,"aria-labelledby":i}}let Di=new Set([`Arab`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Oi=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function ki(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize(),n=typeof t.getTextInfo==`function`?t.getTextInfo():t.textInfo;if(n)return n.direction===`rtl`;if(t.script)return Di.has(t.script)}let t=e.split(`-`)[0];return Oi.has(t)}let Ai=Symbol.for(`react-aria.i18n.locale`);function ji(){let e=typeof window<`u`&&window[Ai]||typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e=`en-US`}return{locale:e,direction:ki(e)?`rtl`:`ltr`}}let Mi=ji(),Ni=new Set;function Pi(){Mi=ji();for(let e of Ni)e(Mi)}function Fi(){let e=Pn(),[t,n]=(0,R.useState)(Mi);return(0,R.useEffect)(()=>(Ni.size===0&&window.addEventListener(`languagechange`,Pi),Ni.add(n),()=>{Ni.delete(n),Ni.size===0&&window.removeEventListener(`languagechange`,Pi)}),[]),e?{locale:typeof window<`u`&&window[Ai]||`en-US`,direction:`ltr`}:t}let Ii=R.default.createContext(null);function Li(e){let{locale:t,children:n}=e,r=R.default.useMemo(()=>({locale:t,direction:ki(t)?`rtl`:`ltr`}),[t]);return R.default.createElement(Ii.Provider,{value:r},n)}function Ri(e){let{children:t}=e,n=Fi();return R.default.createElement(Ii.Provider,{value:n},t)}function zi(e){let{locale:t,children:n}=e;return t?R.default.createElement(Li,{locale:t,children:n}):R.default.createElement(Ri,{children:n})}function Z(){let e=Fi();return(0,R.useContext)(Ii)||e}let Bi=Symbol.for(`react-aria.i18n.locale`),Vi=Symbol.for(`react-aria.i18n.strings`),Hi;var Ui=class e{constructor(e,t=`en-US`){this.strings=Object.fromEntries(Object.entries(e).filter(([,e])=>e)),this.defaultLocale=t}getStringForLocale(e,t){let n=this.getStringsForLocale(t)[e];if(!n)throw Error(`Could not find intl message ${e} in ${t} locale`);return n}getStringsForLocale(e){let t=this.strings[e];return t||(t=Wi(e,this.strings,this.defaultLocale),this.strings[e]=t),t}static getGlobalDictionaryForPackage(t){if(typeof window>`u`)return null;let n=window[Bi];if(Hi===void 0){let t=window[Vi];if(!t)return null;Hi={};for(let r in t)Hi[r]=new e({[n]:t[r]},n)}let r=Hi?.[t];if(!r)throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);return r}};function Wi(e,t,n=`en-US`){if(t[e])return t[e];let r=Gi(e),i=Ki(e);if(i&&t[`${r}-${i}`])return t[`${r}-${i}`];if(t[r])return t[r];for(let e in t)if(e.startsWith(r+`-`))return t[e];return t[n]}function Gi(e){return Intl.Locale?new Intl.Locale(e).language:e.split(`-`)[0]}function Ki(e){if(Intl.Locale)return new Intl.Locale(e).script}let qi=new Map,Ji=new Map;var Yi=class{constructor(e,t){this.locale=e,this.strings=t}format(e,t){let n=this.strings.getStringForLocale(e,this.locale);return typeof n==`function`?n(t,this):n}plural(e,t,n=`cardinal`){let r=t[`=`+e];if(r)return typeof r==`function`?r():r;let i=this.locale+`:`+n,a=qi.get(i);return a||(a=new Intl.PluralRules(this.locale,{type:n}),qi.set(i,a)),r=t[a.select(e)]||t.other,typeof r==`function`?r():r}number(e){let t=Ji.get(this.locale);return t||(t=new Intl.NumberFormat(this.locale),Ji.set(this.locale,t)),t.format(e)}select(e,t){let n=e[t]||e.other;return typeof n==`function`?n():n}};let Xi=new WeakMap;function Zi(e){let t=Xi.get(e);return t||(t=new Ui(e),Xi.set(e,t)),t}function Qi(e,t){return t&&Ui.getGlobalDictionaryForPackage(t)||Zi(e)}function $i(e,t){let{locale:n}=Z(),r=Qi(e,t);return(0,R.useMemo)(()=>new Yi(n,r),[n,r])}let ea=typeof document<`u`?R.default.useInsertionEffect??R.default.useLayoutEffect:()=>{};function ta(e,t,n){let[r,i]=(0,R.useState)(e||t),a=(0,R.useRef)(r),o=(0,R.useRef)(e!==void 0),s=e!==void 0;(0,R.useEffect)(()=>{o.current,o.current=s},[s]);let c=s?e:r;ea(()=>{a.current=c});let[,l]=(0,R.useReducer)(()=>({}),{});return[c,(0,R.useCallback)((e,...t)=>{let r=typeof e==`function`?e(a.current):e;Object.is(a.current,r)||(a.current=r,i(r),l(),n?.(r,...t))},[n])]}let na=(0,R.createContext)(null),ra=(0,R.createContext)(null);var ia=class{constructor(e){this.value=null,this.level=0,this.hasChildNodes=!1,this.rendered=null,this.textValue=``,this[`aria-label`]=void 0,this.index=0,this.parentKey=null,this.prevKey=null,this.nextKey=null,this.firstChildKey=null,this.lastChildKey=null,this.props={},this.colSpan=null,this.colIndex=null,this.type=this.constructor.type,this.key=e}get childNodes(){throw Error(`childNodes is not supported`)}clone(){let e=new this.constructor(this.key);return e.value=this.value,e.level=this.level,e.hasChildNodes=this.hasChildNodes,e.rendered=this.rendered,e.textValue=this.textValue,e[`aria-label`]=this[`aria-label`],e.index=this.index,e.parentKey=this.parentKey,e.prevKey=this.prevKey,e.nextKey=this.nextKey,e.firstChildKey=this.firstChildKey,e.lastChildKey=this.lastChildKey,e.props=this.props,e.render=this.render,e.colSpan=this.colSpan,e.colIndex=this.colIndex,e}filter(e,t,n){let r=this.clone();return t.addDescendants(r,e),r}},aa=class extends ia{filter(e,t,n){let[r,i]=la(e,t,this.firstChildKey,n),a=this.clone();return a.firstChildKey=r,a.lastChildKey=i,a}};(class extends ia{static{this.type=`header`}});var oa=class extends ia{static{this.type=`loader`}},sa=class extends aa{static{this.type=`item`}filter(e,t,n){if(n(this.textValue,this)){let n=this.clone();return t.addDescendants(n,e),n}return null}};(class extends aa{static{this.type=`section`}filter(e,t,n){let r=super.filter(e,t,n);if(r&&r.lastChildKey!==null){let t=e.getItem(r.lastChildKey);if(t&&t.type!==`header`)return r}return null}});var ca=class{get size(){return this.itemCount}getKeys(){return this.keyMap.keys()}*[Symbol.iterator](){let e=this.firstKey==null?void 0:this.keyMap.get(this.firstKey);for(;e;)yield e,e=e.nextKey==null?void 0:this.keyMap.get(e.nextKey)}getChildren(e){let t=this.keyMap;return{*[Symbol.iterator](){let n=t.get(e),r=n?.firstChildKey==null?null:t.get(n.firstChildKey);for(;r;)yield r,r=r.nextKey==null?void 0:t.get(r.nextKey)}}}getKeyBefore(e){let t=this.keyMap.get(e);if(!t)return null;if(t.prevKey!=null){for(t=this.keyMap.get(t.prevKey);t&&t.type!==`item`&&t.lastChildKey!=null;)t=this.keyMap.get(t.lastChildKey);return t?.key??null}return t.parentKey}getKeyAfter(e){let t=this.keyMap.get(e);if(!t)return null;if(t.type!==`item`&&t.firstChildKey!=null)return t.firstChildKey;for(;t;){if(t.nextKey!=null)return t.nextKey;if(t.parentKey!=null)t=this.keyMap.get(t.parentKey);else return null}return null}getFirstKey(){return this.firstKey}getLastKey(){let e=this.lastKey==null?null:this.keyMap.get(this.lastKey);for(;e?.lastChildKey!=null;)e=this.keyMap.get(e.lastChildKey);return e?.key??null}getItem(e){return this.keyMap.get(e)??null}at(){throw Error(`Not implemented`)}clone(){let e=this.constructor,t=new e;return t.keyMap=new Map(this.keyMap),t.firstKey=this.firstKey,t.lastKey=this.lastKey,t.itemCount=this.itemCount,t}addNode(e){if(this.frozen)throw Error(`Cannot add a node to a frozen collection`);e.type===`item`&&this.keyMap.get(e.key)==null&&this.itemCount++,this.keyMap.set(e.key,e)}addDescendants(e,t){this.addNode(e);let n=t.getChildren(e.key);for(let e of n)this.addDescendants(e,t)}removeNode(e){if(this.frozen)throw Error(`Cannot remove a node to a frozen collection`);let t=this.keyMap.get(e);t!=null&&t.type===`item`&&this.itemCount--,this.keyMap.delete(e)}commit(e,t,n=!1){if(this.frozen)throw Error(`Cannot commit a frozen collection`);this.firstKey=e,this.lastKey=t,this.frozen=!n}filter(e){let t=new this.constructor,[n,r]=la(this,t,this.firstKey,e);return t?.commit(n,r),t}constructor(){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.frozen=!1,this.itemCount=0}};function la(e,t,n,r){if(n==null)return[null,null];let i=null,a=null,o=e.getItem(n);for(;o!=null;){let n=o.filter(e,t,r);n!=null&&(n.nextKey=null,a&&(n.prevKey=a.key,a.nextKey=n.key),i??=n,t.addNode(n),a=n),o=o.nextKey==null?null:e.getItem(o.nextKey)}if(a&&a.type===`separator`){let e=a.prevKey;t.removeNode(a.key),e==null?a=null:(a=t.getItem(e),a.nextKey=null)}return[i?.key??null,a?.key??null]}var ua=class{constructor(e){this._firstChild=null,this._lastChild=null,this._previousSibling=null,this._nextSibling=null,this._parentNode=null,this._minInvalidChildIndex=null,this.ownerDocument=e}*[Symbol.iterator](){let e=this.firstChild;for(;e;)yield e,e=e.nextSibling}get firstChild(){return this._firstChild}set firstChild(e){this._firstChild=e,this.ownerDocument.markDirty(this)}get lastChild(){return this._lastChild}set lastChild(e){this._lastChild=e,this.ownerDocument.markDirty(this)}get previousSibling(){return this._previousSibling}set previousSibling(e){this._previousSibling=e,this.ownerDocument.markDirty(this)}get nextSibling(){return this._nextSibling}set nextSibling(e){this._nextSibling=e,this.ownerDocument.markDirty(this)}get parentNode(){return this._parentNode}set parentNode(e){this._parentNode=e,this.ownerDocument.markDirty(this)}get isConnected(){return this.parentNode?.isConnected||!1}invalidateChildIndices(e){(this._minInvalidChildIndex==null||!this._minInvalidChildIndex.isConnected||e.index<this._minInvalidChildIndex.index)&&(this._minInvalidChildIndex=e,this.ownerDocument.markDirty(this))}updateChildIndices(){let e=this._minInvalidChildIndex;for(;e;)e.index=e.previousSibling?e.previousSibling.index+1:0,e=e.nextSibling;this._minInvalidChildIndex=null}appendChild(e){e.parentNode&&e.parentNode.removeChild(e),this.firstChild??=e,this.lastChild?(this.lastChild.nextSibling=e,e.index=this.lastChild.index+1,e.previousSibling=this.lastChild):(e.previousSibling=null,e.index=0),e.parentNode=this,e.nextSibling=null,this.lastChild=e,this.ownerDocument.markDirty(this),this.isConnected&&this.ownerDocument.queueUpdate()}insertBefore(e,t){if(t==null)return this.appendChild(e);e.parentNode&&e.parentNode.removeChild(e),e.nextSibling=t,e.previousSibling=t.previousSibling,e.index=t.index-1,this.firstChild===t?this.firstChild=e:t.previousSibling&&(t.previousSibling.nextSibling=e),t.previousSibling=e,e.parentNode=t.parentNode,this.invalidateChildIndices(e),this.isConnected&&this.ownerDocument.queueUpdate()}removeChild(e){e.parentNode===this&&(this._minInvalidChildIndex===e&&(this._minInvalidChildIndex=null),e.nextSibling&&(this.invalidateChildIndices(e.nextSibling),e.nextSibling.previousSibling=e.previousSibling),e.previousSibling&&(e.previousSibling.nextSibling=e.nextSibling),this.firstChild===e&&(this.firstChild=e.nextSibling),this.lastChild===e&&(this.lastChild=e.previousSibling),e.parentNode=null,e.nextSibling=null,e.previousSibling=null,e.index=0,this.ownerDocument.markDirty(e),this.isConnected&&this.ownerDocument.queueUpdate())}addEventListener(){}removeEventListener(){}get previousVisibleSibling(){let e=this.previousSibling;for(;e&&e.isHidden;)e=e.previousSibling;return e}get nextVisibleSibling(){let e=this.nextSibling;for(;e&&e.isHidden;)e=e.nextSibling;return e}get firstVisibleChild(){let e=this.firstChild;for(;e&&e.isHidden;)e=e.nextSibling;return e}get lastVisibleChild(){let e=this.lastChild;for(;e&&e.isHidden;)e=e.previousSibling;return e}},da=class e extends ua{constructor(e,t){super(t),this.nodeType=8,this.isMutated=!0,this._index=0,this.isHidden=!1,this.node=null}get index(){return this._index}set index(e){this._index=e,this.ownerDocument.markDirty(this)}get level(){return this.parentNode instanceof e?this.parentNode.level+ +(this.parentNode.node?.type===`item`):0}getMutableNode(){return this.node==null?null:(this.isMutated||=(this.node=this.node.clone(),!0),this.ownerDocument.markDirty(this),this.node)}updateNode(){let t=this.nextVisibleSibling,n=this.getMutableNode();if(n!=null&&(n.index=this.index,n.level=this.level,n.parentKey=this.parentNode instanceof e?this.parentNode.node?.key??null:null,n.prevKey=this.previousVisibleSibling?.node?.key??null,n.nextKey=t?.node?.key??null,n.hasChildNodes=!!this.firstChild,n.firstChildKey=this.firstVisibleChild?.node?.key??null,n.lastChildKey=this.lastVisibleChild?.node?.key??null,(n.colSpan!=null||n.colIndex!=null)&&t)){let e=(n.colIndex??n.index)+(n.colSpan??1);if(t.node!=null&&e!==t.node.colIndex){let n=t.getMutableNode();n.colIndex=e}}}setProps(e,t,n,r,i){let a,{value:o,textValue:s,id:c,...l}=e;if(this.node==null?(a=new n(c??`react-aria-${++this.ownerDocument.nodeId}`),this.node=a):a=this.getMutableNode(),l.ref=t,a.props=l,a.rendered=r,a.render=i,a.value=o,e[`aria-label`]&&(a[`aria-label`]=e[`aria-label`]),a.textValue=s||(typeof l.children==`string`?l.children:``)||e[`aria-label`]||``,c!=null&&c!==a.key)throw Error(`Cannot change the id of an item`);l.colSpan!=null&&(a.colSpan=l.colSpan),this.isConnected&&this.ownerDocument.queueUpdate()}get style(){let e=this;return{get display(){return e.isHidden?`none`:``},set display(t){let n=t===`none`;if(e.isHidden!==n){(e.parentNode?.firstVisibleChild===e||e.parentNode?.lastVisibleChild===e)&&e.ownerDocument.markDirty(e.parentNode);let t=e.previousVisibleSibling,r=e.nextVisibleSibling;t&&e.ownerDocument.markDirty(t),r&&e.ownerDocument.markDirty(r),e.isHidden=n,e.ownerDocument.markDirty(e)}}}}hasAttribute(){}setAttribute(){}setAttributeNS(){}removeAttribute(){}},fa=class extends ua{constructor(e){super(null),this.nodeType=11,this.ownerDocument=this,this.dirtyNodes=new Set,this.isSSR=!1,this.nodeId=0,this.nodesByProps=new WeakMap,this.nextCollection=null,this.subscriptions=new Set,this.queuedRender=!1,this.inSubscription=!1,this.collection=e,this.nextCollection=e}get isConnected(){return!0}createElement(e){return new da(e,this)}getMutableCollection(){return this.nextCollection||=this.collection.clone(),this.nextCollection}markDirty(e){this.dirtyNodes.add(e)}addNode(e){if(e.isHidden||e.node==null)return;let t=this.getMutableCollection();if(!t.getItem(e.node.key))for(let t of e)this.addNode(t);t.addNode(e.node)}removeNode(e){for(let t of e)this.removeNode(t);e.node&&this.getMutableCollection().removeNode(e.node.key)}getCollection(){return this.inSubscription?this.collection:(this.queuedRender=!1,this.updateCollection(),this.collection)}updateCollection(){for(let e of this.dirtyNodes)e instanceof da&&(!e.isConnected||e.isHidden)?this.removeNode(e):e.updateChildIndices();for(let e of this.dirtyNodes)e instanceof da?(e.isConnected&&!e.isHidden&&(e.updateNode(),this.addNode(e)),e.node&&this.dirtyNodes.delete(e),e.isMutated=!1):this.dirtyNodes.delete(e);this.nextCollection&&(this.nextCollection.commit(this.firstVisibleChild?.node?.key??null,this.lastVisibleChild?.node?.key??null,this.isSSR),this.isSSR||(this.collection=this.nextCollection,this.nextCollection=null))}queueUpdate(){if(!(this.dirtyNodes.size===0||this.queuedRender)){this.queuedRender=!0,this.inSubscription=!0,this.isSSR||(this.collection=this.collection.clone());for(let e of this.subscriptions)e();this.inSubscription=!1}}subscribe(e){return this.subscriptions.add(e),this.queuedRender&&e(),()=>this.subscriptions.delete(e)}resetAfterSSR(){this.isSSR&&(this.isSSR=!1,this.firstChild=null,this.lastChild=null,this.nodeId=0)}};function pa(e){let{children:t,items:n,idScope:r,addIdAndValue:i,dependencies:a=[]}=e,o=(0,R.useMemo)(()=>void 0,[t]),s=(0,R.useMemo)(()=>new WeakMap,[...a,o]);return(0,R.useMemo)(()=>{if(n&&typeof t==`function`){let e=[];for(let a of n){let n=ma(a)?a:null,o=n?s.get(n):null;if(!o){o=t(a);let c=o.props.id??a?.key??a?.id;r!=null&&o.props.id==null&&c!=null&&(c=r+`:`+c);let l=c??e.length;o=(0,R.cloneElement)(o,i?{key:l,id:c,value:a}:{key:l}),n&&s.set(n,o)}e.push(o)}return e}if(typeof t!=`function`)return t},[t,n,s,r,i])}function ma(e){switch(typeof e){case`object`:return e!=null;case`function`:case`symbol`:return!0;default:return!1}}let ha=new Map,ga=new Set;function _a(){if(typeof window>`u`)return;function e(e){return`propertyName`in e}let t=t=>{let r=Y(t);if(!e(t)||!r)return;let i=ha.get(r);i||(i=new Set,ha.set(r,i),r.addEventListener(`transitioncancel`,n,{once:!0})),i.add(t.propertyName)},n=t=>{let r=Y(t);if(!e(t)||!r)return;let i=ha.get(r);if(i&&(i.delete(t.propertyName),i.size===0&&(r.removeEventListener(`transitioncancel`,n),ha.delete(r)),ha.size===0)){for(let e of ga)e();ga.clear()}};document.body.addEventListener(`transitionrun`,t),document.body.addEventListener(`transitionend`,n)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,_a):_a());function va(){for(let[e]of ha)`isConnected`in e&&!e.isConnected&&ha.delete(e)}function ya(e){requestAnimationFrame(()=>{va(),ha.size===0?e():ga.add(e)})}function ba(e){if(!e.isConnected)return;let t=G(e);if(gi()===`virtual`){let n=J(t);ya(()=>{let r=J(t);(r===n||r===t.body)&&e.isConnected&&pr(e)})}else pr(e)}function xa(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:i}=e,a=(0,R.useCallback)(e=>{if(Y(e)===e.currentTarget)return r&&r(e),i&&i(!1),!0},[r,i]),o=Ar(a),s=(0,R.useCallback)(e=>{let t=Y(e),r=G(t),a=r?J(r):J();t===e.currentTarget&&t===a&&(n&&n(e),i&&i(!0),o(e))},[i,n,o]);return{focusProps:{onFocus:!t&&(n||i||r)?s:void 0,onBlur:!t&&(r||i)?a:void 0}}}function Sa(e){if(e)return t=>{let n=!0;e({...t,preventDefault(){t.preventDefault()},isDefaultPrevented(){return t.isDefaultPrevented()},stopPropagation(){n=!0},continuePropagation(){n=!1,typeof t.continuePropagation==`function`&&t.continuePropagation()},isPropagationStopped(){return n}}),n&&!(typeof t.isPropagationStopped==`function`&&t.isPropagationStopped())&&t.stopPropagation()}}let Ca=new Set([`shift`,`alt`,`control`,`meta`,`mod`]),wa=[`Alt`,`Control`,`Meta`,`Shift`];function Ta(e){let t=new Set;return e.alt&&t.add(`Alt`),e.shift&&t.add(`Shift`),e.ctrl&&t.add(`Control`),e.meta&&t.add(`Meta`),e.mod&&t.add(Ir()?`Meta`:`Control`),t}function Ea(e){let t=new Set;return e.altKey&&t.add(`Alt`),e.ctrlKey&&t.add(`Control`),e.metaKey&&t.add(`Meta`),e.shiftKey&&t.add(`Shift`),t}function Da(e){return wa.filter(t=>e.has(t))}function Oa(e){let t=e.split(`+`).reduce((e,t)=>{let n=t.toLowerCase();return Ca.has(n)?n===`shift`?e.shift=!0:n===`alt`?e.alt=!0:n===`control`?e.ctrl=!0:n===`meta`?e.meta=!0:n===`mod`&&(e.mod=!0):e.key=t,e},{shift:!1,alt:!1,ctrl:!1,meta:!1,mod:!1,key:``});if(t.key===``)throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);return t}function ka(e){return e.toLowerCase()}let Aa={space:` `,esc:`escape`,del:`delete`,ins:`insert`,left:`arrowleft`,right:`arrowright`,up:`arrowup`,down:`arrowdown`,pageup:`pageup`,pagedown:`pagedown`};function ja(e){let t=ka(e);return Aa[t]??t}function Ma(e){let t=Da(Ta(e)),n=ja(e.key);return t.length>0?`${t.join(`+`)}+${n}`:n}function Na(e){let t=Da(Ea(e)),n=ka(e.key);return(t.length>0?`${t.join(`+`)}+`:``)+n}function Pa(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=Oa(n);t.set(Ma(e),r)}return e=>{let n=Na(e),r=t.get(n),i=r?.(e);i===void 0&&r!==void 0?i={shouldContinuePropagation:!1,shouldPreventDefault:!0}:typeof i==`boolean`&&(i={shouldContinuePropagation:!i,shouldPreventDefault:i}),i?.shouldPreventDefault&&e.preventDefault(),(!r||i?.shouldContinuePropagation)&&e.continuePropagation()}}function Fa(e){let{shortcuts:t,allowRepeats:n=!1,allowComposing:r=!1}=e,i,a;if(t){let o=Pa(t),s=Sa(e=>{if(!q(e.currentTarget,Y(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}o(e)}),c=Sa(e=>{if(!q(e.currentTarget,Y(e))){e.continuePropagation();return}if(e.nativeEvent?.repeat&&!n||e.nativeEvent?.isComposing&&!r){e.continuePropagation();return}e.continuePropagation()});i=e.onKeyDown?xn(e.onKeyDown,s):s,a=e.onKeyUp?xn(e.onKeyUp,c):c}else i=Sa(e.onKeyDown),a=Sa(e.onKeyUp);return{keyboardProps:e.isDisabled?{}:{onKeyDown:i,onKeyUp:a}}}function Ia(e,t){z(()=>{if(e&&e.ref&&t)return e.ref.current=t.current,()=>{e.ref&&(e.ref.current=null)}})}let La=R.default.createContext(null);function Ra(e){let t=(0,R.useContext)(La)||{};Ia(t,e);let{ref:n,...r}=t;return r}let za=R.default.forwardRef(function(e,t){let{children:n,...r}=e,i=Kn(t),a={...r,ref:i};return R.default.createElement(La.Provider,{value:a},n)});function Ba(e,t){let{focusProps:n}=xa(e),{keyboardProps:r}=Fa(e),i=V(n,r),a=Ra(t),o=e.isDisabled?{}:a,s=(0,R.useRef)(e.autoFocus);(0,R.useEffect)(()=>{s.current&&t.current&&ba(t.current),s.current=!1},[t]);let c=e.excludeFromTabOrder?-1:0;return e.isDisabled&&(c=void 0),{focusableProps:V({...i,tabIndex:c},o)}}let Va=(0,R.forwardRef)(({children:e,...t},n)=>{n=Kn(n);let{focusableProps:r}=Ba(t,n),i=R.default.Children.only(e);(0,R.useEffect)(()=>{},[n,t.isDisabled]);let a=parseInt(R.default.version,10)<19?i.ref:i.props.ref;return R.default.cloneElement(i,{...V(r,i.props),ref:Hn(a,n)})});typeof HTMLTemplateElement<`u`&&(Object.defineProperty(HTMLTemplateElement.prototype,"firstChild",{configurable:!0,enumerable:!0,get:function(){return this.content.firstChild}}),Object.defineProperty(HTMLTemplateElement.prototype,"appendChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.appendChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"removeChild",{configurable:!0,enumerable:!0,value:function(e){return this.content.removeChild(e)}}),Object.defineProperty(HTMLTemplateElement.prototype,"insertBefore",{configurable:!0,enumerable:!0,value:function(e,t){return this.content.insertBefore(e,t)}}));let Ha=(0,R.createContext)(!1);function Ua(e){if((0,R.useContext)(Ha))return R.default.createElement(R.default.Fragment,null,e.children);let t=R.default.createElement(Ha.Provider,{value:!0},e.children);return R.default.createElement(`template`,null,t)}function Wa(e){let t=(t,n)=>(0,R.useContext)(Ha)?null:e(t,n);return t.displayName=e.displayName||e.name,(0,R.forwardRef)(t)}function Ga(){return(0,R.useContext)(Ha)}var Ka=o(((e,t)=>{t.exports=window.ReactDOM})),qa=o((e=>{var t=Sn();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useState,a=t.useEffect,o=t.useLayoutEffect,s=t.useDebugValue;function c(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),c=r[0].inst,u=r[1];return o(function(){c.value=n,c.getSnapshot=t,l(c)&&u({inst:c})},[e,n,t]),a(function(){return l(c)&&u({inst:c}),e(function(){l(c)&&u({inst:c})})},[e]),s(n),n}function l(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch{return!0}}function u(e,t){return t()}var d=typeof window>`u`||window.document===void 0||window.document.createElement===void 0?u:c;e.useSyncExternalStore=t.useSyncExternalStore===void 0?d:t.useSyncExternalStore})),Ja=o(((e,t)=>{t.exports=qa()})),Ya=c(Ka(),1),Xa=Ja();let Za=(0,R.createContext)(!1),Qa=(0,R.createContext)(null);function $a(e){if((0,R.useContext)(Qa))return e.content;let{collection:t,document:n}=ro(e.createCollection);return R.default.createElement(R.default.Fragment,null,R.default.createElement(Ua,null,R.default.createElement(Qa.Provider,{value:n},e.content)),R.default.createElement(eo,{render:e.children,collection:t}))}function eo({collection:e,render:t}){return t(e)}function to(e,t,n){let r=Pn(),i=(0,R.useRef)(r);i.current=r;let a=(0,R.useCallback)(()=>i.current?n():t(),[t,n]);return(0,Xa.useSyncExternalStore)(e,a)}let no=typeof R.default.useSyncExternalStore==`function`?R.default.useSyncExternalStore:to;function ro(e){let[t]=(0,R.useState)(()=>new fa(e?.()||new ca)),n=(0,R.useCallback)(e=>t.subscribe(e),[t]),r=(0,R.useCallback)(()=>{let e=t.getCollection();return t.isSSR&&t.resetAfterSSR(),e},[t]),i=(0,R.useCallback)(()=>(t.isSSR=!0,t.getCollection()),[t]);return{collection:no(n,r,i),document:t}}let io=(0,R.createContext)(null);function ao(e){return class extends ia{static{this.type=e}}}function oo(e,t,n,r,i,a){typeof e==`string`&&(e=ao(e));let o=(0,R.useCallback)(i=>{i?.setProps(t,n,e,r,a)},[t,n,r,a,e]),s=(0,R.useContext)(io);if(s){let o=s.ownerDocument.nodesByProps.get(t);return o||(o=s.ownerDocument.createElement(e.type),o.setProps(t,n,e,r,a),s.appendChild(o),s.ownerDocument.updateCollection(),s.ownerDocument.nodesByProps.set(t,o)),i?R.default.createElement(io.Provider,{value:o},i):null}return R.default.createElement(e.type,{ref:o},i)}function so(e,t){let n=({node:e})=>t(e.props,e.props.ref,e),r=(0,R.forwardRef)((r,i)=>{let a=(0,R.useContext)(La);if(!(0,R.useContext)(Za)){if(t.length>=3)throw Error(t.name+` cannot be rendered outside a collection.`);return t(r,i)}return oo(e,r,i,`children`in r?r.children:null,null,e=>R.default.createElement(La.Provider,{value:a},R.default.createElement(n,{node:e})))});return r.displayName=t.name,r}function co(e){return pa({...e,addIdAndValue:!0})}let lo=(0,R.createContext)(null);function uo(e){let t=(0,R.useContext)(lo),n=(t?.dependencies||[]).concat(e.dependencies),r=e.idScope??t?.idScope,i=co({...e,idScope:r,dependencies:n});return(0,R.useContext)(Qa)&&(i=R.default.createElement(fo,null,i)),t=(0,R.useMemo)(()=>({dependencies:n,idScope:r}),[r,...n]),R.default.createElement(lo.Provider,{value:t},i)}function fo({children:e}){let t=(0,R.useContext)(Qa),n=(0,R.useMemo)(()=>R.default.createElement(Qa.Provider,{value:null},R.default.createElement(Za.Provider,{value:!0},e)),[e]);return Pn()?R.default.createElement(io.Provider,{value:t},n):(0,Ya.createPortal)(n,t)}let po=(0,R.createContext)(null),mo={CollectionRoot({collection:e,renderDropIndicator:t}){return ho(e,null,t)},CollectionBranch({collection:e,parent:t,renderDropIndicator:n}){return ho(e,t,n)}};function ho(e,t,n){return pa({items:t?e.getChildren(t.key):e,dependencies:[n],children(t){if(t.type===`content`)return R.default.createElement(R.default.Fragment,null);let r=t.render(t);return!n||t.type!==`item`?r:R.default.createElement(R.default.Fragment,null,n({type:`item`,key:t.key,dropPosition:`before`}),r,go(e,t,n))}})}function go(e,t,n){let r=t.key,i=e.getKeyAfter(r),a=i==null?null:e.getItem(i);for(;a!=null&&a.type!==`item`;)i=e.getKeyAfter(a.key),a=i==null?null:e.getItem(i);let o=t.nextKey==null?null:e.getItem(t.nextKey);for(;o!=null&&o.type!==`item`;)o=o.nextKey==null?null:e.getItem(o.nextKey);let s=[];if(o==null){let r=t;for(;r?.type===`item`&&(!a||r.parentKey!==a.parentKey&&a.level<r.level);){let t=n({type:`item`,key:r.key,dropPosition:`after`});(0,R.isValidElement)(t)&&s.push((0,R.cloneElement)(t,{key:`${r.key}-after`})),r=r.parentKey==null?null:e.getItem(r.parentKey)}}return s}let _o=(0,R.createContext)(mo);function vo(e){return(0,R.useMemo)(()=>e==null?null:new Set([e]),[e])}let yo=new Set([`id`]),bo=new Set([`aria-label`,`aria-labelledby`,`aria-describedby`,`aria-details`]),xo=new Set([`href`,`hrefLang`,`target`,`rel`,`download`,`ping`,`referrerPolicy`]),So=new Set([`dir`,`lang`,`hidden`,`inert`,`translate`]),Co=new Set(`onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart`.split(`.`)),wo=/^(data-.*)$/;function Q(e,t={}){let{labelable:n,isLink:r,global:i,events:a=i,propNames:o}=t,s={};for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&(yo.has(t)||n&&bo.has(t)||r&&xo.has(t)||i&&So.has(t)||a&&(Co.has(t)||t.endsWith(`Capture`)&&Co.has(t.slice(0,-7)))||o?.has(t)||wo.test(t))&&(s[t]=e[t]);return s}let To=`default`,Eo=``,Do=new WeakMap;function Oo(e){if(zr()&&Vr()){if(To==="default"){let t=G(e);Eo=t.documentElement.style.webkitUserSelect,t.documentElement.style.webkitUserSelect=`none`}To=`disabled`}else if(e instanceof HTMLElement||e instanceof SVGElement){let t=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;Do.set(e,e.style[t]),e.style[t]=`none`}}function ko(e){if(zr()&&Vr()){if(To!==`disabled`)return;To=`restoring`,setTimeout(()=>{ya(()=>{if(To===`restoring`){let t=G(e);t.documentElement.style.webkitUserSelect===`none`&&(t.documentElement.style.webkitUserSelect=Eo||``),Eo=``,To=`default`}})},300)}else if((e instanceof HTMLElement||e instanceof SVGElement)&&e&&Do.has(e)){let t=Do.get(e),n=`userSelect`in e.style?`userSelect`:`webkitUserSelect`;e.style[n]===`none`&&(e.style[n]=t),e.getAttribute(`style`)===``&&e.removeAttribute(`style`),Do.delete(e)}}function Ao(e,t){let n=K(t),r=G(t);if(r==null||n==null)return;let i,a=`meta[name="${CSS.escape(e)}"], meta[property="${CSS.escape(e)}"]`,o=r.querySelector(a);return o&&o instanceof n.HTMLMetaElement&&(e===`csp-nonce`&&o.nonce&&(i??=o.nonce||void 0),o.content&&(i??=o.content||void 0)),e===`csp-nonce`&&(i??=n.__webpack_nonce__||globalThis.__webpack_nonce__||void 0),i}let jo=new WeakMap;function Mo(e){let t=G(e),n=jo.get(t);return n??=Ao(`csp-nonce`,t),n!==void 0&&jo.set(t,n),n}let No=R.default.createContext({register:()=>{}});No.displayName=`PressResponderContext`;function Po(){let e=(0,R.useRef)(new Map),t=(0,R.useCallback)((t,n,r,i)=>{let a=i?.once?(...t)=>{e.current.delete(r),r(...t)}:r;e.current.set(r,{type:n,eventTarget:t,fn:a,options:i}),t.addEventListener(n,a,i)},[]),n=(0,R.useCallback)((t,n,r,i)=>{let a=e.current.get(r)?.fn||r;t.removeEventListener(n,a,i),e.current.delete(r)},[]),r=(0,R.useCallback)(()=>{e.current.forEach((e,t)=>{n(e.eventTarget,e.type,t,e.options)})},[n]);return(0,R.useEffect)(()=>r,[r]),{addGlobalListener:t,removeGlobalListener:n,removeAllGlobalListeners:r}}function Fo(e){let t=(0,R.useContext)(No);if(t){let{register:n,ref:r,...i}=t;e=V(i,e),n()}return Ia(t,e.ref),e}var Io=class{#e;constructor(e,t,n,r){this.#e=!0;let i=(r?.target??n.currentTarget)?.getBoundingClientRect(),a,o=0,s,c=null;n.clientX!=null&&n.clientY!=null&&(s=n.clientX,c=n.clientY),i&&(s!=null&&c!=null?(a=s-i.left,o=c-i.top):(a=i.width/2,o=i.height/2)),this.type=e,this.pointerType=t,this.target=n.currentTarget,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.x=a,this.y=o,this.key=n.key}continuePropagation(){this.#e=!1}get shouldStopPropagation(){return this.#e}};let Lo=Symbol(`linkClicked`),Ro=`react-aria-pressable-style`,zo=`data-react-aria-pressable`;function Bo(e){let{onPress:t,onPressChange:n,onPressStart:r,onPressEnd:i,onPressUp:a,onClick:o,isDisabled:s,isPressed:c,preventFocusOnPress:l,shouldCancelOnPointerExit:u,allowTextSelectionOnPress:d,ref:f,...p}=Fo(e),[m,h]=(0,R.useState)(!1),g=(0,R.useRef)({isPressed:!1,ignoreEmulatedMouseEvents:!1,didFirePressStart:!1,isTriggeringEvent:!1,activePointerId:null,target:null,isOverTarget:!1,pointerType:null,disposables:[]}),{addGlobalListener:_,removeAllGlobalListeners:v}=Po(),y=(0,R.useCallback)((e,t)=>{let i=g.current;if(s||i.didFirePressStart)return!1;let a=!0;if(i.isTriggeringEvent=!0,r){let n=new Io(`pressstart`,t,e);r(n),a=n.shouldStopPropagation}return n&&n(!0),i.isTriggeringEvent=!1,i.didFirePressStart=!0,h(!0),a},[s,r,n]),b=(0,R.useCallback)((e,r,a=!0)=>{let o=g.current;if(!o.didFirePressStart)return!1;o.didFirePressStart=!1,o.isTriggeringEvent=!0;let c=!0;if(i){let t=new Io(`pressend`,r,e);i(t),c=t.shouldStopPropagation}if(n&&n(!1),h(!1),t&&a&&!s){let n=new Io(`press`,r,e);t(n),c&&=n.shouldStopPropagation}return o.isTriggeringEvent=!1,c},[s,i,n,t]),x=X(b),S=X((0,R.useCallback)((e,t)=>{let n=g.current;if(s)return!1;if(a){n.isTriggeringEvent=!0;let r=new Io(`pressup`,t,e);return a(r),n.isTriggeringEvent=!1,r.shouldStopPropagation}return!0},[s,a])),C=(0,R.useCallback)(e=>{let t=g.current;if(t.isPressed&&t.target){t.didFirePressStart&&t.pointerType!=null&&b(Uo(t.target,e),t.pointerType,!1),t.isPressed=!1,t.isOverTarget=!1,t.activePointerId=null,t.pointerType=null,v(),d||ko(t.target);for(let e of t.disposables)e();t.disposables=[]}},[d,v,b]),w=X(C);(0,R.useEffect)(()=>{s&&g.current.isPressed&&w({currentTarget:g.current.target,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1})},[s]);let T=(0,R.useCallback)(e=>{u&&C(e)},[u,C]),E=(0,R.useCallback)(e=>{s||o?.(e)},[s,o]),D=(0,R.useCallback)((e,t)=>{if(!s&&o){let n=new MouseEvent(`click`,e);kr(n,t),o(Or(n))}},[s,o]),O=(0,R.useMemo)(()=>{let e=g.current,t={onKeyDown(t){if(Ho(t.nativeEvent,t.currentTarget)&&q(t.currentTarget,Y(t))){Go(Y(t),t.key)&&t.preventDefault();let r=!0;!e.isPressed&&!t.repeat&&(e.target=t.currentTarget,e.isPressed=!0,e.pointerType=`keyboard`,r=y(t,`keyboard`));let i=t.currentTarget;_(G(t.currentTarget),`keyup`,xn(t=>{Ho(t,i)&&!t.repeat&&q(i,Y(t))&&e.target&&S(Uo(e.target,t),`keyboard`)},n),!0),r&&t.stopPropagation(),t.metaKey&&Ir()&&e.metaKeyEvents?.set(t.key,t.nativeEvent)}else t.key===`Meta`&&(e.metaKeyEvents=new Map)},onClick(t){if((!t||q(t.currentTarget,Y(t)))&&t&&t.button===0&&!e.isTriggeringEvent&&!Yr.isOpening){let n=!0;if(s&&t.preventDefault(),!e.ignoreEmulatedMouseEvents&&!e.isPressed&&(e.pointerType===`virtual`||Gr(t.nativeEvent))){let e=y(t,`virtual`),r=S(t,`virtual`),i=x(t,`virtual`);E(t),n=e&&r&&i}else if(e.isPressed&&e.pointerType!==`keyboard`){let r=e.pointerType||t.nativeEvent.pointerType||`virtual`,i=S(Uo(t.currentTarget,t),r),a=x(Uo(t.currentTarget,t),r,!0);n=i&&a,e.isOverTarget=!1,E(t),w(t)}e.ignoreEmulatedMouseEvents=!1,n&&t.stopPropagation()}}},n=t=>{if(e.isPressed&&e.target&&Ho(t,e.target)){Go(Y(t),t.key)&&t.preventDefault();let n=Y(t),r=q(e.target,n);x(Uo(e.target,t),`keyboard`,r),r&&D(t,e.target),v(),t.key!==`Enter`&&Vo(e.target)&&q(e.target,n)&&!t[Lo]&&(t[Lo]=!0,Yr(e.target,t,!1)),e.isPressed=!1,e.metaKeyEvents?.delete(t.key)}else if(t.key===`Meta`&&e.metaKeyEvents?.size){let t=e.metaKeyEvents;e.metaKeyEvents=void 0;for(let n of t.values())e.target?.dispatchEvent(new KeyboardEvent(`keyup`,n))}};if(typeof PointerEvent<`u`){t.onPointerDown=t=>{if(t.button!==0||!q(t.currentTarget,Y(t)))return;if(Kr(t.nativeEvent)){e.pointerType=`virtual`;return}e.pointerType=t.pointerType;let i=!0;if(!e.isPressed){e.isPressed=!0,e.isOverTarget=!0,e.activePointerId=t.pointerId,e.target=t.currentTarget,d||Oo(e.target),i=y(t,e.pointerType);let a=Y(t);`releasePointerCapture`in a&&(`hasPointerCapture`in a?a.hasPointerCapture(t.pointerId)&&a.releasePointerCapture(t.pointerId):a.releasePointerCapture(t.pointerId)),_(G(t.currentTarget),`pointerup`,n,!1),_(G(t.currentTarget),`pointercancel`,r,!1)}i&&t.stopPropagation()},t.onMouseDown=t=>{if(q(t.currentTarget,Y(t))&&t.button===0){if(l){let n=Mr(t.target);n&&e.disposables.push(n)}t.stopPropagation()}},t.onPointerUp=t=>{q(t.currentTarget,Y(t))&&e.pointerType!==`virtual`&&t.button===0&&!e.isPressed&&S(t,e.pointerType||t.pointerType)},t.onPointerEnter=t=>{t.pointerId===e.activePointerId&&e.target&&!e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!0,y(Uo(e.target,t),e.pointerType))},t.onPointerLeave=t=>{t.pointerId===e.activePointerId&&e.target&&e.isOverTarget&&e.pointerType!=null&&(e.isOverTarget=!1,x(Uo(e.target,t),e.pointerType,!1),T(t))};let n=t=>{if(t.pointerId===e.activePointerId&&e.isPressed&&t.button===0&&e.target){if(q(e.target,Y(t))&&e.pointerType!=null){let n=!1,r=setTimeout(()=>{e.isPressed&&e.target instanceof HTMLElement&&(n?w(t):(pr(e.target),e.target.click()))},80);_(t.currentTarget,`click`,()=>n=!0,!0),e.disposables.push(()=>clearTimeout(r))}else w(t);e.isOverTarget=!1}},r=e=>{w(e)};t.onDragStart=e=>{q(e.currentTarget,Y(e))&&w(e)}}return t},[_,s,l,v,d,T,y,E,D]);return(0,R.useEffect)(()=>{if(!f)return;let e=G(f.current);if(!e||!e.head||e.getElementById(Ro))return;let t=e.createElement(`style`);t.id=Ro;let n=Mo(e);n&&(t.nonce=n),t.textContent=`
@layer {
  [${zo}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(),e.head.prepend(t)},[f]),(0,R.useEffect)(()=>{let e=g.current;return()=>{d||ko(e.target??void 0);for(let t of e.disposables)t();e.disposables=[]}},[d]),{isPressed:c||m,pressProps:V(p,O,{[zo]:!0})}}function Vo(e){return e.tagName===`A`&&e.hasAttribute(`href`)}function Ho(e,t){let{key:n,code:r}=e,i=t,a=i.getAttribute(`role`);return(n===`Enter`||n===` `||n===`Spacebar`||r===`Space`)&&!(i instanceof K(i).HTMLInputElement&&!qo(i,n)||i instanceof K(i).HTMLTextAreaElement||i.isContentEditable)&&!((a===`link`||!a&&Vo(i))&&n!==`Enter`)}function Uo(e,t){let n=t.clientX,r=t.clientY;return{currentTarget:e,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,altKey:t.altKey,clientX:n,clientY:r,key:t.key}}function Wo(e){return e instanceof HTMLInputElement?!1:e instanceof HTMLButtonElement?e.type!==`submit`&&e.type!==`reset`:!Vo(e)}function Go(e,t){return Ir()&&t===`Enter`?!1:e instanceof HTMLInputElement?t===`Enter`&&(e.type===`checkbox`||e.type===`radio`)?!1:!qo(e,t):Wo(e)}let Ko=new Set([`checkbox`,`radio`,`range`,`color`,`file`,`image`,`button`,`submit`,`reset`]);function qo(e,t){return e.type===`checkbox`||e.type===`radio`?t===` `:Ko.has(e.type)}function Jo(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:i}=e,a=(0,R.useRef)({isFocusWithin:!1}),{addGlobalListener:o,removeAllGlobalListeners:s}=Po(),c=(0,R.useCallback)(e=>{q(e.currentTarget,Y(e))&&a.current.isFocusWithin&&!q(e.currentTarget,e.relatedTarget)&&(a.current.isFocusWithin=!1,s(),n&&n(e),i&&i(!1))},[n,i,a,s]),l=Ar(c),u=(0,R.useCallback)(e=>{if(!q(e.currentTarget,Y(e)))return;let t=Y(e),n=G(t),s=J(n);if(!a.current.isFocusWithin&&s===t){r&&r(e),i&&i(!0),a.current.isFocusWithin=!0,l(e);let t=e.currentTarget;o(n,`focus`,e=>{let r=Y(e);if(a.current.isFocusWithin&&!q(t,r)){let e=new n.defaultView.FocusEvent(`blur`,{relatedTarget:r});kr(e,t);let i=Or(e);c(i)}},{capture:!0})}},[r,i,l,o,c]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:u,onBlur:c}}}function Yo(e={}){let{autoFocus:t=!1,isTextInput:n,within:r}=e,i=(0,R.useRef)({isFocused:!1,isFocusVisible:t||hi()}),[a,o]=(0,R.useState)(!1),[s,c]=(0,R.useState)(()=>i.current.isFocused&&i.current.isFocusVisible),l=(0,R.useCallback)(()=>c(i.current.isFocused&&i.current.isFocusVisible),[]),u=(0,R.useCallback)(e=>{i.current.isFocused=e,i.current.isFocusVisible=hi(),o(e),l()},[l]);bi(e=>{i.current.isFocusVisible=e,l()},[n,a],{enabled:a,isTextInput:n});let{focusProps:d}=xa({isDisabled:r,onFocusChange:u}),{focusWithinProps:f}=Jo({isDisabled:!r,onFocusWithinChange:u});return{isFocused:a,isFocusVisible:s,focusProps:r?f:d}}let Xo=!1,Zo=0;function Qo(){Xo=!0,setTimeout(()=>{Xo=!1},500)}function $o(e){e.pointerType===`touch`&&Qo()}function es(){let e=G(null);if(e!==void 0)return Zo===0&&typeof PointerEvent<`u`&&e.addEventListener(`pointerup`,$o),Zo++,()=>{Zo--,!(Zo>0)&&typeof PointerEvent<`u`&&e.removeEventListener(`pointerup`,$o)}}function ts(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,isDisabled:i}=e,[a,o]=(0,R.useState)(!1),s=(0,R.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:``,target:null}).current;(0,R.useEffect)(es,[]);let{addGlobalListener:c,removeAllGlobalListeners:l}=Po(),{hoverProps:u,triggerHoverEnd:d}=(0,R.useMemo)(()=>{let e=(e,r)=>{if(s.pointerType=r,i||r===`touch`||s.isHovered||!q(e.currentTarget,Y(e)))return;s.isHovered=!0;let l=e.currentTarget;s.target=l,c(G(Y(e)),`pointerover`,e=>{s.isHovered&&s.target&&!q(s.target,Y(e))&&a(e,e.pointerType)},{capture:!0}),t&&t({type:`hoverstart`,target:l,pointerType:r}),n&&n(!0),o(!0)},a=(e,t)=>{let i=s.target;s.pointerType=``,s.target=null,t!==`touch`&&s.isHovered&&i&&(s.isHovered=!1,l(),r&&r({type:`hoverend`,target:i,pointerType:t}),n&&n(!1),o(!1))},u={};return typeof PointerEvent<`u`&&(u.onPointerEnter=t=>{Xo&&t.pointerType===`mouse`||e(t,t.pointerType)},u.onPointerLeave=e=>{!i&&q(e.currentTarget,Y(e))&&a(e,e.pointerType)}),{hoverProps:u,triggerHoverEnd:a}},[t,n,r,i,s,c,l]);return(0,R.useEffect)(()=>{i&&d({currentTarget:s.target},s.pointerType)},[i]),{hoverProps:u,isHovered:a}}let ns=(0,R.createContext)({}),rs=Wa(function(e,t){[e,t]=U(e,t,ns);let{elementType:n=`label`,...r}=e,i=W[n];return R.default.createElement(i,{className:`react-aria-Label`,...r,ref:t})});function is(e){let{id:t,label:n,"aria-labelledby":r,"aria-label":i,labelElementType:a=`label`}=e;t=B(t);let o=B(),s={};n&&(r=r?`${o} ${r}`:o,s={id:o,htmlFor:a===`label`?t:void 0});let c=Ei({id:t,"aria-label":i,"aria-labelledby":r});return{labelProps:s,fieldProps:c}}let as=new Map,os=!1;try{os=new Intl.NumberFormat(`de-DE`,{signDisplay:`exceptZero`}).resolvedOptions().signDisplay===`exceptZero`}catch{}var ss=class{constructor(e,t={}){this.numberFormatter=cs(e,t),this.options=t}format(e){let t=``;return t=!os&&this.options.signDisplay!=null?ls(this.numberFormatter,this.options.signDisplay,e):this.numberFormatter.format(e),t}formatToParts(e){return this.numberFormatter.formatToParts(e)}formatRange(e,t){if(typeof this.numberFormatter.formatRange==`function`)return this.numberFormatter.formatRange(e,t);if(t<e)throw RangeError(`End date must be >= start date`);return`${this.format(e)} \u{2013} ${this.format(t)}`}formatRangeToParts(e,t){if(typeof this.numberFormatter.formatRangeToParts==`function`)return this.numberFormatter.formatRangeToParts(e,t);if(t<e)throw RangeError(`End date must be >= start date`);let n=this.numberFormatter.formatToParts(e),r=this.numberFormatter.formatToParts(t);return[...n.map(e=>({...e,source:`startRange`})),{type:`literal`,value:` – `,source:`shared`},...r.map(e=>({...e,source:`endRange`}))]}resolvedOptions(){let e=this.numberFormatter.resolvedOptions();return!os&&this.options.signDisplay!=null&&(e={...e,signDisplay:this.options.signDisplay}),e}};function cs(e,t={}){let{numberingSystem:n}=t;n&&e.includes(`-nu-`)&&(e.includes(`-u-`)||(e+=`-u-`),e+=`-nu-${n}`);let r=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``);if(as.has(r))return as.get(r);let i=new Intl.NumberFormat(e,t);return as.set(r,i),i}function ls(e,t,n){if(t===`auto`)return e.format(n);if(t===`never`)return e.format(Math.abs(n));{let r=!1;if(t===`always`?r=n>0||Object.is(n,0):t===`exceptZero`&&(Object.is(n,-0)||Object.is(n,0)?n=Math.abs(n):r=n>0),r){let t=e.format(-n),r=e.format(n),i=t.replace(r,``).replace(/\u200e|\u061C/,``);return[...i].length!==1&&console.warn(`@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case`),t.replace(r,`!!!`).replace(i,`+`).replace(`!!!`,r)}return e.format(n)}}let us=RegExp(`^.*\\(.*\\).*$`),ds=[`latn`,`arab`,`hanidec`,`deva`,`beng`,`fullwide`];var fs=class{constructor(e,t={}){this.locale=e,this.options=t}parse(e){return ms(this.locale,this.options,e).parse(e)}isValidPartialNumber(e,t,n){return ms(this.locale,this.options,e).isValidPartialNumber(e,t,n)}getNumberingSystem(e){return ms(this.locale,this.options,e).options.numberingSystem}};let ps=new Map;function ms(e,t,n){let r=hs(e,t);if(!e.includes(`-nu-`)&&!r.isValidPartialNumber(n)){for(let i of ds)if(i!==r.options.numberingSystem){let r=hs(e+(e.includes(`-u-`)?`-nu-`:`-u-nu-`)+i,t);if(r.isValidPartialNumber(n))return r}}return r}function hs(e,t){let n=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``),r=ps.get(n);return r||(r=new gs(e,t),ps.set(n,r)),r}var gs=class{constructor(e,t={}){this.locale=e,t.roundingIncrement!==1&&t.roundingIncrement!=null&&(t.maximumFractionDigits==null&&t.minimumFractionDigits==null?(t.maximumFractionDigits=0,t.minimumFractionDigits=0):t.maximumFractionDigits==null?t.maximumFractionDigits=t.minimumFractionDigits:t.minimumFractionDigits??=t.maximumFractionDigits),this.formatter=new Intl.NumberFormat(e,t),this.options=this.formatter.resolvedOptions(),this.symbols=ys(e,this.formatter,this.options,t),this.options.style===`percent`&&((this.options.minimumFractionDigits??0)>18||(this.options.maximumFractionDigits??0)>18)&&console.warn(`NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.`)}parse(e){let t=this.formatter.resolvedOptions().useGrouping,n=this.sanitize(e);if(!t&&this.symbols.group&&n.includes(this.symbols.group))return NaN;if(this.symbols.group&&(n=n.replaceAll(this.symbols.group,``)),this.symbols.decimal&&(n=n.replace(this.symbols.decimal,`.`)),this.symbols.minusSign&&(n=n.replace(this.symbols.minusSign,`-`)),n=n.replace(this.symbols.numeral,this.symbols.index),this.options.style===`percent`){let e=n.indexOf(`-`);n=n.replace(`-`,``),n=n.replace(`+`,``);let t=n.indexOf(`.`);t===-1&&(t=n.length),n=n.replace(`.`,``),n=t-2==0?`0.${n}`:t-2==-1?`0.0${n}`:t-2==-2?`0.00`:`${n.slice(0,t-2)}.${n.slice(t-2)}`,e>-1&&(n=`-${n}`)}let r=n?+n:NaN;if(isNaN(r))return NaN;if(this.options.style===`percent`){let e={...this.options,style:`decimal`,minimumFractionDigits:Math.min((this.options.minimumFractionDigits??0)+2,20),maximumFractionDigits:Math.min((this.options.maximumFractionDigits??0)+2,20)};return new fs(this.locale,e).parse(new ss(this.locale,e).format(r))}return this.options.currencySign===`accounting`&&us.test(e)&&(r=-1*r),r}sanitize(e){let t=this.formatter.resolvedOptions().useGrouping;return this.symbols.noNumeralUnits.length>0&&this.symbols.noNumeralUnits.find(t=>t.unit===e)?this.symbols.noNumeralUnits.find(t=>t.unit===e).value.toString():(e=e.replace(this.symbols.literals,``),this.symbols.minusSign&&(e=e.replace(`-`,this.symbols.minusSign)),this.options.numberingSystem===`arab`&&(this.symbols.decimal&&(e=bs(e,`,`,this.symbols.decimal),e=bs(e,`،`,this.symbols.decimal)),this.symbols.group&&t&&(e=bs(e,`.`,this.symbols.group))),this.symbols.group===`’`&&e.includes(`'`)&&t&&(e=bs(e,`'`,this.symbols.group)),this.symbols.group===`'`&&e.includes(`’`)&&t&&(e=bs(e,`’`,this.symbols.group)),this.options.locale===`fr-FR`&&this.symbols.group&&t&&(e=bs(e,` `,this.symbols.group),e=bs(e,/\u00A0/g,this.symbols.group)),e)}isValidPartialNumber(e,t=-1/0,n=1/0){let r=this.formatter.resolvedOptions().useGrouping;return e=this.sanitize(e),this.symbols.minusSign&&e.startsWith(this.symbols.minusSign)&&t<0?e=e.slice(this.symbols.minusSign.length):this.symbols.plusSign&&e.startsWith(this.symbols.plusSign)&&n>0&&(e=e.slice(this.symbols.plusSign.length)),this.symbols.decimal&&e.indexOf(this.symbols.decimal)>-1&&this.options.maximumFractionDigits===0?!1:(this.symbols.group&&r&&(e=bs(e,this.symbols.group,``)),e=e.replace(this.symbols.numeral,``),this.symbols.decimal&&(e=e.replace(this.symbols.decimal,``)),e.length===0)}};let _s=new Set([`decimal`,`fraction`,`integer`,`minusSign`,`plusSign`,`group`]),vs=[0,4,2,1,11,20,3,7,100,21,.1,1.1];function ys(e,t,n,r){let i=new Intl.NumberFormat(e,{...n,minimumSignificantDigits:1,maximumSignificantDigits:21,roundingIncrement:1,roundingPriority:`auto`,roundingMode:`halfExpand`,useGrouping:!0}),a=i.formatToParts(-10000.111),o=i.formatToParts(10000.111),s=vs.map(e=>i.formatToParts(e)),c=s.map((e,t)=>{let n=e.find(e=>e.type===`unit`);return n&&!e.some(e=>e.type===`integer`||e.type===`fraction`)?{unit:n.value,value:vs[t]}:null}).filter(e=>!!e),l=a.find(e=>e.type===`minusSign`)?.value??`-`,u=o.find(e=>e.type===`plusSign`)?.value;!u&&(r?.signDisplay===`exceptZero`||r?.signDisplay===`always`)&&(u=`+`);let d=new Intl.NumberFormat(e,{...n,minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(.001).find(e=>e.type===`decimal`)?.value,f=a.find(e=>e.type===`group`)?.value,p=a.filter(e=>!_s.has(e.type)).map(e=>xs(e.value)),m=s.flatMap(e=>e.filter(e=>!_s.has(e.type)).map(e=>xs(e.value))),h=[...new Set([...p,...m])].sort((e,t)=>t.length-e.length),g=h.length===0?RegExp(`\\p{White_Space}|\\p{Cf}`,`gu`):RegExp(`${h.join(`|`)}|\\p{White_Space}|\\p{Cf}`,`gu`),_=[...new Intl.NumberFormat(n.locale,{useGrouping:!1}).format(9876543210)].reverse(),v=new Map(_.map((e,t)=>[e,t])),y=RegExp(`[${_.join(``)}]`,`g`);return{minusSign:l,plusSign:u,decimal:d,group:f,literals:g,numeral:y,numerals:_,index:e=>String(v.get(e)),noNumeralUnits:c}}function bs(e,t,n){return e.replaceAll?e.replaceAll(t,n):e.split(t).join(n)}function xs(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function Ss(e={}){let{locale:t}=Z();return(0,R.useMemo)(()=>new ss(t,e),[t,e])}function Cs(e,t=-1/0,n=1/0){return Math.min(Math.max(e,t),n)}function ws(e,t){let n=e,r=0,i=t.toString(),a=i.toLowerCase().indexOf(`e-`);if(a>0)r=Math.abs(Math.floor(Math.log10(Math.abs(t))))+a;else{let e=i.indexOf(`.`);e>=0&&(r=i.length-e)}if(r>0){let e=10**r;n=Math.round(n*e)/e}return n}function Ts(e,t,n,r){t=Number(t),n=Number(n);let i=(e-(isNaN(t)?0:t))%r,a=ws(Math.abs(i)*2>=r?e+Math.sign(i)*(r-Math.abs(i)):e-i,r);return isNaN(t)?!isNaN(n)&&a>n&&(a=Math.floor(ws(n/r,r))*r):a<t?a=t:!isNaN(n)&&a>n&&(a=t+Math.floor(ws((n-t)/r,r))*r),a=ws(a,r),a}let Es=(0,R.createContext)(null),Ds=7e3,Os=null;function ks(e,t=`assertive`,n=Ds){Os?Os.announce(e,t,n):(Os=new js,(typeof IS_REACT_ACT_ENVIRONMENT==`boolean`?IS_REACT_ACT_ENVIRONMENT:typeof jest<`u`)?Os.announce(e,t,n):setTimeout(()=>{Os?.isAttached()&&Os?.announce(e,t,n)},100))}function As(e){Os&&Os.clear(e)}var js=class{constructor(){this.node=null,this.assertiveLog=null,this.politeLog=null,typeof document<`u`&&(this.node=document.createElement(`div`),this.node.dataset.liveAnnouncer=`true`,Object.assign(this.node.style,{border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`}),this.assertiveLog=this.createLog(`assertive`),this.node.appendChild(this.assertiveLog),this.politeLog=this.createLog(`polite`),this.node.appendChild(this.politeLog),document.body.prepend(this.node))}isAttached(){return this.node?.isConnected}createLog(e){let t=document.createElement(`div`);return t.setAttribute(`role`,`log`),t.setAttribute(`aria-live`,e),t.setAttribute(`aria-relevant`,`additions`),t}destroy(){this.node&&=(document.body.removeChild(this.node),null)}announce(e,t=`assertive`,n=Ds){if(!this.node)return;let r=document.createElement(`div`);typeof e==`object`?(r.setAttribute(`role`,`img`),r.setAttribute(`aria-labelledby`,e[`aria-labelledby`])):r.textContent=e,t===`assertive`?this.assertiveLog?.appendChild(r):this.politeLog?.appendChild(r),e!==``&&setTimeout(()=>{r.remove()},n)}clear(e){this.node&&((!e||e===`assertive`)&&this.assertiveLog&&(this.assertiveLog.innerHTML=``),(!e||e===`polite`)&&this.politeLog&&(this.politeLog.innerHTML=``))}};function Ms(e,t){let{elementType:n=`button`,isDisabled:r,onPress:i,onPressStart:a,onPressEnd:o,onPressUp:s,onPressChange:c,preventFocusOnPress:l,allowFocusWhenDisabled:u,onClick:d,href:f,target:p,rel:m,type:h=`button`}=e,g;g=n===`button`?{type:h,disabled:r,form:e.form,formAction:e.formAction,formEncType:e.formEncType,formMethod:e.formMethod,formNoValidate:e.formNoValidate,formTarget:e.formTarget,name:e.name,value:e.value}:{role:`button`,href:n===`a`&&!r?f:void 0,target:n===`a`?p:void 0,type:n===`input`?h:void 0,disabled:n===`input`?r:void 0,"aria-disabled":!r||n===`input`?void 0:r,rel:n===`a`?m:void 0};let{pressProps:_,isPressed:v}=Bo({onPressStart:a,onPressEnd:o,onPressChange:c,onPress:i,onPressUp:s,onClick:d,isDisabled:r,preventFocusOnPress:l,ref:t}),{focusableProps:y}=Ba(e,t);u&&(y.tabIndex=r?-1:y.tabIndex);let b=V(y,_,Q(e,{labelable:!0}));return{isPressed:v,buttonProps:V(g,b,{"aria-haspopup":e[`aria-haspopup`],"aria-expanded":e[`aria-expanded`],"aria-controls":e[`aria-controls`],"aria-pressed":e[`aria-pressed`],"aria-current":e[`aria-current`],"aria-disabled":e[`aria-disabled`]})}}let Ns=(0,R.createContext)({}),Ps=Wa(function(e,t){[e,t]=U(e,t,Ns);let n=e,{isPending:r}=n,{buttonProps:i,isPressed:a}=Ms(e,t);i=Is(i,r);let{focusProps:o,isFocused:s,isFocusVisible:c}=Yo(e),{hoverProps:l,isHovered:u}=ts({...e,isDisabled:e.isDisabled||r}),d={isHovered:u,isPressed:(n.isPressed||a)&&!r,isFocused:s,isFocusVisible:c,isDisabled:e.isDisabled||!1,isPending:r??!1},f=H({...e,values:d,defaultClassName:`react-aria-Button`}),p=B(i.id),m=B(),h=i[`aria-labelledby`];r&&(h?h=`${h} ${m}`:i[`aria-label`]&&(h=`${p} ${m}`));let g=(0,R.useRef)(r);(0,R.useEffect)(()=>{let e={"aria-labelledby":h||p};(!g.current&&s&&r||g.current&&s&&!r)&&ks(e,`assertive`),g.current=r},[r,s,h,p]);let _=Q(e,{global:!0});return delete _.onClick,R.default.createElement(W.button,{...V(_,f,i,o,l),type:i.type===`submit`&&r?`button`:i.type,id:p,ref:t,"aria-labelledby":h,slot:e.slot||void 0,"aria-disabled":r?`true`:i[`aria-disabled`],"data-disabled":e.isDisabled||void 0,"data-pressed":d.isPressed||void 0,"data-hovered":u||void 0,"data-focused":s||void 0,"data-pending":r||void 0,"data-focus-visible":c||void 0},R.default.createElement(Es.Provider,{value:{id:m}},f.children))}),Fs=/Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;function Is(e,t){if(t){for(let t in e)t.startsWith(`on`)&&!Fs.test(t)&&(e[t]=void 0);e.href=void 0,e.target=void 0}return e}let Ls=(0,R.createContext)({}),Rs=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Ls);let{children:n,level:r=3,className:i,...a}=e,o=W[`h${r}`];return R.default.createElement(o,{...a,ref:t,className:i??`react-aria-Heading`},n)}),zs=(0,R.createContext)({}),Bs=Wa(function(e,t){[e,t]=U(e,t,zs);let{elementType:n=`span`,...r}=e,i=W[n];return R.default.createElement(i,{className:`react-aria-Text`,...r,ref:t})});var Vs={};Vs={dateRange:e=>`${e.startDate} \u{625}\u{644}\u{649} ${e.endDate}`,dateSelected:e=>`${e.date} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}`,finishRangeSelectionPrompt:`انقر لإنهاء عملية تحديد نطاق التاريخ`,maximumDate:`آخر تاريخ متاح`,minimumDate:`أول تاريخ متاح`,next:`التالي`,previous:`السابق`,selectedDateDescription:e=>`\u{62A}\u{627}\u{631}\u{64A}\u{62E} \u{645}\u{62D}\u{62F}\u{62F}: ${e.date}`,selectedRangeDescription:e=>`\u{627}\u{644}\u{645}\u{62F}\u{649} \u{627}\u{644}\u{632}\u{645}\u{646}\u{64A} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}: ${e.dateRange}`,startRangeSelectionPrompt:`انقر لبدء عملية تحديد نطاق التاريخ`,todayDate:e=>`\u{627}\u{644}\u{64A}\u{648}\u{645}\u{60C} ${e.date}`,todayDateSelected:e=>`\u{627}\u{644}\u{64A}\u{648}\u{645}\u{60C} ${e.date} \u{645}\u{62D}\u{62F}\u{62F}`};var Hs={};Hs={dateRange:e=>`${e.startDate} \u{434}\u{43E} ${e.endDate}`,dateSelected:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{43E} \u{435} ${e.date}`,finishRangeSelectionPrompt:`Натиснете, за да довършите избора на времеви интервал`,maximumDate:`Последна налична дата`,minimumDate:`Първа налична дата`,next:`Напред`,previous:`Назад`,selectedDateDescription:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{434}\u{438}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: ${e.dateRange}`,startRangeSelectionPrompt:`Натиснете, за да пристъпите към избора на времеви интервал`,todayDate:e=>`\u{414}\u{43D}\u{435}\u{441}, ${e.date}`,todayDateSelected:e=>`\u{414}\u{43D}\u{435}\u{441}, ${e.date} \u{441}\u{430} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`};var Us={};Us={dateRange:e=>`${e.startDate} a\u{17E} ${e.endDate}`,dateSelected:e=>`Vybr\xe1no ${e.date}`,finishRangeSelectionPrompt:`Kliknutím dokončíte výběr rozsahu dat`,maximumDate:`Poslední dostupné datum`,minimumDate:`První dostupné datum`,next:`Další`,previous:`Předchozí`,selectedDateDescription:e=>`Vybran\xe9 datum: ${e.date}`,selectedRangeDescription:e=>`Vybran\xe9 obdob\xed: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknutím zahájíte výběr rozsahu dat`,todayDate:e=>`Dnes, ${e.date}`,todayDateSelected:e=>`Dnes, vybr\xe1no ${e.date}`};var Ws={};Ws={dateRange:e=>`${e.startDate} til ${e.endDate}`,dateSelected:e=>`${e.date} valgt`,finishRangeSelectionPrompt:`Klik for at fuldføre valg af datoområde`,maximumDate:`Sidste ledige dato`,minimumDate:`Første ledige dato`,next:`Næste`,previous:`Forrige`,selectedDateDescription:e=>`Valgt dato: ${e.date}`,selectedRangeDescription:e=>`Valgt interval: ${e.dateRange}`,startRangeSelectionPrompt:`Klik for at starte valg af datoområde`,todayDate:e=>`I dag, ${e.date}`,todayDateSelected:e=>`I dag, ${e.date} valgt`};var Gs={};Gs={dateRange:e=>`${e.startDate} bis ${e.endDate}`,dateSelected:e=>`${e.date} ausgew\xe4hlt`,finishRangeSelectionPrompt:`Klicken, um die Auswahl des Datumsbereichs zu beenden`,maximumDate:`Letztes verfügbares Datum`,minimumDate:`Erstes verfügbares Datum`,next:`Weiter`,previous:`Zurück`,selectedDateDescription:e=>`Ausgew\xe4hltes Datum: ${e.date}`,selectedRangeDescription:e=>`Ausgew\xe4hlter Bereich: ${e.dateRange}`,startRangeSelectionPrompt:`Klicken, um die Auswahl des Datumsbereichs zu beginnen`,todayDate:e=>`Heute, ${e.date}`,todayDateSelected:e=>`Heute, ${e.date} ausgew\xe4hlt`};var Ks={};Ks={dateRange:e=>`${e.startDate} \u{3AD}\u{3C9}\u{3C2} ${e.endDate}`,dateSelected:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} ${e.date}`,finishRangeSelectionPrompt:`Κάντε κλικ για να ολοκληρώσετε την επιλογή εύρους ημερομηνιών`,maximumDate:`Τελευταία διαθέσιμη ημερομηνία`,minimumDate:`Πρώτη διαθέσιμη ημερομηνία`,next:`Επόμενο`,previous:`Προηγούμενο`,selectedDateDescription:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B1}: ${e.date}`,selectedRangeDescription:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3B5}\u{3CD}\u{3C1}\u{3BF}\u{3C2}: ${e.dateRange}`,startRangeSelectionPrompt:`Κάντε κλικ για να ξεκινήσετε την επιλογή εύρους ημερομηνιών`,todayDate:e=>`\u{3A3}\u{3AE}\u{3BC}\u{3B5}\u{3C1}\u{3B1}, ${e.date}`,todayDateSelected:e=>`\u{3A3}\u{3AE}\u{3BC}\u{3B5}\u{3C1}\u{3B1}, \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3C4}\u{3B7}\u{3BA}\u{3B5} ${e.date}`};var qs={};qs={previous:`Previous`,next:`Next`,selectedDateDescription:e=>`Selected Date: ${e.date}`,selectedRangeDescription:e=>`Selected Range: ${e.dateRange}`,todayDate:e=>`Today, ${e.date}`,todayDateSelected:e=>`Today, ${e.date} selected`,dateSelected:e=>`${e.date} selected`,startRangeSelectionPrompt:`Click to start selecting date range`,finishRangeSelectionPrompt:`Click to finish selecting date range`,minimumDate:`First available date`,maximumDate:`Last available date`,dateRange:e=>`${e.startDate} to ${e.endDate}`};var Js={};Js={dateRange:e=>`${e.startDate} a ${e.endDate}`,dateSelected:e=>`${e.date} seleccionado`,finishRangeSelectionPrompt:`Haga clic para terminar de seleccionar rango de fechas`,maximumDate:`Última fecha disponible`,minimumDate:`Primera fecha disponible`,next:`Siguiente`,previous:`Anterior`,selectedDateDescription:e=>`Fecha seleccionada: ${e.date}`,selectedRangeDescription:e=>`Intervalo seleccionado: ${e.dateRange}`,startRangeSelectionPrompt:`Haga clic para comenzar a seleccionar un rango de fechas`,todayDate:e=>`Hoy, ${e.date}`,todayDateSelected:e=>`Hoy, ${e.date} seleccionado`};var Ys={};Ys={dateRange:e=>`${e.startDate} kuni ${e.endDate}`,dateSelected:e=>`${e.date} valitud`,finishRangeSelectionPrompt:`Klõpsake kuupäevavahemiku valimise lõpetamiseks`,maximumDate:`Viimane saadaolev kuupäev`,minimumDate:`Esimene saadaolev kuupäev`,next:`Järgmine`,previous:`Eelmine`,selectedDateDescription:e=>`Valitud kuup\xe4ev: ${e.date}`,selectedRangeDescription:e=>`Valitud vahemik: ${e.dateRange}`,startRangeSelectionPrompt:`Klõpsake kuupäevavahemiku valimiseks`,todayDate:e=>`T\xe4na, ${e.date}`,todayDateSelected:e=>`T\xe4na, ${e.date} valitud`};var Xs={};Xs={dateRange:e=>`${e.startDate} \u{2013} ${e.endDate}`,dateSelected:e=>`${e.date} valittu`,finishRangeSelectionPrompt:`Lopeta päivämääräalueen valinta napsauttamalla tätä.`,maximumDate:`Viimeinen varattavissa oleva päivämäärä`,minimumDate:`Ensimmäinen varattavissa oleva päivämäärä`,next:`Seuraava`,previous:`Edellinen`,selectedDateDescription:e=>`Valittu p\xe4iv\xe4m\xe4\xe4r\xe4: ${e.date}`,selectedRangeDescription:e=>`Valittu aikav\xe4li: ${e.dateRange}`,startRangeSelectionPrompt:`Aloita päivämääräalueen valinta napsauttamalla tätä.`,todayDate:e=>`T\xe4n\xe4\xe4n, ${e.date}`,todayDateSelected:e=>`T\xe4n\xe4\xe4n, ${e.date} valittu`};var Zs={};Zs={dateRange:e=>`${e.startDate} \xe0 ${e.endDate}`,dateSelected:e=>`${e.date} s\xe9lectionn\xe9`,finishRangeSelectionPrompt:`Cliquer pour finir de sélectionner la plage de dates`,maximumDate:`Dernière date disponible`,minimumDate:`Première date disponible`,next:`Suivant`,previous:`Précédent`,selectedDateDescription:e=>`Date s\xe9lectionn\xe9e\xa0: ${e.date}`,selectedRangeDescription:e=>`Plage s\xe9lectionn\xe9e\xa0: ${e.dateRange}`,startRangeSelectionPrompt:`Cliquer pour commencer à sélectionner la plage de dates`,todayDate:e=>`Aujourd'hui, ${e.date}`,todayDateSelected:e=>`Aujourd\u{2019}hui, ${e.date} s\xe9lectionn\xe9`};var Qs={};Qs={dateRange:e=>`${e.startDate} \u{5E2}\u{5D3} ${e.endDate}`,dateSelected:e=>`${e.date} \u{5E0}\u{5D1}\u{5D7}\u{5E8}`,finishRangeSelectionPrompt:`חץ כדי לסיים את בחירת טווח התאריכים`,maximumDate:`תאריך פנוי אחרון`,minimumDate:`תאריך פנוי ראשון`,next:`הבא`,previous:`הקודם`,selectedDateDescription:e=>`\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DA} \u{5E0}\u{5D1}\u{5D7}\u{5E8}: ${e.date}`,selectedRangeDescription:e=>`\u{5D8}\u{5D5}\u{5D5}\u{5D7} \u{5E0}\u{5D1}\u{5D7}\u{5E8}: ${e.dateRange}`,startRangeSelectionPrompt:`לחץ כדי להתחיל בבחירת טווח התאריכים`,todayDate:e=>`\u{5D4}\u{5D9}\u{5D5}\u{5DD}, ${e.date}`,todayDateSelected:e=>`\u{5D4}\u{5D9}\u{5D5}\u{5DD}, ${e.date} \u{5E0}\u{5D1}\u{5D7}\u{5E8}`};var $s={};$s={dateRange:e=>`${e.startDate} do ${e.endDate}`,dateSelected:e=>`${e.date} odabran`,finishRangeSelectionPrompt:`Kliknite da dovršite raspon odabranih datuma`,maximumDate:`Posljednji raspoloživi datum`,minimumDate:`Prvi raspoloživi datum`,next:`Sljedeći`,previous:`Prethodni`,selectedDateDescription:e=>`Odabrani datum: ${e.date}`,selectedRangeDescription:e=>`Odabrani raspon: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknite da započnete raspon odabranih datuma`,todayDate:e=>`Danas, ${e.date}`,todayDateSelected:e=>`Danas, odabran ${e.date}`};var ec={};ec={dateRange:e=>`${e.startDate}\u{2013}${e.endDate}`,dateSelected:e=>`${e.date} kiv\xe1lasztva`,finishRangeSelectionPrompt:`Kattintson a dátumtartomány kijelölésének befejezéséhez`,maximumDate:`Utolsó elérhető dátum`,minimumDate:`Az első elérhető dátum`,next:`Következő`,previous:`Előző`,selectedDateDescription:e=>`Kijel\xf6lt d\xe1tum: ${e.date}`,selectedRangeDescription:e=>`Kijel\xf6lt tartom\xe1ny: ${e.dateRange}`,startRangeSelectionPrompt:`Kattintson a dátumtartomány kijelölésének indításához`,todayDate:e=>`Ma, ${e.date}`,todayDateSelected:e=>`Ma, ${e.date} kijel\xf6lve`};var tc={};tc={dateRange:e=>`Da ${e.startDate} a ${e.endDate}`,dateSelected:e=>`${e.date} selezionata`,finishRangeSelectionPrompt:`Fai clic per completare la selezione dell’intervallo di date`,maximumDate:`Ultima data disponibile`,minimumDate:`Prima data disponibile`,next:`Successivo`,previous:`Precedente`,selectedDateDescription:e=>`Data selezionata: ${e.date}`,selectedRangeDescription:e=>`Intervallo selezionato: ${e.dateRange}`,startRangeSelectionPrompt:`Fai clic per selezionare l’intervallo di date`,todayDate:e=>`Oggi, ${e.date}`,todayDateSelected:e=>`Oggi, ${e.date} selezionata`};var nc={};nc={dateRange:e=>`${e.startDate} \u{304B}\u{3089} ${e.endDate}`,dateSelected:e=>`${e.date} \u{3092}\u{9078}\u{629E}`,finishRangeSelectionPrompt:`クリックして日付範囲の選択を終了`,maximumDate:`最終利用可能日`,minimumDate:`最初の利用可能日`,next:`次へ`,previous:`前へ`,selectedDateDescription:e=>`\u{9078}\u{629E}\u{3057}\u{305F}\u{65E5}\u{4ED8} : ${e.date}`,selectedRangeDescription:e=>`\u{9078}\u{629E}\u{7BC4}\u{56F2} : ${e.dateRange}`,startRangeSelectionPrompt:`クリックして日付範囲の選択を開始`,todayDate:e=>`\u{672C}\u{65E5}\u{3001}${e.date}`,todayDateSelected:e=>`\u{672C}\u{65E5}\u{3001}${e.date} \u{3092}\u{9078}\u{629E}`};var rc={};rc={dateRange:e=>`${e.startDate} ~ ${e.endDate}`,dateSelected:e=>`${e.date} \u{C120}\u{D0DD}\u{B428}`,finishRangeSelectionPrompt:`날짜 범위 선택을 완료하려면 클릭하십시오.`,maximumDate:`마지막으로 사용 가능한 일자`,minimumDate:`처음으로 사용 가능한 일자`,next:`다음`,previous:`이전`,selectedDateDescription:e=>`\u{C120}\u{D0DD} \u{C77C}\u{C790}: ${e.date}`,selectedRangeDescription:e=>`\u{C120}\u{D0DD} \u{BC94}\u{C704}: ${e.dateRange}`,startRangeSelectionPrompt:`날짜 범위 선택을 시작하려면 클릭하십시오.`,todayDate:e=>`\u{C624}\u{B298}, ${e.date}`,todayDateSelected:e=>`\u{C624}\u{B298}, ${e.date} \u{C120}\u{D0DD}\u{B428}`};var ic={};ic={dateRange:e=>`Nuo ${e.startDate} iki ${e.endDate}`,dateSelected:e=>`Pasirinkta ${e.date}`,finishRangeSelectionPrompt:`Spustelėkite, kad baigtumėte pasirinkti datų intervalą`,maximumDate:`Paskutinė galima data`,minimumDate:`Pirmoji galima data`,next:`Paskesnis`,previous:`Ankstesnis`,selectedDateDescription:e=>`Pasirinkta data: ${e.date}`,selectedRangeDescription:e=>`Pasirinktas intervalas: ${e.dateRange}`,startRangeSelectionPrompt:`Spustelėkite, kad pradėtumėte pasirinkti datų intervalą`,todayDate:e=>`\u{160}iandien, ${e.date}`,todayDateSelected:e=>`\u{160}iandien, pasirinkta ${e.date}`};var ac={};ac={dateRange:e=>`No ${e.startDate} l\u{12B}dz ${e.endDate}`,dateSelected:e=>`Atlas\u{12B}ts: ${e.date}`,finishRangeSelectionPrompt:`Noklikšķiniet, lai pabeigtu datumu diapazona atlasi`,maximumDate:`Pēdējais pieejamais datums`,minimumDate:`Pirmais pieejamais datums`,next:`Tālāk`,previous:`Atpakaļ`,selectedDateDescription:e=>`Atlas\u{12B}tais datums: ${e.date}`,selectedRangeDescription:e=>`Atlas\u{12B}tais diapazons: ${e.dateRange}`,startRangeSelectionPrompt:`Noklikšķiniet, lai sāktu datumu diapazona atlasi`,todayDate:e=>`\u{160}odien, ${e.date}`,todayDateSelected:e=>`Atlas\u{12B}ta \u{161}odiena, ${e.date}`};var oc={};oc={dateRange:e=>`${e.startDate} til ${e.endDate}`,dateSelected:e=>`${e.date} valgt`,finishRangeSelectionPrompt:`Klikk for å fullføre valg av datoområde`,maximumDate:`Siste tilgjengelige dato`,minimumDate:`Første tilgjengelige dato`,next:`Neste`,previous:`Forrige`,selectedDateDescription:e=>`Valgt dato: ${e.date}`,selectedRangeDescription:e=>`Valgt omr\xe5de: ${e.dateRange}`,startRangeSelectionPrompt:`Klikk for å starte valg av datoområde`,todayDate:e=>`I dag, ${e.date}`,todayDateSelected:e=>`I dag, ${e.date} valgt`};var sc={};sc={dateRange:e=>`${e.startDate} tot ${e.endDate}`,dateSelected:e=>`${e.date} geselecteerd`,finishRangeSelectionPrompt:`Klik om de selectie van het datumbereik te voltooien`,maximumDate:`Laatste beschikbare datum`,minimumDate:`Eerste beschikbare datum`,next:`Volgende`,previous:`Vorige`,selectedDateDescription:e=>`Geselecteerde datum: ${e.date}`,selectedRangeDescription:e=>`Geselecteerd bereik: ${e.dateRange}`,startRangeSelectionPrompt:`Klik om het datumbereik te selecteren`,todayDate:e=>`Vandaag, ${e.date}`,todayDateSelected:e=>`Vandaag, ${e.date} geselecteerd`};var cc={};cc={dateRange:e=>`${e.startDate} do ${e.endDate}`,dateSelected:e=>`Wybrano ${e.date}`,finishRangeSelectionPrompt:`Kliknij, aby zakończyć wybór zakresu dat`,maximumDate:`Ostatnia dostępna data`,minimumDate:`Pierwsza dostępna data`,next:`Dalej`,previous:`Wstecz`,selectedDateDescription:e=>`Wybrana data: ${e.date}`,selectedRangeDescription:e=>`Wybrany zakres: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknij, aby rozpocząć wybór zakresu dat`,todayDate:e=>`Dzisiaj, ${e.date}`,todayDateSelected:e=>`Dzisiaj wybrano ${e.date}`};var lc={};lc={dateRange:e=>`${e.startDate} a ${e.endDate}`,dateSelected:e=>`${e.date} selecionado`,finishRangeSelectionPrompt:`Clique para concluir a seleção do intervalo de datas`,maximumDate:`Última data disponível`,minimumDate:`Primeira data disponível`,next:`Próximo`,previous:`Anterior`,selectedDateDescription:e=>`Data selecionada: ${e.date}`,selectedRangeDescription:e=>`Intervalo selecionado: ${e.dateRange}`,startRangeSelectionPrompt:`Clique para iniciar a seleção do intervalo de datas`,todayDate:e=>`Hoje, ${e.date}`,todayDateSelected:e=>`Hoje, ${e.date} selecionado`};var uc={};uc={dateRange:e=>`${e.startDate} a ${e.endDate}`,dateSelected:e=>`${e.date} selecionado`,finishRangeSelectionPrompt:`Clique para terminar de selecionar o intervalo de datas`,maximumDate:`Última data disponível`,minimumDate:`Primeira data disponível`,next:`Próximo`,previous:`Anterior`,selectedDateDescription:e=>`Data selecionada: ${e.date}`,selectedRangeDescription:e=>`Intervalo selecionado: ${e.dateRange}`,startRangeSelectionPrompt:`Clique para começar a selecionar o intervalo de datas`,todayDate:e=>`Hoje, ${e.date}`,todayDateSelected:e=>`Hoje, ${e.date} selecionado`};var dc={};dc={dateRange:e=>`De la ${e.startDate} p\xe2n\u{103} la ${e.endDate}`,dateSelected:e=>`${e.date} selectat\u{103}`,finishRangeSelectionPrompt:`Apăsaţi pentru a finaliza selecţia razei pentru dată`,maximumDate:`Ultima dată disponibilă`,minimumDate:`Prima dată disponibilă`,next:`Următorul`,previous:`Înainte`,selectedDateDescription:e=>`Dat\u{103} selectat\u{103}: ${e.date}`,selectedRangeDescription:e=>`Interval selectat: ${e.dateRange}`,startRangeSelectionPrompt:`Apăsaţi pentru a începe selecţia razei pentru dată`,todayDate:e=>`Ast\u{103}zi, ${e.date}`,todayDateSelected:e=>`Azi, ${e.date} selectat\u{103}`};var fc={};fc={dateRange:e=>`\u{421} ${e.startDate} \u{43F}\u{43E} ${e.endDate}`,dateSelected:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${e.date}`,finishRangeSelectionPrompt:`Щелкните, чтобы завершить выбор диапазона дат`,maximumDate:`Последняя доступная дата`,minimumDate:`Первая доступная дата`,next:`Далее`,previous:`Назад`,selectedDateDescription:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{430}\u{44F} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{439} \u{434}\u{438}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: ${e.dateRange}`,startRangeSelectionPrompt:`Щелкните, чтобы начать выбор диапазона дат`,todayDate:e=>`\u{421}\u{435}\u{433}\u{43E}\u{434}\u{43D}\u{44F}, ${e.date}`,todayDateSelected:e=>`\u{421}\u{435}\u{433}\u{43E}\u{434}\u{43D}\u{44F}, \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${e.date}`};var pc={};pc={dateRange:e=>`Od ${e.startDate} do ${e.endDate}`,dateSelected:e=>`Vybrat\xfd d\xe1tum ${e.date}`,finishRangeSelectionPrompt:`Kliknutím dokončíte výber rozsahu dátumov`,maximumDate:`Posledný dostupný dátum`,minimumDate:`Prvý dostupný dátum`,next:`Nasledujúce`,previous:`Predchádzajúce`,selectedDateDescription:e=>`Vybrat\xfd d\xe1tum: ${e.date}`,selectedRangeDescription:e=>`Vybrat\xfd rozsah: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknutím spustíte výber rozsahu dátumov`,todayDate:e=>`Dnes ${e.date}`,todayDateSelected:e=>`Vybrat\xfd dne\u{161}n\xfd d\xe1tum ${e.date}`};var mc={};mc={dateRange:e=>`${e.startDate} do ${e.endDate}`,dateSelected:e=>`${e.date} izbrano`,finishRangeSelectionPrompt:`Kliknite za dokončanje izbire datumskega obsega`,maximumDate:`Zadnji razpoložljivi datum`,minimumDate:`Prvi razpoložljivi datum`,next:`Naprej`,previous:`Nazaj`,selectedDateDescription:e=>`Izbrani datum: ${e.date}`,selectedRangeDescription:e=>`Izbrano obmo\u{10D}je: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknite za začetek izbire datumskega obsega`,todayDate:e=>`Danes, ${e.date}`,todayDateSelected:e=>`Danes, ${e.date} izbrano`};var hc={};hc={dateRange:e=>`${e.startDate} do ${e.endDate}`,dateSelected:e=>`${e.date} izabran`,finishRangeSelectionPrompt:`Kliknite da dovršite opseg izabranih datuma`,maximumDate:`Zadnji raspoloživi datum`,minimumDate:`Prvi raspoloživi datum`,next:`Sledeći`,previous:`Prethodni`,selectedDateDescription:e=>`Izabrani datum: ${e.date}`,selectedRangeDescription:e=>`Izabrani period: ${e.dateRange}`,startRangeSelectionPrompt:`Kliknite da započnete opseg izabranih datuma`,todayDate:e=>`Danas, ${e.date}`,todayDateSelected:e=>`Danas, izabran ${e.date}`};var gc={};gc={dateRange:e=>`${e.startDate} till ${e.endDate}`,dateSelected:e=>`${e.date} har valts`,finishRangeSelectionPrompt:`Klicka för att avsluta val av datumintervall`,maximumDate:`Sista tillgängliga datum`,minimumDate:`Första tillgängliga datum`,next:`Nästa`,previous:`Föregående`,selectedDateDescription:e=>`Valt datum: ${e.date}`,selectedRangeDescription:e=>`Valt intervall: ${e.dateRange}`,startRangeSelectionPrompt:`Klicka för att välja datumintervall`,todayDate:e=>`Idag, ${e.date}`,todayDateSelected:e=>`Idag, ${e.date} har valts`};var _c={};_c={dateRange:e=>`${e.startDate} - ${e.endDate}`,dateSelected:e=>`${e.date} se\xe7ildi`,finishRangeSelectionPrompt:`Tarih aralığı seçimini tamamlamak için tıklayın`,maximumDate:`Son müsait tarih`,minimumDate:`İlk müsait tarih`,next:`Sonraki`,previous:`Önceki`,selectedDateDescription:e=>`Se\xe7ilen Tarih: ${e.date}`,selectedRangeDescription:e=>`Se\xe7ilen Aral\u{131}k: ${e.dateRange}`,startRangeSelectionPrompt:`Tarih aralığı seçimini başlatmak için tıklayın`,todayDate:e=>`Bug\xfcn, ${e.date}`,todayDateSelected:e=>`Bug\xfcn, ${e.date} se\xe7ildi`};var vc={};vc={dateRange:e=>`${e.startDate} \u{2014} ${e.endDate}`,dateSelected:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${e.date}`,finishRangeSelectionPrompt:`Натисніть, щоб завершити вибір діапазону дат`,maximumDate:`Остання доступна дата`,minimumDate:`Перша доступна дата`,next:`Наступний`,previous:`Попередній`,selectedDateDescription:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{434}\u{456}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: ${e.dateRange}`,startRangeSelectionPrompt:`Натисніть, щоб почати вибір діапазону дат`,todayDate:e=>`\u{421}\u{44C}\u{43E}\u{433}\u{43E}\u{434}\u{43D}\u{456}, ${e.date}`,todayDateSelected:e=>`\u{421}\u{44C}\u{43E}\u{433}\u{43E}\u{434}\u{43D}\u{456}, \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E} ${e.date}`};var yc={};yc={dateRange:e=>`${e.startDate} \u{81F3} ${e.endDate}`,dateSelected:e=>`\u{5DF2}\u{9009}\u{62E9} ${e.date}`,finishRangeSelectionPrompt:`单击以完成选择日期范围`,maximumDate:`最后一个可用日期`,minimumDate:`第一个可用日期`,next:`下一页`,previous:`上一页`,selectedDateDescription:e=>`\u{9009}\u{5B9A}\u{7684}\u{65E5}\u{671F}\u{FF1A}${e.date}`,selectedRangeDescription:e=>`\u{9009}\u{5B9A}\u{7684}\u{8303}\u{56F4}\u{FF1A}${e.dateRange}`,startRangeSelectionPrompt:`单击以开始选择日期范围`,todayDate:e=>`\u{4ECA}\u{5929}\u{FF0C}\u{5373} ${e.date}`,todayDateSelected:e=>`\u{5DF2}\u{9009}\u{62E9}\u{4ECA}\u{5929}\u{FF0C}\u{5373} ${e.date}`};var bc={};bc={dateRange:e=>`${e.startDate} \u{81F3} ${e.endDate}`,dateSelected:e=>`\u{5DF2}\u{9078}\u{53D6} ${e.date}`,finishRangeSelectionPrompt:`按一下以完成選取日期範圍`,maximumDate:`最後一個可用日期`,minimumDate:`第一個可用日期`,next:`下一頁`,previous:`上一頁`,selectedDateDescription:e=>`\u{9078}\u{5B9A}\u{7684}\u{65E5}\u{671F}\u{FF1A}${e.date}`,selectedRangeDescription:e=>`\u{9078}\u{5B9A}\u{7684}\u{7BC4}\u{570D}\u{FF1A}${e.dateRange}`,startRangeSelectionPrompt:`按一下以開始選取日期範圍`,todayDate:e=>`\u{4ECA}\u{5929}\u{FF0C}${e.date}`,todayDateSelected:e=>`\u{5DF2}\u{9078}\u{53D6}\u{4ECA}\u{5929}\u{FF0C}${e.date}`};var xc={};xc={"ar-AE":Vs,"bg-BG":Hs,"cs-CZ":Us,"da-DK":Ws,"de-DE":Gs,"el-GR":Ks,"en-US":qs,"es-ES":Js,"et-EE":Ys,"fi-FI":Xs,"fr-FR":Zs,"he-IL":Qs,"hr-HR":$s,"hu-HU":ec,"it-IT":tc,"ja-JP":nc,"ko-KR":rc,"lt-LT":ic,"lv-LV":ac,"nb-NO":oc,"nl-NL":sc,"pl-PL":cc,"pt-BR":lc,"pt-PT":uc,"ro-RO":dc,"ru-RU":fc,"sk-SK":pc,"sl-SI":mc,"sr-SP":hc,"sv-SE":gc,"tr-TR":_c,"uk-UA":vc,"zh-CN":yc,"zh-TW":bc};function Sc(e,t){let n=(0,R.useRef)(null);return e&&n.current&&t(e,n.current)&&(e=n.current),n.current=e,e}function Cc(e){e=Sc(e??{},wc);let{locale:t}=Z();return(0,R.useMemo)(()=>new pn(t,e),[t,e])}function wc(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(t[r]!==e[r])return!1;return!0}function Tc(e){return e&&e.__esModule?e.default:e}let Ec=new WeakMap;function Dc(e){return e?.calendar.identifier===`gregory`&&e.era===`BC`?`short`:void 0}function Oc(e){let t=$i(Tc(xc),`@react-aria/calendar`),n,r;`highlightedRange`in e?{start:n,end:r}=e.highlightedRange||{}:(n=Array.isArray(e.value)?e.value[0]:e.value??void 0,r=Array.isArray(e.value)?e.value.at(-1):e.value??void 0);let i=Cc({weekday:`long`,month:`long`,year:`numeric`,day:`numeric`,era:Dc(n)||Dc(r),timeZone:e.timeZone}),{locale:a}=Z(),o=(0,R.useMemo)(()=>new Intl.ListFormat(a),[a]),s=`anchorDate`in e?e.anchorDate:null;return(0,R.useMemo)(()=>{if(!s&&n&&r){if(_(n,r)){let r=i.format(n.toDate(e.timeZone));return t.format(`selectedDateDescription`,{date:r})}if(`highlightedRange`in e){let a=Ac(i,t,n,r,e.timeZone);return t.format(`selectedRangeDescription`,{dateRange:a})}if(Array.isArray(e.value)){let n=e.value.map(t=>i.format(t.toDate(e.timeZone))),r=o.format(n);return t.format(`selectedDateDescription`,{date:r})}}return``},[n,r,s,e,t,i,o])}function kc(e,t,n,r){let i=$i(Tc(xc),`@react-aria/calendar`),a=Dc(e)||Dc(t),o=Cc({month:`long`,year:`numeric`,era:a,calendar:e.calendar.identifier,timeZone:n}),s=Cc({month:`long`,year:`numeric`,day:`numeric`,era:a,calendar:e.calendar.identifier,timeZone:n});return(0,R.useMemo)(()=>{if(_(e,M(e))){let a=e,s=t;if(e.calendar.getFormattableMonth&&(a=e.calendar.getFormattableMonth(e)),t.calendar.getFormattableMonth&&(s=t.calendar.getFormattableMonth(t)),_(t,ee(e)))return o.format(a.toDate(n));if(_(t,ee(t)))return r?Ac(o,i,a,s,n):o.formatRange(a.toDate(n),s.toDate(n))}return r?Ac(s,i,e,t,n):s.formatRange(e.toDate(n),t.toDate(n))},[e,t,o,s,i,n,r])}function Ac(e,t,n,r,i){let a=e.formatRangeToParts(n.toDate(i),r.toDate(i)),o=-1;for(let e=0;e<a.length;e++){let t=a[e];if(t.source===`shared`&&t.type===`literal`)o=e;else if(t.source===`endRange`)break}let s=``,c=``;for(let e=0;e<a.length;e++)e<o?s+=a[e].value:e>o&&(c+=a[e].value);return t.format(`dateRange`,{startDate:s,endDate:c})}function jc(e,t){let n=(0,R.useRef)(!0),r=(0,R.useRef)(null),i=X(e);(0,R.useEffect)(()=>(n.current=!0,()=>{n.current=!1}),[]),(0,R.useEffect)(()=>{let e=r.current;n.current?n.current=!1:(!e||t.some((t,n)=>!Object.is(t,e[n])))&&i(),r.current=t},t)}function Mc(e){return e&&e.__esModule?e.default:e}function Nc(e,t){let n=$i(Mc(xc),`@react-aria/calendar`),r=Q(e),i=kc(t.visibleRange.start,t.visibleRange.end,t.timeZone,!1),a=kc(t.visibleRange.start,t.visibleRange.end,t.timeZone,!0);jc(()=>{t.isFocused||ks(a)},[a]);let o=Oc(t);jc(()=>{o&&ks(o,`polite`,4e3)},[o]);let s=Vn([!!e.errorMessage,e.isInvalid,e.validationState]);Ec.set(t,{ariaLabel:e[`aria-label`],ariaLabelledBy:e[`aria-labelledby`],errorMessageId:s,selectedDateDescription:o});let[c,l]=(0,R.useState)(!1),u=e.isDisabled||t.isNextVisibleRangeInvalid();u&&c&&(l(!1),t.setFocused(!0));let[d,f]=(0,R.useState)(!1),p=e.isDisabled||t.isPreviousVisibleRangeInvalid();return p&&d&&(f(!1),t.setFocused(!0)),{calendarProps:V(r,Ei({id:e.id,"aria-label":[e[`aria-label`],a].filter(Boolean).join(`, `),"aria-labelledby":e[`aria-labelledby`]}),{role:`application`,"aria-details":e[`aria-details`]||void 0,"aria-describedby":e[`aria-describedby`]||void 0}),nextButtonProps:{onPress:()=>t.focusNextPage(),"aria-label":n.format(`next`),isDisabled:u,onFocusChange:l},prevButtonProps:{onPress:()=>t.focusPreviousPage(),"aria-label":n.format(`previous`),isDisabled:p,onFocusChange:f},errorMessageProps:{id:s},title:i}}function Pc(e,t){return Nc(e,t)}function Fc(e,t){let{startDate:n=t.visibleRange.start,endDate:r=t.visibleRange.end,firstDayOfWeek:i}=e,{direction:a}=Z(),{keyboardProps:o}=Fa({shortcuts:{End:()=>{t.focusSectionEnd()},Home:()=>{t.focusSectionStart()},Escape:()=>(`setAnchorDate`in t&&t.setAnchorDate(null),!1)}}),{keyboardProps:s}=Fa({shortcuts:{Enter:()=>{t.selectFocusedDate()}," ":()=>{t.selectFocusedDate()},PageUp:()=>{t.focusPreviousSection()},"Shift+PageUp":()=>{t.focusPreviousSection(!0)},PageDown:()=>{t.focusNextSection()},"Shift+PageDown":()=>{t.focusNextSection(!0)},ArrowLeft:()=>{a===`rtl`?t.focusNextDay():t.focusPreviousDay()},ArrowUp:()=>{t.focusPreviousRow()},ArrowRight:()=>{a===`rtl`?t.focusPreviousDay():t.focusNextDay()},ArrowDown:()=>{t.focusNextRow()}},allowRepeats:!0}),c=kc(n,r,t.timeZone,!0),{ariaLabel:l,ariaLabelledBy:u}=Ec.get(t),d=Ei({"aria-label":[l,c].filter(Boolean).join(`, `),"aria-labelledby":u}),f=Cc({weekday:e.weekdayStyle||`narrow`,timeZone:t.timeZone}),{locale:p}=Z(),m=(0,R.useMemo)(()=>{let e=t.visibleDuration.days&&t.visibleDuration.days<7,r=e?n:te(T(t.timeZone),p,i),a=e?t.visibleDuration.days:7;return[...Array(a).keys()].map(e=>{let n=r.add({days:e}).toDate(t.timeZone);return f.format(n)})},[p,t.timeZone,f,i,n,t.visibleDuration.days]),h=t.getWeeksInMonth(n);return{gridProps:V(d,{role:`grid`,"aria-readonly":t.isReadOnly||void 0,"aria-disabled":t.isDisabled||void 0,"aria-multiselectable":`highlightedRange`in t||t.selectionMode===`multiple`||void 0,onFocus:()=>t.setFocused(!0),onBlur:()=>t.setFocused(!1)},o,s),headerProps:{"aria-hidden":!0},weekDays:m,weeksInMonth:h}}function Ic(e,t){if(!e)return!1;let n=window.getComputedStyle(e),r=document.scrollingElement||document.documentElement,i=/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY);return e===r&&n.overflow!==`hidden`&&(i=!0),i&&t&&(i=e.scrollHeight!==e.clientHeight||e.scrollWidth!==e.clientWidth),i}function Lc(e,t){let n=e;for(Ic(n,t)&&(n=n.parentElement);n&&!Ic(n,t);)n=n.parentElement;return n||document.scrollingElement||document.documentElement}function Rc(e,t){let n=[],r=document.scrollingElement||document.documentElement;for(;e&&(Ic(e,t)&&n.push(e),e!==r);)e=e.parentElement;return n}function zc(e,t,n={}){e!==t&&Bc(e,t,t.getBoundingClientRect(),n)}function Bc(e,t,n,r={}){let{block:i=`nearest`,inline:a=`nearest`}=r,o=e.scrollTop,s=e.scrollLeft,c=e.getBoundingClientRect(),l=window.getComputedStyle(t),u=window.getComputedStyle(e),d=document.scrollingElement||document.documentElement,f=e===d,p=e===d?0:c.top,m=e===d?e.clientHeight:c.bottom,h=e===d?0:c.left,g=e===d?e.clientWidth:c.right,_=parseFloat(l.scrollMarginTop)||0,v=parseFloat(l.scrollMarginBottom)||0,y=parseFloat(l.scrollMarginLeft)||0,b=parseFloat(l.scrollMarginRight)||0,x=parseFloat(u.scrollPaddingTop)||0,S=parseFloat(u.scrollPaddingBottom)||0,C=parseFloat(u.scrollPaddingLeft)||0,w=parseFloat(u.scrollPaddingRight)||0,T=parseFloat(u.borderTopWidth)||0,E=parseFloat(u.borderBottomWidth)||0,D=parseFloat(u.borderLeftWidth)||0,O=parseFloat(u.borderRightWidth)||0,k=n.top-_,A=n.bottom+v,j=n.left-y,M=n.right+b,ee=e===d?0:D+O,N=e===d?0:T+E,te=e===d?0:e.offsetWidth-e.clientWidth-ee,ne=e===d?0:e.offsetHeight-e.clientHeight-N,P=p+(f?0:T)+x,F=m-(f?0:E)-S-ne,re=h+(f?0:D)+C,I=g-(f?0:O)-w;zr()&&Vr()||u.direction===`ltr`?I-=te:u.direction===`rtl`&&(re+=te);let ie=k<P||A>F,ae=j<re||M>I;if(ie&&i===`start`)o+=k-P;else if(ie&&i===`center`)o+=(k+A)/2-(P+F)/2;else if(ie&&i===`end`)o+=A-F;else if(ie&&i===`nearest`){let e=k-P,t=A-F;o+=Math.abs(e)<=Math.abs(t)?e:t}if(ae&&a===`start`)s+=j-re;else if(ae&&a===`center`)s+=(j+M)/2-(re+I)/2;else if(ae&&a===`end`)s+=M-I;else if(ae&&a===`nearest`){let e=j-re,t=M-I;s+=Math.abs(e)<=Math.abs(t)?e:t}e.scrollTo({left:s,top:o})}function Vc(e,t={}){let{containingElement:n}=t;if(e&&e.isConnected){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:r}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:i,top:a}=e.getBoundingClientRect();(Math.abs(t-i)>1||Math.abs(r-a)>1)&&(n?.scrollIntoView?.({block:`center`,inline:`center`}),e.scrollIntoView?.({block:`nearest`}))}else{let{left:t,top:r}=e.getBoundingClientRect(),i=Rc(e,!0);for(let t of i)zc(t,e);let{left:a,top:o}=e.getBoundingClientRect();if(Math.abs(t-a)>1||Math.abs(r-o)>1){i=n?Rc(n,!0):[];for(let e of i)zc(e,n,{block:`center`,inline:`center`});for(let t of Rc(e,!0))zc(t,e)}}}}let Hc=0,Uc=new Map;function Wc(e){let[t,n]=(0,R.useState)();return z(()=>{if(!e)return;let t=Uc.get(e);if(t)n(t.element.id);else{let r=`react-aria-description-${Hc++}`;n(r);let i=document.createElement(`div`);i.id=r,i.style.display=`none`,i.textContent=e,document.body.appendChild(i),t={refCount:0,element:i},Uc.set(e,t)}return t.refCount++,()=>{t&&--t.refCount===0&&(t.element.remove(),Uc.delete(e))}},[e]),{"aria-describedby":e?t:void 0}}function Gc(e){return e&&e.__esModule?e.default:e}function Kc(e,t,n){let{date:r,isDisabled:i}=e,{errorMessageId:a,selectedDateDescription:o}=Ec.get(t),s=$i(Gc(xc),`@react-aria/calendar`),c=Cc({weekday:`long`,day:`numeric`,month:`long`,year:`numeric`,era:Dc(r),timeZone:t.timeZone}),l=t.isCellFocused(r)&&!e.isOutsideMonth;i=i||t.isCellDisabled(r)||!!e.isOutsideMonth;let u=t.isCellUnavailable(r),d=!i&&!u,f=t.isSelected(r)&&d,p=!1;t.isValueInvalid&&(`highlightedRange`in t?p=!t.anchorDate&&t.highlightedRange!=null&&r.compare(t.highlightedRange.start)>=0&&r.compare(t.highlightedRange.end)<=0:Array.isArray(t.value)?p=t.value.some(e=>_(e,r)):t.value&&(p=_(t.value,r))),p&&!i&&(f=!0),r=Sc(r,y);let m=(0,R.useMemo)(()=>r.toDate(t.timeZone),[r,t.timeZone]),h=x(r,t.timeZone),g=(0,R.useMemo)(()=>{let e=``;return`highlightedRange`in t&&t.value&&!t.anchorDate&&(_(r,t.value.start)||_(r,t.value.end))&&(e=o+`, `),e+=c.format(m),h?e=s.format(f?`todayDateSelected`:`todayDate`,{date:e}):f&&(e=s.format(`dateSelected`,{date:e})),t.minValue&&_(r,t.minValue)?e+=`, `+s.format(`minimumDate`):t.maxValue&&_(r,t.maxValue)&&(e+=`, `+s.format(`maximumDate`)),e},[c,m,s,f,h,r,t,o]),v=``;`anchorDate`in t&&l&&!t.isReadOnly&&d&&(v=t.anchorDate?s.format(`finishRangeSelectionPrompt`):s.format(`startRangeSelectionPrompt`));let b=Wc(v),S=(0,R.useRef)(!1),C=(0,R.useRef)(!1),w=(0,R.useRef)(void 0),{pressProps:T,isPressed:E}=Bo({shouldCancelOnPointerExit:`anchorDate`in t&&!!t.anchorDate,preventFocusOnPress:!0,isDisabled:!d||t.isReadOnly,onPressStart(e){if(t.isReadOnly){t.setFocusedDate(r),t.setFocused(!0);return}if(`highlightedRange`in t&&!t.anchorDate&&(e.pointerType===`mouse`||e.pointerType===`touch`)){if(t.highlightedRange&&!p){if(_(r,t.highlightedRange.start)){t.setAnchorDate(t.highlightedRange.end),t.setFocusedDate(r),t.setFocused(!0),t.setDragging(!0),C.current=!0;return}if(_(r,t.highlightedRange.end)){t.setAnchorDate(t.highlightedRange.start),t.setFocusedDate(r),t.setFocused(!0),t.setDragging(!0),C.current=!0;return}}let n=()=>{t.setDragging(!0),w.current=void 0,t.selectDate(r),t.setFocusedDate(r),t.setFocused(!0),S.current=!0};e.pointerType===`touch`?w.current=setTimeout(n,200):n()}},onPressEnd(){C.current=!1,S.current=!1,clearTimeout(w.current),w.current=void 0},onPress(){!(`anchorDate`in t)&&!t.isReadOnly&&(t.selectDate(r),t.setFocusedDate(r),t.setFocused(!0))},onPressUp(e){t.isReadOnly||(`anchorDate`in t&&w.current&&(t.selectDate(r),t.setFocusedDate(r),t.setFocused(!0)),`anchorDate`in t&&(C.current?t.setAnchorDate(r):t.anchorDate&&!S.current?(t.selectDate(r),t.setFocusedDate(r),t.setFocused(!0)):e.pointerType===`keyboard`&&!t.anchorDate?(t.selectDate(r),t.focusNearestAvailableDate(r)):e.pointerType===`virtual`&&(t.selectDate(r),t.setFocusedDate(r),t.setFocused(!0))))}}),D;i||(D=_(r,t.focusedDate)?0:-1),(0,R.useEffect)(()=>{l&&n.current&&(pr(n.current),gi()!==`pointer`&&J()===n.current&&Vc(n.current,{containingElement:Lc(n.current)}))},[l,n]);let O=Cc({day:`numeric`,timeZone:t.timeZone,calendar:r.calendar.identifier}),k=(0,R.useMemo)(()=>O.formatToParts(m).find(e=>e.type===`day`).value,[O,m]);return{cellProps:{role:`gridcell`,"aria-disabled":!d||void 0,"aria-selected":f||void 0,"aria-invalid":p||void 0},buttonProps:V(T,{onFocus(){i||(t.setFocusedDate(r),t.setFocused(!0))},tabIndex:D,role:`button`,"aria-disabled":!d||void 0,"aria-label":g,"aria-invalid":p||void 0,"aria-describedby":[p?a:void 0,b[`aria-describedby`]].filter(Boolean).join(` `)||void 0,onPointerEnter(e){`highlightDate`in t&&(e.pointerType!==`touch`||t.isDragging)&&d&&t.highlightDate(r)},onPointerDown(e){let t=Y(e);t instanceof HTMLElement&&`releasePointerCapture`in t&&(`hasPointerCapture`in t?t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId):t.releasePointerCapture(e.pointerId))},onContextMenu(e){e.preventDefault()}}),isPressed:E,isFocused:l,isSelected:f,isDisabled:i,isUnavailable:u,isOutsideVisibleRange:r.compare(t.visibleRange.start)<0||r.compare(t.visibleRange.end)>0,isInvalid:p,formattedDate:k}}function qc(e,t,n){return t!=null&&e.compare(t)<0||n!=null&&e.compare(n)>0}function Jc(e,t,n,r,i){let a={};for(let e in t)a[e]=Math.floor(t[e]/2),a[e]>0&&t[e]%2==0&&a[e]--;return Zc(e,Yc(e,t,n).subtract(a),t,n,r,i)}function Yc(e,t,n,r,i){let a=e;return t.years?a=N(e):t.months?a=M(e):(t.weeks||t.days&&t.days>7)&&(a=te(e,n)),Zc(e,a,t,n,r,i)}function Xc(e,t,n,r,i){let a={...t};return a.days?a.days--:a.weeks?a.weeks--:a.months?a.months--:a.years&&a.years--,Zc(e,Yc(e,t,n).subtract(a),t,n,r,i)}function Zc(e,t,n,r,i,a){if(i&&e.compare(i)>=0){let e=oe(t,Yc(ve(i),n,r));e&&(t=e)}if(a&&e.compare(a)<=0){let e=ae(t,Xc(ve(a),n,r));e&&(t=e)}return t}function Qc(e,t,n){if(t){let n=oe(e,ve(t));n&&(e=n)}if(n){let t=ae(e,ve(n));t&&(e=t)}return e}function $c(e,t,n){if(!n)return e;for(;e.compare(t)>=0&&n(e);)e=e.subtract({days:1});return e.compare(t)>=0?e:null}function el(e,t){return e===t||e.days===t.days&&e.weeks===t.weeks&&e.months===t.months&&e.years===t.years}function tl(e){let t=(0,R.useMemo)(()=>new pn(e.locale),[e.locale]),n=(0,R.useMemo)(()=>t.resolvedOptions(),[t]),{locale:r,createCalendar:i,visibleDuration:a={months:1},minValue:o,maxValue:s,selectionAlignment:c,isDateUnavailable:l,pageBehavior:u=`visible`,selectionMode:d=`single`,firstDayOfWeek:f,weeksInMonth:p}=e,m=(0,R.useMemo)(()=>i(n.calendar),[i,n.calendar]),[g,v]=ta(e.value,e.defaultValue??null,e.onChange),y=(0,R.useMemo)(()=>Array.isArray(g)?g.map(e=>L(ve(e),m)):g?L(ve(g),m):null,[g,m]),x=(0,R.useMemo)(()=>{let e=Array.isArray(g)?g[0]:g;return e&&`timeZone`in e?e.timeZone:n.timeZone},[g,n.timeZone]),[S,w]=ta((0,R.useMemo)(()=>e.focusedValue?Qc(L(ve(e.focusedValue),m),o,s):void 0,[e.focusedValue,m,o,s]),(0,R.useMemo)(()=>e.defaultFocusedValue?Qc(L(ve(e.defaultFocusedValue),m),o,s):Qc(y?Array.isArray(y)?y[0]:y:L(T(x),m),o,s),[e.defaultFocusedValue,y,x,m,o,s]),e.onFocusChange),E=()=>{switch(c){case`start`:return Yc(S,a,r,o,s);case`end`:return Xc(S,a,r,o,s);default:return Jc(S,a,r,o,s)}},[D,O]=(0,R.useState)(E),[k,A]=(0,R.useState)(e.autoFocus||!1),[j,N]=(0,R.useState)(a);el(a,j)||(N(a),O(E()));let P=(0,R.useMemo)(()=>{let e={...a};return e.days?e.days--:e.days=-1,D.add(e)},[D,a]),[F,re]=(0,R.useState)(m);if(!b(m,F)){let e=L(S,m);O(Jc(e,a,r,o,s)),w(e),re(m)}qc(S,o,s)?w(Qc(S,o,s)):S.compare(D)<0?O(Xc(S,a,r,o,s)):S.compare(P)>0&&O(Yc(S,a,r,o,s));function I(e){e=Qc(e,o,s),w(e)}function oe(e){let t=Qc(e,o,s),n=$c(t,o??ae(t,D),l);if(!n)return null;let r=Array.isArray(g)?g[0]:g,i=L(n,r?.calendar||new h);return r&&`hour`in r?r.set(i):i}function se(t){if(!e.isDisabled&&!e.isReadOnly){if(t===null){v(d===`multiple`?[]:null);return}if(Array.isArray(t))v(t.map(oe).filter(Boolean));else{let e=oe(t);e&&v(e)}}}let ce=(0,R.useMemo)(()=>y?Array.isArray(y)?y.some(e=>l?.(e)||qc(e,o,s)):l?.(y)||qc(y,o,s):!1,[y,l,o,s]),le=e.isInvalid||e.validationState===`invalid`||ce,ue=le?`invalid`:null,de=(0,R.useMemo)(()=>u===`visible`?a:nl(a),[u,a]);return{isDisabled:e.isDisabled??!1,isReadOnly:e.isReadOnly??!1,value:y,setValue:se,selectionMode:d,visibleDuration:a,visibleRange:{start:D,end:P},minValue:o,maxValue:s,focusedDate:S,timeZone:x,validationState:ue,isValueInvalid:le,setFocusedDate(e){I(e)},focusNextDay(){I(S.add({days:1}))},focusPreviousDay(){I(S.subtract({days:1}))},focusNextRow(){a.days?this.focusNextPage():(a.weeks||a.months||a.years)&&I(S.add({weeks:1}))},focusPreviousRow(){a.days?this.focusPreviousPage():(a.weeks||a.months||a.years)&&I(S.subtract({weeks:1}))},focusNextPage(){let e=D.add(de);w(Qc(S.add(de),o,s)),O(Yc(Zc(S,e,de,r,o,s),de,r))},focusPreviousPage(){let e=D.subtract(de);w(Qc(S.subtract(de),o,s)),O(Yc(Zc(S,e,de,r,o,s),de,r))},focusSectionStart(){a.days?I(D):a.weeks?I(te(S,r)):(a.months||a.years)&&I(M(S))},focusSectionEnd(){a.days?I(P):a.weeks?I(ne(S,r)):(a.months||a.years)&&I(ee(S))},focusNextSection(e){if(!e&&!a.days){I(S.add(nl(a)));return}a.days?this.focusNextPage():a.weeks?I(S.add({months:1})):(a.months||a.years)&&I(S.add({years:1}))},focusPreviousSection(e){if(!e&&!a.days){I(S.subtract(nl(a)));return}a.days?this.focusPreviousPage():a.weeks?I(S.subtract({months:1})):(a.months||a.years)&&I(S.subtract({years:1}))},selectFocusedDate(){l&&l(S)||this.selectDate(S)},selectDate(t){if(!(e.isDisabled||e.isReadOnly)){if(d===`multiple`&&t!=null){let e=oe(t);if(!e)return;let n=[];Array.isArray(g)?n=g:g!=null&&(n=[g]);let r=n.findIndex(t=>_(t,e)),i=r>=0?n.slice(0,r).concat(n.slice(r+1)):[...n,e];v(i)}else se(t)}},isFocused:k,setFocused:A,isInvalid(e){return qc(e,o,s)},isSelected(e){return!y||this.isCellDisabled(e)||this.isCellUnavailable(e)?!1:Array.isArray(y)?y.some(t=>_(t,e)):_(e,y)},isCellFocused(e){return k&&S&&_(e,S)},isCellDisabled(t){return e.isDisabled||t.compare(D)<0||t.compare(P)>0||this.isInvalid(t)},isCellUnavailable(t){return e.isDateUnavailable?e.isDateUnavailable(t):!1},isPreviousVisibleRangeInvalid(){let e=D.subtract({days:1});return _(e,D)||this.isInvalid(e)},isNextVisibleRangeInvalid(){let e=P.add({days:1});return _(e,P)||this.isInvalid(e)},getDatesInWeek(e,t=D){let n=t.add({weeks:e}),i=[],o=a.days&&a.days<7?a.days:7;if(o===7){n=te(n,r,f);let e=C(n,r,f);for(let t=0;t<e;t++)i.push(null)}for(;i.length<o;){i.push(n);let e=n.add({days:1});if(_(n,e))break;n=e}for(;i.length<o;)i.push(null);return i},getWeeksInMonth(e=D){let t=p||ie(e,r,f);return(a.weeks||a.days)&&(t=a.weeks??0,a.days&&(t+=Math.ceil(a.days/7))),t}}}function nl(e){let t={...e};for(let n in e)t[n]=1;return t}let rl={border:0,clip:`rect(0 0 0 0)`,clipPath:`inset(50%)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`absolute`,width:`1px`,whiteSpace:`nowrap`};function il(e={}){let{style:t,isFocusable:n}=e,[r,i]=(0,R.useState)(!1),{focusWithinProps:a}=Jo({isDisabled:!n,onFocusWithinChange:e=>i(e)}),o=(0,R.useMemo)(()=>r?t:t?{...rl,...t}:rl,[r]);return{visuallyHiddenProps:{...a,style:o}}}function al(e){let{children:t,elementType:n=`div`,isFocusable:r,style:i,...a}=e,{visuallyHiddenProps:o}=il(e);return R.default.createElement(n,V(a,o),t)}let ol=(0,R.createContext)(null),sl=(0,R.createContext)(null),cl=(0,R.createContext)(null),ll=(0,R.createContext)(null),ul=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,ol);let{locale:n}=Z(),r=tl({...e,locale:n,createCalendar:e.createCalendar||dn}),{calendarProps:i,prevButtonProps:a,nextButtonProps:o,errorMessageProps:s,title:c}=Pc(e,r),l=H({...e,values:{state:r,isDisabled:e.isDisabled||!1,isInvalid:r.isValueInvalid},defaultClassName:`react-aria-Calendar`}),u=Q(e,{global:!0});return R.default.createElement(W.div,{...V(u,l,i),ref:t,slot:e.slot||void 0,"data-disabled":e.isDisabled||void 0,"data-invalid":r.isValueInvalid||void 0},R.default.createElement(Jn,{values:[[Ns,{slots:{previous:a,next:o}}],[Ls,{"aria-hidden":!0,level:2,children:c}],[cl,r],[ol,e],[zs,{slots:{errorMessage:s}}]]},R.default.createElement(al,null,R.default.createElement(`h2`,null,i[`aria-label`])),l.children,R.default.createElement(al,null,R.default.createElement(`button`,{"aria-label":o[`aria-label`],disabled:o.isDisabled,onClick:()=>r.focusNextPage(),tabIndex:-1}))))}),dl=(0,R.createContext)(null),fl=(0,R.forwardRef)(function(e,t){let n=(0,R.useContext)(cl),r=(0,R.useContext)(ll),i=Yn(ol),a=Yn(sl),o=n??r,s=o.visibleRange.start;e.offset&&(s=s.add(e.offset));let c=i?.firstDayOfWeek??a?.firstDayOfWeek,{gridProps:l,headerProps:u,weekDays:d,weeksInMonth:f}=Fc({startDate:s,endDate:ee(s),weekdayStyle:e.weekdayStyle,firstDayOfWeek:c},o),p=Q(e,{global:!0});return R.default.createElement(dl.Provider,{value:{headerProps:u,weekDays:d,startDate:s,weeksInMonth:f}},R.default.createElement(W.table,{render:e.render,...V(p,l),ref:t,style:e.style,cellPadding:0,className:e.className??`react-aria-CalendarGrid`},typeof e.children==`function`?R.default.createElement(R.default.Fragment,null,R.default.createElement(ml,null,e=>R.default.createElement(gl,null,e)),R.default.createElement(vl,null,e.children)):e.children))});function pl(e,t){let{children:n,style:r,className:i}=e,{headerProps:a,weekDays:o}=(0,R.useContext)(dl),s=Q(e,{global:!0});return R.default.createElement(W.thead,{render:e.render,...V(s,a),ref:t,style:r,className:i??`react-aria-CalendarGridHeader`},R.default.createElement(`tr`,null,o.map((e,t)=>R.default.cloneElement(n(e),{key:t}))))}let ml=(0,R.forwardRef)(pl);function hl(e,t){let{children:n,style:r,className:i}=e,a=Q(e,{global:!0});return R.default.createElement(W.th,{render:e.render,...a,ref:t,style:r,className:i||`react-aria-CalendarHeaderCell`},n)}let gl=(0,R.forwardRef)(hl);function _l(e,t){let{children:n,style:r,className:i}=e,a=(0,R.useContext)(cl),o=(0,R.useContext)(ll),s=a??o,{startDate:c,weeksInMonth:l}=(0,R.useContext)(dl),u=Q(e,{global:!0});return R.default.createElement(W.tbody,{render:e.render,...u,ref:t,style:r,className:i??`react-aria-CalendarGridBody`},[...Array(l).keys()].map(e=>R.default.createElement(`tr`,{key:e},s.getDatesInWeek(e,c).map((e,t)=>e?R.default.cloneElement(n(e),{key:t}):R.default.createElement(`td`,{key:t})))))}let vl=(0,R.forwardRef)(_l),yl=(0,R.forwardRef)(function({date:e,...t},n){let r=(0,R.useContext)(cl),i=(0,R.useContext)(ll),a=r??i,{startDate:o}=(0,R.useContext)(dl)??{startDate:a.visibleRange.start},s=a.visibleDuration.days||a.visibleDuration.weeks?!1:!v(o,e),c=x(e,a.timeZone),l=(0,R.useRef)(null),{cellProps:u,buttonProps:d,...f}=Kc({date:e,isOutsideMonth:s},a,l),{hoverProps:p,isHovered:m}=ts({...t,isDisabled:f.isDisabled||f.isUnavailable}),{focusProps:h,isFocusVisible:g}=Yo();g&&=f.isFocused;let y=!1,b=!1;`highlightedRange`in a&&a.highlightedRange&&(y=_(e,a.highlightedRange.start),b=_(e,a.highlightedRange.end));let S=H({...t,defaultChildren:f.formattedDate,defaultClassName:`react-aria-CalendarCell`,values:{date:e,isHovered:m,isOutsideMonth:s,isFocusVisible:g,isSelectionStart:y,isSelectionEnd:b,isToday:c,...f}}),C={"data-focused":f.isFocused||void 0,"data-hovered":m||void 0,"data-pressed":f.isPressed||void 0,"data-unavailable":f.isUnavailable||void 0,"data-disabled":f.isDisabled||void 0,"data-focus-visible":g||void 0,"data-outside-visible-range":f.isOutsideVisibleRange||void 0,"data-outside-month":s||void 0,"data-selected":f.isSelected||void 0,"data-selection-start":y||void 0,"data-selection-end":b||void 0,"data-invalid":f.isInvalid||void 0,"data-today":c||void 0},w=Q(t,{global:!0});return R.default.createElement(`td`,{...u,ref:n},R.default.createElement(W.div,{...V(w,d,h,p,C,S),ref:l}))}),bl=(0,R.createContext)(null),xl={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},Sl={...xl,customError:!0,valid:!1},Cl={isInvalid:!1,validationDetails:xl,validationErrors:[]},wl=(0,R.createContext)({}),Tl=`__reactAriaFormValidationState`;function El(e){if(e.__reactAriaFormValidationState){let{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}=e[Tl];return{realtimeValidation:t,displayValidation:n,updateValidation:r,resetValidation:i,commitValidation:a}}return Dl(e)}function Dl(e){let{isInvalid:t,validationState:n,name:r,value:i,builtinValidation:a,validate:o,validationBehavior:s=`aria`}=e;n&&(t||=n===`invalid`);let c=t===void 0?null:{isInvalid:t,validationErrors:[],validationDetails:Sl},l=(0,R.useMemo)(()=>!o||i==null?null:Al(kl(o,i)),[o,i]);a?.validationDetails.valid&&(a=void 0);let u=(0,R.useContext)(wl),d=(0,R.useMemo)(()=>r?Array.isArray(r)?r.flatMap(e=>Ol(u[e])):Ol(u[r]):[],[u,r]),[f,p]=(0,R.useState)(u),[m,h]=(0,R.useState)(!1);u!==f&&(p(u),h(!1));let g=(0,R.useMemo)(()=>Al(m?[]:d),[m,d]),_=(0,R.useRef)(Cl),[v,y]=(0,R.useState)(Cl),b=(0,R.useRef)(Cl),x=()=>{if(!S)return;C(!1);let e=l||a||_.current;jl(e,b.current)||(b.current=e,y(e))},[S,C]=(0,R.useState)(!1);return(0,R.useEffect)(x),{realtimeValidation:c||g||l||a||Cl,displayValidation:s===`native`?c||g||v:c||g||l||a||v,updateValidation(e){s===`aria`&&!jl(v,e)?y(e):_.current=e},resetValidation(){let e=Cl;jl(e,b.current)||(b.current=e,y(e)),s===`native`&&C(!1),h(!0)},commitValidation(){s===`native`&&C(!0),h(!0)}}}function Ol(e){return e?Array.isArray(e)?e:[e]:[]}function kl(e,t){if(typeof e==`function`){let n=e(t);if(n&&typeof n!=`boolean`)return Ol(n)}return[]}function Al(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:Sl}:null}function jl(e,t){return e===t||!!e&&!!t&&e.isInvalid===t.isInvalid&&e.validationErrors.length===t.validationErrors.length&&e.validationErrors.every((e,n)=>e===t.validationErrors[n])&&Object.entries(e.validationDetails).every(([e,n])=>t.validationDetails[e]===n)}let Ml=(0,R.createContext)(null),Nl=new WeakMap;function Pl(e){let{description:t,errorMessage:n,isInvalid:r,validationState:i}=e,{labelProps:a,fieldProps:o}=is(e),s=Vn([!!t,!!n,r,i]),c=Vn([!!t,!!n,r,i]);return o=V(o,{"aria-describedby":[s,c,e[`aria-describedby`]].filter(Boolean).join(` `)||void 0}),{labelProps:a,fieldProps:o,descriptionProps:{id:s},errorMessageProps:{id:c}}}function Fl(e,t,n){let r=X(e=>{n&&!e.defaultPrevented&&n(t)});(0,R.useEffect)(()=>{let t=e?.current?.form;return t?.addEventListener(`reset`,r),()=>{t?.removeEventListener(`reset`,r)}},[e])}function Il(e,t,n){let{validationBehavior:r,focus:i}=e;z(()=>{if(r===`native`&&n?.current&&`setCustomValidity`in n.current&&!n.current.disabled){let e=t.realtimeValidation.isInvalid?t.realtimeValidation.validationErrors.join(` `)||`Invalid value.`:``;n.current.setCustomValidity(e),n.current.hasAttribute(`title`)||(n.current.title=``),t.realtimeValidation.isInvalid||t.updateValidation(Rl(n.current))}});let a=(0,R.useRef)(!1),o=X(()=>{a.current||t.resetValidation()}),s=X(e=>{t.displayValidation.isInvalid||t.commitValidation();let r=n?.current?.form;!e.defaultPrevented&&n&&r&&zl(r)===n.current&&(i?i():n.current?.focus(),_i(`keyboard`)),e.preventDefault()}),c=X(()=>{t.commitValidation()});(0,R.useEffect)(()=>{let e=n?.current;if(!e)return;let t=e.form,r=t?.reset;return t&&(t.reset=()=>{a.current=!window.event||window.event.type===`message`&&Y(window.event)instanceof MessagePort,r?.call(t),a.current=!1}),e.addEventListener(`invalid`,s),e.addEventListener(`change`,c),t?.addEventListener(`reset`,o),()=>{e.removeEventListener(`invalid`,s),e.removeEventListener(`change`,c),t?.removeEventListener(`reset`,o),t&&(t.reset=r)}},[n,r])}function Ll(e){let t=e.validity;return{badInput:t.badInput,customError:t.customError,patternMismatch:t.patternMismatch,rangeOverflow:t.rangeOverflow,rangeUnderflow:t.rangeUnderflow,stepMismatch:t.stepMismatch,tooLong:t.tooLong,tooShort:t.tooShort,typeMismatch:t.typeMismatch,valueMissing:t.valueMissing,valid:t.valid}}function Rl(e){return{isInvalid:!e.validity.valid,validationDetails:Ll(e),validationErrors:e.validationMessage?[e.validationMessage]:[]}}function zl(e){for(let t=0;t<e.elements.length;t++){let n=e.elements[t];if(n.validity?.valid===!1)return n}return null}function Bl(e=!0){let[t,n]=(0,R.useState)(e),r=(0,R.useRef)(!1),i=(0,R.useCallback)(e=>{r.current=!0,n(!!e)},[]);return z(()=>{r.current||n(!1)},[]),[i,t]}function Vl(e=!0){let t=B(),[n,r]=Bl(e);return{id:r?t:void 0,ref:n}}function Hl(e,t,n){let{isDisabled:r=!1,isReadOnly:i=!1,value:a,name:o,form:s,children:c,isRequired:l,validationBehavior:u=`aria`,"aria-label":d,"aria-labelledby":f,"aria-describedby":p,onPressStart:m,onPressEnd:h,onPressChange:g,onPress:_,onPressUp:v,onClick:y}=e,b=El({...e,value:t.isSelected}),{isInvalid:x,validationErrors:S,validationDetails:C}=b.displayValidation;Il(e,b,n);let w=e=>{e.stopPropagation(),t.setSelected(Y(e).checked)},{pressProps:T,isPressed:E}=Bo({onPressStart:m,onPressEnd:h,onPressChange:g,onPress:_,onPressUp:v,onClick:y,isDisabled:r}),[D,O]=(0,R.useState)(!1),{pressProps:k}=Bo({onPressStart(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}m?.(e),g?.(!0),O(!0)},onPressEnd(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}h?.(e),g?.(!1),O(!1)},onPressUp(e){if(e.pointerType===`keyboard`||e.pointerType===`virtual`){e.continuePropagation();return}v?.(e)},onClick:y,onPress(r){if(r.pointerType===`keyboard`||r.pointerType===`virtual`){r.continuePropagation();return}_?.(r),t.toggle(),n.current?.focus();let{[Tl]:i}=e,{commitValidation:a}=i||b;a()},isDisabled:r||i}),{focusableProps:A}=Ba(e,n),j=V(T,A),M=Q(e,{labelable:!0});Fl(n,t.defaultSelected,t.setSelected);let ee=Vl(),N=Vl();return{labelProps:V(k,{onClick:e=>e.preventDefault()}),inputProps:V(M,{checked:t.isSelected,"aria-required":l&&u===`aria`||void 0,required:l&&u===`native`,"aria-invalid":x||e.validationState===`invalid`||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-controls":e[`aria-controls`],"aria-readonly":i||void 0,"aria-describedby":[ee.id,N.id,p].filter(Boolean).join(` `)||void 0,onChange:w,disabled:r,...a==null?{}:{value:a},name:o,form:s,type:`checkbox`,...j}),descriptionProps:ee,errorMessageProps:N,isSelected:t.isSelected,isPressed:E||D,isDisabled:r,isReadOnly:i,isInvalid:x||e.validationState===`invalid`,validationErrors:S,validationDetails:C}}function Ul(e,t,n){let{labelProps:r,inputProps:i,descriptionProps:a,errorMessageProps:o,isSelected:s,isPressed:c,isDisabled:l,isReadOnly:u,isInvalid:d,validationErrors:f,validationDetails:p}=Hl(e,t,n),{isIndeterminate:m}=e;return(0,R.useEffect)(()=>{n.current&&(n.current.indeterminate=!!m)}),{labelProps:V(r,(0,R.useMemo)(()=>({onMouseDown:e=>e.preventDefault()}),[])),inputProps:i,descriptionProps:a,errorMessageProps:o,isSelected:s,isPressed:c,isDisabled:l,isReadOnly:u,isInvalid:d,validationErrors:f,validationDetails:p}}function Wl(e={}){let{isReadOnly:t}=e,[n,r]=ta(e.isSelected,e.defaultSelected||!1,e.onChange),[i]=(0,R.useState)(n);function a(e){t||r(e)}function o(){t||r(!n)}return{isSelected:n,defaultSelected:e.defaultSelected??i,setSelected:a,toggle:o}}function Gl(e,t,n){let r=Wl({isReadOnly:e.isReadOnly||t.isReadOnly,isSelected:t.isSelected(e.value),defaultSelected:t.defaultValue.includes(e.value),onChange(n){n?t.addValue(e.value):t.removeValue(e.value),e.onChange&&e.onChange(n)}}),{name:i,form:a,descriptionId:o,errorMessageId:s,validationBehavior:c}=Nl.get(t);c=e.validationBehavior??c;let{realtimeValidation:l}=El({...e,value:r.isSelected,name:void 0,validationBehavior:`aria`}),u=(0,R.useRef)(Cl),d=()=>{t.setInvalid(e.value,l.isInvalid?l:u.current)};(0,R.useEffect)(d);let f=t.realtimeValidation.isInvalid?t.realtimeValidation:l,p=c===`native`?t.displayValidation:f,m=Ul({...e,isReadOnly:e.isReadOnly||t.isReadOnly,isDisabled:e.isDisabled||t.isDisabled,name:e.name||i,form:e.form||a,isRequired:e.isRequired??t.isRequired,validationBehavior:c,[Tl]:{realtimeValidation:f,displayValidation:p,resetValidation:t.resetValidation,commitValidation:t.commitValidation,updateValidation(e){u.current=e,d()}}},r,n);return{...m,inputProps:{...m.inputProps,"aria-describedby":[m.inputProps[`aria-describedby`],t.isInvalid?s:null,o].filter(Boolean).join(` `)||void 0}}}let Kl=(0,R.createContext)(null),ql=(0,R.createContext)(null),Jl=(0,R.createContext)(null);function Yl(e,t){let{validationBehavior:n}=Yn(Ml)||{},r=e.validationBehavior??n??`native`,i=(0,R.useContext)(ql),a=Kn((0,R.useMemo)(()=>Hn(t,e.inputRef===void 0?null:e.inputRef),[t,e.inputRef])),o={...Zn(e),children:typeof e.children==`function`||e.children,value:e.value,validationBehavior:r};return[i?Gl(o,i,a):Ul(o,Wl(e),a),a]}let Xl=(0,R.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=U(r,t,Kl);let[i,a]=Yl(e,n);return R.default.createElement(Jl.Provider,{value:{...i,inputRef:a,defaultClassName:`react-aria-Checkbox`,isIndeterminate:e.isIndeterminate,isRequired:e.isRequired}},R.default.createElement(Zl,{...e,ref:t}))}),Zl=(0,R.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isReadOnly:o,isPressed:s,isInvalid:c,inputRef:l,defaultClassName:u,isIndeterminate:d,isRequired:f}=(0,R.useContext)(Jl),{isFocused:p,isFocusVisible:m,focusProps:h}=Yo(),g=a||o,{hoverProps:_,isHovered:v}=ts({...e,isDisabled:g}),y=H({...e,defaultClassName:u,values:{isSelected:i,isIndeterminate:d||!1,isPressed:s,isHovered:v,isFocused:p,isFocusVisible:m,isDisabled:a,isReadOnly:o,isInvalid:c,isRequired:f||!1}}),b=Q(e,{global:!0});return delete b.id,delete b.onClick,R.default.createElement(W.label,{...V(b,n,_,y),ref:t,slot:e.slot||void 0,"data-selected":i||void 0,"data-indeterminate":d||void 0,"data-pressed":s||void 0,"data-hovered":v||void 0,"data-focused":p||void 0,"data-focus-visible":m||void 0,"data-disabled":a||void 0,"data-readonly":o||void 0,"data-invalid":c||void 0,"data-required":f||void 0},R.default.createElement(al,{elementType:`span`},R.default.createElement(`input`,{...V(r,h),ref:l})),y.children)});function Ql(e){let{onMoveStart:t,onMove:n,onMoveEnd:r}=e,i=(0,R.useRef)({didMove:!1,lastPosition:null,id:null}),{addGlobalListener:a,removeGlobalListener:o}=Po(),s=X((0,R.useCallback)((e,r,a,o)=>{(a!==0||o!==0)&&(i.current.didMove||(i.current.didMove=!0,t?.({type:`movestart`,pointerType:r,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey})),n?.({type:`move`,pointerType:r,deltaX:a,deltaY:o,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey}))},[t,n,i])),c=X((0,R.useCallback)((e,t)=>{ko(),i.current.didMove&&r?.({type:`moveend`,pointerType:t,shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey})},[r,i]));return{moveProps:(0,R.useMemo)(()=>{let e={},t=()=>{Oo(),i.current.didMove=!1};{let n=e=>{if(e.pointerId===i.current.id){let t=e.pointerType||`mouse`;s(e,t,e.pageX-(i.current.lastPosition?.pageX??0),e.pageY-(i.current.lastPosition?.pageY??0)),i.current.lastPosition={pageX:e.pageX,pageY:e.pageY}}},r=e=>{if(e.pointerId===i.current.id){let t=e.pointerType||`mouse`;c(e,t),i.current.id=null;let a=K(Y(e));o(a,`pointermove`,n,!1),o(a,`pointerup`,r,!1),o(a,`pointercancel`,r,!1)}};e.onPointerDown=e=>{if(e.button===0&&i.current.id==null){t(),e.stopPropagation(),e.preventDefault(),i.current.lastPosition={pageX:e.pageX,pageY:e.pageY},i.current.id=e.pointerId;let o=K(Y(e));a(o,`pointermove`,n,!1),a(o,`pointerup`,r,!1),a(o,`pointercancel`,r,!1)}}}let n=(e,n,r)=>{t(),s(e,`keyboard`,n,r),c(e,`keyboard`)};return e.onKeyDown=e=>{switch(e.key){case`Left`:case`ArrowLeft`:e.preventDefault(),e.stopPropagation(),n(e,-1,0);break;case`Right`:case`ArrowRight`:e.preventDefault(),e.stopPropagation(),n(e,1,0);break;case`Up`:case`ArrowUp`:e.preventDefault(),e.stopPropagation(),n(e,0,-1);break;case`Down`:case`ArrowDown`:e.preventDefault(),e.stopPropagation(),n(e,0,1)}},e},[a,o,i])}}let $l=(0,R.createContext)({}),eu=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,$l);let{isDisabled:n,isInvalid:r,isReadOnly:i,onHoverStart:a,onHoverChange:o,onHoverEnd:s,...c}=e;n??=!!e[`aria-disabled`]&&e[`aria-disabled`]!==`false`,r??=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`;let{hoverProps:l,isHovered:u}=ts({onHoverStart:a,onHoverChange:o,onHoverEnd:s,isDisabled:n}),{isFocused:d,isFocusVisible:f,focusProps:p}=Yo({within:!0}),m=H({...e,values:{isHovered:u,isFocusWithin:d,isFocusVisible:f,isDisabled:n,isInvalid:r},defaultClassName:`react-aria-Group`});return R.default.createElement(W.div,{...V(c,p,l),...m,ref:t,role:e.role??`group`,slot:e.slot??void 0,"data-focus-within":d||void 0,"data-hovered":u||void 0,"data-focus-visible":f||void 0,"data-disabled":n||void 0,"data-invalid":r||void 0,"data-readonly":i||void 0},m.children)}),tu=(0,R.createContext)({}),nu=e=>{let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,...i}=e;return i},ru=Wa(function(e,t){[e,t]=U(e,t,tu);let{hoverProps:n,isHovered:r}=ts({...e,isDisabled:e.disabled}),{isFocused:i,isFocusVisible:a,focusProps:o}=Yo({isTextInput:!0,autoFocus:e.autoFocus}),s=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`,c=H({...e,values:{isHovered:r,isFocused:i,isFocusVisible:a,isDisabled:e.disabled||!1,isInvalid:s},defaultClassName:`react-aria-Input`});return R.default.createElement(W.input,{...V(nu(e),o,n),...c,ref:t,"data-focused":i||void 0,"data-disabled":e.disabled||void 0,"data-hovered":r||void 0,"data-focus-visible":a||void 0,"data-invalid":s||void 0})});function iu(e,t){let{inputElementType:n=`input`,isDisabled:r=!1,isRequired:i=!1,isReadOnly:a=!1,type:o=`text`,validationBehavior:s=`aria`}=e,[c,l]=ta(e.value,e.defaultValue||``,e.onChange),{focusableProps:u}=Ba(e,t),d=El({...e,value:c}),{isInvalid:f,validationErrors:p,validationDetails:m}=d.displayValidation,{labelProps:h,fieldProps:g,descriptionProps:_,errorMessageProps:v}=Pl({...e,isInvalid:f,errorMessage:e.errorMessage||p}),y=Q(e,{labelable:!0}),b={type:o,pattern:e.pattern},[x]=(0,R.useState)(c);return Fl(t,e.defaultValue??x,l),Il(e,d,t),{labelProps:h,inputProps:V(y,n===`input`?b:void 0,{disabled:r,readOnly:a,required:i&&s===`native`,"aria-required":i&&s===`aria`||void 0,"aria-invalid":f||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-activedescendant":e[`aria-activedescendant`],"aria-autocomplete":e[`aria-autocomplete`],"aria-haspopup":e[`aria-haspopup`],"aria-controls":e[`aria-controls`],value:c,onChange:e=>l(Y(e).value),autoComplete:e.autoComplete,autoCapitalize:e.autoCapitalize,maxLength:e.maxLength,minLength:e.minLength,name:e.name,form:e.form,placeholder:e.placeholder,inputMode:e.inputMode,autoCorrect:e.autoCorrect,spellCheck:e.spellCheck,[parseInt(R.default.version,10)>=17?`enterKeyHint`:`enterkeyhint`]:e.enterKeyHint,onCopy:e.onCopy,onCut:e.onCut,onPaste:e.onPaste,onCompositionEnd:e.onCompositionEnd,onCompositionStart:e.onCompositionStart,onCompositionUpdate:e.onCompositionUpdate,onSelect:e.onSelect,onBeforeInput:e.onBeforeInput,onInput:e.onInput,...u,...g}),descriptionProps:_,errorMessageProps:v,isInvalid:f,validationErrors:p,validationDetails:m}}function au(){return typeof window<`u`&&window.InputEvent&&typeof InputEvent.prototype.getTargetRanges==`function`}function ou(e,t,n){let r=X(e=>{let r=n.current;if(!r)return;let i=null;switch(e.inputType){case`historyUndo`:case`historyRedo`:return;case`insertLineBreak`:return;case`deleteContent`:case`deleteByCut`:case`deleteByDrag`:i=r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteContentForward`:i=r.selectionEnd===r.selectionStart?r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd+1):r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteContentBackward`:i=r.selectionEnd===r.selectionStart?r.value.slice(0,r.selectionStart-1)+r.value.slice(r.selectionStart):r.value.slice(0,r.selectionStart)+r.value.slice(r.selectionEnd);break;case`deleteSoftLineBackward`:case`deleteHardLineBackward`:i=r.value.slice(r.selectionStart);break;default:e.data!=null&&(i=r.value.slice(0,r.selectionStart)+e.data+r.value.slice(r.selectionEnd))}(i==null||!t.validate(i))&&e.preventDefault()});(0,R.useEffect)(()=>{if(!au()||!n.current)return;let e=n.current;return e.addEventListener(`beforeinput`,r,!1),()=>{e.removeEventListener(`beforeinput`,r,!1)}},[n]);let i=au()?null:e=>{let n=Y(e).value.slice(0,Y(e).selectionStart)+e.data+Y(e).value.slice(Y(e).selectionEnd);t.validate(n)||e.preventDefault()},{labelProps:a,inputProps:o,descriptionProps:s,errorMessageProps:c,...l}=iu(e,n),u=(0,R.useRef)(null);return{inputProps:V(o,{onBeforeInput:i,onCompositionStart(){let{value:e,selectionStart:t,selectionEnd:r}=n.current;u.current={value:e,selectionStart:t,selectionEnd:r}},onCompositionEnd(){if(n.current&&!t.validate(n.current.value)){let{value:e,selectionStart:r,selectionEnd:i}=u.current;n.current.value=e,n.current.setSelectionRange(r,i),t.setInputValue(e)}}}),labelProps:a,descriptionProps:s,errorMessageProps:c,...l}}function su(e,t){let{onScroll:n,isDisabled:r}=e,i=(0,R.useCallback)(e=>{e.ctrlKey||(e.preventDefault(),e.stopPropagation(),n&&n({deltaX:e.deltaX,deltaY:e.deltaY}))},[n]);Ti(t,`wheel`,r?void 0:i)}var cu={};cu={Empty:`فارغ`};var lu={};lu={Empty:`Изпразни`};var uu={};uu={Empty:`Prázdné`};var du={};du={Empty:`Tom`};var fu={};fu={Empty:`Leer`};var pu={};pu={Empty:`Άδειο`};var mu={};mu={Empty:`Empty`};var hu={};hu={Empty:`Vacío`};var gu={};gu={Empty:`Tühjenda`};var _u={};_u={Empty:`Tyhjä`};var vu={};vu={Empty:`Vide`};var yu={};yu={Empty:`ריק`};var bu={};bu={Empty:`Prazno`};var xu={};xu={Empty:`Üres`};var Su={};Su={Empty:`Vuoto`};var Cu={};Cu={Empty:`空`};var wu={};wu={Empty:`비어 있음`};var Tu={};Tu={Empty:`Tuščias`};var Eu={};Eu={Empty:`Tukšs`};var Du={};Du={Empty:`Tom`};var Ou={};Ou={Empty:`Leeg`};var ku={};ku={Empty:`Pusty`};var Au={};Au={Empty:`Vazio`};var ju={};ju={Empty:`Vazio`};var Mu={};Mu={Empty:`Gol`};var Nu={};Nu={Empty:`Не заполнено`};var Pu={};Pu={Empty:`Prázdne`};var Fu={};Fu={Empty:`Prazen`};var Iu={};Iu={Empty:`Prazno`};var Lu={};Lu={Empty:`Tomt`};var Ru={};Ru={Empty:`Boş`};var zu={};zu={Empty:`Пусто`};var Bu={};Bu={Empty:`空`};var Vu={};Vu={Empty:`空白`};var Hu={};Hu={"ar-AE":cu,"bg-BG":lu,"cs-CZ":uu,"da-DK":du,"de-DE":fu,"el-GR":pu,"en-US":mu,"es-ES":hu,"et-EE":gu,"fi-FI":_u,"fr-FR":vu,"he-IL":yu,"hr-HR":bu,"hu-HU":xu,"it-IT":Su,"ja-JP":Cu,"ko-KR":wu,"lt-LT":Tu,"lv-LV":Eu,"nb-NO":Du,"nl-NL":Ou,"pl-PL":ku,"pt-BR":Au,"pt-PT":ju,"ro-RO":Mu,"ru-RU":Nu,"sk-SK":Pu,"sl-SI":Fu,"sr-SP":Iu,"sv-SE":Lu,"tr-TR":Ru,"uk-UA":zu,"zh-CN":Bu,"zh-TW":Vu};function Uu(e){return e&&e.__esModule?e.default:e}let Wu=()=>{};function Gu(e){let t=(0,R.useRef)(void 0),{value:n,textValue:r,minValue:i,maxValue:a,isDisabled:o,isReadOnly:s,isRequired:c,onIncrement:l,onIncrementPage:u,onDecrement:d,onDecrementPage:f,onDecrementToMin:p,onIncrementToMax:m}=e,h=$i(Uu(Hu),`@react-aria/spinbutton`),g=(0,R.useRef)(!1),_=(0,R.useCallback)(()=>{clearTimeout(t.current),g.current=!1},[]),v=X(()=>{_()});(0,R.useEffect)(()=>()=>v(),[]);let{keyboardProps:y}=Fa({isDisabled:o||s,shortcuts:{PageUp:()=>{if(u){u();return}if(l){l();return}return!1},ArrowUp:()=>{if(l){l();return}return!1},PageDown:()=>{if(f){f();return}if(d){d();return}return!1},ArrowDown:()=>{if(d){d();return}return!1},Home:()=>{if(p){p();return}return!1},End:()=>{if(m){m();return}return!1}},allowRepeats:!0}),b=(0,R.useRef)(!1),x=()=>{b.current=!0},S=()=>{b.current=!1},C=r===``?h.format(`Empty`):(r||`${n}`).replace(`-`,`−`);(0,R.useEffect)(()=>{b.current&&(As(`assertive`),ks(C,`assertive`))},[C]);let w=(0,R.useCallback)(()=>{_()},[_]),T=X(l??Wu),E=X(d??Wu),D=X(()=>{(a===void 0||isNaN(a)||n===void 0||isNaN(n)||n<a)&&(T(),O(60))}),O=X(e=>{v(),g.current=!0,t.current=window.setTimeout(D,e)}),k=X(()=>{(i===void 0||isNaN(i)||n===void 0||isNaN(n)||n>i)&&(E(),A(60))}),A=X(e=>{v(),g.current=!0,t.current=window.setTimeout(k,e)}),j=e=>{e.preventDefault()},{addGlobalListener:M,removeAllGlobalListeners:ee}=Po(),N=(0,R.useRef)(!1),[te,ne]=(0,R.useState)(null);(0,R.useEffect)(()=>{te===`touch`?O(600):te?O(400):te||v()},[te]);let[P,F]=(0,R.useState)(null);return(0,R.useEffect)(()=>{P===`touch`?A(600):P?A(400):P||v()},[P]),{spinButtonProps:{role:`spinbutton`,"aria-valuenow":n!==void 0&&!isNaN(n)?n:void 0,"aria-valuetext":C,"aria-valuemin":i,"aria-valuemax":a,"aria-disabled":o||void 0,"aria-readonly":s||void 0,"aria-required":c||void 0,...y,onFocus:x,onBlur:S},incrementButtonProps:{onPressStart:e=>{_(),e.pointerType===`touch`?(M(window,`pointercancel`,w,{capture:!0}),N.current=!1,ne(`touch`)):(l?.(),ne(`mouse`)),M(window,`contextmenu`,j)},onPressUp:e=>{_(),e.pointerType===`touch`&&(N.current=!0),ee(),ne(null)},onPressEnd:e=>{_(),e.pointerType===`touch`&&!g.current&&N.current&&l?.(),N.current=!1,ne(null)},onFocus:x,onBlur:S},decrementButtonProps:{onPressStart:e=>{_(),e.pointerType===`touch`?(M(window,`pointercancel`,w,{capture:!0}),N.current=!1,F(`touch`)):(d?.(),F(`mouse`))},onPressUp:e=>{_(),e.pointerType===`touch`&&(N.current=!0),ee(),F(null)},onPressEnd:e=>{_(),e.pointerType===`touch`&&!g.current&&N.current&&d?.(),N.current=!1,F(null)},onFocus:x,onBlur:S}}}var Ku={};Ku={decrease:e=>`\u{62E}\u{641}\u{636} ${e.fieldLabel}`,increase:e=>`\u{632}\u{64A}\u{627}\u{62F}\u{629} ${e.fieldLabel}`,numberField:`حقل رقمي`};var qu={};qu={decrease:e=>`\u{41D}\u{430}\u{43C}\u{430}\u{43B}\u{44F}\u{432}\u{430}\u{43D}\u{435} ${e.fieldLabel}`,increase:e=>`\u{423}\u{441}\u{438}\u{43B}\u{432}\u{430}\u{43D}\u{435} ${e.fieldLabel}`,numberField:`Номер на полето`};var Ju={};Ju={decrease:e=>`Sn\xed\u{17E}it ${e.fieldLabel}`,increase:e=>`Zv\xfd\u{161}it ${e.fieldLabel}`,numberField:`Číselné pole`};var Yu={};Yu={decrease:e=>`Reducer ${e.fieldLabel}`,increase:e=>`\xd8g ${e.fieldLabel}`,numberField:`Talfelt`};var Xu={};Xu={decrease:e=>`${e.fieldLabel} verringern`,increase:e=>`${e.fieldLabel} erh\xf6hen`,numberField:`Nummernfeld`};var Zu={};Zu={decrease:e=>`\u{39C}\u{3B5}\u{3AF}\u{3C9}\u{3C3}\u{3B7} ${e.fieldLabel}`,increase:e=>`\u{391}\u{3CD}\u{3BE}\u{3B7}\u{3C3}\u{3B7} ${e.fieldLabel}`,numberField:`Πεδίο αριθμού`};var Qu={};Qu={decrease:e=>`Decrease ${e.fieldLabel}`,increase:e=>`Increase ${e.fieldLabel}`,numberField:`Number field`};var $u={};$u={decrease:e=>`Reducir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo de número`};var ed={};ed={decrease:e=>`V\xe4henda ${e.fieldLabel}`,increase:e=>`Suurenda ${e.fieldLabel}`,numberField:`Numbri väli`};var td={};td={decrease:e=>`V\xe4henn\xe4 ${e.fieldLabel}`,increase:e=>`Lis\xe4\xe4 ${e.fieldLabel}`,numberField:`Numerokenttä`};var nd={};nd={decrease:e=>`Diminuer ${e.fieldLabel}`,increase:e=>`Augmenter ${e.fieldLabel}`,numberField:`Champ de nombre`};var rd={};rd={decrease:e=>`\u{5D4}\u{5E7}\u{5D8}\u{5DF} ${e.fieldLabel}`,increase:e=>`\u{5D4}\u{5D2}\u{5D3}\u{5DC} ${e.fieldLabel}`,numberField:`שדה מספר`};var id={};id={decrease:e=>`Smanji ${e.fieldLabel}`,increase:e=>`Pove\u{107}aj ${e.fieldLabel}`,numberField:`Polje broja`};var ad={};ad={decrease:e=>`${e.fieldLabel} cs\xf6kkent\xe9se`,increase:e=>`${e.fieldLabel} n\xf6vel\xe9se`,numberField:`Számmező`};var od={};od={decrease:e=>`Riduci ${e.fieldLabel}`,increase:e=>`Aumenta ${e.fieldLabel}`,numberField:`Campo numero`};var sd={};sd={decrease:e=>`${e.fieldLabel}\u{3092}\u{7E2E}\u{5C0F}`,increase:e=>`${e.fieldLabel}\u{3092}\u{62E1}\u{5927}`,numberField:`数値フィールド`};var cd={};cd={decrease:e=>`${e.fieldLabel} \u{AC10}\u{C18C}`,increase:e=>`${e.fieldLabel} \u{C99D}\u{AC00}`,numberField:`번호 필드`};var ld={};ld={decrease:e=>`Suma\u{17E}inti ${e.fieldLabel}`,increase:e=>`Padidinti ${e.fieldLabel}`,numberField:`Numerio laukas`};var ud={};ud={decrease:e=>`Samazin\u{101}\u{161}ana ${e.fieldLabel}`,increase:e=>`Palielin\u{101}\u{161}ana ${e.fieldLabel}`,numberField:`Skaitļu lauks`};var dd={};dd={decrease:e=>`Reduser ${e.fieldLabel}`,increase:e=>`\xd8k ${e.fieldLabel}`,numberField:`Tallfelt`};var fd={};fd={decrease:e=>`${e.fieldLabel} verlagen`,increase:e=>`${e.fieldLabel} verhogen`,numberField:`Getalveld`};var pd={};pd={decrease:e=>`Zmniejsz ${e.fieldLabel}`,increase:e=>`Zwi\u{119}ksz ${e.fieldLabel}`,numberField:`Pole numeru`};var md={};md={decrease:e=>`Diminuir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo de número`};var hd={};hd={decrease:e=>`Diminuir ${e.fieldLabel}`,increase:e=>`Aumentar ${e.fieldLabel}`,numberField:`Campo numérico`};var gd={};gd={decrease:e=>`Sc\u{103}dere ${e.fieldLabel}`,increase:e=>`Cre\u{219}tere ${e.fieldLabel}`,numberField:`Câmp numeric`};var _d={};_d={decrease:e=>`\u{423}\u{43C}\u{435}\u{43D}\u{44C}\u{448}\u{435}\u{43D}\u{438}\u{435} ${e.fieldLabel}`,increase:e=>`\u{423}\u{432}\u{435}\u{43B}\u{438}\u{447}\u{435}\u{43D}\u{438}\u{435} ${e.fieldLabel}`,numberField:`Числовое поле`};var vd={};vd={decrease:e=>`Zn\xed\u{17E}i\u{165} ${e.fieldLabel}`,increase:e=>`Zv\xfd\u{161}i\u{165} ${e.fieldLabel}`,numberField:`Číselné pole`};var yd={};yd={decrease:e=>`Upadati ${e.fieldLabel}`,increase:e=>`Pove\u{10D}ajte ${e.fieldLabel}`,numberField:`Številčno polje`};var bd={};bd={decrease:e=>`Smanji ${e.fieldLabel}`,increase:e=>`Pove\u{107}aj ${e.fieldLabel}`,numberField:`Polje broja`};var xd={};xd={decrease:e=>`Minska ${e.fieldLabel}`,increase:e=>`\xd6ka ${e.fieldLabel}`,numberField:`Nummerfält`};var Sd={};Sd={decrease:e=>`${e.fieldLabel} azalt`,increase:e=>`${e.fieldLabel} artt\u{131}r`,numberField:`Sayı alanı`};var Cd={};Cd={decrease:e=>`\u{417}\u{43C}\u{435}\u{43D}\u{448}\u{438}\u{442}\u{438} ${e.fieldLabel}`,increase:e=>`\u{417}\u{431}\u{456}\u{43B}\u{44C}\u{448}\u{438}\u{442}\u{438} ${e.fieldLabel}`,numberField:`Поле номера`};var wd={};wd={decrease:e=>`\u{964D}\u{4F4E} ${e.fieldLabel}`,increase:e=>`\u{63D0}\u{9AD8} ${e.fieldLabel}`,numberField:`数字字段`};var Td={};Td={decrease:e=>`\u{7E2E}\u{5C0F} ${e.fieldLabel}`,increase:e=>`\u{653E}\u{5927} ${e.fieldLabel}`,numberField:`數字欄位`};var Ed={};Ed={"ar-AE":Ku,"bg-BG":qu,"cs-CZ":Ju,"da-DK":Yu,"de-DE":Xu,"el-GR":Zu,"en-US":Qu,"es-ES":$u,"et-EE":ed,"fi-FI":td,"fr-FR":nd,"he-IL":rd,"hr-HR":id,"hu-HU":ad,"it-IT":od,"ja-JP":sd,"ko-KR":cd,"lt-LT":ld,"lv-LV":ud,"nb-NO":dd,"nl-NL":fd,"pl-PL":pd,"pt-BR":md,"pt-PT":hd,"ro-RO":gd,"ru-RU":_d,"sk-SK":vd,"sl-SI":yd,"sr-SP":bd,"sv-SE":xd,"tr-TR":Sd,"uk-UA":Cd,"zh-CN":wd,"zh-TW":Td};function Dd(e){return e&&e.__esModule?e.default:e}function Od(e,t,n){let{id:r,decrementAriaLabel:i,incrementAriaLabel:a,isDisabled:o,isReadOnly:s,isRequired:c,minValue:l,maxValue:u,autoFocus:d,label:f,formatOptions:p,onBlur:m=()=>{},onFocus:h,onFocusChange:g,onKeyDown:_,onKeyUp:v,description:y,errorMessage:b,isWheelDisabled:x,...S}=e,{increment:C,incrementToMax:w,decrement:T,decrementToMin:E,numberValue:D,inputValue:O,commit:k,commitValidation:A}=t,j=$i(Dd(Ed),`@react-aria/numberfield`),M=(0,R.useCallback)(()=>{let e=n.current?.value??``;(0,Ya.flushSync)(()=>{k()}),n.current?.value!==e&&ks(n.current?.value??``,`assertive`)},[k,n]),ee=B(r),{focusProps:N}=xa({onBlur(){M()}}),te=Ss(p),ne=(0,R.useMemo)(()=>te.resolvedOptions(),[te]),P=Ss({...p,currencySign:void 0}),{spinButtonProps:F,incrementButtonProps:re,decrementButtonProps:I}=Gu({isDisabled:o,isReadOnly:s,isRequired:c,maxValue:u,minValue:l,onIncrement:C,onIncrementToMax:w,onDecrement:T,onDecrementToMin:E,value:D,textValue:(0,R.useMemo)(()=>isNaN(D)?``:P.format(D),[P,D])}),[ie,ae]=(0,R.useState)(!1),{focusWithinProps:oe}=Jo({isDisabled:o,onFocusWithinChange:ae});su({onScroll:(0,R.useCallback)(e=>{Math.abs(e.deltaY)<=Math.abs(e.deltaX)||(e.deltaY>0?C():e.deltaY<0&&T())},[T,C]),isDisabled:x||o||s||!ie},n);let se=(ne.maximumFractionDigits??0)>0,ce=t.minValue===void 0||isNaN(t.minValue)||t.minValue<0,le=`numeric`;Lr()?ce?le=`text`:se&&(le=`decimal`):Ur()&&(ce?le=`numeric`:se&&(le=`decimal`));let ue=e=>{t.validate(e)&&t.setInputValue(e)},de=t=>{e.onPaste?.(t);let n=Y(t);n&&(n.selectionEnd??-1)-(n.selectionStart??0)===n.value.length&&(t.preventDefault(),k(t.clipboardData?.getData?.(`text/plain`)?.trim()??``))},fe=Q(e),{keyboardProps:pe}=Fa({isDisabled:o||s,shortcuts:{Enter:()=>((0,Ya.flushSync)(()=>{k()}),A(),{shouldPreventDefault:!1})},onKeyDown:_,onKeyUp:v}),{isInvalid:me,validationErrors:he,validationDetails:ge}=t.displayValidation,{labelProps:_e,inputProps:ve,descriptionProps:ye,errorMessageProps:L}=ou({...S,...fe,name:void 0,form:void 0,label:f,autoFocus:d,isDisabled:o,isReadOnly:s,isRequired:c,validate:void 0,[Tl]:t,value:O,defaultValue:`!`,autoComplete:`off`,"aria-label":e[`aria-label`]||void 0,"aria-labelledby":e[`aria-labelledby`]||void 0,id:ee,type:`text`,inputMode:le,onChange:ue,onBlur:m,onFocus:h,onFocusChange:g,onPaste:de,description:y,errorMessage:b},t,n),be=V(pe,ve);Fl(n,t.defaultNumberValue,t.setNumberValue),Ad(t,e.validationBehavior,e.commitBehavior,n,t.minValue,t.maxValue,e.step,t.numberValue);let xe=V(F,N,be,{role:null,"aria-roledescription":zr()?null:j.format(`numberField`),"aria-valuemax":null,"aria-valuemin":null,"aria-valuenow":null,"aria-valuetext":null,autoCorrect:`off`,spellCheck:`false`});e.validationBehavior===`native`&&(xe[`aria-required`]=void 0);let Se=e=>{J()!==n.current&&(e.pointerType===`mouse`?n.current?.focus():e.target.focus())},Ce=e[`aria-label`]||(typeof e.label==`string`?e.label:``),we;Ce||(we=e.label==null?e[`aria-labelledby`]:_e.id);let Te=B(),Ee=B(),De=V(re,{"aria-label":a||j.format(`increase`,{fieldLabel:Ce}).trim(),id:we&&!a?Te:null,"aria-labelledby":we&&!a?`${Te} ${we}`:null,"aria-controls":ee,excludeFromTabOrder:!0,preventFocusOnPress:!0,allowFocusWhenDisabled:!0,isDisabled:!t.canIncrement,onPressStart:Se}),Oe=V(I,{"aria-label":i||j.format(`decrease`,{fieldLabel:Ce}).trim(),id:we&&!i?Ee:null,"aria-labelledby":we&&!i?`${Ee} ${we}`:null,"aria-controls":ee,excludeFromTabOrder:!0,preventFocusOnPress:!0,allowFocusWhenDisabled:!0,isDisabled:!t.canDecrement,onPressStart:Se});return{groupProps:{...oe,role:`group`,"aria-disabled":o,"aria-invalid":me?`true`:void 0},labelProps:_e,inputProps:xe,incrementButtonProps:De,decrementButtonProps:Oe,errorMessageProps:L,descriptionProps:ye,isInvalid:me,validationErrors:he,validationDetails:ge}}let kd=null;function Ad(e,t,n,r,i,a,o,s){z(()=>{let c=r.current;if(n!==`validate`||e.realtimeValidation.isInvalid||!c||c.disabled||(!kd&&typeof document<`u`&&(kd=document.createElement(`input`),kd.type=`number`),!kd))return;kd.min=i!=null&&!isNaN(i)?String(i):``,kd.max=a!=null&&!isNaN(a)?String(a):``,kd.step=o!=null&&!isNaN(o)?String(o):``,kd.value=s!=null&&!isNaN(s)?String(s):``;let l=c.validity.valid&&kd.validity.valid,u=c.validationMessage||kd.validationMessage,d={isInvalid:!l,validationErrors:u?[u]:[],validationDetails:{badInput:c.validity.badInput,customError:c.validity.customError,patternMismatch:c.validity.patternMismatch,rangeOverflow:kd.validity.rangeOverflow,rangeUnderflow:kd.validity.rangeUnderflow,stepMismatch:kd.validity.stepMismatch,tooLong:c.validity.tooLong,tooShort:c.validity.tooShort,typeMismatch:c.validity.typeMismatch,valueMissing:c.validity.valueMissing,valid:l}};e.updateValidation(d),t===`native`&&!kd.validity.valid&&c.setCustomValidity(kd.validationMessage)})}function jd(e){let{minValue:t,maxValue:n,step:r,formatOptions:i,value:a,defaultValue:o=NaN,onChange:s,locale:c,isDisabled:l,isReadOnly:u,commitBehavior:d=`snap`}=e;a===null&&(a=NaN);let f=(0,R.useCallback)(e=>r===void 0||isNaN(r)?Cs(e,t,n):Ts(e,t,n,r),[r,t,n]);a!==void 0&&!isNaN(a)&&d===`snap`&&(a=f(a)),!isNaN(o)&&d===`snap`&&(o=f(o));let[p,m]=ta(a,isNaN(o)?NaN:o,s),[h]=(0,R.useState)(p),[g,_]=(0,R.useState)(()=>isNaN(p)?``:new ss(c,i).format(p)),v=(0,R.useMemo)(()=>new fs(c,i),[c,i]),y=(0,R.useMemo)(()=>v.getNumberingSystem(g),[v,g]),b=(0,R.useMemo)(()=>new ss(c,{...i,numberingSystem:y}),[c,i,y]),x=(0,R.useMemo)(()=>b.resolvedOptions(),[b]),S=(0,R.useCallback)(e=>isNaN(e)||e===null?``:b.format(e),[b]),C=El({...e,value:p}),w=r!==void 0&&!isNaN(r)?r:1;x.style===`percent`&&(r===void 0||isNaN(r))&&(w=.01);let[T,E]=(0,R.useState)(p),[D,O]=(0,R.useState)(c),[k,A]=(0,R.useState)(i);(!Object.is(p,T)||c!==D||!Md(i,k))&&(_(S(p)),E(p),O(c),A(i));let j=(0,R.useMemo)(()=>v.parse(g),[v,g]),M=e=>{let t=e===void 0?g:e,n=j;if(e!==void 0&&(n=v.parse(t)),!t.length){m(NaN),_(a===void 0?``:S(p));return}if(isNaN(n)){_(S(p));return}let r=d===`snap`?f(n):n;r=v.parse(S(r));let i=r!==p;m(r),_(S(a===void 0?r:p)),i&&C.commitValidation()},ee=(e,r=0)=>{let i=j;if(isNaN(i))return Ts(isNaN(r)?0:r,t,n,w);{let r=Ts(i,t,n,w);return e===`+`&&r>i||e===`-`&&r<i?r:Ts(Nd(e,i,w),t,n,w)}},N=()=>{let e=ee(`+`,t);e===p&&_(S(e)),m(e),C.commitValidation()},te=()=>{let e=ee(`-`,n);e===p&&_(S(e)),m(e),C.commitValidation()},ne=()=>{n!=null&&(m(Ts(n,t,n,w)),C.commitValidation())},P=()=>{t!=null&&(m(t),C.commitValidation())},F=(0,R.useMemo)(()=>!l&&!u&&(isNaN(j)||n===void 0||isNaN(n)||Ts(j,t,n,w)>j||Nd(`+`,j,w)<=n),[l,u,t,n,w,j]),re=(0,R.useMemo)(()=>!l&&!u&&(isNaN(j)||t===void 0||isNaN(t)||Ts(j,t,n,w)<j||Nd(`-`,j,w)>=t),[l,u,t,n,w,j]),I=e=>v.isValidPartialNumber(e,t,n);return{...C,validate:I,increment:N,incrementToMax:ne,decrement:te,decrementToMin:P,canIncrement:F,canDecrement:re,minValue:t,maxValue:n,numberValue:j,defaultNumberValue:isNaN(o)?h:o,setNumberValue:m,setInputValue:_,inputValue:g,commit:M}}function Md(e,t){if(e===t)return!0;if(!e||!t)return!1;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(t[r]!==e[r])return!1;return!0}function Nd(e,t,n){let r=e===`+`?t+n:t-n;if(t%1!=0||n%1!=0){let i=t.toString().split(`.`),a=n.toString().split(`.`),o=i[1]&&i[1].length||0,s=a[1]&&a[1].length||0,c=10**Math.max(o,s);t=Math.round(t*c),n=Math.round(n*c),r=e===`+`?t+n:t-n,r/=c}return r}let Pd=new WeakMap;function Fd(e,t){let n=Pd.get(e);if(!n)throw Error(`Unknown slider state`);return`${n.id}-${t}`}function Id(e,t,n){let{labelProps:r,fieldProps:i}=is(e),a=e.orientation===`vertical`;Pd.set(t,{id:r.id??i.id,"aria-describedby":e[`aria-describedby`],"aria-details":e[`aria-details`]});let{direction:o}=Z(),{addGlobalListener:s,removeGlobalListener:c}=Po(),l=(0,R.useRef)(null),u=o===`rtl`,d=(0,R.useRef)(null),{moveProps:f}=Ql({onMoveStart(){d.current=null},onMove({deltaX:e,deltaY:r}){if(!n.current)return;let{height:i,width:o}=n.current.getBoundingClientRect(),s=a?i:o;d.current==null&&l.current!=null&&(d.current=t.getThumbPercent(l.current)*s);let c=a?r:e;if((a||u)&&(c=-c),d.current+=c,l.current!=null&&n.current){let e=Cs(d.current/s,0,1);t.setThumbPercent(l.current,e)}},onMoveEnd(){l.current!=null&&(t.setThumbDragging(l.current,!1),l.current=null)}}),p=(0,R.useRef)(void 0),m=(r,i,c,u)=>{if(n.current&&!e.isDisabled&&t.values.every((e,n)=>!t.isThumbDragging(n))){let{height:e,width:d,top:f,left:m}=n.current.getBoundingClientRect(),g=a?e:d,_=((a?u:c)-(a?f:m))/g;(o===`rtl`||a)&&(_=1-_);let v=t.getPercentValue(_),y,b=t.values.findIndex(e=>v-e<0);if(b===0)y=b;else if(b===-1)y=t.values.length-1;else{let e=t.values[b-1],n=t.values[b];y=Math.abs(e-v)<Math.abs(n-v)?b-1:b}y>=0&&t.isThumbEditable(y)?(r.preventDefault(),l.current=y,t.setFocusedThumb(y),p.current=i,t.setThumbDragging(l.current,!0),t.setThumbValue(y,v),s(window,`mouseup`,h,!1),s(window,`touchend`,h,!1),s(window,`pointerup`,h,!1)):l.current=null}},h=e=>{(e.pointerId??e.changedTouches?.[0].identifier)===p.current&&(l.current!=null&&(t.setThumbDragging(l.current,!1),l.current=null),c(window,`mouseup`,h,!1),c(window,`touchend`,h,!1),c(window,`pointerup`,h,!1))};return`htmlFor`in r&&r.htmlFor&&(delete r.htmlFor,r.onClick=()=>{document.getElementById(Fd(t,0))?.focus(),_i(`keyboard`)}),{labelProps:r,groupProps:{role:`group`,...i},trackProps:V({onMouseDown(e){e.button!==0||e.altKey||e.ctrlKey||e.metaKey||m(e,void 0,e.clientX,e.clientY)},onPointerDown(e){e.pointerType===`mouse`&&(e.button!==0||e.altKey||e.ctrlKey||e.metaKey)||m(e,e.pointerId,e.clientX,e.clientY)},onTouchStart(e){m(e,e.changedTouches[0].identifier,e.changedTouches[0].clientX,e.changedTouches[0].clientY)},style:{position:`relative`,touchAction:`none`}},f),outputProps:{htmlFor:t.values.map((e,n)=>Fd(t,n)).join(` `),"aria-live":`off`}}}function Ld(e,t){let{index:n=0,isRequired:r,validationState:i,isInvalid:a,trackRef:o,inputRef:s,orientation:c=t.orientation,name:l,form:u}=e,d=e.isDisabled||t.isDisabled,f=c===`vertical`,{direction:p}=Z(),{addGlobalListener:m,removeGlobalListener:h}=Po(),g=Pd.get(t),{labelProps:_,fieldProps:v}=is({...e,id:Fd(t,n),"aria-labelledby":`${g.id} ${e[`aria-labelledby`]??``}`.trim()}),y=t.values[n],b=(0,R.useCallback)(()=>{s.current&&pr(s.current)},[s]),x=t.focusedThumb===n;(0,R.useEffect)(()=>{x&&b()},[x,b]);let S=p===`rtl`,C=(0,R.useRef)(null),w=e=>{t.setThumbDragging(n,!0),e(),t.setThumbDragging(n,!1)},{keyboardProps:T}=Fa({shortcuts:{PageUp:()=>w(()=>{t.incrementThumb(n,t.pageSize)}),PageDown:()=>w(()=>{t.decrementThumb(n,t.pageSize)}),Home:()=>w(()=>{t.setThumbValue(n,t.getThumbMinValue(n))}),End:()=>w(()=>{t.setThumbValue(n,t.getThumbMaxValue(n))})},allowRepeats:!0}),{moveProps:E}=Ql({onMoveStart(){C.current=null,t.setThumbDragging(n,!0)},onMove({deltaX:e,deltaY:r,pointerType:i,shiftKey:a}){let{getThumbPercent:s,setThumbPercent:c,decrementThumb:l,incrementThumb:u,step:d,pageSize:p}=t;if(!o.current)return;let{width:m,height:h}=o.current.getBoundingClientRect(),g=f?h:m;if(C.current??=s(n)*g,i===`keyboard`)e>0&&S||e<0&&!S||r>0?l(n,a?p:d):u(n,a?p:d);else{let t=f?r:e;(f||S)&&(t=-t),C.current+=t,c(n,Cs(C.current/g,0,1))}},onMoveEnd(){t.setThumbDragging(n,!1)}});t.setThumbEditable(n,!d);let{focusableProps:D}=Ba(V(e,{onFocus:()=>t.setFocusedThumb(n),onBlur:()=>t.setFocusedThumb(void 0)}),s),O=(0,R.useRef)(void 0),k=e=>{b(),O.current=e,t.setThumbDragging(n,!0),m(window,`mouseup`,A,!1),m(window,`touchend`,A,!1),m(window,`pointerup`,A,!1)},A=e=>{(e.pointerId??e.changedTouches?.[0].identifier)===O.current&&(b(),t.setThumbDragging(n,!1),h(window,`mouseup`,A,!1),h(window,`touchend`,A,!1),h(window,`pointerup`,A,!1))},j=t.getThumbPercent(n);(f||p===`rtl`)&&(j=1-j);let M=d?{}:V(T,E,{onMouseDown:e=>{e.button!==0||e.altKey||e.ctrlKey||e.metaKey||k()},onPointerDown:e=>{e.button!==0||e.altKey||e.ctrlKey||e.metaKey||k(e.pointerId)},onTouchStart:e=>{k(e.changedTouches[0].identifier)}});return Fl(s,t.defaultValues[n],e=>{t.setThumbValue(n,e)}),{inputProps:V(D,v,{type:`range`,tabIndex:d?void 0:0,min:t.getThumbMinValue(n),max:t.getThumbMaxValue(n),step:t.step,value:y,name:l,form:u,disabled:d,"aria-orientation":c,"aria-valuetext":t.getThumbValueLabel(n),"aria-required":r||void 0,"aria-invalid":a||i===`invalid`||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-describedby":[g[`aria-describedby`],e[`aria-describedby`]].filter(Boolean).join(` `),"aria-details":[g[`aria-details`],e[`aria-details`]].filter(Boolean).join(` `),onChange:e=>{t.setThumbValue(n,parseFloat(Y(e).value))}}),thumbProps:{...M,style:{position:`absolute`,[f?`top`:`left`]:`${j*100}%`,transform:`translate(-50%, -50%)`,touchAction:`none`}},labelProps:_,isDragging:t.isThumbDragging(n),isDisabled:d,isFocused:x}}function Rd(e){let{isDisabled:t=!1,minValue:n=0,maxValue:r=100,numberFormatter:i,step:a=1,orientation:o=`horizontal`}=e,s=(0,R.useMemo)(()=>{let e=(r-n)/10;return e=Ts(e,0,e+a,a),Math.max(e,a)},[a,r,n]),c=(0,R.useCallback)(e=>e?.map((t,i)=>Ts(t,i===0?n:e[i-1],i===e.length-1?r:e[i+1],a)),[n,r,a]),l=(0,R.useMemo)(()=>c(Bd(e.value)),[e.value,c]),u=(0,R.useMemo)(()=>c(Bd(e.defaultValue)??[n]),[e.defaultValue,n,c]),d=Vd(e.value,e.defaultValue,e.onChange),f=Vd(e.value,e.defaultValue,e.onChangeEnd),[p,m]=ta(l,u,d),[h]=(0,R.useState)(p),[g,_]=(0,R.useState)(Array(p.length).fill(!1)),v=(0,R.useRef)(Array(p.length).fill(!0)),[y,b]=(0,R.useState)(void 0),x=(0,R.useRef)(p),S=(0,R.useRef)(g),C=e=>{x.current=e,m(e)},w=e=>{S.current=e,_(e)};function T(e){return(e-n)/(r-n)}function E(e){return e===0?n:p[e-1]}function D(e){return e===p.length-1?r:p[e+1]}function O(e){return v.current[e]}function k(e,t){v.current[e]=t}function A(e,n){if(t||!O(e))return;let r=E(e),i=D(e);n=Ts(n,r,i,a);let o=zd(x.current,e,n);C(o)}function j(e,n){if(t||!O(e))return;n&&(x.current=p);let r=S.current[e];S.current=zd(S.current,e,n),w(S.current),f&&r&&!S.current.some(Boolean)&&f(x.current)}let M=(0,R.useRef)(null);function ee(e=p){switch(typeof e==`number`&&(e=[e]),e.length){case 0:return``;case 1:return i.format(e[0]);case 2:return i.formatRange(e[0],e[1]);default:{let t=e.map(e=>i.format(e)),n=M.current;return(!n||n.resolvedOptions().locale!==i.resolvedOptions().locale)&&(n=M.current=new Intl.ListFormat(i.resolvedOptions().locale,{type:`unit`})),n.format(t)}}}function N(e,t){A(e,ne(t))}function te(e){return Math.round((e-n)/a)*a+n}function ne(e){return Cs(te(e*(r-n)+n),n,r)}function P(e,t=1){let i=Math.max(t,a);A(e,Ts(p[e]+i,n,r,a))}function F(e,t=1){let i=Math.max(t,a);A(e,Ts(p[e]-i,n,r,a))}return{values:p,defaultValues:e.defaultValue===void 0?h:u,getThumbValue:e=>p[e],setThumbValue:A,setThumbPercent:N,isThumbDragging:e=>g[e],setThumbDragging:j,focusedThumb:y,setFocusedThumb:b,getThumbPercent:e=>T(p[e]),getValuePercent:T,getThumbValueLabel:e=>ee(p[e]),getFormattedValue:ee,getThumbMinValue:E,getThumbMaxValue:D,getPercentValue:ne,isThumbEditable:O,setThumbEditable:k,incrementThumb:P,decrementThumb:F,step:a,pageSize:s,orientation:o,isDisabled:t}}function zd(e,t,n){return e[t]===n?e:[...e.slice(0,t),n,...e.slice(t+1)]}function Bd(e){if(e!=null)return Array.isArray(e)?e:[e]}function Vd(e,t,n){return r=>{typeof e==`number`||typeof t==`number`?n?.(r[0]):n?.(r)}}let Hd=(0,R.createContext)(null),Ud=(0,R.createContext)(null),Wd=(0,R.createContext)(null),Gd=(0,R.createContext)(null),Kd=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Hd);let n=(0,R.useRef)(null),r=Ss(e.formatOptions),i=Rd({...e,numberFormatter:r}),[a,o]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{groupProps:s,trackProps:c,labelProps:l,outputProps:u}=Id({...e,label:o},i,n),d=H({...e,values:{orientation:i.orientation,isDisabled:i.isDisabled,state:i},defaultClassName:`react-aria-Slider`}),f=Q(e,{global:!0});return delete f.id,R.default.createElement(Jn,{values:[[Ud,i],[Wd,{...c,ref:n}],[Gd,u],[ns,{...l,ref:a}]]},R.default.createElement(W.div,{...V(f,d,s),ref:t,slot:e.slot||void 0,"data-orientation":i.orientation,"data-disabled":i.isDisabled||void 0}))}),qd=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Wd);let n=(0,R.useContext)(Ud),{onHoverStart:r,onHoverEnd:i,onHoverChange:a,...o}=e,{hoverProps:s,isHovered:c}=ts({onHoverStart:r,onHoverEnd:i,onHoverChange:a}),l=H({...e,defaultClassName:`react-aria-SliderTrack`,values:{orientation:n.orientation,isDisabled:n.isDisabled,isHovered:c,state:n}});return R.default.createElement(W.div,{...V(o,s),...l,ref:t,"data-hovered":c||void 0,"data-orientation":n.orientation||void 0,"data-disabled":n.isDisabled||void 0})}),Jd=(0,R.forwardRef)(function(e,t){let{inputRef:n=null}=e,r=(0,R.useContext)(Ud),{ref:i}=Yn(Wd),{index:a=0}=e,o=(0,R.useRef)(null),s=n||o,[c,l]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{thumbProps:u,inputProps:d,labelProps:f,isDragging:p,isFocused:m,isDisabled:h}=Ld({...e,index:a,trackRef:i,inputRef:s,label:l},r),{focusProps:g,isFocusVisible:_}=Yo(),{hoverProps:v,isHovered:y}=ts(e),b=H({...e,defaultClassName:`react-aria-SliderThumb`,values:{state:r,isHovered:y,isDragging:p,isFocused:m,isFocusVisible:_,isDisabled:h}}),x=Q(e,{global:!0});return delete x.id,R.default.createElement(W.div,{...V(x,u,v),...b,ref:t,style:{...u.style,...b.style},"data-hovered":y||void 0,"data-dragging":p||void 0,"data-focused":m||void 0,"data-focus-visible":_||void 0,"data-disabled":h||void 0},R.default.createElement(al,null,R.default.createElement(`input`,{ref:s,...V(d,g)})),R.default.createElement(Jn,{values:[[ns,{...f,ref:c}]]},b.children))});var Yd={};Yd={colorSwatchPicker:`تغييرات الألوان`,dropzoneLabel:`DropZone`,selectPlaceholder:`حدد عنصرًا`,tableResizer:`أداة تغيير الحجم`};var Xd={};Xd={colorSwatchPicker:`Цветови мостри`,dropzoneLabel:`DropZone`,selectPlaceholder:`Изберете предмет`,tableResizer:`Преоразмерител`};var Zd={};Zd={colorSwatchPicker:`Vzorky barev`,dropzoneLabel:`Místo pro přetažení`,selectPlaceholder:`Vyberte položku`,tableResizer:`Změna velikosti`};var Qd={};Qd={colorSwatchPicker:`Farveprøver`,dropzoneLabel:`DropZone`,selectPlaceholder:`Vælg et element`,tableResizer:`Størrelsesændring`};var $d={};$d={colorSwatchPicker:`Farbfelder`,dropzoneLabel:`Ablegebereich`,selectPlaceholder:`Element wählen`,tableResizer:`Größenanpassung`};var ef={};ef={colorSwatchPicker:`Χρωματικά δείγματα`,dropzoneLabel:`DropZone`,selectPlaceholder:`Επιλέξτε ένα αντικείμενο`,tableResizer:`Αλλαγή μεγέθους`};var tf={};tf={selectPlaceholder:`Select an item`,tableResizer:`Resizer`,dropzoneLabel:`DropZone`,colorSwatchPicker:`Color swatches`};var nf={};nf={colorSwatchPicker:`Muestras de colores`,dropzoneLabel:`DropZone`,selectPlaceholder:`Seleccionar un artículo`,tableResizer:`Cambiador de tamaño`};var rf={};rf={colorSwatchPicker:`Värvinäidised`,dropzoneLabel:`DropZone`,selectPlaceholder:`Valige üksus`,tableResizer:`Suuruse muutja`};var af={};af={colorSwatchPicker:`Värimallit`,dropzoneLabel:`DropZone`,selectPlaceholder:`Valitse kohde`,tableResizer:`Koon muuttaja`};var of={};of={colorSwatchPicker:`Échantillons de couleurs`,dropzoneLabel:`DropZone`,selectPlaceholder:`Sélectionner un élément`,tableResizer:`Redimensionneur`};var sf={};sf={colorSwatchPicker:`דוגמיות צבע`,dropzoneLabel:`DropZone`,selectPlaceholder:`בחר פריט`,tableResizer:`שינוי גודל`};var cf={};cf={colorSwatchPicker:`Uzorci boja`,dropzoneLabel:`Zona spuštanja`,selectPlaceholder:`Odaberite stavku`,tableResizer:`Promjena veličine`};var lf={};lf={colorSwatchPicker:`Színtárak`,dropzoneLabel:`DropZone`,selectPlaceholder:`Válasszon ki egy elemet`,tableResizer:`Átméretező`};var uf={};uf={colorSwatchPicker:`Campioni di colore`,dropzoneLabel:`Zona di rilascio`,selectPlaceholder:`Seleziona un elemento`,tableResizer:`Ridimensionamento`};var df={};df={colorSwatchPicker:`カラースウォッチ`,dropzoneLabel:`ドロップゾーン`,selectPlaceholder:`項目を選択`,tableResizer:`サイズ変更ツール`};var ff={};ff={colorSwatchPicker:`색상 견본`,dropzoneLabel:`드롭 영역`,selectPlaceholder:`항목 선택`,tableResizer:`크기 조정기`};var pf={};pf={colorSwatchPicker:`Spalvų pavyzdžiai`,dropzoneLabel:`„DropZone“`,selectPlaceholder:`Pasirinkite elementą`,tableResizer:`Dydžio keitiklis`};var mf={};mf={colorSwatchPicker:`Krāsu paraugi`,dropzoneLabel:`DropZone`,selectPlaceholder:`Izvēlēties vienumu`,tableResizer:`Izmēra mainītājs`};var hf={};hf={colorSwatchPicker:`Fargekart`,dropzoneLabel:`Droppsone`,selectPlaceholder:`Velg et element`,tableResizer:`Størrelsesendrer`};var gf={};gf={colorSwatchPicker:`kleurstalen`,dropzoneLabel:`DropZone`,selectPlaceholder:`Selecteer een item`,tableResizer:`Resizer`};var _f={};_f={colorSwatchPicker:`Próbki kolorów`,dropzoneLabel:`Strefa upuszczania`,selectPlaceholder:`Wybierz element`,tableResizer:`Zmiana rozmiaru`};var vf={};vf={colorSwatchPicker:`Amostras de cores`,dropzoneLabel:`DropZone`,selectPlaceholder:`Selecione um item`,tableResizer:`Redimensionador`};var yf={};yf={colorSwatchPicker:`Amostras de cores`,dropzoneLabel:`DropZone`,selectPlaceholder:`Selecione um item`,tableResizer:`Redimensionador`};var bf={};bf={colorSwatchPicker:`Specimene de culoare`,dropzoneLabel:`Zonă de plasare`,selectPlaceholder:`Selectați un element`,tableResizer:`Instrument de redimensionare`};var xf={};xf={colorSwatchPicker:`Цветовые образцы`,dropzoneLabel:`DropZone`,selectPlaceholder:`Выберите элемент`,tableResizer:`Средство изменения размера`};var Sf={};Sf={colorSwatchPicker:`Vzorkovníky farieb`,dropzoneLabel:`DropZone`,selectPlaceholder:`Vyberte položku`,tableResizer:`Nástroj na zmenu veľkosti`};var Cf={};Cf={colorSwatchPicker:`Barvne palete`,dropzoneLabel:`DropZone`,selectPlaceholder:`Izberite element`,tableResizer:`Spreminjanje velikosti`};var wf={};wf={colorSwatchPicker:`Uzorci boje`,dropzoneLabel:`DropZone`,selectPlaceholder:`Izaberite stavku`,tableResizer:`Promena veličine`};var Tf={};Tf={colorSwatchPicker:`Färgrutor`,dropzoneLabel:`DropZone`,selectPlaceholder:`Välj en artikel`,tableResizer:`Storleksändrare`};var Ef={};Ef={colorSwatchPicker:`Renk örnekleri`,dropzoneLabel:`Bırakma Bölgesi`,selectPlaceholder:`Bir öğe seçin`,tableResizer:`Yeniden boyutlandırıcı`};var Df={};Df={colorSwatchPicker:`Зразки кольорів`,dropzoneLabel:`DropZone`,selectPlaceholder:`Виберіть елемент`,tableResizer:`Засіб змінення розміру`};var Of={};Of={colorSwatchPicker:`颜色色板`,dropzoneLabel:`放置区域`,selectPlaceholder:`选择一个项目`,tableResizer:`尺寸调整器`};var kf={};kf={colorSwatchPicker:`色票`,dropzoneLabel:`放置區`,selectPlaceholder:`選取項目`,tableResizer:`大小調整器`};var Af={};Af={"ar-AE":Yd,"bg-BG":Xd,"cs-CZ":Zd,"da-DK":Qd,"de-DE":$d,"el-GR":ef,"en-US":tf,"es-ES":nf,"et-EE":rf,"fi-FI":af,"fr-FR":of,"he-IL":sf,"hr-HR":cf,"hu-HU":lf,"it-IT":uf,"ja-JP":df,"ko-KR":ff,"lt-LT":pf,"lv-LV":mf,"nb-NO":hf,"nl-NL":gf,"pl-PL":_f,"pt-BR":vf,"pt-PT":yf,"ro-RO":bf,"ru-RU":xf,"sk-SK":Sf,"sl-SI":Cf,"sr-SP":wf,"sv-SE":Tf,"tr-TR":Ef,"uk-UA":Df,"zh-CN":Of,"zh-TW":kf};let jf=(0,R.createContext)({}),Mf=(0,R.createContext)(null),Nf=(0,R.forwardRef)(function(e,t){let{render:n}=(0,R.useContext)(Mf);return R.default.createElement(R.default.Fragment,null,n(e,t))});function Pf(e,t){let n=e?.renderDropIndicator,r=e?.isVirtualDragging?.(),i=(0,R.useCallback)(e=>{if(r||t?.isDropTarget(e))return n?n(e):R.default.createElement(Nf,{target:e})},[t?.target,r,n]);return e?.useDropIndicator?i:void 0}function Ff(e,t,n){let r=e.focusedKey,i=null;if(t?.isVirtualDragging?.()&&n?.target?.type===`item`&&(i=n.target.key,n.target.dropPosition===`after`)){let e=n.collection.getKeyAfter(i),t=null;if(e!=null){let r=n.collection.getItem(i)?.level??0;for(;e!=null;){let i=n.collection.getItem(e);if(!i)break;if(i.type!==`item`){e=n.collection.getKeyAfter(e);continue}if((i.level??0)<=r)break;t=e,e=n.collection.getKeyAfter(e)}}i=e??t??i}return(0,R.useMemo)(()=>new Set([r,i].filter(e=>e!=null)),[r,i])}let If=(0,R.createContext)({}),Lf=(0,R.createContext)(null);function Rf(e){let t=(0,R.useRef)({});return R.default.createElement(Lf.Provider,{value:t},e.children)}let zf=(0,R.createContext)({isSelected:!1}),Bf=(0,R.createContext)({});(class extends ia{static{this.type=`separator`}filter(e,t){let n=t.getItem(this.prevKey);if(n&&n.type!==`separator`){let n=this.clone();return t.addDescendants(n,e),n}return null}});let Vf=new WeakMap;function Hf(e){return typeof e==`string`?e.replace(/\s*/g,``):``+e}function Uf(e,t){let n=Vf.get(e);if(!n)throw Error(`Unknown list`);return`${n.id}-option-${Hf(t)}`}var Wf=class{constructor(e,t,n,r){this._walkerStack=[],this._currentSetFor=new Set,this._acceptNode=e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e.shadowRoot;if(t){let e=this._doc.createTreeWalker(t,this.whatToShow,{acceptNode:this._acceptNode});return this._walkerStack.unshift(e),NodeFilter.FILTER_ACCEPT}if(typeof this.filter==`function`)return this.filter(e);if(this.filter?.acceptNode)return this.filter.acceptNode(e);if(this.filter===null)return NodeFilter.FILTER_ACCEPT}return NodeFilter.FILTER_SKIP},this._doc=e,this.root=t,this.filter=r??null,this.whatToShow=n??NodeFilter.SHOW_ALL,this._currentNode=t,this._walkerStack.unshift(e.createTreeWalker(t,n,this._acceptNode));let i=t.shadowRoot;if(i){let e=this._doc.createTreeWalker(i,this.whatToShow,{acceptNode:this._acceptNode});this._walkerStack.unshift(e)}}get currentNode(){return this._currentNode}set currentNode(e){if(!q(this.root,e))throw Error(`Cannot set currentNode to a node that is not contained by the root node.`);let t=[],n=e,r=e;for(this._currentNode=e;n&&n!==this.root;)if(n.nodeType===Node.DOCUMENT_FRAGMENT_NODE){let e=n,i=this._doc.createTreeWalker(e,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),n=r=e.host}else n=n.parentNode;let i=this._doc.createTreeWalker(this.root,this.whatToShow,{acceptNode:this._acceptNode});t.push(i),i.currentNode=r,this._currentSetFor.add(i),this._walkerStack=t}get doc(){return this._doc}firstChild(){let e=this.currentNode,t=this.nextNode();return q(e,t)?(t&&(this.currentNode=t),t):(this.currentNode=e,null)}lastChild(){let e=this._walkerStack[0].lastChild();return e&&(this.currentNode=e),e}nextNode(){let e=this._walkerStack[0].nextNode();if(e){if(e.shadowRoot){let t;if(typeof this.filter==`function`?t=this.filter(e):this.filter?.acceptNode&&(t=this.filter.acceptNode(e)),t===NodeFilter.FILTER_ACCEPT)return this.currentNode=e,e;let n=this.nextNode();return n&&(this.currentNode=n),n}return e&&(this.currentNode=e),e}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.nextNode();return e&&(this.currentNode=e),e}return null}previousNode(){let e=this._walkerStack[0];if(e.currentNode===e.root){if(this._currentSetFor.has(e)){if(this._currentSetFor.delete(e),this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}return null}let t=e.previousNode();if(t){if(t.shadowRoot){let e;if(typeof this.filter==`function`?e=this.filter(t):this.filter?.acceptNode&&(e=this.filter.acceptNode(t)),e===NodeFilter.FILTER_ACCEPT)return t&&(this.currentNode=t),t;let n=this.lastChild();return n&&(this.currentNode=n),n}return t&&(this.currentNode=t),t}if(this._walkerStack.length>1){this._walkerStack.shift();let e=this.previousNode();return e&&(this.currentNode=e),e}return null}nextSibling(){return null}previousSibling(){return null}parentNode(){return null}};function Gf(e,t,n,r){return or()?new Wf(e,t,n,r):e.createTreeWalker(t,n,r)}let Kf=R.default.createContext(null),qf=`react-aria-focus-scope-restore`,$=null;function Jf(e){let{children:t,contain:n,restoreFocus:r,autoFocus:i}=e,a=(0,R.useRef)(null),o=(0,R.useRef)(null),s=(0,R.useRef)([]),{parentNode:c}=(0,R.useContext)(Kf)||{},l=(0,R.useMemo)(()=>new vp({scopeRef:s}),[s]);z(()=>{let e=c||yp.root;if(yp.getTreeNode(e.scopeRef)&&$&&!ap($,e.scopeRef)){let t=yp.getTreeNode($);t&&(e=t)}e.addChild(l),yp.addNode(l)},[l,c]),z(()=>{let e=yp.getTreeNode(s);e&&(e.contain=!!n)},[n]),z(()=>{let e=a.current?.nextSibling,t=[],n=e=>e.stopPropagation();for(;e&&e!==o.current;)t.push(e),e.addEventListener(qf,n),e=e.nextSibling;return s.current=t,()=>{for(let e of t)e.removeEventListener(qf,n)}},[t]),up(s,r,n),ep(s,n),fp(s,r,n),lp(s,i),(0,R.useEffect)(()=>{let e=J(G(s.current?s.current[0]:void 0)),t=null;if(np(e,s.current)){for(let n of yp.traverse())n.scopeRef&&np(e,n.scopeRef.current)&&(t=n);t===yp.getTreeNode(s)&&($=t.scopeRef)}},[s]),z(()=>()=>{let e=yp.getTreeNode(s)?.parent?.scopeRef??null;(s===$||ap(s,$))&&(!e||yp.getTreeNode(e))&&($=e),yp.removeTreeNode(s)},[s]);let u=(0,R.useMemo)(()=>Yf(s),[]),d=(0,R.useMemo)(()=>({focusManager:u,parentNode:l}),[l,u]);return R.default.createElement(Kf.Provider,{value:d},R.default.createElement(`span`,{"data-focus-scope-start":!0,hidden:!0,ref:a}),t,R.default.createElement(`span`,{"data-focus-scope-end":!0,hidden:!0,ref:o}))}function Yf(e){return{focusNext(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||J(G(n[0]??void 0)),c=n[0].previousElementSibling,l=mp(Xf(n),{tabbable:i,accept:o},n);l.currentNode=np(s,n)?s:c;let u=l.nextNode();return!u&&a&&(l.currentNode=c,u=l.nextNode()),u&&op(u,!0),u},focusPrevious(t={}){let n=e.current,{from:r,tabbable:i,wrap:a,accept:o}=t,s=r||J(G(n[0]??void 0)),c=n[n.length-1].nextElementSibling,l=mp(Xf(n),{tabbable:i,accept:o},n);l.currentNode=np(s,n)?s:c;let u=l.previousNode();return!u&&a&&(l.currentNode=c,u=l.previousNode()),u&&op(u,!0),u},focusFirst(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=mp(Xf(n),{tabbable:r,accept:i},n);a.currentNode=n[0].previousElementSibling;let o=a.nextNode();return o&&op(o,!0),o},focusLast(t={}){let n=e.current,{tabbable:r,accept:i}=t,a=mp(Xf(n),{tabbable:r,accept:i},n);a.currentNode=n[n.length-1].nextElementSibling;let o=a.previousNode();return o&&op(o,!0),o}}}function Xf(e){return e[0].parentElement}function Zf(e){let t=yp.getTreeNode($);for(;t&&t.scopeRef!==e;){if(t.contain)return!1;t=t.parent}return!0}function Qf(e){if(!e.form)return Array.from(G(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter(e=>!e.form);let t=e.form.elements.namedItem(e.name),n=K(e);return t instanceof n.RadioNodeList?Array.from(t).filter(e=>e instanceof n.HTMLInputElement):t instanceof n.HTMLInputElement?[t]:[]}function $f(e){if(e.checked)return!0;let t=Qf(e);return t.length>0&&!t.some(e=>e.checked)}function ep(e,t){let n=(0,R.useRef)(void 0),r=(0,R.useRef)(void 0);z(()=>{let i=e.current;if(!t){r.current&&=(cancelAnimationFrame(r.current),void 0);return}let a=G(i?i[0]:void 0),o=t=>{if(t.key!==`Tab`||t.altKey||t.ctrlKey||t.metaKey||!Zf(e)||t.isComposing)return;let n=J(a),r=e.current;if(!r||!np(n,r))return;let i=mp(Xf(r),{tabbable:!0},r);if(!n)return;i.currentNode=n;let o=t.shiftKey?i.previousNode():i.nextNode();o||=(i.currentNode=t.shiftKey?r[r.length-1].nextElementSibling:r[0].previousElementSibling,t.shiftKey?i.previousNode():i.nextNode()),t.preventDefault(),o&&(op(o,!0),o instanceof K(o).HTMLInputElement&&o.select())},s=t=>{(!$||ap($,e))&&np(Y(t),e.current)?($=e,n.current=Y(t)):Zf(e)&&!rp(Y(t),e)?n.current?op(n.current):$&&$.current&&cp($.current):Zf(e)&&(n.current=Y(t))},c=t=>{r.current&&cancelAnimationFrame(r.current),r.current=requestAnimationFrame(()=>{let r=gi(),i=(r===`virtual`||r===null)&&Ur()&&Hr(),o=J(a);if(!i&&o&&Zf(e)&&!rp(o,e)){$=e;let r=Y(t);r&&r.isConnected?(n.current=r,op(n.current)):$.current&&cp($.current)}})};return a.addEventListener(`keydown`,o,!1),a.addEventListener(`focusin`,s,!1),i?.forEach(e=>e.addEventListener(`focusin`,s,!1)),i?.forEach(e=>e.addEventListener(`focusout`,c,!1)),()=>{a.removeEventListener(`keydown`,o,!1),a.removeEventListener(`focusin`,s,!1),i?.forEach(e=>e.removeEventListener(`focusin`,s,!1)),i?.forEach(e=>e.removeEventListener(`focusout`,c,!1))}},[e,t]),z(()=>()=>{r.current&&cancelAnimationFrame(r.current)},[r])}function tp(e){return rp(e)}function np(e,t){return!e||!t?!1:t.some(t=>q(t,e))}function rp(e,t=null){if(e instanceof Element&&e.closest(`[data-react-aria-top-layer]`))return!0;for(let{scopeRef:n}of yp.traverse(yp.getTreeNode(t)))if(n&&np(e,n.current))return!0;return!1}function ip(e){return rp(e,$)}function ap(e,t){let n=yp.getTreeNode(t)?.parent;for(;n;){if(n.scopeRef===e)return!0;n=n.parent}return!1}function op(e,t=!1){if(e!=null&&!t)try{ba(e)}catch{}else if(e!=null)try{e.focus()}catch{}}function sp(e,t=!0){let n=e[0].previousElementSibling,r=Xf(e),i=mp(r,{tabbable:t},e);i.currentNode=n;let a=i.nextNode();return t&&!a&&(r=Xf(e),i=mp(r,{tabbable:!1},e),i.currentNode=n,a=i.nextNode()),a}function cp(e,t=!0){op(sp(e,t))}function lp(e,t){let n=R.default.useRef(t);(0,R.useEffect)(()=>{if(n.current){$=e;let t=G(e.current?e.current[0]:void 0);!np(J(t),$.current)&&e.current&&cp(e.current)}n.current=!1},[e])}function up(e,t,n){z(()=>{if(t||n)return;let r=e.current,i=G(r?r[0]:void 0),a=t=>{let n=Y(t);np(n,e.current)?$=e:tp(n)||($=null)};return i.addEventListener(`focusin`,a,!1),r?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),r?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[e,t,n])}function dp(e){let t=yp.getTreeNode($);for(;t&&t.scopeRef!==e;){if(t.nodeToRestore)return!1;t=t.parent}return t?.scopeRef===e}function fp(e,t,n){let r=(0,R.useRef)(typeof document<`u`?J(G(e.current?e.current[0]:void 0)):null);z(()=>{let r=e.current,i=G(r?r[0]:void 0);if(!t||n)return;let a=()=>{(!$||ap($,e))&&np(J(i),e.current)&&($=e)};return i.addEventListener(`focusin`,a,!1),r?.forEach(e=>e.addEventListener(`focusin`,a,!1)),()=>{i.removeEventListener(`focusin`,a,!1),r?.forEach(e=>e.removeEventListener(`focusin`,a,!1))}},[e,n]),z(()=>{let r=G(e.current?e.current[0]:void 0);if(!t)return;let i=t=>{if(t.key!==`Tab`||t.altKey||t.ctrlKey||t.metaKey||!Zf(e)||t.isComposing)return;let n=r.activeElement;if(!rp(n,e)||!dp(e))return;let i=yp.getTreeNode(e);if(!i)return;let a=i.nodeToRestore,o=mp(r.body,{tabbable:!0});o.currentNode=n;let s=t.shiftKey?o.previousNode():o.nextNode();if((!a||!a.isConnected||a===r.body)&&(a=void 0,i.nodeToRestore=void 0),(!s||!rp(s,e))&&a){o.currentNode=a;do s=t.shiftKey?o.previousNode():o.nextNode();while(rp(s,e));t.preventDefault(),t.stopPropagation(),s?op(s,!0):tp(a)?op(a,!0):n.blur()}};return n||r.addEventListener(`keydown`,i,!0),()=>{n||r.removeEventListener(`keydown`,i,!0)}},[e,t,n]),z(()=>{let n=G(e.current?e.current[0]:void 0);if(!t)return;let i=yp.getTreeNode(e);if(i)return i.nodeToRestore=r.current??void 0,()=>{let r=yp.getTreeNode(e);if(!r)return;let i=r.nodeToRestore,a=J(n);if(t&&i&&(a&&rp(a,e)||a===n.body&&dp(e))){let t=yp.clone();requestAnimationFrame(()=>{if(n.activeElement===n.body){let n=t.getTreeNode(e);for(;n;){if(n.nodeToRestore&&n.nodeToRestore.isConnected){pp(n.nodeToRestore);return}n=n.parent}for(n=t.getTreeNode(e);n;){if(n.scopeRef&&n.scopeRef.current&&yp.getTreeNode(n.scopeRef)){let e=sp(n.scopeRef.current,!0);if(e){pp(e);return}}n=n.parent}}})}}},[e,t])}function pp(e){e.dispatchEvent(new CustomEvent(qf,{bubbles:!0,cancelable:!0}))&&op(e)}function mp(e,t,n){let r=t?.tabbable?Er:Tr,i=e?.nodeType===Node.ELEMENT_NODE?e:null,a=G(i),o=Gf(a,e||a,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return q(t?.from,e)||t?.tabbable&&e.tagName===`INPUT`&&e.getAttribute(`type`)===`radio`&&(!$f(e)||o.currentNode.tagName===`INPUT`&&o.currentNode.type===`radio`&&o.currentNode.name===e.name)?NodeFilter.FILTER_REJECT:r(e)&&(!n||np(e,n))&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(o.currentNode=t.from),o}function hp(e,t={}){return{focusNext(n={}){let r=e.current;if(!r)return null;let{from:i,tabbable:a=t.tabbable,wrap:o=t.wrap,accept:s=t.accept}=n,c=i||J(G(r)),l=mp(r,{tabbable:a,accept:s});q(r,c)&&(l.currentNode=c);let u=l.nextNode();return!u&&o&&(l.currentNode=r,u=l.nextNode()),u&&op(u,!0),u},focusPrevious(n=t){let r=e.current;if(!r)return null;let{from:i,tabbable:a=t.tabbable,wrap:o=t.wrap,accept:s=t.accept}=n,c=i||J(G(r)),l=mp(r,{tabbable:a,accept:s});if(q(r,c))l.currentNode=c;else{let e=gp(l);return e&&op(e,!0),e??null}let u=l.previousNode();if(!u&&o){l.currentNode=r;let e=gp(l);if(!e)return null;u=e}return u&&op(u,!0),u??null},focusFirst(n=t){let r=e.current;if(!r)return null;let{tabbable:i=t.tabbable,accept:a=t.accept}=n,o=mp(r,{tabbable:i,accept:a}).nextNode();return o&&op(o,!0),o},focusLast(n=t){let r=e.current;if(!r)return null;let{tabbable:i=t.tabbable,accept:a=t.accept}=n,o=gp(mp(r,{tabbable:i,accept:a}));return o&&op(o,!0),o??null}}}function gp(e){let t,n;do n=e.lastChild(),n&&(t=n);while(n);return t}var _p=class e{constructor(){this.fastMap=new Map,this.root=new vp({scopeRef:null}),this.fastMap.set(null,this.root)}get size(){return this.fastMap.size}getTreeNode(e){return this.fastMap.get(e)}addTreeNode(e,t,n){let r=this.fastMap.get(t??null);if(!r)return;let i=new vp({scopeRef:e});r.addChild(i),i.parent=r,this.fastMap.set(e,i),n&&(i.nodeToRestore=n)}addNode(e){this.fastMap.set(e.scopeRef,e)}removeTreeNode(e){if(e===null)return;let t=this.fastMap.get(e);if(!t)return;let n=t.parent;for(let e of this.traverse())e!==t&&t.nodeToRestore&&e.nodeToRestore&&t.scopeRef&&t.scopeRef.current&&np(e.nodeToRestore,t.scopeRef.current)&&(e.nodeToRestore=t.nodeToRestore);let r=t.children;n&&(n.removeChild(t),r.size>0&&r.forEach(e=>n&&n.addChild(e))),this.fastMap.delete(t.scopeRef)}*traverse(e=this.root){if(e.scopeRef!=null&&(yield e),e.children.size>0)for(let t of e.children)yield*this.traverse(t)}clone(){let t=new e;for(let e of this.traverse())t.addTreeNode(e.scopeRef,e.parent?.scopeRef??null,e.nodeToRestore);return t}},vp=class{constructor(e){this.children=new Set,this.contain=!1,this.scopeRef=e.scopeRef}addChild(e){this.children.add(e),e.parent=this}removeChild(e){this.children.delete(e),e.parent=void 0}};let yp=new _p;function bp(e){return Br()?e.altKey:e.ctrlKey}function xp(e,t){let n=`[data-key="${CSS.escape(String(t))}"]`,r=e.current?.dataset.collection;return r&&(n=`[data-collection="${CSS.escape(r)}"]${n}`),e.current?.querySelector(n)}let Sp=new WeakMap;function Cp(e){let t=B();return Sp.set(e,t),t}function wp(e){return Sp.get(e)}let Tp=1e3;function Ep(e){let{keyboardDelegate:t,selectionManager:n,onTypeSelect:r}=e,i=(0,R.useRef)({search:``,timeout:void 0});return(0,R.useEffect)(()=>{let e=i.current.timeout;return()=>{clearTimeout(e)}},[i]),{typeSelectProps:{onKeyDownCapture:t.getKeyForSearch?e=>{if(i.current.search.length>0&&e.key===` `){if(e.preventDefault(),(!(`continuePropagation`in e)||`continuePropagation`in e&&!e.isPropagationStopped())&&e.stopPropagation(),i.current.search+=` `,t.getKeyForSearch!=null){let e=t.getKeyForSearch(i.current.search,n.focusedKey);e??=t.getKeyForSearch(i.current.search),e!=null&&(n.setFocusedKey(e),r&&r(e))}clearTimeout(i.current.timeout),i.current.timeout=setTimeout(()=>{i.current.search=``},Tp)}}:void 0,onKeyDown:t.getKeyForSearch?e=>{let a=Dp(e.key);if(!(!a||e.ctrlKey||e.metaKey||e.altKey||!q(e.currentTarget,Y(e))||i.current.search.length===0&&a===` `)){if(i.current.search+=a,t.getKeyForSearch!=null){let a=t.getKeyForSearch(i.current.search,n.focusedKey);if(a??=t.getKeyForSearch(i.current.search),a!=null)n.setFocusedKey(a),r&&r(a),e.preventDefault(),`continuePropagation`in e||e.stopPropagation();else{i.current.search=``,clearTimeout(i.current.timeout),i.current.timeout=void 0;return}}clearTimeout(i.current.timeout),i.current.timeout=setTimeout(()=>{i.current.search=``},Tp)}}:void 0}}}function Dp(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function Op(e,t){let n=(0,R.useRef)(!0),r=(0,R.useRef)(null);z(()=>(n.current=!0,()=>{n.current=!1}),[]),z(()=>{n.current?n.current=!1:(!r.current||t.some((e,t)=>!Object.is(e,r[t])))&&e(),r.current=t},t)}function kp(e){let{selectionManager:t,keyboardDelegate:n,ref:r,autoFocus:i=!1,shouldFocusWrap:a=!1,disallowEmptySelection:o=!1,disallowSelectAll:s=!1,escapeKeyBehavior:c=`clearSelection`,selectOnFocus:l=t.selectionBehavior===`replace`,disallowTypeAhead:u=!1,shouldUseVirtualFocus:d,allowsTabNavigation:f=!1,scrollRef:p=r,linkBehavior:m=`action`,UNSTABLE_focusOnEntry:h}=e,{direction:g}=Z(),_=Jr(),v=(e,n,i)=>{if(n!=null){if(t.isLink(n)&&m===`selection`&&l&&!bp(e)){(0,Ya.flushSync)(()=>{t.setFocusedKey(n,i)});let a=xp(r,n),o=t.getItemProps(n);if(a){_.open(a,e,o.href,o.routerOptions);return}return!1}if(t.setFocusedKey(n,i),t.isLink(n)&&m===`override`)return!1;if(e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(n);return}if(l&&!bp(e)){t.replaceSelection(n);return}}return!1},y=e=>{if(n.getKeyBelow){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyBelow?.(t.focusedKey);if(r==null&&a&&(r=n.getFirstKey?.(t.focusedKey)),r!=null){v(e,r);return}}return!1},b=e=>{if(n.getKeyAbove){let r=t.focusedKey==null?n.getLastKey?.():n.getKeyAbove?.(t.focusedKey);if(r==null&&a&&(r=n.getLastKey?.(t.focusedKey)),r!=null){v(e,r);return}}return!1},x=e=>{if(n.getFirstKey){if(t.focusedKey===null&&e.shiftKey)return!1;let r=n.getFirstKey(t.focusedKey,xi(e));if(t.setFocusedKey(r),r!=null){if(xi(e)&&e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(r);return}if(l){t.replaceSelection(r);return}}}return!1},S=e=>{if(n.getKeyLeftOf){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyLeftOf?.(t.focusedKey);if(r==null&&a&&(r=g===`rtl`?n.getFirstKey?.(t.focusedKey):n.getLastKey?.(t.focusedKey)),r!=null){v(e,r,g===`rtl`?`first`:`last`);return}}return!1},C=e=>{if(n.getKeyRightOf){let r=t.focusedKey==null?n.getFirstKey?.():n.getKeyRightOf?.(t.focusedKey);if(r==null&&a&&(r=g===`rtl`?n.getLastKey?.(t.focusedKey):n.getFirstKey?.(t.focusedKey)),r!=null){v(e,r,g===`rtl`?`last`:`first`);return}}return!1},w=e=>{if(n.getLastKey){if(t.focusedKey===null&&e.shiftKey)return!1;let r=n.getLastKey(t.focusedKey,xi(e));if(t.setFocusedKey(r),r!=null){if(xi(e)&&e.shiftKey&&t.selectionMode===`multiple`){t.extendSelection(r);return}if(l){t.replaceSelection(r);return}}}return!1},T=e=>{if(n.getKeyPageBelow&&t.focusedKey!=null){let r=n.getKeyPageBelow(t.focusedKey);if(r!=null)return v(e,r)}return!1},E=e=>{if(n.getKeyPageAbove&&t.focusedKey!=null){let r=n.getKeyPageAbove(t.focusedKey);if(r!=null)return v(e,r)}return!1},D=()=>{if(t.selectionMode===`multiple`&&s!==!0){t.selectAll();return}return!1},O=()=>{if(c===`clearSelection`&&!o&&t.selectedKeys.size!==0){t.clearSelection();return}return!1},k=()=>{if(!f&&r.current){let e=mp(r.current,{tabbable:!0}),t,n;do n=e.lastChild(),n&&(t=n);while(n);let i=J();t&&(!cr(t)||i&&!Er(i))&&pr(t)}return{shouldContinuePropagation:!0,shouldPreventDefault:!1}},A=()=>(!f&&r.current&&r.current.focus(),{shouldContinuePropagation:!0,shouldPreventDefault:!1}),j=(e,t)=>({[Ir()?e+`+Shift+Alt`:e+`+Shift+Control`]:t,[e+`+Shift`]:t,[Ir()?e+`+Alt`:e+`+Control`]:t,[e]:t}),{keyboardProps:M}=Fa({shortcuts:{...j(`ArrowDown`,y),...j(`ArrowUp`,b),...j(`ArrowLeft`,S),...j(`ArrowRight`,C),...j(`PageDown`,T),...j(`PageUp`,E)},allowRepeats:!0}),{keyboardProps:ee}=Fa({shortcuts:{...j(`Home`,x),...j(`End`,w),"Mod+A":D,Escape:O,Tab:k,"Tab+Shift":A}}),N=(0,R.useRef)({top:0,left:0});Ti(p,`scroll`,()=>{N.current={top:p.current?.scrollTop??0,left:p.current?.scrollLeft??0}});let te=e=>{if(t.isFocused){q(e.currentTarget,Y(e))||t.setFocused(!1);return}if(!q(e.currentTarget,Y(e)))return;let i=gi();t.setFocused(!0);let a=e=>{e!=null&&(t.setFocusedKey(e),l&&!t.isSelected(e)&&t.replaceSelection(e))};if(h&&(i===`keyboard`||i===`virtual`))a(h===`first`?n.getFirstKey?.():n.getLastKey?.());else if(t.focusedKey==null){let r=e.relatedTarget;r&&e.currentTarget.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING?a(t.lastSelectedKey??n.getLastKey?.()):a(t.firstSelectedKey??n.getFirstKey?.())}else p.current&&(p.current.scrollTop=N.current.top,p.current.scrollLeft=N.current.left);if(t.focusedKey!=null&&p.current){let e=xp(r,t.focusedKey);e instanceof HTMLElement&&(!cr(e)&&!d&&pr(e),(i===`keyboard`||h&&i===`virtual`)&&Vc(e,{containingElement:r.current}))}},ne=e=>{q(e.currentTarget,e.relatedTarget)||t.setFocused(!1)},P=(0,R.useRef)(!1);Ti(r,`react-aria-focus`,d?e=>{let{detail:n}=e;e.stopPropagation(),t.setFocused(!0),n?.focusStrategy===`first`&&(P.current=!0)}:void 0);let F=n.getFirstKey?.()??null;Op(()=>{if(P.current){if(F==null){let e=J();lr(r.current),dr(e,null),t.collection.size>0&&(P.current=!1)}else t.setFocusedKey(F),P.current=!1}},[F,t.collection.size]),Op(()=>{t.collection.size>0&&(P.current=!1)},[t.focusedKey]),Ti(r,`react-aria-clear-focus`,d?e=>{e.stopPropagation(),t.setFocused(!1),e.detail?.clearFocusKey&&t.setFocusedKey(null)}:void 0);let re=(0,R.useRef)(i),I=(0,R.useRef)(!1);(0,R.useEffect)(()=>{if(re.current){let e=null;i===`first`&&(e=n.getFirstKey?.()??null),i===`last`&&(e=n.getLastKey?.()??null);let a=t.selectedKeys;if(a.size){for(let n of a)if(t.canSelectItem(n)){e=n;break}}t.setFocused(!0),t.setFocusedKey(e),e!=null&&l&&!a.size&&t.canSelectItem(e)&&t.replaceSelection(e),e==null&&!d&&r.current&&ba(r.current),t.collection.size>0&&(re.current=!1,I.current=!0)}});let ie=(0,R.useRef)(t.focusedKey),ae=(0,R.useRef)(null);(0,R.useEffect)(()=>{if(t.isFocused&&t.focusedKey!=null&&(t.focusedKey!==ie.current||I.current)&&p.current&&r.current){let e=gi(),n=xp(r,t.focusedKey);if(!(n instanceof HTMLElement))return;(e===`keyboard`||I.current)&&(ae.current&&cancelAnimationFrame(ae.current),ae.current=requestAnimationFrame(()=>{p.current&&(zc(p.current,n),e!==`virtual`&&Vc(n,{containingElement:r.current}))}))}!d&&t.isFocused&&t.focusedKey==null&&ie.current!=null&&r.current&&ba(r.current),ie.current=t.focusedKey,I.current=!1}),(0,R.useEffect)(()=>()=>{ae.current&&cancelAnimationFrame(ae.current)},[]),Ti(r,`react-aria-focus-scope-restore`,e=>{e.preventDefault(),t.setFocused(!0)});let oe={...V(ee,M),onFocus:te,onBlur:ne,onMouseDown(e){p.current===Y(e)&&e.preventDefault()}},{typeSelectProps:se}=Ep({keyboardDelegate:n,selectionManager:t});u||(oe=V(se,oe));let ce;d||(ce=t.focusedKey==null?0:-1);let le=Cp(t.collection);return{collectionProps:V(oe,{tabIndex:ce,"data-collection":le})}}var Ap=class{constructor(e){this.ref=e}getItemRect(e){let t=this.ref.current;if(!t)return null;let n=e==null?null:xp(this.ref,e);if(!n)return null;let r=t.getBoundingClientRect(),i=n.getBoundingClientRect();return{x:i.left-r.left-t.clientLeft+t.scrollLeft,y:i.top-r.top-t.clientTop+t.scrollTop,width:i.width,height:i.height}}getContentSize(){let e=this.ref.current;return{width:e?.scrollWidth??0,height:e?.scrollHeight??0}}getVisibleRect(){let e=this.ref.current;return{x:e?.scrollLeft??0,y:e?.scrollTop??0,width:e?.clientWidth??0,height:e?.clientHeight??0}}},jp=class{constructor(...e){if(e.length===1){let t=e[0];this.collection=t.collection,this.ref=t.ref,this.collator=t.collator,this.disabledKeys=t.disabledKeys||new Set,this.disabledBehavior=t.disabledBehavior||`all`,this.orientation=t.orientation||`vertical`,this.direction=t.direction,this.layout=t.layout||`stack`,this.layoutDelegate=t.layoutDelegate||new Ap(t.ref)}else this.collection=e[0],this.disabledKeys=e[1],this.ref=e[2],this.collator=e[3],this.layout=`stack`,this.orientation=`vertical`,this.disabledBehavior=`all`,this.layoutDelegate=new Ap(this.ref);this.layout===`stack`&&this.orientation===`vertical`&&(this.getKeyLeftOf=void 0,this.getKeyRightOf=void 0)}isDisabled(e){return this.disabledBehavior===`all`&&(e.props?.isDisabled||this.disabledKeys.has(e.key))&&e.props?.disabledBehavior!==`selection`}findNextNonDisabled(e,t,n=!1){let r=e;for(;r!=null;){let e=this.collection.getItem(r);if(e?.type===`item`&&(n||!this.isDisabled(e)))return r;r=t(r)}return null}getNextKey(e,t){let n=e;return n=this.collection.getKeyAfter(n),this.findNextNonDisabled(n,e=>this.collection.getKeyAfter(e),t?.includeDisabled)}getPreviousKey(e,t){let n=e;return n=this.collection.getKeyBefore(n),this.findNextNonDisabled(n,e=>this.collection.getKeyBefore(e),t?.includeDisabled)}findKey(e,t,n){let r=e,i=this.layoutDelegate.getItemRect(r);if(!i||r==null)return null;let a=i;do{if(r=t(r),r==null)break;i=this.layoutDelegate.getItemRect(r)}while(i&&n(a,i)&&r!=null);return r}isSameRow(e,t){return e.y===t.y||e.x!==t.x}isSameColumn(e,t){return e.x===t.x||e.y!==t.y}isReversed(e){let t=this.getNextKey(e),n=xp(this.ref,e);if(t!=null){let e=xp(this.ref,t);return!n||!e?!1:n.getBoundingClientRect().top>e.getBoundingClientRect().top}let r=this.getPreviousKey(e);if(r!=null){let e=xp(this.ref,r);return!n||!e?!1:e.getBoundingClientRect().top>n.getBoundingClientRect().top}return!1}getKeyBelow(e,t){return this.layout===`grid`&&this.orientation===`vertical`?this.findKey(e,e=>this.getNextKey(e,t),this.isSameRow):this.orientation===`vertical`&&this.isReversed(e)?this.getPreviousKey(e,t):this.getNextKey(e,t)}getKeyAbove(e,t){return this.layout===`grid`&&this.orientation===`vertical`?this.findKey(e,e=>this.getPreviousKey(e,t),this.isSameRow):this.orientation===`vertical`&&this.isReversed(e)?this.getNextKey(e,t):this.getPreviousKey(e,t)}getNextColumn(e,t,n){return t?this.getPreviousKey(e,n):this.getNextKey(e,n)}getKeyRightOf(e,t){let n=this.direction===`ltr`?`getKeyRightOf`:`getKeyLeftOf`;return this.layoutDelegate[n]?(e=this.layoutDelegate[n](e),this.findNextNonDisabled(e,e=>this.layoutDelegate[n](e),t?.includeDisabled)):this.layout===`grid`?this.orientation===`vertical`?this.getNextColumn(e,this.direction===`rtl`,t):this.findKey(e,e=>this.getNextColumn(e,this.direction===`rtl`,t),this.isSameColumn):this.orientation===`horizontal`?this.getNextColumn(e,this.direction===`rtl`,t):null}getKeyLeftOf(e,t){let n=this.direction===`ltr`?`getKeyLeftOf`:`getKeyRightOf`;return this.layoutDelegate[n]?(e=this.layoutDelegate[n](e),this.findNextNonDisabled(e,e=>this.layoutDelegate[n](e),t?.includeDisabled)):this.layout===`grid`?this.orientation===`vertical`?this.getNextColumn(e,this.direction===`ltr`,t):this.findKey(e,e=>this.getNextColumn(e,this.direction===`ltr`,t),this.isSameColumn):this.orientation===`horizontal`?this.getNextColumn(e,this.direction===`ltr`,t):null}getFirstKey(){let e=this.collection.getFirstKey();return this.findNextNonDisabled(e,e=>this.collection.getKeyAfter(e))}getLastKey(){let e=this.collection.getLastKey();return this.findNextNonDisabled(e,e=>this.collection.getKeyBefore(e))}getKeyPageAbove(e){let t=this.ref.current,n=this.layoutDelegate.getItemRect(e);if(!n)return null;let r=this.isReversed(e);if(t&&!Ic(t))return this.getFirstKey();let i=e;if(this.orientation===`horizontal`){let e=Math.max(0,n.x+n.width-this.layoutDelegate.getVisibleRect().width);for(;n&&n.x>e&&i!=null;)i=this.getKeyAbove(i),n=i==null?null:this.layoutDelegate.getItemRect(i)}else{let e=this.layoutDelegate.getVisibleRect(),t=r?n.y-e.height:Math.max(0,n.y+n.height-e.height);for(;n&&n.y>t&&i!=null;)i=this.getKeyAbove(i),n=i==null?null:this.layoutDelegate.getItemRect(i)}return i??(r?this.getLastKey():this.getFirstKey())}getKeyPageBelow(e){let t=this.ref.current,n=this.layoutDelegate.getItemRect(e);if(!n)return null;let r=this.isReversed(e);if(t&&!Ic(t))return this.getLastKey();let i=e;if(this.orientation===`horizontal`){let e=Math.min(this.layoutDelegate.getContentSize().width,n.x-n.width+this.layoutDelegate.getVisibleRect().width);for(;n&&n.x<e&&i!=null;)i=this.getKeyBelow(i),n=i==null?null:this.layoutDelegate.getItemRect(i)}else{let e=Math.min(this.layoutDelegate.getContentSize().height,n.y-n.height+this.layoutDelegate.getVisibleRect().height);for(;n&&n.y<e&&i!=null;)i=this.getKeyBelow(i),n=i==null?null:this.layoutDelegate.getItemRect(i)}return i??(r?this.getFirstKey():this.getLastKey())}getKeyForSearch(e,t){if(!this.collator)return null;let n=this.collection,r=t||this.getFirstKey();for(;r!=null;){let t=n.getItem(r);if(!t)return null;let i=t.textValue.slice(0,e.length);if(t.textValue&&this.collator.compare(i,e)===0)return r;r=this.getNextKey(r)}return null}};let Mp=new Map;function Np(e){let{locale:t}=Z(),n=t+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``);if(Mp.has(n))return Mp.get(n);let r=new Intl.Collator(t,e);return Mp.set(n,r),r}function Pp(e){let{selectionManager:t,collection:n,disabledKeys:r,ref:i,keyboardDelegate:a,layoutDelegate:o,orientation:s}=e,c=Np({usage:`search`,sensitivity:`base`}),l=t.disabledBehavior,u=(0,R.useMemo)(()=>a||new jp({collection:n,disabledKeys:r,disabledBehavior:l,ref:i,collator:c,layoutDelegate:o,orientation:s}),[a,o,n,r,i,c,l,s]),{collectionProps:d}=kp({...e,ref:i,selectionManager:t,keyboardDelegate:u});return{listProps:d}}function Fp(e,t,n){let r=Q(e,{labelable:!0}),i=e.selectionBehavior||`toggle`,a=e.orientation||`vertical`,o=e.linkBehavior||(i===`replace`?`action`:`override`);i===`toggle`&&o===`action`&&(o=`override`);let{listProps:s}=Pp({...e,ref:n,selectionManager:t.selectionManager,collection:t.collection,disabledKeys:t.disabledKeys,linkBehavior:o}),{focusWithinProps:c}=Jo({onFocusWithin:e.onFocus,onBlurWithin:e.onBlur,onFocusWithinChange:e.onFocusChange}),l=B(e.id);Vf.set(t,{id:l,shouldUseVirtualFocus:e.shouldUseVirtualFocus,shouldSelectOnPressUp:e.shouldSelectOnPressUp,shouldFocusOnHover:e.shouldFocusOnHover,isVirtualized:e.isVirtualized,onAction:e.onAction,linkBehavior:o,UNSTABLE_itemBehavior:e.UNSTABLE_itemBehavior});let{labelProps:u,fieldProps:d}=is({...e,id:l,labelElementType:`span`});return{labelProps:u,listBoxProps:V(r,c,t.selectionManager.selectionMode===`multiple`?{"aria-multiselectable":`true`}:{},{role:`listbox`,"aria-orientation":a,...V(d,s)})}}function Ip(e){let{isDisabled:t,pointerType:n,onLongPressStart:r,onLongPressEnd:i,onLongPress:a,threshold:o=500,accessibilityDescription:s}=e,c=(0,R.useRef)(void 0),{addGlobalListener:l,removeAllGlobalListeners:u}=Po(),d=e=>n?e.pointerType===n:e.pointerType===`mouse`||e.pointerType===`touch`,{pressProps:f}=Bo({isDisabled:t,onPressStart(e){if(e.continuePropagation(),d(e)){r&&r({...e,type:`longpressstart`}),c.current=setTimeout(()=>{e.target.dispatchEvent(new PointerEvent(`pointercancel`,{bubbles:!0})),l(e.target,`click`,e=>e.preventDefault(),{once:!0}),G(e.target).activeElement!==e.target&&pr(e.target),a&&a({...e,type:`longpress`}),c.current=void 0},o),e.pointerType===`touch`&&l(e.target,`contextmenu`,e=>e.preventDefault(),{once:!0});let t=K(e.target);l(t,`pointerup`,()=>{setTimeout(()=>{u()},100)},{once:!0})}},onPressEnd(e){c.current&&clearTimeout(c.current),i&&d(e)&&i({...e,type:`longpressend`})}});return{longPressProps:V(f,Wc(a&&!t?s:void 0))}}function Lp(e){let{id:t,selectionManager:n,key:r,ref:i,shouldSelectOnPressUp:a,shouldUseVirtualFocus:o,focus:s,isDisabled:c,onAction:l,allowsDifferentPressOrigin:u,linkBehavior:d=`action`}=e,f=Jr();t=B(t);let p=e=>{if(e.pointerType===`keyboard`&&bp(e))n.toggleSelection(r);else{if(n.selectionMode===`none`)return;if(n.isLink(r)){if(d===`selection`&&i.current){let t=n.getItemProps(r);f.open(i.current,e,t.href,t.routerOptions),n.setSelectedKeys(n.selectedKeys);return}if(d===`override`||d===`none`)return}n.selectionMode===`single`?n.isSelected(r)&&!n.disallowEmptySelection?n.toggleSelection(r):n.replaceSelection(r):e&&e.shiftKey?n.extendSelection(r):n.selectionBehavior===`toggle`||e&&(xi(e)||e.pointerType===`touch`||e.pointerType===`virtual`)?n.toggleSelection(r):n.replaceSelection(r)}};(0,R.useEffect)(()=>{r===n.focusedKey&&n.isFocused&&(o?lr(i.current):s?s():J()!==i.current&&i.current&&ba(i.current))},[i,r,n.focusedKey,n.childFocusStrategy,n.isFocused,o]),c||=n.isDisabled(r);let m={};!o&&!c?m={tabIndex:r===n.focusedKey?0:-1,onFocus(e){Y(e)===i.current&&n.setFocusedKey(r)}}:c&&(m.onMouseDown=e=>{e.preventDefault()}),(0,R.useEffect)(()=>{c&&n.focusedKey===r&&n.setFocusedKey(null)},[n,c,r]);let h=n.isLink(r)&&d===`override`,g=l&&e.UNSTABLE_itemBehavior===`action`,_=n.isLink(r)&&d!==`selection`&&d!==`none`,v=!c&&n.canSelectItem(r)&&!h&&!g,y=(l||_)&&!c,b=y&&(n.selectionBehavior===`replace`?!v:!v||n.isEmpty),x=y&&v&&n.selectionBehavior===`replace`,S=b||x,C=(0,R.useRef)(null),w=S&&v,T=(0,R.useRef)(!1),E=(0,R.useRef)(!1),D=n.getItemProps(r),O=e=>{l&&(l(),i.current?.dispatchEvent(new CustomEvent(`react-aria-item-action`,{bubbles:!0}))),_&&i.current&&f.open(i.current,e,D.href,D.routerOptions)},k={ref:i};a?(k.onPressStart=e=>{C.current=e.pointerType,T.current=w,e.pointerType===`keyboard`&&(!S||zp(e.key))&&p(e)},u?(k.onPressUp=b?void 0:e=>{e.pointerType===`mouse`&&v&&p(e)},k.onPress=b?O:e=>{e.pointerType!==`keyboard`&&e.pointerType!==`mouse`&&v&&p(e)}):k.onPress=e=>{if(b||x&&e.pointerType!==`mouse`){if(e.pointerType===`keyboard`&&!Rp(e.key))return;O(e)}else e.pointerType!==`keyboard`&&v&&p(e)}):(k.onPressStart=e=>{C.current=e.pointerType,T.current=w,E.current=b,v&&(e.pointerType===`mouse`&&!b||e.pointerType===`keyboard`&&(!y||zp(e.key)))&&p(e)},k.onPress=e=>{(e.pointerType===`touch`||e.pointerType===`pen`||e.pointerType===`virtual`||e.pointerType===`keyboard`&&S&&Rp(e.key)||e.pointerType===`mouse`&&E.current)&&(S?O(e):v&&p(e))});let A=wp(n.collection);if(m[`data-collection`]=A,m[`data-key`]=r,k.preventFocusOnPress=o,o&&(k=V(k,{onPressStart(e){e.pointerType!==`touch`&&(n.setFocused(!0),n.setFocusedKey(r))},onPress(e){e.pointerType===`touch`&&(n.setFocused(!0),n.setFocusedKey(r))}})),D)for(let e of[`onPressStart`,`onPressEnd`,`onPressChange`,`onPress`,`onPressUp`,`onClick`])D[e]&&(k[e]=xn(k[e],D[e]));let{pressProps:j,isPressed:M}=Bo(k),ee=x?e=>{C.current===`mouse`&&(e.stopPropagation(),e.preventDefault(),O(e))}:void 0,{longPressProps:N}=Ip({isDisabled:!w,onLongPress(e){e.pointerType===`touch`&&(p(e),n.setSelectionBehavior(`toggle`))}}),te=e=>{C.current===`touch`&&T.current&&e.preventDefault()},ne=d!==`none`&&n.isLink(r)?e=>{Yr.isOpening||e.preventDefault()}:void 0,P=V(m,v||b||o&&!c?j:{},w?N:{},{onDoubleClick:ee,onDragStartCapture:te,onClick:ne,id:t},o?{onMouseDown:e=>e.preventDefault()}:void 0),F=e=>{let t=e;for(;t&&t!==i.current;){let e=t.getAttribute(`data-collection`);if(e!=null)return e!==A;t=t.parentElement}return Er(e)},re=P.onPointerDown;P.onPointerDown=e=>{let t=Y(e);if(t&&t!==i.current&&F(t)){e.stopPropagation();return}re?.(e)};let I=P.onMouseDown;return P.onMouseDown=e=>{let t=Y(e);if(t&&t!==i.current&&F(t)){e.stopPropagation();return}I?.(e)},{itemProps:P,isPressed:M,isSelected:n.isSelected(r),isFocused:n.isFocused&&n.focusedKey===r,isDisabled:c,allowsSelection:v,hasAction:S}}function Rp(e){return e===`Enter`}function zp(e){return e===` `}function Bp(e,t){return typeof t.getChildren==`function`?t.getChildren(e.key):e.childNodes}function Vp(e){return Hp(e,0)}function Hp(e,t){if(t<0)return;let n=0;for(let r of e){if(n===t)return r;n++}}function Up(e,t,n){if(t.parentKey===n.parentKey)return t.index-n.index;let r=[...Wp(e,t),t],i=[...Wp(e,n),n],a=r.slice(0,i.length).findIndex((e,t)=>e!==i[t]);return a===-1?r.findIndex(e=>e===n)>=0?1:(i.findIndex(e=>e===t),-1):(t=r[a],n=i[a],t.index-n.index)}function Wp(e,t){let n=[],r=t;for(;r?.parentKey!=null;)r=e.getItem(r.parentKey),r&&n.unshift(r);return n}let Gp=new WeakMap;function Kp(e){let t=Gp.get(e);if(t!=null)return t;let n=0,r=t=>{for(let i of t)i.type===`section`?r(Bp(i,e)):i.type===`item`&&n++};return r(e),Gp.set(e,n),n}function qp(e,t,n){let{key:r}=e,i=Vf.get(t),a=e.isDisabled??t.selectionManager.isDisabled(r),o=e.isSelected??t.selectionManager.isSelected(r),s=e.shouldSelectOnPressUp??i?.shouldSelectOnPressUp,c=e.shouldFocusOnHover??i?.shouldFocusOnHover,l=e.shouldUseVirtualFocus??i?.shouldUseVirtualFocus,u=e.isVirtualized??i?.isVirtualized,d=Vn(),f=Vn(),p={role:`option`,"aria-disabled":a||void 0,"aria-selected":t.selectionManager.selectionMode===`none`?void 0:o,"aria-label":e[`aria-label`],"aria-labelledby":d,"aria-describedby":f},m=t.collection.getItem(r);if(u){let e=Number(m?.index);p[`aria-posinset`]=Number.isNaN(e)?void 0:e+1,p[`aria-setsize`]=Kp(t.collection)}let h=i?.onAction?()=>i?.onAction?.(r):void 0,g=Uf(t,r),{itemProps:_,isPressed:v,isFocused:y,hasAction:b,allowsSelection:x}=Lp({selectionManager:t.selectionManager,key:r,ref:n,shouldSelectOnPressUp:s,allowsDifferentPressOrigin:s&&c,isVirtualized:u,shouldUseVirtualFocus:l,isDisabled:a,onAction:h||m?.props?.onAction?xn(m?.props?.onAction,h):void 0,linkBehavior:i?.linkBehavior,UNSTABLE_itemBehavior:i?.UNSTABLE_itemBehavior,id:g}),{hoverProps:S}=ts({isDisabled:a||!c,onHoverStart(){hi()||(t.selectionManager.setFocused(!0),t.selectionManager.setFocusedKey(r))}}),C=Q(m?.props);delete C.id;let w=Qr(m?.props);return{optionProps:{...p,...V(C,_,S,w),id:g},labelProps:{id:d},descriptionProps:{id:f},isFocused:y,isFocusVisible:y&&t.selectionManager.isFocused&&hi(),isSelected:o,isDisabled:a,isPressed:v,allowsSelection:x,hasAction:b}}function Jp(e){let{heading:t,"aria-label":n}=e,r=B();return{itemProps:{role:`presentation`},headingProps:t?{id:r,role:`presentation`,onMouseDown:e=>{e.preventDefault()}}:{},groupProps:{role:`group`,"aria-label":n,"aria-labelledby":t?r:void 0}}}function Yp(e){let t=R.version.split(`.`);return parseInt(t[0],10)>=19?e:e?`true`:void 0}var Xp=class{constructor(e){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=e;let t=e=>{if(this.keyMap.set(e.key,e),e.childNodes&&e.type===`section`)for(let n of e.childNodes)t(n)};for(let n of e)t(n);let n=null,r=0,i=0;for(let[e,t]of this.keyMap)n?(n.nextKey=e,t.prevKey=n.key):(this.firstKey=e,t.prevKey=void 0),t.type===`item`&&(t.index=r++),(t.type===`section`||t.type===`item`)&&i++,n=t,n.nextKey=void 0;this._size=i,this.lastKey=n?.key??null}*[Symbol.iterator](){yield*this.iterable}get size(){return this._size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey??null:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey??null:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)??null}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){return this.keyMap.get(e)?.childNodes||[]}},Zp=class e extends Set{constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n??t.anchorKey,this.currentKey=r??t.currentKey):(this.anchorKey=n??null,this.currentKey=r??null)}};function Qp(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function $p(e){let{selectionMode:t=`none`,disallowEmptySelection:n=!1,allowDuplicateSelectionEvents:r,selectionBehavior:i=`toggle`,disabledBehavior:a=`all`}=e,o=(0,R.useRef)(!1),[,s]=(0,R.useState)(!1),c=(0,R.useRef)(null),l=(0,R.useRef)(null),[,u]=(0,R.useState)(null),[d,f]=ta((0,R.useMemo)(()=>em(e.selectedKeys),[e.selectedKeys]),(0,R.useMemo)(()=>em(e.defaultSelectedKeys,new Zp),[e.defaultSelectedKeys]),e.onSelectionChange),p=(0,R.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),[m,h]=(0,R.useState)(i);i===`replace`&&m===`toggle`&&typeof d==`object`&&d.size===0&&h(`replace`);let g=(0,R.useRef)(i);return(0,R.useEffect)(()=>{i!==g.current&&(h(i),g.current=i)},[i]),{selectionMode:t,disallowEmptySelection:n,selectionBehavior:m,setSelectionBehavior:h,get isFocused(){return o.current},setFocused(e){o.current=e,s(e)},get focusedKey(){return c.current},get childFocusStrategy(){return l.current},setFocusedKey(e,t=`first`){c.current=e,l.current=t,u(e)},selectedKeys:d,setSelectedKeys(e){(r||!Qp(e,d))&&f(e)},disabledKeys:p,disabledBehavior:a}}function em(e,t){return e?e===`all`?`all`:new Zp(e):t}var tm=class e{constructor(e,t,n){this.collection=e,this.state=t,this.allowsCellSelection=n?.allowsCellSelection??!1,this._isSelectAll=null,this.layoutDelegate=n?.layoutDelegate||null,this.fullCollection=n?.fullCollection||null}get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(e==null||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return this.state.selectedKeys===`all`?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){if(this.state.selectionMode===`none`)return!1;let t=this.getKey(e);return t==null?!1:this.state.selectedKeys===`all`?this.canSelectItem(t):this.state.selectedKeys.has(t)}get isEmpty(){return this.state.selectedKeys!==`all`&&this.state.selectedKeys.size===0}get isSelectAll(){if(this.isEmpty)return!1;if(this.state.selectedKeys===`all`)return!0;if(this._isSelectAll!=null)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(e=>t.has(e)),this._isSelectAll}get firstSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let n=this.collection.getItem(t);(!e||n&&Up(this.collection,n,e)<0)&&(e=n)}return e?.key??null}get lastSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let n=this.collection.getItem(t);(!e||n&&Up(this.collection,n,e)>0)&&(e=n)}return e?.key??null}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){if(this.selectionMode===`none`)return;if(this.selectionMode===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n;if(this.state.selectedKeys===`all`)n=new Zp([t],t,t);else{let e=this.state.selectedKeys,r=e.anchorKey??t;n=new Zp(e,r,t);for(let i of this.getKeyRange(r,e.currentKey??t))n.delete(i);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&n.add(e)}this.state.setSelectedKeys(n)}getKeyRange(e,t){let n=this.collection.getItem(e),r=this.collection.getItem(t);return n&&r?Up(this.collection,n,r)<=0?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){if(this.layoutDelegate?.getKeyRange)return this.layoutDelegate.getKeyRange(e,t);let n=[],r=e;for(;r!=null;){let e=this.collection.getItem(r);if(e&&(e.type===`item`||e.type===`cell`&&this.allowsCellSelection)&&n.push(r),r===t)return n;r=this.collection.getKeyAfter(r)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||t.type===`cell`&&this.allowsCellSelection)return e;for(;t&&t.type!==`item`&&t.parentKey!=null;)t=this.collection.getItem(t.parentKey);return!t||t.type!==`item`?null:t.key}toggleSelection(e){if(this.selectionMode===`none`)return;if(this.selectionMode===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Zp(this.state.selectedKeys===`all`?this.getSelectAllKeys():this.state.selectedKeys);n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Zp([t],t,t):new Zp;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode===`none`)return;let t=new Zp;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode===`single`))break}this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=this.fullCollection??this.collection,t=[],n=r=>{for(;r!=null;){if(this.canSelectItemIn(r,e)){let i=e.getItem(r);i?.type===`item`&&t.push(r),i?.hasChildNodes&&(this.allowsCellSelection||i.type!==`item`)&&n(Vp(Bp(i,e))?.key??null)}r=e.getKeyAfter(r)}};return n(e.getFirstKey()),t}selectAll(){!this.isSelectAll&&this.selectionMode===`multiple`&&this.state.setSelectedKeys(`all`)}clearSelection(){!this.disallowEmptySelection&&(this.state.selectedKeys===`all`||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new Zp)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode!==`none`&&(this.selectionMode===`single`?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior===`toggle`||t&&(t.pointerType===`touch`||t.pointerType===`virtual`)?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){return this.canSelectItemIn(e,this.collection)}canSelectItemIn(e,t){if(this.state.selectionMode===`none`||this.state.disabledKeys.has(e))return!1;let n=t.getItem(e);return!(!n||n?.props?.isDisabled||n.type===`cell`&&!this.allowsCellSelection)}isDisabled(e){let t=this.collection.getItem(e);return this.state.disabledBehavior===`all`&&(this.state.disabledKeys.has(e)||!!t?.props?.isDisabled)&&t?.props?.disabledBehavior!==`selection`}isLink(e){return!!this.collection.getItem(e)?.props?.href}getItemProps(e){return this.collection.getItem(e)?.props}withCollection(t){return new e(t,this.state,{allowsCellSelection:this.allowsCellSelection,layoutDelegate:this.layoutDelegate||void 0,fullCollection:this.fullCollection??this.collection})}},nm=class{build(e,t){return this.context=t,rm(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:n}=e;if(R.default.isValidElement(t)&&t.type===R.default.Fragment)yield*this.iterateCollection({children:t.props.children,items:n});else if(typeof t==`function`){if(!n)throw Error(`props.children was a function but props.items is missing`);let e=0;for(let r of n)yield*this.getFullNode({value:r,index:e},{renderer:t}),e++}else{let e=[];R.default.Children.forEach(t,t=>{t&&e.push(t)});let n=0;for(let t of e){let e=this.getFullNode({element:t,index:n},{});for(let t of e)n++,yield t}}}getKey(e,t,n,r){if(e.key!=null)return e.key;if(t.type===`cell`&&t.key!=null)return`${r}${t.key}`;let i=t.value;if(i!=null){let e=i.key??i.id;if(e==null)throw Error(`No key found for item`);return e}return r?`${r}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,n,r){if(R.default.isValidElement(e.element)&&e.element.type===R.default.Fragment){let i=[];R.default.Children.forEach(e.element.props.children,e=>{i.push(e)});let a=e.index??0;for(let e of i)yield*this.getFullNode({element:e,index:a++},t,n,r);return}let i=e.element;if(!i&&e.value&&t&&t.renderer){let n=this.cache.get(e.value);if(n&&(!n.shouldInvalidate||!n.shouldInvalidate(this.context))){n.index=e.index,n.parentKey=r?r.key:null,yield n;return}i=t.renderer(e.value)}if(R.default.isValidElement(i)){let a=i.type;if(typeof a!=`function`&&typeof a.getCollectionNode!=`function`){let e=i.type;throw Error(`Unknown element <${e}> in collection.`)}let o=a.getCollectionNode(i.props,this.context),s=e.index??0,c=o.next();for(;!c.done&&c.value;){let a=c.value;e.index=s;let l=a.key??null;l??=a.element?null:this.getKey(i,e,t,n);let u=[...this.getFullNode({...a,key:l,index:s,wrapper:im(e.wrapper,a.wrapper)},this.getChildState(t,a),n?`${n}${i.key}`:i.key,r)];for(let t of u){if(t.value=a.value??e.value??null,t.value&&this.cache.set(t.value,t),e.type&&t.type!==e.type)throw Error(`Unsupported type <${am(t.type)}> in <${am(r?.type??`unknown parent type`)}>. Only <${am(e.type)}> is supported.`);s++,yield t}c=o.next(u)}return}if(e.key==null||e.type==null)return;let a=this,o={type:e.type,props:e.props,key:e.key,parentKey:r?r.key:null,value:e.value??null,level:(r?.level??0)+ +(r?.type===`item`),index:e.index,rendered:e.rendered,textValue:e.textValue??``,"aria-label":e[`aria-label`],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes||!1,childNodes:rm(function*(){if(!e.hasChildNodes||!e.childNodes)return;let n=0;for(let r of e.childNodes()){r.key!=null&&(r.key=`${o.key}${r.key}`);let e=a.getFullNode({...r,index:n},a.getChildState(t,r),o.key,o);for(let t of e)n++,yield t}})};yield o}constructor(){this.cache=new WeakMap}};function rm(e){let t=[],n=null;return{*[Symbol.iterator](){for(let e of t)yield e;n||=e();for(let e of n)t.push(e),yield e}}}function im(e,t){if(e&&t)return n=>e(t(n));if(e)return e;if(t)return t}function am(e){return e[0].toUpperCase()+e.slice(1)}function om(e,t,n){let r=(0,R.useMemo)(()=>new nm,[]),{children:i,items:a,collection:o}=e;return(0,R.useMemo)(()=>o||t(r.build({children:i,items:a},n)),[r,i,a,o,n,t])}function sm(e){let{filter:t,layoutDelegate:n}=e,r=$p(e),i=(0,R.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),a=om(e,(0,R.useCallback)(e=>t?new Xp(t(e)):new Xp(e),[t]),(0,R.useMemo)(()=>({suppressTextValueWarning:e.suppressTextValueWarning}),[e.suppressTextValueWarning])),o=(0,R.useMemo)(()=>new tm(a,r,{layoutDelegate:n}),[a,r,n]);return lm(a,o),{collection:a,disabledKeys:i,selectionManager:o}}function cm(e,t){let n=(0,R.useMemo)(()=>t?e.collection.filter(t):e.collection,[e.collection,t]),r=e.selectionManager.withCollection(n);return lm(n,r),{collection:n,selectionManager:r,disabledKeys:e.disabledKeys}}function lm(e,t){let n=(0,R.useRef)(null);(0,R.useEffect)(()=>{if(t.focusedKey!=null&&!e.getItem(t.focusedKey)&&n.current){let r=n.current.getKeyAfter(t.focusedKey),i=null;for(;r!=null;){let a=e.getItem(r);if(a&&a.type===`item`&&!t.isDisabled(r)){i=r;break}r=n.current.getKeyAfter(r)}if(i==null)for(r=n.current.getKeyBefore(t.focusedKey);r!=null;){let a=e.getItem(r);if(a&&a.type===`item`&&!t.isDisabled(r)){i=r;break}r=n.current.getKeyBefore(r)}t.setFocusedKey(i)}n.current=e},[e,t])}function um(e,t){let{collection:n,onLoadMore:r,scrollOffset:i=1,direction:a=`end`}=e,o=(0,R.useRef)(null),s=X(e=>{for(let t of e)t.isIntersecting&&r&&r()});z(()=>{if(t.current){let e=100*i,n=a===`start`?`${e}% 0px 0px 0px`:`0px ${e}% ${e}% ${e}%`;o.current=new IntersectionObserver(s,{root:Lc(t?.current),rootMargin:n}),o.current.observe(t.current)}return()=>{o.current&&o.current.disconnect()}},[n,t,i,a])}let dm=(0,R.createContext)(null),fm=(0,R.createContext)(null),pm=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,dm);let n=(0,R.useContext)(fm);return n?R.default.createElement(hm,{state:n,props:e,listBoxRef:t}):R.default.createElement($a,{content:R.default.createElement(uo,e)},n=>R.default.createElement(mm,{props:e,listBoxRef:t,collection:n}))});function mm({props:e,listBoxRef:t,collection:n}){e={...e,collection:n,children:null,items:null};let{layoutDelegate:r}=(0,R.useContext)(_o),i=sm({...e,layoutDelegate:r});return R.default.createElement(hm,{state:i,props:e,listBoxRef:t})}function hm({state:e,props:t,listBoxRef:n}){[t,n]=U(t,n,na);let{dragAndDropHooks:r,layout:i=`stack`,orientation:a=`vertical`,filter:o}=t,s=cm(e,o),{collection:c,selectionManager:l}=s,u=!!r?.useDraggableCollectionState,d=!!r?.useDroppableCollectionState,{direction:f}=Z(),{disabledBehavior:p,disabledKeys:m}=l,h=Np({usage:`search`,sensitivity:`base`}),{isVirtualized:g,layoutDelegate:_,dropTargetDelegate:v,CollectionRoot:y}=(0,R.useContext)(_o),b=(0,R.useMemo)(()=>t.keyboardDelegate||new jp({collection:c,collator:h,ref:n,disabledKeys:m,disabledBehavior:p,layout:i,orientation:a,direction:f,layoutDelegate:_}),[c,h,n,p,m,a,f,t.keyboardDelegate,i,_]),{listBoxProps:x}=Fp({...t,shouldSelectOnPressUp:u||t.shouldSelectOnPressUp,keyboardDelegate:b,isVirtualized:g},s,n);(0,R.useRef)(u),(0,R.useRef)(d),(0,R.useEffect)(()=>{},[u,d]);let S,C,w,T=!1,E=null,D=(0,R.useRef)(null);if(u&&r){S=r.useDraggableCollectionState({collection:c,selectionManager:l,preview:r.renderDragPreview?D:void 0}),r.useDraggableCollection({},S,n);let e=r.DragPreview;E=r.renderDragPreview?R.default.createElement(e,{ref:D},r.renderDragPreview):null}if(d&&r){C=r.useDroppableCollectionState({collection:c,selectionManager:l});let e=r.dropTargetDelegate||v||new r.ListDropTargetDelegate(c,n,{orientation:a,layout:i,direction:f});w=r.useDroppableCollection({keyboardDelegate:b,dropTargetDelegate:e},C,n),T=C.isDropTarget({type:`root`})}let{focusProps:O,isFocused:k,isFocusVisible:A}=Yo(),j=s.collection.size===0,M={isDropTarget:T,isEmpty:j,isFocused:k,isFocusVisible:A,layout:t.layout||`stack`,orientation:a,state:s},ee=H({...t,children:void 0,defaultClassName:`react-aria-ListBox`,values:M}),N=null;j&&t.renderEmptyState&&(N=R.default.createElement(`div`,{role:`option`,style:{display:`contents`}},t.renderEmptyState(M)));let te=Q(t,{global:!0});return R.default.createElement(Jf,null,R.default.createElement(W.div,{...V(te,ee,x,O,w?.collectionProps),ref:n,slot:t.slot||void 0,onScroll:t.onScroll,"data-drop-target":T||void 0,"data-empty":j||void 0,"data-focused":k||void 0,"data-focus-visible":A||void 0,"data-layout":t.layout||`stack`,"data-orientation":a},R.default.createElement(Jn,{values:[[dm,t],[fm,s],[jf,{dragAndDropHooks:r,dragState:S,dropState:C}],[Bf,{elementType:`div`}],[Mf,{render:vm}],[po,{name:`ListBoxSection`,render:gm}]]},R.default.createElement(Rf,null,R.default.createElement(y,{collection:c,scrollRef:n,persistedKeys:Ff(l,r,C),renderDropIndicator:Pf(r,C)}))),N,E))}function gm(e,t,n,r=`react-aria-ListBoxSection`){let i=(0,R.useContext)(fm),{dragAndDropHooks:a,dropState:o}=(0,R.useContext)(jf),{CollectionBranch:s}=(0,R.useContext)(_o),[c,l]=Xn(),{headingProps:u,groupProps:d}=Jp({heading:l,"aria-label":e[`aria-label`]??void 0}),f=H({...e,id:void 0,children:void 0,defaultClassName:r,values:void 0}),p=Q(e,{global:!0});return delete p.id,R.default.createElement(W.section,{...V(p,f,d),ref:t},R.default.createElement(If.Provider,{value:{...u,ref:c}},R.default.createElement(s,{collection:i.collection,parent:n,renderDropIndicator:Pf(a,o)})))}let _m=so(sa,function(e,t,n){let r=Kn(t),i=(0,R.useContext)(fm),{dragAndDropHooks:a,dragState:o,dropState:s}=(0,R.useContext)(jf),c=o&&!(o.isDisabled||o.selectionManager.isDisabled(n.key)),{optionProps:l,labelProps:u,descriptionProps:d,...f}=qp({key:n.key,"aria-label":e?.[`aria-label`]},i,r),{hoverProps:p,isHovered:m}=ts({isDisabled:!f.allowsSelection&&!f.hasAction&&!c,onHoverStart:n.props.onHoverStart,onHoverChange:n.props.onHoverChange,onHoverEnd:n.props.onHoverEnd}),{keyboardProps:h}=Fa(e),{focusProps:g}=xa(e),_=null;o&&a&&(_=a.useDraggableItem({key:n.key,hasAction:f.hasAction},o));let v=null;s&&a&&(v=a.useDroppableItem({target:{type:`item`,key:n.key,dropPosition:`on`}},s,r));let y=o&&o.isDragging(n.key),b=H({...e,id:void 0,children:e.children,defaultClassName:`react-aria-ListBoxItem`,values:{...f,isHovered:m,selectionMode:i.selectionManager.selectionMode,selectionBehavior:i.selectionManager.selectionBehavior,allowsDragging:!!o,isDragging:y,isDropTarget:v?.isDropTarget}});(0,R.useEffect)(()=>{n.textValue},[n.textValue]);let x=e.href?W.a:W.div,S=Q(e,{global:!0});return delete S.id,delete S.onClick,e.href&&l.tabIndex==null&&(l.tabIndex=-1),R.default.createElement(x,{...V(S,b,l,p,h,g,_?.dragProps,v?.dropProps),ref:r,"data-allows-dragging":!!o||void 0,"data-selected":f.isSelected||void 0,"data-disabled":f.isDisabled||void 0,"data-hovered":m||void 0,"data-focused":f.isFocused||void 0,"data-focus-visible":f.isFocusVisible||void 0,"data-pressed":f.isPressed||void 0,"data-dragging":y||void 0,"data-drop-target":v?.isDropTarget||void 0,"data-selection-mode":i.selectionManager.selectionMode===`none`?void 0:i.selectionManager.selectionMode},R.default.createElement(Jn,{values:[[zs,{slots:{[qn]:u,label:u,description:d}}],[zf,{isSelected:f.isSelected}]]},b.children))});function vm(e,t){t=Kn(t);let{dragAndDropHooks:n,dropState:r}=(0,R.useContext)(jf),{dropIndicatorProps:i,isHidden:a,isDropTarget:o}=n.useDropIndicator(e,r,t);return a?null:R.default.createElement(bm,{...e,dropIndicatorProps:i,isDropTarget:o,ref:t})}function ym(e,t){let{dropIndicatorProps:n,isDropTarget:r,...i}=e,a=H({...i,defaultClassName:`react-aria-DropIndicator`,values:{isDropTarget:r}});return R.default.createElement(R.default.Fragment,null,R.default.createElement(W.div,{...n,...a,role:`option`,ref:t,"data-drop-target":r||void 0}))}let bm=(0,R.forwardRef)(ym);so(oa,function(e,t,n){let r=(0,R.useContext)(fm),{isLoading:i,onLoadMore:a,scrollOffset:o,...s}=e,c=(0,R.useRef)(null);um((0,R.useMemo)(()=>({onLoadMore:a,collection:r?.collection,sentinelRef:c,scrollOffset:o}),[a,o,r?.collection]),c);let l=H({...s,id:void 0,children:n.rendered,defaultClassName:`react-aria-ListBoxLoadingIndicator`,values:void 0});return R.default.createElement(R.default.Fragment,null,R.default.createElement(`div`,{style:{position:`relative`,width:0,height:0},inert:Yp(!0)},R.default.createElement(`div`,{"data-testid":`loadMoreSentinel`,ref:c,style:{position:`absolute`,height:1,width:1}})),i&&l.children&&R.default.createElement(R.default.Fragment,null,R.default.createElement(W.div,{...V(Q(e,{global:!0}),{tabIndex:-1}),...l,role:`option`,ref:t},l.children)))});let xm=(0,R.createContext)({placement:`bottom`}),Sm=typeof HTMLElement<`u`&&`inert`in HTMLElement.prototype;function Cm(e){return e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer!==void 0}let wm=new WeakMap,Tm=[];function Em(e,t){let n=K(e?.[0]),r=t instanceof n.Element?{root:t}:t,i=r?.root??document.body,a=r?.shouldUseInert&&Sm,o=new Set(e),s=new Set,c=e=>a&&e instanceof n.HTMLElement?e.inert:e.getAttribute(`aria-hidden`)===`true`,l=(e,t)=>{a&&e instanceof n.HTMLElement?e.inert=t:t?e.setAttribute(`aria-hidden`,`true`):(e.removeAttribute(`aria-hidden`),e instanceof n.HTMLElement&&(e.inert=!1))},u=new Set;if(or()){let t=i.getRootNode();for(let n of e){let e=n.getRootNode();for(;rr(e)&&e!==t;)u.add(e),e=e.host.getRootNode()}}let d=e=>{for(let t of e.querySelectorAll(`[data-live-announcer], [data-react-aria-top-layer]`))o.add(t);let t=e=>{if(s.has(e)||o.has(e)||e.parentElement&&s.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of o)if(q(e,t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},n=Gf(G(e),e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),r=t(e);if(r===NodeFilter.FILTER_ACCEPT&&f(e),r!==NodeFilter.FILTER_REJECT){let e=n.nextNode();for(;e!=null;)f(e),e=n.nextNode()}},f=e=>{let t=wm.get(e)??0;c(e)&&t===0||(t===0&&l(e,!0),s.add(e),wm.set(e,t+1))};Tm.length&&Tm[Tm.length-1].disconnect(),d(i);let p=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>q(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Cm(e)?o.add(e):e instanceof Element&&d(e);if(or()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});p.observe(i,{childList:!0,subtree:!0});let m=new Set;if(or())for(let e of u){let t=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){if(t.target.isConnected&&![...o,...s].some(e=>q(e,t.target)))for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&Cm(e)?o.add(e):e instanceof Element&&d(e);if(or()){for(let e of u)if(!e.isConnected){p.disconnect();break}}}});t.observe(e,{childList:!0,subtree:!0}),m.add(t)}let h={visibleNodes:o,hiddenNodes:s,observe(){p.observe(i,{childList:!0,subtree:!0})},disconnect(){p.disconnect()}};return Tm.push(h),()=>{if(p.disconnect(),or())for(let e of m)e.disconnect();for(let e of s){let t=wm.get(e);t!=null&&(t===1?(l(e,!1),wm.delete(e)):wm.set(e,t-1))}h===Tm[Tm.length-1]?(Tm.pop(),Tm.length&&Tm[Tm.length-1].observe()):Tm.splice(Tm.indexOf(h),1)}}function Dm(e){let t=Tm[Tm.length-1];if(t&&!t.visibleNodes.has(e))return t.visibleNodes.add(e),()=>{t.visibleNodes.delete(e)}}let Om={top:`top`,bottom:`top`,left:`left`,right:`left`},km={top:`bottom`,bottom:`top`,left:`right`,right:`left`},Am={top:`left`,left:`top`},jm={top:`height`,left:`width`},Mm={width:`totalWidth`,height:`totalHeight`},Nm={},Pm=()=>typeof document<`u`?window.visualViewport:null;function Fm(e,t){let n=0,r=0,i=0,a=0,o=0,s=0,c={},l=(t?.scale??1)>1;if(e.tagName===`BODY`||e.tagName===`HTML`){let l=document.documentElement;i=l.clientWidth,a=l.clientHeight,n=t?.width??i,r=t?.height??a,c.top=l.scrollTop||e.scrollTop,c.left=l.scrollLeft||e.scrollLeft,t&&(o=Math.max(0,t.pageTop-(c.top??0)),s=Math.max(0,t.pageLeft-(c.left??0)))}else({width:n,height:r,top:o,left:s}=Km(e,!1)),c.top=e.scrollTop,c.left=e.scrollLeft,i=n,a=r;return Vr()&&(e.tagName===`BODY`||e.tagName===`HTML`)&&l&&(c.top=0,c.left=0,o=t?.pageTop??0,s=t?.pageLeft??0),{width:n,height:r,totalWidth:i,totalHeight:a,scroll:c,top:o,left:s}}function Im(e){return{top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}}function Lm(e,t,n,r,i,a,o){let s=i.scroll[e]??0,c=r[jm[e]],l=o[e]+r.scroll[Om[e]]+a,u=o[e]+r.scroll[Om[e]]+c-a,d=t-s+r.scroll[Om[e]]+o[e]-r[Om[e]],f=t-s+n+r.scroll[Om[e]]+o[e]-r[Om[e]];return d<l?l-d:f>u?Math.max(u-f,l-d):0}function Rm(e){let t=window.getComputedStyle(e);return{top:parseInt(t.marginTop,10)||0,bottom:parseInt(t.marginBottom,10)||0,left:parseInt(t.marginLeft,10)||0,right:parseInt(t.marginRight,10)||0}}function zm(e){if(Nm[e])return Nm[e];let[t,n]=e.split(` `),r=Om[t]||`right`,i=Am[r];Om[n]||(n=`center`);let a=jm[r],o=jm[i];return Nm[e]={placement:t,crossPlacement:n,axis:r,crossAxis:i,size:a,crossSize:o},Nm[e]}function Bm(e,t,n,r,i,a,o,s,c,l,u){let{placement:d,crossPlacement:f,axis:p,crossAxis:m,size:h,crossSize:g}=r,_={};_[m]=e[m]??0,f===`center`?_[m]+=((e[g]??0)-(n[g]??0))/2:f!==m&&(_[m]+=(e[g]??0)-(n[g]??0)),_[m]+=a;let v=e[m]-n[g]+c+l,y=e[m]+e[g]-c-l;if(_[m]=Cs(_[m],v,y),d===p){let t=s?u[h]:u[Mm[h]];_[km[p]]=Math.floor(t-e[p]+i)}else _[p]=Math.floor(e[p]+e[h]+i);return _}function Vm(e,t,n,r,i,a,o,s,c,l,u){let d=(e.top==null?c[Mm.height]-(e.bottom??0)-o:e.top)-(c.scroll.top??0),f=l?n.top:0,p={top:Math.max(t.top+f,(u?.offsetTop??t.top)+f),bottom:Math.min(t.top+t.height+f,(u?.offsetTop??0)+(u?.height??0))};return s===`top`?Math.max(0,d+o-p.top-((i.top??0)+(i.bottom??0)+a)):Math.max(0,p.bottom-d-((i.top??0)+(i.bottom??0)+a))}function Hm(e,t,n,r,i,a,o,s){let{placement:c,axis:l,size:u}=a;return c===l?Math.max(0,n[l]-(o.scroll[l]??0)-(e[l]+(s?t[l]:0))-(r[l]??0)-r[km[l]]-i):Math.max(0,e[u]+e[l]+(s?t[l]:0)-n[l]-n[u]+(o.scroll[l]??0)-(r[l]??0)-r[km[l]]-i)}function Um(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_){let v=zm(e),{size:y,crossAxis:b,crossSize:x,placement:S,crossPlacement:C}=v,w=Bm(t,s,n,v,u,d,l,f,m,h,c),T=u,E=Hm(s,l,t,i,a+u,v,c,g);if(o&&n[y]>E){let e=zm(`${km[S]} ${C}`),r=Bm(t,s,n,e,u,d,l,f,m,h,c);Hm(s,l,t,i,a+u,e,c,g)>E&&(v=e,w=r,T=u)}let D=`bottom`;v.axis===`top`?v.placement===`top`?D=`top`:v.placement===`bottom`&&(D=`bottom`):v.crossAxis===`top`&&(v.crossPlacement===`top`?D=`bottom`:v.crossPlacement===`bottom`&&(D=`top`));let O=Lm(b,w[b],n[x],s,c,a,l);w[b]+=O;let k=Vm(w,s,l,f,i,a,n.height,D,c,g,_);p&&p<k&&(k=p),n.height=Math.min(n.height,k),w=Bm(t,s,n,v,T,d,l,f,m,h,c),O=Lm(b,w[b],n[x],s,c,a,l),w[b]+=O;let A={},j=t[b]-w[b]-i[Om[b]],M=j+.5*t[x],ee=m/2+h,N=Om[b]===`left`?(i.left??0)+(i.right??0):(i.top??0)+(i.bottom??0),te=n[x]-N-m/2-h;A[b]=Cs(Cs(M,t[b]+m/2-(w[b]+i[Om[b]]),t[b]+t[x]-m/2-(w[b]+i[Om[b]])),ee,te),{placement:S,crossPlacement:C}=v,m?j=A[b]:C===`right`?j+=t[x]:C===`center`&&(j+=t[x]/2);let ne=S===`left`||S===`top`?n[y]:0,P={x:S===`top`||S===`bottom`?j:ne,y:S===`left`||S===`right`?j:ne};return{position:w,maxHeight:k,arrowOffsetLeft:A.left,arrowOffsetTop:A.top,placement:S,triggerAnchorPoint:P}}function Wm(e){let{placement:t,targetNode:n,overlayNode:r,scrollNode:i,padding:a,shouldFlip:o,boundaryElement:s,offset:c,crossOffset:l,maxHeight:u,arrowSize:d=0,arrowBoundaryOffset:f=0,targetRect:p}=e,m=Pm(),h=r instanceof HTMLElement?Jm(r):document.documentElement,g=h===document.documentElement,_=window.getComputedStyle(h).position,v=!!_&&_!==`static`,y=g?Km(n,!1,p):qm(n,h,!1,p);if(!g){let{marginTop:e,marginLeft:t}=window.getComputedStyle(n);y.top+=parseInt(e,10)||0,y.left+=parseInt(t,10)||0}let b=Km(r,!0),x=Rm(r);b.width+=(x.left??0)+(x.right??0),b.height+=(x.top??0)+(x.bottom??0);let S=Im(i),C=Fm(s,m),w=Fm(h,m),T;if((s.tagName===`BODY`||s.tagName===`HTML`)&&!g){let e=Gm(h,!1);T={top:-(e.top-C.top),left:-(e.left-C.left),width:0,height:0}}else T=(s.tagName===`BODY`||s.tagName===`HTML`)&&g?{top:0,left:0,width:0,height:0}:qm(s,h,!1);let E=q(s,h);return Um(t,y,b,S,x,a,o,C,w,T,c,l,v,u,d,f,E,m)}function Gm(e,t){let{top:n,left:r,width:i,height:a}=e.getBoundingClientRect();return t&&e instanceof e.ownerDocument.defaultView.HTMLElement&&(i=e.offsetWidth,a=e.offsetHeight),{top:n,left:r,width:i,height:a}}function Km(e,t,n){let{top:r,left:i,width:a,height:o}=n||Gm(e,t),{scrollTop:s,scrollLeft:c,clientTop:l,clientLeft:u}=document.documentElement;return{top:r+s-l,left:i+c-u,width:a,height:o}}function qm(e,t,n,r){let i=window.getComputedStyle(e),a;if(i.position===`fixed`)a=r||Gm(e,n);else{a=Km(e,n,r);let i=Km(t,n),o=window.getComputedStyle(t);i.top+=(parseInt(o.borderTopWidth,10)||0)-t.scrollTop,i.left+=(parseInt(o.borderLeftWidth,10)||0)-t.scrollLeft,a.top-=i.top,a.left-=i.left}return a.top-=parseInt(i.marginTop,10)||0,a.left-=parseInt(i.marginLeft,10)||0,a}function Jm(e){let t=e.offsetParent;if(t&&t===document.body&&window.getComputedStyle(t).position===`static`&&!Ym(t)&&(t=document.documentElement),t==null)for(t=e.parentElement;t&&!Ym(t);)t=t.parentElement;return t||document.documentElement}function Ym(e){let t=window.getComputedStyle(e);return t.transform!==`none`||/transform|perspective/.test(t.willChange)||t.filter!==`none`||t.contain===`paint`||`backdropFilter`in t&&t.backdropFilter!==`none`||`WebkitBackdropFilter`in t&&t.WebkitBackdropFilter!==`none`}let Xm=new WeakMap;function Zm(e){let{triggerRef:t,isOpen:n,onClose:r}=e;(0,R.useEffect)(()=>!n||r===null?void 0:ir(sr(t.current),`scroll`,e=>{let n=Y(e);if(!t.current||n instanceof Node&&!q(n,t.current)||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement)return;let i=r||Xm.get(t.current);i&&i()},!0),[n,r,t])}function Qm(){return window.ResizeObserver!==void 0}function $m(e){let{ref:t,box:n,onResize:r}=e,i=X(r);(0,R.useEffect)(()=>{let e=t?.current;if(e){if(Qm()){let t=new window.ResizeObserver(e=>{e.length&&i()});return t.observe(e,{box:n}),()=>{e&&t.unobserve(e)}}return window.addEventListener(`resize`,i,!1),()=>{window.removeEventListener(`resize`,i,!1)}}},[t,n])}let eh=typeof document<`u`?window.visualViewport:null;function th(e){let{direction:t}=Z(),{arrowSize:n,targetRef:r,overlayRef:i,arrowRef:a,scrollRef:o=i,placement:s=`bottom`,containerPadding:c=12,shouldFlip:l=!0,boundaryElement:u=typeof document<`u`?document.body:null,offset:d=0,crossOffset:f=0,shouldUpdatePosition:p=!0,isOpen:m=!0,onClose:h,maxHeight:g,arrowBoundaryOffset:_=0,getTargetRect:v}=e,[y,b]=(0,R.useState)(null),x=[p,s,i.current,r.current,a?.current,o.current,c,l,u,d,f,m,t,g,_,n],S=(0,R.useRef)(eh?.scale);(0,R.useEffect)(()=>{m&&(S.current=eh?.scale)},[m]);let C=(0,R.useCallback)(()=>{if(p===!1||!m||!i.current||!r.current||!u||eh?.scale!==S.current)return;let e=null;if(o.current&&cr(o.current)){let t=J()?.getBoundingClientRect(),n=o.current.getBoundingClientRect();e={type:`top`,offset:(t?.top??0)-n.top},e.offset>n.height/2&&(e.type=`bottom`,e.offset=(t?.bottom??0)-n.bottom)}let h=i.current;!g&&i.current&&(h.style.top=`0px`,h.style.bottom=``,h.style.maxHeight=(window.visualViewport?.height??window.innerHeight)+`px`);let y=Wm({placement:rh(s,t),overlayNode:i.current,targetNode:r.current,scrollNode:o.current||i.current,padding:c,shouldFlip:l,boundaryElement:u,offset:d,crossOffset:f,maxHeight:g,arrowSize:n??(a?.current?Gm(a.current,!0).width:0),arrowBoundaryOffset:_,targetRect:v?.(r.current)});if(!y.position)return;h.style.top=``,h.style.bottom=``,h.style.left=``,h.style.right=``,Object.keys(y.position).forEach(e=>h.style[e]=y.position[e]+`px`),h.style.maxHeight=y.maxHeight==null?``:y.maxHeight+`px`;let x=J();if(e&&x&&o.current){let t=x.getBoundingClientRect(),n=o.current.getBoundingClientRect(),r=t[e.type]-n[e.type];o.current.scrollTop+=r-e.offset}b(y)},x);z(C,x),nh(C),$m({ref:i,onResize:C}),$m({ref:r,onResize:C});let w=(0,R.useRef)(!1);z(()=>{let e,t=()=>{w.current=!0,clearTimeout(e),e=setTimeout(()=>{w.current=!1},500),C()},n=()=>{w.current&&t()};eh?.addEventListener(`resize`,t),eh?.addEventListener(`scroll`,n);let r=ir(sr(window),`scroll`,n);return()=>{eh?.removeEventListener(`resize`,t),eh?.removeEventListener(`scroll`,n),r()}},[C]);let T=(0,R.useCallback)(()=>{w.current||h?.()},[h,w]);return Zm({triggerRef:r,isOpen:m,onClose:h&&T}),{overlayProps:{style:{position:y?`absolute`:`fixed`,top:y?void 0:0,left:y?void 0:0,zIndex:1e5,...y?.position,maxHeight:y?.maxHeight??`100vh`}},placement:y?.placement??null,triggerAnchorPoint:y?.triggerAnchorPoint??null,arrowProps:{"aria-hidden":`true`,role:`presentation`,style:{left:y?.arrowOffsetLeft,top:y?.arrowOffsetTop}},updatePosition:C}}function nh(e){z(()=>(window.addEventListener(`resize`,e,!1),()=>{window.removeEventListener(`resize`,e,!1)}),[e])}function rh(e,t){return t===`rtl`?e.replace(`start`,`right`).replace(`end`,`left`):e.replace(`start`,`left`).replace(`end`,`right`)}function ih(e){let{ref:t,onInteractOutside:n,isDisabled:r,onInteractOutsideStart:i}=e,a=(0,R.useRef)({isPointerDown:!1,ignoreEmulatedMouseEvents:!1}),o=X(e=>{n&&ah(e,t)&&(i&&i(e),a.current.isPointerDown=!0)}),s=X(e=>{n&&n(e)});(0,R.useEffect)(()=>{let e=a.current;if(r)return;let n=t.current,i=G(n);if(typeof PointerEvent<`u`){let n=n=>{e.isPointerDown&&ah(n,t)&&s(n),e.isPointerDown=!1};return i.addEventListener(`pointerdown`,o,!0),i.addEventListener(`click`,n,!0),()=>{i.removeEventListener(`pointerdown`,o,!0),i.removeEventListener(`click`,n,!0)}}},[t,r])}function ah(e,t){if(e.button>0)return!1;let n=Y(e);if(n){let e=n.ownerDocument;if(!e||!q(e.documentElement,n)||n.closest(`[data-react-aria-top-layer]`))return!1}return t.current?!e.composedPath().includes(t.current):!1}let oh=[];function sh(e,t){let{onClose:n,shouldCloseOnBlur:r,isOpen:i,isDismissable:a=!1,isKeyboardDismissDisabled:o=!1,shouldCloseOnInteractOutside:s}=e,c=(0,R.useRef)(void 0);(0,R.useEffect)(()=>{if(i&&!oh.includes(t))return oh.push(t),()=>{let e=oh.indexOf(t);e>=0&&oh.splice(e,1)}},[i,t]);let l=()=>{oh[oh.length-1]===t&&n&&n()},u=e=>{let n=oh[oh.length-1];c.current=n,(!s||s(Y(e)))&&n===t&&e.stopPropagation()},d=e=>{(!s||s(Y(e)))&&(oh[oh.length-1]===t&&e.stopPropagation(),c.current===t&&l()),c.current=void 0},{keyboardProps:f}=Fa({shortcuts:{Escape:()=>{if(!o){l();return}return!1}}});ih({ref:t,onInteractOutside:a&&i?d:void 0,onInteractOutsideStart:u});let{focusWithinProps:p}=Jo({isDisabled:!r,onBlurWithin:e=>{e.relatedTarget&&!ip(e.relatedTarget)&&(!s||s(e.relatedTarget))&&n?.()}});return{overlayProps:{...f,...p},underlayProps:{}}}let ch=typeof document<`u`&&window.visualViewport,lh=0,uh;function dh(e={}){let{isDisabled:t}=e;z(()=>{if(!t)return lh++,lh===1&&(uh=zr()&&Vr()?ph():fh()),()=>{lh--,lh===0&&uh()}},[t])}function fh(){let e=window.innerWidth-document.documentElement.clientWidth;return xn(e>0&&(`scrollbarGutter`in document.documentElement.style?ar(document.documentElement,`scrollbar-gutter`,`stable`):ar(document.documentElement,`padding-right`,`${e}px`)),ar(document.documentElement,`overflow`,`hidden`))}function ph(){let e=ar(document.documentElement,`overflow`,`hidden`),t,n=!1,r=e=>{let r=Y(e);t=Ic(r)?r:Lc(r,!0),n=!1;let i=r.ownerDocument.defaultView.getSelection();i&&!i.isCollapsed&&i.containsNode(r,!0)&&(n=!0),e.composedPath().some(e=>e instanceof HTMLInputElement&&e.type===`range`)&&(n=!0),`selectionStart`in r&&`selectionEnd`in r&&r.selectionStart<r.selectionEnd&&r.ownerDocument.activeElement===r&&(n=!0)},i=document.createElement(`style`),a=Mo();a&&(i.nonce=a),i.textContent=`@layer {
  * {
    overscroll-behavior: contain;
  }
}`,document.head.prepend(i);let o=e=>{if(!(e.touches.length===2||n)){if(!t||t===document.documentElement||t===document.body){e.preventDefault();return}t.scrollHeight===t.clientHeight&&t.scrollWidth===t.clientWidth&&e.preventDefault()}},s=e=>{let t=Y(e),n=e.relatedTarget;n&&Ci(n)?(n.focus({preventScroll:!0}),mh(n,Ci(t))):n||(t.parentElement?.closest(`[tabindex]`))?.focus({preventScroll:!0})},c=HTMLElement.prototype.focus;Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:function(e){let t=J(),n=t!=null&&Ci(t);c.call(this,{...e,preventScroll:!0}),(!e||!e.preventScroll)&&mh(this,n)}});let l=xn(ir(document,`touchstart`,r,{passive:!1,capture:!0}),ir(document,`touchmove`,o,{passive:!1,capture:!0}),ir(document,`blur`,s,!0));return()=>{e(),l(),i.remove(),Reflect.defineProperty(HTMLElement.prototype,"focus",{configurable:!0,writable:!0,value:c})}}function mh(e,t){t||!ch?hh(e):ch.addEventListener(`resize`,()=>hh(e),{once:!0})}function hh(e){let t=document.scrollingElement||document.documentElement,n=e;for(;n&&n!==t;){let e=Lc(n);if(e!==document.documentElement&&e!==document.body&&e!==n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();if(r.top<t.top||r.bottom>t.top+n.clientHeight){let n=t.bottom;ch&&(n=Math.min(n,ch.offsetTop+ch.height));let i=r.top-t.top-((n-t.top)/2-r.height/2);e.scrollTo({top:Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+i)),behavior:`smooth`})}}n=e.parentElement}}function gh(e,t){let{triggerRef:n,popoverRef:r,groupRef:i,isNonModal:a,isKeyboardDismissDisabled:o,shouldCloseOnInteractOutside:s,...c}=e,l=c.trigger===`SubmenuTrigger`,{overlayProps:u,underlayProps:d}=sh({isOpen:t.isOpen,onClose:t.close,shouldCloseOnBlur:!0,isDismissable:!a||l,isKeyboardDismissDisabled:o,shouldCloseOnInteractOutside:s},i??r),{overlayProps:f,arrowProps:p,placement:m,triggerAnchorPoint:h}=th({...c,targetRef:n,overlayRef:r,isOpen:t.isOpen,onClose:a&&!l?t.close:null,getTargetRect:c.getTargetRect??(t.point?()=>new DOMRect(t.point.x,t.point.y,0,0):void 0)});dh({isDisabled:a||!t.isOpen}),(0,R.useEffect)(()=>{if(t.isOpen&&r.current)return a?Dm(i?.current??r.current):Em([i?.current??r.current],{shouldUseInert:!0})},[a,t.isOpen,r,i]);let{focusWithinProps:g}=Jo(e);return{popoverProps:V(u,f,g),arrowProps:p,underlayProps:d,placement:m,triggerAnchorPoint:h}}var _h={};_h={dismiss:`تجاهل`};var vh={};vh={dismiss:`Отхвърляне`};var yh={};yh={dismiss:`Odstranit`};var bh={};bh={dismiss:`Luk`};var xh={};xh={dismiss:`Schließen`};var Sh={};Sh={dismiss:`Απόρριψη`};var Ch={};Ch={dismiss:`Dismiss`};var wh={};wh={dismiss:`Descartar`};var Th={};Th={dismiss:`Lõpeta`};var Eh={};Eh={dismiss:`Hylkää`};var Dh={};Dh={dismiss:`Rejeter`};var Oh={};Oh={dismiss:`התעלם`};var kh={};kh={dismiss:`Odbaci`};var Ah={};Ah={dismiss:`Elutasítás`};var jh={};jh={dismiss:`Ignora`};var Mh={};Mh={dismiss:`閉じる`};var Nh={};Nh={dismiss:`무시`};var Ph={};Ph={dismiss:`Atmesti`};var Fh={};Fh={dismiss:`Nerādīt`};var Ih={};Ih={dismiss:`Lukk`};var Lh={};Lh={dismiss:`Negeren`};var Rh={};Rh={dismiss:`Zignoruj`};var zh={};zh={dismiss:`Descartar`};var Bh={};Bh={dismiss:`Dispensar`};var Vh={};Vh={dismiss:`Revocare`};var Hh={};Hh={dismiss:`Пропустить`};var Uh={};Uh={dismiss:`Zrušiť`};var Wh={};Wh={dismiss:`Opusti`};var Gh={};Gh={dismiss:`Odbaci`};var Kh={};Kh={dismiss:`Avvisa`};var qh={};qh={dismiss:`Kapat`};var Jh={};Jh={dismiss:`Скасувати`};var Yh={};Yh={dismiss:`取消`};var Xh={};Xh={dismiss:`關閉`};var Zh={};Zh={"ar-AE":_h,"bg-BG":vh,"cs-CZ":yh,"da-DK":bh,"de-DE":xh,"el-GR":Sh,"en-US":Ch,"es-ES":wh,"et-EE":Th,"fi-FI":Eh,"fr-FR":Dh,"he-IL":Oh,"hr-HR":kh,"hu-HU":Ah,"it-IT":jh,"ja-JP":Mh,"ko-KR":Nh,"lt-LT":Ph,"lv-LV":Fh,"nb-NO":Ih,"nl-NL":Lh,"pl-PL":Rh,"pt-BR":zh,"pt-PT":Bh,"ro-RO":Vh,"ru-RU":Hh,"sk-SK":Uh,"sl-SI":Wh,"sr-SP":Gh,"sv-SE":Kh,"tr-TR":qh,"uk-UA":Jh,"zh-CN":Yh,"zh-TW":Xh};function Qh(e){return e&&e.__esModule?e.default:e}function $h(e){let{onDismiss:t,...n}=e,r=Ei(n,$i(Qh(Zh),`@react-aria/overlays`).format(`dismiss`)),i=()=>{t&&t()};return R.default.createElement(al,null,R.default.createElement(`button`,{...r,tabIndex:-1,onClick:i,style:{width:1,height:1}}))}function eg({children:e}){let t=(0,R.useMemo)(()=>({register:()=>{}}),[]);return R.default.createElement(No.Provider,{value:t},e)}let tg=(0,R.createContext)({});function ng(){return(0,R.useContext)(tg)??{}}let rg=R.default.createContext(null);function ig(e){let t=Pn(),{portalContainer:n=t?null:document.body,isExiting:r}=e,[i,a]=(0,R.useState)(!1),o=(0,R.useMemo)(()=>({contain:i,setContain:a}),[i,a]),{getContainer:s}=ng();if(!e.portalContainer&&s&&(n=s()),!n)return null;let c=e.children;return e.disableFocusManagement||(c=R.default.createElement(Jf,{restoreFocus:!0,contain:(e.shouldContainFocus||i)&&!r},c)),c=R.default.createElement(rg.Provider,{value:o},R.default.createElement(eg,null,R.default.createElement(La.Provider,{value:null},c))),Ya.default.createPortal(c,n)}function ag(){let e=(0,R.useContext)(rg)?.setContain;z(()=>{e?.(!0)},[e])}function og(e){let[t,n]=ta(e.isOpen,e.defaultOpen||!1,e.onOpenChange),[r,i]=(0,R.useState)(null);return{isOpen:t,setOpen:n,open:(0,R.useCallback)(()=>{n(!0)},[n]),close:(0,R.useCallback)(()=>{n(!1)},[n]),toggle:(0,R.useCallback)(()=>{n(!t)},[n,t]),point:r,setPoint:i}}function sg(e,t=!0){let[n,r]=(0,R.useState)(!0),i=n&&t;return z(()=>{if(i&&e.current&&`getAnimations`in e.current)for(let t of e.current.getAnimations())t instanceof CSSTransition&&t.cancel()},[e,i]),lg(e,i,(0,R.useCallback)(()=>r(!1),[])),i}function cg(e,t){let[n,r]=(0,R.useState)(t?`open`:`closed`);switch(n){case`open`:t||r(`exiting`);break;case`closed`:case`exiting`:t&&r(`open`)}let i=n===`exiting`;return lg(e,i,(0,R.useCallback)(()=>{r(e=>e===`exiting`?`closed`:e)},[])),i}function lg(e,t,n){z(()=>{if(t&&e.current){if(!(`getAnimations`in e.current)){n();return}let t=e.current.getAnimations();if(t.length===0){n();return}let r=!1;return Promise.allSettled(t.map(e=>e.finished)).then(()=>{r||(0,Ya.flushSync)(()=>{n()})}),()=>{r=!0}}},[e,t,n])}let ug=(0,R.createContext)(null),dg=(0,R.createContext)(null),fg=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,ug);let n=(0,R.useContext)(t_),r=og(e),i=e.isOpen!=null||e.defaultOpen!=null||!n?r:n,a=cg(t,i.isOpen),o=e.isExiting||!e.shouldSkipAnimation&&a||!1,s=Ga(),{direction:c}=Z();if(s){let t=e.children;return typeof t==`function`&&(t=t({trigger:e.trigger||null,placement:`bottom`,isEntering:!1,isExiting:!1,defaultChildren:null})),R.default.createElement(R.default.Fragment,null,t)}return i&&!i.isOpen&&!o?null:R.default.createElement(pg,{...e,triggerRef:e.triggerRef,state:i,popoverRef:t,isExiting:o,dir:c})});function pg({state:e,isExiting:t,UNSTABLE_portalContainer:n,clearContexts:r,...i}){let a=(0,R.useRef)(null),o=(0,R.useRef)(null),s=(0,R.useContext)(dg),c=s&&i.trigger===`SubmenuTrigger`,{popoverProps:l,underlayProps:u,arrowProps:d,placement:f,triggerAnchorPoint:p}=gh({...i,offset:i.offset??8,arrowRef:a,groupRef:c?s:o},e),m=i.popoverRef,h=sg(m,!!f),g=i.isEntering||!i.shouldSkipAnimation&&h||!1,_=H({...i,defaultClassName:`react-aria-Popover`,values:{trigger:i.trigger||null,placement:f,isEntering:g,isExiting:t}}),v=!i.isNonModal||i.trigger===`SubmenuTrigger`||i.trigger===`PreviewTrigger`,[y,b]=(0,R.useState)(i.trigger===`PreviewTrigger`);z(()=>{m.current&&b(v&&!m.current.querySelector(`[role=dialog]`))},[m,v]),(0,R.useEffect)(()=>{y&&i.trigger!==`PreviewTrigger`&&(i.trigger!==`SubmenuTrigger`||gi()!==`pointer`)&&m.current&&!cr(m.current)&&ba(m.current)},[y,m,i.trigger]);let x=(0,R.useMemo)(()=>{let e=_.children;if(r)for(let t of r)e=R.default.createElement(t.Provider,{value:null},e);return e},[_.children,r]),[S,C]=(0,R.useState)(null),w=(0,R.useCallback)(()=>{i.triggerRef.current&&C(i.triggerRef.current.getBoundingClientRect().width+`px`)},[i.triggerRef]);z(w,[w]),$m({ref:_.style?.[`--trigger-width`]?void 0:i.triggerRef,onResize:w});let T={...l.style,"--trigger-anchor-point":p?`${p.x}px ${p.y}px`:void 0,..._.style,"--trigger-width":_.style?.[`--trigger-width`]||S},E=R.default.createElement(W.div,{...V(Q(i,{global:!0}),l),..._,id:y?i.id:void 0,role:y?`dialog`:void 0,tabIndex:y?-1:void 0,"aria-label":i[`aria-label`],"aria-labelledby":i[`aria-labelledby`],ref:m,slot:i.slot||void 0,style:T,dir:i.dir,"data-trigger":i.trigger,"data-placement":f,"data-entering":g||void 0,"data-exiting":t||void 0},!i.isNonModal&&R.default.createElement($h,{onDismiss:e.close}),R.default.createElement(xm.Provider,{value:{...d,placement:f,ref:a}},x),R.default.createElement($h,{onDismiss:e.close}));return c?R.default.createElement(ig,{...i,shouldContainFocus:y&&i.trigger!==`PreviewTrigger`,isExiting:t,portalContainer:n??s?.current??void 0},E):R.default.createElement(ig,{...i,shouldContainFocus:y&&i.trigger!==`PreviewTrigger`,isExiting:t,portalContainer:n},!i.isNonModal&&e.isOpen&&R.default.createElement(`div`,{"data-testid":`underlay`,...u,style:{position:`fixed`,inset:0}}),R.default.createElement(`div`,{ref:o,style:{display:`contents`}},R.default.createElement(dg.Provider,{value:o},E)))}var mg={};mg={longPressMessage:`اضغط مطولاً أو اضغط على Alt + السهم لأسفل لفتح القائمة`};var hg={};hg={longPressMessage:`Натиснете продължително или натиснете Alt+ стрелка надолу, за да отворите менюто`};var gg={};gg={longPressMessage:`Dlouhým stiskem nebo stisknutím kláves Alt + šipka dolů otevřete nabídku`};var _g={};_g={longPressMessage:`Langt tryk eller tryk på Alt + pil ned for at åbne menuen`};var vg={};vg={longPressMessage:`Drücken Sie lange oder drücken Sie Alt + Nach-unten, um das Menü zu öffnen`};var yg={};yg={longPressMessage:`Πιέστε παρατεταμένα ή πατήστε Alt + κάτω βέλος για να ανοίξετε το μενού`};var bg={};bg={longPressMessage:`Long press or press Alt + ArrowDown to open menu`};var xg={};xg={longPressMessage:`Mantenga pulsado o pulse Alt + flecha abajo para abrir el menú`};var Sg={};Sg={longPressMessage:`Menüü avamiseks vajutage pikalt või vajutage klahve Alt + allanool`};var Cg={};Cg={longPressMessage:`Avaa valikko painamalla pohjassa tai näppäinyhdistelmällä Alt + Alanuoli`};var wg={};wg={longPressMessage:`Appuyez de manière prolongée ou appuyez sur Alt\xA0+\xA0Flèche vers le bas pour ouvrir le menu.`};var Tg={};Tg={longPressMessage:`לחץ לחיצה ארוכה או הקש Alt + ArrowDown כדי לפתוח את התפריט`};var Eg={};Eg={longPressMessage:`Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika`};var Dg={};Dg={longPressMessage:`Nyomja meg hosszan, vagy nyomja meg az Alt + lefele nyíl gombot a menü megnyitásához`};var Og={};Og={longPressMessage:`Premi a lungo o premi Alt + Freccia giù per aprire il menu`};var kg={};kg={longPressMessage:`長押しまたは Alt+下矢印キーでメニューを開く`};var Ag={};Ag={longPressMessage:`길게 누르거나 Alt + 아래쪽 화살표를 눌러 메뉴 열기`};var jg={};jg={longPressMessage:`Norėdami atidaryti meniu, nuspaudę palaikykite arba paspauskite „Alt + ArrowDown“.`};var Mg={};Mg={longPressMessage:`Lai atvērtu izvēlni, turiet nospiestu vai nospiediet taustiņu kombināciju Alt + lejupvērstā bultiņa`};var Ng={};Ng={longPressMessage:`Langt trykk eller trykk Alt + PilNed for å åpne menyen`};var Pg={};Pg={longPressMessage:`Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen`};var Fg={};Fg={longPressMessage:`Naciśnij i przytrzymaj lub naciśnij klawisze Alt + Strzałka w dół, aby otworzyć menu`};var Ig={};Ig={longPressMessage:`Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu`};var Lg={};Lg={longPressMessage:`Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu`};var Rg={};Rg={longPressMessage:`Apăsați lung sau apăsați pe Alt + săgeată în jos pentru a deschide meniul`};var zg={};zg={longPressMessage:`Нажмите и удерживайте или нажмите Alt + Стрелка вниз, чтобы открыть меню`};var Bg={};Bg={longPressMessage:`Ponuku otvoríte dlhým stlačením alebo stlačením klávesu Alt + klávesu so šípkou nadol`};var Vg={};Vg={longPressMessage:`Za odprtje menija pritisnite in držite gumb ali pritisnite Alt+puščica navzdol`};var Hg={};Hg={longPressMessage:`Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni`};var Ug={};Ug={longPressMessage:`Håll nedtryckt eller tryck på Alt + pil nedåt för att öppna menyn`};var Wg={};Wg={longPressMessage:`Menüyü açmak için uzun basın veya Alt + Aşağı Ok tuşuna basın`};var Gg={};Gg={longPressMessage:`Довго або звичайно натисніть комбінацію клавіш Alt і стрілка вниз, щоб відкрити меню`};var Kg={};Kg={longPressMessage:`长按或按 Alt + 向下方向键以打开菜单`};var qg={};qg={longPressMessage:`長按或按 Alt+向下鍵以開啟功能表`};var Jg={};Jg={"ar-AE":mg,"bg-BG":hg,"cs-CZ":gg,"da-DK":_g,"de-DE":vg,"el-GR":yg,"en-US":bg,"es-ES":xg,"et-EE":Sg,"fi-FI":Cg,"fr-FR":wg,"he-IL":Tg,"hr-HR":Eg,"hu-HU":Dg,"it-IT":Og,"ja-JP":kg,"ko-KR":Ag,"lt-LT":jg,"lv-LV":Mg,"nb-NO":Ng,"nl-NL":Pg,"pl-PL":Fg,"pt-BR":Ig,"pt-PT":Lg,"ro-RO":Rg,"ru-RU":zg,"sk-SK":Bg,"sl-SI":Vg,"sr-SP":Hg,"sv-SE":Ug,"tr-TR":Wg,"uk-UA":Gg,"zh-CN":Kg,"zh-TW":qg};function Yg(e){let{onContextMenu:t}=e,n=(0,R.useRef)(!1),{longPressProps:r}=Ip({onLongPressStart(){n.current=!1},onLongPress(e){n.current?n.current=!1:t?.({target:e.target,x:e.x,y:e.y})}});return t?{contextMenuProps:V(zr()?r:{},{onContextMenu(e){e.stopPropagation(),e.preventDefault(),n.current=!0;let r=e.currentTarget.getBoundingClientRect();t({target:e.currentTarget,x:e.clientX-r.x,y:e.clientY-r.y})},onKeyDown(e){if(Ir()&&e.ctrlKey&&e.key===`Enter`){n.current=!1;let r=e.currentTarget;e.stopPropagation(),setTimeout(()=>{if(n.current)n.current=!1;else{let e=r.getBoundingClientRect();t({target:r,x:e.width/2,y:e.height/2})}},10)}}})}:{contextMenuProps:{}}}function Xg(e,t,n){let{type:r}=e,{isOpen:i}=t;(0,R.useEffect)(()=>{n&&n.current&&Xm.set(n.current,t.close)});let a;r===`menu`?a=!0:r===`listbox`&&(a=`listbox`);let o=B();return{triggerProps:{"aria-haspopup":a,"aria-expanded":i,"aria-controls":i?o:void 0,onPress:t.toggle},overlayProps:{id:o}}}function Zg(e){return e&&e.__esModule?e.default:e}function Qg(e,t,n){let{type:r=`menu`,isDisabled:i,trigger:a=`press`}=e,o=B(),{triggerProps:s,overlayProps:c}=Xg({type:r},t,n),l=(e,n,r=`first`)=>{if(!e||n.isDefaultPrevented())return!1;t.toggle(r)},{keyboardProps:u}=Fa({isDisabled:i,shortcuts:{Enter:e=>l(a!==`longPress`,e,`first`)," ":e=>l(a!==`longPress`,e,`first`),ArrowDown:e=>l(a!==`longPress`,e,`first`),ArrowUp:e=>l(a!==`longPress`,e,`last`),"Alt+Enter":e=>l(a===`longPress`,e,`first`),"Alt+ ":e=>l(a===`longPress`,e,`first`),"Alt+ArrowDown":e=>l(!0,e,`first`),"Alt+ArrowUp":e=>l(!0,e,`last`)}}),d=$i(Zg(Jg),`@react-aria/menu`),{longPressProps:f}=Ip({isDisabled:i||a!==`longPress`,accessibilityDescription:d.format(`longPressMessage`),onLongPressStart(){t.close()},onLongPress(){t.open(`first`)}}),p={preventFocusOnPress:!0,onPressStart(e){e.pointerType!==`touch`&&e.pointerType!==`keyboard`&&!i&&(pr(e.target),t.open(e.pointerType===`virtual`?`first`:null))},onPress(e){e.pointerType===`touch`&&!i&&(pr(e.target),t.toggle())}};delete s.onPress;let{contextMenuProps:m}=Yg({onContextMenu(e){let n=e.target.getBoundingClientRect();t.setPoint({x:n.x+e.x,y:n.y+e.y}),t.open()}});(0,R.useEffect)(()=>{if(t.isOpen&&a===`contextMenu`){let e=e=>{(e.button===2||e.button===0&&e.ctrlKey===!0)&&Y(e)===document.body&&t.close()};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)}},[t,a]);let h;if(a===`press`)h={...p,...u};else if(a===`longPress`)h={...f,...u};else if(a===`contextMenu`){h=m;let{"aria-haspopup":e,"aria-expanded":t,"aria-controls":n,...r}=s;s=r}return{menuTriggerProps:{...s,...h,id:o},menuProps:{...c,"aria-labelledby":o,autoFocus:t.focusStrategy||!0,onClose:t.close}}}function $g(e,t){let{role:n=`dialog`}=e,r=Vn();r=e[`aria-label`]?void 0:r;let i=Vn();i=n===`alertdialog`&&!e[`aria-describedby`]?i:void 0;let a=(0,R.useRef)(!1);(0,R.useEffect)(()=>{if(t.current&&!cr(t.current)){ba(t.current);let e=setTimeout(()=>{(J()===t.current||J()===document.body)&&(a.current=!0,t.current&&(t.current.blur(),ba(t.current)),a.current=!1)},500);return()=>{clearTimeout(e)}}},[t]),ag(),(0,R.useRef)(!1),(0,R.useEffect)(()=>{});let o=e[`aria-describedby`]??i;return{dialogProps:{...Q(e,{labelable:!0}),role:n,tabIndex:-1,"aria-labelledby":e[`aria-labelledby`]??r,"aria-describedby":o,onBlur:e=>{a.current&&e.stopPropagation()}},titleProps:{id:r},contentProps:{id:i}}}let e_=(0,R.createContext)(null),t_=(0,R.createContext)(null),n_=(0,R.forwardRef)(function(e,t){let n=e[`aria-labelledby`];[e,t]=U(e,t,e_);let{dialogProps:r,titleProps:i,contentProps:a}=$g({...e,"aria-labelledby":n},t),o=(0,R.useContext)(t_);!r[`aria-label`]&&!r[`aria-labelledby`]&&e[`aria-labelledby`]&&(r[`aria-labelledby`]=e[`aria-labelledby`]);let s=H({defaultClassName:`react-aria-Dialog`,className:e.className,style:e.style,children:e.children,values:{close:o?.close||(()=>{})}}),c=Q(e,{global:!0});return R.default.createElement(W.section,{...V(c,s,r),render:e.render,ref:t,slot:e.slot||void 0},R.default.createElement(Jn,{values:[[Ls,{slots:{[qn]:{},title:{...i,level:2}}}],[zs,{slots:{[qn]:{},description:a}}],[Ns,{slots:{[qn]:{},close:{onPress:()=>o?.close()}}}]]},s.children))});function r_(e){let t=Np({usage:`search`,...e}),n=(0,R.useCallback)((e,n)=>n.length===0||(e=e.normalize(`NFC`),n=n.normalize(`NFC`),t.compare(e.slice(0,n.length),n)===0),[t]),r=(0,R.useCallback)((e,n)=>n.length===0||(e=e.normalize(`NFC`),n=n.normalize(`NFC`),t.compare(e.slice(-n.length),n)===0),[t]),i=(0,R.useCallback)((e,n)=>{if(n.length===0)return!0;e=e.normalize(`NFC`),n=n.normalize(`NFC`);let r=0,i=n.length;for(;r+i<=e.length;r++){let a=e.slice(r,r+i);if(t.compare(n,a)===0)return!0}return!1},[t]);return(0,R.useMemo)(()=>({startsWith:n,endsWith:r,contains:i}),[n,r,i])}function i_(e={}){let{locale:t}=Z();return(0,R.useMemo)(()=>new Intl.ListFormat(t,e),[t,e])}let a_=[`day`,`month`,`year`],o_={hour:1,minute:2,second:3};function s_(e,t){let{autoComplete:n,isDisabled:r,name:i}=e,{visuallyHiddenProps:a}=il({style:{position:`fixed`,top:0,left:0}}),o=60;t.granularity===`second`?o=1:t.granularity===`hour`&&(o=3600);let s=``;t.value&&(s=t.granularity===`day`?ve(t.value).toString():ye(`timeZone`in t.value?Ce(t.value):t.value).toString());let c=t.granularity===`day`?`date`:`datetime-local`,l=[`hour`,`minute`,`second`],u=0;return l.includes(t.granularity)&&(u=o_[t.granularity],l=l.slice(0,u)),{containerProps:{...a,"aria-hidden":!0,"data-react-aria-prevent-focus":!0,"data-a11y-ignore":`aria-hidden-focus`},inputProps:{tabIndex:-1,autoComplete:n,disabled:r,type:c,form:``,name:i,step:o,value:s,onChange:e=>{let n=Y(e).value.toString();if(n)try{let e=Qe(n);if(t.granularity===`day`&&(e=Ze(n)),`setSegment`in t)for(let n in e)a_.includes(n)&&t.setSegment(n,e[n]),l.includes(n)&&t.setSegment(n,e[n]);t.setValue(e)}catch{}}}}}function c_(e){let{state:t}=e,{containerProps:n,inputProps:r}=s_({...e},t);return R.default.createElement(`div`,{...n,"data-testid":`hidden-dateinput-container`},R.default.createElement(`input`,r))}var l_={};l_={calendar:`التقويم`,day:`يوم`,dayPeriod:`ص/م`,endDate:`تاريخ الانتهاء`,era:`العصر`,hour:`الساعات`,minute:`الدقائق`,month:`الشهر`,second:`الثواني`,selectedDateDescription:e=>`\u{62A}\u{627}\u{631}\u{64A}\u{62E} \u{645}\u{62D}\u{62F}\u{62F}: ${e.date}`,selectedRangeDescription:e=>`\u{627}\u{644}\u{645}\u{62F}\u{649} \u{627}\u{644}\u{632}\u{645}\u{646}\u{64A} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}: ${e.startDate} \u{625}\u{644}\u{649} ${e.endDate}`,selectedTimeDescription:e=>`\u{627}\u{644}\u{648}\u{642}\u{62A} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}: ${e.time}`,startDate:`تاريخ البدء`,timeZoneName:`التوقيت`,weekday:`اليوم`,year:`السنة`};var u_={};u_={calendar:`Календар`,day:`ден`,dayPeriod:`пр.об./сл.об.`,endDate:`Крайна дата`,era:`ера`,hour:`час`,minute:`минута`,month:`месец`,second:`секунда`,selectedDateDescription:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{434}\u{438}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: ${e.startDate} \u{434}\u{43E} ${e.endDate}`,selectedTimeDescription:e=>`\u{418}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{43E} \u{432}\u{440}\u{435}\u{43C}\u{435}: ${e.time}`,startDate:`Начална дата`,timeZoneName:`часова зона`,weekday:`ден от седмицата`,year:`година`};var d_={};d_={calendar:`Kalendář`,day:`den`,dayPeriod:`část dne`,endDate:`Konečné datum`,era:`letopočet`,hour:`hodina`,minute:`minuta`,month:`měsíc`,second:`sekunda`,selectedDateDescription:e=>`Vybran\xe9 datum: ${e.date}`,selectedRangeDescription:e=>`Vybran\xe9 obdob\xed: ${e.startDate} a\u{17E} ${e.endDate}`,selectedTimeDescription:e=>`Vybran\xfd \u{10D}as: ${e.time}`,startDate:`Počáteční datum`,timeZoneName:`časové pásmo`,weekday:`den v týdnu`,year:`rok`};var f_={};f_={calendar:`Kalender`,day:`dag`,dayPeriod:`AM/PM`,endDate:`Slutdato`,era:`æra`,hour:`time`,minute:`minut`,month:`måned`,second:`sekund`,selectedDateDescription:e=>`Valgt dato: ${e.date}`,selectedRangeDescription:e=>`Valgt interval: ${e.startDate} til ${e.endDate}`,selectedTimeDescription:e=>`Valgt tidspunkt: ${e.time}`,startDate:`Startdato`,timeZoneName:`tidszone`,weekday:`ugedag`,year:`år`};var p_={};p_={calendar:`Kalender`,day:`Tag`,dayPeriod:`Tageshälfte`,endDate:`Enddatum`,era:`Epoche`,hour:`Stunde`,minute:`Minute`,month:`Monat`,second:`Sekunde`,selectedDateDescription:e=>`Ausgew\xe4hltes Datum: ${e.date}`,selectedRangeDescription:e=>`Ausgew\xe4hlter Bereich: ${e.startDate} bis ${e.endDate}`,selectedTimeDescription:e=>`Ausgew\xe4hlte Zeit: ${e.time}`,startDate:`Startdatum`,timeZoneName:`Zeitzone`,weekday:`Wochentag`,year:`Jahr`};var m_={};m_={calendar:`Ημερολόγιο`,day:`ημέρα`,dayPeriod:`π.μ./μ.μ.`,endDate:`Ημερομηνία λήξης`,era:`περίοδος`,hour:`ώρα`,minute:`λεπτό`,month:`μήνας`,second:`δευτερόλεπτο`,selectedDateDescription:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3B7}\u{3BC}\u{3B5}\u{3C1}\u{3BF}\u{3BC}\u{3B7}\u{3BD}\u{3AF}\u{3B1}: ${e.date}`,selectedRangeDescription:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3B5}\u{3CD}\u{3C1}\u{3BF}\u{3C2}: ${e.startDate} \u{3AD}\u{3C9}\u{3C2} ${e.endDate}`,selectedTimeDescription:e=>`\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3CE}\u{3C1}\u{3B1}: ${e.time}`,startDate:`Ημερομηνία έναρξης`,timeZoneName:`ζώνη ώρας`,weekday:`καθημερινή`,year:`έτος`};var h_={};h_={era:`era`,year:`year`,month:`month`,day:`day`,hour:`hour`,minute:`minute`,second:`second`,dayPeriod:`AM/PM`,calendar:`Calendar`,startDate:`Start Date`,endDate:`End Date`,weekday:`day of the week`,timeZoneName:`time zone`,selectedDateDescription:e=>`Selected Date: ${e.date}`,selectedRangeDescription:e=>`Selected Range: ${e.startDate} to ${e.endDate}`,selectedTimeDescription:e=>`Selected Time: ${e.time}`};var g_={};g_={calendar:`Calendario`,day:`día`,dayPeriod:`a.\xA0m./p.\xA0m.`,endDate:`Fecha final`,era:`era`,hour:`hora`,minute:`minuto`,month:`mes`,second:`segundo`,selectedDateDescription:e=>`Fecha seleccionada: ${e.date}`,selectedRangeDescription:e=>`Rango seleccionado: ${e.startDate} a ${e.endDate}`,selectedTimeDescription:e=>`Hora seleccionada: ${e.time}`,startDate:`Fecha de inicio`,timeZoneName:`zona horaria`,weekday:`día de la semana`,year:`año`};var __={};__={calendar:`Kalender`,day:`päev`,dayPeriod:`enne/pärast lõunat`,endDate:`Lõppkuupäev`,era:`ajastu`,hour:`tund`,minute:`minut`,month:`kuu`,second:`sekund`,selectedDateDescription:e=>`Valitud kuup\xe4ev: ${e.date}`,selectedRangeDescription:e=>`Valitud vahemik: ${e.startDate} kuni ${e.endDate}`,selectedTimeDescription:e=>`Valitud aeg: ${e.time}`,startDate:`Alguskuupäev`,timeZoneName:`ajavöönd`,weekday:`nädalapäev`,year:`aasta`};var v_={};v_={calendar:`Kalenteri`,day:`päivä`,dayPeriod:`vuorokaudenaika`,endDate:`Päättymispäivä`,era:`aikakausi`,hour:`tunti`,minute:`minuutti`,month:`kuukausi`,second:`sekunti`,selectedDateDescription:e=>`Valittu p\xe4iv\xe4m\xe4\xe4r\xe4: ${e.date}`,selectedRangeDescription:e=>`Valittu aikav\xe4li: ${e.startDate} \u{2013} ${e.endDate}`,selectedTimeDescription:e=>`Valittu aika: ${e.time}`,startDate:`Alkamispäivä`,timeZoneName:`aikavyöhyke`,weekday:`viikonpäivä`,year:`vuosi`};var y_={};y_={calendar:`Calendrier`,day:`jour`,dayPeriod:`cadran`,endDate:`Date de fin`,era:`ère`,hour:`heure`,minute:`minute`,month:`mois`,second:`seconde`,selectedDateDescription:e=>`Date s\xe9lectionn\xe9e\xa0: ${e.date}`,selectedRangeDescription:e=>`Plage s\xe9lectionn\xe9e\xa0: ${e.startDate} au ${e.endDate}`,selectedTimeDescription:e=>`Heure choisie\xa0: ${e.time}`,startDate:`Date de début`,timeZoneName:`fuseau horaire`,weekday:`jour de la semaine`,year:`année`};var b_={};b_={calendar:`לוח שנה`,day:`יום`,dayPeriod:`לפנה״צ/אחה״צ`,endDate:`תאריך סיום`,era:`תקופה`,hour:`שעה`,minute:`דקה`,month:`חודש`,second:`שנייה`,selectedDateDescription:e=>`\u{5EA}\u{5D0}\u{5E8}\u{5D9}\u{5DA} \u{5E0}\u{5D1}\u{5D7}\u{5E8}: ${e.date}`,selectedRangeDescription:e=>`\u{5D8}\u{5D5}\u{5D5}\u{5D7} \u{5E0}\u{5D1}\u{5D7}\u{5E8}: ${e.startDate} \u{5E2}\u{5D3} ${e.endDate}`,selectedTimeDescription:e=>`\u{5D6}\u{5DE}\u{5DF} \u{5E0}\u{5D1}\u{5D7}\u{5E8}: ${e.time}`,startDate:`תאריך התחלה`,timeZoneName:`אזור זמן`,weekday:`יום בשבוע`,year:`שנה`};var x_={};x_={calendar:`Kalendar`,day:`dan`,dayPeriod:`AM/PM`,endDate:`Datum završetka`,era:`era`,hour:`sat`,minute:`minuta`,month:`mjesec`,second:`sekunda`,selectedDateDescription:e=>`Odabrani datum: ${e.date}`,selectedRangeDescription:e=>`Odabrani raspon: ${e.startDate} do ${e.endDate}`,selectedTimeDescription:e=>`Odabrano vrijeme: ${e.time}`,startDate:`Datum početka`,timeZoneName:`vremenska zona`,weekday:`dan u tjednu`,year:`godina`};var S_={};S_={calendar:`Naptár`,day:`nap`,dayPeriod:`napszak`,endDate:`Befejező dátum`,era:`éra`,hour:`óra`,minute:`perc`,month:`hónap`,second:`másodperc`,selectedDateDescription:e=>`Kijel\xf6lt d\xe1tum: ${e.date}`,selectedRangeDescription:e=>`Kijel\xf6lt tartom\xe1ny: ${e.startDate}\u{2013}${e.endDate}`,selectedTimeDescription:e=>`Kijel\xf6lt id\u{151}: ${e.time}`,startDate:`Kezdő dátum`,timeZoneName:`időzóna`,weekday:`hét napja`,year:`év`};var C_={};C_={calendar:`Calendario`,day:`giorno`,dayPeriod:`AM/PM`,endDate:`Data finale`,era:`era`,hour:`ora`,minute:`minuto`,month:`mese`,second:`secondo`,selectedDateDescription:e=>`Data selezionata: ${e.date}`,selectedRangeDescription:e=>`Intervallo selezionato: da ${e.startDate} a ${e.endDate}`,selectedTimeDescription:e=>`Ora selezionata: ${e.time}`,startDate:`Data iniziale`,timeZoneName:`fuso orario`,weekday:`giorno della settimana`,year:`anno`};var w_={};w_={calendar:`カレンダー`,day:`日`,dayPeriod:`午前/午後`,endDate:`終了日`,era:`時代`,hour:`時`,minute:`分`,month:`月`,second:`秒`,selectedDateDescription:e=>`\u{9078}\u{629E}\u{3057}\u{305F}\u{65E5}\u{4ED8} : ${e.date}`,selectedRangeDescription:e=>`\u{9078}\u{629E}\u{7BC4}\u{56F2} : ${e.startDate} \u{304B}\u{3089} ${e.endDate}`,selectedTimeDescription:e=>`\u{9078}\u{629E}\u{3057}\u{305F}\u{6642}\u{9593} : ${e.time}`,startDate:`開始日`,timeZoneName:`タイムゾーン`,weekday:`曜日`,year:`年`};var T_={};T_={calendar:`달력`,day:`일`,dayPeriod:`오전/오후`,endDate:`종료일`,era:`연호`,hour:`시`,minute:`분`,month:`월`,second:`초`,selectedDateDescription:e=>`\u{C120}\u{D0DD} \u{C77C}\u{C790}: ${e.date}`,selectedRangeDescription:e=>`\u{C120}\u{D0DD} \u{BC94}\u{C704}: ${e.startDate} ~ ${e.endDate}`,selectedTimeDescription:e=>`\u{C120}\u{D0DD} \u{C2DC}\u{AC04}: ${e.time}`,startDate:`시작일`,timeZoneName:`시간대`,weekday:`요일`,year:`년`};var E_={};E_={calendar:`Kalendorius`,day:`diena`,dayPeriod:`iki pietų / po pietų`,endDate:`Pabaigos data`,era:`era`,hour:`valanda`,minute:`minutė`,month:`mėnuo`,second:`sekundė`,selectedDateDescription:e=>`Pasirinkta data: ${e.date}`,selectedRangeDescription:e=>`Pasirinktas intervalas: nuo ${e.startDate} iki ${e.endDate}`,selectedTimeDescription:e=>`Pasirinktas laikas: ${e.time}`,startDate:`Pradžios data`,timeZoneName:`laiko juosta`,weekday:`savaitės diena`,year:`metai`};var D_={};D_={calendar:`Kalendārs`,day:`diena`,dayPeriod:`priekšpusdienā/pēcpusdienā`,endDate:`Beigu datums`,era:`ēra`,hour:`stundas`,minute:`minūtes`,month:`mēnesis`,second:`sekundes`,selectedDateDescription:e=>`Atlas\u{12B}tais datums: ${e.date}`,selectedRangeDescription:e=>`Atlas\u{12B}tais diapazons: no ${e.startDate} l\u{12B}dz ${e.endDate}`,selectedTimeDescription:e=>`Atlas\u{12B}tais laiks: ${e.time}`,startDate:`Sākuma datums`,timeZoneName:`laika josla`,weekday:`nedēļas diena`,year:`gads`};var O_={};O_={calendar:`Kalender`,day:`dag`,dayPeriod:`a.m./p.m.`,endDate:`Sluttdato`,era:`tidsalder`,hour:`time`,minute:`minutt`,month:`måned`,second:`sekund`,selectedDateDescription:e=>`Valgt dato: ${e.date}`,selectedRangeDescription:e=>`Valgt omr\xe5de: ${e.startDate} til ${e.endDate}`,selectedTimeDescription:e=>`Valgt tid: ${e.time}`,startDate:`Startdato`,timeZoneName:`tidssone`,weekday:`ukedag`,year:`år`};var k_={};k_={calendar:`Kalender`,day:`dag`,dayPeriod:`a.m./p.m.`,endDate:`Einddatum`,era:`tijdperk`,hour:`uur`,minute:`minuut`,month:`maand`,second:`seconde`,selectedDateDescription:e=>`Geselecteerde datum: ${e.date}`,selectedRangeDescription:e=>`Geselecteerd bereik: ${e.startDate} tot ${e.endDate}`,selectedTimeDescription:e=>`Geselecteerde tijd: ${e.time}`,startDate:`Startdatum`,timeZoneName:`tijdzone`,weekday:`dag van de week`,year:`jaar`};var A_={};A_={calendar:`Kalendarz`,day:`dzień`,dayPeriod:`rano / po południu / wieczorem`,endDate:`Data końcowa`,era:`era`,hour:`godzina`,minute:`minuta`,month:`miesiąc`,second:`sekunda`,selectedDateDescription:e=>`Wybrana data: ${e.date}`,selectedRangeDescription:e=>`Wybrany zakres: ${e.startDate} do ${e.endDate}`,selectedTimeDescription:e=>`Wybrany czas: ${e.time}`,startDate:`Data początkowa`,timeZoneName:`strefa czasowa`,weekday:`dzień tygodnia`,year:`rok`};var j_={};j_={calendar:`Calendário`,day:`dia`,dayPeriod:`AM/PM`,endDate:`Data final`,era:`era`,hour:`hora`,minute:`minuto`,month:`mês`,second:`segundo`,selectedDateDescription:e=>`Data selecionada: ${e.date}`,selectedRangeDescription:e=>`Intervalo selecionado: ${e.startDate} a ${e.endDate}`,selectedTimeDescription:e=>`Hora selecionada: ${e.time}`,startDate:`Data inicial`,timeZoneName:`fuso horário`,weekday:`dia da semana`,year:`ano`};var M_={};M_={calendar:`Calendário`,day:`dia`,dayPeriod:`am/pm`,endDate:`Data de Término`,era:`era`,hour:`hora`,minute:`minuto`,month:`mês`,second:`segundo`,selectedDateDescription:e=>`Data selecionada: ${e.date}`,selectedRangeDescription:e=>`Intervalo selecionado: ${e.startDate} a ${e.endDate}`,selectedTimeDescription:e=>`Hora selecionada: ${e.time}`,startDate:`Data de Início`,timeZoneName:`fuso horário`,weekday:`dia da semana`,year:`ano`};var N_={};N_={calendar:`Calendar`,day:`zi`,dayPeriod:`a.m/p.m.`,endDate:`Dată final`,era:`eră`,hour:`oră`,minute:`minut`,month:`lună`,second:`secundă`,selectedDateDescription:e=>`Dat\u{103} selectat\u{103}: ${e.date}`,selectedRangeDescription:e=>`Interval selectat: de la ${e.startDate} p\xe2n\u{103} la ${e.endDate}`,selectedTimeDescription:e=>`Ora selectat\u{103}: ${e.time}`,startDate:`Dată început`,timeZoneName:`fus orar`,weekday:`ziua din săptămână`,year:`an`};var P_={};P_={calendar:`Календарь`,day:`день`,dayPeriod:`AM/PM`,endDate:`Дата окончания`,era:`эра`,hour:`час`,minute:`минута`,month:`месяц`,second:`секунда`,selectedDateDescription:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{430}\u{44F} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{439} \u{434}\u{438}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: \u{441} ${e.startDate} \u{43F}\u{43E} ${e.endDate}`,selectedTimeDescription:e=>`\u{412}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{43E}\u{435} \u{432}\u{440}\u{435}\u{43C}\u{44F}: ${e.time}`,startDate:`Дата начала`,timeZoneName:`часовой пояс`,weekday:`день недели`,year:`год`};var F_={};F_={calendar:`Kalendár`,day:`deň`,dayPeriod:`AM/PM`,endDate:`Dátum ukončenia`,era:`letopočet`,hour:`hodina`,minute:`minúta`,month:`mesiac`,second:`sekunda`,selectedDateDescription:e=>`Vybrat\xfd d\xe1tum: ${e.date}`,selectedRangeDescription:e=>`Vybrat\xfd rozsah: od ${e.startDate} do ${e.endDate}`,selectedTimeDescription:e=>`Vybrat\xfd \u{10D}as: ${e.time}`,startDate:`Dátum začatia`,timeZoneName:`časové pásmo`,weekday:`deň týždňa`,year:`rok`};var I_={};I_={calendar:`Koledar`,day:`dan`,dayPeriod:`dop/pop`,endDate:`Datum konca`,era:`doba`,hour:`ura`,minute:`minuta`,month:`mesec`,second:`sekunda`,selectedDateDescription:e=>`Izbrani datum: ${e.date}`,selectedRangeDescription:e=>`Izbrano obmo\u{10D}je: ${e.startDate} do ${e.endDate}`,selectedTimeDescription:e=>`Izbrani \u{10D}as: ${e.time}`,startDate:`Datum začetka`,timeZoneName:`časovni pas`,weekday:`dan v tednu`,year:`leto`};var L_={};L_={calendar:`Kalendar`,day:`дан`,dayPeriod:`пре подне/по подне`,endDate:`Datum završetka`,era:`ера`,hour:`сат`,minute:`минут`,month:`месец`,second:`секунд`,selectedDateDescription:e=>`Izabrani datum: ${e.date}`,selectedRangeDescription:e=>`Izabrani opseg: od ${e.startDate} do ${e.endDate}`,selectedTimeDescription:e=>`Izabrano vreme: ${e.time}`,startDate:`Datum početka`,timeZoneName:`временска зона`,weekday:`дан у недељи`,year:`година`};var R_={};R_={calendar:`Kalender`,day:`dag`,dayPeriod:`fm/em`,endDate:`Slutdatum`,era:`era`,hour:`timme`,minute:`minut`,month:`månad`,second:`sekund`,selectedDateDescription:e=>`Valt datum: ${e.date}`,selectedRangeDescription:e=>`Valt intervall: ${e.startDate} till ${e.endDate}`,selectedTimeDescription:e=>`Vald tid: ${e.time}`,startDate:`Startdatum`,timeZoneName:`tidszon`,weekday:`veckodag`,year:`år`};var z_={};z_={calendar:`Takvim`,day:`gün`,dayPeriod:`ÖÖ/ÖS`,endDate:`Bitiş Tarihi`,era:`çağ`,hour:`saat`,minute:`dakika`,month:`ay`,second:`saniye`,selectedDateDescription:e=>`Se\xe7ilen Tarih: ${e.date}`,selectedRangeDescription:e=>`Se\xe7ilen Aral\u{131}k: ${e.startDate} - ${e.endDate}`,selectedTimeDescription:e=>`Se\xe7ilen Zaman: ${e.time}`,startDate:`Başlangıç Tarihi`,timeZoneName:`saat dilimi`,weekday:`haftanın günü`,year:`yıl`};var B_={};B_={calendar:`Календар`,day:`день`,dayPeriod:`дп/пп`,endDate:`Дата завершення`,era:`ера`,hour:`година`,minute:`хвилина`,month:`місяць`,second:`секунда`,selectedDateDescription:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{430} \u{434}\u{430}\u{442}\u{430}: ${e.date}`,selectedRangeDescription:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{434}\u{456}\u{430}\u{43F}\u{430}\u{437}\u{43E}\u{43D}: ${e.startDate} \u{2014} ${e.endDate}`,selectedTimeDescription:e=>`\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{447}\u{430}\u{441}: ${e.time}`,startDate:`Дата початку`,timeZoneName:`часовий пояс`,weekday:`день тижня`,year:`рік`};var V_={};V_={calendar:`日历`,day:`日`,dayPeriod:`上午/下午`,endDate:`结束日期`,era:`纪元`,hour:`小时`,minute:`分钟`,month:`月`,second:`秒`,selectedDateDescription:e=>`\u{9009}\u{5B9A}\u{7684}\u{65E5}\u{671F}\u{FF1A}${e.date}`,selectedRangeDescription:e=>`\u{9009}\u{5B9A}\u{7684}\u{8303}\u{56F4}\u{FF1A}${e.startDate} \u{81F3} ${e.endDate}`,selectedTimeDescription:e=>`\u{9009}\u{5B9A}\u{7684}\u{65F6}\u{95F4}\u{FF1A}${e.time}`,startDate:`开始日期`,timeZoneName:`时区`,weekday:`工作日`,year:`年`};var H_={};H_={calendar:`日曆`,day:`日`,dayPeriod:`上午/下午`,endDate:`結束日期`,era:`纪元`,hour:`小时`,minute:`分钟`,month:`月`,second:`秒`,selectedDateDescription:e=>`\u{9078}\u{5B9A}\u{7684}\u{65E5}\u{671F}\u{FF1A}${e.date}`,selectedRangeDescription:e=>`\u{9078}\u{5B9A}\u{7684}\u{7BC4}\u{570D}\u{FF1A}${e.startDate} \u{81F3} ${e.endDate}`,selectedTimeDescription:e=>`\u{9078}\u{5B9A}\u{7684}\u{6642}\u{9593}\u{FF1A}${e.time}`,startDate:`開始日期`,timeZoneName:`时区`,weekday:`工作日`,year:`年`};var U_={};U_={"ar-AE":l_,"bg-BG":u_,"cs-CZ":d_,"da-DK":f_,"de-DE":p_,"el-GR":m_,"en-US":h_,"es-ES":g_,"et-EE":__,"fi-FI":v_,"fr-FR":y_,"he-IL":b_,"hr-HR":x_,"hu-HU":S_,"it-IT":C_,"ja-JP":w_,"ko-KR":T_,"lt-LT":E_,"lv-LV":D_,"nb-NO":O_,"nl-NL":k_,"pl-PL":A_,"pt-BR":j_,"pt-PT":M_,"ro-RO":N_,"ru-RU":P_,"sk-SK":F_,"sl-SI":I_,"sr-SP":L_,"sv-SE":R_,"tr-TR":z_,"uk-UA":B_,"zh-CN":V_,"zh-TW":H_};function W_(e,t,n){let{direction:r}=Z(),i=(0,R.useMemo)(()=>hp(t),[t]),{keyboardProps:a}=Fa({shortcuts:{"Alt+ArrowDown":()=>{if(`setOpen`in e){e.setOpen(!0);return}return!1},"Alt+ArrowUp":()=>{if(`setOpen`in e){e.setOpen(!0);return}return!1},ArrowLeft:e=>{if(n)return!1;if(r===`rtl`){if(t.current){let n=Y(e),r=G_(t.current,n.getBoundingClientRect().left,-1);if(r){r.focus();return}}}else{i.focusPrevious();return}return!1},ArrowRight:e=>{if(n)return!1;if(r===`rtl`){if(t.current){let n=Y(e),r=G_(t.current,n.getBoundingClientRect().left,1);if(r){r.focus();return}}}else{i.focusNext();return}return!1}},allowRepeats:!0}),o=()=>{if(!t.current)return;let e=window.event?Y(window.event):null,n=mp(t.current,{tabbable:!0});if(e&&=(n.currentNode=e,n.previousNode()),!e){let t;do t=n.lastChild(),t&&(e=t);while(t)}for(;e?.hasAttribute(`data-placeholder`);){let t=n.previousNode();if(t&&t.hasAttribute(`data-placeholder`))e=t;else break}e&&e.focus()},{pressProps:s}=Bo({preventFocusOnPress:!0,allowTextSelectionOnPress:!0,onPressStart(e){e.pointerType===`mouse`&&o()},onPress(e){(e.pointerType===`touch`||e.pointerType===`pen`)&&o()}});return V(s,a)}function G_(e,t,n){let r=mp(e,{tabbable:!0}),i=r.nextNode(),a=null,o=1/0;for(;i;){let e=i.getBoundingClientRect().left-t,s=Math.abs(e);Math.sign(e)===n&&s<o&&(a=i,o=s),i=r.nextNode()}return a}function K_(e){return e&&e.__esModule?e.default:e}let q_=new WeakMap,J_=`__reactAriaDateFieldRole`;function Y_(e,t,n){let{isInvalid:r,validationErrors:i,validationDetails:a}=t.displayValidation,{labelProps:o,fieldProps:s,descriptionProps:c,errorMessageProps:l}=Pl({...e,labelElementType:`span`,isInvalid:r,errorMessage:e.errorMessage||i}),u=(0,R.useRef)(null),{focusWithinProps:d}=Jo({...e,onFocusWithin(n){u.current=t.value,e.onFocus?.(n)},onBlurWithin:n=>{t.confirmPlaceholder(),t.value!==u.current&&t.commitValidation(),e.onBlur?.(n)},onFocusWithinChange:e.onFocusChange}),f=$i(K_(U_),`@react-aria/datepicker`),p=t.maxGranularity===`hour`?`selectedTimeDescription`:`selectedDateDescription`,m=t.maxGranularity===`hour`?`time`:`date`,h=Wc(t.value?f.format(p,{[m]:t.formatValue({month:`long`})}):``),g=e.__reactAriaDateFieldRole===`presentation`?s[`aria-describedby`]:[h[`aria-describedby`],s[`aria-describedby`]].filter(Boolean).join(` `)||void 0,_=e.__reactAriaDateFieldFocusManager,v=(0,R.useMemo)(()=>_||hp(n),[_,n]),y=W_(t,n,e[J_]===`presentation`);q_.set(t,{ariaLabel:e[`aria-label`],ariaLabelledBy:[o.id,e[`aria-labelledby`]].filter(Boolean).join(` `)||void 0,ariaDescribedBy:g,focusManager:v});let b=(0,R.useRef)(e.autoFocus),x;x=e.__reactAriaDateFieldRole===`presentation`?{role:`presentation`}:V(s,{role:`group`,"aria-disabled":e.isDisabled||void 0,"aria-describedby":g}),(0,R.useEffect)(()=>{b.current&&v.focusFirst(),b.current=!1},[v]),Fl(e.inputRef,t.defaultValue,t.setValue),Il({...e,focus(){v.focusFirst()}},t,e.inputRef);let S={type:`hidden`,name:e.name,form:e.form,value:t.value?.toString()||``,disabled:e.isDisabled};e.validationBehavior===`native`&&(S.type=`text`,S.hidden=!0,S.required=e.isRequired,S.onChange=()=>{});let C=Q(e);return{labelProps:{...o,onClick:()=>{v.focusFirst()}},fieldProps:V(C,x,y,d,{onKeyDown:e.onKeyDown,onKeyUp:e.onKeyUp,style:{unicodeBidi:`isolate`}}),inputProps:S,descriptionProps:c,errorMessageProps:l,isInvalid:r,validationErrors:i,validationDetails:a}}function X_(e){return e&&e.__esModule?e.default:e}function Z_(){let{locale:e}=Z(),t=Qi(X_(U_),`@react-aria/datepicker`);return(0,R.useMemo)(()=>{try{return new Intl.DisplayNames(e,{type:`dateTimeField`})}catch{return new Q_(e,t)}},[e,t])}var Q_=class{constructor(e,t){this.locale=e,this.dictionary=t}of(e){return this.dictionary.getStringForLocale(e,this.locale)}};function $_(e,t,n){let r=(0,R.useRef)(``),{locale:i,direction:a}=Z(),o=Z_(),{ariaLabel:s,ariaLabelledBy:c,ariaDescribedBy:l,focusManager:u}=q_.get(t),d=e.isPlaceholder?``:e.text,f=(0,R.useMemo)(()=>t.dateFormatter.resolvedOptions(),[t.dateFormatter]),p=Cc({month:`long`,timeZone:f.timeZone}),m=Cc({hour:`numeric`,hour12:f.hour12,timeZone:f.timeZone});if(e.type===`month`&&!e.isPlaceholder){let e=p.format(t.dateValue);d=e===d?e:`${d} \u{2013} ${e}`}else e.type===`hour`&&!e.isPlaceholder&&(d=m.format(t.dateValue));let{spinButtonProps:h}=Gu({value:e.value??void 0,textValue:d,minValue:e.minValue,maxValue:e.maxValue,isDisabled:t.isDisabled,isReadOnly:t.isReadOnly||!e.isEditable,isRequired:t.isRequired,onIncrement:()=>{r.current=``,t.increment(e.type)},onDecrement:()=>{r.current=``,t.decrement(e.type)},onIncrementPage:()=>{r.current=``,t.incrementPage(e.type)},onDecrementPage:()=>{r.current=``,t.decrementPage(e.type)},onIncrementToMax:()=>{r.current=``,t.incrementToMax(e.type)},onDecrementToMin:()=>{r.current=``,t.decrementToMin(e.type)}}),g=(0,R.useMemo)(()=>new fs(i,{maximumFractionDigits:0}),[i]),_=()=>{if(e.text===e.placeholder&&u.focusPrevious(),g.isValidPartialNumber(e.text)&&!t.isReadOnly&&!e.isPlaceholder){let n=e.text.slice(0,-1),i=g.parse(n);n=i===0?``:n,n.length===0||i===0?t.clearSegment(e.type):t.setSegment(e.type,i),r.current=n}else(e.type===`dayPeriod`||e.type===`era`)&&t.clearSegment(e.type)},{keyboardProps:v}=Fa({shortcuts:{Backspace:()=>{_()},Delete:()=>{_()},"Mod+a":()=>{}},allowRepeats:!0}),{startsWith:y}=r_({sensitivity:`base`}),b=Cc({hour:`numeric`,hour12:!0}),x=(0,R.useMemo)(()=>{let e=new Date;return e.setHours(0),b.formatToParts(e).find(e=>e.type===`dayPeriod`).value},[b]),S=(0,R.useMemo)(()=>{let e=new Date;return e.setHours(12),b.formatToParts(e).find(e=>e.type===`dayPeriod`).value},[b]),C=Cc({year:`numeric`,era:`narrow`,timeZone:`UTC`}),w=(0,R.useMemo)(()=>{if(e.type!==`era`)return[];let n=L(new ot(1,1,1),t.calendar),r=t.calendar.getEras().map(e=>{let t=n.set({year:1,month:1,day:1,era:e}).toDate(`UTC`);return{era:e,formatted:C.formatToParts(t).find(e=>e.type===`era`).value}}),i=ev(r.map(e=>e.formatted));if(i)for(let e of r)e.formatted=e.formatted.slice(i);return r},[C,t.calendar,e.type]),T=n=>{if(t.isDisabled||t.isReadOnly)return;let i=r.current+n;switch(e.type){case`dayPeriod`:if(y(x,n))t.setSegment(`dayPeriod`,0);else if(y(S,n))t.setSegment(`dayPeriod`,1);else break;u.focusNext();break;case`era`:{let e=w.find(e=>y(e.formatted,n));e&&(t.setSegment(`era`,e.era),u.focusNext());break}case`day`:case`hour`:case`minute`:case`second`:case`month`:case`year`:{if(!g.isValidPartialNumber(i))return;let a=g.parse(i),o=a;if(e.maxValue!==void 0&&a>e.maxValue&&(o=g.parse(n)),isNaN(a))return;t.setSegment(e.type,o),e.maxValue!==void 0&&(Number(a+`0`)>e.maxValue||i.length>=String(e.maxValue).length)?(r.current=``,u.focusNext()):r.current=i;break}}},E=()=>{r.current=``,n.current&&Vc(n.current,{containingElement:Lc(n.current)}),window.getSelection()?.collapse(n.current)};Ti((0,R.useRef)(typeof document<`u`?document:null),`selectionchange`,()=>{let e=window.getSelection();e?.anchorNode&&q(n.current,e?.anchorNode)&&J()===n.current&&e.collapse(n.current)});let D=(0,R.useRef)(``);Ti(n,`beforeinput`,r=>{if(n.current)switch(r.preventDefault(),r.inputType){case`deleteContentBackward`:case`deleteContentForward`:g.isValidPartialNumber(e.text)&&!t.isReadOnly&&_();break;case`insertCompositionText`:D.current=n.current.textContent,n.current.textContent=n.current.textContent;break;default:r.data!=null&&T(r.data)}}),Ti(n,`input`,e=>{let{inputType:t,data:r}=e;t===`insertCompositionText`&&(n.current&&(n.current.textContent=D.current),r!=null&&(y(x,r)||y(S,r))&&T(r))}),z(()=>{let e=n.current;return()=>{J()===e&&(u.focusPrevious()||u.focusNext())}},[n,u]);let O=zr()||e.type===`timeZoneName`?{role:`textbox`,"aria-valuemax":null,"aria-valuemin":null,"aria-valuetext":null,"aria-valuenow":null}:{};e!==(0,R.useMemo)(()=>t.segments.find(e=>e.isEditable),[t.segments])&&!t.isInvalid&&(l=void 0);let k=B(),A=!t.isDisabled&&!t.isReadOnly&&e.isEditable,j=Ei({"aria-label":`${e.type===`literal`?``:o.of(e.type)}${s?`, ${s}`:``}${c?`, `:``}`,"aria-labelledby":c});if(e.type===`literal`)return{segmentProps:{"aria-hidden":!0}};let M={caretColor:`transparent`};if(a===`rtl`){M.unicodeBidi=`embed`;let t=f[e.type];(t===`numeric`||t===`2-digit`)&&(M.direction=`ltr`)}return{segmentProps:V(h,j,{id:k,...O,...v,"aria-invalid":t.isInvalid?`true`:void 0,"aria-describedby":l,"aria-readonly":t.isReadOnly||!e.isEditable?`true`:void 0,"data-placeholder":e.isPlaceholder||void 0,contentEditable:A,suppressContentEditableWarning:A,spellCheck:A?`false`:void 0,autoCorrect:A?`off`:void 0,[parseInt(R.default.version,10)>=17?`enterKeyHint`:`enterkeyhint`]:A?`next`:void 0,inputMode:t.isDisabled||e.type===`dayPeriod`||e.type===`era`||!A?void 0:`numeric`,tabIndex:t.isDisabled?void 0:0,onFocus:E,style:M,onPointerDown(e){e.stopPropagation()},onMouseDown(e){e.stopPropagation()}})}}function ev(e){e.sort();let t=e[0],n=e[e.length-1];for(let e=0;e<t.length;e++)if(t[e]!==n[e])return e;return 0}var tv={};tv={rangeOverflow:e=>`\u{64A}\u{62C}\u{628} \u{623}\u{646} \u{62A}\u{643}\u{648}\u{646} \u{627}\u{644}\u{642}\u{64A}\u{645}\u{629} ${e.maxValue} \u{623}\u{648} \u{642}\u{628}\u{644} \u{630}\u{644}\u{643}.`,rangeReversed:`تاريخ البدء يجب أن يكون قبل تاريخ الانتهاء.`,rangeUnderflow:e=>`\u{64A}\u{62C}\u{628} \u{623}\u{646} \u{62A}\u{643}\u{648}\u{646} \u{627}\u{644}\u{642}\u{64A}\u{645}\u{629} ${e.minValue} \u{623}\u{648} \u{628}\u{639}\u{62F} \u{630}\u{644}\u{643}.`,unavailableDate:`البيانات المحددة غير متاحة.`};var nv={};nv={rangeOverflow:e=>`\u{421}\u{442}\u{43E}\u{439}\u{43D}\u{43E}\u{441}\u{442}\u{442}\u{430} \u{442}\u{440}\u{44F}\u{431}\u{432}\u{430} \u{434}\u{430} \u{435} ${e.maxValue} \u{438}\u{43B}\u{438} \u{43F}\u{43E}-\u{440}\u{430}\u{43D}\u{43D}\u{430}.`,rangeReversed:`Началната дата трябва да е преди крайната.`,rangeUnderflow:e=>`\u{421}\u{442}\u{43E}\u{439}\u{43D}\u{43E}\u{441}\u{442}\u{442}\u{430} \u{442}\u{440}\u{44F}\u{431}\u{432}\u{430} \u{434}\u{430} \u{435} ${e.minValue} \u{438}\u{43B}\u{438} \u{43F}\u{43E}-\u{43A}\u{44A}\u{441}\u{43D}\u{43E}.`,unavailableDate:`Избраната дата не е налична.`};var rv={};rv={rangeOverflow:e=>`Hodnota mus\xed b\xfdt ${e.maxValue} nebo d\u{159}\xedv\u{11B}j\u{161}\xed.`,rangeReversed:`Datum zahájení musí předcházet datu ukončení.`,rangeUnderflow:e=>`Hodnota mus\xed b\xfdt ${e.minValue} nebo pozd\u{11B}j\u{161}\xed.`,unavailableDate:`Vybrané datum není k dispozici.`};var iv={};iv={rangeOverflow:e=>`V\xe6rdien skal v\xe6re ${e.maxValue} eller tidligere.`,rangeReversed:`Startdatoen skal være før slutdatoen.`,rangeUnderflow:e=>`V\xe6rdien skal v\xe6re ${e.minValue} eller nyere.`,unavailableDate:`Den valgte dato er ikke tilgængelig.`};var av={};av={rangeOverflow:e=>`Der Wert muss ${e.maxValue} oder fr\xfcher sein.`,rangeReversed:`Das Startdatum muss vor dem Enddatum liegen.`,rangeUnderflow:e=>`Der Wert muss ${e.minValue} oder sp\xe4ter sein.`,unavailableDate:`Das ausgewählte Datum ist nicht verfügbar.`};var ov={};ov={rangeOverflow:e=>`\u{397} \u{3C4}\u{3B9}\u{3BC}\u{3AE} \u{3C0}\u{3C1}\u{3AD}\u{3C0}\u{3B5}\u{3B9} \u{3BD}\u{3B1} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} ${e.maxValue} \u{3AE} \u{3C0}\u{3B1}\u{3BB}\u{3B1}\u{3B9}\u{3CC}\u{3C4}\u{3B5}\u{3C1}\u{3B7}.`,rangeReversed:`Η ημερομηνία έναρξης πρέπει να είναι πριν από την ημερομηνία λήξης.`,rangeUnderflow:e=>`\u{397} \u{3C4}\u{3B9}\u{3BC}\u{3AE} \u{3C0}\u{3C1}\u{3AD}\u{3C0}\u{3B5}\u{3B9} \u{3BD}\u{3B1} \u{3B5}\u{3AF}\u{3BD}\u{3B1}\u{3B9} ${e.minValue} \u{3AE} \u{3BC}\u{3B5}\u{3C4}\u{3B1}\u{3B3}\u{3B5}\u{3BD}\u{3AD}\u{3C3}\u{3C4}\u{3B5}\u{3C1}\u{3B7}.`,unavailableDate:`Η επιλεγμένη ημερομηνία δεν είναι διαθέσιμη.`};var sv={};sv={rangeUnderflow:e=>`Value must be ${e.minValue} or later.`,rangeOverflow:e=>`Value must be ${e.maxValue} or earlier.`,rangeReversed:`Start date must be before end date.`,unavailableDate:`Selected date unavailable.`};var cv={};cv={rangeOverflow:e=>`El valor debe ser ${e.maxValue} o anterior.`,rangeReversed:`La fecha de inicio debe ser anterior a la fecha de finalización.`,rangeUnderflow:e=>`El valor debe ser ${e.minValue} o posterior.`,unavailableDate:`Fecha seleccionada no disponible.`};var lv={};lv={rangeOverflow:e=>`V\xe4\xe4rtus peab olema ${e.maxValue} v\xf5i varasem.`,rangeReversed:`Alguskuupäev peab olema enne lõppkuupäeva.`,rangeUnderflow:e=>`V\xe4\xe4rtus peab olema ${e.minValue} v\xf5i hilisem.`,unavailableDate:`Valitud kuupäev pole saadaval.`};var uv={};uv={rangeOverflow:e=>`Arvon on oltava ${e.maxValue} tai sit\xe4 aikaisempi.`,rangeReversed:`Aloituspäivän on oltava ennen lopetuspäivää.`,rangeUnderflow:e=>`Arvon on oltava ${e.minValue} tai sit\xe4 my\xf6h\xe4isempi.`,unavailableDate:`Valittu päivämäärä ei ole käytettävissä.`};var dv={};dv={rangeOverflow:e=>`La valeur doit \xeatre ${e.maxValue} ou ant\xe9rieure.`,rangeReversed:`La date de début doit être antérieure à la date de fin.`,rangeUnderflow:e=>`La valeur doit \xeatre ${e.minValue} ou ult\xe9rieure.`,unavailableDate:`La date sélectionnée n’est pas disponible.`};var fv={};fv={rangeOverflow:e=>`\u{5D4}\u{5E2}\u{5E8}\u{5DA} \u{5D7}\u{5D9}\u{5D9}\u{5D1} \u{5DC}\u{5D4}\u{5D9}\u{5D5}\u{5EA} ${e.maxValue} \u{5D0}\u{5D5} \u{5DE}\u{5D5}\u{5E7}\u{5D3}\u{5DD} \u{5D9}\u{5D5}\u{5EA}\u{5E8}.`,rangeReversed:`תאריך ההתחלה חייב להיות לפני תאריך הסיום.`,rangeUnderflow:e=>`\u{5D4}\u{5E2}\u{5E8}\u{5DA} \u{5D7}\u{5D9}\u{5D9}\u{5D1} \u{5DC}\u{5D4}\u{5D9}\u{5D5}\u{5EA} ${e.minValue} \u{5D0}\u{5D5} \u{5DE}\u{5D0}\u{5D5}\u{5D7}\u{5E8} \u{5D9}\u{5D5}\u{5EA}\u{5E8}.`,unavailableDate:`התאריך הנבחר אינו זמין.`};var pv={};pv={rangeOverflow:e=>`Vrijednost mora biti ${e.maxValue} ili ranije.`,rangeReversed:`Datum početka mora biti prije datuma završetka.`,rangeUnderflow:e=>`Vrijednost mora biti ${e.minValue} ili kasnije.`,unavailableDate:`Odabrani datum nije dostupan.`};var mv={};mv={rangeOverflow:e=>`Az \xe9rt\xe9knek ${e.maxValue} vagy kor\xe1bbinak kell lennie.`,rangeReversed:`A kezdő dátumnak a befejező dátumnál korábbinak kell lennie.`,rangeUnderflow:e=>`Az \xe9rt\xe9knek ${e.minValue} vagy k\xe9s\u{151}bbinek kell lennie.`,unavailableDate:`A kiválasztott dátum nem érhető el.`};var hv={};hv={rangeOverflow:e=>`Il valore deve essere ${e.maxValue} o precedente.`,rangeReversed:`La data di inizio deve essere antecedente alla data di fine.`,rangeUnderflow:e=>`Il valore deve essere ${e.minValue} o successivo.`,unavailableDate:`Data selezionata non disponibile.`};var gv={};gv={rangeOverflow:e=>`\u{5024}\u{306F} ${e.maxValue} \u{4EE5}\u{4E0B}\u{306B}\u{3059}\u{308B}\u{5FC5}\u{8981}\u{304C}\u{3042}\u{308A}\u{307E}\u{3059}\u{3002}`,rangeReversed:`開始日は終了日より前にする必要があります。`,rangeUnderflow:e=>`\u{5024}\u{306F} ${e.minValue} \u{4EE5}\u{4E0A}\u{306B}\u{3059}\u{308B}\u{5FC5}\u{8981}\u{304C}\u{3042}\u{308A}\u{307E}\u{3059}\u{3002}`,unavailableDate:`選択した日付は使用できません。`};var _v={};_v={rangeOverflow:e=>`\u{AC12}\u{C740} ${e.maxValue} \u{C774}\u{C804}\u{C774}\u{C5B4}\u{C57C} \u{D569}\u{B2C8}\u{B2E4}.`,rangeReversed:`시작일은 종료일 이전이어야 합니다.`,rangeUnderflow:e=>`\u{AC12}\u{C740} ${e.minValue} \u{C774}\u{D6C4}\u{C5EC}\u{C57C} \u{D569}\u{B2C8}\u{B2E4}.`,unavailableDate:`선택한 날짜를 사용할 수 없습니다.`};var vv={};vv={rangeOverflow:e=>`Reik\u{161}m\u{117} turi b\u{16B}ti ${e.maxValue} arba ankstesn\u{117}.`,rangeReversed:`Pradžios data turi būti ankstesnė nei pabaigos data.`,rangeUnderflow:e=>`Reik\u{161}m\u{117} turi b\u{16B}ti ${e.minValue} arba naujesn\u{117}.`,unavailableDate:`Pasirinkta data nepasiekiama.`};var yv={};yv={rangeOverflow:e=>`V\u{113}rt\u{12B}bai ir j\u{101}b\u{16B}t ${e.maxValue} vai agr\u{101}kai.`,rangeReversed:`Sākuma datumam ir jābūt pirms beigu datuma.`,rangeUnderflow:e=>`V\u{113}rt\u{12B}bai ir j\u{101}b\u{16B}t ${e.minValue} vai v\u{113}l\u{101}kai.`,unavailableDate:`Atlasītais datums nav pieejams.`};var bv={};bv={rangeOverflow:e=>`Verdien m\xe5 v\xe6re ${e.maxValue} eller tidligere.`,rangeReversed:`Startdatoen må være før sluttdatoen.`,rangeUnderflow:e=>`Verdien m\xe5 v\xe6re ${e.minValue} eller senere.`,unavailableDate:`Valgt dato utilgjengelig.`};var xv={};xv={rangeOverflow:e=>`Waarde moet ${e.maxValue} of eerder zijn.`,rangeReversed:`De startdatum moet voor de einddatum liggen.`,rangeUnderflow:e=>`Waarde moet ${e.minValue} of later zijn.`,unavailableDate:`Geselecteerde datum niet beschikbaar.`};var Sv={};Sv={rangeOverflow:e=>`Warto\u{15B}\u{107} musi mie\u{107} warto\u{15B}\u{107} ${e.maxValue} lub wcze\u{15B}niejsz\u{105}.`,rangeReversed:`Data rozpoczęcia musi być wcześniejsza niż data zakończenia.`,rangeUnderflow:e=>`Warto\u{15B}\u{107} musi mie\u{107} warto\u{15B}\u{107} ${e.minValue} lub p\xf3\u{17A}niejsz\u{105}.`,unavailableDate:`Wybrana data jest niedostępna.`};var Cv={};Cv={rangeOverflow:e=>`O valor deve ser ${e.maxValue} ou anterior.`,rangeReversed:`A data inicial deve ser anterior à data final.`,rangeUnderflow:e=>`O valor deve ser ${e.minValue} ou posterior.`,unavailableDate:`Data selecionada indisponível.`};var wv={};wv={rangeOverflow:e=>`O valor tem de ser ${e.maxValue} ou anterior.`,rangeReversed:`A data de início deve ser anterior à data de fim.`,rangeUnderflow:e=>`O valor tem de ser ${e.minValue} ou posterior.`,unavailableDate:`Data selecionada indisponível.`};var Tv={};Tv={rangeOverflow:e=>`Valoarea trebuie s\u{103} fie ${e.maxValue} sau anterioar\u{103}.`,rangeReversed:`Data de început trebuie să fie anterioară datei de sfârșit.`,rangeUnderflow:e=>`Valoarea trebuie s\u{103} fie ${e.minValue} sau ulterioar\u{103}.`,unavailableDate:`Data selectată nu este disponibilă.`};var Ev={};Ev={rangeOverflow:e=>`\u{417}\u{43D}\u{430}\u{447}\u{435}\u{43D}\u{438}\u{435} \u{434}\u{43E}\u{43B}\u{436}\u{43D}\u{43E} \u{431}\u{44B}\u{442}\u{44C} \u{43D}\u{435} \u{43F}\u{43E}\u{437}\u{436}\u{435} ${e.maxValue}.`,rangeReversed:`Дата начала должна предшествовать дате окончания.`,rangeUnderflow:e=>`\u{417}\u{43D}\u{430}\u{447}\u{435}\u{43D}\u{438}\u{435} \u{434}\u{43E}\u{43B}\u{436}\u{43D}\u{43E} \u{431}\u{44B}\u{442}\u{44C} \u{43D}\u{435} \u{440}\u{430}\u{43D}\u{44C}\u{448}\u{435} ${e.minValue}.`,unavailableDate:`Выбранная дата недоступна.`};var Dv={};Dv={rangeOverflow:e=>`Hodnota mus\xed by\u{165} ${e.maxValue} alebo skor\u{161}ia.`,rangeReversed:`Dátum začiatku musí byť skorší ako dátum konca.`,rangeUnderflow:e=>`Hodnota mus\xed by\u{165} ${e.minValue} alebo neskor\u{161}ia.`,unavailableDate:`Vybratý dátum je nedostupný.`};var Ov={};Ov={rangeOverflow:e=>`Vrednost mora biti ${e.maxValue} ali starej\u{161}a.`,rangeReversed:`Začetni datum mora biti pred končnim datumom.`,rangeUnderflow:e=>`Vrednost mora biti ${e.minValue} ali novej\u{161}a.`,unavailableDate:`Izbrani datum ni na voljo.`};var kv={};kv={rangeOverflow:e=>`Vrednost mora da bude ${e.maxValue} ili starija.`,rangeReversed:`Datum početka mora biti pre datuma završetka.`,rangeUnderflow:e=>`Vrednost mora da bude ${e.minValue} ili novija.`,unavailableDate:`Izabrani datum nije dostupan.`};var Av={};Av={rangeOverflow:e=>`V\xe4rdet m\xe5ste vara ${e.maxValue} eller tidigare.`,rangeReversed:`Startdatumet måste vara före slutdatumet.`,rangeUnderflow:e=>`V\xe4rdet m\xe5ste vara ${e.minValue} eller senare.`,unavailableDate:`Det valda datumet är inte tillgängligt.`};var jv={};jv={rangeOverflow:e=>`De\u{11F}er, ${e.maxValue} veya \xf6ncesi olmal\u{131}d\u{131}r.`,rangeReversed:`Başlangıç tarihi bitiş tarihinden önce olmalıdır.`,rangeUnderflow:e=>`De\u{11F}er, ${e.minValue} veya sonras\u{131} olmal\u{131}d\u{131}r.`,unavailableDate:`Seçilen tarih kullanılamıyor.`};var Mv={};Mv={rangeOverflow:e=>`\u{417}\u{43D}\u{430}\u{447}\u{435}\u{43D}\u{43D}\u{44F} \u{43C}\u{430}\u{454} \u{431}\u{443}\u{442}\u{438} \u{43D}\u{435} \u{43F}\u{456}\u{437}\u{43D}\u{456}\u{448}\u{435} ${e.maxValue}.`,rangeReversed:`Дата початку має передувати даті завершення.`,rangeUnderflow:e=>`\u{417}\u{43D}\u{430}\u{447}\u{435}\u{43D}\u{43D}\u{44F} \u{43C}\u{430}\u{454} \u{431}\u{443}\u{442}\u{438} \u{43D}\u{435} \u{440}\u{430}\u{43D}\u{456}\u{448}\u{435} ${e.minValue}.`,unavailableDate:`Вибрана дата недоступна.`};var Nv={};Nv={rangeOverflow:e=>`\u{503C}\u{5FC5}\u{987B}\u{662F} ${e.maxValue} \u{6216}\u{66F4}\u{65E9}\u{65E5}\u{671F}\u{3002}`,rangeReversed:`开始日期必须早于结束日期。`,rangeUnderflow:e=>`\u{503C}\u{5FC5}\u{987B}\u{662F} ${e.minValue} \u{6216}\u{66F4}\u{665A}\u{65E5}\u{671F}\u{3002}`,unavailableDate:`所选日期不可用。`};var Pv={};Pv={rangeOverflow:e=>`\u{503C}\u{5FC5}\u{9808}\u{662F} ${e.maxValue} \u{6216}\u{66F4}\u{65E9}\u{3002}`,rangeReversed:`開始日期必須在結束日期之前。`,rangeUnderflow:e=>`\u{503C}\u{5FC5}\u{9808}\u{662F} ${e.minValue} \u{6216}\u{66F4}\u{665A}\u{3002}`,unavailableDate:`所選日期無法使用。`};var Fv={};Fv={"ar-AE":tv,"bg-BG":nv,"cs-CZ":rv,"da-DK":iv,"de-DE":av,"el-GR":ov,"en-US":sv,"es-ES":cv,"et-EE":lv,"fi-FI":uv,"fr-FR":dv,"he-IL":fv,"hr-HR":pv,"hu-HU":mv,"it-IT":hv,"ja-JP":gv,"ko-KR":_v,"lt-LT":vv,"lv-LV":yv,"nb-NO":bv,"nl-NL":xv,"pl-PL":Sv,"pt-BR":Cv,"pt-PT":wv,"ro-RO":Tv,"ru-RU":Ev,"sk-SK":Dv,"sl-SI":Ov,"sr-SP":kv,"sv-SE":Av,"tr-TR":jv,"uk-UA":Mv,"zh-CN":Nv,"zh-TW":Pv};function Iv(e){return e&&e.__esModule?e.default:e}let Lv=new Ui(Iv(Fv));function Rv(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e=`en-US`}return e}function zv(e,t,n,r,i){let a=e!=null&&n!=null&&e.compare(n)>0,o=e!=null&&t!=null&&e.compare(t)<0,s=e!=null&&r?.(e)||!1,c=a||o||s,l=[];if(c){let e=Rv(),r=new Yi(e,Ui.getGlobalDictionaryForPackage(`@react-stately/datepicker`)||Lv),c=new pn(e,Hv({},i)),u=c.resolvedOptions().timeZone;o&&t!=null&&l.push(r.format(`rangeUnderflow`,{minValue:c.format(t.toDate(u))})),a&&n!=null&&l.push(r.format(`rangeOverflow`,{maxValue:c.format(n.toDate(u))})),s&&l.push(r.format(`unavailableDate`))}return{isInvalid:c,validationErrors:l,validationDetails:{badInput:s,customError:!1,patternMismatch:!1,rangeOverflow:a,rangeUnderflow:o,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!c}}}let Bv={year:`numeric`,month:`numeric`,day:`numeric`,hour:`numeric`,minute:`2-digit`,second:`2-digit`},Vv={year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`};function Hv(e,t){e={...t.shouldForceLeadingZeros?Vv:Bv,...e};let n=t.granularity||`minute`,r=Object.keys(e),i=r.indexOf(t.maxGranularity??`year`);i<0&&(i=0);let a=r.indexOf(n);if(a<0&&(a=2),i>a)throw Error(`maxGranularity must be greater than granularity`);let o=r.slice(i,a+1).reduce((t,n)=>(t[n]=e[n],t),{});return t.hourCycle!=null&&(o.hour12=t.hourCycle===12),o.timeZone=t.timeZone||`UTC`,(n===`hour`||n===`minute`||n===`second`)&&t.timeZone&&!t.hideTimeZone&&(o.timeZoneName=`short`),t.showEra&&i===0&&(o.era=`short`),o}function Uv(e){return e&&`hour`in e?e:new st}function Wv(e,t){if(e===null)return null;if(e)return L(e,t)}function Gv(e,t,n,r){if(e)return Wv(e,n);let i=L(w(r??A()).set({hour:0,minute:0,second:0,millisecond:0}),n);return t===`year`||t===`month`||t===`day`?ve(i):r?i:ye(i)}function Kv(e,t){let n=e&&`timeZone`in e?e.timeZone:void 0,r=e&&`minute`in e?`minute`:`day`;if(e&&t&&!(t in e))throw Error(`Invalid granularity `+t+` for value `+e.toString());let[i,a]=(0,R.useState)([r,n]);e&&(i[0]!==r||i[1]!==n)&&a([r,n]),t||=e?r:i[0];let o=e?n:i[1];return[t,o]}let qv=new Ui({ach:{year:`mwaka`,month:`dwe`,day:`nino`},af:{year:`jjjj`,month:`mm`,day:`dd`},am:{year:`ዓዓዓዓ`,month:`ሚሜ`,day:`ቀቀ`},an:{year:`aaaa`,month:`mm`,day:`dd`},ar:{year:`سنة`,month:`شهر`,day:`يوم`},ast:{year:`aaaa`,month:`mm`,day:`dd`},az:{year:`iiii`,month:`aa`,day:`gg`},be:{year:`гггг`,month:`мм`,day:`дд`},bg:{year:`гггг`,month:`мм`,day:`дд`},bn:{year:`yyyy`,month:`মিমি`,day:`dd`},br:{year:`bbbb`,month:`mm`,day:`dd`},bs:{year:`gggg`,month:`mm`,day:`dd`},ca:{year:`aaaa`,month:`mm`,day:`dd`},cak:{year:`jjjj`,month:`ii`,day:`q'q'`},ckb:{year:`ساڵ`,month:`مانگ`,day:`ڕۆژ`},cs:{year:`rrrr`,month:`mm`,day:`dd`},cy:{year:`bbbb`,month:`mm`,day:`dd`},da:{year:`åååå`,month:`mm`,day:`dd`},de:{year:`jjjj`,month:`mm`,day:`tt`},dsb:{year:`llll`,month:`mm`,day:`źź`},el:{year:`εεεε`,month:`μμ`,day:`ηη`},en:{year:`yyyy`,month:`mm`,day:`dd`},eo:{year:`jjjj`,month:`mm`,day:`tt`},es:{year:`aaaa`,month:`mm`,day:`dd`},et:{year:`aaaa`,month:`kk`,day:`pp`},eu:{year:`uuuu`,month:`hh`,day:`ee`},fa:{year:`سال`,month:`ماه`,day:`روز`},ff:{year:`hhhh`,month:`ll`,day:`ññ`},fi:{year:`vvvv`,month:`kk`,day:`pp`},fr:{year:`aaaa`,month:`mm`,day:`jj`},fy:{year:`jjjj`,month:`mm`,day:`dd`},ga:{year:`bbbb`,month:`mm`,day:`ll`},gd:{year:`bbbb`,month:`mm`,day:`ll`},gl:{year:`aaaa`,month:`mm`,day:`dd`},he:{year:`שנה`,month:`חודש`,day:`יום`},hr:{year:`gggg`,month:`mm`,day:`dd`},hsb:{year:`llll`,month:`mm`,day:`dd`},hu:{year:`éééé`,month:`hh`,day:`nn`},ia:{year:`aaaa`,month:`mm`,day:`dd`},id:{year:`tttt`,month:`bb`,day:`hh`},is:{year:`áááá`,month:`mm`,day:`dd`},it:{year:`aaaa`,month:`mm`,day:`gg`},ja:{year:`年`,month:`月`,day:`日`},ka:{year:`წწწწ`,month:`თთ`,day:`რრ`},kk:{year:`жжжж`,month:`аа`,day:`кк`},kn:{year:`ವವವವ`,month:`ಮಿಮೀ`,day:`ದಿದಿ`},ko:{year:`연도`,month:`월`,day:`일`},lb:{year:`jjjj`,month:`mm`,day:`dd`},lo:{year:`ປປປປ`,month:`ດດ`,day:`ວວ`},lt:{year:`mmmm`,month:`mm`,day:`dd`},lv:{year:`gggg`,month:`mm`,day:`dd`},meh:{year:`aaaa`,month:`mm`,day:`dd`},ml:{year:`വർഷം`,month:`മാസം`,day:`തീയതി`},ms:{year:`tttt`,month:`mm`,day:`hh`},nb:{year:`åååå`,month:`mm`,day:`dd`},nl:{year:`jjjj`,month:`mm`,day:`dd`},nn:{year:`åååå`,month:`mm`,day:`dd`},no:{year:`åååå`,month:`mm`,day:`dd`},oc:{year:`aaaa`,month:`mm`,day:`jj`},pl:{year:`rrrr`,month:`mm`,day:`dd`},pt:{year:`aaaa`,month:`mm`,day:`dd`},rm:{year:`oooo`,month:`mm`,day:`dd`},ro:{year:`aaaa`,month:`ll`,day:`zz`},ru:{year:`гггг`,month:`мм`,day:`дд`},sc:{year:`aaaa`,month:`mm`,day:`dd`},scn:{year:`aaaa`,month:`mm`,day:`jj`},sk:{year:`rrrr`,month:`mm`,day:`dd`},sl:{year:`llll`,month:`mm`,day:`dd`},sr:{year:`гггг`,month:`мм`,day:`дд`},"sr-Latn":{year:`gggg`,month:`mm`,day:`dd`},sv:{year:`åååå`,month:`mm`,day:`dd`},szl:{year:`rrrr`,month:`mm`,day:`dd`},tg:{year:`сссс`,month:`мм`,day:`рр`},th:{year:`ปปปป`,month:`ดด`,day:`วว`},tr:{year:`yyyy`,month:`aa`,day:`gg`},uk:{year:`рррр`,month:`мм`,day:`дд`},"zh-CN":{year:`年`,month:`月`,day:`日`},"zh-TW":{year:`年`,month:`月`,day:`日`}},`en`);function Jv(e,t,n){return e===`era`||e===`dayPeriod`?t:e===`year`||e===`month`||e===`day`?qv.getStringForLocale(e,n):`––`}var Yv=class e{constructor(e,t,n){if(this.era=n?.era??null,this.calendar=e,this.year=n?.year??null,this.month=n?.month??null,this.day=n?.day??null,this.hour=n?.hour??null,this.hourCycle=t,this.dayPeriod=null,this.minute=n?.minute??null,this.second=n?.second??null,this.millisecond=n?.millisecond??null,this.offset=`offset`in(n??{})?n.offset:null,this.hour!=null){let[e,n]=Zv(this.hour,t);this.dayPeriod=e,this.hour=n}}copy(){let t=new e(this.calendar,this.hourCycle);return t.era=this.era,t.year=this.year,t.month=this.month,t.day=this.day,t.hour=this.hour,t.dayPeriod=this.dayPeriod,t.minute=this.minute,t.second=this.second,t.millisecond=this.millisecond,t.offset=this.offset,t}isComplete(e){return e.every(e=>this[e]!=null)}validate(e,t){return t.every(t=>{if((t===`hour`||t===`dayPeriod`)&&`hour`in e){let[t,n]=Zv(e.hour,this.hourCycle);return this.dayPeriod===t&&this.hour===n}return this[t]===e[t]})}isCleared(e){return e.every(e=>this[e]===null)}set(e,t,n){let r=this.copy();return r[e]=t,e===`hour`&&r.dayPeriod==null&&`hour`in n&&(r.dayPeriod=Zv(n.hour,this.hourCycle)[0]),e===`year`&&r.era==null&&(r.era=n.era),e!==`second`&&e!==`literal`&&e!==`timeZoneName`&&(r.offset=null),r}clear(e){let t=this.copy();return t[e]=null,e===`year`&&(t.era=null),t.offset=null,t}cycle(e,t,n,r){let i=this.copy();if(i[e]==null&&e!==`dayPeriod`&&e!==`era`){if(e===`hour`&&`hour`in n){let[e,t]=Zv(n.hour,this.hourCycle);i.dayPeriod=e,i.hour=t}else i[e]=n[e];return e===`year`&&i.era==null&&(i.era=n.era),i}switch(e){case`era`:{let e=this.calendar.getEras(),n=e.indexOf(i.era);n=Xv(n,t,0,e.length-1),i.era=e[n];break}case`year`:{let r=new ot(this.calendar,this.era??n.era,this.year??n.year,this.month??1,this.day??1);r=r.cycle(e,t,{round:e===`year`}),i.era=r.era,i.year=r.year;break}case`month`:i.month=Xv(i.month??1,t,1,this.calendar.getMaximumMonthsInYear());break;case`day`:i.day=Xv(i.day??1,t,1,this.calendar.getMaximumDaysInMonth());break;case`hour`:{let e=r.some(e=>[`year`,`month`,`day`].includes(e));if(`timeZone`in n&&(!e||i.year!=null&&i.month!=null&&i.day!=null)){let e=this.toValue(n);e=e.cycle(`hour`,t,{hourCycle:this.hourCycle===`h12`?12:24,round:!1});let[r,a]=Zv(e.hour,this.hourCycle);i.hour=a,i.dayPeriod=r,i.offset=e.offset}else{let e=i.hour??0,r=this.getSegmentLimits(`hour`);i.hour=Xv(e,t,r.minValue,r.maxValue),i.dayPeriod==null&&`hour`in n&&(i.dayPeriod=Zv(n.hour,this.hourCycle)[0])}break}case`dayPeriod`:i.dayPeriod=Xv(i.dayPeriod??0,t,0,1);break;case`minute`:i.minute=Xv(i.minute??0,t,0,59,!0);break;case`second`:i.second=Xv(i.second??0,t,0,59,!0)}return i}toValue(e){if(`hour`in e){let t=this.hour;t==null?(this.hourCycle===`h12`||this.hourCycle===`h11`)&&(t=this.dayPeriod===1?12:0):t=Qv(t,this.dayPeriod??0,this.hourCycle);let n=e.set({era:this.era??e.era,year:this.year??e.year,month:this.month??e.month,day:this.day??e.day,hour:t??e.hour,minute:this.minute??e.minute,second:this.second??e.second,millisecond:this.millisecond??e.millisecond});return`offset`in n&&this.offset!=null&&n.offset!==this.offset&&(n=n.add({milliseconds:n.offset-this.offset})),n}return e.set({era:this.era??e.era,year:this.year??e.year,month:this.month??e.month,day:this.day??e.day})}getSegmentLimits(e){switch(e){case`era`:{let e=this.calendar.getEras();return{value:this.era==null?e.length-1:e.indexOf(this.era),minValue:0,maxValue:e.length-1}}case`year`:return{value:this.year,minValue:1,maxValue:9999};case`month`:return{value:this.month,minValue:1,maxValue:this.calendar.getMaximumMonthsInYear()};case`day`:return{value:this.day,minValue:1,maxValue:this.calendar.getMaximumDaysInMonth()};case`dayPeriod`:return{value:this.dayPeriod,minValue:0,maxValue:1};case`hour`:{let e=0,t=23;return this.hourCycle===`h12`?(e=1,t=12):this.hourCycle===`h11`&&(e=0,t=11),{value:this.hour,minValue:e,maxValue:t}}case`minute`:return{value:this.minute,minValue:0,maxValue:59};case`second`:return{value:this.second,minValue:0,maxValue:59}}}};function Xv(e,t,n,r,i=!1){if(i){e+=Math.sign(t),e<n&&(e=r);let i=Math.abs(t);e=t>0?Math.ceil(e/i)*i:Math.floor(e/i)*i,e>r&&(e=n)}else e+=t,e<n?e=r-(n-e-1):e>r&&(e=n+(e-r-1));return e}function Zv(e,t){let n=+(e>=12);switch(t){case`h11`:e>=12&&(e-=12);break;case`h12`:e===0?e=12:e>12&&(e-=12);break;case`h23`:n=null;break;case`h24`:e+=1,n=null}return[n,e]}function Qv(e,t,n){switch(n){case`h11`:t===1&&(e+=12);break;case`h12`:e===12&&(e=0),t===1&&(e+=12);break;case`h24`:--e}return e}let $v={year:!0,month:!0,day:!0,hour:!0,minute:!0,second:!0,dayPeriod:!0,era:!0},ey={year:5,month:2,day:7,hour:2,minute:15,second:15},ty={dayperiod:`dayPeriod`,relatedYear:`year`,yearName:`literal`,unknown:`literal`};function ny(e){let{locale:t,createCalendar:n,hideTimeZone:r,isDisabled:i=!1,isReadOnly:a=!1,isRequired:o=!1,minValue:s,maxValue:c,isDateUnavailable:l}=e,u=e.value||e.defaultValue||e.placeholderValue||null,[d,f]=Kv(u,e.granularity),p=f||`UTC`;if(u&&!(d in u))throw Error(`Invalid granularity `+d+` for value `+u.toString());let[m,g]=(0,R.useMemo)(()=>{let r=new pn(t,{dateStyle:`short`,timeStyle:`short`,hour12:e.hourCycle==null?void 0:e.hourCycle===12}).resolvedOptions();return[n(r.calendar),r.hourCycle]},[t,e.hourCycle,n]),[_,v]=ta(e.value,e.defaultValue??null,e.onChange),[y]=(0,R.useState)(_),x=(0,R.useMemo)(()=>Wv(_,m)??null,[_,m]),[S,C]=(0,R.useState)(()=>new Yv(m,g,x)),w=m.identifier===`gregory`&&S.era===`BC`,T=(0,R.useMemo)(()=>({granularity:d,maxGranularity:e.maxGranularity??`year`,timeZone:f,hideTimeZone:r,hourCycle:e.hourCycle,showEra:w,shouldForceLeadingZeros:e.shouldForceLeadingZeros}),[e.maxGranularity,d,e.hourCycle,e.shouldForceLeadingZeros,f,r,w]),E=(0,R.useMemo)(()=>Hv({},T),[T]),D=(0,R.useMemo)(()=>new pn(t,E),[t,E]),O=(0,R.useMemo)(()=>D.resolvedOptions(),[D]),k=(0,R.useMemo)(()=>Gv(e.placeholderValue,d,m,f),[e.placeholderValue,d,m,f]),A=(0,R.useMemo)(()=>{let t=g===`h11`||g===`h12`,n=[`era`,`year`,`month`,`day`,`hour`,...t?[`dayPeriod`]:[],`minute`,`second`],r=n.indexOf(e.maxGranularity||`era`),i=n.indexOf(d===`hour`&&t?`dayPeriod`:d);return n.slice(r,i+1)},[e.maxGranularity,d,g]),[j,M]=(0,R.useState)(x),[ee,N]=(0,R.useState)(m),[te,ne]=(0,R.useState)(g);(x!==j||g!==te||!b(m,ee))&&(S=new Yv(m,g,x),M(x),N(m),ne(g),C(S));let P=t=>{if(!(e.isDisabled||e.isReadOnly)){if(t==null||t instanceof Yv&&t.isCleared(A))C(new Yv(m,g,x)),v(null);else if(!(t instanceof Yv))t=L(t,u?.calendar||new h),C(new Yv(m,g,x)),v(t);else{if(t.isComplete(A)){let e=t.toValue(x??k);if(t.validate(e,A)){let t=L(e,u?.calendar||new h);if(!_||t.compare(_)!==0){C(new Yv(m,g,x)),v(t);return}}}C(t)}}},F=(0,R.useMemo)(()=>S.toValue(x??k).toDate(p),[S,p,x,k]),re=(0,R.useMemo)(()=>ry(F,S,D,O,m,t,d),[F,D,O,S,m,t,d]),I=(e,t)=>{P(S.cycle(e,t,k,A))},ie=(0,R.useMemo)(()=>zv(_,s,c,l,T),[_,s,c,l,T]),ae=El({...e,value:_,builtinValidation:ie}),oe=ae.displayValidation.isInvalid,se=e.validationState||(oe?`invalid`:null);return{...ae,value:x,defaultValue:e.defaultValue??y,dateValue:F,calendar:m,setValue:P,segments:re,dateFormatter:D,validationState:se,isInvalid:oe,granularity:d,maxGranularity:e.maxGranularity??`year`,isDisabled:i,isReadOnly:a,isRequired:o,increment(e){I(e,1)},decrement(e){I(e,-1)},incrementPage(e){I(e,ey[e]||1)},decrementPage(e){I(e,-(ey[e]||1))},incrementToMax(e){let t=e===`hour`&&g===`h12`?11:S.getSegmentLimits(e).maxValue;P(S.set(e,t,k))},decrementToMin(e){let t=e===`hour`&&g===`h12`?12:S.getSegmentLimits(e).minValue;P(S.set(e,t,k))},setSegment(e,t){P(S.set(e,t,k))},confirmPlaceholder(){if(!(e.isDisabled||e.isReadOnly)&&S.isComplete(A)){let e=L(S.toValue(x??k),u?.calendar||new h);(!_||e.compare(_)!==0)&&v(e),C(new Yv(m,g,x))}},clearSegment(e){let t=S;e!==`timeZoneName`&&e!==`literal`&&(t=S.clear(e)),P(t)},formatValue(e){if(!x)return``;let n=Hv(e,T);return new pn(t,n).format(F)},getDateFormatter(e,t){return new pn(e,Hv({},{...T,...t}))}}}function ry(e,t,n,r,i,a,o){let s=[`hour`,`minute`,`second`],c=n.formatToParts(e),l=new ss(a,{useGrouping:!1}),u=new ss(a,{useGrouping:!1,minimumIntegerDigits:2});for(let e of c)if(e.type===`year`||e.type===`month`||e.type===`day`||e.type===`hour`){let n=t[e.type]??0;e.value=r[e.type]===`2-digit`?u.format(n):l.format(n)}let d=[];for(let e of c){let n=ty[e.type]||e.type,r=$v[n];n===`era`&&i.getEras().length===1&&(r=!1);let c=$v[n]&&t[e.type]==null,l=$v[n]?Jv(n,e.value,a):null,u={type:n,text:c?l:e.value,...t.getSegmentLimits(n),isPlaceholder:c,placeholder:l,isEditable:r};n===`hour`?(d.push({type:`literal`,text:`⁦`,isPlaceholder:!1,placeholder:``,isEditable:!1}),d.push(u),n===o&&d.push({type:`literal`,text:`⁩`,isPlaceholder:!1,placeholder:``,isEditable:!1})):s.includes(n)&&n===o?(d.push(u),d.push({type:`literal`,text:`⁩`,isPlaceholder:!1,placeholder:``,isEditable:!1})):d.push(u)}return d}let iy=(0,R.createContext)(null),ay=(0,R.createContext)(null),oy=(0,R.createContext)(null),sy=(0,R.forwardRef)(function(e,t){let n=(0,R.useContext)(ay),r=(0,R.useContext)(oy);return n||r?R.default.createElement(ly,{...e,ref:t}):R.default.createElement(cy,{...e,ref:t})}),cy=(0,R.forwardRef)((e,t)=>{let[n,r]=U({slot:e.slot},t,iy),{locale:i}=Z(),a=ny({...n,locale:i,createCalendar:dn}),o=(0,R.useRef)(null),{fieldProps:s,inputProps:c}=Y_({...n,inputRef:o},a,r);return R.default.createElement(Jn,{values:[[ay,a],[tu,{...c,ref:o}],[$l,{...s,ref:r,isInvalid:a.isInvalid,isDisabled:a.isDisabled}]]},R.default.createElement(ly,e))}),ly=(0,R.forwardRef)((e,t)=>{let{className:n,children:r}=e,i=(0,R.useContext)(ay),a=(0,R.useContext)(oy),o=i??a;return R.default.createElement(R.default.Fragment,null,R.default.createElement(eu,{...e,ref:t,slot:e.slot||void 0,className:n??`react-aria-DateInput`,isReadOnly:o.isReadOnly,isInvalid:o.isInvalid,isDisabled:o.isDisabled},o.segments.map((e,t)=>(0,R.cloneElement)(r(e),{key:t}))),R.default.createElement(ru,{className:``}))}),uy=(0,R.forwardRef)(function({segment:e,...t},n){let r=(0,R.useContext)(ay),i=(0,R.useContext)(oy),a=r??i,o=Kn(n),{segmentProps:s}=$_(e,a,o),{focusProps:c,isFocused:l,isFocusVisible:u}=Yo(),{hoverProps:d,isHovered:f}=ts({...t,isDisabled:a.isDisabled||e.type===`literal`}),p=H({...t,values:{...e,isReadOnly:a.isReadOnly,isInvalid:a.isInvalid,isDisabled:a.isDisabled,isHovered:f,isFocused:l,isFocusVisible:u},defaultChildren:e.text,defaultClassName:`react-aria-DateSegment`});return R.default.createElement(W.span,{...V(Q(t,{global:!0}),s,c,d),...p,style:s.style,ref:o,"data-placeholder":e.isPlaceholder||void 0,"data-invalid":a.isInvalid||void 0,"data-readonly":a.isReadOnly||void 0,"data-disabled":a.isDisabled||void 0,"data-type":e.type,"data-hovered":f||void 0,"data-focused":l||void 0,"data-focus-visible":u||void 0})});function dy(e){return e&&e.__esModule?e.default:e}function fy(e,t,n){let r=B(),i=B(),a=B(),o=$i(dy(U_),`@react-aria/datepicker`),{isInvalid:s,validationErrors:c,validationDetails:l}=t.displayValidation,{labelProps:u,fieldProps:d,descriptionProps:f,errorMessageProps:p}=Pl({...e,labelElementType:`span`,isInvalid:s,errorMessage:e.errorMessage||c}),m=W_(t,n),h=d[`aria-labelledby`]||d.id,{locale:g}=Z(),_=t.formatValue(g,{month:`long`}),v=Wc(_?o.format(`selectedDateDescription`,{date:_}):``),y=[v[`aria-describedby`],d[`aria-describedby`]].filter(Boolean).join(` `)||void 0,b=Q(e),x=(0,R.useMemo)(()=>hp(n),[n]),S=(0,R.useRef)(!1),{focusWithinProps:C}=Jo({...e,isDisabled:t.isOpen,onBlurWithin:t=>{q(document.getElementById(i),t.relatedTarget)||(S.current=!1,e.onBlur?.(t),e.onFocusChange?.(!1))},onFocusWithin:t=>{S.current||(S.current=!0,e.onFocus?.(t),e.onFocusChange?.(!0))}});return{groupProps:V(b,m,d,v,C,{role:`group`,"aria-disabled":e.isDisabled||null,"aria-labelledby":h,"aria-describedby":y,onKeyDown(n){t.isOpen||e.onKeyDown&&e.onKeyDown(n)},onKeyUp(n){t.isOpen||e.onKeyUp&&e.onKeyUp(n)}}),labelProps:{...u,onClick:()=>{x.focusFirst()}},fieldProps:{...d,id:a,[J_]:`presentation`,"aria-describedby":y,value:t.value,defaultValue:t.defaultValue,onChange:t.setValue,placeholderValue:e.placeholderValue,hideTimeZone:e.hideTimeZone,hourCycle:e.hourCycle,shouldForceLeadingZeros:e.shouldForceLeadingZeros,granularity:e.granularity,isDisabled:e.isDisabled,isReadOnly:e.isReadOnly,isRequired:e.isRequired,validationBehavior:e.validationBehavior,[Tl]:t,autoFocus:e.autoFocus,name:e.name,form:e.form},descriptionProps:f,errorMessageProps:p,buttonProps:{...v,id:r,"aria-haspopup":`dialog`,"aria-label":o.format(`calendar`),"aria-labelledby":`${r} ${h}`,"aria-describedby":y,"aria-expanded":t.isOpen,isDisabled:e.isDisabled||e.isReadOnly,onPress:()=>t.setOpen(!0)},dialogProps:{id:i,"aria-labelledby":`${r} ${h}`},calendarProps:{autoFocus:!0,value:t.dateValue,onChange:t.setDateValue,minValue:e.minValue,maxValue:e.maxValue,isDisabled:e.isDisabled,isReadOnly:e.isReadOnly,isDateUnavailable:e.isDateUnavailable,defaultFocusedValue:t.dateValue?void 0:e.placeholderValue,isInvalid:t.isInvalid,errorMessage:typeof e.errorMessage==`function`?e.errorMessage(t.displayValidation):e.errorMessage||t.displayValidation.validationErrors.join(` `),firstDayOfWeek:e.firstDayOfWeek,pageBehavior:e.pageBehavior},isInvalid:s,validationErrors:c,validationDetails:l}}function py(e){let t=og(e),[n,r]=ta(e.value,e.defaultValue||null,e.onChange),[i]=(0,R.useState)(n),a=n||e.placeholderValue||null,[o,s]=Kv(a,e.granularity),c=n==null?null:n.toDate(s??`UTC`),l=o===`hour`||o===`minute`||o===`second`,u=e.shouldCloseOnSelect??!0,[d,f]=(0,R.useState)(null),[p,m]=(0,R.useState)(null);if(n&&(d=n,`hour`in n&&(p=n)),a&&!(o in a))throw Error(`Invalid granularity `+o+` for value `+a.toString());let h=n?.calendar.identifier===`gregory`&&n.era===`BC`,g=(0,R.useMemo)(()=>({granularity:o,timeZone:s,hideTimeZone:e.hideTimeZone,hourCycle:e.hourCycle,shouldForceLeadingZeros:e.shouldForceLeadingZeros,showEra:h}),[o,e.hourCycle,e.shouldForceLeadingZeros,s,e.hideTimeZone,h]),{minValue:_,maxValue:v,isDateUnavailable:y}=e,b=(0,R.useMemo)(()=>zv(n,_,v,y,g),[n,_,v,y,g]),x=El({...e,value:n,builtinValidation:b}),S=x.displayValidation.isInvalid,C=e.validationState||(S?`invalid`:null),w=(e,t)=>{r(`timeZone`in t?t.set(ve(e)):ye(e,t)),f(null),m(null),x.commitValidation()},T=n=>{let i=typeof u==`function`?u():u;l?p||i?w(n,p||Uv(e.defaultValue||e.placeholderValue)):f(n):(r(n),x.commitValidation()),i&&t.setOpen(!1)},E=e=>{d&&e?w(d,e):m(e)};return{...x,value:n,defaultValue:e.defaultValue??i,setValue:r,dateValue:d,timeValue:p,setDateValue:T,setTimeValue:E,granularity:o,hasTime:l,...t,setOpen(r){!r&&!n&&d&&l&&w(d,p||Uv(e.defaultValue||e.placeholderValue)),t.setOpen(r)},validationState:C,isInvalid:S,formatValue(e,t){return c?new pn(e,Hv(t,g)).format(c):``},getDateFormatter(e,t){return new pn(e,Hv({},{...g,...t}))}}}let my=(0,R.createContext)(null),hy=(0,R.createContext)(null),gy=[$l,Ns,ns,zs],_y=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,my);let{validationBehavior:n}=Yn(Ml)||{},r=e.validationBehavior??n??`native`,i=py({...e,validationBehavior:r}),a=(0,R.useRef)(null),[o,s]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{groupProps:c,labelProps:l,fieldProps:u,buttonProps:d,dialogProps:f,calendarProps:p,descriptionProps:m,errorMessageProps:h,...g}=fy({...Zn(e),label:s,validationBehavior:r},i,a),{focusProps:_,isFocused:v,isFocusVisible:y}=Yo({within:!0}),b=H({...e,values:{state:i,isFocusWithin:v,isFocusVisible:y,isDisabled:e.isDisabled||!1,isInvalid:i.isInvalid,isOpen:i.isOpen,isReadOnly:e.isReadOnly||!1,isRequired:e.isRequired||!1},defaultClassName:`react-aria-DatePicker`}),x=Q(e,{global:!0});return delete x.id,R.default.createElement(Jn,{values:[[hy,i],[$l,{...c,ref:a,isInvalid:i.isInvalid}],[iy,u],[Ns,{...d,isPressed:i.isOpen}],[ns,{...l,ref:o,elementType:`span`}],[ol,p],[t_,i],[ug,{trigger:`DatePicker`,triggerRef:a,placement:`bottom start`,clearContexts:gy}],[e_,f],[zs,{slots:{description:m,errorMessage:h}}],[bl,g]]},R.default.createElement(W.div,{...V(x,b,_),ref:t,slot:e.slot||void 0,"data-focus-within":v||void 0,"data-invalid":i.isInvalid||void 0,"data-focus-visible":y||void 0,"data-disabled":e.isDisabled||void 0,"data-readonly":e.isReadOnly||void 0,"data-required":e.isRequired||void 0,"data-open":i.isOpen||void 0}),R.default.createElement(c_,{autoComplete:e.autoComplete,name:e.name,isDisabled:e.isDisabled,state:i}))});function vy(e,t,n){let{isDisabled:r}=e,i=B(),a=B(),o=Pn(),s=(0,R.useRef)(null);Ti(n,`beforematch`,(0,R.useCallback)(()=>{s.current=requestAnimationFrame(()=>{n.current&&n.current.setAttribute(`hidden`,`until-found`)}),(0,Ya.flushSync)(()=>{t.toggle()})},[n,t]));let c=(0,R.useRef)(null);return z(()=>{if(s.current&&cancelAnimationFrame(s.current),n.current&&!o){let e=n.current;c.current==null||typeof e.getAnimations!=`function`?t.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)):(e.setAttribute(`hidden`,`until-found`),e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`)):t.isExpanded!==c.current&&(t.isExpanded?(e.removeAttribute(`hidden`),e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>{e.style.setProperty(`--disclosure-panel-width`,`auto`),e.style.setProperty(`--disclosure-panel-height`,`auto`)}).catch(()=>{})):(e.style.setProperty(`--disclosure-panel-width`,e.scrollWidth+`px`),e.style.setProperty(`--disclosure-panel-height`,e.scrollHeight+`px`),window.getComputedStyle(e).height,e.style.setProperty(`--disclosure-panel-width`,`0px`),e.style.setProperty(`--disclosure-panel-height`,`0px`),Promise.all(e.getAnimations().map(e=>e.finished)).then(()=>e.setAttribute(`hidden`,`until-found`)).catch(()=>{}))),c.current=t.isExpanded}},[r,n,t.isExpanded,o]),(0,R.useEffect)(()=>()=>{s.current&&cancelAnimationFrame(s.current)},[]),{buttonProps:{id:i,"aria-expanded":t.isExpanded,"aria-controls":a,onPress:e=>{!r&&e.pointerType!==`keyboard`&&t.toggle()},isDisabled:r,onPressStart(e){e.pointerType===`keyboard`&&!r&&t.toggle()}},panelProps:{id:a,role:`group`,"aria-labelledby":i,"aria-hidden":!t.isExpanded,hidden:o?!t.isExpanded:void 0}}}function yy(e){let{allowsMultipleExpanded:t=!1,isDisabled:n=!1}=e,[r,i]=ta((0,R.useMemo)(()=>e.expandedKeys?new Set(e.expandedKeys):void 0,[e.expandedKeys]),(0,R.useMemo)(()=>e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,[e.defaultExpandedKeys]),e.onExpandedChange);return(0,R.useEffect)(()=>{if(!t&&r.size>1){let e=r.values().next().value;e!=null&&i(new Set([e]))}}),{allowsMultipleExpanded:t,isDisabled:n,expandedKeys:r,setExpandedKeys:i,toggleKey(e){let n;t?(n=new Set(r),n.has(e)?n.delete(e):n.add(e)):n=new Set(r.has(e)?[]:[e]),i(n)}}}function by(e){let[t,n]=ta(e.isExpanded,e.defaultExpanded||!1,e.onExpandedChange);return{isExpanded:t,setExpanded:n,expand:(0,R.useCallback)(()=>{n(!0)},[n]),collapse:(0,R.useCallback)(()=>{n(!1)},[n]),toggle:(0,R.useCallback)(()=>{n(!t)},[n,t])}}let xy=(0,R.createContext)(null),Sy=(0,R.forwardRef)(function(e,t){let n=yy(e),r=H({...e,defaultClassName:`react-aria-DisclosureGroup`,values:{isDisabled:n.isDisabled,state:n}}),i=Q(e,{global:!0});return R.default.createElement(W.div,{...i,...r,ref:t,"data-disabled":e.isDisabled||void 0},R.default.createElement(xy.Provider,{value:n},r.children))}),Cy=(0,R.createContext)(null),wy=(0,R.createContext)(null),Ty=(0,R.createContext)(null),Ey=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Cy);let n=(0,R.useContext)(xy),{id:r,...i}=e,a=B();r||=a;let o=n?n.expandedKeys.has(r):e.isExpanded,s=by({...e,isExpanded:o,onExpandedChange(t){n&&n.toggleKey(r),e.onExpandedChange?.(t)}}),c=R.default.useRef(null),l=e.isDisabled||n?.isDisabled||!1,{buttonProps:u,panelProps:d}=vy({...e,isExpanded:o,isDisabled:l},s,c),{isFocusVisible:f,focusProps:p}=Yo({within:!0}),m=H({...e,id:void 0,defaultClassName:`react-aria-Disclosure`,values:{isExpanded:s.isExpanded,isDisabled:l,isFocusVisibleWithin:f,state:s}}),h=Q(i,{global:!0});return R.default.createElement(Jn,{values:[[Ns,{slots:{[qn]:{},trigger:u}}],[Ty,{panelProps:d,panelRef:c}],[wy,s]]},R.default.createElement(W.div,{...V(h,m,p),ref:t,"data-expanded":s.isExpanded||void 0,"data-disabled":l||void 0,"data-focus-visible-within":f||void 0},m.children))}),Dy=(0,R.forwardRef)(function(e,t){let{role:n=`group`}=e,{panelProps:r,panelRef:i}=(0,R.useContext)(Ty),{isFocusVisible:a,focusProps:o}=Yo({within:!0}),s=H({...e,defaultClassName:`react-aria-DisclosurePanel`,values:{isFocusVisibleWithin:a}}),c=Q(e,{global:!0,labelable:!0});return R.default.createElement(W.div,{...V(c,s,r,o),ref:Hn(t,i),role:n,"data-focus-visible-within":a||void 0},R.default.createElement(Jn,{values:[[Ns,null]]},e.children))});function Oy(e,t){let n=t?.isDisabled,[r,i]=(0,R.useState)(!1);return z(()=>{if(e?.current&&!n){let t=()=>{if(e.current){let t=mp(e.current,{tabbable:!0});i(!!t.nextNode())}};t();let n=new MutationObserver(t);return n.observe(e.current,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`tabIndex`,`disabled`]}),()=>{n.disconnect()}}}),!n&&r}let ky={},Ay=0,jy=!1,My=null,Ny=null;function Py(e={}){let{delay:t=1500,closeDelay:n=500}=e,{isOpen:r,open:i,close:a}=og(e),[o,s]=(0,R.useState)(!1),c=(0,R.useMemo)(()=>`${++Ay}`,[]),l=(0,R.useRef)(null),u=(0,R.useRef)(a),d=()=>{ky[c]=m},f=()=>{for(let e in ky)e!==c&&(ky[e](!0,!0),delete ky[e])},p=e=>{l.current&&clearTimeout(l.current),l.current=null,f(),d(),s(!!e),jy=!0,i(),My&&=(clearTimeout(My),null),Ny&&=(clearTimeout(Ny),null)},m=(e,t)=>{s(!!t),e||n<=0?(l.current&&clearTimeout(l.current),l.current=null,u.current()):l.current||=setTimeout(()=>{l.current=null,u.current()},n),My&&=(clearTimeout(My),null),jy&&(Ny&&clearTimeout(Ny),Ny=setTimeout(()=>{delete ky[c],Ny=null,jy=!1},Math.max(500,n)))},h=()=>{f(),d(),!r&&!jy?(My&&clearTimeout(My),My=setTimeout(()=>{My=null,jy=!0,p(!1)},t)):r||p(!0)};return(0,R.useEffect)(()=>{u.current=a},[a]),(0,R.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),ky[c]&&delete ky[c]},[c]),{isOpen:r,shouldSkipAnimation:o,open:e=>{!e&&t>0&&!l.current?h():p(jy)},close:m}}function Fy(e,t,n){let{overlayProps:r,underlayProps:i}=sh({...e,isOpen:t.isOpen,onClose:t.close},n);return dh({isDisabled:!t.isOpen}),ag(),(0,R.useEffect)(()=>{if(t.isOpen&&n.current)return Em([n.current],{shouldUseInert:!0})},[t.isOpen,n]),{modalProps:V(r),underlayProps:i}}let Iy=typeof document<`u`&&window.visualViewport;function Ly(){let e=Pn(),[t,n]=(0,R.useState)(()=>e?{width:0,height:0}:Ry());return(0,R.useEffect)(()=>{let e=e=>{n(t=>e.width===t.width&&e.height===t.height?t:e)},t=()=>{Iy&&Iy.scale>1||e(Ry())},r,i=t=>{Iy&&Iy.scale>1||Ci(Y(t))&&(r=requestAnimationFrame(()=>{let t=J();(!t||!Ci(t))&&e({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight})}))};return e(Ry()),zr()&&Vr()&&window.addEventListener(`blur`,i,!0),Iy?Iy.addEventListener(`resize`,t):window.addEventListener(`resize`,t),()=>{cancelAnimationFrame(r),zr()&&Vr()&&window.removeEventListener(`blur`,i,!0),Iy?Iy.removeEventListener(`resize`,t):window.removeEventListener(`resize`,t)}},[]),t}function Ry(){return{width:Iy?Math.min(Iy.width*Iy.scale,document.documentElement.clientWidth):document.documentElement.clientWidth,height:Iy?Iy.height*Iy.scale:document.documentElement.clientHeight}}let zy=(0,R.createContext)(null),By=(0,R.createContext)(null),Vy=(0,R.forwardRef)(function(e,t){if((0,R.useContext)(By))return R.default.createElement(Gy,{...e,modalRef:t},e.children);let{isDismissable:n,isKeyboardDismissDisabled:r,isOpen:i,defaultOpen:a,onOpenChange:o,children:s,isEntering:c,isExiting:l,UNSTABLE_portalContainer:u,shouldCloseOnInteractOutside:d,...f}=e;return R.default.createElement(Uy,{isDismissable:n,isKeyboardDismissDisabled:r,isOpen:i,defaultOpen:a,onOpenChange:o,isEntering:c,isExiting:l,UNSTABLE_portalContainer:u,shouldCloseOnInteractOutside:d},R.default.createElement(Gy,{...f,modalRef:t},s))});function Hy(e,t){[e,t]=U(e,t,zy);let n=(0,R.useContext)(t_),r=og(e),i=e.isOpen!=null||e.defaultOpen!=null||!n?r:n,a=Kn(t),o=(0,R.useRef)(null),s=cg(a,i.isOpen),c=cg(o,i.isOpen),l=s||c||e.isExiting||!1,u=Pn();return!i.isOpen&&!l||u?null:R.default.createElement(Wy,{...e,state:i,isExiting:l,overlayRef:a,modalRef:o})}let Uy=(0,R.forwardRef)(Hy);function Wy({UNSTABLE_portalContainer:e,...t}){let n=t.modalRef,{state:r}=t,{modalProps:i,underlayProps:a}=Fy(t,r,n),o=sg(t.overlayRef)||t.isEntering||!1,s=H({...t,defaultClassName:`react-aria-ModalOverlay`,values:{isEntering:o,isExiting:t.isExiting,state:r}}),c=Ly(),l,u;if(typeof document<`u`){let e=Ic(document.body)?document.body:document.scrollingElement||document.documentElement,t=e.getBoundingClientRect().width%1,n=e.getBoundingClientRect().height%1;l=e.scrollWidth-t,u=e.scrollHeight-n}let d={...s.style,"--visual-viewport-width":c.width+`px`,"--visual-viewport-height":c.height+`px`,"--page-width":l===void 0?void 0:l+`px`,"--page-height":u===void 0?void 0:u+`px`};return R.default.createElement(ig,{isExiting:t.isExiting,portalContainer:e},R.default.createElement(W.div,{...V(Q(t,{global:!0}),a),...s,style:d,ref:t.overlayRef,"data-entering":o||void 0,"data-exiting":t.isExiting||void 0},R.default.createElement(Jn,{values:[[By,{modalProps:i,modalRef:n,isExiting:t.isExiting,isDismissable:t.isDismissable}],[t_,r]]},s.children)))}function Gy(e){let{modalProps:t,modalRef:n,isExiting:r,isDismissable:i}=(0,R.useContext)(By),a=(0,R.useContext)(t_),o=Kn((0,R.useMemo)(()=>Hn(e.modalRef,n),[e.modalRef,n])),s=sg(o),c=H({...e,defaultClassName:`react-aria-Modal`,values:{isEntering:s,isExiting:r,state:a}});return R.default.createElement(W.div,{...V(Q(e,{global:!0}),t),...c,ref:o,"data-entering":s||void 0,"data-exiting":r||void 0},i&&R.default.createElement($h,{onDismiss:a.close}),c.children)}let Ky=(0,R.createContext)(null),qy=(0,R.createContext)(null),Jy=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Ky);let{validationBehavior:n}=Yn(Ml)||{},r=e.validationBehavior??n??`native`,{locale:i}=Z(),a=jd({...e,locale:i,validationBehavior:r}),o=(0,R.useRef)(null),[s,c]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{labelProps:l,groupProps:u,inputProps:d,incrementButtonProps:f,decrementButtonProps:p,descriptionProps:m,errorMessageProps:h,...g}=Od({...Zn(e),label:c,validationBehavior:r},a,o),_=H({...e,values:{state:a,isDisabled:e.isDisabled||!1,isInvalid:g.isInvalid||!1,isRequired:e.isRequired||!1,isReadOnly:e.isReadOnly||!1},defaultClassName:`react-aria-NumberField`}),v=Q(e,{global:!0});return delete v.id,R.default.createElement(Jn,{values:[[qy,a],[$l,u],[tu,{...d,ref:o}],[ns,{...l,ref:s}],[Ns,{slots:{increment:f,decrement:p}}],[zs,{slots:{description:m,errorMessage:h}}],[bl,g]]},R.default.createElement(W.div,{...v,..._,ref:t,slot:e.slot||void 0,"data-disabled":e.isDisabled||void 0,"data-readonly":e.isReadOnly||void 0,"data-required":e.isRequired||void 0,"data-invalid":g.isInvalid||void 0}),e.name&&R.default.createElement(`input`,{type:`hidden`,name:e.name,form:e.form,value:isNaN(a.numberValue)?``:a.numberValue,disabled:e.isDisabled||void 0}))}),Yy=new WeakMap;function Xy(e,t,n){let{value:r,children:i,"aria-label":a,"aria-labelledby":o,onPressStart:s,onPressEnd:c,onPressChange:l,onPress:u,onPressUp:d,onClick:f}=e,p=e.isDisabled||t.isDisabled,m=t.selectedValue===r,h=e=>{e.stopPropagation(),t.setSelectedValue(r)},{pressProps:g,isPressed:_}=Bo({onPressStart:s,onPressEnd:c,onPressChange:l,onPress:u,onPressUp:d,onClick:f,isDisabled:p}),{pressProps:v,isPressed:y}=Bo({onPressStart:s,onPressEnd:c,onPressChange:l,onPressUp:d,onClick:f,isDisabled:p,onPress(e){u?.(e),t.setSelectedValue(r),n.current?.focus()}}),{focusableProps:b}=Ba(V(e,{onFocus:()=>t.setLastFocusedValue(r)}),n),x=V(g,b),S=Q(e,{labelable:!0}),C=-1;t.selectedValue==null?(t.lastFocusedValue===r||t.lastFocusedValue==null)&&(C=0):t.selectedValue===r&&(C=0),p&&(C=void 0);let{name:w,form:T,descriptionId:E,errorMessageId:D,validationBehavior:O}=Yy.get(t);Fl(n,t.defaultSelectedValue,t.setSelectedValue),Il({validationBehavior:O},t,n);let k=Vl();return{labelProps:V(v,(0,R.useMemo)(()=>({onClick:e=>e.preventDefault(),onMouseDown:e=>e.preventDefault()}),[])),inputProps:V(S,{...x,type:`radio`,name:w,form:T,tabIndex:C,disabled:p,required:t.isRequired&&O===`native`,checked:m,value:r,onChange:h,"aria-describedby":[e[`aria-describedby`],k.id,t.isInvalid?D:null,E].filter(Boolean).join(` `)||void 0}),descriptionProps:k,isDisabled:p,isSelected:m,isPressed:_||y}}function Zy(e,t){let{name:n,form:r,isReadOnly:i,isRequired:a,isDisabled:o,orientation:s=`vertical`,validationBehavior:c=`aria`}=e,{direction:l}=Z(),{isInvalid:u,validationErrors:d,validationDetails:f}=t.displayValidation,{labelProps:p,fieldProps:m,descriptionProps:h,errorMessageProps:g}=Pl({...e,labelElementType:`span`,isInvalid:t.isInvalid,errorMessage:e.errorMessage||d}),_=Q(e,{labelable:!0}),{focusWithinProps:v}=Jo({onBlurWithin(n){e.onBlur?.(n),t.selectedValue||t.setLastFocusedValue(null)},onFocusWithin:e.onFocus,onFocusWithinChange:e.onFocusChange});function y(e,n){let r=mp(n.currentTarget,{from:Y(n),accept:e=>e instanceof K(e).HTMLInputElement&&e.type===`radio`}),i;return e===`next`?(i=r.nextNode(),i||=(r.currentNode=n.currentTarget,r.firstChild())):(i=r.previousNode(),i||=(r.currentNode=n.currentTarget,r.lastChild())),i?(i.focus(),t.setSelectedValue(i.value),!0):!1}let{keyboardProps:b}=Fa({shortcuts:{ArrowRight:e=>y(l===`rtl`&&s!==`vertical`?`prev`:`next`,e),ArrowLeft:e=>y(l===`rtl`&&s!==`vertical`?`next`:`prev`,e),ArrowDown:e=>y(`next`,e),ArrowUp:e=>y(`prev`,e)},allowRepeats:!0}),x=B(n);return Yy.set(t,{name:x,form:r,descriptionId:h.id,errorMessageId:g.id,validationBehavior:c}),{radioGroupProps:V(_,{role:`radiogroup`,...b,"aria-invalid":t.isInvalid||void 0,"aria-errormessage":e[`aria-errormessage`],"aria-readonly":i||void 0,"aria-required":a||void 0,"aria-disabled":o||void 0,"aria-orientation":s,...m,...v}),labelProps:p,descriptionProps:h,errorMessageProps:g,isInvalid:u,validationErrors:d,validationDetails:f}}let Qy=Math.round(Math.random()*1e10),$y=0;function eb(e){let t=(0,R.useMemo)(()=>e.name||`radio-group-${Qy}-${++$y}`,[e.name]),[n,r]=ta(e.value,e.defaultValue??null,e.onChange),[i]=(0,R.useState)(n),[a,o]=(0,R.useState)(null),s=El({...e,value:n}),c=t=>{!e.isReadOnly&&!e.isDisabled&&(r(t),s.commitValidation())},l=s.displayValidation.isInvalid;return{...s,name:t,selectedValue:n,defaultSelectedValue:e.value===void 0?e.defaultValue??null:i,setSelectedValue:c,lastFocusedValue:a,setLastFocusedValue:o,isDisabled:e.isDisabled||!1,isReadOnly:e.isReadOnly||!1,isRequired:e.isRequired||!1,validationState:e.validationState||(l?`invalid`:null),isInvalid:l}}let tb=(0,R.createContext)(null),nb=(0,R.createContext)(null),rb=(0,R.createContext)(null),ib=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,tb);let{validationBehavior:n}=Yn(Ml)||{},r=e.validationBehavior??n??`native`,i=eb({...e,validationBehavior:r}),[a,o]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{radioGroupProps:s,labelProps:c,descriptionProps:l,errorMessageProps:u,...d}=Zy({...e,label:o,validationBehavior:r},i),f=H({...e,values:{orientation:e.orientation||`vertical`,isDisabled:i.isDisabled,isReadOnly:i.isReadOnly,isRequired:i.isRequired,isInvalid:i.isInvalid,state:i},defaultClassName:`react-aria-RadioGroup`}),p=Q(e,{global:!0});return R.default.createElement(W.div,{...V(p,f,s),ref:t,slot:e.slot||void 0,"data-orientation":e.orientation||`vertical`,"data-invalid":i.isInvalid||void 0,"data-disabled":i.isDisabled||void 0,"data-readonly":i.isReadOnly||void 0,"data-required":i.isRequired||void 0},R.default.createElement(Jn,{values:[[rb,i],[ns,{...c,ref:a,elementType:`span`}],[zs,{slots:{description:l,errorMessage:u}}],[bl,d]]},R.default.createElement(Rf,null,f.children)))}),ab=(0,R.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=U(r,t,nb);let i=R.default.useContext(rb),a=Kn((0,R.useMemo)(()=>Hn(n,e.inputRef===void 0?null:e.inputRef),[n,e.inputRef])),o=Xy({...Zn(e),children:typeof e.children==`function`||e.children},i,a);return R.default.createElement(ob.Provider,{value:{...o,inputRef:a,defaultClassName:`react-aria-Radio`}},R.default.createElement(sb,{...e,ref:t}))}),ob=(0,R.createContext)(null),sb=(0,R.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isPressed:o,defaultClassName:s,inputRef:c}=(0,R.useContext)(ob),l=R.default.useContext(rb),{isFocused:u,isFocusVisible:d,focusProps:f}=Yo(),p=a||l.isReadOnly,{hoverProps:m,isHovered:h}=ts({...e,isDisabled:p}),g=H({...e,defaultClassName:s,values:{isSelected:i,isPressed:o,isHovered:h,isFocused:u,isFocusVisible:d,isDisabled:a,isReadOnly:l.isReadOnly,isInvalid:l.isInvalid,isRequired:l.isRequired}}),_=Q(e,{global:!0});return delete _.id,delete _.onClick,R.default.createElement(W.label,{...V(_,n,m,g),ref:t,"data-selected":i||void 0,"data-pressed":o||void 0,"data-hovered":h||void 0,"data-focused":u||void 0,"data-focus-visible":d||void 0,"data-disabled":a||void 0,"data-readonly":l.isReadOnly||void 0,"data-invalid":l.isInvalid||void 0,"data-required":l.isRequired||void 0},R.default.createElement(al,{elementType:`span`},R.default.createElement(`input`,{...V(r,f),ref:c})),g.children)}),cb=new WeakMap;function lb(e,t,n){let{keyboardDelegate:r,isDisabled:i,isRequired:a,name:o,form:s,validationBehavior:c=`aria`}=e,l=Np({usage:`search`,sensitivity:`base`}),u=(0,R.useMemo)(()=>r||new jp(t.collection,t.disabledKeys,n,l),[r,t.collection,t.disabledKeys,l,n]),{menuTriggerProps:d,menuProps:f}=Qg({isDisabled:i,type:`listbox`},t,n),{keyboardProps:p}=Fa({shortcuts:{ArrowLeft:()=>{if(t.selectionManager.selectionMode===`multiple`)return!1;let e=t.selectedKey==null?u.getFirstKey?.():u.getKeyAbove?.(t.selectedKey);e!=null&&t.setSelectedKey(e)},ArrowRight:()=>{if(t.selectionManager.selectionMode===`multiple`)return!1;let e=t.selectedKey==null?u.getFirstKey?.():u.getKeyBelow?.(t.selectedKey);e!=null&&t.setSelectedKey(e)}},allowRepeats:!0,onKeyDown:e.onKeyDown,onKeyUp:e.onKeyUp}),{typeSelectProps:m}=Ep({keyboardDelegate:u,selectionManager:t.selectionManager,onTypeSelect(e){t.setSelectedKey(e)}}),{isInvalid:h,validationErrors:g,validationDetails:_}=t.displayValidation,{labelProps:v,fieldProps:y,descriptionProps:b,errorMessageProps:x}=Pl({...e,labelElementType:`span`,isInvalid:h,errorMessage:e.errorMessage||g});t.selectionManager.selectionMode===`multiple`&&(m={});let S=Q(e,{labelable:!0}),C=V(m,d,y),w=B();return cb.set(t,{isDisabled:i,isRequired:a,name:o,form:s,validationBehavior:c}),{labelProps:{...v,onClick:()=>{e.isDisabled||(n.current?.focus(),_i(`keyboard`))}},triggerProps:V(S,{...C,isDisabled:i,onKeyDown:xn(C.onKeyDown,p.onKeyDown),onKeyUp:p.onKeyUp,"aria-labelledby":[w,C[`aria-labelledby`],C[`aria-label`]&&!C[`aria-labelledby`]?C.id:null].filter(Boolean).join(` `),onFocus(n){t.isFocused||(e.onFocus&&e.onFocus(n),e.onFocusChange&&e.onFocusChange(!0),t.setFocused(!0))},onBlur(n){t.isOpen||(e.onBlur&&e.onBlur(n),e.onFocusChange&&e.onFocusChange(!1),t.setFocused(!1))}}),valueProps:{id:w},menuProps:{...f,onAction:void 0,autoFocus:t.focusStrategy||!0,shouldSelectOnPressUp:!0,shouldFocusOnHover:!0,disallowEmptySelection:!0,linkBehavior:`selection`,onBlur:n=>{q(n.currentTarget,n.relatedTarget)||(e.onBlur&&e.onBlur(n),e.onFocusChange&&e.onFocusChange(!1),t.setFocused(!1))},"aria-labelledby":[y[`aria-labelledby`],C[`aria-label`]&&!y[`aria-labelledby`]?C.id:null].filter(Boolean).join(` `)},descriptionProps:b,errorMessageProps:x,isInvalid:h,validationErrors:g,validationDetails:_,hiddenSelectProps:{isDisabled:i,name:o,label:e.label,state:t,triggerRef:n,form:s}}}function ub(e,t,n){let r=cb.get(t)||{},{autoComplete:i,name:a=r.name,form:o=r.form,isDisabled:s=r.isDisabled}=e,{validationBehavior:c,isRequired:l}=r,{visuallyHiddenProps:u}=il({style:{position:`fixed`,top:0,left:0}});Fl(e.selectRef,t.defaultValue,t.setValue),Il({validationBehavior:c,focus:()=>n.current?.focus()},t,e.selectRef);let d=t.setValue,f=(0,R.useCallback)(e=>{let t=Y(e);t.multiple?d(Array.from(t.selectedOptions,e=>e.value)):d(e.currentTarget.value)},[d]);return{containerProps:{...u,"aria-hidden":!0,"data-react-aria-prevent-focus":!0,"data-a11y-ignore":`aria-hidden-focus`},inputProps:{style:{display:`none`}},selectProps:{tabIndex:-1,autoComplete:i,disabled:s,multiple:t.selectionManager.selectionMode===`multiple`,required:c===`native`&&l,name:a,form:o,value:t.value??``,onChange:f,onInput:f}}}function db(e){let{state:t,triggerRef:n,label:r,name:i,form:a,isDisabled:o}=e,s=(0,R.useRef)(null),c=(0,R.useRef)(null),{containerProps:l,selectProps:u}=ub({...e,selectRef:t.collection.size<=300?s:c},t,n),d=Array.isArray(t.value)?t.value:[t.value];if(t.collection.size<=300)return R.default.createElement(`div`,{...l,"data-testid":`hidden-select-container`},R.default.createElement(`label`,null,r,R.default.createElement(`select`,{...u,ref:s},R.default.createElement(`option`,{value:``,label:`\xA0`},`\xA0`),[...t.collection.getKeys()].map(e=>{let n=t.collection.getItem(e);if(n&&n.type===`item`)return R.default.createElement(`option`,{key:n.key,value:n.key},n.textValue)}),t.collection.size===0&&i&&d.map((e,t)=>R.default.createElement(`option`,{key:t,value:e??``})))));if(i){let{validationBehavior:e}=cb.get(t)||{};d.length===0&&(d=[null]);let n=d.map((t,n)=>{let r={type:`hidden`,autoComplete:u.autoComplete,name:i,form:a,disabled:o,value:t??``};return e===`native`?R.default.createElement(`input`,{key:n,...r,ref:n===0?c:null,style:{display:`none`},type:`text`,required:n===0&&u.required,onChange:()=>{}}):R.default.createElement(`input`,{key:n,...r,ref:n===0?c:null})});return R.default.createElement(R.default.Fragment,null,n)}return null}function fb(e){let{selectionMode:t=`single`,shouldCloseOnSelect:n=t===`single`}=e,r=og(e),[i,a]=(0,R.useState)(null),o=(0,R.useMemo)(()=>e.defaultValue===void 0?t===`single`?e.defaultSelectedKey??null:[]:e.defaultValue,[e.defaultValue,e.defaultSelectedKey,t]),[s,c]=ta((0,R.useMemo)(()=>e.value===void 0?t===`single`?e.selectedKey:void 0:e.value,[e.value,e.selectedKey,t]),o,e.onChange),l=t===`single`&&Array.isArray(s)?s[0]:s,u=n=>{if(t===`single`){let t=Array.isArray(n)?n[0]??null:n;c(t),t!==l&&e.onSelectionChange?.(t)}else{let e=[];Array.isArray(n)?e=n:n!=null&&(e=[n]),c(e)}},d=sm({...e,selectionMode:t,disallowEmptySelection:t===`single`,allowDuplicateSelectionEvents:!0,selectedKeys:(0,R.useMemo)(()=>pb(l),[l]),onSelectionChange:e=>{if(e!==`all`){if(t===`single`){let t=e.values().next().value??null;u(t)}else u([...e]);n&&r.close(),m.commitValidation()}}}),f=d.selectionManager.firstSelectedKey,p=(0,R.useMemo)(()=>[...d.selectionManager.selectedKeys].map(e=>d.collection.getItem(e)).filter(e=>e!=null),[d.selectionManager.selectedKeys,d.collection]),m=El({...e,value:Array.isArray(l)&&l.length===0?null:l}),[h,g]=(0,R.useState)(!1),[_]=(0,R.useState)(l);return{...m,...d,...r,value:l,defaultValue:o??_,setValue:u,selectedKey:f,setSelectedKey:u,selectedItem:p[0]??null,selectedItems:p,defaultSelectedKey:e.defaultSelectedKey??(e.selectionMode===`single`?_:null),focusStrategy:i,open(t=null){(d.collection.size!==0||e.allowsEmptyCollection)&&(a(t),r.open())},toggle(t=null){(d.collection.size!==0||e.allowsEmptyCollection)&&(a(t),r.toggle())},isFocused:h,setFocused:g}}function pb(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e:[e]}function mb(e){return e&&e.__esModule?e.default:e}let hb=(0,R.createContext)(null),gb=(0,R.createContext)(null),_b=Wa(function(e,t){[e,t]=U(e,t,hb);let{children:n,isDisabled:r=!1,isInvalid:i=!1,isRequired:a=!1}=e,o=(0,R.useMemo)(()=>typeof n==`function`?n({isOpen:!1,isDisabled:r,isInvalid:i,isRequired:a,isFocused:!1,isFocusVisible:!1,defaultChildren:null}):n,[n,r,i,a]);return R.default.createElement($a,{content:o},n=>R.default.createElement(yb,{props:e,collection:n,selectRef:t}))}),vb=[ns,Ns,zs];function yb({props:e,selectRef:t,collection:n}){let{validationBehavior:r}=Yn(Ml)||{},i=e.validationBehavior??r??`native`,a=fb({...e,collection:n,children:void 0,validationBehavior:i}),{isFocusVisible:o,focusProps:s}=Yo({within:!0}),c=(0,R.useRef)(null),[l,u]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),{labelProps:d,triggerProps:f,valueProps:p,menuProps:m,descriptionProps:h,errorMessageProps:g,hiddenSelectProps:_,...v}=lb({...Zn(e),label:u,validationBehavior:i},a,c),y=(0,R.useMemo)(()=>({isOpen:a.isOpen,isFocused:a.isFocused,isFocusVisible:o,isDisabled:e.isDisabled||!1,isInvalid:v.isInvalid||!1,isRequired:e.isRequired||!1}),[a.isOpen,a.isFocused,o,e.isDisabled,v.isInvalid,e.isRequired]),b=H({...e,values:y,defaultClassName:`react-aria-Select`}),x=Q(e,{global:!0});delete x.id;let S=(0,R.useRef)(null);return R.default.createElement(Jn,{values:[[hb,e],[gb,a],[bb,p],[ns,{...d,ref:l,elementType:`span`}],[Ns,{...f,ref:c,isPressed:a.isOpen,autoFocus:e.autoFocus}],[t_,a],[ug,{trigger:`Select`,triggerRef:c,scrollRef:S,placement:`bottom start`,"aria-labelledby":m[`aria-labelledby`],clearContexts:vb}],[dm,{...m,ref:S}],[fm,a],[zs,{slots:{description:h,errorMessage:g}}],[bl,v]]},R.default.createElement(W.div,{...V(x,b,s),ref:t,slot:e.slot||void 0,"data-focused":a.isFocused||void 0,"data-focus-visible":o||void 0,"data-open":a.isOpen||void 0,"data-disabled":e.isDisabled||void 0,"data-invalid":v.isInvalid||void 0,"data-required":e.isRequired||void 0},b.children,R.default.createElement(db,{..._,autoComplete:e.autoComplete})))}let bb=(0,R.createContext)(null),xb=Wa(function(e,t){[e,t]=U(e,t,bb);let n=(0,R.useContext)(gb),{placeholder:r}=Yn(hb),i=n.selectedItems.map(e=>{let t=e.props?.children;return typeof t==`function`&&(t=t({isHovered:!1,isPressed:!1,isSelected:!1,isFocused:!1,isFocusVisible:!1,isDisabled:!1,selectionMode:`single`,selectionBehavior:`toggle`})),t}),a=i_(),o=(0,R.useMemo)(()=>n.selectedItems.map(e=>e?.textValue),[n.selectedItems]),s=n.selectionManager.selectionMode,c=(0,R.useMemo)(()=>s===`single`?o[0]??``:a.format(o),[s,a,o]),l=(0,R.useMemo)(()=>{if(s===`single`)return i[0];let e=a.formatToParts(o);if(e.length===0)return null;let t=0;return e.map(e=>e.type===`element`?R.default.createElement(R.Fragment,{key:t},i[t++]):e.value)},[s,a,o,i]),u=$i(mb(Af),`react-aria-components`),d=H({...e,defaultChildren:l??r??u.format(`selectPlaceholder`),defaultClassName:`react-aria-SelectValue`,values:{selectedItem:n.selectedItems[0]?.value??null,selectedItems:(0,R.useMemo)(()=>n.selectedItems.map(e=>e.value??null),[n.selectedItems]),selectedText:c,isPlaceholder:n.selectedItems.length===0,state:n}}),f=Q(e,{global:!0});return R.default.createElement(W.span,{ref:t,...f,...d,"data-placeholder":n.selectedItems.length===0||void 0},R.default.createElement(zs.Provider,{value:void 0},d.children))});function Sb(e,t,n){let{labelProps:r,inputProps:i,isSelected:a,...o}=Hl(e,t,n);return{labelProps:r,inputProps:{...i,role:`switch`,checked:a},isSelected:a,...o}}let Cb=(0,R.createContext)(null),wb=(0,R.createContext)(null),Tb=(0,R.forwardRef)(function(e,t){let{inputRef:n=null,...r}=e;[e,t]=U(r,t,Cb);let i=Kn((0,R.useMemo)(()=>Hn(n,e.inputRef===void 0?null:e.inputRef),[n,e.inputRef])),a=Wl(e),o=Sb({...Zn(e),children:typeof e.children==`function`||e.children},a,i);return R.default.createElement(Jn,{values:[[wb,a],[Eb,{...o,inputRef:i,defaultClassName:`react-aria-Switch`}]]},R.default.createElement(Db,{...e,ref:t}))}),Eb=(0,R.createContext)(null),Db=(0,R.forwardRef)(function(e,t){let{labelProps:n,inputProps:r,isSelected:i,isDisabled:a,isReadOnly:o,isPressed:s,isInvalid:c,inputRef:l,defaultClassName:u,isRequired:d}=(0,R.useContext)(Eb),{isFocused:f,isFocusVisible:p,focusProps:m}=Yo(),h=a||o,g=(0,R.useContext)(wb),{hoverProps:_,isHovered:v}=ts({...e,isDisabled:h}),y=H({...e,defaultClassName:u,values:{isSelected:i,isPressed:s,isHovered:v,isFocused:f,isFocusVisible:p,isDisabled:a,isReadOnly:o,isInvalid:c,isRequired:d||!1,state:g}}),b=Q(e,{global:!0});return delete b.id,delete b.onClick,R.default.createElement(W.label,{...V(b,n,_,y),ref:t,slot:e.slot||void 0,"data-selected":i||void 0,"data-pressed":s||void 0,"data-hovered":v||void 0,"data-focused":f||void 0,"data-focus-visible":p||void 0,"data-disabled":a||void 0,"data-readonly":o||void 0,"data-invalid":c||void 0,"data-required":d||void 0},R.default.createElement(al,{elementType:`span`},R.default.createElement(`input`,{...V(r,m),ref:l})),y.children)}),Ob=new WeakMap;function kb(e,t,n){return e?(typeof t==`string`&&(t=t.replace(/\s+/g,``)),`${Ob.get(e)}-${n}-${t}`):``}function Ab(e,t,n){let{key:r,isDisabled:i,shouldSelectOnPressUp:a}=e,{selectionManager:o,selectedKey:s}=t,c=r===s,l=i||t.isDisabled||t.selectionManager.isDisabled(r),u=t.collection.getItem(r),{itemProps:d,isPressed:f}=Lp({selectionManager:o,key:r,ref:n,isDisabled:l,shouldSelectOnPressUp:a??u?.props.href!=null,linkBehavior:`selection`}),p=kb(t,r,`tab`),m=kb(t,r,`tabpanel`),{tabIndex:h}=d,g=Q(u?.props,{labelable:!0});delete g.id;let _=Qr(u?.props),{focusableProps:v}=Ba({...u?.props,isDisabled:l},n);return{tabProps:V(g,v,_,d,{id:p,"aria-selected":c,"aria-disabled":l||void 0,"aria-controls":c?m:void 0,tabIndex:l?void 0:h,role:`tab`}),isSelected:c,isDisabled:l,isPressed:f}}function jb(e,t,n){let r=Oy(n)?void 0:0,i=kb(t,e.id??t?.selectedKey,`tabpanel`);return{tabPanelProps:V(Ei({...e,id:i,"aria-labelledby":kb(t,t?.selectedKey,`tab`)}),{tabIndex:r,role:`tabpanel`,"aria-describedby":e[`aria-describedby`],"aria-details":e[`aria-details`]})}}var Mb=class{constructor(e,t,n,r=new Set){this.collection=e,this.flipDirection=t===`rtl`,this.disabledKeys=r,this.tabDirection=n===`horizontal`}getKeyLeftOf(e){return this.flipDirection?this.getNextKey(e):this.getPreviousKey(e)}getKeyRightOf(e){return this.flipDirection?this.getPreviousKey(e):this.getNextKey(e)}isDisabled(e){return this.disabledKeys.has(e)||!!this.collection.getItem(e)?.props?.isDisabled}getFirstKey(){let e=this.collection.getFirstKey();return e!=null&&this.isDisabled(e)&&(e=this.getNextKey(e)),e}getLastKey(){let e=this.collection.getLastKey();return e!=null&&this.isDisabled(e)&&(e=this.getPreviousKey(e)),e}getKeyAbove(e){return this.tabDirection?null:this.getPreviousKey(e)}getKeyBelow(e){return this.tabDirection?null:this.getNextKey(e)}getNextKey(e){let t=e;do t=this.collection.getKeyAfter(t),t??=this.collection.getFirstKey();while(t!=null&&this.isDisabled(t)&&t!==e);return t}getPreviousKey(e){let t=e;do t=this.collection.getKeyBefore(t),t??=this.collection.getLastKey();while(t!=null&&this.isDisabled(t)&&t!==e);return t}};function Nb(e,t,n){let{orientation:r=`horizontal`,keyboardActivation:i=`automatic`}=e,{collection:a,selectionManager:o,disabledKeys:s}=t,{direction:c}=Z(),{collectionProps:l}=kp({ref:n,selectionManager:o,keyboardDelegate:(0,R.useMemo)(()=>new Mb(a,c,r,s),[a,s,r,c]),selectOnFocus:i===`automatic`,disallowEmptySelection:!0,scrollRef:n,linkBehavior:`selection`}),u=B();return Ob.set(t,u),{tabListProps:{...V(l,Ei({...e,id:u})),role:`tablist`,"aria-orientation":r,tabIndex:void 0}}}function Pb(e){let[t,n]=ta(e.selectedKey,e.defaultSelectedKey??null,e.onSelectionChange),r=(0,R.useMemo)(()=>t==null?[]:[t],[t]),{collection:i,disabledKeys:a,selectionManager:o}=sm({...e,selectionMode:`single`,disallowEmptySelection:!0,allowDuplicateSelectionEvents:!0,selectedKeys:r,onSelectionChange:r=>{if(r===`all`)return;let i=r.values().next().value??null;i===t&&e.onSelectionChange&&e.onSelectionChange(i),n(i)}});return{collection:i,disabledKeys:a,selectionManager:o,selectedKey:t,setSelectedKey:n,selectedItem:t==null?null:i.getItem(t)}}function Fb(e){let t=Pb({...e,onSelectionChange:e.onSelectionChange?t=>{t!=null&&e.onSelectionChange?.(t)}:void 0,suppressTextValueWarning:!0,defaultSelectedKey:e.defaultSelectedKey??Ib(e.collection,e.disabledKeys?new Set(e.disabledKeys):new Set)??void 0}),{selectionManager:n,collection:r,selectedKey:i}=t,a=(0,R.useRef)(i);return(0,R.useEffect)(()=>{let o=i;e.selectedKey==null&&(n.isEmpty||o==null||!r.getItem(o))&&(o=Ib(r,t.disabledKeys),o!=null&&n.setSelectedKeys([o])),(o!=null&&n.focusedKey==null||!n.isFocused&&o!==a.current)&&n.setFocusedKey(o),a.current=o}),{...t,isDisabled:e.isDisabled||!1}}function Ib(e,t){let n=null;if(e){for(n=e.getFirstKey();n!=null&&(t.has(n)||e.getItem(n)?.props?.isDisabled)&&n!==e.getLastKey();)n=e.getKeyAfter(n);n!=null&&(t.has(n)||e.getItem(n)?.props?.isDisabled)&&n===e.getLastKey()&&(n=e.getFirstKey())}return n}let Lb=(0,R.createContext)(null),Rb=(0,R.createContext)(null),zb=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Lb);let{children:n,orientation:r=`horizontal`}=e;return n=(0,R.useMemo)(()=>typeof n==`function`?n({orientation:r,defaultChildren:null}):n,[n,r]),R.default.createElement($a,{content:n},n=>R.default.createElement(Bb,{props:e,collection:n,tabsRef:t}))});function Bb({props:e,tabsRef:t,collection:n}){let{orientation:r=`horizontal`}=e,i=Fb({...e,collection:n,children:void 0}),{focusProps:a,isFocused:o,isFocusVisible:s}=Yo({within:!0}),c=(0,R.useMemo)(()=>({orientation:r,isFocusWithin:o,isFocusVisible:s}),[r,o,s]),l=H({...e,defaultClassName:`react-aria-Tabs`,values:c}),u=Q(e,{global:!0});return R.default.createElement(W.div,{...V(u,l,a),ref:t,slot:e.slot||void 0,"data-focused":o||void 0,"data-orientation":r,"data-focus-visible":s||void 0,"data-disabled":i.isDisabled||void 0},R.default.createElement(Jn,{values:[[Lb,e],[Rb,i]]},l.children))}let Vb=(0,R.forwardRef)(function(e,t){return(0,R.useContext)(Rb)?R.default.createElement(Hb,{props:e,forwardedRef:t}):R.default.createElement(uo,e)});function Hb({props:e,forwardedRef:t}){let n=(0,R.useContext)(Rb),{CollectionRoot:r}=(0,R.useContext)(_o),{orientation:i=`horizontal`,keyboardActivation:a=`automatic`}=Yn(Lb),o=Kn(t),{tabListProps:s}=Nb({...e,orientation:i,keyboardActivation:a},n,o),c=H({...e,children:null,defaultClassName:`react-aria-TabList`,values:{orientation:i,state:n}}),l=Q(e,{global:!0});return delete l.id,R.default.createElement(W.div,{...V(l,c,s),ref:o,"data-orientation":i||void 0},R.default.createElement(Rf,null,R.default.createElement(r,{collection:n.collection,persistedKeys:vo(n.selectionManager.focusedKey)})))}let Ub=so(class extends ia{static{this.type=`item`}},(e,t,n)=>{let r=(0,R.useContext)(Rb),i=Kn(t),{tabProps:a,isSelected:o,isDisabled:s,isPressed:c}=Ab({key:n.key,...e},r,i),{focusProps:l,isFocused:u,isFocusVisible:d}=Yo(),{hoverProps:f,isHovered:p}=ts({isDisabled:s,onHoverStart:e.onHoverStart,onHoverEnd:e.onHoverEnd,onHoverChange:e.onHoverChange}),m=H({...e,id:void 0,children:n.rendered,defaultClassName:`react-aria-Tab`,values:{isSelected:o,isDisabled:s,isFocused:u,isFocusVisible:d,isPressed:c,isHovered:p}}),h=n.props.href?W.a:W.div,g=Q(e,{global:!0});return delete g.id,delete g.onClick,R.default.createElement(h,{...V(g,m,a,l,f),ref:i,"data-selected":o||void 0,"data-disabled":s||void 0,"data-focused":u||void 0,"data-focus-visible":d||void 0,"data-pressed":c||void 0,"data-hovered":p||void 0},R.default.createElement(zf.Provider,{value:{isSelected:o}},m.children))}),Wb=Wa(function(e,t){let n=(0,R.useContext)(Rb),r=Kn(t),i=n.selectedKey===e.id,[a,o]=(0,R.useState)(n.selectedKey==null?null:i);a==null&&n.selectedKey!=null?o(i):!i&&a&&o(!1);let s=cg(r,i);return!i&&!e.shouldForceMount&&!s?null:R.default.createElement(Gb,{...e,tabPanelRef:r,isInitiallySelected:a||!1,isExiting:s})});function Gb(e){let t=(0,R.useContext)(Rb),{id:n,tabPanelRef:r,isInitiallySelected:i,isExiting:a,...o}=e,{tabPanelProps:s}=jb(e,t,r),{focusProps:c,isFocused:l,isFocusVisible:u}=Yo(),d=t.selectedKey===e.id,f=sg(r)&&!i,p=H({...e,defaultClassName:`react-aria-TabPanel`,values:{isFocused:l,isFocusVisible:u,isInert:Yp(!d),isEntering:f,isExiting:a,state:t}}),m=Q(o,{global:!0});delete m.id;let h=d?V(m,s,c,p):V(m,p);return R.default.createElement(W.div,{...h,ref:r,"data-focused":l||void 0,"data-focus-visible":u||void 0,inert:Yp(!d||e.inert),"data-inert":d?void 0:`true`,"data-entering":f||void 0,"data-exiting":a||void 0},R.default.createElement(Jn,{values:[[Lb,null],[Rb,null]]},R.default.createElement(_o.Provider,{value:mo},p.children)))}let Kb=(0,R.createContext)({}),qb=e=>{let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,...i}=e;return i},Jb=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Kb);let{hoverProps:n,isHovered:r}=ts(e),{isFocused:i,isFocusVisible:a,focusProps:o}=Yo({isTextInput:!0,autoFocus:e.autoFocus}),s=!!e[`aria-invalid`]&&e[`aria-invalid`]!==`false`,c=H({...e,values:{isHovered:r,isFocused:i,isFocusVisible:a,isDisabled:e.disabled||!1,isInvalid:s},defaultClassName:`react-aria-TextArea`});return R.default.createElement(W.textarea,{...V(qb(e),o,n),...c,ref:t,"data-focused":i||void 0,"data-disabled":e.disabled||void 0,"data-hovered":r||void 0,"data-focus-visible":a||void 0,"data-invalid":s||void 0})}),Yb=(0,R.createContext)(null),Xb=Wa(function(e,t){[e,t]=U(e,t,Yb);let{validationBehavior:n}=Yn(Ml)||{},r=e.validationBehavior??n??`native`,i=(0,R.useRef)(null);[e,i]=U(e,i,ra);let[a,o]=Xn(!e[`aria-label`]&&!e[`aria-labelledby`]),[s,c]=(0,R.useState)(`input`),{labelProps:l,inputProps:u,descriptionProps:d,errorMessageProps:f,...p}=iu({...Zn(e),inputElementType:s,label:o,validationBehavior:r},i),m=(0,R.useCallback)(e=>{i.current=e,e&&c(e instanceof HTMLTextAreaElement?`textarea`:`input`)},[i]),h=H({...e,values:{isDisabled:e.isDisabled||!1,isInvalid:p.isInvalid,isReadOnly:e.isReadOnly||!1,isRequired:e.isRequired||!1},defaultClassName:`react-aria-TextField`}),g=Q(e,{global:!0});return delete g.id,R.default.createElement(W.div,{...g,...h,ref:t,slot:e.slot||void 0,"data-disabled":e.isDisabled||void 0,"data-invalid":p.isInvalid||void 0,"data-readonly":e.isReadOnly||void 0,"data-required":e.isRequired||void 0},R.default.createElement(Jn,{values:[[ns,{...l,ref:a}],[tu,{...u,ref:m}],[Kb,{...u,ref:m}],[$l,{role:`presentation`,isInvalid:p.isInvalid,isDisabled:e.isDisabled||!1}],[zs,{slots:{description:d,errorMessage:f}}],[bl,p]]},h.children))});var Zb={};Zb={close:`إغلاق`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{625}\u{634}\u{639}\u{627}\u{631}`,other:()=>`${t.number(e.count)} \u{625}\u{634}\u{639}\u{627}\u{631}\u{627}\u{62A}`})}.`};var Qb={};Qb={close:`Затвори`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{438}\u{437}\u{432}\u{435}\u{441}\u{442}\u{438}\u{435}`,other:()=>`${t.number(e.count)} \u{438}\u{437}\u{432}\u{435}\u{441}\u{442}\u{438}\u{44F}`})}.`};var $b={};$b={close:`Zavřít`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} ozn\xe1men\xed`,other:()=>`${t.number(e.count)} ozn\xe1men\xed`})}.`};var ex={};ex={close:`Luk`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} besked`,other:()=>`${t.number(e.count)} beskeder`})}.`};var tx={};tx={close:`Schließen`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} Benachrichtigung`,other:()=>`${t.number(e.count)} Benachrichtigungen`})}.`};var nx={};nx={close:`Κλείσιμο`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{3B5}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3AF}\u{3B7}\u{3C3}\u{3B7}`,other:()=>`${t.number(e.count)} \u{3B5}\u{3B9}\u{3B4}\u{3BF}\u{3C0}\u{3BF}\u{3B9}\u{3AE}\u{3C3}\u{3B5}\u{3B9}\u{3C2}`})}.`};var rx={};rx={close:`Close`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notification`,other:()=>`${t.number(e.count)} notifications`})}.`};var ix={};ix={close:`Cerrar`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notificaci\xf3n`,other:()=>`${t.number(e.count)} notificaciones`})}.`};var ax={};ax={close:`Sule`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} teatis`,other:()=>`${t.number(e.count)} teatist`})}.`};var ox={};ox={close:`Sulje`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} ilmoitus`,other:()=>`${t.number(e.count)} ilmoitusta`})}.`};var sx={};sx={close:`Fermer`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notification`,other:()=>`${t.number(e.count)} notifications`})}.`};var cx={};cx={close:`סגור`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{5D4}\u{5EA}\u{5E8}\u{5D0}\u{5D4}`,other:()=>`${t.number(e.count)} \u{5D4}\u{5EA}\u{5E8}\u{5D0}\u{5D5}\u{5EA}`})}.`};var lx={};lx={close:`Zatvori`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} obavijest`,other:()=>`${t.number(e.count)} obavijesti`})}.`};var ux={};ux={close:`Bezárás`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \xe9rtes\xedt\xe9s`,other:()=>`${t.number(e.count)} \xe9rtes\xedt\xe9s`})}.`};var dx={};dx={close:`Chiudi`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notifica`,other:()=>`${t.number(e.count)} notifiche`})}.`};var fx={};fx={close:`閉じる`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{500B}\u{306E}\u{901A}\u{77E5}`,other:()=>`${t.number(e.count)} \u{500B}\u{306E}\u{901A}\u{77E5}`})}\u{3002}`};var px={};px={close:`닫기`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)}\u{AC1C} \u{C54C}\u{B9BC}`,other:()=>`${t.number(e.count)}\u{AC1C} \u{C54C}\u{B9BC}`})}.`};var mx={};mx={close:`Uždaryti`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} prane\u{161}imas`,other:()=>`${t.number(e.count)} prane\u{161}imai`})}.`};var hx={};hx={close:`Aizvērt`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} pazi\u{146}ojums`,other:()=>`${t.number(e.count)} pazi\u{146}ojumi`})}.`};var gx={};gx={close:`Lukk`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} varsling`,other:()=>`${t.number(e.count)} varsler`})}.`};var _x={};_x={close:`Sluiten`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} melding`,other:()=>`${t.number(e.count)} meldingen`})}.`};var vx={};vx={close:`Zamknij`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} powiadomienie`,few:()=>`${t.number(e.count)} powiadomienia`,many:()=>`${t.number(e.count)} powiadomie\u{144}`,other:()=>`${t.number(e.count)} powiadomienia`})}.`};var yx={};yx={close:`Fechar`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notifica\xe7\xe3o`,other:()=>`${t.number(e.count)} notifica\xe7\xf5es`})}.`};var bx={};bx={close:`Fechar`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notifica\xe7\xe3o`,other:()=>`${t.number(e.count)} notifica\xe7\xf5es`})}.`};var xx={};xx={close:`Închideţi`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} notificare`,other:()=>`${t.number(e.count)} notific\u{103}ri`})}.`};var Sx={};Sx={close:`Закрыть`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{443}\u{432}\u{435}\u{434}\u{43E}\u{43C}\u{43B}\u{435}\u{43D}\u{438}\u{435}`,other:()=>`${t.number(e.count)} \u{443}\u{432}\u{435}\u{434}\u{43E}\u{43C}\u{43B}\u{435}\u{43D}\u{438}\u{44F}`})}.`};var Cx={};Cx={close:`Zatvoriť`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} ozn\xe1menie`,few:()=>`${t.number(e.count)} ozn\xe1menia`,other:()=>`${t.number(e.count)} ozn\xe1men\xed`})}.`};var wx={};wx={close:`Zapri`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} obvestilo`,two:()=>`${t.number(e.count)} obvestili`,few:()=>`${t.number(e.count)} obvestila`,other:()=>`${t.number(e.count)} obvestil`})}.`};var Tx={};Tx={close:`Zatvori`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} obave\u{161}tenje`,other:()=>`${t.number(e.count)} obave\u{161}tenja`})}.`};var Ex={};Ex={close:`Stäng`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} meddelande`,other:()=>`${t.number(e.count)} meddelanden`})}.`};var Dx={};Dx={close:`Kapat`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} bildirim`,other:()=>`${t.number(e.count)} bildirim`})}.`};var Ox={};Ox={close:`Закрити`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{441}\u{43F}\u{43E}\u{432}\u{456}\u{449}\u{435}\u{43D}\u{43D}\u{44F}`,other:()=>`${t.number(e.count)} \u{441}\u{43F}\u{43E}\u{432}\u{456}\u{449}\u{435}\u{43D}\u{43D}\u{44F}`})}.`};var kx={};kx={close:`关闭`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{4E2A}\u{901A}\u{77E5}`,other:()=>`${t.number(e.count)} \u{4E2A}\u{901A}\u{77E5}`})}\u{3002}`};var Ax={};Ax={close:`關閉`,notifications:(e,t)=>`${t.plural(e.count,{one:()=>`${t.number(e.count)} \u{500B}\u{901A}\u{77E5}`,other:()=>`${t.number(e.count)} \u{500B}\u{901A}\u{77E5}`})}\u{3002}`};var jx={};jx={"ar-AE":Zb,"bg-BG":Qb,"cs-CZ":$b,"da-DK":ex,"de-DE":tx,"el-GR":nx,"en-US":rx,"es-ES":ix,"et-EE":ax,"fi-FI":ox,"fr-FR":sx,"he-IL":cx,"hr-HR":lx,"hu-HU":ux,"it-IT":dx,"ja-JP":fx,"ko-KR":px,"lt-LT":mx,"lv-LV":hx,"nb-NO":gx,"nl-NL":_x,"pl-PL":vx,"pt-BR":yx,"pt-PT":bx,"ro-RO":xx,"ru-RU":Sx,"sk-SK":Cx,"sl-SI":wx,"sr-SP":Tx,"sv-SE":Ex,"tr-TR":Dx,"uk-UA":Ox,"zh-CN":kx,"zh-TW":Ax};function Mx(e){return e&&e.__esModule?e.default:e}function Nx(e,t,n){let{key:r,timer:i,timeout:a}=e.toast;(0,R.useEffect)(()=>{if(i!=null&&a!=null)return i.reset(a),()=>{i.pause()}},[i,a]);let o=B(),s=Vn(),c=$i(Mx(jx),`@react-aria/toast`),[l,u]=(0,R.useState)(!1);return z(()=>{u(!0)},[]),{toastProps:{...Q(e,{labelable:!0}),role:`alertdialog`,"aria-modal":`false`,"aria-labelledby":e[`aria-labelledby`]||o,"aria-describedby":e[`aria-describedby`]||s,tabIndex:0},contentProps:{role:`alert`,"aria-atomic":`true`,"aria-hidden":l?void 0:`true`},titleProps:{id:o},descriptionProps:{id:s},closeButtonProps:{"aria-label":c.format(`close`),onPress:()=>t.close(r)}}}let Px=(0,R.createContext)(null),Fx=(0,R.forwardRef)(function(e,t){let n=(0,R.useContext)(Px),r=Kn(t),{toastProps:i,contentProps:a,titleProps:o,descriptionProps:s,closeButtonProps:c}=Nx(e,n,r),{focusProps:l,isFocused:u,isFocusVisible:d}=Yo(),f=H({...e,defaultClassName:`react-aria-Toast`,values:{toast:e.toast,isFocused:u,isFocusVisible:d}}),p=Q(e,{global:!0});return R.default.createElement(W.div,{...V(p,f,i,l),ref:r,"data-focused":u||void 0,"data-focus-visible":d||void 0},R.default.createElement(Jn,{values:[[Ix,a],[zs,{slots:{[qn]:{},title:o,description:s}}],[Ns,{slots:{[qn]:{},close:c}}]]},f.children))}),Ix=(0,R.createContext)({}),Lx=(0,R.forwardRef)(function(e,t){return[e,t]=U(e,t,Ix),R.default.createElement(W.div,{render:e.render,className:`react-aria-ToastContent`,...e,ref:t},e.children)});function Rx(e,t,n){let{isSelected:r}=t,{isPressed:i,buttonProps:a}=Ms({...e,onPress:xn(t.toggle,e.onPress)},n);return{isPressed:i,isSelected:r,isDisabled:e.isDisabled||!1,buttonProps:V(a,{"aria-pressed":r})}}function zx(e,t,n){let r={isSelected:t.selectedKeys.has(e.id),defaultSelected:!1,setSelected(n){t.setSelected(e.id,n)},toggle(){t.toggleKey(e.id)}},{isPressed:i,isSelected:a,isDisabled:o,buttonProps:s}=Rx({...e,id:void 0,isDisabled:e.isDisabled||t.isDisabled},r,n);return t.selectionMode===`single`&&(s.role=`radio`,s[`aria-checked`]=r.isSelected,delete s[`aria-pressed`]),{isPressed:i,isSelected:a,isDisabled:o,buttonProps:s}}let Bx=(0,R.createContext)(null),Vx=(0,R.createContext)({}),Hx=(0,R.forwardRef)(function(e,t){[e,t]=U(e,t,Vx);let n=(0,R.useContext)(Bx),r=Wl(n&&e.id!=null?{isSelected:n.selectedKeys.has(e.id),onChange(t){n.setSelected(e.id,t)}}:e),{buttonProps:i,isPressed:a,isSelected:o,isDisabled:s}=n&&e.id!=null?zx({...e,id:e.id},n,t):Rx({...e,id:e.id==null?void 0:String(e.id)},r,t),{focusProps:c,isFocused:l,isFocusVisible:u}=Yo(e),{hoverProps:d,isHovered:f}=ts({...e,isDisabled:s}),p=H({...e,id:void 0,values:{isHovered:f,isPressed:a,isFocused:l,isSelected:r.isSelected,isFocusVisible:u,isDisabled:s,state:r},defaultClassName:`react-aria-ToggleButton`}),m=Q(e,{global:!0});return delete m.id,delete m.onClick,R.default.createElement(W.button,{...V(m,p,i,c,d),ref:t,slot:e.slot||void 0,"data-focused":l||void 0,"data-disabled":s||void 0,"data-pressed":a||void 0,"data-selected":o||void 0,"data-hovered":f||void 0,"data-focus-visible":u||void 0},R.default.createElement(zf.Provider,{value:{isSelected:o}},p.children))}),Ux=R.default.createContext(null);function Wx(e){let{children:t}=e,n=(0,R.useContext)(Ux),[r,i]=(0,R.useState)(0),a=(0,R.useMemo)(()=>({parent:n,modalCount:r,addModal(){i(e=>e+1),n&&n.addModal()},removeModal(){i(e=>e-1),n&&n.removeModal()}}),[n,r]);return R.default.createElement(Ux.Provider,{value:a},t)}function Gx(){let e=(0,R.useContext)(Ux);return{modalProviderProps:{"aria-hidden":e&&e.modalCount>0?!0:void 0}}}function Kx(e){let{modalProviderProps:t}=Gx();return R.default.createElement(`div`,{"data-overlay-container":!0,...e,...t})}function qx(e){return R.default.createElement(Wx,null,R.default.createElement(Kx,e))}function Jx(e){let t=Pn(),{portalContainer:n=t?null:document.body,...r}=e,{getContainer:i}=ng();if(!e.portalContainer&&i&&(n=i()),R.default.useEffect(()=>{if(n?.closest(`[data-overlay-container]`))throw Error(`An OverlayContainer must not be inside another container. Please change the portalContainer prop.`)},[n]),!n)return null;let a=R.default.createElement(qx,r);return Ya.default.createPortal(a,n)}function Yx(e,t){let n=Q(e,{labelable:!0}),{hoverProps:r}=ts({onHoverStart:()=>t?.open(!0),onHoverEnd:()=>t?.close()});return{tooltipProps:V(n,r,{role:`tooltip`})}}function Xx(e,t,n){let{isDisabled:r,trigger:i,shouldCloseOnPress:a=!0}=e,o=B(),s=(0,R.useRef)(!1),c=(0,R.useRef)(!1),l=()=>{(s.current||c.current)&&t.open(c.current)},u=e=>{!s.current&&!c.current&&t.close(e)};(0,R.useEffect)(()=>{let e=e=>{n&&n.current&&e.key===`Escape`&&(e.stopPropagation(),t.close(!0))};if(t.isOpen)return document.addEventListener(`keydown`,e,!0),()=>{document.removeEventListener(`keydown`,e,!0)}},[n,t]);let d=()=>{i!==`focus`&&(gi()===`pointer`?s.current=!0:s.current=!1,l())},f=()=>{i!==`focus`&&(c.current=!1,s.current=!1,u())},p=()=>{a&&(c.current=!1,s.current=!1,u(!0))},m=()=>{hi()&&(c.current=!0,l())},h=()=>{c.current=!1,s.current=!1,u(!0)},{hoverProps:g}=ts({isDisabled:r,onHoverStart:d,onHoverEnd:f}),{focusableProps:_}=Ba({isDisabled:r,onFocus:m,onBlur:h},n);return{triggerProps:{"aria-describedby":t.isOpen?o:void 0,...V(_,g,{onPointerDown:p,onKeyDown:p}),tabIndex:void 0},tooltipProps:{id:o}}}let Zx=(0,R.createContext)(null),Qx=(0,R.createContext)(null);function $x(e){let t=Py(e),n=(0,R.useRef)(null),{triggerProps:r,tooltipProps:i}=Xx(e,t,n);return R.default.createElement(Jn,{values:[[Zx,t],[Qx,{...i,triggerRef:n}]]},R.default.createElement(za,{...r,ref:n},e.children))}let eS=(0,R.forwardRef)(function({UNSTABLE_portalContainer:e,...t},n){[t,n]=U(t,n,Qx);let r=(0,R.useContext)(Zx),i=Py(t),a=t.isOpen!=null||t.defaultOpen!=null||!r?i:r,o=cg(n,a.isOpen),s=t.isExiting||!a.shouldSkipAnimation&&o||!1;return!a.isOpen&&!s?null:R.default.createElement(Jx,{portalContainer:e},R.default.createElement(tS,{...t,tooltipRef:n,isExiting:s}))});function tS(e){let t=(0,R.useContext)(Zx),n=(0,R.useRef)(null),{overlayProps:r,arrowProps:i,placement:a,triggerAnchorPoint:o}=th({placement:e.placement||`top`,targetRef:e.triggerRef,overlayRef:e.tooltipRef,arrowRef:n,offset:e.offset,crossOffset:e.crossOffset,isOpen:t.isOpen,arrowBoundaryOffset:e.arrowBoundaryOffset,shouldFlip:e.shouldFlip,containerPadding:e.containerPadding,onClose:()=>t.close(!0)}),s=sg(e.tooltipRef,!!a),c=e.isEntering||!t.shouldSkipAnimation&&s||!1,l=H({...e,defaultClassName:`react-aria-Tooltip`,values:{placement:a,isEntering:c,isExiting:e.isExiting,state:t}});e=V(e,r);let{tooltipProps:u}=Yx(e,t),d=Q(e,{global:!0});return R.default.createElement(W.div,{...V(d,l,u),ref:e.tooltipRef,style:{...r.style,"--trigger-anchor-point":o?`${o.x}px ${o.y}px`:void 0,...l.style},"data-placement":a??void 0,"data-entering":c||void 0,"data-exiting":e.isExiting||void 0},R.default.createElement(xm.Provider,{value:{...i,placement:a,ref:n}},l.children))}let nS=window.VendraDesignSystem=window.VendraDesignSystem||{};nS.__vendor={"@internationalized/date":{GregorianCalendar:h,PersianCalendar:Dt,parseDate:Ze,toCalendar:L},"react-aria-components":{Button:Ps,Calendar:ul,CalendarCell:yl,CalendarGrid:fl,Checkbox:Xl,DateInput:sy,DatePicker:_y,DateSegment:uy,Dialog:n_,Disclosure:Ey,DisclosureGroup:Sy,DisclosurePanel:Dy,Focusable:Va,Group:eu,Heading:Rs,I18nProvider:zi,Input:ru,Label:rs,ListBox:pm,ListBoxItem:_m,Modal:Vy,ModalOverlay:Uy,NumberField:Jy,Popover:fg,Radio:ab,RadioGroup:ib,RadioGroupStateContext:rb,Select:_b,SelectValue:xb,Slider:Kd,SliderThumb:Jd,SliderTrack:qd,Switch:Tb,Tab:Ub,TabList:Vb,TabPanel:Wb,Tabs:zb,Text:Bs,TextArea:Jb,TextField:Xb,ToggleButton:Hx,Tooltip:eS,TooltipTrigger:$x,UNSTABLE_Toast:Fx,UNSTABLE_ToastContent:Lx,UNSTABLE_ToastStateContext:Px,useLocale:Z}}})();} catch (e) { (window.VendraDesignSystem = window.VendraDesignSystem || {}).__vendorError = String((e && e.message) || e); }
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
const { Button: AriaButton } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// An icon-only React Aria Button, or link with `href`. `label` is its accessible name and tooltip;
// `active` sets aria-pressed and `count` shows a badge.
function IconButton({ icon, label, variant = "ghost", size = "md", active, count, className = "", type = "button", href, target, rel, disabled, ...rest }) {
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
	return /* @__PURE__ */ React.createElement(AriaButton, {
		...rest,
		type,
		isDisabled: disabled,
		"aria-label": label,
		"aria-pressed": active,
		// React Aria passes on only the attributes it knows, so the tooltip title is set here.
		ref: (element) => element && (element.title = label),
		className: classes
	}, content);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/IconButton/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
const { Button: AriaButton } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// href → <a> (navigation); no href → React Aria's Button (action), with the usual props (onClick,
// type, disabled, aria-*). A disabled link drops its href and gets aria-disabled.
// loading: spinner replaces iconStart, label stays (width doesn't jump), the button is pending (it
// keeps focus but can't be pressed); loadingLabel is announced to screen readers.
function Button({ variant = "primary", size = "md", iconStart, iconEnd, block, className = "", children, type = "button", href, target, rel, disabled, loading, loadingLabel, ...rest }) {
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
		href: disabled || loading ? undefined : href,
		target,
		rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
		"aria-disabled": disabled || loading || undefined,
		className: classes + (disabled || loading ? " ag-btn--disabled" : ""),
		...rest
	}, content);
	return /* @__PURE__ */ React.createElement(AriaButton, {
		...rest,
		type,
		isDisabled: disabled,
		isPending: loading,
		className: classes
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
const { Button } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// The phone tab bar. Items with `href` are links (aria-current="page" when current); the rest
// are React Aria buttons. `count` shows a badge on the icon.
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
		}, content) : /* @__PURE__ */ React.createElement(Button, {
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
const { Button } = __ds_ns.__vendor["react-aria-components"];
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
	return /* @__PURE__ */ React.createElement(Button, {
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
const { ToggleButton } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { cx } = __ds_scope;
// A filter chip: React Aria's ToggleButton (aria-pressed) that fills with ink when `selected`, with
// an optional remove icon (`onRemove`). It takes onClick and the usual button props.
function Chip({ selected, onRemove, className = "", children, ...rest }) {
	return /* @__PURE__ */ React.createElement(ToggleButton, {
		...rest,
		isSelected: !!selected,
		className: cx("ag-chip", selected && "ag-chip--selected", className)
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
const { Button, I18nProvider, Label, ListBox, ListBoxItem, Popover, Select: AriaSelect, SelectValue } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
const { usePageLocale } = __ds_scope;
// A labelled pop-up list on React Aria's Select, styled like Input. Options are strings or
// {value, label, disabled}. It takes `value` (or `defaultValue`), `onChange(event)` with the chosen
// value on event.target.value, and `name`/`required`/`autoComplete` for forms (React Aria keeps a
// hidden native select for autofill). A group picker (DatePicker) can own the message: it passes
// aria-invalid and aria-describedby itself, with no hint or error here.
function Select({ label, hint, error, options = [], placeholder = "", disabled, required, id, name, value, defaultValue, onChange, className, style, "aria-describedby": describedBy, "aria-invalid": ariaInvalid, "aria-errormessage": _errorMessage, ...rest }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error,
		describedBy
	});
	const { locale, ref } = usePageLocale();
	const invalid = !!error || ariaInvalid === true || ariaInvalid === "true";
	const toKey = (selected) => selected == null || selected === "" ? null : String(selected);
	const items = options.map((option) => typeof option === "string" ? {
		value: option,
		label: option
	} : option);
	return /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(AriaSelect, {
		...rest,
		ref,
		id: fieldId,
		name,
		selectedKey: value === undefined ? undefined : toKey(value),
		defaultSelectedKey: toKey(defaultValue),
		onSelectionChange: (key) => {
			const target = {
				value: key == null ? "" : String(key),
				name,
				id: fieldId
			};
			onChange && onChange({
				target,
				currentTarget: target,
				type: "change"
			});
		},
		placeholder,
		isDisabled: disabled,
		isRequired: required,
		isInvalid: invalid,
		validationBehavior: "aria",
		"aria-describedby": controlProps["aria-describedby"],
		className: cx("ag-field ag-select", className),
		style
	}, label && /* @__PURE__ */ React.createElement(Label, { className: "ag-field__label" }, label), /* @__PURE__ */ React.createElement(Button, { className: cx("ag-input ag-select__trigger", invalid && "ag-input--error", disabled && "ag-input--disabled") }, /* @__PURE__ */ React.createElement(SelectValue, { className: "ag-select__value" }), /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-down",
		size: 16,
		className: "ag-input__chev"
	})), /* @__PURE__ */ React.createElement(FieldMessage, {
		id: messageId,
		error: !!error
	}, message), /* @__PURE__ */ React.createElement(Popover, {
		className: "ag-select__popover",
		offset: 4
	}, /* @__PURE__ */ React.createElement(ListBox, {
		className: "ag-select__list",
		items
	}, (item) => /* @__PURE__ */ React.createElement(ListBoxItem, {
		id: String(item.value),
		textValue: String(item.label),
		isDisabled: !!item.disabled,
		className: "ag-select__option"
	}, item.label)))));
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
const { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker: AriaDatePicker, DateSegment, Dialog, Group, Heading, I18nProvider, Popover } = __ds_ns.__vendor["react-aria-components"];
const { GregorianCalendar, PersianCalendar, parseDate, toCalendar } = __ds_ns.__vendor["@internationalized/date"];
const { Icon } = __ds_scope;
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
		open: "Choose a date",
		previous: "Previous month",
		next: "Next month",
		equivalent: "That’s {date}"
	},
	fa: {
		jalali: "شمسی",
		gregorian: "میلادی",
		year: "سال",
		month: "ماه",
		day: "روز",
		open: "انتخاب از تقویم",
		previous: "ماه قبل",
		next: "ماه بعد",
		equivalent: "برابر با {date}"
	}
};
const GREGORIAN = new GregorianCalendar();
const PERSIAN = new PersianCalendar();
// ISO ↔ React Aria's CalendarDate (a value in any calendar comes back as an ISO Gregorian date).
const toDateValue = (iso) => {
	try {
		return iso ? parseDate(iso) : null;
	} catch (error) {
		return null;
	}
};
// React Aria lines the month grid up with minValue/maxValue, so they must be in the shown calendar.
const toBound = (iso, cal) => {
	const dateValue = toDateValue(iso);
	return dateValue ? toCalendar(dateValue, cal === "j" ? PERSIAN : GREGORIAN) : undefined;
};
const toIso = (dateValue) => dateValue ? toCalendar(dateValue, GREGORIAN).toString() : "";
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
// A date in Jalali (Shamsi, 'j') or Gregorian ('g'), with a calendar toggle. `value` is an ISO date
// ("2026-10-08"): React Aria's DatePicker, a typed field (day, month and year segments) with a
// month grid in a pop-up, both in the chosen calendar. With `yearly` it is a recurring {cal, m, d}
// with no year, picked from month and day Selects. Under it, the same date in the other calendar.
function DatePicker({ label, value, onChange, calendar, onCalendarChange, calendars = ["j", "g"], yearly = false, years = 3, minDate, hint, error, lang = "en", labels, showEquivalent = true, disabled, id, className = "", style }) {
	const text = {
		...DEFAULT_LABELS[lang === "fa" ? "fa" : "en"],
		...labels
	};
	const generatedId = React.useId();
	const fieldId = id || "dp" + generatedId.replace(/:/g, "");
	const messageId = fieldId + "-hint";
	const labelId = fieldId + "-label";
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
	// The last day offered: the end of the last of `years` years in the active calendar.
	const lastYear = yearOptions[yearOptions.length - 1];
	const lastIso = dates.iso(dates.toDate(activeCalendar, lastYear, 12, dates.daysInMonth(activeCalendar, lastYear, 12)));
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
	}, /* @__PURE__ */ React.createElement("legend", { className: "ag-date__legend" }, label && /* @__PURE__ */ React.createElement("span", {
		id: labelId,
		className: "ag-field__label"
	}, label), calendars.length > 1 && /* @__PURE__ */ React.createElement(Tabs, {
		variant: "pill",
		className: "ag-date__cal",
		items: calendars.map((cal) => ({
			id: cal,
			label: cal === "j" ? text.jalali : text.gregorian
		})),
		value: activeCalendar,
		onChange: switchCalendar
	})), yearly ? /* @__PURE__ */ React.createElement("div", { className: "ag-date__grid ag-date__grid--yearly" }, /* @__PURE__ */ React.createElement(Select, {
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
	})) : /* @__PURE__ */ React.createElement(I18nProvider, { locale: dates.locale(lang, activeCalendar) }, /* @__PURE__ */ React.createElement(AriaDatePicker, {
		value: toDateValue(value),
		onChange: (dateValue) => dateValue && onChange && onChange(toIso(dateValue)),
		minValue: earliest ? toBound(dates.iso(earliest), activeCalendar) : undefined,
		maxValue: toBound(lastIso, activeCalendar),
		isDisabled: disabled,
		isInvalid: !!error,
		validationBehavior: "aria",
		"aria-labelledby": label ? labelId : undefined,
		"aria-label": label ? undefined : text.open,
		"aria-describedby": describedBy,
		className: "ag-date__picker"
	}, /* @__PURE__ */ React.createElement(Group, { className: cx("ag-input ag-date__field", error && "ag-input--error") }, /* @__PURE__ */ React.createElement(DateInput, {
		id: fieldId,
		className: "ag-date__input"
	}, (segment) => /* @__PURE__ */ React.createElement(DateSegment, {
		segment,
		className: "ag-date__segment"
	})), /* @__PURE__ */ React.createElement(Button, {
		className: "ag-date__open",
		"aria-label": text.open
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "calendar",
		size: 18
	}))), /* @__PURE__ */ React.createElement(Popover, {
		className: "ag-date__popover",
		placement: "bottom end",
		offset: 4
	}, /* @__PURE__ */ React.createElement(Dialog, {
		className: "ag-date__dialog",
		"aria-label": label || text.open
	}, /* @__PURE__ */ React.createElement(Calendar, { className: "ag-cal" }, /* @__PURE__ */ React.createElement("header", { className: "ag-cal__head" }, /* @__PURE__ */ React.createElement(Button, {
		slot: "previous",
		className: "ag-cal__nav",
		"aria-label": text.previous
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-left",
		size: 18
	})), /* @__PURE__ */ React.createElement(Heading, { className: "ag-cal__title" }), /* @__PURE__ */ React.createElement(Button, {
		slot: "next",
		className: "ag-cal__nav",
		"aria-label": text.next
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "chevron-right",
		size: 18
	}))), /* @__PURE__ */ React.createElement(CalendarGrid, { className: "ag-cal__grid" }, (date) => /* @__PURE__ */ React.createElement(CalendarCell, {
		date,
		className: "ag-cal__cell"
	}))))))), /* @__PURE__ */ React.createElement(FieldMessage, {
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
const { Button } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
// Product photos in a swipeable scroll-snap track with dot buttons (React Aria); RTL scrolls the
// other way.
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
	})))), count > 1 && /* @__PURE__ */ React.createElement("div", { className: "ag-gallery__dots" }, images.map((_, i) => /* @__PURE__ */ React.createElement(Button, {
		key: i,
		className: "ag-gallery__dot",
		"aria-label": slideLabel(i + 1, count),
		"aria-current": i === currentSlide ? "true" : undefined,
		onPress: () => goTo(i)
	}, /* @__PURE__ */ React.createElement("span", null)))));
}
Object.assign(__ds_scope, { Gallery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Gallery/Gallery.jsx", error: String((e && e.message) || e) }); }

// components/LanguageSwitch/LanguageSwitch.jsx
try { (() => {
const { ToggleButton } = __ds_ns.__vendor["react-aria-components"];
// The EN / فا toggle: one React Aria ToggleButton (aria-pressed) per language, each marked with its
// own `lang`.
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
	}, options.map((o) => /* @__PURE__ */ React.createElement(ToggleButton, {
		key: o.id,
		lang: o.id,
		isSelected: value === o.id,
		onChange: () => onChange && onChange(o.id)
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
const { Button } = __ds_ns.__vendor["react-aria-components"];
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
	}), onRemove && /* @__PURE__ */ React.createElement(Button, {
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
const { Button } = __ds_ns.__vendor["react-aria-components"];
const { Badge } = __ds_scope;
const { IconButton } = __ds_scope;
const { cx } = __ds_scope;
// The product name is the one interactive target: <a href> (or a React Aria button without href) with a stretched ::after covering the card.
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
	}, name) : onClick ? /* @__PURE__ */ React.createElement(Button, {
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
const { Radio: AriaRadio, RadioGroup, RadioGroupStateContext } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
// One radio (React Aria) inside a RadioGroup, which holds the value and the keyboard. The label
// alone names the radio; the description is read after it, so it never becomes part of the name.
function Radio({ label, description, value, disabled, className, style, ...rest }) {
	const radioId = React.useId();
	const labelId = radioId + "-label";
	const descriptionId = radioId + "-desc";
	const namedByLabel = description && label && !rest["aria-label"] && !rest["aria-labelledby"];
	const group = React.useContext(RadioGroupStateContext);
	const radio = /* @__PURE__ */ React.createElement(AriaRadio, {
		...rest,
		value: String(value ?? radioId),
		isDisabled: disabled,
		"aria-labelledby": namedByLabel ? labelId : rest["aria-labelledby"],
		"aria-describedby": cx(description && descriptionId, rest["aria-describedby"]) || undefined,
		className: ({ isDisabled }) => cx("ag-check ag-check--radio", isDisabled && "ag-check--disabled", className),
		style
	}, /* @__PURE__ */ React.createElement("span", { className: "ag-check__box" }), /* @__PURE__ */ React.createElement("span", { className: "ag-check__text" }, /* @__PURE__ */ React.createElement("span", { id: labelId }, label), description && /* @__PURE__ */ React.createElement("span", {
		id: descriptionId,
		className: "ag-check__desc"
	}, description)));
	if (group) return radio;
	// A React Aria radio needs its group: one outside RadioGroup gets one of its own (and no arrow
	// keys to its neighbours), so wrap related radios in RadioGroup.
	return /* @__PURE__ */ React.createElement(RadioGroup, { "aria-labelledby": labelId }, radio);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Radio/Radio.jsx", error: String((e && e.message) || e) }); }

// components/RadioGroup/RadioGroup.jsx
try { (() => {
const { I18nProvider, RadioGroup: AriaRadioGroup } = __ds_ns.__vendor["react-aria-components"];
const { useField, FieldMessage } = __ds_scope;
const { cx } = __ds_scope;
const { usePageLocale } = __ds_scope;
// A list of Radios on React Aria's RadioGroup: one Tab stop, arrow keys move and select (mirrored
// in RTL, following the page's language). Controlled with `value`, or not with `defaultValue`;
// onChange(value) gets the chosen Radio's value, and `name` is the form field it posts under.
// `legend` renders <fieldset><legend>; the hint or error sits under the radios (see Field).
function RadioGroup({ label, labelledBy, legend, hint, error, id, name, value, defaultValue, onChange, disabled, required, children, className, style }) {
	const { fieldId, messageId, message, controlProps } = useField({
		id,
		hint,
		error
	});
	const legendId = fieldId + "-legend";
	const { locale, ref } = usePageLocale();
	const wrapped = !!(legend || message);
	const group = /* @__PURE__ */ React.createElement(I18nProvider, { locale }, /* @__PURE__ */ React.createElement(AriaRadioGroup, {
		ref: wrapped ? undefined : ref,
		id: fieldId,
		name,
		value: value === undefined ? undefined : value ?? null,
		defaultValue,
		onChange: (next) => onChange && onChange(next),
		isDisabled: disabled,
		isRequired: required,
		isInvalid: !!error,
		validationBehavior: "aria",
		"aria-label": legend ? undefined : label,
		"aria-labelledby": legend ? legendId : labelledBy,
		"aria-describedby": controlProps["aria-describedby"],
		"aria-errormessage": controlProps["aria-errormessage"],
		className: cx("ag-radios", !wrapped && className),
		style: wrapped ? undefined : style
	}, children));
	if (!wrapped) return group;
	const messageElement = /* @__PURE__ */ React.createElement(FieldMessage, {
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
	}, legend), group, messageElement);
	return /* @__PURE__ */ React.createElement("div", {
		ref,
		className: cx("ag-field", className),
		style
	}, group, messageElement);
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/RadioGroup/RadioGroup.jsx", error: String((e && e.message) || e) }); }

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
const { Button } = __ds_ns.__vendor["react-aria-components"];
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
		}, state === "done" && onStepClick ? /* @__PURE__ */ React.createElement(Button, {
			className: "ag-steps__btn",
			onPress: () => onStepClick(i)
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
const { Button: AriaButton, Text, UNSTABLE_Toast: AriaToast, UNSTABLE_ToastContent: ToastContent, UNSTABLE_ToastStateContext: ToastStateContext } = __ds_ns.__vendor["react-aria-components"];
const { Icon } = __ds_scope;
const { Button } = __ds_scope;
const ICONS = {
	success: "circle-check",
	info: "flower-2",
	warning: "triangle-alert",
	danger: "circle-alert"
};
// A toast on React Aria (role="alertdialog" with its text in an atomic alert, labelled by the title
// and described by the message). It renders where it is placed: the page decides where it shows and
// how long it stays, and React Aria's close button calls onClose. The toast itself is never a click
// target — put the follow-up in `action` (a real button or link).
function Toast({ tone = "success", title, message, action, onClose, closeLabel = "Dismiss", style }) {
	const key = React.useId();
	const latestClose = React.useRef(onClose);
	latestClose.current = onClose;
	// React Aria's Toast reads its queue from context; this one holds just this toast.
	const toast = React.useMemo(() => ({
		key,
		content: null
	}), [key]);
	const state = React.useMemo(() => ({
		visibleToasts: [toast],
		add: () => key,
		close: () => latestClose.current && latestClose.current(),
		pauseAll() {},
		resumeAll() {}
	}), [key, toast]);
	return /* @__PURE__ */ React.createElement(ToastStateContext.Provider, { value: state }, /* @__PURE__ */ React.createElement(AriaToast, {
		toast,
		className: "ag-toast",
		style
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: ICONS[tone],
		size: 20,
		className: "ag-toast__icon--" + tone
	}), /* @__PURE__ */ React.createElement(ToastContent, { className: "ag-toast__body" }, /* @__PURE__ */ React.createElement(Text, {
		slot: "title",
		elementType: "div",
		className: "ag-toast__title"
	}, title), message && /* @__PURE__ */ React.createElement(Text, {
		slot: "description",
		elementType: "div",
		className: "ag-toast__msg"
	}, message), action && /* @__PURE__ */ React.createElement(Button, {
		variant: "ghost",
		size: "sm",
		className: "ag-toast__action",
		href: action.href,
		onClick: action.onClick
	}, action.label)), onClose && /* @__PURE__ */ React.createElement(AriaButton, {
		slot: "close",
		className: "ag-toast__close",
		"aria-label": closeLabel
	}, /* @__PURE__ */ React.createElement(Icon, {
		name: "x",
		size: 16
	}))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Toast/Toast.jsx", error: String((e && e.message) || e) }); }

// components/Tooltip/Tooltip.jsx
try { (() => {
const { Focusable, Tooltip: AriaTooltip, TooltipTrigger } = __ds_ns.__vendor["react-aria-components"];
const { cx } = __ds_scope;
// A tooltip on React Aria (WCAG 1.4.13): it shows on hover and keyboard focus, describes its trigger
// (aria-describedby) while shown, and Esc dismisses it. React Aria ignores touch, so a tap on the
// trigger toggles it too, and a tap anywhere else hides it. The trigger is a React Aria button
// (Button, IconButton) or a native focusable element.
function Tooltip({ content, placement = "top", open, children }) {
	const [tapped, setTapped] = React.useState(false);
	const wrapperRef = React.useRef(null);
	React.useEffect(() => {
		if (!tapped) return;
		const onPointerDown = (event) => {
			if (!wrapperRef.current || !wrapperRef.current.contains(event.target)) setTapped(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [tapped]);
	// Template runtimes pass even a single child as an array, so unwrap a lone element first. A
	// native element (a plain <button>) needs Focusable to reach React Aria's trigger props.
	const childList = React.Children.toArray(children);
	const onlyChild = childList.length === 1 && React.isValidElement(childList[0]) ? childList[0] : null;
	const trigger = onlyChild && typeof onlyChild.type === "string" ? /* @__PURE__ */ React.createElement(Focusable, null, onlyChild) : children;
	return /* @__PURE__ */ React.createElement(TooltipTrigger, {
		isOpen: open || tapped ? true : undefined,
		onOpenChange: (isOpen) => !isOpen && setTapped(false),
		delay: 300,
		closeDelay: 200
	}, /* @__PURE__ */ React.createElement("span", {
		ref: wrapperRef,
		className: "ag-tip",
		onPointerUp: (event) => event.pointerType === "touch" && setTapped((shown) => !shown)
	}, trigger), /* @__PURE__ */ React.createElement(AriaTooltip, {
		placement: placement === "bottom" ? "bottom" : "top",
		offset: 8,
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
__ds_ns.RadioGroup = __ds_scope.RadioGroup;
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
