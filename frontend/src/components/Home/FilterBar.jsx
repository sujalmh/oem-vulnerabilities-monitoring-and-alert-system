import React from "react";

const FilterBar = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-4 items-center">
      <select className="border rounded-lg p-2 w-full md:w-auto">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>Last 6 Months</option>
      </select>
      <select className="border rounded-lg p-2 w-full md:w-auto">
        <option>All Severities</option>
        <option>Critical</option>
        <option>High</option>
        <option>Medium</option>
      </select>
      <select className="border rounded-lg p-2 w-full md:w-auto">
        <option>All Equipment</option>
        <option>IT Systems</option>
        <option>OT Systems</option>
      </select>
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
