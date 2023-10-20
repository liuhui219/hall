/** @format */

import Global from "../Global";
import CryptoJS from "crypto-js";

export default class AESUtil {
  //是否正式服，需要在外部修改此变量
  isRelease = true;

  testCryptoKey = "tHctJZaC5Dx6pWYrj68vo28j9pPAzfo=";
  testCryptoIv = "RDlhO/GW+LFmOWQU";
  releaseCryptoKey = "U41U5FeIj0uhOKnzgWZ1MBBC6iEUF2DZ";
  releaseCryptoIv = "4Y535fZnkQ57BVoq";

  testRouteCrypKey = "kjhlouyuf20987677869887978987277";
  testRouteCrypIv = "kjhlouyuf2098767";
  releaseRouteCrypKey = "8dw/JfjjoMs0dzVGOX2ntb1iw2k9+JD4";
  releaseRouteCrypIv = "ZGdIobme/Sb4Idwg";

  get cryptoKey() {
    if (this.isRelease) {
      return this.releaseCryptoKey;
    } else {
      return this.testCryptoKey;
    }
  }

  get cryptoIv() {
    if (this.isRelease) {
      return this.releaseCryptoIv;
    } else {
      return this.testCryptoIv;
    }
  }

  get routeCrypKey() {
    if (this.isRelease) {
      return this.releaseRouteCrypKey;
    } else {
      return this.testRouteCrypKey;
    }
  }

  get routeCrypIv() {
    if (this.isRelease) {
      return this.releaseRouteCrypIv;
    } else {
      return this.testRouteCrypIv;
    }
  }

  //加密客户端发送的内容
  aesEncrptMsg(msg) {
    let encryptMsg = this.aesEncrypt(this.routeCrypKey, this.routeCrypIv, msg);
    return "s:" + encryptMsg;
  }
  aesDecryptMsg(msg) {
    let key = CryptoJS.enc.Utf8.parse(this.routeCrypKey);
    let iv = CryptoJS.enc.Utf8.parse(this.routeCrypIv);
    let decrypted = CryptoJS.AES.decrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  aesDecrptHost(host) {
    let key = CryptoJS.enc.Utf8.parse(this.routeCrypKey);
    let iv = CryptoJS.enc.Utf8.parse(this.routeCrypIv);
    let decrypted = CryptoJS.AES.decrypt(host, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    });
    let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    //有控制字符，替换为空
    decryptedStr = Global.Toolkit.strReplaceCtrChar(decryptedStr);
    return decryptedStr;
  }

  decodeMsg(msg) {
    let tmp = msg.trim();
    if (!tmp) {
      return "";
    }
    if (tmp.charAt(0) == "{") {
      return msg;
    }
    //有出现server 底层被拦截直接返回客户端一个html 页面，导致底层解密失败报错
    if (tmp.indexOf("<html") > 0 || tmp.indexOf(" ") > 0 || tmp.indexOf("\t") > 0 || tmp.indexOf(">") > 0) {
      console.error("AESUtil decodeMsg error:" + msg);
      return "";
    }
    return this.aesDecryptWithNoPadding(msg);
  }

  aesDecryptWithNoPadding(msg) {
    let key = CryptoJS.enc.Utf8.parse(this.cryptoKey);
    let iv = CryptoJS.enc.Utf8.parse(this.cryptoIv);
    let decrypted = CryptoJS.AES.decrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  aesEncryptWithCommonKey(msg) {
    let encryptMsg = this.aesEncrypt(this.cryptoKey, this.cryptoIv, msg);
    return encryptMsg;
  }

  aesEncrypt(cryptoKey, cryptoIv, msg) {
    let key = CryptoJS.enc.Utf8.parse(cryptoKey);
    let iv = CryptoJS.enc.Utf8.parse(cryptoIv);
    let encrypt = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypt.toString();
  }

  aesDcryptWithPKC27(msg) {
    let key = CryptoJS.enc.Utf8.parse(this.cryptoKey);
    let iv = CryptoJS.enc.Utf8.parse(this.cryptoIv);
    let decrypted = CryptoJS.AES.decrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  async rsaEncryptPhone(phone) {
    const JSEncrypt = (await import("jsencrypt/lib/jsencrypt")).default;
    const encryptStr = new JSEncrypt();
    // const pubKey = `-----BEGIN public key-----
    // 	MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXQOEgrBjXpV0CsHnJIYmJy40a
    // 	wBH3jqKB/SP8kHKt3gLQOPWy3hqp080GfK7AEdWe6YgZquJCPgfrvbFUo9pveyiN
    // 	OEH2QloCkRTn/lVzVCWPXWtzuT8YCAwWgbZ68h6ETwKX9BsZE+0+4+qgIq0+ckhe
    // 	9zKerADZwURzeDiLLwIDAQAB
    // 	-----END public key-----`; // rsa 公钥
    // encryptStr.setPublicKey(pubKey); // 设置 加密公钥
    let data = encryptStr.encrypt(phone + ""); // 进行加密
    return "r:" + data;
  }

  getDecString(val) {
    try {
      let keys = CryptoJS.enc.Utf8.parse("E8aTO43VgyMeFZUw");
      let iv = CryptoJS.enc.Utf8.parse("PWeJViG1mum5DmJ1");
      let keyEncrypted = CryptoJS.AES.decrypt(val, keys, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      return keyEncrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return val;
    }
  }
}
