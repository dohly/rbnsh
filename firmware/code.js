(()=>{"use strict";var e,n=function(e){return function(n){e.mode("input"),setWatch(n,e,{repeat:!0,edge:"both",debounce:10})}};!function(e){e[e.POWER=378130479]="POWER",e[e.MINUS=378134559]="MINUS",e[e.PLUS=378132519]="PLUS",e[e.RED=378077439]="RED",e[e.GREEN=378126399]="GREEN",e[e.BLUE=378110079]="BLUE",e[e.CROSS=378114159]="CROSS",e[e.SQUARE=378118239]="SQUARE",e[e.TRIANGLE=378093759]="TRIANGLE",e[e.TOP_LEFT=378097839]="TOP_LEFT",e[e.TOP=378101919]="TOP",e[e.TOP_RIGHT=378099879]="TOP_RIGHT",e[e.LEFT=378081519]="LEFT",e[e.PLAY=378091719]="PLAY",e[e.RIGHT=378116199]="RIGHT",e[e.BOTTOM_LEFT=378083559]="BOTTOM_LEFT",e[e.BOTTOM=378124359]="BOTTOM",e[e.BOTTOM_RIGHT=378085599]="BOTTOM_RIGHT",e[e.X=378089679]="X",e[e.Y=378122319]="Y",e[e.Z=378105999]="Z"}(e||(e={}));var t,r,o,u,i=function(e,n,t){return n.mode("output"),e.mode("output"),analogWrite(e,0,{freq:t}),function(t){n.write(t>0),analogWrite(e,E.clip(Math.abs(t),0,1),null)}},a=i(P5,P4,100),l=i(P6,P7,100),c=P1,s=P0,f=PrimarySerial,d=s?1:0;!function(e){e[e.Next=1]="Next",e[e.Previous=2]="Previous",e[e.SetTrack=3]="SetTrack",e[e.IncreaseVolume=4]="IncreaseVolume",e[e.DecreaseVolume=5]="DecreaseVolume",e[e.SetVolume=6]="SetVolume",e[e.SetEQ=7]="SetEQ",e[e.SetMode=8]="SetMode",e[e.SetSource=9]="SetSource",e[e.Standby=10]="Standby",e[e.Resume=11]="Resume",e[e.Reset=12]="Reset",e[e.Play=13]="Play",e[e.Pause=14]="Pause",e[e.SetFolder=15]="SetFolder",e[e.SetGain=16]="SetGain",e[e.RepeatPlay=17]="RepeatPlay",e[e.QueryStatus=66]="QueryStatus",e[e.QueryVolume=67]="QueryVolume",e[e.QueryEQ=68]="QueryEQ",e[e.QueryMode=69]="QueryMode",e[e.QuerySoftwareVersion=70]="QuerySoftwareVersion",e[e.QueryTotalFilesOnTFCard=71]="QueryTotalFilesOnTFCard",e[e.QueryTotalFilesOnUDisk=72]="QueryTotalFilesOnUDisk",e[e.QueryTotalFilesOnFlash=73]="QueryTotalFilesOnFlash",e[e.QueryCurrentTrackOnTFCard=75]="QueryCurrentTrackOnTFCard",e[e.QueryCurrentTrackOnUDisk=76]="QueryCurrentTrackOnUDisk",e[e.QueryCurrentTrackOnFlash=77]="QueryCurrentTrackOnFlash"}(t||(t={})),function(e){e[e.Normal=0]="Normal",e[e.Pop=1]="Pop",e[e.Rock=2]="Rock",e[e.Jazz=3]="Jazz",e[e.Classic=4]="Classic",e[e.Bass=5]="Bass"}(r||(r={})),function(e){e[e.Repeat=0]="Repeat",e[e.FolderRepeat=1]="FolderRepeat",e[e.SingleRepeat=2]="SingleRepeat",e[e.Random=3]="Random"}(o||(o={})),function(e){e[e.U=0]="U",e[e.TF=1]="TF",e[e.AUX=2]="AUX",e[e.Sleep=3]="Sleep",e[e.Flash=4]="Flash"}(u||(u={}));var T="";f.setup(9600,{tx:c,rx:s}),f.on("data",(function(e){for(T+=e;T.length>=10;){var n=T.slice(0,10).split("").map((function(e){return(256+e.charCodeAt(0)).toString(16).substr(-2).toUpperCase()}));T=T.slice(10),console.log("Returned: 0x"+P(n[3])),console.log("Parameter: 0x"+P(n[5])+", 0x"+P(n[6]))}}));var h,B,C,A,P=function(e){return e+" ("+parseInt(e,16)+")"},O=function(e){return e>>8},I=function(e){return 255&e},m=function(e,n){void 0===n&&(n=0);var t=function(e){return[O(e),I(e)]}(n),r=t[0],o=t[1],u=function(e,n,t){return-(261+e+d+n+t)}(e,r,o),i=[126,255,6,e,d,r,o,O(u),I(u),239];f.write(i)},p={OLED_WIDTH:128,OLED_CHAR:64,OLED_CHUNK:128},S=function(e,n,t){var r=0,o=1,u=null,i=null,a=0;n((function(){a+=o,i&&i(a)&&(r=0,e(0),u&&u())}));var l=null;return function(n){return o=n.direction?1:-1,0===r&&(r=n.startSpeed||.3),i=n.stopCondition,r=Math.min(1,1.05*r),e(r*(t?1:-1)*o),l||(l=new Promise((function(e,n){u=function(){e(a),a=0,l=null,u=null}}))),l}},g=function(){var e=this;this.subscribers=[],this.subscribe=function(n){return e.subscribers.push(n)},this.unsubscribe=function(n){return e.subscribers=e.subscribers.filter((function(e){return e!==n}))},this.publish=function(n){return e.subscribers.forEach((function(e){return e(n)}))}},D={oledReady:new g,irCodes:new g,leftWheelDone:new g,rightWheelDone:new g},Q=function(){var e,r;e=1,r=Math.max(1,Math.min(10,e)),m(t.SetFolder,r),PrimaryI2C.setup({sda:SDA,scl:SCL});var o=function(e,n,t){var r=new Uint8Array([174,213,128,168,63,211,0,64,141,20,32,0,161,200,218,18,129,207,217,241,219,64,164,166,175]),o=[33,0,p.OLED_WIDTH-1,34,0,7],u=Graphics.createArrayBuffer(p.OLED_WIDTH,r[4]+1,1,{vertical_byte:!0}),i=60;return setTimeout((function(){r.forEach((function(n){e.writeTo(i,[0,n])}))}),50),void 0!==n&&setTimeout(n,100),u.flip=function(){o.forEach((function(n){e.writeTo(i,[0,n])}));var n=new Uint8Array(p.OLED_CHUNK+1);n[0]=p.OLED_CHAR;for(var t=0;t<this.buffer.length;t+=p.OLED_CHUNK)n.set(new Uint8Array(this.buffer,t,p.OLED_CHUNK),1),e.writeTo(i,n)},u.setContrast=function(n){return e.writeTo(i,0,129,n)},u.off=function(){return e.writeTo(i,0,174)},u.on=function(){return e.writeTo(i,0,175)},u}(PrimaryI2C,(function(){return D.oledReady.publish()})),u=n(P10),i=n(P11);!function(e,n){e.mode("input_pullup");var t=0,r=0,o=null,u=function(){0!=t&&(1===t?n(r):(n(t),r=t),t=0)};setWatch((function(e){var n=e.time-e.lastTime;null!==o&&(clearTimeout(o),o=null),n>.04?u():(t=t<<1|+(n>8e-4),o=setTimeout((function(){o=null,u()}),50))}),e,{repeat:!0,edge:"falling"})}(P3,(function(e){return D.irCodes.publish(e)}));var c,s,f=S(l,i,!1),d=S(a,u,!0);return{head:(c=P8,90,.675,2.325,s=function(e,n){switch(n){case"us":e=E.clip(e,675,2325),analogWrite(c,e/1e3/20,{freq:50});break;case"ms":e=E.clip(e,.675,2.325),analogWrite(c,e/20,{freq:50});break;default:e=E.clip(e,0,180),analogWrite(c,.03375+.0004583333333333333*(e-0),{freq:50})}},s(90),s),leftWheel:f,rightWheel:d,oled:o}}(),R={width:128,height:64,bpp:1,buffer:require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="))},v=function(e){var n=h[e];n&&n(),h.default&&h.default(e)},w=function(e){h=e,D.irCodes.unsubscribe(v),D.irCodes.subscribe(v)},F=new g,b=0,y=0,L=!1,U=function(){return new Promise((function(e,n){B||(L=!1,B=setInterval((function(){var n;(b+=1)>59?(b=0,y++):b<0&&(b=59,y--),F.publish((n=function(e){return e>9?""+e:"0"+e})(y)+":"+n(b)),L||(L=!0,e())}),1e3))}))},H=!0,M=!1,Y=[],G=null,W=function(e,n){var t=function(){return null==C},r=Q.leftWheel({direction:e,stopCondition:t}),o=Q.rightWheel({direction:n,stopCondition:t});G||(G=Promise.all([r,o])).then((function(e){var n=e[0],t=e[1];Y.push([n,t]),G=null}))},N=function(){if(0!==Y.length&&!G){var e=Y[Y.length-1],n=e[0],t=e[1],r=Promise.resolve(0),o=0==n?r:Q.leftWheel({direction:n<0,stopCondition:function(e){return e+n==0}}),u=0==t?r:Q.rightWheel({direction:t<0,stopCondition:function(e){return e+t==0}});(G=Promise.all([o,u])).then((function(){setTimeout((function(){Y.splice(-1,1),G=null,N()}),1e3)}))}},k=(A=[["Timer",function(){Q.oled.setFontVector(40),F.subscribe((function(e){Q.oled.clear(),Q.oled.drawString(e,0,10),Q.oled.flip()})),U().then((function(){var n;return w(((n={})[e.PLAY]=function(){B?(clearInterval(B),B=null):U()},n[e.CROSS]=function(){clearInterval(B),B=null,b=0,y=0,k()},n))}))}],["Marsohod",function(){var n;Q.oled.clear(),Q.oled.drawImage(R,0,0),Q.oled.flip(),w(((n={})[e.TOP]=function(){return W(H,H)},n[e.BOTTOM]=function(){return W(M,M)},n[e.LEFT]=function(){return W(M,H)},n[e.RIGHT]=function(){return W(H,M)},n[e.PLUS]=function(){return Q.head(55)},n[e.MINUS]=function(){return Q.head(125)},n[e.GREEN]=function(){return Q.head(90)},n[e.PLAY]=function(){G||N()},n[e.CROSS]=k,n.default=function(){C&&clearTimeout(C),C=setTimeout((function(){C=null}),150)},n))}],["music",function(){var n;w(((n={})[e.LEFT]=function(){return m(t.Next)},n[e.RIGHT]=function(){return m(t.Previous)},n[e.TOP]=function(){return m(t.IncreaseVolume)},n[e.BOTTOM]=function(){return m(t.DecreaseVolume)},n[e.CROSS]=function(){m(t.Pause),k()},n))}]],function(){var n,t=0,r=function(){Q.oled.setFontVector(15),Q.oled.clear();for(var e=0;e<A.length;e++){var n=A[e],r=n[0],o=(n[1],e===t?"> "+r:"  "+r);Q.oled.drawString(o,0,20*e)}Q.oled.flip()},o=((n={})[e.TOP]=function(){t=Math.max(0,t-1),r()},n[e.BOTTOM]=function(){t=Math.min(A.length-1,t+1),r()},n[e.PLAY]=function(){var e=A[t];e[0],(0,e[1])()},n);r(),w(o)});D.oledReady.subscribe((function(){Q.oled&&(Q.oled.clear(),Q.oled.setFontVector(15),Q.oled.drawImage(R,0,0),Q.oled.flip()),setTimeout(k,5e3)}))})();