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
//import type { Swiper as SwiperType } from "swiper";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdStar,
  IoMdStarOutline,
} from "react-icons/io";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { API_PINEAPPLE } from "@/utils/constans";
import { useRouter } from "next/navigation";
import { ProductGridAll } from "@/components/productgrid-all";
import { ProductList1 } from "@/components/productlist-1";

export default function Home() {
  const router = useRouter();
  const {
    products,
    setProducts,
    loadProduct,
    setLoadProduct,
    lastPageProduct,
    setLastPageProduct,
    currentPageProduct,
    setCurrentPageProduct,
  } = useProvider();
  const [onload, setOnload] = useState(true);

  const array = [1, 2, 3, 4, 5, 6, 7];
  const arrSkeleton = [1, 2, 3, 4, 5];
  const [pageLoading, setPageLoading] = useState(true);

  const [isBegining1, setBegining1] = useState(true);
  const [isEnd1, setEnd1] = useState(false);

  useEffect(() => {
    setEnd1(isEnd1);
  }, [isEnd1]);

  useEffect(() => {
    setBegining1(isBegining1);
  }, []);

  const fetchProducts = async () => {
    /*
    try {
      const response = await fetch(
        `${API_PINEAPPLE}/products?page=${currentPageProduct}`
      );
      const data = await response.json();
      setProducts(data.data);
      setLastPageProduct(data.meta["total"]);
      setOnload(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
    }
    */
  };

  useEffect(() => {
    if (loadProduct) {
      fetchProducts();
    }
  }, [loadProduct, currentPageProduct]);

  return (
    <div className={"grow flex flex-col"}>
      <div className=" relative w-full flex items-center group">
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
      <div className="mt-10"></div>
      <div className="font-bold text-xl">Lagi trending</div>
      <ProductList1 />
      <ProductGridAll />
    </div>
  );
}
