"use client"

import { useState } from "react"
import { MessageSquare, FileText, Send, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MessagingDashboard from "./dashboard/page"
import MessageTemplates from "./templates/page"
import NewMessage from "./message/new/page"
import MessageHistory from "./message/history/page"

const MainMessagingApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <MessageSquare size={16} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <FileText size={16} />
                Templates
              </TabsTrigger>
              <TabsTrigger value="new-message" className="flex items-center gap-2">
                <Send size={16} />
                New Message
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History size={16} />
                History
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <MessagingDashboard />
        </TabsContent>

        <TabsContent value="templates" className="mt-0">
          <MessageTemplates />
        </TabsContent>

        <TabsContent value="new-message" className="mt-0">
          <NewMessage />
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <MessageHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MainMessagingApp
