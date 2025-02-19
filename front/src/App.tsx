import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookDetails from "./pages/BookDetails";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
 //import ConnectedUserHomePage from "./pages/ConnectedUserHomePage";
import AllBooksPage from "./pages/AllBooksPage";


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
        {/* La ligne ci-dessous n'a pas de sens, c'est juste pour tester ce qu'on reçoit  */}
        {/* <Route path="/signup" element={user ? <Navigate to="/all-books" /> : <ConnectedUserHomePage />} /> */}


        {/* <Route path="/all-books" element={<AllBooksPage />} /> */}
        <Route path="/books/:id" element={<BookDetails />}
        />
        {/* Route protégée */}
        <Route
          path="/all-books"
          element={
              <PrivateRoute>
              <AllBooksPage />
              </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}