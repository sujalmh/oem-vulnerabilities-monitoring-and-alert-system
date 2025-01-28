import React from "react";

const Heatmap = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Heatmap</h3>
      <div className="grid grid-cols-4 gap-2">
        {["IT Systems", "OT Systems", "Database", "Network"].map((category, index) => (
          <div
            key={index}
            className="bg-blue-100 hover:bg-blue-200 text-center py-4 rounded-lg text-gray-800"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
