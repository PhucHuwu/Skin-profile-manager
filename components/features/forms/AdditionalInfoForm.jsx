"use client";

import { HYDRATION_LEVELS, ELASTICITY_LEVELS, WRINKLE_LEVELS, PIGMENTATION_LEVELS, SENSITIVITY_LEVELS, GENDERS } from "@/lib/constants";

export function AdditionalInfoForm({ personalInfo, additionalInfo, onPersonalInfoChange, onAdditionalInfoChange, showPersonalInfo = true }) {
    const handlePersonalChange = (field, value) => {
        onPersonalInfoChange({ ...personalInfo, [field]: value });
    };

    const handleAdditionalChange = (field, value) => {
        onAdditionalInfoChange({ ...additionalInfo, [field]: value });
    };

    return (
        <div className="space-y-8">
            {/* Personal Info Section */}
            {showPersonalInfo && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 space-y-6">
                    <h3 className="text-xl font-heading font-semibold text-textPrimary">Thông tin cá nhân</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-textPrimary mb-2">
                                Họ và tên
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={personalInfo.name || ""}
                                onChange={(e) => handlePersonalChange("name", e.target.value)}
                                maxLength={100}
                                placeholder="Nguyễn Văn A"
                                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-textPrimary mb-2">
                                Tuổi <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="age"
                                type="number"
                                value={personalInfo.age || ""}
                                onChange={(e) => handlePersonalChange("age", parseInt(e.target.value))}
                                min={15}
                                max={80}
                                required
                                placeholder="25"
                                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50"
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-textPrimary mb-3">
                            Giới tính <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {GENDERS.map((gender) => (
                                <label
                                    key={gender.value}
                                    className={`
                  relative flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-smooth
                  ${personalInfo.gender === gender.label ? "border-primary bg-primary/5" : "border-pink-200 bg-white/50 hover:border-primary/50"}
                `}
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender.label}
                                        checked={personalInfo.gender === gender.label}
                                        onChange={(e) => handlePersonalChange("gender", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className="font-medium text-textPrimary">{gender.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Additional Skin Info Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-4 md:p-6 space-y-4">
                <h3 className="text-xl font-heading font-semibold text-textPrimary">Thông tin tình trạng da bổ sung</h3>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Hydration Level */}
                    <div className="md:col-span-2">
                        <label className="block text-base font-semibold text-textPrimary mb-3">1. Độ ẩm da</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {HYDRATION_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${additionalInfo.hydrationLevel === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${additionalInfo.hydrationLevel === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {additionalInfo.hydrationLevel === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="hydrationLevel"
                                        value={level.value}
                                        checked={additionalInfo.hydrationLevel === level.value}
                                        onChange={(e) => handleAdditionalChange("hydrationLevel", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${additionalInfo.hydrationLevel === level.value ? "text-primary font-medium" : "text-gray-600"}`}>
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Elasticity */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">2. Độ đàn hồi</label>
                        <div className="grid grid-cols-2 gap-2">
                            {ELASTICITY_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${additionalInfo.elasticity === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${additionalInfo.elasticity === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {additionalInfo.elasticity === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="elasticity"
                                        value={level.value}
                                        checked={additionalInfo.elasticity === level.value}
                                        onChange={(e) => handleAdditionalChange("elasticity", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${additionalInfo.elasticity === level.value ? "text-primary font-medium" : "text-gray-600"}`}>
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Wrinkles */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">3. Nếp nhăn</label>
                        <div className="grid grid-cols-2 gap-2">
                            {WRINKLE_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${additionalInfo.wrinkles === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${additionalInfo.wrinkles === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {additionalInfo.wrinkles === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="wrinkles"
                                        value={level.value}
                                        checked={additionalInfo.wrinkles === level.value}
                                        onChange={(e) => handleAdditionalChange("wrinkles", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${additionalInfo.wrinkles === level.value ? "text-primary font-medium" : "text-gray-600"}`}>
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Pigmentation */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">4. Sắc tố/Nám</label>
                        <div className="grid grid-cols-2 gap-2">
                            {PIGMENTATION_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${additionalInfo.pigmentation === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${additionalInfo.pigmentation === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {additionalInfo.pigmentation === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="pigmentation"
                                        value={level.value}
                                        checked={additionalInfo.pigmentation === level.value}
                                        onChange={(e) => handleAdditionalChange("pigmentation", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${additionalInfo.pigmentation === level.value ? "text-primary font-medium" : "text-gray-600"}`}>
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sensitivity */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">5. Độ nhạy cảm</label>
                        <div className="grid grid-cols-2 gap-2">
                            {SENSITIVITY_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${additionalInfo.sensitivity === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${additionalInfo.sensitivity === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {additionalInfo.sensitivity === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="sensitivity"
                                        value={level.value}
                                        checked={additionalInfo.sensitivity === level.value}
                                        onChange={(e) => handleAdditionalChange("sensitivity", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${additionalInfo.sensitivity === level.value ? "text-primary font-medium" : "text-gray-600"}`}>
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4">
                    {/* Allergy History */}
                    <div>
                        <label htmlFor="allergyHistory" className="block text-sm font-medium text-textPrimary mb-2">
                            Tiền sử dị ứng
                        </label>
                        <textarea
                            id="allergyHistory"
                            value={additionalInfo.allergyHistory || ""}
                            onChange={(e) => handleAdditionalChange("allergyHistory", e.target.value)}
                            rows={3}
                            placeholder="Ví dụ: Dị ứng với retinol, alcohol..."
                            className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50 resize-none"
                        />
                    </div>

                    {/* Current Products */}
                    <div>
                        <label htmlFor="currentProducts" className="block text-sm font-medium text-textPrimary mb-2">
                            Sản phẩm đang sử dụng
                        </label>
                        <textarea
                            id="currentProducts"
                            value={additionalInfo.currentProducts || ""}
                            onChange={(e) => handleAdditionalChange("currentProducts", e.target.value)}
                            rows={3}
                            placeholder="Ví dụ: Sữa rửa mặt Cetaphil, kem dưỡng Cerave..."
                            className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50 resize-none"
                        />
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-textPrimary mb-2">
                            Ghi chú
                        </label>
                        <textarea
                            id="notes"
                            value={additionalInfo.notes || ""}
                            onChange={(e) => handleAdditionalChange("notes", e.target.value)}
                            rows={3}
                            maxLength={500}
                            placeholder="Bất kỳ thông tin bổ sung nào..."
                            className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth bg-white/50 resize-none"
                        />
                        <p className="text-xs text-pink-600/50 mt-1">{additionalInfo.notes?.length || 0}/500 ký tự</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
