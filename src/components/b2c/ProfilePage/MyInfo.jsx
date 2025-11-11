import React, { useState, useEffect } from "react";
import { Edit2, Plus, X } from "lucide-react";

// Mock Auth Context for demo
const useAuth = () => ({ user: { uid: "demo-user" } });

const MyInfo = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    name: "sandeep",
    email: "",
    phone: "9705088960",
    addresses: [
      {
        id: 1,
        type: "Home",
        firstName: "Raju",
        lastName: "",
        email: "0949367840",
        address: "48 Maplestreet Avenue, Jovena form St. Mary's Church, near Oak Street, GreenField",
        city: "",
        stateProvince: "",
        zipPostalCode: "",
        country: "",
        isDefault: false
      },
      {
        id: 2,
        type: "Home",
        firstName: "Raju",
        lastName: "",
        email: "1244267020",
        address: "48 Maplestreet Avenue, Jovena form St. Mary's Church, near Oak Street, GreenField",
        city: "",
        stateProvince: "",
        zipPostalCode: "",
        country: "",
        isDefault: false
      },
      {
        id: 3,
        type: "Home",
        firstName: "Raju",
        lastName: "",
        email: "0949367840",
        address: "48 Maplestreet Avenue, Jovena form St. Mary's Church, near Oak Street, GreenField",
        city: "",
        stateProvince: "",
        zipPostalCode: "",
        country: "",
        isDefault: false
      },
      {
        id: 4,
        type: "Home",
        firstName: "Raju",
        lastName: "",
        email: "1244267020",
        address: "48 Maplestreet Avenue, Jovena form St. Mary's Church, near Oak Street, GreenField",
        city: "",
        stateProvince: "",
        zipPostalCode: "",
        country: "",
        isDefault: false
      }
    ]
  });
  const [isPhoneUser, setIsPhoneUser] = useState(false);
  const [collectionName, setCollectionName] = useState("b2c_users");
  const [editUserMode, setEditUserMode] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    stateProvince: "",
    zipPostalCode: "",
    country: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveUserData = async () => {
    // Your existing saveData logic here
    console.log("Saving user data:", data);
    setEditUserMode(false);
    alert("Profile updated successfully!");
  };

  const addAddress = async () => {
    if (!newAddress.firstName || !newAddress.address) {
      alert("Please fill in required fields");
      return;
    }

    const addressWithId = { 
      ...newAddress, 
      id: Date.now(),
      type: "Home",
      isDefault: false 
    };
    
    setData(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), addressWithId]
    }));

    setNewAddress({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      country: ""
    });
    setShowAddAddress(false);
  };

  const removeAddress = async (addressToRemove) => {
    setData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== addressToRemove.id)
    }));
  };

  const setDefaultAddress = async (addressToSetDefault) => {
    const updatedAddresses = data.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressToSetDefault.id
    }));

    setData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>
  );

  // User Details Edit Modal
  if (editUserMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>

            <div>
              <input
                name="phone"
                value={data.phone}
                onChange={handleChange}
                disabled={!isPhoneUser}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isPhoneUser ? 'bg-gray-50' : ''}`}
                placeholder="Phone"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={saveUserData}
                className="flex-1 bg-red-700 text-white py-2.5 rounded hover:bg-red-800 font-medium"
              >
                Save
              </button>
              <button
                onClick={() => setEditUserMode(false)}
                className="flex-1 bg-white text-gray-700 py-2.5 rounded border border-gray-300 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add Address Modal
if (showAddAddress) {
  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Your Shipping Address
          </h2>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-2 gap-7">
          {/* Row 1 */}
          <div className="relative border border-dotted border-gray-400 px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={newAddress.firstName}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={newAddress.lastName}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          {/* Row 2 */}
          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={newAddress.email}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              Zip / Postal Code
            </label>
            <input
              type="text"
              name="zipPostalCode"
              value={newAddress.zipPostalCode}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          {/* Row 3 */}
          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              State / Province
            </label>
            <input
              type="text"
              name="stateProvince"
              value={newAddress.stateProvince}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
            />
          </div>

          {/* Row 4 */}
          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              Landmark / Bridge Nearby
            </label>
            <textarea
              name="landmark"
              value={newAddress.landmark}
              onChange={handleNewAddressChange}
              rows="2"
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900 resize-none"
            />
          </div>

          <div className="relative border border-dotted border-gray-400  px-3 pt-3 pb-1">
            <label className="absolute -top-2 left-3 bg-white text-gray-500 text-xs px-1">
              Country
            </label>
            <select
              name="country"
              value={newAddress.country}
              onChange={handleNewAddressChange}
              className="w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-900 bg-transparent"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-6 col-span-2">
            <button
              onClick={addAddress}
              className="flex-1 bg-red-700 text-white py-2.5 rounded hover:bg-red-800 font-medium"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddAddress(false)}
              className="flex-1 bg-white text-gray-700 py-2.5 rounded border border-gray-300 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


  // Main View
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* User Details Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-base font-semibold text-gray-900">User Details</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-3 mb-4">
              <input
                value={data.name}
                disabled
                className="w-full px-3 py-2.5 border border-gray-200 rounded bg-gray-50 text-gray-700 text-sm"
              />
              <input
                value={data.phone}
                disabled
                className="w-full px-3 py-2.5 border border-gray-200 rounded bg-gray-50 text-gray-700 text-sm"
              />
            </div>
            
            <button
              onClick={() => setEditUserMode(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Address</h2>
            <button
              onClick={() => setShowAddAddress(true)}
              className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              <Plus size={18} />
              Add New
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.addresses && data.addresses.length > 0 ? (
                data.addresses.map((address) => (
                  <div key={address.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{address.firstName}</h3>
                        <p className="text-sm text-gray-600">{address.email}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {address.address}
                    </p>

                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 font-medium">
                        Home
                      </button>
                      <button
                        onClick={() => setDefaultAddress(address)}
                        className="px-4 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Set Default Address
                      </button>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => removeAddress(address)}
                        className="text-sm text-gray-600 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                      <button className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  <p className="text-sm">No addresses added yet</p>
                  <p className="text-xs mt-1">Click "Add New" to add your first address</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;