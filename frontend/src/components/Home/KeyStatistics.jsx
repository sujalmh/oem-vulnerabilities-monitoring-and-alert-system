import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";

const KeyStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalVulnerabilities: 0,
    critical: 0,
    high: 0,
    monitoredOEMs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosInstance.get("/api/home/vulnerabilities/number_breakdown");
        const { total_vulnerabilities, severity_breakdown, monitored_oems } = response.data;
        console.log(response.data);
        // Map severity levels to a dictionary
        const severityMap = severity_breakdown.reduce((acc, item) => {
          acc[item.severity.toLowerCase()] = item.count;
          return acc;
        }, {});

        // Update statistics
        setStatistics({
          totalVulnerabilities: total_vulnerabilities,
          critical: severityMap.critical || 0,
          high: severityMap.high || 0,
          monitoredOEMs: monitored_oems || 0,
        });
      } catch (error) {
        setError("Failed to fetch key statistics.");
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white shadow h-full rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow h-full rounded-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow h-full rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 px-6 py-3 border-b-2 mb-4">
        Key Statistics
      </h3>
      <table className="w-[85%] m-auto text-left border-collapse">
        <tbody className="text-md">
          <tr>
            <td className="py-1 p-1 text-gray-600">Total Vulnerabilities</td>
            <td className="py-1 p-1 font-bold text-gray-800 text-right">
              {statistics.totalVulnerabilities}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-1 p-1 text-gray-600">Critical</td>
            <td className="py-1 p-1 font-bold text-red-500 text-right">
              {statistics.critical}
            </td>
          </tr>
          <tr>
            <td className="py-1 p-1 text-gray-600">High</td>
            <td className="py-1 p-1 font-bold text-yellow-500 text-right">
              {statistics.high}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-1 p-1 text-gray-600">Monitored OEMs</td>
            <td className="py-1 p-1 font-bold text-gray-800 text-right">
              {statistics.monitoredOEMs}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KeyStatistics;
