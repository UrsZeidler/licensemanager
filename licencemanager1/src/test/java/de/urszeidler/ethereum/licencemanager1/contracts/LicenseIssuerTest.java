package de.urszeidler.ethereum.licencemanager1.contracts;

import static org.junit.Assert.*;


import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuer.*;

import java.io.File;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;
import java.math.*;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.keystore.*;
import org.adridadou.ethereum.values.CompiledContract;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import org.adridadou.ethereum.values.SoliditySource;
import org.adridadou.ethereum.values.config.ChainId;
import org.ethereum.crypto.ECKey;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;


import de.urszeidler.ethereum.licencemanager1.AbstractContractTest;
import de.urszeidler.ethereum.licencemanager1.EthereumInstance;

// Start of user code LicenseIssuerTest.customImports
import org.adridadou.ethereum.values.EthValue;
import de.urszeidler.ethereum.licencemanager1.deployer.ContractsDeployer;
import org.ethereum.crypto.ECKey.ECDSASignature;
import com.google.common.primitives.Bytes;
// End of user code


/**
 * Test for the LicenseIssuer contract.
 *
 */
public class LicenseIssuerTest extends AbstractContractTest{

	private LicenseIssuer fixture;
	// Start of user code LicenseIssuerTest.attributes
	private ContractsDeployer deployer;

	// End of user code

	@Override
	protected String getContractName() {
		return "LicenseIssuer";
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
		deployer = new ContractsDeployer(ethereum);
		createFixture();
		// End of user code
	}


