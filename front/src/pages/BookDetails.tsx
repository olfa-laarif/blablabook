import { ArrowLeft, Link, Star, User } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BookDetails = () => {
  // Mock data - to be replaced with real data
const book = {
    title: "L'Étranger",
    author: "Albert Camus",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "L'histoire se déroule à Alger. Le protagoniste, Meursault, employé de bureau, reçoit un télégramme annonçant que sa mère, qu'il a placée à l'hospice de Marengo, vient de mourir. Il se rend à l'enterrement et ne manifeste aucune tristesse apparente...",
    rating: 4.5,
    publishedDate: "1942",
    reviews: 128
};

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
            to="/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors ml-auto"
        >
            <User className="w-5 h-5" />
            <span>Profil</span>
        </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
        <div className="relative">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md">
            <img 
                src={book.coverUrl} 
                alt={book.title}
                className="w-full h-full object-cover"
            />
            </div>
            <h1 className="absolute bottom-4 left-4 right-4 font-display text-2xl font-semibold text-white drop-shadow-lg">
            {book.title}
            </h1>
        </div>
        
        <div className="flex flex-col">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                Résumé
            </h2>
            <p className="text-gray-600 leading-relaxed">
                {book.summary}
            </p>
            </div>
            
            <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                        ? "text-gold-400 fill-gold-400"
                        : "text-gray-300"
                    }`}
                />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">
                {book.rating}/5
                </span>
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
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{book.reviews} avis</span>
            <span>·</span>
            <span>Publié en {book.publishedDate}</span>
            </div>
        </div>
        </div>
    </main>
    
    <Footer />
   
   
    </div>
);
};

export default BookDetails;