"use client";

import { useState } from "react";
import { FACE_ZONES, SKIN_TYPES, ACNE_LEVELS, REDNESS_LEVELS, PORE_SIZES } from "@/lib/constants";

export function SkinAnalysisForm({ value, onChange }) {
    const [selectedZone, setSelectedZone] = useState("forehead");

    const handleZoneChange = (zone, field, fieldValue) => {
        const newValue = { ...value };
        if (!newValue[zone]) {
            newValue[zone] = {};
        }
        newValue[zone][field] = fieldValue;
        onChange(newValue);
    };

    const getZoneData = (zoneId) => {
        return value[zoneId] || {};
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-heading font-semibold text-textPrimary mb-2">Phân tích tình trạng da</h3>
                <p className="text-pink-800/70 text-sm">Chọn vùng trên khuôn mặt và đánh giá tình trạng da cho từng vùng</p>
            </div>

            {/* Zone Selector Tabs */}
            <div className="flex flex-wrap gap-2">
                {FACE_ZONES.map((zone) => {
                    const zoneData = getZoneData(zone.id);
                    const hasData = zoneData.skinType;

                    return (
                        <button
                            key={zone.id}
                            onClick={() => setSelectedZone(zone.id)}
                            className={`
                px-4 py-2 rounded-lg font-medium transition-smooth cursor-pointer
                ${
                    selectedZone === zone.id
                        ? "bg-primary text-white shadow-soft"
                        : hasData
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-white/80 text-pink-800/70 border border-pink-200 hover:border-primary/50"
                }
              `}
                        >
                            {zone.name}
                            {hasData && selectedZone !== zone.id && <span className="ml-1">✓</span>}
                        </button>
                    );
                })}
            </div>

            {/* Form for Selected Zone */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-4 md:p-6 space-y-4">
                <h4 className="font-heading font-semibold text-lg text-textPrimary">Vùng: {FACE_ZONES.find((z) => z.id === selectedZone)?.name}</h4>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Skin Type */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">
                            1. Loại da <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {SKIN_TYPES.map((type) => (
                                <label
                                    key={type.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${getZoneData(selectedZone).skinType === type.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${getZoneData(selectedZone).skinType === type.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {getZoneData(selectedZone).skinType === type.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name={`skinType-${selectedZone}`}
                                        value={type.value}
                                        checked={getZoneData(selectedZone).skinType === type.value}
                                        onChange={(e) => handleZoneChange(selectedZone, "skinType", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`text-sm ${getZoneData(selectedZone).skinType === type.value ? "text-primary font-medium" : "text-gray-600"}`}
                                    >
                                        {type.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Acne Level */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">
                            2. Tình trạng mụn <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {ACNE_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${getZoneData(selectedZone).acneLevel === level.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${getZoneData(selectedZone).acneLevel === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {getZoneData(selectedZone).acneLevel === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name={`acneLevel-${selectedZone}`}
                                        value={level.value}
                                        checked={getZoneData(selectedZone).acneLevel === level.value}
                                        onChange={(e) => handleZoneChange(selectedZone, "acneLevel", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`text-sm ${getZoneData(selectedZone).acneLevel === level.value ? "text-primary font-medium" : "text-gray-600"}`}
                                    >
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Redness Level */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">3. Mức độ đỏ/viêm</label>
                        <div className="grid grid-cols-2 gap-2">
                            {REDNESS_LEVELS.map((level) => (
                                <label
                                    key={level.value}
                                    className={`
                                        relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${
                                            getZoneData(selectedZone).rednessLevel === level.value
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${getZoneData(selectedZone).rednessLevel === level.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {getZoneData(selectedZone).rednessLevel === level.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name={`rednessLevel-${selectedZone}`}
                                        value={level.value}
                                        checked={getZoneData(selectedZone).rednessLevel === level.value}
                                        onChange={(e) => handleZoneChange(selectedZone, "rednessLevel", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`text-sm ${getZoneData(selectedZone).rednessLevel === level.value ? "text-primary font-medium" : "text-gray-600"}`}
                                    >
                                        {level.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Pore Size */}
                    <div>
                        <label className="block text-base font-semibold text-textPrimary mb-3">4. Kích thước lỗ chân lông</label>
                        <div className="grid grid-cols-2 gap-2">
                            {PORE_SIZES.map((size) => (
                                <label
                                    key={size.value}
                                    className={`
                                         relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth
                                        ${getZoneData(selectedZone).poreSize === size.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"}
                                    `}
                                >
                                    <div
                                        className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                                        ${getZoneData(selectedZone).poreSize === size.value ? "border-primary bg-primary" : "border-gray-300 bg-white"}
                                    `}
                                    >
                                        {getZoneData(selectedZone).poreSize === size.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name={`poreSize-${selectedZone}`}
                                        value={size.value}
                                        checked={getZoneData(selectedZone).poreSize === size.value}
                                        onChange={(e) => handleZoneChange(selectedZone, "poreSize", e.target.value)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`text-sm ${getZoneData(selectedZone).poreSize === size.value ? "text-primary font-medium" : "text-gray-600"}`}
                                    >
                                        {size.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
