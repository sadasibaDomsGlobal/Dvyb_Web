// handleSuccess.js

export const handleSuccess = (navigate) => async (user) => {
  try {
    const idToken = await user.getIdToken(true);

    // ✅ Most secure: tell backend to set httpOnly cookie
    await fetch("/api/auth/set-cookie", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    // ✅ SPA fallback (optional)
    sessionStorage.setItem("authToken", idToken);

    // ✅ No token listener here (kept in AuthProvider)

    navigate("/dashboard");
  } catch (err) {
    console.error("Token storage failed:", err);
    await auth.signOut();
  }
};
