"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import CourseCardOne from "../cards/courseCard-1";
import { GetCourse } from "@/services/public/courses";
const CoursesCarousel = ({ courses }: { courses: any }) => {
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

    {courses.data.map((course: GetCourse) => {
        return (
            <>
                <SwiperSlide className="space-y-1.5" key={course.id}>
                    <CourseCardOne course={course} key={course.id} />
                </SwiperSlide>
            </>
        );
    })}
</Swiper>
)
}

export default CoursesCarousel