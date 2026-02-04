"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { RecordForm } from "@/components/features/forms/RecordForm";
import { useRouter } from "next/navigation";
import { saveRecord } from "@/lib/storage";
import { FACE_ZONES } from "@/lib/constants";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function NewRecordPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSave = (data, status) => {
        setIsSaving(true);
        setError("");

        try {
            // Transform skinAnalysis to array format
            const skinAnalysisArray = FACE_ZONES.map((zone) => ({
                zone: zone.id,
                zoneName: zone.name,
                ...data.skinAnalysis[zone.id],
            }));

            const record = {
                imageUrl: data.image,
                personalInfo: data.personalInfo,
                skinAnalysis: skinAnalysisArray,
                additionalInfo: data.additionalInfo,
                status,
            };

            saveRecord(record);

            // Redirect to records list
            setTimeout(() => {
                router.push("/records");
            }, 1000);
        } catch (err) {
            setError("Có lỗi xảy ra khi lưu dữ liệu");
            setIsSaving(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-background via-pink-50 to-purple-50 p-4 md:p-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-heading font-bold text-textPrimary mb-2">Tạo hồ sơ mới</h1>
                        <p className="text-pink-800/70">Nhập liệu theo từng bước để tạo hồ sơ khách hàng</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <RecordForm onSubmit={handleSave} isSaving={isSaving} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
