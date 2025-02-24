import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getBookById } from "../services/api";
import { Book } from "../types";
import LinksUser from "../components/LinksUser";
import { useAuth } from "../context/AuthContext";
import BookDetails from "../components/BookDetails";

export const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    // Extraction de l'ID avant le premier tiret
    const bookId = id ? id.split("-")[0] : null;
    const [book, setBook] = useState<Book | null >(null) //on stock un seul livre
    const { user } = useAuth(); 

    useEffect(() => {
        if(!bookId)return; // si on ne trouve pas l'id, on annule l' appel
        const fetchBookDetails = async () => {
            try {
                const data = await getBookById(bookId);
                setBook(data);
            } catch (error) {
                console.error("Impossible de charger les détails du livre", error);
            }
        };
        fetchBookDetails();
    }, [bookId]);

    if(!book){
        return <div>chargement ...</div>
    }
    return (
        <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        {user && < LinksUser/>}
        <BookDetails  book={book}/>
        </main>
        <Footer />
        </div>
    );
    };

    export default BookDetailsPage;