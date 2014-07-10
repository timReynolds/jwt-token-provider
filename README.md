NodeJs JWT Token Provider
==================

Demo NodeJS token provider using RS256 via jsonwebtoken. 

The repsone will provide the token in the body, inclusing anything that was included in the body of the token request. 

## Creating a certificate 

Creating a certificate requires the use of openSSL as follows;

    openssl genrsa -out mykey.pem 1024
    openssl rsa -in mykey.pem -pubout > mykey.pub
