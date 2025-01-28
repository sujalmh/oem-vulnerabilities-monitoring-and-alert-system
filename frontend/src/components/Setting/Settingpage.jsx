import React, { useState, useEffect } from "react";
import EmailInputWithOTP from "../Auth/register/EmailInputWithOTP"; // Adjust path if needed
import axiosInstance from "../../axios"; // Assuming you have the Axios instance configured

const Settingpage = () => {
  const [email, setEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [oemSuggestions, setOemSuggestions] = useState([]);
  const [interestsInput, setInterestsInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Fetch OEM suggestions on component mount
  useEffect(() => {
    axiosInstance
      .get("/api/get_all_oems")
      .then((response) => {
        const { oem_names } = response.data;
        setOemSuggestions(oem_names || []);
      })
      .catch((error) => {
        console.error("Error fetching OEM names:", error);
        setOemSuggestions([]);
      });
  }, []);

  // Filter suggestions based on user input
  const handleInterestChange = (e) => {
    const value = e.target.value;
    setInterestsInput(value);

    // Filter suggestions
    if (value.length > 0) {
      const filtered = oemSuggestions.filter(
        (oem) =>
          oem.toLowerCase().includes(value.toLowerCase()) &&
          !selectedInterests.includes(oem) // Exclude already selected interests
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Add an interest to the selected list
  const addInterest = (interest) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
    setInterestsInput("");
    setFilteredSuggestions([]);
  };

  // Remove an interest from the selected list
  const removeInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Prepare the data to send to the server
    const updatedData = {};

    // Only send the new email if it's provided
    if (email) updatedData.new_email = email;

    // Only send the interests if they are selected
    if (selectedInterests.length > 0) updatedData.oems = selectedInterests;

    // If no changes were made, don't send anything
    if (!updatedData.new_email && !updatedData.oems) {
      setErrorMessage("No updates provided!");
      setIsLoading(false);
      return;
    }

    // Make the API request to update profile
    axiosInstance
      .post("/auth/edit-profile", updatedData)
      .then((response) => {
        setSuccessMessage("Profile updated successfully!");
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.error || "An error occurred!");
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSaveChanges} className="bg-white p-8 shadow-md rounded-md w-[450px]">
        <h2 className="my-3 text-4xl font-bold text-center">Edit Profile</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Update your profile details</p>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2"></label>
          <EmailInputWithOTP
            email={email}
            setEmail={setEmail}
            isOtpVerified={isOtpVerified}
            setIsOtpVerified={setIsOtpVerified}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Interests</label>
          <input
            type="text"
            value={interestsInput}
            onChange={handleInterestChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing to search..."
          />
          {/* Suggestions dropdown */}
          {filteredSuggestions.length > 0 && (
            <ul className="border border-gray-300 rounded-md mt-1 bg-white max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => addInterest(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {/* Selected interests */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedInterests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md flex items-center"
              >
                {interest}
                <button
                  type="button"
                  className="ml-2 text-white hover:text-red-500"
                  onClick={() => removeInterest(interest)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {errorMessage && <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && <p className="mb-4 text-green-500 text-sm">{successMessage}</p>}

        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Saving changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Settingpage;
