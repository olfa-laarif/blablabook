import { createContext, useContext, useEffect, useState } from "react";
import { getConnectedUser } from "../services/api";

// Définition du type User
interface User {
  id: string;
  username: string;
  email: string;
}

// Définition du type du contexte
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider qui englobe l'application et gère l'état global de l'authentification
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Vérifier si un utilisateur est déjà connecté au chargement de l'application
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getConnectedUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  // Fonction pour connecter l'utilisateur
  const login = (userData: User) => {
    setUser(userData);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour consommer l'AuthContext facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};