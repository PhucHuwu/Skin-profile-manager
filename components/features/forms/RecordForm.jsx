"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "@/components/features/upload/ImageUpload";
import { SkinAnalysisForm } from "@/components/features/analysis/SkinAnalysisForm";
import { AdditionalInfoForm } from "@/components/features/forms/AdditionalInfoForm";
import { FACE_ZONES } from "@/lib/constants";
import { FiSave, FiCheckCircle, FiChevronRight, FiChevronLeft, FiUser, FiActivity, FiFileText } from "react-icons/fi";

const STEPS = [
    { id: 1, title: "Thông tin chung", icon: FiUser },
    { id: 2, title: "Phân tích da", icon: FiActivity },
    { id: 3, title: "Thông tin bổ sung", icon: FiFileText },
];

export function RecordForm({ initialData, onSubmit, isSaving }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [image, setImage] = useState(initialData?.imageUrl || null);
    const [personalInfo, setPersonalInfo] = useState(
        initialData?.personalInfo || {
            name: "",
            age: "",
            gender: "",
        },
    );
    const [skinAnalysis, setSkinAnalysis] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState(
        initialData?.additionalInfo || {
            hydrationLevel: "",
            elasticity: "",
            wrinkles: "",
            pigmentation: "",
            sensitivity: "",
            allergyHistory: "",
            currentProducts: "",
            notes: "",
        },
    );

    // Init skin analysis from array to object if editing
    useEffect(() => {
        if (initialData?.skinAnalysis) {
            const analysisObj = {};
            initialData.skinAnalysis.forEach((zone) => {
                analysisObj[zone.zone] = {
                    skinType: zone.skinType,
                    acneLevel: zone.acneLevel,
                    rednessLevel: zone.rednessLevel,
                    poreSize: zone.poreSize,
                };
            });
            setSkinAnalysis(analysisObj);
        }
    }, [initialData]);

    const validateStep1 = () => {
        if (!image) return false;
        if (!personalInfo.age) return false;
        if (!personalInfo.gender) return false;
        return true;
    };

    const validateStep2 = () => {
        // Check if at least one zone analyzed or all? Requirement said "all zones" before but for low tech maybe just warn?
        // Let's stick to strict validation for now but maybe show visual cues
        for (const zone of FACE_ZONES) {
            if (!skinAnalysis[zone.id]?.skinType) return false;
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep === 1 && !validateStep1()) {
            alert("Vui lòng tải ảnh và điền đầy đủ thông tin bắt buộc (Tuổi, Giới tính)");
            return;
        }
        if (currentStep === 2 && !validateStep2()) {
            alert("Vui lòng phân tích đầy đủ các vùng da");
            return;
        }
        setCurrentStep((prev) => Math.min(prev + 1, 3));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = (status) => {
        // Final validation if jumping steps allowed (not allowed here so safe)
        const data = {
            image,
            personalInfo,
            skinAnalysis,
            additionalInfo,
        };
        onSubmit(data, status);
    };

    return (
        <div className="grid md:grid-cols-[250px_1fr] gap-6 items-start">
            {/* Sidebar Stepper */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-4 sticky top-20 z-40 max-md:mb-6 max-h-[calc(100vh-100px)] overflow-y-auto">
                <div className="flex md:flex-col items-start gap-2 max-md:overflow-x-auto max-md:pb-2">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div
                                key={step.id}
                                className="flex items-center gap-3 w-full p-2 rounded-xl transition-smooth relative group cursor-pointer"
                                onClick={() => (isCompleted || isActive) && setCurrentStep(step.id)}
                            >
                                {/* Connector Line (Mobile only usually, or simplified logic) */}
                                {/* For vertical sidebar, line is vertical. But simple list is better. */}

                                <div
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-smooth
                                        ${isActive || isCompleted ? "bg-primary text-white shadow-soft" : "bg-gray-100 text-gray-400"}
                                    `}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className={`text-sm font-semibold transition-smooth ${isActive ? "text-primary" : "text-gray-500"}`}>
                                        {step.title}
                                    </span>
                                    <span className="text-xs text-gray-400">Bước {step.id}</span>
                                </div>

                                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full hidden md:block" />}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-6">
                {/* Step Content */}
                <div className="min-h-[400px]">
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6">
                                    <h3 className="text-xl font-bold text-textPrimary mb-4">1. Ảnh khuôn mặt</h3>
                                    <ImageUpload value={image} onChange={setImage} />
                                </div>
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6">
                                    <h3 className="text-xl font-bold text-textPrimary mb-4">2. Thông tin khách hàng</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Họ tên</label>
                                            <input
                                                type="text"
                                                value={personalInfo.name}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Nhập họ tên"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Tuổi <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={personalInfo.age}
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                                                    className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    placeholder="VD: 25"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Giới tính <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={personalInfo.gender}
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                                                    className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                                                >
                                                    <option value="">Chọn...</option>
                                                    <option value="female">Nữ</option>
                                                    <option value="male">Nam</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-fadeIn">
                            <SkinAnalysisForm value={skinAnalysis} onChange={setSkinAnalysis} />
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-fadeIn">
                            <AdditionalInfoForm
                                personalInfo={personalInfo}
                                additionalInfo={additionalInfo}
                                onPersonalInfoChange={setPersonalInfo}
                                onAdditionalInfoChange={setAdditionalInfo}
                                showPersonalInfo={false}
                            />
                        </div>
                    )}
                </div>

                {/* Navigation Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-pink-200/50 sticky bottom-4 bg-white/95 backdrop-blur shadow-lg p-4 rounded-xl z-50">
                    {currentStep > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-6 py-3 text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-xl font-semibold transition-smooth"
                        >
                            <FiChevronLeft /> Quay lại
                        </button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {currentStep < 3 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth"
                        >
                            Tiếp theo <FiChevronRight />
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleSubmit("draft")}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-xl font-semibold transition-smooth"
                            >
                                <FiSave /> Lưu nháp
                            </button>
                            <button
                                onClick={() => handleSubmit("completed")}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-8 py-3 bg-accent text-white hover:bg-accent/90 rounded-xl font-semibold shadow-soft hover:shadow-soft-hover transition-smooth"
                            >
                                <FiCheckCircle /> Hoàn tất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
