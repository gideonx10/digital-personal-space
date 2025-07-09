import { promises as fs } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "public", "DigitalDiary.xlsx");

    // Load existing workbook or create new
    let workbook;
    try {
      const buffer = await fs.readFile(filePath);
      workbook = XLSX.read(buffer, { type: "buffer" });
    } catch {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "Calendar";
    let existingData = [];

    if (workbook.Sheets[sheetName]) {
      existingData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      delete workbook.Sheets[sheetName];
      const index = workbook.SheetNames.indexOf(sheetName);
      if (index > -1) workbook.SheetNames.splice(index, 1);
    }

    // Add new row
    existingData.push({
      Date: body.date,
      Event: body.event,
      Type: body.type,
      Reminder: body.reminder,
      Notes: body.notes,
    });

    // Write back the sheet
    const sheet = XLSX.utils.json_to_sheet(existingData);
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);

    const updatedBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    await fs.writeFile(filePath, updatedBuffer);

    return new Response(JSON.stringify({ message: "Event saved." }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to save event." }), { status: 500 });
  }
}
