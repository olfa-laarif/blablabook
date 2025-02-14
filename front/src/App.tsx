
import { BrowserRouter, Route, Routes } from 'react-router';
import BookDetails from './pages/BookDetails';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';





function App() {

  return (
      <BrowserRouter>
      <Routes>
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;