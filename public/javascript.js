(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.katex=e()}})(function(){var e,t,r;return function a(e,t,r){function i(s,l){if(!t[s]){if(!e[s]){var o=typeof require=="function"&&require;if(!l&&o)return o(s,!0);if(n)return n(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=t[s]={exports:{}};e[s][0].call(p.exports,function(t){var r=e[s][1][t];return i(r?r:t)},p,p.exports,a,e,t,r)}return t[s].exports}var n=typeof require=="function"&&require;for(var s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,r){var a=e("./src/ParseError");var i=e("./src/Settings");var n=e("./src/buildTree");var s=e("./src/parseTree");var l=e("./src/utils");var o=function(e,t,r){l.clearNode(t);var a=new i(r);var o=s(e,a);var u=n(o,e,a).toNode();t.appendChild(u)};if(typeof document!=="undefined"){if(document.compatMode!=="CSS1Compat"){typeof console!=="undefined"&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your "+"website has a suitable doctype.");o=function(){throw new a("KaTeX doesn't work in quirks mode.")}}}var u=function(e,t){var r=new i(t);var a=s(e,r);return n(a,e,r).toMarkup()};var p=function(e,t){var r=new i(t);return s(e,r)};t.exports={render:o,renderToString:u,__parse:p,ParseError:a}},{"./src/ParseError":5,"./src/Settings":7,"./src/buildTree":12,"./src/parseTree":21,"./src/utils":23}],2:[function(e,t,r){"use strict";function a(e){if(!e.__matchAtRelocatable){var t=e.source+"|()";var r="g"+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"");e.__matchAtRelocatable=new RegExp(t,r)}return e.__matchAtRelocatable}function i(e,t,r){if(e.global||e.sticky){throw new Error("matchAt(...): Only non-global regexes are supported")}var i=a(e);i.lastIndex=r;var n=i.exec(t);if(n[n.length-1]==null){n.length=n.length-1;return n}else{return null}}t.exports=i},{}],3:[function(e,t,r){var a=e("match-at");var i=e("./ParseError");function n(e){this._input=e}function s(e,t,r){this.text=e;this.data=t;this.position=r}var l=new RegExp("([ \r\n	]+)|("+"---?"+"|[!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff]"+"|[\ud800-\udbff][\udc00-\udfff]"+"|\\\\(?:[a-zA-Z]+|[^\ud800-\udfff])"+")");var o=/\s*/;n.prototype._innerLex=function(e,t){var r=this._input;if(e===r.length){return new s("EOF",null,e)}var n=a(l,r,e);if(n===null){throw new i("Unexpected character: '"+r[e]+"'",this,e)}else if(n[2]){return new s(n[2],null,e+n[2].length)}else if(t){return this._innerLex(e+n[1].length,true)}else{return new s(" ",null,e+n[1].length)}};var u=/#[a-z0-9]+|[a-z]+/i;n.prototype._innerLexColor=function(e){var t=this._input;var r=a(o,t,e)[0];e+=r.length;var n;if(n=a(u,t,e)){return new s(n[0],null,e+n[0].length)}else{throw new i("Invalid color",this,e)}};var p=/(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;n.prototype._innerLexSize=function(e){var t=this._input;var r=a(o,t,e)[0];e+=r.length;var n;if(n=a(p,t,e)){var l=n[3];if(l!=="em"&&l!=="ex"){throw new i("Invalid unit: '"+l+"'",this,e)}return new s(n[0],{number:+(n[1]+n[2]),unit:l},e+n[0].length)}throw new i("Invalid size",this,e)};n.prototype._innerLexWhitespace=function(e){var t=this._input;var r=a(o,t,e)[0];e+=r.length;return new s(r[0],null,e)};n.prototype.lex=function(e,t){if(t==="math"){return this._innerLex(e,true)}else if(t==="text"){return this._innerLex(e,false)}else if(t==="color"){return this._innerLexColor(e)}else if(t==="size"){return this._innerLexSize(e)}else if(t==="whitespace"){return this._innerLexWhitespace(e)}};t.exports=n},{"./ParseError":5,"match-at":2}],4:[function(e,t,r){function a(e){this.style=e.style;this.color=e.color;this.size=e.size;this.phantom=e.phantom;this.font=e.font;if(e.parentStyle===undefined){this.parentStyle=e.style}else{this.parentStyle=e.parentStyle}if(e.parentSize===undefined){this.parentSize=e.size}else{this.parentSize=e.parentSize}}a.prototype.extend=function(e){var t={style:this.style,size:this.size,color:this.color,parentStyle:this.style,parentSize:this.size,phantom:this.phantom,font:this.font};for(var r in e){if(e.hasOwnProperty(r)){t[r]=e[r]}}return new a(t)};a.prototype.withStyle=function(e){return this.extend({style:e})};a.prototype.withSize=function(e){return this.extend({size:e})};a.prototype.withColor=function(e){return this.extend({color:e})};a.prototype.withPhantom=function(){return this.extend({phantom:true})};a.prototype.withFont=function(e){return this.extend({font:e})};a.prototype.reset=function(){return this.extend({})};var i={"katex-blue":"#6495ed","katex-orange":"#ffa500","katex-pink":"#ff00af","katex-red":"#df0030","katex-green":"#28ae7b","katex-gray":"gray","katex-purple":"#9d38bd","katex-blueA":"#c7e9f1","katex-blueB":"#9cdceb","katex-blueC":"#58c4dd","katex-blueD":"#29abca","katex-blueE":"#1c758a","katex-tealA":"#acead7","katex-tealB":"#76ddc0","katex-tealC":"#5cd0b3","katex-tealD":"#55c1a7","katex-tealE":"#49a88f","katex-greenA":"#c9e2ae","katex-greenB":"#a6cf8c","katex-greenC":"#83c167","katex-greenD":"#77b05d","katex-greenE":"#699c52","katex-goldA":"#f7c797","katex-goldB":"#f9b775","katex-goldC":"#f0ac5f","katex-goldD":"#e1a158","katex-goldE":"#c78d46","katex-redA":"#f7a1a3","katex-redB":"#ff8080","katex-redC":"#fc6255","katex-redD":"#e65a4c","katex-redE":"#cf5044","katex-maroonA":"#ecabc1","katex-maroonB":"#ec92ab","katex-maroonC":"#c55f73","katex-maroonD":"#a24d61","katex-maroonE":"#94424f","katex-purpleA":"#caa3e8","katex-purpleB":"#b189c6","katex-purpleC":"#9a72ac","katex-purpleD":"#715582","katex-purpleE":"#644172","katex-mintA":"#f5f9e8","katex-mintB":"#edf2df","katex-mintC":"#e0e5cc","katex-grayA":"#fdfdfd","katex-grayB":"#f7f7f7","katex-grayC":"#eeeeee","katex-grayD":"#dddddd","katex-grayE":"#cccccc","katex-grayF":"#aaaaaa","katex-grayG":"#999999","katex-grayH":"#555555","katex-grayI":"#333333","katex-kaBlue":"#314453","katex-kaGreen":"#639b24"};a.prototype.getColor=function(){if(this.phantom){return"transparent"}else{return i[this.color]||this.color}};t.exports=a},{}],5:[function(e,t,r){function a(e,t,r){var i="KaTeX parse error: "+e;if(t!==undefined&&r!==undefined){i+=" at position "+r+": ";var n=t._input;n=n.slice(0,r)+"\u0332"+n.slice(r);var s=Math.max(0,r-15);var l=r+15;i+=n.slice(s,l)}var o=new Error(i);o.name="ParseError";o.__proto__=a.prototype;o.position=r;return o}a.prototype.__proto__=Error.prototype;t.exports=a},{}],6:[function(e,t,r){var a=e("./functions");var i=e("./environments");var n=e("./Lexer");var s=e("./symbols");var l=e("./utils");var o=e("./parseData");var u=e("./ParseError");function p(e,t){this.lexer=new n(e);this.settings=t}var h=o.ParseNode;function c(e,t){this.result=e;this.isFunction=t}p.prototype.expect=function(e,t){if(this.nextToken.text!==e){throw new u("Expected '"+e+"', got '"+this.nextToken.text+"'",this.lexer,this.nextToken.position)}if(t!==false){this.consume()}};p.prototype.consume=function(){this.pos=this.nextToken.position;this.nextToken=this.lexer.lex(this.pos,this.mode)};p.prototype.parse=function(){this.mode="math";this.pos=0;this.nextToken=this.lexer.lex(this.pos,this.mode);var e=this.parseInput();return e};p.prototype.parseInput=function(){var e=this.parseExpression(false);this.expect("EOF",false);return e};var v=["}","\\end","\\right","&","\\\\","\\cr"];p.prototype.parseExpression=function(e,t){var r=[];while(true){var a=this.nextToken;var i=this.pos;if(v.indexOf(a.text)!==-1){break}if(t&&a.text===t){break}var n=this.parseAtom();if(!n){if(!this.settings.throwOnError&&a.text[0]==="\\"){var s=this.handleUnsupportedCmd();r.push(s);i=a.position;continue}break}if(e&&n.type==="infix"){this.pos=i;this.nextToken=a;break}r.push(n)}return this.handleInfixNodes(r)};p.prototype.handleInfixNodes=function(e){var t=-1;var r;for(var a=0;a<e.length;a++){var i=e[a];if(i.type==="infix"){if(t!==-1){throw new u("only one infix operator per group",this.lexer,-1)}t=a;r=i.value.replaceWith}}if(t!==-1){var n;var s;var l=e.slice(0,t);var o=e.slice(t+1);if(l.length===1&&l[0].type==="ordgroup"){n=l[0]}else{n=new h("ordgroup",l,this.mode)}if(o.length===1&&o[0].type==="ordgroup"){s=o[0]}else{s=new h("ordgroup",o,this.mode)}var p=this.callFunction(r,[n,s],null);return[new h(p.type,p,this.mode)]}else{return e}};var m=1;p.prototype.handleSupSubscript=function(e){var t=this.nextToken.text;var r=this.pos;this.consume();var i=this.parseGroup();if(!i){if(!this.settings.throwOnError&&this.nextToken.text[0]==="\\"){return this.handleUnsupportedCmd()}else{throw new u("Expected group after '"+t+"'",this.lexer,r+1)}}else if(i.isFunction){var n=a[i.result].greediness;if(n>m){return this.parseFunction(i)}else{throw new u("Got function '"+i.result+"' with no arguments "+"as "+e,this.lexer,r+1)}}else{return i.result}};p.prototype.handleUnsupportedCmd=function(){var e=this.nextToken.text;var t=[];for(var r=0;r<e.length;r++){t.push(new h("textord",e[r],"text"))}var a=new h("text",{body:t,type:"text"},this.mode);var i=new h("color",{color:this.settings.errorColor,value:[a],type:"color"},this.mode);this.consume();return i};p.prototype.parseAtom=function(){var e=this.parseImplicitGroup();if(this.mode==="text"){return e}var t;var r;while(true){var a=this.nextToken;if(a.text==="\\limits"||a.text==="\\nolimits"){if(!e||e.type!=="op"){throw new u("Limit controls must follow a math operator",this.lexer,this.pos)}else{var i=a.text==="\\limits";e.value.limits=i;e.value.alwaysHandleSupSub=true}this.consume()}else if(a.text==="^"){if(t){throw new u("Double superscript",this.lexer,this.pos)}t=this.handleSupSubscript("superscript")}else if(a.text==="_"){if(r){throw new u("Double subscript",this.lexer,this.pos)}r=this.handleSupSubscript("subscript")}else if(a.text==="'"){var n=new h("textord","\\prime",this.mode);var s=[n];this.consume();while(this.nextToken.text==="'"){s.push(n);this.consume()}t=new h("ordgroup",s,this.mode)}else{break}}if(t||r){return new h("supsub",{base:e,sup:t,sub:r},this.mode)}else{return e}};var f=["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"];var d=["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"];p.prototype.parseImplicitGroup=function(){var e=this.parseSymbol();if(e==null){return this.parseFunction()}var t=e.result;var r;if(t==="\\left"){var a=this.parseFunction(e);r=this.parseExpression(false);this.expect("\\right",false);var n=this.parseFunction();return new h("leftright",{body:r,left:a.value.value,right:n.value.value},this.mode)}else if(t==="\\begin"){var s=this.parseFunction(e);var o=s.value.name;if(!i.hasOwnProperty(o)){throw new u("No such environment: "+o,this.lexer,s.value.namepos)}var p=i[o];var c=this.parseArguments("\\begin{"+o+"}",p);var v={mode:this.mode,envName:o,parser:this,lexer:this.lexer,positions:c.pop()};var m=p.handler(v,c);this.expect("\\end",false);var g=this.parseFunction();if(g.value.name!==o){throw new u("Mismatch: \\begin{"+o+"} matched "+"by \\end{"+g.value.name+"}",this.lexer)}m.position=g.position;return m}else if(l.contains(f,t)){r=this.parseExpression(false);return new h("sizing",{size:"size"+(l.indexOf(f,t)+1),value:r},this.mode)}else if(l.contains(d,t)){r=this.parseExpression(true);return new h("styling",{style:t.slice(1,t.length-5),value:r},this.mode)}else{return this.parseFunction(e)}};p.prototype.parseFunction=function(e){if(!e){e=this.parseGroup()}if(e){if(e.isFunction){var t=e.result;var r=a[t];if(this.mode==="text"&&!r.allowedInText){throw new u("Can't use function '"+t+"' in text mode",this.lexer,e.position)}var i=this.parseArguments(t,r);var n=this.callFunction(t,i,i.pop());return new h(n.type,n,this.mode)}else{return e.result}}else{return null}};p.prototype.callFunction=function(e,t,r){var i={funcName:e,parser:this,lexer:this.lexer,positions:r};return a[e].handler(i,t)};p.prototype.parseArguments=function(e,t){var r=t.numArgs+t.numOptionalArgs;if(r===0){return[[this.pos]]}var i=t.greediness;var n=[this.pos];var s=[];for(var l=0;l<r;l++){var o=t.argTypes&&t.argTypes[l];var p;if(l<t.numOptionalArgs){if(o){p=this.parseSpecialGroup(o,true)}else{p=this.parseOptionalGroup()}if(!p){s.push(null);n.push(this.pos);continue}}else{if(o){p=this.parseSpecialGroup(o)}else{p=this.parseGroup()}if(!p){if(!this.settings.throwOnError&&this.nextToken.text[0]==="\\"){p=new c(this.handleUnsupportedCmd(this.nextToken.text),false)}else{throw new u("Expected group after '"+e+"'",this.lexer,this.pos)}}}var h;if(p.isFunction){var v=a[p.result].greediness;if(v>i){h=this.parseFunction(p)}else{throw new u("Got function '"+p.result+"' as "+"argument to '"+e+"'",this.lexer,this.pos-1)}}else{h=p.result}s.push(h);n.push(this.pos)}s.push(n);return s};p.prototype.parseSpecialGroup=function(e,t){var r=this.mode;if(e==="original"){e=r}if(e==="color"||e==="size"){var a=this.nextToken;if(t&&a.text!=="["){return null}this.mode=e;this.expect(t?"[":"{");var i=this.nextToken;this.mode=r;var n;if(e==="color"){n=i.text}else{n=i.data}this.consume();this.expect(t?"]":"}");return new c(new h(e,n,r),false)}else if(e==="text"){var s=this.lexer.lex(this.pos,"whitespace");this.pos=s.position}this.mode=e;this.nextToken=this.lexer.lex(this.pos,e);var l;if(t){l=this.parseOptionalGroup()}else{l=this.parseGroup()}this.mode=r;this.nextToken=this.lexer.lex(this.pos,r);return l};p.prototype.parseGroup=function(){if(this.nextToken.text==="{"){this.consume();var e=this.parseExpression(false);this.expect("}");return new c(new h("ordgroup",e,this.mode),false)}else{return this.parseSymbol()}};p.prototype.parseOptionalGroup=function(){if(this.nextToken.text==="["){this.consume();var e=this.parseExpression(false,"]");this.expect("]");return new c(new h("ordgroup",e,this.mode),false)}else{return null}};p.prototype.parseSymbol=function(){var e=this.nextToken;if(a[e.text]){this.consume();return new c(e.text,true)}else if(s[this.mode][e.text]){this.consume();return new c(new h(s[this.mode][e.text].group,e.text,this.mode),false)}else{return null}};p.prototype.ParseNode=h;t.exports=p},{"./Lexer":3,"./ParseError":5,"./environments":15,"./functions":18,"./parseData":20,"./symbols":22,"./utils":23}],7:[function(e,t,r){function a(e,t){return e===undefined?t:e}function i(e){e=e||{};this.displayMode=a(e.displayMode,false);this.throwOnError=a(e.throwOnError,true);this.errorColor=a(e.errorColor,"#cc0000")}t.exports=i},{}],8:[function(e,t,r){function a(e,t,r,a){this.id=e;this.size=t;this.cramped=a;this.sizeMultiplier=r}a.prototype.sup=function(){return m[f[this.id]]};a.prototype.sub=function(){return m[d[this.id]]};a.prototype.fracNum=function(){return m[g[this.id]]};a.prototype.fracDen=function(){return m[y[this.id]]};a.prototype.cramp=function(){return m[b[this.id]]};a.prototype.cls=function(){return c[this.size]+(this.cramped?" cramped":" uncramped")};a.prototype.reset=function(){return v[this.size]};var i=0;var n=1;var s=2;var l=3;var o=4;var u=5;var p=6;var h=7;var c=["displaystyle textstyle","textstyle","scriptstyle","scriptscriptstyle"];var v=["reset-textstyle","reset-textstyle","reset-scriptstyle","reset-scriptscriptstyle"];var m=[new a(i,0,1,false),new a(n,0,1,true),new a(s,1,1,false),new a(l,1,1,true),new a(o,2,.7,false),new a(u,2,.7,true),new a(p,3,.5,false),new a(h,3,.5,true)];var f=[o,u,o,u,p,h,p,h];var d=[u,u,u,u,h,h,h,h];var g=[s,l,o,u,p,h,p,h];var y=[l,l,u,u,h,h,h,h];var b=[n,n,l,l,u,u,h,h];t.exports={DISPLAY:m[i],TEXT:m[s],SCRIPT:m[o],SCRIPTSCRIPT:m[p]}},{}],9:[function(e,t,r){var a=e("./domTree");var i=e("./fontMetrics");var n=e("./symbols");var s=e("./utils");var l=["\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega"];var o=["\u0131","\u0237"];var u=function(e,t,r,s,l){if(n[r][e]&&n[r][e].replace){e=n[r][e].replace}var o=i.getCharacterMetrics(e,t);var u;if(o){u=new a.symbolNode(e,o.height,o.depth,o.italic,o.skew,l)}else{typeof console!=="undefined"&&console.warn("No character metrics for '"+e+"' in style '"+t+"'");u=new a.symbolNode(e,0,0,0,0,l)}if(s){u.style.color=s}return u};var p=function(e,t,r,a){if(e==="\\"||n[t][e].font==="main"){return u(e,"Main-Regular",t,r,a)}else{return u(e,"AMS-Regular",t,r,a.concat(["amsrm"]))}};var h=function(e,t,r,a,i){if(i==="mathord"){return c(e,t,r,a)}else if(i==="textord"){return u(e,"Main-Regular",t,r,a.concat(["mathrm"]))}else{throw new Error("unexpected type: "+i+" in mathDefault")}};var c=function(e,t,r,a){if(/[0-9]/.test(e.charAt(0))||s.contains(o,e)||s.contains(l,e)){return u(e,"Main-Italic",t,r,a.concat(["mainit"]))}else{return u(e,"Math-Italic",t,r,a.concat(["mathit"]))}};var v=function(e,t,r){var a=e.mode;var l=e.value;if(n[a][l]&&n[a][l].replace){l=n[a][l].replace}var p=["mord"];var v=t.getColor();var m=t.font;if(m){if(m==="mathit"||s.contains(o,l)){return c(l,a,v,p)}else{var f=w[m].fontName;if(i.getCharacterMetrics(l,f)){return u(l,f,a,v,p.concat([m]))}else{return h(l,a,v,p,r)}}}else{return h(l,a,v,p,r)}};var m=function(e){var t=0;var r=0;var a=0;if(e.children){for(var i=0;i<e.children.length;i++){if(e.children[i].height>t){t=e.children[i].height}if(e.children[i].depth>r){r=e.children[i].depth}if(e.children[i].maxFontSize>a){a=e.children[i].maxFontSize}}}e.height=t;e.depth=r;e.maxFontSize=a};var f=function(e,t,r){var i=new a.span(e,t);m(i);if(r){i.style.color=r}return i};var d=function(e){var t=new a.documentFragment(e);m(t);return t};var g=function(e,t){var r=f([],[new a.symbolNode("\u200b")]);r.style.fontSize=t/e.style.sizeMultiplier+"em";var i=f(["fontsize-ensurer","reset-"+e.size,"size5"],[r]);return i};var y=function(e,t,r,i){var n;var s;var l;if(t==="individualShift"){var o=e;e=[o[0]];n=-o[0].shift-o[0].elem.depth;s=n;for(l=1;l<o.length;l++){var u=-o[l].shift-s-o[l].elem.depth;var p=u-(o[l-1].elem.height+o[l-1].elem.depth);s=s+u;e.push({type:"kern",size:p});e.push(o[l])}}else if(t==="top"){var h=r;for(l=0;l<e.length;l++){if(e[l].type==="kern"){h-=e[l].size}else{h-=e[l].elem.height+e[l].elem.depth}}n=h}else if(t==="bottom"){n=-r}else if(t==="shift"){n=-e[0].elem.depth-r}else if(t==="firstBaseline"){n=-e[0].elem.depth}else{n=0}var c=0;for(l=0;l<e.length;l++){if(e[l].type==="elem"){c=Math.max(c,e[l].elem.maxFontSize)}}var v=g(i,c);var m=[];s=n;for(l=0;l<e.length;l++){if(e[l].type==="kern"){s+=e[l].size}else{var d=e[l].elem;var y=-d.depth-s;s+=d.height+d.depth;var b=f([],[v,d]);b.height-=y;b.depth+=y;b.style.top=y+"em";m.push(b)}}var x=f(["baseline-fix"],[v,new a.symbolNode("\u200b")]);m.push(x);var w=f(["vlist"],m);w.height=Math.max(s,w.height);w.depth=Math.max(-n,w.depth);return w};var b={size1:.5,size2:.7,size3:.8,size4:.9,size5:1,size6:1.2,size7:1.44,size8:1.73,size9:2.07,size10:2.49};var x={"\\qquad":{size:"2em",className:"qquad"},"\\quad":{size:"1em",className:"quad"},"\\enspace":{size:"0.5em",className:"enspace"},"\\;":{size:"0.277778em",className:"thickspace"},"\\:":{size:"0.22222em",className:"mediumspace"},"\\,":{size:"0.16667em",className:"thinspace"},"\\!":{size:"-0.16667em",className:"negativethinspace"}};var w={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}};t.exports={fontMap:w,makeSymbol:u,mathsym:p,makeSpan:f,makeFragment:d,makeVList:y,makeOrd:v,sizingMultiplier:b,spacingFunctions:x}},{"./domTree":14,"./fontMetrics":16,"./symbols":22,"./utils":23}],10:[function(e,t,r){var a=e("./ParseError");var i=e("./Style");var n=e("./buildCommon");var s=e("./delimiter");var l=e("./domTree");var o=e("./fontMetrics");var u=e("./utils");var p=n.makeSpan;var h=function(e,t,r){var a=[];for(var i=0;i<e.length;i++){var n=e[i];a.push(b(n,t,r));r=n}return a};var c={mathord:"mord",textord:"mord",bin:"mbin",rel:"mrel",text:"mord",open:"mopen",close:"mclose",inner:"minner",genfrac:"mord",array:"mord",spacing:"mord",punct:"mpunct",ordgroup:"mord",op:"mop",katex:"mord",overline:"mord",underline:"mord",rule:"mord",leftright:"minner",sqrt:"mord",accent:"mord"};var v=function(e){if(e==null){return c.mathord}else if(e.type==="supsub"){return v(e.value.base)}else if(e.type==="llap"||e.type==="rlap"){return v(e.value)}else if(e.type==="color"){return v(e.value.value)}else if(e.type==="sizing"){return v(e.value.value)}else if(e.type==="styling"){return v(e.value.value)}else if(e.type==="delimsizing"){return c[e.value.delimType]}else{return c[e.type]}};var m=function(e,t){if(!e){return false}else if(e.type==="op"){return e.value.limits&&(t.style.size===i.DISPLAY.size||e.value.alwaysHandleSupSub)}else if(e.type==="accent"){return d(e.value.base)}else{return null}};var f=function(e){if(!e){return false}else if(e.type==="ordgroup"){if(e.value.length===1){return f(e.value[0])}else{return e}}else if(e.type==="color"){if(e.value.value.length===1){return f(e.value.value[0])}else{return e}}else{return e}};var d=function(e){var t=f(e);return t.type==="mathord"||t.type==="textord"||t.type==="bin"||t.type==="rel"||t.type==="inner"||t.type==="open"||t.type==="close"||t.type==="punct"};var g=function(e){return p(["sizing","reset-"+e.size,"size5",e.style.reset(),i.TEXT.cls(),"nulldelimiter"])};var y={};y.mathord=function(e,t,r){return n.makeOrd(e,t,"mathord")};y.textord=function(e,t,r){return n.makeOrd(e,t,"textord")};y.bin=function(e,t,r){var a="mbin";var i=r;while(i&&i.type==="color"){var s=i.value.value;i=s[s.length-1]}if(!r||u.contains(["mbin","mopen","mrel","mop","mpunct"],v(i))){e.type="textord";a="mord"}return n.mathsym(e.value,e.mode,t.getColor(),[a])};y.rel=function(e,t,r){return n.mathsym(e.value,e.mode,t.getColor(),["mrel"])};y.open=function(e,t,r){return n.mathsym(e.value,e.mode,t.getColor(),["mopen"])};y.close=function(e,t,r){return n.mathsym(e.value,e.mode,t.getColor(),["mclose"])};y.inner=function(e,t,r){return n.mathsym(e.value,e.mode,t.getColor(),["minner"])};y.punct=function(e,t,r){return n.mathsym(e.value,e.mode,t.getColor(),["mpunct"])};y.ordgroup=function(e,t,r){return p(["mord",t.style.cls()],h(e.value,t.reset()))};y.text=function(e,t,r){return p(["text","mord",t.style.cls()],h(e.value.body,t.reset()))};y.color=function(e,t,r){var a=h(e.value.value,t.withColor(e.value.color),r);return new n.makeFragment(a)};y.supsub=function(e,t,r){if(m(e.value.base,t)){return y[e.value.base.type](e,t,r)}var a=b(e.value.base,t.reset());var s;var u;var h;var c;if(e.value.sup){h=b(e.value.sup,t.withStyle(t.style.sup()));s=p([t.style.reset(),t.style.sup().cls()],[h])}if(e.value.sub){c=b(e.value.sub,t.withStyle(t.style.sub()));u=p([t.style.reset(),t.style.sub().cls()],[c])}var f;var g;if(d(e.value.base)){f=0;g=0}else{f=a.height-o.metrics.supDrop;g=a.depth+o.metrics.subDrop}var x;if(t.style===i.DISPLAY){x=o.metrics.sup1}else if(t.style.cramped){x=o.metrics.sup3}else{x=o.metrics.sup2}var w=i.TEXT.sizeMultiplier*t.style.sizeMultiplier;var k=.5/o.metrics.ptPerEm/w+"em";var z;if(!e.value.sup){g=Math.max(g,o.metrics.sub1,c.height-.8*o.metrics.xHeight);z=n.makeVList([{type:"elem",elem:u}],"shift",g,t);z.children[0].style.marginRight=k;if(a instanceof l.symbolNode){z.children[0].style.marginLeft=-a.italic+"em"}}else if(!e.value.sub){f=Math.max(f,x,h.depth+.25*o.metrics.xHeight);z=n.makeVList([{type:"elem",elem:s}],"shift",-f,t);z.children[0].style.marginRight=k}else{f=Math.max(f,x,h.depth+.25*o.metrics.xHeight);g=Math.max(g,o.metrics.sub2);var S=o.metrics.defaultRuleThickness;if(f-h.depth-(c.height-g)<4*S){g=4*S-(f-h.depth)+c.height;var M=.8*o.metrics.xHeight-(f-h.depth);if(M>0){f+=M;g-=M}}z=n.makeVList([{type:"elem",elem:u,shift:g},{type:"elem",elem:s,shift:-f}],"individualShift",null,t);if(a instanceof l.symbolNode){z.children[0].style.marginLeft=-a.italic+"em"}z.children[0].style.marginRight=k;z.children[1].style.marginRight=k}return p([v(e.value.base)],[a,z])};y.genfrac=function(e,t,r){var a=t.style;if(e.value.size==="display"){a=i.DISPLAY}else if(e.value.size==="text"){a=i.TEXT}var l=a.fracNum();var u=a.fracDen();var h=b(e.value.numer,t.withStyle(l));var c=p([a.reset(),l.cls()],[h]);var v=b(e.value.denom,t.withStyle(u));var m=p([a.reset(),u.cls()],[v]);var f;if(e.value.hasBarLine){f=o.metrics.defaultRuleThickness/t.style.sizeMultiplier}else{f=0}var d;var y;var x;if(a.size===i.DISPLAY.size){d=o.metrics.num1;if(f>0){y=3*f}else{y=7*o.metrics.defaultRuleThickness}x=o.metrics.denom1}else{if(f>0){d=o.metrics.num2;y=f}else{d=o.metrics.num3;y=3*o.metrics.defaultRuleThickness}x=o.metrics.denom2}var w;if(f===0){var k=d-h.depth-(v.height-x);if(k<y){d+=.5*(y-k);x+=.5*(y-k)}w=n.makeVList([{type:"elem",elem:m,shift:x},{type:"elem",elem:c,shift:-d}],"individualShift",null,t)}else{var z=o.metrics.axisHeight;if(d-h.depth-(z+.5*f)<y){d+=y-(d-h.depth-(z+.5*f))}if(z-.5*f-(v.height-x)<y){x+=y-(z-.5*f-(v.height-x))}var S=p([t.style.reset(),i.TEXT.cls(),"frac-line"]);S.height=f;var M=-(z-.5*f);w=n.makeVList([{type:"elem",elem:m,shift:x},{type:"elem",elem:S,shift:M},{type:"elem",elem:c,shift:-d}],"individualShift",null,t)}w.height*=a.sizeMultiplier/t.style.sizeMultiplier;w.depth*=a.sizeMultiplier/t.style.sizeMultiplier;var T;if(a.size===i.DISPLAY.size){T=o.metrics.delim1}else{T=o.metrics.getDelim2(a)}var N;var q;if(e.value.leftDelim==null){N=g(t)}else{N=s.customSizedDelim(e.value.leftDelim,T,true,t.withStyle(a),e.mode)}if(e.value.rightDelim==null){q=g(t)}else{q=s.customSizedDelim(e.value.rightDelim,T,true,t.withStyle(a),e.mode)}return p(["mord",t.style.reset(),a.cls()],[N,p(["mfrac"],[w]),q],t.getColor())};y.array=function(e,t,r){var i;var s;var l=e.value.body.length;var h=0;var c=new Array(l);var v=1/o.metrics.ptPerEm;var m=5*v;var f=12*v;var d=u.deflt(e.value.arraystretch,1);var g=d*f;var y=.7*g;var x=.3*g;var w=0;for(i=0;i<e.value.body.length;++i){var k=e.value.body[i];var z=y;var S=x;if(h<k.length){h=k.length}var M=new Array(k.length);for(s=0;s<k.length;++s){var T=b(k[s],t);if(S<T.depth){S=T.depth}if(z<T.height){z=T.height}M[s]=T}var N=0;if(e.value.rowGaps[i]){N=e.value.rowGaps[i].value;switch(N.unit){case"em":N=N.number;break;case"ex":N=N.number*o.metrics.emPerEx;break;default:console.error("Can't handle unit "+N.unit);N=0}if(N>0){N+=x;if(S<N){S=N}N=0}}M.height=z;M.depth=S;w+=z;M.pos=w;w+=S+N;c[i]=M}var q=w/2+o.metrics.axisHeight;var A=e.value.cols||[];var C=[];var R;var E;for(s=0,E=0;s<h||E<A.length;++s,++E){var P=A[E]||{};var D=true;while(P.type==="separator"){if(!D){R=p(["arraycolsep"],[]);R.style.width=o.metrics.doubleRuleSep+"em";C.push(R)}if(P.separator==="|"){var L=p(["vertical-separator"],[]);L.style.height=w+"em";L.style.verticalAlign=-(w-q)+"em";C.push(L)}else{throw new a("Invalid separator type: "+P.separator)}E++;P=A[E]||{};D=false}if(s>=h){continue}var O;if(s>0||e.value.hskipBeforeAndAfter){O=u.deflt(P.pregap,m);if(O!==0){R=p(["arraycolsep"],[]);R.style.width=O+"em";C.push(R)}}var I=[];for(i=0;i<l;++i){var B=c[i];var F=B[s];if(!F){continue}var _=B.pos-q;F.depth=B.depth;F.height=B.height;I.push({type:"elem",elem:F,shift:_})}I=n.makeVList(I,"individualShift",null,t);I=p(["col-align-"+(P.align||"c")],[I]);C.push(I);if(s<h-1||e.value.hskipBeforeAndAfter){O=u.deflt(P.postgap,m);if(O!==0){R=p(["arraycolsep"],[]);R.style.width=O+"em";C.push(R)}}}c=p(["mtable"],C);return p(["mord"],[c],t.getColor())};y.spacing=function(e,t,r){if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){return p(["mord","mspace"],[n.mathsym(e.value,e.mode)])}else{return p(["mord","mspace",n.spacingFunctions[e.value].className])}};y.llap=function(e,t,r){var a=p(["inner"],[b(e.value.body,t.reset())]);var i=p(["fix"],[]);return p(["llap",t.style.cls()],[a,i])};y.rlap=function(e,t,r){var a=p(["inner"],[b(e.value.body,t.reset())]);var i=p(["fix"],[]);return p(["rlap",t.style.cls()],[a,i])};y.op=function(e,t,r){var a;var s;var l=false;if(e.type==="supsub"){a=e.value.sup;s=e.value.sub;e=e.value.base;l=true}var h=["\\smallint"];var c=false;if(t.style.size===i.DISPLAY.size&&e.value.symbol&&!u.contains(h,e.value.body)){c=true}var v;var m=0;var f=0;if(e.value.symbol){var d=c?"Size2-Regular":"Size1-Regular";v=n.makeSymbol(e.value.body,d,"math",t.getColor(),["op-symbol",c?"large-op":"small-op","mop"]);m=(v.height-v.depth)/2-o.metrics.axisHeight*t.style.sizeMultiplier;f=v.italic}else{var g=[];for(var y=1;y<e.value.body.length;y++){g.push(n.mathsym(e.value.body[y],e.mode))}v=p(["mop"],g,t.getColor())}if(l){v=p([],[v]);var x;var w;var k;var z;if(a){var S=b(a,t.withStyle(t.style.sup()));x=p([t.style.reset(),t.style.sup().cls()],[S]);w=Math.max(o.metrics.bigOpSpacing1,o.metrics.bigOpSpacing3-S.depth)}if(s){var M=b(s,t.withStyle(t.style.sub()));k=p([t.style.reset(),t.style.sub().cls()],[M]);z=Math.max(o.metrics.bigOpSpacing2,o.metrics.bigOpSpacing4-M.height)}var T;var N;var q;if(!a){N=v.height-m;T=n.makeVList([{type:"kern",size:o.metrics.bigOpSpacing5},{type:"elem",elem:k},{type:"kern",size:z},{type:"elem",elem:v}],"top",N,t);T.children[0].style.marginLeft=-f+"em"}else if(!s){q=v.depth+m;T=n.makeVList([{type:"elem",elem:v},{type:"kern",size:w},{type:"elem",elem:x},{type:"kern",size:o.metrics.bigOpSpacing5}],"bottom",q,t);T.children[1].style.marginLeft=f+"em"}else if(!a&&!s){return v}else{q=o.metrics.bigOpSpacing5+k.height+k.depth+z+v.depth+m;T=n.makeVList([{type:"kern",size:o.metrics.bigOpSpacing5},{type:"elem",elem:k},{type:"kern",size:z},{type:"elem",elem:v},{type:"kern",size:w},{type:"elem",elem:x},{type:"kern",size:o.metrics.bigOpSpacing5}],"bottom",q,t);T.children[0].style.marginLeft=-f+"em";T.children[2].style.marginLeft=f+"em"}return p(["mop","op-limits"],[T])}else{if(e.value.symbol){v.style.top=m+"em"}return v}};y.katex=function(e,t,r){var a=p(["k"],[n.mathsym("K",e.mode)]);var i=p(["a"],[n.mathsym("A",e.mode)]);i.height=(i.height+.2)*.75;i.depth=(i.height-.2)*.75;var s=p(["t"],[n.mathsym("T",e.mode)]);var l=p(["e"],[n.mathsym("E",e.mode)]);l.height=l.height-.2155;l.depth=l.depth+.2155;var o=p(["x"],[n.mathsym("X",e.mode)]);return p(["katex-logo","mord"],[a,i,s,l,o],t.getColor())};y.overline=function(e,t,r){var a=b(e.value.body,t.withStyle(t.style.cramp()));var s=o.metrics.defaultRuleThickness/t.style.sizeMultiplier;var l=p([t.style.reset(),i.TEXT.cls(),"overline-line"]);l.height=s;l.maxFontSize=1;var u=n.makeVList([{type:"elem",elem:a},{type:"kern",size:3*s},{type:"elem",elem:l},{type:"kern",size:s}],"firstBaseline",null,t);return p(["overline","mord"],[u],t.getColor())};y.underline=function(e,t,r){var a=b(e.value.body,t);var s=o.metrics.defaultRuleThickness/t.style.sizeMultiplier;var l=p([t.style.reset(),i.TEXT.cls(),"underline-line"]);l.height=s;l.maxFontSize=1;var u=n.makeVList([{type:"kern",size:s},{type:"elem",elem:l},{type:"kern",size:3*s},{type:"elem",elem:a}],"top",a.height,t);return p(["underline","mord"],[u],t.getColor())};y.sqrt=function(e,t,r){var a=b(e.value.body,t.withStyle(t.style.cramp()));var l=o.metrics.defaultRuleThickness/t.style.sizeMultiplier;var u=p([t.style.reset(),i.TEXT.cls(),"sqrt-line"],[],t.getColor());u.height=l;u.maxFontSize=1;var h=l;if(t.style.id<i.TEXT.id){h=o.metrics.xHeight}var c=l+h/4;var v=(a.height+a.depth)*t.style.sizeMultiplier;var m=v+c+l;var f=p(["sqrt-sign"],[s.customSizedDelim("\\surd",m,false,t,e.mode)],t.getColor());var d=f.height+f.depth-l;if(d>a.height+a.depth+c){c=(c+d-a.height-a.depth)/2}var g=-(a.height+c+l)+f.height;f.style.top=g+"em";f.height-=g;f.depth+=g;var y;if(a.height===0&&a.depth===0){y=p()}else{y=n.makeVList([{type:"elem",elem:a},{type:"kern",size:c},{type:"elem",elem:u},{type:"kern",size:l}],"firstBaseline",null,t)}if(!e.value.index){return p(["sqrt","mord"],[f,y])}else{var x=b(e.value.index,t.withStyle(i.SCRIPTSCRIPT));var w=p([t.style.reset(),i.SCRIPTSCRIPT.cls()],[x]);var k=Math.max(f.height,y.height);var z=Math.max(f.depth,y.depth);var S=.6*(k-z);var M=n.makeVList([{type:"elem",elem:w}],"shift",-S,t);var T=p(["root"],[M]);return p(["sqrt","mord"],[T,f,y]);

}};y.sizing=function(e,t,r){var a=h(e.value.value,t.withSize(e.value.size),r);var i=p(["mord"],[p(["sizing","reset-"+t.size,e.value.size,t.style.cls()],a)]);var s=n.sizingMultiplier[e.value.size];i.maxFontSize=s*t.style.sizeMultiplier;return i};y.styling=function(e,t,r){var a={display:i.DISPLAY,text:i.TEXT,script:i.SCRIPT,scriptscript:i.SCRIPTSCRIPT};var n=a[e.value.style];var s=h(e.value.value,t.withStyle(n),r);return p([t.style.reset(),n.cls()],s)};y.font=function(e,t,r){var a=e.value.font;return b(e.value.body,t.withFont(a),r)};y.delimsizing=function(e,t,r){var a=e.value.value;if(a==="."){return p([c[e.value.delimType]])}return p([c[e.value.delimType]],[s.sizedDelim(a,e.value.size,t,e.mode)])};y.leftright=function(e,t,r){var a=h(e.value.body,t.reset());var i=0;var n=0;for(var l=0;l<a.length;l++){i=Math.max(a[l].height,i);n=Math.max(a[l].depth,n)}i*=t.style.sizeMultiplier;n*=t.style.sizeMultiplier;var o;if(e.value.left==="."){o=g(t)}else{o=s.leftRightDelim(e.value.left,i,n,t,e.mode)}a.unshift(o);var u;if(e.value.right==="."){u=g(t)}else{u=s.leftRightDelim(e.value.right,i,n,t,e.mode)}a.push(u);return p(["minner",t.style.cls()],a,t.getColor())};y.rule=function(e,t,r){var a=p(["mord","rule"],[],t.getColor());var i=0;if(e.value.shift){i=e.value.shift.number;if(e.value.shift.unit==="ex"){i*=o.metrics.xHeight}}var n=e.value.width.number;if(e.value.width.unit==="ex"){n*=o.metrics.xHeight}var s=e.value.height.number;if(e.value.height.unit==="ex"){s*=o.metrics.xHeight}i/=t.style.sizeMultiplier;n/=t.style.sizeMultiplier;s/=t.style.sizeMultiplier;a.style.borderRightWidth=n+"em";a.style.borderTopWidth=s+"em";a.style.bottom=i+"em";a.width=n;a.height=s+i;a.depth=-i;return a};y.accent=function(e,t,r){var a=e.value.base;var i;if(e.type==="supsub"){var s=e;e=s.value.base;a=e.value.base;s.value.base=a;i=b(s,t.reset(),r)}var l=b(a,t.withStyle(t.style.cramp()));var u;if(d(a)){var h=f(a);var c=b(h,t.withStyle(t.style.cramp()));u=c.skew}else{u=0}var v=Math.min(l.height,o.metrics.xHeight);var m=n.makeSymbol(e.value.accent,"Main-Regular","math",t.getColor());m.italic=0;var g=e.value.accent==="\\vec"?"accent-vec":null;var y=p(["accent-body",g],[p([],[m])]);y=n.makeVList([{type:"elem",elem:l},{type:"kern",size:-v},{type:"elem",elem:y}],"firstBaseline",null,t);y.children[1].style.marginLeft=2*u+"em";var x=p(["mord","accent"],[y]);if(i){i.children[0]=x;i.height=Math.max(x.height,i.height);i.classes[0]="mord";return i}else{return x}};y.phantom=function(e,t,r){var a=h(e.value.value,t.withPhantom(),r);return new n.makeFragment(a)};var b=function(e,t,r){if(!e){return p()}if(y[e.type]){var i=y[e.type](e,t,r);var s;if(t.style!==t.parentStyle){s=t.style.sizeMultiplier/t.parentStyle.sizeMultiplier;i.height*=s;i.depth*=s}if(t.size!==t.parentSize){s=n.sizingMultiplier[t.size]/n.sizingMultiplier[t.parentSize];i.height*=s;i.depth*=s}return i}else{throw new a("Got group of unknown type: '"+e.type+"'")}};var x=function(e,t){e=JSON.parse(JSON.stringify(e));var r=h(e,t);var a=p(["base",t.style.cls()],r);var i=p(["strut"]);var n=p(["strut","bottom"]);i.style.height=a.height+"em";n.style.height=a.height+a.depth+"em";n.style.verticalAlign=-a.depth+"em";var s=p(["katex-html"],[i,n,a]);s.setAttribute("aria-hidden","true");return s};t.exports=x},{"./ParseError":5,"./Style":8,"./buildCommon":9,"./delimiter":13,"./domTree":14,"./fontMetrics":16,"./utils":23}],11:[function(e,t,r){var a=e("./buildCommon");var i=e("./fontMetrics");var n=e("./mathMLTree");var s=e("./ParseError");var l=e("./symbols");var o=e("./utils");var u=a.makeSpan;var p=a.fontMap;var h=function(e,t){if(l[t][e]&&l[t][e].replace){e=l[t][e].replace}return new n.TextNode(e)};var c=function(e,t){var r=t.font;if(!r){return null}var a=e.mode;if(r==="mathit"){return"italic"}var n=e.value;if(o.contains(["\\imath","\\jmath"],n)){return null}if(l[a][n]&&l[a][n].replace){n=l[a][n].replace}var s=p[r].fontName;if(i.getCharacterMetrics(n,s)){return p[t.font].variant}return null};var v={};v.mathord=function(e,t){var r=new n.MathNode("mi",[h(e.value,e.mode)]);var a=c(e,t);if(a){r.setAttribute("mathvariant",a)}return r};v.textord=function(e,t){var r=h(e.value,e.mode);var a=c(e,t)||"normal";var i;if(/[0-9]/.test(e.value)){i=new n.MathNode("mn",[r]);if(t.font){i.setAttribute("mathvariant",a)}}else{i=new n.MathNode("mi",[r]);i.setAttribute("mathvariant",a)}return i};v.bin=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);return t};v.rel=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);return t};v.open=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);return t};v.close=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);return t};v.inner=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);return t};v.punct=function(e){var t=new n.MathNode("mo",[h(e.value,e.mode)]);t.setAttribute("separator","true");return t};v.ordgroup=function(e,t){var r=m(e.value,t);var a=new n.MathNode("mrow",r);return a};v.text=function(e,t){var r=m(e.value.body,t);var a=new n.MathNode("mtext",r);return a};v.color=function(e,t){var r=m(e.value.value,t);var a=new n.MathNode("mstyle",r);a.setAttribute("mathcolor",e.value.color);return a};v.supsub=function(e,t){var r=[f(e.value.base,t)];if(e.value.sub){r.push(f(e.value.sub,t))}if(e.value.sup){r.push(f(e.value.sup,t))}var a;if(!e.value.sub){a="msup"}else if(!e.value.sup){a="msub"}else{a="msubsup"}var i=new n.MathNode(a,r);return i};v.genfrac=function(e,t){var r=new n.MathNode("mfrac",[f(e.value.numer,t),f(e.value.denom,t)]);if(!e.value.hasBarLine){r.setAttribute("linethickness","0px")}if(e.value.leftDelim!=null||e.value.rightDelim!=null){var a=[];if(e.value.leftDelim!=null){var i=new n.MathNode("mo",[new n.TextNode(e.value.leftDelim)]);i.setAttribute("fence","true");a.push(i)}a.push(r);if(e.value.rightDelim!=null){var s=new n.MathNode("mo",[new n.TextNode(e.value.rightDelim)]);s.setAttribute("fence","true");a.push(s)}var l=new n.MathNode("mrow",a);return l}return r};v.array=function(e,t){return new n.MathNode("mtable",e.value.body.map(function(e){return new n.MathNode("mtr",e.map(function(e){return new n.MathNode("mtd",[f(e,t)])}))}))};v.sqrt=function(e,t){var r;if(e.value.index){r=new n.MathNode("mroot",[f(e.value.body,t),f(e.value.index,t)])}else{r=new n.MathNode("msqrt",[f(e.value.body,t)])}return r};v.leftright=function(e,t){var r=m(e.value.body,t);if(e.value.left!=="."){var a=new n.MathNode("mo",[h(e.value.left,e.mode)]);a.setAttribute("fence","true");r.unshift(a)}if(e.value.right!=="."){var i=new n.MathNode("mo",[h(e.value.right,e.mode)]);i.setAttribute("fence","true");r.push(i)}var s=new n.MathNode("mrow",r);return s};v.accent=function(e,t){var r=new n.MathNode("mo",[h(e.value.accent,e.mode)]);var a=new n.MathNode("mover",[f(e.value.base,t),r]);a.setAttribute("accent","true");return a};v.spacing=function(e){var t;if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){t=new n.MathNode("mtext",[new n.TextNode("\xa0")])}else{t=new n.MathNode("mspace");t.setAttribute("width",a.spacingFunctions[e.value].size)}return t};v.op=function(e){var t;if(e.value.symbol){t=new n.MathNode("mo",[h(e.value.body,e.mode)])}else{t=new n.MathNode("mi",[new n.TextNode(e.value.body.slice(1))])}return t};v.katex=function(e){var t=new n.MathNode("mtext",[new n.TextNode("KaTeX")]);return t};v.font=function(e,t){var r=e.value.font;return f(e.value.body,t.withFont(r))};v.delimsizing=function(e){var t=[];if(e.value.value!=="."){t.push(h(e.value.value,e.mode))}var r=new n.MathNode("mo",t);if(e.value.delimType==="open"||e.value.delimType==="close"){r.setAttribute("fence","true")}else{r.setAttribute("fence","false")}return r};v.styling=function(e,t){var r=m(e.value.value,t);var a=new n.MathNode("mstyle",r);var i={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]};var s=i[e.value.style];a.setAttribute("scriptlevel",s[0]);a.setAttribute("displaystyle",s[1]);return a};v.sizing=function(e,t){var r=m(e.value.value,t);var i=new n.MathNode("mstyle",r);i.setAttribute("mathsize",a.sizingMultiplier[e.value.size]+"em");return i};v.overline=function(e,t){var r=new n.MathNode("mo",[new n.TextNode("\u203e")]);r.setAttribute("stretchy","true");var a=new n.MathNode("mover",[f(e.value.body,t),r]);a.setAttribute("accent","true");return a};v.underline=function(e,t){var r=new n.MathNode("mo",[new n.TextNode("\u203e")]);r.setAttribute("stretchy","true");var a=new n.MathNode("munder",[f(e.value.body,t),r]);a.setAttribute("accentunder","true");return a};v.rule=function(e){var t=new n.MathNode("mrow");return t};v.llap=function(e,t){var r=new n.MathNode("mpadded",[f(e.value.body,t)]);r.setAttribute("lspace","-1width");r.setAttribute("width","0px");return r};v.rlap=function(e,t){var r=new n.MathNode("mpadded",[f(e.value.body,t)]);r.setAttribute("width","0px");return r};v.phantom=function(e,t,r){var a=m(e.value.value,t);return new n.MathNode("mphantom",a)};var m=function(e,t){var r=[];for(var a=0;a<e.length;a++){var i=e[a];r.push(f(i,t))}return r};var f=function(e,t){if(!e){return new n.MathNode("mrow")}if(v[e.type]){return v[e.type](e,t)}else{throw new s("Got group of unknown type: '"+e.type+"'")}};var d=function(e,t,r){var a=m(e,r);var i=new n.MathNode("mrow",a);var s=new n.MathNode("annotation",[new n.TextNode(t)]);s.setAttribute("encoding","application/x-tex");var l=new n.MathNode("semantics",[i,s]);var o=new n.MathNode("math",[l]);return u(["katex-mathml"],[o])};t.exports=d},{"./ParseError":5,"./buildCommon":9,"./fontMetrics":16,"./mathMLTree":19,"./symbols":22,"./utils":23}],12:[function(e,t,r){var a=e("./buildHTML");var i=e("./buildMathML");var n=e("./buildCommon");var s=e("./Options");var l=e("./Settings");var o=e("./Style");var u=n.makeSpan;var p=function(e,t,r){r=r||new l({});var n=o.TEXT;if(r.displayMode){n=o.DISPLAY}var p=new s({style:n,size:"size5"});var h=i(e,t,p);var c=a(e,p);var v=u(["katex"],[h,c]);if(r.displayMode){return u(["katex-display"],[v])}else{return v}};t.exports=p},{"./Options":4,"./Settings":7,"./Style":8,"./buildCommon":9,"./buildHTML":10,"./buildMathML":11}],13:[function(e,t,r){var a=e("./ParseError");var i=e("./Style");var n=e("./buildCommon");var s=e("./fontMetrics");var l=e("./symbols");var o=e("./utils");var u=n.makeSpan;var p=function(e,t){if(l.math[e]&&l.math[e].replace){return s.getCharacterMetrics(l.math[e].replace,t)}else{return s.getCharacterMetrics(e,t)}};var h=function(e,t,r){return n.makeSymbol(e,"Size"+t+"-Regular",r)};var c=function(e,t,r){var a=u(["style-wrap",r.style.reset(),t.cls()],[e]);var i=t.sizeMultiplier/r.style.sizeMultiplier;a.height*=i;a.depth*=i;a.maxFontSize=t.sizeMultiplier;return a};var v=function(e,t,r,a,i){var l=n.makeSymbol(e,"Main-Regular",i);var o=c(l,t,a);if(r){var u=(1-a.style.sizeMultiplier/t.sizeMultiplier)*s.metrics.axisHeight;o.style.top=u+"em";o.height-=u;o.depth+=u}return o};var m=function(e,t,r,a,n){var l=h(e,t,n);var o=c(u(["delimsizing","size"+t],[l],a.getColor()),i.TEXT,a);if(r){var p=(1-a.style.sizeMultiplier)*s.metrics.axisHeight;o.style.top=p+"em";o.height-=p;o.depth+=p}return o};var f=function(e,t,r){var a;if(t==="Size1-Regular"){a="delim-size1"}else if(t==="Size4-Regular"){a="delim-size4"}var i=u(["delimsizinginner",a],[u([],[n.makeSymbol(e,t,r)])]);return{type:"elem",elem:i}};var d=function(e,t,r,a,l){var o;var h;var v;var m;o=v=m=e;h=null;var d="Size1-Regular";if(e==="\\uparrow"){v=m="\u23d0"}else if(e==="\\Uparrow"){v=m="\u2016"}else if(e==="\\downarrow"){o=v="\u23d0"}else if(e==="\\Downarrow"){o=v="\u2016"}else if(e==="\\updownarrow"){o="\\uparrow";v="\u23d0";m="\\downarrow"}else if(e==="\\Updownarrow"){o="\\Uparrow";v="\u2016";m="\\Downarrow"}else if(e==="["||e==="\\lbrack"){o="\u23a1";v="\u23a2";m="\u23a3";d="Size4-Regular"}else if(e==="]"||e==="\\rbrack"){o="\u23a4";v="\u23a5";m="\u23a6";d="Size4-Regular"}else if(e==="\\lfloor"){v=o="\u23a2";m="\u23a3";d="Size4-Regular"}else if(e==="\\lceil"){o="\u23a1";v=m="\u23a2";d="Size4-Regular"}else if(e==="\\rfloor"){v=o="\u23a5";m="\u23a6";d="Size4-Regular"}else if(e==="\\rceil"){o="\u23a4";v=m="\u23a5";d="Size4-Regular"}else if(e==="("){o="\u239b";v="\u239c";m="\u239d";d="Size4-Regular"}else if(e===")"){o="\u239e";v="\u239f";m="\u23a0";d="Size4-Regular"}else if(e==="\\{"||e==="\\lbrace"){o="\u23a7";h="\u23a8";m="\u23a9";v="\u23aa";d="Size4-Regular"}else if(e==="\\}"||e==="\\rbrace"){o="\u23ab";h="\u23ac";m="\u23ad";v="\u23aa";d="Size4-Regular"}else if(e==="\\lgroup"){o="\u23a7";m="\u23a9";v="\u23aa";d="Size4-Regular"}else if(e==="\\rgroup"){o="\u23ab";m="\u23ad";v="\u23aa";d="Size4-Regular"}else if(e==="\\lmoustache"){o="\u23a7";m="\u23ad";v="\u23aa";d="Size4-Regular"}else if(e==="\\rmoustache"){o="\u23ab";m="\u23a9";v="\u23aa";d="Size4-Regular"}else if(e==="\\surd"){o="\ue001";m="\u23b7";v="\ue000";d="Size4-Regular"}var g=p(o,d);var y=g.height+g.depth;var b=p(v,d);var x=b.height+b.depth;var w=p(m,d);var k=w.height+w.depth;var z=0;var S=1;if(h!==null){var M=p(h,d);z=M.height+M.depth;S=2}var T=y+k+z;var N=Math.ceil((t-T)/(S*x));var q=T+N*S*x;var A=s.metrics.axisHeight;if(r){A*=a.style.sizeMultiplier}var C=q/2-A;var R=[];R.push(f(m,d,l));var E;if(h===null){for(E=0;E<N;E++){R.push(f(v,d,l))}}else{for(E=0;E<N;E++){R.push(f(v,d,l))}R.push(f(h,d,l));for(E=0;E<N;E++){R.push(f(v,d,l))}}R.push(f(o,d,l));var P=n.makeVList(R,"bottom",C,a);return c(u(["delimsizing","mult"],[P],a.getColor()),i.TEXT,a)};var g=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"];var y=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"];var b=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"];var x=[0,1.2,1.8,2.4,3];var w=function(e,t,r,i){if(e==="<"||e==="\\lt"){e="\\langle"}else if(e===">"||e==="\\gt"){e="\\rangle"}if(o.contains(g,e)||o.contains(b,e)){return m(e,t,false,r,i)}else if(o.contains(y,e)){return d(e,x[t],false,r,i)}else{throw new a("Illegal delimiter: '"+e+"'")}};var k=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}];var z=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"stack"}];var S=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}];var M=function(e){if(e.type==="small"){return"Main-Regular"}else if(e.type==="large"){return"Size"+e.size+"-Regular"}else if(e.type==="stack"){return"Size4-Regular"}};var T=function(e,t,r,a){var i=Math.min(2,3-a.style.size);for(var n=i;n<r.length;n++){if(r[n].type==="stack"){break}var s=p(e,M(r[n]));var l=s.height+s.depth;if(r[n].type==="small"){l*=r[n].style.sizeMultiplier}if(l>t){return r[n]}}return r[r.length-1]};var N=function(e,t,r,a,i){if(e==="<"||e==="\\lt"){e="\\langle"}else if(e===">"||e==="\\gt"){e="\\rangle"}var n;if(o.contains(b,e)){n=k}else if(o.contains(g,e)){n=S}else{n=z}var s=T(e,t,n,a);if(s.type==="small"){return v(e,s.style,r,a,i)}else if(s.type==="large"){return m(e,s.size,r,a,i)}else if(s.type==="stack"){return d(e,t,r,a,i)}};var q=function(e,t,r,a,i){var n=s.metrics.axisHeight*a.style.sizeMultiplier;var l=901;var o=5/s.metrics.ptPerEm;var u=Math.max(t-n,r+n);var p=Math.max(u/500*l,2*u-o);return N(e,p,true,a,i)};t.exports={sizedDelim:w,customSizedDelim:N,leftRightDelim:q}},{"./ParseError":5,"./Style":8,"./buildCommon":9,"./fontMetrics":16,"./symbols":22,"./utils":23}],14:[function(e,t,r){var a=e("./utils");var i=function(e){e=e.slice();for(var t=e.length-1;t>=0;t--){if(!e[t]){e.splice(t,1)}}return e.join(" ")};function n(e,t,r,a,i,n){this.classes=e||[];this.children=t||[];this.height=r||0;this.depth=a||0;this.maxFontSize=i||0;this.style=n||{};this.attributes={}}n.prototype.setAttribute=function(e,t){this.attributes[e]=t};n.prototype.toNode=function(){var e=document.createElement("span");e.className=i(this.classes);for(var t in this.style){if(Object.prototype.hasOwnProperty.call(this.style,t)){e.style[t]=this.style[t]}}for(var r in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,r)){e.setAttribute(r,this.attributes[r])}}for(var a=0;a<this.children.length;a++){e.appendChild(this.children[a].toNode())}return e};n.prototype.toMarkup=function(){var e="<span";if(this.classes.length){e+=' class="';e+=a.escape(i(this.classes));e+='"'}var t="";for(var r in this.style){if(this.style.hasOwnProperty(r)){t+=a.hyphenate(r)+":"+this.style[r]+";"}}if(t){e+=' style="'+a.escape(t)+'"'}for(var n in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,n)){e+=" "+n+'="';e+=a.escape(this.attributes[n]);e+='"'}}e+=">";for(var s=0;s<this.children.length;s++){e+=this.children[s].toMarkup()}e+="</span>";return e};function s(e,t,r,a){this.children=e||[];this.height=t||0;this.depth=r||0;this.maxFontSize=a||0}s.prototype.toNode=function(){var e=document.createDocumentFragment();for(var t=0;t<this.children.length;t++){e.appendChild(this.children[t].toNode())}return e};s.prototype.toMarkup=function(){var e="";for(var t=0;t<this.children.length;t++){e+=this.children[t].toMarkup()}return e};function l(e,t,r,a,i,n,s){this.value=e||"";this.height=t||0;this.depth=r||0;this.italic=a||0;this.skew=i||0;this.classes=n||[];this.style=s||{};this.maxFontSize=0}l.prototype.toNode=function(){var e=document.createTextNode(this.value);var t=null;if(this.italic>0){t=document.createElement("span");t.style.marginRight=this.italic+"em"}if(this.classes.length>0){t=t||document.createElement("span");t.className=i(this.classes)}for(var r in this.style){if(this.style.hasOwnProperty(r)){t=t||document.createElement("span");t.style[r]=this.style[r]}}if(t){t.appendChild(e);return t}else{return e}};l.prototype.toMarkup=function(){var e=false;var t="<span";if(this.classes.length){e=true;t+=' class="';t+=a.escape(i(this.classes));t+='"'}var r="";if(this.italic>0){r+="margin-right:"+this.italic+"em;"}for(var n in this.style){if(this.style.hasOwnProperty(n)){r+=a.hyphenate(n)+":"+this.style[n]+";"}}if(r){e=true;t+=' style="'+a.escape(r)+'"'}var s=a.escape(this.value);if(e){t+=">";t+=s;t+="</span>";return t}else{return s}};t.exports={span:n,documentFragment:s,symbolNode:l}},{"./utils":23}],15:[function(e,t,r){var a=e("./fontMetrics");var i=e("./parseData");var n=e("./ParseError");var s=i.ParseNode;function l(e,t){var r=[];var a=[r];var i=[];while(true){var l=e.parseExpression(false,null);r.push(new s("ordgroup",l,e.mode));var o=e.nextToken.text;if(o==="&"){e.consume()}else if(o==="\\end"){break}else if(o==="\\\\"||o==="\\cr"){var u=e.parseFunction();i.push(u.value.size);r=[];a.push(r)}else{var p=Math.min(e.pos+1,e.lexer._input.length);throw new n("Expected & or \\\\ or \\end",e.lexer,p)}}t.body=a;t.rowGaps=i;return new s(t.type,t,e.mode)}function o(e,r,a){if(typeof e==="string"){e=[e]}if(typeof r==="number"){r={numArgs:r}}var i={numArgs:r.numArgs||0,argTypes:r.argTypes,greediness:1,allowedInText:!!r.allowedInText,numOptionalArgs:r.numOptionalArgs||0,handler:a};for(var n=0;n<e.length;++n){t.exports[e[n]]=i}}o("array",{numArgs:1},function(e,t){var r=t[0];r=r.value.map?r.value:[r];var a=r.map(function(t){var r=t.value;if("lcr".indexOf(r)!==-1){return{type:"align",align:r}}else if(r==="|"){return{type:"separator",separator:"|"}}throw new n("Unknown column alignment: "+t.value,e.lexer,e.positions[1])});var i={type:"array",cols:a,hskipBeforeAndAfter:true};i=l(e.parser,i);return i});o(["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],{},function(e){var t={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[e.envName];var r={type:"array",hskipBeforeAndAfter:false};r=l(e.parser,r);if(t){r=new s("leftright",{body:[r],left:t[0],right:t[1]},e.mode)}return r});o("cases",{},function(e){var t={type:"array",arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:a.metrics.quad},{type:"align",align:"l",pregap:0,postgap:0}]};t=l(e.parser,t);t=new s("leftright",{body:[t],left:"\\{",right:"."},e.mode);return t});o("aligned",{},function(e){var t={type:"array",cols:[]};t=l(e.parser,t);var r=new s("ordgroup",[],e.mode);var a=0;t.value.body.forEach(function(e){var t;for(t=1;t<e.length;t+=2){e[t].value.unshift(r)}if(a<e.length){a=e.length}});for(var i=0;i<a;++i){var n="r";var o=0;if(i%2===1){n="l"}else if(i>0){o=2}t.value.cols[i]={type:"align",align:n,pregap:o,postgap:0}}return t})},{"./ParseError":5,"./fontMetrics":16,"./parseData":20}],16:[function(e,t,r){var a=e("./Style");var i=.025;var n=0;var s=0;var l=0;var o=.431;var u=1;var p=0;var h=.677;var c=.394;var v=.444;var m=.686;var f=.345;var d=.413;var g=.363;var y=.289;var b=.15;var x=.247;var w=.386;var k=.05;var z=2.39;var S=1.01;var M=.81;var T=.71;var N=.25;var q=0;var A=0;var C=0;var R=0;var E=.431;var P=1;var D=0;var L=.04;var O=.111;var I=.166;var B=.2;var F=.6;var _=.1;var V=10;var G=2/V;var H={xHeight:o,quad:u,num1:h,num2:c,num3:v,denom1:m,denom2:f,sup1:d,sup2:g,sup3:y,sub1:b,sub2:x,supDrop:w,subDrop:k,axisHeight:N,defaultRuleThickness:L,bigOpSpacing1:O,bigOpSpacing2:I,bigOpSpacing3:B,bigOpSpacing4:F,bigOpSpacing5:_,ptPerEm:V,emPerEx:o/u,doubleRuleSep:G,delim1:z,getDelim2:function(e){if(e.size===a.TEXT.size){return S}else if(e.size===a.SCRIPT.size){return M}else if(e.size===a.SCRIPTSCRIPT.size){return T}throw new Error("Unexpected style size: "+e.size)}};var X=e("./fontMetricsData");var U=function(e,t){var r=X[t][e.charCodeAt(0)];if(r){return{depth:r[0],height:r[1],italic:r[2],skew:r[3],width:r[4]}}};t.exports={metrics:H,getCharacterMetrics:U}},{"./Style":8,"./fontMetricsData":17}],17:[function(e,t,r){t.exports={"AMS-Regular":{65:[0,.68889,0,0],66:[0,.68889,0,0],67:[0,.68889,0,0],68:[0,.68889,0,0],69:[0,.68889,0,0],70:[0,.68889,0,0],71:[0,.68889,0,0],72:[0,.68889,0,0],73:[0,.68889,0,0],74:[.16667,.68889,0,0],75:[0,.68889,0,0],76:[0,.68889,0,0],77:[0,.68889,0,0],78:[0,.68889,0,0],79:[.16667,.68889,0,0],80:[0,.68889,0,0],81:[.16667,.68889,0,0],82:[0,.68889,0,0],83:[0,.68889,0,0],84:[0,.68889,0,0],85:[0,.68889,0,0],86:[0,.68889,0,0],87:[0,.68889,0,0],88:[0,.68889,0,0],89:[0,.68889,0,0],90:[0,.68889,0,0],107:[0,.68889,0,0],165:[0,.675,.025,0],174:[.15559,.69224,0,0],240:[0,.68889,0,0],295:[0,.68889,0,0],710:[0,.825,0,0],732:[0,.9,0,0],770:[0,.825,0,0],771:[0,.9,0,0],989:[.08167,.58167,0,0],1008:[0,.43056,.04028,0],8245:[0,.54986,0,0],8463:[0,.68889,0,0],8487:[0,.68889,0,0],8498:[0,.68889,0,0],8502:[0,.68889,0,0],8503:[0,.68889,0,0],8504:[0,.68889,0,0],8513:[0,.68889,0,0],8592:[-.03598,.46402,0,0],8594:[-.03598,.46402,0,0],8602:[-.13313,.36687,0,0],8603:[-.13313,.36687,0,0],8606:[.01354,.52239,0,0],8608:[.01354,.52239,0,0],8610:[.01354,.52239,0,0],8611:[.01354,.52239,0,0],8619:[0,.54986,0,0],8620:[0,.54986,0,0],8621:[-.13313,.37788,0,0],8622:[-.13313,.36687,0,0],8624:[0,.69224,0,0],8625:[0,.69224,0,0],8630:[0,.43056,0,0],8631:[0,.43056,0,0],8634:[.08198,.58198,0,0],8635:[.08198,.58198,0,0],8638:[.19444,.69224,0,0],8639:[.19444,.69224,0,0],8642:[.19444,.69224,0,0],8643:[.19444,.69224,0,0],8644:[.1808,.675,0,0],8646:[.1808,.675,0,0],8647:[.1808,.675,0,0],8648:[.19444,.69224,0,0],8649:[.1808,.675,0,0],8650:[.19444,.69224,0,0],8651:[.01354,.52239,0,0],8652:[.01354,.52239,0,0],8653:[-.13313,.36687,0,0],8654:[-.13313,.36687,0,0],8655:[-.13313,.36687,0,0],8666:[.13667,.63667,0,0],8667:[.13667,.63667,0,0],8669:[-.13313,.37788,0,0],8672:[-.064,.437,0,0],8674:[-.064,.437,0,0],8705:[0,.825,0,0],8708:[0,.68889,0,0],8709:[.08167,.58167,0,0],8717:[0,.43056,0,0],8722:[-.03598,.46402,0,0],8724:[.08198,.69224,0,0],8726:[.08167,.58167,0,0],8733:[0,.69224,0,0],8736:[0,.69224,0,0],8737:[0,.69224,0,0],8738:[.03517,.52239,0,0],8739:[.08167,.58167,0,0],8740:[.25142,.74111,0,0],8741:[.08167,.58167,0,0],8742:[.25142,.74111,0,0],8756:[0,.69224,0,0],8757:[0,.69224,0,0],8764:[-.13313,.36687,0,0],8765:[-.13313,.37788,0,0],8769:[-.13313,.36687,0,0],8770:[-.03625,.46375,0,0],8774:[.30274,.79383,0,0],8776:[-.01688,.48312,0,0],8778:[.08167,.58167,0,0],8782:[.06062,.54986,0,0],8783:[.06062,.54986,0,0],8785:[.08198,.58198,0,0],8786:[.08198,.58198,0,0],8787:[.08198,.58198,0,0],8790:[0,.69224,0,0],8791:[.22958,.72958,0,0],8796:[.08198,.91667,0,0],8806:[.25583,.75583,0,0],8807:[.25583,.75583,0,0],8808:[.25142,.75726,0,0],8809:[.25142,.75726,0,0],8812:[.25583,.75583,0,0],8814:[.20576,.70576,0,0],8815:[.20576,.70576,0,0],8816:[.30274,.79383,0,0],8817:[.30274,.79383,0,0],8818:[.22958,.72958,0,0],8819:[.22958,.72958,0,0],8822:[.1808,.675,0,0],8823:[.1808,.675,0,0],8828:[.13667,.63667,0,0],8829:[.13667,.63667,0,0],8830:[.22958,.72958,0,0],8831:[.22958,.72958,0,0],8832:[.20576,.70576,0,0],8833:[.20576,.70576,0,0],8840:[.30274,.79383,0,0],8841:[.30274,.79383,0,0],8842:[.13597,.63597,0,0],8843:[.13597,.63597,0,0],8847:[.03517,.54986,0,0],8848:[.03517,.54986,0,0],8858:[.08198,.58198,0,0],8859:[.08198,.58198,0,0],8861:[.08198,.58198,0,0],8862:[0,.675,0,0],8863:[0,.675,0,0],8864:[0,.675,0,0],8865:[0,.675,0,0],8872:[0,.69224,0,0],8873:[0,.69224,0,0],8874:[0,.69224,0,0],8876:[0,.68889,0,0],8877:[0,.68889,0,0],8878:[0,.68889,0,0],8879:[0,.68889,0,0],8882:[.03517,.54986,0,0],8883:[.03517,.54986,0,0],8884:[.13667,.63667,0,0],8885:[.13667,.63667,0,0],8888:[0,.54986,0,0],8890:[.19444,.43056,0,0],8891:[.19444,.69224,0,0],8892:[.19444,.69224,0,0],8901:[0,.54986,0,0],8903:[.08167,.58167,0,0],8905:[.08167,.58167,0,0],8906:[.08167,.58167,0,0],8907:[0,.69224,0,0],8908:[0,.69224,0,0],8909:[-.03598,.46402,0,0],8910:[0,.54986,0,0],8911:[0,.54986,0,0],8912:[.03517,.54986,0,0],8913:[.03517,.54986,0,0],8914:[0,.54986,0,0],8915:[0,.54986,0,0],8916:[0,.69224,0,0],8918:[.0391,.5391,0,0],8919:[.0391,.5391,0,0],8920:[.03517,.54986,0,0],8921:[.03517,.54986,0,0],8922:[.38569,.88569,0,0],8923:[.38569,.88569,0,0],8926:[.13667,.63667,0,0],8927:[.13667,.63667,0,0],8928:[.30274,.79383,0,0],8929:[.30274,.79383,0,0],8934:[.23222,.74111,0,0],8935:[.23222,.74111,0,0],8936:[.23222,.74111,0,0],8937:[.23222,.74111,0,0],8938:[.20576,.70576,0,0],8939:[.20576,.70576,0,0],8940:[.30274,.79383,0,0],8941:[.30274,.79383,0,0],8994:[.19444,.69224,0,0],8995:[.19444,.69224,0,0],9416:[.15559,.69224,0,0],9484:[0,.69224,0,0],9488:[0,.69224,0,0],9492:[0,.37788,0,0],9496:[0,.37788,0,0],9585:[.19444,.68889,0,0],9586:[.19444,.74111,0,0],9632:[0,.675,0,0],9633:[0,.675,0,0],9650:[0,.54986,0,0],9651:[0,.54986,0,0],9654:[.03517,.54986,0,0],9660:[0,.54986,0,0],9661:[0,.54986,0,0],9664:[.03517,.54986,0,0],9674:[.11111,.69224,0,0],9733:[.19444,.69224,0,0],10003:[0,.69224,0,0],10016:[0,.69224,0,0],10731:[.11111,.69224,0,0],10846:[.19444,.75583,0,0],10877:[.13667,.63667,0,0],10878:[.13667,.63667,0,0],10885:[.25583,.75583,0,0],10886:[.25583,.75583,0,0],10887:[.13597,.63597,0,0],10888:[.13597,.63597,0,0],10889:[.26167,.75726,0,0],10890:[.26167,.75726,0,0],10891:[.48256,.98256,0,0],10892:[.48256,.98256,0,0],10901:[.13667,.63667,0,0],10902:[.13667,.63667,0,0],10933:[.25142,.75726,0,0],10934:[.25142,.75726,0,0],10935:[.26167,.75726,0,0],10936:[.26167,.75726,0,0],10937:[.26167,.75726,0,0],10938:[.26167,.75726,0,0],10949:[.25583,.75583,0,0],10950:[.25583,.75583,0,0],10955:[.28481,.79383,0,0],10956:[.28481,.79383,0,0],57350:[.08167,.58167,0,0],57351:[.08167,.58167,0,0],57352:[.08167,.58167,0,0],57353:[0,.43056,.04028,0],57356:[.25142,.75726,0,0],57357:[.25142,.75726,0,0],57358:[.41951,.91951,0,0],57359:[.30274,.79383,0,0],57360:[.30274,.79383,0,0],57361:[.41951,.91951,0,0],57366:[.25142,.75726,0,0],57367:[.25142,.75726,0,0],57368:[.25142,.75726,0,0],57369:[.25142,.75726,0,0],57370:[.13597,.63597,0,0],57371:[.13597,.63597,0,0]},"Caligraphic-Regular":{48:[0,.43056,0,0],49:[0,.43056,0,0],50:[0,.43056,0,0],51:[.19444,.43056,0,0],52:[.19444,.43056,0,0],53:[.19444,.43056,0,0],54:[0,.64444,0,0],55:[.19444,.43056,0,0],56:[0,.64444,0,0],57:[.19444,.43056,0,0],65:[0,.68333,0,.19445],66:[0,.68333,.03041,.13889],67:[0,.68333,.05834,.13889],68:[0,.68333,.02778,.08334],69:[0,.68333,.08944,.11111],70:[0,.68333,.09931,.11111],71:[.09722,.68333,.0593,.11111],72:[0,.68333,.00965,.11111],73:[0,.68333,.07382,0],74:[.09722,.68333,.18472,.16667],75:[0,.68333,.01445,.05556],76:[0,.68333,0,.13889],77:[0,.68333,0,.13889],78:[0,.68333,.14736,.08334],79:[0,.68333,.02778,.11111],80:[0,.68333,.08222,.08334],81:[.09722,.68333,0,.11111],82:[0,.68333,0,.08334],83:[0,.68333,.075,.13889],84:[0,.68333,.25417,0],85:[0,.68333,.09931,.08334],86:[0,.68333,.08222,0],87:[0,.68333,.08222,.08334],88:[0,.68333,.14643,.13889],89:[.09722,.68333,.08222,.08334],90:[0,.68333,.07944,.13889]},"Fraktur-Regular":{33:[0,.69141,0,0],34:[0,.69141,0,0],38:[0,.69141,0,0],39:[0,.69141,0,0],40:[.24982,.74947,0,0],41:[.24982,.74947,0,0],42:[0,.62119,0,0],43:[.08319,.58283,0,0],44:[0,.10803,0,0],45:[.08319,.58283,0,0],46:[0,.10803,0,0],47:[.24982,.74947,0,0],48:[0,.47534,0,0],49:[0,.47534,0,0],50:[0,.47534,0,0],51:[.18906,.47534,0,0],52:[.18906,.47534,0,0],53:[.18906,.47534,0,0],54:[0,.69141,0,0],55:[.18906,.47534,0,0],56:[0,.69141,0,0],57:[.18906,.47534,0,0],58:[0,.47534,0,0],59:[.12604,.47534,0,0],61:[-.13099,.36866,0,0],63:[0,.69141,0,0],65:[0,.69141,0,0],66:[0,.69141,0,0],67:[0,.69141,0,0],68:[0,.69141,0,0],69:[0,.69141,0,0],70:[.12604,.69141,0,0],71:[0,.69141,0,0],72:[.06302,.69141,0,0],73:[0,.69141,0,0],74:[.12604,.69141,0,0],75:[0,.69141,0,0],76:[0,.69141,0,0],77:[0,.69141,0,0],78:[0,.69141,0,0],79:[0,.69141,0,0],80:[.18906,.69141,0,0],81:[.03781,.69141,0,0],82:[0,.69141,0,0],83:[0,.69141,0,0],84:[0,.69141,0,0],85:[0,.69141,0,0],86:[0,.69141,0,0],87:[0,.69141,0,0],88:[0,.69141,0,0],89:[.18906,.69141,0,0],90:[.12604,.69141,0,0],91:[.24982,.74947,0,0],93:[.24982,.74947,0,0],94:[0,.69141,0,0],97:[0,.47534,0,0],98:[0,.69141,0,0],99:[0,.47534,0,0],100:[0,.62119,0,0],101:[0,.47534,0,0],102:[.18906,.69141,0,0],103:[.18906,.47534,0,0],104:[.18906,.69141,0,0],105:[0,.69141,0,0],106:[0,.69141,0,0],107:[0,.69141,0,0],108:[0,.69141,0,0],109:[0,.47534,0,0],110:[0,.47534,0,0],111:[0,.47534,0,0],112:[.18906,.52396,0,0],113:[.18906,.47534,0,0],114:[0,.47534,0,0],115:[0,.47534,0,0],116:[0,.62119,0,0],117:[0,.47534,0,0],118:[0,.52396,0,0],119:[0,.52396,0,0],120:[.18906,.47534,0,0],121:[.18906,.47534,0,0],122:[.18906,.47534,0,0],8216:[0,.69141,0,0],8217:[0,.69141,0,0],58112:[0,.62119,0,0],58113:[0,.62119,0,0],58114:[.18906,.69141,0,0],58115:[.18906,.69141,0,0],58116:[.18906,.47534,0,0],58117:[0,.69141,0,0],58118:[0,.62119,0,0],58119:[0,.47534,0,0]},"Main-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.13333,.63333,0,0],44:[.19444,.15556,0,0],45:[0,.44444,0,0],46:[0,.15556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.44444,0,0],59:[.19444,.44444,0,0],60:[.08556,.58556,0,0],61:[-.10889,.39111,0,0],62:[.08556,.58556,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,0,0],67:[0,.68611,0,0],68:[0,.68611,0,0],69:[0,.68611,0,0],70:[0,.68611,0,0],71:[0,.68611,0,0],72:[0,.68611,0,0],73:[0,.68611,0,0],74:[0,.68611,0,0],75:[0,.68611,0,0],76:[0,.68611,0,0],77:[0,.68611,0,0],78:[0,.68611,0,0],79:[0,.68611,0,0],80:[0,.68611,0,0],81:[.19444,.68611,0,0],82:[0,.68611,0,0],83:[0,.68611,0,0],84:[0,.68611,0,0],85:[0,.68611,0,0],86:[0,.68611,.01597,0],87:[0,.68611,.01597,0],88:[0,.68611,0,0],89:[0,.68611,.02875,0],90:[0,.68611,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.13444,.03194,0],96:[0,.69444,0,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.10903,0],103:[.19444,.44444,.01597,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],
110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,0,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.01597,0],119:[0,.44444,.01597,0],120:[0,.44444,0,0],121:[.19444,.44444,.01597,0],122:[0,.44444,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],172:[0,.44444,0,0],175:[0,.59611,0,0],176:[0,.69444,0,0],177:[.13333,.63333,0,0],180:[0,.69444,0,0],215:[.13333,.63333,0,0],247:[.13333,.63333,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.59611,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.69444,0,0],772:[0,.59611,0,0],774:[0,.69444,0,0],775:[0,.69444,0,0],776:[0,.69444,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],824:[.19444,.69444,0,0],915:[0,.68611,0,0],916:[0,.68611,0,0],920:[0,.68611,0,0],923:[0,.68611,0,0],926:[0,.68611,0,0],928:[0,.68611,0,0],931:[0,.68611,0,0],933:[0,.68611,0,0],934:[0,.68611,0,0],936:[0,.68611,0,0],937:[0,.68611,0,0],8211:[0,.44444,.03194,0],8212:[0,.44444,.03194,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8242:[0,.55556,0,0],8407:[0,.72444,.15486,0],8463:[0,.69444,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,0],8472:[.19444,.44444,0,0],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.10889,.39111,0,0],8593:[.19444,.69444,0,0],8594:[-.10889,.39111,0,0],8595:[.19444,.69444,0,0],8596:[-.10889,.39111,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8636:[-.10889,.39111,0,0],8637:[-.10889,.39111,0,0],8640:[-.10889,.39111,0,0],8641:[-.10889,.39111,0,0],8656:[-.10889,.39111,0,0],8657:[.19444,.69444,0,0],8658:[-.10889,.39111,0,0],8659:[.19444,.69444,0,0],8660:[-.10889,.39111,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.06389,0],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68611,0,0],8712:[.08556,.58556,0,0],8715:[.08556,.58556,0,0],8722:[.13333,.63333,0,0],8723:[.13333,.63333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.02778,.47222,0,0],8728:[-.02639,.47361,0,0],8729:[-.02639,.47361,0,0],8730:[.18,.82,0,0],8733:[0,.44444,0,0],8734:[0,.44444,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.12778,0],8764:[-.10889,.39111,0,0],8768:[.19444,.69444,0,0],8771:[.00222,.50222,0,0],8776:[.02444,.52444,0,0],8781:[.00222,.50222,0,0],8801:[.00222,.50222,0,0],8804:[.19667,.69667,0,0],8805:[.19667,.69667,0,0],8810:[.08556,.58556,0,0],8811:[.08556,.58556,0,0],8826:[.08556,.58556,0,0],8827:[.08556,.58556,0,0],8834:[.08556,.58556,0,0],8835:[.08556,.58556,0,0],8838:[.19667,.69667,0,0],8839:[.19667,.69667,0,0],8846:[0,.55556,0,0],8849:[.19667,.69667,0,0],8850:[.19667,.69667,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.13333,.63333,0,0],8854:[.13333,.63333,0,0],8855:[.13333,.63333,0,0],8856:[.13333,.63333,0,0],8857:[.13333,.63333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8900:[-.02639,.47361,0,0],8901:[-.02639,.47361,0,0],8902:[-.02778,.47222,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.13889,.36111,0,0],8995:[-.13889,.36111,0,0],9651:[.19444,.69444,0,0],9657:[-.02778,.47222,0,0],9661:[.19444,.69444,0,0],9667:[-.02778,.47222,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10815:[0,.68611,0,0],10927:[.19667,.69667,0,0],10928:[.19667,.69667,0,0]},"Main-Italic":{33:[0,.69444,.12417,0],34:[0,.69444,.06961,0],35:[.19444,.69444,.06616,0],37:[.05556,.75,.13639,0],38:[0,.69444,.09694,0],39:[0,.69444,.12417,0],40:[.25,.75,.16194,0],41:[.25,.75,.03694,0],42:[0,.75,.14917,0],43:[.05667,.56167,.03694,0],44:[.19444,.10556,0,0],45:[0,.43056,.02826,0],46:[0,.10556,0,0],47:[.25,.75,.16194,0],48:[0,.64444,.13556,0],49:[0,.64444,.13556,0],50:[0,.64444,.13556,0],51:[0,.64444,.13556,0],52:[.19444,.64444,.13556,0],53:[0,.64444,.13556,0],54:[0,.64444,.13556,0],55:[.19444,.64444,.13556,0],56:[0,.64444,.13556,0],57:[0,.64444,.13556,0],58:[0,.43056,.0582,0],59:[.19444,.43056,.0582,0],61:[-.13313,.36687,.06616,0],63:[0,.69444,.1225,0],64:[0,.69444,.09597,0],65:[0,.68333,0,0],66:[0,.68333,.10257,0],67:[0,.68333,.14528,0],68:[0,.68333,.09403,0],69:[0,.68333,.12028,0],70:[0,.68333,.13305,0],71:[0,.68333,.08722,0],72:[0,.68333,.16389,0],73:[0,.68333,.15806,0],74:[0,.68333,.14028,0],75:[0,.68333,.14528,0],76:[0,.68333,0,0],77:[0,.68333,.16389,0],78:[0,.68333,.16389,0],79:[0,.68333,.09403,0],80:[0,.68333,.10257,0],81:[.19444,.68333,.09403,0],82:[0,.68333,.03868,0],83:[0,.68333,.11972,0],84:[0,.68333,.13305,0],85:[0,.68333,.16389,0],86:[0,.68333,.18361,0],87:[0,.68333,.18361,0],88:[0,.68333,.15806,0],89:[0,.68333,.19383,0],90:[0,.68333,.14528,0],91:[.25,.75,.1875,0],93:[.25,.75,.10528,0],94:[0,.69444,.06646,0],95:[.31,.12056,.09208,0],97:[0,.43056,.07671,0],98:[0,.69444,.06312,0],99:[0,.43056,.05653,0],100:[0,.69444,.10333,0],101:[0,.43056,.07514,0],102:[.19444,.69444,.21194,0],103:[.19444,.43056,.08847,0],104:[0,.69444,.07671,0],105:[0,.65536,.1019,0],106:[.19444,.65536,.14467,0],107:[0,.69444,.10764,0],108:[0,.69444,.10333,0],109:[0,.43056,.07671,0],110:[0,.43056,.07671,0],111:[0,.43056,.06312,0],112:[.19444,.43056,.06312,0],113:[.19444,.43056,.08847,0],114:[0,.43056,.10764,0],115:[0,.43056,.08208,0],116:[0,.61508,.09486,0],117:[0,.43056,.07671,0],118:[0,.43056,.10764,0],119:[0,.43056,.10764,0],120:[0,.43056,.12042,0],121:[.19444,.43056,.08847,0],122:[0,.43056,.12292,0],126:[.35,.31786,.11585,0],163:[0,.69444,0,0],305:[0,.43056,0,.02778],567:[.19444,.43056,0,.08334],768:[0,.69444,0,0],769:[0,.69444,.09694,0],770:[0,.69444,.06646,0],771:[0,.66786,.11585,0],772:[0,.56167,.10333,0],774:[0,.69444,.10806,0],775:[0,.66786,.11752,0],776:[0,.66786,.10474,0],778:[0,.69444,0,0],779:[0,.69444,.1225,0],780:[0,.62847,.08295,0],915:[0,.68333,.13305,0],916:[0,.68333,0,0],920:[0,.68333,.09403,0],923:[0,.68333,0,0],926:[0,.68333,.15294,0],928:[0,.68333,.16389,0],931:[0,.68333,.12028,0],933:[0,.68333,.11111,0],934:[0,.68333,.05986,0],936:[0,.68333,.11111,0],937:[0,.68333,.10257,0],8211:[0,.43056,.09208,0],8212:[0,.43056,.09208,0],8216:[0,.69444,.12417,0],8217:[0,.69444,.12417,0],8220:[0,.69444,.1685,0],8221:[0,.69444,.06961,0],8463:[0,.68889,0,0]},"Main-Regular":{32:[0,0,0,0],33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.19444,.10556,0,0],45:[0,.43056,0,0],46:[0,.10556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.43056,0,0],59:[.19444,.43056,0,0],60:[.0391,.5391,0,0],61:[-.13313,.36687,0,0],62:[.0391,.5391,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68333,0,0],66:[0,.68333,0,0],67:[0,.68333,0,0],68:[0,.68333,0,0],69:[0,.68333,0,0],70:[0,.68333,0,0],71:[0,.68333,0,0],72:[0,.68333,0,0],73:[0,.68333,0,0],74:[0,.68333,0,0],75:[0,.68333,0,0],76:[0,.68333,0,0],77:[0,.68333,0,0],78:[0,.68333,0,0],79:[0,.68333,0,0],80:[0,.68333,0,0],81:[.19444,.68333,0,0],82:[0,.68333,0,0],83:[0,.68333,0,0],84:[0,.68333,0,0],85:[0,.68333,0,0],86:[0,.68333,.01389,0],87:[0,.68333,.01389,0],88:[0,.68333,0,0],89:[0,.68333,.025,0],90:[0,.68333,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.12056,.02778,0],96:[0,.69444,0,0],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,0],100:[0,.69444,0,0],101:[0,.43056,0,0],102:[0,.69444,.07778,0],103:[.19444,.43056,.01389,0],104:[0,.69444,0,0],105:[0,.66786,0,0],106:[.19444,.66786,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.19444,.43056,0,0],113:[.19444,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.61508,0,0],117:[0,.43056,0,0],118:[0,.43056,.01389,0],119:[0,.43056,.01389,0],120:[0,.43056,0,0],121:[.19444,.43056,.01389,0],122:[0,.43056,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.31786,0,0],160:[0,0,0,0],168:[0,.66786,0,0],172:[0,.43056,0,0],175:[0,.56778,0,0],176:[0,.69444,0,0],177:[.08333,.58333,0,0],180:[0,.69444,0,0],215:[.08333,.58333,0,0],247:[.08333,.58333,0,0],305:[0,.43056,0,0],567:[.19444,.43056,0,0],710:[0,.69444,0,0],711:[0,.62847,0,0],713:[0,.56778,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.66786,0,0],730:[0,.69444,0,0],732:[0,.66786,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.66786,0,0],772:[0,.56778,0,0],774:[0,.69444,0,0],775:[0,.66786,0,0],776:[0,.66786,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.62847,0,0],824:[.19444,.69444,0,0],915:[0,.68333,0,0],916:[0,.68333,0,0],920:[0,.68333,0,0],923:[0,.68333,0,0],926:[0,.68333,0,0],928:[0,.68333,0,0],931:[0,.68333,0,0],933:[0,.68333,0,0],934:[0,.68333,0,0],936:[0,.68333,0,0],937:[0,.68333,0,0],8211:[0,.43056,.02778,0],8212:[0,.43056,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8230:[0,.12,0,0],8242:[0,.55556,0,0],8407:[0,.71444,.15382,0],8463:[0,.68889,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,.11111],8472:[.19444,.43056,0,.11111],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.13313,.36687,0,0],8593:[.19444,.69444,0,0],8594:[-.13313,.36687,0,0],8595:[.19444,.69444,0,0],8596:[-.13313,.36687,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8614:[.011,.511,0,0],8617:[.011,.511,0,0],8618:[.011,.511,0,0],8636:[-.13313,.36687,0,0],8637:[-.13313,.36687,0,0],8640:[-.13313,.36687,0,0],8641:[-.13313,.36687,0,0],8652:[.011,.671,0,0],8656:[-.13313,.36687,0,0],8657:[.19444,.69444,0,0],8658:[-.13313,.36687,0,0],8659:[.19444,.69444,0,0],8660:[-.13313,.36687,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.05556,.08334],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68333,0,0],8712:[.0391,.5391,0,0],8715:[.0391,.5391,0,0],8722:[.08333,.58333,0,0],8723:[.08333,.58333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.03472,.46528,0,0],8728:[-.05555,.44445,0,0],8729:[-.05555,.44445,0,0],8730:[.2,.8,0,0],8733:[0,.43056,0,0],8734:[0,.43056,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.11111,0],8764:[-.13313,.36687,0,0],8768:[.19444,.69444,0,0],8771:[-.03625,.46375,0,0],8773:[-.022,.589,0,0],8776:[-.01688,.48312,0,0],8781:[-.03625,.46375,0,0],8784:[-.133,.67,0,0],8800:[.215,.716,0,0],8801:[-.03625,.46375,0,0],8804:[.13597,.63597,0,0],8805:[.13597,.63597,0,0],8810:[.0391,.5391,0,0],8811:[.0391,.5391,0,0],8826:[.0391,.5391,0,0],8827:[.0391,.5391,0,0],8834:[.0391,.5391,0,0],8835:[.0391,.5391,0,0],8838:[.13597,.63597,0,0],8839:[.13597,.63597,0,0],8846:[0,.55556,0,0],8849:[.13597,.63597,0,0],8850:[.13597,.63597,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.08333,.58333,0,0],8854:[.08333,.58333,0,0],8855:[.08333,.58333,0,0],8856:[.08333,.58333,0,0],8857:[.08333,.58333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8872:[.249,.75,0,0],8900:[-.05555,.44445,0,0],8901:[-.05555,.44445,0,0],8902:[-.03472,.46528,0,0],8904:[.005,.505,0,0],8942:[.03,.9,0,0],8943:[-.19,.31,0,0],8945:[-.1,.82,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.14236,.35764,0,0],8995:[-.14236,.35764,0,0],9136:[.244,.744,0,0],9137:[.244,.744,0,0],9651:[.19444,.69444,0,0],9657:[-.03472,.46528,0,0],9661:[.19444,.69444,0,0],9667:[-.03472,.46528,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10222:[.244,.744,0,0],10223:[.244,.744,0,0],10229:[.011,.511,0,0],10230:[.011,.511,0,0],10231:[.011,.511,0,0],10232:[.024,.525,0,0],10233:[.024,.525,0,0],10234:[.024,.525,0,0],10236:[.011,.511,0,0],10815:[0,.68333,0,0],10927:[.13597,.63597,0,0],10928:[.13597,.63597,0,0]},"Math-BoldItalic":{47:[.19444,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,.04835,0],67:[0,.68611,.06979,0],68:[0,.68611,.03194,0],69:[0,.68611,.05451,0],70:[0,.68611,.15972,0],71:[0,.68611,0,0],72:[0,.68611,.08229,0],73:[0,.68611,.07778,0],74:[0,.68611,.10069,0],75:[0,.68611,.06979,0],76:[0,.68611,0,0],77:[0,.68611,.11424,0],78:[0,.68611,.11424,0],79:[0,.68611,.03194,0],80:[0,.68611,.15972,0],81:[.19444,.68611,0,0],82:[0,.68611,.00421,0],83:[0,.68611,.05382,0],84:[0,.68611,.15972,0],85:[0,.68611,.11424,0],86:[0,.68611,.25555,0],87:[0,.68611,.15972,0],88:[0,.68611,.07778,0],89:[0,.68611,.25555,0],90:[0,.68611,.06979,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[.19444,.69444,.11042,0],103:[.19444,.44444,.03704,0],104:[0,.69444,0,0],105:[0,.69326,0,0],106:[.19444,.69326,.0622,0],107:[0,.69444,.01852,0],108:[0,.69444,.0088,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,.03704,0],114:[0,.44444,.03194,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.03704,0],119:[0,.44444,.02778,0],120:[0,.44444,0,0],121:[.19444,.44444,.03704,0],122:[0,.44444,.04213,0],915:[0,.68611,.15972,0],916:[0,.68611,0,0],920:[0,.68611,.03194,0],923:[0,.68611,0,0],926:[0,.68611,.07458,0],928:[0,.68611,.08229,0],931:[0,.68611,.05451,0],933:[0,.68611,.15972,0],934:[0,.68611,0,0],936:[0,.68611,.11653,0],937:[0,.68611,.04835,0],945:[0,.44444,0,0],946:[.19444,.69444,.03403,0],947:[.19444,.44444,.06389,0],948:[0,.69444,.03819,0],949:[0,.44444,0,0],950:[.19444,.69444,.06215,0],951:[.19444,.44444,.03704,0],952:[0,.69444,.03194,0],953:[0,.44444,0,0],954:[0,.44444,0,0],955:[0,.69444,0,0],956:[.19444,.44444,0,0],957:[0,.44444,.06898,0],958:[.19444,.69444,.03021,0],959:[0,.44444,0,0],960:[0,.44444,.03704,0],961:[.19444,.44444,0,0],962:[.09722,.44444,.07917,0],963:[0,.44444,.03704,0],964:[0,.44444,.13472,0],965:[0,.44444,.03704,0],966:[.19444,.44444,0,0],967:[.19444,.44444,0,0],968:[.19444,.69444,.03704,0],969:[0,.44444,.03704,0],977:[0,.69444,0,0],981:[.19444,.69444,0,0],982:[0,.44444,.03194,0],1009:[.19444,.44444,0,0],1013:[0,.44444,0,0]},"Math-Italic":{47:[.19444,.69444,0,0],65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"Math-Regular":{65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"SansSerif-Regular":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.125,.08333,0,0],45:[0,.44444,0,0],46:[0,.08333,0,0],47:[.25,.75,0,0],48:[0,.65556,0,0],49:[0,.65556,0,0],50:[0,.65556,0,0],51:[0,.65556,0,0],52:[0,.65556,0,0],53:[0,.65556,0,0],54:[0,.65556,0,0],55:[0,.65556,0,0],56:[0,.65556,0,0],57:[0,.65556,0,0],58:[0,.44444,0,0],59:[.125,.44444,0,0],61:[-.13,.37,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.125,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01389,0],87:[0,.69444,.01389,0],88:[0,.69444,0,0],89:[0,.69444,.025,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.09444,.02778,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.06944,0],103:[.19444,.44444,.01389,0],104:[0,.69444,0,0],105:[0,.67937,0,0],106:[.19444,.67937,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,.01389,0],115:[0,.44444,0,0],116:[0,.57143,0,0],117:[0,.44444,0,0],118:[0,.44444,.01389,0],119:[0,.44444,.01389,0],120:[0,.44444,0,0],121:[.19444,.44444,.01389,0],122:[0,.44444,0,0],126:[.35,.32659,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.67659,0,0],772:[0,.60889,0,0],774:[0,.69444,0,0],775:[0,.67937,0,0],776:[0,.67937,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.44444,.02778,0],8212:[0,.44444,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"Script-Regular":{65:[0,.7,.22925,0],66:[0,.7,.04087,0],67:[0,.7,.1689,0],68:[0,.7,.09371,0],69:[0,.7,.18583,0],70:[0,.7,.13634,0],71:[0,.7,.17322,0],72:[0,.7,.29694,0],73:[0,.7,.19189,0],74:[.27778,.7,.19189,0],75:[0,.7,.31259,0],76:[0,.7,.19189,0],77:[0,.7,.15981,0],78:[0,.7,.3525,0],79:[0,.7,.08078,0],80:[0,.7,.08078,0],81:[0,.7,.03305,0],82:[0,.7,.06259,0],83:[0,.7,.19189,0],84:[0,.7,.29087,0],85:[0,.7,.25815,0],86:[0,.7,.27523,0],87:[0,.7,.27523,0],88:[0,.7,.26006,0],89:[0,.7,.2939,0],90:[0,.7,.24037,0]},"Size1-Regular":{40:[.35001,.85,0,0],41:[.35001,.85,0,0],47:[.35001,.85,0,0],91:[.35001,.85,0,0],92:[.35001,.85,0,0],93:[.35001,.85,0,0],123:[.35001,.85,0,0],125:[.35001,.85,0,0],710:[0,.72222,0,0],732:[0,.72222,0,0],770:[0,.72222,0,0],771:[0,.72222,0,0],8214:[-99e-5,.601,0,0],8593:[1e-5,.6,0,0],8595:[1e-5,.6,0,0],8657:[1e-5,.6,0,0],8659:[1e-5,.6,0,0],8719:[.25001,.75,0,0],8720:[.25001,.75,0,0],8721:[.25001,.75,0,0],8730:[.35001,.85,0,0],8739:[-.00599,.606,0,0],8741:[-.00599,.606,0,0],8747:[.30612,.805,.19445,0],8748:[.306,.805,.19445,0],8749:[.306,.805,.19445,0],8750:[.30612,.805,.19445,0],8896:[.25001,.75,0,0],8897:[.25001,.75,0,0],8898:[.25001,.75,0,0],8899:[.25001,.75,0,0],8968:[.35001,.85,0,0],8969:[.35001,.85,0,0],8970:[.35001,.85,0,0],8971:[.35001,.85,0,0],9168:[-99e-5,.601,0,0],10216:[.35001,.85,0,0],10217:[.35001,.85,0,0],10752:[.25001,.75,0,0],10753:[.25001,.75,0,0],10754:[.25001,.75,0,0],10756:[.25001,.75,0,0],10758:[.25001,.75,0,0]},"Size2-Regular":{40:[.65002,1.15,0,0],41:[.65002,1.15,0,0],47:[.65002,1.15,0,0],91:[.65002,1.15,0,0],92:[.65002,1.15,0,0],93:[.65002,1.15,0,0],123:[.65002,1.15,0,0],125:[.65002,1.15,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8719:[.55001,1.05,0,0],8720:[.55001,1.05,0,0],8721:[.55001,1.05,0,0],8730:[.65002,1.15,0,0],8747:[.86225,1.36,.44445,0],8748:[.862,1.36,.44445,0],8749:[.862,1.36,.44445,0],8750:[.86225,1.36,.44445,0],8896:[.55001,1.05,0,0],8897:[.55001,1.05,0,0],8898:[.55001,1.05,0,0],8899:[.55001,1.05,0,0],8968:[.65002,1.15,0,0],8969:[.65002,1.15,0,0],8970:[.65002,1.15,0,0],8971:[.65002,1.15,0,0],10216:[.65002,1.15,0,0],10217:[.65002,1.15,0,0],10752:[.55001,1.05,0,0],10753:[.55001,1.05,0,0],10754:[.55001,1.05,0,0],10756:[.55001,1.05,0,0],10758:[.55001,1.05,0,0]},"Size3-Regular":{40:[.95003,1.45,0,0],41:[.95003,1.45,0,0],47:[.95003,1.45,0,0],91:[.95003,1.45,0,0],92:[.95003,1.45,0,0],93:[.95003,1.45,0,0],123:[.95003,1.45,0,0],125:[.95003,1.45,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8730:[.95003,1.45,0,0],8968:[.95003,1.45,0,0],8969:[.95003,1.45,0,0],8970:[.95003,1.45,0,0],8971:[.95003,1.45,0,0],10216:[.95003,1.45,0,0],10217:[.95003,1.45,0,0]},"Size4-Regular":{40:[1.25003,1.75,0,0],41:[1.25003,1.75,0,0],47:[1.25003,1.75,0,0],91:[1.25003,1.75,0,0],92:[1.25003,1.75,0,0],93:[1.25003,1.75,0,0],123:[1.25003,1.75,0,0],125:[1.25003,1.75,0,0],710:[0,.825,0,0],732:[0,.825,0,0],770:[0,.825,0,0],771:[0,.825,0,0],8730:[1.25003,1.75,0,0],8968:[1.25003,1.75,0,0],8969:[1.25003,1.75,0,0],8970:[1.25003,1.75,0,0],8971:[1.25003,1.75,0,0],9115:[.64502,1.155,0,0],9116:[1e-5,.6,0,0],9117:[.64502,1.155,0,0],9118:[.64502,1.155,0,0],9119:[1e-5,.6,0,0],9120:[.64502,1.155,0,0],9121:[.64502,1.155,0,0],9122:[-99e-5,.601,0,0],9123:[.64502,1.155,0,0],9124:[.64502,1.155,0,0],9125:[-99e-5,.601,0,0],9126:[.64502,1.155,0,0],9127:[1e-5,.9,0,0],9128:[.65002,1.15,0,0],9129:[.90001,0,0,0],9130:[0,.3,0,0],9131:[1e-5,.9,0,0],9132:[.65002,1.15,0,0],9133:[.90001,0,0,0],9143:[.88502,.915,0,0],10216:[1.25003,1.75,0,0],10217:[1.25003,1.75,0,0],57344:[-.00499,.605,0,0],57345:[-.00499,.605,0,0],57680:[0,.12,0,0],57681:[0,.12,0,0],57682:[0,.12,0,0],57683:[0,.12,0,0]},"Typewriter-Regular":{33:[0,.61111,0,0],34:[0,.61111,0,0],35:[0,.61111,0,0],36:[.08333,.69444,0,0],37:[.08333,.69444,0,0],38:[0,.61111,0,0],39:[0,.61111,0,0],40:[.08333,.69444,0,0],41:[.08333,.69444,0,0],42:[0,.52083,0,0],43:[-.08056,.53055,0,0],44:[.13889,.125,0,0],45:[-.08056,.53055,0,0],46:[0,.125,0,0],47:[.08333,.69444,0,0],48:[0,.61111,0,0],49:[0,.61111,0,0],50:[0,.61111,0,0],51:[0,.61111,0,0],52:[0,.61111,0,0],53:[0,.61111,0,0],54:[0,.61111,0,0],55:[0,.61111,0,0],56:[0,.61111,0,0],57:[0,.61111,0,0],58:[0,.43056,0,0],59:[.13889,.43056,0,0],60:[-.05556,.55556,0,0],61:[-.19549,.41562,0,0],62:[-.05556,.55556,0,0],63:[0,.61111,0,0],64:[0,.61111,0,0],65:[0,.61111,0,0],66:[0,.61111,0,0],67:[0,.61111,0,0],68:[0,.61111,0,0],69:[0,.61111,0,0],70:[0,.61111,0,0],71:[0,.61111,0,0],72:[0,.61111,0,0],73:[0,.61111,0,0],74:[0,.61111,0,0],75:[0,.61111,0,0],76:[0,.61111,0,0],77:[0,.61111,0,0],78:[0,.61111,0,0],79:[0,.61111,0,0],80:[0,.61111,0,0],81:[.13889,.61111,0,0],82:[0,.61111,0,0],83:[0,.61111,0,0],84:[0,.61111,0,0],85:[0,.61111,0,0],86:[0,.61111,0,0],87:[0,.61111,0,0],88:[0,.61111,0,0],89:[0,.61111,0,0],90:[0,.61111,0,0],91:[.08333,.69444,0,0],92:[.08333,.69444,0,0],93:[.08333,.69444,0,0],94:[0,.61111,0,0],95:[.09514,0,0,0],96:[0,.61111,0,0],97:[0,.43056,0,0],98:[0,.61111,0,0],99:[0,.43056,0,0],100:[0,.61111,0,0],101:[0,.43056,0,0],102:[0,.61111,0,0],103:[.22222,.43056,0,0],104:[0,.61111,0,0],105:[0,.61111,0,0],106:[.22222,.61111,0,0],107:[0,.61111,0,0],108:[0,.61111,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.22222,.43056,0,0],113:[.22222,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.55358,0,0],117:[0,.43056,0,0],118:[0,.43056,0,0],119:[0,.43056,0,0],120:[0,.43056,0,0],121:[.22222,.43056,0,0],122:[0,.43056,0,0],123:[.08333,.69444,0,0],124:[.08333,.69444,0,0],125:[.08333,.69444,0,0],126:[0,.61111,0,0],127:[0,.61111,0,0],305:[0,.43056,0,0],567:[.22222,.43056,0,0],768:[0,.61111,0,0],769:[0,.61111,0,0],770:[0,.61111,0,0],771:[0,.61111,0,0],772:[0,.56555,0,0],774:[0,.61111,0,0],776:[0,.61111,0,0],778:[0,.61111,0,0],780:[0,.56597,0,0],915:[0,.61111,0,0],916:[0,.61111,0,0],920:[0,.61111,0,0],923:[0,.61111,0,0],926:[0,.61111,0,0],928:[0,.61111,0,0],931:[0,.61111,0,0],933:[0,.61111,0,0],934:[0,.61111,0,0],936:[0,.61111,0,0],937:[0,.61111,0,0],2018:[0,.61111,0,0],2019:[0,.61111,0,0],8242:[0,.61111,0,0]}}},{}],18:[function(e,t,r){var a=e("./utils");var i=e("./ParseError");function n(e,r,a){if(typeof e==="string"){e=[e]}if(typeof r==="number"){r={numArgs:r}}var i={numArgs:r.numArgs,argTypes:r.argTypes,greediness:r.greediness===undefined?1:r.greediness,allowedInText:!!r.allowedInText,numOptionalArgs:r.numOptionalArgs||0,handler:a};for(var n=0;n<e.length;++n){t.exports[e[n]]=i}}n("\\sqrt",{numArgs:1,numOptionalArgs:1},function(e,t){var r=t[0];var a=t[1];return{type:"sqrt",body:a,index:r}});n("\\text",{numArgs:1,argTypes:["text"],greediness:2},function(e,t){var r=t[0];var a;if(r.type==="ordgroup"){a=r.value}else{a=[r]}return{type:"text",body:a}});n("\\color",{numArgs:2,allowedInText:true,greediness:3,argTypes:["color","original"]},function(e,t){var r=t[0];var a=t[1];var i;if(a.type==="ordgroup"){i=a.value}else{i=[a]}return{type:"color",color:r.value,value:i}});n("\\overline",{numArgs:1},function(e,t){var r=t[0];return{type:"overline",body:r}});n("\\underline",{numArgs:1},function(e,t){var r=t[0];return{type:"underline",body:r}});n("\\rule",{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},function(e,t){var r=t[0];var a=t[1];var i=t[2];return{type:"rule",shift:r&&r.value,width:a.value,height:i.value}});n("\\KaTeX",{numArgs:0},function(e){return{type:"katex"}});n("\\phantom",{numArgs:1},function(e,t){var r=t[0];var a;if(r.type==="ordgroup"){a=r.value}else{a=[r]}return{type:"phantom",value:a}});var s={"\\bigl":{type:"open",size:1},"\\Bigl":{type:"open",size:2},"\\biggl":{type:"open",size:3},"\\Biggl":{type:"open",size:4},"\\bigr":{type:"close",size:1},"\\Bigr":{type:"close",size:2},"\\biggr":{type:"close",size:3},"\\Biggr":{type:"close",size:4},"\\bigm":{type:"rel",size:1},"\\Bigm":{type:"rel",size:2},"\\biggm":{type:"rel",size:3},"\\Biggm":{type:"rel",size:4},"\\big":{type:"textord",size:1},"\\Big":{type:"textord",size:2},"\\bigg":{type:"textord",size:3},"\\Bigg":{type:"textord",size:4}};var l=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","<",">","\\langle","\\rangle","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];var o={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak"};n(["\\blue","\\orange","\\pink","\\red","\\green","\\gray","\\purple","\\blueA","\\blueB","\\blueC","\\blueD","\\blueE","\\tealA","\\tealB","\\tealC","\\tealD","\\tealE","\\greenA","\\greenB","\\greenC","\\greenD","\\greenE","\\goldA","\\goldB","\\goldC","\\goldD","\\goldE","\\redA","\\redB","\\redC","\\redD","\\redE","\\maroonA","\\maroonB","\\maroonC","\\maroonD","\\maroonE","\\purpleA","\\purpleB","\\purpleC","\\purpleD","\\purpleE","\\mintA","\\mintB","\\mintC","\\grayA","\\grayB","\\grayC","\\grayD","\\grayE","\\grayF","\\grayG","\\grayH","\\grayI","\\kaBlue","\\kaGreen"],{numArgs:1,allowedInText:true,greediness:3},function(e,t){var r=t[0];var a;if(r.type==="ordgroup"){a=r.value}else{a=[r]}return{type:"color",color:"katex-"+e.funcName.slice(1),value:a}});n(["\\arcsin","\\arccos","\\arctan","\\arg","\\cos","\\cosh","\\cot","\\coth","\\csc","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\tan","\\tanh"],{numArgs:0},function(e){return{type:"op",limits:false,symbol:false,body:e.funcName}});n(["\\det","\\gcd","\\inf","\\lim","\\liminf","\\limsup","\\max","\\min","\\Pr","\\sup"],{numArgs:0},function(e){return{type:"op",limits:true,symbol:false,body:e.funcName}});n(["\\int","\\iint","\\iiint","\\oint"],{numArgs:0},function(e){return{type:"op",limits:false,symbol:true,body:e.funcName}});n(["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint"],{
numArgs:0},function(e){return{type:"op",limits:true,symbol:true,body:e.funcName}});n(["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom"],{numArgs:2,greediness:2},function(e,t){var r=t[0];var a=t[1];var i;var n=null;var s=null;var l="auto";switch(e.funcName){case"\\dfrac":case"\\frac":case"\\tfrac":i=true;break;case"\\dbinom":case"\\binom":case"\\tbinom":i=false;n="(";s=")";break;default:throw new Error("Unrecognized genfrac command")}switch(e.funcName){case"\\dfrac":case"\\dbinom":l="display";break;case"\\tfrac":case"\\tbinom":l="text";break}return{type:"genfrac",numer:r,denom:a,hasBarLine:i,leftDelim:n,rightDelim:s,size:l}});n(["\\llap","\\rlap"],{numArgs:1,allowedInText:true},function(e,t){var r=t[0];return{type:e.funcName.slice(1),body:r}});n(["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg","\\left","\\right"],{numArgs:1},function(e,t){var r=t[0];if(!a.contains(l,r.value)){throw new i("Invalid delimiter: '"+r.value+"' after '"+e.funcName+"'",e.lexer,e.positions[1])}if(e.funcName==="\\left"||e.funcName==="\\right"){return{type:"leftright",value:r.value}}else{return{type:"delimsizing",size:s[e.funcName].size,delimType:s[e.funcName].type,value:r.value}}});n(["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],0,null);n(["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],0,null);n(["\\mathrm","\\mathit","\\mathbf","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],{numArgs:1,greediness:2},function(e,t){var r=t[0];var a=e.funcName;if(a in o){a=o[a]}return{type:"font",font:a.slice(1),body:r}});n(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot"],{numArgs:1},function(e,t){var r=t[0];return{type:"accent",accent:e.funcName,base:r}});n(["\\over","\\choose"],{numArgs:0},function(e){var t;switch(e.funcName){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",replaceWith:t}});n(["\\\\","\\cr"],{numArgs:0,numOptionalArgs:1,argTypes:["size"]},function(e,t){var r=t[0];return{type:"cr",size:r}});n(["\\begin","\\end"],{numArgs:1,argTypes:["text"]},function(e,t){var r=t[0];if(r.type!=="ordgroup"){throw new i("Invalid environment name",e.lexer,e.positions[1])}var a="";for(var n=0;n<r.value.length;++n){a+=r.value[n].value}return{type:"environment",name:a,namepos:e.positions[1]}})},{"./ParseError":5,"./utils":23}],19:[function(e,t,r){var a=e("./utils");function i(e,t){this.type=e;this.attributes={};this.children=t||[]}i.prototype.setAttribute=function(e,t){this.attributes[e]=t};i.prototype.toNode=function(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var t in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,t)){e.setAttribute(t,this.attributes[t])}}for(var r=0;r<this.children.length;r++){e.appendChild(this.children[r].toNode())}return e};i.prototype.toMarkup=function(){var e="<"+this.type;for(var t in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,t)){e+=" "+t+'="';e+=a.escape(this.attributes[t]);e+='"'}}e+=">";for(var r=0;r<this.children.length;r++){e+=this.children[r].toMarkup()}e+="</"+this.type+">";return e};function n(e){this.text=e}n.prototype.toNode=function(){return document.createTextNode(this.text)};n.prototype.toMarkup=function(){return a.escape(this.text)};t.exports={MathNode:i,TextNode:n}},{"./utils":23}],20:[function(e,t,r){function a(e,t,r){this.type=e;this.value=t;this.mode=r}t.exports={ParseNode:a}},{}],21:[function(e,t,r){var a=e("./Parser");var i=function(e,t){var r=new a(e,t);return r.parse()};t.exports=i},{"./Parser":6}],22:[function(e,t,r){t.exports={math:{},text:{}};function a(e,r,a,i,n){t.exports[e][n]={font:r,group:a,replace:i}}var i="math";var n="text";var s="main";var l="ams";var o="accent";var u="bin";var p="close";var h="inner";var c="mathord";var v="op";var m="open";var f="punct";var d="rel";var g="spacing";var y="textord";a(i,s,d,"\u2261","\\equiv");a(i,s,d,"\u227a","\\prec");a(i,s,d,"\u227b","\\succ");a(i,s,d,"\u223c","\\sim");a(i,s,d,"\u22a5","\\perp");a(i,s,d,"\u2aaf","\\preceq");a(i,s,d,"\u2ab0","\\succeq");a(i,s,d,"\u2243","\\simeq");a(i,s,d,"\u2223","\\mid");a(i,s,d,"\u226a","\\ll");a(i,s,d,"\u226b","\\gg");a(i,s,d,"\u224d","\\asymp");a(i,s,d,"\u2225","\\parallel");a(i,s,d,"\u22c8","\\bowtie");a(i,s,d,"\u2323","\\smile");a(i,s,d,"\u2291","\\sqsubseteq");a(i,s,d,"\u2292","\\sqsupseteq");a(i,s,d,"\u2250","\\doteq");a(i,s,d,"\u2322","\\frown");a(i,s,d,"\u220b","\\ni");a(i,s,d,"\u221d","\\propto");a(i,s,d,"\u22a2","\\vdash");a(i,s,d,"\u22a3","\\dashv");a(i,s,d,"\u220b","\\owns");a(i,s,f,".","\\ldotp");a(i,s,f,"\u22c5","\\cdotp");a(i,s,y,"#","\\#");a(i,s,y,"&","\\&");a(i,s,y,"\u2135","\\aleph");a(i,s,y,"\u2200","\\forall");a(i,s,y,"\u210f","\\hbar");a(i,s,y,"\u2203","\\exists");a(i,s,y,"\u2207","\\nabla");a(i,s,y,"\u266d","\\flat");a(i,s,y,"\u2113","\\ell");a(i,s,y,"\u266e","\\natural");a(i,s,y,"\u2663","\\clubsuit");a(i,s,y,"\u2118","\\wp");a(i,s,y,"\u266f","\\sharp");a(i,s,y,"\u2662","\\diamondsuit");a(i,s,y,"\u211c","\\Re");a(i,s,y,"\u2661","\\heartsuit");a(i,s,y,"\u2111","\\Im");a(i,s,y,"\u2660","\\spadesuit");a(i,s,y,"\u2020","\\dag");a(i,s,y,"\u2021","\\ddag");a(i,s,p,"\u23b1","\\rmoustache");a(i,s,m,"\u23b0","\\lmoustache");a(i,s,p,"\u27ef","\\rgroup");a(i,s,m,"\u27ee","\\lgroup");a(i,s,u,"\u2213","\\mp");a(i,s,u,"\u2296","\\ominus");a(i,s,u,"\u228e","\\uplus");a(i,s,u,"\u2293","\\sqcap");a(i,s,u,"\u2217","\\ast");a(i,s,u,"\u2294","\\sqcup");a(i,s,u,"\u25ef","\\bigcirc");a(i,s,u,"\u2219","\\bullet");a(i,s,u,"\u2021","\\ddagger");a(i,s,u,"\u2240","\\wr");a(i,s,u,"\u2a3f","\\amalg");a(i,s,d,"\u27f5","\\longleftarrow");a(i,s,d,"\u21d0","\\Leftarrow");a(i,s,d,"\u27f8","\\Longleftarrow");a(i,s,d,"\u27f6","\\longrightarrow");a(i,s,d,"\u21d2","\\Rightarrow");a(i,s,d,"\u27f9","\\Longrightarrow");a(i,s,d,"\u2194","\\leftrightarrow");a(i,s,d,"\u27f7","\\longleftrightarrow");a(i,s,d,"\u21d4","\\Leftrightarrow");a(i,s,d,"\u27fa","\\Longleftrightarrow");a(i,s,d,"\u21a6","\\mapsto");a(i,s,d,"\u27fc","\\longmapsto");a(i,s,d,"\u2197","\\nearrow");a(i,s,d,"\u21a9","\\hookleftarrow");a(i,s,d,"\u21aa","\\hookrightarrow");a(i,s,d,"\u2198","\\searrow");a(i,s,d,"\u21bc","\\leftharpoonup");a(i,s,d,"\u21c0","\\rightharpoonup");a(i,s,d,"\u2199","\\swarrow");a(i,s,d,"\u21bd","\\leftharpoondown");a(i,s,d,"\u21c1","\\rightharpoondown");a(i,s,d,"\u2196","\\nwarrow");a(i,s,d,"\u21cc","\\rightleftharpoons");a(i,l,d,"\u226e","\\nless");a(i,l,d,"\ue010","\\nleqslant");a(i,l,d,"\ue011","\\nleqq");a(i,l,d,"\u2a87","\\lneq");a(i,l,d,"\u2268","\\lneqq");a(i,l,d,"\ue00c","\\lvertneqq");a(i,l,d,"\u22e6","\\lnsim");a(i,l,d,"\u2a89","\\lnapprox");a(i,l,d,"\u2280","\\nprec");a(i,l,d,"\u22e0","\\npreceq");a(i,l,d,"\u22e8","\\precnsim");a(i,l,d,"\u2ab9","\\precnapprox");a(i,l,d,"\u2241","\\nsim");a(i,l,d,"\ue006","\\nshortmid");a(i,l,d,"\u2224","\\nmid");a(i,l,d,"\u22ac","\\nvdash");a(i,l,d,"\u22ad","\\nvDash");a(i,l,d,"\u22ea","\\ntriangleleft");a(i,l,d,"\u22ec","\\ntrianglelefteq");a(i,l,d,"\u228a","\\subsetneq");a(i,l,d,"\ue01a","\\varsubsetneq");a(i,l,d,"\u2acb","\\subsetneqq");a(i,l,d,"\ue017","\\varsubsetneqq");a(i,l,d,"\u226f","\\ngtr");a(i,l,d,"\ue00f","\\ngeqslant");a(i,l,d,"\ue00e","\\ngeqq");a(i,l,d,"\u2a88","\\gneq");a(i,l,d,"\u2269","\\gneqq");a(i,l,d,"\ue00d","\\gvertneqq");a(i,l,d,"\u22e7","\\gnsim");a(i,l,d,"\u2a8a","\\gnapprox");a(i,l,d,"\u2281","\\nsucc");a(i,l,d,"\u22e1","\\nsucceq");a(i,l,d,"\u22e9","\\succnsim");a(i,l,d,"\u2aba","\\succnapprox");a(i,l,d,"\u2246","\\ncong");a(i,l,d,"\ue007","\\nshortparallel");a(i,l,d,"\u2226","\\nparallel");a(i,l,d,"\u22af","\\nVDash");a(i,l,d,"\u22eb","\\ntriangleright");a(i,l,d,"\u22ed","\\ntrianglerighteq");a(i,l,d,"\ue018","\\nsupseteqq");a(i,l,d,"\u228b","\\supsetneq");a(i,l,d,"\ue01b","\\varsupsetneq");a(i,l,d,"\u2acc","\\supsetneqq");a(i,l,d,"\ue019","\\varsupsetneqq");a(i,l,d,"\u22ae","\\nVdash");a(i,l,d,"\u2ab5","\\precneqq");a(i,l,d,"\u2ab6","\\succneqq");a(i,l,d,"\ue016","\\nsubseteqq");a(i,l,u,"\u22b4","\\unlhd");a(i,l,u,"\u22b5","\\unrhd");a(i,l,d,"\u219a","\\nleftarrow");a(i,l,d,"\u219b","\\nrightarrow");a(i,l,d,"\u21cd","\\nLeftarrow");a(i,l,d,"\u21cf","\\nRightarrow");a(i,l,d,"\u21ae","\\nleftrightarrow");a(i,l,d,"\u21ce","\\nLeftrightarrow");a(i,l,d,"\u25b3","\\vartriangle");a(i,l,y,"\u210f","\\hslash");a(i,l,y,"\u25bd","\\triangledown");a(i,l,y,"\u25ca","\\lozenge");a(i,l,y,"\u24c8","\\circledS");a(i,l,y,"\xae","\\circledR");a(i,l,y,"\u2221","\\measuredangle");a(i,l,y,"\u2204","\\nexists");a(i,l,y,"\u2127","\\mho");a(i,l,y,"\u2132","\\Finv");a(i,l,y,"\u2141","\\Game");a(i,l,y,"k","\\Bbbk");a(i,l,y,"\u2035","\\backprime");a(i,l,y,"\u25b2","\\blacktriangle");a(i,l,y,"\u25bc","\\blacktriangledown");a(i,l,y,"\u25a0","\\blacksquare");a(i,l,y,"\u29eb","\\blacklozenge");a(i,l,y,"\u2605","\\bigstar");a(i,l,y,"\u2222","\\sphericalangle");a(i,l,y,"\u2201","\\complement");a(i,l,y,"\xf0","\\eth");a(i,l,y,"\u2571","\\diagup");a(i,l,y,"\u2572","\\diagdown");a(i,l,y,"\u25a1","\\square");a(i,l,y,"\u25a1","\\Box");a(i,l,y,"\u25ca","\\Diamond");a(i,l,y,"\xa5","\\yen");a(i,l,y,"\u2713","\\checkmark");a(i,l,y,"\u2136","\\beth");a(i,l,y,"\u2138","\\daleth");a(i,l,y,"\u2137","\\gimel");a(i,l,y,"\u03dd","\\digamma");a(i,l,y,"\u03f0","\\varkappa");a(i,l,m,"\u250c","\\ulcorner");a(i,l,p,"\u2510","\\urcorner");a(i,l,m,"\u2514","\\llcorner");a(i,l,p,"\u2518","\\lrcorner");a(i,l,d,"\u2266","\\leqq");a(i,l,d,"\u2a7d","\\leqslant");a(i,l,d,"\u2a95","\\eqslantless");a(i,l,d,"\u2272","\\lesssim");a(i,l,d,"\u2a85","\\lessapprox");a(i,l,d,"\u224a","\\approxeq");a(i,l,u,"\u22d6","\\lessdot");a(i,l,d,"\u22d8","\\lll");a(i,l,d,"\u2276","\\lessgtr");a(i,l,d,"\u22da","\\lesseqgtr");a(i,l,d,"\u2a8b","\\lesseqqgtr");a(i,l,d,"\u2251","\\doteqdot");a(i,l,d,"\u2253","\\risingdotseq");a(i,l,d,"\u2252","\\fallingdotseq");a(i,l,d,"\u223d","\\backsim");a(i,l,d,"\u22cd","\\backsimeq");a(i,l,d,"\u2ac5","\\subseteqq");a(i,l,d,"\u22d0","\\Subset");a(i,l,d,"\u228f","\\sqsubset");a(i,l,d,"\u227c","\\preccurlyeq");a(i,l,d,"\u22de","\\curlyeqprec");a(i,l,d,"\u227e","\\precsim");a(i,l,d,"\u2ab7","\\precapprox");a(i,l,d,"\u22b2","\\vartriangleleft");a(i,l,d,"\u22b4","\\trianglelefteq");a(i,l,d,"\u22a8","\\vDash");a(i,l,d,"\u22aa","\\Vvdash");a(i,l,d,"\u2323","\\smallsmile");a(i,l,d,"\u2322","\\smallfrown");a(i,l,d,"\u224f","\\bumpeq");a(i,l,d,"\u224e","\\Bumpeq");a(i,l,d,"\u2267","\\geqq");a(i,l,d,"\u2a7e","\\geqslant");a(i,l,d,"\u2a96","\\eqslantgtr");a(i,l,d,"\u2273","\\gtrsim");a(i,l,d,"\u2a86","\\gtrapprox");a(i,l,u,"\u22d7","\\gtrdot");a(i,l,d,"\u22d9","\\ggg");a(i,l,d,"\u2277","\\gtrless");a(i,l,d,"\u22db","\\gtreqless");a(i,l,d,"\u2a8c","\\gtreqqless");a(i,l,d,"\u2256","\\eqcirc");a(i,l,d,"\u2257","\\circeq");a(i,l,d,"\u225c","\\triangleq");a(i,l,d,"\u223c","\\thicksim");a(i,l,d,"\u2248","\\thickapprox");a(i,l,d,"\u2ac6","\\supseteqq");a(i,l,d,"\u22d1","\\Supset");a(i,l,d,"\u2290","\\sqsupset");a(i,l,d,"\u227d","\\succcurlyeq");a(i,l,d,"\u22df","\\curlyeqsucc");a(i,l,d,"\u227f","\\succsim");a(i,l,d,"\u2ab8","\\succapprox");a(i,l,d,"\u22b3","\\vartriangleright");a(i,l,d,"\u22b5","\\trianglerighteq");a(i,l,d,"\u22a9","\\Vdash");a(i,l,d,"\u2223","\\shortmid");a(i,l,d,"\u2225","\\shortparallel");a(i,l,d,"\u226c","\\between");a(i,l,d,"\u22d4","\\pitchfork");a(i,l,d,"\u221d","\\varpropto");a(i,l,d,"\u25c0","\\blacktriangleleft");a(i,l,d,"\u2234","\\therefore");a(i,l,d,"\u220d","\\backepsilon");a(i,l,d,"\u25b6","\\blacktriangleright");a(i,l,d,"\u2235","\\because");a(i,l,d,"\u22d8","\\llless");a(i,l,d,"\u22d9","\\gggtr");a(i,l,u,"\u22b2","\\lhd");a(i,l,u,"\u22b3","\\rhd");a(i,l,d,"\u2242","\\eqsim");a(i,s,d,"\u22c8","\\Join");a(i,l,d,"\u2251","\\Doteq");a(i,l,u,"\u2214","\\dotplus");a(i,l,u,"\u2216","\\smallsetminus");a(i,l,u,"\u22d2","\\Cap");a(i,l,u,"\u22d3","\\Cup");a(i,l,u,"\u2a5e","\\doublebarwedge");a(i,l,u,"\u229f","\\boxminus");a(i,l,u,"\u229e","\\boxplus");a(i,l,u,"\u22c7","\\divideontimes");a(i,l,u,"\u22c9","\\ltimes");a(i,l,u,"\u22ca","\\rtimes");a(i,l,u,"\u22cb","\\leftthreetimes");a(i,l,u,"\u22cc","\\rightthreetimes");a(i,l,u,"\u22cf","\\curlywedge");a(i,l,u,"\u22ce","\\curlyvee");a(i,l,u,"\u229d","\\circleddash");a(i,l,u,"\u229b","\\circledast");a(i,l,u,"\u22c5","\\centerdot");a(i,l,u,"\u22ba","\\intercal");a(i,l,u,"\u22d2","\\doublecap");a(i,l,u,"\u22d3","\\doublecup");a(i,l,u,"\u22a0","\\boxtimes");a(i,l,d,"\u21e2","\\dashrightarrow");a(i,l,d,"\u21e0","\\dashleftarrow");a(i,l,d,"\u21c7","\\leftleftarrows");a(i,l,d,"\u21c6","\\leftrightarrows");a(i,l,d,"\u21da","\\Lleftarrow");a(i,l,d,"\u219e","\\twoheadleftarrow");a(i,l,d,"\u21a2","\\leftarrowtail");a(i,l,d,"\u21ab","\\looparrowleft");a(i,l,d,"\u21cb","\\leftrightharpoons");a(i,l,d,"\u21b6","\\curvearrowleft");a(i,l,d,"\u21ba","\\circlearrowleft");a(i,l,d,"\u21b0","\\Lsh");a(i,l,d,"\u21c8","\\upuparrows");a(i,l,d,"\u21bf","\\upharpoonleft");a(i,l,d,"\u21c3","\\downharpoonleft");a(i,l,d,"\u22b8","\\multimap");a(i,l,d,"\u21ad","\\leftrightsquigarrow");a(i,l,d,"\u21c9","\\rightrightarrows");a(i,l,d,"\u21c4","\\rightleftarrows");a(i,l,d,"\u21a0","\\twoheadrightarrow");a(i,l,d,"\u21a3","\\rightarrowtail");a(i,l,d,"\u21ac","\\looparrowright");a(i,l,d,"\u21b7","\\curvearrowright");a(i,l,d,"\u21bb","\\circlearrowright");a(i,l,d,"\u21b1","\\Rsh");a(i,l,d,"\u21ca","\\downdownarrows");a(i,l,d,"\u21be","\\upharpoonright");a(i,l,d,"\u21c2","\\downharpoonright");a(i,l,d,"\u21dd","\\rightsquigarrow");a(i,l,d,"\u21dd","\\leadsto");a(i,l,d,"\u21db","\\Rrightarrow");a(i,l,d,"\u21be","\\restriction");a(i,s,y,"\u2018","`");a(i,s,y,"$","\\$");a(i,s,y,"%","\\%");a(i,s,y,"_","\\_");a(i,s,y,"\u2220","\\angle");a(i,s,y,"\u221e","\\infty");a(i,s,y,"\u2032","\\prime");a(i,s,y,"\u25b3","\\triangle");a(i,s,y,"\u0393","\\Gamma");a(i,s,y,"\u0394","\\Delta");a(i,s,y,"\u0398","\\Theta");a(i,s,y,"\u039b","\\Lambda");a(i,s,y,"\u039e","\\Xi");a(i,s,y,"\u03a0","\\Pi");a(i,s,y,"\u03a3","\\Sigma");a(i,s,y,"\u03a5","\\Upsilon");a(i,s,y,"\u03a6","\\Phi");a(i,s,y,"\u03a8","\\Psi");a(i,s,y,"\u03a9","\\Omega");a(i,s,y,"\xac","\\neg");a(i,s,y,"\xac","\\lnot");a(i,s,y,"\u22a4","\\top");a(i,s,y,"\u22a5","\\bot");a(i,s,y,"\u2205","\\emptyset");a(i,l,y,"\u2205","\\varnothing");a(i,s,c,"\u03b1","\\alpha");a(i,s,c,"\u03b2","\\beta");a(i,s,c,"\u03b3","\\gamma");a(i,s,c,"\u03b4","\\delta");a(i,s,c,"\u03f5","\\epsilon");a(i,s,c,"\u03b6","\\zeta");a(i,s,c,"\u03b7","\\eta");a(i,s,c,"\u03b8","\\theta");a(i,s,c,"\u03b9","\\iota");a(i,s,c,"\u03ba","\\kappa");a(i,s,c,"\u03bb","\\lambda");a(i,s,c,"\u03bc","\\mu");a(i,s,c,"\u03bd","\\nu");a(i,s,c,"\u03be","\\xi");a(i,s,c,"o","\\omicron");a(i,s,c,"\u03c0","\\pi");a(i,s,c,"\u03c1","\\rho");a(i,s,c,"\u03c3","\\sigma");a(i,s,c,"\u03c4","\\tau");a(i,s,c,"\u03c5","\\upsilon");a(i,s,c,"\u03d5","\\phi");a(i,s,c,"\u03c7","\\chi");a(i,s,c,"\u03c8","\\psi");a(i,s,c,"\u03c9","\\omega");a(i,s,c,"\u03b5","\\varepsilon");a(i,s,c,"\u03d1","\\vartheta");a(i,s,c,"\u03d6","\\varpi");a(i,s,c,"\u03f1","\\varrho");a(i,s,c,"\u03c2","\\varsigma");a(i,s,c,"\u03c6","\\varphi");a(i,s,u,"\u2217","*");a(i,s,u,"+","+");a(i,s,u,"\u2212","-");a(i,s,u,"\u22c5","\\cdot");a(i,s,u,"\u2218","\\circ");a(i,s,u,"\xf7","\\div");a(i,s,u,"\xb1","\\pm");a(i,s,u,"\xd7","\\times");a(i,s,u,"\u2229","\\cap");a(i,s,u,"\u222a","\\cup");a(i,s,u,"\u2216","\\setminus");a(i,s,u,"\u2227","\\land");a(i,s,u,"\u2228","\\lor");a(i,s,u,"\u2227","\\wedge");a(i,s,u,"\u2228","\\vee");a(i,s,y,"\u221a","\\surd");a(i,s,m,"(","(");a(i,s,m,"[","[");a(i,s,m,"\u27e8","\\langle");a(i,s,m,"\u2223","\\lvert");a(i,s,m,"\u2225","\\lVert");a(i,s,p,")",")");a(i,s,p,"]","]");a(i,s,p,"?","?");a(i,s,p,"!","!");a(i,s,p,"\u27e9","\\rangle");a(i,s,p,"\u2223","\\rvert");a(i,s,p,"\u2225","\\rVert");a(i,s,d,"=","=");a(i,s,d,"<","<");a(i,s,d,">",">");a(i,s,d,":",":");a(i,s,d,"\u2248","\\approx");a(i,s,d,"\u2245","\\cong");a(i,s,d,"\u2265","\\ge");a(i,s,d,"\u2265","\\geq");a(i,s,d,"\u2190","\\gets");a(i,s,d,">","\\gt");a(i,s,d,"\u2208","\\in");a(i,s,d,"\u2209","\\notin");a(i,s,d,"\u2282","\\subset");a(i,s,d,"\u2283","\\supset");a(i,s,d,"\u2286","\\subseteq");a(i,s,d,"\u2287","\\supseteq");a(i,l,d,"\u2288","\\nsubseteq");a(i,l,d,"\u2289","\\nsupseteq");a(i,s,d,"\u22a8","\\models");a(i,s,d,"\u2190","\\leftarrow");a(i,s,d,"\u2264","\\le");a(i,s,d,"\u2264","\\leq");a(i,s,d,"<","\\lt");a(i,s,d,"\u2260","\\ne");a(i,s,d,"\u2260","\\neq");a(i,s,d,"\u2192","\\rightarrow");a(i,s,d,"\u2192","\\to");a(i,l,d,"\u2271","\\ngeq");a(i,l,d,"\u2270","\\nleq");a(i,s,g,null,"\\!");a(i,s,g,"\xa0","\\ ");a(i,s,g,"\xa0","~");a(i,s,g,null,"\\,");a(i,s,g,null,"\\:");a(i,s,g,null,"\\;");a(i,s,g,null,"\\enspace");a(i,s,g,null,"\\qquad");a(i,s,g,null,"\\quad");a(i,s,g,"\xa0","\\space");a(i,s,f,",",",");a(i,s,f,";",";");a(i,s,f,":","\\colon");a(i,l,u,"\u22bc","\\barwedge");a(i,l,u,"\u22bb","\\veebar");a(i,s,u,"\u2299","\\odot");a(i,s,u,"\u2295","\\oplus");a(i,s,u,"\u2297","\\otimes");a(i,s,y,"\u2202","\\partial");a(i,s,u,"\u2298","\\oslash");a(i,l,u,"\u229a","\\circledcirc");a(i,l,u,"\u22a1","\\boxdot");a(i,s,u,"\u25b3","\\bigtriangleup");a(i,s,u,"\u25bd","\\bigtriangledown");a(i,s,u,"\u2020","\\dagger");a(i,s,u,"\u22c4","\\diamond");a(i,s,u,"\u22c6","\\star");a(i,s,u,"\u25c3","\\triangleleft");a(i,s,u,"\u25b9","\\triangleright");a(i,s,m,"{","\\{");a(i,s,p,"}","\\}");a(i,s,m,"{","\\lbrace");a(i,s,p,"}","\\rbrace");a(i,s,m,"[","\\lbrack");a(i,s,p,"]","\\rbrack");a(i,s,m,"\u230a","\\lfloor");a(i,s,p,"\u230b","\\rfloor");a(i,s,m,"\u2308","\\lceil");a(i,s,p,"\u2309","\\rceil");a(i,s,y,"\\","\\backslash");a(i,s,y,"\u2223","|");a(i,s,y,"\u2223","\\vert");a(i,s,y,"\u2225","\\|");a(i,s,y,"\u2225","\\Vert");a(i,s,d,"\u2191","\\uparrow");a(i,s,d,"\u21d1","\\Uparrow");a(i,s,d,"\u2193","\\downarrow");a(i,s,d,"\u21d3","\\Downarrow");a(i,s,d,"\u2195","\\updownarrow");a(i,s,d,"\u21d5","\\Updownarrow");a(i,i,v,"\u2210","\\coprod");a(i,i,v,"\u22c1","\\bigvee");a(i,i,v,"\u22c0","\\bigwedge");a(i,i,v,"\u2a04","\\biguplus");a(i,i,v,"\u22c2","\\bigcap");a(i,i,v,"\u22c3","\\bigcup");a(i,i,v,"\u222b","\\int");a(i,i,v,"\u222b","\\intop");a(i,i,v,"\u222c","\\iint");a(i,i,v,"\u222d","\\iiint");a(i,i,v,"\u220f","\\prod");a(i,i,v,"\u2211","\\sum");a(i,i,v,"\u2a02","\\bigotimes");a(i,i,v,"\u2a01","\\bigoplus");a(i,i,v,"\u2a00","\\bigodot");a(i,i,v,"\u222e","\\oint");a(i,i,v,"\u2a06","\\bigsqcup");a(i,i,v,"\u222b","\\smallint");a(i,s,h,"\u2026","\\ldots");a(i,s,h,"\u22ef","\\cdots");a(i,s,h,"\u22f1","\\ddots");a(i,s,y,"\u22ee","\\vdots");a(i,s,o,"\xb4","\\acute");a(i,s,o,"`","\\grave");a(i,s,o,"\xa8","\\ddot");a(i,s,o,"~","\\tilde");a(i,s,o,"\xaf","\\bar");a(i,s,o,"\u02d8","\\breve");a(i,s,o,"\u02c7","\\check");a(i,s,o,"^","\\hat");a(i,s,o,"\u20d7","\\vec");a(i,s,o,"\u02d9","\\dot");a(i,s,c,"\u0131","\\imath");a(i,s,c,"\u0237","\\jmath");a(n,s,g,"\xa0","\\ ");a(n,s,g,"\xa0"," ");a(n,s,g,"\xa0","~");var b;var x;var w='0123456789/@."';for(b=0;b<w.length;b++){x=w.charAt(b);a(i,s,y,x,x)}var k="0123456789`!@*()-=+[]'\";:?/.,";for(b=0;b<k.length;b++){x=k.charAt(b);a(n,s,y,x,x)}var z="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(b=0;b<z.length;b++){x=z.charAt(b);a(i,s,c,x,x);a(n,s,y,x,x)}},{}],23:[function(e,t,r){var a=Array.prototype.indexOf;var i=function(e,t){if(e==null){return-1}if(a&&e.indexOf===a){return e.indexOf(t)}var r=0;var i=e.length;for(;r<i;r++){if(e[r]===t){return r}}return-1};var n=function(e,t){return i(e,t)!==-1};var s=function(e,t){return e===undefined?t:e};var l=/([A-Z])/g;var o=function(e){return e.replace(l,"-$1").toLowerCase()};var u={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"};var p=/[&><"']/g;function h(e){return u[e]}function c(e){return(""+e).replace(p,h)}var v;if(typeof document!=="undefined"){var m=document.createElement("span");if("textContent"in m){v=function(e,t){e.textContent=t}}else{v=function(e,t){e.innerText=t}}}function f(e){v(e,"")}t.exports={contains:n,deflt:s,escape:c,hyphenate:o,indexOf:i,setTextContent:v,clearNode:f}},{}]},{},[1])(1)});
(function(e){if("function"==typeof bootstrap)bootstrap("rendermathinelement",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeRenderMathInElement=e}else"undefined"!=typeof window?window.renderMathInElement=e():global.renderMathInElement=e()})(function(){var e,t,r,n,a;return function i(e,t,r){function n(o,l){if(!t[o]){if(!e[o]){var f=typeof require=="function"&&require;if(!l&&f)return f(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var s=t[o]={exports:{}};e[o][0].call(s.exports,function(t){var r=e[o][1][t];return n(r?r:t)},s,s.exports,i,e,t,r)}return t[o].exports}var a=typeof require=="function"&&require;for(var o=0;o<r.length;o++)n(r[o]);return n}({1:[function(e,t,r){var n=e("./splitAtDelimiters");var a=function(e,t){var r=[{type:"text",data:e}];for(var a=0;a<t.length;a++){var i=t[a];r=n(r,i.left,i.right,i.display||false)}return r};var i=function(e,t){var r=a(e,t);var n=document.createDocumentFragment();for(var i=0;i<r.length;i++){if(r[i].type==="text"){n.appendChild(document.createTextNode(r[i].data))}else{var o=document.createElement("span");var l=r[i].data;katex.render(l,o,{displayMode:r[i].display});n.appendChild(o)}}return n};var o=function(e,t,r){for(var n=0;n<e.childNodes.length;n++){var a=e.childNodes[n];if(a.nodeType===3){var l=i(a.textContent,t);n+=l.childNodes.length-1;e.replaceChild(l,a)}else if(a.nodeType===1){var f=r.indexOf(a.nodeName.toLowerCase())===-1;if(f){o(a,t,r)}}else{}}};var l={delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false}],ignoredTags:["script","noscript","style","textarea","pre","code"]};var f=function(e){var t,r;for(var n=1,a=arguments.length;n<a;n++){t=arguments[n];for(r in t){if(Object.prototype.hasOwnProperty.call(t,r)){e[r]=t[r]}}}return e};var s=function(e,t){if(!e){throw new Error("No element provided to render")}t=f({},l,t);o(e,t.delimiters,t.ignoredTags)};t.exports=s},{"./splitAtDelimiters":2}],2:[function(e,t,r){var n=function(e,t,r){var n=r;var a=0;var i=e.length;while(n<t.length){var o=t[n];if(a<=0&&t.slice(n,n+i)===e){return n}else if(o==="\\"){n++}else if(o==="{"){a++}else if(o==="}"){a--}n++}return-1};var a=function(e,t,r,a){var i=[];for(var o=0;o<e.length;o++){if(e[o].type==="text"){var l=e[o].data;var f=true;var s=0;var d;d=l.indexOf(t);if(d!==-1){s=d;i.push({type:"text",data:l.slice(0,s)});f=false}while(true){if(f){d=l.indexOf(t,s);if(d===-1){break}i.push({type:"text",data:l.slice(s,d)});s=d}else{d=n(r,l,s+t.length);if(d===-1){break}i.push({type:"math",data:l.slice(s+t.length,d),display:a});s=d+r.length}f=!f}i.push({type:"text",data:l.slice(s)})}else{i.push(e[o])}}return i};t.exports=a},{}]},{},[1])(1)});

/* Umbrella JS 2.6.3 umbrellajs.com */
function ajax(a,b,c,d){c=c||function(){},b=b||{},b.body=b.body||"",b.method=(b.method||"GET").toUpperCase(),b.headers=b.headers||{},b.headers["X-Requested-With"]=b.headers["X-Requested-With"]||"XMLHttpRequest","undefined"!=typeof window.FormData&&b.body instanceof window.FormData||(b.headers["Content-Type"]=b.headers["Content-Type"]||"application/x-www-form-urlencoded"),/json/.test(b.headers["Content-Type"])&&(this.encode=function(a){return JSON.stringify(b.body||{})}),"object"!=typeof b.body||b.body instanceof window.FormData||(b.body=u().param(b.body));var e=new window.XMLHttpRequest;u(e).on("error timeout abort",function(){c(new Error,null,e)}).on("load",function(){var a=/^(2|3)/.test(e.status)?null:new Error(e.status),b=parseJson(e.response)||e.response;return c(a,b,e)}),e.open(b.method,a);for(var f in b.headers)e.setRequestHeader(f,b.headers[f]);return d&&d(e),e.send(b.body),e}function parseJson(a){try{var b=JSON.parse(a);if(b&&"object"==typeof b)return b}catch(c){}return!1}var u=function(a,b){return this instanceof u?a instanceof u?a:("string"==typeof a&&(a=this.select(a,b)),a&&a.nodeName&&(a=[a]),void(this.nodes=this.slice(a))):new u(a,b)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(a,b){a.classList.add(b)})},u.prototype.adjacent=function(a,b,c){return"number"==typeof b&&(b=0===b?[]:new Array(b).join().split(",").map(Number.call,Number)),this.each(function(d,e){var f=document.createDocumentFragment();u(b||{}).map(function(b,c){var f="function"==typeof a?a.call(this,b,c,d,e):a;return"string"==typeof f?this.generate(f):u(f)}).each(function(a){this.isInPage(a)?f.appendChild(u(a).clone().first()):f.appendChild(a)}),c.call(this,d,f)})},u.prototype.after=function(a,b){return this.adjacent(a,b,function(a,b){a.parentNode.insertBefore(b,a.nextSibling)})},u.prototype.ajax=function(a,b){return this.handle("submit",function(c){ajax(u(this).attr("action"),{body:u(this).serialize(),method:u(this).attr("method")},a&&a.bind(this),b&&b.bind(this))})},u.prototype.append=function(a,b){return this.adjacent(a,b,function(a,b){a.appendChild(b)})},u.prototype.args=function(a,b,c){return"function"==typeof a&&(a=a(b,c)),"string"!=typeof a&&(a=this.slice(a).map(this.str(b,c))),a.toString().split(/[\s,]+/).filter(function(a){return a.length})},u.prototype.array=function(a){a=a;var b=this;return this.nodes.reduce(function(c,d,e){var f;return a?(f=a.call(b,d,e),f||(f=!1),"string"==typeof f&&(f=u(f)),f instanceof u&&(f=f.nodes)):f=d.innerHTML,c.concat(f!==!1?f:[])},[])},u.prototype.attr=function(a,b,c){if(c=c?"data-":"",void 0!==b){var d=a;a={},a[d]=b}return"object"==typeof a?this.each(function(b){for(var d in a)b.setAttribute(c+d,a[d])}):this.length?this.first().getAttribute(c+a):""},u.prototype.before=function(a,b){return this.adjacent(a,b,function(a,b){a.parentNode.insertBefore(b,a)})},u.prototype.children=function(a){return this.map(function(a){return this.slice(a.children)}).filter(a)},u.prototype.clone=function(){return this.map(function(a,b){var c=a.cloneNode(!0),d=this.getAll(c);return this.getAll(a).each(function(a,b){for(var c in this.mirror)this.mirror[c](a,d.nodes[b])}),c})},u.prototype.getAll=function(a){return u([a].concat(u("*",a).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(a,b){if(a._e)for(var c in a._e)a._e[c].forEach(function(a){u(b).on(c,a)})},u.prototype.mirror.select=function(a,b){u(a).is("select")&&(b.value=a.value)},u.prototype.mirror.textarea=function(a,b){u(a).is("textarea")&&(b.value=a.value)},u.prototype.closest=function(a){return this.map(function(b){do if(u(b).is(a))return b;while((b=b.parentNode)&&b!==document)})},u.prototype.data=function(a,b){return this.attr(a,b,!0)},u.prototype.each=function(a){return this.nodes.forEach(a.bind(this)),this},u.prototype.eacharg=function(a,b){return this.each(function(c,d){this.args(a,c,d).forEach(function(a){b.call(this,c,a)},this)})},u.prototype.filter=function(a){var b=function(b){return b.matches=b.matches||b.msMatchesSelector||b.webkitMatchesSelector,b.matches(a||"*")};return"function"==typeof a&&(b=a),a instanceof u&&(b=function(b){return-1!==a.nodes.indexOf(b)}),u(this.nodes.filter(b))},u.prototype.find=function(a){return this.map(function(b){return u(a||"*",b)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(a){return/^\s*<t(h|r|d)/.test(a)?u(document.createElement("table")).html(a).children().nodes:/^\s*</.test(a)?u(document.createElement("div")).html(a).children().nodes:document.createTextNode(a)},u.prototype.handle=function(a,b){return this.on(a,function(a){a.preventDefault(),b.apply(this,arguments)})},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(a){return void 0===a?this.first().innerHTML||"":this.each(function(b){b.innerHTML=a})},u.prototype.is=function(a){return this.filter(a).length>0},u.prototype.isInPage=function(a){return a===document.body?!1:document.body.contains(a)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(a){return a?u(this.array(a)).unique():this},u.prototype.not=function(a){return this.filter(function(b){return!u(b).is(a||!0)})},u.prototype.off=function(a){return this.eacharg(a,function(a,b){u(a._e?a._e[b]:[]).each(function(c){a.removeEventListener(b,c)})})},u.prototype.on=function(a,b,c){if("string"==typeof b){var d=b;b=function(a){var b=arguments;u(a.currentTarget).find(d).each(function(d){(d===a.target||d.contains(a.target))&&c.apply(a.target,b)})}}var e=function(a){return b.apply(this,[a].concat(a.detail||[]))};return this.eacharg(a,function(a,b){a.addEventListener(b,e),a._e=a._e||{},a._e[b]=a._e[b]||[],a._e[b].push(e)})},u.prototype.param=function(a){return Object.keys(a).map(function(b){return this.uri(b)+"="+this.uri(a[b])}.bind(this)).join("&")},u.prototype.parent=function(a){return this.map(function(a){return a.parentNode}).filter(a)},u.prototype.prepend=function(a,b){return this.adjacent(a,b,function(a,b){a.insertBefore(b,a.firstChild)})},u.prototype.remove=function(){return this.each(function(a){a.parentNode.removeChild(a)})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(a,b){a.classList.remove(b)})},u.prototype.replace=function(a,b){var c=[];return this.adjacent(a,b,function(a,b){c=c.concat(this.slice(b.children)),a.parentNode.replaceChild(b,a)}),u(c)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(a,b){if(a=a.replace(/^\s*/,"").replace(/\s*$/,""),b)return this.select.byCss(a,b);for(var c in this.selectors)if(b=c.split("/"),new RegExp(b[1],b[2]).test(a))return this.selectors[c](a);return this.select.byCss(a)},u.prototype.select.byCss=function(a,b){return(b||document).querySelectorAll(a)},u.prototype.selectors={},u.prototype.selectors[/^\.[\w\-]+$/]=function(a){return document.getElementsByClassName(a.substring(1))},u.prototype.selectors[/^\w+$/]=function(a){return document.getElementsByTagName(a)},u.prototype.selectors[/^\#[\w\-]+$/]=function(a){return document.getElementById(a.substring(1))},u.prototype.selectors[/^</]=function(a){return u().generate(a)},u.prototype.serialize=function(){var a=this;return this.slice(this.first().elements).reduce(function(b,c){return!c.name||c.disabled||"file"===c.type?b:/(checkbox|radio)/.test(c.type)&&!c.checked?b:"select-multiple"===c.type?(u(c.options).each(function(d){d.selected&&(b+="&"+a.uri(c.name)+"="+a.uri(d.value))}),b):b+"&"+a.uri(c.name)+"="+a.uri(c.value)},"").slice(1)},u.prototype.siblings=function(a){return this.parent().children(a).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(a){return a&&0!==a.length&&"string"!=typeof a&&"[object Function]"!==a.toString()?a.length?[].slice.call(a.nodes||a):[a]:[]},u.prototype.str=function(a,b){return function(c){return"function"==typeof c?c.call(this,a,b):c.toString()}},u.prototype.text=function(a){return void 0===a?this.first().textContent||"":this.each(function(b){b.textContent=a})},u.prototype.toggleClass=function(a,b){return!!b===b?this[b?"addClass":"removeClass"](a):this.eacharg(a,function(a,b){a.classList.toggle(b)})},u.prototype.trigger=function(a){var b=this.slice(arguments).slice(1);return this.eacharg(a,function(a,c){var d,e={bubbles:!0,cancelable:!0,detail:b};try{d=new window.CustomEvent(c,e)}catch(f){d=document.createEvent("CustomEvent"),d.initCustomEvent(c,!0,!0,b)}a.dispatchEvent(d)})},u.prototype.unique=function(){return u(this.nodes.reduce(function(a,b){var c=null!==b&&void 0!==b&&b!==!1;return c&&-1===a.indexOf(b)?a.concat(b):a},[]))},u.prototype.uri=function(a){return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(a){function b(a){for(;a.firstElementChild;)a=a.firstElementChild;return u(a)}return this.map(function(c){return u(a).each(function(a){b(a).append(c.cloneNode(!0)),c.parentNode.replaceChild(a,c)})})},"object"==typeof module&&module.exports&&(module.exports={u:u,ajax:ajax});
/* mousetrap v1.6.1 craig.is/killing/mice */
(function(r,v,f){function w(a,b,g){a.addEventListener?a.addEventListener(b,g,!1):a.attachEvent("on"+b,g)}function A(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return p[a.which]?p[a.which]:t[a.which]?t[a.which]:String.fromCharCode(a.which).toLowerCase()}function F(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function x(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function B(a,b){var g,c,d,f=[];g=a;"+"===g?g=["+"]:(g=g.replace(/\+{2}/g,"+plus"),g=g.split("+"));for(d=0;d<g.length;++d)c=g[d],C[c]&&(c=C[c]),b&&"keypress"!=b&&D[c]&&(c=D[c],f.push("shift")),x(c)&&f.push(c);g=c;d=b;if(!d){if(!n){n={};for(var q in p)95<q&&112>q||p.hasOwnProperty(q)&&(n[p[q]]=q)}d=n[g]?"keydown":"keypress"}"keypress"==d&&f.length&&(d="keydown");return{key:c,modifiers:f,action:d}}function E(a,b){return null===a||a===v?!1:a===b?!0:E(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,l;for(l in n)a[l]?b=!0:n[l]=0;b||(y=!1)}function g(a,b,u,e,c,g){var l,m,k=[],f=u.type;if(!h._callbacks[a])return[];"keyup"==f&&x(a)&&(b=[a]);for(l=0;l<h._callbacks[a].length;++l)if(m=h._callbacks[a][l],(e||!m.seq||n[m.seq]==m.level)&&f==m.action){var d;(d="keypress"==f&&!u.metaKey&&!u.ctrlKey)||(d=m.modifiers,d=b.sort().join(",")===d.sort().join(","));d&&(d=e&&m.seq==e&&m.level==g,(!e&&m.combo==c||d)&&h._callbacks[a].splice(l,1),k.push(m))}return k}function f(a,b,c,e){h.stopCallback(b,
b.target||b.srcElement,c,e)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function d(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=A(a);b&&("keyup"==a.type&&z===b?z=!1:h.handleKey(b,F(a),a))}function p(a,c,u,e){function l(c){return function(){y=c;++n[a];clearTimeout(r);r=setTimeout(b,1E3)}}function g(c){f(u,c,a);"keyup"!==e&&(z=A(c));setTimeout(b,10)}for(var d=n[a]=0;d<c.length;++d){var m=d+1===c.length?g:l(e||
B(c[d+1]).action);q(c[d],m,e,a,d)}}function q(a,b,c,e,d){h._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var f=a.split(" ");1<f.length?p(a,f,b,c):(c=B(a,c),h._callbacks[c.key]=h._callbacks[c.key]||[],g(c.key,c.modifiers,{type:c.action},e,a,d),h._callbacks[c.key][e?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:e,level:d,combo:a}))}var h=this;a=a||v;if(!(h instanceof c))return new c(a);h.target=a;h._callbacks={};h._directMap={};var n={},r,z=!1,t=!1,y=!1;h._handleKey=function(a,
c,d){var e=g(a,c,d),k;c={};var h=0,l=!1;for(k=0;k<e.length;++k)e[k].seq&&(h=Math.max(h,e[k].level));for(k=0;k<e.length;++k)e[k].seq?e[k].level==h&&(l=!0,c[e[k].seq]=1,f(e[k].callback,d,e[k].combo,e[k].seq)):l||f(e[k].callback,d,e[k].combo);e="keypress"==d.type&&t;d.type!=y||x(a)||e||b(c);t=l&&"keydown"==d.type};h._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)q(a[d],b,c)};w(a,"keypress",d);w(a,"keydown",d);w(a,"keyup",d)}if(r){var p={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},t={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},D={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},C={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},n;for(f=1;20>f;++f)p[111+f]="f"+f;for(f=0;9>=f;++f)p[f+96]=f.toString();c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};
this._directMap={};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||E(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(p[b]=a[b]);n=null};c.init=function(){var a=c(v),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,
arguments)}}(b))};c.init();r.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=c);"function"===typeof define&&define.amd&&define(function(){return c})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);

/* eslint new-cap: 0 */
// PageX
// A minimal engine for loading only page-specific code with regex or paths
var pagex = function (path, negate, callback, url) {
  if (!(this instanceof pagex)) {
    return new pagex(path, negate, callback, url);
  }

  // Allow it to have different signatures
  if (!callback) {
    callback = negate;
    negate = false;
  }

  if (typeof path === 'string') {
    path = this.path(path);
  }

  // The actual function
  var fn = function () {
    // Url with leading slash. Allows for testing
    url = url || window.location.pathname.replace(/^\//, '/');

    // Check whether we are in the correct page or not
    if (path.test(url) !== negate) {
      var params = url.match(path) ? url.match(path).slice(1) : [];

      var self = { url: url, exports: {}, params: params };

      pagex.events.before.forEach(function (cb) {
        cb.call(self);
      });

      var ret = callback.apply(self, params);

      pagex.events.after.forEach(function (cb) {
        cb.call(pagex, ret || self.exports);
      });
    }
  };

  // We want to execute it when the DOM is ready, but not before. So we need to
  // add the listener, but we also need to check if it was already triggered
  document.addEventListener('DOMContentLoaded', fn);

  // The DOM was lodaded already
  if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) !== -1) {
    fn();
  }
};

pagex.events = { before: [], after: [] };

pagex.before = function (cb) {
  this.events.before.push(cb);
};

pagex.after = function (cb) {
  this.events.after.push(cb);
};

// Export it as part of PageX
// Wrap it globally not to leak
pagex.prototype.path = (function(){

  var isarray = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')

  /**
   * Parse a string for the raw tokens.
   *
   * @param  {string} str
   * @return {!Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res

    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }

      var next = str[index]
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var modifier = res[6]
      var asterisk = res[7]

      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }

      var partial = prefix != null && next != null && next !== prefix
      var repeat = modifier === '+' || modifier === '*'
      var optional = modifier === '?' || modifier === '*'
      var delimiter = res[2] || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        asterisk: !!asterisk,
        pattern: escapeGroup(pattern)
      })
    }

    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }

    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }

    return tokens
  }

  /**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @return {!function(Object=, Object=)}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }

  /**
   * Prettier encoding of URI path segments.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeURIComponentPretty (str) {
    return encodeURI(str).replace(/[\/?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }

  /**
   * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeAsterisk (str) {
    return encodeURI(str).replace(/[?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }

  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)

    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
      }
    }

    return function (obj, opts) {
      var path = ''
      var data = obj || {}
      var options = opts || {}
      var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]

        if (typeof token === 'string') {
          path += token

          continue
        }

        var value = data[token.name]
        var segment

        if (value == null) {
          if (token.optional) {
            // Prepend partial segment prefixes.
            if (token.partial) {
              path += token.prefix
            }

            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }

        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
          }

          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }

          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j])

            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
            }

            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }

          continue
        }

        segment = token.asterisk ? encodeAsterisk(value) : encode(value)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }

        path += token.prefix + segment
      }

      return path
    }
  }

  /**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
  }

  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }

  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }

  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }

  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)

    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        })
      }
    }

    return attachKeys(path, keys)
  }

  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []

    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }

    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

    return attachKeys(regexp, keys)
  }

  /**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)

    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }

    return attachKeys(re, keys)
  }

  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}  tokens
   * @param  {Object=} options
   * @return {!RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}

    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = '(?:' + token.pattern + ')'

        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }

        if (token.optional) {
          if (!token.partial) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = prefix + '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }

        route += capture
      }
    }

    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }

    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }

    return new RegExp('^' + route, flags(options))
  }

  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || [];

    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys)
      keys = []
    } else if (!options) {
      options = {}
    }

    if (path instanceof RegExp) {
      return regexpToRegexp(path, /** @type {!Array} */ (keys))
    }

    if (isarray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
    }

    return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
  }

  var pathToRegex = pathToRegexp;
  pathToRegex.parse = parse;
  pathToRegex.compile = compile;
  pathToRegex.tokensToFunction = tokensToFunction;
  pathToRegex.tokensToRegExp = tokensToRegExp;

  return pathToRegex;
})();

/*
 * Sweet Justice: beautiful justified text.
 *
 * Include this file at the bottom of your pages
 * and it will hyphenate and justify your text.
 * The script pays attention to elements with
 * any of these three CSS classes:
 *
 *   sweet-justice:  Hyphenated and justified
 *   sweet-hypens:   Hyphenation only
 *   justice-denied: No hypens or justification.
 *                   This is useful for child nodes.
 *
 * Hyphenation is accomplished by inserting soft
 * hyphen characters (0x00AD) into long words.
 *
 * Requires either jQuery or YUI3.
 *
 * BSD license: Share and enjoy.
 * @author carlos@bueno.org 23 April 2010
 * github.com/aristus/sweet-justice
 *
 */



// don't break up short words.
var MIN_WORD = 6;

// don't mess with the content of these tags.
var tag_blacklist = {
  'code': true,
  'pre': true,
  'abbr': true
}

// Recurse raw DOM nodes, hyphenating each text node.
function justify_my_love(el) {
  if (!el)
    return false;

  var nodes = el.childNodes;
  for (var i=0; i<nodes.length; i++) {
    var node = nodes[i];

    switch (node.nodeType) {
      case 3: // Node.TEXT_NODE
        node.nodeValue = break_dance(node.nodeValue);
        break;

      case 1: // Node.ELEMENT_NODE
        if (!tag_blacklist[node.nodeName.toLowerCase()] &&
            node.className.indexOf('justice-denied') === -1 &&
            node.className.indexOf('katex') === -1) {
          justify_my_love(node);
        }
        break;
    }
  }
}

// Given a plain-text string, insert shy-phens into long words.
// Variant of the VCCV algorithm
// http://www.bramstein.com/projects/typeset/
// http://defoe.sourceforge.net/folio/knuth-plass.html
// If you are a student of English grammar or typography, this
// will make you cry. If you read anything other than English,
// this will also make you cry.
var whitespace = /[ \s\n\r\v\t]+/;
function break_dance(text) {
  var words = text.split(whitespace);
  for (var i=0; i<words.length; i++) {
    if (breakable(words[i])) {
      words[i] = break_word_en(words[i]);
    }
  }
  return words.join(' ');
}

// determine whether a word is good for hyphenation.
// no numbers, email addresses, hyphens, or &entities;
function breakable(word) {
  return (/\w{6,}/.test(word)) && (!/^[0-9\&]|@|\-|\u00AD/.test(word));
}

// Detect all Unicode vowels. Just last week I told someone
// to never do this. Never say never, I guess. The Closure
// compiler transforms this into ASCII-safe \u0000 encoding.
// http://closure-compiler.appspot.com/home
var vowels = 'aeiouyAEIOUY'+
  'ẚÁáÀàĂăẮắẰằẴẵẲẳÂâẤấẦầẪẫẨẩǍǎÅåǺǻÄäǞǟÃãȦȧǠǡĄąĀāẢảȀȁȂȃẠạẶặẬậḀḁȺⱥ'+
  'ǼǽǢǣÉƏƎǝéÈèĔĕÊêẾếỀềỄễỂểĚěËëẼẽĖėȨȩḜḝĘęĒēḖḗḔḕẺẻȄȅȆȇẸẹỆệḘḙḚḛɆɇɚɝÍíÌìĬĭÎîǏǐÏ'+
  'ïḮḯĨĩİiĮįĪīỈỉȈȉȊȋỊịḬḭIıƗɨÓóÒòŎŏÔôỐốỒồỖỗỔổǑǒÖöȪȫŐőÕõṌṍṎṏȬȭȮȯȰȱØøǾǿǪǫǬǭŌōṒṓ'+
  'ṐṑỎỏȌȍȎȏƠơỚớỜờỠỡỞởỢợỌọỘộƟɵÚúÙùŬŭÛûǓǔŮůÜüǗǘǛǜǙǚǕǖŰűŨũṸṹŲųŪūṺṻỦủȔȕȖȗƯưỨứỪừ'+
  'ỮữỬửỰựỤụṲṳṶṷṴṵɄʉÝýỲỳŶŷY̊ẙŸÿỸỹẎẏȲȳỶỷỴỵʏɎɏƳƴ';
var c = '[^'+vowels+']';
var v = '['+vowels+']';
var vccv = new RegExp('('+v+c+')('+c+v+')', 'g');
var simple = new RegExp('(.{2,4}'+v+')'+'('+c+')', 'g');

// "algorithmic" hyphenation
var dumb = /\u00AD(.?)|$\u00AD(.{0,2}\w+)$/;
function break_word_default(word) {
  return word
    .replace(vccv, '$1\u00AD$2')
    .replace(simple, '$1\u00AD$2')
    .replace(dumb, '$1');
}

// dictionary-based hypenation similar to the original
// TeX algo: split on well-known prefixes and suffixes
// then along the vccv line. This is not i18n nor even
// generally correct, but is fairly compact.
var presuf = /^(\W*)(anti|auto|ab|an|ax|al|as|bi|bet|be|contra|cat|cath|cir|cum|cog|col|com|con|cor|could|co|desk|de|dis|did|dif|di|eas|every|ever|extra|ex|end|en|em|epi|evi|func|fund|fin|hyst|hy|han|il|in|im|ir|just|jus|loc|lig|lit|li|mech|manu|man|mal|mis|mid|mono|multi|mem|micro|non|nano|ob|oc|of|opt|op|over|para|per|post|pre|peo|pro|retro|rea|re|rhy|should|some|semi|sen|sol|sub|suc|suf|super|sup|sur|sus|syn|sym|syl|tech|trans|tri|typo|type|uni|un|van|vert|with|would|won)?(.*?)(weens?|widths?|icals?|ables?|ings?|tions?|ions?|ies|isms?|ists?|ful|ness|ments?|ly|ify|ize|ise|ity|en|ers?|ences?|tures?|ples?|als?|phy|puts?|phies|ry|ries|cy|cies|mums?|ous|cents?)?(\W*)$/i;

function break_word_en(word) {
  // punctuation, prefix, center, suffix, punctuation
  var parts = presuf.exec(word);
  var ret = [];
  if (parts[2]) {
    ret.push(parts[2]);
  }
  if (parts[3]) {
    ret.push(parts[3].replace(vccv, '$1\u00AD$2'));
  }
  if (parts[4]) {
    ret.push(parts[4]);
  }
  return (parts[1]||'') + ret.join('\u00AD') + (parts[5]||'');
}

// The shy-phen character is an odd duck. On copy/paste
// most apps other than browsers treat them as printable
// instead of a hyphenation hint, which is usually not what
// you want. So on copy we take 'em out. The selection APIs
// are very different across browsers so there is a lot of
// browser-specific jazzhands in this function. The basic
// idea is to grab the data being copied, make a "shadow"
// element of it, remove the shy-phens, select and copy
// that, then reinstate the original selection.
//
// More than you ever wanted to know:
// http://www.cs.tut.fi/~jkorpela/shy.html
function copy_protect(e) {
  var body = document.getElementsByTagName('body')[0];
  var shyphen = /(?:\u00AD|\&#173;|\&shy;)/g;
  var shadow = document.createElement('div');
  shadow.style.overflow = 'hidden';
  shadow.style.position = 'absolute';
  shadow.style.top = '-5000px';
  shadow.style.height = '1px';
  body.appendChild(shadow);

  // FF3, WebKit
  if (typeof window.getSelection !== 'undefined') {
    sel = window.getSelection();
    var range = sel.getRangeAt(0);
    shadow.appendChild(range.cloneContents());
    shadow.innerHTML = shadow.innerHTML.replace(shyphen, '');
    sel.selectAllChildren(shadow);
    window.setTimeout(function() {
      shadow.parentNode.removeChild(shadow);
      if (typeof window.getSelection().setBaseAndExtent !== 'undefined') {
        sel.setBaseAndExtent(
          range.startContainer,
          range.startOffset,
          range.endContainer,
          range.endOffset
        );
      }
    },0);

  // Internet Explorer
  } else {
    sel = document.selection;
    var range = sel.createRange();
    shadow.innerHTML = range.htmlText.replace(shyphen, '');
    var range2 = body.createTextRange();
    range2.moveToElementText(shadow);
    range2.select();
    window.setTimeout(function() {
      shadow.parentNode.removeChild(shadow);
      if (range.text !== '') {
        range.select();
      }
    },0);
  }
  return;
}

/* mousetrap v1.6.0 craig.is/killing/mice */
(function(r,t,g){function u(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return k[a.which]?k[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function v(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function z(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],A[c]&&(c=A[c]),b&&"keypress"!=b&&B[c]&&(c=B[c],g.push("shift")),v(c)&&g.push(c);h=c;e=b;if(!e){if(!n){n={};for(var l in k)95<l&&112>l||k.hasOwnProperty(l)&&(n[k[l]]=l)}e=n[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function C(a,b){return null===a||a===t?!1:a===b?!0:C(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,m;for(m in n)a[m]?b=!0:n[m]=0;b||(w=!1)}function h(a,b,m,f,c,h){var g,e,k=[],l=m.type;if(!d._callbacks[a])return[];"keyup"==l&&v(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||n[e.seq]==e.level)&&l==e.action){var q;(q="keypress"==l&&!m.metaKey&&!m.ctrlKey)||(q=e.modifiers,q=b.sort().join(",")===q.sort().join(","));q&&(q=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||q)&&d._callbacks[a].splice(g,1),k.push(e))}return k}function g(a,b,m,f){d.stopCallback(b,
b.target||b.srcElement,m,f)||!1!==a(b,m)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);b&&("keyup"==a.type&&x===b?x=!1:d.handleKey(b,D(a),a))}function k(a,c,m,f){function e(c){return function(){w=c;++n[a];clearTimeout(r);r=setTimeout(b,1E3)}}function h(c){g(m,c,a);"keyup"!==f&&(x=y(c));setTimeout(b,10)}for(var d=n[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
z(c[d+1]).action);l(c[d],p,f,a,d)}}function l(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?k(a,g,b,c):(c=z(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||t;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var n={},r,x=!1,p=!1,w=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=w||v(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)l(a[d],b,c)};u(a,"keypress",e);u(a,"keydown",e);u(a,"keyup",e)}if(r){var k={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},B={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},A={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},n;for(g=1;20>g;++g)k[111+g]="f"+g;for(g=0;9>=g;++g)k[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||C(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(k[b]=a[b]);n=null};c.init=function(){var a=c(t),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};
c.init();r.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=c);"function"===typeof define&&define.amd&&define(function(){return c})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);


// Modern Editor
// An event-based editor for the modern web
var Editor = function(selector, options){

  // The instance's editor element (it is required)
  this.element = u(selector).first();

  // Editor options
  this.options = this.defaults(options, {

    // Delay for each of the text selections checks (there's no event onselect)
    delay: 200,

    // Default active status
    active: true,

    // The valid blocks
    blocks: []
  });

  // Start each of the parts of the library
  this.menu(this.options.menu);

  this.selection();

  this.shortcuts();

  this.clean();

  this.default();

  var editor = this;
  window.setInterval(this.trigger.bind(this, 'refresh'), this.options.delay);
  this.element.addEventListener("blur", function(e){ editor.trigger('refresh', e); });

  // These are just good moments to refresh
  document.addEventListener("keydown", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("mousedown", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("touchstart", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("click", function(e){ editor.trigger('refresh', e); });

  this.trigger('init');
};


Editor.prototype.defaults = function(options, def, wrap){

  // Based on defaults ( https://github.com/tmpvar/defaults )
  options = typeof options === 'object' ? options : {};

  Object.keys(def).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = def[key];
    }
  });

  return options;
};


Editor.prototype.command = function(command, text){
  document.execCommand(command, false, text);
  this.trigger('refresh');
};

// Initialization
u.prototype.editor = function(options){
  return new Editor(this.first(), options);
};


// Register a new full action
Editor.prototype.add = function(name, options){

  // Default options (empty functions)
  var fn = function(){};
  options = this.defaults(options, { init: fn, action: fn, destroy: fn });

  // Call the init action inmediately
  options.init.call(this, this);

  // Add the action to the action event list like action:save
  this.on('action:' + name, options.action.bind(this, this));

  this.on('destroy', options.destroy.bind(this, this));


  // Add the shortcut only if there is one
  this.trigger('shortcut:add', { shortcut: options.shortcut, action: name });

  // Add the menu item only if there's one
  if (options.menu) {

    // Default options for the menu
    options.menu = this.defaults(options.menu, {
      html: options.menu,
      title: (options.shortcut ? '[' + options.shortcut + '] ' : '') + name,
      action: name
    });

    this.trigger('menu:add', options.menu);
  }
};


Editor.prototype.clean = function(){
  var editor = this;
  this.clean.editor = this;

  this.on('refresh', function(){
    editor.trigger('clean');
  });

  // Clean up the html
  this.on('clean', function(){
    // Call the single elements
    u(this).children().singles(function(node){
      editor.trigger('clean:single', node);
    });

    u(this).children().empty(function(node){
      editor.trigger('clean:empty', node);
    });
  });

  // Last defense for cleanup
  // Make sure all top-level elements are valid blocks or wrap them in <p>
  this.on('clean:after', function(){

    var ed = u(editor.element);

    // Wrap any of the invalid blocks
    if (editor.clean.blocks) {
      ed.children().filter(editor.clean.filter).each(editor.clean.wrap);
    }

    if (!ed.children().nodes.length && ed.html() !== "") {
      ed.html('<p>' + ed.html() + '</p>');
    }
  });
}

Editor.prototype.clean.blocks = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'img', 'ul', 'ol'];

Editor.prototype.clean.filter = function(node){
  return Editor.prototype.clean.blocks.indexOf(node.nodeName.toLowerCase()) === -1;
};

Editor.prototype.clean.wrap = function(node){
  var p = document.createElement('p');
  p.innerHTML = node.outerHTML;
  node.parentNode.replaceChild(p, node);
};



// Retrieve all the nodes with only one child, whatever the type
u.prototype.singles = function(callback){
  return this.filter(function(block){
    return u(block).content().nodes.length == 1;
  }).each(callback);
};

// Retrieve all the nodes with no content
u.prototype.empty = function(callback){
  return this.filter(function(block){
    return !block.textContent.replace(/\s/, '').length;
  }).each(callback);
};

u.prototype.replace = function(el){
  this.each(function(node){
    node.parentNode.replaceChild(u('<p>').html(u(node).html()).first(), node);
  });
};

u.prototype.content = function(){
  return this.map(function(node){
    return this.slice(node.childNodes);
  });
};






Editor.prototype.default = function(){
  var self = this;

  this.on('action:default:italic', function(){
    self.command("italic");
  });

  this.on('action:default:bold', function(){
    self.command("bold");
  });

  this.on('action:default:link', function(){
    var link = u(self.selection.element).attr('href');
    var address = prompt("Link address", link || "");
    self.command(address ? 'createLink' : 'unlink', address);
  });

  this.on('action:default:code', function(){
    self.tag("code");
  });

  this.on('action:default:info', function(){
    window.open("https://github.com/franciscop/modern-editor", "_blank");
  });

};

// Events
// All of the current events
Editor.prototype.events = {};

// Transparently redirect events to Umbrella
Editor.prototype.on = function(name, callback){
  u(this.element).on('editor:' + name, function(e) {
    return callback.call(this, e, e.detail);
  });
};

// Handle event triggering with :before and :after
Editor.prototype.trigger = function(name, data){
  u(this.element).trigger('editor:' + name + ':before', data);
  u(this.element).trigger('editor:' + name, data);
  u(this.element).trigger('editor:' + name + ':after', data);
};



Editor.prototype.menu = function(name){
  this.menu.editor = this;
  this.menu.visible = false;

  // Class that will be added to the menu
  name = name || 'menu';

  // Add the menu to the DOM
  u('body').append('<ul class="' + name + '"></ul>');
  this.menu.element = u('.' + name).first();

  this.menu.events();
};



// Add an element to the menu
Editor.prototype.menu.add = function(element){
  var editor = this.editor;
  if (element instanceof Array) {
    element = element[0];
  }
  var li = u(document.createElement('li')).attr({
    'title': element.title,
    'data-action': element.action
  }).addClass('action').on('click', function(e){
    if (!element.defaults) {
      console.log("Prevented shortcut on menu.add");
      e.preventDefault();
    }
    editor.trigger('action');
    editor.trigger('action:' + element.action);
  }).html(element.html).first();
  this.element.appendChild(li);
}

// Add a separator between two elements from the menu
Editor.prototype.menu.separator = function(){
  u(this.element).append('<li class="separator">');
};


// Show the menu
Editor.prototype.menu.show = function(){

  if (this.editor.options.active) {
    this.element.style.display = 'block';
    this.element.visible = true;
    this.element.classList.add('visible');
  }
};

// Hide the menu
Editor.prototype.menu.hide = function(){
  this.element.style.display = "none";
  this.element.visible = false;
  this.element.classList.remove('visible');
};


// Calculate the position for the selection and move the menu to it
Editor.prototype.menu.move = function() {

  var selection = this.editor.selection.position;
  var doc = u('html').first().getBoundingClientRect();
  var menu = this.element.getBoundingClientRect();

  var top = selection.top - doc.top;
  if (top < 0 ) top = 0;
  var left = selection.left + selection.width / 2 - menu.width / 2;
  if (left < 0) left = 0;
  this.position = {
    top: top + "px",
    left: left + "px"
  };
  this.element.style.left = this.position.left;
  this.element.style.top = this.position.top;
};


Editor.prototype.menu.events = function(){

  var editor = this.editor;
  var menu = this;

  // Add a separator between two elements from the menu
  editor.on("menu:add", function(e, element){
    menu.add(element);
  });

  // Add a separator between two elements from the menu
  editor.on("menu:separator", function(){
    menu.separator();
  });

  // Show the menu
  editor.on('menu:show', function(){
    menu.show();
  });

  // Hide the menu
  editor.on('menu:hide', function(){
    menu.hide();
  });

  // Position the menu correctly
  editor.on('menu:move', function(){
    menu.move();
  });

  // Avoid deselecting text when clicking on the menu
  u(menu.element).on('mousedown', function(e){
    // Only if it was not a select
    if (u(e.target).closest('select').length === 0) {
      e.preventDefault();
    }
  });

  // On mousedown check whether or not we click on the menu
  u('body').on("click", function (e) {

    // Don't unselect text when clicking on the menu
    if (menu.element && menu.element.contains(e.currentTarget)) {
      console.log("Prevented shortcut on click");
      e.preventDefault();
    }
  });
}




// SELECTION
Editor.prototype.selection = function(){
  var editor = this;
  this.selection.element = false;
  this.selection.text = "";


  // Format nicely the code (if needed)
  this.on('refresh', function(){

    u(this).children('br').remove();
    if (u(this).html().match(/^\s*$/)) {
      editor.command("insertParagraph");
    }
  });

  // Display/hide the menu
  this.on('refresh', function(){

    var prev = editor.selection.text;
    editor.trigger('select:check');
    var post = editor.selection.text;

    // If the selections has changed
    if (prev != post) {
      editor.trigger('select');
    }
  });

  this.on('select', function(){
    editor.selection.position = editor.selection.range.getBoundingClientRect();
  });

  // When the selection changes, check its value
  this.on('select', function(){

    var selected = editor.selection.text;
    var hidden = editor.menu.element.style.display !== 'block';

    if (selected && hidden) {
      editor.trigger('menu:show');
    }

    if (selected) {
      editor.trigger('menu:move');
    }

    if (!selected && !hidden) {
      editor.trigger('menu:hide');
    }
  });

  this.on('select:check', function(){

    // The selection from the current window
    var selection = window.getSelection();

    // Selected text
    editor.selection.text = selection.toString();


    // Store the *right* element
    var node = selection.anchorNode;
    if (!editor.selection.text || !node) {
      return false;
    }

    editor.selection.element = node.nodeType == 1 ? node : node.parentElement;
    editor.selection.range = selection.getRangeAt(0);
  });
};

// SHORTCUTS
Editor.prototype.shortcuts = function(){
  var editor = this;

  // Make it local and overwrite defaults
  var mousetrap = new Mousetrap();
  mousetrap.stopCallback = function(){ return false; };

  this.on('shortcut:add', function(e, data){
    if (!data) return false;
    var b = data[0];
    data = b;
    if (!data || !data.shortcut) return false;
    mousetrap.bind(data.shortcut, function(e){
      e.preventDefault();
      console.log("Prevented shortcut");
      editor.trigger('shortcut', data.action);
    });
  });

  this.on("shortcut", function(e, data){
    editor.trigger('action:' + data);
  });

  u(this.element).on("key", function(e){
    editor.trigger('refresh');
  });
};



// Tag
Editor.prototype.tag = function(name, attr){

  name = name.toLowerCase();

  var sel = this.selection.element;
  var selTag = sel.tagName.toLowerCase();

  // If the one we want to add is already added AND there're no attributes
  // if there's attributes we can assume that we want to change it, not delete it
  if (selTag === name && !attr) {

    // Don't allow including one tag into itself
    if (sel.textContent === this.selection.text) {
      this.selection.element.outerHTML = this.selection.text;
    } else {
      // Here it'd be nice to close previous tag and reopen it afterwards
    }
  } else {
    var className = "rggntymsdvshmuiersds";
    attr = attr || {};
    attr.class = attr.class ? attr.class + " " + className : className;
    var tag = "<" + name;
    for (var key in attr) {
      tag += " " + key + '="' + (attr[key] || "") + '"';
    }
    tag += ">" + this.selection.text + "</" + name + ">";
    this.command("insertHtml", tag);

    var el = u('.' + className).first();
    el.classList.remove(className);
    if (el.classList.length === 0)
      el.removeAttribute('class');

    range = document.createRange();
    range.selectNodeContents(el);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  this.trigger('refresh');
};

// Mini template library
var template = function(selector, data, callback){

  if (!(this instanceof template)) {
    return new template(selector, data, callback);
    }

  this.selector = selector;
  this.data = data;
  this.callback = callback;

  var self = this;


  // Give flexibility to a selector/element
  function select(selector){
    return typeof selector == 'string' ?
      document.querySelector(selector) :
      selector;
  }

  // Parse the data using the template, data and callback into partial templates
  this.parse = function(){

    // Select the template from the content
    this.template = select(this.selector).content;

    // Make sure we're dealing with an array of things for mapping
    this.data = Array.isArray(this.data) ? this.data : [this.data];

    // Default callback is an empty function
    this.callback = this.callback || function(){};

    var self = this;

    return this.data.map(function(data, index){

      // Generate the template into fragment
      var fragment = self.template.cloneNode(true);
      self.callback.call(fragment, data, index);
      return fragment;
    });
  };

  // Allow to append the object
  this.appendTo = function(selector){

    // Find out the real selector
    var where = select(selector);

    // We need to fill the templates with the data first
    // Note: this is 100x faster than doing forEach() inside parse()
    self.parse().forEach(function(data, index){

      // Append it in the proper place
      where.appendChild(data);
    });

    return self;
  };

  // Replace the content of selector with the current elements
  this.into = function(selector) {

    // Delete the previous content
    select(selector).innerHTML = '';

    // And add the new one, reusing the appendTo()
    self.appendTo(selector);

    return self;
  };

  this.before = function(selector){

    var where = select(selector);
    if (!where) console.log("Error with:", selector);
    self.parse().forEach(function(data, index){

      // Append it in the proper place
      where.parentNode.insertBefore(data, where);
    });
  };

  this.replace = function(selector){

    // Find out the real selector
    var where = select(selector);

    var parent = where.parentNode;

    // We need to fill the templates with the data first
    // Note: this is 100x faster than doing forEach() inside parse()
    self.parse().forEach(function(data, index){

      // Add it before the selected node
      parent.insertBefore(data, where);
    });

    // Delete the node
    where.remove();

    return self;
  };

  // Allow simple chaining with .array, .appendTo() or into()
  return this;
};

// Javascript

//modal("login").show("message");
//modal("permission").show();
var modal = function(type){
  return {
    show: function(message){
      if (message) {
        u("#" + type + " + * + * .message").html(message);
      }
      u("#" + type).first().checked = true;
      u("#" + type + " ~ * input").first().focus();
    },
    hide: function(){
      u("#" + type).first().checked = true;
    }
  };
};

// Display the mathematics on the pagee
try {
  renderMathInElement(document.body, { delimiters: [
    { left: "$$", right: "$$", display: true  },
    { left: '@@', right: '@@', display: false }
  ]});
} catch (e) {
  console.log(e);
}

u('.login').handle('click', login);

// Justify everything that has the class .sweet-justice
//justify_my_love(document.querySelector(".sweet-justice"));

// / internal
// "http://www.libre.university/" internal
// "http://github.com/libreuniversity/university" external
// /subject/V1LlrTSlmVl internal
// "http://atom.io/" external
// "https://pages.github.com/" external
u('a').each(function(link){
  var href = link.getAttribute('href');
  if (/^\.\.\//.test(href) || /^\.\//.test(href) || /^\//.test(href)) {
    return;
  }
  if (!/(^\/.*|^https?\:\/\/[a-z]+\.libre\.university)/g.test(u(link).attr('href'))) {
    u(link).attr('target', '_blank');
  }
});


// How to trigger each of the actions
pagex.after(function(actions){
  u('body').on('click', '[data-click]', function(e){
    e.preventDefault();
    // Pass `action` to keep the `this.[actionname]` inside the actions
    var clickable = actions[u(e.target).data('click')];
    if (clickable)
      clickable.apply(actions, arguments);
  });
  u('body').on('submit', '[data-submit]', function(e){
    e.preventDefault();
    // Pass `action` to keep the `this.[actionname]` inside the actions
    var clickable = actions[u(e.target).data('submit')];
    if (clickable)
      clickable.apply(actions, arguments);
  });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61474373-1', 'auto');
ga('send', 'pageview');

// Syntax highlight
/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+apacheconf+bash+c+csharp+cpp+coffeescript+ruby+diff+http+ini+java+json+lua+makefile+markdown+nginx+objectivec+perl+php+python+sql */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={manual:_self.Prism&&_self.Prism.manual,util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),l=0;r=i[l++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i);var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(n.hooks.run("before-highlight",u),u.element.textContent=u.code,n.hooks.run("after-highlight",u)),n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var i=n.tokenize(e,t);return a.stringify(n.util.encode(i),r)},matchGrammar:function(e,t,a,r,i,l,o){var s=n.Token;for(var u in a)if(a.hasOwnProperty(u)&&a[u]){if(u==o)return;var g=a[u];g="Array"===n.util.type(g)?g:[g];for(var c=0;c<g.length;++c){var h=g[c],f=h.inside,d=!!h.lookbehind,m=!!h.greedy,p=0,y=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var b=r,k=i;b<t.length;k+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof s)){h.lastIndex=0;var _=h.exec(w),P=1;if(!_&&m&&b!=t.length-1){if(h.lastIndex=k,_=h.exec(e),!_)break;for(var A=_.index+(d?_[1].length:0),j=_.index+_[0].length,x=b,O=k,S=t.length;S>x&&(j>O||!t[x].type&&!t[x-1].greedy);++x)O+=t[x].length,A>=O&&(++b,k=O);if(t[b]instanceof s||t[x-1].greedy)continue;P=x-b,w=e.slice(k,O),_.index-=k}if(_){d&&(p=_[1].length);var A=_.index+p,_=_[0].slice(p),j=A+_.length,N=w.slice(0,A),C=w.slice(j),E=[b,P];N&&(++b,k+=N.length,E.push(N));var L=new s(u,f?n.tokenize(_,f):_,y,_,m);if(E.push(L),C&&E.push(C),Array.prototype.splice.apply(t,E),1!=P&&n.matchGrammar(e,t,a,b,k,!0,u),l)break}else if(l)break}}}}},tokenize:function(e,t){var a=[e],r=t.rest;if(r){for(var i in r)t[i]=r[i];delete t.rest}return n.matchGrammar(e,a,t,0,0,!1),a},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var i={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,i=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),i&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,!document.addEventListener||n.manual||r.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
Prism.languages.apacheconf={comment:/#.*/,"directive-inline":{pattern:/^(\s*)\b(AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,lookbehind:!0,alias:"property"},"directive-block":{pattern:/<\/?\b(AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/i,inside:{"directive-block":{pattern:/^<\/?\w+/,inside:{punctuation:/^<\/?/},alias:"tag"},"directive-block-parameter":{pattern:/.*[^>]/,inside:{punctuation:/:/,string:{pattern:/("|').*\1/,inside:{variable:/(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/}}},alias:"attr-value"},punctuation:/>/},alias:"tag"},"directive-flags":{pattern:/\[(\w,?)+\]/,alias:"keyword"},string:{pattern:/("|').*\1/,inside:{variable:/(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/}},variable:/(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/,regex:/\^?.*\$|\^.*\$?/};
!function(e){var t={variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\([^)]+\)|`[^`]+`/,inside:{variable:/^\$\(|^`|\)$|`$/}},/\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]};e.languages.bash={shebang:{pattern:/^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,alias:"important"},comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},string:[{pattern:/((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,lookbehind:!0,greedy:!0,inside:t},{pattern:/(["'])(?:\\\\|\\?[^\\])*?\1/g,greedy:!0,inside:t}],variable:t.variable,"function":{pattern:/(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,lookbehind:!0},keyword:{pattern:/(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,lookbehind:!0},"boolean":{pattern:/(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,lookbehind:!0},operator:/&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];]/};var a=t.variable[1].inside;a["function"]=e.languages.bash["function"],a.keyword=e.languages.bash.keyword,a.boolean=e.languages.bash.boolean,a.operator=e.languages.bash.operator,a.punctuation=e.languages.bash.punctuation}(Prism);
Prism.languages.c=Prism.languages.extend("clike",{keyword:/\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,operator:/\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i}),Prism.languages.insertBefore("c","string",{macro:{pattern:/(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,lookbehind:!0,alias:"property",inside:{string:{pattern:/(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,lookbehind:!0},directive:{pattern:/(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,lookbehind:!0,alias:"keyword"}}},constant:/\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/}),delete Prism.languages.c["class-name"],delete Prism.languages.c["boolean"];
Prism.languages.csharp=Prism.languages.extend("clike",{keyword:/\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,string:[{pattern:/@("|')(\1\1|\\\1|\\?(?!\1)[\s\S])*\1/,greedy:!0},{pattern:/("|')(\\?.)*?\1/,greedy:!0}],number:/\b-?(0x[\da-f]+|\d*\.?\d+f?)\b/i}),Prism.languages.insertBefore("csharp","keyword",{"generic-method":{pattern:/[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,alias:"function",inside:{keyword:Prism.languages.csharp.keyword,punctuation:/[<>(),.:]/}},preprocessor:{pattern:/(^\s*)#.*/m,lookbehind:!0,alias:"property",inside:{directive:{pattern:/(\s*#)\b(define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,lookbehind:!0,alias:"keyword"}}}});
Prism.languages.cpp=Prism.languages.extend("c",{keyword:/\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,"boolean":/\b(true|false)\b/,operator:/[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/}),Prism.languages.insertBefore("cpp","keyword",{"class-name":{pattern:/(class\s+)[a-z0-9_]+/i,lookbehind:!0}});
!function(e){var t=/#(?!\{).+/,n={pattern:/#\{[^}]+\}/,alias:"variable"};e.languages.coffeescript=e.languages.extend("javascript",{comment:t,string:[{pattern:/'(?:\\?[^\\])*?'/,greedy:!0},{pattern:/"(?:\\?[^\\])*?"/,greedy:!0,inside:{interpolation:n}}],keyword:/\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,"class-member":{pattern:/@(?!\d)\w+/,alias:"variable"}}),e.languages.insertBefore("coffeescript","comment",{"multiline-comment":{pattern:/###[\s\S]+?###/,alias:"comment"},"block-regex":{pattern:/\/{3}[\s\S]*?\/{3}/,alias:"regex",inside:{comment:t,interpolation:n}}}),e.languages.insertBefore("coffeescript","string",{"inline-javascript":{pattern:/`(?:\\?[\s\S])*?`/,inside:{delimiter:{pattern:/^`|`$/,alias:"punctuation"},rest:e.languages.javascript}},"multiline-string":[{pattern:/'''[\s\S]*?'''/,greedy:!0,alias:"string"},{pattern:/"""[\s\S]*?"""/,greedy:!0,alias:"string",inside:{interpolation:n}}]}),e.languages.insertBefore("coffeescript","keyword",{property:/(?!\d)\w+(?=\s*:(?!:))/}),delete e.languages.coffeescript["template-string"]}(Prism);
!function(e){e.languages.ruby=e.languages.extend("clike",{comment:[/#(?!\{[^\r\n]*?\}).*/,/^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m],keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/});var n={pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:e.util.clone(e.languages.ruby)}};e.languages.insertBefore("ruby","keyword",{regex:[{pattern:/%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}],variable:/[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,symbol:/:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.insertBefore("ruby","number",{builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.ruby.string=[{pattern:/%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,greedy:!0,inside:{interpolation:n}},{pattern:/("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,greedy:!0,inside:{interpolation:n}}]}(Prism);
Prism.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d+.*$/m],deleted:/^[-<].*$/m,inserted:/^[+>].*$/m,diff:{pattern:/^!(?!!).+$/m,alias:"important"}};
Prism.languages.http={"request-line":{pattern:/^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,inside:{property:/^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,"attr-name":/:\w+/}},"response-status":{pattern:/^HTTP\/1.[01] \d+.*/m,inside:{property:{pattern:/(^HTTP\/1.[01] )\d+.*/i,lookbehind:!0}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var httpLanguages={"application/json":Prism.languages.javascript,"application/xml":Prism.languages.markup,"text/xml":Prism.languages.markup,"text/html":Prism.languages.markup};for(var contentType in httpLanguages)if(httpLanguages[contentType]){var options={};options[contentType]={pattern:new RegExp("(content-type:\\s*"+contentType+"[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*","i"),lookbehind:!0,inside:{rest:httpLanguages[contentType]}},Prism.languages.insertBefore("http","header-name",options)};
Prism.languages.ini={comment:/^[ \t]*;.*$/m,selector:/^[ \t]*\[.*?\]/m,constant:/^[ \t]*[^\s=]+?(?=[ \t]*=)/m,"attr-value":{pattern:/=.*/,inside:{punctuation:/^[=]/}}};
Prism.languages.java=Prism.languages.extend("clike",{keyword:/\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,number:/\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,operator:{pattern:/(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,lookbehind:!0}}),Prism.languages.insertBefore("java","function",{annotation:{alias:"punctuation",pattern:/(^|[^.])@\w+/,lookbehind:!0}});
Prism.languages.json={property:/"(?:\\.|[^\\"])*"(?=\s*:)/gi,string:/"(?!:)(?:\\.|[^\\"])*"(?!:)/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/g,punctuation:/[{}[\]);,]/g,operator:/:/g,"boolean":/\b(true|false)\b/gi,"null":/\bnull\b/gi},Prism.languages.jsonp=Prism.languages.json;
Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,"function":/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/};
Prism.languages.makefile={comment:{pattern:/(^|[^\\])#(?:\\(?:\r\n|[\s\S])|.)*/,lookbehind:!0},string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},builtin:/\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,symbol:{pattern:/^[^:=\r\n]+(?=\s*:(?!=))/m,inside:{variable:/\$+(?:[^(){}:#=\s]+|(?=[({]))/}},variable:/\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,keyword:[/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,{pattern:/(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,lookbehind:!0}],operator:/(?:::|[?:+!])?=|[|@]/,punctuation:/[:;(){}]/};
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.nginx=Prism.languages.extend("clike",{comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},keyword:/\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|server|events|location|include|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i}),Prism.languages.insertBefore("nginx","keyword",{variable:/\$[a-z_]+/i});
Prism.languages.objectivec=Prism.languages.extend("c",{keyword:/\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,operator:/-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/});
Prism.languages.perl={comment:[{pattern:/(^\s*)=\w+[\s\S]*?=cut.*/m,lookbehind:!0},{pattern:/(^|[^\\$])#.*/,lookbehind:!0}],string:[{pattern:/\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,greedy:!0},{pattern:/\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\1/,greedy:!0},{pattern:/\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/,greedy:!0},{pattern:/\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/,greedy:!0},{pattern:/\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,greedy:!0},{pattern:/\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/,greedy:!0},{pattern:/("|`)(?:[^\\]|\\[\s\S])*?\1/,greedy:!0},{pattern:/'(?:[^'\\\r\n]|\\.)*'/,greedy:!0}],regex:[{pattern:/\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[msixpodualngc]*/,greedy:!0},{pattern:/\b(?:m|qr)\s+([a-zA-Z0-9])(?:[^\\]|\\.)*?\1[msixpodualngc]*/,greedy:!0},{pattern:/\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,greedy:!0},{pattern:/\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,greedy:!0},{pattern:/\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,greedy:!0},{pattern:/\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,lookbehind:!0,greedy:!0},{pattern:/\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,greedy:!0}],variable:[/[&*$@%]\{\^[A-Z]+\}/,/[&*$@%]\^[A-Z_]/,/[&*$@%]#?(?=\{)/,/[&*$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i,/[&*$@%]\d+/,/(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],filehandle:{pattern:/<(?![<=])\S*>|\b_\b/,alias:"symbol"},vstring:{pattern:/v\d+(\.\d+)*|\d+(\.\d+){2,}/,alias:"string"},"function":{pattern:/sub [a-z0-9_]+/i,inside:{keyword:/sub/}},keyword:/\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,number:/\b-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)\b/,operator:/-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,punctuation:/[{}[\];(),:]/};
Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:{pattern:/\?>|<\?(?:php|=)?/i,alias:"important"},variable:/\$\w+\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&/(?:<\?php|<\?)/gi.test(e.code)&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi,function(a){return e.tokenStack.push(a),"___PHP"+e.tokenStack.length+"___"}),e.grammar=Prism.languages.markup)}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&e.backupCode&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language&&e.tokenStack){e.grammar=Prism.languages.php;for(var a,n=0;a=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("___PHP"+(n+1)+"___",'<span class="token php language-php">'+Prism.highlight(a,e.grammar,"php").replace(/\$/g,"$$$$")+"</span>");e.element.innerHTML=e.highlightedCode}}));
Prism.languages.python={"triple-quoted-string":{pattern:/"""[\s\S]+?"""|'''[\s\S]+?'''/,alias:"string"},comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:{pattern:/("|')(?:\\\\|\\?[^\\\r\n])*?\1/,greedy:!0},"function":{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)[a-z0-9_]+/i,lookbehind:!0},keyword:/\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,"boolean":/\b(?:True|False)\b/,number:/\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,punctuation:/[{}[\];(),.:]/};
Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},string:{pattern:/(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,greedy:!0,lookbehind:!0},variable:/@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,"function":/\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,"boolean":/\b(?:TRUE|FALSE|NULL)\b/i,number:/\b-?(?:0x)?\d*\.?[\da-f]+\b/,operator:/[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};




// Require authorization to execute callback
function auth(points){
  points = points || 0;
  return new Promise(function(resolve, reject){
    if (!user) {
      login();
      return reject();
    }
    if (points && user.points < points) {
      modal("permission").show(100);
      return reject();
    }

    resolve(user);
  });
}






// Supermenu
var smoothscroll = false;

// http://stackoverflow.com/a/9282379/938236
// Should be executed BEFORE any hash change has occurred.
(function(namespace) { // Closure to protect local variable "var hash"
    if ('replaceState' in history) { // Yay, supported!
      namespace.replaceHash = function(newhash) {
        if ((''+newhash).charAt(0) !== '#') newhash = '#' + newhash;
        history.replaceState('', '', newhash);
      }
    } else {
      var hash = location.hash;
      namespace.replaceHash = function(newhash) {
        if (location.hash !== hash) history.back();
        location.hash = newhash;
      };
    }
})(window);


pagex(/^\/lesson/, function(id){

  try {
    renderMathInElement(document.body, { delimiters: [
      { left: "$$", right: "$$", display: true  },
      { left: '\\(', right: '\\)', display: false }
    ]});
  } catch (e) {
    console.log("Katex failed:", e);
  }

  var ready = false;
  var loaded = false;

  var startEdition = function(){
    auth().then(function(){

      u('code[class*="language-"]').each(function(snippet){
        snippet.textContent = snippet.textContent;
      });

      u("form.lesson").addClass("edit").find('article').attr('contenteditable', true);

      u('.katex').parent().each(function(node){
        u(node).html('\\(' + u(node).find('annotation').html() + '\\)').addClass('math-tex');
      });


      if (!loaded) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '/ckeditor/ckeditor.js';
        script.onload = function(e) {
          loaded = true;
          CKEDITOR.on('instanceReady', function(){
            ready = true;
          });
        }
        u("body").append(script);
      } else {
        CKEDITOR.inline('editor');
      }
    });
  }

  function saveContent(time){
    if (!ready) return setTimeout(function(){ saveContent(100); }, time * 2);

    function init(html){
      u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);
      CKEDITOR.instances.editor.destroy();

      // Overwrite the current data in case anything has changed/cleaning
      u("article.content").html(html);

      try {
        renderMathInElement(document.body, { delimiters: [
          { left: "$$", right: "$$", display: true  },
          { left: '\\(', right: '\\)', display: false }
        ]});
      } catch (e) {
        console.log("Katex failed:", e);
      }

      try {
        Prism.highlightAll();
      } catch (e) {
        console.log("Prism failed:", e);
      }
    }

    var html = encodeURIComponent(CKEDITOR.instances.editor.getData().replace(/\n/g, '<br>'));
    ajax(u('form.lesson').attr("action"), {
      method: "POST", body: "content=" + html
    }, function(err, data){
      init(data ? data.html : html);
    });
  }

  u("button.edit").handle('click', function(){
    startEdition();
  });
  Mousetrap.bind('mod+e', function(e) {
    e.preventDefault();
    startEdition();
  });

  u("button.save").handle('click', function(){
    saveContent();
  });
  Mousetrap.bind(['mod+s'], function(e) {
    e.preventDefault();
    saveContent(100);
  });





  // // Initialize the editor in the element that is contenteditable
  // var editor = new Editor("article.content", { menu: "editormenu", active: false });
  //
  // editor.add("type", {
  //   menu: {
  //     html:'<select name="type">\
  //             <option value="p">Paragraph</option>\
  //             <option value="h1">H1</option>\
  //             <option value="h2">H2</option>\
  //             <option value="code">code</option>\
  //             <option value="math">math</option>\
  //           </select>',
  //     defaults: true
  //   },
  //   init: function(editor){
  //     editor.on('clean', function(e, node){
  //
  //       // Lonely <code> are wrapped in <pre>
  //       var bare = u(editor.element).children('code').wrap('<pre>');
  //       var nopre = u(editor.element).children().children('code').parent(function(node){
  //         return !u(node).is('pre');
  //       });
  //
  //       nopre.filter(function(node){
  //         return u(node).text() === u(node).children().text();
  //       }).wrap('<pre>').html(nopre.html());
  //     });
  //   },
  //   action: function (editor) {
  //     u('[name="type"]').not('.listened').addClass('listened').on('change', function(e){
  //
  //       if (e.target.value === 'math') {
  //         var equationblock = createEquation(editor.selection.text);
  //         u(editor.selection.element).html('').append(equationblock);
  //         return;
  //       } else {
  //         u(editor.selection.element).closest('.equation').each(function(eq){
  //           u(eq).closest('p').html(u(eq).data('latex'));
  //         });
  //       }
  //
  //       editor.tag(e.target.value);
  //     });
  //   }
  // });
  //
  // editor.trigger('menu:separator');
  //
  // // Register a new action called "bold"
  // editor.add("bold", {
  //   menu: "<strong>B</strong>", shortcut: "ctrl+b",
  //   action: function(editor){
  //     editor.command("bold");
  //   }
  // });
  //
  // // Register a new action called "italic"
  // editor.add("italic", {
  //   menu: "<em>i</em>", shortcut: "ctrl+i",
  //   action: function(editor){
  //     editor.command("italic");
  //   }
  // });
  //
  // // Register a new action called "link"
  // editor.add("link", {
  //   menu: "<i class='icon-link'></i>", shortcut: "ctrl+k",
  //   action: function(editor) {
  //     var link = editor.selection.element.getAttribute("href") || "";
  //     var address = prompt("Link address", link);
  //     editor.tag('a', (address ? { href: address } : false));
  //   }
  // });
  //
  // // Add an option to add code
  // editor.add("code", {
  //   menu: "<i class='icon-terminal'></i>", shortcut: "ctrl+`",
  //   action: function(editor) {
  //     editor.tag("code");
  //   }
  // });
  //
  // editor.trigger('menu:separator');
  //
  // // Register a new action called "italic"
  // editor.add('info', {
  //   menu: "<i class='icon-help'></i>",
  //   shortcut: "ctrl+?",
  //   action: function(){
  //     window.open("https://github.com/franciscop/modern-editor", "_blank");
  //   }
  // });


  // // Require authorization to execute callback
  // function auth(number, callback){
  //   if (!user) {
  //     return login();
  //   }
  //   // if (!user.over(100)) {
  //   //   return modal("permission").show(100);
  //   // }
  //
  //   callback.call();
  // }
  //
  //
  // function createEquation(latex){
  //   if (!latex) latex = '';
  //   var rendered = katex.renderToString(latex);
  //   return u('<div class="equation flex two">')
  //     .data('latex', latex)
  //     .append('<pre><code>' + latex)
  //     .append('<div class="live"><div class="visual">' + rendered + '</div></div>');
  // }
  //
  //
  // editor.add("edit", {
  //   shortcut: "ctrl+e",
  //   init: function (editor) {
  //     editor.on('clean', function () {
  //       if (!editor.options.active) return false;
  //       // u('.katex').find('annotation').each(function(equation){
  //       //   var eq = u(equation).html();
  //       //   u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       // });
  //       //
  //       // u('.katex').find('.equation').each(function(equation){
  //       //   var eq = u(equation).html();
  //       //   u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       // });
  //
  //       // u(editor.element).find('.equation').each(function(equation){
  //       //   var latex = u(equation).find('pre').text();
  //       //   if (latex !== u(equation).data('latex')) {
  //       //     u(equation).data('latex', latex);
  //       //     var rendered = katex.renderToString(latex);
  //       //     u(equation).find('.visual').html(rendered);
  //       //   }
  //       // });
  //     });
  //   },
  //   action: function(editor){
  //     auth(100, function(){
  //       u("form.lesson").addClass("edit").find('article').attr('contenteditable', true);
  //
  //       u('.katex').find('annotation').each(function(equation){
  //         var eq = u(equation).html();
  //         u(equation).closest('.katex-display').parent().html('$$' + eq + '$$');
  //       });
  //
  //       u('.katex').find('annotation').each(function(equation){
  //         var eq = u(equation).html();
  //         u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       });
  //
  //       // u('pre', editor.element).each(function(pre){
  //       //   var clean = u(pre).html().replace(/\<br[\s\\]*>/g, '\n');
  //       //   u('<pre>').html(clean).text();
  //       //   u(pre).html('<code>' + u('<pre>').html(clean).text() + '</code>');
  //       // });
  //
  //       editor.options.active = true;
  //     });
  //   }
  // });
  //
  // editor.add("save", {
  //   shortcut: "ctrl+s",
  //   action: function(editor){
  //     var form = u("form.edit");
  //
  //     u(editor.element).find('pre').each(function(pre){
  //       var inner = u(u(pre).children('code').first() || u(pre).first());
  //       var clean = inner.html().replace(/\<br[\s\\]*>/g, '\n').replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>').replace(/\&amp\;/g, '&');
  //       console.log(u('<pre>').text(clean).text(), inner.html());
  //       if (!u(pre).children()) u(pre).html('<code></code>');
  //       u(pre).find('code').text(clean);
  //     });
  //
  //     u(editor.element).find('.equation').each(function(equation){
  //       var latex = u(equation).data('latex');
  //       u(equation).parent().html('').append('$$' + latex + '$$');
  //     });
  //
  //     var html = encodeURIComponent(form.find("article.content").html());
  //     ajax(form.attr("action"), { method: "POST", body: "content=" + html }, function(err, data){
  //
  //       u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);
  //
  //       // Overwrite the current data in case anything has changed/cleaning
  //       u("article.content").html(data ? data.html : html);
  //
  //       try {
  //         renderMathInElement(document.body, { delimiters: [
  //           { left: "$$", right: "$$", display: true  },
  //           { left: '@@', right: '@@', display: false }
  //         ]});
  //       } catch (e) {
  //         console.log("Katex failed:", e);
  //       }
  //
  //       // try {
  //       //   Prism.highlightAll();
  //       // } catch (e) {
  //       //   console.log("Prism failed:", e);
  //       // }
  //
  //       // Deactivate the editor
  //       editor.options.active = false;
  //     });
  //   }
  // });
  //
  //
  //
  // // Setup the drop listeners.
  // u('body').on('drop', function(e) {
  //   console.log(e);
  //   var data = new FormData();
  //   data.append("image", e.dataTransfer.files[0]);
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/lesson/upload', true);
  //
  //   xhr.upload.onprogress = function(e) {
  //     if (e.lengthComputable) {
  //       var percentComplete = (e.loaded / e.total) * 100;
  //       console.log(percentComplete + '% uploaded');
  //     }
  //   };
  //   xhr.onload = function() {
  //     if (this.status == 200) {
  //       console.log("Success");
  //       var res = JSON.parse(this.responseText);
  //       u('img').each(function(node){
  //         if (/^data\:/.test(u(node).attr('src'))) {
  //           u(node).attr({ src: res.image });
  //         }
  //       });
  //     };
  //   };
  //   xhr.send(data);
  //
  //   // var files = e.dataTransfer.files; // FileList object.
  //   //
  //   // //files is a FileList of File objects. List some properties.
  //   // for (var i = 0, f; f = files[i]; i++) {
  //   //   console.log('"' + f.name + '" (' + (f.type || 'n/a') + ')');
  //   //   console.log(f.size + ' bytes');
  //   //   console.log('last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'));
  //   // }
  // });
  //
  //
  //
  // u("form.lesson").on("submit", function(e){
  //   e.preventDefault();
  //   editor.trigger('action:save');
  // });
  //

  // if (u("form.lesson").hasClass("edit") && user) {
  //   editor.trigger('action:edit');
  // }






  // Supermenu
  var parts = window.location.pathname.replace(/^\//, '').split('/');
  if (['records', 'history'].includes(parts[1])) {
    return;
  }
  u('article h2').each(function(node){
    u(node).attr('id', u(node).html().replace(/\W/g, '-'));
  });
  var lessonName = u('h1').html();
  var main = '<a href="#" class="pseudo button"><strong>' + lessonName + '</strong></a>';
  u('nav .menu').html(main).append(function(node, i){
    var id = u(node).attr('id');
    var html = u(node).html();
    return '<a href="#' + id + '" class="pseudo button">' + (i+1) + '. ' + html + '</a>';
  }, u('article').find('h2, h3'));

  u('.menu').on('click', 'a', function(e){
    u('#responsive-menu').first().checked = false;
    u('body').removeClass('no-scroll');

    if (smoothscroll) {
      e.preventDefault();
      var to = u(u(e.currentTarget).attr('href'));
      if (to.length) {
        to.scroll();
      }
    }
  });


  function shouldScrollOrNot(){
    u('body').toggleClass('no-scroll', u('#responsive-menu').first().checked);
  }
  u('#responsive-menu').on('change', shouldScrollOrNot);
  shouldScrollOrNot();


  // Change the title of the section
  var pagesize = u('body').size().height / 2;
  function setupSection () {
    var current = u('article h2').filter(function(node){
      return u(node).size().top < pagesize;
    }).last();
    var section = u(current).html() || u('h1').html();
    if (u('h1').size().top > 0 && u('h1').size().top < pagesize) {
      section = u('h1').html();
      hash = u(current).attr('id');
    }
    u('nav header').html(section);
  }
  u(document).on('scroll', setupSection);
  setupSection();
});

// SUBJECT page
// action: { add, form: { save, remove, edit, cancel }}
// Non capturing group (http://stackoverflow.com/a/3513858/938236)
pagex(/^\/subject/, subject);
pagex(/^\/$/, subject);

function subject(bla){

  var action = {};

  // Functions for the subject
  action.add = function(e){
    console.log("Added");
    if(!user) {
      return login();
    }

    // if(!user.over(1000)) {
    //   return modal('permission').show(1000);
    // }

    template('template.add', {}, action.form).before('section.add');
    u(u('.preview.add').nodes.pop()).closest('form').find('input').first().focus();
  };

  // Add the handlers for the subject form (add or edit)
  action.form = function(){

    // Ajaxify the form to save it without reloading
    u('form', this).ajax(action.form.save);

    // Add the class dynamically
    u('form', this).addClass('add');

    // Give handle for canceling adding a new subject
    u('.cancel', this).on('click', action.form.remove);
  };

  // Action to perform once the subject is saved
  action.form.save = function(subject){
    window.location.reload();
  };

  // Cancel adding the template form
  action.form.remove = function(e){
    e.preventDefault();
    u(this).closest('form').remove();
  };

  // When editing one form
  action.form.edit = function(e){
    e.preventDefault();

    if(!user) {
      login();
    }

    // if(!user.over(500)) {
    //   return modal('permission').show(500);
    // }

    u(this).closest('form').addClass('edit');
    u(this).closest('form').find('input').first().focus();
  };

  action.form.cancel = function(){
    u(this).closest('form').removeClass('edit');
  };


  // IMPLEMENTATION
  u('button.add').on('click', action.add);

  // When we save a lesson that we were editing
  u('form.preview').ajax(action.form.save);

  // Edit a particular lesson
  u('form.preview .edit').on('click', action.form.edit);

  // Cancel the edition of a particular lesson
  u('form.preview .cancel').on('click', action.form.cancel);
};

// TEST page

//
pagex(/^\/test/, function(){

  var actions = {};

  // Attach actions to the new lesson template
  // These are different enough than editing to have a new function
  actions.template = function(){

    // Submit (save) the new lesson through ajax
    u('form.test', this).ajax(function(err, data){
      window.location.reload();
    });

    // Cancel the new lesson
    u('.cancel', this).on('click', function(e){
      window.location.reload();
    });
  }

  actions.add = function(){
    template('template.add', {}, actions.template).replace('form.test');
    u('form.test textarea').first().focus();
  };

  actions.edit = function(){
    u('form.test').addClass('edit').ajax(function(){
      window.location.reload();
    }).first().focus();
  };

  actions.correctAnswer = function(){
    var number = 3;
    var countDown = function(){
      if (u('[data-good]:checked').length == 0) return false;
      if (number > 0) {
        u('.refresh').html('Next in ' + number);
        setTimeout(countDown, 1000);
        number--;
      } else {
        window.location.reload();
      }
    };
    countDown();
  };




  // Reset forms on load (or refresh page)
  u('form.test').each(function(node){ node.reset(); });

  u('.add').on('click', actions.add);

  u('.edit').on('click', actions.edit);

  u('.cancel').on('click', function(){
    window.location.reload();
  });

  u('[data-good]').on('change', actions.correctAnswer);

  u('.answer label').on('click', function(){
    u('.refresh').html('New question');
  });

  u('.refresh').on('click', function(e){
    e.preventDefault();
    window.location.reload();
  });

  if (u('form.test').nodes.length === 0) {
    template('template.add', {}, actions.template).before('template.add');
    u('form.test textarea').first().focus();
  }
});
