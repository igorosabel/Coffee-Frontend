import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }
  
  urldecode(str){
    if (!str){ return ''; }
      return decodeURIComponent( str.replace( /\+/g, '%20' ).replace( /\%21/g, '!' ).replace( /\%27/g, "'" ).replace( /\%28/g, '(' ).replace( /\%29/g, ')' ).replace( /\%2A/g, '*' ).replace( /\%7E/g, '~' ) );
  }
  
   invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    const newR = (255 - r).toString(16);
    const newG = (255 - g).toString(16);
    const newB = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(newR) + this.padZero(newG) + this.padZero(newB);
  }
  
  padZero(str) {
    const len = 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

}