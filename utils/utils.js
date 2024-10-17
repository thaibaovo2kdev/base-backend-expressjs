var crypto = require("crypto");
const config= require("../configs/config")
const algorithm = config.ALGORITHM;
const secretKey = config.SECRET_KEY;
module.exports = {
  getSort,
  encrypt,
  decrypt,
  isValidDate,
  randomString,
  randomNumber,
  toPlainString,
  randomStringLowerCase
};

function getSort(sortBy) {
  try {
    let sortArray = {};
    if (sortBy) {
      const arraySort = sortBy.split(",");
      for (const sort of arraySort) {
        if (sort !== "") {
          let sortOrder = sort.charAt(0) == "-" ? -1 : 1;
          let fieldSort = sort;
          if (sort.charAt(0) === "-" || sort.charAt(0) === "+") {
            fieldSort = sort.substring(1);
          }
          sortArray[fieldSort] = sortOrder;
        }
      }
      return sortArray;
    }
  } catch (e) {
    console.log("getSort ", e);
  }
  return {};
}
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

 function encrypt(text) {
    var cipher = crypto.createCipher(algorithm,secretKey)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm,secretKey)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function randomStringLowerCase(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function randomNumber(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function toPlainString(num) {
  return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function(a,b,c,d,e) {
      return e < 0
        ? b + '0.' + Array(1-e-c.length).join(0) + c + d
        : b + c + d + Array(e-d.length+1).join(0);
    });
}