import React from 'react';
import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

import axiosInstance from './axios';

import { useState, useEffect } from "react";

export default function Home() {
  const [scrapedData, setScrapedData] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Data for "All" table
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    // Fetch data from the API
    axiosInstance
      .get("/api/get_scraped_data") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data.data;
        setScrapedData(data); // Set original data
        setFilteredData(data); // Initialize filtered data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search input from SearchBox
  const handleSearch = (query) => {
    console.log("Query:", query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = scrapedData.filter((item) =>
      item.product_name_version.toLowerCase().includes(lowerCaseQuery) ||
      item.vendor.toLowerCase().includes(lowerCaseQuery) ||
      item.severity_level.toLowerCase().includes(lowerCaseQuery) ||
      item.vulnerability.toLowerCase().includes(lowerCaseQuery) ||
      item.published_date.toLowerCase().includes(lowerCaseQuery) ||     
      item.reference.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  const handleSortChange = (value) => {
    console.log("Selected sort:", value);
    setSortValue(value);
  };

  

  return (
    <div>
      <div className={classes["main-container"]}>
        <Header onSearch={handleSearch} sortValue={sortValue} onSortChange={handleSortChange} />
        <Content allData={filteredData} sortValue={sortValue} />
      </div>
    </div>
  )
}
