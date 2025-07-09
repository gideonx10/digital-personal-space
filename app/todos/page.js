"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ToDosPage() {
  const [task, setTask] = useState({
    date: new Date().toISOString().split("T")[0],
    task: "",
    category: "",
    priority: "",
    status: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      alert("✅ To-Do saved to Excel!");
      setTask({
        date: new Date().toISOString().split("T")[0],
        task: "",
        category: "",
        priority: "",
        status: "",
        notes: "",
      });
    } else {
      alert("❌ Failed to save To-Do.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">✅ Add New Task</h1>

          <Input type="date" name="date" value={task.date} onChange={handleChange} />
          <Input type="text" name="task" placeholder="Task Description" value={task.task} onChange={handleChange} />
          <Input type="text" name="category" placeholder="Category (e.g. Work, Personal)" value={task.category} onChange={handleChange} />
          <Input type="text" name="priority" placeholder="Priority (High, Medium, Low)" value={task.priority} onChange={handleChange} />
          <Input type="text" name="status" placeholder="Status (Pending, Done)" value={task.status} onChange={handleChange} />
          <Textarea name="notes" placeholder="Additional notes..." value={task.notes} onChange={handleChange} rows={3} />

          <div className="flex gap-4">
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Task"}
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
