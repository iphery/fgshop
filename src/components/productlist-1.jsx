"use client";
import { API_PINEAPPLE } from "@/utils/constans";
import { useState, useEffect, useRef, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useInView } from "@/hooks/inview";
import { useProvider } from "@/app/app-provider";
import { IoMdStar } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductCard = ({ product }) => (
  <div className=" rounded-lg shadow-md group h-[350px] group">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover bg-muted rounded-t-md"
    />
    <div className="p-1 mb-3">
      <h3 className="mt-2 text-sm overflow-hidden text-ellipsis line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm font-bold">
        Rp {new Intl.NumberFormat("de-DE").format(Math.round(product.rate))}
      </p>
      <span className="text-xs bg-blurgreen p-1 rounded-sm">Diskon 3%</span>
      <div className="flex flex-row mt-2">
        <CiShop className="text-success " />

        <div className="text-xs text-muted ml-1">Bhakti Widya Farma</div>
      </div>

      <div className="flex flex-row">
        <IoMdStar className="text-secondary" />
        <div className="text-xs text-muted">4.9 | 50+ terjual</div>
      </div>
    </div>
  </div>
);

const ProductSkeleton = () => (
  <div className=" rounded-lg  shadow-md">
    <Skeleton height={192} className="rounded-t-lg" />
    <div className="p-2">
      <Skeleton width={150} />
      <Skeleton width={100} />
      <Skeleton width={150} />
      <Skeleton width={140} />
    </div>
  </div>
);

export const ProductList1 = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [ref, isInView, hasBeenSeen] = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  const { reachedBottom } = useProvider();
  const maxLimit = 3;
  const [currentLimit, setCurrentLimit] = useState(1);
  const [isBegining1, setBegining1] = useState(true);
  const [isEnd1, setEnd1] = useState(false);

  const fetchProducts = async () => {
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(`${API_PINEAPPLE}/products?page=${page}`);
      const newProduct = await response.json();
      const newProducts = newProduct.data;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      //setHasMore(newProducts.length === 10);
      setPage((prevPage) => prevPage + 1);
      setCurrentLimit((prev) => prev + 1);
      console.log(newProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Only run on initial mount

  useEffect(() => {
    setEnd1(isEnd1);
  }, [isEnd1]);

  useEffect(() => {
    setBegining1(isBegining1);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-5 gap-x-4  py-2">
          {[...Array(5)].map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg relative w-full h-auto group  flex items-center justify-evenly">
          <Swiper
            slidesPerView={5}
            spaceBetween={17}
            //loop={true}
            modules={[Navigation]} // Import the Navigation module
            navigation={{
              nextEl: ".list1-swiper-button-next",
              prevEl: ".list1-swiper-button-prev",
            }}
            onSlideChange={(swiper) => {
              // console.log(swiper.isBeginning);
              setEnd1(swiper.isEnd);
              setBegining1(swiper.isBeginning);
            }}
          >
            {products.map((product, index) => {
              return (
                <SwiperSlide key={index} className="my-4">
                  <ProductCard product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Prev Button */}
          <div
            className={`absolute  left-10 group-hover:left-[-10px] transition-all  duration-500 ease-in-out  list1-swiper-button-prev   opacity-0 group-hover:${
              isBegining1 ? "opacity-0" : "opacity-100"
            }  ${isBegining1 ? "cursor-default" : "cursor-pointer"} z-10`}
          >
            <div
              className={` ${
                isBegining1 ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div className="bg-black justify center flex  p-1  items-center  rounded-full  text-xl text-white hover:bg-primary hover:bg-opacity-20">
                <IoChevronBackOutline />
              </div>
            </div>
          </div>

          <div
            className={` absolute cursor-pointer  right-10 group-hover:right-[-10px] transition-all  duration-500 ease-in-out  list1-swiper-button-next   opacity-0 group-hover:${
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
      )}
    </div>
  );
};
