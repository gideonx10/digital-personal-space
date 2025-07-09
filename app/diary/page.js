"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DiaryPage() {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    title: "",
    mood: "",
    tags: "",
    content: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleAddEntry = async () => {
    setSaving(true);
    const res = await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      alert("✅ Entry saved to Excel!");
      setEntry({
        date: new Date().toISOString().split("T")[0],
        title: "",
        mood: "",
        tags: "",
        content: "",
      });
    } else {
      alert("❌ Failed to save entry.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">📔 Write Today’s Diary</h1>

          <Input type="date" name="date" value={entry.date} onChange={handleChange} />
          <Input type="text" name="title" placeholder="Title" value={entry.title} onChange={handleChange} />
          <Input type="text" name="mood" placeholder="Mood" value={entry.mood} onChange={handleChange} />
          <Input type="text" name="tags" placeholder="Tags (comma separated)" value={entry.tags} onChange={handleChange} />
          <Textarea name="content" placeholder="Write your thoughts..." rows={6} value={entry.content} onChange={handleChange} />

          <div className="flex gap-4">
            <Button onClick={handleAddEntry} className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Entry"}
            </Button>
            <a href="/DigitalDiary.xlsx" download className="w-full">
              <Button variant="outline" className="w-full">
                Download Excel
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
