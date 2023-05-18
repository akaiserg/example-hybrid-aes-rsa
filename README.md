# example-hybrid-aes-rsa

In this example, we illustrate hybrid encryption, which involves a client and a server. The process begins with the client generating a random value. Next, the client encrypts this random value using EAS (Encryption Algorithm Suite) as part of the request. Additionally, the client encrypts the random value using the RSA public key.

On the other hand, the server possesses the corresponding private key, allowing it to decrypt the random value generated by the client and subsequently decrypt the body of the message. Once decrypted, the server can encrypt the body using the random value, which is retained by the client.


### To run the example

Follow these steps to run the example:


Install dependencies:
````sh
npm i
````

Start the server:
````sh
npm run server
````

Open another terminal and run the client:

````sh
npm run client
````



