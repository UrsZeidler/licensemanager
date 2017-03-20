package de.urszeidler.ethereum.licencemanager1.deployer;

import rx.Observable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.values.CompiledContract;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
import org.apache.commons.io.IOUtils;
import org.ethereum.solidity.compiler.CompilationResult;
import org.ethereum.solidity.compiler.CompilationResult.ContractMetadata;


import de.urszeidler.ethereum.licencemanager1.EthereumInstance;
import de.urszeidler.ethereum.licencemanager1.EthereumInstance.DeployDuo;

import de.urszeidler.ethereum.licencemanager1.contracts.*;




/**
 * The deployer for the contracts package.
 *
 */
public class ContractsDeployer {

	private EthereumFacade ethereum;
	private SoliditySource contractSource;
	private CompilationResult compiledContracts;
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
				contractSource = SoliditySource.from(this.getClass().getResourceAsStream(contractSourceFile));
			} else {
				String rawJson = IOUtils.toString(this.getClass().getResourceAsStream(contractSourceFile),
						EthereumFacade.CHARSET);
				compiledContracts = CompilationResult.parse(rawJson);
			}
		} catch (IOException e) {
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
	public CompletableFuture<EthAddress> deployLicenseManager(EthAccount sender, org.adridadou.ethereum.values.EthAddress _paymentAddress, String _name) throws InterruptedException, ExecutionException {
		CompiledContract compiledContract = compiledContractLicenseManager();
		CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender, _paymentAddress, _name);
		return address;
	}

	/**
	 * Deploys a 'LicenseManager' on the blockchain and wrapps the contcat proxy.
	 *  
	 * @param sender the sender address
	 * @param _paymentAddress 
	 * @param _name 
	 * @return the contract interface
	 */
	public DeployDuo<LicenseManager> createLicenseManager(EthAccount sender, org.adridadou.ethereum.values.EthAddress _paymentAddress, String _name) throws IOException, InterruptedException, ExecutionException {
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
		CompiledContract compiledContract = compiledContractLicenseManager();
		LicenseManager licensemanager = ethereum.createContractProxy(compiledContract, address, sender, LicenseManager.class);
		return licensemanager;
	}

	/**
	 * Return the compiled contract for the contract 'LicenseManager', when in source the contract code is compiled.
	 * @return the compiled contract for 'LicenseManager'.
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public CompiledContract compiledContractLicenseManager() throws InterruptedException, ExecutionException {
		CompiledContract compiledContract = null;
		if (compiledContracts == null){
			Map<String, CompiledContract> contracts = ethereum.compile(contractSource).get();
			compiledContract = contracts.get("LicenseManager");
		} else {
			ContractMetadata contractMetadata = compiledContracts.contracts.get("LicenseManager");
			if (contractMetadata == null)
				throw new IllegalArgumentException("Contract code for 'LicenseManager' not found");
			compiledContract = CompiledContract.from(null, "LicenseManager", contractMetadata);
		}
		return compiledContract;
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
	public CompletableFuture<EthAddress> deployLicenseIssuer(EthAccount sender, String itemName, String textHash, String url, Integer lifeTime, Integer price, org.adridadou.ethereum.values.EthAddress _pa) throws InterruptedException, ExecutionException {
		CompiledContract compiledContract = compiledContractLicenseIssuer();
		CompletableFuture<EthAddress> address = ethereum.publishContract(compiledContract, sender, itemName, textHash, url, lifeTime, price, _pa);
		return address;
	}

	/**
	 * Deploys a 'LicenseIssuer' on the blockchain and wrapps the contcat proxy.
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
	public DeployDuo<LicenseIssuer> createLicenseIssuer(EthAccount sender, String itemName, String textHash, String url, Integer lifeTime, Integer price, org.adridadou.ethereum.values.EthAddress _pa) throws IOException, InterruptedException, ExecutionException {
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
		CompiledContract compiledContract = compiledContractLicenseIssuer();
		LicenseIssuer licenseissuer = ethereum.createContractProxy(compiledContract, address, sender, LicenseIssuer.class);
		return licenseissuer;
	}

	/**
	 * Return the compiled contract for the contract 'LicenseIssuer', when in source the contract code is compiled.
	 * @return the compiled contract for 'LicenseIssuer'.
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public CompiledContract compiledContractLicenseIssuer() throws InterruptedException, ExecutionException {
		CompiledContract compiledContract = null;
		if (compiledContracts == null){
			Map<String, CompiledContract> contracts = ethereum.compile(contractSource).get();
			compiledContract = contracts.get("LicenseIssuer");
		} else {
			ContractMetadata contractMetadata = compiledContracts.contracts.get("LicenseIssuer");
			if (contractMetadata == null)
				throw new IllegalArgumentException("Contract code for 'LicenseIssuer' not found");
			compiledContract = CompiledContract.from(null, "LicenseIssuer", contractMetadata);
		}
		return compiledContract;
	}
	/**
	 * 
	 * @param address
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Observable<EventLicenseIssued_address_string_bool> observeEventLicenseIssued_address_string_bool(EthAddress address) throws InterruptedException, ExecutionException {
		CompiledContract compiledContract = compiledContractLicenseIssuer();
		Observable<EventLicenseIssued_address_string_bool> observeEvents = ethereum.observeEvents(compiledContract.getAbi(), address, "LicenseIssued", EventLicenseIssued_address_string_bool.class);
		return observeEvents;
	}


}
