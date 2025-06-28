import { useState } from "react";
import { Download } from "lucide-react";



const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  onExport
}) => {
  const categories = ["All", "Work", "Personal", "Urgent", "Completed"];
  const sortOptions = ["Date", "Priority", "Alphabetical"];

  return (
    <>
      <div className="w-full h-content backdrop-blur-sm border-b py-4 border-gray-200 bg-white/80 ">
        <div className="flex flex-col md:flex-row justify-around md:items-center px-2 md:px-8 py-0.5 gap-4 md:gap-[12rem] w-full max-w-screen-xl">
          <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
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
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 w-full md:w-auto">
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
            <button onClick={onExport} className="flex items-center space-x-2 md:space-x-4 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg w-full md:w-auto mt-2 md:mt-0">
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