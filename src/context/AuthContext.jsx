// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig"; // ← Use your new config
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                try {
                    // Check b2c
                    const b2cDoc = await getDoc(doc(db, "b2c_users", firebaseUser.uid));
                    if (b2cDoc.exists() && b2cDoc.data().role === "b2c") {
                        setUserRole("b2c");
                    } else {
                        // Check B2B
                        const b2bDoc = await getDoc(doc(db, "B2BBulkOrders_users", firebaseUser.uid));
                        if (b2bDoc.exists() && b2bDoc.data().role === "B2B") {
                            setUserRole("B2B");
                        } else {
                            setUserRole(null);
                        }
                    }
                } catch (err) {
                    console.error("Auth role error:", err);
                    setUserRole(null);
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);