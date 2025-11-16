"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { PersonalInfoStep } from "./form-steps/personal-info-step"
import { ContactInfoStep } from "./form-steps/contact-info-step"
import { PreferencesStep } from "./form-steps/preferences-step"
//import { ReviewStep } from "./form-steps/review-step"
import {Review} from "./form-steps/review"
import { useToast } from "../.../../hooks/use-toast"

export type FormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string | undefined;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  newsletter: boolean;
  notifications: boolean;
  interests: string[];
  comments: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  newsletter: false,
  notifications: false,
  interests: [],
  comments: "",
}

const STEPS = [
  { id: 1, title: "Informations Personnelles", description: "Vos données de base" },
  { id: 2, title: "Coordonnées", description: "Comment vous contacter" },
  { id: 3, title: "Préférences", description: "Vos choix et intérêts" },
  { id : 4, title: "Révision", description: "Vérifiez vos informations" },
  //{ id: 5, title: "Révision", description: "Vérifiez vos informations" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // État pour le chargement
  const [showDialog, setShowDialog] = useState(false) // État pour la boîte de dialogue
  const { toast } = useToast() // Removed unused toast declaration

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName.trim() !== "" &&
          formData.lastName.trim() !== "" &&
          formData.dateOfBirth !== "" &&
          formData.gender.trim() !== ""
        )
      case 2:
        return (
          formData.email.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.address.trim() !== "" &&
          formData.city.trim() !== ""
        )
      case 3:
        return formData.interests.length > 0
      default:
        return true
    }
  }

  const nextStep = () => {
    if (!validateStep()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires avant de continuer.",
        action: undefined,
      });
      return;
    }
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }, 100); // Délai de 100ms
  };

  const prevStep = () => {
    setErrorMessage(null)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const existingSubmissions = localStorage.getItem("formSubmissions");
      const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : [];

      const newSubmission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...formData,
      };

      submissions.push(newSubmission);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));

      setIsSubmitting(false);
      setShowDialog(true);

      toast({
        title: "Succès",
        description: "Vos informations ont été enregistrées avec succès.",
        action: undefined,
      });

      setTimeout(() => {
        setShowDialog(false);
      }, 3000);
    }, 2000);
  };

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          {currentStep <= STEPS.length
            ? `Étape ${currentStep} sur ${STEPS.length}: ${STEPS[currentStep - 1]?.title || ""}`
            : "Étape inconnue"}
        </p>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1]?.title || "Erreur"}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1]?.description || ""}</CardDescription>
        </CardHeader>
        <CardContent key={currentStep} className="space-y-6">
          {currentStep === 1 && <PersonalInfoStep key="step1" formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <ContactInfoStep key="step2" formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <PreferencesStep key="step3" formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <Review key="step4" formData={formData} updateFormData={updateFormData} />}
        </CardContent>
        

        {currentStep > STEPS.length && (
            <p className="text-center text-red-500 font-medium">Erreur : étape inconnue</p>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>

            {currentStep < STEPS.length ? (
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="loader"></span> En cours...
                  </span>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Soumettre
                  </>
                )}
              </Button>
            )}
          </div>
      </Card>

      {/* Boîte de dialogue */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-bold">Inscription réussie !</h2>
            <p className="text-sm text-muted-foreground">Vos informations ont été enregistrées avec succès.</p>
          </div>
        </div>
      )}
    </div>
  )
}
