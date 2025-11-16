"use client";

//import { useState } from "react";
import { Label } from "../ui/label";
//import MultiSelect from "../../../components/form/MultiSelect";
import Radio from "../../../components/form/input/Radio";
import DatePicker from "../../../components/form/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface FormationProps {
    formData: {
        formationType: string;
        formationPack: string;
        selectedVagues: string[];
        paymentMode: string;
        startDate: string;
        endDate: string;
    };
    updateFormData: (data: Partial<FormationProps["formData"]>) => void;
}

export default function Formation({ formData, updateFormData }: FormationProps) {

    // Options pour le champ "Pack de formation"
    const packOptions = [
        { value: "Pack Elite", label: "Pack Elite" },
        { value: "Pack Premium", label: "Pack Premium" },
    ];

    // Options pour le champ "Vagues"
    const vagueOptions = [
        { value: "1", text: "Vague 1", selected: false },
        { value: "2", text: "Vague 2", selected: false },
        { value: "3", text: "Vague 3", selected: false },
        { value: "4", text: "Vague 4", selected: false },
        { value: "5", text: "Vague 5", selected: false },
    ];

    return (
        <div className="space-y-8">
            {/* Type de formation */}
            <div className="space-y-4">
                <Label htmlFor="formationType">Mode de formation
                    <span className="text-red-600">*</span>
                </Label>
                <div className="flex flex-wrap items-center gap-8">
                    <Radio
                        id="EnLigne"
                        name="formationType"
                        value="En ligne"
                        checked={formData.formationType === "En ligne"}
                        onChange={() => updateFormData({ formationType: "En ligne" })}
                        label="Formation en ligne"
                    />
                    <Radio
                        id="Presentiel"
                        name="formationType"
                        value="Présentiel"
                        checked={formData.formationType === "Présentiel"}
                        onChange={() => updateFormData({ formationType: "Présentiel" })}
                        label="Formation en présentiel"
                    />
                </div>
            </div>

            {/* Pack de formation */}
            <div className="grid md:grid-cols-2 gap-4 justify-center">
                <div className="space-y-4">
                    <Label htmlFor="formationPack">Pack de formation</Label>
                    <div className="relative">
                        <Select
                            value={formData.formationPack}
                            onValueChange={(value) => updateFormData({ formationPack: value })}
                        >
                            <SelectTrigger id="formationPack" className="dark:border-gray-800 dark:bg-white/[0.03] w-full">
                                <SelectValue placeholder="Sélectionnez un pack de formation" />
                            </SelectTrigger>
                            <SelectContent>
                                {packOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Sélection des vagues */}
                <div className="space-y-4">
                    <Label htmlFor="selectedVagues">Sélectionnez une vague</Label>
                    <div className="relative">
                        <Select
                            value={formData.selectedVagues[0] || ""}
                            onValueChange={(value) => updateFormData({ selectedVagues: [value] })}
                        >
                            <SelectTrigger id="selectedVagues" className="dark:border-gray-800 dark:bg-white/[0.03] w-full">
                                <SelectValue placeholder="Sélectionnez une ou plusieurs vagues" />
                            </SelectTrigger>
                            <SelectContent>
                                {vagueOptions.map((vague) => (
                                    <SelectItem key={vague.value} value={vague.value}>
                                        {vague.text}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="formationDates">Dates de la formation</Label>
                <div className="flex flex-wrap gap-4">
                    <div className="space-y-2">
                        <DatePicker
                            id="startDate"
                            placeholder="Date de début"
                            value={formData.startDate ? new Date(formData.startDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""}
                            onChange={(date) => updateFormData({ startDate: date[0]?.toISOString().split("T")[0] || "" })}
                        />
                    </div>
                    <div className="space-y-2">
                        <DatePicker
                            id="endDate"
                            placeholder="Date de fin"
                            value={formData.endDate ? new Date(formData.endDate).toLocaleDateString("fr-FR") : ""}
                            onChange={(date) => updateFormData({ endDate: date[0]?.toISOString().split("T")[0] || "" })}
                        />
                    </div>
                </div>
            </div>

            {/* Mode de paiement */}
            <div className="space-y-4">
                <Label htmlFor="paymentMode">Type de paiement</Label>
                <div className="flex flex-wrap items-center gap-8">
                    <Radio
                        id="total"
                        name="paymentMode"
                        value="Paiement total"
                        checked={formData.paymentMode === "Paiement total"}
                        onChange={() => updateFormData({ paymentMode: "Paiement total" })}
                        label="Paiement total"
                    />
                    <Radio
                        id="echelonne"
                        name="paymentMode"
                        value="Paiement échelonné"
                        checked={formData.paymentMode === "Paiement échelonné"}
                        onChange={() => updateFormData({ paymentMode: "Paiement échelonné" })}
                        label="Paiement échelonné"
                    />
                </div>
            </div>
        </div>
    );
}