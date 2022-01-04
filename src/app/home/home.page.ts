import { Component } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataList:any;
  printer:any = "not connected";
  constructor(public bluetoothSerial: BluetoothSerial, public toest:ToastController) {}

  scanBlue(){
    this.bluetoothSerial.isEnabled().then(succ =>{
      this.bluetoothSerial.list().then(list =>{
        this.dataList = list;
      })
    })
  }

   Select(param){
     if (param.id != null && param.id !="") {
       this.msg(param.id);
    this.bluetoothSerial.connect(param.id).subscribe(succ =>{
     this.msg(JSON.stringify(succ));
     this.printer=param.name;
   })
     }
    
  }

 async msg(msg){
  const toes = await this.toest.create({
      message:msg,
      position: "bottom",
      duration:2000,
    })
    toes.present();
  }

  print(){
      var restname="Joys Burger by Casa Mio WendorKassa";
      var add="Armin-T-Wegner-Platz, 9, 42134,Elberfeld";
      var tel="0555 655 456 56";
      var cno="FGSNDJGUYD";
      var dme="Dine in";
      var fca="Forecast : 2022-12-22 22:22";
      var ti="22:22";
      var int="Intructions";
      var nan="N/A";
      var us="Müller Zimmermann";
      var usad="Armin-T-Wegner-Platz, 9, 42134,Elberfeld";
      var usma="Müller.13Zimmermann@gmail.com";
      var usad="4239 432 435 35";
      const dis = [{name:"1x Joys Burger(#)", price:"22.43 $", top:[
        {
        name:"1x mit Schwarzwälder Kirschtorte",
        price:"1.63 $"
        },
        {
          name:"1x mit Schwarzwälder Schnitzel",
          price:"2.34 $"
        }
      ]},
      {name:"1x Prince Joys Burger (pikant) ", price:"20.13 $", top:[
        {
        name:"1x mit Kartoffelecken",
        price:"1.63 $"
        },
      ]},
      {name:"1x Prince Joys Burger (pikant) ", price:"20.13 $",  top:[]
      },
    ];
      var space = ' ';
      var dish ="1x pizza"
      var price ="22.43 $"
      if(dish.length < 30){
        for(var x = 30-(dish.length+price.length); x >= 0; x--) {
          space = space+" ";
          }
      }
      console.log(restname.length);
      // this.bluetoothSerial.write(dish+space+price); 
      this.bluetoothSerial.write('\x1b\x61\x01'); 
      this.bluetoothSerial.write(this.check_rest_length(restname)+"\n"); 
      this.bluetoothSerial.write(this.check_address_length(add)+"\n"); 
      // if (restname.length < 20) {
      //   this.bluetoothSerial.write(restname); 
      // }else{
      //   var restnewname = restname.split(" "); 
      //   let nname ='';
      //   for (let i = 0; i < restnewname.length; i++) {
      //     nname += restnewname[i]+" ";
      //     if (i===(restnewname.length-3)) {
      //       nname += "\n"
      //     }
      //   }
         
        
        
      // }

      console.log(this.check_rest_length(restname)) 
      console.log(this.check_address_length(add)) 




    } 
    
    check_rest_length(param){
      if (param.length < 28) {
        return param;
      }else{
        let new__p ='';
        var new_p = param.split(" "); 
        for (let i = 0; i < new_p.length; i++) {
          new__p += new_p[i]+" ";
          if (i===(new_p.length-3)) {
            new__p += "\n"
          }
        }
        return new__p;
      }
    }
    check_address_length(param){
      if (param.length < 28) {
        return param;
      }else{
        let new__p ='';
        var new_p = param.split(","); 
        for (let i = 0; i < new_p.length; i++) {
          new__p += new_p[i]+" ";
          if (i===(new_p.length-3)) {
            new__p += "\n"
          }
        }
        return new__p;
      }
    }
// this.bluetoothSerial.write("\x1B\x74\x13\x80"); € sign cp1257
  // this.bluetoothSerial.write('\x1b\x61\x00');
  // this.bluetoothSerial.write("TXT ALIGN LEFT"+'\n');
  // this.bluetoothSerial.write('\x1b\x61\x01');
  // this.bluetoothSerial.write("TXT ALIGN Center"+'\n');
  // this.bluetoothSerial.write('\x1b\x61\x02');
  // this.bluetoothSerial.write("TXT ALIGN Right"+'\n');
  // this.bluetoothSerial.write('\x1b\x4d\x00');
  // this.bluetoothSerial.write("TXT FONT A"+'\n');
  // this.bluetoothSerial.write('\x1b\x4d\x01');
  // this.bluetoothSerial.write("TXT FONT B"+'\n');
  // this.bluetoothSerial.write('\x1b\x4d\x02');
  // this.bluetoothSerial.write("TXT FONT C"+'\n');
  // this.bluetoothSerial.write('\x1b\x2d\x01');
  // this.bluetoothSerial.write("Underline" +'\n');
  // this.bluetoothSerial.write('\x1b\x2d\x00');
  // this.bluetoothSerial.write('\x1b\x34');
  // this.bluetoothSerial.write("Italic on"+'\n');
  // this.bluetoothSerial.write('\x1b\x35');
  // this.bluetoothSerial.write('\x1b\x21\x20');
  // this.bluetoothSerial.write("TEXT 2 width size"+'\n');
  // this.bluetoothSerial.write( '\x1b\x21\x10');
  // this.bluetoothSerial.write("TEXT 2 height size"+'\n');
  // this.bluetoothSerial.write("TEXT 2 height size"+'\n');
  // this.bluetoothSerial.write('\x1b\x21\x00');
  // this.bluetoothSerial.write("Normal TEXT");
  // this.bluetoothSerial.write('\u0001');
  // this.bluetoothSerial.write("TXT BOLD ON"+'\n'); 
  // this.bluetoothSerial.write('\x1b\x6c'); 
  // this.bluetoothSerial.write("Margin left"+'\n'); 
  // 0x1b,0x21,0x01
  // bold
  //TXT_BOLD_ON: '\x1b\x45\x01'
  //TXT_BOLD_ON: '\x1b\x33\x08'
  //TXT_BOLD_ON: '\x1b\x21\x08'
  //let cutpaper = [0x1d, 0x56, 0x42, 0x00];
  //*das*
}
