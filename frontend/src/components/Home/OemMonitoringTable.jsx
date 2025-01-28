import React from "react";

const OemMonitoringTable = () => {
  const oemData = [
    { name: "OEM A", vulnerabilities: 120 },
    { name: "OEM B", vulnerabilities: 95 },
    { name: "OEM C", vulnerabilities: 80 },
    { name: "OEM C", vulnerabilities: 80 },
    { name: "OEM C", vulnerabilities: 80 },
    { name: "OEM C", vulnerabilities: 80 },
    { name: "OEM C", vulnerabilities: 80 },
    { name: "OEM C", vulnerabilities: 80 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">OEM Monitoring</h3>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">OEM Name</th>
            <th className="px-4 py-2">Vulnerabilities</th>
          </tr>
        </thead>
        <tbody>
          {oemData.map((oem, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{oem.name}</td>
              <td className="px-4 py-2">{oem.vulnerabilities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OemMonitoringTable;
