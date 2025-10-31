import { Valider, AngleGauche } from "../../../icons";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import Button from "../../ui/button/Button";
import { useFormContext } from "../../../context/FormContext";
import { Modal } from "../../ui/modal";
import { useModal } from "../../../hooks/useModal";
import Alerts from "./alert";


export default function Recap() {

  const { formData } = useFormContext();

  {/*const handleSubmit = () => {
    console.log("Données envoyées :", formData);
    // Envoyer les données à l'API
  };*/}

  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Confirmer vos informations" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            <h1 className="text-2xl font-bold mb-6">Récapitulatif des informations</h1>
          </h3>
        </div>
        <div className="dark:text-white/90">
          <div className="space-y-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="p-6 border space-y-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
              <p>Nom : {formData.personalInfo.nom}</p>
              <p>Prénom : {formData.personalInfo.prenom}</p>
              <p>Sexe : {formData.personalInfo.sexe}</p>
              <p>Date de naissance : {formData.personalInfo.dateNaissance}</p>
            </div>
            <div className="p-6 space-y-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              <p>Ville : {formData.contactInfo.ville}</p>
              <p>Adresse : {formData.contactInfo.adresse}</p>
              <p>Email : {formData.contactInfo.email}</p>
              <p>Téléphone : {formData.contactInfo.telephone}</p>
              <p>Telegram : {formData.contactInfo.telegram}</p>
            </div>
            <div className="p-6 space-y-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Informations sur la formation</h2>
              <p>Type de formation : {formData.formationInfo.typeFormation}</p>
              <p>Pack de formation : {formData.formationInfo.packFormation}</p>
              <p>Vagues : {formData.formationInfo.vagues.join(", ")}</p>
              <p>Mode de paiement : {formData.formationInfo.modePaiement}</p>
            </div>
            <div className="p-6 space-y-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Informations sur le paiement</h2>
              <p>Montant : {formData.paiementInfo.montant}</p>
              <p>Mode de paiement : {formData.paiementInfo.modePaiement}</p>
              <p>Échéances : {formData.paiementInfo.echeances}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Outline Button with Start Icon */}
      <div className="flex gap-5 items-center justify-between">
        <div className="mt-6 flex items-center gap-5 justify-start
        transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103">
          <div className="flex items-center gap-5">
            <Button
            onClick={() => window.history.back()}
              size="md"
              variant="outline"
              startIcon={<AngleGauche className="size-5 fill-gray-500" />}
            >
              Revenir
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-5 justify-end
        transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103">
          <div className="flex items-center gap-5">
            <Button
              onClick={openModal}
              size="md"
              variant="outline"
              endIcon={<Valider className="size-5 fill-gray-500" />}
            >
              Valider
            </Button>
          </div>
        </div>
        
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <Alerts />
          </div>
          <form className="flex flex-col">
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              {/*<Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>*/}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
