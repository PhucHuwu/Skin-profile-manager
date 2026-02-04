"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiEdit2, FiPrinter, FiDownload } from "react-icons/fi";
import { getRecord } from "@/lib/storage";
import mockData from "@/data/mockData.json";
import Link from "next/link";
import {
    SKIN_TYPES,
    ACNE_LEVELS,
    REDNESS_LEVELS,
    PORE_SIZES,
    HYDRATION_LEVELS,
    ELASTICITY_LEVELS,
    WRINKLE_LEVELS,
    PIGMENTATION_LEVELS,
    SENSITIVITY_LEVELS,
} from "@/lib/constants";

export default function RecordDetailPage({ params }) {
    const router = useRouter();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get from localStorage first
        let found = getRecord(params.id);

        // If not in localStorage, check mock data
        if (!found) {
            found = mockData.records.find((r) => r.id === params.id);
        }

        if (found) {
            setRecord(found);
        }

        setLoading(false);
    }, [params.id]);

    const handlePrint = () => {
        window.print();
    };

    const getLabel = (value, options) => {
        const option = options.find((opt) => opt.value === value);
        return option ? option.label : value || "-";
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

    if (!record) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-heading font-bold text-textPrimary mb-4">Không tìm thấy hồ sơ</h1>
                        <Link href="/records" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                            <FiArrowLeft className="w-5 h-5" />
                            Quay lại danh sách
                        </Link>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/records"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-smooth cursor-pointer"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                            Quay lại
                        </Link>

                        <div className="flex gap-3">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-white/80 text-textPrimary border border-pink-200 hover:border-primary/50 rounded-xl transition-smooth cursor-pointer"
                            >
                                <FiPrinter className="w-4 h-4" />
                                In
                            </button>

                            <Link
                                href={`/records/${record.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-textPrimary rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                Chỉnh sửa
                            </Link>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Image Column */}
                        <div className="md:col-span-1">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden sticky top-8">
                                {record.imageUrl ? (
                                    <img src={record.imageUrl} alt={record.personalInfo?.name || "Khách hàng"} className="w-full h-auto" />
                                ) : (
                                    <div className="aspect-square bg-primary/5 flex items-center justify-center">
                                        <span className="text-primary/50 font-body">Không có ảnh</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Personal Info */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6">
                                <h2 className="text-2xl font-heading font-bold text-textPrimary mb-4">Thông tin khách hàng</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-pink-800/60 mb-1">Họ và tên</p>
                                        <p className="font-medium text-textPrimary">{record.personalInfo?.name || "Chưa cập nhật"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-pink-800/60 mb-1">Tuổi</p>
                                        <p className="font-medium text-textPrimary">{record.personalInfo?.age}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-pink-800/60 mb-1">Giới tính</p>
                                        <p className="font-medium text-textPrimary">
                                            {record.personalInfo?.gender === "female"
                                                ? "Nữ"
                                                : record.personalInfo?.gender === "male"
                                                  ? "Nam"
                                                  : record.personalInfo?.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-pink-800/60 mb-1">Trạng thái</p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                record.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {record.status === "completed" ? "Hoàn thành" : "Nháp"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Skin Analysis Table */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6">
                                <h2 className="text-2xl font-heading font-bold text-textPrimary mb-4">Phân tích da theo vùng</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-pink-200">
                                                <th className="text-left py-3 px-2 font-semibold text-textPrimary">Vùng</th>
                                                <th className="text-left py-3 px-2 font-semibold text-textPrimary">Loại da</th>
                                                <th className="text-left py-3 px-2 font-semibold text-textPrimary">Mụn</th>
                                                <th className="text-left py-3 px-2 font-semibold text-textPrimary">Đỏ</th>
                                                <th className="text-left py-3 px-2 font-semibold text-textPrimary">Lỗ chân lông</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.skinAnalysis?.map((zone, idx) => (
                                                <tr key={idx} className="border-b border-pink-100">
                                                    <td className="py-3 px-2 font-medium text-textPrimary">{zone.zoneName}</td>
                                                    <td className="py-3 px-2 text-pink-800/70">{getLabel(zone.skinType, SKIN_TYPES)}</td>
                                                    <td className="py-3 px-2 text-pink-800/70">{getLabel(zone.acneLevel, ACNE_LEVELS)}</td>
                                                    <td className="py-3 px-2 text-pink-800/70">{getLabel(zone.rednessLevel, REDNESS_LEVELS)}</td>
                                                    <td className="py-3 px-2 text-pink-800/70">{getLabel(zone.poreSize, PORE_SIZES)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6">
                                <h2 className="text-2xl font-heading font-bold text-textPrimary mb-4">Thông tin bổ sung</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Độ ẩm da</p>
                                            <p className="font-medium text-textPrimary">{getLabel(record.additionalInfo?.hydrationLevel, HYDRATION_LEVELS)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Độ đàn hồi</p>
                                            <p className="font-medium text-textPrimary">{getLabel(record.additionalInfo?.elasticity, ELASTICITY_LEVELS)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Nếp nhăn</p>
                                            <p className="font-medium text-textPrimary">{getLabel(record.additionalInfo?.wrinkles, WRINKLE_LEVELS)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Sắc tố/Nám</p>
                                            <p className="font-medium text-textPrimary">{getLabel(record.additionalInfo?.pigmentation, PIGMENTATION_LEVELS)}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-sm text-pink-800/60 mb-1">Độ nhạy cảm</p>
                                            <p className="font-medium text-textPrimary">{getLabel(record.additionalInfo?.sensitivity, SENSITIVITY_LEVELS)}</p>
                                        </div>
                                    </div>

                                    {record.additionalInfo?.allergyHistory && (
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Tiền sử dị ứng</p>
                                            <p className="text-textPrimary">{record.additionalInfo.allergyHistory}</p>
                                        </div>
                                    )}

                                    {record.additionalInfo?.currentProducts && (
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Sản phẩm đang sử dụng</p>
                                            <p className="text-textPrimary">{record.additionalInfo.currentProducts}</p>
                                        </div>
                                    )}

                                    {record.additionalInfo?.notes && (
                                        <div>
                                            <p className="text-sm text-pink-800/60 mb-1">Ghi chú</p>
                                            <p className="text-textPrimary">{record.additionalInfo.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="text-sm text-pink-600/50 text-center">
                                <p>ID: {record.id}</p>
                                {record.createdAt && <p>Tạo lúc: {new Date(record.createdAt).toLocaleString("vi-VN")}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
