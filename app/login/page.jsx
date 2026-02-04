"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiUser, FiHeart } from "react-icons/fi";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Demo authentication
        setTimeout(() => {
            if (username === "admin" && password === "123") {
                // Lưu authentication state
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("username", username);

                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng");
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full shadow-soft mb-4">
                        <FiHeart className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-textPrimary">Skin Profile Manager</h1>
                    <p className="text-pink-800/70 font-body mt-2">Đăng nhập để tiếp tục</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-textPrimary mb-2">
                                Tên đăng nhập
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-textPrimary mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50"
                                    placeholder="●●●"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-semibold py-3 px-6 rounded-xl shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-pink-200">
                        <p className="text-sm text-pink-600/70 text-center">
                            <strong>Demo:</strong> admin / 123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
