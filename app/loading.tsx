import { Loader2 } from "lucide-react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2  className="text-primary animate-spin md:size-[100px] sm:size-20 size-14" />
    </div>
  );
}

export default loading;
