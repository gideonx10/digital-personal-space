"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PortfolioPage() {
  const [log, setLog] = useState({
    date: new Date().toISOString().split("T")[0],
    project: "",
    type: "",
    status: "",
    link: "",
    remarks: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    });

    if (res.ok) {
      alert("✅ Portfolio entry saved!");
      setLog({
        date: new Date().toISOString().split("T")[0],
        project: "",
        type: "",
        status: "",
        link: "",
        remarks: "",
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
          <h1 className="text-2xl font-bold">📘 Add Portfolio Entry</h1>

          <Input type="date" name="date" value={log.date} onChange={handleChange} />
          <Input type="text" name="project" placeholder="Project or Activity Name" value={log.project} onChange={handleChange} />
          <Input type="text" name="type" placeholder="Type (Project, Cert, Experience)" value={log.type} onChange={handleChange} />
          <Input type="text" name="status" placeholder="Status (Ongoing, Done, Abandoned)" value={log.status} onChange={handleChange} />
          <Input type="text" name="link" placeholder="Link (if any)" value={log.link} onChange={handleChange} />
          <Textarea name="remarks" placeholder="Reflections, learnings, outcome..." value={log.remarks} onChange={handleChange} rows={3} />

          <div className="flex gap-4">
            <Button onClick={handleSave} className="w-full" disabled={saving}>
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
