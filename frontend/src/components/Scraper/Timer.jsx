import { useEffect, useState } from 'react';

const Timer = ({ nextScrapeTime }) => {
  const [timeLeft, setTimeLeft] = useState(nextScrapeTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(nextScrapeTime - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [nextScrapeTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="fixed top-4 right-4 bg-white/30 backdrop-blur-md shadow-lg rounded-lg px-6 py-4 text-gray-800 text-lg font-semibold animate-fadeIn">
      Scraping starts in: <span className="font-mono text-blue-600">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
