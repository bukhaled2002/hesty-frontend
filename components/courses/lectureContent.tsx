"use client";
import { completeVideo } from "@/services/student/courses";
import { getLecture } from "@/services/student/lectures";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2, Trophy } from "lucide-react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
type Props = {
  courseId: string;
  lectureId: string;
  watched: number;
  total: number;
};

function LectureContent({ courseId, lectureId, watched, total }: Props) {
  const queryClient = useQueryClient();
  const { data: lecture } = useQuery({
    queryKey: ["lecture", courseId, lectureId],
    queryFn: () => getLecture(courseId, lectureId),
    refetchOnWindowFocus: false,
  });

  const { mutate: CompleteVideo } = useMutation({
    mutationFn: (videoId: string) => completeVideo(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lecture", courseId, lectureId],
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    },
  });

  // Function to extract YouTube video ID from the URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&\n]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const videoUrl = getYouTubeEmbedUrl(lecture?.lecture?.video?.url || "");

  if (!lecture)
    return (
      <div className=" flex items-center justify-center h-[500px]">
        <Loader2 className="animate-spin text-secondary" size={50} />
      </div>
    );

  return (
    <>
      <div className="header flex items-center justify-between text-lg font-bold">
        {lecture?.lecture?.title}
      </div>
      <div
        className={cn(
          "text-red-500 sm:absolute top-0 right-0 ",
          lecture?.count_watched_left !== 0 && "text-green-500"
        )}
      >
        {lecture?.count_watched_left === 0
          ? "انتهت مشاهدات هذا الدرس"
          : `لديك ${lecture?.count_watched_left} مشاهدات على هذا الدرس من مجموع ${lecture?.lecture?.video.count_watched}`}
      </div>
      <div className="lg:hidden flex items-center justify-between">
        <div>
          مكتمل {watched} / {total}
        </div>
        <Trophy size={20} className="text-primary" />
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
    </>
  );
}

export default LectureContent;
