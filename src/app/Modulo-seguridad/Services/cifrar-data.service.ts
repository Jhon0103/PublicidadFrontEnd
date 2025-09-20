import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CifrarDataService {

  private tokenFromUI = '123456$#@$^@1ALU';

  encrypt(data: any): string {
    if (!data) return '';
    if (data.toString() === '') return '';

    const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
    const vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), vkey, {
      keySize: 128 / 8,
      iv: viv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decrypt(data: any): any {
    if (!data) {
      return null;
    }
    if (data.toString() === '') {
      return null;
    }

    let vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const decrypted = CryptoJS.AES.decrypt(data, vkey, {
      keySize: 128 / 8,
      iv: viv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    try {
      return JSON.parse(decryptedText);
    } catch (e) {
      return decryptedText;
    }
  }

}
