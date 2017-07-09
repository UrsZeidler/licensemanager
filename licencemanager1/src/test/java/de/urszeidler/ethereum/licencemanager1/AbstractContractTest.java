package de.urszeidler.ethereum.licencemanager1;

// Start of user code AbstractContractTest.customImports
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.propeller.EthereumFacade;
import org.adridadou.ethereum.propeller.keystore.AccountProvider;
import org.adridadou.ethereum.propeller.keystore.SecureKey;
import org.adridadou.ethereum.propeller.solidity.SolidityContractDetails;
import org.adridadou.ethereum.propeller.values.EthAccount;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.EthValue;
import org.adridadou.ethereum.propeller.values.SoliditySourceFile;
import org.apache.commons.io.IOUtils;
import org.ethereum.solidity.compiler.CompilationResult;
import org.ethereum.solidity.compiler.CompilationResult.ContractMetadata;
import org.junit.BeforeClass;
import org.spongycastle.util.encoders.Hex;

// End of user code

/**
 * The basic test.
 *
 */
public abstract class AbstractContractTest {

	private static Map<String, SolidityContractDetails> contracts = new HashMap<>();

	protected static EthereumFacade ethereum;
	protected static EthAccount sender;
	protected static EthAddress senderAddress;

	protected EthAddress fixtureAddress;
	protected SoliditySourceFile contractSource;

	// Start of user code AbstractContractTest.customFields
	protected static EthAccount account1;
	protected static EthAccount account2;
	protected static final long FINNEY_TO_WEI = 1000000000000000L;
	// End of user code

	/**
	 * @return the basic contract name
	 */
	protected abstract String getContractName();

	/**
	 * @return the contract file together with the contract name
	 */
	protected abstract String getQuallifiedContractName();

	/**
	 * Setup up the blockchain. Add the 'EthereumFacadeProvider' property to use
	 * another block chain implementation or network.
	 * 
	 * @throws Exception
	 */
	@BeforeClass
	public static void setup() throws Exception {
		ethereum = EthereumInstance.getInstance().getEthereum();
		initTest();
	}

	protected static void initTest() throws Exception {
		// Start of user code AbstractContractTest.initTest

		String property = System.getProperty(EthereumInstance.PROP_ETHEREUM_FACADE_PROVIDER);
		if (EthereumInstance.ALL_TESTNET.contains(property)) {

		} else if (EthereumInstance.EI_PRIVATE.equalsIgnoreCase(property)) {
			sender = AccountProvider.fromPrivateKey((BigInteger.valueOf(1000L)));
			senderAddress = sender.getAddress();

			account1 = AccountProvider.fromPrivateKey((BigInteger.valueOf(10000)));
			account2 = AccountProvider.fromPrivateKey((BigInteger.valueOf(10001)));

			ethereum.sendEther(sender, account1.getAddress(), EthValue.ether(1L));
		} else if (EthereumInstance.ALL_TESTNET.contains(property)
				|| EthereumInstance.EI_RPC.equalsIgnoreCase(property)) {
			SecureKey a = AccountProvider.fromKeystore(new File(System.getProperty("keyFile")));
			String password = System.getProperty("keyPass");
			if (password == null)
				password = "";
			sender = a.decode(password);
			senderAddress = sender.getAddress();

		}

		if (sender == null) {// the account for the standalone blockchain
			sender = AccountProvider
					.fromPrivateKey((Hex.decode("3ec771c31cac8c0dba77a69e503765701d3c2bb62435888d4ffa38fed60c445c")));
			senderAddress = sender.getAddress();

			account1 = AccountProvider.fromPrivateKey((BigInteger.valueOf(10000)));
			account2 = AccountProvider.fromPrivateKey((BigInteger.valueOf(10001)));

			ethereum.sendEther(sender, account1.getAddress(), EthValue.ether(1L));
			ethereum.sendEther(sender, account2.getAddress(), EthValue.ether(1L));
		}

		// End of user code
	}

	/**
	 * Returns the already compiled contact.
	 * 
	 * @param filePath
	 *            the filename and path of the combined json
	 * @return the contract data (bin, abi)
	 * @throws URISyntaxException
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	protected SolidityContractDetails getCompiledContract(String filePath)
			throws URISyntaxException, FileNotFoundException, IOException {
		SolidityContractDetails compiledContract = contracts.get(getQuallifiedContractName());
		if (compiledContract != null)
			return compiledContract;

		File file = new File(this.getClass().getResource(filePath).toURI());
		String rawJson = IOUtils.toString(new FileInputStream(file), EthereumFacade.CHARSET);
		CompilationResult result = CompilationResult.parse(rawJson);

		ContractMetadata contractMetadata = result.contracts.get(getContractName());
		if (contractMetadata == null) {
			Optional<String> optional = result.contracts.keySet().stream()
					.filter(s -> s.endsWith(getQuallifiedContractName())).findFirst();
			if (optional.isPresent())
				contractMetadata = result.contracts.get(optional.get());
		}
		compiledContract = new SolidityContractDetails(contractMetadata.abi, contractMetadata.bin,
				contractMetadata.metadata);

		contracts.put(getQuallifiedContractName(), compiledContract);
		return compiledContract;
	}

	/**
	 * Returns the compiled contract from the 'contractSource'. The name is
	 * defined in the concrete test case.
	 * 
	 * @return the compiled contract
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public SolidityContractDetails getCompiledContract() throws InterruptedException, ExecutionException {
		org.adridadou.ethereum.propeller.solidity.CompilationResult compilationResult = ethereum
				.compile(contractSource);
		Optional<SolidityContractDetails> contract = compilationResult.findContract(getContractName());
		if (contract.isPresent()) {
			return contract.get();
		} else {
			contract = compilationResult.findContract(getQuallifiedContractName());
			if (contract.isPresent())
				return contract.get();
		}
		throw new IllegalArgumentException("The contract '" + getContractName()
				+ "' is not present is the map of contracts:" + compilationResult.getContracts());
	}

	// Start of user code AbstractContractTest.customMethods
	// TODO: add custom methods
	// End of user code
}
