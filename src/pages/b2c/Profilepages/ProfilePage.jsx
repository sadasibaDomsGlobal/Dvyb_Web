// // AccountPage.js
import React, { useState, useEffect, act } from "react";
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
        "my-model",
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

  
  // React.useEffect(() => {
  //   if (activeTab === "my-model") {
  //     // document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [activeTab]);

  return (
    <div className="relative flex   ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={`absolute ${activeTab === "my-tryon-gallery" ? 'w-250' : 'w-250'} left-64 w-250 flex-1 p-6 `}>
        {activeTab === "my-info" && <MyInfo userId={userId} />}
        {activeTab === "my-orders" && <MyOrders  />}
        {activeTab === "my-model" && <ProfileImage />}
        {activeTab === "wishlist" && <WishlistPage />}
        {activeTab === "my-tryon-gallery" && <TryOnGallery/>}
        {activeTab === "rewards" && <RewardsRedemption />}
        {activeTab === "refer-earn" && <ReferEarn />}
        {activeTab === "subscriptions" && <SubscriptionFlow />}
        
     
      </div>
    </div>
  );
};

export default ProfilePage;