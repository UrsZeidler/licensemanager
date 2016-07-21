
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



//gui factory LicenseManager
function LicenseManagerGuiFactory() {
	this.prefix='';
	
// default Gui
this.placeDefaultGui=function() {
	var e = document.getElementById(this.prefix+'LicenseManager_gui');
	if(e!=null)
		e.innerHTML = this.createDefaultGui();
	else
		console.log(this.prefix+'LicenseManager_gui not found');
}
// default Gui
this.createDefaultGui=function() {
	return 	'<!-- gui for LicenseManager_contract -->'
+	'	<div class="contract" id="'+this.prefix+'LicenseManager_contract">'
+	'	LicenseManager:'
+	'	  <input type="text" id="'+this.prefix+'LicenseManager_address"> <button id="'+this.prefix+'LicenseManagerController.setAddress" onclick="'+this.prefix+'LicenseManagerController.setAddress()">change LicenseManager Address</button>'
+	'	  <div class="contract_attributes" id="'+this.prefix+'LicenseManager_contract_attributes"> attributes:'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_owner"> owner:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_owner_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_issuerName"> issuerName:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_issuerName_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_contractCount"> contractCount:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_contractCount_value"> </div>'
+	'	    </div>'
+	'	'
+	'	<div class="Value_Mapping" id="'+this.prefix+'LicenseManager_contract_attribute_contracts">mapping  contracts:'
+	'			<input type="number" id="'+this.prefix+'LicenseManager_contract_attribute_contracts_input">(uint)'
+	'	    	<div class="Mapping_value" id="'+this.prefix+'LicenseManager_contract_attribute_uint"> LicenseIssuer:'
+	'	      		<div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_contracts_value"> </div>'
+	'	    	</div>'
+	'	  </div>'
+	'	    <button id="'+this.prefix+'LicenseManager_updateAttributes" onclick="'+this.prefix+'LicenseManagerController._updateAttributes()">update LicenseManager attributes</button>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_changePaymentAddress_address">'
+	'	LicenseManager_changePaymentAddress:'
+	'		  <div class="function_parameter">_newPaymentAdress<input type="text" id="'+this.prefix+'LicenseManager_changePaymentAddress_address__newPaymentAdress"></div>'
+	'		<button id="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address()">execute LicenseManager_changePaymentAddress</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_createIssuerContract_string_string_string_uint_uint">'
+	'	LicenseManager_createIssuerContract:'
+	'		  <div class="function_parameter">itemName<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName"></div>'
+	'		  <div class="function_parameter">textHash<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash"></div>'
+	'		  <div class="function_parameter">url<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_url"></div>'
+	'		  <div class="function_parameter">lifeTime<input type="number" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime"></div>'
+	'		  <div class="function_parameter">price<input type="number" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_price"></div>'
+	'		<button id="'+this.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint()">execute LicenseManager_createIssuerContract</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_stopIssuing_uint">'
+	'	LicenseManager_stopIssuing:'
+	'		  <div class="function_parameter">licenseId<input type="number" id="'+this.prefix+'LicenseManager_stopIssuing_uint_licenseId"></div>'
+	'		<button id="'+this.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint()">execute LicenseManager_stopIssuing</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseManager_stopIssuing_uint_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_changePaymentAddress_address_uint">'
+	'	LicenseManager_changePaymentAddress:'
+	'		  <div class="function_parameter">_newPaymentAddress<input type="text" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint__newPaymentAddress"></div>'
+	'		  <div class="function_parameter">licenseId<input type="number" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint_licenseId"></div>'
+	'		<button id="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint()">execute LicenseManager_changePaymentAddress</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint_res"></div>'
+	'	  </div>'
+	'	'
+	'	</div>'
;
}

//default attributes
this.createAttributesGui=function() {
	return 	'    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_owner"> owner:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_owner_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_issuerName"> issuerName:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_issuerName_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseManager_contract_attribute_contractCount"> contractCount:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseManager_contractCount_value"> </div>'
+	'	    </div>'
+	'	'
;
}



this.createLicenseManager_changePaymentAddress_addressGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_changePaymentAddress_address">'
+	'LicenseManager_changePaymentAddress:'
+	'	  <div class="function_parameter">_newPaymentAdress<input type="text" id="'+this.prefix+'LicenseManager_changePaymentAddress_address__newPaymentAdress"></div>'
+	'	<button id="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address()">execute LicenseManager_changePaymentAddress</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_res"></div>'
+	'  </div>'
;
}
this.createLicenseManager_createIssuerContract_string_string_string_uint_uintGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_createIssuerContract_string_string_string_uint_uint">'
+	'LicenseManager_createIssuerContract:'
+	'	  <div class="function_parameter">itemName<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName"></div>'
+	'	  <div class="function_parameter">textHash<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash"></div>'
+	'	  <div class="function_parameter">url<input type="text" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_url"></div>'
+	'	  <div class="function_parameter">lifeTime<input type="number" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime"></div>'
+	'	  <div class="function_parameter">price<input type="number" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_price"></div>'
+	'	<button id="'+this.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint()">execute LicenseManager_createIssuerContract</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_res"></div>'
+	'  </div>'
;
}
this.createLicenseManager_stopIssuing_uintGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_stopIssuing_uint">'
+	'LicenseManager_stopIssuing:'
+	'	  <div class="function_parameter">licenseId<input type="number" id="'+this.prefix+'LicenseManager_stopIssuing_uint_licenseId"></div>'
+	'	<button id="'+this.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint()">execute LicenseManager_stopIssuing</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseManager_stopIssuing_uint_res"></div>'
+	'  </div>'
;
}
this.createLicenseManager_changePaymentAddress_address_uintGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseManager_contract_function_LicenseManager_changePaymentAddress_address_uint">'
+	'LicenseManager_changePaymentAddress:'
+	'	  <div class="function_parameter">_newPaymentAddress<input type="text" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint__newPaymentAddress"></div>'
+	'	  <div class="function_parameter">licenseId<input type="number" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint_licenseId"></div>'
+	'	<button id="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint" onclick="'+this.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint()">execute LicenseManager_changePaymentAddress</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseManager_changePaymentAddress_address_uint_res"></div>'
+	'  </div>'
;
}


