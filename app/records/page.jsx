"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiFileText, FiDownload } from "react-icons/fi";
import { getRecords, deleteRecord } from "@/lib/storage";
import { calculateStats } from "@/lib/dataUtils";
import { exportToJSON } from "@/lib/exportUtils";
import mockData from "@/data/mockData.json";

export default function RecordsPage() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load mock data + local data
        const localRecords = getRecords();
        const allRecords = [...mockData.records, ...localRecords];
        setRecords(allRecords);
        setLoading(false);
    }, []);

    const handleExport = () => {
        const stats = calculateStats(records);
        const dataToExport = {
            records: records,
            stats: stats,
            summary: {
                total: records.length,
                generatedAt: new Date().toISOString(),
            },
        };
        exportToJSON(dataToExport, "skin-profile-all-records");
    };

    const handleDelete = (id) => {
        if (confirm("Bạn có chắc muốn xóa hồ sơ này?")) {
            deleteRecord(id);
            // Reload records
            const localRecords = getRecords();
            const allRecords = [...mockData.records, ...localRecords];
            setRecords(allRecords);
        }
    };

    const getStatusBadge = (status) => {
        if (status === "completed") {
            return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Hoàn thành</span>;
        }
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Nháp</span>;
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-pink-800/70 font-body">Đang tải...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-textPrimary">Hồ sơ khách hàng</h1>
                            <p className="text-pink-800/70 mt-2">Tổng số: {records.length} hồ sơ</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-white text-primary border border-primary/20 hover:bg-pink-50 px-6 py-3 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                            >
                                <FiDownload className="w-5 h-5" />
                                Xuất JSON
                            </button>

                            <Link
                                href="/records/new"
                                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                            >
                                <FiPlus className="w-5 h-5" />
                                Tạo hồ sơ mới
                            </Link>
                        </div>
                    </div>

                    {records.length === 0 ? (
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-12 text-center">
                            <FiFileText className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                            <p className="text-pink-800/70 font-body text-lg mb-4">Chưa có hồ sơ nào</p>
                            <Link
                                href="/records/new"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                            >
                                <FiPlus className="w-5 h-5" />
                                Tạo hồ sơ đầu tiên
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {records.map((record) => (
                                <div
                                    key={record.id}
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-soft-hover transition-smooth overflow-hidden group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-primary/5 overflow-hidden">
                                        {record.imageUrl ? (
                                            <img src={record.imageUrl} alt={record.personalInfo?.name || "Khách hàng"} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FiFileText className="w-16 h-16 text-primary/30" />
                                            </div>
                                        )}

                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3">{getStatusBadge(record.status)}</div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-heading font-semibold text-lg text-textPrimary mb-2 truncate">
                                            {record.personalInfo?.name || "Chưa có tên"}
                                        </h3>

                                        <div className="space-y-1 text-sm text-pink-800/70 mb-4">
                                            <p>Tuổi: {record.personalInfo?.age || "N/A"}</p>
                                            <p>Giới tính: {record.personalInfo?.gender || "N/A"}</p>
                                            <p className="text-xs text-pink-600/50">ID: {record.id}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/records/${record.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-smooth cursor-pointer"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                <span className="text-sm font-medium">Xem</span>
                                            </Link>

                                            <Link
                                                href={`/records/${record.id}/edit`}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/20 text-textPrimary hover:bg-secondary hover:text-white rounded-lg transition-smooth cursor-pointer"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                                <span className="text-sm font-medium">Sửa</span>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(record.id)}
                                                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-smooth cursor-pointer"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
