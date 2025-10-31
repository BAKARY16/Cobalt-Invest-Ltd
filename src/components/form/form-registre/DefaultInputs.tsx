import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "../date-picker.tsx";
import Radio from "../input/Radio";

export default function DefaultInputs() {
  //etat local pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    personalInfo: {
      nom: "",
      prenom: "",
      sexe: "",
      dateNaissance: "",
    },
  });

  //etat pour le bouton radio
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  //Fonction pour gérer les changements dans les champs de saisie
  // Fonction pour gérer les changements dans les champs
  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData); // Mettre à jour l'état local
    console.log("Données du formulaire mises à jour :", updatedData);
  };


  return (
    <ComponentCard title="Informations personnelles">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input" className="flex">
            Nom
            <div className="text-red-600">&nbsp; *</div></Label>
          <Input type="text" 
          value={formData.personalInfo.nom}
          onChange={(e) => handleInputChange("nom", e.target.value)}
          placeholder="Votre nom de famille"
          id="name" 
          />
        </div>
        <div>
          <Label htmlFor="input" className="flex">
            Prénom
            <div className="text-red-600">&nbsp; *</div></Label>
          <Input type="text" placeholder="Votre prénom" id="firstname" 
          />
        </div>

        <div className="space-y-6">
          <Label className="flex"> Sexe
            <div className="text-red-600">&nbsp; *</div></Label>

          <div className="flex flex-wrap items-center gap-10">
            <Radio
              id="male"
              name="Homme"
              value="Homme"
              checked={selectedValue === "option1"}
              onChange={handleRadioChange}
              label="Homme"
            />
            <Radio
              id="female"
              name="Femme"
              value="Femme"
              checked={selectedValue === "option2"}
              onChange={handleRadioChange}
              label="Femme"
            />
          </div>
        </div>
        <div>
          <DatePicker
            id="dateBirth"
            label="Date de naissance"
            placeholder="selectionner votre date de naissance"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
