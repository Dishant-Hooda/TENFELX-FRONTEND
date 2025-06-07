"use client";
import React, { useState, useRef } from "react";

const videoList = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const Hero = () => {
  const [searchText, setSearchText] = useState(""); // step 1
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value); // step 2
    console.log(e.target.value);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="layout-content-container flex flex-col w-full flex-1 mt-[87px] relative overflow-hidden">
      <div className="@container">
        <div className="@[480px]:p-4 relative h-[calc(100vh-87px)]">
          {/* 🔹 Video Background */}
          <video
            key={videoList[currentVideoIndex]}
            ref={videoRef} // re-render on source change
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={videoList[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* 🔹 Overlay and Content */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col items-center justify-center gap-6 p-4 @[480px]:p-10 z-10">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl text-center max-w-[800px]">
              Find the perfect freelance services for your business
            </h1>

            {/* ...your search bar remains unchanged */}
            <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#ad95c6] flex border border-[#4d3663] bg-black items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Search for a service"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#4d3663] bg-black focus:border-[#4d3663] h-full placeholder:text-[#ad95c6] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  onChange={handleChange} // step 3
                  value={searchText} // step 4
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#4d3663] bg-black pr-[7px]">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#8020df] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Search</span>
                  </button>
                </div>
              </div>
            </label>

            {/* 🔘 Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-4 right-4 z-40 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M104,56a8,8,0,0,1,8,8V192a8,8,0,0,1-16,0V64A8,8,0,0,1,104,56Zm48,0a8,8,0,0,1,8,8V192a8,8,0,0,1-16,0V64A8,8,0,0,1,152,56Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M90.23,48.55A8,8,0,0,1,104,56V200a8,8,0,0,1-13.77,5.66L34.23,133.66a8,8,0,0,1,0-11.32ZM152,56a8,8,0,0,1,13.77,5.66L221.77,122.34a8,8,0,0,1,0,11.32L165.77,200A8,8,0,0,1,152,194Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
