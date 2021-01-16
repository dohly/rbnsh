(()=>{"use strict";var t,n=function(t,n,e){return n.mode("output"),t.mode("output"),analogWrite(t,0,{freq:e}),function(e){n.write(e>0),analogWrite(t,E.clip(Math.abs(e),0,1),null)}},e=n(P5,P4,100),r=n(P6,P7,100),i=function(t){return function(n){t.mode("input"),setWatch(n,t,{repeat:!0,edge:"both",debounce:10})}},o=i(P10),u=function(t,n,e){var r=0,i=.25,o=1;return n((function(){r>0?r--:(i=.25,t(0))})),function(n){o=e?n>0?1:-1:n>0?-1:1,r+=Math.abs(n),i=Math.min(1,i+.01),t(i*o)}},a=u(e,i(P11),!1),B=u(r,o,!0),f={OLED_WIDTH:128,OLED_CHAR:64,OLED_CHUNK:128};!function(t){t[t.POWER=378130479]="POWER",t[t.MINUS=378134559]="MINUS",t[t.PLUS=378132519]="PLUS",t[t.RED=378077439]="RED",t[t.GREEN=378126399]="GREEN",t[t.BLUE=378110079]="BLUE",t[t.CROSS=378114159]="CROSS",t[t.SQUARE=378118239]="SQUARE",t[t.TRIANGLE=378093759]="TRIANGLE",t[t.TOP_LEFT=378097839]="TOP_LEFT",t[t.TOP=378101919]="TOP",t[t.TOP_RIGHT=378099879]="TOP_RIGHT",t[t.LEFT=378081519]="LEFT",t[t.PLAY=378091719]="PLAY",t[t.RIGHT=378116199]="RIGHT",t[t.BOTTOM_LEFT=378083559]="BOTTOM_LEFT",t[t.BOTTOM=378124359]="BOTTOM",t[t.BOTTOM_RIGHT=378085599]="BOTTOM_RIGHT",t[t.X=378089679]="X",t[t.Y=378122319]="Y",t[t.Z=378105999]="Z"}(t||(t={}));var A,c,T,I=(A=P8,.675,2.325,(c=function(t,n){switch(n){case"us":t=E.clip(t,675,2325),analogWrite(A,t/1e3/20,{freq:50});break;case"ms":t=E.clip(t,.675,2.325),analogWrite(A,t/20,{freq:50});break;default:t=E.clip(t,0,180),analogWrite(A,.03375+.0004583333333333333*(t-0),{freq:50})}})(90),c),D={},C=!0;D[t.TOP]=function(){C?(g=20==g?40:20,w()):(a(6),B(6))},D[t.BOTTOM]=function(){C?(g=20==g?40:20,w()):(a(-6),B(-6))},D[t.LEFT]=function(){a(-1),B(1)},D[t.RIGHT]=function(){a(1),B(-1)},D[t.PLUS]=function(){I(55)},D[t.MINUS]=function(){I(125)},D[t.GREEN]=function(){I(90)},D[t.PLAY]=function(){if(T.setFontVector(15),T.clear(),20==g){var t={width:128,height:64,bpp:1,buffer:require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="))};T.drawImage(t,0,0),C=!1}else T.drawString("=(",0,0),C=!1;T.flip()},function(t,n){t.mode("input_pullup");var e=0,r=0,i=null,o=function(){0!=e&&(1===e?n(r):(n(e),r=e),e=0)};setWatch((function(t){var n=t.time-t.lastTime;null!==i&&(clearTimeout(i),i=null),n>.04?o():(e=e<<1|+(n>8e-4),i=setTimeout((function(){i=null,o()}),50))}),t,{repeat:!0,edge:"falling"})}(P3,(function(t){return D[t]()}));var g=20;function w(){T.clear(),T.drawString("KAK DELA?",0,0),T.drawString("GOOD",20,20),T.drawString("TAK SEBE",20,40),T.drawString(">",0,g),T.flip()}PrimaryI2C.setup({sda:SDA,scl:SCL}),T=function(t,n,e){var r=new Uint8Array([174,213,128,168,63,211,0,64,141,20,32,0,161,200,218,18,129,207,217,241,219,64,164,166,175]),i=[33,0,f.OLED_WIDTH-1,34,0,7],o=Graphics.createArrayBuffer(f.OLED_WIDTH,r[4]+1,1,{vertical_byte:!0}),u=60;return setTimeout((function(){r.forEach((function(n){t.writeTo(u,[0,n])}))}),50),void 0!==n&&setTimeout(n,100),o.flip=function(){i.forEach((function(n){t.writeTo(u,[0,n])}));var n=new Uint8Array(f.OLED_CHUNK+1);n[0]=f.OLED_CHAR;for(var e=0;e<this.buffer.length;e+=f.OLED_CHUNK)n.set(new Uint8Array(this.buffer,e,f.OLED_CHUNK),1),t.writeTo(u,n)},o.setContrast=function(n){return t.writeTo(u,0,129,n)},o.off=function(){return t.writeTo(u,0,174)},o.on=function(){return t.writeTo(u,0,175)},o}(PrimaryI2C,(function(){T&&(T.setFontVector(15),T.clear(),T.drawString("PRIVET",0,0),T.flip()),setTimeout(w,5e3)}))})();