const t={},e=()=>{},n=Object.assign,r=Object.prototype.hasOwnProperty,s=(t,e)=>r.call(t,e),i=Array.isArray,o=t=>"[object Map]"===f(t),c=t=>"function"==typeof t,u=t=>"symbol"==typeof t,a=t=>null!==t&&"object"==typeof t,l=Object.prototype.toString,f=t=>l.call(t),_=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,h=(t,e)=>t!==e&&(t==t||e==e),v=new WeakMap,d=[];let p;const g=Symbol(""),y=Symbol("");function w(e,n=t){(function(t){return t&&!0===t._isEffect})(e)&&(e=e.raw);const r=function(t,e){const n=function(){if(!n.active)return e.scheduler?void 0:t();if(!d.includes(n)){S(n);try{return j(),d.push(n),p=n,t()}finally{d.pop(),O(),p=d[d.length-1]}}};return n.id=b++,n.allowRecurse=!!e.allowRecurse,n._isEffect=!0,n.active=!0,n.raw=t,n.deps=[],n.options=e,n}(e,n);return n.lazy||r(),r}function R(t){t.active&&(S(t),t.options.onStop&&t.options.onStop(),t.active=!1)}let b=0;function S(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let k=!0;const E=[];function m(){E.push(k),k=!1}function j(){E.push(k),k=!0}function O(){const t=E.pop();k=void 0===t||t}function P(t,e,n){if(!k||void 0===p)return;let r=v.get(t);r||v.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=new Set),s.has(p)||(s.add(p),p.deps.push(s))}function x(t,e,n,r,s,c){const u=v.get(t);if(!u)return;const a=new Set,l=t=>{t&&t.forEach(t=>{(t!==p||t.allowRecurse)&&a.add(t)})};if("clear"===e)u.forEach(l);else if("length"===n&&i(t))u.forEach((t,e)=>{("length"===e||e>=r)&&l(t)});else switch(void 0!==n&&l(u.get(n)),e){case"add":i(t)?_(n)&&l(u.get("length")):(l(u.get(g)),o(t)&&l(u.get(y)));break;case"delete":i(t)||(l(u.get(g)),o(t)&&l(u.get(y)));break;case"set":o(t)&&l(u.get(g))}a.forEach(t=>{t.options.scheduler?t.options.scheduler(t):t()})}const z=new Set(Object.getOwnPropertyNames(Symbol).map(t=>Symbol[t]).filter(u)),M=I(),A=I(!1,!0),W=I(!0),N=I(!0,!0),V={};function I(t=!1,e=!1){return function(n,r,o){if("__v_isReactive"===r)return!t;if("__v_isReadonly"===r)return t;if("__v_raw"===r&&o===(t?lt:at).get(n))return n;const c=i(n);if(c&&s(V,r))return Reflect.get(V,r,o);const l=Reflect.get(n,r,o);if(u(r)?z.has(r):"__proto__"===r||"__v_isRef"===r)return l;if(t||P(n,0,r),e)return l;if(kt(l)){return!c||!_(r)?l.value:l}return a(l)?t?vt(l):_t(l):l}}["includes","indexOf","lastIndexOf"].forEach(t=>{const e=Array.prototype[t];V[t]=function(...t){const n=Rt(this);for(let t=0,e=this.length;t<e;t++)P(n,0,t+"");const r=e.apply(n,t);return-1===r||!1===r?e.apply(n,t.map(Rt)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{const e=Array.prototype[t];V[t]=function(...t){m();const n=e.apply(this,t);return O(),n}});function K(t=!1){return function(e,n,r,o){const c=e[n];if(!t&&(r=Rt(r),!i(e)&&kt(c)&&!kt(r)))return c.value=r,!0;const u=i(e)&&_(n)?Number(n)<e.length:s(e,n),a=Reflect.set(e,n,r,o);return e===Rt(o)&&(u?h(r,c)&&x(e,"set",n,r):x(e,"add",n,r)),a}}const B={get:M,set:K(),deleteProperty:function(t,e){const n=s(t,e),r=Reflect.deleteProperty(t,e);return r&&n&&x(t,"delete",e,void 0),r},has:function(t,e){const n=Reflect.has(t,e);return u(e)&&z.has(e)||P(t,0,e),n},ownKeys:function(t){return P(t,0,i(t)?"length":g),Reflect.ownKeys(t)}},q={get:W,set:(t,e)=>!0,deleteProperty:(t,e)=>!0},C=n({},B,{get:A,set:K(!0)}),D=n({},q,{get:N}),F=t=>a(t)?_t(t):t,G=t=>a(t)?vt(t):t,H=t=>t,J=t=>Reflect.getPrototypeOf(t);function L(t,e,n=!1,r=!1){const s=Rt(t=t.__v_raw),i=Rt(e);e!==i&&!n&&P(s,0,e),!n&&P(s,0,i);const{has:o}=J(s),c=n?G:r?H:F;return o.call(s,e)?c(t.get(e)):o.call(s,i)?c(t.get(i)):void 0}function Q(t,e=!1){const n=this.__v_raw,r=Rt(n),s=Rt(t);return t!==s&&!e&&P(r,0,t),!e&&P(r,0,s),t===s?n.has(t):n.has(t)||n.has(s)}function T(t,e=!1){return t=t.__v_raw,!e&&P(Rt(t),0,g),Reflect.get(t,"size",t)}function U(t){t=Rt(t);const e=Rt(this),n=J(e).has.call(e,t),r=e.add(t);return n||x(e,"add",t,t),r}function X(t,e){e=Rt(e);const n=Rt(this),{has:r,get:s}=J(n);let i=r.call(n,t);i||(t=Rt(t),i=r.call(n,t));const o=s.call(n,t),c=n.set(t,e);return i?h(e,o)&&x(n,"set",t,e):x(n,"add",t,e),c}function Y(t){const e=Rt(this),{has:n,get:r}=J(e);let s=n.call(e,t);s||(t=Rt(t),s=n.call(e,t));r&&r.call(e,t);const i=e.delete(t);return s&&x(e,"delete",t,void 0),i}function Z(){const t=Rt(this),e=0!==t.size,n=t.clear();return e&&x(t,"clear",void 0,void 0),n}function $(t,e){return function(n,r){const s=this,i=s.__v_raw,o=Rt(i),c=t?G:e?H:F;return!t&&P(o,0,g),i.forEach((t,e)=>n.call(r,c(t),c(e),s))}}function tt(t,e,n){return function(...r){const s=this.__v_raw,i=Rt(s),c=o(i),u="entries"===t||t===Symbol.iterator&&c,a="keys"===t&&c,l=s[t](...r),f=e?G:n?H:F;return!e&&P(i,0,a?y:g),{next(){const{value:t,done:e}=l.next();return e?{value:t,done:e}:{value:u?[f(t[0]),f(t[1])]:f(t),done:e}},[Symbol.iterator](){return this}}}}function et(t){return function(...e){return"delete"!==t&&this}}const nt={get(t){return L(this,t)},get size(){return T(this)},has:Q,add:U,set:X,delete:Y,clear:Z,forEach:$(!1,!1)},rt={get(t){return L(this,t,!1,!0)},get size(){return T(this)},has:Q,add:U,set:X,delete:Y,clear:Z,forEach:$(!1,!0)},st={get(t){return L(this,t,!0)},get size(){return T(this,!0)},has(t){return Q.call(this,t,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:$(!0,!1)};function it(t,e){const n=e?rt:t?st:nt;return(e,r,i)=>"__v_isReactive"===r?!t:"__v_isReadonly"===r?t:"__v_raw"===r?e:Reflect.get(s(n,r)&&r in e?n:e,r,i)}["keys","values","entries",Symbol.iterator].forEach(t=>{nt[t]=tt(t,!1,!1),st[t]=tt(t,!0,!1),rt[t]=tt(t,!1,!0)});const ot={get:it(!1,!1)},ct={get:it(!1,!0)},ut={get:it(!0,!1)},at=new WeakMap,lt=new WeakMap;function ft(t){return t.__v_skip||!Object.isExtensible(t)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((t=>f(t).slice(8,-1))(t))}function _t(t){return t&&t.__v_isReadonly?t:pt(t,!1,B,ot)}function ht(t){return pt(t,!1,C,ct)}function vt(t){return pt(t,!0,q,ut)}function dt(t){return pt(t,!0,D,ut)}function pt(t,e,n,r){if(!a(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const s=e?lt:at,i=s.get(t);if(i)return i;const o=ft(t);if(0===o)return t;const c=new Proxy(t,2===o?r:n);return s.set(t,c),c}function gt(t){return yt(t)?gt(t.__v_raw):!(!t||!t.__v_isReactive)}function yt(t){return!(!t||!t.__v_isReadonly)}function wt(t){return gt(t)||yt(t)}function Rt(t){return t&&Rt(t.__v_raw)||t}function bt(t){return((t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})})(t,"__v_skip",!0),t}const St=t=>a(t)?_t(t):t;function kt(t){return Boolean(t&&!0===t.__v_isRef)}function Et(t){return Ot(t)}function mt(t){return Ot(t,!0)}class jt{constructor(t,e=!1){this._rawValue=t,this._shallow=e,this.__v_isRef=!0,this._value=e?t:St(t)}get value(){return P(Rt(this),0,"value"),this._value}set value(t){h(Rt(t),this._rawValue)&&(this._rawValue=t,this._value=this._shallow?t:St(t),x(Rt(this),"set","value",t))}}function Ot(t,e=!1){return kt(t)?t:new jt(t,e)}function Pt(t){x(Rt(t),"set","value",void 0)}function xt(t){return kt(t)?t.value:t}const zt={get:(t,e,n)=>xt(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return kt(s)&&!kt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Mt(t){return gt(t)?t:new Proxy(t,zt)}class At{constructor(t){this.__v_isRef=!0;const{get:e,set:n}=t(()=>P(this,0,"value"),()=>x(this,"set","value"));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}function Wt(t){return new At(t)}function Nt(t){const e=i(t)?new Array(t.length):{};for(const n in t)e[n]=It(t,n);return e}class Vt{constructor(t,e){this._object=t,this._key=e,this.__v_isRef=!0}get value(){return this._object[this._key]}set value(t){this._object[this._key]=t}}function It(t,e){return kt(t[e])?t[e]:new Vt(t,e)}class Kt{constructor(t,e,n){this._setter=e,this._dirty=!0,this.__v_isRef=!0,this.effect=w(t,{lazy:!0,scheduler:()=>{this._dirty||(this._dirty=!0,x(Rt(this),"set","value"))}}),this.__v_isReadonly=n}get value(){return this._dirty&&(this._value=this.effect(),this._dirty=!1),P(Rt(this),0,"value"),this._value}set value(t){this._setter(t)}}function Bt(t){let n,r;return c(t)?(n=t,r=e):(n=t.get,r=t.set),new Kt(n,r,c(t)||!t.set)}export{g as ITERATE_KEY,Bt as computed,Wt as customRef,w as effect,j as enableTracking,wt as isProxy,gt as isReactive,yt as isReadonly,kt as isRef,bt as markRaw,m as pauseTracking,Mt as proxyRefs,_t as reactive,vt as readonly,Et as ref,O as resetTracking,ht as shallowReactive,dt as shallowReadonly,mt as shallowRef,R as stop,Rt as toRaw,It as toRef,Nt as toRefs,P as track,x as trigger,Pt as triggerRef,xt as unref};
