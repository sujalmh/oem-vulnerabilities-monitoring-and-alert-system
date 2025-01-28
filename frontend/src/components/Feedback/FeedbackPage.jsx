import React, { useState } from 'react';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#EDF4FC] flex items-center justify-center">
      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded max-w-lg text-center">
          Thank you for your feedback! We appreciate your input.
        </div>
      ) : (
        <form
          className="bg-white p-6 rounded shadow-md max-w-lg w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Feedback</h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded"
              placeholder="Enter your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-gray-700 font-semibold mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              className="w-full p-3 border rounded"
              placeholder="Provide your feedback or report an issue"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-navColor hover:bg-darkNavColor text-white py-2 px-4 rounded w-full"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackPage;