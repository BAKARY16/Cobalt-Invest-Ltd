import React, { createContext, useContext, useState } from "react";

interface PersonalInfo {
  nom: string;
  prenom: string;
  sexe: string;
  dateNaissance: string;
}

interface ContactInfo {
  ville: string;
  adresse: string;
  email: string;
  telephone: string;
  telegram: string;
}

interface FormationInfo {
  typeFormation: string;
  packFormation: string;
  vagues: string[];
  modePaiement: string;
}

interface PaiementInfo {
  montant: string;
  modePaiement: string;
  echeances: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  formationInfo: FormationInfo;
  paiementInfo: PaiementInfo;
}

const defaultFormData: FormData = {
  personalInfo: { nom: "", prenom: "", sexe: "", dateNaissance: "" },
  contactInfo: { ville: "", adresse: "", email: "", telephone: "", telegram: "" },
  formationInfo: { typeFormation: "", packFormation: "", vagues: [], modePaiement: "" },
  paiementInfo: { montant: "", modePaiement: "", echeances: "" },
};

const FormContext = createContext<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}>({
  formData: defaultFormData,
  setFormData: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);