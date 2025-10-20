import { useState } from "react";
import VideoIntro from "@/components/VideoIntro";
import WomensDay from "@/components/WomensDay";

const Index = () => {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <>
      {showVideo ? (
        <VideoIntro onVideoEnd={handleVideoEnd} />
      ) : (
        <WomensDay />
      )}
    </>
  );
};

export default Index;
