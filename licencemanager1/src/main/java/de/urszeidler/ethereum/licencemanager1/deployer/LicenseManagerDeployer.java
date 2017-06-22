/**
 * 
 */
package de.urszeidler.ethereum.licencemanager1.deployer;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.propeller.EthereumFacade;
import org.adridadou.ethereum.propeller.keystore.AccountProvider;
import org.adridadou.ethereum.propeller.keystore.FileSecureKey;
import org.adridadou.ethereum.propeller.keystore.SecureKey;
import org.adridadou.ethereum.propeller.values.EthAccount;
import org.adridadou.ethereum.propeller.values.EthAddress;
import org.adridadou.ethereum.propeller.values.EthData;
import org.adridadou.ethereum.propeller.values.EthValue;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.OptionGroup;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.bouncycastle.util.encoders.Hex;
import org.ethereum.crypto.ECKey;

import com.google.common.primitives.Bytes;

import de.urszeidler.ethereum.licencemanager1.EthereumInstance;
import de.urszeidler.ethereum.licencemanager1.EthereumInstance.DeployDuo;
import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuer;
import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuerIssuedLicense;
import de.urszeidler.ethereum.licencemanager1.contracts.LicenseManager;

/**
 * @author
 *
 */
public class LicenseManagerDeployer {

	public static final long FINNEY_TO_WEI = 1000000000000000L;

	private EthereumFacade ethereum;
	private ContractsDeployer deployer;
	private long millis;
	private EthAccount sender;
	private DeployDuo<LicenseManager> licenseManager;

	private interface DoAndWaitOneTime<T> {
		boolean isDone();

