// Méthodes front pour la dynamisation de HomePage et BookDetails

// Obtention de tous les livres (Méthode getAllBooks qui pointera sur une route get '/books')

// Obtention d'un livre par son ID (Méthode getBookById qui pointera sur la route get'/books/${id})

// Fetch à faire directement dans HomePage et BookDetails avec useEffect

const API_BASE_URL = "http://localhost:3001";

export const getAllBooks = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/books`);
        if (!res.ok) {
        throw new Error ("Erreur lors de la récupération des livres");
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getBookById = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/books/${id}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération du livre");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};