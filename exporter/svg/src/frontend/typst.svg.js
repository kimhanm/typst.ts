const ignoredEvent=function(){const t={};let n,e;return function(i,u,r){e=new Date().getTime(),r=r||"ignored event",n=t[r]?e-t[r]:e,n&gt;u&&(t[r]=e,i())}}(),fc=(t,n)=&gt;{const e=[];for(let i=0;i&lt;t.length;i++){const u=t[i];n(u)&&e.push(u)}return e},overLappingDom=(t,n)=&gt;!(t.right&lt;n.left||t.left&gt;n.right||t.bottom&lt;n.top||t.top&gt;n.bottom),almostOverLapping=(t,n)=&gt;{const e=t.getBoundingClientRect(),i=n.getBoundingClientRect();return overLappingDom(e,i)&&Math.abs(e.left-i.left)+Math.abs(e.right-i.right)&lt;.5*Math.max(e.width,i.width)&&Math.abs(e.bottom-i.bottom)+Math.abs(e.top-i.top)&lt;.5*Math.max(e.height,i.height)},gr=window.typstGetRelatedElements=t=&gt;{let n=t.relatedElements;return n==null&&(n=t.relatedElements=searchIntersections(t)),n},getRelatedElements=t=&gt;gr(t.target),findAncestor=(t,n)=&gt;{for(;t&&!t.classList.contains(n);)t=t.parentElement;return t};function findGlyphListForText(t){const n=findAncestor(t,"typst-text");return n&&fc(n.children,e=&gt;e.tagName==="use")}const searchIntersections=function(t){const n=findAncestor(t,"typst-group");return n&&fc(n.children,e=&gt;almostOverLapping(e,t))};function nextNode(t){if(t.hasChildNodes())return t.firstChild;for(;t&&!t.nextSibling;)t=t.parentNode;return t?t.nextSibling:null}function getRangeSelectedNodes(t,n){var e=t.startContainer,i=t.endContainer;if(e==i){if(n(e))return[e];if(n(e.parentElement))return[e.parentElement]}for(var u=[];e&&e!=i;)e=nextNode(e),n(e)&&u.push(e);for(e=t.startContainer;e&&e!=t.commonAncestorContainer;)n(e)&&u.unshift(e),e=e.parentNode;return u}function getSelectedNodes(t){if(window.getSelection){var n=window.getSelection();if(!n.isCollapsed){if(n.rangeCount===1)return getRangeSelectedNodes(n.getRangeAt(0),t);let e=[];for(let i=0,u=n.rangeCount;i&lt;u;i++)e.push(...getRangeSelectedNodes(n.getRangeAt(i),t));return e}}return[]}function getGlyphLenShape(t){return t.map(n=&gt;{const e=n.getAttribute("href"),i=document.getElementById(e.slice(1));return 1+Number.parseInt(i?.getAttribute("data-liga-len")||"0")})}function getGlyphAdvanceShape(t){return t.map(n=&gt;Number.parseInt(n.getAttribute("x")||"0"))}function adjsutTextSelection(t,n){t.addEventListener("copy",s=&gt;{const c=getSelectedNodes(d=&gt;d.classList?.contains("tsel")||d.classList?.contains("tsel-tok")||d.classList?.contains("typst-content-hint")),g=[];let o=!1;for(let d of c)if(d.classList.contains("tsel"))d.hasAttribute("data-typst-layout-checked")||g.push(d.textContent),o=!0;else if(d.classList.contains("tsel-tok"))g.push(d.textContent);else if(o){const v=String.fromCodePoint(Number.parseInt(d.getAttribute("data-hint")||"0",16))||`
`;g.push(v),o=!0}const m=g.join("").replace(/\u00a0/g," ");console.log("user copy",m),navigator?.clipboard?navigator.clipboard.writeText(m):s.clipboardData.setData("text/plain",m),s.preventDefault()});const e=s=&gt;s.nodeType===Node.TEXT_NODE?s.parentElement:s,i=s=&gt;{const c=e(s);return c?.classList?.contains("tsel")?c:void 0},u=s=&gt;`&lt;div style="position: absolute; float: left; left: ${s.left+window.scrollX}px; top: ${s.top+window.scrollY}px; width: ${s.width}px; height: ${s.height}px; background-color: #7db9dea0;"&gt;&lt;/div&gt;`,r=s=&gt;{s&&(s.innerHTML="")};let S=!1;window.addEventListener("mousedown",s=&gt;{s.button===0&&(S=!0)}),window.addEventListener("mouseup",s=&gt;{s.button===0&&(S=!1)}),t.addEventListener("mousemove",s=&gt;{S&&ignoredEvent(()=&gt;{p(s)},2,"doc-text-sel")});function p(s){s.target?.classList.contains("tsel-tok")||f(!0,s)}document.addEventListener("selectionchange",()=&gt;f(!1));function f(s,c){const g=window.getSelection();let o=document.getElementById("tsel-sel-box");if(!g?.rangeCount){r(o);return}const m=g.getRangeAt(0),d=g.getRangeAt(g.rangeCount-1);if(!m||!d)return;const v=l=&gt;l?.classList.contains("text-guard")||l?.classList.contains("typst-page")||l?.classList.contains("typst-search-hint"),C=v(e(m.startContainer)),y=v(e(d.endContainer));if(C||y){C&&y&&r(o);return}r(o),o||(o=document.createElement("div"),o.id="tsel-sel-box",o.style.zIndex="100",o.style.position="absolute",o.style.pointerEvents="none",o.style.left="0",o.style.top="0",o.style.float="left",document.body.appendChild(o));const N=i(m.startContainer),L=i(d.endContainer),k=getSelectedNodes(l=&gt;l.classList?.contains("tsel")||l.classList?.contains("typst-search-hint")||l.classList?.contains("tsel-tok")),A=new Range,E=[],T=(l,a,h)=&gt;{A.setStartBefore(l),A.setEndAfter(a),E.push(u(A.getBoundingClientRect()))},b=new Map;for(let l of k)if(l.classList.contains("tsel-tok")){const a=l.parentElement,h=Array.from(a.children).indexOf(l);if(!b.has(a))b.set(a,[h,h]);else{const[w,x]=b.get(a);b.set(a,[Math.min(w,h),Math.max(x,h)])}}else if(l.classList.contains("tsel")&&!l.hasAttribute("data-typst-layout-checked")){const a=l===N?m.startOffset:0,h=l===L?d.endOffset-1:-1;b.set(l,[a,h])}if(s){let l=1e11,a=-1;for(const h of b.keys()){const w=h.getAttribute("data-selection-index");if(!w)continue;const x=Number.parseInt(w);l=Math.min(l,x),a=Math.max(a,x)}if(a!==-1){const h=c.clientX,w=c.clientY,x=n.flow;for(;;){const R=x[a],M=R.getBoundingClientRect();if((h&gt;M.right||w&gt;M.bottom)&&(b.set(R,[0,-1]),a+1&lt;x.length)){a+=1;const O=x[a].getBoundingClientRect();if(M.bottom&gt;O.top&&M.top&lt;O.bottom)continue}break}}}for(let[l,[a,h]]of b){const w=findGlyphListForText(l);if(!w?.length)continue;if(a===0&&h===-1){T(w[0],w[w.length-1],h);continue}const x=getGlyphLenShape(w),R=O=&gt;{let j=0;for(let P=0;P&lt;x.length;P++){if(j+x[P]&gt;O)return w[P];j+=x[P]}};let M=w[0];a!==0&&(M=R(a)||M);let B=w[w.length-1];h!==-1&&(B=R(h)||B),T(M,B,h)}o.innerHTML=E.join("")}}function createPseudoText(t){const n=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");n.setAttribute("width","1"),n.setAttribute("height","1"),n.setAttribute("x","0"),n.setAttribute("y","0");const e=document.createElement("span");return e.textContent="&nbsp;",e.style.width=e.style.height="100%",e.style.textAlign="justify",e.style.opacity="0",e.classList.add(t),n.append(e),n}const linkmove=t=&gt;ignoredEvent(()=&gt;gr(t.target)?.forEach(n=&gt;n.classList.add("hover")),200,"mouse-move"),linkleave=t=&gt;gr(t.target)?.forEach(n=&gt;n.classList.remove("hover"));window.typstProcessSvg=function(t,n){let e={flow:[]};for(var i=t.getElementsByClassName("pseudo-link"),u=0;u&lt;i.length;u++){var r=i[u];r.addEventListener("mousemove",linkmove),r.addEventListener("mouseleave",linkleave)}const S=n?.layoutText??!0;if(S&&(setTimeout(()=&gt;{const p=document.createElement("style");p.innerHTML=`.tsel { font-family: monospace; text-align-last: left !important; -moz-text-size-adjust: none; -webkit-text-size-adjust: none; text-size-adjust: none; }
.tsel span { float: left !important; position: absolute !important; width: fit-content !important; top: 0 !important; }
.typst-search-hint { font-size: 2048px; color: transparent; width: 100%; height: 100%; }
.typst-search-hint { color: transparent; user-select: none; }
.typst-search-hint::-moz-selection { color: transparent; background: #00000001; }
.typst-search-hint::selection { color: transparent; background: #00000001; }
.tsel span::-moz-selection,
.tsel::-moz-selection {
  background: transparent !important;
}
.tsel span::selection,
.tsel::selection {
  background: transparent !important;
} `,document.getElementsByTagName("head")[0].appendChild(p);const f=window.devicePixelRatio||1;t.style.setProperty("--typst-font-scale",f.toString()),window.addEventListener("resize",()=&gt;{const s=window.devicePixelRatio||1;t.style.setProperty("--typst-font-scale",s.toString())}),window.layoutText(t,e)},0),adjsutTextSelection(t,e)),t.addEventListener("click",p=&gt;{let f=p.target;for(;f;){const s=f.getAttribute("data-span");if(s){console.log("source-span of this svg element",s);const c=document.body||document.firstElementChild,g=c.getBoundingClientRect(),o=window.innerWidth||0,m=p.clientX-g.left+.015*o,d=p.clientY-g.top+.015*o;triggerRipple(c,m,d,"typst-debug-react-ripple","typst-debug-react-ripple-effect .4s linear");return}f=f.parentElement}}),S&&t.querySelectorAll(".typst-page").forEach(p=&gt;{p.prepend(createPseudoText("text-guard"))}),window.location.hash){const f=window.location.hash.split("-");if(f.length===2&&f[0]==="#loc"){const s=f[1].split("x");if(s.length===3){const c=Number.parseInt(s[0]),g=Number.parseFloat(s[1]),o=Number.parseFloat(s[2]);window.handleTypstLocation(t,c,g,o)}}}},window.layoutText=function(t,n){const e=Array.from(t.querySelectorAll(".tsel"));n.flow=e;const i=performance.now(),u=document.createElementNS("http://www.w3.org/1999/xhtml","canvas").getContext("2d");u.font="128px sans-serif";const r=u.measureText("A").width,S=[],p=(s,c)=&gt;{const g=e.slice(s,c);s-=1;for(let o of g)if(s+=1,!o.getAttribute("data-typst-layout-checked")&&(o.setAttribute("data-selection-index",s.toString()),o.setAttribute("data-typst-layout-checked","1"),o.style.fontSize)){const m=o.parentElement,d=o.innerText,v=m.cloneNode(!0),C=v.firstElementChild;C&&(C.className="typst-search-hint"),m.parentElement.insertBefore(v,m),S.push([o,d]);const y=findGlyphListForText(o);if(!y)continue;const N=getGlyphLenShape(y),L=getGlyphAdvanceShape(y).map(b=&gt;b/16);let k=!1;const A=[];let E=0,T=0;for(let b of d){if(E&gt;=L.length){k=!0;break}let l=L[E];N[E]&gt;1&&(l+=T*r),T++,T&gt;=N[E]&&(E++,T=0);const a=document.createElement("span");a.textContent=b,a.classList.add("tsel-tok"),a.style.left=`${l}px`,A.push(a)}if(k)continue;o.innerHTML="",o.append(...A)}console.log(`layoutText ${e.length} elements used since ${performance.now()-i} ms`)},f=100;for(let s=0;s&lt;e.length;s+=f){const c=s;setTimeout(()=&gt;{p(c,c+f)})}},window.handleTypstLocation=function(t,n,e,i,u){const r=u?.behavior||"smooth",S=window.assignSemaHash||((c,g,o)=&gt;{location.hash=`loc-${c}x${g.toFixed(2)}x${o.toFixed(2)}`}),p=findAncestor(t,"typst-doc");if(!p){console.warn("no typst-doc found",t);return}const f=p.children;let s=0;for(let c=0;c&lt;f.length;c++)if(f[c].tagName==="g"&&s++,s==n){const g=window.innerWidth*.01,o=window.innerHeight*.01,m=f[c],d=Number.parseFloat(p.getAttribute("data-width")||p.getAttribute("width")||"0")||0,v=Number.parseFloat(p.getAttribute("data-height")||p.getAttribute("height")||"0")||0,C=p.getBoundingClientRect(),y={left:C.left,top:C.top,width:C.width,height:C.height},N=7*g,L=38.2*o,k=m.transform.baseVal.consolidate()?.matrix;k&&(y.left+=k.e/d*y.width,y.top+=k.f/v*y.height);const A=document.body||document.firstElementChild,E=A.getBoundingClientRect(),T=y.left-E.left+e/d*y.width-N,b=y.top-E.top+i/v*y.height-L,l=T+N,a=b+L;window.scrollTo({behavior:r,left:T,top:b}),r!=="instant"&&triggerRipple(A,l,a,"typst-jump-ripple","typst-jump-ripple-effect .4s linear"),S(s,e,i);return}};function triggerRipple(t,n,e,i,u){const r=document.createElement("div");r.className=i,r.style.left=`${n}px`,r.style.top=`${e}px`,t.appendChild(r),r.style.animation=u,r.onanimationend=()=&gt;{t.removeChild(r)}}var scriptTag=document.currentScript;if(scriptTag){console.log("new svg util updated 37  ",performance.now());const t=findAncestor(scriptTag,"typst-doc");t&&window.typstProcessSvg(t)}
