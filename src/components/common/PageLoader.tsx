export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-30 backdrop-blur-sm">
      {/* Cercle animé */}
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <div className="absolute h-10 w-10 rounded-full bg-blue-500"></div>
      </div>
      {/* Texte stylisé */}
      <span className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
        Chargement en cours...
      </span>
    </div>
  );
}