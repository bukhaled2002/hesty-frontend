import Link from "next/link";
import CoursesCarousel from "./CoursesCarousel";
import { getBooks } from "@/services/admin/books";
import BooksCarousel from "./BooksCarousel";

type Props = {};

async function Books({}: Props) {
  const books = await getBooks();
  return (
    <div className="container py-10 space-y-14">
      <div className="header flex items-center justify-between">
        <div className="title relative w-fit">
          <h1 className="sm:text-[26px] text-[22px] font-bold">الكتب الدراسية</h1>
          <div className="title-underline" />
        </div>
        <Link href="/books" className="text-[#575757] sm:text-xl">
          عرض المزيد
        </Link>
      </div>
      <BooksCarousel books={books} />
    </div>
  );
}

export default Books;
