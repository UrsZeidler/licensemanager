
var LicenseManagerContract = web3.eth.contract([
{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},
{"constant":true,"inputs":[],"name":"paymentAddress","outputs":[{"name":"","type":"address"}],"type":"function"},
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
{"constant":true,"inputs":[],"name":"licenseTextHash","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseUrl","outputs":[{"name":"","type":"string"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licencePrice","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseLifetime","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseCount","outputs":[{"name":"","type":"uint"}],"type":"function"},
{"constant":true,"inputs":[],"name":"issuable","outputs":[{"name":"","type":"bool"}],"type":"function"},
{"constant":true,"inputs":[],"name":"paymentAddress","outputs":[{"name":"","type":"address"}],"type":"function"},
{"constant":true,"inputs":[],"name":"licenseManager","outputs":[{"name":"","type":"address"}],"type":"function"},
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
//	console.log(this.prefix+' place gui');
	document.getElementById(this.prefix+'LicenseManager_gui').innerHTML = this.createDefaultGui();
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
}

// script for LicenseManager gui controller
function LicenseManagerController() {

	this.LicenseManager_instance = undefined;
	this.prefix='';
	this.contractAddress = undefined; 
	var self = this;

// bind buttons
	this.bindGui=function() {
		var btn = document.getElementById(self.prefix+'LicenseManagerController.setAddress');
//	console.log('bind:' + self.prefix+' '+btn);
		if(btn!=undefined)		
			btn.onclick = this.setAddress;

		var btn = document.getElementById(self.prefix+'LicenseManager_updateAttributes');
//		console.log('bind update:' + self.prefix+' '+btn);
		if(btn!=undefined)
			btn.onclick = this._updateAttributes;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address');
//		console.log('bind:LicenseManager_changePaymentAddress ' + self.prefix+' '+btn+'  '+self.LicenseManager_changePaymentAddress_address);//LicenseManager_changePaymentAddress);
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_changePaymentAddress_address;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint');
//		console.log('bind:LicenseManager_createIssuerContract ' + self.prefix+' '+btn+'  '+self.LicenseManager_createIssuerContract_string_string_string_uint_uint);//LicenseManager_createIssuerContract);
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_createIssuerContract_string_string_string_uint_uint;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_stopIssuing_uint');
//		console.log('bind:LicenseManager_stopIssuing ' + self.prefix+' '+btn+'  '+self.LicenseManager_stopIssuing_uint);//LicenseManager_stopIssuing);
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_stopIssuing_uint;
		var btn = document.getElementById(self.prefix+'LicenseManagerController.LicenseManager_changePaymentAddress_address_uint');
//		console.log('bind:LicenseManager_changePaymentAddress ' + self.prefix+' '+btn+'  '+self.LicenseManager_changePaymentAddress_address_uint);//LicenseManager_changePaymentAddress);
		if(btn!=undefined)
			btn.onclick = this.LicenseManager_changePaymentAddress_address_uint;
	}
	// set function
	this.setAddress=function() {
	var _address = document.getElementById(self.prefix+'LicenseManager_address');
//	console.log('setAddress:' + self.prefix+' '+_address);
	self.LicenseManager_instance = LicenseManagerContract.at(_address.value);
	self.contractAddress = _address.value;
	self._updateAttributes();
}
//update attributes
this._updateAttributes=function () {
if(this.LicenseManager_instance===null) return;
//console.log('updateAttributes:' + self.prefix);
// update attributes
	var owner_res = self.LicenseManager_instance.owner();
//	console.log('get:owner' + self.prefix);

	if(owner_res!=null)
		document.getElementById(self.prefix+'LicenseManager_owner_value').innerText = owner_res;
	var issuerName_res = self.LicenseManager_instance.issuerName();
//	console.log('get:issuerName' + self.prefix);

	if(issuerName_res!=null)
		document.getElementById(self.prefix+'LicenseManager_issuerName_value').innerText = issuerName_res;
	var contractCount_res = self.LicenseManager_instance.contractCount();
//	console.log('get:contractCount' + self.prefix);

	if(contractCount_res!=null)
		document.getElementById(self.prefix+'LicenseManager_contractCount_value').innerText = contractCount_res;
//console.log('getStruct:contracts' + self.prefix);
	var _key = document.getElementById(self.prefix+'LicenseManager_contract_attribute_contracts_input').value;
	var contracts_res = self.LicenseManager_instance.contracts(_key);
//console.log('result:contracts' + contracts_res+' key: '+_key);
	if(contracts_res!=null){
		document.getElementById(self.prefix+'LicenseManager_contracts_value').innerText = contracts_res;
	}
}

//call functions
//function LicenseManager_changePaymentAddress
this.LicenseManager_changePaymentAddress_address=function() {
//console.log('function:changePaymentAddress' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address__newPaymentAdress');
//	console.log(':' + self.prefix+'LicenseManager_changePaymentAddress_address__newPaymentAdress'+": "+e);
	var param__newPaymentAdress = e.value;
//	console.log(':' +self.LicenseManager_instance+':');
	var res = self.LicenseManager_instance.changePaymentAddress(param__newPaymentAdress);
}
//function LicenseManager_createIssuerContract
this.LicenseManager_createIssuerContract_string_string_string_uint_uint=function() {
//console.log('function:createIssuerContract' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName');
//	console.log(':' + self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName'+": "+e);
	var param_itemName = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash');
//	console.log(':' + self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash'+": "+e);
	var param_textHash = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_url');
//	console.log(':' + self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_url'+": "+e);
	var param_url = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime');
//	console.log(':' + self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime'+": "+e);
	var param_lifeTime = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_price');
//	console.log(':' + self.prefix+'LicenseManager_createIssuerContract_string_string_string_uint_uint_price'+": "+e);
	var param_price = e.value;
//	console.log(':' +self.LicenseManager_instance+':');
	var res = self.LicenseManager_instance.createIssuerContract(param_itemName, param_textHash, param_url, param_lifeTime, param_price);
}
//function LicenseManager_stopIssuing
this.LicenseManager_stopIssuing_uint=function() {
//console.log('function:stopIssuing' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseManager_stopIssuing_uint_licenseId');
//	console.log(':' + self.prefix+'LicenseManager_stopIssuing_uint_licenseId'+": "+e);
	var param_licenseId = e.value;
//	console.log(':' +self.LicenseManager_instance+':');
	var res = self.LicenseManager_instance.stopIssuing(param_licenseId);
}
//function LicenseManager_changePaymentAddress
this.LicenseManager_changePaymentAddress_address_uint=function() {
//console.log('function:changePaymentAddress' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address_uint__newPaymentAddress');
//	console.log(':' + self.prefix+'LicenseManager_changePaymentAddress_address_uint__newPaymentAddress'+": "+e);
	var param__newPaymentAddress = e.value;
	var e = document.getElementById(self.prefix+'LicenseManager_changePaymentAddress_address_uint_licenseId');
//	console.log(':' + self.prefix+'LicenseManager_changePaymentAddress_address_uint_licenseId'+": "+e);
	var param_licenseId = e.value;
//	console.log(':' +self.LicenseManager_instance+':');
	var res = self.LicenseManager_instance.changePaymentAddress(param__newPaymentAddress, param_licenseId);
}

//delegated calls

}	


// script for LicenseManager
function LicenseManagerModel(prefix) {
	this.prefix = prefix;
	this.guiFactory = new LicenseManagerGuiFactory();
	this.controller = new LicenseManagerController();
	this.guiFactory.prefix = prefix;
	this.controller.prefix = prefix;
}
LicenseManagerModel.prototype.create=function () {
	this.guiFactory.placeDefaultGui();
	this.controller._updateAttributes();
}


//class as GlueCode
//uses prefix + 'GuiContainer'
function LicenseManagerManager(prefix,contract) {
	this.prefix = prefix;
	var self = this;
	this.c = new LicenseManagerController();
	this.c.prefix=prefix;
	this.c.LicenseManager_instance=contract;
	this.c.contractAddress = contract.address;
	this.g = new LicenseManagerGuiFactory();
	this.g.prefix = prefix;

	this.addGui = function() {
		var e = document.getElementById(this.prefix + 'GuiContainer');
//console.log('addGui:' + this.prefix+ 'GuiContainer'+e);
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix +'LicenseManager_gui';
		e.appendChild(elemDiv);
		this.g.placeDefaultGui();
		document.getElementById(this.prefix+'LicenseManager_address').value = this.c.contractAddress;
		this.c.bindGui();
	}	
	this.clearGui = function(){
		var e = document.getElementById(this.prefix + 'GuiContainer');
		e.innerHTML ='';
	}
	this.updateGui = function(){
		this.c._updateAttributes();
	}
	this.getContract = function(){
		return this.c.LicenseManager_instance;
	}

}

function LicenseManagerGuiMananger(guiId){
	this.prefix = guiId;
	this.managers=new Array();	//[];		
	
	this.addManager = function(contract) {
//console.log('addManager:'+contract);
		var m = new LicenseManagerManager(contract.address,contract);
		this.managers.push(m);
		//manager.addGui();
	}
			
	this.clearGui = function(){
		var e = document.getElementById(this.prefix);
//console.log('clear gui:'+this.prefix+e);
		if(e!==undefined)
			e.innerHTML ='';
	}
			
	this.displayGui = function(){
		var e = document.getElementById(this.prefix);
//console.log('displayGui:'+this.prefix +e);
		if(e==undefined) return;
		for (i in this.managers) {
			var elemDiv = document.createElement('div');
			elemDiv.id= this.managers[i].prefix + 'GuiContainer';//'LicenseManager_gui';
			e.appendChild(elemDiv);
//console.log('add:'+elemDiv.id);
			this.managers[i].addGui();
		}
	}

	this.updateGui = function(){
		for (i in this.managers) {
			this.managers[i].updateGui();
		}
//		console.log('update');
	}
}
//gui factory LicenseIssuer
function LicenseIssuerGuiFactory() {
	this.prefix='';
	
// default Gui
this.placeDefaultGui=function() {
//	console.log(this.prefix+' place gui');
	document.getElementById(this.prefix+'LicenseIssuer_gui').innerHTML = this.createDefaultGui();
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
}

// script for LicenseIssuer gui controller
function LicenseIssuerController() {

	this.LicenseIssuer_instance = undefined;
	this.prefix='';
	this.contractAddress = undefined; 
	var self = this;

// bind buttons
	this.bindGui=function() {
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.setAddress');
//	console.log('bind:' + self.prefix+' '+btn);
		if(btn!=undefined)		
			btn.onclick = this.setAddress;

		var btn = document.getElementById(self.prefix+'LicenseIssuer_updateAttributes');
//		console.log('bind update:' + self.prefix+' '+btn);
		if(btn!=undefined)
			btn.onclick = this._updateAttributes;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32');
//		console.log('bind:LicenseIssuer_checkLicense ' + self.prefix+' '+btn+'  '+self.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32);//LicenseIssuer_checkLicense);
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_checkLicense_address');
//		console.log('bind:LicenseIssuer_checkLicense ' + self.prefix+' '+btn+'  '+self.LicenseIssuer_checkLicense_address);//LicenseIssuer_checkLicense);
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_checkLicense_address;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address');
//		console.log('bind:LicenseIssuer_changePaymentAddress ' + self.prefix+' '+btn+'  '+self.LicenseIssuer_changePaymentAddress_address);//LicenseIssuer_changePaymentAddress);
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_changePaymentAddress_address;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_stopIssuing');
//		console.log('bind:LicenseIssuer_stopIssuing ' + self.prefix+' '+btn+'  '+self.LicenseIssuer_stopIssuing);//LicenseIssuer_stopIssuing);
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_stopIssuing;
		var btn = document.getElementById(self.prefix+'LicenseIssuerController.LicenseIssuer_buyLicense_address_string');
//		console.log('bind:LicenseIssuer_buyLicense ' + self.prefix+' '+btn+'  '+self.LicenseIssuer_buyLicense_address_string);//LicenseIssuer_buyLicense);
		if(btn!=undefined)
			btn.onclick = this.LicenseIssuer_buyLicense_address_string;
	}
	// set function
	this.setAddress=function() {
	var _address = document.getElementById(self.prefix+'LicenseIssuer_address');
//	console.log('setAddress:' + self.prefix+' '+_address);
	self.LicenseIssuer_instance = LicenseIssuerContract.at(_address.value);
	self.contractAddress = _address.value;
	self._updateAttributes();
}
//update attributes
this._updateAttributes=function () {
if(this.LicenseIssuer_instance===null) return;
//console.log('updateAttributes:' + self.prefix);
// update attributes
	var licensedItemName_res = self.LicenseIssuer_instance.licensedItemName();
//	console.log('get:licensedItemName' + self.prefix);

	if(licensedItemName_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licensedItemName_value').innerText = licensedItemName_res;
	var licenseManager_res = self.LicenseIssuer_instance.licenseManager();
//	console.log('get:licenseManager' + self.prefix);

	if(licenseManager_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licenseManager_value').innerText = licenseManager_res;
	var licenseTextHash_res = self.LicenseIssuer_instance.licenseTextHash();
//	console.log('get:licenseTextHash' + self.prefix);

	if(licenseTextHash_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licenseTextHash_value').innerText = licenseTextHash_res;
	var licenseUrl_res = self.LicenseIssuer_instance.licenseUrl();
//	console.log('get:licenseUrl' + self.prefix);

	if(licenseUrl_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licenseUrl_value').innerText = licenseUrl_res;
	var licencePrice_res = self.LicenseIssuer_instance.licencePrice();
//	console.log('get:licencePrice' + self.prefix);

	if(licencePrice_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licencePrice_value').innerText = licencePrice_res;
	var licenseLifetime_res = self.LicenseIssuer_instance.licenseLifetime();
//	console.log('get:licenseLifetime' + self.prefix);

	if(licenseLifetime_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licenseLifetime_value').innerText = licenseLifetime_res;
	var licenseCount_res = self.LicenseIssuer_instance.licenseCount();
//	console.log('get:licenseCount' + self.prefix);

	if(licenseCount_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_licenseCount_value').innerText = licenseCount_res;
	var issuable_res = self.LicenseIssuer_instance.issuable();
//	console.log('get:issuable' + self.prefix);

	if(issuable_res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_issuable_value').innerText = issuable_res;
//console.log('getStruct:issuedLicenses' + self.prefix);
	var _key = document.getElementById(self.prefix+'LicenseIssuer_contract_attribute_issuedLicenses_input').value;
	var issuedLicenses_res = self.LicenseIssuer_instance.issuedLicenses(_key);
//console.log('result:issuedLicenses' + issuedLicenses_res+' key: '+_key);
	if(issuedLicenses_res!=null){
		document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerAdress_value').innerText = issuedLicenses_res[0];
		document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_licenseOwnerName_value').innerText = issuedLicenses_res[1];
		document.getElementById(self.prefix+'LicenseIssuer_issuedLicenses_issuedDate_value').innerText = issuedLicenses_res[2];
	}
//console.log('getStruct:licenseOwners' + self.prefix);
	var _key = document.getElementById(self.prefix+'LicenseIssuer_contract_attribute_licenseOwners_input').value;
	var licenseOwners_res = self.LicenseIssuer_instance.licenseOwners(_key);
//console.log('result:licenseOwners' + licenseOwners_res+' key: '+_key);
	if(licenseOwners_res!=null){
		document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_licenseOwnerAdress_value').innerText = licenseOwners_res[0];
		document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_licenseOwnerName_value').innerText = licenseOwners_res[1];
		document.getElementById(self.prefix+'LicenseIssuer_licenseOwners_issuedDate_value').innerText = licenseOwners_res[2];
	}
}

//call functions
//function LicenseIssuer_checkLicense
this.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32=function() {
//console.log('function:checkLicense' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash');
//	console.log(':' + self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash'+": "+e);
	var param_factHash = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v');
//	console.log(':' + self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v'+": "+e);
	var param_v = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r');
//	console.log(':' + self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r'+": "+e);
	var param_sig_r = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s');
//	console.log(':' + self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s'+": "+e);
	var param_sig_s = e.value;
//	console.log(':' +self.LicenseIssuer_instance+':');
	var res = self.LicenseIssuer_instance.checkLicense(param_factHash, param_v, param_sig_r, param_sig_s);
	if(res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_res').innerText = res;
}
//function LicenseIssuer_checkLicense
this.LicenseIssuer_checkLicense_address=function() {
//console.log('function:checkLicense' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseIssuer_checkLicense_address__address');
//	console.log(':' + self.prefix+'LicenseIssuer_checkLicense_address__address'+": "+e);
	var param__address = e.value;
//	console.log(':' +self.LicenseIssuer_instance+':');
	var res = self.LicenseIssuer_instance.checkLicense(param__address);
	if(res!=null)
		document.getElementById(self.prefix+'LicenseIssuer_checkLicense_address_res').innerText = res;
}
//function LicenseIssuer_changePaymentAddress
this.LicenseIssuer_changePaymentAddress_address=function() {
//console.log('function:changePaymentAddress' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseIssuer_changePaymentAddress_address__newPaymentAddress');
//	console.log(':' + self.prefix+'LicenseIssuer_changePaymentAddress_address__newPaymentAddress'+": "+e);
	var param__newPaymentAddress = e.value;
//	console.log(':' +self.LicenseIssuer_instance+':');
	var res = self.LicenseIssuer_instance.changePaymentAddress(param__newPaymentAddress);
}
//function LicenseIssuer_stopIssuing
this.LicenseIssuer_stopIssuing=function() {
//console.log('function:stopIssuing' + self.prefix);
//	console.log(':' +self.LicenseIssuer_instance+':');
	var res = self.LicenseIssuer_instance.stopIssuing();
}
//function LicenseIssuer_buyLicense
this.LicenseIssuer_buyLicense_address_string=function() {
//console.log('function:buyLicense' + self.prefix);
	var e = document.getElementById(self.prefix+'LicenseIssuer_buyLicense_address_string__address');
//	console.log(':' + self.prefix+'LicenseIssuer_buyLicense_address_string__address'+": "+e);
	var param__address = e.value;
	var e = document.getElementById(self.prefix+'LicenseIssuer_buyLicense_address_string__name');
//	console.log(':' + self.prefix+'LicenseIssuer_buyLicense_address_string__name'+": "+e);
	var param__name = e.value;
//	console.log(':' +self.LicenseIssuer_instance+':');
	var res = self.LicenseIssuer_instance.buyLicense(param__address, param__name);
}

//delegated calls

}	


// script for LicenseIssuer
function LicenseIssuerModel(prefix) {
	this.prefix = prefix;
	this.guiFactory = new LicenseIssuerGuiFactory();
	this.controller = new LicenseIssuerController();
	this.guiFactory.prefix = prefix;
	this.controller.prefix = prefix;
}
LicenseIssuerModel.prototype.create=function () {
	this.guiFactory.placeDefaultGui();
	this.controller._updateAttributes();
}


//class as GlueCode
//uses prefix + 'GuiContainer'
function LicenseIssuerManager(prefix,contract) {
	this.prefix = prefix;
	var self = this;
	this.c = new LicenseIssuerController();
	this.c.prefix=prefix;
	this.c.LicenseIssuer_instance=contract;
	this.c.contractAddress = contract.address;
	this.g = new LicenseIssuerGuiFactory();
	this.g.prefix = prefix;

	this.addGui = function() {
		var e = document.getElementById(this.prefix + 'GuiContainer');
//console.log('addGui:' + this.prefix+ 'GuiContainer'+e);
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix +'LicenseIssuer_gui';
		e.appendChild(elemDiv);
		this.g.placeDefaultGui();
		document.getElementById(this.prefix+'LicenseIssuer_address').value = this.c.contractAddress;
		this.c.bindGui();
	}	
	this.clearGui = function(){
		var e = document.getElementById(this.prefix + 'GuiContainer');
		e.innerHTML ='';
	}
	this.updateGui = function(){
		this.c._updateAttributes();
	}
	this.getContract = function(){
		return this.c.LicenseIssuer_instance;
	}

}

function LicenseIssuerGuiMananger(guiId){
	this.prefix = guiId;
	this.managers=new Array();	//[];		
	
	this.addManager = function(contract) {
//console.log('addManager:'+contract);
		var m = new LicenseIssuerManager(contract.address,contract);
		this.managers.push(m);
		//manager.addGui();
	}
			
	this.clearGui = function(){
		var e = document.getElementById(this.prefix);
//console.log('clear gui:'+this.prefix+e);
		if(e!==undefined)
			e.innerHTML ='';
	}
			
	this.displayGui = function(){
		var e = document.getElementById(this.prefix);
//console.log('displayGui:'+this.prefix +e);
		if(e==undefined) return;
		for (i in this.managers) {
			var elemDiv = document.createElement('div');
			elemDiv.id= this.managers[i].prefix + 'GuiContainer';//'LicenseIssuer_gui';
			e.appendChild(elemDiv);
//console.log('add:'+elemDiv.id);
			this.managers[i].addGui();
		}
	}

	this.updateGui = function(){
		for (i in this.managers) {
			this.managers[i].updateGui();
		}
//		console.log('update');
	}
}
