// Image utilities for handling file uploads and compression

/**
 * Validate image file type and size
 */
export function validateImageFile(file) {
    const validTypes = ["image/jpeg", "image/png", "image/heic", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: "Chỉ hỗ trợ file JPG, PNG, HEIC",
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: "Kích thước file tối đa 10MB",
        };
    }

    return { valid: true };
}

/**
 * Read file as Data URL (base64)
 */
export function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.onerror = () => {
            reject(new Error("Không thể đọc file"));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Compress image using Canvas API
 */
export function compressImage(base64, maxWidth = 1920, quality = 0.8) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ratio = Math.min(maxWidth / img.width, 1);

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressed = canvas.toDataURL("image/jpeg", quality);
            resolve(compressed);
        };

        img.src = base64;
    });
}

/**
 * Handle full image upload process: validate, read, compress
 */
export async function handleImageUpload(file, options = {}) {
    const { maxWidth = 1920, quality = 0.8, shouldCompress = true } = options;

    // Validate
    const validation = validateImageFile(file);
    if (!validation.valid) {
        throw new Error(validation.error);
    }

    // Read as base64
    const base64 = await readAsDataURL(file);

    // Compress if needed
    if (shouldCompress) {
        const compressed = await compressImage(base64, maxWidth, quality);
        return compressed;
    }

    return base64;
}
