import React from 'react';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Help Page for Vulnerability Monitoring Tool</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Vulnerability Monitoring Tool!</h2>
          <p>
            This tool helps you stay informed about critical and high-severity vulnerabilities related to IT and OT equipment. By monitoring OEM websites and other relevant platforms, it provides real-time alerts to help you mitigate potential risks.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Tool</h2>
          <ol className="list-decimal list-inside">
            <li className>
              <strong>Log In:</strong> 
              <p>Start by logging into your account. If you don’t have an account, please register first.</p>
            </li>
            <li>
              <strong>Set Up Monitoring:</strong> 
              <p>Add the OEM URLs you want to monitor. You can do this in the settings section of the dashboard.</p>
            </li>
            <li>
              <strong>Receive Alerts:</strong> 
              <p>Once set up, you will receive email notifications whenever a critical or high-severity vulnerability is detected.</p>
            </li>
            <li>
              <strong>View Dashboard:</strong> 
              <p>Access the dashboard to view the current vulnerabilities, their severity levels, and recommended actions.</p>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Real-time Monitoring:</strong> Get instant updates on vulnerabilities as they are published.
            </li>
            <li>
              <strong>Email Notifications:</strong> Receive alerts directly to your inbox for any critical vulnerabilities.
            </li>
            <li>
              <strong>User-Friendly Dashboard:</strong> Easily navigate through the dashboard to view and manage vulnerabilities.
            </li>
            <li>
              <strong>Actionable Insights:</strong> Each alert includes recommended actions to mitigate risks effectively.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          <p>If you experience any issues, here are some common solutions:</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Not Receiving Emails:</strong> Check your spam folder and ensure your email settings are correct in the profile section.
            </li>
            <li>
              <strong>Dashboard Not Updating:</strong> Refresh the page or log out and log back in to see the latest data.
            </li>
            <li>
              <strong>URL Issues:</strong> Ensure that the URLs you added for monitoring are correct and accessible.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <p>If you have further questions or need assistance, please contact our support team at <a href="mailto:support@numeronauts.com" className="text-blue-500">support@numeronauts.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;