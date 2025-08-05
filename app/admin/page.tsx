"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Activity, TrendingUp, Plus, Edit, Trash2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"

interface DiseaseData {
  id: string
  name: string
  crop: string
  count: number
  severity: "low" | "medium" | "high"
}

export default function AdminPage() {
  const { t } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDisease, setNewDisease] = useState({
    name: "",
    crop: "",
    symptoms: "",
    treatment: "",
    severity: "medium" as "low" | "medium" | "high",
  })

  const diseaseStats: DiseaseData[] = [
    { id: "1", name: "Late Blight", crop: "Tomato", count: 45, severity: "high" },
    { id: "2", name: "Bacterial Spot", crop: "Tomato", count: 32, severity: "medium" },
    { id: "3", name: "Brown Spot", crop: "Rice", count: 28, severity: "low" },
    { id: "4", name: "Powdery Mildew", crop: "Wheat", count: 21, severity: "medium" },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, validate against backend
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert(t("invalidCredentials"))
    }
  }

  const handleAddDisease = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, send to backend API
    console.log("Adding disease:", newDisease)
    alert(t("diseaseAdded"))
    setShowAddForm(false)
    setNewDisease({ name: "", crop: "", symptoms: "", treatment: "", severity: "medium" })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{t("adminLogin")}</CardTitle>
            <CardDescription className="text-center">{t("adminLoginDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  placeholder={t("username")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t("login")}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">Demo: admin / admin123</div>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("backToHome")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("back")}
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">{t("adminPanel")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("totalUsers")}</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("totalScans")}</p>
                  <p className="text-2xl font-bold">5,678</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("diseasesDetected")}</p>
                  <p className="text-2xl font-bold">126</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("accuracy")}</p>
                  <p className="text-2xl font-bold">94.5%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disease Statistics */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{t("diseaseStatistics")}</CardTitle>
                <CardDescription>{t("mostDetectedDiseases")}</CardDescription>
              </div>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t("addDisease")}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diseaseStats.map((disease) => (
                <div key={disease.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{disease.name}</h3>
                      <Badge variant="outline">{disease.crop}</Badge>
                      <Badge className={getSeverityColor(disease.severity)}>{t(disease.severity)}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t("detectedCount")}: {disease.count} {t("times")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Disease Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>{t("addNewDisease")}</CardTitle>
              <CardDescription>{t("addDiseaseDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDisease} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("diseaseName")}</label>
                    <Input
                      value={newDisease.name}
                      onChange={(e) => setNewDisease({ ...newDisease, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("cropType")}</label>
                    <Input
                      value={newDisease.crop}
                      onChange={(e) => setNewDisease({ ...newDisease, crop: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("symptoms")}</label>
                  <Textarea
                    value={newDisease.symptoms}
                    onChange={(e) => setNewDisease({ ...newDisease, symptoms: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("treatment")}</label>
                  <Textarea
                    value={newDisease.treatment}
                    onChange={(e) => setNewDisease({ ...newDisease, treatment: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("severity")}</label>
                  <div className="flex space-x-2">
                    {["low", "medium", "high"].map((severity) => (
                      <Button
                        key={severity}
                        type="button"
                        variant={newDisease.severity === severity ? "default" : "outline"}
                        onClick={() =>
                          setNewDisease({ ...newDisease, severity: severity as "low" | "medium" | "high" })
                        }
                      >
                        {t(severity)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">{t("addDisease")}</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    {t("cancel")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
