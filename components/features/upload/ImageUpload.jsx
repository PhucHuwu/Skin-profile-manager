"use client";

import { useState, useCallback } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import { handleImageUpload } from "@/lib/imageUtils";

export function ImageUpload({ value, onChange, onError }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const processFile = useCallback(
        async (file) => {
            setIsUploading(true);
            try {
                const compressed = await handleImageUpload(file);
                onChange(compressed);
            } catch (error) {
                onError?.(error.message);
            } finally {
                setIsUploading(false);
            }
        },
        [onChange, onError],
    );

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                processFile(file);
            }
        },
        [processFile],
    );

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileSelect = useCallback(
        (e) => {
            const file = e.target.files[0];
            if (file) {
                processFile(file);
            }
        },
        [processFile],
    );

    const handleRemove = useCallback(() => {
        onChange(null);
    }, [onChange]);

    return (
        <div className="space-y-4">
            {!value ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
            relative border-2 border-dashed rounded-2xl p-12
            transition-smooth cursor-pointer
            ${isDragging ? "border-primary bg-primary/5" : "border-pink-200 bg-white/50 hover:border-primary/50 hover:bg-primary/5"}
            ${isUploading ? "opacity-50 cursor-wait" : ""}
          `}
                >
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/heic"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                    />

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                            {isUploading ? (
                                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            ) : (
                                <FiUpload className="w-8 h-8 text-primary" />
                            )}
                        </div>

                        <p className="text-lg font-medium text-textPrimary mb-2">{isUploading ? "Đang tải ảnh lên..." : "Kéo thả ảnh vào đây"}</p>

                        <p className="text-sm text-pink-800/60">hoặc nhấn để chọn file</p>

                        <p className="text-xs text-pink-600/50 mt-4">Hỗ trợ JPG, PNG, HEIC - Tối đa 10MB</p>
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-soft">
                        <img src={value} alt="Preview" className="w-full h-auto max-h-96 object-contain" />

                        <button
                            onClick={handleRemove}
                            className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-soft transition-smooth cursor-pointer opacity-0 group-hover:opacity-100"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-pink-600/70">
                        <FiImage className="w-4 h-4" />
                        <span>Ảnh đã được nén và tối ưu</span>
                    </div>
                </div>
            )}
        </div>
    );
}
