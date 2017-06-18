package de.urszeidler.ethereum.licencemanager1;

//Start of user code customizedImports

import java.math.BigInteger;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.adridadou.ethereum.EthjEthereumFacadeProvider;
import org.adridadou.ethereum.RpcEthereumFacadeProvider;
import org.adridadou.ethereum.ethj.EthereumJConfigs;
import org.adridadou.ethereum.ethj.TestConfig;
import org.adridadou.ethereum.ethj.privatenetwork.PrivateEthereumFacadeProvider;
import org.adridadou.ethereum.ethj.privatenetwork.PrivateNetworkConfig;
import org.adridadou.ethereum.propeller.EthereumConfig;
import org.adridadou.ethereum.propeller.EthereumConfig.Builder;
import org.adridadou.ethereum.propeller.keystore.AccountProvider;
import org.adridadou.ethereum.propeller.EthereumFacade;
import org.adridadou.ethereum.propeller.values.ChainId;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.EthValue;
import org.adridadou.ethereum.rpc.EthereumRpcConfig;
import org.adridadou.ethereum.values.config.BlockchainConfig;

import org.adridadou.ethereum.values.config.InfuraKey;

import com.google.common.collect.Sets;
//End of user code


/**
 * A simple singleton to control the access for the ethereum instance.<br/>
 * The created instance is controllable by system a system property
 * 'EthereumFacadeProvider'.<br/>
 * main - for the main net<br/>
 * test - for the main net<br/>
 * ropsten - for the new testnet<br/>
 * InfuraMain - for the main net over infura rcp<br/>
 * InfuraRopsten - for the ropsten testnet over infura rcp<br/>
 * InfuraRinkeby - for the rinkeby testnet over infura rcp<br/>
 * InfuraKovan - for the kovan testnet over infura rcp<br/>
 * -- apiKey - for all infura connection you will need an api key<br/>
 * rpc - to use a rpc instance<br/>
 * -- rpc-url - the url<br/>
 * -- chain-id - the chain id<br/>
 * private - for a private chain<br/>
 */
public class EthereumInstance{
	public static final String PROP_CHAIN_ID = "chain-id";
	public static final String PROP_RPC_URL = "rpc-url";
	public static final String PROP_API_KEY = "apiKey";
	public static final String PROP_ETHEREUM_FACADE_PROVIDER = "EthereumFacadeProvider";
	//the different access technologies
	public static final String EI_MAIN = "main";
	public static final String EI_TEST = "camptestnet";
	public static final String EI_ROPSTEN = "ropsten";
	public static final String EI_PRIVATE = "private";
	public static final String EI_RPC = "rpc";
	public static final String EI_INFURA_ROPSTEN = "InfuraRopsten";
	public static final String EI_INFURA_MAIN = "InfuraMain";
	public static final String EI_INFURA_RINKEBY = "InfuraRinkeby";
	public static final String EI_INFURA_KOVAN = "InfuraKovan";
	public static final String EI_CUSTOM = "custom";
	
