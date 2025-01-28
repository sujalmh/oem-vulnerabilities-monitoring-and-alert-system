import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

const Tutorials = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/tutorials')
            .then(response => setVideos(response.data))
            .catch(err => console.error(err));
    }, []);

    console.log(videos);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Tutorial Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                    <Link to={`/tutorial/${encodeURIComponent(video.name)}`} key={index}>
                        <div className="group relative cursor-pointer">
                            <img
                                src={video.thumbnail || `https://via.placeholder.com/300?text=${video.name}`}
                                alt={video.name}
                                className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                <p className="text-white text-lg font-semibold">{video.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
