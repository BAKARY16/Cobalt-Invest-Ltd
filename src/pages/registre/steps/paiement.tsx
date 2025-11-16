import { useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Input from "../ui/InputField";
import Radio from "../../../components/form/input/Radio";

interface PaiementProps {
    formData: {
        amountToPay: string;
        Modepayment: string;
        numberCount: string;
    };
    updateFormData: (data: Partial<PaiementProps["formData"]>) => void;
}

export default function Paiement({ formData, updateFormData }: PaiementProps) {

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
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="space-y-4">
                    <Label>Montant à payer</Label>
                    <div className="relative">
                        <Input
                            placeholder="Entrer le montant en CFA"
                            type="text"
                            className="pl-[62px]"
                            value={formData.amountToPay}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                const formattedValue = new Intl.NumberFormat("fr-FR").format(Number(value)); // Format with spaces
                                updateFormData({ amountToPay: formattedValue });
                            }}
                        />
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                            <div className="text-gray-500 text">XOF</div>
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Nombre d'échéance ( si paiement échelonné )</Label>
                    <div className="dark:bg-dark-900">
                        <Select
                            onValueChange={(value) => {
                                handleSelectChange(value);
                                updateFormData({ numberCount: value });
                            }}
                        >
                            <SelectTrigger className="dark:border-gray-800 dark:bg-white/[0.03] w-full">
                                <SelectValue placeholder="Select Option" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <Label htmlFor="input" className="mb-4">Mode de paiement</Label>
                <div className="flex flex-wrap items-center gap-8">
                    <Radio
                        id="MobileMoney"
                        name="paymentMode"
                        value="option1"
                        checked={selectedPaymentValue === "option1"}
                        onChange={(value) => {
                            handlePaymentRadioChange(value);
                            updateFormData({ Modepayment: "Mobile Money" });
                        }}
                        label="Par Mobile Money"
                    />
                    <Radio
                        id="cash"
                        name="paymentMode"
                        value="option2"
                        checked={selectedPaymentValue === "option2"}
                        onChange={(value) => {
                            handlePaymentRadioChange(value);
                            updateFormData({ Modepayment: "En espèces" });
                        }}
                        label="En espèces"
                    />
                    <Radio
                        id="bankTransfer"
                        name="paymentMode"
                        value="option3"
                        checked={selectedPaymentValue === "option3"}
                        onChange={(value) => {
                            handlePaymentRadioChange(value);
                            updateFormData({ Modepayment: "Virement bancaire" });
                        }}
                        label="Virement bancaire"
                    />
                </div>
                {/* Removed redundant code */}
            </div>
        </div>
    );
}
