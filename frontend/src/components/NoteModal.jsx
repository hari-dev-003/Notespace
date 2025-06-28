
import { Star, StarOff, Pencil, X } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteModal = ({ isOpen, onClose, note, mode = "add", onSave }) => {
    const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");
    const [favourite, setFavourite] = useState(note?.favourite || false);
    const auth = useAuth();

    useEffect(() => {
        setTitle(note?.title || "");
        setContent(note?.content || "");
        setFavourite(note?.favourite || false);
    }, [note, isOpen]);

    const handleSave = async () => {
        const token = auth.user?.access_token;
        if (!token) {
            console.error("No authentication token found. Please log in.");
            return;
        }
        const payload = { title, content, favourite };
        try {
            if (mode === "edit" && note?.boardId) {
                await axios.put(`http://localhost:3000/api/details/${note.boardId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:3000/api/details', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            if (onSave) onSave();
            onClose();
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black/30 backdrop-blur-sm transition-all`}>
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-lg sm:max-w-2xl relative animate-fadeIn mx-2">
                <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition-colors">
                    <X size={28} />
                </button>
                <div className="flex items-center mb-4 sm:mb-6 gap-2 sm:gap-3">
                    <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-blue-200 p-2 sm:p-3">
                        <Pencil className="text-purple-600" size={22} />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{mode === "edit" ? "Edit Note" : "Create New Note"}</h2>
                    <button
                        onClick={() => setFavourite(fav => !fav)}
                        className={`ml-auto text-yellow-400 hover:scale-110 transition-transform`}
                        title={favourite ? "Remove from Favourites" : "Add to Favourites"}
                    >
                        {favourite ? <Star size={24} fill="#facc15" /> : <StarOff size={24} />}
                    </button>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg mb-3 sm:mb-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Start writing your note..."
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg mb-4 sm:mb-6 h-32 sm:h-40 resize-y text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 sm:px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-semibold transition-all w-full sm:w-auto"
                    >Cancel</button>
                    <button
                        onClick={handleSave}
                        className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 font-semibold shadow-md transition-all flex items-center gap-2 w-full sm:w-auto"
                    >
                        {mode === "edit" ? "Update Note" : "Save Note"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
