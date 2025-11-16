"use client";

//import { formatDate } from "@fullcalendar/core/index.js";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { User, MapPinned, CreditCard, GraduationCap /*, Mail, Heart, MessageSquare*/ } from "lucide-react"

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  email: string;
  phone: string;
  country?: string;
  formationType?: string;
  formationPack?: string;
  paymentMode?: string;
  amountToPay?: string;
  numberCount?: string;
  Modepayment?: string;
  startDate?: string;
  endDate?: string;
  installmentCount?: string;
  selectedVagues?: string[];
  preferences: string[];
}

export default function Review({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-8">
      <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            Informations Personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom complet</p>
              <p className="font-mediu">
                {formData.firstName || "Non renseigné"} {formData.lastName || "Non renseigné"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de naissance</p>
              <p className="font-medium">{formData.dateOfBirth || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-medium">{formData.gender || "Non renseigné"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section : Coordonnées */}
      <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPinned className="h-5 w-5" />
            Coordonnées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="">
              {/*<Mail className="h-4 w-4 text-muted-foreground" />*/}
              <p className="text-sm text-muted-foreground">Email</p>
              <span>{formData.email || "Non renseigné"}</span>
            </div>
            <div>
              {/* <Phone className="h-4 w-4 text-muted-foreground" />*/}
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <span>{formData.phone || "Non renseigné"}</span>
            </div>

            <div >
              {/*<MapPinned className="h-4 w-4 text-muted-foreground mt-1" />*/}
              <p className="text-sm text-muted-foreground">Pays</p>
              <span>{formData.country || "Non renseigné"} </span>
            </div>

            <div className="">
              {/*<MapPin className="h-4 w-4 text-muted-foreground mt-1" />*/}
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p>{formData.address} {formData.postalCode} {formData.city || "Non renseigné"}</p>
                <p>
                  {/*{formData.postalCode} {formData.city}*/}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Section : formation */}
      <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5" />
            Informations sur la formation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Pack de formation</p>
              <p className="font-medium">{formData.formationPack || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type de formation</p>
              <p className="font-medium">{formData.formationType || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vagues de formation</p>
              <p className="font-medium">{formData.selectedVagues || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de début</p>
              <p className="font-medium">{formData.startDate || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de fin</p>
              <p className="font-medium">{formData.endDate || "Non renseigné"}</p>
            </div>
            <div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/**Section : Paiement */}
      <Card className="dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5" />
            Informations sur le paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Montant à payer</p>
              <p className="font-medium">{formData.amountToPay ? `${formData.amountToPay} XOF` : "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nombre d'échéance</p>
              <p className="font-medium">{formData.numberCount || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mode de paiement</p>
              <p className="font-medium">{formData.paymentMode || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mode de paiement</p>
              <p className="font-medium">{formData.Modepayment || "Non renseigné"}</p>
            </div>
            <div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/*<h2 className="text-lg font-bold mb-4">Révision des informations</h2>
<p><strong>Ville :</strong> {formData.city}</p>
<p><strong>Préférences :</strong> {formData.preferences.join(", ") || "Aucune"}</p>*/
