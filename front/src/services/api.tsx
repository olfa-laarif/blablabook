// Méthodes front pour la dynamisation de HomePage et BookDetails
// Obtention de tous les livres (Méthode getAllBooks qui pointera sur une route get '/books')
// Obtention d'un livre par son ID (Méthode getBookById qui pointera sur la route get'/books/${id})
// Fetch à faire directement dans HomePage et BookDetails avec useEffect
//import type { NewUserData } from "../types";

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

// Vérifier les identifiants auprès du serveur
export const checkCredentials = async (emailFromInput: string, passwordFromInput: string) => {
    try {
      // Envoi d'une requête POST à l'endpoint de login de l'API
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        // L'option credentials: "include" permet d'inclure les cookies dans la requête,
        // utile pour l'authentification via token stocké dans un cookie
        credentials: "include",
        method: 'POST', // Méthode HTTP POST pour envoyer des données
        headers: {
          'Content-Type': 'application/json', // Indique que le corps de la requête est au format JSON
        },
        // Le corps de la requête contient les identifiants sous forme de JSON
        body: JSON.stringify({
        email: emailFromInput,
        password: passwordFromInput,
        }),
    });

      // Vérification du statut de la réponse.
      // Si la réponse n'est pas "ok" (statut HTTP 200-299), on lève une erreur.
        if (!res.ok) {
        throw new Error("Erreur lors de l’authentification");
        }

      // Si la réponse est correcte, on convertit le corps de la réponse en JSON
        return await res.json();
    } catch (error) {
      // Si une erreur est attrapée (par exemple, en cas d'identifiants invalides,
      // le serveur renvoie une erreur 401, ou en cas de problème réseau),
      // on affiche l'erreur dans la console
    console.log('catch/error', error);
      // Et on retourne null pour indiquer l'échec de l'authentification
    return null;
    }
};



export const getConnectedUser = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/connected-user`,{credentials: "include"});
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


export const  registerUser= async (lastnameFromInput: string,firstnameFromInput: string,usernameFromInput: string,emailFromInput: string,passwordFromInput: string)=>{
try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, 
    // données et configuration
    {credentials: "include",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: usernameFromInput,
        password: passwordFromInput,
        email: emailFromInput,
        firstname: firstnameFromInput,
        lastname: lastnameFromInput,
        }),
    });

    if (!response.ok) {
        throw new Error ("Erreur de creation de l'utilisateur ");    
    } 

    // Récupération de la réponse du serveur
    const data = await response.json();
    return data;
} catch (error) {
    console.log("Erreur lors de l'appel à registerUser:", error);
    return null;
}
};

export const logoutUser = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{credentials: "include"});
        if (!res.ok) {
        throw new Error ("Erreur de déconnexion ");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const isUsernameAlreadyExist = async (username:string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/username/exist/${username}`);
        if (!res.ok) {
        throw new Error ("Erreur serveur");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const isEmailAlreadyExist = async (email:string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/email/exist/${email}`);
        if (!res.ok) {
        throw new Error ("Erreur serveur");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${id}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération du utilisateur");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const addBookToLibrary = async (user_id: string,book_id:string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${user_id}/books/${book_id}`,{
            method: "PUT"
    });
        if (!res.ok) throw new Error("Erreur lors de l'ajout du livre");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const removeBookFromLibrary = async (user_id: string,book_id:string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${user_id}/books/${book_id}`,{
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Erreur lors de la suppression du livre");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};




