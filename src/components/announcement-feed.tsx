"use client"

import * as React from "react"
import { Megaphone, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ANNOUNCEMENTS = [
  { id: 1, type: "urgent", text: "Library closing early at 5:00 PM on Friday for system maintenance.", date: "2 hours ago" },
  { id: 2, type: "info", text: "Winter break schedule now available in the portal.", date: "5 hours ago" },
  { id: 3, type: "update", text: "Semester results for Computer Science will be declared tomorrow.", date: "Yesterday" },
]

export function AnnouncementFeed() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-headline font-semibold flex items-center gap-2">
        <Megaphone className="h-5 w-5 text-secondary" />
        Live Announcements
      </h2>
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((item) => (
          <div key={item.id} className="relative flex items-start gap-4 p-4 rounded-xl bg-card border border-primary/10 hover:border-primary/30 transition-colors shadow-lg shadow-black/20">
            <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'urgent' ? 'bg-destructive/20 text-destructive' : 'bg-secondary/20 text-secondary'
            }`}>
              {item.type === 'urgent' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-relaxed">{item.text}</p>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}