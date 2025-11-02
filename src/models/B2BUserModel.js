/**
 * B2B User Model
 * Represents a bulk order business client.
 */
export class B2BUserModel {
  constructor({
    uid,
    email = null,
    phoneNumber = null,
    companyName = "",
    contactPerson = "",
    gstNumber = "",
    businessAddress = "",
    businessType = "",
    orders = [],
    logo = "",
    extraData = {},
  }) {
    this.uid = uid;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.companyName = companyName;
    this.contactPerson = contactPerson;
    this.gstNumber = gstNumber;
    this.businessAddress = businessAddress;
    this.businessType = businessType;
    this.orders = orders;
    this.logo = logo;
    this.role = "B2B";
    this.extraData = extraData;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
