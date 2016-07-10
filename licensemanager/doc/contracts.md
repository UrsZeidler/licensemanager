# contracts

A number of contracts to issue license.
(c) Urs Zeidler


* [LicenseManager](#contract-licensemanager)

* [LicenseIssuer](#contract-licenseissuer)


## contract: LicenseManager

    overview:
	function changePaymentAddress(address _newPaymentAdress) public  onlyOwner 
	function createIssuerContract(string itemName,string textHash,string url,uint lifeTime,uint price) public  onlyOwner 
	function stopIssuing(uint licenseId) public  onlyOwner 
	function changePaymentAddress(address _newPaymentAddress,uint licenseId) public  onlyOwner 



The licensmanager creates an issuer contract and holds the payment address.




#### LicenseManager properties

name|type|visiblity|delegate|doc
----|----|----|----|----
owner|address|public||
paymentAddress|address|private||
issuerName|string|public||
contractCount|uint|public||

#### LicenseManager mappings

name|type|mapsTo|visiblity|doc
----|----|----|----|----
contracts|uint|LicenseIssuer|public|-

#### LicenseManager.changePaymentAddress(address _newPaymentAdress) public  onlyOwner 

Change the address which receive the payment for an issued license. Only new issued licenses are affected.


name|type|direction|doc
----|----|----|----
_newPaymentAdress|address|in|

#### LicenseManager.createIssuerContract(string itemName,string textHash,string url,uint lifeTime,uint price) public  onlyOwner 

Create a new licenseissuer contract.
The price is in finney.


name|type|direction|doc
----|----|----|----
itemName|string|in|
textHash|string|in|
url|string|in|
lifeTime|uint|in|
price|uint|in|

#### LicenseManager.stopIssuing(uint licenseId) public  onlyOwner 

Stopps the licence issuer from issue any more licences.


name|type|direction|doc
----|----|----|----
licenseId|uint|in|

#### LicenseManager.changePaymentAddress(address _newPaymentAddress,uint licenseId) public  onlyOwner 

Change the address which receive the payment for an issued license for a specific license issuer. 


name|type|direction|doc
----|----|----|----
_newPaymentAddress|address|in|
licenseId|uint|in|


## contract: LicenseIssuer

    overview:
	function checkLicense(bytes32 factHash,uint8 v,bytes32 sig_r,bytes32 sig_s) public  returns (bool )
	function checkLicense(address _address) public   constant returns (bool )
	function changePaymentAddress(address _newPaymentAddress) public  onlyLicenseManager 
	function stopIssuing() public  onlyLicenseManager 
	function buyLicense(address _address,string _name) public  onlyExactAmount 



The license issuer is a contract containing the description of a particluar license.
It grands a license to an address by reciving the fund and holds a register of the 
issued licenses.



### structs:

IssuedLicense
Hold one issued license for the item.



#### IssuedLicense properties

name|type|visiblity|delegate|doc
----|----|----|----|----
licenseOwnerAdress|address|public||
licenseOwnerName|string|public||
issuedDate|uint|public||



#### LicenseIssuer properties

name|type|visiblity|delegate|doc
----|----|----|----|----
licensedItemName|string|public||
licenseTextHash|string|public||
licenseUrl|string|public||
licencePrice|uint|public||
licenseLifetime|uint|public||
licenseCount|uint|public||
issuable|bool|public||
paymentAddress|address|private||
licenseManager|address|public||The address which manange the contract.

#### LicenseIssuer mappings

name|type|mapsTo|visiblity|doc
----|----|----|----|----
issuedLicenses|uint|IssuedLicense|public|licenseOwners|address|IssuedLicense|public|-

#### LicenseIssuer.checkLicense(bytes32 factHash,uint8 v,bytes32 sig_r,bytes32 sig_s) public  returns (bool )

Check the liceses by a given signature.


name|type|direction|doc
----|----|----|----
factHash|bytes32|in|
v|uint8|in|
sig_r|bytes32|in|
sig_s|bytes32|in|
|bool|return|

#### LicenseIssuer.checkLicense(address _address) public   constant returns (bool )

Simply lookup the license and check if it is still valid.


name|type|direction|doc
----|----|----|----
_address|address|in|
|bool|return|

#### LicenseIssuer.changePaymentAddress(address _newPaymentAddress) public  onlyLicenseManager 

Change the payment address.


name|type|direction|doc
----|----|----|----
_newPaymentAddress|address|in|

#### LicenseIssuer.stopIssuing() public  onlyLicenseManager 

Stop accecpting buying a license.



#### LicenseIssuer.buyLicense(address _address,string _name) public  onlyExactAmount 

Issue a license for the item by sending the address data and the amount of money.


name|type|direction|doc
----|----|----|----
_address|address|in|
_name|string|in|

#### event licenseIssued


name|type|indexed|doc
----|----|----|----
ownerAddress|address||
name|string||


