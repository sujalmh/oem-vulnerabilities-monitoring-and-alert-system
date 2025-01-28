import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SeverityTrend = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVulnerabilityData = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/home/vulnerabilities_per_month"
        );

        const apiData = response.data;

        // Extract unique months and severity labels
        const months = apiData.map((item) => item.month);
        const severities = ["Critical", "High"]; // Adjusted to remove Medium

        // Map severity data to datasets
        const datasets = severities.map((severity) => ({
          label: severity,
          data: months.map((month) => {
            const monthDetails = apiData.find((item) => item.month === month);
            const severityDetail =
              monthDetails?.details.find((d) => d.severity === severity) || {};
            return severityDetail.count || 0;
          }),
          borderColor: severity === "Critical" ? "#ff4d4f" : "#faad14",
          tension: 0.4,
        }));

        // Prepare chart data
        setChartData({
          labels: months,
          datasets,
        });
      } catch (err) {
        setError("Failed to fetch data.");
        console.error("Error fetching vulnerability data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVulnerabilityData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the graph height can be controlled
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Optionally hide gridlines on x-axis for a cleaner look
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white h-full shadow rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white h-full shadow rounded-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-full shadow rounded-lg p-4 px-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Vulnerability Severity Trend
      </h3>
      <div className="h-[250px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SeverityTrend;