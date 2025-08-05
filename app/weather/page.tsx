"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CloudRain,
  Sun,
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  MapPin,
  ArrowLeft,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import { VoiceAssistant } from "@/components/voice-assistant"

interface WeatherData {
  location: string
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: "sunny" | "cloudy" | "rainy"
  riskLevel: "low" | "medium" | "high"
  riskMessage: string
  recommendations: string[]
}

export default function WeatherPage() {
  const { t } = useLanguage()
  const [location, setLocation] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const getLocationWeather = async () => {
    setIsGettingLocation(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, use coordinates to get weather
          fetchWeatherData("Current Location")
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsGettingLocation(false)
        },
      )
    }
  }

  const fetchWeatherData = async (locationName: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockWeatherData: WeatherData[] = [
        {
          location: locationName,
          temperature: 28,
          humidity: 85,
          rainfall: 15,
          windSpeed: 12,
          condition: "rainy",
          riskLevel: "high",
          riskMessage: t("highFungalRisk"),
          recommendations: [t("avoidIrrigation"), t("improveVentilation"), t("applyFungicide"), t("monitorCrops")],
        },
        {
          location: locationName,
          temperature: 32,
          humidity: 45,
          rainfall: 0,
          windSpeed: 8,
          condition: "sunny",
          riskLevel: "low",
          riskMessage: t("lowDiseaseRisk"),
          recommendations: [t("regularWatering"), t("checkSoilMoisture"), t("protectFromHeat"), t("maintainNutrition")],
        },
        {
          location: locationName,
          temperature: 25,
          humidity: 70,
          rainfall: 5,
          windSpeed: 15,
          condition: "cloudy",
          riskLevel: "medium",
          riskMessage: t("moderateRisk"),
          recommendations: [t("monitorHumidity"), t("ensureDrainage"), t("preventiveMeasures"), t("regularInspection")],
        },
      ]

      const randomData = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)]
      setWeatherData(randomData)
      setIsLoading(false)
    }, 1500)
  }

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      fetchWeatherData(location)
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-500" />
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-100 border-red-200"
      default:
        return "text-gray-600 bg-gray-100 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
              <h1 className="text-xl font-bold text-gray-900">{t("weatherInsights")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <VoiceAssistant />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Location Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{t("location")}</span>
            </CardTitle>
            <CardDescription>{t("locationDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLocationSubmit} className="flex space-x-2">
              <Input
                placeholder={t("enterCity")}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("getWeather")}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-500">{t("or")}</span>
            </div>

            <Button
              onClick={getLocationWeather}
              variant="outline"
              className="w-full bg-transparent"
              disabled={isGettingLocation}
            >
              {isGettingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("gettingLocation")}
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  {t("useCurrentLocation")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Weather Data */}
        {weatherData && (
          <>
            {/* Current Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{weatherData.location}</span>
                  {getWeatherIcon(weatherData.condition)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                    <div className="text-sm text-gray-600">{t("temperature")}</div>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                    <div className="text-sm text-gray-600">{t("humidity")}</div>
                  </div>
                  <div className="text-center">
                    <CloudRain className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{weatherData.rainfall}mm</div>
                    <div className="text-sm text-gray-600">{t("rainfall")}</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                    <div className="text-2xl font-bold">{weatherData.windSpeed} km/h</div>
                    <div className="text-sm text-gray-600">{t("windSpeed")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disease Risk Alert */}
            <Card className={`border-2 ${getRiskColor(weatherData.riskLevel)}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{t("diseaseRisk")}</span>
                  <Badge className={getRiskColor(weatherData.riskLevel)}>
                    {t(weatherData.riskLevel)} {t("risk")}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{weatherData.riskMessage}</AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-semibold mb-2">{t("recommendations")}:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {weatherData.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-700">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Weather Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>{t("weeklyForecast")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <div key={day} className="text-center p-2 rounded-lg bg-gray-50">
                      <div className="text-sm font-medium">{day}</div>
                      <Sun className="w-4 h-4 mx-auto my-1 text-yellow-500" />
                      <div className="text-xs">{25 + index}°C</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
