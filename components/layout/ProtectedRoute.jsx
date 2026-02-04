"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const auth = sessionStorage.getItem("isAuthenticated");

            if (auth !== "true") {
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }

            setIsChecking(false);
        };

        checkAuth();
    }, [router, pathname]);

    // Show loading while checking auth
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-pink-800/70 font-body">Đang kiểm tra...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return children;
}
