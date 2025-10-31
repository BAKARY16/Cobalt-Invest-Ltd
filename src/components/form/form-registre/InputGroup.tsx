import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon, Location} from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import Select from "../Select";


export default function InputGroup() {
  const options = [
    { value: "Abidjan", label: "Abidjan" },
    { value: "Yamoussoukro", label: "Yamoussoukro" },
    { value: "Korhogo", label: "Korhogo" },
  ];
  const handleSelectChange = (value: string) => {
      console.log("Selected value:", value);
    };
    
  const countries = [
    { code: "CI", label: "+225" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Informations de contact">
      <div className="space-y-6">
        <div>
          <Label className="flex">Ville de résidence
            <div className="text-red-600">&nbsp; *</div>
            </Label>
          <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>Adresse</Label>
          <div className="relative">
            <Input
              placeholder="Cocody 7è tranche, rue 123"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <Location className="size-6 fill-gray-500" />
            </span>
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label>Téléphone 1</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder={countries.length ? `${countries[0].label} 07 07 07 07 07` : ""}
            onChange={handlePhoneNumberChange}
          />
        </div>{" "}
        <div>
          <Label>Numéro Télégram</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="07 07 07 07 07"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
