(()=>{"use strict";var e,n=function(e){var n=this;this.debounceTime=e,this.subscribers=[],this.subscribe=function(e){return n.subscribers.push(e)},this.once=function(e){var t=function(r){e(r),n.unsubscribe(t)};n.subscribers.push(t)},this.unsubscribe=function(e){return n.subscribers=n.subscribers.filter((function(n){return n!==e}))},this.publish=function(e){if(n.debounceTime){var t=getTime();(n.previousTime?t-n.previousTime:n.debounceTime)>=n.debounceTime&&(n.previousTime=t,n.subscribers.forEach((function(n){return n(e)})))}else n.subscribers.forEach((function(n){return n(e)}))}};!function(e){e[e.Next=1]="Next",e[e.Previous=2]="Previous",e[e.SetTrack=3]="SetTrack",e[e.IncreaseVolume=4]="IncreaseVolume",e[e.DecreaseVolume=5]="DecreaseVolume",e[e.SetVolume=6]="SetVolume",e[e.SetEQ=7]="SetEQ",e[e.SetMode=8]="SetMode",e[e.SetSource=9]="SetSource",e[e.Standby=10]="Standby",e[e.Resume=11]="Resume",e[e.Reset=12]="Reset",e[e.Play=13]="Play",e[e.Pause=14]="Pause",e[e.SetFolder=15]="SetFolder",e[e.SetGain=16]="SetGain",e[e.RepeatPlay=17]="RepeatPlay",e[e.Init=63]="Init",e[e.QueryStatus=66]="QueryStatus",e[e.QueryVolume=67]="QueryVolume",e[e.QueryEQ=68]="QueryEQ",e[e.QueryMode=69]="QueryMode",e[e.QuerySoftwareVersion=70]="QuerySoftwareVersion",e[e.QueryTotalFilesOnTFCard=71]="QueryTotalFilesOnTFCard",e[e.QueryTotalFilesOnUDisk=72]="QueryTotalFilesOnUDisk",e[e.QueryTotalFilesOnFlash=73]="QueryTotalFilesOnFlash",e[e.QueryCurrentTrackOnTFCard=75]="QueryCurrentTrackOnTFCard",e[e.QueryCurrentTrackOnUDisk=76]="QueryCurrentTrackOnUDisk",e[e.QueryCurrentTrackOnFlash=77]="QueryCurrentTrackOnFlash"}(e||(e={}));var t,r=function(e,n,t,r){var u=-(261+e+(n?1:0)+t+r);return[126,255,6,e,n?1:0,t,r,function(e){return e>>8}(u),function(e){return 255&e}(u),239]},u=function(){function t(t,u,i,o,a){var s=this;this.busy=i,this.serial=o,this.busyStream=new n,this.playNext=function(){return s.run(e.Next)},this.playPrevious=function(){return s.run(e.Previous)},this.increaseVolume=function(){return s.run(e.IncreaseVolume)},this.decreaseVolume=function(){return s.run(e.DecreaseVolume)},this.volume=function(n){void 0!==n?s.run(e.SetVolume,n):s.run(e.QueryVolume)},this.eq=function(n){void 0!==n?s.run(e.SetEQ,n):s.run(e.QueryEQ),s.run(e.SetEQ,n)},this.mode=function(n){void 0!==n?s.run(e.SetMode,n):s.run(e.QueryMode)},this.setSource=function(n){return s.run(e.SetSource,n)},this.standby=function(){return s.run(e.Standby)},this.resume=function(){return s.run(e.Resume)},this.reset=function(){return s.run(e.Reset)},this.play=function(n,t){return new Promise((function(r,u){0==s.busy.read()?u("DFPlayer is busy"):(s.busyStream.once(r),s.run(e.SetFolder,t,n))}))},this.pause=function(){return s.run(e.Pause)},this.setPlaybackFolder=function(n){return s.run(e.SetFolder,(t=n,1,10,Math.max(1,Math.min(10,t))));var t},this.setGain=function(n){var t=Math.max(0,Math.min(31,n));s.run(e.SetGain,t)},this.setRepeat=function(n){void 0===n&&(n=!1),s.run(e.RepeatPlay,Number(n))},this.getStatus=function(){s.run(e.QueryStatus)},i.mode("input"),setWatch((function(e){e.state&&setTimeout((function(){return s.busyStream.publish(e.state)}),200),a.write(!e.state)}),i,{repeat:!0,edge:"both",debounceTime:100});var c="";o.setup(9600,{tx:t,rx:u}),o.on("data",(function(e){for(c+=e;c.length>=10;)c.slice(0,10).split("").map((function(e){return(256+e.charCodeAt(0)).toString(16).substr(-2).toUpperCase()})),c=c.slice(10)})),this.volume(9),setTimeout((function(){return o.write(r(e.Init,!0,0,0))}),3e3)}return t.prototype.run=function(e,n,t){void 0===n&&(n=0),void 0===t&&(t=0);var u=r(e,!0,t,n);this.serial.write(u)},t}(),i=function(e){return function(n){e.mode("input"),setWatch(n,e,{repeat:!0,edge:"both",debounce:10})}};!function(e){e[e.POWER=378130479]="POWER",e[e.MINUS=378134559]="MINUS",e[e.PLUS=378132519]="PLUS",e[e.RED=378077439]="RED",e[e.GREEN=378126399]="GREEN",e[e.BLUE=378110079]="BLUE",e[e.CROSS=378114159]="CROSS",e[e.SQUARE=378118239]="SQUARE",e[e.TRIANGLE=378093759]="TRIANGLE",e[e.TOP_LEFT=378097839]="TOP_LEFT",e[e.TOP=378101919]="TOP",e[e.TOP_RIGHT=378099879]="TOP_RIGHT",e[e.LEFT=378081519]="LEFT",e[e.PLAY=378091719]="PLAY",e[e.RIGHT=378116199]="RIGHT",e[e.BOTTOM_LEFT=378083559]="BOTTOM_LEFT",e[e.BOTTOM=378124359]="BOTTOM",e[e.BOTTOM_RIGHT=378085599]="BOTTOM_RIGHT",e[e.X=378089679]="X",e[e.Y=378122319]="Y",e[e.Z=378105999]="Z"}(t||(t={}));var o,a,s=function(e,n,t){return n.mode("output"),e.mode("output"),analogWrite(e,0,{freq:t}),function(t){n.write(t>0),analogWrite(e,E.clip(Math.abs(t),0,1),null)}},c=s(P5,P4,100),f=s(P6,P7,100),l={OLED_WIDTH:128,OLED_CHAR:64,OLED_CHUNK:128},h=function(e,n,t){var r=0,u=1,i=null,o=null,a=0;n((function(){a+=u,o&&o(a)&&(r=0,e(0),i&&i())}));var s=null;return function(n){return u=n.direction?1:-1,0===r&&(r=n.startSpeed||.3),o=n.stopCondition,r=Math.min(1,1.05*r),e(r*(t?1:-1)*u),s||(s=new Promise((function(e,n){i=function(){e(a),a=0,s=null,i=null}}))),s}},d={oledReady:new n,irCodes:new n(.1)},T=function(){PrimaryI2C.setup({sda:SDA,scl:SCL});var e=function(e,n,t){var r=new Uint8Array([174,213,128,168,63,211,0,64,141,20,32,0,161,200,218,18,129,207,217,241,219,64,164,166,175]),u=[33,0,l.OLED_WIDTH-1,34,0,7],i=Graphics.createArrayBuffer(l.OLED_WIDTH,r[4]+1,1,{vertical_byte:!0});i.setRotation(2,!1);var o=60;return setTimeout((function(){r.forEach((function(n){e.writeTo(o,[0,n])}))}),50),void 0!==n&&setTimeout(n,200),i.flip=function(){u.forEach((function(n){e.writeTo(o,[0,n])}));var n=new Uint8Array(l.OLED_CHUNK+1);n[0]=l.OLED_CHAR;for(var t=0;t<this.buffer.length;t+=l.OLED_CHUNK)n.set(new Uint8Array(this.buffer,t,l.OLED_CHUNK),1),e.writeTo(o,n)},i.setContrast=function(n){return e.writeTo(o,0,129,n)},i.off=function(){return e.writeTo(o,0,174)},i.on=function(){return e.writeTo(o,0,175)},i}(PrimaryI2C,(function(){try{d.oledReady.publish()}catch(e){setTimeout((function(){return d.oledReady.publish()}),400)}})),n=i(P10),t=i(P11);!function(e,n){e.mode("input_pullup");var t=0,r=0,u=null,i=function(){0!=t&&(1===t?n(r):(n(t),r=t),t=0)};setWatch((function(e){var n=e.time-e.lastTime;null!==u&&(clearTimeout(u),u=null),n>.04?i():(t=t<<1|+(n>8e-4),u=setTimeout((function(){u=null,i()}),50))}),e,{repeat:!0,edge:"falling"})}(P3,(function(e){return d.irCodes.publish(e)}));var r,o,a=h(f,t,!1),s=h(c,n,!0),T=new u(P1,P0,P2,PrimarySerial,P9);return{head:(r=P8,90,.675,2.325,o=function(e,n){switch(n){case"us":e=E.clip(e,675,2325),analogWrite(r,e/1e3/20,{freq:50});break;case"ms":e=E.clip(e,.675,2.325),analogWrite(r,e/20,{freq:50});break;default:e=E.clip(e,0,180),analogWrite(r,.03375+.0004583333333333333*(e-0),{freq:50})}},o(90),o),leftWheel:a,rightWheel:s,oled:e,mp3:T}}(),m=T.mp3,p=T.oled,v={width:128,height:64,bpp:1,buffer:require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="))};!function(e){e[e.Hi=1]="Hi",e[e.Sofia=2]="Sofia",e[e.Veronika=3]="Veronika",e[e.MainQuestion=4]="MainQuestion",e[e.Very=5]="Very",e[e.Good=6]="Good",e[e.Bad=7]="Bad",e[e.BeFaster=8]="BeFaster",e[e.HappyBirthday=9]="HappyBirthday",e[e.Serega=10]="Serega"}(o||(o={})),function(e){e[e.smallNumbers=1]="smallNumbers",e[e.phrazes=2]="phrazes",e[e.units=3]="units",e[e.tens=10]="tens",e[e.hundreds=99]="hundreds"}(a||(a={}));var S,y,B=function(e,n){return function(e,n){var t=e[0],r=e[1],u=e[2],i=Promise.resolve();return(t?m.play(a.hundreds,t):i).then((function(){var e=n&&u<3?u+100:u,t=function(){return u?m.play(a.smallNumbers,e):i};return r>1?m.play(a.tens,10*r).then(t):1==r?m.play(a.smallNumbers,10*r+u):t()}))}(function(e){var n=function(n){var t=e-e%n;return e-=t,t/n};return{millions:[n(1e8),n(1e7),n(1e6)],thousands:[n(1e5),n(1e4),n(1e3)],digits:[n(100),n(10),n(1)]}}(e).digits,n)},b=function(e){return m.play(a.phrazes,e)},P=function(e){return m.play(a.units,e)},C=function(e){var n=S[e];n&&n(),S.default&&S.default(e)},A=function(e){S=e,d.irCodes.unsubscribe(C),d.irCodes.subscribe(C)},O=function(e){return function(){var n,r=0,u=function(){var n=Math.max(0,20*(r-2));T.oled.setFontVector(15),T.oled.clear();for(var t=0;t<e.length;t++){var u=e[t],i=u[0],o=(u[1],t===r?"> "+i:"  "+i);T.oled.drawString(o,0,20*t-n)}T.oled.flip()},i=((n={})[t.TOP]=function(){r=Math.max(0,r-1),u()},n[t.BOTTOM]=function(){r=Math.min(e.length-1,r+1),u()},n[t.PLAY]=function(){var n=e[r];n[0],(0,n[1])()},n);u(),A(i)}};!function(e){e[e.Tisacha=1]="Tisacha",e[e.Tisachi=2]="Tisachi",e[e.Tisach=3]="Tisach",e[e.Minuta=4]="Minuta",e[e.Minuti=5]="Minuti",e[e.Minut=6]="Minut"}(y||(y={}));var I,Q,g=new n,w=0,F=10,D=!1,M=function(){return new Promise((function(e,n){I||(D=!1,I=setInterval((function(){!function(e){if((w+=-1)>59){w=0,F++;var n=B(F,!0);(n=1==F?n.then((function(){return P(y.Minuta)})):F<5?n.then((function(){return P(y.Minuti)})):n.then((function(){return P(y.Minut)}))).then((function(){return b(o.BeFaster)}))}else w<0&&(w=59,F--);var t;g.publish((t=function(e){return e>9?""+e:"0"+e})(F)+":"+t(w))}(),D||(D=!0,e())}),1e3))}))},R=!0,H=!1,L=[],U=null,V=function(e,n){var t=function(){return null==Q},r=T.leftWheel({direction:e,stopCondition:t}),u=T.rightWheel({direction:n,stopCondition:t});U||(U=Promise.all([r,u])).then((function(e){var n=e[0],t=e[1];L.push([n,t]),U=null}))},G=function(){if(0!==L.length&&!U){var e=L[L.length-1],n=e[0],t=e[1],r=Promise.resolve(0),u=function(e){var n=e;return function(t){var r=Math.abs(t+e);return print(r),r<n?(n=r,!1):(n=0,!0)}},i=0==n?r:T.leftWheel({direction:n<0,stopCondition:u(n)}),o=0==t?r:T.rightWheel({direction:t<0,stopCondition:u(t)});(U=Promise.all([i,o])).then((function(){setTimeout((function(){L.splice(-1,1),U=null,G()}),1e3)}))}},Y=O([["Timer",function(){T.oled.setFontVector(40),g.subscribe((function(e){T.oled.clear(),T.oled.drawString(e,0,10),T.oled.flip()})),M().then((function(){var e;return A(((e={})[t.PLAY]=function(){I?(clearInterval(I),I=null):M()},e[t.CROSS]=function(){clearInterval(I),I=null,w=0,F=0,Y()},e))}))}],["Listen",function(){var e,n=new Waveform(128,{doubleBuffer:!0}),r=new Uint8Array(128);n.on("buffer",(function(e){p.clear(),r.set(e),p.moveTo(0,32),r.forEach((function(e,n){return p.lineTo(n,e/4)}));var n=r.length;E.FFT(r);var t=E.variance(r,E.sum(r)/n)/n/4;p.drawString("............................................................".substr(0,t),0,40),p.flip()}));var u=!1;p.setFontVector(15),p.clear(),A(((e={})[t.PLAY]=function(){u||(u=!0,p.drawString("Started",0,0),p.flip(),n.startInput(A2,2e3,{repeat:!0}))},e[t.CROSS]=function(){n.stop(),Y()},e))}],["Marsohod",function(){var e;T.oled.clear(),T.oled.drawImage(v,0,0),T.oled.flip(),A(((e={})[t.TOP]=function(){return V(R,R)},e[t.BOTTOM]=function(){return V(H,H)},e[t.LEFT]=function(){return V(H,R)},e[t.RIGHT]=function(){return V(R,H)},e[t.PLUS]=function(){return T.head(55)},e[t.MINUS]=function(){return T.head(125)},e[t.GREEN]=function(){return T.head(90)},e[t.PLAY]=function(){U||G()},e[t.CROSS]=Y,e.default=function(){Q&&clearTimeout(Q),Q=setTimeout((function(){Q=null}),150)},e))}],["Pozdravit",function(){var e;A(((e={})[t.CROSS]=Y,e)),p.clear(),p.setFontVector(15),p.drawImage(v,0,0),p.flip(),b(o.Sofia).then((function(){return b(o.HappyBirthday)}))}],["1, 2, 3..",function(){var e,n=1,r=function(){T.oled.clear(),T.oled.drawString(n,0,10),T.oled.flip()},u=function(){return B(n)};r(),A(((e={})[t.LEFT]=function(){return u().then((function(){return n--})).then(r)},e[t.RIGHT]=function(){return u().then((function(){return n++})).then(r)},e[t.TOP]=function(){return T.mp3.increaseVolume()},e[t.BOTTOM]=function(){return T.mp3.decreaseVolume()},e[t.CROSS]=function(){T.mp3.pause(),Y()},e[t.X]=function(){return B(536)},e))}]]),N=O([["DA",function(){p.clear(),p.setFontVector(15),p.drawImage(v,0,0),p.flip(),b(o.Very).then((function(){return b(o.Good)})).then(Y)}],["NET",function(){return b(o.Very).then((function(){return b(o.Bad)}))}]]);setTimeout((function(){return b(o.Hi).then((function(){return b(o.Sofia)})).then((function(){return b(o.Hi)})).then((function(){return b(o.Veronika)})).then((function(){return b(o.MainQuestion)})).then(N)}),4e3)})();