"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiHeart, FiHome, FiGrid, FiFileText, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TutorialGuide } from "@/components/features/tutorial/TutorialGuide";

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const auth = sessionStorage.getItem("isAuthenticated");
        const user = sessionStorage.getItem("username");
        setIsAuthenticated(auth === "true");
        setUsername(user || "");
    }, [pathname]);

    const handleLogout = () => {
        sessionStorage.clear();
        router.push("/login");
    };

    // State for tutorial
    const [runTutorial, setRunTutorial] = useState(false);

    const startTutorial = () => {
        setRunTutorial(true);
    };

    const handleTutorialFinish = () => {
        setRunTutorial(false);
    };

    // Don't show header on login page
    if (pathname === "/login") {
        return null;
    }

    return (
        <header className="bg-white/90 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                            <FiHeart className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-heading font-bold text-lg text-textPrimary">Skin Profile Manager</span>
                    </Link>

                    {/* Navigation */}
                    {isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="/"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth cursor-pointer ${
                                    pathname === "/" ? "bg-primary/10 text-primary" : "text-pink-800/70 hover:bg-primary/5 hover:text-primary"
                                }`}
                            >
                                <FiHome className="w-4 h-4" />
                                <span className="font-medium">Trang chủ</span>
                            </Link>

                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth cursor-pointer ${
                                    pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-pink-800/70 hover:bg-primary/5 hover:text-primary"
                                }`}
                            >
                                <FiGrid className="w-4 h-4" />
                                <span className="font-medium">Dashboard</span>
                            </Link>

                            <Link
                                href="/records"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth cursor-pointer ${
                                    pathname?.startsWith("/records") ? "bg-primary/10 text-primary" : "text-pink-800/70 hover:bg-primary/5 hover:text-primary"
                                }`}
                            >
                                <FiFileText className="w-4 h-4" />
                                <span className="font-medium">Hồ sơ</span>
                            </Link>
                        </nav>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={startTutorial}
                            className="flex items-center gap-2 px-4 py-2 text-pink-800/70 hover:bg-primary/5 hover:text-primary rounded-lg transition-smooth cursor-pointer"
                        >
                            <FiHelpCircle className="w-4 h-4" />
                            <span className="hidden sm:inline font-medium">Hướng dẫn</span>
                        </button>

                        {isAuthenticated && (
                            <>
                                <span className="hidden sm:block text-sm text-pink-800/60">{username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-smooth cursor-pointer"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span className="font-medium">Đăng xuất</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <TutorialGuide run={runTutorial} onFinish={handleTutorialFinish} />
        </header>
    );
}
