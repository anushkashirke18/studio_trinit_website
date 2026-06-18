"use client"

import * as React from "react"
import { Plus, Trash2, Edit3, Save, FileText, Database, Loader2, Clock, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [announcementText, setAnnouncementText] = React.useState("")
  const [isPublishing, setIsPublishing] = React.useState(false)
  
  // Edit State
  const [editingSchedule, setEditingSchedule] = React.useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  
  // Add State
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [newSchedule, setNewSchedule] = React.useState({
    subject: "",
    day: "",
    time: "",
    room: "",
    type: "Lecture"
  })

  const firestore = useFirestore()
  const { toast } = useToast()

  const announcementsQuery = React.useMemo(() => {
    if (!firestore) return null
    return query(collection(firestore, "announcements"), orderBy("createdAt", "desc"))
  }, [firestore])

  const schedulesQuery = React.useMemo(() => {
    if (!firestore) return null
    return query(collection(firestore, "schedules"), orderBy("subject", "asc"))
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
        toast({
          title: "Announcement Published",
          description: "Your update has been broadcasted to all students.",
        })
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
      .then(() => {
        toast({
          title: "Record Deleted",
          description: "The item has been successfully removed.",
        })
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: `${col}/${id}`,
          operation: "delete",
        })
        errorEmitter.emit("permission-error", permissionError)
      })
  }

  const handleUpdateSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore || !editingSchedule) return

    const { id, ...data } = editingSchedule
    const docRef = doc(firestore, "schedules", id)

    updateDoc(docRef, data)
      .then(() => {
        setIsEditDialogOpen(false)
        setEditingSchedule(null)
        toast({
          title: "Schedule Updated",
          description: "Changes have been saved successfully.",
        })
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: `schedules/${id}`,
          operation: "update",
          requestResourceData: data,
        })
        errorEmitter.emit("permission-error", permissionError)
      })
  }

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore) return

    const data = { ...newSchedule, createdAt: serverTimestamp() }

    addDoc(collection(firestore, "schedules"), data)
      .then(() => {
        setIsAddDialogOpen(false)
        setNewSchedule({ subject: "", day: "", time: "", room: "", type: "Lecture" })
        toast({
          title: "Schedule Created",
          description: "New academic record added to the database.",
        })
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: "schedules",
          operation: "create",
          requestResourceData: data,
        })
        errorEmitter.emit("permission-error", permissionError)
      })
  }

  const handleSeedData = () => {
    if (!firestore) return
    const sampleSchedules = [
      { subject: "Intro to CS", day: "Mon/Wed", time: "11:00 - 12:30", room: "Hall A", type: "Lecture", createdAt: serverTimestamp() },
      { subject: "History 101", day: "Tue/Thu", time: "14:00 - 15:30", room: "Room 105", type: "Lecture", createdAt: serverTimestamp() },
      { subject: "Data Structures", day: "Friday", time: "09:00 - 11:00", room: "Lab 3", type: "Lab", createdAt: serverTimestamp() },
    ]
    sampleSchedules.forEach(s => addDoc(collection(firestore, "schedules"), s))
    toast({
      title: "Sample Data Seeded",
      description: "Database has been populated with default records.",
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Institution Portal</h1>
          <p className="text-muted-foreground">Manage academic data and broadcasts for your students.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleSeedData}>
            <Database className="h-4 w-4" /> Seed Samples
          </Button>
          <Button className="gap-2 bg-secondary hover:bg-secondary/80" onClick={() => setIsAddDialogOpen(true)}>
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
                    <Clock className="h-4 w-4" /> Timetables
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
                <div className="rounded-md border bg-background/50">
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
                      {schedules?.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{row.subject}</span>
                              <span className="text-[10px] uppercase text-muted-foreground">{row.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.day}</TableCell>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{row.room}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingSchedule(row)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
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
                <div className="rounded-md border bg-background/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Announcement</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements?.map((a: any) => (
                        <TableRow key={a.id}>
                          <TableCell className="max-w-md truncate">{a.text}</TableCell>
                          <TableCell>
                            {a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString() : 'N/A'}
                          </TableCell>
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

      {/* Add Schedule Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <DialogDescription>
              Create a new entry in the academic timetable.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSchedule} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-subject">Subject</Label>
              <Input 
                id="new-subject" 
                placeholder="e.g. Advanced Calculus"
                required
                value={newSchedule.subject} 
                onChange={(e) => setNewSchedule({...newSchedule, subject: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-type">Type</Label>
                <Select value={newSchedule.type} onValueChange={(val) => setNewSchedule({...newSchedule, type: val})}>
                  <SelectTrigger id="new-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-day">Day(s)</Label>
                <Input 
                  id="new-day" 
                  placeholder="e.g. Mon/Wed"
                  required
                  value={newSchedule.day} 
                  onChange={(e) => setNewSchedule({...newSchedule, day: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-room">Room</Label>
                <Input 
                  id="new-room" 
                  placeholder="e.g. 302B"
                  required
                  value={newSchedule.room} 
                  onChange={(e) => setNewSchedule({...newSchedule, room: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-time">Time Slot</Label>
                <Input 
                  id="new-time" 
                  placeholder="e.g. 10:00 - 11:30"
                  required
                  value={newSchedule.time} 
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Create Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>
              Update the details for the selected academic record.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSchedule} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={editingSchedule?.subject || ""} 
                onChange={(e) => setEditingSchedule({...editingSchedule, subject: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={editingSchedule?.type} onValueChange={(val) => setEditingSchedule({...editingSchedule, type: val})}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">Day(s)</Label>
                <Input 
                  id="day" 
                  value={editingSchedule?.day || ""} 
                  onChange={(e) => setEditingSchedule({...editingSchedule, day: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input 
                  id="room" 
                  value={editingSchedule?.room || ""} 
                  onChange={(e) => setEditingSchedule({...editingSchedule, room: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time Slot</Label>
                <Input 
                  id="time" 
                  value={editingSchedule?.time || ""} 
                  onChange={(e) => setEditingSchedule({...editingSchedule, time: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => {
                setIsEditDialogOpen(false)
                setEditingSchedule(null)
              }}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
