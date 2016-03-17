# contracts

A number of contracts to issue license.


* [LicenseManager](#contract-licensemanager)
* [LicenseIssuer](#contract-licenseissuer)

## contract: LicenseManager

    overview:
	function changePaymentAddress(address _newPaymentAdress) public  
	function createIssuerContract(string itemName,string textHash,string url,uint lifeTime,uint price) public  
	function stopIssuing(uint licenseId) public  
	function changePaymentAddress(address _newPaymentAddress,uint licenseId) public  



The licensmanager creates an issuer contract and holds the payment address.




#### LicenseManager properties

name|type|visiblity|delegate|doc
----|----|----|----|----
owner|address|package||
paymentAddress|address|package||
issuerName|string|public||
contractCount|uint|public||

#### LicenseManager mappings

name|type|mapsTo|visiblity|doc
----|----|----|----|----
contracts|uint|LicenseIssuer|public|-

#### LicenseManager.changePaymentAddress(address _newPaymentAdress) public  

Change the address which receive the payment for an issued license. Only new issued licenses are affected.


name|type|direction|doc
----|----|----|----
_newPaymentAdress|address|in|

#### LicenseManager.createIssuerContract(string itemName,string textHash,string url,uint lifeTime,uint price) public  

Create a new licenseissuer contract.


name|type|direction|doc
----|----|----|----
itemName|string|in|
textHash|string|in|
url|string|in|
lifeTime|uint|in|
price|uint|in|

#### LicenseManager.stopIssuing(uint licenseId) public  


name|type|direction|doc
----|----|----|----
licenseId|uint|in|

#### LicenseManager.changePaymentAddress(address _newPaymentAddress,uint licenseId) public  

Change the address which receive the payment for an issued license for a specific license issuer. 


name|type|direction|doc
----|----|----|----
_newPaymentAddress|address|in|
licenseId|uint|in|


## contract: LicenseIssuer

    overview:
	function checkLicense(address _address) public   returns (bool )
	function changePaymentAddress(address _newPaymentAddress) public  
	function stopIssuing() public  
	function buyLicense(address _address,string _name) public  



The license issuer is a contract containing the description of the license.



### structs:

IssuedLicense
Hold all the issued license for the item.



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
issuable|bool|package||
paymentAddress|address|package||
licenseManager|address|private||The address which manange the contract.

#### LicenseIssuer mappings

name|type|mapsTo|visiblity|doc
----|----|----|----|----
issuedLicenses|uint|IssuedLicense|package|licenseOwners|address|IssuedLicense|public|-

#### LicenseIssuer.checkLicense(address _address) public   returns (bool )


name|type|direction|doc
----|----|----|----
_address|address|in|
|bool|return|

#### LicenseIssuer.changePaymentAddress(address _newPaymentAddress) public  

Change the payment address.


name|type|direction|doc
----|----|----|----
_newPaymentAddress|address|in|

#### LicenseIssuer.stopIssuing() public  

Stop accecpting buying a license.



#### LicenseIssuer.buyLicense(address _address,string _name) public  

Issue a license for the item by sending the address data and the amount of money.


name|type|direction|doc
----|----|----|----
_address|address|in|
_name|string|in|


