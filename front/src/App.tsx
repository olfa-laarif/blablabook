
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookDetails from "./pages/BookDetails";
//import PrivateRoute from "./routes/PrivateRoute";
import AllBooksPage from "./pages/AllBooksPage";

export default function App() {
  const { user } = useAuth(); // On récupère l'utilisateur connecté

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Empêcher un utilisateur connecté d'accéder à /login ou /signup */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/all-books" element={<AllBooksPage />} />
        <Route path="/books/:id" element={<BookDetails />}
    
        />
        {/* Route protégée */}
        <Route
          // path="/books/:id"
          // element={
          //   // <PrivateRoute>
              
          //   // </PrivateRoute>
          // }
        />
      </Routes>
    </Router>
  );
}