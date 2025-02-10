import { Search } from "lucide-react";

export default function SearchBar(){
    return(
        <>
            {/* <div className="relative "> */}
            <div className="relative max-w-6xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                type="text"
                placeholder="Recherche de livres..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </>
    );

}