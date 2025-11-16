import  MultiStepForm  from "./form";
import "./globals.css"
import PageBreadcrumb from "../../components/common/PageBreadCrumb";


export default function Form() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Formulaire d'inscription" />
      <div className="">
          <MultiStepForm />
      </div>
    </div>
  );
}
