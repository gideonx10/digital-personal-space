// lib/excel.js

import * as XLSX from "xlsx";

/**
 * Export diary entries (array) into an Excel file with a "Diary" sheet.
 * Can be extended later to add more sheets like ToDos, Calendar, etc.
 */
export function exportToExcel({ diary = [] }) {
  const workbook = XLSX.utils.book_new();

  if (diary.length > 0) {
    const formattedData = diary.map((entry) => ({
      Date: entry.date,
      Title: entry.title,
      Mood: entry.mood,
      Tags: entry.tags,
      Content: entry.content,
    }));

    const diarySheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, diarySheet, "Diary");
  }

  XLSX.writeFile(workbook, "DigitalDiary.xlsx");
}
