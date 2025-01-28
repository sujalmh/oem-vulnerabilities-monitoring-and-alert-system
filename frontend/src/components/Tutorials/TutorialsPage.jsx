import React, { useState } from 'react';

const tutorials = [
  {
    title: 'Getting Started',
    description: 'Learn how to set up and navigate the application.',
    steps: [
      'Login using your credentials or sign up for an account.',
      'Navigate through the dashboard to see an overview of the app.',
      'Explore the features menu to begin your work.'
    ]
  },
  {
    title: 'Exporting Data',
    description: 'Learn how to export data in various formats.',
    steps: [
      'Go to the "Export" section from the navigation bar.',
      'Choose the data format: CSV, JSON, or PDF.',
      'Click on the export button to download the file.'
    ]
  }
];

const TutorialsPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Interactive Tutorials</h1>
      <div className="grid gap-4">
        {tutorials.map((tutorial, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() =>
              setSelectedTutorial(selectedTutorial === index ? null : index)
            }
          >
            <h2 className="text-2xl font-semibold text-blue-600">
              {tutorial.title}
            </h2>
            <p className="text-gray-600 mt-2">{tutorial.description}</p>
            {selectedTutorial === index && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-800">Steps:</h3>
                <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-2">
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
