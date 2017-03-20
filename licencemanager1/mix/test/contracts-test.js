// file header
/**
* A simple bean class around the contract.
* The LicenseManagerModel.
**/
function LicenseManagerModel(contract) {
this.contract = contract;
	/**
	* Getter for owner.
	**/
	this.getOwner = function(){
		return contract.owner(); 
	}
	/**
	* Getter for paymentAddress.
	**/
	this.getPaymentAddress = function(){
		return contract.paymentAddress(); 
	}
	/**
	* Getter for issuerName.
	**/
	this.getIssuerName = function(){
		return contract.issuerName(); 
	}
	/**
	* Getter for contractCount.
	**/
	this.getContractCount = function(){
		return contract.contractCount(); 
	}
	/**
	* Get the mapped value for a key.
	*/
	this.getContracts=function(key) {
		return contract.contracts(key);
	}
	/**
	* Call changePaymentAddress.
	**/
	this.changePaymentAddress = function(_newPaymentAdress){
		return contract.changePaymentAddress(_newPaymentAdress); 
	}
	/**
	* Call createIssuerContract.
	**/
	this.createIssuerContract = function(itemName,textHash,url,lifeTime,price){
		return contract.createIssuerContract(itemName,textHash,url,lifeTime,price); 
	}
	/**
	* Call stopIssuing.
	**/
	this.stopIssuing = function(licenseId){
		return contract.stopIssuing(licenseId); 
	}
	/**
	* Call changePaymentAddress.
	**/
	this.changePaymentAddress = function(_newPaymentAddress,licenseId){
		return contract.changePaymentAddress(_newPaymentAddress,licenseId); 
	}
	/**
	* Call changeOwner.
	**/
	this.changeOwner = function(_newOwner){
		return contract.changeOwner(_newOwner); 
	}
}// end of function LicenseManagerModel

//test class for LicenseManager
function TestLicenseManager(contract) {
	
	this.test_instance = contract;
	this.model = new LicenseManagerModel(contract);
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
		this.testLicenseManager_changeOwner_address();
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
		elemDiv.className='testRow';
		elemDiv.text=testMessage;
		var stateDiv = document.createElement('div');
		if(state){
			elemDiv.innerHTML = '<div class="pass_state">P</div><div class="testCell">'+testMessage+'</div>';
		}else{
			elemDiv.innerHTML = '<div class="failed_state">F</div><div class="testCell">'+testMessage+'</div>';
		}
		e.appendChild(elemDiv);
	}

	//assertEquals
	this.testAE=function(testName,testMessage,expected,value) {
		if(expected==value)
			this.printTest(testName, testMessage, true);
		else
			this.printTest(testName, testMessage+': expected '+expected+' got '+value, false);
	}

	//test the attributes after setup	
	this.testAttributes=function() {
	//Start of user code attributeTests_LicenseManager
	//TODO: implement
	//End of user code
	}

	//Test for LicenseManager_changePaymentAddress_address
	this.testLicenseManager_changePaymentAddress_address=function() {
		//	var res = this.test_instance.changePaymentAddress( p__newPaymentAdress);
		//Start of user code test_LicenseManager_changePaymentAddress_address
		//TODO : implement this
		//var test = false;		
		//this.testAE("testchangePaymentAddress", "executed: testLicenseManager_changePaymentAddress_address",true, test);		
		//End of user code
	}

	//Test for LicenseManager_createIssuerContract_string_string_string_uint_uint
	this.testLicenseManager_createIssuerContract_string_string_string_uint_uint=function() {
		//	var res = this.test_instance.createIssuerContract( p_itemName, p_textHash, p_url, p_lifeTime, p_price);
		//Start of user code test_LicenseManager_createIssuerContract_string_string_string_uint_uint
		//TODO : implement this
		//var test = false;		
		//this.testAE("testcreateIssuerContract", "executed: testLicenseManager_createIssuerContract_string_string_string_uint_uint",true, test);		
		//End of user code
	}

	//Test for LicenseManager_stopIssuing_uint
	this.testLicenseManager_stopIssuing_uint=function() {
		//	var res = this.test_instance.stopIssuing( p_licenseId);
		//Start of user code test_LicenseManager_stopIssuing_uint
		//TODO : implement this
		//var test = false;		
		//this.testAE("teststopIssuing", "executed: testLicenseManager_stopIssuing_uint",true, test);		
		//End of user code
	}

	//Test for LicenseManager_changePaymentAddress_address_uint
	this.testLicenseManager_changePaymentAddress_address_uint=function() {
		//	var res = this.test_instance.changePaymentAddress( p__newPaymentAddress, p_licenseId);
		//Start of user code test_LicenseManager_changePaymentAddress_address_uint
		//TODO : implement this
		//var test = false;		
		//this.testAE("testchangePaymentAddress", "executed: testLicenseManager_changePaymentAddress_address_uint",true, test);		
		//End of user code
	}

	//Test for LicenseManager_changeOwner_address
	this.testLicenseManager_changeOwner_address=function() {
		//	var res = this.test_instance.changeOwner( p__newOwner);
		//Start of user code test_LicenseManager_changeOwner_address
		//TODO : implement this
		//var test = false;		
		//this.testAE("testchangeOwner", "executed: testLicenseManager_changeOwner_address",true, test);		
		//End of user code
	}
	this.customTests=function() {
		//Start of user code test_LicenseManager_custom tests
		//
		//End of user code
	}
}
/**
* A simple bean class around the contract.
* The LicenseIssuerModel.
**/
function LicenseIssuerModel(contract) {
this.contract = contract;
	/**
	* Getter for licensedItemName.
	**/
	this.getLicensedItemName = function(){
		return contract.licensedItemName(); 
	}
	/**
	* Getter for licenseManager.
	**/
	this.getLicenseManager = function(){
		return contract.licenseManager(); 
	}
	/**
	* Getter for licenseTextHash.
	**/
	this.getLicenseTextHash = function(){
		return contract.licenseTextHash(); 
	}
	/**
	* Getter for licenseUrl.
	**/
	this.getLicenseUrl = function(){
		return contract.licenseUrl(); 
	}
	/**
	* Getter for licencePrice.
	**/
	this.getLicencePrice = function(){
		return contract.licencePrice(); 
	}
	/**
	* Getter for licenseLifetime.
	**/
	this.getLicenseLifetime = function(){
		return contract.licenseLifetime(); 
	}
	/**
	* Getter for licenseCount.
	**/
	this.getLicenseCount = function(){
		return contract.licenseCount(); 
	}
	/**
	* Getter for issuable.
	**/
	this.getIssuable = function(){
		return contract.issuable(); 
	}
	/**
	* Getter for paymentAddress.
	**/
	this.getPaymentAddress = function(){
		return contract.paymentAddress(); 
	}
	/**
	* Get the mapped value for a key.
	*/
	this.getIssuedLicenses=function(key) {
		return contract.issuedLicenses(key);
	}
	/**
	* Get the mapped value for a key.
	*/
	this.getLicenseOwners=function(key) {
		return contract.licenseOwners(key);
	}
	/**
	* Call checkLicense.
	**/
	this.checkLicense = function(factHash,v,sig_r,sig_s){
		return contract.checkLicense(factHash,v,sig_r,sig_s); 
	}
	/**
	* Call checkLicense.
	**/
	this.checkLicense = function(_address){
		return contract.checkLicense(_address); 
	}
	/**
	* Call changePaymentAddress.
	**/
	this.changePaymentAddress = function(_newPaymentAddress){
		return contract.changePaymentAddress(_newPaymentAddress); 
	}
	/**
	* Call stopIssuing.
	**/
	this.stopIssuing = function(){
		return contract.stopIssuing(); 
	}
	/**
	* Call buyLicense.
	**/
	this.buyLicense = function(_address,_name){
		return contract.buyLicense(_address,_name); 
	}
}// end of function LicenseIssuerModel