	public final static Set<String> ALL_RPC = Sets.newHashSet(EI_RPC, EI_INFURA_MAIN, EI_INFURA_ROPSTEN, EI_INFURA_RINKEBY,
			EI_INFURA_KOVAN);
	public final static Set<String> ALL_INFURA = Sets.newHashSet(EI_INFURA_MAIN, EI_INFURA_ROPSTEN, EI_INFURA_RINKEBY,
			EI_INFURA_KOVAN);
	public final static Set<String> ALL_TESTNET = Sets.newHashSet(EI_ROPSTEN, EI_TEST, EI_INFURA_ROPSTEN, EI_INFURA_RINKEBY,
			EI_INFURA_KOVAN);

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
	 * test - for the CampTest net<br/>
	 * ropsten - for the new testnet<br/>
	 * InfuraMain - for the main net over infura rcp<br/>
	 * InfuraRopsten - for the ropsten testnet over infura rcp<br/>
	 * InfuraRinkeby - for the rinkeby testnet over infura rcp<br/>
	 * InfuraKovan - for the kovan testnet over infura rcp<br/>
	 * -- apiKey - for all infura connection you will need an api key<br/>
	 * rpc - to use a rpc instance<br/>
	 * -- rpc-url - the url<br/>
	 * -- chain-id - the chain id<br/>
	 * private - for a private chain<br/>
	 * @throws Exception 
	 */
	private void setup() throws Exception {
		String property = System.getProperty(PROP_ETHEREUM_FACADE_PROVIDER);
		if (EI_MAIN.equalsIgnoreCase(property)) {
			BlockchainConfig bConfig = EthereumJConfigs.mainNet();
			Builder config = EthereumConfig.builder();
			// Start of user code for setup the main chain
			// End of user code
			ethereum = EthjEthereumFacadeProvider.forNetwork(bConfig).create(config.build());
		} else if (EI_TEST.equalsIgnoreCase(property)) {
			BlockchainConfig bConfig = EthereumJConfigs.etherCampTestnet();
			Builder config = EthereumConfig.builder();
			//  Start of user code for setup the test chain
			// End of user code
			ethereum = EthjEthereumFacadeProvider.forNetwork(bConfig).create(config.build());
		} else if (EI_ROPSTEN.equalsIgnoreCase(property)) {
			BlockchainConfig bConfig = EthereumJConfigs.ropsten();
			Builder config = EthereumConfig.builder();
			// Start of user code for setup the ropsten chain
			// End of user code
			ethereum = EthjEthereumFacadeProvider.forNetwork(bConfig).create(config.build());
		} else if (EI_CUSTOM.equalsIgnoreCase(property)) {
			BlockchainConfig mainNet = EthereumJConfigs.ropsten();
			Builder config = EthereumConfig.builder();
			// Start of user code for setup the custom chain
			// End of user code
			ethereum = EthjEthereumFacadeProvider.forNetwork(mainNet).create(config.build());
		} else if (EI_INFURA_MAIN.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			EthereumRpcConfig config = EthereumRpcConfig.config().build();
			ethereum = RpcEthereumFacadeProvider.forInfura(InfuraKey.of(apiKey), config).createMain();
		} else if (EI_INFURA_ROPSTEN.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			EthereumRpcConfig config = EthereumRpcConfig.config().build();
			ethereum = RpcEthereumFacadeProvider.forInfura(InfuraKey.of(apiKey), config).createRopsten();
		} else if (EI_INFURA_RINKEBY.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			EthereumRpcConfig config = EthereumRpcConfig.config().build();
			ethereum = RpcEthereumFacadeProvider.forInfura(InfuraKey.of(apiKey), config).createRinkeby();
		} else if (EI_INFURA_KOVAN.equalsIgnoreCase(property)) {
			String apiKey = System.getProperty(PROP_API_KEY);
			EthereumRpcConfig config = EthereumRpcConfig.config().build();
			ethereum = RpcEthereumFacadeProvider.forInfura(InfuraKey.of(apiKey), config).createKovan();
		} else if (EI_RPC.equalsIgnoreCase(property)) {
			String url = System.getProperty(PROP_RPC_URL);
			String chainId = System.getProperty(PROP_CHAIN_ID);
			EthereumRpcConfig config = EthereumRpcConfig.config().build();
			ethereum = RpcEthereumFacadeProvider.forRemoteNode(url, ChainId.id(Integer.parseInt(chainId)), config);
		} else if (EI_PRIVATE.equalsIgnoreCase(property)) {
			PrivateNetworkConfig config = PrivateNetworkConfig.config();
			BlockchainConfig builder = BlockchainConfig.builder();
			// Start of user code for setup the private chain
			config.reset(true)
			.initialBalance(AccountProvider.fromPrivateKey(BigInteger.valueOf(100000L)),
					EthValue.ether(10L));

			// End of user code
			PrivateEthereumFacadeProvider ethereumFacadeProvider = new PrivateEthereumFacadeProvider();
			ethereum = ethereumFacadeProvider.create(config, EthereumConfig.builder().build());
		}
		if (ethereum == null) {
			TestConfig.Builder builder = TestConfig.builder();
			// Start of user code for setup the standalone chain
			// End of user code
			ethereum = EthjEthereumFacadeProvider.forTest(builder.build());
		}
	}

	public EthereumFacade getEthereum() {
		return ethereum;
	}

}
