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
export const getRandomBooks = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/books/random`);
        if (!res.ok) {
        throw new Error ("Erreur lors de la récupération des livres");
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};


// vérifier les identifiants auprès du serveur
export const checkCredentials = async (emailFromInput: string,passwordFromInput: string) => {
    try {
    const res = await fetch(`${API_BASE_URL}/api/users/login`,
        // données et configuration
        {credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: emailFromInput,
        password: passwordFromInput,
        }),
        },
    );
    if (!res.ok){ throw new Error("Erreur lors de l’authentification");}
    return  await res.json();
    } catch (error) {
    //les identifiants n'étaient pas bons, 401 (Unauthorized)
    console.log('catch/error', error);
    return null;
    }
}; 


export const getConnectedUser = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/connected-user`,{credentials: "include"});
        if (!res.ok) {
        throw new Error ("Erreur utilisateur non authentifié.");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const registerUser = async (
    firstname: string,
    lastname: string,
    pseudo: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, pseudo, email, password }),
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // 🔴 Lire la réponse d'erreur du serveur
        console.error("Erreur API:", errorData);
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }
  
      return await res.json();
    } catch (error) {
      console.error("Erreur client:", error);
      return null;
    }
  };