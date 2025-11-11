// ProfilePage.js
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Sidebar from '../../../components/B2C/ProfilePage/Sidebar';
import MyInfo from "../../../components/B2C/ProfilePage/MyInfo";
import ProfileImage from "../../../components/B2C/ProfilePage/PhotoManager";
import MyOrders from "../../../components/B2C/ProfilePage/Orders";
import { WishlistPage } from "../WishlistPage/WishlistPage";
import TryOnGallery from "../../../components/B2C/ProfilePage/TryOnGallery";
// import RewardsRedemption from "../../B2C/B2CComponents/RewardsRedemption";
// import ReferEarn from "../../B2C/B2CComponents/ReferEarn";
// import SubscriptionFlow from "../../B2C/B2CComponents/SubscriptionFlow";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("my-info");
  const userId = "USER_ID_HERE"; // Replace with Firebase Auth UID
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      const validTabs = [
        "my-info",
        "my-orders",
        "wishlist",
        "my-tryon-gallery",
        "rewards",
        "refer-earn",
        "subscriptions",
      ];
      if (validTabs.includes(tabFromUrl)) {
        setActiveTab(tabFromUrl);
      } else {
        setActiveTab("my-info"); // Default to my-info if tab is invalid
      }
    }
  }, [location.search, searchParams]);

  return (
    <div className="flex min-h-screen mt-32 bg-gray-50">
      {/* Fixed Sidebar - handles its own positioning */}
      <Sidebar  activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area - offset by sidebar width */}
      <div className="flex-1 ml-64 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeTab === "my-info" && <MyInfo userId={userId} />}
          {activeTab === "my-orders" && <MyOrders />}
          {activeTab === "wishlist" && <WishlistPage />}
          {activeTab === "my-tryon-gallery" && <TryOnGallery />}
          {/* Uncomment when components are ready */}
          {/* {activeTab === "rewards" && <RewardsRedemption />}
          {activeTab === "refer-earn" && <ReferEarn />}
          {activeTab === "subscriptions" && <SubscriptionFlow />} */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;