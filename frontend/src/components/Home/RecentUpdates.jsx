import React, { useEffect, useState } from "react";
import { Badge } from "@radix-ui/themes";
import axiosInstance from "../../axios";

const RecentUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const severityColors = {
    Critical: "red",
    High: "yellow",
    Low: "green",
  };

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        const response = await axiosInstance.get("/api/home/vulnerabilities/recent");
        const data = response.data.map((update, index) => ({
          id: index + 1, // Generate a unique ID for each update
          name: update.vulnerability,
          date: update.date,
          severity: update.severity_level,
        }));
        setUpdates(data);
      } catch (err) {
        setError("Failed to fetch recent updates.");
        console.error("Error fetching recent updates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentUpdates();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white h-full border-2 border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white h-full border-2 border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-full border-2 border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 border-b-2 px-6 py-3">
        Recent Updates
      </h3>
      <ul className="space-y-4 p-6">
        {updates.map((update) => (
          <li
            key={update.id}
            className="flex justify-between items-center last:border-none"
          >
            <div>
              <p className="text-md font-medium text-gray-900">{update.name}</p>
              <p className="text-sm text-gray-500">{update.date}</p>
            </div>
            <Badge color={severityColors[update.severity]}>{update.severity}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUpdates;
