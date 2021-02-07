(()=>{"use strict";var e,n=function(e){return function(n){e.mode("input"),setWatch(n,e,{repeat:!0,edge:"both",debounce:10})}};!function(e){e[e.POWER=378130479]="POWER",e[e.MINUS=378134559]="MINUS",e[e.PLUS=378132519]="PLUS",e[e.RED=378077439]="RED",e[e.GREEN=378126399]="GREEN",e[e.BLUE=378110079]="BLUE",e[e.CROSS=378114159]="CROSS",e[e.SQUARE=378118239]="SQUARE",e[e.TRIANGLE=378093759]="TRIANGLE",e[e.TOP_LEFT=378097839]="TOP_LEFT",e[e.TOP=378101919]="TOP",e[e.TOP_RIGHT=378099879]="TOP_RIGHT",e[e.LEFT=378081519]="LEFT",e[e.PLAY=378091719]="PLAY",e[e.RIGHT=378116199]="RIGHT",e[e.BOTTOM_LEFT=378083559]="BOTTOM_LEFT",e[e.BOTTOM=378124359]="BOTTOM",e[e.BOTTOM_RIGHT=378085599]="BOTTOM_RIGHT",e[e.X=378089679]="X",e[e.Y=378122319]="Y",e[e.Z=378105999]="Z"}(e||(e={}));var t,r,o,u,i=function(e,n,t){return n.mode("output"),e.mode("output"),analogWrite(e,0,{freq:t}),function(t){n.write(t>0),analogWrite(e,E.clip(Math.abs(t),0,1),null)}},a=i(P5,P4,100),c=i(P6,P7,100),l=function(e){var n=this;this.debounceTime=e,this.subscribers=[],this.subscribe=function(e){return n.subscribers.push(e)},this.once=function(e){var t=function(r){console.log("wrapper "+r),e(r),n.unsubscribe(t)};n.subscribers.push(t)},this.unsubscribe=function(e){return n.subscribers=n.subscribers.filter((function(n){return n!==e}))},this.publish=function(e){if(n.debounceTime){var t=getTime();(n.previousTime?t-n.previousTime:n.debounceTime)>=n.debounceTime&&(n.previousTime=t,n.subscribers.forEach((function(n){return n(e)})))}else n.subscribers.forEach((function(n){return n(e)}))}},s={oledReady:new l,irCodes:new l(.1),leftWheelDone:new l,rightWheelDone:new l,mp3Played:new l},f=P1,T=P0,d=PrimarySerial,h=T?1:0;!function(e){e[e.Next=1]="Next",e[e.Previous=2]="Previous",e[e.SetTrack=3]="SetTrack",e[e.IncreaseVolume=4]="IncreaseVolume",e[e.DecreaseVolume=5]="DecreaseVolume",e[e.SetVolume=6]="SetVolume",e[e.SetEQ=7]="SetEQ",e[e.SetMode=8]="SetMode",e[e.SetSource=9]="SetSource",e[e.Standby=10]="Standby",e[e.Resume=11]="Resume",e[e.Reset=12]="Reset",e[e.Play=13]="Play",e[e.Pause=14]="Pause",e[e.SetFolder=15]="SetFolder",e[e.SetGain=16]="SetGain",e[e.RepeatPlay=17]="RepeatPlay",e[e.QueryStatus=66]="QueryStatus",e[e.QueryVolume=67]="QueryVolume",e[e.QueryEQ=68]="QueryEQ",e[e.QueryMode=69]="QueryMode",e[e.QuerySoftwareVersion=70]="QuerySoftwareVersion",e[e.QueryTotalFilesOnTFCard=71]="QueryTotalFilesOnTFCard",e[e.QueryTotalFilesOnUDisk=72]="QueryTotalFilesOnUDisk",e[e.QueryTotalFilesOnFlash=73]="QueryTotalFilesOnFlash",e[e.QueryCurrentTrackOnTFCard=75]="QueryCurrentTrackOnTFCard",e[e.QueryCurrentTrackOnUDisk=76]="QueryCurrentTrackOnUDisk",e[e.QueryCurrentTrackOnFlash=77]="QueryCurrentTrackOnFlash"}(t||(t={})),function(e){e[e.Normal=0]="Normal",e[e.Pop=1]="Pop",e[e.Rock=2]="Rock",e[e.Jazz=3]="Jazz",e[e.Classic=4]="Classic",e[e.Bass=5]="Bass"}(r||(r={})),function(e){e[e.Repeat=0]="Repeat",e[e.FolderRepeat=1]="FolderRepeat",e[e.SingleRepeat=2]="SingleRepeat",e[e.Random=3]="Random"}(o||(o={})),function(e){e[e.U=0]="U",e[e.TF=1]="TF",e[e.AUX=2]="AUX",e[e.Sleep=3]="Sleep",e[e.Flash=4]="Flash"}(u||(u={}));var m,B="";d.setup(9600,{tx:f,rx:T}),d.on("data",(function(e){B+=e;for(var n=function(){var e=B.slice(0,10).split("").map((function(e){return(256+e.charCodeAt(0)).toString(16).substr(-2).toUpperCase()}));B=B.slice(10);var n=O(e[3]);console.log("Returned: 0x"+n+" Parameter: 0x"+O(e[5])+", 0x"+O(e[6])),"3D"!=e[3]||m||(m=setTimeout((function(){s.mp3Played.publish(e[6]),clearTimeout(m),m=null}),150))};B.length>=10;)n()}));var C,P,p,A,O=function(e){return e+" ("+parseInt(e,16)+")"},v=function(e){return e>>8},I=function(e){return 255&e},S=function(e,n){void 0===n&&(n=0);var t=function(e){return[v(e),I(e)]}(n),r=t[0],o=t[1],u=function(e,n,t){return-(261+e+h+n+t)}(e,r,o),i=[126,255,6,e,h,r,o,v(u),I(u),239];console.log(i),d.write(i)},g=function(e){return new Promise((function(n,r){s.mp3Played.once((function(t){t==e&&n()})),S(t.SetTrack,e)}))},b={OLED_WIDTH:128,OLED_CHAR:64,OLED_CHUNK:128},D=function(e,n,t){var r=0,o=1,u=null,i=null,a=0;n((function(){a+=o,i&&i(a)&&(r=0,e(0),u&&u())}));var c=null;return function(n){return o=n.direction?1:-1,0===r&&(r=n.startSpeed||.3),i=n.stopCondition,r=Math.min(1,1.05*r),e(r*(t?1:-1)*o),c||(c=new Promise((function(e,n){u=function(){e(a),a=0,c=null,u=null}}))),c}},w=function(){setTimeout((function(){var e,n;e=1,n=Math.max(0,Math.min(31,e)),S(t.SetGain,n),g(1).then((function(){return g(2)})).then((function(){return g(3)})).then((function(){return g(5)}))}),2e3),PrimaryI2C.setup({sda:SDA,scl:SCL});var e=function(e,n,t){var r=new Uint8Array([174,213,128,168,63,211,0,64,141,20,32,0,161,200,218,18,129,207,217,241,219,64,164,166,175]),o=[33,0,b.OLED_WIDTH-1,34,0,7],u=Graphics.createArrayBuffer(b.OLED_WIDTH,r[4]+1,1,{vertical_byte:!0});u.setRotation(2,!1);var i=60;return setTimeout((function(){r.forEach((function(n){e.writeTo(i,[0,n])}))}),50),void 0!==n&&setTimeout(n,100),u.flip=function(){o.forEach((function(n){e.writeTo(i,[0,n])}));var n=new Uint8Array(b.OLED_CHUNK+1);n[0]=b.OLED_CHAR;for(var t=0;t<this.buffer.length;t+=b.OLED_CHUNK)n.set(new Uint8Array(this.buffer,t,b.OLED_CHUNK),1),e.writeTo(i,n)},u.setContrast=function(n){return e.writeTo(i,0,129,n)},u.off=function(){return e.writeTo(i,0,174)},u.on=function(){return e.writeTo(i,0,175)},u}(PrimaryI2C,(function(){return s.oledReady.publish()})),r=n(P10),o=n(P11);!function(e,n){e.mode("input_pullup");var t=0,r=0,o=null,u=function(){0!=t&&(1===t?n(r):(n(t),r=t),t=0)};setWatch((function(e){var n=e.time-e.lastTime;null!==o&&(clearTimeout(o),o=null),n>.04?u():(t=t<<1|+(n>8e-4),o=setTimeout((function(){o=null,u()}),50))}),e,{repeat:!0,edge:"falling"})}(P3,(function(e){return s.irCodes.publish(e)}));var u,i,l=D(c,o,!1),f=D(a,r,!0);return{head:(u=P8,90,.675,2.325,i=function(e,n){switch(n){case"us":e=E.clip(e,675,2325),analogWrite(u,e/1e3/20,{freq:50});break;case"ms":e=E.clip(e,.675,2.325),analogWrite(u,e/20,{freq:50});break;default:e=E.clip(e,0,180),analogWrite(u,.03375+.0004583333333333333*(e-0),{freq:50})}},i(90),i),leftWheel:l,rightWheel:f,oled:e}}(),R={width:128,height:64,bpp:1,buffer:require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="))},Q=function(e){var n=C[e];n&&n(),C.default&&C.default(e)},F=function(e){C=e,s.irCodes.unsubscribe(Q),s.irCodes.subscribe(Q)},y=new l,L=0,U=0,H=!1,M=function(){return new Promise((function(e,n){P||(H=!1,P=setInterval((function(){var n;(L+=1)>59?(L=0,U++):L<0&&(L=59,U--),y.publish((n=function(e){return e>9?""+e:"0"+e})(U)+":"+n(L)),H||(H=!0,e())}),1e3))}))},Y=!0,G=!1,W=[],k=null,N=function(e,n){var t=function(){return null==p},r=w.leftWheel({direction:e,stopCondition:t}),o=w.rightWheel({direction:n,stopCondition:t});k||(k=Promise.all([r,o])).then((function(e){var n=e[0],t=e[1];W.push([n,t]),k=null}))},_=function(){if(0!==W.length&&!k){var e=W[W.length-1],n=e[0],t=e[1],r=Promise.resolve(0),o=function(e){var n=e;return function(t){var r=Math.abs(t+e);return print(r),r<n?(n=r,!1):(n=0,!0)}},u=0==n?r:w.leftWheel({direction:n<0,stopCondition:o(n)}),i=0==t?r:w.rightWheel({direction:t<0,stopCondition:o(t)});(k=Promise.all([u,i])).then((function(){setTimeout((function(){W.splice(-1,1),k=null,_()}),1e3)}))}},V=(A=[["Timer",function(){w.oled.setFontVector(40),y.subscribe((function(e){w.oled.clear(),w.oled.drawString(e,0,10),w.oled.flip()})),M().then((function(){var n;return F(((n={})[e.PLAY]=function(){P?(clearInterval(P),P=null):M()},n[e.CROSS]=function(){clearInterval(P),P=null,L=0,U=0,V()},n))}))}],["Marsohod",function(){var n;w.oled.clear(),w.oled.drawImage(R,0,0),w.oled.flip(),F(((n={})[e.TOP]=function(){return N(Y,Y)},n[e.BOTTOM]=function(){return N(G,G)},n[e.LEFT]=function(){return N(G,Y)},n[e.RIGHT]=function(){return N(Y,G)},n[e.PLUS]=function(){return w.head(55)},n[e.MINUS]=function(){return w.head(125)},n[e.GREEN]=function(){return w.head(90)},n[e.PLAY]=function(){k||_()},n[e.CROSS]=V,n.default=function(){p&&clearTimeout(p),p=setTimeout((function(){p=null}),150)},n))}],["music",function(){var n;F(((n={})[e.LEFT]=function(){return S(t.Next)},n[e.RIGHT]=function(){return S(t.Previous)},n[e.TOP]=function(){return S(t.IncreaseVolume)},n[e.BOTTOM]=function(){return S(t.DecreaseVolume)},n[e.CROSS]=function(){S(t.Pause),V()},n))}]],function(){var n,t=0,r=function(){w.oled.setFontVector(15),w.oled.clear();for(var e=0;e<A.length;e++){var n=A[e],r=n[0],o=(n[1],e===t?"> "+r:"  "+r);w.oled.drawString(o,0,20*e)}w.oled.flip()},o=((n={})[e.TOP]=function(){t=Math.max(0,t-1),r()},n[e.BOTTOM]=function(){t=Math.min(A.length-1,t+1),r()},n[e.PLAY]=function(){var e=A[t];e[0],(0,e[1])()},n);r(),F(o)});s.oledReady.subscribe((function(){w.oled&&(w.oled.clear(),w.oled.setFontVector(15),w.oled.drawImage(R,0,0),w.oled.flip()),setTimeout(V,5e3)}))})();