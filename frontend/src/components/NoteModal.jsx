import { useState } from "react";
import axios from "axios";
import { Pencil, X } from "lucide-react";
import { useAuth } from "react-oidc-context";

const NoteModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const auth = useAuth();
    // Function to handle saving the note
    const handleSave = () => {
        const token = auth.user?.access_token; // Assuming token is stored in localStorage
        if (!token) {
            console.error("No authentication token found. Please log in.");
            // Optionally, show an error message to the user or redirect to login
            return;
        }

        axios.post('http://localhost:3000/api/details', {
            title,
            content,
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Add Authorization header
            }
        })
        .then(response => {
            console.log("Note saved:", response.data);
            onClose(); // Close modal after saving
        })
        .catch(error => {
            console.error("Error saving note:", error);
            // Handle specific error messages, e.g., if token is expired/invalid
            if (error.response && error.response.status === 401) {
                console.error("Authentication failed. Please log in again.");
                
            }
        });
    }

    return (
        <>
            <div className={`container max-w-5xl h-max ${isOpen ? "block" : "hidden"} relative`}>
                <div className={`fixed inset-0 bg-gray-200/75 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose}></div>
                <div className={`fixed inset-0 flex items-center justify-center transition-transform ${isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"}`}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"> {/* Increased max-w-md to max-w-2xl and shadow to shadow-xl */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold flex items-center">
                                <Pencil className="mr-2 text-purple-600" size={20} /> Create New Note
                            </h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title..."
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* Tags section - placeholder for now */}
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Tags</p>
                            <input
                                type="text"
                                placeholder="Add tag..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing your note..."
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center">
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteModal;
