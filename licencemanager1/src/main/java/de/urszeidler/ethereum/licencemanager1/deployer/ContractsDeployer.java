package de.urszeidler.ethereum.licencemanager1.deployer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.propeller.EthereumFacade;
import org.adridadou.ethereum.propeller.solidity.SolidityContractDetails;
import org.adridadou.ethereum.propeller.solidity.SolidityEvent;
import org.adridadou.ethereum.propeller.values.EthAccount;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.SoliditySource;
import org.adridadou.ethereum.propeller.values.SoliditySourceFile;
import org.apache.commons.io.IOUtils;
import org.ethereum.solidity.compiler.CompilationResult;
import org.ethereum.solidity.compiler.CompilationResult.ContractMetadata;

import rx.Observable;

import de.urszeidler.ethereum.licencemanager1.EthereumInstance;
import de.urszeidler.ethereum.licencemanager1.EthereumInstance.DeployDuo;

import de.urszeidler.ethereum.licencemanager1.contracts.*;


/**
 * The deployer for the contracts package.
 *
 */
public class ContractsDeployer {

	private EthereumFacade ethereum;
	private SoliditySourceFile contractSource;
	private CompilationResult compiledContracts;
	private Map<String, SolidityContractDetails> contracts = new HashMap<>();
	private static String filename = "/contracts/contracts.sol";

	/**
	 * Create an instance of the deployer with the default contract code file.
	 * 
	 * @param ethereum
	 */
	public ContractsDeployer(EthereumFacade ethereum) {
		this(ethereum,filename,false);
	}

	/**
	 * Create an instance of the deployer.
	 * 
	 * @param ethereum
	 * @param contractSourceFile
	 * @param compiled is the source code already compiled
	 */
	public ContractsDeployer(EthereumFacade ethereum, String contractSourceFile, boolean compiled) {
		this.ethereum = ethereum;
		setContractSource(contractSourceFile, compiled);
	}

	/**
	 * Create an instance of the deployer.
	 * 
	 * @param ethereum
	 * @param contractSourceFile
	 */
	public ContractsDeployer(EthereumFacade ethereum, File contractSourceFile, boolean compiled) {
		this.ethereum = ethereum;
		if (!compiled)
			contractSource = SoliditySource.from(contractSourceFile);
		else {
			try {
				String rawJson = IOUtils.toString(new FileInputStream(contractSourceFile), EthereumFacade.CHARSET);
				compiledContracts = CompilationResult.parse(rawJson);
			} catch (FileNotFoundException e) {
				throw new IllegalArgumentException(e);
			} catch (IOException e) {
				throw new IllegalArgumentException(e);
			}
		}
	}

	/**
	 * Change the contract source.
	 * 
	 * @param contractSourceFile
	 * @param compiled
	 */
	public void setContractSource(String contractSourceFile, boolean compiled) {
		try {
			if (!compiled) {
		        File contractSrc = new File(this.getClass().getResource(contractSourceFile).toURI());
				contractSource = SoliditySource.from(contractSrc);
			} else {
				String rawJson = IOUtils.toString(this.getClass().getResourceAsStream(contractSourceFile),
						EthereumFacade.CHARSET);
				compiledContracts = CompilationResult.parse(rawJson);
			}
		} catch (IOException | URISyntaxException e) {
			throw new IllegalArgumentException(e);
		}
	}


	/**
	 * Deploys a 'LicenseManager' on the blockchain.
	 * 
	 * @param sender
	 *            the sender address
	 * @param _paymentAddress 
	 * @param _name 
	 * @return the address of the deployed contract
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public CompletableFuture<EthAddress> deployLicenseManager(EthAccount sender, org.adridadou.ethereum.propeller.values.EthAddress _paymentAddress, String _name) throws InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = compiledContractLicenseManager();
		CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender, _paymentAddress, _name);
		return address;
	}

	/**
	 * Deploys a 'LicenseManager' on the blockchain and wrapps the contract proxy.
	 *  
	 * @param sender the sender address
	 * @param _paymentAddress 
	 * @param _name 
	 * @return the contract interface
	 */
	public DeployDuo<LicenseManager> createLicenseManager(EthAccount sender, org.adridadou.ethereum.propeller.values.EthAddress _paymentAddress, String _name) throws IOException, InterruptedException, ExecutionException {
		CompletableFuture<EthAddress> address = deployLicenseManager(sender, _paymentAddress, _name);
		return new EthereumInstance.DeployDuo<LicenseManager>(address.get(), createLicenseManagerProxy(sender, address.get()));
	}

