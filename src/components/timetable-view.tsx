"use client"

import * as React from "react"
import { Calendar as CalendarIcon, Clock, MapPin, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SCHEDULE_DATA = [
  { id: 1, type: "Lecture", subject: "Advanced Mathematics", time: "09:00 AM - 10:30 AM", room: "Room 201", date: "Mon, Dec 11" },
  { id: 2, type: "Lab", subject: "Quantum Computing", time: "11:00 AM - 12:30 PM", room: "Lab A", date: "Mon, Dec 11" },
  { id: 3, type: "Lecture", subject: "Data Structures", time: "02:00 PM - 03:30 PM", room: "Lecture Hall 1", date: "Tue, Dec 12" },
  { id: 4, type: "Exam", subject: "Digital Ethics", time: "10:00 AM - 12:00 PM", room: "Main Hall", date: "Wed, Dec 13" },
]

export function TimetableView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-headline font-semibold">Today's Schedule</h2>
        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-primary/50 text-primary">
          Academic Year 2024
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {SCHEDULE_DATA.map((item) => (
          <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary group hover:border-l-secondary transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">{item.type}</span>
                  <Badge variant={item.type === "Exam" ? "destructive" : "secondary"} className="h-5 text-[10px]">
                    {item.date}
                  </Badge>
                </div>
                <h4 className="font-headline font-bold text-lg">{item.subject}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.room}
                  </div>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}