"use client"

import { useState } from "react"
import { Send, Clock, CheckCircle, Users, Calendar, TrendingUp, FileText, Plus, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MessagingDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for demonstration
  const stats = {
    totalSent: 1247,
    scheduled: 23,
    delivered: 1198,
    failed: 49,
    totalMembers: 456,
    activeTemplates: 12,
  }

  const recentMessages = [
    {
      id: 1,
      template: "Membership Renewal Reminder",
      recipients: 45,
      status: "delivered",
      sentAt: "2025-01-20 14:30",
      deliveryRate: 98,
    },
    {
      id: 2,
      template: "Class Schedule Update",
      recipients: 120,
      status: "delivered",
      sentAt: "2025-01-20 09:15",
      deliveryRate: 95,
    },
    {
      id: 3,
      template: "Welcome New Members",
      recipients: 8,
      status: "scheduled",
      sentAt: "2025-01-21 10:00",
      deliveryRate: null,
    },
  ]

  const upcomingScheduled = [
    {
      id: 1,
      template: "Weekly Workout Tips",
      recipients: 234,
      scheduledFor: "2025-01-21 08:00",
      type: "recurring",
    },
    {
      id: 2,
      template: "Payment Due Reminder",
      recipients: 67,
      scheduledFor: "2025-01-22 16:00",
      type: "one-time",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messaging Center</h1>
          <p className="text-gray-600">Manage your gym member communications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText size={16} />
            Templates
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            New Message
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
            <p className="text-xs text-muted-foreground">Next in 2 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.1%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+8 new this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Messages</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest message campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMessages.slice(0, 3).map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{message.template}</h4>
                      <p className="text-sm text-gray-600">
                        {message.recipients} recipients • {message.sentAt}
                      </p>
                    </div>
                    <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Scheduled */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  Upcoming Scheduled
                </CardTitle>
                <CardDescription>Messages ready to be sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingScheduled.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{message.template}</h4>
                      <p className="text-sm text-gray-600">
                        {message.recipients} recipients • {message.scheduledFor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={message.type === "recurring" ? "default" : "secondary"}>{message.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>All recently sent message campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{message.template}</h4>
                      <p className="text-sm text-gray-600">
                        {message.recipients} recipients • Sent {message.sentAt}
                      </p>
                      {message.deliveryRate && (
                        <p className="text-sm text-green-600">{message.deliveryRate}% delivery rate</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Messages</CardTitle>
              <CardDescription>Messages scheduled for future delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingScheduled.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{message.template}</h4>
                      <p className="text-sm text-gray-600">
                        {message.recipients} recipients • Scheduled for {message.scheduledFor}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={message.type === "recurring" ? "default" : "secondary"}>{message.type}</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MessagingDashboard
