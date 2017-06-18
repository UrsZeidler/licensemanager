package de.urszeidler.ethereum.licencemanager1.contracts;

import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuer.*;

/**
 * The Event Objects for the event LicenseIssued(org.adridadou.ethereum.propeller.values.EthAddress ownerAddress,String name,Boolean succesful).
 *
 */
public class EventLicenseIssued_address_string_bool{
	private org.adridadou.ethereum.propeller.values.EthAddress ownerAddress;
	private String name;
	private Boolean succesful;

	public EventLicenseIssued_address_string_bool(org.adridadou.ethereum.propeller.values.EthAddress ownerAddress,String name,Boolean succesful) {
		super();
		this.ownerAddress = ownerAddress;
		this.name = name;
		this.succesful = succesful;
	}

	/**
	 * Getter for ownerAddress.
	 * @return
	 */
	public org.adridadou.ethereum.propeller.values.EthAddress getOwnerAddress(){
		return ownerAddress;
	}

	/**
	 * Getter for name.
	 * @return
	 */
	public String getName(){
		return name;
	}

	/**
	 * Getter for succesful.
	 * @return
	 */
	public Boolean getSuccesful(){
		return succesful;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ownerAddress == null) ? 0 : ownerAddress.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((succesful == null) ? 0 : succesful.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EventLicenseIssued_address_string_bool other = (EventLicenseIssued_address_string_bool) obj;
		if (ownerAddress == null) {
			if (other.ownerAddress != null)
				return false;
		} else if (!ownerAddress.equals(other.ownerAddress))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (succesful == null) {
			if (other.succesful != null)
				return false;
		} else if (!succesful.equals(other.succesful))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "EventLicenseIssued_address_string_bool [ownerAddress=" + ownerAddress + ",name=" + name + ",succesful=" + succesful + "]";
	}
}
