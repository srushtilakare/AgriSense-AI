"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function VoiceAssistant() {
  const { t, language } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("speechSynthesis" in window && "webkitSpeechRecognition" in window)
  }, [])

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!isSupported) return

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      console.log("Voice command:", transcript)

      // Handle voice commands
      if (transcript.includes("upload") || transcript.includes("अपलोड") || transcript.includes("अपलोड")) {
        speak(t("uploadImage"))
      } else if (transcript.includes("detect") || transcript.includes("पहचान") || transcript.includes("ओळख")) {
        speak(t("detectDisease"))
      } else if (transcript.includes("weather") || transcript.includes("मौसम") || transcript.includes("हवामान")) {
        speak(t("weatherInsights"))
      } else {
        speak(t("commandNotRecognized") || "Command not recognized")
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
  }

  if (!isSupported) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={isListening ? stopListening : startListening}
      className={isListening ? "text-red-600" : ""}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </Button>
  )
}
