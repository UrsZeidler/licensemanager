//gui factory LicenseManager
function LicenseManagerGuiFactory1(licenseManager, contract) {
	this.prefix = '';
	this.lm = licenseManager;
	this.issuerContracts = [];
	this.contractData = [];
	this.issuerName = licenseManager.issuerName();
	this.issuerContractDefinition = contract;
	this.mode = 'issue';// 'manage'//'issue'

	// reads the data from contract
	this.readDataFromContract = function() {
		this.contractData = [];
		this.issuerContracts = [];
		var cc = this.lm.contractCount();
		for (i = 0; i < cc; i++) {
			var b = this.lm.contracts(i);
			var lic = this.issuerContractDefinition.at(b);
			this.issuerContracts.push(lic);

			data = [ lic.address, lic.licensedItemName(), lic.licenseTextHash(),
			         lic.licenseUrl(), lic.licencePrice(), lic.licenseLifetime(),
			         lic.licenseCount(), lic.issuable() ]

			this.contractData.push(data);
			//add eventlistner
			var licenseIssued = lic.LicenseIssued({},{fromBlock: 1});
			licenseIssued.watch(function(error,result){
				if(!error){
					console.log(result);
				}
			});
		}
	}

	
	
	this.licenceIssueerDataGui = function(prefix, itemName, licenseHash, licenseUrl,
			licencePrice, lifeTime, licenseCount, issuable, index) {
		return '	  <div class="contract_attributes " id="'
				+ prefix
				+ 'LicenseIssuer_contract_attributes">'
				+ '	    <div class="contract_attribute " id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licensedItemName"> licensedItemName:'
				+ '	      <div class="contract_attribute_value " id="'
				+ prefix
				+ 'LicenseIssuer_licensedItemName_value">'
				+ itemName
				+ '</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute " id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licenseTextHash"> licenseTextHash:'
				+ '	      <div class="contract_attribute_value" id="'
				+ prefix
				+ 'LicenseIssuer_licenseTextHash_value">'
				+ licenseHash
				+ '</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute" id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licenseUrl"> licenseUrl:'
				+ '	      <div class="contract_attribute_value" id="'
				+ prefix
				+ 'LicenseIssuer_licenseUrl_value">'
				+ licenseUrl
				+ '</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute" id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licencePrice"> licencePrice:'
				+ '	      <div class="contract_attribute_value" id="'
				+ prefix
				+ 'LicenseIssuer_licencePrice_value">'
				+ Number(web3.fromWei(licencePrice, "finney"))
				+ ' finney</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute" id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licenseLifetime"> licenseLifetime:'
				+ '	      <div class="contract_attribute_value" id="'
				+ prefix
				+ 'LicenseIssuer_licenseLifetime_value">'
				+ lifeTime
				+ '</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute" id="'
				+ prefix
				+ 'LicenseIssuer_contract_attribute_licenseCount"> licenseCount:'
				+ '	      <div class="contract_attribute_value" id="' + prefix
				+ 'LicenseIssuer_licenseCount_value">' + licenseCount
				+ '</div>' + '	    </div>'
				+ '	    <div class="contract_attribute" id="' + prefix
				+ 'LicenseIssuer_contract_attribute_issuable"> issuable:'
				+ '	      <div class="contract_attribute_value" id="' + prefix
				+ 'LicenseIssuer_issuable_value">' + issuable + '</div></div>'

	}

	this.createSubObjects = function() {
		var txt = '';

		for (i = 0; i < this.issuerContracts.length; i++) {
			var sb = this.issuerContracts[i];

			d = this.contractData[i];
			txt = txt
					+ this.licenceIssueerDataGui(d[0], d[1], d[2], d[3], d[4], d[5],
							d[6], d[7], d[8], i);
			if (this.mode === 'issue')
				txt = txt + this.issuerActions(i, d[0]);
			else
				txt = txt + this.managerActions(i, d[0]);

		}
		return txt;
	}

	// default Gui
	this.placeDefaultGui = function() {
		console.log(this.prefix + ' place gui');
		document.getElementById(this.prefix + 'LicenseManager_gui1').innerHTML = this
				.createDefaultGui();
	}

	this.issuerActions = function(index, prefix) {
		return '' + '	  <div class="function_execution" id="'
				+ prefix
				+ 'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32">'
				+ 'CheckLicense by a signed message :'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">factHash</div> <input class="col col-3-4"  type="textArea" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_factHash"/></div>'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">v</div>         <input class="col col-3-4" type="number" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_v"/></div>'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">sig_r</div>     <input class="col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_r"/></div>'
				+ '		  <div class="function_parameter row clear"><div class="col col-1-4 function_parameter_name">sig_s</div>     <input class="col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_sig_s"/></div>'
				+ '		<button class="dapp-block-button function_button" id="'
				+ prefix
				+ 'LicenseIssuerController.LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32" onclick="'
				+ 'checkLicense_bytes32_uint8_bytes32_bytes32('
				+ index
				+ ',\''
				+ prefix
				+ '\')">check License</button>'
				+ '		<div class="function_result" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_bytes32_uint8_bytes32_bytes32_res"></div>'
				+ '	  </div>'
				+ '	  <div class="function_execution" id="'
				+ prefix
				+ 'LicenseIssuer_contract_function_LicenseIssuer_checkLicense_address">'
				+ 'CheckLicense by address:'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">address</div><input class="dapp-address-input col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_address__address"></div>'
				+ '		<button class="dapp-block-button function_button"id="'
				+ prefix
				+ 'LicenseIssuerController.LicenseIssuer_checkLicense_address" onclick="checkLicense_address('
				+ index
				+ ',\''
				+ prefix
				+ '\' )">check License</button>'
				+ '		<div class="function_result" id="'
				+ prefix
				+ 'LicenseIssuer_checkLicense_address_res"></div>'
				+ '	  </div>'
				+ '	  <div class="function_execution" id="'
				+ prefix
				+ 'LicenseIssuer_contract_function_LicenseIssuer_buyLicense_address_string">'
				+ 'Buy a license for an address, when you define no address the address of the sender is used.'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">address</div><input class="dapp-address-input col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_buyLicense_address_string__address"></div>'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">name</div><input class="col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_buyLicense_address_string__name"></div>'
				+ '		<button class="dapp-block-button function_button" id="'
				+ prefix
				+ 'LicenseIssuerController.LicenseIssuer_buyLicense_address_string" onclick="'
				+ 'buyLicense(' + index + ',\'' + prefix
				+ '\')">buy License</button>'
				+ '		<div class="function_result" id="' + prefix
				+ 'LicenseIssuer_buyLicense_address_string_res"></div>'
				+ '	  </div>';

	}

	this.managerActions = function(index, prefix) {
		return '	  <div class="function_execution" id="'
				+ prefix
				+ 'LicenseIssuer_contract_function_LicenseIssuer_changePaymentAddress_address">'
				+ 'ChangePaymentAddress:'
				+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">new payment address</div><input class="col col-3-4" type="text" id="'
				+ prefix
				+ 'LicenseIssuer_changePaymentAddress_address__newPaymentAddress"></div>'
				+ '		<button class="dapp-block-button function_button"id="'
				+ prefix
				+ 'LicenseIssuerController.LicenseIssuer_changePaymentAddress_address" onclick="changePaymentAddress('
				+ index
				+ ',\''
				+ prefix
				+ '\')">change Payment Address</button>'
				+ '		<div class="function_result" id="'
				+ prefix
				+ 'LicenseIssuer_changePaymentAddress_address_res"></div>'
				+ '	  </div>'
				+ '	  <div class="function_execution" id="'
				+ prefix
				+ 'LicenseIssuer_contract_function_LicenseIssuer_stopIssuing">'
				+ 'StopIssuing:'
				+ '		<button class="dapp-block-button function_button"id="'
				+ prefix
				+ 'LicenseIssuerController.LicenseIssuer_stopIssuing" onclick="'
				+ 'stopIssuing(' + index + ',\'' + prefix
				+ '\')">stop Issuing</button>'
				+ '		<div class="function_result" id="' + prefix
				+ 'LicenseIssuer_stopIssuing_res"></div>' + '	  </div>';
	}

	// default Gui
	this.createDefaultGui = function() {
		return '	<div class="contract" id="'
				+ this.prefix
				+ 'LicenseManager_contract">'
				+ '	LicenseManager:'
				+ '	  <div class="contract_attributes" id="'
				+ this.prefix
				+ 'LicenseManager_contract_attributes">'
				+ '	    <div class="contract_attribute" id="'
				+ this.prefix
				+ 'LicenseManager_contract_attribute_issuerName"> issuerName:'
				+ '	      <div class="contract_attribute_value " id="'
				+ this.prefix
				+ 'LicenseManager_issuerName_value">'
				+ this.issuerName
				+ '</div>'
				+ '	    </div>'
				+ '	    <div class="contract_attribute " id="'
				+ this.prefix
				+ 'LicenseManager_contract_attribute_contractCount"> contractCount:'
				+ '	      <div class="contract_attribute_value " id="'
				+ this.prefix + 'LicenseManager_contractCount_value">'
				+ this.issuerContracts.length + '</div>' + '	    </div>'
				+ this.managerAction() + '	  </div>' + this.createSubObjects()
				+ '	</div>';
	}

	this.managerAction = function() {
		var txt = '';
		if (this.mode !== 'issue') {
			txt = '	  <div class="function_execution" id="'
					+ this.prefix
					+ 'LicenseManager_contract_function_LicenseManager_createIssuerContract_string_string_string_uint_uint">'
					+ 'Create IssuerContract. Create a new issuer contract.'
					+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">itemName</div><input class="col col-3-4" type="text" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_itemName"></div>'
					+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">textHash</div><input class="col col-3-4" type="text" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_textHash"></div>'
					+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">url</div><input class="col col-3-4" type="text" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_url"></div>'
					+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">lifeTime</div><input class="col col-3-4" type="number" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_lifeTime"></div>'
					+ '		  <div class="function_parameter row clear "><div class="col col-1-4 function_parameter_name">price in finney</div><input class="col col-3-4" type="number" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_price"></div>'
					+ '		<button class="dapp-block-button function_button"id="'
					+ this.prefix
					+ 'LicenseManagerController.LicenseManager_createIssuerContract_string_string_string_uint_uint" onclick="createIssuerContract(\''
					+ this.prefix
					+ '\')">create Issuer Contract</button>'
					+ '		<div class="function_result" id="'
					+ this.prefix
					+ 'LicenseManager_createIssuerContract_string_string_string_uint_uint_res"></div>'
					+ '	  </div>'
		}
		return txt;
	}

	this.changeMode = function(mode) {
		console.log('change mode to ' + mode);
		this.mode = mode;
		document.getElementById(this.prefix + 'LicenseManager_gui1').innerHTML = '';
		this.placeDefaultGui();
		// for testing
		if (this.mode === 'issue')
			web3.eth.defaultAccount = web3.eth.accounts[1];
		else
			web3.eth.defaultAccount = web3.eth.accounts[0];

		console.log(web3.eth.defaultAccount);
	}
}
