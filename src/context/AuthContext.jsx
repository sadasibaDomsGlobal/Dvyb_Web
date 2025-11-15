// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged, onIdTokenChanged, signOut  } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // current ID token
  const [userRole, setUserRole] = useState(null); // "B2C" | "B2B" | null
  const [loading, setLoading] = useState(true);

  // --- Listen for login/logout (auth state) ---
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);

      // Resolve role whenever user changes
      if (firebaseUser) {
        try {
          // Check B2C
          const b2cSnap = await getDoc(doc(db, "b2c_users", firebaseUser.uid));
          if (b2cSnap.exists() && b2cSnap.data()?.role === "B2C") {
            setUserRole("B2C");
          } else {
            // Check B2B
            const b2bSnap = await getDoc(doc(db, "B2BBulkOrders_users", firebaseUser.uid));
            if (b2bSnap.exists() && b2bSnap.data()?.role === "B2B") {
              setUserRole("B2B");
            } else {
              setUserRole(null);
            }
          }
        } catch (e) {
          console.error("Error fetching role:", e);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubAuth();
  }, []);

  // --- Keep ID token fresh in real-time & store in sessionStorage ---
  useEffect(() => {
    // Clear any stale token on mount
    sessionStorage.removeItem("authToken");
    setToken(null);

    const unsubToken = onIdTokenChanged(auth, async (u) => {
      if (u) {
        try {
        
          const fresh = await u.getIdToken();
          setToken(fresh);
          sessionStorage.setItem("authToken", fresh); 
        } catch (e) {
          console.error("Failed to get ID token:", e);
          setToken(null);
          sessionStorage.removeItem("authToken");
        }
      } else {
        setToken(null);
        sessionStorage.removeItem("authToken");
      }
    });

    return () => unsubToken();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } finally {
      sessionStorage.removeItem("authToken");
      alert("lggedout")
      setToken(null);
      setUserRole(null);
    }
  };

  const value = useMemo(
    () => ({ user, userRole, token, loading,  signOutUser }),
    [user, userRole, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
















// // src/context/AuthContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../config/firebaseConfig"; // ← Use your new config
// import { doc, getDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [userRole, setUserRole] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
//             if (firebaseUser) {
//                 setUser(firebaseUser);

//                 try {
//                     // Check b2c
//                     const b2cDoc = await getDoc(doc(db, "b2c_users", firebaseUser.uid));
//                     if (b2cDoc.exists() && b2cDoc.data().role === "b2c") {
//                         setUserRole("b2c");
//                     } else {
//                         // Check B2B
//                         const b2bDoc = await getDoc(doc(db, "B2BBulkOrders_users", firebaseUser.uid));
//                         if (b2bDoc.exists() && b2bDoc.data().role === "B2B") {
//                             setUserRole("B2B");
//                         } else {
//                             setUserRole(null);
//                         }
//                     }
//                 } catch (err) {
//                     console.error("Auth role error:", err);
//                     setUserRole(null);
//                 }
//             } else {
//                 setUser(null);
//                 setUserRole(null);
//             }
//             setLoading(false);
//         });

//         return unsubscribe;
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, userRole, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);