	/**
	 * Create a proxy for a deployed 'LicenseManager' contract.
	 *  
	 * @param sender the sender address
	 * @param address the address of the contract
	 * @return the contract interface
	 */
	public LicenseManager createLicenseManagerProxy(EthAccount sender, EthAddress address) throws IOException, InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = compiledContractLicenseManager();
		LicenseManager licensemanager = ethereum.createContractProxy(compiledContract, address, sender, LicenseManager.class);
		return licensemanager;
	}

	/**
	 * Return the compiled contract for the contract 'LicenseManager', when in source the contract code gets compiled.
	 * @return the compiled contract for 'LicenseManager'.
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public SolidityContractDetails compiledContractLicenseManager() throws InterruptedException, ExecutionException {
		String contractName = "LicenseManager";
		String quallifiedName = "contracts.sol:LicenseManager";
		return getCompiledContract(contractName, quallifiedName);
	}

	/**
	 * Deploys a 'LicenseIssuer' on the blockchain.
	 * 
	 * @param sender
	 *            the sender address
	 * @param itemName 
	 * @param textHash 
	 * @param url 
	 * @param lifeTime 
	 * @param price 
	 * @param _pa 
	 * @return the address of the deployed contract
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public CompletableFuture<EthAddress> deployLicenseIssuer(EthAccount sender, String itemName, String textHash, String url, Integer lifeTime, Integer price, org.adridadou.ethereum.propeller.values.EthAddress _pa) throws InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = compiledContractLicenseIssuer();
		CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender, itemName, textHash, url, lifeTime, price, _pa);
		return address;
	}

	/**
	 * Deploys a 'LicenseIssuer' on the blockchain and wrapps the contract proxy.
	 *  
	 * @param sender the sender address
	 * @param itemName 
	 * @param textHash 
	 * @param url 
	 * @param lifeTime 
	 * @param price 
	 * @param _pa 
	 * @return the contract interface
	 */
	public DeployDuo<LicenseIssuer> createLicenseIssuer(EthAccount sender, String itemName, String textHash, String url, Integer lifeTime, Integer price, org.adridadou.ethereum.propeller.values.EthAddress _pa) throws IOException, InterruptedException, ExecutionException {
		CompletableFuture<EthAddress> address = deployLicenseIssuer(sender, itemName, textHash, url, lifeTime, price, _pa);
		return new EthereumInstance.DeployDuo<LicenseIssuer>(address.get(), createLicenseIssuerProxy(sender, address.get()));
	}

	/**
	 * Create a proxy for a deployed 'LicenseIssuer' contract.
	 *  
	 * @param sender the sender address
	 * @param address the address of the contract
	 * @return the contract interface
	 */
	public LicenseIssuer createLicenseIssuerProxy(EthAccount sender, EthAddress address) throws IOException, InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = compiledContractLicenseIssuer();
		LicenseIssuer licenseissuer = ethereum.createContractProxy(compiledContract, address, sender, LicenseIssuer.class);
		return licenseissuer;
	}

	/**
	 * Return the compiled contract for the contract 'LicenseIssuer', when in source the contract code gets compiled.
	 * @return the compiled contract for 'LicenseIssuer'.
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public SolidityContractDetails compiledContractLicenseIssuer() throws InterruptedException, ExecutionException {
		String contractName = "LicenseIssuer";
		String quallifiedName = "contracts.sol:LicenseIssuer";
		return getCompiledContract(contractName, quallifiedName);
	}

	/**
	 *  Create an observable for the event LicenseIssued of the contract LicenseIssuer
	 *  deployed at the given address.
	 *
	 * @param address
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Observable<EventLicenseIssued_address_string_bool> observeEventLicenseIssued_address_string_bool(EthAddress address) throws InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = compiledContractLicenseIssuer();
		Optional<SolidityEvent<EventLicenseIssued_address_string_bool>> eventDefinition = ethereum.findEventDefinition(compiledContract, "LicenseIssued", EventLicenseIssued_address_string_bool.class);
		if(!eventDefinition.isPresent())
			throw new IllegalArgumentException("Event 'LicenseIssued' not found in contract definition."); 
			
		return ethereum.observeEvents(eventDefinition.get(), address);
	}

	/**
	 * Get the compiled contract by name or qualified name.
	 * @param contractName
	 * @param qualifiedName
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public SolidityContractDetails getCompiledContract(String contractName, String qualifiedName)
			throws InterruptedException, ExecutionException {
		SolidityContractDetails compiledContract = contracts.get(qualifiedName == null ? contractName : qualifiedName);
		if (compiledContract != null)
			return compiledContract;

		if (compiledContracts == null) {
			org.adridadou.ethereum.propeller.solidity.CompilationResult compilationResult = ethereum
					.compile(contractSource);
			Optional<SolidityContractDetails> contract = compilationResult.findContract(contractName);
			if (contract.isPresent()) {
				compiledContract = contract.get();
			} else {
				contract = compilationResult.findContract(qualifiedName);
				if (contract.isPresent())
					compiledContract = contract.get();
			}
		} else {
			ContractMetadata contractMetadata = compiledContracts.contracts.get(contractName);
			if (contractMetadata == null) {
				if (qualifiedName == null || qualifiedName.isEmpty())
					throw new IllegalArgumentException("Qualified name must not be null or empty.");

				Optional<String> optional = compiledContracts.contracts.keySet().stream()
						.filter(s -> s.endsWith(qualifiedName)).findFirst();
				if (optional.isPresent()) {
					contractMetadata = compiledContracts.contracts.get(optional.get());
				}
			}
			compiledContract = new SolidityContractDetails(contractMetadata.abi, contractMetadata.bin,
					contractMetadata.metadata);
		}
		if (compiledContract == null)
			throw new IllegalArgumentException(
					"Contract code for '" + contractName + "/" + qualifiedName + "' not found");

		contracts.put(qualifiedName == null ? contractName : qualifiedName, compiledContract);
		return compiledContract;
	}
}
