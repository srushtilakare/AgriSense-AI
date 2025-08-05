"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Upload, Loader2, ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import { VoiceAssistant } from "@/components/voice-assistant"
import Image from "next/image"

interface DetectionResult {
  disease: string
  isHealthy: boolean
  symptoms: string[]
  treatment: string[]
  curable: boolean
  severity: "low" | "medium" | "high"
  confidence: number
}

export default function DetectPage() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const detectDisease = async () => {
    if (!selectedImage) return

    setIsLoading(true)

    // Simulate API call to Flask backend
    setTimeout(() => {
      // Mock response - in real app, this would be an API call
      const mockResults: DetectionResult[] = [
        {
          disease: "Healthy",
          isHealthy: true,
          symptoms: [],
          treatment: [t("keepMonitoring"), t("maintainGoodPractices")],
          curable: true,
          severity: "low",
          confidence: 95,
        },
        {
          disease: "Late Blight",
          isHealthy: false,
          symptoms: [t("darkSpots"), t("yellowLeaves"), t("whiteGrowth")],
          treatment: [t("fungicideSpray"), t("removeAffectedLeaves"), t("improveVentilation")],
          curable: true,
          severity: "high",
          confidence: 87,
        },
        {
          disease: "Bacterial Spot",
          isHealthy: false,
          symptoms: [t("smallDarkSpots"), t("yellowHalo"), t("leafDrop")],
          treatment: [t("copperSpray"), t("removeDebris"), t("avoidOverhead")],
          curable: false,
          severity: "medium",
          confidence: 92,
        },
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)
      setIsLoading(false)
    }, 2000)
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

  const getResultIcon = (isHealthy: boolean, severity: string) => {
    if (isHealthy) return <CheckCircle className="w-6 h-6 text-green-600" />
    if (severity === "high") return <XCircle className="w-6 h-6 text-red-600" />
    return <AlertTriangle className="w-6 h-6 text-yellow-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
              <h1 className="text-xl font-bold text-gray-900">{t("cropDetection")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <VoiceAssistant />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>{t("uploadImage")}</span>
            </CardTitle>
            <CardDescription>{t("uploadImageDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="h-32 flex-col space-y-2"
              >
                <Upload className="w-8 h-8" />
                <span>{t("uploadFromDevice")}</span>
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                variant="outline"
                className="h-32 flex-col space-y-2"
              >
                <Camera className="w-8 h-8" />
                <span>{t("takePhoto")}</span>
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />

            {selectedImage && (
              <div className="space-y-4">
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected crop"
                    fill
                    className="object-contain"
                  />
                </div>
                <Button onClick={detectDisease} disabled={isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("analyzing")}
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      {t("detectDisease")}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <Card
            className={`border-2 ${result.isHealthy ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getResultIcon(result.isHealthy, result.severity)}
                  <span>{t("detectionResult")}</span>
                </div>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.confidence}% {t("confidence")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{result.isHealthy ? t("healthy") : result.disease}</h3>
                {!result.isHealthy && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getSeverityColor(result.severity)}>
                      {t("severity")}: {t(result.severity)}
                    </Badge>
                    <Badge variant={result.curable ? "default" : "destructive"}>
                      {result.curable ? t("curable") : t("notCurable")}
                    </Badge>
                  </div>
                )}
              </div>

              {result.symptoms.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t("symptoms")}:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.symptoms.map((symptom, index) => (
                      <li key={index} className="text-gray-700">
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">{t("treatment")}:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.treatment.map((treatment, index) => (
                    <li key={index} className="text-gray-700">
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{t("consultExpert")}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
