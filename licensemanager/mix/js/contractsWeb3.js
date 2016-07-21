
var LicenseManagerContract = web3.eth.contract([
{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},
{"constant":true,"inputs":[],"name":"issuerName","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"contractCount","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant": true,"inputs": [{"name": "","type": "uint"}],"name": "contracts","outputs": [
{ "name": "", "type": "address"}
],"type": "function"	},
//

  {
    "constant": false,
    "inputs": [{"name": "_newPaymentAdress","type": "address"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": false,
    "inputs": [{"name": "itemName","type": "string"},{"name": "textHash","type": "string"},{"name": "url","type": "string"},{"name": "lifeTime","type": "uint"},{"name": "price","type": "uint"}],    
    "name": "createIssuerContract",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": false,
    "inputs": [{"name": "licenseId","type": "uint"}],    
    "name": "stopIssuing",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": false,
    "inputs": [{"name": "_newPaymentAddress","type": "address"},{"name": "licenseId","type": "uint"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
 
] );   

var LicenseIssuerContract = web3.eth.contract([
{"constant":true,"inputs":[],"name":"licensedItemName","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseManager","outputs":[{"name":"","type":"address"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseTextHash","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseUrl","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licencePrice","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseLifetime","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseCount","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"issuable","outputs":[{"name":"","type":"bool"}],"type":"function"},
{"constant": true,"inputs": [{"name": "","type": "uint"}],"name": "issuedLicenses","outputs": [
{ "name": "licenseOwnerAdress", "type": "address"}
,{ "name": "licenseOwnerName", "type": "string"}
,{ "name": "issuedDate", "type": "uint"}
],"type": "function"	},
//

{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "licenseOwners","outputs": [
{ "name": "licenseOwnerAdress", "type": "address"}
,{ "name": "licenseOwnerName", "type": "string"}
,{ "name": "issuedDate", "type": "uint"}
],"type": "function"	},
//

  {
    "constant": false,
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
    "constant": false,
    "inputs": [{"name": "_newPaymentAddress","type": "address"}],    
    "name": "changePaymentAddress",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": false,
    "inputs": [],    
    "name": "stopIssuing",
    "outputs": [],
    "type": "function"
  }
,  {
    "constant": false,
    "inputs": [{"name": "_address","type": "address"},{"name": "_name","type": "string"}],    
    "name": "buyLicense",
    "outputs": [],
    "type": "function"
  }
 ,
  { "constant": true,
    "inputs": [{"name": "ownerAddress","type": "address"},{"name": "name","type": "string"},{"name": "succesful","type": "bool"}],    
    "name": "LicenseIssued",
    "type": "event"  }
] );   



