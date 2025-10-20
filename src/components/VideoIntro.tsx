import { useEffect, useRef, useState } from "react";
import introVideo from "@/assets/intro-video.mp4";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSkippable, setIsSkippable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSkippable(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    onVideoEnd();
  };

  const handleVideoEnd = () => {
    onVideoEnd();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
      />
      {isSkippable && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse"
        >
          Bỏ qua
        </button>
      )}
    </div>
  );
};

export default VideoIntro;
