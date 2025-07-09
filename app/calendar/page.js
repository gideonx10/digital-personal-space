"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarPage() {
  const [event, setEvent] = useState({
    date: new Date().toISOString().split("T")[0],
    event: "",
    type: "",
    reminder: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (res.ok) {
      alert("✅ Event saved to Calendar sheet!");
      setEvent({
        date: new Date().toISOString().split("T")[0],
        event: "",
        type: "",
        reminder: "",
        notes: "",
      });
    } else {
      alert("❌ Failed to save event.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">📅 Add Calendar Event</h1>

          <Input type="date" name="date" value={event.date} onChange={handleChange} />
          <Input type="text" name="event" placeholder="Event Title" value={event.event} onChange={handleChange} />
          <Input type="text" name="type" placeholder="Type (e.g. Birthday, Task, Reminder)" value={event.type} onChange={handleChange} />
          <Input type="text" name="reminder" placeholder="Set Reminder (e.g. 1 day before)" value={event.reminder} onChange={handleChange} />
          <Textarea name="notes" placeholder="Extra notes or context..." value={event.notes} onChange={handleChange} rows={3} />

          <div className="flex gap-4">
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Event"}
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
