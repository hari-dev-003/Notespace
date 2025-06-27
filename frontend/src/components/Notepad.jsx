import { useState,useEffect } from "react";
import axios from "axios";

const Notepad = () => {
     const [data, setData] = useState(null);
    const [userId,setUserId] = useState(null);

    const noteColors = [
    'bg-gradient-to-br from-yellow-100 to-yellow-200',
    'bg-gradient-to-br from-blue-100 to-blue-200',
    'bg-gradient-to-br from-green-100 to-green-200',
    'bg-gradient-to-br from-purple-100 to-purple-200',
    'bg-gradient-to-br from-pink-100 to-pink-200',
    'bg-gradient-to-br from-indigo-100 to-indigo-200',
    'bg-gradient-to-br from-orange-100 to-orange-200',
    'bg-gradient-to-br from-rose-100 to-rose-200',
  ];


   const fetchdata = async ()=>{
    axios.get("http://localhost:3000/api/details")
    .then((res)=>{
        console.log(res.data);
        setData(res.data);
      
    })
    .catch((err)=>{
        console.error("Error fetching data:", err);
    })
   }

   useEffect(() => {
    fetchdata();
    }, [data]);
    return (
        <>
            <div className="container mx-auto px-30 py-10">
                    <h1 className="text-4xl font-bold mb-6">Your Notes ({data ? data.length : 0})</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data && data.map((note, idx) => (
                            <div key={note.boardId} className={`${noteColors[idx % noteColors.length]} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden backdrop-blur-sm`}>
                                <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                                <p className="text-gray-700">{note.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )

}

export default Notepad;
