
import { BrowserRouter, Route, Routes } from 'react-router';
import BookDetails from './pages/BookDetails';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
      <BrowserRouter>
      <Routes>
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;