//print the contract div around
this.createSeletonGui=function(inner) {
	return 	'<!-- gui for LicenseManager_contract -->'
+	'	<div class="contract" id="'+this.prefix+'LicenseManager_contract">'
+ inner
+'</div>';
}


//eventguis

}//end guifactory
// script for LicenseManager gui controller
function LicenseManagerController() {

	this.instance = undefined;
	this.prefix='';
	this.contractAddress = undefined; 
	this.eventlogPrefix = '';
	var self = this;

// bind buttons
	this.bindGui=function() {
		var btn = document.getElementById(self.prefix+'LicenseManagerController.setAddress');
		if(btn!=undefined)		
			btn.onclick = this.setAddress;

		var btn = document.getElementById(self.prefix+'LicenseManager_updateAttributes');
		if(btn!=undefined)
			btn.onclick = this._updateAttributes;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address');
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_changePaymentAddress_address;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint');
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_createIssuerContract_string_string_string_uint_uint;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint');
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_stopIssuing_uint;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint');
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_changePaymentAddress_address_uint;
	}
	// set function
	this.setAddress=function() {
	var _address = document.getElementById(self.prefix+'LicenseManager_address');
	if(_address==null)return;

	self.LicenseManager_instance = LicenseManagerContract.at(_address.value);
	self.contractAddress = _address.value;
	self._updateAttributes();
}
//update attributes
this._updateAttributes=function () {
if(this.instance===null) return;
// update attributes
	var owner_res = self.instance.owner();
	var e = document.getElementById(self.prefix+'LicenseManager_owner_value');
	if(owner_res!=null && e!=null)
		e.innerText = owner_res;
	var issuerName_res = self.instance.issuerName();
	var e = document.getElementById(self.prefix+'LicenseManager_issuerName_value');
	if(issuerName_res!=null && e!=null)
		e.innerText = issuerName_res;
	var contractCount_res = self.instance.contractCount();
	var e = document.getElementById(self.prefix+'LicenseManager_contractCount_value');
	if(contractCount_res!=null && e!=null)
		e.innerText = contractCount_res;
var e = document.getElementById(self.prefix+'LicenseManager_contract_attribute_contracts_input');
if(e!=null){
	var _key = e.value;
	var contracts_res = self.instance.contracts(_key);
	if(contracts_res!=null){
		var e1 = document.getElementById(self.prefix+'LicenseManager_contracts_value');
		if(e1!=null)	
			e1.innerText = contracts_res;
	}}
}

//call functions
//function LicenseManager_changePaymentAddress
this.LicenseManager_changePaymentAddress_address=function() {
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address__newPaymentAdress');
	if(e!=null)
		var param__newPaymentAdress = e.value;
	var res = self.instance.changePaymentAddress(param__newPaymentAdress);
}
//function LicenseManager_createIssuerContract
this.LicenseManager_createIssuerContract_string_string_string_uint_uint=function() {
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName');
	if(e!=null)
		var param_itemName = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash');
	if(e!=null)
		var param_textHash = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_url');
	if(e!=null)
		var param_url = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime');
	if(e!=null)
		var param_lifeTime = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_price');
	if(e!=null)
		var param_price = e.value;
	var res = self.instance.createIssuerContract(param_itemName, param_textHash, param_url, param_lifeTime, param_price);
}
//function LicenseManager_stopIssuing
this.LicenseManager_stopIssuing_uint=function() {
	var e = document.getElementById(self.prefix+'LicenseManager_stopIssuing_uint_licenseId');
	if(e!=null)
		var param_licenseId = e.value;
	var res = self.instance.stopIssuing(param_licenseId);
}
//function LicenseManager_changePaymentAddress
this.LicenseManager_changePaymentAddress_address_uint=function() {
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address_uint__newPaymentAddress');
	if(e!=null)
		var param__newPaymentAddress = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address_uint_licenseId');
	if(e!=null)
		var param_licenseId = e.value;
	var res = self.instance.changePaymentAddress(param__newPaymentAddress, param_licenseId);
}

//delegated calls

}// end controller	


