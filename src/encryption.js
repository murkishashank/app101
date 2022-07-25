const CryptoJS = require("crypto-js");

export const encrypt = (password) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
};

export const decrypt = (password) => {
  return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
};
