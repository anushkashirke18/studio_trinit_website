"use client"

import * as React from "react"
import { Plus, Trash2, Edit3, Save, FileText, Database, Loader2, Clock, MapPin, X, Send } from "lucide-react"
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
  
  // Edit/Add State for Schedules & Exams
  const [editingItem, setEditingItem] = React.useState<any>(null)
  const [activeTab, setActiveTab] = React.useState("schedules")
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  
  const [newItem, setNewItem] = React.useState({
    subject: "",
    day: "",
    time: "",
    room: "",
    type: "Lecture",
    date: ""
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

  const examsQuery = React.useMemo(() => {
    if (!firestore) return null
    return query(collection(firestore, "exams"), orderBy("date", "asc"))
  }, [firestore])

  const { data: announcements } = useCollection(announcementsQuery)
  const { data: schedules } = useCollection(schedulesQuery)
  const { data: exams } = useCollection(examsQuery)

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
        toast({ title: "Announcement Published", description: "Your update has been broadcasted to all students." })
      })
      .catch(async () => {
        setIsPublishing(false)
        errorEmitter.emit("permission-error", new FirestorePermissionError({ path: "announcements", operation: "create", requestResourceData: data }))
      })
  }

  const handleDeleteRecord = (col: string, id: string) => {
    if (!firestore) return
    deleteDoc(doc(firestore, col, id))
      .then(() => toast({ title: "Record Deleted", description: "The item has been successfully removed." }))
      .catch(async () => errorEmitter.emit("permission-error", new FirestorePermissionError({ path: `${col}/${id}`, operation: "delete" })))
  }

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore || !editingItem) return

    const { id, ...data } = editingItem
    const collectionName = activeTab === "schedules" ? "schedules" : "exams"

    updateDoc(doc(firestore, collectionName, id), data)
      .then(() => {
        setIsEditDialogOpen(false)
        setEditingItem(null)
        toast({ title: "Changes Saved", description: "The record has been updated successfully." })
      })
      .catch(async () => errorEmitter.emit("permission-error", new FirestorePermissionError({ path: `${collectionName}/${id}`, operation: "update", requestResourceData: data })))
  }

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore) return

    const collectionName = activeTab === "schedules" ? "schedules" : "exams"
    const data = { ...newItem, createdAt: serverTimestamp() }

    addDoc(collection(firestore, collectionName), data)
      .then(() => {
        setIsAddDialogOpen(false)
        setNewItem({ subject: "", day: "", time: "", room: "", type: "Lecture", date: "" })
        toast({ title: "Record Created", description: `New ${activeTab === 'schedules' ? 'schedule' : 'exam'} record added.` })
      })
      .catch(async () => errorEmitter.emit("permission-error", new FirestorePermissionError({ path: collectionName, operation: "create", requestResourceData: data })))
  }

  const handleSeedData = () => {
    if (!firestore) return
    const samples = {
      schedules: [
        { subject: "Intro to CS", day: "Mon/Wed", time: "11:00 - 12:30", room: "Hall A", type: "Lecture", createdAt: serverTimestamp() },
        { subject: "Data Structures", day: "Friday", time: "09:00 - 11:00", room: "Lab 3", type: "Lab", createdAt: serverTimestamp() },
      ],
      exams: [
        { subject: "Mathematics Finals", date: "2024-12-15", time: "09:00 AM", room: "Room 201", createdAt: serverTimestamp() },
        { subject: "Advanced Physics", date: "2024-12-18", time: "01:00 PM", room: "Main Hall", createdAt: serverTimestamp() }
      ]
    }
    samples.schedules.forEach(s => addDoc(collection(firestore, "schedules"), s))
    samples.exams.forEach(e => addDoc(collection(firestore, "exams"), e))
    toast({ title: "Sample Data Seeded", description: "Database has been populated with default records." })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Institution Portal</h1>
          <p className="text-muted-foreground">Manage academic data and broadcasts for your students.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleSeedData}><Database className="h-4 w-4" /> Seed Samples</Button>
          <Button className="gap-2 bg-secondary hover:bg-secondary/80" onClick={() => setIsAddDialogOpen(true)}><Plus className="h-4 w-4" /> Add Record</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 bg-card border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Broadcast</CardTitle>
            <CardDescription>Post instant updates to students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Enter announcement text..." value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} className="min-h-[120px]" />
            <Button className="w-full gap-2" onClick={handlePushAnnouncement} disabled={isPublishing || !announcementText.trim()}>
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Push Update
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card border-primary/10">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-muted/30 mb-4">
                <TabsTrigger value="schedules" className="gap-2"><Clock className="h-4 w-4" /> Timetables</TabsTrigger>
                <TabsTrigger value="exams" className="gap-2"><FileText className="h-4 w-4" /> Exams</TabsTrigger>
                <TabsTrigger value="history" className="gap-2"><Database className="h-4 w-4" /> History</TabsTrigger>
              </TabsList>

              <TabsContent value="schedules">
                <div className="rounded-md border bg-background/50">
                  <Table>
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Course</TableHead><TableHead>Day</TableHead><TableHead>Time</TableHead><TableHead>Venue</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {schedules?.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.subject} <span className="block text-[10px] uppercase text-muted-foreground">{row.type}</span></TableCell>
                          <TableCell>{row.day}</TableCell><TableCell>{row.time}</TableCell><TableCell>{row.room}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => { setEditingItem(row); setIsEditDialogOpen(true); }}><Edit3 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteRecord("schedules", row.id)}><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="exams">
                <div className="rounded-md border bg-background/50">
                  <Table>
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Subject</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {exams?.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.subject}</TableCell>
                          <TableCell>{row.date}</TableCell><TableCell>{row.time}</TableCell><TableCell>{row.room}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => { setEditingItem(row); setIsEditDialogOpen(true); }}><Edit3 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteRecord("exams", row.id)}><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="rounded-md border bg-background/50">
                  <Table>
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Announcement</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {announcements?.map((a: any) => (
                        <TableRow key={a.id}>
                          <TableCell className="max-w-md truncate">{a.text}</TableCell>
                          <TableCell>{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell className="text-right"><Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteRecord("announcements", a.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
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

      {/* Shared Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Edit Record</DialogTitle></DialogHeader>
          <form onSubmit={handleSaveItem} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Subject / Course</Label>
              <Input required value={editingItem?.subject || ""} onChange={(e) => setEditingItem({...editingItem, subject: e.target.value})} />
            </div>
            {activeTab === "schedules" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={editingItem?.type} onValueChange={(val) => setEditingItem({...editingItem, type: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Lecture">Lecture</SelectItem><SelectItem value="Lab">Lab</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Day(s)</Label><Input value={editingItem?.day || ""} onChange={(e) => setEditingItem({...editingItem, day: e.target.value})} /></div>
              </div>
            ) : (
              <div className="space-y-2"><Label>Exam Date</Label><Input type="date" value={editingItem?.date || ""} onChange={(e) => setEditingItem({...editingItem, date: e.target.value})} /></div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Room</Label><Input value={editingItem?.room || ""} onChange={(e) => setEditingItem({...editingItem, room: e.target.value})} /></div>
              <div className="space-y-2"><Label>Time Slot</Label><Input value={editingItem?.time || ""} onChange={(e) => setEditingItem({...editingItem, time: e.target.value})} /></div>
            </div>
            <DialogFooter><Button type="submit">Save Changes</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Shared Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Add New {activeTab === "schedules" ? "Schedule" : "Exam"}</DialogTitle></DialogHeader>
          <form onSubmit={handleCreateItem} className="space-y-4 py-4">
            <div className="space-y-2"><Label>Subject / Course</Label><Input required value={newItem.subject} onChange={(e) => setNewItem({...newItem, subject: e.target.value})} /></div>
            {activeTab === "schedules" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={newItem.type} onValueChange={(val) => setNewItem({...newItem, type: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Lecture">Lecture</SelectItem><SelectItem value="Lab">Lab</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Day(s)</Label><Input required value={newItem.day} onChange={(e) => setNewItem({...newItem, day: e.target.value})} /></div>
              </div>
            ) : (
              <div className="space-y-2"><Label>Exam Date</Label><Input required type="date" value={newItem.date} onChange={(e) => setNewItem({...newItem, date: e.target.value})} /></div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Room</Label><Input required value={newItem.room} onChange={(e) => setNewItem({...newItem, room: e.target.value})} /></div>
              <div className="space-y-2"><Label>Time Slot</Label><Input required value={newItem.time} onChange={(e) => setNewItem({...newItem, time: e.target.value})} /></div>
            </div>
            <DialogFooter><Button type="submit">Create Record</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
