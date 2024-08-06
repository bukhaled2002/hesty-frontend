"use client";

import { completeVideo } from "@/services/student/courses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { isAxiosError } from "axios";

type Props = {
  vidUrl: string;
};

function Video({ vidUrl }: Props) {
  const queryClient = useQueryClient();
  const { mutate: CompleteVideo } = useMutation({
    mutationFn: (videoId: string) => completeVideo(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charge-requests-admin"] });
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

  return (
    <video
      src={vidUrl}
      controls
      onEnded={() => CompleteVideo("videoId")}
      className="w-full h-full rounded-xl"
    ></video>
  );
}

export default Video;