//class as GlueCode LicenseManagerManager
//uses prefix + 'GuiContainer'
function LicenseManagerManager(prefix,contract,containerId) {
	this.prefix = prefix;
	var self = this;
	this.c = new LicenseManagerController();
	this.c.prefix=prefix;
	this.c.instance=contract;
	this.c.contractAddress = contract.address;
	this.g = new LicenseManagerGuiFactory();
	this.g.prefix = prefix;
	this.containerId = containerId;

	this.addGui = function() {
		var e = document.getElementById(this.containerId);
		if(e==null)return;
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix +'LicenseManager_gui';
		e.appendChild(elemDiv);
		elemDiv.innerHTML = this.createGui(this.g);
		var e = document.getElementById(this.prefix+'LicenseManager_address');
		if(e!=null)
			e.value = this.c.contractAddress;
		this.c.bindGui();
	}	
	this.clearGui = function(){
		var e = document.getElementById(this.containerId);
		e.innerHTML ='';
	}
	this.createGui = function(guifactory){
		var txt ='';
		txt = txt + guifactory.createDefaultGui();
		return guifactory.createSeletonGui(txt);

	}
	this.createSmallGui = function(guifactory){
		var txt ='';
		txt = txt + guifactory.createAttributesGui();
		return guifactory.createSeletonGui(txt);

	}
	this.updateGui = function(){
		this.c._updateAttributes();
	}
	this.getContract = function(){
		return this.c.instance;
	}

//watch events
	this.watchEvents=function(){
	}

}// end of manager

function LicenseManagerGuiMananger(guiId){
	this.prefix = guiId;
	this.managers=new Array();	//[];		
	
	this.addManager = function(contract) {
		var m = new LicenseManagerManager(contract.address,contract,this.prefix);
		m.watchEvents();
		this.managers.push(m);
		//manager.addGui();
	}
			
	this.clearGui = function(){
		var e = document.getElementById(this.prefix);
		if(e!==undefined)
			e.innerHTML ='';
	}
			
	this.displayGui = function(){
		var e = document.getElementById(this.prefix);
		if(e==undefined) return;
		for (i in this.managers) {
			var manager = this.managers[i] ;
			var elemDiv = document.createElement('div');
			elemDiv.id= manager.prefix + 'GuiContainer';//'LicenseManager_gui';
			e.appendChild(elemDiv);
			elemDiv.innerHTML = manager.createGui(manager.g);
		}
	}
	this.displaySimpleGui = function(){
		for (i in this.managers) {
			var manager = this.managers[i] ;
			manager.addGui();
		}
	}

	this.updateGui = function(){
		for (i in this.managers) {
			this.managers[i].updateGui();
		}
//		console.log('update');
	}
}// end of gui mananger

