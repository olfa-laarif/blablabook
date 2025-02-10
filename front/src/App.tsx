
import { BrowserRouter, Route, Routes } from 'react-router';
import BookDetails from './pages/BookDetails';
import HomePage from './pages/HomePage';





function App() {

  return (
      <BrowserRouter>
      <Routes>
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/" element={<HomePage />} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;