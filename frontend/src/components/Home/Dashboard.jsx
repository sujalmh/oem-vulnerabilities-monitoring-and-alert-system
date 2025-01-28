import React from "react";
import VulnerabilityChart from "./VulnerabilityChart";
import VulnerabilityPie from "./VulnerabilityPie";
import KeyStatistics from "./KeyStatistics";
import RecentUpdates from "./RecentUpdates";
import SeverityTrend from "./SeverityTrend";
import Heatmap from "./Heatmap";
import FilterBar from "./FilterBar";
import OemMonitoringTable from "./OemMonitoringTable";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className="p-8 m-auto">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold -mt-8 text-gray-800">
          OEM Vulnerability Tracker
        </h1>
        <p className="text-gray-600 mt-2">
          Track and analyze critical and high-severity vulnerabilities across IT
          and OT systems.
        </p>
      </div>

      {/* Filter Bar */}
      {/* <FilterBar /> */}
      <div className={classes.dashboard}>
        <div className="h-full">
          <KeyStatistics />
        </div>
        <VulnerabilityPie />
        <div className="row-span-2">
          <RecentUpdates />
        </div>
        <div className="col-span-2 h-full">
          <SeverityTrend />
        </div>
      </div>
      {/* <div className="mt-4 mb-4">
        <OemMonitoringTable />
      </div> */}
        {/* <VulnerabilityChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Heatmap />
      </div> */}
    </div>
  );
};

export default Dashboard;