//Start of user code custom_LicenseManager_js
//TODO: implement
//End of user code
//gui factory LicenseIssuer
function LicenseIssuerGuiFactory() {
	this.prefix='';
	
// default Gui
this.placeDefaultGui=function() {
	var e = document.getElementById(this.prefix+'LicenseIssuer_gui');
	if(e!=null)
		e.innerHTML = this.createDefaultGui();
	else
		console.log(this.prefix+'LicenseIssuer_gui not found');
}
// default Gui
this.createDefaultGui=function() {
	return 	'<!-- gui for LicenseIssuer_contract -->'
+	'	<div class="contract" id="'+this.prefix+'LicenseIssuer_contract">'
+	'	LicenseIssuer:'
+	'	  <input type="text" id="'+this.prefix+'LicenseIssuer_address"> <button id="'+this.prefix+'LicenseIssuerController.setAddress" onclick="'+this.prefix+'LicenseIssuerController.setAddress()">change LicenseIssuer Address</button>'
+	'	  <div class="contract_attributes" id="'+this.prefix+'LicenseIssuer_contract_attributes"> attributes:'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licensedItemName"> licensedItemName:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licensedItemName_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseManager"> licenseManager:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseManager_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseTextHash"> licenseTextHash:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseTextHash_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseUrl"> licenseUrl:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseUrl_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licencePrice"> licencePrice:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licencePrice_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseLifetime"> licenseLifetime:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseLifetime_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseCount"> licenseCount:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseCount_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuable"> issuable:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_issuable_value"> </div>'
+	'	    </div>'
+	'	'
+	'	<!--struct -->'
+	'	<div class="Struct_Mapping" id="'+this.prefix+'Struc_LicenseIssuer_contract_attribute_issuedLicenses">struc mapping  issuedLicenses:'
+	'			<input type="number" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_input">(uint)'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_licenseOwnerAdress"> licenseOwnerAdress:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerAdress_value"> </div>'
+	'	    	</div>'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_licenseOwnerName"> licenseOwnerName:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerName_value"> </div>'
+	'	    	</div>'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_issuedDate"> issuedDate:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_issuedDate_value"> </div>'
+	'	    	</div>'
+	'	  </div>'
+	'	<!--struct -->'
+	'	<div class="Struct_Mapping" id="'+this.prefix+'Struc_LicenseIssuer_contract_attribute_licenseOwners">struc mapping  licenseOwners:'
+	'			<input type="text" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_input">(address)'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_licenseOwnerAdress"> licenseOwnerAdress:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_licenseOwnerAdress_value"> </div>'
+	'	    	</div>'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_licenseOwnerName"> licenseOwnerName:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_licenseOwnerName_value"> </div>'
+	'	    	</div>'
+	'	    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_issuedDate"> issuedDate:'
+	'	      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_issuedDate_value"> </div>'
+	'	    	</div>'
+	'	  </div>'
+	'	    <button id="'+this.prefix+'LicenseIssuer_updateAttributes" onclick="'+this.prefix+'LicenseIssuerController._updateAttributes()">update LicenseIssuer attributes</button>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32">'
+	'	LicenseIssuer_checkLicense:'
+	'		  <div class="function_parameter">factHash<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash"></div>'
+	'		  <div class="function_parameter">v<input type="number" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v"></div>'
+	'		  <div class="function_parameter">sig_r<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r"></div>'
+	'		  <div class="function_parameter">sig_s<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s"></div>'
+	'		<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32()">execute LicenseIssuer_checkLicense</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_address">'
+	'	LicenseIssuer_checkLicense:'
+	'		  <div class="function_parameter">_address<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_address__address"></div>'
+	'		<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address()">execute LicenseIssuer_checkLicense</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseIssuer_checkLicense_address_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_changePaymentAddress_address">'
+	'	LicenseIssuer_changePaymentAddress:'
+	'		  <div class="function_parameter">_newPaymentAddress<input type="text" id="'+this.prefix+'LicenseIssuer_changePaymentAddress_address__newPaymentAddress"></div>'
+	'		<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address()">execute LicenseIssuer_changePaymentAddress</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseIssuer_changePaymentAddress_address_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_stopIssuing">'
+	'	LicenseIssuer_stopIssuing:'
+	'		<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing()">execute LicenseIssuer_stopIssuing</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseIssuer_stopIssuing_res"></div>'
+	'	  </div>'
+	'	  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_buyLicense_address_string">'
+	'	LicenseIssuer_buyLicense:'
+	'		  <div class="function_parameter">_address<input type="text" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string__address"></div>'
+	'		  <div class="function_parameter">_name<input type="text" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string__name"></div>'
+	'		<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string()">execute LicenseIssuer_buyLicense</button>'
+	'		<div class="function_result" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string_res"></div>'
+	'	  </div>'
+	'	'
+	'	</div>'
;
}

//default attributes
this.createAttributesGui=function() {
	return 	'    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licensedItemName"> licensedItemName:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licensedItemName_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseManager"> licenseManager:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseManager_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseTextHash"> licenseTextHash:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseTextHash_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseUrl"> licenseUrl:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseUrl_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licencePrice"> licencePrice:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licencePrice_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseLifetime"> licenseLifetime:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseLifetime_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseCount"> licenseCount:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseCount_value"> </div>'
+	'	    </div>'
+	'	    <div class="contract_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuable"> issuable:'
+	'	      <div class="contract_attribute_value" id="'+this.prefix+'LicenseIssuer_issuable_value"> </div>'
+	'	    </div>'
+	'	'
;
}



this.createLicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32Gui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32">'
+	'LicenseIssuer_checkLicense:'
+	'	  <div class="function_parameter">factHash<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash"></div>'
+	'	  <div class="function_parameter">v<input type="number" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v"></div>'
+	'	  <div class="function_parameter">sig_r<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r"></div>'
+	'	  <div class="function_parameter">sig_s<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s"></div>'
+	'	<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32()">execute LicenseIssuer_checkLicense</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_res"></div>'
+	'  </div>'
;
}
this.createLicenseIssuer_checkLicense_addressGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_address">'
+	'LicenseIssuer_checkLicense:'
+	'	  <div class="function_parameter">_address<input type="text" id="'+this.prefix+'LicenseIssuer_checkLicense_address__address"></div>'
+	'	<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address()">execute LicenseIssuer_checkLicense</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseIssuer_checkLicense_address_res"></div>'
+	'  </div>'
;
}
this.createLicenseIssuer_changePaymentAddress_addressGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_changePaymentAddress_address">'
+	'LicenseIssuer_changePaymentAddress:'
+	'	  <div class="function_parameter">_newPaymentAddress<input type="text" id="'+this.prefix+'LicenseIssuer_changePaymentAddress_address__newPaymentAddress"></div>'
+	'	<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address()">execute LicenseIssuer_changePaymentAddress</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseIssuer_changePaymentAddress_address_res"></div>'
+	'  </div>'
;
}
this.createLicenseIssuer_stopIssuingGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_stopIssuing">'
+	'LicenseIssuer_stopIssuing:'
+	'	<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing()">execute LicenseIssuer_stopIssuing</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseIssuer_stopIssuing_res"></div>'
+	'  </div>'
;
}
this.createLicenseIssuer_buyLicense_address_stringGui=function() {
return 	'  <div class="function_execution" id="'+this.prefix+'LicenseIssuer_contract_function_LicenseIssuer_buyLicense_address_string">'
+	'LicenseIssuer_buyLicense:'
+	'	  <div class="function_parameter">_address<input type="text" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string__address"></div>'
+	'	  <div class="function_parameter">_name<input type="text" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string__name"></div>'
+	'	<button id="'+this.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string" onclick="'+this.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string()">execute LicenseIssuer_buyLicense</button>'
+	'	<div class="function_result" id="'+this.prefix+'LicenseIssuer_buyLicense_address_string_res"></div>'
+	'  </div>'
;
}

