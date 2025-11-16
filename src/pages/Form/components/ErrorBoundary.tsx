import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Mettre à jour l'état pour afficher l'interface utilisateur de secours
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Vous pouvez enregistrer l'erreur dans un service de journalisation ici
    console.error("Erreur capturée par ErrorBoundary :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <h2 className="text-lg font-bold">Une erreur s'est produite</h2>
          <p>{this.state.error?.message || "Une erreur inattendue est survenue."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;