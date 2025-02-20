
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LegalInformation() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mentions Légales</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Éditeur du site</h2>
          <p className="text-gray-600 leading-relaxed">
            Nom de l'entreprise : Blablabook<br />
            Adresse : 123 Rue Exemple, 75000 Paris, France<br />
            Téléphone : +33 1 23 45 67 89<br />
            Email : contact@blablabook.com<br />
            Responsable de publication : Prénom Nom
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Hébergeur</h2>
          <p className="text-gray-600 leading-relaxed">
            Nom de l'hébergeur : Exemple Hébergement<br />
            Adresse : 456 Avenue Hébergeur, 75000 Paris, France<br />
            Téléphone : +33 1 98 76 54 32<br />
            Site Web : <a href="https://www.exemple-hebergement.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.exemple-hebergement.com</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Propriété intellectuelle</h2>
          <p className="text-gray-600 leading-relaxed">
            L'ensemble du contenu de ce site (textes, images, logos, etc.) est la propriété exclusive de Blablabook ou de ses partenaires. Toute reproduction ou représentation, même partielle, est strictement interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Données personnelles</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour toute information relative à vos données personnelles, veuillez consulter notre politique de confidentialité.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour toute question concernant les mentions légales, vous pouvez nous contacter à l'adresse email suivante : contact@blablabook.com.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
