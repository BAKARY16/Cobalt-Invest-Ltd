import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-registre/DefaultInputs";
import InputGroup from "../../components/form/form-registre/InputGroup";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import SelectInputs from "../../components/form/form-registre/SelectInputs";
import PageMeta from "../../components/common/PageMeta";
import SelectInput from "../../components/form/form-registre/PaiementInput";
import Button from "../../components/ui/button/Button";
import { ChevronRights } from "../../icons";
import { Link } from "react-router";


export default function RegistreFrom() {
    
    const nextClick = () => {
        console.log("Formulaire soumis", );
    }
    return (
        <div>
            {<PageMeta
                title="Cobalt Invest Ltd - Admin Dashboard"
                description="Cette plateforme est le tableau de bord administratif pour la gestion des activités de l'entreprise"
            />}
            <PageBreadcrumb pageTitle="Formulaire d'inscription" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <DefaultInputs />
                    <SelectInputs />
                    <DropzoneComponent />
                </div>
                <div className="space-y-6">
                    <InputGroup />
                    <SelectInput />
                </div>
            </div>

            {/* Outline Button with Start Icon */}
            <div className="mt-6 flex items-center gap-5 justify-center
              transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103">
                <div className="flex items-center gap-5">
                    <Link to="/recap">
                        <Button
                            onClick={nextClick}
                            size="md"
                            variant="outline"
                            endIcon={<ChevronRights className="size-5 fill-gray-500" />}
                        >
                            Suivant
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
