"use client"

import * as React from "react"
import { GraduationCap, School, ArrowRight, ShieldCheck, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"
import { TimetableView } from "@/components/timetable-view"
import { AnnouncementFeed } from "@/components/announcement-feed"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function Home() {
  const [role, setRole] = React.useState<"none" | "student" | "school">("none")

  if (role === "none") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background">
        <div className="max-w-4xl w-full space-y-12 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-indigo-500/20 shadow-2xl">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-white">
              CampusConnect <span className="text-primary">AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The intelligent central nervous system for your academic journey. 
              Seamless schedules, instant answers, one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <button 
              onClick={() => setRole("student")}
              className="group relative text-left"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <Card className="relative bg-card border-primary/10 hover:border-primary/40 transition-all duration-300 p-8 rounded-2xl cursor-pointer">
                <CardContent className="p-0 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">Student Access</h3>
                    <p className="text-muted-foreground">View schedules, chat with AI assistant, and stay updated with campus events.</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    Launch Dashboard <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </button>

            <button 
              onClick={() => setRole("school")}
              className="group relative text-left"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-indigo-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
              <Card className="relative bg-card border-secondary/10 hover:border-secondary/40 transition-all duration-300 p-8 rounded-2xl cursor-pointer">
                <CardContent className="p-0 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                    <School className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">Institution Portal</h3>
                    <p className="text-muted-foreground">Manage databases, broadcast announcements, and monitor school operations.</p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-4 transition-all">
                    Admin Login <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-muted-foreground opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-headline font-bold">
              <ShieldCheck className="h-5 w-5" /> Secured by CampusGrid
            </div>
            <div className="h-1 w-1 bg-muted rounded-full" />
            <div className="text-sm font-medium">Empowering 500+ Institutions</div>
          </div>
        </div>
      </div>
    )
  }

  if (role === "school") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                <School className="h-5 w-5 text-white" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">CampusConnect <span className="text-secondary">Admin</span></span>
            </div>
            <Button variant="ghost" onClick={() => setRole("none")} className="text-muted-foreground hover:text-white">Sign Out</Button>
          </div>
        </header>
        <AdminDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Cpu className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">CampusConnect <span className="text-primary">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold">Alex Sterling</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">ID: #CS2024-91</span>
            </div>
            <Button variant="ghost" onClick={() => setRole("none")} className="text-muted-foreground hover:text-white">Log Out</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 animate-in slide-in-from-bottom-4 duration-700">
        <div className="bento-grid h-full max-h-[calc(100vh-160px)] min-h-[600px]">
          {/* Chat Section - Large Box */}
          <div className="col-span-12 lg:col-span-5 h-[500px] lg:h-full">
            <ChatInterface />
          </div>

          {/* Schedule Section - Bento Boxes */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <Card className="bg-card border-primary/5 shadow-xl overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                <CardContent className="p-6 overflow-auto custom-scrollbar">
                  <TimetableView />
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-6">
                <Card className="bg-card border-secondary/5 shadow-xl overflow-hidden hover:border-secondary/20 transition-all flex-1">
                  <CardContent className="p-6">
                    <AnnouncementFeed />
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/10 shadow-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-headline font-bold text-lg">AI Insights</h3>
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "You have an exam coming up in 48 hours. I've prepared a summary of the syllabus based on the latest lecture notes. Would you like to review?"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}