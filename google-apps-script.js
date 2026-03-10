// ============================================================
// GrowthEdge Digital — Lead Capture to Google Sheet
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire file into the editor
// 3. Replace SHEET_ID below with your Google Sheet ID
//    (found in the sheet URL: /d/SHEET_ID/edit)
// 4. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the Web App URL and paste it into your .env.local:
//    NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
// ============================================================

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // 👈 Replace this
const SHEET_NAME = "Leads"; // Name of the tab in the sheet

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

        // Add header row if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Need"]);
        }

        sheet.appendRow([
            data.timestamp || new Date().toISOString(),
            data.name || "",
            data.email || "",
            data.phone || "",
            data.need || "",
        ]);

        return ContentService.createTextOutput(
            JSON.stringify({ status: "success" })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService.createTextOutput(
            JSON.stringify({ status: "error", message: err.message })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

// Optional: handle GET for testing
function doGet() {
    return ContentService.createTextOutput("GrowthEdge Lead API is running.");
}
