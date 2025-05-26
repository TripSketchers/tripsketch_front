import { useEffect, useState } from "react";
import { auth } from "../api/Firebase/Firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

export function useFirebaseAuth() {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [firebaseClaims, setFirebaseClaims] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("user changed", user);
            setFirebaseUser(user);
            if (user) {
                const tokenResult = await getIdTokenResult(user);
                setFirebaseClaims(tokenResult.claims);
            } else {
                setFirebaseClaims(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { firebaseUser, firebaseClaims, loading };
}

export default useFirebaseAuth;
