"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, BookOpen, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import { VoiceAssistant } from "@/components/voice-assistant"
import Image from "next/image"

interface Disease {
  id: string
  name: string
  crop: string
  severity: "low" | "medium" | "high"
  symptoms: string[]
  prevention: string[]
  treatment: string[]
  image: string
  curable: boolean
}

export default function EducationPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("all")

  const diseases: Disease[] = [
    {
      id: "1",
      name: "Late Blight",
      crop: "Tomato",
      severity: "high",
      symptoms: [t("darkSpots"), t("yellowLeaves"), t("whiteGrowth")],
      prevention: [t("goodVentilation"), t("avoidWetLeaves"), t("cropRotation")],
      treatment: [t("fungicideSpray"), t("removeAffectedLeaves"), t("improveVentilation")],
      image: "/placeholder.svg?height=200&width=300",
      curable: true,
    },
    {
      id: "2",
      name: "Bacterial Spot",
      crop: "Tomato",
      severity: "medium",
      symptoms: [t("smallDarkSpots"), t("yellowHalo"), t("leafDrop")],
      prevention: [t("cleanSeeds"), t("avoidOverhead"), t("goodSanitation")],
      treatment: [t("copperSpray"), t("removeDebris"), t("avoidOverhead")],
      image: "/placeholder.svg?height=200&width=300",
      curable: false,
    },
    {
      id: "3",
      name: "Powdery Mildew",
      crop: "Wheat",
      severity: "medium",
      symptoms: [t("whitePowder"), t("yellowLeaves"), t("stuntedGrowth")],
      prevention: [t("resistantVarieties"), t("properSpacing"), t("goodVentilation")],
      treatment: [t("fungicideSpray"), t("removeAffectedParts"), t("improveAirflow")],
      image: "/placeholder.svg?height=200&width=300",
      curable: true,
    },
    {
      id: "4",
      name: "Brown Spot",
      crop: "Rice",
      severity: "low",
      symptoms: [t("brownSpots"), t("yellowHalo"), t("leafBlight")],
      prevention: [t("balancedFertilizer"), t("goodDrainage"), t("cleanSeeds")],
      treatment: [t("fungicideApplication"), t("nutrientManagement"), t("waterManagement")],
      image: "/placeholder.svg?height=200&width=300",
      curable: true,
    },
  ]

  const crops = ["all", "Tomato", "Wheat", "Rice", "Cotton", "Corn"]

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.crop.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = selectedCrop === "all" || disease.crop === selectedCrop
    return matchesSearch && matchesCrop
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50">
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
              <h1 className="text-xl font-bold text-gray-900">{t("education")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <VoiceAssistant />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{t("cropDiseaseLibrary")}</span>
            </CardTitle>
            <CardDescription>{t("educationDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t("searchDiseases")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {crops.map((crop) => (
                <Button
                  key={crop}
                  variant={selectedCrop === crop ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCrop(crop)}
                >
                  {crop === "all" ? t("allCrops") : crop}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <Card key={disease.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={disease.image || "/placeholder.svg"}
                  alt={disease.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{disease.name}</CardTitle>
                    <CardDescription>{disease.crop}</CardDescription>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getSeverityColor(disease.severity)}>{t(disease.severity)}</Badge>
                    {disease.curable ? (
                      <Badge variant="default" className="text-green-600 bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t("curable")}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {t("notCurable")}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">{t("symptoms")}:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {disease.symptoms.slice(0, 2).map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">{t("prevention")}:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {disease.prevention.slice(0, 2).map((prevention, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {prevention}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">{t("treatment")}:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {disease.treatment.slice(0, 2).map((treatment, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("noDiseases")}</h3>
              <p className="text-gray-600">{t("tryDifferentSearch")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
