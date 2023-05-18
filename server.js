const config = require('./config');
const EncryptionUtil = require('./encryptionUtil')

const privateKey = config.privateKey;


const fastify = require('fastify')({
  logger: true
});

fastify.decorateRequest('key', '');
const encryptionUtil = new EncryptionUtil();

fastify.addHook('preHandler', (req, reply, next) => {
  try {    
    const decryptedKey = encryptionUtil.rsaDecrypt(req.headers['x-key'],privateKey);
    // decrypted key
    //console.info(decryptedKey);   
    const decryptedBody = encryptionUtil.aesDecrypt(req.body.data,decryptedKey);   
     // decrypted body
   //console.info(decryptedBody);
   req.body.data = JSON.parse(decryptedBody);
   req.key = decryptedKey;
    next();
  } catch (e) {
    //reply.header(traceHeaderName, traceHeaderValue);
    reply.code(400);
    reply.send({ status: 'error', message: 'Error with the encryption' });
  }
});


fastify.post('/login', (request, reply) => {
  //console.info(request.body.data.id, request.key);
    const id = request.body.data.id;
    const pass = request.body.data.pass; 
    const data = {
      name: null,
      lastName: null     
    };
    let timeout = 0;
    switch (true){
      case (id === '11111' && pass === 'pass1'): 
        data.name = 'name 1';
        data.lastName = 'lastName 1';
        timeout =1000;
      break;
      case (id === '22222' && pass === 'pass2'): 
        data.name = 'name 2';
        data.lastName = 'lastName 2';
        timeout =2000;
      break;
      case (id === '33333' && pass === 'pass3'): 
        data.name = 'name 3';
        data.lastName = 'lastName 3';
        timeout =3000;
      break;
    }
    setTimeout(() => {
      return reply.header('x-time', new Date()).status(200).send(encryptionUtil.aesEncrypt(JSON.stringify(data),request.key));
    }, timeout);
  });


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '127.0.0.1'});
    console.log(fastify.printRoutes());    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
