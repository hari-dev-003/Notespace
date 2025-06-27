import { Plus } from "lucide-react";
import NoteModal from "./NoteModal";
import { useState } from "react";


const AddNote = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle the creation of a new note
   const handleAddNote = ()=>{
        setIsModalOpen(true);
        console.log("Add Note button clicked");
        
    }
   

  return (
    <>
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />

    <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
      <button
        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center group relative overflow-hidden"
        onClick={handleAddNote}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
      </button>
    </div>
    </>
  );
}

export default AddNote;
