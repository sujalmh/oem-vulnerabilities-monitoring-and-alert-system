import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

const ReportedVulnerabilitiesList = () => {
  const [reportedVulnerabilities, setReportedVulnerabilities] = useState([]);
  const [error, setError] = useState('');

  // Fetch reported vulnerabilities on component mount
  useEffect(() => {
    const fetchReportedVulnerabilities = async () => {
      try {
        const response = await axiosInstance.get('/api/reported-vulnerabilities');
        setReportedVulnerabilities(response.data);
      } catch (error) {
        setError('Error fetching reported vulnerabilities');
      }
    };

    fetchReportedVulnerabilities();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Reported Vulnerabilities</h2>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="space-y-4">
        {reportedVulnerabilities.length === 0 ? (
          <p>No reported vulnerabilities found.</p>
        ) : (
          reportedVulnerabilities.map((vuln) => (
            <div key={vuln.id} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-semibold text-gray-800">{vuln.product_name}</h3>
              <p className="text-gray-600">OEM: {vuln.oem_name}</p>
              <p className="text-gray-600">{vuln.vulnerability_description}</p>
              <p className="text-gray-600">Severity: {vuln.severity_level}</p>
              <p className="text-gray-600">Status: {vuln.status}</p>
              <p className="text-gray-600">Reported on: {vuln.reported_date}</p>
              {vuln.suggested_mitigation && (
                <p className="text-gray-600">Suggested Mitigation: {vuln.suggested_mitigation}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportedVulnerabilitiesList;
