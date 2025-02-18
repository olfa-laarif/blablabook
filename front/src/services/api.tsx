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



export const  registerUser= async (lastnameFromInput: string,firstnameFromInput: string,usernameFromInput: string,emailFromInput: string,passwordFromInput: string)=>{
try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, 
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
}






