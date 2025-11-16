"use client";

interface Step3Props {
  formData: {
    preferences: string[];
  };
  updateFormData: (data: { preferences: string[] }) => void;
}

export default function Step3({ formData, updateFormData }: Step3Props) {
  const preferences = ["Sport", "Musique", "Lecture", "Voyage"];
  const togglePreference = (preference: string) => {
    const newPreferences = formData.preferences.includes(preference)
      ? formData.preferences.filter((p) => p !== preference)
      : [...formData.preferences, preference];
    updateFormData({ preferences: newPreferences });
  };

  return (
    <div>
      <p className="mb-2">Sélectionnez vos préférences :</p>
      {preferences.map((preference) => (
        <label key={preference} className="block">
          <input
            type="checkbox"
            checked={formData.preferences.includes(preference)}
            onChange={() => togglePreference(preference)}
            className="mr-2"
          />
          {preference}
        </label>
      ))}
    </div>
  );
}