this.createissuedLicensesStructGui=function() {
return 	'<!--struct -->'
+	'<div class="Struct_Mapping" id="'+this.prefix+'Struc_LicenseIssuer_contract_attribute_issuedLicenses">struc mapping  issuedLicenses:'
+	'		<input type="number" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_input">(uint)'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_licenseOwnerAdress"> licenseOwnerAdress:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerAdress_value"> </div>'
+	'    	</div>'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_licenseOwnerName"> licenseOwnerName:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerName_value"> </div>'
+	'    	</div>'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_issuedDate"> issuedDate:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_issuedLicenses_issuedDate_value"> </div>'
+	'    	</div>'
+	'  </div>'
;
}

this.createlicenseOwnersStructGui=function() {
return 	'<!--struct -->'
+	'<div class="Struct_Mapping" id="'+this.prefix+'Struc_LicenseIssuer_contract_attribute_licenseOwners">struc mapping  licenseOwners:'
+	'		<input type="text" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_input">(address)'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_licenseOwnerAdress"> licenseOwnerAdress:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_licenseOwnerAdress_value"> </div>'
+	'    	</div>'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_licenseOwnerName"> licenseOwnerName:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_licenseOwnerName_value"> </div>'
+	'    	</div>'
+	'    	<div class="Struct_attribute" id="'+this.prefix+'LicenseIssuer_contract_attribute_licenseOwners_issuedDate"> issuedDate:'
+	'      		<div class="Struct_attribute_value" id="'+this.prefix+'LicenseIssuer_licenseOwners_issuedDate_value"> </div>'
+	'    	</div>'
+	'  </div>'
;
}


