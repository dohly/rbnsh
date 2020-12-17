var receiver = require('@amperka/ir-receiver').connect(P3);
receiver.on('receive', function(code){
    print(code); 
    if (code==KEY_VPERED){ //если код, принятый приемником, равен коду кнопки "вперед"
      menu(item--);
      //edNemnozhko(VPERED,VPERED);
    } else if (code==KEY_NAZAD){
      //edNemnozhko(NAZAD,NAZAD);
      menu(item++);
    } else if (code==KEY_VLEVO){
      edNemnozhko(NAZAD,VPERED);
    } else if (code==KEY_VPRAVO){
      edNemnozhko(VPERED,NAZAD);
    } else if (code==PLUS){    
      poverni_golovy(55);
    } else if (code==MINUS){
      poverni_golovy(125);
    } else if (code==GREEN){
      poverni_golovy(pryamo);
    }
  });