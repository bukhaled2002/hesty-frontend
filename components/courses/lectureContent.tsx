"use client";
import { completeVideo } from "@/services/student/courses";
import { getLecture } from "@/services/student/lectures";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  courseId: string;
  lectureId: string;
};

function LectureContent({ courseId, lectureId }: Props) {
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

  if (!lecture)
    return (
      <div className=" flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={50} />
      </div>
    );
  return (
    <>
      <div className="header flex items-center justify-between text-lg font-bold">
        {lecture.lecture.title}
      </div>
      <div
        className={cn(
          "text-red-500 absolute top-0 right-0 ",
          lecture.count_watched_left !== 0 && "text-green-500"
        )}
      >
        {lecture.count_watched_left === 0
          ? "انتهي منشاهدات هذا الدرس"
          : `لديك ${lecture.count_watched_left} مشاهدات على هذا الدرس من مجموع ${lecture.lecture.video.count_watched}`}
      </div>
      <div className="video-player h-full">
        <iframe
          src={lecture.lecture.video.url.replace("watch?v=", "embed/")}
          className="w-full h-full rounded-xl"
          allow="autoplay; fullscreen; picture-in-picture; autoplay; encrypted-media"
          allowFullScreen
          onEnded={() => console.log("ended")}
        />
      </div>
    </>
  );
}

export default LectureContent;
