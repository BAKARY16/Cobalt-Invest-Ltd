import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import Input from "../input/InputField";
import Radio from "../input/Radio";

export default function SelectInput() {

  // Payment Radio Button State
  const [selectedPaymentValue, setSelectedPaymentValue] = useState<string>("option1");

  const handlePaymentRadioChange = (value: string) => {
    setSelectedPaymentValue(value);
  };

  // Select Input Options
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Informations sur le Paiement">
      <div>
          <Label>Montant à payer</Label>
          <div className="relative">
            <Input
              placeholder="Entrer le montant en CFA"
              type="amount"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
               <div className="text-gray-500 text">XOF</div>
            </span>
          </div>
        </div>

      <div className="space-y-6">
        <Label htmlFor="input" className="mb-4">Mode de paiement</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="MobileMoney"
            name="MobileMoney"
            value="option1"
            checked={selectedPaymentValue === "option1"}
            onChange={handlePaymentRadioChange}
            label="Mobile Money"
          />
          <Radio
            id="cash"
            name="cash"
            value="option2"
            checked={selectedPaymentValue === "option2"}
            onChange={handlePaymentRadioChange}
            label="En espèces"
          />
          <Radio
            id="bankTransfer"
            name="bankTransfer"
            value="option3"
            checked={selectedPaymentValue === "option3"}
            onChange={handlePaymentRadioChange}
            label="Virement bancaire"
          />
        </div>
      </div>
        
      <div className="space-y-6">
        <div>
          <Label>Nombre d'échéance ( si paiement échelonné )</Label>
          <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
