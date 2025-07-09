# 🧠 Digital Diary – Your Personal Dashboard in Excel

Welcome to **Digital Diary**, a full-stack productivity and journaling web app built with **Next.js (App Router)**. This tool allows you to write your daily diary, manage tasks, organize events, and log personal growth — all saved directly into a **modular Excel file (`DigitalDiary.xlsx`)** that you fully control and can download anytime.

---

## 📌 Features Implemented

### ✅ 1. Diary
- Write daily reflections with title, mood, tags, and content
- Auto-saves entries to `"Diary"` sheet inside the Excel file

### ✅ 2. To-Do Manager
- Add daily tasks with priority, category, and notes
- Logs entries to `"ToDos"` sheet

### ✅ 3. Calendar Events
- Log events with reminder types and descriptions
- Entries saved into `"Calendar"` sheet

### ✅ 4. Portfolio Tracker
- Track your side projects, certifications, and progress
- Each entry is stored in the `"Portfolio"` sheet

---

## 🧩 Tech Stack

| Layer          | Tech Used                          |
|----------------|------------------------------------|
| Framework      | Next.js 14 (App Router)            |
| Styling        | Tailwind CSS + ShadCN UI           |
| Icons & Anims  | Lucide Icons, Framer Motion (optional) |
| File Handling  | SheetJS (`xlsx`), `fs` (Node APIs) |
| Data Storage   | Excel (`DigitalDiary.xlsx`) in `/public` |

---

## 📁 Folder Structure

/app
/diary → Diary form page
/todos → To-Do manager
/calendar → Calendar event logger
/portfolio → Portfolio logger
/api
/diary → Appends data to Diary sheet
/todos → Appends data to ToDos sheet
/calendar → Appends data to Calendar sheet
/portfolio → Appends data to Portfolio sheet

/components → Navbar, Footer, UI wrappers
/lib → (Optional utilities)
public/
DigitalDiary.xlsx → Core Excel database


---

## 💾 How It Works

1. User fills a form for Diary / Todo / Calendar / Portfolio
2. Click **Save Entry** → sends data to backend API
3. API:
   - Reads existing `DigitalDiary.xlsx`
   - Appends entry to correct sheet
   - Saves updated file in `/public`
4. User can **Download Excel** anytime from:
http://localhost:3000/DigitalDiary.xlsx

---

## 🚀 How to Run Locally

```bash
npm install
npm run dev
Then open  http://localhost:3000/

Project done by Adii