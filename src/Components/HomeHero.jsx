import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import images
import img1 from "../assets/Investment/sliderInvite.png"
import img2 from "../assets/Investment/slider2.jpg"
import img3 from "../assets/Investment/slider1.jpg"
import img4 from "../assets/Investment/slider3.jpg"
import img5 from "../assets/Investment/slider4.jpg"
import img6 from "../assets/Investment/slider5.jpg"
import img7 from "../assets/Investment/slider6.jpg"

const data = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
];

const HomeHero = () => {
  return (
    <div className='py-2 md:py-0'>
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2500 }}
          className="w-[100%] h-[400px] mx-auto rounded-xl"
        >
          <div>
            {data.map((item, index) => {
              return <SwiperSlide key={item.id} className="cursor-pointer">
                <img className="w-full rounded-2xl" src={item.img} alt="" />
              </SwiperSlide>
            })}
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default HomeHero