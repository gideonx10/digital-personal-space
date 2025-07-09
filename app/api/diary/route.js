import { promises as fs } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "public", "DigitalDiary.xlsx");

    // Read existing or create new workbook
    let workbook;
    try {
      const fileBuffer = await fs.readFile(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } catch {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "Diary";
    let existingData = [];

    // Read existing data if sheet exists
    if (workbook.Sheets[sheetName]) {
      existingData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      // Delete old sheet BEFORE appending new one
      delete workbook.Sheets[sheetName];
      const sheetIndex = workbook.SheetNames.indexOf(sheetName);
      if (sheetIndex > -1) workbook.SheetNames.splice(sheetIndex, 1);
    }

    // Append new entry
    existingData.push({
      Date: body.date,
      Title: body.title,
      Mood: body.mood,
      Tags: body.tags,
      Content: body.content,
    });

    const newSheet = XLSX.utils.json_to_sheet(existingData);
    XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    await fs.writeFile(filePath, buffer);

    return new Response(JSON.stringify({ message: "Saved" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save" }), { status: 500 });
  }
}
