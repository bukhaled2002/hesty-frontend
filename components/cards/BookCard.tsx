import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
import { GetBook } from "@/services/admin/books";

type Props = {
  book: GetBook;
};

function BookCard({ book }: Props) {
    const bookImg = transformGoogleDriveUrl(book.img_url?.trim() !== null || ""
    ? book.img_url?.trim()
    : "/images/placeholder.png"
)
  console.log('course',book)
  return (
    <div className="rounded-lg border border-[#00000026] flex flex-col h-full">
      <div className="h-48">
        <Link href={`/books/${book.id}`}>
          <Image
            src={bookImg}
            width={500}
            height={500}
            className="size-full max-h-[201px] rounded-md object-cover"
            alt="Course Image"
          />
        </Link>
      </div>


      <div className="p-4 flex flex-col justify-between items-start h-full">
      <div className="space-y-[8px]">
          <h1 className="font-bold text-xl">{book.name}</h1>
          <h3 className="text-base font-semibold text-primary">
            {book.description}
          </h3>
          <h2 className="text-base font-medium">من تأليف : {book.author}</h2>
        </div>
        <div className="mt-6 flex items-center justify-center w-full">
          <Link href={`/books/${book.id}`} className="w-full">
            <Button className="text-lg font-semibold rounded-[10px] w-full">
              عرض الكتاب
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
