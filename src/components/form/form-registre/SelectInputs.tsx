import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import Radio from "../input/Radio";


export default function SelectInputs() {

  // Radio Button State
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  // Payment Radio Button State
  const [selectedPaymentValue, setSelectedPaymentValue] = useState<string>("option1");

  const handlePaymentRadioChange = (value: string) => {
    setSelectedPaymentValue(value);
  };

  // Select Input Options
  const options = [
    { value: "Pack Elite", label: "Pack Elite" },
    { value: "Pack Premium", label: "Pack Premium" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "1", text: "Vague 1", selected: false },
    { value: "2", text: "Vague 2", selected: false },
    { value: "3", text: "Vague 3", selected: false },
    { value: "4", text: "Vague 4", selected: false },
    { value: "5", text: "Vague 5", selected: false },
  ];
  return (
    <ComponentCard title="Informations sur la formation">
      <div className="space-y-6">
        <Label htmlFor="input" className="mb-4">Type de formation</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="EnLine"
            name="EnLine"
            value="option1"
            checked={selectedValue === "option1"}
            onChange={handleRadioChange}
            label="Formation en ligne"
          />
          <Radio
            id="Presentiel"
            name="Presentiel"
            value="option2"
            checked={selectedValue === "option2"}
            onChange={handleRadioChange}
            label="Formation en présentiel"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Pack de formation</Label>
          <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <MultiSelect
            label="Multiple Select Options"
            options={multiOptions}
            defaultSelected={["1"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div>

        <div className="space-y-6">
          <Label htmlFor="input" className="mb-4">Mode de paiement</Label>
          <div className="flex flex-wrap items-center gap-8">
            <Radio
              id="total"
              name="total"
              value="option1"
              checked={selectedPaymentValue === "option1"}
              onChange={handlePaymentRadioChange}
              label="Paiement total"
            />
            <Radio
              id="echelonne"
              name="echelonne"
              value="option2"
              checked={selectedPaymentValue === "option2"}
              onChange={handlePaymentRadioChange}
              label="Paiement échelonné"
            />
          </div>
        </div>

      </div>
    </ComponentCard>
  );
}
