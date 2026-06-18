
"use client"

import * as React from "react"
import { Clock, MapPin, GraduationCap, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFirestore, useCollection } from "@/firebase"
import { collection } from "firebase/firestore"

export function TimetableView() {
  const firestore = useFirestore()
  const schedulesQuery = React.useMemo(() => {
    if (!firestore) return null
    return collection(firestore, "schedules")
  }, [firestore])

  const { data: schedules, loading } = useCollection(schedulesQuery)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-headline font-semibold">Weekly Schedule</h2>
        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-primary/50 text-primary">
          Academic Year 2024
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {schedules?.map((item) => (
          <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary group hover:border-l-secondary transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">{item.type || 'Lecture'}</span>
                  <Badge variant={item.type === "Exam" ? "destructive" : "secondary"} className="h-5 text-[10px]">
                    {item.day || 'TBA'}
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
        {(!schedules || schedules.length === 0) && (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
            <p>No classes scheduled. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}