		CompletableFuture<T> doIt();
	}
	public LicenseManagerDeployer() {
		super();
		ethereum = EthereumInstance.getInstance().getEthereum();
		deployer = new ContractsDeployer(ethereum, "/contracts/combined.json", true);
	}

	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Options options = createOptions();
		CommandLineParser parser = new DefaultParser();
		int returnValue = 0;
		boolean dontExit = false;
		try {
			CommandLine commandLine = parser.parse(options, args);
			if (commandLine.hasOption("h")) {
				printHelp(options);
				return;
			}
			if(commandLine.hasOption("de"))
				dontExit = true;

			String senderKey = null;
			String senderPass = null;
			if (commandLine.hasOption("sk"))
				senderKey = commandLine.getOptionValue("sk");
			if (commandLine.hasOption("sp"))
				senderPass = commandLine.getOptionValue("sp");

			LicenseManagerDeployer manager = new LicenseManagerDeployer();

			try {
				manager.init(senderKey, senderPass);
				if (commandLine.hasOption("f")) {
					String[] values = commandLine.getOptionValues("f");

					String filename = values[0];
					String isCompiled = values[1];
					manager.deployer.setContractSource(filename, Boolean.parseBoolean(isCompiled));
				}
				if (commandLine.hasOption("millis")) {
					manager.setMillis(Long.parseLong(commandLine.getOptionValue("millis")));
				}

				if (commandLine.hasOption("c")) {
					String[] values = commandLine.getOptionValues("c");
					if (values == null || values.length != 2) {
						System.out.println("Error. Need 2 parameters: paymentAddress,name");
						System.out.println("");
						printHelp(options);
						return;
					}

					String paymentAddress = values[0];
					String name = values[1];
					manager.deployLicenseManager(EthAddress.of(paymentAddress), name);
				} else if (commandLine.hasOption("l")) {
					String contractAddress = commandLine.getOptionValue("l");
					if (contractAddress == null) {
						System.out.println("Error. Need 1 parameters: contract address");
						System.out.println("");
						printHelp(options);
						return;
					}
					manager.setManager(EthAddress.of(contractAddress));
					manager.listContractData(EthAddress.of(contractAddress));
				} else if (commandLine.hasOption("cic")) {
					String[] values = commandLine.getOptionValues("cic");
					if (values == null || values.length != 6) {
						System.out.println("Error. Need 6 itemName, textHash, url, lifeTime, price");
						System.out.println("");
						printHelp(options);
						return;
					}
					String contractAddress = values[0];
					String itemName = values[1];
					String textHash = values[2];
					String url = values[3];
					String lifeTime = values[4];
					String price = values[5];

					manager.setManager(EthAddress.of(contractAddress));
					manager.createIssuerContract(itemName, textHash, url, Integer.parseInt(lifeTime),
							Integer.parseInt(price));
				}else if (commandLine.hasOption("bli")){
					String[] values = commandLine.getOptionValues("bli");
					if (values == null || values.length < 2 || values.length > 3 ) {
						System.out.println("Error. Need 2-3 issuerAddress, name, optional an address when not use the sender.");
						System.out.println("");
						printHelp(options);
						return;
					}
					String issuerAddress = values[0];
					String name = values[1];
					String address = values[2];

					manager.buyLicense(issuerAddress, name, address);
				}else if(commandLine.hasOption("v")){
					String[] values = commandLine.getOptionValues("v");
					
					
					String issuerAddress = values[0];
					String message = values[1];
					String signature = values[2];
					String publicKey = values[3];

					manager.verifyLicense(issuerAddress,message,signature, publicKey);
				}

			} catch (Exception e) {
				System.out.println(e.getMessage());
				printHelp(options);
				returnValue = 10;
			}

		} catch (ParseException e1) {
			System.out.println(e1.getMessage());
			printHelp(options);
			returnValue = 10;
		}
		if(!dontExit)
			System.exit(returnValue);
	}

	public void verifyLicense(String issuerAddress, String message, String signature, String publicKey) throws IOException, InterruptedException, ExecutionException {
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, EthAddress.of(issuerAddress));
		if(!licenseIssuer.getIssuable())
			throw new RuntimeException("The license is no longer issuable.");
		
		byte[] myMessage = message.getBytes();
		if (myMessage.length < 32)
			myMessage = Arrays.copyOf(myMessage, 32);
		else if (myMessage.length % 32 != 0)
			myMessage = Arrays.copyOf(myMessage, myMessage.length + myMessage.length % 32);

		byte[] decode = Hex.decode(signature);
		byte[] pub = Hex.decode(publicKey);
		ECKey key = ECKey.fromPublicOnly(pub);
		
		if(!key.verify(myMessage, decode)) {
			throw new RuntimeException("Message did not match signature.");
		}
		
		Integer v = (int) decode[0];
		byte[] sig_r = new byte[32];
		System.arraycopy(decode, 1, sig_r, 0, 32);
		byte[] sig_s = new byte[32];
		System.arraycopy(decode, 33, sig_s, 0, 32);
		
		if(!licenseIssuer.checkLicense(EthData.of(myMessage), v, EthData.of(sig_r), EthData.of(sig_s)))
			throw new RuntimeException("The license is not valid.");
			
	}

	public void buyLicense(String issuerAddress, String name, String address) throws IOException, InterruptedException, ExecutionException {
		LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, EthAddress.of(issuerAddress));
		if(!licenseIssuer.getIssuable())
			throw new RuntimeException("The license is no longer issuable.");
		
		EthAddress eaddress = (address==null || address.isEmpty()) ? EthAddress.empty() : EthAddress.of(address);
		BigInteger licencePrice = licenseIssuer.licencePrice();
		
		Integer licenseCount = licenseIssuer.licenseCount();
		doAndWait("Buying license "+licenseIssuer.licensedItemName()+" for "+licencePrice+" finneys", new DoAndWaitOneTime<Void>() {

			@Override
			public boolean isDone() {
				return licenseIssuer.licenseCount() == licenseCount +1;
			}

			@Override
			public CompletableFuture<Void> doIt() {
				return licenseIssuer.buyLicense(eaddress, name).with(EthValue.wei(licencePrice.multiply(BigInteger.valueOf(FINNEY_TO_WEI))));	
			}
		});
	}

	/**
	 * Create a new issuer contract.
	 * 
	 * @param itemName
	 * @param textHash
	 * @param url
	 * @param lifeTime
	 * @param price
	 * @throws InterruptedException
	 * @throws ExecutionException
	 * @throws IOException 
	 */
	public void createIssuerContract(String itemName, String textHash, String url, Integer lifeTime, Integer price)
			throws InterruptedException, ExecutionException, IOException {
		Integer contractCount = licenseManager.contractInstance.contractCount();
		doAndWait("Create a new issuer contract: " + itemName + " the hash: " + textHash, new DoAndWaitOneTime<Void>() {

			@Override
			public boolean isDone() {
				return licenseManager.contractInstance.contractCount() == contractCount + 1;
			}

			@Override
			public CompletableFuture<Void> doIt() {
				return licenseManager.contractInstance.createIssuerContract(itemName, textHash, url, lifeTime, price);
			}
		});
		listContractData(null);
	}

	/**
	 * List the LicenseMangager and data.
	 * 
	 * @param contractAddress
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public void listContractData(EthAddress contractAddress)
			throws IOException, InterruptedException, ExecutionException {
		System.out.println("\nLicensManager: " + licenseManager.contractInstance.issuerName());
		System.out.println("Address: " + licenseManager.contractAddress);
		System.out.println("Payment Address: " + licenseManager.contractInstance.paymentAddress());
		System.out.println("Contracts: " + licenseManager.contractInstance.contractCount()+" owner: "+licenseManager.contractInstance.owner());
		for (int i = 0; i < licenseManager.contractInstance.contractCount(); i++) {
			EthAddress address = licenseManager.contractInstance.contracts(i);
			LicenseIssuer licenseIssuer = deployer.createLicenseIssuerProxy(sender, address);
			System.out.println(" License:   " + licenseIssuer.licensedItemName());
			System.out.println(" Url:       " + licenseIssuer.licenseUrl());
			System.out.println(" text hash: " + licenseIssuer.licenseTextHash());
			System.out.println(" issueable: " + licenseIssuer.issuable() + " " + licenseIssuer.licenseLifetime());

			System.out.println(" LicenseCount: " + licenseIssuer.licenseCount());
			for (int j = 0; j < licenseIssuer.licenseCount(); j++) {
				LicenseIssuerIssuedLicense issuedLicenses = licenseIssuer.issuedLicenses(j);
				System.out.println("  Issued License " + issuedLicenses.getLicenseOwnerName() + " "
						+ issuedLicenses.getLicenseOwnerAdress() + " " + issuedLicenses.getIssuedDate());
			}
		}

	}

	/**
	 * Deploy a new License Manager.
	 * 
	 * @param _paymentAddress
	 * @param _name
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public void deployLicenseManager(EthAddress _paymentAddress, String _name)
			throws IOException, InterruptedException, ExecutionException {
		licenseManager = deployer.createLicenseManager(sender, _paymentAddress, _name);
		listContractData(null);
	}

	private void setManager(EthAddress contractAddress) throws IOException, InterruptedException, ExecutionException {
		licenseManager = new DeployDuo<LicenseManager>(contractAddress, null);
		licenseManager.contractInstance = deployer.createLicenseManagerProxy(sender, contractAddress);
	}

	private void init(String senderKey, String senderPass) throws Exception {
		ethereum = EthereumInstance.getInstance().getEthereum();
		String property = System.getProperty("EthereumFacadeProvider");
		// testnetProvider
		if (property != null && (property.equalsIgnoreCase("rpc") || property.equalsIgnoreCase("ropsten")
				|| property.equalsIgnoreCase("InfuraRopsten"))) {

			millis = 2000L;
		} else if (property != null && property.equalsIgnoreCase("private")) {
			sender = AccountProvider.fromPrivateKey(BigInteger.valueOf(100000L));
			millis = 100L;
		} else {
			sender = AccountProvider.fromPrivateKey((Hex.decode("3ec771c31cac8c0dba77a69e503765701d3c2bb62435888d4ffa38fed60c445c")));
			millis = 10L;
		}

		if (senderKey != null && !senderKey.isEmpty() && sender == null) {
			sender = unlockAccount(senderKey, senderPass);
		}
		deployer = new ContractsDeployer(ethereum, "/contracts/combined.json", true);
	}

	/**
	 * Unlocks an account.
	 * 
	 * @param pathname
	 *            the key file
	 * @param pass
	 *            the pass to unlocl
	 * @return the account
	 * @throws Exception
	 */
	private EthAccount unlockAccount(String pathname, String pass) throws Exception {
		SecureKey key2 = new FileSecureKey(new File(pathname));
		System.out.println("unlock key: " + pathname);
		EthAccount decode = key2.decode(pass);
		String senderAddressS = decode.getAddress().withLeading0x();
		EthValue balance = ethereum.getBalance(decode);
		System.out.println("Sender address and amount:" + senderAddressS + "->" + balance);
		return decode;
	}

	private void doAndWait(String message, DoAndWaitOneTime<?> action) throws InterruptedException, ExecutionException {
		System.out.println(message);
		doAndWait(action);
	}

	private void doAndWait(DoAndWaitOneTime<?> action) throws InterruptedException, ExecutionException {
		int timeOut = 0;
		if (!action.isDone()) {
			action.doIt().get();
			while (!action.isDone() && timeOut++ < 200)
				synchronized (this) {
					System.out.print(".");
					wait(millis);
				}
		}
		System.out.println();
		if (timeOut >= 200)
			System.out.println("Timeout:" + action);
	}

	private static Options createOptions() {
		Options options = new Options();

		
		options.addOption(Option//
				.builder("de")//
				.desc("Don't exit the programm.")//
				.longOpt("dontExit")//
				.hasArg(false)//
				.build());
		options.addOption(Option//
				.builder("f")//
				.desc("Set the contract source or the compiled json.")//
				.longOpt("file")//
				.hasArg(true)//
				.argName("file alreadyCompiled").numberOfArgs(2).build());
		options.addOption(Option//
				.builder("sk")//
				.desc("Set the sender key file.")//
				.longOpt("senderKey")//
				.hasArg(true)//
				.argName("keyFile")//
				.numberOfArgs(1).build());
		options.addOption(Option//
				.builder("sp")//
				.desc("Set the pass of the key of the sender.")//
				.longOpt("senderPass")//
				.hasArg(true)//
				.argName("password").numberOfArgs(1).build());
		options.addOption(Option//
				.builder("millis")//
				.desc("The millisec to wait between checking the action.")//
				.hasArg(true)//
				.argName("millisec").numberOfArgs(1).build());

		OptionGroup actionOptionGroup = new OptionGroup();
		actionOptionGroup.setRequired(true);
		actionOptionGroup.addOption(Option.builder("h")//
				.desc("show help and usage")//
				.hasArg(false).build());
		actionOptionGroup.addOption(Option.builder("c")//
				.desc("Deploys the contract on the blockchain").longOpt("create")//
				.hasArg(true)//
				.numberOfArgs(2)//
				.argName("paymenAddress, name")//
				.build());
		actionOptionGroup.addOption(Option.builder("l")//
				.desc("List contract data")//
				.hasArg()//
				.argName("contractAddress")//
				.build()//
		);
		actionOptionGroup.addOption(Option.builder("cic")//
				.desc("Create issuer contract. The price is in Finney")//
				.hasArg()//
				.numberOfArgs(6)//
				.argName("contractAddress, itemName, textHash, url, lifeTime, price")//
				.build()//
		);
		actionOptionGroup.addOption(Option.builder("bli")//
				.desc("Buy license for address.")//
				.hasArg()//
				.numberOfArgs(3)//
				.argName("issuerAddress, name, address")//
				.build()//
		);
		actionOptionGroup.addOption(Option.builder("v")//
				.desc("Verify a licence.")//
				.hasArg()//
				.numberOfArgs(3)//
				.argName("issuerAddress, name, address")//
				.build()//
		);

		options.addOptionGroup(actionOptionGroup);
		return options;
	}

	/**
	 * @param options
	 */
	private static void printHelp(Options options) {
		System.out.println("used EthereumFacadeProvider:" + System.getProperty("EthereumFacadeProvider") + "\n\n");

		StringBuffer buffer = new StringBuffer();
		buffer.append("change the ethereum client via -DEthereumFacadeProvider=<type>\n")//
				.append("type : main - the main net\n")//
				.append("       test - the test net\n")//
				.append("       ropsten - the ropsten net\n")//
				.append("       private - the private net\n")//
				.append("       InfuraRopsten - the ropsten net via Infrua\n")//
				.append("       InfuraMain - the main net via Infrua\n")//
				.append("           -DapiKey=<key> - the the api key for the service\n")//
				.append("       rpc - connect via rpc\n")//
				.append("          -Drpc-url=<url> - the url of the rpc server\n")//
				.append("          -Dchain-id=<id> - the chain id (0 for the main chain and 3 for ropsten)\n")//
				.append("\n");

		HelpFormatter formatter = new HelpFormatter();
		String header = "\nA deployer and manager for for a version database on the blockchain. (c) Urs Zeidler 2017n";
		String footer = "\nexample: \n\n" + buffer.toString();
		formatter.printHelp(150, "checksum database on the blockchain", header, options, footer, true);
	}

	private static Byte[] toByteArray(byte[] byteArray) {
		List<Byte> asList = Bytes.asList(byteArray);
		return asList.toArray(new Byte[] {});
	}

	
	public void setMillis(long millis) {
		this.millis = millis;
	}

	public DeployDuo<LicenseManager> getLicenseManager() {
		return licenseManager;
	}

	public void setSender(EthAccount sender) {
		this.sender = sender;
	}

}
