// LocalStorage utility functions

/**
 * Generate unique ID for records
 */
export function generateId() {
    return `REC${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Get all records from LocalStorage
 */
export function getRecords() {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("skinRecords");
    return stored ? JSON.parse(stored) : [];
}

/**
 * Save a record to LocalStorage
 */
export function saveRecord(record) {
    const records = getRecords();

    const newRecord = {
        ...record,
        id: record.id || generateId(),
        createdAt: record.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Check if updating existing record
    const existingIndex = records.findIndex((r) => r.id === newRecord.id);

    if (existingIndex >= 0) {
        records[existingIndex] = newRecord;
    } else {
        records.push(newRecord);
    }

    localStorage.setItem("skinRecords", JSON.stringify(records));
    return newRecord;
}

/**
 * Get a single record by ID
 */
export function getRecord(id) {
    const records = getRecords();
    return records.find((r) => r.id === id);
}

/**
 * Delete a record
 */
export function deleteRecord(id) {
    const records = getRecords();
    const filtered = records.filter((r) => r.id !== id);
    localStorage.setItem("skinRecords", JSON.stringify(filtered));
    return true;
}

/**
 * Save draft to SessionStorage
 */
export function saveDraft(data) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("draftRecord", JSON.stringify(data));
}

/**
 * Load draft from SessionStorage
 */
export function loadDraft() {
    if (typeof window === "undefined") return null;

    const draft = sessionStorage.getItem("draftRecord");
    return draft ? JSON.parse(draft) : null;
}

/**
 * Clear draft from SessionStorage
 */
export function clearDraft() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("draftRecord");
}
