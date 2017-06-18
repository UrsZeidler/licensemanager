package de.urszeidler.ethereum.licencemanager1.contracts;

import java.util.concurrent.CompletableFuture;
import org.adridadou.ethereum.propeller.values.EthAddress;

//Start of user code customized_imports

//End of user code


/**
* The licensmanager creates an issuer contract and holds the payment address.
**/
public interface LicenseManager{
	
	org.adridadou.ethereum.propeller.values.EthAddress owner();
	
	org.adridadou.ethereum.propeller.values.EthAddress paymentAddress();
	
	String issuerName();
	
	Integer contractCount();
	
	org.adridadou.ethereum.propeller.values.EthAddress contracts(Integer key);

	/**
	* Change the address which receive the payment for an issued license. Only new issued licenses are affected.
	* 
	* @param _newPaymentAdress -
	**/
	java.util.concurrent.CompletableFuture<Void> changePaymentAddress(org.adridadou.ethereum.propeller.values.EthAddress _newPaymentAdress);
	/**
	* Create a new licenseissuer contract.
	* The price is in finney.
	* 
	* @param itemName -
	* @param textHash -
	* @param url -
	* @param lifeTime -
	* @param price -
	**/
	java.util.concurrent.CompletableFuture<Void> createIssuerContract(String itemName,String textHash,String url,Integer lifeTime,Integer price);
	/**
	* Stopps the licence issuer from issue any more licences.
	* 
	* @param licenseId -
	**/
	java.util.concurrent.CompletableFuture<Void> stopIssuing(Integer licenseId);
	/**
	* Change the address which receive the payment for an issued license for a specific license issuer. 
	* 
	* @param _newPaymentAddress -
	* @param licenseId -
	**/
	java.util.concurrent.CompletableFuture<Void> changePaymentAddress(org.adridadou.ethereum.propeller.values.EthAddress _newPaymentAddress,Integer licenseId);
	
	java.util.concurrent.CompletableFuture<Void> changeOwner(org.adridadou.ethereum.propeller.values.EthAddress _newOwner);

	//Start of user code additional_methods

	//End of user code
}
