import React, { useState } from "react";
import axiosInstance from "../../axios"; // Import axios instance

const AddWebsite = () => {
  const [formData, setFormData] = useState({
    website: "",
    oem_name: "",
    scrape_frequency: "",
    options: {
      contains_listing: false,
      contains_details: false,
      contains_date: false,
      is_it: true,
      is_official: true,
      is_rss: false,
      contains_cve: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/api/admin/add-website",
        formData
      );
      console.log("Response:", response.data);
      alert("Website added successfully!");
      // Reset form
      setFormData({
        website: "",
        oem_name: "",
        scrape_frequency: "",
        options: {
          contains_listing: false,
          contains_details: false,
          contains_date: false,
          is_it: true,
          is_official: true,
          is_rss: false,
          contains_cve: false,
        },
      });
    } catch (error) {
      console.error(
        "Error adding website:",
        error.response?.data || error.message
      );
      alert("Failed to add the website. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Website</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Website URL or Name
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter website URL or name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="oem_name"
            className="block text-sm font-medium text-gray-700"
          >
            OEM Name
          </label>
          <input
            type="text"
            id="oem_name"
            name="oem_name"
            value={formData.oem_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter OEM name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="scrape_frequency"
            className="block text-sm font-medium text-gray-700"
          >
            Scrape Frequency (in hours)
          </label>
          <input
            type="number"
            id="scrape_frequency"
            name="scrape_frequency"
            value={formData.scrape_frequency}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter scrape frequency"
            required
          />
        </div>
        <fieldset className="mb-6">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Website Details
          </legend>
          <div className="space-y-2 flex">
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contains_listing"
                  name="contains_listing"
                  checked={formData.options.contains_listing}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="contains_listing"
                  className="ml-2 text-sm text-gray-700"
                >
                  Contains Listing
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contains_details"
                  name="contains_details"
                  checked={formData.options.contains_details}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="contains_details"
                  className="ml-2 text-sm text-gray-700"
                >
                  Contains Details
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contains_date"
                  name="contains_date"
                  checked={formData.options.contains_date}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="contains_date"
                  className="ml-2 text-sm text-gray-700"
                >
                  Contains Date
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_it"
                  name="is_it"
                  checked={formData.options.is_it}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_it" className="ml-2 text-sm text-gray-700">
                  Is IT
                </label>
              </div>
            </div>
            <div className="ml-20">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_official"
                  name="is_official"
                  checked={formData.options.is_official}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="is_official"
                  className="ml-2 text-sm text-gray-700"
                >
                  Is Official
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contains_cve"
                  name="contains_cve"
                  checked={formData.options.contains_cve}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="contains_cve"
                  className="ml-2 text-sm text-gray-700"
                >
                  Contains CVE?
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_rss"
                  name="is_rss"
                  checked={formData.options.is_rss}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="is_rss"
                  className="ml-2 text-sm text-gray-700"
                >
                  Is RSS?
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-sm rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Website
        </button>
      </form>
    </div>
  );
};

export default AddWebsite;
