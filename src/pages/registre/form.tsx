"use client";

import { useState } from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Formation from "./steps/formation";
//import Step3 from "./steps/Step3";
import Review from "./steps/Review";
import Paiement from "./steps/paiement";

const STEPS = [
    { id: 1, title: "Informations Personnelles", description: "Vos données de base" },
    { id: 2, title: "Coordonnées", description: "Comment vous contacter" },
    { id: 3, title: "Informations sur la formation", description: "Détails de la formation" },
    { id: 4, title: "Informations sur le Paiement", description: "Votre mode de paiement" },
    { id: 5, title: "Révision", description: "Vérifiez vos informations" },
];

const INITIAL_FORM_DATA = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    gender: "",
    email: "",
    phone: "",
    country: "",
    formationType: "",
    formationPack: "",
    selectedVagues: [] as string[],
    paymentMode: "",
    Modepayment: "",
    amountToPay: "",
    numberCount: "",
    startDate: "",
    endDate: "",
    preferences: [] as string[],
};

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const updateFormData = (data: Partial<typeof INITIAL_FORM_DATA>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Formulaire soumis :", formData);
            setIsSubmitting(false);
            setShowDialog(true);

            setTimeout(() => {
                setShowDialog(false);
            }, 9000);
        }, 2000);
    };

    const progress = (currentStep / STEPS.length) * 100;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
                <p className="text-muted-foreground">
                    {currentStep <= STEPS.length
                        ? `Étape ${currentStep} sur ${STEPS.length}: ${STEPS[currentStep - 1]?.title || ""}`
                        : "Étape inconnue"}
                </p>
            </div>
            <Progress value={progress} className="mb-4" />

            <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
                <CardHeader>
                    <CardTitle>{STEPS[currentStep - 1]?.title || "Erreur"}</CardTitle>
                    <CardDescription>{STEPS[currentStep - 1]?.description || ""}</CardDescription>
                </CardHeader>
                <CardContent>
                    {currentStep === 1 && (
                        <Step1 formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 2 && (
                        <Step2 formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 3 && (
                        <Formation formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 4 && (
                        <Paiement formData={formData} updateFormData={updateFormData} />
                    )}
                    {currentStep === 5 && (
                        <Review formData={formData} />
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Précédent
                </Button>
                {currentStep < STEPS.length ? (
                    <Button onClick={() => {
                        setIsSubmitting(true);
                        setTimeout(() => {
                            nextStep();
                            setIsSubmitting(false);
                        }, 500); // Simulate a small delay for the animation
                    }} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="loader"></span> Chargement...
                            </span>
                        ) : (
                            "Suivant"
                        )}
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="loader"></span> En cours...
                            </span>
                        ) : (
                            "Soumettre"
                        )}
                    </Button>
                )}
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-800">Inscription réussie !</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Vos informations ont été enregistrées avec succès.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="mt-4">
                                <Button onClick={() => setShowDialog(false)} className="w-full">
                                    Fermer
                                </Button>
                            </div>

                            <div className="mt-4 text-left text-sm text-gray-500">
                                <Button className="dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 w-full">
                                    Voir les détails
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}