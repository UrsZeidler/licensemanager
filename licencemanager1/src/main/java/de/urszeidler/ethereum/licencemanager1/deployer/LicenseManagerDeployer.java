/**
 * 
 */
package de.urszeidler.ethereum.licencemanager1.deployer;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.keystore.FileSecureKey;
import org.adridadou.ethereum.keystore.SecureKey;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.EthValue;
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

	private EthereumFacade ethereum;
	private ContractsDeployer deployer;
	private long millis;
	private EthAccount sender;
	private DeployDuo<LicenseManager> licenseManager;

	private interface DoAndWaitOneTime<T> {
		boolean isDone();

		CompletableFuture<T> doIt();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Options options = createOptions();
		CommandLineParser parser = new DefaultParser();
		int returnValue = 0;
		try {
			CommandLine commandLine = parser.parse(options, args);
			if (commandLine.hasOption("h")) {
				printHelp(options);
				return;
			}

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

		System.exit(returnValue);
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
	 */
	public void createIssuerContract(String itemName, String textHash, String url, Integer lifeTime, Integer price)
			throws InterruptedException, ExecutionException {
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
		System.out.println("LicensManager: " + licenseManager.contractInstance.issuerName());
		System.out.println("Address: " + licenseManager.contractAddress);
		System.out.println("Payment Address: " + licenseManager.contractInstance.paymentAddress());
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
			sender = new EthAccount(ECKey.fromPrivate(BigInteger.valueOf(100000L)));
			millis = 100L;
		} else {
			sender = new EthAccount(
					ECKey.fromPrivate(Hex.decode("3ec771c31cac8c0dba77a69e503765701d3c2bb62435888d4ffa38fed60c445c")));
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

		// OptionGroup keyOptionGroup = new OptionGroup();
		// keyOptionGroup.setRequired(false);
		options.addOption(Option//
				.builder("f")//
				.desc("Set the contract source or the compiled json.")//
				.longOpt("file")//
				.hasArg()//
				.argName("file alreadyCompiled").numberOfArgs(2).build());

		options.addOption(Option//
				.builder("sk")//
				.desc("Set the sender key file.")//
				.longOpt("senderKey")//
				.hasArg()//
				.argName("keyFile")//
				.numberOfArgs(1).build());
		options.addOption(Option//
				.builder("sp")//
				.desc("Set the pass of the key of the sender.")//
				.longOpt("senderPass")//
				.hasArg()//
				.argName("password").numberOfArgs(1).build());
		options.addOption(Option//
				.builder("millis")//
				.desc("The millisec to wait between checking the action.")//
				.hasArg()//
				.argName("millisec").numberOfArgs(1).build());

		OptionGroup actionOptionGroup = new OptionGroup();
		actionOptionGroup.setRequired(true);
		actionOptionGroup.addOption(Option.builder("h")//
				.desc("show help and usage")//
				.hasArg(false).build());
		actionOptionGroup.addOption(Option.builder("c")//
				.desc("Deploys the contract on the blockchain").longOpt("create")//
				.hasArg()//
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

	public void setMillis(long millis) {
		this.millis = millis;
	}

	public DeployDuo<LicenseManager> getLicenseManager() {
		return licenseManager;
	}

}
