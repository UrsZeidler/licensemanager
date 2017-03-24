package de.urszeidler.ethereum.licencemanager1.deployer;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.EthValue;
import org.ethereum.crypto.ECKey;
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
	 * @throws Exception
	 */
	protected void createFixture() throws Exception {
		deployer = new ContractsDeployer(ethereum);
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
		String[] args = new String[]{"-de","-c",sender.getAddress().withLeading0x(),name};
		managerDeployer.main(args);
		
		
	}

	@Test
	public void testVerifyLicense() {
		fail("Not yet implemented");
	}

	@Test
	public void testBuyLicense() throws IOException, InterruptedException, ExecutionException {
		testCreateIssuerContract();
		
		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, licenseManager.contractInstance.contracts(0));
		
		
		String name = "buyer name";
		EthAddress address = EthAddress.of(ECKey.fromPrivate(BigInteger.valueOf(1000L)));
		licenseIssuer.buyLicense(address, name).with(EthValue.wei(2*LicenseManagerDeployer.FINNEY_TO_WEI));
		
		managerDeployer.listContractData(null);
	}

	@Test
	public void testCreateIssuerContract() throws IOException, InterruptedException, ExecutionException {
		testDeployLicenseManager();
		
		String itemName = "item name";
		String textHash = "text hash";
		String url = "the url";
		Integer lifeTime = 0;;
		Integer price = 2 ;
		managerDeployer.createIssuerContract(itemName, textHash, url, lifeTime, price);
		DeployDuo<LicenseManager> licenseManager = managerDeployer.getLicenseManager();
		
		assertEquals(1, licenseManager.contractInstance.contractCount().intValue());
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, licenseManager.contractInstance.contracts(0));
		
		assertEquals(itemName, licenseIssuer.licensedItemName());
		assertEquals(textHash, licenseIssuer.licenseTextHash());
		assertEquals(url, licenseIssuer.licenseUrl());
		assertEquals(lifeTime, licenseIssuer.licenseLifetime());
		assertEquals(BigInteger.valueOf(price*LicenseManagerDeployer.FINNEY_TO_WEI), licenseIssuer.licencePrice());
		assertEquals(0, licenseIssuer.licenseCount().intValue());
	}

	@Test
	public void testDeployLicenseManager() throws IOException, InterruptedException, ExecutionException {
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

}
