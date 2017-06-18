package de.urszeidler.ethereum.licencemanager1.contracts;

import static org.junit.Assert.*;

import java.io.File;
import java.math.BigInteger;
import java.util.concurrent.CompletableFuture;

import org.adridadou.ethereum.propeller.solidity.SolidityContractDetails;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.SoliditySource;
import org.junit.Before;
import org.junit.Test;

import de.urszeidler.ethereum.licencemanager1.AbstractContractTest;
// Start of user code LicenseManagerTest.customImports
import de.urszeidler.ethereum.licencemanager1.deployer.ContractsDeployer;

// End of user code


/**
 * Test for the LicenseManager contract.
 *
 */
public class LicenseManagerTest extends AbstractContractTest{

 
	private LicenseManager fixture;
	// Start of user code LicenseManagerTest.attributes
	private ContractsDeployer deployer;
	// End of user code

	@Override
	protected String getContractName() {
		return "LicenseManager";
	}

	@Override
	protected String getQuallifiedContractName() {
		return "contracts.sol:LicenseManager";
	}

	/**
	 * Read the contract from the file and deploys the contract code.
	 * @throws Exception
	 */
	@Before
	public void prepareTest() throws Exception {
		//Start of user code prepareTest
        File contractSrc = new File(this.getClass().getResource("/contracts/contracts.sol").toURI());
        contractSource = SoliditySource.from(contractSrc);
        deployer = new ContractsDeployer(ethereum,"/contracts/combined.json",true);
        
		createFixture();
		//End of user code
	}


	/**
	 * Create a new fixture by deploying the contract source.
	 * @throws Exception
	 */
	protected void createFixture() throws Exception {
		//Start of user code createFixture
		SolidityContractDetails compiledContract = getCompiledContract("/contracts/combined.json");
		EthAddress _paymentAddress = senderAddress;
		String _name = "_name";
        CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender
				, _paymentAddress, _name);
        fixtureAddress = address.get();
		setFixture(ethereum.createContractProxy(compiledContract, fixtureAddress, sender, LicenseManager.class));
		//End of user code
	}

	protected void setFixture(LicenseManager f) {
		this.fixture = f;
	}


	/**
	 * Test method for  changePaymentAddress(org.adridadou.ethereum.propeller.values.EthAddress _newPaymentAdress).
	 * see {@link LicenseManager#changePaymentAddress( org.adridadou.ethereum.propeller.values.EthAddress)}
	 * @throws Exception
	 */
	@Test
	public void testChangePaymentAddress_address() throws Exception {
		//Start of user code testChangePaymentAddress_address
		assertEquals(senderAddress, fixture.owner());
		assertEquals(senderAddress, fixture.paymentAddress());
		fixture.changePaymentAddress(fixtureAddress).get();
//		assertEquals(fixtureAddress, fixture.paymentAddress());
		//End of user code
	}
	/**
	 * Test method for  createIssuerContract(String itemName,String textHash,String url,Integer lifeTime,Integer price).
	 * see {@link LicenseManager#createIssuerContract( String, String, String, Integer, Integer)}
	 * @throws Exception
	 */
	@Test
	public void testCreateIssuerContract_string_string_string_uint_uint() throws Exception {
		//Start of user code testCreateIssuerContract_string_string_string_uint_uint
		String itemName = "itemname";
		String textHash = "text hash";
		String url = "url";
		Integer lifeTime = 10;
		Integer price = 1;
		fixture.createIssuerContract(itemName , textHash, url, lifeTime, price).get();
		
		assertEquals(1, fixture.contractCount().intValue());		
		EthAddress address = fixture.contracts(0);
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, address);
		
		assertEquals(itemName, licenseIssuer.licensedItemName());
		assertEquals(textHash, licenseIssuer.licenseTextHash());
		assertEquals(url, licenseIssuer.licenseUrl());
		assertEquals(lifeTime, licenseIssuer.licenseLifetime());
		assertEquals(BigInteger.valueOf(1000000000000000L), licenseIssuer.licencePrice());
		assertEquals(true, licenseIssuer.getIssuable());
		assertEquals(true, licenseIssuer.issuable());
		assertEquals(senderAddress, licenseIssuer.paymentAddress());
		assertEquals(fixtureAddress, licenseIssuer.licenseManager());
		//End of user code
	}
	/**
	 * Test method for  stopIssuing(Integer licenseId).
	 * see {@link LicenseManager#stopIssuing( Integer)}
	 * @throws Exception
	 */
	@Test
	public void testStopIssuing_uint() throws Exception {
		//Start of user code testStopIssuing_uint
		testCreateIssuerContract_string_string_string_uint_uint();
		fixture.stopIssuing(0).get();
		
		EthAddress address = fixture.contracts(0);
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, address);
		assertEquals(false, licenseIssuer.issuable());
		//End of user code
	}
	/**
	 * Test method for  changePaymentAddress(org.adridadou.ethereum.propeller.values.EthAddress _newPaymentAddress,Integer licenseId).
	 * see {@link LicenseManager#changePaymentAddress( org.adridadou.ethereum.propeller.values.EthAddress, Integer)}
	 * @throws Exception
	 */
	@Test
	public void testChangePaymentAddress_address_uint() throws Exception {
		//Start of user code testChangePaymentAddress_address_uint
		testCreateIssuerContract_string_string_string_uint_uint();
		
		fixture.changePaymentAddress(fixtureAddress, 0).get();
		
		EthAddress address = fixture.contracts(0);
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, address);
		assertEquals(fixtureAddress, licenseIssuer.paymentAddress());
		//End of user code
	}
	/**
	 * Test method for  changeOwner(org.adridadou.ethereum.propeller.values.EthAddress _newOwner).
	 * see {@link LicenseManager#changeOwner( org.adridadou.ethereum.propeller.values.EthAddress)}
	 * @throws Exception
	 */
	@Test
	public void testChangeOwner_address() throws Exception {
		//Start of user code testChangeOwner_address
		assertEquals(senderAddress, fixture.owner());
		fixture.changeOwner(fixtureAddress).get();
		try {
			fixture.changeOwner(senderAddress).get();
			fail("should not be reached");
		} catch (Exception e) {
		}
		//End of user code
	}
	//Start of user code customTests    
	@Test
	public void testConstructor() throws Exception {
		assertEquals("_name", fixture.issuerName());
		assertEquals(senderAddress, fixture.owner());
		assertEquals(senderAddress, fixture.paymentAddress());
	}
	
	//End of user code
}
