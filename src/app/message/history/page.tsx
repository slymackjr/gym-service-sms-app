"use client"

import { useState } from "react"
import {
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Search,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const MessageHistory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock message history data
  const messageHistory = [
    {
      id: 1,
      template: "Membership Renewal Reminder",
      subject: "Your membership expires soon!",
      recipients: 45,
      delivered: 43,
      failed: 2,
      opened: 38,
      clicked: 12,
      status: "completed",
      sentAt: "2025-01-20 14:30:00",
      deliveryRate: 95.6,
      openRate: 88.4,
      clickRate: 31.6,
      category: "billing",
    },
    {
      id: 2,
      template: "Class Schedule Update",
      subject: "Updated Class Schedule",
      recipients: 120,
      delivered: 118,
      failed: 2,
      opened: 95,
      clicked: 34,
      status: "completed",
      sentAt: "2025-01-20 09:15:00",
      deliveryRate: 98.3,
      openRate: 80.5,
      clickRate: 35.8,
      category: "notifications",
    },
    {
      id: 3,
      template: "Welcome New Members",
      subject: "Welcome to our gym family!",
      recipients: 8,
      delivered: 8,
      failed: 0,
      opened: 7,
      clicked: 5,
      status: "completed",
      sentAt: "2025-01-19 16:45:00",
      deliveryRate: 100,
      openRate: 87.5,
      clickRate: 71.4,
      category: "onboarding",
    },
    {
      id: 4,
      template: "Payment Due Reminder",
      subject: "Payment Due - Monthly Premium",
      recipients: 23,
      delivered: 20,
      failed: 3,
      opened: 15,
      clicked: 8,
      status: "completed",
      sentAt: "2025-01-19 11:20:00",
      deliveryRate: 87.0,
      openRate: 75.0,
      clickRate: 53.3,
      category: "billing",
    },
    {
      id: 5,
      template: "Weekly Workout Tips",
      subject: "Your weekly fitness tips are here!",
      recipients: 156,
      delivered: 145,
      failed: 11,
      opened: 0,
      clicked: 0,
      status: "sending",
      sentAt: "2025-01-21 08:00:00",
      deliveryRate: 92.9,
      openRate: 0,
      clickRate: 0,
      category: "notifications",
    },
  ]

  const filteredMessages = messageHistory.filter((message) => {
    const matchesSearch =
      message.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && new Date(message.sentAt).toDateString() === new Date().toDateString()) ||
      (dateFilter === "week" && new Date(message.sentAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "sending":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />
      case "sending":
        return <Clock size={16} className="text-blue-600" />
      case "failed":
        return <XCircle size={16} className="text-red-600" />
      case "scheduled":
        return <Calendar size={16} className="text-yellow-600" />
      default:
        return <AlertTriangle size={16} className="text-gray-600" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const calculateTotalStats = () => {
    const completed = filteredMessages.filter((m) => m.status === "completed")
    const totalRecipients = completed.reduce((sum, m) => sum + m.recipients, 0)
    const totalDelivered = completed.reduce((sum, m) => sum + m.delivered, 0)
    const totalOpened = completed.reduce((sum, m) => sum + m.opened, 0)
    const totalClicked = completed.reduce((sum, m) => sum + m.clicked, 0)

    return {
      totalMessages: completed.length,
      totalRecipients,
      avgDeliveryRate: totalRecipients > 0 ? ((totalDelivered / totalRecipients) * 100).toFixed(1) : 0,
      avgOpenRate: totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : 0,
      avgClickRate: totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : 0,
    }
  }

  const stats = calculateTotalStats()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message History</h1>
          <p className="text-gray-600">Track and analyze your message campaigns</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp size={16} />
            Analytics
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecipients.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDeliveryRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgOpenRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgClickRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Message Campaigns</CardTitle>
          <CardDescription>Detailed view of all your message campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(message.status)}
                      <h3 className="font-semibold">{message.template}</h3>
                      <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{message.subject}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Recipients</p>
                        <p className="font-medium">{message.recipients}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Delivered</p>
                        <p className="font-medium text-green-600">{message.delivered}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Failed</p>
                        <p className="font-medium text-red-600">{message.failed}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Opened</p>
                        <p className="font-medium text-blue-600">{message.opened}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Clicked</p>
                        <p className="font-medium text-purple-600">{message.clicked}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sent At</p>
                        <p className="font-medium">{formatDate(message.sentAt)}</p>
                      </div>
                    </div>

                    {message.status === "completed" && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Delivery Rate</span>
                          <span className="font-medium">{message.deliveryRate}%</span>
                        </div>
                        <Progress value={message.deliveryRate} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Open Rate</span>
                          <span className="font-medium">{message.openRate}%</span>
                        </div>
                        <Progress value={message.openRate} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Click Rate</span>
                          <span className="font-medium">{message.clickRate}%</span>
                        </div>
                        <Progress value={message.clickRate} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== "all" || dateFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No message history available"}
          </p>
        </div>
      )}
    </div>
  )
}

export default MessageHistory
