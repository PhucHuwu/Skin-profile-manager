// Utility functions for calculating statistics

/**
 * Calculate basic statistics from records
 */
export function calculateStats(records) {
    if (!records || records.length === 0) {
        return {
            totalRecords: 0,
            completedRecords: 0,
            draftRecords: 0,
            avgAge: 0,
            skinTypeDistribution: [],
            acneDistribution: [],
            genderDistribution: [],
        };
    }

    const totalRecords = records.length;
    const completedRecords = records.filter((r) => r.status === "completed").length;
    const draftRecords = totalRecords - completedRecords;

    // Calculate average age
    const ageSum = records.reduce((sum, r) => sum + (r.personalInfo?.age || 0), 0);
    const avgAge = Math.round(ageSum / totalRecords);

    // Calculate distributions
    const skinTypeDist = calculateSkinTypeDistribution(records);
    const acneDist = calculateAcneDistribution(records);
    const genderDist = calculateGenderDistribution(records);

    return {
        totalRecords,
        completedRecords,
        draftRecords,
        avgAge,
        skinTypeDistribution: skinTypeDist,
        acneDistribution: acneDist,
        genderDistribution: genderDist,
    };
}

function calculateSkinTypeDistribution(records) {
    const counts = {
        oily: 0,
        dry: 0,
        combination: 0,
        normal: 0,
    };

    records.forEach((record) => {
        // Count skin types from all zones or primary zone (forehead/cheeks)
        // Here we use data from zones to determine dominant skin type or just count occurrences
        // For simplicity, let's count dominant skin type based on T-zone (forehead, nose) vs U-zone (cheeks)
        // Or just aggregates from all zones

        // Simplest approach: Count skin types across all zones for all records
        // This gives distribution of "skin condition" rather than per person
        // Better approach for person: "What is your skin type?" usually refers to overall

        // Let's deduce overall skin type:
        // If Forehead/Nose is Oily + Cheeks Dry/Normal -> Combination
        // If All Oily -> Oily
        // If All Dry -> Dry
        // If All Normal -> Normal

        if (record.skinAnalysis) {
            // Simple logic for chart: Check forehead (T-zone)
            const forehead = record.skinAnalysis.find((z) => z.zone === "forehead");
            if (forehead && forehead.skinType && counts[forehead.skinType] !== undefined) {
                counts[forehead.skinType]++;
            }
        }
    });

    return [
        { name: "Da dầu", value: counts.oily, fill: "#FF8042" },
        { name: "Da hỗn hợp", value: counts.combination, fill: "#FFBB28" },
        { name: "Da thường", value: counts.normal, fill: "#00C49F" },
        { name: "Da khô", value: counts.dry, fill: "#0088FE" },
    ].filter((item) => item.value > 0);
}

function calculateAcneDistribution(records) {
    const counts = {
        severe: 0,
        moderate: 0,
        mild: 0,
        clear: 0,
    };

    records.forEach((record) => {
        if (record.skinAnalysis) {
            // Find MAX acne level across all zones to categorize the person
            const acneLevels = record.skinAnalysis.map((z) => z.acneLevel);
            if (acneLevels.includes("severe")) counts.severe++;
            else if (acneLevels.includes("moderate")) counts.moderate++;
            else if (acneLevels.includes("mild")) counts.mild++;
            else counts.clear++;
        }
    });

    return [
        { name: "Nặng", value: counts.severe, fill: "#DC2626" }, // Red-600
        { name: "Trung bình", value: counts.moderate, fill: "#F59E0B" }, // Amber-500
        { name: "Nhẹ", value: counts.mild, fill: "#FCD34D" }, // Amber-300
        { name: "Không mụn", value: counts.clear, fill: "#34D399" }, // Emerald-400
    ].filter((item) => item.value > 0);
}

function calculateGenderDistribution(records) {
    const counts = {};

    records.forEach((record) => {
        const gender = record.personalInfo?.gender || "Chưa xác định";
        counts[gender] = (counts[gender] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value], index) => ({
        name,
        value,
        fill: ["#EC4899", "#3B82F6", "#9CA3AF", "#F59E0B"][index % 4],
    }));
}
