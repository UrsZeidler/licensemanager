package de.urszeidler.ethereum.licencemanager1;

//Start of user code customizedImports

import java.math.BigInteger;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.ethj.BlockchainConfig;
import org.adridadou.ethereum.ethj.TestConfig;
import org.adridadou.ethereum.ethj.provider.EthereumFacadeProvider;
import org.adridadou.ethereum.ethj.provider.EthereumJConfigs;
import org.adridadou.ethereum.ethj.provider.PrivateEthereumFacadeProvider;
import org.adridadou.ethereum.ethj.provider.PrivateNetworkConfig;
import org.adridadou.ethereum.rpc.provider.EthereumFacadeRpcProvider;
import org.adridadou.ethereum.rpc.provider.InfuraMainEthereumFacadeProvider;
import org.adridadou.ethereum.rpc.provider.InfuraRopstenEthereumFacadeProvider;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.EthValue;
import org.adridadou.ethereum.values.config.ChainId;
import org.adridadou.ethereum.values.config.InfuraKey;
import org.ethereum.crypto.ECKey;
import org.ethereum.crypto.ECKey;

import com.google.common.collect.Sets;
//End of user code


/**
 * A simple singleton to control the access for the ethereum instance.<br/>
 * The created instance is controllable by system a system property 'EthereumFacadeProvider'.
 */
public class EthereumInstance{
	public static final String PROP_CHAIN_ID = "chain-id";
	public static final String PROP_RPC_URL = "rpc-url";
	public static final String PROP_API_KEY = "apiKey";
	public static final String PROP_ETHEREUM_FACADE_PROVIDER = "EthereumFacadeProvider";
	//the different access technologies
	public static String EI_MAIN = "main";
	public static String EI_TEST = "test";
	public static String EI_ROPSTEN = "ropsten";
	public static String EI_PRIVATE = "private";
	public static String EI_RPC = "rpc";
	public static String EI_INFURA_ROPSTEN = "InfuraRopsten";
	public static String EI_INFURA_MAIN = "InfuraMain";
	public static String EI_CUSTOM = "custom";
	
	public static Set<String> ALL_RPC = Sets.newHashSet(EI_RPC,EI_INFURA_MAIN,EI_INFURA_ROPSTEN);
	public static Set<String> ALL_TESTNET = Sets.newHashSet(EI_ROPSTEN,EI_INFURA_ROPSTEN);

	private static EthereumInstance instance;
	private static Lock instanceLock = new ReentrantLock();
	
	private EthereumFacade ethereum;

	public static class DeployDuo<C>{
		public EthAddress contractAddress;
		public C contractInstance;
		
		public DeployDuo(EthAddress contractAddress, C contractInstance) {
			super();
			this.contractAddress = contractAddress;
			this.contractInstance = contractInstance;
		}
	}

	private EthereumInstance() {
		try {
			setup();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Get the ethereum instance, will wait until the instance is available.
	 * @return the instance
	 */
	public static EthereumInstance getInstance() {
		instanceLock.lock();
		try {
			if (instance == null) {
				instance = new EthereumInstance();
			}
		} finally {
			instanceLock.unlock();
		}
		return instance;
	}

	/**
	 * Setup up the blockchain. Add the 'EthereumFacadeProvider' property to use 
	 * another block chain implementation or network.<br/>
	 * main - for the main net<br/>
	 * test - for the main net<br/>
	 * ropsten - for the new testnet<br/>
	 * InfuraRopsten - for the new testnet over infura rcp<br/>
	 * rpc - to use a rpc instance<br/>
	 * -- rpc-url - the url<br/>
	 * -- chain-id - the chain id<br/>
	 * private - for a private chain<br/>
	 * @throws Exception 
	 */
	private void setup() throws Exception {
		String property = System.getProperty(PROP_ETHEREUM_FACADE_PROVIDER);
		if (EI_MAIN.equalsIgnoreCase(property)) {
			BlockchainConfig.Builder mainNet = EthereumJConfigs.mainNet();
			// Start of user code for setup the main chain
			// End of user code
			ethereum = EthereumFacadeProvider.forNetwork(mainNet).create();
		} else if (EI_TEST.equalsIgnoreCase(property)) {
			BlockchainConfig.Builder testnet = EthereumJConfigs.etherCampTestnet();
			// Start of user code for setup the test chain
			// End of user code
			ethereum = EthereumFacadeProvider.forNetwork(testnet).create();
		} else if (EI_ROPSTEN.equalsIgnoreCase(property)) {
			BlockchainConfig.Builder ropsten = EthereumJConfigs.ropsten();
			// Start of user code for setup the ropsten chain
			// End of user code
			ethereum = EthereumFacadeProvider.forNetwork(ropsten).create();
		} else if (EI_INFURA_ROPSTEN.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			ethereum = InfuraRopstenEthereumFacadeProvider.create(new InfuraKey(apiKey));
		} else if (EI_INFURA_ROPSTEN.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			ethereum = new InfuraMainEthereumFacadeProvider().create(new InfuraKey(apiKey));
		} else if (EI_RPC.equalsIgnoreCase(property)) {
			EthereumFacadeRpcProvider rcp = new EthereumFacadeRpcProvider();
			String url = System.getProperty(PROP_RPC_URL);
			String chainId = System.getProperty(PROP_CHAIN_ID);
			ethereum = rcp.create(url, new ChainId((byte) Integer.parseInt(chainId)));
		} else if (EI_PRIVATE.equalsIgnoreCase(property)) {
			PrivateNetworkConfig config = PrivateNetworkConfig.config();
			// Start of user code for setup the private chain
			config.reset(true)
			.initialBalance(new EthAccount(ECKey.fromPrivate(BigInteger.valueOf(100000L))),
					EthValue.ether(10L));

			// End of user code
			ethereum = new PrivateEthereumFacadeProvider().create(config);
		} else if (EI_CUSTOM.equalsIgnoreCase(property)) {
			BlockchainConfig.Builder config = BlockchainConfig.builder();
			// Start of user code for setup the custom chain
			// End of user code
			ethereum = EthereumFacadeProvider.forNetwork(config).create();
		}
		// take the standalone for all other cases
		if (ethereum == null) {
			TestConfig.Builder builder = TestConfig.builder();
			// Start of user code for setup the standalone chain
			// End of user code
			ethereum = EthereumFacadeProvider.forTest(builder.build());
		}
	}

	public EthereumFacade getEthereum() {
		return ethereum;
	}

}
