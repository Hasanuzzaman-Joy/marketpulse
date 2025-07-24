import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "../../shared/Loading";
import ZoomIn from "../../shared/ZoomIn";

const AdSlider = () => {
  const axiosInstance = useAxios();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axiosInstance.get("/get-ads");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (ads.length === 0) return <p>No ads available</p>;

  return (
    <div className="w-full mt-20 px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-secondary">
        Promotional Offers
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded overflow-hidden shadow-md">
                {/* Image (left) */}
                <div className="h-64 md:h-full">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content (right) */}
                <div className="bg-primary text-white p-6 flex flex-col justify-center">
                  <ZoomIn>
                    <h2 className="text-2xl font-bold mb-3">{ad.title}</h2>
                    <p className="text-base">{ad.description}</p>
                  </ZoomIn>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Arrows */}
          <div className="swiper-button-prev-custom absolute top-1/2 left-[-50px] z-20 -translate-y-1/2 cursor-pointer text-3xl text-primary hover:text-primary-dark select-none">
            &#8592;
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-[-50px] z-20 -translate-y-1/2 cursor-pointer text-3xl text-primary hover:text-primary-dark select-none">
            &#8594;
          </div>
        </Swiper>

        {/* Pagination Dots*/}
        <div className="swiper-pagination-custom mt-6 flex justify-center"></div>
      </div>
    </div>
  );
};

export default AdSlider;
