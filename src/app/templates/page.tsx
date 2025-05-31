"use client"

import { useState } from "react"
import { FileText, Plus, Edit, Trash2, Copy, Eye, Search, Filter, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MessageTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)

  // Available placeholders for gym members
  const placeholders = [
    { key: "{name}", description: "Member name" },
    { key: "{email}", description: "Member email" },
    { key: "{phone_number}", description: "Phone number" },
    { key: "{package_subscribed}", description: "Current package" },
    { key: "{subscribed_end_date}", description: "Subscription end date" },
    { key: "{subscribed_start_date}", description: "Subscription start date" },
    { key: "{package_remaining_amount}", description: "Remaining amount" },
    { key: "{role}", description: "Member role (Trainer/Member)" },
    { key: "{preferred_language}", description: "Preferred language" },
    { key: "{weight}", description: "Current weight" },
    { key: "{height}", description: "Height" },
  ]

  // Mock templates data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Membership Renewal Reminder",
      category: "billing",
      subject: "Your membership expires soon!",
      content: `Hi {name},\n\nYour {package_subscribed} membership will expire on {subscribed_end_date}. Don't miss out on your fitness journey!\n\nRenew now to continue enjoying our facilities.\n\nBest regards,\nThe Gym Team`,
      lastUsed: "2025-01-20",
      usageCount: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Welcome New Member",
      category: "onboarding",
      subject: "Welcome to our gym family!",
      content: `Welcome {name}!\n\nWe're excited to have you join our gym family. Your {package_subscribed} membership starts on {subscribed_start_date}.\n\nYour role as {role} gives you access to all our facilities.\n\nWelcome aboard!`,
      lastUsed: "2025-01-19",
      usageCount: 23,
      status: "active",
    },
    {
      id: 3,
      name: "Payment Reminder",
      category: "billing",
      subject: "Payment Due - {package_subscribed}",
      content: `Hi {name},\n\nThis is a friendly reminder that you have an outstanding balance of ${"{package_remaining_amount}"} for your {package_subscribed} membership.\n\nPlease make your payment by {subscribed_end_date} to avoid service interruption.\n\nContact us: {phone_number}`,
      lastUsed: "2025-01-18",
      usageCount: 67,
      status: "active",
    },
    {
      id: 4,
      name: "Class Schedule Update",
      category: "notifications",
      subject: "Updated Class Schedule",
      content: `Hi {name},\n\nWe've updated our class schedule! Check out the new timings that better fit your routine.\n\nVisit our app or website to see the latest schedule.\n\nSee you at the gym!`,
      lastUsed: "2025-01-17",
      usageCount: 120,
      status: "active",
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    subject: "",
    content: "",
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "billing", label: "Billing" },
    { value: "onboarding", label: "Onboarding" },
    { value: "notifications", label: "Notifications" },
    { value: "promotions", label: "Promotions" },
    { value: "reminders", label: "Reminders" },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template = {
        id: templates.length + 1,
        ...newTemplate,
        lastUsed: null,
        usageCount: 0,
        status: "active",
      }
      setTemplates([...templates, template])
      setNewTemplate({ name: "", category: "", subject: "", content: "" })
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setNewTemplate(template)
    setIsCreateDialogOpen(true)
  }

  const handleUpdateTemplate = () => {
    if (editingTemplate) {
      setTemplates(templates.map((t) => (t.id === editingTemplate.id ? { ...editingTemplate, ...newTemplate } : t)))
      setEditingTemplate(null)
      setNewTemplate({ name: "", category: "", subject: "", content: "" })
      setIsCreateDialogOpen(false)
    }
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((t) => t.id !== id))
  }

  const insertPlaceholder = (placeholder) => {
    setNewTemplate((prev) => ({
      ...prev,
      content: prev.content + placeholder,
    }))
  }

  const getCategoryColor = (category) => {
    const colors = {
      billing: "bg-red-100 text-red-800",
      onboarding: "bg-green-100 text-green-800",
      notifications: "bg-blue-100 text-blue-800",
      promotions: "bg-purple-100 text-purple-800",
      reminders: "bg-yellow-100 text-yellow-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-600">Create and manage reusable message templates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
              <DialogDescription>
                Create a reusable message template with placeholders for member data
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTemplate.category}
                    onValueChange={(value) => setNewTemplate((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter subject line"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Message Content</Label>
                  <Textarea
                    id="content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter your message content..."
                    rows={10}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {editingTemplate ? "Update Template" : "Create Template"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false)
                      setEditingTemplate(null)
                      setNewTemplate({ name: "", category: "", subject: "", content: "" })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Available Placeholders</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {placeholders.map((placeholder) => (
                      <div
                        key={placeholder.key}
                        className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => insertPlaceholder(placeholder.key)}
                      >
                        <code className="text-sm font-mono text-blue-600">{placeholder.key}</code>
                        <p className="text-xs text-gray-600">{placeholder.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Preview</h4>
                  <div className="text-sm text-blue-800 whitespace-pre-wrap">
                    {newTemplate.content || "Start typing to see preview..."}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="mt-1">{template.subject}</CardDescription>
                </div>
                <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Used {template.usageCount} times</span>
                  {template.lastUsed && <span>Last used: {template.lastUsed}</span>}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye size={14} className="mr-1" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                    <Edit size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first message template to get started"}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  )
}

export default MessageTemplates
