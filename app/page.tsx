"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, CloudRain, BookOpen, History, Settings, Leaf } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "@/components/language-toggle"
import { VoiceAssistant } from "@/components/voice-assistant"

export default function HomePage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Camera,
      title: t("cropDetection"),
      description: t("cropDetectionDesc"),
      href: "/detect",
      color: "bg-green-500",
    },
    {
      icon: CloudRain,
      title: t("weatherInsights"),
      description: t("weatherInsightsDesc"),
      href: "/weather",
      color: "bg-blue-500",
    },
    {
      icon: BookOpen,
      title: t("education"),
      description: t("educationDesc"),
      href: "/education",
      color: "bg-purple-500",
    },
    {
      icon: History,
      title: t("history"),
      description: t("historyDesc"),
      href: "/history",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgriSense AI</h1>
                <p className="text-xs text-gray-600">{t("tagline")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <VoiceAssistant />
              <LanguageToggle />
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            {t("aiPowered")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("heroTitle")}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("heroDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/detect">
              <Button size="lg" className="w-full sm:w-auto">
                <Camera className="w-5 h-5 mr-2" />
                {t("startDetection")}
              </Button>
            </Link>
            <Link href="/weather">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <CloudRain className="w-5 h-5 mr-2" />
                {t("checkWeather")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">{t("features")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">{t("cropsAnalyzed")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">{t("accuracy")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">{t("diseasesDetected")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AgriSense AI</span>
          </div>
          <p className="text-gray-400 mb-4">{t("tagline")}</p>
          <p className="text-sm text-gray-500">© 2024 AgriSense AI. {t("allRightsReserved")}</p>
        </div>
      </footer>
    </div>
  )
}
