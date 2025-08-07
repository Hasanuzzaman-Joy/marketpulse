import { use } from "react";
import StarRatings from "react-star-ratings";
import ZoomIn from "../../shared/ZoomIn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = ({ testimonialData }) => {
    const testimonial = use(testimonialData);

    return (
        <section className="relative bg-fixed bg-cover bg-center bg-no-repeat mt-14 py-20 px-5 md:px-16">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left side: Title + Subtitle + Rating */}
                <div className="w-full md:w-[35%] flex flex-col justify-start">
                    <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                        Real Reviews, Real Impact
                    </h2>
                    <p className="text-base text-gray-600 mb-6">
                        What our users say about us speaks louder than words.
                    </p>
                    <div className="flex items-center space-x-2">
                        <StarRatings
                            rating={5}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="24px"
                            starSpacing="2px"
                            name="averageRating"
                        />
                        <span className="text-lg font-semibold text-[#242253]">5.0 Average</span>
                    </div>
                </div>

                {/* Right side: Testimonials */}
                <div className="w-full md:w-[65%]">
                    {/* Swiper Starts Here */}
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={2}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        pagination={{
                            clickable: true,
                            el: '.testimonial-pagination-custom',
                        }}
                        loop
                        className="py-10"
                        breakpoints={{
                            1024: { slidesPerView: 2 },
                        }}
                    >
                        {testimonial.map((test, index) => (
                            <SwiperSlide key={index} className="flex h-full">
                                <ZoomIn>
                                    <div className="flex flex-col min-h-[380px] mb-10 p-1 mx-auto divide-y divide-gray-300 rounded-md shadow bg-white">
                                        <div className="flex justify-between p-4">
                                            <div className="flex space-x-4">
                                                <div>
                                                    <img
                                                        src={test.avatar}
                                                        alt={test.name}
                                                        className="object-cover w-12 h-12 rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#242253]">{test.name}</h4>
                                                    <span className="text-xs">{test.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center space-x-2 ">
                                                <StarRatings
                                                    rating={test.rating}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    starDimension="18px"
                                                    starSpacing="1px"
                                                    name="rating"
                                                />
                                                <div className="text-base font-bold text-[#242253]">{test.rating}</div>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-2 text-sm">
                                            {test.feedback.map((line, i) => (
                                                <p key={i} className="text-base leading-7">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </ZoomIn>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Dot indicators */}
                    <div className="testimonial-pagination-custom mt-10 flex justify-center"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
