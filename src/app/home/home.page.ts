import { Component } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataList: any;
  printer: any = "not connected";
  data = {
    LF: '\x0a', //Line feed for new lines
    EOL: '\n', //end of line
    FEED_CONTROL_SEQUENCES: {
      CTL_LF: '\x0a', // Print and line feed
      CTL_FF: '\x0c', // Form feed
      CTL_CR: '\x0d', // Carriage return
      CTL_HT: '\x09', // Horizontal tab
      CTL_VT: '\x0b', // Vertical tab
    },
    LINE_SPACING: {
      LS_DEFAULT: '\x1b\x32',  //Spacing
      LS_SET: '\x1b\x33'  //Spacing
    },
    HARDWARE: {
      HW_INIT: '\x1b\x40', // Clear data in buffer and reset modes
      HW_SELECT: '\x1b\x3d\x01', // Printer select
      HW_RESET: '\x1b\x3f\x0a\x00', // Reset printer hardware
    },
    CASH_DRAWER: {
      CD_KICK_2: '\x1b\x70\x00', // Sends a pulse to pin 2 []
      CD_KICK_5: '\x1b\x70\x01', // Sends a pulse to pin 5 []
    },
    MARGINS: {
      BOTTOM: '\x1b\x4f', // Fix bottom size
      LEFT: '\x1b\x6c', // Fix left size
      RIGHT: '\x1b\x51', // Fix right size
    },
    PAPER: {
      PAPER_FULL_CUT: '\x1d\x56\x00', // Full cut paper
      PAPER_PART_CUT: '\x1d\x56\x01', // Partial cut paper
      PAPER_CUT_A: '\x1d\x56\x41', // Partial cut paper
      PAPER_CUT_B: '\x1d\x56\x42', // Partial cut paper
    },
    TEXT_FORMAT: {
      TXT_NORMAL: '\x1b\x21\x00', // Normal text
      TXT_2HEIGHT: '\x1b\x21\x10', // Double height text
      TXT_2WIDTH: '\x1b\x21\x20', // Double width text
      TXT_4SQUARE: '\x1b\x21\x30', // Double width & height text

      TXT_CUSTOM_SIZE: function (width, height) { // other sizes
        var widthDec = (width - 1) * 16;
        var heightDec = height - 1;
        var sizeDec = widthDec + heightDec;
        return '\x1d\x21' + String.fromCharCode(sizeDec);
      },

      TXT_HEIGHT: {
        1: '\x00',
        2: '\x01',
        3: '\x02',
        4: '\x03',
        5: '\x04',
        6: '\x05',
        7: '\x06',
        8: '\x07'
      },
      TXT_WIDTH: {
        1: '\x00',
        2: '\x10',
        3: '\x20',
        4: '\x30',
        5: '\x40',
        6: '\x50',
        7: '\x60',
        8: '\x70'
      },

      TXT_UNDERL_OFF: '\x1b\x2d\x00', // Underline font OFF
      TXT_UNDERL_ON: '\x1b\x2d\x01', // Underline font 1-dot ON
      TXT_UNDERL2_ON: '\x1b\x2d\x02', // Underline font 2-dot ON
      TXT_BOLD_OFF: '\x1b\x45\x00', // Bold font OFF
      TXT_BOLD_ON: '\x1b\x45\x01', // Bold font ON
      TXT_ITALIC_OFF: '\x1b\x35', // Italic font ON
      TXT_ITALIC_ON: '\x1b\x34', // Italic font ON

      TXT_FONT_A: '\x1b\x4d\x00', // Font type A //normal font
      TXT_FONT_B: '\x1b\x4d\x01', // Font type B //small font
      TXT_FONT_C: '\x1b\x4d\x02', // Font type C //normal font

      TXT_ALIGN_LT: '\x1b\x61\x00', // Left justification
      TXT_ALIGN_CT: '\x1b\x61\x01', // Centering
      TXT_ALIGN_RT: '\x1b\x61\x02', // Right justification
    },
    BARCODE_FORMAT: {
      BARCODE_TXT_OFF: '\x1d\x48\x00', // HRI barcode chars OFF
      BARCODE_TXT_ABV: '\x1d\x48\x01', // HRI barcode chars above
      BARCODE_TXT_BLW: '\x1d\x48\x02', // HRI barcode chars below
      BARCODE_TXT_BTH: '\x1d\x48\x03', // HRI barcode chars both above and below

      BARCODE_FONT_A: '\x1d\x66\x00', // Font type A for HRI barcode chars
      BARCODE_FONT_B: '\x1d\x66\x01', // Font type B for HRI barcode chars

      BARCODE_HEIGHT: function (height) { // Barcode Height [1-255]
        return '\x1d\x68' + String.fromCharCode(height);
      },
      // Barcode Width  [2-6]
      BARCODE_WIDTH: {
        1: '\x1d\x77\x02',
        2: '\x1d\x77\x03',
        3: '\x1d\x77\x04',
        4: '\x1d\x77\x05',
        5: '\x1d\x77\x06',
      },
      BARCODE_HEIGHT_DEFAULT: '\x1d\x68\x64', // Barcode height default:100
      BARCODE_WIDTH_DEFAULT: '\x1d\x77\x01', // Barcode width default:1

      BARCODE_UPC_A: '\x1d\x6b\x00', // Barcode type UPC-A
      BARCODE_UPC_E: '\x1d\x6b\x01', // Barcode type UPC-E
      BARCODE_EAN13: '\x1d\x6b\x02', // Barcode type EAN13
      BARCODE_EAN8: '\x1d\x6b\x03', // Barcode type EAN8
      BARCODE_CODE39: '\x1d\x6b\x04', // Barcode type CODE39
      BARCODE_ITF: '\x1d\x6b\x05', // Barcode type ITF
      BARCODE_NW7: '\x1d\x6b\x06', // Barcode type NW7
      BARCODE_CODE93: '\x1d\x6b\x48', // Barcode type CODE93
      BARCODE_CODE128: '\x1d\x6b\x49', // Barcode type CODE128
    },
    CODE2D_FORMAT: {
      TYPE_PDF417: '\x1b\x5a\x00',
      TYPE_DATAMATRIX: '\x1b\x5a\x01',
      TYPE_QR: '\x1b\x5a\x02',
      CODE2D: '\x1b\x5a',
    },
    IMAGE_FORMAT: {
      S_RASTER_N: '\x1d\x76\x30\x00', // Set raster image normal size
      S_RASTER_2W: '\x1d\x76\x30\x01', // Set raster image double width
      S_RASTER_2H: '\x1d\x76\x30\x02', // Set raster image double height
      S_RASTER_Q: '\x1d\x76\x30\x03', // Set raster image quadruple
    },
    BITMAP_FORMAT: {
      BITMAP_S8: '\x1b\x2a\x00',
      BITMAP_D8: '\x1b\x2a\x01',
      BITMAP_S24: '\x1b\x2a\x20',
      BITMAP_D24: '\x1b\x2a\x21'
    },
    GSV0_FORMAT: {
      GSV0_NORMAL: '\x1d\x76\x30\x00',
      GSV0_DW: '\x1d\x76\x30\x01',
      GSV0_DH: '\x1d\x76\x30\x02',
      GSV0_DWDH: '\x1d\x76\x30\x03'
    }
  };
  constructor(public bluetoothSerial: BluetoothSerial, public toest: ToastController) { }

  scanBlue() {
    this.bluetoothSerial.isEnabled().then(succ => {
      this.bluetoothSerial.list().then(list => {
        this.dataList = list;
      })
    })
  }

  Select(param) {
    if (param.id != null && param.id != "") {
      this.msg(param.id);
      this.bluetoothSerial.connect(param.id).subscribe(succ => {
        this.msg(JSON.stringify(succ));
        this.printer = param.name;
      })
    }

  }

  async msg(msg) {
    const toes = await this.toest.create({
      message: msg,
      position: "bottom",
      duration: 2000,
    })
    toes.present();
  }

  print() {
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_ITALIC_ON + 'Hello World ITALIC'+this.data.TEXT_FORMAT.TXT_ITALIC_OFF+'\n');
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_2HEIGHT + 'Hello World 2HEIGHT'+'\n');
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_NORMAL + 'Hello World NORMAL'+'\n');
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_ALIGN_CT + 'Hello World Center'+'\n');
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_ALIGN_RT + 'Hello World Right'+'\n');
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_ALIGN_LT + 'Hello World Left'+'\n');
    this.bluetoothSerial.write('Hello World. This is A Example Text for Check How Many character Print in a line.');
    this.bluetoothSerial.write(this.check_rest_length('Hello World')+"$31");
    this.bluetoothSerial.write(this.data.TEXT_FORMAT.TXT_BOLD_ON + 'Hello World Bold'+this.data.TEXT_FORMAT.TXT_BOLD_OFF+'\n').then(success =>{
      this.msg("Print Complete");
    }).catch(err =>{
      this.msg("ERR :"+JSON.stringify(err));
    })
  }

  // 58mm printer one line character 31 (space Include)
  check_rest_length(param) {
    if (param.length < 28) {
      return param;
    } else {
      let new__p = '';
      var new_p = param.split(" ");
      for (let i = 0; i < new_p.length; i++) {
        new__p += new_p[i] + " ";
        if (i === (new_p.length - 3)) {
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
  // this.bluetoothSerial.write("TXT BOLD ON"+'\n'); 
  // this.bluetoothSerial.write('\x1b\x6c'); 
  // this.bluetoothSerial.write("Margin left"+'\n'); 
  //TXT_BOLD_ON: '\x1b\x45\x01'
  //TXT_BOLD_ON: '\x1b\x33\x08'
  //TXT_BOLD_ON: '\x1b\x21\x08'
  //TXT_BOLD_ON: '\x1b\x21\x01'
  //let cutpaper = [0x1d, 0x56, 0x42, 0x00];
}
