"use client"

import { useState } from "react"
import { Send, Users, Clock, Search, Eye, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

const NewMessage = () => {
  const [activeTab, setActiveTab] = useState("compose")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [messageContent, setMessageContent] = useState("")
  const [messageSubject, setMessageSubject] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [memberFilter, setMemberFilter] = useState({
    package: "all",
    status: "all",
    language: "all",
    search: "",
  })

  // Mock data based on your database structure
  const templates = [
    { id: 1, name: "Membership Renewal Reminder", category: "billing" },
    { id: 2, name: "Welcome New Member", category: "onboarding" },
    { id: 3, name: "Payment Reminder", category: "billing" },
    { id: 4, name: "Class Schedule Update", category: "notifications" },
  ]

  const members = [
    {
      id: 5,
      name: "Bob Smith",
      email: "bob@thegymclubhouse.com",
      phone_number: "0812345679",
      package_subscribed: "Daily Pass",
      package_paid_amount: 25000,
      package_remaining_amount: 0,
      role: "Trainer",
      preferred_language: "SW",
      subscribed_end_date: "2025-06-02",
      subscribed_start_date: "2025-06-01",
      weight: 80,
      height: 175,
      status: "active",
    },
    {
      id: 2,
      name: "Alice Johnson",
      email: "alice@gym.com",
      phone_number: "0823456789",
      package_subscribed: "Monthly Premium",
      package_paid_amount: 50000,
      package_remaining_amount: 10000,
      role: "Member",
      preferred_language: "EN",
      subscribed_end_date: "2025-07-15",
      subscribed_start_date: "2025-01-15",
      weight: 65,
      height: 165,
      status: "active",
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@gym.com",
      phone_number: "0834567890",
      package_subscribed: "Annual Gold",
      package_paid_amount: 120000,
      package_remaining_amount: 0,
      role: "Member",
      preferred_language: "EN",
      subscribed_end_date: "2025-01-15",
      subscribed_start_date: "2024-01-15",
      weight: 75,
      height: 180,
      status: "expired",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@gym.com",
      phone_number: "0845678901",
      package_subscribed: "Weekly Basic",
      package_paid_amount: 15000,
      package_remaining_amount: 5000,
      role: "Member",
      preferred_language: "SW",
      subscribed_end_date: "2025-02-28",
      subscribed_start_date: "2025-01-28",
      weight: 60,
      height: 160,
      status: "active",
    },
  ]

  const packages = ["Daily Pass", "Weekly Basic", "Monthly Premium", "Annual Gold"]
  const languages = ["EN", "SW"]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(memberFilter.search.toLowerCase()) ||
      member.email.toLowerCase().includes(memberFilter.search.toLowerCase())
    const matchesPackage = memberFilter.package === "all" || member.package_subscribed === memberFilter.package
    const matchesStatus = memberFilter.status === "all" || member.status === memberFilter.status
    const matchesLanguage = memberFilter.language === "all" || member.preferred_language === memberFilter.language

    return matchesSearch && matchesPackage && matchesStatus && matchesLanguage
  })

  const handleMemberSelect = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.find((m) => m.id === member.id)
      if (isSelected) {
        return prev.filter((m) => m.id !== member.id)
      } else {
        return [...prev, member]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers)
    }
  }

  const handleTemplateSelect = (templateId) => {
    const template = templates.find((t) => t.id === Number.parseInt(templateId))
    if (template) {
      // Sample template content with placeholders
      const templateContent = {
        1: "Hi {name},\n\nYour {package_subscribed} membership will expire on {subscribed_end_date}. Don't miss out on your fitness journey!\n\nRenew now to continue enjoying our facilities.\n\nBest regards,\nThe Gym Team",
        2: "Welcome {name}!\n\nWe're excited to have you join our gym family. Your {package_subscribed} membership starts on {subscribed_start_date}.\n\nYour role as {role} gives you access to all our facilities.\n\nWelcome aboard!",
        3: "Hi {name},\n\nThis is a friendly reminder that you have an outstanding balance of {package_remaining_amount} for your {package_subscribed} membership.\n\nPlease make your payment by {subscribed_end_date} to avoid service interruption.\n\nContact us: {phone_number}",
        4: "Hi {name},\n\nWe've updated our class schedule! Check out the new timings that better fit your routine.\n\nVisit our app or website to see the latest schedule.\n\nSee you at the gym!",
      }

      setMessageSubject(`${template.name}`)
      setMessageContent(templateContent[template.id] || `This is the content for ${template.name} template...`)
    }
    setSelectedTemplate(templateId)
  }

  const handleSendMessage = () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member")
      return
    }
    if (!messageContent.trim()) {
      alert("Please enter message content")
      return
    }

    // Here you would implement the actual sending logic
    console.log("Sending message to:", selectedMembers)
    console.log("Content:", messageContent)
    console.log("Scheduled:", isScheduled, scheduleDate, scheduleTime)

    alert(`Message ${isScheduled ? "scheduled" : "sent"} to ${selectedMembers.length} members!`)
  }

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const insertPlaceholder = (placeholder) => {
    setMessageContent((prev) => prev + placeholder)
  }

  const placeholders = [
    "{name}",
    "{email}",
    "{phone_number}",
    "{package_subscribed}",
    "{subscribed_end_date}",
    "{subscribed_start_date}",
    "{package_remaining_amount}",
    "{role}",
    "{preferred_language}",
    "{weight}",
    "{height}",
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Message</h1>
          <p className="text-gray-600">Compose and send messages to your gym members</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button onClick={handleSendMessage} className="flex items-center gap-2">
            {isScheduled ? <Clock size={16} /> : <Send size={16} />}
            {isScheduled ? "Schedule Message" : "Send Now"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="recipients">Recipients ({selectedMembers.length})</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template (Optional)</CardTitle>
                  <CardDescription>Start with a pre-made template or create from scratch</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No template (blank message)</SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Message Composition */}
              <Card>
                <CardHeader>
                  <CardTitle>Message Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                      placeholder="Enter subject line"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Message</Label>
                    <Textarea
                      id="content"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Type your message here..."
                      rows={8}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Placeholders and Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Placeholders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {placeholders.map((placeholder) => (
                      <div
                        key={placeholder}
                        className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => insertPlaceholder(placeholder)}
                      >
                        <code className="text-blue-600">{placeholder}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Message Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <div className="font-medium mb-2">{messageSubject || "No subject"}</div>
                    <div className="whitespace-pre-wrap">{messageContent || "Start typing to see preview..."}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Filter Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      placeholder="Search members..."
                      value={memberFilter.search}
                      onChange={(e) => setMemberFilter((prev) => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Package</Label>
                  <Select
                    value={memberFilter.package}
                    onValueChange={(value) => setMemberFilter((prev) => ({ ...prev, package: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Packages</SelectItem>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg} value={pkg}>
                          {pkg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={memberFilter.status}
                    onValueChange={(value) => setMemberFilter((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={memberFilter.language}
                    onValueChange={(value) => setMemberFilter((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={handleSelectAll}>
                  {selectedMembers.length === filteredMembers.length ? "Deselect All" : "Select All"}
                </Button>
              </CardContent>
            </Card>

            {/* Members List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} />
                    Members ({filteredMembers.length})
                  </CardTitle>
                  <CardDescription>Select members to receive your message</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <Checkbox
                          checked={selectedMembers.find((m) => m.id === member.id) !== undefined}
                          onCheckedChange={() => handleMemberSelect(member)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{member.name}</h4>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                              <Badge variant="outline">{member.preferred_language}</Badge>
                              <Badge variant="outline">{member.role}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-sm text-gray-600">
                            {member.package_subscribed} • Expires: {member.subscribed_end_date}
                          </p>
                          {member.package_remaining_amount > 0 && (
                            <p className="text-sm text-orange-600">
                              Outstanding: {member.package_remaining_amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Options</CardTitle>
              <CardDescription>Choose when to send your message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="schedule-toggle" checked={isScheduled} onCheckedChange={setIsScheduled} />
                <Label htmlFor="schedule-toggle">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input
                      id="schedule-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 mt-0.5" size={16} />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Scheduling Information</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Messages will be sent in your local timezone</li>
                      <li>• You can cancel scheduled messages before they are sent</li>
                      <li>• Delivery reports will be available after sending</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Message Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" size={20} />
                  <div>
                    <p className="font-medium">{selectedMembers.length} Recipients</p>
                    <p className="text-sm text-gray-600">Selected members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isScheduled ? (
                    <Clock className="text-orange-600" size={20} />
                  ) : (
                    <Send className="text-green-600" size={20} />
                  )}
                  <div>
                    <p className="font-medium">{isScheduled ? "Scheduled" : "Send Now"}</p>
                    <p className="text-sm text-gray-600">
                      {isScheduled && scheduleDate && scheduleTime
                        ? `${scheduleDate} at ${scheduleTime}`
                        : "Immediate delivery"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="font-medium">Ready to Send</p>
                    <p className="text-sm text-gray-600">All requirements met</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NewMessage
