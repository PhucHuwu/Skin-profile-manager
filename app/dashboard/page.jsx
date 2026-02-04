"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { calculateStats } from "@/lib/dataUtils";
import { exportToJSON } from "@/lib/exportUtils";
import { getRecords } from "@/lib/storage";
import mockData from "@/data/mockData.json";
import { useEffect, useState } from "react";
import { SkinTypeChart, AcneChart } from "@/components/features/dashboard/Charts";
import { FiDownload, FiUsers, FiCheckCircle, FiEdit3, FiPieChart } from "react-icons/fi";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allRecords, setAllRecords] = useState([]);

    useEffect(() => {
        // Combine mock data and local storage data
        const localRecords = getRecords();
        const combined = [...mockData.records, ...localRecords];
        setAllRecords(combined);

        // Calculate stats
        const calculatedStats = calculateStats(combined);
        setStats(calculatedStats);
        setLoading(false);
    }, []);

    const handleExport = () => {
        const dataToExport = {
            records: allRecords,
            stats: stats,
            summary: {
                total: stats.totalRecords,
                generatedAt: new Date().toISOString(),
            },
        };
        exportToJSON(dataToExport, "skin-profile-export");
    };

    if (loading || !stats) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-pink-800/70 font-body">Đang tải thống kê...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-textPrimary">Dashboard</h1>
                            <p className="text-pink-800/70 mt-2">Tổng quan dữ liệu và thống kê tình trạng da</p>
                        </div>

                        <button
                            onClick={handleExport}
                            className="flex items-center justify-center gap-2 bg-white hover:bg-pink-50 text-primary border border-primary/20 px-6 py-3 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                        >
                            <FiDownload className="w-5 h-5" />
                            Xuất dữ liệu JSON
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-100 p-3 rounded-xl">
                                    <FiUsers className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Tổng số</span>
                            </div>
                            <h3 className="text-3xl font-bold text-textPrimary">{stats.totalRecords}</h3>
                            <p className="text-pink-800/60 text-sm">Hồ sơ khách hàng</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-green-100 p-3 rounded-xl">
                                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-1 rounded-full">
                                    {((stats.completedRecords / stats.totalRecords) * 100).toFixed(0)}%
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-textPrimary">{stats.completedRecords}</h3>
                            <p className="text-pink-800/60 text-sm">Hồ sơ hoàn thành</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    <FiEdit3 className="w-6 h-6 text-yellow-600" />
                                </div>
                                <span className="text-xs font-semibold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">Nháp</span>
                            </div>
                            <h3 className="text-3xl font-bold text-textPrimary">{stats.draftRecords}</h3>
                            <p className="text-pink-800/60 text-sm">Đang thực hiện</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-100 p-3 rounded-xl">
                                    <FiPieChart className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-xs font-semibold bg-purple-50 text-purple-600 px-2 py-1 rounded-full">Trung bình</span>
                            </div>
                            <h3 className="text-3xl font-bold text-textPrimary">{stats.avgAge}</h3>
                            <p className="text-pink-800/60 text-sm">Tuổi trung bình</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <h3 className="text-xl font-heading font-semibold text-textPrimary mb-6">Phân bố loại da (Vùng trán)</h3>
                            <SkinTypeChart data={stats.skinTypeDistribution} />
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft">
                            <h3 className="text-xl font-heading font-semibold text-textPrimary mb-6">Tình trạng mụn nghiêm trọng nhất</h3>
                            <AcneChart data={stats.acneDistribution} />
                        </div>
                    </div>

                    {/* Additional Stats Section - Gender */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft md:col-span-1">
                            <h3 className="text-xl font-heading font-semibold text-textPrimary mb-6">Giới tính</h3>
                            <SkinTypeChart data={stats.genderDistribution} /> {/* Reuse Pie Chart for Gender */}
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-soft md:col-span-2 flex flex-col justify-center items-center text-center">
                            <div className="max-w-md">
                                <h3 className="text-xl font-heading font-semibold text-textPrimary mb-4">Insights</h3>
                                <p className="text-pink-800/70 mb-4">
                                    Dựa trên {stats.totalRecords} bản ghi, độ tuổi trung bình khách hàng là {stats.avgAge}. Phần lớn khách hàng có loại da{" "}
                                    {stats?.skinTypeDistribution?.[0]?.name?.toLowerCase() || "..."}
                                    và tình trạng mụn ở mức {stats?.acneDistribution?.[0]?.name?.toLowerCase() || "..."}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
