import { Book } from "../types";
import { Link } from "react-router";
import {  Star } from "lucide-react";

interface BookDetailsProps {
  book: Book;
}

export default function BookDetails({ book }: BookDetailsProps) {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
<div className="flex flex-col gap-4">
    <img 
        src={book.image} 
        alt={book.title}
        className="w-full aspect-[3/4] object-contain"/>
</div>
<div className="flex flex-col">
<div className="space-y-3">
    <h1 className="font-display text-2xl font-semibold text-gray-900">
    {book.title}
    </h1>
    <p className="text-sm text-gray-600 leading-relaxed">Publié le {new Date(book.published_date).toLocaleDateString('fr-FR')}</p>
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">
    {book.Author.firstname} {book.Author.lastname}
    </h2>
    <p className="text-sm text-gray-600 leading-relaxed">
    {book.Categories?.map(category => category.name).join(', ') || "Pas de catégorie"}
    </p>
</div>
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4 ">
    <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">
        Résumé
    </h2>
    <p className="text-gray-600 text-lg leading-relaxed">
        {book.summary}
    </p>
    </div>
    <div className="flex items-center gap-6 mb-4">
    <div className="flex items-center gap-1">
        {(() => {
            const ratings = book.Marks?.map(mark => mark.rating) || [];
            const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length  : 0;
        return (
            <>
            {[...Array(5)].map((_, i) => {
            // Calcul du pourcentage de remplissage pour chaque étoile
            // Si la note est 4.3 :
            // - Les 4 premières étoiles auront 100% (remplies complètement)
            // - La 5ème étoile aura 30% (remplissage partiel)
            const fillPercentage = Math.min(Math.max(averageRating - i, 0), 1) * 100;
            return (
            <span key={i} className="relative w-5 h-5 inline-block">
            {/* Étoile vide en arrière-plan (grise) */}
            <Star className="w-5 h-5 text-gray-300 fill-gray-300 absolute" />
            {/* Étoile violette partiellement remplie au-dessus */}
            <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${fillPercentage}%` }} // Ajuste la largeur selon le pourcentage
            >
            <Star className="w-5 h-5 text-purple-500 fill-purple-500" />
            </div>
            </span>
            );
        })}
        {/* Affichage de la note moyenne et du nombre d'avis */}
        <span className="ml-2 text-sm font-medium text-gray-600">
            {averageRating.toFixed(1)}/5 ({ratings.length} avis)
        </span>
        </>
        );
        })()}        
    </div>   
    <div className="flex items-center gap-4">
    <Link 
    to="/review"
    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
    >
    Évaluer ce livre
    </Link>
    <Link 
    to="/reviews"
    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
    >
    Avis
    </Link>
    </div>
    </div>
    <div className="text-sm text-gray-600">
    {/* Nombre total d'avis */}
    <div className="flex items-center gap-4">
    <span>{book.Marks?.length || 0} avis</span>
    </div>
    {/* Liste des avis */}
    {book.Marks?.length > 0 ? (
    book.Marks.map((mark, index) => (
    <div key={index} className="flex items-center gap-4 mt-2">
    <span>{mark.review || "Pas de commentaire."}</span>
    <span>Publié le {new Date(mark.createdAt).toLocaleDateString('fr-FR')}</span>
    </div>
    ))
    ) : (
    <div className="mt-2">
    <span>Aucun avis pour le moment.</span>
    </div>
    )}
    </div>
</div>
</div>
)
}