//print the contract div around
this.createSeletonGui=function(inner) {
	return 	'<!-- gui for LicenseIssuer_contract -->'
+	'	<div class="contract" id="'+this.prefix+'LicenseIssuer_contract">'
+ inner
+'</div>';
}


//eventguis
this.createLicenseIssuedLogDataGui = function(prefix, blockHash, blockNumber
,ownerAddress,name,succesful) {
		return '<ul class="dapp-account-list"><li > '
        +'<a class="dapp-identicon dapp-small" style="background-image: url(identiconimage.png)"></a>'
		+'<span>'+prefix+' ('+blockNumber+')</span>'
        +'<span>'+ownerAddress+'</span>'
        +'<span>'+name+'</span>'
        +'<span>'+succesful+'</span>'
        +' </li>'
        ;
}

}//end guifactory
// script for LicenseIssuer gui controller
function LicenseIssuerController() {

	this.instance = undefined;
	this.prefix='';
	this.contractAddress = undefined; 
	this.eventlogPrefix = '';
	var self = this;

// bind buttons
	this.bindGui=function() {
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.setAddress');
		if(btn!=undefined)		
			btn.onclick = this.setAddress;

		var btn = document.getElementById(self.prefix+'LicenseIssuer_updateAttributes');
		if(btn!=undefined)
			btn.onclick = this._updateAttributes;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32');
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address');
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_checkLicense_address;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address');
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_changePaymentAddress_address;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing');
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_stopIssuing;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string');
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_buyLicense_address_string;
	}
	// set function
	this.setAddress=function() {
	var _address = document.getElementById(self.prefix+'LicenseIssuer_address');
	if(_address==null)return;

	self.LicenseIssuer_instance = LicenseIssuerContract.at(_address.value);
	self.contractAddress = _address.value;
	self._updateAttributes();
}
//update attributes
this._updateAttributes=function () {
if(this.instance===null) return;
// update attributes
	var licensedItemName_res = self.instance.licensedItemName();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licensedItemName_value');
	if(licensedItemName_res!=null && e!=null)
		e.innerText = licensedItemName_res;
	var licenseManager_res = self.instance.licenseManager();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licenseManager_value');
	if(licenseManager_res!=null && e!=null)
		e.innerText = licenseManager_res;
	var licenseTextHash_res = self.instance.licenseTextHash();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licenseTextHash_value');
	if(licenseTextHash_res!=null && e!=null)
		e.innerText = licenseTextHash_res;
	var licenseUrl_res = self.instance.licenseUrl();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licenseUrl_value');
	if(licenseUrl_res!=null && e!=null)
		e.innerText = licenseUrl_res;
	var licencePrice_res = self.instance.licencePrice();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licencePrice_value');
	if(licencePrice_res!=null && e!=null)
		e.innerText = licencePrice_res;
	var licenseLifetime_res = self.instance.licenseLifetime();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licenseLifetime_value');
	if(licenseLifetime_res!=null && e!=null)
		e.innerText = licenseLifetime_res;
	var licenseCount_res = self.instance.licenseCount();
	var e = document.getElementById(self.prefix+'LicenseIssuer_licenseCount_value');
	if(licenseCount_res!=null && e!=null)
		e.innerText = licenseCount_res;
	var issuable_res = self.instance.issuable();
	var e = document.getElementById(self.prefix+'LicenseIssuer_issuable_value');
	if(issuable_res!=null && e!=null)
		e.innerText = issuable_res;
	var e = document.getElementById(self.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_input');
if(e!=null){
	var _key = e.value;
	var issuedLicenses_res = self.instance.issuedLicenses(_key);
	if(issuedLicenses_res!=null){
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerAdress_value');
	if(e1!=null)	
		e1.innerText = issuedLicenses_res[0];
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerName_value');
	if(e1!=null)	
		e1.innerText = issuedLicenses_res[1];
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_issuedDate_value');
	if(e1!=null)	
		e1.innerText = issuedLicenses_res[2];
	}}
	var e = document.getElementById(self.prefix+'LicenseIssuer_contract_attribute_licenseOwners_input');
if(e!=null){
	var _key = e.value;
	var licenseOwners_res = self.instance.licenseOwners(_key);
	if(licenseOwners_res!=null){
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_licenseOwnerAdress_value');
	if(e1!=null)	
		e1.innerText = licenseOwners_res[0];
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_licenseOwnerName_value');
	if(e1!=null)	
		e1.innerText = licenseOwners_res[1];
	var e1 = document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_issuedDate_value');
	if(e1!=null)	
		e1.innerText = licenseOwners_res[2];
	}}
}

//call functions
//function LicenseIssuer_checkLicense
this.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32=function() {
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash');
	if(e!=null)
		var param_factHash = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v');
	if(e!=null)
		var param_v = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r');
	if(e!=null)
		var param_sig_r = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s');
	if(e!=null)
		var param_sig_s = e.value;
	var res = self.instance.checkLicense(param_factHash, param_v, param_sig_r, param_sig_s);
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_res');
	if(res!=null && e!=null)
		e.innerText = res;
}
//function LicenseIssuer_checkLicense
this.LicenseIssuer_checkLicense_address=function() {
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_address__address');
	if(e!=null)
		var param__address = e.value;
	var res = self.instance.checkLicense(param__address);
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_address_res');
	if(res!=null && e!=null)
		e.innerText = res;
}
//function LicenseIssuer_changePaymentAddress
this.LicenseIssuer_changePaymentAddress_address=function() {
	var e = document.getElementById(self.prefix+'LicenseIssuer_changePaymentAddress_address__newPaymentAddress');
	if(e!=null)
		var param__newPaymentAddress = e.value;
	var res = self.instance.changePaymentAddress(param__newPaymentAddress);
}
//function LicenseIssuer_stopIssuing
this.LicenseIssuer_stopIssuing=function() {
	var res = self.instance.stopIssuing();
}
//function LicenseIssuer_buyLicense
this.LicenseIssuer_buyLicense_address_string=function() {
	var e = document.getElementById(self.prefix+'LicenseIssuer_buyLicense_address_string__address');
	if(e!=null)
		var param__address = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_buyLicense_address_string__name');
	if(e!=null)
		var param__name = e.value;
	var res = self.instance.buyLicense(param__address, param__name);
}

//delegated calls

}// end controller	


//class as GlueCode LicenseIssuerManager
//uses prefix + 'GuiContainer'
function LicenseIssuerManager(prefix,contract,containerId) {
	this.prefix = prefix;
	var self = this;
	this.c = new LicenseIssuerController();
	this.c.prefix=prefix;
	this.c.instance=contract;
	this.c.contractAddress = contract.address;
	this.g = new LicenseIssuerGuiFactory();
	this.g.prefix = prefix;
	this.containerId = containerId;

	this.addGui = function() {
		var e = document.getElementById(this.containerId);
		if(e==null)return;
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix +'LicenseIssuer_gui';
		e.appendChild(elemDiv);
		elemDiv.innerHTML = this.createGui(this.g);
		var e = document.getElementById(this.prefix+'LicenseIssuer_address');
		if(e!=null)
			e.value = this.c.contractAddress;
		this.c.bindGui();
	}	
	this.clearGui = function(){
		var e = document.getElementById(this.containerId);
		e.innerHTML ='';
	}
	this.createGui = function(guifactory){
		var txt ='';
		txt = txt + guifactory.createDefaultGui();
		return guifactory.createSeletonGui(txt);

	}
	this.createSmallGui = function(guifactory){
		var txt ='';
		txt = txt + guifactory.createAttributesGui();
		return guifactory.createSeletonGui(txt);

	}
	this.updateGui = function(){
		this.c._updateAttributes();
	}
	this.getContract = function(){
		return this.c.instance;
	}

//watch events
	this.watchEvents=function(){
	var event_LicenseIssued = contract.LicenseIssued({},{fromBlock: 0});
	event_LicenseIssued.watch(function(error,result){
	if(!error){
		var e = document.getElementById(self.eventlogPrefix+'eventLog');
		var elemDiv = document.createElement('div');
		elemDiv.id= result.blockNumber +'event';
		e.appendChild(elemDiv);
		//console.log(result.address+ 'eventLog'+result.blockHash+' '+result.blockNumber+' '+result.args.name+' '+result.args.succesful+' ');
		elemDiv.innerHTML = '<div>'
        +'<span>'+result.args.ownerAddress+'</span>'
        +'<span>'+result.args.name+'</span>'
        +'<span>'+result.args.succesful+'</span>'
		+ '</div>';
		}else
		console.log(error);	
	});
	}

}// end of manager

function LicenseIssuerGuiMananger(guiId){
	this.prefix = guiId;
	this.managers=new Array();	//[];		
	
	this.addManager = function(contract) {
		var m = new LicenseIssuerManager(contract.address,contract,this.prefix);
		m.watchEvents();
		this.managers.push(m);
		//manager.addGui();
	}
			
	this.clearGui = function(){
		var e = document.getElementById(this.prefix);
		if(e!==undefined)
			e.innerHTML ='';
	}
			
	this.displayGui = function(){
		var e = document.getElementById(this.prefix);
		if(e==undefined) return;
		for (i in this.managers) {
			var manager = this.managers[i] ;
			var elemDiv = document.createElement('div');
			elemDiv.id= manager.prefix + 'GuiContainer';//'LicenseIssuer_gui';
			e.appendChild(elemDiv);
			elemDiv.innerHTML = manager.createGui(manager.g);
		}
	}
	this.displaySimpleGui = function(){
		for (i in this.managers) {
			var manager = this.managers[i] ;
			manager.addGui();
		}
	}

	this.updateGui = function(){
		for (i in this.managers) {
			this.managers[i].updateGui();
		}
//		console.log('update');
	}
}// end of gui mananger

//Start of user code custom_LicenseIssuer_js
//TODO: implement
//End of user code
//the page Object fro the ContractsPage.
function ContractsPage(prefix) {
	this.prefix=prefix;
	//Start of user code page_contracts_attributes
	this.licensmanager = new LicenseManagerGuiMananger(prefix);
	this.licenseIssuers = new LicenseIssuerGuiMananger(prefix+'1');
	
	//End of user code

	
// default Gui
this.placeDefaultGui=function() {
this.createDefaultGui();

}
// default Gui
this.createDefaultGui=function() {
	//Start of user code page_Contracts_create_default_gui_functions
//	this.licensmanager.clearGui();
	this.licenseIssuers.displaySimpleGui();
	this.licenseIssuers.updateGui();
	this.licensmanager.displaySimpleGui();
	this.licensmanager.updateGui();
//	var txt = ''+this.licensmanager.g.createDefaultGui();
//	return txt;
	//End of user code
}
	//Start of user code page_Contracts_functions
		//TODO: implement
	//End of user code

}// end of ContractsPage
