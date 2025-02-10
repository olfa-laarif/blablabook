import { BookOpen, TrendingUp, Users } from "lucide-react";



export default function Features(){
    return(
        <>
        {/* Features Section */}
            <section className="py-12 bg-white px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Pourquoi choisir Blablabook?
                    </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                    <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Suivre vos lectures</h3>
                    <p className="text-gray-600">
                        Gardez une trace des livres que vous souhaitez lire dans votre bibliothèque personnelle.
                    </p>
                </div>
                <div className="text-center p-6">
                    <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Découvrir de nouveaux livres</h3>
                    <p className="text-gray-600">
                        Recevez des recommandations personnalisées de lecture.
                    </p>
                </div>
                <div className="text-center p-6">
                    <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Agrandir la communauté</h3>
                    <p className="text-gray-600">
                        Connectez-vous avec d'autres lecteurs, partagez des évaluations, et rejoindre les groupes de lecture.
                    </p>
                </div>
            </div>
            </div>
            </section>

        </>
    );
}

 