(()=>{"use strict";var e;!function(e){e[e.POWER=378130479]="POWER",e[e.MINUS=378134559]="MINUS",e[e.PLUS=378132519]="PLUS",e[e.RED=378077439]="RED",e[e.GREEN=378126399]="GREEN",e[e.BLUE=378110079]="BLUE",e[e.CROSS=378114159]="CROSS",e[e.SQUARE=378118239]="SQUARE",e[e.TRIANGLE=378093759]="TRIANGLE",e[e.TOP_LEFT=378097839]="TOP_LEFT",e[e.TOP=378101919]="TOP",e[e.TOP_RIGHT=378099879]="TOP_RIGHT",e[e.LEFT=378081519]="LEFT",e[e.PLAY=378091719]="PLAY",e[e.RIGHT=378116199]="RIGHT",e[e.BOTTOM_LEFT=378083559]="BOTTOM_LEFT",e[e.BOTTOM=378124359]="BOTTOM",e[e.BOTTOM_RIGHT=378085599]="BOTTOM_RIGHT",e[e.X=378089679]="X",e[e.Y=378122319]="Y",e[e.Z=378105999]="Z"}(e||(e={}));var n,t=function(e){return function(n){e.mode("input"),setWatch(n,e,{repeat:!0,edge:"both",debounce:10})}},i=function(e,n,t){return n.mode("output"),e.mode("output"),analogWrite(e,0,{freq:t}),function(t){n.write(t>0),analogWrite(e,E.clip(Math.abs(t),0,1),null)}},r=i(P5,P4,100),o=i(P6,P7,100),u={OLED_WIDTH:128,OLED_CHAR:64,OLED_CHUNK:128},l=function(e,n,t){var i=0,r=1,o=null,u=null,l=0;n((function(){l+=r,u&&u(l)&&(i=0,e(0),o&&o())}));var c=null;return function(n){return r=n.direction?1:-1,0===i&&(i=n.startSpeed||.3),u=n.stopCondition,i=Math.min(1,1.01*i),e(i*(t?1:-1)*r),c||(c=new Promise((function(e,n){o=function(){e(l),l=0,c=null,o=null}}))),c}},c=function(){var e=this;this.subscribers=[],this.subscribe=function(n){return e.subscribers.push(n)},this.unsubscribe=function(n){return e.subscribers=e.subscribers.filter((function(e){return e!==n}))},this.publish=function(n){return e.subscribers.forEach((function(e){return e(n)}))}},f={oledReady:new c,irCodes:new c,leftWheelDone:new c,rightWheelDone:new c},a=function(){PrimaryI2C.setup({sda:SDA,scl:SCL});var e=function(e,n,t){var i=new Uint8Array([174,213,128,168,63,211,0,64,141,20,32,0,161,200,218,18,129,207,217,241,219,64,164,166,175]),r=[33,0,u.OLED_WIDTH-1,34,0,7],o=Graphics.createArrayBuffer(u.OLED_WIDTH,i[4]+1,1,{vertical_byte:!0}),l=60;return setTimeout((function(){i.forEach((function(n){e.writeTo(l,[0,n])}))}),50),void 0!==n&&setTimeout(n,100),o.flip=function(){r.forEach((function(n){e.writeTo(l,[0,n])}));var n=new Uint8Array(u.OLED_CHUNK+1);n[0]=u.OLED_CHAR;for(var t=0;t<this.buffer.length;t+=u.OLED_CHUNK)n.set(new Uint8Array(this.buffer,t,u.OLED_CHUNK),1),e.writeTo(l,n)},o.setContrast=function(n){return e.writeTo(l,0,129,n)},o.off=function(){return e.writeTo(l,0,174)},o.on=function(){return e.writeTo(l,0,175)},o}(PrimaryI2C,(function(){return f.oledReady.publish()})),n=t(P10),i=t(P11);!function(e,n){e.mode("input_pullup");var t=0,i=0,r=null,o=function(){0!=t&&(1===t?n(i):(n(t),i=t),t=0)};setWatch((function(e){var n=e.time-e.lastTime;null!==r&&(clearTimeout(r),r=null),n>.04?o():(t=t<<1|+(n>8e-4),r=setTimeout((function(){r=null,o()}),50))}),e,{repeat:!0,edge:"falling"})}(P3,(function(e){return f.irCodes.publish(e)}));var c,a,s=l(r,i,!1),d=l(o,n,!0);return{head:(c=P8,90,.675,2.325,a=function(e,n){switch(n){case"us":e=E.clip(e,675,2325),analogWrite(c,e/1e3/20,{freq:50});break;case"ms":e=E.clip(e,.675,2.325),analogWrite(c,e/20,{freq:50});break;default:e=E.clip(e,0,180),analogWrite(c,.03375+.0004583333333333333*(e-0),{freq:50})}},a(90),a),leftWheel:s,rightWheel:d,oled:e}}(),s=!0,d=!1,B=[],A=null,T=function(e,t){var i=function(){return null==n},r=a.leftWheel({direction:e,stopCondition:i}),o=a.rightWheel({direction:t,stopCondition:i});A||(A=Promise.all([r,o])).then((function(e){var n=e[0],t=e[1];B.push([n,t]),A=null}))},h=function(){if(0!==B.length&&!A){var e=B[B.length-1],n=e[0],t=e[1],i=Promise.resolve(0),r=0==n?i:a.leftWheel({direction:n<0,stopCondition:function(e){return e+n==0}}),o=0==t?i:a.rightWheel({direction:t<0,stopCondition:function(e){return e+t==0}});(A=Promise.all([r,o])).then((function(){setTimeout((function(){B.splice(-1,1),A=null,h()}),1e3)}))}},C={},I=!0;C[e.TOP]=function(){I?(g=20==g?40:20,w()):T(s,s)},C[e.BOTTOM]=function(){I?(g=20==g?40:20,w()):T(d,d)},C[e.LEFT]=function(){T(d,s)},C[e.RIGHT]=function(){T(s,d)},C[e.PLUS]=function(){a.head(55)},C[e.MINUS]=function(){a.head(125)},C[e.GREEN]=function(){a.head(90)},C[e.PLAY]=function(){if(I||A){if(a.oled.setFontVector(15),a.oled.clear(),20==g){var e={width:128,height:64,bpp:1,buffer:require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="))};a.oled.drawImage(e,0,0),I=!1}else a.oled.drawString("=(",0,0),I=!1;a.oled.flip()}else h()};var g=20;function w(){a.oled.clear(),a.oled.drawString("KAK DELA?",0,0),a.oled.drawString("ZASHIBIS",20,20),a.oled.drawString("TAK SEBE",20,40),a.oled.drawString(">",0,g),a.oled.flip()}f.oledReady.subscribe((function(){a.oled&&(a.oled.setFontVector(15),a.oled.clear(),a.oled.drawString("PRIVET",0,0),a.oled.flip()),setTimeout(w,5e3)})),f.irCodes.subscribe((function(e){n&&clearTimeout(n),n=setTimeout((function(){n=null}),150);var t=C[e];t&&t()}))})();