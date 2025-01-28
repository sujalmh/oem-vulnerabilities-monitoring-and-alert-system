import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center space-y-4 transition-transform transform hover:scale-105 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-500">{value}</p>
    </div>
  );
};

const ErrorLogs = ({ logs }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Error Logs</h2>
      <ul className="space-y-3">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{log}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No errors found!</p>
        )}
      </ul>
    </div>
  );
};

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Monthly Scrapes",
      data: [30, 70, 45, 85, 55, 40, 75],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.1,
    },
  ],
};

const pieChartData = {
  labels: ["Success", "Failure", "In Progress"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
  ],
};

const websitesData = [
  {
    website: "site-a.com",
    lastUpdated: "Dec 7, 2024, 10:30 AM",
    status: "Completed",
  },
  {
    website: "site-b.com",
    lastUpdated: "Dec 6, 2024, 5:00 PM",
    status: "Ongoing",
  },
  {
    website: "site-c.com",
    lastUpdated: "Dec 7, 2024, 9:00 AM",
    status: "Pending",
  },
  {
    website: "site-d.com",
    lastUpdated: "Dec 5, 2024, 11:00 AM",
    status: "Completed",
  },
  {
    website: "site-e.com",
    lastUpdated: "Dec 7, 2024, 8:30 AM",
    status: "Pending",
  },
];

const AdminPage = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const dashboardData = [
    { title: "Last Scraped", value: "Dec 7, 2024, 10:30 AM" },
    { title: "Next Scraping In", value: "4 Hours 30 Min" },
    { title: "Errors Detected", value: "5" },
  ];

  const errorLogs = [
    "Error 1: Timeout on site A",
    "Error 2: Parsing failure on site B",
    "Error 3: Unknown error on site C",
  ];

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/dashboard");
      setData(response.data);
      console.log(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen mx-4 flex flex-col px-6 py-8">
      <main className="flex-grow container mx-auto space-y-4">
        {currentView === "dashboard" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.map((data, index) => (
                <DashboardCard
                  key={index}
                  title={data.title}
                  value={data.value}
                />
              ))}
            </div>

            <div className="lg:flex lg:gap-4 space-y-4 lg:space-y-0">
              <div className="bg-white rounded-lg shadow-sm p-6 w-full lg:w-1/3 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Scrape Status
                </h2>
                <div className="w-72 h-72">
                  <Pie data={pieChartData} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 w-full lg:w-1/3">
                <ErrorLogs logs={errorLogs} />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 w-full lg:w-1/3 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Websites Included
                </h2>
                <p className="text-3xl font-bold text-indigo-600">
                  {data.count}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Websites Included
              </h2>
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700">
                      Website
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700">
                      Last Updated
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {websitesData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-6">{row.website}</td>
                      <td className="py-3 px-6">{row.lastUpdated}</td>
                      <td className="py-3 px-6 flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            row.status === "Completed"
                              ? "bg-green-500"
                              : row.status === "Pending"
                              ? "bg-red-500"
                              : row.status === "Ongoing"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        ></span>
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
