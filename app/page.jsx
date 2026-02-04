"use client";

import Link from "next/link";
import { FiHeart, FiGrid, FiFileText, FiHelpCircle } from "react-icons/fi";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Icon Header */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-soft">
                            <FiHeart className="w-16 h-16 text-primary" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-textPrimary mb-6">Skin Profile Manager</h1>

                    <p className="text-xl md:text-2xl text-pink-900/70 font-body mb-4">Hệ thống thu thập dữ liệu tình trạng da mặt</p>

                    <p className="text-lg text-pink-800/60 max-w-2xl mx-auto mb-12">
                        Ghi nhận và quản lý thông tin da một cách chuyên nghiệp, phục vụ cho phân tích và chăm sóc khách hàng tốt nhất.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            href="/login"
                            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                        >
                            Đăng nhập
                        </Link>

                        <button className="bg-white/80 hover:bg-white text-textPrimary px-8 py-4 rounded-xl font-semibold text-lg shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer border border-primary/20">
                            <span className="flex items-center justify-center gap-2">
                                <FiHelpCircle className="w-5 h-5" />
                                Hướng dẫn
                            </span>
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer">
                        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <FiFileText className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-textPrimary mb-2">Phân tích chi tiết</h3>
                        <p className="text-pink-800/70 font-body">Đánh giá tình trạng da theo 6 vùng trên khuôn mặt với các tiêu chí chuyên sâu</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer">
                        <div className="bg-secondary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <FiGrid className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-textPrimary mb-2">Dashboard trực quan</h3>
                        <p className="text-pink-800/70 font-body">Thống kê và biểu đồ phân tích dữ liệu khách hàng một cách dễ hiểu</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer">
                        <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <FiHeart className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-textPrimary mb-2">Lưu trữ an toàn</h3>
                        <p className="text-pink-800/70 font-body">Dữ liệu được lưu trữ cục bộ, đảm bảo quyền riêng tư và bảo mật</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 text-pink-800/50 font-body">
                <p>© 2026 Skin Profile Manager - Demo Application</p>
            </footer>
        </div>
    );
}
