import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig"; 
import { getAuth, signOut } from "firebase/auth";
import b2clogo from "../../../assets/Navbar/B2cLogo.png";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaCamera,
  FaImages,
  FaHeart,
  FaTrophy,
  FaShareAlt,
  FaRupeeSign,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const menu = [
    { id: "my-info", label: "My info", icon: <FaUser /> },
    { id: "my-orders", label: "My orders", icon: <FaShoppingBag /> },
    // { id: "my-model", label: "My Model", icon: <FaCamera /> },
    { id: "my-tryon-gallery", label: "My Try-On Gallery", icon: <FaImages /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    // { id: "rewards", label: "Rewards", icon: <FaTrophy /> },
    // { id: "refer-earn", label: "Refer & Earn", icon: <FaShareAlt /> },
    // { id: "subscriptions", label: "Subscriptions", icon: <FaRupeeSign /> },
  ];

  // ✅ Fetch user data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
        } else {
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setData(snap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/B2c-login"; // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-50 p-4 fixed left-0 top-0">
           {/* <img src={b2clogo} 
           alt="logo" 
           className="h-5 sm:h-6 md:h-6 mb-2 object-contain cursor-pointer" 
          onClick={() => navigate("/")}
           /> */}
        {/* <h2 className="text-lg font-bold mb-6">
          Hello {data?.name || "User"}
        </h2> */}
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer flex items-center gap-3 p-2 rounded-md mb-2 transition ${
                activeTab === item.id
                  ? "text-primary font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {/* {item.icon} */}
              {item.label}
            </li>
          ))}

          {/* Logout */}
          <li
            onClick={() => setShowLogoutModal(true)}
            className="cursor-pointer flex items-center gap-3  rounded-md mt-2 p-2 text-red-600 hover:bg-red-50"
          >
            {/* <FaSignOutAlt /> */}
            Logout
          </li>
        </ul>
      </div>

      {/* ✅ Logout Confirmation Modal - Moved outside and with higher z-index */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-80 text-center mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to Log Out?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;