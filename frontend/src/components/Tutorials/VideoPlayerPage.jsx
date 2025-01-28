import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayerPage = () => {
    const { videoName } = useParams();
    const navigate = useNavigate();

    const videoUrl = `http://localhost:5000/api/tutorials/${videoName}`;
    console.log(videoUrl);

    return (
        <div className="container mx-10 px-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 rounded-xl hover:bg-blue-400"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
                <video controls autoPlay className="w-[60%] h-[50%] rounded-lg mx-auto">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="mt-4 text-lg text-center font-bold">{videoName}</p>
        </div>
    );
};

export default VideoPlayerPage;
