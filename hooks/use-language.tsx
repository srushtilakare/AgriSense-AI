"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

type Language = "en" | "hi" | "mr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation & Common
    back: "Back",
    home: "Home",
    features: "Features",
    login: "Login",
    logout: "Logout",
    cancel: "Cancel",
    close: "Close",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    loading: "Loading...",
    or: "or",

    // Home Page
    tagline: "Empowering Farmers with AI-Based Crop Health Diagnosis",
    heroTitle: "Smart Crop Disease Detection",
    heroDescription:
      "Upload a photo of your crop and get instant AI-powered disease diagnosis with treatment recommendations.",
    startDetection: "Start Detection",
    checkWeather: "Check Weather",
    aiPowered: "AI Powered",
    cropsAnalyzed: "Crops Analyzed",
    accuracy: "Accuracy Rate",
    diseasesDetected: "Diseases in Database",
    allRightsReserved: "All rights reserved.",

    // Features
    cropDetection: "Crop Disease Detection",
    cropDetectionDesc: "Upload crop images for instant AI diagnosis",
    weatherInsights: "Weather Insights",
    weatherInsightsDesc: "Get weather-based disease risk predictions",
    education: "Crop Education",
    educationDesc: "Learn about common crop diseases and treatments",
    history: "Scan History",
    historyDesc: "View your previous scans and reports",

    // Detection Page
    uploadImage: "Upload Crop Image",
    uploadImageDesc: "Take a clear photo of the affected crop leaf for accurate diagnosis",
    uploadFromDevice: "Upload from Device",
    takePhoto: "Take Photo",
    detectDisease: "Detect Disease",
    analyzing: "Analyzing...",
    detectionResult: "Detection Result",
    confidence: "Confidence",
    healthy: "Healthy Crop",
    severity: "Severity",
    low: "Low",
    medium: "Medium",
    high: "High",
    curable: "Curable",
    notCurable: "Not Curable",
    symptoms: "Symptoms",
    treatment: "Treatment",
    consultExpert: "For severe cases, please consult with agricultural experts.",

    // Weather Page
    location: "Location",
    locationDesc: "Enter your location to get weather-based disease risk assessment",
    enterCity: "Enter city name",
    getWeather: "Get Weather",
    useCurrentLocation: "Use Current Location",
    gettingLocation: "Getting Location...",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    windSpeed: "Wind Speed",
    diseaseRisk: "Disease Risk Assessment",
    risk: "Risk",
    recommendations: "Recommendations",
    weeklyForecast: "7-Day Forecast",

    // Weather Risk Messages
    highFungalRisk: "High humidity and rainfall create favorable conditions for fungal diseases",
    lowDiseaseRisk: "Current weather conditions are favorable with low disease risk",
    moderateRisk: "Moderate weather conditions - monitor crops closely",

    // Weather Recommendations
    avoidIrrigation: "Avoid overhead irrigation during humid conditions",
    improveVentilation: "Improve air circulation around crops",
    applyFungicide: "Consider preventive fungicide application",
    monitorCrops: "Monitor crops closely for early disease signs",
    regularWatering: "Maintain regular watering schedule",
    checkSoilMoisture: "Check soil moisture levels regularly",
    protectFromHeat: "Provide shade protection during peak heat",
    maintainNutrition: "Maintain proper plant nutrition",
    monitorHumidity: "Monitor humidity levels in growing areas",
    ensureDrainage: "Ensure proper drainage to prevent waterlogging",
    preventiveMeasures: "Apply preventive disease management measures",
    regularInspection: "Conduct regular crop health inspections",

    // Education Page
    cropDiseaseLibrary: "Crop Disease Library",
    // educationDesc: "Learn about common crop diseases, their symptoms, and treatments",
    searchDiseases: "Search diseases or crops...",
    allCrops: "All Crops",
    prevention: "Prevention",
    noDiseases: "No diseases found",
    tryDifferentSearch: "Try adjusting your search terms or filters",

    // Disease Symptoms
    darkSpots: "Dark brown spots on leaves",
    yellowLeaves: "Yellowing of leaves",
    whiteGrowth: "White fuzzy growth on undersides",
    smallDarkSpots: "Small dark spots with yellow halos",
    yellowHalo: "Yellow halo around spots",
    leafDrop: "Premature leaf drop",
    whitePowder: "White powdery coating on leaves",
    stuntedGrowth: "Stunted plant growth",
    brownSpots: "Brown spots on leaves",
    leafBlight: "Leaf blight symptoms",

    // Treatments
    fungicideSpray: "Apply copper-based fungicide spray",
    removeAffectedLeaves: "Remove and destroy affected leaves",
    // improveVentilation: "Improve air circulation",
    copperSpray: "Apply copper bactericide spray",
    removeDebris: "Remove plant debris regularly",
    avoidOverhead: "Avoid overhead watering",
    keepMonitoring: "Continue regular monitoring",
    maintainGoodPractices: "Maintain good agricultural practices",
    fungicideApplication: "Apply appropriate fungicide",
    nutrientManagement: "Proper nutrient management",
    waterManagement: "Maintain proper water management",

    // Prevention
    goodVentilation: "Ensure good air circulation",
    avoidWetLeaves: "Avoid watering leaves directly",
    cropRotation: "Practice crop rotation",
    cleanSeeds: "Use clean, certified seeds",
    goodSanitation: "Maintain field sanitation",
    resistantVarieties: "Use disease-resistant varieties",
    properSpacing: "Maintain proper plant spacing",
    balancedFertilizer: "Use balanced fertilization",
    goodDrainage: "Ensure proper field drainage",

    // History Page
    totalScans: "Total Scans",
    healthyCrops: "Healthy Crops",
    diseasedCrops: "Diseased Crops",
    scanHistory: "Scan History",
    // historyDesc: "View and manage your previous crop disease scans",
    date: "Date",
    downloadReport: "Download Report",
    reportGenerated: "Report generated successfully!",
    itemDeleted: "Item deleted successfully!",

    // Admin Panel
    adminPanel: "Admin Panel",
    adminLogin: "Admin Login",
    adminLoginDesc: "Enter your credentials to access the admin panel",
    username: "Username",
    password: "Password",
    invalidCredentials: "Invalid username or password",
    backToHome: "Back to Home",
    totalUsers: "Total Users",
    diseaseStatistics: "Disease Statistics",
    mostDetectedDiseases: "Most Frequently Detected Diseases",
    addDisease: "Add Disease",
    addNewDisease: "Add New Disease",
    addDiseaseDesc: "Add a new disease to the database",
    diseaseName: "Disease Name",
    cropType: "Crop Type",
    detectedCount: "Detected",
    times: "times",
    diseaseAdded: "Disease added successfully!",
  },

  hi: {
    // Navigation & Common
    back: "वापस",
    home: "होम",
    features: "विशेषताएं",
    login: "लॉगिन",
    logout: "लॉगआउट",
    cancel: "रद्द करें",
    close: "बंद करें",
    save: "सेव करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    add: "जोड़ें",
    search: "खोजें",
    loading: "लोड हो रहा है...",
    or: "या",

    // Home Page
    tagline: "AI-आधारित फसल स्वास्थ्य निदान के साथ किसानों को सशक्त बनाना",
    heroTitle: "स्मार्ट फसल रोग पहचान",
    heroDescription: "अपनी फसल की फोटो अपलोड करें और तुरंत AI-संचालित रोग निदान और उपचार सुझाव प्राप्त करें।",
    startDetection: "पहचान शुरू करें",
    checkWeather: "मौसम जांचें",
    aiPowered: "AI संचालित",
    cropsAnalyzed: "फसलों का विश्लेषण",
    accuracy: "सटीकता दर",
    diseasesDetected: "डेटाबेस में रोग",
    allRightsReserved: "सभी अधिकार सुरक्षित।",

    // Features
    cropDetection: "फसल रोग पहचान",
    cropDetectionDesc: "तुरंत AI निदान के लिए फसल की छवियां अपलोड करें",
    weatherInsights: "मौसम अंतर्दृष्टि",
    weatherInsightsDesc: "मौसम-आधारित रोग जोखिम भविष्यवाणी प्राप्त करें",
    education: "फसल शिक्षा",
    educationDesc: "सामान्य फसल रोगों और उपचारों के बारे में जानें",
    history: "स्कैन इतिहास",
    historyDesc: "अपने पिछले स्कैन और रिपोर्ट देखें",

    // Detection Page
    uploadImage: "फसल की छवि अपलोड करें",
    uploadImageDesc: "सटीक निदान के लिए प्रभावित फसल की पत्ती की स्पष्ट तस्वीर लें",
    uploadFromDevice: "डिवाइस से अपलोड करें",
    takePhoto: "फोटो लें",
    detectDisease: "रोग की पहचान करें",
    analyzing: "विश्लेषण कर रहे हैं...",
    detectionResult: "पहचान परिणाम",
    confidence: "विश्वास",
    healthy: "स्वस्थ फसल",
    severity: "गंभीरता",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    curable: "इलाज योग्य",
    notCurable: "इलाज योग्य नहीं",
    symptoms: "लक्षण",
    treatment: "उपचार",
    consultExpert: "गंभीर मामलों के लिए, कृपया कृषि विशेषज्ञों से सलाह लें।",

    // Weather Page
    location: "स्थान",
    locationDesc: "मौसम-आधारित रोग जोखिम मूल्यांकन प्राप्त करने के लिए अपना स्थान दर्ज करें",
    enterCity: "शहर का नाम दर्ज करें",
    getWeather: "मौसम प्राप्त करें",
    useCurrentLocation: "वर्तमान स्थान का उपयोग करें",
    gettingLocation: "स्थान प्राप्त कर रहे हैं...",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "वर्षा",
    windSpeed: "हवा की गति",
    diseaseRisk: "रोग जोखिम मूल्यांकन",
    risk: "जोखिम",
    recommendations: "सिफारिशें",
    weeklyForecast: "7-दिन का पूर्वानुमान",

    // Weather Risk Messages
    highFungalRisk: "उच्च आर्द्रता और वर्षा फंगल रोगों के लिए अनुकूल स्थितियां बनाती है",
    lowDiseaseRisk: "वर्तमान मौसम स्थितियां कम रोग जोखिम के साथ अनुकूल हैं",
    moderateRisk: "मध्यम मौसम स्थितियां - फसलों की बारीकी से निगरानी करें",

    // Weather Recommendations
    avoidIrrigation: "आर्द्र स्थितियों के दौरान ऊपरी सिंचाई से बचें",
    improveVentilation: "फसलों के आसपास हवा का संचार सुधारें",
    applyFungicide: "निवारक फंगीसाइड अनुप्रयोग पर विचार करें",
    monitorCrops: "प्रारंभिक रोग संकेतों के लिए फसलों की बारीकी से निगरानी करें",
    regularWatering: "नियमित पानी देने का कार्यक्रम बनाए रखें",
    checkSoilMoisture: "मिट्टी की नमी के स्तर की नियमित जांच करें",
    protectFromHeat: "चरम गर्मी के दौरान छाया सुरक्षा प्रदान करें",
    maintainNutrition: "उचित पौधे पोषण बनाए रखें",
    monitorHumidity: "बढ़ते क्षेत्रों में आर्द्रता के स्तर की निगरानी करें",
    ensureDrainage: "जलभराव को रोकने के लिए उचित जल निकासी सुनिश्चित करें",
    preventiveMeasures: "निवारक रोग प्रबंधन उपाय लागू करें",
    regularInspection: "नियमित फसल स्वास्थ्य निरीक्षण करें",

    // Education Page
    cropDiseaseLibrary: "फसल रोग पुस्तकालय",
    // educationDesc: "सामान्य फसल रोगों, उनके लक्षणों और उपचारों के बारे में जानें",
    searchDiseases: "रोग या फसल खोजें...",
    allCrops: "सभी फसलें",
    prevention: "रोकथाम",
    noDiseases: "कोई रोग नहीं मिला",
    tryDifferentSearch: "अपने खोज शब्दों या फिल्टर को समायोजित करने का प्रयास करें",

    // Disease Symptoms
    darkSpots: "पत्तियों पर गहरे भूरे धब्बे",
    yellowLeaves: "पत्तियों का पीला होना",
    whiteGrowth: "निचली सतह पर सफेद रोमिल वृद्धि",
    smallDarkSpots: "पीले हेलो के साथ छोटे गहरे धब्बे",
    yellowHalo: "धब्बों के चारों ओर पीला हेलो",
    leafDrop: "समय से पहले पत्ती गिरना",
    whitePowder: "पत्तियों पर सफेद पाउडर कोटिंग",
    stuntedGrowth: "पौधे की बौनी वृद्धि",
    brownSpots: "पत्तियों पर भूरे धब्बे",
    leafBlight: "पत्ती झुलसा लक्षण",

    // Treatments
    fungicideSpray: "तांबा-आधारित फंगीसाइड स्प्रे लगाएं",
    removeAffectedLeaves: "प्रभावित पत्तियों को हटाएं और नष्ट करें",
    // improveVentilation: "हवा का संचार सुधारें",
    copperSpray: "तांबा बैक्टीरिसाइड स्प्रे लगाएं",
    removeDebris: "पौधे के मलबे को नियमित रूप से हटाएं",
    avoidOverhead: "ऊपरी पानी देने से बचें",
    keepMonitoring: "नियमित निगरानी जारी रखें",
    maintainGoodPractices: "अच्छी कृषि प्रथाओं को बनाए रखें",
    fungicideApplication: "उपयुक्त फंगीसाइड लगाएं",
    nutrientManagement: "उचित पोषक तत्व प्रबंधन",
    waterManagement: "उचित जल प्रबंधन बनाए रखें",

    // Prevention
    goodVentilation: "अच्छा हवा संचार सुनिश्चित करें",
    avoidWetLeaves: "पत्तियों को सीधे पानी देने से बचें",
    cropRotation: "फसल चक्र का अभ्यास करें",
    cleanSeeds: "स्वच्छ, प्रमाणित बीजों का उपयोग करें",
    goodSanitation: "खेत की स्वच्छता बनाए रखें",
    resistantVarieties: "रोग प्रतिरोधी किस्मों का उपयोग करें",
    properSpacing: "उचित पौधे की दूरी बनाए रखें",
    balancedFertilizer: "संतुलित उर्वरीकरण का उपयोग करें",
    goodDrainage: "उचित खेत जल निकासी सुनिश्चित करें",

    // History Page
    totalScans: "कुल स्कैन",
    healthyCrops: "स्वस्थ फसलें",
    diseasedCrops: "रोगग्रस्त फसलें",
    scanHistory: "स्कैन इतिहास",
    // historyDesc: "अपने पिछले फसल रोग स्कैन देखें और प्रबंधित करें",
    date: "दिनांक",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    reportGenerated: "रिपोर्ट सफलतापूर्वक तैयार की गई!",
    itemDeleted: "आइटम सफलतापूर्वक हटा दिया गया!",

    // Admin Panel
    adminPanel: "एडमिन पैनल",
    adminLogin: "एडमिन लॉगिन",
    adminLoginDesc: "एडमिन पैनल तक पहुंचने के लिए अपनी साख दर्ज करें",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    invalidCredentials: "अमान्य उपयोगकर्ता नाम या पासवर्ड",
    backToHome: "होम पर वापस",
    totalUsers: "कुल उपयोगकर्ता",
    diseaseStatistics: "रोग सांख्यिकी",
    mostDetectedDiseases: "सबसे अधिक पाए जाने वाले रोग",
    addDisease: "रोग जोड़ें",
    addNewDisease: "नया रोग जोड़ें",
    addDiseaseDesc: "डेटाबेस में एक नया रोग जोड़ें",
    diseaseName: "रोग का नाम",
    cropType: "फसल का प्रकार",
    detectedCount: "पाया गया",
    times: "बार",
    diseaseAdded: "रोग सफलतापूर्वक जोड़ा गया!",
  },

  mr: {
    // Navigation & Common
    back: "मागे",
    home: "होम",
    features: "वैशिष्ट्ये",
    login: "लॉगिन",
    logout: "लॉगआउट",
    cancel: "रद्द करा",
    close: "बंद करा",
    save: "सेव्ह करा",
    delete: "हटवा",
    edit: "संपादित करा",
    add: "जोडा",
    search: "शोधा",
    loading: "लोड होत आहे...",
    or: "किंवा",

    // Home Page
    tagline: "AI-आधारित पीक आरोग्य निदानासह शेतकऱ्यांना सक्षम करणे",
    heroTitle: "स्मार्ट पीक रोग ओळख",
    heroDescription: "तुमच्या पिकाचा फोटो अपलोड करा आणि तत्काळ AI-चालित रोग निदान आणि उपचार शिफारसी मिळवा.",
    startDetection: "ओळख सुरू करा",
    checkWeather: "हवामान तपासा",
    aiPowered: "AI चालित",
    cropsAnalyzed: "पिकांचे विश्लेषण",
    accuracy: "अचूकता दर",
    diseasesDetected: "डेटाबेसमधील रोग",
    allRightsReserved: "सर्व हक्क राखीव.",

    // Features
    cropDetection: "पीक रोग ओळख",
    cropDetectionDesc: "तत्काळ AI निदानासाठी पिकाच्या प्रतिमा अपलोड करा",
    weatherInsights: "हवामान अंतर्दृष्टी",
    weatherInsightsDesc: "हवामान-आधारित रोग जोखीम अंदाज मिळवा",
    education: "पीक शिक्षण",
    educationDesc: "सामान्य पीक रोग आणि उपचारांबद्दल जाणून घ्या",
    history: "स्कॅन इतिहास",
    historyDesc: "तुमचे मागील स्कॅन आणि अहवाल पहा",

    // Detection Page
    uploadImage: "पिकाची प्रतिमा अपलोड करा",
    uploadImageDesc: "अचूक निदानासाठी प्रभावित पिकाच्या पानाचा स्पष्ट फोटो घ्या",
    uploadFromDevice: "डिव्हाइसवरून अपलोड करा",
    takePhoto: "फोटो घ्या",
    detectDisease: "रोग ओळखा",
    analyzing: "विश्लेषण करत आहे...",
    detectionResult: "ओळख परिणाम",
    confidence: "विश्वास",
    healthy: "निरोगी पीक",
    severity: "तीव्रता",
    low: "कमी",
    medium: "मध्यम",
    high: "उच्च",
    curable: "बरा करण्यायोग्य",
    notCurable: "बरा करण्यायोग्य नाही",
    symptoms: "लक्षणे",
    treatment: "उपचार",
    consultExpert: "गंभीर प्रकरणांसाठी, कृपया कृषी तज्ञांचा सल्ला घ्या.",

    // Weather Page
    location: "स्थान",
    locationDesc: "हवामान-आधारित रोग जोखीम मूल्यांकन मिळविण्यासाठी तुमचे स्थान प्रविष्ट करा",
    enterCity: "शहराचे नाव प्रविष्ट करा",
    getWeather: "हवामान मिळवा",
    useCurrentLocation: "सध्याचे स्थान वापरा",
    gettingLocation: "स्थान मिळवत आहे...",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पाऊस",
    windSpeed: "वाऱ्याचा वेग",
    diseaseRisk: "रोग जोखीम मूल्यांकन",
    risk: "जोखीम",
    recommendations: "शिफारसी",
    weeklyForecast: "7-दिवसांचा अंदाज",

    // Weather Risk Messages
    highFungalRisk: "उच्च आर्द्रता आणि पाऊस बुरशीजन्य रोगांसाठी अनुकूल परिस्थिती निर्माण करतात",
    lowDiseaseRisk: "सध्याची हवामान परिस्थिती कमी रोग जोखमीसह अनुकूल आहे",
    moderateRisk: "मध्यम हवामान परिस्थिती - पिकांचे बारकाईने निरीक्षण करा",

    // Weather Recommendations
    avoidIrrigation: "आर्द्र परिस्थितीत वरच्या सिंचनापासून टाळा",
    improveVentilation: "पिकांभोवती हवेचे संचलन सुधारा",
    applyFungicide: "प्रतिबंधात्मक बुरशीनाशक वापरण्याचा विचार करा",
    monitorCrops: "प्रारंभिक रोग चिन्हांसाठी पिकांचे बारकाईने निरीक्षण करा",
    regularWatering: "नियमित पाणी देण्याचे वेळापत्रक राखा",
    checkSoilMoisture: "मातीतील ओलावा पातळीची नियमित तपासणी करा",
    protectFromHeat: "तीव्र उष्णतेदरम्यान सावलीचे संरक्षण प्रदान करा",
    maintainNutrition: "योग्य वनस्पती पोषण राखा",
    monitorHumidity: "वाढत्या क्षेत्रांमध्ये आर्द्रता पातळीचे निरीक्षण करा",
    ensureDrainage: "जलसाठा टाळण्यासाठी योग्य निचरा सुनिश्चित करा",
    preventiveMeasures: "प्रतिबंधात्मक रोग व्यवस्थापन उपाय लागू करा",
    regularInspection: "नियमित पीक आरोग्य तपासणी करा",

    // Education Page
    cropDiseaseLibrary: "पीक रोग ग्रंथालय",
    // educationDesc: "सामान्य पीक रोग, त्यांची लक्षणे आणि उपचारांबद्दल जाणून घ्या",
    searchDiseases: "रोग किंवा पिके शोधा...",
    allCrops: "सर्व पिके",
    prevention: "प्रतिबंध",
    noDiseases: "कोणतेही रोग सापडले नाहीत",
    tryDifferentSearch: "तुमचे शोध शब्द किंवा फिल्टर समायोजित करण्याचा प्रयत्न करा",

    // Disease Symptoms
    darkSpots: "पानांवर गडद तपकिरी डाग",
    yellowLeaves: "पानांचे पिवळे होणे",
    whiteGrowth: "खालच्या बाजूला पांढरी केसाळ वाढ",
    smallDarkSpots: "पिवळ्या हेलोसह लहान गडद डाग",
    yellowHalo: "डागांभोवती पिवळा हेलो",
    leafDrop: "वेळेपूर्वी पान गळणे",
    whitePowder: "पानांवर पांढरे पावडर कोटिंग",
    stuntedGrowth: "वनस्पतीची बौनी वाढ",
    brownSpots: "पानांवर तपकिरी डाग",
    leafBlight: "पान जळजळीची लक्षणे",

    // Treatments
    fungicideSpray: "तांबे-आधारित बुरशीनाशक फवारणी लावा",
    removeAffectedLeaves: "प्रभावित पाने काढा आणि नष्ट करा",
    // improveVentilation: "हवेचे संचलन सुधारा",
    copperSpray: "तांबे जीवाणूनाशक फवारणी लावा",
    removeDebris: "वनस्पतींचा कचरा नियमितपणे काढा",
    avoidOverhead: "वरच्या पाणी देण्यापासून टाळा",
    keepMonitoring: "नियमित निरीक्षण चालू ठेवा",
    maintainGoodPractices: "चांगल्या कृषी पद्धती राखा",
    fungicideApplication: "योग्य बुरशीनाशक लावा",
    nutrientManagement: "योग्य पोषक व्यवस्थापन",
    waterManagement: "योग्य जल व्यवस्थापन राखा",

    // Prevention
    goodVentilation: "चांगले हवा संचलन सुनिश्चित करा",
    avoidWetLeaves: "पानांना थेट पाणी देण्यापासून टाळा",
    cropRotation: "पीक फेरफारचा सराव करा",
    cleanSeeds: "स्वच्छ, प्रमाणित बियाणे वापरा",
    goodSanitation: "शेताची स्वच्छता राखा",
    resistantVarieties: "रोग प्रतिरोधी जाती वापरा",
    properSpacing: "योग्य वनस्पती अंतर राखा",
    balancedFertilizer: "संतुलित खत वापरा",
    goodDrainage: "योग्य शेत निचरा सुनिश्चित करा",

    // History Page
    totalScans: "एकूण स्कॅन",
    healthyCrops: "निरोगी पिके",
    diseasedCrops: "रोगग्रस्त पिके",
    scanHistory: "स्कॅन इतिहास",
    // historyDesc: "तुमचे मागील पीक रोग स्कॅन पहा आणि व्यवस्थापित करा",
    date: "दिनांक",
    downloadReport: "अहवाल डाउनलोड करा",
    reportGenerated: "अहवाल यशस्वीरित्या तयार केला!",
    itemDeleted: "आयटम यशस्वीरित्या हटविला!",

    // Admin Panel
    adminPanel: "अॅडमिन पॅनेल",
    adminLogin: "अॅडमिन लॉगिन",
    adminLoginDesc: "अॅडमिन पॅनेलमध्ये प्रवेश करण्यासाठी तुमची ओळखपत्रे प्रविष्ट करा",
    username: "वापरकर्ता नाव",
    password: "पासवर्ड",
    invalidCredentials: "अवैध वापरकर्ता नाव किंवा पासवर्ड",
    backToHome: "होमवर परत",
    totalUsers: "एकूण वापरकर्ते",
    diseaseStatistics: "रोग आकडेवारी",
    mostDetectedDiseases: "सर्वाधिक आढळणारे रोग",
    addDisease: "रोग जोडा",
    addNewDisease: "नवीन रोग जोडा",
    addDiseaseDesc: "डेटाबेसमध्ये नवीन रोग जोडा",
    diseaseName: "रोगाचे नाव",
    cropType: "पिकाचा प्रकार",
    detectedCount: "आढळले",
    times: "वेळा",
    diseaseAdded: "रोग यशस्वीरित्या जोडला!",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("agrisense-language") as Language
    if (savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("agrisense-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