	/**
	 * Create a new fixture by deploying the contract source.
	 * @throws Exception
	 */
	protected void createFixture() throws Exception {
		//Start of user code createFixture
		CompiledContract compiledContract = getCompiledContract();
		String itemName = "itemName";
		String textHash = "textHash";
		String url = "url";
		Integer lifeTime = 0;
		Integer price = 1;
		org.adridadou.ethereum.values.EthAddress _pa = senderAddress;
		CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender, itemName, textHash,
				url, lifeTime, price, _pa);
		fixtureAddress = address.get();
		setFixture(ethereum.createContractProxy(compiledContract, fixtureAddress, sender, LicenseIssuer.class));
		// End of user code
	}

	protected void setFixture(LicenseIssuer f) {
		this.fixture = f;
	}


	/**
	 * Test method for  checkLicense(Byte[] factHash,Integer v,Byte[] sig_r,Byte[] sig_s).
	 * see {@link LicenseIssuer#checkLicense( Byte[], Integer, Byte[], Byte[])}
	 * @throws Exception
	 */
	@Test
	public void testCheckLicense_bytes32_uint8_bytes32_bytes32() throws Exception {
		//Start of user code testCheckLicense_bytes32_uint8_bytes32_bytes32
		testBuyLicense_address_string();
		LicenseIssuer li = deployer.createLicenseIssuerProxy(account2, fixtureAddress);

		String message = "Test message";
		byte[] myMessage = message.getBytes();
		if (myMessage.length < 32)
			myMessage = Arrays.copyOf(myMessage, 32);
		else if (myMessage.length % 32 != 0)
			myMessage = Arrays.copyOf(myMessage, myMessage.length + myMessage.length % 32);

		ECDSASignature signature = account1.key.sign(myMessage);

		Byte[] factHash = toByteArray(signature.toByteArray());
		Integer v = Integer.valueOf(signature.v);
		Byte[] sig_r = toByteArray(signature.r.toByteArray());
		Byte[] sig_s = toByteArray(signature.s.toByteArray());
		assertTrue(li.checkLicense(factHash, v, sig_r, sig_s));
		// End of user code
	}
	/**
	 * Test method for  checkLicense(org.adridadou.ethereum.values.EthAddress _address).
	 * see {@link LicenseIssuer#checkLicense( org.adridadou.ethereum.values.EthAddress)}
	 * @throws Exception
	 */
	@Test
	public void testCheckLicense_address() throws Exception {
		//Start of user code testCheckLicense_address
		testBuyLicense_address_string();
		LicenseIssuer li = deployer.createLicenseIssuerProxy(account2, fixtureAddress);
		assertTrue(li.checkLicense(account1.getAddress()));
		assertFalse(li.checkLicense(senderAddress));
		// End of user code
	}
	/**
	 * Test method for  changePaymentAddress(org.adridadou.ethereum.values.EthAddress _newPaymentAddress).
	 * see {@link LicenseIssuer#changePaymentAddress( org.adridadou.ethereum.values.EthAddress)}
	 * @throws Exception
	 */
	@Test
	public void testChangePaymentAddress_address() throws Exception {
		//Start of user code testChangePaymentAddress_address
		assertEquals(senderAddress, fixture.paymentAddress());
		fixture.changePaymentAddress(account2.getAddress()).get();
		assertEquals(account2.getAddress(), fixture.paymentAddress());
		// End of user code
	}
	/**
	 * Test method for  stopIssuing().
	 * see {@link LicenseIssuer#stopIssuing()}
	 * @throws Exception
	 */
	@Test
	public void testStopIssuing() throws Exception {
		//Start of user code testStopIssuing
		assertTrue(fixture.getIssuable());
		fixture.stopIssuing().get();
		assertFalse(fixture.getIssuable());

		// End of user code
	}
	/**
	 * Test method for  buyLicense(org.adridadou.ethereum.values.EthAddress _address,String _name).
	 * see {@link LicenseIssuer#buyLicense( org.adridadou.ethereum.values.EthAddress, String)}
	 * @throws Exception
	 */
	@Test
	public void testBuyLicense_address_string() throws Exception {
		//Start of user code testBuyLicense_address_string
		EthValue senderAmount = ethereum.getBalance(sender);

		String _name = "testname";
		LicenseIssuer li = deployer.createLicenseIssuerProxy(account1, fixtureAddress);
		li.buyLicense(account1.getAddress(), _name).with(EthValue.wei(1000000000000000L)).get();

		assertEquals(1, fixture.licenseCount().intValue());
		assertEquals(senderAmount.plus(EthValue.wei(1000000000000000L)), ethereum.getBalance(sender));

		LicenseIssuerIssuedLicense issuedLicenses = fixture.issuedLicenses(0);
		assertEquals(account1.getAddress(), issuedLicenses.getLicenseOwnerAdress());
		assertEquals(_name, issuedLicenses.getLicenseOwnerName());
		// End of user code
	}
	//Start of user code customTests
	@Test
	public void testConstructor() throws Exception {
		assertEquals("itemName", fixture.licensedItemName());
		assertEquals("textHash", fixture.licenseTextHash());
		assertEquals("url", fixture.licenseUrl());
		assertEquals(senderAddress, fixture.licenseManager());
		assertEquals(senderAddress, fixture.paymentAddress());
		assertEquals(EthValue.wei(1000000000000000L).inWei(), fixture.licencePrice());
		assertEquals(0, fixture.licenseCount().intValue());
		assertTrue(fixture.issuable());
	}

	@Test(expected = ExecutionException.class)
	public void testBuyLicense_Pay_to_much() throws Exception {
		LicenseIssuer li = deployer.createLicenseIssuerProxy(account1, fixtureAddress);
		li.buyLicense(account1.getAddress(), "testname").with(EthValue.wei(1000000000000001L)).get();
	}

	@Test(expected = ExecutionException.class)
	public void testBuyLicense_Pay_less() throws Exception {
		LicenseIssuer li = deployer.createLicenseIssuerProxy(account1, fixtureAddress);
		li.buyLicense(account1.getAddress(), "testname").with(EthValue.wei(100000000000000L)).get();
	}

	
	
	private Byte[] toByteArray(byte[] byteArray) {
		List<Byte> asList = Bytes.asList(byteArray);
		return asList.toArray(new Byte[] {});
	}

	// End of user code
}
