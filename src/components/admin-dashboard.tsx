
"use client"

import * as React from "react"
import { Plus, Upload, Trash2, Edit3, Save, FileText, Database, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export function AdminDashboard() {
  const [announcementText, setAnnouncementText] = React.useState("")
  const [isPublishing, setIsPublishing] = React.useState(false)
  const firestore = useFirestore()

  const announcementsQuery = React.useMemo(() => {
    if (!firestore) return null
    return query(collection(firestore, "announcements"), orderBy("createdAt", "desc"))
  }, [firestore])

  const schedulesQuery = React.useMemo(() => {
    if (!firestore) return null
    return collection(firestore, "schedules")
  }, [firestore])

  const { data: announcements } = useCollection(announcementsQuery)
  const { data: schedules } = useCollection(schedulesQuery)

  const handlePushAnnouncement = () => {
    if (!firestore || !announcementText.trim()) return

    setIsPublishing(true)
    const data = {
      text: announcementText,
      type: "update",
      createdAt: serverTimestamp(),
    }

    addDoc(collection(firestore, "announcements"), data)
      .then(() => {
        setAnnouncementText("")
        setIsPublishing(false)
      })
      .catch(async (error) => {
        setIsPublishing(false)
        const permissionError = new FirestorePermissionError({
          path: "announcements",
          operation: "create",
          requestResourceData: data,
        })
        errorEmitter.emit("permission-error", permissionError)
      })
  }

  const handleDeleteRecord = (col: string, id: string) => {
    if (!firestore) return
    deleteDoc(doc(firestore, col, id))
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: `${col}/${id}`,
          operation: "delete",
        })
        errorEmitter.emit("permission-error", permissionError)
      })
  }

  const handleSeedData = () => {
    if (!firestore) return
    const sampleSchedules = [
      { subject: "Intro to CS", day: "Mon/Wed", time: "11:00 - 12:30", room: "Hall A", type: "Lecture" },
      { subject: "History 101", day: "Tue/Thu", time: "14:00 - 15:30", room: "Room 105", type: "Lecture" },
    ]
    sampleSchedules.forEach(s => addDoc(collection(firestore, "schedules"), s))
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Institution Portal</h1>
          <p className="text-muted-foreground">Manage academic data and broadcasts for your students.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleSeedData}>
            <Database className="h-4 w-4" /> Seed Samples
          </Button>
          <Button className="gap-2 bg-secondary hover:bg-secondary/80">
            <Plus className="h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 bg-card border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Broadcast</CardTitle>
            <CardDescription>Post instant updates to students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Enter announcement text..." 
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="min-h-[120px] bg-background"
            />
            <Button 
              className="w-full gap-2" 
              onClick={handlePushAnnouncement}
              disabled={isPublishing || !announcementText.trim()}
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Push Update
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card border-primary/10">
          <CardHeader>
            <Tabs defaultValue="schedules" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-muted/30">
                  <TabsTrigger value="schedules" className="gap-2">
                    <ClockIcon className="h-4 w-4" /> Timetables
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="gap-2">
                    <FileText className="h-4 w-4" /> Exams
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2">
                    <Database className="h-4 w-4" /> History
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="schedules">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Course Name</TableHead>
                        <TableHead>Day</TableHead>
                        <TableHead>Time Slot</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules?.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.subject}</TableCell>
                          <TableCell>{row.day}</TableCell>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{row.room}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4" /></Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleDeleteRecord("schedules", row.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!schedules || schedules.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No schedules found. Click "Seed Samples" to populate.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="exams" className="p-12 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-4">
                  <FileText className="h-12 w-12 opacity-20" />
                  <p>Exam calendar management coming soon.</p>
                </div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Announcement</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements?.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="max-w-md truncate">{a.text}</TableCell>
                          <TableCell>{a.createdAt?.toDate().toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                             <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleDeleteRecord("announcements", a.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
