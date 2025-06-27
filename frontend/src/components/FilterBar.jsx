import { useState } from "react";
import { Download } from "lucide-react";


const FilterBar = ()=>{
  const categories = ["All", "Work", "Personal", "Urgent", "Completed"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sortOptions = ["Date", "Priority", "Alphabetical"];
  const [selectedSort, setSelectedSort] = useState("Date");

  

  return (
    <>
      <div className="w-full h-content backdrop-blur-sm border-b py-4 border-gray-200 bg-white/80 mx-auto">
        <div className="flex items-center px-6 py-0.5 gap-20 space-x-[20rem] max-w-screen ml-[6rem]">
          <div className="flex items-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div>
              <label className="text-gray-700 mr-4 ">Sort by:</label>
              <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="">
                    {option} 
                  </option>
                ))}
              </select>
            </div>
            <button className="flex items-center space-x-4 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg">
              <Download className="w-4 h-4"/>
              Export
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default FilterBar;