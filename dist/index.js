!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var s in r)("object"==typeof exports?exports:e)[s]=r[s]}}(window,function(){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(s,o,function(t){return e[t]}.bind(null,o));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class s{static parse(e){let t=[];return t=s.getParts(e,t,s.isBemBlock(e),s.getBlockParam),t=s.getParts(e,t,s.isBemModifier(e),s.getModifierParam)}static isBemBlock(e){return!!e.match(s.BLOCK_PATTERN)}static isBemModifier(e){return!!e.match(s.MODIFIER_PATTERN)}static getParts(e,t,r,s){if(!r)return t;return e.split(".").filter(Boolean).forEach(e=>{(e=s(e))&&!t.includes(e)&&t.push(e)}),t}static getBlockParam(e){const t=/\S+?(?=__)/g;return e.match(t)&&"."+e.match(t)[0]+" *"}static getModifierParam(e){const t=/\S+?(?=--)/g;return e.match(t)&&"."+e.match(t)[0]}}s.BLOCK_PATTERN=/\S+__\S+/g,s.MODIFIER_PATTERN=/\S+--\S+/g,t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(2),o=r(3),n=e=>new s.default(e.stylesheet.rules).resolve();t.preprocess=((e,t)=>(e.stylesheet.rules=n(e),t())),t.processLint=(e=>(e.stylesheet.rules=n(e),o.lint(e))),t.name="BEM"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(0);class o{constructor(e){this.rules=e}resolve(){let e=[];return this.rules.forEach(t=>{if(o.isNotMediaQuery(t)&&o.isRule(t)){this.flattenRules([t]).map(t=>{e.push(this.getRuleWithBemDeclarations(t))})}else t.rules=this.flattenRules(t.rules),t.rules=t.rules.map(e=>this.getRuleWithBemDeclarations(e)),e.push(t)}),e}flattenRules(e){let t=[];return e?(e.forEach(e=>{e.selectors&&e.selectors.forEach(r=>{const s={type:e.type,selectors:[r],declarations:e.declarations,position:e.position};t.push(s)})}),t):t}static isNotMediaQuery(e){return"media"!==e.type}static isRule(e){return"rule"===e.type}getRuleWithBemDeclarations(e){const t=[];if(e.selectors.forEach(e=>{o.isCssClass(e)&&(e=o.getLastPartOfCssClass(e),t.push(e))}),t.length<1)return e;let r=s.default.parse(t[0]);return(r=o.removeInvalidMatches(r))?(e.declarations=e.declarations.concat(r.map(e=>({type:"declaration",property:"x-should",value:`match '${e}'`}))),e):e}static isCssClass(e){return!!e.match(/(\.\S+)/g)}static removeInvalidMatches(e){return e.filter(e=>!e.match(/\[.+/g))}static getLastPartOfCssClass(e){return"."+e.split(".").filter(Boolean).pop()}}t.default=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(0);t.lint=(e=>{return o(e).map(({rule:e,className:t})=>({missingClassName:t,selector:e.selectors[0]||"",source:e.position.source,start:e.position.start,end:e.position.end}))});const o=e=>{let t=[],r=[],s=[];return e.stylesheet.rules.forEach(e=>{n(e,t,r,s),"media"===e.type&&e.rules.forEach(e=>{n(e,t,r,s)})}),[...new Set(t)]},n=(e,t,r,o)=>{if("rule"===e.type){const n=e.selectors[0];o.push(n),e.declarations.forEach(i=>{if("x-should"===i.property){const a=i.value.match(/(?=\.)(.*)(?=')/g)[0].match(/(\.\S+)/g)[0];if(!((e,t,r)=>!e.includes(r)&&!t.includes(r))(r,o,a))return;if(s.default.isBemModifier(n)&&s.default.isBemBlock(a)){const s=new RegExp(a,"g");n.match(s).length<=1&&(r.push(a),t.push({className:a,rule:e}))}!s.default.isBemBlock(n)||s.default.isBemModifier(a)||s.default.isBemBlock(a)||(r.push(a),t.push({className:a,rule:e}))}})}}}])});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvQmVtUGFyc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUnVsZXNSZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGludC50cyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIndpbmRvdyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIkJlbVBhcnNlciIsIltvYmplY3QgT2JqZWN0XSIsImNsYXNzTmFtZSIsInBhcnRzIiwiZ2V0UGFydHMiLCJpc0JlbUJsb2NrIiwiZ2V0QmxvY2tQYXJhbSIsImlzQmVtTW9kaWZpZXIiLCJnZXRNb2RpZmllclBhcmFtIiwibWF0Y2giLCJCTE9DS19QQVRURVJOIiwiTU9ESUZJRVJfUEFUVEVSTiIsInNob3VsZEJlUGFydE9mIiwiYmVtVHlwZSIsImdldFBhcmFtIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwiZm9yRWFjaCIsInBhcnQiLCJpbmNsdWRlcyIsInB1c2giLCJibG9ja1BhdHRlcm4iLCJtb2RpZmllclBhdHRlcm4iLCJkZWZhdWx0IiwiUnVsZXNSZXNvbHZlcl8xIiwibGludF8xIiwicHJvY2VzcyIsImN0eCIsInN0eWxlc2hlZXQiLCJydWxlcyIsInJlc29sdmUiLCJwcmVwcm9jZXNzIiwibmV4dCIsInByb2Nlc3NMaW50IiwibGludCIsIkJlbVBhcnNlcl8xIiwiUnVsZXNSZXNvbHZlciIsInRoaXMiLCJyZXN1bHQiLCJydWxlIiwiaXNOb3RNZWRpYVF1ZXJ5IiwiaXNSdWxlIiwiZmxhdHRlblJ1bGVzIiwibWFwIiwiZ2V0UnVsZVdpdGhCZW1EZWNsYXJhdGlvbnMiLCJyZXN1bHRzIiwic2VsZWN0b3JzIiwic2VsZWN0b3IiLCJuZXdSdWxlIiwidHlwZSIsImRlY2xhcmF0aW9ucyIsInBvc2l0aW9uIiwic2VsZWN0b3JzV2l0aENzc0NsYXNzIiwiaXNDc3NDbGFzcyIsImdldExhc3RQYXJ0T2ZDc3NDbGFzcyIsImxlbmd0aCIsInBhcmFtcyIsInBhcnNlIiwicmVtb3ZlSW52YWxpZE1hdGNoZXMiLCJjb25jYXQiLCJwYXJhbSIsIm1hdGNoZXMiLCJwb3AiLCJjc3MiLCJnZXRJbnZhbGlkUnVsZXMiLCJtaXNzaW5nQ2xhc3NOYW1lIiwic291cmNlIiwic3RhcnQiLCJlbmQiLCJpbnZhbGlkUnVsZXMiLCJpbnZhbGlkQ2xhc3NOYW1lcyIsImRldGVjdE1pc3NpbmdDbGFzc2VzIiwiU2V0IiwiZGVjbGFyYXRpb24iLCJpc0NsYXNzTmFtZUV4aXN0SW5Db2xsZWN0aW9uIiwicmVnZXgiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiJDQUFBLFNBQUFBLEVBQUFDLEdBQ0Esb0JBQUFDLFNBQUEsaUJBQUFDLE9BQ0FBLE9BQUFELFFBQUFELFNBQ0Esc0JBQUFHLGVBQUFDLElBQ0FELE9BQUEsR0FBQUgsT0FDQSxDQUNBLElBQUFLLEVBQUFMLElBQ0EsUUFBQU0sS0FBQUQsR0FBQSxpQkFBQUosZ0JBQUFGLEdBQUFPLEdBQUFELEVBQUFDLElBUEEsQ0FTQ0MsT0FBQSxXQUNELG1CQ1RBLElBQUFDLEVBQUEsR0FHQSxTQUFBQyxF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QWRQLEVBQUtVLE1BQ1BWLEVBQUtWLE1BQU1aLFFBQVNzQixJQUNsQmdDLEVBQXFCaEMsRUFBTThCLEVBQWNDLEVBQW1CeEIsT0FLM0QsSUFBSSxJQUFJMEIsSUFBSUgsS0FTZkUsRUFBdUIsQ0FDM0JoQyxFQUNBOEIsRUFDQUMsRUFDQXhCLEtBRUEsR0FBa0IsU0FBZFAsRUFBS1UsS0FBaUIsQ0FDeEIsTUFBTUYsRUFBV1IsRUFBS08sVUFBVSxHQUVoQ0EsRUFBVTFCLEtBQUsyQixHQUVmUixFQUFLVyxhQUFhakMsUUFBU3dELElBQ3pCLEdBQTZCLGFBQXpCQSxFQUFZL0UsU0FBeUIsQ0FDdkMsTUFHTU8sRUFIb0N3RSxFQUFZekYsTUFBTXdCLE1BQU0sb0JBQ1QsR0FBR0EsTUFBTSxZQUVqQyxHQUVqQyxJQXhCNkIsRUFDbkM4RCxFQUNBeEIsRUFDQTdDLEtBQ2FxRSxFQUFrQm5ELFNBQVNsQixLQUFlNkMsRUFBVTNCLFNBQVNsQixHQW9CL0R5RSxDQUE2QkosRUFBbUJ4QixFQUFXN0MsR0FDOUQsT0FHRixHQUFJa0MsRUFBQVosUUFBVWpCLGNBQWN5QyxJQUFhWixFQUFBWixRQUFVbkIsV0FBV0gsR0FBWSxDQUN4RSxNQUFNMEUsRUFBUSxJQUFJQyxPQUFPM0UsRUFBVyxLQUNwQjhDLEVBQVN2QyxNQUFNbUUsR0FFbkJwQixRQUFVLElBQ3BCZSxFQUFrQmxELEtBQUtuQixHQUN2Qm9FLEVBQWFqRCxLQUFLLENBQUVuQixZQUFXc0MsV0FJL0JKLEVBQUFaLFFBQVVuQixXQUFXMkMsSUFBY1osRUFBQVosUUFBVWpCLGNBQWNMLElBQWVrQyxFQUFBWixRQUFVbkIsV0FBV0gsS0FDakdxRSxFQUFrQmxELEtBQUtuQixHQUN2Qm9FLEVBQWFqRCxLQUFLLENBQUVuQixZQUFXc0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCJpbXBvcnQgeyBDbGFzc05hbWVUeXBlIH0gZnJvbSAnLi9saW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVtUGFyc2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgQkxPQ0tfUEFUVEVSTjogUmVnRXhwID0gL1xcUytfX1xcUysvZztcbiAgcHJpdmF0ZSBzdGF0aWMgTU9ESUZJRVJfUEFUVEVSTjogUmVnRXhwID0gL1xcUystLVxcUysvZztcblxuICBwdWJsaWMgc3RhdGljIHBhcnNlKGNsYXNzTmFtZTogQ2xhc3NOYW1lVHlwZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIGxldCBwYXJ0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgcGFydHMgPSBCZW1QYXJzZXIuZ2V0UGFydHMoY2xhc3NOYW1lLCBwYXJ0cywgQmVtUGFyc2VyLmlzQmVtQmxvY2soY2xhc3NOYW1lKSwgQmVtUGFyc2VyLmdldEJsb2NrUGFyYW0pO1xuICAgIHBhcnRzID0gQmVtUGFyc2VyLmdldFBhcnRzKGNsYXNzTmFtZSwgcGFydHMsIEJlbVBhcnNlci5pc0JlbU1vZGlmaWVyKGNsYXNzTmFtZSksIEJlbVBhcnNlci5nZXRNb2RpZmllclBhcmFtKTtcblxuICAgIHJldHVybiBwYXJ0cztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCZW1CbG9jayhjbGFzc05hbWU6IENsYXNzTmFtZVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjbGFzc05hbWUubWF0Y2goQmVtUGFyc2VyLkJMT0NLX1BBVFRFUk4pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JlbU1vZGlmaWVyKGNsYXNzTmFtZTogQ2xhc3NOYW1lVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNsYXNzTmFtZS5tYXRjaChCZW1QYXJzZXIuTU9ESUZJRVJfUEFUVEVSTik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRQYXJ0cyhcbiAgICBjbGFzc05hbWU6IENsYXNzTmFtZVR5cGUsXG4gICAgc2hvdWxkQmVQYXJ0T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgYmVtVHlwZTogYm9vbGVhbixcbiAgICBnZXRQYXJhbTogRnVuY3Rpb24sXG4gICk6IEFycmF5PHN0cmluZz4ge1xuICAgIGlmICghYmVtVHlwZSkge1xuICAgICAgcmV0dXJuIHNob3VsZEJlUGFydE9mO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnRzOiBBcnJheTxzdHJpbmc+ID0gY2xhc3NOYW1lLnNwbGl0KCcuJykuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgcGFydHMuZm9yRWFjaCgocGFydCkgPT4ge1xuICAgICAgcGFydCA9IGdldFBhcmFtKHBhcnQpO1xuXG4gICAgICBpZiAocGFydCAmJiAhc2hvdWxkQmVQYXJ0T2YuaW5jbHVkZXMocGFydCkpIHtcbiAgICAgICAgc2hvdWxkQmVQYXJ0T2YucHVzaChwYXJ0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzaG91bGRCZVBhcnRPZjtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldEJsb2NrUGFyYW0oY2xhc3NOYW1lOiBDbGFzc05hbWVUeXBlKTogc3RyaW5nIHtcbiAgICBjb25zdCBibG9ja1BhdHRlcm46IFJlZ0V4cCA9IC9cXFMrPyg/PV9fKS9nO1xuXG4gICAgcmV0dXJuIGNsYXNzTmFtZS5tYXRjaChibG9ja1BhdHRlcm4pICYmICcuJyArIGNsYXNzTmFtZS5tYXRjaChibG9ja1BhdHRlcm4pWzBdICsgJyAqJztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldE1vZGlmaWVyUGFyYW0oY2xhc3NOYW1lOiBDbGFzc05hbWVUeXBlKTogc3RyaW5nIHtcbiAgICBjb25zdCBtb2RpZmllclBhdHRlcm46IFJlZ0V4cCA9IC9cXFMrPyg/PS0tKS9nO1xuXG4gICAgcmV0dXJuIGNsYXNzTmFtZS5tYXRjaChtb2RpZmllclBhdHRlcm4pICYmICcuJyArIGNsYXNzTmFtZS5tYXRjaChtb2RpZmllclBhdHRlcm4pWzBdO1xuICB9XG59XG4iLCJpbXBvcnQgUnVsZXNSZXNvbHZlciBmcm9tICcuL1J1bGVzUmVzb2x2ZXInO1xuaW1wb3J0IHsgUnVsZSwgU3R5bGVzaGVldCB9IGZyb20gJ2Nzcyc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5SW50ZXJmYWNlIH0gZnJvbSAnLi9NZWRpYVF1ZXJ5SW50ZXJmYWNlJztcbmltcG9ydCB7IGxpbnQgfSBmcm9tICcuL2xpbnQnO1xuXG5jb25zdCBwcm9jZXNzID0gKGN0eDogU3R5bGVzaGVldCk6IEFycmF5PFJ1bGUgfCBNZWRpYVF1ZXJ5SW50ZXJmYWNlPiA9PiB7XG4gIHJldHVybiBuZXcgUnVsZXNSZXNvbHZlcihjdHguc3R5bGVzaGVldC5ydWxlcykucmVzb2x2ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXByb2Nlc3M6IEZ1bmN0aW9uID0gKGN0eDogU3R5bGVzaGVldCwgbmV4dDogRnVuY3Rpb24pOiBGdW5jdGlvbiA9PiB7XG4gIGN0eC5zdHlsZXNoZWV0LnJ1bGVzID0gcHJvY2VzcyhjdHgpO1xuXG4gIHJldHVybiBuZXh0KCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJvY2Vzc0xpbnQgPSAoY3R4OiBTdHlsZXNoZWV0KTogQXJyYXk8T2JqZWN0PiA9PiB7XG4gIGN0eC5zdHlsZXNoZWV0LnJ1bGVzID0gcHJvY2VzcyhjdHgpO1xuXG4gIHJldHVybiBsaW50KGN0eCk7XG59O1xuXG5leHBvcnQgY29uc3QgbmFtZTogc3RyaW5nID0gJ0JFTSc7XG4iLCJpbXBvcnQgQmVtUGFyc2VyIGZyb20gJy4vQmVtUGFyc2VyJztcbmltcG9ydCB7IE1lZGlhUXVlcnlJbnRlcmZhY2UgfSBmcm9tICcuL01lZGlhUXVlcnlJbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXRSdWxlLCBDb21tZW50LCBSdWxlIH0gZnJvbSAnY3NzJztcbmltcG9ydCB7IFNlbGVjdG9yVHlwZSB9IGZyb20gJy4vbGludCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgWHNob3VsZERlY2xhcmF0aW9uSW50ZXJmYWNlIHtcbiAgdHlwZTogc3RyaW5nO1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBydWxlczogQXJyYXk8UnVsZSB8IENvbW1lbnQgfCBBdFJ1bGU+KSB7fVxuXG4gIHB1YmxpYyByZXNvbHZlKCk6IEFycmF5PFJ1bGUgfCBNZWRpYVF1ZXJ5SW50ZXJmYWNlPiB7XG4gICAgbGV0IHJlc3VsdDogQXJyYXk8UnVsZSB8IE1lZGlhUXVlcnlJbnRlcmZhY2U+ID0gW107XG5cbiAgICB0aGlzLnJ1bGVzLmZvckVhY2goXG4gICAgICAocnVsZTogYW55KTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChSdWxlc1Jlc29sdmVyLmlzTm90TWVkaWFRdWVyeShydWxlKSAmJiBSdWxlc1Jlc29sdmVyLmlzUnVsZShydWxlKSkge1xuICAgICAgICAgIGxldCBydWxlcyA9IHRoaXMuZmxhdHRlblJ1bGVzKFtydWxlXSk7XG5cbiAgICAgICAgICBydWxlcy5tYXAoKHJ1bGUpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2V0UnVsZVdpdGhCZW1EZWNsYXJhdGlvbnMocnVsZSkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcnVsZS5ydWxlcyA9IHRoaXMuZmxhdHRlblJ1bGVzKHJ1bGUucnVsZXMpO1xuXG4gICAgICAgIHJ1bGUucnVsZXMgPSBydWxlLnJ1bGVzLm1hcCgocnVsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFJ1bGVXaXRoQmVtRGVjbGFyYXRpb25zKHJ1bGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHQucHVzaChydWxlKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGZsYXR0ZW5SdWxlcyhydWxlczogQXJyYXk8UnVsZT4pOiBBcnJheTxSdWxlPiB7XG4gICAgbGV0IHJlc3VsdHM6IEFycmF5PFJ1bGU+ID0gW107XG5cbiAgICBpZiAoIXJ1bGVzKSB7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBydWxlcy5mb3JFYWNoKFxuICAgICAgKHJ1bGUpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCFydWxlLnNlbGVjdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGUuc2VsZWN0b3JzLmZvckVhY2goXG4gICAgICAgICAgKHNlbGVjdG9yKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdSdWxlOiBSdWxlID0ge1xuICAgICAgICAgICAgICB0eXBlOiBydWxlLnR5cGUsXG4gICAgICAgICAgICAgIHNlbGVjdG9yczogW3NlbGVjdG9yXSxcbiAgICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBydWxlLmRlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgcG9zaXRpb246IHJ1bGUucG9zaXRpb24sXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobmV3UnVsZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNOb3RNZWRpYVF1ZXJ5KHJ1bGU6IE1lZGlhUXVlcnlJbnRlcmZhY2UgfCBSdWxlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJ1bGUudHlwZSAhPT0gJ21lZGlhJztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzUnVsZShydWxlOiBNZWRpYVF1ZXJ5SW50ZXJmYWNlIHwgUnVsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBydWxlLnR5cGUgPT09ICdydWxlJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UnVsZVdpdGhCZW1EZWNsYXJhdGlvbnMocnVsZTogUnVsZSk6IFJ1bGUge1xuICAgIGNvbnN0IHNlbGVjdG9yc1dpdGhDc3NDbGFzczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgcnVsZS5zZWxlY3RvcnMuZm9yRWFjaChcbiAgICAgIChzZWxlY3Rvcik6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoUnVsZXNSZXNvbHZlci5pc0Nzc0NsYXNzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHNlbGVjdG9yID0gUnVsZXNSZXNvbHZlci5nZXRMYXN0UGFydE9mQ3NzQ2xhc3Moc2VsZWN0b3IpO1xuICAgICAgICAgIHNlbGVjdG9yc1dpdGhDc3NDbGFzcy5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHNlbGVjdG9yc1dpdGhDc3NDbGFzcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gcnVsZTtcbiAgICB9XG5cbiAgICBsZXQgcGFyYW1zOiBBcnJheTxzdHJpbmc+ID0gQmVtUGFyc2VyLnBhcnNlKHNlbGVjdG9yc1dpdGhDc3NDbGFzc1swXSk7XG5cbiAgICBwYXJhbXMgPSBSdWxlc1Jlc29sdmVyLnJlbW92ZUludmFsaWRNYXRjaGVzKHBhcmFtcyk7XG5cbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgfVxuXG4gICAgcnVsZS5kZWNsYXJhdGlvbnMgPSBydWxlLmRlY2xhcmF0aW9ucy5jb25jYXQoXG4gICAgICBwYXJhbXMubWFwKFxuICAgICAgICAocGFyYW0pOiBYc2hvdWxkRGVjbGFyYXRpb25JbnRlcmZhY2UgPT4ge1xuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdkZWNsYXJhdGlvbicsIHByb3BlcnR5OiAneC1zaG91bGQnLCB2YWx1ZTogYG1hdGNoICcke3BhcmFtfSdgIH07XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzQ3NzQ2xhc3Moc2VsZWN0b3I6IFNlbGVjdG9yVHlwZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBhdHRlcm46IFJlZ0V4cCA9IC8oXFwuXFxTKykvZztcblxuICAgIHJldHVybiAhIXNlbGVjdG9yLm1hdGNoKHBhdHRlcm4pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVtb3ZlSW52YWxpZE1hdGNoZXMobWF0Y2hlczogQXJyYXk8c3RyaW5nPik6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+ICFtYXRjaC5tYXRjaCgvXFxbLisvZykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0TGFzdFBhcnRPZkNzc0NsYXNzKHNlbGVjdG9yOiBTZWxlY3RvclR5cGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcnRzOiBBcnJheTxzdHJpbmc+ID0gc2VsZWN0b3Iuc3BsaXQoJy4nKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICByZXR1cm4gJy4nICsgcGFydHMucG9wKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1lZGlhLCBSdWxlLCBTdHlsZXNoZWV0IH0gZnJvbSAnY3NzJztcbmltcG9ydCB7IFhzaG91bGREZWNsYXJhdGlvbkludGVyZmFjZSB9IGZyb20gJy4vUnVsZXNSZXNvbHZlcic7XG5pbXBvcnQgQmVtUGFyc2VyIGZyb20gJy4vQmVtUGFyc2VyJztcblxuZXhwb3J0IHR5cGUgQ2xhc3NOYW1lVHlwZSA9IHN0cmluZztcbnR5cGUgQ2xhc3NOYW1lc1R5cGUgPSBBcnJheTxDbGFzc05hbWVUeXBlPjtcbmV4cG9ydCB0eXBlIFNlbGVjdG9yVHlwZSA9IHN0cmluZztcbnR5cGUgU2VsZWN0b3JzVHlwZSA9IEFycmF5PFNlbGVjdG9yVHlwZT47XG5cbmV4cG9ydCBjb25zdCBsaW50ID0gKGNzczogU3R5bGVzaGVldCk6IEFycmF5PE9iamVjdD4gPT4ge1xuICBjb25zdCBydWxlcyA9IGdldEludmFsaWRSdWxlcyhjc3MpO1xuXG4gIHJldHVybiBydWxlcy5tYXAoKHsgcnVsZSwgY2xhc3NOYW1lIH0pID0+ICh7XG4gICAgbWlzc2luZ0NsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgIHNlbGVjdG9yOiBydWxlLnNlbGVjdG9yc1swXSB8fCAnJyxcbiAgICBzb3VyY2U6IHJ1bGUucG9zaXRpb24uc291cmNlLFxuICAgIHN0YXJ0OiBydWxlLnBvc2l0aW9uLnN0YXJ0LFxuICAgIGVuZDogcnVsZS5wb3NpdGlvbi5lbmQsXG4gIH0pKTtcbn07XG5cbmNvbnN0IGdldEludmFsaWRSdWxlcyA9IChjc3M6IFN0eWxlc2hlZXQpOiBBcnJheTx7IGNsYXNzTmFtZTogQ2xhc3NOYW1lVHlwZTsgcnVsZTogUnVsZSB9PiA9PiB7XG4gIGxldCBpbnZhbGlkUnVsZXMgPSBbXTtcbiAgbGV0IGludmFsaWRDbGFzc05hbWVzID0gW107XG4gIGxldCBzZWxlY3RvcnMgPSBbXTtcblxuICBjc3Muc3R5bGVzaGVldC5ydWxlcy5mb3JFYWNoKChydWxlOiBSdWxlICYgTWVkaWEpID0+IHtcbiAgICBkZXRlY3RNaXNzaW5nQ2xhc3NlcyhydWxlLCBpbnZhbGlkUnVsZXMsIGludmFsaWRDbGFzc05hbWVzLCBzZWxlY3RvcnMpO1xuXG4gICAgaWYgKHJ1bGUudHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgcnVsZS5ydWxlcy5mb3JFYWNoKChydWxlOiBSdWxlKSA9PiB7XG4gICAgICAgIGRldGVjdE1pc3NpbmdDbGFzc2VzKHJ1bGUsIGludmFsaWRSdWxlcywgaW52YWxpZENsYXNzTmFtZXMsIHNlbGVjdG9ycyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBbLi4ubmV3IFNldChpbnZhbGlkUnVsZXMpXTtcbn07XG5cbmNvbnN0IGlzQ2xhc3NOYW1lRXhpc3RJbkNvbGxlY3Rpb24gPSAoXG4gIGludmFsaWRDbGFzc05hbWVzOiBDbGFzc05hbWVzVHlwZSxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcnNUeXBlLFxuICBjbGFzc05hbWU6IENsYXNzTmFtZVR5cGUsXG4pOiBib29sZWFuID0+ICFpbnZhbGlkQ2xhc3NOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUpICYmICFzZWxlY3RvcnMuaW5jbHVkZXMoY2xhc3NOYW1lKTtcblxuY29uc3QgZGV0ZWN0TWlzc2luZ0NsYXNzZXMgPSAoXG4gIHJ1bGU6IFJ1bGUsXG4gIGludmFsaWRSdWxlczogQXJyYXk8T2JqZWN0PixcbiAgaW52YWxpZENsYXNzTmFtZXM6IENsYXNzTmFtZXNUeXBlLFxuICBzZWxlY3RvcnM6IFNlbGVjdG9yc1R5cGUsXG4pID0+IHtcbiAgaWYgKHJ1bGUudHlwZSA9PT0gJ3J1bGUnKSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBydWxlLnNlbGVjdG9yc1swXTtcblxuICAgIHNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcblxuICAgIHJ1bGUuZGVjbGFyYXRpb25zLmZvckVhY2goKGRlY2xhcmF0aW9uOiBYc2hvdWxkRGVjbGFyYXRpb25JbnRlcmZhY2UpID0+IHtcbiAgICAgIGlmIChkZWNsYXJhdGlvbi5wcm9wZXJ0eSA9PT0gJ3gtc2hvdWxkJykge1xuICAgICAgICBjb25zdCBydWxlRGVjbGFyYXRpb246IFJlZ0V4cE1hdGNoQXJyYXkgPSBkZWNsYXJhdGlvbi52YWx1ZS5tYXRjaCgvKD89XFwuKSguKikoPz0nKS9nKTtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lc0RlY2w6IFJlZ0V4cE1hdGNoQXJyYXkgPSBydWxlRGVjbGFyYXRpb25bMF0ubWF0Y2goLyhcXC5cXFMrKS9nKTtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzRGVjbFswXTtcblxuICAgICAgICBpZiAoIWlzQ2xhc3NOYW1lRXhpc3RJbkNvbGxlY3Rpb24oaW52YWxpZENsYXNzTmFtZXMsIHNlbGVjdG9ycywgY2xhc3NOYW1lKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChCZW1QYXJzZXIuaXNCZW1Nb2RpZmllcihzZWxlY3RvcikgJiYgQmVtUGFyc2VyLmlzQmVtQmxvY2soY2xhc3NOYW1lKSkge1xuICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChjbGFzc05hbWUsICdnJyk7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHNlbGVjdG9yLm1hdGNoKHJlZ2V4KTtcblxuICAgICAgICAgIGlmIChtYXRjaGVkLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBpbnZhbGlkQ2xhc3NOYW1lcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBpbnZhbGlkUnVsZXMucHVzaCh7IGNsYXNzTmFtZSwgcnVsZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQmVtUGFyc2VyLmlzQmVtQmxvY2soc2VsZWN0b3IpICYmICFCZW1QYXJzZXIuaXNCZW1Nb2RpZmllcihjbGFzc05hbWUpICYmICFCZW1QYXJzZXIuaXNCZW1CbG9jayhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgaW52YWxpZENsYXNzTmFtZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgIGludmFsaWRSdWxlcy5wdXNoKHsgY2xhc3NOYW1lLCBydWxlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9