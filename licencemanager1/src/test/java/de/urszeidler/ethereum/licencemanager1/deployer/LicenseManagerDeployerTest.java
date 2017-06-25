package de.urszeidler.ethereum.licencemanager1.deployer;

import static org.junit.Assert.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.propeller.EthereumFacade;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.EthValue;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;

import de.urszeidler.ethereum.licencemanager1.AbstractContractTest;
import de.urszeidler.ethereum.licencemanager1.EthereumInstance.DeployDuo;
import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuer;
import de.urszeidler.ethereum.licencemanager1.contracts.LicenseManager;

public class LicenseManagerDeployerTest extends AbstractContractTest {
	private ContractsDeployer deployer;
	private LicenseManagerDeployer managerDeployer;

	@Before
	public void setUp() throws Exception {
		initTest();
		createFixture();
	}

	/**
	 * Create a new fixture by deploying the contract source.
	 * 
	 * @throws Exception
	 */
	protected void createFixture() throws Exception {
		deployer = new ContractsDeployer(ethereum, "/contracts/combined.json", true);
		managerDeployer = new LicenseManagerDeployer();
	}

	@Override
	protected String getContractName() {
		return "LicenseManager";
	}

	@SuppressWarnings("static-access")
	@Test
	public void testMain() {
		managerDeployer.setSender(sender);
		String name = "name";
		String[] args = new String[] { "-de", "-c", sender.getAddress().withLeading0x(), name };
		managerDeployer.main(args);
	}

	// @Test
	public void testVerifyLicense() {
		fail("Not yet implemented");
	}

	@Test
	public void testBuyLicense() throws IOException, InterruptedException, ExecutionException {
		testCreateIssuerContract();

		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender,
				licenseManager.contractInstance.contracts(0));

		String name = "buyer name";
		EthAddress address = account1.getAddress();
		licenseIssuer.buyLicense(address, name).with(EthValue.wei(2 * LicenseManagerDeployer.FINNEY_TO_WEI));

		managerDeployer.listContractData(null);
	}

	@Test
	public void testCreateIssuerContract() throws IOException, InterruptedException, ExecutionException {
		testDeployLicenseManager_intern();

		String itemName = "item name";
		String textHash = "text hash";
		String url = "the url";
		Integer lifeTime = 0;
		Integer price = 2;
		managerDeployer.createIssuerContract(itemName, textHash, url, lifeTime, price);
		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();

		assertEquals(1, licenseManager.contractInstance.contractCount().intValue());
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender,
				licenseManager.contractInstance.contracts(0));

		assertEquals(itemName, licenseIssuer.licensedItemName());
		assertEquals(textHash, licenseIssuer.licenseTextHash());
		assertEquals(url, licenseIssuer.licenseUrl());
		assertEquals(lifeTime, licenseIssuer.licenseLifetime());
		assertEquals(BigInteger.valueOf(price * LicenseManagerDeployer.FINNEY_TO_WEI), licenseIssuer.licencePrice());
		assertEquals(0, licenseIssuer.licenseCount().intValue());
	}

	@Test
	public void testDeployLicenseManager_intern() throws IOException, InterruptedException, ExecutionException {
		managerDeployer.setSender(sender);
		String name = "name";

		EthAddress paymentAddress = sender.getAddress();
		managerDeployer.deployLicenseManager(paymentAddress, name);

		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		assertNotNull(licenseManager);
		assertEquals(sender.getAddress(), licenseManager.contractInstance.paymentAddress());
		assertEquals(name, licenseManager.contractInstance.issuerName());
		assertEquals(0, licenseManager.contractInstance.contractCount().intValue());
	}

	@Test(expected = RuntimeException.class)
	public void testCheckLicense_WrongSignature() throws Exception {
		testBuyLicense();
		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		EthAddress issuerAddress = licenseManager.contractInstance.contracts(0);

		String message = "Test message";
		String message1 = "Test message1";

		String signature = LicenseManagerDeployer.createSignature(account1, message);
		String pk = LicenseManagerDeployer.toPublicKeyString(account1);// Hex.toHexString(encoded);

		managerDeployer.verifyLicense(issuerAddress.withLeading0x(), message1, signature, pk);
	}

	@Test
	public void testCheckLicense() throws Exception {
		testBuyLicense();
		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		EthAddress issuerAddress = licenseManager.contractInstance.contracts(0);

		String message = "Test message";
		String signature = LicenseManagerDeployer.createSignature(account1, message);
		String pk = LicenseManagerDeployer.toPublicKeyString(account1);// Hex.toHexString(encoded);

		managerDeployer.verifyLicense(issuerAddress.withLeading0x(), message, signature, pk);
	}

	@Test
	public void printHelp() throws Exception {
		String[] args = new String[] { "-h" };
		LicenseManagerDeployer.main(args);
	}

	@Test
	public void testDeployLicenseManager() throws Exception {
		String issuerName = "'a license manager for the test'";
		String[] args = new String[] { "-c", account1.getAddress().withLeading0x(), issuerName, "-wca", "ca.txt",
				"-de" };
		LicenseManagerDeployer.main(args);

		File file = new File("ca.txt");
		String ca = IOUtils.toString(new FileInputStream(file), EthereumFacade.CHARSET);
		EthAddress address = EthAddress.of(ca);

		LicenseManager licenseManager = deployer.createLicenseManagerProxy(sender, address);
		assertEquals(account1.getAddress(), licenseManager.paymentAddress());
		assertEquals(sender.getAddress(), licenseManager.owner());
		assertEquals(issuerName, licenseManager.issuerName());
		assertEquals(0, licenseManager.contractCount().intValue());
	}

	@Test
	public void testDeployIssuerContract() throws Exception {
		testDeployLicenseManager();
		
		File file = new File("ca.txt");
		String ca = IOUtils.toString(new FileInputStream(file), EthereumFacade.CHARSET);
		EthAddress address = EthAddress.of(ca);

		String itemName="'The item name.'";
		String textHash="TextHash";
		String url="http://test.org";
		String[] args = new String[]{"-cic", address.withLeading0x(), itemName,textHash,url,"0","200", "-wca", "ca.txt", "-de"};
		LicenseManagerDeployer.main(args);
		
		LicenseManager licenseManager = deployer.createLicenseManagerProxy(sender, address);
		assertEquals(1, licenseManager.contractCount().intValue());
		
		EthAddress lia = licenseManager.contracts(0);
		
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, lia);
		
		assertEquals(itemName, licenseIssuer.licensedItemName());
		assertEquals(textHash, licenseIssuer.licenseTextHash());
		assertEquals(url, licenseIssuer.licenseUrl());
		assertEquals(true, licenseIssuer.issuable());
		assertEquals(0, licenseIssuer.licenseCount().intValue());
		
		assertEquals(0, licenseIssuer.licenseLifetime().intValue());
		assertEquals(BigInteger.valueOf(FINNEY_TO_WEI).multiply(BigInteger.valueOf(200)), licenseIssuer.licencePrice());
		
	}

	@Override
	protected String getQuallifiedContractName() {
		// TODO Auto-generated method stub
		return null;
	}

}
