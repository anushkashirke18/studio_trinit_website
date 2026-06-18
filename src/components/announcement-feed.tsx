
"use client"

import * as React from "react"
import { Megaphone, AlertTriangle, Info, Loader2 } from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export function AnnouncementFeed() {
  const firestore = useFirestore()
  
  const announcementsQuery = React.useMemo(() => {
    if (!firestore) return null
    return query(
      collection(firestore, "announcements"), 
      orderBy("createdAt", "desc"),
      limit(5)
    )
  }, [firestore])

  const { data: announcements, loading } = useCollection(announcementsQuery)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-headline font-semibold flex items-center gap-2">
        <Megaphone className="h-5 w-5 text-secondary" />
        Live Announcements
      </h2>
      <div className="space-y-3">
        {announcements?.map((item) => (
          <div key={item.id} className="relative flex items-start gap-4 p-4 rounded-xl bg-card border border-primary/10 hover:border-primary/30 transition-colors shadow-lg shadow-black/20">
            <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'urgent' ? 'bg-destructive/20 text-destructive' : 'bg-secondary/20 text-secondary'
            }`}>
              {item.type === 'urgent' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-relaxed">{item.text}</p>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now'}
              </span>
            </div>
          </div>
        ))}
        {(!announcements || announcements.length === 0) && (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
            <p className="text-sm">No new announcements today.</p>
          </div>
        )}
      </div>
    </div>
  )
}
