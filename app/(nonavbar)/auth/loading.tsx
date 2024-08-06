import { Loader2 } from "lucide-react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 size={100} className="text-primary animate-spin" />
    </div>
  );
}

export default loading;
