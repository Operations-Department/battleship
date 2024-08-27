(()=>{var t={740:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],s=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);s=!0);}catch(t){l=!0,o=t}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return i(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,c(n.key),n)}}function c(t){var e=function(t,e){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(e)?e:e+""}var s=r(674),l=new s("Aircraft Carrier",5),d=new s("Battleship",4),u=new s("Destroyer",3),f=new s("Submarine",3),p=new s("Cruiser",2),h=new s("Aircraft Carrier",5),m=new s("Battleship",4),v=new s("Destroyer",3),y=new s("Submarine",3),b=new s("Cruiser",2),g=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.board=[];for(var e=0;e<10;e++)this.board.push(new Array(10).fill(null));this.occupiedCoordinates=[],this.desiredCoordinates=[],this.firedUpon=[],this.hits=[],this.misses=[],this.playerACLocation=[],this.playerBLocation=[],this.playerDLocation=[],this.playerSUBLocation=[],this.playerCLocation=[],this.playerShipsObject={pAC:l,pB:d,pD:u,pSUB:f,pC:p},this.compShipsObject={cAC:h,cB:m,cD:v,cSUB:y,cC:b}},(e=[{key:"avoidOverBoard",value:function(t,e,r,n){return!(t<0||e<0||t>9||e>9||"horizontal"===r&&e+n.length>10||"vertical"===r&&t+n.length>10)}},{key:"setDesiredCoordinates",value:function(t,e,r,n){if("horizontal"===n)for(var o=0;o<r.length;o++)this.desiredCoordinates.push([t,e+o]);else if("vertical"===n)for(var i=0;i<r.length;i++)this.desiredCoordinates.push([t+i,e]);return this.desiredCoordinates}},{key:"occupiedSpotCheck",value:function(){for(var t=0;t<this.occupiedCoordinates.length;t++)for(var e=o(this.occupiedCoordinates[t],2),r=e[0],n=e[1],i=0;i<this.desiredCoordinates.length;i++){var a=o(this.desiredCoordinates[i],2),c=a[0],s=a[1];if(r===c&&n===s)return this.desiredCoordinates=[],!0}return!1}},{key:"placeShip",value:function(t,e,r,n){var i=o(e,2),a=i[0],c=i[1];if(!this.avoidOverBoard(a,c,r,t))return"Invalid position";if(this.setDesiredCoordinates(a,c,t,r),this.occupiedSpotCheck())return"That spot is taken";for(var s=0;s<this.desiredCoordinates.length;s++){var l=o(this.desiredCoordinates[s],2),d=l[0],u=l[1];this.board[d][u]=n,this.occupiedCoordinates.push([d,u]),"pAC"===n&&this.playerACLocation.push([d,u]),"pB"===n&&this.playerBLocation.push([d,u]),"pD"===n&&this.playerDLocation.push([d,u]),"pSUB"===n&&this.playerSUBLocation.push([d,u]),"pC"===n&&this.playerCLocation.push([d,u])}this.desiredCoordinates=[]}},{key:"placeRandomShip",value:function(t,e){for(var r=!1;!r;){var n=Math.floor(10*Math.random()),o=Math.floor(10*Math.random()),i=this.getRandomShipOrientation();this.avoidOverBoard(n,o,i,t)&&(this.setDesiredCoordinates(n,o,t,i),this.occupiedSpotCheck()||(this.placeShip(t,[n,o],i,e),r=!0))}}},{key:"getRandomShipOrientation",value:function(){return 0==Math.floor(10*Math.random())%2?"horizontal":"vertical"}},{key:"firedCheck",value:function(t,e){for(var r=0;r<this.firedUpon.length;r++){var n=o(this.firedUpon[r],2),i=n[0],a=n[1];if(t===i&&e===a)return!0}return!1}},{key:"receiveAttack",value:function(t){var e=o(t,2),r=e[0],n=e[1],i=this.board[r][n];return this.firedCheck(r,n)?"You already shot there":(this.firedUpon.push([r,n]),null===i?(this.misses.push([r,n]),this.board[r][n]="o","Miss"):(this.hits.push([r,n]),this.playerShipsObject[i]?this.playerShipsObject[i].getHit():this.compShipsObject[i]&&this.compShipsObject[i].getHit(),this.board[r][n]="x","Hit!"))}},{key:"allPlayerShipsSunk",value:function(){return Object.values(this.playerShipsObject).every((function(t){return t&&t.isSunk}))}},{key:"allCompShipsSunk",value:function(){return Object.values(this.compShipsObject).every((function(t){return t&&t.isSunk}))}}])&&a(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();t.exports=g},317:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,a(n.key),n)}}function i(t,e,r){return e&&o(t.prototype,e),r&&o(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t){var e=function(t,e){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(e)?e:e+""}var c=r(740),s=i((function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=e,this.type=r,this.gameboard=new c}));t.exports=s},674:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}function n(t){var r=function(t,r){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(r)?r:r+""}var o=function(){return t=function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=e,this.length=r,this.hitPoints=0,this.isSunk=!1},(e=[{key:"getHit",value:function(){this.hitPoints!==this.length&&this.hitPoints++,this.hitPoints===this.length&&(this.isSunk=!0)}},{key:"checkIfSunk",value:function(){return this.isSunk}}])&&r(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();t.exports=o}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.p="/battleship/";var n={};(()=>{"use strict";r.d(n,{I:()=>tt});const t=r.p+"sounds/bigSplash.7105be403036a351f8fe637ac2353abc.mp3",e=r.p+"sounds/hitEcho.c2e31f3126531db5ef1db5456542589c.mp3";function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],s=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);s=!0);}catch(t){l=!0,o=t}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return i(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}var a=new Audio(t),c=new Audio(e),s=[],l=[];function d(t){u(document.getElementById("".concat(t,"-board")))}function u(t){for(var e=0;e<10;e++){var r=document.createElement("div");r.classList.add("row");for(var n=0;n<10;n++){var o=document.createElement("div");o.classList.add("cell"),o.dataset.x=e,o.dataset.y=n,r.appendChild(o)}t.appendChild(r)}}function f(t,e,r){var n=o(tt(t),2),i=n[0],a=n[1],c=e.length;i=Number(i),a=Number(a);var s=!1;if(("vertical"===r&&i+c>10||"horizontal"===r&&a+c>10)&&(s=!0),"vertical"===r)for(var d=0;d<c;d++){var u=document.querySelector('#board .cell[data-x="'.concat(i+d,'"][data-y="').concat(a,'"]'));u&&!s&&(u.classList.add("hoverHighlight"),u.classList.remove("overboard"),l.push([i+d,a]),p()&&(u.classList.remove("hoverHighlight"),u.classList.add("overboard"),s=!0)),u&&s&&(u.classList.remove("hoverHighlight"),u.classList.add("overboard"))}else if("horizontal"===r)for(var f=0;f<c;f++){var h=document.querySelector('#board .cell[data-x="'.concat(i,'"][data-y="').concat(a+f,'"]'));h&&!s&&(h.classList.add("hoverHighlight"),h.classList.remove("overboard"),l.push([i,a+f]),p()&&(h.classList.remove("hoverHighlight"),h.classList.add("overboard"),s=!0)),h&&s&&(h.classList.remove("hoverHighlight"),h.classList.add("overboard"))}return s}function p(){var t=l.map((function(t){return t.join("")})),e=s.map((function(t){return t.join("")}));return t.some((function(t){return e.includes(t)}))}function h(t,e){t.classList.add("forbiddenButton"),e.classList.add("forbiddenButton")}function m(t){t.classList.remove("forbiddenButton"),document.getElementById("buttonDiv").querySelectorAll("button").forEach((function(t){t.classList.remove("selectedButton")}))}function v(t,e,r,n){var i=e.gameboard.receiveAttack(r);return function(t){"Miss"===t?a.play():c.play()}(i),setTimeout((function(){!function(t,e,r){var n=o(r,2),i=n[0],a=n[1],c=document.querySelector(".".concat(t,'-board [data-x="').concat(i,'"][data-y="').concat(a,'"]'));c.classList.add("forbiddenButton");var s=document.createElement("div");s.id="marker","Miss"===e?(c.appendChild(s),s.classList.add("markerMiss")):"Hit!"===e?(c.appendChild(s),s.classList.add("markerHit")):console.error(new Error("Something wrong happened"))}(e.type,i,r)}),500),n=!1,(e.gameboard.allPlayerShipsSunk()||e.gameboard.allCompShipsSunk())&&(function(t){var e=document.getElementById("app"),r=document.createElement("div");r.classList.add("overlay"),e.appendChild(r);var n=document.createElement("h1"),o=document.createElement("h2");"player"===t.type?(n.textContent="Congratulations!",o.textContent="You Win"):(n.textContent="Game Over!",o.textContent="You Lose"),r.appendChild(n),r.appendChild(o);var i=document.createElement("button");i.textContent="Play Again?",r.appendChild(i),i.addEventListener("click",(function(){window.location.reload()}))}(t),n=!0),n}const y=r.p+"sounds/brrrt.163eb3637bc05c541d859caac432b3df.mp3",b=r.p+"sounds/fireEcho.6ef049eaf206d1679f55d6afd5311993.mp3",g=r.p+"sounds/missile.021130b51f2dd6681db6611ca20ac50d.mp3",C=r.p+"sounds/mortar.9d5f078f985bc3ceb5663cb8370662dc.mp3",S=r.p+"sounds/phalanx.18a4f5f75a1d3ce3ad51550cbcd76bde.mp3";function L(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}var E=r(674),w=(r(740),r(317)),B={1:new Audio(y),2:new Audio(b),3:new Audio(g),4:new Audio(C),5:new Audio(S)},k=new E("Aircraft Carrier",5),A=new E("Battleship",4),j=new E("Destroyer",3),x=new E("Submarine",3),O=new E("Cruiser",2),I=new E("Aircraft Carrier",5),D=new E("Battleship",4),P=new E("Destroyer",3),M=new E("Submarine",3),H=new E("Cruiser",2),U=new w("Player","player"),T=new w("Computer","computer");T.gameboard.placeRandomShip(I,"cAC"),T.gameboard.placeRandomShip(D,"cB"),T.gameboard.placeRandomShip(P,"cD"),T.gameboard.placeRandomShip(M,"cSUB"),T.gameboard.placeRandomShip(H,"cC"),function(){var t=document.getElementById("app"),e=document.createElement("div");e.classList.add("overlay"),e.id="overlay",t.appendChild(e);var r=document.createElement("h1");r.textContent="Place your formation, Captain",e.appendChild(r);var n=document.createElement("div");n.classList.add("uiBody"),e.appendChild(n);var o=document.createElement("div");o.classList.add("orientationDiv"),o.id="orientationDiv",n.appendChild(o);var i=document.createElement("button");i.id="horizontal",i.textContent="Horizontal";var a=document.createElement("button");a.id="vertical",a.textContent="Vertical",o.appendChild(i),o.appendChild(a);var c=document.createElement("div");u(c),c.id="board",n.appendChild(c);var s=document.createElement("div");s.classList.add("buttonDiv"),s.id="buttonDiv",n.appendChild(s);var l=document.createElement("button");l.textContent="Carrier";var d=document.createElement("button");d.textContent="Battleship";var f=document.createElement("button");f.textContent="Destroyer";var p=document.createElement("button");p.textContent="Submarine";var h=document.createElement("button");h.textContent="Cruiser",s.appendChild(l),l.id="carrier",s.appendChild(d),d.id="battleship",s.appendChild(f),f.id="destroyer",s.appendChild(p),p.id="submarine",s.appendChild(h),h.id="cruiser";var m=document.createElement("div");m.classList.add("confirmationDiv"),m.id="confirmationDiv",e.appendChild(m);var v=document.createElement("button");v.textContent="Reset",v.id="reset";var y=document.createElement("button");y.textContent="Confirm",y.id="confirm",m.appendChild(v),m.appendChild(y)}(),d("player"),d("computer");var z,q,N=document.getElementById("board"),R=document.getElementById("buttonDiv"),Y=document.querySelectorAll("#board .cell"),$=[],G=document.getElementById("carrier"),V=document.getElementById("battleship"),W=document.getElementById("destroyer"),F=document.getElementById("submarine"),J=document.getElementById("cruiser"),K={"Aircraft Carrier":[k,"pAC"],Battleship:[A,"pB"],Destroyer:[j,"pD"],Submarine:[x,"pSUB"],Cruiser:[O,"pC"]};N.addEventListener("mouseover",(function(t){f(t,q,z)})),N.addEventListener("mouseout",(function(t){Y.forEach((function(t){t.classList.remove("hoverHighlight"),t.classList.remove("overboard")})),l=[]})),N.addEventListener("mouseup",(function(t){var e,r=tt(t);f(t,q,z)||($.push([r,z,q]),e=N,$.forEach((function(t){var r=t[2];r===k&&h(G,e),r===A&&h(V,e),r===j&&h(W,e),r===x&&h(F,e),r===O&&h(J,e)})),function(t,e,r){var n=o(t,2),i=n[0],a=n[1],c=e.length;if(i=Number(i),a=Number(a),"vertical"===r)for(var l=0;l<c;l++){var d=document.querySelector('#board .cell[data-x="'.concat(i+l,'"][data-y="').concat(a,'"]'));d&&(s.push([i+l,a]),d.classList.add("selectedHighlight"))}else if("horizontal"===r)for(var u=0;u<c;u++){var f=document.querySelector('#board .cell[data-x="'.concat(i,'"][data-y="').concat(a+u,'"]'));f&&(s.push([i,a+u]),f.classList.add("selectedHighlight"))}}(r,q,z),5===$.length&&Q.classList.remove("forbiddenButton"))})),R.addEventListener("click",(function(t){switch(!0){case t.target===G:q=k,m(N),G.classList.add("selectedButton");break;case t.target===V:q=A,m(N),V.classList.add("selectedButton");break;case t.target===W:q=j,m(N),W.classList.add("selectedButton");break;case t.target===F:q=x,m(N),F.classList.add("selectedButton");break;case t.target===J:q=O,m(N),J.classList.add("selectedButton")}})),document.getElementById("orientationDiv").addEventListener("click",(function(t){var e=document.getElementById("horizontal"),r=document.getElementById("vertical");t.target===r?(z="vertical",r.classList.add("selectedButton"),e.classList.remove("selectedButton")):(z="horizontal",r.classList.remove("selectedButton"),e.classList.add("selectedButton"))})),document.addEventListener("DOMContentLoaded",(function(){horizontal.click(),G.click(),Q.classList.add("forbiddenButton")})),document.getElementById("reset").addEventListener("click",(function(){$=[],m(N),function(t){t.querySelectorAll("button").forEach((function(t){t.classList.remove("forbiddenButton")}))}(R),Y.forEach((function(t){t.classList.remove("selectedHighlight")})),s=[],G.click(),Q.classList.add("forbiddenButton")}));var Q=document.getElementById("confirm");Q.addEventListener("click",(function(){var t=document.getElementById("overlay");5===$.length&&t.remove(),function(t){for(var e=0;e<t.length;e++){var r=t[e][0].map((function(t){return Number(t)})),n=t[e][1],o=t[e][2].name,i=K[o];U.gameboard.placeShip(i[0],r,n,i[1])}}($),s.forEach((function(t){var e=o(t,2),r=e[0],n=e[1];r=Number(r),n=Number(n),document.querySelector('#player-board .cell[data-x="'.concat(r,'"][data-y="').concat(n,'"]')).classList.add("occupiedCell")}))}));var X=!0,Z=document.getElementById("computer-board");function _(t){if(!X&&!t){var e,r=it();B[r].play(),e=nt.length?nt.shift():function(){var t=Math.floor(Math.random()*et.length),e=et.splice(t,1)[0].toString().split("").map(Number);return 1===e.length&&e.unshift(0),function(t){t=t.join("");for(var e=function(e){for(var r=function(r){ot[e][r].forEach((function(n){var o,i,a=n.join("");if(t===a)return nt=(i=ot[e][r],nt=function(t){if(Array.isArray(t))return L(t)}(i)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(i)||function(t,e){if(t){if("string"==typeof t)return L(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?L(t,e):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return e.join("")!==t})),o=nt.map((function(t){return t.join("")})).map((function(t){return Number(t)})),void(et=et.filter((function(t){return!o.includes(t)})))}))},n=0;n<ot[e].length;n++)r(n)},r=0;r<ot.length;r++)e(r)}(e),e}(),setTimeout((function(){v(T,U,e,t),X=!0,Z.classList.remove("forbiddenButton")}),2e3)}}function tt(t){return[t.target.dataset.x,t.target.dataset.y]}Z.addEventListener("click",(function(t){if(X){var e=tt(t),r=it();B[r].play(),Z.classList.add("forbiddenButton"),setTimeout((function(){var t=v(U,T,e,t);setTimeout((function(){X=!1,_(t)}),2e3)}),2e3)}else _()}));for(var et=[],rt=0;rt<=99;rt++)et.push(rt);var nt=[],ot=[[U.gameboard.playerACLocation],[U.gameboard.playerBLocation],[U.gameboard.playerDLocation],[U.gameboard.playerSUBLocation],[U.gameboard.playerCLocation]];function it(){return Math.floor(5*Math.random())+1}})()})();