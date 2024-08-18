"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { GetBook } from "@/services/admin/books";
import BookCard from "../cards/BookCard";
const BooksCarousel = ({ books }: { books: any }) => {
  return (
    <Swiper
    // modules={[Scrollbar, Autoplay]}
    spaceBetween={10}
    slidesPerView={1.07}
    breakpoints={{
        500: {
            slidesPerView: 1.2,
        },
        640: {
            slidesPerView: 1.6,
        },
        850: {
            slidesPerView: 2.4,
        },
        1080: {
            slidesPerView: 3.5,
        },
        1280: {
            slidesPerView: 4,
        },
    }}
    autoplay={{
        delay: 4000,
        disableOnInteraction: false,
    }}
>

    {books.data.map((book: GetBook) => {
        return (
            <>
                <SwiperSlide className="space-y-1.5 !h-auto" key={book.id}>
                    <BookCard book={book} key={book.id} />
                </SwiperSlide>
            </>
        );
    })}
</Swiper>
)
}

export default BooksCarousel