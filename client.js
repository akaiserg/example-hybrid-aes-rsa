// eslint-disable-next-line
const axios = require('axios');
const EncryptionUtil = require('./encryptionUtil')
const config = require('./config');

const publicKey =config.publicKey;

const doLogin = async (data, headers) => {
  console.info(headers,data);
  const options = {
    url: 'http://127.0.0.1:3000/login',
    headers,
    data,
    timeout: 30000,
    method: 'POST',
    responseType: 'json'
  };
  try {
    const response = await axios(options);    
    //console.info(response)
    return response.data;
  } catch (e) {
    console.info(e.message);
    throw e;
  }
};


const encryptBody = (data) => {
  const encryptionUtil = new EncryptionUtil();
  // generate a random value   
  const key = encryptionUtil.getRandomValue();
  // newkey to encrypt
  console.info(key);
  // encrypt body with AES
  const encryptedBody = encryptionUtil.aesEncrypt(data,key);
  // encrypted body
  console.info(encryptedBody);
  // encrypt key with RSA
  const encryptedKey = encryptionUtil.rsaEncrypt(key,publicKey);
  // encrypted key
  console.info(encryptedKey);
  return { key, encryptedBody, encryptedKey };
}

const decryptBody = (data,key) => {
  const encryptionUtil = new EncryptionUtil();    
  const decryptedBody = encryptionUtil.aesDecrypt(data,key);
  // decrypted body
  console.info(decryptedBody);
  return decryptBody;
}



(async () => {
  
    const body = {
      id: '33333',      
      pass: 'pass3'      
    };
    const bodyText = JSON.stringify(body);
    const { key, encryptedBody, encryptedKey } = encryptBody(bodyText);       
    const requestData = {
      data: encryptedBody
    }
    const headers = {
      'Content-Type': 'application/json',
      'x-key': encryptedKey
    };
    try {
      const response = await doLogin(requestData, headers);
      console.info("->",response);
      decryptBody(response, key)
    } catch(e) {
      console.error(e);
    }
    
    //const cipheredResponse = await getSegment(cipheredBody, headers);
    
})();
