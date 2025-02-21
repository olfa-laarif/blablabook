import { ArrowLeft, Star, User } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBookById } from "../services/api";
import { Book } from "../types";

export const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null >(null) //on stock un seul livre

    useEffect(() => {
        if(!id)return; // si on ne trouve pas l'id, on annule l' appel
        const fetchBookDetails = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
                console.error("Impossible de charger les détails du livre", error);
            }
        };

        fetchBookDetails();

    }, [id]);

    if(!book){
        return <div>chargement ...</div>
    }
    return (
        <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
            <div className="flex items-center gap-4 mb-8">
            <Link 
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Accueil</span>
            </Link>
            
            <Link 
                to="/profil"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors ml-auto"
            >
                <User className="w-5 h-5" />
                <span>Profil</span>
            </Link>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col gap-4">
                <div className="aspect-[3/4] h-120 rounded-lg overflow-hidden shadow-md">
                <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="space-y-3">
                <div>
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
                <div>
                    <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    À propos de l'auteur
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                    {book.Author.biography}
                    </p>
                </div>
                </div>
            </div>
            
            <div className="flex flex-col">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4 max-h-48 overflow-hidden">
                <h2 className="font-display text-lg font-semibold text-gray-900 mb-3">
                    Résumé
                </h2>
                <p className="text-gray-600 leading-relaxed">
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
                    {[...Array(5)].map((_, i) => (
                    <Star key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? "text-gold-400 fill-gold-400" : "text-gray-300"}`}
                    />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">
                    {averageRating.toFixed(0)}/5 ({ratings.length} avis)
                    </span>
                    </>
                    );
                    })()}        
                </div>   
                <div className="flex items-center gap-4">
                    <Link 
                    to="/review"
                    className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                    Évaluer ce livre
                    </Link>
                    <Link 
                    to="/reviews"
                    className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
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
        </main>
    
        <Footer />
        </div>
    );
    };
    
    export default BookDetails;