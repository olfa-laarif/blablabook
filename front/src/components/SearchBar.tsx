import { Search } from "lucide-react";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchOption: string;
    setSearchOption: (option: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, searchOption, setSearchOption }: SearchBarProps) {
    return (
        <div className="relative max-w-6xl mx-auto flex gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Recherche de livres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="title">Titre</option>
                <option value="author">Auteur</option>
                <option value="published_date">Date</option>
            </select>
        </div>
    );
}