//test class for LicenseIssuer
function TestLicenseIssuer(contract) {
	
	this.test_instance = contract;
	this.model = new LicenseIssuerModel(contract);
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
		elemDiv.className='testRow';
		elemDiv.text=testMessage;
		var stateDiv = document.createElement('div');
		if(state){
			elemDiv.innerHTML = '<div class="pass_state">P</div><div class="testCell">'+testMessage+'</div>';
		}else{
			elemDiv.innerHTML = '<div class="failed_state">F</div><div class="testCell">'+testMessage+'</div>';
		}
		e.appendChild(elemDiv);
	}

	//assertEquals
	this.testAE=function(testName,testMessage,expected,value) {
		if(expected==value)
			this.printTest(testName, testMessage, true);
		else
			this.printTest(testName, testMessage+': expected '+expected+' got '+value, false);
	}

	//test the attributes after setup	
	this.testAttributes=function() {
	//Start of user code attributeTests_LicenseIssuer
	//TODO: implement
	//End of user code
	}

	//Test for LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32
	this.testLicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32=function() {
		//	var res = this.test_instance.checkLicense( p_factHash, p_v, p_sig_r, p_sig_s);
		//Start of user code test_LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32
		//TODO : implement this
		//var test = false;		
		//this.testAE("testcheckLicense", "executed: testLicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32",true, test);		
		//End of user code
	}

	//Test for LicenseIssuer_checkLicense_address
	this.testLicenseIssuer_checkLicense_address=function() {
		//	var res = this.test_instance.checkLicense( p__address);
		//Start of user code test_LicenseIssuer_checkLicense_address
		//TODO : implement this
		//var test = false;		
		//this.testAE("testcheckLicense", "executed: testLicenseIssuer_checkLicense_address",true, test);		
		//End of user code
	}

	//Test for LicenseIssuer_changePaymentAddress_address
	this.testLicenseIssuer_changePaymentAddress_address=function() {
		//	var res = this.test_instance.changePaymentAddress( p__newPaymentAddress);
		//Start of user code test_LicenseIssuer_changePaymentAddress_address
		//TODO : implement this
		//var test = false;		
		//this.testAE("testchangePaymentAddress", "executed: testLicenseIssuer_changePaymentAddress_address",true, test);		
		//End of user code
	}

	//Test for LicenseIssuer_stopIssuing
	this.testLicenseIssuer_stopIssuing=function() {
		//	var res = this.test_instance.stopIssuing();
		//Start of user code test_LicenseIssuer_stopIssuing
		//TODO : implement this
		//var test = false;		
		//this.testAE("teststopIssuing", "executed: testLicenseIssuer_stopIssuing",true, test);		
		//End of user code
	}

	//Test for LicenseIssuer_buyLicense_address_string
	this.testLicenseIssuer_buyLicense_address_string=function() {
		//	var res = this.test_instance.buyLicense( p__address, p__name);
		//Start of user code test_LicenseIssuer_buyLicense_address_string
		//TODO : implement this
		//var test = false;		
		//this.testAE("testbuyLicense", "executed: testLicenseIssuer_buyLicense_address_string",true, test);		
		//End of user code
	}
	this.customTests=function() {
		//Start of user code test_LicenseIssuer_custom tests
		//
		//End of user code
	}
}
