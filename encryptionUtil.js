CryptoJS = require('crypto-js');
JSEncrypt = require('node-jsencrypt');

module.exports = class EncryptionUtil {

  constructor() {
   
  }

  sha256(message) {
    const encodeMsg = CryptoJS.enc.Utf8.parse(message);
    const finalMsg = CryptoJS.SHA256(encodeMsg).toString();
    return finalMsg;
  }

  sha512(message) {
    const encodeMsg = CryptoJS.enc.Utf8.parse(message);
    const finalMsg = CryptoJS.sha512(encodeMsg).toString();
    return finalMsg;
  }

  rsaEncrypt(txt, pubKey) {
    const crypt = new JSEncrypt();
    crypt.setKey(pubKey);
    const message = crypt.encrypt(txt);
    return message;
  }

  rsaDecrypt(txt, privKey) {
    const crypt = new JSEncrypt();
    crypt.setKey(privKey);
    const message = crypt.decrypt(txt);
    return message;
  }
  
  getRandomValue() {
    return CryptoJS.lib.WordArray.random(10).toString();
  }

  aesEncrypt(plainText, key) {
    return CryptoJS.AES.encrypt(plainText, key).toString();
  }

  aesDecrypt(cipherAEStext, key) {
    const bytes = CryptoJS.AES.decrypt(cipherAEStext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  createSignature(textToSign, key) {
    const digest = this.sha256(textToSign).toString();
    return this.aesEncrypt(digest, key).toString();
  }

}

