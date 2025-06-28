import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import AddNote from "../components/AddNote";
import Notepad from "../components/Notepad";
import { PenTool, Plus } from "lucide-react"; // Importing icons from lucide-react

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [showFavourites, setShowFavourites] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/details")
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
            });
    }, []);

    // Favourites filter function
    const handleFavouritesClick = () => {
        setShowFavourites((prev) => !prev);
    };

    // Pass filtered notes to Notepad if needed, or just the flag
    return (
        <>
            <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-gray-50 to-gray-100  overflow-hidden">
                <Navbar onFavouritesClick={handleFavouritesClick} />
                <main className="mx-auto mt-[80px] px-4 ">
                    {notes.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="relative mb-8">
                                <PenTool className={`w-24 h-24 text-gray-300 mx-auto animate-bounce`} />
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-ping"></div>
                            </div>
                            <h2 className={`text-3xl font-bold text-gray-600 mb-2`}>No notes yet</h2>
                            <p className={`text-gray-500 mb-8 text-lg`}>Create your first note to get started on your journey!</p>
                            <button
                                //   onClick={handleCreateNew}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse"
                            >
                                <Plus className="w-6 h-6 mr-2" />
                                Create First Note
                            </button>
                        </div>
                    ) : (
                        <Notepad showFavourites={showFavourites} />
                    )}
                </main>
                <AddNote />
            </div>
        </>
    );
    }

    export default Home;
