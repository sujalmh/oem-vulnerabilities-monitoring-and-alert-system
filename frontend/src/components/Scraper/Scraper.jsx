import { useState, useEffect } from "react";
import Timer from "./Timer";
import CircularProgress from "./ProgressBar";

const ScrapingPage = () => {
  const [websites, setWebsites] = useState([
    { name: "example.com", progress: 0 },
    { name: "another.com", progress: 0 },
    { name: "webscraper.net", progress: 0 },
    { name: "datasite.io", progress: 0 },
  ]);
  const [scrapedWebsites, setScrapedWebsites] = useState([]);
  const [nextScrapeTime, setNextScrapeTime] = useState(Date.now() + 3600000);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < websites.length) {
      scrapeWebsite(currentIndex);
    }
  }, [currentIndex]);

  const scrapeWebsite = (index) => {
    let interval;
    setWebsites((prev) => {
      const updated = [...prev];
      updated[index].progress = 0;
      return updated;
    });

    interval = setInterval(() => {
      setWebsites((prev) => {
        const updated = [...prev];
        const current = updated[index];

        if (current.progress < 100) {
          current.progress += Math.floor(Math.random() * 15) + 5;
          if (current.progress > 100) {
            current.progress = 100;
          }
          return updated;
        } else {
          clearInterval(interval);
          setScrapedWebsites((prev) => {
            if (!prev.includes(current.name)) {
              return [...prev, current.name];
            }
            return prev;
          });
          updated.splice(index, 1);
          setCurrentIndex(index >= updated.length ? 0 : index);
          return updated;
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-8 px-4">
      <Timer nextScrapeTime={nextScrapeTime} />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-lg rounded-xl p-4 max-h-64 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Current Scraping Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites.map((site, index) => (
              <CircularProgress
                key={site.name}
                website={site.name}
                progress={site.progress}
                isScraping={index === currentIndex}
              />
            ))}
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 max-h-64 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Already Scraped Websites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {scrapedWebsites.map((site, index) => (
              <div
                key={index}
                className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md text-sm hover:bg-green-600 transform transition hover:scale-105"
              >
                {site}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapingPage;