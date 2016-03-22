/*
* A number of contracts to issue license.
* (c) Urs Zeidler
*/

/*
* The licensmanager creates an issuer contract and holds the payment address.
*/
contract LicenseManager {

	address private owner;
	address private paymentAddress;
	string public issuerName;
	uint public contractCount;
	mapping (uint=>LicenseIssuer)public contracts;
	// Start of user code LicenseManager.attributes
	//TODO: implement
	// End of user code
	//
	// constructor for LicenseManager
	//
	function LicenseManager(address _paymentAddress, string _name){
	    owner = msg.sender;
	issuerName = _name;
	paymentAddress = _paymentAddress;
	    //Start of user code Constructor.LicenseManager
		//TODO: implement
	    //End of user code
	}
	
	
	/*
	* Change the address which receive the payment for an issued license. Only new issued licenses are affected.
	*/
	function changePaymentAddress(address _newPaymentAdress) public   {
		 if(owner != msg.sender) throw;
		 paymentAddress = _newPaymentAdress;
		
		//Start of user code LicenseManager.function.changePaymentAddress
		//TODO: implement
		//End of user code
	}
	
	
	
	/*
	* Create a new licenseissuer contract.
	* The price is in finney.
	*/
	function createIssuerContract(string itemName,string textHash,string url,uint lifeTime,uint price) public   {
		 if(owner != msg.sender) throw;
		 contracts[contractCount] = new LicenseIssuer(itemName, textHash, url, lifeTime, price, paymentAddress);
		 contractCount++;
		
		//Start of user code LicenseManager.function.createIssuerContract
		//TODO: implement
		//End of user code
	}
	
	
	
	/*
	* Stopps the licence issuer from issue any more licences.
	*/
	function stopIssuing(uint licenseId) public   {
		 if(owner != msg.sender)
		 	throw;
		 contracts[licenseId].stopIssuing();
		
		//Start of user code LicenseManager.function.stopIssuing
		//TODO: implement
		//End of user code
	}
	
	
	
	/*
	* Change the address which receive the payment for an issued license for a specific license issuer. 
	*/
	function changePaymentAddress(address _newPaymentAddress,uint licenseId) public   {
		 if(owner != msg.sender)
		 	throw;
		 if(!contracts[licenseId].getissuable())
		 	throw;
		 contracts[licenseId].changePaymentAddress(_newPaymentAddress);
		
		//Start of user code LicenseManager.function.changePaymentAddress
		//TODO: implement
		//End of user code
	}
	
	// Start of user code LicenseManager.operations
	//TODO: implement
	// End of user code
}

/*
* The license issuer is a contract containing the description of a particluar license.
* It grands a license to an address by reciving the fund and holds a register of the 
* issued licenses.
*/
contract LicenseIssuer {
    /*
    * Hold one issued license for the item.
    */
    struct IssuedLicense {
    	address licenseOwnerAdress;
    	string licenseOwnerName;
    	uint issuedDate;
    }

	string public licensedItemName;
	string public licenseTextHash;
	string public licenseUrl;
	uint public licencePrice;
	uint public licenseLifetime;
	uint public licenseCount;
	bool public issuable;
	address private paymentAddress;
	address private licenseManager;
	mapping (uint=>IssuedLicense)public issuedLicenses;
	mapping (address=>IssuedLicense)public licenseOwners;
	// Start of user code LicenseIssuer.attributes
	//TODO: implement
	// End of user code
	
	event licenseIssued(address ownerAddress,string name);
	//
	// constructor for LicenseIssuer
	//
	function LicenseIssuer(string itemName, string textHash, string url, uint lifeTime, uint price, address _pa){
	    
	licensedItemName = itemName;
	licenseTextHash = textHash;
	licenseUrl = url;
	licencePrice = price  * 1 finney;
	licenseLifetime = lifeTime;
	paymentAddress = _pa;
	issuable = true;
	licenseManager = msg.sender;
	
	    //Start of user code Constructor.LicenseIssuer
		//TODO: implement
	    //End of user code
	}
	
	
	/*
	* Check the liceses by a given signature.
	*/
	function checkLicense(bytes32 factHash,uint8 v,bytes32 sig_r,bytes32 sig_s) public   returns (bool ) {
		 address _address = ecrecover(factHash, v, sig_r, sig_s);
		 IssuedLicense data = licenseOwners[_address];
		 if(data.issuedDate == 0)
		 	return false;
		 if((licenseLifetime<1)||(licenseLifetime+now<data.issuedDate))
		 	return true;
		 return false;
		
		//Start of user code LicenseIssuer.function.checkLicense
		//TODO: implement
		//End of user code
	}
	
	
	
	/*
	* Simply lookup the license and check if it is still valid.
	*/
	function checkLicense(address _address) public   constant  returns (bool ) {
		 IssuedLicense data = licenseOwners[_address];
		 if(data.issuedDate == 0)
		 	return false;
		 if((licenseLifetime<1)||(licenseLifetime+now<data.issuedDate))
		 	return true;
		 return false;
		
		//Start of user code LicenseIssuer.function.checkLicense
		//TODO: implement
		//End of user code
	}
	
	
	
	/*
	* Change the payment address.
	*/
	function changePaymentAddress(address _newPaymentAddress) public   {
		 if(licenseManager != msg.sender) throw;
		 paymentAddress = _newPaymentAddress;
		
		//Start of user code LicenseIssuer.function.changePaymentAddress
    	//TODO: implement
	    //End of user code
	}
	
	
	
	/*
	* Stop accecpting buying a license.
	*/
	function stopIssuing() public   {
		 if(licenseManager != msg.sender) throw;
		 issuable = false;
		
		//Start of user code LicenseIssuer.function.stopIssuing
    	//TODO: implement
    	//End of user code
	}
	
	
	
	/*
	* Issue a license for the item by sending the address data and the amount of money.
	*/
	function buyLicense(address _address,string _name) public   {
		 if(msg.value<licencePrice|| !issuable) 
		 	throw;
		  if(_address==address(0))
		    issuedLicenses[licenseCount].licenseOwnerAdress = msg.sender;
		  else
		    issuedLicenses[licenseCount].licenseOwnerAdress = _address;
		 issuedLicenses[licenseCount].licenseOwnerName = _name;
		 issuedLicenses[licenseCount].issuedDate = now;
		 licenseOwners[_address] = issuedLicenses[licenseCount];
		 licenseIssued(_address,_name);
		 licenseCount++;
		 //paymentAddress.send(msg.value);
		 if(msg.value==licencePrice){
		 	paymentAddress.send(msg.value);
		 }else{
		 	paymentAddress.send(licencePrice);
		 	msg.sender.send(msg.value-licencePrice);
		 }
		
		//Start of user code LicenseIssuer.function.buyLicense
    	//TODO: implement
    	//End of user code
	}
	
	// getissuable
	function getissuable() returns(bool) {
		return issuable;
	}
	
	// Start of user code LicenseIssuer.operations
	//TODO: implement
	// End of user code
}

