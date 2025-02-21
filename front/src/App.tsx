import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookDetails from "./pages/BookDetails";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import AllBooksPage from "./pages/AllBooksPage";
import LegalPage from "./pages/LegalPage";
import LibraryPage from "./pages/LibraryPage";


export default function App() {
  const { user } = useAuth(); // On récupère l'utilisateur connecté

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />      

        <Route path="/login" element={user ? <Navigate to="/all-books" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/all-books" /> : <SignUpPage />} />
        <Route path="/legal" element={<LegalPage />} /> 
        <Route path="/books/:id" element={<BookDetails />}
        />
        {/* Route protégée */}
        <Route path="/all-books"
          element={
              <PrivateRoute>
              <AllBooksPage />
              </PrivateRoute>
          }
        />
            <Route 
          path="/library" 
          element={
            // Par exemple, si cette page est privée :
            <PrivateRoute>
              <LibraryPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}