package de.urszeidler.ethereum.licencemanager1.contracts;

import de.urszeidler.ethereum.licencemanager1.contracts.LicenseIssuer.*;

/**
 * The dataholder for the struct LicenseIssuerIssuedLicense.
 *
 */
public class LicenseIssuerIssuedLicense{
	private org.adridadou.ethereum.propeller.values.EthAddress licenseOwnerAdress;
	private String licenseOwnerName;
	private Integer issuedDate;

	public LicenseIssuerIssuedLicense(org.adridadou.ethereum.propeller.values.EthAddress licenseOwnerAdress,String licenseOwnerName,Integer issuedDate) {
		super();
		this.licenseOwnerAdress = licenseOwnerAdress;
		this.licenseOwnerName = licenseOwnerName;
		this.issuedDate = issuedDate;
	}

	/**
	 * Getter for licenseOwnerAdress.
	 * @return
	 */
	public org.adridadou.ethereum.propeller.values.EthAddress getLicenseOwnerAdress(){
		return licenseOwnerAdress;
	}

	/**
	 * Getter for licenseOwnerName.
	 * @return
	 */
	public String getLicenseOwnerName(){
		return licenseOwnerName;
	}

	/**
	 * Getter for issuedDate.
	 * @return
	 */
	public Integer getIssuedDate(){
		return issuedDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((licenseOwnerAdress == null) ? 0 : licenseOwnerAdress.hashCode());
		result = prime * result + ((licenseOwnerName == null) ? 0 : licenseOwnerName.hashCode());
		result = prime * result + ((issuedDate == null) ? 0 : issuedDate.hashCode());
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
		LicenseIssuerIssuedLicense other = (LicenseIssuerIssuedLicense) obj;
		if (licenseOwnerAdress == null) {
			if (other.licenseOwnerAdress != null)
				return false;
		} else if (!licenseOwnerAdress.equals(other.licenseOwnerAdress))
			return false;
		if (licenseOwnerName == null) {
			if (other.licenseOwnerName != null)
				return false;
		} else if (!licenseOwnerName.equals(other.licenseOwnerName))
			return false;
		if (issuedDate == null) {
			if (other.issuedDate != null)
				return false;
		} else if (!issuedDate.equals(other.issuedDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "LicenseIssuerIssuedLicense [licenseOwnerAdress=" + licenseOwnerAdress + ",licenseOwnerName=" + licenseOwnerName + ",issuedDate=" + issuedDate + "]";
	}
}
