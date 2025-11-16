"use client";
import { Label } from "../ui/label";
import Inputs from "../ui/InputField"
import DatePicker from "../../../components/form/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


interface Step1Props {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: string;
  };
  updateFormData: (data: Partial<{ firstName: string; lastName: string; dateOfBirth?: string; gender?: string }>) => void;
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom
            <div className="text-red-600">&nbsp;*</div>
          </Label>
          <Inputs
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            placeholder="Jean"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom
            <div className="text-red-600">&nbsp;*</div>
          </Label>
          <Inputs
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            placeholder="Dupont"
            required
          />
        </div>
      </div>

      <div className="flex space-y-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-2 justify-center">
          <Label htmlFor="dateOfBirth">Date de naissance
            <div className="text-red-600">&nbsp;*</div>
          </Label>

          <DatePicker
            id="dateOfBirth"
            placeholder="selectionner votre date de naissance"
            value={formData.dateOfBirth}
            onChange={(date) => updateFormData({ dateOfBirth: date?.[0]?.toISOString().split('T')[0] || '' })}
            required
          />

        </div>

        <div className="space-y-3">
          <Label htmlFor="gender">Genre
            <div className="text-red-600">&nbsp;*</div>
          </Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
            <SelectTrigger id="gender" className="dark:border-gray-800 dark:bg-white/[0.03]">
              <SelectValue placeholder="Sélectionnez votre genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Homme">Homme</SelectItem>
              <SelectItem value="Femme">Femme</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

    </div>
  );
}