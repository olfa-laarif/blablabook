import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBook from './components/FeaturedBook';
import Features from './components/Features';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';




function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchBar />
      <FeaturedBook />
      

      <Features />



      <Footer />
      
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;