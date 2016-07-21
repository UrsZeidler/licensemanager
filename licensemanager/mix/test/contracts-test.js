//test class for LicenseManager
function TestLicenseManager(contract) {
	
	this.test_instance = contract;
	this.prefix='';
	this.messageBlockId = "testResult";
	var self = this;

	this.testSetup=function(){
		//Start of user code testSetup_LicenseManager
		//TODO: implement
		//End of user code
	}

	this.allTests=function(){
		this.testSetup();
		this.testAttributes();
		this.testLicenseManager_changePaymentAddress_address();
		this.testLicenseManager_createIssuerContract_string_string_string_uint_uint();
		this.testLicenseManager_stopIssuing_uint();
		this.testLicenseManager_changePaymentAddress_address_uint();
		this.customTests();
	
		//Start of user code allTests_LicenseManager
	//TODO: implement
	//End of user code

	}
	
	//print the test result
	this.printTest=function(testName,testMessage,state){
		var e = document.getElementById(this.prefix+'-'+this.messageBlockId);
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix+'-'+testName;
		elemDiv.innerText = testMessage;
		if(!state)
			elemDiv.className = 'failed_state'
		e.appendChild(elemDiv);
	}
	
	this.testAttributes=function() {
	//Start of user code attributeTests_LicenseManager
		var count =	this.test_instance.contractCount();
		this.printTest("attribute_address", "testAttributes-Count: "+count, count==0);		
		var issna =	this.test_instance.issuerName();
		this.printTest("attribute_address", "issuerName: "+issna, issna=='A license manager for the license manager.');		
		var issna =	this.test_instance.owner();
		this.printTest("attribute_address", "owner: "+issna, issna==web3.eth.defaultAccount);		
	
	//End of user code
	}

	//Test for LicenseManager_changePaymentAddress_address
	this.testLicenseManager_changePaymentAddress_address=function() {
		//Start of user code test_LicenseManager_changePaymentAddress_address
	//TODO: implement
	var p__newPaymentAdress = this.test_instance.address;
	var res = this.test_instance.changePaymentAddress( p__newPaymentAdress);
	var state = res!="";		
	this.printTest("testchangePaymentAddress_address", "testchangePaymentAddress_address: "+res, state);		
	//End of user code
	}

	//Test for LicenseManager_createIssuerContract_string_string_string_uint_uint
	this.testLicenseManager_createIssuerContract_string_string_string_uint_uint=function() {
		//Start of user code test_LicenseManager_createIssuerContract_string_string_string_uint_uint
	//TODO: implement
	var count =	this.test_instance.contractCount();
	var p_itemName = 'A testname'+count;
	var p_textHash = 'a hash';
	var p_url = 'an url';
	var p_lifeTime = 0;
	var p_price = 100;
	
	var res = this.test_instance.createIssuerContract.sendTransaction(
			p_itemName, p_textHash, p_url, p_lifeTime, p_price, {
				gas : 1711300
			});
	var count1 = this.test_instance.contractCount();
	this.printTest("attribute_address", "createIssuerContract_string_string_string_uint_uint: "+count1, count<count1);		
	//End of user code
	}

	//Test for LicenseManager_stopIssuing_uint
	this.testLicenseManager_stopIssuing_uint=function() {
		//Start of user code test_LicenseManager_stopIssuing_uint
	//TODO: implement
	var p_licenseId = this.test_instance.contractCount()-1;
	var res = this.test_instance.stopIssuing( p_licenseId);
	this.printTest("testOperation1", "stopIssuing:"+res, res!='');		
	//End of user code
	}

	//Test for LicenseManager_changePaymentAddress_address_uint
	this.testLicenseManager_changePaymentAddress_address_uint=function() {
		//Start of user code test_LicenseManager_changePaymentAddress_address_uint
	//TODO: implement
	var p__newPaymentAddress =  this.test_instance.address;
	var p_licenseId = 0;
	var res = this.test_instance.changePaymentAddress( p__newPaymentAddress, p_licenseId);
	this.printTest("testOperation1", "test_LicenseManager_changePaymentAddress_address_uint:"+res, res!='');		
	//End of user code
	}
	this.customTests=function() {
		//Start of user code test_LicenseManager_custom tests
//
//End of user code
	}
}
//test class for LicenseIssuer
function TestLicenseIssuer(contract) {
	
	this.test_instance = contract;
	this.prefix='';
	this.messageBlockId = "testResult";
	var self = this;

	this.testSetup=function(){
		//Start of user code testSetup_LicenseIssuer
		//TODO: implement
		//End of user code
	}

	this.allTests=function(){
		this.testSetup();
		this.testAttributes();
		this.testLicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32();
		this.testLicenseIssuer_checkLicense_address();
		this.testLicenseIssuer_changePaymentAddress_address();
		this.testLicenseIssuer_stopIssuing();
		this.testLicenseIssuer_buyLicense_address_string();
		this.customTests();
	
		//Start of user code allTests_LicenseIssuer
	//TODO: implement
	//End of user code

	}
	
	//print the test result
	this.printTest=function(testName,testMessage,state){
		var e = document.getElementById(this.prefix+'-'+this.messageBlockId);
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix+'-'+testName;
		elemDiv.innerText = testMessage;
		if(!state)
			elemDiv.className = 'failed_state'
		e.appendChild(elemDiv);
	}
	
	this.testAttributes=function() {
	//Start of user code attributeTests_LicenseIssuer
		this.printTest("testOperation1", "TestLicenseIssuer", true);
		var licensedItemName =	this.test_instance.licensedItemName();
		this.printTest("attribute_address", "licensedItemName: "+licensedItemName, true);	
		var licencePrice =	this.test_instance.licencePrice();
		this.printTest("attribute_address", "licencePrice: "+licencePrice, true);	
		var licenseLifetime =	this.test_instance.licenseLifetime();
		this.printTest("attribute_address", "licenseLifetime: "+licenseLifetime, true);	
		var licenseCount =	this.test_instance.licenseCount();
		this.printTest("attribute_address", "licenseCount: "+licenseCount, true);	
		var licenseManager =	this.test_instance.licenseManager();
		this.printTest("attribute_address", "licenseManager: "+licenseManager, true);	
		var issuable =	this.test_instance.issuable();
		this.printTest("attribute_address", "issuable: "+issuable, true);	
		
	//End of user code
	}

	//Test for LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32
	this.testLicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32=function() {
		//Start of user code test_LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32
	//TODO: implement
//	var p_factHash = '';
//	var p_v = '';
//	var p_sig_r = '';
//	var p_sig_s = '';
//	var res = this.test_instance.checkLicense( p_factHash, p_v, p_sig_r, p_sig_s);
//	state success = res==="";		
//	this.printTest("testOperation1", "", state);		
	//
	//End of user code
	}

	//Test for LicenseIssuer_checkLicense_address
	this.testLicenseIssuer_checkLicense_address=function() {
		//Start of user code test_LicenseIssuer_checkLicense_address
	//TODO: implement
	var p__address = web3.eth.defaultAccount;// this.test_instance.address;
	var res = this.test_instance.checkLicense( p__address);
		
	this.printTest("testOperation1", "checkLicense_address:"+res, res===false);		
	//
	//End of user code
	}

	//Test for LicenseIssuer_changePaymentAddress_address
	this.testLicenseIssuer_changePaymentAddress_address=function() {
		//Start of user code test_LicenseIssuer_changePaymentAddress_address
	//TODO: implement
//	var p__newPaymentAddress = '';
//	var res = this.test_instance.changePaymentAddress( p__newPaymentAddress);
//	state success = res==="";		
//	this.printTest("testOperation1", "", state);		
	//
	//End of user code
	}

	//Test for LicenseIssuer_stopIssuing
	this.testLicenseIssuer_stopIssuing=function() {
		//Start of user code test_LicenseIssuer_stopIssuing
//	var res = this.test_instance.stopIssuing();
//	var state = res==="";		
//	this.printTest("testOperation1", "stopIssuing:"+res, state);		
	//End of user code
	}

	//Test for LicenseIssuer_buyLicense_address_string
	this.testLicenseIssuer_buyLicense_address_string=function() {
		//Start of user code test_LicenseIssuer_buyLicense_address_string
	//TODO: implement
		var licenseCountBefore =	this.test_instance.licenseCount();
		var price =	this.test_instance.licencePrice();
	var p__address = web3.eth.defaultAccount;//this.test_instance.address;
	var p__name = 'Testname';
	var res = this.test_instance.buyLicense.sendTransaction( p__address, p__name,{
		value : price
	});
	var state  = res==="";	
	var licenseCountAfter =	this.test_instance.licenseCount();
	this.printTest("testOperation1", licenseCountBefore +" before buyLicense_address_string and after "+licenseCountAfter, licenseCountBefore<licenseCountAfter);		
	//
	//End of user code
	}
	this.customTests=function() {
		//Start of user code test_LicenseIssuer_custom tests
		this.printTest("", "Start custom tests...", true);		
		var account = web3.eth.accounts[1];//web3.eth.defaultAccount;
		var res = this.test_instance.checkLicense(account);		
		this.printTest("testOperation1", "checkLicense_address:"+res, res===false);	
		
		var licenseCountBefore =	this.test_instance.licenseCount();
		var price =	this.test_instance.licencePrice();
		var p__address = account;//this.test_instance.address;
		var p__name = 'Testname';
		var res = this.test_instance.buyLicense.sendTransaction( p__address, p__name,{
			value : price
		});
		var state  = res==="";	
		var licenseCountAfter =	this.test_instance.licenseCount();
		this.printTest("testOperation1", licenseCountBefore +" before buyLicense_address_string and after "+licenseCountAfter, licenseCountBefore<licenseCountAfter);		
		
		var res = this.test_instance.checkLicense(account);		
		this.printTest("testOperation1", "checkLicense_address:"+res, res===true);	
		
		var res = this.test_instance.stopIssuing();
		var state = res!=="";		
		this.printTest("testOperation1", "stopIssuing:"+res, state);		

		var licenseCountBefore =	this.test_instance.licenseCount();
		var price =	this.test_instance.licencePrice();
		var p__address = account;//this.test_instance.address;
		var p__name = 'Testname';
		var res = this.test_instance.buyLicense.sendTransaction( p__address, p__name,{
			value : price
		});
		var state  = res==="";	
		var licenseCountAfter =	this.test_instance.licenseCount();
		this.printTest("testOperation1", licenseCountBefore +" before buyLicense_address_string and after "+licenseCountAfter, licenseCountBefore=licenseCountAfter);		

		var res = this.test_instance.checkLicense(web3.eth.accounts[0]);		
		this.printTest("testOperation1", "checkLicense_address:"+res, res===true);		

		//End of user code
	}
}
