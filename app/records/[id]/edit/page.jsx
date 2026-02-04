"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { RecordForm } from "@/components/features/forms/RecordForm";
import { useRouter } from "next/navigation";
import { getRecord, saveRecord } from "@/lib/storage";
import { FACE_ZONES } from "@/lib/constants";
import { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import mockData from "@/data/mockData.json";

export default function EditRecordPage({ params }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Load record data
        let found = getRecord(params.id);
        if (!found) {
            found = mockData.records.find((r) => r.id === params.id);
        }

        if (found) {
            setRecord(found);
        } else {
            setError("Không tìm thấy hồ sơ");
        }
        setLoading(false);
    }, [params.id]);

    const handleSave = (data, status) => {
        setIsSaving(true);
        setError("");

        try {
            const skinAnalysisArray = FACE_ZONES.map((zone) => ({
                zone: zone.id,
                zoneName: zone.name,
                ...data.skinAnalysis[zone.id],
            }));

            const updatedRecord = {
                id: record.id, // Keep existing ID
                imageUrl: data.image,
                personalInfo: data.personalInfo,
                skinAnalysis: skinAnalysisArray,
                additionalInfo: data.additionalInfo,
                status: status || "draft",
            };

            saveRecord(updatedRecord);

            setTimeout(() => {
                router.push(`/records/${record.id}`);
            }, 1000);
        } catch (err) {
            setError("Có lỗi xảy ra khi lưu dữ liệu");
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-pink-800/70 font-body">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error && !record) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-8 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
                        <button onClick={() => router.push("/records")} className="text-primary hover:underline">
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-8 pb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-heading font-bold text-textPrimary mb-2">Chỉnh sửa hồ sơ</h1>
                        <p className="text-pink-800/70">ID: {record.id}</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <RecordForm initialData={record} onSubmit={handleSave} isSaving={isSaving} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
