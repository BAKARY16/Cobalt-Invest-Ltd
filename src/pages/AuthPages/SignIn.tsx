import { Dispatch, SetStateAction } from "react";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

interface SignInProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export default function SignIn({ setIsAuthenticated }: SignInProps) {
  return (
    <>
      {<PageMeta
        title="Cobalt Invest Ltd - Admin Dashboard"
        description="Cette plateforme est le tableau de bord administratif pour la gestion des activités de l'entreprise"
      />}
      <AuthLayout>
        <SignInForm setIsAuthenticated={setIsAuthenticated} />
      </AuthLayout>
    </>
  );
}
