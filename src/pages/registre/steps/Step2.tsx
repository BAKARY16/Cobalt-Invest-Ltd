"use client";

import { useState } from "react";
import Inputs from "../ui/InputField";
import { Label } from "../ui/label";
import { EnvelopeIcon } from "../../../icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { COUNTRIES } from "../countries"; // Importer la liste des pays

interface Step2Props {
  formData: {
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  updateFormData: (data: Partial<Step2Props["formData"]>) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  const [searchTerm, setSearchTerm] = useState(""); // État pour gérer la recherche

  // Filtrer les pays en fonction de la recherche (en ignorant les accents)
  const filteredCountries = COUNTRIES.filter((country) =>
    country
      .normalize("NFD") // Décomposer les caractères accentués
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .toLowerCase()
      .includes(
        searchTerm
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      )
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email
            <span className="text-red-600">*</span>
          </Label>
          <div className="relative">
            <Inputs
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="jean.dupont@example.com"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6 fill-gray-500" />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone
            <span className="text-red-600">*</span>
          </Label>
          <Inputs
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+225 07 07 07 07 07"
          />
        </div>
      </div>

      {/* Champ de sélection pour les pays */}
      <div className="grid md:grid-cols-2 gap-4 items-center">

        <div className="space-y-2">
          <Label htmlFor="city">Ville
            <span className="text-red-600">*</span>
          </Label>
          <Inputs
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="Abidjan"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Pays
            <span className="text-red-600">*</span>
          </Label>
          <Select
            value={formData.country}
            onValueChange={(value) => updateFormData({ country: value })}
          >
            <SelectTrigger id="country" className="dark:border-gray-800 dark:bg-white/[0.03] w-full">
              <SelectValue placeholder="Sélectionnez votre pays" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {/* Barre de recherche */}
              <div className="p-2">
                <Inputs
                  type="text"
                  placeholder="Rechercher un pays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              {/* Liste des pays filtrés */}
              {filteredCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Adresse
            <span className="text-red-600">*</span>
          </Label>
          <Inputs
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="123 Rue de la Paix"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Inputs
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormData({ postalCode: e.target.value })}
            placeholder="75001"
          />
        </div>
      </div>
    </div>
  );
}