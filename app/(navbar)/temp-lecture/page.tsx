"use client"
import { useLectureStore } from "@/lib/stores/lectureStore";
import { Loader2 } from "lucide-react";
const TempLecture = () => {
  const { lecture } = useLectureStore();

  if (!lecture)
    return (
      <div className=" flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="animate-spin text-secondary" size={50} />
      </div>
    );
    const getYouTubeEmbedUrl = (url: string) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&\n]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
      };
    
      const videoUrl = getYouTubeEmbedUrl(lecture?.video?.url);
  return (
    <div className="container py-10 relative">
      <div className="header flex items-center justify-between text-lg font-bold">
        {lecture?.title}
      </div>
      <div className="video-player sm:h-[500px] h-[320px] object-cover rounded-xl overflow-hidden">
        {videoUrl ? (
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full">Video not available</div>
        )}
      </div>
    </div>
  );
};

export default TempLecture;
