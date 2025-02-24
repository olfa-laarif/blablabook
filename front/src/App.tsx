import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import  { BookDetailsPage } from "./pages/BookDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import AllBooksPage from "./pages/AllBooksPage";
import LegalPage from "./pages/LegalPage";
import UserProfilPage from "./pages/UserProfilPage";
import LibraryPage from "./pages/LibraryPage";


export default function App() {
  const { user } = useAuth(); // On récupère l'utilisateur connecté

  return (
    <Router>
      <Header />
      <Routes>
        {/* Redirection si l'utilisateur est connecté */}
        <Route path="/" element={user ? <Navigate to="/all-books" replace /> : <HomePage />} />

        {/* Pages publiques */}
        <Route path="/login" element={user ? <Navigate to="/all-books" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/all-books" replace /> : <SignUpPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />

        {/* Routes protégées */}
        <Route path="/all-books" element={<PrivateRoute><AllBooksPage /></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute><UserProfilPage /></PrivateRoute>} />
        <Route path="/library" element={<PrivateRoute><LibraryPage /></PrivateRoute>}/> 
        
        {/* Page 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}