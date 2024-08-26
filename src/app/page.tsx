"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DataProvider, useProvider } from "@/app/app-provider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import type { Swiper as SwiperType } from "swiper";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdStar,
  IoMdStarOutline,
} from "react-icons/io";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const swiperRef = useRef<SwiperType>();
  const [showNavButton, setShowNavButton] = useState(false);

  const array = [1, 2, 3, 4, 5, 6, 7];

  const [isBegining1, setBegining1] = useState(true);
  const [isEnd1, setEnd1] = useState(false);

  useEffect(() => {
    setEnd1(isEnd1);
  }, [isEnd1]);

  useEffect(() => {
    setBegining1(isBegining1);
  }, []);

  const [circleHover, setCircleHover] = useState(false);

  return (
    <div className={"grow flex flex-col"}>
      <div className=" relative w-full flex items-center justify-center group">
        <Swiper
          className="rounded-lg"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]} // Import the Navigation module
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            //clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {array.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src="images/promo1.jpg"
                  alt=""
                  className="object-cover w-full rounded-lg"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Prev Button */}
        <div className=" absolute  left-10 group-hover:left-[-10px] transition-all  duration-500 ease-in-out  swiper-button-prev  cursor-pointer opacity-0 group-hover:opacity-100 ">
          <div className="w-20">
            <div className="bg-black justify center flex  p-1 cursor-pointer items-center  rounded-full  text-xl text-white hover:bg-primary hover:bg-opacity-20">
              <IoChevronBackOutline />
            </div>
          </div>
        </div>

        <div className=" absolute  right-10 group-hover:right-[-10px] transition-all  duration-500 ease-in-out  swiper-button-next  cursor-pointer opacity-0 group-hover:opacity-100 ">
          <div className="w-20">
            <div className="bg-black justify center flex  p-1 cursor-pointer items-center  rounded-full  text-xl text-white hover:bg-primary hover:bg-opacity-20">
              <IoChevronForwardOutline />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="absolute swiper-pagination text-black"></div>
        <style jsx global>{`
          .swiper-button-next::after,
          .swiper-button-prev::after {
            display: none;
          }
        `}</style>
      </div>

      <div className="mt-20"></div>

      <div className="rounded-lg relative w-full  flex items-center justify-center group">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          //loop={true}
          modules={[Navigation]} // Import the Navigation module
          navigation={{
            nextEl: ".one-swiper-button-next",
            prevEl: ".one-swiper-button-prev",
          }}
          onSlideChange={(swiper) => {
            console.log(swiper.isBeginning);
            setEnd1(swiper.isEnd);
            setBegining1(swiper.isBeginning);
          }}
        >
          {array.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="p-2 border rounded-lg ">
                  <div className="text-sm">
                    METFORMIN 500MG 1 BLISTER 10 TABLET
                  </div>
                  <div>Rp. 20.000</div>
                  <span className="bg-success text-sm px-2 py-1 rounded-sm">
                    Disc. 5%
                  </span>
                  <div className="flex justify-start text-sm items-center py-1 text-warning">
                    <IoMdStar className="" />
                    <div>4.5</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Prev Button */}
        <div
          className={`absolute  left-10 group-hover:left-[-10px] transition-all  duration-500 ease-in-out  one-swiper-button-prev   opacity-0 group-hover:${
            isBegining1 ? "opacity-0" : "opacity-100"
          }  ${isBegining1 ? "cursor-default" : "cursor-pointer"} z-10`}
        >
          <div
            className={` ${isBegining1 ? "cursor-default" : "cursor-pointer"}`}
          >
            <div className="bg-black justify center flex  p-1  items-center  rounded-full  text-xl text-white hover:bg-primary hover:bg-opacity-20">
              <IoChevronBackOutline />
            </div>
          </div>
        </div>

        <div
          className={` absolute cursor-pointer  right-10 group-hover:right-[-10px] transition-all  duration-500 ease-in-out  one-swiper-button-next   opacity-0 group-hover:${
            isEnd1 ? "opacity-0" : "opacity-100"
          } z-10 `}
        >
          <div className={` ${isEnd1 ? "cursor-default" : "cursor-pointer"}`}>
            <div className="bg-black justify center flex  p-1  items-center  rounded-full  text-xl text-white hover:bg-primary hover:bg-opacity-20">
              <IoChevronForwardOutline />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="absolute swiper-pagination1 text-black"></div>
        <style jsx global>{`
          .swiper-button-next1::after,
          .swiper-button-prev1::after {
            display: none;
          }
        `}</style>
      </div>

      <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2">
        <Skeleton circle={true} height={60} width={60} />
        <Skeleton height={24} width={100} />
        <Skeleton height={24} width={100} />
        <Skeleton count={3} />
      </div>

      <div className="mt-10"></div>

      <div style={{ height: "100vh", position: "relative" }}></div>
      <div className="flex justify-between">
        <div className="swiper-button image-swiper-button-prev">
          <IoIosArrowBack />
        </div>
        <div className="swiper-button image-swiper-button-next">
          <IoIosArrowForward />
        </div>
      </div>
      <b className="text-lg py-3">Lagi trending</b>

      {array.map((item, index) => {
        return (
          <div className="p-5" key={index}>
            <div className="h-[200px] bg-black text-white">add</div>
          </div>
        );
      })}
    </div>
  );
}
