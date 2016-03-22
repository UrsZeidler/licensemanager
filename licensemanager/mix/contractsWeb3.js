
var LicenseManagerContract = web3.eth.contract([
  {
    "constant": true,
    "inputs": [{"name": "_newPaymentAdress","type": "address"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "itemName","type": "string"},{"name": "textHash","type": "string"},{"name": "url","type": "string"},{"name": "lifeTime","type": "uint"},{"name": "price","type": "uint"}],    
    "name": "createIssuerContract",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "licenseId","type": "uint"}],    
    "name": "stopIssuing",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "_newPaymentAddress","type": "address"},{"name": "licenseId","type": "uint"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
 
] );   

var LicenseIssuerContract = web3.eth.contract([
  {
    "constant": true,
    "inputs": [{"name": "factHash","type": "bytes32"},{"name": "v","type": "uint8"},{"name": "sig_r","type": "bytes32"},{"name": "sig_s","type": "bytes32"}],    
    "name": "checkLicense",
    "outputs": [{"name": "","type": "bool"}],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "_address","type": "address"}],    
    "name": "checkLicense",
    "outputs": [{"name": "","type": "bool"}],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "_newPaymentAddress","type": "address"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [],    
    "name": "stopIssuing",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": true,
    "inputs": [{"name": "_address","type": "address"},{"name": "_name","type": "string"}],    
    "name": "buyLicense",
    "outputs": [],
    "type": "function"
  }
 ,
  {
    "constant": true,
    "inputs": [{"name": "ownerAddress","type": "address"},{"name": "name","type": "string"}],    
    "name": "licenseIssued",
    "type": "event"
  }

] );   


