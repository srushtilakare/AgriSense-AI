"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import { VoiceAssistant } from "@/components/voice-assistant"
import Image from "next/image"

interface HistoryItem {
  id: string
  date: string
  image: string
  disease: string
  isHealthy: boolean
  severity: "low" | "medium" | "high"
  confidence: number
  treatment: string[]
}

export default function HistoryPage() {
  const { t } = useLanguage()
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  const historyItems: HistoryItem[] = [
    {
      id: "1",
      date: "2024-01-15",
      image: "/placeholder.svg?height=200&width=200",
      disease: "Late Blight",
      isHealthy: false,
      severity: "high",
      confidence: 87,
      treatment: [t("fungicideSpray"), t("removeAffectedLeaves"), t("improveVentilation")],
    },
    {
      id: "2",
      date: "2024-01-14",
      image: "/placeholder.svg?height=200&width=200",
      disease: "Healthy",
      isHealthy: true,
      severity: "low",
      confidence: 95,
      treatment: [t("keepMonitoring"), t("maintainGoodPractices")],
    },
    {
      id: "3",
      date: "2024-01-13",
      image: "/placeholder.svg?height=200&width=200",
      disease: "Brown Spot",
      isHealthy: false,
      severity: "medium",
      confidence: 92,
      treatment: [t("fungicideApplication"), t("nutrientManagement"), t("waterManagement")],
    },
    {
      id: "4",
      date: "2024-01-12",
      image: "/placeholder.svg?height=200&width=200",
      disease: "Bacterial Spot",
      isHealthy: false,
      severity: "medium",
      confidence: 88,
      treatment: [t("copperSpray"), t("removeDebris"), t("avoidOverhead")],
    },
  ]

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

  const generateReport = (item: HistoryItem) => {
    // In a real app, this would generate and download a PDF
    const reportData = {
      date: item.date,
      disease: item.disease,
      confidence: item.confidence,
      treatment: item.treatment,
    }

    console.log("Generating report for:", reportData)
    alert(t("reportGenerated"))
  }

  const deleteItem = (id: string) => {
    // In a real app, this would delete from database
    console.log("Deleting item:", id)
    alert(t("itemDeleted"))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
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
              <h1 className="text-xl font-bold text-gray-900">{t("history")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <VoiceAssistant />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{historyItems.length}</div>
              <div className="text-gray-600">{t("totalScans")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {historyItems.filter((item) => item.isHealthy).length}
              </div>
              <div className="text-gray-600">{t("healthyCrops")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {historyItems.filter((item) => !item.isHealthy).length}
              </div>
              <div className="text-gray-600">{t("diseasedCrops")}</div>
            </CardContent>
          </Card>
        </div>

        {/* History Items */}
        <Card>
          <CardHeader>
            <CardTitle>{t("scanHistory")}</CardTitle>
            <CardDescription>{t("historyDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.disease}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.isHealthy ? t("healthy") : item.disease}</h3>
                      <Badge className={getSeverityColor(item.severity)}>{item.confidence}%</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.treatment.slice(0, 2).join(", ")}
                      {item.treatment.length > 2 && "..."}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => generateReport(item)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed View Modal */}
        {selectedItem && (
          <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{selectedItem.isHealthy ? t("healthy") : selectedItem.disease}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-64">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.disease}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>{t("date")}:</strong> {new Date(selectedItem.date).toLocaleDateString()}
                </div>
                <div>
                  <strong>{t("confidence")}:</strong> {selectedItem.confidence}%
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t("treatment")}:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedItem.treatment.map((treatment, index) => (
                    <li key={index}>{treatment}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => generateReport(selectedItem)}>
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadReport")}
                </Button>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  {t("close")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
