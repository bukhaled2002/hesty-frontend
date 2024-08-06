import { getSubjects } from "@/services/subjects";
import { HoverEffect } from "../aceternity/card-hover-effect";
import { Button } from "../ui/button";

type Props = {};

async function Subjects({}: Props) {
  const subjects = await getSubjects();

  return (
    <div className="container py-10 space-y-14">
      <div className="title relative w-fit">
        <h1 className="text-[26px] font-bold">المواد الدراسية</h1>
        <div className="title-underline" />
      </div>
      <HoverEffect items={subjects.data} />
    </div>
  );
}

export default Subjects;
