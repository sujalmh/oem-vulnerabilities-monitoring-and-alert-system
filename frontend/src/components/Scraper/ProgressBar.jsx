import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ website, progress, isScraping }) => {
  const statusText = isScraping ? "Scraping..." : "Waiting";

  return (
    <div className="flex flex-col items-center space-y-4 bg-white shadow-lg p-6 rounded-xl transform transition hover:scale-105">
      <div className="w-24 h-24">
        <CircularProgressbar
          value={progress}
          text={progress === 100 ? "Done" : `${progress}%`}
          styles={buildStyles({
            textSize: "14px",
            pathColor: progress === 100 ? "#22c55e" : "#3b82f6",
            textColor: progress === 100 ? "#22c55e" : "#3b82f6",
            trailColor: "#e5e7eb",
            strokeLinecap: "round",
          })}
        />
      </div>
      <p className="text-lg font-semibold text-gray-800">{website}</p>
      <p className={`text-sm ${isScraping ? "text-blue-500" : "text-gray-500"}`}>{statusText}</p>
    </div>
  );
};

export default CircularProgress;
