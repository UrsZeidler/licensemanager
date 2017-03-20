package de.urszeidler.ethereum.licencemanager1.contracts;

import java.util.concurrent.CompletableFuture;
import org.adridadou.ethereum.values.EthAddress;

//Start of user code customized_imports

//End of user code


/**
* The license issuer is a contract containing the description of a particular license.
* It grands a license to an address by receiving the fund and holds a register of the 
* issued licenses.
**/
public interface LicenseIssuer{
	
	String licensedItemName();
	
	String licenseTextHash();
	
	String licenseUrl();
	
	java.math.BigInteger licencePrice();
	
	Integer licenseLifetime();
	
	Integer licenseCount();
	
	Boolean issuable();
	
	org.adridadou.ethereum.values.EthAddress paymentAddress();
	/**
	* The address which manange the contract.
	**/
	org.adridadou.ethereum.values.EthAddress licenseManager();
	
	LicenseIssuerIssuedLicense issuedLicenses(Integer key);
	
	LicenseIssuerIssuedLicense licenseOwners(org.adridadou.ethereum.values.EthAddress key);

	/**
	* Check the liceses by a given signature.
	* 
	* @param factHash -
	* @param v -
	* @param sig_r -
	* @param sig_s -
	* @return
	*  -
	**/
	Boolean checkLicense(Byte[] factHash,Integer v,Byte[] sig_r,Byte[] sig_s);
	/**
	* Simply lookup the license and check if it is still valid.
	* 
	* @param _address -
	* @return
	*  -
	**/
	Boolean checkLicense(org.adridadou.ethereum.values.EthAddress _address);
	/**
	* Change the payment address.
	* 
	* @param _newPaymentAddress -
	**/
	java.util.concurrent.CompletableFuture<Void> changePaymentAddress(org.adridadou.ethereum.values.EthAddress _newPaymentAddress);
	/**
	* Stop accecpting buying a license.
	**/
	java.util.concurrent.CompletableFuture<Void> stopIssuing();
	/**
	* Issue a license for the item by sending the address data and the amount of money.
	* 
	* @param _address -
	* @param _name -
	**/
	org.adridadou.ethereum.values.Payable<Void> buyLicense(org.adridadou.ethereum.values.EthAddress _address,String _name);

	Boolean getIssuable();

	//Start of user code additional_methods

	//End of user code
}
